// The keyword opportunity database: every search Gradify could win, the one page that should win it, and why it's a
// priority. Built from what Gradify knows, then sharpened by what Google measures:
//   curriculum    every lesson in the learn library is a topic students search for (candidate: demand unvalidated)
//   features      every feature page (candidate)
//   intent map    the hand-made clusters in scripts/seo/keywords.mjs (demand and competition are estimates)
//   Search Console  real queries with impressions, clicks, CTR and position (measured)
//   Keyword Planner Google's monthly-search ranges and competition (planning data)
// Every number says where it came from. Nothing is invented: a candidate with no data has demand "unknown".
//   node scripts/growth/opportunities.mjs     write data/growth/opportunities.json and docs/growth/OPPORTUNITIES.md
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { CLUSTERS } from "../seo/keywords.mjs";
import { FEATURE_PAGES } from "../seo/features.mjs";
import { FEATURES, featureSlug } from "../../kit/data/features.js";
import { learnLibrary, titleCase } from "../seo/learn.mjs";
import { gscRows, keywordPlanner } from "./sources.mjs";
import { seasonsOf } from "./seasons.mjs";

const ORIGIN = "https://getgradify.com";
export const norm = (s) => String(s).toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();

/** what the searcher wants to do */
export function intentOf(q) {
  const s = norm(q);
  if (/\bgradify\b/.test(s)) return "navigational";
  if (/\b(calculator|generator|maker|template|converter|planner|timer|countdown|checker|to (flashcards|notes|mind map|text|cheat sheet))\b/.test(s)) return "do";
  if (/\b(vs|versus|alternative|alternatives|best|compare|comparison|like)\b/.test(s)) return "compare";
  if (/^(what|how|why|when|which|who|explain|define|difference)\b/.test(s) || /\b(explained|meaning|definition|examples?)\b/.test(s)) return "learn: question";
  if (/\b(revision|revise|notes|practice|questions|past papers?|quiz|flashcards?|worksheet)\b/.test(s)) return "learn: revise";
  return "learn: topic";
}
/** who is searching, from the words they use (unknown when the words don't say) */
export function audienceOf(q) {
  const s = norm(q);
  if (/\bgcse|year (10|11)|ks4|nat ?5\b/.test(s)) return "GCSE";
  if (/\ba ?level|year (12|13)|ks5|higher\b/.test(s)) return "A level";
  if (/\b(university|uni|undergrad|degree|module|lecture|dissertation|finals|seminar)\b/.test(s)) return "university";
  if (/\b(phd|masters|postgrad|thesis|viva)\b/.test(s)) return "postgraduate";
  if (/\b(sqe|nmc|gphc|cpd|professional|nursing|pharmacy|medical school)\b/.test(s)) return "professional";
  return "unknown";
}
/** where the searcher probably is, from UK or US vocabulary (most phrases don't say) */
export function geographyOf(q) {
  const s = norm(q);
  if (/\b(gcse|a level|revision|revise|year (7|8|9|10|11|12|13)|maths|ucas|freshers|mock exams?|sixth form|timetable|aqa|ocr|edexcel|wjec|sqa)\b/.test(s)) return "UK";
  if (/\b(sat|act|ap |gpa|college|freshman|sophomore|midterm|math\b|semester)\b/.test(s)) return "US / international";
  return "any";
}

const DEST_KIND = (u) => /\/features\/|\/tools\/|\/(pdf-to-flashcards|lecture-notes-to-mind-map|notes-to-cheat-sheet|youtube-to-flashcards|notes-to-study-chant)\//.test(u) ? "tool or feature"
  : /\/learn\//.test(u) ? "lesson" : /\/[a-z]+gradify\//.test(u) ? "site or course" : /\/(guides|vs|compare)\//.test(u) ? "guide" : "other";
