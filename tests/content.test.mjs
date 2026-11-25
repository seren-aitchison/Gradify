// The content engine (scripts/content/, scripts/gradify.mjs): notes tags, shorthand formats, the gates, and the whole
// loop with a fake model, so none of this needs an API key. Output goes to a temporary GRADIFY_OUT, never the repo.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.GRADIFY_OUT = mkdtempSync(join(tmpdir(), "gradify-content-"));
const { parseNotes } = await import("../kit/course/notes.js");
const S = await import("../scripts/content/shorthand.mjs");
const G = await import("../scripts/content/gates.mjs");
const { runTopic, research } = await import("../scripts/content/loop.mjs");
const { suspects } = await import("../scripts/content/signals.mjs");
const { prBody } = await import("../scripts/content/report.mjs");
const { topicsFor } = await import("../scripts/content/queue.mjs");
const { systemFor } = await import("../scripts/content/model.mjs");

const REQ = { id: "aqa-gcse-biology:4.1.1.1.b", ref: "4.1.1.1.b", asks: "prokaryotic cells", text: "Prokaryotic cells are much smaller than eukaryotic cells and have no nucleus; their genetic material is a single loop of DNA.", title: "Eukaryotes and prokaryotes", type: "concept", status: "official", hash: "h1" };
const TOPIC = { id: "biology/test-prokaryotes", subject: "biology", fw: "aqa-gcse-biology", section: "4.1.1.1", title: "Test prokaryotes", level: "GCSE", country: "uk", reqs: [REQ], reuse: [] };
const BRIEF = `TOPIC biology/test-prokaryotes | levels=GCSE | checked=2026-11-25
F: Prokaryotic cells have no nucleus | s1,s2 | conf=high
F: Bacterial cells are usually 1 to 10 micrometres long | s1,s3 | conf=high
DEF: prokaryote | an organism whose cells have no nucleus | GCSE
MIS: bacteria have no DNA | bacteria have DNA in a single loop and often plasmids
SRC: s1 | Open biology text | https://openstax.org/books/biology-2e | OpenStax | licence=facts | 2026-11-25
SRC: s2 | Cell structure | https://www.bbc.co.uk/bitesize/x | BBC | licence=facts | 2026-11-25
SRC: s3 | Prokaryotes | https://www.ncbi.nlm.nih.gov/books/x | NCBI | licence=facts | 2026-11-25
END`;
const LESSON = (sum = "3 × 4 = 13") => `## Prokaryotes up close
LV: GCSE · Foundation
S: Bacteria are prokaryotes: single cells far smaller than plant or animal cells, with no nucleus. Knowing how they differ explains how antibiotics can target them.
O: Describe how a prokaryotic cell differs from a eukaryotic cell
O: Compare the sizes of prokaryotic and eukaryotic cells
REQ: aqa-gcse-biology:4.1.1.1.b @1,2
H: What makes a cell prokaryotic
P: A prokaryotic cell has no nucleus. Its genetic material is one loop of DNA floating in the cytoplasm, and many bacteria also carry small extra rings of DNA called plasmids.
P: Eukaryotic cells, such as animal and plant cells, keep their DNA inside a nucleus and are much bigger.
H: Size
P: Most bacteria are 1 to 10 micrometres long, while a typical animal cell is 10 to 30 micrometres across, so a eukaryotic cell can be many times smaller or larger depending on type.
X: A bacterium is 3 micrometres long and a cheek cell is 4 times longer. How long is the cheek cell?
> ${sum} micrometres.
K: A prokaryote is small, lacks a nucleus, and keeps one loop of DNA free in its cytoplasm.
!: Thinking bacteria have no DNA. They do: it is in a single loop, not a nucleus.
T: Prokaryote | An organism made of a cell with no nucleus, such as a bacterium
T: Plasmid | A small ring of DNA found in many bacteria, separate from the main loop
Q: Where is the DNA in a prokaryotic cell? | In a single loop in the cytoplasm, often with plasmids
Q: Which is usually larger, a bacterium or an animal cell? | An animal cell
M1@1: Where is the main DNA found in a bacterial cell? | In a single loop in the cytoplasm | Inside the nucleus of the cell | Inside the cell's chloroplasts | Inside the cell's mitochondria | Bacteria are prokaryotes, so they have no nucleus or other membrane-bound organelles; the DNA is a loop in the cytoplasm.
M2@2: A cell is 2 micrometres long. What kind of cell is it most likely to be? | A prokaryotic cell | A plant leaf cell | An animal cheek cell | A human egg cell | Prokaryotic cells are usually 1 to 10 micrometres long; plant and animal cells are usually much larger than that.
M3@1: An antibiotic damages a structure found only in cells without a nucleus. Which cells does it target? | Bacterial cells | Human skin cells | Plant leaf cells | Yeast cells | Bacteria are prokaryotes with no nucleus, while human, plant and yeast cells are all eukaryotic cells with a nucleus.
TF2@2: A typical animal cell is larger than a typical bacterium. | true | Most bacteria are 1 to 10 micrometres long, while animal cells are usually 10 to 30 micrometres across.
SUM: Prokaryotic cells have no nucleus and keep their DNA in a single loop.
SUM: They are much smaller than eukaryotic cells.
SRC: Open biology text | secondary | 2026-11-25 | https://openstax.org/books/biology-2e`;

test("notes tags: REQ with objectives, DIA spec, DNEED and GAP", () => {
  const [L] = parseNotes(`## T\nO: a\nO: b\nREQ: aqa-gcse-biology:4.1.1.1.b @1,2\nREQ: ocr-gcse-biology:2.1\nDIA: graph | {"range":{"x":[0,1]}}\nDIA: graph | not json\nDNEED: a labelled bacterium\nGAP: no source for plasmid size`);
  assert.deepEqual(L.reqs, [{ id: "aqa-gcse-biology:4.1.1.1.b", objectives: [1, 2] }, { id: "ocr-gcse-biology:2.1", objectives: [] }]);
  assert.deepEqual(L.blocks.map((b) => [b.t, b.renderer, !!b.spec]), [["dia", "graph", true], ["dia", "graph", false]]);
  assert.deepEqual([L.needs, L.gaps], [["a labelled bacterium"], ["no source for plasmid size"]]);
});

test("shorthand: packets are deterministic and carry no dates", () => {
  const a = S.packet({ id: "p", subject: "biology", level: "GCSE", framework: "fw", reqs: [REQ], brief: BRIEF }), b = S.packet({ id: "p", subject: "biology", level: "GCSE", framework: "fw", reqs: [REQ], brief: BRIEF });
  assert.equal(a, b);
  assert.match(a, /^PKT p \| subj=biology \| lvl=GCSE \| ctry=uk \| fw=fw\nREQ aqa-gcse-biology:4\.1\.1\.1\.b \| /);
  assert.match(a, /\nBRIEF biology\/test-prokaryotes\n/);
  assert.ok(a.trim().endsWith("END") && (a.match(/^END$/gm) || []).length === 1);
});

test("shorthand: briefs need three independent cited sources", () => {
  assert.deepEqual(S.parseBrief(BRIEF).problems, []);
  const thin = S.parseBrief(BRIEF.split("\n").filter((l) => !l.includes("| s3 |") && !/^SRC: s3/.test(l)).join("\n"));
  assert.ok(thin.problems.some((p) => /at least 3/.test(p)));
  assert.ok(S.parseBrief(BRIEF.replace("s1,s3", "s1,s9")).problems.some((p) => /unknown source/.test(p)));
  assert.ok(S.parseBrief(`${BRIEF}\nWHATEVER: x`.replace(/\nEND/, "") + "\nEND").problems.some((p) => /unknown line/.test(p)));
});

