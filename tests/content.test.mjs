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
const LESSON = (sum = "3 × 4 = 13") => `## Prokaryotic cells
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
  const untested = await G.runGates(LESSON().replace("M2@2:", "M2@1:"), { reqs: [REQ] });
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
  assert.match(prBody([r], { usd: 0.1, calls: 3, searches: 0, cacheRead: 0, cacheWrite: 0, byJob: {} }), /stopped at `num-dia`/);
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
  assert.throws(() => approve("biology", "biology/test-prokaryotes", "Prokaryotic cells", ""), /reviewer's name/);
  const l = approve("biology", "biology/test-prokaryotes", "Prokaryotic cells", "A. Reviewer");
  assert.equal(l.tier, "expert-approved");
  assert.deepEqual(checkTiers("biology"), []);
  const f = join(process.env.GRADIFY_OUT, "content/drafts/biology/aqa-gcse-biology/test-prokaryotes.txt");
  writeFileSync(f, readFileSync(f, "utf8").replace("several times bigger", "much bigger"));
  assert.deepEqual(checkTiers("biology", { write: true }), ["biology/test-prokaryotes: Prokaryotic cells"]);
  const led = JSON.parse(readFileSync(join(process.env.GRADIFY_OUT, "content/ledger/biology.json"), "utf8"));
  assert.equal(led.topics["biology/test-prokaryotes"].lessons[0].tier, "unchecked");
  assert.ok(led.topics["biology/test-prokaryotes"].lessons[0].built.brief, "the build record names the brief it was written from");
});

test("a new diagram must describe itself in words", async () => {
  const r = G.parseGate(LESSON("3 × 4 = 12").replace("K: A prokaryote", 'DIA: graph | {"range":{"x":[0,1],"y":[0,1]},"title":"Sizes"}\nK: A prokaryote'));
  assert.deepEqual(r.issues.map((i) => i.note), ["DIA: spec needs a caption", "DIA: spec needs alt text"]);
});
