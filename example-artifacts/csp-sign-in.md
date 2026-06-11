# The app signs Maria in at the CSP

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). BP Buddy is the CSP's relying party. The id_token it receives carries the app's canonical Library identifier as its audience, which is what lets any later verifier resolve the token to this app.*

**Authorize request (browser redirect to the CSP)**

```http
GET https://api.id.me/oidc/authorize?response_type=code HTTP/1.1
  &client_id=https%3A%2F%2Flibrary.medicare.gov%2Fapp-library%2Fapps%2Fbp-buddy
  &redirect_uri=https://bpbuddy.example/csp/callback
  &scope=openid+profile
  &state=af0X9 &nonce=n-7qL2
```

---

**Token response after the code exchange**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "uf7_ms0LXK8BvtJrvwvlNpq1csZe0HYe",
  "token_type": "Bearer",
  "expires_in": 300,
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ik5CbWl2SnhhM09VUEJhcU... (decoded below)"
}
```

---

**id_token: aud is the app's Library software_id** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6Ik5CbWl2SnhhM09VUEJhcU1OTTF4QVJHVG12U0ZnTm1WREtHeXRyZ0pKN2siLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMTA3NiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjZkYWYxYTM3LTBkZmQtNGVjMy1hNDUwLTUzNTVlNTE3ZjVlMCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyMTA3NiwiZXhwIjoxNzgxMjIxMzc2LCJqdGkiOiIyODI2ODM5Zi02NTYyLTQ0NzUtYjk3Ny1lYjg2NTRlNGM0MWMifQ.IQgk6gv4GVbv-8ulZ9gMGAfRYhbESr32ofGqrNeNucMpxMhoofA66c3gAv0Gg-21lcsBqouwrYh4GsYZdxlSkRjoMg_6yM-8EY_mEltFc0dpLv9dcNXSAjv-mCvzyZZALXbyl5RWxDeqLGtOQbqFOML2jWqvc3mXlqEIH_ha3IinXka1t59a0xGOezzrVBBjTMS5CR6jmdggzM_m5Lv6vPJsyEvO2alONZCXACwUcLFfyUGJx5Uf0iI1CGyA_dGKpHdj-SCj6IYjSDSStOUPPp-BlmQltxVeNwxCct6Mwy3S3i5gYS0Y3Sq8EaRtnKUSDmsUWpdUglZNov8cMXd5LA
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "NBmivJxa3OUPBaqMNM1xARGTmvSFgNmVDKGytrgJJ7k",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781221076,
  "given_name": "Maria",
  "family_name": "Lopez",
  "birthdate": "1962-03-15",
  "address": {
    "street_address": "418 Alder Court",
    "locality": "Riverside",
    "region": "CA",
    "postal_code": "92501",
    "country": "US"
  },
  "ssn_itin_short": "4321",
  "iss": "https://api.id.me/oidc",
  "sub": "6daf1a37-0dfd-4ec3-a450-5355e517f5e0",
  "aud": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "iat": 1781221076,
  "exp": 1781221376,
  "jti": "2826839f-6562-4475-b977-eb8654e4c41c"
}
```

*Generated 2026-06-11T23:38:56.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*