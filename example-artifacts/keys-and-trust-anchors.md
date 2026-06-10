# Keys and trust anchors

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Every signature in this library verifies against these keys. All material is throwaway, generated for the examples.*

**CMS statement signing JWKS** (published at a CMS well-known location):

```json
{
  "keys": [
    {
      "crv": "P-384",
      "kty": "EC",
      "x": "q6lJPguvq4ynuZJstIYH48SK_DHddpTwnEOqeWgTBux5aeQdSihZ2jAUY8u4cS8G",
      "y": "S8rTUFnEzg3PZNEMat0aop3ESBLn4zuxKa4e73d5I4WpRDgO9t6eUTu4n-sl9pXM",
      "alg": "ES384",
      "use": "sig",
      "kid": "MVtutXnOhtbnRTlwp8Er5_CC4GUHp-RyRchBeFIiXa0"
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

**CSP (ID.me-style) JWKS:**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "oabBVS14giZGYxGRauM2aa68Vsdn1-A9bAOk2-81aWqTjexNVQg5KhEq6N2Ud8KyoCgAX-qdVGK0HKH_NeBVHIT8eoR8cQpEBg0K3pmJrgFHg-UJniINl0I3YqeYeAbqCPns-QB7w2z5rhnBNlL4PY2Q4YYw_WAPLK3biL2uUakaIKS2Ns4u4HKx1FQAcrVWlQfAqjvM3FNGpYXQQylTeg1zQ9ey8RBpE5jpkT8_WNll0cjBgrLeFyF4eLleEDB9sevQLVR9Kw4bRe8OrgBI0IJMsXjCghgYo_MLCYoU9wMMlEXmKUa9S7SZoM02J0_SaCN1tj37A3IOt0nefMeIQQ",
      "alg": "RS256",
      "use": "sig",
      "kid": "qsLc7eg2e8VsSp9uvwJevxKDIlQkISeNsrQRbKK3Jvs"
    }
  ]
}
```

---

**Gamma community CA certificate** (the NPD-published anchor):

```
-----BEGIN CERTIFICATE-----
MIIDYzCCAkugAwIBAgIUWRnlggHHRf0b774DsLV6cyPCCREwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMDE1MjkzNVoXDTI3MDYxMDE1
MjkzNVowQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYD
VQQKDBNHYW1tYSBUcnVzdCBOZXR3b3JrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEAsKSaBu0wpCDEoooUhaT+O/LgkV++TyxT0KpVzWhujReA4Y3/I1Wv
jDuYk8JDg9+CJguzthjwfhmrjeY8b/a1nnVljxE84Y42dzbt1PlRxgtAbypg3KMF
Os5R24hAK9BBKviSK7RBMsTHz6a88/0CXi1MpAJtfo0bOqpq7S8btE0EGfJMWnyG
3s+g3/9iTwtVB7B7939GHCx9dUNdz/aAV84icIhPHrAEWiZyy5n3geYHzYORaxu4
hcDYn38W6mOMXc3VFNWUxgkAOkAaGxilVbZoDg0oVbe7Y+rAcLZfp31bNOtXdR7I
aF3auc3f/YonPmBsEhlvRQ3Y7ZpDcIm2fwIDAQABo1MwUTAdBgNVHQ4EFgQUM+g1
fwXviu440mdddfew9oLtzoMwHwYDVR0jBBgwFoAUM+g1fwXviu440mdddfew9oLt
zoMwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAkY53oJywLBFE
Tbxhlu3ryr43BaDBfoPQeuLi++9lXxxuGiZTa1bnwf28jrW09ngUks8R2ELjwEEK
FY/4fpCyjDSilU8DnF3N3L+Fm4YJwQ0WzcnSGZq2C0vWNzYh3Bl66znI98W46RJ3
ucLwckShFcYpf1khqVMWh0C9Vwb6AqcCOANyqFX9/DCEwkKwHdVkjKK2K4UfDoOw
2MjhBM3Wa3iK2IlQfKJpoz37zDHhiGuU1DeAUu0dCU2vi+toHp0+p/hh/1wy+rQp
kHxNjNeKSXKbkE6XNPCECxlJx5RBAJtldZj1EELfNYZQbvTi1Jx+8fOpOuiN1PkA
foOheqF/0g==
-----END CERTIFICATE-----
```

---

**BP Buddy's Gamma-issued certificate** (subjectAltName URI = `https://bpbuddy.example`, chains to the CA above):

```
-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgIUInfGASkhBquroKD0aO6KB2Pvf5YwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMDE1MjkzNVoXDTI2MDkwODE1
MjkzNVowKjERMA8GA1UEAwwIQlAgQnVkZHkxFTATBgNVBAoMDEJQIEJ1ZGR5IElu
YzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMviEHyvlKYLxjJFS93p
BS+/tqC81uKmKawdDxegHhGilnH4P3h5oncepCr8+qUL045HMOmxdOYa2GdnznYj
ixzkSl1l+dRtMwGmEGsvBNcx2GUm2cruJtJZMN/8ZQdrPupQW3kjBDLtzDT39jaW
JFLrQEqIJ3Pa3q+18IfjSlTLWpALJy+KEcVJ9deDJU6VOoJn4kBqFHBc5NxjsxCe
eaGyXW7u4mA3eXNKue4tMWIb6glv4SJydclJoypmeqdfgw//26H5C++LKwj2QsYJ
dIyXwd9mAKSW+Y1zgosD/jaSNC8vzASrLDiipyDaqzohaLPr6s0lH9RJouD+8HPO
K8kCAwEAAaNmMGQwIgYDVR0RBBswGYYXaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUw
HQYDVR0OBBYEFA2FH4Jwk6aPnthL5Nk5VOFY9RzGMB8GA1UdIwQYMBaAFDPoNX8F
74ruONJnXXX3sPaC7c6DMA0GCSqGSIb3DQEBCwUAA4IBAQB5LfCMiZ8UepCXto1H
lZ9bA9IHXqKEQ/WKv5da456z3hKOckXJl9LQrdrPO0qqm6UdZtgQMLxrIa4DCGte
/fVhZpdoAxUjpmn4oSmjFbPX/6zmwocVKMBc3MmbQPSG00KMTalg9sPFzYwjSz9m
ZYyzvG5EoDW8gvpXHjilWg+HSPjLNSDrxeXRSlSmFJHo8PBuotZ15GEiCXPqANFR
x0k76fcqvdOsLVFJnj1aJ/6QTMFKGua7Ffz73HrDwso83dnkTIOFEIg1ailddk7+
LKm6NaOC6Yf08ek0lO5pYN0CQXp0vVEveM/HxuR6BZjA9qV4XThPV7QVn+X9QUVH
N+ff
-----END CERTIFICATE-----
```

*Generated 2026-06-10T15:29:34.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*