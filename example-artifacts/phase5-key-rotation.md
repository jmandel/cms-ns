# Phase 5 — Key rotation

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The app publishes key B alongside key A, then signs with the new kid; data holders resolve it at the live jwks_uri with nothing to re-issue.*

**JWKS before rotation:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "lZHXTxNRPh5l5frs0Jqpb-BqYB6axAQMV7qm5WzbP4g2VLnWNeTliJ28LL60uGo_0ATu0iiIu5f8MXmdTsy3DjVDOM6aZb0EdZ-L9qEEscU_fJuEknGvZyaGa-aRZiIvCsC6PpXJS2riCQFLvVE_dD7MDDJLMKOiHbUAhkx07c3WR7jMkDZX3SFnGtdduydcCHc0hTXl1UZCYCnQ8jQjWVCOWFKAoBZ4CeEx8k2zG7IOwyfJK7oII-kMOL3WuIvshVZoiOWTVm5yj9gl8JOWxw-KaJC9B5Gjl7ptp1zclid70VzeWo-gf7gKmWdvZuIdpj_rwHvzw6X_emtZDieRTw",
      "alg": "RS384",
      "use": "sig",
      "kid": "6yXq-vxVHX-pKmtBNwOfBSwycUHPZLHotyGYFwIUATs"
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
      "n": "lZHXTxNRPh5l5frs0Jqpb-BqYB6axAQMV7qm5WzbP4g2VLnWNeTliJ28LL60uGo_0ATu0iiIu5f8MXmdTsy3DjVDOM6aZb0EdZ-L9qEEscU_fJuEknGvZyaGa-aRZiIvCsC6PpXJS2riCQFLvVE_dD7MDDJLMKOiHbUAhkx07c3WR7jMkDZX3SFnGtdduydcCHc0hTXl1UZCYCnQ8jQjWVCOWFKAoBZ4CeEx8k2zG7IOwyfJK7oII-kMOL3WuIvshVZoiOWTVm5yj9gl8JOWxw-KaJC9B5Gjl7ptp1zclid70VzeWo-gf7gKmWdvZuIdpj_rwHvzw6X_emtZDieRTw",
      "alg": "RS384",
      "use": "sig",
      "kid": "6yXq-vxVHX-pKmtBNwOfBSwycUHPZLHotyGYFwIUATs"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "suxYauYUbJKxuwxAPf-Wv6GldoVFYxMhI0h6K0afe8t9b3uwnH38NsXGIbvbwlBhCAvuXiHcIdQYQlCVDGcPhYJV6x2gcxsQP-QYwEDTvRkxGocZvIjmrkkndPaeiw22I8bBXWJqf8d5h7OmiXdMzMk7mrtfatYHM2ko7vxf7CaY2ak5wT3vAPOkBCnlGajxcFa-p7eK4D4aQpLd5V2OizkOgMesm8ID12pUu5EruXYkioOkAQIQdTCQEyOk5YmPVvydMCShMSoe2AlC8oIFndOkOQSgL6XWuSywtLngtZNzcZD5rg7YFLa_sI9SCf-qTX_HcG8qBGJpTnUcoUZfGw",
      "alg": "RS384",
      "use": "sig",
      "kid": "Mv7QAp0e7-UssKIivTwKkx8XyLezWU2Uo4oATMmaCbs"
    }
  ]
}
```

---

First token request signed with the new key; note the `kid` in the header now matches key B:

**client_assertion signed with key B** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6Ik12N1FBcDBlNy1Vc3NLSWl2VHdLa3g4WHlMZXpXVTJVbzRvQVRNbWFDYnMiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW10V00wMVdOMGQ1WjNwWVNuWmZTM281ZUZsamNHOW1VbVpxU1dwQlNYaHdRbDlsUVhsTVN6UmtSRFFpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXhPREl4TWl3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SW1KaVpEbGhPREF4TFRkaE5EWXRORFJrWkMwNE5tWXpMV1UzTWpRNVpUZzJZamM1WVNJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXhPREl4TWl3aVpYaHdJam94TnpneE1qRTROVEV5TENKcWRHa2lPaUprTjJRMllUTXpZaTFtWm1JNUxUUXlaREF0T1dWaFlpMDNNR1l5TXpCall6aGxaV1VpZlEuUFZkVUFad0d1S0JtbHJTaTNBTHBqZExpUVN1T3o5bVlNZHNZdU1mLTA1M3Z6QWxuSUFlWDhOckxoOUZrMGxSaVZndVNBT1lIcDBLdk9Uc1U4SndTcUJfSkxHRUozdGFjZ00tbGZpRkJ5bXBSVXF4dUxJVVVsRzVFc3FWVUZqdV9vZGg5QU9POHJqdTBtTFNsa2IyMy1wczN0MkpKZE1DWXJ6V0R6NUd5U0l4QXdSRVdhNFZtLUV5WjcteGhfaDY0UEJ2aFE3RGExZG95OGcxLXhqWWlsZTZvbnZ1bHdjNG9zM2dxLUhYRFBNdXVTYWFMOVBSTWZDaHRkZnBuQ3l5MTVVVmpwYkxDdFlnUDR1OUpwalF4WWRjYWdYM3NyTVNYN01VLUZyVVZFN2VEeGFOalNfR1VEWFFiZklYMW9RMFJEY2pQb0ZidFJNNU85VXkzOEJOVm93In19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIxODU3MiwianRpIjoiNGQ2NGM0ODUtZWZkNS00OTAwLThmYTQtYmQ2MGE2YjU2ODg2In0.Y_6XJyiW_nISOtLKAwvzKuoYc8xPM3exuP4od1m_gJyhG666pXN08FzjMCZQtCWWr2wiztsTWfwJyRz37J9BWii4eAOakL97LVYTrzqh5OoBP_Y_fXz_e1i5HoezOaaXuqJhvmZ6F-bpY6J5_Q8XsN-IpO5_Dz9CwHmOYbqEW73evrShTE-bLYmZe6kNSA8dTZOEf1xW9H-LD_nQMKY35JO_eX79OZfHjDL41dnAh4IQmyi1i6v-ot6zDLLTuwiIk-0WugRTudPk-3LSYbLu6p8li3hxcUxZjityb0Vv7NDv5pZnQEe6Rsm3atKEop2mNWBXyOHNEwMRviL9UlcSww
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "Mv7QAp0e7-UssKIivTwKkx8XyLezWU2Uo4oATMmaCbs",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImtWM01WN0d5Z3pYSnZfS3o5eFljcG9mUmZqSWpBSXhwQl9lQXlMSzRkRDQiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIxODIxMiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImJiZDlhODAxLTdhNDYtNDRkZC04NmYzLWU3MjQ5ZTg2Yjc5YSIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIxODIxMiwiZXhwIjoxNzgxMjE4NTEyLCJqdGkiOiJkN2Q2YTMzYi1mZmI5LTQyZDAtOWVhYi03MGYyMzBjYzhlZWUifQ.PVdUAZwGuKBmlrSi3ALpjdLiQSuOz9mYMdsYuMf-053vzAlnIAeX8NrLh9Fk0lRiVguSAOYHp0KvOTsU8JwSqB_JLGEJ3tacgM-lfiFBympRUqxuLIUUlG5EsqVUFju_odh9AOO8rju0mLSlkb23-ps3t2JJdMCYrzWDz5GySIxAwREWa4Vm-EyZ7-xh_h64PBvhQ7Da1doy8g1-xjYile6onvulwc4os3gq-HXDPMuuSaaL9PRMfChtdfpnCyy15UVjpbLCtYgP4u9JpjQxYdcagX3srMSX7MU-FrUVE7eDxaNjS_GUDXQbfIX1oQ0RDcjPoFbtRM5O9Uy38BNVow"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781218572,
  "jti": "4d64c485-efd5-4900-8fa4-bd60a6b56886"
}
```

---

After the overlap window the app removes key A from the JWKS. Nothing else in the ecosystem changed: the CMS statement binds the `jwks_uri`, not a key. For network-issued certificates, the synchronization rule in [Phase 5 of the walkthrough](../app-connectivity-flows.md) applies.

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*