# Phase 4a — Alpha-wide client_id at General Hospital's token endpoint

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Alpha distributed one client_id at portal registration but does not issue access tokens; each data holder's own authorization server does, after validating the identity evidence itself. The same exchange repeats at every Alpha data holder holding records.*

**Token request — to the data holder, using the network-distributed client_id**

```http
POST https://generalhospital.example/oauth/token HTTP/1.1
Host: generalhospital.example
Content-Type: application/x-www-form-urlencoded
```

```json
{
  "grant_type": "client_credentials",
  "scope": "patient/Observation.rs launch/patient",
  "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IjFlWW12QmtRX29VVUdWeTg1N0FGWUh2... (decoded below)"
}
```

---

**client_assertion — iss/sub are the Alpha-wide client_id; the cms_smart extension carries Maria's IAL2 id_token to the data holder** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IjFlWW12QmtRX29VVUdWeTg1N0FGWUh2U0VUbFFZTUF5T1hqMVRnWEJScnMiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5kcE1VUlhSazF0ZURac2FXSkZhVEJaVURRMmJ6aEZVbWhJVG5keVNFbE1iVlU0U2sxNGNsVXRWMnNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXdOVE01TkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpSak9HSmxNVGcxTFRjeE56WXROR0kzTXkxaE1qTmhMVEJoTmpReFpqWm1ZamsxTlNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXdOVE01TkN3aVpYaHdJam94TnpneE1qQTFOamswTENKcWRHa2lPaUkzTXpjek9ETTBOeTB4T0dObExUUmhOemt0WW1FMU55MHlPV016TldFd09XRTJPR0lpZlEuZzV3cTJRcTlHejkwc2tKSWl2WjRTaEdDUnpTd3Nkb3FxcWl2MEpMWGl0a2psZUJuZEtzMHNPdTdiNEtiZ1NBb25vTWMxUC1MMGE5eFdFZEpOalZiUHBVaGV1YUwyenh6M2VCMmJOVTcweDZYbW81QTBkYTN3b3YyaE50UVk3N3lIbVVFUllTbG9GOWZJQlp0S3dwbUtsQlhZQXpwaHltVU00MEtkSGlsS05pbjI2eThTaF93ck9BUTU4bU15QldqUUlvU3RTaC1EMnpnOFJQeVRNUE1uUUxSbDc4YVhUSmdBVmpLdWc1c2hMWWhiNlk0NmZVdjlURlRDTEozNzZOVEVIc0g2ellnbnhaWnBnTjRlT25kcEgzeVJtWmQ4d3RJZjVLREZlZ3BsdHJycURzUkQydmE1bWxZU1JFeTBSRVNOVXJfTDFXMmMyNThZbzJsY1dqRnlBIn19LCJpc3MiOiJhbHBoYS1uZXQtYnAtYnVkZHktN2MzMSIsInN1YiI6ImFscGhhLW5ldC1icC1idWRkeS03YzMxIiwiYXVkIjoiaHR0cHM6Ly9nZW5lcmFsaG9zcGl0YWwuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIwNTc1NCwianRpIjoiMDFjZWRmZTItNGRmNS00MWQ3LTgxZWQtYjE2NjAxMDVhOWIxIn0.RBC8vsPnhmYtV9Iemba03Vc62c5vxCwRzYOOikLoK6M1m9g7CN40LAiN0AzUbkMjwzhY0RgL9pl3O9FtzX8s3BDf1ZGT_coq-jw0YJek2CeKUGVbLiOn6mDk1WmKhSMB1zmfCjhU2DZnpp43DodX0yJG4DmqocPxQX5m-D3OqMOD3eqepsWcvtMNEoL6Qb82Jikw1NrELP7qEof3hP_rjE9i7bRUA6CTwygd5nQibMU6AI_j7dZD-IfVputsHewyw9_1im5ISzg9Yx3JQV2do-qMXemQfguEUFSpyVs6U2cglnH_aPEyb611eruydjz_QJImqPeKaSp42HLSz5PNEA
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
  "iss": "alpha-net-bp-buddy-7c31",
  "sub": "alpha-net-bp-buddy-7c31",
  "aud": "https://generalhospital.example/oauth/token",
  "exp": 1781205754,
  "jti": "01cedfe2-4df5-41d7-81ed-b1660105a9b1"
}
```

---

**Token response — issued by General Hospital, with its locally matched patient id**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "NOhK-z_FxEUS_SyX5r0RgqlKFlr2w9su",
  "token_type": "Bearer",
  "expires_in": 1800,
  "scope": "patient/Observation.rs launch/patient",
  "patient": "gh-local-228847"
}
```

---

**FHIR query — using the matched id**

```http
GET https://fhir.generalhospital.example/r4/Observation?patient=gh-local-228847&category=vital-signs&_count=1 HTTP/1.1
Authorization: Bearer NOhK-z_FxEUS_SyX5r0RgqlKFlr2w9su
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
        "category": [
          {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                "code": "vital-signs"
              }
            ]
          }
        ],
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
          "reference": "Patient/gh-local-228847"
        },
        "effectiveDateTime": "2026-05-28T09:30:00Z",
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
              "value": 128,
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
              "value": 79,
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