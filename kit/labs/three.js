// A small Three.js stage for SciGradify interactives: renderer, camera, orbit controls, studio lights,
// HTML labels pinned to 3D points, and a render loop that stops when the lab leaves the page.
// Rendered like a studio shot: neutral tone mapping, reflections from an environment map, and (on "high"
// devices, for stages that ask with ao: true) ambient occlusion, at up to 4K with the resolution following
// the frame rate (kit/core/render-quality.js).
import * as THREE from "../vendor/three/three.module.min.js";
import { OrbitControls } from "../vendor/three/OrbitControls.js";
import { RoomEnvironment } from "../vendor/three/addons/RoomEnvironment.js";
import { EffectComposer } from "../vendor/three/addons/EffectComposer.js";
import { RenderPass } from "../vendor/three/addons/RenderPass.js";
import { OutputPass } from "../vendor/three/addons/OutputPass.js";
import { GTAOPass } from "../vendor/three/addons/GTAOPass.js";
import { qualityTier, maxPixelRatio, adaptiveResolution } from "../core/render-quality.js";
export { THREE };

export function stage3d(host, { aspect = 0.62, max = 520, distance = 12, background = 0x0b0c0e, hint = "Drag to turn · scroll or pinch to zoom", ao = false, aoRadius = 0.6 } = {}) {
  const box = document.createElement("div"); box.className = "lab-3d"; host.append(box);
  const tier = qualityTier();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = 1.0;   // keeps CPK and diagram colours true
  renderer.setClearColor(background);
  box.append(renderer.domElement);
  const tip = document.createElement("div"); tip.className = "lab-hint"; tip.textContent = hint; box.append(tip);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(background);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture; pmrem.dispose();
  scene.environmentIntensity = 0.55;
  const camera = new THREE.PerspectiveCamera(40, 1.6, 0.05, 500);
  camera.position.set(0, 0, distance);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 0.9));
  const key = new THREE.DirectionalLight(0xfff6ec, 2.4); key.position.set(5, 8, 10); scene.add(key);
  const fill = new THREE.DirectionalLight(0xe6eeff, 0.6); fill.position.set(-6, 2, 6); scene.add(fill);
  const rim = new THREE.DirectionalLight(0x88ccff, 1.4); rim.position.set(-8, -4, -6); scene.add(rim);
  // post-processing only where it earns its cost: multisampled, with ambient occlusion
  let composer = null;
  if (ao && tier === "high") {
    composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 }));
    composer.addPass(new RenderPass(scene, camera));
    const g = new GTAOPass(scene, camera, 1, 1);
    g.updateGtaoMaterial({ radius: aoRadius, distanceExponent: 1.5, thickness: 1, scale: 1.1, samples: 16 });
    g.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 16 });
    g.blendIntensity = 0.85; composer.addPass(g);
    composer.addPass(new OutputPass());
  }
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  let W0 = 600, H0 = 400;
  const res = adaptiveResolution((pr) => { renderer.setPixelRatio(pr); renderer.setSize(W0, H0, false); composer?.setPixelRatio(pr); composer?.setSize(W0, H0); });
  const fit = () => {
    const w = Math.max(240, host.clientWidth || 600), h = Math.min(max, Math.round(w * aspect)); W0 = w; H0 = h;
    renderer.setSize(w, h, false); renderer.domElement.style.height = `${h}px`; camera.aspect = w / h; camera.updateProjectionMatrix();
    res.ceiling = maxPixelRatio(tier, w, h); composer?.setPixelRatio(res.ratio); composer?.setSize(w, h);
  };
  fit();
  const ro = "ResizeObserver" in window ? new ResizeObserver(fit) : null; ro?.observe(host);
  const v = new THREE.Vector3();
  let on = true, spin = 0, onFrame = null, last = performance.now();
  const tick = (t) => {
    if (!on || !box.isConnected) { cleanup(); return; }
    if (document.visibilityState === "visible") res.frame(t - last);
    const dt = Math.max(0, Math.min(0.05, (t - last) / 1000)); last = t;
    if (spin) root.rotation.y += spin * dt;
    onFrame?.(dt, t / 1000);
    controls.update(); if (composer) composer.render(); else renderer.render(scene, camera);
    const W = renderer.domElement.clientWidth, H = renderer.domElement.clientHeight;
    for (const L of labels) {
      L.obj.getWorldPosition(v); v.project(camera);
      const vis = v.z < 1 && L.obj.visible !== false && L.show !== false;
      L.el.style.display = vis ? "" : "none";
      if (vis) { L.el.style.left = `${((v.x + 1) / 2) * W}px`; L.el.style.top = `${((1 - v.y) / 2) * H}px`; }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  function cleanup() { on = false; ro?.disconnect(); controls.dispose(); composer?.dispose(); scene.environment?.dispose(); renderer.dispose(); }
  return {
    THREE, scene, camera, renderer, controls, root, box,
    set spin(v) { spin = v; }, get spin() { return spin; },
    set onFrame(f) { onFrame = f; },
    // an HTML label that follows a 3D object
    label(obj, text, color = "") { const el = document.createElement("div"); el.className = "lab-tag"; el.innerHTML = text; if (color) el.style.background = color; box.append(el); const L = { obj, el }; labels.push(L); return L; },
    clearLabels() { for (const L of labels) L.el.remove(); labels.length = 0; },
    clear() { this.clearLabels(); while (root.children.length) { const c = root.children.pop(); c.traverse?.((o) => { o.geometry?.dispose(); }); } },
    stop: cleanup,
  };
}

// shared, finely tessellated unit shapes: every atom and bond is one of these, scaled. Smooth at 4K,
// and a 60-atom molecule uploads two meshes' worth of vertices, not 120.
export const UNIT = { sphere: new THREE.SphereGeometry(1, 64, 48), cylinder: new THREE.CylinderGeometry(1, 1, 1, 40, 1) };
for (const g of Object.values(UNIT)) g.dispose = () => {};   // stage.clear() disposes what it removes; these stay
export function ball(THREE, r, material) { const m = new THREE.Mesh(UNIT.sphere, material); m.scale.setScalar(r); return m; }
// a cylinder between two points
export function bond(THREE, a, b, r, material) {
  const d = new THREE.Vector3().subVectors(b, a), len = d.length();
  const m = new THREE.Mesh(UNIT.cylinder, material); m.scale.set(r, len, r);
  m.position.copy(a).addScaledVector(d, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  return m;
}
// a glossy, slightly clear-coated plastic, like a good physical model kit
export const mat = (THREE, color, opts = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.32, metalness: 0.0, clearcoat: 0.6, clearcoatRoughness: 0.18, ...opts });
