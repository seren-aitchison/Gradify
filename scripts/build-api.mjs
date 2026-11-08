// The Gradify content API: static JSON the native apps (and anything else) read, generated from the same course files
// the website runs, so a course registered on the website and a lesson written into its notes reach the apps with no
// app update. Lesson text is not copied here: each course's notes files (kit/courses/<slug>/notes/<unit>.js, format in
// kit/course/notes.js) are fetched and parsed by the client, as the tutor's server does (kit/assess/canon.js).
//   node scripts/build-api.mjs           writes kit/api/v1/ (CI checks it's up to date)
//   import { catalogue, courseApi }      used by tests/api.test.mjs
// Published as https://getgradify.com/kit/api/v1/catalogue.json and …/courses/<slug>.json.
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
  };
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

const json = (x) => `${JSON.stringify(x, null, 1)}\n`;
if (process.argv[1] && new URL(`file://${process.argv[1]}`).href === import.meta.url) {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(new URL("courses/", OUT), { recursive: true });
  const cat = await catalogue();
  await writeFile(new URL("catalogue.json", OUT), json(cat));
  for (const c of cat.courses) await writeFile(new URL(`courses/${c.slug}.json`, OUT), json(await courseApi(c.slug)));
  console.log(`api: ${cat.courses.length} courses, ${cat.courses.reduce((a, c) => a + c.lessons, 0)} lessons`);
}
