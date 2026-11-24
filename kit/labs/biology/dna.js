// DNA double helix explorer: B-DNA built from its measured dimensions (about 10.5 base pairs per turn,
// 0.34 nm rise per base pair, 2 nm diameter), from a sequence you can edit. Shows complementary pairing,
// antiparallel strands, the major and minor grooves, and GC content.
// Simplified: bases are drawn as slabs and the backbone as a tube through the phosphates, not as atoms.
// "Thermal motion" moves every site the way it moved in an oxDNA molecular dynamics run at 37 °C
// (dna-thermal.js, from scripts/oxdna).
import { shell, panel, challenges, esc, button } from "../lab.js";
import { stage3d, ball, mat } from "../three.js";

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
  const S = stage3d($(".lab-stage"), { distance: 9, aspect: 0.75, ao: true });
  const { THREE } = S; S.spin = 0.25;
  const out = panel($(".lab-out"));
  const st = { edited: false, groove: false, gcHigh: false, read: false };
  const ch = challenges($(".lab-ctrl"), ctx, [
    { id: "edit", text: "Type your own sequence", test: (s) => s.edited },
    { id: "gc", text: "Make a sequence that is more than 60% G and C", test: (s) => s.gcHigh },
    { id: "groove", text: "Show the major and minor grooves", test: (s) => s.groove },
  ]);
  let showGroove = false, labels = true, thermal = null, motion = null;
  const backboneMat = mat(THREE, 0xdee2e6, { roughness: 0.38 }), sugarMat = mat(THREE, 0xadb5bd, { roughness: 0.38 }), phosMat = mat(THREE, 0xff922b, { roughness: 0.3 });
  const slab = new THREE.BoxGeometry(1, 1, 1); slab.dispose = () => {};
  const hb = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 });
  // B-DNA: 10.5 bp per turn, 0.34 nm rise, phosphates about 1 nm from the axis, a right-handed helix
  // (the angle turns from +z towards +x going up +y). The two backbones sit about 150° apart around the
  // axis (not 180°), which makes the grooves unequal.
  const rise = 0.34, twist = (2 * Math.PI) / 10.5, R = 1.0, off = (150 * Math.PI) / 180;
  const ideal = (i, y0, side) => { const a = i * twist + (side ? off : 0); return [new THREE.Vector3(R * Math.sin(a), y0 + i * rise, R * Math.cos(a)), a]; };
  let model = null;   // what the current sequence is drawn with, so thermal motion can move it
  function build(seq) {
    S.clear();
    const n = seq.length, y0 = -((n - 1) * rise) / 2;
    const g = new THREE.Group(), pairs = [];
    for (let i = 0; i < n; i++) {
      const b = seq[i], c = PAIR[b], [pA, aA] = ideal(i, y0, 0), [pB, aB] = ideal(i, y0, 1);
      const P = { i, b, c, home: [pA, pB], dirs: [aA, aB], pA: pA.clone(), pB: pB.clone(), inA: null, inB: null };
      P.phos = [ball(THREE, 0.14, phosMat), ball(THREE, 0.14, phosMat)]; P.phos.forEach((m) => g.add(m));
      // bases as flat slabs: purines (A, G: two rings) reach further across than pyrimidines (T, C: one ring)
      P.slabs = [new THREE.Mesh(slab, mat(THREE, COL[b], { roughness: 0.45 })), new THREE.Mesh(slab, mat(THREE, COL[c], { roughness: 0.45 }))]; P.slabs.forEach((m) => g.add(m));
      P.hbonds = Array.from({ length: b === "G" || b === "C" ? 3 : 2 }, () => { const m = new THREE.Mesh(slab, hb); g.add(m); return m; });
      if (labels && n <= 30) { P.la = new THREE.Object3D(); P.lb = new THREE.Object3D(); g.add(P.la, P.lb); S.label(P.la, b, HEX[b]); S.label(P.lb, c, HEX[c]); }
      pairs.push(P);
    }
    model = { g, pairs, tubes: [null, null], y0, n };
    place(null);
    if (showGroove) {
      // shade the narrow (minor) gap between the strands; the wide gap is the major groove
      for (let i = 0; i < n; i += 1) {
        const a = i * twist + off / 2, y = y0 + i * rise;
        const p = ball(THREE, 0.09, mat(THREE, 0xe599f7, { transparent: true, opacity: 0.8 })); p.position.set(1.05 * Math.sin(a), y, 1.05 * Math.cos(a)); g.add(p);
        const q = ball(THREE, 0.09, mat(THREE, 0x66d9e8, { transparent: true, opacity: 0.8 })); const a2 = a + Math.PI; q.position.set(1.05 * Math.sin(a2), y, 1.05 * Math.cos(a2)); g.add(q);
      }
    }
    // 5′ and 3′ ends: the strands run in opposite directions
    const e = (txt, p) => { const o = new THREE.Object3D(); o.position.copy(p); g.add(o); S.label(o, txt, "rgba(255,255,255,.18)"); };
    if (n) { e("5′", new THREE.Vector3(0, y0 - 0.4, R * 1.6)); const a = (n - 1) * twist; e("3′", new THREE.Vector3(R * 1.6 * Math.sin(a), y0 + (n - 1) * rise + 0.4, R * 1.6 * Math.cos(a))); }
    S.root.add(g);
    S.camera.position.set(0, 0, Math.max(6, n * 0.34 * 1.45)); S.controls.target.set(0, 0, 0);
    const turns = n / 10.5, len = n * rise;
    out(`<table><tr><td>Template</td><td class="lab-seq">5′-${[...seq].map((x) => `<i style="background:${HEX[x]}33">${x}</i>`).join("")}-3′</td></tr>
      <tr><td>Complement</td><td class="lab-seq">3′-${[...complement(seq)].map((x) => `<i style="background:${HEX[x]}33">${x}</i>`).join("")}-5′</td></tr></table>
      <div class="lab-read"><div><small>Base pairs</small><b>${n}</b></div><div><small>GC content</small><b>${Math.round(gc(seq) * 100)}%</b></div><div><small>Turns</small><b>${turns.toFixed(2)}</b></div><div><small>Length</small><b>${len.toFixed(2)} nm</b></div><div><small>H-bonds</small><b>${[...seq].reduce((a, b) => a + (b === "G" || b === "C" ? 3 : 2), 0)}</b></div></div>
      <p class="lab-msg">A pairs with T (2 hydrogen bonds), G with C (3), so GC-rich DNA needs more energy to separate. ${showGroove ? "Violet marks the minor groove, cyan the major groove, where many proteins read the sequence." : ""}
      ${thermal ? "Thermal motion: every site moves as it did in an oxDNA molecular dynamics simulation of B-DNA at 37 °C. The helix bends, twists and breathes, and the end base pairs fray open and close." : ""}</p>`);
  }
  // put every site where it belongs: the ideal helix, plus (in thermal mode) the simulated displacement
  const tmp = [0, 0, 0], tmp2 = [0, 0, 0], X = new THREE.Vector3(), Y = new THREE.Vector3(), Z = new THREE.Vector3(), M = new THREE.Matrix4();
  function moved(P, side, site, frame, mix, into) {
    const h = P.home[side], a = P.dirs[side]; into.copy(h);
    if (!thermal || frame == null) return into;
    thermal.at(frame, P.i, site, tmp); thermal.at(frame + 1, P.i, site, tmp2);
    const r = tmp[0] + (tmp2[0] - tmp[0]) * mix, t = tmp[1] + (tmp2[1] - tmp[1]) * mix, ax = tmp[2] + (tmp2[2] - tmp[2]) * mix;
    // the simulation's radial / tangential (along the turn) / axial frame at this site
    return into.set(h.x + r * Math.sin(a) + t * Math.cos(a), h.y + ax, h.z + r * Math.cos(a) - t * Math.sin(a));
  }
  const iA = new THREE.Vector3(), iB = new THREE.Vector3();
  function place(frame, mix = 0) {
    if (!model) return;
    for (const P of model.pairs) {
      moved(P, 0, 0, frame, mix, P.pA); moved(P, 1, 1, frame, mix, P.pB);
      // the inner (base) ends: ideal = across the pair, moved by the base sites' own displacement
      const purA = P.b === "A" || P.b === "G";
      const fA = purA ? 0.56 : 0.44;   // the purine takes the longer share of the gap
      iA.lerpVectors(P.pA, P.pB, fA - 0.03); iB.lerpVectors(P.pA, P.pB, fA + 0.03);
      if (thermal && frame != null) { const dA = moved(P, 0, 2, frame, mix, new THREE.Vector3()).sub(P.home[0]), dB = moved(P, 1, 3, frame, mix, new THREE.Vector3()).sub(P.home[1]); iA.addScaledVector(dA, 0.5); iB.addScaledVector(dB, 0.5); }
      P.phos[0].position.copy(P.pA); P.phos[1].position.copy(P.pB);
      orient(P.slabs[0], P.pA, iA, 0.3, 0.09); orient(P.slabs[1], iB, P.pB, 0.3, 0.09);
      P.hbonds.forEach((m, k) => { const o = (k - (P.hbonds.length - 1) / 2) * 0.08; orient(m, iA, iB, 0.016, 0.016, o); });
      if (P.la) { P.la.position.copy(P.pA).multiplyScalar(1.3); P.la.position.y = P.pA.y; P.lb.position.copy(P.pB).multiplyScalar(1.3); P.lb.position.y = P.pB.y; }
    }
    // the sugar-phosphate backbones: smooth tubes through the phosphates
    for (const side of [0, 1]) {
      const pts = model.pairs.map((P) => (side ? P.pB : P.pA));
      if (pts.length < 2) continue;
      const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), pts.length * 8, 0.075, 14);
      if (model.tubes[side]) { model.tubes[side].geometry.dispose(); model.tubes[side].geometry = geo; }
      else { model.tubes[side] = new THREE.Mesh(geo, side ? sugarMat : backboneMat); model.g.add(model.tubes[side]); }
    }
  }
  // a unit box stretched from a to b, w wide (along the helix axis it is thin), shifted sideways by `side`
  function orient(m, a, b, w, h, side = 0) {
    X.subVectors(b, a); const len = X.length(); X.divideScalar(len || 1);
    Z.set(0, 1, 0).cross(X).normalize(); Y.crossVectors(X, Z);
    M.makeBasis(X, Y, Z); m.quaternion.setFromRotationMatrix(M);
    m.position.lerpVectors(a, b, 0.5).addScaledVector(Z, side); m.scale.set(len, h, w);
  }
  S.onFrame = (dt, t) => { if (thermal && model) { const ft = t * 3, f = Math.floor(ft), u = ft - f; place(f % thermal.FRAMES, u * u * (3 - 2 * u)); } };
  const inp = $(".seq");
  const clean = (s) => s.toUpperCase().replace(/[^ATGC]/g, "").slice(0, 30);
  inp.addEventListener("input", () => { const s = clean(inp.value); if (s !== inp.value) inp.value = s; st.edited = true; st.gcHigh = s.length >= 8 && gc(s) > 0.6; ch.check(st); build(s); });
  button($(".tools"), "Grooves", () => { showGroove = !showGroove; st.groove = showGroove || st.groove; ch.check(st); build(clean(inp.value)); });
  button($(".tools"), "Labels", () => { labels = !labels; build(clean(inp.value)); });
  button($(".tools"), "Turn on/off", () => { S.spin = S.spin ? 0 : 0.25; });
  button($(".tools"), "Thermal motion", async () => {
    if (thermal) { thermal = null; place(null); } else { thermal = await (motion ||= import("./dna-thermal.js")); }
    build(clean(inp.value));
  });
  button($(".tools"), "Random", () => { inp.value = Array.from({ length: 24 }, () => "ATGC"[Math.floor(Math.random() * 4)]).join(""); inp.dispatchEvent(new Event("input")); });
  build(clean(inp.value));
  return () => S.stop();
}
