# Keys and trust anchors

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Every signature in this library verifies against these keys. All material is throwaway, generated for the examples.*

**CMS statement signing JWKS** (published at a CMS well-known location):

```json
{
  "keys": [
    {
      "crv": "P-384",
      "kty": "EC",
      "x": "YvIn7UW1fYvIb-KGdhpjhka0NByG3BMRu4VTD1F_Iy1R6gCg1JdXWknfExPwspfT",
      "y": "0-cejuXzbNvbfKglenQ3aPBXLTT_8Oztoulf8KcPGf3Y5gg7xZdhCTJwLrbI-w7a",
      "alg": "ES384",
      "use": "sig",
      "kid": "eh1WVfbccERcx_hj1Ub-h2U-TdsZ7Fg998-JSuAnwOI"
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
      "n": "wD4dFhN6vSo-2eX8UKjC_rnuXHsO2v2Ex57AVLxCkErGKv9JZvKooZ6HxRYQ0sDRTFPyjPN38N-H82RVBO4TUjbMbIqfD_Rab7vsWaTYpegCG_Um5Ca_kyS4CTtKSGyT4DhMswYhQi1MIlFC6z8VeXxjVpUvnOJdtPaez2CK9JfRxtxA4jEG-gP0TQnX6cyGLZUz5VxplwFMQpodAE2W0gHQQL5te6_aSED6YFrOYMx4ma0rGyL5hYgSIDlmnOZuyY4i4rLJZLSHj7K-AgF3f3bz70wOek5C6BzzvecP2Q9IxN4I8Zhr960UulroRd-tY6tngkkf7_9Vits8gElEbQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "41xs7a8VWhHZQQmwY9Rk0RnGKjB7Iwy0Cpx-VSVDSIk"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "nuTfTmZn3vtDmOhLX_rISPBZ0oLbgEApUTwyN13uhg-XPfq_zspW9YEZG9tPLF0Jf6zBwMdwX334F1pC7D_znzPtlyj5pXWQYFKz8YBAOaoFH-uRPCdXb1_j87zC0FhkmDG-SrJw6LfBT7asvmkU9Y3imK-6kwAHxuL6S63-MbMyrj6VbspleKWMBy53oK3JN9e2aup12_eyIuquA9PJX4ski7kCF-S_ORqpH3jdsH5mjbPuk9TeduO1Qeq-cSSqtjCxLK9O1eaMfeOtBkVPPJ5hIkSRQwsz_8HEhkvp6Vf6V27s-weGVat8bkmjDzW4BLkncq8xiezlXRQrLlPILQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "58wB0oQ1tUjHWPQv28IdIkaDa4dlogwBgbjTlN8dA5w"
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
      "n": "m_3t34fFEcejtQqP60Wun1K90da2ej3Fta6MTOQGven_kYtJ7inf-Uk18k43GR6G2ckixyHhiLuGcfwEzCEhhluUWj2ky1BDeUbFhExViUYTj2PrlGqcUFW25f4Meo_oJcESUewwcCOqkJKGaV6DBySSDJROtDvtut0U3R_45qHIUkrLdvGvRC8Yxvt73l_RvjVC6OQZ5uc7HWglUL1jO5jwjxD4ArO1YiLFKLLFPP6i8jCQ6Gy86MkB5ey-xBXgVq5VgM6hH3NKgMWOGrS-gbE1J2XiBY2vUiHERrDwiGnIoef8JP5JYV8c7Mp9tWxF7q3K6yk88Y9la8Tn_rh5fQ",
      "alg": "RS256",
      "use": "sig",
      "kid": "MxR2fpUA11Oq1rksS5KH_Sk5KbpDBndLnY7mO5HnGEU"
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
      "x": "WZWeuaOT7PKHilOhr8oYJNHTHz9fhsAHVyJ3qn9jNP4",
      "y": "sVJlfRgzCF7S89e-dJgX9ehy4qtN23WZqP32mPUf2vI",
      "alg": "ES256",
      "use": "sig",
      "kid": "OZkNKz1Rjw6zQaaGhQ5SCA5iH1WJEndNWER3lQi_Z1Y"
    }
  ]
}
```

---

**Gamma community CA certificate** (the anchor Gamma distributes to its data holders):

