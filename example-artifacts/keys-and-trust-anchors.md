# Keys and trust anchors

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Every signature in this library verifies against these keys. All material is throwaway, generated for the examples.*

**CMS statement signing JWKS** (published at a CMS well-known location):

```json
{
  "keys": [
    {
      "crv": "P-384",
      "kty": "EC",
      "x": "P-GEwmNnwR5ZX4uQ2bidUT6W0dE1Nc0uoZecLIvzhdZ_LE1FvCQ1tRmD0JGvspLj",
      "y": "iACMCxm3yMXZNmRqWl84KCfFAuxXl7TCwU_FesZnvrn32ekdpCgZkmfVIPfm74sO",
      "alg": "ES384",
      "use": "sig",
      "kid": "XbpCVwf3HsY2ZEYUmbBixNLhEMVNocjI7E6IyTOMLvg"
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

**CSP (ID.me-style) JWKS:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "1U9C2XYwY71YL5YS-Ft-G_BBH3OwYsXtRhWhiV9lNO_wPuaHf-wMiZzYE9ithdujRC9QqQDt5kQG-AtAhdXbtxXFbc3SpCjHbzH40ffW5KXxZ1ctKVdcM8BXzqwH6ch83O4CkJswRZrPjoOLgMqylV09B3D9PuI4xvpvD3GsmZkEVUpDrdqiQKzq1rBjHkCdK0lg7hxTEPPC_ZmdODC4jwuJha5u2Ke0D7DbBlhr8fTC_ZH9VUdmXU8i9YlbuwtTSA1z-vYd2i3guyt3D9hD0fPT5v2PmPUMoju-zEvzU1FbT-S-cfodfCIB6pRX120w7kC-zfUMZwvd0j8XMvGPzw",
      "alg": "RS256",
      "use": "sig",
      "kid": "kV3MV7GygzXJv_Kz9xYcpofRfjIjAIxpB_eAyLK4dD4"
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
      "x": "rA_uYWvnYpcGOt9YUvDA6xLx0zJyIX0Wz_xeoE-YJUM",
      "y": "b7oIOPg1dhlNyKdqlVmLE3s1BPqMCR2uhy5Y5IdUxBo",
      "alg": "ES256",
      "use": "sig",
      "kid": "TELBEcfS4jB_M_RQP-aLLxBAoBwfH5GXVL5-Zf1mdkE"
    }
  ]
}
```

---

**Gamma community CA certificate** (the anchor Gamma distributes to its data holders):

```
-----BEGIN CERTIFICATE-----
MIIDYzCCAkugAwIBAgIUNi1S7x2ePpYWaIYJONp2A8hsQhswDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMTIyNTExM1oXDTI3MDYxMTIy
NTExM1owQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYD
VQQKDBNHYW1tYSBUcnVzdCBOZXR3b3JrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEAkiqXbrVM4INvFDAwgjRQhryvgGVg+6smRJlFNNxHFYdFU/RmXY9a
6ByTr6Le4sTdFgq7CPFwAPehmLGx8Ecqp7N62udHyFjPhuNdoi30PlqvwqgQJ0I8
XSZMKljFf1yBCSsJFkGDzqkqDvibuXtXWGcUa/spy11DeZK9bXag5lbnCpVZ/DQm
7N4KGg9g3jhN7ok6gPG0aUKNZYIttPFTg9aWWsahX6ueIfUzifO18wkbd5pDO1/Q
jVKBk9e40rXywqfyxyHHV7YGMYWwCCiOnjAbRa6ey8r8Li10BCQ2xeI59n6YB4mL
Wgs2TIi3cdUtU64QyIIMLazUU/m0umgzrQIDAQABo1MwUTAdBgNVHQ4EFgQU2iHI
aK7MX9vkHZOoHmQli4GS7MQwHwYDVR0jBBgwFoAU2iHIaK7MX9vkHZOoHmQli4GS
7MQwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAZvP+rHBcRqBe
3eGDpHRNhbvMqc69l/otibNUpBiGNd3ljYhmGEa7dDCPEoLIXSPOpOwJYO/twSJy
/VtH4Kh2yYoeTzAW0lwroySkeoL9loVqDLC1qvDp5LShMMCYLRXm3jfGOX3hWX1w
VUzKJ/2NbFWaK3APz1vLSjFQbscT4w/dk0y8jpBecQi4fqOIJVTFRRlGvMK6fHtg
oCyVMWnw2M9r35ak3ypmqTfhxq18b0WH+mL8hH1r1qf29qa3fydaUkWOJXjqGUcc
GHFaBzRvg+KxIP2cqKdkQEAyDoqTEwr1WkPkxl3fGVs2G3QIfByRDLNumktku54A
vXOBPofrOQ==
-----END CERTIFICATE-----
```

---

**BP Buddy's Gamma-issued certificate** (subjectAltName URI = `https://bpbuddy.example`, chains to the CA above):

```
-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgIUczjscjiPwwcbOu9gWL9Wh0giFnAwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMTIyNTExM1oXDTI2MDkwOTIy
NTExM1owKjERMA8GA1UEAwwIQlAgQnVkZHkxFTATBgNVBAoMDEJQIEJ1ZGR5IElu
YzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANtwbtaMf2fMcjjNV3VQ
juSoaZO8AT8KjoxWvmkxORXuh2PtnQwDk4R2ils+O9kwCwp+xUHKMxFvqvISmJJc
tD1fEb1on9qD9zXFlk0glZMi/WY179DnGZpz1r42pwLqXIkz41Vl2Cw6UcQH/ath
qEM9f+U2Ir7wFKpuDS2NeXs4gEjMkyzVkbKaYesHtJMdcxOIfB9aWTlz0NAhbdNn
TGDDGLChhBFDuvcvIhhKIUy/pAtU9cL1QStiRikG4CwrHMZZceZcV0t043y1V5Lf
N8yVtUJzw045Bts8DkBRtUuo4yD50vaNJyFcp6DNi08Oz1jW9xv599O34vG0/u5s
Fg0CAwEAAaNmMGQwIgYDVR0RBBswGYYXaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUw
HQYDVR0OBBYEFLMGaMXp88OAzgt68Etopg6R8Qf9MB8GA1UdIwQYMBaAFNohyGiu
zF/b5B2TqB5kJYuBkuzEMA0GCSqGSIb3DQEBCwUAA4IBAQBi9zfq3BCU04V64GdN
189QN1OEz3vahf7JnI0iKpGJ7XYmGVD9H+Y6O5lUFTTFRLE4nmjMP2mddIR1aYLw
yY6Pgike3iYVZvrwvlJJ0k+sPE5NVi0jSbrj0oizi+n6M3poMu/7gDqBru52+tD8
gZd7TcTamwlKiRlNQdEr1cbEGAKaSySV6YkJYTNiabVIZWqsDWaczC7f9QzSrwsv
syROEcohVm1goNWgZA8pQ/2f63XRl19sG+oImoNy2Q9pcsDXCRBUNBuJQvLv/ZQn
Dou7sWqPmrIV7QOQkHzTidakEiJMvDxIz487I+Jm90wP4qLYezHTHoEAMQ2M+AYi
YuqK
-----END CERTIFICATE-----
```

*Generated 2026-06-11T22:51:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*