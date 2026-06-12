# The authorization step's token response

*Worked example for [the record location and data access write-up](../authorizing-access.md). What BP Buddy receives when Maria finishes the authorization step at the shared authorization service: a standard SMART token response extended with per-site permission tickets and endpoint hints. Maria chose two sites; sites she left out appear nowhere.*

**Token response — authorization code exchanged at the service's token endpoint**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "w08hCu1d4KW_K4TUuGZOG6PZZlOqjYKd",
  "token_type": "Bearer",
  "expires_in": 300,
  "refresh_token": "L6ymmuI8r-jgCFLLJgRK76BMgE4u5Vnh",
  "scope": "permission_ticket patient/Observation.rs offline_access",
  "smart_permission_ticket": [
    "eyJhbGciOiJFUzI1NiIsImtpZCI6ImE5WnJxeEpQWEdjcnhqN2... (ticket 0, decoded below)",
    "eyJhbGciOiJFUzI1NiIsImtpZCI6ImE5WnJxeEpQWEdjcnhqN2... (ticket 1, decoded below)"
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

---

**Ticket 1 — scoped to County Health** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImE5WnJxeEpQWEdjcnhqN2E3SVdXMGlwR2xINUNmSjFRWjBZYVNnVERUNmMiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxSUVdFRnhWM2cxZVROeFRHaEdWVlJaUjJSSWEyZ3pSa1V0WDNwNFIxOTJZMmQxTjNCRVNtcDNTMmNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlORGcxTVN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWXpSbU9XVTNNMll0WkRJeFpTMDBObVJpTFdJM05tVXRZbUZtWTJNek0yUXdaVFExSWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSTBPRFV4TENKbGVIQWlPakUzT0RFeU1qVXhOVEVzSW1wMGFTSTZJakkzWkRBek9UYzVMV1k0WVdRdE5HSTNaUzA1TUdNM0xUQTNNREU1T0RVeE9UaGxaaUo5LnFWc1BBNUs2TnRDM19Zc2xZTldwM3d1UHF3QmNaYzFfWUwwVnlwTVZzM3U5TjlGbFYxMkN2cExiVjN1dzBkYU55YUQ1MHZ0dlB3ZWFudy0tUjBub1ItdGJGalhWNUxmSXkwaVVfSXRmZkwtbko1UFIyNXU4TS1YRkhNX2kxcTBXa3NQT2RCamhlaHBUQk1uQ1lFUE1HbFVUT3VNNFp2OVQwdzNmWTJqTzN6TzVPbThvYkVPNHpGeVcwUFNsM0QtU2R1cTZvdVdoaW5LY2FyMW42MzhORHhBYk1WWEpDdy1DcjNyY1YxWkVVU3M5dy1WTGRYdjY3ODR4OHozLUVmc2ZmbjRKaHRJckVyV1lVeEJoUXVMTGZDSXlYcmdEc3I5bU8wczNNMy02S1VINzFsc0N0MzdYR3dOX0JrRXh0YnFYMzhLa0lfd3JUU1VNUm9rLUQ4djUxdyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IlpFbVR6SG5NOE5JTUdldTA0QUNja3JieFdHXzd6aEpPM25fdmExU3ZWVjAifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiQ291bnR5IEhlYWx0aCJ9XX0sImlzcyI6Imh0dHBzOi8vaXNzdWVyLmJldGEtZXhjaGFuZ2UuZXhhbXBsZSIsImF1ZCI6Imh0dHBzOi8vZmhpci5jb3VudHloZWFsdGguZXhhbXBsZS9yNCIsImlhdCI6MTc4MTIyNDg4MSwiZXhwIjoxNzgxMjI4NDgxLCJqdGkiOiI3YTQxYjE5OS1kZWU4LTRiYTgtOTdmYS02MmNiNTk3YjkyMjMifQ.3hj0OxQzDfXn9Q9AtQ43plxX_ITIGFaiKAtP7_DZVXsP6sKxleehETZqRIJSwg3MXNvD2dW9zoVk9QJDTU2USQ
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
        "organization": "County Health"
      }
    ]
  },
  "iss": "https://issuer.beta-exchange.example",
  "aud": "https://fhir.countyhealth.example/r4",
  "iat": 1781224881,
  "exp": 1781228481,
  "jti": "7a41b199-dee8-4ba8-97fa-62cb597b9223"
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

If Maria instead chooses every site in the network (the alternative where the app sees every match), the response carries one blanket ticket with no data_holder_filter and endpoint hints for every match: see [blanket-ticket](blanket-ticket.md). Redeeming a per-site ticket at a data holder is shown in [permission-ticket](permission-ticket.md).

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*