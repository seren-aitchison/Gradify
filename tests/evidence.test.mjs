// Evidence provenance and the approval gate (scripts/content/evidence.mjs, owner's decisions A–D, 26 Nov 2026).
// A fake fetcher stands in for the network, and everything is written under a temporary GRADIFY_OUT.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.GRADIFY_OUT = mkdtempSync(join(tmpdir(), "gradify-evidence-"));
const E = await import("../scripts/content/evidence.mjs");
const { runTopic, allowLines } = await import("../scripts/content/loop.mjs");
const { saveLedger, loadLedger } = await import("../scripts/content/lib.mjs");

const URL_ = { ncbi: "https://www.ncbi.nlm.nih.gov/books/NBK1/", ncbi2: "https://www.ncbi.nlm.nih.gov/books/NBK2/", bbc: "https://www.bbc.co.uk/bitesize/guides/x1", aqa: "https://www.aqa.org.uk/subjects/biology/x", ostx: "https://openstax.org/books/biology-2e/pages/10-1-cell-division", other: "https://example.com/biology" };
const PAGE = (what) => `${what}. `.repeat(40);
const fetcher = (url) => url === URL_.ncbi2 ? { code: 200, text: "Checking your browser - reCAPTCHA Checking your browser before accessing" } : url === URL_.bbc ? { code: 200, text: PAGE("Chromosomes are found in the nucleus and carry genes") } : url === URL_.ncbi ? { code: 200, text: PAGE("A gene is a section of DNA on a chromosome") } : url === URL_.aqa ? { code: 200, text: PAGE("The specification statement") } : { code: 403, text: "" };
const brief = (id, f = "Each chromosome carries many genes, and a gene is a section of DNA on a chromosome.") => `TOPIC ${id} | levels=GCSE | checked=2026-11-26
F: ${f} | S1,S2,S3,S4 | conf=high
F: Human body cells normally have 23 pairs of chromosomes. | S1,S5 | conf=high
EXAM: Students state that each chromosome carries many genes. | S5
SRC: S1 | Genes | ${URL_.ncbi} | NCBI | licence=facts | 2026-11-26
SRC: S2 | Chromosomes | ${URL_.bbc} | BBC | licence=facts | 2026-11-26
SRC: S3 | Cell division | ${URL_.ostx} | OpenStax | licence=facts | 2026-11-26
SRC: S4 | More genes | ${URL_.ncbi2} | NCBI | licence=facts | 2026-11-26
SRC: S5 | Specification | ${URL_.aqa} | AQA | licence=facts | 2026-11-26
END
`;
const store = (id, text) => { const f = join(process.env.GRADIFY_OUT, `content/research/${id}.txt`); mkdirSync(join(f, ".."), { recursive: true }); writeFileSync(f, `# fp=test\n${text}`); return text; };
const ON = "2026-11-26";

test("A. retrieval: the engine records what happened, and a page that came back isn't always the content", () => {
  let calls = 0; const counting = (u) => { calls++; return fetcher(u); };
  const r = (url) => E.retrieveSource({ id: "S", url }, { fetcher: counting });
  const ok = r(URL_.ncbi);
  assert.equal(ok.retrieval, "retrieved"); assert.equal(ok.publisher, "National Library of Medicine (NCBI)"); assert.match(ok.fingerprint, /^[0-9a-f]{16}$/);
  assert.ok(E.cachedText(URL_.ncbi), "the text is cached locally for checks, never committed");
  assert.equal(r(URL_.ncbi2).retrieval, "failed"); assert.match(r(URL_.ncbi2).reason, /bot check/);
  const before = calls, susp = r(URL_.ostx);
  assert.equal(susp.retrieval, "suspended"); assert.equal(calls, before, "a suspended source is never fetched"); assert.match(susp.reason, /source policy/);
  assert.equal(r(URL_.other).retrieval, "rejected");
  assert.equal(E.retrieveSource({ id: "S", url: "https://www.bbc.co.uk/bitesize/x2" }, { fetcher: () => ({ code: 403, text: "" }) }).reason, "HTTP 403");
  assert.equal(r(URL_.aqa).evidence, "requirement", "AQA establishes requirements, not facts");
});

