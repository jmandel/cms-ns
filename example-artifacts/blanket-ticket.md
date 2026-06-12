# A blanket ticket: every match disclosed

*Worked example for [the record location and data access write-up](../authorizing-access.md). If Maria chooses every site (or the deployment does in-app selection), the token response carries a single ticket with no data_holder_filter, and endpoint hints for every match. The app learns every care relationship; this is the disclosure that service-side selection avoids.*

**Blanket ticket: no data_holder_filter** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImE5WnJxeEpQWEdjcnhqN2E3SVdXMGlwR2xINUNmSjFRWjBZYVNnVERUNmMiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxSUVdFRnhWM2cxZVROeFRHaEdWVlJaUjJSSWEyZ3pSa1V0WDNwNFIxOTJZMmQxTjNCRVNtcDNTMmNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlORGcxTVN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWXpSbU9XVTNNMll0WkRJeFpTMDBObVJpTFdJM05tVXRZbUZtWTJNek0yUXdaVFExSWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSTBPRFV4TENKbGVIQWlPakUzT0RFeU1qVXhOVEVzSW1wMGFTSTZJakkzWkRBek9UYzVMV1k0WVdRdE5HSTNaUzA1TUdNM0xUQTNNREU1T0RVeE9UaGxaaUo5LnFWc1BBNUs2TnRDM19Zc2xZTldwM3d1UHF3QmNaYzFfWUwwVnlwTVZzM3U5TjlGbFYxMkN2cExiVjN1dzBkYU55YUQ1MHZ0dlB3ZWFudy0tUjBub1ItdGJGalhWNUxmSXkwaVVfSXRmZkwtbko1UFIyNXU4TS1YRkhNX2kxcTBXa3NQT2RCamhlaHBUQk1uQ1lFUE1HbFVUT3VNNFp2OVQwdzNmWTJqTzN6TzVPbThvYkVPNHpGeVcwUFNsM0QtU2R1cTZvdVdoaW5LY2FyMW42MzhORHhBYk1WWEpDdy1DcjNyY1YxWkVVU3M5dy1WTGRYdjY3ODR4OHozLUVmc2ZmbjRKaHRJckVyV1lVeEJoUXVMTGZDSXlYcmdEc3I5bU8wczNNMy02S1VINzFsc0N0MzdYR3dOX0JrRXh0YnFYMzhLa0lfd3JUU1VNUm9rLUQ4djUxdyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IlpFbVR6SG5NOE5JTUdldTA0QUNja3JieFdHXzd6aEpPM25fdmExU3ZWVjAifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV19LCJpc3MiOiJodHRwczovL2lzc3Vlci5iZXRhLWV4Y2hhbmdlLmV4YW1wbGUiLCJhdWQiOiJodHRwczovL2JldGEtZXhjaGFuZ2UuZXhhbXBsZS9kYXRhLWhvbGRlcnMiLCJpYXQiOjE3ODEyMjQ4ODEsImV4cCI6MTc4MTIyODQ4MSwianRpIjoiMDhiYTc0MDMtYjJmYS00MzYzLThmNmYtMDZhYzU5YmRjYjI1In0.QAK7G_560E9AyIKnhi3kGEoZDGgHqYwH2EgCL2S9g3O6M4SoKs-LK_T_Fjh0qbeaQufdEmzrJiXOyHUEub99Mw
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
    ]
  },
  "iss": "https://issuer.beta-exchange.example",
  "aud": "https://beta-exchange.example/data-holders",
  "iat": 1781224881,
  "exp": 1781228481,
  "jti": "08ba7403-b2fa-4363-8f6f-06ac59bdcb25"
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

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*