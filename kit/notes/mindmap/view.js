// Spidermap view: an interactive, liquid-glass canvas for the map built in model.js.
//   pan (drag the background), zoom (Ctrl/⌘ + scroll, pinch, or the buttons), drag any node and its arm comes with it,
//   double-click to rename, add your own notes, collapse arms, switch layouts, hide definitions to test yourself,
//   and Gradify Intelligence beside it: what to learn first, links between terms, and what's easy to mix up.
// Positions, edits and settings are kept per set of notes in this browser (localStorage), so the map stays yours.
//
// mountMindMap(el, { pack, learnt, questions, esc, onLearn, toast }) → { destroy }
import { icon } from "../../core/icons.js";
import { NODE_TYPES, GLYPHS, LAYOUTS, DEFAULTS } from "./config.js";
import { buildMap, descendants, newId, mapKey } from "./model.js";
import { layout, bounds } from "./layout.js";
import { insights } from "./intel.js";

export const ico = (n, cls = "") => (GLYPHS[n]
  ? `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${GLYPHS[n]}</svg>`
  : icon(n, cls));

// the stylesheet travels with the module, so any page that shows the map gets its look
export function loadMindMapCss() {
  if (typeof document === "undefined" || document.querySelector("link[data-smap]")) return;
  const l = document.createElement("link");
  l.rel = "stylesheet"; l.href = new URL("./mindmap.css", import.meta.url).href; l.dataset.smap = "";
  document.head.append(l);
}

const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)) || null; } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode: the map still works, it just won't remember */ } },
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (t) => 1 - Math.pow(1 - t, 3);
const TYPE_NAME = { root: "Your notes", topic: "Topic", term: "Key term", eq: "Formula", note: "Your note" };

