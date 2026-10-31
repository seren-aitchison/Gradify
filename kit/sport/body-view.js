// Body Intelligence 3D view: the BodyParts3D anatomy model (kit/models/anatomy-glb.js) as a
// studio-lit muscle figure whose muscles are coloured by the user's data.
//
// Muscle groups whose meshes contain separately identifiable muscles (kit/sport/anatomy-parts.js)
// are split into one mesh per muscle at load time, so in "detailed" mode the user can tap and colour
// individual muscles (rectus femoris, lateral deltoid, upper trapezius...). In group mode the parts
// of a group act as one.
//
// Controls: drag (one finger) to turn · scroll or pinch to zoom · right-drag or two fingers to pan ·
// tap a muscle to inspect it · double-tap to fly in · front/back/side views · reset.
// Layers: muscles (always), skeleton, heart & lungs (x-ray), skin.
//
//   const view = await mountBody(stageEl, { onSelect(muscle, { part }), onHover(name, x, y) });
//   view.paint(groupColours, organColours, partColours);   // { meshKey or partKey: { rgb } }
//   view.detail(true); view.select("quadriceps", { part: "rectus_femoris", zoom: true });
//   view.preview({ quadriceps: 1, gluteal: .8 }); view.view("back");
import * as THREE from "../vendor/three/three.module.min.js";
import { OrbitControls } from "../vendor/three/OrbitControls.js";
import { RoomEnvironment } from "../vendor/three/addons/RoomEnvironment.js";
import { loadAnatomy, take, inflate, ATTRIBUTION } from "../models/anatomy-glb.js";
import { helpers } from "../models/viewer.js";
import { ALL_KEYS, muscleOfKey } from "./body-intel.js";
import { identify, partName } from "./anatomy-parts.js";
import { MUSCLES } from "./exercises.js";

export { ATTRIBUTION };
const MUSCLE_BASE = new THREE.Color("#8f2b26"), NO_DATA = new THREE.Color("#5c575d"), WHITE = new THREE.Color("#ffffff");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const TARGET = new THREE.Vector3(0, 0.88, 0);

// split one group mesh into its identified muscles: connected surfaces (vertices welded by
// position), each large surface named by the rules in anatomy-parts.js, small fragments given to
// the nearest large surface. Returns [{ part, geometry }] or null if the rules don't apply.
function splitParts(mesh, group) {
  const g = mesh.geometry, pos = g.attributes.position, idx = g.index.array, n = pos.count;
  const parent = new Int32Array(n).map((_, i) => i);
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  const weld = new Map();
  for (let i = 0; i < n; i++) { const k = `${Math.round(pos.getX(i) * 1e5)},${Math.round(pos.getY(i) * 1e5)},${Math.round(pos.getZ(i) * 1e5)}`; const j = weld.get(k); if (j === undefined) weld.set(k, i); else parent[find(i)] = find(j); }
  for (let i = 0; i < idx.length; i += 3) { const a = find(idx[i]); parent[find(idx[i + 1])] = a; parent[find(idx[i + 2])] = a; }
  const comps = new Map();
  for (let i = 0; i < idx.length; i += 3) {
    const r = find(idx[i]); let c = comps.get(r);
    if (!c) comps.set(r, (c = { tris: 0, list: [], sum: [0, 0, 0], min: [1e9, 1e9, 1e9], max: [-1e9, -1e9, -1e9] }));
    c.tris++; c.list.push(i);
    for (let k = 0; k < 3; k++) { const v = idx[i + k], p = [pos.getX(v) + mesh.position.x, pos.getY(v) + mesh.position.y, pos.getZ(v) + mesh.position.z]; for (let a = 0; a < 3; a++) { c.sum[a] += p[a]; c.min[a] = Math.min(c.min[a], p[a]); c.max[a] = Math.max(c.max[a], p[a]); } }
  }
  const all = [...comps.values()].map((c) => ({ ...c, c: c.sum.map((v) => v / (c.tris * 3)) }));
  const total = idx.length / 3, big = all.filter((c) => c.tris / total >= 0.02);
  const named = identify(group, big); if (!named) return null;
  const partOf = new Map(named.map(([s, p]) => [s, p]));
  for (const c of all) if (!partOf.has(c)) { let best = null, bd = 1e9; for (const b of big) { const d = Math.hypot(b.c[0] - c.c[0], b.c[1] - c.c[1], b.c[2] - c.c[2]); if (d < bd) { bd = d; best = b; } } partOf.set(c, partOf.get(best)); }
  const byPart = {};
  for (const [c, p] of partOf) (byPart[p] ||= []).push(...c.list);
  return Object.entries(byPart).map(([part, tris]) => {
    const remap = new Map(), newIdx = [];
    for (const i of tris) for (let k = 0; k < 3; k++) { const v = idx[i + k]; let nv = remap.get(v); if (nv === undefined) remap.set(v, (nv = remap.size)); newIdx.push(nv); }
    const sub = new THREE.BufferGeometry();
    for (const [name, at] of Object.entries(g.attributes)) { const arr = new Float32Array(remap.size * at.itemSize); for (const [o, nv] of remap) for (let j = 0; j < at.itemSize; j++) arr[nv * at.itemSize + j] = at.array[o * at.itemSize + j]; sub.setAttribute(name, new THREE.BufferAttribute(arr, at.itemSize)); }
    sub.setIndex(newIdx); sub.computeBoundingSphere(); sub.computeBoundingBox();
    return { part, geometry: sub };
  });
}

