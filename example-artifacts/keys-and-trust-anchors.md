# Keys and trust anchors

*Worked example for [the record location and data access write-up](../authorizing-access.md). Every signature in this library verifies against these keys. All material is throwaway, generated for the examples.*

**CMS statement signing JWKS** (published at a CMS well-known location):

```json
{
  "keys": [
    {
      "crv": "P-384",
      "kty": "EC",
      "x": "xvxYvG605_LeeGHTp8p6b0LrNthObC-zqcF3VUjY85Goqoen9nmtAxcq_8AOtRNH",
      "y": "ZBtBjph7UA3lHEzhXZ9AVRPK83Ug9m25ebZ-YIaUTDO0aT2mUCl2NC9zeaghZDTi",
      "alg": "ES384",
      "use": "sig",
      "kid": "4HUSuV4i4qWU0eT--7jxzsrsGKgMYKMHPfHC1PslaBI"
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
      "n": "rweBdrluQGrpIPURg7uthcf38SVnm7sv4mDa1G35_vzDsbW72xGJZKWc5KvZx9vYhJzuuSlfaM1VARdZQcs5t99xCpbV9jC4mPA1FK21c6OXTSz4lBMiWZiBbNDcRuMNMCx_leUKirkOlz6E7DEVB3yqQRxl2xpeEqIcZqhmFJkhXn2vBE0kDiVP9dNhxzYxu45-PzQn1J2XHTBlil8K8KsSADM2b__YwVIbk_6LkhpJWwe71kG_bINVuvBUSAsOwK8mylLmYHpgQbG2AnhaopjmT1GOpddEayLP3JK0nvxFIL0uMyfrGPSf9nWHZa2nuStvB2FCSnFE_gUhhs92Nw",
      "alg": "RS384",
      "use": "sig",
      "kid": "d7-ZR9YVxyceybmFmLd2neNVusoWmKrS4am5ZgJ0ado"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "uXOCXS4iD8e0xfk9T8HTtyTY4mZ034TvSkmZr1XYq1T79nbZnFwTglC0uBBHXUMuz_PFQAMHpz6BU_BmbK7Saw3u0u9OmFVxJerrT4PL2eo5GZt0nBQRzkBpjpJpuGDpYlbQLNbV8ovUhPL_xijPgPUEtDWcGvvXhlLJ_VgqkODlXLoW89-LDzX3ukhgem8wmcvhYHx1QwhWGAdFyHGtZSHaCAmHZf5T_dnJIDSm0wLCCuDpV5AIMv29nwHwWpTyFvLG2znVKBUjgYA9rZFgizCz_VUOhVZ5fgFFNnnEPdX3GMtJFkKobnpbZ0cZITFQA9SmkqqGTfAh47ZnJdtxuw",
      "alg": "RS384",
      "use": "sig",
      "kid": "3FvbhIW0H-MJTAdnEluFmzbbEBl2D-2uNkkot6fXWzo"
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
      "n": "uiTAjuwiTj14CWiPXD72K4nmYIU1ifvy-vtqcnoB7y8Tenm1bga7z4evm49-LtDqNwKjAUxt7kyBVVAOuSPjniq5KJ5Yx9_z9g0p7MQOyJvgqMvN9RdCyV2l3Tw_IFu6Aay5f9ZpehvF8TR7oA1ij8DTCg734MvSNEHTqjFn_Yq-2V9cGaH2hmAMogH1C33PgvoXlW70VQEZue2P-_0GlF_RL-5SfPjsz62umxUXh80DrcuV8MGfLljsapy8Ve4GnMrriQmBfvFxImG8TFL0dJTmRcAAGTDG-MCjYQ9CZ1YQfaPBIRNkvZAVxF4JllAvUjzwQ4M-52J_Dhfqrq2qNQ",
      "alg": "RS256",
      "use": "sig",
      "kid": "sra67vA2-DrQL_P_gEPrAJwLkKh09DMUNBwc2C6P7so"
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
      "x": "eoeQwX3JX31TJ5i6_T_9jMoIlZ-OwIVIWBlCQ4JP0Nk",
      "y": "P2bF039s4IoDL8bL89OtAvP0CrRnNA77-WuTRz_niFs",
      "alg": "ES256",
      "use": "sig",
      "kid": "j-q5k8Nafk4LE9uIulMGIzTXanf1q3uQu4W3owvoCHM"
    }
  ]
}
```

---

**Gamma community CA certificate** (the anchor Gamma distributes to its data holders):

