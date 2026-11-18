// Where Tools keeps a learner's own work: their flashcard decks (with each card's spaced-repetition schedule), their
// mind maps, and images added to cards. Always in this browser first (localStorage, and IndexedDB for images), so
// Tools works offline and signed out. Signed in, everything is also kept in the learner's account
// (public.tool_items and public.tool_images, supabase/migrations/20261118120000_tools_and_allowances.sql) and arrives on
// every device: changes are sent shortly after they're made, and each Tools screen fetches what changed elsewhere.
// Two devices changing the same item: the later change wins (by the database's own timestamps). A deletion is kept
// as a marker, so another device's older copy doesn't bring it back.
const KEY = { decks: "gradify.tools.decks", maps: "gradify.tools.maps", notes: "gradify.tools.notes", srs: (id) => `gradify.tools.srs.${id}`, gone: "gradify.tools.deleted", sent: "gradify.tools.imgsent" };
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
export const uid = (p) => `${p}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// ---------- decks ----------
export const decks = () => read(KEY.decks, []).sort((a, b) => (b.updated || 0) - (a.updated || 0));
export const deck = (id) => decks().find((d) => d.id === id) || null;
function put(key, item, { dirty = true } = {}) {
  const all = read(key, []), i = all.findIndex((x) => x.id === item.id);
  if (i >= 0) all[i] = item; else all.push(item);
  if (!write(key, all)) throw new Error("This browser's storage is full. Remove an old deck, map or some images and try again.");
  if (dirty) soon();
  return item;
}
export function saveDeck(d) {
  const now = Date.now();
  return put(KEY.decks, { style: "card", ...d, id: d.id || uid("d"), updated: now, created: d.created || now, dirty: true });
}
export function deleteDeck(id) { write(KEY.decks, read(KEY.decks, []).filter((d) => d.id !== id)); try { localStorage.removeItem(KEY.srs(id)); } catch { /* fine */ } gone(id, "deck"); }
/** Each card's schedule in a deck: { cardId: { reps, lapses, ease, interval_days, due_at, updated_at, last_rating } } */
export const schedules = (id) => read(KEY.srs(id), {});
export const saveSchedule = (id, cardId, st) => {
  const all = schedules(id); all[cardId] = st; write(KEY.srs(id), all);
  // a review changes the deck: it goes to the account with the deck
  const d = deck(id); if (d) put(KEY.decks, { ...d, updated: Date.now(), dirty: true });
  const n = !d && page(id); if (n) put(KEY.notes, { ...n, updated: Date.now(), dirty: true });
};

// ---------- mind maps ----------
export const maps = () => read(KEY.maps, []).sort((a, b) => (b.updated || 0) - (a.updated || 0));
export const map = (id) => maps().find((m) => m.id === id) || null;
export const saveMap = (m) => put(KEY.maps, { ...m, id: m.id || uid("m"), updated: Date.now(), dirty: true });
export function deleteMap(id) { write(KEY.maps, read(KEY.maps, []).filter((m) => m.id !== id)); gone(id, "map"); }
function gone(id, kind) { const g = read(KEY.gone, []); if (!g.some((x) => x.id === id)) g.push({ id, kind }); write(KEY.gone, g); soon(); }

// ---------- notebook pages (kit/tools/notebook.js) ----------
export const pages = () => read(KEY.notes, []).sort((a, b) => (b.updated || 0) - (a.updated || 0));
export const page = (id) => pages().find((p) => p.id === id) || null;
export const savePage = (p) => put(KEY.notes, { ...p, id: p.id || uid("n"), updated: Date.now(), created: p.created || Date.now(), dirty: true });
export function deletePage(id) { write(KEY.notes, read(KEY.notes, []).filter((p) => p.id !== id)); gone(id, "note"); }

// ---------- images ----------
let dbp = null;
const db = () => (dbp ||= new Promise((ok, no) => {
  const r = indexedDB.open("gradify-tools", 1);
  r.onupgradeneeded = () => r.result.createObjectStore("images");
  r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error);
}));
const tx = async (mode, f) => { const d = await db(); return new Promise((ok, no) => { const t = d.transaction("images", mode), s = t.objectStore("images"), r = f(s); t.oncomplete = () => ok(r?.result); t.onerror = () => no(t.error); }); };
const urls = new Map();

/** Add an image (a File or Blob): scaled to at most 1200 px, compressed, and stored. Returns its id. */
export async function addImage(file) {
  if (!/^image\//.test(file.type)) throw new Error("That file isn't an image.");
  const bmp = await createImageBitmap(file), k = Math.min(1, 1200 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas"); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
  let blob = await new Promise((ok) => c.toBlob(ok, file.type === "image/png" ? "image/png" : "image/jpeg", 0.84));
  // a big PNG (a photo saved as PNG) goes as a JPEG, so it fits in the account
  if (blob.size > 900_000) blob = await new Promise((ok) => c.toBlob(ok, "image/jpeg", 0.8));
  const id = uid("i").toLowerCase();
  await tx("readwrite", (s) => s.put(blob, id));
  urls.set(id, URL.createObjectURL(blob));
  soon();
  return id;
}
/** Object URLs for the given image ids, loaded once. */
export async function imageUrls(ids) {
  const missing = [...new Set(ids)].filter((id) => !urls.has(id));
  await Promise.all(missing.map(async (id) => { const b = await tx("readonly", (s) => s.get(id)).catch(() => null); if (b) urls.set(id, URL.createObjectURL(b)); }));
  return (id) => urls.get(id) || "";
}
const toDataUrl = (blob) => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = () => no(r.error); r.readAsDataURL(blob); });
const fromDataUrl = (s) => fetch(s).then((r) => r.blob());

// ---------- the account ----------
let cloud = null, timer = 0, running = null;
export const status = { mode: "local", note: "" };
/** Use the learner's account when signed in (the app's store). Returns once this browser and the account agree. */
export async function connect(store) {
  cloud = store?.mode === "cloud" && store.db ? store.db : null;
  status.mode = cloud ? "cloud" : "local";
  return cloud ? sync() : status;
}
function soon() { if (!cloud) return; clearTimeout(timer); timer = setTimeout(() => sync().catch(() => {}), 1200); }

/** Send this browser's changes and fetch the account's. Safe to call at any time; one sync runs at a time. */
export function sync() {
  if (!cloud) return Promise.resolve(status);
  if (running) return running.then(() => sync());
  running = (async () => {
    try { await pull(); await push(); status.note = ""; }
    catch (e) {
      const m = `${e?.code || ""} ${e?.message || e}`;
      // the account's Tools tables not set up yet (before the migration): this browser only, quietly
      if (/PGRST205|42P01|tool_items|schema cache/i.test(m) && !/row-level|42501/i.test(m)) { cloud = null; status.mode = "local"; status.note = ""; }
      else status.note = /row-level security|permission|42501/i.test(m) ? "readonly" : "offline";
    }
    finally { running = null; }
    return status;
  })();
  return running;
}
const bodyOf = (kind, x) => (kind === "deck" ? { text: x.text, style: x.style, summary: x.summary || "", srs: schedules(x.id) } : kind === "note" ? { text: x.text || "", srs: schedules(x.id) } : { data: x.data });
const keyOf = (kind) => (kind === "deck" ? KEY.decks : kind === "note" ? KEY.notes : KEY.maps);
async function pull() {
  const { data, error } = await cloud.from("tool_items").select("id, kind, title, body, deleted, updated_at");
  if (error) throw error;
  for (const r of data || []) {
    const key = keyOf(r.kind), all = read(key, []), mine = all.find((x) => x.id === r.id), at = Date.parse(r.updated_at);
    if (mine?.synced === r.updated_at) continue;                       // nothing new
    if (mine?.dirty && (mine.updated || 0) > at) continue;              // this browser's change is later: it'll be sent
    if (r.deleted) { if (mine) write(key, all.filter((x) => x.id !== r.id)); continue; }
    if (r.kind === "deck") {
      put(KEY.decks, { ...(mine || {}), id: r.id, title: r.title, text: r.body.text || "", style: r.body.style || "card", summary: r.body.summary || "", updated: at, created: mine?.created || at, synced: r.updated_at, dirty: false }, { dirty: false });
      write(KEY.srs(r.id), r.body.srs || {});
    } else if (r.kind === "note") {
      put(KEY.notes, { ...(mine || {}), id: r.id, title: r.title, text: r.body.text || "", updated: at, created: mine?.created || at, synced: r.updated_at, dirty: false }, { dirty: false });
      write(KEY.srs(r.id), r.body.srs || {});
    } else put(KEY.maps, { ...(mine || {}), id: r.id, title: r.title, data: r.body.data, updated: at, synced: r.updated_at, dirty: false }, { dirty: false });
  }
  // images the decks use that this browser doesn't have yet
  const need = new Set([...decks(), ...pages()].flatMap((d) => [...String(d.text || "").matchAll(/\(img:([a-z0-9-]+)\)/gi)].map((m) => m[1])));
  const have = new Set(await tx("readonly", (s) => s.getAllKeys()).catch(() => []));
  const missing = [...need].filter((id) => !have.has(id));
  if (missing.length) {
    const { data: imgs } = await cloud.from("tool_images").select("id, data").in("id", missing);
    for (const im of imgs || []) { const b = await fromDataUrl(im.data); await tx("readwrite", (s) => s.put(b, im.id)); }
  }
}
async function push() {
  for (const [kind, key] of [["deck", KEY.decks], ["map", KEY.maps], ["note", KEY.notes]]) {
    for (const x of read(key, []).filter((i) => i.dirty)) {
      const { data, error } = await cloud.from("tool_items").upsert({ id: x.id, kind, title: x.title || "", body: bodyOf(kind, x), deleted: false }, { onConflict: "user_id,id" }).select("updated_at").single();
      if (error) throw error;
      const all = read(key, []), i = all.findIndex((y) => y.id === x.id);
      if (i >= 0 && all[i].updated === x.updated) { all[i] = { ...all[i], dirty: false, synced: data.updated_at }; write(key, all); }
    }
  }
  const g = read(KEY.gone, []);
  for (const x of g) {
    const { error } = await cloud.from("tool_items").upsert({ id: x.id, kind: x.kind, title: "", body: {}, deleted: true }, { onConflict: "user_id,id" });
    if (error) throw error;
  }
  if (g.length) write(KEY.gone, read(KEY.gone, []).filter((x) => !g.some((y) => y.id === x.id)));
  // images: each once
  const sent = new Set(read(KEY.sent, []));
  const ids = (await tx("readonly", (s) => s.getAllKeys()).catch(() => [])).filter((id) => !sent.has(id));
  for (const id of ids) {
    const b = await tx("readonly", (s) => s.get(id)); if (!b) continue;
    const { error } = await cloud.from("tool_images").upsert({ id, mime: b.type || "image/jpeg", data: await toDataUrl(b) }, { onConflict: "user_id,id", ignoreDuplicates: true });
    if (error) throw error;
    sent.add(id); write(KEY.sent, [...sent]);
  }
}
