// Spidermap view: an interactive, liquid-glass canvas for the map built in model.js, synced with the learner's own
// Gradify Intelligence (memory.js): every term shows how well they remember it right now, from their real answers.
//   move:   drag the background (or the minimap) to pan, Ctrl/⌘ + scroll or pinch to zoom; drag a node and its arm comes too
//   edit:   double-click a node to rename it, or empty space to add a note; link any two nodes; colour a topic;
//           collapse arms; every change can be undone (Ctrl/⌘ + Z)
//   learn:  Recall hides definitions, the Memory lens colours terms by recall, Practise walks the map in the best
//           order, and "Ask the map" answers questions from the notes alone
// Positions, edits and settings are kept per set of notes in this browser (localStorage), so the map stays yours.
// Smoothness: positions, edges, the view and the minimap are painted at most once a frame (requestAnimationFrame),
// edges are updated in place rather than rebuilt, and the costliest effects pause while the map is moving.
//
// mountMindMap(el, { pack, learnt, questions, esc, onLearn, onPractised, toast }) → { refresh, destroy }
import { icon } from "../../core/icons.js";
import { GLYPHS, LAYOUTS, DEFAULTS, SWATCHES } from "./config.js";
import { buildMap, descendants, newId, mapKey } from "./model.js";
import { layout, bounds } from "./layout.js";
import { insights } from "./intel.js";
import { memoryFor, loadLearnerCards, STATE, whenText } from "./memory.js";
import { ask, mentioned } from "./ask.js";
import { toMarkdown } from "./export.js";

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
const DAY = 864e5;
const SVGNS = "http://www.w3.org/2000/svg";
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (t) => 1 - Math.pow(1 - t, 3);
const pct = (v) => `${Math.round(v * 100)}%`;
const TYPE_NAME = { root: "Your notes", topic: "Topic", term: "Key term", eq: "Formula", note: "Your note" };
const RATING = { again: "Forgot", hard: "Hard", good: "Good", easy: "Easy" };
const APP = "/app.html";
const SHORTCUTS = [["Drag", "Pan the map, or move a node and its arm"], ["Ctrl/⌘ + scroll", "Zoom (or pinch)"], ["Double-click", "Rename a node, or add a note on empty space"],
  ["Enter", "Open the focused node"], ["Arrow keys", "Move the focused node (Shift: further)"], ["F2", "Rename"], ["Delete", "Hide or delete"], ["Ctrl/⌘ + Z", "Undo"],
  ["/", "Find a term"], ["+  −  0", "Zoom in, out, fit"], ["E  C", "Expand or collapse every arm"], ["Space · 1 · 2", "Reveal, knew it, not yet (while practising)"], ["?", "These shortcuts"], ["Esc", "Close, clear or stop"]];

