# client_credentials + $rls: the app-asserted grant at a network

*Worked example for [the record location and data access write-up](../authorizing-access.md). Maria authenticated at her IAL2 CSP moments ago; her id_token travels inside the cms_smart extension of the client_assertion, following the Blue Button CMS Aligned Networks pattern. The access token comes back bound to her, so $rls can only locate her records.*

**CSP-issued IAL2 id_token (ID.me-style claims)** (compact JWS, really signed):

```
eyJhbGciOiJSUzI1NiIsImtpZCI6InNyYTY3dkEyLURyUUxfUF9nRVByQUp3TGtLaDA5RE1VTkJ3YzJDNlA3c28iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNTIzMCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImI3YWRlODFmLTZkZTEtNDExZS04NjM0LWIxOTk5NjdlZmQzZCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyNTIzMCwiZXhwIjoxNzgxMjI1NTMwLCJqdGkiOiIxMWZiMmYxNS1jOGU3LTRmZjgtYTYzNS1mZWZmNGNkYzUwMjEifQ.qk42yXvhAfJakTwLppstQsY-JEnz99k6GmQoGPeO-59zfrsqWYlZ6k7nFPRRKzBRn1N81AEx4MGkg3zBx9p9Y5KzUbM39VZJYPCBXaBS17aT_t8O5lD2uUra6hFAjvuXU0uXWcSGhQy7X1PtZQ7RmeRUUjRIkY6EF0RrZ-I2P5KIaCQP4uPF1PIxd-gfD_Zef0gETnVB-E9PfrRTmjVBavHLvabj6FLEkWPfhWKLXc8v7SfytFweHInKnSPVymVqRJaeg9v5T-lBqJgT9NMCj0PIiEJhz3nvZ_Lw2DXXBkokr1Kb33-zOTWOeExDptTuwiBgy9q0WRyXxQNtTRT1dw
```

Decoded header:

```json
{
  "alg": "RS256",
  "kid": "sra67vA2-DrQL_P_gEPrAJwLkKh09DMUNBwc2C6P7so",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "identity_assurance_level": 2,
  "auth_time": 1781225230,
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
  "sub": "b7ade81f-6de1-411e-8634-b199967efd3d",
  "aud": "https://library.medicare.gov/app-library/apps/bp-buddy",
  "iat": 1781225230,
  "exp": 1781225530,
  "jti": "11fb2f15-c8e7-4ff8-a635-feff4cdc5021"
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
  "client_assertion": "eyJhbGciOiJSUzM4NCIsImtpZCI6ImQ3LVpSOVlWeHljZXlibUZtTGQybmVO... (decoded below)"
}
```

---

