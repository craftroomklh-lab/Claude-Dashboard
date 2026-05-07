# Helper Services

Two production services that the Airtable + Make.com architecture depends on. Both are stateless, internal, and Bearer-token gated.

| Service | Purpose | Risk control |
|---|---|---|
| `vdedup-svc` | Perceptual-hash de-duplication | R01 (Etsy duplicate-listing) + R02 (IP infringement) |
| `signing-svc` | HMAC-SHA256 webhook signature verification | R15 (forged Approve webhook) |

Both are written for portability:
- `signing-svc` ships as a Cloudflare Worker (cheapest; no cold start)
- `vdedup-svc` ships as a Node/Express container (sharp + DCT need a real runtime)

## Cost & sizing

| Service | Expected QPS | Recommended host | Approx monthly |
|---|---|---|---|
| `signing-svc` | <50/day | Cloudflare Workers free tier | $0 |
| `vdedup-svc` | <500/day | Fly.io shared 256MB | ~$5 |

## Pre-go-live checklist

- [ ] `signing-svc` deployed; `/health` returns 200
- [ ] `vdedup-svc` deployed; `/health` returns 200
- [ ] `INTERNAL_TOKEN` matches values stored in `.env` and Make.com Connections
- [ ] `DPF_WEBHOOK_SHARED_SECRET_CURRENT` matches `SystemConfig.WebhookSharedSecret`
- [ ] End-to-end test: forged signature → 401; valid signature → publish proceeds
- [ ] End-to-end test: identical mockup re-injected → B16.5 rejects → Status=QA_Failed
