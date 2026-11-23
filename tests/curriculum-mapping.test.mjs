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
import { COURSES, check, mappingOf, coverageOf, summary } from "../kit/curriculum/coverage.js";
import { checkRequirement, checkSource } from "../kit/curriculum/requirements.js";
import { writeFile, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const read = async (p) => JSON.parse(await readFile(new URL(`../${p}`, import.meta.url), "utf8"));
const R = await read("data/curriculum/requirements/england-biology.json");
const inv = await read("data/curriculum/inventory/biology.json");
const M = await read("data/curriculum/mapping/biology-england.json");
const C = await read("data/curriculum/reports/biology-england-coverage.json");
const Q = await read("data/curriculum/review/biology-england-queue.json");
const D = await read("data/curriculum/review/biology-england-decisions.json");
const run = (...a) => promisify(execFile)("node", a, { cwd: new URL("..", import.meta.url) });

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
  const { stdout } = await run("scripts/curriculum/build-mapping.mjs", "biology", "--check");
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

test("no claim beyond the evidence: AI-drafted until a named reviewer decides every link; nothing is verified", () => {
  const reviewed = M.mappings.filter((l) => l.review);
  assert.equal(M.review.status, reviewed.length === 0 ? "ai-drafted" : reviewed.length < M.mappings.length ? "partly-reviewed" : "reviewed");
  assert.equal(M.review.verifiedOn, null);
  for (const l of reviewed) assert.ok(l.review.reviewer && /^\d{4}-\d{2}-\d{2}$/.test(l.review.on), `${l.requirement} → ${l.lesson}: a review names its reviewer and date`);
  for (const d of D.decisions) assert.ok(D.reviewers[d.reviewer]?.name && D.reviewers[d.reviewer]?.qualifications, "every decision's reviewer is listed with a name and qualifications");
});

test("registry: Biology's mapping is recorded as drafted, and the learner-facing claim is unchanged", () => {
  assert.deepEqual(check(), []);
  assert.equal(mappingOf("biology").state, "drafted");
  assert.equal(mappingOf("biology").reviewer, null);
  assert.equal(coverageOf("biology").serves[0].status, "gradify", "the quality page still shows Biology as Gradify's own curriculum");
  assert.deepEqual(summary(["biology"]), { verified: 0, mapped: 0, aligned: 0, gradify: 1 });
  assert.equal(mappingOf("art").state, "none");
  // the states can't be skipped or claimed without the people behind them
  const bio = COURSES.biology;
  assert.ok(check({ biology: { ...bio, mapping: { ...bio.mapping, state: "reviewed" } } }).some((p) => /named reviewer/.test(p)));
  assert.ok(check({ biology: { ...bio, mapping: { ...bio.mapping, state: "approved", reviewer: "A", reviewedOn: "2026-12-01" } } }).some((p) => /sources|sign-off/.test(p)));
  assert.ok(check({ biology: { ...bio, serves: [{ q: "gcse", status: "verified", evidence: "x", verifiedOn: "x", reviewer: "x", version: "x" }] } }).some((p) => /only drafted/.test(p)));
});

test("requirements: every record and source fits the shared schema, so other datasets can be imported against it", () => {
  const p = [];
  for (const [k, s] of Object.entries(R.sources)) p.push(...checkSource(k, s));
  for (const r of R.requirements) p.push(...checkRequirement(r, R.sources));
  assert.deepEqual(p, []);
  for (const [k, s] of Object.entries(R.sources)) assert.ok(Array.isArray(s.notExtracted), `${k} records what is not extracted yet`);
});

test("import: an existing dataset is checked, and nothing already present is overwritten", async () => {
  const dir = await mkdtemp(join(tmpdir(), "import-")), file = join(dir, "x.json");
  await writeFile(file, JSON.stringify({ sources: { "dfe-nc": R.sources["dfe-nc"] }, requirements: R.requirements.slice(0, 2) }));
  const { stdout } = await run("scripts/curriculum/import-requirements.mjs", file);
  assert.match(stdout, /^0 to add, 2 already present/);
  await writeFile(file, JSON.stringify({ sources: {}, requirements: [{ id: "eng-x-1", source: "nowhere", text: "short" }] }));
  await assert.rejects(run("scripts/curriculum/import-requirements.mjs", file), "a malformed record is refused");
});

test("coverage report: generated from the current mapping, each requirement counted once", async () => {
  const o = C.overall;
  assert.equal(o.total, R.requirements.length);
  assert.equal(o.full + o.partial + o.indirect + o.uncovered + o.pending, o.total, "statuses partition the requirements");
  const full = Object.values(M.requirements).filter((j) => j.status === "full").length;
  assert.equal(o.full, full, "re-run scripts/curriculum/report.mjs biology after rebuilding the mapping");
  for (const g of C.groups) assert.ok(g.full <= g.total && g.full + g.partial + g.indirect + g.uncovered + g.pending === g.total, g.name);
  // full and partial are never combined into one figure
  assert.ok(!JSON.stringify(C).includes("fullOrPartial"));
  const md = await readFile(new URL("../docs/curriculum/biology-england-coverage.md", import.meta.url), "utf8");
  assert.ok(!/full or partial[^.]*%|%[^.|]*full or partial/i.test(md), "the report never states a combined full-or-partial percentage");
  assert.match(md, /can't be claimed yet/, "the report says comprehensive GCSE coverage can't be claimed while material is unextracted");
});

test("gaps: each is missing, depth or age-level, prioritised GCSE, key stage 3, practical, primary", () => {
  for (const g of C.gaps.items) {
    assert.ok(["missing", "depth", "age-level"].includes(g.kind), g.id);
    const r = R.requirements.find((x) => x.id === g.id);
    if (g.kind === "age-level") assert.ok(["KS1", "KS2"].includes(r.keyStage), `${g.id}: only primary gaps are age-level`);
  }
  assert.deepEqual(C.gaps.prioritised.map((p) => p.priority), [1, 2, 3, 4]);
});

test("review queue: every undecided link once, highest-risk tier first", () => {
  const undecided = M.mappings.filter((l) => !l.review).map((l) => `${l.requirement}|${l.lesson}`);
  const queued = Q.items.map((x) => `${x.requirement}|${x.lesson}`);
  assert.equal(new Set(queued).size, queued.length, "no link twice");
  assert.deepEqual([...queued].sort(), [...undecided].sort(), "re-run scripts/curriculum/review-queue.mjs biology");
  assert.equal(Q.tiers[0].links, M.mappings.filter((l) => !l.review && l.evidenceOverlap === 0).length, "tier 1 is the links with no shared wording");
  for (let i = 1; i < Q.items.length; i++) assert.ok(Q.items[i - 1].tier <= Q.items[i].tier, "ordered by tier");
});