test("B. claims: only checked, retrieved knowledge sources count, publishers not URLs, thresholds by risk", () => {
  const id = "biology/ev-claims", text = store(id, brief(id));
  let e = E.retrieveAll(id, text, { fetcher });
  let a = E.assess(text, e);
  assert.ok(!a.sufficient); assert.ok(a.claims.every((c) => c.sources === 0), "retrieval alone verifies no claim");
  const [f1, f2, ex] = a.claims;
  for (const [c, src, v] of [[f1, "S1", "supports"], [f1, "S2", "supports"], [f2, "S1", "supports"], [f2, "S5", "supports"], [ex, "S5", "supports"]]) E.recordVerdict(e, c, src, { verdict: v, by: "A Reviewer", on: ON });
  assert.throws(() => E.recordVerdict(e, f1, "S3", { verdict: "supports", by: "A Reviewer", on: ON }), /suspended/, "a suspended source can't be checked into the evidence");
  assert.throws(() => E.recordVerdict(e, f1, "S4", { verdict: "supports", by: "A Reviewer", on: ON }), /failed/);
  assert.throws(() => E.recordVerdict(e, f1, "S1", { verdict: "supports", on: ON }), /by/);
  E.saveEvidence(e); a = E.assess(text, e);
  const [g1, g2, g3] = a.claims;
  assert.equal(g1.status, "sufficient"); assert.deepEqual(g1.publishers.sort(), ["BBC", "National Library of Medicine (NCBI)"]);
  assert.equal(g2.status, "insufficient", "the specification can't substantiate a subject fact");
  assert.match(g2.support.find((x) => x.id === "S5").why, /requirement source/);
  assert.equal(g3.status, "sufficient", "an EXAM line may rest on the specification");
  assert.equal(a.sources.find((s) => s.id === "S3").status, "suspended"); assert.equal(a.sources.find((s) => s.id === "S4").status, "unavailable");
  assert.equal(a.sources.find((s) => s.id === "S1").status, "verified"); assert.equal(a.sources.find((s) => s.id === "S2").status, "verified");
  assert.ok(a.gaps.some((g) => /2 verified independent knowledge publishers; the standard is 3/.test(g)));
  // two URLs of one publisher are one publisher
  const id2 = "biology/ev-same-pub", t2 = store(id2, brief(id2).replace(`S2 | Chromosomes | ${URL_.bbc} | BBC`, `S2 | Chromosomes | https://www.ncbi.nlm.nih.gov/books/NBK3/ | NCBI`));
  const e2 = E.retrieveAll(id2, t2, { fetcher: (u) => (u.includes("NBK3") ? fetcher(URL_.ncbi) : fetcher(u)) }), c2 = E.assess(t2, e2).claims[0];
  for (const s of ["S1", "S2"]) E.recordVerdict(e2, c2, s, { verdict: "supports", by: "A Reviewer", on: ON });
  const h = E.assess(t2, e2).claims[0];
  assert.equal(h.sources, 2); assert.equal(h.publishers.length, 1); assert.equal(h.status, "insufficient");
  // a contradiction is flagged, not averaged away; a reworded claim loses its verdicts; a changed page does too
  E.recordVerdict(e, g1, "S2", { verdict: "contradicts", by: "B Reviewer", on: ON });
  assert.equal(E.assess(text, e).claims[0].status, "conflict");
  const reworded = text.replace("Each chromosome carries many genes", "Each chromosome holds many genes");
  assert.equal(E.assess(reworded, e).claims[0].sources, 0, "a verdict holds only for the claim it was given on");
  e.sources.S1.fingerprint = "0000000000000000";
  assert.ok(!E.assess(text, e).claims[1].support.find((x) => x.id === "S1").counts, "a verdict holds only for the page it was given on");
});

test("B. a source no machine could open counts once a named person records that they checked it", () => {
  const id = "biology/ev-manual", text = store(id, brief(id));
  E.retrieveAll(id, text, { fetcher });
  assert.throws(() => E.recordManual(id, "S4", { url: URL_.ncbi2, by: "A Reviewer", on: ON }), /note/);
  assert.throws(() => E.recordManual(id, "S3", { url: URL_.ostx, by: "A Reviewer", on: ON, note: "x" }), /suspended/);
  E.recordManual(id, "S4", { url: URL_.ncbi2, by: "A Reviewer", on: ON, note: "opened in a browser, the chapter on chromosomes" });
  const e = E.loadEvidence(id), c = E.assess(text, e).claims[0];
  E.recordVerdict(e, c, "S4", { verdict: "supports", by: "A Reviewer", on: ON });
  const s = E.assess(text, e).sources.find((x) => x.id === "S4");
  assert.equal(s.retrieval, "manual"); assert.equal(s.status, "verified");
});

