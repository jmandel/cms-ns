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
eyJhbGciOiJFUzM4NCIsImtpZCI6IjRLX1ZsVnFzcTBlVVE1ZzJKeUtyNGk1UnMxdUpubHJ6cFdfd1pvcUJfTUEiLCJ0eXAiOiJKV1QifQ.eyJzb2Z0d2FyZV9pZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImNsaWVudF9uYW1lIjoiQlAgQnVkZHkiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvcHJpdmFjeSIsImNvbnRhY3RzIjpbInN1cHBvcnRAYnBidWRkeS5leGFtcGxlIl0sImdyYW50X3R5cGVzIjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InByaXZhdGVfa2V5X2p3dCIsImp3a3NfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvLndlbGwta25vd24vandrcy5qc29uIiwiZXh0ZW5zaW9ucyI6eyJjbXNfYXBwIjp7InZlcnNpb24iOiIxIiwibGlicmFyeV9zdGF0dXMiOiJhY3RpdmUiLCJhcHBfY2xhc3MiOiJwYXRpZW50LWFjY2Vzcy1hcHAifX0sImlzcyI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2ZyYW1ld29yay5jbXMuZ292L2FsaWduZWQtbmV0d29ya3MiLCJpYXQiOjE3ODEyMjI5MDgsImV4cCI6MTc4MTMwOTMwOCwianRpIjoiNjkxYTBkZmYtYWIwYy00MTY5LTg1YzktOGFmYjY1OTM1MGU2In0.3diNId_AHoCLWArIgAY6i67IfJgtV7inl-9oKV1p81RaP_kwmE0W0yAOboElQXDbqFlRP_idcOQMvAk_eRm9IpBCPGPZ6VitjcQJSbLGXyDDO9NdVkUeYv1QbvyBaTSm
```

Decoded header:

```json
{
  "alg": "ES384",
  "kid": "4K_VlVqsq0eUQ5g2JyKr4i5Rs1uJnlrzpW_wZoqB_MA",
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
  "iat": 1781222908,
  "exp": 1781309308,
  "jti": "691a0dff-ab0c-4169-85c9-8afb659350e6"
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
      "n": "xyfY-Xwh38-rBxkJGU5QcFP4HFny_41ikwgEtFgFggJZT_LsAneh6SCI32ofDsn4aVts9uRjt9Jjt5RLueRtJeTQZjnp5NuTY8y9l2nbay2jeDQyqCw6P67e9vZ0qlgaW4XXECgJ8mvzECbxU84eYx8XpLrkpILz90bOXF-iHYktdh9QQpJQB6FZRFuns5yfTIcLfAVw85aEJ66RXOM14_IFSRSCRqAbgq9caCct8u3WJ00SSlx3uErxc8sK_Uv08Hf0WIobI69PjdRqTVRPF0HyGAQ6CbmlHq412R6GY3UYCrynfSg9wiqOwNF4ogh-W5NQbQSsFFkgSaa_rZDmdQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "5Tibdcu84J2NAVk05fzB38EMQthRFYlPzg3hFxRH01A"
    }
  ]
}
```

*Generated 2026-06-12T00:08:28.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*