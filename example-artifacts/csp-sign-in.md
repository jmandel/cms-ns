# The app signs Maria in at the CSP

*Worked example for [the record location and data access write-up](../authorizing-access.md). BP Buddy is the CSP's relying party. The id_token it receives carries the app's canonical Library identifier as its audience, which is what lets any later verifier resolve the token to this app.*

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
  "access_token": "kp1hxh9yz4-pzjSWxkH74T4A_Ev3IhOP",
  "token_type": "Bearer",
  "expires_in": 300,
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InNyYTY3dkEyLURyUUxfUF... (decoded below)"
}
```

---

**id_token: aud is the app's Library software_id** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6InNyYTY3dkEyLURyUUxfUF9nRVByQUp3TGtLaDA5RE1VTkJ3YzJDNlA3c28iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNTIzMCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImI3YWRlODFmLTZkZTEtNDExZS04NjM0LWIxOTk5NjdlZmQzZCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyNTIzMCwiZXhwIjoxNzgxMjI1NTMwLCJqdGkiOiIxMWZiMmYxNS1jOGU3LTRmZjgtYTYzNS1mZWZmNGNkYzUwMjEifQ.qk42yXvhAfJakTwLppstQsY-JEnz99k6GmQoGPeO-59zfrsqWYlZ6k7nFPRRKzBRn1N81AEx4MGkg3zBx9p9Y5KzUbM39VZJYPCBXaBS17aT_t8O5lD2uUra6hFAjvuXU0uXWcSGhQy7X1PtZQ7RmeRUUjRIkY6EF0RrZ-I2P5KIaCQP4uPF1PIxd-gfD_Zef0gETnVB-E9PfrRTmjVBavHLvabj6FLEkWPfhWKLXc8v7SfytFweHInKnSPVymVqRJaeg9v5T-lBqJgT9NMCj0PIiEJhz3nvZ_Lw2DXXBkokr1Kb33-zOTWOeExDptTuwiBgy9q0WRyXxQNtTRT1dw
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "sra67vA2-DrQL_P_gEPrAJwLkKh09DMUNBwc2C6P7so",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781225230,
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
  "sub": "b7ade81f-6de1-411e-8634-b199967efd3d",
  "aud": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "iat": 1781225230,
  "exp": 1781225530,
  "jti": "11fb2f15-c8e7-4ff8-a635-feff4cdc5021"
}
```

*Generated 2026-06-12T00:48:10.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*