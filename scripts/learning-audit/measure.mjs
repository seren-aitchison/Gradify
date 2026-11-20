// Did it help? Before/after measurement of check-question results, read-only.
//
//   node scripts/learning-audit/measure.mjs diagrams  --live-from 2026-11-21 [--days 28] [--fixture rows.json]
//   node scripts/learning-audit/measure.mjs questions --live-from 2026-11-21 [--days 28] [--fixture rows.json]
//
// diagrams   For every approved diagram (kit/diagrams/manifest.json), first-attempt correctness on its lesson's check
//            questions in the --days before and after --live-from (the day the change went live, which is when the
//            branch reached main, not the approval date). Only questions answered at the same version in both
//            periods count, so a question that was rewritten in between can't masquerade as a diagram effect.
//            Control: every other lesson in the same courses over the same windows. The headline is the
//            difference-in-differences: (pilot after − pilot before) − (control after − control before).
// questions  For every question whose version changed at --live-from (the guessable-question rewrite), correctness on
//            the old version against the new one. A FALL is the expected, healthy result where the old wording let
//            people guess from option length; the misconceptions chosen on the new version show what learners
//            actually confuse.
//
// Data: public.assessment_attempts, read through the Supabase management API (scripts/supabase-admin.mjs: the access
// token comes from SUPABASE_ACCESS_TOKEN or the session's credential proxy). Only aggregate counts leave the database:
// no user ids, no responses. --fixture reads rows of the same shape from a file instead (tests, dry runs).
// Writes docs/learning-audit/measurement-<kind>-<date>.md and prints the summary.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { client } from "../supabase-admin.mjs";
import { parseNotes } from "../../kit/course/notes.js";
import { SUPABASE_URL } from "../../gradify.config.js";

const ROOT = new URL("../../", import.meta.url);
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };

/** Wilson score interval for k successes in n trials (95%). */
export function wilson(k, n) {
  if (!n) return [0, 1];
  const z = 1.96, p = k / n, d = 1 + (z * z) / n, c = p + (z * z) / (2 * n), m = z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n));
  return [(c - m) / d, (c + m) / d];
}
const pct = (x) => `${(x * 100).toFixed(1)}%`;
const rate = (a) => (a.n ? a.k / a.n : NaN);

/** Lesson ids ("u13-10") of the approved diagrams, by course. */
export async function pilotLessons(manifest, root = ROOT) {
  const out = {};
  for (const d of Object.values(manifest)) {
    if (d.status !== "approved") continue;
    const dir = new URL(`kit/courses/${d.course}/notes/`, root);
    for (const f of readdirSync(dir).filter((f) => /^u\d+\.js$/.test(f))) {
      const L = parseNotes((await import(new URL(f, dir).href)).default);
      const i = L.findIndex((l) => l.title === d.lesson);
      if (i >= 0) { (out[d.course] ||= new Set()).add(`${f.replace(".js", "")}-${String(i + 1).padStart(2, "0")}`); break; }
    }
  }
  return out;
}

// one aggregate row per (subject, lesson, question, version, period): first attempts only
export function diagramSql(subjects, from, days) {
  const list = subjects.map((s) => `'${s.replace(/[^a-z]/g, "")}'`).join(",");
  return `select subject, lesson_id, question_id, question_version,
  case when created_at < date '${from}' then 'before' else 'after' end as period,
  count(*)::int as n, count(*) filter (where correct)::int as k
from public.assessment_attempts
where attempt = 1 and marking_status = 'final' and subject in (${list})
  and created_at >= date '${from}' - interval '${+days} days' and created_at < date '${from}' + interval '${+days} days'
group by 1, 2, 3, 4, 5`;
}
export function questionSql(from, days) {
  return `select subject, question_id, question_version, case when created_at < date '${from}' then 'before' else 'after' end as period,
  count(*)::int as n, count(*) filter (where correct)::int as k, count(*) filter (where misconception is not null)::int as wrong_picked
from public.assessment_attempts
where attempt = 1 and marking_status = 'final' and question_type in ('sba', 'mcq')
  and created_at >= date '${from}' - interval '${+days} days' and created_at < date '${from}' + interval '${+days} days'
group by 1, 2, 3, 4`;
}

