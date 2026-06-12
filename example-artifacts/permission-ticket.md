# A signed permission ticket and its redemption

*Worked example for [the record location and data access write-up](../authorizing-access.md). The patient authorizes once at a shared authorization service via a SMART App Launch code flow; the token response carries per-site tickets like this one plus endpoint hints (see issuance-token-response). The app redeems the ticket at each data holder's token endpoint via RFC 8693; the data holder verifies the ticket, independently verifies the embedded identity evidence, matches the patient locally, and issues its own token with the matched id.*

**Permission ticket — note subject demographics, the embedded IAL2 id_token as subject_identity_evidence, and the presenter binding to the app's key** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImotcTVrOE5hZms0TEU5dUl1bE1HSXpUWGFuZjFxM3VRdTRXM293dm9DSE0iLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5OeVlUWTNka0V5TFVSeVVVeGZVRjluUlZCeVFVcDNUR3RMYURBNVJFMVZUa0ozWXpKRE5sQTNjMjhpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlOVEkyTUN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pTm1VNU1qQTVOVGt0T1dOaVpDMDBZekF5TFRnek56UXRZemd6TlRaaU9HUTFNalkySWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSTFNall3TENKbGVIQWlPakUzT0RFeU1qVTFOakFzSW1wMGFTSTZJbVkyT0Raa05HSmxMVE5pWlRNdE5HVmpNQzA1TkdRMUxUQXlZemhrWm1NMk56Z3dNeUo5LlNueHFJUEMtT0ozU3BnQjJFLU00ZDkyYnBHOERudUxsRTZlX1RxN1dDa3EyeUFFWEZGb0UwNUx1Y2dUNTBFbFRlWHlFbHRDb2hWcUNqbmZScjQzdjMzXzZJUFpFWDhBYjVwc01QUW93WkV1OHBKN1lsZjNmSVdCbndMQUtjU0g3U2dpZjFvN2JJQl84VWFBd2dFVU5GNm4xQ25fTkxKX0ZXdURseV9JSHByMGRkMVVaeDBXYjAyTlhzREw3YUZ2Mm4wZ3B6Y0d2VVlkX05CdU5XenpKVGhhbTdndzd0RkU0Z2Y4T1lKNF9ZcFQwTF9fRURNblVqdXczajVYQ2Vlc1drd3F0MnBZQy1PZVNxdEZoWW1wYmprMGtjRWRnWmRmdlZXd0VYRnMyOUxTMXZfNlh4Ul9NRGRjRE4wOXFYV3VkUHlmV0lqNWhrczk1UlFFWG1pd0FrZyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6ImQ3LVpSOVlWeHljZXlibUZtTGQybmVOVnVzb1dtS3JTNGFtNVpnSjBhZG8ifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiTGFrZXNpZGUgQ2xpbmljIn1dfSwiaXNzIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL2ZoaXIiLCJpYXQiOjE3ODEyMjUyOTAsImV4cCI6MTc4MTIyODg5MCwianRpIjoiZTlmMTBkZmUtNDRiYy00NjQ5LTljZTktMDQyYzhhYmZhODdlIn0.I-7dM6BxBTt9KtSX4_eaJaGDkWiuGnYDRRfuQg1Ha7iH7koDOljBd7QylVzEMhCDIpzOpJmzqSKalc4OKlii_w
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "j-q5k8Nafk4LE9uIulMGIzTXanf1q3uQu4W3owvoCHM",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "ticket_type": "patient-self-access-v1",
  "subject": {
    "patient": {
      "name": [
        {
          "family": "Lopez",
          "given": [
            "Maria"
          ]
        }
      ],
      "birthDate": "1962-03-15"
    }
  },
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6InNyYTY3dkEyLURyUUxfUF9nRVByQUp3TGtLaDA5RE1VTkJ3YzJDNlA3c28iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNTI2MCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiNmU5MjA5NTktOWNiZC00YzAyLTgzNzQtYzgzNTZiOGQ1MjY2IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjI1MjYwLCJleHAiOjE3ODEyMjU1NjAsImp0aSI6ImY2ODZkNGJlLTNiZTMtNGVjMC05NGQ1LTAyYzhkZmM2NzgwMyJ9.SnxqIPC-OJ3SpgB2E-M4d92bpG8DnuLlE6e_Tq7WCkq2yAEXFFoE05LucgT50ElTeXyEltCohVqCjnfRr43v33_6IPZEX8Ab5psMPQowZEu8pJ7Ylf3fIWBnwLAKcSH7Sgif1o7bIB_8UaAwgEUNF6n1Cn_NLJ_FWuDly_IHpr0dd1UZx0Wb02NXsDL7aFv2n0gpzcGvUYd_NBuNWzzJTham7gw7tFE4gf8OYJ4_YpT0L__EDMnUjuw3j5XCeesWkwqt2pYC-OeSqtFhYmpbjk0kcEdgZdfvVWwEXFs29LS1v_6XxR_MDdcDN09qXWudPyfWIj5hks95RQEXmiwAkg",
  "presenter_binding": {
    "jkt": "d7-ZR9YVxyceybmFmLd2neNVusoWmKrS4am5ZgJ0ado"
  },
  "access": {
    "permissions": [
      {
        "resource_type": "Observation",
        "interactions": [
          "read",
          "search"
        ]
      }
    ],
    "data_holder_filter": [
      {
        "organization": "Lakeside Clinic"
      }
    ]
  },
  "iss": "https://issuer.beta-exchange.example",
  "aud": "https://lakeside.example/fhir",
  "iat": 1781225290,
  "exp": 1781228890,
  "jti": "e9f10dfe-44bc-4649-9ce9-042c8abfa87e"
}
```

The `subject_identity_evidence` is a CSP-signed id_token whose `aud` names the ticket issuer: the issuer ran the CSP sign-in as relying party during the issuance ceremony. The data holder verifies the evidence's signature against the CSP's keys itself (evidence-issuer trust is configured separately from ticket-issuer trust) and resolves the evidence's client identifier to the ticket issuer. `presenter_binding.jkt` is the thumbprint of the app key in [keys-and-trust-anchors](keys-and-trust-anchors.md).

---

**Redemption — RFC 8693 token exchange at the data holder**

```http
POST https://lakeside.example/oauth/token HTTP/1.1
Host: lakeside.example
Content-Type: application/x-www-form-urlencoded
```

```json
{
  "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
  "subject_token_type": "https://smarthealthit.org/token-type/permission-ticket",
  "subject_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImotcTVrOE5hZms0TEU5dUl1bE1HSXpU... (full value above)",
  "scope": "patient/Observation.rs",
  "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
  "client_assertion": "(signed with the key named by presenter_binding.jkt)"
}
```

---

**Token response — the data holder's own token, with its matched patient id**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "(bearer token used below)",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "patient/Observation.rs",
  "patient": "lakeside-449210"
}
```

---

**FHIR query with that token**

```http
GET https://lakeside.example/fhir/Observation?patient=lakeside-449210&category=vital-signs&_count=1 HTTP/1.1
Authorization: Bearer (token from above)
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

*Generated 2026-06-12T00:48:10.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*