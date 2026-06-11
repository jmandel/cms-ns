# Phase 3 — Patient-bound token and $rls at Beta

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Maria authenticated at her IAL2 CSP moments ago; her id_token travels inside the cms_smart extension of the client_assertion, following the Blue Button CMS Aligned Networks pattern. The access token comes back bound to her, so $rls can only locate her records.*

**CSP-issued IAL2 id_token (ID.me-style claims)** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6Il9ZdTcyZzdLUUROc2dLVU45bTNKbW11dFRtVkdpTFprLXdlb3Z6NmFDRk0iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTE5ODI5MiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjM4NDgxODFlLTUzZmUtNDYwMi05NDc5LWJmYmNkNTg4OWJiNiIsImF1ZCI6ImJwLWJ1ZGR5LWlkbWUtY2xpZW50IiwiaWF0IjoxNzgxMTk4MjkyLCJleHAiOjE3ODExOTg1OTIsImp0aSI6IjRiZWIwNWUxLWU2YjgtNGZkYy04NzRhLTZiYmMwZDdjNTljMSJ9.kBWZXHHqMT1331LeTn-CHUIDMlcKYTzeAGSJH8nJYKrL74gAPn8PKvErkXGY40Q6iKsSE4Kd5WtYzfyUR9CGJl0JXE0860jHLPOmAx78SISX2PaQaHsdFmhuNoH51osx_H3yuXzPc6rTngw6z7IiUG0pKBq0ZiaopWnT2Np9ff4Eqd59OwsPBjPQZLmekpRG8VZufm4aBON9X8C2K1n6hrTETGbw5IZ6ZYVrWAQ75GZh6cFPvnWb2c2XqLxfKcS_qqD2KZqqLdj7CmlT28VQ8rnbyBxPZ2trDZBeDxEIpZ4JQavyy1IiRyu_qLx4AeJzRbn4DsQEflu5L8Ak4W3zlQ
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "_Yu72g7KQDNsgKUN9m3JmmutTmVGiLZk-weovz6aCFM",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781198292,
  "given_name": "Maria",
  "family_name": "Lopez",
  "birthdate": "1962-03-15",
  "address": {
    "street_address": "418 Alder Court",
    "locality": "Riverside",
    "region": "CA",
    "postal_code": "92501",
    "country": "US"
  },
  "ssn_itin_short": "4321",
  "iss": "https://api.id.me/oidc",
  "sub": "3848181e-53fe-4602-9479-bfbcd5889bb6",
  "aud": "bp-buddy-idme-client",
  "iat": 1781198292,
  "exp": 1781198592,
  "jti": "4beb05e1-e6b8-4fdc-874a-6bbc0d7c59c1"
}
```

---

**Token request**

```http
POST https://rls.beta-exchange.example/oauth/token HTTP/1.1
Host: rls.beta-exchange.example
Content-Type: application/x-www-form-urlencoded
```

```json
{
  "grant_type": "client_credentials",
  "scope": "patient/Patient.rs launch/patient",
  "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6ImkyYTllbDlkSzZoeEt3RnhORy1YWm8z... (decoded below)"
}
```

---

**client_assertion — note extensions.cms_smart carrying the full id_token** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6ImkyYTllbDlkSzZoeEt3RnhORy1YWm8zVjhtR1ppTDlwa1piLXdzQnd6aWMiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWw5WmRUY3laemRMVVVST2MyZExWVTQ1YlROS2JXMTFkRlJ0VmtkcFRGcHJMWGRsYjNaNk5tRkRSazBpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1URTVPREk1TWl3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpNNE5EZ3hPREZsTFRVelptVXRORFl3TWkwNU5EYzVMV0ptWW1Oa05UZzRPV0ppTmlJc0ltRjFaQ0k2SW1Kd0xXSjFaR1I1TFdsa2JXVXRZMnhwWlc1MElpd2lhV0YwSWpveE56Z3hNVGs0TWpreUxDSmxlSEFpT2pFM09ERXhPVGcxT1RJc0ltcDBhU0k2SWpSaVpXSXdOV1V4TFdVMllqZ3ROR1prWXkwNE56UmhMVFppWW1Nd1pEZGpOVGxqTVNKOS5rQldaWEhIcU1UMTMzMUxlVG4tQ0hVSURNbGNLWVR6ZUFHU0pIOG5KWUtyTDc0Z0FQbjhQS3ZFcmtYR1k0MFE2aUtzU0U0S2Q1V3RZemZ5VVI5Q0dKbDBKWEUwODYwakhMUE9tQXg3OFNJU1gyUGFRYUhzZEZtaHVOb0g1MW9zeF9IM3l1WHpQYzZyVG5ndzZ6N0lpVUcwcEtCcTBaaWFvcFduVDJOcDlmZjRFcWQ1OU93c1BCalBRWkxtZWtwUkc4Vlp1Zm00YUJPTjlYOEMySzFuNmhyVEVUR2J3NUlaNlpZVnJXQVE3NUdaaDZjRlB2bldiMmMyWHFMeGZLY1NfcXFEMktacXFMZGo3Q21sVDI4VlE4cm5ieUJ4UFoydHJEWkJlRHhFSXBaNEpRYXZ5eTFJaVJ5dV9xTHg0QWVKelJibjREc1FFZmx1NUw4QWs0VzN6bFEifX0sImlzcyI6ImJldGEtcmxzLWJwLWJ1ZGR5LTVkMjAiLCJzdWIiOiJiZXRhLXJscy1icC1idWRkeS01ZDIwIiwiYXVkIjoiaHR0cHM6Ly9ybHMuYmV0YS1leGNoYW5nZS5leGFtcGxlL29hdXRoL3Rva2VuIiwiZXhwIjoxNzgxMTk4NjUyLCJqdGkiOiIyZmJhYzViYy05MWVmLTRkMjMtOTRhYS00N2U5YTM1ZDgwMmQifQ.AX0D3uswURI0k0l7nFtMLGkum3qVyvEYb0pRSqdHR4HJUlExT1Ju49vMynS6rbLiKehY6XnflUheL8zukfANe8JbZMKO0J_4k7fKJsH2OJML4iU27Mcx0GQs2y-qRpZ3XafF3IuNCPpO-9UW_dfY8Bdx8FA-gWUycUG-dER49DT7L3S0YqWT7lP2e9s9aT1UNmvUKXUaCCeRi3hQc4t3_6PBQM4NXeHKcnrZb8g3ZFXRsAfXFSFh0W0D-TXpfpieI_07C5wt3U4kKbExtQq-S1SqhOZxhmazizyebvsNFGX_oMR8_px7DLRFmssvwqhwDNrWjV3dOiqOOgwKZxDcbw
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
  "iss": "beta-rls-bp-buddy-5d20",
  "sub": "beta-rls-bp-buddy-5d20",
  "aud": "https://rls.beta-exchange.example/oauth/token",
  "exp": 1781198652,
  "jti": "2fbac5bc-91ef-4d23-94aa-47e9a35d802d"
}
```

