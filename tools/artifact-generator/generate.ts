// Generates the example-artifacts library for app-connectivity-flows.md.
// Every JWT is really signed with keys generated at run time; decoded
// header/payload are rendered next to each compact JWS. Run with:
//   bun run generate.ts
import { $ } from "bun";
import {
  SignJWT,
  generateKeyPair,
  exportJWK,
  exportPKCS8,
  calculateJwkThumbprint,
  type JWK,
  type CryptoKey,
} from "jose";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(import.meta.dir, "../../example-artifacts");
mkdirSync(OUT, { recursive: true });

const now = Math.floor(Date.now() / 1000);
const iso = (t: number) => new Date(t * 1000).toISOString();

// ---------------------------------------------------------------- identities
const APP_URI = "https://bpbuddy.example";
const APP_JWKS_URI = `${APP_URI}/.well-known/jwks.json`;
const CMS_LIBRARY = "https://library.medicare.gov";
const CMS_APP_ID = `${CMS_LIBRARY}/app-library/apps/bp-buddy`;
const STATEMENT_URL = `${CMS_APP_ID}/software-statement.jwt`;
const CSP_ISS = "https://api.id.me/oidc";
const NPD = "https://npd.cms.gov";
const ALPHA_TOKEN = "https://auth.alpha-health.example/v1/token";
const ALPHA_PORTAL = "https://developers.alpha-health.example";
const BETA_RLS = "https://rls.beta-exchange.example/fhir";
const GAMMA_REG = "https://lakeside.example/oauth/register"; // representative DH
const LAKESIDE_TOKEN = "https://lakeside.example/oauth/token";
const LAKESIDE_FHIR = "https://lakeside.example/fhir";

// --------------------------------------------------------------------- keys
async function makeKey(alg: string) {
  const { publicKey, privateKey } = await generateKeyPair(alg, { extractable: true });
  const jwk = (await exportJWK(publicKey)) as JWK;
  jwk.alg = alg;
  jwk.use = "sig";
  jwk.kid = await calculateJwkThumbprint(jwk);
  return { privateKey, jwk, alg };
}

const cmsKey = await makeKey("ES384"); // CMS statement signing
const appKeyA = await makeKey("RS384"); // app's primary key (Blue Button allows RS384/ES384)
const appKeyB = await makeKey("RS384"); // rotation target
const cspKey = await makeKey("RS256"); // ID.me-style id_token signing
const udapKey = await makeKey("RS256"); // key inside the Gamma X.509 cert

// X.509: a Gamma community CA and an app cert over udapKey, via openssl.
const tmp = join(import.meta.dir, ".x509-tmp");
mkdirSync(tmp, { recursive: true });
writeFileSync(join(tmp, "app.key"), await exportPKCS8(udapKey.privateKey as CryptoKey));
await $`openssl req -x509 -newkey rsa:2048 -nodes -keyout ${tmp}/ca.key -out ${tmp}/ca.crt -subj "/CN=Gamma Trust Community CA/O=Gamma Trust Network" -days 365`.quiet();
await $`openssl req -new -key ${tmp}/app.key -out ${tmp}/app.csr -subj "/CN=BP Buddy/O=BP Buddy Inc" -addext subjectAltName=URI:${APP_URI}`.quiet();
await $`openssl x509 -req -in ${tmp}/app.csr -CA ${tmp}/ca.crt -CAkey ${tmp}/ca.key -CAcreateserial -days 90 -copy_extensions copy -out ${tmp}/app.crt`.quiet();
const appCertDer = (await $`openssl x509 -in ${tmp}/app.crt -outform DER`.quiet()).stdout;
const caCertDer = (await $`openssl x509 -in ${tmp}/ca.crt -outform DER`.quiet()).stdout;
const appCertPem = await Bun.file(join(tmp, "app.crt")).text();
const caCertPem = await Bun.file(join(tmp, "ca.crt")).text();
const x5cApp = appCertDer.toString("base64");
const x5cCa = caCertDer.toString("base64");
await $`rm -rf ${tmp}`.quiet();

// ------------------------------------------------------------------ helpers
const b64uJson = (s: string) => JSON.parse(Buffer.from(s, "base64url").toString());
const opaque = () => Buffer.from(crypto.getRandomValues(new Uint8Array(24))).toString("base64url");
const uuid = () => crypto.randomUUID();
const pretty = (o: unknown) => JSON.stringify(o, null, 2);

