// The AQA GCSE Biology 8461 import, map and review (scripts/curriculum/aqa.mjs, layout.mjs, engine.mjs;
// kit/curriculum/standing.js). The layouts and statements in the first tests are WRITTEN FOR THE TESTS, in AQA's
// layout but not AQA's words. The later tests read the committed index and map, which hold no specification text.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { extractAqa } from "../scripts/curriculum/aqa.mjs";
import { parseBboxLayout, textHash } from "../scripts/curriculum/layout.mjs";
import { loadIndex, loadMap, indexOf, statementsPath, applyReview, reviewSheet, proposalSummary, band, mergeProposals, REVIEW_COLUMNS } from "../scripts/curriculum/engine.mjs";
import { SPECS, checkRegistry } from "../kit/curriculum/uk.js";
import { coverageReport, claimFor, checkMap } from "../kit/curriculum/mapping.js";
import { specStanding, lessonMastery } from "../kit/curriculum/standing.js";
import { parseTable } from "../scripts/growth/sources.mjs";

const ID = "aqa-gcse-biology";
const B = (x, y, ...lines) => ({ x, y, x2: x + 300, y2: y + 12 * lines.length, lines });
const page = (n, blocks) => ({ page: n, width: 595, height: 842, blocks: [B(353, 26, "GCSE Biology (8461). Version 1.0"), ...blocks, B(200, 805, "Visit aqa.org.uk/8461 for the most up-to-date specification"), B(544, 805, String(n))] });
// two pages in AQA's layout, written for the tests
const PAGES = [
  page(1, [B(43, 100, "4.1 Cell biology .................... 16"), B(43, 120, "4.2 Organisation .................... 24")]),   // contents page
  page(2, [
    B(43, 80, "4.1"), B(88, 80, "Cell biology"),
    B(43, 110, "An introduction to the topic, not a statement."),
    B(43, 160, "4.1.1 Cell structure", "4.1.1.1 Test cells"),
    B(48, 190, "Content"), B(417, 190, "Key opportunities for", "skills development"),
    B(48, 220, "Test cells have a membrane and", "a nucleus."),
    B(48, 260, "Students should be able to compare two test cells."), B(417, 260, "MS 1a, 2b", "WS 1.2"),
    B(48, 300, "Limited to two kinds of cell."),
    B(48, 330, "(HT only) Higher test cells have an extra part."),
    B(43, 370, "Required practical activity 1: look at test cells under a", "microscope."),
    B(43, 400, "AT skills covered by this practical activity: AT 1 and 7."),
    B(43, 420, "This practical activity also provides opportunities to develop WS and MS."),
    B(43, 440, "To include: a labelled drawing."),
    B(43, 480, "4.1.1.2 Test transport (biology only)"),
    B(48, 500, "Content"), B(332, 500, "Key opportunities for skills development"),
    B(48, 530, "Test particles move from high to low"),
    B(332, 530, "AT 3 Measure a test rate."),
  ]),
  page(3, [
    B(48, 100, "concentration across a test membrane."),
    B(48, 140, "Test transport needs energy: CO 2 and H 2 O are made, and C 6 H 12 O 6 is used, as in the 19 th century."),
    B(43, 300, "4.8"), B(88, 300, "Key ideas"),
    B(43, 330, "A key idea that isn't a statement."),
  ]),
];

