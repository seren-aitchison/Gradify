// The catalogue reader: the ONLY way Gradify code reads the education catalogue (docs/CATALOGUE.md). Today it reads the
// static files written by scripts/catalogue/build.mjs; later it can read Supabase instead, and nothing that calls it
// changes. It runs in the browser and in Node (tests pass `fetchJson`).
//
// Safety rules it enforces for callers:
//   - status is per field; a record shows the LOWEST status of the fields being shown, so a checked title never makes
//     a programme read as checked (statusOf, describeStatus);
//   - only verified field values, with no pending source change and not past their review date, are given to
//     calculations (calculationValues); a pending change keeps the last verified value, never the new one;
//   - rules apply only when every field is verified (two reviewers for high-importance rules), and only to a student
//     entry the student explicitly linked to a catalogue record (rulesFor, confirmLink); a typed name never inherits.
import { resolveId, bucketOf, typeOfId, isId } from "./catalogue-ids.js";

export const STATUS_ORDER = ["outdated", "unverified", "partially_verified", "verified"];
const rank = (s) => STATUS_ORDER.indexOf(s);
const today = (now) => new Date(now).toISOString().slice(0, 10);

/** A field's status at `now`: past the record's review date or effective end, it's outdated whatever was recorded. */
export function fieldStatus(record, field, now = Date.now()) {
  const m = record?.fields?.[field];
  if (!m) return null;
  const t = today(now), p = record.provenance || {};
  if ((p.next_review && p.next_review < t) || (p.effective_to && p.effective_to < t) || record.pending?.changed?.includes(field)) return "outdated";
  return m.status;
}
/** The status to show for a set of fields: the lowest of them (all fields when none are given). */
export function statusOf(record, fieldsShown = null, now = Date.now()) {
  const fs = (fieldsShown || Object.keys(record?.fields || {})).filter((f) => record?.fields?.[f]);
  if (!fs.length) return "unverified";
  return fs.map((f) => fieldStatus(record, f, now)).reduce((a, b) => (rank(b) < rank(a) ? b : a));
}
const WORDS = { verified: "checked", partially_verified: "partly checked", unverified: "not yet checked", outdated: "out of date" };
const LABELS = { name: "Name", title: "Title", kind: "Type", town: "Town", qualification: "Qualification", mode: "Mode", length: "Length", subjects: "Subjects", code: "Code", size: "Size", weight: "Weighting", body: "Rule", rule_kind: "Rule type", importance: "Importance", label: "Label", stages: "Stages", alt_names: "Other names", website: "Website" };
/** Plain words for what's checked, e.g. "Title checked · Length not yet checked". */
export function describeStatus(record, fieldsShown = null, now = Date.now()) {
  const fs = (fieldsShown || Object.keys(record?.fields || {})).filter((f) => record?.fields?.[f]);
  const groups = new Map();
  for (const f of fs) { const s = fieldStatus(record, f, now); (groups.get(s) || groups.set(s, []).get(s)).push(LABELS[f] || f); }
  return [...groups].sort((a, b) => rank(b[0]) - rank(a[0])).map(([s, names]) => `${names.join(", ")} ${WORDS[s]}`).join(" · ");
}

/** Values safe for calculations: verified only, never a pending change (its last verified value is used if verified). */
export function calculationValues(record, now = Date.now()) {
  const values = {}, withheld = [];
  for (const f of Object.keys(record?.fields || {})) {
    if (fieldStatus(record, f, now) === "verified") { values[f] = record.data[f]; continue; }
    const lv = record.last_verified;
    const changedOnly = record.pending?.changed?.includes(f) && lv?.fields?.[f]?.status === "verified" && !((record.provenance?.next_review || "9999") < today(now));
    if (changedOnly) values[f] = lv.data[f]; else withheld.push(f);
  }
  return { values, withheld };
}

/**
 * Link a student's typed entry to a catalogue record ONLY when they confirmed it. Without confirmation the entry is
 * returned unchanged (id: null). Linking never makes a record's rules apply by itself: see rulesFor.
 */
