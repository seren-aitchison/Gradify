// Duplicate the course structure for a new subject site, then lock its ids. Every new course follows the
// PsychGradify/SocGradify pattern (content standard 2: objectives, key terms, summaries, typed and dated sources,
// evidence status, questions at three levels with permanent ids), run by the shared course engine.
//
//   node scripts/new-course.mjs scaffold <slug> --site EcoGradify --folder ecogradify --name "Ecology" \
//        --accent "#6aa84f" --expert "a university ecology lecturer"
//     creates kit/courses/<slug>/ (course.js, syllabus.js, ids.js, qa.js, interactives.js, evidence.js, registry.js,
//     notes/) and <folder>/course/index.html, and links the course from the site's homepage and nav. Never
//     overwrites an existing file.
//   node scripts/new-course.mjs lock <slug>
//     records every lesson id in ids.js and gives every question a permanent id (registry.js). Run after any
//     change to the syllabus or notes; tests/new-courses.test.mjs fails until it has been run.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { updateRegistry } from "./curriculum-registry.mjs";

const root = new URL("../", import.meta.url);
const exists = (p) => access(new URL(p, root)).then(() => true, () => false);
const [cmd, slug, ...rest] = process.argv.slice(2);
const opt = Object.fromEntries(rest.reduce((a, x, i, all) => (x.startsWith("--") ? [...a, [x.slice(2), all[i + 1]]] : a), []));
const today = new Date().toISOString().slice(0, 10);
async function put(p, text) {
  if (await exists(p)) { console.log(`  kept ${p} (exists)`); return; }
  await mkdir(new URL(p.replace(/[^/]+$/, ""), root), { recursive: true });
  await writeFile(new URL(p, root), text); console.log(`  wrote ${p}`);
}

