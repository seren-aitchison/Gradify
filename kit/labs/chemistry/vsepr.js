// VSEPR molecular geometry (ctx.mode "vsepr") and molecular polarity (ctx.mode "polarity"). Electron domains
// around the central atom spread out as far as possible; lone pairs take more room than bonding pairs, so
// they sit in equatorial positions of a trigonal bipyramid and opposite each other in an octahedron, and
// they squeeze the bond angles a little (water 104.5°, ammonia 107°, measured). Polarity: each bond dipole
// points towards the more electronegative atom with a size proportional to the electronegativity
// difference; the molecular dipole is their vector sum. A simplified, qualitative dipole: real dipole
// moments also depend on lone pairs and bond lengths.
import { shell, seg, select, panel, challenges, quiz, esc, C } from "../lab.js";
import { stage3d, THREE, bond, mat } from "../three.js";
import { bySym } from "./elements.js";
import { CPK } from "./mol.js";

const V = (x, y, z) => new THREE.Vector3(x, y, z).normalize();
const t = 1 / Math.sqrt(3);
export const DIRS = {
  2: [V(1, 0, 0), V(-1, 0, 0)],
  3: [V(1, 0, 0), V(-0.5, Math.sqrt(3) / 2, 0), V(-0.5, -Math.sqrt(3) / 2, 0)],
  4: [V(t, t, t), V(-t, -t, t), V(-t, t, -t), V(t, -t, -t)],
  5: [V(0, 1, 0), V(0, -1, 0), V(1, 0, 0), V(-0.5, 0, Math.sqrt(3) / 2), V(-0.5, 0, -Math.sqrt(3) / 2)], // two axial, three equatorial
  6: [V(1, 0, 0), V(-1, 0, 0), V(0, 1, 0), V(0, -1, 0), V(0, 0, 1), V(0, 0, -1)],
};
// which positions lone pairs take first
const LP_ORDER = { 2: [0, 1], 3: [0, 1, 2], 4: [0, 1, 2, 3], 5: [2, 3, 4, 0, 1], 6: [0, 1, 2, 3, 4, 5] };
export const SHAPES = {
  "2,0": ["linear", "linear", "180°"], "3,0": ["trigonal planar", "trigonal planar", "120°"], "2,1": ["trigonal planar", "bent", "slightly under 120°"],
  "4,0": ["tetrahedral", "tetrahedral", "109.5°"], "3,1": ["tetrahedral", "trigonal pyramidal", "about 107°"], "2,2": ["tetrahedral", "bent", "about 104.5°"],
  "5,0": ["trigonal bipyramidal", "trigonal bipyramidal", "90° and 120°"], "4,1": ["trigonal bipyramidal", "seesaw", "under 90° and 120°"], "3,2": ["trigonal bipyramidal", "T-shaped", "under 90°"], "2,3": ["trigonal bipyramidal", "linear", "180°"],
  "6,0": ["octahedral", "octahedral", "90°"], "5,1": ["octahedral", "square pyramidal", "under 90°"], "4,2": ["octahedral", "square planar", "90°"],
};
export const MOLS = [
  ["CO₂", "C", ["O", "O"], 0], ["BF₃", "B", ["F", "F", "F"], 0], ["SO₂", "S", ["O", "O"], 1], ["CH₄", "C", ["H", "H", "H", "H"], 0], ["NH₃", "N", ["H", "H", "H"], 1], ["H₂O", "O", ["H", "H"], 2],
  ["CH₃Cl", "C", ["Cl", "H", "H", "H"], 0], ["CHCl₃", "C", ["H", "Cl", "Cl", "Cl"], 0], ["CCl₄", "C", ["Cl", "Cl", "Cl", "Cl"], 0], ["PCl₅", "P", ["Cl", "Cl", "Cl", "Cl", "Cl"], 0], ["SF₄", "S", ["F", "F", "F", "F"], 1],
  ["ClF₃", "Cl", ["F", "F", "F"], 2], ["XeF₂", "Xe", ["F", "F"], 3], ["SF₆", "S", ["F", "F", "F", "F", "F", "F"], 0], ["BrF₅", "Br", ["F", "F", "F", "F", "F"], 1], ["XeF₄", "Xe", ["F", "F", "F", "F"], 2],
];
// positions of the ligands and lone pairs; lone pairs take the preferred positions
export function arrange(nb, nl) {
  const n = nb + nl, dirs = DIRS[n], lp = LP_ORDER[n].slice(0, nl);
  if (n === 6 && nl === 2) lp.splice(0, 2, 0, 1); // opposite each other
  const lig = dirs.map((d, i) => i).filter((i) => !lp.includes(i));
  return { lig: lig.map((i) => dirs[i].clone()), lp: lp.map((i) => dirs[i].clone()) };
}
export function dipole(centre, ligands, dirs) {
  const en = (e) => bySym[e]?.en ?? 2.6; // xenon's is about 2.6
  const v = new THREE.Vector3(); ligands.forEach((L, i) => v.addScaledVector(dirs[i], en(L) - en(centre)));
  return v;
}

