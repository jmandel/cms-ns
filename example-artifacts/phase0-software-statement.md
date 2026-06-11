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
eyJhbGciOiJFUzM4NCIsImtpZCI6ImxjNFFpcl9YRHlEemtfTWoxNTM3c1JoNTR5eWtPU3ZZazMwb09nMUN6eTQiLCJ0eXAiOiJKV1QifQ.eyJzb2Z0d2FyZV9pZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImNsaWVudF9uYW1lIjoiQlAgQnVkZHkiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvcHJpdmFjeSIsImNvbnRhY3RzIjpbInN1cHBvcnRAYnBidWRkeS5leGFtcGxlIl0sImdyYW50X3R5cGVzIjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InByaXZhdGVfa2V5X2p3dCIsImp3a3NfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvLndlbGwta25vd24vandrcy5qc29uIiwiZXh0ZW5zaW9ucyI6eyJjbXNfYXBwIjp7InZlcnNpb24iOiIxIiwibGlicmFyeV9zdGF0dXMiOiJhY3RpdmUiLCJhcHBfY2xhc3MiOiJwYXRpZW50LWFjY2Vzcy1hcHAifX0sImlzcyI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2ZyYW1ld29yay5jbXMuZ292L2FsaWduZWQtbmV0d29ya3MiLCJpYXQiOjE3ODEyMTY0NjYsImV4cCI6MTc4MTMwMjg2NiwianRpIjoiYjc3ZWJmYjUtMWQwYy00ZDk2LWJhZjItYjU5YTkyY2Y2MWVlIn0.ugT6X1KCD2XYS12ovYk5DW7PqlvkmbkoyZQ_p--ufCxF6p_Slxp3yBN7emyHP6y1KwGTTCtNMm6hDq2buGeJhePAsiqivV9rj2BSvkbyEiG33UxK3b1mDYKJJzNq5llN
```

Decoded header:

```json
{
  "alg": "ES384",
  "kid": "lc4Qir_XDyDzk_Mj1537sRh54yykOSvYk30oOg1Czy4",
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
  "iat": 1781216466,
  "exp": 1781302866,
  "jti": "b77ebfb5-1d0c-4d96-baf2-b59a92cf61ee"
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
      "n": "0FxvXhpTaI3UQDl0xL6jny64877K6pbe7yCD-Dl6tQnbYiwNBZQDFZ2rRj5ITO2IqX_2TTyMWCyZMSHr4x7kiG2AWVQ84M6QKPp4nlnpzPrjPdC4nEWJx9VxkBk30OO05zlfhdTy4u-LiGDvSDbR_YIPDiPKBYLAq7asE4kKebmCFxvprA43gs5FW68VqVYG8LkTUl66LwN0Yy-LyAPlgQZmDnhKdi1mFGU7gvT0CC3GXIRakRQbhTu08tNAroNbeRbfda6iaajmtdyv47P3vnYGbV7V_Fj1TiITSif4Lww9DM09gd6RgZ-SmP1Z2x10byd2iADvWvSQA6JRg0EeTQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "BATFzWKXJbAYS8z_8gGOxzScaZbXbejqmNFJVL1eg1A"
    }
  ]
}
```

*Generated 2026-06-11T22:21:06.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*