# Keys and trust anchors

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Every signature in this library verifies against these keys. All material is throwaway, generated for the examples.*

**CMS statement signing JWKS** (published at a CMS well-known location):

```json
{
  "keys": [
    {
      "crv": "P-384",
      "kty": "EC",
      "x": "Yn5RSBS2xOD6HGuuWCDRILR1cFVvlGsF6bYXnzkZ8gOiJDv2Ih2B-orRBz0reSy3",
      "y": "Gn8gjY1ZeGGUu_yU6KF6H7VVla_AHRGsFRNfMKertWH_ZE_gOY-Pn-qqc5vnpnQB",
      "alg": "ES384",
      "use": "sig",
      "kid": "lc4Qir_XDyDzk_Mj1537sRh54yykOSvYk30oOg1Czy4"
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
      "n": "0FxvXhpTaI3UQDl0xL6jny64877K6pbe7yCD-Dl6tQnbYiwNBZQDFZ2rRj5ITO2IqX_2TTyMWCyZMSHr4x7kiG2AWVQ84M6QKPp4nlnpzPrjPdC4nEWJx9VxkBk30OO05zlfhdTy4u-LiGDvSDbR_YIPDiPKBYLAq7asE4kKebmCFxvprA43gs5FW68VqVYG8LkTUl66LwN0Yy-LyAPlgQZmDnhKdi1mFGU7gvT0CC3GXIRakRQbhTu08tNAroNbeRbfda6iaajmtdyv47P3vnYGbV7V_Fj1TiITSif4Lww9DM09gd6RgZ-SmP1Z2x10byd2iADvWvSQA6JRg0EeTQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "BATFzWKXJbAYS8z_8gGOxzScaZbXbejqmNFJVL1eg1A"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "t8yMzKE78KXB8_BIF6220kNkoX-nJ6eZvKkgCVkAobgztI_LIp168itS-efV20uIiXcSzEF_0cau7w9XkS_ncBmBgb6n7zJydlvBvDGlqmK9N7OaHF3c2sqTQ8bxMyAt44OXQY_VqEcj8xtPVhCThKCQMiV91VW8IVs8f9U5Rv-QGsx0myuZBYc2QnkSIA75g6W4pz-7K1fSa470IHo2f9-HeAToQn7p6zm0y7zAgV3JO-i8v6hFjnhkqyyu1HZCCTWP82vkd3FfzQOJKrQbCjx3k2uSGscqDWuDgLWeFlt934tW3-WqwAcKoYHwKCGtw9FHtqYqNIXMO5toV9lL7Q",
      "alg": "RS384",
      "use": "sig",
      "kid": "mar_FGJumy1fDhsYINoVW479fOHspykitcSJGNaLe5M"
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
      "n": "zvmGy9G2V-M1Pm0OAieYiyY3ZqTIXrYQdz_fDZzd3beXK-Edak3D8G3-JrAPTXdK28GWK0USZTwNN6cF5ADpJXg9K84qcVBuBrOWjfHn2gqfjUI-8m9-OWM1UJyT7ZBup8OKEwK1xmEufoXGiVVtKiXGpvFQV3Wl_mZMJoDZ7sudbJDj6xqxLS1COjnt5nT7zeNZJXx8heC7PQp9iwutYQ4ZgvxreXOVuGZJ3tVRcRcRLKnQ4Az0Uhi7T7z-7Be2Ax1uxkv-7g_NNT8CBgcYlqKg0abPAzXJhi07ueatS80BgtzY_nYyw9HVR6grZi9azUTIOu8D4EJuxPN1i3t0GQ",
      "alg": "RS256",
      "use": "sig",
      "kid": "3W9T1CU_2xWKAn-msR1SNbJfJNM5NelG8jb6iULS6V8"
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
      "x": "OyBvpI9mqaGCDaa3JLpqSjUPYICEJnYS7RkxMzUz5j4",
      "y": "CYvS1LVQtiGhojciAydA5Pf6cJiOJOZai2DcZuTIE4o",
      "alg": "ES256",
      "use": "sig",
      "kid": "YAPspsmXPK7tpJRp2SrL1EERZNRNcwGRlZQKYdl958A"
    }
  ]
}
```

---

**Gamma community CA certificate** (the anchor Gamma distributes to its data holders):

