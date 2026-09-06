# SabioCast

Marketing site for **SabioCast** — multilingual live streaming with AI captions,
AI speech translation and remote simultaneous interpretation.

Content is a full rebuild of the reference site (clevercast.com), rebranded as
SabioCast with a new bold visual identity.

## Stack

- **Next.js 15** (App Router, TypeScript, static export-friendly)
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **next/font** — Space Grotesk (display) + Inter (body)
- Animations: pure CSS keyframes + a small `IntersectionObserver` scroll-reveal
  (`src/components/Reveal.tsx`). Respects `prefers-reduced-motion`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (44 static routes)
npm start        # serve the production build
```

## Structure

```
src/
  app/                 routes (App Router)
    solutions/[slug]   7 solution pages, content-driven
    platforms/         enterprise · webinar · learning
    legal/[slug]       terms · privacy · dpa · gdpr
    blog/[slug]        10 posts
  components/           Header (mega menu), Footer, PlayerMock, sections, ui
  content/             all copy lives here — site nav, solutions, pricing,
                       faq, blog, legal, logos, home
```

To edit copy, change the files in `src/content/` — pages read from them.

## Brand

| Token        | Value     | Use                         |
|--------------|-----------|-----------------------------|
| `brand-600`  | `#5a3fe4` | primary indigo              |
| `accent-500` | `#ff5a36` | CTAs, highlights            |
| `ink-950`    | `#0b0b12` | dark sections               |
| `paper`      | `#fbfaf8` | page background             |

Logo: `src/components/Logo.tsx` (inline SVG), favicon `src/app/icon.svg`.

## Notes / TODO before launch

- Forms (`contact`, `free-trial`) are front-end only — wire to a backend or form
  service (fields already match the reference site).
- Client logos in `src/content/logos.ts` render as styled text — swap for real
  SVG assets once the client list is confirmed.
- Hero/solution imagery uses Unsplash URLs via `next/image` (allowed in
  `next.config.ts`) — replace with owned assets.
- `docs.sabiocast.com`, `play.sabiocast.com`, `app.sabiocast.com` subdomains are
  referenced but not built here.
