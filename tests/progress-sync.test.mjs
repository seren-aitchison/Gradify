// The proposed course-progress sync (docs/PROGRESS-SYNC.md): kit/course/sync.js against real PostgreSQL (PGlite),
// with every migration applied and then docs/proposed/course_progress_sync.sql. Each "device" is a separate copy
// of the course state that saves through save_course_progress as a signed-in learner, as the website and the
// apps would. Nothing here touches a real project.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { tempDb } from "../scripts/pg-rehearsal.mjs";
import { migrate, listMigrations } from "../scripts/supabase-admin.mjs";
import { merge, sync, put, setting, remove, reset, accountCopy } from "../kit/course/sync.js";

const A = "11111111-1111-4111-8111-111111111111", B = "22222222-2222-4222-8222-222222222222";
const lit = (x) => `'${String(x).replace(/'/g, "''")}'`;
const T0 = Date.parse("2026-11-08T09:00:00Z"), min = 60000;

async function db() {
  const c = await tempDb();
  const r = await migrate(c, { list: await listMigrations() });
  assert.equal(r.ok, true);
  await c.sql(await readFile(new URL("../docs/proposed/course_progress_sync.sql", import.meta.url), "utf8"));
  // Supabase grants these to signed-in learners by default; row-level security then limits them to their own rows
  await c.sql(`grant usage on schema public, auth to authenticated, anon; grant execute on function auth.uid() to authenticated, anon; grant select, insert, update, delete on all tables in schema public to authenticated;
    grant usage on all sequences in schema public to authenticated;
    insert into auth.users (id, email) values ('${A}', 'a@test'), ('${B}', 'b@test');`);
  // run a query as a learner (or as a signed-out visitor), then return to the test's own role
  const as = async (uid, q) => {
    await c.sql(uid ? `set role authenticated; select set_config('request.jwt.claim.sub', '${uid}', false);` : "set role anon; select set_config('request.jwt.claim.sub', '', false);");
    try { return await c.sql(q); } finally { await c.sql("reset role;"); }
  };
  // what the account holds for a learner's course, read as the database sees it (not through any device)
  const row = async (uid = A, subject = "law") => (await c.sql(`select state, version from public.course_progress where user_id = '${uid}' and subject = '${subject}'`))[0] || null;
  return { c, as, row };
}

// a device: its own copy of the state, its own clock, and a connection that can be switched off
function device(d, { uid = A, subject = "law", skew = 0, start = T0 } = {}) {
  const dev = { S: {}, online: true, time: start, skew };
  dev.now = () => dev.time + dev.skew;                       // what this device's clock says
  dev.account = { save: async (state, expected) => {
    if (!dev.online) throw new Error("offline");
    const [r] = await d.as(uid, `select * from public.save_course_progress(${lit(subject)}, 'LawGradify', ${lit(JSON.stringify(state))}::jsonb, ${expected})`);
    // the server's clock in these tests is the shared test time, as a real server's is the true time
    return { saved: r.saved, version: Number(r.cur_version), state: r.cur_state, serverTime: dev.time };
  } };
  dev.sync = async () => { dev.S = await sync(dev.S, dev.account, { deviceNow: dev.now }); return dev.S; };
  dev.at = (t) => { dev.time = t; return dev; };
  // corrected clock: what the device stamps its edits with
  dev.stamp = () => dev.now() + (dev.S.clockOffset || 0);
  dev.finish = (lesson) => { put(dev.S, "done", lesson, dev.stamp(), dev.stamp()); dev.S.log = [...(dev.S.log || []), { t: dev.stamp(), k: "lesson", id: lesson }]; };
  return dev;
}
const lessons = (S) => Object.keys(S?.done || {}).sort();

test("today's whole-row save loses a lesson when two devices save in turn (the problem being fixed)", async () => {
  const d = await db();
  const upsert = (S) => d.as(A, `insert into public.course_progress (user_id, subject, site, state) values ('${A}', 'law', 'LawGradify', ${lit(JSON.stringify(S))}::jsonb)
    on conflict (user_id, subject) do update set state = excluded.state`);
  await upsert({ done: { "u01-01": T0 } });                 // phone
  await upsert({ done: { "u01-02": T0 + min } });           // laptop, which never saw the phone's save
  assert.deepEqual(lessons((await d.row()).state), ["u01-02"], "lesson 1 is gone from the account");
});

