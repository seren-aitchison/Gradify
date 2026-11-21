// Visual Learning Engine curriculum inventory: every site, every course and the site(s) that serve it, every unit and
// lesson, which lessons are written, and for each written lesson the diagrams placed in it (D: lines, with their
// manifest status), the interactive labs linked to it, and what the course's visual plan says about it.
// Worked out from the repository, never from docs:
//   sites            kit/core/site.js (SITES); a site serves a course when an .html page in its folder imports
//                    kit/courses/<slug>/course.js (the course's declared `site` is recorded and compared)
//   units, lessons   kit/courses/<slug>/course.js (its `units` are the syllabus UNITS)
//   written          the unit is in the course's `written` list (or the course has none) and notes/uNN.js has a
//                    `## <lesson title>` section (the course engine matches sections to lessons by title)
//   diagrams         `D: <id>` lines in the lesson's section; status from kit/diagrams/manifest.json
//   labs             interactives.js: a lab is linked to every lesson in its `lessons` list; `IX: <id>` lines in the
//                    lesson's section embed it
//   plan             kit/diagrams/plans/<course>.mjs rows (same shapes as scripts/diagrams/coverage.mjs): PLAN is the
//                    file's course, CHEMISTRY is chemistry, GCSE is the GCSE school; rows for one course from several
//                    plan files are merged. A written lesson with no row is "not yet assessed".
//
//   node scripts/visual/inventory.mjs           write docs/visual-learning/inventory.json and INVENTORY.md
//   node scripts/visual/inventory.mjs --check   exit 1 if either file is out of date
//   import { buildInventory, renderMarkdown }    used by tests/visual-inventory.test.mjs
import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { norm } from "../../kit/core/text.js";

const ROOT = new URL("../../", import.meta.url).pathname;
const OUT_JSON = "docs/visual-learning/inventory.json", OUT_MD = "docs/visual-learning/INVENTORY.md";
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const imp = (p) => import(pathToFileURL(join(ROOT, p)).href);
const SHOWN = new Set(["validated", "ai-reviewed", "approved"]);   // every status but "failed" is shown to learners

/** html files under a site folder, recursively */
function htmlFiles(dir) {
  const out = [];
  for (const f of readdirSync(join(ROOT, dir))) {
    if (f === "node_modules" || f.startsWith(".")) continue;
    const p = `${dir}/${f}`;
    if (statSync(join(ROOT, p)).isDirectory()) out.push(...htmlFiles(p));
    else if (f.endsWith(".html")) out.push(p);
  }
  return out.sort();
}

/** notes/uNN.js → { norm(title): { title, d: [ids], ix: [ids] } } for each `## Title` section (the engine matches
 * sections to lessons by norm(title), kit/course/course.js) */
