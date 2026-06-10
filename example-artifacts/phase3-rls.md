# Phase 3 — Patient-bound token and $rls at Beta

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Maria authenticated at her IAL2 CSP moments ago; her id_token travels inside the cms_smart extension of the client_assertion, following the Blue Button CMS Aligned Networks pattern. The access token comes back bound to her, so $rls can only locate her records.*

**CSP-issued IAL2 id_token (ID.me-style claims)** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6InFzTGM3ZWcyZThWc1NwOXV2d0pldnhLRElsUWtJU2VOc3JRUmJLSzNKdnMiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTEwNTMxNCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjRlYzkzOWYxLTBhODMtNDQyYy1hNGZiLTRmMjJhMWM3MzczZiIsImF1ZCI6ImJwLWJ1ZGR5LWlkbWUtY2xpZW50IiwiaWF0IjoxNzgxMTA1MzE0LCJleHAiOjE3ODExMDU2MTQsImp0aSI6ImY4ZDQ2N2E3LTViMDItNGZhMi04MDQ1LWM4ODc0OWJhM2NkZiJ9.EKHYoBTzJG8Wa8EpISQdAnnO707knJdauiCqXo9PW63RdVW9_qls9xbasK3-7ZmKVYxE4m_T52JK3QmBCzFUqv_w5Brc7_SYzdi3AB7knt2PCoW1EgSuDTXqOO4KHp-pLDEBI0Dqx7xvsIE_wK02Kefy5ioqpFa6yzk2C8NPBpRwO-YvsZTDMEEzFJCiuvN9PuFGfQprZiA065Jmj7hOddlXR2N1qatI9nUeoP6uYfBciXrIDfYeKhLd5QNpAaPHzHuEh6jZb96fZVUUJ20B72jXrnaR64qedPgTRiF9ES7YgGMqqkPz2UqpPwdyhvEUoCE7lMm4h1IppB0DaLeAow
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "qsLc7eg2e8VsSp9uvwJevxKDIlQkISeNsrQRbKK3Jvs",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781105314,
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
  "sub": "4ec939f1-0a83-442c-a4fb-4f22a1c7373f",
  "aud": "bp-buddy-idme-client",
  "iat": 1781105314,
  "exp": 1781105614,
  "jti": "f8d467a7-5b02-4fa2-8045-c88749ba3cdf"
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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6Ii1uYThkUHVsa3FwM3dsRTJIdVZBQ1U3... (decoded below)"
}
```

---

**client_assertion — note extensions.cms_smart carrying the full id_token** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6Ii1uYThkUHVsa3FwM3dsRTJIdVZBQ1U3Yjd0WHVHQ3ZSWXJ6QmVoRXVRS3ciLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5GelRHTTNaV2N5WlRoV2MxTndPWFYyZDBwbGRuaExSRWxzVVd0SlUyVk9jM0pSVW1KTFN6Tktkbk1pTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1URXdOVE14TkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpSbFl6a3pPV1l4TFRCaE9ETXRORFF5WXkxaE5HWmlMVFJtTWpKaE1XTTNNemN6WmlJc0ltRjFaQ0k2SW1Kd0xXSjFaR1I1TFdsa2JXVXRZMnhwWlc1MElpd2lhV0YwSWpveE56Z3hNVEExTXpFMExDSmxlSEFpT2pFM09ERXhNRFUyTVRRc0ltcDBhU0k2SW1ZNFpEUTJOMkUzTFRWaU1ESXROR1poTWkwNE1EUTFMV000T0RjME9XSmhNMk5rWmlKOS5FS0hZb0JUekpHOFdhOEVwSVNRZEFubk83MDdrbkpkYXVpQ3FYbzlQVzYzUmRWVzlfcWxzOXhiYXNLMy03Wm1LVll4RTRtX1Q1MkpLM1FtQkN6RlVxdl93NUJyYzdfU1l6ZGkzQUI3a250MlBDb1cxRWdTdURUWHFPTzRLSHAtcExERUJJMERxeDd4dnNJRV93SzAyS2VmeTVpb3FwRmE2eXprMkM4TlBCcFJ3Ty1ZdnNaVERNRUV6RkpDaXV2TjlQdUZHZlFwclppQTA2NUptajdoT2RkbFhSMk4xcWF0STluVWVvUDZ1WWZCY2lYcklEZlllS2hMZDVRTnBBYVBIekh1RWg2alpiOTZmWlZVVUoyMEI3MmpYcm5hUjY0cWVkUGdUUmlGOUVTN1lnR01xcWtQejJVcXBQd2R5aHZFVW9DRTdsTW00aDFJcHBCMERhTGVBb3cifX0sImlzcyI6ImJldGEtcmxzLWJwLWJ1ZGR5LTVkMjAiLCJzdWIiOiJiZXRhLXJscy1icC1idWRkeS01ZDIwIiwiYXVkIjoiaHR0cHM6Ly9ybHMuYmV0YS1leGNoYW5nZS5leGFtcGxlL29hdXRoL3Rva2VuIiwiZXhwIjoxNzgxMTA1Njc0LCJqdGkiOiJmNzJhNDJiOC1jMjllLTQwNTgtYjBjNC1lMzEwNjM3NGMwOTcifQ.qMOElM4nrzI7SJdv79nPOhOkqKogHFQzCkEHk1CZPjAo6zptOvses1SI0o8NGoq5MiW6Sj92cRXBMZom59eJMcWb5rYYRRcmh1MUFS_PHHRVl8ak75TddfUUXTxjhRWBD5gFr9CWIehaShIa6KnTjL77L56qcXX3aMVXFWMPcDApnavA1nEImvxQHLLMhdpjGcv2osse7GVf1Om5hjQQeRkGYNP261icbioV0KdpHJTx7DjAegrLZcxNQF8Q7oCohcwSsrgF8z5YMmlR_ZJDxSKaFokbmYuU3cnJ8kqn0k_l6eovK0ryZ0-JAsr_PdbWAsQcO5sLf5M001kvSaKDZA
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
  "iss": "beta-rls-bp-buddy-5d20",
  "sub": "beta-rls-bp-buddy-5d20",
  "aud": "https://rls.beta-exchange.example/oauth/token",
  "exp": 1781105674,
  "jti": "f72a42b8-c29e-4058-b0c4-e3106374c097"
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
  "access_token": "3ceFyp15TawXOvlzNpceJSowZGV52NQp",
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
Authorization: Bearer 3ceFyp15TawXOvlzNpceJSowZGV52NQp
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

*Generated 2026-06-10T15:29:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*