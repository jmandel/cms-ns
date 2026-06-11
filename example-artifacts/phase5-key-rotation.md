# Phase 5 — Key rotation

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The app publishes key B alongside key A, then signs with the new kid; data holders resolve it at the live jwks_uri with nothing to re-issue.*

**JWKS before rotation:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "5fnpU0t0n74UPG4_VWEq81qe0kzmnsB35Xnoai1tH0yM9ywM4ZENi7DrcrYhfzJhHchg859FMHOy9FUBIbbYs5yZ8Y-UtjsFDK7pz3N1D8YBvqmLitypUmOObywQxN2tE0zIz_IE2eovIYrOIa50aGHfG164UcaWUhe265TbAk5-GAXoBFXCYVzQVus3ESmQKhWk4jzx-FyM0Mbuq0rtLqyUpRuQXusD2U2TJjtDPUf2LMeDMxbxSK66rwD4paUUaNPAIvJ-mVlK49r432Ur9fT6HZK5yxXeg16K4DvYs_F4fT5GSnmyizTkSRk1QpVV87RIsB3nRhMupJaXXUke-Q",
      "alg": "RS384",
      "use": "sig",
      "kid": "B_u-nDp0lpWIb5m6dOzMTngiC036uQJXkH79sKs_N0w"
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
      "n": "5fnpU0t0n74UPG4_VWEq81qe0kzmnsB35Xnoai1tH0yM9ywM4ZENi7DrcrYhfzJhHchg859FMHOy9FUBIbbYs5yZ8Y-UtjsFDK7pz3N1D8YBvqmLitypUmOObywQxN2tE0zIz_IE2eovIYrOIa50aGHfG164UcaWUhe265TbAk5-GAXoBFXCYVzQVus3ESmQKhWk4jzx-FyM0Mbuq0rtLqyUpRuQXusD2U2TJjtDPUf2LMeDMxbxSK66rwD4paUUaNPAIvJ-mVlK49r432Ur9fT6HZK5yxXeg16K4DvYs_F4fT5GSnmyizTkSRk1QpVV87RIsB3nRhMupJaXXUke-Q",
      "alg": "RS384",
      "use": "sig",
      "kid": "B_u-nDp0lpWIb5m6dOzMTngiC036uQJXkH79sKs_N0w"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "wIKWbkHZf8iil7bLUMDhDsD4DdRHbXWAeNv6gUn3GI371DeaeRWuXXlrnaqp788g-uMVNWq5l5frmA-k5L7PFdoDfmrek3rZd5xvKlhrSvYX26MzjgK15tpqlIOEw9AWHgDYsHfisKN0c4W6MgWhDl7F0khbH6v8U6RMMYhw-UX2Htur1ymkCCSz3twNr3cKrrScqoJikHRIzGt0ANfNz6Lia2Xwq2W60wgjtFV_K5JeSWZAYPxkZJRqnVMVCRwAbvM0Ye4Wij6qwQDsGznioqEtz4ahJFEZQdgbmULG0PAhZLAfGUZ02d61nFsQPRzj6BETRk4sQ3Eoij1XoXu2Lw",
      "alg": "RS384",
      "use": "sig",
      "kid": "iauwtKUywxvk0vuz5LytH6goe9n5OzDb04P_jvKvehE"
    }
  ]
}
```

---

First token request signed with the new key; note the `kid` in the header now matches key B:

**client_assertion signed with key B** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6ImlhdXd0S1V5d3h2azB2dXo1THl0SDZnb2U5bjVPekRiMDRQX2p2S3ZlaEUiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWs1Q2JXbDJTbmhoTTA5VlVFSmhjVTFPVFRGNFFWSkhWRzEyVTBablRtMVdSRXRIZVhSeVowcEtOMnNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlNVEEzTml3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpaa1lXWXhZVE0zTFRCa1ptUXROR1ZqTXkxaE5EVXdMVFV6TlRWbE5URTNaalZsTUNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlNVEEzTml3aVpYaHdJam94TnpneE1qSXhNemMyTENKcWRHa2lPaUl5T0RJMk9ETTVaaTAyTlRZeUxUUTBOelV0WWprM055MWxZamcyTlRSbE5HTTBNV01pZlEuSVFnazZndjRHVmJ2LTh1bFo5Z01HQWZSWWhiRVNyMzJvZkdxck5lTnVjTXB4TWhvb2ZBNjZjM2dBdjBHZy0yMWxjc0Jxb3V3clloNEdzWVpkeGxTa1Jqb01nXzZ5TS04RVlfbUVsdEZjMGRwTHY5ZGNOWFNBanYtbUN2enlaWkFMWGJ5bDVSV3hEZXFMR3RPUWJxRk9NTDJqV3F2YzNtWGxxRUlIX2hhM0lpblhrYTF0NTlhMHhHT2V6enJWQkJqVE1TNUNSNmptZGdnek1fbTVMdjZ2UEpzeUV2TzJhbE9OWkNYQUN3VWNMRmZ5VUdKeDVVZjBpSTFDR3lBX2RHS3BIZGotU0NqNklZalNEU1N0T1VQUHAtQmxtUWx0eFZlTnd4Q2N0Nk13eTNTM2k1Z1lTMFkzU3E4RWFSdG5LVVNEbXNVV3BkVWdsWk5vdjhjTVhkNUxBIn19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyMTQzNiwianRpIjoiYzYxYzE3NTItYmIwMy00MGI3LWFlN2UtYzhiMWYwYzFjZWMzIn0.aAewr-RPjlP6iFJsvw4oiuM1gs7jdztXuWIhXe-3KWuQDZu8pcO6eoEKJfLpQ1kXQdz1N-gaciilDPt-CJB04T6wilQEGR46jVTozAqZ2AHkDiOF2V8ZYk7In0xYePdN7AMFQZr1xpKe7Oep0q2KrGrKIlhfj4Ya_g7dtOgkQxGfPEik8DgcSN_rG2fQrqhVrfvi33oJKqXU_lLUaRW_3V_qrs9x-1HW4E2RZCTTYqtGOfmYZvt_sfMXWS8IPfE5v4j4GfgrIZhAeexlbUDbjSri6nacbu9Xgq5qKhl65iHtdR5Znw1yp79zRJ4p9boqePaQBFofCjEzfuJwIL8QnA
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "iauwtKUywxvk0vuz5LytH6goe9n5OzDb04P_jvKvehE",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ik5CbWl2SnhhM09VUEJhcU1OTTF4QVJHVG12U0ZnTm1WREtHeXRyZ0pKN2siLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyMTA3NiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjZkYWYxYTM3LTBkZmQtNGVjMy1hNDUwLTUzNTVlNTE3ZjVlMCIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyMTA3NiwiZXhwIjoxNzgxMjIxMzc2LCJqdGkiOiIyODI2ODM5Zi02NTYyLTQ0NzUtYjk3Ny1lYjg2NTRlNGM0MWMifQ.IQgk6gv4GVbv-8ulZ9gMGAfRYhbESr32ofGqrNeNucMpxMhoofA66c3gAv0Gg-21lcsBqouwrYh4GsYZdxlSkRjoMg_6yM-8EY_mEltFc0dpLv9dcNXSAjv-mCvzyZZALXbyl5RWxDeqLGtOQbqFOML2jWqvc3mXlqEIH_ha3IinXka1t59a0xGOezzrVBBjTMS5CR6jmdggzM_m5Lv6vPJsyEvO2alONZCXACwUcLFfyUGJx5Uf0iI1CGyA_dGKpHdj-SCj6IYjSDSStOUPPp-BlmQltxVeNwxCct6Mwy3S3i5gYS0Y3Sq8EaRtnKUSDmsUWpdUglZNov8cMXd5LA"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781221436,
  "jti": "c61c1752-bb03-40b7-ae7e-c8b1f0c1cec3"
}
```

---

After the overlap window the app removes key A from the JWKS. Nothing else in the ecosystem changed: the CMS statement binds the `jwks_uri`, not a key. For network-issued certificates, the synchronization rule in [Phase 5 of the walkthrough](../app-connectivity-flows.md) applies.

*Generated 2026-06-11T23:38:56.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*