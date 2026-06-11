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
eyJhbGciOiJFUzM4NCIsImtpZCI6IkFubTJ1T2U0OHVwVVNtbkxKZEdoMjVsb2wyX1E0THNkT19xODVPZGJPT2MiLCJ0eXAiOiJKV1QifQ.eyJzb2Z0d2FyZV9pZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImNsaWVudF9uYW1lIjoiQlAgQnVkZHkiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvcHJpdmFjeSIsImNvbnRhY3RzIjpbInN1cHBvcnRAYnBidWRkeS5leGFtcGxlIl0sImdyYW50X3R5cGVzIjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InByaXZhdGVfa2V5X2p3dCIsImp3a3NfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvLndlbGwta25vd24vandrcy5qc29uIiwiZXh0ZW5zaW9ucyI6eyJjbXNfYXBwIjp7InZlcnNpb24iOiIxIiwibGlicmFyeV9zdGF0dXMiOiJhY3RpdmUiLCJhcHBfY2xhc3MiOiJwYXRpZW50LWFjY2Vzcy1hcHAifX0sImlzcyI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2ZyYW1ld29yay5jbXMuZ292L2FsaWduZWQtbmV0d29ya3MiLCJpYXQiOjE3ODEyMjExMzYsImV4cCI6MTc4MTMwNzUzNiwianRpIjoiMDgzYWQ2N2QtZWNlZi00M2M5LTkyMmEtODZiZDAzMjAzMDQxIn0.6JVToKI_f416lM0Z1qnpzQ_wP6ySrPyNvMLxkFCV0KcRGiK29y43o1BttJNPCL2X6ADQ63LTyxTKxwX8Hoy-4B1kHXBEbdz2kr7CicDhFuC2-lQ3DfMMIVdlLBfWfYpx
```

Decoded header:

```json
{
  "alg": "ES384",
  "kid": "Anm2uOe48upUSmnLJdGh25lol2_Q4LsdO_q85OdbOOc",
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
  "iat": 1781221136,
  "exp": 1781307536,
  "jti": "083ad67d-ecef-43c9-922a-86bd03203041"
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
      "n": "5fnpU0t0n74UPG4_VWEq81qe0kzmnsB35Xnoai1tH0yM9ywM4ZENi7DrcrYhfzJhHchg859FMHOy9FUBIbbYs5yZ8Y-UtjsFDK7pz3N1D8YBvqmLitypUmOObywQxN2tE0zIz_IE2eovIYrOIa50aGHfG164UcaWUhe265TbAk5-GAXoBFXCYVzQVus3ESmQKhWk4jzx-FyM0Mbuq0rtLqyUpRuQXusD2U2TJjtDPUf2LMeDMxbxSK66rwD4paUUaNPAIvJ-mVlK49r432Ur9fT6HZK5yxXeg16K4DvYs_F4fT5GSnmyizTkSRk1QpVV87RIsB3nRhMupJaXXUke-Q",
      "alg": "RS384",
      "use": "sig",
      "kid": "B_u-nDp0lpWIb5m6dOzMTngiC036uQJXkH79sKs_N0w"
    }
  ]
}
```

*Generated 2026-06-11T23:38:56.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*