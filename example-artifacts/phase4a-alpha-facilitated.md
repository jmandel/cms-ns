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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IkJBVEZ6V0tYSmJBWVM4el84Z0dPeHpT... (decoded below)"
}
```

---

**client_assertion — iss/sub are the Alpha-wide client_id; the cms_smart extension carries Maria's IAL2 id_token to the data holder** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IkJBVEZ6V0tYSmJBWVM4el84Z0dPeHpTY2FaYlhiZWpxbU5GSlZMMWVnMUEiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWpOWE9WUXhRMVZmTW5oWFMwRnVMVzF6VWpGVFRtSktaa3BPVFRWT1pXeEhPR3BpTm1sVlRGTTJWamdpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhOalF3Tml3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpCbE56VTRPVEJtTFRrelpUSXROR0V3TVMwNFpXVTRMVEZqTVRVek9XUmhZakEwTlNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXhOalF3Tml3aVpYaHdJam94TnpneE1qRTJOekEyTENKcWRHa2lPaUl6T1dNeE9XWXdNeTFrWVRsaUxUUTJPV0V0WVRrNU5DMWxOakk1T1RRMlpERXhNR1VpZlEuQkEtaVFRU184Ukh0VXlveXEwLVd6cERYbXBTUGx6NTNablhzOTlvWmxqUjdveTVCeExBQUE3S085TnlnMTdTcW1aSDNfd0VBUzF3LTZFRWZOVjh1UU12MUFTekFsSnVxREpfbzVQRUhLUXFjam4wWGZRNTh0SmR5VHNJQW1kUmN0TVBTaUUzT3daRnpyVXZOamVjanMwWVlaaW10dzBaZFE5M04wbWpGMW4xUjZjOVNVRG1TVVQwbl93Mnp4akd2di0zbEpueFluRkxISXNmbHdtbUdZT1lLWGJLR1FrSnQxT0lPTkpOdVJIek9yWGlUQ3hyTERZakU4QkpBU3g4dWF4Z0JuWGdrM3o0alVuYXhUejBqT3hVVGhLLXFaQ0h2ZDEwLU96RS1pM0sxSC1BT293d1d2MU5iQzMxXzQ2WEhLcGZ1SDBwQnNsYnh5YThlNDUyQzNnIn19LCJpc3MiOiJhbHBoYS1uZXQtYnAtYnVkZHktN2MzMSIsInN1YiI6ImFscGhhLW5ldC1icC1idWRkeS03YzMxIiwiYXVkIjoiaHR0cHM6Ly9nZW5lcmFsaG9zcGl0YWwuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIxNjc2NiwianRpIjoiMGMwNjRkNGUtZTU0MC00MmYyLTg3Y2EtOTUzZTA5NTdmZGJiIn0.etnwk6UOtlI5eSdh1b-Vphd1ZgrlkSpYcwxDl5MVVJaWgOphuyT8G5jZVHacMSa6jZb6P7_5HbxrJhEDM2paNpgTK5rGNqMCn_Hzh4dOCUul6npksUR4_2KHFJ6440h3dtRsndlrW3PWHkR2d13RKwwB7mjHXWcJZHm7TXqFiEdPAoN0nQehR8Csqgl8juTU_U7XF3Gjf4NQm_gYEHbwyYULGKgB4CyzW0H0Nm1W1fwkCipfcXPr7T-OJLbSwuO4RlnD8l7r8GoB8dJ4rfI9K72ZCp4pBHdIHdnQUsuphEYtamVR8IhSMIt1_EvlEK-wncwsNeeyLmK1vgVM3J3i9A
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "BATFzWKXJbAYS8z_8gGOxzScaZbXbejqmNFJVL1eg1A",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNXOVQxQ1VfMnhXS0FuLW1zUjFTTmJKZkpOTTVOZWxHOGpiNmlVTFM2VjgiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxNjQwNiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjBlNzU4OTBmLTkzZTItNGEwMS04ZWU4LTFjMTUzOWRhYjA0NSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxNjQwNiwiZXhwIjoxNzgxMjE2NzA2LCJqdGkiOiIzOWMxOWYwMy1kYTliLTQ2OWEtYTk5NC1lNjI5OTQ2ZDExMGUifQ.BA-iQQS_8RHtUyoyq0-WzpDXmpSPlz53ZnXs99oZljR7oy5BxLAAA7KO9Nyg17SqmZH3_wEAS1w-6EEfNV8uQMv1ASzAlJuqDJ_o5PEHKQqcjn0XfQ58tJdyTsIAmdRctMPSiE3OwZFzrUvNjecjs0YYZimtw0ZdQ93N0mjF1n1R6c9SUDmSUT0n_w2zxjGvv-3lJnxYnFLHIsflwmmGYOYKXbKGQkJt1OIONJNuRHzOrXiTCxrLDYjE8BJASx8uaxgBnXgk3z4jUnaxTz0jOxUThK-qZCHvd10-OzE-i3K1H-AOowwWv1NbC31_46XHKpfuH0pBslbxya8e452C3g"
    }
  },
  "iss": "alpha-net-bp-buddy-7c31",
  "sub": "alpha-net-bp-buddy-7c31",
  "aud": "https://generalhospital.example/oauth/token",
  "exp": 1781216766,
  "jti": "0c064d4e-e540-42f2-87ca-953e0957fdbb"
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
  "access_token": "PTSaYStQaK53f8WKCbB_PXyKht4lX-E1",
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
Authorization: Bearer PTSaYStQaK53f8WKCbB_PXyKht4lX-E1
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

*Generated 2026-06-11T22:21:06.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*