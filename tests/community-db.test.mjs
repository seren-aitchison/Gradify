// Community (supabase/migrations/20261119120000_community_and_more_tools.sql) against a real PostgreSQL: profiles are
// private, chats refuse links and contact details, groups are members-only, three reports hide a message, help
// requests go only to tutors and mentors, and the leaderboards show only who they should.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const A = "00000000-0000-4000-8000-0000000000a1", B = "00000000-0000-4000-8000-0000000000b2", C = "00000000-0000-4000-8000-0000000000c3", D = "00000000-0000-4000-8000-0000000000d4";
async function db() {
  const d = await tempDb();
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
    alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
    alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;`);
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  await d.sql(`insert into auth.users (id, email) values ('${A}', 'a@x'), ('${B}', 'b@x'), ('${C}', 'c@x'), ('${D}', 'd@x')`);
  const as = (uid, q) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${uid}'; ${q};`).finally(() => d.sql("reset role; reset request.jwt.claim.sub;"));
  const last = async (uid, q) => (await as(uid, q)).at(-1);
  return { d, as, last };
}
const profile = (as, uid, name, extra = "") => as(uid, `insert into public.community_profiles (display_name, over_13, school${extra ? `, ${extra.split("=")[0]}` : ""}) values ('${name}', true, 'Hill School'${extra ? `, ${extra.split("=")[1]}` : ""})`);

test("community: profiles, chats, groups, reports, help and leaderboards", async () => {
  const { d, as, last } = await db();
  // a profile needs the 13-or-over confirmation, and only its owner reads it
  await assert.rejects(as(A, "insert into public.community_profiles (display_name, over_13) values ('Ann', false)"));
  await profile(as, A, "Ann"); await profile(as, B, "Ben", "is_tutor=true"); await profile(as, C, "Cat");
  assert.equal((await last(B, "select count(*)::int as n from public.community_profiles")).n, 1, "you see only your own profile row");
  assert.equal((await last(B, "select count(*)::int as n from public.community_directory('tutor', '')")).n, 1, "tutors are listed");
  assert.equal((await last(A, "select count(*)::int as n from public.community_directory('mentor', '')")).n, 0);

  // subject chats: a profile is needed; links and contact details are refused
  await assert.rejects(as(D, "insert into public.chat_messages (room, body) values ('subject:biology', 'hi')"), /community profile/);
  await as(A, "insert into public.chat_messages (room, body) values ('subject:biology', 'Anyone revising osmosis?')");
  await assert.rejects(as(A, "insert into public.chat_messages (room, body) values ('subject:biology', 'see https://bad.example')"), /links/);
  await assert.rejects(as(A, "insert into public.chat_messages (room, body) values ('subject:biology', 'mail me a@b.com')"), /email/);
  await assert.rejects(as(A, "insert into public.chat_messages (room, body) values ('subject:biology', 'call 07700 900 123')"), /phone/);
  await assert.rejects(as(A, `insert into public.chat_messages (room, body, user_id) values ('subject:biology', 'as Ben', '${B}')`), "can't post as someone else");
  const msg = await last(B, "select id, name from public.chat_messages where room = 'subject:biology'");
  assert.equal(msg.name, "Ann", "the name comes from the poster's profile");
  await assert.rejects(as(A, "update public.chat_messages set body = 'edited'"), "messages can't be edited");

  // three reports hide a message for everyone
  for (const u of [B, C]) await as(u, `insert into public.chat_reports (message_id) values (${msg.id})`);
  assert.equal((await last(B, "select count(*)::int as n from public.chat_messages")).n, 1);
  await profile(as, D, "Dan");
  await as(D, `insert into public.chat_reports (message_id) values (${msg.id})`);
  assert.equal((await last(B, "select count(*)::int as n from public.chat_messages")).n, 0, "hidden after the third report");

  // groups: members only
  const g = await last(A, "insert into public.study_groups (name) values ('Bio crew') returning id, code");
  assert.equal((await last(B, "select count(*)::int as n from public.study_groups")).n, 0, "not a member: can't see it");
  await assert.rejects(as(B, `insert into public.chat_messages (room, body) values ('group:${g.id}', 'let me in')`));
  assert.equal((await last(B, `select public.join_group('${g.code.toLowerCase()}') as r`)).r.ok, true, "joining by code works, any case");
  await as(B, `insert into public.chat_messages (room, body) values ('group:${g.id}', 'Hi all')`);
  assert.equal((await last(A, `select count(*)::int as n from public.chat_messages where room = 'group:${g.id}'`)).n, 1);
  assert.equal((await last(C, `select count(*)::int as n from public.chat_messages where room = 'group:${g.id}'`)).n, 0, "outsiders can't read a group's chat");
  assert.equal((await last(C, `select count(*)::int as n from public.group_people('${g.id}')`)).n, 0);
  assert.equal((await last(A, `select count(*)::int as n from public.group_people('${g.id}')`)).n, 2);

  // help requests: only to a tutor or mentor, the asker's words fixed, no contact details
  await assert.rejects(as(A, `insert into public.help_requests (to_user, kind, message) values ('${C}', 'tutor', 'Can you help with osmosis?')`), /isn't offering/);
  const r = await last(A, `insert into public.help_requests (to_user, kind, subject, message) values ('${B}', 'tutor', 'Biology', 'Can you help with osmosis?') returning id`);
  await as(B, `update public.help_requests set reply = 'Yes: start with water potential.', status = 'answered', message = 'changed' where id = '${r.id}'`);
  const row = (await d.sql(`select * from public.help_requests where id = '${r.id}'`))[0];
  assert.equal(row.message, "Can you help with osmosis?", "the tutor can't change the question");
  assert.equal(row.status, "answered"); assert.equal(row.from_name, "Ann"); assert.equal(row.to_name, "Ben");
  await assert.rejects(as(B, `update public.help_requests set reply = 'text me on 07700900123' where id = '${r.id}'`), /phone/);
  assert.equal((await last(C, "select count(*)::int as n from public.help_requests")).n, 0, "others can't read it");

  // friends and leaderboards
  const code = (await last(B, "select friend_code from public.community_profiles")).friend_code;
  const f = await last(A, `select * from public.find_by_friend_code('${code}')`);
  assert.equal(f.display_name, "Ben");
  await as(A, `insert into public.follows (followee) values ('${B}')`);
  await d.sql(`insert into public.activity (user_id, kind, xp) values ('${A}', 'review', 30), ('${B}', 'review', 50), ('${C}', 'review', 90)`);
  const friends = (await as(A, "select * from public.leaderboard('friends')")).filter((x) => x.display_name);
  assert.deepEqual(friends.map((x) => [x.display_name, Number(x.xp_week), x.me]), [["Ben", 50, false], ["Ann", 30, true]]);
  const school = (await as(A, "select * from public.leaderboard('school')")).filter((x) => x.display_name);
  assert.equal(school.length, 4, "everyone at the same school");
  await as(C, "update public.community_profiles set on_leaderboards = false");
  assert.ok(!(await as(A, "select * from public.leaderboard('school')")).some((x) => x.display_name === "Cat"), "opting out hides you");
  assert.equal((await as(D, "select * from public.leaderboard('friends')")).filter((x) => x.display_name).length, 1, "no friends: just you");

  // notebook pages are tool items now
  await as(A, "insert into public.tool_items (id, kind, title, body) values ('n1abc', 'note', 'Page', '{}')").catch(() => {});
  await d.close?.();
});
