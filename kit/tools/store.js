// Where Tools keeps a learner's own work, in this browser: their flashcard decks (with each card's spaced-repetition
// schedule), their mind maps, and images added to cards (in IndexedDB, so a few pictures don't fill localStorage).
const KEY = { decks: "gradify.tools.decks", maps: "gradify.tools.maps", srs: (id) => `gradify.tools.srs.${id}` };
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
export const uid = (p) => `${p}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// ---------- decks ----------
export const decks = () => read(KEY.decks, []).sort((a, b) => (b.updated || 0) - (a.updated || 0));
export const deck = (id) => decks().find((d) => d.id === id) || null;
export function saveDeck(d) {
  const all = read(KEY.decks, []), now = Date.now(), next = { style: "card", ...d, id: d.id || uid("d"), updated: now, created: d.created || now };
  const i = all.findIndex((x) => x.id === next.id);
  if (i >= 0) all[i] = next; else all.push(next);
  if (!write(KEY.decks, all)) throw new Error("This browser's storage is full. Remove an old deck or some images and try again.");
  return next;
}
export function deleteDeck(id) { write(KEY.decks, read(KEY.decks, []).filter((d) => d.id !== id)); try { localStorage.removeItem(KEY.srs(id)); } catch { /* fine */ } }
/** Each card's schedule in a deck: { cardId: { reps, lapses, ease, interval_days, due_at, updated_at, last_rating } } */
export const schedules = (id) => read(KEY.srs(id), {});
export const saveSchedule = (id, cardId, st) => { const all = schedules(id); all[cardId] = st; write(KEY.srs(id), all); };

// ---------- mind maps ----------
export const maps = () => read(KEY.maps, []).sort((a, b) => (b.updated || 0) - (a.updated || 0));
export const map = (id) => maps().find((m) => m.id === id) || null;
export function saveMap(m) {
  const all = read(KEY.maps, []), next = { ...m, id: m.id || uid("m"), updated: Date.now() };
  const i = all.findIndex((x) => x.id === next.id);
  if (i >= 0) all[i] = next; else all.push(next);
  if (!write(KEY.maps, all)) throw new Error("This browser's storage is full. Remove an old map and try again.");
  return next;
}
export const deleteMap = (id) => write(KEY.maps, read(KEY.maps, []).filter((m) => m.id !== id));

// ---------- images ----------
let dbp = null;
const db = () => (dbp ||= new Promise((ok, no) => {
  const r = indexedDB.open("gradify-tools", 1);
  r.onupgradeneeded = () => r.result.createObjectStore("images");
  r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error);
}));
const tx = async (mode, f) => { const d = await db(); return new Promise((ok, no) => { const t = d.transaction("images", mode), s = t.objectStore("images"), r = f(s); t.oncomplete = () => ok(r?.result); t.onerror = () => no(t.error); }); };
const urls = new Map();

/** Add an image (a File or Blob): scaled to at most 1600 px and stored. Returns its id. */
export async function addImage(file) {
  if (!/^image\//.test(file.type)) throw new Error("That file isn't an image.");
  const bmp = await createImageBitmap(file), k = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas"); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
  const blob = await new Promise((ok) => c.toBlob(ok, file.type === "image/png" ? "image/png" : "image/jpeg", 0.86));
  const id = uid("i").toLowerCase();
  await tx("readwrite", (s) => s.put(blob, id));
  urls.set(id, URL.createObjectURL(blob));
  return id;
}
/** Object URLs for the given image ids, loaded once. */
export async function imageUrls(ids) {
  const missing = [...new Set(ids)].filter((id) => !urls.has(id));
  await Promise.all(missing.map(async (id) => { const b = await tx("readonly", (s) => s.get(id)).catch(() => null); if (b) urls.set(id, URL.createObjectURL(b)); }));
  return (id) => urls.get(id) || "";
}
