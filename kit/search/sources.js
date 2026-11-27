// Where search looks: every source of things in Gradify, turned into documents for the engine (kit/search/engine.js).
//
//   Courses      kit/data/search-index.json: every course, unit, module and lesson (titles), fetched once
//   Lessons      kit/api/v1/lessons.json: each written lesson's key terms, section headings, level, and how many
//                practice questions and flashcards it has (scripts/build-api.mjs), fetched the first time someone
//                searches for more than a moment. It also gives each lesson's practice questions and each unit's
//                flashcards and quiz their own results, so "equilibrium" lists questions and cards, not just lessons.
//   Curriculum   kit/curriculum/specs/*.json: every section of the specifications Gradify has imported (headings and
//                references, never the awarding body's text), plus the qualifications and exam boards
//   Yours        flashcard sets (with their cards' fronts), Notes documents, quick notes, notebook pages, mind maps,
//                collections and what's in them, pins, scheduled things and plan blocks, and lesson progress
//   The app      its screens and actions, handed in by the app (kit/app/app-nav.js)
//
// The builders (docsFrom*) are pure (tests/search-sources.test.mjs); gather() reads the sources in the browser.
import { rid } from "../core/resource.js";
import { coverageOf } from "../curriculum/coverage.js";

// ---------- what a course or lesson is for ----------
const QUAL_OF = { gcse: "gcse", "a-level": "a-level", nat5: "nat5", higher: "higher", degree: "university", apprenticeship: "professional", sqe: "professional", nmc: "professional", gphc: "professional", mla: "professional" };
/** the qualifications a course serves (kit/curriculum/coverage.js), as search's ids */
export const courseQuals = (slug) => [...new Set(coverageOf(slug).serves.map((s) => QUAL_OF[s.q]).filter(Boolean))];
/** a lesson's level line ("GCSE and A level · Application") → { qual: [], difficulty: 1–3 | null } */
export function levelOf(lv = "") {
  const [stage = "", demand = ""] = String(lv).split("·").map((x) => x.trim().toLowerCase());
  const qual = [];
  if (/\bgcse\b/.test(stage)) qual.push("gcse");
  if (/\ba[ -]?level\b/.test(stage)) qual.push("a-level");
  if (/\b(year [1-4]|undergraduate|postgraduate|preclinical|clinical|degree)\b/.test(stage)) qual.push("university");
  const difficulty = /foundation|introduct|recall/.test(demand) ? 1 : /evaluat|reasoning|synthes|advanced|analysis|critical|research/.test(demand) ? 3 : /applicat|core|intermediate|practice/.test(demand) ? 2 : null;
  return { qual, difficulty };
}
const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/**
 * Courses, topics (units and modules), lessons, practice questions, course flashcards and unit quizzes, from the search
 * index and (when it's loaded) the lesson index. states: { [slug]: course state } for completion and progress.
 */