// how likely a visit from this page leads to a learner using Gradify (judgement, stated in the docs)
const CONVERSION = { "tool or feature": 1, "site or course": 0.9, lesson: 0.8, guide: 0.6, other: 0.5 };
const INTENT_VALUE = { do: 1, "learn: revise": 0.9, "learn: question": 0.8, compare: 0.8, "learn: topic": 0.6, navigational: 0.3 };
const COMP = { low: 1, medium: 0.6, high: 0.3 };

/**
 * Priority, 0–100: demand × winnability × intent × conversion × readiness. Demand uses the best source available:
 * Search Console impressions (measured), then Keyword Planner's range, then an estimate tier at half weight, then
 * unknown (a small floor, so unvalidated candidates sort below anything with evidence). See docs/growth/PLAYBOOK.md.
 */
export function score(o) {
  const d = o.demand;
  const demand = d.source === "search-console" ? Math.min(1, Math.log10(1 + d.value) / 4) : d.source === "keyword-planner" ? Math.min(1, Math.log10(1 + d.value) / 4.5)
    : d.source === "estimate" ? { high: 0.6, medium: 0.4, low: 0.2 }[d.value] * 0.5 : 0.08;
  let win = COMP[o.competition.value] ?? 0.5;
  // already ranking just off page one: the quickest wins there are
  if (o.ranking?.position >= 4 && o.ranking.position <= 20) win = Math.min(1, win * 1.5);
  const readiness = o.destination ? 1 : 0.5;
  return Math.round(demand * win * (INTENT_VALUE[o.intent] ?? 0.6) * (CONVERSION[DEST_KIND(o.destination || "")] ?? 0.5) * readiness * 1000) / 10;
}

export async function buildOpportunities({ gsc = gscRows(), kp = keywordPlanner() } = {}) {
  const lib = await learnLibrary(), rows = new Map();
  const add = (phrase, o) => { const k = norm(phrase); if (!k) return; const prev = rows.get(k); if (!prev || (prev.origin !== "search-console" && o.origin === "search-console")) rows.set(k, { phrase: k, ...o }); };
  for (const c of CLUSTERS) for (const q of c.queries) add(q, { origin: "intent map", cluster: c.cluster, destination: `${ORIGIN}/${c.dest}`, demand: { value: c.demand, source: "estimate" }, competition: { value: c.competition, source: "estimate" } });
  for (const f of FEATURES) { const p = FEATURE_PAGES[featureSlug(f)]; if (p && !p.owner && f.plan !== "pro") add(p.title.replace(/\s*\(.*\)$/, ""), { origin: "feature", cluster: f.n, destination: `${ORIGIN}/features/${featureSlug(f)}/`, demand: { value: null, source: "unknown" }, competition: { value: null, source: "unknown" } }); }
  for (const x of lib.live) add(titleCase(x.L.title), { origin: "curriculum", cluster: x.c.name, destination: `${ORIGIN}${x.href}`, demand: { value: null, source: "unknown" }, competition: { value: null, source: "unknown" } });
  // measured queries: the page Google already shows for them is their destination unless a mapped one exists
  const byQuery = new Map();
  for (const r of gsc.filter((x) => x.query)) { const k = norm(r.query), cur = byQuery.get(k) || { impressions: 0, clicks: 0, posSum: 0, pages: new Map() }; cur.impressions += r.impressions || 0; cur.clicks += r.clicks || 0; cur.posSum += (r.position || 0) * (r.impressions || 0); if (r.page) cur.pages.set(r.page, (cur.pages.get(r.page) || 0) + (r.impressions || 0)); byQuery.set(k, cur); }
  for (const [k, m] of byQuery) {
    const top = [...m.pages].sort((a, b) => b[1] - a[1])[0]?.[0] || null, prev = rows.get(k);
    rows.set(k, { ...(prev || { phrase: k, cluster: null, competition: { value: null, source: "unknown" } }), origin: prev ? `${prev.origin} + search-console` : "search-console", destination: prev?.destination || top,
      demand: { value: m.impressions, source: "search-console", unit: "impressions / 28 days" }, ranking: { page: top, position: m.impressions ? Math.round((m.posSum / m.impressions) * 10) / 10 : null, clicks: m.clicks, impressions: m.impressions, ctr: m.impressions ? m.clicks / m.impressions : null, source: "search-console" } });
  }
  for (const r of kp) { const o = rows.get(norm(r.phrase)); if (!o) continue; if (o.demand.source !== "search-console") o.demand = { value: r.monthly, source: "keyword-planner", unit: "avg monthly searches (Google's range)" }; if (r.competition) o.competition = { value: r.competition, source: "keyword-planner (advertiser competition)" }; }
  const out = [...rows.values()].map((o) => ({
    ...o, intent: intentOf(o.phrase), audience: audienceOf(`${o.phrase} ${o.cluster || ""}`), geography: geographyOf(o.phrase), seasons: seasonsOf(`${o.phrase} ${o.destination || ""}`),
    conversionPotential: DEST_KIND(o.destination || ""), measured: o.demand.source === "search-console" || o.demand.source === "keyword-planner",
  }));
  for (const o of out) o.priority = score(o);
  return out.sort((a, b) => b.priority - a.priority || a.phrase.localeCompare(b.phrase));
}

