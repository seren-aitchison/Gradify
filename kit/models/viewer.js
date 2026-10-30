// The Gradify 3D model viewer: one engine for every sub-site's interactive model (the body on
// MedGradify, a molar on DentalGradify, an engine on EngineerGradify...). Built with three.js
// (kit/vendor/three) and rendered in HD: studio lighting from an environment map, surface detail
// from generated bump textures, and a bloom pass that makes the holographic parts glow.
//
// A model is a module (kit/models/<name>.js) that describes its groups (systems, sections), its
// structures (what each part teaches: description, facts, flashcards, words that find it in your
// notes), a full page of notes for each group, and a build(k) function that makes the geometry
// with the helpers in k. The viewer does the rest: turning and zooming (scroll, pinch, the +/−
// buttons, double-click to fly in), picking, labels, pulling apart, the side panel, flashcards,
// "in your notes", a find-the-structure quiz, and the notes under the model.
//   import { mountModel } from "../kit/models/viewer.js";
//   mountModel(el, "MedGradify", (await import("../kit/models/body.js")).default);
import * as THREE from "../vendor/three/three.module.min.js";
import { OrbitControls } from "../vendor/three/OrbitControls.js";
import { EffectComposer } from "../vendor/three/addons/EffectComposer.js";
import { RenderPass } from "../vendor/three/addons/RenderPass.js";
import { UnrealBloomPass } from "../vendor/three/addons/UnrealBloomPass.js";
import { OutputPass } from "../vendor/three/addons/OutputPass.js";
import { RoomEnvironment } from "../vendor/three/addons/RoomEnvironment.js";
import { mergeVertices } from "../vendor/three/addons/BufferGeometryUtils.js";
import { LocalStore, CloudStore, scopeToSite } from "../data/store.js";

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");

