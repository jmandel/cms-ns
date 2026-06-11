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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IjZ5WHEtdnhWSFgtcEttdEJOd09mQlN3... (decoded below)"
}
```

---

**client_assertion** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IjZ5WHEtdnhWSFgtcEttdEJOd09mQlN3eWNVSFBaTEhvdHlHWUZ3SVVBVHMiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW10V00wMVdOMGQ1WjNwWVNuWmZTM281ZUZsamNHOW1VbVpxU1dwQlNYaHdRbDlsUVhsTVN6UmtSRFFpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhPREl4TWl3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SW1KaVpEbGhPREF4TFRkaE5EWXRORFJrWkMwNE5tWXpMV1UzTWpRNVpUZzJZamM1WVNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXhPREl4TWl3aVpYaHdJam94TnpneE1qRTROVEV5TENKcWRHa2lPaUprTjJRMllUTXpZaTFtWm1JNUxUUXlaREF0T1dWaFlpMDNNR1l5TXpCall6aGxaV1VpZlEuUFZkVUFad0d1S0JtbHJTaTNBTHBqZExpUVN1T3o5bVlNZHNZdU1mLTA1M3Z6QWxuSUFlWDhOckxoOUZrMGxSaVZndVNBT1lIcDBLdk9Uc1U4SndTcUJfSkxHRUozdGFjZ00tbGZpRkJ5bXBSVXF4dUxJVVVsRzVFc3FWVUZqdV9vZGg5QU9POHJqdTBtTFNsa2IyMy1wczN0MkpKZE1DWXJ6V0R6NUd5U0l4QXdSRVdhNFZtLUV5WjcteGhfaDY0UEJ2aFE3RGExZG95OGcxLXhqWWlsZTZvbnZ1bHdjNG9zM2dxLUhYRFBNdXVTYWFMOVBSTWZDaHRkZnBuQ3l5MTVVVmpwYkxDdFlnUDR1OUpwalF4WWRjYWdYM3NyTVNYN01VLUZyVVZFN2VEeGFOalNfR1VEWFFiZklYMW9RMFJEY2pQb0ZidFJNNU85VXkzOEJOVm93In19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIxODU3MiwianRpIjoiNDI3MTRiMjQtZmQzYi00NjhjLWE2NTYtODI0OWY0OTA2MmRhIn0.b2_jRfC4_RfdJ0a1Qga6Auxhvo7AVrZ_zA6bSpj98EDrGFuIjX2xFuPTzHr0nhPtjjQE7H4Em6XaRIInVfPZ5XxefAyPWp4CAoFhdUGWWYPoCPrtC8O1rRIp1zwd1NLxYzVPzQiyLcWpqtqhYY_h4vgTiOC4E60sVVlxkIv-z4V12hjlCyeX6KbaavfETlsjBwu8YN6Wz4KGAigTm_2DDjcRufUqJKOTiHATlYpYM-8d-6YN_yGAaWigDtwm9F9wOV-0iqmp9EQOuTXHXjlduyMjjUnIOyNlUmq2OiwlIei9Oa_Bzo6itJ33Jck5OwzTk8wK_5VnBIUj9-eleGFvrg
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
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781218572,
  "jti": "42714b24-fd3b-468c-a656-8249f49062da"
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
  "access_token": "FcjoX8rv7yH4AEX23w5bysLwFxlBQovd",
  "refresh_token": "4-S3RYYURQ_y2HYgO3SQdy7cPPxYgBdy",
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
Authorization: Bearer FcjoX8rv7yH4AEX23w5bysLwFxlBQovd
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

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*