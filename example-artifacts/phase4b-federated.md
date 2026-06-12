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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IlpFbVR6SG5NOE5JTUdldTA0QUNja3Ji... (decoded below)"
}
```

---

**client_assertion** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IlpFbVR6SG5NOE5JTUdldTA0QUNja3JieFdHXzd6aEpPM25fdmExU3ZWVjAiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxSUVdFRnhWM2cxZVROeFRHaEdWVlJaUjJSSWEyZ3pSa1V0WDNwNFIxOTJZMmQxTjNCRVNtcDNTMmNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlORGd5TVN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SW1JMU5HUTJZekF5TFRnd1pXRXRORFV4WmkxaU1Ea3lMVEkzT0daa1pEZzJNVE5sWmlJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlORGd5TVN3aVpYaHdJam94TnpneE1qSTFNVEl4TENKcWRHa2lPaUkyTXpNNVlXUXlOUzAzTkRNd0xUUmpNRFF0T0RFeFpTMDVNelJpTXpFellXSXdNR0lpZlEuRVNuSnBtS2ZtMjMyalQyaGRnV2NScXJ0M2RFd0hQRkR5ckhNQlRpMk5zUWRPaXNldld4YjhQeFZNMTBrWFpxUjhYZ2cyc2lKb2ZkUGE2QWFTODA5RmI0WTU2STJjT3ZTSXNIdWFBbkZvZi1FWFA1YnNGZlpqMnk5ajJiS3JGWko5Q2hIVTNVb04tdWR6UHNpS3gzNHJHa0hZM0lsdmFyR2IwZ2Q0VDM0aWlvcll4ZG5wazdkSHdlYnFIeDI1YldvMlNlZmNCTGRQNWxpRWlSei1rTlhadmZTYjRCbjJYUTc1MG9IOWFpMDhobVYxSUczTVFTdEhZZ1FueUswcU1VckZVSHJtamY5SDhVSVR6RWFoNWdFd3hmUGNNZHR2cTVGc2l5UkhkRHBkSV9OREFNeGlxLWpEUmxUNmtDVWtST2J0SWxWNjl1Q2NURWkzaV9SSzFKTm9RIn19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyNTE4MSwianRpIjoiODU0N2NkNzAtZGMyNS00M2FkLWIxNTktMDVlYTEwMjNiMDJjIn0.bCORzCcf2AWI04zr-BB-Jox4JdZm58ZbRrzjcAobDNb_b4NR7Eh12snF2G50WIua--5DWkUyXFSopeCiv6XwC472NB-3UE1NQfkbPr_5SVBjStDgTrdrFn0__5LgrLBskP2xoU_Mcjz5ZAjDOkL6rHPHITOwnqr0vBVqMO4NSPYMI8_bdwWOti2ezIvzYUl_Jh_AZRC0Dpyg0RygtgvNA3LNSvdU6WYa5gZmlQrqOf0pkEsDnwS4d5FB0imhhQrm2Zv3ziyjqTpmF0knVhe1A7nlflowZUV8FDpoBvnAi9CGxXIXTxSbETMK3oy0RmD3kifantr9EUchhkMJJjG2Cw
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
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781225181,
  "jti": "8547cd70-dc25-43ad-b159-05ea1023b02c"
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
  "access_token": "YGE-xNFRfdUKNmy_VmGwNhD4qWptMH_N",
  "refresh_token": "zMWG43cVXTIALa5TbRKVnNbfmHQRToCE",
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
Authorization: Bearer YGE-xNFRfdUKNmy_VmGwNhD4qWptMH_N
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

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*