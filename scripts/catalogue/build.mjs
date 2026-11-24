// Build a validated catalogue bundle into the files the browser reads (docs/CATALOGUE.md, "Published layout"):
//   manifest.json                              schema version, build id, sources with licence and attribution, counts, regions
//   systems.json                               every education system
//   providers/<CC>/<REGION>/index.json         compact search rows for one region: [id, name, alt names, kind, town, lifecycle]
//   objects/<type>/<bucket>.json               full records, 1,024 buckets per type (bucket = last two ID characters)
//   relations/<bucket>.json                    every edge touching an ID in that bucket (both directions)
//   tombstones.json                            merged_into / split_into, so stored IDs keep resolving
// Never published: evidence, reviewer identities, aliases (build-time matching only) and the values of pending source
// changes (only which fields changed). The build refuses an invalid bundle.
//   node scripts/catalogue/build.mjs <bundle.json> <out-dir>
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateBundle } from "./validate.mjs";
import { bucketOf } from "../../kit/data/catalogue-ids.js";

const publicFields = (fields) => Object.fromEntries(Object.entries(fields || {}).map(([k, m]) => [k, {
  status: m.status, source: m.source, ...(m.review ? { reviewed: { at: m.review.at, two: Boolean(m.review.second_by) } } : {}),
}]));
function publicRecord(r) {
  const p = r.provenance;
  const last = r.versions?.length ? r.versions[r.versions.length - 1] : null;
  // a field with a pending source change is published with its last verified value (or as it was, if it never had
  // one): the new, unreviewed value stays out of the published files until a reviewer accepts it
  const data = { ...r.data };
  for (const f of r.pending?.changed || []) if (last && f in last.data) data[f] = last.data[f];
  return {
    id: r.id, type: r.type, ...(r.country ? { country: r.country } : {}), ...(r.region ? { region: r.region } : {}), ...(r.lifecycle ? { lifecycle: r.lifecycle } : {}),
    ...(r.fixture ? { fixture: true } : {}),
    data, fields: publicFields(r.fields),
    provenance: { source: p.source, source_url: p.source_url, academic_year: p.academic_year ?? null, effective_from: p.effective_from ?? null, effective_to: p.effective_to ?? null, supersedes: p.supersedes ?? null, last_checked: p.last_checked, next_review: p.next_review },
    ...(last ? { last_verified: { at: last.at, data: last.data, fields: publicFields(last.fields) } } : {}),
    ...(r.pending ? { pending: { detected_at: r.pending.detected_at, changed: r.pending.changed } } : {}),
  };
}

/** Build a bundle into a Map of path → JSON value. Throws if the bundle isn't valid. */
export function buildCatalogue(bundle, { publish = true, builtAt = new Date().toISOString().slice(0, 10) } = {}) {
  const v = validateBundle(bundle, { publish });
  if (!v.ok) { const err = new Error(`Invalid catalogue bundle: ${v.errors.length} error(s), first: [${v.errors[0].code}] ${v.errors[0].where}: ${v.errors[0].message}`); err.errors = v.errors; throw err; }
  const files = new Map();
  const put = (path, fn) => { if (!files.has(path)) files.set(path, fn()); return files.get(path); };

  const regions = {};
  for (const r of bundle.records) {
    put(`objects/${r.type}/${bucketOf(r.id)}.json`, () => ({}))[r.id] = publicRecord(r);
    if (r.type === "provider") {
      (regions[r.country] ||= new Set()).add(r.region);
      put(`providers/${r.country}/${r.region}/index.json`, () => ({ country: r.country, region: r.region, rows: [] }))
        .rows.push([r.id, r.data.name, r.data.alt_names || [], r.data.kind, r.data.town || "", r.lifecycle || "open"]);
    }
  }
  for (const [path, v2] of files) if (path.startsWith("providers/")) v2.rows.sort((a, b) => a[1].localeCompare(b[1], "en"));
  files.set("systems.json", bundle.records.filter((r) => r.type === "system").map(publicRecord));
  for (const ed of bundle.edges) {
    const pub = { type: ed.type, from: ed.from, to: ed.to, ...(ed.attrs ? { attrs: ed.attrs } : {}), status: ed.status, source: ed.source, ...(ed.review ? { reviewed: { at: ed.review.at, two: Boolean(ed.review.second_by) } } : {}) };
    for (const end of new Set([ed.from, ed.to])) { const b = put(`relations/${bucketOf(end)}.json`, () => ({})); (b[end] ||= []).push(pub); }
  }
  files.set("tombstones.json", Object.fromEntries(bundle.tombstones.map((t) => [t.id, { ...(t.merged_into ? { merged_into: t.merged_into } : { split_into: t.split_into }), ...(t.display_name ? { display_name: t.display_name } : {}) }])));
  const usedSources = new Set([...bundle.records.flatMap((r) => [r.provenance.source, ...Object.values(r.fields).map((f) => f.source)]), ...bundle.edges.map((x) => x.source)]);
  const hash = createHash("sha256");
  for (const k of [...files.keys()].sort()) hash.update(k).update(JSON.stringify(files.get(k)));
  files.set("manifest.json", {
    schema_version: 1, kind: bundle.kind, build_id: hash.digest("hex").slice(0, 12), built_at: builtAt,
    sources: bundle.sources.filter((s) => usedSources.has(s.id)).map((s) => ({ id: s.id, name: s.name, owner: s.owner, url: s.url, licence: s.licence?.name || null, licence_url: s.licence?.url || null, attribution: s.licence?.attribution || null })),
    counts: Object.fromEntries(["system", "provider", "offering", "structure", "unit", "assessment", "curriculum", "rule"].map((t) => [t, bundle.records.filter((r) => r.type === t).length])),
    regions: Object.fromEntries(Object.entries(regions).map(([c, s]) => [c, [...s].sort()])),
  });
  return files;
}

export function writeCatalogue(files, outDir) {
  for (const [path, value] of files) { const f = join(outDir, path); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, JSON.stringify(value)); }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [file, out] = process.argv.slice(2);
  if (!file || !out) { console.error("Usage: node scripts/catalogue/build.mjs <bundle.json> <out-dir>"); process.exit(2); }
  try { const files = buildCatalogue(JSON.parse(readFileSync(file, "utf8"))); writeCatalogue(files, out); console.log(`✓ wrote ${files.size} files to ${out} (build ${files.get("manifest.json").build_id})`); }
  catch (err) { for (const x of err.errors || []) console.error(`✗ [${x.code}] ${x.where}: ${x.message}`); console.error(err.message); process.exit(1); }
}
