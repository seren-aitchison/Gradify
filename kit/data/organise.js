// Organising: folders, tags and the curriculum, kept apart on purpose.
//
//   Folders     where the learner keeps things ("My mock exam revision"). A folder is a collection (kit/data/links.js);
//               folders can sit inside folders, have a colour, an icon and a description, be archived, or be smart
//               (filled by a search: "type:flashcards tag:difficult done:no"). One thing can be in several folders
//               without being copied: a folder holds a reference to it.
//   Tags        what a thing is like ("difficult", "priority", "homework", "memorise"): the learner's own labels,
//               any number per thing, the same tag across every tool.
//   Curriculum  what it teaches (AQA GCSE Chemistry › 4.6 › 4.6.2): set by Gradify from the course and the
//               specification, never by filing. Shown beside the other two, never mixed with them.
//
// The same lesson can be in "Mock revision", tagged "difficult" and mapped to 4.6.2, as one thing.
//
// Everything in the learner's record (kit/data/learner-state.js) syncs: folders ("collection", "collitem") and tags
// ("tag", one entry per tagged thing). Recently deleted is kept on this device for 30 days ("gradify.trash").
// The functions above "the learner's record" are pure (tests/organise.test.mjs).
import * as LS from "./learner-state.js";
import { summary, collections, itemsOf, addToCollection, removeFromCollection, deleteCollection } from "./links.js";
import { KINDS, parseRid } from "../core/resource.js";

