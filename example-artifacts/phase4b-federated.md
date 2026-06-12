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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IjVUaWJkY3U4NEoyTkFWazA1ZnpCMzhF... (decoded below)"
}
```

---

**client_assertion** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IjVUaWJkY3U4NEoyTkFWazA1ZnpCMzhFTVF0aFJGWWxQemczaEZ4UkgwMUEiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxGYU0wNUlZVU4yZFRBME5uZERhR2w1WmtwNlNrTlFZa3d0TVhOeVpESkJVRXR3VGxJM1VISmljMDBpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNamcwT0N3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpGaU9XRmhPR00zTFRSaU1UTXROR0U0WlMxaU5UWXhMVFptTmpsa05qWXdPV1kzTWlJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlNamcwT0N3aVpYaHdJam94TnpneE1qSXpNVFE0TENKcWRHa2lPaUkyTmpneFlXTTRZUzFqTlRKakxUUmhZekV0T0dGbVl5MWhZVGszTnpsbFlUQXlOek1pZlEuZEQwdlU1am5CLUozZl9MdEl4ZTJIcnNmd1FiQmprYVNBM2JtUnRMcUFIQ0ZwQ3ZPdVBUMlA0WlZqMVFkVEFiMlRtZXY2WkNteEVqTWdVMEFtdnZBTXB2WDVNZXR0S0Jtb0ZVRVZaelBzdjA5MXpSaDZxSDNmTEpSbTVLbnNlZDFfZU9vQndFSmRwZ3U1aThNVHdYQ04tbzNITHREWFhWU2ZuaXBJcVJBTHlIODcyeThvakJlaFVTRC1GdndlbzRIQnhlYVR0OWgxVXAxNkl0TzVGZGVCZDdTaVdDUHNfQmhsNUhLQm9qNko4RXE3RjVKUkItRU4zMWJma3FiLVZtZFRoakx1djBmRkhrbW1teUFpTzhiNjQ5Y3VNTjBHR2U4d3RRWHk3VU9HXzlORDZKOThNYndhX2d4VzVibnZveWo3YVhqU3h6alV3bktVdGk5dmhTcFpRIn19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyMzIwOCwianRpIjoiZDE0ZWYwM2YtMzk2MS00ZDYxLWEwZDAtMTkxZTM5ZjQ1ZGY4In0.xHkxIAImiT957OfwQyWO3ZsdBok-9OXwlaPgKAqUj1b2Xz0dHjbm05UQS6eZAjh5ggdeARzLHUdetFSfHTbI-ZpThqmKiPD28_fOrhrHml4KK2z6DJeyIqCm1_VOF-_5sWhDjoahLWmw4YDGbHDS2_CoPLz-1XI_M5pdI_IZWvKZ9bG3HDP3cjspciR8NIYE7R03cxDMtZ4caxLcPSO3mrqS3nPnhGDR-2mJXefSvaP2rpTNxuExr1i_YhcHDE8Cx5dVh5jhnlGFEbUWZbDAheuB_yMOOtXJ7zrq_bjh-q4NI10G-fQnPmOzzyNKWHGvjCa_R9pM4VDNnOj3emzxjA
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
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781223208,
  "jti": "d14ef03f-3961-4d61-a0d0-191e39f45df8"
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
  "access_token": "XIsS0_wQjrKz54LYnuV0Fwaf6Inhfuh9",
  "refresh_token": "LqyVfE30U8Midsl2YnYHLsh2kCg2xFQM",
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
Authorization: Bearer XIsS0_wQjrKz54LYnuV0Fwaf6Inhfuh9
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