export async function mountBody(stage, { onSelect = () => {}, onHover = () => {} } = {}) {
  const canvas = document.createElement("canvas");
  canvas.className = "bi-canvas";
  canvas.setAttribute("aria-label", "Your body in 3D. Drag to turn, pinch or scroll to zoom, two fingers to pan, tap a muscle to see its data.");
  stage.prepend(canvas);
  const pin = document.createElement("div"); pin.className = "bi-pin"; pin.hidden = true; stage.append(pin);

  // ---------- renderer: studio lighting, soft shadows, filmic tone mapping ----------
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  const maxDpr = () => Math.min(innerWidth < 700 ? 2 : 2.5, devicePixelRatio || 1);
  renderer.setPixelRatio(maxDpr());
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const bg = document.createElement("canvas"); bg.width = bg.height = 512;
  { const g = bg.getContext("2d"), r = g.createRadialGradient(256, 190, 10, 256, 260, 420); r.addColorStop(0, "#34363d"); r.addColorStop(0.45, "#1a1b20"); r.addColorStop(1, "#08080a"); g.fillStyle = r; g.fillRect(0, 0, 512, 512); }
  scene.background = new THREE.CanvasTexture(bg); scene.background.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.25;

  scene.add(new THREE.HemisphereLight("#fff6ee", "#2d2724", 0.45));
  const key = new THREE.DirectionalLight("#fff3e6", 2.2); key.position.set(1.3, 3.3, 2.6); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0004; key.shadow.normalBias = 0.012;
  Object.assign(key.shadow.camera, { left: -1.1, right: 1.1, top: 2.1, bottom: -0.3, near: 0.5, far: 8 }); key.shadow.camera.updateProjectionMatrix();
  scene.add(key);
  const fill = new THREE.DirectionalLight("#dfe7ff", 0.5); fill.position.set(-2.2, 1.2, 1.6); scene.add(fill);
  // a soft light from below-front lifts the shadows under the chest and arms, like a studio bounce card
  const bounce = new THREE.DirectionalLight("#ffe7dc", 0.25); bounce.position.set(0, -1, 2); scene.add(bounce);
  // two coloured rim lights outline the silhouette from behind, like a product shot
  const rimCool = new THREE.SpotLight("#9fc6ff", 10, 7, Math.PI / 5, 0.6); rimCool.position.set(-1.8, 2.4, -2.2); rimCool.target.position.set(0, 1, 0); scene.add(rimCool, rimCool.target);
  const rimWarm = new THREE.SpotLight("#ffc9a3", 7, 7, Math.PI / 5, 0.6); rimWarm.position.set(1.9, 1.2, -2.0); rimWarm.target.position.set(0, 0.9, 0); scene.add(rimWarm, rimWarm.target);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(1.6, 96), new THREE.ShadowMaterial({ opacity: 0.4 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  for (const [r, o] of [[0.62, 0.45], [0.75, 0.18]]) { const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.012, 160), new THREE.MeshBasicMaterial({ color: "#7c818d", transparent: true, opacity: o })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.001; scene.add(ring); }

  const camera = new THREE.PerspectiveCamera(28, 1, 0.01, 60);
  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(TARGET);
  Object.assign(controls, { enableDamping: true, dampingFactor: 0.08, minDistance: 0.25, maxDistance: 7, zoomToCursor: true, zoomSpeed: 1.15, screenSpacePanning: true, maxPolarAngle: Math.PI * 0.94, autoRotateSpeed: 1.0 });
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
  // distance that fits the whole figure (1.8 m tall, about 0.8 m wide with arms) in the stage
  const fitDistance = () => { const v = THREE.MathUtils.degToRad(camera.fov / 2), h = 2 * Math.atan(Math.tan(v) * camera.aspect) / 2; return Math.max(1.05 / Math.tan(v), 0.55 / Math.tan(h)); };
  const viewPos = (name) => { const d = fitDistance(), dir = { front: [0, 0.05, 1], back: [0, 0.05, -1], left: [1, 0.05, 0], right: [-1, 0.05, 0] }[name] || [0, 0.05, 1]; return new THREE.Vector3(...dir).normalize().multiplyScalar(d).add(TARGET); };

  // ---------- materials ----------
  const fibre = helpers.detail("fibre"), boneTex = helpers.detail("bone");
  // physical muscle with a view-dependent rim: surfaces turning away from the camera pick up a
  // faint edge light, which separates overlapping muscles and reads their shape
  function muscleMat() {
    // low clearcoat and sheen: strong white reflections would wash the heat colours out to pastels
    const m = new THREE.MeshPhysicalMaterial({ color: MUSCLE_BASE.clone(), roughness: 0.58, metalness: 0, clearcoat: 0.12, clearcoatRoughness: 0.45, sheen: 0.04, sheenRoughness: 0.7, sheenColor: new THREE.Color("#ffd2c6"), emissive: new THREE.Color("#000000") });
    m.bumpMap = fibre; m.bumpScale = 0.55;
    m.userData.rim = { value: new THREE.Color("#8a96ad").multiplyScalar(0.22) };
    m.onBeforeCompile = (sh) => {
      sh.uniforms.uRim = m.userData.rim;
      sh.fragmentShader = sh.fragmentShader.replace("void main() {", "uniform vec3 uRim;\nvoid main() {")
        .replace("#include <aomap_fragment>", "#include <aomap_fragment>\n  totalEmissiveRadiance += uRim * pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.5);");
    };
    m.customProgramCacheKey = () => "bi-muscle-rim";
    return m;
  }
  const boneMat = new THREE.MeshPhysicalMaterial({ color: "#a39a86", roughness: 0.66, clearcoat: 0.1, bumpMap: boneTex, bumpScale: 0.7 });
  const organMat = (c) => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.4, clearcoat: 0.6, clearcoatRoughness: 0.25, sheen: 0.3, sheenColor: new THREE.Color("#ffd0c8") });
  // selection outline: the selected muscle drawn again, slightly inflated, back faces only
  const outlineMat = new THREE.MeshBasicMaterial({ color: "#ffffff", side: THREE.BackSide, transparent: true, opacity: 0.9, depthWrite: false });
  outlineMat.onBeforeCompile = (sh) => { sh.vertexShader = sh.vertexShader.replace("#include <begin_vertex>", "vec3 transformed = position + normal * 0.0035;"); };

  // ---------- the model ----------
  const { byKey } = await loadAnatomy();
  const body = new THREE.Group(); scene.add(body);
  // Layer registry. Every mesh gets exactly one anatomical classification (userData.layer) and
  // visibility is applied per mesh from that classification, never by hiding parent groups, so a
  // toggle can only ever affect meshes of its own layer. X-ray is a separate, explicit setting that
  // only changes the opacity of muscle and bone; no layer toggle changes another layer's materials.
  //   muscles  · the 34 tracked muscle-group meshes (split into individual muscles) + untracked
  //              muscles (hands, feet, intercostals)
  //   skeleton · the 28 bones, including the skull, mandible and teeth
  //   organs   · heart and lungs
  //   skin     · the full translucent skin surface
  //   head     · the skin surface above the jaw, opaque and neutral. The model has no head or face
  //              muscles (its only head structures are the skull, organs and skin), so without this
  //              the muscle figure would be headless whenever the skeleton is hidden.
  const LAYERS = ["muscles", "skeleton", "organs", "skin", "head"];
  const shown = { muscles: true, skeleton: true, organs: false, skin: false, head: true };
  const registry = [];   // every mesh in the figure, each with userData.layer
  const register = (mesh, layer) => { mesh.userData.layer = layer; registry.push(mesh); body.add(mesh); return mesh; };
  const meshes = {}, pickables = [], partsOf = {};
  for (const k of ALL_KEYS) for (const src of take(byKey, k)) {
    const group = muscleOfKey(k), split = splitParts(src, group);
    for (const { part, geometry } of split || [{ part: null, geometry: src.geometry }]) {
      const mesh = new THREE.Mesh(geometry, muscleMat()); mesh.position.copy(src.position);
      mesh.castShadow = mesh.receiveShadow = true;
      mesh.userData = { key: k, muscle: group, part, pkey: part ? `${k}.${part}` : null };
      (meshes[k] ||= []).push(mesh); pickables.push(mesh); register(mesh, "muscles");
      if (part) (partsOf[group] ||= new Set()).add(part);
    }
  }
  // muscles the heat map doesn't track: hands, feet, the ribs' intercostals (same layer, not pickable)
  const neutral = muscleMat(); neutral.color.copy(NO_DATA);
  for (const k of ["hand_muscles_l", "hand_muscles_r", "foot_muscles_l", "foot_muscles_r", "intercostals_l", "intercostals_r"]) for (const mesh of take(byKey, k)) { mesh.material = neutral; mesh.castShadow = true; mesh.userData = { key: k }; register(mesh, "muscles"); }
  const SKELETON = ["skull", "mandible", "teeth", "spine_cervical", "spine_thoracic", "spine_lumbar", "ribs_l", "ribs_r", "sternum", "pelvis", "clavicle_l", "clavicle_r", "scapula_l", "scapula_r", "humerus_l", "humerus_r", "forearm_l", "forearm_r", "hand_l", "hand_r", "femur_l", "femur_r", "patella_l", "patella_r", "lower_leg_l", "lower_leg_r", "foot_l", "foot_r"];
  for (const k of SKELETON) for (const mesh of take(byKey, k)) { mesh.material = boneMat; mesh.castShadow = true; mesh.userData = { key: k }; register(mesh, "skeleton"); }
  const organs = {};
  for (const [k, c] of [["heart", "#a3262a"], ["lung_l", "#d98f8a"], ["lung_r", "#d98f8a"]]) for (const mesh of take(byKey, k)) { mesh.material = organMat(c); mesh.userData = { key: k, organ: k.startsWith("lung") ? "lung" : "heart", base: new THREE.Color(c) }; (organs[k] ||= []).push(mesh); register(mesh, "organs"); }
  const skinMat = new THREE.MeshPhysicalMaterial({ color: "#d4a184", roughness: 0.55, sheen: 0.7, sheenColor: new THREE.Color("#ffd6c2"), transparent: true, opacity: 0.22, depthWrite: false });
  const skinMeshes = take(byKey, "skin").map((m) => inflate(m));
  for (const mesh of skinMeshes) { mesh.material = skinMat; mesh.renderOrder = 3; mesh.userData = { key: "skin" }; register(mesh, "skin"); }
  // the head surface: the same skin geometry, kept only above the jaw (discarded below in the shader)
  const jaw = new THREE.Box3(); for (const m of take(byKey, "mandible")) jaw.expandByObject(m);
  const headCut = { value: jaw.isEmpty() ? 1.55 : jaw.min.y - 0.015 };
  const headMat = new THREE.MeshPhysicalMaterial({ color: "#7d7471", roughness: 0.62, clearcoat: 0.08, sheen: 0.2, sheenColor: new THREE.Color("#e8d6cc") });
  headMat.onBeforeCompile = (sh) => {
    sh.uniforms.uCut = headCut;
    sh.vertexShader = sh.vertexShader.replace("void main() {", "varying float vWY;\nvoid main() {").replace("#include <project_vertex>", "#include <project_vertex>\n  vWY = (modelMatrix * vec4(transformed, 1.0)).y;");
    sh.fragmentShader = sh.fragmentShader.replace("void main() {", "uniform float uCut; varying float vWY;\nvoid main() {\n  if (vWY < uCut) discard;");
  };
  headMat.customProgramCacheKey = () => "bi-head-surface";
  for (const src of skinMeshes) { const mesh = new THREE.Mesh(src.geometry, headMat); mesh.position.copy(src.position); mesh.castShadow = true; mesh.receiveShadow = true; mesh.userData = { key: "head" }; register(mesh, "head"); }

  // apply visibility and x-ray from the registry; each mesh depends only on its own layer
  function applyLayers() {
    for (const mesh of registry) mesh.visible = shown[mesh.userData.layer];
    const xr = state.xray;
    for (const mat of [boneMat, neutral]) if (mat.transparent !== xr) { mat.transparent = xr; mat.depthWrite = !xr; mat.needsUpdate = true; }
    boneMat.opacity = xr ? 0.25 : 1; neutral.opacity = xr ? 0.35 : 1;
    // transparent surfaces don't cast shadows (a see-through muscle shouldn't shade the organs)
    for (const mesh of registry) if (mesh.userData.layer === "muscles" || mesh.userData.layer === "skeleton") mesh.castShadow = !xr;
  }

  // ---------- painting ----------
  const state = { colours: {}, organColours: {}, partColours: {}, selected: null, selPart: null, hovered: null, hovPart: null, preview: null, xray: false, detail: false };
  const outlines = [];
  const isSel = (ud) => state.selected === ud.muscle && (!state.detail || !state.selPart || state.selPart === ud.part);
  function refresh() {
    for (const list of Object.values(meshes)) for (const mesh of list) {
      const ud = mesh.userData, c = (state.detail && ud.pkey && state.partColours[ud.pkey]) || state.colours[ud.key];
      // heat colours at full strength with a little self-light, so they stay saturated under bright studio light
      let col = c ? new THREE.Color(...c.rgb).multiplyScalar(0.7) : NO_DATA.clone();
      let glow = c ? new THREE.Color(...c.rgb).multiplyScalar(0.13) : new THREE.Color(0, 0, 0);
      if (state.preview) {   // exercise preview: primary and secondary muscles light up, the rest fade
        const w = state.preview[ud.muscle] || 0, pf = ud.part && state.previewParts?.[ud.muscle]?.[ud.part];
        const v = w * (pf ?? 1);
        col = v ? MUSCLE_BASE.clone().lerp(new THREE.Color("#ff5a3c"), 0.25 + 0.75 * v) : NO_DATA.clone().multiplyScalar(0.7);
        glow = v ? new THREE.Color("#ff4a2a").multiplyScalar(0.18 * v) : glow.set(0, 0, 0);
      }
      const sel = isSel(ud), hov = state.hovered === ud.muscle && (!state.detail || state.hovPart === ud.part), dim = state.selected && !sel;
      const mat = mesh.material;
      mat.color.copy(dim ? col.clone().lerp(NO_DATA, 0.5).multiplyScalar(0.45) : col);
      mat.emissive.copy(dim ? glow.clone().multiplyScalar(0.3) : sel ? glow.clone().add(WHITE.clone().multiplyScalar(0.12)) : hov ? glow.clone().add(WHITE.clone().multiplyScalar(0.08)) : glow);
      mat.userData.rim.value.set("#8a96ad").multiplyScalar(dim ? 0.08 : sel ? 0.5 : 0.22);
      if (mat.transparent !== state.xray) { mat.transparent = state.xray; mat.depthWrite = !state.xray; mat.needsUpdate = true; }   // switching transparency needs a shader recompile
      mat.opacity = state.xray ? 0.35 : 1;
    }
    for (const [k, list] of Object.entries(organs)) {
      const c = state.organColours[k];
      for (const mesh of list) { mesh.material.color.copy(c ? new THREE.Color(...c.rgb) : mesh.userData.base); mesh.material.emissive.copy(c ? new THREE.Color(...c.rgb).multiplyScalar(0.15) : new THREE.Color(0, 0, 0)); }
    }
    // outlines around the selection
    for (const o of outlines.splice(0)) o.removeFromParent();
    if (state.selected && !state.xray) for (const list of Object.values(meshes)) for (const mesh of list) if (isSel(mesh.userData)) { const o = new THREE.Mesh(mesh.geometry, outlineMat); o.position.copy(mesh.position); o.renderOrder = -1; body.add(o); outlines.push(o); }
  }
  refresh(); applyLayers();

  // ---------- picking ----------
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function hitAt(x, y) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    // only meshes that are visible can be picked; organs only when nothing opaque covers them
    const targets = [...pickables.filter((m) => m.visible), ...((state.xray || !shown.muscles) && shown.organs ? Object.values(organs).flat() : [])];
    return ray.intersectObjects(targets, false)[0] || null;
  }
  const label = (ud) => (ud.organ ? (ud.organ === "heart" ? "Heart" : "Lungs") : state.detail && ud.part ? partName(ud.muscle, ud.part) : MUSCLES[ud.muscle].name);
  let down = null, lastTap = 0, lastHover = 0;
  canvas.addEventListener("pointerdown", (e) => { down = [e.clientX, e.clientY]; tween = null; controls.autoRotate = false; });
  canvas.addEventListener("pointermove", (e) => {
    if (e.buttons || e.pointerType === "touch") return;
    const t = performance.now(); if (t - lastHover < 50) return; lastHover = t;
    const h = hitAt(e.clientX, e.clientY), ud = h?.object.userData || {};
    if (ud.muscle !== state.hovered || ud.part !== state.hovPart) { state.hovered = ud.muscle || null; state.hovPart = ud.part || null; refresh(); canvas.style.cursor = h ? "pointer" : "grab"; }
    const r = stage.getBoundingClientRect(); onHover(h ? label(ud) : null, e.clientX - r.left, e.clientY - r.top);
  });
  canvas.addEventListener("pointerleave", () => { if (state.hovered) { state.hovered = null; refresh(); } onHover(null); });
  canvas.addEventListener("pointerup", (e) => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
    const h = hitAt(e.clientX, e.clientY), now = performance.now();
    if (now - lastTap < 320 && h) { flyToPoint(h.point); lastTap = 0; return; }   // double tap: fly in
    lastTap = now;
    const ud = h?.object.userData || {};
    if (ud.muscle) { state.selected = ud.muscle; state.selPart = state.detail ? ud.part : null; state.preview = null; refresh(); onSelect(ud.muscle, { part: state.selPart }); }
    else if (ud.organ) onSelect(ud.organ, { organ: true });
    else { state.selected = null; state.selPart = null; refresh(); onSelect(null); }
  });

  // ---------- camera moves ----------
  let tween = null;
  function flyTo(pos, target) { tween = { p0: camera.position.clone(), p1: pos.clone(), t0: controls.target.clone(), t1: target.clone(), start: performance.now(), dur: reduce ? 1 : 750 }; }
  function flyToPoint(p) { const dir = camera.position.clone().sub(controls.target).normalize(), d = Math.max(0.45, camera.position.distanceTo(controls.target) * 0.45); flyTo(p.clone().add(dir.multiplyScalar(d)), p.clone()); }
  function selectionBox() {
    const box = new THREE.Box3();
    for (const list of Object.values(meshes)) for (const mesh of list) if (isSel(mesh.userData)) box.expandByObject(mesh);
    return box;
  }
  function focusSelection() {
    const box = selectionBox(); if (box.isEmpty()) return;
    const c = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3()).length();
    // look from the side of the body the muscle is on (front or back), keeping the current height
    const front = c.z >= -0.01 || ["chest_muscles", "abdominal_muscles", "quadriceps", "iliopsoas", "shin_muscles"].includes(state.selected);
    const dir = camera.position.clone().sub(controls.target).setY(0).normalize();
    if ((dir.z >= 0) !== front) dir.z = -dir.z;
    flyTo(c.clone().add(dir.multiplyScalar(Math.max(1.0, size * 2.4))).add(new THREE.Vector3(0, 0.05, 0)), c);
  }

  // ---------- render loop (paused when off screen or the tab is hidden) ----------
  let visible = true, raf = 0, sized = false;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); }).observe(stage);
  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    renderer.setPixelRatio(maxDpr()); renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    if (!sized) { camera.position.copy(viewPos("front")); sized = true; }
  }
  new ResizeObserver(resize).observe(stage); resize();
  const tmp = new THREE.Vector3();
  function placePin() {
    if (!state.selected) { pin.hidden = true; return; }
    const box = selectionBox(); if (box.isEmpty()) { pin.hidden = true; return; }
    box.getCenter(tmp); tmp.project(camera);
    if (tmp.z > 1) { pin.hidden = true; return; }
    pin.hidden = false;
    pin.style.transform = `translate(${((tmp.x + 1) / 2) * stage.clientWidth}px, ${((1 - tmp.y) / 2) * stage.clientHeight}px)`;
  }
  function loop() {
    cancelAnimationFrame(raf);
    if (!visible || document.hidden) return;
    raf = requestAnimationFrame(loop);
    if (tween) {
      const f = Math.min(1, (performance.now() - tween.start) / tween.dur), s = f * f * (3 - 2 * f);
      camera.position.lerpVectors(tween.p0, tween.p1, s); controls.target.lerpVectors(tween.t0, tween.t1, s);
      if (f >= 1) tween = null;
    }
    controls.update(); renderer.render(scene, camera); placePin();
  }
  document.addEventListener("visibilitychange", loop);
  loop();

  return {
    paint(colours = {}, organColours = {}, partColours = {}) { state.colours = colours; state.organColours = organColours; state.partColours = partColours; refresh(); },
    select(m, { part = null, zoom = false } = {}) {
      state.selected = m; state.selPart = part; state.preview = null; refresh();
      pin.textContent = m ? (part ? partName(m, part) : MUSCLES[m]?.name || "") : "";
      if (m && zoom) focusSelection();
    },
    preview(weights, partWeights = null) { state.preview = weights; state.previewParts = partWeights; state.selected = null; state.selPart = null; pin.hidden = true; refresh(); },
    detail(on) { state.detail = on; if (!on) state.selPart = null; refresh(); },
    parts: (m) => [...(partsOf[m] || [])],
    layer(name, on) {
      if (name === "xray") { state.xray = on; refresh(); applyLayers(); return; }
      if (!LAYERS.includes(name)) return;
      shown[name] = on;
      if (name === "muscles" && !on) { state.selected = null; state.selPart = null; refresh(); }   // can't keep a hidden muscle selected
      applyLayers();
    },
    layers: () => ({ ...shown, xray: state.xray }),
    view(name) { flyTo(viewPos(name === "reset" ? "front" : name), TARGET); },
    zoom(f) { const d = camera.position.clone().sub(controls.target); d.setLength(THREE.MathUtils.clamp(d.length() * f, controls.minDistance, controls.maxDistance)); flyTo(controls.target.clone().add(d), controls.target.clone()); },
    spin(on) { controls.autoRotate = on && !reduce; },
    focus: focusSelection,
    // for tests and screenshots
    _debug: { meshes, camera, controls, state, registry, shown, renderer, scene, render: () => renderer.render(scene, camera) },
  };
}
