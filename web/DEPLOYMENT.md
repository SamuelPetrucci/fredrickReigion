# Vercel deployment checklist

Repo: **https://github.com/SamuelPetrucci/fedrickReigion**  
Branch: **`main`**

| Setting | Value |
|---------|--------|
| **Root Directory** | **`web`** |
| **Framework Preset** | Next.js |
| **Build Command** | `npm run build` (default) |
| **Output Directory** | **Leave empty** |
| **Install Command** | `npm install` (default) |

### 404 NOT_FOUND

| Root Directory | Result |
|----------------|--------|
| **`web`** | Correct |
| **empty** | Wrong — no `package.json` at repo root |
| **`web/web`** | Wrong |

After fixing settings: **Deployments → Redeploy**.

### Environment variables (optional)

Only needed if you prefer env over editing `default-site-config.ts`:

- `NEXT_PUBLIC_VIDEO_EMBED_SRC`
- `NEXT_PUBLIC_COUNTDOWN_TARGET`

No database or admin credentials required.

### Verify build

Build log should show `Compiled successfully` and route `/`.
