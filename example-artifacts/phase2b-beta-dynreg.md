# Phase 2b — Dynamic registration at a Beta data holder

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The same RFC 7591 call repeats at each Beta data holder; one representative exchange is shown, at Lakeside Clinic.*

**Request — RFC 7591 registration**

```http
POST https://lakeside.example/oauth/register HTTP/1.1
Host: lakeside.example
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJSUzM4NCIsImtpZCI6IjZ5WHEtdnhW... (key-possession JWT, same shape as in 2a)
```

```json
{
  "software_statement": "eyJhbGciOiJFUzM4NCIsImtpZCI6IlhicENWd2YzSHNZMlpFWVVtYkJpeE5M... (full value in phase0-software-statement)",
  "grant_types": [
    "client_credentials"
  ],
  "token_endpoint_auth_method": "private_key_jwt"
}
```

---

The data holder verifies the CMS signature, reads `library_status`, confirms key possession against the statement's `jwks_uri`, and checks Beta's approval signal for this app if Beta publishes one.

**Response — 201 Created**

```http
HTTP/1.1 201 Created
Content-Type: application/json
```

```json
{
  "client_id": "lakeside-dh-bp-buddy-91af",
  "software_id": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "grant_types": [
    "client_credentials"
  ],
  "token_endpoint_auth_method": "private_key_jwt",
  "jwks_uri": "https://bpbuddy.example/.well-known/jwks.json"
}
```

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*