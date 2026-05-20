# Vercel deployment checklist (fixes 404 NOT_FOUND)

## Correct project settings

Repo: **https://github.com/SamuelPetrucci/fedrickReigion**  
Branch: **`main`**

| Setting | Value |
|---------|--------|
| **Root Directory** | **`web`** (app lives in the `web/` folder) |
| **Framework Preset** | Next.js |
| **Build Command** | `npm run build` (default) |
| **Output Directory** | **Leave empty** (Next.js sets this automatically) |
| **Install Command** | `npm install` (default) |

### Common mistake → 404 NOT_FOUND

| Root Directory | Result |
|----------------|--------|
| **`web`** | Correct (matches this repo layout) |
| **empty** | Wrong — Vercel builds repo root (no `package.json`) → **404 NOT_FOUND** |
| **`web/web`** | Wrong — double path → **404** |

If you previously connected when the app was at the repo root only, you had to leave Root Directory empty. This repo now uses a **`web/`** folder so local disk and GitHub match — set Root Directory to **`web`**.

## After changing settings

1. Save settings.
2. **Deployments** → **Redeploy** (use “Clear cache and redeploy” if available).
3. Open the URL shown on the **latest successful** deployment (green check), not an old preview link.

## Environment variables (optional for first load)

The site works without Redis (uses default content). For admin:

- `ADMIN_PASSWORD`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Missing Redis does **not** cause 404.

## Verify build succeeded

Open deployment → **Building** logs. You should see:

- `Compiled successfully`
- Route `/` listed

If the build failed, fix logs first — a failed deploy often shows platform **NOT_FOUND**.
