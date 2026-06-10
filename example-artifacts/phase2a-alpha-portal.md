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
eyJhbGciOiJSUzM4NCIsImtpZCI6Ii1uYThkUHVsa3FwM3dsRTJIdVZBQ1U3Yjd0WHVHQ3ZSWXJ6QmVoRXVRS3ciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2RldmVsb3BlcnMuYWxwaGEtaGVhbHRoLmV4YW1wbGUiLCJpYXQiOjE3ODExMDUzNzQsImV4cCI6MTc4MTEwNTY3NCwianRpIjoiZWQzMDg2YzgtZTNlNC00NzZiLThmODYtNTkxZTM1Zjg2MGY2In0.us--j8GOKDTG4y3yrj5G7SHspOQcacMOvyTM3dsaDatcivZ7MZXKlWxS9k0498kT9a_R3WaWdnOhppno5SRofhLcC5jqvv48_9bpHPPOyh-7vtB636679LIFCFDSezVyxPkEQBT8EJ8sfMu6kaeDvCEtuI7m32FmujRM_yurqcxj4iP59xnsIdyIJ_oLgRJvJX6AlyxC0zFeUL_YUd7FGGOSWBUtuOmzL30gu8d_oVt0VDaNkJXGUqE442qIJ1J_rM_Hiiuim7iiZoxXKxv-YhjNwrCm6yGDoTVc_jwExZOM2A2OYtS8IEDwu3pua3aBIc5ktMlqVrydRzHBU9tzFA
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "-na8dPulkqp3wlE2HuVACU7b7tXuGCvRYrzBehEuQKw",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "iss": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "sub": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "aud": "https://developers.alpha-health.example",
  "iat": 1781105374,
  "exp": 1781105674,
  "jti": "ed3086c8-e3e4-476b-8f86-591e35f860f6"
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

*Generated 2026-06-10T15:29:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*