test("extracting AQA's layout: sections, one statement per paragraph, columns, flags, limits and practicals", () => {
  const r = extractAqa(PAGES);
  assert.deepEqual(r.sections.map((s) => [s.ref, s.title]), [["4.1", "Cell biology"], ["4.1.1", "Cell structure"], ["4.1.1.1", "Test cells"], ["4.1.1.2", "Test transport"]], "the contents page is skipped and headings are read");
  assert.equal(r.sections[3].biologyOnly, true);
  const by = Object.fromEntries(r.statements.map((s) => [s.ref, s]));
  assert.deepEqual(Object.keys(by), ["4.1.1.1.a", "4.1.1.1.b", "4.1.1.1.c", "4.1.1.1.RP1", "4.1.1.2.a", "4.1.1.2.b"], "letters in document order; the practical keeps AQA's number; the introduction and 4.8 aren't statements");
  assert.equal(by["4.1.1.1.a"].text, "Test cells have a membrane and a nucleus.");
  assert.equal(by["4.1.1.1.b"].kind, "skill");
  assert.deepEqual(by["4.1.1.1.b"].skills, ["MS 1a", "MS 2b", "WS 1.2"], "skills codes beside a statement attach to it");
  assert.deepEqual(by["4.1.1.1.b"].scope, ["Limited to two kinds of cell."], "a limit belongs to the statement before it");
  assert.equal(by["4.1.1.1.c"].higherTier, true); assert.equal(by["4.1.1.1.c"].text, "Higher test cells have an extra part.");
  assert.equal(by["4.1.1.1.a"].higherTier, undefined);
  assert.equal(by["4.1.1.1.RP1"].kind, "practical");
  assert.equal(by["4.1.1.1.RP1"].text, "look at test cells under a microscope. To include: a labelled drawing.");
  assert.deepEqual(by["4.1.1.1.RP1"].skills, ["AT 1", "AT 7"]);
  assert.equal(by["4.1.1.2.a"].text, "Test particles move from high to low concentration across a test membrane.", "a statement continues across a page break");
  assert.deepEqual(by["4.1.1.2.a"].skills, ["AT 3"], "this table's skills column starts further left, and is read from its header");
  assert.equal(by["4.1.1.2.a"].biologyOnly, true, "a section's flag applies to its statements");
  assert.match(by["4.1.1.2.b"].text, /CO2 and H2O are made, and C6H12O6 is used, as in the 19th century\./, "subscripts and ordinals rejoined");
  assert.deepEqual(by["4.1.1.2.a"].topic, ["4.1", "4.1.1", "4.1.1.2"]);
  assert.equal(r.practicals, 1);
});

test("reading pdftotext's bbox layout", () => {
  const html = '<doc><page width="595" height="842"><flow><block xMin="48" yMin="100" xMax="300" yMax="120"><line><word>Cells &amp;</word><word>tissues</word></line><line><word>next</word></line></block></flow></page><page width="595" height="842"></page></doc>';
  assert.deepEqual(parseBboxLayout(html), [{ page: 1, width: 595, height: 842, blocks: [{ x: 48, y: 100, x2: 300, y2: 120, lines: ["Cells & tissues", "next"] }] }, { page: 2, width: 595, height: 842, blocks: [] }]);
});

// ---------- the committed import ----------
const idx = loadIndex(ID), map = loadMap(ID);

test("AQA GCSE Biology 8461 is registered with the official document it was imported from", () => {
  assert.deepEqual(checkRegistry(), []);
  const s = SPECS.find((x) => x.id === ID);
  assert.equal(s.confirmed, true); assert.equal(s.code, "8461"); assert.equal(s.statements, "imported");
  assert.equal(s.document.url, "https://filestore.aqa.org.uk/resources/biology/specifications/AQA-8461-SP-2016.PDF");
  assert.equal(s.document.sha1, "510eb7c76df13be23292df4392de95eb32b0d30f");
  for (const k of ["version", "versionDate", "source", "sha1", "checkedOn"]) assert.ok(idx[k], `the index records ${k}`);
  assert.equal(idx.version, s.version); assert.equal(idx.sha1, s.document.sha1); assert.equal(idx.source, s.document.url);
  assert.match(checkRegistry([{ ...s, document: { ...s.document, sha1: "x" } }])[0], /document needs/);
  // the only other confirmed specification is AQA GCSE Chemistry, also checked against its own document
  assert.deepEqual(SPECS.filter((x) => x.id !== ID && x.confirmed).map((x) => x.id), ["aqa-gcse-chemistry"]);
  assert.ok(SPECS.filter((x) => x.confirmed).every((x) => /^[0-9a-f]{40}$/.test(x.document?.sha1 || "")), "every confirmed specification names its official document");
});

