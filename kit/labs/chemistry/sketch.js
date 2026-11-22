// Organic Chemistry Lab (docs/ORGANIC-LAB.md). Four modes: Structure (below), Mechanism (reactions/mechanism-ui.js),
// Reaction (reactions/reaction-ui.js) and 3D (lab3d.js). Structure: draw skeletal formulae on hexagon paper and see the chemistry worked out as you draw.
//   Draw: click an atom to add a bond in the best direction (zig-zag, 120°), click empty paper for a new bond, drag
//         for a zig-zag chain (it counts the carbons), click a bond to cycle single → double → triple.
//   Rings: click paper for a ring on the hexagon grid, an atom for a spiro ring, a bond to fuse a ring (⌬ adds
//         alternating double bonds). Atoms and charges: pick an element or ± and click an atom.
//   Keyboard: hover (or select with ← →) an atom and type C H N O S F P I, L for Cl, B for Br; 1 2 3 on a bond sets its
//         order; Enter grows a bond from the selected atom; 3–8 adds a ring there; + and − set a charge; Delete
//         removes; Ctrl+Z / Ctrl+Y undo and redo.
// The working-out (name with reasoning, formulae, Mr, functional groups, isomer facts) is kit/labs/chemistry/skeletal.js.
// Drawings are saved as notes pages in this browser, exported as PNG or SVG, or copied as Gradify Notes flashcards.
import { shell, challenges, toggle, button, describe, esc } from "../lab.js";
import * as K from "./skeletal.js";
import * as E from "./reactions/electron-flow.js";
import { mountMechanism } from "./reactions/mechanism-ui.js";
import { mountReaction } from "./reactions/reaction-ui.js";
import { mount3d } from "./lab3d.js";

const STORE = "gradify.organicLab", PAGES = "gradify.organicLab.pages", PREFS = "gradify.organicLab.prefs";
const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage may be off */ } };
const EL_KEYS = { c: "C", h: "H", n: "N", o: "O", s: "S", f: "F", p: "P", i: "I", l: "Cl", b: "Br" };
const sub = (f) => esc(f).replace(/(\d+)/g, "<sub>$1</sub>");
const target = (s) => K.analyse(K.graphFromSmiles(s));

// problems to work out by drawing; each is a challenge, mapped to a lesson in kit/courses/chemistry/evidence.js
export const PROBLEMS = [
  { id: "ethanol", text: "Draw ethanol", hint: "Two carbons and an –OH: draw a bond, then pick O and click the end carbon.", want: "CCO" },
  { id: "toluene", text: "Draw methylbenzene (a benzene ring with a methyl group)", hint: "Pick ⌬, click the paper, then use Draw on one ring carbon.", want: "Cc1ccccc1" },
  { id: "pentanes", text: "Draw all three structural isomers of C<sub>5</sub>H<sub>12</sub>", hint: "Five carbons each time: a straight chain, one branch, then two branches on one carbon. Clear between them.", set: (A) => (A.formula === "C5H12" ? A.hash : null), need: 3 },
  { id: "tertiary", text: "Draw a tertiary alcohol with formula C<sub>4</sub>H<sub>10</sub>O", hint: "The carbon carrying the –OH must be bonded to three other carbons.", test: (A) => A.formula === "C4H10O" && A.groups.some((g) => g.label === "Alcohol (tertiary)") },
  { id: "named", text: "Draw 3-methylbut-1-ene", hint: "Four-carbon chain, C=C between carbons 1 and 2, a methyl on carbon 3.", name: "3-methylbut-1-ene" },
  { id: "chiral", text: "Draw an isomer of C<sub>4</sub>H<sub>10</sub>O with a stereocentre", hint: "A stereocentre is a carbon with four different groups; turn on “Mark stereocentres”.", test: (A) => A.formula === "C4H10O" && A.stereo.length >= 1 },
  { id: "ez", text: "Draw an isomer of C<sub>4</sub>H<sub>8</sub> that has E/Z isomers", hint: "Each carbon of the C=C needs two different groups on it.", test: (A) => A.formula === "C4H8" && A.ez.length >= 1 },
  { id: "fg-isomers", text: "Draw an aldehyde and a ketone that both have formula C<sub>3</sub>H<sub>6</sub>O", hint: "Same formula, different functional group: put the C=O at the end of the chain, then in the middle.", set: (A) => (A.formula === "C3H6O" ? (A.groups.some((g) => g.key === "aldehyde") ? "ald" : A.groups.some((g) => g.key === "ketone") ? "one" : null) : null), need: 2 },
  { id: "ring-alkene", text: "Draw a C<sub>6</sub>H<sub>10</sub> molecule with one ring and one C=C", hint: "Degree of unsaturation 2: one ring plus one double bond. Try a hexagon, then click one of its bonds.", test: (A) => A.formula === "C6H10" && A.ringCount === 1 && A.groups.filter((g) => g.key === "alkene").length === 1 },
  { id: "naphthalene", text: "Fuse two benzene rings: draw naphthalene, C<sub>10</sub>H<sub>8</sub>", hint: "Pick ⌬ and click the paper, then click one of the ring's bonds.", want: "c1ccc2ccccc2c1" },
  { id: "ester", text: "Draw ethyl ethanoate, an ester", hint: "CH₃COOCH₂CH₃: a C=O whose carbon also bonds to an O that carries an ethyl group.", want: "CCOC(C)=O" },
];