```
-----BEGIN CERTIFICATE-----
MIIDYzCCAkugAwIBAgIUGUoBGqIvPGFNNVCD4Ch2SJIN0nUwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMjAwNDgxMFoXDTI3MDYxMjAw
NDgxMFowQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYD
VQQKDBNHYW1tYSBUcnVzdCBOZXR3b3JrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEAzn8fysg6iBWV4NbDwzUEtxKEEQmVjDHT8mCyZG8IMsiDvJmy35p6
VXWy/WixbGn1KHXJey82w4+CAjZ2FClsiaU0L/bU4HLahhz8tgTiPaXRmCcPnMeG
Cn3DaEHod2gKxL5dfi6Wl0QluBpSiKsRn5wVcFpkleWTxANvbJgdGkLoXZmt3lJc
s7zdwF4OMsdlweB8IheQlhZuKeOa9aFLBLuTH+FB4JusxwFqPHm+2poNMvrUuMgl
6gpMlDSGTFcfomnsthQOfEWHkP61E+dWNgDENndzRseFEBSHBy6wATWp7LO/d3dB
gO3IT8I1oR3xWoTCgPiBV7LEkrruQOu16wIDAQABo1MwUTAdBgNVHQ4EFgQUi97J
zVTDuQvsI2Qd+ki/FA/Ri5owHwYDVR0jBBgwFoAUi97JzVTDuQvsI2Qd+ki/FA/R
i5owDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAQ4yBJ9UQR4Sc
bU22gNjnluVJWBn0+dxrASqeWhZiMIODG868K/GZ6ZzFf10z0gfrzr+WuicJOuhC
16LvqA0B/FvR3ZZDk+AEK+IjwqKn6bMGepvADP2eDZBivsR2kUc92sb/m6OWfRLS
cii8dEjkVtIDxrktgIaWFKY5lX/fsWG5eJZ94Eq28nIW2+UMrqOfaWfPmosqFxEL
Oz6itdAVws5jZgYya7NfU7aZ63XLDsXp+fqQer5cLdrjJ03bNJqts9EG1AlHZelM
lavZfR5E6LwDkCyAng8aCi/PsIhG1/bx+hWXgs14gKgY+LzH1a9TEh4uVtRmuuIs
MsTohiNMGQ==
-----END CERTIFICATE-----
```

---

**BP Buddy's Gamma-issued certificate** (subjectAltName URI = `https://bpbuddy.example`, chains to the CA above):

```
-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgIUDLR+v6Kz6tqjmo3pnhXkNEt9EBowDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMjAwNDgxMFoXDTI2MDkxMDAw
NDgxMFowKjERMA8GA1UEAwwIQlAgQnVkZHkxFTATBgNVBAoMDEJQIEJ1ZGR5IElu
YzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM56fMhX7ruzT9OAnTht
Fm1wMgRFfWrlUxODN5LYVJZgj5p85gLS4Apv4mBBjSpL6PvxKcXhCE8d45gGVUPE
kSHUTQboAgRM4KRZSo+k+8YWmDVO6KEHhneoe+7IA6Y+iq1oHrMDK9XFG/Sj6Xbb
aCY1T1jX/iVgPqLlmarQ0rPgxuV8M3viko5lA/iN2XNzoZ9MJBbuV2te5FTWztKl
xapDStwppVKCg+r8QG9gfWobXhLMlWF09r/nNWdpOZwPRroLIR3jYuz7W2HqKxB4
AonY/WsgWMgXtQvstOiBe4NmIpyZYz/FD0JP6lppN8mrf/61JPi6eMlb+6KeMvAg
C8MCAwEAAaNmMGQwIgYDVR0RBBswGYYXaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUw
HQYDVR0OBBYEFMjOeNF61B9mDeC8GW8buvERmldfMB8GA1UdIwQYMBaAFIveyc1U
w7kL7CNkHfpIvxQP0YuaMA0GCSqGSIb3DQEBCwUAA4IBAQCVALSwX1ouGlpkc5mb
i2GaB3oChm/8aLKzbx25h6iorUIrMjWNMDjtYCOLQsINe90EZzHL1OYIHFABGp+Z
2haPgZ0URjelPcOHJYLHTECkUT67Tw/Ext7uEE3QfhqGvaPExHkNpESce2IoKSpN
IBpntAdMK0YTqNY1UubMJRVEbALGWvVYGo6+u6V61Ume1Nu6Rf+0WFQ5Y+M4J8xk
TOoRdgz0wcft+NiDhr/cXQGqyR42FHB7F7Fk5hQA5cDCGdNA+XQ5LyJlRt0GLG1h
7zMDJj2kAhpBSmQ4fkBIgfEinD0XZuJ97ObyX3XkrIpBXTwEHTHIEJBBFm39qCrO
KBT9
-----END CERTIFICATE-----
```

*Generated 2026-06-12T00:48:10.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*