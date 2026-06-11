# Opening the authorization step

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The app opens a standard SMART App Launch code flow at the shared authorization service, passing Maria's id_token as a hint. The service then re-authenticates her silently at the CSP and receives a fresh id_token audienced to itself.*

**The app's authorize request at the service (browser redirect)**

```http
GET https://issuer.beta-exchange.example/authorize?response_type=code HTTP/1.1
  &client_id=sas-bp-buddy-3f81
  &redirect_uri=https://bpbuddy.example/callback
  &scope=permission_ticket+patient%2FObservation.rs+offline_access
  &code_challenge=E9Mt... &code_challenge_method=S256 &state=x7Hq
  &id_token_hint=eyJhbGciOiJSUzI1NiIsImtpZCI6ImtWM01WN0d5...
```

---

**The service's silent re-authentication at the CSP (no screen if Maria's CSP session is live)**

```http
GET https://api.id.me/oidc/authorize?response_type=code&prompt=none HTTP/1.1
  &client_id=https%3A%2F%2Fissuer.beta-exchange.example
  &redirect_uri=https://issuer.beta-exchange.example/csp/callback
  &scope=openid
  &id_token_hint=eyJhbGciOiJSUzI1NiIsImtpZCI6ImtWM01WN0d5...
```

---

**Fresh id_token from the silent re-auth: same person, new auth event, aud is now the service** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6ImtWM01WN0d5Z3pYSnZfS3o5eFljcG9mUmZqSWpBSXhwQl9lQXlMSzRkRDQiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxODI0MiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiOGVmYzA5MDgtOTVmMC00NDBkLWFmMTgtNWU0OGQ4MmNhNzA4IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjE4MjQyLCJleHAiOjE3ODEyMTg1NDIsImp0aSI6IjMwNzA5MjRkLWU4NGQtNGNjYy1iNjQ0LWM2ODU2MDkzZjgzNSJ9.qENwPioTVDJciyqOZe44gNrAnrv7rMS_tGMKimmYWpBtp_LMCPHP_hAaoQ-IIjbjLsVsoTeuLKK2gXojIlqm5nmlnFqUjg5yRad76YZ1LW1ioq-y-jJexdWKjnyXyGG-KbtNnfacGcMS8RMXEbobb7mvnZ7QEF4triK64Sulbg1cyPSTK7FKLlGPWLnlhqOfApEzGK4d8BBcBgx45U8DeZh4XV4cMrlKV-gnsgxwXx4FD0kVZdjTELKmNnLa1kL8-UTuE25d2GCtgQm-7Ple1m0v0iFyfXtuvgDG_itYsGbdzQFGfUZTlHXDLPpec2QmHza0W2I1RIX1tOg4xnYMdg
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
  "auth_time": 1781218242,
  "given_name": "Maria",
  "family_name": "Lopez",
  "birthdate": "1962-03-15",
  "iss": "https://api.id.me/oidc",
  "sub": "8efc0908-95f0-440d-af18-5e48d82ca708",
  "aud": "https://issuer.beta-exchange.example",
  "iat": 1781218242,
  "exp": 1781218542,
  "jti": "3070924d-e84d-4ccc-b644-c6856093f835"
}
```

---

The lighter option skips the silent re-auth: the service accepts the app-passed id_token itself as the sign-in. That token is verifiable and audience-bound to the app, and it proves the app holds a recent assertion about Maria, not that Maria is present in this browser.

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*