function jwtMd(label: string, jwt: string): string {
  const [h, p] = jwt.split(".");
  return [
    `**${label}** (compact JWS, really signed):`,
    "",
    "```",
    jwt,
    "```",
    "",
    "Decoded header:",
    "",
    "```json",
    pretty(b64uJson(h)),
    "```",
    "",
    "Decoded payload:",
    "",
    "```json",
    pretty(b64uJson(p)),
    "```",
  ].join("\n");
}

function httpMd(title: string, lines: string[], body?: unknown, bodyLang = "json"): string {
  const out = [`**${title}**`, "", "```http", ...lines, "```"];
  if (body !== undefined) {
    out.push("", `\`\`\`${bodyLang}`, typeof body === "string" ? body : pretty(body), "```");
  }
  return out.join("\n");
}

const pages: { file: string; title: string }[] = [];
function writePage(file: string, title: string, intro: string, sections: string[]) {
  pages.push({ file, title });
  const md = [
    `# ${title}`,
    "",
    `*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). ${intro}*`,
    "",
    sections.join("\n\n---\n\n"),
    "",
    `*Generated ${iso(now)} by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*`,
  ].join("\n");
  writeFileSync(join(OUT, `${file}.md`), md);
  writeFileSync(join(OUT, `${file}.html`), htmlWrapper(title, `${file}.md`));
}

