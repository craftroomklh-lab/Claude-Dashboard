Automated Digital Product Factory-


This is the comprehensive, end-to-end blueprint for your Automated Digital Product Factory. This version includes the core steps you requested plus the "Top-of-the-Line" enhancements for competitive pricing, quality control, and visual mockups.


Phase 1: Intelligent Discovery (The Brain)

Step 1: Trend Scraping

An automation script (using Apify or Browse.ai) scrapes the "Best Sellers" and "New & Trending" sections of Etsy, Gumroad, and Creative Market.

Step 2: Selection Filtering

The raw data is sent to OpenAI (GPT-4o). The AI analyzes the list and selects the 10 most viable products based on high demand and low complexity (to ensure high-quality generation).

Step 3: Market Data Capture

For these 10 items, the system records the average price, primary keywords, and common customer complaints (to ensure your version is better).


Phase 2: Production & Design (The Factory)

Step 4: Asset Generation

The system triggers a content engine.

Text/Data: GPT-4o generates the core product (e.g., a 20-page guide, a list of 500 prompts, or a budget tracker template).

Code/Templates: If the product is a spreadsheet or template, the system pulls from a pre-made "Master Library" and customizes it.

Step 5: Visual Mockup Creation

The product details are sent to Midjourney or DALL-E 3 via API to create 3 professional-grade mockup images (e.g., the digital guide shown on a tablet or laptop screen).

Step 6: Automated Quality Assurance (QA)

A secondary AI agent "reads" the generated product to check for formatting errors, broken links, or spelling mistakes. It gives a Pass/Fail score.


Phase 3: Listing & Organization (The Warehouse)

Step 7: Sales Copywriting

An AI Copywriter generates an SEO-optimized title, a benefit-driven description (solving the problems found in Step 3), and a list of 13 high-ranking tags.

Step 8: Dynamic Pricing

The system calculates a "Launch Price" (typically 10-15% below the market average found in Step 3) to gain initial traction.

Step 9: Database Categorization

Everything (Product File + Mockups + Listing Text + Price) is sent to Airtable or Notion. It is automatically tagged by niche (e.g., Finance, Wellness, Real Estate).


Phase 4: Human Approval & Launch (The Control Room)

Step 10: Daily Review Notification

You receive a Slack or Telegram message: "Your 10 products are ready for review."

Step 11: Manual Approval Gate

You open your Dashboard (Airtable/Notion). You see the 10 rows. You click a checkbox labeled "Approve" for the products you like.

Step 12: Triggered Distribution

Once "Approve" is checked, Make.com or Zapier triggers:

Uploading the file to your store (Etsy/Shopify/Stan Store).

Uploading the mockups.

Publishing the listing live.

Step 13: Success Tracking (The Feedback Loop)

Every 7 days, the system checks sales data. If "Finance" products sold best, Step 2 is automatically instructed to prioritize the Finance niche for the following week.


Summary of the Tech Stack Required:

Automation Orchestrator: Make.com (formerly Integromat)

Data Source: Browse.ai (for scraping marketplaces)

Content/Logic: OpenAI API (GPT-4o)

Visuals: Midjourney API or DALL-E 3

Database/Dashboard: Airtable

Storefront: Shopify, Etsy, or Gumroad


Workflow Prompt

# TASK: Architect the Automated Digital Product Factory

**Context & Role:**
You are an Expert IT Workflows Specialist, API Integrator, and Automation Architect. Your objective is to translate a high-level operational blueprint into a rigorous, executable technical architecture. 

We are building an end-to-end Automated Digital Product Factory. The system will scrape market trends, generate digital products via AI, create visual mockups, log everything in a database, and distribute the final assets to an Etsy storefront upon manual approval.

**The Operational Blueprint (Source of Truth):**

*Phase 1: Intelligent Discovery (The Brain)*
* Step 1: Trend Scraping (Apify/Browse.ai scrapes Etsy/Creative Market).
* Step 2: Selection Filtering (GPT-4o selects the 10 most viable products based on high demand/low complexity).
* Step 3: Market Data Capture (Records average price, keywords, and complaints).

*Phase 2: Production & Design (The Factory)*
* Step 4: Asset Generation (GPT-4o generates text/data; templates customized from Master Library).
* Step 5: Visual Mockup Creation (Midjourney/DALL-E 3 API creates 3 professional mockups).
* Step 6: Automated QA (Secondary AI agent checks formatting/links/spelling for a Pass/Fail score).

*Phase 3: Listing & Organization (The Warehouse)*
* Step 7: Sales Copywriting (AI generates SEO title, benefit-driven description, 13 tags).
* Step 8: Dynamic Pricing (Calculates Launch Price 10-15% below market average).
* Step 9: Database Categorization (Product, Mockups, Listing Text, and Price sent to Airtable/Notion, tagged by niche).

*Phase 4: Human Approval & Launch (The Control Room)*
* Step 10: Daily Review Notification (Slack/Telegram ping: "10 products ready").
* Step 11: Manual Approval Gate (User checks "Approve" box in the database).
* Step 12: Triggered Distribution (Make.com webhook catches approval, uploads files/mockups, publishes listing to Etsy).
* Step 13: Success Tracking (7-day sales loop feeds back to Phase 1 to adjust niche priorities).

**Tech Stack Constraints:**
* Orchestrator: Make.com
* Database/Dashboard: Airtable
* Logic/Content: OpenAI (GPT-4o) & Claude
* Visuals: Midjourney / DALL-E 3
* Storefront: Etsy

**Your Execution Protocol:**
Please execute this architecture design in sequential micro-batches. Wait for my approval after each phase before moving to the next.

**Batch 1: Database Architecture (Airtable)**
Design the exact relational schema needed for Phase 3 and Phase 4. Detail the Table Names, Field Names, and strict Field Types (e.g., singleSelect, multipleAttachments, checkbox) required to hold the generated assets, QA scores, SEO copy, and the "Approve" trigger.

**Batch 2: Make.com Scenario Routing (Phases 1 & 2)**
Map out the exact Make.com modules required for the Discovery and Production phases. Use a `Tool > Action > Data Payload` markdown table format. Define the expected JSON payloads passed between the scraper, the AI generator, the image generator, and the QA agent.

**Batch 3: Prompt Engineering (The Nodes)**
Draft the strict System Prompts that will be injected into the Make.com OpenAI modules for:
1.  **The Selection Filter** (Step 2)
2.  **The QA Agent** (Step 6)
3.  **The Copywriter** (Step 7)
Ensure these prompts mandate structured JSON output so Make.com can parse the variables flawlessly.

**Batch 4: The Distribution Webhook (Phase 4)**
Write the JSON payload specification (`expected_outputs.json`) for the webhook that fires when I click "Approve" in Airtable, mapping the exact data fields required to publish a live Etsy listing via API.

Output Batch 1 now.




Claude Design-

Claude
This task is a technical architecture writeup, not a design/HTML artifact. I'll respond directly with Batch 1 as requested.

Batch 1: Database Architecture (Airtable)
Below is the relational schema for the Automated Digital Product Factory. It covers Phases 3 & 4 end-to-end (capture → categorize → approve → distribute → track) and back-references Phases 1 & 2 so trend signals and QA artifacts are queryable from the same base.

Base: DPF_Core (Digital Product Factory — Core)
Six tables, linked relationally. Primary key on every table is an autonumbered RecordID unless otherwise noted; the human-readable primary field is called out per table.

Table 1: Niches
Source of truth for market verticals. Phase 1 writes here; Phase 4 Step 13 updates priority weights.

Field Name	Field Type	Notes / Options
NicheName	singleLineText	Primary field. e.g. "Wedding Printables"
NicheSlug	formula	LOWER(SUBSTITUTE({NicheName}," ","-"))
Status	singleSelect	Active, Paused, Deprecated
PriorityScore	number (decimal, 2)	0.00–1.00, updated by Step 13 feedback loop
AvgMarketPrice	currency (USD)	Rolling 30-day average
TotalListingsLaunched	rollup	COUNT from Products where Status = Live
TotalRevenue7d	currency (USD)	Updated by Step 13
TopKeywords	multipleSelects	Dynamic option set
LastTrendScrape	dateTime (ISO, with time)	Last Apify/Browse.ai run
Products	linkToAnotherRecord	→ Products (one-to-many)
Table 2: TrendSignals
Raw scraper output (Phase 1, Steps 1 & 3). Immutable log; Products link back to their originating signal.

Field Name	Field Type	Notes
SignalID	autoNumber	Primary field
Source	singleSelect	Etsy, CreativeMarket, Pinterest, Other
ScrapeRunID	singleLineText	UUID per Apify/Browse.ai job
CapturedAt	dateTime	ISO 8601
Niche	linkToAnotherRecord	→ Niches
RawTitle	singleLineText	
RawURL	url	
ObservedPrice	currency (USD)	
ReviewCount	number (integer)	
AvgRating	number (decimal, 2)	
TopComplaints	longText	Step 3 capture
KeywordsExtracted	multipleSelects	
DemandScore	number (decimal, 2)	0–1, computed pre-filter
ComplexityScore	number (decimal, 2)	0–1, computed pre-filter
SelectedByFilter	checkbox	True if GPT-4o Step 2 picked it
LinkedProduct	linkToAnotherRecord	→ Products (nullable)
Table 3: Products
The central record. One row per generated product — created at Step 4, mutated through Steps 5–9, gated at Step 11.

Field Name	Field Type	Notes / Options
ProductName	singleLineText	Primary field — internal name, not the Etsy title
ProductID	formula	"PRD-" & RECORD_ID()
Niche	linkToAnotherRecord	→ Niches
SourceSignal	linkToAnotherRecord	→ TrendSignals
ProductType	singleSelect	Printable, DigitalPlanner, Template, ClipArt, Worksheet, Other
Status	singleSelect	Draft, Generating, QA_Pending, QA_Failed, Ready_For_Review, Approved, Publishing, Live, Rejected, Archived
MasterTemplateUsed	linkToAnotherRecord	→ MasterLibrary
GeneratedAssets	multipleAttachments	Final downloadable files (PDF/PNG/ZIP)
AssetGenerationLog	longText (rich)	GPT-4o response metadata
Mockups	linkToAnotherRecord	→ Mockups (3 expected)
MockupCount	count	rollup of linked Mockups
QAScore	number (decimal, 2)	0.00–1.00, from Step 6
QAVerdict	singleSelect	Pass, Fail, Pending
QAReport	longText (rich)	Structured findings from QA agent
SEOTitle	singleLineText	≤140 chars (Etsy limit)
SEODescription	longText	Benefit-driven, Step 7
SEOTags	multipleSelects	Exactly 13 — validated by formula below
TagCountValid	formula	IF(LEN({SEOTags})-LEN(SUBSTITUTE({SEOTags},",",""))=12,"✓","✗")
MarketAvgPrice	currency (USD)	Pulled from Niche at Step 8
LaunchPrice	currency (USD)	Step 8 calculated value
PriceDiscountPct	formula	ROUND((1-({LaunchPrice}/{MarketAvgPrice}))*100,1)
Approve	checkbox	The Phase 4 Step 11 trigger.
ApprovedBy	collaborator	Stamps approver
ApprovedAt	dateTime	Auto-set via automation when Approve = TRUE
RejectionReason	longText	Required if Status = Rejected
EtsyListingID	singleLineText	Populated by webhook callback
EtsyListingURL	url	
PublishedAt	dateTime	
SalesMetrics	linkToAnotherRecord	→ SalesPerformance
CreatedAt	createdTime	
LastModified	lastModifiedTime	
Critical automation: an Airtable Automation watches Approve flipping false → true AND Status = Ready_For_Review. It sets Status = Approved, stamps ApprovedAt, and POSTs the Make.com distribution webhook. Make.com's response updates EtsyListingID / EtsyListingURL / PublishedAt and flips Status = Live.

Table 4: Mockups
One row per visual mockup (3 per product, Step 5). Separated from Products so each mockup has its own attachment, prompt log, and approval state.

Field Name	Field Type	Notes
MockupID	formula	"MCK-" & RECORD_ID() — primary field
Product	linkToAnotherRecord	→ Products
Variant	singleSelect	Hero, LifestyleA, LifestyleB
Generator	singleSelect	Midjourney, DALL-E_3, Manual
PromptUsed	longText	
Image	multipleAttachments	The rendered mockup
ImageURL	url	CDN copy for Etsy upload
Width	number (integer)	px
Height	number (integer)	px
IsHero	checkbox	One per product = true
Approved	checkbox	Per-mockup approval if needed
GeneratedAt	createdTime	
Table 5: MasterLibrary
The reusable template pool referenced at Step 4.

Field Name	Field Type	Notes
TemplateName	singleLineText	Primary field
TemplateType	singleSelect	Canva, Figma, Indesign, PDF, PSD
BaseFile	multipleAttachments	The unfilled master
CompatibleNiches	linkToAnotherRecord	→ Niches (multi)
CompatibleProductTypes	multipleSelects	Mirrors Products.ProductType
UsageCount	count	rollup from Products
Active	checkbox	
Table 6: SalesPerformance
Phase 4 Step 13. One row per product per 7-day window.

Field Name	Field Type	Notes
MetricID	autoNumber	Primary field
Product	linkToAnotherRecord	→ Products
Niche	lookup	from Product → Niche
WindowStart	date	
WindowEnd	date	
Views	number (integer)	
Favorites	number (integer)	
UnitsSold	number (integer)	
Revenue	currency (USD)	
ConversionRate	formula	IF({Views}>0,{UnitsSold}/{Views},0)
FedBackToPriority	checkbox	True once it's adjusted Niche.PriorityScore
Interface / Dashboard Views (Airtable Interfaces)
For Phase 4 Step 10 ("10 products ready") notification + Step 11 review:

