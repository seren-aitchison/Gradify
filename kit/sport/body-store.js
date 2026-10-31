// Where Body Intelligence data lives: workouts, soreness check-ins and fitness tests.
// Same two-store pattern as kit/data/store.js:
//  - this browser (localStorage) when signed out or when Supabase isn't configured
//  - the user's Gradify account (Supabase, owner-only row-level security) when signed in
// Saving a workout or a test also logs activity and XP through the shared store, so Sport
// progress counts in the same personal development system as Learn.
import { LocalStore, CloudStore } from "../data/store.js";

const KEY = "gradify.body.v1";
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`);
const now = () => new Date().toISOString();
const byDate = (a, b) => (b.date || b.at).localeCompare(a.date || a.at);
const SITE = "SportGradify";
export const XP = { workout: 15, test: 10, checkin: 3 };

class LocalBody {
  mode = "local";
  constructor() {
    try { this.mem = JSON.parse(localStorage.getItem(KEY) || "null"); } catch { this.mem = null; }
    this.mem ||= { workouts: [], checkins: [], tests: [] };
    this.shared = new LocalStore();
  }
  save() { try { localStorage.setItem(KEY, JSON.stringify(this.mem)); } catch { /* storage blocked: data lasts this visit */ } }
  async listWorkouts() { return [...this.mem.workouts].sort(byDate); }
  async saveWorkout(w) {
    const isNew = !w.id; const row = { ...w, id: w.id || uid(), created_at: w.created_at || now() };
    this.mem.workouts = this.mem.workouts.filter((x) => x.id !== row.id).concat(row); this.save();
    if (isNew) await this.shared.logActivity({ site: SITE, kind: "workout", xp: XP.workout, detail: { sets: row.sets.length } });
    return row;
  }
  async deleteWorkout(id) { this.mem.workouts = this.mem.workouts.filter((x) => x.id !== id); this.save(); }
  async listCheckins() { return [...this.mem.checkins].sort(byDate); }
  async saveCheckin(c) { const row = { id: uid(), at: now(), ...c }; this.mem.checkins.push(row); this.save(); await this.shared.logActivity({ site: SITE, kind: "body_checkin", xp: XP.checkin }); return row; }
  async listTests() { return [...this.mem.tests].sort(byDate); }
  async saveTest(t) { const row = { id: uid(), created_at: now(), ...t }; this.mem.tests.push(row); this.save(); await this.shared.logActivity({ site: SITE, kind: "fitness_test", xp: XP.test, detail: { test: t.test } }); return row; }
  async deleteTest(id) { this.mem.tests = this.mem.tests.filter((x) => x.id !== id); this.save(); }
  async exportAll() { return JSON.parse(JSON.stringify(this.mem)); }
  hasData() { return this.mem.workouts.length + this.mem.checkins.length + this.mem.tests.length > 0; }
  clear() { this.mem = { workouts: [], checkins: [], tests: [] }; this.save(); }
}

class CloudBody {
  mode = "cloud";
  constructor(shared) { this.shared = shared; this.db = shared.db; }
  async q(p) { const { data, error } = await p; if (error) throw error; return data; }
  async listWorkouts() { return this.q(this.db.from("workouts").select("id,date,name,sets,note,created_at").order("date", { ascending: false })); }
  async saveWorkout(w) {
    const row = { date: w.date, name: w.name || null, sets: w.sets, note: w.note || null };
    if (w.id) return this.q(this.db.from("workouts").update(row).eq("id", w.id).select().single());
    const saved = await this.q(this.db.from("workouts").insert(row).select().single());
    await this.shared.logActivity({ site: SITE, kind: "workout", xp: XP.workout, detail: { sets: w.sets.length } });
    return saved;
  }
  async deleteWorkout(id) { await this.q(this.db.from("workouts").delete().eq("id", id)); }
  async listCheckins() { return this.q(this.db.from("body_checkins").select("id,at,soreness,fatigue,note").order("at", { ascending: false }).limit(200)); }
  async saveCheckin(c) { const row = await this.q(this.db.from("body_checkins").insert({ soreness: c.soreness || {}, fatigue: c.fatigue ?? null, note: c.note || null, ...(c.at ? { at: c.at } : {}) }).select().single()); await this.shared.logActivity({ site: SITE, kind: "body_checkin", xp: XP.checkin }); return row; }
  async listTests() { return this.q(this.db.from("fitness_tests").select("id,date,test,value,note").order("date", { ascending: false })); }
  async saveTest(t) { const row = await this.q(this.db.from("fitness_tests").insert({ date: t.date, test: t.test, value: t.value, note: t.note || null }).select().single()); await this.shared.logActivity({ site: SITE, kind: "fitness_test", xp: XP.test, detail: { test: t.test } }); return row; }
  async deleteTest(id) { await this.q(this.db.from("fitness_tests").delete().eq("id", id)); }
  async exportAll() { return { workouts: await this.listWorkouts(), checkins: await this.listCheckins(), tests: await this.listTests() }; }
  // after first sign-in: move this browser's body data into the account (no XP for imported rows)
  async importLocal(local) {
    const m = await local.exportAll();
    if (m.workouts.length) await this.q(this.db.from("workouts").insert(m.workouts.map((w) => ({ date: w.date, name: w.name || null, sets: w.sets, note: w.note || null }))));
    if (m.checkins.length) await this.q(this.db.from("body_checkins").insert(m.checkins.map((c) => ({ at: c.at, soreness: c.soreness || {}, fatigue: c.fatigue ?? null, note: c.note || null }))));
    if (m.tests.length) await this.q(this.db.from("fitness_tests").insert(m.tests.map((t) => ({ date: t.date, test: t.test, value: t.value, note: t.note || null }))));
    local.clear();
  }
}

// the right store for this visitor, plus who they are
export async function openBodyStore() {
  const local = new LocalBody();
  let cloud = null, user = null;
  try { cloud = await CloudStore.create(); user = cloud ? await cloud.user() : null; } catch { user = null; }
  if (!user) return { store: local, user: null, cloud };
  const store = new CloudBody(cloud);
  if (local.hasData()) { try { await store.importLocal(local); } catch (e) { console.warn("Body data import failed; it stays in this browser.", e); return { store: local, user, cloud, importError: e }; } }
  return { store, user, cloud };
}
