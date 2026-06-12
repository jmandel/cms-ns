# A blanket ticket: every match disclosed

*Worked example for [the record location and data access write-up](../authorizing-access.md). If Maria chooses every site (or the deployment does in-app selection), the token response carries a single ticket with no data_holder_filter, and endpoint hints for every match. The app learns every care relationship; this is the disclosure that service-side selection avoids.*

**Blanket ticket: no data_holder_filter** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6ImotcTVrOE5hZms0TEU5dUl1bE1HSXpUWGFuZjFxM3VRdTRXM293dm9DSE0iLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5OeVlUWTNka0V5TFVSeVVVeGZVRjluUlZCeVFVcDNUR3RMYURBNVJFMVZUa0ozWXpKRE5sQTNjMjhpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlOVEkyTUN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pTm1VNU1qQTVOVGt0T1dOaVpDMDBZekF5TFRnek56UXRZemd6TlRaaU9HUTFNalkySWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSTFNall3TENKbGVIQWlPakUzT0RFeU1qVTFOakFzSW1wMGFTSTZJbVkyT0Raa05HSmxMVE5pWlRNdE5HVmpNQzA1TkdRMUxUQXlZemhrWm1NMk56Z3dNeUo5LlNueHFJUEMtT0ozU3BnQjJFLU00ZDkyYnBHOERudUxsRTZlX1RxN1dDa3EyeUFFWEZGb0UwNUx1Y2dUNTBFbFRlWHlFbHRDb2hWcUNqbmZScjQzdjMzXzZJUFpFWDhBYjVwc01QUW93WkV1OHBKN1lsZjNmSVdCbndMQUtjU0g3U2dpZjFvN2JJQl84VWFBd2dFVU5GNm4xQ25fTkxKX0ZXdURseV9JSHByMGRkMVVaeDBXYjAyTlhzREw3YUZ2Mm4wZ3B6Y0d2VVlkX05CdU5XenpKVGhhbTdndzd0RkU0Z2Y4T1lKNF9ZcFQwTF9fRURNblVqdXczajVYQ2Vlc1drd3F0MnBZQy1PZVNxdEZoWW1wYmprMGtjRWRnWmRmdlZXd0VYRnMyOUxTMXZfNlh4Ul9NRGRjRE4wOXFYV3VkUHlmV0lqNWhrczk1UlFFWG1pd0FrZyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6ImQ3LVpSOVlWeHljZXlibUZtTGQybmVOVnVzb1dtS3JTNGFtNVpnSjBhZG8ifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV19LCJpc3MiOiJodHRwczovL2lzc3Vlci5iZXRhLWV4Y2hhbmdlLmV4YW1wbGUiLCJhdWQiOiJodHRwczovL2JldGEtZXhjaGFuZ2UuZXhhbXBsZS9kYXRhLWhvbGRlcnMiLCJpYXQiOjE3ODEyMjUyOTAsImV4cCI6MTc4MTIyODg5MCwianRpIjoiZDNhYmY4NzctMmVkZS00NTE5LTgxZTUtODgyYmEzZGY1YTYzIn0.yDQpztLZEA0a-2z9MzagXdFnw-HMyU0FMuXTKQp-dmrmQBCTM4k6sMOkDjOIGUlhc7pPBZYRA8ZVJL1dJDXafA
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
    ]
  },
  "iss": "https://issuer.beta-exchange.example",
  "aud": "https://beta-exchange.example/data-holders",
  "iat": 1781225290,
  "exp": 1781228890,
  "jti": "d3abf877-2ede-4519-81e5-882ba3df5a63"
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

*Generated 2026-06-12T00:48:10.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*