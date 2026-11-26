// Evidence provenance and the approval gate (scripts/content/evidence.mjs, owner's decisions A–D and P0, 26 Nov 2026).
// No approval wrappers here: every approval below is made, voided and verified explicitly. A fake fetcher stands in
// for the network, recorded reviews stand in for the GitHub API, and everything is written under a temporary
// GRADIFY_OUT, including the specification text the copying checks need (AQA's own text is never committed).
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.GRADIFY_OUT = mkdtempSync(join(tmpdir(), "gradify-evidence-"));
const OUT = process.env.GRADIFY_OUT;
const E = await import("../scripts/content/evidence.mjs");
const { runTopic, allowLines, stampBrief } = await import("../scripts/content/loop.mjs");
const { saveLedger, loadLedger } = await import("../scripts/content/lib.mjs");
const { topicsFor } = await import("../scripts/content/queue.mjs");

// the specification text the copying checks need, for AQA GCSE Biology only (Chemistry has none: the NOT RUN case)
const IDX = JSON.parse(readFileSync(new URL("../kit/curriculum/specs/aqa-gcse-biology.json", import.meta.url), "utf8"));
const SPEC_TEXT = { "4.1.2.1.a": "The nucleus of a cell contains chromosomes made of DNA molecules. Each chromosome carries a large number of genes.", "4.1.2.1.b": "In body cells the chromosomes are normally found in pairs." };
const specFile = join(OUT, "data/curriculum/specs/aqa-gcse-biology.json");
mkdirSync(join(specFile, ".."), { recursive: true });
writeFileSync(specFile, JSON.stringify({ ...IDX, statements: IDX.statements.map((x) => (SPEC_TEXT[x.ref] ? { ...x, text: SPEC_TEXT[x.ref] } : x)) }));

const FW = "aqa-gcse-biology", REQ_A = `${FW}:4.1.2.1.a`, CTX = { reqIds: [REQ_A], fw: FW };
const URL_ = { ncbi: "https://www.ncbi.nlm.nih.gov/books/NBK1/", ncbi2: "https://www.ncbi.nlm.nih.gov/books/NBK2/", bbc: "https://www.bbc.co.uk/bitesize/guides/x1", aqa: "https://www.aqa.org.uk/subjects/biology/x", ostx: "https://openstax.org/books/biology-2e/pages/10-1-cell-division", other: "https://example.com/biology" };
const PAGE = (what) => `${what}. `.repeat(40);
// the pages are worded unlike the brief, so the copying checks pass (a test below copies on purpose)
const pages = { [URL_.bbc]: PAGE("Inside the nucleus sit chromosomes, each holding genes"), [URL_.ncbi]: PAGE("Genes are stretches of DNA carried along each chromosome"), [URL_.aqa]: PAGE("The specification statement") };
const fetcher = (url) => url === URL_.ncbi2 ? { code: 200, text: "Checking your browser - reCAPTCHA Checking your browser before accessing" } : pages[url] ? { code: 200, text: pages[url] } : { code: 403, text: "" };
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
const store = (id, text) => { const f = join(OUT, `content/research/${id}.txt`); mkdirSync(join(f, ".."), { recursive: true }); writeFileSync(f, `# fp=test\n${text}`); return text; };
const ON = "2026-11-26";
const REVIEW = (login, at = Date.now() + 1000) => [{ state: "APPROVED", user: { login }, id: 7, html_url: "https://github.com/example/example/pull/9#review-7", submitted_at: new Date(at).toISOString(), commit_id: "abc" }];
const AUTHOR = { commit: "1".repeat(40), name: "Someone", email: "someone@example.com" };
/** a topic whose evidence is retrieved, checked for both facts and approved with its gaps accepted */
const approved = (id, o = {}) => {
  const text = store(id, brief(id)), e = E.retrieveAll(id, text, { fetcher }), c = E.assess(text, e).claims;
  for (const [cl, s] of [[c[0], "S1"], [c[0], "S2"], [c[2], "S5"]]) E.recordVerdict(e, cl, s, { verdict: "supports", by: "A Reviewer", on: ON });
  E.saveEvidence(e);
  E.approveEvidence(id, { by: "A Reviewer", github: "a-reviewer", on: ON, acceptGaps: "F2 rests on the specification alone", fetcher, ...CTX, ...o });
  return text;
};

