// The catalogue validator (Stage 2, deliverable 2.3). Checks an authoring bundle against the schema, then the rules a
// schema can't express (docs/CATALOGUE.md):
//   - IDs: prefix matches the type; unique; never reused (a tombstoned ID can't be a live record);
//   - rights: every field comes from a source whose verdict and rights allow it, and only fields that source is cleared
//     to supply (field-specific clearance, so a cleared source is never "the whole download");
//   - personal data: named-person and contact fields are refused whatever the source says;
//   - verification: "verified" and "partially_verified" need an owner-approved, competent reviewer and evidence; important
//     records (high-importance rules, structures, assessment weights, "includes" edges) need a second, different reviewer;
//   - evidence: an extract is kept only where the source allows evidence retention; otherwise link only;
//   - relationships: edges join live records of the right types; aliases point at live records and don't collide;
//     tombstones resolve (no loops, no missing targets);
//   - source changes: changed fields are marked outdated or unverified, never left looking verified.
//   node scripts/catalogue/validate.mjs <bundle.json>      exits 1 on any error
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { check } from "./jsonschema.mjs";
import { PREFIX, typeOfId, resolveId } from "../../kit/data/catalogue-ids.js";

const SCHEMA = JSON.parse(readFileSync(new URL("../../data/catalogue/schema/catalogue.schema.json", import.meta.url), "utf8"));

// field names that would hold personal data: refused in any record, from any source (OGL excludes personal data)
export const PERSONAL = /(^|_)(head|headteacher|principal|governor|trustee|contact|person|staff|teacher|first_?name|last_?name|surname|forename|email|e_mail|phone|mobile|telephone|dob|date_of_birth|birth)(_|$)/i;
// which record types each edge may join
export const EDGE_TYPES = {
  part_of_system: [["provider"], ["system"]], offers: [["provider"], ["offering"]], has_structure: [["offering"], ["structure"]],
  includes: [["structure"], ["unit"]], covers: [["unit"], ["curriculum"]], assesses: [["assessment"], ["curriculum", "unit"]],
  aligned_to: [["curriculum"], ["curriculum"]], governed_by: [["provider", "offering"], ["rule"]], supersedes: [null, null],
};
// records whose verification needs two different reviewers
const needsTwo = (rec, field) => (rec.type === "rule" && rec.data?.importance === "high") || rec.type === "structure" || (rec.type === "assessment" && field === "weight");

function keysDeep(obj, prefix = "") {
  const out = [];
  if (obj && typeof obj === "object" && !Array.isArray(obj)) for (const [k, v] of Object.entries(obj)) { out.push(prefix + k); out.push(...keysDeep(v, `${prefix}${k}.`)); }
  else if (Array.isArray(obj)) obj.forEach((v) => out.push(...keysDeep(v, prefix)));
  return out;
}

/**
 * Validate a bundle. `publish` (default true) also requires every source to have the right to publish what it supplies.
 * Returns { ok, errors: [{ code, where, message }], stats }.
 */
