// Lesson readiness: which lessons are worth a search page of their own, and which units to add next to the lesson
// pages pilot (scripts/seo/lessons.mjs, PILOT). It builds no pages; it tells you where to scale and what to fix.
//   node scripts/growth/lesson-readiness.mjs     write docs/growth/CONTENT-BACKLOG.md
//
// Scaling follows docs/SEO.md ("Scaling the lesson pages"): wait 2–3 weeks after a release, check the lessons
// sitemap's indexed count in Search Console, then add a subject's units a few hundred pages at a time. This file decides
// WHICH units go next: the ones where most lessons clear the standalone-value floor below, in the subjects students
// search most (ORDER), so the first pages Google sees are the strongest.
//
// The floor (stricter than the pilot's 250-word noindex line, on purpose: it's the bar for a page to win a search):
//   - MIN_EXPLAIN+ words of explanation (lead, paragraphs, lists, key point)
//   - MIN_PAGE+ words a reader sees (with the worked example, mistakes, diagram captions, explained practice)
//   - a worked example or a diagram, a common mistake, and MIN_QUESTIONS+ practice questions with explanations
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { parseNotes } from "../../kit/course/notes.js";
import { PILOT } from "../seo/lessons.mjs";

const root = new URL("../../", import.meta.url);
const json = (p) => JSON.parse(readFileSync(new URL(p, root), "utf8"));
const DIAGRAMS = json("kit/diagrams/manifest.json");

// the order subjects are considered in: the highest-demand school and university subjects first (judgement; re-rank
// with Search Console once the lessons sitemap has data)
export const ORDER = ["biology", "chemistry", "physics", "maths", "psychology", "medicine", "sociology", "history", "literature", "law", "ecology", "business", "finance", "engineering", "nursing", "pharmacy", "sport", "music", "art", "health", "veterinary", "dentistry"];
export const MIN_EXPLAIN = 150, MIN_PAGE = 300, MIN_QUESTIONS = 3, READY_SHARE = 0.8, BATCH = 300;

