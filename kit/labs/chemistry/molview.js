// Drawing a molecule (from mol.js) in a 3D stage: ball-and-stick or space-filling, with optional atom
// highlights and labels. Shared by the 3D viewer, functional groups, chirality, R/S and docking labs.
import { THREE, bond, mat } from "../three.js";
import { CPK } from "./mol.js";
import { bySym } from "./elements.js";

export function drawMolecule(S, m, { style = "ball", highlight = new Set(), labels = null, offset = [0, 0, 0], dim = false } = {}) {
  const g = new THREE.Group(), P = m.pos.map((p) => new THREE.Vector3(p[0] + offset[0], p[1] + offset[1], p[2] + offset[2]));
  const mats = {};
  const matFor = (el, hi) => { const k = `${el}${hi ? "*" : ""}`; return (mats[k] ||= mat(THREE, CPK[el] ?? 0xff66cc, { emissive: hi ? 0x664400 : 0x000000, transparent: dim && !hi, opacity: dim && !hi ? 0.35 : 1 })); };
  m.atoms.forEach((a, i) => {
    const vdw = style === "space" ? ((bySym[a.el]?.radius || 70) / 100) * 1.6 : a.el === "H" ? 0.2 : 0.32;
    const s = new THREE.Mesh(new THREE.SphereGeometry(vdw, 24, 16), matFor(a.el, highlight.has(i)));
    s.position.copy(P[i]); s.userData.atom = i; g.add(s);
    if (labels && labels[i]) S.label(s, labels[i]);
  });
  if (style !== "space") for (const b of m.bonds) {
    const A = P[b.a], B = P[b.b], hi = highlight.has(b.a) && highlight.has(b.b), bm = mat(THREE, hi ? 0xffd43b : 0xcfd4da, { transparent: dim && !hi, opacity: dim && !hi ? 0.35 : 1 });
    if (b.order === 1 || b.order === 1.5) { g.add(bond(THREE, A, B, 0.09, bm)); if (b.order === 1.5) { const off = perp(A, B, P, m, b).multiplyScalar(0.12); g.add(bond(THREE, A.clone().add(off), B.clone().add(off), 0.035, bm)); } }
    else { const off = perp(A, B, P, m, b).multiplyScalar(b.order === 3 ? 0.13 : 0.09); for (const k of b.order === 3 ? [-1, 0, 1] : [-1, 1]) g.add(bond(THREE, A.clone().addScaledVector(off, k), B.clone().addScaledVector(off, k), 0.055, bm)); }
  }
  S.root.add(g);
  return g;
}
// a direction perpendicular to a bond, in the plane of a neighbouring atom where possible
function perp(A, B, P, m, b) {
  const d = new THREE.Vector3().subVectors(B, A).normalize(), nb = m.atoms[b.a].nb.find((x) => x !== b.b) ?? m.atoms[b.b].nb.find((x) => x !== b.a);
  const ref = nb != null ? new THREE.Vector3().subVectors(P[nb], A) : new THREE.Vector3(0, 1, 0);
  const p = ref.sub(d.clone().multiplyScalar(ref.dot(d))); if (p.length() < 1e-3) p.set(d.y, -d.x, 0);
  return p.normalize();
}
export function frame(S, m, extra = 1) { const r = Math.max(2, ...m.pos.map((p) => Math.hypot(...p))); S.camera.position.set(0, 0, r * 3.2 * extra); S.controls.target.set(0, 0, 0); }
