# Phase 3 — Patient-bound token and $rls at Beta

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Maria authenticated at her IAL2 CSP moments ago; her id_token travels inside the cms_smart extension of the client_assertion, following the Blue Button CMS Aligned Networks pattern. The access token comes back bound to her, so $rls can only locate her records.*

**CSP-issued IAL2 id_token (ID.me-style claims)** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6Ik5CbWl2SnhhM09VUEJhcU1OTTF4QVJHVG12U0ZnTm1WREtHeXRyZ0pKN2siLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMTA3NiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjZkYWYxYTM3LTBkZmQtNGVjMy1hNDUwLTUzNTVlNTE3ZjVlMCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyMTA3NiwiZXhwIjoxNzgxMjIxMzc2LCJqdGkiOiIyODI2ODM5Zi02NTYyLTQ0NzUtYjk3Ny1lYjg2NTRlNGM0MWMifQ.IQgk6gv4GVbv-8ulZ9gMGAfRYhbESr32ofGqrNeNucMpxMhoofA66c3gAv0Gg-21lcsBqouwrYh4GsYZdxlSkRjoMg_6yM-8EY_mEltFc0dpLv9dcNXSAjv-mCvzyZZALXbyl5RWxDeqLGtOQbqFOML2jWqvc3mXlqEIH_ha3IinXka1t59a0xGOezzrVBBjTMS5CR6jmdggzM_m5Lv6vPJsyEvO2alONZCXACwUcLFfyUGJx5Uf0iI1CGyA_dGKpHdj-SCj6IYjSDSStOUPPp-BlmQltxVeNwxCct6Mwy3S3i5gYS0Y3Sq8EaRtnKUSDmsUWpdUglZNov8cMXd5LA
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "NBmivJxa3OUPBaqMNM1xARGTmvSFgNmVDKGytrgJJ7k",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781221076,
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
  "sub": "6daf1a37-0dfd-4ec3-a450-5355e517f5e0",
  "aud": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "iat": 1781221076,
  "exp": 1781221376,
  "jti": "2826839f-6562-4475-b977-eb8654e4c41c"
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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IkJfdS1uRHAwbHBXSWI1bTZkT3pNVG5n... (decoded below)"
}
```

---

**client_assertion — note extensions.cms_smart carrying the full id_token** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IkJfdS1uRHAwbHBXSWI1bTZkT3pNVG5naUMwMzZ1UUpYa0g3OXNLc19OMHciLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWs1Q2JXbDJTbmhoTTA5VlVFSmhjVTFPVFRGNFFWSkhWRzEyVTBablRtMVdSRXRIZVhSeVowcEtOMnNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNVEEzTml3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpaa1lXWXhZVE0zTFRCa1ptUXROR1ZqTXkxaE5EVXdMVFV6TlRWbE5URTNaalZsTUNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlNVEEzTml3aVpYaHdJam94TnpneE1qSXhNemMyTENKcWRHa2lPaUl5T0RJMk9ETTVaaTAyTlRZeUxUUTBOelV0WWprM055MWxZamcyTlRSbE5HTTBNV01pZlEuSVFnazZndjRHVmJ2LTh1bFo5Z01HQWZSWWhiRVNyMzJvZkdxck5lTnVjTXB4TWhvb2ZBNjZjM2dBdjBHZy0yMWxjc0Jxb3V3clloNEdzWVpkeGxTa1Jqb01nXzZ5TS04RVlfbUVsdEZjMGRwTHY5ZGNOWFNBanYtbUN2enlaWkFMWGJ5bDVSV3hEZXFMR3RPUWJxRk9NTDJqV3F2YzNtWGxxRUlIX2hhM0lpblhrYTF0NTlhMHhHT2V6enJWQkJqVE1TNUNSNmptZGdnek1fbTVMdjZ2UEpzeUV2TzJhbE9OWkNYQUN3VWNMRmZ5VUdKeDVVZjBpSTFDR3lBX2RHS3BIZGotU0NqNklZalNEU1N0T1VQUHAtQmxtUWx0eFZlTnd4Q2N0Nk13eTNTM2k1Z1lTMFkzU3E4RWFSdG5LVVNEbXNVV3BkVWdsWk5vdjhjTVhkNUxBIn19LCJpc3MiOiJiZXRhLXJscy1icC1idWRkeS01ZDIwIiwic3ViIjoiYmV0YS1ybHMtYnAtYnVkZHktNWQyMCIsImF1ZCI6Imh0dHBzOi8vcmxzLmJldGEtZXhjaGFuZ2UuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyMTQzNiwianRpIjoiOGEwZWJiOGYtNzExOC00ZDE3LWIyNWUtNTZjY2Y4OWE2YmI0In0.cNLHj3xOqGnw9FA2avyHJk4HldJ6ixuIoWSL5nd2ieJpQhCI6x297pM7xcE-FhYd7iLBhpZo3zVt7jhpwScYNY25sCf5gdiANXLLaX0GTXtMV5hFICXsTYatiiVcbLw5kJ67u6Vh5lS6WZcbAkJW8POqdpYQBRpwrcwbEPiVZIjEffziIOR7qlcFJRj_82qj2PjBY0GoF--0GgJmVMqFKWV8zxcjJTkmWVYNjnlMxFTvd0vTXUsy-Z1WQwg0T0ULDZjdsPOobBTgEPG1C9g5jQ-2Ryw1zO364fhJh1C3661Kv6Gr4aysT23Ao51G5L68e1W1L__JaN8Jlpv_ztnIxw
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
  "iss": "beta-rls-bp-buddy-5d20",
  "sub": "beta-rls-bp-buddy-5d20",
  "aud": "https://rls.beta-exchange.example/oauth/token",
  "exp": 1781221436,
  "jti": "8a0ebb8f-7118-4d17-b25e-56ccf89a6bb4"
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
  "access_token": "Da_o2haO1SgEFUCrH8o49x8d17pCoK7f",
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
Authorization: Bearer Da_o2haO1SgEFUCrH8o49x8d17pCoK7f
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

*Generated 2026-06-11T23:38:56.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*