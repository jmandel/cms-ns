# cms_smart at a data holder: token and FHIR retrieval

*Worked example for [the record location and data access write-up](../authorizing-access.md). Same token shape as everywhere else; the only difference from 4a is that the data holder's own authorization server issues the token, and a refresh_token supports the rolling 90-day window of can-spec §9.*

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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6ImQ3LVpSOVlWeHljZXlibUZtTGQybmVO... (decoded below)"
}
```

---

**client_assertion** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6ImQ3LVpSOVlWeHljZXlibUZtTGQybmVOVnVzb1dtS3JTNGFtNVpnSjBhZG8iLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5OeVlUWTNka0V5TFVSeVVVeGZVRjluUlZCeVFVcDNUR3RMYURBNVJFMVZUa0ozWXpKRE5sQTNjMjhpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlOVEl6TUN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SW1JM1lXUmxPREZtTFRaa1pURXROREV4WlMwNE5qTTBMV0l4T1RrNU5qZGxabVF6WkNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlOVEl6TUN3aVpYaHdJam94TnpneE1qSTFOVE13TENKcWRHa2lPaUl4TVdaaU1tWXhOUzFqT0dVM0xUUm1aamd0WVRZek5TMW1aV1ptTkdOa1l6VXdNakVpZlEucWs0MnlYdmhBZkpha1R3THBwc3RRc1ktSkVuejk5azZHbVFvR1BlTy01OXpmcnNxV1lsWjZrN25GUFJSS3pCUm4xTjgxQUV4NE1Ha2czekJ4OXA5WTVLelViTTM5VlpKWVBDQlhhQlMxN2FUX3Q4TzVsRDJ1VXJhNmhGQWp2dVhVMHVYV2NTR2hReTdYMVB0WlE3Um1lUlVValJJa1k2RUYwUnJaLUkyUDVLSWFDUVA0dVBGMVBJeGQtZ2ZEX1plZjBnRVRuVkItRTlQZnJSVG1qVkJhdkhMdmFiajZGTEVrV1BmaFdLTFhjOHY3U2Z5dEZ3ZUhJbktuU1BWeW1WcVJKYWVnOXY1VC1sQnFKZ1Q5Tk1DajBQSWlFSmh6M252Wl9MdzJEWFhCa29rcjFLYjMzLXpPVFdPZUV4RHB0VHV3aUJneTlxMFdSeVh4UU50VFJUMWR3In19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyNTU5MCwianRpIjoiNzUxZmQ2NDgtYzY1Zi00YmMyLWI1ZTEtMDI5ZjVmMzE5NmQ3In0.Cd2WJ4Bk8M5OKl74cYPMaA0FkktLDLL5V7pUXDhFd8PJAqoNzXpHnGeTDbB-Q4LYzhzcLJeRS882draOIrC8cR15zYgQz-Ub33w_F3yesmwqyAy-3_2FVQ4mO5cd-auDdNq3QjQtAaK36yT1Z42cakzU0f40ew1sl8mPCrJoBIKv8a9iYtBnwwrVriIuFf_NBFvvz6J6UUtyKu8v4qb6gPVQdJ38XG_a1VNYxnd6MeLgxtfNJQUB3il-lGf-pNUIQn_8UBXtTY6vHgpUwh0CBW7xGksDzDo8DMhs3Rhgsqr9Fcr1W-gb56EASOIiKjoywWaIfkjr0vV3ftRRgNJHyA
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "d7-ZR9YVxyceybmFmLd2neNVusoWmKrS4am5ZgJ0ado",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InNyYTY3dkEyLURyUUxfUF9nRVByQUp3TGtLaDA5RE1VTkJ3YzJDNlA3c28iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNTIzMCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImI3YWRlODFmLTZkZTEtNDExZS04NjM0LWIxOTk5NjdlZmQzZCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyNTIzMCwiZXhwIjoxNzgxMjI1NTMwLCJqdGkiOiIxMWZiMmYxNS1jOGU3LTRmZjgtYTYzNS1mZWZmNGNkYzUwMjEifQ.qk42yXvhAfJakTwLppstQsY-JEnz99k6GmQoGPeO-59zfrsqWYlZ6k7nFPRRKzBRn1N81AEx4MGkg3zBx9p9Y5KzUbM39VZJYPCBXaBS17aT_t8O5lD2uUra6hFAjvuXU0uXWcSGhQy7X1PtZQ7RmeRUUjRIkY6EF0RrZ-I2P5KIaCQP4uPF1PIxd-gfD_Zef0gETnVB-E9PfrRTmjVBavHLvabj6FLEkWPfhWKLXc8v7SfytFweHInKnSPVymVqRJaeg9v5T-lBqJgT9NMCj0PIiEJhz3nvZ_Lw2DXXBkokr1Kb33-zOTWOeExDptTuwiBgy9q0WRyXxQNtTRT1dw"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781225590,
  "jti": "751fd648-c65f-4bc2-b5e1-029f5f3196d7"
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
  "access_token": "YcpdOpxNVaD_M4m6AXQD0bJh23GhK9bD",
  "refresh_token": "CBW5f9UEMolb8AUEm6L-DyC7Qq1GNtr4",
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
Authorization: Bearer YcpdOpxNVaD_M4m6AXQD0bJh23GhK9bD
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

*Generated 2026-06-12T00:48:10.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*