// Gradify's UK curriculum coverage and content progress, in one report:
//   node scripts/curriculum-progress.mjs        (npm run curriculum runs it)
// writes docs/qa/uk-coverage.md (the matrix and progress, readable) and docs/qa/uk-coverage.json (the same data, for
// the dashboard). Read-only otherwise.
//
// Content stages, per lesson, from strongest evidence to weakest claim (Quality Constitution articles 2–4):
//   approved          the school is signed off by its named expert (qa.js signoff)
//   human reviewed    the school has a recorded structured review (qa.js reviewed)
//   auto-validated    the lesson passes content standard 2 now (scripts/lesson-standard.mjs), recomputed every run
//   enhanced          rewritten or upgraded in a recorded batch (docs/qa/batches/*.json)
//   generated         written new in a recorded batch
// and, for specifications: source-verified (extracted from the published document, with its SHA-256) and checked.
import { readFile, readdir, writeFile } from "node:fs/promises";
import { parseNotes } from "../kit/course/notes.js";
import { norm } from "../kit/core/text.js";
import { lessonProblems } from "./lesson-standard.mjs";
import { KB } from "../kit/curriculum/knowledge.js";
import { matrix, LEVELS, LEVEL_NAMES } from "../kit/curriculum/matrix.js";
import { BAND_NAMES } from "../kit/curriculum/schema.js";
import { QUALIFICATIONS } from "../kit/curriculum/coverage.js";
import { LISTING } from "../kit/curriculum/catalogue/uk.js";

const ROOT = new URL("../", import.meta.url);
const pct = (a, b) => (b ? `${Math.round((100 * a) / b)}%` : "—");

export async function batches() {
  let files = []; try { files = (await readdir(new URL("docs/qa/batches/", ROOT))).filter((f) => f.endsWith(".json")).sort(); } catch { /* none yet */ }
  const out = [];
  for (const f of files) { try { out.push({ file: f, ...JSON.parse(await readFile(new URL(`docs/qa/batches/${f}`, ROOT), "utf8")) }); } catch (e) { out.push({ file: f, error: e.message }); } }
  return out;
}

/** Per course: lessons, written, auto-validated, enhanced, generated, reviewed, approved. */
export async function contentProgress(done) {
  const touched = new Map();
  for (const b of done) for (const l of b.lessons || []) touched.set(`${l.course}/${l.lesson}`, l.action);
  const rows = [];
  for (const slug of (await readdir(new URL("kit/courses/", ROOT))).sort()) {
    let cfg; try { cfg = (await import(new URL(`kit/courses/${slug}/course.js`, ROOT).href)).default; } catch { continue; }
    const r = { course: slug, site: cfg.site, name: cfg.name, lessons: 0, written: 0, valid: 0, enhanced: 0, generated: 0, reviewed: 0, approved: 0 };
    const ixIds = new Set((cfg.interactives || []).map((x) => x.id));
    for (const u of cfg.units) {
      r.lessons += u.lessons.length;
      if (!(cfg.written || []).includes(u.id)) continue;
      let text = ""; try { text = await cfg.notes(u.id); } catch { continue; }
      const parsed = parseNotes(text), qa = cfg.qa?.[u.id] || {};
      for (const l of u.lessons) {
        const L = parsed.find((p) => norm(p.title) === norm(l.title)); if (!L) continue;
        r.written++;
        if (!lessonProblems(L, l.id, { ixIds }).length) r.valid++;
        const t = touched.get(`${slug}/${l.id}`); if (t === "enhanced") r.enhanced++; if (t === "generated") r.generated++;
        if (qa.reviewed) r.reviewed++; if (qa.signoff) r.approved++;
      }
    }
    rows.push(r);
  }
  return rows;
}

