# Daily Digital Product Tracker — Automation Setup Guide

Your Make.com scenario **"🤖 Daily Digital Product Tracker"** (ID: 4964200) is live at [make.com](https://us1.make.com). This guide walks you through completing the configuration so it runs every day at 8 AM and fills your Airtable automatically.

> ✅ **Your Browse AI robots are already built and tested!** Skip to Step 2 to grab your API key, then jump to Step 3 to configure Make.com.

---

## How the System Works

```
8:00 AM Daily Trigger
        ↓
Browse AI — scrapes top 10 products from Etsy
        ↓
Iterator — loops through each of the 10 products
        ↓
ScreenshotOne — captures a screenshot of the product page
        ↓
Claude Vision API — analyzes the screenshot for design + tech info
        ↓
Airtable — creates records in 3 tables:
  📊 Daily Top 10  ←→  🎨 Design DNA
  📊 Daily Top 10  ←→  ⚙️ Technical Specs
```

**Operation cost per daily run:** ~70 operations (10 products × 7 ops each)  
**Make.com Free Plan limit:** 1,000 ops/month  
⚠️ **Recommendation:** Run weekly (not daily) on the free plan to stay within 280 ops/month. Upgrade to Make Core ($10.59/mo) for unlimited daily runs.

---

## Step 1: Gather Your API Keys

You need accounts and keys for 3 services. All have free tiers to start.

| Service | What It Does | Get Your Key |
|---|---|---|
| **Browse AI** | Scrapes product listings | [browse.ai](https://browse.ai) → API Key in Settings |
| **ScreenshotOne** | Captures product page screenshots | [screenshotone.com](https://screenshotone.com) → Dashboard → API Keys |
| **Anthropic (Claude)** | Analyzes screenshots for design + tech info | [console.anthropic.com](https://console.anthropic.com) → API Keys |

Keep these keys handy — you'll paste them into Make.com modules.

---

## Step 2: Your Browse AI Robots (Already Built! ✅)

Your two robots are trained and working. Here are their IDs — you'll paste these into Make.com:

| Robot | Platform | Robot ID |
|---|---|---|
| **Bestselling Items List** | Etsy (top sellers) | `019dfb68-5e65-7477-b468-71fead2cd0b3` |
| **Bestsellers List** | Gumroad | `019dfb1a-1f77-764a-9c0d-590aa9599f10` |

The Etsy robot already has 2 successful test runs. The Gumroad robot is ready to run.

### Get Your Browse AI API Key
1. Go to [browse.ai](https://browse.ai) → click your profile icon (top right)
2. Go to **Settings → Integrations → API**
3. Copy your API key — you'll need it for Make.com

---

## Step 3: Configure Make.com Modules

Open your scenario at [make.com](https://us1.make.com) → go to your team → **Scenarios** → open **🤖 Daily Digital Product Tracker** (ID: 4964200).

You'll see 2 modules already created (HTTP Get + JSON Parse). You need to reconfigure Module 1 with your real Robot ID, then add 9 more modules. Here's the complete flow:

---

### Module 1 — HTTP: Run Etsy Browse AI Robot

The first module is already created. Click it to configure:

- **URL:** `https://api.browse.ai/v2/robots/019dfb68-5e65-7477-b468-71fead2cd0b3/tasks`
- **Method:** POST
- **Headers:**
  - Name: `Authorization`
  - Value: `ApiKey YOUR_BROWSE_AI_KEY` ← paste your key from Step 2
- **Body type:** JSON
- **Body content:**
```json
{
  "inputParameters": {}
}
```

---

### Module 2 — Wait (Tools: Sleep)

Browse AI runs asynchronously — you need to wait for it to finish scraping.

Click **+** after Module 1 → search **Tools → Sleep**:
- **Delay:** 45 seconds

---

### Module 3 — HTTP: Get Etsy Browse AI Results

Click **+** → search **HTTP → Make a Request**:
- **URL:** `https://api.browse.ai/v2/robots/019dfb68-5e65-7477-b468-71fead2cd0b3/tasks/{{1.result.id}}`
- **Method:** GET
- **Headers:**
  - Name: `Authorization`
  - Value: `ApiKey YOUR_BROWSE_AI_KEY`
- **Parse response:** Yes

---

### Module 3B — HTTP: Run Gumroad Browse AI Robot *(optional — add for cross-platform data)*

To also pull top sellers from Gumroad, add a second Browse AI run:

Click **+** → search **HTTP → Make a Request**:
- **URL:** `https://api.browse.ai/v2/robots/019dfb1a-1f77-764a-9c0d-590aa9599f10/tasks`
- **Method:** POST
- **Headers:**
  - Name: `Authorization`
  - Value: `ApiKey YOUR_BROWSE_AI_KEY`
- **Body type:** JSON
- **Body content:** `{"inputParameters": {}}`

Then add another Sleep (45s) and another HTTP GET to retrieve results — same pattern as Modules 2 & 3 but with the Gumroad Robot ID.

---

### Module 4 — JSON: Parse Browse AI Results

The second module is already created. Click it and connect it to Module 3's output:
- **JSON String:** `{{3.capturedLists[].robotTasks[].capturedLists[]}}`

> **Important:** After you do a test run of Module 3, click on the output bubble to see the actual JSON structure Browse AI returns. The exact path to the product list may be `capturedLists`, `result.capturedLists`, or similar — map it based on what you see in that test output.

---

### Module 5 — Iterator

Click **+** → search **Flow Control → Iterator**:
- **Array:** `{{4.array}}`

This loops the following modules once for each of the 10 products.

---

### Module 6 — HTTP: Capture Screenshot (ScreenshotOne)

Click **+** → search **HTTP → Make a Request**:
- **URL:** `https://api.screenshotone.com/take`
- **Method:** GET
- **Query string parameters:**
  - `access_key` = `YOUR_SCREENSHOTONE_KEY`
  - `url` = `{{5.productUrl}}` *(map to the product URL field from Browse AI)*
  - `full_page` = `true`
  - `viewport_width` = `1280`
  - `viewport_height` = `900`
  - `format` = `jpg`
  - `image_quality` = `80`
- **Parse response:** No *(this returns image bytes)*

Store the response URL for use in Module 7. ScreenshotOne returns a direct image URL — copy the full request URL with your params as the screenshot URL to pass forward.

> **Tip:** ScreenshotOne's free plan gives 100 screenshots/month. For 10/day × 30 days = 300/month, upgrade to their Starter plan ($19/mo) or run weekly on the free plan.

---

### Module 7 — HTTP: Claude Vision API Analysis

Click **+** → search **HTTP → Make a Request**:
- **URL:** `https://api.anthropic.com/v1/messages`
- **Method:** POST
- **Headers:**
  - `x-api-key` = `YOUR_ANTHROPIC_API_KEY`
  - `anthropic-version` = `2023-06-01`
  - `content-type` = `application/json`
- **Body type:** Raw
- **Body content:** *(paste this exactly — replace the URL placeholder)*

```json
{
  "model": "claude-opus-4-6",
  "max_tokens": 2000,
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "image",
          "source": {
            "type": "url",
            "url": "{{6.url}}"
          }
        },
        {
          "type": "text",
          "text": "Analyze this digital product listing screenshot and return a JSON object with this exact structure:\n\n{\"design_dna\": {\"primary_color_hex\": \"#XXXXXX\", \"secondary_color_hex\": \"#XXXXXX\", \"accent_color_hex\": \"#XXXXXX\", \"background_color_hex\": \"#XXXXXX\", \"font_style\": \"one of: Serif, Sans-Serif, Script, Display, Monospace\", \"font_name_guess\": \"font name or Unknown\", \"overall_aesthetic\": \"one of: Minimalist, Playful, Professional, Rustic, Luxurious, Vintage, Modern, Bohemian\", \"layout_style\": \"one of: Grid, Single Column, Spread Layout, Hero Image, Collage\", \"visual_complexity\": \"one of: Simple, Moderate, Complex, Very Complex\", \"mockup_style\": \"one of: Flat Lay, Device Mockup, Lifestyle, Digital Preview, Hand-held, No Mockup\", \"color_palette_notes\": \"2 sentences about the color choices\", \"typography_notes\": \"1 sentence about fonts\", \"overall_design_notes\": \"3 sentences about the design approach and effectiveness\", \"design_inspiration_score\": 1}, \"technical_specs\": {\"interactivity_level\": \"one of: Static PDF, Static Image, Clickable Links, Interactive Form, Fillable Fields, Fully Interactive\", \"estimated_creation_tool\": \"one of: Canva, Adobe Illustrator, Photoshop, Google Slides, PowerPoint, Figma, Procreate, InDesign, Microsoft Word, Unknown\", \"secondary_tool_guess\": \"tool name or null\", \"file_format\": \"one of: PDF, PNG/JPG, SVG, ZIP Bundle, DOCX, PPTX, XLSX, Notion Template, Other\", \"technical_complexity\": \"one of: Beginner, Intermediate, Advanced, Expert\", \"canva_replicable\": true, \"replication_difficulty\": \"one of: Very Easy, Easy, Moderate, Difficult, Very Difficult\", \"ai_confidence\": \"one of: High, Medium, Low\", \"tech_stack_notes\": \"1 sentence on technical approach\", \"interactivity_notes\": \"1 sentence on interactive elements or null\", \"full_analysis_summary\": \"2-3 sentence comprehensive summary\"}}\n\nFor hex colors: sample the actual dominant colors visible in the image. Return ONLY the JSON object, no other text."
        }
      ]
    }
  ]
}
```

- **Parse response:** Yes

---

### Module 8 — JSON: Parse Claude Response

Click **+** → search **JSON → Parse JSON**:
- **JSON String:** `{{7.content[].text}}`

*(This extracts the JSON object Claude returned)*

---

### Module 9 — Airtable: Create Daily Top 10 Record

Click **+** → search **Airtable → Create a Record**:
- **Connection:** Add your Airtable API key ([airtable.com/create/tokens](https://airtable.com/create/tokens))
- **Base:** Digital Product Research Hub
- **Table:** 📊 Daily Top 10

**Field mappings:**
| Airtable Field | Make.com Value |
|---|---|
| Product Name | `{{5.productName}}` |
| Platform | `Etsy` *(type it directly)* |
| Daily Rank | `{{5.position}}` or iterator index |
| Run Date | `{{now}}` |
| Product URL | `{{5.productUrl}}` |
| Price | `{{5.price}}` |
| Seller Name | `{{5.sellerName}}` |
| Review Count | `{{5.reviewCount}}` |
| Screenshot | `[{"url": "{{6.url}}"}]` |
| Analysis Status | `Analyzed` |

---

### Module 10 — Airtable: Create Design DNA Record

Click **+** → search **Airtable → Create a Record**:
- **Base:** Digital Product Research Hub
- **Table:** 🎨 Design DNA

**Field mappings:**
| Airtable Field | Make.com Value |
|---|---|
| Analysis ID | `DNA-{{formatDate(now; "YYYYMMDD")}}-{{5.position}}` |
| Primary Color HEX | `{{8.design_dna.primary_color_hex}}` |
| Secondary Color HEX | `{{8.design_dna.secondary_color_hex}}` |
| Accent Color HEX | `{{8.design_dna.accent_color_hex}}` |
| Background Color HEX | `{{8.design_dna.background_color_hex}}` |
| Font Style | `{{8.design_dna.font_style}}` |
| Font Name Guess | `{{8.design_dna.font_name_guess}}` |
| Overall Aesthetic | `{{8.design_dna.overall_aesthetic}}` |
| Layout Style | `{{8.design_dna.layout_style}}` |
| Visual Complexity | `{{8.design_dna.visual_complexity}}` |
| Mockup Style | `{{8.design_dna.mockup_style}}` |
| Color Palette Notes | `{{8.design_dna.color_palette_notes}}` |
| Typography Notes | `{{8.design_dna.typography_notes}}` |
| Overall Design Notes | `{{8.design_dna.overall_design_notes}}` |
| Design Inspiration Score | `{{8.design_dna.design_inspiration_score}}` |
| Daily Top 10 | `[{"id": "{{9.id}}"}]` *(links to the record just created in Module 9)* |

---

### Module 11 — Airtable: Create Technical Specs Record

Click **+** → search **Airtable → Create a Record**:
- **Base:** Digital Product Research Hub
- **Table:** ⚙️ Technical Specs

**Field mappings:**
| Airtable Field | Make.com Value |
|---|---|
| Spec ID | `SPEC-{{formatDate(now; "YYYYMMDD")}}-{{5.position}}` |
| Interactivity Level | `{{8.technical_specs.interactivity_level}}` |
| Estimated Creation Tool | `{{8.technical_specs.estimated_creation_tool}}` |
| Secondary Tool Guess | `{{8.technical_specs.secondary_tool_guess}}` |
| File Format | `{{8.technical_specs.file_format}}` |
| Technical Complexity | `{{8.technical_specs.technical_complexity}}` |
| Canva Replicable | `{{8.technical_specs.canva_replicable}}` |
| Replication Difficulty | `{{8.technical_specs.replication_difficulty}}` |
| AI Confidence | `{{8.technical_specs.ai_confidence}}` |
| Tech Stack Notes | `{{8.technical_specs.tech_stack_notes}}` |
| Interactivity Notes | `{{8.technical_specs.interactivity_notes}}` |
| Full AI Response | `{{7.content[].text}}` *(raw Claude response for reference)* |
| Daily Top 10 | `[{"id": "{{9.id}}"}]` |

---

## Step 4: Set the Daily Schedule

In your scenario, click the **clock icon** (scheduling):
- **Type:** At regular intervals
- **Interval:** Every **1440 minutes** (= 24 hours)
- **Start time:** Set tomorrow at 8:00 AM your time

To run immediately for a test: click **Run once** (the triangle play button).

---

## Step 5: Test the Full Flow

1. Click **Run once** in Make.com
2. Watch each module turn green as it executes
3. If any module shows red:
   - Click it to see the error
   - Most common: wrong field name from Browse AI → check the actual JSON output and adjust mappings
4. After a successful run, go to Airtable and verify records appeared in all 3 tables
5. Check that Design DNA and Technical Specs records are linked to the Daily Top 10 record

---

## Step 6: Activate the Scenario

Once your test run succeeds:
1. Click the **On/Off toggle** in the top left of the scenario editor
2. The scenario turns green — it's live!
3. It will run every 24 hours automatically

---

## Step 7: Set Up the Mood Board View 🎨

This turns your Daily Top 10 into a visual Pinterest-style catalog of the internet's best-selling products.

### In Airtable → 📊 Daily Top 10 table:

1. Click **+ Add a view** (left sidebar) → choose **Gallery**
2. Name it: **🖼️ Mood Board**
3. Click **Customize cards** (top right):
   - Set **Cover image** → `Screenshot` field
   - Show these fields on each card:
     - ✅ Color Preview
     - ✅ Aesthetic Style
     - ✅ Price
     - ✅ Platform
     - ✅ Daily Rank
   - Hide everything else
4. Set card size to **Large** for max visual impact

**Result:** A scrollable gallery of product screenshots with their color palette and aesthetic tag right below each image — like a curated lookbook of what's actually selling.

---

## The Claude Vision Prompt (Two Versions)

### ✅ Quick Version (use this for speed + simplicity)

Paste into Module 7 as the text content:

```
Analyze this product screenshot.
1. Identify the 2 main brand HEX colors.
2. Identify the font style (Serif, Sans-Serif, Monospace).
3. Based on the UI, guess if this was made in Canva, Figma, or custom code.
4. Rate its interactivity from 1 (Static PDF) to 5 (Full Web App).

Return ONLY this JSON:
{
  "color_preview": "#XXXXXX + #XXXXXX",
  "primary_color_hex": "#XXXXXX",
  "secondary_color_hex": "#XXXXXX",
  "font_style": "Serif | Sans-Serif | Monospace",
  "estimated_creation_tool": "Canva | Figma | Custom Code | Other",
  "interactivity_score": 1,
  "aesthetic_style": "Minimalist | Playful | Professional | Rustic | Luxurious | Vintage | Modern | Bohemian"
}
```

**Make.com mappings for the Quick Version** (Module 9 — Daily Top 10):
| Field | Value |
|---|---|
| Color Preview | `{{8.color_preview}}` |
| Aesthetic Style | `{{8.aesthetic_style}}` |

And in Module 10 (Design DNA):
| Field | Value |
|---|---|
| Primary Color HEX | `{{8.primary_color_hex}}` |
| Secondary Color HEX | `{{8.secondary_color_hex}}` |
| Font Style | `{{8.font_style}}` |
| Estimated Creation Tool | `{{8.estimated_creation_tool}}` |

### 📋 Deep Version (use for full Design DNA + Technical Specs analysis)

This is the full prompt in the main Module 7 section above. Use when you want all fields in Design DNA and Technical Specs populated with rich detail.

---

## Your Browse AI Robots (Quick Reference)

| Robot | Robot ID | Scrapes |
|---|---|---|
| Etsy Bestselling Items List | `019dfb68-5e65-7477-b468-71fead2cd0b3` | `etsy.com/featured/etsy-top-sellers` |
| Gumroad Bestsellers List | `019dfb1a-1f77-764a-9c0d-590aa9599f10` | `gumroad.com/discover` (bestsellers) |

To edit or re-train a robot: go to [dashboard.browse.ai](https://dashboard.browse.ai) → Robots → click the robot name.

## Adjusting What Gets Scraped

To add a new platform, build a new robot in Browse AI using your Chrome extension (the same way you built the Etsy and Gumroad ones), then add its Robot ID as a new HTTP module in Make.com.

| Platform | Good Start URL |
|---|---|
| Etsy (any niche) | `https://www.etsy.com/featured/etsy-top-sellers` |
| Gumroad | `https://gumroad.com/discover?sort=most_popular` |
| Creative Market | `https://creativemarket.com/graphics?sort=sales` |
| Teachers Pay Teachers | `https://www.teacherspayteachers.com/Browse/Price-Range/Free/Type-of-Resource/Internet-Activities` |

---

## Cost Summary

| Service | Free Tier | Paid Option |
|---|---|---|
| Browse AI | 50 runs/month free | $49/mo for unlimited |
| ScreenshotOne | 100 screenshots/month | $19/mo for 10,000 |
| Anthropic Claude | $5 credit to start | ~$0.015 per analysis |
| Make.com | 1,000 ops/month | $10.59/mo Core (10,000 ops) |

**Estimated cost on paid plans: ~$30–$40/month** for daily runs on all platforms.  
**On free plans (weekly runs, 1 platform):** $0 except minor Anthropic usage (~$0.15/month).

---

## Troubleshooting

**Browse AI returns empty results**
- Re-record your robot — Etsy updates its page structure frequently
- Try clicking fewer fields during recording; simpler robots are more reliable

**ScreenshotOne returns a broken image**
- Some Etsy pages have bot protection — try adding `&delay=2000` to add a 2-second wait

**Claude returns invalid JSON**
- Add a JSON Parse error handler in Make.com (right-click module → Add error handler → Resume)
- Claude sometimes wraps the JSON in markdown code fences — add a Text Replace module to strip ` ```json ` and ` ``` ` before parsing

**Airtable field not found**
- Field names are case-sensitive in Airtable's API — check exact spelling matches

**Make.com hits operation limit**
- Change the interval from 1440 (daily) to 10080 (weekly = 7 days × 1440 minutes)

---

## Your Airtable Table IDs (for reference)

| Table | ID |
|---|---|
| 🛒 Products | in base app2KO2E9wPVRAahe |
| 📊 Daily Top 10 | tblS7h0xPdO9hvsCe |
| 🎨 Design DNA | tbl5RH69sIchh48HD |
| ⚙️ Technical Specs | tblk9UGfvPJRXac9Y |

**Make.com Scenario ID:** 4964200  
**Make.com Team:** My Team (2162408)

## Browse AI Robot IDs (do not lose these!)

| Robot | ID |
|---|---|
| Etsy Bestselling Items List | `019dfb68-5e65-7477-b468-71fead2cd0b3` |
| Gumroad Bestsellers List | `019dfb1a-1f77-764a-9c0d-590aa9599f10` |

---

*Automation built with Claude × Make.com × Airtable MCP — May 2026*
