// Mind maps in a lesson: five previews in the lesson page, and an immersive viewer for each.
//
// The maps come from the lesson's own notes (kit/maps/build.js). The viewer draws them with Mind Elixir
// (kit/vendor/mind-elixir, MIT, © SSShooter) and its controls with Liquid Glass Components (kit/vendor/liquid-glass,
// MIT, © jcm-developer). Glass is only on the controls, never on the map's nodes, so a big map stays readable.
// Both libraries load only when a learner opens a map; the previews are plain SVG.
//
// Export: the map's laid-out shapes (branch paths and node boxes, read from the rendered map) are drawn again as a
// standalone SVG, and onto a 3840 × 2160 canvas for a 4K PNG, at full resolution, never a screenshot scaled up.
import { mapsFor, MAPS, plain } from "./build.js";
import { loadSet, pickIcon, glassIcon } from "../core/glass-icons.js";
import { diagramForNode, glassDiagram } from "../core/glass-diagrams.js";
import { gate } from "../data/limits.js";

const here = new URL(".", import.meta.url);
const vendor = (p) => new URL(`../vendor/${p}`, here).href;
import { esc } from "../core/text.js";
// a branch colour for each main branch: Gradify's spectrum, readable on light and dark
export const PALETTE = ["#4641ff", "#e5307a", "#ff6a00", "#13a37a", "#8c27ca", "#2f7fd8", "#d99a00", "#e04848"];
const KIND = { gap: "Not in the notes yet", term: "Term", step: "Step", example: "Example", equation: "Formula", key: "Key point", pitfall: "Common mistake", case: "Case", law: "Legislation",
  drug: "Medicine", objective: "Objective", summary: "Summary", question: "Test yourself", compare: "Compare", cause: "Cause and effect", concept: "Concept",
  principle: "Principle", fact: "Detail", field: "Detail", mechanism: "Mechanism", safety: "Safe practice", prereq: "Builds on", lab: "Lab", section: "Section", group: "Group",
  limit: "Not in this lesson", root: "Lesson", point: "Point", para: "Point" };

// ---------- previews in the lesson page ----------
// a small sketch of a map's shape: the centre, each main branch and how many children it has
function previewSvg(m, i) {
  const kids = m.root.children.slice(0, 8), n = Math.max(kids.length, 1);
  const lines = kids.map((k, j) => {
    const a = (j / n) * Math.PI * 2 - Math.PI / 2, c = PALETTE[j % PALETTE.length];
    const x = 80 + Math.cos(a) * 46, y = 50 + Math.sin(a) * 32;
    const subs = k.children.slice(0, 4).map((_, s) => { const b = a + (s - 1.5) * 0.22; return `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(80 + Math.cos(b) * 70).toFixed(1)}" y2="${(50 + Math.sin(b) * 44).toFixed(1)}" stroke="${c}" stroke-opacity=".45" stroke-width="1.2"/>`; }).join("");
    return `<path d="M80 50 Q ${((80 + x) / 2).toFixed(1)} ${(50 + (y - 50) * 0.2).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/>${subs}<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.6" fill="${c}"/>`;
  }).join("");
  return `<svg viewBox="0 0 160 100" class="mm-sketch" aria-hidden="true" data-map="${i}">${lines}<rect x="62" y="42" width="36" height="16" rx="8" fill="var(--fg, #111)"/></svg>`;
}

/** The Mind maps section for a lesson page. */
export function mapsSectionHtml(L, o = {}) {
  const r = mapsFor(L, o);
  return `<section class="mm-section" aria-labelledby="mm-h">
    <div class="mm-head"><h3 id="mm-h">Mind maps</h3><p class="sub">Five ways to see this lesson, made from its notes. ${Math.round(r.coverage.share * 100)}% of the lesson is mapped.</p></div>
    <div class="mm-grid">${r.maps.map((m, i) => `<button type="button" class="mm-card" data-open-map="${i}" aria-label="Open map ${m.n}: ${esc(m.title)}">
      ${previewSvg(m, i)}
      <span class="mm-cicon" data-g3d="${esc(`${m.title} ${m.root.children.map((c) => c.topic).join(" ")}`)}" data-g3d-size="42" data-g3d-unique></span>
      <span class="mm-n">Map ${m.n}</span><b>${esc(m.title)}</b><span class="mm-purpose">${esc(m.purpose)}</span>
      <span class="mm-scope">${m.limited ? "Little of this in the lesson" : `${m.nodes - 1} ideas · ${m.root.children.length} branches`}</span>
    </button>`).join("")}</div>
  </section>`;
}

/** Wire the previews in `root` to open the viewer: the spidermap (kit/maps/spider.js), loaded when first needed and
 *  warmed as the pointer reaches a preview. (openMap below, the Mind Elixir viewer, stays for Tools.) */
export function wireMaps(root, L, o = {}) {
  const spider = () => import("./spider.js");
  const go = (i) => spider().then((s) => s.openLessonMap(L, i, o)).catch((e) => console.error("mind map", e));
  root.querySelectorAll("[data-open-map]").forEach((b) => {
    b.addEventListener("click", () => go(+b.dataset.openMap));
    b.addEventListener("pointerenter", () => spider().then((s) => s.warmLessonMaps()).catch(() => {}), { once: true });
    b.addEventListener("focus", () => spider().then((s) => s.warmLessonMaps()).catch(() => {}), { once: true });
  });
  const m = location.hash.match(/\/map\/([1-5])$/);
  if (m) go(+m[1] - 1);
}

