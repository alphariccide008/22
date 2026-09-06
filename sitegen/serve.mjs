/* Zero-dependency static file server for previewing ./dist */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = join(fileURLToPath(new URL(".", import.meta.url)), "..", "dist");
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

async function resolve(urlPath) {
  let p = decodeURIComponent(urlPath.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  let file = join(DIST, p);
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, "index.html");
    return file;
  } catch {
    // try clean-url -> /foo => /foo/index.html
    try {
      const alt = join(DIST, p, "index.html");
      await stat(alt);
      return alt;
    } catch {
      return null;
    }
  }
}

createServer(async (req, res) => {
  const file = await resolve(req.url || "/");
  if (!file) {
    try {
      const nf = await readFile(join(DIST, "404.html"));
      res.writeHead(404, { "Content-Type": TYPES[".html"] });
      res.end(nf);
    } catch {
      res.writeHead(404).end("Not found");
    }
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500).end("Server error");
  }
}).listen(PORT, () => {
  console.log(`SabioCast static preview → http://localhost:${PORT}`);
});