export function docsFromIndex(idx, { lessons = null, states = {}, site = null } = {}) {
  const out = [], extra = new Map();
  // the lesson index, by course slug and lesson id
  if (lessons?.lessons) {
    const slugs = lessons.courses.map((c) => c[0]);
    for (const [ci, , lid, , , , terms, headings, q = 0, level = "", cards = 0] of lessons.lessons) extra.set(`${slugs[ci]}/${lid}`, { terms: terms ? terms.split("|") : [], headings: headings ? headings.split("|") : [], q, level, cards });
  }
  for (const c of idx?.courses || []) {
    const S = states[c.s] || null, done = S?.done || {}, quals = courseQuals(c.s), here = site && c.site === site ? 0.5 : 0;
    const all = c.units.flatMap((u) => u[3].map((l) => l[0])), doneN = all.filter((id) => done[id]).length;
    const status = doneN && doneN === all.length ? ["completed"] : doneN || (S?.log || []).length ? ["in-progress"] : [];
    out.push({ id: rid("course", c.u), type: "course", lessons: all, title: c.n, sub: `${c.site} · ${plural(all.length, "lesson")}`, href: c.u, crumbs: [{ label: c.site }], course: c.s, site: c.site, qual: quals, status, done: all.length ? doneN === all.length : null, terms: [c.site, ...(c.T || [])], icon: "book", weight: here + 1 });
    for (const [uid, n, title, ls, mods = [], , blurb = ""] of c.units) {
      const uCrumbs = [{ label: c.site }, { label: c.n, href: c.u }, { label: `${c.U} ${n}`, href: `${c.u}#/learn/${uid}` }];
      const uDone = ls.filter((l) => done[l[0]]).length;
      out.push({ id: rid("unit", c.u, uid), type: "topic", lessons: ls.map((l) => l[0]), title, sub: `${c.n} · ${c.U} ${n} · ${plural(ls.length, "lesson")}`, href: `${c.u}#/learn/${uid}`, crumbs: uCrumbs.slice(0, 2), course: c.s, site: c.site, qual: quals, body: blurb, preview: blurb, status: uDone && uDone === ls.length ? ["completed"] : uDone ? ["in-progress"] : [], done: ls.length ? uDone === ls.length : null, terms: mods, icon: "flag", weight: here });
      mods.forEach((m, mi) => out.push({ id: `module:${c.u}${uid}/${mi}`, type: "topic", title: m, sub: `${c.n} · ${c.U} ${n}.${mi + 1}`, href: `${c.u}#/learn/${uid}`, crumbs: uCrumbs, course: c.s, site: c.site, qual: quals, icon: "flag", weight: here - 0.5 }));
      let unitQ = 0, unitCards = 0;
      for (const [lid, lt, mi] of ls) {
        const x = extra.get(`${c.s}/${lid}`), lv = levelOf(x?.level), lq = lv.qual.length ? lv.qual : quals;
        const crumbs = [...uCrumbs, ...(mi != null && mods[mi] ? [{ label: mods[mi] }] : [])];
        const isDone = Boolean(done[lid]);
        unitQ += x?.q || 0; unitCards += x?.cards || 0;
        out.push({ id: rid("lesson", c.u, lid), type: "lesson", title: lt, sub: `${c.n} · ${c.U} ${n}${mi != null && mods[mi] ? ` · ${mods[mi]}` : ""}`, href: `${c.u}#/lesson/${lid}`, crumbs, course: c.s, site: c.site, lesson: lid, qual: lq,
          terms: x?.terms || [], body: x ? x.headings.join(". ") : "", preview: x?.headings?.length ? `In this lesson: ${x.headings.join(" · ")}` : "", difficulty: lv.difficulty, done: isDone, status: isDone ? ["completed"] : [], icon: "play", weight: here,
          meta: x ? [x.level, x.q ? plural(x.q, "question") : "", x.cards ? plural(x.cards, "card") : ""].filter(Boolean).join(" · ") : "" });
        if (x?.q) out.push({ id: `qset:${c.u}${lid}`, type: "question", title: lt, count: x.q, countLabel: plural(x.q, "question"), sub: `Practice questions · ${c.n} · ${c.U} ${n}`, href: `${c.u}#/lesson/${lid}`, crumbs, course: c.s, site: c.site, lesson: lid, qual: lq, terms: x.terms, difficulty: lv.difficulty, done: isDone, status: isDone ? ["completed"] : [], icon: "target", weight: here - 0.3 });
      }
      if (unitQ) out.push({ id: rid("quiz", c.u, uid), type: "question", title: `${c.U} ${n} quiz: ${title}`, count: unitQ, countLabel: `drawn from ${plural(unitQ, "question")}`, sub: `${c.n} · ${c.U} ${n} quiz`, href: `${c.u}#/quiz/${uid}`, crumbs: uCrumbs, course: c.s, site: c.site, qual: quals, terms: [title, ...mods], icon: "trophy", weight: here - 0.5 });
      if (unitCards) out.push({ id: `deck:${c.u}${uid}`, type: "pack", title, count: unitCards, countLabel: plural(unitCards, "card"), sub: `Course flashcards · ${c.n} · ${c.U} ${n}`, href: `${c.u}#/review/${uid}`, crumbs: uCrumbs, course: c.s, site: c.site, qual: quals, terms: mods, icon: "cards", weight: here - 0.5 });
    }
  }
  return out;
}

/**
 * The curriculum: each imported specification and its sections (kit/curriculum/specs/*.json), with the course that
 * teaches it. specs: [{ index (the JSON), id, body, qual, course, href }]
 */
