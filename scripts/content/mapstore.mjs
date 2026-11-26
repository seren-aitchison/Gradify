// The mapping store: one file per framework, kit/curriculum/maps/<framework>.json, and the only place a decision about
// whether a lesson teaches a requirement is kept (decision 6, owner, 25 Nov 2026). Each statement's link has one status:
//   proposed       the matcher's candidates (scripts/curriculum/engine.mjs propose): never coverage
//   ai-confirmed   an AI reviewer said a lesson teaches it, naming the objectives: "Mapped, not independently
//                  verified" to learners. Evidence for a person's review only: never coverage, never stops writing
//   rejected       an AI reviewer found the candidate doesn't teach it; `missing` says what isn't taught
//   verified       a named person checked it (engine.mjs review): "Independently verified"; never overwritten by an AI
// Only a person's confirmation is coverage (owner, 26 Nov 2026). The three stages, for each statement on its own:
//   proposed       the matcher found a candidate lesson                    not taught; the statement is written
//   ai-checked     an AI reviewer judged it: status ai-confirmed or rejected not taught; the statement is written
//   human-confirmed status verified, with at least one lesson teaching all of it (coverage "full"): taught, so the
//                  statement isn't written. A verified "partial" or "missing" is written, with the reviewer's note.
// AI confidence and a person's decision are kept in separate fields: an AI check never becomes a verification, and a
// verification keeps the AI check it was made after (`aiCheck`) as evidence. A person can revoke a verification
// (engine.mjs apply, decision "revoke"): the statement goes back to proposed and the revocation is kept (`revoked`).
// A decision holds for the statement text it was made on (`hash`): when the statement changes, it reads as undecided.
// The matcher's candidates are kept under `candidates` once a decision is made, as the evidence it was made from.
// Decisions made before this store existed were kept in content/mapping/<framework>.json; they're folded in on read
// and that file is removed the next time the store is saved, so there is never a second place to look.
import { existsSync, rmSync } from "node:fs";
import { out, load, save } from "./lib.mjs";
import { loadMap } from "../curriculum/engine.mjs";

export const STATUSES = ["proposed", "ai-confirmed", "rejected", "verified"];
export const storePath = (fw) => out(`kit/curriculum/maps/${fw}.json`);
export const legacyPath = (fw) => out(`content/mapping/${fw}.json`);

/** a framework's store: the engine's working copy (GRADIFY_OUT in tests) or the committed one, legacy decisions folded in */
export function loadStore(fw) {
  const m = structuredClone(load(storePath(fw)) || loadMap(fw) || { spec: fw, links: {} });
  m.links ||= {};
  const legacy = load(legacyPath(fw));
  if (legacy?.confirmed) foldLegacy(m, legacy.confirmed);
  return m;
}
/** save the store; the legacy decisions file has been folded in, so it goes */
export function saveStore(fw, m) {
  save(storePath(fw), m);
  if (existsSync(legacyPath(fw))) rmSync(legacyPath(fw));
}
/** fold content/mapping decisions into the store (idempotent: a decision already in the store is kept) */
export function consolidate(fw) {
  const had = existsSync(legacyPath(fw)), m = loadStore(fw);
  if (had) saveStore(fw, m);
  return { folded: had, counts: countsOf(m) };
}

/**
 * Record an AI reviewer's decision on one statement. d: { ok, lesson, objectives, why, hash, by, on, coverage }.
 * A person's verification is never replaced by an AI decision.
 */
export function decide(m, ref, d) {
  const prev = m.links[ref] || { status: "proposed", lessons: [] };
  if (prev.status === "verified") return prev;
  const candidates = prev.candidates || (prev.status === "proposed" ? prev.lessons || [] : []);
  const base = { ...(prev.proposedBy ? { proposedBy: prev.proposedBy } : {}), ...(prev.confidence ? { confidence: prev.confidence } : {}), candidates, ...(prev.nearest ? { nearest: prev.nearest } : {}),
    ...(d.hash ? { hash: d.hash } : {}), ...(d.by ? { by: d.by } : {}), ...(d.on ? { on: d.on } : {}), ...(prev.revoked ? { revoked: prev.revoked } : {}) };
  m.links[ref] = d.ok
    ? { status: "ai-confirmed", ...base, lessons: [{ id: d.lesson, coverage: d.coverage || "full", objectives: d.objectives || [] }] }
    : { status: "rejected", ...base, lessons: [], missing: [d.why || "not taught"], ...(d.lesson ? { rejectedLesson: d.lesson } : {}) };
  return m.links[ref];
}
function foldLegacy(m, confirmed) {
  for (const [ref, c] of Object.entries(confirmed)) {
    const cur = m.links[ref];
    if (cur && cur.status !== "proposed") continue;
    decide(m, ref, { ok: !!c.ok && !!c.lesson, lesson: c.lesson, objectives: c.objectives, why: c.why, hash: c.hash, by: c.by || "agent", on: c.on });
  }
}

/**
 * A lesson the content engine wrote for a statement, passed its gates and AI review, and published: a provisional link
 * (an AI-checked match, never coverage). d: { lesson, coverage, objectives, hash, by, on }. A person's verification is
 * never touched; an AI-checked link on the same text gains this lesson beside the ones it had.
 */
export function linkPublished(m, ref, d) {
  const prev = m.links[ref];
  if (prev?.status === "verified") return prev;
  const entry = { id: d.lesson, coverage: d.coverage || "full", objectives: d.objectives || [], published: true };
  if (prev?.status === "ai-confirmed" && (!prev.hash || prev.hash === d.hash)) {
    prev.lessons = [...(prev.lessons || []).filter((l) => l.id !== d.lesson), entry];
    return prev;
  }
  const l = decide(m, ref, { ok: true, lesson: d.lesson, objectives: d.objectives, coverage: entry.coverage, hash: d.hash, by: d.by, on: d.on });
  l.lessons = [entry];
  return l;
}

/** the statement's decision if it holds for this text (a decision recorded without a hash still counts), else null */
export function decisionOf(m, ref, hash) {
  const l = m?.links?.[ref];
  if (!l || l.status === "proposed") return null;
  if (l.status === "verified") return l.hash === hash ? l : null;
  return !l.hash || l.hash === hash ? l : null;
}
/**
 * Is the statement taught, as far as the engine may act on it? Only when a person confirmed, for this statement and its
 * current text, that a lesson teaches all of it. Everything else (proposed, AI-checked, verified partial or missing) is
 * uncovered: it's written, and it never counts towards verified coverage.
 */
export function confirmedTaught(m, ref, hash) {
  const d = decisionOf(m, ref, hash);
  return !!d && d.status === "verified" && (d.lessons || []).some((l) => l.coverage === "full");
}
/** a link's candidate lessons: the matcher's, kept as evidence once a decision is made */
export const candidatesOf = (l) => (l?.candidates?.length ? l.candidates : l?.status === "proposed" ? l.lessons || [] : []);

export function countsOf(m) {
  const c = Object.fromEntries(STATUSES.map((s) => [s, 0]));
  for (const l of Object.values(m.links || {})) c[l.status] = (c[l.status] || 0) + 1;
  return c;
}
