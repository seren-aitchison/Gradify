// Student data as QA: questions answered wrongly far more often than their difficulty predicts go to the repair queue.
// Reads public.assessment_attempts (supabase/migrations/20261101120000_assessment_attempts.sql) through the REST API
// with the service-role key (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY: GitHub secrets, never committed). Only
// aggregates leave the database: question id, lesson, attempts and the share correct. No learner data is stored.
// Learner reports of a lesson have no table yet (docs/CONTENT-ENGINE.md, gaps), so only wrong-answer rates are used.
import { at, out, save, today } from "./lib.mjs";

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

export async function fetchSignals({ days = 30 } = {}) {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { skipped: "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY aren't set" };
  const since = new Date(Date.now() - days * 864e5).toISOString(), rows = [];
  for (let from = 0; ; from += 1000) {
    const res = await fetch(`${url}/rest/v1/assessment_attempts?select=subject,lesson_id,question_id,difficulty,correct&created_at=gte.${since}&order=id`, { headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${from}-${from + 999}` } });
    if (!res.ok) throw new Error(`assessment_attempts: HTTP ${res.status}`);
    const page = await res.json(); rows.push(...page); if (page.length < 1000) break;
  }
  const list = suspects(rows), bySubject = {};
  for (const s of list) (bySubject[s.subject] ||= []).push(s);
  for (const [subject, items] of Object.entries(bySubject)) save(out(`content/signals/${subject}.json`), { generated: today(), days, items });
  return { rows: rows.length, suspects: list.length, subjects: Object.keys(bySubject) };
}
