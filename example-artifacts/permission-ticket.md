# Core story — a signed permission ticket and its redemption

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The patient authorizes once at a shared authorization service via a SMART App Launch code flow; the token response carries per-site tickets like this one plus endpoint hints (see issuance-token-response). The app redeems the ticket at each data holder's token endpoint via RFC 8693; the data holder verifies the ticket, independently verifies the embedded identity evidence, matches the patient locally, and issues its own token with the matched id.*

**Permission ticket — note subject demographics, the embedded IAL2 id_token as subject_identity_evidence, and the presenter binding to the app's key** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6IllBUHNwc21YUEs3dHBKUnAyU3JMMUVFUlpOUk5jd0dSbFpRS1lkbDk1OEEiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWpOWE9WUXhRMVZmTW5oWFMwRnVMVzF6VWpGVFRtSktaa3BPVFRWT1pXeEhPR3BpTm1sVlRGTTJWamdpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhOalF6Tml3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWkdKaVpUVmpOMlV0WkRSbE1pMDBZelF4TFRsaVpHSXRZVE5tTWpSa056YzRNMlU0SWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qRTJORE0yTENKbGVIQWlPakUzT0RFeU1UWTNNellzSW1wMGFTSTZJamd5TXpnelpHVmxMV0UwTm1VdE5ETTVaUzFpTkROaExXUXdaakJrT1RSbFpUWm1ZaUo5LmlQRzFRb3NMQmMtRTFuVlkyQ3JEOHV5QTctUnUyUTJNcU50VGVNd1dEV0ZQcEVWbzQ2UHZGVHFlOVpYYmVNNGlMWHlwTDZUWm5lMlN4Y0NqdEJkTVJoY3hCTWxZc2ZDS1VUWnZJRW9IVkNJTHVqV3dkbm1WalV2SXZLOHVRUk5OQVNBeDgxTjhzVXU4dHZFaHpZWWp2djZRTnhHejk3OUZkR2xGM2lxLThiVmpoQU9CV2RlcWhfdnE5S2xpUHpTRTFKcG54TUpqX192U2U3Vm5RREVBTGFxdXkxY1AtUWowekp4eHF5Sks1THZucEYxYzdxb1RPcVR3OHV2XzlOSEdsNmFPczItUTlFNTVMZUFfUXA0UnRiUG9tY2otdTk2OXZrYTJFZ1ZPN1lCdWNZVUgzTjBIUlFZZS0xS09NQnQxNGVza0hYWFZZLWZZQ0RRUGJqZ3NrdyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IkJBVEZ6V0tYSmJBWVM4el84Z0dPeHpTY2FaYlhiZWpxbU5GSlZMMWVnMUEifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiTGFrZXNpZGUgQ2xpbmljIn1dfSwiaXNzIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL2ZoaXIiLCJpYXQiOjE3ODEyMTY0NjYsImV4cCI6MTc4MTIyMDA2NiwianRpIjoiMmU3ZTAwNzMtYzZlOC00ZjFiLWE0YmQtNGJlZDUxOTk5NzQ5In0.5gGrWhULULupEd1YkPE_AMRa1PqrhG9ZVhdOOKH423WEBnRWVOTFsLHaT-H2Z27ckPwWBMwgQyZhGZAuXp29cg
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "YAPspsmXPK7tpJRp2SrL1EERZNRNcwGRlZQKYdl958A",
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
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNXOVQxQ1VfMnhXS0FuLW1zUjFTTmJKZkpOTTVOZWxHOGpiNmlVTFM2VjgiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxNjQzNiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiZGJiZTVjN2UtZDRlMi00YzQxLTliZGItYTNmMjRkNzc4M2U4IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjE2NDM2LCJleHAiOjE3ODEyMTY3MzYsImp0aSI6IjgyMzgzZGVlLWE0NmUtNDM5ZS1iNDNhLWQwZjBkOTRlZTZmYiJ9.iPG1QosLBc-E1nVY2CrD8uyA7-Ru2Q2MqNtTeMwWDWFPpEVo46PvFTqe9ZXbeM4iLXypL6TZne2SxcCjtBdMRhcxBMlYsfCKUTZvIEoHVCILujWwdnmVjUvIvK8uQRNNASAx81N8sUu8tvEhzYYjvv6QNxGz979FdGlF3iq-8bVjhAOBWdeqh_vq9KliPzSE1JpnxMJj__vSe7VnQDEALaquy1cP-Qj0zJxxqyJK5LvnpF1c7qoTOqTw8uv_9NHGl6aOs2-Q9E55LeA_Qp4RtbPomcj-u969vka2EgVO7YBucYUH3N0HRQYe-1KOMBt14eskHXXVY-fYCDQPbjgskw",
  "presenter_binding": {
    "jkt": "BATFzWKXJbAYS8z_8gGOxzScaZbXbejqmNFJVL1eg1A"
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
  "iat": 1781216466,
  "exp": 1781220066,
  "jti": "2e7e0073-c6e8-4f1b-a4bd-4bed51999749"
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
  "subject_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6IllBUHNwc21YUEs3dHBKUnAyU3JMMUVF... (full value above)",
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
  "access_token": "fScPiHAINuwqlAilb1Dy8A_xcMceXD9x",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "patient/Observation.rs",
  "patient": "lakeside-449210"
}
```

*Generated 2026-06-11T22:21:06.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*