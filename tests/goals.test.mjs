// Goals (kit/learning/goals.js): progress is worked out from existing records, never stored; periods and habits use the
// goal's own time zone; unavailable courses and bad input are handled; moving device goals into an account never
// duplicates or overwrites. The table's own rules are tested against the real migration at the end.
import { test } from "node:test";
import assert from "node:assert/strict";
import { measure, habitWeek, goalProgress, validateGoal, focusGoals, goalsToImport, dayIn, weekStartKey } from "../kit/learning/goals.js";

const T = (s) => Date.parse(s);
const NOW = T("2026-11-11T10:00:00Z");            // Wednesday 11 November 2026
const base = { id: "g1", tz: "Europe/London", status: "active", created_at: "2026-11-01T09:00:00Z", milestones: [] };

test("days and weeks follow the goal's time zone", () => {
  // 23:30 UTC on Sunday 8 Nov is already Monday 9 Nov in Tokyo, and still Sunday in London
  assert.equal(dayIn(T("2026-11-08T23:30:00Z"), "Europe/London"), "2026-11-08");
  assert.equal(dayIn(T("2026-11-08T23:30:00Z"), "Asia/Tokyo"), "2026-11-09");
  assert.equal(weekStartKey(NOW, "Europe/London"), "2026-11-09");
  assert.equal(weekStartKey(T("2026-11-08T23:30:00Z"), "Europe/London"), "2026-11-02");
  assert.equal(weekStartKey(T("2026-11-08T23:30:00Z"), "Asia/Tokyo"), "2026-11-09");
  assert.equal(dayIn(NOW, "Not/AZone"), "2026-11-11", "an unknown zone falls back to London");
});