// ---------- loading the libraries once ----------
let libs = null;
function css(href) {
  if (document.querySelector(`link[href="${href}"]`)) return Promise.resolve();
  return new Promise((ok) => { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = href; l.onload = ok; l.onerror = ok; document.head.append(l); });
}
function loadLibs() {
  return (libs ||= (async () => {
    await Promise.all([css(vendor("mind-elixir/MindElixir.css")), css(vendor("liquid-glass/tokens.css")), css(vendor("liquid-glass/glass-toolbar.css")), css(vendor("liquid-glass/glass-segmented.css")), css(vendor("liquid-glass/glass-search.css")), css(vendor("liquid-glass/glass-surface.css")), css(new URL("maps.css", here).href)]);
    const { default: MindElixir } = await import(vendor("mind-elixir/MindElixir.js"));
    // refraction is a progressive enhancement (Chromium on desktop); everything works without it
    document.documentElement.setAttribute("data-glass-refract", "off"); // flat frosted controls, no SVG refraction filters
    if (!document.querySelector("script[data-liquid-glass]")) { const s = document.createElement("script"); s.src = vendor("liquid-glass/liquid-glass.js"); s.defer = true; s.dataset.liquidGlass = ""; document.head.append(s); }
    return { MindElixir };
  })());
}

// ---------- the viewer ----------
const I = {
  out: '<path d="M5 12h14"/>', in: '<path d="M12 5v14M5 12h14"/>', fit: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>', centre: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
  expand: '<path d="M7 10l5 5 5-5"/><path d="M7 4l5 5 5-5"/>', collapse: '<path d="M7 14l5-5 5 5"/><path d="M7 20l5-5 5 5"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  svg: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>', png: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/>',
  export: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>', outline: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>', focus: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>', present: '<path d="M3 4h18v12H3zM12 16v4M8 20h8"/>', close: '<path d="M6 6l12 12M18 6 6 18"/>',
};
const icon = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const btn = (k, label, extra = "") => `<button class="glass-toolbar__btn" type="button" data-act="${k}" aria-label="${label}" title="${label}" ${extra}>${icon(k)}</button>`;

let open = null;   // the open viewer: { overlay, mind, ... }

/** Open map `i` (0–4) of a lesson in the immersive viewer. */
export async function openMap(L, i = 0, o = {}) {
  const r = mapsFor(L, o);
  // Free: 5 mind maps in all (kit/data/limits.js), once Pro is on sale; opening one already opened is free
  if (!(await gate("map", `${o.id || "map"}:${i}`, { store: o.store }))) return;
  if (open) close();
  const overlay = document.createElement("div");
  overlay.className = "mm-viewer";
  // the glass follows Gradify's theme, not only the system's (Liquid Glass Components: data-glass-scheme)
  overlay.dataset.glassScheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  overlay.setAttribute("role", "dialog"); overlay.setAttribute("aria-modal", "true"); overlay.setAttribute("aria-label", `Mind maps: ${plain(L.title)}`);
  overlay.innerHTML = `
    <div class="mm-stage"><div class="mm-canvas" tabindex="0" aria-label="Mind map. Drag to move, scroll or pinch to zoom."></div></div>
    <header class="mm-top">
      <div class="mm-title"><span class="kicker">${esc(o.kicker || "Mind maps")}</span><h2>${esc(plain(L.title))}</h2><p class="mm-purpose-line" aria-live="polite"></p></div>
      <div class="glass-segmented mm-select" role="radiogroup" aria-label="Choose a map" data-refract>${r.maps.map((m, k) => `<button class="glass-segmented__option" type="button" role="radio" aria-checked="${k === i}" data-map="${k}" title="${esc(m.title)}"><span class="mm-seg-n">${m.n}</span><span class="mm-seg-t">${esc(m.title)}</span></button>`).join("")}</div>
    </header>
    <div class="glass-toolbar mm-tools" role="toolbar" aria-label="Map controls" data-refract>
      ${btn("out", "Zoom out")}${btn("in", "Zoom in")}${btn("fit", "Fit to screen")}${btn("centre", "Centre")}
      <span class="glass-toolbar__divider" aria-hidden="true"></span>
      ${btn("expand", "Expand all")}${btn("collapse", "Collapse to main branches")}${btn("search", "Search this map", 'aria-pressed="false"')}
      <span class="glass-toolbar__divider" aria-hidden="true"></span>
      ${btn("outline", "Outline view", 'aria-pressed="false"')}${btn("export", "Export", 'aria-haspopup="menu" aria-expanded="false"')}${btn("present", "Presentation mode", 'aria-pressed="false"')}${btn("close", "Close")}
    </div>
    <div class="glass-surface mm-menu" role="menu" aria-label="Export this map" hidden>
      <button type="button" role="menuitem" data-act="png"><b>4K image</b><span>PNG, 3840 × 2160</span></button>
      <button type="button" role="menuitem" data-act="svg"><b>Vector</b><span>SVG, sharp at any size</span></button>
      <button type="button" role="menuitem" data-act="md"><b>Markdown outline</b><span>Opens in Markmap, Obsidian and notes apps</span></button>
      <button type="button" role="menuitem" data-act="opml"><b>OPML</b><span>For outliners and other mind map apps</span></button>
    </div>
    <div class="mm-outline" hidden tabindex="0" aria-label="This map as an outline"></div>
    <div class="glass-surface mm-mini" aria-label="Minimap: click to move there" role="button" tabindex="-1"><svg></svg></div>
    <form class="glass-search mm-search" role="search" hidden><svg class="glass-search__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input class="glass-search__input" type="search" placeholder="Find a concept" aria-label="Find a concept in this map"><span class="mm-hits" aria-live="polite"></span><ul class="mm-results" role="listbox" aria-label="Matches"></ul></form>
    <aside class="glass-surface mm-panel" aria-live="polite" hidden></aside>`;
  document.body.append(overlay);
  document.documentElement.classList.add("mm-open");
  const prevHash = location.hash.replace(/\/map\/[1-5]$/, "");
  open = { overlay, L, o, r, i, prevHash, mind: null, byId: new Map(), onKey: null };
  open.onKey = (e) => {
    if (e.key === "Escape") { if (!overlay.querySelector(".mm-menu").hidden) menu(false); else if (overlay.classList.contains("presenting")) setPresent(false); else close(); return; }
    if (!e.target.closest("input, textarea") && /^Arrow|^Enter$/.test(e.key)) navigate(e);
  };
  addEventListener("keydown", open.onKey);
  overlay.addEventListener("click", onClick);
  overlay.querySelector(".mm-search").addEventListener("submit", (e) => e.preventDefault());
  overlay.querySelector(".mm-search input").addEventListener("input", (e) => search(e.target.value));
  try { await show(i); }
  catch (e) { console.error("mind map", e); overlay.querySelector(".mm-canvas").innerHTML = `<p class="mm-error">This map couldn't be drawn. Please try again.</p>`; }
  overlay.querySelector(".mm-select [aria-checked='true']")?.focus();
}

