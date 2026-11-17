// Free, Plus and Pro in the database (supabase/migrations/20261117120000_plus_plan.sql), against a real PostgreSQL:
// which plan a subscription gives, the switch that keeps everything free until Plus goes on sale, and Free's one
// active device (data kept and readable everywhere; changes only from the active device).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { tempDb } from "../scripts/pg-rehearsal.mjs";
import { planOf } from "../kit/data/billing.js";

const FREE = "00000000-0000-4000-8000-0000000000f1", PLUS = "00000000-0000-4000-8000-0000000000f2", PRO = "00000000-0000-4000-8000-0000000000f3";
const LAPTOP = "device-laptop-0001", PHONE = "device-phone-00002";

async function db() {
  const d = await tempDb();
  // Supabase's default privileges, set before any migration (so a migration's own revokes still apply): the API roles
  // get table and function privileges, and row-level security decides which rows
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
    alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
    alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;`);
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  await d.sql(`insert into auth.users (id, email) values ('${FREE}', 'f@x'), ('${PLUS}', 'p@x'), ('${PRO}', 'q@x')`);
  const end = new Date(Date.now() + 20 * 86400_000).toISOString();
  await d.sql(`insert into public.subscriptions (user_id, status, current_period_end, plan) values ('${PLUS}', 'active', '${end}', 'plus'), ('${PRO}', 'active', '${end}', 'pro')`);
  // as a signed-in learner, on a device (the app sends x-gradify-device; PostgREST passes headers as request.headers)
  const as = (uid, device, q) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${uid}'; set request.headers = '${JSON.stringify(device ? { "x-gradify-device": device } : {})}'; ${q};`)
    .finally(() => d.sql("reset role; reset request.jwt.claim.sub; reset request.headers;"));
  const enforce = (on) => d.sql(`update public.billing_settings set plans_enforced = ${on}`);
  return { d, as, enforce };
}
const addDoc = (title) => `insert into public.documents (title) values ('${title}')`;

test("plans: a subscription's plan, a paid-up row from before plans is Pro, and is_pro() means Pro only", async () => {
  const { d } = await db();
  const plan = async (u) => (await d.sql(`select public.plan_of('${u}') as p`))[0].p;
  assert.equal(await plan(FREE), "free"); assert.equal(await plan(PLUS), "plus"); assert.equal(await plan(PRO), "pro");
  await d.sql(`update public.subscriptions set plan = null where user_id = '${PRO}'`);
  assert.equal(await plan(PRO), "pro", "a subscription from before plans existed was Gradify Pro");
  assert.equal((await d.sql(`select public.is_pro('${PLUS}') as p`))[0].p, false, "Plus doesn't get Pro's Gradify AI allowances");
  await d.sql(`update public.subscriptions set status = 'canceled' where user_id = '${PLUS}'`);
  assert.equal(await plan(PLUS), "free");
  // the browser's planOf() reads the same row the same way
  assert.equal(planOf({ status: "active", plan: "plus" }), "plus");
  assert.equal(planOf({ status: "active", plan: null }), "pro");
  assert.equal(planOf({ status: "canceled", plan: "plus" }), "free");
  await d.close();
});

test("while plans aren't enforced, nothing changes: a Free learner writes from any device", async () => {
  const { as } = await db();
  await as(FREE, LAPTOP, addDoc("one"));
  await as(FREE, PHONE, addDoc("two"));
  await as(FREE, null, addDoc("no device header, like an older app"));
  const [{ r }] = await as(FREE, PHONE, `select public.use_device('${PHONE}') as r`);
  assert.equal(r.active, true); assert.equal(r.anyDevice, true); assert.equal(r.enforced, false);
});

test("enforced: Free studies on one device, keeps everything readable everywhere, and can move once a week", async () => {
  const { d, as, enforce } = await db();
  await as(FREE, LAPTOP, addDoc("before plans"));
  await enforce(true);
  // the first device to open the app becomes the active one
  const [{ r }] = await as(FREE, LAPTOP, `select public.use_device('${LAPTOP}') as r`);
  assert.equal(r.active, true); assert.equal(r.anyDevice, false); assert.equal(r.plan, "free");
  await as(FREE, LAPTOP, addDoc("on the laptop"));
  // the phone: everything readable, nothing changed
  const [{ s }] = await as(FREE, PHONE, `select public.use_device('${PHONE}') as s`);
  assert.equal(s.active, false);
  assert.equal((await as(FREE, PHONE, "select count(*)::int as n from public.documents"))[0].n, 2, "nothing is lost or hidden");
  await assert.rejects(as(FREE, PHONE, addDoc("on the phone")), /row-level security/);
  await assert.rejects(as(FREE, null, addDoc("no header")), /row-level security/);
  await as(FREE, PHONE, "update public.documents set title = 'renamed'");
  await as(FREE, PHONE, "delete from public.documents");
  assert.equal((await d.sql("select count(*)::int as n from public.documents where title <> 'renamed'"))[0].n, 2, "the phone's update and delete changed nothing");
  // moving the active device: refused within 7 days of the last move, then allowed
  const [{ t }] = await as(FREE, PHONE, `select public.switch_device('${PHONE}') as t`);
  assert.equal(t.reason, "too_soon"); assert.ok(t.canSwitchAt);
  await d.sql(`update public.study_devices set since = now() - interval '8 days' where user_id = '${FREE}'`);
  const [{ u }] = await as(FREE, PHONE, `select public.switch_device('${PHONE}') as u`);
  assert.equal(u.active, true);
  await as(FREE, PHONE, addDoc("on the phone now"));
  await assert.rejects(as(FREE, LAPTOP, addDoc("back on the laptop")), /row-level security/);
  await d.close();
});