function htmlWrapper(title: string, source: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>
  :root { --fg:#1a1a1a; --bg:#fff; --bg-code:#f4f4f5; --accent:#0f5132; --accent-soft:#e7f1ec; --rule:#e5e5e5; }
  * { box-sizing:border-box; }
  html,body { margin:0; padding:0; background:var(--bg); color:var(--fg);
    font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
    font-size:16px; line-height:1.6; }
  main { max-width:860px; margin:0 auto; padding:32px 24px 96px; }
  a { color:var(--accent); text-decoration:none; border-bottom:1px solid var(--accent-soft); }
  code,pre { font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:0.88em; }
  code { background:var(--bg-code); padding:0.1em 0.35em; border-radius:3px; }
  pre { background:var(--bg-code); padding:12px 14px; border-radius:6px; overflow-x:auto; white-space:pre-wrap; word-break:break-all; }
  pre code { background:none; padding:0; }
  h1 { font-size:1.6em; line-height:1.25; }
  h2 { font-size:1.25em; margin-top:1.8em; border-bottom:1px solid var(--rule); padding-bottom:0.3em; }
  hr { border:none; border-top:1px solid var(--rule); margin:2em 0; }
  .site-nav { font-size:0.95em; background:var(--accent-soft); border:1px solid var(--rule); border-radius:6px; padding:10px 16px; margin-bottom:28px; }
  .site-nav a { font-weight:600; }
</style>
</head>
<body>
<main>
  <nav class="site-nav">
    <a href="../index.html">CAN Spec</a> ·
    <a href="../apps-without-home-networks.html">Apps Without Home Networks</a> ·
    <a href="../app-connectivity-flows.html">Connectivity Flows</a> ·
    <a href="index.html">Artifacts</a>
  </nav>
  <div id="content"><p>Loading…</p></div>
</main>
<script src="https://cdn.jsdelivr.net/npm/marked@4.3.0/marked.min.js"></script>
<script>
const renderer = {
  link(href, title, text) {
    if (!/^https?:/.test(href)) href = href.replace(/\\.md(#|$)/, '.html$1').replace('app-connectivity-flows.html', 'app-connectivity-flows.html');
    return '<a href="' + href + '">' + text + '</a>';
  }
};
marked.use({ renderer, mangle: false, headerIds: true });
fetch('${source}').then(r => r.text()).then(md => {
  document.getElementById('content').innerHTML = marked.parse(md);
});
</script>
</body>
</html>
`;
}

// =====================================================================
// Phase 0 — CMS software statement
// =====================================================================
const softwareStatement = await new SignJWT({
  software_id: CMS_APP_ID,
  client_name: "BP Buddy",
  client_uri: APP_URI,
  policy_uri: `${APP_URI}/privacy`,
  contacts: ["support@bpbuddy.example"],
  grant_types: ["client_credentials"],
  token_endpoint_auth_method: "private_key_jwt",
  jwks_uri: APP_JWKS_URI,
  extensions: {
    cms_app: { version: "1", library_status: "active", app_class: "patient-access-app" },
  },
})
  .setProtectedHeader({ alg: "ES384", kid: cmsKey.jwk.kid, typ: "JWT" })
  .setIssuer(CMS_LIBRARY)
  .setSubject(CMS_APP_ID)
  .setAudience("https://framework.cms.gov/aligned-networks")
  .setIssuedAt(now)
  .setExpirationTime(now + 86400)
  .setJti(uuid())
  .sign(cmsKey.privateKey);

writePage(
  "phase0-software-statement",
  "Phase 0 — CMS-signed software statement",
  "CMS re-signs this statement on a short cycle for as long as BP Buddy is active in the Medicare App Library. It is the only credential the app carries into every network.",
  [
    httpMd("Request — anyone may fetch the current statement", [
      `GET ${STATEMENT_URL} HTTP/1.1`,
      "Accept: application/jwt",
    ]),
    [
      "**Response** `200 OK`, `Content-Type: application/jwt`",
      "",
      jwtMd("software_statement", softwareStatement),
    ].join("\n"),
    [
      "**The app's published JWKS** at `" + APP_JWKS_URI + "` (CMS verified control of this URL at admission and monitors it afterward):",
      "",
      "```json",
      pretty({ keys: [appKeyA.jwk] }),
      "```",
    ].join("\n"),
  ],
);

// =====================================================================
// Phase 1 — NPD discovery
// =====================================================================
writePage(
  "phase1-npd-discovery",
  "Phase 1 — NPD discovery",
  "Plain JSON, no signatures: the app (or its client library) learns how each network handles registration.",
  [
    httpMd("Request", [`GET ${NPD}/networks?status=cms-aligned HTTP/1.1`, "Accept: application/json"]),
    httpMd(
      "Response — 200 OK",
      ["HTTP/1.1 200 OK", "Content-Type: application/json"],
      {
        networks: [
          {
            name: "Alpha Health Network",
            registration: { style: "centralized-portal", portal: ALPHA_PORTAL },
            token_endpoint: ALPHA_TOKEN,
            rls_endpoint: "https://rls.alpha-health.example/fhir",
            retrieval: "facilitated-fhir",
            data_holder_endpoints: `${NPD}/endpoints?network=alpha`,
          },
          {
            name: "Beta Exchange",
            registration: { style: "dynamic-registration", software_statement_issuers: [CMS_LIBRARY] },
            rls_endpoint: BETA_RLS,
            retrieval: "federated-fhir",
            data_holder_endpoints: `${NPD}/endpoints?network=beta`,
          },
          {
            name: "Gamma Trust Network",
            registration: { style: "udap-dynamic-registration", community_ca: "https://ca.gamma-trust.example/anchor.pem" },
            rls_endpoint: "https://rls.gamma-trust.example/fhir",
            retrieval: "federated-fhir",
            data_holder_endpoints: `${NPD}/endpoints?network=gamma`,
          },
        ],
      },
    ),
  ],
);

// =====================================================================
// Phase 2a — Alpha portal
// =====================================================================
const keyPossession = await new SignJWT({})
  .setProtectedHeader({ alg: "RS384", kid: appKeyA.jwk.kid, typ: "JWT" })
  .setIssuer(CMS_APP_ID)
  .setSubject(CMS_APP_ID)
  .setAudience(ALPHA_PORTAL)
  .setIssuedAt(now)
  .setExpirationTime(now + 300)
  .setJti(uuid())
  .sign(appKeyA.privateKey);

writePage(
  "phase2a-alpha-portal",
  "Phase 2a — Alpha developer portal",
  "Most of this flow is a human in a browser, so the artifacts are the two machine-verifiable pieces: the statement link the developer pastes, and a key-possession proof the portal can ask for.",
  [
    [
      "**What the developer pastes into the portal form:**",
      "",
      "```",
      STATEMENT_URL,
      "```",
      "",
      "The portal fetches it, verifies the CMS signature against CMS's published JWKS, checks `library_status: active`, and pre-fills app name, URIs, and contacts from the payload (see [phase0-software-statement](phase0-software-statement.md)).",
    ].join("\n"),
    [
      "One way Alpha can verify key possession during signup is a short-lived JWT the developer's tooling produces, verifiable against the app's CMS-verified `jwks_uri`:",
      "",
      jwtMd("key-possession proof", keyPossession),
    ].join("\n"),
    httpMd(
      "Portal provisions the registration — the developer sees",
      ["HTTP/1.1 201 Created", "Content-Type: application/json"],
      {
        client_id: "alpha-net-bp-buddy-7c31",
        grant_types: ["client_credentials"],
        token_endpoint: ALPHA_TOKEN,
        note: "Valid at every Alpha data holder; no further registrations on this network.",
      },
    ),
  ],
);

// =====================================================================
// Phase 2b — Beta dynamic registration
// =====================================================================
writePage(
  "phase2b-beta-dynreg",
  "Phase 2b — Dynamic registration at a Beta data holder",
  "The same RFC 7591 call repeats at each Beta data holder; one representative exchange is shown, at Lakeside Clinic.",
  [
    httpMd(
      "Request — RFC 7591 registration",
      [
        `POST ${GAMMA_REG.replace("oauth/register", "oauth/register")} HTTP/1.1`,
        "Host: lakeside.example",
        "Content-Type: application/json",
        `Authorization: Bearer ${keyPossession.slice(0, 40)}... (key-possession JWT, same shape as in 2a)`,
      ],
      {
        software_statement: `${softwareStatement.slice(0, 60)}... (full value in phase0-software-statement)`,
        grant_types: ["client_credentials"],
        token_endpoint_auth_method: "private_key_jwt",
      },
    ),
    [
      "The data holder verifies the CMS signature, reads `library_status`, confirms key possession against the statement's `jwks_uri`, and checks Beta's approval signal for this app if Beta publishes one.",
      "",
      httpMd(
        "Response — 201 Created",
        ["HTTP/1.1 201 Created", "Content-Type: application/json"],
        {
          client_id: "lakeside-dh-bp-buddy-91af",
          software_id: CMS_APP_ID,
          grant_types: ["client_credentials"],
          token_endpoint_auth_method: "private_key_jwt",
          jwks_uri: APP_JWKS_URI,
        },
      ),
    ].join("\n"),
  ],
);

// =====================================================================
// Phase 2c — Gamma UDAP registration
// =====================================================================
const udapStatement = await new SignJWT({
  client_name: "BP Buddy",
  grant_types: ["client_credentials"],
  token_endpoint_auth_method: "private_key_jwt",
  scope: "patient/Patient.rs patient/Observation.rs",
  contacts: ["support@bpbuddy.example"],
})
  .setProtectedHeader({ alg: "RS256", x5c: [x5cApp, x5cCa] })
  .setIssuer(APP_URI)
  .setSubject(APP_URI)
  .setAudience(GAMMA_REG)
  .setIssuedAt(now)
  .setExpirationTime(now + 300)
  .setJti(uuid())
  .sign(udapKey.privateKey);

writePage(
  "phase2c-gamma-udap",
  "Phase 2c — UDAP dynamic registration at a Gamma data holder",
  "The software statement here is self-signed with the key inside an X.509 certificate that Gamma's community CA issued to the app; trust comes from the chain to the CA anchor published in NPD. The certificate is real and chains to the CA in keys-and-trust-anchors.",
  [
    [
      jwtMd("UDAP software statement (x5c carries the cert chain)", udapStatement),
      "",
      "The `x5c` header holds the DER-encoded app certificate and the community CA certificate; both appear in PEM form in [keys-and-trust-anchors](keys-and-trust-anchors.md). The app certificate's subjectAltName URI is `" + APP_URI + "`, matching `iss` and `sub`.",
    ].join("\n"),
    httpMd(
      "Request",
      [`POST ${GAMMA_REG} HTTP/1.1`, "Host: lakeside.example", "Content-Type: application/json"],
      { software_statement: `${udapStatement.slice(0, 60)}...`, udap: "1" },
    ),
    httpMd(
      "Response — 201 Created",
      ["HTTP/1.1 201 Created", "Content-Type: application/json"],
      { client_id: "gamma-dh-bp-buddy-2e64", grant_types: ["client_credentials"], token_endpoint_auth_method: "private_key_jwt" },
    ),
  ],
);

// =====================================================================
// Phase 3 — IAL2 id_token, patient-bound token, $rls
// =====================================================================
const idToken = await new SignJWT({
  identity_assurance_level: 2,
  auth_time: now - 60,
  given_name: "Maria",
  family_name: "Lopez",
  birthdate: "1962-03-15",
  address: {
    street_address: "418 Alder Court",
    locality: "Riverside",
    region: "CA",
    postal_code: "92501",
    country: "US",
  },
  ssn_itin_short: "4321",
})
  .setProtectedHeader({ alg: "RS256", kid: cspKey.jwk.kid, typ: "JWT" })
  .setIssuer(CSP_ISS)
  .setSubject(uuid())
  .setAudience("bp-buddy-idme-client")
  .setIssuedAt(now - 60)
  .setExpirationTime(now + 240)
  .setJti(uuid())
  .sign(cspKey.privateKey);

async function clientAssertion(clientId: string, tokenEndpoint: string) {
  return new SignJWT({
    extensions: { cms_smart: { version: "1", purpose_of_use: "PATRQT", id_token: idToken } },
  })
    .setProtectedHeader({ alg: "RS384", kid: appKeyA.jwk.kid, typ: "JWT" })
    .setIssuer(clientId)
    .setSubject(clientId)
    .setAudience(tokenEndpoint)
    .setExpirationTime(now + 300)
    .setJti(uuid())
    .sign(appKeyA.privateKey);
}

const BETA_RLS_TOKEN = "https://rls.beta-exchange.example/oauth/token";
const rlsAssertion = await clientAssertion("beta-rls-bp-buddy-5d20", BETA_RLS_TOKEN);
const rlsAccessToken = opaque();

writePage(
  "phase3-rls",
  "Phase 3 — Patient-bound token and $rls at Beta",
  "Maria authenticated at her IAL2 CSP moments ago; her id_token travels inside the cms_smart extension of the client_assertion, following the Blue Button CMS Aligned Networks pattern. The access token comes back bound to her, so $rls can only locate her records.",
  [
    jwtMd("CSP-issued IAL2 id_token (ID.me-style claims)", idToken),
    httpMd(
      "Token request",
      [`POST ${BETA_RLS_TOKEN} HTTP/1.1`, "Host: rls.beta-exchange.example", "Content-Type: application/x-www-form-urlencoded"],
      {
        grant_type: "client_credentials",
        scope: "patient/Patient.rs launch/patient",
        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: `${rlsAssertion.slice(0, 60)}... (decoded below)`,
      },
    ),
    jwtMd("client_assertion — note extensions.cms_smart carrying the full id_token", rlsAssertion),
    httpMd(
      "Token response — patient matched (can-spec §6), token bound to Maria",
      ["HTTP/1.1 200 OK", "Content-Type: application/json"],
      { access_token: rlsAccessToken, token_type: "Bearer", expires_in: 1800, scope: "patient/Patient.rs launch/patient", patient: "beta-master-7741" },
    ),
    httpMd(
      "$rls request — parameters are the point of using an operation",
      [`POST ${BETA_RLS}/Patient/$rls HTTP/1.1`, "Host: rls.beta-exchange.example", `Authorization: Bearer ${rlsAccessToken}`, "Content-Type: application/fhir+json"],
      {
        resourceType: "Parameters",
        parameter: [
          { name: "geographic-scope", valueString: "US-CA" },
          { name: "since", valueDate: "2020-01-01" },
          { name: "resource-interest", valueCode: "Observation" },
        ],
      },
    ),
    httpMd(
      "$rls response — endpoints likely to hold Maria's records",
      ["HTTP/1.1 200 OK", "Content-Type: application/fhir+json"],
      {
        resourceType: "Parameters",
        parameter: [
          {
            name: "location",
            part: [
              { name: "organization", valueString: "Lakeside Clinic" },
              { name: "fhir-endpoint", valueUrl: `${LAKESIDE_FHIR}` },
            ],
          },
          {
            name: "location",
            part: [
              { name: "organization", valueString: "County Health" },
              { name: "fhir-endpoint", valueUrl: "https://fhir.countyhealth.example/r4" },
            ],
          },
        ],
      },
    ),
  ],
);

// =====================================================================
// Phase 4a — Alpha facilitated retrieval
// =====================================================================
const alphaAssertion = await clientAssertion("alpha-net-bp-buddy-7c31", ALPHA_TOKEN);
const alphaAccessToken = opaque();

writePage(
  "phase4a-alpha-facilitated",
  "Phase 4a — Facilitated retrieval on Alpha",
  "One token from Alpha's authorization server, honored by Alpha data holders; the FHIR query goes to the data holder's own endpoint.",
  [
    httpMd(
      "Token request to Alpha's authorization server",
      [`POST ${ALPHA_TOKEN} HTTP/1.1`, "Host: auth.alpha-health.example", "Content-Type: application/x-www-form-urlencoded"],
      {
        grant_type: "client_credentials",
        scope: "patient/Observation.rs launch/patient",
        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: `${alphaAssertion.slice(0, 60)}... (decoded below)`,
      },
    ),
    jwtMd("client_assertion", alphaAssertion),
    httpMd("Token response", ["HTTP/1.1 200 OK", "Content-Type: application/json"], {
      access_token: alphaAccessToken,
      token_type: "Bearer",
      expires_in: 1800,
      scope: "patient/Observation.rs launch/patient",
      patient: "alpha-master-0314",
    }),
    httpMd(
      "FHIR query — directly to General Hospital's endpoint",
      [
        "GET https://fhir.generalhospital.example/r4/Observation?patient=alpha-master-0314&category=vital-signs&_count=1 HTTP/1.1",
        `Authorization: Bearer ${alphaAccessToken}`,
        "Accept: application/fhir+json",
      ],
    ),
    httpMd("FHIR response", ["HTTP/1.1 200 OK", "Content-Type: application/fhir+json"], {
      resourceType: "Bundle",
      type: "searchset",
      total: 1,
      entry: [
        {
          resource: {
            resourceType: "Observation",
            status: "final",
            category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "vital-signs" }] }],
            code: { coding: [{ system: "http://loinc.org", code: "85354-9", display: "Blood pressure panel" }] },
            subject: { reference: "Patient/alpha-master-0314" },
            effectiveDateTime: "2026-05-28T09:30:00Z",
            component: [
              { code: { coding: [{ system: "http://loinc.org", code: "8480-6" }] }, valueQuantity: { value: 128, unit: "mmHg" } },
              { code: { coding: [{ system: "http://loinc.org", code: "8462-4" }] }, valueQuantity: { value: 79, unit: "mmHg" } },
            ],
          },
        },
      ],
    }),
  ],
);

