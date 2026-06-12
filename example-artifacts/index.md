# Example artifacts

*Sample requests and responses, one page per step. All JWTs are really signed; each page shows the compact JWS next to its decoded header and payload. Verify anything against [keys-and-trust-anchors](keys-and-trust-anchors.md).*

## Record location and data access ([authorizing-access.md](../authorizing-access.md))

- [The app signs Maria in at the CSP](csp-sign-in.md)
- [Opening the authorization step](authorization-step.md)
- [The service looks up record locations](peer-record-location.md)
- [The authorization step's token response](issuance-token-response.md)
- [A signed permission ticket and its redemption](permission-ticket.md)
- [A blanket ticket: every match disclosed](blanket-ticket.md)
- [Phase 3 — Patient-bound token and $rls at Beta](phase3-rls.md)
- [Phase 4b — Federated retrieval at Lakeside Clinic (Beta; Gamma is identical)](phase4b-federated.md)
- [Phase 5 — Key rotation](phase5-key-rotation.md)

## Registration and connectivity walkthrough ([app-connectivity-flows.md](../app-connectivity-flows.md))

- [Phase 0 — CMS-signed software statement](phase0-software-statement.md)
- [Phase 1 — NPD discovery](phase1-npd-discovery.md)
- [Phase 2a — Alpha developer portal](phase2a-alpha-portal.md)
- [Phase 2b — Dynamic registration at a Beta data holder](phase2b-beta-dynreg.md)
- [Phase 2c — UDAP dynamic registration at a Gamma data holder](phase2c-gamma-udap.md)
- [Phase 3 — Patient-bound token and $rls at Beta](phase3-rls.md)
- [Phase 4a — Alpha-wide client_id at General Hospital's token endpoint](phase4a-alpha-facilitated.md)
- [Phase 4b — Federated retrieval at Lakeside Clinic (Beta; Gamma is identical)](phase4b-federated.md)
- [Phase 5 — Key rotation](phase5-key-rotation.md)

*Generated 2026-06-12T00:08:28.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator).*