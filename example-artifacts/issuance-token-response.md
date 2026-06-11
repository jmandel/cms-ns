# The authorization step's token response

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). What BP Buddy receives when Maria finishes the authorization step at the shared authorization service: a standard SMART token response extended with per-site permission tickets and endpoint hints. Maria chose two sites; sites she left out appear nowhere.*

**Token response — authorization code exchanged at the service's token endpoint**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "mWUp_mhtvZvZQTbbvGfcueRmVdIW_jhX",
  "token_type": "Bearer",
  "expires_in": 300,
  "refresh_token": "fGDT-c6_JtVmKZK9ZGOCOMSifmSKyTmm",
  "scope": "permission_ticket patient/Observation.rs offline_access",
  "smart_permission_ticket": [
    "eyJhbGciOiJFUzI1NiIsImtpZCI6ImprRFlhdWlMNy14dlppRF... (ticket 0, decoded below)",
    "eyJhbGciOiJFUzI1NiIsImtpZCI6ImprRFlhdWlMNy14dlppRF... (ticket 1, decoded below)"
  ],
  "smart_permission_ticket_endpoints": [
    {
      "fhir_base_url": "https://lakeside.example/fhir",
      "organization": {
        "resourceType": "Organization",
        "name": "Lakeside Clinic"
      },
      "ticket_indices": [
        0
      ]
    },
    {
      "fhir_base_url": "https://fhir.countyhealth.example/r4",
      "organization": {
        "resourceType": "Organization",
        "name": "County Health"
      },
      "ticket_indices": [
        1
      ]
    }
  ]
}
```

---

**Ticket 0 — scoped to Lakeside Clinic** (compact JWS, really signed):

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

---

**Ticket 1 — scoped to County Health** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImprRFlhdWlMNy14dlppRFdZMGw4WDl3RTNLOEU1dXBycHdKWFJ6Z09mb0EiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWs1Q2JXbDJTbmhoTTA5VlVFSmhjVTFPVFRGNFFWSkhWRzEyVTBablRtMVdSRXRIZVhSeVowcEtOMnNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNVEV3Tml3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWVdKbFpHTmxaall0WWpObE9DMDBNRGhtTFRnek56a3RObVUwTjJNeVpqRTBZV0U1SWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSXhNVEEyTENKbGVIQWlPakUzT0RFeU1qRTBNRFlzSW1wMGFTSTZJak5rTUdJeU1XUXlMVGN3TmpFdE5HTm1PQzA0TXpObExUWmxPR1kzWmpBeE1tUmxNQ0o5LlJMb2dyeEpLSy01dUhEUmp1V3NGZ1daX1g3d0lNMDlGMXRBbzIyYUVoM2V3MmZfdkI4aDRqUlRmanVMN3BzeTNNLWIzYkJlaFZSS0U2Y1RwYmxpYVotSmNER0kyLXk2NFhReHBCWnF2MjQ2WUYyamJfcXZQMEFvcmtHZU9XLWdBNDFPVFkyNnpLNlJKMGNpTk8tdzVCZ2Njand3MS10Nlh3Q2Nob2tQUlZmaGs1Rk9hbTB3UzJUb0cxMEhRSTBoRDJvYXgycnZ4WnRpWmxqQ1hjbUpiZk9SMFdoblJWb1NsUldCb2M5M0MtM3REeU5rc3lyYm1jNGxOeTZDbWJoRGhmNC1yNXhHZTN1YkxycGFESGtCYUY4TXNydThjMllTU3pkMWVJZ1hhTEpIVHhfV29rZFNGckRDNTZ2RS1zdmVoSEZZNnpsMi1fa0Rya0lnRFdYOXRXdyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IkJfdS1uRHAwbHBXSWI1bTZkT3pNVG5naUMwMzZ1UUpYa0g3OXNLc19OMHcifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiQ291bnR5IEhlYWx0aCJ9XX0sImlzcyI6Imh0dHBzOi8vaXNzdWVyLmJldGEtZXhjaGFuZ2UuZXhhbXBsZSIsImF1ZCI6Imh0dHBzOi8vZmhpci5jb3VudHloZWFsdGguZXhhbXBsZS9yNCIsImlhdCI6MTc4MTIyMTEzNiwiZXhwIjoxNzgxMjI0NzM2LCJqdGkiOiI3N2U5NDA3MS0xYThjLTRjN2YtYWE4ZC1kYmViM2JjMzYwNTIifQ.4lJO7m4isYVoTNi2OCtYOkFnXS6dnBa5W3LcmaMgSK5yHyILYbv1Orx5BYg_xMYZJWB8EM0s8ktElsCFvKeB9A
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
        "organization": "County Health"
      }
    ]
  },
  "iss": "https://issuer.beta-exchange.example",
  "aud": "https://fhir.countyhealth.example/r4",
  "iat": 1781221136,
  "exp": 1781224736,
  "jti": "77e94071-1a8c-4c7f-aa8d-dbeb3bc36052"
}
```

---

**Renewing tickets later: the refresh_token re-mints them without re-running the authorization step**

```http
POST https://issuer.beta-exchange.example/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
```

```json
{
  "grant_type": "refresh_token",
  "refresh_token": "(value from the response above)",
  "client_id": "sas-bp-buddy-3f81"
}
```

---

The refresh response has the same shape as the original: a fresh smart_permission_ticket array for the same site selection, with new expirations.

---

If Maria instead chooses every site in the network (the alternative at choice point ②), the response carries one blanket ticket with no data_holder_filter and endpoint hints for every match: see [blanket-ticket](blanket-ticket.md). Redeeming a per-site ticket at a data holder is shown in [permission-ticket](permission-ticket.md).

*Generated 2026-06-11T23:38:56.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*