export function mountMindMap(el, { pack, learnt = new Set(), questions = [], esc = (s) => String(s), onLearn = () => {}, toast = () => {} }) {
  loadMindMapCss();
  const key = DEFAULTS.storageKey + mapKey(pack);
  const saved = store.get(key) || {};
  const S = {
    layout: LAYOUTS.some((l) => l.id === saved.layout) ? saved.layout : DEFAULTS.layout,
    saved: saved.saved || {},                       // positions the learner dragged, per layout
    collapsed: new Set(saved.collapsed || []),
    edits: { labels: {}, added: [], removed: [], ...(saved.edits || {}) },
    recall: saved.recall ?? DEFAULTS.recall,
    links: saved.links ?? DEFAULTS.crossLinks,
    panel: saved.panel ?? true,
    view: { x: 0, y: 0, k: 1 }, touched: false,
    selected: null, focus: null, query: "", revealed: new Set(),
  };
  const persist = () => store.set(key, { layout: S.layout, saved: S.saved, collapsed: [...S.collapsed], edits: S.edits, recall: S.recall, links: S.links, panel: S.panel });
  let map, intel, pos = {}, hidden = new Set(), intro = true, raf = 0;

  el.innerHTML = `<div class="smap">
    <div class="smap-bar">
      <div class="smap-title"><span class="smap-kicker">${ico("spider")}Spidermap</span><h3>${esc(pack.title)}</h3></div>
      <div class="smap-seg" role="radiogroup" aria-label="Layout">${LAYOUTS.map((l) => `<button type="button" role="radio" data-layout="${l.id}">${ico(l.icon)}<span>${l.name}</span></button>`).join("")}</div>
      <label class="smap-search">${ico("search")}<input type="search" placeholder="Find a term" aria-label="Find a term on the map" autocomplete="off"></label>
      <div class="smap-tools">
        <button type="button" class="smap-tool" data-act="recall" title="Hide definitions to test yourself">${ico("eye")}<span>Recall</span></button>
        <button type="button" class="smap-tool" data-act="links" title="Show the links Gradify Intelligence found between terms">${ico("link")}<span>Links</span></button>
        <button type="button" class="smap-tool smap-ai" data-act="panel" title="Gradify Intelligence">${ico("sparkle")}<span>Intelligence</span></button>
      </div>
    </div>
    <div class="smap-body">
      <div class="smap-stage" tabindex="0" role="application" aria-roledescription="mind map" aria-label="Spidermap of ${esc(pack.title)}. Drag the background to move around, Ctrl or Command and scroll to zoom. Tab to a node, Enter to open it, arrow keys to move it.">
        <div class="smap-aurora" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="smap-world">
          <svg class="smap-edges" aria-hidden="true" overflow="visible">
            <defs>
              <marker id="smap-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 9 5 1 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker>
              <filter id="smap-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <g class="e-base" filter="url(#smap-glow)"></g><g class="e-intel"></g>
          </svg>
          <div class="smap-nodes"></div>
        </div>
        <div class="smap-zoom smap-glass">
          <button type="button" data-act="out" aria-label="Zoom out">${ico("minus")}</button>
          <output class="smap-pct">100%</output>
          <button type="button" data-act="in" aria-label="Zoom in">${ico("plus")}</button>
          <button type="button" data-act="fit" aria-label="Fit the map to the screen" title="Fit (0)">${ico("fit")}</button>
          <button type="button" data-act="reset" aria-label="Reset layout and edits" title="Reset layout and edits">${ico("reset")}</button>
        </div>
        <div class="smap-legend smap-glass" aria-hidden="true">
          <span><i class="lg-arm"></i>Topic arm</span><span><i class="lg-build"></i>Builds on</span><span><i class="lg-mix"></i>Easy to mix up</span>
        </div>
        <p class="smap-hint">Drag a topic to swing its whole arm · double-click to rename</p>
      </div>
      <aside class="smap-panel smap-glass" aria-live="polite"></aside>
    </div>
  </div>`;
  const $ = (s) => el.querySelector(s);
  const root = $(".smap"), stage = $(".smap-stage"), world = $(".smap-world"), nodesEl = $(".smap-nodes"), panel = $(".smap-panel");
  const eBase = $(".e-base"), eIntel = $(".e-intel"), search = $(".smap-search input");

  // ---------- model ----------
  // Positions: where the learner put a node, else where the layout puts it. A new node under an arm the learner
  // has moved goes where the layout would put it relative to that arm, so it lands beside its parent.
  function rebuild() {
    map = buildMap(pack, { learnt, edits: S.edits });
    intel = insights(map, { questions });
    hidden = new Set([...S.collapsed].filter((id) => map.byId.has(id)).flatMap((id) => descendants(map, id)));
    const base = layout(map, S.layout), mine = S.saved[S.layout] || {};
    const shift = (n) => (!n ? { x: 0, y: 0 } : mine[n.id] && base[n.id] ? { x: mine[n.id].x - base[n.id].x, y: mine[n.id].y - base[n.id].y } : shift(map.byId.get(n.parent)));
    const next = {};
    for (const n of map.nodes) {
      if (mine[n.id]) { next[n.id] = { ...mine[n.id] }; continue; }
      const b = base[n.id] || { x: 0, y: 0 }, d = shift(map.byId.get(n.parent));
      next[n.id] = { x: b.x + d.x, y: b.y + d.y };
    }
    pos = next;
  }
  const visible = () => map.nodes.filter((n) => !hidden.has(n.id));
  const kidsOf = (id) => map.nodes.filter((n) => n.parent === id);

  // ---------- nodes ----------
  function nodeHtml(n, i) {
    const c = `#${n.colour}`, d = `--d:${(Math.min(i, 40) * 0.03).toFixed(2)}s`;
    const cls = `smap-node sm-${n.type}${n.learnt ? " learnt" : ""}${n.custom ? " custom" : ""}`;
    const attrs = `class="${cls}" data-id="${esc(n.id)}" role="button" tabindex="0" style="--c:${c};${d}"`;
    if (n.type === "root") {
      const pct = intel.total ? Math.round((intel.learnt / intel.total) * 100) : 0;
      return `<div ${attrs} aria-label="${esc(n.label)}: ${intel.learnt} of ${intel.total} terms known">
        <svg class="sm-ring" viewBox="0 0 120 120" aria-hidden="true"><circle class="trk" cx="60" cy="60" r="55"/><circle class="val" cx="60" cy="60" r="55" pathLength="100" stroke-dasharray="${pct} 100"/></svg>
        <span class="sm-ico">${ico("brain")}</span><b class="sm-label">${esc(n.label)}</b><em class="sm-meta">${intel.learnt}/${intel.total} known</em></div>`;
    }
    if (n.type === "topic") {
      const k = kidsOf(n.id).length, folded = S.collapsed.has(n.id);
      return `<div ${attrs} aria-label="Topic: ${esc(n.label)}, ${k} terms${folded ? ", collapsed" : ""}" aria-expanded="${!folded}">
        <span class="sm-ico">${ico(n.icon)}</span>
        <span class="sm-txt"><em class="sm-kick">Topic · ${k} ${k === 1 ? "term" : "terms"}</em><b class="sm-label">${esc(n.label)}</b>${n.acronym ? `<span class="sm-acr" title="Memory hook: the first letters of its terms">${esc(n.acronym)}</span>` : ""}</span>
        ${k ? `<span class="sm-fold" data-act="fold" title="${folded ? "Expand" : "Collapse"} this arm">${folded ? `+${descendants(map, n.id).length}` : ico("collapse")}</span>` : ""}</div>`;
    }
    if (n.type === "term") {
      const shown = !S.recall || S.revealed.has(n.id);
      return `<div ${attrs} aria-label="${esc(n.label)}${shown ? `: ${esc(n.sub)}` : ""}${n.learnt ? ". Known" : ""}">
        <span class="sm-dot" aria-hidden="true"></span>
        <span class="sm-txt"><b class="sm-label">${esc(n.label)}</b><span class="sm-def${shown ? "" : " veiled"}">${esc(n.sub)}</span></span>
        ${n.learnt ? `<span class="sm-tick" aria-hidden="true">${icon("check")}</span>` : ""}</div>`;
    }
    if (n.type === "eq") return `<div ${attrs} aria-label="Formula: ${esc(n.label)}"><span class="sm-ico">${ico("sigma")}</span><code class="sm-label">${esc(n.label)}</code></div>`;
    return `<div ${attrs} aria-label="Your note: ${esc(n.label)}"><span class="sm-ico">${ico("pencil")}</span><b class="sm-label">${esc(n.label)}</b></div>`;
  }
  function renderNodes() {
    nodesEl.innerHTML = visible().map(nodeHtml).join("");
    placeNodes();
    highlight();
  }
  function placeNodes() {
    for (const node of nodesEl.children) { const p = pos[node.dataset.id]; if (p) node.style.translate = `${p.x.toFixed(1)}px ${p.y.toFixed(1)}px`; }
    drawEdges();
  }

  // ---------- edges ----------
  function curve(a, b, kind) {
    if (S.layout === "flow") { const mx = (a.x + b.x) / 2; return `M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`; }
    if (S.layout === "tree") {
      if (kind === "leg" || kind === "custom") { const x = a.x - 78, r = Math.min(14, Math.abs(b.y - a.y) / 2); return `M${x} ${a.y + 30} V${b.y - r} Q${x} ${b.y} ${x + r} ${b.y} H${b.x - 96}`; }
      const my = (a.y + b.y) / 2; return `M${a.x} ${a.y} C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
    }
    // spider: every leg bends the same way round, like a spider's
    const dx = b.x - a.x, dy = b.y - a.y, bend = kind === "arm" ? 0.14 : 0.1;
    return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${((a.x + b.x) / 2 - dy * bend).toFixed(1)} ${((a.y + b.y) / 2 + dx * bend).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  function drawEdges() {
    let base = "", extra = "";
    for (const l of map.links) {
      if (hidden.has(l.to) || hidden.has(l.from) || !pos[l.from] || !pos[l.to]) continue;
      const c = `#${map.byId.get(l.to).colour}`;
      base += `<path class="e e-${l.kind}" data-from="${esc(l.from)}" data-to="${esc(l.to)}" d="${curve(pos[l.from], pos[l.to], l.kind)}" style="--c:${c}" pathLength="1"/>`;
    }
    if (S.links) for (const l of intel.links) {
      if (hidden.has(l.to) || hidden.has(l.from) || !pos[l.from] || !pos[l.to]) continue;
      const a = pos[l.from], b = pos[l.to], dx = b.x - a.x, dy = b.y - a.y;
      const d = `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${((a.x + b.x) / 2 + dy * 0.28).toFixed(1)} ${((a.y + b.y) / 2 - dx * 0.28).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
      extra += `<path class="e x-${l.kind}" data-from="${esc(l.from)}" data-to="${esc(l.to)}" d="${d}" style="--o:${l.confidence.toFixed(2)}"${l.kind === "builds" ? ' marker-end="url(#smap-arrow)"' : ""}/>`;
    }
    eBase.innerHTML = base; eIntel.innerHTML = extra;
  }

  // ---------- highlight: selection, an insight, or a search ----------
  function activeSet() {
    if (S.focus) return new Set(S.focus);
    const q = S.query.trim().toLowerCase();
    if (q) return new Set(map.nodes.filter((n) => `${n.label} ${n.sub || ""}`.toLowerCase().includes(q)).map((n) => n.id));
    if (!S.selected || S.selected === "root") return null;
    const s = new Set([S.selected, ...descendants(map, S.selected)]);
    const n = map.byId.get(S.selected);
    if (n?.parent) s.add(n.parent);
    for (const l of intel.links) if (l.from === S.selected || l.to === S.selected) { s.add(l.from); s.add(l.to); }
    return s;
  }
  function highlight() {
    const on = activeSet();
    root.classList.toggle("focusing", Boolean(on));
    for (const node of nodesEl.children) {
      const id = node.dataset.id;
      node.classList.toggle("lit", Boolean(on?.has(id)));
      node.classList.toggle("sel", id === S.selected);
    }
    for (const p of el.querySelectorAll(".smap-edges path.e")) p.classList.toggle("lit", Boolean(on?.has(p.dataset.from) && on?.has(p.dataset.to)));
  }

  // ---------- view: pan and zoom ----------
  function applyView() {
    const { x, y, k } = S.view;
    world.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${k.toFixed(4)})`;
    stage.style.setProperty("--gx", `${x.toFixed(1)}px`); stage.style.setProperty("--gy", `${y.toFixed(1)}px`); stage.style.setProperty("--gs", `${(32 * k).toFixed(2)}px`);
    $(".smap-pct").textContent = `${Math.round(k * 100)}%`;
  }
  function zoomAt(px, py, f) {
    const k1 = clamp(S.view.k * f, DEFAULTS.minZoom, DEFAULTS.maxZoom), r = k1 / S.view.k;
    S.view = { x: px - (px - S.view.x) * r, y: py - (py - S.view.y) * r, k: k1 };
    applyView();
  }
  function fit(ids, animate = true) {
    const W = stage.clientWidth, H = stage.clientHeight;
    if (!W || !H) return;
    const b = bounds(map, pos, (ids && ids.length ? ids : visible().map((n) => n.id)).filter((id) => !hidden.has(id)));
    const k = clamp(Math.min((W - 72) / b.w, (H - 110) / b.h), DEFAULTS.minZoom, ids?.length ? 1.25 : 1.1);
    const to = { k, x: W / 2 - (b.x0 + b.w / 2) * k, y: (H + 30) / 2 - (b.y0 + b.h / 2) * k };
    if (!animate) { S.view = to; applyView(); return; }
    const from = { ...S.view };
    tween((t) => { S.view = { k: from.k + (to.k - from.k) * t, x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t }; applyView(); });
  }
  function tween(step, ms = 520) {
    cancelAnimationFrame(raf);
    const t0 = performance.now();
    const frame = (now) => { const t = clamp((now - t0) / ms, 0, 1); step(ease(t)); if (t < 1) raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);
  }
  // glide every node to new positions (layout switch, reset)
  function glideTo(target, then) {
    const from = Object.fromEntries(Object.entries(pos).map(([id, p]) => [id, { ...p }]));
    root.classList.add("gliding");
    tween((t) => {
      for (const id in target) { const a = from[id] || target[id], b = target[id]; pos[id] = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }; }
      placeNodes();
      if (t === 1) { root.classList.remove("gliding"); then?.(); }
    });
  }

  // ---------- panel: Gradify Intelligence, or the selected node ----------
  const chip = (id) => { const n = map.byId.get(id); return n ? `<button type="button" class="smp-chip" data-go="${esc(id)}" style="--c:#${n.colour}">${esc(n.label)}</button>` : ""; };
  function intelPanel() {
    const pct = intel.total ? Math.round((intel.learnt / intel.total) * 100) : 0;
    const topics = map.nodes.filter((n) => n.type === "topic").length;
    const qs = intel.insights.filter((x) => x.kind === "question"), rest = intel.insights.filter((x) => x.kind !== "question");
    return `<header class="smp-head"><span class="smp-badge">${ico("sparkle")}</span><div><em>Gradify Intelligence</em><b>How your notes fit together</b></div><button type="button" class="smp-x" data-act="panel" aria-label="Hide Gradify Intelligence">${ico("close")}</button></header>
      <div class="smp-progress"><div class="smp-bar"><i style="width:${pct}%"></i></div><span><b>${intel.learnt}</b> of ${intel.total} terms known</span></div>
      <div class="smp-stats"><span><b>${topics}</b>topics</span><span><b>${intel.total}</b>terms</span><span><b>${intel.links.length}</b>links</span></div>
      ${rest.length ? `<h4>Insights</h4><ul class="smp-list">${rest.map((x) => `<li><button type="button" class="smp-ins k-${x.kind}" data-ins="${intel.insights.indexOf(x)}">
        <span class="smp-ii">${ico(x.icon)}</span><span class="smp-it"><b>${esc(x.title)}</b><em>${esc(x.detail)}</em>
        ${x.confidence ? `<span class="smp-conf" title="How sure Gradify is"><i style="width:${Math.round(x.confidence * 100)}%"></i></span>` : ""}</span></button></li>`).join("")}</ul>` : ""}
      ${qs.length ? `<h4>Test yourself</h4><div class="smp-qs">${qs.map((x) => `<details class="smp-q"><summary><span class="smp-qt">${x.qtype === "apply" ? "Apply" : "Explain"}</span>${esc(x.title)}</summary><p>${esc(x.detail)}</p></details>`).join("")}</div>` : ""}
      ${intel.order.length > 1 ? `<h4>Suggested order</h4><ol class="smp-order">${intel.order.slice(0, 12).map((id) => `<li class="${map.byId.get(id).learnt ? "done" : ""}">${chip(id)}</li>`).join("")}</ol>` : ""}
      <p class="smp-foot">${ico("quote")}Worked out from your notes alone. Every link quotes the words it rests on.</p>`;
  }
  function nodePanel(n) {
    const c = `#${n.colour}`;
    const head = `<header class="smp-head" style="--c:${c}"><span class="smp-badge solid">${ico(n.type === "term" ? "book" : n.icon)}</span><div><em>${TYPE_NAME[n.type]}${n.topic != null && n.type !== "topic" ? ` · ${esc(map.byId.get(`t${n.topic}`)?.label || "")}` : ""}</em><b>${esc(n.label)}</b></div><button type="button" class="smp-x" data-act="deselect" aria-label="Back to Gradify Intelligence">${ico("close")}</button></header>`;
    const acts = [];
    let body = "";
    if (n.type === "term") {
      const f = n.fact, shown = !S.recall || S.revealed.has(n.id);
      const into = intel.links.filter((l) => l.kind === "builds" && l.to === n.id).map((l) => l.from);
      const out = intel.links.filter((l) => l.kind === "builds" && l.from === n.id).map((l) => l.to);
      const mix = intel.links.filter((l) => l.kind === "contrast" && (l.from === n.id || l.to === n.id)).map((l) => (l.from === n.id ? l.to : l.from));
      body = `${shown ? `<p class="smp-def">${esc(f.def[0].toUpperCase() + f.def.slice(1))}.</p>` : `<button type="button" class="smp-reveal" data-act="reveal">${ico("eye")}Say it to yourself, then reveal</button>`}
        ${f.card ? `<div class="smp-card"><em>Flashcard</em><b>${esc(f.card.q)}</b></div>` : ""}
        ${f.src ? `<blockquote class="smp-src">${ico("quote")}<span><em>From your notes</em>${esc(f.src)}</span></blockquote>` : ""}
        ${into.length ? `<h5>Builds on</h5><div class="smp-chips">${into.map(chip).join("")}</div>` : ""}
        ${out.length ? `<h5>Leads to</h5><div class="smp-chips">${out.map(chip).join("")}</div>` : ""}
        ${mix.length ? `<h5>Easy to mix up with</h5><div class="smp-chips">${mix.map(chip).join("")}</div>` : ""}`;
      acts.push(`<button type="button" class="smp-btn ${n.learnt ? "" : "primary"}" data-act="learn">${icon("check")}${n.learnt ? "Known · undo" : "I know this"}</button>`);
    } else if (n.type === "topic") {
      const terms = kidsOf(n.id);
      const qs = questions.filter((q) => q.group === n.topic);
      body = `${n.sub && n.sub !== n.label ? `<p class="smp-sub">${esc(n.sub)}</p>` : ""}
        ${n.acronym ? `<div class="smp-hook"><span class="sm-acr">${esc(n.acronym)}</span><span>Memory hook: ${terms.filter((t) => t.fact).map((t) => `<b>${esc(t.fact.term[0])}</b>${esc(t.fact.term.slice(1))}`).join(", ")}</span></div>` : ""}
        <h5>Terms</h5><div class="smp-chips">${terms.map((t) => chip(t.id)).join("")}</div>
        ${qs.length ? `<h5>Test yourself</h5>${qs.map((q) => `<details class="smp-q"><summary><span class="smp-qt">${q.type === "apply" ? "Apply" : "Explain"}</span>${esc(q.question)}</summary><p>${esc(q.answer)}</p></details>`).join("")}` : ""}`;
      acts.push(`<button type="button" class="smp-btn" data-act="fold">${ico(S.collapsed.has(n.id) ? "expand" : "collapse")}${S.collapsed.has(n.id) ? "Expand arm" : "Collapse arm"}</button>`, `<button type="button" class="smp-btn" data-act="zoomto">${ico("target")}Zoom to arm</button>`);
    } else if (n.type === "eq") {
      const used = map.nodes.filter((t) => t.type === "term" && t.fact && (t.fact.ab ? new RegExp(`\\b${t.fact.ab}\\b`).test(n.label) : false));
      body = `<p class="smp-eq"><code>${esc(n.label)}</code></p>${used.length ? `<h5>Made from</h5><div class="smp-chips">${used.map((t) => chip(t.id)).join("")}</div>` : ""}`;
    } else if (n.type === "note") body = `<p class="smp-sub">Your own note. Double-click it on the map, or use Rename, to change it.</p>`;
    acts.push(`<button type="button" class="smp-btn" data-act="add">${ico("plus")}Add a note</button>`, `<button type="button" class="smp-btn" data-act="rename">${ico("edit")}Rename</button>`);
    if (n.type !== "root") acts.push(`<button type="button" class="smp-btn danger" data-act="remove">${ico("trash")}${n.custom ? "Delete" : "Hide"}</button>`);
    return `${head}<div class="smp-body">${body}</div><div class="smp-acts">${acts.join("")}</div>`;
  }
  function renderPanel() {
    const n = S.selected && S.selected !== "root" ? map.byId.get(S.selected) : null;
    panel.innerHTML = n ? nodePanel(n) : intelPanel();
    panel.dataset.kind = n ? n.type : "intel";
  }
  function renderBar() {
    for (const b of el.querySelectorAll("[data-layout]")) b.setAttribute("aria-checked", String(b.dataset.layout === S.layout));
    $('[data-act="recall"]').setAttribute("aria-pressed", String(S.recall));
    $('[data-act="recall"]').innerHTML = `${ico(S.recall ? "eyeoff" : "eye")}<span>Recall</span>`;
    $('[data-act="links"]').setAttribute("aria-pressed", String(S.links));
    $(".smap-bar [data-act=panel]").setAttribute("aria-pressed", String(S.panel));
    root.classList.toggle("no-panel", !S.panel);
    root.classList.toggle("recall", S.recall);
    root.dataset.arrange = S.layout;
  }
  function renderAll() { renderBar(); renderNodes(); renderPanel(); }

  // ---------- actions ----------
  function select(id, { centre = false } = {}) {
    S.selected = id; S.focus = null;
    if (id && !S.panel) { S.panel = true; renderBar(); }
    renderPanel(); highlight();
    if (centre && id && pos[id]) {
      const W = stage.clientWidth, H = stage.clientHeight, from = { ...S.view }, p = pos[id];
      const to = { k: Math.max(from.k, 0.8), x: 0, y: 0 }; to.x = W / 2 - p.x * to.k; to.y = H / 2 - p.y * to.k;
      tween((t) => { S.view = { k: from.k + (to.k - from.k) * t, x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t }; applyView(); });
    }
  }
  function save(ids) {
    const mine = S.saved[S.layout] || (S.saved[S.layout] = {});
    for (const id of ids) mine[id] = { x: Math.round(pos[id].x), y: Math.round(pos[id].y) };
    persist();
  }
  function toggleFold(id) {
    if (S.collapsed.has(id)) S.collapsed.delete(id); else S.collapsed.add(id);
    persist(); rebuild(); renderNodes(); renderPanel();
  }
  function setLayout(id) {
    if (id === S.layout) return;
    S.layout = id; persist();
    const old = pos;
    rebuild();
    const target = pos; pos = old;
    root.dataset.arrange = id;
    renderBar(); renderNodes();
    glideTo(target, () => fit());
  }
  function toggleLearn(n) {
    const t = n.fact.term.toLowerCase(), known = !learnt.has(t);
    if (known) learnt.add(t); else learnt.delete(t);
    onLearn(n.fact.term, known);
    rebuild(); renderNodes(); renderPanel();
    if (known) toast(`Marked “${esc(n.fact.term)}” as known.`);
  }
  function addNote(parent) {
    const id = newId();
    S.edits.added.push({ id, parent, label: "New note" });
    rebuild();
    save([id]);
    S.collapsed.delete(parent);
    renderNodes();
    select(id);
    rename(id);
  }
  function remove(id) {
    const n = map.byId.get(id);
    if (!n || id === "root") return;
    if (n.custom) {
      const gone = new Set([id, ...descendants(map, id)]);
      S.edits.added = S.edits.added.filter((a) => !gone.has(a.id));
    } else S.edits.removed.push(id);
    persist(); S.selected = null;
    rebuild(); renderNodes(); renderPanel();
    toast(n.custom ? "Note deleted." : `Hid “${esc(n.label)}”. Reset the map to bring it back.`);
  }
  function rename(id) {
    const label = nodesEl.querySelector(`[data-id="${CSS.escape(id)}"] .sm-label`);
    if (!label) return;
    const before = label.textContent;
    label.contentEditable = "plaintext-only";
    if (label.contentEditable !== "plaintext-only") label.contentEditable = "true";
    label.spellcheck = true;
    label.classList.add("editing");
    label.focus({ preventScroll: true });
    getSelection()?.selectAllChildren(label);
    const done = (keep) => {
      label.removeEventListener("blur", onBlur); label.removeEventListener("keydown", onKey);
      label.contentEditable = "false"; label.classList.remove("editing");
      const text = label.textContent.replace(/\s+/g, " ").trim().slice(0, 120);
      if (keep && text && text !== before) { S.edits.labels[id] = text; persist(); }
      rebuild(); renderNodes(); renderPanel();
      nodesEl.querySelector(`[data-id="${CSS.escape(id)}"]`)?.focus({ preventScroll: true });
    };
    const onBlur = () => done(true);
    const onKey = (e) => { e.stopPropagation(); if (e.key === "Enter") { e.preventDefault(); done(true); } if (e.key === "Escape") { label.textContent = before; done(false); } };
    label.addEventListener("blur", onBlur); label.addEventListener("keydown", onKey);
  }
  let resetArmed = 0;
  function reset(btn) {
    if (Date.now() - resetArmed > 3000) { resetArmed = Date.now(); btn.classList.add("armed"); toast("Press reset again to clear your layout, notes and renames for this map."); setTimeout(() => btn.classList.remove("armed"), 3000); return; }
    resetArmed = 0; btn.classList.remove("armed");
    S.saved = {}; S.collapsed.clear(); S.edits = { labels: {}, added: [], removed: [] }; S.selected = null; S.focus = null;
    persist();
    const old = pos; rebuild(); const target = pos; pos = old;
    renderNodes(); renderPanel();
    glideTo(target, () => { renderNodes(); fit(); });
  }

  // ---------- pointer: pan, drag, pinch ----------
  const pointers = new Map();
  let drag = null, pinch = null;
  function onDown(e) {
    if (e.button > 0 || e.target.closest(".smap-zoom, .smap-legend, .editing")) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), k: S.view.k }; drag = null; return;
    }
    const node = e.target.closest(".smap-node"), id = node?.dataset.id;
    drag = { id, x0: e.clientX, y0: e.clientY, moved: false, fold: Boolean(e.target.closest("[data-act=fold]")), view0: { ...S.view } };
    if (id && id !== "root") { drag.ids = [id, ...descendants(map, id)]; drag.start = Object.fromEntries(drag.ids.map((x) => [x, { ...pos[x] }])); }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  }
  function onMove(e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch && pointers.size === 2) {
      const [a, b] = [...pointers.values()], r = stage.getBoundingClientRect();
      zoomAt((a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top, (pinch.k * Math.hypot(a.x - b.x, a.y - b.y)) / pinch.d / S.view.k);
      S.touched = true; return;
    }
    if (!drag) return;
    const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
    if (!drag.moved && Math.hypot(dx, dy) < 5) return;
    if (!drag.moved) { drag.moved = true; root.classList.add(drag.ids ? "dragging" : "panning"); cancelAnimationFrame(raf); }
    S.touched = true;
    if (drag.ids) {
      for (const id of drag.ids) pos[id] = { x: drag.start[id].x + dx / S.view.k, y: drag.start[id].y + dy / S.view.k };
      placeNodes();
    } else { S.view = { ...S.view, x: drag.view0.x + dx, y: drag.view0.y + dy }; applyView(); }
  }
  function onUp(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = null;
    if (pointers.size) return;
    window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); window.removeEventListener("pointercancel", onUp);
    const d = drag; drag = null;
    root.classList.remove("dragging", "panning");
    if (!d) return;
    if (d.moved) { if (d.ids) save(d.ids); return; }
    if (e.type === "pointercancel") return;
    if (d.fold) { toggleFold(d.id); return; }
    if (d.id) {
      const n = map.byId.get(d.id);
      if (n?.type === "term" && S.recall) { S.revealed.add(d.id); const def = nodesEl.querySelector(`[data-id="${CSS.escape(d.id)}"] .sm-def`); def?.classList.remove("veiled"); }
      select(d.id === S.selected ? null : d.id);
    } else if (S.selected || S.focus) { S.selected = null; S.focus = null; renderPanel(); highlight(); }
  }
  // Ctrl/⌘ + scroll (and trackpad pinch) always zooms. A plain scroll moves the map only once the learner has
  // clicked into it; until then it scrolls the page as usual, so the map never traps someone scrolling past.
  let engaged = false, nudged = 0;
  function onWheel(e) {
    const zoom = e.ctrlKey || e.metaKey;
    if (!zoom && !engaged) {
      if (Date.now() - nudged > 4000) { nudged = Date.now(); const h = $(".smap-hint"); h.textContent = "Click the map to scroll around it · Ctrl or ⌘ + scroll to zoom"; h.style.animation = "none"; void h.offsetWidth; h.style.animation = ""; }
      return;
    }
    e.preventDefault();
    S.touched = true;
    const r = stage.getBoundingClientRect();
    if (zoom) zoomAt(e.clientX - r.left, e.clientY - r.top, Math.exp(-e.deltaY * (e.deltaMode ? 0.05 : 0.0025) * (e.ctrlKey && !e.metaKey && Math.abs(e.deltaY) < 50 ? 4 : 1)));
    else { S.view = { ...S.view, x: S.view.x - e.deltaX, y: S.view.y - e.deltaY }; applyView(); }
  }
  const onDocDown = (e) => { engaged = stage.contains(e.target); root.classList.toggle("engaged", engaged); };
  const onDbl = (e) => { const node = e.target.closest(".smap-node"); if (node) { e.preventDefault(); rename(node.dataset.id); } };

  // ---------- keyboard ----------
  function onKey(e) {
    if (e.target.closest(".editing") || e.target === search) return;
    const node = e.target.closest?.(".smap-node"), id = node?.dataset.id;
    if (node) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(id === S.selected ? null : id); return; }
      if (e.key === "F2") { e.preventDefault(); rename(id); return; }
      if ((e.key === "Delete" || e.key === "Backspace") && map.byId.get(id)?.custom) { e.preventDefault(); remove(id); return; }
      const step = e.shiftKey ? 60 : 20, mv = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (mv && id !== "root") {
        e.preventDefault();
        const ids = [id, ...descendants(map, id)];
        for (const x of ids) pos[x] = { x: pos[x].x + mv[0], y: pos[x].y + mv[1] };
        placeNodes(); save(ids); return;
      }
    }
    if (!e.target.closest(".smap-stage")) return;
    const W = stage.clientWidth / 2, H = stage.clientHeight / 2;
    if (e.key === "+" || e.key === "=") { e.preventDefault(); zoomAt(W, H, 1.2); }
    else if (e.key === "-" || e.key === "_") { e.preventDefault(); zoomAt(W, H, 1 / 1.2); }
    else if (e.key === "0") { e.preventDefault(); fit(); }
    else if (e.key === "Escape") { S.selected = null; S.focus = null; renderPanel(); highlight(); }
  }

  // ---------- clicks on the bar, zoom controls and panel ----------
  function onClick(e) {
    const t = e.target;
    const lay = t.closest(".smap-seg [data-layout]"); if (lay) { setLayout(lay.dataset.layout); return; }
    const go = t.closest("[data-go]"); if (go) { select(go.dataset.go, { centre: true }); return; }
    const ins = t.closest("[data-ins]");
    if (ins) {
      const x = intel.insights[+ins.dataset.ins];
      const same = S.focus && x.ids.length && x.ids.every((id) => S.focus.includes(id));
      S.focus = same || !x.ids.length ? null : x.ids; S.selected = null;
      for (const b of panel.querySelectorAll("[data-ins]")) b.classList.toggle("on", !same && b === ins);
      highlight();
      if (S.focus) { x.ids.forEach((id) => { const n = map.byId.get(id); if (n?.parent && S.collapsed.has(n.parent)) toggleFold(n.parent); }); fit(S.focus); }
      return;
    }
    const act = t.closest("[data-act]")?.dataset.act;
    if (!act || t.closest(".smap-node")) return;
    const n = S.selected ? map.byId.get(S.selected) : null;
    const W = stage.clientWidth / 2, H = stage.clientHeight / 2;
    switch (act) {
      case "in": zoomAt(W, H, 1.25); break;
      case "out": zoomAt(W, H, 0.8); break;
      case "fit": fit(); break;
      case "reset": reset(t.closest("button")); break;
      case "recall": S.recall = !S.recall; S.revealed.clear(); persist(); renderBar(); renderNodes(); renderPanel(); break;
      case "links": S.links = !S.links; persist(); renderBar(); drawEdges(); highlight(); break;
      case "panel": S.panel = !S.panel; persist(); renderBar(); break;
      case "deselect": S.selected = null; renderPanel(); highlight(); break;
      case "reveal": if (n) { S.revealed.add(n.id); renderNodes(); renderPanel(); } break;
      case "learn": if (n?.fact) toggleLearn(n); break;
      case "fold": if (n) toggleFold(n.id); break;
      case "zoomto": if (n) fit([n.id, ...descendants(map, n.id)]); break;
      case "add": addNote(n ? n.id : "root"); break;
      case "rename": if (n) rename(n.id); break;
      case "remove": if (n) remove(n.id); break;
    }
  }
  function onSearch() {
    S.query = search.value; S.focus = null;
    highlight();
  }
  function onSearchKey(e) {
    if (e.key !== "Enter") return;
    const q = S.query.trim().toLowerCase();
    const hit = q && visible().find((n) => n.type !== "root" && `${n.label} ${n.sub || ""}`.toLowerCase().includes(q));
    if (hit) { e.preventDefault(); select(hit.id, { centre: true }); }
  }

  // the stage never scrolls itself (focus would otherwise scroll its clipped content): tabbing to a node off
  // screen pans the map to it instead
  stage.addEventListener("scroll", () => { stage.scrollTop = 0; stage.scrollLeft = 0; });
  stage.addEventListener("focusin", (e) => {
    const id = e.target.closest?.(".smap-node")?.dataset.id, p = id && pos[id];
    if (!p || drag) return;
    const sx = S.view.x + p.x * S.view.k, sy = S.view.y + p.y * S.view.k;
    if (sx < 60 || sy < 60 || sx > stage.clientWidth - 60 || sy > stage.clientHeight - 60) {
      const from = { ...S.view }, to = { k: from.k, x: stage.clientWidth / 2 - p.x * from.k, y: stage.clientHeight / 2 - p.y * from.k };
      tween((t) => { S.view = { k: from.k, x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t }; applyView(); }, 380);
    }
  });
  stage.addEventListener("pointerdown", onDown);
  document.addEventListener("pointerdown", onDocDown, true);
  stage.addEventListener("wheel", onWheel, { passive: false });
  stage.addEventListener("dblclick", onDbl);
  el.addEventListener("keydown", onKey);
  el.addEventListener("click", onClick);
  search.addEventListener("input", onSearch);
  search.addEventListener("keydown", onSearchKey);
  // keep the map framed while the learner hasn't moved it themselves
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => { if (!S.touched) fit(null, false); }) : null;
  ro?.observe(stage);

  rebuild();
  root.classList.add("intro");
  renderAll();
  fit(null, false);
  setTimeout(() => { intro = false; root.classList.remove("intro"); }, 2200);

  return {
    refresh() { rebuild(); renderNodes(); renderPanel(); },
    destroy() {
      cancelAnimationFrame(raf); ro?.disconnect();
      document.removeEventListener("pointerdown", onDocDown, true);
      window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); window.removeEventListener("pointercancel", onUp);
      el.innerHTML = "";
    },
    get state() { return { ...S, intro, nodes: map.nodes.length }; },
  };
}