test("C. approval: refused on gaps unless accepted with a reason, bound to the exact brief and evidence, revocable", () => {
  const id = "biology/ev-approve", text = store(id, brief(id));
  E.retrieveAll(id, text, { fetcher });
  assert.throws(() => E.approveEvidence(id, { by: "A Reviewer", on: ON }), /isn't sufficient/);
  assert.throws(() => E.approveEvidence(id, { on: ON, acceptGaps: "x" }), /by/);
  const ap = E.approveEvidence(id, { by: "A Reviewer", on: ON, acceptGaps: "pilot: NCBI to be checked by hand" });
  assert.equal(ap.sufficient, false); assert.ok(ap.acceptedGaps.length); assert.ok(E.evidenceApproved(id));
  // a change to the evidence voids it
  const e = E.loadEvidence(id); E.recordVerdict(e, E.assess(text, e).claims[0], "S1", { verdict: "supports", by: "A Reviewer", on: ON }); E.saveEvidence(e);
  assert.equal(E.approvalOf(id).why, "the evidence record has changed since it was approved");
  E.approveEvidence(id, { by: "A Reviewer", on: ON, acceptGaps: "pilot" });
  // a change to the brief voids it
  store(id, text.replace("23 pairs", "twenty-three pairs"));
  assert.equal(E.approvalOf(id).why, "the brief has changed since it was approved");
  store(id, text); assert.ok(E.evidenceApproved(id));
  E.revokeEvidence(id, { by: "B Reviewer", on: ON, why: "S1 is a review article, not primary" });
  assert.match(E.approvalOf(id).why, /revoked by B Reviewer/); assert.equal(E.loadEvidence(id).approvals.length, 3, "the history is kept");
});

test("C. the gate: no path writes, templates, ingests or publishes lessons from an unapproved brief", async () => {
  const T = { id: "biology/ev-gate", subject: "biology", fw: "aqa-gcse-biology", section: "9.9", title: "Ev gate", level: "GCSE", country: "uk", reqs: [{ id: "aqa-gcse-biology:9.9.9.a", ref: "9.9.9.a", asks: "x", text: null, title: "Ev gate", type: "concept", status: "official", hash: "h1" }], reuse: [] };
  const jobs = [], ask = async (job) => { jobs.push(job); return job === "research" ? brief(T.id) : "## A lesson\nEND"; };
  // the API and ingest loop
  const r = await runTopic(T, { ask, askMany: async () => new Map() });
  assert.equal(r.status, "awaiting-approval"); assert.deepEqual(jobs, ["research"], "nothing is written"); assert.match(r.awaiting, /awaiting evidence approval/);
  assert.ok(!loadLedger("biology").topics[T.id], "nothing is filed");
  // agent mode
  const { advance } = await import("../scripts/content/agent.mjs"), A = { ...T, id: "biology/ev-gate-agent" };
  const dir = join(process.env.GRADIFY_OUT, "content/queue/biology/ev-gate-agent"); mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "research.out.txt"), brief(A.id));
  const a = await advance(A);
  assert.deepEqual(a.actions, []); assert.match(a.awaiting, /awaiting evidence approval/); assert.ok(!existsSync(join(dir, "write.req.txt")), "no write request");
  // lesson templates for the external writer (a real queued topic, its brief stored as the engine stores one)
  const { exportTemplates, ingestFile } = await import("../scripts/content/factory.mjs");
  const { topicsFor } = await import("../scripts/content/queue.mjs"), { stampBrief } = await import("../scripts/content/loop.mjs");
  const CH = topicsFor("aqa-gcse-biology").find((x) => x.id === "biology/chromosomes");
  const cf = join(process.env.GRADIFY_OUT, "content/research/biology/chromosomes.txt"); mkdirSync(join(cf, ".."), { recursive: true }); writeFileSync(cf, stampBrief(CH, brief(CH.id)));
  const t = exportTemplates(["biology"], { topicId: CH.id });
  assert.equal(t[0]?.kind, "approval"); assert.equal(t[0].file, null); assert.match(t[0].awaiting, /awaiting evidence approval/);
  assert.ok(!existsSync(join(process.env.GRADIFY_OUT, "content/templates/biology/chromosomes.write.md")), "no lesson template");
  // a returned unit file
  const ing = await ingestFile("ev-gate-agent.md", `## A lesson\nREQ: aqa-gcse-biology:9.9.9.a @1\nEND`, { all: [A] });
  assert.equal(ing.ok, false); assert.match(ing.report, /awaiting evidence approval/);
  // publishing a lesson already in the ledger
  const L = loadLedger("biology"); L.topics[A.id] = { file: "content/drafts/biology/x.txt", lessons: [{ title: "A lesson", tier: "ai-verified", hash: "x", reqs: [] }] }; saveLedger(L);
  const { publish } = await import("../scripts/content/publish.mjs");
  const p = await publish("biology", { topic: A.id }).catch((err) => ({ err }));
  assert.ok(p.err || p.skipped.some((x) => /awaiting evidence approval/.test(x)), "publish skips it");
  // once a person approves, writing goes ahead
  E.approveEvidence(T.id, { by: "A Reviewer", on: ON, acceptGaps: "testing the unlock" });
  jobs.length = 0; await runTopic(T, { ask, askMany: async () => new Map() });
  assert.ok(jobs.includes("write"), "approved: the writer is asked");
});

