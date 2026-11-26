// Evidence provenance and approval for research briefs (owner's decisions A–D, 26 Nov 2026). A brief passing its format
// checks (scripts/content/loop.mjs, checkBrief) shows how the evidence is written down; this module shows whether it
// holds up, and gates lesson writing on a person's approval of it.
//
//   A. retrieval   the engine retrieves each cited source itself and records what happened (never the author's label):
//                  retrieved, failed (unavailable), suspended (source policy), rejected (not allowed), or manual (a
//                  named person opened it). Retrieving a page doesn't make any claim citing it verified.
//   B. claims      each F, BG, NUM and EXAM line is a claim. A source counts for a claim only when it was retrieved,
//                  a person recorded that it supports that claim (bound to the claim's text and the page's
//                  fingerprint), it's a knowledge source (requirement sources such as AQA count only for EXAM lines)
//                  and it isn't suspended. Publishers are counted, not URLs. Thresholds depend on the claim's risk.
//   C. approval    lesson writing needs a person's approval recorded against the exact brief and evidence: any change
//                  to either voids it, and an approval can be revoked.
//   D. copying     every claim line is compared with the whole specification and every retrieved source: runs of
//                  `block` words or more fail, runs of `review` words or more are reported. A word count is a
//                  screen, not a legal safe harbour.
//
// Stored per topic in content/research/<subject>/<topic>.evidence.json (statuses, fingerprints, verdicts, approvals:
// no source text). Retrieved text is cached locally in data/research-cache/ (gitignored: it's the publishers' copyright).
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { CONFIG, at, out, load, save, fp, today, briefPath } from "./lib.mjs";
import { parseBrief } from "./shorthand.mjs";
import { sourceFor } from "../../kit/curriculum/sources.js";
import { suspensionOf, evidenceKindOf } from "./source-policy.mjs";
import { loadStatements } from "../curriculum/engine.mjs";

const EV = { briefPublishers: 3, block: 8, review: 6, thresholds: { standard: { sources: 2, publishers: 2 }, high: { sources: 2, publishers: 2, expert: true }, requirement: { sources: 1, publishers: 1 } }, ...(CONFIG.evidence || {}) };
export const EVIDENCE_RULES = EV;
export const VERDICTS = ["supports", "partly", "does-not-support", "contradicts"];
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export const evidencePath = (topicId) => out(`content/research/${topicId}.evidence.json`);
const cachePath = (url) => out(`data/research-cache/${fp(url)}.txt`);
export const loadEvidence = (topicId) => load(evidencePath(topicId), null) || { topic: topicId, sources: {}, verdicts: {}, approvals: [] };
export const saveEvidence = (e) => save(evidencePath(e.topic), e);
export const cachedText = (url) => (existsSync(cachePath(url)) ? readFileSync(cachePath(url), "utf8") : null);

/** the part of a brief an approval binds to: its records, without the engine's stamp line or END */
export const briefBody = (text) => String(text || "").split("\n").filter((l) => !l.trim().startsWith("#")).join("\n").replace(/\n\s*END\s*$/, "").trim();
export const briefHash = (text) => fp(briefBody(text));
const storedBrief = (topicId) => (existsSync(briefPath(topicId)) ? readFileSync(briefPath(topicId), "utf8") : null);

