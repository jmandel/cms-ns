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
eyJhbGciOiJFUzM4NCIsImtpZCI6IjJDNW1GVnY4UW1WdGdwRjFxLUI4X0Rkd19FOGZuMGp5OFNCN21qSXh5ZDgiLCJ0eXAiOiJKV1QifQ.eyJzb2Z0d2FyZV9pZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImNsaWVudF9uYW1lIjoiQlAgQnVkZHkiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUiLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvcHJpdmFjeSIsImNvbnRhY3RzIjpbInN1cHBvcnRAYnBidWRkeS5leGFtcGxlIl0sImdyYW50X3R5cGVzIjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InByaXZhdGVfa2V5X2p3dCIsImp3a3NfdXJpIjoiaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUvLndlbGwta25vd24vandrcy5qc29uIiwiZXh0ZW5zaW9ucyI6eyJjbXNfYXBwIjp7InZlcnNpb24iOiIxIiwibGlicmFyeV9zdGF0dXMiOiJhY3RpdmUiLCJhcHBfY2xhc3MiOiJwYXRpZW50LWFjY2Vzcy1hcHAifX0sImlzcyI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2ZyYW1ld29yay5jbXMuZ292L2FsaWduZWQtbmV0d29ya3MiLCJpYXQiOjE3ODEyMjQ4ODEsImV4cCI6MTc4MTMxMTI4MSwianRpIjoiMjQ3ZTBiMDQtNjc4Yi00NTQ0LWJmZmItODNiYTkwNWI1N2NhIn0.w49DpoJKJXMxoDZsjFcjBrEJljfD5dRG-gBhF4R6p3vO1mRvZWbfNz049MQh2DfefmnHikJ7CF8__5K-1MOPVrI4QTNsJhKZB8cDieiA1FMbzvOKBiuFIMU490hFetGP
```

Decoded header:

```json
{
  "alg": "ES384",
  "kid": "2C5mFVv8QmVtgpF1q-B8_Ddw_E8fn0jy8SB7mjIxyd8",
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
  "iat": 1781224881,
  "exp": 1781311281,
  "jti": "247e0b04-678b-4544-bffb-83ba905b57ca"
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
      "n": "po2n6-CRFZM2WunlOAkN2OSG2sNwsHBqeTh6oi3CNIGPAtcN2P_GAvr8v6BNOHiM4VOHA-GWeWgTHJozijJcHYPNpqJeqlZA8TDzeCVO18_mBAUf3XGIbxUM_bqWN2KB-Za89geKHT1qEsj8u_xJp__Q1vVHRCKykkFdzZmT2vihrg6diQJCe6b7FZB2bAp-MilqveALzZSpwG6gKZwlEU0iSNKUf1SkvX2Z_dmnUU-c-dhx_a1jMQCYi4OB--NGEBsK7nIjAbZl6AkglYyXfEET-DpikZTL8DqfHxD-UdHmflZCoXV9QbwHnqm6b7HdqE8Qt1SLm4jkex0K0ZZGVQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "ZEmTzHnM8NIMGeu04ACckrbxWG_7zhJO3n_va1SvVV0"
    }
  ]
}
```

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*