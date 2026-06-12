# A blanket ticket: every match disclosed

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). If Maria chooses every site (or the deployment does in-app selection), the token response carries a single ticket with no data_holder_filter, and endpoint hints for every match. The app learns every care relationship; this is the disclosure that service-side selection avoids.*

**Blanket ticket: no data_holder_filter** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6IjRKWmVYeDFEaUU0cllMTHdOSjJfN0ZjMTRTcFEzbUI0UXpreXdrRU94TGsiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxGYU0wNUlZVU4yZFRBME5uZERhR2w1WmtwNlNrTlFZa3d0TVhOeVpESkJVRXR3VGxJM1VISmljMDBpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNamczT0N3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVwWkM1dFpTOXZhV1JqSWl3aWMzVmlJam9pWW1ZNU1HUTBNV0V0WTJSaFlpMDBNbUU0TFRnMk1UY3RaR1U1WWpReU4yWmlObU01SWl3aVlYVmtJam9pYUhSMGNITTZMeTlwYzNOMVpYSXVZbVYwWVMxbGVHTm9ZVzVuWlM1bGVHRnRjR3hsSWl3aWFXRjBJam94TnpneE1qSXlPRGM0TENKbGVIQWlPakUzT0RFeU1qTXhOemdzSW1wMGFTSTZJak5pWmpoaVlXWmxMV1k0T0dJdE5EQXhZUzFpTjJRM0xXTTFOREJoWW1Zek4yUmlZeUo5LmhmNE9UeDF6X05nejVXN0hXRFk3T01OOTJMSlhrUjJYUENJWW1RTTA5ak5YM1VCTmtkTUJHc1paeDZ3SVJKbG5GakZBem1pX21NUTRjZEdjNm5DSXBIbEVKdmtIWDB3ZXlyakRkWXdoZXVBb0xGVktNSmxIWk96TmJHdGpwbnpQdTEyTjhWZExSdkpsTDlfLVFoajJlUzEwMHZXSFFpOS1BUVd3UkJuUnowTEVVYWNFQ2ZXX2piQTdrMmhQSlItay1CdlZVWVdTNzdnY3lYaDJjOUF0RlhVdEl2ZndRdDg5RVJSTVR2aGhhMHcydzdjVERfTGdBdWs0cnlLSHU2NWJpR1ZHeEMtQnpMY0VTSENENDFLMUtpMEU1XzJPQnM2Q1AxMVhEVkVKMjdseHU5UjU1SDlKVDh4X0czdTFtbWItc3dUQ3p3LUFxdERiR01LUTBwVlhIZyIsInByZXNlbnRlcl9iaW5kaW5nIjp7ImprdCI6IjVUaWJkY3U4NEoyTkFWazA1ZnpCMzhFTVF0aFJGWWxQemczaEZ4UkgwMUEifSwiYWNjZXNzIjp7InBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZV90eXBlIjoiT2JzZXJ2YXRpb24iLCJpbnRlcmFjdGlvbnMiOlsicmVhZCIsInNlYXJjaCJdfV19LCJpc3MiOiJodHRwczovL2lzc3Vlci5iZXRhLWV4Y2hhbmdlLmV4YW1wbGUiLCJhdWQiOiJodHRwczovL2JldGEtZXhjaGFuZ2UuZXhhbXBsZS9kYXRhLWhvbGRlcnMiLCJpYXQiOjE3ODEyMjI5MDgsImV4cCI6MTc4MTIyNjUwOCwianRpIjoiYzNiMDQxNWMtOTcxOS00OTc2LTkwNmUtNmZjYzc3ZmY4ZThjIn0.mdAoh0IPnbo3ePIKhP1kboULuxumpkiTHRYtKjIqhDmVMgJtJwgvMgNzFMsNn1Z26R3-XlVhWWTd9nOMaeIqFw
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
    ]
  },
  "iss": "https://issuer.beta-exchange.example",
  "aud": "https://beta-exchange.example/data-holders",
  "iat": 1781222908,
  "exp": 1781226508,
  "jti": "c3b0415c-9719-4976-906e-6fcc77ff8e8c"
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

*Generated 2026-06-12T00:08:28.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*