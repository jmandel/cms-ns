# A signed permission ticket and its redemption

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The patient authorizes once at a shared authorization service via a SMART App Launch code flow; the token response carries per-site tickets like this one plus endpoint hints (see issuance-token-response). The app redeems the ticket at each data holder's token endpoint via RFC 8693; the data holder verifies the ticket, independently verifies the embedded identity evidence, matches the patient locally, and issues its own token with the matched id.*

**Permission ticket — note subject demographics, the embedded IAL2 id_token as subject_identity_evidence, and the presenter binding to the app's key** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6IlRFTEJFY2ZTNGpCX01fUlFQLWFMTHhCQW9Cd2ZINUdYVkw1LVpmMW1ka0UiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW10V00wMVdOMGQ1WjNwWVNuWmZTM281ZUZsamNHOW1VbVpxU1dwQlNYaHdRbDlsUVhsTVN6UmtSRFFpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhPREkwTWl3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pT0dWbVl6QTVNRGd0T1RWbU1DMDBOREJrTFdGbU1UZ3ROV1UwT0dRNE1tTmhOekE0SWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qRTRNalF5TENKbGVIQWlPakUzT0RFeU1UZzFORElzSW1wMGFTSTZJak13TnpBNU1qUmtMV1U0TkdRdE5HTmpZeTFpTmpRMExXTTJPRFUyTURrelpqZ3pOU0o5LnFFTndQaW9UVkRKY2l5cU9aZTQ0Z05yQW5ydjdyTVNfdEdNS2ltbVlXcEJ0cF9MTUNQSFBfaEFhb1EtSUlqYmpMc1Zzb1RldUxLSzJnWG9qSWxxbTVubWxuRnFVamc1eVJhZDc2WVoxTFcxaW9xLXktakpleGRXS2pueVh5R0ctS2J0Tm5mYWNHY01TOFJNWEVib2JiN212blo3UUVGNHRyaUs2NFN1bGJnMWN5UFNUSzdGS0xsR1BXTG5saHFPZkFwRXpHSzRkOEJCY0JneDQ1VThEZVpoNFhWNGNNcmxLVi1nbnNneHdYeDRGRDBrVlpkalRFTEttTm5MYTFrTDgtVVR1RTI1ZDJHQ3RnUW0tN1BsZTFtMHYwaUZ5Zlh0dXZnREdfaXRZc0diZHpRRkdmVVpUbEhYRExQcGVjMlFtSHphMFcySTFSSVgxdE9nNHhuWU1kZyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IjZ5WHEtdnhWSFgtcEttdEJOd09mQlN3eWNVSFBaTEhvdHlHWUZ3SVVBVHMifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiTGFrZXNpZGUgQ2xpbmljIn1dfSwiaXNzIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL2ZoaXIiLCJpYXQiOjE3ODEyMTgyNzIsImV4cCI6MTc4MTIyMTg3MiwianRpIjoiYTVjODRlOTQtMTVlYi00MWU1LWI4NTMtMGFlOWIzZjFjZjAwIn0.n05PMzIuT_LtNETIqkXho6r-MhtQ5Nr_SrWZXa0YGtU-P8WK48Kb6oGxuhK_p7RNUFYmUxYV-YACIMp29iCqQQ
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "TELBEcfS4jB_M_RQP-aLLxBAoBwfH5GXVL5-Zf1mdkE",
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
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImtWM01WN0d5Z3pYSnZfS3o5eFljcG9mUmZqSWpBSXhwQl9lQXlMSzRkRDQiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxODI0MiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiOGVmYzA5MDgtOTVmMC00NDBkLWFmMTgtNWU0OGQ4MmNhNzA4IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjE4MjQyLCJleHAiOjE3ODEyMTg1NDIsImp0aSI6IjMwNzA5MjRkLWU4NGQtNGNjYy1iNjQ0LWM2ODU2MDkzZjgzNSJ9.qENwPioTVDJciyqOZe44gNrAnrv7rMS_tGMKimmYWpBtp_LMCPHP_hAaoQ-IIjbjLsVsoTeuLKK2gXojIlqm5nmlnFqUjg5yRad76YZ1LW1ioq-y-jJexdWKjnyXyGG-KbtNnfacGcMS8RMXEbobb7mvnZ7QEF4triK64Sulbg1cyPSTK7FKLlGPWLnlhqOfApEzGK4d8BBcBgx45U8DeZh4XV4cMrlKV-gnsgxwXx4FD0kVZdjTELKmNnLa1kL8-UTuE25d2GCtgQm-7Ple1m0v0iFyfXtuvgDG_itYsGbdzQFGfUZTlHXDLPpec2QmHza0W2I1RIX1tOg4xnYMdg",
  "presenter_binding": {
    "jkt": "6yXq-vxVHX-pKmtBNwOfBSwycUHPZLHotyGYFwIUATs"
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
  "iat": 1781218272,
  "exp": 1781221872,
  "jti": "a5c84e94-15eb-41e5-b853-0ae9b3f1cf00"
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
  "subject_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6IlRFTEJFY2ZTNGpCX01fUlFQLWFMTHhC... (full value above)",
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

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*