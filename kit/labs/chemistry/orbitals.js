// Atomic orbitals of hydrogen, computed from the exact hydrogen-atom wavefunctions ψ = R(r)·Y(θ, φ) (real
// combinations of the spherical harmonics). Shows a slice of the probability density |ψ|² with the sign
// (phase) of ψ in two colours, a 3D cloud of points sampled from |ψ|², and the radial distribution
// r²R² with its radial nodes. Exact for hydrogen; in many-electron atoms the shapes are similar but the
// sizes and energies change.
import { shell, seg, canvas, axes, line, clear, text, panel, challenges, quiz, C } from "../lab.js";
import { stage3d, THREE } from "../three.js";

const S3 = Math.sqrt(3), S6 = Math.sqrt(6), S30 = Math.sqrt(30), PI = Math.PI;
export const R = {
  "1s": (r) => 2 * Math.exp(-r),
  "2s": (r) => (1 / (2 * Math.SQRT2)) * (2 - r) * Math.exp(-r / 2),
  "2p": (r) => (1 / (2 * S6)) * r * Math.exp(-r / 2),
  "3s": (r) => (2 / (81 * S3)) * (27 - 18 * r + 2 * r * r) * Math.exp(-r / 3),
  "3p": (r) => (4 / (81 * S6)) * (6 * r - r * r) * Math.exp(-r / 3),
  "3d": (r) => (4 / (81 * S30)) * r * r * Math.exp(-r / 3),
};
// real angular parts, as functions of unit-vector components
export const Y = {
  s: () => 1 / Math.sqrt(4 * PI), pz: (x, y, z) => Math.sqrt(3 / (4 * PI)) * z, px: (x) => Math.sqrt(3 / (4 * PI)) * x, py: (x, y) => Math.sqrt(3 / (4 * PI)) * y,
  dz2: (x, y, z) => Math.sqrt(5 / (16 * PI)) * (3 * z * z - 1), dxz: (x, y, z) => Math.sqrt(15 / (4 * PI)) * x * z, dyz: (x, y, z) => Math.sqrt(15 / (4 * PI)) * y * z,
  dxy: (x, y) => Math.sqrt(15 / (4 * PI)) * x * y, dx2y2: (x, y) => Math.sqrt(15 / (16 * PI)) * (x * x - y * y),
};
export const ORBS = { "1s": ["1s", "s"], "2s": ["2s", "s"], "2pz": ["2p", "pz"], "2px": ["2p", "px"], "3s": ["3s", "s"], "3pz": ["3p", "pz"], "3dz²": ["3d", "dz2"], "3dxz": ["3d", "dxz"], "3dxy": ["3d", "dxy"], "3dx²−y²": ["3d", "dx2y2"] };
export function psi(name, x, y, z) { const [n, a] = ORBS[name], r = Math.hypot(x, y, z) || 1e-9; return R[n](r) * Y[a](x / r, y / r, z / r); }
const extent = { "1": 5, "2": 12, "3": 22 };
const plane = (name) => (/xy|x²−y²/.test(name) ? "xy" : "xz");

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div><div class="lab-stage2"></div><div class="lab-stage3"></div></div></div><div class="lab-cols"><div class="lab-out"></div><div class="lab-ctrl"></div></div><div class="lab-q"></div>`);
  const S = stage3d($(".lab-stage"), { distance: 30, aspect: 0.9, max: 460 }); S.spin = 0.3;
  const cv = canvas($(".lab-stage2"), { aspect: 1, max: 260 }), cv2 = canvas($(".lab-stage3"), { aspect: 0.55, max: 200 });
  const out = panel($(".lab-out")), ctrl = $(".lab-ctrl");
  let cur = "2pz";
  const st = { seen: new Set() };
  const ch = challenges(ctrl, ctx, [
    { id: "all3", text: "Look at an s, a p and a d orbital", test: (x) => ["s", "p", "d"].every((t) => [...x.seen].some((n) => n[1] === t)) },
    { id: "nodes", text: "Find an orbital with a radial node (try 2s or 3s)", test: (x) => x.seen.has("2s") || x.seen.has("3s") || x.seen.has("3pz") },
  ]);
  quiz($(".lab-q"), ctx, [
    { id: "n3d", q: "How many nodes does a 3d orbital have in total?", options: ["1", "2", "3", "0"], answer: 1, why: "An orbital has n − 1 nodes: for 3d, n − 1 = 2, all angular (l = 2) and no radial nodes (n − l − 1 = 0)." },
    { id: "rad", q: "How many radial nodes has a 3s orbital?", options: ["0", "1", "2", "3"], answer: 2, why: "Radial nodes = n − l − 1 = 3 − 0 − 1 = 2: spheres where ψ changes sign, visible as two zeros in r²R²." },
  ]);
  seg($(".top"), Object.keys(ORBS).map((k) => [k, k]), cur, (v) => { cur = v; draw(); });
  function draw() {
    st.seen.add(cur); ch.check(st);
    const [n] = ORBS[cur], L = extent[n[0]], pl = plane(cur);
    // the density slice, coloured by phase
    const g = cv.g, W = cv.W, H = cv.H, img = g.createImageData(Math.round(W * cv.dpr), Math.round(H * cv.dpr));
    let mx = 0; const N = img.width, M = img.height, vals = new Float32Array(N * M);
    for (let j = 0; j < M; j++) for (let i = 0; i < N; i++) { const u = (i / N - 0.5) * 2 * L, v = (0.5 - j / M) * 2 * L, p = pl === "xy" ? psi(cur, u, v, 0) : psi(cur, u, 0, v); vals[j * N + i] = p; mx = Math.max(mx, p * p); }
    for (let k = 0; k < N * M; k++) { const p = vals[k], d = Math.sqrt((p * p) / mx); img.data[k * 4] = p >= 0 ? 255 * d : 60 * d; img.data[k * 4 + 1] = p >= 0 ? 170 * d : 150 * d; img.data[k * 4 + 2] = p >= 0 ? 40 * d : 255 * d; img.data[k * 4 + 3] = 255; }
    g.putImageData(img, 0, 0);
    text(g, `${pl} plane · |ψ|², orange +, blue −`, 8, 16, { size: 11 }); text(g, `${L} a₀`, W - 8, H - 8, { size: 10, align: "right", color: C.mute });
    // radial distribution
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const P = (r) => r * r * R[n](r) ** 2, rs = Array.from({ length: 300 }, (_, i) => (i / 299) * L * 1.2), pm = Math.max(...rs.map(P));
    const A = axes(g2, { l: 40, t: 10, w: W2 - 52, h: H2 - 40 }, { x0: 0, x1: L * 1.2, y0: 0, y1: pm * 1.1, xl: "r (a₀)", yl: "r²R²", xt: 4, yt: 2, xf: (v) => v.toFixed(0), yf: () => "" });
    line(g2, rs.map((r) => [A.X(r), A.Y(P(r))]), C.amber, 2);
    // the 3D cloud: rejection sampling from |ψ|²
    S.clear();
    const pts = [], cols = [], want = 6000; let tries = 0, pmax = 0;
    for (let k = 0; k < 4000; k++) { const x = (Math.random() - 0.5) * 2 * L, y = (Math.random() - 0.5) * 2 * L, z = (Math.random() - 0.5) * 2 * L, p = psi(cur, x, y, z); pmax = Math.max(pmax, p * p); }
    while (pts.length < want * 3 && tries < 600000) { tries++; const x = (Math.random() - 0.5) * 2 * L, y = (Math.random() - 0.5) * 2 * L, z = (Math.random() - 0.5) * 2 * L, p = psi(cur, x, y, z); if (Math.random() * pmax < p * p) { pts.push(x, z, y); p >= 0 ? cols.push(1, 0.67, 0.16) : cols.push(0.24, 0.6, 1); } }
    const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3)); geo.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
    S.root.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: L / 55, vertexColors: true, transparent: true, opacity: 0.8, depthWrite: false })));
    S.camera.position.set(0, L * 0.4, L * 2.6); S.controls.target.set(0, 0, 0);
    const nq = Number(n[0]), l = "spd".indexOf(n[1]);
    out(`<h4>${cur} orbital</h4><div class="lab-read"><div><small>n</small><b>${nq}</b></div><div><small>l</small><b>${l}</b></div><div><small>Radial nodes (n − l − 1)</small><b>${nq - l - 1}</b></div><div><small>Angular nodes (l)</small><b>${l}</b></div></div>
      <p class="lab-msg">The cloud shows where the electron is likely to be found: denser regions are more probable. Colours show the sign of ψ, which matters when orbitals overlap to form bonds. Distances in Bohr radii (a₀ = 52.9 pm).</p>`);
  }
  draw();
  return () => S.stop();
}
