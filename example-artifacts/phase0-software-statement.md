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
eyJhbGciOiJFUzM4NCIsImtpZCI6IjNfRnAxQ1FPRTVoSmpGQWp6RkRReGt0aUVuRHMxTHc1NkhzQmNpZTBlRk0iLCJ0eXAiOiJKV1QifQ.eyJzb2Z0d2FyZV9pZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImNsaWVudF9uYW1lIjoiQlAgQnVkZHkiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvcHJpdmFjeSIsImNvbnRhY3RzIjpbInN1cHBvcnRAYnBidWRkeS5leGFtcGxlIl0sImdyYW50X3R5cGVzIjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InByaXZhdGVfa2V5X2p3dCIsImp3a3NfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvLndlbGwta25vd24vandrcy5qc29uIiwiZXh0ZW5zaW9ucyI6eyJjbXNfYXBwIjp7InZlcnNpb24iOiIxIiwibGlicmFyeV9zdGF0dXMiOiJhY3RpdmUiLCJhcHBfY2xhc3MiOiJwYXRpZW50LWFjY2Vzcy1hcHAifX0sImlzcyI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2ZyYW1ld29yay5jbXMuZ292L2FsaWduZWQtbmV0d29ya3MiLCJpYXQiOjE3ODExOTgzNTIsImV4cCI6MTc4MTI4NDc1MiwianRpIjoiOTFjMTFiNTAtZmY2MC00MTIwLThiOWQtN2M2NTU2OGQ4YTFiIn0.yQkcjwTMOLexKAEMKRq0uMILs8iJYODnppkZsKVZ1MOqimskai_SV9bj-f1vLsR4Tw2iVTshataWEGSuhIw8Pf3g4R-n6k0cvhmKsOdRM0ofcDzIwEWgePS3SSrZPLok
```

Decoded header:

```json
{
  "alg": "ES384",
  "kid": "3_Fp1CQOE5hJjFAjzFDQxktiEnDs1Lw56HsBcie0eFM",
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
  "iat": 1781198352,
  "exp": 1781284752,
  "jti": "91c11b50-ff60-4120-8b9d-7c65568d8a1b"
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
      "n": "vf9KmYWMJJMqCl5v84gso4QqSjPhlB36cHKMmgTu5kU99Og2q4o02-bMVLp2n34DQCMj0XxOWBOMhLuotjBaMgWW4t5GrFfQap-VuYNoqXPJ5Au6-fSoFgkAL6Z7IqQ52YHCMwF6H1xSfTxEQS-JiiiL2zeqy6FMiQWJiekHDgId2FFSlcql18Wi6f1BgD2oUy5aVck97906gO5cq5l7JTztzC5coQTiyZy0ebYucMbLpMNq6Q94ryAJ0wkMOzvGvwXHOIt_xZZ96Hv6yiSbDUapx0mGpO3LLqtHmn7tPGztApt4Y_gMWlFuEMRtrsjm5e9-hRTYrxqANYrr9HlpUw",
      "alg": "RS384",
      "use": "sig",
      "kid": "i2a9el9dK6hxKwFxNG-XZo3V8mGZiL9pkZb-wsBwzic"
    }
  ]
}
```

*Generated 2026-06-11T17:19:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*