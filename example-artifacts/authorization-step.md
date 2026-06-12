# Opening the authorization step

*Worked example for [the record location and data access write-up](../authorizing-access.md). The app opens a standard SMART App Launch code flow at the shared authorization service, passing Maria's id_token as a hint. The service then re-authenticates her silently at the CSP and receives a fresh id_token audienced to itself.*

**The app's authorize request at the service (browser redirect)**

```http
GET https://issuer.beta-exchange.example/authorize?response_type=code HTTP/1.1
  &client_id=sas-bp-buddy-3f81
  &redirect_uri=https://bpbuddy.example/callback
  &scope=permission_ticket+patient%2FObservation.rs+offline_access
  &code_challenge=E9Mt... &code_challenge_method=S256 &state=x7Hq
  &id_token_hint=eyJhbGciOiJSUzI1NiIsImtpZCI6IlRQWEFxV3g1...
```

---

**The service's silent re-authentication at the CSP (no screen if Maria's CSP session is live)**

```http
GET https://api.id.me/oidc/authorize?response_type=code&prompt=none HTTP/1.1
  &client_id=https%3A%2F%2Fissuer.beta-exchange.example
  &redirect_uri=https://issuer.beta-exchange.example/csp/callback
  &scope=openid
  &id_token_hint=eyJhbGciOiJSUzI1NiIsImtpZCI6IlRQWEFxV3g1...
```

---

**Fresh id_token from the silent re-auth: same person, new auth event, aud is now the service** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6IlRQWEFxV3g1eTNxTGhGVVRZR2RIa2gzRkUtX3p4R192Y2d1N3BESmp3S2ciLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNDg1MSwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiYzRmOWU3M2YtZDIxZS00NmRiLWI3NmUtYmFmY2MzM2QwZTQ1IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjI0ODUxLCJleHAiOjE3ODEyMjUxNTEsImp0aSI6IjI3ZDAzOTc5LWY4YWQtNGI3ZS05MGM3LTA3MDE5ODUxOThlZiJ9.qVsPA5K6NtC3_YslYNWp3wuPqwBcZc1_YL0VypMVs3u9N9FlV12CvpLbV3uw0daNyaD50vtvPweanw--R0noR-tbFjXV5LfIy0iU_ItffL-nJ5PR25u8M-XFHM_i1q0WksPOdBjhehpTBMnCYEPMGlUTOuM4Zv9T0w3fY2jO3zO5Om8obEO4zFyW0PSl3D-Sduq6ouWhinKcar1n638NDxAbMVXJCw-Cr3rcV1ZEUSs9w-VLdXv6784x8z3-Efsffn4JhtIrErWYUxBhQuLLfCIyXrgDsr9mO0s3M3-6KUH71lsCt37XGwN_BkExtbqX38KkI_wrTSUMRok-D8v51w
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
  "auth_time": 1781224851,
  "given_name": "Maria",
  "family_name": "Lopez",
  "birthdate": "1962-03-15",
  "iss": "https://api.id.me/oidc",
  "sub": "c4f9e73f-d21e-46db-b76e-bafcc33d0e45",
  "aud": "https://issuer.beta-exchange.example",
  "iat": 1781224851,
  "exp": 1781225151,
  "jti": "27d03979-f8ad-4b7e-90c7-0701985198ef"
}
```

---

The lighter option skips the silent re-auth: the service accepts the app-passed id_token itself as the sign-in. That token is verifiable and audience-bound to the app, and it proves the app holds a recent assertion about Maria, not that Maria is present in this browser.

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*