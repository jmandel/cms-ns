# Phase 4a — Alpha-wide client_id at General Hospital's token endpoint

*Worked example for [the registration and connectivity walkthrough](../app-connectivity-flows.md). Alpha distributed one client_id at portal registration but does not issue access tokens; each data holder's own authorization server does, after validating the identity evidence itself. The same exchange repeats at every Alpha data holder holding records.*

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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IlpFbVR6SG5NOE5JTUdldTA0QUNja3Ji... (decoded below)"
}
```

---

**client_assertion — iss/sub are the Alpha-wide client_id; the cms_smart extension carries Maria's IAL2 id_token to the data holder** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IlpFbVR6SG5NOE5JTUdldTA0QUNja3JieFdHXzd6aEpPM25fdmExU3ZWVjAiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxSUVdFRnhWM2cxZVROeFRHaEdWVlJaUjJSSWEyZ3pSa1V0WDNwNFIxOTJZMmQxTjNCRVNtcDNTMmNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlORGd5TVN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SW1JMU5HUTJZekF5TFRnd1pXRXRORFV4WmkxaU1Ea3lMVEkzT0daa1pEZzJNVE5sWmlJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlORGd5TVN3aVpYaHdJam94TnpneE1qSTFNVEl4TENKcWRHa2lPaUkyTXpNNVlXUXlOUzAzTkRNd0xUUmpNRFF0T0RFeFpTMDVNelJpTXpFellXSXdNR0lpZlEuRVNuSnBtS2ZtMjMyalQyaGRnV2NScXJ0M2RFd0hQRkR5ckhNQlRpMk5zUWRPaXNldld4YjhQeFZNMTBrWFpxUjhYZ2cyc2lKb2ZkUGE2QWFTODA5RmI0WTU2STJjT3ZTSXNIdWFBbkZvZi1FWFA1YnNGZlpqMnk5ajJiS3JGWko5Q2hIVTNVb04tdWR6UHNpS3gzNHJHa0hZM0lsdmFyR2IwZ2Q0VDM0aWlvcll4ZG5wazdkSHdlYnFIeDI1YldvMlNlZmNCTGRQNWxpRWlSei1rTlhadmZTYjRCbjJYUTc1MG9IOWFpMDhobVYxSUczTVFTdEhZZ1FueUswcU1VckZVSHJtamY5SDhVSVR6RWFoNWdFd3hmUGNNZHR2cTVGc2l5UkhkRHBkSV9OREFNeGlxLWpEUmxUNmtDVWtST2J0SWxWNjl1Q2NURWkzaV9SSzFKTm9RIn19LCJpc3MiOiJhbHBoYS1uZXQtYnAtYnVkZHktN2MzMSIsInN1YiI6ImFscGhhLW5ldC1icC1idWRkeS03YzMxIiwiYXVkIjoiaHR0cHM6Ly9nZW5lcmFsaG9zcGl0YWwuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyNTE4MSwianRpIjoiZmE5MTA4NGMtYzBkNy00ZTUyLWFjMzYtNDVkZTA2ODdjMDgwIn0.f4U9fw8G_LhhEAdYBmMNr2eeV9qDL-sVtzDQG8M3TKMAteEDv_dP8qzyc7mtVYPVUuoFmKBwJk_CuZyf2vQ4wdvoJj4FFOxBUth7lb-QlCv4t_TttAJUqN79qPJap-bJ_07lJIkBBK4qLCgU52tjOZt_RZ-qAl7HRDoTdUmJ2sbc-w0zhtUQ8guaQM9oJwkupfSq74MnNBra4Ef1AiP_eunS80og4UlUeyJmfLJc3h4ip9ln-EXdx-j8UNIprH8OdCyWfKwfp9-b_CzUXPg3Fme6esszps6b4KzAb_WBsVewf_-Da4N-3Er6_xyDI7MWiQGslLTwZhPm8gJqEqZxrg
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "ZEmTzHnM8NIMGeu04ACckrbxWG_7zhJO3n_va1SvVV0",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlRQWEFxV3g1eTNxTGhGVVRZR2RIa2gzRkUtX3p4R192Y2d1N3BESmp3S2ciLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNDgyMSwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImI1NGQ2YzAyLTgwZWEtNDUxZi1iMDkyLTI3OGZkZDg2MTNlZiIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyNDgyMSwiZXhwIjoxNzgxMjI1MTIxLCJqdGkiOiI2MzM5YWQyNS03NDMwLTRjMDQtODExZS05MzRiMzEzYWIwMGIifQ.ESnJpmKfm232jT2hdgWcRqrt3dEwHPFDyrHMBTi2NsQdOisevWxb8PxVM10kXZqR8Xgg2siJofdPa6AaS809Fb4Y56I2cOvSIsHuaAnFof-EXP5bsFfZj2y9j2bKrFZJ9ChHU3UoN-udzPsiKx34rGkHY3IlvarGb0gd4T34iiorYxdnpk7dHwebqHx25bWo2SefcBLdP5liEiRz-kNXZvfSb4Bn2XQ750oH9ai08hmV1IG3MQStHYgQnyK0qMUrFUHrmjf9H8UITzEah5gEwxfPcMdtvq5FsiyRHdDpdI_NDAMxiq-jDRlT6kCUkRObtIlV69uCcTEi3i_RK1JNoQ"
    }
  },
  "iss": "alpha-net-bp-buddy-7c31",
  "sub": "alpha-net-bp-buddy-7c31",
  "aud": "https://generalhospital.example/oauth/token",
  "exp": 1781225181,
  "jti": "fa91084c-c0d7-4e52-ac36-45de0687c080"
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
  "access_token": "NY9GtsAAP-H_3iMcpV6LrEft_Po1XyUU",
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
Authorization: Bearer NY9GtsAAP-H_3iMcpV6LrEft_Po1XyUU
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

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*