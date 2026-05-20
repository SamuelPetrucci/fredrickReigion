# Fedrick Region

Recruiting landing page for **Fedrick Region** / **MedaHealth** (Fort Laureate office). Built with Next.js, editable via `/admin` with Upstash Redis and optional Vercel Blob uploads.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin) (requires `ADMIN_PASSWORD` + Redis)

## Deploy on Vercel

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** if you get **404 NOT_FOUND** (usually wrong Root Directory).

1. Import [github.com/SamuelPetrucci/fedrickReigion](https://github.com/SamuelPetrucci/fedrickReigion) — set Vercel **Root Directory** to **`web`**.
2. Add **Upstash Redis** from the Vercel Marketplace (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`).
3. Set **`ADMIN_PASSWORD`** (long random string).
4. Optional: **`BLOB_READ_WRITE_TOKEN`** for file uploads in admin.
5. Optional: `NEXT_PUBLIC_VIDEO_EMBED_SRC`, `NEXT_PUBLIC_COUNTDOWN_TARGET` — see [`.env.example`](./.env.example).

```bash
npm run build
```

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Local development        |
| `npm run build`| Production build         |
| `npm run start`| Run production server    |
| `npm run lint` | ESLint                   |

## Content

- Defaults: `src/config/default-site-config.ts`
- Saved live content: Redis key `fredrick:site:v1` (via admin save)
- Schema: `src/config/site-config-schema.ts`

Do not commit `.env` files. Use `.env.example` as a template only.
