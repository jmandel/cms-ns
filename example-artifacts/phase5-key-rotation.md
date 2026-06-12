# Phase 5 — Key rotation

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The app publishes key B alongside key A, then signs with the new kid; data holders resolve it at the live jwks_uri with nothing to re-issue.*

**JWKS before rotation:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "xyfY-Xwh38-rBxkJGU5QcFP4HFny_41ikwgEtFgFggJZT_LsAneh6SCI32ofDsn4aVts9uRjt9Jjt5RLueRtJeTQZjnp5NuTY8y9l2nbay2jeDQyqCw6P67e9vZ0qlgaW4XXECgJ8mvzECbxU84eYx8XpLrkpILz90bOXF-iHYktdh9QQpJQB6FZRFuns5yfTIcLfAVw85aEJ66RXOM14_IFSRSCRqAbgq9caCct8u3WJ00SSlx3uErxc8sK_Uv08Hf0WIobI69PjdRqTVRPF0HyGAQ6CbmlHq412R6GY3UYCrynfSg9wiqOwNF4ogh-W5NQbQSsFFkgSaa_rZDmdQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "5Tibdcu84J2NAVk05fzB38EMQthRFYlPzg3hFxRH01A"
    }
  ]
}
```

**JWKS during the overlap window (key B published alongside key A):**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "xyfY-Xwh38-rBxkJGU5QcFP4HFny_41ikwgEtFgFggJZT_LsAneh6SCI32ofDsn4aVts9uRjt9Jjt5RLueRtJeTQZjnp5NuTY8y9l2nbay2jeDQyqCw6P67e9vZ0qlgaW4XXECgJ8mvzECbxU84eYx8XpLrkpILz90bOXF-iHYktdh9QQpJQB6FZRFuns5yfTIcLfAVw85aEJ66RXOM14_IFSRSCRqAbgq9caCct8u3WJ00SSlx3uErxc8sK_Uv08Hf0WIobI69PjdRqTVRPF0HyGAQ6CbmlHq412R6GY3UYCrynfSg9wiqOwNF4ogh-W5NQbQSsFFkgSaa_rZDmdQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "5Tibdcu84J2NAVk05fzB38EMQthRFYlPzg3hFxRH01A"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "zMKxiunqrV33UyRYdAT8lfp-miKHix_qMU5hNVIs6oRPOdjCNyGkqsnTiuUSuSRQWn7SRmdz7VzPVSXrgk8AbuK7HAU0S_mWgl7qfH0XhPSd-BErQ2pZ5Em4dpluKMtGgNtfEjoZRgR4gWQscjMaiiSf9V-Vp8aRIsCzCEDVXGNVdeq1Dq_bKd09ehtJt6jrGxhtiL3Uvpi0W_57oSkH8XHJaKjJDg0-0eR-2d4aNVjH6KWJ7Cs48vScbaaL3cCcoM5cETMy4BSPu0REKlRHVjJzdOVxzj3nk3SRMbXZOODCbfyuLAE2cKnUPGdp_r14MWwuDjmya0YGGXVYAHAZhw",
      "alg": "RS384",
      "use": "sig",
      "kid": "jhlN2zgTU3grmGGCnS8bprE4AoUUhHmQxk8ZJ45tLG4"
    }
  ]
}
```

---

First token request signed with the new key; note the `kid` in the header now matches key B:

**client_assertion signed with key B** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6ImpobE4yemdUVTNncm1HR0NuUzhicHJFNEFvVVVoSG1ReGs4Wko0NXRMRzQiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxGYU0wNUlZVU4yZFRBME5uZERhR2w1WmtwNlNrTlFZa3d0TVhOeVpESkJVRXR3VGxJM1VISmljMDBpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNamcwT0N3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpGaU9XRmhPR00zTFRSaU1UTXROR0U0WlMxaU5UWXhMVFptTmpsa05qWXdPV1kzTWlJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlNamcwT0N3aVpYaHdJam94TnpneE1qSXpNVFE0TENKcWRHa2lPaUkyTmpneFlXTTRZUzFqTlRKakxUUmhZekV0T0dGbVl5MWhZVGszTnpsbFlUQXlOek1pZlEuZEQwdlU1am5CLUozZl9MdEl4ZTJIcnNmd1FiQmprYVNBM2JtUnRMcUFIQ0ZwQ3ZPdVBUMlA0WlZqMVFkVEFiMlRtZXY2WkNteEVqTWdVMEFtdnZBTXB2WDVNZXR0S0Jtb0ZVRVZaelBzdjA5MXpSaDZxSDNmTEpSbTVLbnNlZDFfZU9vQndFSmRwZ3U1aThNVHdYQ04tbzNITHREWFhWU2ZuaXBJcVJBTHlIODcyeThvakJlaFVTRC1GdndlbzRIQnhlYVR0OWgxVXAxNkl0TzVGZGVCZDdTaVdDUHNfQmhsNUhLQm9qNko4RXE3RjVKUkItRU4zMWJma3FiLVZtZFRoakx1djBmRkhrbW1teUFpTzhiNjQ5Y3VNTjBHR2U4d3RRWHk3VU9HXzlORDZKOThNYndhX2d4VzVibnZveWo3YVhqU3h6alV3bktVdGk5dmhTcFpRIn19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyMzIwOCwianRpIjoiMWYzZTBhYmItMzdiMC00ZGQ0LTk0ZjItODM0MThkNDI5ZjY1In0.TqakrjqmrbP2uDoU5OvzTJ75InuMtbOx4OLrs0mjf2DqTp_pa3Czv05aj6vtipWMc6v2HnIxF4yEZ2bfcMwQ86ja1tMQEnCBOdEl7oXf8oQ7AD3ahrcLINtFx4DY4owqprblhesqcq9qUtk8L2LEAHAgclC-5z25oISSu-ZsAyyza1r_NaWrm43atXSiDFpRZE3nOyTFLYxSV73WTBMXJCE0vF3C8SU9GJQ440ZL6_nnkAQx4BxAKWNYK0WJQ1ARtlmSApPCiKLy5uco7sOGcYN93yT_G3BSGWqSO7z9bFoi1ya_GkZDfLzJISeqdQ2XRf-4QPVIS6wfYaemuXg-bA
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "jhlN2zgTU3grmGGCnS8bprE4AoUUhHmQxk8ZJ45tLG4",
  "typ": "JWT"
}
```

Decoded payload:

```json
{
  "extensions": {
    "cms_smart": {
      "version": "1",
      "purpose_of_use": "PATRQT",
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlFaM05IYUN2dTA0NndDaGl5Zkp6SkNQYkwtMXNyZDJBUEtwTlI3UHJic00iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMjg0OCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjFiOWFhOGM3LTRiMTMtNGE4ZS1iNTYxLTZmNjlkNjYwOWY3MiIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyMjg0OCwiZXhwIjoxNzgxMjIzMTQ4LCJqdGkiOiI2NjgxYWM4YS1jNTJjLTRhYzEtOGFmYy1hYTk3NzllYTAyNzMifQ.dD0vU5jnB-J3f_LtIxe2HrsfwQbBjkaSA3bmRtLqAHCFpCvOuPT2P4ZVj1QdTAb2Tmev6ZCmxEjMgU0AmvvAMpvX5MettKBmoFUEVZzPsv091zRh6qH3fLJRm5Knsed1_eOoBwEJdpgu5i8MTwXCN-o3HLtDXXVSfnipIqRALyH872y8ojBehUSD-Fvweo4HBxeaTt9h1Up16ItO5FdeBd7SiWCPs_Bhl5HKBoj6J8Eq7F5JRB-EN31bfkqb-VmdThjLuv0fFHkmmmyAiO8b649cuMN0GGe8wtQXy7UOG_9ND6J98Mbwa_gxW5bnvoyj7aXjSxzjUwnKUti9vhSpZQ"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781223208,
  "jti": "1f3e0abb-37b0-4dd4-94f2-83418d429f65"
}
```

---

After the overlap window the app removes key A from the JWKS. Nothing else in the ecosystem changed: the CMS statement binds the `jwks_uri`, not a key. For network-issued certificates, the synchronization rule in [Phase 5 of the walkthrough](../app-connectivity-flows.md) applies.

*Generated 2026-06-12T00:08:28.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*