// Specification Mastery (kit/learning/spec-mastery.js, kit/specs/): every specification maps onto real lessons, and a
// point's estimate comes only from answers, with coverage and confidence kept apart from it.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SPECS, specsFor, specById, pointsOf, checkSpec, catalogue, resolveRef, choicesFor } from "../kit/specs/index.js";
import { specMastery, bandOf, confidenceOf, basisText, weakestPoints, BANDS, UNASSESSED } from "../kit/learning/spec-mastery.js";
import { sixProfile, evidenceFromAttempts } from "../kit/learning/mastery.js";

const DAY = 864e5, NOW = Date.parse("2026-11-20T12:00:00Z");
let seq = 0;
// one attempt record (kit/assess/attempts.js schema 1)
const att = (lesson, score, { q = `${lesson}#q${seq++ % 5}`, d = 2, type = "sba", ago = 1, attempt = 1, context = "lesson", confidence = null } = {}) => ({
  schema: 1, id: `a${seq++}`, at: new Date(NOW - ago * DAY).toISOString(), site: "SciGradify", subject: "biology", context,
  question: { id: q, v: 1, type, d, objectives: [] }, lesson, unit: lesson.slice(0, 3), score, correct: score >= 1, attempt, confidence, marking: { method: "auto", status: "final" },
});
// a small spec over two lessons for one point, one lesson for another, and one point Gradify doesn't teach
const MINI = { id: "t", board: "B", system: "uk-eng", qualification: "gcse", subject: "S", title: "Test", course: "biology", version: "1", wording: "paraphrased",
  flags: { ht: { short: "HT", name: "Higher tier only" }, sep: { short: "Separate", name: "Separate science only" } },
  options: [{ id: "tier", label: "Tier", choices: [{ id: "higher", label: "Higher" }, { id: "foundation", label: "Foundation", hides: ["ht"] }] },
    { id: "route", label: "Route", choices: [{ id: "separate", label: "Separate" }, { id: "combined", label: "Combined", hides: ["sep"] }] }],
  topics: [
  { id: "1", title: "Topic one", groups: [{ id: "1.1", title: "G", points: [
    { id: "1.1.1", title: "Transport", text: "Explain diffusion and active transport.", lessons: ["u02-20", "u02-23"], partial: [], flags: [] },
    { id: "1.1.2", title: "Osmosis", text: "Explain osmosis.", lessons: ["u02-21"], partial: [], flags: ["ht"] },
    { id: "1.1.3", title: "The eye", text: "Describe the eye.", lessons: [], partial: [], flags: ["sep"] },
  ] }] },
] };
const titles = { "u02-20": "Diffusion", "u02-23": "Active transport", "u02-21": "Osmosis" };
const run = (attempts, o = {}) => specMastery(MINI, { attempts, now: NOW, titleOf: (id) => titles[id] || id, ...o });

test("every specification is well formed and maps onto lessons that exist", async () => {
  assert.ok(SPECS.length >= 1);
  for (const spec of SPECS) {
    const { UNITS } = await import(`../kit/courses/${spec.course}/syllabus.js`);
    const ids = new Set(UNITS.flatMap((u) => u.lessons.map((l) => `${spec.course}:${l.id}`)));
    assert.deepEqual(checkSpec(spec, ids), [], `${spec.id}: ${checkSpec(spec, ids).join("; ")}`);
    assert.ok(specsFor(spec.course).includes(spec) && specById(spec.id) === spec);
    // until someone checks the wording against the published specification, it's labelled as Gradify's paraphrase
    if (!spec.verified) assert.equal(spec.wording, "paraphrased", `${spec.id} claims verbatim wording without a verification record`);
  }
});