export async function progressReport(lessons = null) {
  const done = await batches(), content = await contentProgress(done), m = matrix(KB, lessons);
  const T = content.reduce((a, r) => { for (const k of Object.keys(r)) if (typeof r[k] === "number") a[k] = (a[k] || 0) + r[k]; return a; }, {});
  const specs = KB.specs, extracted = specs.filter((s) => s.extracted).length, checked = specs.filter((s) => s.checked).length;
  const fixes = done.flatMap((b) => (b.lessons || []).flatMap((l) => (l.findings || []).map((f) => ({ ...f, course: l.course, lesson: l.lesson }))));
  const fx = (c) => fixes.filter((f) => f.class === c).length;
  const data = { generated: new Date().toISOString().slice(0, 10), listing: LISTING, totals: T, content, matrix: { byStatus: m.byStatus, byNation: m.byNation, byBand: m.byBand, byGroup: m.byGroup, byQualification: m.byQualification, byBody: m.byBody, outcomes: m.outcomes },
    rows: m.rows.map((r) => ({ id: r.id, body: r.bodyName, qualification: r.qualification ? QUALIFICATIONS[r.qualification]?.name : r.framework, band: r.band, nations: r.nations, subject: r.subjectName, group: r.group, code: r.code, title: r.title, status: r.status, courses: r.courses, related: r.related, measure: r.measure })),
    specs: { total: specs.length, extracted, checked, outcomes: specs.reduce((n, s) => n + s.outcomes.length, 0) },
    findings: { errorsFixed: fx("error-fixed"), errorsSuspected: fx("error-suspected"), gaps: fx("gap"), editorial: fx("editorial"), curriculumDependent: fx("curriculum-dependent"), needsSource: fx("needs-source") },
    batches: done.map((b) => ({ file: b.file, task: b.task, lessons: (b.lessons || []).length, specs: (b.specs || []).length, error: b.error })) };
  const nat = { "uk-eng": "England", "uk-wal": "Wales", "uk-sco": "Scotland", "uk-ni": "Northern Ireland" };
  const statusRow = (label, t) => `| ${label} | ${LEVELS.map((l) => t?.[l] || 0).join(" | ")} | ${Object.values(t || {}).reduce((a, b) => a + b, 0)} |`;
  const head = `| | ${LEVELS.map((l) => LEVEL_NAMES[l]).join(" | ")} | Total |\n|---|${LEVELS.map(() => "---").join("|")}|---|`;
  const md = ["# Gradify UK curriculum coverage and content progress", "",
    "Generated by `npm run curriculum` (scripts/curriculum-progress.mjs). The denominator is the UK catalogue in `kit/curriculum/catalogue/uk.js`: every qualification, framework and degree subject listed for England, Wales, Scotland and Northern Ireland. **Nothing here is verified by a person yet.** The catalogue rows are listed from knowledge and unchecked; specifications marked *source-verified* were extracted by machine from the published document, with its file fingerprint recorded.", "",
    "## Content progress", "", "| | Lessons |", "|---|---|",
    `| Planned | ${T.lessons} |`, `| Written | ${T.written} (${pct(T.written, T.lessons)}) |`, `| Pass content standard 2 now (automatically validated) | ${T.valid} (${pct(T.valid, T.written)}) |`,
    `| Enhanced in a recorded batch | ${T.enhanced} |`, `| Generated new in a recorded batch | ${T.generated} |`, `| Human reviewed (school review recorded) | ${T.reviewed} |`, `| Approved for publication (expert sign-off) | ${T.approved} |`, "",
    `Batch findings: ${data.findings.errorsFixed} errors fixed, ${data.findings.errorsSuspected} suspected for a reviewer, ${data.findings.gaps} gaps, ${data.findings.editorial} editorial, ${data.findings.curriculumDependent} curriculum-dependent, ${data.findings.needsSource} needing a source.`, "",
    "| Course | Written | Standard 2 | Enhanced | Generated | Reviewed | Approved |", "|---|---|---|---|---|---|---|",
    ...content.map((r) => `| ${r.site} ${r.name} | ${r.written}/${r.lessons} | ${r.valid} (${pct(r.valid, r.written)}) | ${r.enhanced} | ${r.generated} | ${r.reviewed} | ${r.approved} |`), "",
    "## Specifications", "", `${specs.length} modelled, ${data.specs.outcomes} outcomes; ${extracted} source-verified (extracted from the published document), ${checked} checked by a person.`, "",
    "| Specification | Outcomes | Covered | Partly | Gap | Not mapped | Source |", "|---|---|---|---|---|---|---|",
    ...m.rows.filter((r) => r.measure).map((r) => `| ${r.bodyName} ${QUALIFICATIONS[r.qualification]?.name || ""} ${r.title} ${r.code || ""} | ${r.measure.outcomes} | ${r.measure.covered} | ${r.measure.partial} | ${r.measure.gap} | ${r.measure.unmapped} | ${r.measure.checked ? "checked" : r.measure.extracted ? "source-verified" : "paraphrased, unchecked"} |`), "",
    "## The matrix", "", `${m.rows.length} catalogue rows. A row's status is the strongest the evidence supports.`, "", "### By nation", "", head, ...Object.entries(m.byNation).map(([k, t]) => statusRow(nat[k], t)), "",
    "### By level", "", head, ...Object.entries(m.byBand).map(([k, t]) => statusRow(BAND_NAMES[k], t)), "",
    "### By subject group", "", head, ...Object.entries(m.byGroup).sort().map(([k, t]) => statusRow(k, t)), "",
    "### By qualification or framework", "", head, ...Object.entries(m.byQualification).sort().map(([k, t]) => statusRow(QUALIFICATIONS[k]?.name || `National curriculum: ${BAND_NAMES[k.split(":")[1]] || k}`, t)), "",
    "## Biggest gaps: subjects with no Gradify course", "", "Catalogue rows with no course in the subject at that level, counted by subject and level.", "",
    "| Subject | Level | Rows | Awarding bodies |", "|---|---|---|---|",
    ...Object.entries(m.rows.filter((r) => r.status === "none").reduce((a, r) => { const k = `${r.subjectName}|${BAND_NAMES[r.band]}`; (a[k] ??= new Set()).add(r.bodyName); a[k].n = (a[k].n || 0) + 1; return a; }, {}))
      .sort((a, b) => b[1].n - a[1].n).slice(0, 40).map(([k, s]) => `| ${k.split("|")[0]} | ${k.split("|")[1]} | ${s.n} | ${[...s].join(", ")} |`), "",
    "## Batches", "", ...data.batches.map((b) => `- ${b.file}: ${b.error ? `❌ unreadable (${b.error})` : `${b.lessons} lessons, ${b.specs} specifications`}`), ""];
  return { md: md.join("\n"), data };
}

if (import.meta.url.endsWith(process.argv[1]?.split("/").pop())) {
  const { loadLessons, coursesIn } = await import("./curriculum.mjs");
  const courses = [...coursesIn(KB), ...KB.outcomeLessons.flatMap((m) => m.lessons.map((l) => l.course))];
  const { md, data } = await progressReport(await loadLessons(courses));
  await writeFile(new URL("docs/qa/uk-coverage.md", ROOT), md);
  await writeFile(new URL("docs/qa/uk-coverage.json", ROOT), JSON.stringify(data));
  console.log(`UK coverage: ${data.rows.length} rows ${JSON.stringify(data.matrix.byStatus)}; lessons ${data.totals.written} written, ${data.totals.valid} standard 2, ${data.totals.enhanced} enhanced, ${data.totals.generated} generated; specs ${data.specs.total} (${data.specs.extracted} source-verified)`);
}
