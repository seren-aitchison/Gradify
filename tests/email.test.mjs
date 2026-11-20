// The EmailService (supabase/functions/_shared/email.js): templates escape what they're given and link only to the
// site; Resend gets the right request with an idempotency key; failures say whether to retry; and the outbox is
// drained through the real database functions (claim_email_batch, finish_email).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { render, emailService, resendProvider, memoryProvider, drainOutbox, TEMPLATES } from "../supabase/functions/_shared/email.js";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const SITE = "https://getgradify.com";

test("templates escape their data, keep links on the site, and every template renders", () => {
  const m = render("org_invitation", { organisation: `<script>alert(1)</script> & Co`, role: "teacher", token: "abc123", expires_days: 7 }, { siteUrl: SITE });
  assert.match(m.subject, /<script>alert\(1\)<\/script> & Co/, "the subject is plain text");
  assert.ok(!m.html.includes("<script>"), "nothing from the data becomes HTML");
  assert.ok(m.html.includes("&lt;script&gt;"));
  assert.match(m.text, /https:\/\/getgradify\.com\/app\.html#\/join\/abc123/);
  assert.match(m.text, /not to your own study/, "says what joining does and doesn't share (D10)");
  assert.ok(!render("org_invitation", { organisation: "A\r\nBcc: x@y.z", role: "student", token: "t" }).subject.includes("\n"), "no header injection through the subject");
  for (const name of Object.keys(TEMPLATES)) assert.ok(render(name, { token: "t", classroom: "C", assignment: "A", programme: "P", organisation: "O" }).html.length > 100, name);
  assert.throws(() => render("nope", {}), /Unknown email template/);
});

test("Resend: the request, an idempotency key, and which failures are worth retrying", async () => {
  const calls = [];
  const fake = (status, body) => async (url, opts) => { calls.push({ url, opts }); return { ok: status < 300, status, json: async () => body }; };
  const mail = emailService({ provider: resendProvider({ apiKey: "re_test", fetch: fake(200, { id: "email_1" }) }), from: "Gradify <hello@getgradify.com>", siteUrl: SITE });
  assert.deepEqual(await mail.send({ to: "a@example.test", template: "org_invitation", data: { organisation: "X", role: "student", token: "t" }, key: "org_invitation:1" }), { ok: true, id: "email_1" });
  const { url, opts } = calls[0], body = JSON.parse(opts.body);
  assert.equal(url, "https://api.resend.com/emails");
  assert.equal(opts.headers.Authorization, "Bearer re_test");
  assert.equal(opts.headers["Idempotency-Key"], "org_invitation:1", "a retry can't send twice");
  assert.deepEqual(body.to, ["a@example.test"]);
  assert.ok(body.html && body.text && body.subject && body.from);
  const busy = emailService({ provider: resendProvider({ apiKey: "k", fetch: fake(429, { message: "slow down" }) }), from: "x@y.z", siteUrl: SITE });
  assert.equal((await busy.send({ to: "a@b.test", template: "org_invitation", data: { token: "t" } })).retry, true);
  const bad = emailService({ provider: resendProvider({ apiKey: "k", fetch: fake(422, { message: "invalid from" }) }), from: "x@y.z", siteUrl: SITE });
  assert.equal((await bad.send({ to: "a@b.test", template: "org_invitation", data: { token: "t" } })).retry, false);
  const down = emailService({ provider: resendProvider({ apiKey: "k", fetch: async () => { throw new Error("ECONNRESET"); } }), from: "x@y.z", siteUrl: SITE });
  assert.equal((await down.send({ to: "a@b.test", template: "org_invitation", data: { token: "t" } })).retry, true);
  assert.equal((await mail.send({ to: "not-an-address", template: "org_invitation", data: {} })).ok, false);
  assert.throws(() => resendProvider({}), /RESEND_API_KEY/);
  assert.throws(() => emailService({ provider: memoryProvider() }), /GRADIFY_EMAIL_FROM/);
});

test("the outbox, end to end: an invitation queued by the database is sent once, and its link isn't kept", async () => {
  const d = await tempDb();
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
    alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;`);
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  const OWNER = "00000000-0000-4000-8000-000000000201";
  await d.sql(`insert into auth.users (id, email) values ('${OWNER}', 'owner@example.test')`);
  const as = (q) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${OWNER}'; set request.headers = '{}'; ${q};`).finally(() => d.sql("reset role; reset request.jwt.claim.sub; reset request.headers;"));
  const org = (await as("select public.create_organisation('Northfield College', 'fe_college') as id"))[0].id;
  await as(`select public.invite_member('${org}', null, 'teacher', 'new.teacher@example.test', 7, 1)`);
  // the function's database client: rpc as the service role
  const rpc = async (name, args) => {
    const vals = Object.values(args).map((v) => (v == null ? "null" : typeof v === "boolean" || typeof v === "number" ? String(v) : `'${String(v).replace(/'/g, "''")}'`));
    try { return { data: await d.sql(`set role service_role; select * from public.${name}(${vals.join(", ")}); `).finally(() => d.sql("reset role;")) }; }
    catch (error) { return { error }; }
  };
  const provider = memoryProvider();
  const mail = emailService({ provider, from: "Gradify <hello@getgradify.com>", siteUrl: SITE });
  assert.deepEqual(await drainOutbox({ rpc, mail }), { sent: 1, failed: 0 });
  assert.equal(provider.sent.length, 1);
  assert.equal(provider.sent[0].to, "new.teacher@example.test");
  assert.match(provider.sent[0].subject, /Northfield College/);
  assert.match(provider.sent[0].text, /#\/join\/[0-9a-f]{64}/);
  assert.deepEqual(await drainOutbox({ rpc, mail }), { sent: 0, failed: 0 }, "nothing is sent twice");
  const [row] = await d.sql("select status, data from public.email_outbox");
  assert.deepEqual([row.status, row.data], ["sent", {}], "the invitation link is cleared once sent");
  await d.close();
});
