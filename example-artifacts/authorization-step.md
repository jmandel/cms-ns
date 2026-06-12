# Opening the authorization step

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The app opens a standard SMART App Launch code flow at the shared authorization service, passing Maria's id_token as a hint. The service then re-authenticates her silently at the CSP and receives a fresh id_token audienced to itself.*

**The app's authorize request at the service (browser redirect)**

```http
GET https://issuer.beta-exchange.example/authorize?response_type=code HTTP/1.1
  &client_id=sas-bp-buddy-3f81
  &redirect_uri=https://bpbuddy.example/callback
  &scope=permission_ticket+patient%2FObservation.rs+offline_access
  &code_challenge=E9Mt... &code_challenge_method=S256 &state=x7Hq
  &id_token_hint=eyJhbGciOiJSUzI1NiIsImtpZCI6IlFaM05IYUN2...
```

---

**The service's silent re-authentication at the CSP (no screen if Maria's CSP session is live)**

```http
GET https://api.id.me/oidc/authorize?response_type=code&prompt=none HTTP/1.1
  &client_id=https%3A%2F%2Fissuer.beta-exchange.example
  &redirect_uri=https://issuer.beta-exchange.example/csp/callback
  &scope=openid
  &id_token_hint=eyJhbGciOiJSUzI1NiIsImtpZCI6IlFaM05IYUN2...
```

---

**Fresh id_token from the silent re-auth: same person, new auth event, aud is now the service** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6IlFaM05IYUN2dTA0NndDaGl5Zkp6SkNQYkwtMXNyZDJBUEtwTlI3UHJic00iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMjg3OCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiYmY5MGQ0MWEtY2RhYi00MmE4LTg2MTctZGU5YjQyN2ZiNmM5IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjIyODc4LCJleHAiOjE3ODEyMjMxNzgsImp0aSI6IjNiZjhiYWZlLWY4OGItNDAxYS1iN2Q3LWM1NDBhYmYzN2RiYyJ9.hf4OTx1z_Ngz5W7HWDY7OMN92LJXkR2XPCIYmQM09jNX3UBNkdMBGsZZx6wIRJlnFjFAzmi_mMQ4cdGc6nCIpHlEJvkHX0weyrjDdYwheuAoLFVKMJlHZOzNbGtjpnzPu12N8VdLRvJlL9_-Qhj2eS100vWHQi9-AQWwRBnRz0LEUacECfW_jbA7k2hPJR-k-BvVUYWS77gcyXh2c9AtFXUtIvfwQt89ERRMTvhha0w2w7cTD_LgAuk4ryKHu65biGVGxC-BzLcESHCD41K1Ki0E5_2OBs6CP11XDVEJ27lxu9R55H9JT8x_G3u1mmb-swTCzw-AqtDbGMKQ0pVXHg
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
  "auth_time": 1781222878,
  "given_name": "Maria",
  "family_name": "Lopez",
  "birthdate": "1962-03-15",
  "iss": "https://api.id.me/oidc",
  "sub": "bf90d41a-cdab-42a8-8617-de9b427fb6c9",
  "aud": "https://issuer.beta-exchange.example",
  "iat": 1781222878,
  "exp": 1781223178,
  "jti": "3bf8bafe-f88b-401a-b7d7-c540abf37dbc"
}
```

---

The lighter option skips the silent re-auth: the service accepts the app-passed id_token itself as the sign-in. That token is verifiable and audience-bound to the app, and it proves the app holds a recent assertion about Maria, not that Maria is present in this browser.

*Generated 2026-06-12T00:08:28.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*