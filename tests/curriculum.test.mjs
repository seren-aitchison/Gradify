// The curriculum engine (kit/curriculum/uk.js, mapping.js; scripts/curriculum/engine.mjs). The statements in these
// tests are WRITTEN FOR THE TESTS, not taken from any awarding body's specification.
import { test } from "node:test";
import assert from "node:assert/strict";
import { SPECS, checkRegistry, specsFor, nationsOf } from "../kit/curriculum/uk.js";
import { statusOf, coverageReport, claimFor, checkMap, whereYouStand } from "../kit/curriculum/mapping.js";
import { COURSES as COVERAGE } from "../kit/curriculum/coverage.js";
import { parseSpecText, parseSpecCsv, propose, mergeProposals, loadStatements, loadMap } from "../scripts/curriculum/engine.mjs";
import { lessonsOf } from "../scripts/growth/lesson-readiness.mjs";

const spec = { spec: "test-spec", version: "1.0", statements: [{ ref: "1.1", text: "a" }, { ref: "1.2", text: "b" }, { ref: "1.3", text: "c" }, { ref: "1.4", text: "d" }] };
const map = { spec: "test-spec", specVersion: "1.0", links: {
  "1.1": { status: "verified", reviewer: "A. Teacher", reviewedOn: "2026-12-01", lessons: [{ id: "u04-03", coverage: "full" }] },
  "1.2": { status: "verified", reviewer: "A. Teacher", reviewedOn: "2026-12-01", lessons: [{ id: "u05-03", coverage: "partial", note: "no cytokinesis" }] },
  "1.3": { status: "verified", reviewer: "A. Teacher", reviewedOn: "2026-12-01", lessons: [], gap: "not taught" },
  "1.4": { status: "proposed", lessons: [{ id: "u02-21", coverage: "partial" }] } } };

