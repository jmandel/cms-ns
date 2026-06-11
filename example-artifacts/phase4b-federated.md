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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IkJfdS1uRHAwbHBXSWI1bTZkT3pNVG5n... (decoded below)"
}
```

---

**client_assertion** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IkJfdS1uRHAwbHBXSWI1bTZkT3pNVG5naUMwMzZ1UUpYa0g3OXNLc19OMHciLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWs1Q2JXbDJTbmhoTTA5VlVFSmhjVTFPVFRGNFFWSkhWRzEyVTBablRtMVdSRXRIZVhSeVowcEtOMnNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNVEEzTml3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpaa1lXWXhZVE0zTFRCa1ptUXROR1ZqTXkxaE5EVXdMVFV6TlRWbE5URTNaalZsTUNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlNVEEzTml3aVpYaHdJam94TnpneE1qSXhNemMyTENKcWRHa2lPaUl5T0RJMk9ETTVaaTAyTlRZeUxUUTBOelV0WWprM055MWxZamcyTlRSbE5HTTBNV01pZlEuSVFnazZndjRHVmJ2LTh1bFo5Z01HQWZSWWhiRVNyMzJvZkdxck5lTnVjTXB4TWhvb2ZBNjZjM2dBdjBHZy0yMWxjc0Jxb3V3clloNEdzWVpkeGxTa1Jqb01nXzZ5TS04RVlfbUVsdEZjMGRwTHY5ZGNOWFNBanYtbUN2enlaWkFMWGJ5bDVSV3hEZXFMR3RPUWJxRk9NTDJqV3F2YzNtWGxxRUlIX2hhM0lpblhrYTF0NTlhMHhHT2V6enJWQkJqVE1TNUNSNmptZGdnek1fbTVMdjZ2UEpzeUV2TzJhbE9OWkNYQUN3VWNMRmZ5VUdKeDVVZjBpSTFDR3lBX2RHS3BIZGotU0NqNklZalNEU1N0T1VQUHAtQmxtUWx0eFZlTnd4Q2N0Nk13eTNTM2k1Z1lTMFkzU3E4RWFSdG5LVVNEbXNVV3BkVWdsWk5vdjhjTVhkNUxBIn19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyMTQzNiwianRpIjoiNWZiZGExZDgtYTMxMi00MDQzLWI0MDEtNjY3YmU4ZTdjYmZmIn0.zpjNcqkc7QCV1TH8EO5NSrgO2j6VGVRiGCkmP5LMJeksV6mvEjcNqPM37vFs9ODHq2KrbyKSoHsZ-qyQCeZzIvBQi3KaJ6rPSZPw1_qzBmdK8MA3mYQ59py092XQvjMKs3modxpxTQhy94C5inHf92SIpnoAoqd3uo01CiS0c-OKPozx5WkQVtGUUxSAAQCfF0K4DuwBpZxaMHirfPR-tYIVnzyQW2raEG0gwPL76MTj34q1RZeB9niWc6JXwe9eVuWGpeE8xje3n6oPFAPp3_VccwsX0hYyVPKhey06AsOkn9Xh0u_6XVAYAZpV1UysMjPEElQbErm3kOoZmIIdaw
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "B_u-nDp0lpWIb5m6dOzMTngiC036uQJXkH79sKs_N0w",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ik5CbWl2SnhhM09VUEJhcU1OTTF4QVJHVG12U0ZnTm1WREtHeXRyZ0pKN2siLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMTA3NiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjZkYWYxYTM3LTBkZmQtNGVjMy1hNDUwLTUzNTVlNTE3ZjVlMCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyMTA3NiwiZXhwIjoxNzgxMjIxMzc2LCJqdGkiOiIyODI2ODM5Zi02NTYyLTQ0NzUtYjk3Ny1lYjg2NTRlNGM0MWMifQ.IQgk6gv4GVbv-8ulZ9gMGAfRYhbESr32ofGqrNeNucMpxMhoofA66c3gAv0Gg-21lcsBqouwrYh4GsYZdxlSkRjoMg_6yM-8EY_mEltFc0dpLv9dcNXSAjv-mCvzyZZALXbyl5RWxDeqLGtOQbqFOML2jWqvc3mXlqEIH_ha3IinXka1t59a0xGOezzrVBBjTMS5CR6jmdggzM_m5Lv6vPJsyEvO2alONZCXACwUcLFfyUGJx5Uf0iI1CGyA_dGKpHdj-SCj6IYjSDSStOUPPp-BlmQltxVeNwxCct6Mwy3S3i5gYS0Y3Sq8EaRtnKUSDmsUWpdUglZNov8cMXd5LA"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781221436,
  "jti": "5fbda1d8-a312-4043-b401-667be8e7cbff"
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
  "access_token": "0a-s5yM5_vSEV7PoTnkXMv_fqHPEDrvk",
  "refresh_token": "15nH5yRnSCjO-prJme2dAbYzxtwdkDUL",
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
Authorization: Bearer 0a-s5yM5_vSEV7PoTnkXMv_fqHPEDrvk
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

*Generated 2026-06-11T23:38:56.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*