export function mount(el, ctx = {}) {
  const $ = shell(el, `
    <div class="lab-seg osk-modes" role="tablist" aria-label="Lab mode"><button type="button" role="tab" data-mode="structure" aria-pressed="true">Structure</button><button type="button" role="tab" data-mode="mechanism" aria-pressed="false">Mechanism</button><button type="button" role="tab" data-mode="reaction" aria-pressed="false">Reaction</button><button type="button" role="tab" data-mode="3d" aria-pressed="false">3D</button></div>
    <div class="osk-mode" data-pane="structure">
    <div class="osk-tools" role="toolbar" aria-label="Drawing tools"></div>
    <div class="lab-cols osk-cols">
      <div class="osk-stage" tabindex="0" aria-label="Drawing area"><div class="osk-svg"></div><p class="osk-hint"></p>
        <div class="osk-zoom"><button type="button" data-z="-1" aria-label="Zoom out">−</button><button type="button" data-z="0" aria-label="Fit drawing">⤢</button><button type="button" data-z="1" aria-label="Zoom in">+</button></div></div>
      <div class="lab-ctrl"><div class="lab-info osk-info" aria-live="polite"></div><div class="osk-opts"></div><div class="lab-row osk-out"></div></div>
    </div>
    </div>
    <div class="osk-mode" data-pane="mechanism" hidden></div>
    <div class="osk-mode" data-pane="reaction" hidden></div>
    <div class="osk-mode" data-pane="3d" hidden></div>
    <div class="lab-cols osk-cols">
      <div class="lab-ctrl osk-probs"><div class="lab-info"><h4>Work it out</h4><select class="osk-prob" aria-label="Problem"></select><p class="osk-ptext"></p><div class="lab-row"><span class="osk-check"></span><span class="osk-phint"></span></div><p class="lab-msg osk-pmsg"></p></div></div>
      <div class="lab-ctrl"><div class="lab-info osk-book"><h4>My organic notes</h4><input type="text" class="osk-title" placeholder="Title (the name, if blank)" aria-label="Note title"><textarea class="osk-note" rows="3" placeholder="Notes: reactions, conditions, mechanisms, mnemonics…" aria-label="Notes for this drawing"></textarea><div class="lab-row osk-bookbtns"></div><div class="osk-pages"></div></div></div>
    </div>`, "osk-lab");
  const stage = $(".osk-stage"), host = $(".osk-svg"), say = describe(host, "Skeletal formula drawing");
  const prefs = { grid: true, showC: false, showNums: true, showStereo: true, ...load(PREFS, {}) };
  let m = load(STORE, null) || K.empty(); if (!Array.isArray(m.atoms)) m = K.empty();
  let A = K.analyse(m), undo = [], redo = [], view = { cx: 0, cy: 0, s: 38 }, W = 600, H = 380;
  let tool = { t: "draw" }, hover = null, ghost = null, ghostRing = false, drag = null, sel = null, hi = new Set(), msg = "";
  const sessionSets = Object.fromEntries(PROBLEMS.filter((p) => p.set).map((p) => [p.id, new Set()]));
  const targets = {}; const tget = (p) => (targets[p.id] ||= target(p.want));
  const solves = (p) => (p.want ? A.hash === tget(p).hash : p.name ? A.name?.name === p.name : p.set ? sessionSets[p.id].size >= p.need : p.test(A));
  const ch = challenges($(".osk-probs"), ctx, PROBLEMS.map((p) => ({ id: p.id, text: p.text, test: () => !A.empty && !A.problems.length && solves(p) })));

  // ---------- the toolbar ----------
  const poly = (n, arom) => { const R = 9, pts = Array.from({ length: n }, (_, k) => { const t = -Math.PI / 2 + (n % 4 === 0 ? Math.PI / n : 0) + (k * 2 * Math.PI) / n; return `${(12 + R * Math.cos(t)).toFixed(1)},${(12 + R * Math.sin(t)).toFixed(1)}`; }).join(" "); return `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><polygon points="${pts}" fill="none" stroke="currentColor" stroke-width="1.6"/>${arom ? '<circle cx="12" cy="12" r="4.6" fill="none" stroke="currentColor" stroke-width="1.3"/>' : ""}</svg>`; };
  const TOOLS = [
    [["select", "Move", "Move atoms and pan (V)"], ["draw", "Draw", "Bonds and chains (D)"], ["erase", "Erase", "Delete atoms and bonds (E)"]],
    [3, 4, 5, 6, "benz", 7, 8].map((n) => (n === "benz" ? ["ring:6:a", poly(6, true), "Benzene ring (A)"] : [`ring:${n}`, poly(n), `${n}-membered ring (${n})`])),
    ["C", "H", "N", "O", "S", "F", "Cl", "Br", "I", "P"].map((e) => [`atom:${e}`, e, `Element ${e}`]),
    [["charge:1", "+", "Positive charge (+)"], ["charge:-1", "−", "Negative charge (−)"]],
  ];
  const bar = $(".osk-tools");
  bar.innerHTML = TOOLS.map((g) => `<div class="osk-group">${g.map(([k, lab, title]) => `<button type="button" class="osk-tool" data-tool="${k}" title="${esc(title)}" aria-label="${esc(title)}">${lab}</button>`).join("")}</div>`).join("") +
    `<div class="osk-group"><button type="button" class="osk-tool" data-act="undo" title="Undo (Ctrl+Z)" aria-label="Undo">↶</button><button type="button" class="osk-tool" data-act="redo" title="Redo (Ctrl+Y)" aria-label="Redo">↷</button><button type="button" class="osk-tool" data-act="clear" title="Clear the drawing" aria-label="Clear the drawing">Clear</button></div>`;
  const toolKey = () => (tool.t === "ring" ? `ring:${tool.n}${tool.arom ? ":a" : ""}` : tool.t === "atom" ? `atom:${tool.el}` : tool.t === "charge" ? `charge:${tool.d}` : tool.t);
  const setTool = (k) => {
    const [t, a, b] = k.split(":");
    tool = t === "ring" ? { t, n: Number(a), arom: b === "a" } : t === "atom" ? { t, el: a } : t === "charge" ? { t, d: Number(a) } : { t };
    bar.querySelectorAll("[data-tool]").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.tool === toolKey())));
    hint(); ghost = null; paint();
  };
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.tool) setTool(b.dataset.tool);
    else if (b.dataset.act === "undo") doUndo(); else if (b.dataset.act === "redo") doRedo();
    else if (b.dataset.act === "clear" && m.atoms.length) { snap(); m = K.empty(); sel = null; commit(); }
  });
  const HINTS = { draw: "Click an atom to add a bond · drag for a zig-zag chain · click a bond for double/triple · click empty paper to start", select: "Drag an atom to move it · drag the paper to pan · click an atom to select it for the keyboard", erase: "Click an atom or a bond to delete it", ring: "Click the paper for a ring · an atom for a spiro ring · a bond to fuse a ring", atom: "Click an atom to change it · or the paper to place one", charge: "Click an atom to change its charge" };
  const hint = () => { $(".osk-hint").textContent = m.atoms.length || tool.t !== "draw" ? HINTS[tool.t] : "Click the paper to start, or drag across it to draw a chain. Hexagons snap to the grid."; };

  // ---------- coordinates and hit-testing ----------
  const world = (e) => { const r = host.getBoundingClientRect(); return [(e.clientX - r.left - W / 2) / view.s + view.cx, (e.clientY - r.top - H / 2) / view.s + view.cy]; };
  const hit = (x, y) => { const a = K.atomAt(m, x, y, 0.34); if (a) return { type: "atom", id: a.id }; const b = K.bondAt(m, x, y, 0.26); if (b) return { type: "bond", id: b.id }; return null; };
  const start = (x, y) => (prefs.grid ? K.snapPoint(x, y).slice(0, 2) : [x, y]);

  // ---------- history ----------
  const snap = () => { undo.push(K.clone(m)); if (undo.length > 150) undo.shift(); redo = []; };
  const doUndo = () => { if (!undo.length) return; redo.push(K.clone(m)); m = undo.pop(); sel = null; commit(); };
  const doRedo = () => { if (!redo.length) return; undo.push(K.clone(m)); m = redo.pop(); sel = null; commit(); };

  // ---------- what a click does ----------
  function click(h, x, y) {
    const t = tool.t;
    if (t === "draw") {
      snap();
      if (h?.type === "atom") sel = K.grow(m, h.id).id;
      else if (h?.type === "bond") K.cycleOrder(m, h.id);
      else { const [sx, sy] = start(x, y), a = K.placeAtom(m, sx, sy); sel = K.grow(m, a.id).id; }
    } else if (t === "ring") {
      snap(); const tg = h ? { type: h.type, id: h.id } : { type: "point", x, y, snap: prefs.grid };
      K.addRing(m, K.ringPath(m, tool.n, tg), tool.arom);
    } else if (t === "atom") {
      if (h?.type === "atom") { snap(); K.setElement(m, h.id, tool.el); sel = h.id; }
      else if (!h) { snap(); const [sx, sy] = start(x, y); sel = K.placeAtom(m, sx, sy, tool.el).id; }
      else return;
    } else if (t === "charge") {
      if (h?.type !== "atom") return; snap(); const a = K.atomOf(m, h.id); a.charge = Math.max(-2, Math.min(2, (a.charge || 0) + tool.d)); sel = h.id;
    } else if (t === "erase") {
      if (!h) return; snap(); if (h.type === "atom") K.removeAtom(m, h.id); else K.removeBond(m, h.id); hover = null; if (sel && !K.atomOf(m, sel)) sel = null;
    } else if (t === "select") { sel = h?.type === "atom" ? h.id : null; paint(); info(); return; }
    commit();
  }
  function preview(h, x, y) {
    ghost = null; ghostRing = false;
    if (tool.t === "draw" && h?.type !== "bond") {
      if (h?.type === "atom") { const a = K.atomOf(m, h.id), t = K.nextDir(m, a.id); ghost = [[a.x, a.y], [a.x + Math.cos(t), a.y + Math.sin(t)]]; }
      else { const [sx, sy] = start(x, y), t = K.siteOf(sx, sy) === "A" ? Math.PI / 6 : -Math.PI / 6; ghost = [[sx, sy], [sx + Math.cos(t), sy + Math.sin(t)]]; }
    } else if (tool.t === "ring") { ghost = K.ringPath(m, tool.n, h ? { type: h.type, id: h.id } : { type: "point", x, y, snap: prefs.grid }); ghostRing = true; }
  }

  // ---------- pointer ----------
  host.addEventListener("pointerdown", (e) => {
    if (e.button > 0) return; stage.focus({ preventScroll: true }); host.setPointerCapture(e.pointerId);
    const [x, y] = world(e), h = hit(x, y);
    drag = { x, y, cx: e.clientX, cy: e.clientY, h, moved: false, vx: view.cx, vy: view.cy };
  });
  host.addEventListener("pointermove", (e) => {
    const [x, y] = world(e);
    if (!drag) { const h = hit(x, y); hover = h; preview(h, x, y); paint(); return; }
    if (!drag.moved && Math.hypot(e.clientX - drag.cx, e.clientY - drag.cy) < 6) return;
    if (!drag.moved) { drag.moved = true; drag.mode = tool.t === "draw" && drag.h?.type !== "bond" ? "chain" : tool.t === "select" && drag.h?.type === "atom" ? "move" : "pan"; if (drag.mode === "move") snap(); }
    if (drag.mode === "chain") {
      const a = drag.h?.type === "atom" ? K.atomOf(m, drag.h.id) : null, [sx, sy] = a ? [a.x, a.y] : start(drag.x, drag.y);
      ghost = K.chainPath(m, sx, sy, x, y, a?.id ?? null); ghostRing = false; drag.pts = ghost;
    } else if (drag.mode === "move") {
      const a = K.atomOf(m, drag.h.id), [px, py] = prefs.grid ? K.snapPoint(x, y) : [x, y], near = Math.hypot(px - x, py - y) < 0.25;
      a.x = near ? px : x; a.y = near ? py : y; A = K.analyse(m);
    } else { view.cx = drag.vx - (e.clientX - drag.cx) / view.s; view.cy = drag.vy - (e.clientY - drag.cy) / view.s; }
    paint();
  });
  const end = (e) => {
    if (!drag) return; const d = drag; drag = null;
    if (!d.moved) { const [x, y] = world(e); click(hit(x, y), x, y); return; }
    if (d.mode === "chain" && d.pts) { snap(); sel = K.addChain(m, d.pts, d.h?.type === "atom" ? d.h.id : null).id; ghost = null; commit(); }
    else if (d.mode === "move") { // a moved atom dropped onto another joins it
      const a = K.atomOf(m, d.h.id), other = m.atoms.find((o) => o.id !== a.id && Math.hypot(o.x - a.x, o.y - a.y) < 0.3);
      if (other) { for (const b of m.bonds.filter((b) => b.a === a.id || b.b === a.id)) { const j = b.a === a.id ? b.b : b.a; if (j !== other.id) K.addBond(m, other.id, j, b.order); } K.removeAtom(m, a.id); }
      commit();
    } else paint();
  };
  host.addEventListener("pointerup", end);
  host.addEventListener("pointercancel", () => { drag = null; ghost = null; paint(); });
  host.addEventListener("pointerleave", () => { if (!drag) { hover = null; ghost = null; paint(); } });
  host.addEventListener("wheel", (e) => { if (!e.ctrlKey && !e.metaKey) return; e.preventDefault(); const [x, y] = world(e); zoom(e.deltaY < 0 ? 1.12 : 1 / 1.12, x, y); }, { passive: false });
  const zoom = (f, x = view.cx, y = view.cy) => { const s = Math.max(14, Math.min(90, view.s * f)), k = s / view.s; view.cx = x - (x - view.cx) / k; view.cy = y - (y - view.cy) / k; view.s = s; paint(); };
  const fitView = () => { view = m.atoms.length ? K.fit(m, [W, H], { max: 46, pad: 1.6 }) : { cx: 0, cy: 0, s: 38 }; paint(); };
  $(".osk-zoom").addEventListener("click", (e) => { const z = e.target.closest("[data-z]")?.dataset.z; if (z === "0") fitView(); else if (z) zoom(z === "1" ? 1.2 : 1 / 1.2); });

  // ---------- keyboard ----------
  stage.addEventListener("keydown", (e) => {
    const k = e.key, mod = e.ctrlKey || e.metaKey;
    if (mod && k.toLowerCase() === "z") { e.preventDefault(); e.shiftKey ? doRedo() : doUndo(); return; }
    if (mod && k.toLowerCase() === "y") { e.preventDefault(); doRedo(); return; }
    if (mod || e.altKey) return;
    const atomH = hover?.type === "atom" ? hover.id : sel && K.atomOf(m, sel) ? sel : null, bondH = hover?.type === "bond" ? hover.id : null;
    const done = () => { e.preventDefault(); commit(); };
    if (bondH && /^[123]$/.test(k)) { snap(); K.bondOf(m, bondH).order = Number(k); return done(); }
    if (atomH && EL_KEYS[k.toLowerCase()]) { snap(); K.setElement(m, atomH, EL_KEYS[k.toLowerCase()]); return done(); }
    if (atomH && /^[3-8]$/.test(k)) { snap(); K.addRing(m, K.ringPath(m, Number(k), { type: "atom", id: atomH }), false); return done(); }
    if (atomH && (k === "+" || k === "=" || k === "-")) { snap(); const a = K.atomOf(m, atomH); a.charge = Math.max(-2, Math.min(2, (a.charge || 0) + (k === "-" ? -1 : 1))); return done(); }
    if ((k === "Delete" || k === "Backspace") && (atomH || bondH)) { snap(); if (bondH) K.removeBond(m, bondH); else { K.removeAtom(m, atomH); if (sel === atomH) sel = null; } hover = null; return done(); }
    if (k === "Enter") { snap(); if (atomH) sel = K.grow(m, atomH).id; else { const a = K.placeAtom(m, ...start(view.cx, view.cy)); sel = K.grow(m, a.id).id; } return done(); }
    if ((k === "ArrowRight" || k === "ArrowLeft") && m.atoms.length) { e.preventDefault(); const i = m.atoms.findIndex((a) => a.id === sel); sel = m.atoms[(i + (k === "ArrowRight" ? 1 : m.atoms.length - 1) + (i < 0 ? 1 : 0)) % m.atoms.length].id; paint(); info(); return; }
    if (k === "Escape") { sel = null; ghost = null; drag = null; paint(); info(); return; }
    const tk = { v: "select", d: "draw", e: "erase", r: "ring:6", a: "ring:6:a", 3: "ring:3", 4: "ring:4", 5: "ring:5", 6: "ring:6", 7: "ring:7", 8: "ring:8" }[k.toLowerCase()];
    if (tk) { e.preventDefault(); setTool(tk); }
  });

  // ---------- options and outputs ----------
  const opt = (label, key) => toggle($(".osk-opts"), label, prefs[key], (v) => { prefs[key] = v; save(PREFS, prefs); paint(); });
  opt("Hexagon paper (snap to grid)", "grid"); opt("Show every C and H", "showC"); opt("Number the main chain", "showNums"); opt("Mark stereocentres (*)", "showStereo");
  const out = $(".osk-out");
  button(out, "Copy SMILES", () => copy(A.smiles || "", "SMILES copied"));
  button(out, "PNG", () => exportPng());
  button(out, "SVG", () => download(`${fileName()}.svg`, new Blob([exportSvg()], { type: "image/svg+xml" })));
  const fileName = () => (A.name?.name || "molecule").replace(/[^\w,-]+/g, "-").slice(0, 60);
  const exportSvg = () => { const size = [720, 480], v = K.fit(m, size, { max: 48, pad: 1.4 }); return K.render(m, A, v, size, { palette: "print", showC: prefs.showC, showNums: prefs.showNums, showStereo: prefs.showStereo, title: A.name?.name || A.formula }); };
  function exportPng() {
    const svg = exportSvg(), img = new Image(), url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    img.onload = () => { const c = document.createElement("canvas"); c.width = 1440; c.height = 960; const g = c.getContext("2d"); g.drawImage(img, 0, 0, 1440, 960); URL.revokeObjectURL(url); c.toBlob((b) => b && download(`${fileName()}.png`, b), "image/png"); };
    img.src = url;
  }
  function download(name, blob) { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
  async function copy(text, done) { try { await navigator.clipboard.writeText(text); flash(done); } catch { flash("Couldn't copy: select the text and copy it instead"); } }
  const flash = (t) => { msg = t; info(); setTimeout(() => { if (msg === t) { msg = ""; info(); } }, 2400); };

  // ---------- the working-out ----------
  function info() {
    const box = $(".osk-info");
    if (A.empty) { box.innerHTML = `<h4>Start drawing</h4><p>Each corner and end of a line is a carbon with enough hydrogens to make four bonds. Draw on the hexagons and the chemistry is worked out here as you go.</p>`; return; }
    const nm = A.name, groups = new Map();
    for (const g of A.groups) { if (!groups.has(g.label)) groups.set(g.label, { ...g, atoms: [...g.atoms], n: 0 }); const x = groups.get(g.label); x.n++; if (x.n > 1) x.atoms.push(...g.atoms); }
    const c = A.carbon, atom = sel && K.atomOf(m, sel);
    const atomInfo = atom ? (() => { const hy = A.hyb[atom.id], hh = A.hcount[atom.id] ?? 0, cc = A.carbonClass[atom.id], deg = K.neighbours(m, atom.id).length; return `<p class="osk-atom"><b>Selected:</b> ${esc(atom.el)}${atom.charge ? (atom.charge > 0 ? "⁺" : "⁻") : ""}${hy ? ` · ${hy.replace(/(\d)/, "<sup>$1</sup>")}${atom.el === "C" ? ` (${{ sp3: "109.5°, tetrahedral", sp2: "120°, trigonal planar", sp: "180°, linear" }[hy]})` : ""}` : ""} · ${hh} implicit H · ${deg} bond${deg === 1 ? "" : "s"}${atom.el === "C" && cc >= 0 ? ` · ${["methyl/primary", "primary", "secondary", "tertiary", "quaternary"][cc]} carbon` : ""}${A.stereo.includes(atom.id) ? " · <b>stereocentre</b>" : ""}</p>`; })() : "";
    box.innerHTML = `
      <h4 class="osk-name">${nm?.name ? esc(nm.name) : A.components > 1 ? "Several molecules" : "Not named here"}</h4>
      ${nm?.aka ? `<p class="osk-aka">Also called ${esc(nm.aka)}</p>` : ""}
      ${!nm?.name && A.components === 1 && !A.problems.length ? `<p class="osk-aka">${esc(A.name?.reason || (A.charge ? "Ions aren't named here." : ""))}</p>` : ""}
      ${A.problems.length ? `<p class="lab-msg no">${A.problems.map((p) => esc(p.text)).join("<br>")}</p>` : ""}
      <div class="lab-read">
        <div><small>Molecular formula</small><b>${sub(A.formula)}${A.charge ? (A.charge > 0 ? "⁺" : "⁻") : ""}</b></div>
        <div><small>M<sub>r</sub></small><b>${A.mass.toFixed(2)}</b></div>
        ${A.empirical !== A.formula ? `<div><small>Empirical</small><b>${sub(A.empirical)}</b></div>` : ""}
        <div><small>Unsaturation</small><b>${Number.isInteger(A.dou) ? A.dou : A.dou.toFixed(1)}</b></div>
      </div>
      ${A.condensed ? `<p><small>Structural formula</small><br><b class="osk-mono">${sub(A.condensed)}</b></p>` : ""}
      <p><small>Functional groups</small></p><div class="lab-chips osk-groups">${groups.size ? [...groups.values()].map((g) => `<button type="button" data-hi="${g.atoms.join(",")}">${esc(g.label)}${g.n > 1 ? ` ×${g.n}` : ""}</button>`).join("") : `<span class="osk-aka">None: ${A.counts.C && Object.keys(A.counts).every((k) => k === "C" || k === "H") ? (A.dou ? "a hydrocarbon" : "an alkane") : "no common group"}</span>`}</div>
      <table><tbody>
        <tr><td>Rings</td><td class="num">${A.ringCount}${A.aromaticRings ? ` (${A.aromaticRings} aromatic)` : ""}</td></tr>
        <tr><td>Carbons 1° / 2° / 3° / 4°</td><td class="num">${c.primary} / ${c.secondary} / ${c.tertiary} / ${c.quaternary}</td></tr>
        <tr><td>sp³ / sp² / sp carbons</td><td class="num">${c.sp3} / ${c.sp2} / ${c.sp}</td></tr>
        <tr><td>Stereocentres</td><td class="num">${A.stereo.length}${A.stereo.length ? ` → up to ${2 ** A.stereo.length} stereoisomers` : ""}</td></tr>
        <tr><td>C=C with E/Z isomers</td><td class="num">${A.ez.length}</td></tr>
      </tbody></table>
      ${atomInfo}
      ${nm?.steps?.length ? `<details class="osk-steps"><summary>How the name is worked out</summary><ol>${nm.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></details>` : ""}
      <p class="osk-smiles"><small>SMILES</small> <code>${esc(A.smiles)}</code></p>
      <p class="lab-msg ok">${esc(msg)}</p>`;
    box.querySelectorAll("[data-hi]").forEach((b) => {
      const on = () => { hi = new Set(b.dataset.hi.split(",").map(Number)); paint(); }, off = () => { hi = new Set(); paint(); };
      b.addEventListener("pointerenter", on); b.addEventListener("pointerleave", off); b.addEventListener("focus", on); b.addEventListener("blur", off);
    });
  }

  // ---------- drawing ----------
  // follow the colour scheme the lab is shown in (a lab card can be dark on a light page): .osk-svg's background is
  // light-dark(white, near-black), so its brightness says which
  const palette = () => { const c = getComputedStyle(host).backgroundColor.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0]; return c[0] + c[1] + c[2] > 382 ? "light" : "dark"; };
  function paint() {
    host.innerHTML = K.render(m, A, view, [W, H], { palette: palette(), grid: prefs.grid, showC: prefs.showC, showNums: prefs.showNums, showStereo: prefs.showStereo, highlight: hi, hover, ghost, ghostRing, sel, title: "Skeletal formula" });
    host.firstElementChild.setAttribute("aria-hidden", "true");
  }
  function commit() {
    A = K.analyse(m); save(STORE, m);
    for (const p of PROBLEMS) if (p.set && !A.problems.length) { const v = p.set(A); if (v) sessionSets[p.id].add(v); }
    ch.check({}); hint(); paint(); info(); probPaint(false);
    say(A.empty ? "Empty" : `${A.name?.name || "Unnamed molecule"}, ${A.formula}, ${A.atoms} heavy atoms${A.groups.length ? `, groups: ${[...new Set(A.groups.map((g) => g.label))].join(", ")}` : ""}`);
  }
  const resize = () => { const w = Math.max(260, Math.round(stage.clientWidth || 600)), h = Math.round(Math.max(300, Math.min(560, w * 0.64))); if (w === W && h === H) return; W = w; H = h; host.style.height = `${H}px`; paint(); };
  const ro = "ResizeObserver" in window ? new ResizeObserver(resize) : null; ro?.observe(stage);
  const mo = new MutationObserver(paint); mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // ---------- problems ----------
  const psel = $(".osk-prob");
  psel.innerHTML = PROBLEMS.map((p, i) => `<option value="${i}">${i + 1}. ${esc(p.text.replace(/<[^>]+>/g, ""))}</option>`).join("");
  let pk = Math.max(0, PROBLEMS.findIndex((p) => !ch.done(p.id)));
  psel.value = String(pk);
  psel.addEventListener("change", () => { pk = Number(psel.value); $(".osk-pmsg").textContent = ""; $(".osk-pmsg").className = "lab-msg osk-pmsg"; probPaint(true); });
  button($(".osk-check"), "Check my drawing", () => {
    const p = PROBLEMS[pk], box = $(".osk-pmsg"), plain = p.text.replace(/<[^>]+>/g, "");
    let ok = !A.empty && !A.problems.length && solves(p), why = "";
    if (A.empty) why = "Draw something first.";
    else if (A.problems.length) why = "Fix the atom marked in red first: it has too many bonds.";
    else if (!ok) {
      const want = p.want ? tget(p) : null, f = want?.formula || (p.text.match(/C<sub>\d+<\/sub>H<sub>\d+<\/sub>(O)?/)?.[0] || "").replace(/<\/?sub>/g, "");
      if (p.set) why = `${sessionSets[p.id].size} of ${p.need} found so far. ${A.formula && f && A.formula !== f ? `This one is ${A.formula}, not ${f}.` : "Keep going: each must be different."}`;
      else if (f && A.formula !== f) why = `Your molecule is ${A.formula}; this needs ${f}. Count the carbons and the hydrogens each carbon has.`;
      else if (p.name) why = `You've drawn ${A.name?.name || "something this lab can't name"}. Check the chain length and where the groups are.`;
      else why = `Right formula, different structure: ${A.name?.name ? `you've drawn ${A.name.name}. ` : ""}${p.hint}`;
      ctx.fail?.(p.id, plain);
    }
    box.className = `lab-msg osk-pmsg ${ok ? "ok" : "no"}`; box.textContent = ok ? `Correct${A.name?.name ? `: ${A.name.name}` : ""}.` : why;
    if (ok) ch.check({});
  }, "pri");
  button($(".osk-phint"), "Hint", () => { const b = $(".osk-pmsg"); b.className = "lab-msg osk-pmsg"; b.textContent = PROBLEMS[pk].hint; });
  function probPaint(focus) {
    const p = PROBLEMS[pk]; $(".osk-ptext").innerHTML = `${ch.done(p.id) ? "✓ " : ""}${p.text}${p.set ? ` <small>(${Math.min(p.need, sessionSets[p.id].size)} of ${p.need})</small>` : ""}`;
    if (focus) ctx.focus?.(p.id, p.text.replace(/<[^>]+>/g, ""));
  }

  // ---------- the notebook ----------
  let pages = load(PAGES, []); if (!Array.isArray(pages)) pages = [];
  const bb = $(".osk-bookbtns");
  button(bb, "Save to notes", () => {
    if (A.empty) return flash("Draw something to save");
    const title = $(".osk-title").value.trim() || A.name?.name || A.formula;
    pages.unshift({ id: Date.now().toString(36), title, note: $(".osk-note").value.trim(), mol: K.clone(m), at: new Date().toISOString().slice(0, 10), name: A.name?.name || null, formula: A.formula, smiles: A.smiles });
    save(PAGES, pages); $(".osk-title").value = ""; $(".osk-note").value = ""; book(); flash("Saved to your organic notes");
  }, "pri");
  button(bb, "Copy as flashcards", () => {
    const list = pages.length ? pages : A.empty ? [] : [{ title: A.name?.name || A.formula, mol: m, note: "" }];
    if (!list.length) return flash("Nothing to copy yet");
    copy(list.map(cards).join("\n\n"), "Copied: paste into Gradify Notes and the >> lines become flashcards");
  });
  function cards(p) {
    if (p.kind === "mech") {
      const rp = E.replay(p.mech), lines = [`- Mechanism: ${p.title}`];
      if (p.mech.conditions) lines.push(`  - Conditions for ${p.title} >> ${p.mech.conditions.above}, ${p.mech.conditions.below}`);
      rp.results.forEach((r, k) => { if (r.steps.length) lines.push(`  - ${p.title}: what happens in step ${k + 1}? >> ${r.steps.join(" ")}`); });
      lines.push(`  - Products of ${p.title} >> ${E.species(rp.states.at(-1)).map((x) => x.formula).join(" + ")}`);
      return lines.join("\n");
    }
    const a = K.analyse(p.mol), lines = [`- ${p.title}`];
    if (a.name?.name && a.condensed) lines.push(`  - Name ${a.condensed} >> ${a.name.name}`);
    if (a.name?.name) lines.push(`  - Molecular formula of ${a.name.name} >> ${a.formula}`);
    const gs = [...new Set(a.groups.map((g) => g.label))]; if (a.name?.name && gs.length) lines.push(`  - Functional groups in ${a.name.name} >> ${gs.join(", ")}`);
    if (a.name?.name && a.stereo.length) lines.push(`  - Stereocentres in ${a.name.name} >> ${a.stereo.length}`);
    lines.push(`  - SMILES: ${a.smiles}`);
    if (p.note) for (const l of p.note.split(/\n+/)) lines.push(`  - ${l}`);
    return lines.join("\n");
  }
  function book() {
    const box = $(".osk-pages");
    if (!pages.length) { box.innerHTML = `<p class="osk-aka">Saved drawings appear here with your notes. They stay in this browser.</p>`; return; }
    const pal = palette();
    box.innerHTML = pages.map((p, i) => { if (p.kind === "mech") { const end = E.replay(p.mech).states.at(-1), d = E.toDrawing(end), size = [132, 88]; return `<div class="osk-page"><button type="button" class="osk-thumb" data-open="${i}" aria-label="Open the mechanism ${esc(p.title)}">${K.render(d.m, { hcount: d.hcount, problems: [], stereo: [] }, K.fit(d.m, size, { max: 22, pad: 0.8 }), size, { palette: pal })}</button><div><b>${esc(p.title)}</b><small>Mechanism · ${p.mech.steps.length} step${p.mech.steps.length === 1 ? "" : "s"} · ${esc(p.at || "")}</small><button type="button" class="lab-try" data-del="${i}">Delete</button></div></div>`; }
      const a = K.analyse(p.mol), size = [132, 88]; return `<div class="osk-page"><button type="button" class="osk-thumb" data-open="${i}" aria-label="Open ${esc(p.title)}">${K.render(p.mol, a, K.fit(p.mol, size, { max: 22, pad: 0.8 }), size, { palette: pal })}</button><div><b>${esc(p.title)}</b><small>${sub(p.formula || a.formula)} · ${esc(p.at || "")}</small>${p.note ? `<p>${esc(p.note)}</p>` : ""}<button type="button" class="lab-try" data-del="${i}">Delete</button></div></div>`; }).join("");
  }
  $(".osk-pages").addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]"), d = e.target.closest("[data-del]");
    if (o && pages[Number(o.dataset.open)].kind === "mech") { setMode("mechanism"); mech.load(null, pages[Number(o.dataset.open)].mech); return; }
    if (o) { const p = pages[Number(o.dataset.open)]; snap(); m = K.clone(p.mol); sel = null; $(".osk-title").value = p.title; $(".osk-note").value = p.note || ""; commit(); fitView(); stage.scrollIntoView?.({ block: "nearest", behavior: "smooth" }); }
    if (d && confirm("Delete this page from your organic notes?")) { pages.splice(Number(d.dataset.del), 1); save(PAGES, pages); book(); }
  });

  // ---------- modes: Structure, Mechanism, 3D ----------
  const mech = mountMechanism($('[data-pane="mechanism"]'), { ctx, palette, getDrawing: () => K.clone(m),
    onSave: (mx) => { pages.unshift({ id: Date.now().toString(36), kind: "mech", title: mx.title, mech: mx, at: new Date().toISOString().slice(0, 10) }); save(PAGES, pages); book(); } });
  const m3 = mount3d($('[data-pane="3d"]'), { getDrawing: () => m });
  const rx = mountReaction($('[data-pane="reaction"]'), { ctx, palette, getDrawing: () => K.clone(m),
    onMechanism: (id) => { setMode("mechanism"); mech.load(id); },
    onEdit: (pm) => { snap(); m = pm; sel = null; commit(); setMode("structure"); fitView(); } });
  let mode = "structure";
  function setMode(k) {
    mode = k;
    $(".osk-modes").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === k)));
    $.all("[data-pane]").forEach((p) => { p.hidden = p.dataset.pane !== k; });
    $(".osk-probs").hidden = k !== "structure";
    if (k === "3d") m3.show(); else m3.stop();
    if (k === "mechanism") mech.refresh(); else if (k === "reaction") rx.refresh(); else if (k === "structure") { resize(); paint(); }
  }
  $(".osk-modes").addEventListener("click", (e) => { const b = e.target.closest("[data-mode]"); if (b) setMode(b.dataset.mode); });

  setTool("draw"); resize(); fitView(); commit(); book(); probPaint(false);
  return () => { ro?.disconnect(); mo.disconnect(); mech.stop(); m3.stop(); };
}
export default mount;