const fold = (s) => String(s ?? "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();
const words = (s) => fold(s).match(/[a-z0-9]+/g)?.filter((w) => w.length > 2 && !STOP.has(w)) || [];
const STOP = new Set("the and for with from your you this that what how why are was its into about over under their them then than notes note set sets flashcards flashcard lesson lessons collection folder copy".split(" "));

// ---------- folders: colour, icon, the tree ----------
export const COLOURS = [["", "None"], ["slate", "#64748b"], ["red", "#ef4444"], ["orange", "#f97316"], ["amber", "#f59e0b"], ["green", "#22c55e"], ["teal", "#14b8a6"], ["blue", "#3b82f6"], ["violet", "#8b5cf6"], ["pink", "#ec4899"]];
export const colourOf = (name) => COLOURS.find(([n]) => n === name)?.[1] || null;
// folder icons: from the shared set (kit/ui/icons.js)
export const FOLDER_ICONS = ["inbox", "book", "cards", "notes", "target", "flag", "star", "trophy", "clock", "bolt", "sparkles", "chart", "grid", "bookmarked", "flame", "home"];

/** folders as a tree, each with its children, in the learner's order (then by name). Pure. */
export function tree(cols = [], { archived = false } = {}) {
  const live = cols.filter((c) => archived || !c.archived);
  const ids = new Set(live.map((c) => c.id));
  const kids = new Map();
  const by = new Map(live.map((c) => [c.id, c]));
  // a folder whose parents loop back to it (two devices nesting each into the other) is put at the top
  const loops = (c) => { const seen = new Set([c.id]); for (let p = by.get(c.parent); p; p = by.get(p.parent)) { if (seen.has(p.id)) return true; seen.add(p.id); } return false; };
  for (const c of live) { const p = c.parent && ids.has(c.parent) && !loops(c) ? c.parent : null; if (!kids.has(p)) kids.set(p, []); kids.get(p).push(c); }
  const sort = (xs) => xs.sort((a, b) => (a.order ?? 1e9) - (b.order ?? 1e9) || String(a.name).localeCompare(String(b.name)));
  const build = (p, depth = 0, seen = new Set()) => sort(kids.get(p) || []).filter((c) => !seen.has(c.id)).map((c) => { seen.add(c.id); return { ...c, depth, children: build(c.id, depth + 1, seen) }; });
  return build(null);
}
/** a folder and the folders above it, outermost first (for breadcrumbs). Pure. */
export function pathOf(cols = [], id) {
  const by = new Map(cols.map((c) => [c.id, c])), out = [], seen = new Set();
  for (let c = by.get(id); c && !seen.has(c.id); c = c.parent ? by.get(c.parent) : null) { seen.add(c.id); out.unshift(c); }
  return out;
}
/** every folder inside this one, at any depth. Pure. */
export function descendants(cols = [], id) {
  const out = [], stack = [id], seen = new Set([id]);
  while (stack.length) { const p = stack.pop(); for (const c of cols) if (c.parent === p && !seen.has(c.id)) { seen.add(c.id); out.push(c); stack.push(c.id); } }
  return out;
}
/** may a folder go inside another? Not into itself or anything inside it. Pure. */
export const canNest = (cols, id, parent) => !parent || (parent !== id && !descendants(cols, id).some((c) => c.id === parent));
/** a folder's name with the folders it's in: "Mock revision › Chemistry". Pure. */
export const folderLabel = (cols, id) => pathOf(cols, id).map((c) => c.name).join(" › ");

/** a new order for a list after moving one thing to sit before another (drag and drop, Alt+↑/↓). Pure. */
export function reorder(ids = [], move, before = null) {
  const rest = ids.filter((x) => x !== move), i = before == null ? rest.length : rest.indexOf(before);
  rest.splice(i < 0 ? rest.length : i, 0, move);
  return rest;
}

// ---------- tags ----------
/** a tag as it's kept: lower case, spaces as hyphens, no # (so "Priority " and "#priority" are one tag). Pure. */
export const normTag = (s) => fold(s).replace(/^#+/, "").trim().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 32);
/** the labels most learners reach for, offered before they've made their own */
export const STARTER_TAGS = ["difficult", "priority", "homework", "memorise", "exam", "revisit", "done"];
/**
 * Tags to suggest for a thing (auto-tagging): its subject, its topic and what kind of thing it is, worked out from what
 * Gradify knows about it, plus "revisit" when it has mistakes waiting. Suggestions only: the learner adds them.
 * r: a resource (kit/core/resource.js), with subject/course/unit/module when known. Pure.
 */
export function autoTags(r, { mistakes = 0, have = [] } = {}) {
  if (!r) return [];
  const out = [], own = new Set(have.map(normTag));
  const add = (tag, why, kind) => { const t = normTag(tag); if (t && t.length > 1 && !own.has(t) && !out.some((x) => x.tag === t)) out.push({ tag: t, why, kind }); };
  const subject = r.subject || (r.course ? r.course.split("/").filter(Boolean).pop() : "");
  if (subject && !/gradify$/.test(normTag(subject))) add(subject, "Its subject", "subject");
  if (r.module) add(r.module, "Its topic", "topic"); else if (r.topic) add(r.topic, "Its topic", "topic");
  const label = KINDS[r.kind]?.[0];
  if (label && !["Screen", "Page"].includes(label)) add(label, "What it is", "type");
  if (mistakes > 0) add("revisit", `${mistakes} question${mistakes === 1 ? "" : "s"} to get right`, "state");
  return out.slice(0, 5);
}
/** every tag with how many things carry it, most used first. entries: [{ value: { tags } }]. Pure. */
export function tagCounts(entries = []) {
  const m = new Map();
  for (const e of entries) for (const t of e.value?.tags || e.tags || []) m.set(t, (m.get(t) || 0) + 1);
  return [...m].map(([tag, n]) => ({ tag, n })).sort((a, b) => b.n - a.n || a.tag.localeCompare(b.tag));
}

// ---------- whose it is, and who can see it ----------
const MINE = new Set(["pack", "card", "note", "map", "block", "goal", "session", "mistake", "collection"]);
const MINE_PREFIX = /^(jot|tooldeck|toolnote|block):/;
/** "yours" (the learner made it) or "gradify" (a course, lesson, question or specification). Pure. */
export function ownerOf(r) {
  const rid = r?.rid || r?.id || "";
  if (MINE_PREFIX.test(rid)) return "yours";
  const p = parseRid(rid);
  if (!p) return r?.mine ? "yours" : "gradify";
  if (p.kind === "page" || p.kind === "screen") return "gradify";
  return MINE.has(p.kind) && !p.course ? "yours" : "gradify";
}
/**
 * Who can see it: Gradify's own content is public; the learner's things are private (in their account when signed in,
 * otherwise on this device), unless they shared it with a link. Pure.
 */
export function visibilityOf(r, { signedIn = false, shared = new Set() } = {}) {
  if (ownerOf(r) === "gradify") return { key: "public", label: "Gradify", line: "Part of Gradify: the same for every learner" };
  if (shared.has(r.rid || r.id)) return { key: "shared", label: "Shared", line: "Shared with a link: anyone with it can see a copy" };
  return signedIn ? { key: "private", label: "Private", line: "Only you: in your account, on your devices" } : { key: "device", label: "Private", line: "Only you: on this device" };
}

// ---------- suggestions: where an unfiled thing might go ----------
/**
 * Folders an unfiled thing could go in, best first, each with why: the same subject or course as what's already there,
 * or words in common with the folder's name, description and contents. folders: [{ id, name, desc, items: [summary] }].
 * Pure.
 */
export function placeFor(r, folders = [], { limit = 2 } = {}) {
  if (!r) return [];
  const mine = new Set([...words(r.title), ...words((r.terms || []).join(" "))]), subj = fold(r.subject || ""), course = r.course || "";
  const out = [];
  for (const f of folders) {
    if (f.smart || f.archived) continue;
    const name = new Set(words(`${f.name} ${f.desc || ""}`)), inside = new Set((f.items || []).flatMap((x) => words(x.title)));
    const subjects = new Set((f.items || []).map((x) => fold(x.subject || "")).filter(Boolean)), courses = new Set((f.items || []).map((x) => x.course).filter(Boolean));
    const byName = [...mine].filter((w) => name.has(w)), byItems = [...mine].filter((w) => inside.has(w));
    let score = byName.length * 3 + Math.min(4, byItems.length) + (subj && (subjects.has(subj) || name.has(subj)) ? 2 : 0) + (course && courses.has(course) ? 2 : 0);
    if ((f.items || []).some((x) => x.rid === r.rid)) score = 0;
    if (score < 3) continue;
    const why = byName.length ? `Its name: ${byName.slice(0, 2).join(", ")}` : course && courses.has(course) ? "Same course as what's in it" : subj && subjects.has(subj) ? `Also ${r.subject}` : `In common: ${byItems.slice(0, 2).join(", ")}`;
    out.push({ id: f.id, name: f.name, score, why });
  }
  return out.sort((a, b) => b.score - a.score).slice(0, limit);
}

// ---------- possible duplicates ----------
/** a title as compared: lower case, no "(copy)", "copy 2", punctuation or extra spaces. Pure. */
export const titleKey = (t) => fold(t).replace(/\((copy|\d+)\)|\bcopy( \d+)?\b|\bv\d+\b/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
const jaccard = (a, b) => { if (!a.size || !b.size) return 0; let n = 0; for (const x of a) if (b.has(x)) n++; return n / (a.size + b.size - n); };
/**
 * Possible duplicates among the learner's own things: the same title (ignoring "(copy)" and punctuation) of the same
 * kind, or flashcard sets whose cards are mostly the same (80% of fronts in common). Things Gradify made are never
 * duplicates of each other. items: [{ rid, kind, title, fronts?: [] }]. Returns [{ reason, items }]. Pure.
 */
export function duplicateGroups(items = [], { dismissed = new Set() } = {}) {
  const out = [], used = new Set();
  const byTitle = new Map();
  for (const x of items) { const k = `${x.kind}|${titleKey(x.title)}`; if (!titleKey(x.title)) continue; if (!byTitle.has(k)) byTitle.set(k, []); byTitle.get(k).push(x); }
  for (const xs of byTitle.values()) if (xs.length > 1) { out.push({ reason: "Same title", items: xs }); xs.forEach((x) => used.add(x.rid)); }
  const packs = items.filter((x) => x.kind === "pack" && x.fronts?.length >= 3 && !used.has(x.rid)).map((x) => ({ x, f: new Set(x.fronts.map((s) => fold(s).replace(/[^a-z0-9]+/g, " ").trim())) }));
  for (let i = 0; i < packs.length; i++) for (let j = i + 1; j < packs.length; j++) {
    if (used.has(packs[i].x.rid) || used.has(packs[j].x.rid)) continue;
    const s = jaccard(packs[i].f, packs[j].f);
    if (s >= 0.8) { out.push({ reason: `${Math.round(s * 100)}% of the same cards`, items: [packs[i].x, packs[j].x] }); used.add(packs[i].x.rid); used.add(packs[j].x.rid); }
  }
  const key = (g) => g.items.map((x) => x.rid).sort().join("+");
  return out.filter((g) => !dismissed.has(key(g))).map((g) => ({ ...g, key: key(g) }));
}

// ---------- templates ----------
// Prebuilt structures. A folder may be smart (a search that fills it) or carry a description that says what goes in it.
export const TEMPLATES = [
  { id: "mock", name: "Mock exam revision", icon: "target", colour: "red", desc: "Everything for one exam season: what to fix, what to practise, and what's done.",
    folders: [
      { name: "Weak topics", icon: "flame", colour: "orange", desc: "Lessons and topics you keep getting wrong. Tag things “difficult” and they appear in the smart folder below." },
      { name: "Practice questions", icon: "target", colour: "blue", desc: "Question sets and quizzes to work through before the exam." },
      { name: "Flashcards to review", icon: "cards", colour: "violet", desc: "The sets to go through each day." },
      { name: "Tagged difficult", icon: "sparkles", colour: "amber", desc: "Filled automatically: anything you've tagged “difficult” and not yet finished.", smart: "tag:difficult done:no" },
    ] },
  { id: "course", name: "Course by topic", icon: "book", colour: "blue", desc: "A folder for each unit of a course, ready to collect your own notes and sets beside the lessons.", needsCourse: true },
  { id: "project", name: "Project or coursework", icon: "flag", colour: "teal", desc: "A piece of work from first idea to handing it in.",
    folders: [
      { name: "Research", icon: "book", colour: "blue", desc: "Sources, lessons and notes you're drawing on." },
      { name: "Drafts", icon: "notes", colour: "slate", desc: "Work in progress." },
      { name: "To do", icon: "clock", colour: "amber", desc: "Filled automatically: what you've tagged “homework” and not finished.", smart: "tag:homework done:no" },
      { name: "Final", icon: "trophy", colour: "green", desc: "What you'll hand in." },
    ] },
  { id: "weekly", name: "This week", icon: "clock", colour: "violet", desc: "A short list for the week, with smart folders that keep themselves up to date.",
    folders: [
      { name: "Priority", icon: "star", colour: "red", desc: "Filled automatically: anything tagged “priority”.", smart: "tag:priority" },
      { name: "Changed this week", icon: "sparkles", colour: "teal", desc: "Filled automatically: your things made or changed in the past 7 days.", smart: "after:7d" },
      { name: "Homework", icon: "notes", colour: "amber", desc: "Filled automatically: anything tagged “homework” that isn't done.", smart: "tag:homework done:no" },
    ] },
];
/**
 * The folders a template makes, as a list to create in order: [{ key, parent (key | null), name, icon, colour, desc, smart }].
 * The course template needs the course's units: course = { name, units: [[id, n, title]] } (kit/data/search-index.json). Pure.
 */
export function templatePlan(t, { course = null, name = null } = {}) {
  if (!t) return [];
  const top = { key: "root", parent: null, name: name || (t.needsCourse && course ? course.n || course.name : t.name), icon: t.icon, colour: t.colour, desc: t.desc };
  const kids = t.needsCourse
    ? (course?.units || []).slice(0, 40).map(([, n, title], i) => ({ key: `u${i}`, parent: "root", name: `${course.U || "Unit"} ${n}: ${title}`.slice(0, 80), icon: "book", colour: t.colour, desc: `Your notes, sets and saved lessons for ${title}.` }))
    : (t.folders || []).map((f, i) => ({ key: `f${i}`, parent: "root", ...f }));
  return [top, ...kids];
}

// ---------- recently deleted ----------
export const TRASH_DAYS = 30;
/** what's still recoverable, newest first, with the days left. Pure. */
export function liveTrash(list = [], now = Date.now()) {
  return list.filter((x) => now - x.at < TRASH_DAYS * 864e5).sort((a, b) => b.at - a.at).map((x) => ({ ...x, daysLeft: Math.max(1, Math.ceil((x.at + TRASH_DAYS * 864e5 - now) / 864e5)) }));
}

// ======================= the learner's record =======================
const now = () => Date.now();
// folders
export function folderOf(id) { const c = LS.get("collection", id); return c ? { id, ...c } : null; }
export function updateFolder(id, patch) {
  const c = LS.get("collection", id); if (!c) return null;
  const next = { ...c, ...patch };
  for (const k of Object.keys(next)) if (next[k] == null || next[k] === "") delete next[k];
  if (next.name) next.name = String(next.name).trim().slice(0, 80);
  if (next.desc) next.desc = String(next.desc).trim().slice(0, 280);
  if (next.smart?.q != null) next.smart = { q: String(next.smart.q).trim().slice(0, 300) };
  LS.put("collection", id, next);
  return { id, ...next };
}
export function createFolder({ name, parent = null, colour = null, icon = null, desc = null, smart = null } = {}) {
  const id = `c${now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
  const v = { name: String(name || "").trim().slice(0, 80) || "Untitled folder" };
  if (parent) v.parent = parent; if (colour) v.colour = colour; if (icon) v.icon = icon; if (desc) v.desc = String(desc).slice(0, 280);
  if (smart) v.smart = { q: String(smart).trim().slice(0, 300) };
  LS.put("collection", id, v);
  return id;
}
/** move a folder into another (or to the top), keeping the tree a tree */
export function nestFolder(id, parent) {
  if (!canNest(collections(), id, parent)) return false;
  updateFolder(id, { parent: parent || null });
  return true;
}
/** the learner's own order for a list of folders or of one folder's items */
export function setFolderOrder(ids) { LS.batch((b) => ids.forEach((id, i) => { const c = LS.get("collection", id); if (c) b.put("collection", id, { ...c, order: i }); })); }
export function setItemOrder(cid, rids) { LS.batch((b) => rids.forEach((rid, i) => { const e = LS.get("collitem", `${cid}|${rid}`); if (e) b.put("collitem", `${cid}|${rid}`, { ...e, order: i }); })); }
export const itemOrder = (cid) => new Map(LS.list("collitem").filter((e) => e.value.cid === cid && e.value.order != null).map((e) => [e.value.r.rid, e.value.order]));
export const archiveFolder = (id, on = true) => updateFolder(id, { archived: on ? now() : null });
/** make a template's folders; returns the top folder's id */
export function applyTemplate(t, o = {}) {
  const ids = {};
  for (const f of templatePlan(t, o)) ids[f.key] = createFolder({ ...f, parent: f.parent ? ids[f.parent] : (o.parent || null) });
  return ids.root;
}

// tags
export const tagsOf = (rid) => LS.get("tag", rid)?.tags || [];
export function setTags(r, tags) {
  const list = [...new Set((tags || []).map(normTag).filter(Boolean))].slice(0, 20);
  if (!list.length) LS.del("tag", r.rid); else LS.put("tag", r.rid, { r: summary(r), tags: list });
  return list;
}
export const addTag = (r, t) => setTags(r, [...tagsOf(r.rid), t]);
export const removeTag = (r, t) => setTags(r, tagsOf(r.rid).filter((x) => x !== normTag(t)));
export const tagged = () => LS.list("tag").map((e) => ({ rid: e.key, ...e.value, t: e.t }));
export const allTags = () => tagCounts(LS.list("tag"));
export const withTag = (tag) => tagged().filter((x) => x.tags.includes(normTag(tag))).map((x) => ({ ...x.r, tags: x.tags, added: x.t }));
export function renameTag(from, to) {
  const a = normTag(from), b = normTag(to); if (!a || !b || a === b) return 0;
  let n = 0;
  LS.batch((bt) => { for (const e of LS.list("tag")) if (e.value.tags.includes(a)) { n++; bt.put("tag", e.key, { ...e.value, tags: [...new Set(e.value.tags.map((x) => (x === a ? b : x)))] }); } });
  return n;
}
export function deleteTag(tag) {
  const a = normTag(tag), was = [];
  LS.batch((bt) => { for (const e of LS.list("tag")) if (e.value.tags.includes(a)) { was.push([e.key, e.value]); const rest = e.value.tags.filter((x) => x !== a); if (rest.length) bt.put("tag", e.key, { ...e.value, tags: rest }); else bt.del("tag", e.key); } });
  return () => LS.batch((bt) => was.forEach(([k, v]) => bt.put("tag", k, v)));   // undo
}
export const onTags = (f) => LS.subscribe((kinds) => { if (!kinds || kinds.includes("tag")) f(); });

// recently deleted (this device)
const TRASH = "gradify.trash";
const readTrash = () => { try { return JSON.parse(localStorage.getItem(TRASH) || "[]"); } catch { return []; } };
const writeTrash = (list) => { try { localStorage.setItem(TRASH, JSON.stringify(liveTrash(list).slice(0, 60).map(({ daysLeft, ...x }) => x))); return true; } catch { return false; } };
export const trash = () => liveTrash(readTrash());
export function toTrash(entry) { const e = { id: `t${now().toString(36)}${Math.random().toString(36).slice(2, 5)}`, at: now(), ...entry }; writeTrash([e, ...readTrash()]); return e; }
export function fromTrash(id) { const list = readTrash(), e = list.find((x) => x.id === id); writeTrash(list.filter((x) => x.id !== id)); return e || null; }
/** a folder and everything in it (its folders, what they hold, and their order), into Recently deleted, then gone */
export function trashFolders(ids) {
  const cols = collections(), all = new Map();
  for (const id of ids) for (const c of [cols.find((x) => x.id === id), ...descendants(cols, id)].filter(Boolean)) all.set(c.id, c);
  const folders = [...all.values()].map(({ t, ...c }) => c);
  const items = folders.flatMap((c) => LS.list("collitem").filter((e) => e.value.cid === c.id).map((e) => [e.key, e.value]));
  const top = folders.filter((c) => !all.has(c.parent));
  toTrash({ kind: "folders", label: top.length === 1 ? top[0].name : `${top.length} folders`, n: folders.length, items: items.length, payload: { folders, items } });
  for (const c of folders) deleteCollection(c.id);
}
/** bring a deleted thing back (folders here; a flashcard set is restored by the app, which owns sets) */
export function restoreFolders(entry) {
  const { folders = [], items = [] } = entry?.payload || {};
  LS.batch((b) => { for (const { id, ...v } of folders) b.put("collection", id, v); for (const [k, v] of items) b.put("collitem", k, v); });
}

// filing several things at once (bulk organisation, from any list)
export function fileMany(cid, rs) { const had = new Set(itemsOf(cid).map((x) => x.rid)), added = rs.filter((r) => r?.rid && !had.has(r.rid)); added.forEach((r) => addToCollection(cid, r)); return () => added.forEach((r) => removeFromCollection(cid, r.rid)); }
export function tagMany(rs, tag) { const t = normTag(tag), before = rs.map((r) => [r, tagsOf(r.rid)]); rs.forEach((r) => addTag(r, t)); return () => before.forEach(([r, tags]) => setTags(r, tags)); }