// Strands: from the side of the idea above to the near side of each fact's bubble, at its middle (Mind Elixir's own
// sub-branches underline a node; Gradify's maps put every fact in its own bubble at the end of its strand).
function strand({ pT, pL, pW, pH, cT, cL, cW, cH, direction }) {
  const gap = parseInt(this.container.style.getPropertyValue("--node-gap-x")) || 0;
  const left = direction === "lhs";
  const sx = left ? pL + gap : pL + pW - gap, sy = pT + pH / 2;
  const ex = left ? cL + cW - gap : cL + gap, ey = cT + cH / 2, k = (ex - sx) / 2;
  return `M ${sx} ${sy} C ${sx + k} ${sy} ${ex - k} ${ey} ${ex} ${ey}`;
}

// a main branch's Liquid Glass icon, from the same set as the lesson's own (kit/core/glass-icons.js), no two alike
function branchHtml(n) {
  const name = pickIcon(open.icons, `${n.topic} ${n.children.slice(0, 4).map((c) => c.topic).join(" ")}`, { avoid: open.usedIcons });
  open.usedIcons.push(name);
  return `<span class="mm-bicon">${glassIcon(open.icons, name, { size: 38, seed: n.id })}</span><span class="mm-btext">${esc(n.topic)}</span>`;
}
/** Gradify's Mind Elixir theme (also used by the mind map creator in Tools). */
export function elixirTheme(dark) {
  return { name: "Gradify", type: dark ? "dark" : "light", palette: PALETTE, generateSubBranch: strand, cssVar: dark
      ? { "--main-color": "#f3f3f7", "--main-bgcolor": "#17171f", "--color": "#e4e4ec", "--bgcolor": "transparent", "--root-color": "#0b0b10", "--root-bgcolor": "#ffffff", "--root-border-color": "transparent", "--selected": "#f055dd", "--accent-color": "#f055dd", "--panel-color": "#fff", "--panel-bgcolor": "#17171f", "--main-radius": "14px", "--root-radius": "18px", "--topic-padding": "4px 6px" }
      : { "--main-color": "#16162a", "--main-bgcolor": "#ffffff", "--color": "#2a2a3c", "--bgcolor": "transparent", "--root-color": "#ffffff", "--root-bgcolor": "#14141f", "--root-border-color": "transparent", "--selected": "#d0249b", "--accent-color": "#d0249b", "--panel-color": "#14141f", "--panel-bgcolor": "#fff", "--main-radius": "14px", "--root-radius": "18px", "--topic-padding": "4px 6px" } };
}
/** Mind Elixir, loaded once, with its stylesheet and the viewer's (also used by Tools). */
export const mindElixir = () => loadLibs().then((x) => x.MindElixir);
export { strand };

function toElixir(n, depth, color, big, parent = null) {
  open.byId.set(n.id, n); open.parentOf.set(n.id, parent);
  return {
    id: n.id, topic: n.topic, expanded: !(big && depth >= 2 && n.children.length),
    ...(depth === 1 ? { branchColor: color } : {}),
    ...(depth === 1 && n.icon && !open.icons ? { icons: [n.icon] } : {}),
    // a main branch: its Liquid Glass icon (the same set as the lesson's) and its name
    ...(depth === 1 && open.icons ? { dangerouslySetInnerHTML: branchHtml(n) } : {}),
    // every fact below: its own bubble, edged in its branch's colour
    ...(depth >= 2 ? { style: { borderColor: color, ...(n.kind === "limit" || n.kind === "gap" ? { color: "var(--mm-mute)", fontStyle: "italic" } : {}) } }
      : n.kind === "limit" || n.kind === "gap" ? { style: { color: "var(--mm-mute)", fontStyle: "italic" } } : {}),
    ...(n.kind === "gap" ? { tags: ["Gap"] } : {}),
    ...(["pitfall"].includes(n.kind) ? { tags: ["Mistake"] } : n.kind === "equation" ? { tags: ["Formula"] } : n.kind === "term" ? { tags: ["Term"] } : {}),
    children: n.children.map((c, k) => toElixir(c, depth + 1, depth === 0 ? PALETTE[k % PALETTE.length] : color, big, n.id)),
  };
}

async function show(i) {
  if (open.i !== i && !(await gate("map", `${open.o.id || "map"}:${i}`, { store: open.o.store }))) return;
  const [{ MindElixir }, icons] = await Promise.all([loadLibs(), open.icons ? open.icons : loadSet(open.o.site || "Gradify").catch(() => null)]);
  open.icons = icons; open.usedIcons = [];
  const m = open.r.maps[i];
  open.i = i; open.byId.clear(); open.parentOf = new Map(); open.sel = null; open.focused = false;
  outline(false);
  open.overlay.querySelectorAll(".mm-select [data-map]").forEach((b) => b.setAttribute("aria-checked", String(+b.dataset.map === i)));
  open.overlay.querySelector(".mm-purpose-line").textContent = `Map ${m.n}: ${m.purpose}`;
  history.replaceState(null, "", `${open.prevHash}/map/${i + 1}`);
  open.mind?.destroy?.();
  const el = open.overlay.querySelector(".mm-canvas");
  el.innerHTML = "";
  const dark = document.documentElement.dataset.theme !== "light";
  const mind = new MindElixir({
    el, direction: MindElixir.SIDE, editable: false, contextMenu: false, toolBar: false, keypress: false, allowUndo: false,
    overflowHidden: false, alignment: "root", scaleMin: 0.15, scaleMax: 3, generateSubBranch: strand,
    theme: elixirTheme(dark),
  });
  // links between branches, from the lesson's own words (kit/maps/build.js: linksOf), drawn as quiet dashed connectors
  // the relation ("uses", "about") is in the detail panel, so the canvas stays quiet
  const arrows = m.links.map((l, k) => ({ id: `${m.root.id}-a${k}`, label: "", from: l.from, to: l.to,
    style: { stroke: dark ? "#b9a6ff" : "#5b48d6", strokeWidth: "1.6", strokeDasharray: "5 5", labelColor: dark ? "#d8ccff" : "#4635b8" } }));
  mind.init({ nodeData: toElixir(m.root, 0, null, m.nodes > 60), arrows });
  open.overlay.dataset.links = String(arrows.length);
  mind.bus.addListener("selectNodes", (nodes) => { open.sel = nodes?.[0]?.id || null; panel(nodes?.[0] ? open.byId.get(nodes[0].id) : null); });
  const redraw = () => { if (!open.miniPending) { open.miniPending = true; requestAnimationFrame(() => { open.miniPending = false; minimap(); }); } };
  mind.bus.addListener("move", redraw); mind.bus.addListener("scale", redraw);
  mind.bus.addListener("unselectNodes", () => panel(null));
  open.mind = mind;
  panel(null);
  requestAnimationFrame(() => { try { fit(mind); open.mini = null; minimap(); } catch { /* an empty map */ } });
  const q = open.overlay.querySelector(".mm-search input");
  if (q.value) search(q.value);
}

