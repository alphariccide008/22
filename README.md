# SabioCast — static site

Marketing site for **SabioCast** (multilingual live streaming: AI captions, AI
speech translation, remote interpretation).

**Stack:** plain HTML + [Tailwind CSS via CDN](https://cdn.tailwindcss.com) +
vanilla JavaScript. No framework, no bundler.

**Structure:** every page is a single `.html` file at the **project root**
(`index.html`, `about.html`, `solutions-ai-speech-translations.html`,
`blog-<slug>.html`, `legal-terms.html`, …). Links between them are relative
(`about.html`), so you can double-click `index.html` locally or drop the whole
folder onto any host via FTP.

```
index.html  about.html  pricing.html  contact.html  faq.html  jobs.html
free-trial.html  demos.html  player.html  docs.html  404.html
adaptive-bitrate-streaming.html  premium-support.html  managed-service.html
platforms-{enterprise,webinar,learning}.html
solutions-<slug>.html            (7)
blog.html  blog-<slug>.html      (10 posts)
legal-{terms,privacy,dpa,gdpr}.html
sitemap.xml  robots.txt  icon.svg
images/                           hero + section photos
js/main.js                       all interactivity
js/config.js                     generated: Telegram creds (git-ignored)

sitegen/                         the generator (not part of the deployed site)
  build.mjs      → regenerates all the .html files
  serve.mjs      → local preview server
  assets/main.js → source of js/main.js
  content/*.ts   → ALL copy: nav, solutions, pricing, faq, blog, legal…
public/                          images + icon.svg (copied to root on build)
```

## Editing

- **Copy / text** → edit `sitegen/content/*.ts`, then `npm run build`.
- **Markup / design** → edit `sitegen/build.mjs`, then `npm run build`.
  (Or just hand-edit the generated `.html` files — they're plain.)
- **Behaviour** → edit `sitegen/assets/main.js`, then `npm run build`.

```bash
npm run build     # regenerate the site (Node 20.6+, zero dependencies)
npm run serve     # preview at http://localhost:4173
npm run dev       # build + serve
```

`npm install` is not needed — the generator uses only Node built-ins.

## Forms → Telegram

`contact.html` and `free-trial.html` submit straight to the Telegram Bot API
from the browser. Put the credentials in `.env.local` (see `.env.example`):

```
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

`npm run build` writes them into `js/config.js`.

> ⚠️ Static site — the bot token is **public** in the deployed JS. Fine for a
> lead-capture bot; rotate it in @BotFather if it leaks. For a private token,
> host on a platform with functions and relay through a server endpoint.

## Notes

- Tailwind compiles in the browser via `cdn.tailwindcss.com`. To pin a minified
  stylesheet later, run the Tailwind CLI over `*.html` and swap the CDN `<script>`
  for a `<link>`.
- Navbar is white with dark text and gains a shadow on scroll.
- Client logos render as styled text — swap for real SVGs when confirmed.
- `images/` are licensed stock — replace with owned photography.
- Demo videos are gated ("trial account"), matching the reference site. Set
  `demoVideoId` in `sitegen/content/site.ts` to a YouTube id for real embeds.