export function validateBundle(bundle, { publish = true } = {}) {
  const errors = [];
  const e = (code, where, message) => errors.push({ code, where, message });
  for (const x of check(bundle, SCHEMA)) e("schema", x.path, x.message);
  if (errors.length) return { ok: false, errors, stats: {} };

  const fixtureMode = bundle.kind === "fixture";
  const sources = new Map(bundle.sources.map((s) => [s.id, s]));
  const reviewers = new Map(bundle.reviewers.map((r) => [r.id, r]));
  const evidence = new Map(bundle.evidence.map((x) => [x.id, x]));
  const live = new Map();
  const tomb = new Map(bundle.tombstones.map((t) => [t.id, t]));

  // sources: usable only with the right verdict
  const sourceOk = (id, where, { forPublish = publish } = {}) => {
    const s = sources.get(id);
    if (!s) { e("source.missing", where, `unknown source ${id}`); return null; }
    if (s.verdict === "fixture") { if (!fixtureMode) e("source.fixture", where, `fixture source ${id} used outside a fixture bundle`); return s; }
    if (s.verdict !== "cleared") { e("source.not_cleared", where, `source ${id} is "${s.verdict}", not cleared`); return null; }
    if (s.rights.ingest !== true) e("source.no_ingest", where, `source ${id} has no recorded right to ingest`);
    if (forPublish && s.rights.publish !== true) e("source.no_publish", where, `source ${id} has no recorded right to publish`);
    return s;
  };
  // a review: owner-approved, competent reviewers and evidence from the same source; two different people where needed
  const reviewOk = (review, kind, src, two, where) => {
    if (!review) { e("review.missing", where, "a verified or partially verified value needs a review"); return; }
    for (const who of [review.by, ...(two ? [review.second_by] : [])]) {
      if (!who) { e("review.second", where, "needs a second reviewer"); continue; }
      const r = reviewers.get(who);
      if (!r) { e("review.reviewer", where, `unknown reviewer ${who}`); continue; }
      if (!r.approved_by_owner && !(fixtureMode && r.fixture)) e("review.unapproved", where, `reviewer ${who} isn't approved by the owner`);
      if (r.fixture && !fixtureMode) e("review.fixture", where, `fixture reviewer ${who} outside a fixture bundle`);
      if (!r.competence.includes(kind)) e("review.competence", where, `reviewer ${who} isn't competent for ${kind}`);
    }
    if (two && review.second_by && review.second_by === review.by) e("review.same", where, "the second reviewer must be a different person");
    const ev = evidence.get(review.evidence);
    if (!ev) e("review.evidence", where, `unknown evidence ${review.evidence}`);
    else if (ev.source !== src) e("review.evidence_source", where, `evidence ${ev.id} is from ${ev.source}, not ${src}`);
  };

  // records
  for (const [i, rec] of bundle.records.entries()) {
    const where = `records[${i}] ${rec.id}`;
    if (typeOfId(rec.id) !== rec.type) e("id.prefix", where, `ID prefix doesn't match type ${rec.type} (expected ${PREFIX[rec.type]}_)`);
    if (live.has(rec.id)) e("id.duplicate", where, "duplicate ID");
    if (tomb.has(rec.id)) e("id.reused", where, "ID is tombstoned and can't be reused");
    live.set(rec.id, rec);
    if (fixtureMode && rec.fixture !== true) e("fixture.flag", where, "fixture records must be marked fixture: true");
    if (!fixtureMode && rec.fixture) e("fixture.leak", where, "a fixture record outside a fixture bundle");
    for (const x of check(rec.data, SCHEMA.$defs[`data.${rec.type}`], SCHEMA, `${where}.data`)) e("schema.data", x.path, x.message);
    if (rec.type === "provider" && (!rec.country || !rec.region)) e("provider.place", where, "a provider needs country and region (search shards are by region)");
    for (const k of keysDeep(rec.data)) if (PERSONAL.test(k.split(".").pop())) e("personal_data", `${where}.data.${k}`, "personal data fields are never allowed in the catalogue");
    if (rec.provenance.next_review < rec.provenance.last_checked) e("provenance.dates", where, "next_review is before last_checked");
    sourceOk(rec.provenance.source, `${where}.provenance`);
    const fieldNames = Object.keys(rec.data);
    for (const f of fieldNames) if (!rec.fields[f]) e("field.no_meta", `${where}.data.${f}`, "every field needs its own status and source");
    for (const [f, m] of Object.entries(rec.fields)) {
      const fw = `${where}.fields.${f}`;
      if (!fieldNames.includes(f)) { e("field.orphan", fw, "status for a field that isn't in data"); continue; }
      const s = sourceOk(m.source, fw);
      if (s && s.verdict !== "fixture" && !(s.fields_allowed[rec.type] || []).includes(f)) e("field.not_cleared", fw, `source ${s.id} isn't cleared to supply ${rec.type}.${f}`);
      if (m.status === "verified" || m.status === "partially_verified") reviewOk(m.review, rec.type, m.source, m.status === "verified" && needsTwo(rec, f), fw);
    }
    if (rec.pending) for (const f of rec.pending.changed) {
      if (!fieldNames.includes(f)) e("pending.field", where, `pending change to unknown field ${f}`);
      else if (!["outdated", "unverified"].includes(rec.fields[f]?.status)) e("pending.status", `${where}.fields.${f}`, "a field with a pending source change must be outdated or unverified until reviewed");
    }
  }
  for (const rec of bundle.records) if (rec.type === "structure") {
    const off = live.get(rec.data.offering);
    if (!off || off.type !== "offering") e("structure.offering", rec.id, "structure.offering must be a live offering");
    else if (!bundle.edges.some((x) => x.type === "has_structure" && x.from === off.id && x.to === rec.id)) e("structure.edge", rec.id, "missing has_structure edge from its offering");
  }

  // edges: live ends of the right types
  for (const [i, ed] of bundle.edges.entries()) {
    const where = `edges[${i}] ${ed.type} ${ed.from}→${ed.to}`;
    const a = live.get(ed.from), b = live.get(ed.to), [fromT, toT] = EDGE_TYPES[ed.type];
    if (!a || !b) { e("edge.dangling", where, "edge must join two live records"); continue; }
    if (ed.type === "supersedes" ? a.type !== b.type : !fromT.includes(a.type) || !toT.includes(b.type)) e("edge.types", where, `${ed.type} can't join ${a.type} → ${b.type}`);
    if (ed.from === ed.to) e("edge.self", where, "an edge can't join a record to itself");
    sourceOk(ed.source, where);
    if (ed.status === "verified" || ed.status === "partially_verified") reviewOk(ed.review, "edge", ed.source, ed.status === "verified" && ed.type === "includes", where);
  }

  // aliases: unique while valid, pointing at live records
  const seen = new Map();
  for (const [i, al] of bundle.aliases.entries()) {
    const where = `aliases[${i}] ${al.scheme}:${al.value}`;
    if (!live.has(al.id)) e("alias.target", where, "alias must point at a live record (move it when records merge)");
    sourceOk(al.source, where, { forPublish: false });
    if (!al.valid_to) { const k = `${al.scheme}:${al.value}`; if (seen.has(k) && seen.get(k) !== al.id) e("alias.collision", where, `already points at ${seen.get(k)}`); seen.set(k, al.id); }
  }

  // tombstones: exactly one of merged_into / split_into, resolving to live records
  for (const t of bundle.tombstones) {
    const where = `tombstone ${t.id}`;
    if (Boolean(t.merged_into) === Boolean(t.split_into)) { e("tombstone.shape", where, "needs exactly one of merged_into or split_into"); continue; }
    const r = resolveId(t.id, tomb);
    if (r.loop || r.missing || (r.id && !live.has(r.id))) e("tombstone.resolve", where, "doesn't resolve to a live record");
    for (const s of t.split_into || []) if (!live.has(s)) e("tombstone.split", where, `split target ${s} isn't live`);
  }

  // evidence: extracts only where the source allows keeping them
  for (const ev of bundle.evidence) {
    const s = sources.get(ev.source);
    if (!s) { e("evidence.source", ev.id, `unknown source ${ev.source}`); continue; }
    if (ev.category === "internal_extract" && s.verdict !== "fixture" && s.rights.evidence !== true) e("evidence.extract", ev.id, `source ${s.id} doesn't allow keeping extracts: use link_only`);
    if (ev.category === "link_only" && ev.extract) e("evidence.link_only", ev.id, "link-only evidence can't carry an extract");
  }

  const stats = { records: bundle.records.length, edges: bundle.edges.length, aliases: bundle.aliases.length, tombstones: bundle.tombstones.length };
  return { ok: !errors.length, errors, stats };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const file = process.argv[2];
  if (!file) { console.error("Usage: node scripts/catalogue/validate.mjs <bundle.json>"); process.exit(2); }
  const res = validateBundle(JSON.parse(readFileSync(file, "utf8")));
  for (const x of res.errors) console.error(`✗ [${x.code}] ${x.where}: ${x.message}`);
  console.log(res.ok ? `✓ valid: ${JSON.stringify(res.stats)}` : `${res.errors.length} error(s)`);
  process.exit(res.ok ? 0 : 1);
}
