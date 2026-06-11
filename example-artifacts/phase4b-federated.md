# Phase 4b — Federated retrieval at Lakeside Clinic (Beta; Gamma is identical)

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Same token shape as everywhere else; the only difference from 4a is that the data holder's own authorization server issues the token, and a refresh_token supports the rolling 90-day window of can-spec §9.*

**Token request**

```http
POST https://lakeside.example/oauth/token HTTP/1.1
Host: lakeside.example
Content-Type: application/x-www-form-urlencoded
```

```json
{
  "grant_type": "client_credentials",
  "scope": "patient/Observation.rs patient/MedicationRequest.rs launch/patient",
  "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IjQxeHM3YThWV2hIWlFRbXdZOVJrMFJu... (decoded below)"
}
```

---

**client_assertion** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IjQxeHM3YThWV2hIWlFRbXdZOVJrMFJuR0tqQjdJd3kwQ3B4LVZTVkRTSWsiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWsxNFVqSm1jRlZCTVRGUGNURnlhM05UTlV0SVgxTnJOVXRpY0VSQ2JtUk1ibGszYlU4MVNHNUhSVlVpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhOREkwTkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWprME9EZG1NalptTFRVek1XWXRORFUzTmkxaE56STNMV0V5TXpGaFpHVmlaRFF6TUNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXhOREkwTkN3aVpYaHdJam94TnpneE1qRTBOVFEwTENKcWRHa2lPaUkxTjJWaVl6aGtPUzAwTjJFNUxUUTRPVGN0T1RVeE9TMDNOR0V3T1RoaE1EZ3dNbUVpZlEuVDBrZmNMWXVrcWs0dFppVU95YmhXelZaWWlVRGZZbTNUZDBRY29zNFFITWQxcDhwNUtNYTltalNlcldIMTIyS1EzUlhnVHVEbEhySW8wNmxnck9heFhFRkU2ZFZhZU56ZTc3TUJDSEZFRkRmc0wzcnFsNF8ybFhISHZUNXhNVG9BNWN3OXV3dnNXbFpqbDRDQWdlOUFDdFJ1WG14anhUbTcwUlZJVjQ1Z2o5bGstcE9fd200cVdUNDFDc1FDRWY2NU1QNEU5OHA1eGVYSlZ3dVlmQndTOUhzWFFkVXF4TllOVWRNbk8wSzFHalN1cjBwVUtfamlwQ2dUbUZGYVJMcGdWdkxEbWtBZXdXTDBRcUpaS2lvYmpNZXJSeTQtWTg0aDdySHA1QmtBeUZLLXJfV1o1UkJleERXMHNLWGdFUVBLNG1tRFJ1cnFuX1dzRVpfQkwxYjB3In19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIxNDYwNCwianRpIjoiZjEwYjEzNzktNDcwMS00NWM1LTlmNzAtZGMzNTY0MTVmNTZhIn0.kq2BepblhiYkHuFaEMSJvjZYz0HM2LSGjfneZoKkmDJSWKQPK26CzRcEoXJvw0V2CLgv6wM_RQ17trD6ylFB1II3mYz93NhFzaFrxbWOrWy7BL5PqqSwXXiQKdxkY5uVdBcS9Fq3d1ZQJ_HXa9F0SOhgTchof0qHJfFsyFFp75xaMz4biZlvrAQqGpHg3kwqDVcTzCwwn0XZnsedbvabmZnxc1cAWn0J0TKqWOj5ZIclOYGT3N_W_NeVK-igMkTbECRTelvsBORZqXkA0B98uVfknORdvUW8S0HCIV9GSfetDQ4jCoPFfqVSaBV_wI6JVvp6AobzMeKbTnYaMBdb7w
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "41xs7a8VWhHZQQmwY9Rk0RnGKjB7Iwy0Cpx-VSVDSIk",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "extensions": {
    "cms_smart": {
      "version": "1",
      "purpose_of_use": "PATRQT",
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ik14UjJmcFVBMTFPcTFya3NTNUtIX1NrNUticERCbmRMblk3bU81SG5HRVUiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxNDI0NCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6Ijk0ODdmMjZmLTUzMWYtNDU3Ni1hNzI3LWEyMzFhZGViZDQzMCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxNDI0NCwiZXhwIjoxNzgxMjE0NTQ0LCJqdGkiOiI1N2ViYzhkOS00N2E5LTQ4OTctOTUxOS03NGEwOThhMDgwMmEifQ.T0kfcLYukqk4tZiUOybhWzVZYiUDfYm3Td0Qcos4QHMd1p8p5KMa9mjSerWH122KQ3RXgTuDlHrIo06lgrOaxXEFE6dVaeNze77MBCHFEFDfsL3rql4_2lXHHvT5xMToA5cw9uwvsWlZjl4CAge9ACtRuXmxjxTm70RVIV45gj9lk-pO_wm4qWT41CsQCEf65MP4E98p5xeXJVwuYfBwS9HsXQdUqxNYNUdMnO0K1GjSur0pUK_jipCgTmFFaRLpgVvLDmkAewWL0QqJZKiobjMerRy4-Y84h7rHp5BkAyFK-r_WZ5RBexDW0sKXgEQPK4mmDRurqn_WsEZ_BL1b0w"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781214604,
  "jti": "f10b1379-4701-45c5-9f70-dc356415f56a"
}
```

---

**Token response**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "RAGi8GWWQFejgeLI4FGujK0u98Zvl_Zt",
  "refresh_token": "JXAF_AsSAltdQjTYcAT19XlF_aGr7wwF",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "patient/Observation.rs patient/MedicationRequest.rs launch/patient",
  "patient": "lakeside-449210"
}
```

---

**FHIR query**

```http
GET https://lakeside.example/fhir/Observation?patient=lakeside-449210&category=vital-signs&_count=1 HTTP/1.1
Authorization: Bearer RAGi8GWWQFejgeLI4FGujK0u98Zvl_Zt
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

*Generated 2026-06-11T21:45:04.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*