// =====================================================================
// Phase 4b — federated retrieval at Lakeside (Beta/Gamma identical)
// =====================================================================
const lakesideAssertion = await clientAssertion("lakeside-dh-bp-buddy-91af", LAKESIDE_TOKEN);
const lakesideAccessToken = opaque();

writePage(
  "phase4b-federated",
  "Phase 4b — Federated retrieval at Lakeside Clinic (Beta; Gamma is identical)",
  "Same token shape as everywhere else; the only difference from 4a is that the data holder's own authorization server issues the token, and a refresh_token supports the rolling 90-day window of can-spec §9.",
  [
    httpMd(
      "Token request",
      [`POST ${LAKESIDE_TOKEN} HTTP/1.1`, "Host: lakeside.example", "Content-Type: application/x-www-form-urlencoded"],
      {
        grant_type: "client_credentials",
        scope: "patient/Observation.rs patient/MedicationRequest.rs launch/patient",
        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: `${lakesideAssertion.slice(0, 60)}... (decoded below)`,
      },
    ),
    jwtMd("client_assertion", lakesideAssertion),
    httpMd("Token response", ["HTTP/1.1 200 OK", "Content-Type: application/json"], {
      access_token: lakesideAccessToken,
      refresh_token: opaque(),
      token_type: "Bearer",
      expires_in: 3600,
      scope: "patient/Observation.rs patient/MedicationRequest.rs launch/patient",
      patient: "lakeside-449210",
    }),
    httpMd(
      "FHIR query",
      [`GET ${LAKESIDE_FHIR}/Observation?patient=lakeside-449210&category=vital-signs&_count=1 HTTP/1.1`, `Authorization: Bearer ${lakesideAccessToken}`, "Accept: application/fhir+json"],
    ),
    httpMd("FHIR response", ["HTTP/1.1 200 OK", "Content-Type: application/fhir+json"], {
      resourceType: "Bundle",
      type: "searchset",
      total: 1,
      entry: [
        {
          resource: {
            resourceType: "Observation",
            status: "final",
            code: { coding: [{ system: "http://loinc.org", code: "85354-9", display: "Blood pressure panel" }] },
            subject: { reference: "Patient/lakeside-449210" },
            effectiveDateTime: "2026-06-02T14:10:00Z",
            component: [
              { code: { coding: [{ system: "http://loinc.org", code: "8480-6" }] }, valueQuantity: { value: 131, unit: "mmHg" } },
              { code: { coding: [{ system: "http://loinc.org", code: "8462-4" }] }, valueQuantity: { value: 82, unit: "mmHg" } },
            ],
          },
        },
      ],
    }),
  ],
);

