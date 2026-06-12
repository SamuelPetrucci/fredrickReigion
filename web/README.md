# Fedrick Region

Static recruiting landing page for **Fedrick Region** / **MedaHealth** (Fort Lauderdale office). Next.js App Router, blue gradient theme.

## Quick start

```bash
npm install
npm run dev
```

Site: [http://localhost:3000](http://localhost:3000)

## Edit content

All copy lives in **[`src/config/default-site-config.ts`](./src/config/default-site-config.ts)**. Change text, stats, team, FAQ, and image URLs there, then redeploy.

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
