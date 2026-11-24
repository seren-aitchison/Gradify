// Daily production check: is getgradify.com still findable? Read-only (GET and HEAD requests only).
//   node scripts/growth/monitor.mjs [--origin https://getgradify.com]
// Checks robots.txt, the sitemap index and every child sitemap, the status of every listed URL, and that the key
// pages still have a title, a self-canonical, structured data and no noindex. Writes a Markdown summary (to
// $GITHUB_STEP_SUMMARY in the scheduled workflow) and exits 1 only on something that stops pages being found.
// It reports; it changes nothing. Ranking moves are not checked here on purpose: daily rank noise isn't a signal.
import { appendFileSync } from "node:fs";

export const KEY_PAGES = ["", "features/", "learn/", "learn/biology/dna-replication/", "tools/", "guides/active-recall/", "scigradify/biology/", "lawgradify/", "features/notes-studio/"];

/** problems on one key page's HTML (pure) */
export function pageProblems(url, status, html) {
  const p = [];
  if (status !== 200) return [`${url}: HTTP ${status}`];
  if (!/<title>[^<]{5,}<\/title>/.test(html)) p.push(`${url}: no title`);
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) p.push(`${url}: noindex`);
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canon !== url) p.push(`${url}: canonical is ${canon || "missing"}`);
  if (!/application\/ld\+json/.test(html)) p.push(`${url}: no structured data`);
  return p;
}
/** problems with robots.txt (pure) */
export function robotsProblems(txt, origin) {
  const p = [];
  if (/^User-agent:\s*\*\s*$[\s\S]*?^Disallow:\s*\/\s*$/m.test(txt)) p.push("robots.txt blocks the whole site");
  if (!txt.includes(`Sitemap: ${origin}/sitemap.xml`)) p.push("robots.txt doesn't point to sitemap.xml");
  return p;
}

export async function monitor({ origin = "https://getgradify.com", fetchImpl = fetch, concurrency = 16 } = {}) {
  const UA = { "user-agent": "GradifyMonitor/1.0 (+https://getgradify.com/robots.txt)" };
  const get = (u, o = {}) => fetchImpl(u, { headers: UA, redirect: "manual", ...o });
  const critical = [], warnings = [], facts = [];
  const r = await get(`${origin}/robots.txt`);
  if (r.status !== 200) critical.push(`robots.txt: HTTP ${r.status}`); else critical.push(...robotsProblems(await r.text(), origin));
  const idx = await get(`${origin}/sitemap.xml`), idxText = idx.status === 200 ? await idx.text() : "";
  if (idx.status !== 200 || !/<sitemapindex/.test(idxText)) critical.push(`sitemap.xml: HTTP ${idx.status}${idxText && !/<sitemapindex/.test(idxText) ? ", not a sitemap index" : ""}`);
  const urls = [];
  for (const child of [...idxText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])) {
    const c = await get(child), t = c.status === 200 ? await c.text() : "";
    const ct = c.headers.get?.("content-type") || "";
    if (c.status !== 200 || !/<urlset/.test(t)) { critical.push(`${child}: HTTP ${c.status}`); continue; }
    if (!/xml/.test(ct)) warnings.push(`${child}: served as ${ct || "no content type"}`);
    if (t.charCodeAt(0) === 0xfeff) warnings.push(`${child}: starts with a byte-order mark`);
    const list = [...t.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]); urls.push(...list); facts.push(`${child.replace(origin, "")}: ${list.length} URLs`);
  }
  // every listed URL answers 200, without redirecting
  const bad = []; let i = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => { while (i < urls.length) { const u = urls[i++]; try { const h = await get(u, { method: "HEAD" }); if (h.status !== 200) bad.push(`${u}: HTTP ${h.status}`); } catch (e) { bad.push(`${u}: ${e.message}`); } } }));
  if (bad.length > Math.max(5, urls.length * 0.01)) critical.push(`${bad.length} of ${urls.length} sitemap URLs don't answer 200`); else if (bad.length) warnings.push(...bad);
  // the key pages
  for (const k of KEY_PAGES) {
    const u = `${origin}/${k}`, t0 = Date.now();
    try { const res = await get(u); const html = res.status === 200 ? await res.text() : ""; const ms = Date.now() - t0; const p = pageProblems(u, res.status, html); (k === "" ? critical : warnings).push(...p); facts.push(`/${k}: ${res.status}, ${ms} ms`); }
    catch (e) { critical.push(`${u}: ${e.message}`); }
  }
  const build = await get(`${origin}/build.txt`).then((x) => (x.status === 200 ? x.text() : null)).catch(() => null);
  return { critical, warnings, facts, urls: urls.length, build: build?.trim() || null, checked: new Date().toISOString() };
}

export function summary(m) {
  return `## Gradify daily search check (${m.checked.slice(0, 16).replace("T", " ")} UTC)

${m.critical.length ? `### Needs attention now\n\n${m.critical.map((x) => `- ${x}`).join("\n")}` : "Nothing is stopping pages being found."}

- ${m.urls} URLs in the sitemaps · live build ${m.build ? `\`${m.build.slice(0, 8)}\`` : "unknown"}
${m.facts.map((x) => `- ${x}`).join("\n")}

${m.warnings.length ? `### Worth a look\n\n${m.warnings.slice(0, 50).map((x) => `- ${x}`).join("\n")}${m.warnings.length > 50 ? `\n- … and ${m.warnings.length - 50} more` : ""}` : ""}

Indexing and rankings come from Search Console, weekly, not from this check (docs/growth/PLAYBOOK.md).
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const i = process.argv.indexOf("--origin"), m = await monitor({ origin: i > 0 ? process.argv[i + 1] : undefined });
  const md = summary(m); console.log(md);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
  process.exit(m.critical.length ? 1 : 0);
}
