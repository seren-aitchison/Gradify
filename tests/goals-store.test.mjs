// Goals in the stores (kit/data/store.js): the account store's overwrite guard across two devices, and moving a
// device's goals into an account without duplicating or overwriting. Runs against a small in-memory stand-in for the
// Supabase client (the table's own rules are tested against the real migration in tests/goals.test.mjs).
import { test } from "node:test";
import assert from "node:assert/strict";

// enough of supabase-js for the goals methods: from().select/insert/update/delete/upsert/eq/not/order/single, auth
function fakeSupabase(userId = "u1") {
  const tables = { goals: [], profiles: [{ id: userId }] };
  // like the table's goals_touch trigger: the database sets updated_at, always later than before
  let clock = Date.now(); const stamp = () => new Date(++clock).toISOString();
  function builder(table) {
    let op = "select", payload = null, opts = {}, filters = [], single = false;
    const b = {
      select() { return b; }, order() { return b; }, single() { single = true; return b; },
      insert(rows) { op = "insert"; payload = [].concat(rows); return b; },
      update(patch) { op = "update"; payload = patch; return b; },
      delete() { op = "delete"; return b; },
      upsert(rows, o = {}) { op = "upsert"; payload = [].concat(rows); opts = o; return b; },
      eq(c, v) { filters.push((r) => r[c] === v); return b; },
      not() { return b; },
      then(res, rej) { return Promise.resolve().then(run).then(res, rej); },
    };
    function run() {
      const rows = tables[table] ||= [], match = (r) => filters.every((f) => f(r));
      let data;
      if (op === "select") data = rows.filter(match).map((r) => ({ ...r }));
      if (op === "insert") {
        for (const r of payload) if (rows.some((x) => x.id === r.id)) return { data: null, error: { code: "23505", message: "duplicate key" } };
        data = payload.map((r) => ({ user_id: userId, created_at: new Date().toISOString(), ...r, updated_at: stamp() })); rows.push(...data);
      }
      if (op === "upsert") { data = []; for (const r of payload) { if (rows.some((x) => x.id === r.id)) { if (!opts.ignoreDuplicates) Object.assign(rows.find((x) => x.id === r.id), r); continue; } const row = { user_id: userId, ...r, updated_at: stamp() }; rows.push(row); data.push(row); } }
      if (op === "update") { data = rows.filter(match); data.forEach((r) => Object.assign(r, payload, { updated_at: stamp() })); data = data.map((r) => ({ ...r })); }
      if (op === "delete") { tables[table] = rows.filter((r) => !match(r)); data = []; }
      return { data: single ? data?.[0] ?? null : data, error: null };
    }
    return b;
  }
  return { tables, from: builder, auth: { getUser: async () => ({ data: { user: { id: userId } } }), getSession: async () => ({ data: { session: null } }), onAuthStateChange() {} } };
}

async function stores() {
  globalThis.localStorage ??= { _m: new Map(), getItem(k) { return this._m.get(k) ?? null; }, setItem(k, v) { this._m.set(k, String(v)); }, removeItem(k) { this._m.delete(k); } };
  globalThis.crypto ??= (await import("node:crypto")).webcrypto;
  return import("../kit/data/store.js");
}

test("two devices on one account: the second device's stale edit is refused, nothing is lost", async () => {
  const { CloudStore } = await stores();
  const db = fakeSupabase(), phone = new CloudStore(db), laptop = new CloudStore(db);
  const g = await phone.saveGoal({ title: "Apply for internships", area: "career", target: 3, unit: "applications", manual_value: 0 });
  assert.ok(g.id); assert.equal(db.tables.goals.length, 1);
  const [onLaptop] = await laptop.listGoals();
  await new Promise((r) => setTimeout(r, 5));
  const p2 = await phone.saveGoal({ ...g, manual_value: 1 }, { expect: g.updated_at });
  await assert.rejects(laptop.saveGoal({ ...onLaptop, manual_value: 1 }, { expect: onLaptop.updated_at }), (e) => e.conflict === true);
  assert.equal(db.tables.goals[0].manual_value, 1, "the phone's change stands");
  // after reloading, the laptop's edit goes through
  const [fresh] = await laptop.listGoals();
  await laptop.saveGoal({ ...fresh, manual_value: 2 }, { expect: fresh.updated_at });
  assert.equal(db.tables.goals[0].manual_value, 2);
  assert.equal(p2.manual_value, 1);
});

const GA = "11111111-1111-4111-8111-111111111111", GB = "22222222-2222-4222-8222-222222222222", GC = "33333333-3333-4333-8333-333333333333";
const deviceWith = (goals) => localStorage.setItem("gradify.v1", JSON.stringify({ profile: { xp: 0 }, documents: [], packs: [], cards: [], reviews: [], activity: [], blocks: [], goals }));

