# The authorization step's token response

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). What BP Buddy receives when Maria finishes the authorization step at the shared authorization service: a standard SMART token response extended with per-site permission tickets and endpoint hints. Maria chose two sites; sites she left out appear nowhere.*

**Token response — authorization code exchanged at the service's token endpoint**

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "hr3aA73nSf4TSbflWnysPGZNGBgaR5Se",
  "token_type": "Bearer",
  "expires_in": 300,
  "refresh_token": "1fuGg21-klsnGe07VpLSbnxedHp34ha9",
  "scope": "permission_ticket patient/Observation.rs offline_access",
  "smart_permission_ticket": [
    "eyJhbGciOiJFUzI1NiIsImtpZCI6IjRKWmVYeDFEaUU0cllMTH... (ticket 0, decoded below)",
    "eyJhbGciOiJFUzI1NiIsImtpZCI6IjRKWmVYeDFEaUU0cllMTH... (ticket 1, decoded below)"
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
eyJhbGciOiJFUzI1NiIsImtpZCI6IjRKWmVYeDFEaUU0cllMTHdOSjJfN0ZjMTRTcFEzbUI0UXpreXdrRU94TGsiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxGYU0wNUlZVU4yZFRBME5uZERhR2w1WmtwNlNrTlFZa3d0TVhOeVpESkJVRXR3VGxJM1VISmljMDBpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNamczT0N3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWW1ZNU1HUTBNV0V0WTJSaFlpMDBNbUU0TFRnMk1UY3RaR1U1WWpReU4yWmlObU01SWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSXlPRGM0TENKbGVIQWlPakUzT0RFeU1qTXhOemdzSW1wMGFTSTZJak5pWmpoaVlXWmxMV1k0T0dJdE5EQXhZUzFpTjJRM0xXTTFOREJoWW1Zek4yUmlZeUo5LmhmNE9UeDF6X05nejVXN0hXRFk3T01OOTJMSlhrUjJYUENJWW1RTTA5ak5YM1VCTmtkTUJHc1paeDZ3SVJKbG5GakZBem1pX21NUTRjZEdjNm5DSXBIbEVKdmtIWDB3ZXlyakRkWXdoZXVBb0xGVktNSmxIWk96TmJHdGpwbnpQdTEyTjhWZExSdkpsTDlfLVFoajJlUzEwMHZXSFFpOS1BUVd3UkJuUnowTEVVYWNFQ2ZXX2piQTdrMmhQSlItay1CdlZVWVdTNzdnY3lYaDJjOUF0RlhVdEl2ZndRdDg5RVJSTVR2aGhhMHcydzdjVERfTGdBdWs0cnlLSHU2NWJpR1ZHeEMtQnpMY0VTSENENDFLMUtpMEU1XzJPQnM2Q1AxMVhEVkVKMjdseHU5UjU1SDlKVDh4X0czdTFtbWItc3dUQ3p3LUFxdERiR01LUTBwVlhIZyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IjVUaWJkY3U4NEoyTkFWazA1ZnpCMzhFTVF0aFJGWWxQemczaEZ4UkgwMUEifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiTGFrZXNpZGUgQ2xpbmljIn1dfSwiaXNzIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL2ZoaXIiLCJpYXQiOjE3ODEyMjI5MDgsImV4cCI6MTc4MTIyNjUwOCwianRpIjoiZTA5ZjQ1NDYtNjYxZC00ZWUwLThmNDYtNjM4M2RmYjU3MTZhIn0.wYbD8k4Yc7PzldfOI7GbtkX95j5XWR7KWk5GJYbnlThiJoY3jCqUVJL9bQ5X-IYlNRy2oNCSm8dNkd4xlmdvdw
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "4JZeXx1DiE4rYLLwNJ2_7Fc14SpQ3mB4QzkywkEOxLk",
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
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlFaM05IYUN2dTA0NndDaGl5Zkp6SkNQYkwtMXNyZDJBUEtwTlI3UHJic00iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMjg3OCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiYmY5MGQ0MWEtY2RhYi00MmE4LTg2MTctZGU5YjQyN2ZiNmM5IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjIyODc4LCJleHAiOjE3ODEyMjMxNzgsImp0aSI6IjNiZjhiYWZlLWY4OGItNDAxYS1iN2Q3LWM1NDBhYmYzN2RiYyJ9.hf4OTx1z_Ngz5W7HWDY7OMN92LJXkR2XPCIYmQM09jNX3UBNkdMBGsZZx6wIRJlnFjFAzmi_mMQ4cdGc6nCIpHlEJvkHX0weyrjDdYwheuAoLFVKMJlHZOzNbGtjpnzPu12N8VdLRvJlL9_-Qhj2eS100vWHQi9-AQWwRBnRz0LEUacECfW_jbA7k2hPJR-k-BvVUYWS77gcyXh2c9AtFXUtIvfwQt89ERRMTvhha0w2w7cTD_LgAuk4ryKHu65biGVGxC-BzLcESHCD41K1Ki0E5_2OBs6CP11XDVEJ27lxu9R55H9JT8x_G3u1mmb-swTCzw-AqtDbGMKQ0pVXHg",
  "presenter_binding": {
    "jkt": "5Tibdcu84J2NAVk05fzB38EMQthRFYlPzg3hFxRH01A"
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
  "iat": 1781222908,
  "exp": 1781226508,
  "jti": "e09f4546-661d-4ee0-8f46-6383dfb5716a"
}
```

---

**Ticket 1 — scoped to County Health** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6IjRKWmVYeDFEaUU0cllMTHdOSjJfN0ZjMTRTcFEzbUI0UXpreXdrRU94TGsiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxGYU0wNUlZVU4yZFRBME5uZERhR2w1WmtwNlNrTlFZa3d0TVhOeVpESkJVRXR3VGxJM1VISmljMDBpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNamczT0N3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWW1ZNU1HUTBNV0V0WTJSaFlpMDBNbUU0TFRnMk1UY3RaR1U1WWpReU4yWmlObU01SWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSXlPRGM0TENKbGVIQWlPakUzT0RFeU1qTXhOemdzSW1wMGFTSTZJak5pWmpoaVlXWmxMV1k0T0dJdE5EQXhZUzFpTjJRM0xXTTFOREJoWW1Zek4yUmlZeUo5LmhmNE9UeDF6X05nejVXN0hXRFk3T01OOTJMSlhrUjJYUENJWW1RTTA5ak5YM1VCTmtkTUJHc1paeDZ3SVJKbG5GakZBem1pX21NUTRjZEdjNm5DSXBIbEVKdmtIWDB3ZXlyakRkWXdoZXVBb0xGVktNSmxIWk96TmJHdGpwbnpQdTEyTjhWZExSdkpsTDlfLVFoajJlUzEwMHZXSFFpOS1BUVd3UkJuUnowTEVVYWNFQ2ZXX2piQTdrMmhQSlItay1CdlZVWVdTNzdnY3lYaDJjOUF0RlhVdEl2ZndRdDg5RVJSTVR2aGhhMHcydzdjVERfTGdBdWs0cnlLSHU2NWJpR1ZHeEMtQnpMY0VTSENENDFLMUtpMEU1XzJPQnM2Q1AxMVhEVkVKMjdseHU5UjU1SDlKVDh4X0czdTFtbWItc3dUQ3p3LUFxdERiR01LUTBwVlhIZyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IjVUaWJkY3U4NEoyTkFWazA1ZnpCMzhFTVF0aFJGWWxQemczaEZ4UkgwMUEifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV0sImRhdGFfaG9sZGVyX2ZpbHRlciI6W3sib3JnYW5pemF0aW9uIjoiQ291bnR5IEhlYWx0aCJ9XX0sImlzcyI6Imh0dHBzOi8vaXNzdWVyLmJldGEtZXhjaGFuZ2UuZXhhbXBsZSIsImF1ZCI6Imh0dHBzOi8vZmhpci5jb3VudHloZWFsdGguZXhhbXBsZS9yNCIsImlhdCI6MTc4MTIyMjkwOCwiZXhwIjoxNzgxMjI2NTA4LCJqdGkiOiJiMzc5Y2FlMC1lZjdlLTRmY2ItYThiYy1iOTFiODhhMmZiMmIifQ.PDsVFCMU9wlZrn1kPZI9mcvXa46OJPsa3inKi0G1J6SyRLhJcaoojcTzNEziNG7pKEIKiKXpa2nalFz9-8q1nQ
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "4JZeXx1DiE4rYLLwNJ2_7Fc14SpQ3mB4QzkywkEOxLk",
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
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlFaM05IYUN2dTA0NndDaGl5Zkp6SkNQYkwtMXNyZDJBUEtwTlI3UHJic00iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMjg3OCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJpc3MiOiJodHRwczovL2FwaS5pZC5tZS9vaWRjIiwic3ViIjoiYmY5MGQ0MWEtY2RhYi00MmE4LTg2MTctZGU5YjQyN2ZiNmM5IiwiYXVkIjoiaHR0cHM6Ly9pc3N1ZXIuYmV0YS1leGNoYW5nZS5leGFtcGxlIiwiaWF0IjoxNzgxMjIyODc4LCJleHAiOjE3ODEyMjMxNzgsImp0aSI6IjNiZjhiYWZlLWY4OGItNDAxYS1iN2Q3LWM1NDBhYmYzN2RiYyJ9.hf4OTx1z_Ngz5W7HWDY7OMN92LJXkR2XPCIYmQM09jNX3UBNkdMBGsZZx6wIRJlnFjFAzmi_mMQ4cdGc6nCIpHlEJvkHX0weyrjDdYwheuAoLFVKMJlHZOzNbGtjpnzPu12N8VdLRvJlL9_-Qhj2eS100vWHQi9-AQWwRBnRz0LEUacECfW_jbA7k2hPJR-k-BvVUYWS77gcyXh2c9AtFXUtIvfwQt89ERRMTvhha0w2w7cTD_LgAuk4ryKHu65biGVGxC-BzLcESHCD41K1Ki0E5_2OBs6CP11XDVEJ27lxu9R55H9JT8x_G3u1mmb-swTCzw-AqtDbGMKQ0pVXHg",
  "presenter_binding": {
    "jkt": "5Tibdcu84J2NAVk05fzB38EMQthRFYlPzg3hFxRH01A"
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
  "iat": 1781222908,
  "exp": 1781226508,
  "jti": "b379cae0-ef7e-4fcb-a8bc-b91b88a2fb2b"
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

*Generated 2026-06-12T00:08:28.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*