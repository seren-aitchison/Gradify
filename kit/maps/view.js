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

const here = new URL(".", import.meta.url);
const vendor = (p) => new URL(`../vendor/${p}`, here).href;
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// a branch colour for each main branch: Gradify's spectrum, readable on light and dark
export const PALETTE = ["#4641ff", "#e5307a", "#ff6a00", "#13a37a", "#8c27ca", "#2f7fd8", "#d99a00", "#e04848"];
const KIND = { term: "Term", step: "Step", example: "Example", equation: "Formula", key: "Key point", pitfall: "Common mistake", case: "Case", law: "Legislation",
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
      <span class="mm-n">Map ${m.n}</span><b>${esc(m.title)}</b><span class="mm-purpose">${esc(m.purpose)}</span>
      <span class="mm-scope">${m.limited ? "Little of this in the lesson" : `${m.nodes - 1} ideas · ${m.root.children.length} branches`}</span>
    </button>`).join("")}</div>
  </section>`;
}

/** Wire the previews in `root` to open the viewer. */
export function wireMaps(root, L, o = {}) {
  root.querySelectorAll("[data-open-map]").forEach((b) => b.addEventListener("click", () => openMap(L, +b.dataset.openMap, o)));
  const m = location.hash.match(/\/map\/([1-5])$/);
  if (m) openMap(L, +m[1] - 1, o);
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
    if (!document.querySelector("script[data-liquid-glass]")) { const s = document.createElement("script"); s.src = vendor("liquid-glass/liquid-glass.js"); s.defer = true; s.dataset.liquidGlass = ""; document.head.append(s); }
    return { MindElixir };
  })());
}

// ---------- the viewer ----------
const I = {
  out: '<path d="M5 12h14"/>', in: '<path d="M12 5v14M5 12h14"/>', fit: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>', centre: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
  expand: '<path d="M7 10l5 5 5-5"/><path d="M7 4l5 5 5-5"/>', collapse: '<path d="M7 14l5-5 5 5"/><path d="M7 20l5-5 5 5"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  svg: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>', png: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/>', present: '<path d="M3 4h18v12H3zM12 16v4M8 20h8"/>', close: '<path d="M6 6l12 12M18 6 6 18"/>',
};
const icon = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const btn = (k, label, extra = "") => `<button class="glass-toolbar__btn" type="button" data-act="${k}" aria-label="${label}" title="${label}" ${extra}>${icon(k)}</button>`;

let open = null;   // the open viewer: { overlay, mind, ... }

/** Open map `i` (0–4) of a lesson in the immersive viewer. */
export async function openMap(L, i = 0, o = {}) {
  const r = mapsFor(L, o);
  if (open) close();
  const overlay = document.createElement("div");
  overlay.className = "mm-viewer";
  // the glass follows Gradify's theme, not only the system's (Liquid Glass Components: data-glass-scheme)
  overlay.dataset.glassScheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  overlay.setAttribute("role", "dialog"); overlay.setAttribute("aria-modal", "true"); overlay.setAttribute("aria-label", `Mind maps: ${plain(L.title)}`);
  overlay.innerHTML = `
    <div class="mm-stage"><div class="mm-canvas" tabindex="0" aria-label="Mind map. Drag to move, scroll or pinch to zoom."></div></div>
    <header class="mm-top">
      <div class="mm-title"><span class="kicker">${esc(o.kicker || "Mind maps")}</span><h2>${esc(plain(L.title))}</h2></div>
      <div class="glass-segmented mm-select" role="radiogroup" aria-label="Choose a map" data-refract>${r.maps.map((m, k) => `<button class="glass-segmented__option" type="button" role="radio" aria-checked="${k === i}" data-map="${k}" title="${esc(m.title)}"><span class="mm-seg-n">${m.n}</span><span class="mm-seg-t">${esc(m.title)}</span></button>`).join("")}</div>
    </header>
    <div class="glass-toolbar mm-tools" role="toolbar" aria-label="Map controls" data-refract>
      ${btn("out", "Zoom out")}${btn("in", "Zoom in")}${btn("fit", "Fit to screen")}${btn("centre", "Centre")}
      <span class="glass-toolbar__divider" aria-hidden="true"></span>
      ${btn("expand", "Expand all")}${btn("collapse", "Collapse to main branches")}${btn("search", "Search this map", 'aria-pressed="false"')}
      <span class="glass-toolbar__divider" aria-hidden="true"></span>
      ${btn("svg", "Export SVG")}${btn("png", "Export 4K PNG (3840 × 2160)")}${btn("present", "Presentation mode", 'aria-pressed="false"')}${btn("close", "Close")}
    </div>
    <form class="glass-search mm-search" role="search" hidden><svg class="glass-search__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input class="glass-search__input" type="search" placeholder="Find a concept" aria-label="Find a concept in this map"><span class="mm-hits" aria-live="polite"></span></form>
    <aside class="glass-surface mm-panel" aria-live="polite" hidden></aside>
    <p class="mm-purpose-line" aria-live="polite"></p>`;
  document.body.append(overlay);
  document.documentElement.classList.add("mm-open");
  const prevHash = location.hash.replace(/\/map\/[1-5]$/, "");
  open = { overlay, L, o, r, i, prevHash, mind: null, byId: new Map(), onKey: null };
  open.onKey = (e) => { if (e.key === "Escape") { if (overlay.classList.contains("presenting")) setPresent(false); else close(); } };
  addEventListener("keydown", open.onKey);
  overlay.addEventListener("click", onClick);
  overlay.querySelector(".mm-search").addEventListener("submit", (e) => e.preventDefault());
  overlay.querySelector(".mm-search input").addEventListener("input", (e) => search(e.target.value));
  try { await show(i); }
  catch (e) { console.error("mind map", e); overlay.querySelector(".mm-canvas").innerHTML = `<p class="mm-error">This map couldn't be drawn. Please try again.</p>`; }
  overlay.querySelector(".mm-select [aria-checked='true']")?.focus();
}

