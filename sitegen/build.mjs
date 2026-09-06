/* SabioCast static-site generator — emits plain HTML into ../dist */
import { mkdirSync, writeFileSync, rmSync, cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { site, primaryNav, footerNav } from "./content/site.ts";
import { solutions } from "./content/solutions.ts";
import { faqCategories } from "./content/faq.ts";
import { plans, annualPlan, pricingFaqs } from "./content/pricing.ts";
import { posts } from "./content/blog.ts";
import { legalDocs } from "./content/legal.ts";
import { clientLogos } from "./content/logos.ts";
import { solutionCards, accuracySteps, trustReasons, platformBullets } from "./content/home.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "dist");
const SITE_URL = "https://sabiocast.com";

/* ---------------- helpers ---------------- */
const e = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const raw = (s) => s; // readability marker

function write(route, html) {
  const rel = route === "/" ? "index.html" : join(route.replace(/^\//, ""), "index.html");
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

/* ---------------- icons ---------------- */
const arrow = `<svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const check = (cls = "h-5 w-5") =>
  `<svg class="${cls}" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 10.5 3.5 3.5L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* ---------------- logo ---------------- */
function logoMark(cls = "h-9 w-9") {
  return `<svg viewBox="0 0 48 48" class="${cls}" role="img" aria-label="SabioCast" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="sc-grad" x1="4" y1="6" x2="44" y2="42" gradientUnits="userSpaceOnUse"><stop stop-color="#5a3fe4"/><stop offset="1" stop-color="#ff5a36"/></linearGradient></defs>
<rect x="1" y="1" width="46" height="46" rx="13" fill="url(#sc-grad)"/>
<g stroke="#fff" stroke-width="3.4" stroke-linecap="round">
<path d="M14.5 24.5a12 12 0 0 1 12 12" opacity="0.95"/>
<path d="M14.5 16.5a20 20 0 0 1 20 20" opacity="0.7"/>
<path d="M14.5 8.5a28 28 0 0 1 28 28" opacity="0.45"/></g>
<circle cx="15" cy="36" r="4.4" fill="#fff"/></svg>`;
}
function logo(tone = "light") {
  return `<a href="/" aria-label="SabioCast home" class="shrink-0"><span class="inline-flex items-center gap-2.5">${logoMark()}
<span class="font-display text-xl font-bold tracking-tight"><span class="${tone === "dark" ? "text-white" : "text-ink-900"}">Sabio</span><span class="text-accent-500">Cast</span></span></span></a>`;
}

/* ---------------- buttons ---------------- */
function button(href, label, { variant = "primary", size = "md", icon = false } = {}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200";
  const sizes = { md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  const variants = {
    primary: "bg-accent-500 text-white shadow-[0_10px_30px_-10px_rgba(255,90,54,0.6)] hover:bg-accent-600 hover:-translate-y-0.5",
    secondary: "bg-brand-600 text-white hover:bg-brand-700 hover:-translate-y-0.5",
    ghost: "border border-ink-200 bg-white text-ink-800 hover:border-brand-300 hover:text-brand-700",
    light: "bg-white text-ink-900 hover:bg-ink-100 hover:-translate-y-0.5",
  };
  return `<a href="${href}" class="${base} ${sizes[size]} ${variants[variant]}">${e(label)}${icon ? arrow : ""}</a>`;
}

/* ---------------- header ---------------- */
function navPanel(group) {
  const wide = group.columns.length > 1;
  const cols = group.columns
    .map(
      (col) => `<div class="p-1">${
        col.title ? `<p class="px-3 pb-1 pt-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-400">${e(col.title)}</p>` : ""
      }${col.links
        .map(
          (l) => `<a href="${l.href}" class="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-brand-50">
<span class="block text-sm font-semibold text-ink-900 group-hover:text-brand-700">${e(l.label)}</span>
${l.description ? `<span class="mt-0.5 block text-xs leading-snug text-ink-500">${e(l.description)}</span>` : ""}</a>`,
        )
        .join("")}</div>`,
    )
    .join("");
  return `<div class="nav-panel absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 ${wide ? "w-[640px]" : "w-[320px]"}">
<div class="overflow-hidden rounded-2xl border border-ink-100 bg-white p-3 shadow-[0_30px_80px_-30px_rgba(11,11,18,0.35)]">
<div class="grid gap-1 ${wide ? "grid-cols-2" : "grid-cols-1"}">${cols}</div></div></div>`;
}

function header() {
  const desktop = primaryNav
    .map((g) => {
      if (!g.columns) {
        return `<a href="${g.href}" class="rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-brand-700">${e(g.label)}</a>`;
      }
      return `<div class="nav-group relative" data-open="false">
<button type="button" class="nav-trigger flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-brand-700" aria-expanded="false">
${e(g.label)}<svg class="nav-caret h-3.5 w-3.5 transition-transform" viewBox="0 0 16 16" fill="none"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
${navPanel(g)}</div>`;
    })
    .join("");

  const mobile = primaryNav
    .map((g) => {
      if (!g.columns) {
        return `<li class="py-1"><a href="${g.href}" class="block py-3 text-base font-semibold text-ink-900">${e(g.label)}</a></li>`;
      }
      const links = g.columns
        .flatMap((c) => c.links)
        .map(
          (l) => `<a href="${l.href}" class="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-brand-50 hover:text-brand-700">${e(l.label)}</a>`,
        )
        .join("");
      return `<li class="py-1" data-msub data-open="false">
<button type="button" data-msub-toggle class="flex w-full items-center justify-between py-3 text-base font-semibold text-ink-900">
${e(g.label)}<svg class="msub-caret h-4 w-4 transition-transform" viewBox="0 0 16 16" fill="none"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
<div class="msub-links pb-2">${links}</div></li>`;
    })
    .join("");

  return `<header data-header data-scrolled="false" class="sticky top-0 z-50 border-b border-transparent transition-all duration-300 [&[data-scrolled=true]]:border-ink-100 [&[data-scrolled=true]]:bg-paper/90 [&[data-scrolled=true]]:backdrop-blur-lg">
<div class="container-x flex h-16 items-center justify-between gap-6 md:h-[72px]">
${logo()}
<nav class="hidden items-center gap-1 lg:flex">${desktop}</nav>
<div class="hidden items-center gap-3 lg:flex">${button("/free-trial", "Try now", { icon: true })}</div>
<button type="button" data-burger data-open="false" aria-label="Open menu" aria-expanded="false" class="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-800 lg:hidden">
<span class="relative block h-4 w-5">
<span class="b1 absolute left-0 top-0 block h-0.5 w-5 bg-current transition-all"></span>
<span class="b2 absolute left-0 top-2 block h-0.5 w-5 bg-current transition-all"></span>
<span class="b3 absolute left-0 top-4 block h-0.5 w-5 bg-current transition-all"></span>
</span></button>
</div>
<div data-mobile-menu hidden class="lg:hidden">
<div class="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-ink-100 bg-paper px-5 pb-10 pt-4">
<ul class="divide-y divide-ink-100">${mobile}</ul>
<div class="mt-6 flex flex-col gap-3">
${button("/free-trial", "Try now", { size: "lg", icon: true }).replace("inline-flex", "flex w-full")}
${button("/contact", "Contact sales", { size: "lg", variant: "ghost" }).replace("inline-flex", "flex w-full")}
</div></div></div>
</header>`;
}

/* ---------------- footer ---------------- */
function footer() {
  const cols = footerNav
    .map(
      (col) => `<div><h3 class="text-xs font-bold uppercase tracking-[0.16em] text-white/40">${e(col.title)}</h3>
<ul class="mt-4 space-y-2.5">${col.links
        .map((l) => `<li><a href="${l.href}" class="text-sm text-white/70 transition-colors hover:text-white">${e(l.label)}</a></li>`)
        .join("")}</ul></div>`,
    )
    .join("");
  const soc = (href, label, path) =>
    `<a href="${href}" aria-label="${label}" target="_blank" rel="noreferrer" class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"><svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">${path}</svg></a>`;
  return `<footer class="bg-ink-950 text-white">
<div class="container-x py-16">
<div class="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
<div>${logo("dark")}
<p class="mt-4 max-w-xs text-sm leading-relaxed text-white/60">Multilingual live streaming to a global audience — AI captions, AI speech translation and remote interpretation in one platform.</p>
<address class="mt-6 text-sm not-italic leading-relaxed text-white/60">${e(site.address.line1)}<br>${e(site.address.line2)}<br>${e(site.address.country)}</address>
<div class="mt-6 flex gap-2">
${soc(site.social.linkedin, "LinkedIn", '<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V10.4H5.67v7.94h2.67zM7 9.24a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.1v-4.36c0-2.33-1.24-3.42-2.9-3.42a2.5 2.5 0 0 0-2.27 1.25v-1.07h-2.67c.04.75 0 7.94 0 7.94h2.67v-4.43c0-.24.02-.48.09-.65.19-.48.63-.98 1.36-.98.96 0 1.35.73 1.35 1.8v4.26h2.67z"/>')}
${soc(site.social.facebook, "Facebook", '<path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H17V4.6c-.3-.04-1.3-.13-2.46-.13-2.43 0-4.1 1.49-4.1 4.22v2.36H7.7V14h2.74v8h3.06z"/>')}
${soc(site.social.x, "X", '<path d="M18.24 2H21l-6.56 7.5L22 22h-6.03l-4.7-6.15L5.9 22H3.14l7-8L2 2h6.19l4.25 5.62L18.24 2zm-1.06 18h1.67L7.9 3.9H6.1L17.18 20z"/>')}
</div></div>
<div class="grid grid-cols-2 gap-8 sm:grid-cols-4">${cols}</div></div>
<div class="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
<p>&copy; <span data-year>2026</span> SabioCast. All rights reserved.</p>
<div class="flex flex-wrap gap-x-5 gap-y-2">${site.languages.map((l) => `<span>${e(l)}</span>`).join("")}</div>
</div></div></footer>`;
}

/* ---------------- layout ---------------- */
const TW_CONFIG = `tailwind.config={theme:{extend:{
fontFamily:{display:['"Space Grotesk"','ui-sans-serif','system-ui','sans-serif'],sans:['Inter','ui-sans-serif','system-ui','sans-serif']},
colors:{
brand:{50:'#eef0ff',100:'#e0e2ff',200:'#c6c9ff',300:'#a3a5fc',400:'#837df8',500:'#6a5cf0',600:'#5a3fe4',700:'#4b2fc9',800:'#3d29a2',900:'#342780',950:'#21174f'},
accent:{50:'#fff2ed',100:'#ffe3d6',200:'#ffc4ad',300:'#ff9d78',400:'#ff7a4d',500:'#ff5a36',600:'#ed3d15',700:'#c42d0e',800:'#9c2712',900:'#7e2413'},
ink:{50:'#f7f7f9',100:'#ededf1',200:'#d8d8e0',300:'#b6b6c4',400:'#8d8da1',500:'#6d6d83',600:'#56566a',700:'#454556',800:'#2b2b38',900:'#17171f',950:'#0b0b12'},
paper:'#fbfaf8'
}}}}`;

const STYLE = `
:root{--brand-600:#5a3fe4;--accent-500:#ff5a36;--ink-100:#ededf1;--paper:#fbfaf8;--ink-900:#17171f}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
html,body{overflow-x:clip}
body{margin:0;background:var(--paper);color:var(--ink-900);font-family:Inter,ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
::selection{background:var(--brand-600);color:#fff}
h1,h2,h3,h4{font-family:"Space Grotesk",ui-sans-serif,system-ui,sans-serif;letter-spacing:-0.02em;overflow-wrap:break-word}
img,svg,video,canvas{max-width:100%}
[hidden]{display:none!important}
.container-x{width:100%;margin-inline:auto;max-width:80rem;padding-inline:1.25rem}
@media(min-width:768px){.container-x{padding-inline:2rem}}
.text-gradient{background:linear-gradient(100deg,var(--brand-600),var(--accent-500));-webkit-background-clip:text;background-clip:text;color:transparent}
.bg-grid{background-image:linear-gradient(to right,rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.06) 1px,transparent 1px);background-size:56px 56px}
@keyframes fade-up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes pulse-ring{0%{transform:scale(.85);opacity:.7}100%{transform:scale(1.6);opacity:0}}
.animate-marquee{animation:marquee 38s linear infinite}
.animate-float{animation:float 6s ease-in-out infinite}
.reveal{opacity:1}
.js-anim .reveal{opacity:0;transform:translateY(18px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
.js-anim .reveal.in-view{opacity:1;transform:none}
[data-header][data-scrolled="true"]{border-bottom-color:var(--ink-100);background:rgba(251,250,248,.9);backdrop-filter:blur(12px)}
.nav-panel{opacity:0;visibility:hidden;transform:translateY(6px);transition:opacity .18s,transform .18s,visibility .18s}
.nav-group[data-open="true"] .nav-panel{opacity:1;visibility:visible;transform:translateY(0)}
.nav-group[data-open="true"] .nav-caret{transform:rotate(180deg)}
[data-msub] .msub-links{display:none}
[data-msub][data-open="true"] .msub-links{display:block}
[data-msub][data-open="true"] .msub-caret{transform:rotate(180deg)}
[data-burger][data-open="true"] .b1{top:.5rem;transform:rotate(45deg)}
[data-burger][data-open="true"] .b2{opacity:0}
[data-burger][data-open="true"] .b3{top:.5rem;transform:rotate(-45deg)}
.faq-item .faq-answer{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease,padding .3s ease,opacity .3s ease;opacity:0}
.faq-item[data-open="true"] .faq-answer{grid-template-rows:1fr;opacity:1;padding-bottom:1.25rem}
.faq-answer>div{overflow:hidden}
.faq-item[data-open="true"] .faq-plus{transform:rotate(45deg);background:var(--brand-600);color:#fff;border-color:var(--brand-600)}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}.js-anim .reveal{opacity:1;transform:none;transition:none}}
`;

function layout({ title, description, body, canonical }) {
  const full = title === "SabioCast" ? title : `${title} — SabioCast`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(full)}</title>
<meta name="description" content="${e(description)}">
<link rel="canonical" href="${SITE_URL}${canonical || "/"}">
<meta property="og:title" content="${e(full)}">
<meta property="og:description" content="${e(description)}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>${TW_CONFIG}</script>
<style>${STYLE}</style>
</head>
<body class="min-h-screen antialiased">
<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
${header()}
<main id="main">${body}</main>
${footer()}
<script src="/js/config.js"></script>
<script src="/js/main.js" defer></script>
</body>
</html>`;
}

/* ---------------- shared sections ---------------- */
function eyebrow(text, tone = "brand") {
  const c = tone === "light" ? "text-brand-200" : "text-brand-600";
  const dot = tone === "light" ? "bg-accent-400" : "bg-accent-500";
  return `<span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${c}"><span class="h-1.5 w-1.5 rounded-full ${dot}"></span>${e(text)}</span>`;
}

function sectionHeading({ eyebrow: eb, title, intro, align = "left", tone = "dark" }) {
  const wrap = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";
  const h = tone === "light" ? "text-white" : "text-ink-900";
  const p = tone === "light" ? "text-ink-200" : "text-ink-600";
  return `<div class="${wrap}">
${eb ? `<div class="mb-4">${eyebrow(eb, tone === "light" ? "light" : "brand")}</div>` : ""}
<h2 class="text-balance text-3xl font-bold sm:text-4xl md:text-[2.75rem] md:leading-[1.05] ${h}">${e(title)}</h2>
${intro ? `<p class="mt-5 text-lg leading-relaxed ${p}">${e(intro)}</p>` : ""}</div>`;
}

function section(inner, { tone = "paper", id = "" } = {}) {
  const tones = {
    paper: "bg-paper text-ink-900",
    muted: "bg-ink-50 text-ink-900",
    ink: "bg-ink-950 text-white",
  };
  return `<section ${id ? `id="${id}"` : ""} class="py-20 md:py-28 ${tones[tone]}"><div class="container-x">${inner}</div></section>`;
}

function playerMock(cls = "") {
  const bars = [12, 28, 40, 22, 34, 48, 30, 18, 26, 42, 20, 32, 14, 38, 24, 30, 16, 44, 22, 28];
  return `<div class="relative rounded-2xl border border-white/10 bg-ink-900 p-3 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] ${cls}">
<div class="overflow-hidden rounded-xl bg-gradient-to-br from-brand-800 via-ink-900 to-ink-950">
<div class="relative aspect-video">
<div class="bg-grid absolute inset-0 opacity-40"></div>
<div class="absolute inset-0 flex items-center justify-center"><span class="relative flex h-16 w-16 items-center justify-center">
<span class="absolute inline-flex h-full w-full rounded-full bg-accent-500/40 [animation:pulse-ring_2.4s_ease-out_infinite]"></span>
<span class="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-white"><svg viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></span></div>
<div class="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white backdrop-blur"><span class="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-400"></span>Live</div>
<div class="absolute inset-x-4 bottom-14"><p class="inline-block rounded-md bg-black/65 px-3 py-1.5 text-sm font-medium text-white backdrop-blur">…y esto se traduce en tiempo real para todos los idiomas.</p></div>
<div class="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8">
<div class="flex h-1 flex-1 overflow-hidden rounded-full bg-white/20"><div class="h-full w-2/3 rounded-full bg-accent-500"></div></div>
<span class="rounded bg-white/15 px-1.5 py-0.5 text-[0.65rem] font-semibold text-white">CC</span>
<svg viewBox="0 0 24 24" class="h-4 w-4 text-white/80" fill="currentColor"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zm-7 9a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12h-2a5 5 0 0 1-10 0H5z"/></svg>
</div></div></div>
<div class="flex items-center justify-between gap-4 px-1.5 pb-1 pt-3">
<div class="flex flex-wrap gap-1.5">${["EN", "ES", "FR", "DE", "NL"]
    .map((l, i) => `<span class="rounded-md px-1.5 py-0.5 text-[0.68rem] font-bold ${i === 1 ? "bg-accent-500 text-white" : "bg-white/10 text-white/60"}">${l}</span>`)
    .join("")}</div>
<div class="flex h-6 items-end gap-[3px]">${bars
    .map((hh, i) => `<span class="w-[3px] rounded-full bg-brand-400/70" style="height:${hh}%;animation:float ${1.2 + (i % 5) * 0.2}s ease-in-out ${i * 0.05}s infinite"></span>`)
    .join("")}</div></div></div>`;
}

function videoFrame({ poster, label, youTubeId = "", href = "/free-trial", cls = "" }) {
  const play = `<span class="relative flex h-16 w-16 items-center justify-center">
<span class="absolute inline-flex h-full w-full rounded-full bg-accent-500/40 [animation:pulse-ring_2.4s_ease-out_infinite]"></span>
<span class="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-white transition-transform group-hover:scale-105"><svg viewBox="0 0 24 24" class="ml-1 h-6 w-6" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></span>`;
  const overlay = youTubeId
    ? `<button type="button" data-video-play aria-label="${e(label)}" class="group absolute inset-0 flex items-center justify-center">${play}</button>`
    : `<a href="${href}" data-video-play aria-label="${e(label)}" class="group absolute inset-0 flex flex-col items-center justify-center gap-3">${play}<span class="rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">Live demos require a trial account</span></a>`;
  return `<div data-video ${youTubeId ? `data-youtube="${youTubeId}"` : ""} data-label="${e(label)}" class="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] ${cls}">
<img src="${poster}" alt="" class="absolute inset-0 h-full w-full object-cover opacity-70">
<div class="absolute inset-0 bg-gradient-to-tr from-ink-950/80 via-ink-950/30 to-brand-700/30"></div>
<div class="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white backdrop-blur"><span class="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-400"></span>Live demo</div>
${overlay}
<div class="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10">
<div class="flex h-1 flex-1 overflow-hidden rounded-full bg-white/20"><div class="h-full w-1/2 rounded-full bg-accent-500"></div></div>
${["EN", "ES", "FR", "DE"].map((l, i) => `<span class="rounded px-1.5 py-0.5 text-[0.65rem] font-bold ${i === 1 ? "bg-accent-500 text-white" : "bg-white/15 text-white/70"}">${l}</span>`).join("")}
<span class="rounded bg-white/15 px-1.5 py-0.5 text-[0.65rem] font-semibold text-white">CC</span></div></div>`;
}

function pageHero({ eyebrow: eb, title, intro, actions = "" }) {
  return `<section class="relative overflow-hidden bg-ink-950 pb-16 pt-16 text-white md:pb-20 md:pt-24">
<div class="bg-grid absolute inset-0 opacity-[0.12]"></div>
<div class="absolute -left-40 -top-20 h-[26rem] w-[26rem] rounded-full bg-brand-600/25 blur-[120px]"></div>
<div class="absolute right-0 top-10 h-[20rem] w-[20rem] rounded-full bg-accent-500/15 blur-[120px]"></div>
<div class="container-x relative"><div class="max-w-3xl reveal in-view">
${eb ? `<span class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">${e(eb)}</span>` : ""}
<h1 class="mt-4 text-balance font-display text-4xl font-bold leading-[1.06] sm:text-5xl md:text-[3.25rem]">${e(title)}</h1>
${intro ? `<p class="mt-5 text-lg leading-relaxed text-white/70">${e(intro)}</p>` : ""}
${actions ? `<div class="mt-8 flex flex-wrap gap-3">${actions}</div>` : ""}
</div></div></section>`;
}

function logoMarquee(heading = "Trusted by global brands and companies", tone = "paper") {
  const row = [...clientLogos, ...clientLogos]
    .map((n) => `<span class="shrink-0 font-display text-lg font-semibold tracking-tight ${tone === "ink" ? "text-white/50" : "text-ink-400"}">${e(n)}</span>`)
    .join("");
  return `<section class="${tone === "ink" ? "bg-ink-950 py-16 text-white" : "bg-paper py-16"}">
<div class="container-x"><p class="text-center text-xs font-semibold uppercase tracking-[0.18em] ${tone === "ink" ? "text-white/40" : "text-ink-400"}">${e(heading)}</p></div>
<div class="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
<div class="animate-marquee flex w-max gap-12 pr-12">${row}</div></div></section>`;
}

function featureCard(f, i, light) {
  return `<div class="reveal rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
    light ? "border-white/10 bg-white/[0.03] hover:border-white/25" : "border-ink-100 bg-white hover:border-brand-200 hover:shadow-[0_24px_50px_-24px_rgba(90,63,228,0.28)]"
  }" data-delay="${i * 60}">
<div class="flex items-center gap-3">
<span class="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${light ? "bg-accent-500/15 text-accent-400" : "bg-brand-50 text-brand-600"}">${String(i + 1).padStart(2, "0")}</span>
${f.stat ? `<span class="rounded-full px-2.5 py-1 text-xs font-bold ${light ? "bg-white/10 text-white" : "bg-accent-50 text-accent-700"}">${e(f.stat)}</span>` : ""}</div>
<h3 class="mt-4 text-lg font-bold ${light ? "text-white" : "text-ink-900"}">${e(f.title)}</h3>
<p class="mt-2 text-sm leading-relaxed ${light ? "text-white/60" : "text-ink-600"}">${e(f.body)}</p></div>`;
}

function featureGrid({ eyebrow: eb, title, intro, features, tone = "paper", columns = 3 }) {
  const light = tone === "ink";
  const grid = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
  return section(
    `${sectionHeading({ eyebrow: eb, title, intro, tone: light ? "light" : "dark" })}
<div class="mt-14 grid gap-5 ${grid}">${features.map((f, i) => featureCard(f, i, light)).join("")}</div>`,
    { tone },
  );
}

function faqAccordion(faqs) {
  return `<div class="faq-group divide-y divide-ink-200/70 border-y border-ink-200/70">${faqs
    .map(
      (f, i) => `<div class="faq-item" data-open="${i === 0 ? "true" : "false"}">
<button type="button" class="faq-q flex w-full items-start justify-between gap-4 py-5 text-left" aria-expanded="${i === 0 ? "true" : "false"}">
<span class="text-[0.98rem] font-semibold text-ink-900">${e(f.q)}</span>
<span class="faq-plus mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-300 text-ink-500 transition-all"><svg viewBox="0 0 16 16" class="h-3.5 w-3.5" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span></button>
<div class="faq-answer"><div><p class="max-w-2xl text-[0.95rem] leading-relaxed text-ink-600">${e(f.a)}</p></div></div></div>`,
    )
    .join("")}</div>`;
}

function faqSection({ eyebrow: eb = "FAQ", title = "Frequently asked questions", faqs, tone = "muted" }) {
  return section(
    `<div class="grid gap-12 lg:grid-cols-[1fr_1.6fr]">${sectionHeading({ eyebrow: eb, title })}${faqAccordion(faqs)}</div>`,
    { tone },
  );
}

function ctaSection(heading = "Get started now", body = "Start live streaming today with a solution of choice. No credit card required.") {
  return `<section class="bg-paper py-20 md:py-24"><div class="container-x">
<div class="relative overflow-hidden rounded-3xl bg-brand-700 px-6 py-14 text-center md:px-16 md:py-20">
<div class="bg-grid absolute inset-0 opacity-30"></div>
<div class="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-500/30 blur-3xl"></div>
<div class="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-brand-400/30 blur-3xl"></div>
<div class="relative">
<h2 class="text-balance text-3xl font-bold text-white sm:text-4xl md:text-5xl">${e(heading)}</h2>
<p class="mx-auto mt-4 max-w-xl text-lg text-white/70">${e(body)}</p>
<div class="mt-8 flex flex-wrap justify-center gap-3">${button("/free-trial", "Try for free", { size: "lg", icon: true })}${button("/contact", "Contact us for more info", { size: "lg", variant: "light" })}</div>
</div></div></div></section>`;
}

function serviceModels() {
  return section(
    `${sectionHeading({ eyebrow: "Support & services", title: "World-class support and services for global events", align: "center" })}
<div class="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
<div class="rounded-2xl border border-ink-100 bg-white p-6">
<h3 class="text-lg font-bold text-ink-900">Premium support</h3>
<p class="mt-2 text-sm leading-relaxed text-ink-600">SabioCast is a self-service platform. Use our AI solutions and hire correctors, interpreters or captioners yourself. Premium support adds a guaranteed response time, a service level and a custom Slack channel for direct contact with our engineers.</p>
${button("/premium-support", "Learn more", { variant: "ghost", icon: true }).replace('class="', 'class="mt-5 ')}</div>
<div class="rounded-2xl border border-ink-100 bg-white p-6">
<h3 class="text-lg font-bold text-ink-900">Managed service</h3>
<p class="mt-2 text-sm leading-relaxed text-ink-600">We source correctors, interpreters and captioners for optimal quality, help you manage your project, monitor your live stream and provide prompt assistance — so your event just works.</p>
${button("/managed-service", "Learn more", { variant: "ghost", icon: true }).replace('class="', 'class="mt-5 ')}</div></div>`,
    { tone: "muted" },
  );
}

function statBand(stats) {
  return section(
    `<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">${stats
      .map(
        (s, i) => `<div class="reveal" data-delay="${i * 80}"><p class="font-display text-4xl font-bold text-gradient sm:text-5xl">${e(s.value)}</p><p class="mt-2 text-sm leading-snug text-white/60">${e(s.label)}</p></div>`,
      )
      .join("")}</div>`,
    { tone: "ink" },
  );
}

function splitFeature({ eyebrow: eb, title, body, bullets, image, reverse = false, cta }) {
  const bl = bullets
    ? `<ul class="mt-6 space-y-3">${bullets
        .map((b) => `<li class="flex gap-3 text-ink-700"><span class="mt-0.5 shrink-0 text-brand-600">${check("h-5 w-5")}</span><span class="text-[0.95rem] leading-relaxed">${e(b)}</span></li>`)
        .join("")}</ul>`
    : "";
  const c = cta ? button(cta.href, cta.label, { variant: "ghost", icon: true }).replace('class="', 'class="mt-8 ') : "";
  return section(
    `<div class="grid items-center gap-12 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}">
<div class="reveal">${sectionHeading({ eyebrow: eb, title, intro: body })}${bl}${c}</div>
<div class="reveal" data-delay="120">${image}</div></div>`,
  );
}

/* ---------------- PAGES ---------------- */
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const pages = [];
const P = (route, title, description, body) => pages.push({ route, title, description, body });

/* ---- Home ---- */
P("/", "SabioCast — Multilingual live streaming made effortless",
  "SabioCast delivers live streams with multiple audio languages and pin-sharp AI closed captions. Viewers anywhere pick their language in our multilingual player.",
  `<section class="relative overflow-hidden bg-ink-950 pb-24 pt-14 text-white md:pb-32 md:pt-20">
<div class="bg-grid absolute inset-0 opacity-[0.15]"></div>
<div class="absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-brand-600/30 blur-[120px]"></div>
<div class="absolute -right-40 top-40 h-[28rem] w-[28rem] rounded-full bg-accent-500/20 blur-[120px]"></div>
<div class="container-x relative"><div class="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
<div class="reveal in-view">
<span class="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.7rem] font-semibold leading-tight text-white/80 backdrop-blur sm:text-xs"><span class="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"></span><span class="min-w-0">AI captions · AI speech translation · Remote interpretation</span></span>
<h1 class="mt-6 text-balance font-display text-[2rem] font-bold leading-[1.08] sm:text-5xl sm:leading-[1.05] md:text-6xl">Multilingual live streaming <span class="text-gradient">made effortless</span></h1>
<p class="mt-6 max-w-xl text-lg leading-relaxed text-white/70">SabioCast lets you deliver live streams with multiple audio languages and very accurate closed captions, using the latest AI technologies. Viewers anywhere in the world watch the stream and select their preferred language in our multilingual video player.</p>
<div class="mt-8 flex flex-wrap gap-3">${button("/free-trial", "Try now", { size: "lg", icon: true })}${button("/demos", "View more", { size: "lg", variant: "light" })}</div>
<dl class="mt-12 grid max-w-[20rem] grid-cols-3 gap-4 sm:max-w-md sm:gap-6">
${[["99+%", "caption accuracy"], ["50+", "languages"], ["2005", "streaming since"]].map(([v, l]) => `<div><dt class="font-display text-2xl font-bold text-white">${v}</dt><dd class="text-xs text-white/50">${l}</dd></div>`).join("")}
</dl></div>
<div class="reveal in-view animate-float lg:pl-6">${playerMock()}</div>
</div></div></section>

${section(`${sectionHeading({ eyebrow: "Solutions", title: "Get a solution for any multilingual live stream", intro: "Our platform and embeddable player are an all-in solution for multilingual live streaming to an unlimited number of worldwide viewers. Streams are delivered through a global CDN using adaptive bitrate streaming, so speed, reliability and scalability are guaranteed." })}
<div class="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">${solutionCards
    .map(
      (s, i) => `<a href="${s.href}" class="reveal group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_50px_-24px_rgba(90,63,228,0.28)]" data-delay="${i * 60}">
<h3 class="text-lg font-bold text-ink-900 group-hover:text-brand-700">${e(s.title)}</h3>
<p class="mt-2 flex-1 text-sm leading-relaxed text-ink-600">${e(s.body)}</p>
<span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">Learn more ${arrow}</span></a>`,
    )
    .join("")}</div>`)}

${logoMarquee()}

${splitFeature({
    eyebrow: "Effortless and affordable",
    title: "Multilingual live streaming, tailored to your needs",
    body: "SabioCast offers a solution for any kind of multilingual live stream, no matter the specifications. Leading AI innovations let you cut costs, while human intervention keeps you at the highest quality standards. Our embeddable, customisable player ensures viewers everywhere can watch in their own language.",
    bullets: ["Use the headphone menu to select audio languages", "Use the CC menu for closed captions", "One embed snippet for any site or platform"],
    image: playerMock(),
    cta: { label: "Talk to us", href: "/contact" },
    reverse: true,
  })}

${section(`${sectionHeading({ eyebrow: "AI-powered accuracy", title: "Experience the difference: superior AI interpretation & captions", intro: "SabioCast's unique AI solution vastly improves the accuracy and quality of speech translations and closed captions during a live stream, compared with every other solution on the market. You can even attain 100% accuracy using our real-time correction interface in the cloud.", tone: "light" })}
<ol class="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">${accuracySteps
    .map(
      (s, i) => `<li class="reveal relative rounded-2xl border border-white/10 bg-white/[0.03] p-6" data-delay="${i * 70}">
<span class="font-display text-sm font-bold text-white/30">Step ${i + 1}</span>
<span class="mt-3 block w-fit rounded-full bg-accent-500/15 px-2.5 py-1 text-xs font-bold text-accent-400">${e(s.stat)}</span>
<h3 class="mt-4 text-base font-bold text-white">${e(s.title)}</h3>
<p class="mt-2 text-sm leading-relaxed text-white/60">${e(s.body)}</p></li>`,
    )
    .join("")}</ol>`, { tone: "ink" })}

${featureGrid({
    eyebrow: "Enhanced AI",
    title: "Perfect subtitles & audio translations with a little human help",
    intro: "Hiring human subtitlers and interpreters is expensive and makes live stream management complex. Enhanced AI keeps the quality while cutting cost and complexity — our AI provides captions and translations on par with human services.",
    columns: 2,
    features: [
      { title: "AI vocabularies ensure correct names and jargon", body: "SabioCast auto-generates AI vocabularies from texts you provide, guaranteeing correct rendition of names, brands, abbreviations and technical terms, with pre- and post-processing to use them optimally." },
      { title: "AI vocabularies improve recognition and translation", body: "Vocabularies ensure correct spelling and capitalisation, help the AI recognise the sound of terms during speech-to-text, and help it interpret terms correctly when forming and translating sentences." },
      { title: "Improve accuracy through human real-time correction", body: "An intuitive web interface lets users edit the result of AI speech-to-text in real time. Since it is the source for captions and audio translations, corrections improve every output. Anyone with an internet connection can do it." },
      { title: "Multiple languages, single corrector", body: "Enhanced AI needs only one or two correctors regardless of the number of languages. A good correction of the transcription assures the quality of every caption and audio language." },
    ],
  })}

${section(`${sectionHeading({ eyebrow: "In the spotlight", title: "Subtitled simulcasts & on-site transcripts", intro: "Beyond audio translations and closed captions, SabioCast offers simulcasting with AI-generated subtitles and on-site delivery of the translated transcription for event attendees, with no delay." })}
<div class="mt-12 grid gap-5 lg:grid-cols-2">
${[
      { sub: "Simulcast to YouTube with AI subtitles", title: "Send live streams with subtitles to social media", body: "SabioCast supports simulcasting live streams with burned-in AI subtitles via RTMP and SRT. Send an accurate stream to any social channel or third-party platform, with audio and subtitles perfectly in sync. Stream to multiple endpoints at once, each in a different language." },
      { sub: "Live AI transcription for event attendees", title: "Auto-scrolling transcripts on large screens and mobiles", body: "Real-time AI transcription ensures attendees with hearing impairments or non-native speakers can follow along. SabioCast delivers AI text as an auto-scrolling transcript and AI speech translations, in real time, via an intuitive web app for end-users." },
    ]
      .map(
        (c, i) => `<div class="reveal rounded-2xl border border-ink-100 bg-white p-8" data-delay="${i * 80}">
<p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">${e(c.sub)}</p>
<h3 class="mt-3 text-xl font-bold text-ink-900">${e(c.title)}</h3>
<p class="mt-3 text-sm leading-relaxed text-ink-600">${e(c.body)}</p></div>`,
      )
      .join("")}</div>`, { tone: "muted" })}

${serviceModels()}

${splitFeature({
    eyebrow: "Enterprise platform",
    title: "All-in-one streaming platform",
    body: "SabioCast provides an all-in-one enterprise platform for live and on-demand video streaming, management, distribution, monetisation and analytics. Fast, reliable and scalable, with a customisable HTML5 player that can be embedded in any site or platform.",
    bullets: platformBullets,
    image: `<div class="rounded-2xl border border-ink-100 bg-white p-2 shadow-[0_40px_100px_-40px_rgba(11,11,18,0.4)]"><div class="rounded-xl bg-ink-950 p-5">
<div class="flex gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-white/20"></span><span class="h-2.5 w-2.5 rounded-full bg-white/20"></span><span class="h-2.5 w-2.5 rounded-full bg-white/20"></span></div>
<div class="mt-4 grid grid-cols-3 gap-2">${["Viewers", "Countries", "Languages", "Bitrate", "Uptime", "Recordings"]
      .map((k, i) => `<div class="rounded-lg bg-white/5 p-3"><p class="text-[0.65rem] uppercase tracking-wide text-white/40">${k}</p><p class="mt-1 font-display text-lg font-bold text-white">${["18,204", "63", "8", "6.2M", "100%", "24"][i]}</p></div>`)
      .join("")}</div>
<div class="mt-3 h-24 rounded-lg bg-gradient-to-t from-brand-600/40 to-transparent"></div></div></div>`,
  })}

${section(`<div class="grid items-center gap-12 lg:grid-cols-2">
${sectionHeading({ eyebrow: "Adaptive bitrate streaming", title: "Flawless HD streaming to global audiences", intro: "SabioCast starts where other remote interpreting solutions stop. Rather than a limited number of participants in a controlled environment, our live streams are open to an unlimited number of global viewers, delivered through a CDN with edge servers all over the world. We automatically transcode your broadcast to multiple resolutions for adaptive bitrate streaming, and support redundant setups with automatic player failover.", tone: "light" })}
<div class="reveal space-y-3" data-delay="100">${["1080p", "720p", "480p", "360p", "240p"]
    .map((res, i) => `<div class="flex items-center gap-4"><span class="w-14 text-sm font-semibold text-white/60">${res}</span><div class="h-2 flex-1 overflow-hidden rounded-full bg-white/10"><div class="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500" style="width:${100 - i * 16}%"></div></div></div>`)
    .join("")}
${button("/adaptive-bitrate-streaming", "Learn more", { variant: "light", icon: true }).replace('class="', 'class="mt-4 ')}</div></div>`, { tone: "ink" })}

${section(`${sectionHeading({ eyebrow: "Why SabioCast", title: "Why global organisations trust us for all types of events", intro: "Don't hesitate to break down the language barriers and expand your reach. We have supported tens of thousands of events and are trusted by clients all over the world." })}
<div class="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">${trustReasons
    .map(
      (r, i) => `<div class="reveal rounded-2xl border border-ink-100 bg-white p-6" data-delay="${(i % 3) * 60}">
<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">${check()}</div>
<h3 class="mt-4 text-base font-bold text-ink-900">${e(r.title)}</h3>
<p class="mt-2 text-sm leading-relaxed text-ink-600">${e(r.body)}</p></div>`,
    )
    .join("")}</div>`)}

${statBand([
    { value: "99+%", label: "AI caption accuracy without human help" },
    { value: "Unlimited", label: "worldwide viewers per live stream" },
    { value: "50+", label: "audio and caption languages" },
    { value: "10,000s", label: "of events delivered since 2005" },
  ])}

${ctaSection()}`);

/* ---- Solution pages ---- */
for (const s of solutions) {
  const steps = s.steps
    ? section(`${sectionHeading({ eyebrow: s.steps.subheading, title: s.steps.heading, intro: s.steps.body })}
<div class="mt-12 grid gap-5 md:grid-cols-3">${s.steps.items
        .map(
          (item, i) => `<div class="reveal rounded-2xl border border-ink-100 bg-white p-6" data-delay="${i * 70}">
<span class="font-display text-3xl font-bold text-brand-200">${String(i + 1).padStart(2, "0")}</span>
<h3 class="mt-3 text-base font-bold text-ink-900">${e(item.title)}</h3>
<p class="mt-2 text-sm leading-relaxed text-ink-600">${e(item.body)}</p></div>`,
        )
        .join("")}</div>`)
    : "";
  P(`/solutions/${s.slug}`, s.metaTitle, s.metaDescription,
    `<section class="relative overflow-hidden bg-ink-950 pb-24 pt-14 text-white md:pt-20">
<div class="bg-grid absolute inset-0 opacity-[0.12]"></div>
<div class="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-600/25 blur-[120px]"></div>
<div class="container-x relative"><div class="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
<div class="reveal in-view">
<span class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">${e(s.eyebrow)}</span>
<h1 class="mt-4 text-balance font-display text-4xl font-bold leading-[1.06] sm:text-5xl">${e(s.heroHeading)}</h1>
<p class="mt-5 max-w-xl text-lg leading-relaxed text-white/70">${e(s.heroBody)}</p>
<div class="mt-8 flex flex-wrap gap-3">${button("/free-trial", "Try now", { size: "lg", icon: true })}${button("/demos", "View more", { size: "lg", variant: "light" })}</div>
</div>
<div class="reveal in-view" data-delay="120"><div class="relative overflow-hidden rounded-2xl border border-white/10">
<img src="${s.heroImage}" alt="" class="h-full w-full object-cover"><div class="absolute inset-0 bg-gradient-to-tr from-ink-950/70 via-transparent to-transparent"></div></div></div>
</div></div></section>

${section(`<div class="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">${sectionHeading({ title: s.intro.heading, intro: s.intro.body })}<div class="reveal" data-delay="100">${playerMock()}</div></div>`)}

${logoMarquee("Trusted by global brands and companies", "ink")}

${featureGrid({ eyebrow: "Capabilities", title: `What you get with ${s.eyebrow}`, features: s.features, tone: "muted" })}

${steps}
${serviceModels()}
${faqSection({ faqs: s.faqs })}
${ctaSection()}`);
}

/* ---- Platforms ---- */
P("/platforms/enterprise", "Enterprise Platform",
  "All-in-one platform for live and on-demand video streaming with an embeddable multilingual player, adaptive bitrate delivery and full redundancy.",
  `${pageHero({ eyebrow: "Enterprise Platform", title: "All-in-one platform for live and on-demand video", intro: "Elevate your content, engage your audience and grow your brand with a great live streaming experience — transcoding, monetisation, security and content management, with an embedded player.", actions: `${button("/free-trial", "Try now", { size: "lg", icon: true })}${button("/pricing", "See pricing", { size: "lg", variant: "light" })}` })}
${section(`<div class="grid gap-5 md:grid-cols-2">${[
    ["Best way to manage live streams", "SabioCast Enterprise is an all-in-one SaaS solution with a customisable HTML5 player and fast, reliable, scalable infrastructure. Embed the player in any site, stream in via RTMP or SRT, simulcast to third parties, control access by IP, domain and country, and get real-time analytics."],
    ["Flawless live streaming in HD to global audiences", "We partner with a tier-one CDN for global delivery and automatically transcode your broadcast for adaptive bitrate streaming, so every viewer gets the best quality their connection allows."],
    ["Support for SRT and RTMP broadcasts", "SRT is an open protocol with built-in authentication and encryption, promoted by the SRT Alliance — of which we are a member — and ideal for multilingual live streaming with multiple audio tracks."],
    ["Fully redundant live streams", "Main and backup servers in different geographical locations, with automatic player failover. If an encoder or local network issue takes out the main feed, the player switches seamlessly to the backup."],
    ["Simulive streaming without stress", "Schedule pre-recorded video as a live broadcast, with caption and audio language options, and guarantee video streams of the highest quality."],
    ["Turnkey solution", "Player, transcoding, CDN, management console and analytics in one place, with multi-user access and role-based permissions — a single point of access for your organisation."],
  ]
    .map((x, i) => `<div class="reveal rounded-2xl border border-ink-100 bg-white p-7" data-delay="${(i % 2) * 70}"><h2 class="text-lg font-bold text-ink-900">${e(x[0])}</h2><p class="mt-2 text-sm leading-relaxed text-ink-600">${e(x[1])}</p></div>`)
    .join("")}</div>`)}
${logoMarquee("Trusted by global brands and companies", "ink")}
${featureGrid({ eyebrow: "Why choose SabioCast", title: "Everything a live stream needs", tone: "muted", features: [
    { title: "Extensive feature set", body: "Streaming, management, distribution, monetisation and analytics for live and on-demand video." },
    { title: "Branded multilingual player", body: "Responsive HTML5 player with styling options, poster images and overlay messages, on any browser and device." },
    { title: "Simulcasting", body: "Auto-simulcast to Facebook, YouTube, Twitch and X, with language selection for multilingual events." },
    { title: "Cloud recording", body: "Server-side recording downloadable after the stream. For multilingual events, all audio and captions are downloadable." },
    { title: "Limit stream accessibility", body: "Whitelist and blacklist countries, domains and IP addresses, with different settings per stream." },
    { title: "Detailed analytics", body: "Real-time viewer count and geography, plus post-event behavioural insight." },
  ] })}
${statBand([
    { value: "RTMP + SRT", label: "ingest protocols supported" },
    { value: "5", label: "adaptive resolutions per stream" },
    { value: "100%", label: "player failover coverage" },
    { value: "REST + JS", label: "APIs to integrate" },
  ])}
${ctaSection()}`);

P("/platforms/webinar", "Webinar Platform",
  "Create engaging, interactive webinars, virtual events and hybrid gatherings for participants around the world — hosted, branded and multilingual.",
  `${pageHero({ eyebrow: "Webinar Platform", title: "Create engaging, interactive events for participants around the world", intro: "A hosted platform for webinars, virtual events and hybrid gatherings — branded registration and viewing pages, interactive features, and multilingual audio and captions.", actions: `${button("/free-trial", "Try for free", { size: "lg", icon: true })}${button("/pricing", "Check it out", { size: "lg", variant: "light" })}` })}
${section(`<div class="grid gap-5 md:grid-cols-2">${[
    ["Customisable, multi-purpose webinars", "Full front-end branding — logos, banners, colours, custom CSS. Participant interaction with Q&A, chat and surveys. Third-party integrations via iframes. Flexible registration: one-step for marketing, or two-step with approval."],
    ["Multilingual webinars", "Stream video with multiple audio tracks, live and on-demand. Viewers switch languages in real time. Remote simultaneous interpretation is available via Translate@Home."],
    ["Simulive webinars", "Stream an uploaded video as if it were live, with scheduling automation — also available in multilingual formats."],
    ["More than just webinars", "Conferences, e-learning, press conferences and town halls — the appearance is customisable per event type."],
  ]
    .map((x, i) => `<div class="reveal rounded-2xl border border-ink-100 bg-white p-7" data-delay="${(i % 2) * 70}"><h2 class="text-lg font-bold text-ink-900">${e(x[0])}</h2><p class="mt-2 text-sm leading-relaxed text-ink-600">${e(x[1])}</p></div>`)
    .join("")}</div>`)}
${featureGrid({ eyebrow: "Why choose SabioCast", title: "Key benefits", tone: "muted", features: [
    { title: "Secure registration", body: "Customisable flows — public, approval-based or invitation-only." },
    { title: "Interaction rich", body: "Polls, chat, Q&A, surveys, embedded feeds and calls to action." },
    { title: "Fully branded", body: "Customisable landing and registration pages, with custom CSS." },
    { title: "Live dashboard", body: "Real-time broadcast control and participant monitoring." },
    { title: "On-demand conversion", body: "DVR, auto-conversion, editing and segmentation by topic or speaker." },
    { title: "Per-participant analytics", body: "Viewing heatmaps, watch time and re-watch tracking." },
  ] })}
${ctaSection()}`);

P("/platforms/learning", "Learning Platform",
  "Deliver multilingual courses and on-demand training with SabioCast Learning — AI captions and translations built in.",
  `${pageHero({ eyebrow: "Learning Platform", title: "Multilingual courses and on-demand training", intro: "SabioCast Learning turns your live and recorded sessions into structured, multilingual courses — with AI captions, AI speech translation and per-learner progress tracking." })}
${featureGrid({ eyebrow: "What's included", title: "Training that reaches everyone", features: [
    { title: "Multilingual by default", body: "Every lesson can carry multiple audio languages and caption tracks, generated by AI or human experts." },
    { title: "Structured courses", body: "Group live sessions and VoD into modules, chapters and lessons with a branded catalogue." },
    { title: "Progress & completion", body: "Track per-learner progress, quiz results and completion certificates." },
    { title: "Live and on-demand", body: "Run live cohorts, then publish the recording as a self-paced course automatically." },
    { title: "Access control", body: "Invitation-only, domain-restricted or open enrolment — your choice per course." },
    { title: "Analytics", body: "See which lessons hold attention and where learners drop off." },
  ] })}
${ctaSection("Bring your training to every language")}`);

/* ---- Pricing ---- */
{
  const planCards = plans
    .map(
      (p, i) => `<div class="reveal flex flex-col rounded-2xl border p-7 ${p.featured ? "border-brand-600 bg-brand-700 text-white shadow-[0_30px_70px_-30px_rgba(90,63,228,0.6)]" : "border-ink-100 bg-white"}" data-delay="${(i % 3) * 70}">
${p.featured ? `<span class="mb-3 w-fit rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">Most popular</span>` : ""}
<h3 class="text-lg font-bold ${p.featured ? "text-white" : "text-ink-900"}">${e(p.name)}</h3>
<p class="mt-1 text-sm ${p.featured ? "text-white/70" : "text-ink-500"}">${e(p.blurb)}</p>
<p class="mt-5 flex items-baseline gap-1"><span class="text-xs font-semibold ${p.featured ? "text-white/60" : "text-ink-400"}">from</span><span class="font-display text-4xl font-bold ${p.featured ? "text-white" : "text-ink-900"}">${e(p.price)}</span><span class="text-sm ${p.featured ? "text-white/60" : "text-ink-400"}">${e(p.cadence)}</span></p>
<ul class="mt-6 flex-1 space-y-3">${p.includes.map((f) => `<li class="flex gap-2.5 text-sm ${p.featured ? "text-white/85" : "text-ink-700"}"><span class="mt-0.5 shrink-0 ${p.featured ? "text-accent-300" : "text-brand-600"}">${check("h-4 w-4")}</span>${e(f)}</li>`).join("")}</ul>
${button(p.href, "See plan", { variant: p.featured ? "light" : "ghost", icon: true }).replace('class="', 'class="mt-7 w-full ')}</div>`,
    )
    .join("");
  P("/pricing", "Pricing",
    "Simple plans for multilingual live streaming — data traffic, processing hours and optional AI hours, monthly or annual. No hidden tiers.",
    `${pageHero({ eyebrow: "Pricing", title: "Simple plans, no hidden tiers", intro: "Every plan contains a set amount of resources — data traffic, live and VoD processing hours, and optionally AI hours. Need more? Add resources up front or simply pay overuse when your plan ends. We never stop your live stream." })}
${section(`<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">${planCards}</div>
<div class="reveal mt-6 rounded-2xl border border-ink-100 bg-ink-50 p-8 md:flex md:items-center md:justify-between md:gap-8">
<div class="max-w-xl"><h3 class="text-xl font-bold text-ink-900">${e(annualPlan.name)}</h3><p class="mt-2 text-sm text-ink-600">${e(annualPlan.blurb)}</p>
<ul class="mt-4 grid gap-2 sm:grid-cols-2">${annualPlan.includes.map((f) => `<li class="flex gap-2 text-sm text-ink-700"><span class="mt-0.5 shrink-0 text-brand-600">${check("h-4 w-4")}</span>${e(f)}</li>`).join("")}</ul></div>
${button("/contact?intent=quote&plan=annual", "Contact us", { icon: true }).replace('class="', 'class="mt-6 shrink-0 md:mt-0 ')}</div>`)}
${section(`<div class="grid gap-10 lg:grid-cols-2 lg:items-center">
${sectionHeading({ eyebrow: "Estimate data traffic", title: "Not sure which plan you need?", intro: "Data traffic depends on your audience size, stream length and video quality. Tell us about your event and we'll size a plan — and if you already have a quote from another provider, send us the terms and we'll come up with something more suitable.", tone: "light" })}
<div class="reveal rounded-2xl border border-white/10 bg-white/[0.03] p-6" data-delay="100">
<dl class="space-y-4 text-sm">${[
      ["Typical webinar (500 viewers, 1h, HD)", "~120 GB"],
      ["Conference (5,000 viewers, 3h, HD)", "~3.5 TB"],
      ["Flagship broadcast (50,000 viewers, 2h)", "~22 TB"],
    ].map(([k, v]) => `<div class="flex items-center justify-between gap-4 border-b border-white/10 pb-3"><dt class="text-white/60">${e(k)}</dt><dd class="font-display font-bold text-white">${e(v)}</dd></div>`).join("")}</dl>
${button("/contact?intent=quote", "Get a tailored quote", { variant: "light" }).replace('class="', 'class="mt-6 w-full ')}</div></div>`, { tone: "ink", id: "calculator" })}
${faqSection({ title: "Plans & pricing questions", faqs: pricingFaqs })}
${ctaSection("Start with a free trial", "Test the platform for 7 days. No credit card required.")}`);
}

/* ---- About ---- */
{
  const timeline = [
    ["2005", "Founded in Berchem, Belgium. First live streams delivered for enterprise clients."],
    ["2012", "Remote simultaneous interpretation launches — interpreters work from anywhere in the world."],
    ["2018", "Translate@Home wins its first industry innovation award for RSI."],
    ["2022", "Contextual AI captioning ships: 99+% accuracy without human intervention."],
    ["2024", "Live AI speech translation and on-site attendee transcription go GA."],
    ["2026", "The platform is acquired and relaunches as SabioCast, with the same team and technology."],
  ];
  const values = [
    ["Break the language barrier", "Everyone should be able to broadcast a multilingual live stream to a global audience — and every viewer should be able to watch in their own language."],
    ["AI with accountability", "We use AI to cut cost and complexity, and we pair it with human correction wherever the highest quality standards demand it."],
    ["Built with practitioners", "The platform is developed in collaboration with event managers, interpreters and transcribers, aiming for ease of use and a low threshold to entry."],
    ["Enterprise-grade by default", "ISO 27001-compliant EU data centres, 24/7 monitoring, redundant streams and a tier-one CDN — for events that cannot fail."],
  ];
  P("/about", "About us",
    "SabioCast has been reinventing multilingual live streaming since 2005 — making high-quality captions and simultaneous interpretation accessible for live video.",
    `${pageHero({ eyebrow: "About us", title: "Reinventing multilingual live streaming", intro: "Since 2005 we have led the way in top-notch, user-friendly streaming solutions, making high-quality captions and simultaneous interpretation accessible for live video. We have managed tens of thousands of events for clients all over the world." })}
<div class="bg-ink-950"><div class="container-x"><div class="relative -mt-4 aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
<img src="/images/about-team.jpg" alt="A multilingual broadcast in production" class="absolute inset-0 h-full w-full object-cover">
<div class="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent"></div></div></div><div class="h-16"></div></div>
${section(`<div class="grid gap-12 lg:grid-cols-2 lg:items-start">
${sectionHeading({ eyebrow: "Our mission", title: "Allow everyone to broadcast multilingual live streams to a global audience", intro: "We offer both a self-service SaaS platform and a fully managed service where our experts handle interpreter and captioner coordination. Whichever you choose, viewers anywhere in the world can watch your live stream and pick their preferred audio and caption language in our player." })}
<div class="reveal space-y-4" data-delay="100">${values.map((v) => `<div class="rounded-2xl border border-ink-100 bg-white p-6"><h3 class="text-base font-bold text-ink-900">${e(v[0])}</h3><p class="mt-2 text-sm leading-relaxed text-ink-600">${e(v[1])}</p></div>`).join("")}</div></div>`)}
${logoMarquee("Trusted by global brands and companies", "ink")}
${section(`${sectionHeading({ eyebrow: "History", title: "Two decades of firsts", align: "center" })}
<ol class="mx-auto mt-12 max-w-3xl space-y-6">${timeline.map((t, i) => `<li class="reveal flex gap-6" data-delay="${i * 50}"><span class="font-display text-xl font-bold text-brand-600">${e(t[0])}</span><p class="border-l border-ink-200 pl-6 text-sm leading-relaxed text-ink-700">${e(t[1])}</p></li>`).join("")}</ol>`, { tone: "muted" })}
${statBand([
      { value: "2005", label: "streaming since" },
      { value: "10,000s", label: "of events delivered" },
      { value: "50+", label: "languages supported" },
      { value: "EU", label: "ISO 27001 data centres" },
    ])}
${ctaSection("Work with us", "Start a free trial, or talk to the team about your next multilingual event.")}`);
}

/* ---- Contact ---- */
{
  const products = ["Multilingual Live Streaming", "On-site AI plan", "Multilingual Simulive Streaming", "Multilingual Live Webinar", "Live Streaming — single language", "Live Webinar — single language", "Simulive Streaming — single language", "SabioCast Learning"];
  const sources = ["Search engine", "Recommended", "Google Ads", "Social media", "Email", "Other"];
  const inp = "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";
  const field = (label, hint, control) =>
    `<label class="block"><span class="text-sm font-semibold text-ink-800">${e(label)}</span>${hint ? `<span class="mt-0.5 block text-xs text-ink-400">${e(hint)}</span>` : ""}<div class="mt-1.5">${control}</div></label>`;
  const form = `<form data-lead="contact" data-success="A member of the SabioCast team will reply to your business email within one working day." class="grid gap-5 rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
<p data-quote-banner hidden class="rounded-lg bg-accent-50 px-3 py-2 text-xs font-medium text-accent-700">You're requesting a quote. Tell us about your event and expected audience and we'll size a plan.</p>
<input type="text" name="company_url" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">
<div class="grid gap-5 sm:grid-cols-2">${field("Name", "", `<input name="name" required class="${inp}" autocomplete="name">`)}${field("Business email", "A business email is required", `<input name="email" required type="email" class="${inp}" autocomplete="email">`)}</div>
<div class="grid gap-5 sm:grid-cols-2">${field("Company or organisation", "You must represent a company or organisation", `<input name="company" required class="${inp}" autocomplete="organization">`)}${field("Company website", "Use your real company website", `<input name="website" required type="url" placeholder="https://" class="${inp}">`)}</div>
<div class="grid gap-5 sm:grid-cols-2">${field("Country", "", `<input name="country" required class="${inp}" autocomplete="country-name">`)}${field("Product of interest", "", `<select name="product" required class="${inp}"><option value="" disabled selected>Select a product</option>${products.map((p) => `<option>${e(p)}</option>`).join("")}</select>`)}</div>
${field("Your question", "", `<textarea name="question" required rows="4" class="${inp}"></textarea>`)}
<div class="grid gap-5 sm:grid-cols-2">${field("How did you hear about us?", "", `<select name="hearAbout" required class="${inp}"><option value="" disabled selected>Select an option</option>${sources.map((s) => `<option>${e(s)}</option>`).join("")}</select>`)}${field("How did you find us?", "", `<input name="findUs" class="${inp}">`)}</div>
<label class="flex items-start gap-2.5 text-xs text-ink-600"><input required type="checkbox" class="mt-0.5 h-4 w-4 rounded border-ink-300 accent-brand-600"><span>I agree to the <a href="/legal/privacy" class="font-semibold text-brand-700 underline">privacy policy</a> and <a href="/legal/terms" class="font-semibold text-brand-700 underline">terms of use</a>.</span></label>
<label class="flex items-start gap-2.5 text-xs text-ink-600"><input name="newsletter" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-ink-300 accent-brand-600"><span>Keep me updated with SabioCast product news (optional).</span></label>
<p data-form-error hidden class="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700"></p>
<button type="submit" class="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60">Send message</button>
</form>`;
  P("/contact", "Contact us", "Send the SabioCast team your questions about multilingual live streaming, plans, and managed services.",
    `${pageHero({ eyebrow: "Contact", title: "Let's talk about your event", intro: "Please send us your questions using the form. A member of the team will get back to you at your business email within one working day." })}
${section(`<div class="grid gap-12 lg:grid-cols-[1fr_1.7fr]">
<div class="reveal">
<h2 class="text-lg font-bold text-ink-900">SabioCast HQ</h2>
<address class="mt-3 text-sm not-italic leading-relaxed text-ink-600">${e(site.address.line1)}<br>${e(site.address.line2)}<br>${e(site.address.country)}</address>
<p class="mt-6 text-sm text-ink-600">General enquiries<br><a href="mailto:${site.email}" class="font-semibold text-brand-700">${e(site.email)}</a></p>
<div class="mt-8 rounded-2xl border border-ink-100 bg-ink-50 p-5 text-sm text-ink-600"><p class="font-semibold text-ink-900">Looking for a trial?</p><p class="mt-1">You can <a href="/free-trial" class="font-semibold text-brand-700 underline">request a trial account</a> directly — no sales call required.</p></div></div>
<div class="reveal" data-delay="100">${form}</div></div>`)}`);
}

/* ---- Free trial ---- */
{
  const inp = "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";
  const field = (label, hint, control) =>
    `<label class="block"><span class="text-sm font-semibold text-ink-800">${e(label)}</span>${hint ? `<span class="mt-0.5 block text-xs text-ink-400">${e(hint)}</span>` : ""}<div class="mt-1.5">${control}</div></label>`;
  const notes = [
    "A trial account is valid for 7 days by default",
    "Designed to test the SaaS platform, not to access an existing stream",
    "A business email is required — you must represent a company or organisation",
    "No credit card required",
  ];
  const form = `<form data-lead="trial" data-success="Once we've reviewed your details we'll email your trial account credentials. The trial is valid for 7 days." class="grid gap-5 rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
<input type="text" name="company_url" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">
<div class="grid gap-5 sm:grid-cols-2">${field("First name", "", `<input name="firstName" required class="${inp}" autocomplete="given-name">`)}${field("Last name", "", `<input name="lastName" required class="${inp}" autocomplete="family-name">`)}</div>
${field("Business email", "No gmail, yahoo or hotmail addresses", `<input name="email" required type="email" class="${inp}" autocomplete="email">`)}
<div class="grid gap-5 sm:grid-cols-2">${field("Company or organisation", "", `<input name="company" required class="${inp}" autocomplete="organization">`)}${field("Company website", "Use your real company website", `<input name="website" required type="url" placeholder="https://" class="${inp}">`)}</div>
<div class="grid gap-5 sm:grid-cols-2">${field("Country", "", `<input name="country" required class="${inp}" autocomplete="country-name">`)}${field("Product of interest", "", `<select name="product" required class="${inp}"><option value="" disabled selected>Select a product</option><option>Multilingual Live Streaming</option><option>Multilingual Live Webinar</option></select>`)}</div>
${field("Purpose of trial account", "Max 60 characters", `<input name="purpose" required maxlength="60" class="${inp}">`)}
<label class="flex items-start gap-2.5 text-xs text-ink-600"><input required type="checkbox" class="mt-0.5 h-4 w-4 rounded border-ink-300 accent-brand-600"><span>I agree to the <a href="/legal/privacy" class="font-semibold text-brand-700 underline">privacy policy</a> and <a href="/legal/terms" class="font-semibold text-brand-700 underline">terms of use</a>.</span></label>
<p data-form-error hidden class="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700"></p>
<button type="submit" class="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60">Request trial account</button>
</form>`;
  P("/free-trial", "Request a free trial account", "Test the SabioCast platform for 7 days. No credit card required. Business email required.",
    `${pageHero({ eyebrow: "Free trial", title: "Request a free trial account", intro: "Try the platform yourself. We recommend using the pricing page to size a plan before requesting a trial, so we can tailor the account to your use case." })}
${section(`<div class="grid gap-12 lg:grid-cols-[1fr_1.7fr]">
<div class="reveal"><h2 class="text-lg font-bold text-ink-900">Good to know</h2>
<ul class="mt-4 space-y-3">${notes.map((n) => `<li class="flex gap-3 text-sm text-ink-700"><span class="mt-0.5 shrink-0 text-brand-600">${check("h-5 w-5")}</span>${e(n)}</li>`).join("")}</ul>
<div class="mt-8 rounded-2xl border border-ink-100 bg-ink-50 p-5 text-sm text-ink-600">Need a hosted, managed event instead? <a href="/managed-service" class="font-semibold text-brand-700 underline">See our managed service</a>.</div></div>
<div class="reveal" data-delay="100">${form}</div></div>`)}`);
}

/* ---- FAQ ---- */
P("/faq", "FAQ", "Answers to the most common questions about SabioCast — delivery, languages, accuracy, recording and pricing.",
  `${pageHero({ eyebrow: "FAQ", title: "Frequently asked questions", intro: "Everything you need to know about multilingual live streaming with SabioCast. Can't find your answer? Contact us and we'll help." })}
${section(`<div class="space-y-16">${faqCategories
    .map(
      (cat, i) => `<div class="reveal grid gap-8 lg:grid-cols-[1fr_2fr]" data-delay="${i * 40}"><h2 class="text-2xl font-bold text-ink-900">${e(cat.title)}</h2>${faqAccordion(cat.items)}</div>`,
    )
    .join("")}</div>`)}
${ctaSection("Still have a question?", "Ask the team directly — we reply within one working day.")}`);

/* ---- Jobs ---- */
{
  const perks = ["Training budget and time to innovate", "Flexible hours and remote work", "Short decision lines, open culture", "Competitive salary with fringe benefits", "Work-life balance, genuinely", "Entrepreneurial spirit encouraged"];
  const must = ["Bachelor's/Master's in computer science or equivalent experience", "Proficiency in Java, Python and/or Go", "Comfortable with Linux and open source", "English and/or Dutch fluency", "Interest in online video technology"];
  const nice = ["HTML and JavaScript", "AI language model experience", "FFmpeg, HLS and DASH familiarity"];
  P("/jobs", "Jobs", "Join SabioCast — a growing Belgian B2B SaaS company building AI-powered multilingual live streaming.",
    `${pageHero({ eyebrow: "Jobs", title: "Build the future of multilingual video", intro: "SabioCast is a growing Belgian B2B SaaS company specialising in multilingual live streaming. We're looking for tech talent across a range of skill levels." })}
${section(`${sectionHeading({ eyebrow: "Culture & benefits", title: "Why work here" })}
<ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${perks.map((p, i) => `<li class="reveal flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-5 text-sm text-ink-700" data-delay="${(i % 3) * 60}"><span class="mt-0.5 shrink-0 text-brand-600">${check("h-5 w-5")}</span>${e(p)}</li>`).join("")}</ul>`)}
${section(`${sectionHeading({ eyebrow: "Open positions", title: "Roles we're hiring for" })}
<div class="mt-10 space-y-5"><div class="reveal rounded-2xl border border-ink-100 bg-white p-7">
<div class="flex flex-wrap items-start justify-between gap-4"><div><h3 class="text-xl font-bold text-ink-900">Backend Developer — SaaS Solutions</h3><p class="mt-1 text-sm text-ink-500">Full-time · Berchem / remote</p></div>${button("/contact?intent=job", "Apply", { variant: "ghost", icon: true })}</div>
<p class="mt-4 max-w-2xl text-sm leading-relaxed text-ink-600">Build high-performance applications in Linux environments, turning video workflows into AI-powered solutions with ownership across the whole development lifecycle.</p>
<div class="mt-6 grid gap-6 sm:grid-cols-2">
<div><p class="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">What you bring</p><ul class="mt-3 space-y-2">${must.map((m) => `<li class="flex gap-2 text-sm text-ink-700"><span class="mt-0.5 shrink-0 text-brand-600">${check("h-4 w-4")}</span>${e(m)}</li>`).join("")}</ul></div>
<div><p class="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">Nice to have</p><ul class="mt-3 space-y-2">${nice.map((m) => `<li class="flex gap-2 text-sm text-ink-700"><span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-300"></span>${e(m)}</li>`).join("")}</ul></div>
</div></div></div>
<p class="mt-8 text-sm text-ink-500">Don't see your role? Send us your CV and a short motivation anyway via the <a href="/contact" class="font-semibold text-brand-700 underline">contact form</a>.</p>`, { tone: "muted" })}`);
}

/* ---- Blog ---- */
{
  const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const [feat, ...rest] = posts;
  P("/blog", "News", "Product updates, how-tos and streaming technology insight from the SabioCast team.",
    `${pageHero({ eyebrow: "News", title: "Latest news", intro: "Product updates, how-tos and streaming technology insight from the SabioCast team." })}
${section(`<a href="/blog/${feat.slug}" class="reveal group grid gap-8 rounded-3xl border border-ink-100 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-[0_30px_70px_-35px_rgba(90,63,228,0.3)] md:grid-cols-2 md:p-8">
<div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 via-brand-800 to-ink-950"><div class="bg-grid absolute inset-0 opacity-30"></div><div class="flex aspect-[16/10] items-end p-6"><span class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">${e(feat.category)}</span></div></div>
<div class="flex flex-col justify-center"><p class="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">${fmt(feat.date)} · ${e(feat.readingTime)} read</p>
<h2 class="mt-3 text-2xl font-bold text-ink-900 group-hover:text-brand-700">${e(feat.title)}</h2>
<p class="mt-3 text-sm leading-relaxed text-ink-600">${e(feat.excerpt)}</p>
<span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">Read article ${arrow}</span></div></a>
<div class="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">${rest
      .map(
        (p, i) => `<a href="/blog/${p.slug}" class="reveal group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_50px_-24px_rgba(90,63,228,0.28)]" data-delay="${(i % 3) * 60}">
<p class="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">${fmt(p.date)} · ${e(p.category)}</p>
<h3 class="mt-3 flex-1 text-lg font-bold text-ink-900 group-hover:text-brand-700">${e(p.title)}</h3>
<p class="mt-2 text-sm leading-relaxed text-ink-600">${e(p.excerpt)}</p>
<span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">Read ${arrow}</span></a>`,
      )
      .join("")}</div>`)}
${ctaSection()}`);

  for (const post of posts) {
    const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
    P(`/blog/${post.slug}`, post.title, post.excerpt,
      `${pageHero({ eyebrow: `${post.category} · ${new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`, title: post.title, intro: post.excerpt })}
${section(`<article class="mx-auto max-w-2xl">${post.body.map((p) => `<p class="mt-5 text-[1.05rem] leading-relaxed text-ink-700 first:mt-0">${e(p)}</p>`).join("")}
<div class="mt-10 border-t border-ink-100 pt-6"><a href="/blog" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600"><span class="rotate-180">${arrow}</span> All news</a></div></article>`)}
${section(`<h2 class="text-2xl font-bold text-ink-900">More from the blog</h2>
<div class="mt-8 grid gap-5 md:grid-cols-3">${more.map((p) => `<a href="/blog/${p.slug}" class="group rounded-2xl border border-ink-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-200"><p class="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">${e(p.category)}</p><h3 class="mt-2 text-base font-bold text-ink-900 group-hover:text-brand-700">${e(p.title)}</h3></a>`).join("")}</div>`, { tone: "muted" })}
${ctaSection()}`);
  }
}

/* ---- Demos ---- */
{
  const demos = [
    { id: "multilingual", title: "Multilingual Live Streaming", body: "A live stream with several selectable audio languages and closed captions. Use the headphone menu to select audio and the CC menu for captions.", poster: "/images/remote-interpretation.jpg" },
    { id: "ai-speech", title: "Live AI Speech Translations and Subtitles", body: "Fully automatic AI speech translation and multilingual subtitles, generated in real time with natural-sounding AI voices.", poster: "/images/ai-speech.jpg" },
    { id: "accuracy", title: "Live AI Captions Accuracy Comparison", body: "The same live stream captioned automatically by SabioCast, YouTube and Vimeo — different speakers, accents and speech patterns, all unedited.", poster: "/images/ai-subtitles.jpg" },
    { id: "floor", title: "Live AI for Multilingual Floor", body: "AI captions and translations for a stream where multiple languages are spoken from the floor, each segment captioned natively then translated.", poster: "/images/multilingual-broadcasts.jpg" },
  ];
  P("/demos", "Multilingual Live Demo", "See SabioCast in action — any number of audio languages and closed captions, in an embeddable player, live and simulive.",
    `${pageHero({ eyebrow: "Live demo", title: "Any number of audio languages and closed captions", intro: "Our demo streams 3 times per hour, at :00, :20 and :40. Use the headphone menu to select audio languages and the CC menu for closed captions.", actions: button("/free-trial", "Try it yourself", { size: "lg", icon: true }) })}
${section(`<div class="mx-auto max-w-3xl">${videoFrame({ poster: "/images/demo-poster.jpg", label: "Watch the SabioCast multilingual live demo", youTubeId: site.demoVideoId || "" })}
<p class="mt-4 text-center text-sm text-ink-500">Embed this exact player in any site or platform with a single snippet.</p></div>`)}
${section(`${sectionHeading({ eyebrow: "Demo library", title: "What you can watch" })}
<div class="mt-10 grid gap-6 md:grid-cols-2">${demos
      .map(
        (d, i) => `<div id="${d.id}" class="reveal scroll-mt-24" data-delay="${(i % 2) * 70}">
${videoFrame({ poster: d.poster, label: d.title, youTubeId: site.demoVideoId || "" })}
<h3 class="mt-4 text-lg font-bold text-ink-900">${e(d.title)}</h3>
<p class="mt-2 text-sm leading-relaxed text-ink-600">${e(d.body)}</p>
${button("/free-trial", "Request access", { variant: "ghost", icon: true }).replace('class="', 'class="mt-4 ')}</div>`,
      )
      .join("")}</div>`, { tone: "muted" })}
${ctaSection()}`);
}

/* ---- Player ---- */
P("/player", "SabioCast Player", "A customisable HTML5 video player with smooth playback, adaptive bitrate streaming, automatic failover and multilingual audio and caption menus.",
  `${pageHero({ eyebrow: "SabioCast Player", title: "Elevate your viewing experience with a customisable HTML5 player", intro: "Built with the latest technology for smooth playback and zero buffering. Highly customisable, cross-device compatible, and embeddable via code or the JavaScript API. Included in every plan." })}
${section(`<div class="mx-auto max-w-3xl">${playerMock()}</div>`)}
${featureGrid({ eyebrow: "Player features", title: "One player, every scenario", tone: "muted", features: [
    { title: "Customisation", body: "Exhaustive control over styling and behaviour — autoplay, loop, buffer size and sharing options." },
    { title: "Interactive elements", body: "Event-status switching, overlay messaging and countdown timers before the stream begins." },
    { title: "Adaptive bitrate streaming", body: "Real-time transcoding into multiple resolutions for the best quality on any connection." },
    { title: "Automatic failover", body: "Switches between main and backup servers across geographical locations, with no viewer action." },
    { title: "Access control", body: "Viewing profiles enable geo-blocking and IP or domain restrictions." },
    { title: "Ad integration", body: "Works with ad servers for both live and VoD streams." },
  ] })}
${section(`<div class="rounded-2xl border border-ink-100 bg-ink-950 p-6 text-white">
<p class="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Embed snippet</p>
<pre class="mt-3 overflow-x-auto text-sm text-white/80"><code>${e(`<iframe
  src="https://play.sabiocast.com/embed/your-stream-id"
  allow="autoplay; fullscreen; picture-in-picture"
  allowfullscreen
  style="border:0;width:100%;aspect-ratio:16/9">
</iframe>`)}</code></pre></div>`)}
${ctaSection()}`);

/* ---- Docs ---- */
{
  const guides = [
    ["Getting started", "Create your first live event, choose an ingest protocol, and go live in minutes."],
    ["Multilingual live captions", "Configure AI caption languages, vocabularies and the real-time correction room."],
    ["AI speech translations", "Add AI voice languages, pick gender and dialect, and manage synchronisation."],
    ["Remote simultaneous interpretation", "Set up Translate@Home, distribute interpreter links, and run relay and handover."],
    ["Simulive streaming", "Upload, process and schedule pre-recorded video as a real live stream."],
    ["Recording & VoD", "Download multilingual recordings and publish Video on-Demand with captions."],
  ];
  const tags = ["OBS Studio", "Wirecast", "vMix", "StreamYard", "Restream", "Lightstream", "Haivision Makito", "Intinor", "Zoom", "MS Teams", "WebEx", "YouTube", "Facebook", "Twitch", "X"];
  P("/docs", "Documentation Center", "Guides, tutorials and API references for streaming, captioning, translation and the SabioCast player.",
    `${pageHero({ eyebrow: "Documentation", title: "Documentation Center", intro: "Everything you need to build with SabioCast — step-by-step guides, tutorials and API references. Create an account for the full, versioned documentation.", actions: button("/free-trial", "Get an account", { size: "lg", icon: true }) })}
${section(`${sectionHeading({ eyebrow: "Guides", title: "Start here" })}
<div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">${guides.map((g, i) => `<div class="reveal rounded-2xl border border-ink-100 bg-white p-6" data-delay="${(i % 3) * 60}"><h3 class="text-base font-bold text-ink-900">${e(g[0])}</h3><p class="mt-2 text-sm leading-relaxed text-ink-600">${e(g[1])}</p></div>`).join("")}</div>`)}
${section(`${sectionHeading({ eyebrow: "Player API", title: "Control the player from JavaScript", intro: "The SabioCast player exposes a JavaScript API for playback control, language selection, event hooks and analytics. Load the script, grab the instance, and listen for events." })}
<div class="mt-8 rounded-2xl border border-ink-100 bg-ink-950 p-6 text-white"><pre class="overflow-x-auto text-sm text-white/80"><code>${e(`<script src="https://play.sabiocast.com/player.js"></script>
<script>
  const player = SabioCast.create("#player", { streamId: "your-stream-id" });
  player.on("ready", () => player.setAudioLanguage("es"));
  player.on("languagechange", (lang) => console.log("now playing", lang));
</script>`)}</code></pre></div>`, { tone: "muted", id: "player-api" })}
${section(`${sectionHeading({ eyebrow: "Integrations", title: "Works with your existing stack", intro: "Broadcast from OBS, Wirecast, vMix, StreamYard, Restream and Lightstream. Ingest via RTMP or SRT. Simulcast to YouTube, Facebook, Twitch and X. Pull analytics and manage events through the REST API." })}
<div class="mt-8 flex flex-wrap gap-2.5">${tags.map((t) => `<span class="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-700">${e(t)}</span>`).join("")}</div>`, { id: "integrations" })}
${ctaSection()}`);
}

/* ---- Adaptive bitrate ---- */
P("/adaptive-bitrate-streaming", "Adaptive Bitrate Streaming", "Say goodbye to buffering. SabioCast transcodes every broadcast into multiple resolutions and delivers them over a global CDN with automatic quality switching.",
  `${pageHero({ eyebrow: "Adaptive bitrate streaming", title: "Say goodbye to buffering, hello to seamless streaming", intro: "SabioCast automatically adjusts video quality in real time to ensure a seamless viewing experience for your audience, even on fluctuating network conditions." })}
${section(`<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
${sectionHeading({ eyebrow: "How does it work?", title: "The power of adaptive bitrate streaming", intro: "Real-time transcoding converts your live broadcast into multiple resolutions — 1080p, 720p, 480p, 360p and 240p. The player analyses screen size, available bandwidth, memory, CPU and GPU, then switches dynamically between quality levels over the HLS protocol." })}
<div class="reveal space-y-3" data-delay="100">${[["1080p", 100], ["720p", 82], ["480p", 64], ["360p", 46], ["240p", 30]]
    .map(([res, w]) => `<div class="flex items-center gap-4"><span class="w-14 text-sm font-semibold text-ink-500">${res}</span><div class="h-2.5 flex-1 overflow-hidden rounded-full bg-ink-100"><div class="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-500" style="width:${w}%"></div></div></div>`)
    .join("")}</div></div>`)}
${featureGrid({ eyebrow: "Global CDN delivery", title: "Delivered as close to viewers as possible", tone: "muted", columns: 2, features: [
    { title: "Edge servers worldwide", body: "Streams are served from the region nearest each viewer, for low latency and high throughput." },
    { title: "Automatic transcoding", body: "Every broadcast is transcoded server-side into an adaptive ladder — you send one feed." },
    { title: "Redundancy built in", body: "Main and backup origins with automatic player failover keep the stream alive through encoder or network issues." },
    { title: "Any device", body: "The player adapts to the viewer's hardware and connection, from a phone on 3G to a 4K TV." },
  ] })}
${ctaSection()}`);

/* ---- Premium support ---- */
P("/premium-support", "Premium Support", "Autonomous use of the SabioCast platform with premium support — guaranteed response times, a service level, and a custom Slack channel.",
  `${pageHero({ eyebrow: "Premium Support", title: "Autonomous use of SabioCast, with premium support", intro: "Get the best of both worlds: run the platform yourself, and have our engineers on hand with guaranteed response times and a service level when it matters most.", actions: button("/contact?intent=quote", "Get a quote", { size: "lg", icon: true }) })}
${section(`<div class="grid gap-5 md:grid-cols-2">
<div class="reveal rounded-2xl border border-ink-100 bg-white p-7"><h2 class="text-lg font-bold text-ink-900">Included with every SaaS plan</h2>
<ul class="mt-4 space-y-3">${["Complete help centre with manuals, tutorials and FAQs", "Technical support by email (best effort)", "Assistance during Brussels office hours"].map((f) => `<li class="flex gap-3 text-sm text-ink-700"><span class="mt-0.5 shrink-0 text-ink-400">${check("h-5 w-5")}</span>${e(f)}</li>`).join("")}</ul></div>
<div class="reveal rounded-2xl border border-brand-200 bg-brand-50 p-7" data-delay="80"><h2 class="text-lg font-bold text-ink-900">Premium support add-on</h2>
<ul class="mt-4 space-y-3">${["Direct contact during live streams with instant availability", "Guaranteed response times for extended broadcasts (negotiable)", "Custom Slack channel to chat directly with support engineers", "Virtual meetings via Slack, Zoom, Teams or Google Meet", "Support during your testing phase", "A team of experienced streaming professionals"].map((f) => `<li class="flex gap-3 text-sm text-ink-800"><span class="mt-0.5 shrink-0 text-brand-600">${check("h-5 w-5")}</span>${e(f)}</li>`).join("")}</ul></div></div>`)}
${section(`${sectionHeading({ eyebrow: "Premium support vs managed service", title: "Which one do you need?" })}
<div class="mt-8 grid gap-5 md:grid-cols-2">
<div class="rounded-2xl border border-ink-100 bg-white p-6"><h3 class="font-bold text-ink-900">Premium support</h3><p class="mt-2 text-sm text-ink-600">You manage interpreters, captioners and live stream operations. SabioCast provides technical oversight and rapid assistance.</p></div>
<div class="rounded-2xl border border-ink-100 bg-white p-6"><h3 class="font-bold text-ink-900">Managed service</h3><p class="mt-2 text-sm text-ink-600">SabioCast sources and manages interpreters and captioners and runs the event with you — recommended if you're new to live streaming.</p>${button("/managed-service", "Managed service", { variant: "ghost", icon: true }).replace('class="', 'class="mt-4 ')}</div></div>
<p class="mt-6 text-sm text-ink-500">Pricing is a custom quote based on broadcast duration, scope and requirements. <a href="/contact?intent=quote" class="font-semibold text-brand-700 underline">Request one here.</a></p>`, { tone: "muted" })}
${ctaSection()}`);

/* ---- Managed service ---- */
P("/managed-service", "Managed Service", "Let SabioCast manage your multilingual event from start to finish — interpreter and captioner sourcing, testing, monitoring and live assistance.",
  `${pageHero({ eyebrow: "Managed Service", title: "Let us manage your event from start to finish", intro: "Deliver a flawless multilingual live stream without the stress. We source vetted interpreters and captioners, set up and test the platform, and monitor everything during the broadcast.", actions: button("/contact?intent=quote", "Get a quote", { size: "lg", icon: true }) })}
${section(`${sectionHeading({ eyebrow: "How we work", title: "Two phases, one seamless event" })}
<div class="mt-10 grid gap-5 md:grid-cols-2">
<div class="reveal rounded-2xl border border-ink-100 bg-white p-7"><h3 class="font-bold text-ink-900">Before the event</h3>
<ul class="mt-4 space-y-3">${["Scope assessment by email or virtual meeting", "Language service provider sourcing for your languages and subject", "Staff training and platform setup", "An advance testing opportunity"].map((f) => `<li class="flex gap-3 text-sm text-ink-700"><span class="mt-0.5 shrink-0 text-brand-600">${check("h-5 w-5")}</span>${e(f)}</li>`).join("")}</ul></div>
<div class="reveal rounded-2xl border border-ink-100 bg-white p-7" data-delay="80"><h3 class="font-bold text-ink-900">During the event</h3>
<ul class="mt-4 space-y-3">${["Final rehearsal and system check", "Live stream encoding verification", "Continuous monitoring of audio and captions", "Real-time management via Slack", "Multi-language viewer access"].map((f) => `<li class="flex gap-3 text-sm text-ink-700"><span class="mt-0.5 shrink-0 text-brand-600">${check("h-5 w-5")}</span>${e(f)}</li>`).join("")}</ul></div></div>`)}
${section(`<div class="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
${sectionHeading({ eyebrow: "Quality control", title: "Finding the right interpreters and captioners", intro: "We work with vetted language service providers who meet strict technical and linguistic quality standards, and who work in pairs for live events. Every event gets a dedicated project manager and a professional linguist quality review." })}
<div class="reveal rounded-2xl border border-ink-100 bg-white p-6" data-delay="100"><p class="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">Always included</p>
<ul class="mt-3 space-y-2.5">${["Dedicated project manager", "Support engineers for optimisation", "Professional linguist quality review", "Custom Slack channel access"].map((f) => `<li class="flex gap-2.5 text-sm text-ink-700"><span class="mt-0.5 shrink-0 text-brand-600">${check("h-4 w-4")}</span>${e(f)}</li>`).join("")}</ul></div></div>`, { tone: "muted" })}
${ctaSection()}`);

/* ---- Legal ---- */
for (const doc of legalDocs) {
  const nav = legalDocs
    .map((d) => `<li><a href="/legal/${d.slug}" class="text-sm ${d.slug === doc.slug ? "font-semibold text-brand-700" : "text-ink-600 hover:text-brand-700"}">${e(d.title)}</a></li>`)
    .join("");
  const secs = doc.sections
    .map((s) => `<section class="mt-10"><h2 class="text-lg font-bold text-ink-900">${e(s.h)}</h2>${s.p.map((p) => `<p class="mt-3 text-[0.98rem] leading-relaxed text-ink-600">${e(p)}</p>`).join("")}</section>`)
    .join("");
  P(`/legal/${doc.slug}`, doc.title, doc.intro,
    `${pageHero({ eyebrow: "Legal", title: doc.title, intro: `Last updated ${new Date(doc.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}` })}
${section(`<div class="grid gap-12 lg:grid-cols-[1fr_2.4fr]">
<nav class="reveal hidden lg:block"><p class="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">Legal documents</p><ul class="mt-4 space-y-2">${nav}</ul></nav>
<article class="reveal max-w-2xl" data-delay="80"><p class="text-[1.05rem] leading-relaxed text-ink-700">${e(doc.intro)}</p>${secs}
<p class="mt-12 border-t border-ink-100 pt-6 text-sm text-ink-500">Questions about this document? Email <a href="mailto:legal@sabiocast.com" class="font-semibold text-brand-700">legal@sabiocast.com</a>.</p></article></div>`)}`);
}

/* ---- 404 ---- */
{
  const html = layout({
    title: "Page not found",
    description: "The page you were looking for could not be found.",
    canonical: "/404",
    body: `<section class="relative flex min-h-[70vh] items-center overflow-hidden bg-ink-950 text-white">
<div class="bg-grid absolute inset-0 opacity-[0.12]"></div>
<div class="absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-600/25 blur-[120px]"></div>
<div class="container-x relative text-center">
<p class="font-display text-7xl font-bold text-gradient">404</p>
<h1 class="mt-4 text-2xl font-bold">This page couldn't be found</h1>
<p class="mx-auto mt-3 max-w-md text-white/60">The link may be broken, or the page may have moved. Let's get you back to something useful.</p>
<div class="mt-8 flex flex-wrap justify-center gap-3">${button("/", "Back home", { size: "lg", icon: true })}${button("/contact", "Contact us", { size: "lg", variant: "light" })}</div>
</div></section>`,
  });
  writeFileSync(join(OUT, "404.html"), html);
}

/* ---------------- emit ---------------- */
for (const p of pages) {
  write(p.route, layout({ title: p.title, description: p.description, body: p.body, canonical: p.route }));
}

// assets
cpSync(join(ROOT, "public"), OUT, { recursive: true });
mkdirSync(join(OUT, "js"), { recursive: true });
cpSync(join(ROOT, "sitegen", "assets", "main.js"), join(OUT, "js", "main.js"));
const cfg = {
  token: process.env.TELEGRAM_BOT_TOKEN || "",
  chatId: process.env.TELEGRAM_CHAT_ID || "",
};
writeFileSync(
  join(OUT, "js", "config.js"),
  `/* Generated by the build from .env.local — the Telegram bot token is PUBLIC in this static setup. */\nwindow.SABIOCAST_CONFIG = ${JSON.stringify(cfg)};\n`,
);
writeFileSync(
  join(OUT, "js", "config.example.js"),
  `/* Copy to config.js and fill in, or run \`npm run build\` with .env.local set. */\nwindow.SABIOCAST_CONFIG = { token: "", chatId: "" };\n`,
);
if (!cfg.token) console.warn("!  TELEGRAM_BOT_TOKEN not set — forms will show 'not configured'. Add it to .env.local");
// sitemap + robots
const routes = ["/404", ...pages.map((p) => p.route)].filter((r) => r !== "/404");
writeFileSync(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${SITE_URL}${p.route === "/" ? "/" : p.route + "/"}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`Generated ${pages.length} pages + 404 into dist/`);