test("the UK registry: every Biology specification across the four nations, nothing confirmed without a source", () => {
  assert.deepEqual(checkRegistry(), []);
  const bio = specsFor("biology");
  for (const n of ["England", "Wales", "Scotland", "Northern Ireland"]) assert.ok(bio.some((s) => nationsOf(s).map((x) => ({ eng: "England", wal: "Wales", sco: "Scotland", ni: "Northern Ireland" })[x]).includes(n)), n);
  assert.ok(bio.every((s) => s.confirmed === false || (s.document?.sha1 && s.checkedOn)), "no specification is confirmed until checked against the official document");
  assert.match(checkRegistry([{ ...SPECS.find((s) => s.id === "aqa-gcse-combined-trilogy"), confirmed: true }])[0], /confirmed needs code, version, the official source URL/);
  assert.match(checkRegistry([{ ...SPECS[0], qual: "nat5" }])[0], /doesn't award National 5/);
});

test("statuses: covered, partial, missing, and anything unreviewed or out of date is awaiting", () => {
  const r = coverageReport(spec, map);
  assert.deepEqual(r.rows.map((x) => x.status), ["covered", "partial", "missing", "awaiting"]);
  assert.deepEqual(r.totals, { statements: 4, covered: 1, partial: 1, missing: 1, awaiting: 1 });
  assert.equal(statusOf(map.links["1.1"], "2.0", "1.0"), "awaiting", "reviewed against an older version");
});

test("a claim needs every statement reviewed against the current version, and says only what's measured", () => {
  assert.equal(claimFor(spec, map).allowed, false);
  const done = { ...map, links: { ...map.links, "1.4": { ...map.links["1.4"], status: "verified", reviewer: "A. Teacher", reviewedOn: "2026-12-02" } } };
  const c = claimFor(spec, done);
  assert.equal(c.allowed, true); assert.equal(c.line, "Covers 1 of 4 specification statements fully and 2 in part");
  assert.equal(claimFor({ ...spec, version: "2.0" }, done).allowed, false);
});

test("map checks: unknown statements and lessons, reviewer and date, gaps explained", () => {
  const bad = { spec: "test-spec", links: { "9.9": { status: "verified", lessons: [{ id: "nope", coverage: "most" }] }, "1.3": { status: "verified", reviewer: "x", reviewedOn: "2026-12-01", lessons: [] } } };
  const p = checkMap(spec, bad, new Set(["u04-03"]));
  for (const re of [/9\.9: not a statement/, /unknown lesson nope/, /full or partial/, /needs a reviewer/, /gap needs a note/]) assert.ok(p.some((x) => re.test(x)), String(re));
});

test("where a learner stands: only verified links count, and a statement is as strong as its weakest lesson", () => {
  const w = whereYouStand(spec, map, { "u04-03": 0.9, "u05-03": 0.5 });
  assert.deepEqual(w.rows.map((r) => r.standing), ["secure", "developing", "not-on-gradify", "unmapped"]);
  assert.equal(whereYouStand(spec, map, {}).rows[0].standing, "not-started");
  assert.equal(w.next[0].ref, "1.2");
});

test("importing: numbered statements from specification text, contents lines skipped; or a reviewer's CSV", () => {
  const text = "Contents\n4.1.1 Cell structure ............ 12\n\n4.1.1.1 Cell types\nStudents should be able to compare two kinds of cell.\nThey should know sizes.\n4.1.1.2 Cell parts\nName the parts.\n";
  const s = parseSpecText(text);
  assert.deepEqual(s.map((x) => [x.ref, x.title]), [["4.1.1.1", "Cell types"], ["4.1.1.2", "Cell parts"]]);
  assert.match(s[0].text, /compare two kinds of cell\. They should know sizes\./);
  assert.deepEqual(s[0].topic, ["4", "4.1", "4.1.1"]);
  const c = parseSpecCsv('ref,topic,title,statement,tier\n2.1,Cells > Transport,Osmosis,"Explain osmosis, with examples",higher\n');
  assert.deepEqual(c[0], { ref: "2.1", topic: ["Cells", "Transport"], title: "Osmosis", text: "Explain osmosis, with examples", tier: "higher" });
});

test("the matcher finds the right Biology lessons for test statements, and proposals never count as coverage", async () => {
  const lessons = await lessonsOf(["biology"]);
  const st = [
    { ref: "T1", title: "DNA replication", text: "Semi-conservative replication; the roles of helicase, DNA polymerase and ligase; leading and lagging strands." },
    { ref: "T2", title: "Mitosis", text: "The stages of mitosis: prophase, metaphase, anaphase and telophase, and the role of the spindle." },
    { ref: "T3", title: "Osmosis", text: "Movement of water across a partially permeable membrane down a water potential gradient." },
  ];
  const p = propose(st, lessons);
  assert.deepEqual(p.map((x) => x.candidates[0].id), ["u04-03", "u05-03", "u02-21"]);
  const m = mergeProposals({ spec: "test-spec", specVersion: "1.0", links: { T3: { status: "verified", reviewer: "r", reviewedOn: "2026-12-01", lessons: [{ id: "u02-21", coverage: "full" }] } } }, p);
  assert.equal(m.links.T1.status, "proposed"); assert.equal(m.links.T3.status, "verified", "verified links are never overwritten");
  assert.equal(coverageReport({ spec: "test-spec", version: "1.0", statements: st }, m).totals.awaiting, 2);
});

test("no qualification is claimed for a subject whose specifications aren't fully verified", () => {
  for (const s of SPECS) {
    const st = loadStatements(s.id), m = loadMap(s.id);
    const claimed = Object.values(COVERAGE).some((c) => c.serves.some((x) => x.spec === s.id && x.status === "verified"));
    if (claimed) assert.ok(st && claimFor(st, m).allowed, `${s.id} is claimed as verified in coverage.js but its map isn't fully reviewed`);
  }
  assert.equal(COVERAGE.biology, undefined, "biology stays Gradify curriculum until a specification is verified");
});