// Fit the whole map (not just its centre) into the space between the header and the toolbar, and centre it there.
// Mind Elixir's own scaleFit and toCenter centre the root node, which leaves a one-sided map off to one side.
function fit(mind = open?.mind) {
  if (!mind) return;
  const box = open.overlay.querySelector(".mm-canvas").getBoundingClientRect();
  const top = open.overlay.querySelector(".mm-top")?.getBoundingClientRect().bottom ?? box.top;
  const bottom = open.overlay.querySelector(".mm-tools")?.getBoundingClientRect().top ?? box.bottom;
  const area = { x: box.left + 16, y: top + 12, w: box.width - 32, h: Math.max(120, bottom - top - 24) };
  const extent = () => { let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    mind.nodes.querySelectorAll(".me-tpc").forEach((t) => { const r = t.getBoundingClientRect(); if (!r.width) return; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); });
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }; };
  // Mind Elixir sets the zoom (its own scaleFit keeps the canvas whole); then the map's measured extent is centred
  mind.scaleFit();
  let e = extent(); if (!isFinite(e.w) || !e.w) return;
  // then smaller still if the map is taller or wider than the space between the title and the toolbar
  const k = mind.scaleVal || 1, want = Math.min(k, k * area.w / e.w, k * area.h / e.h);
  if (want < k * 0.98) { mind.scale(Math.max(want, 0.15)); e = extent(); }
  mind.move(area.x + area.w / 2 - (e.x + e.w / 2), area.y + area.h / 2 - (e.y + e.h / 2));
}

function panel(n) {
  const p = open.overlay.querySelector(".mm-panel");
  if (!n || n.kind === "root") { p.hidden = true; return; }
  p.hidden = false;
  const linked = (open.r.maps[open.i].links || []).filter((l) => l.from === n.id || l.to === n.id)
    .map((l) => (l.from === n.id ? `${l.label} <b>${esc(open.byId.get(l.to)?.topic)}</b>` : `<b>${esc(open.byId.get(l.from)?.topic)}</b> ${l.label} this`));
  p.innerHTML = `<span class="mm-kind">${esc(KIND[n.kind] || "Idea")}</span><h3>${esc(n.topic)}</h3>${n.detail && plain(n.detail) !== n.topic ? `<p>${esc(n.detail)}</p>` : ""}
    ${glassDiagram(diagramForNode(n), { size: "sm", caption: false })}
    ${linked.length ? `<p class="mm-links">${icon("focus")}${linked.join("<br>")}</p>` : ""}
    ${n.children.length ? `<p class="mm-more">${n.children.length} ${n.children.length === 1 ? "branch" : "branches"} below <button type="button" class="mm-chip" data-act="${open.focused ? "unfocus" : "focus"}">${open.focused ? "Show the whole map" : "Focus on this branch"}</button></p>` : ""}
    <button type="button" class="mm-x" data-act="unselect" aria-label="Close details">${icon("close")}</button>`;
}

// ---------- search: highlight matches and open the branches they're in ----------
function search(q) {
  const out = open.overlay.querySelector(".mm-hits"), needle = q.trim().toLowerCase();
  const mind = open.mind;
  open.overlay.querySelectorAll(".mm-hit").forEach((e) => e.classList.remove("mm-hit"));
  if (!mind || needle.length < 2) { out.textContent = ""; open.overlay.querySelector(".mm-results").innerHTML = ""; return; }
  const hits = [...open.byId.values()].filter((n) => `${n.topic} ${n.detail || ""}`.toLowerCase().includes(needle));
  for (const n of hits) {
    // open every collapsed branch on the way to the match
    for (let p = mind.findEle(n.id)?.closest(".me-wrapper")?.parentElement?.closest(".me-wrapper"); p; p = p.parentElement?.closest(".me-wrapper")) {
      const tpc = p.querySelector(":scope > .me-parent > .me-tpc");
      if (tpc?.nodeObj && tpc.nodeObj.expanded === false) mind.expandNode(tpc, true);
    }
  }
  for (const n of hits) mind.findEle(n.id)?.classList.add("mm-hit");
  out.textContent = hits.length ? `${hits.length} found` : "Nothing found";
  // each match with its path through the map, to jump straight to it
  const path = (id) => { const p = []; for (let x = open.parentOf.get(id); x && open.parentOf.get(x); x = open.parentOf.get(x)) p.unshift(open.byId.get(x).topic); return p.join(" › "); };
  open.overlay.querySelector(".mm-results").innerHTML = hits.slice(0, 8).map((n) => `<li role="option"><button type="button" data-jump="${esc(n.id)}"><b>${esc(n.topic)}</b>${path(n.id) ? `<span>${esc(path(n.id))}</span>` : ""}</button></li>`).join("");
  const first = hits[0] && mind.findEle(hits[0].id);
  if (first) { try { mind.selectNode(first); mind.scrollIntoView?.(first); } catch { /* fine */ } }
}

