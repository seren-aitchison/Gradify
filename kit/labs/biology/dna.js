// DNA double helix explorer: B-DNA built from its measured dimensions (about 10.5 base pairs per turn,
// 0.34 nm rise per base pair, 2 nm diameter), from a sequence you can edit. Shows complementary pairing,
// antiparallel strands, the major and minor grooves, and GC content.
// Simplified: bases are drawn as rods and the backbone as beads, not as atoms.
import { shell, panel, challenges, esc, button } from "../lab.js";
import { stage3d, bond, mat } from "../three.js";

export const PAIR = { A: "T", T: "A", G: "C", C: "G" };
const COL = { A: 0x40c057, T: 0xfa5252, G: 0xfab005, C: 0x4dabf7 };
const HEX = { A: "#40c057", T: "#fa5252", G: "#fab005", C: "#4dabf7" };
export const complement = (s) => [...s].map((b) => PAIR[b]).join("");
export const reverseComplement = (s) => complement(s).split("").reverse().join("");
export const gc = (s) => (s.length ? [...s].filter((b) => b === "G" || b === "C").length / s.length : 0);

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl">
    <label class="lab-sel" style="flex-direction:column;align-items:stretch"><span>Template sequence (5′→3′), up to 30 bases</span><input type="text" class="seq" maxlength="30" spellcheck="false" value="ATGCGTACCTGAATTCGGCATTA"></label>
    <div class="lab-row tools"></div><div class="lab-out"></div></div></div>`);
  const S = stage3d($(".lab-stage"), { distance: 9, aspect: 0.75 });
  const { THREE } = S; S.spin = 0.25;
  const out = panel($(".lab-out"));
  const st = { edited: false, groove: false, gcHigh: false, read: false };
  const ch = challenges($(".lab-ctrl"), ctx, [
    { id: "edit", text: "Type your own sequence", test: (s) => s.edited },
    { id: "gc", text: "Make a sequence that is more than 60% G and C", test: (s) => s.gcHigh },
    { id: "groove", text: "Show the major and minor grooves", test: (s) => s.groove },
  ]);
  let showGroove = false, labels = true;
  const backboneMat = mat(THREE, 0xdee2e6), sugarMat = mat(THREE, 0xadb5bd);
  function build(seq) {
    S.clear();
    const n = seq.length, rise = 0.34, twist = (2 * Math.PI) / 10.5, R = 1.0;
    // the two backbones sit about 150° apart around the axis (not 180°), which makes the grooves unequal
    const off = (150 * Math.PI) / 180, y0 = -((n - 1) * rise) / 2;
    const g = new THREE.Group();
    let prevA = null, prevB = null;
    for (let i = 0; i < n; i++) {
      const a = i * twist, y = y0 + i * rise;
      const pA = new THREE.Vector3(R * Math.cos(a), y, R * Math.sin(a)), pB = new THREE.Vector3(R * Math.cos(a + off), y, R * Math.sin(a + off));
      const b = seq[i], c = PAIR[b];
      for (const [p, m] of [[pA, backboneMat], [pB, sugarMat]]) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), m); s.position.copy(p); g.add(s); }
      const mid = pA.clone().lerp(pB, 0.5);
      g.add(bond(THREE, pA, mid, 0.07, mat(THREE, COL[b])));
      g.add(bond(THREE, mid, pB, 0.07, mat(THREE, COL[c])));
      if (prevA) { g.add(bond(THREE, prevA, pA, 0.05, backboneMat)); g.add(bond(THREE, prevB, pB, 0.05, sugarMat)); }
      prevA = pA; prevB = pB;
      if (labels && n <= 30 && i % 1 === 0) {
        const la = new THREE.Object3D(); la.position.copy(pA).multiplyScalar(1.28); la.position.y = y; g.add(la); S.label(la, b, HEX[b]);
        const lb = new THREE.Object3D(); lb.position.copy(pB).multiplyScalar(1.28); lb.position.y = y; g.add(lb); S.label(lb, c, HEX[c]);
      }
    }
    if (showGroove) {
      // shade the narrow (minor) gap between the strands; the wide gap is the major groove
      for (let i = 0; i < n; i += 1) {
        const a = i * twist + off / 2, y = y0 + i * rise;
        const p = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), mat(THREE, 0xe599f7, { transparent: true, opacity: 0.8 })); p.position.set(1.05 * Math.cos(a), y, 1.05 * Math.sin(a)); g.add(p);
        const q = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), mat(THREE, 0x66d9e8, { transparent: true, opacity: 0.8 })); const a2 = a + Math.PI; q.position.set(1.05 * Math.cos(a2), y, 1.05 * Math.sin(a2)); g.add(q);
      }
    }
    // 5′ and 3′ ends: the strands run in opposite directions
    const e = (txt, p) => { const o = new THREE.Object3D(); o.position.copy(p); g.add(o); S.label(o, txt, "rgba(255,255,255,.18)"); };
    if (n) { e("5′", new THREE.Vector3(R * 1.6, y0 - 0.4, 0)); e("3′", new THREE.Vector3(R * 1.6 * Math.cos((n - 1) * twist), y0 + (n - 1) * rise + 0.4, R * 1.6 * Math.sin((n - 1) * twist))); }
    S.root.add(g);
    S.camera.position.set(0, 0, Math.max(6, n * 0.34 * 1.45)); S.controls.target.set(0, 0, 0);
    const turns = n / 10.5, len = n * rise;
    out(`<table><tr><td>Template</td><td class="lab-seq">5′-${[...seq].map((x) => `<i style="background:${HEX[x]}33">${x}</i>`).join("")}-3′</td></tr>
      <tr><td>Complement</td><td class="lab-seq">3′-${[...complement(seq)].map((x) => `<i style="background:${HEX[x]}33">${x}</i>`).join("")}-5′</td></tr></table>
      <div class="lab-read"><div><small>Base pairs</small><b>${n}</b></div><div><small>GC content</small><b>${Math.round(gc(seq) * 100)}%</b></div><div><small>Turns</small><b>${turns.toFixed(2)}</b></div><div><small>Length</small><b>${len.toFixed(2)} nm</b></div><div><small>H-bonds</small><b>${[...seq].reduce((a, b) => a + (b === "G" || b === "C" ? 3 : 2), 0)}</b></div></div>
      <p class="lab-msg">A pairs with T (2 hydrogen bonds), G with C (3), so GC-rich DNA needs more energy to separate. ${showGroove ? "Violet marks the minor groove, cyan the major groove, where many proteins read the sequence." : ""}</p>`);
  }
  const inp = $(".seq");
  const clean = (s) => s.toUpperCase().replace(/[^ATGC]/g, "").slice(0, 30);
  inp.addEventListener("input", () => { const s = clean(inp.value); if (s !== inp.value) inp.value = s; st.edited = true; st.gcHigh = s.length >= 8 && gc(s) > 0.6; ch.check(st); build(s); });
  button($(".tools"), "Grooves", () => { showGroove = !showGroove; st.groove = showGroove || st.groove; ch.check(st); build(clean(inp.value)); });
  button($(".tools"), "Labels", () => { labels = !labels; build(clean(inp.value)); });
  button($(".tools"), "Turn on/off", () => { S.spin = S.spin ? 0 : 0.25; });
  button($(".tools"), "Random", () => { inp.value = Array.from({ length: 24 }, () => "ATGC"[Math.floor(Math.random() * 4)]).join(""); inp.dispatchEvent(new Event("input")); });
  build(clean(inp.value));
  return () => S.stop();
}
