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