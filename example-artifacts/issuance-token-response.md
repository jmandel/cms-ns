# Core story — the authorization step's token response

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). What BP Buddy receives when Maria finishes the authorization step at the shared authorization service: a standard SMART token response extended with per-site permission tickets and endpoint hints. Maria chose two sites; sites she left out appear nowhere.*

**Token response — authorization code exchanged at the service's token endpoint**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "grf5kqc4G2ffYMKsCabf_O6cP2XfioG_",
  "token_type": "Bearer",
  "expires_in": 300,
  "refresh_token": "niAX_BOj6arIvLOaUaPRV91ciU9LCyNs",
  "scope": "permission_ticket patient/Observation.rs offline_access",
  "smart_permission_ticket": [
    "eyJhbGciOiJFUzI1NiIsImtpZCI6Ik9aa05LejFSanc2elFhYU... (ticket 0, decoded below)",
    "eyJhbGciOiJFUzI1NiIsImtpZCI6Ik9aa05LejFSanc2elFhYU... (ticket 1, decoded below)"
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
eyJhbGciOiJFUzI1NiIsImtpZCI6Ik9aa05LejFSanc2elFhYUdoUTVTQ0E1aUgxV0pFbmROV0VSM2xRaV9aMVkiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWsxNFVqSm1jRlZCTVRGUGNURnlhM05UTlV0SVgxTnJOVXRpY0VSQ2JtUk1ibGszYlU4MVNHNUhSVlVpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhOREkzTkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWlRkaE9XRm1aVFV0TlRneVppMDBPR1E0TFdFME5tUXRZVFkyWTJJMFpqQXlaREJoSWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qRTBNamMwTENKbGVIQWlPakUzT0RFeU1UUTFOelFzSW1wMGFTSTZJbUprTTJVNU1Ua3dMVEV6Wm1VdE5HRTNNQzFoWWpVekxUWmxZVE5oT1RBMk5UUm1aQ0o5LlhQU1R5ZlZzNWNabzd2eXRZaDZMVnBXX0lpVDRCamp5REYzQnBWUzRIOGZEQVpIbUpuYVpOYnFoZ0V6VUVpRUZPVC0tTWNrRER1a21XM2lWMXlXcE9HUnZhTWlnX3VCWWZhWTVBYXlxOGJXSlU1TkVnUGdIVkRmX2EydkJZSUhCSzR4NC1WMkNrZW1CTUNaTzBvY2pNN0JsUFMxcm82RlByZTdMbjhwY2dQQ2tiQmJkb2Q3aTFCRnpBcnJCY3lCa0Q0cC12UVllNDQ5MXFrLV9PUVExcEFYbEJHVjg3ZXRZVnUwVmh3d21ndmlHTDFlX1hRS2JNbnVYdXRWQnk2RkljWUEtdXk4MXBzWVhzN0RvX24xNkhZOUVENFE1ek1URVROeVE4ZWZzb1ROZmc5WFVNcnIxVXRsQ0FGTzhyU3MzZ250NXA5S0JHYU9DY2h3VVB4RjBtUSIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IjQxeHM3YThWV2hIWlFRbXdZOVJrMFJuR0tqQjdJd3kwQ3B4LVZTVkRTSWsifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiTGFrZXNpZGUgQ2xpbmljIn1dfSwiaXNzIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL2ZoaXIiLCJpYXQiOjE3ODEyMTQzMDQsImV4cCI6MTc4MTIxNzkwNCwianRpIjoiMTlhNTE5NzQtMzM2YS00YmVmLWFmY2EtYjAzNmZkZjI1ZjVjIn0.upY1Pae8ahoTUhwEMPE2AMxPaVfXwChApSkR-tqcmWCEBMKP9HAag4-HV-XnLhCaXUUmRE-E6tAOSbz0qDMYxw
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "OZkNKz1Rjw6zQaaGhQ5SCA5iH1WJEndNWER3lQi_Z1Y",
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
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ik14UjJmcFVBMTFPcTFya3NTNUtIX1NrNUticERCbmRMblk3bU81SG5HRVUiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxNDI3NCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiZTdhOWFmZTUtNTgyZi00OGQ4LWE0NmQtYTY2Y2I0ZjAyZDBhIiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjE0Mjc0LCJleHAiOjE3ODEyMTQ1NzQsImp0aSI6ImJkM2U5MTkwLTEzZmUtNGE3MC1hYjUzLTZlYTNhOTA2NTRmZCJ9.XPSTyfVs5cZo7vytYh6LVpW_IiT4BjjyDF3BpVS4H8fDAZHmJnaZNbqhgEzUEiEFOT--MckDDukmW3iV1yWpOGRvaMig_uBYfaY5Aayq8bWJU5NEgPgHVDf_a2vBYIHBK4x4-V2CkemBMCZO0ocjM7BlPS1ro6FPre7Ln8pcgPCkbBbdod7i1BFzArrBcyBkD4p-vQYe4491qk-_OQQ1pAXlBGV87etYVu0VhwwmgviGL1e_XQKbMnuXutVBy6FIcYA-uy81psYXs7Do_n16HY9ED4Q5zMTETNyQ8efsoTNfg9XUMrr1UtlCAFO8rSs3gnt5p9KBGaOCchwUPxF0mQ",
  "presenter_binding": {
    "jkt": "41xs7a8VWhHZQQmwY9Rk0RnGKjB7Iwy0Cpx-VSVDSIk"
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
  "iat": 1781214304,
  "exp": 1781217904,
  "jti": "19a51974-336a-4bef-afca-b036fdf25f5c"
}
```

---

**Ticket 1 — scoped to County Health** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6Ik9aa05LejFSanc2elFhYUdoUTVTQ0E1aUgxV0pFbmROV0VSM2xRaV9aMVkiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWsxNFVqSm1jRlZCTVRGUGNURnlhM05UTlV0SVgxTnJOVXRpY0VSQ2JtUk1ibGszYlU4MVNHNUhSVlVpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhOREkzTkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWlRkaE9XRm1aVFV0TlRneVppMDBPR1E0TFdFME5tUXRZVFkyWTJJMFpqQXlaREJoSWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qRTBNamMwTENKbGVIQWlPakUzT0RFeU1UUTFOelFzSW1wMGFTSTZJbUprTTJVNU1Ua3dMVEV6Wm1VdE5HRTNNQzFoWWpVekxUWmxZVE5oT1RBMk5UUm1aQ0o5LlhQU1R5ZlZzNWNabzd2eXRZaDZMVnBXX0lpVDRCamp5REYzQnBWUzRIOGZEQVpIbUpuYVpOYnFoZ0V6VUVpRUZPVC0tTWNrRER1a21XM2lWMXlXcE9HUnZhTWlnX3VCWWZhWTVBYXlxOGJXSlU1TkVnUGdIVkRmX2EydkJZSUhCSzR4NC1WMkNrZW1CTUNaTzBvY2pNN0JsUFMxcm82RlByZTdMbjhwY2dQQ2tiQmJkb2Q3aTFCRnpBcnJCY3lCa0Q0cC12UVllNDQ5MXFrLV9PUVExcEFYbEJHVjg3ZXRZVnUwVmh3d21ndmlHTDFlX1hRS2JNbnVYdXRWQnk2RkljWUEtdXk4MXBzWVhzN0RvX24xNkhZOUVENFE1ek1URVROeVE4ZWZzb1ROZmc5WFVNcnIxVXRsQ0FGTzhyU3MzZ250NXA5S0JHYU9DY2h3VVB4RjBtUSIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IjQxeHM3YThWV2hIWlFRbXdZOVJrMFJuR0tqQjdJd3kwQ3B4LVZTVkRTSWsifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiQ291bnR5IEhlYWx0aCJ9XX0sImlzcyI6Imh0dHBzOi8vaXNzdWVyLmJldGEtZXhjaGFuZ2UuZXhhbXBsZSIsImF1ZCI6Imh0dHBzOi8vZmhpci5jb3VudHloZWFsdGguZXhhbXBsZS9yNCIsImlhdCI6MTc4MTIxNDMwNCwiZXhwIjoxNzgxMjE3OTA0LCJqdGkiOiJhYTMzMTAxYi0wZTBhLTRhYzEtOTJiMi00NWU1YTU4ZjdkNjUifQ.Oo82qbRFPHxjxRQjpFSCAgpMoSlwdqBbBVYjMj3jrFhxTOPfoSIbGvo9OyKiYjz8MaA5oCjDFlyLPQW_ODWKbw
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "OZkNKz1Rjw6zQaaGhQ5SCA5iH1WJEndNWER3lQi_Z1Y",
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
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ik14UjJmcFVBMTFPcTFya3NTNUtIX1NrNUticERCbmRMblk3bU81SG5HRVUiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxNDI3NCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiZTdhOWFmZTUtNTgyZi00OGQ4LWE0NmQtYTY2Y2I0ZjAyZDBhIiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjE0Mjc0LCJleHAiOjE3ODEyMTQ1NzQsImp0aSI6ImJkM2U5MTkwLTEzZmUtNGE3MC1hYjUzLTZlYTNhOTA2NTRmZCJ9.XPSTyfVs5cZo7vytYh6LVpW_IiT4BjjyDF3BpVS4H8fDAZHmJnaZNbqhgEzUEiEFOT--MckDDukmW3iV1yWpOGRvaMig_uBYfaY5Aayq8bWJU5NEgPgHVDf_a2vBYIHBK4x4-V2CkemBMCZO0ocjM7BlPS1ro6FPre7Ln8pcgPCkbBbdod7i1BFzArrBcyBkD4p-vQYe4491qk-_OQQ1pAXlBGV87etYVu0VhwwmgviGL1e_XQKbMnuXutVBy6FIcYA-uy81psYXs7Do_n16HY9ED4Q5zMTETNyQ8efsoTNfg9XUMrr1UtlCAFO8rSs3gnt5p9KBGaOCchwUPxF0mQ",
  "presenter_binding": {
    "jkt": "41xs7a8VWhHZQQmwY9Rk0RnGKjB7Iwy0Cpx-VSVDSIk"
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
  "iat": 1781214304,
  "exp": 1781217904,
  "jti": "aa33101b-0e0a-4ac1-92b2-45e5a58f7d65"
}
```

---

Redeeming a ticket at a data holder is shown in [permission-ticket](permission-ticket.md). Renewing expired tickets uses the refresh_token at the service, without re-running the authorization step.

*Generated 2026-06-11T21:45:04.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*