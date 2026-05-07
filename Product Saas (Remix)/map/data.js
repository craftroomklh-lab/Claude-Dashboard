// DPF System Map — node + edge data
window.DPF_MAP = {
  tables: [
    { id: "Niches", title: "Niches", count: 9, role: "input", desc: "Active product categories with priority scores; ε-greedy exploration override.", fields: ["NicheName","NicheSlug","PriorityScore","TopKeywords","AvgMarketPrice","Status","PinPriority","PinnedScore"] },
    { id: "TrendSignals", title: "TrendSignals", count: 12, role: "input", desc: "Scraped marketplace candidates with interactivity hints (PII-sanitized).", fields: ["Source","RawTitle","RawURL","ObservedPrice","ReviewCount","DemandScore","ComplexityScore","InteractiveKeywordsFound","InteractivityHints"] },
    { id: "MasterLibrary", title: "MasterLibrary", count: 14, role: "control", desc: "Operator-curated templates. The ONLY visual blueprint source (R02 control).", fields: ["TemplateName","Format","SchemaJSON","DesignConstraints","SupportsInteractive","InteractiveCapabilities","AdobeFormFields","SheetsFormulaMap","NotionInteractiveFeatures","EtsyTaxonomyID"] },
    { id: "Products", title: "Products", count: 22, role: "core", desc: "The product lifecycle row. Approve checkbox is the human gate.", fields: ["Status","ProductType","TargetFormat","IsInteractive","InteractiveMethod","InteractiveFeatures","SEOTitle","SEODescription","SEOTags","LaunchPrice","PriceSchedule","QAVerdict","QAScore","DesignQualityScore","Approve","EtsyListingID","DeliveryArtifacts"] },
    { id: "Mockups", title: "Mockups", count: 9, role: "core", desc: "3 mockups per product with perceptual hashes for de-dup.", fields: ["Product","Variant","Generator","PromptUsed","ImageURL","PerceptualHash","AltText","IsHero"] },
    { id: "SalesPerformance", title: "SalesPerformance", count: 8, role: "feedback", desc: "Per-product 7-day rolling revenue, locked after window close.", fields: ["Product","WindowStart","WindowEnd","Views","Favorites","UnitsSold","Revenue","Locked"] },
    { id: "NichePerformance", title: "NichePerformance", count: 7, role: "feedback", desc: "Insert-only weekly aggregates per niche. Feeds priority recompute.", fields: ["Niche","WindowEnd","LiveProductCount","TotalUnitsSold","TotalRevenue","RevenuePerProduct","AvgConversionRate"] },
    { id: "PriorityHistory", title: "PriorityHistory", count: 6, role: "feedback", desc: "Audit trail of every priority change with reason.", fields: ["Niche","FromScore","ToScore","Reason","ChangedAt","StatusChange"] },
    { id: "RunLog", title: "RunLog", count: 10, role: "ops", desc: "Append-only event log. 90-day retention.", fields: ["Scenario","RunID","Severity","Stage","Product","Niche","Message","Payload","OccurredAt"] },
    { id: "BlockedKeywords", title: "BlockedKeywords", count: 4, role: "control", desc: "Trademarks and brands rejected by Selection Filter and Copywriter.", fields: ["Term","Category","AddedBy","AddedAt"] },
    { id: "Costs", title: "Costs", count: 4, role: "ops", desc: "Daily spend per vendor. Hard caps gate paid-API modules.", fields: ["Date","Vendor","Ops","SpendUSD"] },
    { id: "SystemConfig", title: "SystemConfig", count: 14, role: "control", desc: "Singleton row. Go-live gates and global toggles.", fields: ["MasterEnabled","DryRun","LegalEntityConfirmed","InsuranceBoundUntil","EtsyShopOwnerType","DisclosureApprovedAt","DisclosureText","DailyDiscoveryCap","DailyApprovalsCap","ε_ExplorationRate","QAPassThreshold"] }
  ],
  scenarios: [
    {
      id: "A", code: "DPF_Discovery", title: "Discovery", trigger: "Daily 02:00 UTC",
      blurb: "Scrapes 5 niches, applies Selection Filter (with IP-risk hard reject), creates Draft products.",
      modules: [
        { id: "A0", title: "Pre-flight Gate", desc: "Checks SystemConfig: MasterEnabled, LegalEntityConfirmed, InsuranceBoundUntil>=today, EtsyShopOwnerType=business, DisclosureApprovedAt set. Halts if any fails.", api: "Airtable Get", controls: ["LLC Entity","E&O Insurance","AI Disclosure"] },
        { id: "A1", title: "Scheduler", desc: "Make.com schedule trigger. Generates run_id (uuid).", api: "Make.com Schedule" },
        { id: "A2", title: "Niches Query", desc: "Top 5 active niches by PriorityScore DESC. ε-greedy: 20% chance fifth slot is random exploration.", api: "Airtable Search", controls: ["Niche Concentration"] },
        { id: "A3", title: "Iterator", desc: "Per-niche iteration.", api: "Make.com Iterator" },
        { id: "A4", title: "Apify Scrape (Etsy)", desc: "POST to curious_coder/etsy-scraper. 50 items, includes reviews. 3x retry exponential backoff on 5xx.", api: "POST api.apify.com/v2/acts/.../run-sync-get-dataset-items" },
        { id: "A4.5", title: "Interactive Keyword Detection", desc: "Scans title+tags+description+complaints for Fillable, Hyperlinked, Formula, Database keywords. Flags is_interactive=true.", api: "Run JavaScript", controls: ["Interactive Logic"] },
        { id: "A5", title: "Browse.ai Scrape (Creative Market)", desc: "Async robot task; polls every 10s up to 60s. Failures are non-blocking.", api: "POST api.browse.ai/v2/robots/{id}/tasks" },
        { id: "A6", title: "Aggregate + Dedup", desc: "Merges A4+A5 results; drops candidates with identical url within batch.", api: "Array Aggregator" },
        { id: "A7", title: "Persist TrendSignals", desc: "Batch create. PII sanitization regex strips names, emails, phones from review text.", api: "Airtable Create (batch ≤10)", controls: ["GDPR R20"] },
        { id: "A8", title: "Selection Filter (LLM)", desc: "GPT-4o, temp 0.2, JSON mode. Composite scoring: demand - 0.6*complexity - 1.0*ip_risk. HARD REJECTS ip_risk≥0.40.", api: "POST api.openai.com/v1/chat/completions", controls: ["IP Risk Hard Reject"] },
        { id: "A9", title: "JSON Validation Guard", desc: "Parses + schema-validates LLM output. 1× re-roll on failure.", api: "Run JavaScript" },
        { id: "A10", title: "Update TrendSignals", desc: "Sets DemandScore, ComplexityScore, SelectedByFilter on persisted rows.", api: "Airtable Update" },
        { id: "A11", title: "Update Niche Lookbacks", desc: "Bumps Niches.LastDiscoveryAt and SignalCount.", api: "Airtable Update" },
        { id: "A12", title: "Format & Interactive Routing", desc: "Maps each selected candidate to TargetFormat + InteractiveMethod via Selection Filter output.", api: "Run JavaScript", controls: ["Multi-Format","Interactive Logic"] },
        { id: "A13", title: "Create Products", desc: "Status=Draft. Carries TargetFormat, IsInteractive, InteractiveFeatures, InteractiveMethod, MarketAvgPrice.", api: "Airtable Create" },
        { id: "A14", title: "Cap-Aware Trigger", desc: "Reads SystemConfig.DailyDiscoveryCap (3 days 1-30, 8 days 31-90, 15 day 91+). Fires Scenario B webhook with product_ids.", api: "POST Make.com webhook", controls: ["Etsy Ramp-Up"] }
      ]
    },
    {
      id: "B", code: "DPF_Production", title: "Production", trigger: "Webhook from A14",
      blurb: "For each Draft product: master selection, asset generation, format-specific injection, mockup generation, visual de-dup gate, QA, copywriting.",
      modules: [
        { id: "B0", title: "Pre-flight Gate", desc: "Same SystemConfig check as A0.", api: "Airtable Get" },
        { id: "B1", title: "Webhook Receive", desc: "Receives {run_id, product_ids[]}.", api: "Make.com Custom Webhook" },
        { id: "B2", title: "Iterator", desc: "Per-product processing.", api: "Make.com Iterator" },
        { id: "B3", title: "Get Product", desc: "Loads with linked Niche + SourceSignal.", api: "Airtable Get" },
        { id: "B4", title: "Status → Generating", desc: "Locks the row.", api: "Airtable Update" },
        { id: "B5", title: "Master Library Selection", desc: "Filters by Format + ProductType + Niche + (if interactive) SupportsInteractive AND all required InteractiveCapabilities. Sorted by UsageCount asc.", api: "Airtable Search", controls: ["IP Isolation R02","Multi-Format","Interactive Logic"] },
        { id: "B6", title: "Asset Generator (LLM)", desc: "GPT-4o, temp 0.6. Receives ONLY abstracted fields — never RawTitle/RawURL. Outputs originality_attestation + constraints_audit.", api: "POST api.openai.com/v1/chat/completions", controls: ["IP Isolation R02","Design Constraints","Originality Attestation"] },
        { id: "B7", title: "Data Injection Router", desc: "Format-specific render path.", api: "Run JavaScript", controls: ["Multi-Format"] },
        { id: "B7.A", title: "Canva Autofill", desc: "POST /v1/autofills with brand_template_id + Canva data; polls export.", api: "POST api.canva.com/rest/v1/autofills", branches: ["Canva"] },
        { id: "B7.B", title: "Bannerbear Render", desc: "Overlays text onto high-res PDF. Used for Printables and Adobe flat preview.", api: "POST api.bannerbear.com/v2/images", branches: ["PDF","Adobe"] },
        { id: "B7.C", title: "Adobe Form Fields", desc: "POST createformfields adds interactive fields onto flat PDF. Async; polls.", api: "POST pdf-services.adobe.io/operation/createformfields", branches: ["Adobe interactive"], controls: ["Interactive Logic"] },
        { id: "B7.D", title: "User Guide PDF", desc: "Bannerbear renders user guide with access link + interactive walkthrough sections.", api: "POST api.bannerbear.com/v2/images", branches: ["Sheets","Notion"] },
        { id: "B8", title: "Download Asset Binaries", desc: "Pulls rendered files; persists URL + byte_size.", api: "HTTP GET" },
        { id: "B9", title: "Persist DeliveryArtifacts", desc: "Writes structured JSON to Products.DeliveryArtifacts (canonical shape).", api: "Airtable Update" },
        { id: "B10", title: "Mockup Loop (×3)", desc: "Hero / LifestyleA / LifestyleB.", api: "Iterator" },
        { id: "B11", title: "Build Image Prompt", desc: "Mini-LLM call. Forbids brands/persons; injects house_style verbatim.", api: "POST api.openai.com/v1/chat/completions" },
        { id: "B13", title: "Image Generation", desc: "DALL-E 3 hd 1024x1024 OR Midjourney via PiAPI. Saves revised_prompt.", api: "POST api.openai.com/v1/images/generations" },
        { id: "B14", title: "Compute pHash", desc: "Calls vdedup-svc /hash endpoint.", api: "POST vdedup.<llc>/hash", controls: ["Visual De-dup"] },
        { id: "B15", title: "Persist Mockup", desc: "Includes PerceptualHash and PromptUsed.", api: "Airtable Create" },
        { id: "B16.5", title: "Visual De-dup Gate", desc: "TWO comparisons per mockup: vs source listing (threshold 0.75, IP) AND vs shop history (0.85, ToS). REJECT routes to QA_Failed. Cannot be bypassed.", api: "POST vdedup.<llc>/compare", controls: ["Visual De-dup","R01","R02"] },
        { id: "B17", title: "QA Agent (LLM)", desc: "Claude Sonnet 4.5, temp 0.0, multi-modal (text + hero image). 7 checks including design fidelity + interactivity verification. Cross-vendor fallback to GPT-4o.", api: "POST api.anthropic.com/v1/messages", controls: ["QA Gate","Design Fidelity"] },
        { id: "B18", title: "QA Validation Guard", desc: "Schema-validate; pass = qa_score ≥ 0.80.", api: "Run JavaScript" },
        { id: "B19", title: "QA Router", desc: "Pass → continue; Fail → Status=QA_Failed.", api: "Router" },
        { id: "B21", title: "Copywriter (LLM)", desc: "GPT-4o, temp 0.4. Generates SEO title/description/13 tags/3 alt-texts. AI disclosure block MANDATORY in description.", api: "POST api.openai.com/v1/chat/completions", controls: ["AI Disclosure"] },
        { id: "B22", title: "Compute Launch Price", desc: "MarketAvgPrice * (1 - random(0.10, 0.15)). Writes PriceSchedule JSON for v14 reset.", api: "Run JavaScript", controls: ["Race-to-Bottom R17"] },
        { id: "B23", title: "Status → Ready_For_Review", desc: "All assets, mockups, copy, price written.", api: "Airtable Update" },
        { id: "B24", title: "Slack Notification", desc: "Posts count + score distribution to #dpf-ops.", api: "POST Slack webhook" }
      ]
    },
    {
      id: "W", code: "DPF_Distribution", title: "Distribution (Webhook)", trigger: "Approve checkbox → Airtable Automation",
      blurb: "HMAC-verified webhook publishes to Etsy v3. Pre-publish disclosure verification.",
      modules: [
        { id: "W1", title: "Webhook Receive + HMAC Verify", desc: "Validates X-DPF-Signature against shared secret via signing-svc.", api: "POST signing-svc/verify", controls: ["Webhook Security R15"] },
        { id: "W2", title: "Idempotency Check", desc: "Data Store key = product_id:approved_at. Duplicates ack'd as no-op.", api: "Make.com Data Store" },
        { id: "W3", title: "Schema Version Check", desc: "Filter; accepts 1.x.x semver.", api: "Filter" },
        { id: "W4", title: "Resolve Shop Section", desc: "GET /shops/{id}/sections; creates if missing.", api: "GET openapi.etsy.com/v3/.../sections" },
        { id: "W5", title: "Pre-Publish Disclosure Check + Create Draft", desc: "REFUSES to publish if AI disclosure text missing from description. Then POST /listings (state=draft).", api: "POST openapi.etsy.com/v3/.../listings", controls: ["AI Disclosure"] },
        { id: "W6", title: "Image Upload Loop", desc: "3× POST /listings/{id}/images. Multipart. Idempotent on rank.", api: "POST .../listings/{id}/images" },
        { id: "W8", title: "Digital File Upload Loop", desc: "POST /listings/{id}/files for each artifact.", api: "POST .../listings/{id}/files" },
        { id: "W10", title: "Activate Listing", desc: "PATCH state=active. Idempotent.", api: "PATCH .../listings/{id}" },
        { id: "W11", title: "Success Callback", desc: "POSTs to Airtable Webhook → Status=Live, EtsyListingID, EtsyListingURL.", api: "POST callbacks.success_url" },
        { id: "W12", title: "Failure Callback + Audit Log", desc: "Structured failure JSON; mirrored to RunLog severity=critical (insurance audit trail).", api: "POST callbacks.failure_url", controls: ["E&O Insurance"] }
      ]
    },
    {
      id: "C", code: "DPF_Sales_Pull", title: "Sales Pull", trigger: "Every 6 hours",
      blurb: "Pulls views/favorites/sales for all Live products; upserts unlocked SalesPerformance rows.",
      modules: [
        { id: "C1", title: "Pre-flight + Live Products Query", desc: "WHERE Status=Live.", api: "Airtable Search" },
        { id: "C4", title: "Etsy Stats Pull", desc: "GET /listings/{id}/stats?stat_type=last_7_days.", api: "GET openapi.etsy.com/v3/.../stats" },
        { id: "C5", title: "Receipts Pull", desc: "GET /receipts?listing_id={id}&min_created. Sums grandtotal.", api: "GET openapi.etsy.com/v3/.../receipts" },
        { id: "C7", title: "Upsert SalesPerformance", desc: "Composite key (Product, WindowEnd). Locked=false until D4.", api: "Airtable Upsert" }
      ]
    },
    {
      id: "D", code: "DPF_Window_Close", title: "Window Close", trigger: "Daily 01:00 UTC",
      blurb: "Locks yesterday's SalesPerformance; aggregates per-niche performance window.",
      modules: [
        { id: "D2", title: "Fetch Yesterday's Windows", desc: "WHERE WindowEnd=TODAY()-1 AND Locked=false.", api: "Airtable Search" },
        { id: "D4", title: "Lock Rows", desc: "Locked=true. Immutable downstream.", api: "Airtable Update" },
        { id: "D5", title: "Aggregate by Niche", desc: "Computes RevenuePerProduct, AvgConversionRate, etc.", api: "Run JavaScript" },
        { id: "D6", title: "Insert NichePerformance", desc: "Insert-only.", api: "Airtable Create" }
      ]
    },
    {
      id: "E", code: "DPF_Priority_Recompute", title: "Priority Recompute", trigger: "Daily 01:30 UTC",
      blurb: "Blends 4-week performance into PriorityScore. Status transitions Active↔Paused↔Deprecated.",
      modules: [
        { id: "E1", title: "Fetch Active Niches", desc: "Excludes Pinned in skip-set.", api: "Airtable Search" },
        { id: "E4", title: "Recompute Algorithm", desc: "0.40*revPerProduct + 0.25*conv + 0.15*units + 0.10*trend + 0.10*recency. Blended 60/40 with prior.", api: "Run JavaScript" },
        { id: "E6", title: "Write PriorityScore + History", desc: "Updates Niches; appends PriorityHistory with Reason.", api: "Airtable Update + Create" }
      ]
    }
  ],
  controls: [
    { id: "LLC", name: "LLC Entity Structure", risks: ["R27"], where: ["A0","B0","Vendor Connections"], blurb: "All vendor connections owned by the LLC, not individual. Personal assets shielded." },
    { id: "INS", name: "E&O Insurance", risks: ["R26"], where: ["A0","B0","W12","Audit Trail"], blurb: "Bound before live listings. InsuranceBoundUntil enforced in code at every scenario start." },
    { id: "VDD", name: "Visual De-duplication", risks: ["R01","R02"], where: ["B14","B15","B16.5"], blurb: "pHash comparison vs source (0.75) and shop history (0.85). Hard reject; cannot be bypassed." },
    { id: "AID", name: "AI Disclosure", risks: ["R07"], where: ["§3.3 Copywriter Prompt","W5"], blurb: "Mandatory block in every listing description. Webhook refuses to publish if missing." },
    { id: "IPI", name: "IP Isolation (R02)", risks: ["R02"], where: ["B5","B6","Selection Filter"], blurb: "Asset Generator never sees source listing identifiers. MasterLibrary is the only design source." },
    { id: "QAH", name: "QA Hard Gate", risks: ["R11","R18"], where: ["B17","B19"], blurb: "Independent grader; cross-vendor fallback. 0.80 threshold; weekly sample audit." },
    { id: "RAMP", name: "Etsy Shop Ramp-Up", risks: ["R01"], where: ["A14","SystemConfig.DailyDiscoveryCap"], blurb: "3/day days 1-30, 8/day days 31-90, 15/day after. Mirrors legitimate seller ramp." }
  ]
};