// =====================================================================
// Phase 5 — key rotation
// =====================================================================
const rotatedAssertion = await new SignJWT({
  extensions: { cms_smart: { version: "1", purpose_of_use: "PATRQT", id_token: idToken } },
})
  .setProtectedHeader({ alg: "RS384", kid: appKeyB.jwk.kid, typ: "JWT" })
  .setIssuer("lakeside-dh-bp-buddy-91af")
  .setSubject("lakeside-dh-bp-buddy-91af")
  .setAudience(LAKESIDE_TOKEN)
  .setExpirationTime(now + 300)
  .setJti(uuid())
  .sign(appKeyB.privateKey);

writePage(
  "phase5-key-rotation",
  "Phase 5 — Key rotation",
  "The app publishes key B alongside key A, then signs with the new kid; data holders resolve it at the live jwks_uri with nothing to re-issue.",
  [
    [
      "**JWKS before rotation:**",
      "",
      "```json",
      pretty({ keys: [appKeyA.jwk] }),
      "```",
      "",
      "**JWKS during the overlap window (key B published alongside key A):**",
      "",
      "```json",
      pretty({ keys: [appKeyA.jwk, appKeyB.jwk] }),
      "```",
    ].join("\n"),
    [
      "First token request signed with the new key; note the `kid` in the header now matches key B:",
      "",
      jwtMd("client_assertion signed with key B", rotatedAssertion),
    ].join("\n"),
    [
      "After the overlap window the app removes key A from the JWKS. Nothing else in the ecosystem changed: the CMS statement binds the `jwks_uri`, not a key. For network-issued certificates, the synchronization rule in [Phase 5 of the walkthrough](../app-connectivity-flows.md) applies.",
    ].join("\n"),
  ],
);

