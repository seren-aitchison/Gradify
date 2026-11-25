// Student data as QA: questions answered wrongly far more often than their difficulty predicts go to the repair queue.
// Reads public.assessment_attempts (supabase/migrations/20261101120000_assessment_attempts.sql) through the REST API
// with the service-role key (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY: GitHub secrets, never committed). Only
// aggregates leave the database: question id, lesson, attempts and the share correct. No learner data is stored.
// Learners' reports of a lesson come from public.lesson_reports (20261125120000_lesson_reports.sql): only counts per
// lesson and kind are kept, never the learner's note (free text can hold personal details).
import { readdirSync, existsSync, unlinkSync } from "node:fs";
import { at, out, save, today } from "./lib.mjs";

// subject comes from learner-written rows, so it never names a file unless it is one of Gradify's course slugs
export const COURSES = () => new Set(readdirSync(at("kit/courses/"), { withFileTypes: true }).filter((d) => d.isDirectory() && /^[a-z0-9-]+$/.test(d.name)).map((d) => d.name));

// expected share correct by difficulty (M1 easy … M3 hard); a question well below its band is suspect
export const EXPECTED = { 1: 0.75, 2: 0.6, 3: 0.45 };
export const MIN_ATTEMPTS = 30;

/** pure: rows { subject, lesson_id, question_id, difficulty, correct } → suspect questions */
export function suspects(rows, { min = MIN_ATTEMPTS } = {}) {
  const by = new Map();
  for (const r of rows) {
    const k = `${r.subject}|${r.question_id}`, e = by.get(k) || { subject: r.subject, lesson: r.lesson_id, question: r.question_id, difficulty: r.difficulty || 2, n: 0, right: 0 };
    e.n++; if (r.correct) e.right++; by.set(k, e);
  }
  return [...by.values()].filter((e) => e.n >= min).map((e) => ({ ...e, share: +(e.right / e.n).toFixed(3) }))
    .filter((e) => e.share < (EXPECTED[e.difficulty] ?? 0.6) - 0.35 || e.share > 0.98 && e.difficulty === 3)
    .map((e) => ({ ...e, why: e.share > 0.98 ? "a hard question almost everyone gets right: the answer may be given away" : `only ${Math.round(e.share * 100)}% correct over ${e.n} attempts: check the key and the options` }))
    .sort((a, b) => a.share - b.share);
}

/** pure: open lesson_reports rows { subject, lesson_id, kind, user_id } → lessons to repair. One "wrong" report is
 * enough; other kinds need two different learners, so one learner's repeated clicks don't send a lesson back. Learner
 * ids are used only here, in memory: the result (and every saved snapshot) holds counts only */
export function reportQueue(rows) {
  const by = new Map();
  for (const r of rows) { const k = `${r.subject}|${r.lesson_id}`, e = by.get(k) || { subject: r.subject, lesson: r.lesson_id, n: 0, kinds: {}, who: new Set() }; e.n++; e.kinds[r.kind] = (e.kinds[r.kind] || 0) + 1; e.who.add(r.user_id ?? `row${e.n}`); by.set(k, e); }
  return [...by.values()].filter((e) => e.kinds.wrong || e.who.size >= 2).map(({ who, ...e }) => ({ ...e, learners: who.size, why: `${e.n} learner report${e.n === 1 ? "" : "s"}: ${Object.entries(e.kinds).map(([k, n]) => `${n} ${k}`).join(", ")}` })).sort((a, b) => (b.kinds.wrong || 0) - (a.kinds.wrong || 0) || b.n - a.n);
}

async function rest(path, key) {
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, { headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${from}-${from + 999}` } });
    if (!res.ok) throw new Error(`${path.split("?")[0]}: HTTP ${res.status}`);
    const page = await res.json(); rows.push(...page); if (page.length < 1000) break;
  }
  return rows;
}

export async function fetchSignals({ days = 30 } = {}) {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { skipped: "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY aren't set" };
  const since = new Date(Date.now() - days * 864e5).toISOString();
  const rows = await rest(`assessment_attempts?select=subject,lesson_id,question_id,difficulty,correct&created_at=gte.${since}&order=id`, key);
  // a failed fetch isn't "no reports": stop before anything is written, so saved signals stay as they were
  const reportRows = await rest("lesson_reports?select=subject,lesson_id,kind,user_id&status=eq.open&order=id", key);
  const courses = COURSES(), list = suspects(rows).filter((s) => courses.has(s.subject)), reports = reportQueue(reportRows).filter((r) => courses.has(r.subject)), bySubject = {};
  for (const s of list) (bySubject[s.subject] ||= { items: [], reports: [] }).items.push(s);
  for (const r of reports) (bySubject[r.subject] ||= { items: [], reports: [] }).reports.push(r);
  for (const [subject, v] of Object.entries(bySubject)) save(out(`content/signals/${subject}.json`), { generated: today(), days, ...v });
  // the fetch worked, so a subject with no suspects now has none: clear its old snapshot
  const dir = out("content/signals/");
  if (existsSync(dir)) for (const f of readdirSync(dir)) if (f.endsWith(".json") && !bySubject[f.slice(0, -5)] && f !== "reports.json") unlinkSync(new URL(f, dir));
  return { rows: rows.length, suspects: list.length, reports: reports.length, subjects: Object.keys(bySubject) };
}