test("moving goals at sign-in: a mixture of device and account goals, no duplicates, account goals never overwritten", async () => {
  const { CloudStore, LocalStore } = await stores();
  deviceWith([{ id: GA, title: "Device copy of an account goal" }, { id: GB, title: "Made on this device", target: 5, manual_value: 2 }, { id: GC, title: "Also made here" }]);
  const db = fakeSupabase(), cloud = new CloudStore(db), local = new LocalStore();
  db.tables.goals.push({ id: GA, user_id: "u1", title: "Account goal" });
  assert.deepEqual(await cloud.moveGoals(local), { moved: 2, already: 1 });
  assert.deepEqual(db.tables.goals.map((g) => g.title).sort(), ["Account goal", "Also made here", "Made on this device"]);
  assert.equal(db.tables.goals.find((g) => g.id === GB).manual_value, 2, "progress kept");
  assert.equal((await local.listGoals()).length, 0, "the device copies go once the account has them");
  assert.deepEqual(await cloud.moveGoals(local), { moved: 0, already: 0 }, "a second visit does nothing");
});

test("an interrupted move loses nothing and finishes on the next visit", async () => {
  const { CloudStore, LocalStore } = await stores();
  // 1. the connection drops before the account saves anything: the device keeps every goal
  deviceWith([{ id: GB, title: "Made on this device" }, { id: GC, title: "Also made here" }]);
  const db = fakeSupabase(), cloud = new CloudStore(db), local = new LocalStore();
  const realFrom = db.from; let offline = true;
  db.from = (t) => { const b = realFrom(t); if (t === "goals" && offline) { const up = b.upsert; b.upsert = (...a) => { up.apply(b, a); b.then = (res, rej) => Promise.reject(new Error("network down")).then(res, rej); return b; }; } return b; };
  await assert.rejects(cloud.moveGoals(local), /network down/);
  assert.equal(db.tables.goals.length, 0); assert.equal((await local.listGoals()).length, 2, "nothing lost");
  // 2. the account saves, then the page closes before the device copies are removed
  offline = false;
  const realDelete = local.deleteGoal.bind(local); let deletes = 0;
  local.deleteGoal = async (id) => { if (++deletes === 2) throw new Error("tab closed"); return realDelete(id); };
  await assert.rejects(cloud.moveGoals(local), /tab closed/);
  assert.equal(db.tables.goals.length, 2, "the account has both");
  assert.equal((await local.listGoals()).length, 1, "one device copy left over");
  // 3. the next visit finishes: no duplicate in the account, device emptied
  local.deleteGoal = realDelete;
  assert.deepEqual(await cloud.moveGoals(local), { moved: 0, already: 1 });
  assert.equal(db.tables.goals.length, 2); assert.equal((await local.listGoals()).length, 0);
});

test("offline, or before the account can hold goals: nothing moves and nothing is removed", async () => {
  const { CloudStore, LocalStore } = await stores();
  deviceWith([{ id: GC, title: "Keep me" }]);
  const db = fakeSupabase(), cloud = new CloudStore(db), local = new LocalStore();
  db.from = () => { throw new Error('relation "goals" does not exist'); };
  await assert.rejects(cloud.moveGoals(local));
  assert.deepEqual((await local.listGoals()).map((g) => g.title), ["Keep me"]);
});

test("the one-off move of notes at first sign-in leaves device goals alone for the goal move", async () => {
  const { CloudStore, LocalStore } = await stores();
  deviceWith([{ id: GC, title: "Keep me" }]);
  const local = new LocalStore();
  assert.equal(local.hasData(), false, "goals alone don't trigger the notes move");
  const db = fakeSupabase(), cloud = new CloudStore(db);
  await cloud.importLocal(local);
  assert.equal(db.tables.goals.length, 0, "importLocal doesn't touch goals");
});

test("the account store never sends updated_at: the database sets it", async () => {
  const { CloudStore } = await stores();
  const db = fakeSupabase(), sent = [], realFrom = db.from;
  db.from = (t) => { const b = realFrom(t); for (const k of ["insert", "update"]) { const f = b[k]; b[k] = (x) => { sent.push(x); return f(x); }; } return b; };
  const cloud = new CloudStore(db);
  const g = await cloud.saveGoal({ title: "Read 10 books", target: 10, manual_value: 0, updated_at: "2020-01-01T00:00:00Z" });
  await cloud.saveGoal({ ...g, manual_value: 1 }, { expect: g.updated_at });
  assert.ok(sent.length === 2 && sent.every((r) => [].concat(r).every((x) => !("updated_at" in x))));
});

test("on this device: a tab that loaded earlier can't overwrite a newer save", async () => {
  const { LocalStore } = await stores();
  localStorage.setItem("gradify.v1", JSON.stringify({ profile: { xp: 0 }, documents: [], packs: [], cards: [], reviews: [], activity: [], blocks: [] }));
  const tab1 = new LocalStore(), tab2 = new LocalStore();
  const g = await tab1.saveGoal({ title: "Read 10 books", target: 10, manual_value: 0 });
  const [seen] = await tab2.listGoals();
  await new Promise((r) => setTimeout(r, 5));
  await tab1.saveGoal({ ...g, manual_value: 1 }, { expect: g.updated_at });
  await assert.rejects(tab2.saveGoal({ ...seen, manual_value: 1 }, { expect: seen.updated_at }), (e) => e.conflict);
  assert.equal((await tab2.listGoals())[0].manual_value, 1);
});
