# Phase 3 — Patient-bound token and $rls at Beta

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Maria authenticated at her IAL2 CSP moments ago; her id_token travels inside the cms_smart extension of the client_assertion, following the Blue Button CMS Aligned Networks pattern. The access token comes back bound to her, so $rls can only locate her records.*

**CSP-issued IAL2 id_token (ID.me-style claims)** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6ImtWM01WN0d5Z3pYSnZfS3o5eFljcG9mUmZqSWpBSXhwQl9lQXlMSzRkRDQiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxODIxMiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImJiZDlhODAxLTdhNDYtNDRkZC04NmYzLWU3MjQ5ZTg2Yjc5YSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxODIxMiwiZXhwIjoxNzgxMjE4NTEyLCJqdGkiOiJkN2Q2YTMzYi1mZmI5LTQyZDAtOWVhYi03MGYyMzBjYzhlZWUifQ.PVdUAZwGuKBmlrSi3ALpjdLiQSuOz9mYMdsYuMf-053vzAlnIAeX8NrLh9Fk0lRiVguSAOYHp0KvOTsU8JwSqB_JLGEJ3tacgM-lfiFBympRUqxuLIUUlG5EsqVUFju_odh9AOO8rju0mLSlkb23-ps3t2JJdMCYrzWDz5GySIxAwREWa4Vm-EyZ7-xh_h64PBvhQ7Da1doy8g1-xjYile6onvulwc4os3gq-HXDPMuuSaaL9PRMfChtdfpnCyy15UVjpbLCtYgP4u9JpjQxYdcagX3srMSX7MU-FrUVE7eDxaNjS_GUDXQbfIX1oQ0RDcjPoFbtRM5O9Uy38BNVow
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "kV3MV7GygzXJv_Kz9xYcpofRfjIjAIxpB_eAyLK4dD4",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781218212,
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
  "sub": "bbd9a801-7a46-44dd-86f3-e7249e86b79a",
  "aud": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "iat": 1781218212,
  "exp": 1781218512,
  "jti": "d7d6a33b-ffb9-42d0-9eab-70f230cc8eee"
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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IjZ5WHEtdnhWSFgtcEttdEJOd09mQlN3... (decoded below)"
}
```

---

**client_assertion — note extensions.cms_smart carrying the full id_token** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IjZ5WHEtdnhWSFgtcEttdEJOd09mQlN3eWNVSFBaTEhvdHlHWUZ3SVVBVHMiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW10V00wMVdOMGQ1WjNwWVNuWmZTM281ZUZsamNHOW1VbVpxU1dwQlNYaHdRbDlsUVhsTVN6UmtSRFFpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhPREl4TWl3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SW1KaVpEbGhPREF4TFRkaE5EWXRORFJrWkMwNE5tWXpMV1UzTWpRNVpUZzJZamM1WVNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXhPREl4TWl3aVpYaHdJam94TnpneE1qRTROVEV5TENKcWRHa2lPaUprTjJRMllUTXpZaTFtWm1JNUxUUXlaREF0T1dWaFlpMDNNR1l5TXpCall6aGxaV1VpZlEuUFZkVUFad0d1S0JtbHJTaTNBTHBqZExpUVN1T3o5bVlNZHNZdU1mLTA1M3Z6QWxuSUFlWDhOckxoOUZrMGxSaVZndVNBT1lIcDBLdk9Uc1U4SndTcUJfSkxHRUozdGFjZ00tbGZpRkJ5bXBSVXF4dUxJVVVsRzVFc3FWVUZqdV9vZGg5QU9POHJqdTBtTFNsa2IyMy1wczN0MkpKZE1DWXJ6V0R6NUd5U0l4QXdSRVdhNFZtLUV5WjcteGhfaDY0UEJ2aFE3RGExZG95OGcxLXhqWWlsZTZvbnZ1bHdjNG9zM2dxLUhYRFBNdXVTYWFMOVBSTWZDaHRkZnBuQ3l5MTVVVmpwYkxDdFlnUDR1OUpwalF4WWRjYWdYM3NyTVNYN01VLUZyVVZFN2VEeGFOalNfR1VEWFFiZklYMW9RMFJEY2pQb0ZidFJNNU85VXkzOEJOVm93In19LCJpc3MiOiJiZXRhLXJscy1icC1idWRkeS01ZDIwIiwic3ViIjoiYmV0YS1ybHMtYnAtYnVkZHktNWQyMCIsImF1ZCI6Imh0dHBzOi8vcmxzLmJldGEtZXhjaGFuZ2UuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIxODU3MiwianRpIjoiZTk2YTgxMDgtNmJjMS00NzQ0LThjMzItNTYzNjlmOTYwMWI3In0.byZqQ9VO2q5MpyqkUCYHSbEezfZi6GVM3uT-tyZq2QLLbmu9xMzzYvLLUBye1v26lJg2MT1ZpPMHuQ0H4uKi80BILaD9C_CpZM3FMJ-usWqYq2mGimsdKY6oLFns7Ssj1f4wLjlgtL3qNKB0gv7kvm1U33Ql2DfHl8QKX3JhPPASKb1nPXCiU-nRQymXDBMW3Z3_ns4ifAbagIYQ7M7wtlI4-I6Xp-gwTE0VhbXdNSFSCnt5TL3Hp8zai-8HAgtgzWjfC4WGe9ea3xLZ9osLeu49ue_LMg0ClWDjfM5nJx7DSsT_IAZSQU1M540ftY86ea-NAPIeGI0WId4Y8t1Wpw
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "6yXq-vxVHX-pKmtBNwOfBSwycUHPZLHotyGYFwIUATs",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImtWM01WN0d5Z3pYSnZfS3o5eFljcG9mUmZqSWpBSXhwQl9lQXlMSzRkRDQiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxODIxMiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImJiZDlhODAxLTdhNDYtNDRkZC04NmYzLWU3MjQ5ZTg2Yjc5YSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxODIxMiwiZXhwIjoxNzgxMjE4NTEyLCJqdGkiOiJkN2Q2YTMzYi1mZmI5LTQyZDAtOWVhYi03MGYyMzBjYzhlZWUifQ.PVdUAZwGuKBmlrSi3ALpjdLiQSuOz9mYMdsYuMf-053vzAlnIAeX8NrLh9Fk0lRiVguSAOYHp0KvOTsU8JwSqB_JLGEJ3tacgM-lfiFBympRUqxuLIUUlG5EsqVUFju_odh9AOO8rju0mLSlkb23-ps3t2JJdMCYrzWDz5GySIxAwREWa4Vm-EyZ7-xh_h64PBvhQ7Da1doy8g1-xjYile6onvulwc4os3gq-HXDPMuuSaaL9PRMfChtdfpnCyy15UVjpbLCtYgP4u9JpjQxYdcagX3srMSX7MU-FrUVE7eDxaNjS_GUDXQbfIX1oQ0RDcjPoFbtRM5O9Uy38BNVow"
    }
  },
  "iss": "beta-rls-bp-buddy-5d20",
  "sub": "beta-rls-bp-buddy-5d20",
  "aud": "https://rls.beta-exchange.example/oauth/token",
  "exp": 1781218572,
  "jti": "e96a8108-6bc1-4744-8c32-56369f9601b7"
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
  "access_token": "Jt4tXFy1XA88yTL6tkv4X20dJ9cPFi5n",
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
Authorization: Bearer Jt4tXFy1XA88yTL6tkv4X20dJ9cPFi5n
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

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*