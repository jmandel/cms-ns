# The authorization step's token response

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). What BP Buddy receives when Maria finishes the authorization step at the shared authorization service: a standard SMART token response extended with per-site permission tickets and endpoint hints. Maria chose two sites; sites she left out appear nowhere.*

**Token response — authorization code exchanged at the service's token endpoint**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "RKnoWF5oXXjtMVtXitwxQCtndCEaUqAu",
  "token_type": "Bearer",
  "expires_in": 300,
  "refresh_token": "Al8m56VG8Jrq1gXaSFLraVz2thkIotdY",
  "scope": "permission_ticket patient/Observation.rs offline_access",
  "smart_permission_ticket": [
    "eyJhbGciOiJFUzI1NiIsImtpZCI6IlRFTEJFY2ZTNGpCX01fUl... (ticket 0, decoded below)",
    "eyJhbGciOiJFUzI1NiIsImtpZCI6IlRFTEJFY2ZTNGpCX01fUl... (ticket 1, decoded below)"
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

---

**Ticket 1 — scoped to County Health** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6IlRFTEJFY2ZTNGpCX01fUlFQLWFMTHhCQW9Cd2ZINUdYVkw1LVpmMW1ka0UiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW10V00wMVdOMGQ1WjNwWVNuWmZTM281ZUZsamNHOW1VbVpxU1dwQlNYaHdRbDlsUVhsTVN6UmtSRFFpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhPREkwTWl3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pT0dWbVl6QTVNRGd0T1RWbU1DMDBOREJrTFdGbU1UZ3ROV1UwT0dRNE1tTmhOekE0SWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qRTRNalF5TENKbGVIQWlPakUzT0RFeU1UZzFORElzSW1wMGFTSTZJak13TnpBNU1qUmtMV1U0TkdRdE5HTmpZeTFpTmpRMExXTTJPRFUyTURrelpqZ3pOU0o5LnFFTndQaW9UVkRKY2l5cU9aZTQ0Z05yQW5ydjdyTVNfdEdNS2ltbVlXcEJ0cF9MTUNQSFBfaEFhb1EtSUlqYmpMc1Zzb1RldUxLSzJnWG9qSWxxbTVubWxuRnFVamc1eVJhZDc2WVoxTFcxaW9xLXktakpleGRXS2pueVh5R0ctS2J0Tm5mYWNHY01TOFJNWEVib2JiN212blo3UUVGNHRyaUs2NFN1bGJnMWN5UFNUSzdGS0xsR1BXTG5saHFPZkFwRXpHSzRkOEJCY0JneDQ1VThEZVpoNFhWNGNNcmxLVi1nbnNneHdYeDRGRDBrVlpkalRFTEttTm5MYTFrTDgtVVR1RTI1ZDJHQ3RnUW0tN1BsZTFtMHYwaUZ5Zlh0dXZnREdfaXRZc0diZHpRRkdmVVpUbEhYRExQcGVjMlFtSHphMFcySTFSSVgxdE9nNHhuWU1kZyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IjZ5WHEtdnhWSFgtcEttdEJOd09mQlN3eWNVSFBaTEhvdHlHWUZ3SVVBVHMifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiQ291bnR5IEhlYWx0aCJ9XX0sImlzcyI6Imh0dHBzOi8vaXNzdWVyLmJldGEtZXhjaGFuZ2UuZXhhbXBsZSIsImF1ZCI6Imh0dHBzOi8vZmhpci5jb3VudHloZWFsdGguZXhhbXBsZS9yNCIsImlhdCI6MTc4MTIxODI3MiwiZXhwIjoxNzgxMjIxODcyLCJqdGkiOiI4MjA0NzE1OS02NzdiLTQ3ZTUtYTZkOS0wYzZmMWY0NWI4NTYifQ.lNe3GMhV6BJVz_-EVR0nCDTOvsujVgQUP7cR09YZbTahtFndcRjxfbKTpFrBIs7pHGuSnZKX_xamRZKKUuakLQ
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
        "organization": "County Health"
      }
    ]
  },
  "iss": "https://issuer.beta-exchange.example",
  "aud": "https://fhir.countyhealth.example/r4",
  "iat": 1781218272,
  "exp": 1781221872,
  "jti": "82047159-677b-47e5-a6d9-0c6f1f45b856"
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

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*