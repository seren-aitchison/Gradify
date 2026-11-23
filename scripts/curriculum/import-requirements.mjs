// Import an existing requirements dataset (for example an earlier extraction of the England specifications) into
// a Gradify requirements file, instead of extracting the same documents again. Dry run by default.
//
//   node scripts/curriculum/import-requirements.mjs <dataset.json> [--into data/curriculum/requirements/england-biology.json] [--write]
//
// The dataset is { sources: { key: {…} }, requirements: [ {…} ] } in the record shape of kit/curriculum/requirements.js.
// Every record is checked, keeps its own id, and is marked importedFrom. Nothing already present is overwritten:
// a record whose id, or whose source and reference, already exists is reported as a duplicate for a person to
// reconcile, so the two datasets can't silently diverge into competing sources of the same requirement.
import { readFile, writeFile } from "node:fs/promises";
import { checkRequirement, checkSource } from "../../kit/curriculum/requirements.js";

const args = process.argv.slice(2), file = args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--into");
const into = args.includes("--into") ? args[args.indexOf("--into") + 1] : "data/curriculum/requirements/england-biology.json";
if (!file) { console.error("usage: import-requirements.mjs <dataset.json> [--into <file>] [--write]"); process.exit(2); }
const incoming = JSON.parse(await readFile(file, "utf8"));
const target = JSON.parse(await readFile(into, "utf8"));
const problems = [], duplicates = [], added = [];
const sources = { ...target.sources };
for (const [k, s] of Object.entries(incoming.sources || {})) {
  problems.push(...checkSource(k, s));
  if (sources[k] && JSON.stringify(sources[k]) !== JSON.stringify(s)) duplicates.push(`source ${k} already exists with different details`);
  else sources[k] = s;
}
const byId = new Set(target.requirements.map((r) => r.id)), byRef = new Set(target.requirements.filter((r) => r.ref).map((r) => `${r.source}|${r.ref}`));
for (const r of incoming.requirements || []) {
  const rec = { ...r, importedFrom: r.importedFrom || file };
  const p = checkRequirement(rec, sources);
  if (p.length) { problems.push(...p); continue; }
  if (byId.has(rec.id) || (rec.ref && byRef.has(`${rec.source}|${rec.ref}`))) { duplicates.push(rec.id); continue; }
  added.push(rec); byId.add(rec.id); if (rec.ref) byRef.add(`${rec.source}|${rec.ref}`);
}
console.log(`${added.length} to add, ${duplicates.length} already present (not overwritten), ${problems.length} problems`);
if (duplicates.length) console.log(`duplicates to reconcile by hand:\n  ${duplicates.slice(0, 50).join("\n  ")}`);
if (problems.length) { console.error(problems.slice(0, 50).join("\n")); process.exit(1); }
if (args.includes("--write") && added.length) {
  await writeFile(into, JSON.stringify({ ...target, sources, requirements: [...target.requirements, ...added] }, null, 1));
  console.log(`written to ${into}: re-run build-mapping.mjs and report.mjs; the new requirements are pending until judged`);
}
