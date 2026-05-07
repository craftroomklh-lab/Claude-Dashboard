// Airtable Automation — "Approve → Publish to Etsy" — Run Script action
// Paste into the Run Script step. Configure inputs in the left panel.
//
// REQUIRED INPUTS (left-panel "Add input variable"):
//   product            → record from trigger (Products)
//   systemConfig       → record from "Find SystemConfig" step
//   mockups            → records from "Find Mockups" step (3 rows)
//   niche              → linked record from product.Niche
//   master             → linked record from product.MasterTemplateUsed
//   signal             → linked record from product.SourceSignal

const { product, systemConfig, mockups, niche, master, signal } = input.config();

function fail(reason, alsoUncheckApprove = false) {
  output.set("status", "halted");
  output.set("reason", reason);
  return { uncheck: alsoUncheckApprove };
}

// 1. SystemConfig gate ————————————————————————————————————————————————
const insuranceOK =
  systemConfig.InsuranceBoundUntil &&
  new Date(systemConfig.InsuranceBoundUntil) >= new Date();

const gateOK =
  systemConfig.MasterEnabled &&
  systemConfig.LegalEntityConfirmed &&
  insuranceOK &&
  systemConfig.EtsyShopOwnerType === "business" &&
  !!systemConfig.DisclosureApprovedAt;

if (!gateOK) {
  return fail("SystemConfig gate failed; webhook NOT sent", true);
}

// 2. Daily approval cap —————————————————————————————————————————————
const productsTable = base.getTable("Products");
const todayStart = new Date(); todayStart.setUTCHours(0, 0, 0, 0);
const queryToday = await productsTable.selectRecordsAsync({
  fields: ["ApprovedAt", "Status"]
});
const approvedToday = queryToday.records.filter(r => {
  const ts = r.getCellValue("ApprovedAt");
  return ts && new Date(ts) >= todayStart;
}).length;

if (approvedToday >= systemConfig.DailyApprovalsCap) {
  return fail(`Daily cap of ${systemConfig.DailyApprovalsCap} reached`, true);
}

// 3. Disclosure pre-check ————————————————————————————————————————————
if (!product.SEODescription || !product.SEODescription.includes(systemConfig.DisclosureText)) {
  return fail("Disclosure text missing from SEODescription", true);
}

// 4. Parse DeliveryArtifacts ————————————————————————————————————————
let deliveryArtifacts;
try {
  deliveryArtifacts = JSON.parse(product.DeliveryArtifacts);
} catch (e) {
  return fail("DeliveryArtifacts is not valid JSON", false);
}

// 5. Build canonical payload ————————————————————————————————————————
const payload = {
  schema_version: "1.3.0",
  event: "product.approved",
  fired_at: new Date().toISOString(),
  idempotency_key: `${product.id}:${product.LastModified}`,
  approval: {
    product_id: product.id,
    airtable_record_url: `https://airtable.com/${base.id}/${productsTable.id}/${product.id}`,
    approved_at: new Date().toISOString()
  },
  etsy_listing: {
    title: product.SEOTitle,
    description: product.SEODescription,
    price: {
      amount: product.LaunchPrice,
      currency_code: "USD",
      divisor: 100,
      amount_minor_units: Math.round(product.LaunchPrice * 100)
    },
    quantity: 999,
    who_made: "i_did",
    when_made: "2020_2026",
    is_supply: false,
    is_digital: true,
    type: "download",
    state: "active",
    shop_section_name_for_lookup: niche.NicheName,
    taxonomy: { taxonomy_id: master.EtsyTaxonomyID },
    tags: product.SEOTags.split(",").map(t => t.trim()).filter(Boolean),
    materials: ["digital file", (product.TargetFormat || "").toLowerCase()].filter(Boolean),
    language: "en",
    processing_min: 0,
    processing_max: 0
  },
  digital_files: deliveryArtifacts.files || [],
  images: mockups
    .slice()
    .sort((a, b) => (a.IsHero ? -1 : b.IsHero ? 1 : 0))
    .map((m, idx) => ({
      rank: idx + 1,
      role: m.Variant,
      mockup_id: m.id,
      source_url: m.ImageURL,
      alt_text: m.AltText,
      width: m.Width,
      height: m.Height,
      perceptual_hash: m.PerceptualHash
    })),
  videos: [],
  variations: [],
  personalization: {
    is_personalizable: false,
    personalization_is_required: false,
    personalization_char_count_max: 0,
    personalization_instructions: ""
  },
  internal_metadata: {
    niche_id: niche.id,
    niche_name: niche.NicheName,
    source_signal_id: signal.id,
    master_template_id: master.id,
    target_format: product.TargetFormat,
    is_interactive: !!product.IsInteractive,
    interactive_features: product.InteractiveFeatures || [],
    interactive_method: product.InteractiveMethod || "Static",
    qa_score: product.QAScore,
    qa_verdict: product.QAVerdict,
    market_avg_price: product.MarketAvgPrice,
    launch_price: product.LaunchPrice
  },
  callbacks: {
    success_url: systemConfig.WebhookSuccessURL,
    failure_url: systemConfig.WebhookFailureURL,
    callback_auth_header: "X-DPF-Auth"
  }
};

const bodyString = JSON.stringify(payload);

// 6. HMAC-SHA256 sign ————————————————————————————————————————————————
async function hmacSha256Hex(message, key) {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw", enc.encode(key),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, "0")).join("");
}
const signature = await hmacSha256Hex(bodyString, systemConfig.WebhookSharedSecret);

// 7. Send to Make.com ————————————————————————————————————————————————
const response = await fetch(systemConfig.MakeWebhookURL_Distribution, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-DPF-Auth": systemConfig.WebhookSharedSecret,
    "X-DPF-Signature": `sha256=${signature}`,
    "Idempotency-Key": payload.idempotency_key
  },
  body: bodyString
});

if (!response.ok) {
  const errText = (await response.text()).slice(0, 500);
  await productsTable.updateRecordAsync(product.id, {
    Status: { name: "QA_Failed" },
    RejectionReason: `Webhook send failed: HTTP ${response.status} — ${errText}`,
    Approve: false
  });
  output.set("status", "webhook_failed");
  output.set("reason", `HTTP ${response.status}: ${errText}`);
  return;
}

await productsTable.updateRecordAsync(product.id, {
  Status: { name: "Approved" },
  ApprovedAt: new Date().toISOString()
});

output.set("status", "webhook_sent");
output.set("payload_size_bytes", bodyString.length);