export function mountMindMap(el, { pack, learnt = new Set(), questions = [], esc = (s) => String(s), onLearn = () => {}, onPractised = () => {}, toast = () => {} }) {
  loadMindMapCss();
  const key = DEFAULTS.storageKey + mapKey(pack);
  const saved = store.get(key) || {};
  const S = {
    layout: LAYOUTS.some((l) => l.id === saved.layout) ? saved.layout : DEFAULTS.layout,
    saved: saved.saved || {},                       // positions the learner dragged, per layout
    collapsed: new Set(saved.collapsed || []),
    edits: { labels: {}, added: [], removed: [], colours: {}, links: [], ...(saved.edits || {}) },
    recall: saved.recall ?? DEFAULTS.recall,
    links: saved.links ?? DEFAULTS.crossLinks,
    lens: saved.lens === "memory" ? "memory" : "topic",
    panel: saved.panel ?? true,
    view: { x: 0, y: 0, k: 1 }, touched: false,
    selected: null, focus: null, query: "", revealed: new Set(),
    data: null,            // the learner's cards and answers, once loaded
    walk: null,            // { ids, i, got, shown } while practising the map
    asked: null,           // { q, a } the last question asked of the map
    linking: null,         // the node a new link starts from, while drawing one
  };
  const persist = () => store.set(key, { layout: S.layout, saved: S.saved, collapsed: [...S.collapsed], edits: S.edits, recall: S.recall, links: S.links, lens: S.lens, panel: S.panel });
  let map, intel, mem = { terms: new Map(), tracked: 0, answers: 0, due: 0, synced: false }, pos = {}, hidden = new Set(), raf = 0, alive = true;

  el.innerHTML = `<div class="smap">
    <div class="smap-bar">
      <div class="smap-title"><span class="smap-kicker">${ico("spider")}Spidermap<span class="smap-sync" hidden></span></span><h3>${esc(pack.title)}</h3></div>
      <div class="smap-seg" role="radiogroup" aria-label="Layout">${LAYOUTS.map((l) => `<button type="button" role="radio" data-layout="${l.id}">${ico(l.icon)}<span>${l.name}</span></button>`).join("")}</div>
      <label class="smap-search">${ico("search")}<input type="search" placeholder="Find a term" aria-label="Find a term on the map" autocomplete="off"><kbd>/</kbd></label>
      <div class="smap-tools">
        <button type="button" class="smap-tool" data-act="recall" title="Hide definitions to test yourself"></button>
        <button type="button" class="smap-tool" data-act="lens" title="Colour each term by how well you remember it">${ico("brain")}<span>Memory</span></button>
        <button type="button" class="smap-tool" data-act="links" title="Show the links Gradify Intelligence found between terms">${ico("link")}<span>Links</span></button>
        <button type="button" class="smap-tool smap-ai" data-act="panel" title="Gradify Intelligence">${ico("sparkle")}<span>Intelligence</span></button>
        <div class="smap-more">
          <button type="button" class="smap-tool icon-only" data-act="menu" aria-haspopup="menu" aria-expanded="false" aria-label="More">${ico("more")}</button>
          <div class="smap-menu smap-glass" role="menu" hidden>
            <button type="button" role="menuitem" data-act="tidy">${ico("wand")}Tidy the layout</button>
            <button type="button" role="menuitem" data-act="expand-all">${ico("expand")}Expand every arm <kbd>E</kbd></button>
            <button type="button" role="menuitem" data-act="collapse-all">${ico("collapse")}Collapse every arm <kbd>C</kbd></button>
            <hr>
            <button type="button" role="menuitem" data-act="copy">${ico("copy")}Copy as an outline</button>
            <button type="button" role="menuitem" data-act="download">${ico("download")}Download as Markdown</button>
            <hr>
            <button type="button" role="menuitem" data-act="keys">${ico("keyboard")}Keyboard shortcuts <kbd>?</kbd></button>
            <button type="button" role="menuitem" class="danger" data-act="reset">${ico("reset")}Reset this map…</button>
          </div>
        </div>
      </div>
    </div>
    <div class="smap-body">
      <div class="smap-stage" tabindex="0" role="application" aria-roledescription="mind map" aria-label="Spidermap of ${esc(pack.title)}. Click the map, then drag or scroll to move around; Ctrl or Command and scroll to zoom. Tab to a node, Enter to open it, arrow keys to move it. Press question mark for shortcuts.">
        <div class="smap-aurora" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="smap-world">
          <svg class="smap-edges" aria-hidden="true" overflow="visible">
            <defs>
              <marker id="smap-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 9 5 1 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker>
              <filter id="smap-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <g class="e-base" filter="url(#smap-glow)"></g><g class="e-intel"></g>
          </svg>
          <div class="smap-nodes"></div>
        </div>
        <canvas class="smap-mini smap-glass" width="176" height="116" aria-label="Overview of the whole map: click or drag to move there" role="img"></canvas>
        <div class="smap-zoom smap-glass">
          <button type="button" data-act="undo" aria-label="Undo" title="Undo (Ctrl/⌘ + Z)" disabled>${ico("undo")}</button>
          <span class="sep"></span>
          <button type="button" data-act="out" aria-label="Zoom out" title="Zoom out (−)">${ico("minus")}</button>
          <output class="smap-pct">100%</output>
          <button type="button" data-act="in" aria-label="Zoom in" title="Zoom in (+)">${ico("plus")}</button>
          <button type="button" data-act="fit" aria-label="Fit the map to the screen" title="Fit (0)">${ico("fit")}</button>
        </div>
        <div class="smap-legend smap-glass" aria-hidden="true"></div>
        <p class="smap-hint">Drag a topic to swing its whole arm · double-click to rename · ? for shortcuts</p>
        <div class="smap-snack smap-glass" role="status" hidden></div>
        <div class="smap-keys smap-glass" role="dialog" aria-label="Keyboard shortcuts" hidden></div>
      </div>
      <aside class="smap-panel smap-glass" aria-live="polite"></aside>
    </div>
  </div>`;
  const $ = (s) => el.querySelector(s);
  const root = $(".smap"), stage = $(".smap-stage"), world = $(".smap-world"), nodesEl = $(".smap-nodes"), panel = $(".smap-panel");
  const eBase = $(".e-base"), eIntel = $(".e-intel"), search = $(".smap-search input"), mini = $(".smap-mini"), menu = $(".smap-menu");

  // ---------- model ----------
  // Positions: where the learner put a node, else where the layout puts it. A new node under an arm the learner
  // has moved goes where the layout would put it relative to that arm, so it lands beside its parent.
  function rebuild() {
    map = buildMap(pack, { learnt, edits: S.edits });
    mem = memoryFor(map, S.data || {});
    intel = insights(map, { questions, memory: mem });
    hidden = new Set([...S.collapsed].filter((id) => map.byId.has(id)).flatMap((id) => descendants(map, id)));
    pos = positions(S.layout);
  }
  function positions(lay) {
    const base = layout(map, lay), mine = S.saved[lay] || {};
    const shift = (n) => (!n ? { x: 0, y: 0 } : mine[n.id] && base[n.id] ? { x: mine[n.id].x - base[n.id].x, y: mine[n.id].y - base[n.id].y } : shift(map.byId.get(n.parent)));
    const next = {};
    for (const n of map.nodes) {
      if (mine[n.id]) { next[n.id] = { ...mine[n.id] }; continue; }
      const b = base[n.id] || { x: 0, y: 0 }, d = shift(map.byId.get(n.parent));
      next[n.id] = { x: b.x + d.x, y: b.y + d.y };
    }
    return next;
  }
  const visible = () => map.nodes.filter((n) => !hidden.has(n.id));
  const kidsOf = (id) => map.nodes.filter((n) => n.parent === id);
  const colourOf = (n) => (S.lens === "memory" && n.type === "term" ? STATE[mem.terms.get(n.id)?.state || "new"].colour : n.colour);
  const veiled = (n) => (S.recall || (S.walk && S.walk.ids[S.walk.i] === n.id && !S.walk.shown)) && !S.revealed.has(n.id);

  // ---------- undo: a snapshot of everything the learner can change, before each change ----------
  const past = [];
  function checkpoint() {
    past.push(JSON.stringify({ saved: S.saved, edits: S.edits, collapsed: [...S.collapsed], learnt: [...learnt] }));
    if (past.length > 60) past.shift();
    $('[data-act="undo"]').disabled = false;
  }
  function undo() {
    const snap = past.pop();
    $('[data-act="undo"]').disabled = !past.length;
    if (!snap) return;
    const s = JSON.parse(snap);
    S.saved = s.saved; S.edits = s.edits; S.collapsed = new Set(s.collapsed);
    learnt.clear(); s.learnt.forEach((t) => learnt.add(t));
    if (S.selected && !buildMap(pack, { learnt, edits: S.edits }).byId.has(S.selected)) S.selected = null;
    persist();
    const old = pos; rebuild(); const target = pos; pos = old;
    renderNodes(); renderPanel();
    glideTo(target);
    snack("Undone");
  }

  // ---------- painting, at most once a frame ----------
  let frame = 0, need = { nodes: false, view: false };
  function schedule(what) {
    need[what] = true;
    if (!frame) frame = requestAnimationFrame(flush);
  }
  function flush() {
    frame = 0;
    if (need.nodes) { need.nodes = false; placeNodes(); }
    if (need.view) { need.view = false; applyView(); }
    drawMini();
  }
  // while the map moves, the costliest effects (glass blur, edge glow, flowing dashes) pause
  let still = 0;
  function moving() {
    if (!root.classList.contains("moving")) root.classList.add("moving");
    clearTimeout(still); still = setTimeout(() => root.classList.remove("moving"), 180);
  }

  // ---------- nodes ----------
  function memChip(m) {
    if (!m) return "";
    const fade = m.state !== "new" && m.fadesIn != null ? (m.fadesIn === 0 ? "below 70% now" : m.fadesIn > 60 ? "secure for weeks" : `fades ${whenText(Date.now() + m.fadesIn * DAY)}`) : "";
    return `<span class="sm-mem s-${m.state}" title="${esc(STATE[m.state].label)}${m.recall != null ? `: about ${pct(m.recall)} recall now` : ""}">
      <span class="sm-meter"><i style="width:${m.recall != null ? Math.round(m.recall * 100) : 4}%"></i></span>
      <em>${STATE[m.state].label}${m.recall != null ? ` · ${pct(m.recall)}` : ""}${fade ? ` · ${fade}` : ""}</em></span>`;
  }
  function nodeHtml(n) {
    const c = `#${colourOf(n)}`, m = mem.terms.get(n.id), known = intel.known(n.id), fresh = n.id === justAdded;
    const cls = `smap-node sm-${n.type}${known ? " learnt" : ""}${n.custom ? " custom" : ""}${m ? ` s-${m.state}` : ""}${m?.due ? " due" : ""}${fresh ? " fresh" : ""}`;
    const attrs = `class="${cls}" data-id="${esc(n.id)}" role="button" tabindex="0" style="--c:${c};--d:${(introOrder.get(n.id) ?? 0) * 0.03}s"`;
    if (n.type === "root") {
      const p = intel.total ? Math.round((intel.learnt / intel.total) * 100) : 0;
      return `<div ${attrs} aria-label="${esc(n.label)}: ${intel.learnt} of ${intel.total} terms known">
        <svg class="sm-ring" viewBox="0 0 120 120" aria-hidden="true"><circle class="trk" cx="60" cy="60" r="55"/><circle class="val" cx="60" cy="60" r="55" pathLength="100" stroke-dasharray="${p} 100"/></svg>
        <span class="sm-ico">${ico("brain")}</span><b class="sm-label">${esc(n.label)}</b>
        <em class="sm-meta">${intel.learnt} of ${intel.total} known${mem.synced ? `<span class="sm-live" title="Synced with your Gradify Intelligence"></span>` : ""}</em></div>`;
    }
    if (n.type === "topic") {
      const k = kidsOf(n.id).length, folded = S.collapsed.has(n.id);
      return `<div ${attrs} aria-label="Topic: ${esc(n.label)}, ${k} terms${folded ? ", collapsed" : ""}" aria-expanded="${!folded}">
        <span class="sm-ico">${ico(n.icon)}</span>
        <span class="sm-txt"><em class="sm-kick">Topic · ${k} ${k === 1 ? "term" : "terms"}</em><b class="sm-label">${esc(n.label)}</b>${n.acronym ? `<span class="sm-acr" title="Memory hook: the first letters of its terms">${esc(n.acronym)}</span>` : ""}</span>
        ${k ? `<span class="sm-fold" data-act="fold" title="${folded ? "Expand" : "Collapse"} this arm">${folded ? `+${descendants(map, n.id).length}` : ico("collapse")}</span>` : ""}</div>`;
    }
    if (n.type === "term") {
      const v = veiled(n);
      return `<div ${attrs} aria-label="${esc(n.label)}${v ? "" : `: ${esc(n.sub)}`}${m ? `. ${STATE[m.state].label}` : ""}${m?.due ? ". Due for review" : ""}${known ? ". Known" : ""}">
        <span class="sm-dot" aria-hidden="true"></span>
        <span class="sm-txt"><b class="sm-label">${esc(n.label)}</b><span class="sm-def${v ? " veiled" : ""}">${esc(n.sub)}</span>${memChip(m)}</span>
        ${m?.due ? `<span class="sm-due" aria-hidden="true">Due</span>` : known ? `<span class="sm-tick" aria-hidden="true">${icon("check")}</span>` : ""}</div>`;
    }
    if (n.type === "eq") return `<div ${attrs} aria-label="Formula: ${esc(n.label)}"><span class="sm-ico">${ico("sigma")}</span><span class="sm-txt"><em class="sm-kick">Formula</em><code class="sm-label">${esc(n.label)}</code></span></div>`;
    return `<div ${attrs} aria-label="Your note: ${esc(n.label)}"><span class="sm-ico">${ico("pencil")}</span><b class="sm-label">${esc(n.label)}</b></div>`;
  }
  let justAdded = null, nodeEls = new Map();
  const introOrder = new Map();
  function renderNodes() {
    const list = visible();
    if (!introOrder.size) list.forEach((n, i) => introOrder.set(n.id, Math.min(i, 40)));
    nodesEl.innerHTML = list.map(nodeHtml).join("");
    nodeEls = new Map([...nodesEl.children].map((x) => [x.dataset.id, x]));
    justAdded = null;
    buildEdges();
    placeNodes();
    highlight();
  }
  function placeNodes(only = null) {
    for (const [id, node] of nodeEls) { if (only && !only.has(id)) continue; const p = pos[id]; if (p) node.style.translate = `${p.x.toFixed(1)}px ${p.y.toFixed(1)}px`; }
    updateEdges(only);
  }

  // ---------- edges: built once per structure, then only their paths change ----------
  let edges = [];   // { el, from, to, kind, intel? }
  function curve(a, b, kind) {
    if (kind === "user") { const dx = b.x - a.x, dy = b.y - a.y; return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${((a.x + b.x) / 2 - dy * 0.2).toFixed(1)} ${((a.y + b.y) / 2 + dx * 0.2).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`; }
    if (S.layout === "flow") { const mx = (a.x + b.x) / 2; return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} C${mx.toFixed(1)} ${a.y.toFixed(1)} ${mx.toFixed(1)} ${b.y.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`; }
    if (S.layout === "tree") {
      if (kind === "leg" || kind === "custom") { const x = a.x - 96, r = Math.min(14, Math.abs(b.y - a.y) / 2); return `M${x.toFixed(1)} ${(a.y + 40).toFixed(1)} V${(b.y - r).toFixed(1)} Q${x.toFixed(1)} ${b.y.toFixed(1)} ${(x + r).toFixed(1)} ${b.y.toFixed(1)} H${(b.x - 128).toFixed(1)}`; }
      const my = (a.y + b.y) / 2; return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} C${a.x.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    // spider: every leg bends the same way round, like a spider's
    const dx = b.x - a.x, dy = b.y - a.y, bend = kind === "arm" ? 0.14 : 0.1;
    return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${((a.x + b.x) / 2 - dy * bend).toFixed(1)} ${((a.y + b.y) / 2 + dx * bend).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  const intelCurve = (a, b, kind) => { const dx = b.x - a.x, dy = b.y - a.y, bend = kind === "formula" ? 0.12 : 0.28; return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${((a.x + b.x) / 2 + dy * bend).toFixed(1)} ${((a.y + b.y) / 2 - dx * bend).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`; };
  function buildEdges() {
    const make = (g, l, cls, isIntel) => {
      const p = document.createElementNS(SVGNS, "path");
      p.setAttribute("class", cls); p.setAttribute("pathLength", "1");
      p.dataset.from = l.from; p.dataset.to = l.to;
      return { el: p, from: l.from, to: l.to, kind: l.kind, intel: isIntel, g };
    };
    const show = (l) => !hidden.has(l.to) && !hidden.has(l.from) && map.byId.has(l.from) && map.byId.has(l.to);
    edges = [
      ...map.links.filter(show).map((l) => { const e = make(eBase, l, `e e-${l.kind}`); e.el.style.setProperty("--c", `#${colourOf(map.byId.get(l.kind === "user" ? l.from : l.to))}`); if (l.kind === "user") e.el.setAttribute("marker-end", "url(#smap-arrow)"); return e; }),
      ...(S.links ? intel.links.filter(show).map((l) => { const e = make(eIntel, l, `e x-${l.kind}`, true); e.el.style.setProperty("--o", l.confidence.toFixed(2)); if (l.kind !== "contrast") e.el.setAttribute("marker-end", "url(#smap-arrow)"); return e; }) : []),
    ];
    eBase.replaceChildren(...edges.filter((e) => !e.intel).map((e) => e.el));
    eIntel.replaceChildren(...edges.filter((e) => e.intel).map((e) => e.el));
  }
  function updateEdges(only = null) {
    for (const e of edges) {
      if (only && !only.has(e.from) && !only.has(e.to)) continue;
      const a = pos[e.from], b = pos[e.to];
      if (a && b) e.el.setAttribute("d", e.intel ? intelCurve(a, b, e.kind) : curve(a, b, e.kind));
    }
  }

  // ---------- highlight: practice, an insight or answer, a search, or the selection ----------
  function activeSet() {
    if (S.walk && S.walk.i < S.walk.ids.length) return new Set([S.walk.ids[S.walk.i], map.byId.get(S.walk.ids[S.walk.i])?.parent].filter(Boolean));
    if (S.focus) return new Set(S.focus);
    const q = S.query.trim().toLowerCase();
    if (q) return new Set(map.nodes.filter((n) => `${n.label} ${n.sub || ""}`.toLowerCase().includes(q)).map((n) => n.id));
    if (!S.selected || S.selected === "root") return null;
    const s = new Set([S.selected, ...descendants(map, S.selected)]);
    const n = map.byId.get(S.selected);
    if (n?.parent) s.add(n.parent);
    for (const l of [...intel.links, ...map.links.filter((x) => x.kind === "user")]) if (l.from === S.selected || l.to === S.selected) { s.add(l.from); s.add(l.to); }
    return s;
  }
  function highlight() {
    const on = activeSet();
    root.classList.toggle("focusing", Boolean(on));
    root.classList.toggle("linking", Boolean(S.linking));
    for (const [id, node] of nodeEls) {
      node.classList.toggle("lit", Boolean(on?.has(id)));
      node.classList.toggle("sel", id === S.selected);
      node.classList.toggle("link-from", id === S.linking);
    }
    for (const e of edges) e.el.classList.toggle("lit", Boolean(on?.has(e.from) && on?.has(e.to)));
  }

  // ---------- view: pan and zoom ----------
  function applyView() {
    const { x, y, k } = S.view;
    world.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${k.toFixed(4)})`;
    stage.style.setProperty("--gx", `${x.toFixed(1)}px`); stage.style.setProperty("--gy", `${y.toFixed(1)}px`); stage.style.setProperty("--gs", `${(32 * k).toFixed(2)}px`);
    $(".smap-pct").textContent = `${Math.round(k * 100)}%`;
  }
  function zoomAt(px, py, f) {
    const k1 = clamp(S.view.k * f, DEFAULTS.minZoom, DEFAULTS.maxZoom), r = k1 / S.view.k;
    S.view = { x: px - (px - S.view.x) * r, y: py - (py - S.view.y) * r, k: k1 };
    moving(); schedule("view");
  }
  function tween(step, ms = 520) {
    cancelAnimationFrame(raf);
    const t0 = performance.now();
    const tick = (now) => { const t = clamp((now - t0) / ms, 0, 1); step(ease(t)); moving(); if (t < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
  }
  function viewTo(to, ms) {
    const from = { ...S.view };
    tween((t) => { S.view = { k: from.k + (to.k - from.k) * t, x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t }; applyView(); drawMini(); }, ms);
  }
  function fit(ids, animate = true) {
    const W = stage.clientWidth, H = stage.clientHeight;
    if (!W || !H) return;
    const b = bounds(map, pos, (ids && ids.length ? ids : visible().map((n) => n.id)).filter((id) => !hidden.has(id)));
    const k = clamp(Math.min((W - 72) / b.w, (H - 120) / b.h), DEFAULTS.minZoom, ids?.length ? 1.25 : 1.1);
    const to = { k, x: W / 2 - (b.x0 + b.w / 2) * k, y: (H + 20) / 2 - (b.y0 + b.h / 2) * k };
    if (animate) viewTo(to); else { S.view = to; applyView(); drawMini(); }
  }
  function centreOn(id, minK = 0.8) {
    const p = pos[id];
    if (!p) return;
    const k = Math.max(S.view.k, minK);
    viewTo({ k, x: stage.clientWidth / 2 - p.x * k, y: stage.clientHeight / 2 - p.y * k });
  }
  // glide every node to new positions (layout switch, tidy, undo, reset)
  function glideTo(target, then) {
    const from = Object.fromEntries(Object.entries(pos).map(([id, p]) => [id, { ...p }]));
    tween((t) => {
      for (const id in target) { const a = from[id] || target[id], b = target[id]; pos[id] = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }; }
      placeNodes(); drawMini();
      if (t === 1) then?.();
    }, 560);
  }

  // ---------- minimap ----------
  let miniBox = null;
  function drawMini() {
    if (!mini.isConnected || mini.offsetParent === null) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1), W = 176, H = 116;
    if (mini.width !== W * dpr) { mini.width = W * dpr; mini.height = H * dpr; }
    const g = mini.getContext("2d");
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    const ids = visible().map((n) => n.id), b = bounds(map, pos, ids);
    const s = Math.min((W - 16) / b.w, (H - 16) / b.h), ox = (W - b.w * s) / 2 - b.x0 * s, oy = (H - b.h * s) / 2 - b.y0 * s;
    miniBox = { s, ox, oy };
    const P = (p) => [p.x * s + ox, p.y * s + oy];
    g.lineWidth = 1;
    for (const l of map.links) {
      if (hidden.has(l.to) || !pos[l.from] || !pos[l.to] || l.kind === "user") continue;
      g.strokeStyle = `#${colourOf(map.byId.get(l.to))}88`; g.beginPath(); g.moveTo(...P(pos[l.from])); g.lineTo(...P(pos[l.to])); g.stroke();
    }
    for (const id of ids) {
      const n = map.byId.get(id), [x, y] = P(pos[id]), r = n.type === "root" ? 4 : n.type === "topic" ? 3.2 : 2.2;
      g.fillStyle = `#${colourOf(n)}`; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
    }
    // the part of the map on screen
    const k = S.view.k, vx = -S.view.x / k * s + ox, vy = -S.view.y / k * s + oy, vw = stage.clientWidth / k * s, vh = stage.clientHeight / k * s;
    g.strokeStyle = "rgba(160,170,255,.95)"; g.fillStyle = "rgba(123,134,255,.12)"; g.lineWidth = 1.5;
    g.beginPath(); g.roundRect ? g.roundRect(vx, vy, vw, vh, 4) : g.rect(vx, vy, vw, vh); g.fill(); g.stroke();
  }
  function miniJump(e) {
    if (!miniBox) return;
    const r = mini.getBoundingClientRect(), wx = (e.clientX - r.left - miniBox.ox) / miniBox.s, wy = (e.clientY - r.top - miniBox.oy) / miniBox.s;
    S.view = { ...S.view, x: stage.clientWidth / 2 - wx * S.view.k, y: stage.clientHeight / 2 - wy * S.view.k };
    S.touched = true; moving(); schedule("view");
  }
  function onMiniDown(e) {
    e.stopPropagation(); e.preventDefault();
    cancelAnimationFrame(raf);
    miniJump(e);
    const mv = (ev) => miniJump(ev), up = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
  }

  // ---------- panel: Gradify Intelligence, a node, or practice ----------
  const chip = (id, extra = "") => { const n = map.byId.get(id); return n ? `<button type="button" class="smp-chip" data-go="${esc(id)}" style="--c:#${colourOf(n)}">${esc(n.label)}${extra}</button>` : ""; };
  const head = (badge, kicker, title, close, c = "") => `<header class="smp-head"${c ? ` style="--c:${c}"` : ""}><span class="smp-badge${c ? " solid" : ""}">${badge}</span><div><em>${kicker}</em><b>${title}</b></div>${close}</header>`;
  function syncCard() {
    if (!S.data) return `<div class="smp-sync loading"><span class="smp-pulse"></span><div><b>Checking your memory…</b><em>Reading your flashcards and answers.</em></div></div>`;
    if (!mem.synced) return `<div class="smp-sync off"><span class="smp-ii">${ico("brain")}</span><div><b>Not in your flashcards yet</b><em>Make flashcards from these notes in the Gradify app and this map shows what you remember of every term, live.</em><a class="smp-link" href="${APP}#/new">Open the Gradify app →</a></div></div>`;
    return `<div class="smp-sync on"><span class="smp-pulse"></span><div><b>Synced with your memory</b><em>${mem.tracked} of ${intel.total} terms in your flashcards · ${mem.answers} ${mem.answers === 1 ? "answer" : "answers"}${S.data.mode === "cloud" ? " · your account" : " · this device"}</em>
      ${mem.due ? `<a class="smp-link" href="${APP}#/study">Review ${mem.due} due ${mem.due === 1 ? "term" : "terms"} →</a>` : ""}</div></div>`;
  }
  // questions worth asking, made from this map: a pair that's easy to mix up, and a term that builds on another
  function suggestions() {
    const out = ["What should I learn first?"];
    const mix = intel.links.find((l) => l.kind === "contrast"), build = intel.links.find((l) => l.kind === "builds");
    // terms read naturally mid-sentence: "systole", but "ECG" and "P wave" keep their capitals
    const short = (id) => { const t = map.byId.get(id).fact?.term || map.byId.get(id).label; return /^[A-Z0-9]{2,}|^[A-Z]\s/.test(t) ? t : t[0].toLowerCase() + t.slice(1); };
    if (mix) out.push(`Compare ${short(mix.from)} and ${short(mix.to)}`);
    if (build) out.push(`What does ${short(build.to)} depend on?`);
    out.push(mem.synced ? "What am I forgetting?" : "Any formulas?");
    return out;
  }
  function askCard() {
    const a = S.asked?.a;
    return `<form class="smp-ask" data-form="ask"><span class="smp-ask-ico">${ico("sparkle")}</span><input name="q" type="text" placeholder="Ask about these notes…" aria-label="Ask a question about these notes" autocomplete="off" value="${esc(S.asked?.q || "")}"><button type="submit" aria-label="Ask">${ico("send")}</button></form>
      ${a ? `<div class="smp-answer k-${a.kind}"><b class="smp-answer-t">${esc(a.title)}</b>${a.parts.map((p) => `<div class="smp-part">${p.head ? (p.id ? `<button type="button" class="smp-part-h" data-go="${esc(p.id)}">${esc(p.head)}</button>` : `<b class="smp-part-h">${esc(p.head)}</b>`) : ""}<span>${esc(p.text)}</span></div>`).join("")}
        <button type="button" class="smp-answer-x" data-act="ask-clear">Clear</button></div>`
        : `<div class="smp-sugg">${suggestions().map((q) => `<button type="button" data-ask="${esc(q)}">${esc(q)}</button>`).join("")}</div>`}`;
  }
  function intelPanel() {
    const p = intel.total ? Math.round((intel.learnt / intel.total) * 100) : 0;
    const topics = map.nodes.filter((n) => n.type === "topic").length;
    const qs = intel.insights.filter((x) => x.kind === "question"), rest = intel.insights.filter((x) => x.kind !== "question");
    const counts = Object.keys(STATE).map((s) => [s, [...mem.terms.values()].filter((m) => m.state === s).length]).filter(([, n]) => n);
    return `${head(ico("sparkle"), "Gradify Intelligence", "How your notes fit together", `<button type="button" class="smp-x" data-act="panel" aria-label="Hide Gradify Intelligence">${ico("close")}</button>`)}
      ${askCard()}
      ${syncCard()}
      <section class="smp-card-glass">
        <div class="smp-progress"><div class="smp-row"><span><b>${intel.learnt}</b> of ${intel.total} terms known</span><b class="smp-pctbig">${p}%</b></div><div class="smp-bar"><i style="width:${p}%"></i></div></div>
        ${counts.length ? `<div class="smp-states">${counts.map(([s, n]) => `<span style="--c:#${STATE[s].colour}"><i></i>${n} ${STATE[s].label.toLowerCase()}</span>`).join("")}</div>` : ""}
        <div class="smp-stats"><span><b>${topics}</b>topics</span><span><b>${intel.total}</b>terms</span><span><b>${intel.links.filter((l) => l.kind !== "formula").length}</b>links</span></div>
      </section>
      ${intel.total ? `<button type="button" class="smp-practise" data-act="walk">${ico("target")}<span><b>Practise this map</b><em>${intel.total} terms, weakest and most fundamental first</em></span><kbd>P</kbd></button>` : ""}
      ${rest.length ? `<h4>Insights</h4><ul class="smp-list">${rest.map((x) => `<li><button type="button" class="smp-ins k-${x.kind}" data-ins="${intel.insights.indexOf(x)}">
        <span class="smp-ii">${ico(x.icon)}</span><span class="smp-it"><b>${esc(x.title)}</b><em>${esc(x.detail)}</em>
        ${x.confidence ? `<span class="smp-conf" title="How sure Gradify is: ${pct(x.confidence)}"><i style="width:${Math.round(x.confidence * 100)}%"></i></span>` : ""}</span></button></li>`).join("")}</ul>` : ""}
      ${qs.length ? `<h4>Test yourself</h4><div class="smp-qs">${qs.map((x) => `<details class="smp-q"><summary><span class="smp-qt">${x.qtype === "apply" ? "Apply" : "Explain"}</span>${esc(x.title)}</summary><p>${esc(x.detail)}</p></details>`).join("")}</div>` : ""}
      ${intel.order.length > 1 ? `<h4>Suggested order</h4><ol class="smp-order">${intel.order.slice(0, 14).map((id) => `<li class="${intel.known(id) ? "done" : ""}">${chip(id)}</li>`).join("")}</ol>` : ""}
      <p class="smp-foot">${ico("quote")}Worked out from your notes and your own answers. Every link quotes the words it rests on.</p>`;
  }
  function memSection(n) {
    const m = mem.terms.get(n.id);
    if (!m) return S.data ? `<p class="smp-note">${ico("brain")}Not in your flashcards yet, so Gradify can't see how well you remember it.</p>` : "";
    const fade = m.state === "new" ? "–" : m.fadesIn === 0 ? "now" : m.fadesIn > 60 ? "not for weeks" : whenText(Date.now() + m.fadesIn * DAY);
    return `<section class="smp-mem s-${m.state}" style="--m:#${STATE[m.state].colour}">
      <div class="smp-row"><span class="smp-state"><i></i>${STATE[m.state].label}${m.due ? ` · <span class="smp-due">due</span>` : ""}</span>${m.recall != null ? `<span class="smp-recall"><b>${pct(m.recall)}</b> recall now</span>` : ""}</div>
      <div class="smp-meter"><i style="width:${m.recall != null ? Math.round(m.recall * 100) : 0}%"></i><span class="t70" title="70%: below this, Gradify brings it back"></span></div>
      <dl><div><dt>Below 70%</dt><dd>${fade}</dd></div><div><dt>Next review</dt><dd>${m.nextReview ? whenText(m.nextReview) : "–"}</dd></div><div><dt>Answers</dt><dd>${m.answers}</dd></div></dl>
      ${m.history.length ? `<div class="smp-hist" aria-label="Your last answers, newest first">${m.history.map((h) => `<i class="r-${h.rating}" title="${RATING[h.rating] || h.rating}${h.confidence ? `, ${h.confidence}` : ""} · ${new Date(h.at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}"></i>`).join("")}<em>last answers</em></div>` : ""}
      ${m.sureWrong ? `<p class="smp-warn">${icon("alert")}You were sure but wrong ${m.sureWrong} ${m.sureWrong === 1 ? "time" : "times"} recently: likely a misconception.</p>` : ""}
      ${m.due ? `<a class="smp-link" href="${APP}#/study">Review it now →</a>` : ""}
    </section>`;
  }
  function userLinks(n) {
    const mine = map.links.filter((l) => l.kind === "user" && (l.from === n.id || l.to === n.id));
    return `<h5>Your links</h5><div class="smp-chips">${mine.map((l) => { const other = l.from === n.id ? l.to : l.from; return `<span class="smp-chipwrap">${chip(other)}<button type="button" class="smp-unlink" data-unlink="${esc(l.from)}|${esc(l.to)}" aria-label="Remove link to ${esc(map.byId.get(other)?.label || "")}">${ico("close")}</button></span>`; }).join("")}
      <button type="button" class="smp-addlink" data-act="link">${ico("link")}${S.linking === n.id ? "Click a node on the map…" : "Link to…"}</button></div>`;
  }
  function nodePanel(n) {
    const c = `#${colourOf(n)}`;
    const top = head(ico(n.type === "term" ? "book" : n.icon), `${TYPE_NAME[n.type]}${n.topic != null && n.type !== "topic" ? ` · ${esc(map.byId.get(`t${n.topic}`)?.label || "")}` : ""}`, esc(n.label), `<button type="button" class="smp-x" data-act="deselect" aria-label="Back to Gradify Intelligence">${ico("close")}</button>`, c);
    const acts = [];
    let body = "";
    if (n.type === "term") {
      const f = n.fact, shown = !veiled(n);
      const into = intel.links.filter((l) => l.kind === "builds" && l.to === n.id).map((l) => l.from);
      const out = intel.links.filter((l) => l.kind !== "contrast" && l.from === n.id).map((l) => l.to);
      const mix = intel.links.filter((l) => l.kind === "contrast" && (l.from === n.id || l.to === n.id)).map((l) => (l.from === n.id ? l.to : l.from));
      body = `${shown ? `<p class="smp-def">${esc(f.def[0].toUpperCase() + f.def.slice(1))}.</p>` : `<button type="button" class="smp-reveal" data-act="reveal">${ico("eye")}Say it to yourself, then reveal</button>`}
        ${memSection(n)}
        ${f.card ? `<div class="smp-flash"><em>Flashcard</em><b>${esc(f.card.q)}</b></div>` : ""}
        ${f.src ? `<blockquote class="smp-src">${ico("quote")}<span><em>From your notes</em>${esc(f.src)}</span></blockquote>` : ""}
        ${into.length ? `<h5>Builds on</h5><div class="smp-chips">${into.map((x) => chip(x)).join("")}</div>` : ""}
        ${out.length ? `<h5>Leads to</h5><div class="smp-chips">${out.map((x) => chip(x)).join("")}</div>` : ""}
        ${mix.length ? `<h5>Easy to mix up with</h5><div class="smp-chips">${mix.map((x) => chip(x)).join("")}</div>` : ""}
        ${userLinks(n)}`;
      acts.push(`<button type="button" class="smp-btn ${n.learnt ? "" : "primary"}" data-act="learn">${icon("check")}${n.learnt ? "Known · undo" : "I know this"}</button>`);
    } else if (n.type === "topic") {
      const terms = kidsOf(n.id), qs = questions.filter((q) => q.group === n.topic);
      const rs = terms.map((t) => mem.terms.get(t.id)?.recall).filter((r) => r != null), avg = rs.length ? rs.reduce((a, r) => a + r, 0) / rs.length : null;
      body = `${n.sub && n.sub !== n.label ? `<p class="smp-sub">${esc(n.sub)}</p>` : ""}
        ${avg != null ? `<section class="smp-mem" style="--m:#${STATE[avg >= 0.85 ? "strong" : avg >= 0.7 ? "learning" : "fading"].colour}"><div class="smp-row"><span class="smp-state"><i></i>Topic memory</span><span class="smp-recall"><b>${pct(avg)}</b> average recall</span></div><div class="smp-meter"><i style="width:${Math.round(avg * 100)}%"></i><span class="t70"></span></div><p class="smp-sub">${rs.length} of ${terms.length} terms reviewed.</p></section>` : ""}
        ${n.acronym ? `<div class="smp-hook"><span class="sm-acr">${esc(n.acronym)}</span><span>Memory hook: ${terms.filter((t) => t.fact).map((t) => `<b>${esc(t.fact.term[0])}</b>${esc(t.fact.term.slice(1))}`).join(", ")}</span></div>` : ""}
        <h5>Terms</h5><div class="smp-chips">${terms.map((t) => chip(t.id)).join("")}</div>
        <h5>Colour</h5><div class="smp-swatches" role="radiogroup" aria-label="Topic colour">${SWATCHES.map((h) => `<button type="button" role="radio" aria-checked="${h === n.colour}" aria-label="#${h}" data-colour="${h}" style="--c:#${h}"></button>`).join("")}</div>
        ${qs.length ? `<h5>Test yourself</h5>${qs.map((q) => `<details class="smp-q"><summary><span class="smp-qt">${q.type === "apply" ? "Apply" : "Explain"}</span>${esc(q.question)}</summary><p>${esc(q.answer)}</p></details>`).join("")}` : ""}
        ${userLinks(n)}`;
      acts.push(`<button type="button" class="smp-btn" data-act="walk-topic">${ico("target")}Practise this topic</button>`, `<button type="button" class="smp-btn" data-act="fold">${ico(S.collapsed.has(n.id) ? "expand" : "collapse")}${S.collapsed.has(n.id) ? "Expand" : "Collapse"}</button>`, `<button type="button" class="smp-btn" data-act="zoomto">${ico("fit")}Zoom to arm</button>`);
    } else if (n.type === "eq") {
      const used = intel.links.filter((l) => l.kind === "formula" && l.to === n.id).map((l) => l.from);
      body = `<p class="smp-eq"><code>${esc(n.label)}</code></p>${used.length ? `<h5>Made from</h5><div class="smp-chips">${used.map((x) => chip(x)).join("")}</div>` : ""}${userLinks(n)}`;
    } else if (n.type === "note") body = `<p class="smp-sub">Your own note. Double-click it on the map, or use Rename, to change it.</p>${userLinks(n)}`;
    acts.push(`<button type="button" class="smp-btn" data-act="add">${ico("plus")}Add a note</button>`, `<button type="button" class="smp-btn" data-act="rename">${ico("edit")}Rename</button>`);
    if (n.type !== "root") acts.push(`<button type="button" class="smp-btn danger" data-act="remove">${ico("trash")}${n.custom ? "Delete" : "Hide"}</button>`);
    return `${top}<div class="smp-body">${body}</div><div class="smp-acts">${acts.join("")}</div>`;
  }
  function walkPanel() {
    const w = S.walk, close = `<button type="button" class="smp-x" data-act="walk-stop" aria-label="Stop practising">${ico("close")}</button>`;
    if (w.i >= w.ids.length) {
      const got = w.got.size, n = w.ids.length;
      return `${head(ico("check"), "Practice done", `You knew ${got} of ${n}`, close)}
        <div class="smp-done"><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="trk" cx="60" cy="60" r="52"/><circle class="val" cx="60" cy="60" r="52" pathLength="100" stroke-dasharray="${Math.round((got / n) * 100)} 100"/></svg><b>${Math.round((got / n) * 100)}%</b></div>
        <p class="smp-sub">${got === n ? "Every term. They're marked as known on the map." : `The ${n - got} you didn't know are lit on the map. Go through them again, or turn them into flashcards so Gradify brings them back at the right time.`}</p>
        <div class="smp-acts">${got < n ? `<button type="button" class="smp-btn primary" data-act="walk-again">${ico("reset")}Again, just the ${n - got} I missed</button>` : ""}<button type="button" class="smp-btn" data-act="walk-stop">Done</button></div>`;
    }
    const n = map.byId.get(w.ids[w.i]), f = n.fact, m = mem.terms.get(n.id);
    return `${head(`<b class="smp-step">${w.i + 1}</b>`, `Practise · ${w.i + 1} of ${w.ids.length}${m ? ` · ${STATE[m.state].label}` : ""}`, esc(n.label), close, `#${colourOf(n)}`)}
      <div class="smp-bar thin"><i style="width:${Math.round((w.i / w.ids.length) * 100)}%"></i></div>
      <div class="smp-body">
        <div class="smp-flash big"><em>${f.card ? "Flashcard" : "Recall"}</em><b>${esc(f.card?.q || `What is ${n.label}?`)}</b></div>
        ${w.shown ? `<p class="smp-def">${esc(f.def[0].toUpperCase() + f.def.slice(1))}.</p>${f.src ? `<blockquote class="smp-src">${ico("quote")}<span><em>From your notes</em>${esc(f.src)}</span></blockquote>` : ""}`
          : `<button type="button" class="smp-reveal" data-act="walk-show">${ico("eye")}Say it out loud, then reveal <kbd>Space</kbd></button>`}
      </div>
      <div class="smp-acts">${w.shown ? `<button type="button" class="smp-btn primary" data-act="walk-got">${icon("check")}I knew it <kbd>1</kbd></button><button type="button" class="smp-btn" data-act="walk-miss">${ico("reset")}Not yet <kbd>2</kbd></button>` : `<button type="button" class="smp-btn" data-act="walk-skip">Skip</button>`}</div>`;
  }
  function renderPanel() {
    const n = S.selected && S.selected !== "root" ? map.byId.get(S.selected) : null;
    const top = panel.scrollTop, same = panel.dataset.for === (S.walk ? "walk" : n ? n.id : "intel");
    panel.innerHTML = S.walk ? walkPanel() : n ? nodePanel(n) : intelPanel();
    panel.dataset.kind = S.walk ? "walk" : n ? n.type : "intel";
    panel.dataset.for = S.walk ? "walk" : n ? n.id : "intel";
    if (same) panel.scrollTop = top;   // re-rendering the same panel keeps the reader's place
  }
  function renderBar() {
    for (const b of el.querySelectorAll(".smap-seg [data-layout]")) b.setAttribute("aria-checked", String(b.dataset.layout === S.layout));
    const r = $('[data-act="recall"]');
    r.setAttribute("aria-pressed", String(S.recall)); r.innerHTML = `${ico(S.recall ? "eyeoff" : "eye")}<span>Recall</span>`;
    $('[data-act="links"]').setAttribute("aria-pressed", String(S.links));
    $('[data-act="lens"]').setAttribute("aria-pressed", String(S.lens === "memory"));
    $(".smap-bar [data-act=panel]").setAttribute("aria-pressed", String(S.panel));
    $(".smap-sync").hidden = !mem.synced;
    root.classList.toggle("no-panel", !S.panel);
    root.classList.toggle("recall", S.recall);
    root.classList.toggle("walking", Boolean(S.walk));
    root.dataset.arrange = S.layout; root.dataset.lens = S.lens;
    $(".smap-legend").innerHTML = S.lens === "memory"
      ? Object.entries(STATE).map(([, v]) => `<span><i class="lg-dot" style="--c:#${v.colour}"></i>${v.label}</span>`).join("")
      : `<span><i class="lg-arm"></i>Topic arm</span><span><i class="lg-build"></i>Builds on</span><span><i class="lg-mix"></i>Easy to mix up</span>`;
  }
  function renderAll() { renderBar(); renderNodes(); renderPanel(); drawMini(); }

  // ---------- actions ----------
  function select(id, { centre = false } = {}) {
    S.selected = id; S.focus = null;
    if (id && !S.panel) { S.panel = true; renderBar(); }
    renderPanel(); highlight();
    if (centre && id) centreOn(id);
  }
  function save(ids) {
    const mine = S.saved[S.layout] || (S.saved[S.layout] = {});
    for (const id of ids) mine[id] = { x: Math.round(pos[id].x), y: Math.round(pos[id].y) };
    persist();
  }
  function refreshAll() { rebuild(); renderNodes(); renderPanel(); drawMini(); }
  function toggleFold(id) {
    checkpoint();
    if (S.collapsed.has(id)) S.collapsed.delete(id); else S.collapsed.add(id);
    persist(); refreshAll();
  }
  function foldAll(collapse) {
    checkpoint();
    S.collapsed = new Set(collapse ? map.nodes.filter((n) => n.type === "topic" && kidsOf(n.id).length).map((n) => n.id) : []);
    persist(); refreshAll(); fit();
  }
  function setLayout(id) {
    if (id === S.layout) return;
    S.layout = id; persist();
    const old = pos; rebuild(); const target = pos; pos = old;
    renderBar(); renderNodes();
    glideTo(target, () => fit());
  }
  function tidy() {
    checkpoint();
    delete S.saved[S.layout]; persist();
    const old = pos; rebuild(); const target = pos; pos = old;
    glideTo(target, () => fit());
    snack("Tidied: every node back where the layout puts it", true);
  }
  // quiet: practice marks terms as it goes and reports once at the end (onPractised), not once per term
  function setKnown(n, known, quiet = false) {
    const t = n.fact.term.toLowerCase();
    if (known === learnt.has(t)) return;
    if (known) learnt.add(t); else learnt.delete(t);
    if (!quiet) onLearn(n.fact.term, known);
  }
  function toggleLearn(n) {
    checkpoint();
    const known = !learnt.has(n.fact.term.toLowerCase());
    setKnown(n, known);
    refreshAll();
    if (known) toast(`Marked “${esc(n.fact.term)}” as known.`);
  }
  function addNote(parent, at = null) {
    checkpoint();
    const id = newId();
    S.edits.added.push({ id, parent, label: "New note" });
    rebuild();
    if (at) pos[id] = at;
    save([id]);
    S.collapsed.delete(parent);
    justAdded = id;
    renderNodes();
    select(id);
    rename(id, true);
  }
  let snackTimer = 0;
  function snack(text, undoable = false) {
    const s = $(".smap-snack");
    s.innerHTML = `<span>${text}</span>${undoable ? `<button type="button" data-act="undo">Undo</button>` : ""}`;
    s.hidden = false;
    clearTimeout(snackTimer); snackTimer = setTimeout(() => { s.hidden = true; }, 5000);
  }
  function remove(id) {
    const n = map.byId.get(id);
    if (!n || id === "root") return;
    checkpoint();
    if (n.custom) {
      const gone = new Set([id, ...descendants(map, id)]);
      S.edits.added = S.edits.added.filter((a) => !gone.has(a.id));
    } else S.edits.removed.push(id);
    persist(); S.selected = null;
    refreshAll();
    snack(`${n.custom ? "Deleted" : "Hid"} “${esc(n.label)}”`, true);
  }
  function rename(id, isNew = false) {
    const label = nodeEls.get(id)?.querySelector(".sm-label");
    if (!label) return;
    const before = label.textContent;
    label.contentEditable = "plaintext-only";
    if (label.contentEditable !== "plaintext-only") label.contentEditable = "true";
    label.spellcheck = true;
    label.classList.add("editing");
    label.focus({ preventScroll: true });
    getSelection()?.selectAllChildren(label);
    const done = (keep) => {
      label.removeEventListener("blur", onBlur); label.removeEventListener("keydown", onKeyEdit);
      label.contentEditable = "false"; label.classList.remove("editing");
      const text = label.textContent.replace(/\s+/g, " ").trim().slice(0, 120);
      if (keep && text && text !== before) { if (!isNew) checkpoint(); S.edits.labels[id] = text; persist(); }
      refreshAll();
      nodeEls.get(id)?.focus({ preventScroll: true });
    };
    const onBlur = () => done(true);
    const onKeyEdit = (e) => { e.stopPropagation(); if (e.key === "Enter") { e.preventDefault(); done(true); } if (e.key === "Escape") { label.textContent = before; done(false); } };
    label.addEventListener("blur", onBlur); label.addEventListener("keydown", onKeyEdit);
  }
  function startLink(id) {
    S.linking = S.linking === id ? null : id;
    renderPanel(); highlight();
    if (S.linking) snack("Click the node to link it to · Esc to cancel");
  }
  function finishLink(to) {
    const from = S.linking;
    S.linking = null;
    if (from && to && from !== to && !S.edits.links.some((l) => (l.from === from && l.to === to) || (l.from === to && l.to === from))) {
      checkpoint();
      S.edits.links.push({ from, to }); persist();
      refreshAll();
      snack(`Linked “${esc(map.byId.get(from).label)}” to “${esc(map.byId.get(to).label)}”`, true);
    } else { renderPanel(); highlight(); }
  }
  function setColour(id, hex) {
    checkpoint();
    S.edits.colours[id] = hex; persist();
    refreshAll();
  }
  function reset() {
    if (!confirmReset) { confirmReset = true; snack("Reset clears your layout, notes, links, colours and renames for this map. Choose Reset again to confirm."); setTimeout(() => { confirmReset = false; }, 5000); return; }
    confirmReset = false;
    checkpoint();
    S.saved = {}; S.collapsed.clear(); S.edits = { labels: {}, added: [], removed: [], colours: {}, links: [] }; S.selected = null; S.focus = null;
    persist();
    const old = pos; rebuild(); const target = pos; pos = old;
    renderNodes(); renderPanel();
    glideTo(target, () => { renderNodes(); fit(); });
    snack("Map reset", true);
  }
  let confirmReset = false;
  function exportText() { return toMarkdown(map, intel, mem); }
  async function copyOutline() {
    try { await navigator.clipboard.writeText(exportText()); snack("Outline copied"); }
    catch { snack("Couldn't reach the clipboard. Use Download instead."); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([exportText()], { type: "text/markdown" }));
    const a = document.createElement("a");
    a.href = url; a.download = `${(pack.title || "spidermap").replace(/[^\w-]+/g, "-").toLowerCase()}-spidermap.md`;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function runAsk(q) {
    const a = ask(q, map, intel, mem);
    S.asked = { q, a };
    S.selected = null; S.focus = a.ids.length ? a.ids : null;
    if (!S.panel) { S.panel = true; renderBar(); }
    a.ids.forEach((id) => { const n = map.byId.get(id); if (n?.parent && S.collapsed.has(n.parent)) { S.collapsed.delete(n.parent); } });
    refreshAll();
    if (S.focus) fit(S.focus);
    panel.querySelector(".smp-answer")?.scrollIntoView({ block: "nearest" });
  }
  function toggleMenu(open = menu.hidden) {
    menu.hidden = !open;
    $('[data-act="menu"]').setAttribute("aria-expanded", String(open));
    if (open) menu.querySelector("button")?.focus({ preventScroll: true });
  }
  function toggleKeys(open) {
    const k = $(".smap-keys");
    open ??= k.hidden;
    k.innerHTML = `<header><b>${ico("keyboard")}Keyboard shortcuts</b><button type="button" class="smp-x" data-act="keys-close" aria-label="Close">${ico("close")}</button></header><dl>${SHORTCUTS.map(([a, b]) => `<div><dt><kbd>${esc(a)}</kbd></dt><dd>${esc(b)}</dd></div>`).join("")}</dl>`;
    k.hidden = !open;
    if (open) k.querySelector("button")?.focus({ preventScroll: true });
  }

  // ---------- practise the map: weakest and most fundamental first ----------
  function walkOrder(only = null) {
    const rank = { shaky: 0, fading: 1, new: 2, learning: 3, strong: 5 };
    const ids = intel.order.filter((id) => !hidden.has(id) && (!only || only.has(id)));
    return ids.map((id, i) => ({ id, r: (rank[mem.terms.get(id)?.state] ?? 2) + (intel.known(id) ? 4 : 0), i })).sort((a, b) => a.r - b.r || a.i - b.i).map((x) => x.id);
  }
  function startWalk(ids = walkOrder()) {
    if (!ids.length) return;
    S.walk = { ids, i: 0, got: new Set(), shown: false }; S.selected = null; S.focus = null; S.asked = null;
    if (!S.panel) S.panel = true;
    renderAll(); centreOn(ids[0], 0.9);
  }
  function walkNext(knew) {
    const w = S.walk, id = w.ids[w.i], n = map.byId.get(id);
    if (knew === true) { w.got.add(id); setKnown(n, true, true); }
    w.i++; w.shown = false;
    refreshAll();
    if (w.i < w.ids.length) centreOn(w.ids[w.i], 0.9);
    else {
      S.focus = w.ids.filter((x) => !w.got.has(x)); highlight(); fit(S.focus.length ? S.focus : null);
      onPractised({ knew: w.got.size, total: w.ids.length, missed: S.focus.map((x) => map.byId.get(x)?.fact?.term).filter(Boolean) });
    }
  }
  function stopWalk() { S.walk = null; S.focus = null; renderAll(); }

  // ---------- pointer: pan, drag, pinch ----------
  const pointers = new Map();
  let drag = null, pinch = null;
  function onDown(e) {
    if (e.button > 0 || e.target.closest(".smap-zoom, .smap-legend, .smap-snack, .smap-mini, .smap-keys, .editing")) return;
    cancelAnimationFrame(raf);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), k: S.view.k }; drag = null; return;
    }
    const node = e.target.closest(".smap-node"), id = node?.dataset.id;
    drag = { id, x0: e.clientX, y0: e.clientY, moved: false, fold: Boolean(e.target.closest("[data-act=fold]")), view0: { ...S.view } };
    if (id && id !== "root" && !S.linking) { drag.ids = [id, ...descendants(map, id)]; drag.only = new Set(drag.ids); drag.start = Object.fromEntries(drag.ids.map((x) => [x, { ...pos[x] }])); }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  }
  let pendingMove = null;
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
    if (!drag.moved) { drag.moved = true; root.classList.add(drag.ids ? "dragging" : "panning"); if (drag.ids) checkpoint(); }
    S.touched = true; moving();
    if (drag.ids) {
      for (const id of drag.ids) pos[id] = { x: drag.start[id].x + dx / S.view.k, y: drag.start[id].y + dy / S.view.k };
      // only the dragged arm and its edges are repainted, once a frame
      if (!pendingMove) pendingMove = requestAnimationFrame(() => { pendingMove = null; if (drag?.only) placeNodes(drag.only); drawMini(); });
    } else { S.view = { ...S.view, x: drag.view0.x + dx, y: drag.view0.y + dy }; schedule("view"); }
  }
  function onUp(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = null;
    if (pointers.size) return;
    window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); window.removeEventListener("pointercancel", onUp);
    const d = drag; drag = null;
    root.classList.remove("dragging", "panning");
    if (!d) return;
    if (d.moved) { if (d.ids) { placeNodes(d.only); save(d.ids); } return; }
    if (e.type === "pointercancel") return;
    if (S.linking) { if (d.id) finishLink(d.id); else { S.linking = null; renderPanel(); highlight(); } return; }
    if (d.fold) { toggleFold(d.id); return; }
    if (S.walk) return;
    if (d.id) {
      const n = map.byId.get(d.id);
      if (n?.type === "term" && S.recall) { S.revealed.add(d.id); nodeEls.get(d.id)?.querySelector(".sm-def")?.classList.remove("veiled"); }
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
    cancelAnimationFrame(raf);
    S.touched = true;
    const r = stage.getBoundingClientRect();
    if (zoom) zoomAt(e.clientX - r.left, e.clientY - r.top, Math.exp(-e.deltaY * (e.deltaMode ? 0.05 : 0.0025) * (e.ctrlKey && !e.metaKey && Math.abs(e.deltaY) < 50 ? 4 : 1)));
    else { S.view = { ...S.view, x: S.view.x - e.deltaX, y: S.view.y - e.deltaY }; moving(); schedule("view"); }
  }
  const onDocDown = (e) => {
    engaged = stage.contains(e.target); root.classList.toggle("engaged", engaged);
    if (!menu.hidden && !e.target.closest(".smap-more")) toggleMenu(false);
  };
  // double-click a node to rename it, or empty space to add a note there
  function onDbl(e) {
    if (e.target.closest(".smap-zoom, .smap-legend, .smap-snack, .smap-mini, .smap-keys")) return;
    const node = e.target.closest(".smap-node");
    e.preventDefault();
    if (node) { rename(node.dataset.id); return; }
    const r = stage.getBoundingClientRect();
    addNote("root", { x: (e.clientX - r.left - S.view.x) / S.view.k, y: (e.clientY - r.top - S.view.y) / S.view.k });
  }

  // ---------- keyboard ----------
  function onKey(e) {
    if (e.target.closest?.(".editing") || e.target.matches?.("input, textarea")) {
      if (e.key === "Escape" && e.target === search) { search.value = ""; onSearch(); stage.focus({ preventScroll: true }); }
      return;
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z" && !e.shiftKey) { e.preventDefault(); undo(); return; }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (S.walk) {
      const w = S.walk;
      if (w.i < w.ids.length) {
        if ((e.key === " " || e.key === "Enter") && !w.shown && !e.target.closest("button")) { e.preventDefault(); w.shown = true; renderNodes(); renderPanel(); return; }
        if (e.key === "1" && w.shown) { e.preventDefault(); walkNext(true); return; }
        if (e.key === "2" && w.shown) { e.preventDefault(); walkNext(false); return; }
      }
      if (e.key === "Escape") { stopWalk(); return; }
    }
    if (e.key === "Escape") {
      if (!$(".smap-keys").hidden) { toggleKeys(false); return; }
      if (!menu.hidden) { toggleMenu(false); return; }
      if (S.linking) { S.linking = null; renderPanel(); highlight(); $(".smap-snack").hidden = true; return; }
    }
    if (e.key === "?") { e.preventDefault(); toggleKeys(); return; }
    const node = e.target.closest?.(".smap-node"), id = node?.dataset.id;
    if (node) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (S.linking) finishLink(id); else select(id === S.selected ? null : id); return; }
      if (e.key === "F2") { e.preventDefault(); rename(id); return; }
      if ((e.key === "Delete" || e.key === "Backspace") && id !== "root") { e.preventDefault(); remove(id); return; }
      const step = e.shiftKey ? 60 : 20, mv = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (mv && id !== "root") {
        e.preventDefault();
        if (!e.repeat) checkpoint();
        const ids = [id, ...descendants(map, id)];
        for (const x of ids) pos[x] = { x: pos[x].x + mv[0], y: pos[x].y + mv[1] };
        placeNodes(new Set(ids)); save(ids); drawMini(); return;
      }
    }
    if (!el.contains(e.target) || e.target.closest?.(".smap-panel input")) return;
    const W = stage.clientWidth / 2, H = stage.clientHeight / 2, k = e.key;
    if (k === "+" || k === "=") { e.preventDefault(); zoomAt(W, H, 1.2); }
    else if (k === "-" || k === "_") { e.preventDefault(); zoomAt(W, H, 1 / 1.2); }
    else if (k === "0") { e.preventDefault(); fit(); }
    else if (k === "/") { e.preventDefault(); search.focus(); }
    else if (k === "e" || k === "E") foldAll(false);
    else if (k === "c" || k === "C") foldAll(true);
    else if ((k === "p" || k === "P") && !S.walk) startWalk();
    else if (k === "Escape") { S.selected = null; S.focus = null; renderPanel(); highlight(); }
  }

  // ---------- clicks on the bar, menu, zoom controls and panel ----------
  function onClick(e) {
    const t = e.target;
    const lay = t.closest(".smap-seg [data-layout]"); if (lay) { setLayout(lay.dataset.layout); return; }
    const sw = t.closest("[data-colour]"); if (sw && S.selected) { setColour(S.selected, sw.dataset.colour); return; }
    const un = t.closest("[data-unlink]");
    if (un) { const [f, to] = un.dataset.unlink.split("|"); checkpoint(); S.edits.links = S.edits.links.filter((l) => !(l.from === f && l.to === to)); persist(); refreshAll(); snack("Link removed", true); return; }
    const sug = t.closest("[data-ask]"); if (sug) { runAsk(sug.dataset.ask); return; }
    const go = t.closest("[data-go]"); if (go && !S.walk) { select(go.dataset.go, { centre: true }); return; }
    const ins = t.closest("[data-ins]");
    if (ins) {
      const x = intel.insights[+ins.dataset.ins];
      const same = S.focus && x.ids.length && x.ids.every((id) => S.focus.includes(id));
      S.focus = same || !x.ids.length ? null : x.ids; S.selected = null;
      for (const b of panel.querySelectorAll("[data-ins]")) b.classList.toggle("on", !same && b === ins);
      if (S.focus && x.ids.some((id) => hidden.has(id))) { x.ids.forEach((id) => { const n = map.byId.get(id); if (n?.parent) S.collapsed.delete(n.parent); }); persist(); rebuild(); renderNodes(); }
      highlight();
      if (S.focus) fit(S.focus);
      return;
    }
    const act = t.closest("[data-act]")?.dataset.act;
    if (!act || t.closest(".smap-node")) return;
    if (t.closest(".smap-menu")) toggleMenu(false);
    const n = S.selected ? map.byId.get(S.selected) : null;
    const W = stage.clientWidth / 2, H = stage.clientHeight / 2;
    switch (act) {
      case "in": zoomAt(W, H, 1.25); break;
      case "out": zoomAt(W, H, 0.8); break;
      case "fit": fit(); break;
      case "undo": undo(); break;
      case "menu": toggleMenu(); break;
      case "tidy": tidy(); break;
      case "expand-all": foldAll(false); break;
      case "collapse-all": foldAll(true); break;
      case "copy": copyOutline(); break;
      case "download": download(); break;
      case "keys": toggleKeys(true); break;
      case "keys-close": toggleKeys(false); break;
      case "reset": reset(); break;
      case "recall": S.recall = !S.recall; S.revealed.clear(); persist(); renderBar(); renderNodes(); renderPanel(); break;
      case "links": S.links = !S.links; persist(); renderBar(); buildEdges(); updateEdges(); highlight(); break;
      case "lens": S.lens = S.lens === "memory" ? "topic" : "memory"; persist(); renderAll();
        if (S.lens === "memory" && !mem.synced && S.data) snack("None of these terms are in your flashcards yet, so they all show as not reviewed."); break;
      case "panel": S.panel = !S.panel; persist(); renderBar(); setTimeout(drawMini, 420); break;
      case "deselect": S.selected = null; S.linking = null; renderPanel(); highlight(); break;
      case "reveal": if (n) { S.revealed.add(n.id); renderNodes(); renderPanel(); } break;
      case "learn": if (n?.fact) toggleLearn(n); break;
      case "fold": if (n) toggleFold(n.id); break;
      case "zoomto": if (n) fit([n.id, ...descendants(map, n.id)]); break;
      case "add": addNote(n ? n.id : "root"); break;
      case "rename": if (n) rename(n.id); break;
      case "remove": if (n) remove(n.id); break;
      case "link": if (n) startLink(n.id); break;
      case "ask-clear": S.asked = null; S.focus = null; renderPanel(); highlight(); break;
      case "walk": startWalk(); break;
      case "walk-topic": if (n) startWalk(walkOrder(new Set(kidsOf(n.id).map((x) => x.id)))); break;
      case "walk-show": S.walk.shown = true; renderNodes(); renderPanel(); break;
      case "walk-got": walkNext(true); break;
      case "walk-miss": walkNext(false); break;
      case "walk-skip": walkNext(null); break;
      case "walk-again": startWalk(walkOrder(new Set(S.walk.ids.filter((x) => !S.walk.got.has(x))))); break;
      case "walk-stop": stopWalk(); break;
    }
  }
  function onSubmit(e) {
    const f = e.target.closest("[data-form=ask]");
    if (!f) return;
    e.preventDefault();
    const q = f.elements.q.value.trim();
    if (q) runAsk(q);
  }
  // typing in the ask box lights up the terms it names, as you type
  function onInput(e) {
    if (e.target.name !== "q" || !e.target.closest("[data-form=ask]")) return;
    const ids = mentioned(e.target.value, map).map((n) => n.id);
    S.focus = ids.length ? ids : S.asked?.a?.ids?.length ? S.asked.a.ids : null;
    highlight();
  }
  function onSearch() { S.query = search.value; S.focus = null; highlight(); }
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
    if (sx < 60 || sy < 60 || sx > stage.clientWidth - 60 || sy > stage.clientHeight - 60) centreOn(id, S.view.k);
  });
  stage.addEventListener("pointerdown", onDown);
  mini.addEventListener("pointerdown", onMiniDown);
  document.addEventListener("pointerdown", onDocDown, true);
  stage.addEventListener("wheel", onWheel, { passive: false });
  stage.addEventListener("dblclick", onDbl);
  el.addEventListener("keydown", onKey);
  el.addEventListener("click", onClick);
  el.addEventListener("submit", onSubmit);
  el.addEventListener("input", onInput);
  search.addEventListener("input", onSearch);
  search.addEventListener("keydown", onSearchKey);
  // keep the map framed while the learner hasn't moved it themselves
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => { if (!S.touched) fit(null, false); else drawMini(); }) : null;
  ro?.observe(stage);

  // ---------- sync with the learner's memory: on open, when they come back to the tab, and when another tab
  // (the flashcard feed, the Gradify app) records an answer ----------
  let syncing = false;
  async function sync() {
    if (syncing) return;
    syncing = true;
    const data = await loadLearnerCards();
    syncing = false;
    if (!alive) return;
    const before = mem.answers;
    S.data = data;
    rebuild(); renderAll();
    if (before && mem.answers > before) snack(`Synced ${mem.answers - before} new ${mem.answers - before === 1 ? "answer" : "answers"} from your flashcards`);
  }
  const onVisible = () => { if (document.visibilityState === "visible") sync(); };
  const onStorage = (e) => { if (e.key === "gradify.v1") sync(); };
  document.addEventListener("visibilitychange", onVisible);
  window.addEventListener("storage", onStorage);

  rebuild();
  root.classList.add("intro");
  renderAll();
  fit(null, false);
  setTimeout(() => root.classList.remove("intro"), 2200);
  sync();

  return {
    refresh() { refreshAll(); sync(); },
    destroy() {
      alive = false;
      cancelAnimationFrame(raf); cancelAnimationFrame(frame); cancelAnimationFrame(pendingMove);
      ro?.disconnect(); clearTimeout(snackTimer); clearTimeout(still);
      document.removeEventListener("pointerdown", onDocDown, true);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); window.removeEventListener("pointercancel", onUp);
      el.innerHTML = "";
    },
  };
}