function menu(show) {
  const m = open.overlay.querySelector(".mm-menu"), b = open.overlay.querySelector('[data-act="export"]');
  m.hidden = !show; b?.setAttribute("aria-expanded", String(show));
  if (show) m.querySelector("button")?.focus();
}

// the map as an outline (a text tree), for reading, screen readers and small screens (SiYuan and minder offer the same)
function outline(show) {
  const o = open.overlay.querySelector(".mm-outline"), b = open.overlay.querySelector('[data-act="outline"]');
  o.hidden = !show; b?.setAttribute("aria-pressed", String(show)); open.overlay.classList.toggle("outlining", show);
  if (!show) return;
  const m = open.r.maps[open.i];
  const li = (n, d) => `<li class="d${d}"><span class="mm-o-t">${n.icon ? `${n.icon} ` : ""}${esc(n.topic)}${n.kind && KIND[n.kind] && !["section", "group", "point", "para"].includes(n.kind) ? ` <em>${esc(KIND[n.kind])}</em>` : ""}</span>${n.detail && plain(n.detail) !== n.topic ? `<p>${esc(n.detail)}</p>` : ""}${n.children.length ? `<ul>${n.children.map((c) => li(c, d + 1)).join("")}</ul>` : ""}</li>`;
  o.innerHTML = `<h3>${esc(m.root.topic)}</h3><p class="mm-o-sub">Map ${m.n}: ${esc(m.title)}</p><ul class="mm-o-root">${m.root.children.map((c) => li(c, 1)).join("")}</ul>`;
  o.focus();
}

// select a node by id: open the branches above it, select it and bring it into view
function select(id) {
  const mind = open.mind;
  for (let p = open.parentOf.get(id); p; p = open.parentOf.get(p)) { const el = mind.findEle(p); if (el?.nodeObj?.expanded === false) mind.expandNode(el, true); }
  const el = mind.findEle(id); if (!el) return;
  mind.selectNode(el);
  // a read-only map has no selection tool, so mark and show it here too
  if (open.sel !== id) {
    mind.nodes.querySelectorAll(".me-tpc.selected").forEach((t) => t.classList.remove("selected"));
    el.classList.add("selected"); open.sel = id; panel(open.byId.get(id));
  }
}

// arrow keys between ideas (as in minder): → or Enter to a child, ← to the parent, ↑ ↓ between siblings
function navigate(e) {
  if (!open.mind || open.overlay.classList.contains("outlining")) return;
  const root = open.r.maps[open.i].root;
  const id = open.sel || root.id, n = open.byId.get(id), parent = open.byId.get(open.parentOf.get(id));
  let to = null;
  if (e.key === "ArrowRight" || e.key === "Enter") to = n.children[0]?.id;
  else if (e.key === "ArrowLeft") to = parent?.id;
  else if (parent && (e.key === "ArrowDown" || e.key === "ArrowUp")) { const sib = parent.children, k = sib.findIndex((c) => c.id === id); to = sib[k + (e.key === "ArrowDown" ? 1 : -1)]?.id; }
  if (!open.sel) to = root.id;
  if (to) { e.preventDefault(); select(to); }
}

// a minimap of the whole map with the visible area outlined (the "fovea map" idea from void-oculus, MIT); click to move
function minimap() {
  const box = open?.overlay.querySelector(".mm-mini"); if (!box || box.offsetParent === null || !open.mind) return;
  const mind = open.mind, k = mind.scaleVal || 1, hb = mind.nodes.getBoundingClientRect();
  if (!open.mini) {
    const rects = [...mind.nodes.querySelectorAll(".me-tpc")].map((t) => t.getBoundingClientRect()).filter((r) => r.width)
      .map((r) => ({ x: (r.left - hb.left) / k, y: (r.top - hb.top) / k, w: r.width / k, h: r.height / k }));
    if (!rects.length) return;
    const x0 = Math.min(...rects.map((r) => r.x)) - 20, y0 = Math.min(...rects.map((r) => r.y)) - 20, x1 = Math.max(...rects.map((r) => r.x + r.w)) + 20, y1 = Math.max(...rects.map((r) => r.y + r.h)) + 20;
    open.mini = { x0, y0, w: x1 - x0, h: y1 - y0, rects };
  }
  const M = open.mini, view = open.overlay.querySelector(".mm-canvas").getBoundingClientRect();
  const v = { x: (view.left - hb.left) / k, y: (view.top - hb.top) / k, w: view.width / k, h: view.height / k };
  box.querySelector("svg").setAttribute("viewBox", `${M.x0} ${M.y0} ${M.w} ${M.h}`);
  box.querySelector("svg").innerHTML = `${M.rects.map((r) => `<rect x="${r.x.toFixed(0)}" y="${r.y.toFixed(0)}" width="${r.w.toFixed(0)}" height="${r.h.toFixed(0)}" rx="6"/>`).join("")}<rect class="mm-view" x="${v.x.toFixed(0)}" y="${v.y.toFixed(0)}" width="${v.w.toFixed(0)}" height="${v.h.toFixed(0)}" rx="10" vector-effect="non-scaling-stroke"/>`;
}
function miniJump(e) {
  const M = open.mini, svg = open.overlay.querySelector(".mm-mini svg"); if (!M) return;
  const r = svg.getBoundingClientRect(), s = Math.min(r.width / M.w, r.height / M.h), ox = r.left + (r.width - M.w * s) / 2, oy = r.top + (r.height - M.h * s) / 2;
  const px = M.x0 + (e.clientX - ox) / s, py = M.y0 + (e.clientY - oy) / s;
  const mind = open.mind, k = mind.scaleVal || 1, hb = mind.nodes.getBoundingClientRect(), view = open.overlay.querySelector(".mm-canvas").getBoundingClientRect();
  mind.move(view.left + view.width / 2 - (hb.left + px * k), view.top + view.height / 2 - (hb.top + py * k));
}

