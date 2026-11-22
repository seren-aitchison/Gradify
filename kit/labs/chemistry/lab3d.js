// 3D mode of the Organic Chemistry Lab: the Structure-mode drawing as a 3D model you can turn, from mol.js (SMILES →
// hydrogens → a force-field embedding) drawn by molview.js. Stereocentres are highlighted and labelled R or S. A
// stereocentre drawn with a wedge or dash is built with that configuration; one drawn flat has none fixed, so the model
// shows whichever it happens to have (and says so).
import { button, esc } from "../lab.js";
import { stage3d } from "../three.js";
import { molecule, stereocentres, chirality } from "./mol.js";
import { drawMolecule, frame } from "./molview.js";
import * as K from "./skeletal.js";
import { configuration } from "./reactions/configuration.js";

/**
 * The 3D model of a drawing, with every stereocentre that has a wedge or dash built in the drawn configuration: tag each
 * with @, embed, read R/S back (mol.js's own CIP routine) and flip the tag of any that came out the other way. Returns
 * { mol, drawn } where drawn is the set of model atom indices whose configuration came from the drawing.
 */
export function build3d(m) {
  const want = new Map(configuration(m).centres.filter((c) => c.label).map((c) => [c.atom, c.label]));
  const G = K.graph(m), tags = new Map(); for (let i = 0; i < G.n; i++) if (want.has(G.id[i])) tags.set(i, "@");
  let { text, order } = K.smilesOf(G, tags), mol = molecule(text);
  const idx = new Map(order.map((g, k) => [g, k])), wrong = () => [...tags.keys()].filter((g) => chirality(mol, idx.get(g)) !== want.get(G.id[g]));
  const bad = wrong();
  if (bad.length) { for (const g of bad) tags.set(g, "@@"); ({ text } = K.smilesOf(G, tags)); mol = molecule(text); }
  return { mol, drawn: new Set([...tags.keys()].filter((g) => chirality(mol, idx.get(g)) === want.get(G.id[g])).map((g) => idx.get(g))) };
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
    const stereoText = configuration(m, A).centres.map((c) => `${c.atom}${c.label || "-"}`).join(",");
    const key = `${A.smiles}|${stereoText}|${style}`; if (key === lastKey && S) return; lastKey = key;
    let mol, drawn;
    try { ({ mol, drawn } = build3d(m)); } catch { stop(); info.innerHTML = "<h4>Can't build this one in 3D</h4><p>The 3D builder covers ordinary organic molecules.</p>"; return; }
    if (!S) S = stage3d(stageHost, { aspect: 0.62, max: 480 }); else S.clear();
    const sc = stereocentres(mol), labels = Object.fromEntries(sc.map((i) => [i, `${chirality(mol, i) || "*"}`]));
    drawMolecule(S, mol, { style, highlight: new Set(sc), labels });
    frame(S, mol);
    const c = A.carbon;
    info.innerHTML = `<h4>${esc(A.name?.name || (A.components > 1 ? `${A.components} separate species` : A.formula))}</h4>
      <p>${c.sp3 ? `${c.sp3} sp³ carbon${c.sp3 > 1 ? "s" : ""}: tetrahedral, 109.5°. ` : ""}${c.sp2 ? `${c.sp2} sp² carbon${c.sp2 > 1 ? "s" : ""}: trigonal planar, 120°. ` : ""}${c.sp ? `${c.sp} sp carbon${c.sp > 1 ? "s" : ""}: linear, 180°.` : ""}</p>
      ${sc.length ? `<p><b>${sc.length} stereocentre${sc.length > 1 ? "s" : ""}</b> (highlighted). This model shows ${sc.map((i) => labels[i]).join(", ")}${sc.every((i) => drawn.has(i)) ? ", as drawn with wedges and dashes." : sc.some((i) => drawn.has(i)) ? `. The ${sc.filter((i) => drawn.has(i)).map((i) => labels[i]).join(", ")} ${sc.filter((i) => drawn.has(i)).length > 1 ? "centres are" : "centre is"} as drawn; ${sc.filter((i) => !drawn.has(i)).length > 1 ? "the others have" : "the other has"} no wedge or dash, so the model picks one arrangement there.` : `; its mirror image is the other ${sc.length > 1 ? "stereoisomer set" : "enantiomer"}. A flat drawing (no wedges or dashes) doesn't say which, so the model picks one.`}</p>` : ""}
      <p class="osk-aka">Geometry from a simple force field: good for shape and bond angles, not exact bond lengths or energies. Drag to turn, scroll or pinch to zoom.</p>`;
  }
  function stop() { if (S) { S.stop(); S = null; stageHost.innerHTML = ""; } lastKey = ""; }
  return { show, stop };
}
