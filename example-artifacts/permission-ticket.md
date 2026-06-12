# A signed permission ticket and its redemption

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The patient authorizes once at a shared authorization service via a SMART App Launch code flow; the token response carries per-site tickets like this one plus endpoint hints (see issuance-token-response). The app redeems the ticket at each data holder's token endpoint via RFC 8693; the data holder verifies the ticket, independently verifies the embedded identity evidence, matches the patient locally, and issues its own token with the matched id.*

**Permission ticket — note subject demographics, the embedded IAL2 id_token as subject_identity_evidence, and the presenter binding to the app's key** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6IjRKWmVYeDFEaUU0cllMTHdOSjJfN0ZjMTRTcFEzbUI0UXpreXdrRU94TGsiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxGYU0wNUlZVU4yZFRBME5uZERhR2w1WmtwNlNrTlFZa3d0TVhOeVpESkJVRXR3VGxJM1VISmljMDBpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNamczT0N3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWW1ZNU1HUTBNV0V0WTJSaFlpMDBNbUU0TFRnMk1UY3RaR1U1WWpReU4yWmlObU01SWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSXlPRGM0TENKbGVIQWlPakUzT0RFeU1qTXhOemdzSW1wMGFTSTZJak5pWmpoaVlXWmxMV1k0T0dJdE5EQXhZUzFpTjJRM0xXTTFOREJoWW1Zek4yUmlZeUo5LmhmNE9UeDF6X05nejVXN0hXRFk3T01OOTJMSlhrUjJYUENJWW1RTTA5ak5YM1VCTmtkTUJHc1paeDZ3SVJKbG5GakZBem1pX21NUTRjZEdjNm5DSXBIbEVKdmtIWDB3ZXlyakRkWXdoZXVBb0xGVktNSmxIWk96TmJHdGpwbnpQdTEyTjhWZExSdkpsTDlfLVFoajJlUzEwMHZXSFFpOS1BUVd3UkJuUnowTEVVYWNFQ2ZXX2piQTdrMmhQSlItay1CdlZVWVdTNzdnY3lYaDJjOUF0RlhVdEl2ZndRdDg5RVJSTVR2aGhhMHcydzdjVERfTGdBdWs0cnlLSHU2NWJpR1ZHeEMtQnpMY0VTSENENDFLMUtpMEU1XzJPQnM2Q1AxMVhEVkVKMjdseHU5UjU1SDlKVDh4X0czdTFtbWItc3dUQ3p3LUFxdERiR01LUTBwVlhIZyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IjVUaWJkY3U4NEoyTkFWazA1ZnpCMzhFTVF0aFJGWWxQemczaEZ4UkgwMUEifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiTGFrZXNpZGUgQ2xpbmljIn1dfSwiaXNzIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL2ZoaXIiLCJpYXQiOjE3ODEyMjI5MDgsImV4cCI6MTc4MTIyNjUwOCwianRpIjoiZTA5ZjQ1NDYtNjYxZC00ZWUwLThmNDYtNjM4M2RmYjU3MTZhIn0.wYbD8k4Yc7PzldfOI7GbtkX95j5XWR7KWk5GJYbnlThiJoY3jCqUVJL9bQ5X-IYlNRy2oNCSm8dNkd4xlmdvdw
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "4JZeXx1DiE4rYLLwNJ2_7Fc14SpQ3mB4QzkywkEOxLk",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "ticket_type": "patient-self-access-v1",
  "subject": {
    "patient": {
      "name": [
        {
          "family": "Lopez",
          "given": [
            "Maria"
          ]
        }
      ],
      "birthDate": "1962-03-15"
    }
  },
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlFaM05IYUN2dTA0NndDaGl5Zkp6SkNQYkwtMXNyZDJBUEtwTlI3UHJic00iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMjg3OCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiYmY5MGQ0MWEtY2RhYi00MmE4LTg2MTctZGU5YjQyN2ZiNmM5IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjIyODc4LCJleHAiOjE3ODEyMjMxNzgsImp0aSI6IjNiZjhiYWZlLWY4OGItNDAxYS1iN2Q3LWM1NDBhYmYzN2RiYyJ9.hf4OTx1z_Ngz5W7HWDY7OMN92LJXkR2XPCIYmQM09jNX3UBNkdMBGsZZx6wIRJlnFjFAzmi_mMQ4cdGc6nCIpHlEJvkHX0weyrjDdYwheuAoLFVKMJlHZOzNbGtjpnzPu12N8VdLRvJlL9_-Qhj2eS100vWHQi9-AQWwRBnRz0LEUacECfW_jbA7k2hPJR-k-BvVUYWS77gcyXh2c9AtFXUtIvfwQt89ERRMTvhha0w2w7cTD_LgAuk4ryKHu65biGVGxC-BzLcESHCD41K1Ki0E5_2OBs6CP11XDVEJ27lxu9R55H9JT8x_G3u1mmb-swTCzw-AqtDbGMKQ0pVXHg",
  "presenter_binding": {
    "jkt": "5Tibdcu84J2NAVk05fzB38EMQthRFYlPzg3hFxRH01A"
  },
  "access": {
    "permissions": [
      {
        "resource_type": "Observation",
        "interactions": [
          "read",
          "search"
        ]
      }
    ],
    "data_holder_filter": [
      {
        "organization": "Lakeside Clinic"
      }
    ]
  },
  "iss": "https://issuer.beta-exchange.example",
  "aud": "https://lakeside.example/fhir",
  "iat": 1781222908,
  "exp": 1781226508,
  "jti": "e09f4546-661d-4ee0-8f46-6383dfb5716a"
}
```

The `subject_identity_evidence` is a CSP-signed id_token whose `aud` names the ticket issuer: the issuer ran the CSP sign-in as relying party during the issuance ceremony. The data holder verifies the evidence's signature against the CSP's keys itself (evidence-issuer trust is configured separately from ticket-issuer trust) and resolves the evidence's client identifier to the ticket issuer. `presenter_binding.jkt` is the thumbprint of the app key in [keys-and-trust-anchors](keys-and-trust-anchors.md).

---

**Redemption — RFC 8693 token exchange at the data holder**

```http
POST https://lakeside.example/oauth/token HTTP/1.1
Host: lakeside.example
Content-Type: application/x-www-form-urlencoded
```

```json
{
  "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
  "subject_token_type": "https://smarthealthit.org/token-type/permission-ticket",
  "subject_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6IjRKWmVYeDFEaUU0cllMTHdOSjJfN0Zj... (full value above)",
  "scope": "patient/Observation.rs",
  "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
  "client_assertion": "(signed with the key named by presenter_binding.jkt)"
}
```

---

**Token response — the data holder's own token, with its matched patient id**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "(bearer token used below)",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "patient/Observation.rs",
  "patient": "lakeside-449210"
}
```

---

**FHIR query with that token**

```http
GET https://lakeside.example/fhir/Observation?patient=lakeside-449210&category=vital-signs&_count=1 HTTP/1.1
Authorization: Bearer (token from above)
Accept: application/fhir+json
```

---

**FHIR response**

```http
HTTP/1.1 200 OK
Content-Type: application/fhir+json
```

```json
{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 1,
  "entry": [
    {
      "resource": {
        "resourceType": "Observation",
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "85354-9",
              "display": "Blood pressure panel"
            }
          ]
        },
        "subject": {
          "reference": "Patient/lakeside-449210"
        },
        "effectiveDateTime": "2026-06-02T14:10:00Z",
        "component": [
          {
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "8480-6"
                }
              ]
            },
            "valueQuantity": {
              "value": 131,
              "unit": "mmHg"
            }
          },
          {
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "8462-4"
                }
              ]
            },
            "valueQuantity": {
              "value": 82,
              "unit": "mmHg"
            }
          }
        ]
      }
    }
  ]
}
```

*Generated 2026-06-12T00:08:28.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*