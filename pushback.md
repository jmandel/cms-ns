# Pushback and Pressure Tests

*An adversarial read of [apps-without-home-networks.md](apps-without-home-networks.md) — where the argument is solid, where defenders of the home-network model will push hardest, and the few places the case needs reinforcement rather than restatement. Written to be disagreed with.*

**Bottom line up front:** the core position survives scrutiny. Apps' connection authority should derive from their CMS Library listing, not from a network's vouching; the conformance rationale collapses against open test kits + recognized certification; the economics rationale actually argues *against* home networks. But the case has four joints that will take pressure, and two places where "let the market sort it out" needs one more mandate than the paper admits.

---

## 1. The abuse desk: the strongest counterargument, and it's about staffing, not architecture

The home network gives every app a *named, contracted party with skin in the game* responsible for its behavior. Remove it, and operational accountability splits: networks enforce locally, NPD records suspensions, CMS delists globally. Architecturally fine. Operationally, it assumes **CMS runs a live registry with a real complaint-intake, investigation, and suspension workflow, at a tempo measured in days** — not a webpage updated quarterly.

The case names this ("the honest cost") but underweights it. If CMS staffs the Library like a static directory, networks facing a misbehaving app have only local suspension, the app limps along everywhere else, and the first serious incident becomes the argument for re-imposing gatekeepers. **Reinforcement needed:** the working group should ask CMS for explicit service levels on Library status operations (time-to-acknowledge complaints, time-to-suspend on verified abuse, the criteria themselves) *as part of* adopting direct connect. The architecture is only as credible as that commitment.

Counter-counter: the home-network model has the same problem in worse form — N abuse desks of wildly varying quality, with commercial incentives not to suspend their own paying customers. A home network suspending its own app is a network firing a client. CMS suspending a Library listing has no such conflict. So the direct-connect model isn't weaker here; it's just honest about where the function lives.

## 2. The "operational coordination" loophole is a gate waiting to be rebuilt

§4.3 and §7.1 prohibit duplicative trust gating but allow networks to require "operational coordination (abuse contacts, rate-limit coordination, ops contacts, support channels)." Every re-vetting portal ever built can be costumed as operational coordination. A network that wants a gate will build one here: a "coordination form" that takes three weeks to process is a vouching step with a different name.

**Reinforcement needed:** bound the loophole in spec text. Operational coordination MUST be satisfiable from machine-readable metadata the app already publishes (contacts are *in the CMS software statement*), MUST NOT require human approval before first query, and MUST be completable within the auto-registration timeline. If the working group adopts nothing else from this file, adopt this — the anti-gating MUST is the load-bearing sentence of the whole architecture, and it currently has an unlocked side door.

## 3. Production readiness: conformance kits don't prove production behavior

§7.2 condition 2 (home network attests the app "works in production") will be defended as the one thing Inferno-style kits can't replace — a test suite proves protocol conformance, not that the app behaves under real load, handles real data variance, or doesn't hammer endpoints at 3 a.m.

This is true and mostly doesn't matter: *no* actor in the current model can attest to production behavior before production happens either — the home network just observes the app's first contacts, exactly as any first-contact network would. Rate limits, presumptive-eligibility suspension for cause, and published metrics (§15) cover the cold start without a designated chaperone. But the case should concede the kernel: there is a real difference between "passed the suite" and "ran clean for 90 days," and the presumptive-eligibility window is precisely the mechanism that bridges it. Frame 90-day presumptive eligibility as the *replacement* for the production attestation, not an unrelated leftover.

## 4. The market may re-create home networks — and that's acceptable, but say it plainly

The burden argument's market answer (platforms, libraries, delegation) has a likely end state worth naming: connectivity helpers consolidate, and two or three platforms end up intermediating most small apps. Functionally, those look a lot like home networks. The difference — and it is the entire difference — is **contestability**: an app can switch helpers, use none, or use two, because its *authority* to connect derives from its Library listing and travels with it. A home network in the spec is a gate; a home network in the market is a vendor. The case gestures at this; it should own it explicitly, because "you're just recreating b.well with extra steps" is the obvious retort, and the answer ("yes, minus the lock-in, which was the problem") is good.