/** A map as Markdown that Markmap renders as a mind map (and any notes app reads as an outline). */
export function toMarkdown(m, lesson) {
  const out = [`---`, `title: ${lesson.replace(/\n/g, " ")} · ${m.title}`, `markmap:`, `  colorFreezeLevel: 2`, `  initialExpandLevel: 3`, `---`, ``, `# ${m.root.topic}`, ``];
  const line = (n, d) => {
    const text = `${n.icon ? `${n.icon} ` : ""}${n.topic}${n.detail && plain(n.detail) !== n.topic ? `: ${n.detail}` : ""}`.replace(/\s+/g, " ");
    out.push(d === 1 ? `## ${text}` : `${"  ".repeat(d - 2)}- ${text}`);
    n.children.forEach((c) => line(c, d + 1));
    if (d === 1) out.push("");
  };
  m.root.children.forEach((c) => line(c, 1));
  return out.join("\n");
}
/** A map as OPML 2.0, the outline format most outliners and mind map apps import (minder does too). */
export function toOpml(m, lesson) {
  const x = esc; // XML needs the same five escapes
  const node = (n, d) => `${"  ".repeat(d)}<outline text="${x(n.topic)}"${n.detail && plain(n.detail) !== n.topic ? ` _note="${x(n.detail)}"` : ""}${n.children.length ? `>\n${n.children.map((c) => node(c, d + 1)).join("\n")}\n${"  ".repeat(d)}</outline>` : "/>"}`;
  return `<?xml version="1.0" encoding="UTF-8"?>\n<opml version="2.0">\n  <head><title>${x(lesson)}: ${x(m.title)}</title></head>\n  <body>\n${node(m.root, 2)}\n  </body>\n</opml>\n`;
}

function setPresent(on) {
  const b = open.overlay.querySelector('[data-act="present"]');
  open.overlay.classList.toggle("presenting", on); b?.setAttribute("aria-pressed", String(on));
  if (on) open.overlay.requestFullscreen?.().catch(() => {}); else if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  requestAnimationFrame(() => { try { fit(); } catch { /* fine */ } });
}

async function onClick(e) {
  const seg = e.target.closest(".mm-select [data-map]");
  if (seg) { await show(+seg.dataset.map); return; }
  const jump = e.target.closest("[data-jump]");
  if (jump) { select(jump.dataset.jump); return; }
  const b = e.target.closest("[data-act]");
  if (!b) { if (!e.target.closest(".mm-menu")) menu(false); if (e.target.closest(".mm-mini")) miniJump(e); return; }
  const mind = open.mind, act = b.dataset.act;
  if (act !== "export") menu(false);
  if (act === "export") return menu(open.overlay.querySelector(".mm-menu").hidden);
  if (act === "outline") return outline(open.overlay.querySelector(".mm-outline").hidden);
  if (act === "md") return download(new Blob([toMarkdown(open.r.maps[open.i], plain(open.L.title))], { type: "text/markdown" }), "md");
  if (act === "opml") return download(new Blob([toOpml(open.r.maps[open.i], plain(open.L.title))], { type: "text/x-opml" }), "opml");
  if (act === "focus" && open.sel) { mind.focusNode(mind.findEle(open.sel)); open.focused = true; requestAnimationFrame(() => fit()); panel(open.byId.get(open.sel)); return; }
  if (act === "unfocus") { mind.cancelFocus(); open.focused = false; requestAnimationFrame(() => fit()); panel(open.sel ? open.byId.get(open.sel) : null); return; }
  if (act === "close") return close();
  if (act === "unselect") { mind?.clearSelection?.(); panel(null); return; }
  if (!mind) return;
  if (act === "in") mind.scale(Math.min(3, mind.scaleVal * 1.25));
  else if (act === "out") mind.scale(Math.max(0.15, mind.scaleVal / 1.25));
  else if (act === "fit") fit();
  else if (act === "centre") mind.toCenter();
  else if (act === "expand") { mind.expandNodeAll?.(true); requestAnimationFrame(() => fit()); }
  else if (act === "collapse") { mind.expandNodeAll?.(false); mind.expandNode?.(mind.findEle(open.r.maps[open.i].root.id), true); requestAnimationFrame(() => fit()); }
  else if (act === "search") { const f = open.overlay.querySelector(".mm-search"); f.hidden = !f.hidden; b.setAttribute("aria-pressed", String(!f.hidden)); if (!f.hidden) f.querySelector("input").focus(); else search(""); }
  else if (act === "present") setPresent(!open.overlay.classList.contains("presenting"));
  else if (act === "svg") download(new Blob([toSvg(scene(mind))], { type: "image/svg+xml" }), "svg");
  if (["expand", "collapse"].includes(act)) requestAnimationFrame(() => { open.mini = null; minimap(); });
  else if (act === "png") { b.disabled = true; try { download(await toPng(scene(mind)), "png"); } finally { b.disabled = false; } }
}

function close() {
  if (!open) return;
  removeEventListener("keydown", open.onKey);
  if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  open.mind?.destroy?.();
  open.overlay.remove();
  document.documentElement.classList.remove("mm-open");
  history.replaceState(null, "", open.prevHash || location.pathname);
  open = null;
}

