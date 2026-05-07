# DPF — Make.com Scenario Blueprints

Six scenarios. Make.com does not support a public, importable JSON blueprint format outside its own UI export — but every scenario below is specified module-by-module so a builder can construct it deterministically. Each scenario starts with the **A0 Pre-flight** sequence (filter on `SystemConfig` + circuit breaker + cost cap). Replace `{{...}}` with Make.com expression-builder references.

---

## Common: A0 Pre-flight (insert as Modules 1–4 of every scenario)

| # | Module | Configuration |
|---|---|---|
| 1 | Airtable → Get a Record | `SystemConfig` (singleton record id) |
| 2 | Data Store → Get a Record | `dpf_circuit_breakers`, key = scenario name |
| 3 | Filter | `MasterEnabled = true` AND `LegalEntityConfirmed = true` AND `InsuranceBoundUntil >= today()` AND `EtsyShopOwnerType = "business"` AND `DisclosureApprovedAt is not empty` AND `breaker_open = false` |
| 4 | Tools → Set variable | `run_id = uuid()`, `started_at = now()` |

If filter (3) fails: route to RunLog write (severity `warning` or `critical`) and exit.

---

## Scenario A — `DPF_Discovery` (daily 02:00 UTC)

| # | Module | Configuration |
|---|---|---|
| A1 | Schedule | Daily 02:00 UTC |
| A0.1–4 | Pre-flight (above) | |
| A2 | Airtable → Search Records | Table `Niches`, formula `AND({Status}="Active", OR({PinPriority}=TRUE(),{PriorityScore}>0))`, sort `PriorityScore` DESC, max 5 |
| A2.5 | Tools → Run JS | ε-greedy: with prob ε, swap 5th result for random Active niche |
| A3 | Iterator | Source: A2.5 array |
| A4 | HTTP → POST | `https://api.apify.com/v2/acts/curious_coder~etsy-scraper/run-sync-get-dataset-items?token={{apify.token}}&timeout=180`. Body: queries=[`{{A3.NicheName}} printable`, `{{A3.NicheName}} digital`], maxItems=50, includeReviews=true. Retry: 3× 60s on 5xx |
| A5 | HTTP → POST | Browse.ai task create, then poll `GET /v2/robots/{{robot_id}}/tasks/{{task_id}}` every 10s, max 60s |
| A4.5 | Tools → Run JS | Interactive Keyword Detection — see `interactive_keyword_detector.js` |
| A6 | Tools → Array Aggregator | Merge A4 + A5, dedupe by `url` |
| A7 | Airtable → Create Records (batch ≤10) | Table `TrendSignals`. Apply `sanitizePII()` to `TopComplaints` first |
| A8 | OpenAI → Create a Chat Completion | model=`gpt-4o`, temperature=0.2, max_tokens=2000, response_format={"type":"json_object"}. System prompt: §3.1 Selection Filter |
| A9 | Tools → Run JS | JSON parse + schema validation guard |
| A10 | Iterator | `parsed.selected[]` |
| A11 | Airtable → Update Records | `TrendSignals`: `SelectedByFilter=true`, `DemandScore`, `ComplexityScore`, `IPRiskScore` |
| A12 | Airtable → Update Record | `Niches`: `LastDiscoveryAt = now()` |
| A13 | Airtable → Create Records | `Products`: Status=Draft, all fields from selection. **Hard reject** any with `IPRiskScore >= 0.40` |
| A14 | Tools → Run JS | Cap-aware router: count today's Products, fire Scenario B webhook for first N up to `DailyDiscoveryCap` |
| A15 | HTTP → POST | Trigger Scenario B (webhook URL) with `{run_id, product_ids:[...]}` |
| A16 | Airtable → Create Record | `RunLog`: severity=info, message="Discovery complete: {{count}} products created" |

**Cost-tracking sub-modules:** after each LLM call, `Data Store → Update` to increment `dpf_costs[openai:today].spend_usd`.

---

## Scenario B — `DPF_Production` (webhook-triggered)

