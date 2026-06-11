# Phase 0 — CMS-signed software statement

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). CMS re-signs this statement on a short cycle for as long as BP Buddy is active in the Medicare App Library. It is the only credential the app carries into every network.*

**Request — anyone may fetch the current statement**

```http
GET https://library.medicare.gov/app-library/apps/bp-buddy/software-statement.jwt HTTP/1.1
Accept: application/jwt
```

---

**Response** `200 OK`, `Content-Type: application/jwt`

**software_statement** (compact JWS, really signed):

```
eyJhbGciOiJFUzM4NCIsImtpZCI6ImVoMVdWZmJjY0VSY3hfaGoxVWItaDJVLVRkc1o3Rmc5OTgtSlN1QW53T0kiLCJ0eXAiOiJKV1QifQ.eyJzb2Z0d2FyZV9pZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImNsaWVudF9uYW1lIjoiQlAgQnVkZHkiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvcHJpdmFjeSIsImNvbnRhY3RzIjpbInN1cHBvcnRAYnBidWRkeS5leGFtcGxlIl0sImdyYW50X3R5cGVzIjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InByaXZhdGVfa2V5X2p3dCIsImp3a3NfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvLndlbGwta25vd24vandrcy5qc29uIiwiZXh0ZW5zaW9ucyI6eyJjbXNfYXBwIjp7InZlcnNpb24iOiIxIiwibGlicmFyeV9zdGF0dXMiOiJhY3RpdmUiLCJhcHBfY2xhc3MiOiJwYXRpZW50LWFjY2Vzcy1hcHAifX0sImlzcyI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2ZyYW1ld29yay5jbXMuZ292L2FsaWduZWQtbmV0d29ya3MiLCJpYXQiOjE3ODEyMTQzMDQsImV4cCI6MTc4MTMwMDcwNCwianRpIjoiY2E1Y2U0YTUtMjIxZi00MjY4LThjZWYtMzFlMGI5ODFmZjBhIn0.78b5ozMQrebWmf_-ZGLNX57kbtJde9fYccUct2fLh4V7z0Tg7EH1RNmDBL9zdYdMGkMuNKu3KEzFmySjTCDuRH3iuMHOrfcCVw4ZJCGNM7tW0rSiGG6qPztW2IZxkNzC
```

Decoded header:

```json
{
  "alg": "ES384",
  "kid": "eh1WVfbccERcx_hj1Ub-h2U-TdsZ7Fg998-JSuAnwOI",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "software_id": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "client_name": "BP Buddy",
  "client_uri": "https://bpbuddy.example",
  "policy_uri": "https://bpbuddy.example/privacy",
  "contacts": [
    "support@bpbuddy.example"
  ],
  "grant_types": [
    "client_credentials"
  ],
  "token_endpoint_auth_method": "private_key_jwt",
  "jwks_uri": "https://bpbuddy.example/.well-known/jwks.json",
  "extensions": {
    "cms_app": {
      "version": "1",
      "library_status": "active",
      "app_class": "patient-access-app"
    }
  },
  "iss": "https://library.medicare.gov",
  "sub": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "aud": "https://framework.cms.gov/aligned-networks",
  "iat": 1781214304,
  "exp": 1781300704,
  "jti": "ca5ce4a5-221f-4268-8cef-31e0b981ff0a"
}
```

---

**The app's published JWKS** at `https://bpbuddy.example/.well-known/jwks.json` (CMS verified control of this URL at admission and monitors it afterward):

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "wD4dFhN6vSo-2eX8UKjC_rnuXHsO2v2Ex57AVLxCkErGKv9JZvKooZ6HxRYQ0sDRTFPyjPN38N-H82RVBO4TUjbMbIqfD_Rab7vsWaTYpegCG_Um5Ca_kyS4CTtKSGyT4DhMswYhQi1MIlFC6z8VeXxjVpUvnOJdtPaez2CK9JfRxtxA4jEG-gP0TQnX6cyGLZUz5VxplwFMQpodAE2W0gHQQL5te6_aSED6YFrOYMx4ma0rGyL5hYgSIDlmnOZuyY4i4rLJZLSHj7K-AgF3f3bz70wOek5C6BzzvecP2Q9IxN4I8Zhr960UulroRd-tY6tngkkf7_9Vits8gElEbQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "41xs7a8VWhHZQQmwY9Rk0RnGKjB7Iwy0Cpx-VSVDSIk"
    }
  ]
}
```

*Generated 2026-06-11T21:45:04.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*