// ---------- export ----------
// The laid-out map as shapes in its own coordinates (independent of the current zoom): every branch path and every node
// box with its fill, border and text lines, measured from what Mind Elixir drew.
export function scene(mind) {
  const host = mind.nodes, k = mind.scaleVal || 1, hb = host.getBoundingClientRect();
  const layer = mind.map || host;   // branch lines are with the nodes; links (arrows) and their labels sit beside them
  const at = (r) => ({ x: (r.left - hb.left) / k, y: (r.top - hb.top) / k, w: r.width / k, h: r.height / k });
  const paths = [];
  layer.querySelectorAll("svg").forEach((svg) => {
    const sb = at(svg.getBoundingClientRect()), vb = svg.viewBox?.baseVal;
    const ox = sb.x - (vb && vb.width ? vb.x : 0), oy = sb.y - (vb && vb.height ? vb.y : 0);
    svg.querySelectorAll("path").forEach((p) => {
      const cs = getComputedStyle(p), d = p.getAttribute("d");
      if (!d || cs.display === "none" || cs.visibility === "hidden" || p.closest("[style*='display: none']")) return;
      paths.push({ d, dx: ox, dy: oy, stroke: p.getAttribute("stroke") || cs.stroke, width: parseFloat(p.getAttribute("stroke-width") || cs.strokeWidth) || 2, fill: p.getAttribute("fill") || "none", dash: p.getAttribute("stroke-dasharray") || (cs.strokeDasharray !== "none" ? cs.strokeDasharray : null) });
    });
  });
  const boxes = [];
  host.querySelectorAll(".me-tpc").forEach((t) => {
    if (!t.offsetParent && t.getClientRects().length === 0) return;   // inside a collapsed branch
    const b = at(t.getBoundingClientRect()), cs = getComputedStyle(t);
    // the text's own lines, as the browser wrapped them
    const lines = [], range = document.createRange(), tw = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) {
      if (!n.textContent.trim() || n.parentElement.closest(".tags")) continue;
      const ws = [...n.textContent.matchAll(/\S+/g)];
      for (const w of ws) {
        range.setStart(n, w.index); range.setEnd(n, w.index + w[0].length);
        const r = range.getClientRects()[0]; if (!r) continue;
        const p = at(r), last = lines.at(-1);
        if (last && Math.abs(last.y - p.y) < p.h / 2) { last.text += ` ${w[0]}`; last.x2 = p.x + p.w; } else lines.push({ text: w[0], x: p.x, x2: p.x + p.w, y: p.y, h: p.h });
      }
    }
    const tag = t.querySelector(".tags span"), gi = t.querySelector(".g3d");
    // a glass icon: its colours, where its pane sits and its symbol, drawn again in the export
    const icon = gi ? { ...at(gi.querySelector(".g3d-pane").getBoundingClientRect()), a: gi.style.getPropertyValue("--a"), b: gi.style.getPropertyValue("--b"), svg: gi.querySelector("svg").innerHTML } : null;
    boxes.push({ ...b, r: parseFloat(cs.borderTopLeftRadius) || 0, fill: cs.backgroundColor, stroke: cs.borderTopColor, sw: parseFloat(cs.borderTopWidth) || 0,
      color: cs.color, font: `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`, size: parseFloat(cs.fontSize), weight: cs.fontWeight, family: cs.fontFamily, italic: cs.fontStyle === "italic", lines,
      icon, tag: tag ? { text: tag.textContent, ...at(tag.getBoundingClientRect()), fill: getComputedStyle(tag).backgroundColor, color: getComputedStyle(tag).color } : null });
  });
  // link labels: text placed beside the links
  layer.querySelectorAll(".label-container > *").forEach((lab) => {
    const r = lab.getBoundingClientRect(); if (!r.width || !lab.textContent.trim()) return;
    const b = at(r), cs = getComputedStyle(lab);
    boxes.push({ ...b, r: 6, fill: cs.backgroundColor, stroke: "transparent", sw: 0, color: cs.color, font: `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`, size: parseFloat(cs.fontSize), weight: cs.fontWeight, family: cs.fontFamily, italic: false,
      lines: [{ text: lab.textContent.trim(), x: b.x + (b.w - lab.textContent.trim().length * parseFloat(cs.fontSize) * 0.5) / 2, y: b.y, h: b.h }], tag: null });
  });
  // the extent of everything drawn, with room around it
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const b of boxes) { x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y); x1 = Math.max(x1, b.x + b.w); y1 = Math.max(y1, b.y + b.h); }
  const pad = 48;
  const dark = document.documentElement.dataset.theme !== "light";
  return { x: x0 - pad, y: y0 - pad, w: x1 - x0 + pad * 2, h: y1 - y0 + pad * 2, paths, boxes, bg: dark ? "#0b0b10" : "#f6f6fa", title: plain(open?.L?.title || ""), map: open?.r?.maps[open.i]?.title || "" };
}

const visible = (c) => c && c !== "transparent" && !/rgba\([^)]*,\s*0\)$/.test(c);
/** A standalone, scalable SVG of the map. */
export function toSvg(s) {
  const t = (x) => esc(x);
  const parts = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${s.x.toFixed(1)} ${s.y.toFixed(1)} ${s.w.toFixed(1)} ${s.h.toFixed(1)}" width="${Math.round(s.w)}" height="${Math.round(s.h)}">`,
    `<title>${t(s.title)}: ${t(s.map)}</title>`, `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" fill="${s.bg}"/>`];
  for (const p of s.paths) parts.push(`<path d="${t(p.d)}" transform="translate(${p.dx.toFixed(2)} ${p.dy.toFixed(2)})" fill="${t(p.fill)}" stroke="${t(p.stroke)}" stroke-width="${p.width}"${p.dash ? ` stroke-dasharray="${t(p.dash)}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`);
  for (const b of s.boxes) {
    if (visible(b.fill) || (b.sw && visible(b.stroke))) parts.push(`<rect x="${b.x.toFixed(1)}" y="${b.y.toFixed(1)}" width="${b.w.toFixed(1)}" height="${b.h.toFixed(1)}" rx="${b.r}" fill="${visible(b.fill) ? b.fill : "none"}"${b.sw && visible(b.stroke) ? ` stroke="${b.stroke}" stroke-width="${b.sw}"` : ""}/>`);
    if (b.icon) {
      const ic = b.icon, gid = `g${parts.length}`;
      parts.push(`<defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t(ic.a)}"/><stop offset="1" stop-color="${t(ic.b)}"/></linearGradient></defs><rect x="${ic.x.toFixed(1)}" y="${ic.y.toFixed(1)}" width="${ic.w.toFixed(1)}" height="${ic.h.toFixed(1)}" rx="${(ic.w * 0.26).toFixed(1)}" fill="url(#${gid})"/><rect x="${ic.x.toFixed(1)}" y="${ic.y.toFixed(1)}" width="${ic.w.toFixed(1)}" height="${ic.h.toFixed(1)}" rx="${(ic.w * 0.26).toFixed(1)}" fill="#fff" fill-opacity=".14" stroke="#fff" stroke-opacity=".5" stroke-width="1"/><svg x="${(ic.x + ic.w * 0.18).toFixed(1)}" y="${(ic.y + ic.h * 0.18).toFixed(1)}" width="${(ic.w * 0.64).toFixed(1)}" height="${(ic.h * 0.64).toFixed(1)}" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ic.svg}</svg>`);
    }
    for (const l of b.lines) parts.push(`<text x="${l.x.toFixed(1)}" y="${(l.y + l.h * 0.78).toFixed(1)}" fill="${b.color}" font-family="${t(b.family)}" font-size="${b.size}" font-weight="${b.weight}"${b.italic ? ' font-style="italic"' : ""}>${t(l.text)}</text>`);
    if (b.tag) parts.push(`<rect x="${b.tag.x.toFixed(1)}" y="${b.tag.y.toFixed(1)}" width="${b.tag.w.toFixed(1)}" height="${b.tag.h.toFixed(1)}" rx="${(b.tag.h / 2).toFixed(1)}" fill="${b.tag.fill}"/><text x="${(b.tag.x + b.tag.w / 2).toFixed(1)}" y="${(b.tag.y + b.tag.h * 0.72).toFixed(1)}" text-anchor="middle" fill="${b.tag.color}" font-family="${t(b.family)}" font-size="${(b.tag.h * 0.62).toFixed(1)}">${t(b.tag.text)}</text>`);
  }
  parts.push("</svg>");
  return parts.join("\n");
}

