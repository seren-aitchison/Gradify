// Backup, restore and migration rehearsals against real PostgreSQL (PGlite), using the same code the production
// run uses: every migration applied and verified, a backup restored into a separate database and compared value
// by value, and migrations rehearsed against real data with content checksums.
import { test } from "node:test";
import assert from "node:assert/strict";
import { tempDb, snapshot, restoreRehearsal, rehearseMigration, compareSnapshots, columnsNow, checksums, changed, loadRows, applyMigrations } from "../scripts/pg-rehearsal.mjs";
import { migrate, listMigrations, destructive } from "../scripts/supabase-admin.mjs";

const A = "11111111-1111-4111-8111-111111111111", B = "22222222-2222-4222-8222-222222222222";
async function seeded(upTo = null) {
  const list = await listMigrations(), c = await tempDb();
  const use = upTo ? list.filter((m) => m.version <= upTo) : list;
  const r = await migrate(c, { list: use });
  assert.equal(r.ok, true, JSON.stringify(r.report.filter((x) => x.result !== "applied and verified")));
  // two learners and the kinds of value the tables hold: jsonb, arrays, timestamps, numerics, identity ids, trigger output
  await c.sql(`insert into auth.users (id, email) values ('${A}', 'a@test'), ('${B}', 'b@test');
    insert into public.documents (id, user_id, title, site, text) values ('aaaaaaaa-0000-4000-8000-000000000001', '${A}', 'Contract', 'LawGradify', 'Offer and acceptance; ''quoted'' text');
    insert into public.cards (user_id, document_id, topic, front, back, kind, ease, interval_days) values ('${A}', 'aaaaaaaa-0000-4000-8000-000000000001', 'Offer', 'What is an offer?', 'A definite promise…', 'definition', 2.35, 3.5);
    insert into public.activity (user_id, site, kind, xp, detail) values ('${A}', 'LawGradify', 'law-lesson', 20, '{"lesson":"u01-01"}'), ('${B}', 'SciGradify', 'physics-lesson', 15, null);
    insert into public.plan_blocks (user_id, day, start_min, end_min, title) values ('${B}', '2026-11-07', 540, 600, 'Revise mechanics');`);
  if (!upTo || upTo >= "20261101120000") await c.sql(`insert into public.assessment_attempts (id, user_id, site, subject, context, question_id, question_type, difficulty, objectives, response, score, correct, confidence, created_at) values ('att-1', '${A}', 'LawGradify', 'law', 'lesson', 'law-u01-01-q1', 'sba', 2, '{1,2}', '"An offer"', 0.5, false, 3, '2026-11-01T10:00:00Z');`);
  if (!upTo || upTo >= "20261105120000") await c.sql(`insert into public.course_progress (user_id, subject, site, state) values ('${A}', 'law', 'LawGradify', '{"done":{"u01-01":1730000000000},"cards":{}}');`);
  return { c, list };
}

test("every migration applies and verifies on real PostgreSQL, through the production migrate code", async () => {
  const list = await listMigrations(), c = await tempDb();
  const r = await migrate(c, { list });
  assert.equal(r.ok, true, JSON.stringify(r.report));
  assert.equal(r.report.length, (await (await import("node:fs/promises")).readdir(new URL("../supabase/migrations/", import.meta.url))).filter((f) => f.endsWith(".sql")).length);
  assert.ok(r.report.every((m) => m.result === "applied and verified" && m.checked > 0));
  const again = await migrate(c, { list });
  assert.ok(again.report.every((m) => m.result === "already applied"), "re-running applies nothing twice");
  await c.close();
});

test("a backup restores into a separate database with every row and value identical", async () => {
  const { c, list } = await seeded();
  const snap = JSON.parse(JSON.stringify(await snapshot(c)));   // as written to and read from disk
  assert.ok(snap.counts.profiles === 2 && snap.counts.cards === 1 && snap.counts.assessment_attempts === 1);
  assert.equal(snap.rows.profiles.find((p) => p.id === A).xp, 20, "the XP trigger's output is part of the backup");
  const r = await restoreRehearsal(snap, list);
  assert.deepEqual(r.problems, []); assert.equal(r.ok, true); assert.ok(r.rows >= 8);
  await c.close();
});

