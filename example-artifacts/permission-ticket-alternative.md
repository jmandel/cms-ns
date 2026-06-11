# Alternative shape — a signed permission ticket

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). In the SMART Permission Tickets model (proposal 003), the patient authorizes once at an issuer via a SMART App Launch code flow; the token response carries tickets like this one plus endpoint hints. The app redeems the ticket at each data holder's token endpoint via RFC 8693; the data holder verifies the ticket, independently verifies the embedded identity evidence, matches the patient locally, and issues its own token with the matched id.*

**Permission ticket — note subject demographics, the embedded IAL2 id_token as subject_identity_evidence, and the presenter binding to the app's key** (compact JWS, really signed):

```
eyJhbGciOiJFUzI1NiIsImtpZCI6Inlqb09NbXR1Y2lvVzNRa2M4c1hqbExPVTVkUFFSVnV3UHZPR0F4blgteTgiLCJ0eXAiOiJKV1QifQ.eyJ0aWNrZXRfdHlwZSI6InBhdGllbnQtc2VsZi1hY2Nlc3MtdjEiLCJzdWJqZWN0Ijp7InBhdGllbnQiOnsibmFtZSI6W3siZmFtaWx5IjoiTG9wZXoiLCJnaXZlbiI6WyJNYXJpYSJdfV0sImJpcnRoRGF0ZSI6IjE5NjItMDMtMTUifX0sInN1YmplY3RfaWRlbnRpdHlfZXZpZGVuY2UiOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWw5WmRUY3laemRMVVVST2MyZExWVTQ1YlROS2JXMTFkRlJ0VmtkcFRGcHJMWGRsYjNaNk5tRkRSazBpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1URTVPREk1TWl3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpNNE5EZ3hPREZsTFRVelptVXRORFl3TWkwNU5EYzVMV0ptWW1Oa05UZzRPV0ppTmlJc0ltRjFaQ0k2SW1Kd0xXSjFaR1I1TFdsa2JXVXRZMnhwWlc1MElpd2lhV0YwSWpveE56Z3hNVGs0TWpreUxDSmxlSEFpT2pFM09ERXhPVGcxT1RJc0ltcDBhU0k2SWpSaVpXSXdOV1V4TFdVMllqZ3ROR1prWXkwNE56UmhMVFppWW1Nd1pEZGpOVGxqTVNKOS5rQldaWEhIcU1UMTMzMUxlVG4tQ0hVSURNbGNLWVR6ZUFHU0pIOG5KWUtyTDc0Z0FQbjhQS3ZFcmtYR1k0MFE2aUtzU0U0S2Q1V3RZemZ5VVI5Q0dKbDBKWEUwODYwakhMUE9tQXg3OFNJU1gyUGFRYUhzZEZtaHVOb0g1MW9zeF9IM3l1WHpQYzZyVG5ndzZ6N0lpVUcwcEtCcTBaaWFvcFduVDJOcDlmZjRFcWQ1OU93c1BCalBRWkxtZWtwUkc4Vlp1Zm00YUJPTjlYOEMySzFuNmhyVEVUR2J3NUlaNlpZVnJXQVE3NUdaaDZjRlB2bldiMmMyWHFMeGZLY1NfcXFEMktacXFMZGo3Q21sVDI4VlE4cm5ieUJ4UFoydHJEWkJlRHhFSXBaNEpRYXZ5eTFJaVJ5dV9xTHg0QWVKelJibjREc1FFZmx1NUw4QWs0VzN6bFEiLCJwcmVzZW50ZXJfYmluZGluZyI6eyJqa3QiOiJpMmE5ZWw5ZEs2aHhLd0Z4TkctWFpvM1Y4bUdaaUw5cGtaYi13c0J3emljIn0sImFjY2VzcyI6eyJwZXJtaXNzaW9ucyI6W3sicmVzb3VyY2VfdHlwZSI6Ik9ic2VydmF0aW9uIiwiaW50ZXJhY3Rpb25zIjpbInJlYWQiLCJzZWFyY2giXX1dLCJkYXRhX2hvbGRlcl9maWx0ZXIiOlt7Im9yZ2FuaXphdGlvbiI6Ikxha2VzaWRlIENsaW5pYyJ9XX0sImlzcyI6Imh0dHBzOi8vaXNzdWVyLmJldGEtZXhjaGFuZ2UuZXhhbXBsZSIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9maGlyIiwiaWF0IjoxNzgxMTk4MzUyLCJleHAiOjE3ODEyMDE5NTIsImp0aSI6ImIwOTdkN2RkLTY2YmItNDdlOS05MjllLTEyOTEzZjY5MzJmYyJ9.NSBGBvoweKL0FGJhddIijJKfkLzuY_pX3t2gHNQpPWj0Z_RU1SMynvUb3GmJMBdic89XKkf_vFfrlrceVQi6Aw
```

Decoded header:

```json
{
  "alg": "ES256",
  "kid": "yjoOMmtucioW3Qkc8sXjlLOU5dPQRVuwPvOGAxnX-y8",
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
  "subject_identity_evidence": "eyJhbGciOiJSUzI1NiIsImtpZCI6Il9ZdTcyZzdLUUROc2dLVU45bTNKbW11dFRtVkdpTFprLXdlb3Z6NmFDRk0iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTE5ODI5MiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjM4NDgxODFlLTUzZmUtNDYwMi05NDc5LWJmYmNkNTg4OWJiNiIsImF1ZCI6ImJwLWJ1ZGR5LWlkbWUtY2xpZW50IiwiaWF0IjoxNzgxMTk4MjkyLCJleHAiOjE3ODExOTg1OTIsImp0aSI6IjRiZWIwNWUxLWU2YjgtNGZkYy04NzRhLTZiYmMwZDdjNTljMSJ9.kBWZXHHqMT1331LeTn-CHUIDMlcKYTzeAGSJH8nJYKrL74gAPn8PKvErkXGY40Q6iKsSE4Kd5WtYzfyUR9CGJl0JXE0860jHLPOmAx78SISX2PaQaHsdFmhuNoH51osx_H3yuXzPc6rTngw6z7IiUG0pKBq0ZiaopWnT2Np9ff4Eqd59OwsPBjPQZLmekpRG8VZufm4aBON9X8C2K1n6hrTETGbw5IZ6ZYVrWAQ75GZh6cFPvnWb2c2XqLxfKcS_qqD2KZqqLdj7CmlT28VQ8rnbyBxPZ2trDZBeDxEIpZ4JQavyy1IiRyu_qLx4AeJzRbn4DsQEflu5L8Ak4W3zlQ",
  "presenter_binding": {
    "jkt": "i2a9el9dK6hxKwFxNG-XZo3V8mGZiL9pkZb-wsBwzic"
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
  "iat": 1781198352,
  "exp": 1781201952,
  "jti": "b097d7dd-66bb-47e9-929e-12913f6932fc"
}
```

The `subject_identity_evidence` value is the same CSP-issued id_token shown in [phase3-rls](phase3-rls.md); the data holder verifies its signature against the CSP's keys itself rather than taking the issuer's word for it. `presenter_binding.jkt` is the thumbprint of the app key in [keys-and-trust-anchors](keys-and-trust-anchors.md).

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
  "subject_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6Inlqb09NbXR1Y2lvVzNRa2M4c1hqbExP... (full value above)",
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
  "access_token": "mmll2FWVGbo0s_02e8OZ3228hByetD94",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "patient/Observation.rs",
  "patient": "lakeside-449210"
}
```

*Generated 2026-06-11T17:19:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*