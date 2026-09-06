# SabioCast — static site

Marketing site for **SabioCast** (multilingual live streaming: AI captions, AI
speech translation, remote interpretation). Rebuild of the reference site's
content with a new bold identity.

**Stack:** plain HTML + [Tailwind CSS via CDN](https://cdn.tailwindcss.com) +
vanilla JavaScript. No framework, no bundler, no build step for the browser.
Deploy the `dist/` folder to any static host (cPanel/FTP, Netlify drop,
GitHub Pages, S3, nginx…).

## Use it

The site is **generated** from content files so copy edits stay in one place.

```bash
npm run build     # regenerate dist/ from sitegen/content/*  (needs Node 20.6+, zero deps)
npm run serve     # preview dist/ at http://localhost:4173
npm run dev       # build + serve
```

`npm install` is **not needed** — the generator uses only Node built-ins and
runs your `.ts` content files directly via `--experimental-strip-types`.

## Layout

```
dist/                 ← the deployable site (git-ignored; run `npm run build`)
  index.html
  about/index.html
  solutions/<slug>/index.html      (7)
  platforms/{enterprise,webinar,learning}/
  blog/index.html + blog/<slug>/   (10 posts)
  legal/{terms,privacy,dpa,gdpr}/
  pricing/ contact/ faq/ jobs/ free-trial/ demos/ player/ docs/
  adaptive-bitrate-streaming/ premium-support/ managed-service/
  404.html  sitemap.xml  robots.txt
  images/  icon.svg
  js/main.js            ← all interactivity (menus, FAQ, reveal, forms, video)
  js/config.js          ← generated: Telegram creds baked in (see below)

sitegen/
  build.mjs             ← the generator (HTML string templates)
  serve.mjs             ← zero-dep preview server
  assets/main.js        ← source of dist/js/main.js
  content/*.ts          ← ALL copy: nav, solutions, pricing, faq, blog, legal…

public/                 ← static assets copied into dist/ verbatim
```

To change wording, edit `sitegen/content/*.ts` and re-run `npm run build`.
To change markup/design, edit `sitegen/build.mjs` (or hand-edit the `dist/*.html`
directly — they're plain files).

## Forms → Telegram

`/contact` and `/free-trial` submit straight to the Telegram Bot API from the
browser. Set the credentials in `.env.local` (see `.env.example`):

```
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

`npm run build` writes them into `dist/js/config.js`.

> ⚠️ This is a static site — the bot token is **public** in the deployed JS.
> That's fine for a lead-capture bot; rotate it in @BotFather if it leaks. For a
> private token you'd need a host with serverless functions to relay the message.

## Notes

- Tailwind is loaded from `cdn.tailwindcss.com` (compiles in the browser). Fine
  for this scale; if you want a pinned, minified stylesheet later, run the
  Tailwind CLI against `dist/**/*.html` and swap the CDN `<script>` for a `<link>`.
- Client logos render as styled text — swap for real SVGs when confirmed.
- Imagery in `public/images/` is licensed stock — replace with owned photography.
- Demo videos are gated ("trial account") like the reference site. Set
  `demoVideoId` in `sitegen/content/site.ts` to a YouTube id to make the demo
  frames real click-to-play embeds.
