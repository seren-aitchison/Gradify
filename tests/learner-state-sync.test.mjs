// The learner record's account sync (kit/data/learner-state.js syncNow), against a stand-in for the account that
// behaves like the learner_state table (the newer change kept, as its trigger does): another device's changes come
// in, a sync that fails partway loses nothing and finishes next time, history over 600 lines, an inactive Free
// device, and an account without the table yet.
import { test } from "node:test";
import assert from "node:assert/strict";

const mem = new Map();
globalThis.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
const LS = await import("../kit/data/learner-state.js");

// the account: rows keyed by kind|key; an older change than what's stored is ignored, as the trigger does
function account({ rows = [], failOnUpsert = new Set(), error = null } = {}) {
  const table = new Map(rows.map((r) => [`${r.kind}|${r.key}`, { ...r, updated_at: r.updated_at || new Date(Date.now() - 1000).toISOString() }]));
  let upserts = 0;
  const db = {
    from: () => ({
      select: () => { const q = { gt: () => q, order: () => q, limit: () => q, then: (ok) => ok(error ? { data: null, error } : { data: [...table.values()].sort((a, b) => a.updated_at.localeCompare(b.updated_at)), error: null }) }; return q; },
      upsert: async (list) => {
        upserts++;
        if (error) return { error };
        if (failOnUpsert.has(upserts)) return { error: { message: "network went away" } };
        for (const r of list) { const k = `${r.kind}|${r.key}`, was = table.get(k); if (!was || r.t > was.t || (r.t === was.t && r.dev > was.dev)) table.set(k, { ...r, updated_at: new Date().toISOString() }); }
        return { error: null };
      },
    }),
  };
  return { store: { mode: "cloud", db, user: async () => ({ id: "u1" }) }, table, upserts: () => upserts };
}
const fresh = () => { mem.clear(); LS.reload(); };

test("another device's changes come in, and this device's go up", async () => {
  fresh();
  LS.put("pin", "/mine", { href: "/mine", title: "Mine" });
  const a = account({ rows: [{ kind: "pin", key: "/theirs", value: { href: "/theirs", title: "From the phone" }, t: Date.now() + 10, dev: "phone", del: false }] });
  const s = await LS.attachAccount(a.store);
  assert.equal(s.state, "saved");
  assert.deepEqual(LS.list("pin").map((e) => e.key).sort(), ["/mine", "/theirs"]);
  assert.ok(a.table.has("pin|/mine"));
});

test("a sync that fails partway loses nothing, says so, and finishes next time", async () => {
  fresh();
  LS.batch((b) => { for (let i = 0; i < 450; i++) b.put("link", `k${i}`, { a: { rid: `x:${i}` }, b: { rid: "y:1" }, by: "you" }); });
  const a = account({ failOnUpsert: new Set([2]) });                     // the second batch of 200 fails
  const s = await LS.attachAccount(a.store);
  assert.equal(s.state, "failed");
  assert.ok(s.waiting > 0);
  assert.equal(LS.list("link").length, 450);                             // everything is still on the device
  const again = await LS.syncNow();                                       // the retry sends it all again; the account keeps one of each
  assert.equal(again.state, "saved");
  assert.equal([...a.table.keys()].filter((k) => k.startsWith("link|")).length, 450);
});

test("history over 600 lines: the device keeps the newest 600; the account keeps what reached it", async () => {
  fresh();
  const now = Date.now();
  LS.batch((b) => { for (let i = 0; i < 700; i++) b.put("activity", `h${i}`, { id: `h${i}`, act: "viewed", href: `/p${i}`, title: `Page ${i}`, t: now + i }); });
  assert.equal(LS.list("activity").length, 600);
  assert.equal(LS.list("activity")[0].key, "h699");                       // the newest stay
  const a = account({ rows: Array.from({ length: 50 }, (_, i) => ({ kind: "activity", key: `old${i}`, value: { id: `old${i}`, act: "viewed", href: `/o${i}`, title: `Older ${i}` }, t: now - 1e6 + i, dev: "laptop", del: false })) });
  await LS.attachAccount(a.store);
  // what was in the account stays there; nothing this device pruned is sent as a deletion
  assert.equal([...a.table.values()].filter((r) => r.kind === "activity" && r.del).length, 0);
  assert.equal([...a.table.keys()].filter((k) => k.startsWith("activity|old")).length, 50);
});

test("an inactive device on Free keeps its copy and stops asking the account", async () => {
  fresh();
  LS.put("pin", "/here", { href: "/here", title: "Here" });
  const a = account({ error: { code: "42501", message: 'new row violates row-level security policy for table "learner_state"' } });
  const s = await LS.attachAccount(a.store);
  assert.equal(s.state, "local");
  assert.match(s.note, /other device is the one that saves/);
  const n = a.upserts(); await LS.syncNow();
  assert.equal(a.upserts(), n);                                           // no retrying
  assert.equal(LS.list("pin").length, 1);
});

test("an account without the table yet: the device's copy is the record, and nothing is lost", async () => {
  fresh();
  LS.put("pin", "/x", { href: "/x", title: "X" });
  const a = account({ error: { code: "42P01", message: 'relation "public.learner_state" does not exist' } });
  const s = await LS.attachAccount(a.store);
  assert.equal(s.state, "local");
  assert.match(s.note, /isn't switched on yet/);
  assert.equal(LS.get("pin", "/x").title, "X");
});
