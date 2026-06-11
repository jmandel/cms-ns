# Phase 2a — Alpha developer portal

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Most of this flow is a human in a browser, so the artifacts are the two machine-verifiable pieces: the statement link the developer pastes, and a key-possession proof the portal can ask for.*

**What the developer pastes into the portal form:**

```
https://library.medicare.gov/app-library/apps/bp-buddy/software-statement.jwt
```

The portal fetches it, verifies the CMS signature against CMS's published JWKS, checks `library_status: active`, and pre-fills app name, URIs, and contacts from the payload (see [phase0-software-statement](phase0-software-statement.md)).

---

One way Alpha can verify key possession during signup is a short-lived JWT the developer's tooling produces, verifiable against the app's CMS-verified `jwks_uri`:

**key-possession proof** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IkJBVEZ6V0tYSmJBWVM4el84Z0dPeHpTY2FaYlhiZWpxbU5GSlZMMWVnMUEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2RldmVsb3BlcnMuYWxwaGEtaGVhbHRoLmV4YW1wbGUiLCJpYXQiOjE3ODEyMTY0NjYsImV4cCI6MTc4MTIxNjc2NiwianRpIjoiYTBhM2JiZDEtMDdhZC00Yzg1LTlkMDUtMWNlOTljZjExYzM1In0.nSXxMTgpoDzAOoWJV7xzlCJxFbIhJChjFw_ZzXS2Bi114CDR33dTbRGccqvblJx5lyvhUg2sn4KMVSAbpLNoaw2fFlPXf5ShEYT4tISWCXCWSZLwNZBTec5fZN6HC_AloXZxrxq2O95NVebzwKHuqkkNTIsHDM8a0ljUli8FjmQaQmp-EmR4UN-0TelRhJy5LFydzdTn-y_QCoY6-ee4twk0MAl7s4ICAiZ3Q2UNeC4aye3e-ALNCCVMQIf4FhowAvTN5aH8_5xivUWOCgax2ACWCQ5weWo3WSY1kbXSSESPMeoaK_rIV4apjQtsLNv11vUNGNryL_jDn10zWwUPQg
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "BATFzWKXJbAYS8z_8gGOxzScaZbXbejqmNFJVL1eg1A",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "iss": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "sub": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "aud": "https://developers.alpha-health.example",
  "iat": 1781216466,
  "exp": 1781216766,
  "jti": "a0a3bbd1-07ad-4c85-9d05-1ce99cf11c35"
}
```

---

**Portal provisions the registration — the developer sees**

```http
HTTP/1.1 201 Created
Content-Type: application/json
```

```json
{
  "client_id": "alpha-net-bp-buddy-7c31",
  "grant_types": [
    "client_credentials"
  ],
  "token_endpoint": "https://auth.alpha-health.example/v1/token",
  "note": "Valid at every Alpha data holder; no further registrations on this network."
}
```

*Generated 2026-06-11T22:21:06.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*