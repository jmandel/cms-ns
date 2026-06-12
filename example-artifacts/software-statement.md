# The CMS-signed software statement

*Worked example for [the record location and data access write-up](../authorizing-access.md). CMS re-signs this statement on a short cycle for as long as BP Buddy is active in the Medicare App Library. It is the only credential the app carries into every network.*

**Request — anyone may fetch the current statement**

```http
GET https://library.medicare.gov/app-library/apps/bp-buddy/software-statement.jwt HTTP/1.1
Accept: application/jwt
```

---

**Response** `200 OK`, `Content-Type: application/jwt`

**software_statement** (compact JWS, really signed):

```
eyJhbGciOiJFUzM4NCIsImtpZCI6IjRIVVN1VjRpNHFXVTBlVC0tN2p4enNyc0dLZ01ZS01IUGZIQzFQc2xhQkkiLCJ0eXAiOiJKV1QifQ.eyJzb2Z0d2FyZV9pZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImNsaWVudF9uYW1lIjoiQlAgQnVkZHkiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvcHJpdmFjeSIsImNvbnRhY3RzIjpbInN1cHBvcnRAYnBidWRkeS5leGFtcGxlIl0sImdyYW50X3R5cGVzIjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InByaXZhdGVfa2V5X2p3dCIsImp3a3NfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvLndlbGwta25vd24vandrcy5qc29uIiwiZXh0ZW5zaW9ucyI6eyJjbXNfYXBwIjp7InZlcnNpb24iOiIxIiwibGlicmFyeV9zdGF0dXMiOiJhY3RpdmUiLCJhcHBfY2xhc3MiOiJwYXRpZW50LWFjY2Vzcy1hcHAifX0sImlzcyI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2ZyYW1ld29yay5jbXMuZ292L2FsaWduZWQtbmV0d29ya3MiLCJpYXQiOjE3ODEyMjUyOTAsImV4cCI6MTc4MTMxMTY5MCwianRpIjoiZWNiYzk0MmYtZGJjMC00MGFlLTljOWQtYjU5NGQwZTBlMjljIn0.6wx11fHtfi0ZYh0q9hKKPa_rQy2KFYqezPGunb6GoAcfoY_CqBx5BRfSYbEtw3ZzqF-2bapJLAwZ9rBHAGmtkn9tuzST3jxjQ7XnMgZvGUMl5jDUm_3VCaG79hnnF4dh
```

Decoded header:

```json
{
  "alg": "ES384",
  "kid": "4HUSuV4i4qWU0eT--7jxzsrsGKgMYKMHPfHC1PslaBI",
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
  "iat": 1781225290,
  "exp": 1781311690,
  "jti": "ecbc942f-dbc0-40ae-9c9d-b594d0e0e29c"
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
      "n": "rweBdrluQGrpIPURg7uthcf38SVnm7sv4mDa1G35_vzDsbW72xGJZKWc5KvZx9vYhJzuuSlfaM1VARdZQcs5t99xCpbV9jC4mPA1FK21c6OXTSz4lBMiWZiBbNDcRuMNMCx_leUKirkOlz6E7DEVB3yqQRxl2xpeEqIcZqhmFJkhXn2vBE0kDiVP9dNhxzYxu45-PzQn1J2XHTBlil8K8KsSADM2b__YwVIbk_6LkhpJWwe71kG_bINVuvBUSAsOwK8mylLmYHpgQbG2AnhaopjmT1GOpddEayLP3JK0nvxFIL0uMyfrGPSf9nWHZa2nuStvB2FCSnFE_gUhhs92Nw",
      "alg": "RS384",
      "use": "sig",
      "kid": "d7-ZR9YVxyceybmFmLd2neNVusoWmKrS4am5ZgJ0ado"
    }
  ]
}
```

*Generated 2026-06-12T00:48:10.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*