test("the index: every statement once, in a real section, with a fingerprint, and no specification text", () => {
  const st = idx.statements, refs = st.map((x) => x.ref), secs = new Map(idx.sections.map((x) => [x.ref, x]));
  assert.equal(new Set(refs).size, refs.length, "no duplicate refs");
  assert.equal(new Set(idx.sections.map((x) => x.ref)).size, idx.sections.length, "no duplicate sections");
  assert.deepEqual(idx.counts, { statements: st.length, content: st.filter((x) => x.kind === "content").length, skill: st.filter((x) => x.kind === "skill").length, practical: 10, higherTier: st.filter((x) => x.higherTier).length, biologyOnly: st.filter((x) => x.biologyOnly).length, sections: idx.sections.length });
  assert.ok(st.length > 400, `${st.length} statements`);
  assert.deepEqual(st.filter((x) => x.kind === "practical").map((x) => x.ref.split(".RP")[1]), ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "all ten required practicals, in order");
  for (const x of st) {
    assert.match(x.ref, x.kind === "practical" ? /^4(\.\d+){2,3}\.RP\d+$/ : /^4(\.\d+){2,3}\.[a-z]+$/, x.ref);
    assert.ok(secs.has(x.section) && secs.get(x.section).title, `${x.ref}: its section exists and has a title`);
    assert.ok(x.ref.startsWith(`${x.section}.`)); assert.match(x.hash, /^[0-9a-f]{16}$/);
    assert.ok(Number.isInteger(x.page) && x.page > 0 && x.page <= 92);
    assert.equal(x.text, undefined, `${x.ref}: no statement text in the committed index`);
  }
  for (const x of idx.sections) assert.ok(x.title.length < 90, `${x.ref}: a heading, not text`);
  // the same words can appear in two sections (AQA repeats some skills); never twice in one section
  const seen = new Set(); for (const x of st) { const k = `${x.section}|${x.hash}`; assert.ok(!seen.has(k), `${x.ref} repeats a statement in its section`); seen.add(k); }
  // 4.8 Key ideas and the skills sections aren't mapped
  assert.ok(st.every((x) => /^4\.[1-7]\./.test(x.ref)));
});

test("the local statement text, when imported here, is exactly what the index fingerprinted", { skip: !existsSync(statementsPath(ID)) && "statement text not imported here (engine.mjs fetch + import)" }, () => {
  const full = JSON.parse(readFileSync(statementsPath(ID), "utf8"));
  assert.equal(full.sha1, idx.sha1);
  assert.deepEqual(indexOf(full).statements, idx.statements, "re-importing the official PDF reproduces the committed index");
  for (const x of full.statements) { assert.ok(x.text.length > 20, x.ref); assert.equal(textHash(x.text), idx.statements.find((y) => y.ref === x.ref).hash); }
});

test("the proposed map: a link for every statement, all proposed, none counted as coverage", async () => {
  const { lessonsOf } = await import("../scripts/growth/lesson-readiness.mjs");
  const ids = new Set((await lessonsOf(["biology"])).map((x) => x.id));
  assert.equal(map.spec, ID); assert.equal(map.specVersion, idx.version);
  assert.deepEqual(Object.keys(map.links), idx.statements.map((x) => x.ref), "one link per statement, in document order");
  assert.deepEqual(checkMap(idx, map, ids), [], "every proposed lesson is a real, permanent lesson id");
  for (const [ref, l] of Object.entries(map.links)) {
    assert.equal(l.status, "proposed", `${ref} is only proposed`);
    assert.ok(l.lessons.every((x) => x.coverage === "partial"), `${ref}: a proposal never says "full"`);
    assert.equal(new Set(l.lessons.map((x) => x.id)).size, l.lessons.length, `${ref}: no lesson proposed twice`);
    assert.ok(["strong", "moderate", "none"].includes(l.confidence));
    if (!l.lessons.length) assert.match(l.gap, /likely gap/);
  }
  const r = coverageReport(idx, map);
  assert.deepEqual([r.totals.covered, r.totals.partial, r.totals.missing, r.totals.awaiting], [0, 0, 0, idx.statements.length], "nothing is covered until a reviewer says so");
  assert.equal(claimFor(idx, map).allowed, false, "no AQA alignment claim");
  const sum = proposalSummary(idx, map);
  assert.equal(sum.strong + sum.moderate + sum.gaps, idx.statements.length);
  assert.ok(sum.multi.every((e) => e.refs.length > 1));
});