**client_assertion — note extensions.cms_smart carrying the full id_token** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6ImQ3LVpSOVlWeHljZXlibUZtTGQybmVOVnVzb1dtS3JTNGFtNVpnSjBhZG8iLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5OeVlUWTNka0V5TFVSeVVVeGZVRjluUlZCeVFVcDNUR3RMYURBNVJFMVZUa0ozWXpKRE5sQTNjMjhpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlOVEl6TUN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SW1JM1lXUmxPREZtTFRaa1pURXROREV4WlMwNE5qTTBMV0l4T1RrNU5qZGxabVF6WkNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlOVEl6TUN3aVpYaHdJam94TnpneE1qSTFOVE13TENKcWRHa2lPaUl4TVdaaU1tWXhOUzFqT0dVM0xUUm1aamd0WVRZek5TMW1aV1ptTkdOa1l6VXdNakVpZlEucWs0MnlYdmhBZkpha1R3THBwc3RRc1ktSkVuejk5azZHbVFvR1BlTy01OXpmcnNxV1lsWjZrN25GUFJSS3pCUm4xTjgxQUV4NE1Ha2czekJ4OXA5WTVLelViTTM5VlpKWVBDQlhhQlMxN2FUX3Q4TzVsRDJ1VXJhNmhGQWp2dVhVMHVYV2NTR2hReTdYMVB0WlE3Um1lUlVValJJa1k2RUYwUnJaLUkyUDVLSWFDUVA0dVBGMVBJeGQtZ2ZEX1plZjBnRVRuVkItRTlQZnJSVG1qVkJhdkhMdmFiajZGTEVrV1BmaFdLTFhjOHY3U2Z5dEZ3ZUhJbktuU1BWeW1WcVJKYWVnOXY1VC1sQnFKZ1Q5Tk1DajBQSWlFSmh6M252Wl9MdzJEWFhCa29rcjFLYjMzLXpPVFdPZUV4RHB0VHV3aUJneTlxMFdSeVh4UU50VFJUMWR3In19LCJpc3MiOiJiZXRhLXJscy1icC1idWRkeS01ZDIwIiwic3ViIjoiYmV0YS1ybHMtYnAtYnVkZHktNWQyMCIsImF1ZCI6Imh0dHBzOi8vcmxzLmJldGEtZXhjaGFuZ2UuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyNTU5MCwianRpIjoiNTNmNjM0NDItYWZhZS00OGQ5LWEyZWQtZDk2M2YyZmY2YWQ4In0.Ev0vSaFIYaaamwu2SCtxknuVZfHY39-RDxKbaUcIfzJMXvzuXUrpVXfMAEnBodmAqx7V8XJvS7jXNNdgmlKNfDl6-hAS9aGfJ70rmgKcivcdwqVUU342yLjIgz-PkGOV8uk28YF3lE2L_xXB5iqpEk6olQOzu9gx8NCLQO9T6T8YzwXeDax1OS9_Ovvp0y5dDIq-0OnYdGW9cx8uhdyHLZX94Iw5BLNDLkupO7UvclK45CoVfgisJQwkG-SiMnBGROerlUQslK0t4cORh6oShKzOShY8meD1-9x-9V1S1ewYCy53aToyaYOoZ_-Cc7Bvq7C6lYti5sE-_ScQwPxu8w
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "d7-ZR9YVxyceybmFmLd2neNVusoWmKrS4am5ZgJ0ado",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InNyYTY3dkEyLURyUUxfUF9nRVByQUp3TGtLaDA5RE1VTkJ3YzJDNlA3c28iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNTIzMCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImI3YWRlODFmLTZkZTEtNDExZS04NjM0LWIxOTk5NjdlZmQzZCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyNTIzMCwiZXhwIjoxNzgxMjI1NTMwLCJqdGkiOiIxMWZiMmYxNS1jOGU3LTRmZjgtYTYzNS1mZWZmNGNkYzUwMjEifQ.qk42yXvhAfJakTwLppstQsY-JEnz99k6GmQoGPeO-59zfrsqWYlZ6k7nFPRRKzBRn1N81AEx4MGkg3zBx9p9Y5KzUbM39VZJYPCBXaBS17aT_t8O5lD2uUra6hFAjvuXU0uXWcSGhQy7X1PtZQ7RmeRUUjRIkY6EF0RrZ-I2P5KIaCQP4uPF1PIxd-gfD_Zef0gETnVB-E9PfrRTmjVBavHLvabj6FLEkWPfhWKLXc8v7SfytFweHInKnSPVymVqRJaeg9v5T-lBqJgT9NMCj0PIiEJhz3nvZ_Lw2DXXBkokr1Kb33-zOTWOeExDptTuwiBgy9q0WRyXxQNtTRT1dw"
    }
  },
  "iss": "beta-rls-bp-buddy-5d20",
  "sub": "beta-rls-bp-buddy-5d20",
  "aud": "https://rls.beta-exchange.example/oauth/token",
  "exp": 1781225590,
  "jti": "53f63442-afae-48d9-a2ed-d963f2ff6ad8"
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
  "access_token": "Fi8_HIS9ykzAd5r8L4JcHkZO4Pjhv-89",
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
Authorization: Bearer Fi8_HIS9ykzAd5r8L4JcHkZO4Pjhv-89
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

*Generated 2026-06-12T00:48:10.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*