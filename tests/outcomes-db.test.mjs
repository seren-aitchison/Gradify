// Measuring learning with consent (supabase/migrations/20261124170000_learning_outcomes_and_visuals.sql) on real
// PostgreSQL: only consenting learners count, nothing is reported for fewer than 10, withdrawal is instant, and the
// visual request queue is private and rate-limited.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const uid = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
async function db() {
  const d = await tempDb();
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
    alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
    alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;`);
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  const as = (u, q) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${u}'; ${q};`).finally(() => d.sql("reset role; reset request.jwt.claim.sub;"));
  const anon = (q) => d.sql(`set role anon; ${q};`).finally(() => d.sql("reset role;"));
  return { d, as, anon };
}

test("learning outcomes: consenting learners only, groups of 10 or more, withdrawal instant", async () => {
  const { d, as, anon } = await db();
  const users = Array.from({ length: 14 }, (_, i) => uid(i + 1));
  await d.sql(`insert into auth.users (id, email) values ${users.map((u, i) => `('${u}', 'u${i}@x')`).join(",")}`);
  // every learner answers q1 in lesson L1: wrong first, right again 8 days later
  const t0 = Date.UTC(2026, 9, 1);
  for (const [i, u] of users.entries()) await d.sql(`insert into public.assessment_attempts (id, user_id, site, subject, context, question_id, question_type, score, correct, lesson_id, created_at) values
    ('a${i}', '${u}', 'SciGradify', 'biology', 'lesson', 'q1', 'sba', ${i % 2 ? 1 : 0}, ${i % 2 === 1}, 'L1', '${new Date(t0).toISOString()}'),
    ('b${i}', '${u}', 'SciGradify', 'biology', 'lesson', 'q1', 'sba', 1, true, 'L1', '${new Date(t0 + 8 * 864e5).toISOString()}')`);
  const outcomes = async () => (await anon("select * from public.learning_outcomes(10)")).at(-1);
  assert.equal((await anon("select * from public.learning_outcomes(10)")).filter((r) => r.lesson_id).length, 0, "no consent, nothing counted");
  await assert.rejects(as(users[0], "insert into public.research_consent (granted, over_16) values (true, false)"), "consent needs 16 or over");
  for (const u of users.slice(0, 9)) await as(u, "insert into public.research_consent (granted, over_16) values (true, true)");
  assert.equal((await anon("select * from public.learning_outcomes(10)")).filter((r) => r.lesson_id).length, 0, "9 consenting: still hidden");
  assert.equal((await anon("select public.outcomes_summary() as s")).at(-1).s.enough, false);
  await as(users[9], "insert into public.research_consent (granted, over_16) values (true, true)");
  const r = await outcomes();
  assert.equal(r.lesson_id, "L1"); assert.equal(Number(r.learners), 10);
  assert.equal(Number(r.first_try), 0.5, "first tries: half right");
  assert.equal(Number(r.retention), 1, "all right again a week later");
  assert.equal((await anon("select public.outcomes_summary() as s")).at(-1).s.consenting, 10);
  await as(users[9], "update public.research_consent set granted = false");
  assert.equal((await anon("select * from public.learning_outcomes(10)")).filter((x) => x.lesson_id).length, 0, "withdrawal takes effect at once");
  assert.equal((await as(users[1], "select count(*)::int as n from public.research_consent")).at(-1).n, 1, "you see only your own consent");
  await assert.rejects(anon("select * from public.research_consent"));

  // explanation outcomes need 10 consenting learners too
  await as(users[9], "update public.research_consent set granted = true");
  for (const u of users.slice(0, 10)) await as(u, `insert into public.learning_events (event, source, result, concept) values ('explanation_outcome', 'explain:example', 'correct', 'L1')`);
  const ex = (await anon("select * from public.explanation_outcomes()")).filter((x) => x.strategy);
  assert.deepEqual(ex.map((x) => [x.strategy, Number(x.ok), Number(x.learners)]), [["example", 10, 10]]);
  await assert.rejects(as(users[0], `insert into public.learning_events (event) values ('made_up_event')`));
});

test("visual requests: private to the asker, at most 10 a day, always start open", async () => {
  const { d, as, anon } = await db();
  await d.sql(`insert into auth.users (id, email) values ('${uid(1)}', 'a@x'), ('${uid(2)}', 'b@x')`);
  await as(uid(1), "insert into public.visual_requests (concept, purpose, status) values ('ATP synthase', 'how it turns', 'made')");
  assert.equal((await as(uid(1), "select status from public.visual_requests")).at(-1).status, "open");
  assert.equal((await as(uid(2), "select count(*)::int as n from public.visual_requests")).at(-1).n, 0);
  await assert.rejects(anon("insert into public.visual_requests (concept) values ('x y')"));
  for (let i = 0; i < 9; i++) await as(uid(1), `insert into public.visual_requests (concept) values ('Concept ${i}')`);
  await assert.rejects(as(uid(1), "insert into public.visual_requests (concept) values ('One too many')"), /10 visuals/);
});
