// Tools in the account and Free allowances on the server (supabase/migrations/20261118120000_tools_and_allowances.sql),
// against a real PostgreSQL: a learner's own decks and maps only, the database's own timestamps, Free's one-device rule,
// and take_allowance(): the server's limits, re-opening is free, Plus is unlimited, and learners can't write the counts.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const FREE = "00000000-0000-4000-8000-0000000000f1", PLUS = "00000000-0000-4000-8000-0000000000f2", OTHER = "00000000-0000-4000-8000-0000000000f4";
const LAPTOP = "device-laptop-0001", PHONE = "device-phone-00002";

async function db() {
  const d = await tempDb();
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
    alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
    alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;`);
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  await d.sql(`insert into auth.users (id, email) values ('${FREE}', 'f@x'), ('${PLUS}', 'p@x'), ('${OTHER}', 'o@x')`);
  await d.sql(`insert into public.subscriptions (user_id, status, current_period_end, plan) values ('${PLUS}', 'active', '${new Date(Date.now() + 20 * 864e5).toISOString()}', 'plus')`);
  await d.sql("update public.billing_settings set plans_enforced = true");
  const as = (uid, device, q) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${uid}'; set request.headers = '${JSON.stringify(device ? { "x-gradify-device": device } : {})}'; ${q};`)
    .finally(() => d.sql("reset role; reset request.jwt.claim.sub; reset request.headers;"));
  return { d, as };
}
const take = async (as, uid, bucket, item) => (await as(uid, LAPTOP, `select public.take_allowance('${bucket}', '${item}') as r`)).at(-1).r;

test("tool items: a learner's own decks and maps, with the database's own timestamps", async () => {
  const { d, as } = await db();
  await as(FREE, LAPTOP, `insert into public.tool_items (id, kind, title, body, updated_at) values ('d1abc', 'deck', 'Cells', '{"text":"A >> B"}', '2001-01-01')`);
  const [row] = await d.sql(`select * from public.tool_items where id = 'd1abc'`);
  assert.equal(row.user_id, FREE);
  assert.ok(new Date(row.updated_at).getFullYear() > 2020, "the client can't set updated_at");
  await as(FREE, LAPTOP, `update public.tool_items set title = 'Cells 2' where id = 'd1abc'`);
  const [row2] = await d.sql(`select * from public.tool_items where id = 'd1abc'`);
  assert.ok(new Date(row2.updated_at) > new Date(row.updated_at), "every change moves updated_at forward");
  assert.equal((await as(OTHER, LAPTOP, "select count(*)::int as n from public.tool_items")).at(-1).n, 0, "another learner sees nothing");
  await assert.rejects(as(OTHER, LAPTOP, `insert into public.tool_items (id, user_id, kind) values ('x1abc', '${FREE}', 'map')`), "can't write into someone else's account");
  await assert.rejects(as(FREE, LAPTOP, `insert into public.tool_items (id, kind) values ('bad01', 'video')`), "only decks and maps");
  await assert.rejects(as(FREE, LAPTOP, `insert into public.tool_images (id, mime, data) values ('i1abc', 'image/png', 'javascript:alert(1)')`), "images are image data URLs");
  await as(FREE, LAPTOP, `insert into public.tool_images (id, mime, data) values ('i2abc', 'image/png', 'data:image/png;base64,AAAA')`);
  await d.close();
});

test("tool items follow Free's one-device rule; Plus writes from any device", async () => {
  const { d, as } = await db();
  await as(FREE, LAPTOP, `select public.use_device('${LAPTOP}')`);
  await as(FREE, LAPTOP, `insert into public.tool_items (id, kind) values ('m1abc', 'map')`);
  await assert.rejects(as(FREE, PHONE, `insert into public.tool_items (id, kind) values ('m2abc', 'map')`), "not from the other device");
  assert.equal((await as(FREE, PHONE, "select count(*)::int as n from public.tool_items")).at(-1).n, 1, "but it can read everything");
  await as(PLUS, PHONE, `insert into public.tool_items (id, kind) values ('m3abc', 'map')`);
  await as(PLUS, LAPTOP, `insert into public.tool_items (id, kind) values ('m4abc', 'map')`);
  await d.close();
});

test("take_allowance: the server's limits, re-opening is free, each course and tool counted on its own", async () => {
  const { d, as } = await db();
  for (let k = 0; k < 10; k++) assert.equal((await take(as, FREE, "lesson:law", `u01-${k}`)).ok, true);
  const no = await take(as, FREE, "lesson:law", "u02-01");
  assert.deepEqual([no.ok, no.used, no.limit], [false, 10, 10]);
  assert.equal((await take(as, FREE, "lesson:law", "u01-3")).ok, true, "already opened");
  assert.equal((await take(as, FREE, "lesson:chemistry", "u01-01")).ok, true, "another course has its own ten");
  for (let k = 0; k < 5; k++) await take(as, FREE, "map", `law:u01-01:${k}`);
  assert.equal((await take(as, FREE, "map", "law:u01-02:0")).ok, false);
  for (let k = 0; k < 5; k++) await take(as, FREE, "tool:cards", `d${k}`);
  assert.equal((await take(as, FREE, "tool:cards", "d9")).ok, false);
  assert.equal((await take(as, FREE, "tool:convert", "x")).ok, true);
  assert.equal((await take(as, FREE, "made-up", "x")).reason, "unknown_allowance", "the client can't invent an allowance");
  assert.equal((await take(as, PLUS, "lesson:law", "u09-09")).unlimited, true);
  await d.close();
});

test("learners can read their usage but not write it, and signed-out callers can't use it", async () => {
  const { d, as } = await db();
  await take(as, FREE, "flashcards", "set1");
  assert.equal((await as(FREE, LAPTOP, "select count(*)::int as n from public.free_usage")).at(-1).n, 1);
  await assert.rejects(as(FREE, LAPTOP, "delete from public.free_usage"));
  await assert.rejects(as(FREE, LAPTOP, `insert into public.free_usage (bucket, item) values ('map', 'x')`));
  await assert.rejects(d.sql("set role anon; select public.take_allowance('map', 'x');").finally(() => d.sql("reset role")));
  assert.equal((await as(OTHER, LAPTOP, "select count(*)::int as n from public.free_usage")).at(-1).n, 0);
  await d.close();
});

test("before plans are enforced, nothing is limited", async () => {
  const { d, as } = await db();
  await d.sql("update public.billing_settings set plans_enforced = false");
  for (let k = 0; k < 12; k++) assert.equal((await take(as, FREE, "lesson:law", `l${k}`)).ok, true);
  await d.close();
});
