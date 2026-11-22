// 3D mode of the Organic Chemistry Lab: the Structure-mode drawing as a 3D model you can turn, from mol.js (SMILES →
// hydrogens → a force-field embedding) drawn by molview.js. Stereocentres are highlighted and labelled R or S for the
// configuration the model happens to have: a flat drawing has no wedges, so it doesn't fix which one.
import { button, esc } from "../lab.js";
import { stage3d } from "../three.js";
import { molecule, stereocentres, chirality } from "./mol.js";
import { drawMolecule, frame } from "./molview.js";
import * as K from "./skeletal.js";

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
    const key = `${A.smiles}|${style}`; if (key === lastKey && S) return; lastKey = key;
    let mol;
    try { mol = molecule(A.smiles); } catch { stop(); info.innerHTML = "<h4>Can't build this one in 3D</h4><p>The 3D builder covers ordinary organic molecules.</p>"; return; }
    if (!S) S = stage3d(stageHost, { aspect: 0.62, max: 480 }); else S.clear();
    const sc = stereocentres(mol), labels = Object.fromEntries(sc.map((i) => [i, `${chirality(mol, i) || "*"}`]));
    drawMolecule(S, mol, { style, highlight: new Set(sc), labels });
    frame(S, mol);
    const c = A.carbon;
    info.innerHTML = `<h4>${esc(A.name?.name || (A.components > 1 ? `${A.components} separate species` : A.formula))}</h4>
      <p>${c.sp3 ? `${c.sp3} sp³ carbon${c.sp3 > 1 ? "s" : ""}: tetrahedral, 109.5°. ` : ""}${c.sp2 ? `${c.sp2} sp² carbon${c.sp2 > 1 ? "s" : ""}: trigonal planar, 120°. ` : ""}${c.sp ? `${c.sp} sp carbon${c.sp > 1 ? "s" : ""}: linear, 180°.` : ""}</p>
      ${sc.length ? `<p><b>${sc.length} stereocentre${sc.length > 1 ? "s" : ""}</b> (highlighted). This model shows ${sc.map((i) => labels[i]).join(", ")}; its mirror image is the other ${sc.length > 1 ? "stereoisomer set" : "enantiomer"}. A flat skeletal drawing doesn't say which, so the model picks one.</p>` : ""}
      <p class="osk-aka">Geometry from a simple force field: good for shape and bond angles, not exact bond lengths or energies. Drag to turn, scroll or pinch to zoom.</p>`;
  }
  function stop() { if (S) { S.stop(); S = null; stageHost.innerHTML = ""; } lastKey = ""; }
  return { show, stop };
}
