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
const { runTopic: runTopicGated, research } = await import("../scripts/content/loop.mjs");
// Lesson writing needs a person's approval of the brief's evidence (scripts/content/evidence.mjs). These tests exercise
// the engine after that approval, so each fixture brief is approved the way a person approves one: approveEvidence with
// the topic's requirements, its gaps accepted and the reason recorded, changed inputs acknowledged, and the approval
// verified against a GitHub PR review (a recorded review stands in for the GitHub API). The gate itself is tested in
// tests/evidence.test.mjs, without these wrappers.
const EVIDENCE = await import("../scripts/content/evidence.mjs");
const require_fs = await import("node:fs");
const FIXTURE_APPROVAL = "test fixture: the evidence itself is not under test here";
// the copying checks need the specification's text: the sandbox carries the fixture requirement's own (the real text
// is the awarding body's and never committed), so they run in CI as they do locally
{
  const idx = JSON.parse(require_fs.readFileSync(new URL("../kit/curriculum/specs/aqa-gcse-biology.json", import.meta.url), "utf8"));
  const f = join(process.env.GRADIFY_OUT, "data/curriculum/specs/aqa-gcse-biology.json");
  require_fs.mkdirSync(join(f, ".."), { recursive: true });
  require_fs.writeFileSync(f, JSON.stringify({ ...idx, statements: idx.statements.map((x) => (x.ref === "4.1.1.1.b" ? { ...x, text: "Prokaryotic cells are much smaller than eukaryotic cells and have no nucleus; their genetic material is a single loop of DNA." } : x)) }));
}
const ledgerIds = (id) => {
  const f = join(process.env.GRADIFY_OUT, `content/ledger/${id.split("/")[0]}.json`); if (!require_fs.existsSync(f)) return null;
  const e = JSON.parse(require_fs.readFileSync(f, "utf8")).topics?.[id]; if (!e) return null;
  const ids = String(e.reqHash || "").split(",").map((x) => x.split(":").slice(0, -1).join(":")).filter(Boolean);
  return ids.length ? ids : [...new Set((e.lessons || []).flatMap((l) => l.reqs || []))];
};
const approveText = (text, topic = null) => {
  const id = String(text || "").match(/^TOPIC (\S+)/m)?.[1]; if (!id) return;
  const ctx = topic ? { topic } : { reqIds: ledgerIds(id) || ["aqa-gcse-biology:4.1.1.1.b"], fw: "aqa-gcse-biology" };
  const now = EVIDENCE.approvalOf(id, { briefText: text, ...ctx }); if (now.approval) return;
  EVIDENCE.approveEvidence(id, { by: "Test fixture", github: "test-reviewer", on: "2026-11-26", acceptGaps: FIXTURE_APPROVAL, acknowledge: ["brief", "requirements", "verdicts", "policy", "rules", ...now.changes.map((c) => c.key)], briefText: text, ...ctx });
  EVIDENCE.verifyApproval(id, { pr: 1, reviews: [{ state: "APPROVED", user: { login: "test-reviewer" }, id: 1, html_url: "https://github.com/example/example/pull/1#review-1", submitted_at: new Date(Date.now() + 1000).toISOString() }], author: { commit: "0".repeat(40), name: "Test fixture", email: "fixture@example.com" } });
};
const approveStored = (hints = []) => {
  const { readdirSync, readFileSync: rf, existsSync: ex } = require_fs;
  for (const dir of ["content/research", "content/queue"]) {
    const root = join(process.env.GRADIFY_OUT, dir); if (!ex(root)) continue;
    for (const f of readdirSync(root, { recursive: true })) if (/(^|\/)[^/]+\.txt$/.test(f) && (dir === "content/research" || f.endsWith("research.out.txt"))) {
      const text = rf(join(root, f), "utf8"), id = text.match(/^TOPIC (\S+)/m)?.[1];
      approveText(text, hints.find((t) => t?.id === id) || null);
    }
  }
};
const approving = (ask, topic) => async (job, x) => { const r = await ask(job, x); if (job === "research") approveText(r, topic); return r; };
const runTopic = (topic, o = {}) => runTopicGated(topic, { ...o, ask: approving(o.ask, topic) });
const gated = async (path) => {
  const m = await import(path);
  const hintsOf = (a) => [a[0], ...(a[2]?.all || []), ...(a[1]?.all || [])].filter((t) => t && typeof t === "object" && t.id && t.reqs);
  const before = (f) => async (...a) => { approveStored(hintsOf(a)); const r = await f(...a); approveStored(hintsOf(a)); return r; };
  return { ...m, ...Object.fromEntries(["advance", "ingestFile", "ingestAll", "publish", "work"].filter((k) => typeof m[k] === "function").map((k) => [k, before(m[k])])) };
};
const { suspects } = await import("../scripts/content/signals.mjs");
const { prBody } = await import("../scripts/content/report.mjs");
const { topicsFor } = await import("../scripts/content/queue.mjs");
const { systemFor } = await import("../scripts/content/model.mjs");

const REQ = { id: "aqa-gcse-biology:4.1.1.1.b", ref: "4.1.1.1.b", asks: "prokaryotic cells", text: "Prokaryotic cells are much smaller than eukaryotic cells and have no nucleus; their genetic material is a single loop of DNA.", title: "Eukaryotes and prokaryotes", type: "concept", status: "official", hash: "h1" };
const TOPIC = { id: "biology/test-prokaryotes", subject: "biology", fw: "aqa-gcse-biology", section: "4.1.1.1", title: "Test prokaryotes", level: "GCSE", country: "uk", reqs: [REQ], reuse: [] };
const BRIEF = `TOPIC biology/test-prokaryotes | levels=GCSE | checked=2026-11-25
F: Prokaryotic cells have no nucleus | s1,s2 | conf=high
F: Eukaryotic cells are far larger than prokaryotes, whose genetic material sits in one DNA loop | s1,s3 | conf=high
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
SRC: Open biology text | secondary | 2026-11-25 | https://openstax.org/books/biology-2e
Q: Which kind of cell has no nucleus? | A prokaryotic cell
Q: What is a plasmid? | A small ring of DNA found in many bacteria
Q: Name a eukaryotic cell type. | An animal cell, a plant cell or a fungal cell
Q: About how long is a typical bacterium? | Between 1 and 10 micrometres
Q: About how wide is a typical animal cell? | Between 10 and 30 micrometres
Q: What does the cell membrane control? | What enters and leaves the cell
Q: What is the cytoplasm? | The jelly-like fluid where most cell reactions happen
Q: Do bacteria have mitochondria? | No: they have no membrane-bound organelles
Q: Where are ribosomes found in a bacterium? | Free in the cytoplasm
Q: What is a micrometre? | One millionth of a metre
Q: Is a bacterium a eukaryote? | No, it is a prokaryote
Q: What surrounds the bacterial cell membrane? | A cell wall
Q: What does a eukaryotic nucleus contain? | The cell's genetic material
Q: Give one difference between prokaryotes and eukaryotes. | Prokaryotes have no nucleus
Q: How many times larger is a 30 micrometre cell than a 3 micrometre bacterium? | Ten times larger
Q: Which organisms are prokaryotes? | Bacteria
Q: What is a flagellum used for? | Movement
Q: Why can antibiotics target bacteria? | Bacterial cells have structures human cells lack
D: bio-animal-cell
D: bio-active-transport-gut
D: bio-amino-acids`;

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

