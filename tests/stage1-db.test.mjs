// Stage 1 (organisations, permissions, audit, notifications, entitlements) against a real PostgreSQL with
// Supabase's roles and default privileges, every repository migration applied in order. Acts as an owner, an
// administrator, a unit head, a teacher, a student, an auditor, an outsider and another organisation's owner.
// Also proves Stage 1 changed nothing that existed before it (docs/architecture/STAGE1-DEPENDENCIES.md).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const U = Object.fromEntries(["owner", "admin", "head", "teacher", "student", "auditor", "outsider", "other"].map((k, i) => [k, `00000000-0000-4000-8000-0000000001${String(i).padStart(2, "0")}`]));
const EMAIL = (k) => `${k}@example.test`;
const STAGE1 = "20261121";
const lit = (x) => (x == null ? "null" : `'${String(x).replace(/'/g, "''")}'`);

async function db({ upTo = null } = {}) {
  const d = await tempDb();
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
    alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
    alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;`);
  const dir = new URL("../supabase/migrations/", import.meta.url);
  const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();
  const apply = async (pred) => { for (const f of files.filter(pred)) await d.sql(await readFile(new URL(f, dir), "utf8")); };
  await apply((f) => !upTo || f < upTo);
  await d.sql(`insert into auth.users (id, email) values ${Object.entries(U).map(([k, id]) => `('${id}', '${EMAIL(k)}')`).join(", ")}`);
  const as = (uid, q) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${uid}'; set request.headers = '{}'; ${q};`).finally(() => d.sql("reset role; reset request.jwt.claim.sub; reset request.headers;"));
  const anon = (q) => d.sql(`set role anon; ${q};`).finally(() => d.sql("reset role;"));
  const service = (q) => d.sql(`set role service_role; ${q};`).finally(() => d.sql("reset role;"));
  const one = async (uid, q) => (await as(uid, q)).at(-1);
  return { d, as, anon, service, one, rest: () => apply((f) => upTo && f >= upTo) };
}
// a school with Science → Biology, and people in their roles
async function school(t) {
  const org = (await t.one(U.owner, `select public.create_organisation('Riverside School', 'secondary_school') as id`)).id;
  const science = (await t.one(U.owner, `select public.create_unit('${org}', null, 'faculty', 'Science') as id`)).id;
  const bio = (await t.one(U.owner, `select public.create_unit('${org}', '${science}', 'department', 'Biology') as id`)).id;
  const join = async (who, role, unit = null) => {
    const tok = (await t.one(U.owner, `select public.invite_member('${org}', ${lit(unit)}, '${role}', ${lit(EMAIL(who))}, 7, 1) as t`)).t;
    const r = (await t.one(U[who], `select public.accept_invitation('${tok}') as r`)).r;
    assert.equal(r.ok, true, `${who} joins as ${role}: ${JSON.stringify(r)}`);
  };
  await join("admin", "admin");
  await join("head", "unit_head", science);
  await join("teacher", "teacher", bio);
  await join("student", "student", bio);
  await join("auditor", "auditor");
  const other = (await t.one(U.other, `select public.create_organisation('Other Academy', 'secondary_school') as id`)).id;
  return { org, science, bio, other };
}
const memberId = async (t, org, who) => (await t.d.sql(`select id from public.org_members where org_id = '${org}' and user_id = '${U[who]}'`))[0].id;

