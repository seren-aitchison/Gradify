// Evidence provenance and approval for research briefs (owner's decisions A–D and P0, 26 Nov 2026). A brief passing its
// format checks (scripts/content/loop.mjs, checkBrief) shows how the evidence is written down; this module shows whether
// it holds up, and gates lesson writing and publishing on a person's approval of it.
//
//   A. retrieval   the engine retrieves each cited source itself and keeps every attempt. The last successful
//                  retrieval is kept when a later attempt fails; the freshness policy (freshnessDays) decides whether
//                  it still counts. A page that came back isn't always the content (bot checks), and retrieving a
//                  page verifies no claim by itself.
//   B. claims      each F, BG, NUM and EXAM line is a claim. A source counts for a claim only when it's fresh, a person
//                  recorded that it supports that claim (bound to the claim's text and the page's fingerprint), it's a
//                  knowledge source (requirement sources such as AQA count only for EXAM lines) and it isn't suspended.
//   C. approval    a person's approval binds every material input (MATERIAL below). Any change voids it, the change is
//                  named, and re-approval must acknowledge each changed input. Checks report PASS, FAIL or NOT RUN; a
//                  mandatory check that didn't run blocks approval and publishing.
//                  Accountability: an approval only unlocks lesson writing or publishing once a live GitHub check
//                  (reviewCheck) finds, on the evidence-review PR opened by the configured GitHub App bot, the
//                  approver's current APPROVED review of a revision carrying this exact approval (approvalId), which
//                  the PR head still carries. Anything it can't establish is NOT RUN and blocks. Expert authority is
//                  separate: only the owner's register (content/reviewers.json) gives it, never a GitHub account.
//   D. copying     every claim line is compared with the whole specification and every retrieved source: runs of
//                  `block` words or more fail, runs of `review` words or more are reported. A screen, not a legal test.
//
// Stored per topic in content/research/<subject>/<topic>.evidence.json (statuses, fingerprints, verdicts, approvals:
// no source text). Retrieved text is cached locally in data/research-cache/ (gitignored: it's the publishers' copyright).
import { readFileSync, existsSync } from "node:fs";
import { spawnSync, execFileSync } from "node:child_process";
import { CONFIG, at, out, load, save, fp, today, briefPath } from "./lib.mjs";
import { parseBrief } from "./shorthand.mjs";
import { SOURCES, sourceFor } from "../../kit/curriculum/sources.js";
import { SUSPENDED, REQUIREMENT_SOURCES, suspensionOf, evidenceKindOf } from "./source-policy.mjs";
import { loadStatements, loadIndex } from "../curriculum/engine.mjs";
import { topicsFor, frameworksFor } from "./queue.mjs";

const EV = { briefPublishers: 3, block: 8, review: 6, freshnessDays: 90, github: { repo: null, prAuthor: null }, thresholds: { standard: { sources: 2, publishers: 2 }, high: { sources: 2, publishers: 2, expert: true }, requirement: { sources: 1, publishers: 1 } }, ...(CONFIG.evidence || {}) };
export const EVIDENCE_RULES = EV;
export const VERDICTS = ["supports", "partly", "does-not-support", "contradicts"];
export const PASS = "PASS", FAIL = "FAIL", NOT_RUN = "NOT RUN";
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const DAY = 864e5, MAX_ATTEMPTS = 10;

export const evidencePath = (topicId) => out(`content/research/${topicId}.evidence.json`);
const cachePath = (url) => out(`data/research-cache/${fp(url)}.txt`);
export const reviewersPath = () => out("content/reviewers.json");
export const loadEvidence = (topicId) => { const e = load(evidencePath(topicId), null) || { topic: topicId, sources: {}, verdicts: {}, approvals: [] }; e.verifications ||= []; return e; };
/** an evidence record's path inside the repository, as GitHub serves it */
export const evidenceRepoPath = (topicId) => `content/research/${topicId}.evidence.json`;
export const saveEvidence = (e) => save(evidencePath(e.topic), e);
export const cachedText = (url) => (existsSync(cachePath(url)) ? readFileSync(cachePath(url), "utf8") : null);

/** the part of a brief an approval binds to: its records, without the engine's stamp line or END */
export const briefBody = (text) => String(text || "").split("\n").filter((l) => !l.trim().startsWith("#")).join("\n").replace(/\n\s*END\s*$/, "").trim();
export const briefHash = (text) => fp(briefBody(text));
const storedBrief = (topicId) => (existsSync(briefPath(topicId)) ? readFileSync(briefPath(topicId), "utf8") : null);

/** the topic's framework and requirement ids: from the topic when given, else from the queue (real topics only) */
export function topicContext(topicId, { topic = null, reqIds = null, fw = null } = {}) {
  if (topic) return { fw: topic.fw, reqIds: topic.reqs.map((r) => r.id).sort() };
  if (reqIds?.length && fw) return { fw, reqIds: [...new Set(reqIds)].sort() };
  const subject = topicId.split("/")[0];
  for (const f of frameworksFor(subject)) { const t = topicsFor(f).find((x) => x.id === topicId); if (t) return { fw: t.fw, reqIds: t.reqs.map((r) => r.id).sort() }; }
  return { fw: fw || null, reqIds: reqIds?.length ? [...new Set(reqIds)].sort() : null };
}

// ---------- A. retrieval ----------
// a page that came back but isn't the content: a bot check, a cookie wall, or next to nothing
const WALL = /reCAPTCHA|Checking your browser|enable JavaScript and cookies|verify you are (a )?human|Access Denied/i;
/** fetch a page's readable text with the engine's reader (scripts/content/fetchtext.sh) */
export function fetchText(url) {
  const r = spawnSync("bash", [at("scripts/content/fetchtext.sh").pathname, url], { encoding: "utf8", timeout: 90_000, env: { ...process.env, MAXLINES: "6000" } });
  const [head = "", ...rest] = String(r.stdout || "").split("\n");
  return { code: Number(head.match(/^HTTP (\d+)/)?.[1] || 0), text: rest.join("\n") };
}
/** one retrieval attempt at a cited source: what happened (never the author's label). src: { id, url } */
export function retrieveSource(src, { fetcher = fetchText, now = new Date() } = {}) {
  const row = sourceFor(src.url), base = { id: src.id, url: src.url, allow: row?.id || null, publisher: row?.owner || null, evidence: evidenceKindOf(row), use: row?.use || null, attemptedAt: now.toISOString() };
  if (!row) return { ...base, retrieval: "rejected", method: "not attempted", reason: "not on the source allowlist (kit/curriculum/sources.js)" };
  if (row.use === "none") return { ...base, retrieval: "rejected", method: "not attempted", reason: `the allowlist says not to use ${row.id}` };
  const s = suspensionOf(row);
  if (s) return { ...base, retrieval: "suspended", method: "not attempted", reason: `suspended by source policy since ${s.since}: ${s.activity} (scripts/content/source-policy.mjs)` };
  const { code, text } = fetcher(src.url), body = String(text || "").trim();
  if (code !== 200) return { ...base, retrieval: "failed", method: "fetchtext.sh", http: code, reason: code ? `HTTP ${code}` : "no response (network or proxy)" };
  if (WALL.test(body.slice(0, 2000)) || body.length < 300) return { ...base, retrieval: "failed", method: "fetchtext.sh", http: code, reason: "the site returned a bot check or an almost empty page, not the content" };
  save(cachePath(src.url), body);
  return { ...base, retrieval: "retrieved", method: "fetchtext.sh", http: code, fingerprint: fp(body), chars: body.length, retrievedAt: now.toISOString() };
}
const good = (r) => r && ["retrieved", "manual"].includes(r.retrieval);
/** add an attempt to a source's record. A failed attempt never erases an earlier success: the success stays as the
 * evidence, the failure is recorded as the latest attempt, and freshness decides whether the success still counts */
