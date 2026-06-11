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
eyJhbGciOiJSUzM4NCIsImtpZCI6IjFlWW12QmtRX29VVUdWeTg1N0FGWUh2U0VUbFFZTUF5T1hqMVRnWEJScnMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2RldmVsb3BlcnMuYWxwaGEtaGVhbHRoLmV4YW1wbGUiLCJpYXQiOjE3ODEyMDU0NTQsImV4cCI6MTc4MTIwNTc1NCwianRpIjoiNjgwNWZmY2UtZTY5Zi00MTFmLTk0ZDQtMjZmYjY2MzY4OWZmIn0.fw3iMXEEB_3oQ6sHEQ7Y-6WsB3YQLIRewblvMIwokXZ5TZBlrrGl19jtSi6CrFwA9cGzm4mqYqGNTepKS2ul_i8z3jnk_8wb3R65HlMxF8Wrclmg7jUk4RgcwPQQOAWXXSY20swwYJQtHnNZ5t_OLqdL6uqbKRhqAgwG0qUaHn2r7T7jT_ImVLwtvfTJBcX7_CfX3G0Ya7jrYgOXMvQqUECTQWJEL54wEThx3SVdkODpMnJ4ZEpm434-Y4nxRKKrJ9fei1WRAEzj6Aq2PWz9g7p4tMcL4M-Po4gswv9uxBHtPgeYyt-v3bddABswCOWicbHGueER6r5L4mZ5m2Iybw
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "1eYmvBkQ_oUUGVy857AFYHvSETlQYMAyOXj1TgXBRrs",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "iss": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "sub": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "aud": "https://developers.alpha-health.example",
  "iat": 1781205454,
  "exp": 1781205754,
  "jti": "6805ffce-e69f-411f-94d4-26fb663689ff"
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

*Generated 2026-06-11T19:17:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*