function toElixir(n, depth, color, big) {
  open.byId.set(n.id, n);
  return {
    id: n.id, topic: n.topic, expanded: !(big && depth >= 2 && n.children.length),
    ...(depth === 1 ? { branchColor: color } : {}),
    ...(n.kind === "limit" ? { style: { color: "var(--mm-mute)", fontStyle: "italic" } } : {}),
    ...(["pitfall"].includes(n.kind) ? { tags: ["Mistake"] } : n.kind === "equation" ? { tags: ["Formula"] } : n.kind === "term" ? { tags: ["Term"] } : {}),
    children: n.children.map((c, k) => toElixir(c, depth + 1, depth === 0 ? PALETTE[k % PALETTE.length] : color, big)),
  };
}

async function show(i) {
  const { MindElixir } = await loadLibs();
  const m = open.r.maps[i];
  open.i = i; open.byId.clear();
  open.overlay.querySelectorAll(".mm-select [data-map]").forEach((b) => b.setAttribute("aria-checked", String(+b.dataset.map === i)));
  open.overlay.querySelector(".mm-purpose-line").textContent = `Map ${m.n}: ${m.purpose}`;
  history.replaceState(null, "", `${open.prevHash}/map/${i + 1}`);
  open.mind?.destroy?.();
  const el = open.overlay.querySelector(".mm-canvas");
  el.innerHTML = "";
  const dark = document.documentElement.dataset.theme !== "light";
  const mind = new MindElixir({
    el, direction: MindElixir.SIDE, editable: false, contextMenu: false, toolBar: false, keypress: false, allowUndo: false,
    overflowHidden: false, alignment: "root", scaleMin: 0.15, scaleMax: 3,
    theme: { name: "Gradify", type: dark ? "dark" : "light", palette: PALETTE, cssVar: dark
      ? { "--main-color": "#f3f3f7", "--main-bgcolor": "#17171f", "--color": "#e4e4ec", "--bgcolor": "transparent", "--root-color": "#0b0b10", "--root-bgcolor": "#ffffff", "--root-border-color": "transparent", "--selected": "#f055dd", "--accent-color": "#f055dd", "--panel-color": "#fff", "--panel-bgcolor": "#17171f", "--main-radius": "14px", "--root-radius": "18px", "--topic-padding": "4px 6px" }
      : { "--main-color": "#16162a", "--main-bgcolor": "#ffffff", "--color": "#2a2a3c", "--bgcolor": "transparent", "--root-color": "#ffffff", "--root-bgcolor": "#14141f", "--root-border-color": "transparent", "--selected": "#d0249b", "--accent-color": "#d0249b", "--panel-color": "#14141f", "--panel-bgcolor": "#fff", "--main-radius": "14px", "--root-radius": "18px", "--topic-padding": "4px 6px" } },
  });
  mind.init({ nodeData: toElixir(m.root, 0, null, m.nodes > 60) });
  mind.bus.addListener("selectNodes", (nodes) => panel(nodes?.[0] ? open.byId.get(nodes[0].id) : null));
  mind.bus.addListener("unselectNodes", () => panel(null));
  open.mind = mind;
  panel(null);
  requestAnimationFrame(() => { try { fit(mind); } catch { /* an empty map */ } });
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
  const e = extent(); if (!isFinite(e.w) || !e.w) return;
  mind.move(area.x + area.w / 2 - (e.x + e.w / 2), area.y + area.h / 2 - (e.y + e.h / 2));
}

