// Shared by the knowledge pipeline's scripts: paths, loading, fingerprints and a small BM25 index.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { tokens } from "../curriculum/engine.mjs";

export { tokens };
export const ROOT = new URL("../../", import.meta.url);
export const KB = new URL("data/knowledge/", ROOT);
export const at = (p) => new URL(p, KB);
export const load = (u) => (existsSync(u) ? JSON.parse(readFileSync(u, "utf8")) : null);
export const save = (u, data) => { mkdirSync(new URL("./", u), { recursive: true }); writeFileSync(u, typeof data === "string" ? data : `${JSON.stringify(data, null, 1)}\n`); };
export const sha256 = (s) => createHash("sha256").update(s).digest("hex");
export const fp = (x) => sha256(typeof x === "string" ? x : JSON.stringify(x)).slice(0, 16);
export const norm = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
export const today = () => new Date().toISOString().slice(0, 10);

/** every source record (data/knowledge/sources/*.json), by id */
export function loadSources() {
  const dir = at("sources/");
  if (!existsSync(dir)) return {};
  return Object.fromEntries(readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => { const s = load(new URL(f, dir)); return [s.id, s]; }));
}
/** a subject's knowledge items, from every topic file in data/knowledge/<subject>/ */
export function loadKnowledge(subject) {
  const dir = at(`${subject}/`);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith(".json") && !["evidence.json", "retired.json"].includes(f)).sort().flatMap((f) => load(new URL(f, dir)).items.map((k) => ({ subject, ...k, file: `data/knowledge/${subject}/${f}` })));
}
/** a knowledge item's fingerprint: what a lesson records, so a later edit shows the lesson is out of date */
export const itemHash = (k) => { const { file, subject, ...rest } = k; return fp(rest); };
/** the retrieved text of a source (local only), or null */
export const passagesOf = (id) => load(at(`raw/${id}.passages.json`));

/** BM25 over documents [{ id, text }]: search(query) → [{ id, score, matched }] best first */
export function bm25(docs, { k1 = 1.2, b = 0.75 } = {}) {
  const D = docs.map((d) => ({ id: d.id, t: tokens(d.text) })), N = D.length || 1, avg = D.reduce((m, d) => m + d.t.length, 0) / N || 1, df = new Map();
  for (const d of D) for (const w of new Set(d.t)) df.set(w, (df.get(w) || 0) + 1);
  const tf = D.map((d) => { const m = new Map(); for (const w of d.t) m.set(w, (m.get(w) || 0) + 1); return m; });
  const idf = (w) => Math.log(1 + (N - (df.get(w) || 0) + 0.5) / ((df.get(w) || 0) + 0.5));
  return {
    idf,
    search(query, { weights = null } = {}) {
      const q = [...new Set(tokens(query))];
      return D.map((d, i) => {
        let s = 0; const hit = [];
        for (const w of q) { const f = tf[i].get(w); if (!f) continue; hit.push(w); s += (weights?.[w] ?? 1) * idf(w) * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.t.length) / avg))); }
        return { id: d.id, score: Math.round(s * 100) / 100, matched: hit };
      }).filter((r) => r.score > 0).sort((x, y) => y.score - x.score);
    },
  };
}

/** the longest run of words two texts share (lower-cased, punctuation dropped): copying shows as a long run */
export function longestSharedRun(a, b) {
  const wa = norm(a).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean), wb = norm(b).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  let best = 0, run = [];
  const prev = new Array(wb.length + 1).fill(0);
  for (let i = 1; i <= wa.length; i++) {
    let diag = 0;
    for (let j = 1; j <= wb.length; j++) {
      const tmp = prev[j];
      prev[j] = wa[i - 1] === wb[j - 1] ? diag + 1 : 0;
      if (prev[j] > best) { best = prev[j]; run = wa.slice(i - best, i); }
      diag = tmp;
    }
  }
  return { words: best, run: run.join(" ") };
}