export function opportunitiesMd(list, date) {
  const measured = list.filter((o) => o.measured), est = list.filter((o) => !o.measured && o.demand.source === "estimate"), cand = list.filter((o) => o.demand.source === "unknown");
  const row = (o) => `| ${o.priority} | ${o.phrase} | ${o.intent} | ${o.audience} | ${o.geography} | ${o.demand.value ?? "unknown"} (${o.demand.source}) | ${o.competition.value ?? "unknown"} (${o.competition.source}) | ${o.ranking?.position ?? "–"} | ${o.destination ? o.destination.replace(ORIGIN, "") : "**gap: no page**"} | ${o.conversionPotential} |`;
  const head = "| Priority | Search phrase | Intent | Audience | Geography | Demand (source) | Competition (source) | Position | Destination | Converts via |\n|---|---|---|---|---|---|---|---|---|---|";
  return `# Keyword opportunities

Generated by \`node scripts/growth/opportunities.mjs\` on ${date}. ${list.length} opportunities: **${measured.length} with measured data**, ${est.length} with estimates only, ${cand.length} unvalidated candidates from Gradify's own curriculum and features. Full data: \`data/growth/opportunities.json\`.

How to read it: demand and competition always name their source. "search-console" and "keyword-planner" are Google's data; "estimate" is a judgement; "unknown" means nobody has measured it yet. Priority (0–100) = demand × winnability × intent × conversion × readiness (\`scripts/growth/opportunities.mjs\`, explained in \`docs/growth/PLAYBOOK.md\`), so anything measured outranks anything guessed.

${measured.length ? `## Measured (Search Console or Keyword Planner): top 100\n\n${head}\n${measured.slice(0, 100).map(row).join("\n")}` : "## Measured\n\nNo Search Console or Keyword Planner data has been imported yet, so nothing here is measured. Put exports in `data/growth/inputs/` (see `scripts/growth/sources.mjs`) and run this again."}

## Estimated (intent map): top 50

${head}
${est.slice(0, 50).map(row).join("\n")}

## Unvalidated candidates: a sample of 50

Every lesson in the learn library and every feature is a candidate. Validate the promising ones in Keyword Planner before writing anything new for them.

${head}
${cand.slice(0, 50).map(row).join("\n")}
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const list = await buildOpportunities(), date = new Date().toISOString().slice(0, 10);
  mkdirSync(new URL("../../data/growth/", import.meta.url), { recursive: true }); mkdirSync(new URL("../../docs/growth/", import.meta.url), { recursive: true });
  writeFileSync(new URL("../../data/growth/opportunities.json", import.meta.url), JSON.stringify({ generated: date, count: list.length, opportunities: list }, null, 1));
  writeFileSync(new URL("../../docs/growth/OPPORTUNITIES.md", import.meta.url), opportunitiesMd(list, date));
  console.log(`${list.length} opportunities (${list.filter((o) => o.measured).length} measured).`);
}
