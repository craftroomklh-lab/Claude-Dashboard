# vdedup-svc

Perceptual-hash de-duplication service. Enforces R01 (Etsy duplicate-listing risk) and R02 (IP infringement) at Module B16.5 of Scenario B.

## Endpoints

- `POST /hash` — `{image_url}` → `{hash}` (used by B14.5 to record hash on every Mockup)
- `POST /compare` — `{candidate_image_url, comparison_set:[{label,url|hash}], threshold}` → `{decision, max_similarity, max_match_label, all_scores}`
- `GET /health`

All require `Authorization: Bearer ${INTERNAL_TOKEN}`.

## Algorithm

DCT-based pHash, 64-bit, hex-encoded. Similarity = `1 - (hamming_distance / 64)`. Two threshold call sites:

| Comparison | Threshold | Rationale |
|---|---|---|
| Candidate vs source listing | 0.75 (stricter) | IP risk — derivative-work test |
| Candidate vs shop history | 0.85 | Etsy "duplicate listing" ToS |

## Deploy (Docker)

```
docker build -t vdedup-svc .
docker run -p 8787:8787 -e INTERNAL_TOKEN=... vdedup-svc
```

Or push to Fly.io / Cloud Run / your container host of choice. Set `INTERNAL_TOKEN` to match `VDEDUP_INTERNAL_TOKEN` in `.env`.

## Performance

Latency target: <500ms per comparison on a 1024×1024 image. The 32×32 DCT is the bottleneck; for higher throughput swap to a native pHash library (`imagehash` Python or `sharp-phash`).
