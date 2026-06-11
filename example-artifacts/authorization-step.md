# Opening the authorization step

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The app opens a standard SMART App Launch code flow at the shared authorization service, passing Maria's id_token as a hint. The service then re-authenticates her silently at the CSP and receives a fresh id_token audienced to itself.*

**The app's authorize request at the service (browser redirect)**

```http
GET https://issuer.beta-exchange.example/authorize?response_type=code HTTP/1.1
  &client_id=sas-bp-buddy-3f81
  &redirect_uri=https://bpbuddy.example/callback
  &scope=permission_ticket+patient%2FObservation.rs+offline_access
  &code_challenge=E9Mt... &code_challenge_method=S256 &state=x7Hq
  &id_token_hint=eyJhbGciOiJSUzI1NiIsImtpZCI6Ik5CbWl2Snhh...
```

---

**The service's silent re-authentication at the CSP (no screen if Maria's CSP session is live)**

```http
GET https://api.id.me/oidc/authorize?response_type=code&prompt=none HTTP/1.1
  &client_id=https%3A%2F%2Fissuer.beta-exchange.example
  &redirect_uri=https://issuer.beta-exchange.example/csp/callback
  &scope=openid
  &id_token_hint=eyJhbGciOiJSUzI1NiIsImtpZCI6Ik5CbWl2Snhh...
```

---

**Fresh id_token from the silent re-auth: same person, new auth event, aud is now the service** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6Ik5CbWl2SnhhM09VUEJhcU1OTTF4QVJHVG12U0ZnTm1WREtHeXRyZ0pKN2siLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMTEwNiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiYWJlZGNlZjYtYjNlOC00MDhmLTgzNzktNmU0N2MyZjE0YWE5IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjIxMTA2LCJleHAiOjE3ODEyMjE0MDYsImp0aSI6IjNkMGIyMWQyLTcwNjEtNGNmOC04MzNlLTZlOGY3ZjAxMmRlMCJ9.RLogrxJKK-5uHDRjuWsFgWZ_X7wIM09F1tAo22aEh3ew2f_vB8h4jRTfjuL7psy3M-b3bBehVRKE6cTpbliaZ-JcDGI2-y64XQxpBZqv246YF2jb_qvP0AorkGeOW-gA41OTY26zK6RJ0ciNO-w5Bgccjww1-t6XwCchokPRVfhk5FOam0wS2ToG10HQI0hD2oax2rvxZtiZljCXcmJbfOR0WhnRVoSlRWBoc93C-3tDyNksyrbmc4lNy6CmbhDhf4-r5xGe3ubLrpaDHkBaF8Msru8c2YSSzd1eIgXaLJHTx_WokdSFrDC56vE-svehHFY6zl2-_kDrkIgDWX9tWw
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
  "auth_time": 1781221106,
  "given_name": "Maria",
  "family_name": "Lopez",
  "birthdate": "1962-03-15",
  "iss": "https://api.id.me/oidc",
  "sub": "abedcef6-b3e8-408f-8379-6e47c2f14aa9",
  "aud": "https://issuer.beta-exchange.example",
  "iat": 1781221106,
  "exp": 1781221406,
  "jti": "3d0b21d2-7061-4cf8-833e-6e8f7f012de0"
}
```

---

The lighter option skips the silent re-auth: the service accepts the app-passed id_token itself as the sign-in. That token is verifiable and audience-bound to the app, and it proves the app holds a recent assertion about Maria, not that Maria is present in this browser.

*Generated 2026-06-11T23:38:56.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*