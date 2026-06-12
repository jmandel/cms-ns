# client_credentials + $rls: the app-asserted grant at a network

*Worked example for [the record location and data access write-up](../authorizing-access.md). Maria authenticated at her IAL2 CSP moments ago; her id_token travels inside the cms_smart extension of the client_assertion, following the Blue Button CMS Aligned Networks pattern. The access token comes back bound to her, so $rls can only locate her records.*

**CSP-issued IAL2 id_token (ID.me-style claims)** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6IlRQWEFxV3g1eTNxTGhGVVRZR2RIa2gzRkUtX3p4R192Y2d1N3BESmp3S2ciLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNDgyMSwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImI1NGQ2YzAyLTgwZWEtNDUxZi1iMDkyLTI3OGZkZDg2MTNlZiIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyNDgyMSwiZXhwIjoxNzgxMjI1MTIxLCJqdGkiOiI2MzM5YWQyNS03NDMwLTRjMDQtODExZS05MzRiMzEzYWIwMGIifQ.ESnJpmKfm232jT2hdgWcRqrt3dEwHPFDyrHMBTi2NsQdOisevWxb8PxVM10kXZqR8Xgg2siJofdPa6AaS809Fb4Y56I2cOvSIsHuaAnFof-EXP5bsFfZj2y9j2bKrFZJ9ChHU3UoN-udzPsiKx34rGkHY3IlvarGb0gd4T34iiorYxdnpk7dHwebqHx25bWo2SefcBLdP5liEiRz-kNXZvfSb4Bn2XQ750oH9ai08hmV1IG3MQStHYgQnyK0qMUrFUHrmjf9H8UITzEah5gEwxfPcMdtvq5FsiyRHdDpdI_NDAMxiq-jDRlT6kCUkRObtIlV69uCcTEi3i_RK1JNoQ
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "TPXAqWx5y3qLhFUTYGdHkh3FE-_zxG_vcgu7pDJjwKg",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781224821,
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
  "sub": "b54d6c02-80ea-451f-b092-278fdd8613ef",
  "aud": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "iat": 1781224821,
  "exp": 1781225121,
  "jti": "6339ad25-7430-4c04-811e-934b313ab00b"
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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6IlpFbVR6SG5NOE5JTUdldTA0QUNja3Ji... (decoded below)"
}
```

---

**client_assertion — note extensions.cms_smart carrying the full id_token** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IlpFbVR6SG5NOE5JTUdldTA0QUNja3JieFdHXzd6aEpPM25fdmExU3ZWVjAiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxSUVdFRnhWM2cxZVROeFRHaEdWVlJaUjJSSWEyZ3pSa1V0WDNwNFIxOTJZMmQxTjNCRVNtcDNTMmNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlORGd5TVN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SW1JMU5HUTJZekF5TFRnd1pXRXRORFV4WmkxaU1Ea3lMVEkzT0daa1pEZzJNVE5sWmlJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlORGd5TVN3aVpYaHdJam94TnpneE1qSTFNVEl4TENKcWRHa2lPaUkyTXpNNVlXUXlOUzAzTkRNd0xUUmpNRFF0T0RFeFpTMDVNelJpTXpFellXSXdNR0lpZlEuRVNuSnBtS2ZtMjMyalQyaGRnV2NScXJ0M2RFd0hQRkR5ckhNQlRpMk5zUWRPaXNldld4YjhQeFZNMTBrWFpxUjhYZ2cyc2lKb2ZkUGE2QWFTODA5RmI0WTU2STJjT3ZTSXNIdWFBbkZvZi1FWFA1YnNGZlpqMnk5ajJiS3JGWko5Q2hIVTNVb04tdWR6UHNpS3gzNHJHa0hZM0lsdmFyR2IwZ2Q0VDM0aWlvcll4ZG5wazdkSHdlYnFIeDI1YldvMlNlZmNCTGRQNWxpRWlSei1rTlhadmZTYjRCbjJYUTc1MG9IOWFpMDhobVYxSUczTVFTdEhZZ1FueUswcU1VckZVSHJtamY5SDhVSVR6RWFoNWdFd3hmUGNNZHR2cTVGc2l5UkhkRHBkSV9OREFNeGlxLWpEUmxUNmtDVWtST2J0SWxWNjl1Q2NURWkzaV9SSzFKTm9RIn19LCJpc3MiOiJiZXRhLXJscy1icC1idWRkeS01ZDIwIiwic3ViIjoiYmV0YS1ybHMtYnAtYnVkZHktNWQyMCIsImF1ZCI6Imh0dHBzOi8vcmxzLmJldGEtZXhjaGFuZ2UuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyNTE4MSwianRpIjoiNzUwNjAzOGYtZjYzMC00NDQ3LTkwZWMtODJjYzc1ODIxZTY3In0.gi_aAnE45iRUd3fBWYpIx9UCmRDu5wKCtPdy_Ha6Oh35FAnkwtnmPVNryNMEDBwrYuRWKHTCwSY5uxm69HUKOx1obkqU45hSNgEDSXb3E4VeTqr64KQLWWwvhbLzsi3l9g3C3yEU9HO7WTCm8ypbgBQYYKS5PGPZbSjlWQwQ2QOL7R28FjEw0LA9dtvPGuSvs8FDTuOGZB8G9GXatPuhkfyJKtOcWvDDnlLfddd0rEZZJYojkJmJjvwjUUDdnDEJn1y633E8CzKzM_08m5W8ltWeb0w-bCVnZcBpCCqyFhJzXi-dK-auiSdxJp2MYFluVg2Gwi9XNbwsinXG9d0Eow
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "ZEmTzHnM8NIMGeu04ACckrbxWG_7zhJO3n_va1SvVV0",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlRQWEFxV3g1eTNxTGhGVVRZR2RIa2gzRkUtX3p4R192Y2d1N3BESmp3S2ciLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNDgyMSwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImI1NGQ2YzAyLTgwZWEtNDUxZi1iMDkyLTI3OGZkZDg2MTNlZiIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyNDgyMSwiZXhwIjoxNzgxMjI1MTIxLCJqdGkiOiI2MzM5YWQyNS03NDMwLTRjMDQtODExZS05MzRiMzEzYWIwMGIifQ.ESnJpmKfm232jT2hdgWcRqrt3dEwHPFDyrHMBTi2NsQdOisevWxb8PxVM10kXZqR8Xgg2siJofdPa6AaS809Fb4Y56I2cOvSIsHuaAnFof-EXP5bsFfZj2y9j2bKrFZJ9ChHU3UoN-udzPsiKx34rGkHY3IlvarGb0gd4T34iiorYxdnpk7dHwebqHx25bWo2SefcBLdP5liEiRz-kNXZvfSb4Bn2XQ750oH9ai08hmV1IG3MQStHYgQnyK0qMUrFUHrmjf9H8UITzEah5gEwxfPcMdtvq5FsiyRHdDpdI_NDAMxiq-jDRlT6kCUkRObtIlV69uCcTEi3i_RK1JNoQ"
    }
  },
  "iss": "beta-rls-bp-buddy-5d20",
  "sub": "beta-rls-bp-buddy-5d20",
  "aud": "https://rls.beta-exchange.example/oauth/token",
  "exp": 1781225181,
  "jti": "7506038f-f630-4447-90ec-82cc75821e67"
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
  "access_token": "CWIeyqMmg5JLJswXB8UE9hUVQxw-cDj5",
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
Authorization: Bearer CWIeyqMmg5JLJswXB8UE9hUVQxw-cDj5
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

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*