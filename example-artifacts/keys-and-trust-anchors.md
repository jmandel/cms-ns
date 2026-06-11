# Keys and trust anchors

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Every signature in this library verifies against these keys. All material is throwaway, generated for the examples.*

**CMS statement signing JWKS** (published at a CMS well-known location):

```json
{
  "keys": [
    {
      "crv": "P-384",
      "kty": "EC",
      "x": "Ou7SDQWOT-JT2NE8O601c6HSQaXdgXYsnwMjhePZNb3A6VAck8p3X21dP0FZ7W2e",
      "y": "m9EotLlyTWMuKhJ0pdeaJOP_v0KPKxlcYkM3RRNvlQ61dXwYwcaoXaKmyRDpWn4E",
      "alg": "ES384",
      "use": "sig",
      "kid": "3_Fp1CQOE5hJjFAjzFDQxktiEnDs1Lw56HsBcie0eFM"
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

**CSP (ID.me-style) JWKS:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "uq-ivz_JLo5bVvcCIdjMQbBxGd5UOf7dA9zEljSByZyn9sbVZsjttXY-lGW3r0K4EhF3pBmzhl9dkN7DJGu35r6REVYJkw5Ejwz39AH0D7xJM1omtzmzqdWpAGYLfFujr39PRt_GFjoXJLpvosVC_mDkVrwKtkNWlMJdZqCh7vui2xktvSS-6hV6EDYCGUL8NifLC2TO6t84SnNCsjC6MF0VPy66F1ifcxKxFRB8YfSbhqSOLFpkqlwKXZZwgLQNaWZt9-z1USuPXP-jfhosIzc0TUilrcyqLEOWWp2P_EdsMn7QcEjWun7E5tUPdVo8Xbw-jev2YRt0k3YW34VJcw",
      "alg": "RS256",
      "use": "sig",
      "kid": "_Yu72g7KQDNsgKUN9m3JmmutTmVGiLZk-weovz6aCFM"
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
      "x": "8-SpnBwC2EpIDT-pwGzqLNqO3I4WA_99f2iVBRqsXpg",
      "y": "OH7uCI802pQhHmDlRLQSIJmtVIO7w0dEBOWSraWHz-k",
      "alg": "ES256",
      "use": "sig",
      "kid": "yjoOMmtucioW3Qkc8sXjlLOU5dPQRVuwPvOGAxnX-y8"
    }
  ]
}
```

---

**Gamma community CA certificate** (the anchor Gamma distributes to its data holders):

```
-----BEGIN CERTIFICATE-----
MIIDYzCCAkugAwIBAgIUWoL5AVuFhU7fUskLM3p60yPnc/0wDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMTE3MTkxMloXDTI3MDYxMTE3
MTkxMlowQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYD
VQQKDBNHYW1tYSBUcnVzdCBOZXR3b3JrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEAzcwutLU8VFbS9TLQOW0Iwzos2wHZksLIxXHB+AEHUTQr1mc8DDcj
8YlKG81BlOHKYK0QqYNRBjJKJlhXX504OGCSJJm/I6JcXb26xzMa4yxE7PWebjiM
sdr9LXwlTkWPuJn7d7mRFHrTTR5ZO9cdG7aK3sVrgsOk3+2vUzD/ziBZUiILrAIS
FhHd+Lsxb51YCX4akwLcxtjEwqEoZmKfMvcS/TLc2n0VYlXKQNidUtgQuIKCRgDB
+g5L10M8PSZON7JriPBrdplh2/E6IABRXZb4aaq/a46A6xtIYP6iKpO3vqa+Ha2b
O5cJRSl/FHsVwOqHUbqAuCbonzOx8lC74wIDAQABo1MwUTAdBgNVHQ4EFgQUEnm9
wfR9MWyE+XnUlotmj2jBtFowHwYDVR0jBBgwFoAUEnm9wfR9MWyE+XnUlotmj2jB
tFowDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAVL3BRZzEy1Fz
ENopE87nMVgLJrCQJRHZBvWWfMKzx7SaFxjMZbnq09lhQwTTIt6WAeWi0LNYvQmC
sl3En2UXS6e1rsHUWoGtEDdhrGqZVelBiaH+hx39+gXF8L8/GGD0S1hB/PFc0RO2
50rcMSfrVIANy7hANyBqbfePx7TVx3++SvKYPmxClL2YAhoZNk7bWf+fyILhbzwC
dUSC9YL103u06g3KGEAaoIVaNy3ihnauajG7e+xetx7fScagiAbmZz9cgFivVmEV
E2ocytOHZvqsOeIr1Cxu3tmawEN52AWCZ3mrZXJi1iMMD5upx6EP8LP2uTAe09y6
by8JjXKwBA==
-----END CERTIFICATE-----
```

---

**BP Buddy's Gamma-issued certificate** (subjectAltName URI = `https://bpbuddy.example`, chains to the CA above):

```
-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgIUR/637Hvx3eD5JGVBMyEGDTFCpgkwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMTE3MTkxMloXDTI2MDkwOTE3
MTkxMlowKjERMA8GA1UEAwwIQlAgQnVkZHkxFTATBgNVBAoMDEJQIEJ1ZGR5IElu
YzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOIyv0fCsn5pcrE4Mazh
trCWjKEo9rUrBicaMN5F68r22xguLvbOQG4rtyIhap+lq9JNkIlvNEOmQgw15K+8
CEt1sX3X95bCsqeE2oKsrdHKNE22890H9WLfnneQAXvV91WFRkD97eGElouE/QzP
4qTeP0faUsesXMJcdd5oYD1+hROuaTjqvsxaTwa/NNRWVd+KpbugxbSeReMjMDV5
F/EnqiopTURK/7j1M+6UTQBIu5Bwyw/1S6E0YzE89UqYVtGRZ2MvjknC29difZo3
1wwFtfasYOgFFeVcar0bbT9iVSssmVPN4ymtsY5Pyp9j0pViYzsTK4XS8Qbh/74X
dDsCAwEAAaNmMGQwIgYDVR0RBBswGYYXaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUw
HQYDVR0OBBYEFKctikxrmQgofTO/And9x4Jj5ihkMB8GA1UdIwQYMBaAFBJ5vcH0
fTFshPl51JaLZo9owbRaMA0GCSqGSIb3DQEBCwUAA4IBAQARNqfuQ/HDcSKWlbe7
0wzEr4bsSFuQNKP2QaluLFGaXwKKVn6sioRiKWbqF1kInHzqmNuTTrery9VHyJ17
APdcmOJxdWQaSb5y5o6dX+8icTJbijoN4ScLfoXWH2vQI84LKt7XxdaAIh02GNZY
yU5l7P0fYEr53L/A2Epl9+ljUb7hPMu6BpeDtsD/iEwSGY9sucRBoxmi7jgzUpdu
LTL8gaGzH+ywEaeslwMm3jOOJHm0vpYzfkKg5J1f1EMcNFJutybiUjPOjE7XvO2j
A4HR10+To9lmMpbGv3kB0DGwMO1a9he7FjS1OWDmmpSS2LxgaAF3V6tJrk/HSiPr
VF4u
-----END CERTIFICATE-----
```

*Generated 2026-06-11T17:19:12.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*