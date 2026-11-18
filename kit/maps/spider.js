// A lesson's five mind maps in the spidermap viewer (kit/notes/mindmap/view.js): the same liquid-glass canvas, memory
// sync, Gradify Intelligence, practice and "Ask the map" as Notes Studio, for every lesson on every site.
// The maps themselves still come from the lesson's notes (kit/maps/build.js), so nothing about what they say changes.
// Kept from the lesson viewer it replaces (kit/maps/view.js openMap, still used by Tools): the Free allowance, the map
// switcher, deep links (#/lesson/<id>/map/3), the 4K PNG, SVG, Markdown and OPML exports, an outline view and full screen.
import { mapsFor, plain } from "./build.js";
import { gate } from "../data/limits.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const slug = (x) => String(x).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
let open = null;   // { overlay, host, view, L, o, r, i, prevHash, onKey }

// the viewer's code and look load the first time a map opens, together
let mods = null;
const load = () => (mods ||= Promise.all([import("../notes/mindmap/view.js"), import("./view.js")]).then(async ([sp, mv]) => { await sp.loadMindMapCss(); return { sp, mv }; }).catch((e) => { mods = null; throw e; }));
/** Start loading the viewer early (on hover of a map preview), so it opens at once. */
export const warmLessonMaps = () => load().catch(() => {});

function download(blob, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

// the map as a nested list, for reading, screen readers and small screens
function outlineHtml(m) {
  const li = (n) => `<li><span>${esc(plain(n.topic))}</span>${n.detail && plain(n.detail) !== plain(n.topic) ? `<p>${esc(plain(n.detail))}</p>` : ""}${n.children.length ? `<ul>${n.children.map(li).join("")}</ul>` : ""}</li>`;
  return `<div class="smap-outline-in"><header><b>${esc(plain(m.root.topic))}</b><em>Map ${m.n}: ${esc(m.title)}</em><button type="button" class="smp-x" data-outline-close aria-label="Close the outline">×</button></header><ul>${m.root.children.map(li).join("")}</ul></div>`;
}

/** Open map `i` (0–4) of a lesson. */
export async function openLessonMap(L, i = 0, o = {}) {
  if (!(await gate("map", `${o.id || "map"}:${i}`, { store: o.store }))) return;
  const r = mapsFor(L, o);
  if (!open) {
    const overlay = document.createElement("div");
    overlay.className = "smap-overlay";
    overlay.setAttribute("role", "dialog"); overlay.setAttribute("aria-modal", "true"); overlay.setAttribute("aria-label", `Mind maps: ${plain(L.title)}`);
    overlay.innerHTML = `<div class="smap-overlay-host"><p class="smap-loading">Opening the map…</p></div><div class="smap-outline" hidden></div>`;
    document.body.append(overlay);
    document.documentElement.classList.add("mm-open");
    open = { overlay, host: overlay.querySelector(".smap-overlay-host"), view: null, L, o, r, i, prevHash: location.hash.replace(/\/map\/[1-5]$/, "") };
    overlay.addEventListener("click", (e) => { if (e.target.closest("[data-outline-close]")) outline(false); });
    // Escape closes the outline, or the viewer when focus has left the map (the map handles Escape itself otherwise)
    open.onKey = (e) => { if (e.key !== "Escape" || !open) return; if (!open.overlay.querySelector(".smap-outline").hidden) { outline(false); return; } if (!open.host.contains(document.activeElement)) close(); };
    addEventListener("keydown", open.onKey);
  }
  let x;
  try { x = await load(); }
  catch { open.host.innerHTML = `<p class="smap-loading">This map couldn't be opened. Check your connection and try again.</p>`; return; }
  show(i, x);
}

function show(i, { sp, mv }) {
  const { L, o, r } = open, m = r.maps[i];
  open.i = i;
  history.replaceState(null, "", `${open.prevHash}/map/${i + 1}`);
  open.view?.destroy();
  outline(false);
  const exportName = (ext) => `${slug(plain(L.title))}-map-${m.n}-${slug(m.title)}${ext === "png" ? "-4k" : ""}.${ext}`;
  const lessonTitle = plain(L.title);
  open.view = sp.mountMindMap(open.host, {
    tree: m, esc, storeKey: `lesson:${o.id || slug(lessonTitle)}:${m.key}`,
    title: lessonTitle, kicker: `${o.kicker || "Mind maps"} · Map ${m.n}`,
    barExtra: `<div class="smap-seg smap-maps" role="radiogroup" aria-label="Choose a map">${r.maps.map((x, k) => `<button type="button" role="radio" aria-checked="${k === i}" data-lesson-map="${k}" title="${esc(x.title)}"><b>${x.n}</b><span>${esc(x.title)}</span></button>`).join("")}</div>`,
    onHead: (e) => { const b = e.target.closest("[data-lesson-map]"); if (!b) return false; const k = +b.dataset.lessonMap; if (k !== open.i) openLessonMap(L, k, o); return true; },
    menuItems: [
      { act: "outline", icon: "layers", label: "Outline view", run: () => outline(true) },
      { act: "present", icon: "fit", label: "Full screen", run: () => (document.fullscreenElement ? document.exitFullscreen() : open.overlay.requestFullscreen?.())?.catch?.(() => {}) },
      { act: "png", icon: "download", label: "4K image (PNG, 3840 × 2160)", run: async (api) => { const blob = await mv.toPng(api.scene()); if (blob) download(blob, exportName("png")); } },
      { act: "svg", icon: "download", label: "Vector (SVG)", run: (api) => download(new Blob([mv.toSvg(api.scene())], { type: "image/svg+xml" }), exportName("svg")) },
      { act: "md", icon: "download", label: "Markdown outline (Markmap, Obsidian)", run: () => download(new Blob([mv.toMarkdown(m, lessonTitle)], { type: "text/markdown" }), exportName("md")) },
      { act: "opml", icon: "download", label: "OPML (outliners)", run: () => download(new Blob([mv.toOpml(m, lessonTitle)], { type: "text/x-opml" }), exportName("opml")) },
    ],
    onClose: close,
  });
  open.overlay.dataset.links = String(m.links.length);   // for scripts/check-mindmaps.cjs
  open.overlay.querySelector(`[data-lesson-map="${i}"]`)?.focus({ preventScroll: true });
}

function outline(on) {
  const box = open?.overlay.querySelector(".smap-outline");
  if (!box) return;
  box.hidden = !on;
  if (on) { box.innerHTML = outlineHtml(open.r.maps[open.i]); box.querySelector("button")?.focus(); }
}

export function closeLessonMap() { close(); }
function close() {
  if (!open) return;
  if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  open.view?.destroy();
  removeEventListener("keydown", open.onKey);
  open.overlay.remove();
  document.documentElement.classList.remove("mm-open");
  history.replaceState(null, "", open.prevHash || location.pathname);
  open = null;
}