/** The map drawn onto a 3840 × 2160 canvas, fitted and centred with a margin: a 4K PNG. */
export async function toPng(s, { width = 3840, height = 2160 } = {}) {
  await document.fonts?.ready;
  const c = document.createElement("canvas"); c.width = width; c.height = height;
  const g = c.getContext("2d");
  g.fillStyle = s.bg; g.fillRect(0, 0, width, height);
  const margin = 120, k = Math.min((width - margin * 2) / s.w, (height - margin * 2) / s.h);
  g.translate((width - s.w * k) / 2 - s.x * k, (height - s.h * k) / 2 - s.y * k);
  g.scale(k, k);
  g.lineCap = "round"; g.lineJoin = "round";
  const symbols = await Promise.all(s.boxes.filter((b) => b.icon).map((b) => new Promise((ok) => {
    const img = new Image(); img.onload = () => ok([b, img]); img.onerror = () => ok([b, null]);
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${Math.round(b.icon.w * 0.64 * k)}" height="${Math.round(b.icon.h * 0.64 * k)}" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${b.icon.svg}</svg>`)}`;
  })));
  const symbolOf = new Map(symbols);
  for (const p of s.paths) { g.save(); g.translate(p.dx, p.dy); g.strokeStyle = p.stroke; g.lineWidth = p.width; g.setLineDash(p.dash ? p.dash.split(/[\s,]+/).map(Number).filter((x) => !isNaN(x)) : []); const path = new Path2D(p.d); if (visible(p.fill) && p.fill !== "none") { g.fillStyle = p.fill; g.fill(path); } g.stroke(path); g.restore(); }
  for (const b of s.boxes) {
    if (visible(b.fill)) { g.fillStyle = b.fill; g.beginPath(); g.roundRect(b.x, b.y, b.w, b.h, b.r); g.fill(); }
    if (b.sw && visible(b.stroke)) { g.strokeStyle = b.stroke; g.lineWidth = b.sw; g.beginPath(); g.roundRect(b.x, b.y, b.w, b.h, b.r); g.stroke(); }
    if (b.icon) {
      const ic = b.icon, grad = g.createLinearGradient(ic.x, ic.y, ic.x + ic.w, ic.y + ic.h);
      grad.addColorStop(0, ic.a || "#4641ff"); grad.addColorStop(1, ic.b || "#8b3dff");
      g.fillStyle = grad; g.beginPath(); g.roundRect(ic.x, ic.y, ic.w, ic.h, ic.w * 0.26); g.fill();
      g.fillStyle = "rgba(255,255,255,.14)"; g.fill(); g.strokeStyle = "rgba(255,255,255,.5)"; g.lineWidth = 1; g.stroke();
      const img = symbolOf.get(b); if (img) g.drawImage(img, ic.x + ic.w * 0.18, ic.y + ic.h * 0.18, ic.w * 0.64, ic.h * 0.64);
    }
    g.fillStyle = b.color; g.font = b.font; g.textBaseline = "alphabetic";
    for (const l of b.lines) g.fillText(l.text, l.x, l.y + l.h * 0.78);
    if (b.tag) { g.fillStyle = b.tag.fill; g.beginPath(); g.roundRect(b.tag.x, b.tag.y, b.tag.w, b.tag.h, b.tag.h / 2); g.fill(); g.fillStyle = b.tag.color; g.font = `${(b.tag.h * 0.62).toFixed(1)}px ${b.family}`; g.textAlign = "center"; g.fillText(b.tag.text, b.tag.x + b.tag.w / 2, b.tag.y + b.tag.h * 0.72); g.textAlign = "start"; }
  }
  // a quiet caption, so the image says what it is when shared
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.fillStyle = s.bg === "#0b0b10" ? "rgba(255,255,255,.55)" : "rgba(20,20,31,.55)"; g.font = `500 34px ${s.boxes[0]?.family || "sans-serif"}`;
  g.fillText(`${s.title} · ${s.map} · Gradify`, margin, height - 56);
  return new Promise((ok) => c.toBlob(ok, "image/png"));
}

function download(blob, ext) {
  const a = document.createElement("a"), slug = (x) => x.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  a.href = URL.createObjectURL(blob);
  a.download = `${slug(plain(open.L.title))}-map-${open.r.maps[open.i].n}-${slug(open.r.maps[open.i].title)}${ext === "png" ? "-4k" : ""}.${ext}`;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

export { MAPS };
