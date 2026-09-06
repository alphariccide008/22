/* Zero-dependency static file server for previewing the site (project root) */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const PORT = process.env.PORT || 4173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

async function tryFile(f) {
  try {
    const s = await stat(f);
    if (s.isFile()) return f;
  } catch {}
  return null;
}

// only the built site is browsable; never the project internals / secrets
const ALLOW = /^(images\/|js\/[\w.-]+\.js$|[\w-]+\.html$|icon\.svg$|sitemap\.xml$|robots\.txt$)/;

async function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  if (clean === "/" || clean === "") return join(ROOT, "index.html");
  const p = clean.replace(/^\/+/, "").replace(/\/+$/, "");
  if (p.includes("..")) return null;
  if (!ALLOW.test(p) && !ALLOW.test(p + ".html")) return null;
  return (
    (await tryFile(join(ROOT, p))) ||
    (await tryFile(join(ROOT, p + ".html"))) ||
    (await tryFile(join(ROOT, p, "index.html"))) ||
    null
  );
}

createServer(async (req, res) => {
  const file = await resolve(req.url || "/");
  if (!file) {
    const nf = await tryFile(join(ROOT, "404.html"));
    if (nf) {
      res.writeHead(404, { "Content-Type": TYPES[".html"] });
      res.end(await readFile(nf));
    } else {
      res.writeHead(404).end("Not found");
    }
    return;
  }
  try {
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(500).end("Server error");
  }
}).listen(PORT, () => console.log(`SabioCast preview → http://localhost:${PORT}`));
