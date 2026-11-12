// The two migrations the native apps need for syncing (PROPOSED, NOT APPLIED), on real PostgreSQL (PGlite) through the
// production migrate code: XP that a retried upload can't count twice, and the planner's fields with an overwrite check.
// Both must leave every existing value as it was and keep the website's current reads and writes working.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { tempDb, snapshot, rehearseMigration } from "../scripts/pg-rehearsal.mjs";
import { migrate, listMigrations, destructive, configUpdates } from "../scripts/supabase-admin.mjs";

const A = "11111111-1111-4111-8111-111111111111", B = "22222222-2222-4222-8222-222222222222";
const NEW = ["20261114120000", "20261114130000"];

async function db(upTo = null) {
  const list = await listMigrations(), c = await tempDb();
  const r = await migrate(c, { list: upTo ? list.filter((m) => m.version <= upTo) : list });
  assert.equal(r.ok, true, JSON.stringify(r.report.filter((x) => !/applied/.test(x.result))));
  await c.sql(`insert into auth.users (id, email) values ('${A}', 'a@test'), ('${B}', 'b@test');`);
  return { c, list };
}
const xp = async (c, id) => (await c.sql(`select xp from public.profiles where id = '${id}'`))[0].xp;

test("the new migrations are additive: nothing destructive, no owner settings changed", async () => {
  for (const m of (await listMigrations()).filter((x) => NEW.includes(x.version))) {
    const sql = await readFile(m.url, "utf8");
    assert.deepEqual(destructive(sql), [], m.file);
    assert.deepEqual(configUpdates(sql), [], m.file);
  }
});

test("on a copy of existing data, neither migration changes any existing value", async () => {
  const { c, list } = await db("20261113120000");
  await c.sql(`insert into public.activity (user_id, site, kind, xp, detail) values ('${A}', 'LawGradify', 'law-lesson', 20, '{"lesson":"u01-01"}'), ('${A}', 'LawGradify', 'law-lesson', 20, null);
    insert into public.plan_blocks (user_id, day, start_min, end_min, title, cal, done, auto) values ('${B}', '2026-11-07', 540, 600, 'Revise mechanics', 'study', true, false);`);
  const snap = JSON.parse(JSON.stringify(await snapshot(c)));
  await c.close();
  for (const m of list.filter((x) => NEW.includes(x.version))) {
    const r = await rehearseMigration(snap, list.filter((x) => x.version < m.version), m);
    assert.equal(r.ok, true, `${m.file}: ${r.problems?.join("; ")}`);
  }
});

test("XP: a retried upload with the same event id inserts nothing and adds no XP", async () => {
  const { c } = await db();
  const before = await xp(c, A);
  const send = `insert into public.activity (user_id, site, kind, xp, event_id) values ('${A}', 'SciGradify', 'biology-lesson', 10, 'biology:1700000000123:lesson:u01-01') on conflict (user_id, event_id) do nothing;`;
  await c.sql(send);
  await c.sql(send);                                      // the same award, sent again after a lost reply
  assert.equal((await c.sql(`select count(*)::int n from public.activity where user_id = '${A}' and event_id is not null`))[0].n, 1);
  assert.equal(await xp(c, A), before + 10, "counted once");
  // another learner can't collide with it, and rows without an event id behave exactly as today
  await c.sql(`insert into public.activity (user_id, site, kind, xp, event_id) values ('${B}', 'SciGradify', 'biology-lesson', 10, 'biology:1700000000123:lesson:u01-01');`);
  await c.sql(`insert into public.activity (user_id, site, kind, xp) values ('${A}', 'Gradify', 'review', 2), ('${A}', 'Gradify', 'review', 2);`);
  assert.equal(await xp(c, A), before + 14, "the website's rows (no event id) still all count");
  await assert.rejects(c.sql(`insert into public.activity (user_id, kind, xp, event_id) values ('${A}', 'x', 1, '');`), "an empty id is refused");
  await c.close();
});

test("plans: the website's existing reads and writes keep working, with the new fields defaulted", async () => {
  const { c } = await db();
  // what kit/app/main.js does: insert a few columns, read *, update with the row it read
  await c.sql(`insert into public.plan_blocks (user_id, day, start_min, end_min, title, cal, auto) values ('${A}', '2026-11-14', 540, 600, 'Review 12 due cards', 'study', true);`);
  const [row] = await c.sql(`select * from public.plan_blocks where user_id = '${A}'`);
  assert.equal(row.repeats, "never");
  assert.equal(row.all_day, false);
  assert.equal(row.notes, "");
  assert.deepEqual(row.done_days, []);
  await c.sql(`update public.plan_blocks set done = true, title = 'Review 12 due cards', start_min = 540, end_min = 600 where id = '${row.id}'`);
  assert.equal((await c.sql(`select done from public.plan_blocks where id = '${row.id}'`))[0].done, true);
  // what the apps send: a repeating all-day item with its fields
  await c.sql(`insert into public.plan_blocks (id, user_id, day, start_min, end_min, title, cal, all_day, repeats, repeat_until, reminder_min, notes, course, done_days)
    values ('aaaaaaaa-0000-4000-8000-0000000000a1', '${A}', '2026-11-16', 0, 1440, 'Placement', 'work', true, 'weekdays', '2026-12-18', 60, 'Bring ID', 'nursing', '{2026-11-16}');`);
  await assert.rejects(c.sql(`insert into public.plan_blocks (user_id, day, start_min, end_min, title, repeats) values ('${A}', '2026-11-16', 540, 600, 'x', 'yearly');`), "an unknown repeat is refused");
  await c.close();
});

test("plans: updated_at is the database's, so a write from an older copy can always be detected", async () => {
  const { c } = await db();
  await c.sql(`insert into public.plan_blocks (id, user_id, day, start_min, end_min, title) values ('bbbbbbbb-0000-4000-8000-0000000000b1', '${A}', '2026-11-14', 540, 600, 'Lecture');`);
  const t0 = (await c.sql(`select updated_at::text t from public.plan_blocks where id = 'bbbbbbbb-0000-4000-8000-0000000000b1'`))[0].t;
  // a client sending an old timestamp can't move it back
  await c.sql(`update public.plan_blocks set title = 'Lecture (room 2)', updated_at = '2000-01-01' where id = 'bbbbbbbb-0000-4000-8000-0000000000b1'`);
  const t1 = (await c.sql(`select updated_at::text t from public.plan_blocks where id = 'bbbbbbbb-0000-4000-8000-0000000000b1'`))[0].t;
  assert.ok(t1 > t0, `${t1} after ${t0}`);
  // a device that read t0 and writes "only if still at t0" now changes nothing
  const r = await c.sql(`update public.plan_blocks set title = 'stale' where id = 'bbbbbbbb-0000-4000-8000-0000000000b1' and updated_at = '${t0}' returning id`);
  assert.equal(r.length, 0, "the stale write is refused");
  await c.close();
});