| # | Module | Configuration |
|---|---|---|
| B1 | Webhook | Custom webhook (URL stored in `SystemConfig.MakeScenarioBWebhookURL`) |
| B0.1–4 | Pre-flight | |
| B2 | Iterator | `body.product_ids[]` |
| B3 | Airtable → Get a Record | `Products` by id |
| B4 | Airtable → Update Record | `Products.Status = "Generating"` |
| B5 | Airtable → Search Records | `MasterLibrary` — interactivity-aware filter (see `master_library_filter.js`). Halt if zero matches AND no fallback |
| B6 | OpenAI → Chat Completion | gpt-4o, temp 0.6, max_tokens 3500, JSON object. Prompt: §3.2 Asset Generator. **NEVER pass RawTitle/RawURL to user content.** |
| B6.5 | Tools → Run JS | Validate `originality_attestation` exact match + `constraints_audit` all true |
| B7 | Format-aware Router | Branch on `product.TargetFormat`: Canva / Adobe / Notion / Sheets / PDF |
| B7.A (Canva) | HTTP → POST `https://api.canva.com/rest/v1/autofills` then poll `GET /autofills/{job_id}` |
| B7.B (Adobe) | HTTP → POST `https://api.bannerbear.com/v2/images`. If `IsInteractive`, chain B7.B-int |
| B7.B-int (Adobe interactive) | HTTP → Adobe PDF Services token → upload asset → `POST /operation/createformfields` → poll → download fillable PDF |
| B7.C (Notion) | HTTP → Notion API page-create from template duplication |
| B7.D (Sheets) | HTTP → Google Sheets API: copy template, fill cells, generate user-guide PDF via Bannerbear |
| B7.E (PDF) | HTTP → Bannerbear PDF mode |
| B8 | HTTP → GET | Download rendered file |
| B9 | Airtable → Update Record | `Products.GeneratedAssets`, `DeliveryArtifacts` (JSON) |
| B10 | Iterator | 3 mockup variants |
| B11 | OpenAI → Chat Completion | Mini-prompt builder for image prompt |
| B12 | Filter | Reject prompts containing brand/proper-name patterns |
| B13 | HTTP → POST | DALL-E 3 OR Midjourney via PiAPI |
| B14 | HTTP → GET | Download image |
| B14.5 | HTTP → POST | `vdedup-svc/hash` → get pHash |
| B15 | Airtable → Create Record | `Mockups` (with `PerceptualHash`) |
| B16 | Tools → Array Aggregator | All 3 mockups for this product |
| **B16.5** | **HTTP → POST** | **`vdedup-svc/compare` × 2 (vs source @0.75, vs shop history @0.85). On reject: Status=QA_Failed, exit.** |
| B17 | Anthropic → Messages | `claude-sonnet-4-5`, system: §3.3 QA Agent. Pass hero mockup as image content block |
| B18 | Tools → Run JS | Validate QA JSON schema |
| B19 | Router | Branch on `qa_verdict` |
| B20a | Airtable → Update Record | Status = "QA_Failed", QAVerdict, QAScore, RejectionReason |
| B20b | Airtable → Update Record | Status = "QA_Pending" → continue to B21 |
| B21 | OpenAI → Chat Completion | Copywriter, gpt-4o, temp 0.4, JSON object. Prompt: §3.3 Copywriter. **`disclosure_text` from SystemConfig.** |
| B21.5 | Tools → Run JS | Validate: 13 tags, length windows, `disclosure_block_included = true` |
| B22 | Tools → Run JS | LaunchPrice + PriceSchedule computation |
| B23 | Airtable → Update Record | All SEO + price fields, Status = "Ready_For_Review" |
| B24 | Slack → Send Message | `#dpf-ops` notification with count + interface URL |
| B25 | Airtable → Create Record | `RunLog`: info |

---

## Scenario W — `DPF_Distribution` (Approve webhook → Etsy)

| # | Module | Configuration |
|---|---|---|
| W1 | Webhook | Custom webhook receiver |
| W1.5 | HTTP → POST | `signing-svc/verify`. On verified=false: return 401, exit |
| W2 | Data Store → Get | `dpf_idempotency` by `body.idempotency_key`. If found → return 200 `{status:"duplicate_ignored"}`, exit |
| W2.5 | Data Store → Add | Record idempotency key with TTL 7d |
| W3 | Filter | `body.schema_version` matches `1.x.x` |
| W4 | HTTP → GET | `https://openapi.etsy.com/v3/application/shops/{{shop_id}}/sections`, find by name; create if missing |
| W4.5 | Tools → Run JS | Verify disclosure text present in description; halt with failure callback if missing |
| W5 | HTTP → POST | `https://openapi.etsy.com/v3/application/shops/{{shop_id}}/listings` (form-urlencoded). Body fields per §W.5. Retry 5× exponential on 5xx; 0× on 4xx |
| W6 | Iterator | `body.images[]` sorted by rank ASC |
| W7 | HTTP → POST | `.../listings/{{listing_id}}/images` (multipart). Idempotent: GET existing images first, skip if rank+pHash match |
| W8 | Iterator | `body.digital_files[]` |
| W9 | HTTP → POST | `.../listings/{{listing_id}}/files` (multipart) |
| W10 | HTTP → PATCH | `.../listings/{{listing_id}}` with `state=active` |
| W11 | HTTP → POST | `body.callbacks.success_url` with success payload |
| W12 | Airtable → Create Record | `RunLog`: info on success, **critical** on failure |