test("a restore that loses or changes a value is caught", async () => {
  const { c, list } = await seeded();
  const snap = JSON.parse(JSON.stringify(await snapshot(c)));
  const other = await tempDb();
  await applyMigrations(other, list, snap.schema.migrations.map((m) => m.version));
  const damaged = JSON.parse(JSON.stringify(snap)); damaged.rows.cards[0].back = "changed"; damaged.rows.activity.pop();
  await loadRows(other, damaged);
  const diffs = compareSnapshots(snap, await snapshot(other));
  assert.ok(diffs.some((d) => /cards: row contents differ/.test(d)) && diffs.some((d) => /activity: 2 rows in the backup, 1/.test(d)), diffs.join("; "));
  await c.close(); await other.close();
});

test("a backup whose recorded migrations differ from the repository is not considered restorable", async () => {
  const { c, list } = await seeded();
  const snap = JSON.parse(JSON.stringify(await snapshot(c)));
  snap.schema.migrations[0].statements = ["-- edited after it was applied"];
  const r = await restoreRehearsal(snap, list);
  assert.equal(r.ok, false); assert.match(r.problems[0], /differs from the version that was applied/);
  await c.close();
});

test("each later migration, rehearsed against real data, leaves every existing value unchanged", async () => {
  const { c, list } = await seeded("20261101120000");
  let snap = JSON.parse(JSON.stringify(await snapshot(c)));
  for (const m of list.filter((x) => x.version > "20261101120000")) {
    const r = await rehearseMigration(snap, list, m);
    assert.equal(r.ok, true, `${m.file}: ${r.problems.join("; ")}`);
    const cols = await columnsNow(c), before = await checksums(c, cols);
    const applied = await migrate(c, { list: list.filter((x) => x.version <= m.version), backedUp: true });
    assert.equal(applied.ok, true);
    assert.deepEqual(changed(before, await checksums(c, cols)), [], `${m.file} changed existing values`);
    snap = JSON.parse(JSON.stringify(await snapshot(c)));
  }
  await c.close();
});

test("the rehearsal catches a migration that changes or can't handle existing data", async () => {
  const { c, list } = await seeded();
  const snap = JSON.parse(JSON.stringify(await snapshot(c)));
  const rewrite = await rehearseMigration(snap, list, { sql: "update public.cards set back = 'rewritten';" });
  assert.equal(rewrite.ok, false); assert.match(rewrite.problems.join(), /cards: existing values changed/);
  const fails = await rehearseMigration(snap, list, { sql: "alter table public.cards add column must_have text not null;" });
  assert.equal(fails.ok, false); assert.match(fails.problems[0], /fails on a copy of the data/);
  await c.close();
});

test("the allowlist refuses dynamic SQL, DO blocks, indirect calls and data changes, and accepts the real migrations", async () => {
  for (const m of await listMigrations()) assert.deepEqual(destructive(await (await import("node:fs/promises")).readFile(m.url, "utf8")), [], m.file);
  const refused = [
    "do $$ begin execute 'drop table public.cards'; end $$;",
    "do $x$ begin perform 1; end $x$;",
    "call public.cleanup();",
    "select public.wipe_everything();",
    "insert into public.cards (front, back) values ('a', 'b');",
    "update public.profiles set xp = 0;",
    "delete from public.cards;",
    "truncate public.cards;",
    "copy public.cards to '/tmp/x';",
    "grant all on public.cards to anon;",
    "alter table public.cards disable row level security;",
    "alter policy \"own cards\" on public.cards using (true);",
    "drop policy \"own cards\" on public.cards;",
    "drop table public.cards cascade;",
    "alter table public.cards alter column front type varchar(10);",
    "alter table public.cards owner to anon;",
    "alter table public.cards add column x int default public.side_effect();",
    "alter table public.cards add constraint k check (public.side_effect() > 0);",
    "create index i on public.cards (public.side_effect(front));",
    "create table public.copy as select * from public.cards;",
    "create function public.f() returns void language sql as $$ select 1 $$; select public.f();",
    "comment on table public.cards is 'harmless; drop table public.cards';  drop table public.cards;",
  ];
  for (const sql of refused) assert.ok(destructive(sql).length > 0, `should be refused: ${sql}`);
  assert.deepEqual(destructive("comment on table public.cards is 'a; drop table x';"), [], "a semicolon inside a string isn't a statement break");
});