test("D. copying: every line against the whole specification and retrieved sources, with severity", () => {
  const corpus = { items: [{ id: "x:1.a", label: "x 1.a (specification)", text: "The nucleus of a cell contains chromosomes made of DNA molecules." }, { id: "S1", label: "S1 page", text: "a gene is a short section of DNA found on a chromosome in the nucleus" }], missing: [] };
  const m = E.copyingReport("F: The nucleus of a cell contains chromosomes made of DNA molecules. | S1\nBG: Note that a gene is a short section, as said. | S1\nSRC: S1 | t | https://a.b/c/d/e/f/g/h | P | licence=facts | 2026", corpus);
  assert.deepEqual(m.map((x) => [x.line, x.severity, x.source]), [[1, "block", "x 1.a (specification)"], [2, "review", "S1 page"]], "SRC lines (URLs) aren't compared");
  assert.equal(m[1].passage, "a gene is a short section");
});

test("D. the lesson gate fails a lesson that copies a source or another statement", async () => {
  const { copyGate } = await import("../scripts/content/gates.mjs");
  const corpus = { items: [{ id: "S1", label: "S1 page", text: "Homologous chromosomes are the same length and have genes in exactly the same location" }], missing: [] };
  const g = copyGate("## L\nP: Homologous chromosomes are the same length and have genes in exactly the same location.\n", corpus);
  assert.equal(g.ok, false); assert.match(g.issues[0].note, /words copied from S1 page/);
  assert.ok(copyGate("## L\nP: Matched chromosomes carry the same genes.\n", corpus).ok);
});

test("source policy: OpenStax is suspended for new research without touching its registry row", async () => {
  const { SOURCES } = await import("../kit/curriculum/sources.js");
  const { SUSPENDED, suspensionOf, evidenceKindOf } = await import("../scripts/content/source-policy.mjs");
  const row = SOURCES.find((x) => x.id === "openstax-biology-2e");
  assert.equal(row.use, "facts-only", "the registry row is unchanged");
  assert.ok(suspensionOf(row)); assert.match(SUSPENDED[0].notice, /may not be used in the training of large language models/);
  assert.ok(!allowLines().some((l) => l.startsWith("ALLOW openstax-")), "not offered to researchers");
  assert.equal(evidenceKindOf(SOURCES.find((x) => x.id === "aqa-specifications")), "requirement");
  assert.equal(evidenceKindOf(SOURCES.find((x) => x.id === "ncbi-bookshelf")), "knowledge");
});

test("the person's sheet: one row per claim and source; a stale sheet is refused", async () => {
  const id = "biology/ev-sheet", text = store(id, brief(id));
  const { parseTable } = await import("../scripts/growth/sources.mjs");
  E.retrieveAll(id, text, { fetcher });
  const rows = parseTable(E.claimSheet(text, E.loadEvidence(id)));
  assert.deepEqual(Object.keys(rows[0]), E.SHEET_COLUMNS); assert.equal(rows.length, 4 + 2 + 1);
  const filled = rows.map((r) => (r.claim === "F1" && r.source.startsWith("S1") ? { ...r, verdict: "supports", by: "A Reviewer", on: ON, note: "section 2" } : r));
  assert.deepEqual(E.applySheet(id, text, filled), { applied: 1, problems: [] });
  const stale = filled.map((r) => ({ ...r, claim_hash: r.claim === "F1" ? "0000" : r.claim_hash }));
  assert.match(E.applySheet(id, text, stale).problems[0], /changed after the sheet was made/);
  const md = E.evidenceReport(id, text).markdown;
  assert.match(md, /^# Evidence report: biology\/ev-sheet/); assert.match(md, /\| S3 \| OpenStax, Rice University \| knowledge \| suspended/);
});
