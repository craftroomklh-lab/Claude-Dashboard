# DPF Operator Runbook

The day-to-day playbook. Pair with the architecture spec for deeper reference.

## Daily routine (10–30 minutes)

1. **08:00 local — open Operator Daily interface.**
2. Review the 3–10 products in `Ready_For_Review`. For each:
   - Look at hero mockup. Does it match the value prop?
   - Skim the SEO description. Does it sound like *you*, not generic AI?
   - Check the tags. Any branded/trademarked term? Any duplicate?
   - Open the deliverable preview. Does it actually solve the buyer's problem?
3. **Approve the good ones.** Tick `Approve`. Within ~10s the listing should appear in your Etsy shop as Live.
4. **Reject the bad ones.** Set Status to `QA_Failed` with a one-sentence reason. Do not feel obliged to approve a daily quota.
5. Glance at System Health interface. Anything red? See *Stuck records* below.

## Once a week (Sunday)

- Review last week's QA pass rate. If it fell outside 60–85%, see Runbook D.
- Spot-check 5 random `Live` products. Are reviews coming in? Any complaints?
- Review niche priority changes in `PriorityHistory`. Anything surprising? Pin or override if needed.
- Confirm `Costs` table is within budget.

## Once a month

- **First of month:** verify `InsuranceBoundUntil` is at least 60 days out. Renew if not.
- Review `RunLog` archive — any recurring errors? File a ticket.
- Re-evaluate `BlockedKeywords` table. Add any new brand terms you've spotted.
- Re-evaluate `MasterLibrary`. Retire any template at `UsageCount > 100` (rotate to keep visual originality).

## Critical actions

### Pause the entire system

`SystemConfig.MasterEnabled = false`. Saves ops cost; in-flight work completes; no new discovery or production starts. Use during vacation, vendor outages, or any "I'm not sure what's happening" moment.

### Force a re-publish

Clear `Products.EtsyListingID` and `EtsyListingURL`, set `Status = Approved`. The Approve automation re-fires.

### Re-run a failed product

`Status = QA_Failed` → set back to `Draft`. Scenario B picks it up.

### Pin a niche priority

`Niches.PinPriority = true`, set `PinnedScore`. Audit row appears in `PriorityHistory`.

## Runbook A — "Stuck in Generating"

Symptom: a Product has `Status = "Generating"` for > 30 minutes.

1. Open `RunLog` filtered to that Product, Scenario = Production.
2. **Last log is `error` at B7 (template renderer):** renderer is down. Set `Status = Draft` to retry, or override `MasterTemplateUsed`.
3. **Last log at B13:** image generator failure. Check daily spend caps; raise or wait for reset.
4. **No error logs at all:** scenario timed out silently. Set `Status = Draft`. If it stalls a second time, halve B10 iterator batch size.

## Runbook B — "Etsy publish failed"

Symptom: `Status = Rejected`, `RejectionReason` populated.

1. Read `RejectionReason`. Etsy returns specific error codes.
2. **Image dimension error:** regenerate mockups (`Mockups.Approved = false`, kick off image regen). Then clear `EtsyListingID`, set `Status = Approved` to re-fire webhook.
3. **Taxonomy error:** fix `MasterLibrary.EtsyTaxonomyID`, then retry.
4. **Tag rejected:** edit `SEOTags` manually; add the offending term to `BlockedKeywords`. Retry.
5. **Disclosure missing:** SystemConfig has changed and SEODescription was generated under the old text. Edit description manually, retry.

## Runbook C — "Priority recompute produced unexpected ranking"

1. Open `PriorityHistory` for that niche; read `Reason`.
2. If you disagree with the algorithm: pin via `Niches.PinPriority = true`, `PinnedScore = <your value>`. Audit trail preserved.
3. If multiple niches show unexpected results: check `NichePerformance` for an outlier (e.g., one viral hit). Consider winsorizing the algorithm to cap each niche at p95.

## Runbook D — "QA pass rate drift"

1. **Too high (>85%):** spot-check 10 recent `Pass` products. If real defects slipped through, the QA prompt has gone soft. File ticket: tighten "blocking" criteria.
2. **Too low (<60%):** spot-check 10 recent `Fail` products. If failures look spurious, QA is over-strict. Loosen. If failures are real, the asset generator (B6) has regressed — check OpenAI model version changes.

## Runbook E — "Cost runaway"

Symptom: a daily cost cap was breached.

1. Open `RunLog` filtered to today, severity ≥ warning, with `payload` containing the vendor name.
2. Look for repeated retries on the same Product/stage. That's almost always the cause.
3. Open the offending Product; set `Status = QA_Failed` to remove it from the queue.
4. If breach persists, set `SystemConfig.MasterEnabled = false` for the rest of the day.
5. File ticket: investigate retry-loop bug.

## Runbook F — "Vendor outage"

Symptom: many `Generating` rows piling up; RunLog full of HTTP 5xx.

1. Check the vendor's status page (OpenAI, Anthropic, Etsy, Apify).
2. If confirmed outage: do nothing. Idempotency means the system catches up automatically once vendor returns.
3. If outage > 4h: set `MasterEnabled = false` to stop accumulating retries.
4. After vendor recovers: re-enable. Affected products auto-resume.

## Secret rotation calendar

| Secret | Rotate every | Set reminder |
|---|---|---|
| OpenAI API key | 90 days | Yes |
| Anthropic API key | 90 days | Yes |
| Etsy OAuth refresh token | Auto (30d); manual reauth on revoke | Yes |
| Apify token | 180 days | Yes |
| Browse.ai key | 180 days | Yes |
| PiAPI key | 90 days | Yes |
| `X-DPF-Auth` shared secret | 180 days, coordinated rotation | Yes |
| Adobe PDF Services credentials | 180 days | Yes |

Coordinated rotation procedure for `X-DPF-Auth`:
1. Generate new secret.
2. Add as `X-DPF-Auth-Next` header parallel to the existing in Airtable script.
3. Make.com webhook accepts either for 24h.
4. Remove old from Airtable.
5. Make.com accepts only new.

## Insurance + entity gates (pre-go-live)

These are non-negotiable. If any are false, `SystemConfig.MasterEnabled` MUST stay false:

- LLC formed, EIN issued, business bank account active → `LegalEntityConfirmed = true`
- E&O + Cyber + GL bound → `InsuranceBoundUntil` is set to a future date
- Etsy shop registered to LLC, not individual → `EtsyShopOwnerType = "business"`
- AI disclosure text reviewed by counsel → `DisclosureApprovedAt` is set

Verify at least quarterly that all four are still current.