// ---------- A. retrieval ----------
// a page that came back but isn't the content: a bot check, a cookie wall, or next to nothing
const WALL = /reCAPTCHA|Checking your browser|enable JavaScript and cookies|verify you are (a )?human|Access Denied/i;
/** fetch a page's readable text with the engine's reader (scripts/content/fetchtext.sh) */
export function fetchText(url) {
  const r = spawnSync("bash", [at("scripts/content/fetchtext.sh").pathname, url], { encoding: "utf8", timeout: 90_000, env: { ...process.env, MAXLINES: "6000" } });
  const [head = "", ...rest] = String(r.stdout || "").split("\n");
  return { code: Number(head.match(/^HTTP (\d+)/)?.[1] || 0), text: rest.join("\n") };
}
/** retrieve one cited source and say what happened. src: { id, url } from the brief */
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
  return { ...base, retrieval: "retrieved", method: "fetchtext.sh", http: code, fingerprint: fp(body), chars: body.length };
}
/** retrieve every source a brief cites, into the topic's record (a source already retrieved with the same text keeps its verdicts) */
export function retrieveAll(topicId, briefText, opts = {}) {
  const e = loadEvidence(topicId), parsed = parseBrief(briefText);
  for (const src of parsed.sources) e.sources[src.id] = retrieveSource(src, opts);
  saveEvidence(e);
  return e;
}
/** a named person opened a source the engine couldn't retrieve (a bot check, say) and records that they did */
export function recordManual(topicId, id, { url, by, on, note }) {
  if (!String(by || "").trim() || !DATE.test(on || "")) throw new Error("a manual check needs the person (by) and the date (on, YYYY-MM-DD)");
  if (!String(note || "").trim()) throw new Error("a manual check needs a note: how the page was opened and what it is");
  const e = loadEvidence(topicId), row = sourceFor(url), s = suspensionOf(row);
  if (!row) throw new Error(`${url} isn't on the source allowlist`);
  if (s) throw new Error(`${row.id} is suspended by source policy since ${s.since}: it can't be recorded as evidence for new research`);
  e.sources[id] = { id, url, allow: row.id, publisher: row.owner, evidence: evidenceKindOf(row), use: row.use, retrieval: "manual", method: "opened by a person", by: by.trim(), on, note: note.trim(), attemptedAt: new Date().toISOString() };
  saveEvidence(e); return e.sources[id];
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
export function recordVerdict(e, claim, srcId, { verdict, by, on, note = "" }) {
  if (!VERDICTS.includes(verdict)) throw new Error(`${claim.id} × ${srcId}: verdict must be ${VERDICTS.join(", ")}`);
  if (!String(by || "").trim() || !DATE.test(on || "")) throw new Error(`${claim.id} × ${srcId}: a verdict needs the person (by) and the date (on)`);
  const rec = e.sources[srcId];
  if (!rec) throw new Error(`${claim.id} × ${srcId}: ${srcId} hasn't been retrieved or checked by hand yet`);
  if (!["retrieved", "manual"].includes(rec.retrieval)) throw new Error(`${claim.id} × ${srcId}: ${srcId} is ${rec.retrieval} (${rec.reason || ""}), so it can't support a claim`);
  e.verdicts[`${claim.id}|${srcId}`] = { claimHash: claim.hash, sourceFingerprint: rec.fingerprint || null, verdict, by: by.trim(), on, note: String(note).trim() };
}

/**
 * Assess a brief against its evidence record: each claim's support, each source's status, the brief's publishers and
 * whether it's sufficient. Pure apart from reading the parsed brief and the record.
 */
export function assess(briefText, e) {
  const parsed = parseBrief(briefText), claims = claimsOf(parsed), srcs = new Map(parsed.sources.map((s) => [s.id, s]));
  const recOf = (id) => e.sources[id] || null;
  const usable = (rec) => rec && ["retrieved", "manual"].includes(rec.retrieval);
  const valid = (claim, id) => { const v = e.verdicts[`${claim.id}|${id}`], rec = recOf(id); return v && v.claimHash === claim.hash && (rec?.retrieval === "manual" || v.sourceFingerprint === rec?.fingerprint) ? v : null; };
  const rows = claims.map((c) => {
    const support = c.cites.map((id) => {
      const s = srcs.get(id), row = s ? sourceFor(s.url) : null, rec = recOf(id), v = valid(c, id), kind = evidenceKindOf(row);
      // a knowledge claim needs knowledge sources; an EXAM line (what's assessed) may rest on a requirement source
      const rightKind = c.tag === "EXAM" || kind === "knowledge";
      const counts = !!(row && usable(rec) && !suspensionOf(row) && row.use !== "none" && rightKind && v?.verdict === "supports");
      const why = !s ? "not listed in the brief" : !row ? "not on the allowlist" : suspensionOf(row) ? "suspended by source policy" : !rec ? "not retrieved yet" : !usable(rec) ? `${rec.retrieval}: ${rec.reason || ""}` : !rightKind ? "a requirement source can't substantiate a subject fact" : !v ? "no person has checked it against this claim" : v.verdict !== "supports" ? `a person found it ${v.verdict}` : "counts";
      return { id, publisher: row?.owner || null, kind, verdict: v?.verdict || null, counts, why };
    });
    const ok = support.filter((x) => x.counts), pubs = new Set(ok.map((x) => x.publisher)), need = EV.thresholds[c.risk];
    const conflict = support.some((x) => x.verdict === "contradicts");
    const status = conflict ? "conflict" : !c.cites.length ? "unsourced" : ok.length >= need.sources && pubs.size >= need.publishers ? "sufficient" : "insufficient";
    return { ...c, support, sources: ok.length, publishers: [...pubs], need, status, expert: !!need.expert && status === "sufficient" };
  });
  // a source's status follows from its retrieval and from what people found when they checked claims against it
  const sources = parsed.sources.map((s) => {
    const row = sourceFor(s.url), rec = recOf(s.id), citing = rows.filter((r) => r.cites.includes(s.id));
    const vs = citing.map((r) => valid(r, s.id)).filter(Boolean), sup = vs.filter((v) => v.verdict === "supports").length;
    const status = !row || row.use === "none" ? "rejected" : suspensionOf(row) ? "suspended" : !rec ? "not retrieved" : rec.retrieval === "failed" ? "unavailable" : rec.retrieval === "rejected" ? "rejected"
      : vs.length && !sup ? "rejected" : citing.length && sup === citing.length ? "verified" : sup ? "partially verified" : "unverified";
    return { id: s.id, url: s.url, publisher: row?.owner || null, kind: evidenceKindOf(row), retrieval: rec?.retrieval || "not attempted", reason: rec?.reason || null, status, cited: citing.length, supported: sup };
  });
  const knowledgePubs = new Set(rows.filter((r) => r.tag !== "EXAM").flatMap((r) => r.support.filter((x) => x.counts && x.kind === "knowledge").map((x) => x.publisher)));
  const gaps = [
    ...rows.filter((r) => r.status !== "sufficient").map((r) => `${r.id} (${r.risk}) ${r.status}: ${r.sources} counting source${r.sources === 1 ? "" : "s"} from ${r.publishers.length} publisher${r.publishers.length === 1 ? "" : "s"}, needs ${r.need.sources} from ${r.need.publishers}`),
    ...(knowledgePubs.size < EV.briefPublishers ? [`the brief's facts rest on ${knowledgePubs.size} verified independent knowledge publisher${knowledgePubs.size === 1 ? "" : "s"}; the standard is ${EV.briefPublishers}`] : []),
  ];
  return { claims: rows, sources, knowledgePublishers: [...knowledgePubs], notAssessed: { DEF: parsed.defs.length, MIS: parsed.mis.length, VAR: parsed.vars.length }, sufficient: !gaps.length, gaps };
}

// ---------- C. approval ----------
/** what an approval binds to in the evidence: retrievals (by content, not date) and verdicts */
export const evidenceHash = (e) => fp({
  sources: Object.keys(e.sources).sort().map((k) => { const s = e.sources[k]; return [k, s.url, s.retrieval, s.fingerprint || null, s.by || null]; }),
  verdicts: Object.keys(e.verdicts).sort().map((k) => [k, e.verdicts[k].claimHash, e.verdicts[k].sourceFingerprint, e.verdicts[k].verdict, e.verdicts[k].by]),
});
/** a person approves the evidence for a topic's brief as it is now. Refused when the evidence is insufficient, unless
 * they accept the gaps with a reason (recorded with the approval) */
export function approveEvidence(topicId, { by, on, note = "", acceptGaps = null, briefText = storedBrief(topicId), now = new Date() } = {}) {
  if (!String(by || "").trim() || !DATE.test(on || "")) throw new Error("an approval needs the person (by) and the date (on, YYYY-MM-DD)");
  if (!briefText) throw new Error(`${topicId} has no stored research brief to approve`);
  const e = loadEvidence(topicId), a = assess(briefText, e);
  if (!a.sufficient && !String(acceptGaps || "").trim()) throw new Error(`the evidence for ${topicId} isn't sufficient (${a.gaps.length} gap${a.gaps.length === 1 ? "" : "s"}):\n  ${a.gaps.join("\n  ")}\nApprove anyway only by accepting the gaps with a reason (--accept-gaps "…").`);
  e.approvals.push({ kind: "approval", briefHash: briefHash(briefText), evidenceHash: evidenceHash(e), by: by.trim(), on, recordedAt: now.toISOString(), note: String(note).trim(), sufficient: a.sufficient, ...(a.sufficient ? {} : { acceptedGaps: a.gaps, acceptGaps: String(acceptGaps).trim() }) });
  saveEvidence(e); return e.approvals.at(-1);
}
/** withdraw the current approval (kept on record) */
export function revokeEvidence(topicId, { by, on, why, now = new Date() } = {}) {
  if (!String(by || "").trim() || !DATE.test(on || "") || !String(why || "").trim()) throw new Error("a revocation needs the person (by), the date (on) and the reason (why)");
  const e = loadEvidence(topicId);
  if (!e.approvals.some((x) => x.kind === "approval")) throw new Error(`${topicId} has no approval to revoke`);
  e.approvals.push({ kind: "revocation", by: by.trim(), on, why: why.trim(), recordedAt: now.toISOString() });
  saveEvidence(e); return e.approvals.at(-1);
}
/** the approval that holds for the topic's brief and evidence as they are now, or null (with why) */
export function approvalOf(topicId, { briefText = storedBrief(topicId) } = {}) {
  if (!briefText) return { approval: null, why: "no stored research brief" };
  const e = loadEvidence(topicId), last = e.approvals.at(-1);
  if (!last) return { approval: null, why: "the evidence hasn't been approved" };
  if (last.kind === "revocation") return { approval: null, why: `the approval was revoked by ${last.by} on ${last.on}: ${last.why}` };
  if (last.briefHash !== briefHash(briefText)) return { approval: null, why: "the brief has changed since it was approved" };
  if (last.evidenceHash !== evidenceHash(e)) return { approval: null, why: "the evidence record has changed since it was approved" };
  return { approval: last, why: null };
}
export const evidenceApproved = (topicId, o) => !!approvalOf(topicId, o).approval;
/** the one sentence every gated path reports */
export const gateNote = (topicId) => `${topicId} is awaiting evidence approval (${approvalOf(topicId).why}): run gradify evidence ${topicId}, then a person approves it with gradify approve-evidence ${topicId} --by "<name>"`;

// ---------- D. copying ----------
const words = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
/** the longest run of words a line shares with a text, with where it starts in the text */
function longestRun(a, b) {
  const wa = words(a), wb = words(b); let best = 0, endA = 0;
  const prev = new Array(wb.length + 1).fill(0);
  for (let i = 1; i <= wa.length; i++) { let diag = 0; for (let j = 1; j <= wb.length; j++) { const tmp = prev[j]; prev[j] = wa[i - 1] === wb[j - 1] ? diag + 1 : 0; if (prev[j] > best) { best = prev[j]; endA = i; } diag = tmp; } }
  return { words: best, passage: wa.slice(endA - best, endA).join(" ") };
}
/** the texts a brief or lesson must not copy: every statement of the framework (when its text is imported here) and
 * every retrieved source of the topic. [{ id, label, text }] plus what couldn't be checked */
export function copyCorpus(fw, e = null) {
  const st = fw ? loadStatements(fw) : null, items = [], missing = [];
  if (st?.statements?.some((s) => s.text)) for (const s of st.statements) if (s.text) items.push({ id: `${fw}:${s.ref}`, label: `${fw} ${s.ref} (specification)`, text: s.text });
  else if (fw) missing.push(`${fw}: the specification's text isn't imported here, so the whole-specification check was skipped`);
  for (const s of Object.values(e?.sources || {})) if (s.retrieval === "retrieved") { const t = cachedText(s.url); if (t) items.push({ id: s.id, label: `${s.id} ${s.url}`, text: t }); else missing.push(`${s.id}: retrieved text isn't cached here`); }
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

// ---------- the person's tools: a report, a sheet of checks, and applying it ----------
const cell = (v) => { const t = String(v ?? ""); return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
export const SHEET_COLUMNS = ["claim", "risk", "claim_text", "source", "publisher", "kind", "retrieval", "recorded_verdict", "verdict", "note", "by", "on", "claim_hash"];
/** one row per claim and cited source, for a person to check the source and fill in verdict, note, by and on */
export function claimSheet(briefText, e) {
  const a = assess(briefText, e), srcs = new Map(a.sources.map((s) => [s.id, s]));
  const rows = a.claims.flatMap((c) => c.cites.map((id) => { const s = srcs.get(id) || {}, x = c.support.find((y) => y.id === id) || {};
    return [c.id, c.risk, c.text, `${id} ${s.url || ""}`.trim(), s.publisher || "", s.kind || "", s.retrieval || "not attempted", x.verdict || "", "", "", "", "", c.hash]; }));
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
    try { recordVerdict(e, c, id, { verdict: v, by: r.by, on: String(r.on || "").trim(), note: r.note }); applied++; } catch (err) { problems.push(err.message); }
  }
  if (!problems.length) saveEvidence(e);
  return { applied, problems };
}
/** the evidence report a person reads before approving: claims, sources, gaps, copying and the approval state */
export function evidenceReport(topicId, briefText, e = loadEvidence(topicId), { fw = null } = {}) {
  const a = assess(briefText, e), ap = approvalOf(topicId, { briefText }), corpus = copyCorpus(fw, e), copies = copyingReport(briefText, corpus);
  const L = [`# Evidence report: ${topicId}`, "", `Made ${today()} by gradify evidence. ${a.sufficient ? "**The evidence meets the standard.**" : `**The evidence doesn't meet the standard yet: ${a.gaps.length} gap${a.gaps.length === 1 ? "" : "s"}.**`} Approval: ${ap.approval ? `approved by ${ap.approval.by} on ${ap.approval.on}${ap.approval.sufficient ? "" : " (gaps accepted)"}` : ap.why}.`, ""];
  L.push("## Sources", "", "| Source | Publisher | Kind | Retrieval | Status | Claims supported |", "|---|---|---|---|---|---|",
    ...a.sources.map((s) => `| ${s.id} | ${s.publisher || "?"} | ${s.kind} | ${s.retrieval}${s.reason ? `: ${s.reason}` : ""} | ${s.status} | ${s.supported} of ${s.cited} |`), "");
  L.push(`Verified independent knowledge publishers behind the facts: ${a.knowledgePublishers.length ? a.knowledgePublishers.join(", ") : "none"} (standard: ${EV.briefPublishers}). Requirement sources (the specification) say what's required, never that a fact is true.`, "");
  L.push("## Claims", "", "| Claim | Risk | Status | Counting | Needs | Why sources don't count |", "|---|---|---|---|---|---|",
    ...a.claims.map((c) => `| ${c.id}: ${c.text.slice(0, 90).replace(/\|/g, "/")}${c.text.length > 90 ? "…" : ""} | ${c.risk} | ${c.status}${c.expert ? " (expert review)" : ""} | ${c.sources} from ${c.publishers.length} | ${c.need.sources} from ${c.need.publishers} | ${c.support.filter((x) => !x.counts).map((x) => `${x.id}: ${x.why}`).join("; ").replace(/\|/g, "/") || "–"} |`), "");
  L.push(`Not assessed (the format gives them no citations): ${a.notAssessed.DEF} definitions, ${a.notAssessed.MIS} misconceptions, ${a.notAssessed.VAR} scope notes. A reviewer reads them against the claims above.`, "");
  if (a.gaps.length) L.push("## Gaps", "", ...a.gaps.map((g) => `- ${g}`), "");
  L.push("## Copying", "", copies.length ? `${copies.length} line${copies.length === 1 ? "" : "s"} share a run of ${EV.review}+ words with the specification or a retrieved source (${EV.block}+ blocks the brief). A word count is a screen, not a legal test:` : `No line shares a run of ${EV.review}+ words with the texts checked.`, "",
    ...copies.map((m) => `- line ${m.line} · **${m.severity}** · ${m.words} words · ${m.source}: "${m.passage}"`), ...(corpus.missing.length ? ["", "Not checked:", ...corpus.missing.map((x) => `- ${x}`)] : []), "");
  return { markdown: L.join("\n"), assessment: a, copies };
}
