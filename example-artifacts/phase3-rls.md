# Phase 3 — Patient-bound token and $rls at Beta

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Maria authenticated at her IAL2 CSP moments ago; her id_token travels inside the cms_smart extension of the client_assertion, following the Blue Button CMS Aligned Networks pattern. The access token comes back bound to her, so $rls can only locate her records.*

**CSP-issued IAL2 id_token (ID.me-style claims)** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6IjNXOVQxQ1VfMnhXS0FuLW1zUjFTTmJKZkpOTTVOZWxHOGpiNmlVTFM2VjgiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxNjQwNiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjBlNzU4OTBmLTkzZTItNGEwMS04ZWU4LTFjMTUzOWRhYjA0NSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxNjQwNiwiZXhwIjoxNzgxMjE2NzA2LCJqdGkiOiIzOWMxOWYwMy1kYTliLTQ2OWEtYTk5NC1lNjI5OTQ2ZDExMGUifQ.BA-iQQS_8RHtUyoyq0-WzpDXmpSPlz53ZnXs99oZljR7oy5BxLAAA7KO9Nyg17SqmZH3_wEAS1w-6EEfNV8uQMv1ASzAlJuqDJ_o5PEHKQqcjn0XfQ58tJdyTsIAmdRctMPSiE3OwZFzrUvNjecjs0YYZimtw0ZdQ93N0mjF1n1R6c9SUDmSUT0n_w2zxjGvv-3lJnxYnFLHIsflwmmGYOYKXbKGQkJt1OIONJNuRHzOrXiTCxrLDYjE8BJASx8uaxgBnXgk3z4jUnaxTz0jOxUThK-qZCHvd10-OzE-i3K1H-AOowwWv1NbC31_46XHKpfuH0pBslbxya8e452C3g
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "3W9T1CU_2xWKAn-msR1SNbJfJNM5NelG8jb6iULS6V8",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781216406,
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
  "sub": "0e75890f-93e2-4a01-8ee8-1c1539dab045",
  "aud": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "iat": 1781216406,
  "exp": 1781216706,
  "jti": "39c19f03-da9b-469a-a994-e629946d110e"
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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IkJBVEZ6V0tYSmJBWVM4el84Z0dPeHpT... (decoded below)"
}
```

---

**client_assertion — note extensions.cms_smart carrying the full id_token** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IkJBVEZ6V0tYSmJBWVM4el84Z0dPeHpTY2FaYlhiZWpxbU5GSlZMMWVnMUEiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWpOWE9WUXhRMVZmTW5oWFMwRnVMVzF6VWpGVFRtSktaa3BPVFRWT1pXeEhPR3BpTm1sVlRGTTJWamdpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhOalF3Tml3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpCbE56VTRPVEJtTFRrelpUSXROR0V3TVMwNFpXVTRMVEZqTVRVek9XUmhZakEwTlNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXhOalF3Tml3aVpYaHdJam94TnpneE1qRTJOekEyTENKcWRHa2lPaUl6T1dNeE9XWXdNeTFrWVRsaUxUUTJPV0V0WVRrNU5DMWxOakk1T1RRMlpERXhNR1VpZlEuQkEtaVFRU184Ukh0VXlveXEwLVd6cERYbXBTUGx6NTNablhzOTlvWmxqUjdveTVCeExBQUE3S085TnlnMTdTcW1aSDNfd0VBUzF3LTZFRWZOVjh1UU12MUFTekFsSnVxREpfbzVQRUhLUXFjam4wWGZRNTh0SmR5VHNJQW1kUmN0TVBTaUUzT3daRnpyVXZOamVjanMwWVlaaW10dzBaZFE5M04wbWpGMW4xUjZjOVNVRG1TVVQwbl93Mnp4akd2di0zbEpueFluRkxISXNmbHdtbUdZT1lLWGJLR1FrSnQxT0lPTkpOdVJIek9yWGlUQ3hyTERZakU4QkpBU3g4dWF4Z0JuWGdrM3o0alVuYXhUejBqT3hVVGhLLXFaQ0h2ZDEwLU96RS1pM0sxSC1BT293d1d2MU5iQzMxXzQ2WEhLcGZ1SDBwQnNsYnh5YThlNDUyQzNnIn19LCJpc3MiOiJiZXRhLXJscy1icC1idWRkeS01ZDIwIiwic3ViIjoiYmV0YS1ybHMtYnAtYnVkZHktNWQyMCIsImF1ZCI6Imh0dHBzOi8vcmxzLmJldGEtZXhjaGFuZ2UuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIxNjc2NiwianRpIjoiZTA3ZDJlZTMtMGNhMS00NGU2LThkNjAtZTJiMDY5ZDliNjU2In0.mTng-4TLbX9pB_YQ2U--AVWcFIBOdV0JGdUL6jEu9ItDuIu6cehDrg7_y_aDHvTeFrWmOWYx--2-Sg_F8_zw0nOPqh0957OxsGs_Tf6L81gXFLXHY_bucaB28SpFnFQ7K51Dvcw4jjJxFcVu8o3P-jzQiwtaVec4bQLRwXh8U2Av5CakwJcDZm4Px5YzV96ccHyrdF_swRc6VEWr0pJjH2f3VCuKBkp4eJrbFW38EH8LLMjrFlZtGRTm8M1CSUWFZec1EAzBkBkW419zlPHjDX3B4Ae-NjAKJnRfHMJy0pYchQTbu1hSt1a8DuIFicTHmlY1Ukxixjw85qxzbbD_sw
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "BATFzWKXJbAYS8z_8gGOxzScaZbXbejqmNFJVL1eg1A",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNXOVQxQ1VfMnhXS0FuLW1zUjFTTmJKZkpOTTVOZWxHOGpiNmlVTFM2VjgiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxNjQwNiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjBlNzU4OTBmLTkzZTItNGEwMS04ZWU4LTFjMTUzOWRhYjA0NSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxNjQwNiwiZXhwIjoxNzgxMjE2NzA2LCJqdGkiOiIzOWMxOWYwMy1kYTliLTQ2OWEtYTk5NC1lNjI5OTQ2ZDExMGUifQ.BA-iQQS_8RHtUyoyq0-WzpDXmpSPlz53ZnXs99oZljR7oy5BxLAAA7KO9Nyg17SqmZH3_wEAS1w-6EEfNV8uQMv1ASzAlJuqDJ_o5PEHKQqcjn0XfQ58tJdyTsIAmdRctMPSiE3OwZFzrUvNjecjs0YYZimtw0ZdQ93N0mjF1n1R6c9SUDmSUT0n_w2zxjGvv-3lJnxYnFLHIsflwmmGYOYKXbKGQkJt1OIONJNuRHzOrXiTCxrLDYjE8BJASx8uaxgBnXgk3z4jUnaxTz0jOxUThK-qZCHvd10-OzE-i3K1H-AOowwWv1NbC31_46XHKpfuH0pBslbxya8e452C3g"
    }
  },
  "iss": "beta-rls-bp-buddy-5d20",
  "sub": "beta-rls-bp-buddy-5d20",
  "aud": "https://rls.beta-exchange.example/oauth/token",
  "exp": 1781216766,
  "jti": "e07d2ee3-0ca1-44e6-8d60-e2b069d9b656"
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
  "access_token": "8ROvfiWPkHCWtGnEf1U7UbLQLh9G3GLC",
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
Authorization: Bearer 8ROvfiWPkHCWtGnEf1U7UbLQLh9G3GLC
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

*Generated 2026-06-11T22:21:06.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*