test("sub-requirements: a REQ may name a part, but only a lesson naming the whole requirement covers it", async () => {
  const { parentOf } = S, known = new Set([REQ.id]);
  assert.equal(parentOf(`${REQ.id}.ii`, known), REQ.id);
  assert.equal(parentOf(`${REQ.id}.zz`, known), null);
  assert.equal(parentOf("other:1.ii", known), null);
  const part = LESSON("3 × 4 = 12").replace(`REQ: ${REQ.id} @1,2`, `REQ: ${REQ.id}.i @1\nREQ: ${REQ.id}.ii @2`);
  const g = await G.runGates(part, { reqs: [REQ], allowed: known });
  assert.ok(g.ok, JSON.stringify(g.failed?.issues));
  const topic = { ...TOPIC, id: "biology/test-parts", title: "Test parts" };
  const r = await runTopic(topic, { ask: async (job) => (job === "research" ? BRIEF.replace("test-prokaryotes", "test-parts") : `${part}\nEND`), askMany: async (job, items) => new Map(items.map((it) => [it.key, `REV ${it.key} OK`])) });
  // the index doesn't list a statement's parts, so two parts named don't show the rest is taught (rule H)
  assert.notEqual(r.status, "filed"); assert.deepEqual(r.uncovered, [REQ.id], "parts alone leave the requirement to write");
  // naming the whole requirement (parts may be named too) covers it
  const whole = LESSON("3 × 4 = 12").replace(`REQ: ${REQ.id} @1,2`, `REQ: ${REQ.id} @1,2\nREQ: ${REQ.id}.ii @2`), t2 = { ...TOPIC, id: "biology/test-parts-whole", title: "Test parts whole" };
  const r2 = await runTopic(t2, { ask: async (job) => (job === "research" ? BRIEF.replace("test-prokaryotes", "test-parts-whole") : `${whole}\nEND`), askMany: async (job, items) => new Map(items.map((it) => [it.key, `REV ${it.key} OK`])) });
  assert.equal(r2.status, "filed"); assert.deepEqual(r2.uncovered, []);
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
  assert.match(researchRequest(TOPIC), /^ALLOW ncbi-bookshelf \| .* \| licence=facts$/m);
  // OpenStax is suspended for new research by the owner's interim policy (scripts/content/source-policy.mjs): it isn't
  // offered, though the registry row is unchanged and existing briefs citing it still parse
  assert.doesNotMatch(researchRequest(TOPIC), /^ALLOW openstax-/m); assert.ok(SOURCES.some((x) => x.id === "openstax-biology-2e"));
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
  const { publish } = await gated("../scripts/content/publish.mjs");
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
  const { advance, BRIEFS, addReqLine } = await gated("../scripts/content/agent.mjs");
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
  const { parseMapLine, mapCandidates } = await gated("../scripts/content/agent.mjs");
  const { writeFileSync, mkdirSync } = await import("node:fs");
  // these tests start from the matcher's proposals, whatever has been decided in the real store since: the store is
  // copied into this run's output with every AI decision put back to its candidates (a person's check is kept)
  const { storePath } = await import("../scripts/content/mapstore.mjs");
  const { loadMap } = await import("../scripts/curriculum/engine.mjs");
  const real = loadMap("aqa-gcse-biology"), fresh = { ...real, links: Object.fromEntries(Object.entries(real.links).map(([ref, l]) => [ref, ["ai-confirmed", "rejected"].includes(l.status) ? { status: "proposed", confidence: l.confidence, lessons: l.candidates || [], ...(l.proposedBy ? { proposedBy: l.proposedBy } : {}) } : l])) };
  mkdirSync(new URL("./", storePath("aqa-gcse-biology")), { recursive: true }); writeFileSync(storePath("aqa-gcse-biology"), JSON.stringify(fresh));
  assert.deepEqual(parseMapLine("MAP aqa-gcse-biology:4.1.1.2.a NO lesson never relates structures to functions"), { reqId: "aqa-gcse-biology:4.1.1.2.a", lesson: null, verdict: "NO", rest: "lesson never relates structures to functions" });
  assert.deepEqual(parseMapLine("MAP aqa-gcse-biology:4.1.1.2.b u02-04 YES @1,2"), { reqId: "aqa-gcse-biology:4.1.1.2.b", lesson: "u02-04", verdict: "YES", rest: "@1,2" });
  assert.equal(parseMapLine("MAP aqa-gcse-biology:4.1.1.2.b u02-04 NO too shallow").verdict, "NO");
  assert.equal(parseMapLine("END"), null);
  const [a, b] = mapCandidates("aqa-gcse-biology").map((c) => c.ref), inQueue = (ref) => topicsFor("aqa-gcse-biology").some((t) => t.reqs.some((r) => r.ref === ref));
  assert.ok(inQueue(a) && inQueue(b), "an unconfirmed strong match is not coverage: it's written");
  mkdirSync(join(process.env.GRADIFY_OUT, "content/mapping"), { recursive: true });
  writeFileSync(join(process.env.GRADIFY_OUT, "content/mapping/aqa-gcse-biology.json"), JSON.stringify({ confirmed: { [a]: { ok: false, why: "not taught" }, [b]: { ok: true, lesson: "u02-04", objectives: [1] } } }));
  assert.ok(inQueue(a), "a rejected match is written"); assert.ok(inQueue(b), "an AI's yes is not coverage: still written until a person confirms it");
  // only a person's confirmation, for that statement, that a lesson teaches all of it stops the writing
  const { loadStore, saveStore, confirmedTaught } = await import("../scripts/content/mapstore.mjs");
  const { loadIndex } = await import("../scripts/curriculum/engine.mjs");
  const hashOf = (ref) => loadIndex("aqa-gcse-biology").statements.find((x) => x.ref === ref).hash, S0 = loadStore("aqa-gcse-biology");
  const person = (coverage) => ({ status: "verified", hash: hashOf(b), reviewer: "A Reviewer", reviewedOn: "2026-11-26", lessons: [{ id: "u02-04", coverage }], note: "taught in section 2" });
  S0.links[b] = person("partial"); saveStore("aqa-gcse-biology", S0);
  assert.ok(inQueue(b) && !confirmedTaught(S0, b, hashOf(b)), "a person's 'partial' is still written");
  S0.links[b] = person("full"); saveStore("aqa-gcse-biology", S0);
  assert.ok(!inQueue(b) && confirmedTaught(S0, b, hashOf(b)), "a person's 'full' is taught: not written");
  assert.ok(!confirmedTaught(S0, b, "a-changed-statement"), "a confirmation holds only for the text it was made on");
  assert.ok(!confirmedTaught(S0, a, hashOf(a)), "confirming one statement never confirms another");
  assert.ok(!mapCandidates("aqa-gcse-biology").some((c) => c.ref === a || c.ref === b), "decided matches aren't asked again");
});

