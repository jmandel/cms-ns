# Key rotation

*Worked example for [the record location and data access write-up](../authorizing-access.md). The app publishes key B alongside key A, then signs with the new kid; data holders resolve it at the live jwks_uri with nothing to re-issue.*

**JWKS before rotation:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "rweBdrluQGrpIPURg7uthcf38SVnm7sv4mDa1G35_vzDsbW72xGJZKWc5KvZx9vYhJzuuSlfaM1VARdZQcs5t99xCpbV9jC4mPA1FK21c6OXTSz4lBMiWZiBbNDcRuMNMCx_leUKirkOlz6E7DEVB3yqQRxl2xpeEqIcZqhmFJkhXn2vBE0kDiVP9dNhxzYxu45-PzQn1J2XHTBlil8K8KsSADM2b__YwVIbk_6LkhpJWwe71kG_bINVuvBUSAsOwK8mylLmYHpgQbG2AnhaopjmT1GOpddEayLP3JK0nvxFIL0uMyfrGPSf9nWHZa2nuStvB2FCSnFE_gUhhs92Nw",
      "alg": "RS384",
      "use": "sig",
      "kid": "d7-ZR9YVxyceybmFmLd2neNVusoWmKrS4am5ZgJ0ado"
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
      "n": "rweBdrluQGrpIPURg7uthcf38SVnm7sv4mDa1G35_vzDsbW72xGJZKWc5KvZx9vYhJzuuSlfaM1VARdZQcs5t99xCpbV9jC4mPA1FK21c6OXTSz4lBMiWZiBbNDcRuMNMCx_leUKirkOlz6E7DEVB3yqQRxl2xpeEqIcZqhmFJkhXn2vBE0kDiVP9dNhxzYxu45-PzQn1J2XHTBlil8K8KsSADM2b__YwVIbk_6LkhpJWwe71kG_bINVuvBUSAsOwK8mylLmYHpgQbG2AnhaopjmT1GOpddEayLP3JK0nvxFIL0uMyfrGPSf9nWHZa2nuStvB2FCSnFE_gUhhs92Nw",
      "alg": "RS384",
      "use": "sig",
      "kid": "d7-ZR9YVxyceybmFmLd2neNVusoWmKrS4am5ZgJ0ado"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "uXOCXS4iD8e0xfk9T8HTtyTY4mZ034TvSkmZr1XYq1T79nbZnFwTglC0uBBHXUMuz_PFQAMHpz6BU_BmbK7Saw3u0u9OmFVxJerrT4PL2eo5GZt0nBQRzkBpjpJpuGDpYlbQLNbV8ovUhPL_xijPgPUEtDWcGvvXhlLJ_VgqkODlXLoW89-LDzX3ukhgem8wmcvhYHx1QwhWGAdFyHGtZSHaCAmHZf5T_dnJIDSm0wLCCuDpV5AIMv29nwHwWpTyFvLG2znVKBUjgYA9rZFgizCz_VUOhVZ5fgFFNnnEPdX3GMtJFkKobnpbZ0cZITFQA9SmkqqGTfAh47ZnJdtxuw",
      "alg": "RS384",
      "use": "sig",
      "kid": "3FvbhIW0H-MJTAdnEluFmzbbEBl2D-2uNkkot6fXWzo"
    }
  ]
}
```

---

First token request signed with the new key; note the `kid` in the header now matches key B:

**client_assertion signed with key B** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IjNGdmJoSVcwSC1NSlRBZG5FbHVGbXpiYkVCbDJELTJ1Tmtrb3Q2ZlhXem8iLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5OeVlUWTNka0V5TFVSeVVVeGZVRjluUlZCeVFVcDNUR3RMYURBNVJFMVZUa0ozWXpKRE5sQTNjMjhpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlOVEl6TUN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SW1JM1lXUmxPREZtTFRaa1pURXROREV4WlMwNE5qTTBMV0l4T1RrNU5qZGxabVF6WkNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlOVEl6TUN3aVpYaHdJam94TnpneE1qSTFOVE13TENKcWRHa2lPaUl4TVdaaU1tWXhOUzFqT0dVM0xUUm1aamd0WVRZek5TMW1aV1ptTkdOa1l6VXdNakVpZlEucWs0MnlYdmhBZkpha1R3THBwc3RRc1ktSkVuejk5azZHbVFvR1BlTy01OXpmcnNxV1lsWjZrN25GUFJSS3pCUm4xTjgxQUV4NE1Ha2czekJ4OXA5WTVLelViTTM5VlpKWVBDQlhhQlMxN2FUX3Q4TzVsRDJ1VXJhNmhGQWp2dVhVMHVYV2NTR2hReTdYMVB0WlE3Um1lUlVValJJa1k2RUYwUnJaLUkyUDVLSWFDUVA0dVBGMVBJeGQtZ2ZEX1plZjBnRVRuVkItRTlQZnJSVG1qVkJhdkhMdmFiajZGTEVrV1BmaFdLTFhjOHY3U2Z5dEZ3ZUhJbktuU1BWeW1WcVJKYWVnOXY1VC1sQnFKZ1Q5Tk1DajBQSWlFSmh6M252Wl9MdzJEWFhCa29rcjFLYjMzLXpPVFdPZUV4RHB0VHV3aUJneTlxMFdSeVh4UU50VFJUMWR3In19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyNTU5MCwianRpIjoiODg0MjQyZjktMDQ4YS00NTM3LTkzM2UtZDljZTliMTg1M2ZiIn0.SpsI_v_Z021Z4zDvuJKWBtYTJY_JQeeVLf-Ra4oN-TcaamcjXjevSw0BTwpSiFlbk7B1-jpn_Aipl9CfxNA63YFaW_DxYWeCzOHbm5DH5pwHit3OceHEAYQj0RjT45-mM3n80ON1tJe4vmMXFAwlvQxEuSsU-zOYgqPrmivUAJQNhXBNBcyfdPTttP6-66qDI_ReIqSOabFUf4a5etA8dw94A-G70A3V0_eIwoWTFQlP0a1GFxHlhn85_3QW3NvtZ4qct5AEDRgWbvVaoHnfQIQLjyvbkAZMz2XpFy1TOB4LFwQAAoedtB92y5yGkhfHKve-0Pl9DQ8TtBY7mmhpAg
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "3FvbhIW0H-MJTAdnEluFmzbbEBl2D-2uNkkot6fXWzo",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InNyYTY3dkEyLURyUUxfUF9nRVByQUp3TGtLaDA5RE1VTkJ3YzJDNlA3c28iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNTIzMCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImI3YWRlODFmLTZkZTEtNDExZS04NjM0LWIxOTk5NjdlZmQzZCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyNTIzMCwiZXhwIjoxNzgxMjI1NTMwLCJqdGkiOiIxMWZiMmYxNS1jOGU3LTRmZjgtYTYzNS1mZWZmNGNkYzUwMjEifQ.qk42yXvhAfJakTwLppstQsY-JEnz99k6GmQoGPeO-59zfrsqWYlZ6k7nFPRRKzBRn1N81AEx4MGkg3zBx9p9Y5KzUbM39VZJYPCBXaBS17aT_t8O5lD2uUra6hFAjvuXU0uXWcSGhQy7X1PtZQ7RmeRUUjRIkY6EF0RrZ-I2P5KIaCQP4uPF1PIxd-gfD_Zef0gETnVB-E9PfrRTmjVBavHLvabj6FLEkWPfhWKLXc8v7SfytFweHInKnSPVymVqRJaeg9v5T-lBqJgT9NMCj0PIiEJhz3nvZ_Lw2DXXBkokr1Kb33-zOTWOeExDptTuwiBgy9q0WRyXxQNtTRT1dw"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781225590,
  "jti": "884242f9-048a-4537-933e-d9ce9b1853fb"
}
```

---

After the overlap window the app removes key A from the JWKS. Nothing else in the ecosystem changed: the CMS statement binds the `jwks_uri`, not a key. For network-issued certificates, the synchronization rule in [Keys over time](../authorizing-access.md) applies.

*Generated 2026-06-12T00:48:10.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*