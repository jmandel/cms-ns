// Re-verifies every compact JWS in the generated artifact pages against
// the JWKS / certs published in keys-and-trust-anchors.md.
import { jwtVerify, importJWK, importX509 } from "jose";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = join(import.meta.dir, "../../example-artifacts");
const anchors = readFileSync(join(DIR, "keys-and-trust-anchors.md"), "utf8");
const jwksBlocks = [...anchors.matchAll(/```json\n([\s\S]*?)```/g)].map((m) => JSON.parse(m[1]));
const keys = jwksBlocks.flatMap((b) => b.keys);
const pems = [...anchors.matchAll(/```\n(-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----)\n```/g)].map((m) => m[1]);

let total = 0, ok = 0;
for (const f of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
  const text = readFileSync(join(DIR, f), "utf8");
  for (const m of text.matchAll(/^(eyJ[\w-]+\.[\w-]+\.[\w-]+)$/gm)) {
    const jwt = m[1];
    total++;
    const header = JSON.parse(Buffer.from(jwt.split(".")[0], "base64url").toString());
    try {
      let key;
      if (header.x5c) key = await importX509(pems[1], header.alg); // app cert
      else key = await importJWK(keys.find((k: any) => k.kid === header.kid), header.alg);
      await jwtVerify(jwt, key, { clockTolerance: "10 years" });
      ok++;
    } catch (e) {
      console.log(`FAIL ${f}: kid=${header.kid ?? "x5c"} — ${e}`);
    }
  }
}
console.log(`${ok}/${total} signatures verified`);
// chain check: app cert really signed by CA
import { X509Certificate } from "node:crypto";
const app = new X509Certificate(pems[1]);
const ca = new X509Certificate(pems[0]);
console.log("x509 chain app→CA:", app.verify(ca.publicKey) ? "valid" : "INVALID");
