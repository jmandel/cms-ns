# Phase 3 — Patient-bound token and $rls at Beta

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Maria authenticated at her IAL2 CSP moments ago; her id_token travels inside the cms_smart extension of the client_assertion, following the Blue Button CMS Aligned Networks pattern. The access token comes back bound to her, so $rls can only locate her records.*

**CSP-issued IAL2 id_token (ID.me-style claims)** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6Ik14UjJmcFVBMTFPcTFya3NTNUtIX1NrNUticERCbmRMblk3bU81SG5HRVUiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxNDI0NCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6Ijk0ODdmMjZmLTUzMWYtNDU3Ni1hNzI3LWEyMzFhZGViZDQzMCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxNDI0NCwiZXhwIjoxNzgxMjE0NTQ0LCJqdGkiOiI1N2ViYzhkOS00N2E5LTQ4OTctOTUxOS03NGEwOThhMDgwMmEifQ.T0kfcLYukqk4tZiUOybhWzVZYiUDfYm3Td0Qcos4QHMd1p8p5KMa9mjSerWH122KQ3RXgTuDlHrIo06lgrOaxXEFE6dVaeNze77MBCHFEFDfsL3rql4_2lXHHvT5xMToA5cw9uwvsWlZjl4CAge9ACtRuXmxjxTm70RVIV45gj9lk-pO_wm4qWT41CsQCEf65MP4E98p5xeXJVwuYfBwS9HsXQdUqxNYNUdMnO0K1GjSur0pUK_jipCgTmFFaRLpgVvLDmkAewWL0QqJZKiobjMerRy4-Y84h7rHp5BkAyFK-r_WZ5RBexDW0sKXgEQPK4mmDRurqn_WsEZ_BL1b0w
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "MxR2fpUA11Oq1rksS5KH_Sk5KbpDBndLnY7mO5HnGEU",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781214244,
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
  "sub": "9487f26f-531f-4576-a727-a231adebd430",
  "aud": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "iat": 1781214244,
  "exp": 1781214544,
  "jti": "57ebc8d9-47a9-4897-9519-74a098a0802a"
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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IjQxeHM3YThWV2hIWlFRbXdZOVJrMFJu... (decoded below)"
}
```

---

**client_assertion — note extensions.cms_smart carrying the full id_token** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IjQxeHM3YThWV2hIWlFRbXdZOVJrMFJuR0tqQjdJd3kwQ3B4LVZTVkRTSWsiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWsxNFVqSm1jRlZCTVRGUGNURnlhM05UTlV0SVgxTnJOVXRpY0VSQ2JtUk1ibGszYlU4MVNHNUhSVlVpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhOREkwTkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWprME9EZG1NalptTFRVek1XWXRORFUzTmkxaE56STNMV0V5TXpGaFpHVmlaRFF6TUNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXhOREkwTkN3aVpYaHdJam94TnpneE1qRTBOVFEwTENKcWRHa2lPaUkxTjJWaVl6aGtPUzAwTjJFNUxUUTRPVGN0T1RVeE9TMDNOR0V3T1RoaE1EZ3dNbUVpZlEuVDBrZmNMWXVrcWs0dFppVU95YmhXelZaWWlVRGZZbTNUZDBRY29zNFFITWQxcDhwNUtNYTltalNlcldIMTIyS1EzUlhnVHVEbEhySW8wNmxnck9heFhFRkU2ZFZhZU56ZTc3TUJDSEZFRkRmc0wzcnFsNF8ybFhISHZUNXhNVG9BNWN3OXV3dnNXbFpqbDRDQWdlOUFDdFJ1WG14anhUbTcwUlZJVjQ1Z2o5bGstcE9fd200cVdUNDFDc1FDRWY2NU1QNEU5OHA1eGVYSlZ3dVlmQndTOUhzWFFkVXF4TllOVWRNbk8wSzFHalN1cjBwVUtfamlwQ2dUbUZGYVJMcGdWdkxEbWtBZXdXTDBRcUpaS2lvYmpNZXJSeTQtWTg0aDdySHA1QmtBeUZLLXJfV1o1UkJleERXMHNLWGdFUVBLNG1tRFJ1cnFuX1dzRVpfQkwxYjB3In19LCJpc3MiOiJiZXRhLXJscy1icC1idWRkeS01ZDIwIiwic3ViIjoiYmV0YS1ybHMtYnAtYnVkZHktNWQyMCIsImF1ZCI6Imh0dHBzOi8vcmxzLmJldGEtZXhjaGFuZ2UuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIxNDYwNCwianRpIjoiZmVmZmQ1NDEtNDczYy00ZGRhLThjMTItODY5ZTdiN2I3N2Q1In0.byPYthVqrzoVb-mtnUdVAg3A-kKo5iuo3dgD_AUsOG-ibzUKCtz0C9pS_4GLR5YpnDhYpkjibFHmOchHHfprwtvcfX-HRDNXB_32Q_baKGN6RBLI7cZeaJC5_5eZfY5DK-2WaC-WkQ1H6nI9IIBwIEWKCQOcmQnxqoJ_GOWNqr9M7hTvgLd0rF_Sv0iho5CSMXSn5H1wNdxD_bP6XRLx035R7t0M08UffBYGo2FRloO2WbSYSlry97cEQNrnU6m4mfSLc5iDU3tL86-fholH0jW9Vg46DlDrWrQM3AvUxx1Yywi0mddLJi2yygLvHemlsJ_pLOBUZntwfRbXI5hfdw
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "41xs7a8VWhHZQQmwY9Rk0RnGKjB7Iwy0Cpx-VSVDSIk",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ik14UjJmcFVBMTFPcTFya3NTNUtIX1NrNUticERCbmRMblk3bU81SG5HRVUiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxNDI0NCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6Ijk0ODdmMjZmLTUzMWYtNDU3Ni1hNzI3LWEyMzFhZGViZDQzMCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxNDI0NCwiZXhwIjoxNzgxMjE0NTQ0LCJqdGkiOiI1N2ViYzhkOS00N2E5LTQ4OTctOTUxOS03NGEwOThhMDgwMmEifQ.T0kfcLYukqk4tZiUOybhWzVZYiUDfYm3Td0Qcos4QHMd1p8p5KMa9mjSerWH122KQ3RXgTuDlHrIo06lgrOaxXEFE6dVaeNze77MBCHFEFDfsL3rql4_2lXHHvT5xMToA5cw9uwvsWlZjl4CAge9ACtRuXmxjxTm70RVIV45gj9lk-pO_wm4qWT41CsQCEf65MP4E98p5xeXJVwuYfBwS9HsXQdUqxNYNUdMnO0K1GjSur0pUK_jipCgTmFFaRLpgVvLDmkAewWL0QqJZKiobjMerRy4-Y84h7rHp5BkAyFK-r_WZ5RBexDW0sKXgEQPK4mmDRurqn_WsEZ_BL1b0w"
    }
  },
  "iss": "beta-rls-bp-buddy-5d20",
  "sub": "beta-rls-bp-buddy-5d20",
  "aud": "https://rls.beta-exchange.example/oauth/token",
  "exp": 1781214604,
  "jti": "feffd541-473c-4dda-8c12-869e7b7b77d5"
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
  "access_token": "-tab4SP32hTuZISP07tVAqc_62WAvmdq",
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
Authorization: Bearer -tab4SP32hTuZISP07tVAqc_62WAvmdq
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

*Generated 2026-06-11T21:45:04.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*