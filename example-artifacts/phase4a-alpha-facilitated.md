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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IjVUaWJkY3U4NEoyTkFWazA1ZnpCMzhF... (decoded below)"
}
```

---

**client_assertion — iss/sub are the Alpha-wide client_id; the cms_smart extension carries Maria's IAL2 id_token to the data holder** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IjVUaWJkY3U4NEoyTkFWazA1ZnpCMzhFTVF0aFJGWWxQemczaEZ4UkgwMUEiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxGYU0wNUlZVU4yZFRBME5uZERhR2w1WmtwNlNrTlFZa3d0TVhOeVpESkJVRXR3VGxJM1VISmljMDBpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNamcwT0N3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpGaU9XRmhPR00zTFRSaU1UTXROR0U0WlMxaU5UWXhMVFptTmpsa05qWXdPV1kzTWlJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlNamcwT0N3aVpYaHdJam94TnpneE1qSXpNVFE0TENKcWRHa2lPaUkyTmpneFlXTTRZUzFqTlRKakxUUmhZekV0T0dGbVl5MWhZVGszTnpsbFlUQXlOek1pZlEuZEQwdlU1am5CLUozZl9MdEl4ZTJIcnNmd1FiQmprYVNBM2JtUnRMcUFIQ0ZwQ3ZPdVBUMlA0WlZqMVFkVEFiMlRtZXY2WkNteEVqTWdVMEFtdnZBTXB2WDVNZXR0S0Jtb0ZVRVZaelBzdjA5MXpSaDZxSDNmTEpSbTVLbnNlZDFfZU9vQndFSmRwZ3U1aThNVHdYQ04tbzNITHREWFhWU2ZuaXBJcVJBTHlIODcyeThvakJlaFVTRC1GdndlbzRIQnhlYVR0OWgxVXAxNkl0TzVGZGVCZDdTaVdDUHNfQmhsNUhLQm9qNko4RXE3RjVKUkItRU4zMWJma3FiLVZtZFRoakx1djBmRkhrbW1teUFpTzhiNjQ5Y3VNTjBHR2U4d3RRWHk3VU9HXzlORDZKOThNYndhX2d4VzVibnZveWo3YVhqU3h6alV3bktVdGk5dmhTcFpRIn19LCJpc3MiOiJhbHBoYS1uZXQtYnAtYnVkZHktN2MzMSIsInN1YiI6ImFscGhhLW5ldC1icC1idWRkeS03YzMxIiwiYXVkIjoiaHR0cHM6Ly9nZW5lcmFsaG9zcGl0YWwuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyMzIwOCwianRpIjoiOWIzNjEyZjUtMGNiYi00NjFmLTkxMzYtNzY5Y2M5ZGM0MTZkIn0.A2FFoqk9YGDTs0U2JxmKcS8yBhLSx3gh_I6nhTWMznUKe0G8g51y2Zo7dGOv06BubsjBXuh4kBunhvzfeccEsbaJLO_k3yMR0bmtpM8V_I92Q60pBuz-u_6RVBv79m1wnua6uuj6zTktnETNbk5WQxhlFzMPD1UAlg37IjcaWIMu8ZsEOzPuWdIRO_7wFlUMywIWOq6QQG1riBxtt766SMIQAc0sNiOl1pojEziQTi5zXdkoNCijm8ptsqpDAzRXCXafwxuGt9LmssAe5donBhNo9z05wxgxoTJRCqYBOQp9fnhsz-2k2LYbA9XuHDiMNF0iDT6x8XKgqp8lE92zLQ
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "5Tibdcu84J2NAVk05fzB38EMQthRFYlPzg3hFxRH01A",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlFaM05IYUN2dTA0NndDaGl5Zkp6SkNQYkwtMXNyZDJBUEtwTlI3UHJic00iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMjg0OCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjFiOWFhOGM3LTRiMTMtNGE4ZS1iNTYxLTZmNjlkNjYwOWY3MiIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyMjg0OCwiZXhwIjoxNzgxMjIzMTQ4LCJqdGkiOiI2NjgxYWM4YS1jNTJjLTRhYzEtOGFmYy1hYTk3NzllYTAyNzMifQ.dD0vU5jnB-J3f_LtIxe2HrsfwQbBjkaSA3bmRtLqAHCFpCvOuPT2P4ZVj1QdTAb2Tmev6ZCmxEjMgU0AmvvAMpvX5MettKBmoFUEVZzPsv091zRh6qH3fLJRm5Knsed1_eOoBwEJdpgu5i8MTwXCN-o3HLtDXXVSfnipIqRALyH872y8ojBehUSD-Fvweo4HBxeaTt9h1Up16ItO5FdeBd7SiWCPs_Bhl5HKBoj6J8Eq7F5JRB-EN31bfkqb-VmdThjLuv0fFHkmmmyAiO8b649cuMN0GGe8wtQXy7UOG_9ND6J98Mbwa_gxW5bnvoyj7aXjSxzjUwnKUti9vhSpZQ"
    }
  },
  "iss": "alpha-net-bp-buddy-7c31",
  "sub": "alpha-net-bp-buddy-7c31",
  "aud": "https://generalhospital.example/oauth/token",
  "exp": 1781223208,
  "jti": "9b3612f5-0cbb-461f-9136-769cc9dc416d"
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
  "access_token": "qO-JSLFuCuu2e4Nv5OjXhvza1v4a7FXM",
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
Authorization: Bearer qO-JSLFuCuu2e4Nv5OjXhvza1v4a7FXM
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

*Generated 2026-06-12T00:08:28.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*