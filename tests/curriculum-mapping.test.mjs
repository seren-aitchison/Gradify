// Curriculum mapping (Biology → England pilot, scripts/curriculum/README.md): the official requirements, the course
// inventory, the judged lesson mapping and the generated coverage report must agree with each other and with the
// course as it is now, and must never claim more than the evidence supports.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { parseNotes, norm } from "../kit/course/notes.js";
import { UNITS } from "../kit/courses/biology/syllabus.js";
import { COURSES } from "../kit/curriculum/coverage.js";

const read = async (p) => JSON.parse(await readFile(new URL(`../${p}`, import.meta.url), "utf8"));
const R = await read("data/curriculum/requirements/england-biology.json");
const inv = await read("data/curriculum/inventory/biology.json");
const M = await read("data/curriculum/mapping/biology-england.json");
const C = await read("data/curriculum/reports/biology-england-coverage.json");

test("requirements: unique stable ids, wording, and provenance for every record", () => {
  const ids = new Set();
  for (const r of R.requirements) {
    assert.ok(!ids.has(r.id), `${r.id} is duplicated`); ids.add(r.id);
    assert.match(r.id, /^eng-(nc|aqa8461|edx1bi0|ocrj247|ocrj257|eduqas)-[A-Za-z0-9.-]+$/);
    assert.ok(R.sources[r.source]?.url && R.sources[r.source].version && R.sources[r.source].retrieved, `${r.id}: its source records url, version and retrieval date`);
    assert.ok(r.text && r.text.length >= 7, `${r.id} has its wording`);
    assert.ok(r.loc, `${r.id} records its page or line in the source`);
    assert.ok(["statutory", "examination"].includes(r.status), `${r.id} says whether it is statutory or an exam specification`);
  }
});

test("requirements: year allocations are the documents' own (no invented years)", () => {
  for (const r of R.requirements) {
    if (r.yearAllocation === "year") assert.ok(r.source === "dfe-nc" && r.years.length === 1 && r.years[0] <= 6, `${r.id}: only years 1–6 of the national curriculum are set year by year`);
    if (r.keyStage === "KS3") assert.deepEqual(r.years, [7, 8, 9], `${r.id}: key stage 3 is a stage, not a year`);
    if (r.keyStage === "KS4") assert.deepEqual(r.years, [10, 11], `${r.id}: key stage 4 is a stage, not a year`);
  }
});

test("inventory: matches the Biology course as it is now (re-run scripts/curriculum/inventory.mjs after editing notes)", async () => {
  const lessons = UNITS.flatMap((u) => u.lessons);
  assert.deepEqual(inv.lessons.map((l) => l.id), lessons.map((l) => l.id), "same lessons in the same order");
  let cards = 0;
  for (const u of UNITS) cards += parseNotes((await import(`../kit/courses/biology/notes/${u.id}.js`)).default).reduce((s, L) => s + L.cards.length, 0);
  assert.equal(inv.counts.flashcard, cards, "flashcard count is current");
  const qids = inv.resources.filter((x) => !["flashcard", "diagram", "mindmap", "interactive"].includes(x.type)).map((x) => x.id);
  assert.ok(qids.every(Boolean) && new Set(qids).size === qids.length, "every question keeps its permanent registry id, once");
});

test("mapping: the .map source builds cleanly, and the built file is current", async () => {
  const { stdout } = await promisify(execFile)("node", ["scripts/curriculum/build-mapping.mjs", "biology", "--check"], { cwd: new URL("..", import.meta.url) });
  const judged = Number(stdout.match(/^(\d+) requirements judged/)[1]);
  assert.equal(judged, M.counts.judged, "re-run scripts/curriculum/build-mapping.mjs biology after editing the .map file");
  assert.equal(M.counts.pending, 0, "every requirement is judged");
});

test("mapping: every link names a real lesson and requirement, with evidence; gaps say what is missing", () => {
  const lessons = new Set(inv.lessons.map((l) => l.id)), reqs = new Set(R.requirements.map((r) => r.id));
  for (const m of M.mappings) {
    assert.ok(lessons.has(m.lesson) && reqs.has(m.requirement), `${m.requirement} → ${m.lesson}`);
    assert.ok(["full", "partial", "indirect"].includes(m.match) && ["high", "medium", "low"].includes(m.confidence));
    assert.ok(m.evidence && m.evidence.length > 10, `${m.requirement} → ${m.lesson} quotes evidence from the lesson`);
  }
  for (const [id, j] of Object.entries(M.requirements)) if (j.status !== "full") assert.ok(j.note, `${id} (${j.status}) says what is missing`);
});

test("no claim beyond the evidence: the mapping is labelled AI-drafted and nothing is marked verified", () => {
  assert.equal(M.review.status, "ai-drafted");
  assert.equal(M.review.reviewer, null);
  assert.equal(M.review.verifiedOn, null);
  assert.notEqual(COURSES.biology?.serves?.[0]?.status, "verified", "Biology can't be shown as verified without a named reviewer");
});

test("coverage report: generated from the current mapping, each requirement counted once", () => {
  const o = C.overall;
  assert.equal(o.total, R.requirements.length);
  assert.equal(o.full + o.partial + o.indirect + o.uncovered + o.pending, o.total, "statuses partition the requirements");
  const full = Object.values(M.requirements).filter((j) => j.status === "full").length;
  assert.equal(o.full, full, "re-run scripts/curriculum/report.mjs biology after rebuilding the mapping");
  for (const g of C.groups) assert.ok(g.full <= g.total && g.full + g.partial + g.indirect + g.uncovered + g.pending === g.total, g.name);
});
