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
  async logAttempt(a) { (this.mem.attempts ||= []).push(a); if (this.mem.attempts.length > 5000) this.mem.attempts.splice(0, this.mem.attempts.length - 5000); this.save(); return a; }
  async listAttempts(sinceDays = 400) { const t = Date.now() - sinceDays * 864e5; return (this.mem.attempts || []).filter((a) => Date.parse(a.at) >= t); }
  async listActivity(sinceDays = 400) { const t = Date.now() - sinceDays * 864e5; return this.mem.activity.filter((a) => Date.parse(a.at) >= t); }
  async listBlocks(fromDay, toDay) { return this.mem.blocks.filter((b) => b.day >= fromDay && b.day <= toDay); }
  async saveBlock(b) { if (b.id) { Object.assign(this.mem.blocks.find((x) => x.id === b.id), b); } else { b = { id: uid(), created_at: now(), done: false, auto: false, ...b }; this.mem.blocks.push(b); } this.save(); return b; }
  async deleteBlock(id) { this.mem.blocks = this.mem.blocks.filter((b) => b.id !== id); this.save(); }
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
    return new CloudStore(window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
  }
  async user() { const { data } = await this.db.auth.getUser(); return data.user; }
  async session() { const { data } = await this.db.auth.getSession(); return data.session; }
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
  async logAttempt(a) {
    return this.q(this.db.from("assessment_attempts").insert({ id: a.id, site: a.site, subject: a.subject, context: a.context, context_id: a.contextId, question_id: a.question.id, question_version: a.question.v, question_type: a.question.type, difficulty: a.question.d, objectives: a.question.objectives, lesson_id: a.lesson, module: a.module, unit_id: a.unit, response: a.response, score: a.score, correct: a.correct, attempt: a.attempt, confidence: a.confidence, ms: a.ms, misconception: a.misconception, marking_method: a.marking.method, marking_status: a.marking.status, schema: a.schema, created_at: a.at }));
  }
  async listAttempts(sinceDays = 400) {
    const rows = await this.q(this.db.from("assessment_attempts").select("*").gte("created_at", new Date(Date.now() - sinceDays * 864e5).toISOString()).order("created_at"));
    return rows.map((r) => ({ schema: r.schema, id: r.id, at: r.created_at, site: r.site, subject: r.subject, context: r.context, contextId: r.context_id, question: { id: r.question_id, v: r.question_version, type: r.question_type, d: r.difficulty, objectives: r.objectives || [] }, lesson: r.lesson_id, module: r.module, unit: r.unit_id, response: r.response, score: Number(r.score), correct: r.correct, attempt: r.attempt, confidence: r.confidence, ms: r.ms, misconception: r.misconception, marking: { method: r.marking_method, status: r.marking_status } }));
  }
  async listActivity(sinceDays = 400) { return this.q(this.db.from("activity").select("*").gte("at", new Date(Date.now() - sinceDays * 864e5).toISOString())); }
  async listBlocks(fromDay, toDay) { return this.q(this.db.from("plan_blocks").select("*").gte("day", fromDay).lte("day", toDay)); }
  async saveBlock(b) { return b.id ? this.q(this.db.from("plan_blocks").update(b).eq("id", b.id).select().single()) : this.q(this.db.from("plan_blocks").insert(b).select().single()); }
  async deleteBlock(id) { await this.q(this.db.from("plan_blocks").delete().eq("id", id)); }
  async exportAll() {
    const t = ["profiles", "documents", "packs", "cards", "reviews", "activity", "plan_blocks"];
    const out = {};
    for (const name of t) out[name] = await this.q(this.db.from(name).select("*"));
    return out;
  }
  async wipe() { for (const t of ["documents", "activity", "plan_blocks"]) await this.q(this.db.from(t).delete().not("id", "is", null)); }

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
    const { xp, ...profile } = m.profile;
    await this.saveProfile(profile);
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
