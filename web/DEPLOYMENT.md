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

No environment variables, database, or admin credentials required. All content is in `src/config/default-site-config.ts`.

### Verify build

Build log should show `Compiled successfully` and route `/`.
