// MedGradify's 3D anatomy model: a holographic body you can turn, zoom and look inside.
// Built in code with three.js (kit/vendor/three): a glowing skin, the skeleton, and organs of
// six systems. The heart beats, the lungs breathe, blood flows through the vessels and impulses
// travel along the nerves. Click a structure to learn about it, make flashcards from it, or find
// it in your own notes. Systems can be shown or hidden, the skin faded to an X-ray, the organs
// pulled apart, and there's a quiz that asks you to find structures.
//   import { mountAnatomy } from "../kit/anatomy/anatomy.js"; mountAnatomy(document.querySelector("#anatomy"), "MedGradify");
import * as THREE from "../vendor/three/three.module.min.js";
import { OrbitControls } from "../vendor/three/OrbitControls.js";
import { SYSTEMS, STRUCTURES } from "./anatomy-data.js";
import { LocalStore, CloudStore, scopeToSite } from "../data/store.js";

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

// ---------- materials ----------
// the skin: a hologram that glows at its edges (fresnel), so you see through it to the organs
function skinMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uOpacity: { value: 0.55 }, uBase: { value: new THREE.Color("#0d3b52") }, uRim: { value: new THREE.Color("#5ef0ff") }, uTime: { value: 0 } },
    vertexShader: `varying vec3 vN; varying vec3 vV; varying float vY;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); vY = (modelMatrix*vec4(position,1.0)).y; gl_Position = projectionMatrix*mv; }`,
    fragmentShader: `uniform float uOpacity; uniform vec3 uBase; uniform vec3 uRim; uniform float uTime; varying vec3 vN; varying vec3 vV; varying float vY;
      void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.4);
        float scan = smoothstep(0.035, 0.0, abs(vY - (0.95 + 0.9*sin(uTime*0.45))));       // a scan line moving up and down
        float lines = 0.5 + 0.5*sin(vY*260.0);                                             // faint horizontal scan lines
        vec3 c = mix(uBase, uRim, f) * 1.35 + uRim*scan*0.8;
        gl_FragColor = vec4(c, uOpacity*(0.08 + f*1.25 + scan*0.5) * (0.85 + 0.15*lines)); }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.FrontSide,
  });
}
const organMat = (c, extra = {}) => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.38, metalness: 0.05, clearcoat: 0.7, clearcoatRoughness: 0.3, emissive: new THREE.Color(c).multiplyScalar(0.12), ...extra });
const boneMat = () => new THREE.MeshStandardMaterial({ color: "#ece5d2", roughness: 0.55, metalness: 0.02, emissive: new THREE.Color("#2a261c") });

// ---------- geometry helpers ----------
// a capsule (or cylinder) from a to b
function limb(a, b, r, mat, capsule = true) {
  const len = a.distanceTo(b);
  const geo = capsule ? new THREE.CapsuleGeometry(r, Math.max(0.001, len - 2 * r), 8, 20) : new THREE.CylinderGeometry(r, r * 0.9, len, 16);
  const m = new THREE.Mesh(geo, mat);
  m.position.copy(a).lerp(b, 0.5);
  m.quaternion.setFromUnitVectors(V(0, 1, 0), b.clone().sub(a).normalize());
  return m;
}
const tube = (pts, r, mat, seg = 64, closed = false) => new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, closed), seg, r, 10, closed), mat);
// a sphere with its vertices moved by a function (for organ shapes)
function blob(r, sx, sy, sz, shape, seg = 48) {
  const g = new THREE.SphereGeometry(r, seg, seg), p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); v.set(v.x * sx, v.y * sy, v.z * sz); if (shape) shape(v); p.setXYZ(i, v.x, v.y, v.z); }
  g.computeVertexNormals();
  return g;
}

export async function mountAnatomy(root, siteName = "MedGradify") {
  root.innerHTML = `
    <div class="an-stage">
      <canvas class="an-canvas" aria-label="3D anatomy model. Drag to turn, scroll or pinch to zoom, click a structure to learn about it."></canvas>
      <div class="an-labels" aria-hidden="true"></div>
      <div class="an-top">
        <div class="an-systems" role="group" aria-label="Systems">${Object.entries(SYSTEMS).map(([k, s]) => `<button type="button" class="an-sys on" data-sys="${k}" aria-pressed="true" style="--c:${s.c}"><i></i>${s.name}</button>`).join("")}</div>
      </div>
      <div class="an-quizbar" hidden><span class="an-q"></span><span class="an-score"></span><button type="button" class="an-quit">End quiz</button></div>
      <div class="an-views"><button type="button" data-view="front">Front</button><button type="button" data-view="side">Side</button><button type="button" data-view="back">Back</button><button type="button" data-view="head">Head</button><button type="button" data-view="chest">Chest</button><button type="button" data-view="abdomen">Abdomen</button></div>
      <p class="an-hint">Drag to turn · scroll or pinch to zoom · click a structure</p>
    </div>
    <aside class="an-side">
      <div class="an-controls">
        <label><span>Skin</span><input type="range" min="0" max="100" value="55" data-ctl="skin" aria-label="Skin opacity"></label>
        <label><span>Pull apart</span><input type="range" min="0" max="100" value="0" data-ctl="explode" aria-label="Pull the organs apart"></label>
        <div class="an-toggles">
          <label class="switch"><input type="checkbox" data-ctl="motion" role="switch" ${reduce ? "" : "checked"}><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span><span>Heartbeat, breathing and flow</span></label>
          <label class="switch"><input type="checkbox" data-ctl="labels" role="switch"><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span><span>Labels</span></label>
          <label class="switch"><input type="checkbox" data-ctl="spin" role="switch"><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span><span>Turn slowly</span></label>
        </div>
        <button type="button" class="btn btn-light lg btn-sm an-quiz"><span>Quiz me: find the structure</span></button>
      </div>
      <div class="an-info" aria-live="polite"></div>
    </aside>`;
  const $ = (s) => root.querySelector(s);
  const canvas = $(".an-canvas"), stage = $(".an-stage");

  // ---------- scene ----------
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 50);
  camera.position.set(0.8, 1.0, 3.6);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0.9, 0);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.35; controls.maxDistance = 5.5;
  controls.maxPolarAngle = Math.PI * 0.92;

  scene.add(new THREE.HemisphereLight("#bfe6ff", "#1a1022", 0.9));
  const key = new THREE.DirectionalLight("#ffffff", 2.2); key.position.set(1.5, 3, 2.5); scene.add(key);
  const rimA = new THREE.PointLight("#5ef0ff", 6, 6); rimA.position.set(-1.6, 1.6, -1.2); scene.add(rimA);
  const rimB = new THREE.PointLight("#f055dd", 4, 6); rimB.position.set(1.6, 0.6, -1.4); scene.add(rimB);

  // the platform: glowing rings under the feet
  const platform = new THREE.Group();
  for (const [r, w, o] of [[0.55, 0.012, 0.9], [0.7, 0.006, 0.5], [0.9, 0.004, 0.3]]) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(r - w, r + w, 128), new THREE.MeshBasicMaterial({ color: "#5ef0ff", transparent: true, opacity: o, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; platform.add(ring);
  }
  const disc = new THREE.Mesh(new THREE.CircleGeometry(0.55, 96), new THREE.MeshBasicMaterial({ color: "#0b3a4a", transparent: true, opacity: 0.35 }));
  disc.rotation.x = -Math.PI / 2; platform.add(disc);
  scene.add(platform);

  // ---------- the body ----------
  const body = new THREE.Group(); scene.add(body);
  const groups = {}; for (const k of Object.keys(SYSTEMS)) { groups[k] = new THREE.Group(); body.add(groups[k]); }
  const pickables = [], parts = {};   // id → { meshes, centre, home }
  function add(id, mesh, sys) {
    mesh.userData.id = id;
    (parts[id] ||= { id, meshes: [] }).meshes.push(mesh);
    groups[sys].add(mesh); pickables.push(mesh);
    return mesh;
  }

  // skin
  const skinMat = skinMaterial(), skin = new THREE.Group();
  const torsoProfile = [[0.0, 0.92], [0.13, 0.93], [0.16, 0.98], [0.15, 1.05], [0.135, 1.13], [0.145, 1.22], [0.165, 1.32], [0.18, 1.4], [0.17, 1.45], [0.1, 1.49], [0.05, 1.52], [0.0, 1.52]].map(([r, y]) => new THREE.Vector2(r, y));
  const torso = new THREE.Mesh(new THREE.LatheGeometry(torsoProfile, 64), skinMat); torso.scale.set(1, 1, 0.62); skin.add(torso);
  skin.add(limb(V(0, 1.5, 0), V(0, 1.6, 0), 0.05, skinMat));
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 48, 48), skinMat); head.scale.set(0.9, 1.15, 1.02); head.position.set(0, 1.71, 0.005); skin.add(head);
  for (const s of [-1, 1]) {
    skin.add(limb(V(s * 0.18, 1.42, 0), V(s * 0.24, 1.15, -0.01), 0.045, skinMat));
    skin.add(limb(V(s * 0.24, 1.15, -0.01), V(s * 0.27, 0.9, 0.04), 0.036, skinMat));
    skin.add(limb(V(s * 0.27, 0.9, 0.04), V(s * 0.275, 0.8, 0.05), 0.03, skinMat));
    skin.add(limb(V(s * 0.09, 0.95, 0), V(s * 0.1, 0.52, 0.005), 0.075, skinMat));
    skin.add(limb(V(s * 0.1, 0.52, 0.005), V(s * 0.11, 0.1, -0.015), 0.052, skinMat));
    skin.add(limb(V(s * 0.11, 0.05, -0.02), V(s * 0.12, 0.04, 0.12), 0.035, skinMat));
  }
  body.add(skin);

  // skeleton
  const bone = boneMat();
  const skull = new THREE.Mesh(blob(0.098, 0.88, 1.06, 1.0, (v) => { if (v.y < -0.02 && v.z > 0.02) v.y *= 0.8; }), bone); skull.position.set(0, 1.72, 0); add("skull", skull, "skeletal");
  add("skull", limb(V(-0.04, 1.63, 0.06), V(0.04, 1.63, 0.06), 0.012, bone), "skeletal");
  const spinePts = []; for (let i = 0; i <= 24; i++) { const y = 0.98 + i * 0.026; spinePts.push(V(0, y, -0.065 + 0.018 * Math.sin((y - 0.98) * 5.2))); }
  spinePts.slice(0, 24).forEach((p, i) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.017 - i * 0.0002, 0.019 - i * 0.0002, 0.018, 14), bone); m.position.copy(p); add("spine", m, "skeletal"); });
  for (let i = 0; i < 12; i++) {
    const y = 1.43 - i * 0.022, w = 0.105 + Math.sin((i / 11) * Math.PI) * 0.035, front = i < 7;
    for (const s of [-1, 1]) {
      const pts = []; const end = front ? 1 : i < 10 ? 0.82 : 0.55;
      for (let k = 0; k <= 12; k++) { const a = -Math.PI / 2 + (k / 12) * Math.PI * end; pts.push(V(s * Math.cos(a) * w, y - (k / 12) * 0.05 * end, Math.sin(a) * 0.075 - 0.005)); }
      add("ribs", tube(pts, 0.0055, bone, 24), "skeletal");
    }
  }
  add("ribs", limb(V(0, 1.43, 0.072), V(0, 1.27, 0.072), 0.012, bone, false), "skeletal");
  // the pelvis: two iliac wings flaring out from the sacrum, joined at the front by the pubic arch
  for (const s of [-1, 1]) {
    const wing = new THREE.Mesh(blob(0.07, 1, 0.85, 0.3, (v) => { if (v.y < 0) { v.x *= 1 + v.y * 6; } }), bone);
    wing.position.set(s * 0.075, 0.99, -0.03); wing.rotation.set(0.25, s * -0.55, s * 0.35); add("pelvis", wing, "skeletal");
  }
  add("pelvis", tube([V(-0.085, 0.93, -0.01), V(-0.06, 0.89, 0.03), V(0, 0.875, 0.05), V(0.06, 0.89, 0.03), V(0.085, 0.93, -0.01)], 0.012, bone, 32), "skeletal");
  add("pelvis", new THREE.Mesh(blob(0.035, 0.9, 1.3, 0.5), bone), "skeletal").position.set(0, 0.96, -0.07);
  for (const s of [-1, 1]) {
    add("ribs", tube([V(s * 0.02, 1.47, 0.06), V(s * 0.1, 1.48, 0.04), V(s * 0.17, 1.47, -0.01)], 0.007, bone, 16), "skeletal");
    for (const [a, b, r] of [[V(s * 0.18, 1.42, 0), V(s * 0.24, 1.16, -0.01), 0.011], [V(s * 0.24, 1.15, -0.01), V(s * 0.265, 0.91, 0.035), 0.008], [V(s * 0.25, 1.15, -0.01), V(s * 0.28, 0.91, 0.045), 0.007],
      [V(s * 0.09, 0.93, 0), V(s * 0.1, 0.53, 0.005), 0.016], [V(s * 0.1, 0.5, 0.005), V(s * 0.11, 0.09, -0.015), 0.012], [V(s * 0.12, 0.5, -0.005), V(s * 0.125, 0.1, -0.02), 0.007]])
      add("limbs", limb(a, b, r, bone), "skeletal");
  }

  // nervous: brain (folded hemispheres), spinal cord and peripheral nerves
  const brainMat = organMat("#ffb3c6", { roughness: 0.55 });
  for (const s of [-1, 1]) {
    const g = blob(0.075, 0.82, 0.8, 1.15, (v) => { const n = Math.sin(v.x * 140) * Math.sin(v.y * 150) * Math.sin(v.z * 130); v.multiplyScalar(1 + n * 0.035); });
    const m = new THREE.Mesh(g, brainMat); m.position.set(s * 0.035, 1.75, 0.005); add("brain", m, "nervous");
  }
  const cere = new THREE.Mesh(blob(0.04, 1.4, 0.7, 0.9), brainMat); cere.position.set(0, 1.67, -0.06); add("brain", cere, "nervous");
  const nerveMat = organMat("#ffe066", { emissive: new THREE.Color("#5a4a00") });
  const cordPts = [V(0, 1.68, -0.02), ...spinePts.slice().reverse().map((p) => V(0, p.y, p.z - 0.002))];
  add("spinalCord", tube(cordPts, 0.008, nerveMat, 64), "nervous");
  const nervePaths = [];
  for (const s of [-1, 1]) {
    nervePaths.push([V(0, 1.45, -0.06), V(s * 0.12, 1.43, -0.03), V(s * 0.2, 1.38, -0.01), V(s * 0.245, 1.12, 0.0), V(s * 0.27, 0.86, 0.04)]);
    nervePaths.push([V(0, 1.0, -0.06), V(s * 0.07, 0.92, -0.06), V(s * 0.095, 0.7, -0.03), V(s * 0.1, 0.5, -0.02), V(s * 0.11, 0.12, -0.03)]);
  }
  nervePaths.forEach((p) => add("nerves", tube(p, 0.0045, nerveMat, 48), "nervous"));

  // cardiovascular: a beating heart, the aorta and arteries, the venae cavae and veins
  const heartMat = organMat("#d7263d");
  const heart = new THREE.Mesh(blob(0.06, 1, 1.15, 0.9, (v) => { if (v.y < 0) { const k = 1 + v.y * 9; v.x *= k; v.z *= k; } if (v.y > 0.02) v.x += Math.sign(v.x) * 0.01; }), heartMat);
  heart.position.set(0.02, 1.3, 0.03); heart.rotation.z = -0.5; heart.rotation.x = 0.2; add("heart", heart, "cardiovascular");
  const artMat = organMat("#ff4d6d"), veinMat = organMat("#4f6bff");
  const aortaPts = [V(0.02, 1.35, 0.03), V(0.02, 1.43, 0.02), V(0.0, 1.45, -0.02), V(-0.005, 1.4, -0.04), V(0.0, 1.25, -0.04), V(0.0, 1.05, -0.035), V(0.0, 0.98, -0.03)];
  const arteries = [aortaPts,
    [V(0, 0.98, -0.03), V(0.05, 0.93, -0.01), V(0.09, 0.75, 0.02), V(0.1, 0.5, 0.015), V(0.105, 0.12, 0)], [V(0, 0.98, -0.03), V(-0.05, 0.93, -0.01), V(-0.09, 0.75, 0.02), V(-0.1, 0.5, 0.015), V(-0.105, 0.12, 0)],
    [V(0.005, 1.45, -0.01), V(0.02, 1.55, 0.0), V(0.025, 1.65, 0.0)], [V(-0.005, 1.45, -0.01), V(-0.02, 1.55, 0.0), V(-0.025, 1.65, 0.0)],
    [V(0.01, 1.45, -0.01), V(0.14, 1.44, -0.01), V(0.21, 1.36, 0.0), V(0.25, 1.12, 0.005), V(0.27, 0.87, 0.045)], [V(-0.01, 1.45, -0.01), V(-0.14, 1.44, -0.01), V(-0.21, 1.36, 0.0), V(-0.25, 1.12, 0.005), V(-0.27, 0.87, 0.045)]];
  arteries.forEach((p, i) => add("aorta", tube(p, i ? 0.0065 : 0.013, artMat, 48), "cardiovascular"));
  const veins = [[V(-0.02, 1.45, 0.0), V(-0.025, 1.36, 0.02)], [V(-0.025, 1.24, 0.02), V(-0.02, 1.05, -0.02), V(-0.015, 0.97, -0.02)],
    [V(-0.015, 0.97, -0.02), V(-0.06, 0.92, 0.0), V(-0.085, 0.72, 0.03), V(-0.093, 0.5, 0.025), V(-0.098, 0.12, 0.012)], [V(-0.015, 0.97, -0.02), V(0.04, 0.92, 0.0), V(0.08, 0.72, 0.03), V(0.09, 0.5, 0.025), V(0.095, 0.12, 0.012)],
    [V(-0.02, 1.45, 0.0), V(-0.035, 1.56, 0.01), V(-0.04, 1.65, 0.01)], [V(-0.02, 1.45, 0.0), V(0.035, 1.56, 0.01), V(0.04, 1.65, 0.01)]];
  veins.forEach((p, i) => add("veins", tube(p, i < 2 ? 0.011 : 0.006, veinMat, 40), "cardiovascular"));

  // respiratory: trachea and bronchi, breathing lungs
  const airMat = organMat("#9fd8ff");
  add("trachea", tube([V(0, 1.6, 0.03), V(0, 1.5, 0.03), V(0, 1.41, 0.02)], 0.012, airMat, 24), "respiratory");
  for (const s of [-1, 1]) add("trachea", tube([V(0, 1.41, 0.02), V(s * 0.04, 1.38, 0.01), V(s * 0.07, 1.33, 0.0)], 0.008, airMat, 16), "respiratory");
  const lungMat = organMat("#ff9fb2", { transmission: 0.15, thickness: 0.05, roughness: 0.5 });
  const lungs = [];
  for (const s of [-1, 1]) {
    const g = blob(0.1, s > 0 ? 0.68 : 0.78, 1.45, 0.78, (v) => {
      if (v.x * s < 0) v.x *= 0.45;                                             // flat where it faces the heart
      if (s > 0 && v.x < 0.01 && v.y < -0.02 && v.z > 0) v.x += 0.02;            // the left lung's cardiac notch
      if (v.y < -0.1) v.y = -0.1 + (v.y + 0.1) * 0.4;                            // a flatter base on the diaphragm
    });
    const m = new THREE.Mesh(g, lungMat); m.position.set(s * 0.085, 1.31, -0.005); add("lungs", m, "respiratory"); lungs.push(m);
  }

  // digestive: liver, stomach, pancreas, small and large intestine
  const liver = new THREE.Mesh(blob(0.1, 1.25, 0.55, 0.75, (v) => { if (v.x > 0) v.y *= 1 - v.x * 3; }), organMat("#8b2f2f")); liver.position.set(-0.05, 1.16, 0.02); liver.rotation.z = 0.15; add("liver", liver, "digestive");
  add("stomach", tube([V(0.0, 1.5, -0.02), V(0.01, 1.3, -0.01), V(0.04, 1.2, 0.01), V(0.09, 1.17, 0.03), V(0.1, 1.11, 0.04), V(0.06, 1.07, 0.05), V(0.0, 1.08, 0.04), V(-0.03, 1.1, 0.03)], 0.026, organMat("#f2a07b"), 64), "digestive");
  const pancreas = new THREE.Mesh(blob(0.06, 1.3, 0.25, 0.3), organMat("#f6d38a")); pancreas.position.set(0.02, 1.08, -0.015); pancreas.rotation.z = 0.25; add("pancreas", pancreas, "digestive");
  const smallPts = []; for (let i = 0; i <= 160; i++) { const t = i / 160; smallPts.push(V(Math.sin(t * 31) * 0.075 * (1 - Math.abs(t - 0.5)) + Math.sin(t * 7) * 0.015, 1.06 - t * 0.12 + Math.sin(t * 23) * 0.012, 0.045 + Math.cos(t * 19) * 0.02)); }
  add("intestines", tube(smallPts, 0.009, organMat("#f7b9a8"), 600), "digestive");
  add("intestines", tube([V(-0.1, 0.93, 0.03), V(-0.11, 1.0, 0.035), V(-0.105, 1.08, 0.03), V(-0.05, 1.09, 0.06), V(0.05, 1.09, 0.06), V(0.105, 1.07, 0.03), V(0.11, 0.98, 0.03), V(0.06, 0.91, 0.02), V(0.0, 0.89, -0.02)], 0.018, organMat("#e8907e"), 96), "digestive");

  // urinary: kidneys, ureters and bladder
  const kidMat = organMat("#a0523c");
  for (const s of [-1, 1]) {
    const k = new THREE.Mesh(blob(0.032, 0.8, 1.7, 0.75, (v) => { if (v.x * s < -0.012) v.x *= 0.6; }), kidMat); k.position.set(s * 0.075, s < 0 ? 1.07 : 1.09, -0.055); k.rotation.z = s * 0.2; add("kidneys", k, "urinary");
    add("bladder", tube([V(s * 0.065, 1.04, -0.05), V(s * 0.06, 0.98, -0.03), V(s * 0.03, 0.91, 0.0), V(s * 0.012, 0.9, 0.01)], 0.003, organMat("#c79bff"), 24), "urinary");
  }
  const bladder = new THREE.Mesh(blob(0.034, 1.1, 0.9, 1), organMat("#d9b8ff", { transmission: 0.2, thickness: 0.03 })); bladder.position.set(0, 0.9, 0.025); add("bladder", bladder, "urinary");

  // where each part sits, for pulling apart and for camera focus
  const centre = V(0, 1.15, 0);
  for (const p of Object.values(parts)) {
    const box = new THREE.Box3(); p.meshes.forEach((m) => box.expandByObject(m));
    p.centre = box.getCenter(new THREE.Vector3()); p.size = box.getSize(new THREE.Vector3()).length();
    p.meshes.forEach((m) => { m.userData.home = m.position.clone(); m.userData.mat = m.material; });
  }

  // blood flow and nerve impulses: small glowing points travelling along the vessels and nerves
  const flows = [];
  function flowAlong(paths, colour, n, speed) {
    const curves = paths.map((p) => new THREE.CatmullRomCurve3(p));
    const geo = new THREE.BufferGeometry(), pos = new Float32Array(n * 3), seeds = [];
    for (let i = 0; i < n; i++) seeds.push([i % curves.length, Math.random()]);
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: colour, size: 0.012, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }));
    flows.push({ pts, curves, seeds, speed, pos });
    return pts;
  }
  groups.cardiovascular.add(flowAlong(arteries, "#ff8fa3", 140, 0.22), flowAlong(veins, "#8fa8ff", 80, 0.14));
  groups.nervous.add(flowAlong([cordPts, ...nervePaths], "#fff3a0", 50, 0.5));

  // ---------- state ----------
  const state = { visible: new Set(Object.keys(SYSTEMS)), selected: null, hovered: null, explode: 0, motion: !reduce, labels: false, spin: false, quiz: null };
  const highlight = new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#5ef0ff", emissiveIntensity: 0.9, roughness: 0.3 });
  function paint() {
    for (const p of Object.values(parts)) for (const m of p.meshes) {
      const on = p.id === state.selected || p.id === state.hovered;
      m.material = on ? highlight : m.userData.mat;
    }
  }

  // ---------- the side panel ----------
  const info = $(".an-info");
  let mineCards = null;
  async function myCards() {
    if (mineCards) return mineCards;
    try {
      const cloud = await CloudStore.create(), user = cloud ? await cloud.user() : null;
      const store = scopeToSite(user ? cloud : new LocalStore(), siteName);
      mineCards = { store, cards: await store.listCards() };
    } catch { mineCards = { store: null, cards: [] }; }
    return mineCards;
  }
  async function showInfo(id) {
    const s = STRUCTURES[id], sys = SYSTEMS[s.system];
    info.style.setProperty("--c", sys.c);
    info.innerHTML = `
      <span class="kicker">${sys.name} system</span>
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.desc)}</p>
      <ul class="an-facts">${s.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      <div class="an-mine"></div>
      <div class="an-actions"><button type="button" class="btn btn-light lg btn-sm" data-act="cards"><span>Make ${s.cards.length} flashcards</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-act="focus"><span>Zoom in</span></button></div>`;
    const { cards } = await myCards();
    const hits = cards.filter((c) => s.keys.some((k) => `${c.front} ${c.back} ${c.topic}`.toLowerCase().includes(k)));
    const topics = [...new Set(hits.map((c) => `${c.document_id}|${c.topic || "Cards"}`))];
    if (state.selected === id) info.querySelector(".an-mine").innerHTML = hits.length
      ? `<b>In your notes</b><span>${hits.length} ${hits.length === 1 ? "card" : "cards"} in ${topics.length} ${topics.length === 1 ? "topic" : "topics"}.</span>${topics.slice(0, 3).map((k) => `<a href="app.html#/topic/${encodeURIComponent(k)}">${esc(k.split("|")[1])} →</a>`).join("")}`
      : `<b>In your notes</b><span>Nothing on the ${esc(s.name.toLowerCase())} yet.</span>`;
  }
  function showIntro() {
    info.style.setProperty("--c", "#5ef0ff");
    info.innerHTML = `<span class="kicker">3D anatomy</span><h3>Explore the body</h3><p>Click any structure to learn about it, make flashcards from it, or find it in your notes. Hide systems, fade the skin, or pull the organs apart to see inside.</p>
      <ul class="an-facts">${Object.entries(SYSTEMS).map(([k, s]) => `<li><button type="button" class="an-jump" data-jump="${Object.keys(STRUCTURES).find((id) => STRUCTURES[id].system === k)}" style="--c:${s.c}">${s.name} system →</button></li>`).join("")}</ul>`;
  }
  info.addEventListener("click", async (e) => {
    const j = e.target.closest("[data-jump]"); if (j) return select(j.dataset.jump, true);
    const act = e.target.closest("[data-act]")?.dataset.act; if (!act || !state.selected) return;
    if (act === "focus") return focus(state.selected);
    if (act === "cards") {
      const s = STRUCTURES[state.selected], btn = e.target.closest("button");
      btn.disabled = true;
      const { store } = await myCards();
      if (!store) { btn.querySelector("span").textContent = "Couldn't save on this device"; return; }
      const doc = await store.addDocument({ title: `3D anatomy: ${s.name}`, site: siteName, text: [s.desc, ...s.facts].join("\n") });
      await store.addCards(s.cards.map(([front, back]) => ({ document_id: doc.id, topic: s.name, front, back, kind: /^why|explain/i.test(front) ? "why" : "definition", source_quote: null, grounded: "bonus" })));
      mineCards = null;
      btn.outerHTML = `<a class="btn btn-light lg btn-sm" href="app.html#/deck/${doc.id}"><span>Added ✓ Study them now</span></a>`;
    }
  });

  // ---------- picking ----------
  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
  function pick(e) {
    const r = canvas.getBoundingClientRect();
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(mouse, camera);
    const hit = ray.intersectObjects(pickables.filter((m) => state.visible.has(STRUCTURES[m.userData.id].system)), false)[0];
    return hit?.object.userData.id || null;
  }
  let down = null;
  canvas.addEventListener("pointerdown", (e) => { down = [e.clientX, e.clientY]; });
  canvas.addEventListener("pointermove", (e) => { if (e.buttons) return; const id = pick(e); if (id !== state.hovered) { state.hovered = id; paint(); canvas.style.cursor = id ? "pointer" : "grab"; } });
  canvas.addEventListener("pointerup", (e) => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 5) return;
    const id = pick(e);
    if (state.quiz) return answer(id);
    if (id) select(id); else { state.selected = null; paint(); showIntro(); }
  });
  function select(id, zoom) { state.selected = id; paint(); showInfo(id); if (zoom) focus(id); }

  // ---------- camera ----------
  let tween = null;
  function flyTo(pos, target) { tween = { from: camera.position.clone(), to: pos, tFrom: controls.target.clone(), tTo: target, t: 0 }; }
  function focus(id) { const p = parts[id], d = Math.max(0.45, p.size * 2.4); flyTo(p.centre.clone().add(V(d * 0.35, d * 0.15, d)), p.centre.clone()); }
  const VIEWS = { front: [V(0, 1.0, 3.6), V(0, 0.9, 0)], side: [V(3.6, 1.0, 0), V(0, 0.9, 0)], back: [V(0, 1.0, -3.6), V(0, 0.9, 0)], head: [V(0.25, 1.75, 0.75), V(0, 1.7, 0)], chest: [V(0.3, 1.35, 1.05), V(0, 1.3, 0)], abdomen: [V(0.3, 1.05, 1.05), V(0, 1.02, 0)] };
  $(".an-views").addEventListener("click", (e) => { const v = e.target.closest("[data-view]"); if (v) flyTo(...VIEWS[v.dataset.view].map((x) => x.clone())); });

  // ---------- controls ----------
  $(".an-systems").addEventListener("click", (e) => {
    const b = e.target.closest("[data-sys]"); if (!b) return;
    const k = b.dataset.sys, on = !state.visible.has(k);
    on ? state.visible.add(k) : state.visible.delete(k);
    b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on)); groups[k].visible = on;
  });
  root.addEventListener("input", (e) => {
    const c = e.target.dataset.ctl;
    if (c === "skin") { skinMat.uniforms.uOpacity.value = e.target.value / 100; skin.visible = e.target.value > 0; }
    if (c === "explode") state.explode = e.target.value / 100;
  });
  root.addEventListener("change", (e) => { const c = e.target.dataset.ctl; if (["motion", "labels", "spin"].includes(c)) { state[c] = e.target.checked; if (c === "spin") controls.autoRotate = state.spin; } });
  controls.autoRotateSpeed = 1.2;

  // ---------- quiz: find the structure ----------
  const quizbar = $(".an-quizbar");
  function nextQuestion() {
    const pool = Object.keys(STRUCTURES).filter((id) => state.visible.has(STRUCTURES[id].system) && id !== state.quiz.last);
    const id = pool[Math.floor(Math.random() * pool.length)];
    state.quiz.target = id; state.quiz.last = id; state.quiz.tries = 0;
    quizbar.querySelector(".an-q").innerHTML = `Find the <b>${esc(STRUCTURES[id].name.toLowerCase())}</b>`;
    quizbar.querySelector(".an-score").textContent = `${state.quiz.score} / ${state.quiz.n}`;
  }
  function answer(id) {
    const q = state.quiz; if (!id) return;
    const right = id === q.target;
    state.selected = id; paint();
    stage.classList.remove("an-right", "an-wrong"); void stage.offsetWidth; stage.classList.add(right ? "an-right" : "an-wrong");
    if (right) { q.score += q.tries === 0 ? 1 : 0; q.n++; showInfo(id); setTimeout(() => (q.n >= 10 ? endQuiz() : nextQuestion()), 900); }
    else { q.tries++; quizbar.querySelector(".an-q").innerHTML = `That's the ${esc(STRUCTURES[id].name.toLowerCase())}. Find the <b>${esc(STRUCTURES[q.target].name.toLowerCase())}</b>`; if (q.tries >= 2) { q.n++; select(q.target, true); setTimeout(() => (q.n >= 10 ? endQuiz() : nextQuestion()), 1600); } }
  }
  async function endQuiz() {
    const q = state.quiz; state.quiz = null; quizbar.hidden = true; root.classList.remove("quizzing");
    info.style.setProperty("--c", "#4fe0a6");
    info.innerHTML = `<span class="kicker">Quiz finished</span><h3>${q.score} out of ${q.n}</h3><p>${q.score >= 8 ? "Excellent. You know your way around the body." : q.score >= 5 ? "Good going. Click the ones you missed to learn more." : "Keep exploring: click any structure to learn about it."}</p>
      <div class="an-actions"><button type="button" class="btn btn-light lg btn-sm an-quiz"><span>Play again</span></button></div>`;
    const { store } = await myCards();
    try { await store?.logActivity({ site: siteName, kind: "quiz", xp: q.score * 2, detail: { quiz: "3D anatomy", score: q.score, of: q.n } }); } catch { /* storage blocked */ }
  }
  root.addEventListener("click", (e) => {
    if (e.target.closest(".an-quiz")) { state.quiz = { score: 0, n: 0 }; quizbar.hidden = false; root.classList.add("quizzing"); nextQuestion(); flyTo(...VIEWS.front.map((x) => x.clone())); }
    if (e.target.closest(".an-quit")) { state.quiz = null; quizbar.hidden = true; root.classList.remove("quizzing"); showIntro(); }
  });

  // ---------- labels ----------
  const labelBox = $(".an-labels");
  labelBox.innerHTML = Object.keys(parts).map((id) => `<span data-l="${id}">${esc(STRUCTURES[id].name)}</span>`).join("");
  const labelEls = Object.fromEntries([...labelBox.children].map((el) => [el.dataset.l, el]));

  // ---------- render loop ----------
  function resize() { const r = canvas.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / Math.max(1, r.height); camera.updateProjectionMatrix(); }
  new ResizeObserver(resize).observe(canvas); resize();
  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(canvas);
  const clock = new THREE.Clock(), tmp = new THREE.Vector3();
  renderer.setAnimationLoop(() => {
    if (!visible) return;
    const dt = Math.min(0.05, clock.getDelta()), t = clock.elapsedTime;
    skinMat.uniforms.uTime.value = t;
    platform.rotation.y += dt * 0.15;
    if (state.motion) {
      // heartbeat: a quick double pump about once a second; breathing: slow and deep
      const beat = Math.max(0, Math.sin(t * 7.5)) ** 8 * 0.09 + Math.max(0, Math.sin(t * 7.5 - 1.2)) ** 8 * 0.05;
      heart.scale.setScalar(1 + beat);
      const breath = Math.sin(t * 1.3) * 0.035;
      lungs.forEach((l) => l.scale.set(1 + breath * 0.6, 1 + breath, 1 + breath * 0.8));
      for (const f of flows) {
        f.pts.visible = true;
        f.seeds.forEach(([c, s], i) => { f.curves[c].getPointAt((s + t * f.speed) % 1, tmp); f.pos[i * 3] = tmp.x; f.pos[i * 3 + 1] = tmp.y; f.pos[i * 3 + 2] = tmp.z; });
        f.pts.geometry.attributes.position.needsUpdate = true;
      }
    } else flows.forEach((f) => { f.pts.visible = false; });
    // pulling apart: each structure moves out from the body's centre
    for (const p of Object.values(parts)) {
      const off = p.centre.clone().sub(centre).multiplyScalar(state.explode * 0.9);
      p.meshes.forEach((m) => m.position.copy(m.userData.home).add(off));
    }
    if (tween) {
      tween.t = Math.min(1, tween.t + dt * 1.6);
      const k = tween.t < 0.5 ? 4 * tween.t ** 3 : 1 - (-2 * tween.t + 2) ** 3 / 2;
      camera.position.lerpVectors(tween.from, tween.to, k); controls.target.lerpVectors(tween.tFrom, tween.tTo, k);
      if (tween.t >= 1) tween = null;
    }
    controls.update();
    renderer.render(scene, camera);
    // labels follow their structures
    labelBox.hidden = !state.labels;
    if (state.labels) {
      const r = canvas.getBoundingClientRect();
      for (const [id, el] of Object.entries(labelEls)) {
        const p = parts[id], on = state.visible.has(STRUCTURES[id].system) && p.size < 0.5;   // long structures (spine, vessels) would crowd the view
        tmp.copy(p.centre).add(p.centre.clone().sub(centre).multiplyScalar(state.explode * 0.9)).project(camera);
        el.style.display = on && tmp.z < 1 ? "" : "none";
        el.style.transform = `translate(${((tmp.x + 1) / 2) * r.width}px, ${((1 - tmp.y) / 2) * r.height}px)`;
      }
    }
  });
  showIntro();
  return { select, focus, state, parts };
}
