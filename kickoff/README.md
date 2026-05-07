# Kickoff Package

Build-ready artifacts for the DPF v1 implementation. Pair with the architecture spec, prompts, and risk register from the conversation.

| File | Purpose |
|---|---|
| `airtable_schema.json` | Importable schema for the `DPF_Core` Airtable base. 13 tables, 3 automations, schema v1.3.0. |
| `airtable_automation_script.js` | Drop-in Run Script for the "Approve → Publish" Automation. |
| `make_blueprints.md` | Module-by-module spec for all 6 Make.com scenarios. |
| `runbook.md` | Operator playbook: daily/weekly/monthly tasks + 6 named runbooks. |
| `.env.template` | Every credential the system uses. LLC-owned. Never commit populated. |
| `system_prompts/` | Three production prompts: Selection Filter, Asset Generator, Copywriter. |

## Build sequence (25-day vertical slice plan)

| Slice | Days | Coverage |
|---|---|---|
| 0 — Foundation | 1–2 | Airtable base + SystemConfig singleton + 5 seed niches |
| 1 — Manual → Etsy | 3–5 | Build Scenario W only. Hand-create Product, hand-tick Approve, watch listing go live |
| 2 — Production | 6–10 | Scenario B end-to-end. Manual Draft row → Ready_For_Review |
| 3 — Discovery | 11–13 | Scenario A. Daily 02:00 trigger produces drafts |
| 4 — Operator UX | 14–15 | 3 Airtable interfaces + Slack notify. `MasterEnabled=true`. Run live for 7 days |
| 5 — Feedback | 16–20 | Scenarios C, D, E. NichePerformance + PriorityHistory tables |
| 6 — Hardening | 21–25 | RunLog + Costs caps + override surfaces + runbook drills |

## Pre-go-live checklist

- [ ] LLC formed, EIN, business bank account → `SystemConfig.LegalEntityConfirmed`
- [ ] E&O + Cyber + GL insurance bound → `SystemConfig.InsuranceBoundUntil`
- [ ] Etsy shop registered to LLC → `SystemConfig.EtsyShopOwnerType = "business"`
- [ ] AI disclosure text reviewed by counsel → `SystemConfig.DisclosureApprovedAt`
- [ ] `vdedup-svc` deployed and reachable
- [ ] `signing-svc` deployed and reachable
- [ ] All vendor connections in Make.com use LLC payment methods
- [ ] At least 1 active row in `MasterLibrary` per (Format × top 5 Niches)
- [ ] `SystemConfig.WebhookSharedSecret` set in both Airtable AND Make.com
- [ ] Slack `#dpf-alerts` and `#dpf-ops` channels exist with webhooks configured

When all are checked: set `SystemConfig.MasterEnabled = true` and `DryRun = false`.
