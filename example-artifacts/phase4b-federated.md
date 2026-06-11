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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6ImkyYTllbDlkSzZoeEt3RnhORy1YWm8z... (decoded below)"
}
```

---

**client_assertion** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6ImkyYTllbDlkSzZoeEt3RnhORy1YWm8zVjhtR1ppTDlwa1piLXdzQnd6aWMiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWw5WmRUY3laemRMVVVST2MyZExWVTQ1YlROS2JXMTFkRlJ0VmtkcFRGcHJMWGRsYjNaNk5tRkRSazBpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1URTVPREk1TWl3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpNNE5EZ3hPREZsTFRVelptVXRORFl3TWkwNU5EYzVMV0ptWW1Oa05UZzRPV0ppTmlJc0ltRjFaQ0k2SW1Kd0xXSjFaR1I1TFdsa2JXVXRZMnhwWlc1MElpd2lhV0YwSWpveE56Z3hNVGs0TWpreUxDSmxlSEFpT2pFM09ERXhPVGcxT1RJc0ltcDBhU0k2SWpSaVpXSXdOV1V4TFdVMllqZ3ROR1prWXkwNE56UmhMVFppWW1Nd1pEZGpOVGxqTVNKOS5rQldaWEhIcU1UMTMzMUxlVG4tQ0hVSURNbGNLWVR6ZUFHU0pIOG5KWUtyTDc0Z0FQbjhQS3ZFcmtYR1k0MFE2aUtzU0U0S2Q1V3RZemZ5VVI5Q0dKbDBKWEUwODYwakhMUE9tQXg3OFNJU1gyUGFRYUhzZEZtaHVOb0g1MW9zeF9IM3l1WHpQYzZyVG5ndzZ6N0lpVUcwcEtCcTBaaWFvcFduVDJOcDlmZjRFcWQ1OU93c1BCalBRWkxtZWtwUkc4Vlp1Zm00YUJPTjlYOEMySzFuNmhyVEVUR2J3NUlaNlpZVnJXQVE3NUdaaDZjRlB2bldiMmMyWHFMeGZLY1NfcXFEMktacXFMZGo3Q21sVDI4VlE4cm5ieUJ4UFoydHJEWkJlRHhFSXBaNEpRYXZ5eTFJaVJ5dV9xTHg0QWVKelJibjREc1FFZmx1NUw4QWs0VzN6bFEifX0sImlzcyI6Imxha2VzaWRlLWRoLWJwLWJ1ZGR5LTkxYWYiLCJzdWIiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL29hdXRoL3Rva2VuIiwiZXhwIjoxNzgxMTk4NjUyLCJqdGkiOiI3MDg1MDIzMS1iYzViLTQ4ZmEtYTFiNS1jZmFiZWM0OGIxNjYifQ.eCnuu0el3Ea6gpFMQLhQ6AbiFY7uC7O9sJ3dfT190ssDuRlrfQRvyN8dHchFWuFBdXe0HXBHzPQMbVBzR4PkfnGDS1FdQZS0mHrGw-KHs_2sCy9Hxi6yTwARF3vdj5d0acNE3RSR9Jo1ogTnsNVYnDM4h9AkEUCSNdRoDLDPgQ1Zs-S7ZeAnE8gzuYnI1XjgGSF-m48oXz5dPwy5o1SW96M1NKnVwuOlTUgvRKOtopge4mEq1zND15_OQuRPh1FpneJa66XmLFkONwjkAQ1txmeXYf-216Di1jpcKe1O-_vJPPtuSF08_1n0Q1Nv91cvYnqgRj-UnqI1b4P6c88NGQ
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "i2a9el9dK6hxKwFxNG-XZo3V8mGZiL9pkZb-wsBwzic",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Il9ZdTcyZzdLUUROc2dLVU45bTNKbW11dFRtVkdpTFprLXdlb3Z6NmFDRk0iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTE5ODI5MiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjM4NDgxODFlLTUzZmUtNDYwMi05NDc5LWJmYmNkNTg4OWJiNiIsImF1ZCI6ImJwLWJ1ZGR5LWlkbWUtY2xpZW50IiwiaWF0IjoxNzgxMTk4MjkyLCJleHAiOjE3ODExOTg1OTIsImp0aSI6IjRiZWIwNWUxLWU2YjgtNGZkYy04NzRhLTZiYmMwZDdjNTljMSJ9.kBWZXHHqMT1331LeTn-CHUIDMlcKYTzeAGSJH8nJYKrL74gAPn8PKvErkXGY40Q6iKsSE4Kd5WtYzfyUR9CGJl0JXE0860jHLPOmAx78SISX2PaQaHsdFmhuNoH51osx_H3yuXzPc6rTngw6z7IiUG0pKBq0ZiaopWnT2Np9ff4Eqd59OwsPBjPQZLmekpRG8VZufm4aBON9X8C2K1n6hrTETGbw5IZ6ZYVrWAQ75GZh6cFPvnWb2c2XqLxfKcS_qqD2KZqqLdj7CmlT28VQ8rnbyBxPZ2trDZBeDxEIpZ4JQavyy1IiRyu_qLx4AeJzRbn4DsQEflu5L8Ak4W3zlQ"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781198652,
  "jti": "70850231-bc5b-48fa-a1b5-cfabec48b166"
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
  "access_token": "xQCHM0f1XcAepmSvyMYdBESCSUJAVLIR",
  "refresh_token": "DAvzZut72yIfVvE5Tt3Ur4QVhMSz14U1",
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
Authorization: Bearer xQCHM0f1XcAepmSvyMYdBESCSUJAVLIR
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

*Generated 2026-06-11T17:19:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*