test("confidence bands", () => {
  assert.equal(band(20, 0.5), "strong"); assert.equal(band(10, 0.3), "moderate");
  assert.equal(band(12, 0.13, 1), "moderate", "the section's best lesson, sharing some of its words");
  assert.equal(band(30, 0.1, 1), "weak"); assert.equal(band(8, 0.9), "weak");
  const m = mergeProposals({ spec: "t", links: {} }, [{ ref: "1", candidates: [{ id: "a", score: 20, share: 0.5, band: "strong", matched: ["x"] }, { id: "b", score: 12, share: 0.3, band: "moderate", matched: ["y"] }, { id: "c", score: 30, share: 0.05, band: "weak", matched: [] }] }, { ref: "2", candidates: [{ id: "a", score: 7, share: 0.1, band: "weak", matched: [] }], unmatched: ["zzz"] }]);
  assert.deepEqual(m.links["1"].lessons.map((x) => x.id), ["a"], "only strong or moderate lessons within 70% of the best");
  assert.equal(m.links["2"].confidence, "none"); assert.deepEqual(m.links["2"].lessons, []); assert.equal(m.links["2"].nearest[0].id, "a");
});

// ---------- review ----------
const tiny = { spec: "t", version: "1.0", sections: [{ ref: "9.1", title: "Test" }], statements: [{ ref: "9.1.a", section: "9.1", kind: "content", page: 1, text: "Written for the test." }, { ref: "9.1.b", section: "9.1", kind: "skill", page: 1, text: "Also for the test." }, { ref: "9.1.c", section: "9.1", kind: "content", page: 2, text: "And this." }] };
const tinyMap = { spec: "t", specVersion: "1.0", links: { "9.1.a": { status: "proposed", confidence: "strong", lessons: [{ id: "u02-03", coverage: "partial", confidence: "strong", score: 20, share: 0.5, matched: ["test"] }] }, "9.1.b": { status: "proposed", confidence: "none", lessons: [], gap: "likely gap", nearest: [{ id: "u02-05", score: 5, share: 0.1, matched: [] }] }, "9.1.c": { status: "proposed", confidence: "moderate", lessons: [{ id: "u02-05", coverage: "partial" }] } } };
const lessonIds = new Set(["u02-03", "u02-05", "u05-03"]);
const R = (o) => ({ ref: "", decision: "", lessons: "", note: "", reviewer: "A. Reviewer", reviewed_on: "2026-12-01", ...o });

test("review sheet: every statement with its proposals and empty decisions, readable as CSV", () => {
  const csv = reviewSheet(tiny, tinyMap, new Map([["u02-03", { title: "Eukaryotic cells", unit: "u02: Cell Biology", level: "Year 1 · Foundation" }]]));
  const rows = parseTable(csv);
  assert.deepEqual(Object.keys(rows[0]), REVIEW_COLUMNS);
  assert.equal(rows.length, 3);
  assert.equal(rows[0].proposal_1, "u02-03: Eukaryotic cells (u02: Cell Biology; Year 1 · Foundation)");
  assert.equal(rows[1].matcher_confidence, "likely gap"); assert.equal(rows[1].proposal_1, "u02-05", "a likely gap shows its nearest lesson");
  assert.ok(rows.every((r) => r.decision === ""));
});

