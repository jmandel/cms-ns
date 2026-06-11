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
eyJhbGciOiJSUzM4NCIsImtpZCI6IkJfdS1uRHAwbHBXSWI1bTZkT3pNVG5naUMwMzZ1UUpYa0g3OXNLc19OMHciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2RldmVsb3BlcnMuYWxwaGEtaGVhbHRoLmV4YW1wbGUiLCJpYXQiOjE3ODEyMjExMzYsImV4cCI6MTc4MTIyMTQzNiwianRpIjoiZWUwNWRhMTctYjJkNy00YzczLTk4OTMtMWI3YjY1YzYwZWMzIn0.3_OVsgIUGotk94C5dtJYR9Ni_IPk040JujH2z3XkrVPQqtN7JUT_9x3Z4bdg_4pAM8bmiVbUMqgbwMfwRm5ZfGpImkJxEnilZ18kJWGfTn5i9W_QD_Eh5yD1lX1t3Irzj7YNogdGRT_YszImA7bvtccYa0ny3akJsVzYsCgcDNYvjLGIOj9OQQvNuhl7nu7ZUmuwSnnLjWf5ZbM1yRKJ1HOzRk99PvvG4EGY37rL2csRfPDUVJAcSG-4UOISoXbCU8XswFwK9xmUQ5yR6xCzUCjDHl4_TiNZQwYyJg4QXu232GIpK-k09Kb7n7yZB0xQbtZI4qd0eikAtF7Senau6Q
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "B_u-nDp0lpWIb5m6dOzMTngiC036uQJXkH79sKs_N0w",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "iss": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "sub": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "aud": "https://developers.alpha-health.example",
  "iat": 1781221136,
  "exp": 1781221436,
  "jti": "ee05da17-b2d7-4c73-9893-1b7b65c60ec3"
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

*Generated 2026-06-11T23:38:56.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*