export function docsFromSpecs(specs = []) {
  const out = [];
  for (const s of specs) {
    const ix = s.index; if (!ix?.sections) continue;
    const board = s.body ? [s.body] : [], qual = s.qual ? [s.qual] : [];
    const name = `${ix.title}${ix.code ? ` (${ix.code})` : ""}`;
    out.push({ id: `spec:${ix.spec}`, type: "curriculum", title: name, sub: `Specification · version ${ix.version || "?"} · ${plural(ix.counts?.statements || 0, "statement")}`, href: s.href, crumbs: [{ label: "Curriculum" }, { label: name }], board, qual, course: s.course, terms: [ix.code, s.bodyName, s.qualName].filter(Boolean), icon: "target", weight: 1 });
    const titles = new Map(ix.sections.map((x) => [x.ref, x.title]));
    for (const sec of ix.sections) {
      const parent = sec.ref.split(".").slice(0, -1).join(".");
      out.push({ id: `spec:${ix.spec}/${sec.ref}`, type: "curriculum", title: `${sec.ref} ${sec.title}`, sub: `${name} · page ${sec.page}`, href: s.hrefFor ? s.hrefFor(sec.ref) : s.href,
        crumbs: [{ label: name }, ...(titles.has(parent) ? [{ label: `${parent} ${titles.get(parent)}` }] : [])], board, qual, course: s.course, terms: [sec.ref, ix.code].filter(Boolean), icon: "target" });
    }
  }
  return out;
}

/** qualifications and exam boards, so "A level" or "AQA" finds where to start (and the curriculum screen) */
export function docsFromQualifications({ quals = {}, bodies = {}, app = "/app.html" } = {}) {
  const out = [];
  for (const [id, q] of Object.entries(quals)) out.push({ id: `qual:${id}`, type: "curriculum", title: q.name, sub: `Qualification${q.note ? ` · ${q.note}` : ""}`, href: `${app}#/curriculum`, crumbs: [{ label: "Curriculum" }], qual: [QUAL_OF[id] || id], icon: "target" });
  for (const [id, b] of Object.entries(bodies)) out.push({ id: `board:${id}`, type: "curriculum", title: b.name, sub: "Exam board", href: `${app}#/curriculum`, crumbs: [{ label: "Curriculum" }], board: [id === "pearson" ? "edexcel" : id], icon: "target" });
  return out;
}

