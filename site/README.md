# UPay Albania website

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 3, Motion. Requires **Node 18.18+** (Node 20 recommended, see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

On the original development machine Node 14 was the system version, so a portable Node 20 sits in `../.tools/node-v20.20.2-win-x64`. Put it first on `PATH` to use it.

## Structure

```
src/app/[locale]/…        pages (locale = sq | en)
src/app/api/og            Open Graph image
src/components/           UI building blocks
src/content/sq.ts en.ts   all page copy (en must match the Dict type of sq)
src/content/tariffs.ts    fee tables (approval needed before changing)
src/content/generated/    privacy notice and articles migrated from upay.al
src/lib/site.ts           verified contact data and store URLs
src/middleware.ts         Albanian at /, English at /en
next.config.mjs           old upay.al URL redirects
```

Set `NEXT_PUBLIC_SITE_URL` (default `https://upay.al`) for canonical URLs, sitemap and Open Graph.

See `../UPAY_WEBSITE_AUDIT.md` and `../UPAY_REDESIGN_REPORT.md`.
