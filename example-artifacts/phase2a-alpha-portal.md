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
eyJhbGciOiJSUzM4NCIsImtpZCI6IjVUaWJkY3U4NEoyTkFWazA1ZnpCMzhFTVF0aFJGWWxQemczaEZ4UkgwMUEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2RldmVsb3BlcnMuYWxwaGEtaGVhbHRoLmV4YW1wbGUiLCJpYXQiOjE3ODEyMjI5MDgsImV4cCI6MTc4MTIyMzIwOCwianRpIjoiYTE4MzQ2YzYtODdkOC00NDY0LTk0MTMtNjIxNjZmOTdhMmM3In0.hBY-DOEYFvtDIAm4HYLPRWEBWVZIAVnsZVyqHUKFIoQ-_2LY5ctA4gCZeptEQ_aaQpXIaPs7RfcqlNlHyEWZ22XsZMlEOWTDxqTQaiF_2IYcgbblgoXb1LfhmJsvsfZqshPDOJLN0pLJ0NWvUdvvGEK9stQtHEduOZ4X-R2Ssim6JYSMFo16HLdtOweg0x17io5aP4cYK8mpmCPZc88fB7xvOHBxOQiZGYETIxG3myYzy4FvadFib318ydVukP1Xf_8GDNAVq2B_2MqW3dIviP5BM7y-OkIRpD8Sp3qICqaUj-4C5NgRWvgKGbeTiaGeoKy76tzf3nA_32OQ2UCwmA
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "5Tibdcu84J2NAVk05fzB38EMQthRFYlPzg3hFxRH01A",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "iss": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "sub": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "aud": "https://developers.alpha-health.example",
  "iat": 1781222908,
  "exp": 1781223208,
  "jti": "a18346c6-87d8-4464-9413-62166f97a2c7"
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

*Generated 2026-06-12T00:08:28.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*