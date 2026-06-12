# Example artifacts

*Sample requests and responses, one page per step. All JWTs are really signed; each page shows the compact JWS next to its decoded header and payload. Verify anything against [keys-and-trust-anchors](keys-and-trust-anchors.md).*

## Record location and data access ([authorizing-access.md](../authorizing-access.md))

- [The app signs Maria in at the CSP](csp-sign-in.md)
- [Opening the authorization step](authorization-step.md)
- [The service looks up record locations](peer-record-location.md)
- [The authorization step's token response](issuance-token-response.md)
- [A signed permission ticket and its redemption](permission-ticket.md)
- [A blanket ticket: every match disclosed](blanket-ticket.md)
- [client_credentials + $rls: the app-asserted grant at a network](phase3-rls.md)
- [cms_smart at a data holder: token and FHIR retrieval](phase4b-federated.md)
- [Key rotation](phase5-key-rotation.md)

## Registration and connectivity walkthrough ([app-connectivity-flows.md](../app-connectivity-flows.md))

- [The CMS-signed software statement](phase0-software-statement.md)
- [Phase 1 — NPD discovery](phase1-npd-discovery.md)
- [Registration through a developer portal](phase2a-alpha-portal.md)
- [Dynamic registration with the CMS statement](phase2b-beta-dynreg.md)
- [Registration with a community-issued certificate](phase2c-gamma-udap.md)
- [client_credentials + $rls: the app-asserted grant at a network](phase3-rls.md)
- [Phase 4a — Alpha-wide client_id at General Hospital's token endpoint](phase4a-alpha-facilitated.md)
- [cms_smart at a data holder: token and FHIR retrieval](phase4b-federated.md)
- [Key rotation](phase5-key-rotation.md)

*Generated 2026-06-12T00:41:21.000Z by [tools/artifact-generator](https://github.com/jmandel/cms-ns/tree/no-home-network/tools/artifact-generator).*