export function mergeAttempt(prev, attempt) {
  const log = { at: attempt.attemptedAt, outcome: attempt.retrieval, ...(attempt.http != null ? { http: attempt.http } : {}), ...(attempt.reason ? { reason: attempt.reason } : {}), ...(attempt.fingerprint ? { fingerprint: attempt.fingerprint } : {}) };
  const attempts = [...(prev?.attempts || []), log].slice(-MAX_ATTEMPTS);
  if (attempt.retrieval === "retrieved" || !good(prev) || attempt.url !== prev.url) return { ...attempt, attempts, latest: log };
  return { ...prev, attempts, latest: log };
}
/** retrieve every source a brief cites, into the topic's record */
export function retrieveAll(topicId, briefText, opts = {}) {
  const e = loadEvidence(topicId), parsed = parseBrief(briefText);
  for (const src of parsed.sources) e.sources[src.id] = mergeAttempt(e.sources[src.id], retrieveSource(src, opts));
  saveEvidence(e);
  return e;
}
/** re-retrieve the sources that have evidence behind them (a success or a person's check), keeping history: what
 * approval and publishing run first, so a changed page is seen. Returns the updated record */
export function refreshSources(topicId, briefText, { fetcher = fetchText, now = new Date() } = {}) {
  const e = loadEvidence(topicId), parsed = parseBrief(briefText);
  for (const src of parsed.sources) { const prev = e.sources[src.id]; if (prev?.retrieval === "retrieved") e.sources[src.id] = mergeAttempt(prev, retrieveSource(src, { fetcher, now })); }
  saveEvidence(e); return e;
}
/** a named person opened a source the engine couldn't retrieve (a bot check, say) and records that they did */
export function recordManual(topicId, id, { url, by, on, note, github = null }) {
  if (!String(by || "").trim() || !DATE.test(on || "")) throw new Error("a manual check needs the person (by) and the date (on, YYYY-MM-DD)");
  if (!String(note || "").trim()) throw new Error("a manual check needs a note: how the page was opened and what it is");
  const e = loadEvidence(topicId), row = sourceFor(url), s = suspensionOf(row);
  if (!row) throw new Error(`${url} isn't on the source allowlist`);
  if (s) throw new Error(`${row.id} is suspended by source policy since ${s.since}: it can't be recorded as evidence for new research`);
  const rec = { id, url, allow: row.id, publisher: row.owner, evidence: evidenceKindOf(row), use: row.use, retrieval: "manual", method: "opened by a person", by: by.trim(), ...(github ? { github } : {}), on, note: note.trim(), attemptedAt: new Date().toISOString(), retrievedAt: new Date(`${on}T12:00:00Z`).toISOString() };
  e.sources[id] = mergeAttempt(e.sources[id], rec);
  saveEvidence(e); return e.sources[id];
}
/** is a source's evidence current under the freshness policy? { fresh, age, why } */
export function freshness(rec, now = new Date()) {
  if (!good(rec)) return { fresh: false, why: rec ? `${rec.retrieval}${rec.reason ? `: ${rec.reason}` : ""}` : "not retrieved" };
  const age = Math.floor((now - new Date(rec.retrievedAt || rec.attemptedAt)) / DAY);
  if (age > EV.freshnessDays) return { fresh: false, age, why: `last ${rec.retrieval === "manual" ? "checked by a person" : "retrieved"} ${age} days ago, beyond the ${EV.freshnessDays}-day freshness policy${rec.latest && rec.latest.outcome !== rec.retrieval ? ` (latest attempt: ${rec.latest.outcome}${rec.latest.reason ? `, ${rec.latest.reason}` : ""})` : ""}` };
  return { fresh: true, age, why: rec.latest && rec.latest.outcome !== "retrieved" && rec.retrieval === "retrieved" ? `latest attempt ${rec.latest.outcome}; using the retrieval of ${String(rec.retrievedAt).slice(0, 10)} (${age} days old)` : null };
}

