# Key rotation

*Worked example for [the record location and data access write-up](../authorizing-access.md). The app publishes key B alongside key A, then signs with the new kid; data holders resolve it at the live jwks_uri with nothing to re-issue.*

**JWKS before rotation:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "po2n6-CRFZM2WunlOAkN2OSG2sNwsHBqeTh6oi3CNIGPAtcN2P_GAvr8v6BNOHiM4VOHA-GWeWgTHJozijJcHYPNpqJeqlZA8TDzeCVO18_mBAUf3XGIbxUM_bqWN2KB-Za89geKHT1qEsj8u_xJp__Q1vVHRCKykkFdzZmT2vihrg6diQJCe6b7FZB2bAp-MilqveALzZSpwG6gKZwlEU0iSNKUf1SkvX2Z_dmnUU-c-dhx_a1jMQCYi4OB--NGEBsK7nIjAbZl6AkglYyXfEET-DpikZTL8DqfHxD-UdHmflZCoXV9QbwHnqm6b7HdqE8Qt1SLm4jkex0K0ZZGVQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "ZEmTzHnM8NIMGeu04ACckrbxWG_7zhJO3n_va1SvVV0"
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
      "n": "po2n6-CRFZM2WunlOAkN2OSG2sNwsHBqeTh6oi3CNIGPAtcN2P_GAvr8v6BNOHiM4VOHA-GWeWgTHJozijJcHYPNpqJeqlZA8TDzeCVO18_mBAUf3XGIbxUM_bqWN2KB-Za89geKHT1qEsj8u_xJp__Q1vVHRCKykkFdzZmT2vihrg6diQJCe6b7FZB2bAp-MilqveALzZSpwG6gKZwlEU0iSNKUf1SkvX2Z_dmnUU-c-dhx_a1jMQCYi4OB--NGEBsK7nIjAbZl6AkglYyXfEET-DpikZTL8DqfHxD-UdHmflZCoXV9QbwHnqm6b7HdqE8Qt1SLm4jkex0K0ZZGVQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "ZEmTzHnM8NIMGeu04ACckrbxWG_7zhJO3n_va1SvVV0"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "6pjo655fDNekVFkFcWBlej172_lsQIEdxzVsYmCXo0RDx_NvNGr327hG8lU_Qj0ESLwp9s-IFKR6oXyMaPZ6FReThCiZK0VoaiTb4rd8m3XKoRmFUQq2olLVBCabdf1pNbxITcZQV3WGLyelfwU8dWzHx0_8Uyrfqqd670OThxKg1gzEKCROTGDvo9po-nn0yUpbJ6tWDCSLH8o7jScFWbrK_l6YQCvZa-_OE3U9yVTcQe7nwcxrS-7ox8YQNRQeYPsYdozxyymvi9ltTx5jKPX0heAuQuOixGVX7-lw_Hx5B3tVw4MID1fsyrE-aoTQInf2GSDjFqF2HMEvKVhaGw",
      "alg": "RS384",
      "use": "sig",
      "kid": "ivFK-vFRk4QLoYnz4kuBoMLCfuaOR-jKqlOunbeTLP8"
    }
  ]
}
```

---

First token request signed with the new key; note the `kid` in the header now matches key B:

**client_assertion signed with key B** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6Iml2RkstdkZSazRRTG9Zbno0a3VCb01MQ2Z1YU9SLWpLcWxPdW5iZVRMUDgiLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxSUVdFRnhWM2cxZVROeFRHaEdWVlJaUjJSSWEyZ3pSa1V0WDNwNFIxOTJZMmQxTjNCRVNtcDNTMmNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1USXlORGd5TVN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SW1JMU5HUTJZekF5TFRnd1pXRXRORFV4WmkxaU1Ea3lMVEkzT0daa1pEZzJNVE5sWmlJc0ltRjFaQ0k2SW1oMGRIQnpPaTh2YkdsaWNtRnllUzV0WldScFkyRnlaUzVuYjNZdllYQndMV3hwWW5KaGNua3ZZWEJ3Y3k5aWNDMWlkV1JrZVNJc0ltbGhkQ0k2TVRjNE1USXlORGd5TVN3aVpYaHdJam94TnpneE1qSTFNVEl4TENKcWRHa2lPaUkyTXpNNVlXUXlOUzAzTkRNd0xUUmpNRFF0T0RFeFpTMDVNelJpTXpFellXSXdNR0lpZlEuRVNuSnBtS2ZtMjMyalQyaGRnV2NScXJ0M2RFd0hQRkR5ckhNQlRpMk5zUWRPaXNldld4YjhQeFZNMTBrWFpxUjhYZ2cyc2lKb2ZkUGE2QWFTODA5RmI0WTU2STJjT3ZTSXNIdWFBbkZvZi1FWFA1YnNGZlpqMnk5ajJiS3JGWko5Q2hIVTNVb04tdWR6UHNpS3gzNHJHa0hZM0lsdmFyR2IwZ2Q0VDM0aWlvcll4ZG5wazdkSHdlYnFIeDI1YldvMlNlZmNCTGRQNWxpRWlSei1rTlhadmZTYjRCbjJYUTc1MG9IOWFpMDhobVYxSUczTVFTdEhZZ1FueUswcU1VckZVSHJtamY5SDhVSVR6RWFoNWdFd3hmUGNNZHR2cTVGc2l5UkhkRHBkSV9OREFNeGlxLWpEUmxUNmtDVWtST2J0SWxWNjl1Q2NURWkzaV9SSzFKTm9RIn19LCJpc3MiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwic3ViIjoibGFrZXNpZGUtZGgtYnAtYnVkZHktOTFhZiIsImF1ZCI6Imh0dHBzOi8vbGFrZXNpZGUuZXhhbXBsZS9vYXV0aC90b2tlbiIsImV4cCI6MTc4MTIyNTE4MSwianRpIjoiYjVlOTI3MWEtOGE4OC00ZjMyLTgyYTUtMGRlZTJhNmJiMTQxIn0.i4G9UBp0eHoeFvPbu7p2o-WR9hec12yiHqZ2gOX9eAN3PF-T9leRVG5puse4AVb94Y-82SqnVY4tTJcJLSsEd_CgBTYCtu4S5kiMR_ZYgwqM9WnCN5yWKievL100ZwYnjbqpB4tVbD5g1373txA7d27DuH1iOkX46wa3aom2Y3LqtsV-XCQgBY29c3Bvgi7StTZPsUN0Clq0JHpTVQIwH8TP5MkWwnqWTAXaL6cwnjVc1mDD7TO-UB4ud3sWUcXVyBD6-BPyEnA5QdkJFCxTppUqy1Jp9V9kLNkBVX40JpYEhtZy1Qrmt3Ta0JvumBNTbA9i6C-v30Xv-Y3J_TrdUw
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "ivFK-vFRk4QLoYnz4kuBoMLCfuaOR-jKqlOunbeTLP8",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlRQWEFxV3g1eTNxTGhGVVRZR2RIa2gzRkUtX3p4R192Y2d1N3BESmp3S2ciLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTIyNDgyMSwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6ImI1NGQ2YzAyLTgwZWEtNDUxZi1iMDkyLTI3OGZkZDg2MTNlZiIsImF1ZCI6Imh0dHBzOi8vbGlicmFyeS5tZWRpY2FyZS5nb3YvYXBwLWxpYnJhcnkvYXBwcy9icC1idWRkeSIsImlhdCI6MTc4MTIyNDgyMSwiZXhwIjoxNzgxMjI1MTIxLCJqdGkiOiI2MzM5YWQyNS03NDMwLTRjMDQtODExZS05MzRiMzEzYWIwMGIifQ.ESnJpmKfm232jT2hdgWcRqrt3dEwHPFDyrHMBTi2NsQdOisevWxb8PxVM10kXZqR8Xgg2siJofdPa6AaS809Fb4Y56I2cOvSIsHuaAnFof-EXP5bsFfZj2y9j2bKrFZJ9ChHU3UoN-udzPsiKx34rGkHY3IlvarGb0gd4T34iiorYxdnpk7dHwebqHx25bWo2SefcBLdP5liEiRz-kNXZvfSb4Bn2XQ750oH9ai08hmV1IG3MQStHYgQnyK0qMUrFUHrmjf9H8UITzEah5gEwxfPcMdtvq5FsiyRHdDpdI_NDAMxiq-jDRlT6kCUkRObtIlV69uCcTEi3i_RK1JNoQ"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781225181,
  "jti": "b5e9271a-8a88-4f32-82a5-0dee2a6bb141"
}
```

---

After the overlap window the app removes key A from the JWKS. Nothing else in the ecosystem changed: the CMS statement binds the `jwks_uri`, not a key. For network-issued certificates, the synchronization rule in [Phase 5 of the walkthrough](../app-connectivity-flows.md) applies.

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*