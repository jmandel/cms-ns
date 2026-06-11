# Core story — a signed permission ticket and its redemption

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The patient authorizes once at a shared authorization service via a SMART App Launch code flow; the token response carries per-site tickets like this one plus endpoint hints (see issuance-token-response). The app redeems the ticket at each data holder's token endpoint via RFC 8693; the data holder verifies the ticket, independently verifies the embedded identity evidence, matches the patient locally, and issues its own token with the matched id.*

**Permission ticket — note subject demographics, the embedded IAL2 id_token as subject_identity_evidence, and the presenter binding to the app's key** (compact JWS, really signed):

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
  "subject_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6Ik9aa05LejFSanc2elFhYUdoUTVTQ0E1... (full value above)",
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
  "access_token": "UxJf5wwc9dyWOApUwSHZ4I9z_IWG8iTn",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "patient/Observation.rs",
  "patient": "lakeside-449210"
}
```

*Generated 2026-06-11T21:45:04.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*