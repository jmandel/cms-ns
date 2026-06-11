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
eyJhbGciOiJFUzM4NCIsImtpZCI6IlhicENWd2YzSHNZMlpFWVVtYkJpeE5MaEVNVk5vY2pJN0U2SXlUT01MdmciLCJ0eXAiOiJKV1QifQ.eyJzb2Z0d2FyZV9pZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImNsaWVudF9uYW1lIjoiQlAgQnVkZHkiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvcHJpdmFjeSIsImNvbnRhY3RzIjpbInN1cHBvcnRAYnBidWRkeS5leGFtcGxlIl0sImdyYW50X3R5cGVzIjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InByaXZhdGVfa2V5X2p3dCIsImp3a3NfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvLndlbGwta25vd24vandrcy5qc29uIiwiZXh0ZW5zaW9ucyI6eyJjbXNfYXBwIjp7InZlcnNpb24iOiIxIiwibGlicmFyeV9zdGF0dXMiOiJhY3RpdmUiLCJhcHBfY2xhc3MiOiJwYXRpZW50LWFjY2Vzcy1hcHAifX0sImlzcyI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2ZyYW1ld29yay5jbXMuZ292L2FsaWduZWQtbmV0d29ya3MiLCJpYXQiOjE3ODEyMTgyNzIsImV4cCI6MTc4MTMwNDY3MiwianRpIjoiZmY3ZmNlOGYtMDEwNi00Nzc4LWI1OTctNDg4MzUyNGIwNGNiIn0.aJskDukMY4jJm1hCIZSLloN3f33kzz3vM8BgX8cuteU4IPVzydWaG9U7tEFd8D0fRnjIgQUybzBh2qjipwoearcOkCtVyRFU88WpdwJbyhhLHLGXLVjW_LsQ09uO3Cdu
```

Decoded header:

```json
{
  "alg": "ES384",
  "kid": "XbpCVwf3HsY2ZEYUmbBixNLhEMVNocjI7E6IyTOMLvg",
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
  "iat": 1781218272,
  "exp": 1781304672,
  "jti": "ff7fce8f-0106-4778-b597-4883524b04cb"
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
      "n": "lZHXTxNRPh5l5frs0Jqpb-BqYB6axAQMV7qm5WzbP4g2VLnWNeTliJ28LL60uGo_0ATu0iiIu5f8MXmdTsy3DjVDOM6aZb0EdZ-L9qEEscU_fJuEknGvZyaGa-aRZiIvCsC6PpXJS2riCQFLvVE_dD7MDDJLMKOiHbUAhkx07c3WR7jMkDZX3SFnGtdduydcCHc0hTXl1UZCYCnQ8jQjWVCOWFKAoBZ4CeEx8k2zG7IOwyfJK7oII-kMOL3WuIvshVZoiOWTVm5yj9gl8JOWxw-KaJC9B5Gjl7ptp1zclid70VzeWo-gf7gKmWdvZuIdpj_rwHvzw6X_emtZDieRTw",
      "alg": "RS384",
      "use": "sig",
      "kid": "6yXq-vxVHX-pKmtBNwOfBSwycUHPZLHotyGYFwIUATs"
    }
  ]
}
```

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*