export function confirmLink(entry, candidate, { confirmed = false } = {}) {
  if (confirmed !== true || !candidate || !isId(candidate.id)) return { ...entry, id: entry?.id ?? null };
  return { ...entry, id: candidate.id, name: entry?.name || candidate.name, linked_at: new Date().toISOString().slice(0, 10) };
}
/** Whether a rule may change a student's numbers: every field verified now, with two reviewers if high importance. */
export function ruleUsable(rule, now = Date.now()) {
  if (!rule || rule.type !== "rule") return { usable: false, reason: "not a rule" };
  if (rule.pending) return { usable: false, reason: "a source change is waiting for review" };
  for (const f of Object.keys(rule.fields)) {
    const s = fieldStatus(rule, f, now);
    if (s !== "verified") return { usable: false, reason: `${LABELS[f] || f} is ${WORDS[s] || s}` };
    if (rule.data.importance === "high" && !rule.fields[f].reviewed?.two) return { usable: false, reason: "needs a second reviewer" };
  }
  return { usable: true, reason: "" };
}

// ---------- search ----------
const SYN = [[/&/g, " and "], [/\bst\.?\s/g, "saint "], [/\buniv\.?\b/g, "university "], [/\bcoll\.?\b/g, "college "], [/\bsch\.?\b/g, "school "]];
export function normalise(s) {
  let t = String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
  for (const [re, to] of SYN) t = t.replace(re, to);
  return t.replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
}
const STOP = new Set(["the", "of", "and", "a"]);
const toks = (s) => normalise(s).split(" ").filter((w) => w && !STOP.has(w));
function prepare(rows) {
  return rows.map(([id, name, alt, kind, town, lifecycle]) => ({ id, name, alt, kind, town, lifecycle, n: normalise(name), nt: toks(name), at: alt.map(toks), tt: toks(town) }));
}
/** Rank prepared rows for a query: whole-name prefix, then every word matching the start of a name word, then alt names. */
export function rankRows(prepared, q, { limit = 8 } = {}) {
  const nq = normalise(q), qt = toks(q);
  if (!qt.length) return [];
  const out = [];
  for (const r of prepared) {
    const inName = qt.every((w) => r.nt.some((t) => t.startsWith(w)));
    const inAlt = !inName && r.at.some((a) => qt.every((w) => a.some((t) => t.startsWith(w))));
    const withTown = !inName && !inAlt && qt.every((w) => r.nt.some((t) => t.startsWith(w)) || r.tt.some((t) => t.startsWith(w)));
    if (!inName && !inAlt && !withTown) continue;
    let score = r.n.startsWith(nq) ? 100 : inName ? 80 : inAlt ? 70 : 60;
    score -= Math.min(10, Math.max(0, r.nt.length - qt.length));
    if (r.lifecycle === "closed") score -= 25;
    out.push({ id: r.id, name: r.name, alt: r.alt, kind: r.kind, town: r.town, lifecycle: r.lifecycle, closed: r.lifecycle === "closed", score });
  }
  return out.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "en")).slice(0, limit);
}

// ---------- the reader ----------
async function defaultFetch(url, cacheName) {
  const cache = globalThis.caches ? await globalThis.caches.open(cacheName).catch(() => null) : null;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    if (cache) cache.put(url, res.clone()).catch(() => {});
    return await res.json();
  } catch (err) {
    const hit = cache && (await cache.match(url));
    if (hit) return hit.json();   // offline: the last copy this browser saw
    throw err;
  }
}