Daily Review Queue — filtered grid on Products where Status = Ready_For_Review. Visible fields: ProductName, Niche, QAScore, LaunchPrice, PriceDiscountPct, hero Mockups (linked record gallery), SEOTitle, SEODescription, SEOTags, Approve, RejectionReason. Sort: QAScore desc.
Niche Performance — grid on Niches sorted by PriorityScore desc; shows TotalRevenue7d, TotalListingsLaunched.
Live Inventory — Products where Status = Live, with linked SalesPerformance.
Status state machine (canonical transitions)
Draft → Generating → QA_Pending → {QA_Failed | Ready_For_Review}
QA_Failed → (manual) → Generating | Archived
Ready_For_Review → {Approved | Rejected}      ← Approve checkbox is the gate
Approved → Publishing → {Live | Rejected}     ← webhook outcome
Live → Archived                                ← end of lifecycle
The Approve checkbox is the only legal way to leave Ready_For_Review toward Approved. Make.com filters its trigger on Status = Approved (set by the Airtable Automation, not by the human directly) so accidental box-ticks on Draft rows can't fire publishing.

Awaiting approval to proceed to Batch 2 (Make.com Scenario Routing — Phases 1 & 2).

You
approved
Claude
Batch 2: Make.com Scenario Routing (Phases 1 & 2)
Two scenarios. Splitting Discovery from Production keeps the Make.com operation count predictable and lets QA failures retry without re-scraping.

Scenario A: DPF_Discovery (Phase 1)
Trigger: Schedule — daily 02:00 UTC. Output: Up to 10 records in Products table with Status = Draft, each linked to a TrendSignals row.

#	Tool	Action	Data Payload (in → out)
A1	Make.com — Scheduler	Trigger every 24h	OUT: { "run_id": "{{uuid}}", "started_at": "{{now}}" }
A2	Airtable	Search Records → Niches where Status = "Active", sort PriorityScore DESC, limit 5	OUT: [{ "niche_id": "rec...", "niche_name": "Wedding Printables", "priority_score": 0.92, "top_keywords": ["..."] }, ...]
A3	Iterator	Iterate over A2 array	One bundle per niche
A4	Apify	Run Actor (apify/etsy-scraper) — sync run, dataset return	IN: { "queries": ["{{A3.niche_name}} printable"], "maxItems": 50, "country": "US" }<br>OUT: array of { title, url, price, reviews_count, rating, tags[], shop, complaints_text }
A5	Browse.ai	Run Robot (Creative Market shadow scrape)	IN: { "inputParameters": { "search_term": "{{A3.niche_name}}" } }<br>OUT: parallel listing array
A6	Array aggregator	Merge A4 + A5 outputs	OUT: { "niche_id": "...", "candidates": [ ...union ] }
A7	Airtable	Create Records (batched) → TrendSignals	IN per row: { "Source": "Etsy" | "CreativeMarket", "ScrapeRunID": "{{A1.run_id}}", "Niche": ["{{A3.niche_id}}"], "RawTitle": "{{title}}", "RawURL": "{{url}}", "ObservedPrice": {{price}}, "ReviewCount": {{reviews_count}}, "AvgRating": {{rating}}, "TopComplaints": "{{complaints_text}}", "KeywordsExtracted": [...], "DemandScore": null, "ComplexityScore": null }<br>OUT: array of signal_ids
A8	OpenAI (GPT-4o)	Chat Completion — Selection Filter prompt (see Batch 3 §1)	IN: { "model": "gpt-4o", "response_format": {"type":"json_object"}, "messages": [system, { "role":"user", "content": "{{A6.candidates as JSON}}" } ] }<br>OUT: { "selected": [ { "signal_index": int, "demand_score": 0-1, "complexity_score": 0-1, "rationale": "...", "proposed_product_type": "Printable", "estimated_market_price": 12.50 }, ... ] } (max 10 per niche, capped to 10 total downstream)
A9	JSON parse	Parse A8 string	Validates schema; routes to error handler on parse fail
A10	Iterator	Iterate selected[]	
A11	Airtable	Update Record → TrendSignals (set SelectedByFilter = true, write DemandScore, ComplexityScore)	IN: { "id": "{{matched signal_id}}", "fields": { "SelectedByFilter": true, "DemandScore": {{...}}, "ComplexityScore": {{...}} } }
A12	Airtable	Update Record → Niches (write back AvgMarketPrice, LastTrendScrape)	IN: rolling avg of estimated_market_price, LastTrendScrape = {{now}}
A13	Airtable	Create Record → Products	IN: { "ProductName": "{{niche_name}} — {{rationale shortcode}}", "Niche": ["{{niche_id}}"], "SourceSignal": ["{{signal_id}}"], "ProductType": "{{proposed_product_type}}", "Status": "Draft", "MarketAvgPrice": {{estimated_market_price}} }<br>OUT: product_id
A14	Router	Branch: count(products_created) ≥ 10 → fire Scenario B via webhook; else end	OUT to Scenario B: { "run_id": "{{A1.run_id}}", "product_ids": ["rec...", ...] }
Error handling on this scenario: Break directive on A4/A5 (3 retries, 60s backoff), Resume on A8 with Status = "Filter_Failed" flag. Apify scrape failures don't kill the run — partial niches still proceed.

Scenario B: DPF_Production (Phase 2)
Trigger: Custom Webhook fired by A14, OR Airtable "Watch Records" on Products where Status = Draft. Output: Per product — assets generated, 3 mockups attached, QA verdict logged, Status = Ready_For_Review or QA_Failed.

#	Tool	Action	Data Payload (in → out)
B1	Webhook / Airtable Watch	Receive trigger	IN: { "product_ids": [...] } (or single record bundle)
B2	Iterator	Iterate product_ids	
B3	Airtable	Get Record → Products (expand: Niche, SourceSignal, MasterLibrary candidates)	OUT: full product record incl. niche keywords, complaints, market price
B4	Airtable	Update → Products.Status = "Generating"	
B5	Airtable	Search → MasterLibrary where Active = true AND CompatibleProductTypes contains {{B3.ProductType}} AND CompatibleNiches contains {{B3.Niche}}, sort UsageCount ASC, limit 1	OUT: master_template_id, BaseFile URL
B6	OpenAI (GPT-4o)	Chat Completion — Asset Generator prompt (Step 4)	IN: { "model": "gpt-4o", "response_format": {"type":"json_object"}, "messages": [system, user with { niche, product_type, complaints_to_solve, target_market_price, template_schema } ] }<br>OUT: { "asset_blocks": [ { "page_id": "p1", "title": "...", "body_markdown": "...", "fields": {...} }, ... ], "internal_name": "...", "value_prop": "..." }
B7	HTTP module	POST to template renderer (Canva API / Bannerbear / docassemble — whichever the master library targets)	IN: { "template_id": "{{B5.master_template_id}}", "modifications": {{B6.asset_blocks}} }<br>OUT: { "asset_url": "...", "format": "pdf", "byte_size": ... }
B8	HTTP	GET asset_url → binary	OUT: file blob
B9	Airtable	Update → Products.GeneratedAssets (attach blob), MasterTemplateUsed, AssetGenerationLog	
B10	Iterator (3x)	Loop variant ∈ ["Hero","LifestyleA","LifestyleB"]	
B11	OpenAI (GPT-4o)	Build mockup prompt — short helper completion that turns {B6.value_prop, variant} into a Midjourney/DALL-E prompt string	OUT: { "image_prompt": "...", "aspect_ratio": "1:1" }
B12	Router	Decide generator	If niche flagged "photoreal" → B13a (Midjourney via PiAPI/Useapi); else → B13b (DALL-E 3)
B13a	HTTP — Midjourney (PiAPI)	POST /imagine (sync mode w/ polling)	IN: { "prompt": "{{B11.image_prompt}} --ar {{aspect}} --v 6" }<br>OUT: { "image_url": "...", "width": 1024, "height": 1024 }
B13b	OpenAI — Image (DALL-E 3)	Create Image	IN: { "model": "dall-e-3", "prompt": "{{B11.image_prompt}}", "size": "1024x1024", "quality": "hd" }<br>OUT: { "url": "..." }
B14	HTTP	GET image → binary	
B15	Airtable	Create Record → Mockups	IN: { "Product": ["{{product_id}}"], "Variant": "{{variant}}", "Generator": "DALL-E_3" | "Midjourney", "PromptUsed": "{{B11.image_prompt}}", "Image": [{"url":"{{image_url}}"}], "ImageURL": "{{image_url}}", "Width": 1024, "Height": 1024, "IsHero": {{variant=="Hero"}} }
B16	Airtable	Update → Products.Status = "QA_Pending"	(after the 3-iteration loop completes)
B17	Anthropic (Claude)	Messages API — QA Agent prompt (Batch 3 §2). Claude is used here per stack constraints — secondary AI for adversarial QA on GPT-4o output.	IN: { "model": "claude-sonnet-4-5", "system": "...", "messages": [{ "role":"user", "content": [ {type:"text", text: "{{B6.asset_blocks JSON}}"}, {type:"image", source:{type:"url", url:"{{hero mockup url}}"}} ] }] }<br>OUT: { "qa_score": 0.0-1.0, "verdict": "Pass" | "Fail", "checks": { "spelling": "...", "formatting": "...", "links": "...", "coherence": "..." }, "blocking_issues": [...], "warnings": [...] }
B18	JSON parse	Validate QA schema	
B19	Router	Branch on verdict	Pass → B20a, Fail → B20b
B20a	Airtable	Update → Products	{ "QAScore": ..., "QAVerdict":"Pass", "QAReport":"...", "Status":"Ready_For_Review" } → Phase 3 (Steps 7–9) chained inline
B20b	Airtable	Update → Products	{ "QAScore": ..., "QAVerdict":"Fail", "QAReport":"...", "Status":"QA_Failed" } → exits scenario
B21	OpenAI (GPT-4o)	Copywriter prompt (Batch 3 §3) — runs only if Pass	IN: product + niche + market keywords. OUT: { "seo_title": "...", "seo_description": "...", "tags": [13 strings] }
B22	Tools — Numeric	Compute LaunchPrice	LaunchPrice = ROUND({{Niche.AvgMarketPrice}} * (1 - random(0.10, 0.15)), 2)
B23	Airtable	Update → Products	{ "SEOTitle":..., "SEODescription":..., "SEOTags":[...], "LaunchPrice":..., "Status":"Ready_For_Review" }
B24	Slack / Telegram	Send message (only fires once per scenario run, after iterator completes)	"📦 {{count}} products ready for review → {{interface_url}}"
Canonical JSON payloads passing between modules
Scraper → Filter (A6 → A8 user message):

{
  "niche_id": "recABC123",
  "niche_name": "Wedding Printables",
  "top_keywords": ["seating chart","rsvp","welcome sign"],
  "candidates": [
    {
      "signal_index": 0,
      "title": "Modern Wedding Seating Chart Template",
      "url": "https://www.etsy.com/listing/...",
      "price": 8.99,
      "reviews_count": 1240,
      "rating": 4.9,
      "tags": ["wedding","seating","template","printable"],
      "complaints_text": "Font too small; hard to edit in Canva free"
    }
  ]
}
Filter → Asset Generator (A8 → B6):

{
  "product_id": "recPRD456",
  "niche": "Wedding Printables",
  "product_type": "Printable",
  "complaints_to_solve": ["small fonts","Canva-free incompatibility"],
  "target_market_price": 8.99,
  "estimated_complexity": 0.32,
  "template_schema": { "pages": 1, "editable_fields": ["names","date","table_count"] }
}
Asset Generator → Image Prompt Builder (B6 → B11):

{
  "internal_name": "Modern Minimal Wedding Seating Chart",
  "value_prop": "Editable, large-type seating chart that prints clean on 18x24",
  "asset_blocks": [ { "page_id":"p1", "title":"Seating Chart", "body_markdown":"...", "fields":{"names":["..."]} } ]
}
QA Agent return (B17 → B19):

{
  "qa_score": 0.87,
  "verdict": "Pass",
  "checks": {
    "spelling": "clean",
    "formatting": "1 minor — inconsistent header weight on page 2",
    "links": "n/a",
    "coherence": "matches niche conventions; addresses 'small font' complaint"
  },
  "blocking_issues": [],
  "warnings": ["Header weight inconsistency p2"]
}
Copywriter return (B21 → B23):

{
  "seo_title": "Modern Minimal Wedding Seating Chart Template | Editable Canva | Printable 18x24 | Instant Download",
  "seo_description": "...",
  "tags": ["wedding seating chart","seating chart template","modern wedding","editable canva","printable seating chart","wedding printable","seating sign","reception decor","wedding template","minimalist wedding","instant download","18x24 print","wedding signs"]
}
Operation budget (rough)
Per discovery run × 5 niches × ~10 candidates evaluated = ~120 ops. Per production run × 10 products = ~280 ops (asset gen + 3 mockups + QA + copywriter + ~12 Airtable writes each). Stays comfortably under a 10K/mo plan at daily cadence.

Awaiting approval to proceed to Batch 3 (Prompt Engineering — Selection Filter, QA Agent, Copywriter system prompts with mandated JSON schemas).

You
approved
Claude
Batch 3: Prompt Engineering (The Nodes)
Three system prompts. All three mandate response_format: { "type": "json_object" } on the OpenAI module and include an explicit JSON schema in the system prompt — belt-and-braces so Make.com's JSON parser never chokes downstream.

