# A signed permission ticket and its redemption

*Worked example for [the record location and data access write-up](../authorizing-access.md). The patient authorizes once at a shared authorization service via a SMART App Launch code flow; the token response carries per-site tickets like this one plus endpoint hints (see issuance-token-response). The app redeems the ticket at each data holder's token endpoint via RFC 8693; the data holder verifies the ticket, independently verifies the embedded identity evidence, matches the patient locally, and issues its own token with the matched id.*

**Permission ticket — note subject demographics, the embedded IAL2 id_token as subject_identity_evidence, and the presenter binding to the app's key** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImE5WnJxeEpQWEdjcnhqN2E3SVdXMGlwR2xINUNmSjFRWjBZYVNnVERUNmMiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxSUVdFRnhWM2cxZVROeFRHaEdWVlJaUjJSSWEyZ3pSa1V0WDNwNFIxOTJZMmQxTjNCRVNtcDNTMmNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlORGcxTVN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWXpSbU9XVTNNMll0WkRJeFpTMDBObVJpTFdJM05tVXRZbUZtWTJNek0yUXdaVFExSWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSTBPRFV4TENKbGVIQWlPakUzT0RFeU1qVXhOVEVzSW1wMGFTSTZJakkzWkRBek9UYzVMV1k0WVdRdE5HSTNaUzA1TUdNM0xUQTNNREU1T0RVeE9UaGxaaUo5LnFWc1BBNUs2TnRDM19Zc2xZTldwM3d1UHF3QmNaYzFfWUwwVnlwTVZzM3U5TjlGbFYxMkN2cExiVjN1dzBkYU55YUQ1MHZ0dlB3ZWFudy0tUjBub1ItdGJGalhWNUxmSXkwaVVfSXRmZkwtbko1UFIyNXU4TS1YRkhNX2kxcTBXa3NQT2RCamhlaHBUQk1uQ1lFUE1HbFVUT3VNNFp2OVQwdzNmWTJqTzN6TzVPbThvYkVPNHpGeVcwUFNsM0QtU2R1cTZvdVdoaW5LY2FyMW42MzhORHhBYk1WWEpDdy1DcjNyY1YxWkVVU3M5dy1WTGRYdjY3ODR4OHozLUVmc2ZmbjRKaHRJckVyV1lVeEJoUXVMTGZDSXlYcmdEc3I5bU8wczNNMy02S1VINzFsc0N0MzdYR3dOX0JrRXh0YnFYMzhLa0lfd3JUU1VNUm9rLUQ4djUxdyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IlpFbVR6SG5NOE5JTUdldTA0QUNja3JieFdHXzd6aEpPM25fdmExU3ZWVjAifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiTGFrZXNpZGUgQ2xpbmljIn1dfSwiaXNzIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL2ZoaXIiLCJpYXQiOjE3ODEyMjQ4ODEsImV4cCI6MTc4MTIyODQ4MSwianRpIjoiZjFkNDRhNmYtNjQ5NC00NDJlLTk0NjEtMGVhZjhjZTY2ZTc3In0.yxMNvFuVwtQ2MKkIpHe3Jj9x07dYh7Fthj3Soys8YSR3gCavvbPYQX4N5WQxayqDlJpqj3YYohy7Le0j6MODcQ
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "a9ZrqxJPXGcrxj7a7IWW0ipGlH5CfJ1QZ0YaSgTDT6c",
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
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlRQWEFxV3g1eTNxTGhGVVRZR2RIa2gzRkUtX3p4R192Y2d1N3BESmp3S2ciLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNDg1MSwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiYzRmOWU3M2YtZDIxZS00NmRiLWI3NmUtYmFmY2MzM2QwZTQ1IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjI0ODUxLCJleHAiOjE3ODEyMjUxNTEsImp0aSI6IjI3ZDAzOTc5LWY4YWQtNGI3ZS05MGM3LTA3MDE5ODUxOThlZiJ9.qVsPA5K6NtC3_YslYNWp3wuPqwBcZc1_YL0VypMVs3u9N9FlV12CvpLbV3uw0daNyaD50vtvPweanw--R0noR-tbFjXV5LfIy0iU_ItffL-nJ5PR25u8M-XFHM_i1q0WksPOdBjhehpTBMnCYEPMGlUTOuM4Zv9T0w3fY2jO3zO5Om8obEO4zFyW0PSl3D-Sduq6ouWhinKcar1n638NDxAbMVXJCw-Cr3rcV1ZEUSs9w-VLdXv6784x8z3-Efsffn4JhtIrErWYUxBhQuLLfCIyXrgDsr9mO0s3M3-6KUH71lsCt37XGwN_BkExtbqX38KkI_wrTSUMRok-D8v51w",
  "presenter_binding": {
    "jkt": "ZEmTzHnM8NIMGeu04ACckrbxWG_7zhJO3n_va1SvVV0"
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
  "iat": 1781224881,
  "exp": 1781228481,
  "jti": "f1d44a6f-6494-442e-9461-0eaf8ce66e77"
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
  "subject_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImE5WnJxeEpQWEdjcnhqN2E3SVdXMGlw... (full value above)",
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

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*