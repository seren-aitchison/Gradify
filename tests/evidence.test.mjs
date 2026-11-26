// Evidence provenance and the approval gate (scripts/content/evidence.mjs, owner's decisions A–D and P0, 26 Nov 2026).
// No approval wrappers here: every approval below is made, voided and verified explicitly. A fake fetcher stands in
// for the network, recorded reviews stand in for the GitHub API, and everything is written under a temporary
// GRADIFY_OUT, including the specification text the copying checks need (AQA's own text is never committed).
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
// first, before the evidence module loads: the live GitHub module is replaced by the recorded one (tests only)
import { TRUST, useRecorded } from "./helpers/use-recorded-github.mjs";

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
// a recorded GitHub (the live check's client in these tests): PR #9 on example/gradify, opened by the App's bot. Its
// evidence records are served as they were at each commit: snap() records the sandbox's record at a commit
const REPO = "example/gradify", BOT = "gradify-review-app[bot]", SNAP = new Map();
const snap = (id, sha) => SNAP.set(`${sha}|${E.evidenceRepoPath(id)}`, readFileSync(join(OUT, E.evidenceRepoPath(id)), "utf8"));
const GH = { pr: null, reviews: [], down: false };
const PR = () => ({ number: 9, state: "open", merged_at: null, user: { login: BOT, type: "Bot" }, base: { repo: { full_name: REPO } }, head: { sha: "head1", repo: { full_name: REPO } } });
const resetGH = (over = {}) => Object.assign(GH, { down: false, reviews: [], pr: PR() }, over);
const client = {
  pr: () => { if (GH.down) throw new Error("the GitHub API couldn't be reached"); return GH.pr; },
  reviews: () => GH.reviews,
  file: (path, ref) => SNAP.get(`${ref}|${path}`) ?? null,
};
// GitHub accounts by numeric id: the allowlist pins the reviewer by id, not by login
const ACCOUNT = { "a-reviewer": 501, "someone-else": 502 };
const review = (login, state, commit, at = "2026-11-26T12:00:00Z", id = 1, author_association = "OWNER", user = {}) => ({ id, state, author_association, user: { login, id: ACCOUNT[login] ?? 999, type: "User", ...user }, commit_id: commit, submitted_at: at, html_url: `https://github.com/${REPO}/pull/9#pullrequestreview-${id}` });
const ALLOWED = [{ login: "a-reviewer", id: 501 }];
useRecorded({ trust: { repo: REPO, prAuthor: BOT, reviewers: ALLOWED }, ...client });
/** the approval's record reviewed at commit "rev1" and carried at the head "head1", approved by a-reviewer, then
 * linked and checked; returns the check */
const reviewed = (id) => { snap(id, "rev1"); snap(id, "head1"); resetGH({ reviews: [review("a-reviewer", "APPROVED", "rev1")] }); return E.verifyApproval(id, { pr: 9, ...CTX }); };
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
  assert.ok(!!E.approvalOf(id, CTX).approval);
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
  assert.ok(!!E.approvalOf(id, CTX).approval);
  // the topic's requirements change (scope) or a statement's text changes (the index)
  const wider = E.approvalOf(id, { reqIds: [REQ_A, `${FW}:4.1.2.1.b`], fw: FW });
  assert.equal(wider.approval, null); assert.match(wider.changes[0].change, /4\.1\.2\.1\.b was added to the topic's requirements/);
  assert.ok(!!E.approvalOf(id, CTX).approval, "the approved scope still holds");
  // an AQA statement's text changes: the committed index (read through the sandbox) gives it a new fingerprint
  const idxFile = join(OUT, "kit/curriculum/specs/aqa-gcse-biology.json"); mkdirSync(join(idxFile, ".."), { recursive: true });
  writeFileSync(idxFile, JSON.stringify({ ...IDX, statements: IDX.statements.map((x) => (x.ref === "4.1.2.1.a" ? { ...x, hash: "feedfacefeedface" } : x)) }));
  const was = IDX.statements.find((x) => x.ref === "4.1.2.1.a").hash;
  assert.match(E.approvalOf(id, CTX).changes[0].change, new RegExp(`4\\.1\\.2\\.1\\.a's statement changed \\(${was} → feedfacefeedface\\)`));
  writeFileSync(idxFile, JSON.stringify({ ...IDX, version: "2.0" })); voided("a new specification version", "requirements");
  const { rmSync } = await import("node:fs"); rmSync(idxFile); assert.ok(!!E.approvalOf(id, CTX).approval);
  // the brief
  store(id, text.replace("23 pairs", "twenty-three pairs")); voided("the brief changed", "brief"); store(id, text);
  // the source policy, a registry row, the evidence rules: each is its own named fingerprint
  const ins = E.loadEvidence(id).approvals.at(-1).inputs, row = Object.keys(ins.registry)[0];
  assert.deepEqual(E.diffInputs(ins, { ...ins, policy: "x", rules: "y", registry: { ...ins.registry, [row]: "z" } }).map((c) => c.key).sort(), ["policy", `registry:${row}`, "rules"].sort());
  // and an approval record edited after the fact authorises nothing
  const t = E.loadEvidence(id), keep = t.approvals.at(-1).inputs.policy; t.approvals.at(-1).inputs.policy = "edited"; E.saveEvidence(t);
  assert.match(E.approvalOf(id, CTX).why, /altered after it was made/); t.approvals.at(-1).inputs.policy = keep; E.saveEvidence(t);
  assert.ok(!!E.approvalOf(id, CTX).approval);
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
  assert.equal(reviewed(T.id).status, "PASS", "the approver's review of the App's PR is verified");
  jobs.length = 0; await runTopic(T, { ask, askMany: async () => new Map() });
  assert.ok(jobs.includes("write"), "approved: the writer is asked");
});

