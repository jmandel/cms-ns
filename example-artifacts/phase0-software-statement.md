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
eyJhbGciOiJFUzM4NCIsImtpZCI6Ik1WdHV0WG5PaHRiblJUbHdwOEVyNV9DQzRHVUhwLVJ5UmNoQmVGSWlYYTAiLCJ0eXAiOiJKV1QifQ.eyJzb2Z0d2FyZV9pZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImNsaWVudF9uYW1lIjoiQlAgQnVkZHkiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvcHJpdmFjeSIsImNvbnRhY3RzIjpbInN1cHBvcnRAYnBidWRkeS5leGFtcGxlIl0sImdyYW50X3R5cGVzIjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InByaXZhdGVfa2V5X2p3dCIsImp3a3NfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvLndlbGwta25vd24vandrcy5qc29uIiwiZXh0ZW5zaW9ucyI6eyJjbXNfYXBwIjp7InZlcnNpb24iOiIxIiwibGlicmFyeV9zdGF0dXMiOiJhY3RpdmUiLCJhcHBfY2xhc3MiOiJwYXRpZW50LWFjY2Vzcy1hcHAifX0sImlzcyI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2ZyYW1ld29yay5jbXMuZ292L2FsaWduZWQtbmV0d29ya3MiLCJpYXQiOjE3ODExMDUzNzQsImV4cCI6MTc4MTE5MTc3NCwianRpIjoiNzhkOGE4OTYtMjBjMS00NmNiLTk5MjUtZGZlN2M2Zjk5YzQzIn0.ng50QcmTAZ2EaESoYTObVYRL9YGbGGIr9whCRbqy3tw_U6lNK9hWwbkR0SZdaumM_wiN-dX6PTrRfLEJbbfTczxhdOgjgS4E49dznTPaKC4hKiPAR5zyZAeBsdK7uECu
```

Decoded header:

```json
{
  "alg": "ES384",
  "kid": "MVtutXnOhtbnRTlwp8Er5_CC4GUHp-RyRchBeFIiXa0",
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
  "iat": 1781105374,
  "exp": 1781191774,
  "jti": "78d8a896-20c1-46cb-9925-dfe7c6f99c43"
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
      "n": "1tcM_JTDPx-v6xs_yhZO9bxwDHCC-mwLt37x2vucOVgy1OSJyWLNTS0bQ-b458VpGlSByhHi4z6uTB4F3-YjfFXcFYtZy0PZOYlYjYySVaZVrEx_DNYoDe1zVxbVJv7rnAnt3_1j3PUy5qCes-jF6Ed3BL7JurXSs-uicWWyQwaAOU95VS4hcM1hRlBOjvPQN1_xzYdq4iogwUsqDYnIDSkFUrT4HrKxln6lU8NunXnIq8A89_pHWWtbvK3FyHuqYz-st8Quzx319nD0FJ5Peq8Bb_RJPpOWRBLAZ7l_qS7k9ZNJdb2T02FF_4hoyErWTDGr9LV4goV24b5Q9xj9dw",
      "alg": "RS384",
      "use": "sig",
      "kid": "-na8dPulkqp3wlE2HuVACU7b7tXuGCvRYrzBehEuQKw"
    }
  ]
}
```

*Generated 2026-06-10T15:29:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*