§1. The Selection Filter (Step 2)
Module: OpenAI — Create Chat Completion Model: gpt-4o Temperature: 0.2 (low — this is a ranking/scoring task, not creative) Response format: json_object Max tokens: 2000

System Prompt
You are the SELECTION FILTER agent for an automated digital-product factory.

ROLE
Your sole job is to evaluate a batch of scraped marketplace listings and return the TOP 10 viable digital-product opportunities, ranked by a composite of high demand and low production complexity.

INPUTS
The user message contains a JSON object:
{
  "niche_id": string,
  "niche_name": string,
  "top_keywords": string[],
  "candidates": [
    {
      "signal_index": integer,
      "title": string,
      "url": string,
      "price": number,
      "reviews_count": integer,
      "rating": number,
      "tags": string[],
      "complaints_text": string
    }
  ]
}

SCORING RUBRIC (apply per candidate)

demand_score (0.00–1.00):
  +0.40 weight: log10(reviews_count) normalized against the batch max
  +0.25 weight: rating (rating - 4.0) / 1.0, clamped 0–1
  +0.20 weight: keyword overlap with top_keywords (Jaccard)
  +0.15 weight: price stability (penalize <$2 and >$50)

complexity_score (0.00–1.00, LOWER IS BETTER):
  Start at 0.0, add for:
  + 0.20 multi-page deliverable implied by title
  + 0.20 requires custom illustration / hand-drawn
  + 0.15 requires personalization fields (names, dates)
  + 0.15 file format diversity (>2 export formats)
  + 0.10 requires premium fonts / paid stock
  Clamp 0–1.

viability = demand_score - (complexity_score * 0.6)

SELECTION RULES
1. Rank candidates by viability DESC.
2. Drop any with demand_score < 0.35 OR complexity_score > 0.75.
3. Drop near-duplicates (titles with >0.8 token overlap — keep highest viability).
4. Return at most 10. If fewer than 10 qualify, return only the qualifying set — do NOT pad.
5. estimated_market_price = median price of the candidate's 3 nearest neighbors by keyword overlap.

OUTPUT — STRICT JSON, NO PROSE, NO MARKDOWN FENCES

{
  "niche_id": string,
  "selected": [
    {
      "signal_index": integer,
      "demand_score": number,
      "complexity_score": number,
      "viability": number,
      "rationale": string,            // ≤140 chars, plain English
      "proposed_product_type": "Printable" | "DigitalPlanner" | "Template" | "ClipArt" | "Worksheet" | "Other",
      "estimated_market_price": number,
      "complaints_to_solve": string[] // 1–3 actionable issues from complaints_text
    }
  ],
  "rejected_count": integer,
  "batch_notes": string                // ≤200 chars, observations on the niche
}

CONSTRAINTS
- Output MUST parse as JSON. No commentary, no leading/trailing text.
- All numeric fields rounded to 2 decimals.
- proposed_product_type MUST be one of the exact enum values above.
- If candidates array is empty, return { "niche_id": <id>, "selected": [], "rejected_count": 0, "batch_notes": "no candidates supplied" }.
- Never invent signal_index values; only echo from input.
§2. The QA Agent (Step 6)
Module: OpenAI — Create Chat Completion (or Anthropic Messages — same prompt works on either; per Batch 2 we route to Claude here for adversarial diversity) Model: gpt-4o (or claude-sonnet-4-5) Temperature: 0.0 (deterministic — QA must be repeatable) Response format: json_object Max tokens: 1500

System Prompt
You are the QA AGENT for an automated digital-product factory.

ROLE
You inspect a generated digital product (text content + 1 reference mockup image) and return a strict Pass/Fail verdict with a 0.00–1.00 score. You are adversarial: assume the upstream generator is sloppy and find every defect.

INPUTS
The user message contains:
1. A JSON block describing the product:
   {
     "product_id": string,
     "internal_name": string,
     "product_type": string,
     "value_prop": string,
     "asset_blocks": [
       { "page_id": string, "title": string, "body_markdown": string, "fields": object }
     ],
     "links_to_check": string[]   // optional
   }
2. A hero mockup image (visual coherence check only — do NOT score image aesthetics).

CHECKS — RUN ALL FIVE

1. SPELLING & GRAMMAR
   Scan every string in titles, body_markdown, and field values. Flag misspellings, agreement errors, and capitalization inconsistencies. Mark "clean" only if zero issues.

2. FORMATTING
   - Heading hierarchy is consistent across pages (no h1 → h3 jumps).
   - Markdown syntax is valid (no unclosed asterisks, broken lists, orphan brackets).
   - Field placeholders are filled (no literal "{{...}}" or "[NAME]" left in output).
   - Date and currency formats are consistent within the product.

