// Where the learner's data lives. Two stores with the same async API:
//  - LocalStore: this browser only (works with no setup; the default until Supabase is configured)
//  - CloudStore: their Gradify account in Supabase, protected by row-level security
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../../gradify.config.js";

const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`);
const now = () => new Date().toISOString();
export const cloudConfigured = () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// ---------- This device ----------
const KEY = "gradify.v1";
const EMPTY = () => ({ profile: { xp: 0, daily_minutes: 20, level: "undergraduate" }, documents: [], packs: [], cards: [], reviews: [], activity: [], blocks: [] });

export class LocalStore {
  mode = "local";
  constructor() {
    this.mem = null;
    try { this.mem = JSON.parse(localStorage.getItem(KEY) || "null"); } catch { /* storage blocked */ }
    this.mem ||= EMPTY();
    this.persistent = true;
    try { localStorage.setItem(`${KEY}.probe`, "1"); localStorage.removeItem(`${KEY}.probe`); } catch { this.persistent = false; }
  }
  save() { try { localStorage.setItem(KEY, JSON.stringify(this.mem)); } catch { this.persistent = false; } }
  async user() { return null; }
  async getProfile() { return { ...this.mem.profile }; }
  async saveProfile(patch) { const { xp, ...rest } = patch; Object.assign(this.mem.profile, rest, { updated_at: now() }); this.save(); return this.getProfile(); }
  async addDocument(d) { const doc = { id: uid(), created_at: now(), ...d }; this.mem.documents.push(doc); this.save(); return doc; }
  async listDocuments() { return [...this.mem.documents].sort((a, b) => b.created_at.localeCompare(a.created_at)); }
  async getDocument(id) { return { ...this.mem.documents.find((d) => d.id === id) }; }
  async deleteDocument(id) {
    const m = this.mem;
    m.documents = m.documents.filter((d) => d.id !== id);
    const gone = new Set(m.cards.filter((c) => c.document_id === id).map((c) => c.id));
    m.cards = m.cards.filter((c) => !gone.has(c.id));
    m.reviews = m.reviews.filter((r) => !gone.has(r.card_id));
    m.packs = m.packs.filter((p) => p.document_id !== id);
    this.save();
  }
  async addPack(p) { const pack = { id: uid(), created_at: now(), ...p }; this.mem.packs.push(pack); this.save(); return pack; }
  async getPack(documentId) { return this.mem.packs.filter((p) => p.document_id === documentId).at(-1) || null; }
  async addCards(list) {
    const rows = list.map((c) => ({ id: uid(), created_at: now(), updated_at: now(), reps: 0, lapses: 0, ease: 2.5, interval_days: 0, due_at: now(), edited: false, suspended: false, last_rating: null, ...c }));
    this.mem.cards.push(...rows); this.save(); return rows;
  }
  async listCards(filter = {}) { return this.mem.cards.filter((c) => !filter.documentId || c.document_id === filter.documentId).map((c) => ({ ...c })); }
  async updateCard(id, patch) { const c = this.mem.cards.find((x) => x.id === id); Object.assign(c, patch, { updated_at: now() }); this.save(); return { ...c }; }
  async deleteCard(id) { this.mem.cards = this.mem.cards.filter((c) => c.id !== id); this.save(); }
  async addReview(r) { this.mem.reviews.push({ id: this.mem.reviews.length + 1, reviewed_at: now(), ...r }); this.save(); }
  async listReviews(sinceDays = 400) { const t = Date.now() - sinceDays * 864e5; return this.mem.reviews.filter((r) => Date.parse(r.reviewed_at) >= t); }
  async logActivity(a) { const row = { id: this.mem.activity.length + 1, at: now(), site: "Gradify", xp: 0, ...a }; this.mem.activity.push(row); this.mem.profile.xp += row.xp; this.save(); return row; }
  // assessment attempts (kit/assess/attempts.js); kept to the most recent 5,000 on this device
  async logAttempts(list) { for (const a of list) if (!(this.mem.attempts || []).some((x) => x.id === a.id)) await this.logAttempt(a); }
  async logAttempt(a) { (this.mem.attempts ||= []).push(a); if (this.mem.attempts.length > 5000) this.mem.attempts.splice(0, this.mem.attempts.length - 5000); this.save(); return a; }
  async listAttempts(sinceDays = 400) { const t = Date.now() - sinceDays * 864e5; return (this.mem.attempts || []).filter((a) => Date.parse(a.at) >= t); }
  async listActivity(sinceDays = 400) { const t = Date.now() - sinceDays * 864e5; return this.mem.activity.filter((a) => Date.parse(a.at) >= t); }
  async listBlocks(fromDay, toDay) { return this.mem.blocks.filter((b) => b.day >= fromDay && b.day <= toDay); }
  async saveBlock(b) { if (b.id) { Object.assign(this.mem.blocks.find((x) => x.id === b.id), b); } else { b = { id: uid(), created_at: now(), done: false, auto: false, ...b }; this.mem.blocks.push(b); } this.save(); return b; }
  async deleteBlock(id) { this.mem.blocks = this.mem.blocks.filter((b) => b.id !== id); this.save(); }
  // NMC revalidation record (kit/course/revalidation.js)
  async listRevalidation() { return [...(this.mem.revalidation ||= [])]; }
  async saveRevalidation(e) {
    const list = (this.mem.revalidation ||= []);
    const row = { ...e, id: e.id || uid(), updated_at: now(), created_at: e.created_at || now() };
    const i = list.findIndex((x) => x.id === row.id); if (i >= 0) list[i] = row; else list.push(row);
    this.save(); return row;
  }
  async deleteRevalidation(id) { this.mem.revalidation = (this.mem.revalidation || []).filter((x) => x.id !== id); this.save(); }
  async exportAll() { return JSON.parse(JSON.stringify(this.mem)); }
  async wipe() { this.mem = EMPTY(); this.save(); }
  hasData() { return this.mem.documents.length > 0 || this.mem.cards.length > 0; }
}

// ---------- Gradify account (Supabase) ----------
export class CloudStore {
  mode = "cloud";
  constructor(client) { this.db = client; }
  static async create() {
    if (!cloudConfigured() || !window.supabase) return null;
    const store = new CloudStore(window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
    // keep the current sign-in at hand, so a save can be sent while the page is closing (beaconCourseProgress)
    store.db.auth.getSession().then(({ data }) => { store.current = data.session; }).catch(() => {});
    store.db.auth.onAuthStateChange((_e, s) => { store.current = s; });
    return store;
  }
  // The signed-in user, confirmed by the server. If the server rejects the stored access token before the
  // browser thinks it has expired (a wrong device clock, a revoked token), refresh once before treating the
  // learner as signed out, so a valid sign-in isn't lost.
  async user() {
    const first = await this.db.auth.getUser().catch(() => ({ data: {} }));
    if (first.data?.user) return first.data.user;
    const { data } = await this.db.auth.getSession().catch(() => ({ data: {} }));
    if (!data?.session?.refresh_token) return null;
    const refreshed = await this.db.auth.refreshSession().catch(() => ({ data: {} }));
    if (!refreshed.data?.session) return null;
    return (await this.db.auth.getUser().catch(() => ({ data: {} }))).data?.user || null;
  }
  async session() { const { data } = await this.db.auth.getSession(); return data.session; }
  // a new access token from the refresh token, when the old one has expired; null if the sign-in has ended
  async refreshSession() { const { data, error } = await this.db.auth.refreshSession(); return error ? null : data.session; }
  async signInWithEmail(email) {
    const { error } = await this.db.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + location.pathname } });
    if (error) throw error;
  }
  async signInWithGoogle() { const { error } = await this.db.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname } }); if (error) throw error; }
  async signOut() { await this.db.auth.signOut(); }
  onAuth(cb) { this.db.auth.onAuthStateChange((_e, s) => cb(s?.user || null)); }
  async q(p) { const { data, error } = await p; if (error) throw error; return data; }
  async getProfile() { const u = await this.user(); return this.q(this.db.from("profiles").select("*").eq("id", u.id).single()); }
  async saveProfile(patch) { const { xp, id, ...rest } = patch; const u = await this.user(); return this.q(this.db.from("profiles").update({ ...rest, updated_at: now() }).eq("id", u.id).select().single()); }
  async addDocument(d) { return this.q(this.db.from("documents").insert({ title: d.title, site: d.site, file_name: d.file_name, pages: d.pages, text: d.text }).select().single()); }
  async listDocuments() { return this.q(this.db.from("documents").select("id,title,site,file_name,pages,created_at").order("created_at", { ascending: false })); }
  async getDocument(id) { return this.q(this.db.from("documents").select("*").eq("id", id).single()); }
  async deleteDocument(id) { await this.q(this.db.from("documents").delete().eq("id", id)); }
  async addPack(p) { return this.q(this.db.from("packs").insert({ document_id: p.document_id, engine: p.engine, model: p.model, pack: p.pack, stats: p.stats }).select().single()); }
  async linkPack(packId, documentId) { await this.q(this.db.from("packs").update({ document_id: documentId }).eq("id", packId)); }
  async getPack(documentId) { const rows = await this.q(this.db.from("packs").select("*").eq("document_id", documentId).order("created_at", { ascending: false }).limit(1)); return rows[0] || null; }
  async addCards(list) { return this.q(this.db.from("cards").insert(list.map(({ id, ...c }) => c)).select()); }
  async listCards(filter = {}) { let q = this.db.from("cards").select("*").order("created_at"); if (filter.documentId) q = q.eq("document_id", filter.documentId); return this.q(q); }
  async updateCard(id, patch) { return this.q(this.db.from("cards").update({ ...patch, updated_at: now() }).eq("id", id).select().single()); }
  async deleteCard(id) { await this.q(this.db.from("cards").delete().eq("id", id)); }
  async addReview(r) { await this.q(this.db.from("reviews").insert(r)); }
  async listReviews(sinceDays = 400) { return this.q(this.db.from("reviews").select("*").gte("reviewed_at", new Date(Date.now() - sinceDays * 864e5).toISOString())); }
  async logActivity(a) { return this.q(this.db.from("activity").insert({ site: a.site || "Gradify", kind: a.kind, xp: a.xp || 0, detail: a.detail || null }).select().single()); }
  // assessment attempts: one row per answer (supabase/migrations/20261101120000_assessment_attempts.sql)
  // course progress (kit/course/progress.js): one row per learner per course
  async getCourseProgress(subject) { const rows = await this.q(this.db.from("course_progress").select("state,updated_at").eq("subject", subject).limit(1)); return rows[0]?.state || null; }
  // the account's copy with its version (updated_at), for saving without overwriting another device (syncProgress)
  async getCourseProgressRow(subject) { const rows = await this.q(this.db.from("course_progress").select("state,updated_at").eq("subject", subject).limit(1)); return rows[0] ? { state: rows[0].state, version: rows[0].updated_at } : null; }
  // write only if the account's copy is still at `version` (or, with no version, still absent); the new version, or
  // null if another device saved first. Uses the existing row-level security policies: no database change.
  async saveCourseProgressIf(subject, site, state, version) {
    const updated_at = now();
    if (version) {
      const rows = await this.q(this.db.from("course_progress").update({ site, state, updated_at }).eq("subject", subject).eq("updated_at", version).select("updated_at"));
      return rows[0]?.updated_at || null;
    }
    const u = await this.user();
    const rows = await this.q(this.db.from("course_progress").upsert({ user_id: u.id, subject, site, state, updated_at }, { onConflict: "user_id,subject", ignoreDuplicates: true }).select("updated_at"));
    return rows[0]?.updated_at || null;
  }
  async saveCourseProgress(subject, site, state) { const u = await this.user(); await this.q(this.db.from("course_progress").upsert({ user_id: u.id, subject, site, state, updated_at: now() })); }
  // The same save, sent so that it survives the page closing (fetch keepalive). Synchronous on purpose: it is
  // called from pagehide, when awaiting anything may be too late. Returns false if it couldn't be sent this way
  // (not signed in yet, or over the browser's 64 KB keepalive limit); the device copy still syncs next visit.
  // With `version` (the copy this page last read or wrote) it only writes if the account is still at that version, and
  // without one only if the account has no copy yet, so a closing page never overwrites another device's newer save;
  // if it can't write, the device copy is merged and sent on the next visit.
  beaconCourseProgress(subject, site, state, version = null) {
    const s = this.current; if (!s?.access_token || !s.user?.id) return false;
    const body = JSON.stringify(version ? { site, state, updated_at: now() } : { user_id: s.user.id, subject, site, state, updated_at: now() });
    if (body.length > 60000) return false;
    const headers = { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${s.access_token}`, "Content-Type": "application/json" };
    try {
      if (version) fetch(`${SUPABASE_URL}/rest/v1/course_progress?subject=eq.${encodeURIComponent(subject)}&updated_at=eq.${encodeURIComponent(version)}`, { method: "PATCH", keepalive: true, body, headers: { ...headers, Prefer: "return=minimal" } }).catch(() => {});
      else fetch(`${SUPABASE_URL}/rest/v1/course_progress`, { method: "POST", keepalive: true, body, headers: { ...headers, Prefer: "resolution=ignore-duplicates,return=minimal" } }).catch(() => {});
      return true;
    } catch { return false; }
  }
  // Uploads are idempotent: each attempt has a unique id, and a row that already exists is skipped, so a failed
  // or interrupted upload can simply be sent again (kit/course/progress.js keeps the outbox).
  async logAttempt(a) { return this.logAttempts([a]); }
  async logAttempts(list) {
    if (!list.length) return;
    const rows = list.map((a) => ({ id: a.id, site: a.site, subject: a.subject, context: a.context, context_id: a.contextId, question_id: a.question.id, question_version: a.question.v, question_type: a.question.type, difficulty: a.question.d, objectives: a.question.objectives, lesson_id: a.lesson, module: a.module, unit_id: a.unit, response: a.response, score: a.score, correct: a.correct, attempt: a.attempt, confidence: a.confidence, ms: a.ms, misconception: a.misconception, marking_method: a.marking.method, marking_status: a.marking.status, schema: a.schema, created_at: a.at }));
    for (let i = 0; i < rows.length; i += 200) await this.q(this.db.from("assessment_attempts").upsert(rows.slice(i, i + 200), { onConflict: "id", ignoreDuplicates: true }));
  }
  async listAttempts(sinceDays = 400) {
    const rows = await this.q(this.db.from("assessment_attempts").select("*").gte("created_at", new Date(Date.now() - sinceDays * 864e5).toISOString()).order("created_at"));
    return rows.map((r) => ({ schema: r.schema, id: r.id, at: r.created_at, site: r.site, subject: r.subject, context: r.context, contextId: r.context_id, question: { id: r.question_id, v: r.question_version, type: r.question_type, d: r.difficulty, objectives: r.objectives || [] }, lesson: r.lesson_id, module: r.module, unit: r.unit_id, response: r.response, score: Number(r.score), correct: r.correct, attempt: r.attempt, confidence: r.confidence, ms: r.ms, misconception: r.misconception, marking: { method: r.marking_method, status: r.marking_status } }));
  }
  async listActivity(sinceDays = 400) { return this.q(this.db.from("activity").select("*").gte("at", new Date(Date.now() - sinceDays * 864e5).toISOString())); }
  async listBlocks(fromDay, toDay) { return this.q(this.db.from("plan_blocks").select("*").gte("day", fromDay).lte("day", toDay)); }
  async saveBlock(b) { return b.id ? this.q(this.db.from("plan_blocks").update(b).eq("id", b.id).select().single()) : this.q(this.db.from("plan_blocks").insert(b).select().single()); }
  async deleteBlock(id) { await this.q(this.db.from("plan_blocks").delete().eq("id", id)); }
  // NMC revalidation record: one row per entry, the fields in jsonb (revalidation_entries table)
  async listRevalidation() { return (await this.q(this.db.from("revalidation_entries").select("*").order("occurred_on"))).map((r) => ({ ...r.entry, id: r.id, kind: r.kind, date: r.occurred_on })); }
  async saveRevalidation(e) {
    const { id, kind, date, created_at, updated_at, ...entry } = e;
    const row = { kind, occurred_on: date || new Date().toISOString().slice(0, 10), entry, updated_at: now() };
    const saved = id ? await this.q(this.db.from("revalidation_entries").update(row).eq("id", id).select().single()) : await this.q(this.db.from("revalidation_entries").insert(row).select().single());
    return { ...saved.entry, id: saved.id, kind: saved.kind, date: saved.occurred_on };
  }
  async deleteRevalidation(id) { await this.q(this.db.from("revalidation_entries").delete().eq("id", id)); }
  async exportAll() {
    const t = ["profiles", "documents", "packs", "cards", "reviews", "activity", "plan_blocks"];
    const out = {};
    for (const name of t) out[name] = await this.q(this.db.from(name).select("*"));
    // tables added by later migrations: included when the migration has been run
    for (const name of ["assessment_attempts", "course_progress", "revalidation_entries"]) { try { out[name] = await this.q(this.db.from(name).select("*")); } catch { /* not set up yet */ } }
    return out;
  }
  async wipe() {
    for (const t of ["documents", "activity", "plan_blocks"]) await this.q(this.db.from(t).delete().not("id", "is", null));
    try { await this.q(this.db.from("course_progress").delete().not("subject", "is", null)); } catch { /* not set up yet */ }
    try { await this.q(this.db.from("revalidation_entries").delete().not("id", "is", null)); } catch { /* not set up yet */ }
  }

  // Move everything from this device into the account (after first sign-in)
  async importLocal(local) {
    const m = await local.exportAll();
    const docIds = {}, cardIds = {};
    for (const d of m.documents) { const row = await this.addDocument(d); docIds[d.id] = row.id; }
    for (const p of m.packs) await this.addPack({ ...p, document_id: docIds[p.document_id] || null });
    for (const c of m.cards) {
      const { id, document_id, created_at, updated_at, pack_id, ...rest } = c;
      const [row] = await this.q(this.db.from("cards").insert({ ...rest, document_id: docIds[document_id] || null }).select());
      cardIds[id] = row.id;
    }
    const reviews = m.reviews.filter((r) => cardIds[r.card_id]).map(({ id, card_id, ...r }) => ({ ...r, card_id: cardIds[card_id], confidence: r.confidence ?? null, mode: r.mode || "scheduled" }));
    if (reviews.length) await this.q(this.db.from("reviews").insert(reviews));
    // activity in chunks, capped per row by the database
    const acts = m.activity.map(({ id, ...a }) => ({ ...a, xp: Math.min(500, a.xp || 0) }));
    for (let i = 0; i < acts.length; i += 200) await this.q(this.db.from("activity").insert(acts.slice(i, i + 200)));
    // the revalidation record, if the table exists
    for (const e of m.revalidation || []) { try { const { id, ...rest } = e; await this.saveRevalidation(rest); } catch { break; } }
    // the set-up answers go separately: the learner column may not exist yet (kit/data/profile.js)
    const { xp, learner, ...profile } = m.profile;
    await this.saveProfile(profile);
    if (learner) try { await this.saveProfile({ learner }); } catch { /* kept on this device */ }
  }
}

