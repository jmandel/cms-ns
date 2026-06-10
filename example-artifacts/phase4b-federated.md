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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6Ii1uYThkUHVsa3FwM3dsRTJIdVZBQ1U3... (decoded below)"
}
```

---

**client_assertion** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6Ii1uYThkUHVsa3FwM3dsRTJIdVZBQ1U3Yjd0WHVHQ3ZSWXJ6QmVoRXVRS3ciLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5GelRHTTNaV2N5WlRoV2MxTndPWFYyZDBwbGRuaExSRWxzVVd0SlUyVk9jM0pSVW1KTFN6Tktkbk1pTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1URXdOVE14TkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpSbFl6a3pPV1l4TFRCaE9ETXRORFF5WXkxaE5HWmlMVFJtTWpKaE1XTTNNemN6WmlJc0ltRjFaQ0k2SW1Kd0xXSjFaR1I1TFdsa2JXVXRZMnhwWlc1MElpd2lhV0YwSWpveE56Z3hNVEExTXpFMExDSmxlSEFpT2pFM09ERXhNRFUyTVRRc0ltcDBhU0k2SW1ZNFpEUTJOMkUzTFRWaU1ESXROR1poTWkwNE1EUTFMV000T0RjME9XSmhNMk5rWmlKOS5FS0hZb0JUekpHOFdhOEVwSVNRZEFubk83MDdrbkpkYXVpQ3FYbzlQVzYzUmRWVzlfcWxzOXhiYXNLMy03Wm1LVll4RTRtX1Q1MkpLM1FtQkN6RlVxdl93NUJyYzdfU1l6ZGkzQUI3a250MlBDb1cxRWdTdURUWHFPTzRLSHAtcExERUJJMERxeDd4dnNJRV93SzAyS2VmeTVpb3FwRmE2eXprMkM4TlBCcFJ3Ty1ZdnNaVERNRUV6RkpDaXV2TjlQdUZHZlFwclppQTA2NUptajdoT2RkbFhSMk4xcWF0STluVWVvUDZ1WWZCY2lYcklEZlllS2hMZDVRTnBBYVBIekh1RWg2alpiOTZmWlZVVUoyMEI3MmpYcm5hUjY0cWVkUGdUUmlGOUVTN1lnR01xcWtQejJVcXBQd2R5aHZFVW9DRTdsTW00aDFJcHBCMERhTGVBb3cifX0sImlzcyI6Imxha2VzaWRlLWRoLWJwLWJ1ZGR5LTkxYWYiLCJzdWIiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL29hdXRoL3Rva2VuIiwiZXhwIjoxNzgxMTA1Njc0LCJqdGkiOiJkNzdmZTQyOC03YjYwLTQyODItODBiNy00MjUxMTY5NDAxOTMifQ.HDWwi72Cf7iK5fxILdDCDCJoXNdI7Fd4UBARzhsZjE9Nu2271UV63UogilEvlM8JMR5zhzmsG_ny0-5HVzdl4NDPEsW4AjQ6NGTaZKqoBF3su5ah-F_hBCcZKbXtfvY2rPVuSmXmyzUcBZsVyvjIwxslhVTcehICFe2BGFG_6Raz6hu7zXVv7RwZNgdKcphdWGtZP_5kohMmoQWo1YnV647Pf4gVLg_248S2EvNfzEt3vnIcG7EpEnoQ5USauRarqFswS-qms-GDKc5TS1gu6NrOdXtG40to0naKxhv5pV6eXOwVT1erc8vMQ5ujwft-jX0ZZU5-dO5Vt4gF6SCjWg
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "-na8dPulkqp3wlE2HuVACU7b7tXuGCvRYrzBehEuQKw",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InFzTGM3ZWcyZThWc1NwOXV2d0pldnhLRElsUWtJU2VOc3JRUmJLSzNKdnMiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTEwNTMxNCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjRlYzkzOWYxLTBhODMtNDQyYy1hNGZiLTRmMjJhMWM3MzczZiIsImF1ZCI6ImJwLWJ1ZGR5LWlkbWUtY2xpZW50IiwiaWF0IjoxNzgxMTA1MzE0LCJleHAiOjE3ODExMDU2MTQsImp0aSI6ImY4ZDQ2N2E3LTViMDItNGZhMi04MDQ1LWM4ODc0OWJhM2NkZiJ9.EKHYoBTzJG8Wa8EpISQdAnnO707knJdauiCqXo9PW63RdVW9_qls9xbasK3-7ZmKVYxE4m_T52JK3QmBCzFUqv_w5Brc7_SYzdi3AB7knt2PCoW1EgSuDTXqOO4KHp-pLDEBI0Dqx7xvsIE_wK02Kefy5ioqpFa6yzk2C8NPBpRwO-YvsZTDMEEzFJCiuvN9PuFGfQprZiA065Jmj7hOddlXR2N1qatI9nUeoP6uYfBciXrIDfYeKhLd5QNpAaPHzHuEh6jZb96fZVUUJ20B72jXrnaR64qedPgTRiF9ES7YgGMqqkPz2UqpPwdyhvEUoCE7lMm4h1IppB0DaLeAow"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781105674,
  "jti": "d77fe428-7b60-4282-80b7-425116940193"
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
  "access_token": "j_x-M9ecJTQwjbwU5GRDJcH0jggSwL5n",
  "refresh_token": "vtMKz-BQn4-asoNrH2QPym4MdCfSLFOp",
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
Authorization: Bearer j_x-M9ecJTQwjbwU5GRDJcH0jggSwL5n
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

*Generated 2026-06-10T15:29:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*