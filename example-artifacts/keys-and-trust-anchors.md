# Keys and trust anchors

*Generated example for [app-connectivity-flows.md](../app-connectivity-flows.md). Every signature in this library verifies against these keys. All material is throwaway, generated for the examples.*

**CMS statement signing JWKS** (published at a CMS well-known location):

```json
{
  "keys": [
    {
      "crv": "P-384",
      "kty": "EC",
      "x": "A5i68pgGne95Ts2pCua0xT3aG5AOtQAhGng0p2v-MJVlWsyDOLYexAbBzc5LGctg",
      "y": "6wx0t-tlGnQRP1mDsOkqYOvJKKNgjS10zs70fnjKwHby1XABIr4QLuBkf4GPFrnb",
      "alg": "ES384",
      "use": "sig",
      "kid": "4K_VlVqsq0eUQ5g2JyKr4i5Rs1uJnlrzpW_wZoqB_MA"
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
      "n": "xyfY-Xwh38-rBxkJGU5QcFP4HFny_41ikwgEtFgFggJZT_LsAneh6SCI32ofDsn4aVts9uRjt9Jjt5RLueRtJeTQZjnp5NuTY8y9l2nbay2jeDQyqCw6P67e9vZ0qlgaW4XXECgJ8mvzECbxU84eYx8XpLrkpILz90bOXF-iHYktdh9QQpJQB6FZRFuns5yfTIcLfAVw85aEJ66RXOM14_IFSRSCRqAbgq9caCct8u3WJ00SSlx3uErxc8sK_Uv08Hf0WIobI69PjdRqTVRPF0HyGAQ6CbmlHq412R6GY3UYCrynfSg9wiqOwNF4ogh-W5NQbQSsFFkgSaa_rZDmdQ",
      "alg": "RS384",
      "use": "sig",
      "kid": "5Tibdcu84J2NAVk05fzB38EMQthRFYlPzg3hFxRH01A"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "n": "zMKxiunqrV33UyRYdAT8lfp-miKHix_qMU5hNVIs6oRPOdjCNyGkqsnTiuUSuSRQWn7SRmdz7VzPVSXrgk8AbuK7HAU0S_mWgl7qfH0XhPSd-BErQ2pZ5Em4dpluKMtGgNtfEjoZRgR4gWQscjMaiiSf9V-Vp8aRIsCzCEDVXGNVdeq1Dq_bKd09ehtJt6jrGxhtiL3Uvpi0W_57oSkH8XHJaKjJDg0-0eR-2d4aNVjH6KWJ7Cs48vScbaaL3cCcoM5cETMy4BSPu0REKlRHVjJzdOVxzj3nk3SRMbXZOODCbfyuLAE2cKnUPGdp_r14MWwuDjmya0YGGXVYAHAZhw",
      "alg": "RS384",
      "use": "sig",
      "kid": "jhlN2zgTU3grmGGCnS8bprE4AoUUhHmQxk8ZJ45tLG4"
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
      "n": "4jHUkJetRzWdhiL5AQ6mu6IWsWiGsQIvfGj3ajRMFTGOJoLST0OhrOz800leIt9P7IpzDPlwCFRGqyIxpiufvAkPVbNn_hpnjTpt82OZvZ_UV49wF2w6RoKFiDE7o3E26Gs729GNlIGxo_sxC1kByw1lOfCGlM-9uzgzEkbkZFsXuoqh8fEjf3dF_WK0M9SVCtA-kXVQqOjaXt4tbGxrz0Ez9CiVoalo57HkG8xA05ezZ04O4T_G_iBmrWlcoBtU0DOWk3l2GwqRNhNrYsaAjbGSBz8wpoH1yzjnJll-e5YRafqn8oRX9ea3RqSBOF4Wtn4uU1o5TpjUGOGo82Tibw",
      "alg": "RS256",
      "use": "sig",
      "kid": "QZ3NHaCvu046wChiyfJzJCPbL-1srd2APKpNR7PrbsM"
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
      "x": "CM84qDHls0casuSAnT8Qxgr_zh26J_uPyCguS8qPoX4",
      "y": "8lqtsSKUr8tF9gM4hSe6SCYU-dAZSsSLnn5F3aYsEeE",
      "alg": "ES256",
      "use": "sig",
      "kid": "4JZeXx1DiE4rYLLwNJ2_7Fc14SpQ3mB4QzkywkEOxLk"
    }
  ]
}
```

---

**Gamma community CA certificate** (the anchor Gamma distributes to its data holders):

