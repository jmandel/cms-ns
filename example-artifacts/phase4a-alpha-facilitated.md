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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6ImkyYTllbDlkSzZoeEt3RnhORy1YWm8z... (decoded below)"
}
```

---

**client_assertion — iss/sub are the Alpha-wide client_id; the cms_smart extension carries Maria's IAL2 id_token to the data holder** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6ImkyYTllbDlkSzZoeEt3RnhORy1YWm8zVjhtR1ppTDlwa1piLXdzQnd6aWMiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWw5WmRUY3laemRMVVVST2MyZExWVTQ1YlROS2JXMTFkRlJ0VmtkcFRGcHJMWGRsYjNaNk5tRkRSazBpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1URTVPREk1TWl3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpNNE5EZ3hPREZsTFRVelptVXRORFl3TWkwNU5EYzVMV0ptWW1Oa05UZzRPV0ppTmlJc0ltRjFaQ0k2SW1Kd0xXSjFaR1I1TFdsa2JXVXRZMnhwWlc1MElpd2lhV0YwSWpveE56Z3hNVGs0TWpreUxDSmxlSEFpT2pFM09ERXhPVGcxT1RJc0ltcDBhU0k2SWpSaVpXSXdOV1V4TFdVMllqZ3ROR1prWXkwNE56UmhMVFppWW1Nd1pEZGpOVGxqTVNKOS5rQldaWEhIcU1UMTMzMUxlVG4tQ0hVSURNbGNLWVR6ZUFHU0pIOG5KWUtyTDc0Z0FQbjhQS3ZFcmtYR1k0MFE2aUtzU0U0S2Q1V3RZemZ5VVI5Q0dKbDBKWEUwODYwakhMUE9tQXg3OFNJU1gyUGFRYUhzZEZtaHVOb0g1MW9zeF9IM3l1WHpQYzZyVG5ndzZ6N0lpVUcwcEtCcTBaaWFvcFduVDJOcDlmZjRFcWQ1OU93c1BCalBRWkxtZWtwUkc4Vlp1Zm00YUJPTjlYOEMySzFuNmhyVEVUR2J3NUlaNlpZVnJXQVE3NUdaaDZjRlB2bldiMmMyWHFMeGZLY1NfcXFEMktacXFMZGo3Q21sVDI4VlE4cm5ieUJ4UFoydHJEWkJlRHhFSXBaNEpRYXZ5eTFJaVJ5dV9xTHg0QWVKelJibjREc1FFZmx1NUw4QWs0VzN6bFEifX0sImlzcyI6ImFscGhhLW5ldC1icC1idWRkeS03YzMxIiwic3ViIjoiYWxwaGEtbmV0LWJwLWJ1ZGR5LTdjMzEiLCJhdWQiOiJodHRwczovL2dlbmVyYWxob3NwaXRhbC5leGFtcGxlL29hdXRoL3Rva2VuIiwiZXhwIjoxNzgxMTk4NjUyLCJqdGkiOiI3NDFiOWY2MS05YTBiLTRkN2ItODU5NS0wOGNmODkwY2E4NWEifQ.obb87TJXX3eU6xICx6r61pA1aPwVioONrbMqfckcEvBwRRR3flCFstd6v2h0DGHnd54LbnW_g76mpppVemqEbY9H6sRYBNi4S1GHcewlZwtFJqrLlOeAzLlgySd4moT7T_0aErII455y-QjCjsWtcQ55a7otTeRBWGWzYnug3EQvyLMWnPG_evC8d9WTR0hUTHtabKE60jkrjnDXB5Iz-fOpVcAAO-jCdo93Moi3ehMjh-SKl3omKCntZ4pTFOvfggMOmrQQuNsaLPRKSEXbD_Vgi9Y9Y_iw2JULtcOoeLbilm2EQzVYgmx-E4bO--2XuhF1h8_SYf74uqVdIGlfqA
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
  "iss": "alpha-net-bp-buddy-7c31",
  "sub": "alpha-net-bp-buddy-7c31",
  "aud": "https://generalhospital.example/oauth/token",
  "exp": 1781198652,
  "jti": "741b9f61-9a0b-4d7b-8595-08cf890ca85a"
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
  "access_token": "jSWFXzULAAy8ZCdOPcgyvqI5dTmnAKxH",
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
Authorization: Bearer jSWFXzULAAy8ZCdOPcgyvqI5dTmnAKxH
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

*Generated 2026-06-11T17:19:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*