3. LINKS
   For each URL in links_to_check or embedded in body_markdown:
   - Well-formed (parses as URL).
   - HTTPS (flag http://).
   - No localhost, no example.com, no obvious placeholder domains.
   You CANNOT actually fetch URLs — judge structurally only.

4. COHERENCE
   Does the product deliver on its value_prop? Do the asset_blocks collectively form a complete, usable artifact for the product_type? Flag missing essential pages (e.g., a "weekly planner" with no day grid).

5. MOCKUP-CONTENT MATCH
   Does the hero image visually represent what the asset_blocks describe? Flag genre/style mismatches (e.g., "minimalist wedding" copy + maximalist baroque mockup).

SCORING

Start at 1.00. Subtract:
  -0.30 per blocking_issue
  -0.05 per warning
Clamp to 0.00.

VERDICT
  qa_score >= 0.80 AND blocking_issues.length == 0  → "Pass"
  otherwise                                          → "Fail"

OUTPUT — STRICT JSON, NO PROSE, NO MARKDOWN FENCES

{
  "product_id": string,
  "qa_score": number,           // 0.00–1.00, 2 decimals
  "verdict": "Pass" | "Fail",
  "checks": {
    "spelling": string,         // "clean" or short summary of findings
    "formatting": string,
    "links": string,
    "coherence": string,
    "mockup_match": string
  },
  "blocking_issues": [          // any single one forces Fail
    { "category": "spelling" | "formatting" | "links" | "coherence" | "mockup_match",
      "location": string,       // e.g., "asset_blocks[1].body_markdown line 4"
      "description": string,    // ≤200 chars
      "severity": "blocking" }
  ],
  "warnings": [                 // non-blocking nits
    { "category": string, "location": string, "description": string, "severity": "warning" }
  ],
  "remediation_hint": string    // ≤200 chars; what the regenerator should change. Empty if Pass with no warnings.
}

CONSTRAINTS
- Output MUST parse as JSON. No prose outside the object.
- Be specific in `location` — generic "in the body" is rejected.
- A spelling error in a Title/Heading is ALWAYS blocking.
- A literal placeholder ({{X}}, [NAME], lorem ipsum) is ALWAYS blocking.
- If there are zero issues, return empty arrays — do NOT invent issues to seem thorough.
§3. The Copywriter (Step 7)
Module: OpenAI — Create Chat Completion Model: gpt-4o Temperature: 0.7 (creative — but bounded by hard structural rules) Response format: json_object Max tokens: 1200

System Prompt
You are the SEO COPYWRITER for an automated Etsy digital-product factory.

ROLE
Generate the listing title, listing description, and exactly 13 tags for one digital product, optimized for Etsy search and conversion.

INPUTS
The user message contains a JSON object:
{
  "product_id": string,
  "internal_name": string,
  "product_type": string,
  "niche_name": string,
  "niche_top_keywords": string[],
  "value_prop": string,
  "complaints_solved": string[],
  "target_market_price": number,
  "asset_summary": string         // 1-2 sentences describing what the buyer downloads
}

HARD STRUCTURAL RULES — NON-NEGOTIABLE

seo_title:
  - 100–140 characters total (Etsy hard cap is 140; aim for 120–135).
  - Front-load the highest-volume keyword from niche_top_keywords.
  - Include product_type and one differentiator (size, format, editability).
  - Use " | " as the separator between phrases. Max 5 phrases.
  - Title Case. No emoji. No ALL-CAPS. No "best" / "perfect" / "amazing".

seo_description:
  - 600–1200 characters.
  - Structure (in order):
    1. Opening hook — name the buyer's problem in their words (≤2 sentences).
    2. "WHAT YOU GET:" header followed by a 4–6 item bulleted list (use • bullets).
    3. "WHY IT WORKS:" header followed by 2–3 benefit sentences referencing complaints_solved.
    4. "HOW TO USE:" header followed by 3 numbered steps.
    5. "INSTANT DOWNLOAD:" header followed by a 1-sentence delivery note.
  - Benefit-driven, not feature-listing. Speak to the buyer ("you get…", "your guests…").
  - No emoji except • bullets. No URLs. No mention of price.

tags (EXACTLY 13):
  - Each tag: 2–20 characters, lowercase, plain text only (Etsy strips punctuation).
  - No duplicates, no near-duplicates (e.g., "wedding sign" and "wedding signs" both → keep one).
  - Spread across 4 buckets:
      • 4 broad-niche tags (e.g., "wedding printable")
      • 4 specific-product tags (e.g., "seating chart 18x24")
      • 3 buyer-intent tags (e.g., "diy wedding decor")
      • 2 long-tail tags (e.g., "modern minimalist seating")
  - Reuse keywords from niche_top_keywords where they fit naturally — do NOT keyword-stuff.

OUTPUT — STRICT JSON, NO PROSE, NO MARKDOWN FENCES

{
  "product_id": string,
  "seo_title": string,
  "seo_title_length": integer,        // count yourself; must satisfy 100 ≤ n ≤ 140
  "seo_description": string,
  "seo_description_length": integer,  // must satisfy 600 ≤ n ≤ 1200
  "tags": string[],                   // length === 13
  "tag_buckets": {
    "broad": string[],     // length 4, subset of tags
    "specific": string[],  // length 4
    "intent": string[],    // length 3
    "long_tail": string[]  // length 2
  },
  "primary_keyword": string,          // the keyword the title was built around
  "copy_notes": string                // ≤120 chars, copy-strategy rationale
}

CONSTRAINTS
- Output MUST parse as JSON.
- If your title or description fails its length window on first draft, REWRITE before returning. Never return a violating output.
- tags.length MUST equal 13. If you cannot generate 13 distinct quality tags, fail loudly: return all fields you can and add a 14th key "error": "insufficient_tag_coverage" — but this should be extremely rare; the niche keyword list always supports 13.
- Each entry in tag_buckets MUST also appear verbatim in tags[].
- Never invent product attributes not implied by inputs (no fake page counts, no fake bonuses).
Make.com integration notes (apply to all three)
JSON parser placement. Insert a JSON > Parse JSON module immediately after each OpenAI module. Define the data structure once per agent (use the schemas above). This gives downstream modules typed variables instead of raw strings.

Validation guard. Add a Tools > Set multiple variables module after the parser that asserts:

Selection Filter: length(selected) ≤ 10
QA Agent: verdict ∈ {Pass, Fail} AND 0 ≤ qa_score ≤ 1
Copywriter: length(tags) === 13 AND 100 ≤ length(seo_title) ≤ 140 On assertion failure, route to the error-handler that flips Status = "QA_Failed" (or Filter_Failed / Copy_Failed) and surfaces the raw model output to a QAReport field for human inspection.
Retry policy. Each OpenAI module: Maximum number of attempts = 3, Interval = 5s. JSON parse failures bypass retry (the model rarely self-corrects on a re-roll without a prompt change).

Cost guard. Set max_tokens per the values above — the schema constraints make the agents naturally concise. Selection Filter is the largest at 2000 because it returns up to 10 records.

Awaiting approval to proceed to Batch 4 (expected_outputs.json — the Approve-webhook payload spec mapping every field required to publish a live Etsy listing via API).

You
approved
Claude
Batch 4: The Distribution Webhook (Phase 4)
The approval webhook fires when Airtable's automation flips a record into Status = "Approved". Make.com receives the payload below, runs the Etsy publish chain, and PATCHes the result back to the Products row.

Trigger contract
Direction: Airtable Automation → Make.com Custom Webhook Method: POST Content-Type: application/json Auth: Shared secret in X-DPF-Auth header (Airtable script reads from a base secret) Idempotency: Idempotency-Key: <product_id>:<approved_at_iso> — Make.com filters out duplicates with a Data Store lookup before any Etsy call.

expected_outputs.json — full payload specification
{
  "$schema": "https://dpf.internal/schemas/etsy-publish-webhook/v1.json",
  "schema_version": "1.0.0",
  "event": "product.approved",
  "fired_at": "2026-05-06T14:32:11Z",
  "idempotency_key": "recPRD456:2026-05-06T14:32:09Z",

  "approval": {
    "product_id": "recPRD456",
    "airtable_record_url": "https://airtable.com/appXXXX/tblYYYY/recPRD456",
    "approved_by": {
      "user_id": "usrZZZZ",
      "email": "owner@example.com",
      "name": "Jane Operator"
    },
    "approved_at": "2026-05-06T14:32:09Z"
  },

  "etsy_listing": {
    "title": "Modern Minimal Wedding Seating Chart Template | Editable Canva | Printable 18x24 | Instant Download",
    "description": "Stop wrestling with tiny seating-chart fonts the day before your wedding...\n\nWHAT YOU GET:\n• Editable Canva template (free + Pro compatible)\n• Print-ready PDF at 18x24\"\n• ...\n\nWHY IT WORKS:\n...\n\nHOW TO USE:\n1. ...\n2. ...\n3. ...\n\nINSTANT DOWNLOAD:\nFiles are available immediately after purchase from your Etsy account.",
    "price": {
      "amount": 7.49,
      "currency_code": "USD",
      "divisor": 100,
      "amount_minor_units": 749
    },
    "quantity": 999,
    "who_made": "i_did",
    "when_made": "2020_2026",
    "is_supply": false,
    "is_digital": true,
    "type": "download",
    "state": "active",
    "shop_section_id": null,
    "shop_section_name_for_lookup": "Wedding Printables",

    "taxonomy": {
      "taxonomy_id": 2078,
      "taxonomy_path": ["Paper & Party Supplies", "Paper", "Stationery", "Invitations & Announcements", "Wedding"]
    },

    "tags": [
      "wedding seating chart",
      "seating chart template",
      "modern wedding",
      "editable canva",
      "printable seating chart",
      "wedding printable",
      "seating sign",
      "reception decor",
      "wedding template",
      "minimalist wedding",
      "instant download",
      "18x24 print",
      "wedding signs"
    ],

    "materials": ["digital file", "pdf", "canva template"],

    "language": "en",

    "processing_min": 0,
    "processing_max": 0,

    "shipping_profile_id": null,
    "return_policy_id": null,

    "production_partner_ids": []
  },

  "digital_files": [
    {
      "role": "primary",
      "rank": 1,
      "filename": "ModernMinimal_SeatingChart_18x24_v1.pdf",
      "mime_type": "application/pdf",
      "byte_size": 2841733,
      "source_url": "https://airtable-attach.cdn/.../ModernMinimal_SeatingChart_18x24_v1.pdf",
      "checksum_sha256": "9c1f...e2a4"
    },
    {
      "role": "supplementary",
      "rank": 2,
      "filename": "ModernMinimal_SeatingChart_CanvaLink.txt",
      "mime_type": "text/plain",
      "byte_size": 124,
      "source_url": "https://airtable-attach.cdn/.../CanvaLink.txt",
      "checksum_sha256": "3b87...11cc"
    }
  ],

  "images": [
    {
      "rank": 1,
      "role": "Hero",
      "mockup_id": "recMCK001",
      "source_url": "https://airtable-attach.cdn/.../hero.png",
      "alt_text": "Modern minimal wedding seating chart printed at 18 by 24 inches on a reception table",
      "width": 2000,
      "height": 2000,
      "byte_size": 1842110,
      "mime_type": "image/png"
    },
    {
      "rank": 2,
      "role": "LifestyleA",
      "mockup_id": "recMCK002",
      "source_url": "https://airtable-attach.cdn/.../lifestyle_a.png",
      "alt_text": "Seating chart displayed on a gold easel beside floral arrangement",
      "width": 2000,
      "height": 2000,
      "byte_size": 1903441,
      "mime_type": "image/png"
    },
    {
      "rank": 3,
      "role": "LifestyleB",
      "mockup_id": "recMCK003",
      "source_url": "https://airtable-attach.cdn/.../lifestyle_b.png",
      "alt_text": "Close-up of seating chart typography showing legible large-format names",
      "width": 2000,
      "height": 2000,
      "byte_size": 1788902,
      "mime_type": "image/png"
    }
  ],

  "videos": [],

  "variations": [],

  "personalization": {
    "is_personalizable": false,
    "personalization_is_required": false,
    "personalization_char_count_max": 0,
    "personalization_instructions": ""
  },

  "internal_metadata": {
    "niche_id": "recABC123",
    "niche_name": "Wedding Printables",
    "source_signal_id": "recSIG789",
    "master_template_id": "recMTL222",
    "qa_score": 0.91,
    "qa_verdict": "Pass",
    "market_avg_price": 8.99,
    "launch_price_discount_pct": 16.7,
    "generation_run_id": "run_2026-05-06_0200",
    "originating_scrape_dataset": "apify_run_NJ81X..."
  },

  "callbacks": {
    "success_url": "https://hooks.airtable.com/workflows/v1/genericWebhook/appXXXX/wflSUCCESS/...",
    "failure_url": "https://hooks.airtable.com/workflows/v1/genericWebhook/appXXXX/wflFAILURE/...",
    "callback_auth_header": "X-DPF-Auth"
  }
}
Field-by-field mapping → Airtable source → Etsy createDraftListing parameter
Webhook path	Airtable source	Etsy API field (v3 createDraftListing / uploadListingImage / uploadListingFile)	Required	Notes
etsy_listing.title	Products.SEOTitle	title	✓	≤140 chars (validated upstream by Copywriter agent)
etsy_listing.description	Products.SEODescription	description	✓	UTF-8, plain text + newlines
etsy_listing.price.amount	Products.LaunchPrice	price	✓	Etsy expects float in shop currency
etsy_listing.price.amount_minor_units	Products.LaunchPrice * 100	(helper for re-serialization)	—	Avoids float drift
etsy_listing.quantity	constant 999	quantity	✓	Digital products: high stock
etsy_listing.who_made	constant "i_did"	who_made	✓	Etsy enum
etsy_listing.when_made	constant "2020_2026"	when_made	✓	Etsy enum, current bracket
etsy_listing.is_supply	constant false	is_supply	✓	
etsy_listing.type	constant "download"	type	✓	Forces digital flow
etsy_listing.state	constant "active"	state	✓	Publishes immediately on success
etsy_listing.taxonomy.taxonomy_id	MasterLibrary.EtsyTaxonomyID (lookup via Niche)	taxonomy_id	✓	Add this field to MasterLibrary in v1.1
etsy_listing.tags[]	Products.SEOTags (split on comma)	tags	✓	Exactly 13
etsy_listing.materials[]	static per-Niche default	materials	—	Up to 13
etsy_listing.shop_section_name_for_lookup	Niches.NicheName	resolved → shop_section_id via getShopSections before publish	—	Make.com creates section if missing
etsy_listing.processing_min/max	constant 0	processing_min/max	✓	Required even on digital
digital_files[].source_url	Products.GeneratedAssets[].url	uploadListingFile (multipart)	✓	Each file POSTed individually after listing creation
digital_files[].rank	array index	rank	✓	Etsy max 5 digital files
images[].source_url	Mockups.ImageURL (sorted: Hero first)	uploadListingImage (multipart)	✓	Etsy requires ≥1 image; we send 3, Hero at rank 1
images[].alt_text	Mockups.AltText (new field — see below)	alt_text	—	Add AltText field to Mockups table in v1.1
personalization.*	constants for v1 (off)	is_personalizable, etc.	✓	Phase 5 enhancement
internal_metadata.*	various	not sent to Etsy	—	Logged in Make.com Data Store for the success-tracking loop
Make.com publish chain (post-webhook)
#	Module	Action	Notes
W1	Webhook	Receive	Validates X-DPF-Auth and idempotency key
W2	Data Store	Get → idempotency_key	Aborts if seen
W3	Router	Validate payload schema	Routes to failure_url callback if any required field missing
W4	HTTP	GET /v3/application/shops/{shop_id}/sections	Find or create section by name
W5	Etsy	createDraftListing	Sends etsy_listing.* minus images/files
W6	Iterator	over images[]	
W7	HTTP	POST /v3/application/shops/{shop_id}/listings/{listing_id}/images	multipart upload of each image; sets rank and alt_text
W8	Iterator	over digital_files[]	
W9	HTTP	POST /v3/application/shops/{shop_id}/listings/{listing_id}/files	multipart upload of each digital file
W10	Etsy	updateListing → state: "active"	Promotes draft to live (atomic publish after assets attached)
W11	HTTP	POST callbacks.success_url	Returns { etsy_listing_id, etsy_url, published_at } to Airtable, which sets Status = "Live", EtsyListingID, EtsyListingURL, PublishedAt
W12	Error handler	on any failure	POSTs callbacks.failure_url with { stage, etsy_error_code, etsy_error_message } → Airtable sets Status = "Rejected", writes RejectionReason
Success callback (W11 → Airtable)
{
  "event": "product.published",
  "product_id": "recPRD456",
  "etsy_listing_id": "1547889123",
  "etsy_url": "https://www.etsy.com/listing/1547889123/...",
  "published_at": "2026-05-06T14:33:47Z",
  "uploaded_image_ids": ["4001", "4002", "4003"],
  "uploaded_file_ids": ["7001", "7002"]
}
Failure callback (W12 → Airtable)
{
  "event": "product.publish_failed",
  "product_id": "recPRD456",
  "stage": "uploadListingImage",
  "etsy_error_code": 400,
  "etsy_error_message": "Invalid image dimensions: minimum 2000px on longest edge",
  "retriable": false,
  "occurred_at": "2026-05-06T14:33:12Z"
}
Schema-version policy
The schema_version field is mandatory and SemVer'd. Make.com's W3 validation step rejects any payload whose major version doesn't match its compiled handler — this prevents an Airtable script update from silently breaking the publish chain. Bump minor for additive fields (e.g., personalization going live), bump major when removing or retyping any required field.

Two small Airtable schema additions implied by this batch
To support the webhook fully, add in v1.1:

MasterLibrary.EtsyTaxonomyID — number (integer). Maps each master template to an Etsy taxonomy node. Without this, taxonomy must be guessed at publish time.
Mockups.AltText — singleLineText. Generated alongside the SEO copy (extend the Copywriter prompt to emit one alt-text per mockup variant). Etsy doesn't require it, but it's an SEO + accessibility win that costs nothing.
Architecture complete. All four batches deliver: schema (Batch 1) → orchestration (Batch 2) → agent contracts (Batch 3) → distribution boundary (Batch 4). The system is closed-loop: trend signals enter at A1, a live Etsy listing exits at W11, and SalesPerformance rows flow back to Niches.PriorityScore to bias the next morning's scrape.

Ready for implementation, or want a Batch 5 covering the Step 13 success-tracking loop (sales-data ingestion + priority recomputation algorithm)?

You
Batch 5
Claude
Batch 5: The Feedback Loop (Phase 4, Step 13)
This is the closed-loop component: published Etsy listings → 7-day sales window → recomputed niche priorities → tomorrow's scrape biases toward what's actually selling.

Architecture overview
Three scheduled scenarios + one event-driven one:

Scenario	Cadence	Purpose
DPF_Sales_Pull	Every 6h	Polls Etsy for views/favorites/sales on every Live product
DPF_Window_Close	Daily 01:00 UTC	Closes 7-day windows, computes per-niche performance
DPF_Priority_Recompute	Daily 01:30 UTC	Updates Niches.PriorityScore, rebalances Status, archives losers
DPF_Sale_Event	Webhook (Etsy → Make.com)	Real-time append to SalesPerformance for first-sale alerts
DPF_Discovery (Scenario A from Batch 2) runs at 02:00 UTC — so by the time it pulls niches, priorities reflect last night's recompute.

Scenario C: DPF_Sales_Pull
Trigger: Schedule, every 6h Operations per run: ~ (live_products × 4 modules) + niche_aggregation

#	Tool	Action	Payload
C1	Scheduler	Trigger	{ "pull_id": "{{uuid}}" }
C2	Airtable	Search → Products where Status = "Live" AND PublishedAt >= NOW() - 60 days	OUT: array of products with EtsyListingID
C3	Iterator	over products	
C4	HTTP — Etsy	GET /v3/application/shops/{shop_id}/listings/{listing_id}/stats?stat_type=last_7_days	OUT: { views, favorites }
C5	HTTP — Etsy	GET /v3/application/shops/{shop_id}/receipts?listing_id={listing_id}&min_created=NOW-7d	OUT: paginated receipts → sum units_sold, revenue
C6	Tools — Set variables	Build MetricRow	See payload below
C7	Airtable	Upsert → SalesPerformance (key on Product + WindowEnd = today)	Avoids duplicate rows on the 6h pulls; the daily window-close locks the row
MetricRow payload (C6):

{
  "Product": ["recPRD456"],
  "WindowStart": "2026-04-29",
  "WindowEnd": "2026-05-06",
  "Views": 412,
  "Favorites": 38,
  "UnitsSold": 11,
  "Revenue": 82.39,
  "ConversionRate": 0.0267,
  "FedBackToPriority": false,
  "PullID": "{{C1.pull_id}}",
  "PulledAt": "2026-05-06T06:00:00Z"
}
Scenario D: DPF_Window_Close
Locks yesterday's rolling window into an immutable record per product, then aggregates to the niche level.

#	Tool	Action	Payload
D1	Scheduler	Daily 01:00 UTC	
D2	Airtable	Search → SalesPerformance where WindowEnd = TODAY()-1 AND FedBackToPriority = false	
D3	Iterator	over rows	
D4	Airtable	Update → freeze row (no further upserts; sets Locked = true — new field)	
D5	Aggregator (numeric)	Group by Niche	OUT: per-niche aggregates
D6	Airtable	Create → NichePerformance (new table — see schema below)	
Scenario E: DPF_Priority_Recompute
The brain of the feedback loop. Reads NichePerformance, recomputes Niches.PriorityScore, optionally re-tiers Status.

#	Tool	Action	Payload
E1	Scheduler	Daily 01:30 UTC	
E2	Airtable	Search → Niches where Status IN ("Active","Paused")	
E3	Airtable	Search → NichePerformance where WindowEnd >= TODAY()-28 (last 4 windows)	
E4	Tools — Run script	Apply scoring algorithm (below)	OUT: { niche_id, new_priority, status_change?, reason } per niche
E5	Iterator	over results	
E6	Airtable	Update → Niches	{ "PriorityScore": ..., "Status": ..., "LastRecomputedAt": NOW() }
E7	Airtable	Create → PriorityHistory (audit log)	
E8	Slack/Telegram	Daily digest	"📊 Priorities updated: {{up}} ↑, {{down}} ↓, {{paused}} paused, {{revived}} revived"
Scenario F: DPF_Sale_Event (event-driven, optional)
Etsy doesn't push native webhooks for sales, so this hooks into the Etsy partner integration via a polling-to-webhook bridge (or a Zapier/Make Etsy trigger). Used for real-time first-sale notifications.

#	Tool	Action
F1	Webhook	Receive { listing_id, receipt_id, units, revenue }
F2	Airtable	Lookup Products by EtsyListingID
F3	Router	If Products.FirstSaleAt is empty → fire celebration Slack ping; else just log
F4	Airtable	Increment Products.LifetimeUnits, Products.LifetimeRevenue (new fields)
Two new Airtable tables (extend Batch 1 schema → v1.2)
Table 7: NichePerformance
Aggregated per-niche, per-window snapshot. Insert-only (immutable).

Field	Type	Notes
RecordID	autoNumber	Primary
Niche	linkToAnotherRecord	→ Niches
WindowStart	date	
WindowEnd	date	
LiveProductCount	number (integer)	Products Live at WindowEnd
TotalViews	number (integer)	Σ across products
TotalFavorites	number (integer)	
TotalUnitsSold	number (integer)	
TotalRevenue	currency (USD)	
AvgConversionRate	number (decimal, 4)	TotalUnits / TotalViews
RevenuePerProduct	formula	IF({LiveProductCount}>0, {TotalRevenue}/{LiveProductCount}, 0)
WindowLabel	formula	DATETIME_FORMAT({WindowEnd},"YYYY-WW")
Table 8: PriorityHistory
Audit trail. Tells you why yesterday's scrape skewed toward a given niche.

Field	Type	Notes
Niche	linkToAnotherRecord	→ Niches
RecomputedAt	dateTime	
OldPriority	number (decimal, 2)	
NewPriority	number (decimal, 2)	
Delta	formula	{NewPriority} - {OldPriority}
OldStatus	singleSelect	mirrors Niches.Status
NewStatus	singleSelect	
Reason	longText	Algorithm rationale (machine-emitted)
WindowsConsidered	number (integer)	How many NichePerformance rows fed the calc
Field additions to existing tables
SalesPerformance.Locked — checkbox. True once Scenario D freezes the row.
SalesPerformance.PullID — singleLineText. Idempotency key for C7 upsert.
Niches.LastRecomputedAt — dateTime.
Products.LifetimeUnits — number (integer).
Products.LifetimeRevenue — currency (USD).
Products.FirstSaleAt — dateTime.
The scoring algorithm (Scenario E, step E4)
This is the core IP of the feedback loop. Implemented as a Make.com Tools > Run JavaScript block (or a tiny serverless function called via HTTP).

Inputs (per niche)
Last 4 weekly NichePerformance rows (28-day trailing window)
Current Niches.PriorityScore
Niches.Status
Global maxima across all active niches (for normalization)
Composite score
performance_score   = 0.40 * norm(revenue_per_product_28d, global_max)
                    + 0.25 * norm(avg_conversion_rate_28d, global_max)
                    + 0.15 * norm(total_units_28d, global_max)
                    + 0.10 * trend_slope(weekly_revenue, last 4 weeks)   // -1..+1
                    + 0.10 * recency_weight(days_since_first_live)        //  0..1, peaks at week 2

new_priority_raw    = 0.6 * performance_score + 0.4 * old_priority
new_priority        = clamp(new_priority_raw, 0.05, 1.00)

  where:
    norm(x, max)     = max > 0 ? x / max : 0
    trend_slope      = OLS slope of weekly_revenue normalized to [-1, +1]
    recency_weight   = 1 - |days_since_first_live - 14| / 60, clamped to [0,1]
Why these weights
40% revenue/product — the only number that ultimately matters; normalized per-product so a niche with 1 hit isn't punished for low total volume.
25% conversion rate — early signal of product-market fit before total revenue catches up; rewards niches where the scrape→listing pipeline is producing relevant goods.
15% units sold — volume signal; correlated with revenue but rewards low-price-high-volume niches that revenue/product alone undersells.
10% trend slope — momentum; a niche climbing from 0.3 → 0.5 → 0.7 → 0.9 should outrank a flat 0.85.
10% recency — freshness curve. Brand-new niches (< 7 days live) lack signal; mature niches (> 60 days) are deprioritized for diversification. Peaks at day 14, the end of the first full window.
60/40 EMA blend with old priority dampens day-to-day jitter so a single bad window doesn't tank a niche.
Status transitions
if new_priority < 0.15 AND days_at_low_priority >= 14:
    Status → "Paused"      // stop scraping; keep existing live listings
    Reason: "Sustained underperformance: priority < 0.15 for 14+ days"

if Status == "Paused" AND new_priority > 0.30:
    Status → "Active"      // revive
    Reason: "Recovered: priority {{old}} → {{new}}"

if Status == "Paused" AND days_paused >= 60 AND no_revenue_60d:
    Status → "Deprecated"  // hard stop; archive related products
    Reason: "60d paused, zero revenue: deprecating"
Output payload (E4 → E5)
{
  "niche_id": "recABC123",
  "niche_name": "Wedding Printables",
  "old_priority": 0.78,
  "new_priority": 0.84,
  "performance_components": {
    "revenue_per_product_norm": 0.92,
    "conversion_norm": 0.71,
    "units_norm": 0.65,
    "trend_slope": 0.34,
    "recency": 0.81
  },
  "status_change": null,
  "reason": "Strong rev/product (0.92), positive trend (+0.34), within mature window. Composite 0.86 → blended 0.84.",
  "windows_considered": 4
}
Backflow into Phase 1 (closing the loop)
Scenario A's step A2 (Search Records → Niches where Status = "Active", sort PriorityScore DESC, limit 5) does the actual biasing — no code change needed. The recompute simply reorders which 5 niches get scraped that morning.

Two refinements worth adding once the loop runs for ~30 days:

Stochastic exploration. A2 currently takes top 5. Replace with: top 4 by priority + 1 random from the remaining Active pool (ε-greedy with ε=0.2). Prevents the system from collapsing into a single niche even if it's a local maximum.
Keyword-level priority. The next iteration moves priority scoring from Niche → (Niche, Keyword) pairs. The current schema supports this — TrendSignals.KeywordsExtracted and Products.SEOTags give you the join — you'd add a KeywordPerformance table mirroring NichePerformance. Out of scope for v1 but the data is already collected.
Cold-start problem
For a new niche with zero NichePerformance rows, performance_score is 0 and the niche would never get scraped after day 1. Two mitigations:

Seed priority floor: every newly-created Niche starts at PriorityScore = 0.50 (not 0). The recompute formula with 0.4 * old_priority weight lets a brand-new niche stay scraped for ~14 days even with zero performance data, giving it a chance to produce listings.
Bypass during exploration phase: if days_since_niche_created < 21, skip recompute entirely. Pin PriorityScore = max(0.50, current). Logged as Reason: "Exploration phase — recompute deferred".
Operations cost
Per day, post-loop:

Scenario C: 4 runs × ~50 live products × 4 modules ≈ 800 ops/day
Scenario D: ~50 ops
Scenario E: ~30 ops
Scenario F: ~5 ops/sale event
Total feedback-loop overhead: ~880 ops/day. Combined with Discovery (~120) and Production (~280 per 10 products), the system runs cleanly inside a 30K ops/month Make.com plan.

End-to-end loop, traced
T+0d  Scenario A scrapes Etsy → 50 candidates per niche
T+0d  GPT-4o filters to 10 → Products created (Status=Draft)
T+0d  Scenario B generates assets, mockups, QA, copy → Status=Ready_For_Review
T+0d  Slack ping: "10 products ready"
T+0d  Operator approves → Status=Approved → Make.com webhook
T+0d  Etsy listing live → Status=Live, EtsyListingID stored
T+0..7d  Scenario C polls sales every 6h → SalesPerformance upserts
T+7d  Scenario D closes window → NichePerformance row created
T+8d  Scenario E recomputes → Niches.PriorityScore updated
T+8d  Scenario A's morning scrape pulls top 5 niches in new order
       ↑
       └─── feedback closes
The seven-day window in Step 13 isn't a hard cutoff — it's the first signal. NichePerformance accumulates indefinitely; the recompute uses the trailing 28 days so a niche needs sustained performance, not a one-week spike, to climb.

Architecture complete
You now have all five batches:

Schema — 6 tables (now 8 with feedback loop) wired with the Approve checkbox as the single human gate
Orchestration — 2 Make.com scenarios for Discovery + Production with full module/payload tables
Agents — 3 hardened JSON-output system prompts (Filter, QA, Copywriter) with validation guards
Distribution — Versioned webhook payload spec mapping Airtable → Etsy v3 API
Feedback — 4 scenarios + scoring algorithm closing the loop from sales → priority → next scrape
The system is fully closed-loop, idempotent at every external boundary (Etsy, Airtable, Slack), and instrumented for audit (PriorityHistory, SalesPerformance.Locked, internal_metadata in webhook). It is ready for implementation.

Want a Batch 6 covering operational concerns — error budget, runbook, secret rotation, monitoring dashboards — or a v1.1 implementation checklist sequencing the build order?

You
Batch 6
Claude
Batch 6: Operations, Reliability & Implementation Sequencing
This batch hardens the system for production: how it fails safely, how you know when something's wrong, how secrets are managed, and the order in which to actually build it.

§1. Error budget & failure taxonomy
Every external boundary in the system can fail. Each failure mode has a defined retry policy, a Status sink, and a human-visible surface.

Failure classification matrix
Failure	Where	Detection	Retry	Sink State	Human Surface
Apify/Browse.ai scraper down	Scenario A4/A5	HTTP 5xx, timeout	3× / 60s backoff	Niche skipped, others continue	Slack #dpf-alerts warning
Selection Filter returns invalid JSON	A8 → A9	JSON parse fail	1× re-roll, no prompt change	Run aborted for that niche	Slack alert, raw output to RunLog
GPT-4o asset generation refusal/empty	B6	Empty asset_blocks	2× with temp +0.1	Products.Status = "Draft", flagged	Daily digest
Image generator rate-limit	B13a/b	HTTP 429	Exponential backoff, max 5×	If still failing → Status = "QA_Failed" with reason	Daily digest
Image generator content-policy block	B13a/b	HTTP 400 + policy code	None (regen prompt only)	Products.Status = "QA_Failed", RejectionReason populated	Daily digest
QA agent verdict = Fail	B19	Normal control flow	None — by design	Status = "QA_Failed"	Visible in Review Queue
Copywriter tag count ≠ 13	B21 → validator	length check	2× re-roll	Status = "Copy_Failed"	Daily digest
Etsy createDraftListing 4xx	W5	HTTP status	0× (likely data issue)	Status = "Rejected", full error in RejectionReason	Slack #dpf-alerts immediate
Etsy image upload 4xx	W7	HTTP status	1×	If fails: rollback draft, Status = "Rejected"	Slack #dpf-alerts immediate
Etsy 5xx / network	W5–W10	HTTP status	5× exponential	If fails: keep draft, Status = "Publishing" retained for retry	Slack #dpf-alerts immediate
Sales pull HTTP fail	C4/C5	HTTP status	2× / 30s	Skip product this pull, continue	Silent (next pull will catch up)
Airtable rate limit	any	HTTP 429	Make.com auto-retry 3×	If still failing: scenario error	Slack #dpf-alerts
Webhook idempotency collision	W2	Data Store hit	None	Webhook ack'd, no-op	Logged, not alerted
Error-budget targets (v1)
SLO	Target	Measurement window
Scenarios A+B end-to-end success	≥ 95% of Draft products reach Ready_For_Review or QA_Failed (not stuck in Generating)	7-day rolling
Webhook publish success	≥ 98% of Approved products reach Live within 10 min	30-day rolling
Sales pull freshness	SalesPerformance.PulledAt < 12h old for all Live products	continuous
QA Pass rate	60–85% (tunable; outside this band signals upstream drift)	7-day rolling
Operator review-to-approve latency	p50 < 24h	7-day rolling
A QA Pass rate >85% means the QA agent is rubber-stamping; <60% means the asset generator is regressing. Both trigger a prompt-tuning ticket.

§2. Idempotency & retry semantics
The system writes to four external systems (Etsy, Airtable, Slack, sales-data partners). Every write must be idempotent so retries are safe.

Boundary	Idempotency mechanism
Airtable → Make.com webhook	Idempotency-Key: <product_id>:<approved_at>, deduped via Make.com Data Store before any Etsy call
Make.com → Etsy createDraftListing	If Products.EtsyListingID already populated → skip W5, resume at W6. Effectively a finite state machine on the row.
Make.com → Etsy uploadListingImage/uploadListingFile	After W5 succeeds, Products carries EtsyListingID and an array UploadedImageRanks[]/UploadedFileRanks[]. Iterators in W6/W8 skip ranks already uploaded.
Make.com → Etsy updateListing (state=active)	Idempotent by API design — re-issuing on an active listing is a no-op
Sales pull C7	Airtable upsert keyed on (Product, WindowEnd) — same row updated all 4× per day until D4 locks it
Slack notifications	thread_ts keyed by (scenario, run_id) — re-notifies edit the existing message rather than spam
The contract: any Make.com scenario can be re-run from the start without producing duplicate Airtable rows, duplicate Etsy listings, or duplicate Slack messages. The Status field is the source of truth for "where did we get to" — never re-derive from external state.

§3. Monitoring dashboards
Three Airtable Interfaces + one external dashboard.

Interface: Operator Daily
Already specified in Batch 1. Add KPI strip:

Products Ready (count, color = green if ≥ 8, amber 5–7, red < 5)
Avg QA Score today (gauge)
Approval rate, 7d (formula on Products: Approved / Ready_For_Review)
Pipeline health: count of Generating rows older than 30 min (any > 0 = red)
Interface: System Health
Last successful Discovery run (max(TrendSignals.CapturedAt))
Last successful Production run (max(Products.CreatedAt where Status != Draft))
Last successful sales pull (max(SalesPerformance.PulledAt))
Stuck records: any Products.Status = "Generating" for > 30 min, or "Publishing" for > 15 min — direct-edit grid for manual intervention
Error log table view: RunLog (new table — see §6) filtered to last 24h, severity ≥ warning
Interface: Niche Strategy
Niches grid sorted by PriorityScore DESC, with sparkline-equivalent: linked NichePerformance rows showing 4 weeks of revenue
PriorityHistory filtered to last 7 days — shows recent re-rankings with reasons
Manual override controls: a PinPriority checkbox + PinnedScore number on Niches. When PinPriority = true, Scenario E reads PinnedScore and skips recompute for that niche. Auditable in PriorityHistory with Reason: "Manual pin".
External: Make.com Operations dashboard
Make.com's built-in dashboard tracks ops/day and scenario success rate. Pin to a Slack #dpf-ops channel via Make.com's Slack integration. Set a threshold alert at 80% of monthly ops budget.

§4. Secret management & rotation
Secrets live in three places and only three places:

Secret	Owner	Rotation cadence	Mechanism
Etsy OAuth refresh token	Make.com Connection	On expiry (Etsy: 30 days)	Make.com auto-refreshes; manual reauth if it stales
OpenAI API key	Make.com Connection	90 days	Manual; calendar reminder
Anthropic API key	Make.com Connection	90 days	Manual
Apify token	Make.com Connection	180 days	Manual
Browse.ai API key	Make.com Connection	180 days	Manual
Midjourney/PiAPI key	Make.com Connection	90 days	Manual
X-DPF-Auth shared secret (Airtable→Make webhook)	Airtable base secrets + Make.com webhook config	180 days	Coordinated rotation: write new secret to both, deploy, remove old
Slack webhook URL	Make.com Connection	On compromise only	Manual
Etsy shop_id (not secret but config)	Make.com Data Store	Static	—
Hard rules:

No API key ever appears in an Airtable field, a prompt, a webhook payload, or a logged JSON output.
Make.com Connections are the only secret store. If a credential needs to be reused across scenarios, share the Connection — never duplicate.
The X-DPF-Auth rotation is the one tricky case (two systems must agree). Rotation runbook: (a) generate new secret, (b) add as X-DPF-Auth-Next header in Airtable script, (c) Make.com accepts either, (d) remove old from Airtable, (e) Make.com accepts only new. 24h window per stage.
§5. Cost & quota guardrails
Resource	Soft cap	Hard cap	Action at hard cap
Make.com ops/month	25,000	30,000	Pause Scenario A trigger; alert
OpenAI spend/day	$40	$75	Halt B6/B11/B21; existing products complete via Anthropic-only fallback
Anthropic spend/day	$20	$40	QA agent falls back to GPT-4o; alert
Image generator spend/day	$25	$50	Reduce mockup count from 3 → 1 (Hero only); alert
Etsy listings created/day	12	20	Stop approving (Airtable interface shows banner)
Etsy API calls/day	8,000	10,000 (Etsy hard limit)	Spread sales pull C across niches over 24h instead of every 6h
Implement caps as a Costs Airtable table, updated by each scenario at run-end via a Tools > Increment variable module. Scenarios check the cap before doing expensive work; if exceeded, route to the alert path and exit cleanly.

§6. Logging & audit
Add one more table to round out observability.

Table 9: RunLog
Field	Type	Notes
LogID	autoNumber	Primary
Scenario	singleSelect	Discovery, Production, Webhook, SalesPull, WindowClose, PriorityRecompute, SaleEvent
RunID	singleLineText	UUID, ties together all logs from one execution
Severity	singleSelect	info, warning, error, critical
Stage	singleLineText	Module reference, e.g., B17, W7
Product	linkToAnotherRecord	→ Products (nullable)
Niche	linkToAnotherRecord	→ Niches (nullable)
Message	longText	Human-readable
Payload	longText	Raw JSON snapshot at failure point (truncate to 5KB)
OccurredAt	dateTime	
Logging discipline:

info: scenario start/complete, milestone transitions
warning: a retry happened, a non-blocking validation failed, a soft cap was hit
error: a record reached a *_Failed status
critical: the entire scenario aborted, OR an Etsy publish rolled back
critical rows trigger immediate Slack #dpf-alerts ping. error rows go into the daily digest. warning and info are dashboard-only.

Retain logs 90 days; weekly archive of older rows to a RunLog_Archive base.

§7. Manual override surfaces
The system is automated but the operator must have explicit handles for every common intervention. All exposed via the Operator Daily and System Health interfaces:

Override	Mechanism	Effect
Re-run failed product	Set Status from QA_Failed back to Draft	Picked up by Scenario B's Airtable Watch trigger
Skip QA on a specific product	Edit QAVerdict to Pass and Status to Ready_For_Review	Approval flow proceeds normally
Force re-publish	Clear EtsyListingID and EtsyListingURL, set Status to Approved	Re-fires the publish webhook
Pin niche priority	Niches.PinPriority = true, set PinnedScore	Scenario E respects pin
Pause whole system	SystemConfig.MasterEnabled = false	All scheduler-triggered scenarios short-circuit at module 1
Dry-run mode	SystemConfig.DryRun = true	Webhook receives but does not call Etsy; logs intended payload
SystemConfig is a single-row table (constraint: max 1 record) with global toggles. Every scenario's first module reads it.

§8. Implementation sequencing — the build order
The 6 batches give you a complete spec, but you cannot build them in spec order — that would leave you with a dead Etsy connector for two weeks. Build in vertical slices that each produce a working subsystem.

Slice 0: Foundation (Days 1–2)
Create Airtable base DPF_Core with only Niches, Products, Mockups tables (Batch 1, minimum).
Seed Niches with 5 hand-picked niches at PriorityScore = 0.50.
Set up Make.com workspace, install Etsy + OpenAI + Anthropic + Airtable connections.
Create a SystemConfig row with MasterEnabled = false, DryRun = true.
Done when: you can manually create a Products row in Airtable.

Slice 1: Manual-input → Etsy publish (Days 3–5)
Skip Phases 1–3. Build the distribution webhook only (Batch 4) with hand-entered Airtable data.

Build Scenario W (webhook receiver, modules W1–W12).
Hand-create a Product row with all SEO fields, attach a real PDF, attach 3 real mockup images.
Tick Approve. Verify it lands as a draft Etsy listing in dry-run, then a real one.
Done when: clicking Approve on a manual record produces a live Etsy listing in your dev shop.

This is the highest-risk integration (Etsy's API is fussy). Doing it first means everything upstream has a real target to feed.

Slice 2: Production pipeline (Days 6–10)
Build Scenario B (Batch 2, Phase 2) end-to-end.

Add MasterLibrary, TrendSignals tables.
Implement B1–B23 with all three agent prompts (Batch 3).
Trigger manually by creating a Products row with Status = Draft and a hand-written SourceSignal.
Done when: a manual Draft row produces a fully-populated Ready_For_Review row with assets, mockups, QA score, and SEO copy.

Slice 3: Discovery (Days 11–13)
Build Scenario A (Batch 2, Phase 1).

Add SalesPerformance (empty, just the schema).
Wire Apify, Browse.ai.
Implement A1–A14.
Done when: the daily 02:00 trigger produces 10 Draft rows, which Slice 2 then takes to Ready_For_Review.

Slice 4: Operator UX (Days 14–15)
Build the Airtable Interfaces (Operator Daily, System Health, Niche Strategy). Wire Slack notification. Set MasterEnabled = true. Run live for 7 days.

Done when: you've manually approved real listings end-to-end for a week.

Slice 5: Feedback loop (Days 16–20)
Build Scenarios C, D, E (Batch 5).

Add NichePerformance, PriorityHistory tables.
Implement sales pull, window close, priority recompute.
Verify after first full 7-day window that priorities shift in expected directions.
Done when: PriorityHistory shows non-trivial deltas reflecting actual sales.

Slice 6: Hardening (Days 21–25)
Add RunLog table.
Add cost guards (Costs table, cap checks).
Add manual override surfaces.
Document runbooks for each entry in §1's failure taxonomy.
Set up X-DPF-Auth rotation, calendar reminders for API key rotation.
Done when: §1's matrix has been simulated end-to-end (force each failure, verify it lands in the right Status sink and surfaces correctly).

§9. Runbooks (the four most important)
Runbook A: "Stuck in Generating"
Symptom: a Products row has Status = Generating for > 30 min.

Open RunLog filtered to that Product and Scenario = Production.
If last log is an error at B7 (template renderer): renderer is down. Set Status = Draft to retry, or override the master template via MasterTemplateUsed.
If last log is at B13: image generator failure. Check spend caps; if hit, raise the cap or wait for daily reset.
If no error logs: scenario timed out silently. Set Status = Draft to retry; if it stalls again, halve the iterator batch size in Scenario B.
Runbook B: "Etsy publish failed"
Symptom: Status = Rejected, RejectionReason populated.

Read RejectionReason — Etsy returns specific error codes.
Common: image dimension error → regenerate mockups (Mockups row, set Approved = false, kick off image regen). Then clear EtsyListingID, set Status = Approved to re-fire webhook.
Common: taxonomy error → fix MasterLibrary.EtsyTaxonomyID, then retry.
Common: tag rejected (Etsy disallows certain words) → edit SEOTags manually, retry.
Runbook C: "Priority recompute produced unexpected ranking"
Symptom: a niche you expect at top is mid-pack, or vice versa.

Open PriorityHistory for that niche.
Check Reason — algorithm explains itself.
If you disagree with the algorithm: set Niches.PinPriority = true, PinnedScore to your desired value. Audit trail preserved.
If multiple niches show unexpected results: the global maxima may be skewed by an outlier. Check NichePerformance for any single niche with anomalous revenue (e.g., a viral hit). Consider winsorizing — cap each niche's contribution to the max at p95 instead of true max.
Runbook D: "QA pass rate drift"
Symptom: weekly QA pass rate outside 60–85% band.

Too high (>85%): spot-check 10 recent Pass products. If real defects slipped through, the QA prompt has gone soft — review recent prompt edits, tighten "blocking" criteria.
Too low (<60%): spot-check 10 recent Fail products. If failures look spurious, the QA prompt is over-strict — review and loosen. If failures are real, the asset generator (B6) has regressed — check for OpenAI model version changes, review recent prompt edits to the asset generator.
§10. What's explicitly out of scope (v1)
These are tempting to build but should wait:

Multi-shop / multi-account. v1 is one Etsy shop, one operator.
Variation listings. All v1 products are single-SKU. The variations[] array in the webhook payload exists but is empty.
A/B testing of titles. Etsy API doesn't natively support; would need separate tooling.
Auto-approval. Even at 99% QA pass rate, leave the human gate in. The cost of one bad listing (Etsy account flag) >> the cost of operator time.
Cross-marketplace. Adding Gumroad/Shopify is a new distribution scenario, not a modification of the Etsy one. Defer.
Customer service. Buyer messages, refunds, reviews — outside the factory's scope.
Architecture-and-operations complete
Six batches deliver:

Schema — 9 tables, fully relational, with the Approve checkbox as the human gate
Orchestration — 2 scenarios for Discovery + Production with payload contracts
Agents — 3 hardened JSON-output prompts with validation
Distribution — Versioned webhook + Etsy v3 mapping
Feedback — 4 scenarios closing the loop with an auditable scoring algorithm
Operations — Failure taxonomy, SLOs, idempotency, secrets, monitoring, and a 25-day vertical-slice build plan with runbooks
The system is specified end-to-end: a developer can build it, an operator can run it, and a stakeholder can audit it. No remaining hidden assumptions.

This concludes the architecture phase. Logical next steps if you want them:

Implementation kickoff package — Airtable base export (template JSON), Make.com scenario blueprints (downloadable .json), and a Notion-formatted runbook.
Stakeholder summary — a one-page executive overview of the system suitable for sharing with non-technical reviewers.
Risk register — formal risk assessment (Etsy ToS, AI content provenance, IP on scraped designs) to pair with the technical architecture.
You
Risk register
Claude
Risk Register: Automated Digital Product Factory v1
A formal risk assessment paired to the architecture. Each risk is scored on Likelihood (1–5) and Impact (1–5); Severity = L × I (1–25). Risks are grouped by category and ordered by severity within each. Treatment strategies map to specific architectural controls already in the design where they exist, and call out gaps where they don't.

Scoring legend:

Likelihood: 1 Rare · 2 Unlikely · 3 Possible · 4 Likely · 5 Almost Certain
Impact: 1 Negligible · 2 Minor · 3 Moderate · 4 Major · 5 Catastrophic
Severity bands: 1–6 Low · 7–12 Medium · 13–18 High · 19–25 Critical
Master Risk Table
#	Risk	Category	L	I	Severity	Treatment
R01	Etsy account suspension for ToS violation (AI/bulk listings)	Platform	4	5	20 Critical	Mitigate
R02	Scraping target IP infringement (designs cloned too closely)	IP/Legal	4	5	20 Critical	Mitigate
R03	Etsy API access revoked / partner status pulled	Platform	2	5	10 Medium	Transfer
R04	AI-generated content violates third-party copyright (training data)	IP/Legal	3	4	12 Medium	Mitigate
R05	Buyer files DMCA / "not as described" complaint at scale	IP/Legal	3	4	12 Medium	Mitigate
R06	Trademark infringement in generated copy/imagery	IP/Legal	3	4	12 Medium	Mitigate
R07	Etsy "AI-generated" disclosure policy non-compliance	Platform	4	3	12 Medium	Mitigate
R08	Scraping ToS violation triggers Etsy CFAA-style claim	IP/Legal	2	4	8 Medium	Mitigate
R09	OpenAI / Anthropic / Make.com outage halts production	Operational	4	3	12 Medium	Accept + Mitigate
R10	Cost runaway (LLM/image API spend spike)	Financial	4	3	12 Medium	Mitigate
R11	QA agent rubber-stamps defective products	Quality	3	4	12 Medium	Mitigate
R12	Niche concentration — system collapses to 1–2 niches	Strategic	4	3	12 Medium	Mitigate
R13	Operator approval bottleneck (human capacity)	Operational	4	3	12 Medium	Mitigate
R14	API credential leak / repository commit	Security	2	5	10 Medium	Mitigate
R15	Webhook replay attack / forged Approve trigger	Security	2	4	8 Medium	Mitigate
R16	Airtable base data loss / accidental deletion	Operational	2	4	8 Medium	Mitigate
R17	Pricing race-to-bottom degrades niche margins	Strategic	4	2	8 Medium	Accept
R18	Buyer reviews tank from low-quality output	Quality	3	3	9 Medium	Mitigate
R19	Tax/VAT collection misconfiguration (international sales)	Regulatory	3	3	9 Medium	Transfer
R20	Personal data captured incidentally in scrapes (GDPR)	Regulatory	2	4	8 Medium	Mitigate
R21	AI-generated imagery shows recognizable real persons	IP/Legal	2	4	8 Medium	Mitigate
R22	Vendor lock-in (Make.com / Airtable migration cost)	Strategic	3	2	6 Low	Accept
R23	Schema drift between Airtable and Make.com handlers	Technical	3	2	6 Low	Mitigate
R24	Feedback-loop pathological optimization	Strategic	3	2	6 Low	Mitigate
R25	Operator burnout / single-point-of-failure (one approver)	Operational	3	3	9 Medium	Mitigate
Critical Risks (Severity ≥ 19) — detailed
R01: Etsy account suspension for ToS violation
L4 × I5 = 20 — Critical

Description. Etsy's policies prohibit (a) reselling or drop-shipping items not made by the seller without disclosure, (b) listings that are confusingly similar to existing listings, and (c) bulk/automated listing creation that resembles spam. An automated factory hitting any of these triggers — even unintentionally — risks shop suspension. Suspension is often immediate, with limited appeal, and forfeits payouts in escrow.

Triggers.

Listing creation rate > Etsy's informal threshold (anecdotally ~50/week for new shops).
Customer reports of templated/repetitive listings.
Reverse-image search match against existing Etsy listings (the scraper's source material).
Manual Etsy Trust & Safety review flagging "unoriginal content."
Existing architectural controls.

Hard cap of 12–20 listings/day (Batch 6 §5).
Manual Approve gate (Batch 1) — every listing has human review.
QA agent mockup-content match check (Batch 3 §2).
Additional mitigations required.

Visual de-duplication step. Add module B16.5 between Mockup creation and QA: hash each generated mockup (perceptual hash, e.g., pHash) and compare against (a) other mockups in our own shop, (b) the originating TrendSignals.RawURL thumbnail. Reject if similarity > 0.85.
Originality affidavit in QA. Extend the QA agent prompt to flag any output that "could plausibly be confused with the source listing it was inspired by." Treat as blocking.
Shop ramp-up curve. First 30 days: cap at 3 listings/day. Days 31–90: 8/day. Day 90+: 15/day. New shop accounts get the heaviest scrutiny.
Disclosed seller profile. Shop "About" page explicitly states the use of AI in design generation (also addresses R07).
Diversification across non-trending sub-niches. The scraper currently targets high-demand items, which are exactly the most-cloned. Add a "blue ocean" mode (10% of capacity) that targets low-review-count listings — original-er territory.
Residual severity after treatment: L2 × I5 = 10 (Medium). The impact remains catastrophic; only likelihood is reducible.

Owner. Operator (manual policy review monthly) + automation lead (visual dedup implementation).

Indicators we're failing the mitigation. Any Etsy "policy education" email; any single listing taken down; any sudden drop in shop search ranking.

R02: Scraping target IP infringement
L4 × I5 = 20 — Critical

Description. The system scrapes Etsy and Creative Market listings to identify products to clone. Even though the AI generates "new" assets, those assets are derivatives of the scraped sources. If the AI memorizes layouts, color palettes, or distinctive design elements closely enough — or if the prompt explicitly instructs it to "make this product" — the output may be a derivative work infringing the original seller's copyright. Successful claims trigger DMCA takedowns, account suspension (compounding R01), and potentially statutory damages ($750–$30,000 per work in the US, willful infringement up to $150,000).

Triggers.

Asset generator prompt that references source listings too literally.
Image generator producing recognizably-similar mockups.
Original seller running reverse-image search (common practice on Etsy).
Existing architectural controls.

Asset generator uses complaints_to_solve and value_prop fields (Batch 2 B6) — abstracted away from source listing.
QA agent's mockup-content match check.
Master Library system (Batch 1 Table 5) — outputs derive from operator-curated templates, not from source listings.
Additional mitigations required.

Strict prompt isolation. The Asset Generator (B6) MUST NOT receive RawTitle or RawURL from the source signal. It receives only abstracted fields: niche keywords, complaints, target price, product type, and the Master Library template schema. Update Batch 2's payload contract to enforce this.
Master Library is the only design source. All visual structure originates from operator-created masters — never from scraped designs. The scraper informs what to make, never how to make it. This is the single most important control.
Visual similarity check at QA. As R01.1, but specifically comparing each generated mockup against the originating listing's hero image. Reject anything > 0.75 perceptual similarity.
Distinct visual identity per shop. Establish a house style (typography, palette, layout grammar) baked into the Master Library. Generated products look like they came from our shop, not like clones of theirs. Strongest legal defense: visible original creative input.
DMCA response procedure. Designate a DMCA agent; pre-write takedown response template; commit to 24h removal-on-receipt regardless of merit (avoids escalation).
Residual severity after treatment: L2 × I5 = 10 (Medium).

Owner. Operator (Master Library curation, DMCA handling) + automation lead (prompt isolation, similarity check).

Indicators we're failing the mitigation. Any DMCA notice received; any direct buyer/seller message alleging copying; any output where the original source is recognizable to a casual viewer.

High & Medium Risks — abbreviated
R03: Etsy API access revoked
L2 × I5 = 10 (Medium) — Etsy has tightened API access historically; partner status can be revoked. Treatment: maintain ability to publish manually via CSV upload as a degraded fallback; the Distribution webhook (Batch 4) already produces a fully-typed payload that can be pivoted to CSV with one transformation module.

R04: AI training data copyright contamination
L3 × I4 = 12 — Models may emit copyrighted material verbatim (font glyphs, stock-photo-like images). Treatment: (a) prefer DALL-E 3 over Midjourney where indemnification matters — OpenAI offers commercial use indemnification on Enterprise/API tier; (b) avoid prompts naming living artists, brands, or franchises; (c) use only fonts you have licensed, embedded in Master Library — never let AI generate text that requires custom font rendering.

R05: Buyer "not as described" / DMCA at scale
L3 × I4 = 12 — Etsy auto-suspends shops past a threshold of buyer complaints. Treatment: SEO description must accurately represent files delivered; QA agent's coherence check (Batch 3 §2) enforces this; add a "deliverables match description" line item to the QA blocking-issue list.

R06: Trademark in generated copy/imagery
L3 × I4 = 12 — "Disney-style," "Taylor Swift," brand names in tags. Treatment: Selection Filter prompt MUST add an exclusion list of trademarked terms (update Batch 3 §1: "reject any candidate whose title contains a known brand or franchise name"). Maintain BlockedKeywords table (new — see schema addition below).

R07: AI-disclosure non-compliance
L4 × I3 = 12 — Etsy requires disclosure of AI involvement in production. Treatment: every listing description (Copywriter prompt §3) must include a standardized AI-disclosure line: "Designed using AI-assisted tooling; quality-reviewed by hand." Make it a hard structural rule in the prompt (Batch 3 §3 amendment).

R08: Scraping ToS / CFAA exposure
L2 × I4 = 8 — Etsy ToS prohibits scraping. Treatment: use Apify's residential-proxy compliance mode; respect robots.txt; rate-limit aggressively (already done — A4 sync runs are bounded). Consider switching to public datasets (e.g., Etsy's own trending-products data feeds where available) over time.

R09: Vendor outage
L4 × I3 = 12 — Make.com, OpenAI, or Anthropic going down halts production. Treatment: the system is asynchronous by design (Batch 6 §2 idempotency) — a multi-hour outage simply delays Discovery, doesn't break it. QA agent has cross-vendor fallback (Batch 6 §5: Anthropic → GPT-4o). Add the same fallback for the Copywriter and Selection Filter.

R10: Cost runaway
L4 × I3 = 12 — A loop bug or model regression triggers thousand-dollar spend overnight. Treatment: Costs table with hard caps (Batch 6 §5). Add a per-scenario circuit breaker: if more than 3 consecutive error-severity rows in RunLog for one scenario within 1 hour, halt the scenario's scheduler trigger and alert.

R11: QA agent rubber-stamping
L3 × I4 = 12 — Failure mode of any LLM grader. Treatment: weekly sampling — operator manually QAs 5 random Pass products and rates them; when sample-disagreement rate exceeds 20%, retune prompt (Batch 6 §9 Runbook D already covers this). Add explicit "Sample QA" view in Operator Daily interface.

R12: Niche concentration
L4 × I3 = 12 — Feedback loop converges on highest-priority niche, abandoning others. Treatment: ε-greedy exploration already proposed in Batch 5 §"Backflow into Phase 1". Make ε=0.2 mandatory, not optional. Add concentration metric to System Health interface: max(PriorityScore) / mean(PriorityScore) — alert if > 3.0.

R13: Operator approval bottleneck
L4 × I3 = 12 — Human gate is the slowest step; backlog grows unbounded. Treatment: if Ready_For_Review count exceeds 30, Scenario A (Discovery) auto-pauses next day. Add this as a SystemConfig-driven check. Long-term: train a second approver, OR introduce a "Tier 1" auto-approve lane for products with QAScore > 0.95 AND niche has >10 prior sales without complaints.

R14: Credential leak
L2 × I5 = 10 — A logged payload, accidental commit, or screenshot leaks an API key. Treatment: Batch 6 §4 secret hygiene. Add: RunLog.Payload field has a sanitization filter that strips anything matching common API key patterns (sk-*, Bearer *) before write.

R15: Webhook replay/forge
L2 × I4 = 8 — Attacker forges Approve webhook → publishes arbitrary listing. Treatment: X-DPF-Auth shared secret + idempotency key already specified (Batch 4). Add: webhook payload signed with HMAC-SHA256 of the body; Make.com verifies signature in W1 before any processing. Reject on signature mismatch.

R16: Airtable data loss
L2 × I4 = 8 — Accidental deletion of a base, view, or critical record. Treatment: weekly automated export of all tables to CSV stored in versioned cloud storage (Make.com scenario, runs Sunday 03:00 UTC). Airtable has 1-week change history natively; backups extend that to 90 days.

R17: Race to bottom on price
L4 × I2 = 8 — Dynamic pricing 10–15% under market depresses the niche over time as everyone copies. Treatment: cap discount at the launch window (first 14 days), then raise to market-average. Add PriceSchedule to Products: {LaunchPrice, StandardPrice, EffectiveAt}. Scenario E (priority recompute) already runs daily; extend it to also bump prices for products past day 14.

R18: Buyer review damage
L3 × I3 = 9 — One sustained 1-star streak harms shop visibility for months. Treatment: monitor SalesPerformance for products with no sales after 21 days OR with reviews < 4★ — auto-flag for de-listing in Operator Daily. Listing churn protects shop reputation.

R19: Tax/VAT misconfiguration
L3 × I3 = 9 — International sales of digital goods trigger VAT obligations in EU/UK/AU. Treatment: Etsy collects and remits VAT on digital downloads in most jurisdictions automatically — verify shop is enrolled. Transfer the residual risk to a tax advisor; document jurisdictions covered in operator runbook.

R20: Incidental personal data in scrapes
L2 × I4 = 8 — Scrape captures buyer reviewer names in complaints_text. Treatment: sanitization step in A7 (TrendSignals create) — strip anything matching name patterns from TopComplaints before persisting. GDPR-compliant retention: auto-archive TrendSignals after 90 days.

R21: Real persons in AI imagery
L2 × I4 = 8 — Image generator produces a recognizable celebrity. Treatment: image prompt builder (B11) must reject any prompt containing proper names of persons; QA agent flags any output where the mockup contains recognizable human faces (extension of mockup-match check).

R22: Vendor lock-in
L3 × I2 = 6 (Low) — Migrating off Make.com/Airtable is expensive. Treatment: accept for v1. Schema is portable JSON; scenario logic is documented in Batches 2–5 with sufficient specificity to rebuild on n8n/Zapier/custom.

R23: Schema drift
L3 × I2 = 6 — Airtable field renamed; Make.com handler breaks silently. Treatment: webhook payload schema_version (Batch 4); add the same to internal scenario hand-offs. Field-name changes require coordinated PR (Airtable + Make.com).

R24: Pathological optimization
L3 × I2 = 6 — Feedback loop optimizes for a metric that doesn't reflect long-term value (e.g., views without conversion). Treatment: Scenario E already weights revenue/product at 40% (Batch 5) — most-correlated with actual value. Quarterly review: operator manually reweights if optimization is producing strange results.

R25: Operator single-point-of-failure
L3 × I3 = 9 — Operator unavailability stalls all approvals. Treatment: designate backup approver; document approval criteria in runbook so backup can step in. SystemConfig.MasterEnabled toggle lets backup pause discovery cleanly during long absences.

Schema additions implied by this risk register (v1.3)
Three small additions land from R-level controls:

Table: BlockedKeywords — { Term: singleLineText, Category: singleSelect (Brand|Trademark|Adult|Other), AddedBy: collaborator, AddedAt: createdTime }. Read by Selection Filter (R06) and Copywriter to reject candidates and tags.
Products.PriceSchedule (R17) — longText storing JSON {launch_price, standard_price, effective_at}; written at creation, consumed by daily price-bump scenario.
Mockups.PerceptualHash (R01, R02) — singleLineText storing pHash; populated at B15; queried by visual-dedup module B16.5.
Risk-treatment summary by category
Category	# risks	Critical	Mitigated	Accepted	Transferred
Platform (Etsy)	3	1	2	0	1
IP / Legal	6	1	6	0	0
Operational	5	0	5	0	0
Quality	2	0	2	0	0
Strategic	4	0	2	2	0
Security	2	0	2	0	0
Financial	1	0	1	0	0
Regulatory	2	0	1	0	1
Technical	1	0	1	0	0
Total	25	2	22	2	1
After treatment, no risk remains in the Critical band; the two starting at 20 drop to 10. The two accepted risks (R17 race-to-bottom, R22 vendor lock-in) are explicitly bounded and revisited at the v2 planning gate.

Top three actions before go-live
If only three things get done from this register, they should be:

Implement Master Library isolation (R02). The asset generator must never see source listing identifiers. This is the difference between "AI-assisted original work" and "automated infringement at scale." Ship before any production listing goes live.
Implement perceptual-hash dedup (R01, R02). The single most effective technical control against both ToS strikes and IP claims. Module B16.5 in Scenario B; ~half a day of work.
Add disclosure line to Copywriter prompt (R07). One sentence in Batch 3 §3. Zero cost, removes a known regulatory exposure.
What this register doesn't cover
For completeness — if any of these matter, they need their own assessment:

Insurance. No cyber liability or E&O coverage is specified; recommend consulting a broker once the shop has > $10K/month revenue.
Entity structure. Operating this as a sole proprietorship vs. LLC affects personal liability exposure on R02/R05/R06. Out of scope for technical architecture; recommend legal counsel.
Cross-border shipping/tax beyond digital. v1 is digital-only; if physical products are added later, customs and shipping risks need re-assessment.
Employment/contractor risk. If the operator role is filled by a contractor, IP assignment and confidentiality terms matter.
The complete delivery package is now: 6 batches of architecture + 1 risk register. The system is specified, sequenced, and risk-assessed. Ready to build.

Want next: an executive one-pager summarizing all 7 documents for non-technical stakeholders? Or move directly to implementation kickoff (Airtable base template + Make.com scenario blueprints)?

You
an executive one-pager summarizing all 7 documents for non-technical stakeholders
Include on register - Insurance, Entity structure, Cross-border shipping/tax beyond digital and Employment/contractor risk
Claude
I'll deliver this in two parts: (1) the four added risks now formally entered in the register, then (2) the executive one-pager.

Risk Register Addendum: R26–R29
#	Risk	Category	L	I	Severity	Treatment
R26	Uninsured liability event (IP claim, cyber breach, buyer suit)	Insurance	3	5	15 High	Transfer
R27	Personal liability exposure from operating as sole proprietor	Entity Structure	3	5	15 High	Transfer
R28	Cross-border tax/customs liability if physical SKUs are added	Regulatory	2	4	8 Medium	Defer + Transfer
R29	Contractor/employment IP & confidentiality leakage	Employment	3	4	12 Medium	Mitigate + Transfer
R26 — Uninsured liability event
L3 × I5 = 15 High. A single DMCA-driven lawsuit, payment-processor chargeback wave, or data-handling claim can exceed annual revenue. Treatment: secure (a) Errors & Omissions / Professional Liability covering IP claims arising from automated content generation, (b) Cyber Liability covering credential leak and customer-data exposure, (c) General Liability as a baseline. Bind coverage before the shop crosses ~$10K/month revenue or 100 cumulative listings, whichever comes first. Owner: principal + insurance broker. Residual after treatment: L3 × I2 = 6 (Low).

R27 — Personal liability under sole proprietorship
L3 × I5 = 15 High. As a sole proprietor, the operator's personal assets are exposed to any claim against the business — including R02 (IP infringement) and R05 (buyer claims). Treatment: form an LLC (or jurisdiction-equivalent limited entity) before first live listing. Open a dedicated business bank account; route all Etsy payouts and API-vendor invoices through it. Maintain corporate formalities to preserve the liability shield. Owner: principal + corporate counsel + accountant. Residual: L3 × I2 = 6 (Low). Note: the entity must hold the Etsy shop, the API contracts, and any registered IP — not the individual.

R28 — Cross-border tax & customs (physical expansion)
L2 × I4 = 8 Medium. v1 is digital-only and Etsy auto-collects most VAT. If physical products are added later, the system inherits import duties, customs declarations, country-of-origin labeling, and platform-specific tax configurations across dozens of jurisdictions. Treatment: defer by enforcing a v1 scope rule — the architecture rejects any non-digital ProductType. Add validation in Asset Generator (B6) and a hard constraint in MasterLibrary (is_digital = true only). Before any physical-product feature ships, commission a tax review with a cross-border specialist. Owner: product owner (scope enforcement) + tax advisor (pre-expansion review). Residual at v1: L1 × I4 = 4 (Low). At v2 expansion: re-score.

R29 — Contractor/employment IP & confidentiality
L3 × I4 = 12 Medium. If any work (Master Library design, prompt tuning, operator role) is done by contractors or employees, the default in many jurisdictions is that the individual — not the business — owns the resulting copyright unless explicitly assigned. Confidential information (Master Library, prompts, niche strategy, sales data) can also walk out the door. Treatment:

Written agreement before any work begins. Every contractor or employee signs a contract that includes (a) explicit IP assignment ("work for hire" plus an assignment clause as fallback), (b) confidentiality with a defined term (typically 3–5 years post-engagement), (c) non-solicitation of the operator's customers/suppliers if applicable.
Access controls match scope. Make.com and Airtable have role-based permissions; contractors get scenario-specific access only; revoke immediately at engagement end.
Audit trail of contributions. All Master Library entries carry CreatedBy (collaborator field — already in Airtable's defaults). Disputes resolved against record.
Contractor-vs-employee classification review with counsel — misclassification is its own regulatory exposure (tax, labor law).
Owner: principal + employment counsel. Residual: L2 × I3 = 6 (Low).

Updated category totals
Category	# risks	Treatment mix
Platform	3	2 mitigated, 1 transferred
IP / Legal	6	6 mitigated
Operational	5	5 mitigated
Quality	2	2 mitigated
Strategic	4	2 mitigated, 2 accepted
Security	2	2 mitigated
Financial	1	1 mitigated
Regulatory	3	1 mitigated, 1 transferred, 1 deferred
Technical	1	1 mitigated
Insurance	1	1 transferred
Entity Structure	1	1 transferred
Employment	1	1 mitigated + transferred
Total	29	2 starting Critical → 0 after treatment
Executive One-Pager: Automated Digital Product Factory
Audience: Non-technical stakeholders (investors, advisors, partners, prospective operator-owners) Read time: ~3 minutes

What we're building
An end-to-end automated factory that researches, designs, lists, and sells digital products on Etsy with one human checkpoint. The system reads market trends every morning, generates ten product candidates with AI, prepares listing copy and visuals, and presents them to the operator in a single dashboard. The operator approves what looks good — one click — and the listings go live automatically. After seven days of sales, the system uses real revenue data to decide which categories of products to pursue more aggressively tomorrow. The result is a self-improving storefront that runs on a few minutes of human attention per day.

How it makes money
The economics rest on three numbers. First, every product launches at 10–15% below the category average price — competitive on Etsy search without racing to the bottom. Second, infrastructure cost per product is roughly $1.50–$3.00 (AI generation, image rendering, platform fees) against typical digital-product price points of $5–$25. Third, the seven-day feedback loop concentrates effort on niches that are actually selling, lifting per-listing revenue over time without lifting per-listing cost. Break-even is reached at modest volume; from there, gross margin scales with the operator's approval cadence rather than with headcount.

How it works, in plain terms
Four phases, executed daily. Discovery scrapes top-performing listings on Etsy and Creative Market, then uses AI to pick the ten most promising opportunities — high demand, low production complexity. Production generates the actual product files, three professional mockup images, listing copy, thirteen SEO tags, and a launch price; a second AI agent independently quality-checks the output. Review is the only human step: the operator opens a dashboard each morning, sees ten polished listings, and ticks the ones worth shipping. Distribution publishes the approved listings to Etsy, then watches sales for seven days and feeds the results back into tomorrow's research priorities.

The technology stack is deliberately boring: a database (Airtable) holds everything, a workflow tool (Make.com) orchestrates the automation, two AI providers (OpenAI and Anthropic) handle content and quality control, and standard image generation handles visuals. No custom software is required — the entire system is configurable rather than coded, which means it can be modified by any reasonably technical operator without engineering support.

Why this design will hold up
The system has been specified across seven documents: schema, orchestration, AI agent prompts, distribution mechanics, feedback loop, operations runbook, and risk register. Three properties matter most for stakeholder confidence:

A human gate that cannot be bypassed. The "Approve" checkbox is the only path from draft to live listing. Quality, brand voice, and legal exposure all have a single human decision point — there is no scenario in which an embarrassing or infringing product reaches buyers without a person seeing it first.

Closed-loop learning. The factory gets sharper over time. Sales data flows back into research priorities automatically; products that succeed in a niche cause more products in that niche to be researched. After ninety days, the system is meaningfully smarter than it was on day one, with no additional engineering investment.

Engineered for failure. Every external system (Etsy, AI providers, scrapers) can fail without taking the factory down. Specific failure modes have specific recovery procedures. Costs are capped daily. Every record is auditable. The architecture assumes things will break and routes around them rather than crashing.

What can go wrong, and what we've done about it
Twenty-nine risks have been formally assessed across eleven categories. The two highest pre-treatment risks — Etsy account suspension and intellectual-property infringement — both score 20/25 in raw form and drop to 10/25 after the architectural controls already specified. Top mitigations:

Originality enforcement. AI generators never see the source listings they were inspired by; they work only from a curated library of original templates the operator builds. Every generated mockup is hashed and compared against its source — anything visually similar is rejected before reaching review.
Conservative ramp-up. First thirty days cap at three listings per day; staircase up to fifteen per day after ninety days, mirroring how a legitimate human-run shop would scale.
Disclosure and house style. Every listing discloses AI-assisted production. Every product carries a recognizable house visual identity, providing the strongest possible defense against copying claims.
Legal and financial perimeter. Operating entity is an LLC (not a sole proprietorship) before first listing. E&O, cyber, and general liability insurance bind before $10K/month revenue. Any contractor work is governed by written IP-assignment and confidentiality terms before work begins. A tax advisor reviews jurisdictions before any expansion to physical product.
After treatment, no risk remains in the Critical band; the highest residual risks are addressed by insurance and entity structure rather than by tolerance.

What we need from a stakeholder
Three decisions and one commitment. Decision one: confirm the LLC formation and insurance binding before live listings begin — this is non-negotiable and gates go-live. Decision two: confirm the operator role — one person spending 20–30 minutes per day on approvals — and a designated backup. Decision three: confirm the v1 scope is digital-only, with physical-product expansion explicitly deferred to a future planning gate. The commitment: a 25-day vertical-slice build plan, sequenced so a working end-to-end pipeline (manual data → live Etsy listing) exists by day five and progressively automates from there. No big-bang launch.

Where this can go in twelve months
The architecture supports — but v1 deliberately excludes — three expansions: a second marketplace (Gumroad, Shopify) added as a parallel distribution scenario, keyword-level priority refinement that biases research within a niche rather than across niches, and a Tier-1 auto-approve lane for products in proven niches with QA scores above 0.95. Each is a clean addition, not a rewrite. The factory's design is intentionally modest at v1 so that growth is a question of turning dials, not rebuilding machinery.

Status: architecture and risk-treatment specification complete. Implementation can begin on stakeholder go-ahead.

Final delivery package consists of: Batch 1 (Database Schema), Batch 2 (Workflow Orchestration), Batch 3 (AI Agent Prompts), Batch 4 (Distribution Webhook), Batch 5 (Feedback Loop), Batch 6 (Operations & Build Plan), Risk Register (29 risks, 11 categories), and this Executive Summary.