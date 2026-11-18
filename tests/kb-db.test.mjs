// Gradify Notes in the account (supabase/migrations/20261120120000_notes_knowledge_base.sql), against a real
// PostgreSQL with Supabase's default privileges: the knowledge base in tool_items, and shared notes. A share is read
// only by its link (kb_share), never by listing the table: no visitor or other learner can find every shared note,
// see who shared it or which note it came from, and an unshared link stops working.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const ANA = "00000000-0000-4000-8000-0000000000a1", BEN = "00000000-0000-4000-8000-0000000000b2";
const DEVICE = "device-laptop-0001";
const SNAP = (t) => JSON.stringify({ format: "gradify-notes", version: 1, root: "rabc123", rems: { rabc123: { id: "rabc123", text: t, kids: [] } } });

async function db() {
  const d = await tempDb();
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
    alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
    alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;`);
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  await d.sql(`insert into auth.users (id, email) values ('${ANA}', 'a@x'), ('${BEN}', 'b@x')`);
  const as = (uid, q) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${uid}'; set request.headers = '${JSON.stringify({ "x-gradify-device": DEVICE })}'; ${q};`)
    .finally(() => d.sql("reset role; reset request.jwt.claim.sub; reset request.headers;"));
  const anon = (q) => d.sql(`set role anon; ${q};`).finally(() => d.sql("reset role;"));
  const last = (rows) => rows.at(-1);
  return { d, as, anon, last };
}
async function shareAs(as, uid, title, { pub = true } = {}) {
  const rows = await as(uid, `insert into public.kb_shares (rem, title, snapshot, public) values ('rabc123', '${title}', '${SNAP(title)}', ${pub}) returning id`);
  return rows.at(-1).id;
}

test("shared notes can't be listed: not by a visitor with the public key, not by another learner", async () => {
  const { d, as, anon, last } = await db();
  await shareAs(as, ANA, "Ana biology");
  await shareAs(as, BEN, "Ben chemistry");
  // the old policy let this return every public share, with its sharer's user id
  await assert.rejects(anon("select id, user_id, rem, title, snapshot from public.kb_shares"), /permission denied/, "a visitor can't read the table at all");
  await assert.rejects(anon("select count(*) from public.kb_shares"), /permission denied/);
  const seen = await as(BEN, "select id, user_id, title from public.kb_shares");
  assert.deepEqual(seen.filter((r) => r.title).map((r) => r.title), ["Ben chemistry"], "another learner sees only their own shares");
  assert.equal(last(await as(BEN, `select count(*)::int as n from public.kb_shares where user_id = '${ANA}'`)).n, 0);
  await d.close();
});

test("a share link opens exactly that share, with no sharer id or note id; anything else opens nothing", async () => {
  const { d, as, anon, last } = await db();
  const id = await shareAs(as, ANA, "Cell biology");
  const priv = await shareAs(as, ANA, "Drafts", { pub: false });
  const [row] = (await anon(`select * from public.kb_share('${id}')`)).filter((r) => r.title);
  assert.equal(row.title, "Cell biology");
  assert.equal(JSON.parse(JSON.stringify(row.snapshot)).format, "gradify-notes");
  assert.deepEqual(Object.keys(row).sort(), ["snapshot", "title", "updated_at"], "no user_id, no rem, no id");
  assert.equal(last(await as(BEN, `select count(*)::int as n from public.kb_share('${id}')`)).n, 1, "signed-in learners open links too");
  // a private share, an unknown id and a malformed id all open nothing
  assert.equal(last(await anon(`select count(*)::int as n from public.kb_share('${priv}')`)).n, 0, "not while private");
  assert.equal(last(await anon(`select count(*)::int as n from public.kb_share('00000000-0000-4000-8000-000000000000')`)).n, 0, "an id that doesn't exist");
  await assert.rejects(anon(`select * from public.kb_share('not-a-uuid')`), /invalid input syntax/, "a malformed id is refused by the database (the app checks it first)");
  await d.close();
});

test("unsharing revokes the link at once; only the owner can change or delete a share", async () => {
  const { d, as, anon, last } = await db();
  const id = await shareAs(as, ANA, "Revision");
  // Ben can't change, hide, take over or delete Ana's share
  await as(BEN, `update public.kb_shares set title = 'hacked' where id = '${id}'`);
  await as(BEN, `delete from public.kb_shares where id = '${id}'`);
  assert.equal(last(await anon(`select title from public.kb_share('${id}')`)).title, "Revision", "untouched by anyone else");
  await assert.rejects(as(BEN, `insert into public.kb_shares (user_id, rem, title, snapshot) values ('${ANA}', 'rabc123', 'x', '${SNAP("x")}')`), "can't share in someone else's name");
  await assert.rejects(anon(`update public.kb_shares set title = 'x'`), /permission denied/);
  await assert.rejects(anon(`insert into public.kb_shares (user_id, rem, title, snapshot) values ('${ANA}', 'rabc123', 'x', '${SNAP("x")}')`), /permission denied/);
  // the owner updates the shared copy (the link keeps working), then unshares it
  await as(ANA, `update public.kb_shares set title = 'Revision 2', user_id = '${BEN}' where id = '${id}'`);
  const [own] = await d.sql(`select user_id, title from public.kb_shares where id = '${id}'`);
  assert.equal(own.user_id, ANA, "a share can't be moved to another account");
  assert.equal(last(await anon(`select title from public.kb_share('${id}')`)).title, "Revision 2");
  await as(ANA, `delete from public.kb_shares where id = '${id}'`);
  assert.equal(last(await anon(`select count(*)::int as n from public.kb_share('${id}')`)).n, 0, "the link stops working");
  await assert.rejects(as(ANA, `insert into public.kb_shares (rem, title, snapshot) values ('rabc123', 'x', '{"format":"other"}')`), "only Gradify Notes snapshots");
  await d.close();
});

test("the knowledge base row: kind 'kb' in tool_items, the learner's own only", async () => {
  const { d, as, last } = await db();
  await as(ANA, `insert into public.tool_items (id, kind, title, body) values ('kb-main', 'kb', 'Gradify Notes', '{"rems":{}}')`);
  await as(BEN, `insert into public.tool_items (id, kind, title, body) values ('kb-main', 'kb', 'Gradify Notes', '{"rems":{}}')`);
  assert.equal(last(await as(BEN, "select count(*)::int as n from public.tool_items")).n, 1, "each learner has their own, and sees only it");
  await assert.rejects(as(ANA, `insert into public.tool_items (id, kind) values ('x-video', 'video')`), "other kinds are still refused");
  await d.close();
});
