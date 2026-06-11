# The app signs Maria in at the CSP

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). BP Buddy is the CSP's relying party, exactly as today. The id_token it receives carries the app's canonical Library identifier as its audience, which is what lets any later verifier resolve the token to this app.*

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
  "access_token": "A8c825MQCQSyODfhi9WXbB2JdjjQgex4",
  "token_type": "Bearer",
  "expires_in": 300,
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImtWM01WN0d5Z3pYSnZfS3... (decoded below)"
}
```

---

**id_token: aud is the app's Library software_id** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6ImtWM01WN0d5Z3pYSnZfS3o5eFljcG9mUmZqSWpBSXhwQl9lQXlMSzRkRDQiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxODIxMiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImJiZDlhODAxLTdhNDYtNDRkZC04NmYzLWU3MjQ5ZTg2Yjc5YSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxODIxMiwiZXhwIjoxNzgxMjE4NTEyLCJqdGkiOiJkN2Q2YTMzYi1mZmI5LTQyZDAtOWVhYi03MGYyMzBjYzhlZWUifQ.PVdUAZwGuKBmlrSi3ALpjdLiQSuOz9mYMdsYuMf-053vzAlnIAeX8NrLh9Fk0lRiVguSAOYHp0KvOTsU8JwSqB_JLGEJ3tacgM-lfiFBympRUqxuLIUUlG5EsqVUFju_odh9AOO8rju0mLSlkb23-ps3t2JJdMCYrzWDz5GySIxAwREWa4Vm-EyZ7-xh_h64PBvhQ7Da1doy8g1-xjYile6onvulwc4os3gq-HXDPMuuSaaL9PRMfChtdfpnCyy15UVjpbLCtYgP4u9JpjQxYdcagX3srMSX7MU-FrUVE7eDxaNjS_GUDXQbfIX1oQ0RDcjPoFbtRM5O9Uy38BNVow
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "kV3MV7GygzXJv_Kz9xYcpofRfjIjAIxpB_eAyLK4dD4",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781218212,
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
  "sub": "bbd9a801-7a46-44dd-86f3-e7249e86b79a",
  "aud": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "iat": 1781218212,
  "exp": 1781218512,
  "jti": "d7d6a33b-ffb9-42d0-9eab-70f230cc8eee"
}
```

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*