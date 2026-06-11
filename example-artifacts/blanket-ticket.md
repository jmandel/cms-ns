# A blanket ticket: every match disclosed

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). If Maria chooses every site (or the deployment does in-app selection), the token response carries a single ticket with no data_holder_filter, and endpoint hints for every match. The app learns every care relationship; this is the disclosure that service-side selection avoids.*

**Blanket ticket: no data_holder_filter** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6IlRFTEJFY2ZTNGpCX01fUlFQLWFMTHhCQW9Cd2ZINUdYVkw1LVpmMW1ka0UiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW10V00wMVdOMGQ1WjNwWVNuWmZTM281ZUZsamNHOW1VbVpxU1dwQlNYaHdRbDlsUVhsTVN6UmtSRFFpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhPREkwTWl3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pT0dWbVl6QTVNRGd0T1RWbU1DMDBOREJrTFdGbU1UZ3ROV1UwT0dRNE1tTmhOekE0SWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qRTRNalF5TENKbGVIQWlPakUzT0RFeU1UZzFORElzSW1wMGFTSTZJak13TnpBNU1qUmtMV1U0TkdRdE5HTmpZeTFpTmpRMExXTTJPRFUyTURrelpqZ3pOU0o5LnFFTndQaW9UVkRKY2l5cU9aZTQ0Z05yQW5ydjdyTVNfdEdNS2ltbVlXcEJ0cF9MTUNQSFBfaEFhb1EtSUlqYmpMc1Zzb1RldUxLSzJnWG9qSWxxbTVubWxuRnFVamc1eVJhZDc2WVoxTFcxaW9xLXktakpleGRXS2pueVh5R0ctS2J0Tm5mYWNHY01TOFJNWEVib2JiN212blo3UUVGNHRyaUs2NFN1bGJnMWN5UFNUSzdGS0xsR1BXTG5saHFPZkFwRXpHSzRkOEJCY0JneDQ1VThEZVpoNFhWNGNNcmxLVi1nbnNneHdYeDRGRDBrVlpkalRFTEttTm5MYTFrTDgtVVR1RTI1ZDJHQ3RnUW0tN1BsZTFtMHYwaUZ5Zlh0dXZnREdfaXRZc0diZHpRRkdmVVpUbEhYRExQcGVjMlFtSHphMFcySTFSSVgxdE9nNHhuWU1kZyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IjZ5WHEtdnhWSFgtcEttdEJOd09mQlN3eWNVSFBaTEhvdHlHWUZ3SVVBVHMifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV19LCJpc3MiOiJodHRwczovL2lzc3Vlci5iZXRhLWV4Y2hhbmdlLmV4YW1wbGUiLCJhdWQiOiJodHRwczovL2JldGEtZXhjaGFuZ2UuZXhhbXBsZS9kYXRhLWhvbGRlcnMiLCJpYXQiOjE3ODEyMTgyNzIsImV4cCI6MTc4MTIyMTg3MiwianRpIjoiMWRmMzgwZjMtZjM3MS00MDcyLTg2NjItMTVjMmMyYmI0NWI2In0.jVm8xxjSMZQuYeA3q8e7RLiwKVHnBMTysFIs16BEvlsOm3-PQgxIPaIqdqaGuPRMCNccSH6ncFtt9uUyn5rYCQ
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
    ]
  },
  "iss": "https://issuer.beta-exchange.example",
  "aud": "https://beta-exchange.example/data-holders",
  "iat": 1781218272,
  "exp": 1781221872,
  "jti": "1df380f3-f371-4072-8662-15c2c2bb45b6"
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

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*