// =====================================================================
// Keys and trust anchors
// =====================================================================
writePage(
  "keys-and-trust-anchors",
  "Keys and trust anchors",
  "Every signature in this library verifies against these keys. All material is throwaway, generated for the examples.",
  [
    ["**CMS statement signing JWKS** (published at a CMS well-known location):", "", "```json", pretty({ keys: [cmsKey.jwk] }), "```"].join("\n"),
    ["**BP Buddy JWKS** at `" + APP_JWKS_URI + "` (keys A and B):", "", "```json", pretty({ keys: [appKeyA.jwk, appKeyB.jwk] }), "```"].join("\n"),
    ["**CSP (ID.me-style) JWKS:**", "", "```json", pretty({ keys: [cspKey.jwk] }), "```"].join("\n"),
    ["**Gamma community CA certificate** (the NPD-published anchor):", "", "```", caCertPem.trim(), "```"].join("\n"),
    ["**BP Buddy's Gamma-issued certificate** (subjectAltName URI = `" + APP_URI + "`, chains to the CA above):", "", "```", appCertPem.trim(), "```"].join("\n"),
  ],
);

// =====================================================================
// Index
// =====================================================================
{
  const order = [
    "phase0-software-statement",
    "phase1-npd-discovery",
    "phase2a-alpha-portal",
    "phase2b-beta-dynreg",
    "phase2c-gamma-udap",
    "phase3-rls",
    "phase4a-alpha-facilitated",
    "phase4b-federated",
    "phase5-key-rotation",
    "keys-and-trust-anchors",
  ];
  const byFile = new Map(pages.map((p) => [p.file, p.title]));
  const md = [
    "# Example artifacts",
    "",
    "*Sample requests and responses for every step in [app-connectivity-flows.md](../app-connectivity-flows.md). All JWTs are really signed; each page shows the compact JWS next to its decoded header and payload. Verify anything against [keys-and-trust-anchors](keys-and-trust-anchors.md).*",
    "",
    ...order.map((f) => `- [${byFile.get(f)}](${f}.md)`),
    "",
    `*Generated ${iso(now)} by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator).*`,
  ].join("\n");
  writeFileSync(join(OUT, "index.md"), md);
  writeFileSync(join(OUT, "index.html"), htmlWrapper("Example artifacts", "index.md"));
}

console.log(`Wrote ${pages.length + 1} pages to ${OUT}`);
