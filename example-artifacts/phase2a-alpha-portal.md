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
eyJhbGciOiJSUzM4NCIsImtpZCI6IjZ5WHEtdnhWSFgtcEttdEJOd09mQlN3eWNVSFBaTEhvdHlHWUZ3SVVBVHMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2RldmVsb3BlcnMuYWxwaGEtaGVhbHRoLmV4YW1wbGUiLCJpYXQiOjE3ODEyMTgyNzIsImV4cCI6MTc4MTIxODU3MiwianRpIjoiYzljOWYyZjAtZmNiYy00ZTZiLTgyZWUtNmFmMmJlNmJlMDA1In0.lG8oc3p5iyyVbrkFeizFVnTMcTel17vI8hv6jd2JbBhoCMFcBgQ-qk1fQx4vk2l3Ti0R7t9kTn1uPVaX1_cvAYsBlIj3U8Z2nIA2Bjq7NSFlSmRikqJnQMc32CXW4VRaU9IS-751PXbjWZGH-xH-TUnLYIgaqMambBsPrYLIF3czqQsD1mldy1DanQrzCtbFZDf0MlchuNV2tAhW0i4O02xgVxlqEPoygJBnGmWZbrap8C9yktmopghTP75mEnqFm-QZIQ_set81MqHaj5n4A-7TQdoLTD29IvViMYlYPnx4aN2RiHCYhzOqzBk5d3igSVI9gK1F1m6KBCga6yVO5A
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "6yXq-vxVHX-pKmtBNwOfBSwycUHPZLHotyGYFwIUATs",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "iss": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "sub": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "aud": "https://developers.alpha-health.example",
  "iat": 1781218272,
  "exp": 1781218572,
  "jti": "c9c9f2f0-fcbc-4e6b-82ee-6af2be6be005"
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

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*