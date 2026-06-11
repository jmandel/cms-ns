# Phase 3 — Patient-bound token and $rls at Beta

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Maria authenticated at her IAL2 CSP moments ago; her id_token travels inside the cms_smart extension of the client_assertion, following the Blue Button CMS Aligned Networks pattern. The access token comes back bound to her, so $rls can only locate her records.*

**CSP-issued IAL2 id_token (ID.me-style claims)** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6IndpMURXRk1teDZsaWJFaTBZUDQ2bzhFUmhITndySElMbVU4Sk14clUtV2siLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIwNTM5NCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjRjOGJlMTg1LTcxNzYtNGI3My1hMjNhLTBhNjQxZjZmYjk1NSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIwNTM5NCwiZXhwIjoxNzgxMjA1Njk0LCJqdGkiOiI3MzczODM0Ny0xOGNlLTRhNzktYmE1Ny0yOWMzNWEwOWE2OGIifQ.g5wq2Qq9Gz90skJIivZ4ShGCRzSwsdoqqqiv0JLXitkjleBndKs0sOu7b4KbgSAonoMc1P-L0a9xWEdJNjVbPpUheuaL2zxz3eB2bNU70x6Xmo5A0da3wov2hNtQY77yHmUERYSloF9fIBZtKwpmKlBXYAzphymUM40KdHilKNin26y8Sh_wrOAQ58mMyBWjQIoStSh-D2zg8RPyTMPMnQLRl78aXTJgAVjKug5shLYhb6Y46fUv9TFTCLJ376NTEHsH6zYgnxZZpgN4eOndpH3yRmZd8wtIf5KDFegpltrrqDsRD2va5mlYSREy0RESNUr_L1W2c258Yo2lcWjFyA
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "wi1DWFMmx6libEi0YP46o8ERhHNwrHILmU8JMxrU-Wk",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781205394,
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
  "sub": "4c8be185-7176-4b73-a23a-0a641f6fb955",
  "aud": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "iat": 1781205394,
  "exp": 1781205694,
  "jti": "73738347-18ce-4a79-ba57-29c35a09a68b"
}
```

The `aud` is the app's canonical Library identifier: the app configures its CSP registration so id_tokens carry its `software_id`. Any network or data holder can then verify the relationship between the id_token's audience and the presenting application (can-spec §9) by matching `aud` against the `software_id` it bound at registration — the identifiers are literally identical, no directory needed.

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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IjFlWW12QmtRX29VVUdWeTg1N0FGWUh2... (decoded below)"
}
```

---