const plain = (s) => String(s ?? "").replace(/\*\*|`|\^\{|_\{|\{|\}/g, "").replace(/\s+/g, " ").trim();
const words = (s) => plain(s).split(" ").filter(Boolean).length;
const deep = (o) => (typeof o === "string" ? words(o) : Array.isArray(o) ? o.reduce((m, x) => m + deep(x), 0) : o && typeof o === "object" ? Object.entries(o).reduce((m, [k, v]) => m + (k === "t" || k === "id" ? 0 : deep(v)), 0) : 0);
const SMALL = new Set(["a", "an", "and", "as", "at", "by", "for", "in", "of", "on", "or", "the", "to", "vs", "with", "from", "into"]);
/** "DNA replication and the cell cycle" → "DNA Replication and the Cell Cycle" (acronyms and symbols kept) */
export const titleCase = (s) => plain(s).split(" ").map((w, i) => (i && SMALL.has(w.toLowerCase()) ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1))).join(" ");

/** the floor, measured on what a reader of the page sees; `missing` lists what's short ([] = ready) */
export function measure(L) {
  const t = new Set(L.blocks.map((b) => b.t)), qs = L.mcq.filter((q) => q.why);
  const explain = words(L.lead) + deep(L.blocks.filter((b) => ["p", "ul", "key", "h", "eq"].includes(b.t)));
  const page = explain + deep(L.blocks.filter((b) => ["ex", "pit"].includes(b.t))) + L.blocks.filter((b) => b.t === "dg").reduce((m, b) => m + words(DIAGRAMS[b.id]?.caption), 0) + qs.reduce((m, q) => m + words(q.q) + words(q.right) + words(q.why), 0);
  const missing = [];
  if (explain < MIN_EXPLAIN) missing.push(`${MIN_EXPLAIN - explain} more words of explanation`);
  if (page < MIN_PAGE) missing.push(`${MIN_PAGE - page} more words in all`);
  if (!t.has("ex") && !t.has("dg")) missing.push("a worked example or a diagram");
  if (!t.has("pit")) missing.push("a common mistake");
  if (qs.length < MIN_QUESTIONS) missing.push(`${MIN_QUESTIONS - qs.length} more practice question(s) with an explanation`);
  return { explain, page, missing };
}

/** every lesson of the courses in `slugs` (default: all live), parsed and measured, with its unit and course */
export async function lessonsOf(slugs = null) {
  const cat = json("kit/api/v1/catalogue.json"), out = [];
  for (const c of cat.courses.filter((x) => (!slugs || slugs.includes(x.slug)) && ["live", "beta"].includes(x.status) && x.page)) {
    const api = json(`kit/api/v1/courses/${c.slug}.json`);
    for (const u of api.units.filter((x) => x.written)) {
      let parsed; try { parsed = parseNotes((await import(new URL(`kit/courses/${c.slug}/notes/${u.id}.js`, root))).default); } catch { continue; }
      u.lessons.forEach((meta, i) => { const L = parsed.find((p) => p.title === meta.title) || parsed[i]; if (L) out.push({ c: { slug: c.slug, name: api.name, page: c.page }, u: { id: u.id, n: u.n, title: u.title }, id: meta.id, L, m: measure(L), inPilot: (PILOT[c.slug] || []).includes(u.id) }); });
    }
  }
  return out;
}

/** units outside the pilot, ranked: subject order, then share of lessons that clear the floor; the next batch picked */
export function plan(lessons) {
  const units = new Map();
  for (const x of lessons.filter((y) => !y.inPilot)) { const k = `${x.c.slug}/${x.u.id}`; const cur = units.get(k) || { slug: x.c.slug, course: x.c.name, id: x.u.id, n: x.u.n, title: x.u.title, lessons: 0, ready: 0 }; cur.lessons++; if (!x.m.missing.length) cur.ready++; units.set(k, cur); }
  const rank = (s) => { const i = ORDER.indexOf(s); return i < 0 ? ORDER.length : i; };
  const all = [...units.values()].map((u) => ({ ...u, share: u.ready / u.lessons })).sort((a, b) => rank(a.slug) - rank(b.slug) || b.share - a.share || a.n - b.n);
  const next = []; let pages = 0;
  for (const u of all.filter((x) => x.share >= READY_SHARE)) { if (pages + u.lessons > BATCH) break; next.push(u); pages += u.lessons; }
  return { units: all, next, pages };
}

export function backlogMd(lessons, { units, next, pages }) {
  const below = lessons.filter((x) => x.m.missing.length), ready = lessons.length - below.length;
  const freq = new Map(); for (const x of below) for (const m of x.m.missing) { const k = m.replace(/^\d+ /, "N "); freq.set(k, (freq.get(k) || 0) + 1); }
  const bySub = new Map(); for (const x of lessons) { const s = bySub.get(x.c.name) || [0, 0]; s[0]++; if (!x.m.missing.length) s[1]++; bySub.set(x.c.name, s); }
  return `# Lesson readiness and content backlog

Generated by \`node scripts/growth/lesson-readiness.mjs\`. It builds no pages: it says which units to add next to the lesson pages pilot (\`PILOT\` in \`scripts/seo/lessons.mjs\`) and what the other lessons need.

**Floor for a lesson to deserve its own search page:** ${MIN_EXPLAIN}+ words of explanation, ${MIN_PAGE}+ words in all, a worked example or diagram, a common mistake and ${MIN_QUESTIONS}+ practice questions with explanations. ${ready.toLocaleString("en-GB")} of ${lessons.length.toLocaleString("en-GB")} written lessons clear it.

## The next batch to add to PILOT

Only after the current pilot is indexing well (docs/SEO.md, "Scaling the lesson pages"). Units where at least ${Math.round(READY_SHARE * 100)}% of lessons clear the floor, in subject-demand order, up to ${BATCH} pages:

${next.length ? `| Course | Unit | Lessons | Clear the floor |\n|---|---|---|---|\n${next.map((u) => `| ${u.course} (\`${u.slug}\`) | ${u.id}: ${u.title} | ${u.lessons} | ${u.ready} |`).join("\n")}\n\n${pages} pages. In \`PILOT\`: ${[...new Set(next.map((u) => u.slug))].map((s) => `\`${s}: [${next.filter((u) => u.slug === s).map((u) => `"${u.id}"`).join(", ")}]\``).join(", ")}.` : "No unit is ready yet."}

## Ready by subject

| Subject | Lessons | Clear the floor |
|---|---|---|
${[...bySub].sort((a, b) => b[1][1] / b[1][0] - a[1][1] / a[1][0]).map(([n, [t, r]]) => `| ${n} | ${t} | ${r} (${Math.round((100 * r) / t)}%) |`).join("\n")}

## What's most often missing

${[...freq].sort((a, b) => b[1] - a[1]).map(([k, n]) => `- ${n.toLocaleString("en-GB")} × ${k}`).join("\n")}

The biggest single lever: explained practice questions. Many maths and physics lessons have fewer than ${MIN_QUESTIONS}.

## Lessons below the floor in the top subjects

${ORDER.slice(0, 5).map((s) => { const list = below.filter((x) => x.c.slug === s); return list.length ? `### ${list[0].c.name} (${list.length})\n\n| Lesson | Unit | Missing |\n|---|---|---|\n${list.map((x) => `| ${x.L.title} | ${x.u.id}: ${x.u.title} | ${x.m.missing.join("; ")} |`).join("\n")}` : ""; }).filter(Boolean).join("\n\n")}
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const lessons = await lessonsOf(), p = plan(lessons);
  mkdirSync(new URL("docs/growth/", root), { recursive: true });
  writeFileSync(new URL("docs/growth/CONTENT-BACKLOG.md", root), backlogMd(lessons, p));
  console.log(`${lessons.length} lessons, ${lessons.filter((x) => !x.m.missing.length).length} clear the floor; next batch: ${p.next.length} units, ${p.pages} pages.`);
}