/** The diagram analysis on aggregate rows. */
export function analyseDiagrams(rows, pilots) {
  // keep only (question, version) pairs seen in both periods
  const seen = {};
  for (const r of rows) (seen[`${r.subject}|${r.question_id}|${r.question_version}`] ||= new Set()).add(r.period);
  const both = (r) => seen[`${r.subject}|${r.question_id}|${r.question_version}`].size === 2;
  const cell = () => ({ before: { n: 0, k: 0 }, after: { n: 0, k: 0 } });
  const pilot = cell(), control = cell(), perLesson = {};
  for (const r of rows.filter(both)) {
    const isPilot = pilots[r.subject]?.has(r.lesson_id);
    const c = isPilot ? pilot : control;
    c[r.period].n += r.n; c[r.period].k += r.k;
    if (isPilot) { const L = (perLesson[`${r.subject} ${r.lesson_id}`] ||= cell()); L[r.period].n += r.n; L[r.period].k += r.k; }
  }
  const delta = (c) => rate(c.after) - rate(c.before);
  return { pilot, control, perLesson, did: delta(pilot) - delta(control), enough: pilot.before.n >= 200 && pilot.after.n >= 200 };
}
export function analyseQuestions(rows) {
  const by = {};
  for (const r of rows) (by[`${r.subject}|${r.question_id}`] ||= []).push(r);
  const changed = [];
  for (const [key, rs] of Object.entries(by)) {
    const before = rs.filter((r) => r.period === "before"), after = rs.filter((r) => r.period === "after");
    const vb = Math.max(...before.map((r) => r.question_version ?? 0)), va = Math.max(...after.map((r) => r.question_version ?? 0));
    if (!before.length || !after.length || va <= vb) continue;
    const sum = (a) => a.reduce((s, r) => ({ n: s.n + r.n, k: s.k + r.k }), { n: 0, k: 0 });
    changed.push({ key, old: sum(before.filter((r) => r.question_version === vb)), new: sum(after.filter((r) => r.question_version === va)) });
  }
  const tot = changed.reduce((s, c) => ({ on: s.on + c.old.n, ok: s.ok + c.old.k, nn: s.nn + c.new.n, nk: s.nk + c.new.k }), { on: 0, ok: 0, nn: 0, nk: 0 });
  return { changed, old: { n: tot.on, k: tot.ok }, new: { n: tot.nn, k: tot.nk } };
}

function line(label, c) {
  const [lo, hi] = wilson(c.k, c.n);
  return `| ${label} | ${c.n} | ${c.n ? pct(c.k / c.n) : "–"} | ${c.n ? `${pct(lo)}–${pct(hi)}` : "–"} |`;
}

async function main() {
  const kind = process.argv[2], from = arg("live-from"), days = +arg("days", 28), fixture = arg("fixture");
  if (!["diagrams", "questions"].includes(kind) || !/^\d{4}-\d{2}-\d{2}$/.test(from || "")) {
    console.error("Usage: measure.mjs diagrams|questions --live-from YYYY-MM-DD [--days 28] [--fixture rows.json]"); process.exit(2);
  }
  const manifest = JSON.parse(readFileSync(new URL("kit/diagrams/manifest.json", ROOT), "utf8"));
  const pilots = await pilotLessons(manifest);
  const fetchRows = async (sql) => (fixture ? JSON.parse(readFileSync(fixture, "utf8")) : client(new URL(SUPABASE_URL).hostname.split(".")[0]).sql(sql));
  const out = [`# Measurement: ${kind}`, "", `Live from ${from}; ${days} days either side; first attempts only. Generated by \`scripts/learning-audit/measure.mjs\`${fixture ? " **from a fixture, not live data**" : ""}.`, ""];
  if (kind === "diagrams") {
    const a = analyseDiagrams(await fetchRows(diagramSql(Object.keys(pilots), from, days)), pilots);
    out.push("| Group | First attempts | Correct | 95% interval |", "|---|---:|---:|---:|",
      line("Pilot lessons, before", a.pilot.before), line("Pilot lessons, after", a.pilot.after),
      line("Control lessons, before", a.control.before), line("Control lessons, after", a.control.after), "",
      `**Difference in differences: ${Number.isNaN(a.did) ? "not measurable yet" : `${a.did >= 0 ? "+" : ""}${(a.did * 100).toFixed(1)} percentage points`}.**`,
      a.enough ? "" : "\nNot enough data for a conclusion: wait for at least 200 first attempts on pilot lessons in each period.", "",
      "| Pilot lesson | Before | After |", "|---|---:|---:|",
      ...Object.entries(a.perLesson).map(([k, c]) => `| ${k} | ${c.before.n ? `${pct(rate(c.before))} (n=${c.before.n})` : "–"} | ${c.after.n ? `${pct(rate(c.after))} (n=${c.after.n})` : "–"} |`));
  } else {
    const a = analyseQuestions(await fetchRows(questionSql(from, days)));
    out.push(`${a.changed.length} rewritten questions answered on both versions.`, "", "| Version | First attempts | Correct | 95% interval |", "|---|---:|---:|---:|",
      line("Old wording", a.old), line("New wording", a.new), "",
      "A fall here is expected: the old wording let learners pick the longest option. The new figure is the honest one.");
  }
  const file = new URL(`docs/learning-audit/measurement-${kind}-${from}.md`, ROOT);
  writeFileSync(file, `${out.join("\n")}\n`);
  console.log(out.join("\n"));
}
if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => { console.error(e.message); process.exit(1); });