```
-----BEGIN CERTIFICATE-----
MIIDYzCCAkugAwIBAgIUJQJHAY3vkzasQDB061qLaFlTzVkwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMjAwMDgyOFoXDTI3MDYxMjAw
MDgyOFowQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYD
VQQKDBNHYW1tYSBUcnVzdCBOZXR3b3JrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEAyjUKAP7t2l0iBpZrxj6NPshWmxsvRsxSQG3ECJvPvqYoTKurDFhm
yQVwa03JRN07ODM0eqx3UG+yifOQ4vCzGz3GcgfwGnaDkxUULMgt9UTxhooi1HuO
qs9sy70oMmuen46O88azCb2CjX4EaBRkIokE4EeRL5vIy3EVNub9zIRguFSqUN/7
63cGcSLbhAtOr38lm7bZi3h19H1b8DL+2i5/NhXJio1ItmOplUHXkzn+xJEShiMJ
cn6dmHucf4SMEQ0uN2dF8kG1zlf0LLloX77uyFs/LNK00GYCe5KEpcMr79UjuHVs
7Gwp5j+zn9qL0/2Yzi2uNc/CDgU7h91IvwIDAQABo1MwUTAdBgNVHQ4EFgQUc0Yi
btO8ZgpkNRUZFl8eJEsm+IMwHwYDVR0jBBgwFoAUc0YibtO8ZgpkNRUZFl8eJEsm
+IMwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEANJCvDvOEc7Bp
F/PbAdQqQyH1KNJTaZAGId8+DLapkCG9Q3nffhT3M+OHI61jfWTv7Z8h+/UA5R/o
90OnM8EA7SdTfJOHjp/SOsC18Er9gs+EF3VDUJ7/QRoJCUcqY3fyVNCVEthO/4Aj
ixn+zO8EL24yDgGge8qyrzeodOLz/ZSbXwZSBzOSoCH0okrpCOR1CaUX4IUdj/KN
rfn23wCarLNehPTmyF9Uilwe4/Z6j4C2FlhrN7kYJf/U04a3ph4wcgYfCzFx2rL4
z5VBwMxg/XdbP66piYRw7OWcUqxwTq9Sfs9Vohq0o/T7D3YPWs7TJDy6ff9CZ+3u
2ZYTWmvOCA==
-----END CERTIFICATE-----
```

---

**BP Buddy's Gamma-issued certificate** (subjectAltName URI = `https://bpbuddy.example`, chains to the CA above):

```
-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgIURCAb+sJOYYBDF17lsutUD0RwZ6UwDQYJKoZIhvcNAQEL
BQAwQTEhMB8GA1UEAwwYR2FtbWEgVHJ1c3QgQ29tbXVuaXR5IENBMRwwGgYDVQQK
DBNHYW1tYSBUcnVzdCBOZXR3b3JrMB4XDTI2MDYxMjAwMDgyOFoXDTI2MDkxMDAw
MDgyOFowKjERMA8GA1UEAwwIQlAgQnVkZHkxFTATBgNVBAoMDEJQIEJ1ZGR5IElu
YzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ8mxn9KoV/tewFMs8S3
88aQSPuqKFiBcSyWCQ4phDK/mODUBHJF3t7qj3+oq7HnbE18W5iulc82CSn1xUrj
FuMUQczojYkp3nUVv4v9gLMFxbDpuj2aJaIIdAn6ZwaIvZ5QHbEl7+1bXaYHReTd
HgDaUzVsHjZ8GfKuG2GjW4rDkRIKWVOXu9zIi5Z2EJwGs5SJgUQGHgikIbLjTw43
3JmGTwbIkM7Eul4fZS5xBzj1NudmPiujuU/IPk0Hq+k6c7XB7qmlY8kENV3dvp37
9rVOmsbQay0UkV/Swl/migmnj1Om3L+Wsrp/jaoE3/AtQZzRGjeukU6FAzsldFkH
JjsCAwEAAaNmMGQwIgYDVR0RBBswGYYXaHR0cHM6Ly9icGJ1ZGR5LmV4YW1wbGUw
HQYDVR0OBBYEFFxw/A8ZHl3iWUwdWs5d2ZijZ+AWMB8GA1UdIwQYMBaAFHNGIm7T
vGYKZDUVGRZfHiRLJviDMA0GCSqGSIb3DQEBCwUAA4IBAQB2hbLY8XDUr82RPR6s
MNzfKLXS9ynBWM9sF2YLKVrDH0V+4Gtg+eDy5OpvM4bUN2itDCzlDaRzf+u2LKXZ
mW8vZZpJ17++oYsNsXLdXDOAKNOiA94z0wURaCVMN3i4a2K9E/G2UA/Qxj+vHrP+
kBRH+7O9cxDFyEj+DU2zUKgzz/jvhNbIwDhsvAT1FcVzl6eqXtCLPv0WdqPqxt9+
IoQb2poYuho29um3A42Wn7I4LmUDUic6oiWZBFEbzKrB6s9r9u3GFkGy2Ige+wmF
QFtUVwMbyQx3BrIcu26d2RRodJw0wA37PfeUhQeE2fTauDA/EI219IyWqVbAhCwh
vP4r
-----END CERTIFICATE-----
```

*Generated 2026-06-12T00:08:28.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator). Keys are throwaway examples; every signature verifies against the keys in [keys-and-trust-anchors](keys-and-trust-anchors.md).*