# Fedrick Region

Static recruiting landing page for **Fedrick Region** / **MedaHealth** (Fort Laureate office). Next.js App Router, blue gradient theme.

## Quick start

```bash
npm install
npm run dev
```

Site: [http://localhost:3000](http://localhost:3000)

## Edit content

All copy lives in **[`src/config/default-site-config.ts`](./src/config/default-site-config.ts)**. Change text, stats, team, FAQ, image URLs, and video embed there, then redeploy.

Optional env overrides (see [`.env.example`](./.env.example)):

- `NEXT_PUBLIC_VIDEO_EMBED_SRC`
- `NEXT_PUBLIC_COUNTDOWN_TARGET`

## Deploy on Vercel

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** if you get **404 NOT_FOUND**.

1. Import [github.com/SamuelPetrucci/fedrickReigion](https://github.com/SamuelPetrucci/fedrickReigion)
2. **Root Directory:** `web`
3. **Framework:** Next.js
4. **Output Directory:** leave empty

```bash
npm run build
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