async function scaffold() {
  const { site, folder, name, accent = "#a78bfa", expert = "a subject expert" } = opt;
  if (!slug || !site || !folder || !name) throw new Error("scaffold <slug> --site Name --folder dir --name Subject [--accent #hex --expert '…']");
  const dir = `kit/courses/${slug}/`;
  await put(`${dir}course.js`, `// ${site} ${name}: the curriculum, notes, interactives and quality record, handed to the shared course engine
// (kit/course/course.js), the same engine and lesson renderer that runs every Gradify course. Created by
// scripts/new-course.mjs from the PsychGradify pattern (content standard 2).
import { UNITS, TRACKS, PATHS, BLURBS } from "./syllabus.js";
import { QA, WRITTEN_ON } from "./qa.js";
import { INTERACTIVES } from "./interactives.js";
import { QUESTIONS, LESSONS } from "./registry.js";
import { EVIDENCE } from "./evidence.js";
export default {
  site: "${site}", slug: "${slug}", name: "${name}", app: "../app.html", page: "/${folder}/course/", unitWord: "School", trackWord: "Stage",
  // who must sign a school off before it counts as published (docs/CURRICULUM_QA.md)
  expert: "${expert}",
  units: UNITS, tracks: TRACKS, paths: PATHS, blurbs: BLURBS,
  qa: QA, reviewLine: true, writtenOn: WRITTEN_ON,
  questionVersions: QUESTIONS, lessonVersions: LESSONS,
  levels: ["Foundation", "Application", "Evaluation"],
  theme: { accent: "${accent}", spectrum: "linear-gradient(90deg, ${accent}, #22d3ee)" },
  notice: "<b>Study material, not a qualification.</b> The lessons were drafted with AI assistance and haven't yet been reviewed by subject experts, so they may contain errors; check important points against your course materials and official sources.",
  interactives: INTERACTIVES, evidence: EVIDENCE,
  practiceNote: "Interactives run a stated model or check your reasoning. Challenges inside them earn XP and count as evidence for their lesson.",
  exams: [
    ...TRACKS.map((t, i) => ({ id: \`stage-\${i + 1}\`, title: t.name, sub: "Mixed questions from every written school in this stage.", units: t.units, format: "science", count: 20, minutes: 30, pass: 0.7 })),
    { id: "whole", title: "Whole course", sub: "Forty mixed questions from every written school.", units: UNITS.map((u) => u.n), format: "science", count: 40, minutes: 60, pass: 0.7 },
  ],
  // the schools whose notes are written (one notes/uNN.js file each)
  written: [],
  notes: (unitId) => import(\`./notes/\${unitId}.js\`).then((m) => m.default),
  overview: {
    headline: "${name}",
    intro: "",
    sources: "",
    learn: [],
    featured: [],
    tools: [["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"]],
  },
  extras: [
    ["Learning map", "${site}'s subjects on one map.", "../map.html"],
    ["Notes Studio", "Turn your own notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
`);
  await put(`${dir}syllabus.js`, `// ${site} ${name}: the full curriculum. Each topic is taught as one lesson, grouped into modules ("> " lines) and
// stages (TRACKS). Lesson ids are permanent (ids.js, written by node scripts/new-course.mjs lock ${slug}): never
// renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = \`
1. First school
> First module
* First lesson
\`;

export const TRACKS = [
  { name: "Stage 1 · Foundations", units: [1], from: "${accent}", to: "#22d3ee" },
];

export const PATHS = [
  { id: "core", name: "The core", sub: "The essential schools, in order.", units: [1] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
`);
  await put(`${dir}ids.js`, `// Permanent lesson ids for ${slug} (see kit/course/syllabus.js). Never delete or reuse an id: saved progress, notes,
// flashcards and attempts depend on them. To rename a lesson, change its title here and in the syllabus. To remove
// one, move its id to RETIRED: retired ids are reserved forever. Written by node scripts/new-course.mjs lock ${slug}.
export const IDS = {};
export const RETIRED = {};
`);
  await put(`${dir}registry.js`, `// Generated by node scripts/new-course.mjs lock ${slug} (scripts/curriculum-registry.mjs). Don't edit by hand.
export const LESSONS = {};
export const QUESTIONS = {};
export const RETIRED_QUESTIONS = {};
`);
  await put(`${dir}qa.js`, `// Quality assurance record, one entry per written school (docs/CURRICULUM_QA.md): written and tested are derived;
// reviewed, sources and signoff are recorded facts, null until they have actually happened. AI review may complete
// "reviewed" only if \`by\` says so; it can never complete "sources" or "signoff".
export const QA = {};
// the date each school's notes were first written
export const WRITTEN_ON = {};
`);
  await put(`${dir}interactives.js`, `// ${site} interactives. Each entry: { id, title, sub, kind, note, schools, lessons: L("Lesson title", …), load }.
// kind: Experiment, Simulation, Illustrative model, Exercise, Explorer or Tool. Existing Gradify labs can be reused
// (load: () => import("../../labs/<area>/<file>.js")); lessons are named by title and resolved to permanent ids.
import { IDS } from "./ids.js";
const byTitle = new Map(Object.entries(IDS).map(([id, t]) => [t.toLowerCase(), id]));
export const L = (...titles) => titles.map((t) => { const id = byTitle.get(t.toLowerCase()); if (!id) throw new Error(\`interactives: no lesson "\${t}"\`); return id; });
export const INTERACTIVES = [];
`);
  await put(`${dir}evidence.js`, `// Mastery evidence maps: interactive → { challenge → the lesson it is evidence for } (scripts/evidence-maps.mjs).
export const EVIDENCE = {};
`);
  // the course page, from PsychGradify's
  let page = await readFile(new URL("psychgradify/course/index.html", root), "utf8");
  page = page.replaceAll("PsychGradify", site).replaceAll("kit/courses/psychology/", `kit/courses/${slug}/`).replaceAll("#a78bfa", accent)
    .replace(/<title>.*<\/title>/, `<title>${site} · ${name}</title>`)
    .replace(/<!-- .*? -->/, `<!-- ${site} ${name}: the whole curriculum (kit/courses/${slug}/) as a course, run by the shared course engine (kit/course/course.js). -->`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${site} ${name}: a structured course with lessons, check questions at three levels, flashcards, quizzes, exams and progress.">`)
    .replace(/\s*<link rel="stylesheet" href="..\/..\/kit\/styles\/social-labs.css">/, "")
    .replace(/\s*<a href="..\/3d.html">Brain 3D<\/a>/, (await exists(`${folder}/3d.html`)) ? `\n        <a href="../3d.html">3D</a>` : "")
    .replace(/\s*<a href="\/socgradify\/course\/">SocGradify<\/a>/, "");
  await put(`${folder}/course/index.html`, page);
  // link the course from the site's own pages
  for (const f of ["index.html", "map.html", "3d.html"]) {
    if (!(await exists(`${folder}/${f}`))) continue;
    let h = await readFile(new URL(`${folder}/${f}`, root), "utf8"); const before = h;
    if (!/href="course\/"/.test(h)) h = h.replace(/(<nav class="sub-links"[^>]*>\s*\n)(\s*)/, `$1$2<a href="course/">Course</a>\n$2`);
    if (f === "index.html" && !h.includes('class="sub-course"')) h = h.replace(/(\s*)<div id="sub-more"><\/div>/, `$1<a class="sub-course" href="course/">$1  <span class="sc-k">New course</span>$1  <b>${name}</b>$1  <span>${opt.blurb || `A structured ${name.toLowerCase()} course: schools of lessons with check questions at three levels, flashcards, quizzes and exams.`}</span>$1  <span class="sc-go">Choose your pathway →</span>$1</a>$1<div id="sub-more"></div>`);
    if (h !== before) { await writeFile(new URL(`${folder}/${f}`, root), h); console.log(`  linked the course from ${folder}/${f}`); }
  }
}

async function lock() {
  if (!slug) throw new Error("lock <slug>");
  const dir = new URL(`kit/courses/${slug}/`, root), t = `?t=${Date.now()}`;
  const ids = await import(`${new URL("ids.js", dir).href}${t}`);
  const { UNITS } = await import(`${new URL("syllabus.js", dir).href}${t}`);
  const IDS = { ...ids.IDS };
  for (const u of UNITS) for (const l of u.lessons) IDS[l.id] = l.title;
  const sorted = Object.fromEntries(Object.entries(IDS).sort(([a], [b]) => a.localeCompare(b)));
  const src = await readFile(new URL("ids.js", dir), "utf8");
  const head = src.split("\n").filter((l) => l.startsWith("//")).join("\n");
  await writeFile(new URL("ids.js", dir), `${head}\nexport const IDS = {\n${Object.entries(sorted).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n")}\n};\nexport const RETIRED = ${JSON.stringify(ids.RETIRED || {}, null, 2)};\n`);
  const course = (await import(`${new URL("course.js", dir).href}?t=${Date.now() + 1}`)).default;
  const { log } = await updateRegistry(slug, course, { today });
  console.log(`${slug}: ${Object.keys(sorted).length} lesson ids locked; ${log.length} registry change(s).`);
}

if (cmd === "scaffold") await scaffold();
else if (cmd === "lock") await lock();
else console.log("usage: node scripts/new-course.mjs scaffold|lock <slug> …");
