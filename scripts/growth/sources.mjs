// Readers for the search data Gradify's growth engine uses. Each keeps where a number came from, so measured data,
// Google's planning ranges and Gradify's own estimates are never mixed up.
//
// Put exports in data/growth/inputs/ (kept out of git: they can contain the queries people typed):
//   gsc-*.json        Search Console API rows from scripts/growth/gsc-fetch.mjs (query × page, measured)
//   Queries.csv       Search Console › Performance › Export (top queries, measured)
//   Pages.csv         the same export's pages (measured)
//   keyword-planner*.csv   Keyword Planner › Keyword ideas › Download (UTF-16 or UTF-8; Google's ranges, not measured)
//   trends-*.csv      Google Trends › Interest over time › Download (relative interest, 0–100)
//   db-*.csv          results of docs/sql/growth-dashboard.sql, downloaded from the Supabase SQL editor
import { readFileSync, readdirSync, existsSync } from "node:fs";

export const INPUTS = new URL("../../data/growth/inputs/", import.meta.url);

/** text of a file, whether UTF-8 (with or without a BOM) or UTF-16 LE (Keyword Planner's default) */
export function readText(buf) {
  if (buf[0] === 0xff && buf[1] === 0xfe) return buf.subarray(2).toString("utf16le");
  const s = buf.toString("utf8"); return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

/** rows of a CSV or TSV (quoted fields, commas or tabs), as objects keyed by the header row */
export function parseTable(text) {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  // Keyword Planner and Trends put a title line or two above the header
  let start = 0; while (start < lines.length && (lines[start].split(/[,\t]/).length < 2 || /^(Keyword Stats|Category:)/.test(lines[start]))) start++;
  const body = lines.slice(start).join("\n"), sep = (lines[start] || "").includes("\t") ? "\t" : ",";
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (q) { if (ch === '"' && body[i + 1] === '"') { cell += '"'; i++; } else if (ch === '"') q = false; else cell += ch; }
    else if (ch === '"') q = true;
    else if (ch === sep) { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...rest] = rows.filter((r) => r.some((c) => c.trim()));
  if (!head) return [];
  return rest.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? "").trim()])));
}
const num = (s) => { if (s == null || s === "") return null; const n = Number(String(s).replace(/[,%\s]/g, "")); return Number.isFinite(n) ? n : null; };
const pick = (o, ...keys) => { for (const k of keys) { const hit = Object.keys(o).find((x) => x.toLowerCase() === k.toLowerCase()); if (hit && o[hit] !== "") return o[hit]; } return null; };

/** Search Console rows, measured: [{ query, page, clicks, impressions, ctr, position, source }] */
export function gscRows(dir = INPUTS) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const f of readdirSync(dir)) {
    const text = readText(readFileSync(new URL(f, dir)));
    if (/^gsc-.*\.json$/.test(f)) {
      const j = JSON.parse(text), dims = j.dimensions || ["query", "page"];
      for (const r of j.rows || []) { const k = Object.fromEntries(dims.map((d, i) => [d, r.keys[i]])); out.push({ query: k.query || null, page: k.page || null, clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position, source: "search-console" }); }
    } else if (/^Queries\.csv$/i.test(f) || /^Pages\.csv$/i.test(f)) {
      const isQ = /^Queries/i.test(f);
      for (const r of parseTable(text)) {
        const key = pick(r, isQ ? "Top queries" : "Top pages", isQ ? "Query" : "Page");
        if (!key) continue;
        const ctr = pick(r, "CTR");
        out.push({ query: isQ ? key : null, page: isQ ? null : key, clicks: num(pick(r, "Clicks")), impressions: num(pick(r, "Impressions")), ctr: ctr == null ? null : num(ctr) / (String(ctr).includes("%") ? 100 : 1), position: num(pick(r, "Position")), source: "search-console" });
      }
    }
  }
  return out;
}

/**
 * Keyword Planner's monthly searches: an exact figure (accounts with ad spend) or a range ("1K – 10K", "100 – 1K",
 * accounts without). A range gives [low, high] and, for ranking only, its geometric midpoint.
 */
export function plannerVolume(s) {
  if (s == null || s === "") return null;
  const unit = (x) => { const m = String(x).trim().match(/^([\d.,]+)\s*([KM])?$/i); if (!m) return null; return Number(m[1].replace(/,/g, "")) * ({ k: 1e3, m: 1e6 }[(m[2] || "").toLowerCase()] || 1); };
  const parts = String(s).split(/\s*[–-]\s*/);
  if (parts.length === 2) { const lo = unit(parts[0]), hi = unit(parts[1]); return lo != null && hi != null ? { value: Math.round(Math.sqrt(Math.max(lo, 1) * hi)), range: [lo, hi] } : null; }
  const v = unit(s); return v == null ? null : { value: v, range: null };
}
/** Keyword Planner ideas: Google's monthly-search RANGES and competition label (planning data, not measured traffic) */
export function keywordPlanner(dir = INPUTS) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const f of readdirSync(dir).filter((x) => /^keyword-planner.*\.(csv|tsv)$/i.test(x))) {
    for (const r of parseTable(readText(readFileSync(new URL(f, dir))))) {
      const kw = pick(r, "Keyword"); if (!kw) continue;
      const vol = plannerVolume(pick(r, "Avg. monthly searches"));
      out.push({ phrase: kw.toLowerCase(), monthly: vol?.value ?? null, monthlyRange: vol?.range ?? null, competition: (pick(r, "Competition") || "").toLowerCase() || null, competitionIndex: num(pick(r, "Competition (indexed value)")), source: "keyword-planner" });
    }
  }
  return out;
}

/** Google Trends interest over time: { term: [{ period, value }] } (0–100, relative to the term's own peak) */
export function trends(dir = INPUTS) {
  if (!existsSync(dir)) return {};
  const out = {};
  for (const f of readdirSync(dir).filter((x) => /^trends-.*\.csv$/i.test(x))) {
    const rows = parseTable(readText(readFileSync(new URL(f, dir))));
    if (!rows.length) continue;
    const [period, ...terms] = Object.keys(rows[0]);
    for (const t of terms) out[t.replace(/:\s*\(.*\)$/, "").trim().toLowerCase()] = rows.map((r) => ({ period: r[period], value: num(String(r[t]).replace("<1", "0")) }));
  }
  return out;
}

/** a downloaded result of one dashboard query (db-<name>.csv): rows as objects, or null if not provided */
export function dbExport(name, dir = INPUTS) {
  const f = new URL(`db-${name}.csv`, dir);
  return existsSync(f) ? parseTable(readText(readFileSync(f))) : null;
}
