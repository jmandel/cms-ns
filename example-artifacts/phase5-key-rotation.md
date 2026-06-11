# Phase 5 — Key rotation

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The app publishes key B alongside key A, then signs with the new kid; data holders resolve it at the live jwks_uri with nothing to re-issue.*

**JWKS before rotation:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "0FxvXhpTaI3UQDl0xL6jny64877K6pbe7yCD-Dl6tQnbYiwNBZQDFZ2rRj5ITO2IqX_2TTyMWCyZMSHr4x7kiG2AWVQ84M6QKPp4nlnpzPrjPdC4nEWJx9VxkBk30OO05zlfhdTy4u-LiGDvSDbR_YIPDiPKBYLAq7asE4kKebmCFxvprA43gs5FW68VqVYG8LkTUl66LwN0Yy-LyAPlgQZmDnhKdi1mFGU7gvT0CC3GXIRakRQbhTu08tNAroNbeRbfda6iaajmtdyv47P3vnYGbV7V_Fj1TiITSif4Lww9DM09gd6RgZ-SmP1Z2x10byd2iADvWvSQA6JRg0EeTQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "BATFzWKXJbAYS8z_8gGOxzScaZbXbejqmNFJVL1eg1A"
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
      "n": "0FxvXhpTaI3UQDl0xL6jny64877K6pbe7yCD-Dl6tQnbYiwNBZQDFZ2rRj5ITO2IqX_2TTyMWCyZMSHr4x7kiG2AWVQ84M6QKPp4nlnpzPrjPdC4nEWJx9VxkBk30OO05zlfhdTy4u-LiGDvSDbR_YIPDiPKBYLAq7asE4kKebmCFxvprA43gs5FW68VqVYG8LkTUl66LwN0Yy-LyAPlgQZmDnhKdi1mFGU7gvT0CC3GXIRakRQbhTu08tNAroNbeRbfda6iaajmtdyv47P3vnYGbV7V_Fj1TiITSif4Lww9DM09gd6RgZ-SmP1Z2x10byd2iADvWvSQA6JRg0EeTQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "BATFzWKXJbAYS8z_8gGOxzScaZbXbejqmNFJVL1eg1A"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "t8yMzKE78KXB8_BIF6220kNkoX-nJ6eZvKkgCVkAobgztI_LIp168itS-efV20uIiXcSzEF_0cau7w9XkS_ncBmBgb6n7zJydlvBvDGlqmK9N7OaHF3c2sqTQ8bxMyAt44OXQY_VqEcj8xtPVhCThKCQMiV91VW8IVs8f9U5Rv-QGsx0myuZBYc2QnkSIA75g6W4pz-7K1fSa470IHo2f9-HeAToQn7p6zm0y7zAgV3JO-i8v6hFjnhkqyyu1HZCCTWP82vkd3FfzQOJKrQbCjx3k2uSGscqDWuDgLWeFlt934tW3-WqwAcKoYHwKCGtw9FHtqYqNIXMO5toV9lL7Q",
      "alg": "RS384",
      "use": "sig",
      "kid": "mar_FGJumy1fDhsYINoVW479fOHspykitcSJGNaLe5M"
    }
  ]
}
```

---

First token request signed with the new key; note the `kid` in the header now matches key B:

**client_assertion signed with key B** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6Im1hcl9GR0p1bXkxZkRoc1lJTm9WVzQ3OWZPSHNweWtpdGNTSkdOYUxlNU0iLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWpOWE9WUXhRMVZmTW5oWFMwRnVMVzF6VWpGVFRtSktaa3BPVFRWT1pXeEhPR3BpTm1sVlRGTTJWamdpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhOalF3Tml3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpCbE56VTRPVEJtTFRrelpUSXROR0V3TVMwNFpXVTRMVEZqTVRVek9XUmhZakEwTlNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXhOalF3Tml3aVpYaHdJam94TnpneE1qRTJOekEyTENKcWRHa2lPaUl6T1dNeE9XWXdNeTFrWVRsaUxUUTJPV0V0WVRrNU5DMWxOakk1T1RRMlpERXhNR1VpZlEuQkEtaVFRU184Ukh0VXlveXEwLVd6cERYbXBTUGx6NTNablhzOTlvWmxqUjdveTVCeExBQUE3S085TnlnMTdTcW1aSDNfd0VBUzF3LTZFRWZOVjh1UU12MUFTekFsSnVxREpfbzVQRUhLUXFjam4wWGZRNTh0SmR5VHNJQW1kUmN0TVBTaUUzT3daRnpyVXZOamVjanMwWVlaaW10dzBaZFE5M04wbWpGMW4xUjZjOVNVRG1TVVQwbl93Mnp4akd2di0zbEpueFluRkxISXNmbHdtbUdZT1lLWGJLR1FrSnQxT0lPTkpOdVJIek9yWGlUQ3hyTERZakU4QkpBU3g4dWF4Z0JuWGdrM3o0alVuYXhUejBqT3hVVGhLLXFaQ0h2ZDEwLU96RS1pM0sxSC1BT293d1d2MU5iQzMxXzQ2WEhLcGZ1SDBwQnNsYnh5YThlNDUyQzNnIn19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIxNjc2NiwianRpIjoiODYyMTQ4NzYtMDk0Mi00ODQ1LWE0NjEtOGNhNzkwYzQxM2QwIn0.bJ3Zb7lucCXet5tqZC1ze74Ep-Ox0bnKWa-Tpz49fEr5XwbY501wvoH4v2Edty00BLkUP3zfFPpuW6WnoxAZEwKWK8gQ6CrQfpHK6Guhm_CXRoIB-ySZq4VIIvPfrIIwRkBiSMXbSelZQ9BaLt5vAmJt3J6cVphhXdfn-US6nAsXGrhqRB2GB8nqSgbMt0s_uoGnSnNORjsAaQfwSb4310bXiZiW44d9L1ctCYEwo5yY04zS_JQKROR0CdLll7eOylOFKQCE_XGH3Egjxra2vGzzWZdmsjrnNYccdMuNsvtmFXtadUPPzR6LJQlZ5ESBNr1T-YINmULeFkoOvqxZJA
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "mar_FGJumy1fDhsYINoVW479fOHspykitcSJGNaLe5M",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNXOVQxQ1VfMnhXS0FuLW1zUjFTTmJKZkpOTTVOZWxHOGpiNmlVTFM2VjgiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxNjQwNiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjBlNzU4OTBmLTkzZTItNGEwMS04ZWU4LTFjMTUzOWRhYjA0NSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxNjQwNiwiZXhwIjoxNzgxMjE2NzA2LCJqdGkiOiIzOWMxOWYwMy1kYTliLTQ2OWEtYTk5NC1lNjI5OTQ2ZDExMGUifQ.BA-iQQS_8RHtUyoyq0-WzpDXmpSPlz53ZnXs99oZljR7oy5BxLAAA7KO9Nyg17SqmZH3_wEAS1w-6EEfNV8uQMv1ASzAlJuqDJ_o5PEHKQqcjn0XfQ58tJdyTsIAmdRctMPSiE3OwZFzrUvNjecjs0YYZimtw0ZdQ93N0mjF1n1R6c9SUDmSUT0n_w2zxjGvv-3lJnxYnFLHIsflwmmGYOYKXbKGQkJt1OIONJNuRHzOrXiTCxrLDYjE8BJASx8uaxgBnXgk3z4jUnaxTz0jOxUThK-qZCHvd10-OzE-i3K1H-AOowwWv1NbC31_46XHKpfuH0pBslbxya8e452C3g"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781216766,
  "jti": "86214876-0942-4845-a461-8ca790c413d0"
}
```

---

After the overlap window the app removes key A from the JWKS. Nothing else in the ecosystem changed: the CMS statement binds the `jwks_uri`, not a key. For network-issued certificates, the synchronization rule in [Phase 5 of the walkthrough](../app-connectivity-flows.md) applies.

*Generated 2026-06-11T22:21:06.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*