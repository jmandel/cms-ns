# Alternative shape — a signed permission ticket

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). In the SMART Permission Tickets model (proposal 003), the patient authorizes once at an issuer via a SMART App Launch code flow; the token response carries tickets like this one plus endpoint hints. The app redeems the ticket at each data holder's token endpoint via RFC 8693; the data holder verifies the ticket, independently verifies the embedded identity evidence, matches the patient locally, and issues its own token with the matched id.*

**Permission ticket — note subject demographics, the embedded IAL2 id_token as subject_identity_evidence, and the presenter binding to the app's key** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6Ik9sREZla05qWWpxZkJkVzVCR1ZaWWtTQThIZlYwa1UxR1hLTEl5S082dUEiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5kcE1VUlhSazF0ZURac2FXSkZhVEJaVURRMmJ6aEZVbWhJVG5keVNFbE1iVlU0U2sxNGNsVXRWMnNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXdOVFF5TkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWWprMU5tTmxPREV0TW1JMFlpMDBZMlUyTFRnMFptVXRPVEF6WVRVeU56QXhNbUV6SWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qQTFOREkwTENKbGVIQWlPakUzT0RFeU1EVTNNalFzSW1wMGFTSTZJakZqTnprME5EY3hMV00wWXpVdE5HTmxaUzA1TjJVNUxUTmtOVGxpTXpJNVlXVTBaQ0o5LnF2anlnd0sxeTNLSXY4SWd3UjVXbUhxUEFVWnVhMVRaa3l6LUR4eGNVaHlES3R0VmpMQ1Q4X25CdmVfWnhwVXFDNzZjcEVVb0Z1c2lJT3dVS0ZXaEtVN21GSFVVZ252SGlhTkZaaDRTRjJVckgtcFVBUS1WcHljS0EzRjRzV282dUtMM2ZGaXB3TmtLOTlRZE1BNXpVX0RPVXZrYkgxbjQxV0ZLd3NqM3JQNkZBTWNmUVFCS3Q5bVdQcmZBdG5aSW9aLWlMRk5VN1EtemFKeVY4WXp2ODcybF9nNzJaNW5HcG1hbkdkY0E1ZWpKWmZnMV92ZFZidDlhU3pmSzd0RHlVQXUxcVBvS2N3djQzV2lWRkszUGtnbXFOd0o3QUpTaFZpY24tNjlsd1RJRFp0NTBqTjYzdHFaZS1BSnlpSmZUNGdEd2U3THlQUXV6ckhCaDd6d0VpQSIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IjFlWW12QmtRX29VVUdWeTg1N0FGWUh2U0VUbFFZTUF5T1hqMVRnWEJScnMifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiTGFrZXNpZGUgQ2xpbmljIn1dfSwiaXNzIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL2ZoaXIiLCJpYXQiOjE3ODEyMDU0NTQsImV4cCI6MTc4MTIwOTA1NCwianRpIjoiMDE0ZjZjYmQtZTlmOC00MzBlLWE3NzQtNjIwZTVlYmRiMjJmIn0.cr-RVOxzvlzDqrfM6mm4Hx7GrjODNsFbCuHpwUjOmhPQfYsPfMvww07PsgH6Pq7AGn9wlTlsg1xamFLWPLrO2w
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "OlDFekNjYjqfBdW5BGVZYkSA8HfV0kU1GXKLIyKO6uA",
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
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6IndpMURXRk1teDZsaWJFaTBZUDQ2bzhFUmhITndySElMbVU4Sk14clUtV2siLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIwNTQyNCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiYjk1NmNlODEtMmI0Yi00Y2U2LTg0ZmUtOTAzYTUyNzAxMmEzIiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjA1NDI0LCJleHAiOjE3ODEyMDU3MjQsImp0aSI6IjFjNzk0NDcxLWM0YzUtNGNlZS05N2U5LTNkNTliMzI5YWU0ZCJ9.qvjygwK1y3KIv8IgwR5WmHqPAUZua1TZkyz-DxxcUhyDKttVjLCT8_nBve_ZxpUqC76cpEUoFusiIOwUKFWhKU7mFHUUgnvHiaNFZh4SF2UrH-pUAQ-VpycKA3F4sWo6uKL3fFipwNkK99QdMA5zU_DOUvkbH1n41WFKwsj3rP6FAMcfQQBKt9mWPrfAtnZIoZ-iLFNU7Q-zaJyV8Yzv872l_g72Z5nGpmanGdcA5ejJZfg1_vdVbt9aSzfK7tDyUAu1qPoKcwv43WiVFK3PkgmqNwJ7AJShVicn-69lwTIDZt50jN63tqZe-AJyiJfT4gDwe7LyPQuzrHBh7zwEiA",
  "presenter_binding": {
    "jkt": "1eYmvBkQ_oUUGVy857AFYHvSETlQYMAyOXj1TgXBRrs"
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
  "iat": 1781205454,
  "exp": 1781209054,
  "jti": "014f6cbd-e9f8-430e-a774-620e5ebdb22f"
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
  "subject_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6Ik9sREZla05qWWpxZkJkVzVCR1ZaWWtT... (full value above)",
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
  "access_token": "Yyiq3Hea7tPte9yhr6hPBci5nFDHTpCs",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "patient/Observation.rs",
  "patient": "lakeside-449210"
}
```

*Generated 2026-06-11T19:17:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*