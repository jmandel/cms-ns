# The authorization step's token response

*Worked example for [the record location and data access write-up](../authorizing-access.md). What BP Buddy receives when Maria finishes the authorization step at the shared authorization service: a standard SMART token response extended with per-site permission tickets and endpoint hints. Maria chose two sites; sites she left out appear nowhere.*

**Token response — authorization code exchanged at the service's token endpoint**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "bE_aCz7GgG5tHtgHasUQx2sIPgi3nv_Q",
  "token_type": "Bearer",
  "expires_in": 300,
  "refresh_token": "BCROTxxIf5p48YN4v2YtfN153XLE73FE",
  "scope": "permission_ticket patient/Observation.rs offline_access",
  "smart_permission_ticket": [
    "eyJhbGciOiJFUzI1NiIsImtpZCI6ImotcTVrOE5hZms0TEU5dU... (ticket 0, decoded below)",
    "eyJhbGciOiJFUzI1NiIsImtpZCI6ImotcTVrOE5hZms0TEU5dU... (ticket 1, decoded below)"
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
eyJhbGciOiJFUzI1NiIsImtpZCI6ImotcTVrOE5hZms0TEU5dUl1bE1HSXpUWGFuZjFxM3VRdTRXM293dm9DSE0iLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5OeVlUWTNka0V5TFVSeVVVeGZVRjluUlZCeVFVcDNUR3RMYURBNVJFMVZUa0ozWXpKRE5sQTNjMjhpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlOVEkyTUN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pTm1VNU1qQTVOVGt0T1dOaVpDMDBZekF5TFRnek56UXRZemd6TlRaaU9HUTFNalkySWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSTFNall3TENKbGVIQWlPakUzT0RFeU1qVTFOakFzSW1wMGFTSTZJbVkyT0Raa05HSmxMVE5pWlRNdE5HVmpNQzA1TkdRMUxUQXlZemhrWm1NMk56Z3dNeUo5LlNueHFJUEMtT0ozU3BnQjJFLU00ZDkyYnBHOERudUxsRTZlX1RxN1dDa3EyeUFFWEZGb0UwNUx1Y2dUNTBFbFRlWHlFbHRDb2hWcUNqbmZScjQzdjMzXzZJUFpFWDhBYjVwc01QUW93WkV1OHBKN1lsZjNmSVdCbndMQUtjU0g3U2dpZjFvN2JJQl84VWFBd2dFVU5GNm4xQ25fTkxKX0ZXdURseV9JSHByMGRkMVVaeDBXYjAyTlhzREw3YUZ2Mm4wZ3B6Y0d2VVlkX05CdU5XenpKVGhhbTdndzd0RkU0Z2Y4T1lKNF9ZcFQwTF9fRURNblVqdXczajVYQ2Vlc1drd3F0MnBZQy1PZVNxdEZoWW1wYmprMGtjRWRnWmRmdlZXd0VYRnMyOUxTMXZfNlh4Ul9NRGRjRE4wOXFYV3VkUHlmV0lqNWhrczk1UlFFWG1pd0FrZyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6ImQ3LVpSOVlWeHljZXlibUZtTGQybmVOVnVzb1dtS3JTNGFtNVpnSjBhZG8ifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiTGFrZXNpZGUgQ2xpbmljIn1dfSwiaXNzIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL2ZoaXIiLCJpYXQiOjE3ODEyMjUyOTAsImV4cCI6MTc4MTIyODg5MCwianRpIjoiZTlmMTBkZmUtNDRiYy00NjQ5LTljZTktMDQyYzhhYmZhODdlIn0.I-7dM6BxBTt9KtSX4_eaJaGDkWiuGnYDRRfuQg1Ha7iH7koDOljBd7QylVzEMhCDIpzOpJmzqSKalc4OKlii_w
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "j-q5k8Nafk4LE9uIulMGIzTXanf1q3uQu4W3owvoCHM",
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
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6InNyYTY3dkEyLURyUUxfUF9nRVByQUp3TGtLaDA5RE1VTkJ3YzJDNlA3c28iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNTI2MCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiNmU5MjA5NTktOWNiZC00YzAyLTgzNzQtYzgzNTZiOGQ1MjY2IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjI1MjYwLCJleHAiOjE3ODEyMjU1NjAsImp0aSI6ImY2ODZkNGJlLTNiZTMtNGVjMC05NGQ1LTAyYzhkZmM2NzgwMyJ9.SnxqIPC-OJ3SpgB2E-M4d92bpG8DnuLlE6e_Tq7WCkq2yAEXFFoE05LucgT50ElTeXyEltCohVqCjnfRr43v33_6IPZEX8Ab5psMPQowZEu8pJ7Ylf3fIWBnwLAKcSH7Sgif1o7bIB_8UaAwgEUNF6n1Cn_NLJ_FWuDly_IHpr0dd1UZx0Wb02NXsDL7aFv2n0gpzcGvUYd_NBuNWzzJTham7gw7tFE4gf8OYJ4_YpT0L__EDMnUjuw3j5XCeesWkwqt2pYC-OeSqtFhYmpbjk0kcEdgZdfvVWwEXFs29LS1v_6XxR_MDdcDN09qXWudPyfWIj5hks95RQEXmiwAkg",
  "presenter_binding": {
    "jkt": "d7-ZR9YVxyceybmFmLd2neNVusoWmKrS4am5ZgJ0ado"
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
  "iat": 1781225290,
  "exp": 1781228890,
  "jti": "e9f10dfe-44bc-4649-9ce9-042c8abfa87e"
}
```

---

**Ticket 1 — scoped to County Health** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImotcTVrOE5hZms0TEU5dUl1bE1HSXpUWGFuZjFxM3VRdTRXM293dm9DSE0iLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5OeVlUWTNka0V5TFVSeVVVeGZVRjluUlZCeVFVcDNUR3RMYURBNVJFMVZUa0ozWXpKRE5sQTNjMjhpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlOVEkyTUN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pTm1VNU1qQTVOVGt0T1dOaVpDMDBZekF5TFRnek56UXRZemd6TlRaaU9HUTFNalkySWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSTFNall3TENKbGVIQWlPakUzT0RFeU1qVTFOakFzSW1wMGFTSTZJbVkyT0Raa05HSmxMVE5pWlRNdE5HVmpNQzA1TkdRMUxUQXlZemhrWm1NMk56Z3dNeUo5LlNueHFJUEMtT0ozU3BnQjJFLU00ZDkyYnBHOERudUxsRTZlX1RxN1dDa3EyeUFFWEZGb0UwNUx1Y2dUNTBFbFRlWHlFbHRDb2hWcUNqbmZScjQzdjMzXzZJUFpFWDhBYjVwc01QUW93WkV1OHBKN1lsZjNmSVdCbndMQUtjU0g3U2dpZjFvN2JJQl84VWFBd2dFVU5GNm4xQ25fTkxKX0ZXdURseV9JSHByMGRkMVVaeDBXYjAyTlhzREw3YUZ2Mm4wZ3B6Y0d2VVlkX05CdU5XenpKVGhhbTdndzd0RkU0Z2Y4T1lKNF9ZcFQwTF9fRURNblVqdXczajVYQ2Vlc1drd3F0MnBZQy1PZVNxdEZoWW1wYmprMGtjRWRnWmRmdlZXd0VYRnMyOUxTMXZfNlh4Ul9NRGRjRE4wOXFYV3VkUHlmV0lqNWhrczk1UlFFWG1pd0FrZyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6ImQ3LVpSOVlWeHljZXlibUZtTGQybmVOVnVzb1dtS3JTNGFtNVpnSjBhZG8ifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiQ291bnR5IEhlYWx0aCJ9XX0sImlzcyI6Imh0dHBzOi8vaXNzdWVyLmJldGEtZXhjaGFuZ2UuZXhhbXBsZSIsImF1ZCI6Imh0dHBzOi8vZmhpci5jb3VudHloZWFsdGguZXhhbXBsZS9yNCIsImlhdCI6MTc4MTIyNTI5MCwiZXhwIjoxNzgxMjI4ODkwLCJqdGkiOiJhZGViZjU0OS03YWMwLTRjMzItYjRkMS1hMzA0M2I1ZDhlNjAifQ.Oo83Qux-MUbTmEc1qIiuNrBESibDmamVpwJ_43OjuKibYPYSoM-O3NOzLQlWUPNLTWilVQ_Hi2ZbiMRo7wmhXQ
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "j-q5k8Nafk4LE9uIulMGIzTXanf1q3uQu4W3owvoCHM",
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
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6InNyYTY3dkEyLURyUUxfUF9nRVByQUp3TGtLaDA5RE1VTkJ3YzJDNlA3c28iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNTI2MCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiNmU5MjA5NTktOWNiZC00YzAyLTgzNzQtYzgzNTZiOGQ1MjY2IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjI1MjYwLCJleHAiOjE3ODEyMjU1NjAsImp0aSI6ImY2ODZkNGJlLTNiZTMtNGVjMC05NGQ1LTAyYzhkZmM2NzgwMyJ9.SnxqIPC-OJ3SpgB2E-M4d92bpG8DnuLlE6e_Tq7WCkq2yAEXFFoE05LucgT50ElTeXyEltCohVqCjnfRr43v33_6IPZEX8Ab5psMPQowZEu8pJ7Ylf3fIWBnwLAKcSH7Sgif1o7bIB_8UaAwgEUNF6n1Cn_NLJ_FWuDly_IHpr0dd1UZx0Wb02NXsDL7aFv2n0gpzcGvUYd_NBuNWzzJTham7gw7tFE4gf8OYJ4_YpT0L__EDMnUjuw3j5XCeesWkwqt2pYC-OeSqtFhYmpbjk0kcEdgZdfvVWwEXFs29LS1v_6XxR_MDdcDN09qXWudPyfWIj5hks95RQEXmiwAkg",
  "presenter_binding": {
    "jkt": "d7-ZR9YVxyceybmFmLd2neNVusoWmKrS4am5ZgJ0ado"
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
  "iat": 1781225290,
  "exp": 1781228890,
  "jti": "adebf549-7ac0-4c32-b4d1-a3043b5d8e60"
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

*Generated 2026-06-12T00:48:10.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*