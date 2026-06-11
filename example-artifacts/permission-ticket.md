# A signed permission ticket and its redemption

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The patient authorizes once at a shared authorization service via a SMART App Launch code flow; the token response carries per-site tickets like this one plus endpoint hints (see issuance-token-response). The app redeems the ticket at each data holder's token endpoint via RFC 8693; the data holder verifies the ticket, independently verifies the embedded identity evidence, matches the patient locally, and issues its own token with the matched id.*

**Permission ticket — note subject demographics, the embedded IAL2 id_token as subject_identity_evidence, and the presenter binding to the app's key** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImprRFlhdWlMNy14dlppRFdZMGw4WDl3RTNLOEU1dXBycHdKWFJ6Z09mb0EiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWs1Q2JXbDJTbmhoTTA5VlVFSmhjVTFPVFRGNFFWSkhWRzEyVTBablRtMVdSRXRIZVhSeVowcEtOMnNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNVEV3Tml3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWVdKbFpHTmxaall0WWpObE9DMDBNRGhtTFRnek56a3RObVUwTjJNeVpqRTBZV0U1SWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSXhNVEEyTENKbGVIQWlPakUzT0RFeU1qRTBNRFlzSW1wMGFTSTZJak5rTUdJeU1XUXlMVGN3TmpFdE5HTm1PQzA0TXpObExUWmxPR1kzWmpBeE1tUmxNQ0o5LlJMb2dyeEpLSy01dUhEUmp1V3NGZ1daX1g3d0lNMDlGMXRBbzIyYUVoM2V3MmZfdkI4aDRqUlRmanVMN3BzeTNNLWIzYkJlaFZSS0U2Y1RwYmxpYVotSmNER0kyLXk2NFhReHBCWnF2MjQ2WUYyamJfcXZQMEFvcmtHZU9XLWdBNDFPVFkyNnpLNlJKMGNpTk8tdzVCZ2Njand3MS10Nlh3Q2Nob2tQUlZmaGs1Rk9hbTB3UzJUb0cxMEhRSTBoRDJvYXgycnZ4WnRpWmxqQ1hjbUpiZk9SMFdoblJWb1NsUldCb2M5M0MtM3REeU5rc3lyYm1jNGxOeTZDbWJoRGhmNC1yNXhHZTN1YkxycGFESGtCYUY4TXNydThjMllTU3pkMWVJZ1hhTEpIVHhfV29rZFNGckRDNTZ2RS1zdmVoSEZZNnpsMi1fa0Rya0lnRFdYOXRXdyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IkJfdS1uRHAwbHBXSWI1bTZkT3pNVG5naUMwMzZ1UUpYa0g3OXNLc19OMHcifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiTGFrZXNpZGUgQ2xpbmljIn1dfSwiaXNzIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL2ZoaXIiLCJpYXQiOjE3ODEyMjExMzYsImV4cCI6MTc4MTIyNDczNiwianRpIjoiMDliMGI2MzMtMjYwNi00M2M4LTgyOGQtYmM1ZDUzOTE0YTBhIn0.C8mAwlk36wZhUMiVG-Tw8JyVAtitk41xkdED7jIk_t5m_B43q8LjxTU9_pQIQPL0qQKqBeApyQXjDOCPSU0EOg
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "jkDYauiL7-xvZiDWY0l8X9wE3K8E5uprpwJXRzgOfoA",
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
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ik5CbWl2SnhhM09VUEJhcU1OTTF4QVJHVG12U0ZnTm1WREtHeXRyZ0pKN2siLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMTEwNiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiYWJlZGNlZjYtYjNlOC00MDhmLTgzNzktNmU0N2MyZjE0YWE5IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjIxMTA2LCJleHAiOjE3ODEyMjE0MDYsImp0aSI6IjNkMGIyMWQyLTcwNjEtNGNmOC04MzNlLTZlOGY3ZjAxMmRlMCJ9.RLogrxJKK-5uHDRjuWsFgWZ_X7wIM09F1tAo22aEh3ew2f_vB8h4jRTfjuL7psy3M-b3bBehVRKE6cTpbliaZ-JcDGI2-y64XQxpBZqv246YF2jb_qvP0AorkGeOW-gA41OTY26zK6RJ0ciNO-w5Bgccjww1-t6XwCchokPRVfhk5FOam0wS2ToG10HQI0hD2oax2rvxZtiZljCXcmJbfOR0WhnRVoSlRWBoc93C-3tDyNksyrbmc4lNy6CmbhDhf4-r5xGe3ubLrpaDHkBaF8Msru8c2YSSzd1eIgXaLJHTx_WokdSFrDC56vE-svehHFY6zl2-_kDrkIgDWX9tWw",
  "presenter_binding": {
    "jkt": "B_u-nDp0lpWIb5m6dOzMTngiC036uQJXkH79sKs_N0w"
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
  "iat": 1781221136,
  "exp": 1781224736,
  "jti": "09b0b633-2606-43c8-828d-bc5d53914a0a"
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
  "subject_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImprRFlhdWlMNy14dlppRFdZMGw4WDl3... (full value above)",
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

*Generated 2026-06-11T23:38:56.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*