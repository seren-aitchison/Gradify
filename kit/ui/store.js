// Small, safe storage for the shared UI system (kit/ui). Every read and write is wrapped: in a private window, with
// site data blocked or with storage full, the interface still works for the visit and simply forgets afterwards.
//
// Tests pass their own storage (anything with getItem/setItem) to the pure functions instead.

const mem = new Map();
const fallback = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
const pick = (name) => { try { const s = globalThis[name]; s?.getItem("gx.probe"); return s || fallback; } catch { return fallback; } };

export const local = () => pick("localStorage");
export const session = () => pick("sessionStorage");

export function readJson(key, dflt, store = local()) {
  try { const v = JSON.parse(store.getItem(key) ?? "null"); return v ?? dflt; } catch { return dflt; }
}
export function writeJson(key, value, store = local()) {
  try { store.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

export const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const isMac = () => /Mac|iPhone|iPad/.test(globalThis.navigator?.platform || globalThis.navigator?.userAgent || "");

// the shared stylesheet loads itself the first time any component is used, from next to this file, so a page needs
// no extra <link> (every course, subject site and the hub get it the same way)
export function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("gx-css")) return;
  const link = Object.assign(document.createElement("link"), { id: "gx-css", rel: "stylesheet", href: new URL("../styles/ui.css", import.meta.url).href });
  document.head.append(link);
}