export function mount(el, ctx = {}) {
  const polar = ctx.mode === "polarity";
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-q"></div>`);
  const S = stage3d($(".lab-stage"), { distance: 7, aspect: 0.8 }); S.spin = 0.3;
  const ctrl = $(".lab-ctrl"), info = panel(ctrl);
  let nb = 2, nl = 2, mol = null;
  const st = { shapes: new Set(), polar: new Set(), np: new Set() };
  const ch = challenges(ctrl, ctx, polar ? [
    { id: "pol", text: "Find three polar molecules", test: (x) => x.polar.size >= 3 },
    { id: "np", text: "Find three non-polar molecules that contain polar bonds", test: (x) => x.np.size >= 3 },
  ] : [{ id: "ten", text: "Build ten different shapes", test: (x) => x.shapes.size >= 10 }]);
  if (!polar) {
    const doms = document.createElement("div"); doms.className = "lab-row"; $(".top").append(doms);
    select(doms, { label: "Bonding pairs", options: [2, 3, 4, 5, 6], value: nb, onChange: (v) => { nb = Number(v); mol = null; build(); } });
    select(doms, { label: "Lone pairs", options: [0, 1, 2, 3], value: nl, onChange: (v) => { nl = Number(v); mol = null; build(); } });
  }
  select($(".top"), { label: "Molecule", options: [["", "—"], ...MOLS.map((m, i) => [i, m[0]])], value: polar ? 5 : "", onChange: (v) => { if (v === "") return; mol = MOLS[Number(v)]; nb = mol[2].length; nl = mol[3]; build(); } });
  if (polar) mol = MOLS[5];
  if (!polar) quiz($(".lab-q"), ctx, [
    { id: "nh3", q: "Ammonia has 3 bonding pairs and 1 lone pair on nitrogen. What is its shape?", options: ["trigonal planar", "trigonal pyramidal", "tetrahedral", "T-shaped"], answer: 1, why: "Four electron domains point to the corners of a tetrahedron; with one occupied by a lone pair, the atoms form a trigonal pyramid. The lone pair squeezes the angle to about 107°." },
    { id: "xef4", q: "Why is XeF₄ square planar rather than seesaw?", options: ["Xenon is large", "Its two lone pairs sit opposite each other, minimising lone pair–lone pair repulsion", "Fluorine is very electronegative", "Xenon has no lone pairs"], answer: 1, why: "Six electron domains form an octahedron; placing the two lone pairs trans (180° apart) keeps them as far apart as possible, leaving the four F atoms in a square." },
  ]);
  else quiz($(".lab-q"), ctx, [{ id: "co2", q: "CO₂ has two polar C=O bonds. Why is the molecule non-polar?", options: ["The bonds aren't really polar", "The molecule is linear, so the two equal bond dipoles cancel", "Carbon is more electronegative", "It has lone pairs"], answer: 1, why: "The bond dipoles are equal in size and point in opposite directions (180°), so their vector sum is zero." }]);
  function build() {
    if (!SHAPES[`${nb},${nl}`]) { info(`<p class="lab-msg no">${nb} bonding pairs and ${nl} lone pairs make ${nb + nl} domains: more than six isn't covered here.</p>`); S.clear(); return; }
    S.clear();
    const { lig, lp } = arrange(nb, nl), centre = mol ? mol[1] : "X", ligs = mol ? mol[2] : Array(nb).fill("Y");
    const g = new THREE.Group(), O = new THREE.Vector3();
    const cm = new THREE.Mesh(new THREE.SphereGeometry(0.42, 28, 20), mat(THREE, CPK[centre] ?? 0x9775fa)); g.add(cm); S.label(cm, centre === "X" ? "A" : centre);
    lig.forEach((d, i) => { const p = d.clone().multiplyScalar(1.7); const s = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 16), mat(THREE, CPK[ligs[i]] ?? 0xadb5bd)); s.position.copy(p); g.add(s); g.add(bond(THREE, O, p, 0.08, mat(THREE, 0xcfd4da))); if (mol) S.label(s, ligs[i]); });
    lp.forEach((d) => { const lobe = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 14), new THREE.MeshStandardMaterial({ color: 0xffd43b, transparent: true, opacity: 0.35, depthWrite: false })); lobe.scale.set(1, 1, 1.7); lobe.position.copy(d.clone().multiplyScalar(0.95)); lobe.lookAt(d.clone().multiplyScalar(5)); g.add(lobe); });
    let D = null;
    if (polar && mol) {
      D = dipole(centre, ligs, lig);
      lig.forEach((d, i) => { const de = (bySym[ligs[i]]?.en ?? 2.6) - (bySym[centre]?.en ?? 2.6); if (Math.abs(de) < 0.05) return; const from = d.clone().multiplyScalar(de > 0 ? 0.55 : 1.35), to = d.clone().multiplyScalar(de > 0 ? 1.35 : 0.55); g.add(new THREE.ArrowHelper(new THREE.Vector3().subVectors(to, from).normalize(), from, 0.8, 0x74c0fc, 0.2, 0.12)); });
      if (D.length() > 0.05) g.add(new THREE.ArrowHelper(D.clone().normalize(), D.clone().normalize().multiplyScalar(-1.2), 2.4, 0xff6b6b, 0.35, 0.22));
    }
    S.root.add(g);
    const [eg, shape, ang] = SHAPES[`${nb},${nl}`]; st.shapes.add(`${nb},${nl}`);
    const polarMol = D && D.length() > 0.05, polarBonds = mol && mol[2].some((L) => Math.abs((bySym[L]?.en ?? 2.6) - (bySym[centre]?.en ?? 2.6)) >= 0.4);
    if (polar && mol) { if (polarMol) st.polar.add(mol[0]); else if (polarBonds) st.np.add(mol[0]); }
    ch.check(st);
    info(`<h4>${mol ? esc(mol[0]) : `AX${nb > 1 ? `<sub>${nb}</sub>` : ""}${nl ? `E${nl > 1 ? `<sub>${nl}</sub>` : ""}` : ""}`}</h4><table><tr><td>Electron domains</td><td class="num">${nb + nl} (${nb} bonding, ${nl} lone)</td></tr><tr><td>Electron-domain geometry</td><td class="num">${eg}</td></tr><tr><td>Molecular shape</td><td class="num"><b>${shape}</b></td></tr><tr><td>Bond angles</td><td class="num">${ang}</td></tr>${polar && mol ? `<tr><td>Molecule</td><td class="num"><b>${polarMol ? "polar" : "non-polar"}</b></td></tr>` : ""}</table>
      <p class="lab-msg">${polar ? (mol ? (polarMol ? "Blue arrows: bond dipoles (towards the more electronegative atom). Red arrow: the overall dipole. The bond dipoles don't cancel, so the molecule is polar." : polarBonds ? "The bonds are polar, but the symmetrical shape makes the bond dipoles cancel: the molecule is non-polar." : "The bonds are almost non-polar, so the molecule is non-polar.") : "") : "Yellow lobes are lone pairs. The shape is named from the positions of the atoms only, not the lone pairs."}</p>`);
  }
  build();
  return () => S.stop();
}