**Failure path:** any 4xx/5xx in W4–W10 → POST `body.callbacks.failure_url` with structured error → write critical RunLog.

---

## Scenario C — `DPF_Sales_Pull` (every 6h)

| # | Module | Configuration |
|---|---|---|
| C1 | Schedule | Every 6h (00, 06, 12, 18 UTC) |
| C0.1–4 | Pre-flight | |
| C2 | Airtable → Search | `Products` where `Status = "Live"` AND `EtsyListingID is not empty` |
| C3 | Iterator | |
| C4 | HTTP → GET | `https://openapi.etsy.com/v3/application/shops/{{shop_id}}/listings/{{listing_id}}/stats?stat_type=last_7_days` |
| C5 | HTTP → GET | `https://openapi.etsy.com/v3/application/shops/{{shop_id}}/receipts?listing_id={{listing_id}}&min_created={{ts}}` |
| C6 | Tools → Run JS | Compute window aggregates |
| C7 | Airtable → Upsert | `SalesPerformance` keyed on `(Product, WindowEnd)`, only if `Locked=false` |

---

## Scenario D — `DPF_Window_Close` (daily 01:00 UTC)

| # | Module | Configuration |
|---|---|---|
| D1 | Schedule | Daily 01:00 UTC |
| D0.1–4 | Pre-flight | |
| D2 | Airtable → Search | `SalesPerformance` where `WindowEnd = TODAY()-1` AND `Locked = false` |
| D3 | Iterator | |
| D4 | Airtable → Update Record | `Locked = true` |
| D5 | Tools → Run JS | Group by Niche, compute aggregates |
| D6 | Airtable → Create Records | `NichePerformance` insert-only |

---

## Scenario E — `DPF_Priority_Recompute` (daily 01:30 UTC)

| # | Module | Configuration |
|---|---|---|
| E1 | Schedule | Daily 01:30 UTC |
| E0.1–4 | Pre-flight | |
| E2 | Airtable → Search | `Niches` where `Status != "Deprecated"` |
| E3 | Iterator | |
| E4 | Tools → Run JS | Recompute algorithm — see `priority_recompute.js` |
| E5 | Airtable → Update Record | `Niches.PriorityScore`, `Status` (if change) |
| E6 | Airtable → Create Record | `PriorityHistory` with FromScore, ToScore, Reason, PerformanceComponents |

---

## Scenario F — `DPF_Sale_Event` (real-time bridge)

Make.com Custom Webhook bound to a polling bridge (Etsy lacks native sale webhooks). Polls `GET /receipts` every 5min, fires webhook on new receipt id. F4 increments lifetime counters; first-sale detection fires Slack celebration.

---

## Connection inventory (set up once)

| Connection | Make.com module type | Auth |
|---|---|---|
| Airtable | Airtable | Personal Access Token |
| OpenAI | OpenAI (ChatGPT, Whisper, DALL-E) | API key |
| Anthropic | HTTP (no native module) | x-api-key header |
| Etsy | HTTP | OAuth 2.0 PKCE |
| Apify | HTTP | API token query param |
| Browse.ai | HTTP | Bearer token |
| Adobe PDF Services | HTTP | OAuth 2.0 client credentials |
| Canva | HTTP | OAuth 2.0 |
| Bannerbear | HTTP | Bearer token |
| Slack | Slack | Webhook URL |
| Google Sheets | Google Sheets | OAuth 2.0 |
| Notion | HTTP | Bearer token |
| PiAPI (Midjourney) | HTTP | x-api-key header |

All connections **must** be authenticated against the LLC's vendor accounts.
