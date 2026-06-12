# Opening the authorization step

*Worked example for [the record location and data access write-up](../authorizing-access.md). The app opens a standard SMART App Launch code flow at the shared authorization service, passing Maria's id_token as a hint. The service then re-authenticates her silently at the CSP and receives a fresh id_token audienced to itself.*

**The app's authorize request at the service (browser redirect)**

```http
GET https://issuer.beta-exchange.example/authorize?response_type=code HTTP/1.1
  &client_id=sas-bp-buddy-3f81
  &redirect_uri=https://bpbuddy.example/callback
  &scope=permission_ticket+patient%2FObservation.rs+offline_access
  &code_challenge=E9Mt... &code_challenge_method=S256 &state=x7Hq
  &id_token_hint=eyJhbGciOiJSUzI1NiIsImtpZCI6InNyYTY3dkEy...
```

---

**The service's silent re-authentication at the CSP (no screen if Maria's CSP session is live)**

```http
GET https://api.id.me/oidc/authorize?response_type=code&prompt=none HTTP/1.1
  &client_id=https%3A%2F%2Fissuer.beta-exchange.example
  &redirect_uri=https://issuer.beta-exchange.example/csp/callback
  &scope=openid
  &id_token_hint=eyJhbGciOiJSUzI1NiIsImtpZCI6InNyYTY3dkEy...
```

---

**Fresh id_token from the silent re-auth: same person, new auth event, aud is now the service** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6InNyYTY3dkEyLURyUUxfUF9nRVByQUp3TGtLaDA5RE1VTkJ3YzJDNlA3c28iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNTI2MCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiNmU5MjA5NTktOWNiZC00YzAyLTgzNzQtYzgzNTZiOGQ1MjY2IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjI1MjYwLCJleHAiOjE3ODEyMjU1NjAsImp0aSI6ImY2ODZkNGJlLTNiZTMtNGVjMC05NGQ1LTAyYzhkZmM2NzgwMyJ9.SnxqIPC-OJ3SpgB2E-M4d92bpG8DnuLlE6e_Tq7WCkq2yAEXFFoE05LucgT50ElTeXyEltCohVqCjnfRr43v33_6IPZEX8Ab5psMPQowZEu8pJ7Ylf3fIWBnwLAKcSH7Sgif1o7bIB_8UaAwgEUNF6n1Cn_NLJ_FWuDly_IHpr0dd1UZx0Wb02NXsDL7aFv2n0gpzcGvUYd_NBuNWzzJTham7gw7tFE4gf8OYJ4_YpT0L__EDMnUjuw3j5XCeesWkwqt2pYC-OeSqtFhYmpbjk0kcEdgZdfvVWwEXFs29LS1v_6XxR_MDdcDN09qXWudPyfWIj5hks95RQEXmiwAkg
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
  "auth_time": 1781225260,
  "given_name": "Maria",
  "family_name": "Lopez",
  "birthdate": "1962-03-15",
  "iss": "https://api.id.me/oidc",
  "sub": "6e920959-9cbd-4c02-8374-c8356b8d5266",
  "aud": "https://issuer.beta-exchange.example",
  "iat": 1781225260,
  "exp": 1781225560,
  "jti": "f686d4be-3be3-4ec0-94d5-02c8dfc67803"
}
```

---

The lighter option skips the silent re-auth: the service accepts the app-passed id_token itself as the sign-in. That token is verifiable and audience-bound to the app, and it proves the app holds a recent assertion about Maria, not that Maria is present in this browser.

*Generated 2026-06-12T00:48:10.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*