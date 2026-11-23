// After `next build` (trailingSlash: true): keep the legacy .html URLs, and generate the service worker's offline list
// from what was actually built.
import { readFileSync, writeFileSync, copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
const OUT = "out";
// 1. Legacy URLs: Gradify's top-level pages have always been /privacy.html, /pricing.html … GitHub Pages can't redirect,
//    so each is written as a real file beside the folder Next made (privacy/index.html stays for client navigation).
const LEGACY = ["privacy"];
for (const p of LEGACY) copyFileSync(join(OUT, p, "index.html"), join(OUT, `${p}.html`));
// 2. The service worker: the existing sw.js, with SHELL rewritten to what this build published: the Next pages, their
//    JS and CSS chunks, and the kit files the existing list names that exist. Anything missing would fail install.
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const sw = readFileSync("public/sw.js", "utf8");
const m = sw.match(/const SHELL = \[([\s\S]*?)\n\];/);
const old = [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
const kept = old.filter((u) => u === "./" || existsSync(join(OUT, u)));
const next = walk(join(OUT, "_next/static")).map((p) => relative(OUT, p));
const pages = walk(OUT).filter((p) => p.endsWith(".html") && !p.includes("_not-found") && !p.startsWith(join(OUT, "kit")) && !p.startsWith(join(OUT, "assets"))).map((p) => relative(OUT, p).replace(/(^|\/)index\.html$/, "$1") || "./");
const shell = [...new Set([...kept, ...pages, ...next])];
writeFileSync(join(OUT, "sw.js"), sw.replace(m[0], `const SHELL = ${JSON.stringify(shell, null, 0)};`));
console.log(`legacy .html: ${LEGACY.length}; SHELL ${old.length} → ${shell.length} (${old.length - kept.length + 1} dropped as not built, ${pages.length} pages, ${next.length} Next chunks)`);
