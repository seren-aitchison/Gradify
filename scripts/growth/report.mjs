// The growth report: the eight questions the growth dashboard must answer, from real data, and what to do next.
//   node scripts/growth/report.mjs          write docs/growth/REPORT.md
// Inputs (data/growth/inputs/, see sources.mjs): Search Console rows, and CSV results of docs/sql/growth-dashboard.sql.
// Unavailable is never shown as zero: a question without its data says exactly what's missing and how to get it.
//
// CTR is judged against Gradify's OWN click-through rate at the same position (the median of its pages in that position
// band), never against an outside benchmark curve, so "low CTR" means "worse than Gradify does elsewhere at that rank".
import { writeFileSync, mkdirSync } from "node:fs";
import { gscRows, dbExport } from "./sources.mjs";
import { buildOpportunities } from "./opportunities.mjs";
import { prepareNow, inSeason } from "./seasons.mjs";
import { lessonsOf, plan } from "./lesson-readiness.mjs";

const pct = (x) => (x == null ? "–" : `${(x * 100).toFixed(1)}%`);
const n = (x) => (x == null ? "–" : Number(x).toLocaleString("en-GB"));
const path = (u) => String(u || "").replace(/^https?:\/\/[^/]+/, "") || "/";
export const BANDS = [[1, 1.5, "1"], [1.5, 2.5, "2"], [2.5, 3.5, "3"], [3.5, 5.5, "4–5"], [5.5, 10.5, "6–10"], [10.5, 20.5, "11–20"], [20.5, Infinity, "21+"]];
export const bandOf = (p) => BANDS.find(([a, b]) => p >= a && p < b)?.[2] ?? null;
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : null; };

/** per page: clicks, impressions, CTR and impression-weighted position, from query × page rows or the Pages export */
export function pagesFrom(rows) {
  const m = new Map();
  for (const r of rows.filter((x) => x.page)) { const p = path(r.page), cur = m.get(p) || { page: p, clicks: 0, impressions: 0, posW: 0 }; cur.clicks += r.clicks || 0; cur.impressions += r.impressions || 0; cur.posW += (r.position || 0) * (r.impressions || 0); m.set(p, cur); }
  return [...m.values()].map((x) => ({ ...x, ctr: x.impressions ? x.clicks / x.impressions : 0, position: x.impressions ? x.posW / x.impressions : null }));
}
/** Gradify's own median CTR per position band (bands with fewer than `min` pages of 50+ impressions have no benchmark) */
export function ownCurve(pages, min = 5) {
  const by = new Map(); for (const p of pages.filter((x) => x.impressions >= 50 && x.position)) { const b = bandOf(p.position); by.set(b, [...(by.get(b) || []), p.ctr]); }
  return Object.fromEntries([...by].filter(([, v]) => v.length >= min).map(([b, v]) => [b, median(v)]));
}
/** pages shown often but clicked less than Gradify's own pages at the same rank: the title and description to improve */
export function lowCtr(pages, curve, minImpr = 100) {
  return pages.filter((p) => p.impressions >= minImpr && curve[bandOf(p.position)] != null && p.ctr < 0.7 * curve[bandOf(p.position)])
    .map((p) => ({ ...p, expected: curve[bandOf(p.position)], missedClicks: Math.round(p.impressions * curve[bandOf(p.position)] - p.clicks) }))
    .sort((a, b) => b.missedClicks - a.missedClicks);
}

/**
 * Activated students per search click, from the pages' clicks (Search Console) and the activated learners who first
 * landed on them (dashboard query 11): a page's own rate when it has 30+ clicks, otherwise the site-wide rate. Null
 * when there's no activation data, so recommendations fall back to clicks and say so.
 */
