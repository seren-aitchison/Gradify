// Launch lists (kit/data/waitlist.js): one insert-only row per email and list, no account, no payment.
import { test } from "node:test";
import assert from "node:assert/strict";
import { joinWaitlist, validEmail, PRO_LIST } from "../kit/data/waitlist.js";

const fake = (status) => { const calls = []; return { calls, fetch: async (url, init) => { calls.push({ url, init }); return { ok: status < 300, status }; } }; };

test("joining the Gradify Pro list sends one insert with the email and the list name, and nothing else", async () => {
  const f = fake(201);
  const msg = await joinWaitlist("  learner@example.com ", PRO_LIST, { fetch: f.fetch, url: "https://p.supabase.co", key: "pk" });
  assert.match(msg, /when Gradify Pro opens/);
  assert.equal(f.calls.length, 1);
  assert.equal(f.calls[0].url, "https://p.supabase.co/rest/v1/waitlist");
  assert.equal(f.calls[0].init.method, "POST");
  assert.deepEqual(JSON.parse(f.calls[0].init.body), { email: "learner@example.com", site: "Gradify Pro" });
  assert.match(f.calls[0].init.headers.Prefer, /return=minimal/, "nothing is read back");
  assert.match(f.calls[0].init.headers.Prefer, /ignore-duplicates/);
});

test("a duplicate is fine, a server error is reported, and a bad address never leaves the browser", async () => {
  assert.match(await joinWaitlist("a@b.co", "LawGradify", { fetch: fake(409).fetch, url: "u", key: "k" }), /LawGradify launches/);
  await assert.rejects(joinWaitlist("a@b.co", PRO_LIST, { fetch: fake(500).fetch, url: "u", key: "k" }), /500/);
  const f = fake(201);
  for (const bad of ["", "nope", "a@b", "a b@c.d", null]) await assert.rejects(joinWaitlist(bad, PRO_LIST, { fetch: f.fetch, url: "u", key: "k" }), /valid email/);
  assert.equal(f.calls.length, 0);
  assert.equal(validEmail("x@y.zz"), true);
});

test("addresses are stored lower-case, so capitals can't make a second entry; over-long ones are refused", async () => {
  const f = fake(201);
  await joinWaitlist("Learner@Example.COM", PRO_LIST, { fetch: f.fetch, url: "u", key: "k" });
  assert.equal(JSON.parse(f.calls[0].init.body).email, "learner@example.com");
  await assert.rejects(joinWaitlist(`${"a".repeat(250)}@b.co`, PRO_LIST, { fetch: f.fetch, url: "u", key: "k" }), /valid email/);
});

test("the real table: a visitor can join a list, can't read any list back, and a repeat is refused by the database", async () => {
  const { readdir, readFile } = await import("node:fs/promises");
  const { tempDb } = await import("../scripts/pg-rehearsal.mjs");
  const d = await tempDb();
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((x) => x.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  await d.sql("grant usage on schema public to anon, authenticated; grant all on all tables in schema public to anon, authenticated; grant all on all sequences in schema public to anon, authenticated;");
  const anon = (q) => d.sql(`set role anon; ${q}; `).finally(() => d.sql("reset role;"));
  await anon("insert into public.waitlist (email, site) values ('learner@example.com', 'Gradify Pro')");
  await anon("insert into public.waitlist (email, site) values ('learner@example.com', 'LawGradify')");   // another list: allowed
  assert.equal((await anon("select * from public.waitlist")).length, 0, "nothing can be read back");
  await assert.rejects(anon("insert into public.waitlist (email, site) values ('learner@example.com', 'Gradify Pro')"), /duplicate key|unique/);
  await assert.rejects(anon("insert into public.waitlist (email, site) values ('not-an-email', 'Gradify Pro')"), /check constraint/);
  assert.equal((await anon("update public.waitlist set email = 'x@y.zz' returning id")).length, 0, "no changes");
  assert.equal((await anon("delete from public.waitlist returning id")).length, 0, "no deletes");
  const rows = await d.sql("select email, site from public.waitlist order by site");
  assert.deepEqual(rows.map((r) => r.site), ["Gradify Pro", "LawGradify"]);
  await d.close();
});
