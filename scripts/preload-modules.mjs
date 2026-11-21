// Every page lists the JavaScript modules it will need, so the browser fetches them all at once instead of one level of
// imports at a time. A course page imports course.js, which imports about 60 modules, which import more: four
// round trips in a row before the course can render (about 2s on GitHub Pages). With <link rel="modulepreload"> for the
// whole static import graph, they all start with the first one.
//
// Only static imports are listed (import … from "…" and export … from "…"); dynamic import() stays lazy on purpose
// (the 3D island, the globe, the labs, the LifeOS tour on the homepage).
//   node scripts/preload-modules.mjs           rewrite every page's preload list
//   node scripts/preload-modules.mjs --check   exit 1 if any page's list is out of date (tests/smooth-load.test.mjs)
import { readFile, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
export const START = "<!-- module-preload: written by scripts/preload-modules.mjs; run it after changing imports -->";
export const END = "<!-- /module-preload -->";
// pages that aren't published as they are (templates are copied by scripts/new-site.mjs, then synced here)
const SKIP = /^(kit\/templates|docs|tests|scripts|supabase|node_modules)\//;

// the static imports in a module's source: relative or root-absolute paths only
const STATIC = /^\s*(?:import|export)\s+(?:[^"';]*?\s+from\s+)?["']([^"']+)["']/gm;
export const importsOf = (src) => [...src.matchAll(STATIC)].map((m) => m[1]).filter((s) => s.startsWith(".") || s.startsWith("/"));
const toFile = (spec, fromDir) => (spec.startsWith("/") ? resolve(ROOT, "." + spec) : resolve(fromDir, spec));

/** every module a page loads statically, entries first, then breadth first (the order the browser would find them) */
export function moduleGraph(pagePath, html) {
  const dir = dirname(pagePath);
  const entries = [];
  let absolute = false;
  // inline module scripts' imports, and module scripts with a src
  for (const m of html.matchAll(/<script\b[^>]*type="module"[^>]*>([\s\S]*?)<\/script>/g)) {
    const src = m[0].match(/\ssrc="([^"]+)"/);
    if (src) { if (!/^https?:/.test(src[1])) { entries.push(toFile(src[1], dir)); absolute ||= src[1].startsWith("/"); } }
    else for (const s of importsOf(m[1])) { entries.push(toFile(s, dir)); absolute ||= s.startsWith("/"); }
  }
  const seen = new Set(), order = [], queue = [...entries];
  while (queue.length) {
    const f = queue.shift();
    if (seen.has(f)) continue;
    seen.add(f);
    if (!existsSync(f)) continue;
    order.push(f);
    for (const s of importsOf(readFileSync(f, "utf8"))) queue.push(toFile(s, dirname(f)));
  }
  order.absolute = absolute;   // a page that addresses its own scripts from the root (404.html) gets root paths too
  return order;
}

/** the page with its preload block rewritten (or added, before the first script in <head>); unchanged if it has none */
export function withPreloads(pagePath, html) {
  const clean = html.replace(new RegExp(`\\n?[ \\t]*${START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`), "");
  const files = moduleGraph(pagePath, clean);
  if (!files.length) return clean;
  const dir = dirname(pagePath);
  const href = (f) => {
    if (files.absolute) return "/" + relative(ROOT, f).split(sep).join("/");
    const r = relative(dir, f).split(sep).join("/"); return r.startsWith(".") ? r : `./${r}`;
  };
  const head = clean.slice(0, clean.indexOf("</head>"));
  // before the first script in <head> other than the theme script, which stays straight after the base stylesheet
  const at = head.search(/\n[ \t]*<script\b(?![^>]*theme-boot\.js)/);
  const pos = at >= 0 ? at : head.length;
  const indent = (clean.slice(pos + 1).match(/^[ \t]*/) || ["  "])[0] || "  ";
  const block = `\n${indent}${START}\n${files.map((f) => `${indent}<link rel="modulepreload" href="${href(f)}">`).join("\n")}\n${indent}${END}`;
  return clean.slice(0, pos) + block + clean.slice(pos);
}

export function pages() {
  return execSync("git ls-files '*.html'", { cwd: ROOT, encoding: "utf8" }).trim().split("\n").filter((p) => p && !SKIP.test(p));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const check = process.argv.includes("--check");
  const stale = [];
  let changed = 0, files = 0;
  for (const p of pages()) {
    const path = resolve(ROOT, p), html = await readFile(path, "utf8"), next = withPreloads(path, html);
    if (next === html) continue;
    if (check) stale.push(p);
    else { await writeFile(path, next); changed++; files += (next.match(/rel="modulepreload"/g) || []).length; }
  }
  if (check) {
    if (stale.length) { console.error(`Module preload lists out of date in ${stale.length} pages (run node scripts/preload-modules.mjs): ${stale.slice(0, 10).join(", ")}`); process.exit(1); }
    console.log("Module preload lists are up to date.");
  } else console.log(`Rewrote ${changed} pages (${files} preloads).`);
}
