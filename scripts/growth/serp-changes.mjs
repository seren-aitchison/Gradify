// Change control for how Gradify looks in search results. Titles and descriptions are changed on evidence, one at a
// time, and left long enough to measure: Google takes days to pick a change up, and CTR needs weeks to read.
//   node scripts/growth/serp-changes.mjs            what changed since the snapshot, and whether each change is logged
//   node scripts/growth/serp-changes.mjs --accept   update the snapshot (only when every change is logged and allowed)
//   tests/growth-changes.test.mjs runs the same check in CI
//
// Rules, for CURATED pages (home, hub pages, site homes, courses, features, tools, guides, comparisons, checklists,
// glossary, templates):
//   1. a changed title or description needs an entry in data/growth/serp-changes.json: { date, pages, field, reason,
//      evidence }, where evidence is the data behind it (e.g. "Search Console 28 days to 2026-11-20: 4,100 impressions,
//      0.6% CTR at position 3.1; Gradify's usual CTR there 6%")
//   2. the same page can't change again within COOLDOWN_DAYS of its last logged change, unless the entry has
//      `override` saying why (a factual error, a product change)
// Pages made from content (lessons, topics, key terms, questions, study plans) change when their content does and
// aren't covered. A change where only a number differs ("391 Free Lessons" → "392 Free Lessons") isn't either.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { audit } from "../seo-audit.mjs";

export const COOLDOWN_DAYS = 28;
export const CURATED = new Set(["home", "hub page", "site home", "course", "feature", "tool", "guide", "comparison", "checklist", "glossary", "template"]);
const SNAP = new URL("../../data/growth/serp-snapshot.json", import.meta.url), LOG = new URL("../../data/growth/serp-changes.json", import.meta.url);
const load = (u, d) => (existsSync(u) ? JSON.parse(readFileSync(u, "utf8")) : d);
const shape = (s) => String(s ?? "").replace(/\d[\d,.]*/g, "#");   // numbers don't count as a change

/** { path: [title, description] } of the curated, indexable pages now */
export async function current() {
  const { pages } = await audit();
  return Object.fromEntries(pages.filter((p) => p.indexable && CURATED.has(p.category)).sort((a, b) => a.path.localeCompare(b.path)).map((p) => [p.path, [p.title, p.description]]));
}

/** problems with the changes between `snap` and `now`, given the `log` of entries (pure) */
export function check(snap, now, log, today = new Date().toISOString().slice(0, 10)) {
  const changed = [], problems = [], day = (d) => Date.parse(`${d}T00:00:00Z`) / 864e5;
  for (const [p, [t, d]] of Object.entries(now)) {
    const was = snap[p]; if (!was) continue;
    const fields = [shape(was[0]) !== shape(t) && "title", shape(was[1]) !== shape(d) && "description"].filter(Boolean);
    if (!fields.length) continue;
    changed.push({ path: p, fields, from: was, to: [t, d] });
    const mine = log.filter((e) => e.pages.includes(p)).sort((a, b) => b.date.localeCompare(a.date));
    const entry = mine[0];
    if (!entry || day(entry.date) < day(today) - 7) { problems.push(`${p}: ${fields.join(" and ")} changed with no entry in data/growth/serp-changes.json in the last 7 days`); continue; }
    if (!String(entry.reason || "").trim() || !String(entry.evidence || "").trim()) problems.push(`${p}: the entry of ${entry.date} needs a reason and its evidence`);
    const before = mine[1];
    if (before && day(entry.date) - day(before.date) < COOLDOWN_DAYS && !String(entry.override || "").trim()) problems.push(`${p}: changed on ${before.date} and again on ${entry.date}, under ${COOLDOWN_DAYS} days apart: give the first change time to be measured, or add an override with the reason`);
  }
  return { changed, problems };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const now = await current(), snap = load(SNAP, null), log = load(LOG, []);
  if (!snap) { writeFileSync(SNAP, `${JSON.stringify(now, null, 1)}\n`); console.log(`First snapshot: ${Object.keys(now).length} curated pages.`); process.exit(0); }
  const { changed, problems } = check(snap, now, log);
  for (const c of changed) console.log(`${c.path}: ${c.fields.join(", ")}\n  was: ${c.from[c.fields[0] === "title" ? 0 : 1]}\n  now: ${c.to[c.fields[0] === "title" ? 0 : 1]}`);
  if (problems.length) { console.error(`\n${problems.join("\n")}`); process.exit(1); }
  if (process.argv.includes("--accept")) { writeFileSync(SNAP, `${JSON.stringify(now, null, 1)}\n`); console.log(`Snapshot updated (${Object.keys(now).length} curated pages).`); }
  else console.log(changed.length ? `\n${changed.length} logged change(s). Run with --accept to record them in the snapshot.` : "No changes to curated titles or descriptions.");
}
