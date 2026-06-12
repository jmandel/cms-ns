# Registration through a developer portal

*Worked example for [the record location and data access write-up](../authorizing-access.md). Most of this flow is a human in a browser, so the artifacts are the two machine-verifiable pieces: the statement link the developer pastes, and a key-possession proof the portal can ask for.*

**What the developer pastes into the portal form:**

```
https://library.medicare.gov/app-library/apps/bp-buddy/software-statement.jwt
```

The portal fetches it, verifies the CMS signature against CMS's published JWKS, checks `library_status: active`, and pre-fills app name, URIs, and contacts from the payload (see [software-statement](software-statement.md)).

---

One way Alpha can verify key possession during signup is a short-lived JWT the developer's tooling produces, verifiable against the app's CMS-verified `jwks_uri`:

**key-possession proof** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6ImQ3LVpSOVlWeHljZXlibUZtTGQybmVOVnVzb1dtS3JTNGFtNVpnSjBhZG8iLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJzdWIiOiJodHRwczovL2xpYnJhcnkubWVkaWNhcmUuZ292L2FwcC1saWJyYXJ5L2FwcHMvYnAtYnVkZHkiLCJhdWQiOiJodHRwczovL2RldmVsb3BlcnMuYWxwaGEtaGVhbHRoLmV4YW1wbGUiLCJpYXQiOjE3ODEyMjUyOTAsImV4cCI6MTc4MTIyNTU5MCwianRpIjoiY2UwZTc5MWEtZWU1Zi00ZWViLWJiODktMmNkNzdhYmY4MjhmIn0.mVAGlKWNUmFEW2FxoJ7z45zJ31p-oGbcIW_iBFdh5B_R-d0rwu65GRb1ZKnNp2N6Utb70m3u5XlzGwc7a-GIOBrVay48HIlyV_ZtraRpdFtzHedT0SH39-EICu-knGdm5cZFRA1cHj5E72YON7rPduQJJUgRif2ha-PWlHq6Q10KghmLFvRYQi219enEfrqfTznEGym6lWbQj28zqIc6GEzHj7lD7ShqAWnrF2hkBft1eqCGtLCA6ObqFVj8K5youoprrJGPblmzAJ4YfX-cBjLoZcJ2eK7Qu1p4iW1Th7bXchv0Yh27lUmNV5OxmxRZdNa0eyv5wNWKANGRKHhYaw
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "d7-ZR9YVxyceybmFmLd2neNVusoWmKrS4am5ZgJ0ado",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "iss": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "sub": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "aud": "https://developers.alpha-health.example",
  "iat": 1781225290,
  "exp": 1781225590,
  "jti": "ce0e791a-ee5f-4eeb-bb89-2cd77abf828f"
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

*Generated 2026-06-12T00:48:10.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*