test("A. retrieval: the engine records what happened, and a page that came back isn't always the content", () => {
  let calls = 0; const counting = (u) => { calls++; return fetcher(u); };
  const r = (url) => E.retrieveSource({ id: "S", url }, { fetcher: counting });
  const ok = r(URL_.ncbi);
  assert.equal(ok.retrieval, "retrieved"); assert.equal(ok.publisher, "National Library of Medicine (NCBI)"); assert.match(ok.fingerprint, /^[0-9a-f]{16}$/);
  assert.ok(E.cachedText(URL_.ncbi), "the text is cached locally for checks, never committed");
  assert.equal(r(URL_.ncbi2).retrieval, "failed"); assert.match(r(URL_.ncbi2).reason, /bot check/);
  const before = calls, susp = r(URL_.ostx);
  assert.equal(susp.retrieval, "suspended"); assert.equal(calls, before, "a suspended source is never fetched");
  assert.equal(r(URL_.other).retrieval, "rejected");
  assert.equal(r(URL_.aqa).evidence, "requirement", "AQA establishes requirements, not facts");
});

test("A. a failed fetch never erases an earlier success; freshness decides whether it still counts", () => {
  const id = "biology/ev-history", text = store(id, brief(id));
  E.retrieveAll(id, text, { fetcher, now: new Date("2026-11-01T00:00:00Z") });
  const down = () => ({ code: 0, text: "" });
  E.retrieveAll(id, text, { fetcher: down, now: new Date("2026-11-20T00:00:00Z") });
  const s1 = E.loadEvidence(id).sources.S1;
  assert.equal(s1.retrieval, "retrieved", "the earlier success is kept as the evidence"); assert.equal(s1.latest.outcome, "failed"); assert.equal(s1.attempts.length, 2);
  assert.equal(E.freshness(s1, new Date("2026-11-26T00:00:00Z")).fresh, true);
  assert.match(E.freshness(s1, new Date("2026-11-26T00:00:00Z")).why, /latest attempt failed; using the retrieval of 2026-11-01/);
  const late = E.freshness(s1, new Date("2027-03-01T00:00:00Z"));
  assert.equal(late.fresh, false, "beyond the freshness policy it no longer counts"); assert.match(late.why, /beyond the 90-day freshness policy \(latest attempt: failed/);
  // stale evidence makes the freshness check NOT RUN, which blocks approval
  const checks = E.checksOf(id, text, E.loadEvidence(id), CTX, { now: new Date("2027-03-01T00:00:00Z") });
  assert.equal(checks.find((c) => c.id === "sources-fresh").status, "NOT RUN");
});

test("B. claims: only checked, fresh, knowledge sources count, publishers not URLs, thresholds by risk", () => {
  const id = "biology/ev-claims", text = store(id, brief(id));
  let e = E.retrieveAll(id, text, { fetcher });
  let a = E.assess(text, e);
  assert.ok(!a.sufficient); assert.ok(a.claims.every((c) => c.sources === 0), "retrieval alone verifies no claim");
  const [f1, f2, ex] = a.claims;
  for (const [c, src] of [[f1, "S1"], [f1, "S2"], [f2, "S1"], [f2, "S5"], [ex, "S5"]]) E.recordVerdict(e, c, src, { verdict: "supports", by: "A Reviewer", on: ON });
  assert.throws(() => E.recordVerdict(e, f1, "S3", { verdict: "supports", by: "A Reviewer", on: ON }), /suspended/);
  assert.throws(() => E.recordVerdict(e, f1, "S4", { verdict: "supports", by: "A Reviewer", on: ON }), /failed/);
  E.saveEvidence(e); a = E.assess(text, e);
  const [g1, g2, g3] = a.claims;
  assert.equal(g1.status, "sufficient"); assert.equal(g2.status, "insufficient", "the specification can't substantiate a subject fact");
  assert.equal(g3.status, "sufficient", "an EXAM line may rest on the specification");
  assert.ok(a.gaps.some((g) => /2 verified independent knowledge publishers; the standard is 3/.test(g)));
  E.recordVerdict(e, g1, "S2", { verdict: "contradicts", by: "B Reviewer", on: ON });
  assert.equal(E.assess(text, e).claims[0].status, "conflict");
  assert.equal(E.assess(text.replace("Each chromosome carries many genes", "Each chromosome holds many genes"), e).claims[0].sources, 0, "a verdict holds only for the claim it was given on");
});

test("C. checks report PASS, FAIL or NOT RUN, with and without the specification's text; NOT RUN blocks approval", () => {
  const id = "biology/ev-checks", text = store(id, brief(id)), e = E.retrieveAll(id, text, { fetcher });
  const st = (checks, k) => checks.find((c) => c.id === k).status;
  const withText = E.checksOf(id, text, e, CTX);
  assert.equal(st(withText, "copying-spec"), "PASS"); assert.equal(st(withText, "requirements"), "PASS"); assert.equal(st(withText, "evidence"), "FAIL");
  // no specification text (AQA GCSE Chemistry has none here, nor in CI): NOT RUN, never a silent pass
  const noText = E.checksOf(id, text, e, { reqIds: ["aqa-gcse-chemistry:4.1.1.1.a"], fw: "aqa-gcse-chemistry" });
  assert.equal(st(noText, "copying-spec"), "NOT RUN"); assert.match(noText.find((c) => c.id === "copying-spec").detail, /isn't imported here/);
  assert.throws(() => E.approveEvidence(id, { by: "A", github: "a", on: ON, acceptGaps: "x", fetcher, reqIds: ["aqa-gcse-chemistry:4.1.1.1.a"], fw: "aqa-gcse-chemistry" }), /NOT RUN No copying from the whole specification/);
  // unknown requirements are NOT RUN too; a copied statement is a FAIL that no accepted gap overrides
  assert.equal(st(E.checksOf(id, text, e, { fw: null, reqIds: null }), "requirements"), "NOT RUN");
  const copied = store(id, text.replace("Human body cells normally have 23 pairs of chromosomes.", "The nucleus of a cell contains chromosomes made of DNA molecules."));
  assert.equal(st(E.checksOf(id, copied, e, CTX), "copying-spec"), "FAIL");
  assert.throws(() => E.approveEvidence(id, { by: "A", github: "a", on: ON, acceptGaps: "x", fetcher, ...CTX }), /FAIL No copying from the whole specification/);
});

test("C. every material input voids an approval, the change is named, and re-approval must acknowledge it", async () => {
  const id = "biology/ev-inputs", text = approved(id);
  assert.ok(E.evidenceApproved(id, CTX));
  const voided = (why, key) => { const a = E.approvalOf(id, CTX); assert.equal(a.approval, null, why); assert.ok(a.changes.some((c) => c.key === key), `${why}: names ${key} (${JSON.stringify(a.changes)})`); return a; };
  // a source's content changes and is re-retrieved
  pages[URL_.ncbi] = PAGE("Genes are short stretches of DNA carried along a chromosome");
  E.refreshSources(id, text, { fetcher });
  const a1 = voided("the page changed", "source:S1");
  assert.match(a1.changes.find((c) => c.key === "source:S1").change, /S1's content changed \([0-9a-f]+ → [0-9a-f]+\)/);
  // re-approval must acknowledge it, and the page's verdicts are void until a person checks them again
  assert.throws(() => E.approveEvidence(id, { by: "A Reviewer", github: "a-reviewer", on: ON, acceptGaps: "x", fetcher, ...CTX }), /must be re-reviewed and acknowledged \(--acknowledge source:S1,verdicts\)|--acknowledge source:S1/);
  assert.equal(E.assess(text, E.loadEvidence(id)).claims[0].support.find((x) => x.id === "S1").counts, false);
  E.approveEvidence(id, { by: "A Reviewer", github: "a-reviewer", on: ON, acceptGaps: "x", fetcher, acknowledge: ["source:S1"], ...CTX });
  assert.ok(E.evidenceApproved(id, CTX));
  // the topic's requirements change (scope) or a statement's text changes (the index)
  const wider = E.approvalOf(id, { reqIds: [REQ_A, `${FW}:4.1.2.1.b`], fw: FW });
  assert.equal(wider.approval, null); assert.match(wider.changes[0].change, /4\.1\.2\.1\.b was added to the topic's requirements/);
  assert.ok(E.evidenceApproved(id, CTX), "the approved scope still holds");
  const was = E.loadEvidence(id).approvals.at(-1).inputs.requirements.items[REQ_A];
  const ev = E.loadEvidence(id); ev.approvals.at(-1).inputs.requirements.items[REQ_A] = "0000000000000000"; E.saveEvidence(ev);
  assert.match(E.approvalOf(id, CTX).changes[0].change, new RegExp(`${REQ_A.replace(/\./g, "\\.")}'s statement changed \\(0000000000000000 → ${was}\\)`));
  ev.approvals.at(-1).inputs.requirements.items[REQ_A] = was; E.saveEvidence(ev);
  // the brief, the policy, a registry row, the rules
  store(id, text.replace("23 pairs", "twenty-three pairs")); voided("the brief changed", "brief"); store(id, text);
  for (const key of ["policy", "rules"]) { const v = E.loadEvidence(id); const keep = v.approvals.at(-1).inputs[key]; v.approvals.at(-1).inputs[key] = "x"; E.saveEvidence(v); voided(`the ${key} changed`, key); v.approvals.at(-1).inputs[key] = keep; E.saveEvidence(v); }
  const v = E.loadEvidence(id), row = Object.keys(v.approvals.at(-1).inputs.registry)[0], keep = v.approvals.at(-1).inputs.registry[row];
  v.approvals.at(-1).inputs.registry[row] = "x"; E.saveEvidence(v); voided("a registry row changed", `registry:${row}`); v.approvals.at(-1).inputs.registry[row] = keep; E.saveEvidence(v);
  // a new verdict
  const e = E.loadEvidence(id); E.recordVerdict(e, E.assess(text, e).claims[1], "S1", { verdict: "partly", by: "B Reviewer", on: ON }); E.saveEvidence(e);
  voided("a verdict changed", "verdicts");
});

test("C. the gate: no path writes, templates, ingests or publishes from an unapproved brief", async () => {
  const req = { id: REQ_A, ref: "4.1.2.1.a", asks: "x", text: null, title: "Gate", type: "concept", status: "official", hash: "h1" };
  const T = { id: "biology/ev-gate", subject: "biology", fw: FW, section: "4.1.2.1", title: "Ev gate", level: "GCSE", country: "uk", reqs: [req], reuse: [] };
  const jobs = [], ask = async (job) => { jobs.push(job); return job === "research" ? brief(T.id) : "## A lesson\nEND"; };
  const r = await runTopic(T, { ask, askMany: async () => new Map() });
  assert.equal(r.status, "awaiting-approval"); assert.deepEqual(jobs, ["research"], "nothing is written"); assert.match(r.awaiting, /awaiting evidence approval/);
  assert.ok(!loadLedger("biology").topics[T.id], "nothing is filed");
  const { advance } = await import("../scripts/content/agent.mjs"), A = { ...T, id: "biology/ev-gate-agent" };
  const dir = join(OUT, "content/queue/biology/ev-gate-agent"); mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "research.out.txt"), brief(A.id));
  const a = await advance(A);
  assert.deepEqual(a.actions, []); assert.match(a.awaiting, /awaiting evidence approval/); assert.ok(!existsSync(join(dir, "write.req.txt")));
  const { exportTemplates, ingestFile } = await import("../scripts/content/factory.mjs");
  const CH = topicsFor(FW).find((x) => x.id === "biology/chromosomes");
  const cf = join(OUT, "content/research/biology/chromosomes.txt"); mkdirSync(join(cf, ".."), { recursive: true }); writeFileSync(cf, stampBrief(CH, brief(CH.id)));
  const t = exportTemplates(["biology"], { topicId: CH.id });
  assert.equal(t[0]?.kind, "approval"); assert.equal(t[0].file, null); assert.ok(!existsSync(join(OUT, "content/templates/biology/chromosomes.write.md")));
  const ing = await ingestFile("ev-gate-agent.md", `## A lesson\nREQ: ${REQ_A} @1\nEND`, { all: [A] });
  assert.equal(ing.ok, false); assert.match(ing.report, /awaiting evidence approval/);
  // publishing: a filed lesson of an unapproved topic is skipped, by name, with the reason
  const L = loadLedger("biology"); L.topics[A.id] = { fw: FW, reqHash: `${REQ_A}:h1`, file: "content/drafts/biology/x.txt", lessons: [{ title: "A lesson", tier: "ai-verified", hash: "x", reqs: [REQ_A] }] }; saveLedger(L);
  const { publish } = await import("../scripts/content/publish.mjs"), { cpSync } = await import("node:fs");
  mkdirSync(join(OUT, "kit/courses/biology"), { recursive: true });
  for (const f of ["syllabus.js", "ids.js", "qa.js", "course.js", "published.js"]) cpSync(new URL(`../kit/courses/biology/${f}`, import.meta.url), join(OUT, "kit/courses/biology", f));
  const p = await publish("biology", { topic: A.id, fetcher });
  assert.deepEqual(p.added, []); assert.ok(p.skipped.some((x) => /^A lesson \(not published: the evidence hasn't been approved\)$/.test(x)), JSON.stringify(p.skipped));
  // once a person approves, writing goes ahead
  E.approveEvidence(T.id, { by: "A Reviewer", github: "a-reviewer", on: ON, acceptGaps: "testing the unlock", fetcher, topic: T });
  jobs.length = 0; await runTopic(T, { ask, askMany: async () => new Map() });
  assert.ok(jobs.includes("write"), "approved: the writer is asked");
});

test("C. publishing needs a verified GitHub review identity, and expert authority where the content needs it", () => {
  const id = "biology/ev-identity"; approved(id);
  const pc = E.publishCheck(id, { ...CTX, fetcher });
  assert.equal(pc.ok, false); assert.ok(pc.reasons.some((r) => /^NOT RUN Approval made by an identifiable GitHub reviewer/.test(r)), "a claimed identity isn't enough to publish");
  assert.throws(() => E.verifyApproval(id, { pr: 9, reviews: REVIEW("someone-else"), author: AUTHOR }), /no APPROVED review by a-reviewer/);
  assert.throws(() => E.verifyApproval(id, { pr: 9, reviews: REVIEW("a-reviewer", Date.parse("2020-01-01")), author: AUTHOR }), /after the approval was recorded/);
  const idn = E.verifyApproval(id, { pr: 9, reviews: REVIEW("a-reviewer"), author: AUTHOR });
  assert.equal(idn.review.status, "verified"); assert.equal(idn.technical.name, "Someone"); assert.equal(idn.expert.status, "not established", "a GitHub account is never a qualification");
  assert.ok(E.publishCheck(id, { ...CTX, fetcher }).ok);
  // a high-risk claim that's sufficient needs an expert: only the owner's register establishes one
  const hid = "biology/ev-expert", text = store(hid, brief(hid, "A drug dose depends on the patient's chromosomes and genes."));
  const e = E.retrieveAll(hid, text, { fetcher }), c = E.assess(text, e).claims;
  for (const [cl, s] of [[c[0], "S1"], [c[0], "S2"], [c[2], "S5"]]) E.recordVerdict(e, cl, s, { verdict: "supports", by: "A Reviewer", on: ON }); E.saveEvidence(e);
  assert.equal(E.assess(text, e).claims[0].risk, "high");
  E.approveEvidence(hid, { by: "A Reviewer", github: "a-reviewer", on: ON, acceptGaps: "x", fetcher, ...CTX });
  E.verifyApproval(hid, { pr: 9, reviews: REVIEW("a-reviewer"), author: AUTHOR });
  assert.ok(E.publishCheck(hid, { ...CTX, fetcher }).reasons.some((r) => /^FAIL Expert authority .*a-reviewer isn't in the reviewer register for biology/.test(r)));
  writeFileSync(join(OUT, "content/reviewers.json"), JSON.stringify({ reviewers: [{ github: "a-reviewer", name: "Dr A Reviewer", subjects: ["biology"], qualification: "PhD genetics; GCSE examiner", verifiedBy: "owner", verifiedOn: ON }] }));
  E.verifyApproval(hid, { pr: 9, reviews: REVIEW("a-reviewer"), author: AUTHOR });
  assert.ok(E.publishCheck(hid, { ...CTX, fetcher }).ok, "with the owner's register entry, expert authority is established");
});

test("C. revocation is kept on record and stops publishing at once", () => {
  const id = "biology/ev-revoke"; approved(id); E.verifyApproval(id, { pr: 9, reviews: REVIEW("a-reviewer"), author: AUTHOR });
  assert.ok(E.publishCheck(id, { ...CTX, fetcher }).ok);
  E.revokeEvidence(id, { by: "B Reviewer", on: ON, why: "S1 is a review article" });
  assert.match(E.publishCheck(id, { ...CTX, fetcher }).reasons[0], /revoked by B Reviewer/);
});

test("D. copying: every line against the whole specification and retrieved sources, with severity", () => {
  const corpus = { items: [{ id: "x:1.a", kind: "spec", label: "x 1.a (specification)", text: "The nucleus of a cell contains chromosomes made of DNA molecules." }, { id: "S1", kind: "source", label: "S1 page", text: "a gene is a short section of DNA found on a chromosome in the nucleus" }], missing: [] };
  const m = E.copyingReport("F: The nucleus of a cell contains chromosomes made of DNA molecules. | S1\nBG: Note that a gene is a short section, as said. | S1\nSRC: S1 | t | https://a.b/c/d/e/f/g/h | P | licence=facts | 2026", corpus);
  assert.deepEqual(m.map((x) => [x.line, x.severity, x.source]), [[1, "block", "x 1.a (specification)"], [2, "review", "S1 page"]], "SRC lines (URLs) aren't compared");
  // a lesson at publishing: without the specification's text the check is NOT RUN, never a pass
  assert.equal(E.lessonCopyCheck("## L\nP: anything at all here.", "aqa-gcse-chemistry", null).status, "NOT RUN");
  assert.equal(E.lessonCopyCheck("## L\nP: In body cells the chromosomes are normally found in pairs, says the text.", FW, null, [REQ_A]).status, "FAIL");
  assert.equal(E.lessonCopyCheck("## L\nP: Body cells hold their chromosomes in matched pairs.", FW, null).status, "PASS");
});

test("D. the lesson gate fails a lesson that copies a source or another statement", async () => {
  const { copyGate } = await import("../scripts/content/gates.mjs");
  const corpus = { items: [{ id: "S1", kind: "source", label: "S1 page", text: "Homologous chromosomes are the same length and have genes in exactly the same location" }], missing: [] };
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
});

test("the person's sheet: one row per claim and source; a stale sheet is refused", async () => {
  const id = "biology/ev-sheet", text = store(id, brief(id));
  const { parseTable } = await import("../scripts/growth/sources.mjs");
  E.retrieveAll(id, text, { fetcher });
  const rows = parseTable(E.claimSheet(text, E.loadEvidence(id)));
  assert.deepEqual(Object.keys(rows[0]), E.SHEET_COLUMNS); assert.equal(rows.length, 4 + 2 + 1);
  const filled = rows.map((r) => (r.claim === "F1" && r.source.startsWith("S1") ? { ...r, verdict: "supports", by: "A Reviewer", github: "a-reviewer", on: ON, note: "section 2" } : r));
  assert.deepEqual(E.applySheet(id, text, filled), { applied: 1, problems: [] });
  assert.equal(E.loadEvidence(id).verdicts["F1|S1"].github, "a-reviewer");
  const stale = filled.map((r) => ({ ...r, claim_hash: r.claim === "F1" ? "0000" : r.claim_hash }));
  assert.match(E.applySheet(id, text, stale).problems[0], /changed after the sheet was made/);
  const md = E.evidenceReport(id, text, E.loadEvidence(id), CTX).markdown;
  assert.match(md, /^# Evidence report: biology\/ev-sheet/); assert.match(md, /\| No copying from the whole specification \| yes \| \*\*PASS\*\*/);
});