test("C. review verification: the live check establishes every point, or reports NOT RUN / FAIL and the gate stays shut", () => {
  const id = "biology/ev-review"; approved(id);
  const check = () => E.reviewCheck(id, { approval: E.approvalOf(id, CTX).approval });
  const expect = (status, re, why) => { const r = check(); assert.equal(r.status, status, `${why}: ${r.detail}`); if (re) assert.match(r.detail, re, why); assert.equal(E.evidenceApproved(id, CTX), status === "PASS", `${why}: the gate`); };
  // nothing linked yet: the claimed login proves nothing
  expect("NOT RUN", /no evidence-review PR is linked/, "an approval alone");
  assert.equal(reviewed(id).status, "PASS"); expect("PASS", /a-reviewer \(GitHub account 501\) approved PR #9 .* at rev1; the head head1 carries the same approval/, "everything established");
  const run = (over, status, re, why) => { resetGH({ reviews: [review("a-reviewer", "APPROVED", "rev1")], ...over }); E.verifyApproval(id, { pr: 9, ...CTX }); expect(status, re, why); };
  // GitHub unavailable, or the App not configured
  run({ down: true }, "NOT RUN", /live verification unavailable: the GitHub API couldn't be reached/, "GitHub unreachable");
  TRUST.prAuthor = null; run({}, "NOT RUN", /GitHub App isn't configured/, "no bot configured"); TRUST.prAuthor = BOT;
  TRUST.reviewers = []; run({}, "NOT RUN", /no reviewer is allowlisted/, "no reviewer allowlisted"); TRUST.reviewers = ALLOWED;
  // the PR itself
  run({ pr: { ...PR(), base: { repo: { full_name: "someone/else" } } } }, "FAIL", /is for someone\/else, not example\/gradify/, "another repository");
  run({ pr: { ...PR(), head: { sha: "head1", repo: { full_name: "fork/gradify" } } } }, "FAIL", /head is in fork\/gradify/, "a fork");
  run({ pr: { ...PR(), user: { login: "seren-example", type: "User" } } }, "FAIL", /opened by seren-example \(User\), not the GitHub App bot/, "opened by a person");
  run({ pr: { ...PR(), user: { login: BOT, type: "User" } } }, "FAIL", /not the GitHub App bot/, "a user named like the bot");
  run({ pr: { ...PR(), state: "closed", merged_at: null } }, "FAIL", /closed without merging/, "closed unmerged");
  run({ pr: { ...PR(), state: "closed", merged_at: "2026-11-27T00:00:00Z" } }, "PASS", null, "merged is fine");
  // the approver's reviews
  run({ reviews: [] }, "FAIL", /hasn't approved PR #9/, "no review");
  run({ reviews: [review("someone-else", "APPROVED", "rev1")] }, "FAIL", /a-reviewer \(GitHub account 501\) hasn't approved/, "an owner or collaborator who isn't allowlisted");
  run({ reviews: [review("a-reviewer", "APPROVED", "rev1", undefined, 1, "OWNER", { id: 999 })] }, "FAIL", /hasn't approved/, "another account using (or reclaiming) the allowlisted login");
  run({ reviews: [review("a-reviewer", "APPROVED", "rev1", undefined, 1, "OWNER", { login: "a-reviewer-renamed" })] }, "FAIL", /GitHub account 501 is now a-reviewer-renamed, not a-reviewer: the allowlist needs updating/, "the allowlisted account renamed");
  run({ reviews: [review("a-reviewer", "APPROVED", "rev1", undefined, 1, "OWNER", { type: "Bot" })] }, "FAIL", /is a Bot, not a person/, "an approval by a bot account");
  // the allowlist decides who may approve, not the login written in the record
  TRUST.reviewers = [{ login: "someone-else", id: 502 }]; run({}, "FAIL", /a-reviewer isn't an allowlisted reviewer .*only someone-else can approve/, "the record's approver is no longer allowlisted"); TRUST.reviewers = ALLOWED;
  assert.throws(() => E.approveEvidence(id, { by: "S Else", github: "someone-else", on: ON, acceptGaps: "x", fetcher, acknowledge: ["verdicts"], ...CTX }), /someone-else isn't an allowlisted reviewer/, "approval refuses an approver who isn't allowlisted");
  run({ reviews: [review("a-reviewer", "DISMISSED", "rev1")] }, "FAIL", /was dismissed/, "dismissed");
  run({ reviews: [review("a-reviewer", "APPROVED", "rev1", undefined, 1, "NONE")] }, "FAIL", /has no role on example\/gradify \(GitHub reports NONE\)/, "an approval from someone with no role on the repository");
  run({ reviews: [review("a-reviewer", "APPROVED", "rev1", undefined, 1, "CONTRIBUTOR")] }, "FAIL", /has no role/, "a past contributor isn't a reviewer");
  run({ reviews: [review("a-reviewer", "APPROVED", "rev1", undefined, 1, "COLLABORATOR")] }, "PASS", null, "the allowlisted reviewer as a collaborator");
  run({ reviews: [review("a-reviewer", "APPROVED", "rev1"), review("a-reviewer", "CHANGES_REQUESTED", "head1", "2026-11-26T13:00:00Z", 2)] }, "FAIL", /requests changes/, "superseded by changes requested");
  run({ reviews: [review("a-reviewer", "APPROVED", "rev1"), review("a-reviewer", "COMMENTED", "head1", "2026-11-26T13:00:00Z", 2)] }, "PASS", null, "a later comment doesn't supersede an approval");
  run({ reviews: [review("a-reviewer", "APPROVED", "old0")] }, "FAIL", /approved \(old0\) doesn't carry this approval \(no evidence record there\)/, "the reviewed revision lacked the record");
  // the record at the head
  SNAP.delete(`head1|${E.evidenceRepoPath(id)}`); run({}, "FAIL", /has no evidence record/, "the head has no record"); snap(id, "head1");
  // the approver can't be the PR's author
  run({ pr: { ...PR(), user: { login: "a-reviewer", type: "Bot" } } }, "FAIL", /not the GitHub App bot/, "a PR opened by the reviewer");
  run({ pr: { ...PR(), user: { login: BOT, type: "Bot", id: 501 } } }, "FAIL", /author can't approve their own PR/, "self-approval: the reviewer's own account is the PR's author");
  run({}, "PASS", null, "back to everything established");
  // a new approval (a material change re-approved) needs a new review: the old review was of a different approvalId
  const e = E.loadEvidence(id); E.recordVerdict(e, E.assess(E.loadEvidence(id) && readFileSync(join(OUT, `content/research/${id}.txt`), "utf8"), e).claims[1], "S1", { verdict: "partly", by: "B Reviewer", on: ON }); E.saveEvidence(e);
  assert.equal(E.evidenceApproved(id, CTX), false, "the verdict change voids the approval");
  E.approveEvidence(id, { by: "A Reviewer", github: "a-reviewer", on: ON, acceptGaps: "x", fetcher, acknowledge: ["verdicts"], ...CTX });
  E.verifyApproval(id, { pr: 9, ...CTX });
  expect("FAIL", /carries approval [0-9a-f]+, not [0-9a-f]+: a changed approval needs a new review/, "the PR head still carries the old approval");
  snap(id, "head1"); E.verifyApproval(id, { pr: 9, ...CTX });
  expect("FAIL", /approved \(rev1\) doesn't carry this approval/, "the head is updated but the old review was of the old approval");
  snap(id, "rev2"); resetGH({ reviews: [review("a-reviewer", "APPROVED", "rev1"), review("a-reviewer", "APPROVED", "rev2", "2026-11-26T14:00:00Z", 3)] }); E.verifyApproval(id, { pr: 9, ...CTX });
  expect("PASS", null, "re-reviewed: the new approval is verified");
  // tampering: an edited approval record no longer matches its own fingerprint
  const t = E.loadEvidence(id); t.approvals.at(-1).note = "edited later"; E.saveEvidence(t);
  assert.match(E.approvalOf(id, CTX).why, /altered after it was made/);
  // every check is kept alongside the approval: nothing overwritten
  assert.ok(E.loadEvidence(id).verifications.length >= 25); assert.ok(E.loadEvidence(id).approvals.length >= 2);
});

test("C. writing and publishing use the same review gate; expert authority stays separate from a GitHub review", async () => {
  const req = { id: REQ_A, ref: "4.1.2.1.a", asks: "x", text: null, title: "Gate", type: "concept", status: "official", hash: "h1" };
  const T = { id: "biology/ev-same-gate", subject: "biology", fw: FW, section: "4.1.2.1", title: "Same gate", level: "GCSE", country: "uk", reqs: [req], reuse: [] };
  const text = approved(T.id), jobs = [], ask = async (job) => { jobs.push(job); return job === "research" ? text : "## A lesson\nEND"; };
  // approved, but no verified review: writing is refused exactly as publishing is
  let r = await runTopic(T, { ask, askMany: async () => new Map() });
  assert.equal(r.status, "awaiting-approval"); assert.match(r.awaiting, /review verification NOT RUN: no evidence-review PR is linked/); assert.ok(!jobs.includes("write"));
  assert.match(E.publishCheck(T.id, { ...CTX, fetcher }).reasons[0], /NOT RUN Approval verified by a live GitHub review check: no evidence-review PR is linked/);
  // a dismissed review shuts both
  reviewed(T.id); resetGH({ reviews: [review("a-reviewer", "DISMISSED", "rev1")] }); E.verifyApproval(T.id, { pr: 9, ...CTX });
  r = await runTopic(T, { ask, askMany: async () => new Map() }); assert.match(r.awaiting, /was dismissed/);
  assert.match(E.publishCheck(T.id, { ...CTX, fetcher }).reasons[0], /was dismissed/);
  // verified: both open
  assert.equal(reviewed(T.id).status, "PASS");
  jobs.length = 0; await runTopic(T, { ask, askMany: async () => new Map() }); assert.ok(jobs.includes("write"), "writing proceeds");
  assert.ok(E.publishCheck(T.id, { ...CTX, fetcher }).ok, "publishing proceeds");
  // a high-risk claim needs expert authority: a verified GitHub review isn't a qualification
  const hid = "biology/ev-expert", htext = store(hid, brief(hid, "A drug dose depends on the patient's chromosomes and genes."));
  const e = E.retrieveAll(hid, htext, { fetcher }), c = E.assess(htext, e).claims;
  for (const [cl, s] of [[c[0], "S1"], [c[0], "S2"], [c[2], "S5"]]) E.recordVerdict(e, cl, s, { verdict: "supports", by: "A Reviewer", on: ON }); E.saveEvidence(e);
  E.approveEvidence(hid, { by: "A Reviewer", github: "a-reviewer", on: ON, acceptGaps: "x", fetcher, ...CTX });
  assert.equal(reviewed(hid).status, "PASS");
  assert.ok(E.publishCheck(hid, { ...CTX, fetcher }).reasons.some((x) => /^FAIL Expert authority .*a-reviewer isn't in the reviewer register for biology/.test(x)));
  writeFileSync(join(OUT, "content/reviewers.json"), JSON.stringify({ reviewers: [{ github: "a-reviewer", name: "Dr A Reviewer", subjects: ["biology"], qualification: "PhD genetics; GCSE examiner", verifiedBy: "owner", verifiedOn: ON }] }));
  assert.ok(E.publishCheck(hid, { ...CTX, fetcher }).ok, "with the owner's register entry, expert authority is established");
});

test("C. revocation is kept on record and shuts writing and publishing at once", () => {
  const id = "biology/ev-revoke"; approved(id); assert.equal(reviewed(id).status, "PASS");
  assert.ok(E.evidenceApproved(id, CTX));
  E.revokeEvidence(id, { by: "B Reviewer", on: ON, why: "S1 is a review article" });
  assert.equal(E.evidenceApproved(id, CTX), false); assert.match(E.publishCheck(id, { ...CTX, fetcher }).reasons[0], /revoked by B Reviewer/);
});

test("production verification can't be handed a recorded client, by a variable, an option or a stored result", async () => {
  const { spawnSync } = await import("node:child_process"), ROOT_ = new URL("../", import.meta.url).pathname;
  // a topic approved and verified here (recorded GitHub), so its record carries a stored PASS verification
  const id = "biology/ev-live-only"; approved(id); assert.equal(reviewed(id).status, "PASS"); assert.ok(E.evidenceApproved(id, CTX));
  // the same sandbox in a fresh process that loads the real modules, with the test runner's own variable set and a
  // would-be client passed as an option: the evidence module has no override, the stored PASS counts for nothing, and
  // the live check runs against the committed configuration (no App yet, so NOT RUN and the gate shut)
  const script = `const E = await import("./scripts/content/evidence.mjs"), G = await import("./scripts/content/github-review.mjs");
    const fake = { pr: () => ({}), reviews: () => [], file: () => null };
    console.log(JSON.stringify({ exports: Object.keys(G).sort(), frozen: Object.isFrozen(G.TRUST) && Object.isFrozen(G.TRUST.reviewers), reviewers: G.TRUST.reviewers,
      overrides: Object.keys(E).filter((k) => /ForTests|override|recorded|mock|fake/i.test(k)),
      check: E.reviewCheck(${JSON.stringify(id)}, { pr: 9, client: fake }), gate: E.evidenceApproved(${JSON.stringify(id)}, ${JSON.stringify(CTX)}) }));`;
  const r = spawnSync(process.execPath, ["--input-type=module", "-e", script], { cwd: ROOT_, env: { ...process.env, NODE_TEST_CONTEXT: "child-v8", GRADIFY_OUT: OUT }, encoding: "utf8" });
  const o = JSON.parse(r.stdout || "{}");
  assert.deepEqual(o.exports, ["TRUST", "githubClient"], "the live module exports the trust anchors and the live client only");
  assert.ok(o.frozen, "the trust anchors can't be changed at run time");
  assert.deepEqual(o.reviewers, [{ login: "seren-aitchison", id: 161163640 }], "the committed allowlist is the owner's account only");
  assert.deepEqual(o.overrides, [], "the evidence module exports no test or override hook");
  assert.equal(o.check.status, "NOT RUN"); assert.match(o.check.detail, /GitHub App isn't configured/);
  assert.equal(o.gate, false, "a stored PASS from a recorded review unlocks nothing outside the test that made it");
  // no production file mentions the test runner's variable or the recorded module
  const { readdirSync } = await import("node:fs");
  for (const dir of ["scripts", "kit"]) for (const f of readdirSync(join(ROOT_, dir), { recursive: true })) if (/\.(m?js|cjs)$/.test(f)) {
    const src = readFileSync(join(ROOT_, dir, f), "utf8");
    assert.ok(!/NODE_TEST_CONTEXT|recorded-github|use-recorded-github|tests\/helpers/.test(src), `${dir}/${f} refers to a test hook`);
  }
  // and the recorded GitHub itself won't serve a run outside a sandbox
  const env = { ...process.env }; delete env.GRADIFY_OUT;
  const r2 = spawnSync(process.execPath, ["--input-type=module", "-e", 'const R = await import("./tests/helpers/recorded-github.mjs"); try { R.githubClient(); console.log("served"); } catch (e) { console.log(e.message); }'], { cwd: ROOT_, env, encoding: "utf8" });
  assert.match(r2.stdout, /serves sandboxed test runs only/);
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