// A sub-site's view of the shared account: only its own notes, cards, answers and activity.
// Everything else (sign-in, saving) passes straight through to the underlying store. On
// getgradify.com, the parent of every site, the app uses the unscoped store and sees it all.
export function scopeToSite(store, site) {
  const scoped = Object.create(store);
  const docIds = async () => new Set((await store.listDocuments()).filter((d) => d.site === site).map((d) => d.id));
  return Object.assign(scoped, {
    site,
    async listDocuments() { return (await store.listDocuments()).filter((d) => d.site === site); },
    async listCards(filter = {}) { const ids = await docIds(); return (await store.listCards(filter)).filter((c) => ids.has(c.document_id)); },
    async listReviews(sinceDays) { const ids = new Set((await scoped.listCards()).map((c) => c.id)); return (await store.listReviews(sinceDays)).filter((r) => ids.has(r.card_id)); },
    async listActivity(sinceDays) { return (await store.listActivity(sinceDays)).filter((a) => a.site === site); },
    async listAttempts(sinceDays) { return (await store.listAttempts?.(sinceDays) || []).filter((a) => a.site === site); },
    async getProfile() { return { ...(await store.getProfile()), site }; },
    async saveProfile(patch) { return { ...(await store.saveProfile({ ...patch, site })), site }; },
    async exportAll() {
      const all = await store.exportAll(), docs = new Set(all.documents.filter((d) => d.site === site).map((d) => d.id));
      const cards = all.cards.filter((c) => docs.has(c.document_id)), cardIds = new Set(cards.map((c) => c.id));
      return { ...all, documents: all.documents.filter((d) => docs.has(d.id)), packs: (all.packs || []).filter((p) => docs.has(p.document_id)), cards,
        reviews: all.reviews.filter((r) => cardIds.has(r.card_id)), activity: all.activity.filter((a) => a.site === site) };
    },
    // deletes this site's notes (their cards and answers go with them), not the whole account
    async wipe() { for (const d of await scoped.listDocuments()) await store.deleteDocument(d.id); },
  });
}
