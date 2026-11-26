// Connected learning: what the learner's resources have to do with each other, kept in the learner's record
// (kit/data/learner-state.js), so every tool sees the same connections on every device. Resources are named by
// their universal id (kit/core/resource.js).
//
//   Links        link(a, b) between any two resources; linksOf(rid) gives both directions (its backlinks too).
//                A link says who made it: "you", or "source" (a flashcard set made from a lesson, a mind map from
//                a topic) when a tool records where something came from.
//   Collections  a named group of resources from any tool; one resource can be in several.
//   Notes        the learner's own note on any resource (a lesson, a pack, a spec point).
//   Mistakes     a question got wrong, with the lesson that teaches it, until it's got right.
//   Scheduled    a resource put into the plan: the plan block it became, so finishing the resource ticks the block.
//   Suggestions  suggest(resource, candidates) ranks other resources by shared curriculum points, subject, course and
//                title words. Pure, like everything above the "this device" line (tests/links.test.mjs).
import * as LS from "./learner-state.js";
import { resource as R, parseRid } from "../core/resource.js";

// what a link or a collection keeps of a resource, so it can be shown without opening the thing itself
export const summary = (r) => (r ? Object.fromEntries(Object.entries({ rid: r.rid, kind: r.kind, title: r.title, href: r.href, sub: r.sub, subject: r.subject, refs: r.refs }).filter(([, v]) => v != null && v !== "")) : null);
const linkKey = (a, b) => (a < b ? `${a}>${b}` : `${b}>${a}`);   // one link however it was made

// ---------- pure ----------
/** the links that touch `rid`, as the other end with who made the link and which way it points */
export function linksFrom(entries, rid) {
  return entries.filter((l) => l.a.rid === rid || l.b.rid === rid).map((l) => {
    const mine = l.a.rid === rid, other = mine ? l.b : l.a;
    return { other, by: l.by, dir: l.by === "source" ? (mine ? "made-from" : "made-into") : "both", t: l.t };
  }).sort((x, y) => y.t - x.t);
}
const norm = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
const STOP = new Set("a an and the of in on to for with from by is are be what how why when your you it its this that as at or into".split(" "));
export const words = (s) => [...new Set(norm(s).split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w)))];

/**
 * Other resources that go with this one, best first, each with why: the same curriculum point, a title in common,
 * the same course, the same subject. Things already linked are left out. A connection to another subject needs a
 * real overlap (a shared point or two title words), so "related" stays meaningful.
 */
export function suggest(res, candidates = [], { limit = 8, exclude = [] } = {}) {
  if (!res) return [];
  const skip = new Set([res.rid, ...exclude]), mine = words(res.title), refs = new Set(res.refs || []);
  const out = [];
  for (const c of candidates) {
    if (!c?.rid || skip.has(c.rid)) continue;
    skip.add(c.rid);
    const shared = words(c.title).filter((w) => mine.includes(w)), sharedRefs = (c.refs || []).filter((x) => refs.has(x));
    const sameCourse = Boolean(res.course && c.course && res.course === c.course), sameSubject = Boolean(res.subject && c.subject && res.subject === c.subject);
    const otherSubject = res.subject && c.subject && !sameSubject;
    if (otherSubject && !sharedRefs.length && shared.length < 2) continue;
    let score = sharedRefs.length * 5 + shared.length * 2 + (sameCourse ? 1 : 0) + (sameSubject ? 0.5 : 0);
    if (!sharedRefs.length && !shared.length) score = 0;
    if (score <= 0) continue;
    const why = sharedRefs.length ? `Same specification point${sharedRefs.length > 1 ? "s" : ""}: ${sharedRefs.slice(0, 2).join(", ")}` : otherSubject ? `Also in ${c.subject}: ${shared.slice(0, 3).join(", ")}` : `In common: ${shared.slice(0, 3).join(", ")}`;
    out.push({ ...c, score, why, cross: Boolean(otherSubject) });
  }
  return out.sort((a, b) => b.score - a.score).slice(0, limit);
}
/** open mistakes, newest first, grouped by the lesson that teaches them */
export function mistakesByLesson(list) {
  const m = new Map();
  for (const x of list.filter((x) => !x.resolved).sort((a, b) => b.t - a.t)) {
    const k = x.lesson?.rid || "none";
    if (!m.has(k)) m.set(k, { lesson: x.lesson || null, items: [] });
    m.get(k).items.push(x);
  }
  return [...m.values()];
}