function sections(course, unit) {
  const p = `kit/courses/${course}/notes/${unit}.js`, out = new Map();
  if (!existsSync(join(ROOT, p))) return out;
  for (const part of read(p).split(/\n## /).slice(1)) {
    const title = part.slice(0, part.indexOf("\n")).trim();
    out.set(norm(title), { title, d: [...part.matchAll(/^D:\s*(\S+)\s*$/gm)].map((m) => m[1]), ix: [...part.matchAll(/^IX:\s*(\S+)\s*$/gm)].map((m) => m[1]) });
  }
  return out;
}

/** every plan file's rows, by target course */
async function plans() {
  const by = {}, dir = "kit/diagrams/plans";
  if (!existsSync(join(ROOT, dir))) return by;
  for (const f of readdirSync(join(ROOT, dir)).filter((f) => f.endsWith(".mjs")).sort()) {
    const m = await imp(`${dir}/${f}`), file = f.replace(".mjs", "");
    const sets = [[file, m.PLAN], ["chemistry", m.CHEMISTRY], ["gcse", m.GCSE]];
    for (const [course, rows] of sets) if (Array.isArray(rows)) (by[course] ||= { files: [], rows: [] }).files.push(`${dir}/${f}`), by[course].rows.push(...rows);
  }
  return by;
}

const zero = () => ({ lessons: 0, written: 0, assessed: 0, plannedVisual: 0, plannedDiagram: 0, plannedLab: 0, excluded: 0, notAssessed: 0,
  withDiagram: 0, withLab: 0, withBoth: 0, withAny: 0, plannedNotDelivered: 0, placements: 0 });
const add = (a, b) => { for (const k of Object.keys(a)) a[k] += b[k]; return a; };

export async function buildInventory() {
  const manifest = JSON.parse(read("kit/diagrams/manifest.json"));
  const { SITES, slugOf } = await imp("kit/core/site.js");
  const allPlans = await plans();
  const problems = [];
  const problem = (kind, course, detail) => problems.push({ kind, course, detail });

  // sites and the course pages in their folders
  const sites = [];
  const servedBy = {};
  for (const s of SITES) {
    const slug = slugOf(s), folder = existsSync(join(ROOT, slug)) && statSync(join(ROOT, slug)).isDirectory() ? slug : null;
    const pages = [];
    if (folder) for (const p of htmlFiles(folder)) for (const m of read(p).matchAll(/kit\/courses\/([a-z0-9-]+)\/course\.js/g)) {
      pages.push({ page: p, course: m[1] });
      (servedBy[m[1]] ||= new Set()).add(s.n);
    }
    sites.push({ name: s.n, slug, status: s.status, folder, pages, courses: [...new Set(pages.map((x) => x.course))].sort() });
  }

  // courses
  const placedAt = {};   // diagram id → [{course, unit, lesson}]
  const courses = [];
  for (const slug of readdirSync(join(ROOT, "kit/courses")).filter((f) => existsSync(join(ROOT, `kit/courses/${f}/course.js`))).sort()) {
    const c = (await imp(`kit/courses/${slug}/course.js`)).default;
    const plan = allPlans[slug], labs = c.interactives || [], labIds = new Set(labs.map((x) => x.id));
    const labsFor = {};
    for (const x of labs) for (const lid of x.lessons || []) (labsFor[lid] ||= []).push(x.id);
    const planFor = {};
    for (const row of plan?.rows || []) (planFor[row[0]] ||= []).push(row);
    const ids = new Set(), titles = {};
    if (existsSync(join(ROOT, `kit/courses/${slug}/ids.js`))) for (const m of read(`kit/courses/${slug}/ids.js`).matchAll(/"(u\d\d-\d\d)":\s*"((?:[^"\\]|\\.)*)"/g)) titles[m[1]] = JSON.parse(`"${m[2]}"`);
    const served = [...(servedBy[slug] || [])].sort();
    if (!served.length) problem("course not served by any site page", slug, `no .html page in a site folder imports kit/courses/${slug}/course.js`);
    if (c.site && served.length && !served.includes(c.site)) problem("declared site does not serve the course", slug, `course.site is ${c.site}; pages are in ${served.join(", ")}`);
    const course = { slug, name: c.name, declaredSite: c.site || null, servedBy: served, plan: plan ? plan.files : null, labs: labs.length, totals: zero(), units: [] };
    for (const u of c.units) {
      const writtenUnit = !c.written || c.written.includes(u.id), secs = sections(slug, u.id), used = new Set();
      const unit = { id: u.id, title: u.title, writtenUnit, totals: zero(), lessons: [] };
      for (const l of u.lessons) {
        ids.add(l.id);
        if (titles[l.id] !== undefined && titles[l.id] !== l.title) problem("ids.js and syllabus titles differ", slug, `${l.id}: "${titles[l.id]}" / "${l.title}"`);
        const sec = writtenUnit ? secs.get(norm(l.title)) : null;
        if (sec) used.add(norm(l.title));
        const t = unit.totals; t.lessons++;
        const linked = (labsFor[l.id] || []).filter((x, i, a) => a.indexOf(x) === i).sort();
        if (!sec) {
          if (writtenUnit && existsSync(join(ROOT, `kit/courses/${slug}/notes/${u.id}.js`))) problem("lesson in a written unit has no notes section", slug, `${l.id} ${l.title}`);
          const lesson = { id: l.id, title: l.title, written: false };
          if (linked.length) lesson.labs = linked;
          if (planFor[l.id]) problem("plan row for an unwritten lesson", slug, l.id);
          unit.lessons.push(lesson); continue;
        }
        t.written++;
        const diagrams = sec.d.map((id) => ({ id, status: manifest[id]?.status || "missing" }));
        for (const d of diagrams) {
          (placedAt[d.id] ||= []).push({ course: slug, unit: u.id, lesson: l.title });
          if (d.status === "missing") problem("D: line names a diagram not in the manifest", slug, `${l.id} ${l.title}: ${d.id}`);
        }
        for (const x of sec.ix) if (!labIds.has(x)) problem("IX: line names an unknown lab", slug, `${l.id} ${l.title}: ${x}`);
        const labsHere = [...new Set([...linked, ...sec.ix.filter((x) => labIds.has(x))])].sort();
        const rows = planFor[l.id] || [];
        const pd = rows.filter((r) => r[1] && r[1] !== "lab"), pl = rows.filter((r) => r[1] === "lab"), pn = rows.filter((r) => !r[1]);
        let verdict = "not yet assessed";
        if (pd.length && pl.length) verdict = "diagram+lab"; else if (pd.length) verdict = "diagram"; else if (pl.length) verdict = "lab"; else if (pn.length) verdict = "none";
        const planEntry = { verdict };
        if (pd.length) planEntry.diagrams = pd.map((r) => r[2]);
        if (pl.length) planEntry.labs = pl.map((r) => r[2]);
        if (!pd.length && !pl.length && pn.length) planEntry.reason = pn[0][2];
        for (const r of pl) if (!labIds.has(r[2])) problem("plan names a lab the course does not have", slug, `${l.id}: ${r[2]}`);
        const shown = diagrams.filter((d) => SHOWN.has(d.status)).map((d) => d.id);
        const missingPlanned = pd.map((r) => r[2]).filter((id) => !shown.includes(id));
        if (missingPlanned.length) planEntry.notDelivered = missingPlanned;
        const hasD = shown.length > 0, hasL = labsHere.length > 0;
        if (plan && verdict === "none" && diagrams.length) problem("plan excludes a lesson that places a diagram", slug, `${l.id} ${l.title}: ${sec.d.join(", ")}`);
        if (plan && pd.length) for (const d of sec.d) if (!pd.some((r) => r[2] === d)) problem("diagram placed but not in the plan for its lesson", slug, `${l.id} ${l.title}: ${d}`);
        t.placements += diagrams.length;
        if (verdict !== "not yet assessed") t.assessed++; else t.notAssessed++;
        if (verdict === "none") t.excluded++;
        if (pd.length || pl.length) t.plannedVisual++;
        if (pd.length) t.plannedDiagram++;
        if (pl.length) t.plannedLab++;
        if (missingPlanned.length) t.plannedNotDelivered++;
        if (hasD) t.withDiagram++; if (hasL) t.withLab++; if (hasD && hasL) t.withBoth++; if (hasD || hasL) t.withAny++;
        unit.lessons.push({ id: l.id, title: l.title, written: true, diagrams, labs: labsHere, plan: planEntry });
      }
      for (const [k, x] of secs) if (writtenUnit && !used.has(k)) problem("notes section matches no syllabus lesson", slug, `${u.id}: ## ${x.title}`);
      add(course.totals, unit.totals);
      course.units.push(unit);
    }
    for (const x of labs) for (const lid of x.lessons || []) if (!ids.has(lid)) problem("lab linked to a lesson not in the syllabus", slug, `${x.id} → ${lid}`);
    for (const lid of Object.keys(planFor)) if (!ids.has(lid)) problem("plan row for a lesson not in the syllabus", slug, lid);
    courses.push(course);
  }
  for (const c of Object.keys(allPlans)) if (!courses.some((x) => x.slug === c)) problem("plan for a course that does not exist", c, allPlans[c].files.join(", "));

  // diagrams
  const byStatus = {}, placedByStatus = {};
  for (const d of Object.values(manifest)) byStatus[d.status] = (byStatus[d.status] || 0) + 1;
  for (const id of Object.keys(placedAt)) { const s = manifest[id]?.status || "missing"; placedByStatus[s] = (placedByStatus[s] || 0) + 1; }
  const failing = Object.entries(manifest).filter(([, d]) => d.status === "failed").map(([id, d]) => ({ id, course: d.course, lesson: d.lesson, failed: (d.checks || []).filter((k) => !k.ok).map((k) => k.name) }));
  const unplaced = Object.keys(manifest).filter((id) => !placedAt[id]).sort();
  for (const [id, at] of Object.entries(placedAt)) {
    const m = manifest[id]; if (!m) continue;
    const where = [{ course: m.course, lesson: m.lesson, unit: m.unit }, ...(m.also || [])];
    for (const p of at) if (!where.some((w) => w.course === p.course && w.lesson === p.lesson && (!w.unit || w.unit === p.unit))) problem("diagram placed in a lesson its spec does not name", p.course, `${id} in ${p.unit} ${p.lesson}`);
  }
  const diagrams = {
    manifest: Object.keys(manifest).length, uniquePlaced: Object.keys(placedAt).length,
    placements: Object.values(placedAt).reduce((a, x) => a + x.length, 0),
    reused: Object.entries(placedAt).filter(([, x]) => x.length > 1).length,
    byStatus: sortObj(byStatus), placedByStatus: sortObj(placedByStatus), failing, unplaced,
  };

  // totals: overall counts each course once; a site sums the courses it serves
  const totals = { sites: sites.length, sitesServingCourses: sites.filter((s) => s.courses.length).length, courses: courses.length, coursesWithPlan: courses.filter((c) => c.plan).length, ...courses.reduce((a, c) => add(a, c.totals), zero()) };
  for (const s of sites) s.totals = courses.filter((c) => s.courses.includes(c.slug)).reduce((a, c) => add(a, c.totals), zero());
  problems.sort((a, b) => a.kind.localeCompare(b.kind) || a.course.localeCompare(b.course) || a.detail.localeCompare(b.detail));
  return { about: "Generated by scripts/visual/inventory.mjs from the repository; do not edit by hand.", totals, diagrams, problems,
    sites: sites.map((s) => ({ ...s, pages: [...new Set(s.pages.map((p) => p.page))] })), courses };
}