// ---------- nothing that existed before Stage 1 changes ----------
async function catalogue(d, tables, functions) {
  const inList = (xs) => xs.map(lit).join(", ");
  return {
    columns: await d.sql(`select table_name, column_name, data_type, is_nullable, column_default from information_schema.columns where table_schema = 'public' and table_name in (${inList(tables)}) order by 1, 2`),
    policies: await d.sql(`select tablename, policyname, cmd, roles::text as roles, qual, with_check, permissive from pg_policies where schemaname = 'public' and tablename in (${inList(tables)}) order by 1, 2`),
    grants: await d.sql(`select table_name, grantee, privilege_type from information_schema.role_table_grants where table_schema = 'public' and table_name in (${inList(tables)}) order by 1, 2, 3`),
    rls: await d.sql(`select relname, relrowsecurity, relforcerowsecurity from pg_class where relnamespace = 'public'::regnamespace and relname in (${inList(tables)}) order by 1`),
    triggers: await d.sql(`select event_object_schema, event_object_table, trigger_name, action_statement from information_schema.triggers where event_object_schema in ('public', 'auth') order by 1, 2, 3`),
    functions: await d.sql(`select p.proname, pg_get_function_identity_arguments(p.oid) as args, md5(pg_get_functiondef(p.oid)) as def, coalesce(p.proacl::text, '') as acl
      from pg_proc p where p.pronamespace = 'public'::regnamespace and p.proname in (${inList(functions)}) order by 1, 2`),
  };
}
test("Stage 1 changes no existing table, column, policy, grant, trigger or function", async () => {
  const t = await db({ upTo: STAGE1 });
  const tables = (await t.d.sql("select tablename from pg_tables where schemaname = 'public' order by 1")).map((r) => r.tablename);
  const functions = (await t.d.sql("select distinct proname from pg_proc where pronamespace = 'public'::regnamespace order by 1")).map((r) => r.proname);
  assert.ok(tables.includes("profiles") && tables.includes("study_groups") && functions.includes("plan_of"), "the earlier schema is there");
  const before = await catalogue(t.d, tables, functions);
  await t.rest();
  const after = await catalogue(t.d, tables, functions);
  // Stage 1 adds triggers only on its own new tables
  after.triggers = after.triggers.filter((r) => tables.includes(r.event_object_table) || r.event_object_schema === "auth");
  for (const k of Object.keys(before)) assert.deepEqual(after[k], before[k], `${k} unchanged`);
  const added = (await t.d.sql("select tablename from pg_tables where schemaname = 'public'")).map((r) => r.tablename).filter((x) => !tables.includes(x)).sort();
  assert.deepEqual(added, ["audit_log", "email_outbox", "invitation_attempts", "notification_prefs", "notifications", "org_ai_pools", "org_ai_usage", "org_data_policies", "org_invitations", "org_members", "org_seats", "org_subscriptions", "org_units", "organisations", "role_permissions", "teacher_profiles"]);
  await t.d.close();
});

test("existing sign-up and community still work after Stage 1", async () => {
  const t = await db();
  const NEW = "00000000-0000-4000-8000-000000000999";
  await t.d.sql(`insert into auth.users (id, email) values ('${NEW}', 'new@example.test')`);
  assert.equal((await t.d.sql(`select count(*)::int as n from public.profiles where id = '${NEW}'`))[0].n, 1, "a new account still gets its profile");
  await t.as(U.student, `insert into public.community_profiles (display_name, over_13) values ('Sam', true)`);
  await t.as(U.teacher, `insert into public.community_profiles (display_name, over_13) values ('Taylor', true)`);
  const code = (await t.one(U.teacher, `select friend_code from public.community_profiles where user_id = '${U.teacher}'`)).friend_code;
  assert.ok((await t.as(U.student, `select * from public.find_by_friend_code('${code}')`)).length, "friend codes still find people");
  await t.as(U.student, `insert into public.follows (follower, followee) values ('${U.student}', '${U.teacher}')`);
  const g = (await t.one(U.student, `insert into public.study_groups (name) values ('Revision crew') returning id`)).id;
  assert.equal((await t.one(U.student, `select public.is_group_member('${g}') as m`)).m, true, "making a group still makes you a member");
  await t.d.close();
});