// ---------- B. claims ----------
const TAGS = [["F", "facts"], ["BG", "background"], ["NUM", "nums"], ["EXAM", "exam"]];
const hr = CONFIG.highRisk || { keywords: [], notKeywords: [] };
const highRisk = (text) => { const t = String(text).toLowerCase().replace(new RegExp((hr.notKeywords || []).map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") || "$^", "g"), ""); return (hr.keywords || []).some((k) => t.includes(k)); };
/** the brief's assessable claims: [{ id, tag, text, cites, hash, risk }]. DEF, MIS and VAR lines carry no citations in
 * the format, so they're listed as not assessed rather than counted */
export function claimsOf(parsed) {
  return TAGS.flatMap(([tag, key]) => (parsed[key] || []).map((row, i) => {
    const text = row[0], cites = String(row[1] || "").split(/[ ,]+/).filter(Boolean);
    return { id: `${tag}${i + 1}`, tag, text, cites, hash: fp(`${tag}|${text}`), risk: tag === "EXAM" ? "requirement" : highRisk(text) ? "high" : "standard" };
  }));
}
/** record a person's verdict on whether a source supports a claim (bound to the claim's text and the page's fingerprint) */
export function recordVerdict(e, claim, srcId, { verdict, by, on, note = "", github = null }) {
  if (!VERDICTS.includes(verdict)) throw new Error(`${claim.id} × ${srcId}: verdict must be ${VERDICTS.join(", ")}`);
  if (!String(by || "").trim() || !DATE.test(on || "")) throw new Error(`${claim.id} × ${srcId}: a verdict needs the person (by) and the date (on)`);
  const rec = e.sources[srcId];
  if (!rec) throw new Error(`${claim.id} × ${srcId}: ${srcId} hasn't been retrieved or checked by hand yet`);
  if (!good(rec)) throw new Error(`${claim.id} × ${srcId}: ${srcId} is ${rec.retrieval} (${rec.reason || ""}), so it can't support a claim`);
  e.verdicts[`${claim.id}|${srcId}`] = { claimHash: claim.hash, sourceFingerprint: rec.fingerprint || null, verdict, by: by.trim(), ...(github ? { github } : {}), on, note: String(note).trim() };
}

/** Assess a brief against its evidence record: each claim's support, each source's status, the brief's publishers and
 * whether it's sufficient. Pure apart from reading the parsed brief and the record. */
export function assess(briefText, e, { now = new Date() } = {}) {
  const parsed = parseBrief(briefText), claims = claimsOf(parsed), srcs = new Map(parsed.sources.map((s) => [s.id, s]));
  const recOf = (id) => e.sources[id] || null;
  const valid = (claim, id) => { const v = e.verdicts[`${claim.id}|${id}`], rec = recOf(id); return v && v.claimHash === claim.hash && (rec?.retrieval === "manual" || v.sourceFingerprint === rec?.fingerprint) ? v : null; };
  const rows = claims.map((c) => {
    const support = c.cites.map((id) => {
      const s = srcs.get(id), row = s ? sourceFor(s.url) : null, rec = recOf(id), v = valid(c, id), kind = evidenceKindOf(row), fr = freshness(rec, now);
      // a knowledge claim needs knowledge sources; an EXAM line (what's assessed) may rest on a requirement source
      const rightKind = c.tag === "EXAM" || kind === "knowledge";
      const counts = !!(row && fr.fresh && !suspensionOf(row) && row.use !== "none" && rightKind && v?.verdict === "supports");
      const why = !s ? "not listed in the brief" : !row ? "not on the allowlist" : suspensionOf(row) ? "suspended by source policy" : !rec ? "not retrieved yet" : !fr.fresh ? fr.why : !rightKind ? "a requirement source can't substantiate a subject fact" : !v ? "no person has checked it against this claim" : v.verdict !== "supports" ? `a person found it ${v.verdict}` : "counts";
      return { id, publisher: row?.owner || null, kind, verdict: v?.verdict || null, counts, why };
    });
    const ok = support.filter((x) => x.counts), pubs = new Set(ok.map((x) => x.publisher)), need = EV.thresholds[c.risk];
    const conflict = support.some((x) => x.verdict === "contradicts");
    const status = conflict ? "conflict" : !c.cites.length ? "unsourced" : ok.length >= need.sources && pubs.size >= need.publishers ? "sufficient" : "insufficient";
    return { ...c, support, sources: ok.length, publishers: [...pubs], need, status, expert: !!need.expert && status === "sufficient" };
  });
  const sources = parsed.sources.map((s) => {
    const row = sourceFor(s.url), rec = recOf(s.id), citing = rows.filter((r) => r.cites.includes(s.id)), fr = freshness(rec, now);
    const vs = citing.map((r) => valid(r, s.id)).filter(Boolean), sup = vs.filter((v) => v.verdict === "supports").length;
    const status = !row || row.use === "none" ? "rejected" : suspensionOf(row) ? "suspended" : !rec ? "not retrieved" : rec.retrieval === "rejected" ? "rejected" : !good(rec) ? "unavailable" : !fr.fresh ? "stale"
      : vs.length && !sup ? "rejected" : citing.length && sup === citing.length ? "verified" : sup ? "partially verified" : "unverified";
    return { id: s.id, url: s.url, publisher: row?.owner || null, kind: evidenceKindOf(row), retrieval: rec?.retrieval || "not attempted", latest: rec?.latest?.outcome || null, reason: rec?.reason || null, freshness: fr.why, status, cited: citing.length, supported: sup };
  });
  const knowledgePubs = new Set(rows.filter((r) => r.tag !== "EXAM").flatMap((r) => r.support.filter((x) => x.counts && x.kind === "knowledge").map((x) => x.publisher)));
  const gaps = [
    ...rows.filter((r) => r.status !== "sufficient").map((r) => `${r.id} (${r.risk}) ${r.status}: ${r.sources} counting source${r.sources === 1 ? "" : "s"} from ${r.publishers.length} publisher${r.publishers.length === 1 ? "" : "s"}, needs ${r.need.sources} from ${r.need.publishers}`),
    ...(knowledgePubs.size < EV.briefPublishers ? [`the brief's facts rest on ${knowledgePubs.size} verified independent knowledge publisher${knowledgePubs.size === 1 ? "" : "s"}; the standard is ${EV.briefPublishers}`] : []),
  ];
  return { claims: rows, sources, knowledgePublishers: [...knowledgePubs], notAssessed: { DEF: parsed.defs.length, MIS: parsed.mis.length, VAR: parsed.vars.length }, sufficient: !gaps.length, gaps };
}

// ---------- C. material inputs, checks and approval ----------
/** what an approval binds to in the evidence record: retrievals (by content, not date) and verdicts */
export const evidenceHash = (e) => fp({
  sources: Object.keys(e.sources).sort().map((k) => { const s = e.sources[k]; return [k, s.url, s.retrieval, s.fingerprint || null, s.by || null]; }),
  verdicts: Object.keys(e.verdicts).sort().map((k) => [k, e.verdicts[k].claimHash, e.verdicts[k].sourceFingerprint, e.verdicts[k].verdict, e.verdicts[k].by]),
});
const rowPrint = (r) => fp({ id: r.id, owner: r.owner, urls: r.urls, use: r.use, commercial: r.commercial, text: r.text, figures: r.figures, licence: r.licence?.name, confirmedBy: r.confirmedBy, hold: r.hold || null });
/**
 * Every material input of a topic's research, as named fingerprints (MATERIAL): the brief; the requirements (each
 * statement's fingerprint in the committed index, and the specification's version); each cited source's evidence
 * (content fingerprint, or the person and date of a manual check); the people's verdicts; the source policy; the
 * registry rows the brief cites; and the evidence rules.
 */
export function materialInputs(topicId, briefText, e, ctx) {
  const parsed = parseBrief(briefText), idx = ctx.fw ? loadIndex(ctx.fw) : null, hashes = new Map((idx?.statements || []).map((x) => [`${ctx.fw}:${x.ref}`, x.hash]));
  const rows = [...new Set(parsed.sources.map((s) => sourceFor(s.url)).filter(Boolean))];
  return {
    brief: briefHash(briefText),
    requirements: ctx.fw && ctx.reqIds ? { fw: ctx.fw, version: idx?.version || null, items: Object.fromEntries(ctx.reqIds.map((id) => [id, hashes.get(id) || null])) } : null,
    sources: Object.fromEntries(parsed.sources.map((s) => { const r = e.sources[s.id]; return [s.id, good(r) ? (r.retrieval === "manual" ? `manual:${r.by}:${r.on}` : r.fingerprint) : null]; })),
    verdicts: fp(Object.keys(e.verdicts).sort().map((k) => [k, e.verdicts[k].claimHash, e.verdicts[k].sourceFingerprint, e.verdicts[k].verdict, e.verdicts[k].by])),
    policy: fp({ suspended: SUSPENDED.map((s) => [s.owner, s.since, s.activity]), requirement: [...REQUIREMENT_SOURCES].sort() }),
    registry: Object.fromEntries(rows.map((r) => [r.id, rowPrint(r)])),
    rules: fp(EV),
  };
}
export const MATERIAL = ["brief", "requirements", "sources", "verdicts", "policy", "registry", "rules"];
/** the inputs that differ between an approval and now, each named, with what changed: [{ key, change }] */
export function diffInputs(was, now) {
  const out_ = [];
  if (was.brief !== now.brief) out_.push({ key: "brief", change: "the brief's text changed" });
  const wr = was.requirements, nr = now.requirements;
  if (!wr || !nr) { if (JSON.stringify(wr) !== JSON.stringify(nr)) out_.push({ key: "requirements", change: !nr ? "the requirements couldn't be resolved now" : "the approval recorded no requirements" }); }
  else {
    if (wr.fw !== nr.fw) out_.push({ key: "requirements", change: `framework ${wr.fw} → ${nr.fw}` });
    if (wr.version !== nr.version) out_.push({ key: "requirements", change: `specification version ${wr.version} → ${nr.version}` });
    for (const id of new Set([...Object.keys(wr.items), ...Object.keys(nr.items)])) {
      if (!(id in nr.items)) out_.push({ key: "requirements", change: `${id} is no longer one of the topic's requirements` });
      else if (!(id in wr.items)) out_.push({ key: "requirements", change: `${id} was added to the topic's requirements` });
      else if (wr.items[id] !== nr.items[id]) out_.push({ key: "requirements", change: `${id}'s statement changed (${wr.items[id]} → ${nr.items[id]})` });
    }
  }
  for (const id of new Set([...Object.keys(was.sources || {}), ...Object.keys(now.sources || {})])) {
    const a = was.sources?.[id], b = now.sources?.[id];
    if (a !== b) out_.push({ key: `source:${id}`, change: a == null ? `${id} now has evidence it didn't have` : b == null ? `${id} no longer has usable evidence` : `${id}'s content changed (${a} → ${b})` });
  }
  if (was.verdicts !== now.verdicts) out_.push({ key: "verdicts", change: "the recorded verdicts changed" });
  if (was.policy !== now.policy) out_.push({ key: "policy", change: "the source policy changed (scripts/content/source-policy.mjs)" });
  for (const id of new Set([...Object.keys(was.registry || {}), ...Object.keys(now.registry || {})])) if (was.registry?.[id] !== now.registry?.[id]) out_.push({ key: `registry:${id}`, change: `the registry row ${id} changed (kit/curriculum/sources.js)` });
  if (was.rules !== now.rules) out_.push({ key: "rules", change: "the evidence rules changed (scripts/content/config.json evidence)" });
  return out_;
}

/** the owner's reviewer register: who may give expert approval, in which subjects, on what qualification */
export const loadReviewers = () => load(reviewersPath(), { reviewers: [] }).reviewers || [];
/** expert authority comes only from the register (verifiedBy the owner), matched on the reviewer of a verified review */
export function expertAuthority(login, subject) {
  const r = login && loadReviewers().find((x) => String(x.github).toLowerCase() === login.toLowerCase() && (x.subjects || []).includes(subject) && x.verifiedBy && DATE.test(x.verifiedOn || ""));
  return r ? { status: "established", github: r.github, qualification: r.qualification, verifiedBy: r.verifiedBy, verifiedOn: r.verifiedOn } : { status: "not established", why: login ? `${login} isn't in the reviewer register for ${subject}` : "the review identity isn't verified" };
}

/**
 * Every check on a topic's research, each PASS, FAIL or NOT RUN with why: [{ id, label, mandatory, status, detail }].
 * forPublishing adds the review identity and expert checks.
 */
export function checksOf(topicId, briefText, e, ctx, { now = new Date(), approval = null, review = null, forPublishing = false } = {}) {
  const a = assess(briefText, e, { now }), parsed = parseBrief(briefText), checks = [];
  const add = (id, label, mandatory, status, detail) => checks.push({ id, label, mandatory, status, detail });
  // requirements: the topic's statements must be resolvable in the committed index
  const req = ctx.fw && ctx.reqIds ? ctx.reqIds.filter((id) => !(loadIndex(ctx.fw)?.statements || []).some((x) => `${ctx.fw}:${x.ref}` === id)) : null;
  add("requirements", "Requirements resolved against the specification index", true, !req ? NOT_RUN : req.length ? FAIL : PASS, !req ? "the topic's framework and requirements couldn't be resolved" : req.length ? `not in the index: ${req.join(", ")}` : `${ctx.reqIds.length} requirement(s) of ${ctx.fw}`);
  // sources with evidence must be fresh; a source whose only evidence is stale can't be confirmed, so it's NOT RUN
  const withEvidence = parsed.sources.filter((s) => good(e.sources[s.id])), stale = withEvidence.filter((s) => !freshness(e.sources[s.id], now).fresh);
  add("sources-fresh", "Source evidence is current", true, stale.length ? NOT_RUN : PASS, stale.length ? stale.map((s) => `${s.id}: ${freshness(e.sources[s.id], now).why}`).join("; ") : `${withEvidence.length} source(s) with current evidence`);
  add("evidence", "Evidence meets the standard", true, a.sufficient ? PASS : FAIL, a.sufficient ? `${a.claims.length} claims` : `${a.gaps.length} gap(s)`);
  const corpus = copyCorpus(ctx.fw, e), spec = { items: corpus.items.filter((x) => x.kind === "spec"), missing: [] }, src = { items: corpus.items.filter((x) => x.kind === "source"), missing: [] };
  const specMissing = corpus.missing.filter((m) => m.kind === "spec"), srcMissing = corpus.missing.filter((m) => m.kind === "source");
  const blocks = (c) => copyingReport(briefText, c).filter((m) => m.severity === "block");
  const sb = specMissing.length ? [] : blocks(spec), rb = srcMissing.length ? [] : blocks(src);
  add("copying-spec", "No copying from the whole specification", true, specMissing.length ? NOT_RUN : sb.length ? FAIL : PASS, specMissing.length ? specMissing.map((m) => m.why).join("; ") : sb.length ? sb.map((m) => `line ${m.line}: ${m.words} words of ${m.source}`).join("; ") : `${spec.items.length} statements checked`);
  add("copying-sources", "No copying from the retrieved sources", true, srcMissing.length ? NOT_RUN : rb.length ? FAIL : PASS, srcMissing.length ? srcMissing.map((m) => m.why).join("; ") : rb.length ? rb.map((m) => `line ${m.line}: ${m.words} words of ${m.source}`).join("; ") : `${src.items.length} source text(s) checked`);
  if (forPublishing) {
    const rv = review || (approval ? reviewCheck(topicId, { approval }) : { status: NOT_RUN, detail: "no approval" });
    add("review-identity", "Approval verified by a live GitHub review check", true, rv.status, rv.detail);
    const needsExpert = a.claims.filter((c) => c.need.expert && c.status === "sufficient").map((c) => c.id);
    const ex = expertAuthority(rv.status === PASS ? rv.reviewer : null, topicId.split("/")[0]);
    add("expert", "Expert authority where the content needs it", true, !needsExpert.length ? PASS : ex.status === "established" ? PASS : FAIL, !needsExpert.length ? "no high-risk claims" : ex.status === "established" ? `${ex.github}: ${ex.qualification} (verified by ${ex.verifiedBy})` : `${needsExpert.join(", ")} need an expert: ${ex.why}`);
  }
  return checks;
}
const blocking = (checks, { acceptGaps = false } = {}) => checks.filter((c) => c.mandatory && (c.status === NOT_RUN || (c.status === FAIL && !(acceptGaps && c.id === "evidence"))));

/**
 * A person approves the evidence for a topic's brief as it is now. Sources are re-retrieved first. Refused when a
 * mandatory check didn't run or failed (evidence gaps may be accepted with a reason), and, when an earlier approval
 * exists, until every input that changed since is acknowledged as re-reviewed.
 */
export function approveEvidence(topicId, { by, github = null, on, note = "", acceptGaps = null, acknowledge = [], briefText = storedBrief(topicId), topic = null, reqIds = null, fw = null, fetcher = fetchText, refresh = true, now = new Date() } = {}) {
  if (!String(by || "").trim() || !DATE.test(on || "")) throw new Error("an approval needs the person (by) and the date (on, YYYY-MM-DD)");
  if (!briefText) throw new Error(`${topicId} has no stored research brief to approve`);
  const ctx = topicContext(topicId, { topic, reqIds, fw });
  const e = refresh ? refreshSources(topicId, briefText, { fetcher, now }) : loadEvidence(topicId);
  const checks = checksOf(topicId, briefText, e, ctx, { now }), stop = blocking(checks, { acceptGaps: !!String(acceptGaps || "").trim() });
  if (stop.length) throw new Error(`the evidence for ${topicId} can't be approved:\n  ${stop.map((c) => `${c.status} ${c.label}: ${c.detail}`).join("\n  ")}${checks.find((c) => c.id === "evidence")?.status === FAIL && !acceptGaps ? "\nEvidence gaps may be accepted only with a reason (--accept-gaps \"…\")." : ""}`);
  const inputs = materialInputs(topicId, briefText, e, ctx), last = e.approvals.filter((x) => x.kind === "approval").at(-1);
  // re-approval must show the changed material was reviewed: every changed input acknowledged by key
  if (last?.inputs) {
    const changed = diffInputs(last.inputs, inputs), keys = [...new Set(changed.map((c) => c.key))], missing = keys.filter((k) => !acknowledge.includes(k));
    if (missing.length) throw new Error(`${topicId} was approved before; these inputs changed since and must be re-reviewed and acknowledged (--acknowledge ${missing.join(",")}):\n  ${changed.filter((c) => missing.includes(c.key)).map((c) => `${c.key}: ${c.change}`).join("\n  ")}`);
  }
  const a = assess(briefText, e, { now });
  if (!String(github || "").trim()) throw new Error("an approval needs the approver's GitHub login (--github): their review of the evidence PR is what verifies it");
  const rec = { kind: "approval", inputs, evidenceHash: evidenceHash(e), by: by.trim(), github: github.trim(), on, recordedAt: now.toISOString(), note: String(note).trim(), checks: checks.map(({ id, status }) => ({ id, status })),
    sufficient: a.sufficient, ...(a.sufficient ? {} : { acceptedGaps: a.gaps, acceptGaps: String(acceptGaps).trim() }), ...(last?.inputs ? { acknowledged: acknowledge } : {}) };
  e.approvals.push({ ...rec, approvalId: approvalIdOf(rec) });
  saveEvidence(e); return e.approvals.at(-1);
}
/** the fingerprint of an approval: everything the person approved, nothing added afterwards (verification results are
 * kept alongside, in verifications, so recording one can never change what was approved) */
export const approvalIdOf = (a) => fp({ inputs: a.inputs, by: a.by, github: a.github, on: a.on, recordedAt: a.recordedAt, note: a.note, acceptGaps: a.acceptGaps || null, acknowledged: a.acknowledged || null });
/** withdraw the current approval (kept on record) */
export function revokeEvidence(topicId, { by, on, why, github = null, now = new Date() } = {}) {
  if (!String(by || "").trim() || !DATE.test(on || "") || !String(why || "").trim()) throw new Error("a revocation needs the person (by), the date (on) and the reason (why)");
  const e = loadEvidence(topicId);
  if (!e.approvals.some((x) => x.kind === "approval")) throw new Error(`${topicId} has no approval to revoke`);
  e.approvals.push({ kind: "revocation", by: by.trim(), ...(github ? { github } : {}), on, why: why.trim(), recordedAt: now.toISOString() });
  saveEvidence(e); return e.approvals.at(-1);
}
/** the approval that holds now, or null with why and the exact inputs that changed ({ approval, why, changes }) */
export function approvalOf(topicId, { briefText = storedBrief(topicId), topic = null, reqIds = null, fw = null, now = new Date() } = {}) {
  if (!briefText) return { approval: null, why: "no stored research brief", changes: [] };
  const e = loadEvidence(topicId), last = e.approvals.at(-1);
  if (!last) return { approval: null, why: "the evidence hasn't been approved", changes: [] };
  if (last.kind === "revocation") return { approval: null, why: `the approval was revoked by ${last.by} on ${last.on}: ${last.why}`, changes: [] };
  if (!last.inputs) return { approval: null, why: "the approval predates material-input binding: re-approve it", changes: [] };
  if (!last.approvalId || last.approvalId !== approvalIdOf(last)) return { approval: null, why: last.approvalId ? "the approval record was altered after it was made" : "the approval predates review verification: re-approve it", changes: [] };
  // the approval's own requirement ids are checked against the index as it is now; a topic given adds scope changes
  const known = topicContext(topicId, { topic, reqIds, fw: fw || last.inputs.requirements?.fw });
  const ctx = known.reqIds ? known : { fw: last.inputs.requirements?.fw || null, reqIds: last.inputs.requirements ? Object.keys(last.inputs.requirements.items) : null };
  const changes = diffInputs(last.inputs, materialInputs(topicId, briefText, e, ctx));
  if (changes.length) return { approval: null, why: `inputs changed since it was approved: ${changes.map((c) => c.change).join("; ")}`, changes };
  return { approval: last, why: null, changes: [] };
}
/** the one gate for lesson writing and publishing: the approval holds for every material input, and the live GitHub
 * review check passes. { ok, approval, why, review } */
export function gateState(topicId, o = {}) {
  const ap = approvalOf(topicId, o);
  if (!ap.approval) return { ok: false, approval: null, why: ap.why, review: null, changes: ap.changes };
  const review = reviewCheck(topicId, { approval: ap.approval, ...o });
  return { ok: review.status === PASS, approval: ap.approval, why: review.status === PASS ? null : `review verification ${review.status}: ${review.detail}`, review, changes: [] };
}
export const evidenceApproved = (topicId, o) => gateState(topicId, o).ok;
/** the one sentence every gated path reports */
export const gateNote = (topicId, o) => `${topicId} is awaiting evidence approval (${gateState(topicId, o).why}): run gradify evidence ${topicId}; a person approves it (gradify approve-evidence ${topicId} --by "<name>" --github <login>), reviews the evidence PR the GitHub App opened, and the review is checked with gradify verify-approval ${topicId} --pr <n>`;

/**
 * Before anything is published from a topic: re-retrieve its sources, then the approval must still hold and every
 * publishing check pass (sources current, copying checks run, review identity verified, expert where needed).
 * Returns { ok, reasons, checks }.
 */
export function publishCheck(topicId, { reqIds = null, fw = null, fetcher = fetchText, now = new Date() } = {}) {
  const briefText = storedBrief(topicId);
  if (!briefText) return { ok: false, reasons: ["no stored research brief"], checks: [] };
  refreshSources(topicId, briefText, { fetcher, now });
  const ap = gateState(topicId, { briefText, reqIds, fw, now });
  if (!ap.approval) return { ok: false, reasons: [ap.why], checks: [] };
  const req = ap.approval.inputs.requirements, ctx = { fw: req?.fw || fw, reqIds: req ? Object.keys(req.items) : reqIds };
  const checks = checksOf(topicId, briefText, loadEvidence(topicId), ctx, { now, approval: ap.approval, review: ap.review, forPublishing: true });
  const stop = blocking(checks, { acceptGaps: !ap.approval.sufficient && !!ap.approval.acceptGaps });
  return { ok: !stop.length, reasons: stop.map((c) => `${c.status} ${c.label}: ${c.detail}`), checks };
}

// ---------- review verification (live, against GitHub) ----------
/** a GitHub API client: { pr(n), reviews(n), file(path, ref) }. The default calls the REST API with curl; a token
 * (GITHUB_TOKEN or GH_TOKEN, read-only) is passed on stdin, never in arguments or logs. In a cloud session the
 * network proxy can add the credential instead. Any failure throws, and the check reports NOT RUN */
export function githubClient({ repo = EV.github.repo, token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null } = {}) {
  const call = (path, { raw = false } = {}) => {
    const args = ["-sS", "--max-time", "30", "-w", "\n%{http_code}", "-H", `Accept: application/vnd.github${raw ? ".raw" : ""}+json`, "-H", "X-GitHub-Api-Version: 2022-11-28", ...(token ? ["-H", "@-"] : []), `https://api.github.com/repos/${repo}/${path}`];
    const r = spawnSync("curl", args, { encoding: "utf8", input: token ? `Authorization: Bearer ${token}\n` : undefined, timeout: 45_000 });
    const out_ = String(r.stdout || ""), cut = out_.lastIndexOf("\n"), code = Number(out_.slice(cut + 1)), body = out_.slice(0, cut);
    if (r.status !== 0 || !code) throw new Error("the GitHub API couldn't be reached");
    if (code === 404 && raw) return null;
    if (code !== 200) throw new Error(`the GitHub API answered HTTP ${code}`);
    return raw ? body : JSON.parse(body);
  };
  return {
    repo,
    pr: (n) => call(`pulls/${n}`),
    reviews: (n) => { const all = []; for (let p = 1; p < 20; p++) { const page = call(`pulls/${n}/reviews?per_page=100&page=${p}`); all.push(...page); if (page.length < 100) break; } return all; },
    file: (path, ref) => call(`contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(ref)}`, { raw: true }),
  };
}
let clientOverride = null, githubOverride = null;
/** tests only: a recorded GitHub client and the repository and bot it answers for. Refused outside the Node test
 * runner, so no production path can swap the live check for a recorded one */
export function useGitHubClientForTests(client, github = null) {
  if (!process.env.NODE_TEST_CONTEXT) throw new Error("a recorded GitHub client can only be used inside node --test");
  clientOverride = client; githubOverride = github; reviewCache.clear();
}
const reviewCache = new Map();
/** the current approval in an evidence record as GitHub serves it at a revision: its approvalId, or null */
function approvalIdAt(client, topicId, ref) {
  const text = client.file(evidenceRepoPath(topicId), ref);
  if (text == null) return { found: false };
  let rec; try { rec = JSON.parse(text); } catch { return { found: true, id: null, why: "isn't valid JSON" }; }
  const last = (rec.approvals || []).at(-1);
  return { found: true, id: last?.kind === "approval" ? last.approvalId || null : null, why: last?.kind === "revocation" ? "ends in a revocation" : null };
}
/**
 * The live review check, run by every gate (lesson writing and publishing alike). It establishes, against the GitHub
 * API now: the repository; the PR (opened by the configured GitHub App bot, from that repository, open or merged);
 * its head commit; that the evidence record at the head carries this approval as current; the approver's latest
 * review (by login, never the PR's author, and someone with a role on the repository) is APPROVED, not dismissed or
 * superseded by a later review; and that the
 * reviewed revision carried this same approval. Anything it can't establish is NOT RUN; anything it finds wrong is FAIL.
 * { status, detail, reviewer, pr, headSha, reviewId, reviewCommit }. Results are cached for this process only.
 */
export function reviewCheck(topicId, { approval = null, pr = null, client = null } = {}) {
  approval ||= approvalOf(topicId).approval;
  if (!approval) return { status: NOT_RUN, detail: "no current approval" };
  if (!approval.approvalId) return { status: NOT_RUN, detail: "the approval predates review verification: re-approve it" };
  const e = loadEvidence(topicId), num = pr ?? e.verifications.filter((v) => v.approvalId === approval.approvalId && v.pr).at(-1)?.pr ?? null;
  if (!num) return { status: NOT_RUN, detail: "no evidence-review PR is linked to this approval yet (gradify verify-approval <topic> --pr <n>)" };
  const { repo, prAuthor } = githubOverride || EV.github || {};
  if (!repo || !prAuthor) return { status: NOT_RUN, detail: `the GitHub App isn't configured (scripts/content/config.json evidence.github: repo ${repo || "unset"}, prAuthor ${prAuthor || "unset"})` };
  const key = `${approval.approvalId}|${num}`;
  if (!client && reviewCache.has(key)) return reviewCache.get(key);
  const gh = client || clientOverride || githubClient({ repo });
  const res = (status, detail, extra = {}) => { const r = { status, detail, pr: Number(num), ...extra }; if (!client) reviewCache.set(key, r); return r; };
  try {
    const p = gh.pr(num);
    if (p.base?.repo?.full_name !== repo) return res(FAIL, `PR #${num} is for ${p.base?.repo?.full_name}, not ${repo}`);
    if (p.head?.repo?.full_name !== repo) return res(FAIL, `PR #${num}'s head is in ${p.head?.repo?.full_name || "a deleted fork"}, not ${repo}`);
    if (String(p.user?.login).toLowerCase() !== String(prAuthor).toLowerCase() || p.user?.type !== "Bot") return res(FAIL, `PR #${num} was opened by ${p.user?.login} (${p.user?.type}), not the GitHub App bot ${prAuthor}`);
    if (p.state !== "open" && !p.merged_at) return res(FAIL, `PR #${num} was closed without merging`);
    const headSha = p.head.sha, atHead = approvalIdAt(gh, topicId, headSha);
    if (!atHead.found) return res(FAIL, `the PR head (${headSha.slice(0, 9)}) has no evidence record for ${topicId}`, { headSha });
    if (atHead.id !== approval.approvalId) return res(FAIL, `the evidence record at the PR head (${headSha.slice(0, 9)}) ${atHead.why || `carries approval ${atHead.id || "none"}, not ${approval.approvalId}`}: a changed approval needs a new review`, { headSha });
    const login = String(approval.github || "").toLowerCase();
    if (!login) return res(NOT_RUN, "the approval names no GitHub login", { headSha });
    if (login === String(p.user?.login).toLowerCase()) return res(FAIL, "the approver is the PR's author: an author can't approve their own PR", { headSha });
    // the approver's latest decisive review (a later comment-only review doesn't change it)
    const mine = gh.reviews(num).filter((r) => String(r.user?.login).toLowerCase() === login && ["APPROVED", "CHANGES_REQUESTED", "DISMISSED"].includes(r.state)).sort((a, b) => Date.parse(a.submitted_at) - Date.parse(b.submitted_at));
    const latest = mine.at(-1);
    if (!latest) return res(FAIL, `${approval.github} hasn't approved PR #${num}`, { headSha });
    if (latest.state === "DISMISSED") return res(FAIL, `${approval.github}'s review of PR #${num} was dismissed`, { headSha, reviewId: latest.id });
    if (latest.state === "CHANGES_REQUESTED") return res(FAIL, `${approval.github}'s latest review of PR #${num} requests changes`, { headSha, reviewId: latest.id });
    // a login is only an identity: the reviewer must also hold a role on the repository (anyone can review a public PR)
    if (!["OWNER", "MEMBER", "COLLABORATOR"].includes(latest.author_association)) return res(FAIL, `${approval.github} has no role on ${repo} (GitHub reports ${latest.author_association || "no association"}): only its owner, members or collaborators can approve evidence`, { headSha, reviewId: latest.id });
    const atReview = approvalIdAt(gh, topicId, latest.commit_id);
    if (atReview.id !== approval.approvalId) return res(FAIL, `the revision ${approval.github} approved (${String(latest.commit_id).slice(0, 9)}) doesn't carry this approval${atReview.found ? ` (it has ${atReview.id || "none"})` : " (no evidence record there)"}: it needs a new review`, { headSha, reviewId: latest.id });
    return res(PASS, `${approval.github} approved PR #${num} (${latest.html_url}) at ${String(latest.commit_id).slice(0, 9)}; the head ${headSha.slice(0, 9)} carries the same approval ${approval.approvalId}`, { reviewer: latest.user.login, headSha, reviewId: latest.id, reviewCommit: latest.commit_id, url: latest.html_url });
  } catch (err) { return res(NOT_RUN, `live verification unavailable: ${err.message}`); }
}
/** link an approval to its evidence-review PR and record the live check's result alongside the approval (append-only).
 * Technical authorship (the git commit of the record) is recorded too. Returns the check */
export function verifyApproval(topicId, { pr, client = null, ...o } = {}) {
  if (!Number.isInteger(Number(pr)) || Number(pr) < 1) throw new Error("verify-approval needs the evidence-review PR's number (--pr <n>)");
  const ap = approvalOf(topicId, o);
  if (!ap.approval) throw new Error(`${topicId} has no current approval to verify (${ap.why})`);
  reviewCache.clear();
  const r = reviewCheck(topicId, { approval: ap.approval, pr: Number(pr), client });
  const e = loadEvidence(topicId);
  e.verifications.push({ approvalId: ap.approval.approvalId, pr: Number(pr), status: r.status, detail: r.detail, checkedAt: new Date().toISOString(), ...(r.headSha ? { headSha: r.headSha } : {}), ...(r.reviewId ? { reviewId: r.reviewId, reviewCommit: r.reviewCommit || null, reviewer: r.reviewer || null } : {}), technical: gitAuthor(evidencePath(topicId)) });
  saveEvidence(e); reviewCache.clear();
  return r;
}
/** the author of the last commit that touched a file (technical authorship), or null outside a git checkout */
export function gitAuthor(u) {
  try { const s = execFileSync("git", ["log", "-1", "--format=%H%x09%an%x09%ae", "--", u.pathname], { encoding: "utf8", cwd: at("./").pathname, stdio: ["ignore", "pipe", "ignore"] }).trim(); if (!s) return null; const [commit, name, email] = s.split("\t"); return { commit, name, email }; } catch { return null; }
}

// ---------- D. copying ----------
const words = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
/** the longest run of words a line shares with a text */
function longestRun(a, b) {
  const wa = words(a), wb = words(b); let best = 0, endA = 0;
  const prev = new Array(wb.length + 1).fill(0);
  for (let i = 1; i <= wa.length; i++) { let diag = 0; for (let j = 1; j <= wb.length; j++) { const tmp = prev[j]; prev[j] = wa[i - 1] === wb[j - 1] ? diag + 1 : 0; if (prev[j] > best) { best = prev[j]; endA = i; } diag = tmp; } }
  return { words: best, passage: wa.slice(endA - best, endA).join(" ") };
}
/** the texts a brief or lesson must not copy: every statement of the framework (when its text is imported here) and
 * every retrieved source of the topic. { items: [{ id, kind, label, text }], missing: [{ kind, why }] } */
export function copyCorpus(fw, e = null) {
  const st = fw ? loadStatements(fw) : null, items = [], missing = [];
  if (st?.statements?.some((s) => s.text)) { for (const s of st.statements) if (s.text) items.push({ id: `${fw}:${s.ref}`, kind: "spec", label: `${fw} ${s.ref} (specification)`, text: s.text }); }
  else missing.push({ kind: "spec", why: fw ? `${fw}: the specification's text isn't imported here (node scripts/curriculum/engine.mjs fetch ${fw} && … import ${fw})` : "the topic's framework isn't known" });
  for (const s of Object.values(e?.sources || {})) if (s.retrieval === "retrieved") { const t = cachedText(s.url); if (t) items.push({ id: s.id, kind: "source", label: `${s.id} ${s.url}`, text: t }); else missing.push({ kind: "source", why: `${s.id}: its retrieved text isn't cached here (re-run gradify evidence --retrieve)` }); }
  return { items, missing };
}
/** every line of `text` that shares a run of `review` words or more with the corpus: [{ line, source, words, passage, severity }] */
export function copyingReport(text, corpus, { block = EV.block, review = EV.review, skip = /^\s*(SRC:|#|TOPIC )/ } = {}) {
  const out_ = [];
  String(text || "").split("\n").forEach((l, i) => {
    if (skip.test(l) || words(l).length < review) return;
    let best = null;
    for (const c of corpus.items) { const r = longestRun(l, c.text); if (r.words >= review && (!best || r.words > best.words)) best = { line: i + 1, source: c.label, words: r.words, passage: r.passage }; }
    if (best) out_.push({ ...best, severity: best.words >= block ? "block" : "review" });
  });
  return out_;
}
/** a lesson about to be published, checked for copying against the rest of the specification and the topic's sources:
 * { status: PASS | FAIL | NOT RUN, detail } (a missing specification text is NOT RUN, never a pass) */
export function lessonCopyCheck(text, fw, e, ownIds = []) {
  const c = copyCorpus(fw, e), own = new Set(ownIds); c.items = c.items.filter((x) => !own.has(x.id));
  if (c.missing.length) return { status: NOT_RUN, detail: c.missing.map((m) => m.why).join("; ") };
  const b = copyingReport(text, c).filter((m) => m.severity === "block");
  return b.length ? { status: FAIL, detail: b.map((m) => `line ${m.line}: ${m.words} words of ${m.source}`).join("; ") } : { status: PASS, detail: `${c.items.length} texts checked` };
}

// ---------- the person's tools: a report, a sheet of checks, and applying it ----------
const cell = (v) => { const t = String(v ?? ""); return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
export const SHEET_COLUMNS = ["claim", "risk", "claim_text", "source", "publisher", "kind", "retrieval", "recorded_verdict", "verdict", "note", "by", "github", "on", "claim_hash"];
/** one row per claim and cited source, for a person to check the source and fill in verdict, note, by, github and on */
export function claimSheet(briefText, e) {
  const a = assess(briefText, e), srcs = new Map(a.sources.map((s) => [s.id, s]));
  const rows = a.claims.flatMap((c) => c.cites.map((id) => { const s = srcs.get(id) || {}, x = c.support.find((y) => y.id === id) || {};
    return [c.id, c.risk, c.text, `${id} ${s.url || ""}`.trim(), s.publisher || "", s.kind || "", s.retrieval || "not attempted", x.verdict || "", "", "", "", "", "", c.hash]; }));
  return `${[SHEET_COLUMNS, ...rows].map((r) => r.map(cell).join(",")).join("\n")}\n`;
}
/** record the filled-in rows of a sheet; a row for a claim whose text has changed since the sheet was made is refused */
export function applySheet(topicId, briefText, rows) {
  const e = loadEvidence(topicId), claims = new Map(claimsOf(parseBrief(briefText)).map((c) => [c.id, c])), problems = [];
  let applied = 0;
  for (const r of rows) {
    const v = String(r.verdict || "").trim(); if (!v) continue;
    const c = claims.get(String(r.claim || "").trim()), id = String(r.source || "").trim().split(/\s+/)[0];
    if (!c) { problems.push(`${r.claim}: not a claim of this brief`); continue; }
    if (r.claim_hash && r.claim_hash !== c.hash) { problems.push(`${c.id}: the claim's text changed after the sheet was made: make a new sheet`); continue; }
    if (!c.cites.includes(id)) { problems.push(`${c.id}: doesn't cite ${id}`); continue; }
    try { recordVerdict(e, c, id, { verdict: v, by: r.by, github: String(r.github || "").trim() || null, on: String(r.on || "").trim(), note: r.note }); applied++; } catch (err) { problems.push(err.message); }
  }
  if (!problems.length) saveEvidence(e);
  return { applied, problems };
}
/** the evidence report a person reads before approving: checks, claims, sources, gaps, copying and the approval state */
export function evidenceReport(topicId, briefText, e = loadEvidence(topicId), { fw = null, topic = null } = {}) {
  const ctx = topicContext(topicId, { topic, fw }), a = assess(briefText, e), ap = approvalOf(topicId, { briefText, topic, fw }), checks = checksOf(topicId, briefText, e, ctx);
  const corpus = copyCorpus(ctx.fw, e), copies = copyingReport(briefText, corpus);
  const L = [`# Evidence report: ${topicId}`, "", `Made ${today()} by gradify evidence. ${a.sufficient ? "**The evidence meets the standard.**" : `**The evidence doesn't meet the standard yet: ${a.gaps.length} gap${a.gaps.length === 1 ? "" : "s"}.**`} Approval: ${ap.approval ? `approved by ${ap.approval.by} (${ap.approval.github}) on ${ap.approval.on}${ap.approval.sufficient ? "" : " (gaps accepted)"}; review verification: ${(() => { const r = reviewCheck(topicId, { approval: ap.approval }); return `${r.status}, ${r.detail}`; })()}` : ap.why}.`, ""];
  L.push("## Checks", "", "| Check | Mandatory | Status | Detail |", "|---|---|---|---|", ...checks.map((c) => `| ${c.label} | ${c.mandatory ? "yes" : "no"} | **${c.status}** | ${String(c.detail).replace(/\|/g, "/")} |`), "");
  L.push("## Sources", "", "| Source | Publisher | Kind | Retrieval | Status | Claims supported |", "|---|---|---|---|---|---|",
    ...a.sources.map((s) => `| ${s.id} | ${s.publisher || "?"} | ${s.kind} | ${s.retrieval}${s.reason ? `: ${s.reason}` : ""}${s.latest && s.latest !== s.retrieval ? ` (latest attempt: ${s.latest})` : ""} | ${s.status}${s.freshness ? ` (${s.freshness})` : ""} | ${s.supported} of ${s.cited} |`), "");
  L.push(`Verified independent knowledge publishers behind the facts: ${a.knowledgePublishers.length ? a.knowledgePublishers.join(", ") : "none"} (standard: ${EV.briefPublishers}). Requirement sources (the specification) say what's required, never that a fact is true. Freshness policy: ${EV.freshnessDays} days.`, "");
  L.push("## Claims", "", "| Claim | Risk | Status | Counting | Needs | Why sources don't count |", "|---|---|---|---|---|---|",
    ...a.claims.map((c) => `| ${c.id}: ${c.text.slice(0, 90).replace(/\|/g, "/")}${c.text.length > 90 ? "…" : ""} | ${c.risk} | ${c.status}${c.expert ? " (expert review)" : ""} | ${c.sources} from ${c.publishers.length} | ${c.need.sources} from ${c.need.publishers} | ${c.support.filter((x) => !x.counts).map((x) => `${x.id}: ${x.why}`).join("; ").replace(/\|/g, "/") || "–"} |`), "");
  L.push(`Not assessed (the format gives them no citations): ${a.notAssessed.DEF} definitions, ${a.notAssessed.MIS} misconceptions, ${a.notAssessed.VAR} scope notes. A reviewer reads them against the claims above.`, "");
  if (a.gaps.length) L.push("## Gaps", "", ...a.gaps.map((g) => `- ${g}`), "");
  if (ap.changes?.length) L.push("## Changed since the last approval", "", ...ap.changes.map((c) => `- \`${c.key}\`: ${c.change}`), "");
  L.push("## Copying", "", copies.length ? `${copies.length} line${copies.length === 1 ? "" : "s"} share a run of ${EV.review}+ words with the specification or a retrieved source (${EV.block}+ blocks). A word count is a screen, not a legal test:` : `No line shares a run of ${EV.review}+ words with the texts checked.`, "",
    ...copies.map((m) => `- line ${m.line} · **${m.severity}** · ${m.words} words · ${m.source}: "${m.passage}"`), ...(corpus.missing.length ? ["", "**NOT RUN:**", ...corpus.missing.map((x) => `- ${x.why}`)] : []), "");
  return { markdown: L.join("\n"), assessment: a, copies, checks };
}
