# A blanket ticket: every match disclosed

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). If Maria chooses every site (or the deployment does in-app selection), the token response carries a single ticket with no data_holder_filter, and endpoint hints for every match. The app learns every care relationship; this is the disclosure that service-side selection avoids.*

**Blanket ticket: no data_holder_filter** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImprRFlhdWlMNy14dlppRFdZMGw4WDl3RTNLOEU1dXBycHdKWFJ6Z09mb0EiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWs1Q2JXbDJTbmhoTTA5VlVFSmhjVTFPVFRGNFFWSkhWRzEyVTBablRtMVdSRXRIZVhSeVowcEtOMnNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNVEV3Tml3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWVdKbFpHTmxaall0WWpObE9DMDBNRGhtTFRnek56a3RObVUwTjJNeVpqRTBZV0U1SWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSXhNVEEyTENKbGVIQWlPakUzT0RFeU1qRTBNRFlzSW1wMGFTSTZJak5rTUdJeU1XUXlMVGN3TmpFdE5HTm1PQzA0TXpObExUWmxPR1kzWmpBeE1tUmxNQ0o5LlJMb2dyeEpLSy01dUhEUmp1V3NGZ1daX1g3d0lNMDlGMXRBbzIyYUVoM2V3MmZfdkI4aDRqUlRmanVMN3BzeTNNLWIzYkJlaFZSS0U2Y1RwYmxpYVotSmNER0kyLXk2NFhReHBCWnF2MjQ2WUYyamJfcXZQMEFvcmtHZU9XLWdBNDFPVFkyNnpLNlJKMGNpTk8tdzVCZ2Njand3MS10Nlh3Q2Nob2tQUlZmaGs1Rk9hbTB3UzJUb0cxMEhRSTBoRDJvYXgycnZ4WnRpWmxqQ1hjbUpiZk9SMFdoblJWb1NsUldCb2M5M0MtM3REeU5rc3lyYm1jNGxOeTZDbWJoRGhmNC1yNXhHZTN1YkxycGFESGtCYUY4TXNydThjMllTU3pkMWVJZ1hhTEpIVHhfV29rZFNGckRDNTZ2RS1zdmVoSEZZNnpsMi1fa0Rya0lnRFdYOXRXdyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IkJfdS1uRHAwbHBXSWI1bTZkT3pNVG5naUMwMzZ1UUpYa0g3OXNLc19OMHcifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV19LCJpc3MiOiJodHRwczovL2lzc3Vlci5iZXRhLWV4Y2hhbmdlLmV4YW1wbGUiLCJhdWQiOiJodHRwczovL2JldGEtZXhjaGFuZ2UuZXhhbXBsZS9kYXRhLWhvbGRlcnMiLCJpYXQiOjE3ODEyMjExMzYsImV4cCI6MTc4MTIyNDczNiwianRpIjoiZjViNzAxN2QtMGIyYS00NjdhLTg1MDYtYTFiZTRlMmVkMThkIn0.lfbCTNKtDVcXDWpC-4v_ypX-WU7k_E6DIeiiAk0kdso87fbvTzoO8badSvdrZ31gX5ox67I4jDSMkf8TgnDlmg
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
    ]
  },
  "iss": "https://issuer.beta-exchange.example",
  "aud": "https://beta-exchange.example/data-holders",
  "iat": 1781221136,
  "exp": 1781224736,
  "jti": "f5b7017d-0b2a-467a-8506-a1be4e2ed18d"
}
```

---

**Endpoint hints accompanying it: every match, all pointing at ticket 0**

```http
HTTP/1.1 200 OK (excerpt)
```

```json
{
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
        0
      ]
    },
    {
      "fhir_base_url": "https://fhir.generalhospital.example/r4",
      "organization": {
        "resourceType": "Organization",
        "name": "General Hospital"
      },
      "ticket_indices": [
        0
      ]
    }
  ]
}
```

*Generated 2026-06-11T23:38:56.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*