---

**Token response — patient matched (can-spec §6), token bound to Maria**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "oN1E1arFwOWMtOeUuQaW_AS_a8DHobRS",
  "token_type": "Bearer",
  "expires_in": 1800,
  "scope": "patient/Patient.rs launch/patient",
  "patient": "beta-master-7741"
}
```

---

**$rls request — parameters are the point of using an operation**

```http
POST https://rls.beta-exchange.example/fhir/Patient/$rls HTTP/1.1
Host: rls.beta-exchange.example
Authorization: Bearer oN1E1arFwOWMtOeUuQaW_AS_a8DHobRS
Content-Type: application/fhir+json
```

```json
{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "geographic-scope",
      "valueString": "US-CA"
    },
    {
      "name": "since",
      "valueDate": "2020-01-01"
    },
    {
      "name": "resource-interest",
      "valueCode": "Observation"
    }
  ]
}
```

---

**$rls response — endpoints likely to hold Maria's records**

```http
HTTP/1.1 200 OK
Content-Type: application/fhir+json
```

```json
{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "location",
      "part": [
        {
          "name": "organization",
          "valueString": "Lakeside Clinic"
        },
        {
          "name": "fhir-endpoint",
          "valueUrl": "https://lakeside.example/fhir"
        }
      ]
    },
    {
      "name": "location",
      "part": [
        {
          "name": "organization",
          "valueString": "County Health"
        },
        {
          "name": "fhir-endpoint",
          "valueUrl": "https://fhir.countyhealth.example/r4"
        }
      ]
    }
  ]
}
```

*Generated 2026-06-11T17:19:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*