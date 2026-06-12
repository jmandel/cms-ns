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
  "access_token": "3coJXoYqAVuKQ3wDpkYzUcOW6vuGVZ1J",
  "token_type": "Bearer",
  "expires_in": 300,
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlFaM05IYUN2dTA0NndDaG... (decoded below)"
}
```

---

**id_token: aud is the app's Library software_id** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6IlFaM05IYUN2dTA0NndDaGl5Zkp6SkNQYkwtMXNyZDJBUEtwTlI3UHJic00iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMjg0OCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjFiOWFhOGM3LTRiMTMtNGE4ZS1iNTYxLTZmNjlkNjYwOWY3MiIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyMjg0OCwiZXhwIjoxNzgxMjIzMTQ4LCJqdGkiOiI2NjgxYWM4YS1jNTJjLTRhYzEtOGFmYy1hYTk3NzllYTAyNzMifQ.dD0vU5jnB-J3f_LtIxe2HrsfwQbBjkaSA3bmRtLqAHCFpCvOuPT2P4ZVj1QdTAb2Tmev6ZCmxEjMgU0AmvvAMpvX5MettKBmoFUEVZzPsv091zRh6qH3fLJRm5Knsed1_eOoBwEJdpgu5i8MTwXCN-o3HLtDXXVSfnipIqRALyH872y8ojBehUSD-Fvweo4HBxeaTt9h1Up16ItO5FdeBd7SiWCPs_Bhl5HKBoj6J8Eq7F5JRB-EN31bfkqb-VmdThjLuv0fFHkmmmyAiO8b649cuMN0GGe8wtQXy7UOG_9ND6J98Mbwa_gxW5bnvoyj7aXjSxzjUwnKUti9vhSpZQ
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "QZ3NHaCvu046wChiyfJzJCPbL-1srd2APKpNR7PrbsM",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781222848,
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
  "sub": "1b9aa8c7-4b13-4a8e-b561-6f69d6609f72",
  "aud": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "iat": 1781222848,
  "exp": 1781223148,
  "jti": "6681ac8a-c52c-4ac1-8afc-aa9779ea0273"
}
```

*Generated 2026-06-12T00:08:28.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*