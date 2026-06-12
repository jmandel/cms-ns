# Keys and trust anchors

*Worked example for [the record location and data access write-up](../authorizing-access.md). Every signature in this library verifies against these keys. All material is throwaway, generated for the examples.*

**CMS statement signing JWKS** (published at a CMS well-known location):

```json
{
  "keys": [
    {
      "crv": "P-384",
      "kty": "EC",
      "x": "j8njaHZ4Ckxm0HpKZR2uITBf6LRfVjba4QGlA1vyuTt5bQbnbv-e5hiHt4Ivj-LN",
      "y": "ciscr68Kzritc_ouKQ3UnejBh-9nVaNlKb8ZZoXZefTBuOTxFHyUFXn3kXWm8Wh4",
      "alg": "ES384",
      "use": "sig",
      "kid": "2C5mFVv8QmVtgpF1q-B8_Ddw_E8fn0jy8SB7mjIxyd8"
    }
  ]
}
```

---

**BP Buddy JWKS** at `https://bpbuddy.example/.well-known/jwks.json` (keys A and B):

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

**CSP (ID.me-style) JWKS:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "zJYrQd9h5KLx7xSabKD02WgPEAB0-3s_Bq615lfXs2XPVtBBP1_xmbMMYbR6q2-c8f66oBi9TKPJ2Z7myhZqBjtVtfmNRbF75k3tGBlB4lo_aGaGmK8QtTTgwvRS5-4nQUpLgc5xFyuqf13jK9SIMeanIl7KZqnrBD2wk32atDE5fb9Nq7eM20lIaETdRQCkio_Zhe3xBxW70bBC6Ew2N6wnDZ7eVACsUuLmum8AfyR45rfotdPkT2LUATj6pipwcwuHexp3yiLb6t_cA49PsmZ328t0M9bnWhX3GpalwKfmwyBIub3fipmJ8JW33-84grQ3k2mKxBIr_lYB23pO4Q",
      "alg": "RS256",
      "use": "sig",
      "kid": "TPXAqWx5y3qLhFUTYGdHkh3FE-_zxG_vcgu7pDJjwKg"
    }
  ]
}
```

---

**Beta ticket-issuer JWKS** (signs permission tickets in the alternative shape):

```json
{
  "keys": [
    {
      "crv": "P-256",
      "kty": "EC",
      "x": "n8nkdDjtL1QDYI7C7Z3oBC943GAFQKDmyAy1m1s5ENA",
      "y": "jG4Ekt5rprI9DPBWFKtP_gwe8YDbuTS3NTNHjVjcoR4",
      "alg": "ES256",
      "use": "sig",
      "kid": "a9ZrqxJPXGcrxj7a7IWW0ipGlH5CfJ1QZ0YaSgTDT6c"
    }
  ]
}
```

---

**Gamma community CA certificate** (the anchor Gamma distributes to its data holders):

```
-----BEGIN CERTIFICATE-----
MIIDYzCCAkugAwIBAgIUeVxt2z8g/pIMerL0nFoF31kngwcwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMjAwNDEyMVoXDTI3MDYxMjAw
NDEyMVowQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYD
VQQKDBNHYW1tYSBUcnVzdCBOZXR3b3JrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEA0macpHZWbrGnHYjcqtlE0Ffc3NYwrZaKwAo7YJnwtckNSs5zxoaw
sGu34OpLC9WTNKW36BKu0/7Jn9oAqb4Jty8TXcHDeZASU9FnQGyDMnIL/RBlyHT4
X3tpYmyH+Haf9O/JFNd4MdsQS8awGnooaKKcDa4CdGStGNy2LDbtISDDHO31q6zl
4r6T4mvqLeyUa1i6F57AqP3auEl8yvQjGvzGcMCgh3lfmm4iZuEaLw56fAxZMX1G
QEZYeRKYz2aO3LgfvxwcYL5l3NlkocXZt2+e+nTCnCOrlbxpmmXyc4d4qvPlgMgK
pE20rdClzSjU7brh5nZFm6C6dLZl40zgYQIDAQABo1MwUTAdBgNVHQ4EFgQU03tg
0Tqic2kxoW1nKLV3iUrgD00wHwYDVR0jBBgwFoAU03tg0Tqic2kxoW1nKLV3iUrg
D00wDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEASEQUM4wNT+9F
qQJHXXPG/sRAr8ygzh0DOnGiBkNjroCTv3BqStCU86rfjJNtmtEhQO/xk9IY+bPl
VeOyIQalZg5+jurSUK/Xvc7poQRl8auMpelxN6AkVC9iMMKVjrUWqWsJI90vKow3
GJ97L23c2FRRwlyP67Jk5gd7g8ugNBTiyDMnK6wWIEVA3oD/Ny2ezL/cUEVw5a7/
N8Qwcb0hhJRzxFUhAKZJVQAcJM6626/eMl6YJPWIBjSAL0lkYTx11PHPsGkyqSr9
1KXvntMmfNvg/psE4P4KjDdS9PAO/F60eaeHsItX3YzAdvPZnVwNoToiYwCLlpeH
mFpmtcNQCQ==
-----END CERTIFICATE-----
```

---

**BP Buddy's Gamma-issued certificate** (subjectAltName URI = `https://bpbuddy.example`, chains to the CA above):

```
-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgIUBm0y16OumEmM/u6cm/Q4jFHK3eowDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMjAwNDEyMVoXDTI2MDkxMDAw
NDEyMVowKjERMA8GA1UEAwwIQlAgQnVkZHkxFTATBgNVBAoMDEJQIEJ1ZGR5IElu
YzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALEbqoubgcry5YpiZw3I
EKI4lF3UWXo275mWVpmodUCXVRTtDnHUE6Q25PXW9OxAzIX25cZz9H8UFT6ZNpPu
Ob/TBI1vLyWRVazFphqlIhj7T3/B54sXMbiFNRplWINzNs0wOGQQXTTrmDvXokjr
aDkgfU28NcgIuJLoE4onBHsZB6vEhfTyS4AQiriovZ8hP768+Xvz9nI/Kcmx1tAG
IZwNZ2dwjXnnkaDYMt1HH7q1j8pQ1Iac1zxy/QqB/Adr1GpbZVsNiAuuuC/2rOdQ
Eke+XzahKNgIdpwIG7EV1Mh4s1y0Q1voIYOs+1nqMd0kCthufgyufn1yMlPRsdnW
QmECAwEAAaNmMGQwIgYDVR0RBBswGYYXaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUw
HQYDVR0OBBYEFGXNSxjzRdOEq6A/firnX7nbl1luMB8GA1UdIwQYMBaAFNN7YNE6
onNpMaFtZyi1d4lK4A9NMA0GCSqGSIb3DQEBCwUAA4IBAQCkgfr63QE+n6/H56E4
NScBD58nVCbYlHLrrSIbEnlqxdLAC11RrBpyYLlKKsxjufob3YBvdxJ143UxXcvk
q/Z/8KJOlS4Nuemi/myPDhrQF6U3swz1VnxPruySTh1rxaSZglJfHzXGfY73EgVN
jtRFvL/UxyJhKDzUwcKLqroesPBDo+1HLtKpGZv4OnXkTkkJx3YhmoS6HUmYUYnq
vIhp6bC/Go2jng56CkJOcUjRPBb2VaPBnTMz8/XXwsRf4Bu3Yvib//1XVu3+2Oaz
YE03fndOCuDjdF4LdExl+1I6/Hvh+6p4IFiegSwvdRaATa6txYlpp5UKKdEy4Fa8
ATe6
-----END CERTIFICATE-----
```

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*