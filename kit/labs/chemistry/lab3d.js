// 3D mode of the Organic Chemistry Lab: the Structure-mode drawing as a 3D model you can turn, from mol.js (SMILES →
// hydrogens → a force-field embedding) drawn by molview.js. Stereocentres are highlighted and labelled R or S. A
// stereocentre drawn with a wedge or dash is built with that configuration; one drawn flat has none fixed, so the model
// shows whichever it happens to have (and says so).
import { button, esc } from "../lab.js";
import { stage3d } from "../three.js";
import { molecule, stereocentres, chirality, ez } from "./mol.js";
import { drawMolecule, frame } from "./molview.js";
import * as K from "./skeletal.js";
import { configuration } from "./reactions/configuration.js";

/**
 * The 3D model of a drawing in the configuration drawn. Every stereocentre with a wedge or dash is tagged @, and every
 * C=C with a drawn E or Z is marked with "/" on a substituent bond at each end; the model is embedded, its R/S and E/Z
 * are read back with mol.js's own CIP routines, and any that came out the other way has its tag or mark flipped before
 * one more embedding. Returns { mol, drawn, drawnBonds, missed }: drawn and drawnBonds are the model atom indices and
 * (atom-index pairs of) C=C bonds whose configuration came from the drawing; missed counts drawn ones it couldn't build.
 */
export function build3d(m) {
  const cfg = configuration(m), want = new Map(cfg.centres.filter((c) => c.label).map((c) => [c.atom, c.label]));
  const G = K.graph(m), gi = new Map(G.id.map((id, i) => [id, i])), tags = new Map(), dirs = new Map();
  for (let i = 0; i < G.n; i++) if (want.has(G.id[i])) tags.set(i, "@");
  // each drawn E/Z bond: a single-bonded, non-ring neighbour at each end carries the direction mark
  const inRing = (i, j) => { const seen = new Set([i]), st = [i]; while (st.length) { const u = st.pop(); for (const e of G.adj[u]) { if ((u === i && e.j === j) || seen.has(e.j)) continue; if (e.j === j) return true; seen.add(e.j); st.push(e.j); } } return false; };
  const key = (i, j) => `${Math.min(i, j)}-${Math.max(i, j)}`, ezs = [];
  for (const b of cfg.bonds.filter((x) => x.label)) {
    const [a, c] = b.atoms.map((id) => gi.get(id)), end = (x, y) => G.adj[x].find((e) => e.j !== y && e.o === 1 && !inRing(x, e.j))?.j;
    const p = end(a, c), q = end(c, a); if (p == null || q == null) { ezs.push({ a, c, label: b.label, p: null }); continue; }
    dirs.set(key(p, a), "/"); dirs.set(key(c, q), "/"); ezs.push({ a, c, p, q, label: b.label });
  }
  let { text, order } = K.smilesOf(G, tags, dirs), mol = molecule(text);
  const idx = new Map(order.map((g, k) => [g, k]));
  const rsWrong = () => [...tags.keys()].filter((g) => chirality(mol, idx.get(g)) !== want.get(G.id[g]));
  const ezWrong = () => ezs.filter((z) => z.p != null && ez(mol, idx.get(z.a), idx.get(z.c)) !== z.label);
  const r0 = rsWrong(), e0 = ezWrong();
  if (r0.length || e0.length) {
    for (const g of r0) tags.set(g, "@@");
    for (const z of e0) dirs.set(key(z.c, z.q), "\\");
    ({ text } = K.smilesOf(G, tags, dirs)); mol = molecule(text);
  }
  const drawn = new Set([...tags.keys()].filter((g) => chirality(mol, idx.get(g)) === want.get(G.id[g])).map((g) => idx.get(g)));
  const drawnBonds = ezs.filter((z) => z.p != null && ez(mol, idx.get(z.a), idx.get(z.c)) === z.label).map((z) => [idx.get(z.a), idx.get(z.c)]);
  return { mol, drawn, drawnBonds, missed: tags.size - drawn.size + ezs.length - drawnBonds.length };
}