test("the production backup command writes, re-reads, re-counts and restore-rehearses before calling a backup verified", async () => {
  const { backup } = await import("../scripts/supabase-admin.mjs");
  const { mkdtemp, rm, readdir } = await import("node:fs/promises"), { tmpdir } = await import("node:os"), { join } = await import("node:path");
  const { c } = await seeded(); c.ref = "rehearsalproject00000";
  const dir = await mkdtemp(join(tmpdir(), "gradify-backup-"));
  const text = await backup(c, dir);
  assert.match(text, /\*\*verified\*\*/); assert.match(text, /restored into a separate temporary PostgreSQL database/);
  assert.equal((await readdir(dir)).length, 1);
  await assert.rejects(backup(c, new URL("../", import.meta.url).pathname + "docs"), /outside the repository/);
  await rm(dir, { recursive: true }); await c.close();
});

test("migrate with rehearsals on: each migration is rehearsed on a copy of the data before it touches the database", async () => {
  const { c, list } = await seeded("20261101120000");
  const lines = [];
  const r = await migrate(c, { list, backedUp: true, rehearse: true, log: (l) => lines.push(l) });
  assert.equal(r.ok, true, JSON.stringify(r.report.filter((x) => x.result !== "applied and verified" && x.result !== "already applied")));
  assert.ok(lines.filter((l) => /rehearsed on a copy/.test(l)).length >= 5, lines.join("\n"));
  await c.close();
});

test("test accounts: created with only a locally made bcrypt hash, and deletion can only remove this run's accounts", async () => {
  const { createTestAccounts, deleteTestAccounts } = await import("../scripts/supabase-admin.mjs");
  const { default: bcrypt } = await import("bcryptjs");
  const c = await tempDb(), sent = [];
  // stand-ins for the GoTrue columns the SQL writes (the live run proves the real schema by signing in)
  await c.sql(`drop table auth.users; create table auth.users (instance_id uuid, id uuid primary key, aud text, role text, email text, encrypted_password text, email_confirmed_at timestamptz, raw_app_meta_data jsonb, raw_user_meta_data jsonb, created_at timestamptz, updated_at timestamptz, confirmation_token text, recovery_token text, email_change_token_new text, email_change text);
    create table auth.identities (id uuid primary key, user_id uuid references auth.users (id) on delete cascade, provider_id text, identity_data jsonb, provider text, last_sign_in_at timestamptz, created_at timestamptz, updated_at timestamptz);
    insert into auth.users (id, email, raw_app_meta_data) values ('33333333-3333-4333-8333-333333333333', 'real.learner@gmail.com', '{"provider":"email"}');`);
  const spy = { sql: (q) => { sent.push(q); return c.sql(q); } };
  const accts = await createTestAccounts(spy, 2);
  assert.equal(accts.length, 2);
  for (const a of accts) {
    assert.ok(sent.every((q) => !q.includes(a.password)), "the plain password is never sent to the database");
    const row = (await c.sql(`select encrypted_password, email from auth.users where id = '${a.id}'`))[0];
    assert.ok(bcrypt.compareSync(a.password, row.encrypted_password)); assert.match(row.email, /^gradify-test-[0-9a-f]{8}-\d@example\.com$/);
  }
  // a deletion request that names a real user's id too must still leave the real user alone
  const left = await deleteTestAccounts(c, [...accts, { id: "33333333-3333-4333-8333-333333333333" }]);
  assert.equal(left, 1, "only the real learner remains among the ids named");
  assert.equal((await c.sql("select count(*)::int as n from auth.users"))[0].n, 1);
  assert.equal((await c.sql("select count(*)::int as n from auth.identities"))[0].n, 0, "identities go with their accounts");
  await c.close();
});