const sortObj = (o) => Object.fromEntries(Object.entries(o).sort());
const pct = (n, d) => (d ? `${Math.round((100 * n) / d)}%` : "–");

export function renderMarkdown(inv) {
  const T = inv.totals, D = inv.diagrams, L = [];
  const row = (cells) => L.push(`| ${cells.join(" | ")} |`);
  const head = (cells, align) => { row(cells); row(align || cells.map((_, i) => (i ? "---:" : "---"))); };
  const nums = (t) => [t.written, t.assessed, t.withDiagram, t.withLab, t.withBoth, t.excluded, `**${t.notAssessed}**`];
  const COLS = ["written", "assessed", "with diagram", "with lab", "both", "excluded", "**not yet assessed**"];
  L.push("# Visual Learning Engine: curriculum inventory", "",
    "Generated by `node scripts/visual/inventory.mjs` from the repository (sites in `kit/core/site.js` and their folders, courses in `kit/courses/`, notes, `interactives.js`, `kit/diagrams/manifest.json` and `kit/diagrams/plans/`). Do not edit by hand; `--check` fails when it is out of date. The full lesson-by-lesson data is in `inventory.json`.", "",
    `## Remaining work: ${T.notAssessed} of ${T.written} written lessons not yet assessed (${pct(T.notAssessed, T.written)})`, "",
    `${T.assessed} written lessons (${pct(T.assessed, T.written)}) have been assessed for visuals in a plan, across ${T.coursesWithPlan} of ${T.courses} courses. Every other written lesson still needs a decision: a diagram, a lab, or no visual with the reason.`, "",
    "## Totals", "");
  head(["", "count"]);
  for (const [k, v] of [
    ["sites", `${T.sites} (${T.sitesServingCourses} serve a course)`], ["courses", `${T.courses} (${T.coursesWithPlan} with a visual plan)`],
    ["lessons in syllabuses", T.lessons], ["written lessons", T.written],
    ["assessed for visuals", `${T.assessed} (${pct(T.assessed, T.written)})`],
    ["… visual planned (diagram and/or lab)", `${T.plannedVisual} (${T.plannedDiagram} diagram, ${T.plannedLab} lab)`],
    ["… excluded with a reason", T.excluded], ["… planned but not yet delivered", T.plannedNotDelivered],
    ["**not yet assessed**", `**${T.notAssessed}** (${pct(T.notAssessed, T.written)})`],
    ["written lessons with a static diagram shown", T.withDiagram], ["… with an interactive lab", T.withLab], ["… with both", T.withBoth], ["… with either", T.withAny],
    ["diagrams in the manifest", D.manifest], ["unique diagram ids placed / placements", `${D.uniquePlaced} / ${D.placements} (${D.reused} ids reused)`],
    ["diagrams failing validation", D.failing.length], ["diagrams in the manifest but not placed", D.unplaced.length],
    ["data quality problems", inv.problems.length],
  ]) row([k, v]);
  L.push("", "Definitions: *written* means the unit is in the course's `written` list and its notes file has a `## <title>` section for the lesson. *Assessed* means the course's visual plan has a row for the lesson; *excluded* means its only rows give a reason for no visual. *With diagram* counts a placed `D:` diagram that is shown (validated, ai-reviewed or approved); *with lab* counts a lab whose `lessons` list names the lesson, or an `IX:` line in it. Diagram and lab counts are of what exists, planned or not.", "",
    "## By site", "", "A course served by more than one site counts under each of them.", "");
  head(["site", "courses", ...COLS], ["---", "---", ...COLS.map(() => "---:")]);
  for (const s of inv.sites) if (s.courses.length) row([s.name, s.courses.join(", "), ...nums(s.totals)]);
  const empty = inv.sites.filter((s) => !s.courses.length).map((s) => s.name);
  if (empty.length) L.push("", `Sites serving no course page: ${empty.join(", ")}.`);
  L.push("", "## By course", "");
  head(["course", "served by", "plan", "units", "lessons", ...COLS], ["---", "---", "---", ...COLS.map(() => "---:"), "---:", "---:"]);
  for (const c of [...inv.courses].sort((a, b) => b.totals.written - a.totals.written || a.slug.localeCompare(b.slug)))
    row([`${c.name} (\`${c.slug}\`)`, c.servedBy.join(", ") || "–", c.plan ? "yes" : "–", c.units.length, c.totals.lessons, ...nums(c.totals)]);
  L.push("", "## Diagrams", "", `${D.manifest} diagrams in the manifest; ${D.uniquePlaced} unique ids placed in ${D.placements} lesson placements (${D.reused} ids placed in more than one lesson).`, "");
  head(["review status", "in manifest", "placed"]);
  for (const s of [...new Set([...Object.keys(D.byStatus), ...Object.keys(D.placedByStatus)])].sort()) row([s, D.byStatus[s] || 0, D.placedByStatus[s] || 0]);
  L.push("", D.failing.length ? `Failing validation: ${D.failing.map((f) => `\`${f.id}\` (${f.failed.join("; ")})`).join(", ")}.` : "No diagram is failing validation.");
  if (D.unplaced.length) L.push("", `In the manifest but not placed in any lesson: ${D.unplaced.map((x) => `\`${x}\``).join(", ")}.`);
  const detailed = inv.courses.filter((c) => c.plan);
  L.push("", "## By unit", "", `Only courses with a visual plan (${detailed.map((c) => c.slug).join(", ")}); every other course is not yet assessed throughout.`);
  for (const c of detailed) {
    L.push("", `### ${c.name} (\`${c.slug}\`)${c.plan ? ` · plan: ${c.plan.map((p) => `\`${p}\``).join(", ")}` : " · no plan"}`, "");
    head(["unit", "lessons", ...COLS]);
    for (const u of c.units) if (u.totals.written) row([`${u.id} ${u.title}`, u.totals.lessons, ...nums(u.totals)]);
    const unw = c.units.filter((u) => !u.totals.written).map((u) => u.id);
    if (unw.length) L.push("", `Units with no written lessons: ${unw.join(", ")}.`);
  }
  L.push("", "## Data quality", "");
  if (!inv.problems.length) L.push("No problems found.");
  else {
    const kinds = {};
    for (const p of inv.problems) (kinds[p.kind] ||= []).push(p);
    head(["problem", "count", "examples"], ["---", "---:", "---"]);
    for (const [k, ps] of Object.entries(kinds)) row([k, ps.length, ps.slice(0, 5).map((p) => `${p.course}: ${p.detail}`.replace(/\|/g, "\\|")).join("; ") + (ps.length > 5 ? "; …" : "")]);
    L.push("", "Every problem is listed in `inventory.json` (`problems`).");
  }
  return L.join("\n") + "\n";
}

