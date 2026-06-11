# Keys and trust anchors

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Every signature in this library verifies against these keys. All material is throwaway, generated for the examples.*

**CMS statement signing JWKS** (published at a CMS well-known location):

```json
{
  "keys": [
    {
      "crv": "P-384",
      "kty": "EC",
      "x": "TKRC4TBqty9hyad7ilE1ETAWhTJhRoOC25qQYXp7wQoZ0YzX34Jt8g7JHoCBsBg4",
      "y": "plV871Zmr4oS0zAL5S1pBIMsquuCHI2SaYqKOUw_IEeUn_Lxupefx1tFcTqg5kfq",
      "alg": "ES384",
      "use": "sig",
      "kid": "jVLoZdpMXL5hwf8PgSLqbydRdMZXzTbS9X0JDHvsGU0"
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

**CSP (ID.me-style) JWKS:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "0DBf0jGu4Zamex-DANeYWgoikiTWYklZrq6YaTDGh7xMR3otD2DOenytsdR6RIYZ9B69_qGMZ4Obz1ux4tXH_gVac9uOv-SinVdcd19lafolh1Lt0JHkiAc762t5SvksZbUGEtrmJL51CS16BTZ5N-4PiInrP47itbb9dYmtju8ybtxpyJESZTQ09T1VWcdpZaZQkjIsFUgSBbwsVxaSVIM2Zo1rDPMEY20oxJ7qNgmJ9xDUn0gSVXtSkG476w_fT2ZL1miWTLgLC-PIdv5Qy--ExlsRySCsAfeCSSRsYjtMnmRDGtrFuJevNeEaX6Ov-chYDV-Itj1hd6c_MDJpiQ",
      "alg": "RS256",
      "use": "sig",
      "kid": "wi1DWFMmx6libEi0YP46o8ERhHNwrHILmU8JMxrU-Wk"
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
      "x": "uL1ej7Ef6lQUCT_5F5G80s90qIH9YtNG8E1BbFDKyas",
      "y": "ZxLotO6cNkEpUKPNaT7TsaBVuhApH2d2r54jLOOaQTk",
      "alg": "ES256",
      "use": "sig",
      "kid": "OlDFekNjYjqfBdW5BGVZYkSA8HfV0kU1GXKLIyKO6uA"
    }
  ]
}
```

---

**Gamma community CA certificate** (the anchor Gamma distributes to its data holders):

```
-----BEGIN CERTIFICATE-----
MIIDYzCCAkugAwIBAgIUUIu2uh3RB7qnUoQzE3xaXxz+DKswDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMTE5MTczNVoXDTI3MDYxMTE5
MTczNVowQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYD
VQQKDBNHYW1tYSBUcnVzdCBOZXR3b3JrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEAr1YeIZTCo0jkaLgPvYhebXcgilWA3rJdA3KqfIAdtSweS0KCZgL/
Hu8HbzBVqg6bhi4UliGp++DwKtKYfZ2Z3DP8PvTMovFUK+ajtunXkPKMS9ksod/n
h10bnwAsDPfA6AxoxvTycfPGhQVMz6Xqe547/MZyEkkZtEj5X5avPsTmXWyFav9u
4UM0snqXiKFi+vWWjmH8glRVTdZKSIasufdcPbbzcB/JbVNP9xD+Sn4AXld9fF+Q
h0H1w3Het61BSscGHJ7RutQE2BTONa2F5yizf8NHlXklv8qjgC1z75s8GgruOQZF
lKwlOPHxdYnBajF6sjfl7fNefEKPP8cDQwIDAQABo1MwUTAdBgNVHQ4EFgQUoT23
UyEn5JqMr5k8KMOUbz5ssP8wHwYDVR0jBBgwFoAUoT23UyEn5JqMr5k8KMOUbz5s
sP8wDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAdJ9cXeYH6x12
jBY2guIM7k8BdoAYPKuUx6z1Q4Hom+6KwkD/4HmHKbrH+krRWtZL7zOQj9pcwNR2
D569q1vzXtGiKvHSARfKtFIjftXiK2ItsPggA2c6OvpgvhOWzY2uZKKjlXMRfr5A
JEj/VdsQq3dpWrW7Hn3DeGtkfs1K0LlnWLZkU7V/MfDFBpNQyt+5JN482BGiy955
q2nm4PZUbvoUqRQxADJsfU1zBKgrPgSJSQNhnwh1+nBxGNTlCPW6zzLPn9niabRM
OvbkRTolEP7bUQ5J6EFN0WnEmlLU/vaAf0EBA/GbyDpbtJP4RPYPdtFzEAhoh8jC
q6nZOkCTAw==
-----END CERTIFICATE-----
```

---

**BP Buddy's Gamma-issued certificate** (subjectAltName URI = `https://bpbuddy.example`, chains to the CA above):

```
-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgIUTlSlewoswauP3OItiruSSMHsl9UwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMTE5MTczNVoXDTI2MDkwOTE5
MTczNVowKjERMA8GA1UEAwwIQlAgQnVkZHkxFTATBgNVBAoMDEJQIEJ1ZGR5IElu
YzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKIVGB2eflz1qBzJgzrf
iWJD8yiG6+6z9zbCP/SZQ3ZfpHe+ZyI2CsPwyF3wcjJ3bohshQ5SVirn8T3tDgIt
tLWc1eAo2fcGSNAxnIZImp+Jjl9VQkjDEHGtIaBp+/JzsJ9HC/1atGiY7aL1DifI
PByqnJWchE9mkBHB55vO6PSvdUHZLWaSqJJZNJ9hO1H0kdjbIqS7qR3wA1Vxu0te
r/k8eNL0fxGZAM3mD4zuwJeZW8+94/VIQ0j20ShyK1yu4b4kBe0t/8KFeZkadZy2
MnnPsHdqPX4LjlftSu/VaD2c3s5IzPa5D52X8R6KLQ8AAIhmjPUnMTG07MYmD67v
dv0CAwEAAaNmMGQwIgYDVR0RBBswGYYXaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUw
HQYDVR0OBBYEFE/g+fIaza71PDzdenhcbwJf4K9bMB8GA1UdIwQYMBaAFKE9t1Mh
J+SajK+ZPCjDlG8+bLD/MA0GCSqGSIb3DQEBCwUAA4IBAQCQBKH8ASw/QIGoYpaJ
g4v5tQGG8/OjWYwEcD7s+tp8N58+Tv5Zl4ACYoCI8xvaOIsPc2KozuhZHWeOAMlz
Ox1oHEzhlHQmnIxtR+VY6gvxFTUz70W7sCE1jmMspZ1KLVRDbvT5D6wh8nBDnGxN
jKyKKYf6Imk0GFQxWzWtAhuBkQksDH86wN1f8Yz7EOqLfD/fUDhAHLQg89enUADy
9t+dgAuGfFDVKY0Es39OEhCKsz3N6EV3zXq7LwUbF2CBfHpDgpKUvu0FEM6qsUDJ
R8e5xJQQUcEGqXVNTsBnFWE9Hp5/xwmpu7PmhkSQbKPgveaO54CBTumlclKYr1SQ
f8iE
-----END CERTIFICATE-----
```

*Generated 2026-06-11T19:17:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*