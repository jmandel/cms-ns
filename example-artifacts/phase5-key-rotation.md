# Phase 5 — Key rotation

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The app publishes key B alongside key A, then signs with the new kid; data holders resolve it at the live jwks_uri with nothing to re-issue.*

**JWKS before rotation:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "vf9KmYWMJJMqCl5v84gso4QqSjPhlB36cHKMmgTu5kU99Og2q4o02-bMVLp2n34DQCMj0XxOWBOMhLuotjBaMgWW4t5GrFfQap-VuYNoqXPJ5Au6-fSoFgkAL6Z7IqQ52YHCMwF6H1xSfTxEQS-JiiiL2zeqy6FMiQWJiekHDgId2FFSlcql18Wi6f1BgD2oUy5aVck97906gO5cq5l7JTztzC5coQTiyZy0ebYucMbLpMNq6Q94ryAJ0wkMOzvGvwXHOIt_xZZ96Hv6yiSbDUapx0mGpO3LLqtHmn7tPGztApt4Y_gMWlFuEMRtrsjm5e9-hRTYrxqANYrr9HlpUw",
      "alg": "RS384",
      "use": "sig",
      "kid": "i2a9el9dK6hxKwFxNG-XZo3V8mGZiL9pkZb-wsBwzic"
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
      "n": "vf9KmYWMJJMqCl5v84gso4QqSjPhlB36cHKMmgTu5kU99Og2q4o02-bMVLp2n34DQCMj0XxOWBOMhLuotjBaMgWW4t5GrFfQap-VuYNoqXPJ5Au6-fSoFgkAL6Z7IqQ52YHCMwF6H1xSfTxEQS-JiiiL2zeqy6FMiQWJiekHDgId2FFSlcql18Wi6f1BgD2oUy5aVck97906gO5cq5l7JTztzC5coQTiyZy0ebYucMbLpMNq6Q94ryAJ0wkMOzvGvwXHOIt_xZZ96Hv6yiSbDUapx0mGpO3LLqtHmn7tPGztApt4Y_gMWlFuEMRtrsjm5e9-hRTYrxqANYrr9HlpUw",
      "alg": "RS384",
      "use": "sig",
      "kid": "i2a9el9dK6hxKwFxNG-XZo3V8mGZiL9pkZb-wsBwzic"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "0RdJAujjQq3oQM8w9cj2CXFFfV35rZN2fM3gyT-yy2c-8_5xOmNm7rNCSGZy-B5RF1FyrU-McNhTVOyjEj8LfO4gQLWCi7oI-zxUYn8nnTf2_SonCuadAVpLm3jR8EOtzOt7IKajt7nXn3z2R2tpNhiNqwJQf20eTJFsWu8SBCwCQ_QQ7p2HZy9kNU21OKykWidk8kVJMkTswECxXzeyPNZmf6dauJLBXme6aOsQ47RptezFZs8XoPlwvHhXVEx21C2Itrjel2nQmITa2LA2TIzElTTK2UVhZ0tMGZ32eZMx2i3skrc_7l6z_J6b8QQUH9JfuYAdEKtm-sSHfDRYNQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "OQJ1xqfMi7s6elKMG48s4CTz7f96yvo7OrpaNt2Z5D8"
    }
  ]
}
```

---

First token request signed with the new key; note the `kid` in the header now matches key B:

**client_assertion signed with key B** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6Ik9RSjF4cWZNaTdzNmVsS01HNDhzNENUejdmOTZ5dm83T3JwYU50Mlo1RDgiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWw5WmRUY3laemRMVVVST2MyZExWVTQ1YlROS2JXMTFkRlJ0VmtkcFRGcHJMWGRsYjNaNk5tRkRSazBpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1URTVPREk1TWl3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpNNE5EZ3hPREZsTFRVelptVXRORFl3TWkwNU5EYzVMV0ptWW1Oa05UZzRPV0ppTmlJc0ltRjFaQ0k2SW1Kd0xXSjFaR1I1TFdsa2JXVXRZMnhwWlc1MElpd2lhV0YwSWpveE56Z3hNVGs0TWpreUxDSmxlSEFpT2pFM09ERXhPVGcxT1RJc0ltcDBhU0k2SWpSaVpXSXdOV1V4TFdVMllqZ3ROR1prWXkwNE56UmhMVFppWW1Nd1pEZGpOVGxqTVNKOS5rQldaWEhIcU1UMTMzMUxlVG4tQ0hVSURNbGNLWVR6ZUFHU0pIOG5KWUtyTDc0Z0FQbjhQS3ZFcmtYR1k0MFE2aUtzU0U0S2Q1V3RZemZ5VVI5Q0dKbDBKWEUwODYwakhMUE9tQXg3OFNJU1gyUGFRYUhzZEZtaHVOb0g1MW9zeF9IM3l1WHpQYzZyVG5ndzZ6N0lpVUcwcEtCcTBaaWFvcFduVDJOcDlmZjRFcWQ1OU93c1BCalBRWkxtZWtwUkc4Vlp1Zm00YUJPTjlYOEMySzFuNmhyVEVUR2J3NUlaNlpZVnJXQVE3NUdaaDZjRlB2bldiMmMyWHFMeGZLY1NfcXFEMktacXFMZGo3Q21sVDI4VlE4cm5ieUJ4UFoydHJEWkJlRHhFSXBaNEpRYXZ5eTFJaVJ5dV9xTHg0QWVKelJibjREc1FFZmx1NUw4QWs0VzN6bFEifX0sImlzcyI6Imxha2VzaWRlLWRoLWJwLWJ1ZGR5LTkxYWYiLCJzdWIiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL29hdXRoL3Rva2VuIiwiZXhwIjoxNzgxMTk4NjUyLCJqdGkiOiJkMWFjY2M1NC0xNGM0LTQ1NWUtYmYwMC1iMmY3ZGViMDg1ZTMifQ.0OlKAhzLgvLzSv2iBoZWcNtmnwIxz-eYRpyi8Bikv8CZ5acdwYdr2yP6mEQBaBzItCb6U0iMIj8ngKRyPixjB0nJwxrYqg51NWBCgM4BCkFTs4JqU4v0wP3rvb-zStF06Z13MMnAYvmT4yNvNFTGypTR0_U85HkNQA5QmMoGgd96Ex1d98RPEu6MhMG5NCr6CRmNrCO_Xfcj2mdP-oYMKnh9cPuqChpWk7fDvNmhVIjgFnb4x6WVNxn3kGxLbsj7N3d3Xo7O-oWl2E0fVRP4OwvGeNQQSWyeObO6XYKaF3KpDJfPOJriVLRJdeI7gO4NVuNgmNPz4Ag_p9OFQu0YOQ
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "OQJ1xqfMi7s6elKMG48s4CTz7f96yvo7OrpaNt2Z5D8",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Il9ZdTcyZzdLUUROc2dLVU45bTNKbW11dFRtVkdpTFprLXdlb3Z6NmFDRk0iLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTE5ODI5MiwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjM4NDgxODFlLTUzZmUtNDYwMi05NDc5LWJmYmNkNTg4OWJiNiIsImF1ZCI6ImJwLWJ1ZGR5LWlkbWUtY2xpZW50IiwiaWF0IjoxNzgxMTk4MjkyLCJleHAiOjE3ODExOTg1OTIsImp0aSI6IjRiZWIwNWUxLWU2YjgtNGZkYy04NzRhLTZiYmMwZDdjNTljMSJ9.kBWZXHHqMT1331LeTn-CHUIDMlcKYTzeAGSJH8nJYKrL74gAPn8PKvErkXGY40Q6iKsSE4Kd5WtYzfyUR9CGJl0JXE0860jHLPOmAx78SISX2PaQaHsdFmhuNoH51osx_H3yuXzPc6rTngw6z7IiUG0pKBq0ZiaopWnT2Np9ff4Eqd59OwsPBjPQZLmekpRG8VZufm4aBON9X8C2K1n6hrTETGbw5IZ6ZYVrWAQ75GZh6cFPvnWb2c2XqLxfKcS_qqD2KZqqLdj7CmlT28VQ8rnbyBxPZ2trDZBeDxEIpZ4JQavyy1IiRyu_qLx4AeJzRbn4DsQEflu5L8Ak4W3zlQ"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781198652,
  "jti": "d1accc54-14c4-455e-bf00-b2f7deb085e3"
}
```

---

After the overlap window the app removes key A from the JWKS. Nothing else in the ecosystem changed: the CMS statement binds the `jwks_uri`, not a key. For network-issued certificates, the synchronization rule in [Phase 5 of the walkthrough](../app-connectivity-flows.md) applies.

*Generated 2026-06-11T17:19:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*