**client_assertion — note extensions.cms_smart carrying the full id_token** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IjFlWW12QmtRX29VVUdWeTg1N0FGWUh2U0VUbFFZTUF5T1hqMVRnWEJScnMiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5kcE1VUlhSazF0ZURac2FXSkZhVEJaVURRMmJ6aEZVbWhJVG5keVNFbE1iVlU0U2sxNGNsVXRWMnNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXdOVE01TkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpSak9HSmxNVGcxTFRjeE56WXROR0kzTXkxaE1qTmhMVEJoTmpReFpqWm1ZamsxTlNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXdOVE01TkN3aVpYaHdJam94TnpneE1qQTFOamswTENKcWRHa2lPaUkzTXpjek9ETTBOeTB4T0dObExUUmhOemt0WW1FMU55MHlPV016TldFd09XRTJPR0lpZlEuZzV3cTJRcTlHejkwc2tKSWl2WjRTaEdDUnpTd3Nkb3FxcWl2MEpMWGl0a2psZUJuZEtzMHNPdTdiNEtiZ1NBb25vTWMxUC1MMGE5eFdFZEpOalZiUHBVaGV1YUwyenh6M2VCMmJOVTcweDZYbW81QTBkYTN3b3YyaE50UVk3N3lIbVVFUllTbG9GOWZJQlp0S3dwbUtsQlhZQXpwaHltVU00MEtkSGlsS05pbjI2eThTaF93ck9BUTU4bU15QldqUUlvU3RTaC1EMnpnOFJQeVRNUE1uUUxSbDc4YVhUSmdBVmpLdWc1c2hMWWhiNlk0NmZVdjlURlRDTEozNzZOVEVIc0g2ellnbnhaWnBnTjRlT25kcEgzeVJtWmQ4d3RJZjVLREZlZ3BsdHJycURzUkQydmE1bWxZU1JFeTBSRVNOVXJfTDFXMmMyNThZbzJsY1dqRnlBIn19LCJpc3MiOiJiZXRhLXJscy1icC1idWRkeS01ZDIwIiwic3ViIjoiYmV0YS1ybHMtYnAtYnVkZHktNWQyMCIsImF1ZCI6Imh0dHBzOi8vcmxzLmJldGEtZXhjaGFuZ2UuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIwNTc1NCwianRpIjoiMTJjZDg5ZjQtMzNmNC00MzkxLTg0OTMtNzdmNDBhODYwMDY4In0.Mz8F3HAGBIyFmqZvxq_Pi9_Vu0isz7jWmi0WCJmLf2u_Fuq4UVuoxktVg-2IJXL-YD6h8BS0rYsyq8B4OzE0q0PRMqh2Mq1lxhHD2BS1ZDNqGrAV8B1OWK67forg6rsoj_TS0h12ikbxzl_aUhbF2dPeMZZDHWjTgjDYnj81TG_5ujASbimp0xJZHMJEBHLJY2QuBwBQYG7SktOoFclGRVnY4hweM3u10HZ0qJmnDYd5aZtqqPxJ0Rs3R4lZskzFbaZ9IfOES_95st-9NktrmU3_fPYrG97eQSlmV2GJEGihTSINQmXC6GRSKrIrxHW0-aOIUSrVpZCwxlOmZbnutw
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "1eYmvBkQ_oUUGVy857AFYHvSETlQYMAyOXj1TgXBRrs",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IndpMURXRk1teDZsaWJFaTBZUDQ2bzhFUmhITndySElMbVU4Sk14clUtV2siLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIwNTM5NCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjRjOGJlMTg1LTcxNzYtNGI3My1hMjNhLTBhNjQxZjZmYjk1NSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIwNTM5NCwiZXhwIjoxNzgxMjA1Njk0LCJqdGkiOiI3MzczODM0Ny0xOGNlLTRhNzktYmE1Ny0yOWMzNWEwOWE2OGIifQ.g5wq2Qq9Gz90skJIivZ4ShGCRzSwsdoqqqiv0JLXitkjleBndKs0sOu7b4KbgSAonoMc1P-L0a9xWEdJNjVbPpUheuaL2zxz3eB2bNU70x6Xmo5A0da3wov2hNtQY77yHmUERYSloF9fIBZtKwpmKlBXYAzphymUM40KdHilKNin26y8Sh_wrOAQ58mMyBWjQIoStSh-D2zg8RPyTMPMnQLRl78aXTJgAVjKug5shLYhb6Y46fUv9TFTCLJ376NTEHsH6zYgnxZZpgN4eOndpH3yRmZd8wtIf5KDFegpltrrqDsRD2va5mlYSREy0RESNUr_L1W2c258Yo2lcWjFyA"
    }
  },
  "iss": "beta-rls-bp-buddy-5d20",
  "sub": "beta-rls-bp-buddy-5d20",
  "aud": "https://rls.beta-exchange.example/oauth/token",
  "exp": 1781205754,
  "jti": "12cd89f4-33f4-4391-8493-77f40a860068"
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
  "access_token": "1NVt39AJcYQKSFP0Zhf7i3FaO-PDanSH",
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
Authorization: Bearer 1NVt39AJcYQKSFP0Zhf7i3FaO-PDanSH
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

*Generated 2026-06-11T19:17:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*