```
-----BEGIN CERTIFICATE-----
MIIDYzCCAkugAwIBAgIUOM37HnmAJlMi+3tG+1qTQ7gUe7IwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMTIxNDUwNFoXDTI3MDYxMTIx
NDUwNFowQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYD
VQQKDBNHYW1tYSBUcnVzdCBOZXR3b3JrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEA5gjgB1r1mglUVMG0BaHPA4t081HFefwoqu+7eOqugXOs4BYISVKF
KA7pWE/UXj/9zEkS4V8sfYpbh8Ve3dpYEC/1AHC1fZHVkktush734n5coGImDsux
WRQHhwHVJ1MhUTwu6J7mRnEQSX275Pmnc9L9eeNzOn2/rkeualhOKg/SzMhXWIfo
GPb3W7AFGxsylwJzeg8zFFTUJWYGRwNtWVMIrUwn6bUDS4TaQAiHIlhpEW0rlHg8
ErEk8PLb+zC+pQ4vw9CLLohhbJNWP+Mdy4OQPYAiR+GYvvYhX5qBb3RWEydMcSFd
Tsku5SiPBwPwcSmuY2jcydFrbQ4Pf3qAAwIDAQABo1MwUTAdBgNVHQ4EFgQUndn0
TQpDQcjZrldg3H0rOPe+P8QwHwYDVR0jBBgwFoAUndn0TQpDQcjZrldg3H0rOPe+
P8QwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEARlTTnV/ppNDs
NGFQ4hgCJLtLrywGipXV5m6q82cdMut8Njjg1fpckxMyxWpu/BsGs3XCd0/NrBLs
Qt2AQ3QsFSNRtDS+iE/2+wsO+21cpp/4y3q/ItbpRGxNyXBI9om9tq4BEfpCCVi3
+ZNVw+YSV33J5KLUEg2c5tcBqR3lBblJTDK9E3GFtn670C96LHaHrUNZ6YpAwU6n
0qFptqdcqRvIrebvwoNVJcCK3pkjK7KordklGaXTz9ABdNj/P7Cl7spbjSWARiOp
4jL8kY9fwnHaswDT9gyPp5mNpNw/5f9pgJqnXk1/uwkGJS5vumEjJKLWObRrB6Zh
XrvS1gB7Og==
-----END CERTIFICATE-----
```

---

**BP Buddy's Gamma-issued certificate** (subjectAltName URI = `https://bpbuddy.example`, chains to the CA above):

```
-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgIUJgCGb0yNv/4MK7bKK7DzfXnrx0IwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMTIxNDUwNFoXDTI2MDkwOTIx
NDUwNFowKjERMA8GA1UEAwwIQlAgQnVkZHkxFTATBgNVBAoMDEJQIEJ1ZGR5IElu
YzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALEK1RsSirccSUpeKa8K
I286d2XYp2NYpZ49UVGlqgWt4VKqKDA2+om5u1rHeakwxuIVVsfnY2P6325SOvMF
DjfkfdyOBSLF1aZ/dG4CyEz2soebows5Gu73gWK2L3XfBdETDJGqKsDKCYFuFcgC
CupDUkC9XTu8463UORR13mMZy/QscF0FbESmRhODyUMiYc66SwtQNIssFZEV9Hhq
xi++8CodMOXitzWL4FuAwN8u7E7gr7pQ+lQ4RJfXJJRdXUd36QMh/XeTHAvf5XJv
JMuzd1ZK2Fmv5KLQokvs/fvCCZw38HxS2X81vOKOAhJE4bvdFtlcFV4DKfdBpTsd
LUsCAwEAAaNmMGQwIgYDVR0RBBswGYYXaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUw
HQYDVR0OBBYEFMdFzrWOg2C2uN/vLw9Pie6EJCtrMB8GA1UdIwQYMBaAFJ3Z9E0K
Q0HI2a5XYNx9Kzj3vj/EMA0GCSqGSIb3DQEBCwUAA4IBAQA8G9vbtuCPrksV3qIV
ttOVB8ozXeuLwLbIKF1mJamevdhLvUPnk9iQ98EIoPdi0W9buowIlvRlnxI0TIZR
34Sz4BoZOqNHAKObnv28txEZvpptaSBAWfr/1jVCZqKuWeUpbXUNOGLtDku9kjEp
YSJTRqo5a575DR4TYuQYuiwT57MRUpGrukVAj9J/lFw8udiZYtotErQdTxaNd3dH
aK9BQowvIBe2vYHfEB8NbysPNbd325fjxFn4iYzmh4KzGj2rXDDevZTbo07CY67i
XbS5zbqEmo8kSzH6cZ8xHryutCGwuHpKXa8NVloCnsD8KTf3ZDuPx+aW5U1xI+HW
B+hR
-----END CERTIFICATE-----
```

*Generated 2026-06-11T21:45:04.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*