```
-----BEGIN CERTIFICATE-----
MIIDYzCCAkugAwIBAgIUGzf+aNI/QO0VPjm4IMp8TCJyeOswDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMTIyMjEwN1oXDTI3MDYxMTIy
MjEwN1owQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYD
VQQKDBNHYW1tYSBUcnVzdCBOZXR3b3JrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEAxGrOqHOsOwMl5S1Xq4eCUUNGm76ukJ3Hm9nkhYZ7QksLwunQY2Uj
5GEXkLdXPhNEJgsG/kWe0Az0bgTheQtjAZ1ZMUIhqm/Mcpb1DKv77pmYwCnODSX6
WEu+X3pAGBWu1HqUanOyopOUIW01nFHeuVddplfBNmu3T+ar/xzw3P8UWIRruK5I
OTtlgZtci5O2GQUBPKQokC1Y4CqcKZ7L6uA5IZBVuUksFPGume0iCGEYwOrnBooU
XBCai3yM0pNNAmCr7EzcgJBSdd6s6UtNiQ6PolyPP9wiaJz2ohOAbL/9ARnEWh+6
wBlQkwlu1RsGeE/zYUJEgv+6hVES0HuAeQIDAQABo1MwUTAdBgNVHQ4EFgQUdVKc
fpV0PHSprQsXF9V3E7/j1GgwHwYDVR0jBBgwFoAUdVKcfpV0PHSprQsXF9V3E7/j
1GgwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAJRE0X3L7WEyR
yTyrYv5/SHh30smL3zCAz8wHlyZXmKlPNhhZDw5ScCaiPfjvOea9kCiESXnUivXT
vc27gSdPfwQOfLuyzR602wOwGDgGG+QMqkT+tYxTx1f3XxzpX5tOv+2F+KZkC3rI
teKTlswMkSK1tk/RbMUWt/Ayr5EvXu552iasKlvxz689rYre9NhNmxIC4NTyOfnU
5gml97gSL9RLTi8UKG7ZXnLw7YQleFkx7TLJ7P0yqhkcNvcJlX6eeIO+TNGXQMQw
1wb0scljpDVV14fSY4eVQlTgOEzXCkDKLmnoK5qCSOo4SvUq26A/wSXAg82aAg5D
93MSOASdeA==
-----END CERTIFICATE-----
```

---

**BP Buddy's Gamma-issued certificate** (subjectAltName URI = `https://bpbuddy.example`, chains to the CA above):

```
-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgIUc04usSSMNFiVccdz4TmJ78BVncQwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMTIyMjEwN1oXDTI2MDkwOTIy
MjEwN1owKjERMA8GA1UEAwwIQlAgQnVkZHkxFTATBgNVBAoMDEJQIEJ1ZGR5IElu
YzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ0VqgDCDVQXQRp4HfIR
4eC+/XtaRhRwr6pa3tDdpIdyWNxLsWuVr4IA+7h/70VHdIUiFOAXmMbdQ08KFp+Z
ScvLLC94XOxYvyCOPa8/nyVxw6F6JqItn4p5goIlmCcDAreIKUnRQhQY4bb6tsbg
IR1lWGBn0FhRaVTPOeRB7Nx+DQIonR1+E2235L2jX+Wy7oaN1T/4q7xWd8AsWCyU
bd/meUsrKPUf6NalTohJAxZmqR5VDIm54pA8rCD+qiMET9OGGPxw/EOSi6pOzPPx
oCv4zcsoaxl4T1PNNnrnNYJJmjFCQpGqjlSzhWw7QgP5jc6sZyfvLOpBv+EawsIc
WVUCAwEAAaNmMGQwIgYDVR0RBBswGYYXaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUw
HQYDVR0OBBYEFFZgij8kb81MJJFq4jbTBdbmjsndMB8GA1UdIwQYMBaAFHVSnH6V
dDx0qa0LFxfVdxO/49RoMA0GCSqGSIb3DQEBCwUAA4IBAQCA4BwuL0OezasMVmyb
BddAuo7g8I+wg1l01h+On/9CpPRnXQj4G6Znx45Bm90KI+EWO+8bOWW543QB1Xvz
CTwWisVOf4lrEWjAMwQMK/RCiSmCIic+Jzl9l2yNsk1hhRnXEejd0zmjXXD7fEI0
rho6d05SKd5pxBF+TPUIHBSqRfmbVn1G/pgH3bQPbSwFasyJYM0wZccSMh/Us69Q
qWEikWfjS6gWb7isBZhZuVSCU8XHc9yPfF8c2hgjdm3zbCrtnd7wsOUn+DwVHQe0
pvEltXpBdVITM28Xl6IBXWwFYmEL0qEi1/80Nw+tD+pLHnsAUIJWF7P0AyI/ckG3
F91N
-----END CERTIFICATE-----
```

*Generated 2026-06-11T22:21:06.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*