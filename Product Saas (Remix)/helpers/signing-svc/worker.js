// signing-svc — HMAC-SHA256 webhook signature verifier
// Deploy: Cloudflare Workers (wrangler deploy) or Node/Express
//
// Env vars:
//   DPF_WEBHOOK_SHARED_SECRET_CURRENT  (required)
//   DPF_WEBHOOK_SHARED_SECRET_PREVIOUS (optional, for rotation grace window)
//   INTERNAL_TOKEN                     (Bearer token gating /verify)

export default {
  async fetch(request, env) {
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });

    const url = new URL(request.url);
    const auth = request.headers.get("authorization") || "";
    if (auth !== `Bearer ${env.INTERNAL_TOKEN}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (url.pathname === "/verify") return await verify(request, env);
    if (url.pathname === "/sign")   return await sign(request, env);
    if (url.pathname === "/health") return new Response("ok", { status: 200 });
    return new Response("Not found", { status: 404 });
  }
};

async function verify(request, env) {
  let body;
  try { body = await request.json(); }
  catch { return json({ verified: false, error: "bad_request_body" }, 400); }

  const { header_signature, body: payloadString } = body;
  if (!header_signature || typeof payloadString !== "string") {
    return json({ verified: false, error: "missing_fields" }, 400);
  }

  const provided = header_signature.startsWith("sha256=")
    ? header_signature.slice(7) : header_signature;

  // Try current secret, then previous (180-day rotation grace)
  const secrets = [env.DPF_WEBHOOK_SHARED_SECRET_CURRENT];
  if (env.DPF_WEBHOOK_SHARED_SECRET_PREVIOUS) {
    secrets.push(env.DPF_WEBHOOK_SHARED_SECRET_PREVIOUS);
  }

  for (let i = 0; i < secrets.length; i++) {
    const expected = await hmacSha256Hex(payloadString, secrets[i]);
    if (constantTimeEqual(expected, provided)) {
      return json({
        verified: true,
        used_secret_age: i === 0 ? "current" : "previous"
      });
    }
  }

  return json({ verified: false, error: "signature_mismatch" });
}

async function sign(request, env) {
  const { body: payloadString } = await request.json();
  const sig = await hmacSha256Hex(payloadString, env.DPF_WEBHOOK_SHARED_SECRET_CURRENT);
  return json({ signature: `sha256=${sig}` });
}

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

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status, headers: { "content-type": "application/json" }
  });
}