test("enforced: Plus and Pro write from every device", async () => {
  const { d, as, enforce } = await db();
  await enforce(true);
  for (const u of [PLUS, PRO]) {
    const [{ r }] = await as(u, PHONE, `select public.use_device('${PHONE}') as r`);
    assert.equal(r.anyDevice, true);
    await as(u, LAPTOP, addDoc("laptop")); await as(u, PHONE, addDoc("phone")); await as(u, null, addDoc("anywhere"));
  }
  assert.equal((await d.sql("select count(*)::int as n from public.study_devices"))[0].n, 0, "paid learners don't get a device lock");
  await d.close();
});

test("learners can't get round it or see anyone else's plan", async () => {
  const { as, enforce } = await db();
  await enforce(true);
  await as(FREE, LAPTOP, `select public.use_device('${LAPTOP}')`);
  await assert.rejects(as(FREE, PHONE, `insert into public.study_devices (user_id, device_id) values ('${FREE}', '${PHONE}')`), /permission denied/);
  await assert.rejects(as(FREE, PHONE, `update public.study_devices set device_id = '${PHONE}'`), /permission denied/);
  await assert.rejects(as(FREE, PHONE, "update public.billing_settings set plans_enforced = false"), /permission denied/);
  await assert.rejects(as(FREE, PHONE, `select public.plan_of('${PRO}')`), /permission denied/);
  await assert.rejects(as(FREE, PHONE, `select public.plus_allowed_for('${PRO}')`), /permission denied/);
  await assert.rejects(as(FREE, PHONE, `insert into public.subscriptions (user_id, status, plan) values ('${FREE}', 'active', 'plus')`), /permission denied/);
  const [{ m }] = await as(FREE, PHONE, "select public.my_plan() as m");
  assert.deepEqual(m, { plan: "free", enforced: true, plus: false });
  assert.equal((await as(FREE, PHONE, "select count(*)::int as n from public.study_devices"))[0].n, 1, "a learner sees their own device row only");
  assert.equal((await as(PLUS, PHONE, "select count(*)::int as n from public.study_devices"))[0].n, 0);
});

// ---------- the app's side (kit/data/plan.js) ----------
import { PLAN_PRICES, PLUS_ON_SALE } from "../kit/data/billing.js";
import { access, readOnly, plusPanelHtml, pounds, PLUS_FEATURES } from "../kit/data/plan.js";

test("until Plus is on sale, the app locks nothing for anyone", async () => {
  assert.equal(PLUS_ON_SALE, false);
  const a = await access({ mode: "local" });
  assert.equal(a.enforced, false);
  for (const f of Object.keys(PLUS_FEATURES)) assert.equal(a.has(f), true, f);
});

test("a second device for Free reads normally, refuses study changes clearly, and still saves settings", async () => {
  const calls = [];
  const store = { mode: "cloud", listCards: async () => [{ id: 1 }], addCards: async () => calls.push("add"), saveProfile: async () => calls.push("profile"), logActivity: async () => calls.push("log"), moveGoals: async () => calls.push("move") };
  const ro = readOnly(store, "Studying happens on your other device.");
  assert.deepEqual(await ro.listCards(), [{ id: 1 }]);
  await assert.rejects(ro.addCards([]), /other device/);
  await assert.rejects(ro.moveGoals(), /other device/);
  assert.equal(await ro.logActivity({}), null, "logging is skipped quietly, not an error on every screen");
  await ro.saveProfile({});
  assert.deepEqual(calls, ["profile"]);
  assert.equal(ro.mode, "cloud");
});

test("prices read the same everywhere: code, the Plus panel, and the terms", async () => {
  assert.equal(pounds(1000), "£10"); assert.equal(pounds(1050), "£10.50");
  assert.match(plusPanelHtml("exams"), /£10 a month/);
  const terms = await readFile(new URL("../terms.html", import.meta.url), "utf8");
  assert.ok(terms.includes(`${pounds(PLAN_PRICES.plus.month)} a month`) && terms.includes(`${pounds(PLAN_PRICES.pro.month)} a month`), "terms.html states the plans' prices");
  for (const page of ["../index.html", "../pricing.html", "../terms.html"]) {
    const html = await readFile(new URL(page, import.meta.url), "utf8");
    assert.ok(!/nothing that's free today will move/i.test(html), `${page} no longer promises nothing moves to a paid plan`);
  }
});