test("AQA GCSE Biology covers the whole subject content, and shows only coverage the mapping store evidences", async () => {
  const spec = specById("aqa-gcse-biology-8461"), pts = pointsOf(spec);
  assert.deepEqual(spec.topics.map((t) => t.id), ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7"]);
  assert.ok(pts.length >= 70, `${pts.length} points`);
  assert.ok(pts.filter((p) => p.flags.includes("ht")).every((p) => ["4.5.3.6", "4.5.3.7", "4.5.4.2", "4.7.2.4"].includes(p.id)));
  // the links are exactly what the store says (owner's decision 6); the hand-written lessons are only proposals
  const { buildLinks } = await import("../scripts/curriculum/spec-view.mjs");
  const built = buildLinks(spec);
  for (const p of pts) { assert.deepEqual({ lessons: p.lessons, partial: p.partial, evidence: p.evidence, state: p.state }, { lessons: built[p.id].lessons, partial: built[p.id].partial, evidence: built[p.id].evidence, state: built[p.id].state }, `${p.id}: kit/specs/aqa-gcse-biology-8461.links.js is out of date`); assert.ok(Array.isArray(p.proposed.lessons)); }
  assert.ok(pts.find((p) => p.id === "4.1.3.3").proposed.lessons.includes("u02-23"), "the hand mapping is kept as a proposal");
});

test("checkSpec catches the mistakes a mapping can make", () => {
  const bad = structuredClone(MINI); bad.topics[0].groups[0].points.push({ ...bad.topics[0].groups[0].points[0] });
  bad.topics[0].groups[0].points[1].partial = ["u02-21"];
  bad.topics[0].groups[0].points[2].flags = ["nope"];
  const p = checkSpec({ ...bad, system: "atlantis", options: [{ id: "tier", label: "Tier", choices: [{ id: "a", label: "A", hides: ["ghost"] }, { id: "b", label: "B" }] }] }, new Set(["biology:u02-20", "biology:u02-23"]));
  assert.ok(p.some((x) => x.includes("unknown education system atlantis")));
  assert.ok(p.some((x) => x.includes("hides flag ghost")) && p.some((x) => x.includes("first choice is the default")));
  assert.ok(p.some((x) => x.includes("flag nope, which isn't declared")));
  assert.ok(p.some((x) => x.includes("duplicate point 1.1.1")));
  assert.ok(p.some((x) => x.includes("names lesson u02-21")));
  assert.ok(p.some((x) => x.includes("both full and partial")));
  assert.ok(checkSpec({ ...MINI, wording: "verbatim" }).some((x) => x.includes("verified")), "verbatim needs a verification record");
});

test("bands follow the percentage the learner sees, and no evidence is never 0%", () => {
  assert.deepEqual(BANDS.map((b) => b.label), ["Emerging", "Building", "Developing", "Secure", "Strong"]);
  assert.equal(bandOf(null), UNASSESSED);
  assert.equal(bandOf(0).key, "emerging");
  assert.equal(bandOf(0.195).key, "building", "rounds to 20%");
  assert.equal(bandOf(0.59).key, "developing");
  assert.equal(bandOf(0.6).key, "secure");
  assert.equal(bandOf(0.796).key, "strong", "shown as 80%, so Strong");
  assert.equal(bandOf(1).key, "strong");
  const m = run([]);
  for (const p of m.points) { assert.equal(p.estimate, null); assert.equal(p.band.key, "unassessed"); assert.equal(p.confidence.level, "none"); }
  assert.equal(m.overall.estimate, null);
  assert.equal(m.overall.assessed, 0);
});

test("completing lessons is coverage, not mastery", () => {
  const m = run([], { done: { "u02-20": true, "u02-23": true } });
  const p = m.points[0];
  assert.deepEqual({ ...p.coverage, ids: undefined, doneIds: undefined }, { gradify: "full", evidence: null, done: 2, total: 2, ids: undefined, doneIds: undefined });
  assert.equal(p.estimate, null, "finished every lesson, answered nothing: still not assessed");
  assert.match(p.next, /hasn't seen you answer/);
  assert.equal(m.points[2].coverage.gradify, "none");
  assert.match(m.points[2].next, /doesn't teach this point yet/);
});

test("answers alone, without completing lessons, are evidence", () => {
  const a = []; for (let i = 0; i < 6; i++) a.push(att("u02-20", 1, { q: `u02-20#q${i}`, d: 1 + (i % 3), ago: 1 + i }));
  const p = run(a).points[0];
  assert.ok(p.estimate > 0.6, `estimate ${p.estimate}`);
  assert.equal(p.coverage.done, 0);
});

test("two easy right answers are a provisional estimate with low confidence; varied evidence over days earns high", () => {
  const thin = run([att("u02-20", 1, { d: 1, q: "x1" }), att("u02-20", 1, { d: 1, q: "x2" })]).points[0];
  assert.ok(thin.estimate != null && thin.provisional, "shown, but as an estimate");
  assert.equal(thin.confidence.level, "low");
  assert.match(basisText(thin.confidence), /2 answers to 2 different questions, all on one day, all of them easier questions/);
  const many = [];
  for (let i = 0; i < 20; i++) many.push(att(i % 2 ? "u02-20" : "u02-23", i % 7 ? 1 : 0, { q: `q${i % 10}`, d: 1 + (i % 3), type: ["sba", "short", "card", "num"][i % 4], ago: 30 - i, context: i % 3 ? "lesson" : "review" }));
  const rich = run(many).points[0];
  assert.equal(rich.provisional, false);
  assert.equal(rich.confidence.level, "high", JSON.stringify(rich.confidence));
  assert.ok(rich.confidence.questions >= 6 && rich.confidence.days >= 2);
});

test("old evidence still counts but drops a step of confidence", () => {
  const ev = evidenceFromAttempts(Array.from({ length: 20 }, (_, i) => att("u02-20", 1, { q: `q${i % 8}`, d: 1 + (i % 3), type: ["sba", "short", "card"][i % 3], ago: 90 + i })));
  const c = confidenceOf(ev, sixProfile(ev, { now: NOW }), NOW);
  assert.equal(c.stale, true);
  assert.notEqual(c.level, "high");
  assert.match(basisText(c), /may have faded/);
});

test("a point says what's strong, what's inconsistent, and what to practise", () => {
  const a = [];
  for (let i = 0; i < 6; i++) a.push(att("u02-20", 1, { q: `d${i}`, ago: 10 - i }));               // diffusion: right every time
  for (let i = 0; i < 6; i++) a.push(att("u02-23", i % 2 ? 1 : 0, { q: `t${i}`, ago: 10 - i }));    // active transport: right, wrong, right…
  const p = run(a).points[0];
  assert.equal(p.byLesson["u02-20"].state, "strong");
  assert.equal(p.byLesson["u02-23"].state, "inconsistent");
  assert.match(p.next, /confident on Diffusion, but your answers on Active transport are inconsistent/);
  assert.equal(p.practise[0], "u02-23", "the shaky lesson is practised first");
  assert.ok(p.can.some((x) => x.includes("Diffusion")) && p.struggle.some((x) => x.includes("Active transport")));
});

test("a specification's own options hide the points its flags say they hide", () => {
  assert.equal(run([]).points.length, 3);
  assert.deepEqual(run([], { choices: { tier: "foundation" } }).points.map((p) => p.id), ["1.1.1", "1.1.3"]);
  assert.deepEqual(run([], { choices: { route: "combined" } }).points.map((p) => p.id), ["1.1.1", "1.1.2"]);
  assert.deepEqual(run([], { choices: { tier: "foundation", route: "combined" } }).points.map((p) => p.id), ["1.1.1"]);
  assert.deepEqual(choicesFor(MINI, { tier: "nonsense" }), { tier: "higher", route: "separate" }, "unknown choices fall back to the default");
});

test("lessons that aren't written yet don't count as Gradify covering a point", () => {
  const p = run([], { available: (id) => id !== "u02-21" }).points[1];
  assert.equal(p.coverage.gradify, "none");
});

test("topics and the headline use assessed points only, weighted by confidence", () => {
  const a = [];
  for (let i = 0; i < 20; i++) a.push(att(i % 2 ? "u02-20" : "u02-23", 1, { q: `q${i % 10}`, d: 1 + (i % 3), type: ["sba", "short", "card", "num"][i % 4], ago: 20 - i }));
  a.push(att("u02-21", 0, { q: "o1", d: 1 }));
  const m = run(a);
  assert.equal(m.overall.total, 3);
  assert.equal(m.overall.assessed, 2, "the eye isn't assessed, and isn't counted as 0");
  const [hi, lo] = m.points;
  assert.ok(Math.abs(m.overall.estimate - (hi.estimate * 3 + lo.estimate * 1) / 4) < 1e-9, "high confidence counts three times a low one");
  assert.equal(m.topics[0].status, "Strong overall · 1 to work on", "the topic's standing, and the one point still emerging");
  assert.deepEqual(weakestPoints(m).map((p) => p.id), ["1.1.2"], "a Strong point isn't offered as weak");
  assert.equal(m.overall.covered, 2);
});

test("a learner whose recent answers are clearly worse is told the point is slipping", () => {
  const a = [];
  for (let i = 0; i < 5; i++) a.push(att("u02-20", 1, { q: `e${i}`, ago: 30 + i }));
  for (let i = 0; i < 5; i++) a.push(att("u02-20", 0, { q: `l${i}`, ago: 1 + i }));
  const m = run(a), p = m.points[0];
  assert.equal(p.trend, "slipping");
  assert.equal(m.topics[0].attention, true);
  assert.equal(p.series.length, 8);
  assert.equal(p.series.at(-1), 0);
});

test("the real specification runs end to end, and unchecked points are never measured or called gaps", () => {
  const spec = specById("aqa-gcse-biology-8461");
  const m = specMastery(spec, { attempts: [att("u02-20", 1, { q: "a" }), att("u02-20", 1, { q: "b" }), att("u02-23", 0, { q: "c" })], now: NOW });
  assert.equal(m.topics.length, 7);
  for (const p of m.points) {
    if (p.state === "unchecked") { assert.equal(p.coverage.gradify, "unchecked"); assert.equal(p.estimate, null, `${p.id}: no evidenced lesson, so nothing to measure`); }
    if (p.evidence === "ai-mapped") assert.ok(["full", "partial"].includes(p.coverage.gradify));
  }
  assert.equal(m.overall.evidence.verified + m.overall.evidence.aiMapped + m.overall.evidence.unchecked <= m.points.length, true);
});

test("a point's links: full only when every statement is taught, verified only when a person checked all of them", async () => {
  const { pointLinks } = await import("../scripts/curriculum/spec-view.mjs");
  const ai = (id, cov = "full") => ({ status: cov === "full" ? "mapped" : "partially-mapped", link: { lessons: [{ id, coverage: cov }] } });
  const ok = (id) => ({ status: "covered", link: { lessons: [{ id, coverage: "full" }] } });
  assert.deepEqual(pointLinks([ok("u1"), ok("u2")]), { lessons: ["u1", "u2"], partial: [], evidence: "verified", state: "full", statements: { taught: 2, total: 2 } });
  assert.deepEqual(pointLinks([ok("u1"), ai("u2")]).evidence, "ai-mapped", "one AI decision makes the point AI-mapped");
  assert.deepEqual(pointLinks([ai("u1"), { status: "awaiting", link: { status: "proposed", lessons: [{ id: "u9" }] } }]), { lessons: [], partial: ["u1"], evidence: "ai-mapped", state: "partial", statements: { taught: 1, total: 2 } }, "a proposal is never coverage");
  assert.equal(pointLinks([{ status: "awaiting", link: { status: "rejected" } }, { status: "missing", link: { status: "verified" } }]).state, "none");
  assert.equal(pointLinks([{ status: "awaiting", link: { status: "proposed" } }]).state, "unchecked");
});

// ---------- a reusable system: nothing in the engine or registry is specific to AQA, GCSE, Biology or England ----------

// an invented international specification over two courses, with its own levels and option, and no tiers
const INTL = { id: "intl-test", title: "International Diploma Science (test)", system: "uk-sco", qualification: "higher", board: "Test Board", subject: "Science", course: "biology",
  version: "test", wording: "paraphrased", flags: { hl: { short: "HL", name: "Higher level only" } },
  options: [{ id: "level", label: "Level", choices: [{ id: "hl", label: "Higher level" }, { id: "sl", label: "Standard level", hides: ["hl"] }] }],
  topics: [{ id: "A", title: "Matter", groups: [{ id: "A1", title: "Particles", points: [
    { id: "A1.1", title: "Diffusion in cells", text: "Explain diffusion.", lessons: ["u02-20"], partial: [], flags: [] },
    { id: "A1.2", title: "Rates of reaction", text: "Explain collision theory.", lessons: ["chemistry:u05-03"], partial: [], flags: ["hl"] },
  ] }] }] };

test("a specification from another system, spanning two courses, runs through the same engine", () => {
  assert.deepEqual(checkSpec(INTL, new Set(["biology:u02-20", "chemistry:u05-03"])), []);
  assert.deepEqual(resolveRef(INTL, "chemistry:u05-03"), { course: "chemistry", lesson: "u05-03" });
  assert.deepEqual(resolveRef(INTL, "u02-20"), { course: "biology", lesson: "u02-20" });
  // the same lesson id in two courses: evidence goes to the right one
  const chem = (score, i) => ({ ...att("u05-03", score, { q: `c${i}`, ago: 2 + i }), subject: "chemistry" });
  const bio = (score, i) => att("u05-03", score, { q: `b${i}`, ago: 2 + i });
  const m = specMastery(INTL, { attempts: [chem(1, 0), chem(1, 1), chem(1, 2), bio(0, 3), bio(0, 4)], now: NOW });
  const rates = m.points.find((p) => p.id === "A1.2");
  assert.equal(rates.confidence.answers, 3, "only chemistry's u05-03 counts");
  assert.ok(rates.estimate > 0.6);
  assert.deepEqual(specMastery(INTL, { choices: { level: "sl" }, now: NOW }).points.map((p) => p.id), ["A1.1"]);
  const cat = catalogue([...SPECS, INTL]);
  assert.ok(cat.find((s) => s.id === "uk-sco").qualifications.find((q) => q.id === "higher").specs.includes(INTL));
  assert.ok(cat.find((s) => s.id === "uk-eng").qualifications.find((q) => q.id === "gcse").specs.some((s) => s.id === "aqa-gcse-biology-8461"));
});

test("the engine and pages never name a board, qualification or subject", () => {
  for (const f of ["kit/learning/spec-mastery.js", "kit/course/spec-view.js"]) {
    const src = readFileSync(new URL(`../${f}`, import.meta.url), "utf8").replace(/^\s*\/\/.*$/gm, "");
    assert.doesNotMatch(src, /\b(AQA|Edexcel|OCR|WJEC|GCSE|Biology|8461)\b/, `${f} is specific to one specification`);
  }
});

test("older and partial attempt records don't break the model", () => {
  const legacy = [
    { schema: 1, id: "x1", at: new Date(NOW - DAY).toISOString(), question: { id: "u02-20#0", type: "sba" }, lesson: "u02-20", score: 1, attempt: 1, marking: { status: "final" } },
    { schema: 1, id: "x2", at: new Date(NOW - 2 * DAY).toISOString(), question: { id: "u02-20#1", type: "short", d: 2, objectives: [] }, lesson: "u02-20", score: 0.5, attempt: 1, marking: { status: "provisional" } },
    { schema: 1, id: "x3", at: "not a date", question: { id: "u02-20#2", type: "sba" }, lesson: "u02-20", score: 1 },
    { id: "x4" }, null,
  ];
  const p = run(legacy).points[0];
  assert.ok(p.estimate != null, "records without a subject, difficulty or objectives still count, for the specification's own course");
  assert.ok(Number.isFinite(p.estimate));
});

test("Specification Mastery works offline: every module it loads is in the service worker's shell", () => {
  const sw = readFileSync(new URL("../sw.js", import.meta.url), "utf8");
  for (const f of ["kit/course/spec-view.js", "kit/learning/spec-mastery.js", "kit/specs/index.js", "kit/curriculum/coverage.js", ...SPECS.map((s) => `kit/specs/${s.id}.js`)]) assert.ok(sw.includes(`"${f}"`), `sw.js doesn't cache ${f}`);
});

test("the AQA mapping is labelled as a summary wherever it's shown", async () => {
  const { specPageHtml, topicPageHtml, pointPageHtml, specSummaryHtml } = await import("../kit/course/spec-view.js");
  const spec = specById("aqa-gcse-biology-8461"), m = specMastery(spec, { now: NOW });
  assert.equal(spec.verified, null);
  for (const html of [specPageHtml(m), topicPageHtml(m, m.topics[0]), pointPageHtml(m, m.points[0]), specSummaryHtml(m)]) assert.match(html, /Summary, not official wording|Gradify's summary, not official wording/);
  // classifications are flagged as unverified too
  assert.match(topicPageHtml(m, m.topics[0]), /Biology only/);
  assert.match(topicPageHtml(m, m.topics[0]), /not yet verified/);
});

test("overall totals count each lesson once, and an average of early estimates stays an early estimate", () => {
  // one lesson teaching two points is one lesson in the totals, though it counts towards each point's coverage
  const shared = { ...MINI, topics: [{ ...MINI.topics[0], groups: [{ ...MINI.topics[0].groups[0], points: [
    { id: "1.1.1", title: "A", text: "A.", lessons: ["u02-20", "u02-23"], partial: [], flags: [] },
    { id: "1.1.2", title: "B", text: "B.", lessons: ["u02-20"], partial: [], flags: [] },
  ] }] }] };
  const m = specMastery(shared, { attempts: [], now: NOW, done: { "u02-20": true }, titleOf: (id) => id });
  assert.deepEqual(m.points.map((p) => p.coverage.done), [1, 1], "each point is covered by the lesson");
  assert.equal(m.overall.lessonsDone, 1, "but it is one lesson done"); assert.equal(m.overall.lessonsMapped, 2);
  // two easy answers on one point: the point, its topic and the headline are all early estimates
  const thin = run([att("u02-20", 1, { d: 1, q: "x1" }), att("u02-20", 1, { d: 1, q: "x2" })]);
  assert.ok(thin.points[0].provisional);
  assert.equal(thin.topics[0].provisional, true); assert.equal(thin.overall.provisional, true);
  const many = [];
  for (let i = 0; i < 20; i++) many.push(att(i % 2 ? "u02-20" : "u02-23", i % 7 ? 1 : 0, { q: `q${i % 10}`, d: 1 + (i % 3), type: ["sba", "short", "card", "num"][i % 4], ago: 30 - i, context: i % 3 ? "lesson" : "review" }));
  assert.equal(run(many).overall.provisional, false, "a measured point makes the headline a measurement");
});
