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
eyJhbGciOiJFUzM4NCIsImtpZCI6ImpWTG9aZHBNWEw1aHdmOFBnU0xxYnlkUmRNWlh6VGJTOVgwSkRIdnNHVTAiLCJ0eXAiOiJKV1QifQ.eyJzb2Z0d2FyZV9pZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImNsaWVudF9uYW1lIjoiQlAgQnVkZHkiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvcHJpdmFjeSIsImNvbnRhY3RzIjpbInN1cHBvcnRAYnBidWRkeS5leGFtcGxlIl0sImdyYW50X3R5cGVzIjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InByaXZhdGVfa2V5X2p3dCIsImp3a3NfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvLndlbGwta25vd24vandrcy5qc29uIiwiZXh0ZW5zaW9ucyI6eyJjbXNfYXBwIjp7InZlcnNpb24iOiIxIiwibGlicmFyeV9zdGF0dXMiOiJhY3RpdmUiLCJhcHBfY2xhc3MiOiJwYXRpZW50LWFjY2Vzcy1hcHAifX0sImlzcyI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2ZyYW1ld29yay5jbXMuZ292L2FsaWduZWQtbmV0d29ya3MiLCJpYXQiOjE3ODEyMDU0NTQsImV4cCI6MTc4MTI5MTg1NCwianRpIjoiZjliNzMyMmYtNzdjNy00Y2YxLWJmMzgtNjA1YjFjMTgxMmVhIn0.pEg9zf_FsgE10S5p0SWFDfE4D-b3noMkRfmK19VMNhnqeLtKL5o7dcxu0U3AKdYBzf2DiyecCXksaV2ohnFl8Pt6Oz8AtCfvui8Nbq6Dc-sCEMHB2woWEJBYm6iD3fln
```

Decoded header:

```json
{
  "alg": "ES384",
  "kid": "jVLoZdpMXL5hwf8PgSLqbydRdMZXzTbS9X0JDHvsGU0",
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
  "iat": 1781205454,
  "exp": 1781291854,
  "jti": "f9b7322f-77c7-4cf1-bf38-605b1c1812ea"
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
      "n": "yoBp4oUM3ySKjUd4DObu8C9knnPDWuOE1i6tE2BfBxH8GbDLBvCEHEf--tk--oZXobQPAN7TsG3-kAtuhM5lZN5WrhkjMPrnkWhl9-PTUgHPBUw-ltxSTt6HZu5kJF2EP_tyWVyQL4qvMOpjG069Xs2nCLXDjSJrIeqvj7dRrsJ6JXDo1M666wjFw-W1xEKuM9Ev4JBaaN6hAoNTFaOuz1BZMnjn2lsjU2yqGegnTDEc_V2dAVSo8UXaE0rSyN4JwPikTi_r4ai0RfSa9fHydO8luRM1QH_bRAywvC1HtjN_oi4T8V93ohw_DHJ4j-Nx9R7zRct4MuOUYLqIkGQs1Q",
      "alg": "RS384",
      "use": "sig",
      "kid": "1eYmvBkQ_oUUGVy857AFYHvSETlQYMAyOXj1TgXBRrs"
    }
  ]
}
```

*Generated 2026-06-11T19:17:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*