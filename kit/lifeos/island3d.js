// The Gradify Tree in 3D: a low-poly floating island. Grass on top, earth and a faceted blue crystal underneath,
// rocky peaks at the back, and one low-poly tree per connected site: a broad tree when the site's been busy over
// the last 30 days, a young pine when it's quieter, its leaves tinted towards the site's colour and taller with
// more activity. Credentials are gold fruit; each day studied in the last fortnight adds a bush, and studying
// today brings out flowers. It turns slowly (drag to turn it yourself) and bobs gently; both stop with reduced
// motion. kit/lifeos/tree.js falls back to the flat drawing where WebGL isn't available.
import * as THREE from "../vendor/three/three.module.min.js";

const live = new WeakMap();
const reduce = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function webglOK() {
  try { const c = document.createElement("canvas"); return Boolean(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}
export function disposeIsland(el) { live.get(el)?.(); live.delete(el); }

// the same small offset for a vertex wherever it's repeated (caps and seams), so faces never crack apart
const jit = (x, y, z, k) => { const s = Math.sin(Math.round(x * 97) * 12.9898 + Math.round(y * 89) * 78.233 + Math.round(z * 83) * 37.719 + k) * 43758.5453; return (s - Math.floor(s)) * 2 - 1; };
function jitter(geo, f) { const p = geo.attributes.position; for (let i = 0; i < p.count; i++) { const v = f(p.getX(i), p.getY(i), p.getZ(i)); p.setXYZ(i, v[0], v[1], v[2]); } return geo; }
// one flat colour per face, chosen from the face's centre and normal
function paint(geo, pick) {
  const g = geo.index ? geo.toNonIndexed() : geo, p = g.attributes.position, cols = new Float32Array(p.count * 3);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3(), m = new THREE.Vector3();
  for (let i = 0; i < p.count; i += 3) {
    a.fromBufferAttribute(p, i); b.fromBufferAttribute(p, i + 1); c.fromBufferAttribute(p, i + 2);
    n.subVectors(c, b).cross(m.subVectors(a, b)).normalize(); m.addVectors(a, b).add(c).divideScalar(3);
    const col = pick(m, n, i / 3);
    for (let k = 0; k < 3; k++) { cols[(i + k) * 3] = col.r; cols[(i + k) * 3 + 1] = col.g; cols[(i + k) * 3 + 2] = col.b; }
  }
  g.setAttribute("color", new THREE.BufferAttribute(cols, 3)); g.computeVertexNormals(); return g;
}
const C = (h) => new THREE.Color(h);
const vary = (col, r, amt) => col.clone().offsetHSL(0, 0, (r - 0.5) * amt);

export function drawIsland(el, { sites, bars, rand }) {
  disposeIsland(el);
  el.innerHTML = "";
  const box = document.createElement("div"); box.className = "isle3d";
  box.setAttribute("role", "img");
  box.setAttribute("aria-label", `Gradify Tree: a floating island with ${sites.length} ${sites.length === 1 ? "tree" : "trees"}, one for each connected site`);
  el.append(box);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);
  box.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1.3, 0.1, 100);
  // framed for the tall lead tree: its crown rises far above the island, so the camera sits back and looks higher
  camera.position.set(0, 6.6, 27); camera.lookAt(0, 2.3, 0);
  scene.add(new THREE.HemisphereLight(0xe6f4ff, 0x36452f, 1.25));
  const sun = new THREE.DirectionalLight(0xfff0d8, 2.4);
  sun.position.set(-5, 9, 6); sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 12, bottom: -6, near: 1, far: 40 });
  sun.shadow.bias = -0.0015; sun.shadow.radius = 4;
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0x8fd4ff, 0.9); rim.position.set(6, 2, -6); scene.add(rim);
  // a cool light from below and in front, so the crystal underneath glows like ice rather than sitting in shadow
  const under = new THREE.DirectionalLight(0xa8e6ff, 1.5); under.position.set(-2, -7, 8); scene.add(under);

  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.92, metalness: 0 });
  const crystal = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.35, metalness: 0.05 });
  const isle = new THREE.Group(); scene.add(isle);
  const mesh = (geo, m = mat, cast = true, receive = true) => { const o = new THREE.Mesh(geo, m); o.castShadow = cast; o.receiveShadow = receive; return o; };

  // the island's top: a thick, slightly uneven slab of grass with an earth edge
  const TOP = 3.4;
  const slab = jitter(new THREE.CylinderGeometry(TOP, TOP - 0.15, 0.55, 20, 2), (x, y, z) => {
    const r = Math.hypot(x, z), k = r > 0.01 ? 1 + jit(x, y, z, 1) * 0.06 : 1;
    return [x * k, y + (y > 0.2 && r < TOP - 0.3 ? jit(x, y, z, 2) * 0.05 : 0), z * k];
  });
  isle.add(mesh(paint(slab, (m, n, f) => n.y > 0.6 ? vary(C(0x86c75c), jit(m.x, m.y, m.z, 3) * 0.5 + 0.5, 0.08) : m.y > 0.12 ? C(0x6aa84a) : vary(C(0x8b6748), jit(m.x, 0, m.z, 4) * 0.5 + 0.5, 0.1)), mat, false, true));

  // underneath: a band of earth, then a faceted crystal tapering to a point
  const belly = jitter(new THREE.ConeGeometry(TOP - 0.15, 4.4, 16, 6), (x, y, z) => {
    const top = y > 2.15, k = top ? 1 : 1 + jit(x, y, z, 5) * 0.22;
    return [x * k + (top ? 0 : jit(x, y, z, 6) * 0.1), y + (top ? 0 : jit(x, y, z, 7) * 0.18), z * k];
  });
  belly.rotateX(Math.PI); belly.translate(0, -0.275 - 2.2, 0);
  const deep = [C(0x6fd3ea), C(0x41b0d8), C(0x2a8bc5), C(0x1f63a6)];
  isle.add(mesh(paint(belly, (m, n, f) => {
    const d = -m.y;                                   // depth below the grass
    if (d < 0.95) return vary(C(0x7a5a3d), f % 5 / 5, 0.12);
    const t = Math.min(0.999, (d - 0.95) / 3.6) * (deep.length - 1), i = Math.floor(t);
    return vary(deep[i].clone().lerp(deep[i + 1], t - i), (Math.sin(f * 7.3) + 1) / 2, 0.16);
  }), crystal, false, false));

  // rocky peaks at the back
  const peaks = [[-1.2, -1.7, 0.8, 1.7], [-0.35, -2.1, 0.62, 1.35], [0.75, -1.85, 0.5, 1.0]];
  for (const [x, z, r, h] of peaks) {
    const g = jitter(new THREE.ConeGeometry(r, h, 6, 2), (px, py, pz) => py > h / 2 - 0.01 ? [px + jit(x, z, 0, 8) * 0.12, py, pz] : [px * (1 + jit(px + x, py, pz + z, 9) * 0.18), py, pz * (1 + jit(px + x, py, pz + z, 10) * 0.18)]);
    const o = mesh(paint(g, (m, n, f) => n.y > 0.75 && m.y > h * 0.25 ? C(0xe9e6df) : vary(n.x + n.z > 0 ? C(0xb7ab9c) : C(0x8e8379), (f % 7) / 7, 0.1)));
    o.position.set(x, 0.275 + h / 2 - 0.05, z); o.rotation.y = rand() * 6; isle.add(o);
  }

  // places on the grass, kept apart from each other and from the peaks
  const taken = peaks.map(([x, z, r]) => [x, z, r * 0.9]);
  const spot = (min, rad = TOP - 0.55) => {
    for (let k = 0; k < 60; k++) {
      const a = rand() * Math.PI * 2, d = Math.sqrt(rand()) * rad, x = Math.cos(a) * d, z = Math.sin(a) * d * 0.95 + 0.25;
      if (taken.every(([tx, tz, tr]) => Math.hypot(x - tx, z - tz) > tr + min)) { taken.push([x, z, min]); return [x, z]; }
    }
    return null;
  };
  const GROUND = 0.275;
  const bark = C(0x7b5236), gold = C(0xffc23d);

  // one tree per site
  const order = [...sites].sort((a, b) => b.k - a.k);
  order.forEach((q, idx) => {
    // the lead tree (your most active site) stands in the middle and towers over the island; the rest stay small around it
    const lead = idx === 0;
    const p = lead ? (taken.push([0.2, -0.2, 0.9]), [0.2, -0.2]) : spot(0.55 + q.k * 0.25);
    if (!p) return;
    const s = (0.7 + q.k * 0.72) * (lead ? 2.6 : 1), leaf = C(0x5fae47).lerp(C(`#${q.c}`), 0.24), tree = new THREE.Group();
    tree.position.set(p[0], GROUND, p[1]); tree.rotation.y = rand() * 6;
    if (lead || q.k >= 0.45) {
      // a broad tree: a trunk that forks, with clumps of leaves
      const trunk = paint(new THREE.CylinderGeometry(0.09 * s, 0.17 * s, 1.5 * s, 6), () => bark);
      const t = mesh(trunk); t.position.y = 0.75 * s; tree.add(t);
      for (const [bx, by, bz, br] of [[0, 1.75, 0, 0.75], [-0.55, 1.45, 0.1, 0.55], [0.55, 1.5, -0.1, 0.58], [0.1, 1.35, 0.5, 0.5], [-0.1, 2.1, -0.25, 0.48]]) {
        const g = jitter(new THREE.IcosahedronGeometry(br * s, 0), (x, y, z) => [x * (1 + jit(x, y, z, 11) * 0.12), y * 0.82, z * (1 + jit(x, y, z, 12) * 0.12)]);
        const c = mesh(paint(g, (m, n, f) => vary(leaf, n.y * 0.5 + 0.5, 0.18))); c.position.set(bx * s, by * s, bz * s); tree.add(c);
      }
    } else {
      // a young pine: a thin trunk and stacked cones
      const t = mesh(paint(new THREE.CylinderGeometry(0.06 * s, 0.1 * s, 0.6 * s, 5), () => bark)); t.position.y = 0.3 * s; tree.add(t);
      const pine = leaf.clone().lerp(C(0x2f7d4a), 0.35);
      [[0.62, 0.75, 0.55], [0.5, 0.65, 1.0], [0.36, 0.55, 1.4]].forEach(([r, h, y]) => {
        const c = mesh(paint(new THREE.ConeGeometry(r * s, h * s, 7), (m, n, f) => vary(pine, n.y * 0.5 + 0.5, 0.16))); c.position.y = y * s; tree.add(c);
      });
    }
    // credentials hang as gold fruit
    q.creds.forEach((_, f) => {
      const g = mesh(paint(new THREE.IcosahedronGeometry(0.11, 0), (m, n) => vary(gold, n.y * 0.5 + 0.5, 0.2)));
      const a = f * 2.1 + 0.6; g.position.set(Math.cos(a) * 0.55 * s, (lead || q.k >= 0.45 ? 1.35 : 0.8) * s, Math.sin(a) * 0.55 * s); tree.add(g);
    });
    isle.add(tree);
  });

  // a bush for each day studied in the last fortnight, and flowers for today
  const fortnight = bars.slice(-14).filter((v) => v > 0).length;
  for (let i = 0; i < fortnight; i++) {
    const p = spot(0.22); if (!p) break;
    const r = 0.16 + rand() * 0.14, g = mesh(paint(new THREE.IcosahedronGeometry(r, 0), (m, n) => vary(C(0x4f9a3f), n.y * 0.5 + 0.5, 0.2)));
    g.position.set(p[0], GROUND + r * 0.55, p[1]); g.scale.y = 0.75; isle.add(g);
  }
  if (bars.at(-1) > 0) for (let i = 0; i < 6; i++) {
    const p = spot(0.08); if (!p) break;
    const f = mesh(new THREE.IcosahedronGeometry(0.06, 0), new THREE.MeshStandardMaterial({ color: i % 2 ? 0xffffff : 0xffb7d5, flatShading: true, roughness: 0.6 }));
    f.position.set(p[0], GROUND + 0.1, p[1]); isle.add(f);
    const st = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.1, 3), new THREE.MeshStandardMaterial({ color: 0x4f9a3f })); st.position.set(p[0], GROUND + 0.05, p[1]); isle.add(st);
  }
  // a few loose rocks on the grass
  for (let i = 0; i < 5; i++) {
    const p = spot(0.12); if (!p) break;
    const r = 0.08 + rand() * 0.1, g = mesh(paint(new THREE.DodecahedronGeometry(r, 0), (m, n) => vary(C(0xa59a8e), n.y * 0.5 + 0.5, 0.2)));
    g.position.set(p[0], GROUND + r * 0.4, p[1]); g.rotation.set(rand() * 3, rand() * 3, 0); isle.add(g);
  }

  // size, turning, bobbing; paused while off screen
  let W = 0, H = 0, visible = true, raf = 0, drag = null, spin = -0.35, vel = 0;
  const t0 = performance.now();
  const fit = () => {
    const w = Math.max(200, box.clientWidth), h = Math.round(Math.min(520, w / 1.25));
    if (w === W && h === H) return; W = w; H = h;
    renderer.setSize(W, H); camera.aspect = W / H; camera.updateProjectionMatrix();
  };
  const frame = (now) => {
    raf = 0; if (!visible || !box.isConnected) return;
    fit();
    const t = (now - t0) / 1000;
    if (!drag) { spin += reduce ? 0 : 0.0028 + vel; vel *= 0.95; }
    isle.rotation.y = spin;
    isle.position.y = reduce ? 0 : Math.sin(t * 0.9) * 0.08;
    renderer.render(scene, camera);
    if (!reduce || drag) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  const cv = renderer.domElement;
  cv.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, s: spin }; vel = 0; cv.setPointerCapture(e.pointerId); kick(); });
  cv.addEventListener("pointermove", (e) => { if (!drag) return; const ns = drag.s + (e.clientX - drag.x) * 0.01; vel = (ns - spin) * 0.3; spin = ns; kick(); });
  const up = () => { drag = null; kick(); };
  cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
  const ro = new ResizeObserver(() => { fit(); kick(); }); ro.observe(box);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }); io.observe(box);
  fit(); kick();

  live.set(el, () => {
    cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
    scene.traverse((o) => { o.geometry?.dispose(); });
    mat.dispose(); crystal.dispose(); renderer.dispose(); renderer.forceContextLoss?.();
  });
  return true;
}