test("phone and laptop saving at the same time: both lessons are kept, on every device", async () => {
  const d = await db();
  const phone = device(d), laptop = device(d);
  phone.finish("u01-01"); laptop.finish("u01-02");
  await Promise.all([phone.sync(), laptop.sync()]);         // both start from version 0; one must merge and retry
  assert.deepEqual(lessons((await d.row()).state), ["u01-01", "u01-02"]);
  const fresh = device(d); await fresh.sync();              // a new phone, a reinstalled app, a cleared browser
  assert.deepEqual(lessons(fresh.S), ["u01-01", "u01-02"]);
  await phone.sync();
  assert.deepEqual(lessons(phone.S), ["u01-01", "u01-02"], "the phone catches up with the laptop's lesson");
});

test("a stale device never overwrites: its save is refused until it has merged the latest copy", async () => {
  const d = await db();
  const phone = device(d), laptop = device(d);
  await phone.sync(); await laptop.sync();                  // both at the same version
  phone.finish("u02-01"); await phone.sync();               // the account moves on
  laptop.finish("u02-02");
  const r = await laptop.account.save(accountCopy(laptop.S), laptop.S.version);
  assert.equal(r.saved, false, "the laptop's out-of-date save is refused, not written");
  assert.deepEqual(lessons((await d.row()).state), ["u02-01"], "and the account copy is untouched");
  await laptop.sync();
  assert.deepEqual(lessons((await d.row()).state), ["u02-01", "u02-02"]);
});

test("offline for a week: work done offline syncs when the device reconnects, alongside the other device's", async () => {
  const d = await db();
  const phone = device(d), laptop = device(d);
  await phone.sync(); phone.online = false;
  for (const l of ["u03-01", "u03-02", "u03-03"]) { phone.at(phone.time + min); phone.finish(l); await assert.rejects(phone.sync()); }
  laptop.at(T0 + 3 * 864e5); laptop.finish("u03-04"); await laptop.sync();
  phone.online = true; phone.at(T0 + 7 * 864e5); await phone.sync();
  assert.deepEqual(lessons((await d.row()).state), ["u03-01", "u03-02", "u03-03", "u03-04"]);
});

test("corrections: the newest edit wins, whichever device saves last and whatever the version numbers say", async () => {
  const d = await db();
  const phone = device(d), laptop = device(d);
  await phone.sync(); await laptop.sync();
  // the laptop edits the draft first, the phone corrects it a minute later
  laptop.at(T0 + min); put(laptop.S, "drafts", "essay-1", "first try", laptop.stamp());
  phone.at(T0 + 2 * min); put(phone.S, "drafts", "essay-1", "corrected", phone.stamp());
  setting(phone.S, "goal", 45, phone.stamp());
  // the phone saves first; then the laptop saves several times, pushing the version well past the phone's
  await phone.sync();
  for (let i = 0; i < 3; i++) { laptop.at(T0 + (3 + i) * min); laptop.finish(`u04-0${i + 1}`); await laptop.sync(); }
  const { state, version } = await d.row();
  assert.ok(version > phone.S.version, "the laptop's copy has the higher version");
  assert.equal(state.drafts["essay-1"], "corrected", "but the phone's later correction is kept");
  assert.equal(state.goal, 45);
});

test("undoing a lesson sticks, even when a device that still has it done syncs later; doing it again counts", async () => {
  const d = await db();
  const phone = device(d), laptop = device(d);
  phone.finish("u05-01"); await phone.sync(); await laptop.sync();
  laptop.at(T0 + min); remove(laptop.S, "done", "u05-01", laptop.stamp()); await laptop.sync();
  phone.at(T0 + 2 * min); phone.finish("u05-02"); await phone.sync();   // the phone never saw the undo
  assert.deepEqual(lessons((await d.row()).state), ["u05-02"], "the undone lesson doesn't come back");
  phone.at(T0 + 3 * min); phone.finish("u05-01"); await phone.sync();
  assert.deepEqual(lessons((await d.row()).state), ["u05-01", "u05-02"], "completing it again afterwards counts");
});