test("shorthand: verdicts, fix lists and repairs round-trip", () => {
  const v = S.parseVerdicts("REV new#1 OK\nREV new#2 FAIL FACT L7 size wrong; Q L20 two right answers");
  assert.deepEqual(v[1].issues, [{ code: "FACT", line: 7, note: "size wrong" }, { code: "Q", line: 20, note: "two right answers" }]);
  assert.equal(S.fixList("new#2", v[1].issues), "FIX new#2\nL7 FACT: size wrong\nL20 Q: two right answers\nEND");
  const ops = S.parseRepairs("REPAIR new#2\nL2> two\n+L2> two and a half\n-L3\nEND").get("new#2");
  assert.equal(S.applyRepair("one\n2\nthree\nfour", ops), "one\ntwo\ntwo and a half\nfour");
  assert.throws(() => S.applyRepair("a", [{ op: "set", line: 5, text: "x" }]), /outside the lesson/);
  assert.deepEqual(S.splitUnit("chat before\n## A\nS: x\n\n## B\nS: y\nEND\nafter").map((l) => l.title), ["A", "B"]);
});

test("gates: arithmetic is recomputed", () => {
  assert.deepEqual(G.checkArithmetic("> Actual size = image size ÷ magnification = 25 mm ÷ 500 = 0.05 mm."), []);
  assert.equal(G.checkArithmetic("X: 3 × 4 = 13, so").length, 1);
  assert.deepEqual(G.checkArithmetic("−5 + 2 = −3, and 1,000 × 3 = 3,000"), []);
  assert.deepEqual(G.checkArithmetic("2.5 × 10^{3} ÷ 5 = 500"), []);
  assert.deepEqual(G.checkArithmetic("Water = H2O; year 2016 = start"), [], "words and labels aren't calculations");
  assert.equal(G.evalExpr("magnification"), null);
});

test("gates run cheapest first and stop at the first failure", async () => {
  const ok = await G.runGates(LESSON("3 × 4 = 12"), { reqs: [REQ], allowed: new Set([REQ.id]) });
  assert.ok(ok.ok, JSON.stringify(ok.failed?.issues));
  const num = await G.runGates(LESSON(), { reqs: [REQ] });
  assert.equal(num.failed.gate, "num-dia"); assert.equal(num.failed.issues[0].line, 13);
  const noReq = await G.runGates(LESSON().replace(/^REQ:.*\n/m, ""), { reqs: [REQ] });
  assert.equal(noReq.failed.gate, "parse");
  const untested = await G.runGates(LESSON().replace("M2@2:", "M2@1:").replace("TF2@2:", "TF2@1:"), { reqs: [REQ] });
  assert.equal(untested.failed.gate, "coverage");
  assert.ok(untested.failed.issues.some((i) => /objective 2 has no question/.test(i.note)));
  const giveaway = await G.runGates(LESSON().replace("A prokaryotic cell | A plant leaf cell", "A prokaryotic cell, because it is between one and ten micrometres long | A plant leaf cell"), { reqs: [REQ] });
  assert.equal(giveaway.failed.gate, "qa");
  const copied = await G.runGates(LESSON("3 × 4 = 12").replace("P: Eukaryotic cells,", "P: Prokaryotic cells are much smaller than eukaryotic cells and have no nucleus. Eukaryotic cells,"), { reqs: [REQ] });
  assert.equal(copied.failed.gate, "spec"); assert.equal(copied.failed.issues[0].code, "COPY");
  const noText = await G.runGates(LESSON("3 × 4 = 12"), { reqs: [{ ...REQ, text: null }] });
  assert.equal(noText.failed.gate, "spec", "no specification text: copying can't be checked, so it doesn't pass");
});

test("the loop: research, write, gate, repair, review, repair, file", async () => {
  let reviews = 0; const calls = [];
  const ask = async (job, user) => { calls.push(job); if (job === "research") return BRIEF; if (job === "write") { assert.match(user, /^PKT /); return `${LESSON()}\nEND`; } throw new Error(job); };
  const askMany = async (job, items) => new Map(items.map((it) => {
    calls.push(job);
    if (job === "review") return [it.key, ++reviews === 1 ? `REV ${it.key} FAIL CLR L9 the size comparison is muddled` : `REV ${it.key} OK`];
    // the Writer's repair: only the lines named in the fix list
    if (/NUM:/.test(it.user)) return [it.key, `REPAIR ${it.key}\nL13> > 3 × 4 = 12 micrometres.\nEND`];
    return [it.key, `REPAIR ${it.key}\nL11> P: Most bacteria are 1 to 10 micrometres long, while a typical animal cell is 10 to 30 micrometres across, so eukaryotic cells are usually several times bigger.\nEND`];
  }));
  const r = await runTopic(TOPIC, { ask, askMany });
  assert.equal(r.status, "filed", JSON.stringify(r.failures));
  assert.deepEqual(calls, ["research", "write", "repair", "review", "repair", "review"]);
  assert.equal(r.lessons.length, 1);
  assert.equal(r.lessons[0].tier, "ai-verified"); assert.ok(r.lessons[0].disagreed); assert.equal(r.lessons[0].repairs, 2);
  const draft = readFileSync(join(process.env.GRADIFY_OUT, "content/drafts/biology/aqa-gcse-biology/test-prokaryotes.txt"), "utf8");
  assert.match(draft, /3 × 4 = 12 micrometres/); assert.match(draft, /several times bigger/);
  assert.ok(existsSync(join(process.env.GRADIFY_OUT, "content/research/biology/test-prokaryotes.txt")));
  const led = JSON.parse(readFileSync(join(process.env.GRADIFY_OUT, "content/ledger/biology.json"), "utf8"));
  assert.equal(led.topics[TOPIC.id].status, "filed");
  // the brief is reused, not researched again, while its inputs are unchanged
  const again = await research(TOPIC, { ask: async () => { throw new Error("should not research again"); } });
  assert.ok(again.cached);
});

test("the loop: a lesson that never passes is recorded with its fix list, not filed", async () => {
  const topic = { ...TOPIC, id: "biology/test-stuck", title: "Test stuck" };
  const ask = async (job) => (job === "research" ? BRIEF.replace("test-prokaryotes", "test-stuck") : `${LESSON()}\nEND`);
  const askMany = async (job, items) => new Map(items.map((it) => [it.key, `REPAIR ${it.key}\nEND`]));
  const r = await runTopic(topic, { ask, askMany });
  assert.equal(r.status, "failed"); assert.equal(r.lessons.length, 0);
  assert.equal(r.failures[0].gate, "num-dia"); assert.deepEqual(r.uncovered, [REQ.id]);
  assert.ok(!existsSync(join(process.env.GRADIFY_OUT, "content/drafts/biology/aqa-gcse-biology/test-stuck.txt")));
  assert.match(prBody({ usd: 0.1, calls: 3, searches: 0, cacheRead: 0, cacheWrite: 0, byJob: {} }, { subjects: ["biology"] }), /stopped at `num-dia`/);
});

test("high-risk and conflicting topics need an expert", async () => {
  const topic = { ...TOPIC, id: "biology/test-prac", title: "Test prac", reqs: [{ ...REQ, type: "prac" }] };
  const ask = async (job) => (job === "research" ? BRIEF.replace("test-prokaryotes", "test-prac") : `${LESSON("3 × 4 = 12")}\nEND`);
  const r = await runTopic(topic, { ask, askMany: async (job, items) => new Map(items.map((it) => [it.key, `REV ${it.key} OK`])) });
  assert.equal(r.lessons[0].tier, "expert-required");
});

