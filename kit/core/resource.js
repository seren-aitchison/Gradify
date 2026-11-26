// The Universal Resource: every meaningful thing in Gradify has one stable id, the same wherever it appears, so a
// lesson, a flashcard set, a note, a quiz, a plan block or a collection can be linked, saved, scheduled, annotated and
// found again by any tool (kit/data/learner-state.js keeps what the learner does with them).
//
//   rid("lesson", "/scigradify/biology/", "u01-01")  → "lesson:/scigradify/biology/u01-01"
//   ridFromHref("/scigradify/biology/#/lesson/u01-01") → the same; hrefOf(rid) goes back
//   resource(rid, { title, subject })                → { rid, kind, label, icon, title, href, subject, … }
//
// An id is "<kind>:<where>": for course content, the course's path then the item's own id; for the learner's own
// things, the id their store gave them. Ids never contain a title, so renaming something doesn't change it.
// Everything here is pure (tests/resource.test.mjs).

// kind → [label, icon (kit/ui/icons.js)]
export const KINDS = {
  course: ["Course", "book"], unit: ["Topic", "flag"], lesson: ["Lesson", "book"], quiz: ["Quiz", "trophy"],
  test: ["Target test", "bolt"], spec: ["Specification point", "target"], question: ["Question", "target"],
  pack: ["Flashcard set", "cards"], card: ["Flashcard", "cards"], note: ["Note", "notes"], map: ["Mind map", "grid"],
  block: ["Plan block", "clock"], goal: ["Goal", "flag"], session: ["Study session", "play"], mistake: ["Mistake", "alert"],
  collection: ["Collection", "inbox"], screen: ["Screen", "grid"], page: ["Page", "link"],
};
const clean = (s) => String(s ?? "").trim();
const coursePath = (p) => { const x = clean(p).split("#")[0].replace(/index\.html$/, ""); return x.endsWith("/") ? x : `${x}/`; };

/** an id from its parts: a course item ("lesson", coursePath, id) or the learner's own thing ("pack", id) */
export function rid(kind, a, b) {
  if (!KINDS[kind]) throw new Error(`Unknown resource kind: ${kind}`);
  if (b != null) return `${kind}:${coursePath(a)}${clean(b)}`;
  if (kind === "course") return `course:${coursePath(a)}`;
  return `${kind}:${clean(a)}`;
}
/** "lesson:/scigradify/biology/u01-01" → { kind, course: "/scigradify/biology/", id: "u01-01" }; null if malformed */
export function parseRid(r) {
  const m = /^([a-z]+):(.+)$/.exec(clean(r)); if (!m || !KINDS[m[1]]) return null;
  const [, kind, rest] = m;
  if (kind === "course") return { kind, course: coursePath(rest), id: null };
  if (kind === "screen" || kind === "page") return { kind, course: null, id: rest };
  const i = rest.lastIndexOf("/");
  return rest.startsWith("/") && i > 0 ? { kind, course: rest.slice(0, i + 1), id: rest.slice(i + 1) } : { kind, course: null, id: rest };
}

// the routes inside a course (kit/course/course.js) and the study app (kit/app/main.js) that are resources
const COURSE_ROUTES = { lesson: "lesson", quiz: "quiz", learn: "unit", spec: "spec", target: "test" };
const APP_ROUTES = { deck: "pack", notes: "note", goal: "goal", collection: "collection" };
const isApp = (path) => /(^|\/)app\.html$/.test(path);

/** the resource a link points at (a path with its #/route), or a "page:" id for anything else. Pure. */
export function ridFromHref(href) {
  const h = clean(href); if (!h) return null;
  const [path, hash = ""] = h.split("#");
  const [route, arg] = hash.replace(/^\/?/, "").split("?")[0].split("/").map(decodeURIComponent);
  if (isApp(path)) {
    if (APP_ROUTES[route] && arg && !(route === "notes" && /^(daily|tasks|tag|cards|exams?|help|ask|io|pdf|guided|shared)$/.test(arg))) return rid(APP_ROUTES[route], arg);
    return `screen:${path}#/${route || "today"}`;
  }
  if (COURSE_ROUTES[route] && arg) return rid(COURSE_ROUTES[route], path, arg);
  if (!route || route === "home") return rid("course", path);
  return `page:${h}`;
}
/** where a resource opens; the study app's path is needed for the learner's own things. Pure. */
export function hrefOf(r, { app = "/app.html" } = {}) {
  const p = parseRid(r); if (!p) return null;
  if (p.kind === "screen" || p.kind === "page") return p.id;
  if (p.kind === "course") return `${p.course}#/home`;
  if (p.course) { const route = Object.entries(COURSE_ROUTES).find(([, k]) => k === p.kind)?.[0]; return route ? `${p.course}#/${route}/${encodeURIComponent(p.id)}` : `${p.course}#/home`; }
  const route = Object.entries(APP_ROUTES).find(([, k]) => k === p.kind)?.[0];
  return route ? `${app}#/${route}/${encodeURIComponent(p.id)}` : null;
}

/**
 * A resource as every tool shows it: its id, kind, how it's labelled and where it opens, and what it's about.
 * meta: { title, sub, subject, qualification, topic, difficulty, refs: [curriculum point ids] }.
 */
export function resource(r, meta = {}) {
  const p = parseRid(r); if (!p) return null;
  const [label, icon] = KINDS[p.kind];
  const out = { rid: r, kind: p.kind, label, icon, title: clean(meta.title) || label, href: meta.href || hrefOf(r), course: p.course };
  for (const k of ["sub", "subject", "qualification", "topic", "difficulty"]) if (meta[k] != null && meta[k] !== "") out[k] = meta[k];
  if (meta.refs?.length) out.refs = [...new Set(meta.refs)];
  return out;
}
/** the same resource from a pin, a history line or a workspace tab ({ href, title, sub, subject }) */
export const resourceFromPlace = (p) => (p?.href ? resource(ridFromHref(p.href) || `page:${p.href}`, { title: p.title, sub: p.sub || p.where, subject: p.subject, href: p.href }) : null);
