// A small Three.js stage for SciGradify interactives: renderer, camera, orbit controls, studio lights,
// HTML labels pinned to 3D points, and a render loop that stops when the lab leaves the page.
import * as THREE from "../vendor/three/three.module.min.js";
import { OrbitControls } from "../vendor/three/OrbitControls.js";
export { THREE };

export function stage3d(host, { aspect = 0.62, max = 520, distance = 12, background = 0x0b0c0e, hint = "Drag to turn · scroll or pinch to zoom" } = {}) {
  const box = document.createElement("div"); box.className = "lab-3d"; host.append(box);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(background);
  box.append(renderer.domElement);
  const tip = document.createElement("div"); tip.className = "lab-hint"; tip.textContent = hint; box.append(tip);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1.6, 0.05, 500);
  camera.position.set(0, 0, distance);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 1.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(5, 8, 10); scene.add(key);
  const rim = new THREE.DirectionalLight(0x88ccff, 1.0); rim.position.set(-8, -4, -6); scene.add(rim);
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const fit = () => { const w = Math.max(240, host.clientWidth || 600), h = Math.min(max, Math.round(w * aspect)); renderer.setSize(w, h, false); renderer.domElement.style.height = `${h}px`; camera.aspect = w / h; camera.updateProjectionMatrix(); };
  fit();
  const ro = "ResizeObserver" in window ? new ResizeObserver(fit) : null; ro?.observe(host);
  const v = new THREE.Vector3();
  let on = true, spin = 0, onFrame = null, last = performance.now();
  const tick = (t) => {
    if (!on || !box.isConnected) { cleanup(); return; }
    const dt = Math.min(0.05, (t - last) / 1000); last = t;
    if (spin) root.rotation.y += spin * dt;
    onFrame?.(dt, t / 1000);
    controls.update(); renderer.render(scene, camera);
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
  function cleanup() { on = false; ro?.disconnect(); controls.dispose(); renderer.dispose(); }
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

// a cylinder between two points
export function bond(THREE, a, b, r, material) {
  const d = new THREE.Vector3().subVectors(b, a), len = d.length();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 12), material);
  m.position.copy(a).addScaledVector(d, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  return m;
}
export const mat = (THREE, color, opts = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.05, ...opts });