test("resetting a course clears it everywhere; work done after the reset is kept", async () => {
  const d = await db();
  const phone = device(d), laptop = device(d);
  for (const l of ["u06-01", "u06-02"]) phone.finish(l);
  await phone.sync(); await laptop.sync();
  laptop.at(T0 + 10 * min); laptop.S = reset(laptop.S, laptop.stamp()); await laptop.sync();
  phone.at(T0 + 11 * min); phone.finish("u06-03"); await phone.sync();  // the phone still holds the old lessons
  assert.deepEqual(lessons((await d.row()).state), ["u06-03"]);
  assert.ok((await d.row()).state.log.every((e) => e.t > T0 + 10 * min), "the activity log restarts too");
});

test("'delete my progress' can't be undone by another device bringing its copy back", async () => {
  const d = await db();
  const phone = device(d), laptop = device(d);
  phone.finish("u07-01"); await phone.sync(); await laptop.sync();
  // today: the row is deleted, and the next device to open the course saves its copy back (store.js wipe)
  await d.as(A, "delete from public.course_progress where subject = 'law'");
  const old = await device(d).account.save(accountCopy(phone.S), 0);
  assert.equal(old.saved, true, "with the row deleted, the phone's old copy is accepted again");
  // proposed: deleting records a reset instead, which every device honours
  laptop.S.version = 0; await laptop.sync();                // the laptop re-reads the account
  laptop.at(T0 + min); laptop.S = reset(laptop.S, laptop.stamp()); await laptop.sync();
  phone.at(T0 + 2 * min); await phone.sync();
  assert.deepEqual(lessons((await d.row()).state), [], "nothing comes back");
  assert.deepEqual(lessons(phone.S), [], "and the phone clears its own copy");
});

test("no duplicates: the same lesson, log entry, answer or review saved twice is stored once", async () => {
  const d = await db();
  const phone = device(d), laptop = device(d);
  phone.at(T0 + 2 * min).finish("u08-01"); laptop.at(T0 + min).finish("u08-01");
  await phone.sync(); await laptop.sync(); await phone.sync(); await laptop.sync();
  const { state } = await d.row();
  assert.deepEqual(Object.keys(state.done), ["u08-01"]);
  assert.equal(state.done["u08-01"], T0 + 2 * min, "one entry, holding the latest completion");
  assert.equal(state.log.filter((e) => e.id === "u08-01").length, 2, "each device's completion is one log entry, never repeated by re-syncing");
  await phone.sync();
  assert.equal((await d.row()).state.log.length, 2);
  // answers: unique ids, retried uploads ignored (as store.js logAttempts does)
  const answer = `insert into public.assessment_attempts (id, site, subject, context, question_id, question_type, score, correct) values ('att-1', 'LawGradify', 'law', 'lesson', 'q1', 'mcq', 1, true) on conflict (id) do nothing`;
  await d.as(A, answer); await d.as(A, answer);
  assert.equal((await d.c.sql("select count(*)::int as n from public.assessment_attempts"))[0].n, 1);
  // reviews: the proposed client_id
  await d.c.sql(`insert into public.cards (id, user_id, front, back) values ('cccccccc-0000-4000-8000-000000000001', '${A}', 'Offer?', 'A promise')`);
  const review = `insert into public.reviews (card_id, rating, client_id) values ('cccccccc-0000-4000-8000-000000000001', 'good', 'dddddddd-0000-4000-8000-000000000001') on conflict (user_id, client_id) do nothing`;
  await d.as(A, review); await d.as(A, review);
  assert.equal((await d.c.sql("select count(*)::int as n from public.reviews"))[0].n, 1);
});

test("a phone whose clock is two hours slow can't make its newer edit look older", async () => {
  const d = await db();
  const laptop = device(d), phone = device(d, { skew: -2 * 60 * min });
  await laptop.sync(); await phone.sync();                  // the phone learns how far off its clock is
  laptop.at(T0 + min); setting(laptop.S, "goal", 20, laptop.stamp()); await laptop.sync();
  phone.at(T0 + 2 * min); setting(phone.S, "goal", 60, phone.stamp()); await phone.sync();
  assert.equal((await d.row()).state.goal, 60, "the phone's edit, made later, wins");
});