// ---------- organisations, units and permissions in context ----------
test("an organisation and its structure: owners, units, and permissions that apply down the tree only", async () => {
  const t = await db();
  const s = await school(t);
  const ctx = (await t.one(U.teacher, "select public.my_contexts() as c")).c;
  assert.equal(ctx.organisations.length, 1);
  assert.deepEqual(ctx.organisations[0].roles.map((r) => [r.role, r.unit_name]), [["teacher", "Biology"]], "a role in context, not a global one");
  assert.equal((await t.one(U.outsider, "select public.my_contexts() as c")).c.organisations.length, 0);
  // the Science head can add a unit under Biology (below them), not at the top, and not in another organisation
  await t.as(U.head, `select public.create_unit('${s.org}', '${s.bio}', 'class', 'Year 12 Biology')`);
  await assert.rejects(t.as(U.head, `select public.create_unit('${s.org}', null, 'faculty', 'Arts')`), /can't add units here/);
  await assert.rejects(t.as(U.owner, `select public.create_unit('${s.org}', '${(await t.d.sql(`select id from public.org_units where org_id = '${s.other}' limit 1`))[0]?.id ?? s.bio}', 'x', 'y')`).then(async () => {
    // (no unit in the other org exists yet: make one and try to hang a unit of ours under it)
    const theirs = (await t.one(U.other, `select public.create_unit('${s.other}', null, 'faculty', 'Theirs') as id`)).id;
    await t.as(U.owner, `select public.create_unit('${s.org}', '${theirs}', 'x', 'Smuggled')`);
  }), "a unit's parent is always in the same organisation");
  // has_perm is contextual: the teacher reads members in Biology, nothing organisation-wide
  assert.equal((await t.one(U.teacher, `select public.has_perm('members.read', '${s.org}', '${s.bio}') as p`)).p, true);
  assert.equal((await t.one(U.teacher, `select public.has_perm('members.read', '${s.org}') as p`)).p, false);
  assert.equal((await t.one(U.teacher, `select public.has_perm('members.invite', '${s.org}', '${s.bio}') as p`)).p, false, "teachers don't invite in Stage 1");
  const seen = await t.as(U.teacher, `select user_id from public.org_members where org_id = '${s.org}'`);
  assert.deepEqual(seen.map((r) => r.user_id).sort(), [U.student, U.teacher].sort(), "the teacher sees Biology's members only");
  assert.deepEqual((await t.as(U.student, `select user_id from public.org_members`)).map((r) => r.user_id), [U.student], "a student sees only their own membership");
  await t.d.close();
});

test("no organisation can see or change another's anything", async () => {
  const t = await db();
  const s = await school(t);
  for (const [tbl, col] of [["organisations", "id"], ["org_units", "org_id"], ["org_members", "org_id"], ["org_invitations", "org_id"], ["org_data_policies", "org_id"], ["audit_log", "org_id"]]) {
    assert.equal((await t.one(U.other, `select count(*)::int as n from public.${tbl} where ${col} = '${s.org}'`)).n, 0, `${tbl}: nothing of the other school`);
    assert.equal((await t.one(U.outsider, `select count(*)::int as n from public.${tbl}`)).n, 0, `${tbl}: nothing for an outsider`);
  }
  await assert.rejects(t.as(U.other, `select public.invite_member('${s.org}', null, 'student', null, 7, 1)`));
  await assert.rejects(t.as(U.other, `select public.change_member_role('${await memberId(t, s.org, "student")}', 'teacher')`));
  await assert.rejects(t.as(U.other, `select public.rename_organisation('${s.org}', 'Mine now')`));
  for (const tbl of ["organisations", "org_members", "org_units", "audit_log", "notifications", "org_subscriptions"]) await assert.rejects(t.anon(`select * from public.${tbl}`), /permission denied/, `${tbl}: nothing signed out`);
  // and nobody writes the tables directly: every change is a checked function
  await assert.rejects(t.as(U.owner, `insert into public.org_members (org_id, user_id, role) values ('${s.org}', '${U.outsider}', 'admin')`), /permission denied/);
  await assert.rejects(t.as(U.owner, `update public.organisations set verified_at = now(), manages_minors = true where id = '${s.org}'`), /permission denied/, "only Gradify staff verify an organisation");
  await assert.rejects(t.as(U.owner, `insert into public.audit_log (action) values ('org.fake')`), /permission denied/);
  await t.d.close();
});

test("personal learning stays personal: an organisation's staff see none of a member's own study (D10)", async () => {
  const t = await db();
  const s = await school(t);
  const doc = (await t.one(U.student, `insert into public.documents (title) values ('My revision notes') returning id`)).id;
  await t.as(U.student, `insert into public.cards (document_id, front, back) values ('${doc}', 'Q', 'A')`);
  await t.as(U.student, `insert into public.learning_events (event) values ('lesson_completed')`);
  await t.as(U.student, `insert into public.course_progress (subject, site, state) values ('biology', 'SciGradify', '{}')`);
  await t.as(U.student, `insert into public.goals (title) values ('Get an A')`);
  for (const who of ["owner", "admin", "head", "teacher", "auditor"]) {
    for (const tbl of ["documents", "cards", "learning_events", "course_progress", "goals", "reviews", "assessment_attempts", "tool_items"]) {
      assert.equal((await t.one(U[who], `select count(*)::int as n from public.${tbl} where user_id = '${U.student}'`)).n, 0, `${who} can't read the student's ${tbl}`);
    }
  }
  assert.equal((await t.one(U.student, "select count(*)::int as n from public.cards")).n, 1, "the student still sees their own");
  await t.d.close();
});

test("roles: owners guard owners, the last owner stays, and suspension or removal takes effect at once", async () => {
  const t = await db();
  const s = await school(t);
  const adminM = await memberId(t, s.org, "admin"), studentM = await memberId(t, s.org, "student"), ownerM = await memberId(t, s.org, "owner");
  await assert.rejects(t.as(U.admin, `select public.change_member_role('${studentM}', 'admin')`), /Only an owner/, "an administrator can't make administrators");
  await assert.rejects(t.as(U.admin, `select public.set_member_status('${ownerM}', 'removed')`), /Only an owner/);
  await assert.rejects(t.as(U.owner, `select public.change_member_role('${ownerM}', 'admin')`), /at least one owner/);
  await assert.rejects(t.as(U.owner, "select public.leave_organisation(o.id) from public.organisations o"), /only owner/);
  await t.as(U.owner, `select public.change_member_role('${adminM}', 'owner')`);
  await t.as(U.owner, `select public.leave_organisation('${s.org}')`);
  assert.equal((await t.one(U.owner, `select public.is_org_member('${s.org}') as m`)).m, false, "a second owner lets the first leave");
  // the head of Science suspends the Biology student: gone at once
  await t.as(U.head, `select public.set_member_status('${studentM}', 'suspended')`);
  assert.equal((await t.one(U.student, `select count(*)::int as n from public.organisations`)).n, 0, "a suspended member sees nothing");
  assert.equal((await t.one(U.student, `select public.has_perm('org.read', '${s.org}', '${s.bio}') as p`)).p, false);
  // a suspended member can't let themselves back in with another invitation
  const tok = (await t.one(U.admin, `select public.invite_member('${s.org}', '${s.bio}', 'student', null, 7, 5) as t`)).t;
  assert.equal((await t.one(U.student, `select public.accept_invitation('${tok}') as r`)).r.reason, "suspended");
  await t.as(U.head, `select public.set_member_status('${studentM}', 'active')`);
  assert.equal((await t.one(U.student, `select count(*)::int as n from public.organisations`)).n, 1);
  // archiving (owners only) suspends every permission in the organisation; nothing is deleted
  await assert.rejects(t.as(U.head, `select public.archive_organisation('${s.org}')`), /Only an owner/);
  await t.as(U.admin, `select public.archive_organisation('${s.org}')`);   // the admin was made an owner above
  for (const who of ["admin", "head", "teacher", "student"]) {
    assert.equal((await t.one(U[who], "select count(*)::int as n from public.organisations")).n, 0, `${who} no longer sees it`);
    assert.equal((await t.one(U[who], `select public.has_perm('org.read', '${s.org}', '${s.bio}') as p`)).p, false);
  }
  assert.equal((await t.d.sql(`select count(*)::int as n from public.org_members where org_id = '${s.org}'`))[0].n, 6, "every membership is kept");
  await t.d.close();
});

test("invitations: hashed, expiring, revocable, use-limited, bound to an email, and guessing is slowed", async () => {
  const t = await db();
  const s = await school(t);
  const tok = (await t.one(U.owner, `select public.invite_member('${s.org}', '${s.bio}', 'student', ${lit(EMAIL("outsider"))}, 7, 1) as t`)).t;
  assert.match(tok, /^[0-9a-f]{64}$/);
  assert.equal((await t.d.sql(`select count(*)::int as n from public.org_invitations where token_hash = '${tok}'`))[0].n, 0, "the token itself is never stored");
  assert.equal((await t.one(U.other, `select public.accept_invitation('${tok}') as r`)).r.reason, "wrong_account", "an email invitation works only for that account");
  assert.equal((await t.one(U.outsider, `select public.accept_invitation('${tok}') as r`)).r.ok, true);
  assert.equal((await t.one(U.outsider, `select public.accept_invitation('${tok}') as r`)).r.already, true, "accepting again changes nothing");
  // a link for a class: five uses, then used up; expired and revoked links don't work
  const link = (await t.one(U.head, `select public.invite_member('${s.org}', '${s.bio}', 'student', null, 7, 1) as t`)).t;
  await t.d.sql(`update public.org_invitations set expires_at = now() - interval '1 minute' where token_hash = encode(sha256(convert_to('${link}', 'UTF8')), 'hex')`);
  assert.equal((await t.one(U.other, `select public.accept_invitation('${link}') as r`)).r.reason, "expired");
  const link2 = (await t.one(U.head, `select public.invite_member('${s.org}', '${s.bio}', 'student', null, 7, 1) as t`)).t;
  await t.as(U.head, `select public.revoke_invitation(id) from public.org_invitations where token_hash = encode(sha256(convert_to('${link2}', 'UTF8')), 'hex')`);
  assert.equal((await t.one(U.other, `select public.accept_invitation('${link2}') as r`)).r.reason, "revoked");
  await assert.rejects(t.as(U.head, `select public.invite_member('${s.org}', null, 'admin', null, 7, 1)`), /can't invite people here|Only an owner/, "a unit head can't invite administrators");
  await assert.rejects(t.as(U.owner, `select public.invite_member('${s.org}', null, 'guardian', null, 7, 1)`), /can't be invited/, "guardian access isn't available yet (D2)");
  await assert.rejects(t.as(U.owner, `select public.invite_member('${s.org}', null, 'student', 'a@b.test', 7, 20)`), /used once/);
  // ten wrong tokens in an hour, and the eleventh attempt is refused even with a good token
  for (let i = 0; i < 10; i++) await t.as(U.other, `select public.accept_invitation('${"0".repeat(64)}')`);
  const good = (await t.one(U.owner, `select public.invite_member('${s.org}', null, 'student', null, 7, 1) as t`)).t;
  assert.equal((await t.one(U.other, `select public.accept_invitation('${good}') as r`)).r.reason, "too_many_attempts");
  await t.d.close();
});

// ---------- audit ----------
test("the audit log: one row per action, readable only by those allowed, and unchangeable by anyone", async () => {
  const t = await db();
  const s = await school(t);
  const actions = (await t.d.sql(`select action from public.audit_log where org_id = '${s.org}' order by id`)).map((r) => r.action);
  assert.deepEqual(actions.slice(0, 4), ["org.created", "org.unit_created", "org.unit_created", "members.invited"]);
  assert.equal(actions.filter((a) => a === "members.joined").length, 5, "each join recorded once");
  for (const who of ["owner", "admin", "auditor"]) assert.ok((await t.one(U[who], "select count(*)::int as n from public.audit_log")).n > 0, `${who} reads the audit log`);
  for (const who of ["teacher", "student", "head", "other", "outsider"]) assert.equal((await t.one(U[who], `select count(*)::int as n from public.audit_log where org_id = '${s.org}'`)).n, 0, `${who} doesn't`);
  // not even the service role or the database owner can change or delete a row
  await assert.rejects(t.d.sql("update public.audit_log set action = 'org.forged' where id = 1"), /can't be changed/);
  await assert.rejects(t.d.sql("delete from public.audit_log where id = 1"), /can't be changed/);
  await t.service("update public.audit_log set action = 'org.forged' where id = 1").catch(() => {});
  assert.equal((await t.d.sql("select action from public.audit_log where id = 1"))[0].action, "org.created", "the service role can't change it either");
  // deleting an account keeps the organisation's history, without their name
  await t.d.sql(`delete from auth.users where id = '${U.auditor}'`);
  assert.ok((await t.d.sql(`select count(*)::int as n from public.audit_log where action = 'members.joined'`))[0].n >= 5, "rows survive");
  assert.equal((await t.d.sql(`select count(*)::int as n from public.audit_log where actor = '${U.auditor}'`))[0].n, 0, "the deleted account isn't named");
  await t.d.close();
});

// ---------- notifications and email ----------
test("notifications: once per event, your own only, read and dismiss; preferences respected", async () => {
  const t = await db();
  const s = await school(t);
  const mine = await t.as(U.owner, "select kind, href from public.notifications");
  assert.equal(mine.filter((n) => n.kind === "org.member_joined").length, 5, "the inviter hears once per person who joins");
  assert.ok(mine.every((n) => n.href.startsWith("#/")), "links stay inside Gradify");
  assert.equal((await t.one(U.student, `select count(*)::int as n from public.notifications where user_id <> '${U.student}'`)).n, 0);
  await assert.rejects(t.as(U.student, `insert into public.notifications (user_id, kind, title, dedupe_key) values ('${U.student}', 'x', 'Fake', 'k')`), /permission denied/);
  assert.equal((await t.one(U.owner, "select public.mark_notifications_read(null) as n")).n, 5);
  assert.equal((await t.one(U.owner, "select count(*)::int as n from public.notifications where read_at is null")).n, 0);
  await t.as(U.owner, "delete from public.notifications where kind = 'org.member_joined'");
  assert.equal((await t.one(U.owner, "select count(*)::int as n from public.notifications")).n, 0, "dismissed");
  // switched off: no more of that kind
  await t.as(U.owner, "insert into public.notification_prefs (kind, channel, enabled) values ('org', 'in_app', false)");
  const tok = (await t.one(U.owner, `select public.invite_member('${s.org}', null, 'student', null, 7, 1) as t`)).t;
  await t.as(U.outsider, `select public.accept_invitation('${tok}')`);
  assert.equal((await t.one(U.owner, "select count(*)::int as n from public.notifications")).n, 0, "the owner switched org notifications off");
  await t.d.close();
});

test("email outbox: queued by Gradify only, unreadable to people, sent once, retried with backoff", async () => {
  const t = await db();
  const s = await school(t);
  assert.equal((await t.d.sql("select count(*)::int as n from public.email_outbox where template = 'org_invitation'"))[0].n, 5, "one email per invitation with an address");
  await assert.rejects(t.as(U.owner, "select * from public.email_outbox"), /permission denied/);
  await assert.rejects(t.as(U.owner, "select * from public.claim_email_batch(10)"), /permission denied/, "only the email function claims emails");
  const batch = await t.service("select * from public.claim_email_batch(2)");
  assert.equal(batch.length, 2);
  assert.match(batch[0].to_address, /@example\.test$/);
  assert.ok(batch[0].data.token, "the invitation link is there to send");
  await t.service(`select public.finish_email('${batch[0].id}', true, 'msg_123', null)`);
  const [sent] = await t.d.sql(`select status, data, provider_id from public.email_outbox where id = '${batch[0].id}'`);
  assert.deepEqual([sent.status, sent.data, sent.provider_id], ["sent", {}, "msg_123"], "sent, and the link isn't kept");
  for (let i = 0; i < 5; i++) {
    await t.service(`select public.finish_email('${batch[1].id}', false, null, 'provider down')`);
    await t.d.sql(`update public.email_outbox set send_after = now() where id = '${batch[1].id}' and status = 'queued'`);
    if (i < 4) assert.equal((await t.service("select * from public.claim_email_batch(10)")).some((e) => e.id === batch[1].id), true, `retry ${i + 1}`);
  }
  assert.equal((await t.d.sql(`select status from public.email_outbox where id = '${batch[1].id}'`))[0].status, "failed", "given up after five attempts");
  await t.d.close();
});

// ---------- data arrangements and teachers ----------
test("data arrangements per purpose start undecided; only an owner records them; Gradify confirms separately", async () => {
  const t = await db();
  const s = await school(t);
  const rows = await t.as(U.teacher, `select purpose, arrangement from public.org_data_policies where org_id = '${s.org}'`);
  assert.equal(rows.length, 6);
  assert.ok(rows.every((r) => r.arrangement === "undecided"), "nothing is assumed (D7)");
  await assert.rejects(t.as(U.admin, `select public.set_data_policy('${s.org}', 'classroom_records', 'organisation_controller', 365, 'DPA-1')`), /Only an owner/);
  await t.d.sql(`update public.org_data_policies set confirmed_by_gradify_at = now() where org_id = '${s.org}' and purpose = 'classroom_records'`);
  await t.as(U.owner, `select public.set_data_policy('${s.org}', 'classroom_records', 'organisation_controller', 365, 'DPA-1')`);
  const [r] = await t.d.sql(`select arrangement, retention_days, confirmed_by_gradify_at from public.org_data_policies where org_id = '${s.org}' and purpose = 'classroom_records'`);
  assert.deepEqual([r.arrangement, r.retention_days, r.confirmed_by_gradify_at], ["organisation_controller", 365, null], "a change needs Gradify to confirm it again");
  await t.d.close();
});

test("independent teachers: the same account switches teaching on, as an adult", async () => {
  const t = await db();
  await assert.rejects(t.as(U.outsider, "insert into public.teacher_profiles (display_name, confirmed_adult) values ('Ms Hill', false)"));
  await t.as(U.outsider, "insert into public.teacher_profiles (display_name, subjects, confirmed_adult) values ('Ms Hill', '{Biology}', true)");
  assert.equal((await t.one(U.outsider, "select public.my_contexts() as c")).c.teacher, true);
  assert.equal((await t.one(U.student, "select count(*)::int as n from public.teacher_profiles")).n, 0, "your teacher profile is yours");
  await t.d.close();
});

// ---------- sponsored access and AI allowances ----------
test("sponsored seats and shared AI allowances: within limits, members only, and not yet changing anyone's plan", async () => {
  const t = await db();
  const s = await school(t);
  const sub = (await t.d.sql(`insert into public.org_subscriptions (org_id, plan, seats) values ('${s.org}', 'plus', 2) returning id`))[0].id;
  await assert.rejects(t.as(U.owner, `insert into public.org_subscriptions (org_id, plan, seats) values ('${s.org}', 'pro', 1000)`), /permission denied/, "organisations don't grant themselves licences");
  await assert.rejects(t.as(U.teacher, `select public.assign_seat('${sub}', '${U.student}')`), /can't manage/);
  assert.equal((await t.one(U.admin, `select public.assign_seat('${sub}', '${U.student}') as r`)).r.ok, true);
  assert.equal((await t.one(U.admin, `select public.assign_seat('${sub}', '${U.teacher}') as r`)).r.ok, true);
  assert.equal((await t.one(U.admin, `select public.assign_seat('${sub}', '${U.head}') as r`)).r.reason, "no_seats");
  await assert.rejects(t.as(U.admin, `select public.assign_seat('${sub}', '${U.outsider}')`), /active members/);
  const plans = async (who) => (await t.service(`select public.plan_of('${U[who]}') as p, public.sponsored_plan_of('${U[who]}') as s, public.effective_plan_of('${U[who]}') as e`))[0];
  assert.deepEqual(await plans("student"), { p: "free", s: "plus", e: "plus" });
  assert.deepEqual(await plans("head"), { p: "free", s: null, e: "free" }, "no seat: the same as their own plan");
  assert.equal((await t.one(U.student, "select public.my_entitlements() as e")).e.wired, false, "and nothing uses it yet: plan_of() is unchanged");
  await assert.rejects(t.as(U.student, `select public.sponsored_plan_of('${U.teacher}')`), /permission denied/, "nobody looks up another person's plan");
  // a suspended member's seat gives nothing; revoking frees it
  await t.as(U.head, `select public.set_member_status('${await memberId(t, s.org, "student")}', 'suspended')`);
  assert.equal((await plans("student")).s, null);
  await t.as(U.admin, `select public.revoke_seat('${sub}', '${U.student}')`);
  assert.equal((await t.one(U.admin, `select public.assign_seat('${sub}', '${U.head}') as r`)).r.ok, true, "the freed seat can go to someone else");
  // AI: Gradify sets the organisation's pool; it shares it out between units, never more than it has
  await assert.rejects(t.as(U.admin, `select public.allocate_ai_pool('${s.org}', '${s.science}', 'tutor', 100, null)`), /no AI allowance/);
  await t.d.sql(`insert into public.org_ai_pools (org_id, feature, monthly_allowance) values ('${s.org}', 'tutor', 1000)`);
  await t.as(U.admin, `select public.allocate_ai_pool('${s.org}', '${s.science}', 'tutor', 600, 20)`);
  await assert.rejects(t.as(U.admin, `select public.allocate_ai_pool('${s.org}', '${s.bio}', 'tutor', 500, null)`), /more than is left/);
  await t.as(U.admin, `select public.allocate_ai_pool('${s.org}', '${s.science}', 'tutor', 500, 20)`);
  await t.as(U.admin, `select public.allocate_ai_pool('${s.org}', '${s.bio}', 'tutor', 500, null)`);
  const ent = (await t.one(U.auditor, `select public.org_entitlements('${s.org}') as e`)).e;
  assert.equal(ent.subscriptions[0].used, 2);
  assert.equal(ent.ai_pools.length, 3);
  await assert.rejects(t.as(U.teacher, `select public.org_entitlements('${s.org}')`), /can't see/);
  await assert.rejects(t.as(U.other, `select public.org_entitlements('${s.org}')`), /can't see/);
  await t.d.close();
});