Related honesty check on the Liz steelman: the burden is not just initial registration. It's endpoint churn, token-lifecycle quirks, incident response, and support escalation across dozens of networks, *forever*. The market answer still holds, but anyone presenting the case should not imply the burden is a one-time scripting exercise.

## 5. Economics: removing home networks removes a bad answer, not the question

The case is right that the home network worsens funding asymmetry and only pencils out as a tollgate or as platform capture. But strike it and the underlying tension remains fully loaded: networks MUST answer patient-access queries, MUST NOT charge apps or patients for them, and MAY NOT settle with each other for that traffic. That is an unfunded mandate in search of a business model, and pressure will leak out somewhere — degraded patient-access SLAs, aggressive upsells, or creative "premium" boundaries (§14.2 is the safety valve and will be probed). The case correctly points at cost-based structures and data holders underwriting access Cures-Act-style as the eventual answers. It should also be explicit that *this question must get a real answer regardless of the home-network outcome* — otherwise opponents get to blame direct connect for a funding gap it didn't create.

## 6. Per-network credentials are fine — but key rotation must be specified, not assumed

The UDAP-agnostic bottom line ("per-network custom work OK, per-data-holder manual work not OK") holds up. One sharpening, because it will break in practice if left implicit: when a network's trust community issues the app an X.509 certificate at registration time, that cert binds a *specific key*. The app's authoritative key material lives at its CMS-verified `jwks_uri` and rotates. Without a specified sync mechanism, every network-issued cert is a slowly detaching copy of the app's identity — and rotation becomes a manual per-network (or worse, per-data-holder) ceremony, violating the invariant through the back door.

The requirement to write down: **any network- or community-issued credential MUST remain automatically synchronized with the app's published `jwks_uri`** — short-lived certs minted against the current JWKS, CA-side monitoring with automatic re-issuance, or app-triggered re-issuance authenticated with an overlapping key. All three work; "email the CA when you rotate" does not. (Flows and a diagram: [app-connectivity-flows.md, Phase 5](app-connectivity-flows.md).)

## 7. Smaller frictions, noted for completeness

- **Non-app actors.** Scoping the case to Library-listed apps is right, but expect the rejoinder "so payers and providers still need home networks? Then the concept survives and apps are the special case." The clean answer: those actors already carry federal signals (NPD listing, covered-entity status); where an anchor is genuinely missing, extend CMS registry coverage rather than retain the gate. The case says this; whoever presents it should be ready for the question in this sharper form.
- **Don't over-win.** The case argues networks' helper services survive as products. True — and worth restraint in prosecution: if the working-group fight becomes "networks are rent-seekers," Camp A hardens. The winning frame is the one already in the paper: everything a home network *does* survives; only the *requirement* that someone do it as a precondition dies.
- **`$rls` placeholder discipline.** Keeping RLS shape out of scope is correct, but the legal flag on Pathway 2 (BAA question, §5.2) intersects this case: an app querying RLS directly under patient authority is exactly the configuration that triggered the HIPAA concern. Direct connect doesn't create that problem (it exists for any non-participant query) but expect it to be raised as if it did.

---

## Verdict

| Claim in the case | Verdict |
|---|---|
| Library listing should confer connection authority; no per-network vouching | **Holds.** Strongest part of the case. |
| Conformance rationale better served by open kits + recognized certification | **Holds.** Near-unanswerable; precedent (Inferno) is on point. |
| Home network worsens funding asymmetry | **Holds**, with the caveat that the funding question still demands an answer (§5 above). |
| Burden argument answered by authority-not-obligation + market delegation | **Holds**, stated honestly about consolidation (§4 above). |
| Per-network work OK / per-data-holder manual work not OK | **Holds**, but key-rotation sync must become spec text (§6 above). |
| "Market provides without over-specifying" | **Holds only with** the anti-gating MUST kept sharp and the coordination loophole bounded (§2 above). The market needs exactly one mandate to function: networks must accept the federal credential. Everything else can stay unspecified. |
