// Where Gradify Notes keeps the knowledge base, and how it reaches every device.
//   This browser: localStorage (the rems and settings) and IndexedDB (imported PDFs). Works offline and signed out.
//   The account: one row in public.tool_items (kind 'kb', supabase/migrations/20261120120000_notes_knowledge_base.sql),
//   merged rem by rem with this browser's copy (kit/notes/kb/model.js merge), so two devices editing different
//   bullets both keep their changes, and a deletion on one isn't undone by the other. Images go with Tools' images
//   (kit/tools/store.js: IndexedDB here, public.tool_images in the account). PDFs stay on the device they were
//   imported on; their highlights and notes sync.
//   Flashcards: every card written in the notes is also a row in the app's own card table (kit/notes/kb/bridge.js),
//   so it's in Today, the global review queue, Progress and the Mastery Engine like every other card.
import { normalise, merge, welcome } from "./model.js";

const KEY = "gradify.kb.v1", ROW = "kb-main";
const MAX_BYTES = 1_900_000;
let kb = null, cloud = null, timer = 0, running = null;
const listeners = new Set();
export const status = { mode: "local", note: "", at: null };

const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; } };
const bodyOf = (k) => { const { _tx, ...rest } = k; return rest; };

/** The knowledge base, loaded once per page. A new learner starts with a welcome document. */
export function load() {
  if (kb) return kb;
  kb = normalise(read());
  if (!Object.keys(kb.rems).length && !kb.settings.welcomed) { welcome(kb); kb.settings.welcomed = true; persist(); }
  addEventListener("storage", (e) => { if (e.key === KEY && e.newValue) { try { kb = merge(kb, JSON.parse(e.newValue)); emit(); } catch { /* fine */ } } });
  return kb;
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(bodyOf(kb))); return true; }
  catch { status.note = "full"; return false; }
}
/** Saves this browser's copy now, and sends it to the account shortly after. */
export function save() {
  kb.u = Date.now();
  const ok = persist();
  clearTimeout(timer);
  if (cloud) timer = setTimeout(() => sync().catch(() => {}), 1500);
  return ok;
}
export const onChange = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
const emit = () => { for (const f of listeners) try { f(kb); } catch { /* a listener's own problem */ } };

/** Use the learner's account when they're signed in (the app's store). */
export async function connect(appStore) {
  load();
  cloud = appStore?.mode === "cloud" && appStore.db ? appStore.db : null;
  status.mode = cloud ? "cloud" : "local";
  // images in notes travel with Tools' images
  try { const t = await import("../../tools/store.js"); t.needImages?.(() => imageIds()); await t.connect(appStore); } catch { /* Tools unavailable: images stay on this device */ }
  return cloud ? sync() : status;
}
export const imageIds = () => Object.values(load().rems).flatMap((r) => [r.image?.id, r.drawing?.bg].filter(Boolean));

/** Fetches the account's copy, merges it, and sends the result back. One at a time; safe to call whenever. */
export function sync() {
  if (!cloud) return Promise.resolve(status);
  if (running) return running.then(() => sync());
  running = (async () => {
    try {
      const { data, error } = await cloud.from("tool_items").select("body, updated_at").eq("id", ROW).maybeSingle();
      if (error) throw error;
      const before = JSON.stringify(kb.rems).length;
      if (data?.body?.rems) { kb = merge(kb, data.body); persist(); if (JSON.stringify(kb.rems).length !== before || data.updated_at !== status.at) emit(); }
      const body = bodyOf(kb), size = JSON.stringify(body).length;
      if (size > MAX_BYTES) { status.note = "too-big"; return status; }
      const up = await cloud.from("tool_items").upsert({ id: ROW, kind: "kb", title: "Gradify Notes", body, deleted: false }, { onConflict: "user_id,id" }).select("updated_at").single();
      if (up.error) throw up.error;
      status.at = up.data.updated_at; status.note = "";
    } catch (e) {
      const m = `${e?.code || ""} ${e?.message || e}`;
      // the account isn't set up for notes yet (before the migration): this browser only, quietly
      if (/PGRST205|42P01|tool_items_kind_check|23514|schema cache/i.test(m) && !/row-level|42501/i.test(m)) { cloud = null; status.mode = "local"; status.note = ""; }
      else status.note = /row-level security|permission|42501/i.test(m) ? "readonly" : "offline";
    } finally { running = null; }
    return status;
  })();
  return running;
}
export const sizeOf = () => JSON.stringify(bodyOf(load())).length;
export const MAX = MAX_BYTES;

// ---------- imported files (PDFs), on this device ----------
let dbp = null;
const db = () => (dbp ||= new Promise((ok, no) => { const r = indexedDB.open("gradify-kb", 1); r.onupgradeneeded = () => r.result.createObjectStore("files"); r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error); }));
const tx = async (mode, f) => { const d = await db(); return new Promise((ok, no) => { const t = d.transaction("files", mode), s = t.objectStore("files"), r = f(s); t.oncomplete = () => ok(r?.result); t.onerror = () => no(t.error); }); };
export async function putFile(blob) { const id = `f${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`; await tx("readwrite", (s) => s.put(blob, id)); return id; }
export const getFile = (id) => tx("readonly", (s) => s.get(id)).catch(() => null);
export const dropFile = (id) => tx("readwrite", (s) => { s.delete(id); s.delete(`t:${id}`); }).catch(() => {});
// a PDF's text, read once, for guided learning and Ask your notes (kept with the file, not synced)
export const setText = (id, text) => tx("readwrite", (s) => s.put(String(text), `t:${id}`)).catch(() => {});
export const getText = (id) => tx("readonly", (s) => s.get(`t:${id}`)).catch(() => null);

// ---------- shared snapshots ----------
// Sharing publishes a snapshot (public.kb_shares): later edits stay private until it's shared again. Public links
// can be opened by anyone with the link; "unshare" deletes the snapshot.
export async function share(appStore, { id = null, rem, title, snapshot }) {
  if (appStore?.mode !== "cloud") throw Object.assign(new Error("Sign in to share notes."), { signin: true });
  const row = { rem, title: String(title).slice(0, 200), snapshot, public: true };
  const q = id ? appStore.db.from("kb_shares").update(row).eq("id", id) : appStore.db.from("kb_shares").insert(row);
  const { data, error } = await q.select("id, updated_at").single();
  if (error) throw new Error(/42P01|PGRST205/.test(`${error.code} ${error.message}`) ? "Sharing isn't switched on for Gradify yet." : error.message);
  return data;
}
export async function unshare(appStore, id) { const { error } = await appStore.db.from("kb_shares").delete().eq("id", id); if (error) throw error; }
export async function myShares(appStore) { if (appStore?.mode !== "cloud") return []; const { data } = await appStore.db.from("kb_shares").select("id, rem, title, updated_at"); return data || []; }
export async function openShare(appStore, id) {
  const client = appStore?.db || (window.supabase && (await import("../../../gradify.config.js").then((c) => window.supabase.createClient(c.SUPABASE_URL, c.SUPABASE_ANON_KEY))));
  if (!client) throw new Error("Shared notes need Gradify accounts, which aren't set up here.");
  const { data, error } = await client.from("kb_shares").select("id, title, snapshot, updated_at").eq("id", id).maybeSingle();
  if (error || !data) throw new Error("That shared document isn't available. It may have been unshared.");
  return data;
}
