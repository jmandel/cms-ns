# Phase 5 — Key rotation

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). The app publishes key B alongside key A, then signs with the new kid; data holders resolve it at the live jwks_uri with nothing to re-issue.*

**JWKS before rotation:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "1tcM_JTDPx-v6xs_yhZO9bxwDHCC-mwLt37x2vucOVgy1OSJyWLNTS0bQ-b458VpGlSByhHi4z6uTB4F3-YjfFXcFYtZy0PZOYlYjYySVaZVrEx_DNYoDe1zVxbVJv7rnAnt3_1j3PUy5qCes-jF6Ed3BL7JurXSs-uicWWyQwaAOU95VS4hcM1hRlBOjvPQN1_xzYdq4iogwUsqDYnIDSkFUrT4HrKxln6lU8NunXnIq8A89_pHWWtbvK3FyHuqYz-st8Quzx319nD0FJ5Peq8Bb_RJPpOWRBLAZ7l_qS7k9ZNJdb2T02FF_4hoyErWTDGr9LV4goV24b5Q9xj9dw",
      "alg": "RS384",
      "use": "sig",
      "kid": "-na8dPulkqp3wlE2HuVACU7b7tXuGCvRYrzBehEuQKw"
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
      "n": "1tcM_JTDPx-v6xs_yhZO9bxwDHCC-mwLt37x2vucOVgy1OSJyWLNTS0bQ-b458VpGlSByhHi4z6uTB4F3-YjfFXcFYtZy0PZOYlYjYySVaZVrEx_DNYoDe1zVxbVJv7rnAnt3_1j3PUy5qCes-jF6Ed3BL7JurXSs-uicWWyQwaAOU95VS4hcM1hRlBOjvPQN1_xzYdq4iogwUsqDYnIDSkFUrT4HrKxln6lU8NunXnIq8A89_pHWWtbvK3FyHuqYz-st8Quzx319nD0FJ5Peq8Bb_RJPpOWRBLAZ7l_qS7k9ZNJdb2T02FF_4hoyErWTDGr9LV4goV24b5Q9xj9dw",
      "alg": "RS384",
      "use": "sig",
      "kid": "-na8dPulkqp3wlE2HuVACU7b7tXuGCvRYrzBehEuQKw"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "yEYiE1IXa-saUtpaJfUXLZs59lOshRHXQVetN--05Q6PFL3rs_VDdqWp3m6D1Fhi7T_0onr03To9B66JFExuvZ0C6Lit4Shmd9MKZIy9WFF9N9BrSISpAoDhNRtY8MWQNNfTqURZaYvSQ3pkJkXR420gyKwmQ-auLbNHpc7hs4BFbZRljKBd7zJIuFVOFMJaHv_naTSLASUOLO7LQku-gL4gETfo8Tu1F6jdVOEsyn0gBBn9bSehX0hnf-kZnPBC5I7b8nllX6aYU7o_O83o1NK7O7ZYRVQUyR-BoJJoYxq4UdRQFxZssxP_Igko4-dG8SBBtiu1mWwVtH59VSayQw",
      "alg": "RS384",
      "use": "sig",
      "kid": "rSJikxyOV9P-OVQcVvpb_hNb4z7cAnBXOJqxSV5sHvM"
    }
  ]
}
```

---

First token request signed with the new key; note the `kid` in the header now matches key B:

**client_assertion signed with key B** (compact JWS, really signed):

```
eyJhbGciOiJSUzM4NCIsImtpZCI6InJTSmlreHlPVjlQLU9WUWNWdnBiX2hOYjR6N2NBbkJYT0pxeFNWNXNIdk0iLCJ0eXAiOiJKV1QifQ.eyJleHRlbnNpb25zIjp7ImNtc19zbWFydCI6eyJ2ZXJzaW9uIjoiMSIsInB1cnBvc2Vfb2ZfdXNlIjoiUEFUUlFUIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5GelRHTTNaV2N5WlRoV2MxTndPWFYyZDBwbGRuaExSRWxzVVd0SlUyVk9jM0pSVW1KTFN6Tktkbk1pTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBaR1Z1ZEdsMGVWOWhjM04xY21GdVkyVmZiR1YyWld3aU9qSXNJbUYxZEdoZmRHbHRaU0k2TVRjNE1URXdOVE14TkN3aVoybDJaVzVmYm1GdFpTSTZJazFoY21saElpd2labUZ0YVd4NVgyNWhiV1VpT2lKTWIzQmxlaUlzSW1KcGNuUm9aR0YwWlNJNklqRTVOakl0TURNdE1UVWlMQ0poWkdSeVpYTnpJanA3SW5OMGNtVmxkRjloWkdSeVpYTnpJam9pTkRFNElFRnNaR1Z5SUVOdmRYSjBJaXdpYkc5allXeHBkSGtpT2lKU2FYWmxjbk5wWkdVaUxDSnlaV2RwYjI0aU9pSkRRU0lzSW5CdmMzUmhiRjlqYjJSbElqb2lPVEkxTURFaUxDSmpiM1Z1ZEhKNUlqb2lWVk1pZlN3aWMzTnVYMmwwYVc1ZmMyaHZjblFpT2lJME16SXhJaXdpYVhOeklqb2lhSFIwY0hNNkx5OWhjR2t1YVdRdWJXVXZiMmxrWXlJc0luTjFZaUk2SWpSbFl6a3pPV1l4TFRCaE9ETXRORFF5WXkxaE5HWmlMVFJtTWpKaE1XTTNNemN6WmlJc0ltRjFaQ0k2SW1Kd0xXSjFaR1I1TFdsa2JXVXRZMnhwWlc1MElpd2lhV0YwSWpveE56Z3hNVEExTXpFMExDSmxlSEFpT2pFM09ERXhNRFUyTVRRc0ltcDBhU0k2SW1ZNFpEUTJOMkUzTFRWaU1ESXROR1poTWkwNE1EUTFMV000T0RjME9XSmhNMk5rWmlKOS5FS0hZb0JUekpHOFdhOEVwSVNRZEFubk83MDdrbkpkYXVpQ3FYbzlQVzYzUmRWVzlfcWxzOXhiYXNLMy03Wm1LVll4RTRtX1Q1MkpLM1FtQkN6RlVxdl93NUJyYzdfU1l6ZGkzQUI3a250MlBDb1cxRWdTdURUWHFPTzRLSHAtcExERUJJMERxeDd4dnNJRV93SzAyS2VmeTVpb3FwRmE2eXprMkM4TlBCcFJ3Ty1ZdnNaVERNRUV6RkpDaXV2TjlQdUZHZlFwclppQTA2NUptajdoT2RkbFhSMk4xcWF0STluVWVvUDZ1WWZCY2lYcklEZlllS2hMZDVRTnBBYVBIekh1RWg2alpiOTZmWlZVVUoyMEI3MmpYcm5hUjY0cWVkUGdUUmlGOUVTN1lnR01xcWtQejJVcXBQd2R5aHZFVW9DRTdsTW00aDFJcHBCMERhTGVBb3cifX0sImlzcyI6Imxha2VzaWRlLWRoLWJwLWJ1ZGR5LTkxYWYiLCJzdWIiOiJsYWtlc2lkZS1kaC1icC1idWRkeS05MWFmIiwiYXVkIjoiaHR0cHM6Ly9sYWtlc2lkZS5leGFtcGxlL29hdXRoL3Rva2VuIiwiZXhwIjoxNzgxMTA1Njc0LCJqdGkiOiJjMmU4ODhkNy1kNzhlLTQ1NzQtYjA3OS00MjNkM2QwM2UzOWUifQ.CXahp25dgP5qa13o_FT5qHpSJl8kFFjTpnGpmOwghe9q4aJag_pMpoM5mYVaQkje6prGYRxXA9YiTsEd2ZIsza4-a_9rrg4Y1DvWv3K8WVQXDnny4VtzNS_M9Ged1c0PdVgh9KFGyQObdYUV4Pd860qRYqEUpr3nG5ly4Xy_UnNAYVbbw6VfgwIZVMNo_wujm_xXJlb_lOp_PgXnSD4XUkvAJ9j0aIK1e0pGGTxEcDUmB8nHb_wUbXdpbFYZ12Q2Qn2BCPnfRPvJoH8ZLb9yNCT72xqUHGPBWaYmItNLMKLSVepoTxlN5n1VEei0iToKAHu7kfx4_BG6HvwVWSx4XQ
```

Decoded header:

```json
{
  "alg": "RS384",
  "kid": "rSJikxyOV9P-OVQcVvpb_hNb4z7cAnBXOJqxSV5sHvM",
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
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InFzTGM3ZWcyZThWc1NwOXV2d0pldnhLRElsUWtJU2VOc3JRUmJLSzNKdnMiLCJ0eXAiOiJKV1QifQ.eyJpZGVudGl0eV9hc3N1cmFuY2VfbGV2ZWwiOjIsImF1dGhfdGltZSI6MTc4MTEwNTMxNCwiZ2l2ZW5fbmFtZSI6Ik1hcmlhIiwiZmFtaWx5X25hbWUiOiJMb3BleiIsImJpcnRoZGF0ZSI6IjE5NjItMDMtMTUiLCJhZGRyZXNzIjp7InN0cmVldF9hZGRyZXNzIjoiNDE4IEFsZGVyIENvdXJ0IiwibG9jYWxpdHkiOiJSaXZlcnNpZGUiLCJyZWdpb24iOiJDQSIsInBvc3RhbF9jb2RlIjoiOTI1MDEiLCJjb3VudHJ5IjoiVVMifSwic3NuX2l0aW5fc2hvcnQiOiI0MzIxIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWQubWUvb2lkYyIsInN1YiI6IjRlYzkzOWYxLTBhODMtNDQyYy1hNGZiLTRmMjJhMWM3MzczZiIsImF1ZCI6ImJwLWJ1ZGR5LWlkbWUtY2xpZW50IiwiaWF0IjoxNzgxMTA1MzE0LCJleHAiOjE3ODExMDU2MTQsImp0aSI6ImY4ZDQ2N2E3LTViMDItNGZhMi04MDQ1LWM4ODc0OWJhM2NkZiJ9.EKHYoBTzJG8Wa8EpISQdAnnO707knJdauiCqXo9PW63RdVW9_qls9xbasK3-7ZmKVYxE4m_T52JK3QmBCzFUqv_w5Brc7_SYzdi3AB7knt2PCoW1EgSuDTXqOO4KHp-pLDEBI0Dqx7xvsIE_wK02Kefy5ioqpFa6yzk2C8NPBpRwO-YvsZTDMEEzFJCiuvN9PuFGfQprZiA065Jmj7hOddlXR2N1qatI9nUeoP6uYfBciXrIDfYeKhLd5QNpAaPHzHuEh6jZb96fZVUUJ20B72jXrnaR64qedPgTRiF9ES7YgGMqqkPz2UqpPwdyhvEUoCE7lMm4h1IppB0DaLeAow"
    }
  },
  "iss": "lakeside-dh-bp-buddy-91af",
  "sub": "lakeside-dh-bp-buddy-91af",
  "aud": "https://lakeside.example/oauth/token",
  "exp": 1781105674,
  "jti": "c2e888d7-d78e-4574-b079-423d3d03e39e"
}
```

---

After the overlap window the app removes key A from the JWKS. Nothing else in the ecosystem changed: the CMS statement binds the `jwks_uri`, not a key. For network-issued certificates, the synchronization rule in [Phase 5 of the walkthrough](../app-connectivity-flows.md) applies.

*Generated 2026-06-10T15:29:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*