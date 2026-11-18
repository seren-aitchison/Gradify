// The Gradify content API: static JSON the native apps (and anything else) read, generated from the same course files
// the website runs, so a course registered on the website and a lesson written into its notes reach the apps with no
// app update. Lesson text is not copied here: each course's notes files (kit/courses/<slug>/notes/<unit>.js, format in
// kit/course/notes.js) are fetched and parsed by the client, as the tutor's server does (kit/assess/canon.js).
//   node scripts/build-api.mjs           writes kit/api/v1/ (CI checks it's up to date)
//   import { catalogue, courseApi }      used by tests/api.test.mjs
// Published as https://getgradify.com/kit/api/v1/catalogue.json, …/courses/<slug>.json and …/icons/<site>.json.
import { mkdir, readdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { SITES, slugOf } from "../kit/core/site.js";

const root = new URL("../", import.meta.url), OUT = new URL("kit/api/v1/", root);
export const API_VERSION = 1;

// the site each course lives on: the registry entry whose course page imports this course
async function courseSlugs() {
  const out = [];
  for (const d of await readdir(new URL("kit/courses/", root), { withFileTypes: true })) if (d.isDirectory() && existsSync(new URL(`kit/courses/${d.name}/course.js`, root))) out.push(d.name);
  return out.sort();
}
const pageOf = async (slug, site) => {
  // a course page is any <site>/…/index.html that mounts this course; found by scanning the site's folder
  const folder = slugOf(site.n), dir = new URL(`${folder}/`, root);
  const walk = async (d, rel = "") => {
    for (const e of await readdir(d, { withFileTypes: true }).catch(() => [])) {
      if (e.isDirectory()) { const r = await walk(new URL(`${e.name}/`, d), `${rel}${e.name}/`); if (r) return r; }
      else if (e.name.endsWith(".html")) {
        const txt = await (await import("node:fs/promises")).readFile(new URL(e.name, d), "utf8");
        if (txt.includes(`courses/${slug}/course.js`)) return `/${folder}/${rel}${e.name === "index.html" ? "" : e.name}`;
      }
    }
    return null;
  };
  return walk(dir);
};

export async function courseApi(slug) {
  const cfg = (await import(new URL(`kit/courses/${slug}/course.js`, root))).default;
  const written = new Set(cfg.written || cfg.units.map((u) => u.id));
  return {
    api: API_VERSION, slug: cfg.slug, name: cfg.name, site: cfg.site, unitWord: cfg.unitWord || "Unit",
    levels: cfg.levels || ["Easy", "Medium", "Hard"], notice: cfg.notice || null,
    notes: `/kit/courses/${cfg.slug}/notes/{unit}.js`,
    tracks: (cfg.tracks || []).map((t) => ({ name: t.name, units: t.units, from: t.from || null, to: t.to || null })),
    paths: (cfg.paths || []).map((p) => ({ id: p.id, name: p.name, sub: p.sub || "", units: p.units, select: p.select || null })),
    exams: (cfg.exams || []).map((e) => ({ id: e.id, title: e.title, sub: e.sub || "", units: e.units || null, path: e.path || null, count: e.count, minutes: e.minutes, pass: e.pass ?? 0.6, format: e.format || "mixed" })),
    units: cfg.units.map((u) => ({ id: u.id, n: u.n, title: u.title, written: written.has(u.id), lessons: u.lessons.map((l) => ({ id: l.id, title: l.title, module: l.module || null })) })),
    // the course's labs (added in v1, additive). A lesson's notes place one with an "IX: <id>" line; an app shows it by
    // opening `url`, the lab on its own on the course page, in a web view. `lessons` are the lessons it serves.
    interactives: await labsOf(cfg),
  };
}

async function labsOf(cfg) {
  const ixs = cfg.interactives || [];
  if (!ixs.length) return [];
  const site = SITES.find((s) => s.n === cfg.site), page = site ? await pageOf(cfg.slug, site) : null;
  return ixs.map((x) => ({
    id: x.id, title: x.title, kind: x.kind || "Laboratory", sub: x.sub || "", note: x.note || null,
    tasks: x.tasks ?? null, lessons: x.lessons || [],
    url: page ? `https://getgradify.com${page}#/practice/${encodeURIComponent(x.id)}` : null,
  }));
}

export async function catalogue() {
  const courses = [];
  for (const slug of await courseSlugs()) {
    const cfg = (await import(new URL(`kit/courses/${slug}/course.js`, root))).default;
    const site = SITES.find((s) => s.n === cfg.site);
    const lessons = cfg.units.reduce((a, u) => a + u.lessons.length, 0);
    const written = new Set(cfg.written || cfg.units.map((u) => u.id));
    courses.push({
      slug: cfg.slug, name: cfg.name, site: cfg.site, status: site?.status || null, accent: site?.c ? `#${site.c}` : null,
      page: site ? await pageOf(slug, site) : null, units: cfg.units.length, lessons,
      lessonsWritten: cfg.units.filter((u) => written.has(u.id)).reduce((a, u) => a + u.lessons.length, 0),
      syllabus: `/kit/api/v1/courses/${cfg.slug}.json`,
    });
  }
  return {
    api: API_VERSION, origin: "https://getgradify.com",
    about: "Gradify's courses for apps. Each course's syllabus is at `syllabus`; lesson text is in its notes files (`notes`, one per unit, the format documented in kit/course/notes.js).",
    courses,
  };
}

// the 3D glass icon sets (kit/icons3d/<site>.js, kit/core/glass-icons.js) as JSON, so the apps draw the same icons:
// an array, because the order decides which symbol a lesson gets when nothing matches its words
export async function iconSets() {
  const out = {};
  for (const f of (await readdir(new URL("kit/icons3d/", root))).filter((x) => x.endsWith(".js")).sort()) {
    const set = (await import(new URL(`kit/icons3d/${f}`, root))).default;
    out[f.replace(/\.js$/, "")] = { api: API_VERSION, licence: "Lucide (ISC), kit/icons3d/LICENSE", symbols: Object.entries(set).map(([n, v]) => ({ n, t: v.t, d: v.d })) };
  }
  return out;
}

// The lesson search index for Tools (kit/tools/search.js): every written lesson's title, module, unit, key terms and
// section headings, compact, so one file finds a lesson anywhere on Gradify. The lesson itself is read from its notes.
export async function lessonIndex() {
  const { parseNotes, norm } = await import(new URL("kit/course/notes.js", root));
  const courses = [], lessons = [], totals = { cards: 0, questions: 0 };
  for (const slug of await courseSlugs()) {
    const cfg = (await import(new URL(`kit/courses/${slug}/course.js`, root))).default;
    const site = SITES.find((s) => s.n === cfg.site), ci = courses.length;
    courses.push([cfg.slug, cfg.name, cfg.site, site ? await pageOf(slug, site) : null, site?.c ? `#${site.c}` : null]);
    const written = new Set(cfg.written || cfg.units.map((u) => u.id));
    for (const u of cfg.units) {
      if (!written.has(u.id)) continue;
      let text = null;
      try { text = await cfg.notes(u.id); } catch { /* not written yet */ }
      if (typeof text !== "string") continue;
      const byTitle = Object.fromEntries(parseNotes(text).map((p) => [norm(p.title), p]));
      for (const l of u.lessons) {
        const L = byTitle[norm(l.title)]; if (!L) continue;
        totals.cards += L.cards.length; totals.questions += L.mcq.length + L.tasks.length;
        const clean = (x) => String(x).replace(/\*\*|`/g, "").replace(/\|/g, "/").trim();
        lessons.push([ci, u.id, l.id, clean(l.title), clean(l.module || ""), clean(u.title), L.terms.slice(0, 6).map((t) => clean(t[0])).join("|"), L.blocks.filter((b) => b.t === "h").slice(0, 6).map((b) => clean(b.x)).join("|")]);
      }
    }
  }
  return { api: API_VERSION, fields: ["course", "unit", "lesson", "title", "module", "unitTitle", "terms", "headings"], courses, lessons,
    // for the homepage's numbers (assets/proof.js): what's on Gradify, counted from the courses themselves
    stats: { subjects: courses.length, lessons: lessons.length, mindMaps: lessons.length * 5, flashcards: totals.cards, questions: totals.questions } };
}

const json = (x) => `${JSON.stringify(x, null, 1)}\n`;
if (process.argv[1] && new URL(`file://${process.argv[1]}`).href === import.meta.url) {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(new URL("courses/", OUT), { recursive: true });
  const cat = await catalogue();
  await writeFile(new URL("catalogue.json", OUT), json(cat));
  for (const c of cat.courses) await writeFile(new URL(`courses/${c.slug}.json`, OUT), json(await courseApi(c.slug)));
  const ix = await lessonIndex();
  await writeFile(new URL("lessons.json", OUT), JSON.stringify({ ...ix, stats: undefined }));
  await writeFile(new URL("stats.json", OUT), json({ api: API_VERSION, about: "What's on Gradify, counted from the courses: written lessons, five mind maps for each, their flashcards and practice questions.", ...ix.stats }));
  await mkdir(new URL("icons/", OUT), { recursive: true });
  for (const [slug, set] of Object.entries(await iconSets())) await writeFile(new URL(`icons/${slug}.json`, OUT), JSON.stringify(set));
  console.log(`api: ${cat.courses.length} courses, ${cat.courses.reduce((a, c) => a + c.lessons, 0)} lessons`);
}
