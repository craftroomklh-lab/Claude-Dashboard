# Digital Product Research Hub — Airtable Complete Guide

Your base is **live in Airtable** at: [airtable.com](https://airtable.com) → *Digital Product Research Hub*

This guide covers everything: formulas to add manually, views to create, automations, interfaces, and tips for scaling your research over time.

---

## Base Overview

7 tables, fully relational:

```
🛒 Products  ←→  👤 Sellers
     ↕               ↕
🏷️ Niches   ←→  🌐 Platforms
     ↕
🔑 Keywords
     ↕
📋 Research Logs
     ↕
💡 My Ideas
```

**Products** is the hub — every other table feeds into or out of it.

---

## Step 1: Add Formula Fields (Manual — Airtable UI)

The Airtable API doesn't support creating formula fields, so add these yourself. For each one: open the table → click the **+** to add a field → choose **Formula** → paste the formula.

### 🛒 Products Table

**Field: Est. Monthly Revenue**
```
{Price} * {Est. Monthly Sales}
```
- Field type: Formula → set display as **Currency ($)**
- *This is your single most important signal for market size.*

**Field: Revenue per Review**
```
IF({Review Count} > 0, ({Price} * {Est. Monthly Sales}) / {Review Count}, 0)
```
- Field type: Formula → display as **Currency ($, 2 decimals)**
- *Lower review count + higher revenue = easier market to enter. Higher score = efficient niche.*

**Field: Opportunity Index (auto-score)**
```
IF(
  AND({Price} > 0, {Est. Monthly Sales} > 0, {Opportunity Score} > 0),
  ROUND(
    ({Opportunity Score} * 10) +
    IF({Creation Difficulty} = "Low", 20, IF({Creation Difficulty} = "Medium", 10, 0)) +
    IF({Best Seller Badge}, 10, 0) +
    IF({Avg Rating} >= 4.5, 5, 0),
  0),
  0
)
```
- Field type: Formula → display as **Number (integer)**
- *A composite 0–100 score. Sort by this to surface your best opportunities instantly.*

### 💡 My Ideas Table

**Field: Viability Score**
```
IF(
  AND({Est. Price Point} > 0, {Est. Creation Time (hrs)} > 0),
  ROUND(
    ({Priority} * 15) +
    IF({Creation Difficulty} = "Low", 30, IF({Creation Difficulty} = "Medium", 15, 0)) +
    IF({Est. Monthly Revenue Potential} > 500, 20, IF({Est. Monthly Revenue Potential} > 200, 10, 0)) +
    IF({Est. Creation Time (hrs)} <= 5, 15, IF({Est. Creation Time (hrs)} <= 20, 8, 0)),
  0),
  0
)
```
- Field type: Formula → display as **Number**
- *Sort by this to decide what to create next.*

---

## Step 2: Add Rollup & Count Fields (Manual — Airtable UI)

Add these via: **+ field → Rollup** (choose linked field, then aggregation).

### 🏷️ Niches Table

| Field Name | Linked Field | Aggregation | Display As |
|---|---|---|---|
| # Products Tracked | 🛒 Products | COUNT | Number |
| Avg Opportunity Score | 🛒 Products → Opportunity Score | AVERAGE | Number (1 decimal) |
| Total Est. Revenue (tracked) | 🛒 Products → Est. Monthly Revenue | SUM | Currency ($) |
| Avg Product Price | 🛒 Products → Price | AVERAGE | Currency ($) |

### 👤 Sellers Table

| Field Name | Linked Field | Aggregation | Display As |
|---|---|---|---|
| # Products Tracked | 🛒 Products | COUNT | Number |
| Total Est. Revenue | 🛒 Products → Est. Monthly Revenue | SUM | Currency ($) |

### 🌐 Platforms Table

| Field Name | Linked Field | Aggregation | Display As |
|---|---|---|---|
| # Products Tracked | 🛒 Products | COUNT | Number |
| Avg Product Price | 🛒 Products → Price | AVERAGE | Currency ($) |
| Total Est. Revenue | 🛒 Products → Est. Monthly Revenue | SUM | Currency ($) |

### 🔑 Keywords Table

| Field Name | Linked Field | Aggregation |
|---|---|---|
| # Products Using This | 🛒 Products | COUNT |
| # Ideas Targeting This | 💡 My Ideas | COUNT |

---

## Step 3: Recommended Views

### 🛒 Products Table Views

**1. All Products (Grid) — default**
- Sort: Opportunity Score → descending
- Hidden fields: Notes, Screenshots (unclutter)

**2. 🔥 Top Opportunities (Grid)**
- Filter: Opportunity Score ≥ 7 AND Analysis Status = "Opportunity Found"
- Sort: Est. Monthly Revenue → descending
- Color rows: Opportunity Score (8–10 = green, 5–7 = yellow, ≤4 = red)

**3. By Platform (Gallery)**
- Group by: Platform
- Card cover: Screenshots
- *Great for visual browsing of what sells where*

**4. By Niche (Gallery)**
- Group by: Niche
- Sort: Est. Monthly Revenue → descending

**5. By Product Type (Kanban)**
- Group by: Product Type
- *Drag products between types as you learn more*

**6. Research Pipeline (Grid)**
- Group by: Analysis Status
- Sort by: Date Researched → descending
- *Your research workflow at a glance*

**7. Low-Hanging Fruit (Grid)**
- Filter: Creation Difficulty = "Low" AND Opportunity Score ≥ 6
- Sort: Est. Monthly Revenue → descending
- *Products you could replicate quickly*

**8. Calendar — Research Dates**
- Date field: Date Researched
- *See when you researched what; spot gaps in consistency*

### 💡 My Ideas Table Views

**1. Ideas Pipeline (Kanban)**
- Group by: Idea Status
- *Drag cards as ideas progress through stages*

**2. Priority Board (Grid)**
- Sort: Priority → descending, then Viability Score → descending
- Color rows: Idea Status

**3. Launch Calendar (Calendar)**
- Date field: Target Launch Date
- *Keep yourself accountable*

**4. Quick Wins (Grid)**
- Filter: Creation Difficulty = "Low" AND Priority ≥ 3 AND Idea Status ≠ "✅ Complete"
- *Your action list for when you have a free afternoon*

### 🏷️ Niches Table Views

**1. Niche Scorecard (Grid)**
- Sort: Avg Opportunity Score → descending
- Color rows: Competition Level
- *Your master niche ranking*

**2. Active Niches (Grid)**
- Filter: Niche Status = "Active — Creating" OR "Researching"

**3. Trend Watch (Grid)**
- Filter: Growth Trend = "Rising Fast 🚀" OR "Rising"
- Sort: My Interest Level → descending

### 🌐 Platforms Table Views

**1. Platform Comparison (Grid)**
- Show: Commission %, Monthly Fee, Ease of Setup, Audience Size, Best For, # Products Tracked
- *Side-by-side comparison for deciding where to sell*

**2. My Platforms (Grid)**
- Filter: I Sell Here = checked

### 📋 Research Logs Table Views

**1. Recent Sessions (Grid)**
- Sort: Research Date → descending
- *Your research journal*

**2. By Type (Grid)**
- Group by: Research Type

**3. Session Calendar (Calendar)**
- Date field: Research Date
- *Track your research consistency over time*

---

## Step 4: Conditional Formatting

Set these up in any Grid view via **Views → Conditional coloring**:

### Products Table
- Opportunity Score 8–10 → **Green row**
- Opportunity Score 5–7 → **Yellow row**
- Opportunity Score 1–4 → **Red row**
- Best Seller Badge = true → **Bold** (use color to highlight)
- Creation Difficulty = "Low" → **Teal text** (easy wins)

### My Ideas Table
- Idea Status = "✅ Complete" → **Green row**
- Idea Status = "🛠️ In Progress" → **Blue row**
- Idea Status = "❌ Abandoned" → **Faded/Gray row**
- Priority = 5 → **Red row** (urgent/top priority)

### Niches Table
- Competition Level = "Low" → **Green**
- Competition Level = "Very High" → **Red**
- Growth Trend = "Rising Fast 🚀" → **Bold/Green**

---

## Step 5: Automations to Set Up

In Airtable: **Automations → + New Automation**

### Automation 1: "New Opportunity Alert"
- **Trigger:** When record matches condition in 🛒 Products
  - Condition: Opportunity Score changes to ≥ 8
- **Action:** Send notification (to yourself)
  - Message: "🔥 High opportunity product found: {Product Name} in {Niche} — Est. $${Est. Monthly Revenue}/mo"

### Automation 2: "Auto-set Analysis Status"
- **Trigger:** When record updated in 🛒 Products
  - Condition: Opportunity Score is updated AND not empty
- **Action:** Update record — set Analysis Status to "Analyzed"
  - *(Save you from manually changing status every time)*

### Automation 3: "Research Log Reminder"
- **Trigger:** At scheduled time — every Sunday at 9am
- **Action:** Send email to yourself
  - Subject: "Weekly research reminder — Digital Product Hub"
  - Body: "Time to log new products! Your hub is ready."

### Automation 4: "Idea from Product"
- **Trigger:** When record matches in 🛒 Products
  - Condition: Analysis Status = "Opportunity Found"
- **Action:** Create record in 💡 My Ideas
  - Idea Name: "Idea from: {Product Name}"
  - Inspiration Products: link to triggering record
  - Idea Status: "💭 Idea"
  - *(Automatically seeds your ideas pipeline from your research)*

---

## Step 6: Interface Design

Build an Interface for a clean dashboard (Airtable Interfaces → + New Interface).

### Page 1: 🏠 Research Dashboard
- **Summary numbers bar** (top):
  - Total Products Researched (count from Products)
  - Avg Opportunity Score (avg from Products)
  - Total Ideas in Pipeline (count from My Ideas)
  - Top Niche by Revenue (from Niches, sorted by Total Est. Revenue)
- **Chart:** Bar chart — Est. Monthly Revenue by Product Type
- **Chart:** Bar chart — # Products by Platform
- **Table:** Top 10 Products by Opportunity Score

### Page 2: 💡 My Ideas Pipeline
- **Kanban board** of My Ideas by Idea Status
- **Bar chart:** Ideas by Creation Difficulty
- **Summary:** Total Est. Revenue Potential across all active ideas

### Page 3: 🏷️ Niche Analysis
- **Table:** Niches sorted by Avg Opportunity Score
- **Bar chart:** Competition Level distribution
- **Filter control:** Niche Status

### Page 4: 🔑 Keyword Bank
- **Grid view** of Keywords sorted by Keyword Score
- **Filter controls:** Competition Level, Keyword Type, Search Volume Tier

---

## Step 7: Data Entry Tips & Workflow

### Your Weekly Research Routine

1. **Start a Research Log** — open 📋 Research Logs, create a new record, set the date and Research Type before you start browsing
2. **Add products as you find them** — fill in at minimum: Product Name, Platform, Price, Product Type, and a rough Est. Monthly Sales
3. **Link each product to its Niche and Seller** — these links power your rollup stats
4. **Score every product** — set Opportunity Score and Creation Difficulty before moving on
5. **Fill in Strengths / Weaknesses / My Differentiation Idea** — these are the most valuable fields for actual product creation
6. **Close the Research Log** — add Key Findings and Opportunities Identified to your session record

### Estimating Monthly Sales (without paid tools)
- **Etsy:** Use eRank (free tier) or Marmalead. If unavailable, estimate: (Review Count / Months Listed) × 4. Reviews are typically ~5–10% of sales.
- **Gumroad:** Not publicly visible — use SocialBlade or estimate from creator's following
- **Amazon KDP:** Use Publisher Rocket or DS Amazon Quick View extension
- **Creative Market:** Their "X sales" badge is public — divide by months listed

### Fields to Prioritize (fill these first)
1. Price
2. Est. Monthly Sales → drives the Est. Monthly Revenue formula
3. Opportunity Score
4. Creation Difficulty
5. Weaknesses / Gaps → this is your gold for differentiation

### Scaling Tips
- **Add 10–20 products before drawing conclusions** about any single niche
- **Review your Niches table monthly** — update Competition Level and Growth Trend based on what you're seeing
- **Archive passed products** — use a view filter (Analysis Status = "Passed") instead of deleting, so you can revisit later
- **Use the Keywords table as a swipe file** — every time you see a keyword performing well in a listing title, log it
- **Duplicate products into My Ideas** — when you find an Opportunity Found product, trigger Automation 4 (above) to pre-populate your idea

---

## Table Relationship Map (Quick Reference)

```
🛒 Products
  ├── linked to → 🌐 Platforms (1 platform per product)
  ├── linked to → 👤 Sellers (who made it)
  ├── linked to → 🏷️ Niches (what category it's in)
  ├── linked to → 🔑 Keywords (what keywords it ranks for)
  ├── linked to → 📋 Research Logs (when you found it)
  └── reverse link ← 💡 My Ideas (what ideas it inspired)

🏷️ Niches
  ├── reverse link ← 🛒 Products (all products in niche)
  ├── reverse link ← 🔑 Keywords (keywords for this niche)
  ├── reverse link ← 💡 My Ideas (ideas targeting this niche)
  └── reverse link ← 📋 Research Logs (sessions on this niche)

🌐 Platforms
  ├── reverse link ← 🛒 Products
  ├── reverse link ← 👤 Sellers
  ├── reverse link ← 💡 My Ideas
  └── reverse link ← 📋 Research Logs
```

---

## Pre-Populated Platform Records to Add

Open 🌐 Platforms and add these to start:

| Platform | Type | Commission % | Audience | Best For |
|---|---|---|---|---|
| Etsy | Marketplace | 6.5% + $0.20 listing | Massive | Printables, SVGs, Planners, Clip Art |
| Gumroad | Creator Platform | 10% | Large | Ebooks, Templates, Courses, Presets |
| Amazon KDP | Marketplace | 30–65% royalty | Massive | Ebooks, Low-content books |
| Creative Market | Marketplace | 30% | Large | Graphics, Fonts, Templates |
| Teachers Pay Teachers | Marketplace | 20–25% | Large | Teacher printables, lesson plans |
| Payhip | Creator Platform | 5% | Medium | Ebooks, Courses, Templates |
| Teachable | Course Platform | 5% | Medium | Online courses |
| Design Bundles | Marketplace | 40% | Large | SVG, Graphics, Fonts |
| Envato Elements | Marketplace | Revenue share | Massive | Stock graphics, templates |

---

## Quick-Start: Your First 5 Records

To hit the ground running, add these products immediately:

1. Search Etsy for "budget planner" → add the #1 result (most reviews)
2. Search Etsy for "Notion template" → add the top seller
3. Go to Gumroad Discover → filter by top-selling ebooks → add 1 record
4. Search Creative Market for "social media template" → add a bestseller
5. Go to Amazon KDP → search "habit tracker journal" → add the #1 result

These 5 records will let you test every formula and start seeing patterns immediately.

---

*Base built with Claude × Airtable MCP — May 2026*
