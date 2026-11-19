// Flattens docs/qa/uk-coverage.json (scripts/curriculum-progress.mjs) into the three tables the coverage dashboard reads:
//   node scripts/curriculum-dashboard-data.mjs <out-dir>
// catalogue.json (one row per catalogue row and nation), content.json (one row per course), specs.json (one per modelled spec).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { LEVEL_NAMES, LEVELS } from "../kit/curriculum/matrix.js";
import { BAND_NAMES, BANDS } from "../kit/curriculum/schema.js";
const out = process.argv[2] || "docs/qa/dashboard";
const d = JSON.parse(await readFile(new URL("../docs/qa/uk-coverage.json", import.meta.url), "utf8"));
const NAT = { "uk-eng": "England", "uk-wal": "Wales", "uk-sco": "Scotland", "uk-ni": "Northern Ireland" };
const catalogue = d.rows.flatMap((r) => r.nations.map((n) => ({
  row: r.id, nation: NAT[n], level: BAND_NAMES[r.band], levelOrder: BANDS.indexOf(r.band), group: r.group, subject: r.subject, body: r.body,
  qualification: r.qualification || "", code: r.code || "", title: r.title, status: LEVEL_NAMES[r.status], statusOrder: LEVELS.indexOf(r.status),
  taught: ["subject", "aligned", "measured", "verified"].includes(r.status) ? 1 : 0, courses: [...r.courses, ...r.related.map((c) => `${c} (related)`)].join(", "),
})));
const content = d.content.map((c) => ({ course: `${c.site} ${c.name}`, slug: c.course, lessons: c.lessons, written: c.written, standard2: c.valid, enhanced: c.enhanced, generated: c.generated, reviewed: c.reviewed, approved: c.approved }));
const specs = d.rows.filter((r) => r.measure).map((r) => ({ spec: r.measure.spec, name: `${r.body} ${r.qualification || ""} ${r.title}${r.code ? ` (${r.code})` : ""}`.replace(/\s+/g, " "), outcomes: r.measure.outcomes, covered: r.measure.covered, partial: r.measure.partial, gap: r.measure.gap, unmapped: r.measure.unmapped, source: r.measure.checked ? "Checked by a person" : r.measure.extracted ? "Extracted from the published document" : "Paraphrased, unchecked" }));
await mkdir(out, { recursive: true });
for (const [f, rows] of Object.entries({ catalogue, content, specs })) await writeFile(`${out}/${f}.json`, JSON.stringify(rows));
console.log({ catalogue: catalogue.length, content: content.length, specs: specs.length, generated: d.generated });
