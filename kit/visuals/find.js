// Matching a request for a visual to what Gradify already has (kit/api/v1/visuals.json, scripts/visual-index.mjs).
const words = (...s) => [...new Set(s.join(" ").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]+/g, " ").split(" ").filter((w) => w.length > 2))];
export { words };
/** Visuals matching a query, best first: every query word must match a key (whole or start of word). Pure. */
export function findVisuals(index, q, limit = 20) {
  const qs = words(q); if (!qs.length) return [];
  const rank = { molecule: 3, procedural: 3, model: 2, interactive: 2 };
  return index.filter((v) => qs.every((w) => v.keys.some((k) => k === w || k.startsWith(w) || (w.length > 4 && w.startsWith(k)))))
    .map((v) => ({ v, s: qs.reduce((a, w) => a + (v.keys.includes(w) ? 2 : 1), 0) + (words(v.title).some((t) => qs.includes(t)) ? 3 : 0) + rank[v.kind] / 10 }))
    .sort((a, b) => b.s - a.s).slice(0, limit).map((x) => x.v);
}
