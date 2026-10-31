// Body Intelligence 3D view: the BodyParts3D anatomy model (kit/models/anatomy-glb.js) as a
// studio-lit muscle figure whose muscle groups are coloured by the user's data.
//
// Controls: drag (one finger) to turn · scroll or pinch to zoom · right-drag or two fingers to pan ·
// tap a muscle to inspect it · double-tap to fly in · front/back/side views · reset.
// Layers: muscles (always), skeleton, heart & lungs (x-ray), skin.
//
//   const view = await mountBody(stageEl, { onSelect(muscle), onHover(muscle, x, y) });
//   view.paint({ quadriceps_l: { rgb: [1, .5, .1] }, ... });   // null / missing = no data
//   view.select("quadriceps"); view.preview({ quadriceps: 1, gluteal: .8 }); view.view("back");
import * as THREE from "../vendor/three/three.module.min.js";
import { OrbitControls } from "../vendor/three/OrbitControls.js";
import { RoomEnvironment } from "../vendor/three/addons/RoomEnvironment.js";
import { loadAnatomy, take, inflate, ATTRIBUTION } from "../models/anatomy-glb.js";
import { helpers } from "../models/viewer.js";
import { ALL_KEYS, muscleOfKey } from "./body-intel.js";

export { ATTRIBUTION };
const MUSCLE_BASE = new THREE.Color("#8f2b26"), NO_DATA = new THREE.Color("#5f5a60"), WHITE = new THREE.Color("#ffffff");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const VIEWS = { front: [0, 0.95, 3.1], back: [0, 0.95, -3.1], left: [3.1, 0.95, 0], right: [-3.1, 0.95, 0] };

