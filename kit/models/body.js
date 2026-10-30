// MedGradify's 3D body: nine systems built in code, in enough detail for medical school. Named
// bones (with the skull's cap lifted to show the brain), muscles, the brain in parts, plexuses and
// named nerves, a four-chambered heart with its coronary arteries, the great vessels, lobed lungs,
// the gut from oesophagus to appendix, kidneys, endocrine glands and lymphoid organs. The heart
// beats, the lungs breathe and blood and impulses flow. What it teaches is in body-data.js.
import { GROUPS, STRUCTURES, NOTES } from "./body-data.js";

export default {
  title: "The body in 3D",
  kicker: "3D anatomy",
  intro: { title: "Explore the body", text: "Nine systems, in medical school detail. Click any structure for its key relations and clinical points, make flashcards from it, or find it in your notes. Fade the skin, hide systems, pull the organs apart, or zoom right in: the full notes for each system are below the model." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Clinical",
  quiz: "find the structure",
  motion: "Heartbeat, breathing and flow",
  camera: { pos: [0.8, 1.0, 3.6], target: [0, 0.9, 0], min: 0.05, max: 5.5 },
  views: { Front: [[0, 1.0, 3.6], [0, 0.9, 0]], Side: [[3.6, 1.0, 0], [0, 0.9, 0]], Back: [[0, 1.0, -3.6], [0, 0.9, 0]], Head: [[0.25, 1.78, 0.6], [0, 1.7, 0]], Neck: [[0.15, 1.56, 0.45], [0, 1.54, 0]], Chest: [[0.3, 1.35, 1.0], [0, 1.3, 0]], Abdomen: [[0.3, 1.05, 1.0], [0, 1.02, 0]], Pelvis: [[0.2, 0.92, 0.85], [0, 0.92, 0]], Arm: [[0.9, 1.15, 0.9], [0.24, 1.12, 0]], Leg: [[0.8, 0.45, 1.1], [0.1, 0.45, 0]] },
  sliders: [{ key: "skin", label: "Skin", value: 45 }],
  labelMax: 0.45,
  centre: [0, 1.15, 0],

  build(k) {
    const { THREE, V, holo, mat, bone, glow, limb, tube, taper, blob, lathe, box, slice, cut, add, decor } = k;
    const L = [-1, 1];   // patient's right is -x (they face the camera), left is +x

    // ---------- skin ----------
    const skinMat = holo(), skin = new THREE.Group();
    skin.add(lathe([[0.0, 0.92], [0.13, 0.93], [0.16, 0.98], [0.15, 1.05], [0.135, 1.13], [0.145, 1.22], [0.165, 1.32], [0.18, 1.4], [0.17, 1.45], [0.1, 1.49], [0.05, 1.52], [0.0, 1.52]], skinMat, 96));
    skin.children[0].scale.set(1, 1, 0.62);
    skin.add(limb(V(0, 1.5, 0), V(0, 1.6, 0), 0.05, skinMat));
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 64, 64), skinMat); head.scale.set(0.9, 1.15, 1.02); head.position.set(0, 1.71, 0.005); skin.add(head);
    for (const s of L) {
      skin.add(limb(V(s * 0.18, 1.42, 0), V(s * 0.24, 1.15, -0.01), 0.045, skinMat));
      skin.add(limb(V(s * 0.24, 1.15, -0.01), V(s * 0.27, 0.9, 0.04), 0.036, skinMat));
      skin.add(limb(V(s * 0.27, 0.9, 0.04), V(s * 0.275, 0.8, 0.05), 0.03, skinMat));
      skin.add(limb(V(s * 0.09, 0.95, 0), V(s * 0.1, 0.52, 0.005), 0.075, skinMat));
      skin.add(limb(V(s * 0.1, 0.52, 0.005), V(s * 0.11, 0.1, -0.015), 0.052, skinMat));
      skin.add(limb(V(s * 0.11, 0.05, -0.02), V(s * 0.12, 0.04, 0.12), 0.035, skinMat));
    }
    decor(skin);
    k.slider("skin", (v) => { skinMat.uniforms.uOpacity.value = v; skin.visible = v > 0; });

    // ---------- skeletal ----------
    const b = bone(), cart = mat("#cfe3ea", { roughness: 0.3, detail: "none", transmission: 0.2, thickness: 0.02 });
    // skull: the cranial cap is lifted off (cut along an oblique plane) so the brain shows
    const cranium = new THREE.Mesh(cut(blob(0.1, 0.88, 1.04, 1.02, (v) => { if (v.y < -0.02 && v.z > 0.02) v.y *= 0.8; }, 96), V(0, 0.045, 0), V(0, 0.85, 0.53).normalize()), b);
    cranium.material = b.clone(); cranium.material.side = THREE.DoubleSide;
    cranium.position.set(0, 1.72, 0); add("skull", cranium);
    const face = new THREE.Mesh(blob(0.06, 1.1, 0.9, 0.7), b); face.position.set(0, 1.655, 0.055); add("skull", face);
    for (const s of L) { const orbit = new THREE.Mesh(new THREE.SphereGeometry(0.019, 24, 24), mat("#120c0c", { detail: "none" })); orbit.position.set(s * 0.033, 1.69, 0.088); decor(orbit, "skeletal"); }
    add("skull", limb(V(-0.07, 1.67, 0.03), V(-0.05, 1.68, 0.075), 0.01, b)); add("skull", limb(V(0.07, 1.67, 0.03), V(0.05, 1.68, 0.075), 0.01, b));   // zygomatic arches
    add("mandible", tube([V(-0.055, 1.66, -0.005), V(-0.055, 1.61, 0.01), V(-0.04, 1.59, 0.06), V(0, 1.585, 0.09), V(0.04, 1.59, 0.06), V(0.055, 1.61, 0.01), V(0.055, 1.66, -0.005)], 0.012, b, 64));
    // the vertebral column: bodies, discs and spinous processes along the spine's curves
    const spinePts = []; for (let i = 0; i <= 24; i++) { const y = 0.98 + i * 0.026; spinePts.push(V(0, y, -0.065 + 0.018 * Math.sin((y - 0.98) * 5.2))); }
    spinePts.slice(0, 24).forEach((p, i) => {
      const r = 0.019 - i * 0.00025, v = new THREE.Group();
      v.add(new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.05, 0.017, 24), b));
      const sp = box(0.008, 0.008, 0.03, b); sp.position.set(0, -0.004, -0.025); sp.rotation.x = 0.4; v.add(sp);
      for (const s of L) { const tp = box(0.03, 0.007, 0.008, b); tp.position.set(s * 0.018, 0, -0.012); v.add(tp); }
      v.position.copy(p); add("spine", v);
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.95, r * 0.95, 0.006, 24), cart); disc.position.copy(p).add(V(0, 0.0125, 0)); add("spine", disc);
    });
    add("spine", new THREE.Mesh(blob(0.035, 0.9, 1.3, 0.5), b)).position.set(0, 0.95, -0.075);   // sacrum
    for (let i = 0; i < 12; i++) {
      const y = 1.43 - i * 0.022, w = 0.105 + Math.sin((i / 11) * Math.PI) * 0.035, end = i < 7 ? 0.93 : i < 10 ? 0.82 : 0.55;
      for (const s of L) {
        const pts = []; for (let j = 0; j <= 14; j++) { const a = -Math.PI / 2 + (j / 14) * Math.PI * end; pts.push(V(s * Math.cos(a) * w, y - (j / 14) * 0.05 * end, Math.sin(a) * 0.075 - 0.005)); }
        add("ribs", tube(pts, 0.0055, b, 32));
        if (i < 10) { const e = pts[pts.length - 1], to = V(s * 0.014, i < 7 ? 1.43 - i * 0.026 : 1.27 - (i - 7) * 0.012, 0.07); add("ribs", tube([e, e.clone().lerp(to, 0.5).add(V(0, 0.01, 0.004)), to], 0.0045, cart, 12)); }
      }
    }
    add("sternum", box(0.04, 0.045, 0.012, b, 0.005)).position.set(0, 1.42, 0.073);
    add("sternum", box(0.03, 0.11, 0.01, b, 0.004)).position.set(0, 1.335, 0.075);
    add("sternum", box(0.014, 0.025, 0.006, b, 0.003)).position.set(0, 1.265, 0.073);
    for (const s of L) {
      add("shoulderGirdle", tube([V(s * 0.022, 1.465, 0.06), V(s * 0.08, 1.47, 0.055), V(s * 0.13, 1.475, 0.02), V(s * 0.175, 1.47, -0.01)], 0.0075, b, 24));
      const sc = new THREE.Mesh(blob(0.06, 0.9, 1.2, 0.18, (v) => { v.x *= 1 - Math.max(0, -v.y) * 6; }), b); sc.position.set(s * 0.12, 1.37, -0.09); sc.rotation.set(0.15, s * 0.45, s * -0.15); add("shoulderGirdle", sc);
    }
    // pelvis: iliac wings flaring from the sacrum, the pubic arch, the acetabula
    for (const s of L) {
      const wing = new THREE.Mesh(blob(0.07, 1, 0.85, 0.3, (v) => { if (v.y < 0) v.x *= 1 + v.y * 6; }), b);
      wing.position.set(s * 0.075, 0.99, -0.03); wing.rotation.set(0.25, s * -0.55, s * 0.35); add("pelvis", wing);
      const ac = new THREE.Mesh(new THREE.SphereGeometry(0.022, 24, 24), b); ac.position.set(s * 0.085, 0.93, 0.0); add("pelvis", ac);
    }
    add("pelvis", tube([V(-0.085, 0.93, -0.01), V(-0.06, 0.89, 0.03), V(0, 0.875, 0.05), V(0.06, 0.89, 0.03), V(0.085, 0.93, -0.01)], 0.012, b, 32));
    // limbs: named long bones with their ends
    const ends = (a, z, r) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 24), b); m.position.copy(a); return m; };
    for (const s of L) {
      add("humerus", limb(V(s * 0.18, 1.41, 0), V(s * 0.24, 1.16, -0.01), 0.011, b)); add("humerus", ends(V(s * 0.178, 1.415, -0.005), 0, 0.02)); add("humerus", limb(V(s * 0.225, 1.165, -0.01), V(s * 0.255, 1.16, -0.01), 0.012, b));
      add("forearm", limb(V(s * 0.245, 1.15, -0.01), V(s * 0.265, 0.91, 0.035), 0.008, b)); add("forearm", limb(V(s * 0.25, 1.15, -0.01), V(s * 0.28, 0.91, 0.045), 0.007, b));
      for (let f = 0; f < 5; f++) add("forearm", limb(V(s * (0.262 + f * 0.006), 0.895, 0.03 + f * 0.006), V(s * (0.265 + f * 0.007), 0.82 + (f === 0 ? 0.03 : 0), 0.04 + f * 0.007), 0.0035, b));
      add("femur", limb(V(s * 0.1, 0.89, 0.005), V(s * 0.1, 0.53, 0.005), 0.015, b)); add("femur", limb(V(s * 0.085, 0.93, 0.0), V(s * 0.11, 0.89, 0.005), 0.011, b)); add("femur", ends(V(s * 0.085, 0.93, 0.0), 0, 0.02)); add("femur", ends(V(s * 0.122, 0.895, 0.0), 0, 0.014));
      add("femur", limb(V(s * 0.085, 0.52, 0.005), V(s * 0.115, 0.52, 0.005), 0.018, b));
      const pat = new THREE.Mesh(blob(0.017, 1, 1.2, 0.5), b); pat.position.set(s * 0.1, 0.52, 0.035); add("patella", pat);
      add("leg", limb(V(s * 0.1, 0.5, 0.005), V(s * 0.11, 0.09, -0.015), 0.012, b)); add("leg", limb(V(s * 0.12, 0.49, -0.005), V(s * 0.125, 0.09, -0.02), 0.006, b));
      add("leg", limb(V(s * 0.11, 0.06, -0.035), V(s * 0.12, 0.035, 0.11), 0.012, b));
    }

    // ---------- muscular (hidden at first) ----------
    const mus = (c = "#c8463c") => mat(c, { detail: "fibre", repeat: 1, bump: 1.2, roughness: 0.5, clearcoat: 0.35 });
    const M = mus(), tendon = mat("#efe6d6", { detail: "fibre", repeat: 1, bump: 0.4 });
    for (const s of L) {
      add("scm", taper([V(s * 0.06, 1.665, -0.015), V(s * 0.05, 1.6, 0.02), V(s * 0.025, 1.49, 0.06)], 0.012, 0.009, M, 32));
      const del = new THREE.Mesh(blob(0.05, 0.75, 1.2, 0.95, (v) => { if (v.y < 0) { v.x *= 1 + v.y * 4; v.z *= 1 + v.y * 4; } }), M); del.position.set(s * 0.19, 1.39, 0); del.rotation.z = s * 0.25; add("deltoid", del);
      const pec = new THREE.Mesh(blob(0.08, 1, 0.75, 0.22, (v) => { if (v.x * s > 0.03) v.y *= 1 - (v.x * s - 0.03) * 8; }), M); pec.position.set(s * 0.085, 1.37, 0.075); pec.rotation.set(-0.1, s * 0.3, s * -0.2); add("pectoralis", pec);
      const bic = new THREE.Mesh(blob(0.026, 0.95, 3.6, 1, (v) => { const t = 1 - Math.abs(v.y) / 0.094; v.x *= 0.4 + 0.6 * t; v.z *= 0.4 + 0.6 * t; }), M); bic.position.set(s * 0.215, 1.27, 0.03); bic.rotation.z = s * 0.23; add("biceps", bic);
      for (let i = 0; i < 4; i++) { const seg = box(0.045, 0.058, 0.014, M, 0.006); seg.position.set(s * 0.027, 1.17 - i * 0.065, 0.085 + (i > 2 ? -0.008 : 0)); add("rectus", seg); }
      const quad = new THREE.Mesh(blob(0.06, 1, 3.4, 0.9, (v) => { const t = 1 - Math.abs(v.y) / 0.2; v.x *= 0.35 + 0.65 * t; v.z *= 0.35 + 0.65 * t; }), M); quad.position.set(s * 0.1, 0.72, 0.035); quad.rotation.z = s * -0.04; add("quadriceps", quad);
      add("quadriceps", limb(V(s * 0.1, 0.54, 0.04), V(s * 0.1, 0.45, 0.03), 0.008, tendon));
      for (const h of [-1, 1]) { const g = new THREE.Mesh(blob(0.03, 1, 3, 1.1, (v) => { if (v.y < 0) { v.x *= 1 + v.y * 6; } }), M); g.position.set(s * 0.1 + h * 0.016, 0.38, -0.04); add("gastrocnemius", g); }
      add("gastrocnemius", limb(V(s * 0.105, 0.28, -0.045), V(s * 0.11, 0.06, -0.05), 0.006, tendon));
    }
    add("rectus", limb(V(0, 1.24, 0.088), V(0, 0.9, 0.06), 0.003, tendon));   // linea alba

    // ---------- nervous ----------
    const brainMat = mat("#f2b4c4", { detail: "fold", repeat: 3, bump: 2.2, roughness: 0.55 });
    for (const s of L) {
      const g = blob(0.075, 0.82, 0.8, 1.15, (v) => { const n = Math.sin(v.x * 140) * Math.sin(v.y * 150) * Math.sin(v.z * 130) + 0.5 * Math.sin(v.x * 260 + v.z * 200) * Math.sin(v.y * 240); v.multiplyScalar(1 + n * 0.03); if (v.x * s < 0) v.x *= 0.45; }, 128);
      const m = new THREE.Mesh(g, brainMat); m.position.set(s * 0.034, 1.75, 0.005); add("cerebrum", m);
    }
    const cbMat = mat("#e89cb0", { detail: "fold", repeat: 6, bump: 2.5, roughness: 0.55 });
    const cere = new THREE.Mesh(blob(0.04, 1.4, 0.68, 0.9, (v) => { v.y += Math.sin(v.y * 600) * 0.0015; }, 96), cbMat); cere.position.set(0, 1.675, -0.06); add("cerebellum", cere);
    add("brainstem", taper([V(0, 1.72, -0.01), V(0, 1.68, -0.025), V(0, 1.64, -0.035), V(0, 1.6, -0.04)], 0.016, 0.009, mat("#f0c3a0"), 24));
    const nerveMat = mat("#ffe066", { detail: "none", emissive: new THREE.Color("#4a3c00") });
    const cordPts = [V(0, 1.6, -0.04), ...spinePts.slice().reverse().filter((p) => p.y < 1.59 && p.y > 1.0).map((p) => V(0, p.y, p.z - 0.002))];
    add("spinalCord", tube(cordPts, 0.0075, nerveMat, 96));
    const plexus = [], sciatic = [];
    for (const s of L) {
      const ax = V(s * 0.165, 1.4, -0.01);
      for (let r = 0; r < 4; r++) plexus.push([V(0, 1.53 - r * 0.02, -0.05), V(s * 0.06, 1.48 - r * 0.012, -0.03), ax]);
      plexus.push([ax, V(s * 0.22, 1.28, 0.015), V(s * 0.25, 1.12, 0.02), V(s * 0.265, 0.95, 0.045), V(s * 0.272, 0.86, 0.05)]);     // median
      plexus.push([ax, V(s * 0.2, 1.28, -0.015), V(s * 0.235, 1.15, -0.03), V(s * 0.255, 1.0, 0.01), V(s * 0.285, 0.86, 0.045)]);   // ulnar
      plexus.push([ax, V(s * 0.21, 1.33, -0.035), V(s * 0.245, 1.24, -0.03), V(s * 0.25, 1.14, 0.0), V(s * 0.26, 0.95, 0.04)]);    // radial
      sciatic.push([V(s * 0.03, 0.97, -0.075), V(s * 0.08, 0.9, -0.07), V(s * 0.1, 0.75, -0.045), V(s * 0.1, 0.55, -0.04)]);
      sciatic.push([V(s * 0.1, 0.55, -0.04), V(s * 0.1, 0.35, -0.045), V(s * 0.105, 0.12, -0.035)]);                                  // tibial
      sciatic.push([V(s * 0.1, 0.55, -0.04), V(s * 0.125, 0.47, -0.015), V(s * 0.125, 0.43, 0.01), V(s * 0.115, 0.2, 0.025)]);     // common fibular
    }
    plexus.forEach((p) => add("brachialPlexus", tube(p, 0.0038, nerveMat, 48)));
    sciatic.forEach((p, i) => add("sciatic", tube(p, i % 3 === 0 ? 0.0065 : 0.0045, nerveMat, 48)));
    const vagusPaths = L.map((s) => [V(s * 0.02, 1.64, -0.025), V(s * 0.04, 1.56, 0.0), V(s * 0.035, 1.45, -0.01), V(s * 0.02, 1.3, -0.035), V(s * 0.01, 1.2, -0.025), V(0.03, 1.15, 0.0)]);
    vagusPaths.push([V(0.035, 1.47, -0.01), V(0.03, 1.425, -0.03), V(0.015, 1.425, -0.04), V(0.012, 1.48, -0.01), V(0.02, 1.57, 0.02)]);   // left recurrent laryngeal, under the arch
    vagusPaths.forEach((p) => add("vagus", tube(p, 0.003, nerveMat, 48)));

    // ---------- cardiovascular ----------
    const myo = mat("#b3202f", { detail: "fibre", repeat: 2, bump: 0.6 }), atrMat = mat("#c93a48"), artMat = mat("#ff4d6d", { detail: "none" }), veinMat = mat("#4f6bff", { detail: "none" });
    const heart = new THREE.Group(); heart.position.set(0.02, 1.3, 0.03); heart.rotation.set(0.2, 0, -0.5);
    heart.add(new THREE.Mesh(blob(0.058, 1, 1.15, 0.9, (v) => { if (v.y < 0) { const q = 1 + v.y * 9; v.x *= q; v.z *= q; } if (v.y > 0.02) v.x += Math.sign(v.x) * 0.008; v.z += Math.sin(v.x * 60) * 0.002; }), myo));
    for (const [x, y, z, r, m] of [[-0.035, 0.045, 0.005, 0.03, atrMat], [0.03, 0.05, -0.025, 0.028, atrMat], [-0.04, 0.055, 0.03, 0.014, atrMat], [0.045, 0.045, 0.02, 0.013, atrMat]]) { const a = new THREE.Mesh(blob(r, 1, 0.85, 0.9), m); a.position.set(x, y, z); heart.add(a); }
    add("heart", heart);
    const cor = new THREE.Group(); cor.position.copy(heart.position); cor.rotation.copy(heart.rotation);
    const corMat = mat("#ff7a6b", { detail: "none", emissive: new THREE.Color("#401010") });
    for (const p of [[V(0.0, 0.05, 0.05), V(0.005, 0.02, 0.055), V(0.01, -0.02, 0.05), V(0.012, -0.055, 0.03), V(0.01, -0.075, 0.01)],   // LAD
      [V(0.0, 0.05, 0.05), V(0.03, 0.04, 0.035), V(0.05, 0.02, 0.0), V(0.045, 0.01, -0.035)],                                             // circumflex
      [V(-0.01, 0.05, 0.05), V(-0.04, 0.03, 0.045), V(-0.058, 0.0, 0.01), V(-0.05, -0.02, -0.03), V(-0.02, -0.03, -0.05)]])                // RCA
      cor.add(tube(p, 0.0032, corMat, 32));
    add("coronaries", cor);
    const aortaPts = [V(0.008, 1.34, 0.04), V(0.004, 1.42, 0.03), V(0.008, 1.46, 0.0), V(0.02, 1.445, -0.035), V(0.02, 1.38, -0.05), V(0.015, 1.22, -0.05), V(0.008, 1.06, -0.04), V(0, 0.98, -0.03)];
    add("aorta", taper(aortaPts, 0.014, 0.01, artMat, 96));
    const visceral = [[V(0.012, 1.13, -0.045), V(0.012, 1.13, -0.015), V(0.03, 1.13, 0.0)], [V(0.01, 1.1, -0.045), V(0.01, 1.08, -0.01), V(0.0, 1.0, 0.03)], ...L.map((s) => [V(0.01, 1.08, -0.045), V(s * 0.04, 1.08, -0.05), V(s * 0.065, 1.08, -0.055)])];
    visceral.forEach((p) => add("aorta", tube(p, 0.004, artMat, 16)));
    const carotids = [[V(-0.028, 1.49, 0.01), V(-0.03, 1.56, 0.02), V(-0.032, 1.6, 0.02), V(-0.03, 1.66, 0.0)], [V(0.01, 1.46, 0.0), V(0.03, 1.53, 0.02), V(0.032, 1.6, 0.02), V(0.03, 1.66, 0.0)], [V(0.004, 1.455, 0.012), V(-0.015, 1.475, 0.012), V(-0.028, 1.49, 0.01)]];
    carotids.forEach((p, i) => add("carotids", tube(p, i === 2 ? 0.007 : 0.0055, artMat, 32)));
    for (const s of L) for (const p of [[V(s * 0.035, 1.6, 0.02), V(s * 0.05, 1.63, 0.04), V(s * 0.055, 1.68, 0.05)], [V(s * 0.03, 1.6, 0.015), V(s * 0.03, 1.68, -0.01)]]) add("carotids", tube(p, 0.003, artMat, 16));
    const limbArt = [];
    for (const s of L) {
      const start = s < 0 ? V(-0.028, 1.49, 0.01) : V(0.022, 1.455, -0.02);
      limbArt.push([start, V(s * 0.08, 1.485, 0.0), V(s * 0.17, 1.41, 0.0), V(s * 0.215, 1.27, 0.005), V(s * 0.248, 1.13, 0.01)]);
      limbArt.push([V(s * 0.248, 1.13, 0.01), V(s * 0.262, 1.0, 0.04), V(s * 0.27, 0.9, 0.05)]);
      limbArt.push([V(s * 0.248, 1.13, 0.01), V(s * 0.27, 1.0, 0.03), V(s * 0.285, 0.9, 0.04)]);
      limbArt.push([V(0, 0.98, -0.03), V(s * 0.045, 0.94, -0.01), V(s * 0.08, 0.89, 0.035), V(s * 0.095, 0.75, 0.03), V(s * 0.1, 0.6, 0.0), V(s * 0.1, 0.5, -0.03), V(s * 0.105, 0.3, -0.03), V(s * 0.108, 0.1, -0.015)]);
    }
    limbArt.forEach((p, i) => add("limbArteries", tube(p, i % 4 === 3 ? 0.0065 : 0.0045, artMat, 64)));
    const veins = [[V(-0.022, 1.46, 0.005), V(-0.024, 1.4, 0.02), V(-0.025, 1.36, 0.02)], [V(-0.024, 1.26, 0.02), V(-0.022, 1.12, -0.03), V(-0.018, 1.0, -0.03), V(-0.012, 0.97, -0.025)],
      ...L.map((s) => [V(-0.012, 0.97, -0.025), V(s * 0.045, 0.93, -0.005), V(s * 0.075, 0.89, 0.04), V(s * 0.085, 0.72, 0.035), V(s * 0.093, 0.5, -0.02), V(s * 0.098, 0.12, -0.005)]),
      ...L.map((s) => [V(-0.022, 1.46, 0.005), V(s * 0.06, 1.48, 0.01), V(s * 0.16, 1.42, 0.01), V(s * 0.21, 1.28, -0.005), V(s * 0.245, 1.13, -0.005), V(s * 0.275, 0.88, 0.04)])];
    veins.forEach((p, i) => add("venaeCavae", tube(p, i < 2 ? 0.011 : 0.0055, veinMat, 48)));
    const jug = L.map((s) => [V(s * 0.035, 1.47, 0.01), V(s * 0.045, 1.55, 0.025), V(s * 0.045, 1.61, 0.02), V(s * 0.04, 1.66, -0.01)]);
    jug.forEach((p) => add("jugular", tube(p, 0.0065, veinMat, 32)));
    const pulmMat = mat("#5d7bff", { detail: "none" });
    add("pulmonaryTrunk", tube([V(-0.005, 1.33, 0.065), V(0.01, 1.38, 0.055), V(0.02, 1.405, 0.03)], 0.011, pulmMat, 24));
    for (const s of L) add("pulmonaryTrunk", tube([V(0.02, 1.405, 0.03), V(s * 0.04 + 0.01, 1.4, 0.0), V(s * 0.08, 1.37, -0.01)], 0.0075, pulmMat, 24));

    // ---------- respiratory ----------
    const airMat = mat("#9fd8ff", { detail: "none", roughness: 0.35 });
    const thy = new THREE.Group(); thy.position.set(0, 1.6, 0.045);
    for (const s of L) { const plate = box(0.026, 0.024, 0.003, cart, 0.002); plate.position.set(s * 0.011, 0, 0.0); plate.rotation.y = s * 0.55; thy.add(plate); }
    const cric = new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.004, 12, 32), cart); cric.rotation.x = Math.PI / 2; cric.position.set(0, -0.022, -0.012); thy.add(cric);
    const epi = new THREE.Mesh(blob(0.012, 0.9, 1.3, 0.25), cart); epi.position.set(0, 0.022, -0.012); epi.rotation.x = -0.3; thy.add(epi);
    add("larynx", thy);
    add("trachea", tube([V(0, 1.575, 0.035), V(0, 1.5, 0.03), V(0, 1.43, 0.02)], 0.0095, airMat, 24));
    for (let i = 0; i < 12; i++) { const r = new THREE.Mesh(new THREE.TorusGeometry(0.0105, 0.0022, 8, 28, Math.PI * 1.6), cart); r.rotation.set(Math.PI / 2, 0, Math.PI * 0.7); r.position.set(0, 1.57 - i * 0.012, 0.035 - i * 0.0013); add("trachea", r); }
    for (const s of L) add("trachea", tube([V(0, 1.43, 0.02), V(s * 0.03, 1.405, 0.01), V(s * 0.065, 1.36, 0.0), V(s * 0.08, 1.33, -0.01)], s < 0 ? 0.0078 : 0.0068, airMat, 24));
    const lungs = {};
    for (const s of L) {
      const lung = blob(0.1, s > 0 ? 0.68 : 0.78, 1.45, 0.78, (v) => {
        if (v.x * s < 0) v.x *= 0.45;
        if (s > 0 && v.x < 0.01 && v.y < -0.02 && v.z > 0) v.x += 0.02;
        if (v.y < -0.1) v.y = -0.1 + (v.y + 0.1) * 0.4;
      }, 96);
      const lMat = mat(s < 0 ? "#f39aac" : "#ef93a6", { detail: "tissue", repeat: 6, bump: 0.8, roughness: 0.6, sheen: 0.6 });
      const g = new THREE.Group(); g.position.set(s * 0.085, 1.31, -0.005);
      const oblN = V(0, 0.14, 0.18).normalize(), oblP = V(0, -0.03, 0);
      g.add(new THREE.Mesh(slice(lung, [[oblP, oblN.clone().negate()]]), lMat));                                 // lower lobe
      if (s < 0) {
        g.add(new THREE.Mesh(slice(lung, [[oblP, oblN], [V(0, -0.015, 0), V(0, 1, 0)]]), lMat));                 // right upper
        g.add(new THREE.Mesh(slice(lung, [[oblP, oblN], [V(0, -0.015, 0), V(0, -1, 0)]]), lMat.clone()));        // right middle
      } else g.add(new THREE.Mesh(slice(lung, [[oblP, oblN]]), lMat));                                           // left upper
      add(s < 0 ? "rightLung" : "leftLung", g); lungs[s] = g;
    }
    const diaMat = mus("#b8483f"); diaMat.transparent = true; diaMat.opacity = 0.82; diaMat.side = THREE.DoubleSide;
    for (const s of L) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.12, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.42), diaMat); d.scale.set(0.95, 0.42, 0.7); d.position.set(s * 0.06, 1.17 + (s < 0 ? 0.012 : 0), -0.01); add("diaphragm", d); }

    // ---------- digestive ----------
    add("oesophagus", tube([V(0, 1.585, 0.01), V(0.0, 1.45, 0.0), V(0.008, 1.3, -0.025), V(0.02, 1.2, -0.005), V(0.04, 1.17, 0.01)], 0.0075, mat("#e08f7a", { detail: "none" }), 64));
    const stomach = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V(0.04, 1.17, 0.01), V(0.075, 1.19, 0.02), V(0.1, 1.15, 0.035), V(0.095, 1.1, 0.05), V(0.06, 1.075, 0.055), V(0.02, 1.08, 0.05), V(-0.015, 1.095, 0.04)]), 64, 1, 24), mat("#f2a07b", { detail: "fold", repeat: 4, bump: 0.6 }));
    { const p = stomach.geometry.attributes.position, cur = new THREE.CatmullRomCurve3([V(0.04, 1.17, 0.01), V(0.075, 1.19, 0.02), V(0.1, 1.15, 0.035), V(0.095, 1.1, 0.05), V(0.06, 1.075, 0.055), V(0.02, 1.08, 0.05), V(-0.015, 1.095, 0.04)]), c = new THREE.Vector3(), v = new THREE.Vector3();
      for (let i = 0; i <= 64; i++) { const t = i / 64, r = 0.012 + 0.03 * Math.sin(Math.min(1, t * 1.25) * Math.PI) ** 0.7 * (1 - t * 0.35); cur.getPointAt(t, c); for (let j = 0; j <= 24; j++) { const q = i * 25 + j; v.fromBufferAttribute(p, q).sub(c).multiplyScalar(r).add(c); p.setXYZ(q, v.x, v.y, v.z); } }
      stomach.geometry.computeVertexNormals(); }
    add("stomach", stomach);
    const liver = new THREE.Mesh(blob(0.1, 1.25, 0.55, 0.75, (v) => { if (v.x > 0) v.y *= 1 - v.x * 3; if (v.y < -0.02) v.y += Math.sin(v.x * 40) * 0.004; }, 96), mat("#7d2626", { roughness: 0.3, clearcoat: 0.9 }));
    liver.position.set(-0.05, 1.16, 0.02); liver.rotation.z = 0.15; add("liver", liver);
    const gb = new THREE.Mesh(blob(0.014, 1, 1.9, 1, (v) => { if (v.y > 0) v.x *= 1 - v.y * 12; }), mat("#4f8f3a", { roughness: 0.3, clearcoat: 1, transmission: 0.1 })); gb.position.set(-0.075, 1.105, 0.065); gb.rotation.z = -0.5; add("gallbladder", gb);
    const pancreas = new THREE.Mesh(blob(0.06, 1.3, 0.25, 0.3, (v) => { v.y += Math.sin(v.x * 120) * 0.002; v.z += Math.sin(v.x * 90 + 1) * 0.002; }), mat("#f6d38a", { detail: "fold", repeat: 8, bump: 1 })); pancreas.position.set(0.02, 1.08, -0.015); pancreas.rotation.z = 0.25; add("pancreas", pancreas);
    const smallMat = mat("#f2b0a0", { detail: "tissue", repeat: 8 });
    add("smallIntestine", tube([V(-0.015, 1.095, 0.04), V(-0.04, 1.09, 0.02), V(-0.045, 1.05, 0.01), V(-0.02, 1.035, 0.0), V(0.01, 1.05, 0.0), V(0.03, 1.05, 0.02)], 0.011, smallMat, 48));   // duodenal C-loop
    const coils = []; for (let i = 0; i <= 200; i++) { const t = i / 200; coils.push(V(Math.sin(t * 34) * 0.075 * (1 - Math.abs(t - 0.5) * 0.9) + Math.sin(t * 7) * 0.015, 1.05 - t * 0.13 + Math.sin(t * 23) * 0.012, 0.05 + Math.cos(t * 19) * 0.022)); }
    coils[0] = V(0.03, 1.05, 0.02); coils.push(V(-0.08, 0.93, 0.04), V(-0.095, 0.94, 0.035));
    add("smallIntestine", tube(coils, 0.0085, smallMat, 900));
    const colonPts = [V(-0.1, 0.925, 0.03), V(-0.11, 1.0, 0.035), V(-0.105, 1.08, 0.03), V(-0.05, 1.095, 0.065), V(0.05, 1.095, 0.065), V(0.105, 1.08, 0.03), V(0.11, 0.98, 0.03), V(0.08, 0.92, 0.03), V(0.03, 0.9, 0.04), V(0.005, 0.89, -0.02), V(0.0, 0.86, -0.04)];
    const colon = tube(colonPts, 0.017, mat("#e2887a", { detail: "fold", repeat: 1, bump: 0.8 }), 160, false, 16);
    { const p = colon.geometry.attributes.position, cur = new THREE.CatmullRomCurve3(colonPts), c = new THREE.Vector3(), v = new THREE.Vector3();   // haustra: the colon's pouches
      for (let i = 0; i <= 160; i++) { const t = i / 160, r = 1 + 0.18 * Math.sin(t * Math.PI * 52) ** 2 - 0.1; cur.getPointAt(t, c); for (let j = 0; j <= 16; j++) { const q = i * 17 + j; v.fromBufferAttribute(p, q).sub(c).multiplyScalar(r).add(c); p.setXYZ(q, v.x, v.y, v.z); } }
      colon.geometry.computeVertexNormals(); }
    add("colon", colon);
    add("appendix", taper([V(-0.1, 0.925, 0.03), V(-0.095, 0.9, 0.035), V(-0.085, 0.885, 0.03), V(-0.08, 0.875, 0.02)], 0.004, 0.003, mat("#e8907e", { detail: "none" }), 24));

    // ---------- urinary ----------
    const kidMat = mat("#9a4a36", { roughness: 0.3, clearcoat: 0.9 });
    const ureters = [];
    for (const s of L) {
      const kid = new THREE.Mesh(blob(0.032, 0.8, 1.7, 0.75, (v) => { if (v.x * s < -0.012) v.x *= 0.6; }), kidMat); kid.position.set(s * 0.075, s < 0 ? 1.07 : 1.09, -0.055); kid.rotation.z = s * 0.2; add("kidneys", kid);
      ureters.push([V(s * 0.062, s < 0 ? 1.055 : 1.075, -0.045), V(s * 0.058, 0.98, -0.035), V(s * 0.055, 0.94, -0.03), V(s * 0.035, 0.905, 0.0), V(s * 0.012, 0.9, 0.012)]);
    }
    ureters.forEach((p) => add("ureters", tube(p, 0.0032, mat("#c79bff", { detail: "none" }), 32)));
    const bladder = new THREE.Mesh(blob(0.034, 1.1, 0.9, 1, null, 64), mat("#d9b8ff", { transmission: 0.25, thickness: 0.03, roughness: 0.25 })); bladder.position.set(0, 0.9, 0.025); add("bladder", bladder);

    // ---------- endocrine ----------
    const endo = mat("#4fe0a6", { detail: "tissue", repeat: 4, emissive: new THREE.Color("#0a3a28") });
    const pit = new THREE.Mesh(blob(0.007, 1.2, 1, 1), endo); pit.position.set(0, 1.705, 0.02); add("pituitary", pit);
    add("pituitary", limb(V(0, 1.712, 0.02), V(0, 1.725, 0.015), 0.0018, endo));
    for (const s of L) { const lobe = new THREE.Mesh(blob(0.012, 0.8, 1.9, 0.75), endo); lobe.position.set(s * 0.015, 1.545, 0.038); lobe.rotation.z = s * -0.2; add("thyroid", lobe); }
    add("thyroid", limb(V(-0.012, 1.538, 0.046), V(0.012, 1.538, 0.046), 0.005, endo));
    for (const s of L) { const ad = new THREE.Mesh(new THREE.ConeGeometry(0.016, 0.022, 3), endo); ad.position.set(s * 0.07, (s < 0 ? 1.07 : 1.09) + 0.06, -0.055); ad.rotation.z = s * 0.25; add("adrenals", ad); }

    // ---------- lymphatic ----------
    const lym = mat("#7ee0ff", { detail: "tissue", repeat: 4, emissive: new THREE.Color("#0a3240"), roughness: 0.3 });
    const spleen = new THREE.Mesh(blob(0.03, 0.7, 1.4, 1.1, (v) => { if (v.x < 0) v.x *= 0.5; v.y += Math.sin(v.z * 120) * 0.002; }), mat("#6b2a4a", { roughness: 0.3, clearcoat: 0.9 })); spleen.position.set(0.125, 1.13, -0.045); spleen.rotation.z = -0.4; add("spleen", spleen);
    const thymus = new THREE.Mesh(blob(0.025, 1, 1.6, 0.4, (v) => { if (v.y < 0) v.x *= 1.3; }), mat("#f7c7a6", { detail: "tissue", repeat: 6 })); thymus.position.set(0, 1.42, 0.06); add("thymus", thymus);
    const nodeAt = [];
    for (const s of L) for (const [x, y, z] of [[0.05, 1.58, 0.01], [0.055, 1.55, 0.015], [0.06, 1.52, 0.01], [0.15, 1.39, 0.0], [0.155, 1.37, -0.015], [0.14, 1.36, 0.01], [0.075, 0.9, 0.05], [0.085, 0.885, 0.045], [0.09, 0.9, 0.04]]) nodeAt.push(V(s * x, y, z));
    for (const [x, y, z] of [[0.0, 1.0, 0.0], [0.02, 0.99, -0.005], [-0.02, 1.01, 0.0], [0.0, 1.32, -0.03], [0.015, 1.4, -0.02]]) nodeAt.push(V(x, y, z));
    for (const p of nodeAt) { const n = new THREE.Mesh(blob(0.0055, 1, 0.7, 0.8), lym); n.position.copy(p); add("lymphNodes", n); }
    add("lymphNodes", tube([V(0, 1.05, -0.05), V(0.005, 1.2, -0.055), V(0.008, 1.4, -0.055), V(0.03, 1.48, -0.02), V(0.045, 1.49, 0.01)], 0.0022, lym, 48));

    // ---------- motion ----------
    const art = [aortaPts, ...carotids, ...limbArt];
    k.flow(art, "#ff9fb2", 220, 0.22, "cardiovascular");
    k.flow(veins.concat(jug), "#9fb4ff", 120, 0.14, "cardiovascular");
    k.flow([cordPts, ...plexus, ...sciatic, ...vagusPaths], "#fff3a0", 90, 0.5, "nervous", 0.009);
    k.tick((t, dt, motion) => {
      if (!motion) return;
      // heartbeat: a quick double pump about once a second; breathing: slow and deep
      const beat = 1 + Math.max(0, Math.sin(t * 7.5)) ** 8 * 0.08 + Math.max(0, Math.sin(t * 7.5 - 1.2)) ** 8 * 0.045;
      heart.scale.setScalar(beat); cor.scale.setScalar(beat);
      const br = Math.sin(t * 1.3) * 0.035;
      for (const g of Object.values(lungs)) g.scale.set(1 + br * 0.6, 1 + br, 1 + br * 0.8);
    });
  },
};
