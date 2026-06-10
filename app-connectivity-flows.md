# An App's Life Across CMS-Aligned Networks, Without a Home Network

**Flow walkthrough with sequence diagrams**
*Companion to [apps-without-home-networks.md](apps-without-home-networks.md). Shows that a patient-facing app, carrying only its CMS App Library credentials, can register with networks that work in three different ways, locate records, and retrieve data, with no home network and no manual per-data-holder steps.*

> **Conventions**
>
> - **Record location** uses a placeholder **`$rls`** FHIR operation throughout.
>   - *Input:* patient identity context.
>   - *Output:* a list of data-holder endpoints likely to hold records.
>   - The real wire profile is an open question (can-spec Appendix A1); nothing here depends on its exact shape.
> - **Registration** uses [RFC 7591 Dynamic Client Registration](https://www.rfc-editor.org/rfc/rfc7591) as the shared wire format wherever dynamic registration appears; the *software statement* presented varies by trust path.
> - **Identity**, per CMS HTE requirements: every token request that leads to RLS or data queries carries IAL2 identity evidence, and the resulting access token is bound to that verified patient.

---

## Cast

| Actor | Role |
|---|---|
| **BP Buddy** | Patient-facing app, listed in the Medicare App Library. Holds its own keys at `https://bpbuddy.example/.well-known/jwks.json`. |
| **CMS App Library** | Publishes BP Buddy's listing and a short-lived [CMS-signed software statement](https://www.linkedin.com/pulse/software-statements-medicare-app-library-josh-mandel-md/) at `/app-library/apps/bp-buddy/software-statement.jwt`. |
| **NPD** | National Provider Directory: networks, endpoints, trust-anchor metadata. |
| **Alpha Health Network** | Offers **centralized registration through a developer portal**: a few manual steps, then one client ID good for the whole network; Alpha handles connectivity to its edge data holders (the "Epic model"). |
| **Beta Exchange** | Offers **CMS-software-statement dynamic registration** directly at each of its data holders' authorization servers; Beta itself runs the RLS and publishes endpoints. |
| **Gamma Trust Network** | A **UDAP trust community**: one-time per-network credentialing with Gamma's recognized CA, then UDAP dynamic registration at each data holder. |
| **Maria** | A patient, IAL2-verified through a CMS-approved credential service provider (CSP). |

The three networks use three different registration styles, and the walkthrough demonstrates one invariant:

> **Per-network custom work is acceptable. Per-data-holder manual work is not.**

---

## Phase 0 — One-time setup at the CMS App Library

BP Buddy's developer goes through CMS App Library admission once: identity verification, FHIR R4 / SMART on FHIR conformance against the open reference test kit, certification by a recognized vetting body, and a `jwks_uri` control check. From then on, CMS re-issues a short-lived signed software statement for as long as the app is in good standing (`library_status: active`).

```mermaid
sequenceDiagram
    autonumber
    participant Dev as BP Buddy developer
    participant Kit as Reference test kit<br/>(Inferno-style, open source)
    participant Cert as Certifying body<br/>(e.g. DirectTrust / CARIN / DiME)
    participant CMS as CMS App Library

    Dev->>Kit: Run conformance suite (registration, token issuance, $rls client)
    Kit-->>Dev: Passing results (machine-verifiable)
    Dev->>Cert: Submit results + attestations
    Cert-->>Dev: Certification
    Dev->>CMS: Library application (identity, certification, jwks_uri)
    CMS->>Dev: Verify jwks_uri control (nonce at .well-known path)
    CMS-->>Dev: Listed: library_status = active
    loop every 24h while active
        CMS->>CMS: Re-sign /apps/bp-buddy/software-statement.jwt
    end
```

No network appears in this diagram: the trust decision is made once, by CMS.

---

## Phase 1 — Discovery: what networks exist, and how does each one work?

```mermaid
sequenceDiagram
    autonumber
    participant App as BP Buddy
    participant NPD as NPD

    App->>NPD: List CMS-Aligned Networks + endpoints + registration metadata
    NPD-->>App: Alpha (centralized reg, broker endpoint)<br/>Beta (per-data-holder dynreg, RLS endpoint, data-holder endpoints)<br/>Gamma (UDAP community, CA anchor, RLS endpoint, data-holder endpoints)
```

NPD tells the app (or the client library it uses) how each network handles registration, as machine-readable metadata.

---

## Phase 2 — Registering with each network

Any of the three networks may put a human in the loop at the network level. Alpha's portal makes this visible, but Beta's and Gamma's data holders may equally look for a signal from their own network that an app is okay to let in, and the network behind that signal may have run a manual review. All of this is conformant, because whatever manual steps exist attach to the **network**, once; the app's interaction with each **data holder** stays automatic.

### 2a. Alpha — centralized registration via a developer portal (one client ID for the whole network)

Alpha runs a developer portal, and registering involves a human:

```mermaid
sequenceDiagram
    autonumber
    actor Dev as BP Buddy developer
    participant Portal as Alpha developer portal
    participant CMS as CMS App Library
    participant AAS as Alpha authorization server

    Dev->>Portal: Sign up, paste a link to the app's<br/>CMS software statement (or the statement itself)
    Portal->>CMS: Fetch /apps/bp-buddy/software-statement.jwt
    Portal->>Portal: Verify CMS signature, library_status = active<br/>Pre-fill app name, URIs, contacts from the statement
    Portal->>Dev: Ad-hoc verification, per Alpha policy<br/>(e.g. domain-ownership challenge or key-possession proof)
    Dev-->>Portal: Complete the check
    Portal->>AAS: Provision registration
    AAS-->>Dev: client_id (valid for all Alpha data holders)
```

These manual steps are acceptable because they happen once per network; the invariant only forbids manual work per data holder. The CMS statement still does its job: the portal pre-fills its form from a signed artifact and verifies one signature instead of re-vetting the app. The details of the ad-hoc verification are Alpha's business; this walkthrough deliberately leaves them unspecified, and the spec should too.

One registration covers every data holder on Alpha; the network absorbs the edge complexity as part of its product.

### 2b. Beta — dynamic registration at each data holder, CMS statement as the trust signal

```mermaid
sequenceDiagram
    autonumber
    participant App as BP Buddy
    participant CMS as CMS App Library
    participant Beta as Beta network
    participant DH as Beta data holder<br/>auth servers

    opt network-level onboarding, per Beta policy (may be manual, may be skipped)
        App->>Beta: Request onboarding<br/>(link to CMS software statement)
        Beta->>CMS: Fetch and verify the statement
        Beta->>Beta: Review per Beta policy<br/>(possibly manual)
        Beta-->>DH: Approval signal to its data holders: app okayed
    end
    App->>CMS: GET software-statement.jwt<br/>(fresh, ≤24h old)
    CMS-->>App: software_statement
    loop for each Beta data holder, automated
        App->>DH: POST /register (RFC 7591, software_statement)
        DH->>DH: Verify CMS signature, library_status, key<br/>possession, Beta approval signal (if any)
        DH-->>App: client_id at that data holder
    end
```

Each registration is a machine-to-machine call that a client library performs in a loop, so the larger count compared to Alpha costs nothing manual. The optional block is where Beta's own judgment lives: it may onboard apps before its data holders accept them, with as much manual review as its policy requires, or it may skip that layer and let the CMS statement carry the decision. Either way, its data holders act on the signal automatically, and the app sees at most one review per network.

### 2c. Gamma — UDAP trust community

```mermaid
sequenceDiagram
    autonumber
    participant App as BP Buddy
    participant CA as Gamma trust-community CA
    participant DH as Gamma data holder<br/>auth servers

    Note over App,CA: One-time per-network step (may be manual)
    App->>CA: Certificate request (community vetting per<br/>Gamma policy, possibly manual, leaning<br/>on the same CMS Library evidence)
    CA-->>App: X.509 certificate
    loop for each Gamma data holder, automated
        App->>DH: UDAP dynamic registration<br/>(RFC 7591, software statement signed with X.509 key)
        DH->>DH: Validate chain to community CA<br/>(anchor published in NPD)
        DH-->>App: client_id at that data holder
    end
```

Gamma chose a CA-anchored trust path. The app does one custom per-network step (obtaining the certificate), and the per-data-holder layer is automated from there. This satisfies the invariant, and Gamma competes on whether the extra step is worth what its network offers.

Gamma comes closest to working without a separate network-level review, but it would be a mistake to expect UDAP to resolve the underlying policy questions: who may join the trust community, on what terms, and what happens when an app misbehaves. Certificate issuance is itself Gamma's network-level review and can be as manual as its policy requires, and Gamma's data holders may still consult a network-level approval signal before honoring a registration, just as Beta's do.

All three styles consume the same CMS-signed artifact: Alpha's portal pre-fills its form from it, Beta's data holders accept it at an RFC 7591 endpoint, and Gamma's trust community can rely on the same evidence when issuing certificates. The receiving side routes signature validation by issuer (CMS JWKS for CMS statements, the community CA chain for UDAP), as can-spec §7.1 describes. No network ever needed to ask which home network the app belongs to; the federal credential answered the trust question.

---

## Phase 3 — Record location: where does Maria have data?

Maria connects BP Buddy to "find my records." She verifies her identity once via an IAL2 CSP. In line with CMS HTE requirements, **every token request that leads to RLS or data queries carries IAL2 identity evidence**, so the access token the app receives is bound to Maria and can only be used to locate her records. (Patient matching is the CMS-approved rule, can-spec §6; the `$rls` shape is a placeholder, Appendix A1.)

The pattern, identical at each network:

```mermaid
sequenceDiagram
    autonumber
    actor Maria
    participant App as BP Buddy
    participant CSP as IAL2 CSP<br/>(CLEAR / ID.me)
    participant NAS as Network auth server
    participant RLS as Network RLS

    Maria->>App: "Find my records"
    App->>CSP: IAL2 authentication (standalone launch)
    CSP-->>App: id_token (Maria, IAL2, fresh auth_time)
    App->>NAS: Token request: private_key_jwt + IAL2 id_token<br/>purpose: PATRQT
    NAS->>NAS: Verify client credential and id_token<br/>(aud↔app binding, auth_time ≤ 300s, jti replay — can-spec §9)
    NAS-->>App: access_token bound to Maria, RLS scope
    App->>RLS: POST Patient/$rls<br/>params: geographic distribution, recency hints, ...
    RLS->>RLS: Apply CMS patient-matching rule (§6) for Maria
    RLS-->>App: endpoints likely to hold Maria's records
```

The app repeats this flow at Alpha, Beta, and Gamma. The only difference between them is which client credential the network recognized at registration:

| Network | `$rls` result for Maria |
|---|---|
| Alpha | General Hospital |
| Beta | Lakeside Clinic, County Health |
| Gamma | Riverbend Medical |

Purpose of use (`PATRQT`) is declared at the token request and travels with every downstream call (can-spec §10.3).

**Why an operation rather than a payload?** A simpler placeholder would skip `$rls` entirely and return the record-location results inside the token response itself. That works, but an operation lets the app pass parameters (geographic distribution, recency or date-range hints, resource-type interests) and re-query under the same patient-bound token as its needs change, without repeating the identity flow.

---

## Phase 4 — Retrieving data

What happens next depends only on the network's shape.

### 4a. Via Alpha (brokered): the network is the FHIR endpoint

```mermaid
sequenceDiagram
    autonumber
    participant App as BP Buddy
    participant AAS as Alpha authorization server
    participant Broker as Alpha broker FHIR API
    participant GH as General Hospital

    Note over App: Maria's IAL2 session is current (fresh auth_time)
    App->>AAS: Token request: private_key_jwt + IAL2 id_token<br/>(client_id from Phase 2a, purpose: PATRQT)
    AAS->>AAS: Verify id_token aud↔app binding, auth_time ≤ 300s,<br/>jti replay check (can-spec §9)
    AAS-->>App: access_token bound to Maria (scopes per her permissions)
    App->>Broker: GET Observation?patient=...&category=vital-signs
    Broker->>GH: (network-internal retrieval)
    GH-->>Broker: results
    Broker-->>App: FHIR Bundle
```

### 4b. Via Beta / Gamma (federated): the data holder is the FHIR endpoint

```mermaid
sequenceDiagram
    autonumber
    participant App as BP Buddy
    participant LAS as Lakeside Clinic auth server
    participant LFHIR as Lakeside Clinic FHIR API

    Note over App,LAS: client_id already exists from Phase 2b dynreg —<br/>if a new endpoint appears later, the app dynregs on first contact, automatically
    App->>LAS: Token request: private_key_jwt + IAL2 id_token<br/>(purpose: PATRQT)
    LAS->>LAS: Verify id_token aud↔app binding, auth_time ≤ 300s,<br/>jti replay check (can-spec §9)
    LAS-->>App: access_token + refresh_token (rolling 90-day, §9)
    App->>LFHIR: GET Observation / MedicationRequest / DocumentReference ...
    LFHIR-->>App: FHIR Bundles (USCDI v3 scope per granted scopes)
```

The Gamma flow is identical from here; the UDAP-vs-CMS-statement difference was consumed at registration time. Runtime is the same everywhere: `private_key_jwt`, a `kid`, an IAL2 id_token, a patient-bound access token.

---

## Phase 5 — Key rotation

The app's authoritative key material lives at its CMS-verified `jwks_uri`, and the app rotates keys there on its own schedule, with no CMS involvement. Each trust path has to absorb rotation without reintroducing manual per-network steps.

**CMS-statement paths (Alpha, Beta): rotation is free**, because the statement binds the URI rather than any particular key. Data holders resolve the app's current keys at token time via `kid` lookup against the live JWKS. The app publishes the new key alongside the old for a standard overlap window, starts signing with the new `kid`, and retires the old one. There is nothing to re-issue and nobody to notify.

```mermaid
sequenceDiagram
    autonumber
    participant App as BP Buddy
    participant JWKS as bpbuddy.example/.well-known/jwks.json
    participant CMS as CMS App Library (monitor)
    participant DH as Any data holder auth server

    App->>JWKS: Publish key B alongside key A (overlap window)
    CMS->>JWKS: Routine monitoring (URI still serves a valid JWKS)
    App->>DH: Token request signed with kid=B
    DH->>JWKS: Resolve kid=B at the live jwks_uri
    DH-->>App: access_token (rotation invisible to the trust layer)
    App->>JWKS: Retire key A after overlap window
```

**Network-issued certificate paths (Gamma) need a rule here**, because an X.509 certificate binds a specific key. Once the app rotates, every certificate a network CA has issued is out of date, and if re-syncing means emailing the CA, rotation has become a manual per-network step.

The requirement to write down:

> Any network- or community-issued credential **MUST** remain automatically synchronized with the app's published `jwks_uri`. Issuance and re-issuance MUST be automatable end-to-end; key rotation MUST NOT require manual steps at any network or data holder.

Three conformant mechanisms (any may be offered; at least one MUST be):

1. **Short-lived certs minted on demand.** The CA issues certificates with TTLs comparable to the CMS statement (hours–days), minted against the current contents of the app's `jwks_uri`. Rotation is absorbed at the next mint. This is the cleanest option: the certificate becomes a projection of the JWKS rather than a competing source of truth.
2. **CA-side monitoring with automatic re-issuance.** The CA watches the app's `jwks_uri` (which CMS verified the app controls, and monitors) and re-issues automatically when keys change.
3. **App-triggered re-issuance over an authenticated channel.** During the overlap window, the app calls the CA's re-issuance endpoint, authenticating with a JWT signed by a not-yet-retired key; the CA issues a cert for the new key and revokes/expires the old.

```mermaid
sequenceDiagram
    autonumber
    participant App as BP Buddy
    participant JWKS as jwks_uri (source of truth)
    participant CA as Gamma trust-community CA
    participant DH as Gamma data holder auth server

    App->>JWKS: Publish key B alongside key A
    alt 1. short-lived certs
        App->>CA: Routine cert mint (automated)
        CA->>JWKS: Read current keys
        CA-->>App: Cert for key B (TTL: hours–days)
    else 2. CA monitors jwks_uri
        CA->>JWKS: Detect key change
        CA-->>App: Re-issued cert for key B (push/pickup)
    else 3. app-triggered re-issuance
        App->>CA: Re-issue request, signed with key A (still valid)
        CA->>JWKS: Confirm key B is published
        CA-->>App: Cert for key B (key-A cert expired/revoked)
    end
    App->>DH: UDAP token request with key-B cert
    DH-->>App: access_token (no manual steps anywhere)
```

The general principle: **the `jwks_uri` is the single source of truth for the app's keys, and every other credential format is a derived, auto-refreshing view of it.** A network is free to issue certificates at registration time in whatever flavor its community prefers, so long as those certificates track the JWKS automatically for the life of the registration.

---

## Summary

| | Alpha (centralized) | Beta (CMS-statement dynreg) | Gamma (UDAP) |
|---|---|---|---|
| Per-network step (may be manual) | portal signup: paste statement link, ad-hoc check | optional network-level approval, invisible to the app | community cert issuance per Gamma policy |
| Per-data-holder registrations | 0 (network handles) | N, all automated | N, all automated |
| Per-data-holder **manual** steps | **0** | **0** | **0** |
| Trust signal verified | CMS statement | CMS statement | X.509 chain → NPD anchor |
| Runtime auth | private_key_jwt + IAL2 id_token | same | same |

Throughout the walkthrough, BP Buddy never:

- designated a home network or asked any network to vouch for it;
- emailed a JWKS URL or touched a portal per data holder (Alpha's portal was one signup for the whole network);
- paid a per-network access fee;
- coordinated a key rotation by hand (every credential tracked its `jwks_uri` automatically);
- repeated its vetting (the CMS Library review happened once and traveled as a signed artifact).

A developer who doesn't want to do even this much can hand Phases 1–4 to a platform or an open-source library, or can skip connectivity entirely and receive Maria's data when she chooses to share it from an app that does connect.