test("course lessons and XP come from the course's own progress, inside the goal's period", () => {
  const S = { done: { "u01-01": T("2026-10-20T10:00:00Z"), "u01-02": T("2026-11-03T10:00:00Z"), "u01-03": T("2026-11-10T10:00:00Z") },
    log: [{ t: T("2026-10-20T10:00:00Z"), xp: 10 }, { t: T("2026-11-03T10:00:00Z"), xp: 10 }, { t: T("2026-11-10T10:00:00Z"), xp: 10 }, { t: T("2026-11-10T11:00:00Z"), xp: 50 }] };
  const data = { courses: { law: { S } }, knownCourses: ["law", "maths"] };
  const g = (period, metric = "lessons") => ({ ...base, target: 20, metric: { source: "course", metric, course: "law", period } });
  assert.equal(measure(g("since_start"), data, NOW).value, 2, "lessons since 1 Nov");
  assert.equal(measure(g("week"), data, NOW).value, 1, "this week (from Monday 9 Nov)");
  assert.equal(measure(g("month"), data, NOW).value, 2);
  assert.equal(measure(g("all_time"), data, NOW).value, 3);
  assert.equal(measure(g("week", "xp"), data, NOW).value, 60);
  // a course not started is 0; one that no longer exists is unavailable, not a wrong number
  assert.deepEqual(measure({ ...g("all_time"), metric: { ...g("all_time").metric, course: "maths" } }, data, NOW), { value: 0, available: true, note: "Not started yet." });
  const gone = measure({ ...g("all_time"), metric: { ...g("all_time").metric, course: "alchemy" } }, data, NOW);
  assert.equal(gone.available, false); assert.equal(gone.value, null); assert.match(gone.note, /isn't available/);
});

test("schools count when their last lesson was finished in the period", () => {
  const units = [{ id: "u01", lessons: [{ id: "a" }, { id: "b" }] }, { id: "u02", lessons: [{ id: "c" }] }, { id: "u03", lessons: [{ id: "d" }, { id: "e" }] }];
  const S = { done: { a: T("2026-10-01T10:00:00Z"), b: T("2026-11-05T10:00:00Z"), c: T("2026-10-10T10:00:00Z"), d: T("2026-11-06T10:00:00Z") } };
  const goal = { ...base, target: 3, metric: { source: "course", metric: "units", course: "law", period: "since_start" } };
  assert.equal(measure(goal, { courses: { law: { S, units } } }, NOW).value, 1, "u01 finished on 5 Nov; u02 before the goal; u03 unfinished");
  assert.equal(measure(goal, { courses: { law: { S } } }, NOW).available, false, "no schools loaded: unavailable");
});

test("XP, study days and reviews use the existing records, filtered by site where asked", () => {
  const activity = [
    { at: "2026-11-09T08:00:00Z", site: "LawGradify", kind: "law-lesson", xp: 10 }, { at: "2026-11-09T19:00:00Z", site: "LawGradify", kind: "law-lesson", xp: 10 },
    { at: "2026-11-10T07:00:00Z", site: "SportGradify", kind: "workout", xp: 15 }, { at: "2026-11-02T10:00:00Z", site: "LawGradify", kind: "law-lesson", xp: 10 },
  ];
  const goal = (metric) => ({ ...base, target: 4, metric });
  assert.equal(measure(goal({ source: "activity", metric: "days", period: "week" }), { activity }, NOW).value, 2, "two different days this week");
  assert.equal(measure(goal({ source: "activity", metric: "days", period: "week", site: "LawGradify" }), { activity }, NOW).value, 1, "only LawGradify days");
  assert.equal(measure(goal({ source: "xp", metric: "xp", period: "week" }), { xpEvents: [{ t: T("2026-11-09T08:00:00Z"), xp: 10 }, { t: T("2026-11-01T08:00:00Z"), xp: 99 }] }, NOW).value, 10);
  assert.equal(measure(goal({ source: "reviews", metric: "cards", period: "since_start" }), { reviews: [{ reviewed_at: "2026-11-05T10:00:00Z" }, { reviewed_at: "2026-10-30T10:00:00Z" }] }, NOW).value, 1);
});

test("counted and checklist goals; overall progress, days left and overdue", () => {
  const apps = { ...base, title: "Apply for 3 internships", area: "career", target: 3, unit: "applications", manual_value: 2, target_date: "2026-11-30" };
  const p = goalProgress(apps, {}, NOW);
  assert.equal(p.value, 2); assert.equal(Math.round(p.pct * 100), 67); assert.equal(p.daysLeft, 19); assert.equal(p.overdue, false);
  const list = { ...base, milestones: [{ id: "1", title: "CV", done_at: "2026-11-02T10:00:00Z" }, { id: "2", title: "Cover letter", done_at: null }], target_date: "2026-11-10" };
  const q = goalProgress(list, {}, NOW);
  assert.equal(q.pct, 0.5); assert.deepEqual(q.milestones, { done: 1, total: 2 }); assert.equal(q.overdue, true);
});

test("habits: every day, chosen weekdays and days a week, with four-week consistency", () => {
  const at = (d) => ({ at: `${d}T09:00:00Z`, site: "SportGradify", kind: "workout", xp: 15 });
  // this week (from Mon 9 Nov): Mon, Wed; last week: Mon, Wed, Fri, Sat; two weeks ago: Tue
  const activity = ["2026-11-09", "2026-11-11", "2026-11-02", "2026-11-04", "2026-11-06", "2026-11-07", "2026-10-27"].map(at);
  const created = "2026-10-20T09:00:00Z";
  const daily = habitWeek({ ...base, created_at: created, habit: { mode: "daily" } }, activity, NOW);
  assert.deepEqual([daily.hit, daily.required, daily.met, daily.todayDone], [2, 7, false, true]);
  const mwf = habitWeek({ ...base, created_at: created, habit: { mode: "weekdays", days: [1, 3, 5] } }, activity, NOW);
  assert.equal(mwf.hit, 2, "Mon and Wed so far"); assert.equal(mwf.required, 3); assert.equal(mwf.todayRequired, true);
  assert.equal(mwf.label, "Mon, Wed, Fri");
  const four = habitWeek({ ...base, created_at: created, habit: { mode: "per_week", per_week: 4, kind: "workout" } }, activity, NOW);
  assert.equal(four.hit, 2); assert.equal(four.todayRequired, true, "still short of 4 this week");
  assert.equal(four.weeksCounted, 3, "weeks since the goal began"); assert.equal(four.consistency, 1 / 3, "only last week reached 4 days");
  // a habit limited to one site ignores activity elsewhere
  assert.equal(habitWeek({ ...base, created_at: created, habit: { mode: "daily", site: "LawGradify" } }, activity, NOW).hit, 0);
});

test("validation: names, targets, metrics, habits and dates", () => {
  assert.deepEqual(validateGoal({ title: "  " }).errors, ["Give the goal a name."]);
  const { goal, errors } = validateGoal({ title: "Finish School 1", target: "30", metric: { source: "course", metric: "lessons", course: "law" } });
  assert.deepEqual(errors, []);
  assert.deepEqual(goal.metric, { source: "course", metric: "lessons", course: "law", period: "since_start" });
  assert.equal(goal.unit, "lessons"); assert.equal(goal.manual_value, null);
  assert.match(validateGoal({ title: "x", metric: { source: "course", metric: "lessons" }, target: 5 }).errors.join(), /Choose the course/);
  assert.match(validateGoal({ title: "x", metric: { source: "xp", metric: "xp" } }).errors.join(), /needs a target/);
  assert.match(validateGoal({ title: "x", metric: { source: "weather", metric: "sun" }, target: 1 }).errors.join(), /can't be measured/);
  assert.match(validateGoal({ title: "x", habit: { mode: "weekdays", days: [] } }).errors.join(), /at least one day/);
  assert.match(validateGoal({ title: "x", habit: { mode: "per_week", per_week: 9 } }).errors.join(), /between 1 and 7/);
  assert.equal(validateGoal({ title: "x", target: 3 }).goal.manual_value, 0, "a counted goal starts at 0");
  assert.match(validateGoal({ title: "x", target_date: "next week" }).errors.join(), /isn't a date/);
});

test("the Command Centre shows a few goals: pinned, then soonest, then today's habits", () => {
  const goals = [{ id: "a", status: "active" }, { id: "b", status: "active", pinned: true }, { id: "c", status: "active" }, { id: "d", status: "done" }, { id: "e", status: "paused" }];
  const progress = { a: { daysLeft: 30 }, b: { daysLeft: 90 }, c: { daysLeft: 3 } };
  assert.deepEqual(focusGoals(goals, progress, 3).map((g) => g.id), ["b", "c", "a"]);
});

test("moving device goals into an account adds only what the account doesn't have", () => {
  const account = [{ id: "x", title: "Account copy" }], local = [{ id: "x", title: "Device copy" }, { id: "y", title: "New" }, { title: "No id" }];
  assert.deepEqual(goalsToImport(local, account).map((g) => g.id), ["y"]);
});

test("the real table: own goals only, checks on every field, and no overwrite on a repeat import", async () => {
  const { readdir, readFile } = await import("node:fs/promises");
  const { tempDb } = await import("../scripts/pg-rehearsal.mjs");
  const d = await tempDb();
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((x) => x.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  const A = "00000000-0000-4000-8000-00000000000a", B = "00000000-0000-4000-8000-00000000000b";
  await d.sql(`grant usage on schema public to authenticated; grant all on all tables in schema public to authenticated;
    insert into auth.users (id, email) values ('${A}', 'a@x'), ('${B}', 'b@x') on conflict do nothing;`);
  const as = (uid, q) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${uid}'; ${q}; `).finally(() => d.sql("reset role; reset request.jwt.claim.sub;"));
  const G1 = "11111111-1111-4111-8111-111111111111";
  await as(A, `insert into public.goals (id, title, area, target, metric) values ('${G1}', 'Finish School 1', 'learning', 30, '{"source":"course","metric":"lessons","course":"law","period":"since_start"}')`);
  assert.equal((await as(B, "select * from public.goals")).length, 0, "B can't see A's goal");
  assert.equal((await as(B, `update public.goals set title = 'hacked' where id = '${G1}' returning id`)).length, 0, "or change it");
  await assert.rejects(as(B, `insert into public.goals (id, user_id, title) values (gen_random_uuid(), '${A}', 'planted')`), "or add one to A's account");
  // a second import of the same goal adds nothing and changes nothing
  await as(A, `insert into public.goals (id, title) values ('${G1}', 'Device copy') on conflict (id) do nothing`);
  assert.equal((await as(A, "select title from public.goals"))[0].title, "Finish School 1");
  for (const bad of [
    `insert into public.goals (id, title) values (gen_random_uuid(), '   ')`,
    `insert into public.goals (id, title, area) values (gen_random_uuid(), 'x', 'gardening')`,
    `insert into public.goals (id, title, metric) values (gen_random_uuid(), 'x', '{"source":"weather","metric":"sun"}')`,
    `insert into public.goals (id, title, habit) values (gen_random_uuid(), 'x', '{"mode":"sometimes"}')`,
    `insert into public.goals (id, title, habit) values (gen_random_uuid(), 'x', '{"per_week":3}')`,
    `insert into public.goals (id, title, target) values (gen_random_uuid(), 'x', -1)`,
    `insert into public.goals (id, title, metric, manual_value) values (gen_random_uuid(), 'x', '{"source":"xp","metric":"xp"}', 3)`,
  ]) await assert.rejects(as(A, bad), bad);
  // only the source/metric pairs the app can measure; a course metric must name its course
  for (const m of [`{"source":"course","metric":"cards","course":"law"}`, `{"source":"course","metric":"days","course":"law"}`, `{"source":"course","metric":"lessons"}`,
    `{"source":"course","metric":"lessons","course":""}`, `{"source":"course","metric":"lessons","course":5}`, `{"source":"xp","metric":"lessons"}`,
    `{"source":"xp","metric":"cards"}`, `{"source":"activity","metric":"xp"}`, `{"source":"reviews","metric":"days"}`, `{"source":"activity","metric":"days","period":"fortnight"}`, `["xp"]`, `{"metric":"xp"}`, `{"source":"xp"}`, `{}`])
    await assert.rejects(as(A, `insert into public.goals (id, title, target, metric) values (gen_random_uuid(), 'x', 5, '${m}')`), m);
  const { METRICS } = await import("../kit/learning/goals.js");
  for (const def of Object.values(METRICS)) {
    const m = JSON.stringify({ source: def.source, metric: def.metric, ...(def.needsCourse ? { course: "law" } : {}), period: "week" });
    await as(A, `insert into public.goals (id, title, target, metric) values (gen_random_uuid(), 'ok', 5, '${m}')`);
  }
  assert.equal((await as(A, "select count(*)::int as n from public.goals where title = 'ok'"))[0].n, Object.keys(METRICS).length, "every pair the app offers is accepted");
  // two devices: an update that names the old updated_at changes nothing once the other device has saved
  const [{ updated_at }] = await as(A, `select updated_at from public.goals where id = '${G1}'`);
  await as(A, `update public.goals set title = 'Phone edit', updated_at = now() + interval '1 second' where id = '${G1}'`);
  assert.equal((await as(A, `update public.goals set title = 'Laptop edit' where id = '${G1}' and updated_at = '${new Date(updated_at).toISOString()}' returning id`)).length, 0, "the stale edit is refused");
  // the database owns updated_at: a client sending an old or unchanged one can't hold it back
  const ts = async () => (await d.sql(`select updated_at::text as t, created_at::text as c from public.goals where id = '${G1}'`))[0];
  const before = await ts();
  const [kept] = await as(A, `update public.goals set title = 'Same stamp', updated_at = '${before.t}', created_at = '2000-01-01' where id = '${G1}' and updated_at = '${before.t}' returning updated_at::text as t`);
  const after = await ts();
  assert.ok(kept && after.t > before.t, "an update always moves updated_at forward, even when the client sends the old one");
  assert.equal(after.c, before.c, "created_at can't be changed");
  assert.equal((await as(A, `update public.goals set title = 'Second device' where id = '${G1}' and updated_at = '${before.t}' returning id`)).length, 0, "so a second device starting from the old copy is refused");
  // even if the stored time is ahead of the clock (clock skew, two saves in one instant), the next save is later still
  await d.sql(`alter table public.goals disable trigger goals_touch; update public.goals set updated_at = '2099-01-01 00:00:00+00' where id = '${G1}'; alter table public.goals enable trigger goals_touch;`);
  const [{ t: next }] = await as(A, `update public.goals set title = 'After skew' where id = '${G1}' returning updated_at::text as t`);
  assert.ok(next > "2099-01-01 00:00:00+00", next);
  // an insert gets the database's time, not the device's
  const [{ t: ins }] = await as(A, `insert into public.goals (id, title, updated_at) values (gen_random_uuid(), 'Old stamp', '2000-01-01') returning updated_at::text as t`);
  assert.ok(!ins.startsWith("2000"), "insert ignores a client updated_at");
  await d.close();
});

test("UK clock changes: days and weeks stay right when the clocks go forward or back", () => {
  const L = "Europe/London";
  // clocks go forward at 01:00 GMT on Sunday 29 March 2026; back at 02:00 BST on Sunday 25 October 2026
  assert.equal(dayIn(T("2026-03-28T23:30:00Z"), L), "2026-03-28", "Saturday night, still GMT");
  assert.equal(dayIn(T("2026-03-29T23:30:00Z"), L), "2026-03-30", "00:30 BST on Monday");
  assert.equal(dayIn(T("2026-10-24T23:30:00Z"), L), "2026-10-25", "00:30 BST on Sunday");
  assert.equal(dayIn(T("2026-10-25T23:30:00Z"), L), "2026-10-25", "23:30 GMT, still Sunday");
  // the week containing each change starts on its Monday, and the next week starts at local midnight
  assert.equal(weekStartKey(T("2026-03-29T22:59:00Z"), L), "2026-03-23", "23:59 BST on Sunday 29 March");
  assert.equal(weekStartKey(T("2026-03-29T23:00:00Z"), L), "2026-03-30", "00:00 BST on Monday 30 March");
  assert.equal(weekStartKey(T("2026-10-25T23:59:00Z"), L), "2026-10-19", "23:59 GMT on Sunday 25 October");
  assert.equal(weekStartKey(T("2026-10-26T00:00:00Z"), L), "2026-10-26", "00:00 GMT on Monday 26 October");
  // a habit week across a change has seven distinct days, Monday to Sunday
  const wk = habitWeek({ ...base, created_at: "2026-03-01T00:00:00Z", habit: { mode: "daily" } }, [{ at: "2026-03-29T22:30:00Z" }, { at: "2026-03-29T23:30:00Z" }], T("2026-03-29T12:00:00Z"));
  assert.deepEqual(wk.keys, ["2026-03-23", "2026-03-24", "2026-03-25", "2026-03-26", "2026-03-27", "2026-03-28", "2026-03-29"]);
  assert.deepEqual(wk.done, ["2026-03-29"], "23:30 BST on Sunday counts for Sunday; 00:30 BST is Monday's");
  // a weekly goal counts the same at 00:30 on Monday after the change as it would in winter or summer
  const g = { ...base, target: 3, metric: { source: "activity", metric: "days", period: "week" } };
  const act = [{ at: "2026-10-25T23:30:00Z" }, { at: "2026-10-26T00:30:00Z" }];
  assert.equal(measure(g, { activity: act }, T("2026-10-26T00:45:00Z")).value, 1, "Sunday night belongs to last week");
});

test("a goal's days don't depend on the device's own clock or time zone", () => {
  // the same instant, the same goal: every device gets the same week and the same day, whatever process.env.TZ is
  const g = { ...base, tz: "Europe/London", target: 4, metric: { source: "activity", metric: "days", period: "week" } };
  const act = [{ at: "2026-11-08T23:30:00Z" }, { at: "2026-11-09T00:30:00Z" }, { at: "2026-11-11T08:00:00Z" }];
  assert.equal(measure(g, { activity: act }, NOW).value, 2, "Monday 9 and Wednesday 11 November in London");
  assert.equal(measure({ ...g, tz: "Asia/Tokyo" }, { activity: act }, NOW).value, 2, "a goal set in Tokyo counts Tokyo days");
  assert.equal(habitWeek({ ...g, habit: { mode: "daily" } }, act, NOW).start, "2026-11-09");
});

test("security: anonymous visitors see and change nothing; two learners can't read or touch each other's goals", async () => {
  const { readdir, readFile } = await import("node:fs/promises");
  const { tempDb } = await import("../scripts/pg-rehearsal.mjs");
  const d = await tempDb();
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((x) => x.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  const A = "00000000-0000-4000-8000-00000000000a", B = "00000000-0000-4000-8000-00000000000b";
  // Supabase grants the API roles table privileges by default; row-level security decides the rows
  await d.sql(`grant usage on schema public to anon, authenticated; grant all on all tables in schema public to anon, authenticated;
    insert into auth.users (id, email) values ('${A}', 'a@x'), ('${B}', 'b@x') on conflict do nothing;`);
  const as = (uid, q) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${uid}'; ${q}; `).finally(() => d.sql("reset role; reset request.jwt.claim.sub;"));
  const anon = (q) => d.sql(`set role anon; ${q}; `).finally(() => d.sql("reset role;"));
  const GA = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", GB = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
  await as(A, `insert into public.goals (id, title) values ('${GA}', 'A''s goal')`);
  await as(B, `insert into public.goals (id, title) values ('${GB}', 'B''s goal')`);
  // anonymous
  assert.equal((await anon("select * from public.goals")).length, 0, "anon reads nothing");
  await assert.rejects(anon(`insert into public.goals (id, title) values (gen_random_uuid(), 'anon')`), "anon can't add");
  assert.equal((await anon(`update public.goals set title = 'x' returning id`)).length, 0, "anon can't change");
  assert.equal((await anon(`delete from public.goals returning id`)).length, 0, "anon can't delete");
  // two learners
  assert.deepEqual((await as(A, "select title from public.goals")).map((r) => r.title), ["A's goal"]);
  assert.deepEqual((await as(B, "select title from public.goals")).map((r) => r.title), ["B's goal"]);
  assert.equal((await as(B, `select * from public.goals where id = '${GA}'`)).length, 0, "B can't read A's goal even by id");
  assert.equal((await as(B, `update public.goals set title = 'x' where id = '${GA}' returning id`)).length, 0, "or change it");
  assert.equal((await as(B, `delete from public.goals where id = '${GA}' returning id`)).length, 0, "or delete it");
  await assert.rejects(as(A, `update public.goals set user_id = '${B}' where id = '${GA}'`), "A can't hand a goal to B");
  await assert.rejects(as(B, `insert into public.goals (id, user_id, title) values (gen_random_uuid(), '${A}', 'planted')`), "B can't plant a goal in A's account");
  // the id is known and global: B can't take over A's goal by re-using its id
  await assert.rejects(as(B, `insert into public.goals (id, title) values ('${GA}', 'taken')`), "same id: refused");
  assert.equal((await as(B, `insert into public.goals (id, title) values ('${GA}', 'taken') on conflict (id) do nothing returning id`)).length, 0, "a repeat import of someone else's id adds nothing");
  assert.equal((await d.sql(`select title, user_id from public.goals where id = '${GA}'`))[0].user_id, A);
  // deleting an account deletes its goals
  await d.sql(`delete from auth.users where id = '${A}'`);
  assert.equal((await d.sql(`select count(*)::int as n from public.goals`))[0].n, 1);
  await d.close();
});