/** JSON with anything short (a lesson, a site's totals) on one line, so the file stays reviewable */
function pretty(v, pad = "") {
  const flat = JSON.stringify(v);
  if (flat.length <= 200 || v === null || typeof v !== "object") return flat;
  const inner = pad + " ";
  if (Array.isArray(v)) return `[\n${v.map((x) => inner + pretty(x, inner)).join(",\n")}\n${pad}]`;
  return `{\n${Object.entries(v).map(([k, x]) => `${inner}${JSON.stringify(k)}: ${pretty(x, inner)}`).join(",\n")}\n${pad}}`;
}

/** the generated files' contents */
export async function generate() {
  const inv = await buildInventory();
  return { inv, json: pretty(inv) + "\n", md: renderMarkdown(inv) };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { inv, json, md } = await generate();
  const cur = (p) => (existsSync(join(ROOT, p)) ? read(p) : null);
  if (process.argv.includes("--check")) {
    const stale = [[OUT_JSON, json], [OUT_MD, md]].filter(([p, s]) => cur(p) !== s).map(([p]) => p);
    if (stale.length) { console.error(`out of date: ${stale.join(", ")}; run node scripts/visual/inventory.mjs`); process.exit(1); }
    console.log("visual inventory is up to date");
  } else {
    mkdirSync(join(ROOT, "docs/visual-learning"), { recursive: true });
    writeFileSync(join(ROOT, OUT_JSON), json); writeFileSync(join(ROOT, OUT_MD), md);
    const T = inv.totals;
    console.log(`${T.sites} sites, ${T.courses} courses, ${T.written} written lessons: ${T.assessed} assessed, ${T.notAssessed} not yet assessed; ${T.withDiagram} with a diagram, ${T.withLab} with a lab, ${T.withBoth} both, ${T.excluded} excluded; ${inv.problems.length} data problems`);
  }
}