const ms = (v) => (typeof v === "number" ? v : v ? Date.parse(v) || null : null);
const firstLine = (s) => String(s || "").split("\n").map((l) => l.replace(/^#+\s*|^\[[ x]\]\s*|^[-•*]\s*/i, "").trim()).find(Boolean) || "";

/**
 * The learner's own things. o: { app, documents, cards, decks, maps, pages, jots, kb, collections, items, pins,
 * scheduled (rid → blocks), blocks, folderOf (rid → [collection ids]), names (collection id → name) }
 */
export function docsFromLearner(o = {}) {
  const app = o.app || "/app.html", out = [];
  const folders = o.folderOf || new Map(), pinned = new Set((o.pins || []).map((p) => p.href)), sched = o.scheduled || new Map();
  const status = (id, href, extra = []) => [...extra, ...(pinned.has(href) ? ["pinned"] : []), ...((folders.get(id) || []).length ? ["saved"] : []), ...((sched.get(id) || []).length ? ["scheduled"] : [])];
  const put = (d) => { d.tags = o.tags?.get(d.id) || []; d.folders = [...new Set([...(d.folders || []), ...(folders.get(d.id) || [])])]; d.folderName = d.folders.map((f) => o.names?.get(f)).filter(Boolean).join(" "); out.push(d); };
  // flashcard sets, with what's on their cards
  const byDoc = new Map();
  for (const c of o.cards || []) { if (!byDoc.has(c.document_id)) byDoc.set(c.document_id, []); byDoc.get(c.document_id).push(c); }
  for (const d of o.documents || []) {
    const cs = byDoc.get(d.id) || [], id = rid("pack", d.id), href = `${app}#/deck/${d.id}`;
    put({ id, type: "pack", title: d.title || "Untitled set", count: cs.length, countLabel: plural(cs.length, "card"), sub: `Your flashcards${d.site && d.site !== "Gradify" ? ` · ${d.site}` : ""}`, href, crumbs: [{ label: "Library", href: `${app}#/library` }],
      body: cs.slice(0, 60).map((c) => c.front).join(" · "), terms: [...new Set(cs.map((c) => c.topic).filter(Boolean))].slice(0, 8), preview: cs.slice(0, 3).map((c) => `${c.front} → ${c.back}`).join("\n"),
      created: ms(d.created_at), modified: ms(d.updated_at || d.created_at), status: status(id, href), icon: "cards", mine: true });
  }
  for (const d of o.decks || []) {
    const id = `tooldeck:${d.id}`, href = `${app}#/tools/cards/${d.id}`;
    put({ id, type: "pack", title: d.title || "Untitled cards", sub: "Your flashcards · Tools", href, crumbs: [{ label: "Tools", href: `${app}#/tools` }], body: String(d.text || "").slice(0, 2000), preview: String(d.text || "").slice(0, 200), modified: d.updated || null, status: status(id, href), icon: "cards", mine: true });
  }
  for (const m of o.maps || []) {
    const id = rid("map", m.id), href = `${app}#/tools/map/${m.id}`;
    put({ id, type: "map", title: m.title || "Untitled mind map", sub: "Your mind map", href, crumbs: [{ label: "Tools", href: `${app}#/tools` }], body: String(m.text || m.source || "").slice(0, 2000), modified: m.updated || null, status: status(id, href), icon: "grid", mine: true });
  }
  for (const p of o.pages || []) {
    const id = `toolnote:${p.id}`, href = `${app}#/tools/notebook/${p.id}`;
    put({ id, type: "note", title: p.title || firstLine(p.text) || "Untitled page", sub: "Notebook page", href, crumbs: [{ label: "Tools", href: `${app}#/tools` }], body: String(p.text || "").slice(0, 4000), preview: String(p.text || "").slice(0, 240), created: p.created || null, modified: p.updated || null, status: status(id, href), icon: "notes", mine: true });
  }
  for (const n of o.jots || []) {
    const id = `jot:${n.id}`, href = `${app}#/jot/${n.id}`;
    put({ id, type: "note", title: firstLine(n.text).slice(0, 90) || "Untitled note", sub: `Quick note${n.tag ? ` · ${n.tag}` : ""}`, href, crumbs: [{ label: "Notes", href: `${app}#/notes` }], body: String(n.text || "").slice(0, 4000), preview: String(n.text || "").slice(0, 240), created: n.created || null, modified: n.updated || null, status: status(id, href, ["draft", ...(n.pinned ? ["pinned"] : [])]), icon: "notes", mine: true });
  }
  // Notes documents: each document with the text of what's inside it
  const kb = o.kb;
  if (kb?.rems) {
    const text = (rid0, depth = 0, acc = []) => { const r = kb.rems[rid0]; if (!r || depth > 6 || acc.length > 120) return acc; for (const k of r.kids || []) { const x = kb.rems[k]; if (!x) continue; if (!x.doc && !x.folder) { acc.push(String(x.text || "").replace(/<[^>]+>/g, "")); text(k, depth + 1, acc); } } return acc; };
    const path = (r) => { const out2 = []; let p = r.parent ? kb.rems[r.parent] : null, guard = 0; while (p && guard++ < 10) { if (p.doc || p.folder) out2.unshift({ label: String(p.text || "Untitled").replace(/<[^>]+>/g, ""), href: `${app}#/notes/${p.id}` }); p = p.parent ? kb.rems[p.parent] : null; } return out2; };
    for (const r of Object.values(kb.rems)) {
      if (!r.doc || !r.text) continue;
      const id = rid("note", r.id), href = `${app}#/notes/${r.id}`, body = text(r.id).join(" · ");
      put({ id, type: "note", title: String(r.text).replace(/<[^>]+>/g, "").slice(0, 120), sub: "Notes document", href, crumbs: [{ label: "Notes", href: `${app}#/notes` }, ...path(r)], body: body.slice(0, 6000), preview: body.slice(0, 240), terms: r.tags || [], created: r.c || null, modified: r.u || null, status: status(id, href), icon: "notes", mine: true });
    }
  }
  for (const c of o.collections || []) {
    const id = rid("collection", c.id), href = `${app}#/collections/${c.id}`, its = (o.items || []).filter((x) => x.cid === c.id);
    put({ id, type: "collection", title: c.name || "Untitled collection", count: its.length, countLabel: plural(its.length, "item"), sub: "Your collection", href, crumbs: [{ label: "Collections", href: `${app}#/collections` }], body: its.map((x) => x.title).join(" · "), preview: its.slice(0, 4).map((x) => x.title).join(" · "), modified: c.t || null, status: status(id, href), icon: "inbox", mine: true });
  }
  // what's in a collection that isn't one of Gradify's own lessons or the learner's things (a link, a page): found by its name
  const known = new Set(out.map((d) => d.id));
  for (const it of o.items || []) {
    if (!it.r?.rid || known.has(it.r.rid) || o.indexed?.has(it.r.rid)) continue;
    known.add(it.r.rid);
    put({ id: it.r.rid, type: it.r.kind === "lesson" ? "lesson" : it.r.kind === "pack" ? "pack" : it.r.kind === "map" ? "map" : it.r.kind === "note" ? "note" : "collection", title: it.r.title || "Untitled", sub: it.r.sub || "In a collection", href: it.r.href, crumbs: [{ label: "Collections", href: `${app}#/collections` }, { label: o.names?.get(it.cid) || "Collection", href: `${app}#/collections/${it.cid}` }], status: ["saved"], icon: "inbox", mine: true });
  }
  // plan blocks
  for (const b of o.blocks || []) {
    if (!b.title) continue;
    const at = `${String(Math.floor(b.start_min / 60)).padStart(2, "0")}:${String(b.start_min % 60).padStart(2, "0")}`;
    const day = ms(`${b.day}T00:00:00`);
    out.push({ id: rid("block", String(b.id)), type: "task", title: b.title, sub: `${b.day} at ${at}${b.cal ? ` · ${b.cal}` : ""}`, href: `${app}#/plan`, crumbs: [{ label: "Smart Plan", href: `${app}#/plan` }], created: day, modified: day, done: Boolean(b.done), status: b.done ? ["completed", "scheduled"] : ["scheduled"], icon: "clock", mine: true });
  }
  return out;
}

/** the app's own screens and actions as documents (from kit/app/app-nav.js) */
export function docsFromApp({ screens = [], actions = [] } = {}) {
  return [
    ...screens.map((s) => ({ id: `screen:#/${s.route}`, type: "screen", title: s.label, sub: s.sectionLabel ? `${s.sectionLabel} · screen` : "Screen", href: `#/${s.route}`, crumbs: s.sectionLabel ? [{ label: s.sectionLabel }] : [], icon: s.icon || "grid", terms: [s.route] })),
    ...actions.map((a, i) => ({ id: `action:${i}:${a.t}`, type: "action", title: a.t, sub: a.k, href: a.href, run: a.run, terms: String(a.words || "").split(/\s+/).filter(Boolean), icon: "bolt" })),
  ];
}

/**
 * Lesson progress again, onto documents built earlier (the index is built once; progress changes as the learner works):
 * each lesson and its practice questions, and each unit and course from its lessons. states: { [slug]: state }. Pure.
 */
export function applyProgress(docs, states = {}) {
  const PROGRESS = new Set(["completed", "in-progress"]);
  for (const d of docs) {
    if (d.mine || !d.course || !["lesson", "question", "topic", "course"].includes(d.type)) continue;
    const S = states[d.course], done = S?.done || {};
    const keep = (d.status || []).filter((x) => !PROGRESS.has(x));
    if (d.lesson && (d.type === "lesson" || d.id.startsWith("qset:"))) { d.done = Boolean(done[d.lesson]); if (d.done) keep.push("completed"); }
    else if (d.lessons) {
      const n = d.lessons.filter((id) => done[id]).length;
      d.done = d.lessons.length ? n === d.lessons.length : null;
      if (d.done) keep.push("completed"); else if (n || (d.type === "course" && (S?.log || []).length)) keep.push("in-progress");
    }
    d.status = keep;
  }
  return docs;
}

/** lessons a learner has in progress or finished, and pins, put on top of the course documents */
export function applyPlaces(docs, { pins = [], folderOf = new Map(), scheduled = new Map(), names = new Map(), tags = new Map() } = {}) {
  const pinned = new Set(pins.map((p) => p.href)), PLACE = new Set(["pinned", "saved", "scheduled"]);
  for (const d of docs) {
    if (d.mine) continue;
    // worked out again each time: something unpinned or taken out of a collection loses its label
    const keep = (d.status || []).filter((s) => !PLACE.has(s));
    if (pinned.has(d.href)) keep.push("pinned");
    const f = folderOf.get(d.id);
    d.folders = f || []; d.folderName = (f || []).map((x) => names.get(x)).filter(Boolean).join(" ");
    if (f?.length) keep.push("saved");
    if (scheduled.get(d.id)?.length) keep.push("scheduled");
    d.status = keep;
    d.tags = tags.get(d.id) || [];
  }
  return docs;
}

// ---------- in the browser ----------
const cache = new Map();
const once = (k, f) => { if (!cache.has(k)) cache.set(k, Promise.resolve().then(f).catch((e) => { cache.delete(k); throw e; })); return cache.get(k); };
// a failed fetch rejects, so once() forgets it and the next search asks again; callers fall back for now
const json = (url) => fetch(url).then((r) => { if (!r.ok) throw new Error(`${r.status} ${url}`); return r.json(); });
export const loadLessonIndex = () => once("lessons", () => json(new URL("../api/v1/lessons.json", import.meta.url).href)).catch(() => null);
export const loadSearchIndex = () => once("index", () => json(new URL("../data/search-index.json", import.meta.url).href)).catch(() => ({ courses: [] }));

/** the curriculum documents: imported specifications (with their course's spec pages) and the qualification registry */
export function curriculumDocs({ app = "/app.html", pages = {} } = {}) {
  return once(`curriculum:${app}`, async () => {
    const { SPECS, BODIES, QUAL_TYPES } = await import("../curriculum/uk.js");
    const imported = SPECS.filter((s) => s.statements === "imported");
    const specs = await Promise.all(imported.map(async (s) => {
      const index = await json(new URL(`../curriculum/specs/${s.id}.json`, import.meta.url).href);   // a failure rejects the whole: tried again next time
      const course = s.subject, page = pages[course] || null;
      // biology has a Specification Mastery view by topic; the others open the app's curriculum screen
      const hrefFor = course === "biology" && page ? (ref) => `${page}#/spec/${ref.split(".").slice(0, 2).join(".")}` : null;
      return { index, id: s.id, body: s.body === "pearson" ? "edexcel" : s.body, bodyName: BODIES[s.body]?.name, qual: s.qual, qualName: QUAL_TYPES[s.qual]?.name, course, href: hrefFor ? `${page}#/spec` : `${app}#/curriculum`, hrefFor };
    }));
    return [...docsFromSpecs(specs), ...docsFromQualifications({ quals: QUAL_TYPES, bodies: BODIES, app })];
  });
}

/** the learner's own documents, read fresh each time (they change as the learner works) */
export async function learnerDocs({ store = null, app = "/app.html", indexed = new Set() } = {}) {
  const safe = (f, d) => Promise.resolve().then(f).catch(() => d);
  const [links, places, LS, org, tools, jot, kbStore] = await Promise.all([import("../data/links.js"), import("../ui/places.js"), import("../data/learner-state.js"), import("../data/organise.js"), safe(() => import("../tools/store.js"), null), safe(() => import("../notes/jot.js"), null), safe(() => import("../notes/kb/store.js"), null)]);
  const day = (d) => d.toISOString().slice(0, 10), now = new Date();
  const [documents, cards, blocks] = await Promise.all([
    safe(() => store?.listDocuments?.() || [], []), safe(() => store?.listCards?.() || [], []),
    safe(() => store?.listBlocks?.(day(new Date(now - 14 * 864e5)), day(new Date(+now + 60 * 864e5))) || [], []),
  ]);
  const collections = links.collections(), names = new Map(collections.map((c) => [c.id, c.name]));
  const items = collections.flatMap((c) => links.itemsOf(c.id).map((r) => ({ cid: c.id, rid: r.rid, title: r.title, r })));
  const folderOf = new Map(); for (const it of items) { if (!folderOf.has(it.rid)) folderOf.set(it.rid, []); folderOf.get(it.rid).push(it.cid); }
  const scheduled = new Map(); try { for (const e of LS.list("sched")) { const r = e.value?.r?.rid; if (!r) continue; if (!scheduled.has(r)) scheduled.set(r, []); scheduled.get(r).push(e.value.block); } } catch { /* fine */ }
  const pins = places.pins(), tags = new Map(org.tagged().map((x) => [x.rid, x.tags]));
  let kb = null; try { kb = kbStore?.load?.() || null; } catch { /* Notes not available here */ }
  const docs = docsFromLearner({ app, documents, cards, decks: tools?.decks?.() || [], maps: tools?.maps?.() || [], pages: tools?.pages?.() || [], jots: jot?.loadJots?.() || [], kb, collections, items, pins, scheduled, blocks, folderOf, names, indexed, tags });
  return { docs, places: { pins, folderOf, scheduled, names, tags } };
}

/** lesson progress for every course this learner has opened (kit/learning/course-states.js) */
export const progress = (store) => import("../learning/course-states.js").then((m) => m.courseStates(store)).catch(() => ({}));
