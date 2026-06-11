# Phase 5 — Key rotation

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The app publishes key B alongside key A, then signs with the new kid; data holders resolve it at the live jwks_uri with nothing to re-issue.*

**JWKS before rotation:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "wD4dFhN6vSo-2eX8UKjC_rnuXHsO2v2Ex57AVLxCkErGKv9JZvKooZ6HxRYQ0sDRTFPyjPN38N-H82RVBO4TUjbMbIqfD_Rab7vsWaTYpegCG_Um5Ca_kyS4CTtKSGyT4DhMswYhQi1MIlFC6z8VeXxjVpUvnOJdtPaez2CK9JfRxtxA4jEG-gP0TQnX6cyGLZUz5VxplwFMQpodAE2W0gHQQL5te6_aSED6YFrOYMx4ma0rGyL5hYgSIDlmnOZuyY4i4rLJZLSHj7K-AgF3f3bz70wOek5C6BzzvecP2Q9IxN4I8Zhr960UulroRd-tY6tngkkf7_9Vits8gElEbQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "41xs7a8VWhHZQQmwY9Rk0RnGKjB7Iwy0Cpx-VSVDSIk"
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
      "n": "wD4dFhN6vSo-2eX8UKjC_rnuXHsO2v2Ex57AVLxCkErGKv9JZvKooZ6HxRYQ0sDRTFPyjPN38N-H82RVBO4TUjbMbIqfD_Rab7vsWaTYpegCG_Um5Ca_kyS4CTtKSGyT4DhMswYhQi1MIlFC6z8VeXxjVpUvnOJdtPaez2CK9JfRxtxA4jEG-gP0TQnX6cyGLZUz5VxplwFMQpodAE2W0gHQQL5te6_aSED6YFrOYMx4ma0rGyL5hYgSIDlmnOZuyY4i4rLJZLSHj7K-AgF3f3bz70wOek5C6BzzvecP2Q9IxN4I8Zhr960UulroRd-tY6tngkkf7_9Vits8gElEbQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "41xs7a8VWhHZQQmwY9Rk0RnGKjB7Iwy0Cpx-VSVDSIk"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "nuTfTmZn3vtDmOhLX_rISPBZ0oLbgEApUTwyN13uhg-XPfq_zspW9YEZG9tPLF0Jf6zBwMdwX334F1pC7D_znzPtlyj5pXWQYFKz8YBAOaoFH-uRPCdXb1_j87zC0FhkmDG-SrJw6LfBT7asvmkU9Y3imK-6kwAHxuL6S63-MbMyrj6VbspleKWMBy53oK3JN9e2aup12_eyIuquA9PJX4ski7kCF-S_ORqpH3jdsH5mjbPuk9TeduO1Qeq-cSSqtjCxLK9O1eaMfeOtBkVPPJ5hIkSRQwsz_8HEhkvp6Vf6V27s-weGVat8bkmjDzW4BLkncq8xiezlXRQrLlPILQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "58wB0oQ1tUjHWPQv28IdIkaDa4dlogwBgbjTlN8dA5w"
    }
  ]
}
```

---

First token request signed with the new key; note the `kid` in the header now matches key B:

**client_assertion signed with key B** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6IjU4d0Iwb1ExdFVqSFdQUXYyOElkSWthRGE0ZGxvZ3dCZ2JqVGxOOGRBNXciLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWsxNFVqSm1jRlZCTVRGUGNURnlhM05UTlV0SVgxTnJOVXRpY0VSQ2JtUk1ibGszYlU4MVNHNUhSVlVpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhOREkwTkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWprME9EZG1NalptTFRVek1XWXRORFUzTmkxaE56STNMV0V5TXpGaFpHVmlaRFF6TUNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXhOREkwTkN3aVpYaHdJam94TnpneE1qRTBOVFEwTENKcWRHa2lPaUkxTjJWaVl6aGtPUzAwTjJFNUxUUTRPVGN0T1RVeE9TMDNOR0V3T1RoaE1EZ3dNbUVpZlEuVDBrZmNMWXVrcWs0dFppVU95YmhXelZaWWlVRGZZbTNUZDBRY29zNFFITWQxcDhwNUtNYTltalNlcldIMTIyS1EzUlhnVHVEbEhySW8wNmxnck9heFhFRkU2ZFZhZU56ZTc3TUJDSEZFRkRmc0wzcnFsNF8ybFhISHZUNXhNVG9BNWN3OXV3dnNXbFpqbDRDQWdlOUFDdFJ1WG14anhUbTcwUlZJVjQ1Z2o5bGstcE9fd200cVdUNDFDc1FDRWY2NU1QNEU5OHA1eGVYSlZ3dVlmQndTOUhzWFFkVXF4TllOVWRNbk8wSzFHalN1cjBwVUtfamlwQ2dUbUZGYVJMcGdWdkxEbWtBZXdXTDBRcUpaS2lvYmpNZXJSeTQtWTg0aDdySHA1QmtBeUZLLXJfV1o1UkJleERXMHNLWGdFUVBLNG1tRFJ1cnFuX1dzRVpfQkwxYjB3In19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIxNDYwNCwianRpIjoiMGI3MzA2MjktNDIyNi00ZmQ0LWJkMjctNTdmOWJlMDY4NGVlIn0.kcsDTVmPyOrs-lz573J3bli99fdk6rJ1zw-iwjdwDCCCATmT2tEdr4FEFsK028V_m_HMKcyjiTWmmZ-VeA2H_qlBLQ7NIfJB8qf-eiwGRIvVydtM72wkAxXuq_oHLPx3cPC1pgUHfzqgmMWqrs56FVhLVyP3dGmqF5xAoT2M68nKQ2aGjTAJ6ldaBfe1ExKms13N4oeKE1h0ILqFoNg9seVoiQv4c2gu2E3cyxyoCKR3cM9Yt48KzhjkExqWXFOZzIfd-i_1lNaO0oPp5kZbJiq-jMNuQBnoEKaNj__gYF5Xb1aH-trtZ33xRWWtM7EgjTzNLomRmhH2-UQtcvVziw
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "58wB0oQ1tUjHWPQv28IdIkaDa4dlogwBgbjTlN8dA5w",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ik14UjJmcFVBMTFPcTFya3NTNUtIX1NrNUticERCbmRMblk3bU81SG5HRVUiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxNDI0NCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6Ijk0ODdmMjZmLTUzMWYtNDU3Ni1hNzI3LWEyMzFhZGViZDQzMCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxNDI0NCwiZXhwIjoxNzgxMjE0NTQ0LCJqdGkiOiI1N2ViYzhkOS00N2E5LTQ4OTctOTUxOS03NGEwOThhMDgwMmEifQ.T0kfcLYukqk4tZiUOybhWzVZYiUDfYm3Td0Qcos4QHMd1p8p5KMa9mjSerWH122KQ3RXgTuDlHrIo06lgrOaxXEFE6dVaeNze77MBCHFEFDfsL3rql4_2lXHHvT5xMToA5cw9uwvsWlZjl4CAge9ACtRuXmxjxTm70RVIV45gj9lk-pO_wm4qWT41CsQCEf65MP4E98p5xeXJVwuYfBwS9HsXQdUqxNYNUdMnO0K1GjSur0pUK_jipCgTmFFaRLpgVvLDmkAewWL0QqJZKiobjMerRy4-Y84h7rHp5BkAyFK-r_WZ5RBexDW0sKXgEQPK4mmDRurqn_WsEZ_BL1b0w"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781214604,
  "jti": "0b730629-4226-4fd4-bd27-57f9be0684ee"
}
```

---

After the overlap window the app removes key A from the JWKS. Nothing else in the ecosystem changed: the CMS statement binds the `jwks_uri`, not a key. For network-issued certificates, the synchronization rule in [Phase 5 of the walkthrough](../app-connectivity-flows.md) applies.

*Generated 2026-06-11T21:45:04.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*