test("the queue: AQA GCSE Biology topics come from the committed index and map", () => {
  const t = topicsFor("aqa-gcse-biology");
  assert.ok(t.length > 50);
  assert.ok(t.every((x) => x.reqs.length && x.reqs.every((r) => r.id.startsWith("aqa-gcse-biology:"))));
  assert.equal(new Set(t.map((x) => x.id)).size, t.length);
});

test("each job's cached prefix is byte-identical and dateless", () => {
  for (const job of ["write", "review", "research"]) {
    const a = JSON.stringify(systemFor(job));
    assert.equal(a, JSON.stringify(systemFor(job)));
    assert.ok(!a.includes(new Date().toISOString().slice(0, 10)), `${job} prefix contains today's date`);
    assert.equal(systemFor(job).filter((b) => b.cache_control).length, 1);
  }
});

test("student signals: unusually wrong questions go to the repair queue", () => {
  const rows = [...Array(40)].map((_, i) => ({ subject: "biology", lesson_id: "u02-03", question_id: "q-bad", difficulty: 1, correct: i < 6 }))
    .concat([...Array(40)].map((_, i) => ({ subject: "biology", lesson_id: "u02-03", question_id: "q-ok", difficulty: 2, correct: i < 25 })));
  const s = suspects(rows);
  assert.deepEqual(s.map((x) => x.question), ["q-bad"]);
});

test("the workflow: parallel per subject, rolling PR, restarts itself, spend cap", () => {
  const y = readFileSync(new URL("../.github/workflows/content.yml", import.meta.url), "utf8");
  for (const s of ["ANTHROPIC_API_KEY", "matrix", "gradify.mjs run", "gh pr", "gh workflow run", "CONTENT_BUDGET_USD", "concurrency", "mode"]) assert.ok(y.includes(s), `content.yml lacks ${s}`);
});