export async function mountBody(stage, { onSelect = () => {}, onHover = () => {} } = {}) {
  const canvas = document.createElement("canvas");
  canvas.className = "bi-canvas";
  canvas.setAttribute("aria-label", "Your body in 3D. Drag to turn, pinch or scroll to zoom, two fingers to pan, tap a muscle to see its data.");
  stage.prepend(canvas);

  // ---------- renderer: studio lighting, soft shadows, filmic tone mapping ----------
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  const maxDpr = () => Math.min(innerWidth < 700 ? 2 : 2.5, devicePixelRatio || 1);
  renderer.setPixelRatio(maxDpr());
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const bg = document.createElement("canvas"); bg.width = bg.height = 512;
  { const g = bg.getContext("2d"), r = g.createRadialGradient(256, 200, 10, 256, 256, 400); r.addColorStop(0, "#3a3b42"); r.addColorStop(0.5, "#1c1d22"); r.addColorStop(1, "#0b0b0d"); g.fillStyle = r; g.fillRect(0, 0, 512, 512); }
  scene.background = new THREE.CanvasTexture(bg); scene.background.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.5;

  scene.add(new THREE.HemisphereLight("#fff6ee", "#2d2724", 0.5));
  const key = new THREE.DirectionalLight("#fff3e6", 2.6); key.position.set(1.4, 3.2, 2.6); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0004; key.shadow.normalBias = 0.012;
  Object.assign(key.shadow.camera, { left: -1.1, right: 1.1, top: 2.1, bottom: -0.3, near: 0.5, far: 8 }); key.shadow.camera.updateProjectionMatrix();
  scene.add(key);
  const fill = new THREE.DirectionalLight("#dfe7ff", 0.55); fill.position.set(-2.2, 1.2, 1.6); scene.add(fill);
  // two coloured rim lights that outline the silhouette from behind, like a product shot
  const rimCool = new THREE.SpotLight("#9fc6ff", 9, 7, Math.PI / 5, 0.6); rimCool.position.set(-1.8, 2.4, -2.2); rimCool.target.position.set(0, 1, 0); scene.add(rimCool, rimCool.target);
  const rimWarm = new THREE.SpotLight("#ffc9a3", 6, 7, Math.PI / 5, 0.6); rimWarm.position.set(1.9, 1.2, -2.0); rimWarm.target.position.set(0, 0.9, 0); scene.add(rimWarm, rimWarm.target);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(1.6, 96), new THREE.ShadowMaterial({ opacity: 0.38 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.62, 0.635, 160), new THREE.MeshBasicMaterial({ color: "#6f7480", transparent: true, opacity: 0.5 }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.001; scene.add(ring);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 60);
  camera.position.set(...VIEWS.front);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0.95, 0);
  Object.assign(controls, { enableDamping: true, dampingFactor: 0.08, minDistance: 0.25, maxDistance: 6, zoomToCursor: true, zoomSpeed: 1.15, screenSpacePanning: true, maxPolarAngle: Math.PI * 0.94, autoRotateSpeed: 1.0 });
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

  // ---------- materials ----------
  const fibre = helpers.detail("fibre"), boneTex = helpers.detail("bone");
  function muscleMat() {
    const m = new THREE.MeshPhysicalMaterial({ color: MUSCLE_BASE.clone(), roughness: 0.5, metalness: 0, clearcoat: 0.3, clearcoatRoughness: 0.38, sheen: 0.12, sheenRoughness: 0.6, sheenColor: new THREE.Color("#ffd2c6"), emissive: new THREE.Color("#000000") });
    m.bumpMap = fibre; m.bumpScale = 0.55;
    return m;
  }
  const boneMat = new THREE.MeshPhysicalMaterial({ color: "#e9e1cc", roughness: 0.62, clearcoat: 0.15, bumpMap: boneTex, bumpScale: 0.7 });
  const organMat = (c) => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.4, clearcoat: 0.6, clearcoatRoughness: 0.25, sheen: 0.3, sheenColor: new THREE.Color("#ffd0c8") });

  // ---------- the model ----------
  const { byKey } = await loadAnatomy();
  const body = new THREE.Group(); scene.add(body);
  const layers = { skeleton: new THREE.Group(), organs: new THREE.Group(), skin: new THREE.Group(), extra: new THREE.Group() };
  for (const g of Object.values(layers)) body.add(g);
  layers.organs.visible = false; layers.skin.visible = false;
  const meshes = {}, pickables = [];
  for (const k of ALL_KEYS) for (const mesh of take(byKey, k)) {
    mesh.material = muscleMat(); mesh.castShadow = mesh.receiveShadow = true;
    mesh.userData = { key: k, muscle: muscleOfKey(k), colour: null };
    (meshes[k] ||= []).push(mesh); pickables.push(mesh); body.add(mesh);
  }
  // muscles the heat map doesn't track: hands, feet, ribs' intercostals, pelvic floor
  const neutral = muscleMat(); neutral.color.copy(NO_DATA);
  for (const k of ["hand_muscles_l", "hand_muscles_r", "foot_muscles_l", "foot_muscles_r", "intercostals_l", "intercostals_r"]) for (const mesh of take(byKey, k)) { mesh.material = neutral; mesh.castShadow = true; layers.extra.add(mesh); }
  for (const k of ["skull", "mandible", "spine_cervical", "spine_thoracic", "spine_lumbar", "ribs_l", "ribs_r", "sternum", "pelvis", "clavicle_l", "clavicle_r", "scapula_l", "scapula_r", "humerus_l", "humerus_r", "forearm_l", "forearm_r", "hand_l", "hand_r", "femur_l", "femur_r", "patella_l", "patella_r", "lower_leg_l", "lower_leg_r", "foot_l", "foot_r", "teeth"]) for (const mesh of take(byKey, k)) { mesh.material = boneMat; mesh.castShadow = true; layers.skeleton.add(mesh); }
  const organs = {};
  for (const [k, c] of [["heart", "#a3262a"], ["lung_l", "#d98f8a"], ["lung_r", "#d98f8a"]]) for (const mesh of take(byKey, k)) { mesh.material = organMat(c); mesh.userData = { key: k, organ: k.startsWith("lung") ? "lung" : "heart", base: new THREE.Color(c) }; (organs[k] ||= []).push(mesh); layers.organs.add(mesh); }
  const skinMat = new THREE.MeshPhysicalMaterial({ color: "#d4a184", roughness: 0.55, sheen: 0.7, sheenColor: new THREE.Color("#ffd6c2"), transparent: true, opacity: 0.22, depthWrite: false });
  for (const mesh of take(byKey, "skin").map((m) => inflate(m))) { mesh.material = skinMat; mesh.renderOrder = 3; layers.skin.add(mesh); }

  // ---------- painting ----------
  const state = { colours: {}, organColours: {}, selected: null, hovered: null, preview: null, xray: false };
  function refresh() {
    for (const [k, list] of Object.entries(meshes)) {
      const m = muscleOfKey(k), c = state.colours[k];
      // heat colours are applied at full strength with a little self-light so they stay saturated
      // under the bright studio lighting (filmic tone mapping desaturates highlights)
      let col = c ? new THREE.Color(...c.rgb).multiplyScalar(0.82) : NO_DATA.clone();
      let glow = c ? new THREE.Color(...c.rgb).multiplyScalar(0.2) : new THREE.Color(0, 0, 0);
      if (state.preview) {   // exercise preview: primary and secondary muscles light up, the rest fade
        const w = state.preview[m] || 0;
        col = w ? MUSCLE_BASE.clone().lerp(new THREE.Color("#ff5a3c"), 0.25 + 0.75 * w) : NO_DATA.clone().multiplyScalar(0.7);
        glow = w ? new THREE.Color("#ff4a2a").multiplyScalar(0.18 * w) : glow.set(0, 0, 0);
      }
      const sel = state.selected === m, hov = state.hovered === m, dim = state.selected && !sel;
      for (const mesh of list) {
        const mat = mesh.material;
        mat.color.copy(dim ? col.clone().lerp(NO_DATA, 0.5).multiplyScalar(0.45) : col);
        mat.emissive.copy(dim ? glow.clone().multiplyScalar(0.3) : sel ? glow.clone().add(WHITE.clone().multiplyScalar(0.22)) : hov ? glow.clone().add(WHITE.clone().multiplyScalar(0.08)) : glow);
        mat.transparent = state.xray; mat.opacity = state.xray ? 0.28 : 1; mat.depthWrite = !state.xray;
      }
    }
    for (const [k, list] of Object.entries(organs)) {
      const c = state.organColours[k];
      for (const mesh of list) { mesh.material.color.copy(c ? new THREE.Color(...c.rgb) : mesh.userData.base); mesh.material.emissive.copy(c ? new THREE.Color(...c.rgb).multiplyScalar(0.15) : new THREE.Color(0, 0, 0)); }
    }
  }
  refresh();

  // ---------- picking ----------
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function hitAt(x, y) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const targets = state.xray ? [...pickables, ...layers.organs.children] : pickables;
    return ray.intersectObjects(targets, false)[0] || null;
  }
  let down = null, lastTap = 0, lastHover = 0;
  canvas.addEventListener("pointerdown", (e) => { down = [e.clientX, e.clientY]; tween = null; controls.autoRotate = false; });
  canvas.addEventListener("pointermove", (e) => {
    if (e.buttons || e.pointerType === "touch") return;
    const t = performance.now(); if (t - lastHover < 50) return; lastHover = t;
    const h = hitAt(e.clientX, e.clientY), m = h?.object.userData.muscle || h?.object.userData.organ || null;
    if (m !== state.hovered) { state.hovered = h?.object.userData.muscle || null; refresh(); canvas.style.cursor = m ? "pointer" : "grab"; }
    const r = stage.getBoundingClientRect(); onHover(m, e.clientX - r.left, e.clientY - r.top);
  });
  canvas.addEventListener("pointerleave", () => { if (state.hovered) { state.hovered = null; refresh(); } onHover(null); });
  canvas.addEventListener("pointerup", (e) => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
    const h = hitAt(e.clientX, e.clientY), now = performance.now();
    if (now - lastTap < 320 && h) { flyToPoint(h.point); lastTap = 0; return; }   // double tap: fly in
    lastTap = now;
    const ud = h?.object.userData || {};
    if (ud.muscle) { state.selected = ud.muscle; refresh(); onSelect(ud.muscle); }
    else if (ud.organ) onSelect(ud.organ, { organ: true });
    else { state.selected = null; refresh(); onSelect(null); }
  });

  // ---------- camera moves ----------
  let tween = null;
  function flyTo(pos, target) { tween = { p0: camera.position.clone(), p1: new THREE.Vector3(...pos), t0: controls.target.clone(), t1: new THREE.Vector3(...target), start: performance.now(), dur: reduce ? 1 : 700 }; }
  function flyToPoint(p) { const dir = camera.position.clone().sub(controls.target).normalize(), d = Math.max(0.45, camera.position.distanceTo(controls.target) * 0.45); flyTo(p.clone().add(dir.multiplyScalar(d)).toArray(), p.toArray()); }
  function focusMuscle(m) {
    const box = new THREE.Box3(); for (const k of [`${m}_l`, `${m}_r`, m]) for (const mesh of meshes[k] || []) box.expandByObject(mesh);
    if (box.isEmpty()) return;
    const c = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3()).length();
    const dir = camera.position.clone().sub(controls.target).normalize();
    flyTo(c.clone().add(dir.multiplyScalar(Math.max(0.6, size * 1.6))).toArray(), c.toArray());
  }

  // ---------- render loop (paused when off screen or the tab is hidden) ----------
  let visible = true, raf = 0;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); }).observe(stage);
  function resize() { const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return; renderer.setPixelRatio(maxDpr()); renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  new ResizeObserver(resize).observe(stage); resize();
  function loop() {
    cancelAnimationFrame(raf);
    if (!visible || document.hidden) return;
    raf = requestAnimationFrame(loop);
    if (tween) {
      const f = Math.min(1, (performance.now() - tween.start) / tween.dur), s = f * f * (3 - 2 * f);
      camera.position.lerpVectors(tween.p0, tween.p1, s); controls.target.lerpVectors(tween.t0, tween.t1, s);
      if (f >= 1) tween = null;
    }
    controls.update(); renderer.render(scene, camera);
  }
  document.addEventListener("visibilitychange", loop);
  loop();

  return {
    paint(colours = {}, organColours = {}) { state.colours = colours; state.organColours = organColours; refresh(); },
    select(m, zoom = false) { state.selected = m; state.preview = null; refresh(); if (m && zoom) focusMuscle(m); },
    preview(weights) { state.preview = weights; state.selected = null; refresh(); },
    layer(name, on) {
      if (name === "organs") { layers.organs.visible = on; state.xray = on; for (const mat of [boneMat, neutral]) { mat.transparent = on; mat.opacity = on ? 0.18 : 1; mat.depthWrite = !on; } refresh(); }   // x-ray: muscles and bones go see-through so the heart and lungs show
      else if (layers[name]) layers[name].visible = on;
    },
    view(name) { if (name === "reset") { flyTo(VIEWS.front, [0, 0.95, 0]); return; } const p = VIEWS[name]; if (p) flyTo(p, [0, 0.95, 0]); },
    zoom(f) { const d = camera.position.clone().sub(controls.target); d.setLength(THREE.MathUtils.clamp(d.length() * f, controls.minDistance, controls.maxDistance)); flyTo(controls.target.clone().add(d).toArray(), controls.target.toArray()); },
    spin(on) { controls.autoRotate = on && !reduce; },
    focus: focusMuscle,
    snapshot() { renderer.render(scene, camera); return canvas.toDataURL("image/png"); },
  };
}