// ---------- surface detail: small generated textures used as bump maps ----------
const textures = {};
function detail(kind) {
  if (kind === "none" || !kind) return null;
  if (textures[kind]) return textures[kind];
  const n = 256, c = document.createElement("canvas"); c.width = c.height = n;
  const g = c.getContext("2d"), img = g.createImageData(n, n), d = img.data;
  // cheap value noise, tiled
  const grid = (s) => { const a = []; for (let i = 0; i < s * s; i++) a.push(Math.random()); return (x, y) => {
    const fx = (x / n) * s, fy = (y / n) * s, x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
    const at = (i, j) => a[((j % s) * s + (i % s))];
    const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    return (at(x0, y0) * (1 - sx) + at(x0 + 1, y0) * sx) * (1 - sy) + (at(x0, y0 + 1) * (1 - sx) + at(x0 + 1, y0 + 1) * sx) * sy;
  }; };
  const n1 = grid(8), n2 = grid(32), n3 = grid(64);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    let v;
    if (kind === "fibre") v = 0.5 + 0.35 * Math.sin((x / n) * Math.PI * 2 * 48 + n1(x, y) * 6) + 0.15 * n3(x, y);   // muscle fibres along the length
    else if (kind === "bone") v = 0.55 * n2(x, y) + 0.45 * (n3(x, y) > 0.72 ? 0.1 : 0.6);                               // porous
    else if (kind === "fold") v = 0.5 + 0.5 * Math.sin(n1(x, y) * 22 + n2(x, y) * 4);                                    // brain gyri, gut folds
    else v = 0.5 * n1(x, y) + 0.3 * n2(x, y) + 0.2 * n3(x, y);                                                            // soft tissue
    const i = (y * n + x) * 4; d[i] = d[i + 1] = d[i + 2] = v * 255; d[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return (textures[kind] = t);
}

// a colour version of a detail texture, multiplied into the material's colour: muscle striations
// with pale fascia streaks, mottled soft tissue, porous bone
const tones = {};
function tone(kind) {
  if (kind === "none" || !kind) return null;
  if (tones[kind]) return tones[kind];
  const src = detail(kind).image, c = document.createElement("canvas"); c.width = src.width; c.height = src.height;
  const g = c.getContext("2d"); g.drawImage(src, 0, 0);
  const img = g.getImageData(0, 0, c.width, c.height), d = img.data;
  const lo = { fibre: 0.62, bone: 0.86, fold: 0.8, tissue: 0.8 }[kind] ?? 0.82;
  for (let i = 0; i < d.length; i += 4) {
    let v = lo + (1 - lo) * (d[i] / 255);
    let r = v, gg = v, b = v;
    if (kind === "fibre" && d[i] > 235) { r = 1.25; gg = 1.18; b = 1.12; }   // thin pale streaks of fascia between fibre bundles
    d[i] = Math.min(255, r * 235); d[i + 1] = Math.min(255, gg * 235); d[i + 2] = Math.min(255, b * 235);
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace;
  return (tones[kind] = t);
}

// ---------- materials ----------
// a hologram that glows at its edges (fresnel), so you see through it: skin, outlines, ghosts
function holo(colour = "#5ef0ff", base = "#0d3b52", opacity = 0.55) {
  return new THREE.ShaderMaterial({
    uniforms: { uOpacity: { value: opacity }, uBase: { value: new THREE.Color(base) }, uRim: { value: new THREE.Color(colour) }, uTime: { value: 0 } },
    vertexShader: `varying vec3 vN; varying vec3 vV; varying float vY;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); vY = (modelMatrix*vec4(position,1.0)).y; gl_Position = projectionMatrix*mv; }`,
    fragmentShader: `uniform float uOpacity; uniform vec3 uBase; uniform vec3 uRim; uniform float uTime; varying vec3 vN; varying vec3 vV; varying float vY;
      void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.4);
        float scan = smoothstep(0.035, 0.0, abs(vY - (0.95 + 0.9*sin(uTime*0.45))));
        float lines = 0.5 + 0.5*sin(vY*260.0);
        vec3 c = mix(uBase, uRim, f) * 1.35 + uRim*scan*0.8;
        gl_FragColor = vec4(c, uOpacity*(0.08 + f*1.25 + scan*0.5) * (0.85 + 0.15*lines)); }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.FrontSide,
  });
}
function mat(c, { detail: d = "tissue", repeat = 2, bump = 0.6, ...extra } = {}) {
  const m = new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.42, metalness: 0.02, clearcoat: 0.55, clearcoatRoughness: 0.35, sheen: 0.25, sheenColor: new THREE.Color(c).lerp(new THREE.Color("#ffffff"), 0.4), emissive: new THREE.Color(c).multiplyScalar(0.07), ...extra });
  const t = detail(d);
  if (t) { m.bumpMap = t.clone(); m.bumpMap.needsUpdate = true; m.bumpMap.repeat.set(repeat, repeat); m.bumpScale = bump; }
  if (t && mat.realistic && !extra.map) { m.map = tone(d).clone(); m.map.needsUpdate = true; m.map.repeat.set(repeat, repeat); }
  return m;
}
const bone = (c = "#ece5d2") => mat(c, { detail: "bone", repeat: 3, bump: 0.8, roughness: 0.6, clearcoat: 0.15, sheen: 0, emissive: new THREE.Color("#221e15") });
const glow = (c, opacity = 0.9) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false });

// ---------- geometry helpers ----------
function limb(a, b, r, m, capsule = true, r2) {
  const len = a.distanceTo(b);
  const geo = capsule ? new THREE.CapsuleGeometry(r, Math.max(0.001, len - 2 * r), 10, 24) : new THREE.CylinderGeometry(r2 ?? r, r, len, 24);
  const mesh = new THREE.Mesh(geo, m);
  mesh.position.copy(a).lerp(b, 0.5);
  mesh.quaternion.setFromUnitVectors(V(0, 1, 0), b.clone().sub(a).normalize());
  return mesh;
}
const tube = (pts, r, m, seg = 64, closed = false, radial = 14) => new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, closed), seg, r, radial, closed), m);
// a tube that tapers from r0 to r1
function taper(pts, r0, r1, m, seg = 64) {
  const g = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), seg, 1, 14, false), p = g.attributes.position, cur = new THREE.CatmullRomCurve3(pts), c = new THREE.Vector3(), v = new THREE.Vector3();
  for (let i = 0; i <= seg; i++) { const t = i / seg, r = r0 + (r1 - r0) * t; cur.getPointAt(t, c); for (let j = 0; j <= 14; j++) { const k = i * 15 + j; v.fromBufferAttribute(p, k).sub(c).multiplyScalar(r).add(c); p.setXYZ(k, v.x, v.y, v.z); } }
  g.computeVertexNormals();
  return new THREE.Mesh(g, m);
}
// a sphere with its vertices moved by a function, for organ shapes
function blob(r, sx, sy, sz, shape, seg = 64) {
  const g = new THREE.SphereGeometry(r, seg, seg), p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); v.set(v.x * sx, v.y * sy, v.z * sz); if (shape) shape(v); p.setXYZ(i, v.x, v.y, v.z); }
  g.computeVertexNormals();
  return g;
}
const lathe = (profile, m, seg = 64) => new THREE.Mesh(new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), seg), m);
function box(w, h, d, m, r = 0) {
  if (!r) return new THREE.Mesh(new THREE.BoxGeometry(w, h, d, 2, 2, 2), m);
  // a rounded box: a box with its corners pulled onto spheres
  const g = new THREE.BoxGeometry(w, h, d, 12, 12, 12), p = g.attributes.position, v = new THREE.Vector3(), inner = V(w / 2 - r, h / 2 - r, d / 2 - r);
  for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); const c = v.clone().clamp(inner.clone().negate(), inner); const off = v.clone().sub(c); if (off.lengthSq() > 0) off.setLength(r); v.copy(c).add(off); p.setXYZ(i, v.x, v.y, v.z); }
  g.computeVertexNormals();
  return new THREE.Mesh(g, m);
}
// a flat text label that always faces the camera
function text(str, { size = 0.06, colour = "#eaffff", bg = null, weight = 600 } = {}) {
  const c = document.createElement("canvas"), g = c.getContext("2d"), px = 64;
  g.font = `${weight} ${px}px Geist, system-ui, sans-serif`;
  const w = Math.ceil(g.measureText(str).width) + 40; c.width = w; c.height = px + 36;
  g.font = `${weight} ${px}px Geist, system-ui, sans-serif`; g.textBaseline = "middle";
  if (bg) { g.fillStyle = bg; g.beginPath(); g.roundRect(0, 0, w, c.height, c.height / 2); g.fill(); }
  g.fillStyle = colour; g.fillText(str, 20, c.height / 2 + 2);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, depthTest: false })); s.renderOrder = 10;   // labels stay readable in front of the model
  s.scale.set((size * w) / c.height, size, 1);
  return s;
}
// keep only the part of a shape on one side of a plane, flattened onto it (lung lobes, cut-away organs)
function slice(geo, planes, gap = 0.002) {
  const g = geo.clone(), p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    for (const [pt, n] of planes) { const d = v.clone().sub(pt).dot(n); if (d < gap) v.addScaledVector(n, gap - d); }
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}
// remove the triangles on the far side of a plane (a skull with its cap lifted off)
function cut(geo, pt, n) {
  const g = geo.index ? geo.toNonIndexed() : geo.clone(), p = g.attributes.position, keep = [], v = new THREE.Vector3();
  for (let i = 0; i < p.count; i += 3) {
    let out = 0; for (let j = 0; j < 3; j++) { v.fromBufferAttribute(p, i + j); if (v.clone().sub(pt).dot(n) > 0) out++; }
    if (out < 3) for (let j = 0; j < 3; j++) keep.push(p.getX(i + j), p.getY(i + j), p.getZ(i + j));
  }
  const out = new THREE.BufferGeometry(); out.setAttribute("position", new THREE.Float32BufferAttribute(keep, 3));
  const smooth = mergeVertices(out, 1e-6); smooth.computeVertexNormals();   // re-join shared corners so it shades smoothly
  return smooth;
}
const line = (pts, c, opacity = 0.8) => new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: c, transparent: true, opacity, blending: mat.realistic ? THREE.NormalBlending : THREE.AdditiveBlending, depthWrite: false }));
// a muscle that wraps part of the way round a limb or the trunk, like the muscle layer in an
// anatomy atlas: a curved sheet over the axis a→b, between angles th0 and th1 (0 = lateral,
// π/2 = front, −π/2 = back; side −1 mirrors it for the patient's right), lying on a surface of
// radius r(t) (sx, sz squash it into an ellipse), swelling to `thick` in its belly. Its two ends
// turn into pale tendon, and `bands` (fractions along it) add tendinous lines across it.
function wrap({ a, b, r, th0, th1, side = 1, sx = 1, sz = 1, thick = 0.012, t0 = 0, t1 = 1, tendon = 0.14, bands = [], narrow = 0.55, colour = "#a8352c", segU = 48, segV = 28, front = new THREE.Vector3(0, 0, 1) }) {
  const d = b.clone().sub(a).normalize(), Z = front.clone().sub(d.clone().multiplyScalar(front.dot(d))).normalize(), X = new THREE.Vector3().crossVectors(d, Z).normalize();
  if (X.x < 0) X.negate();   // angle 0 always points to the model's +x side, whichever way the axis runs
  const len = a.distanceTo(b), pos = [], uv = [], col = [], idx = [], c = new THREE.Color(colour), pale = new THREE.Color("#efe6d8"), tmp = new THREE.Color();
  const rr = typeof r === "function" ? r : () => r;
  for (let i = 0; i <= segU; i++) {
    const u = i / segU, t = t0 + (t1 - t0) * u;
    for (let j = 0; j <= segV; j++) {
      // fusiform: the muscle narrows towards its tendons (narrow 0 keeps a flat sheet's full width)
      const w = 1 - narrow * (1 - Math.sin(Math.PI * u) ** 0.8), vm = 0.5 + (j / segV - 0.5) * w, v = j / segV;
      const th0s = side < 0 ? Math.PI - th0 : th0, th1s = side < 0 ? Math.PI - th1 : th1, th = th0s + (th1s - th0s) * vm;
      const belly = Math.sin(Math.PI * u) ** 0.7 * Math.sin(Math.PI * v) ** 0.45;
      let dip = 1; for (const bd of bands) dip *= 1 - 0.45 * Math.exp(-(((u - bd) / 0.014) ** 2));
      const R = rr(t) + thick * belly * dip + 0.0015;
      const p = a.clone().add(d.clone().multiplyScalar(t * len)).add(X.clone().multiplyScalar(Math.cos(th) * R * sx)).add(Z.clone().multiplyScalar(Math.sin(th) * R * sz));
      pos.push(p.x, p.y, p.z); uv.push(v * Math.max(1, (Math.abs(th1 - th0) * rr(t)) / 0.1), u * Math.max(1, len * (t1 - t0) / 0.06));
      const tend = Math.max(0, 1 - Math.min(u, 1 - u) / tendon) ** 2.2, line = 1 - dip;
      tmp.copy(c).lerp(pale, Math.min(1, tend * 0.9 + line * 1.4)); col.push(tmp.r, tmp.g, tmp.b);
    }
  }
  for (let i = 0; i < segU; i++) for (let j = 0; j < segV; j++) { const q = i * (segV + 1) + j; idx.push(q, q + segV + 1, q + 1, q + 1, q + segV + 1, q + segV + 2); }
  const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2)); g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3)); g.setIndex(idx); g.computeVertexNormals();
  const m = mat("#ffffff", { detail: "fibre", repeat: 1, bump: 1.6, roughness: 0.5, clearcoat: 0.45, vertexColors: true, side: THREE.DoubleSide, emissive: new THREE.Color("#000000"), sheen: 0.3, sheenColor: new THREE.Color("#ffc8b8") });
  return new THREE.Mesh(g, m);
}
export const helpers = { V, holo, mat, bone, glow, limb, tube, taper, blob, lathe, box, text, line, detail, slice, cut, wrap };

export async function mountModel(root, siteName, model) {
  const G = model.groups, S = model.structures;
  const cam = { pos: [0, 1, 3.6], target: [0, 0.9, 0], min: 0.06, max: 6, fov: 32, ...model.camera };
  const sliders = [...(model.sliders || []), ...(model.explode === false ? [] : [{ key: "explode", label: "Pull apart", value: 0 }])];
  // every model is shown like an anatomy app (studio light, real materials, no glow) unless it asks
  // for the holographic look with look: "holo"
  const studio = model.look !== "holo";
  mat.realistic = studio;
  root.classList.add("mv"); if (studio) root.classList.add("mv-studio");
  root.innerHTML = `
    <div class="mv-top-row">
      <div class="mv-stage">
        <canvas class="mv-canvas" aria-label="${esc(model.title)}: a 3D model. Drag to turn, scroll or pinch to zoom, double-click to fly in, click a part to learn about it."></canvas>
        <div class="mv-labels" aria-hidden="true"></div>
        <div class="mv-tip" aria-hidden="true" hidden></div>
        <div class="mv-groups" role="group" aria-label="Show or hide">${Object.entries(G).map(([k, g]) => `<button type="button" class="mv-grp${g.off ? "" : " on"}" data-grp="${k}" aria-pressed="${!g.off}" style="--c:${g.c}"><i></i>${esc(g.name)}</button>`).join("")}</div>
        <div class="mv-quizbar" hidden><span class="mv-q"></span><span class="mv-score"></span><button type="button" class="mv-quit">End quiz</button></div>
        <div class="mv-zoom" role="group" aria-label="Zoom"><button type="button" data-zoom="in" aria-label="Zoom in">+</button><button type="button" data-zoom="out" aria-label="Zoom out">−</button><button type="button" data-zoom="reset" aria-label="Reset the view">⟲</button></div>
        <div class="mv-views">${Object.keys(model.views || {}).map((v) => `<button type="button" data-view="${esc(v)}">${esc(v)}</button>`).join("")}</div>
        <p class="mv-hint">Drag to turn · scroll or pinch to zoom · double-click to fly in</p>
        ${model.credit ? `<p class="mv-credit">${esc(model.credit)} <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a></p>` : ""}
      </div>
      <aside class="mv-side">
        <div class="mv-controls">
          ${sliders.map((s) => `<label><span>${esc(s.label)}</span><input type="range" min="0" max="100" value="${s.value}" data-slider="${s.key}" aria-label="${esc(s.label)}"></label>`).join("")}
          <div class="mv-toggles">
            ${model.motion ? `<label class="switch"><input type="checkbox" data-ctl="motion" role="switch" ${reduce ? "" : "checked"}><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span><span>${esc(model.motion)}</span></label>` : ""}
            <label class="switch"><input type="checkbox" data-ctl="labels" role="switch"><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span><span>Labels</span></label>
            <label class="switch"><input type="checkbox" data-ctl="spin" role="switch"><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span><span>Turn slowly</span></label>
          </div>
          <button type="button" class="btn btn-light lg btn-sm mv-quiz"><span>Quiz me: ${esc(model.quiz || "find the part")}</span></button>
        </div>
        <div class="mv-info" aria-live="polite"></div>
      </aside>
    </div>
    <section class="mv-notes" aria-label="Notes">
      <div class="mv-tabs" role="tablist">${Object.entries(G).map(([k, g], i) => `<button type="button" role="tab" class="mv-tab" data-tab="${k}" aria-selected="${i === 0}" style="--c:${g.c}"><i></i>${esc(model.notes?.[k]?.title || g.name)}</button>`).join("")}</div>
      <article class="mv-page"></article>
    </section>`;
  const $ = (s) => root.querySelector(s);
  const canvas = $(".mv-canvas"), stage = $(".mv-stage");

  // ---------- renderer: HD, with environment lighting and bloom ----------
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // "studio" models (the body) look like an anatomy atlas: a neutral backdrop, white studio light,
  // real shadows and no glow. The rest keep Gradify's holographic look.
  if (studio) { renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.toneMappingExposure = 1.0; }
  const scene = new THREE.Scene();
  const bg = document.createElement("canvas"); bg.width = bg.height = 512;
  { const g = bg.getContext("2d"), r = g.createRadialGradient(256, 220, 10, 256, 256, 380); r.addColorStop(0, studio ? "#4a4a4f" : model.bg?.[0] || "#123c4c"); r.addColorStop(0.55, studio ? "#2a2a2e" : model.bg?.[1] || "#061620"); r.addColorStop(1, studio ? "#141416" : "#020609"); g.fillStyle = r; g.fillRect(0, 0, 512, 512); }   // the studio is always neutral grey
  scene.background = new THREE.CanvasTexture(bg); scene.background.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = model.envIntensity ?? (studio ? 0.7 : 0.4);
  const camera = new THREE.PerspectiveCamera(cam.fov, 1, 0.005, 80);
  camera.position.set(...cam.pos);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(...cam.target);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = cam.min; controls.maxDistance = cam.max;
  controls.zoomToCursor = true; controls.zoomSpeed = 1.2;
  controls.maxPolarAngle = model.maxPolar ?? Math.PI * 0.92;
  controls.autoRotateSpeed = 1.2;

  scene.add(new THREE.HemisphereLight(studio ? "#fff6ee" : "#bfe6ff", studio ? "#3a3430" : "#1a1022", studio ? 0.55 : 0.7));
  const key = new THREE.DirectionalLight(studio ? "#fff4e8" : "#ffffff", studio ? 2.4 : 2.0); key.position.set(1.5, 3, 2.5); scene.add(key);
  const fill = new THREE.DirectionalLight(studio ? "#e8eeff" : "#9fdcff", 0.6); fill.position.set(-2, 1, 1.5); scene.add(fill);
  const rimA = new THREE.PointLight(studio ? "#ffffff" : "#5ef0ff", studio ? 2 : 5, 8); rimA.position.set(-1.6, 1.6, -1.2); scene.add(rimA);
  const rimB = new THREE.PointLight(studio ? "#ffe8d8" : "#f055dd", studio ? 1.5 : 3, 8); rimB.position.set(1.6, 0.6, -1.4); scene.add(rimB);
  if (studio) {
    key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0004; key.shadow.normalBias = 0.01;
    Object.assign(key.shadow.camera, { left: -1.2, right: 1.2, top: 2.2, bottom: -0.4, near: 0.5, far: 8 }); key.shadow.camera.updateProjectionMatrix();
  }

  // the platform: glowing rings and a faint polar grid under the model
  const platform = new THREE.Group();
  if (studio && model.platform !== false) {
    // a plain floor that catches the model's shadow
    const floor = new THREE.Mesh(new THREE.CircleGeometry(model.platform?.r ? model.platform.r * 2.5 : 1.4, 96), new THREE.ShadowMaterial({ opacity: 0.35 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; platform.add(floor);
    platform.position.y = model.platform?.y ?? 0; scene.add(platform);
  } else if (model.platform !== false) {
    const pr = model.platform?.r ?? 0.55;
    for (const [r, w, o] of [[1, 0.022, 0.9], [1.27, 0.011, 0.5], [1.64, 0.007, 0.3]]) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(pr * r - pr * w, pr * r + pr * w, 160), glow("#5ef0ff", o)); ring.material.side = THREE.DoubleSide;
      ring.rotation.x = -Math.PI / 2; platform.add(ring);
    }
    const disc = new THREE.Mesh(new THREE.CircleGeometry(pr, 128), new THREE.MeshBasicMaterial({ color: "#0b3a4a", transparent: true, opacity: 0.35, depthWrite: false }));
    disc.rotation.x = -Math.PI / 2; platform.add(disc);
    const grid = new THREE.PolarGridHelper(pr * 4, 16, 8, 96, "#1d5a6b", "#0f3542"); grid.material.transparent = true; grid.material.opacity = 0.35; grid.position.y = -0.001; platform.add(grid);
    platform.position.y = model.platform?.y ?? 0;
    scene.add(platform);
  }

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  if (!studio) composer.addPass(new UnrealBloomPass(new THREE.Vector2(256, 256), model.bloom ?? 0.28, 0.5, 0.9));
  composer.addPass(new OutputPass());

  // ---------- the model ----------
  const body = new THREE.Group(); scene.add(body);
  const groups = {}; for (const k of Object.keys(G)) { groups[k] = new THREE.Group(); groups[k].visible = !G[k].off; body.add(groups[k]); }
  const pickables = [], parts = {}, ticks = [], flows = [], onSlider = {}, attached = [];
  // in the studio look, the holographic helpers make real materials instead: see-through skin or
  // glass in place of the fresnel hologram, solid colour in place of additive glow, no self-lighting
  const studioHolo = (colour = "#5ef0ff", base, opacity = 0.35) => {
    const skinTone = colour === "#5ef0ff";
    const m = new THREE.MeshPhysicalMaterial({ color: skinTone ? "#d4a184" : colour, roughness: skinTone ? 0.55 : 0.2, sheen: skinTone ? 0.7 : 0, sheenColor: new THREE.Color("#ffd6c2"), clearcoat: skinTone ? 0.08 : 0.6, transparent: true, opacity: Math.min(0.45, opacity), depthWrite: false });
    m.uniforms = { uOpacity: { get value() { return m.opacity; }, set value(v) { m.opacity = Math.min(0.6, v); } } };   // models fade skin through uOpacity
    return m;
  };
  const studioGlow = (c, opacity = 0.9) => new THREE.MeshBasicMaterial({ color: c, transparent: opacity < 1, opacity, depthWrite: opacity >= 1 });
  const studioMat = (c, o = {}) => helpers.mat(c, { ...o, emissive: o.emissive ? new THREE.Color(o.emissive).multiplyScalar(0.25) : new THREE.Color("#000000") });
  const k = {
    THREE, ...helpers, ...(studio ? { holo: studioHolo, glow: studioGlow, mat: studioMat } : {}), scene, camera, root: body, groups,
    add(id, mesh) {
      if (!S[id]) throw new Error(`No structure called ${id}`);
      // a mesh, or a group of meshes that moves as one (a heart of chambers, a lung of lobes)
      const p = (parts[id] ||= { id, objs: [], meshes: [] });
      p.objs.push(mesh);
      mesh.traverse((m) => { if (m.isMesh) { m.userData.id = id; p.meshes.push(m); pickables.push(m); } });
      // parts already placed in the model's own hierarchy (a rig that animates) stay there
      if (mesh.parent) { mesh.userData.group = S[id].group; attached.push(mesh); } else groups[S[id].group].add(mesh);
      return mesh;
    },
    decor(obj, grp) { (grp ? groups[grp] : body).add(obj); return obj; },
    tick(fn) { ticks.push(fn); },
    slider(key, fn) { onSlider[key] = fn; },
    // small glowing points travelling along paths: blood flow, impulses, electrons, money...
    flow(paths, colour, n, speed, grp, size = 0.012) {
      const curves = paths.map((p) => (p.getPointAt ? p : new THREE.CatmullRomCurve3(p)));
      const geo = new THREE.BufferGeometry(), pos = new Float32Array(n * 3), seeds = [];
      for (let i = 0; i < n; i++) seeds.push([i % curves.length, Math.random()]);
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: colour, size: studio ? size * 0.7 : size, transparent: true, opacity: studio ? 0.85 : 0.95, blending: studio ? THREE.NormalBlending : THREE.AdditiveBlending, depthWrite: false }));
      pts.frustumCulled = false;
      flows.push({ pts, curves, seeds, speed, pos });
      (grp ? groups[grp] : body).add(pts);
      return pts;
    },
  };
  await model.build(k);
  scene.updateMatrixWorld(true);
  if (studio) body.traverse((o) => { if (o.isMesh && !o.material.transparent) { o.castShadow = true; o.receiveShadow = true; } });

  // where each part sits, for pulling apart, focus and labels
  const all = new THREE.Box3().setFromObject(body);
  const centre = model.centre ? V(...model.centre) : all.getCenter(new THREE.Vector3());
  for (const p of Object.values(parts)) {
    const b = new THREE.Box3(); p.objs.forEach((m) => b.expandByObject(m));
    p.centre = b.getCenter(new THREE.Vector3()); p.size = b.getSize(new THREE.Vector3()).length();
    p.objs.forEach((m) => { m.userData.home = m.position.clone(); });
    p.meshes.forEach((m) => { m.userData.mat = m.material; });
  }

  // ---------- state ----------
  const state = { visible: new Set(Object.keys(G).filter((g) => !G[g].off)), selected: null, hovered: null, explode: 0, motion: !reduce, labels: false, spin: false, quiz: null, tab: Object.keys(G)[0] };
  const highlight = new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#5ef0ff", emissiveIntensity: 0.75, roughness: 0.3 });
  const hoverMat = new THREE.MeshStandardMaterial({ color: "#d8fbff", emissive: "#5ef0ff", emissiveIntensity: 0.35, roughness: 0.35 });
  function paint() {
    for (const p of Object.values(parts)) for (const m of p.meshes) {
      const on = p.id === state.selected ? "sel" : p.id === state.hovered ? "hov" : null;
      if (!studio) { m.material = on === "sel" ? highlight : on === "hov" ? hoverMat : m.userData.mat; continue; }
      // in the studio look, a picked part keeps its own colour and texture, lit with a soft warm glow
      if (!on || Array.isArray(m.userData.mat)) { m.material = m.userData.mat; continue; }
      const tint = (m.userData.tint ||= {});
      tint[on] ||= (() => { const c = m.userData.mat.clone(); if (c.emissive) { c.emissive = new THREE.Color(on === "sel" ? "#ffcf8a" : "#ffe6c4"); c.emissiveIntensity = on === "sel" ? 0.45 : 0.2; } return c; })();
      m.material = tint[on];
    }
  }

  // ---------- the side panel ----------
  const info = $(".mv-info");
  let mine = null;
  async function myCards() {
    if (mine) return mine;
    try {
      const cloud = await CloudStore.create(), user = cloud ? await cloud.user() : null;
      const store = scopeToSite(user ? cloud : new LocalStore(), siteName);
      mine = { store, cards: await store.listCards() };
    } catch { mine = { store: null, cards: [] }; }
    return mine;
  }
  async function saveCards(title, text, list, btn) {
    btn.disabled = true;
    const { store } = await myCards();
    if (!store) { btn.querySelector("span").textContent = "Couldn't save on this device"; return; }
    const doc = await store.addDocument({ title, site: siteName, text });
    await store.addCards(list.map(([front, back, topic]) => ({ document_id: doc.id, topic, front, back, kind: /^(why|explain|how does|how do)/i.test(front) ? "why" : "definition", source_quote: null, grounded: "bonus" })));
    mine = null;
    btn.outerHTML = `<a class="btn btn-light lg btn-sm" href="app.html#/deck/${doc.id}"><span>Added ✓ Study them now</span></a>`;
  }
  async function showInfo(id) {
    const s = S[id], g = G[s.group];
    info.style.setProperty("--c", g.c);
    info.innerHTML = `
      <span class="kicker">${esc(g.name)}</span>
      <h3>${esc(s.name)}</h3>
      <p>${rich(s.desc)}</p>
      <ul class="mv-facts">${s.facts.map((f) => `<li>${rich(f)}</li>`).join("")}</ul>
      <div class="mv-mine"></div>
      <div class="mv-actions"><button type="button" class="btn btn-light lg btn-sm" data-act="cards"><span>Make ${s.cards.length} flashcards</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-act="focus"><span>Zoom in</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-act="notes"><span>Read the notes ↓</span></button></div>`;
    const { cards } = await myCards();
    const keys = s.keys || [s.name.toLowerCase()];
    const hits = cards.filter((c) => keys.some((w) => `${c.front} ${c.back} ${c.topic}`.toLowerCase().includes(w)));
    const topics = [...new Set(hits.map((c) => `${c.document_id}|${c.topic || "Cards"}`))];
    if (state.selected === id) info.querySelector(".mv-mine").innerHTML = hits.length
      ? `<b>In your notes</b><span>${hits.length} ${hits.length === 1 ? "card" : "cards"} in ${topics.length} ${topics.length === 1 ? "topic" : "topics"}.</span>${topics.slice(0, 3).map((t) => `<a href="app.html#/topic/${encodeURIComponent(t)}">${esc(t.split("|")[1])} →</a>`).join("")}`
      : `<b>In your notes</b><span>Nothing on ${esc(s.name.toLowerCase())} yet.</span>`;
  }
  function showIntro() {
    info.style.setProperty("--c", "#5ef0ff");
    info.innerHTML = `<span class="kicker">${esc(model.kicker || "3D model")}</span><h3>${esc(model.intro?.title || model.title)}</h3><p>${rich(model.intro?.text || "Click any part to learn about it, make flashcards from it, or find it in your notes.")}</p>
      <ul class="mv-facts">${Object.entries(G).map(([g, x]) => `<li><button type="button" class="mv-jump" data-jump="${Object.keys(S).find((id) => S[id].group === g)}" style="--c:${x.c}">${esc(x.name)} →</button></li>`).join("")}</ul>`;
  }
  info.addEventListener("click", async (e) => {
    const j = e.target.closest("[data-jump]"); if (j) return select(j.dataset.jump, true);
    const act = e.target.closest("[data-act]")?.dataset.act; if (!act || !state.selected) return;
    const s = S[state.selected];
    if (act === "focus") return focus(state.selected);
    if (act === "notes") { openTab(s.group); return $(".mv-notes").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
    if (act === "cards") saveCards(`${model.title}: ${s.name}`, [s.desc, ...s.facts].join("\n"), s.cards.map(([q, a]) => [q, a, s.name]), e.target.closest("button"));
  });

  // ---------- the notes under the model: a full page for each group ----------
  const page = $(".mv-page");
  function openTab(g) {
    state.tab = g;
    root.querySelectorAll(".mv-tab").forEach((t) => t.setAttribute("aria-selected", String(t.dataset.tab === g)));
    const n = model.notes?.[g] || { title: G[g].name, sections: [] }, ids = Object.keys(S).filter((id) => S[id].group === g);
    const cards = ids.flatMap((id) => S[id].cards.map(([q, a]) => [q, a, S[id].name]));
    page.style.setProperty("--c", G[g].c);
    page.innerHTML = `
      <header><span class="kicker">${esc(G[g].name)} · notes</span><h2>${esc(n.title)}</h2>${n.lead ? `<p class="mv-lead">${rich(n.lead)}</p>` : ""}
        <div class="mv-chips"><span>In the model:</span>${ids.map((id) => `<button type="button" data-show="${id}">${esc(S[id].name)}</button>`).join("")}</div></header>
      <div class="mv-cols">${n.sections.map(([h, ...items]) => {
        let html = "", list = [];
        const flush = () => { if (list.length) { html += `<ul>${list.map((x) => `<li>${rich(x)}</li>`).join("")}</ul>`; list = []; } };
        for (const it of items) {
          if (it.startsWith("- ")) { list.push(it.slice(2)); continue; }
          flush();
          if (it.startsWith("! ")) html += `<aside class="mv-clin"><b>${esc(model.calloutName || "In practice")}</b>${rich(it.slice(2))}</aside>`;
          else if (it.startsWith("> ")) html += `<p class="mv-key">${rich(it.slice(2))}</p>`;
          else html += `<p>${rich(it)}</p>`;
        }
        flush();
        return `<section><h3>${esc(h)}</h3>${html}</section>`;
      }).join("")}</div>
      <footer><button type="button" class="btn btn-light lg btn-sm" data-section-cards><span>Make ${cards.length} flashcards from this section</span></button><a class="btn btn-ghost lg btn-sm" href="app.html#/notes"><span>Add your own notes</span></a></footer>`;
    page.querySelector("[data-section-cards]").onclick = (e) => saveCards(`${model.title}: ${n.title}`, n.sections.map(([h, ...x]) => `${h}\n${x.join("\n")}`).join("\n\n"), cards, e.currentTarget);
  }
  $(".mv-tabs").addEventListener("click", (e) => { const t = e.target.closest("[data-tab]"); if (t) openTab(t.dataset.tab); });
  page.addEventListener("click", (e) => {
    const b = e.target.closest("[data-show]"); if (!b) return;
    stage.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    select(b.dataset.show, true);
  });

  // ---------- picking ----------
  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
  const shown = (m) => { for (let o = m; o; o = o.parent) if (!o.visible) return false; return true; };
  function hitAt(e) {
    const r = canvas.getBoundingClientRect();
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(mouse, camera);
    return ray.intersectObjects(pickables.filter(shown), false)[0] || null;
  }
  const tip = $(".mv-tip");
  let down = null;
  canvas.addEventListener("pointerdown", (e) => { down = [e.clientX, e.clientY]; tween = null; });
  let lastHover = 0;
  canvas.addEventListener("pointermove", (e) => {
    if (e.buttons || e.pointerType === "touch") return;
    const now = performance.now(); if (now - lastHover < 60) return; lastHover = now;   // detailed models: test hover at most ~16 times a second
    const id = hitAt(e)?.object.userData.id || null;
    if (id !== state.hovered) { state.hovered = id; paint(); canvas.style.cursor = id ? "pointer" : "grab"; }
    tip.hidden = !id || !!state.quiz;
    if (id) { const r = stage.getBoundingClientRect(); tip.textContent = S[id].name; tip.style.transform = `translate(${e.clientX - r.left + 14}px, ${e.clientY - r.top + 12}px)`; }
  });
  canvas.addEventListener("pointerleave", () => { tip.hidden = true; if (state.hovered) { state.hovered = null; paint(); } });
  canvas.addEventListener("pointerup", (e) => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 5) return;
    const hit = hitAt(e), id = hit?.object.userData.id || null;
    if (hit) model.onPick?.(hit.object, id);   // e.g. a piano key plays its note
    if (state.quiz) return answer(id);
    if (id) select(id); else { state.selected = null; paint(); showIntro(); }
  });
  // double-click: fly in to the point under the cursor
  canvas.addEventListener("dblclick", (e) => {
    const h = hitAt(e), d = camera.position.distanceTo(controls.target);
    const target = h ? h.point.clone() : controls.target.clone();
    const dir = camera.position.clone().sub(controls.target).normalize();
    flyTo(target.clone().add(dir.multiplyScalar(Math.max(cam.min * 1.5, d * 0.4))), target);
  });
  function select(id, zoom) { state.selected = id; paint(); showInfo(id); if (zoom) focus(id); if (G[S[id].group] && state.tab !== S[id].group) openTab(S[id].group); }

  // ---------- camera ----------
  let tween = null;
  function flyTo(pos, target) { tween = { from: camera.position.clone(), to: pos, tFrom: controls.target.clone(), tTo: target, t: 0, start: performance.now() }; }
  function focus(id) {
    const p = parts[id], at = p.centre.clone().add(p.centre.clone().sub(centre).multiplyScalar(state.explode * 0.9));
    const d = Math.max(cam.min * 3, p.size * 1.9), dir = camera.position.clone().sub(controls.target).normalize();
    flyTo(at.clone().add(dir.multiplyScalar(d)), at);
  }
  function zoomBy(f) {
    const d = camera.position.clone().sub(controls.target), len = THREE.MathUtils.clamp(d.length() * f, cam.min, cam.max);
    flyTo(controls.target.clone().add(d.setLength(len)), controls.target.clone());
  }
  const home = () => flyTo(V(...cam.pos), V(...cam.target));
  $(".mv-zoom").addEventListener("click", (e) => { const z = e.target.closest("[data-zoom]")?.dataset.zoom; if (z === "in") zoomBy(0.55); if (z === "out") zoomBy(1.8); if (z === "reset") home(); });
  $(".mv-views").addEventListener("click", (e) => { const v = e.target.closest("[data-view]"); if (v) flyTo(...model.views[v.dataset.view].map((x) => V(...x))); });

  // ---------- controls ----------
  $(".mv-groups").addEventListener("click", (e) => {
    const b = e.target.closest("[data-grp]"); if (!b) return;
    const g = b.dataset.grp, on = !state.visible.has(g);
    on ? state.visible.add(g) : state.visible.delete(g);
    b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on)); groups[g].visible = on;
    attached.forEach((m) => { if (m.userData.group === g) m.visible = on; });
  });
  root.addEventListener("input", (e) => {
    const s = e.target.dataset.slider; if (!s) return;
    const v = e.target.value / 100;
    if (s === "explode") state.explode = v; else onSlider[s]?.(v);
  });
  root.addEventListener("change", (e) => { const c = e.target.dataset.ctl; if (["motion", "labels", "spin"].includes(c)) { state[c] = e.target.checked; if (c === "spin") controls.autoRotate = state.spin; } });
  for (const s of sliders) if (s.key !== "explode") onSlider[s.key]?.(s.value / 100);

  // ---------- quiz: find the part ----------
  const quizbar = $(".mv-quizbar");
  function nextQuestion() {
    const pool = Object.keys(parts).filter((id) => state.visible.has(S[id].group) && id !== state.quiz.last);
    const id = pool[Math.floor(Math.random() * pool.length)];
    state.quiz.target = id; state.quiz.last = id; state.quiz.tries = 0;
    quizbar.querySelector(".mv-q").innerHTML = `Find the <b>${esc(S[id].name.toLowerCase())}</b>`;
    quizbar.querySelector(".mv-score").textContent = `${state.quiz.score} / ${state.quiz.n}`;
  }
  function answer(id) {
    const q = state.quiz; if (!id) return;
    const right = id === q.target;
    state.selected = id; paint();
    stage.classList.remove("mv-right", "mv-wrong"); void stage.offsetWidth; stage.classList.add(right ? "mv-right" : "mv-wrong");
    if (right) { q.score += q.tries === 0 ? 1 : 0; q.n++; showInfo(id); setTimeout(() => (q.n >= 10 ? endQuiz() : nextQuestion()), 900); }
    else { q.tries++; quizbar.querySelector(".mv-q").innerHTML = `That's the ${esc(S[id].name.toLowerCase())}. Find the <b>${esc(S[q.target].name.toLowerCase())}</b>`; if (q.tries >= 2) { q.n++; select(q.target, true); setTimeout(() => (q.n >= 10 ? endQuiz() : nextQuestion()), 1600); } }
  }
  async function endQuiz() {
    const q = state.quiz; state.quiz = null; quizbar.hidden = true; root.classList.remove("quizzing");
    info.style.setProperty("--c", "#4fe0a6");
    info.innerHTML = `<span class="kicker">Quiz finished</span><h3>${q.score} out of ${q.n}</h3><p>${q.score >= 8 ? "Excellent. You know your way around this model." : q.score >= 5 ? "Good going. Click the ones you missed to learn more." : "Keep exploring: click any part to learn about it."}</p>
      <div class="mv-actions"><button type="button" class="btn btn-light lg btn-sm mv-quiz"><span>Play again</span></button></div>`;
    const { store } = await myCards();
    try { await store?.logActivity({ site: siteName, kind: "quiz", xp: q.score * 2, detail: { quiz: model.title, score: q.score, of: q.n } }); } catch { /* storage blocked */ }
  }
  root.addEventListener("click", (e) => {
    if (e.target.closest(".mv-quiz")) { state.quiz = { score: 0, n: 0 }; quizbar.hidden = false; root.classList.add("quizzing"); nextQuestion(); home(); }
    if (e.target.closest(".mv-quit")) { state.quiz = null; quizbar.hidden = true; root.classList.remove("quizzing"); showIntro(); }
  });

  // ---------- labels ----------
  const labelBox = $(".mv-labels"), labelMax = model.labelMax ?? Infinity;
  labelBox.innerHTML = Object.keys(parts).map((id) => `<span data-l="${id}">${esc(S[id].name)}</span>`).join("");
  const labelEls = Object.fromEntries([...labelBox.children].map((el) => [el.dataset.l, el]));

  // ---------- render loop ----------
  function resize() {
    const r = canvas.getBoundingClientRect(), pr = Math.min(2, devicePixelRatio || 1);
    renderer.setSize(r.width, r.height, false); composer.setPixelRatio(pr); composer.setSize(r.width, r.height);
    camera.aspect = r.width / Math.max(1, r.height); camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas); resize();
  let onScreen = true;
  new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; }).observe(canvas);
  const clock = new THREE.Clock(), tmp = new THREE.Vector3(), off = new THREE.Vector3();
  let shownMotion = null;
  const holos = []; scene.traverse((o) => { if (o.material?.uniforms?.uTime) holos.push(o.material); });
  renderer.setAnimationLoop(() => {
    if (!onScreen) return;
    const dt = Math.min(0.05, clock.getDelta()), t = clock.elapsedTime;
    for (const m of holos) m.uniforms.uTime.value = t;
    platform.rotation.y += dt * 0.15;
    for (const fn of ticks) fn(t, dt, state.motion);
    if (state.motion !== shownMotion) { flows.forEach((f) => { f.pts.visible = state.motion; }); shownMotion = state.motion; }   // a model can hide a flow itself while running
    if (state.motion) for (const f of flows) {
      f.seeds.forEach(([c, s], i) => { f.curves[c].getPointAt((s + t * f.speed) % 1, tmp); f.pos[i * 3] = tmp.x; f.pos[i * 3 + 1] = tmp.y; f.pos[i * 3 + 2] = tmp.z; });
      f.pts.geometry.attributes.position.needsUpdate = true;
    }
    // pulling apart: each part moves out from the model's centre
    if (model.explode !== false) for (const p of Object.values(parts)) {
      off.copy(p.centre).sub(centre).multiplyScalar(state.explode * 0.9);
      p.objs.forEach((m) => { if (!m.userData.moves) m.position.copy(m.userData.home).add(off); });   // parts the model animates itself are left alone
    }
    if (tween) {
      tween.t = Math.min(1, (performance.now() - tween.start) / 650);   // by the clock, so slow devices still arrive on time
      const e = tween.t < 0.5 ? 4 * tween.t ** 3 : 1 - (-2 * tween.t + 2) ** 3 / 2;
      camera.position.lerpVectors(tween.from, tween.to, e); controls.target.lerpVectors(tween.tFrom, tween.tTo, e);
      if (tween.t >= 1) tween = null;
    }
    controls.update();
    composer.render();
    labelBox.hidden = !state.labels;
    if (state.labels) {
      const r = canvas.getBoundingClientRect();
      for (const [id, el] of Object.entries(labelEls)) {
        const p = parts[id], on = state.visible.has(S[id].group) && p.size < labelMax;
        tmp.copy(p.centre).add(off.copy(p.centre).sub(centre).multiplyScalar(state.explode * 0.9)).project(camera);
        el.style.display = on && tmp.z < 1 && Math.abs(tmp.x) < 1.05 && Math.abs(tmp.y) < 1.05 ? "" : "none";
        el.style.transform = `translate(${((tmp.x + 1) / 2) * r.width}px, ${((1 - tmp.y) / 2) * r.height}px)`;
      }
    }
  });
  showIntro(); openTab(state.tab);
  canvas.mv = { select, focus, zoomBy, state, parts, camera, controls };
  return canvas.mv;
}
