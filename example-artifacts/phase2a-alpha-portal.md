# Registration through a developer portal

*Worked example for [the record location and data access write-up](../authorizing-access.md). Most of this flow is a human in a browser, so the artifacts are the two machine-verifiable pieces: the statement link the developer pastes, and a key-possession proof the portal can ask for.*

**What the developer pastes into the portal form:**

```
https://library.medicare.gov/app-library/apps/bp-buddy/software-statement.jwt
```

The portal fetches it, verifies the CMS signature against CMS's published JWKS, checks `library_status: active`, and pre-fills app name, URIs, and contacts from the payload (see [phase0-software-statement](phase0-software-statement.md)).

---

One way Alpha can verify key possession during signup is a short-lived JWT the developer's tooling produces, verifiable against the app's CMS-verified `jwks_uri`:

**key-possession proof** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IlpFbVR6SG5NOE5JTUdldTA0QUNja3JieFdHXzd6aEpPM25fdmExU3ZWVjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2RldmVsb3BlcnMuYWxwaGEtaGVhbHRoLmV4YW1wbGUiLCJpYXQiOjE3ODEyMjQ4ODEsImV4cCI6MTc4MTIyNTE4MSwianRpIjoiOGRmYjU4YjItNjJkMS00Yzg1LTgyMWMtOWM5NzZiYjQ5ZjU3In0.V7tGJ1SJisk6JJPZ0057RFB1s371yNK_5ZmD2unrndoujGt-2HJj0d-wmTNF6JpahRLnlAxKRi6HjK0IHibFuJRSaujreq5Zn0OECTq_0qe7neiX9n9fhwlLQZQipvl3HuPzbuNac-vU7h50fKq0lm3UJDY48QTUrfTPSmfmx-B1PCHRHIt5PR8bcF6C1-6g5HTYWc5nsF9742tu7nkmgxDPsgktRWKg5H4SNLIt-TReb84HuQspp1Zfl3YCE9S5n3l8T85CzF9iJlvQvuQjTEEiwdlmKZ7XcXabZQm2PZ0V5U3mXqx2yMeHQBj3yuuhsSSpCwzclq0mlTxLpTQHSg
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "ZEmTzHnM8NIMGeu04ACckrbxWG_7zhJO3n_va1SvVV0",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "iss": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "sub": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "aud": "https://developers.alpha-health.example",
  "iat": 1781224881,
  "exp": 1781225181,
  "jti": "8dfb58b2-62d1-4c85-821c-9c976bb49f57"
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

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*