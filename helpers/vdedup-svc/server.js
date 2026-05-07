// vdedup-svc — perceptual-hash de-duplication service (R01/R02 mitigation)
// Node 20+ / Cloudflare Workers with Images binding (or run on Lambda + sharp).
// This implementation uses the `sharp` + custom pHash route for portability.
//
// Endpoints:
//   POST /hash    { image_url } → { hash }
//   POST /compare { candidate_image_url, comparison_set, threshold } → { decision, max_similarity, ... }
//   GET  /health

import express from "express";
import sharp from "sharp";

const app = express();
app.use(express.json({ limit: "2mb" }));

// ───── auth middleware ─────────────────────────────────────────────────
app.use((req, res, next) => {
  if (req.path === "/health") return next();
  if (req.headers.authorization !== `Bearer ${process.env.INTERNAL_TOKEN}`) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
});

// ───── perceptual hash (DCT-based pHash, 64-bit) ────────────────────────
async function perceptualHash(imageUrl) {
  const resp = await fetch(imageUrl);
  if (!resp.ok) throw new Error(`fetch_failed_${resp.status}`);
  const buf = Buffer.from(await resp.arrayBuffer());

  // Resize to 32×32 grayscale, get raw luminance values
  const { data } = await sharp(buf)
    .grayscale()
    .resize(32, 32, { fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Array.from(data);
  // 2D DCT, keep top-left 8×8 (excluding DC)
  const dct = dct2d(pixels, 32);
  const lowFreq = [];
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    if (x === 0 && y === 0) continue;
    lowFreq.push(dct[y * 32 + x]);
  }
  const median = [...lowFreq].sort((a, b) => a - b)[Math.floor(lowFreq.length / 2)];
  let bits = "";
  for (const v of lowFreq) bits += (v > median ? "1" : "0");
  // Pad to 64 (we have 63 from skipping DC)
  bits = bits + "0";

  // Convert to hex
  let hex = "";
  for (let i = 0; i < 64; i += 4) {
    hex += parseInt(bits.slice(i, i + 4), 2).toString(16);
  }
  return hex;
}

function dct2d(pixels, N) {
  // Naive O(N^4) — fine for N=32
  const out = new Array(N * N).fill(0);
  for (let u = 0; u < N; u++) {
    for (let v = 0; v < N; v++) {
      let sum = 0;
      for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
          sum += pixels[y * N + x]
               * Math.cos(((2 * x + 1) * u * Math.PI) / (2 * N))
               * Math.cos(((2 * y + 1) * v * Math.PI) / (2 * N));
        }
      }
      const cu = u === 0 ? 1 / Math.sqrt(2) : 1;
      const cv = v === 0 ? 1 / Math.sqrt(2) : 1;
      out[v * N + u] = 0.25 * cu * cv * sum;
    }
  }
  return out;
}

function hammingDistance(hex1, hex2) {
  if (hex1.length !== hex2.length) return Infinity;
  let dist = 0;
  for (let i = 0; i < hex1.length; i++) {
    let xor = parseInt(hex1[i], 16) ^ parseInt(hex2[i], 16);
    while (xor) { dist += xor & 1; xor >>= 1; }
  }
  return dist;
}

function similarity(hex1, hex2) {
  return 1 - (hammingDistance(hex1, hex2) / 64);
}

// ───── routes ───────────────────────────────────────────────────────────
app.get("/health", (_, res) => res.json({ ok: true }));

app.post("/hash", async (req, res) => {
  try {
    const hash = await perceptualHash(req.body.image_url);
    res.json({ hash });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/compare", async (req, res) => {
  const { candidate_image_url, comparison_set, threshold = 0.85 } = req.body;
  try {
    const candidateHash = await perceptualHash(candidate_image_url);
    const scores = [];
    for (const item of comparison_set) {
      const itemHash = item.hash || await perceptualHash(item.url);
      scores.push({ label: item.label, score: similarity(candidateHash, itemHash) });
    }
    scores.sort((a, b) => b.score - a.score);
    const max = scores[0] || { label: null, score: 0 };
    res.json({
      candidate_hash: candidateHash,
      max_similarity: Number(max.score.toFixed(4)),
      max_match_label: max.label,
      decision: max.score >= threshold ? "reject" : "pass",
      threshold,
      all_scores: scores.map(s => ({ ...s, score: Number(s.score.toFixed(4)) }))
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`vdedup-svc on :${PORT}`));
