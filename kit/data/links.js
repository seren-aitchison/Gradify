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
 * Other resources that go with this one, best first, each with why. In order of weight: a relationship the curriculum
 * states (rel: "builds-on", this builds on it; "leads-to", it builds on this), the same specification point, shared
 * key terms, the same module or topic of the same course, then words in common in titles and section headings.
 * Things already linked are left out. Another subject needs a real overlap (a shared point or key term, or two
 * title words), so "related" stays meaningful.
 */
const lc = (xs) => new Set((xs || []).map((t) => norm(t).trim()).filter(Boolean));
export function suggest(res, candidates = [], { limit = 8, exclude = [] } = {}) {
  if (!res) return [];
  const skip = new Set([res.rid, ...exclude]), mine = words(res.title), myHead = words((res.headings || []).join(" ")), refs = new Set(res.refs || []), terms = lc(res.terms);
  const out = [];
  for (const c of candidates) {
    if (!c?.rid || skip.has(c.rid)) continue;
    skip.add(c.rid);
    const shared = words(c.title).filter((w) => mine.includes(w)), sharedRefs = (c.refs || []).filter((x) => refs.has(x));
    const sameCourse = Boolean(res.course && c.course && res.course === c.course), sameSubject = Boolean(res.subject && c.subject && res.subject === c.subject);
    const sameUnit = sameCourse && res.unit && c.unit === res.unit, sameModule = sameUnit && res.module && c.module === res.module;
    const otherSubject = res.subject && c.subject && !sameSubject;
    // a key term counts when both have it, or when it's in this one's title as a phrase (two words or more), or as a
    // distinctive word in the same subject. A one-word term like "base" in another subject's lesson isn't a link.
    const myTitle = ` ${norm(res.title)} `;
    const sharedTerms = [...lc(c.terms)].filter((t) => terms.has(t) || (t.includes(" ") && myTitle.includes(` ${t} `)) || (!otherSubject && t.length >= 6 && mine.includes(t)));
    // headings: two words in common, or one within the same topic
    let headWords = words((c.headings || []).join(" ")).filter((w) => (myHead.includes(w) || mine.includes(w)) && !shared.includes(w));
    if (headWords.length < 2 && !sameUnit) headWords = [];
    if (otherSubject && !sharedRefs.length && !sharedTerms.length && shared.length < 2) continue;
    const rel = c.rel === "builds-on" || c.rel === "leads-to";
    let score = (rel ? 8 : 0) + sharedRefs.length * 5 + sharedTerms.length * 4 + (sameModule ? 2.5 : sameUnit ? 1 : 0) + shared.length * 2 + Math.min(3, headWords.length) * 0.75 + (sameCourse ? 0.5 : 0) + (sameSubject ? 0.25 : 0);
    // the course, the unit or the subject alone isn't a reason to suggest something
    if (!rel && !sharedRefs.length && !sharedTerms.length && !shared.length && !headWords.length && !sameModule) score = 0;
    if (score <= 0) continue;
    const list = (xs) => xs.slice(0, 3).join(", ");
    const why = rel ? (c.rel === "builds-on" ? "This lesson builds on it" : "It builds on this lesson")
      : sharedRefs.length ? `Same specification point${sharedRefs.length > 1 ? "s" : ""}: ${sharedRefs.slice(0, 2).join(", ")}`
      : sharedTerms.length ? `${otherSubject ? `Also in ${c.subject}: ` : ""}key term${sharedTerms.length > 1 ? "s" : ""} ${list(sharedTerms)}`
      : sameModule ? `Same topic${c.module ? `: ${c.module}` : ""}`
      : otherSubject ? `Also in ${c.subject}: ${list(shared)}`
      : shared.length ? `In common: ${list(shared)}` : `Covers ${list(headWords)} too`;
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
export function deleteCollection(id) { LS.batch((b) => { b.del("collection", id); for (const e of LS.list("collitem")) if (e.value.cid === id) b.del("collitem", e.key); }); forget(`collection:${id}`); }
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

// ---------- keeping connections true ----------
/**
 * A resource is gone (a map, a Notes page, a flashcard set or card deleted): every link to it, its place in
 * collections, the note on it, its scheduling and its pin go too, so nothing points at something that isn't there.
 */
export function forget(rid, { href = null } = {}) {
  const gone = [];
  for (const e of LS.list("link")) if (e.value.a?.rid === rid || e.value.b?.rid === rid) gone.push(["link", e.key, e.value]);
  for (const e of LS.list("collitem")) if (e.value.r?.rid === rid) gone.push(["collitem", e.key, e.value]);
  for (const e of LS.list("sched")) if (e.value.r?.rid === rid) gone.push(["sched", e.key, e.value]);
  if (LS.get("note", rid)) gone.push(["note", rid, LS.get("note", rid)]);
  if (href && LS.get("pin", href)) gone.push(["pin", href, LS.get("pin", href)]);
  if (gone.length) LS.batch((b) => gone.forEach(([k, key]) => b.del(k, key)));
  return gone;   // what was removed, so an undo can put it back (restore)
}
/** put back what forget removed (the thing came back: an undo) */
export function restore(gone = []) { if (gone.length) LS.batch((b) => gone.forEach(([k, key, v]) => b.put(k, key, v))); }
/** retitled pure: the entries whose copy of this resource's title is out of date, with the new value */
export function staleTitles(entries, rid, title) {
  const out = [];
  for (const e of entries) {
    const v = e.value; if (!v) continue;
    if (e.kind === "link" && (v.a?.rid === rid && v.a.title !== title || v.b?.rid === rid && v.b.title !== title)) out.push([e.kind, e.key, { ...v, a: v.a?.rid === rid ? { ...v.a, title } : v.a, b: v.b?.rid === rid ? { ...v.b, title } : v.b }]);
    else if ((e.kind === "collitem" || e.kind === "note" || e.kind === "sched") && v.r?.rid === rid && v.r.title !== title) out.push([e.kind, e.key, { ...v, r: { ...v.r, title } }]);
  }
  return out;
}
/** renamed (seen when it's opened, or when the learner renames it): every link and collection says the new name */
export function retitle(rid, title) {
  const t = String(title || "").trim(); if (!rid || !t) return 0;
  const all = ["link", "collitem", "note", "sched"].flatMap((k) => LS.list(k).map((e) => ({ kind: k, key: e.key, value: e.value })));
  const stale = staleTitles(all, rid, t);
  if (stale.length) LS.batch((b) => stale.forEach(([k, key, v]) => b.put(k, key, v)));
  return stale.length;
}
