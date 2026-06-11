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
eyJhbGciOiJSUzM4NCIsImtpZCI6IjQxeHM3YThWV2hIWlFRbXdZOVJrMFJuR0tqQjdJd3kwQ3B4LVZTVkRTSWsiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2RldmVsb3BlcnMuYWxwaGEtaGVhbHRoLmV4YW1wbGUiLCJpYXQiOjE3ODEyMTQzMDQsImV4cCI6MTc4MTIxNDYwNCwianRpIjoiOGQxZTMwMWYtNmU4Yi00YmRjLThhM2QtOGE1YThkMmQyNDIxIn0.gmSB6PE8yZbZXkPBUpTd2LLLRlbNeOwZUCcy2tl8hWQETT2DeVzyH-a_mwclCIuu0uuxOIj3bzNDp4hAkPtSSEa0hxyWoplWKoLzVnrSHgfMU8MGYbdq-Mk3ZbM9T3Mg-bo0Fk7JqNAnmd02GIHX4EgaHz16AcG1yZzFum8_lGTRhNinCiGGdkxX4FRaW9npNln3S86jPgi42XoROxLQgVryPNhfVZHJmcr8Arw1FdAEezyxKy6n7dxY-bBzGPDXS5dkSJ4zGsxGdROSbbHSTV7fa26uHq75j0P9D_AB8clqNV9oxP0nqOUVY2GSF-BP6ytjPE20W2fWOY89SyL_sw
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "41xs7a8VWhHZQQmwY9Rk0RnGKjB7Iwy0Cpx-VSVDSIk",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "iss": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "sub": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "aud": "https://developers.alpha-health.example",
  "iat": 1781214304,
  "exp": 1781214604,
  "jti": "8d1e301f-6e8b-4bdc-8a3d-8a5a8d2d2421"
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

*Generated 2026-06-11T21:45:04.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*