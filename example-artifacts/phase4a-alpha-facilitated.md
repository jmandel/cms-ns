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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IjZ5WHEtdnhWSFgtcEttdEJOd09mQlN3... (decoded below)"
}
```

---

**client_assertion — iss/sub are the Alpha-wide client_id; the cms_smart extension carries Maria's IAL2 id_token to the data holder** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IjZ5WHEtdnhWSFgtcEttdEJOd09mQlN3eWNVSFBaTEhvdHlHWUZ3SVVBVHMiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW10V00wMVdOMGQ1WjNwWVNuWmZTM281ZUZsamNHOW1VbVpxU1dwQlNYaHdRbDlsUVhsTVN6UmtSRFFpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhPREl4TWl3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SW1KaVpEbGhPREF4TFRkaE5EWXRORFJrWkMwNE5tWXpMV1UzTWpRNVpUZzJZamM1WVNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXhPREl4TWl3aVpYaHdJam94TnpneE1qRTROVEV5TENKcWRHa2lPaUprTjJRMllUTXpZaTFtWm1JNUxUUXlaREF0T1dWaFlpMDNNR1l5TXpCall6aGxaV1VpZlEuUFZkVUFad0d1S0JtbHJTaTNBTHBqZExpUVN1T3o5bVlNZHNZdU1mLTA1M3Z6QWxuSUFlWDhOckxoOUZrMGxSaVZndVNBT1lIcDBLdk9Uc1U4SndTcUJfSkxHRUozdGFjZ00tbGZpRkJ5bXBSVXF4dUxJVVVsRzVFc3FWVUZqdV9vZGg5QU9POHJqdTBtTFNsa2IyMy1wczN0MkpKZE1DWXJ6V0R6NUd5U0l4QXdSRVdhNFZtLUV5WjcteGhfaDY0UEJ2aFE3RGExZG95OGcxLXhqWWlsZTZvbnZ1bHdjNG9zM2dxLUhYRFBNdXVTYWFMOVBSTWZDaHRkZnBuQ3l5MTVVVmpwYkxDdFlnUDR1OUpwalF4WWRjYWdYM3NyTVNYN01VLUZyVVZFN2VEeGFOalNfR1VEWFFiZklYMW9RMFJEY2pQb0ZidFJNNU85VXkzOEJOVm93In19LCJpc3MiOiJhbHBoYS1uZXQtYnAtYnVkZHktN2MzMSIsInN1YiI6ImFscGhhLW5ldC1icC1idWRkeS03YzMxIiwiYXVkIjoiaHR0cHM6Ly9nZW5lcmFsaG9zcGl0YWwuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIxODU3MiwianRpIjoiYWFlYjdkZTItZGIwOC00YTY3LWFlM2MtMjg4YmIwNTBlZDgxIn0.jtwk6zH17i3X8JjChd6rZ7AWNqloEzXVG_rfITXtQOtOu6br65xtoHpgABLeQFpJPmt4rQzflZFpHkk8H6_ZMUKqJHlp6Gy1H9_6deujYksT7ePFwFiaiBnSXJcU-KdjbSDJs-JnZNvl0j0rUDKmL9tvd_5ZWvLpHI4hCz9PRN6N9mcuptlwwsF8KaxpLkDYakB64Ou1GWdVC2-UR4Cwoq_xxIQcrR3nbRs3h-vVqiEOYvYcsEqRjvD7STD1V1d6PJoW7cuhg6bTuBIN5YoZJACpiS9TszrLBtqyXwkbSaRMr8JmFkWuqX2FVmvbE-BXlUyi3wacWVAbKlgiuHnblw
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
  "extensions": {
    "cms_smart": {
      "version": "1",
      "purpose_of_use": "PATRQT",
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImtWM01WN0d5Z3pYSnZfS3o5eFljcG9mUmZqSWpBSXhwQl9lQXlMSzRkRDQiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxODIxMiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImJiZDlhODAxLTdhNDYtNDRkZC04NmYzLWU3MjQ5ZTg2Yjc5YSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxODIxMiwiZXhwIjoxNzgxMjE4NTEyLCJqdGkiOiJkN2Q2YTMzYi1mZmI5LTQyZDAtOWVhYi03MGYyMzBjYzhlZWUifQ.PVdUAZwGuKBmlrSi3ALpjdLiQSuOz9mYMdsYuMf-053vzAlnIAeX8NrLh9Fk0lRiVguSAOYHp0KvOTsU8JwSqB_JLGEJ3tacgM-lfiFBympRUqxuLIUUlG5EsqVUFju_odh9AOO8rju0mLSlkb23-ps3t2JJdMCYrzWDz5GySIxAwREWa4Vm-EyZ7-xh_h64PBvhQ7Da1doy8g1-xjYile6onvulwc4os3gq-HXDPMuuSaaL9PRMfChtdfpnCyy15UVjpbLCtYgP4u9JpjQxYdcagX3srMSX7MU-FrUVE7eDxaNjS_GUDXQbfIX1oQ0RDcjPoFbtRM5O9Uy38BNVow"
    }
  },
  "iss": "alpha-net-bp-buddy-7c31",
  "sub": "alpha-net-bp-buddy-7c31",
  "aud": "https://generalhospital.example/oauth/token",
  "exp": 1781218572,
  "jti": "aaeb7de2-db08-4a67-ae3c-288bb050ed81"
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
  "access_token": "tcwB-FRl4OBPb3TO0dQwRBfPOnvWLgx0",
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
Authorization: Bearer tcwB-FRl4OBPb3TO0dQwRBfPOnvWLgx0
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

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*