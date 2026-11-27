// The learner's record in the account (supabase/migrations/20261126120000_learner_state.sql), against a real
// PostgreSQL with Supabase's default privileges: two devices writing the same entry end with the newer change, an
// old change arriving late can't overwrite it, and no other learner or visitor can read or change anyone's record.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const ANA = "00000000-0000-4000-8000-0000000000a1", BEN = "00000000-0000-4000-8000-0000000000b2";
async function db() {
  const d = await tempDb();
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
    alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;`);
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  await d.sql(`insert into auth.users (id, email) values ('${ANA}', 'a@x'), ('${BEN}', 'b@x')`);
  const as = (uid, q, device = null) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${uid}'; ${device ? `set request.headers = '${JSON.stringify({ "x-gradify-device": device })}';` : ""} ${q};`).finally(() => d.sql("reset role; reset request.jwt.claim.sub; reset request.headers;"));
  const anon = (q) => d.sql(`set role anon; ${q};`).finally(() => d.sql("reset role;"));
  // what kit/data/learner-state.js sends: an upsert on (user_id, kind, key)
  const put = (uid, key, title, t, dev, del = false) => as(uid, `insert into public.learner_state (user_id, kind, key, value, t, dev, del) values ('${uid}', 'pin', '${key}', '${JSON.stringify({ title })}', ${t}, '${dev}', ${del})
    on conflict (user_id, kind, key) do update set value = excluded.value, t = excluded.t, dev = excluded.dev, del = excluded.del`);
  return { d, as, anon, put };
}
const row = (uid, key, t, dev) => `insert into public.learner_state (user_id, kind, key, value, t, dev) values ('${uid}', 'pin', '${key}', null, ${t}, '${dev}')`;
test("on Free, only the learner's active study device writes their record, as for every other learner table", async () => {
  const { d, as } = await db();
  await d.sql("update public.billing_settings set plans_enforced = true");   // the one-device rule applies once plans are on
  await d.sql(`insert into public.study_devices (user_id, device_id) values ('${ANA}', 'laptop-0001')`);
  await as(ANA, row(ANA, "/from-laptop", 1, "laptop-0001"), "laptop-0001");
  await assert.rejects(as(ANA, row(ANA, "/from-phone", 2, "phone-00001"), "phone-00001"), /row-level security/);
  // the other device can still read it, so the app can show it there
  assert.equal((await as(ANA, `select count(*)::int as n from public.learner_state`, "phone-00001"))[0].n, 1);
});

test("two devices: the newer change is kept, and an older one arriving late is ignored", async () => {
  const { as, put } = await db();
  await put(ANA, "/x", "laptop", 10, "laptop");
  await put(ANA, "/x", "phone, later", 20, "phone");
  await put(ANA, "/x", "laptop, offline earlier", 15, "laptop");
  await put(ANA, "/x", "same moment, other device", 20, "aaa");            // a tie: the larger device id stays
  const rows = await as(ANA, `select value->>'title' as title, t, dev from public.learner_state where key = '/x'`);
  assert.deepEqual(rows.map((r) => [r.title, Number(r.t), r.dev]), [["phone, later", 20, "phone"]]);
  // a deletion is a newer change like any other, and an older copy can't undo it
  await put(ANA, "/x", null, 30, "phone", true);
  await put(ANA, "/x", "stale", 25, "laptop");
  assert.equal((await as(ANA, `select del from public.learner_state where key = '/x'`))[0].del, true);
});

test("every write is stamped with the server's time, which devices pull by", async () => {
  const { as, put } = await db();
  await put(ANA, "/a", "a", 1, "d1");
  const [r] = await as(ANA, `select updated_at > now() - interval '1 minute' as fresh from public.learner_state where key = '/a'`);
  assert.equal(r.fresh, true);
});

test("a learner's record is theirs: no other learner or visitor can read or change it", async () => {
  const { as, anon, put } = await db();
  await put(ANA, "/mine", "Ana pin", 1, "d1");
  assert.equal((await as(BEN, `select count(*)::int as n from public.learner_state`))[0].n, 0);
  await assert.rejects(as(BEN, `insert into public.learner_state (user_id, kind, key, value, t, dev) values ('${ANA}', 'pin', '/x', null, 1, 'b')`), /row-level security/);
  await as(BEN, `update public.learner_state set t = 99 where user_id = '${ANA}'`);
  await as(BEN, `delete from public.learner_state where user_id = '${ANA}'`);
  assert.equal(Number((await as(ANA, `select t from public.learner_state where key = '/mine'`))[0].t), 1);
  await assert.rejects(anon(`select * from public.learner_state`), /permission denied/);
});

test("only the record's own kinds, and no oversized values", async () => {
  const { as } = await db();
  await assert.rejects(as(ANA, `insert into public.learner_state (kind, key, value, t, dev) values ('secrets', 'k', null, 1, 'd')`), /check constraint/);
  await assert.rejects(as(ANA, `insert into public.learner_state (kind, key, value, t, dev) values ('note', 'k', '{"text":"${"x".repeat(20000)}"}', 1, 'd')`), /learner_state_value_size/);
});

test("tags are part of the record (20261128120000_learner_state_tags.sql), and a kind it doesn't know is still refused", async () => {
  const { as } = await db();
  await as(ANA, `insert into public.learner_state (user_id, kind, key, value, t, dev) values ('${ANA}', 'tag', 'lesson:/scigradify/chemistry/u08-02', '{"tags":["difficult"]}', 1, 'laptop')`);
  assert.equal((await as(ANA, "select count(*)::int as n from public.learner_state where kind = 'tag'"))[0].n, 1);
  await assert.rejects(as(ANA, `insert into public.learner_state (user_id, kind, key, value, t, dev) values ('${ANA}', 'secret', 'x', null, 1, 'laptop')`), /learner_state_kind_check/);
});
