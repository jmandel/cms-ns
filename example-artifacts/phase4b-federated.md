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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IjFlWW12QmtRX29VVUdWeTg1N0FGWUh2... (decoded below)"
}
```

---

**client_assertion** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IjFlWW12QmtRX29VVUdWeTg1N0FGWUh2U0VUbFFZTUF5T1hqMVRnWEJScnMiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5kcE1VUlhSazF0ZURac2FXSkZhVEJaVURRMmJ6aEZVbWhJVG5keVNFbE1iVlU0U2sxNGNsVXRWMnNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXdOVE01TkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpSak9HSmxNVGcxTFRjeE56WXROR0kzTXkxaE1qTmhMVEJoTmpReFpqWm1ZamsxTlNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXdOVE01TkN3aVpYaHdJam94TnpneE1qQTFOamswTENKcWRHa2lPaUkzTXpjek9ETTBOeTB4T0dObExUUmhOemt0WW1FMU55MHlPV016TldFd09XRTJPR0lpZlEuZzV3cTJRcTlHejkwc2tKSWl2WjRTaEdDUnpTd3Nkb3FxcWl2MEpMWGl0a2psZUJuZEtzMHNPdTdiNEtiZ1NBb25vTWMxUC1MMGE5eFdFZEpOalZiUHBVaGV1YUwyenh6M2VCMmJOVTcweDZYbW81QTBkYTN3b3YyaE50UVk3N3lIbVVFUllTbG9GOWZJQlp0S3dwbUtsQlhZQXpwaHltVU00MEtkSGlsS05pbjI2eThTaF93ck9BUTU4bU15QldqUUlvU3RTaC1EMnpnOFJQeVRNUE1uUUxSbDc4YVhUSmdBVmpLdWc1c2hMWWhiNlk0NmZVdjlURlRDTEozNzZOVEVIc0g2ellnbnhaWnBnTjRlT25kcEgzeVJtWmQ4d3RJZjVLREZlZ3BsdHJycURzUkQydmE1bWxZU1JFeTBSRVNOVXJfTDFXMmMyNThZbzJsY1dqRnlBIn19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIwNTc1NCwianRpIjoiMjZlMjNhZjMtMDFhMi00N2M3LWE5NzktMGY3ZmU4ODFmYTBlIn0.g66UwUdr3Og0C-4REsgIfdqj8wJJ_UNvlpQJ6xdh33eUzVve3VHQFOcMq_ojFPGPHsZaRFDqIPmGw76lgaoMOqIjnR-KDdf301yzbgBBVhOLBG-UZ2nXKPYOH3NNtX1d1EX9rpCgt1QyA-NIDLg9LWsoYadt-l89CS1s8BOyisKC3a_zOliDM22nPJbBi2BkL-LC_0yPqyLz2K30p8cqwD_s4jMkIAPbgP85NAD1WQX9hZuHJW6YJbYD_qyBZm7Dxh8gAxY-eJWONhJxU9sleZRYNu3gQaoNEHXLp1TGc11VF5BafdhzlXLb1ditn-WmI4f0-VIxufjY492BOfd7Gg
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
  "extensions": {
    "cms_smart": {
      "version": "1",
      "purpose_of_use": "PATRQT",
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IndpMURXRk1teDZsaWJFaTBZUDQ2bzhFUmhITndySElMbVU4Sk14clUtV2siLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIwNTM5NCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjRjOGJlMTg1LTcxNzYtNGI3My1hMjNhLTBhNjQxZjZmYjk1NSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIwNTM5NCwiZXhwIjoxNzgxMjA1Njk0LCJqdGkiOiI3MzczODM0Ny0xOGNlLTRhNzktYmE1Ny0yOWMzNWEwOWE2OGIifQ.g5wq2Qq9Gz90skJIivZ4ShGCRzSwsdoqqqiv0JLXitkjleBndKs0sOu7b4KbgSAonoMc1P-L0a9xWEdJNjVbPpUheuaL2zxz3eB2bNU70x6Xmo5A0da3wov2hNtQY77yHmUERYSloF9fIBZtKwpmKlBXYAzphymUM40KdHilKNin26y8Sh_wrOAQ58mMyBWjQIoStSh-D2zg8RPyTMPMnQLRl78aXTJgAVjKug5shLYhb6Y46fUv9TFTCLJ376NTEHsH6zYgnxZZpgN4eOndpH3yRmZd8wtIf5KDFegpltrrqDsRD2va5mlYSREy0RESNUr_L1W2c258Yo2lcWjFyA"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781205754,
  "jti": "26e23af3-01a2-47c7-a979-0f7fe881fa0e"
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
  "access_token": "up2P5rRGp29VC1xukO4pzvsT0QwvOqj_",
  "refresh_token": "m-cFuCQkpsxmbPjzfz8LihpXYwhjkkEH",
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
Authorization: Bearer up2P5rRGp29VC1xukO4pzvsT0QwvOqj_
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

*Generated 2026-06-11T19:17:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*