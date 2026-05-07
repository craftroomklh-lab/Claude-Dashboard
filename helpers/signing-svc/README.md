# signing-svc

HMAC-SHA256 verifier for the Approve webhook (R15 mitigation).

## Endpoints

- `POST /verify` — `{header_signature, body}` → `{verified, used_secret_age}`
- `POST /sign` — `{body}` → `{signature}` (used by Airtable Run Script during rotation testing)
- `GET /health`

All endpoints require `Authorization: Bearer ${INTERNAL_TOKEN}`.

## Deploy

```
cd helpers/signing-svc
wrangler secret put DPF_WEBHOOK_SHARED_SECRET_CURRENT
wrangler secret put INTERNAL_TOKEN
wrangler deploy
```

## Rotation

180-day cadence per runbook. During rotation:
1. `wrangler secret put DPF_WEBHOOK_SHARED_SECRET_PREVIOUS` (= old current)
2. `wrangler secret put DPF_WEBHOOK_SHARED_SECRET_CURRENT` (= new value)
3. Update Airtable `SystemConfig.WebhookSharedSecret` to new value
4. After 24h grace: `wrangler secret delete DPF_WEBHOOK_SHARED_SECRET_PREVIOUS`