export function activationRates(pages, signups) {
  if (!signups || !pages.length) return null;
  const act = new Map(signups.map((r) => [path(r.landing), Number(r.activated) || 0]));
  const withClicks = pages.filter((p) => p.clicks > 0), clicks = withClicks.reduce((m, p) => m + p.clicks, 0), activated = withClicks.reduce((m, p) => m + (act.get(p.page) || 0), 0);
  if (!clicks) return null;
  const site = activated / clicks;
  return (page) => { const p = pages.find((x) => x.page === page); return p && p.clicks >= 30 ? (act.get(page) || 0) / p.clicks : site; };
}
const STOPQ = new Set("a an the and or of to in on for with how what why is are do does gcse level a-level revision notes free".split(" "));
const words = (s) => String(s).toLowerCase().match(/[a-z0-9]+/g)?.filter((w) => w.length > 2 && !STOPQ.has(w)) || [];
/** a page "suits" a query when its address shares at least one of the query's meaningful words (a first-pass check) */
export const suits = (query, page) => { const pw = new Set(words(String(page).replace(/[-/]/g, " "))); return words(query).some((w) => pw.has(w) || pw.has(w.replace(/s$/, ""))); };
/** which subject or feature a page belongs to */
export function groupOf(page) {
  const p = String(page), m = p.match(/^\/(?:lessons|topics|questions|exam-traps)\/([^/]+)\//) || p.match(/^\/(?:learn)\/([^/]+)\//);
  if (m) return ["subject", m[1]];
  const f = p.match(/^\/features\/([^/]+)\//); if (f) return ["feature", f[1]];
  const s = p.match(/^\/([a-z]+gradify)\//); if (s) return ["site", s[1]];
  return null;
}

const unavailable = (what, how) => `**Unavailable.** Needs ${what}. ${how}`;
const GSC_HOW = "Export Search Console › Performance (Queries and Pages) into `data/growth/inputs/`, or run `scripts/growth/gsc-fetch.mjs` with a token.";
const DB_HOW = (q, f) => `Run query ${q} in \`docs/sql/growth-dashboard.sql\` and save the result as \`data/growth/inputs/${f}\`.`;

export async function report({ gsc = gscRows(), db = dbExport, date = new Date(), opportunities = null, readiness = null } = {}) {
  const day = new Date(date).toISOString().slice(0, 10), out = [];
  const queries = new Map(); for (const r of gsc.filter((x) => x.query)) { const q = queries.get(r.query) || { query: r.query, clicks: 0, impressions: 0, posW: 0, pages: new Map() }; q.clicks += r.clicks || 0; q.impressions += r.impressions || 0; q.posW += (r.position || 0) * (r.impressions || 0); if (r.page) q.pages.set(path(r.page), (q.pages.get(path(r.page)) || 0) + (r.impressions || 0)); queries.set(r.query, q); }
  const qs = [...queries.values()].map((q) => ({ ...q, page: [...q.pages].sort((a, b) => b[1] - a[1])[0]?.[0] || null, position: q.impressions ? q.posW / q.impressions : null, ctr: q.impressions ? q.clicks / q.impressions : 0 }));
  const pages = pagesFrom(gsc), curve = ownCurve(pages);
  const signups = db("signups-by-page"), retention = db("retention-by-site"), paid = db("features-and-paid"), funnel = db("funnel");
  opportunities ||= await buildOpportunities({ gsc });
  readiness ||= plan(await lessonsOf());
  const rate = activationRates(pages, signups), RANK_NOTE = rate ? "Ranked by expected activated students: extra clicks × the page's activated-per-click rate (its own with 30+ clicks, else Gradify's average)." : "Ranked by clicks: activation per click is unavailable until dashboard query 11 is exported (`db-signups-by-page.csv`).";
  const exp = (clicks, page) => (rate ? clicks * rate(page) : null), ex = (v) => (v == null ? "–" : v.toFixed(1));

  out.push(`# Gradify growth report\n\nGenerated by \`node scripts/growth/report.mjs\` on ${day}. Search data: ${gsc.length ? `${n(gsc.length)} Search Console rows` : "none imported"}. Product data: ${[signups, retention, paid, funnel].filter(Boolean).length} of 4 database exports.\n\nEvery answer comes from the data named. Where data is missing the answer says so: unavailable is not zero. Rankings change daily: act on the weekly and monthly picture (see \`docs/growth/PLAYBOOK.md\`), not on one day's movement.`);

  out.push(`## 1. Which queries bring the most Gradify traffic?\n\n${qs.length ? `| Query | Clicks | Impressions | CTR | Position |\n|---|---|---|---|---|\n${qs.sort((a, b) => b.clicks - a.clicks).slice(0, 100).map((q) => `| ${q.query} | ${n(q.clicks)} | ${n(q.impressions)} | ${pct(q.ctr)} | ${q.position?.toFixed(1) ?? "–"} |`).join("\n")}` : unavailable("Search Console query data", GSC_HOW)}`);

  const top = curve["1"] ?? curve["2"] ?? curve["3"] ?? null;
  const untapped = qs.filter((q) => q.position >= 5 && q.position <= 20 && q.impressions >= 20).map((q) => { const headroom = top == null ? null : Math.max(0, Math.round(q.impressions * top - q.clicks)); return { ...q, headroom, gain: headroom == null ? null : exp(headroom, q.page) }; })
    .sort((a, b) => (b.gain ?? -1) - (a.gain ?? -1) || (b.headroom ?? 0) - (a.headroom ?? 0) || b.impressions - a.impressions);
  const est = opportunities.filter((o) => !o.measured && o.demand.source === "estimate").slice(0, 20);
  out.push(`## 2. Which queries have the most untapped opportunity?\n\n${untapped.length ? `Queries where Gradify already appears at positions 5–20: moving up is worth more than a new page. ${RANK_NOTE}\n\n| Query | Page | Impressions | Clicks | Position | Extra clicks at Gradify's top-result CTR | Expected activated students |\n|---|---|---|---|---|---|---|\n${untapped.slice(0, 100).map((q) => `| ${q.query} | ${q.page || "–"} | ${n(q.impressions)} | ${n(q.clicks)} | ${q.position.toFixed(1)} | ${q.headroom == null ? "not enough data" : `+${n(q.headroom)}`} | ${ex(q.gain)} |`).join("\n")}` : unavailable("Search Console query data with positions", GSC_HOW)}\n\nUntil measured data exists, the estimated priorities (judgements, \`docs/growth/OPPORTUNITIES.md\`):\n\n${est.map((o) => `- ${o.phrase} → ${path(o.destination)} (priority ${o.priority}, estimate)`).join("\n")}`);

  const homeless = qs.filter((q) => q.impressions >= 20 && (!q.page || !suits(q.query, q.page) || q.position > 30)).sort((a, b) => b.impressions - a.impressions);
  out.push(`## 2a. Searches with no suitable Gradify page\n\n${!qs.length ? unavailable("Search Console query data", GSC_HOW) : homeless.length ? `Students search for these and Google shows a Gradify page, but the page Google picked doesn't match the query's words, or it ranks below 30: Gradify has no page made for the search. Each is a candidate for a new page or a section on the closest one (check intent first; this is a word-match screen, not a judgement).\n\n| Query | Impressions | Page shown | Position |\n|---|---|---|---|\n${homeless.slice(0, 50).map((q) => `| ${q.query} | ${n(q.impressions)} | ${q.page || "–"} | ${q.position?.toFixed(1) ?? "–"} |`).join("\n")}` : "None: every query with 20+ impressions lands on a page that matches it."}`);

  const fresh = opportunities.filter((o) => o.measured && (!o.destination || /^(search-console|keyword-planner)$/.test(o.origin))).slice(0, 50);
  out.push(`## 2b. New opportunities with measured demand\n\n${fresh.length ? `Searches with demand measured by Search Console or Keyword Planner that aren't in the intent map yet, by priority.\n\n| Priority | Search | Demand (source) | Competition | Destination |\n|---|---|---|---|---|\n${fresh.map((o) => `| ${o.priority} | ${o.phrase} | ${n(o.demand.value)} (${o.demand.source}) | ${o.competition.value ?? "unknown"} | ${o.destination ? path(o.destination) : "**needs a page**"} |`).join("\n")}` : unavailable("measured demand", `${GSC_HOW} For searches Gradify doesn't rank for yet, add a Keyword Planner export (\`docs/growth/DATA-ACCESS.md\`).`)}`);

  const low = lowCtr(pages, curve).map((p) => ({ ...p, gain: exp(p.missedClicks, p.page) })).sort((a, b) => (b.gain ?? -1) - (a.gain ?? -1) || b.missedClicks - a.missedClicks);
  out.push(`## 3. Which pages appear but don't get clicked?\n\n${!pages.length ? unavailable("Search Console page data", GSC_HOW) : !Object.keys(curve).length ? "**Not enough data yet** to judge: Gradify needs at least 5 pages with 50+ impressions in a position band to know its own normal CTR there." : low.length ? `CTR under 70% of Gradify's own median at that position, 100+ impressions. Fix the title and description (log the change: \`npm run growth:changes\`), then wait 28 days before judging. ${RANK_NOTE}\n\n| Page | Impressions | CTR | Gradify's usual CTR there | Position | Clicks missed | Expected activated students |\n|---|---|---|---|---|---|---|\n${low.slice(0, 50).map((p) => `| ${p.page} | ${n(p.impressions)} | ${pct(p.ctr)} | ${pct(p.expected)} | ${p.position.toFixed(1)} | ${n(p.missedClicks)} | ${ex(p.gain)} |`).join("\n")}` : "None: every page with 100+ impressions is clicked at least 70% as often as Gradify's others at the same rank."}`);

  const clicked = pages.filter((p) => p.clicks >= 30);
  out.push(`## 4. Which pages get clicks but no sign-ups?\n\n${!clicked.length ? unavailable("Search Console page data with clicks", GSC_HOW) : !signups ? unavailable("sign-ups by first landing page", DB_HOW(11, "db-signups-by-page.csv")) : (() => { const s = new Map(signups.map((r) => [path(r.landing), Number(r.signups) || 0])); const none = clicked.filter((p) => !s.get(p.page)).sort((a, b) => b.clicks - a.clicks); return none.length ? `30+ search clicks in the period and no account that first landed there. Look at the page's call to action and what a visitor can try without signing up.\n\n| Page | Search clicks | Sign-ups |\n|---|---|---|\n${none.slice(0, 50).map((p) => `| ${p.page} | ${n(p.clicks)} | 0 |`).join("\n")}` : "None: every page with 30+ clicks has brought at least one sign-up."; })()}\n\nNote: sign-ups are counted only where the browser kept its first-touch record, so these are lower bounds.`);

  out.push(`## 5. Which pages bring the most activated students?\n\n${signups ? `| First landing page | Sign-ups | Activated within 7 days |\n|---|---|---|\n${[...signups].sort((a, b) => Number(b.activated) - Number(a.activated)).slice(0, 30).map((r) => `| ${r.landing} | ${n(r.signups)} | ${n(r.activated)} |`).join("\n")}` : unavailable("activation by first landing page", DB_HOW(11, "db-signups-by-page.csv"))}`);

  const groups = new Map();
  for (const p of pages) { const g = groupOf(p.page); if (!g) continue; const k = g.join(":"), cur = groups.get(k) || { kind: g[0], name: g[1], clicks: 0, impressions: 0, activated: 0 }; cur.clicks += p.clicks; cur.impressions += p.impressions; groups.set(k, cur); }
  if (signups) for (const r of signups) { const g = groupOf(path(r.landing)); const cur = g && groups.get(g.join(":")); if (cur) cur.activated += Number(r.activated) || 0; }
  const gl = [...groups.values()].sort((a, b) => (signups ? b.activated - a.activated : 0) || b.clicks - a.clicks);
  out.push(`## 5a. Best-performing subjects and features in search\n\n${gl.length ? `Search Console clicks grouped by subject (lessons, topics, questions and exam traps) and by feature page${signups ? ", with the activated students who first landed there" : "; activation by group needs dashboard query 11"}.\n\n| Kind | Name | Clicks | Impressions | CTR | Activated students |\n|---|---|---|---|---|---|\n${gl.slice(0, 40).map((g) => `| ${g.kind} | ${g.name} | ${n(g.clicks)} | ${n(g.impressions)} | ${pct(g.impressions ? g.clicks / g.impressions : null)} | ${signups ? n(g.activated) : "–"} |`).join("\n")}` : unavailable("Search Console page data", GSC_HOW)}`);

  out.push(`## 6. Which subjects bring students back most?\n\n${retention ? `| Site | Learners (90 days) | Came back in another week | Share |\n|---|---|---|---|\n${retention.slice(0, 40).map((r) => `| ${r.site} | ${n(r.learners)} | ${n(r.returning)} | ${r.returning_pct ?? "–"}% |`).join("\n")}` : unavailable("returning learners by site", DB_HOW(12, "db-retention-by-site.csv"))}\n\nCourse lessons are kept in \`course_progress\`, not \`activity\`, so course-only learners are undercounted here (docs/SEO.md, known gaps).`);

  out.push(`## 7. Which features go with Pro subscriptions?\n\n${paid ? `What paying learners used, compared with free learners. A feature used far more by paying learners is worth showing earlier; it doesn't prove the feature caused the purchase.\n\n| Activity | Paying learners | % of paying | % of free |\n|---|---|---|---|\n${paid.slice(0, 20).map((r) => `| ${r.kind} | ${n(r.paying_users)} | ${r.pct_of_paying ?? "–"}% | ${r.pct_of_free ?? "–"}% |`).join("\n")}` : unavailable("feature use by paying and free learners", DB_HOW(13, "db-features-and-paid.csv"))}`);

  const prep = prepareNow(date), now = inSeason(date);
  const f = funnel?.[0];
  const stages = f ? [["page views → app clicks", Number(f.app_clicks) / Number(f.page_views)], ["sign-ups → activated", Number(f.activated) / Number(f.signups)], ["activated → returned", Number(f.returned) / Math.max(1, Number(f.activated))]] : null;
  const weakest = stages?.filter(([, v]) => Number.isFinite(v)).sort((a, b) => a[1] - b[1])[0];
  out.push(`## 8. What should we build or improve next?\n\nIn priority order, from what's known today:\n\n${[
    prep.length ? `**Prepare for the season (before demand peaks):** ${prep.map((s) => `${s.name}, peaking from ${s.peak} (${s.weeksLeft} weeks): refresh and link the pages it covers now`).join("; ")}.` : null,
    now.length ? `**In season now (watch, don't rewrite):** ${now.map((s) => s.name).join("; ")}.` : null,
    low.length ? `**Fix ${low.length} low-CTR page(s)** (question 3): about ${n(low.reduce((m, p) => m + p.missedClicks, 0))} clicks missed in the period.` : null,
    untapped.length ? `**Push ${Math.min(untapped.length, 100)} striking-distance queries** (question 2): put the phrase in an h2 on the ranking page, answer it in the first two sentences, add two internal links.` : null,
    weakest ? `**The funnel's weakest step is ${weakest[0]}** (${pct(weakest[1])}, last 28 days): the conversion experiments should start there (\`kit/core/experiments.js\`).` : `**Funnel:** ${unavailable("the funnel row", DB_HOW(10, "db-funnel.csv"))}`,
    readiness.next.length ? `**Scale the lesson pages** once the pilot is indexing well (docs/SEO.md): the next batch is ${readiness.next.length} units, ${readiness.pages} pages (\`docs/growth/CONTENT-BACKLOG.md\`). Most lessons that aren't ready lack explained practice questions.` : null,
    !gsc.length ? "**Import Search Console data.** Everything above that says unavailable starts working with it; until then priorities rest on estimates." : null,
  ].filter(Boolean).map((x, i) => `${i + 1}. ${x}`).join("\n")}`);
  return out.join("\n\n") + "\n";
}

if (import.meta.url === `file://${process.argv[1]}`) {
  mkdirSync(new URL("../../docs/growth/", import.meta.url), { recursive: true });
  writeFileSync(new URL("../../docs/growth/REPORT.md", import.meta.url), await report());
  console.log("Wrote docs/growth/REPORT.md");
}
