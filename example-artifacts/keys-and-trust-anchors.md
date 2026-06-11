# Keys and trust anchors

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Every signature in this library verifies against these keys. All material is throwaway, generated for the examples.*

**CMS statement signing JWKS** (published at a CMS well-known location):

```json
{
  "keys": [
    {
      "crv": "P-384",
      "kty": "EC",
      "x": "ZtfCyDewHWFWR5YtuuvT-ZoRU-aHdMsABffxpOuY8UZa3lsoUPbwKaJoJm_2rnLC",
      "y": "Hu2DSp7yDIKp3FJ5JvzaK49nLrDbysRuWs8QOsRlVeQQBWqJ14BTnDteqjl5HgS9",
      "alg": "ES384",
      "use": "sig",
      "kid": "Anm2uOe48upUSmnLJdGh25lol2_Q4LsdO_q85OdbOOc"
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

**CSP (ID.me-style) JWKS:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "1kpxnYBr5F7ZLWehebuoT-0U1t6A5ME_1UblxHKLtGAqKvw0gccG7sGO0QDf2N9nmejN7xh1xzegiPYJ6SmIRBswgeaNEenrDsngr0NLHYs4H2myr6LG4ulYVTlTFQkyk-7QcdDwYVxsDNA7XhVi6HEjWOQ9h8K3bnPoPmkFNb6MNNvpMWsg601-pY2bDHkdaUQVQIvY1pfWqwhA23d5M99QAFnwUk5es1CPQ_exl9wlSBHrqr72OBP3DzKYk4cWoV0Lkdc4DJna_N385C0oNopo4BeI-HV-cvaNawUfW7-y3ckFiMzUarXM82nr6iDTzZUfFi9ZDJOhaYXJU72DiQ",
      "alg": "RS256",
      "use": "sig",
      "kid": "NBmivJxa3OUPBaqMNM1xARGTmvSFgNmVDKGytrgJJ7k"
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
      "x": "yvG6g1a_zeGHvXSOscWFLJPcFyQpDP9p8dRftpFT7xU",
      "y": "EoWN0g4ZW3sw5X3XL18fvDNpVI5LUOqfCFEYi1zGklk",
      "alg": "ES256",
      "use": "sig",
      "kid": "jkDYauiL7-xvZiDWY0l8X9wE3K8E5uprpwJXRzgOfoA"
    }
  ]
}
```

---

**Gamma community CA certificate** (the anchor Gamma distributes to its data holders):

```
-----BEGIN CERTIFICATE-----
MIIDYzCCAkugAwIBAgIUWMTVKj7J9vO07Tyc47IUOYlCntwwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMTIzMzg1NloXDTI3MDYxMTIz
Mzg1NlowQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYD
VQQKDBNHYW1tYSBUcnVzdCBOZXR3b3JrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEAzITaORVq7KxbhLYDGCUiM4sqs1dRVYsiEQyyycsDRnhovI8rjv8Z
3zLBxjxXVGGHEYsH2bGMeMc7YtOF/FnMpvZc6O13uVFkZAzbpXAspzVkKt58OPL1
KrwQxCG9DFb4vnHAzmEqRHEfaCFyGSewsKyx9Q9cL2BeZYcbzyKjJUsKPxD6D6zO
D0cEd1ovJIoQ7+sEtFHRPc8tOnmd1y1ewxRo65Nlu+a6Xl7EcKzTCGcdXwnVz1vU
8MLI3FsKmh5v4BvEQppVrqVj4YJ42ByvxihBft7ivX50yL7YJpjR4IAI19QfOVOh
dhyKYud7IH3vTR1ZCZlCPU0U4jpUsn/+QwIDAQABo1MwUTAdBgNVHQ4EFgQUz7cx
nlkRbu1ZcSxS8z4W5oEAoW8wHwYDVR0jBBgwFoAUz7cxnlkRbu1ZcSxS8z4W5oEA
oW8wDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAUSg1iEycSyCr
1rmkkfcvbvCteR921y59EW1vPqOCura6pq1y92EqxNhwPJVrelUQ0Eb2QXGWWAaH
5dDCGl2LIV/jECOXNchac+0/vM1q3fTcVRFWa89o2r2AqOmg9ByqrxTPQ9aqIOXU
wHkLH5glvXuVV7QpQ79ewsEBI+P/Y77kNdP+JCpwxEGCIrYm5V9ZvPvl8Ck+4DZA
ankV5VyeCtDH82Fh09lrLRgHYw26q5He0WDMlVaqDB+jq295HwDT5eMm8qW15aJ5
vXApzrKYziJtTj3Dkkbl7TFuNHMcz8RHTKIGSKITZpZVsX02KL2tJCHLcODfwh3O
klgFJ3+kDQ==
-----END CERTIFICATE-----
```

---

**BP Buddy's Gamma-issued certificate** (subjectAltName URI = `https://bpbuddy.example`, chains to the CA above):

```
-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgIUJHwBOW8fqu+5OrY/vDN6n80GWCswDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMTIzMzg1NloXDTI2MDkwOTIz
Mzg1NlowKjERMA8GA1UEAwwIQlAgQnVkZHkxFTATBgNVBAoMDEJQIEJ1ZGR5IElu
YzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALGygY6LxaENR0SMU+2A
1DucLiMocsMyvOIMNUmac19nggLHZDv+4MiEaYsPJgMW19Al+Zyv9d8juCawxNN3
TxOxcUE7w7fKrCivr54BjK9OGIRS1Fq8F39azRLB0kVJH6Aj5rGDxO9iTrM9BUqG
x+jvad5Cs/fahwGs11GrwyuUKUyMliA8qOF0Thl8nZXoSY3DiDKDa3UKvjbCOe/C
gu5foMGPpLAUBL3w83AMLatbcnjLg1aSxsmc3IYNf0T4oI9G+hxZllJmpu/Rzjkl
tl/AjoxsYWor1nwoe71Y0raCCfpl/0a+edQG1jL0bgOksFRicXmwXFB/JcggNLJT
CQ8CAwEAAaNmMGQwIgYDVR0RBBswGYYXaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUw
HQYDVR0OBBYEFKTtBmfdjLP4tOsE4xoU5h5vDspLMB8GA1UdIwQYMBaAFM+3MZ5Z
EW7tWXEsUvM+FuaBAKFvMA0GCSqGSIb3DQEBCwUAA4IBAQCSSl/T5swk6mZWqWOv
d+eRtbpT2yWbO7GwjpWGC5sINcS9Gp5ybkQCO6Fsu7WGx8gKbejX+P807tLXX1db
gHbJrkovJrL9YgU/1DuK5gI1Wl3mKWFXUBsMRRVmHsmphKWNY4c32z/FgTTJRF4o
Qyu2FGd19ZEQND99+jRoUp4nLBaqF2sm59x0CbPT8d52VKMmKlg08ow3QUWLpmDH
vPSy/nOI4xmTAzfJakbbh0iNOMK27xx070FU0yUdmt21I8pHy9Xo5mYT/0V8gvp0
2TG6ABZnRDinANfROJkDVnk83OQVirC5PYrXZKYNbW0fnOeSYGrwkj1EhJX7Cm3k
kmF/
-----END CERTIFICATE-----
```

*Generated 2026-06-11T23:38:56.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*