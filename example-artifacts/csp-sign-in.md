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
  "access_token": "rvVGzBZzr4EazhQOxhdfeBrGu1sTp2dP",
  "token_type": "Bearer",
  "expires_in": 300,
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlRQWEFxV3g1eTNxTGhGVV... (decoded below)"
}
```

---

**id_token: aud is the app's Library software_id** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6IlRQWEFxV3g1eTNxTGhGVVRZR2RIa2gzRkUtX3p4R192Y2d1N3BESmp3S2ciLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNDgyMSwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImI1NGQ2YzAyLTgwZWEtNDUxZi1iMDkyLTI3OGZkZDg2MTNlZiIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyNDgyMSwiZXhwIjoxNzgxMjI1MTIxLCJqdGkiOiI2MzM5YWQyNS03NDMwLTRjMDQtODExZS05MzRiMzEzYWIwMGIifQ.ESnJpmKfm232jT2hdgWcRqrt3dEwHPFDyrHMBTi2NsQdOisevWxb8PxVM10kXZqR8Xgg2siJofdPa6AaS809Fb4Y56I2cOvSIsHuaAnFof-EXP5bsFfZj2y9j2bKrFZJ9ChHU3UoN-udzPsiKx34rGkHY3IlvarGb0gd4T34iiorYxdnpk7dHwebqHx25bWo2SefcBLdP5liEiRz-kNXZvfSb4Bn2XQ750oH9ai08hmV1IG3MQStHYgQnyK0qMUrFUHrmjf9H8UITzEah5gEwxfPcMdtvq5FsiyRHdDpdI_NDAMxiq-jDRlT6kCUkRObtIlV69uCcTEi3i_RK1JNoQ
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "TPXAqWx5y3qLhFUTYGdHkh3FE-_zxG_vcgu7pDJjwKg",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781224821,
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
  "sub": "b54d6c02-80ea-451f-b092-278fdd8613ef",
  "aud": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "iat": 1781224821,
  "exp": 1781225121,
  "jti": "6339ad25-7430-4c04-811e-934b313ab00b"
}
```

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*