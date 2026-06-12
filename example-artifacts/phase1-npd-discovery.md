# Phase 1 — NPD discovery

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Plain JSON, no signatures: the app (or its client library) learns how each network handles registration.*

**Request**

```http
GET https://npd.cms.gov/networks?status=cms-aligned HTTP/1.1
Accept: application/json
```

---

**Response — 200 OK**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "networks": [
    {
      "name": "Alpha Health Network",
      "registration": {
        "style": "centralized-portal",
        "portal": "https://developers.alpha-health.example"
      },
      "token_endpoint": "https://auth.alpha-health.example/v1/token",
      "rls_endpoint": "https://rls.alpha-health.example/fhir",
      "retrieval": "facilitated-fhir",
      "data_holder_endpoints": "https://npd.cms.gov/endpoints?network=alpha"
    },
    {
      "name": "Beta Exchange",
      "registration": {
        "style": "dynamic-registration",
        "software_statement_issuers": [
          "https://library.medicare.gov"
        ]
      },
      "rls_endpoint": "https://rls.beta-exchange.example/fhir",
      "retrieval": "federated-fhir",
      "data_holder_endpoints": "https://npd.cms.gov/endpoints?network=beta"
    },
    {
      "name": "Gamma Trust Network",
      "registration": {
        "style": "udap-dynamic-registration",
        "community_ca": "https://ca.gamma-trust.example/anchor.pem"
      },
      "rls_endpoint": "https://rls.gamma-trust.example/fhir",
      "retrieval": "federated-fhir",
      "data_holder_endpoints": "https://npd.cms.gov/endpoints?network=gamma"
    }
  ]
}
```

*Generated 2026-06-12T00:08:28.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*