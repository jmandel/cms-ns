# Phase 2a — Alpha developer portal

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Most of this flow is a human in a browser, so the artifacts are the two machine-verifiable pieces: the statement link the developer pastes, and a key-possession proof the portal can ask for.*

**What the developer pastes into the portal form:**

```
https://library.medicare.gov/app-library/apps/bp-buddy/software-statement.jwt
```

The portal fetches it, verifies the CMS signature against CMS's published JWKS, checks `library_status: active`, and pre-fills app name, URIs, and contacts from the payload (see [phase0-software-statement](phase0-software-statement.md)).

---

One way Alpha can verify key possession during signup is a short-lived JWT the developer's tooling produces, verifiable against the app's CMS-verified `jwks_uri`:

**key-possession proof** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6ImkyYTllbDlkSzZoeEt3RnhORy1YWm8zVjhtR1ppTDlwa1piLXdzQnd6aWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2RldmVsb3BlcnMuYWxwaGEtaGVhbHRoLmV4YW1wbGUiLCJpYXQiOjE3ODExOTgzNTIsImV4cCI6MTc4MTE5ODY1MiwianRpIjoiYTQ0NDBjNGItYjFiMy00NTBkLTk2MWMtMDg5ZmQyZDBhZTlkIn0.PxSXX1iW2J5LCgkfeW4AFcSFaQPL_t0Y4Fp-bHAuFgmvN_IsThUcYO5gjIU9T613yQeqlmMTDKuveaStEo1m2yggCxv422aQEQHZMwIE1MZKV6uFVnu9EOLZrIwhnjpArkDnMaDJe1zDy4DJwPBkieNpYkLkSxvVXb8MKd-_t10wdwbOFC8HQt4Fxr3WyetJBR-cKH9mXB-ndzHYboXlW-5546PJHiflQapQu5gyYcLXufEkQ8VjRDs31HwM0fyKBwgdSH9fXjFjTuXFzA1ENbQUosE6tpaQvWDwoBKL9M6wF53r7IjNBhERN9vbo4u4r1sbyjEsMCq8F7lx-A4JFA
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "i2a9el9dK6hxKwFxNG-XZo3V8mGZiL9pkZb-wsBwzic",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "iss": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "sub": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "aud": "https://developers.alpha-health.example",
  "iat": 1781198352,
  "exp": 1781198652,
  "jti": "a4440c4b-b1b3-450d-961c-089fd2d0ae9d"
}
```

---

**Portal provisions the registration — the developer sees**

```http
HTTP/1.1 201 Created
Content-Type: application/json
```

```json
{
  "client_id": "alpha-net-bp-buddy-7c31",
  "grant_types": [
    "client_credentials"
  ],
  "token_endpoint": "https://auth.alpha-health.example/v1/token",
  "note": "Valid at every Alpha data holder; no further registrations on this network."
}
```

*Generated 2026-06-11T17:19:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*