// ---------- the learner's record ----------
const links = () => LS.list("link").map((e) => ({ ...e.value, t: e.t }));
export const linksOf = (rid) => linksFrom(links(), rid);
export const isLinked = (a, b) => Boolean(LS.get("link", linkKey(a, b)));
export function link(a, b, { by = "you" } = {}) {
  if (!a?.rid || !b?.rid || a.rid === b.rid) return null;
  return LS.put("link", linkKey(a.rid, b.rid), { a: summary(a), b: summary(b), by });
}
export const unlink = (a, b) => LS.del("link", linkKey(a, b));

export const collections = () => LS.list("collection").map((e) => ({ id: e.key, ...e.value, t: e.t }));
export const itemsOf = (cid) => LS.list("collitem").filter((e) => e.value.cid === cid).map((e) => ({ ...e.value.r, added: e.t }));
export const collectionsOf = (rid) => LS.list("collitem").filter((e) => e.value.r.rid === rid).map((e) => e.value.cid);
export function createCollection(name) {
  const id = `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
  LS.put("collection", id, { name: String(name).trim().slice(0, 80) || "Untitled collection" });
  return id;
}
export const renameCollection = (id, name) => LS.put("collection", id, { ...(LS.get("collection", id) || {}), name: String(name).trim().slice(0, 80) });
export function deleteCollection(id) { LS.batch((b) => { b.del("collection", id); for (const e of LS.list("collitem")) if (e.value.cid === id) b.del("collitem", e.key); }); }
export const addToCollection = (cid, r) => LS.put("collitem", `${cid}|${r.rid}`, { cid, r: summary(r) });
export const removeFromCollection = (cid, rid) => LS.del("collitem", `${cid}|${rid}`);

export const noteOf = (rid) => LS.get("note", rid)?.text || "";
export function setNote(r, text) { const t = String(text || "").trim(); if (!t) LS.del("note", r.rid); else LS.put("note", r.rid, { text: t.slice(0, 4000), r: summary(r) }); }
export const allNotes = () => LS.list("note").map((e) => ({ ...e.value, t: e.t }));

/** a question got wrong (kit/course/course.js record): kept until it's got right */
export function recordMistake({ key, question, lesson, href }) {
  if (!key) return;
  const was = LS.get("mistake", key);
  LS.put("mistake", key, { key, question: String(question || "").slice(0, 200), lesson: summary(lesson), href, times: (was?.resolved ? 0 : was?.times || 0) + 1, resolved: false });
}
export function resolveMistake(key) { const was = LS.get("mistake", key); if (was && !was.resolved) LS.put("mistake", key, { ...was, resolved: true }); }
export const mistakes = () => LS.list("mistake").map((e) => ({ ...e.value, t: e.t }));

/** a resource put into the plan (kit/ui/resource-actions.js), so finishing it can tick the block off */
export const schedule = (r, block) => LS.put("sched", String(block.id), { r: summary(r), block: { id: block.id, day: block.day, start_min: block.start_min, end_min: block.end_min, title: block.title } });
export const scheduledFor = (rid) => LS.list("sched").filter((e) => e.value.r.rid === rid).map((e) => e.value.block);
export const unschedule = (blockId) => LS.del("sched", String(blockId));

/** what changed, for anything showing connections */
export const onConnections = (f) => LS.subscribe((kinds) => { if (!kinds || kinds.some((k) => ["link", "collection", "collitem", "note", "mistake", "sched"].includes(k))) f(); });
export { R as resource, parseRid };