function panel(n) {
  const p = open.overlay.querySelector(".mm-panel");
  if (!n || n.kind === "root") { p.hidden = true; return; }
  p.hidden = false;
  p.innerHTML = `<span class="mm-kind">${esc(KIND[n.kind] || "Idea")}</span><h3>${esc(n.topic)}</h3>${n.detail && plain(n.detail) !== n.topic ? `<p>${esc(n.detail)}</p>` : ""}${n.children.length ? `<p class="mm-more">${n.children.length} ${n.children.length === 1 ? "branch" : "branches"} below</p>` : ""}<button type="button" class="mm-x" data-act="unselect" aria-label="Close details">${icon("close")}</button>`;
}

// ---------- search: highlight matches and open the branches they're in ----------
function search(q) {
  const out = open.overlay.querySelector(".mm-hits"), needle = q.trim().toLowerCase();
  const mind = open.mind;
  open.overlay.querySelectorAll(".mm-hit").forEach((e) => e.classList.remove("mm-hit"));
  if (!mind || needle.length < 2) { out.textContent = ""; return; }
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
  const first = hits[0] && mind.findEle(hits[0].id);
  if (first) { try { mind.selectNode(first); mind.scrollIntoView?.(first); } catch { /* fine */ } }
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
  const b = e.target.closest("[data-act]"); if (!b) return;
  const mind = open.mind, act = b.dataset.act;
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
  const at = (r) => ({ x: (r.left - hb.left) / k, y: (r.top - hb.top) / k, w: r.width / k, h: r.height / k });
  const paths = [];
  host.querySelectorAll("svg").forEach((svg) => {
    const sb = at(svg.getBoundingClientRect()), vb = svg.viewBox?.baseVal;
    const ox = sb.x - (vb && vb.width ? vb.x : 0), oy = sb.y - (vb && vb.height ? vb.y : 0);
    svg.querySelectorAll("path").forEach((p) => {
      const cs = getComputedStyle(p), d = p.getAttribute("d");
      if (!d || cs.display === "none" || cs.visibility === "hidden" || p.closest("[style*='display: none']")) return;
      paths.push({ d, dx: ox, dy: oy, stroke: p.getAttribute("stroke") || cs.stroke, width: parseFloat(p.getAttribute("stroke-width") || cs.strokeWidth) || 2, fill: p.getAttribute("fill") || "none" });
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
    const tag = t.querySelector(".tags span");
    boxes.push({ ...b, r: parseFloat(cs.borderTopLeftRadius) || 0, fill: cs.backgroundColor, stroke: cs.borderTopColor, sw: parseFloat(cs.borderTopWidth) || 0,
      color: cs.color, font: `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`, size: parseFloat(cs.fontSize), weight: cs.fontWeight, family: cs.fontFamily, italic: cs.fontStyle === "italic", lines,
      tag: tag ? { text: tag.textContent, ...at(tag.getBoundingClientRect()), fill: getComputedStyle(tag).backgroundColor, color: getComputedStyle(tag).color } : null });
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
  for (const p of s.paths) parts.push(`<path d="${t(p.d)}" transform="translate(${p.dx.toFixed(2)} ${p.dy.toFixed(2)})" fill="${t(p.fill)}" stroke="${t(p.stroke)}" stroke-width="${p.width}" stroke-linecap="round" stroke-linejoin="round"/>`);
  for (const b of s.boxes) {
    if (visible(b.fill) || (b.sw && visible(b.stroke))) parts.push(`<rect x="${b.x.toFixed(1)}" y="${b.y.toFixed(1)}" width="${b.w.toFixed(1)}" height="${b.h.toFixed(1)}" rx="${b.r}" fill="${visible(b.fill) ? b.fill : "none"}"${b.sw && visible(b.stroke) ? ` stroke="${b.stroke}" stroke-width="${b.sw}"` : ""}/>`);
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
  for (const p of s.paths) { g.save(); g.translate(p.dx, p.dy); g.strokeStyle = p.stroke; g.lineWidth = p.width; const path = new Path2D(p.d); if (visible(p.fill) && p.fill !== "none") { g.fillStyle = p.fill; g.fill(path); } g.stroke(path); g.restore(); }
  for (const b of s.boxes) {
    if (visible(b.fill)) { g.fillStyle = b.fill; g.beginPath(); g.roundRect(b.x, b.y, b.w, b.h, b.r); g.fill(); }
    if (b.sw && visible(b.stroke)) { g.strokeStyle = b.stroke; g.lineWidth = b.sw; g.beginPath(); g.roundRect(b.x, b.y, b.w, b.h, b.r); g.stroke(); }
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