test("one learner can't save into another's progress, and signed-out visitors can't save at all", async () => {
  const d = await db();
  const a = device(d); a.finish("u09-01"); await a.sync();
  const b = device(d, { uid: B }); b.S = { done: { "u09-99": T0 } }; await b.sync();
  assert.deepEqual(lessons((await d.row(A)).state), ["u09-01"], "A's row is untouched by B's save");
  assert.deepEqual(lessons((await d.row(B)).state), ["u09-99"], "B's save went to B's own row");
  await assert.rejects(d.as(null, `select * from public.save_course_progress('law', 'LawGradify', '{}'::jsonb, 0)`), /permission denied|Sign in/);
});

test("merging is order-independent and repeatable, so every device ends up with the same copy", () => {
  let seed = 7; const rnd = (n) => (seed = (seed * 16807) % 2147483647) % n;
  const copy = () => {
    const S = {};
    for (let i = 0; i < 6; i++) {
      const k = `u01-0${rnd(4)}`, t = T0 + rnd(50) * min;
      const op = rnd(5);
      if (op === 0) remove(S, "done", k, t);
      else if (op === 1) put(S, "drafts", k, `draft ${rnd(3)}`, t);
      else if (op === 2) put(S, "quiz", k, { best: rnd(10) / 10, pass: !!rnd(2), t }, t);
      else put(S, "done", k, t, t);
    }
    if (rnd(4) === 0) S.resetAt = T0 + rnd(50) * min;
    setting(S, "goal", rnd(60), T0 + rnd(50) * min);
    return S;
  };
  const same = (x, y) => assert.deepEqual(JSON.parse(JSON.stringify(x)), JSON.parse(JSON.stringify(y)));
  // the known limit (docs/PROGRESS-SYNC.md §5): a best score combined from before and after a course reset, on a device
  // that hadn't heard of the reset, keeps the better score. The quiz is still there either way; only its best may differ.
  const withoutQuizScores = (S) => ({ ...S, quiz: Object.keys(S.quiz).sort() });
  for (let i = 0; i < 300; i++) {
    const a = copy(), b = copy(), c = copy();
    same(merge(a, b), merge(b, a));
    same(withoutQuizScores(merge(merge(a, b), c)), withoutQuizScores(merge(a, merge(b, c))));
    same(merge(merge(a, b), merge(a, b)), merge(a, b));
    const noReset = [a, b, c].map(({ resetAt, ...S }) => S);
    same(merge(merge(noReset[0], noReset[1]), noReset[2]), merge(noReset[0], merge(noReset[1], noReset[2])));
  }
});

test("progress saved before this change (no stamps) merges as it does today", () => {
  const phone = { done: { a: 5, b: 9 }, quiz: { u01: { best: 0.6, pass: false, t: 10 } }, cards: { c1: { reps: 1, due_at: "2026-11-06" } }, goal: 20, updated: 100 };
  const laptop = { done: { a: 2, c: 7 }, quiz: { u01: { best: 0.8, pass: true, t: 5 } }, cards: { c1: { reps: 3, due_at: "2026-11-01" }, c2: { reps: 1 } }, goal: 45, updated: 200 };
  const m = merge(phone, laptop);
  assert.deepEqual(m.done, { a: 5, b: 9, c: 7 }, "every lesson kept (the time is now the latest completion)");
  assert.deepEqual(m.quiz.u01, { best: 0.8, pass: true, t: 10 });
  assert.equal(m.cards.c1.reps, 3);
  assert.ok(m.cards.c2);
  assert.equal(m.goal, 45);
});

test("the shared fixtures (also run by the Swift apps) give the expected result", async () => {
  const cases = JSON.parse(await readFile(new URL("./fixtures/progress-sync.json", import.meta.url), "utf8")).cases;
  assert.ok(cases.length >= 5);
  for (const { name, a, b, expect } of cases) {
    const m = merge(a, b);
    for (const [field, value] of Object.entries(expect)) assert.deepEqual(m[field], value, `${name}: ${field}`);
  }
});