export function createCatalogue({ base = "/data/catalogue/", fetchJson, now = () => Date.now(), cacheName = "gradify-catalogue" } = {}) {
  const get = fetchJson || ((path) => defaultFetch(base + path, cacheName));
  const memo = new Map();
  const load = (path, fallback) => {
    if (!memo.has(path)) memo.set(path, get(path).catch((err) => { memo.delete(path); if (fallback !== undefined) return fallback; throw err; }));
    return memo.get(path);
  };
  const regionRows = new Map();

  const api = {
    manifest: () => load("manifest.json"),
    async systems(country) { return (await load("systems.json", [])).filter((s) => !country || s.country === country); },
    async regions(country) { return (await api.manifest()).regions?.[country] || []; },
    /** Search one region's providers. Results are suggestions only: nothing is linked until the student confirms. */
    async searchProviders(country, region, q, { limit = 8 } = {}) {
      const key = `${country}/${region}`;
      if (!regionRows.has(key)) regionRows.set(key, load(`providers/${country}/${region}/index.json`, { rows: [] }).then((x) => prepare(x.rows)));
      return rankRows(await regionRows.get(key), q, { limit });
    },
    async resolve(id) {
      return resolveId(id, new Map(Object.entries(await load("tombstones.json", {}))));
    },
    /** A record by ID, following merges. A split record returns { split: [ids], display_name } for the student to choose. */
    async record(id) {
      const r = await api.resolve(id);
      if (r.split) { const t = (await load("tombstones.json", {}))[id]; return { split: r.split, display_name: t?.display_name || null }; }
      if (!r.id) return null;
      const type = typeOfId(r.id);
      const rec = (await load(`objects/${type}/${bucketOf(r.id)}.json`, {}))[r.id] || null;
      return rec && r.id !== id ? { ...rec, resolved_from: id } : rec;
    },
    async relations(id, type) {
      const all = (await load(`relations/${bucketOf(id)}.json`, {}))[id] || [];
      return type ? all.filter((e) => e.type === type) : all;
    },
    provider: (id) => api.record(id),
    async units(ids) { return Promise.all(ids.map((i) => api.record(i))); },
    /** A provider's offerings, optionally only those in a subject (by code or label). */
    async offerings(providerId, { subject } = {}) {
      const edges = (await api.relations(providerId, "offers")).filter((e) => e.from === providerId);
      const recs = (await Promise.all(edges.map((e) => api.record(e.to)))).filter(Boolean);
      if (!subject) return recs;
      const s = normalise(subject);
      return recs.filter((o) => (o.data.subjects || []).some((x) => x.code === subject || normalise(x.label || "") === s));
    },
    /** An offering's structure for a cohort and stage, with its units and how each is included. Null when none is known. */
    async structure(offeringId, cohort, stage) {
      const edges = (await api.relations(offeringId, "has_structure")).filter((e) => e.from === offeringId);
      const t = today(now());
      const structs = (await Promise.all(edges.map((e) => api.record(e.to)))).filter((s) => s && s.data.cohort_start === cohort && (!stage || s.data.stage === stage) && !(s.provenance.effective_to && s.provenance.effective_to < t));
      if (!structs.length) return null;
      // the current version: one that nothing else in the list supersedes
      const superseded = new Set(structs.map((s) => s.provenance.supersedes).filter(Boolean));
      const st = structs.find((s) => !superseded.has(s.id)) || structs[0];
      const inc = (await api.relations(st.id, "includes")).filter((e) => e.from === st.id);
      const units = await Promise.all(inc.map(async (e) => ({ unit: await api.record(e.to), compulsory: Boolean(e.attrs?.compulsory), group: e.attrs?.group || null, group_rule: e.attrs?.group_rule || null, status: e.status })));
      return { structure: st, units };
    },
    /** Rules for a student's entry: none unless it's linked; of those, only usable ones apply; the rest are information. */
    async rulesFor(entry) {
      if (!entry?.id) return { apply: [], info: [], reason: "not linked to a catalogue record" };
      const rec = await api.record(entry.id);
      if (!rec || rec.split) return { apply: [], info: [], reason: rec?.split ? "the record was split: choose which applies" : "record not found" };
      const edges = (await api.relations(rec.id, "governed_by")).filter((e) => e.from === rec.id);
      const t = now(), apply = [], info = [];
      for (const e of edges) {
        const r = await api.record(e.to); if (!r) continue;
        // the link between the course and the rule must itself be checked, as well as the rule
        const u = e.status !== "verified" ? { usable: false, reason: "the link between this course and the rule isn't checked" } : ruleUsable(r, t);
        (u.usable ? apply : info).push(u.usable ? r : { ...r, not_applied: u.reason });
      }
      return { apply, info, reason: "" };
    },
    statusOf: (rec, fields) => statusOf(rec, fields, now()),
    describeStatus: (rec, fields) => describeStatus(rec, fields, now()),
    calculationValues: (rec) => calculationValues(rec, now()),
  };
  return api;
}