test("applying review decisions: full, partial and missing become verified; bad rows apply nothing", () => {
  const ok = applyReview(tiny, tinyMap, [R({ ref: "9.1.a", decision: "full" }), R({ ref: "9.1.b", decision: "missing", note: "no lesson on this" }), R({ ref: "9.1.c", decision: "partial", lessons: "u02-05 u05-03", note: "no worked example" })], lessonIds);
  assert.deepEqual(ok.problems, []); assert.equal(ok.applied, 3);
  assert.deepEqual(ok.map.links["9.1.a"].lessons, [{ id: "u02-03", coverage: "full" }], "blank lessons: the proposed ones");
  assert.equal(ok.map.links["9.1.a"].matcherConfidence, "strong", "the matcher's confidence is kept, to measure it later");
  assert.match(ok.map.links["9.1.b"].hash, /^[0-9a-f]{16}$/, "a reviewed link records the statement text it was reviewed on");
  assert.deepEqual({ ...ok.map.links["9.1.b"], hash: undefined }, { status: "verified", hash: undefined, reviewer: "A. Reviewer", reviewedOn: "2026-12-01", lessons: [], gap: "no lesson on this", matcherConfidence: "none" });
  assert.deepEqual(ok.map.links["9.1.c"].lessons.map((l) => [l.id, l.coverage]), [["u02-05", "partial"], ["u05-03", "partial"]]);
  assert.deepEqual(coverageReport(tiny, ok.map).totals, { statements: 3, covered: 1, partial: 1, missing: 1, awaiting: 0 });
  assert.equal(claimFor(tiny, ok.map).line, "Covers 1 of 3 specification statements fully and 1 in part");
  const mixed = applyReview(tiny, tinyMap, [R({ ref: "9.1.a", decision: "full", lessons: "u02-03=full u05-03" })], lessonIds);
  assert.deepEqual(mixed.map.links["9.1.a"].lessons.map((l) => l.coverage), ["full", "partial"], "=full marks the lesson that teaches it fully");
  const blank = applyReview(tiny, tinyMap, [R({ ref: "9.1.a" })], lessonIds);
  assert.equal(blank.applied, 0); assert.equal(blank.map.links["9.1.a"].status, "proposed", "no decision: still awaiting");
  for (const [row, re] of [
    [R({ ref: "9.9.z", decision: "full" }), /not a statement/], [R({ ref: "9.1.a", decision: "most" }), /full, partial or missing/],
    [R({ ref: "9.1.a", decision: "full", reviewer: "" }), /reviewer and reviewed_on/], [R({ ref: "9.1.a", decision: "full", reviewed_on: "1 Dec" }), /reviewer and reviewed_on/],
    [R({ ref: "9.1.c", decision: "partial" }), /needs a note/], [R({ ref: "9.1.b", decision: "missing" }), /needs a note/],
    [R({ ref: "9.1.a", decision: "full", lessons: "u99-99" }), /unknown lesson u99-99/], [R({ ref: "9.1.b", decision: "full" }), /needs the lessons/],
    [R({ ref: "9.1.a", decision: "full", lessons: "u02-03 u02-03" }), /listed twice/],
  ]) {
    const bad = applyReview(tiny, tinyMap, [R({ ref: "9.1.c", decision: "full" }), row], lessonIds);
    assert.ok(bad.problems.some((p) => re.test(p)), String(re)); assert.equal(bad.applied, 0); assert.equal(bad.map, tinyMap, "nothing applied when any row is wrong");
  }
  assert.match(applyReview({ ...tiny, version: "2.0" }, tinyMap, [], lessonIds).problems[0], /version 1\.0/, "a map for another version must be proposed again");
});

// ---------- mastery → specification standing ----------
const attempt = (lesson, q, correct, at) => ({ schema: 1, id: `${lesson}-${q}-${at}`, at: new Date(Date.UTC(2026, 10, 1) + at * 864e5).toISOString(), subject: "biology", context: "lesson", question: { id: `${lesson}-q${q}`, type: "mcq", d: 2 }, lesson, score: correct ? 1 : 0, correct, attempt: 1, marking: { method: "auto", status: "final" } });

test("a learner's mastery becomes specification standing through verified links only", () => {
  const atts = [...[1, 2, 3, 4, 5, 6].map((q) => attempt("u02-03", q, true, q)), ...[1, 2, 3].map((q) => attempt("u02-05", q, q !== 2, q))];
  const m = lessonMastery(atts);
  assert.ok(m["u02-03"] > 0.8, `strong evidence on u02-03: ${m["u02-03"]}`); assert.ok(m["u02-05"] < m["u02-03"]);
  const reviewed = applyReview(tiny, tinyMap, [R({ ref: "9.1.a", decision: "full" }), R({ ref: "9.1.b", decision: "missing", note: "x" })], lessonIds).map;
  const s = specStanding(tiny, reviewed, atts);
  assert.deepEqual(s.rows.map((r) => r.standing), ["secure", "not-on-gradify", "unmapped"], "9.1.c is only proposed, so it's not mapped, whatever the learner did in u02-05");
  assert.match(s.summary, /1 of 2 mapped statements secure/);
  // the real specification: nothing is mapped yet, so every statement is "not mapped yet"
  const real = specStanding(idx, map, atts);
  assert.equal(real.by.unmapped, idx.statements.length); assert.match(real.summary, /isn't mapped yet/);
});