test("review fixes on #208: citations, stale inputs, outdated coverage, timeouts, learners", async () => {
  const { checkBrief } = await import("../scripts/content/loop.mjs");
  const { advance } = await gated("../scripts/content/agent.mjs");
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
  const { publish } = await gated("../scripts/content/publish.mjs");
  const { writeFileSync, mkdirSync } = await import("node:fs");
  const ledPath = join(process.env.GRADIFY_OUT, "content/ledger/biology.json"), led = JSON.parse(readFileSync(ledPath, "utf8"));
  const text = LESSON("3 × 4 = 12").replace("## Prokaryotes up close", "## prokaryotes UP CLOSE").replace("LV: GCSE", "TIER: Expert-reviewed\nLV: GCSE");
  mkdirSync(join(process.env.GRADIFY_OUT, "content/drafts/biology/aqa-gcse-biology"), { recursive: true });
  writeFileSync(join(process.env.GRADIFY_OUT, "content/drafts/biology/aqa-gcse-biology/test-case.txt"), `# draft\n\n${text}\n`);
  const { fp } = await import("../scripts/content/lib.mjs");
  // a topic filed by hand still needs a stored brief for its evidence approval (the gated publish approves it)
  mkdirSync(join(process.env.GRADIFY_OUT, "content/research/biology"), { recursive: true });
  writeFileSync(join(process.env.GRADIFY_OUT, "content/research/biology/test-case.txt"), BRIEF.replace("test-prokaryotes", "test-case"));
  led.topics["biology/test-case"] = { fw: "aqa-gcse-biology", file: "content/drafts/biology/aqa-gcse-biology/test-case.txt", title: "Test case", lessons: [{ title: "prokaryotes UP CLOSE", tier: "ai-verified", hash: fp(text), reqs: [REQ.id] }], status: "filed" };
  writeFileSync(ledPath, JSON.stringify(led));
  const r = await publish("biology");
  assert.ok(r.skipped.some((x) => /prokaryotes UP CLOSE .*already published a lesson with this title/.test(x)), "a case-only variant gets no new id");
  const notes = readFileSync(join(process.env.GRADIFY_OUT, "kit/courses/biology/notes/u15.js"), "utf8");
  for (const lesson of notes.split(/\n(?=## )/).filter((x) => x.startsWith("## "))) assert.equal((lesson.match(/^TIER:/gm) || []).length, 1);
});

test("review fixes after #208 merged: mapping replies, publish wiring and duplicates, verified links, spend", async () => {
  const { writeFileSync, mkdirSync, cpSync } = await import("node:fs");
  const { applyMapping, mapCandidates } = await gated("../scripts/content/agent.mjs");
  const { loadStore } = await import("../scripts/content/mapstore.mjs");
  const { loadIndex, applyReview } = await import("../scripts/curriculum/engine.mjs");
  const fw = "aqa-gcse-biology", hash = new Map(loadIndex(fw).statements.map((x) => [x.ref, x.hash]));
  // a mapping reply is stored only against the statement text it was asked about
  const [, , c, d] = mapCandidates(fw).map((x) => x.ref), dir = join(process.env.GRADIFY_OUT, `content/queue/biology/_map-${fw}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "map.req.txt"), `MAPREQ ${fw}:${c} #${hash.get(c)} | x\nMAPREQ ${fw}:${d} #0000stale0000000 | x\nEND\n`);
  writeFileSync(join(dir, "map.out.txt"), `MAP ${fw}:${c} NO not taught\nMAP ${fw}:${d} NO not taught\nEND\n`);
  const res = await applyMapping("biology"), M = loadStore(fw);
  assert.equal(M.links[c]?.status, "rejected"); assert.equal(M.links[c]?.hash, hash.get(c), "a current reply is recorded with its hash");
  assert.equal(M.links[d]?.status, "proposed"); assert.ok(res.some((x) => x.includes(d) && /dropped/.test(x)), "a reply about changed text is dropped and asked again");
  assert.ok(mapCandidates(fw).some((x) => x.ref === d));
  // a course file that imports published.js without its hook is refused, not accepted as wired
  const { installHooks, publish } = await gated("../scripts/content/publish.mjs");
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
  mkdirSync(join(process.env.GRADIFY_OUT, "content/research/biology"), { recursive: true });
  writeFileSync(join(process.env.GRADIFY_OUT, "content/research/biology/test-dupe.txt"), BRIEF.replace("test-prokaryotes", "test-dupe"));
  led.topics["biology/test-dupe"] = { fw: "aqa-gcse-biology", file: "content/drafts/biology/aqa-gcse-biology/test-dupe.txt", title: "Test dupe", status: "filed", lessons: [{ title: "Cell division", tier: "ai-verified", hash: fp(one), reqs: [REQ.id] }, { title: "Cell-division", tier: "ai-verified", hash: fp(two), reqs: [REQ.id] }] };
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
  // mapped: only statements a person confirmed are fully taught; AI checks never count
  const { loadStore, confirmedTaught } = await import("../scripts/content/mapstore.mjs");
  const { loadIndex } = await import("../scripts/curriculum/engine.mjs");
  const S1 = loadStore("aqa-gcse-biology"), byPerson = loadIndex("aqa-gcse-biology").statements.filter((x) => confirmedTaught(S1, x.ref, x.hash)).length;
  assert.ok(byPerson >= 1, "the store has a person's confirmation (set by the mapping test)");
  assert.equal(c.mapped, byPerson, "only a person's confirmation counts as mapped");
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
  const { advance } = await gated("../scripts/content/agent.mjs");
  const T = { ...TOPIC, id: "biology/test-stale-request", title: "Test stale request" }, dir = join(process.env.GRADIFY_OUT, "content/queue/biology/test-stale-request");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "research.req.txt"), `RESEARCH ${T.id} | levels=GCSE\nEND\n`);
  const r = await advance(T);
  assert.equal(r.actions[0].kind, "research");
  assert.match(readFileSync(join(dir, "research.req.txt"), "utf8"), /^ALLOW ncbi-bookshelf /m);
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

test("a research request carries a requirement's whole text, not the 400-character asks", async () => {
  const { researchRequest } = await import("../scripts/content/loop.mjs");
  const long = "Gas exchange surfaces have features that help them work. ".repeat(10).trim();
  const t = { ...TOPIC, reqs: [{ ...REQ, asks: long.slice(0, 400), text: long }] };
  assert.ok(researchRequest(t).includes(long));
});

test("reused lessons are named by their course titles, not bare ids", async () => {
  const { lessonTitles } = await import("../scripts/content/queue.mjs");
  const t = lessonTitles("biology");
  assert.equal(t.get("u02-26"), "Stem cells"); assert.equal(t.get("u02-20"), "Diffusion");
  const reuse = topicsFor("aqa-gcse-biology").flatMap((x) => x.reuse);
  assert.ok(reuse.length && reuse.every((r) => !/^u\d+-\d+$/.test(r.title)), JSON.stringify(reuse.slice(0, 3)));
});

test("a requirement's asks is its whole statement, so write and review requests aren't cut off", () => {
  const r = topicsFor("aqa-gcse-biology").flatMap((t) => t.reqs).find((x) => x.text && x.text.length > 400);
  if (!r) return; // specification text not imported here
  assert.equal(r.asks, r.text);
});

test("a graph diagram without an id still renders", async () => {
  const { graph } = await import("../kit/diagrams/renderers.js");
  const { readFileSync: rf } = await import("node:fs");
  const { id, ...spec } = JSON.parse(rf(new URL("../kit/diagrams/specs/bio-accuracy-precision.json", import.meta.url), "utf8"));
  assert.ok(id); const out = graph(spec, 680, 380);
  assert.match(out, /clipPath id="vx\d+680"/);
});

test("filing: a practical elsewhere in the topic doesn't make a lesson high-risk; one the lesson teaches does", async () => {
  // a minimal two-requirement topic: the lesson teaches only the concept, and a required practical sits beside it
  const PRAC = { ...REQ, id: "aqa-gcse-biology:4.1.1.1.c", ref: "4.1.1.1.c", asks: "a required practical", text: "Use a light microscope to look at cells.", type: "prac", hash: "h2" };
  const run = async (name, lesson) => {
    const topic = { ...TOPIC, id: `biology/${name}`, title: name, reqs: [REQ, PRAC] };
    // the brief covers both requirements, as the evidence check asks
    const ask = async (job) => (job === "research" ? BRIEF.replace("test-prokaryotes", name).replace("\nDEF:", "\nF: Cells are viewed with a light microscope in the practical | s1,s2 | conf=high\nDEF:") : `${lesson}\nEND`);
    return runTopic(topic, { ask, askMany: async (job, items) => new Map(items.map((it) => [it.key, `REV ${it.key} OK`])) });
  };
  const own = await run("test-own-reqs", LESSON("3 × 4 = 12"));
  assert.deepEqual(own.lessons[0].reqs, [REQ.id]);
  assert.equal(own.lessons[0].tier, "ai-verified"); assert.ok(!own.lessons[0].highRisk);
  // naming the practical, or one part of it, makes the lesson high-risk
  const part = await run("test-prac-part", LESSON("3 × 4 = 12").replace(`REQ: ${REQ.id} @1,2`, `REQ: ${REQ.id} @1,2\nREQ: ${PRAC.id}.ii @1`));
  assert.equal(part.lessons[0].tier, "expert-required"); assert.ok(part.lessons[0].highRisk);
});

test("source conflicts: an explained, low-stakes, cited conflict is AI-checked; anything less goes to an expert", async () => {
  const CONFL = (extra = " | stakes=low", what = "bacterium lengths differ by source (1 to 10 or 0.5 to 5 micrometres)") => `CONFLICT: ${what} | s1,s2${extra}`;
  const withSrc = LESSON("3 × 4 = 12").replace(/\nSRC:[^\n]*/, (m) => `${m}\nSRC: Cell structure | secondary | 2026-11-25 | https://www.bbc.co.uk/bitesize/x`);
  const bang = withSrc.split("\n").findIndex((l) => l.startsWith("!:")) + 1;
  const run = async (name, { conflict = CONFL(), verdict = `C1=L${bang}`, lesson = withSrc } = {}) => {
    const topic = { ...TOPIC, id: `biology/${name}`, title: name };
    const brief = BRIEF.replace("test-prokaryotes", name).replace("\nSRC: s1", `\n${conflict}\nSRC: s1`);
    const ask = async (job) => (job === "research" ? brief : `${lesson}\nEND`);
    let req = "";
    const r = await runTopic(topic, { ask, askMany: async (job, items) => new Map(items.map((it) => { req = it.user; return [it.key, `REV ${it.key} OK ${verdict}`]; })) });
    return { l: r.lessons[0], req };
  };
  const ok = await run("test-conf-ok");
  assert.equal(ok.l.tier, "ai-verified"); assert.deepEqual(ok.l.conflictsExplained, [`C1@L${bang}`]); assert.ok(!ok.l.conflict);
  assert.match(ok.req, /^CONF C1 \| bacterium lengths differ .* \| src=s1,s2 \| stakes=low$/m, "the reviewer sees the conflicts numbered");
  assert.equal((await run("test-conf-none", { verdict: "C1=none" })).l.tier, "ai-verified", "a conflict the lesson doesn't rely on doesn't need an expert");
  const cases = {
    "test-conf-noverdict": [{ verdict: "" }, /no reviewer verdict/],
    "test-conf-open": [{ verdict: "C1=open" }, /left it open/],
    "test-conf-unmarked": [{ conflict: CONFL("") }, /high stakes/],
    "test-conf-high": [{ conflict: CONFL(" | stakes=high") }, /high stakes/],
    "test-conf-keyword": [{ conflict: CONFL(" | stakes=low", "the safe dose differs by source") }, /high-risk keyword \(dose\)/],
    "test-conf-notbang": [{ verdict: "C1=L2" }, /L2 isn't a !: line/],
    "test-conf-onecite": [{ lesson: LESSON("3 × 4 = 12") }, /cites 1 of its 2 sources/],
  };
  for (const [name, [opts, why]] of Object.entries(cases)) {
    const { l } = await run(name, opts);
    assert.equal(l.tier, "expert-required", name); assert.ok(l.conflict, name); assert.match(l.conflictsOpen.join(";"), why, name);
  }
});

test("background lines: BG facts are parsed and sourced like F lines", () => {
  const b = S.parseBrief(BRIEF.replace("\nDEF:", "\nBG: Cells release energy from glucose in respiration | s1,s2 | conf=high\nDEF:"));
  assert.deepEqual(b.problems, []); assert.equal(b.background.length, 1); assert.equal(b.background[0][0], "Cells release energy from glucose in respiration");
  assert.match(S.parseBrief(BRIEF.replace("\nDEF:", "\nBG: Meiosis makes gametes | s9\nDEF:")).problems.join(";"), /background line cites an unknown source/);
  assert.match(S.parseBrief(BRIEF.replace("\nDEF:", "\nBG: Meiosis makes gametes\nDEF:")).problems.join(";"), /background line cites no source/);
  // verdict conflict tokens are read only from an OK
  assert.deepEqual(S.parseVerdicts("REV new#1 OK C1=L23 C2=none c3=OPEN")[0].conf, { 1: "L23", 2: "none", 3: "open" });
  assert.deepEqual(S.parseVerdicts("REV new#1 FAIL FACT L3 C1=L23 wrong")[0].conf, {});
});

test("reused lessons are named by their locked ids, not their position in the notes file, in every course", async () => {
  const { lessonTitles } = await import("../scripts/content/queue.mjs");
  const { readdirSync, existsSync } = await import("node:fs");
  const key = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const wrong = [];
  for (const c of readdirSync(new URL("../kit/courses/", import.meta.url))) {
    if (!existsSync(new URL(`../kit/courses/${c}/ids.js`, import.meta.url))) continue;
    const { IDS } = await import(`../kit/courses/${c}/ids.js`);
    for (const [id, title] of lessonTitles(c)) if (key(IDS[id]) !== key(title)) wrong.push(`${c} ${id}: "${title}" is locked as "${IDS[id]}"`);
  }
  // borrowed units (teaching, professional, gcse…) start after their retired ids, so position names the wrong lesson
  assert.deepEqual(wrong.slice(0, 5), []);
  assert.equal(lessonTitles("teaching").size > 0, true);
});

test("the mapping store: one status per statement, a person's check is never replaced, stale decisions are undecided, legacy decisions fold in once", async () => {
  const { decide, decisionOf, candidatesOf, consolidate, loadStore, legacyPath, storePath } = await import("../scripts/content/mapstore.mjs");
  const { mergeProposals } = await import("../scripts/curriculum/engine.mjs");
  const { existsSync, writeFileSync, mkdirSync } = await import("node:fs");
  const m = { spec: "t", links: { A: { status: "proposed", confidence: "strong", lessons: [{ id: "u1", coverage: "partial" }] }, V: { status: "verified", reviewer: "A. Teacher", reviewedOn: "2026-11-30", hash: "hv", lessons: [] } } };
  decide(m, "A", { ok: true, lesson: "u1", objectives: [1, 2], hash: "h1", by: "agent:haiku", on: "2026-11-25" });
  assert.equal(m.links.A.status, "ai-confirmed"); assert.deepEqual(m.links.A.lessons, [{ id: "u1", coverage: "full", objectives: [1, 2] }]);
  assert.deepEqual(candidatesOf(m.links.A), [{ id: "u1", coverage: "partial" }], "the matcher's candidates are kept as evidence");
  decide(m, "V", { ok: false, why: "x", hash: "hv", by: "agent:haiku", on: "2026-11-25" });
  assert.equal(m.links.V.status, "verified", "an AI decision never replaces a person's check");
  assert.ok(decisionOf(m, "A", "h1")); assert.equal(decisionOf(m, "A", "changed"), null, "a decision on older text is no decision");
  const merged = mergeProposals(m, [{ ref: "A", candidates: [{ id: "u7", band: "strong", score: 9, share: 1, matched: [] }] }]);
  assert.equal(merged.links.A.status, "ai-confirmed", "rerunning the matcher keeps decisions");
  // a legacy content/mapping decision is folded into the store, and the legacy file goes once the store is saved
  const fw = "aqa-gcse-biology", ref = Object.entries(loadStore(fw).links).find(([, l]) => l.status === "proposed" && l.lessons.length)[0];
  mkdirSync(new URL("./", legacyPath(fw)), { recursive: true });
  writeFileSync(legacyPath(fw), JSON.stringify({ confirmed: { [ref]: { ok: false, why: "osmosis practical not taught", by: "agent:haiku", on: "2026-11-25" } } }));
  const r = consolidate(fw);
  assert.ok(r.folded); assert.ok(!existsSync(legacyPath(fw))); assert.ok(existsSync(storePath(fw)));
  assert.deepEqual(loadStore(fw).links[ref].missing, ["osmosis practical not taught"]);
  assert.equal(consolidate(fw).folded, false, "running it again changes nothing");
});

test("production standard: 3+ distinct diagrams per lesson to file, all drawn to publish; 20+ distinct flashcards per topic", async () => {
  const { diagramsOf, flashcardsOf, standardsGate, topicFlashcards, drawnEnough } = await import("../scripts/content/gates.mjs");
  const base = LESSON("3 × 4 = 12");
  assert.deepEqual([diagramsOf(base).drawn, diagramsOf(base).total], [3, 3]); assert.ok(drawnEnough(base));
  const twoAndSpec = base.replace("\nD: bio-amino-acids", "\nDNEED: A prokaryotic and a eukaryotic cell side by side, to scale");
  assert.ok(standardsGate(null, twoAndSpec).ok, "a DNEED specification counts towards filing"); assert.ok(!drawnEnough(twoAndSpec), "but not towards publishing");
  const repeated = base.replace("\nD: bio-amino-acids", "\nD: bio-animal-cell");
  assert.equal(diagramsOf(repeated).total, 2, "the same diagram twice counts once"); assert.match(standardsGate(null, repeated).issues[0].note, /2 distinct diagrams; every lesson needs at least 3/);
  assert.equal(flashcardsOf(base).length, 20);
  assert.equal(flashcardsOf(`${base}\nQ: Which kind of cell has no nucleus?  | Prokaryotic`).length, 20, "a repeated question counts once");
  assert.deepEqual(topicFlashcards([base.replace(/^Q: About.*\n/gm, "")]).ok, false);
  // a topic short of flashcards files nothing, and says what's missing
  const thin = base.split("\n").filter((l) => !/^Q: (About|What is a|Is a|Do bacteria)/.test(l)).join("\n");
  const topic = { ...TOPIC, id: "biology/test-thin", title: "Test thin" };
  const r = await runTopic(topic, { ask: async (job) => (job === "research" ? BRIEF.replace("test-prokaryotes", "test-thin") : `${thin}\nEND`), askMany: async (job, items) => new Map(items.map((it) => [it.key, `REV ${it.key} OK`])) });
  assert.equal(r.lessons.length, 0); assert.equal(r.failures[0].gate, "standards"); assert.match(r.failures[0].issues[0].note, /distinct flashcards across the topic; it needs at least 20/);
});

test("diagram references are file names, not teaching text: D: bio-amino-acids doesn't raise the 'acid' keyword", async () => {
  const { riskKeywords } = await import("../scripts/content/loop.mjs");
  assert.deepEqual(riskKeywords("P: Proteins are chains.\nD: bio-amino-acids\nDIA: graph | {\"title\":\"acid strength\"}"), []);
  assert.deepEqual(riskKeywords("P: Hydrochloric acid is corrosive."), ["acid"]);
});

test("the content factory: a template carries everything an external model needs; returned Markdown is checked, installed once, or rejected with a report", async () => {
  const { writeTemplate, researchTemplate, readSubmission, ingestFile, ingestAll } = await gated("../scripts/content/factory.mjs");
  const { currentBrief } = await import("../scripts/content/loop.mjs");
  const { readFileSync, existsSync, writeFileSync, mkdirSync } = await import("node:fs");
  const topic = { ...TOPIC, id: "biology/test-factory", title: "Test factory" };
  // no brief yet: a research template; the returned brief is checked and stored
  assert.match(researchTemplate(topic), /^RESEARCH biology\/test-factory \| levels=GCSE/m);
  const briefMd = "Here is the brief:\n\n```\n" + BRIEF.replace("test-prokaryotes", "test-factory") + "\n```\n";
  const b = await ingestFile("test-factory.brief.md", briefMd, { all: [topic] });
  assert.ok(b.ok, b.report); assert.ok(currentBrief(topic), "the brief is stored, stamped for its inputs");
  assert.match((await ingestFile("x.brief.md", BRIEF.replace("test-prokaryotes", "test-factory").replace(/^SRC: s3.*$/m, ""), { all: [topic] })).report, /Rejected:.*problem/);
  // the write template: instructions, format, standard, examples, minimums and the packet, in one file
  const t = writeTemplate(topic, currentBrief(topic));
  for (const re of [/at least 20 distinct `Q:` flashcards/, /at least 3 distinct diagrams/, /^PKT aqa-gcse-biology\/4\.1\.1\.1/m, /^# Writer prompt/m, /^# Curriculum content standard/m, /^### Example: gcse--/m, /content\/inbox\/test-factory\.md/]) assert.match(t, re);
  // a chat reply with a preamble and a fence is read as its unit file
  assert.equal(readSubmission("Sure! Here you go:\n```markdown\n## A\nS: x\n```\nThanks").text, "## A\nS: x");
  assert.equal(readSubmission("just chat").kind, "unknown");
  // short of the topic's flashcard minimum: rejected with the reason, nothing filed
  const thin = LESSON("3 × 4 = 12").split("\n").filter((l) => !/^Q: (About|What is a|Is a|Do bacteria)/.test(l)).join("\n");
  const r1 = await ingestFile("test-factory.md", `${thin}\nEND`, { all: [topic] });
  assert.equal(r1.ok, false); assert.match(r1.report, /failed `standards`/); assert.match(r1.report, /it needs at least 20/); assert.equal(r1.filed.length, 0);
  // a valid file is installed (gates only: claims no review), and resubmitting it doesn't duplicate the lesson
  const r2 = await ingestFile("test-factory.md", `${LESSON("3 × 4 = 12")}\nEND`, { all: [topic] });
  assert.ok(r2.ok, r2.report); assert.equal(r2.filed[0].tier, "gates-passed"); assert.match(r2.report, /can't be published until reviewed/);
  await ingestFile("test-factory.md", `${LESSON("3 × 4 = 12")}\nEND`, { all: [topic] });
  const draft = readFileSync(join(process.env.GRADIFY_OUT, "content/drafts/biology/aqa-gcse-biology/test-factory.txt"), "utf8");
  assert.equal(draft.match(/^## Prokaryotes up close$/gm).length, 1, "resubmitting replaces by title");
  // a lesson for no queued requirement, and a file with no lessons, are rejected
  assert.match((await ingestFile("y.md", LESSON().replace(/^REQ: .*$/m, "REQ: aqa-gcse-biology:9.9.9"), { all: [topic] })).report, /No `REQ:` line names a queued requirement/);
  // the inbox: each file moves to done/ or rejected/ with its report beside it
  const inbox = join(process.env.GRADIFY_OUT, "content/inbox"); mkdirSync(inbox, { recursive: true });
  writeFileSync(join(inbox, "nonsense.md"), "hello");
  const all = await ingestAll([], { all: [topic] });
  assert.equal(all[0].ok, false); assert.ok(existsSync(join(inbox, "rejected/nonsense.md")) && existsSync(join(inbox, "rejected/nonsense.report.md")));
});

test("the library's standard is measured per course and per lesson, without changing anything", async () => {
  const { measure, table } = await import("../scripts/content/standards.mjs");
  const m = await measure({ courses: ["biology"] });
  assert.equal(m.rows[0].lessons, 391); assert.equal(m.lessons.length, 391);
  assert.ok(m.rows[0].topicsMet <= m.rows[0].topics && m.rows[0].lessonsMet <= m.rows[0].lessons);
  assert.match(table(m), /^\| Course \| Lessons \| Flashcards/);
});

test("each subject's template folder starts with the handover instructions and its templates in order", async () => {
  const { startFile } = await gated("../scripts/content/factory.mjs");
  const f = startFile("biology", [{ subject: "biology", topic: "biology/a", title: "Cells", section: "4.1.1.1", reqs: 3, kind: "research", file: "/x/cells.research.md", save: "cells.brief.md" }, { subject: "chemistry", topic: "c", title: "Atoms", section: "5.1", reqs: 1, kind: "write", file: "/x/atoms.write.md", save: "atoms.md" }]);
  assert.match(f, /^# Gradify handover: instructions for the lesson-writing model/);
  assert.match(f, /At least 20 distinct flashcards across the topic/); assert.match(f, /At least 3 distinct diagrams in every lesson/);
  assert.match(f, /\| 1 \| Cells \(4\.1\.1\.1, 3 requirements\) \| `cells\.research\.md` \| `content\/inbox\/cells\.brief\.md` \|/);
  assert.doesNotMatch(f, /Atoms/, "only this subject's templates");
});

test("in-session review of ingested lessons: a pass takes its tier, a fail is reported for the writer, nothing is rewritten", async () => {
  const { ingestFile } = await gated("../scripts/content/factory.mjs");
  const { reviewStep, awaiting } = await import("../scripts/content/review.mjs");
  const { readFileSync, writeFileSync, existsSync } = await import("node:fs");
  const { CONFIG } = await import("../scripts/content/lib.mjs");
  assert.equal(CONFIG.writer, "external", "agent mode doesn't write lessons: an external model does");
  const act = (kind, topic, files) => ({ kind, topic, ...files });
  const setup = async (name) => {
    const topic = { ...TOPIC, id: `biology/${name}`, title: name };
    assert.ok((await ingestFile(`${name}.brief.md`, BRIEF.replace("test-prokaryotes", name), { all: [topic] })).ok);
    const r = await ingestFile(`${name}.md`, `${LESSON("3 × 4 = 12")}\nEND`, { all: [topic] }); assert.ok(r.ok, r.report);
    return topic;
  };
  const reply = (a, text) => { const [, o] = a.pairs[0]; writeFileSync(join(process.env.GRADIFY_OUT, o), text); };
  const led = () => JSON.parse(readFileSync(join(process.env.GRADIFY_OUT, "content/ledger/biology.json"), "utf8"));
  // a pass: the lesson takes its tier by the engine's rules, and its text is untouched
  await setup("test-rev-ok");
  let s = reviewStep("biology", { action: act }); const a = s.actions.find((x) => x.topic === "biology/test-rev-ok");
  assert.equal(a.kind, "review"); assert.match(readFileSync(join(process.env.GRADIFY_OUT, a.pairs[0][0]), "utf8"), /^LESSON rev-prokaryotes-up-close/);
  reply(a, "REV rev-prokaryotes-up-close OK");
  const draft = join(process.env.GRADIFY_OUT, "content/drafts/biology/aqa-gcse-biology/test-rev-ok.txt"), before = readFileSync(draft, "utf8");
  s = reviewStep("biology", { action: act });
  assert.deepEqual(s.reviewed.find((x) => x.topic === "biology/test-rev-ok"), { topic: "biology/test-rev-ok", title: "Prokaryotes up close", tier: "ai-verified" });
  const l = led().topics["biology/test-rev-ok"].lessons[0];
  assert.equal(l.tier, "ai-verified"); assert.match(l.reviewed.by, /^agent:/); assert.equal(readFileSync(draft, "utf8"), before, "the review rewrote nothing");
  assert.ok(!awaiting("biology").some((w) => w.id === "biology/test-rev-ok"), "a reviewed lesson isn't asked again");
  // a fail: the lesson stays unpublishable, the issue is reported with the line quoted, and the same text isn't asked again
  await setup("test-rev-bad");
  const b = reviewStep("biology", { action: act }).actions.find((x) => x.topic === "biology/test-rev-bad");
  reply(b, "REV rev-prokaryotes-up-close FAIL FACT L11 animal cell size range not in the brief");
  s = reviewStep("biology", { action: act });
  assert.equal(s.failed[0].title, "Prokaryotes up close");
  const lb = led().topics["biology/test-rev-bad"].lessons[0];
  assert.equal(lb.tier, "gates-passed"); assert.equal(lb.reviewFailed.issues[0].code, "FACT");
  const report = readFileSync(join(process.env.GRADIFY_OUT, "content/inbox/rejected/test-rev-bad.review.md"), "utf8");
  assert.match(report, /\*\*FACT\*\* L11: animal cell size range not in the brief\n  > P: Most bacteria are 1 to 10 micrometres long/);
  assert.ok(!reviewStep("biology", { action: act }).actions.some((x) => x.topic === "biology/test-rev-bad"), "the same text isn't reviewed twice");
  // the writer's corrected file is new text, so it's reviewed afresh
  const topic = { ...TOPIC, id: "biology/test-rev-bad", title: "test-rev-bad" };
  assert.ok((await ingestFile("test-rev-bad.md", `${LESSON("3 × 4 = 12").replace("10 to 30 micrometres across, so", "10 to 30 micrometres across, so")}\nP: Bacteria are prokaryotes.\nEND`, { all: [topic] })).ok);
  assert.ok(reviewStep("biology", { action: act }).actions.some((x) => x.topic === "biology/test-rev-bad"));
  assert.ok(existsSync(join(process.env.GRADIFY_OUT, "content/queue/biology/_review/test-rev-bad")));
});

test("quality checks: sources trace to the brief, diagrams exist in the library, the brief covers each requirement, the reviewer sees each diagram", async () => {
  const { sourcesGate, standardsGate } = await import("../scripts/content/gates.mjs");
  const { checkBrief, reviewRequest } = await import("../scripts/content/loop.mjs");
  const brief = S.parseBrief(BRIEF), urls = brief.sources.map((x) => x.url), L = (t) => parseNotes(t)[0];
  const base = LESSON("3 × 4 = 12");
  assert.ok(sourcesGate(L(base), base, urls).ok, "the lesson cites the brief's OpenStax page");
  const other = base.replace("https://openstax.org/books/biology-2e", "https://example.com/biology");
  assert.match(sourcesGate(L(other), other, urls).issues[0].note, /example\.com\/biology isn't a source in the research brief/);
  const bare = base.replace(" | https://openstax.org/books/biology-2e", "");
  assert.match(sourcesGate(L(bare), bare, urls).issues[0].note, /has no link: cite a source from the research brief/);
  const deeper = base.replace("https://openstax.org/books/biology-2e", "https://openstax.org/books/biology-2e/pages/4-2");
  assert.ok(sourcesGate(L(deeper), deeper, urls).ok, "a page within a brief source counts");
  const ghost = base.replace("D: bio-amino-acids", "D: bio-made-up-diagram");
  assert.match(standardsGate(L(ghost), ghost).issues.map((i) => i.note).join(" "), /D: bio-made-up-diagram isn't in the diagram library/);
  // the brief must cover what each requirement names, or it can't support a lesson on it
  const thin = BRIEF.replace(/^F: Eukaryotic.*\n/m, "");
  assert.match(checkBrief(thin, TOPIC).problems.join(";"), /doesn't support aqa-gcse-biology:4\.1\.1\.1\.b: the brief never covers .*eukaryot/);
  assert.deepEqual(checkBrief(BRIEF, TOPIC).problems.filter((p) => /doesn't support/.test(p)), []);
  // the reviewer is told what each library diagram shows, and can fail flashcards, diagrams and teaching quality
  assert.match(reviewRequest({ key: "k", text: base }, TOPIC, BRIEF), /^DIAG bio-animal-cell \| An animal cell \| .* \| alt: /m);
  const v = S.parseVerdicts("REV k FAIL CARD L30 trivial card; DIAG L40 decorative; TEACH L8 three concepts in one section")[0];
  assert.deepEqual(v.issues.map((i) => i.code), ["CARD", "DIAG", "TEACH"]);
});

test("a filed topic that gains a requirement writes only the new one, and adds it to the draft", async () => {
  const { nextTopics, reqHash } = await import("../scripts/content/queue.mjs");
  const { loadLedger, saveLedger } = await import("../scripts/content/lib.mjs");
  const t = topicsFor("aqa-gcse-biology").find((x) => x.id === "biology/chromosomes");
  assert.ok(t && t.reqs.length >= 2, "both Chromosomes statements are queued: the strong match on 4.1.2.1.a is unconfirmed");
  const [first, ...rest] = t.reqs, L = loadLedger("biology");
  // filed before the topic grew: its ledger knew only the last requirement
  L.topics[t.id] = { status: "filed", reqHash: reqHash({ reqs: rest }), uncovered: [], lessons: [] }; saveLedger(L);
  const q = nextTopics("biology", { limit: 9999 }).find((x) => x.id === t.id);
  assert.ok(q?.append, "added to the draft, not written afresh");
  assert.deepEqual(q.reqs.map((r) => r.id), [first.id], "only the new requirement is written");
  assert.equal(reqHash(q.full), reqHash(t), "the whole topic is recorded when it's filed");
  // once the ledger has the whole topic, it isn't queued again
  L.topics[t.id].reqHash = reqHash(t); saveLedger(L);
  assert.ok(!nextTopics("biology", { limit: 9999 }).some((x) => x.id === t.id));
  // a topic that lost or changed a requirement is still written afresh
  L.topics[t.id].reqHash = reqHash({ reqs: [{ ...first, hash: "old" }, ...rest] }); saveLedger(L);
  assert.ok(!nextTopics("biology", { limit: 9999 }).find((x) => x.id === t.id).append);
});

test("a published lesson becomes a provisional link, never coverage, and the specification pages refresh", async () => {
  const { linkLessons } = await gated("../scripts/content/publish.mjs");
  const { loadStore, saveStore, confirmedTaught } = await import("../scripts/content/mapstore.mjs");
  const { loadIndex } = await import("../scripts/curriculum/engine.mjs");
  const { statusOf } = await import("../kit/curriculum/mapping.js");
  const fw = "aqa-gcse-biology", idx = loadIndex(fw), hash = (ref) => idx.statements.find((x) => x.ref === ref).hash;
  // a person had verified 4.1.2.2.a as partly taught: publishing never touches their decision
  const S0 = loadStore(fw); S0.links["4.1.2.2.a"] = { status: "verified", hash: hash("4.1.2.2.a"), reviewer: "A Reviewer", reviewedOn: "2026-11-26", lessons: [{ id: "u04-05", coverage: "partial", note: "no stages" }] }; saveStore(fw, S0);
  const text = `## Chromosomes in pairs\nO: one\nO: two\nREQ: ${fw}:4.1.2.1.a @1,2\nREQ: ${fw}:4.1.2.1.b.ii @2\nREQ: ${fw}:4.1.2.2.a @1`;
  const res = await linkLessons([{ id: "u20-01", reqs: [`${fw}:4.1.2.1.a`, `${fw}:4.1.2.1.b.ii`, `${fw}:4.1.2.2.a`], text, by: "agent:sonnet" }], { on: "2026-11-26" });
  assert.equal(res.length, 3);
  const M = loadStore(fw), a = M.links["4.1.2.1.a"], b = M.links["4.1.2.1.b"];
  assert.equal(a.status, "ai-confirmed"); assert.deepEqual(a.lessons, [{ id: "u20-01", coverage: "full", objectives: [1, 2], published: true }]);
  assert.equal(a.by, "agent:sonnet"); assert.equal(a.hash, hash("4.1.2.1.a"));
  assert.equal(statusOf(a, idx.version, M.specVersion, hash("4.1.2.1.a")), "mapped", "learners see it as provisionally mapped");
  assert.equal(b.lessons[0].coverage, "partial", "a lesson naming one part links to its statement in part");
  assert.ok(![("4.1.2.1.a"), "4.1.2.1.b"].some((r) => confirmedTaught(M, r, hash(r))), "a provisional link is never coverage, so nothing stops being written");
  assert.equal(M.links["4.1.2.2.a"].status, "verified"); assert.equal(M.links["4.1.2.2.a"].lessons[0].id, "u04-05", "a person's verification is kept");
  // a second published lesson for the same statement joins the first
  await linkLessons([{ id: "u20-02", reqs: [`${fw}:4.1.2.1.a`], text: `REQ: ${fw}:4.1.2.1.a @1`, by: "agent:sonnet" }]);
  assert.deepEqual(loadStore(fw).links["4.1.2.1.a"].lessons.map((l) => l.id), ["u20-01", "u20-02"]);
  // the specification pages' links were rewritten from the store (in this run's output, not the repository)
  const { readFileSync: rf } = await import("node:fs");
  const links = rf(join(process.env.GRADIFY_OUT, "kit/specs/aqa-gcse-biology-8461.links.js"), "utf8");
  const point = JSON.parse(links.match(/"4\.1\.2\.1": (\{[^}]*\{[^}]*\}[^}]*\})/)[1]);
  assert.equal(point.evidence, "ai-mapped"); assert.ok(point.partial.includes("u20-01") || point.lessons.includes("u20-01"));
  const { refreshLinks } = await import("../scripts/curriculum/spec-view.mjs");
  assert.deepEqual(await refreshLinks(fw), [], "unchanged store, unchanged file");
  // republishing the same lesson adds no duplicate link
  await linkLessons([{ id: "u20-01", reqs: [`${fw}:4.1.2.1.a`], text, by: "agent:sonnet" }]);
  assert.deepEqual(loadStore(fw).links["4.1.2.1.a"].lessons.map((l) => l.id), ["u20-01", "u20-02"]);
  // a person revoked a verification: republishing makes it provisional again, never verified, and keeps the revocation
  const S1 = loadStore(fw); S1.links["4.1.2.3.a"] = { status: "proposed", lessons: [], revoked: [{ reviewer: "B Reviewer", on: "2026-11-26", why: "misses the second clause", was: { reviewer: "A Reviewer" } }] }; saveStore(fw, S1);
  await linkLessons([{ id: "u20-03", reqs: [`${fw}:4.1.2.3.a`], text: `REQ: ${fw}:4.1.2.3.a @1`, by: "agent:sonnet" }]);
  const rv = loadStore(fw).links["4.1.2.3.a"];
  assert.equal(rv.status, "ai-confirmed"); assert.equal(rv.revoked.length, 1, "the revocation stays on record");
  assert.ok(!confirmedTaught(loadStore(fw), "4.1.2.3.a", hash("4.1.2.3.a")), "publishing never restores a verification");
});
