# Phase 5 — Key rotation

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The app publishes key B alongside key A, then signs with the new kid; data holders resolve it at the live jwks_uri with nothing to re-issue.*

**JWKS before rotation:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "yoBp4oUM3ySKjUd4DObu8C9knnPDWuOE1i6tE2BfBxH8GbDLBvCEHEf--tk--oZXobQPAN7TsG3-kAtuhM5lZN5WrhkjMPrnkWhl9-PTUgHPBUw-ltxSTt6HZu5kJF2EP_tyWVyQL4qvMOpjG069Xs2nCLXDjSJrIeqvj7dRrsJ6JXDo1M666wjFw-W1xEKuM9Ev4JBaaN6hAoNTFaOuz1BZMnjn2lsjU2yqGegnTDEc_V2dAVSo8UXaE0rSyN4JwPikTi_r4ai0RfSa9fHydO8luRM1QH_bRAywvC1HtjN_oi4T8V93ohw_DHJ4j-Nx9R7zRct4MuOUYLqIkGQs1Q",
      "alg": "RS384",
      "use": "sig",
      "kid": "1eYmvBkQ_oUUGVy857AFYHvSETlQYMAyOXj1TgXBRrs"
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
      "n": "yoBp4oUM3ySKjUd4DObu8C9knnPDWuOE1i6tE2BfBxH8GbDLBvCEHEf--tk--oZXobQPAN7TsG3-kAtuhM5lZN5WrhkjMPrnkWhl9-PTUgHPBUw-ltxSTt6HZu5kJF2EP_tyWVyQL4qvMOpjG069Xs2nCLXDjSJrIeqvj7dRrsJ6JXDo1M666wjFw-W1xEKuM9Ev4JBaaN6hAoNTFaOuz1BZMnjn2lsjU2yqGegnTDEc_V2dAVSo8UXaE0rSyN4JwPikTi_r4ai0RfSa9fHydO8luRM1QH_bRAywvC1HtjN_oi4T8V93ohw_DHJ4j-Nx9R7zRct4MuOUYLqIkGQs1Q",
      "alg": "RS384",
      "use": "sig",
      "kid": "1eYmvBkQ_oUUGVy857AFYHvSETlQYMAyOXj1TgXBRrs"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "-IlPZE3aT2Sd9s2pZt96FDoh6rn8sJKYyDPzKl22egcIoivp8crMWLZQLWNWB_2n2o_6ftLhZxfkHAAHHLcBaM6w1kprXQgVVdwDOvcRWCHp1Yt30icldYosKMdboilFnmidBU2w68eIVjEf5MwkxPurRzdZBe6kvfThWdwYS1WHG3hovSqGzZ73FOyPntydXfLAzHDgOZ7MYx8ZxtZbAy0R8PrT_ebhgXgsA5ZWSqrjUr1pfeAF5tuKu6vcUZc-h1qXmwwCZxAAqv1yesc9qfHt8t0yHe1VRx5x_Mg0cyHvLFRnMl3K21xhNqNon8PQWpgwMNUJ6Y1-S8Kyd0R1dw",
      "alg": "RS384",
      "use": "sig",
      "kid": "qWwqBHSxOvj3LjsXH9-0qOQp4ngMi5ozQN8peJ9G65M"
    }
  ]
}
```

---

First token request signed with the new key; note the `kid` in the header now matches key B:

**client_assertion signed with key B** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6InFXd3FCSFN4T3ZqM0xqc1hIOS0wcU9RcDRuZ01pNW96UU44cGVKOUc2NU0iLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5kcE1VUlhSazF0ZURac2FXSkZhVEJaVURRMmJ6aEZVbWhJVG5keVNFbE1iVlU0U2sxNGNsVXRWMnNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXdOVE01TkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpSak9HSmxNVGcxTFRjeE56WXROR0kzTXkxaE1qTmhMVEJoTmpReFpqWm1ZamsxTlNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXdOVE01TkN3aVpYaHdJam94TnpneE1qQTFOamswTENKcWRHa2lPaUkzTXpjek9ETTBOeTB4T0dObExUUmhOemt0WW1FMU55MHlPV016TldFd09XRTJPR0lpZlEuZzV3cTJRcTlHejkwc2tKSWl2WjRTaEdDUnpTd3Nkb3FxcWl2MEpMWGl0a2psZUJuZEtzMHNPdTdiNEtiZ1NBb25vTWMxUC1MMGE5eFdFZEpOalZiUHBVaGV1YUwyenh6M2VCMmJOVTcweDZYbW81QTBkYTN3b3YyaE50UVk3N3lIbVVFUllTbG9GOWZJQlp0S3dwbUtsQlhZQXpwaHltVU00MEtkSGlsS05pbjI2eThTaF93ck9BUTU4bU15QldqUUlvU3RTaC1EMnpnOFJQeVRNUE1uUUxSbDc4YVhUSmdBVmpLdWc1c2hMWWhiNlk0NmZVdjlURlRDTEozNzZOVEVIc0g2ellnbnhaWnBnTjRlT25kcEgzeVJtWmQ4d3RJZjVLREZlZ3BsdHJycURzUkQydmE1bWxZU1JFeTBSRVNOVXJfTDFXMmMyNThZbzJsY1dqRnlBIn19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIwNTc1NCwianRpIjoiNTZiMWMxZDgtYmYyYi00OGU4LTljNzgtMDFlMDA3ODc0YzJkIn0.HPEv-kST4ByF2rP8iy3ju9ZYmn6phu4h7b-GHfg2VKWzquLaTCg2D_V120LWFAiNJhvm1gE5bo4k78IqNKm0Hnlb3adMzMa3LhUj2PnFqHQ9U_P910RgBLwcqSh3MHc1AIEhDzUqy2ioIYX5QD4rSFPCzUVrSuFhJjDSFgr_E2XZLZOsucb5EPuju9V7AnXlhNVu2bQDQMMMQBW-aglgP6JxIuTaFQP5nemUv_P6Uq752PEYgTvgDdzKC1xK-WrmlnyS0oX81OTxE75VcwmXuxxmpf-V-XgwkJD2b1stcOHX9cbIA1WeRuRcHGklM0LWJ5BLmhZONY__CNKUjlOkjQ
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "qWwqBHSxOvj3LjsXH9-0qOQp4ngMi5ozQN8peJ9G65M",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IndpMURXRk1teDZsaWJFaTBZUDQ2bzhFUmhITndySElMbVU4Sk14clUtV2siLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIwNTM5NCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjRjOGJlMTg1LTcxNzYtNGI3My1hMjNhLTBhNjQxZjZmYjk1NSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIwNTM5NCwiZXhwIjoxNzgxMjA1Njk0LCJqdGkiOiI3MzczODM0Ny0xOGNlLTRhNzktYmE1Ny0yOWMzNWEwOWE2OGIifQ.g5wq2Qq9Gz90skJIivZ4ShGCRzSwsdoqqqiv0JLXitkjleBndKs0sOu7b4KbgSAonoMc1P-L0a9xWEdJNjVbPpUheuaL2zxz3eB2bNU70x6Xmo5A0da3wov2hNtQY77yHmUERYSloF9fIBZtKwpmKlBXYAzphymUM40KdHilKNin26y8Sh_wrOAQ58mMyBWjQIoStSh-D2zg8RPyTMPMnQLRl78aXTJgAVjKug5shLYhb6Y46fUv9TFTCLJ376NTEHsH6zYgnxZZpgN4eOndpH3yRmZd8wtIf5KDFegpltrrqDsRD2va5mlYSREy0RESNUr_L1W2c258Yo2lcWjFyA"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781205754,
  "jti": "56b1c1d8-bf2b-48e8-9c78-01e007874c2d"
}
```

---

After the overlap window the app removes key A from the JWKS. Nothing else in the ecosystem changed: the CMS statement binds the `jwks_uri`, not a key. For network-issued certificates, the synchronization rule in [Phase 5 of the walkthrough](../app-connectivity-flows.md) applies.

*Generated 2026-06-11T19:17:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*