test("approval is per file: a named reviewer, and any edit resets the tier", async () => {
  const { approve, checkTiers } = await import("../scripts/content/report.mjs");
  const { writeFileSync } = await import("node:fs");
  assert.throws(() => approve("biology", "biology/test-prokaryotes", "Prokaryotes up close", ""), /reviewer's name/);
  const l = approve("biology", "biology/test-prokaryotes", "Prokaryotes up close", "A. Reviewer");
  assert.equal(l.tier, "expert-approved");
  assert.deepEqual(checkTiers("biology"), []);
  const f = join(process.env.GRADIFY_OUT, "content/drafts/biology/aqa-gcse-biology/test-prokaryotes.txt");
  writeFileSync(f, readFileSync(f, "utf8").replace("several times bigger", "much bigger"));
  assert.deepEqual(checkTiers("biology", { write: true }), ["biology/test-prokaryotes: Prokaryotes up close"]);
  const led = JSON.parse(readFileSync(join(process.env.GRADIFY_OUT, "content/ledger/biology.json"), "utf8"));
  assert.equal(led.topics["biology/test-prokaryotes"].lessons[0].tier, "unchecked");
  assert.ok(led.topics["biology/test-prokaryotes"].lessons[0].built.brief, "the build record names the brief it was written from");
});

test("a new diagram must describe itself in words", async () => {
  const r = G.parseGate(LESSON("3 × 4 = 12").replace("K: A prokaryote", 'DIA: graph | {"range":{"x":[0,1],"y":[0,1]},"title":"Sizes"}\nK: A prokaryote'));
  assert.deepEqual(r.issues.map((i) => i.note), ["DIA: spec needs a caption", "DIA: spec needs alt text"]);
});

test("arithmetic: scientific notation keeps its exponent, and its rounding scales with it", () => {
  assert.equal(G.evalExpr("2 × 10^-3 + 0"), 0.002);
  assert.deepEqual(G.checkArithmetic("P: 4 × 10^{-3} ÷ 2 = 2 × 10^{-3}"), []);
  assert.equal(G.checkArithmetic("P: 1 / 1000000 = 2 × 10^-6").length, 1, "twice the right answer must fail");
  assert.deepEqual(G.checkArithmetic("P: 3 × 10^4 × 2 = 6 × 10^4"), []);
});

test("sub-requirements: a REQ may name a part, which counts towards its requirement", async () => {
  const { parentOf } = S, known = new Set([REQ.id]);
  assert.equal(parentOf(`${REQ.id}.ii`, known), REQ.id);
  assert.equal(parentOf(`${REQ.id}.zz`, known), null);
  assert.equal(parentOf("other:1.ii", known), null);
  const part = LESSON("3 × 4 = 12").replace(`REQ: ${REQ.id} @1,2`, `REQ: ${REQ.id}.i @1\nREQ: ${REQ.id}.ii @2`);
  const g = await G.runGates(part, { reqs: [REQ], allowed: known });
  assert.ok(g.ok, JSON.stringify(g.failed?.issues));
  const topic = { ...TOPIC, id: "biology/test-parts", title: "Test parts" };
  const r = await runTopic(topic, { ask: async (job) => (job === "research" ? BRIEF.replace("test-prokaryotes", "test-parts") : `${part}\nEND`), askMany: async (job, items) => new Map(items.map((it) => [it.key, `REV ${it.key} OK`])) });
  assert.equal(r.status, "filed"); assert.deepEqual(r.uncovered, []);
});

test("licence gate: a brief's non-fact lines can't rest only on noncommercial or unknown sources", async () => {
  const { checkBrief, licenceProblems } = await import("../scripts/content/loop.mjs");
  const { parseBrief } = await import("../scripts/content/shorthand.mjs");
  assert.deepEqual(checkBrief(BRIEF).problems, []);
  // the gate itself, on licence classes as given
  const nc = parseBrief(BRIEF.replace(/licence=facts/g, "licence=noncommercial"));
  assert.ok(licenceProblems(nc).some((p) => /definitions and misconceptions/.test(p)));
  const exam = parseBrief(BRIEF.replace("END", "EXAM: credit for naming the single loop of DNA | s1\nEND").replace(/s1 \| Open biology text \| (\S+) \| OpenStax \| licence=facts/, "s1 | Open biology text | $1 | OpenStax | licence=unknown"));
  assert.ok(licenceProblems(exam).some((p) => /EXAM .* rests only/.test(p)));
});

test("source allowlist: briefs cite only listed publications, whose class the registry sets; adapt needs a named person", async () => {
  const { checkBrief, researchRequest } = await import("../scripts/content/loop.mjs");
  const { SOURCES, checkSources, sourceFor, classOf } = await import("../kit/curriculum/sources.js");
  assert.deepEqual(checkSources(), []);
  // prefixes match whole path segments: the retired first edition is its own row
  assert.equal(sourceFor("https://openstax.org/books/biology-2e/pages/4-1")?.id, "openstax-biology-2e");
  assert.equal(sourceFor("https://openstax.org/books/biology/pages/4-1")?.id, "openstax-biology");
  assert.equal(sourceFor("https://example.com/biology"), null);
  // the Researcher's label changes nothing: an unconfirmed CC BY row is still facts-only
  const by = SOURCES.find((x) => x.id === "openstax-biology");
  assert.equal(by.use, "adapt"); assert.equal(classOf(by), "facts");
  // the owner's hold keeps the first editions facts-only even once confirmed; without a hold, a confirmed row adapts
  assert.ok(by.hold); assert.equal(classOf({ ...by, confirmedBy: "A Person", confirmedOn: "2026-11-25" }), "facts");
  assert.equal(classOf({ ...by, hold: undefined, confirmedBy: "A Person", confirmedOn: "2026-11-25" }), "adapt");
  const claimed = checkBrief(BRIEF.replace(/licence=facts/g, "licence=adapt"));
  assert.deepEqual(claimed.problems, []); assert.ok(claimed.parsed.sources.every((x) => x.licence === "facts"));
  // an unlisted source refuses the brief
  const off = checkBrief(BRIEF.replace("https://www.bbc.co.uk/bitesize/x", "https://example.com/cells"));
  assert.ok(off.problems.some((p) => /isn't on the source allowlist/.test(p)));
  // independence is by publisher: three different sites, but two of them AQA's, are two publishers
  const two = checkBrief(BRIEF.replace("https://www.bbc.co.uk/bitesize/x", "https://filestore.aqa.org.uk/x").replace("https://www.ncbi.nlm.nih.gov/books/x", "https://www.aqa.org.uk/x"));
  assert.ok(two.problems.some((p) => /2 publishers/.test(p)));
  // the research request lists what may be cited; a row marked none isn't offered
  assert.match(researchRequest(TOPIC), /^ALLOW openstax-biology-2e \| .* \| licence=facts$/m);
  assert.ok(checkSources([{ ...by, id: "x", confirmedBy: "A" }]).some((p) => /confirmation needs/.test(p)));
  assert.ok(checkSources([{ ...by, id: "y", commercial: false }]).some((p) => /adapt needs a licence/.test(p)));
});

test("filing merges by lesson title: rechecking one lesson keeps the others, and the repaired title is recorded", async () => {
  const topic = { ...TOPIC, id: "biology/test-merge", title: "Test merge" };
  const second = LESSON("3 × 4 = 12").replace("## Prokaryotes up close", "## Bacteria and size");
  const ask = (unit) => async (job) => (job === "research" ? BRIEF.replace("test-prokaryotes", "test-merge") : `${unit}\nEND`);
  const ok = async (job, items) => new Map(items.map((it) => [it.key, `REV ${it.key} OK`]));
  await runTopic(topic, { ask: ask(`${LESSON("3 × 4 = 12")}\n\n${second}`), askMany: ok });
  const r = await runTopic(topic, { ask: ask(LESSON("3 × 4 = 12").replace("several times", "far")), askMany: ok });
  const draft = readFileSync(join(process.env.GRADIFY_OUT, "content/drafts/biology/aqa-gcse-biology/test-merge.txt"), "utf8");
  assert.match(draft, /## Bacteria and size/); assert.equal((draft.match(/## Prokaryotes up close/g) || []).length, 1);
  const led = JSON.parse(readFileSync(join(process.env.GRADIFY_OUT, "content/ledger/biology.json"), "utf8")).topics["biology/test-merge"];
  assert.deepEqual(led.lessons.map((l) => l.title).sort(), ["Bacteria and size", "Prokaryotes up close"]);
  assert.equal(r.status, "filed");
});

test("gates-only filing claims no review, and a failed research keeps every requirement queued", async () => {
  const topic = { ...TOPIC, id: "biology/test-gates-only", title: "Test gates only" };
  const r = await runTopic(topic, { reviewed: false, ask: async (job) => (job === "research" ? BRIEF.replace("test-prokaryotes", "test-gates-only") : `${LESSON("3 × 4 = 12")}\nEND`), askMany: async (job, items) => new Map(items.map((it) => [it.key, `REV ${it.key} OK`])) });
  assert.equal(r.lessons[0].tier, "gates-passed");
  const bad = { ...TOPIC, id: "biology/test-no-brief", title: "Test no brief" };
  const f = await runTopic(bad, { ask: async () => "TOPIC x | levels=GCSE | checked=2026-11-25\nEND", askMany: async () => new Map() });
  assert.equal(f.status, "failed"); assert.deepEqual(f.uncovered, [REQ.id]);
});

test("publish: AI-checked and expert-reviewed drafts become a labelled course unit with permanent ids", async () => {
  const { cpSync, mkdirSync } = await import("node:fs");
  const dir = join(process.env.GRADIFY_OUT, "kit/courses/biology");
  mkdirSync(join(dir, "notes"), { recursive: true });
  for (const f of ["syllabus.js", "ids.js", "qa.js", "course.js"]) cpSync(new URL(`../kit/courses/biology/${f}`, import.meta.url), join(dir, f));
  const { publish } = await import("../scripts/content/publish.mjs");
  const r = await publish("biology");
  assert.equal(r.unit, "u15");
  // ai-verified lessons are published; expert-required, gates-only and edited ones are not; a repeated title is skipped
  assert.deepEqual(r.added.map((x) => x.replace(/^u15-\d\d /, "")).sort(), ["Bacteria and size · AI-checked", "Prokaryotes up close · AI-checked"]);
  assert.ok(r.skipped.some((x) => /gates-passed/.test(x)) && r.skipped.some((x) => /expert-required/.test(x)) && r.skipped.some((x) => /already published a lesson with this title/.test(x)));
  const notes = readFileSync(join(dir, "notes/u15.js"), "utf8"), pub = readFileSync(join(dir, "published.js"), "utf8");
  assert.match(notes, /## Prokaryotes up close\nTIER: AI-checked\n/);
  assert.match(pub, /"n": 15/); assert.match(pub, /15\. Specification lessons\\n> /);
  for (const f of ["syllabus.js", "ids.js", "qa.js", "course.js"]) assert.match(readFileSync(join(dir, f), "utf8"), /from "\.\/published\.js"/, `${f} imports the published unit`);
  assert.match(readFileSync(join(dir, "course.js"), "utf8"), /\.\.\.\(PUBLISHED\.id \? \[PUBLISHED\.id\] : \[\]\)\]/);
  // a second publish with nothing new changes nothing, and keeps the ids
  const ids = JSON.parse(pub.match(/PUBLISHED = (\{[\s\S]*\});/)[1]).ids;
  const again = await publish("biology");
  assert.deepEqual([again.added, again.updated, again.hooks], [[], [], []]);
  assert.deepEqual(JSON.parse(readFileSync(join(dir, "published.js"), "utf8").match(/PUBLISHED = (\{[\s\S]*\});/)[1]).ids, ids);
});

test("lesson reports: one 'wrong' report or two of any kind send a lesson to the repair queue", async () => {
  const { reportQueue } = await import("../scripts/content/signals.mjs");
  const q = reportQueue([{ subject: "biology", lesson_id: "u02-03", kind: "wrong" }, { subject: "biology", lesson_id: "u02-04", kind: "typo" }, { subject: "biology", lesson_id: "u02-05", kind: "unclear" }, { subject: "biology", lesson_id: "u02-05", kind: "typo" }]);
  assert.deepEqual(q.map((x) => x.lesson), ["u02-03", "u02-05"]);
  const sql = readFileSync(new URL("../supabase/migrations/20261125120000_lesson_reports.sql", import.meta.url), "utf8");
  assert.match(sql, /enable row level security/); assert.match(sql, /subject ~ '\^\[a-z0-9-\]\{1,40\}\$'/); assert.match(sql, /revoke all on table public\.lesson_reports from anon/);
});

test("agent mode: a topic moves through files from research to filing, and each step says which model runs it", async () => {
  const { advance, BRIEFS, addReqLine } = await import("../scripts/content/agent.mjs");
  const { writeFileSync, mkdirSync } = await import("node:fs");
  const topic = { ...TOPIC, id: "biology/test-agent", title: "Test agent" }, Q = join(process.env.GRADIFY_OUT, "content/queue/biology/test-agent");
  const reply = (name, text) => writeFileSync(join(Q, name), text);
  let r = await advance(topic);
  assert.deepEqual(r.actions.map((a) => [a.kind, a.model]), [["research", "sonnet"]]);
  assert.match(r.actions[0].prompt, /web search/); assert.ok(existsSync(join(process.env.GRADIFY_OUT, r.actions[0].req)));
  reply("research.out.txt", BRIEF.replace("test-prokaryotes", "test-agent"));
  r = await advance(topic);
  assert.equal(r.actions[0].kind, "write"); assert.equal(r.actions[0].model, "opus");
  assert.match(readFileSync(join(process.env.GRADIFY_OUT, r.actions[0].req), "utf8"), /^PKT /);
  assert.ok(r.actions[0].examples.every((f) => f.startsWith("prompts/examples/gcse--")));
  reply("write.out.txt", `${LESSON()}\nEND`);
  r = await advance(topic);                                    // the arithmetic gate fails: a repair step
  assert.equal(r.actions[0].kind, "repair"); assert.match(readFileSync(join(process.env.GRADIFY_OUT, r.actions[0].pairs[0][0]), "utf8"), /^FIX new#1\nL13 NUM/);
  reply("repair-1.out.txt", "REPAIR new#1\nL13> > 3 × 4 = 12 micrometres.\nEND");
  r = await advance(topic);                                    // gates pass: a fresh reviewer on a different model
  assert.deepEqual(r.actions.map((a) => [a.kind, a.model]), [["review", "sonnet"]]);
  assert.match(r.actions[0].prompt, /did not write/);
  reply("review-1.out.txt", "REV new#1 FAIL CLR L11 the size comparison is muddled");
  r = await advance(topic);
  assert.equal(r.actions[0].kind, "repair");
  reply("repair-1.out.txt", "REPAIR new#1\nL11> P: Most bacteria are 1 to 10 micrometres long, while a typical animal cell is 10 to 30 micrometres across, so eukaryotic cells are usually several times bigger.\nEND");
  r = await advance(topic); assert.equal(r.actions[0].kind, "review");
  reply("review-1.out.txt", "REV new#1 OK");
  r = await advance(topic);
  assert.deepEqual(r.actions, []); assert.equal(r.filed.status, "filed");
  assert.equal(r.filed.lessons[0].tier, "ai-verified"); assert.ok(r.filed.lessons[0].disagreed);
  assert.equal(r.filed.lessons[0].built.models.review, "agent:sonnet");
  assert.ok(!existsSync(Q), "the queue entry is cleared once filed");
  assert.ok(Object.keys(BRIEFS).every((k) => typeof BRIEFS[k] === "function"));
  // mapping: a confirmed match adds a REQ: line to the existing lesson, once
  const f = "kit/courses/biology/notes/u99.js"; mkdirSync(join(process.env.GRADIFY_OUT, "kit/courses/biology/notes"), { recursive: true });
  writeFileSync(join(process.env.GRADIFY_OUT, f), "export default `\n## A lesson\nS: lead\nO: one\nO: two\nH: h\n\n## Next\nS: x\n`;\n");
  assert.ok(addReqLine(f, "A lesson", "aqa-gcse-biology:4.1.1.1.a", [1, 2])); addReqLine(f, "A lesson", "aqa-gcse-biology:4.1.1.1.a", [1, 2]);
  const t = readFileSync(join(process.env.GRADIFY_OUT, f), "utf8");
  assert.match(t, /O: two\nREQ: aqa-gcse-biology:4\.1\.1\.1\.a @1,2\nH: h/); assert.equal((t.match(/REQ:/g) || []).length, 1);
});

test("mapping replies: NO lines are recorded, and a rejected strong match joins the write queue", async () => {
  const { parseMapLine, mapCandidates } = await import("../scripts/content/agent.mjs");
  const { writeFileSync, mkdirSync } = await import("node:fs");
  assert.deepEqual(parseMapLine("MAP aqa-gcse-biology:4.1.1.2.a NO lesson never relates structures to functions"), { reqId: "aqa-gcse-biology:4.1.1.2.a", lesson: null, verdict: "NO", rest: "lesson never relates structures to functions" });
  assert.deepEqual(parseMapLine("MAP aqa-gcse-biology:4.1.1.2.b u02-04 YES @1,2"), { reqId: "aqa-gcse-biology:4.1.1.2.b", lesson: "u02-04", verdict: "YES", rest: "@1,2" });
  assert.equal(parseMapLine("MAP aqa-gcse-biology:4.1.1.2.b u02-04 NO too shallow").verdict, "NO");
  assert.equal(parseMapLine("END"), null);
  const [a, b] = mapCandidates("aqa-gcse-biology").map((c) => c.ref), inQueue = (ref) => topicsFor("aqa-gcse-biology").some((t) => t.reqs.some((r) => r.ref === ref));
  assert.ok(!inQueue(a) && !inQueue(b), "unconfirmed strong matches wait for their check");
  mkdirSync(join(process.env.GRADIFY_OUT, "content/mapping"), { recursive: true });
  writeFileSync(join(process.env.GRADIFY_OUT, "content/mapping/aqa-gcse-biology.json"), JSON.stringify({ confirmed: { [a]: { ok: false, why: "not taught" }, [b]: { ok: true, lesson: "u02-04", objectives: [1] } } }));
  assert.ok(inQueue(a), "a rejected match is written"); assert.ok(!inQueue(b), "a confirmed match is not");
  assert.ok(!mapCandidates("aqa-gcse-biology").some((c) => c.ref === a || c.ref === b), "decided matches aren't asked again");
});

test("review fixes on #208: citations, stale inputs, outdated coverage, timeouts, learners", async () => {
  const { checkBrief } = await import("../scripts/content/loop.mjs");
  const { advance } = await import("../scripts/content/agent.mjs");
  const { reportQueue } = await import("../scripts/content/signals.mjs");
  const { writeFileSync } = await import("node:fs");
  // a non-fact line citing a source the brief doesn't list is refused
  assert.ok(checkBrief(BRIEF.replace("END", "EXAM: credit for naming the DNA loop | missing-source") + "\nEND").problems.some((p) => /missing-source/.test(p)));
  // replies made for old inputs are discarded when the requirement changes
  const topic = { ...TOPIC, id: "biology/test-stale", title: "Test stale" }, Q = join(process.env.GRADIFY_OUT, "content/queue/biology/test-stale");
  await advance(topic); writeFileSync(join(Q, "research.out.txt"), BRIEF.replace("test-prokaryotes", "test-stale"));
  await advance(topic); writeFileSync(join(Q, "write.out.txt"), `${LESSON("3 × 4 = 12")}\nEND`);
  let r = await advance(topic); assert.equal(r.actions[0].kind, "review"); writeFileSync(join(Q, "review-1.out.txt"), "REV new#1 OK");
  const changed = { ...topic, reqs: [{ ...REQ, hash: "h2" }] };
  writeFileSync(join(process.env.GRADIFY_OUT, "content/research/biology/test-stale.txt"), `# fp=${(await import("../scripts/content/loop.mjs")).briefKey(changed)}\n${BRIEF.replace("test-prokaryotes", "test-stale")}\n`);
  r = await advance(changed);
  assert.equal(r.filed, null, "an OK review of the old requirement isn't filed against the new one");
  assert.equal(r.actions[0].kind, "write"); assert.ok(!existsSync(join(Q, "review-1.out.txt")));
  // a lesson built on an old requirement hash no longer covers it
  const old = { ...TOPIC, id: "biology/test-outdated", title: "Test outdated" };
  const ok = async (job, items) => new Map(items.map((it) => [it.key, `REV ${it.key} OK`]));
  const ask = (t) => async (job) => (job === "research" ? BRIEF.replace("test-prokaryotes", "test-outdated") : `${LESSON("3 × 4 = 12")}\nEND`);
  assert.equal((await runTopic(old, { ask: ask(), askMany: ok })).status, "filed");
  const f = await runTopic({ ...old, reqs: [{ ...REQ, hash: "h9" }] }, { ask: async () => "TOPIC x | levels=GCSE | checked=2026-11-25\nEND", askMany: ok });
  assert.deepEqual(f.uncovered, [REQ.id]); assert.notEqual(f.status, "filed");
  // a timed-out batch stops the topic: cancelled reviews aren't failures and no repair round starts
  let repairs = 0;
  const timed = async (job, items) => { if (job === "repair") repairs++; const m = new Map(items.map((it) => [it.key, new Error("canceled")])); m.timedOut = "batch b1 ran past 300 minutes"; return m; };
  const t = await runTopic({ ...TOPIC, id: "biology/test-timeout", title: "Test timeout" }, { ask: async (job) => (job === "research" ? BRIEF.replace("test-prokaryotes", "test-timeout") : `${LESSON("3 × 4 = 12")}\nEND`), askMany: timed });
  assert.equal(repairs, 0); assert.equal(t.failures[0].gate, "unfinished"); assert.deepEqual(t.uncovered, [REQ.id]);
  // two reports from one learner aren't two learners
  assert.deepEqual(reportQueue([{ subject: "biology", lesson_id: "u02-04", kind: "typo", user_id: "a" }, { subject: "biology", lesson_id: "u02-04", kind: "typo", user_id: "a" }]), []);
  const two = reportQueue([{ subject: "biology", lesson_id: "u02-04", kind: "typo", user_id: "a" }, { subject: "biology", lesson_id: "u02-04", kind: "unclear", user_id: "b" }]);
  assert.equal(two.length, 1); assert.ok(!("who" in two[0]), "no learner ids leave the function");
});

test("publish: titles differing only in case share an identity, and one TIER label survives", async () => {
  const { publish } = await import("../scripts/content/publish.mjs");
  const { writeFileSync, mkdirSync } = await import("node:fs");
  const ledPath = join(process.env.GRADIFY_OUT, "content/ledger/biology.json"), led = JSON.parse(readFileSync(ledPath, "utf8"));
  const text = LESSON("3 × 4 = 12").replace("## Prokaryotes up close", "## prokaryotes UP CLOSE").replace("LV: GCSE", "TIER: Expert-reviewed\nLV: GCSE");
  mkdirSync(join(process.env.GRADIFY_OUT, "content/drafts/biology/aqa-gcse-biology"), { recursive: true });
  writeFileSync(join(process.env.GRADIFY_OUT, "content/drafts/biology/aqa-gcse-biology/test-case.txt"), `# draft\n\n${text}\n`);
  const { fp } = await import("../scripts/content/lib.mjs");
  led.topics["biology/test-case"] = { file: "content/drafts/biology/aqa-gcse-biology/test-case.txt", title: "Test case", lessons: [{ title: "prokaryotes UP CLOSE", tier: "ai-verified", hash: fp(text), reqs: [REQ.id] }], status: "filed" };
  writeFileSync(ledPath, JSON.stringify(led));
  const r = await publish("biology");
  assert.ok(r.skipped.some((x) => /prokaryotes UP CLOSE .*already published a lesson with this title/.test(x)), "a case-only variant gets no new id");
  const notes = readFileSync(join(process.env.GRADIFY_OUT, "kit/courses/biology/notes/u15.js"), "utf8");
  for (const lesson of notes.split(/\n(?=## )/).filter((x) => x.startsWith("## "))) assert.equal((lesson.match(/^TIER:/gm) || []).length, 1);
});

test("review fixes after #208 merged: mapping replies, publish wiring and duplicates, verified links, spend", async () => {
  const { writeFileSync, mkdirSync, cpSync } = await import("node:fs");
  const { applyMapping, mapCandidates, loadMapping } = await import("../scripts/content/agent.mjs");
  const { loadIndex, applyReview } = await import("../scripts/curriculum/engine.mjs");
  const fw = "aqa-gcse-biology", hash = new Map(loadIndex(fw).statements.map((x) => [x.ref, x.hash]));
  // a mapping reply is stored only against the statement text it was asked about
  const [, , c, d] = mapCandidates(fw).map((x) => x.ref), dir = join(process.env.GRADIFY_OUT, `content/queue/biology/_map-${fw}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "map.req.txt"), `MAPREQ ${fw}:${c} #${hash.get(c)} | x\nMAPREQ ${fw}:${d} #0000stale0000000 | x\nEND\n`);
  writeFileSync(join(dir, "map.out.txt"), `MAP ${fw}:${c} NO not taught\nMAP ${fw}:${d} NO not taught\nEND\n`);
  const res = await applyMapping("biology"), M = loadMapping(fw);
  assert.equal(M.confirmed[c]?.hash, hash.get(c), "a current reply is recorded with its hash");
  assert.ok(!M.confirmed[d] && res.some((x) => x.includes(d) && /dropped/.test(x)), "a reply about changed text is dropped and asked again");
  assert.ok(mapCandidates(fw).some((x) => x.ref === d));
  // a course file that imports published.js without its hook is refused, not accepted as wired
  const { installHooks, publish } = await import("../scripts/content/publish.mjs");
  const cdir = join(process.env.GRADIFY_OUT, "kit/courses/halfwired");
  mkdirSync(cdir, { recursive: true });
  for (const f of ["syllabus.js", "ids.js", "qa.js", "course.js"]) cpSync(new URL(`../kit/courses/biology/${f}`, import.meta.url), join(cdir, f));
  writeFileSync(join(cdir, "syllabus.js"), readFileSync(join(cdir, "syllabus.js"), "utf8").replace(/export const UNITS = parseSyllabus\(PUBLISHED[^\n]+/, "export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);"));
  assert.throws(() => installHooks("halfwired"), /without its hook/);
  // two lessons in one topic whose titles share a key: the second is skipped, not written over the first
  const ledPath = join(process.env.GRADIFY_OUT, "content/ledger/biology.json"), led = JSON.parse(readFileSync(ledPath, "utf8"));
  const { fp } = await import("../scripts/content/lib.mjs");
  const one = LESSON("3 × 4 = 12").replace("## Prokaryotes up close", "## Cell division"), two = LESSON("3 × 4 = 12").replace("## Prokaryotes up close", "## Cell-division");
  writeFileSync(join(process.env.GRADIFY_OUT, "content/drafts/biology/aqa-gcse-biology/test-dupe.txt"), `# draft\n\n${one}\n\n${two}\n`);
  led.topics["biology/test-dupe"] = { file: "content/drafts/biology/aqa-gcse-biology/test-dupe.txt", title: "Test dupe", status: "filed", lessons: [{ title: "Cell division", tier: "ai-verified", hash: fp(one), reqs: [REQ.id] }, { title: "Cell-division", tier: "ai-verified", hash: fp(two), reqs: [REQ.id] }] };
  writeFileSync(ledPath, JSON.stringify(led));
  const r = await publish("biology");
  assert.equal(r.added.filter((x) => /Cell.division/.test(x)).length, 1);
  assert.ok(r.skipped.some((x) => /Cell-division .*same title/.test(x)));
  // a reviewed mapping link records the statement it was reviewed on
  const st = { spec: fw, version: "1", statements: [{ ref: "1.a", text: "Cells divide by mitosis." }] };
  const rv = applyReview(st, { spec: fw, specVersion: "1", links: {} }, [{ ref: "1.a", decision: "missing", reviewer: "A Reviewer", reviewed_on: "2026-11-25", note: "not taught" }], new Set());
  assert.match(rv.map.links["1.a"]?.hash || "", /^[0-9a-f]{16}$/);
  // the workflow counts each run record once, even when the publish job is rerun
  assert.match(readFileSync(new URL("../.github/workflows/content.yml", import.meta.url), "utf8"), /!counted\.has\(f\)/);
});

test("requirement records: status, type, version, publication date and period; the queue refuses an index without them", async () => {
  const { checkIndex, loadIndex, REQ_TYPES } = await import("../scripts/curriculum/engine.mjs");
  const idx = loadIndex("aqa-gcse-biology");
  assert.deepEqual(checkIndex(idx), []);
  assert.equal(idx.published, "2016-04-21"); assert.deepEqual(idx.applies, { from: "2016", to: null });
  assert.ok(idx.statements.every((x) => x.status === "official" && REQ_TYPES.includes(x.type)));
  assert.equal(idx.statements.filter((x) => x.type === "practical").length, 10);
  const r = topicsFor("aqa-gcse-biology")[0].reqs[0];
  assert.equal(r.status, "official"); assert.equal(r.reqType, "spec-bullet"); assert.deepEqual(r.spec, { version: "1.0", published: "2016-04-21" });
  assert.ok(checkIndex({ ...idx, applies: undefined }).some((p) => /applicable period/.test(p)));
  assert.ok(checkIndex({ ...idx, statements: [{ ...idx.statements[0], status: "compulsory" }] }).some((p) => /valid status and type/.test(p)));
});

test("PRE: lines must name a course lesson, a lesson in the unit, or a registered requirement", async () => {
  const { prereqResolver } = await import("../scripts/content/loop.mjs");
  const ok = prereqResolver("biology", ["Cells in this unit"]);
  assert.ok(ok("Eukaryotic cells")); assert.ok(ok("eukaryotic CELLS")); assert.ok(ok("Cells in this unit"));
  assert.ok(ok("aqa-gcse-biology:4.1.1.1.a")); assert.ok(ok("aqa-gcse-biology:4.1.1.1.a.ii"));
  assert.ok(!ok("A lesson nobody wrote")); assert.ok(!ok("aqa-gcse-biology:9.9.9"));
  const withPre = LESSON("3 × 4 = 12").replace("REQ:", "PRE: A lesson nobody wrote\nREQ:");
  const g = await G.runGates(withPre, { reqs: [REQ], allowed: new Set([REQ.id]), prereq: ok });
  assert.equal(g.failed?.gate, "coverage"); assert.ok(g.failed.issues.some((i) => i.code === "PRE"));
});

test("build records: a changed model, prompt or template requeues only the lessons that used it; a rebuild supersedes them", async () => {
  const { writeFileSync } = await import("node:fs");
  const { staleness, buildRecord, currentModels, templateOf, promptHashes } = await import("../scripts/content/build.mjs");
  const { rebuildReqs, staleLessons } = await import("../scripts/content/queue.mjs");
  const { fileTopic, lessonState } = await import("../scripts/content/loop.mjs");
  const brief = { key: (await import("../scripts/content/build.mjs")).briefKey(TOPIC), brief: BRIEF };
  const fresh = buildRecord(TOPIC, brief, { reqs: [`${REQ.id}@${REQ.hash}`] });
  assert.deepEqual(Object.keys(fresh.prompts).sort(), ["review.md", "shorthand.md", "writer.md"]);
  assert.deepEqual(fresh.models, currentModels()); assert.equal(fresh.template.fp, templateOf(TOPIC.level).fp);
  const lesson = (built, o = {}) => ({ title: "A", reqs: [REQ.id], tier: "ai-verified", built, ...o });
  assert.deepEqual(staleness(lesson(fresh), TOPIC), []);
  assert.deepEqual(staleness(lesson({ ...fresh, models: { ...fresh.models, write: "old-model" } }), TOPIC), ["write model"]);
  assert.deepEqual(staleness(lesson({ ...fresh, prompts: { ...promptHashes(), "writer.md": "x" } }), TOPIC), ["prompt writer.md"]);
  assert.deepEqual(staleness(lesson({ ...fresh, template: { level: "gcse", fp: "x" } }), TOPIC), ["template"]);
  assert.deepEqual(staleness(lesson({ ...fresh, brief: "old" }), TOPIC), ["brief"]);
  assert.deepEqual(staleness(lesson({ ...fresh, models: { write: "old" } }, { superseded: "2026-11-25" }), TOPIC), [], "a superseded lesson isn't rebuilt again");
  // only the stale lesson's requirements go back; the other lesson's don't
  const other = { ...REQ, id: "aqa-gcse-biology:4.1.1.1.c", ref: "4.1.1.1.c", hash: "h2" }, t2 = { ...TOPIC, reqs: [REQ, other] };
  const fresh2 = buildRecord(t2, { ...brief, key: (await import("../scripts/content/build.mjs")).briefKey(t2) });
  const e = { lessons: [lesson({ ...fresh2, models: { write: "old" } }), lesson(fresh2, { title: "B", reqs: [other.id] })] };
  assert.deepEqual(rebuildReqs(t2, e), [REQ.id]); assert.equal(staleLessons(t2, e).length, 1);
  assert.deepEqual(rebuildReqs(t2, { ...e, rebuildKey: (await import("../scripts/content/build.mjs")).targetKey(t2), rebuilds: 3 }), [], "a target that failed `repairs` times isn't retried");
  // filing a rebuild: the new lesson supersedes the old one, which drops out of the rebuild list
  const ledPath = join(process.env.GRADIFY_OUT, "content/ledger/biology.json"), led = JSON.parse(readFileSync(ledPath, "utf8"));
  const tid = "biology/test-rebuild", T = { ...TOPIC, id: tid, title: "Test rebuild" };
  led.topics[tid] = { runs: 1, reqHash: `${REQ.id}:${REQ.hash}`, status: "filed", lessons: [lesson({ ...fresh, models: { write: "old" } }, { title: "Old title" })] };
  writeFileSync(ledPath, JSON.stringify(led));
  const text = LESSON("3 × 4 = 12"), s = { ...lessonState({ title: "Prokaryotes up close", text }, 0), done: true, lesson: parseNotes(text)[0] };
  fileTopic({ ...T, rebuild: [REQ.id], full: T }, [s], { brief: { ...brief, parsed: S.parseBrief(BRIEF), cached: true } });
  const after = JSON.parse(readFileSync(ledPath, "utf8")).topics[tid];
  assert.ok(after.lessons.find((l) => l.title === "Old title").superseded);
  assert.deepEqual(rebuildReqs(T, after), []);
});

test("status ladder: frameworks by country, requirements by the highest rung reached", async () => {
  const { ladder, LADDER } = await import("../scripts/content/report.mjs");
  const L = ladder(), uk = L.frameworks.find((c) => c.country === "United Kingdom");
  assert.equal(uk.subjects.find((x) => x.subject === "biology").stage, "spec imported");
  assert.equal(uk.subjects.find((x) => x.subject === "maths").stage, "not researched", "unknown stays unknown");
  assert.ok(L.frameworks.filter((c) => c.country !== "United Kingdom").every((c) => c.subjects.every((x) => x.stage === "not researched")));
  const c = L.requirements["aqa-gcse-biology"];
  assert.deepEqual(Object.keys(c), LADDER.slice(2));
  assert.equal(Object.values(c).reduce((a, n) => a + n, 0), 475, "every statement sits on exactly one rung");
  assert.ok(c.mapped >= 1, "confirmed matches count as mapped");
  // earlier tests edit a filed lesson after it was checked: its requirement needs update, which outranks published
  assert.ok(c["needs update"] >= 1);
});

test("a second subject from registry rows: AQA GCSE Chemistry queues with the same engine", async () => {
  const { checkRegistry, SPECS } = await import("../kit/curriculum/uk.js");
  const { checkIndex, loadIndex } = await import("../scripts/curriculum/engine.mjs");
  const { subjectsInRun } = await import("../scripts/content/queue.mjs");
  assert.deepEqual(checkRegistry(), []);
  assert.equal(SPECS.find((s) => s.id === "aqa-gcse-chemistry").subject, "chemistry");
  const idx = loadIndex("aqa-gcse-chemistry");
  assert.deepEqual(checkIndex(idx), []);
  assert.equal(idx.statements.filter((x) => x.type === "practical").length, 8, "AQA's eight required practicals");
  assert.deepEqual([...new Set(idx.statements.map((x) => x.ref.split(".").slice(0, 2).join(".")))], ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10"], "4.11 Key ideas isn't assessed");
  assert.ok(subjectsInRun().includes("chemistry"));
  const t = topicsFor("aqa-gcse-chemistry");
  assert.ok(t.length > 50 && t.every((x) => x.subject === "chemistry" && x.level === "GCSE" && x.reqs.every((r) => r.status === "official")));
});

test("a waiting research request is rebuilt each run, so one written by an older engine gets the ALLOW list", async () => {
  const { writeFileSync, mkdirSync } = await import("node:fs");
  const { advance } = await import("../scripts/content/agent.mjs");
  const T = { ...TOPIC, id: "biology/test-stale-request", title: "Test stale request" }, dir = join(process.env.GRADIFY_OUT, "content/queue/biology/test-stale-request");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "research.req.txt"), `RESEARCH ${T.id} | levels=GCSE\nEND\n`);
  const r = await advance(T);
  assert.equal(r.actions[0].kind, "research");
  assert.match(readFileSync(join(dir, "research.req.txt"), "utf8"), /^ALLOW openstax-biology-2e /m);
  assert.match(r.actions[0].prompt, /fetchtext\.sh/);
});

test("a new lesson can't take a title the course already uses; the engine's published unit may keep its own", async () => {
  const { takenTitle } = await import("../scripts/content/loop.mjs");
  const taken = takenTitle("biology");
  assert.match(taken("Cell specialisation") || "", /^u02: /); assert.match(taken("MICROSCOPY") || "", /^u14: /);
  assert.equal(taken("How specialised cells are adapted to their jobs"), null);
  const g = await G.runGates(LESSON("3 × 4 = 12").replace("## Prokaryotes up close", "## Cell specialisation"), { reqs: [REQ], allowed: new Set([REQ.id]), taken });
  assert.equal(g.failed?.gate, "coverage"); assert.ok(g.failed.issues.some((i) => /already has a lesson titled/.test(i.note)));
});

test("high-risk keywords match at a word start, and molecule names like amino acids aren't hazards", async () => {
  const { riskKeywords } = await import("../scripts/content/loop.mjs");
  assert.deepEqual(riskKeywords("Ribosomes join amino acids into proteins; DNA is a nucleic acid."), []);
  assert.deepEqual(riskKeywords("A placid dog."), []);
  assert.deepEqual(riskKeywords("Wear eye protection: the acid is corrosive."), ["acid"]);
  assert.deepEqual(riskKeywords("Hydrochloric acid in the stomach kills bacteria."), ["acid"]);
  assert.deepEqual(riskKeywords("Hormones in pregnancy"), ["pregnan"]);
});

test("filed lessons take the current high-risk rules: a keyword misfire is cleared, a new hit is raised, edited text is left", async () => {
  const { writeFileSync, mkdirSync } = await import("node:fs");
  const { retier } = await import("../scripts/content/loop.mjs");
  const { fp } = await import("../scripts/content/lib.mjs");
  const S0 = await import("../scripts/content/shorthand.mjs");
  const file = "content/drafts/retier/aqa-gcse-biology/t.txt", dir = join(process.env.GRADIFY_OUT, "content/drafts/retier/aqa-gcse-biology");
  mkdirSync(dir, { recursive: true });
  const A = "## Lesson A\nLV: GCSE\nS: Ribosomes join amino acids.", B = "## Lesson B\nLV: GCSE\nS: Never taste an acid.", C = "## Lesson C\nLV: GCSE\nS: Amino acids again.";
  writeFileSync(join(process.env.GRADIFY_OUT, file), `# head\n\n${A}\n\n${B}\n\n${C}\n`);
  const h = (t) => fp(S0.splitUnit(`${t}\n`)[0].text);
  const L = (title, tier, hash, x = {}) => ({ title, tier, hash, reqs: ["aqa-gcse-biology:4.1.1.3.a"], ...x });
  mkdirSync(join(process.env.GRADIFY_OUT, "content/ledger"), { recursive: true });
  writeFileSync(join(process.env.GRADIFY_OUT, "content/ledger/retier.json"), JSON.stringify({ subject: "retier", topics: { "retier/t": { file, lessons: [
    L("Lesson A", "expert-required", h(A), { highRisk: true }), L("Lesson B", "ai-verified", h(B)), L("Lesson C", "expert-required", "edited", { highRisk: true }),
  ] } } }));
  const changed = retier("retier", { date: "2026-11-25" });
  assert.deepEqual(changed.map((c) => [c.title, c.to]), [["Lesson A", "ai-verified"], ["Lesson B", "expert-required"]]);
  const led = JSON.parse(readFileSync(join(process.env.GRADIFY_OUT, "content/ledger/retier.json"), "utf8")).topics["retier/t"].lessons;
  assert.equal(led[0].highRisk, undefined); assert.equal(led[0].retiered.from, "expert-required");
  assert.equal(led[1].highRisk, true); assert.match(led[1].retiered.why, /acid/);
  assert.equal(led[2].tier, "expert-required");
  assert.deepEqual(retier("retier"), []);
});

test("a NUM problem is reported on its own line, not on a worked example that opens with the same words", async () => {
  const shared = "A cell image is 20 mm wide under a magnification of";
  const base = LESSON("3 × 4 = 12");
  const text = base.replace(/\n(?=M1@)/, `\nX: ${shared} ×400. Real size = 20 ÷ 400 = 0.05 mm.\nNUM1@1: ${shared} ×100. What is the real width in mm? | 0.5 | 0 | mm | Real size = 20 ÷ 100 = 0.2 mm.\n`);
  const lines = text.split("\n"), numAt = lines.findIndex((l) => l.startsWith("NUM1@")) + 1, exAt = lines.findIndex((l) => l.startsWith(`X: ${shared}`)) + 1;
  assert.ok(numAt > exAt && exAt > 0);
  const { parseNotes: P } = await import("../kit/course/notes.js");
  const L = P(text)?.[0] || P(text);
  const r = await G.mathsDiagramGate(L.lessons ? L.lessons[0] : L, text);
  const hit = r.issues.find((i) => /isn't what the working gives/.test(i.note));
  assert.ok(hit, JSON.stringify(r.issues)); assert.equal(hit.line, numAt);
});

test("the specification gate doesn't ask for command words like 'demonstrate an understanding'", () => {
  const L = { reqs: [{ id: "x:1" }] }, req = { id: "x:1", title: "Osmosis", text: "Demonstrate an understanding of osmosis across a partially permeable membrane." };
  const lesson = "REQ: x:1 @1\nWater moves by osmosis across a partially permeable membrane.";
  assert.ok(G.specGate(L, lesson, [req]).ok);
  assert.ok(!G.specGate(L, "REQ: x:1 @1\nWater moves.", [req]).ok);
});

test("a fraction shown as a result is checked as a fraction", () => {
  assert.deepEqual(G.checkArithmetic("> Area: 2 ÷ 50 = 1/25 of the cell"), []);
  assert.equal(G.checkArithmetic("> Area: 2 ÷ 50 = 1/20 of the cell").length, 1);
  assert.equal(G.checkArithmetic("> 3 × 4 = 13").length, 1);
});