export function mount3d(host, { getDrawing }) {
  host.innerHTML = `<div class="lab-cols osk-cols"><div class="m3-stage"></div><div class="lab-ctrl"><div class="lab-info m3-info"></div><div class="lab-row m3-btns"></div></div></div>`;
  const stageHost = host.querySelector(".m3-stage"), info = host.querySelector(".m3-info");
  let S = null, style = "ball", lastKey = "";
  const btns = host.querySelector(".m3-btns");
  button(btns, "Ball and stick", () => { style = "ball"; lastKey = ""; show(); });
  button(btns, "Space-filling", () => { style = "space"; lastKey = ""; show(); });
  button(btns, "Spin", () => { if (S) S.spin = !S.spin; });
  function show() {
    const m = getDrawing(), A = m && m.atoms.length ? K.analyse(m) : null;
    if (!A || A.empty) { stop(); info.innerHTML = "<h4>Nothing to show yet</h4><p>Draw a molecule in Structure mode and it appears here in 3D.</p>"; return; }
    if (A.problems.length) { stop(); info.innerHTML = `<h4>Fix the structure first</h4><p>${esc(A.problems[0].text)}</p>`; return; }
    // the drawn wedges and dashes are part of what's shown: swapping one must rebuild the model
    const cf = configuration(m, A), stereoText = [...cf.centres.map((c) => `${c.atom}${c.label || "-"}`), ...cf.bonds.map((b) => `${b.bond}${b.label || "-"}`)].join(",");
    const key = `${A.smiles}|${stereoText}|${style}`; if (key === lastKey && S) return; lastKey = key;
    let mol, drawn, drawnBonds, missed;
    try { ({ mol, drawn, drawnBonds, missed } = build3d(m)); } catch { stop(); info.innerHTML = "<h4>Can't build this one in 3D</h4><p>The 3D builder covers ordinary organic molecules.</p>"; return; }
    if (!S) S = stage3d(stageHost, { aspect: 0.62, max: 480 }); else S.clear();
    const sc = stereocentres(mol), labels = Object.fromEntries(sc.map((i) => [i, `${chirality(mol, i) || "*"}`]));
    drawMolecule(S, mol, { style, highlight: new Set(sc), labels });
    frame(S, mol);
    const c = A.carbon;
    info.innerHTML = `<h4>${esc(A.name?.name || (A.components > 1 ? `${A.components} separate species` : A.formula))}</h4>
      <p>${c.sp3 ? `${c.sp3} sp³ carbon${c.sp3 > 1 ? "s" : ""}: tetrahedral, 109.5°. ` : ""}${c.sp2 ? `${c.sp2} sp² carbon${c.sp2 > 1 ? "s" : ""}: trigonal planar, 120°. ` : ""}${c.sp ? `${c.sp} sp carbon${c.sp > 1 ? "s" : ""}: linear, 180°.` : ""}</p>
      ${sc.length ? `<p><b>${sc.length} stereocentre${sc.length > 1 ? "s" : ""}</b> (highlighted). This model shows ${sc.map((i) => labels[i]).join(", ")}${sc.every((i) => drawn.has(i)) ? ", as drawn with wedges and dashes." : sc.some((i) => drawn.has(i)) ? `. The ${sc.filter((i) => drawn.has(i)).map((i) => labels[i]).join(", ")} ${sc.filter((i) => drawn.has(i)).length > 1 ? "centres are" : "centre is"} as drawn; ${sc.filter((i) => !drawn.has(i)).length > 1 ? "the others have" : "the other has"} no wedge or dash, so the model picks one arrangement there.` : `; its mirror image is the other ${sc.length > 1 ? "stereoisomer set" : "enantiomer"}. A flat drawing (no wedges or dashes) doesn't say which, so the model picks one.`}</p>` : ""}
      ${drawnBonds.length ? `<p>The C=C geometry (${cf.bonds.filter((b) => b.label).map((b) => b.label).join(", ")}) is built as drawn.</p>` : ""}
      ${missed ? `<p class="lab-msg">The model couldn't be built with ${missed === 1 ? "one configuration" : `${missed} configurations`} as drawn, so it may differ from your drawing there.</p>` : ""}
      <p class="osk-aka">Geometry from a simple force field: good for shape and bond angles, not exact bond lengths or energies. Drag to turn, scroll or pinch to zoom.</p>`;
  }
  function stop() { if (S) { S.stop(); S = null; stageHost.innerHTML = ""; } lastKey = ""; }
  return { show, stop };
}
