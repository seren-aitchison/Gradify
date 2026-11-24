// The Gradify Tree in 3D: a low-poly floating island. Grass on top, earth and a faceted blue crystal underneath,
// rocky peaks at the back, and one low-poly tree per connected site: a broad tree when the site's been busy over
// the last 30 days, a young pine when it's quieter, its leaves tinted towards the site's colour and taller with
// more activity. Credentials are gold fruit; each day studied in the last fortnight adds a bush, and studying
// today brings out flowers. It turns slowly (drag to turn it yourself) and bobs gently; both stop with reduced
// motion. kit/lifeos/tree.js falls back to the flat drawing where WebGL isn't available.
// Around it: a twilight sky (in CSS, behind the transparent canvas), low-poly clouds drifting past at different depths,
// a stream that runs off the edge as a waterfall, fireflies, trees that sway, and a name tag over each site's tree that
// follows it as the island turns. el.__highlight(name) lifts one site's tree and tag (the legend calls it on hover).
import * as THREE from "../vendor/three/three.module.min.js";
import { esc } from "../core/text.js";

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
  camera.position.set(0, 6.4, 29); camera.lookAt(0, 2.15, 0);
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
  const fruitMat = new THREE.MeshStandardMaterial({ color: gold, emissive: 0xff9a00, emissiveIntensity: 0.7, flatShading: true, roughness: 0.35, metalness: 0.25 });

  // a stream from a spring by the peaks to the island's edge, where it falls away as a waterfall; its path is kept clear
  const S0 = [1.15, -1.25], SC = [2.6, -0.9], SE = [Math.cos(0.32) * TOP, Math.sin(0.32) * TOP];
  const along = (t) => [(1 - t) * (1 - t) * S0[0] + 2 * (1 - t) * t * SC[0] + t * t * SE[0], (1 - t) * (1 - t) * S0[1] + 2 * (1 - t) * t * SC[1] + t * t * SE[1]];
  const water = new THREE.MeshStandardMaterial({ color: 0x4cc3f0, emissive: 0x0f5d8a, emissiveIntensity: 0.55, roughness: 0.15, metalness: 0.1, flatShading: true });
  for (let i = 0; i < 14; i++) {
    const [ax, az] = along(i / 14), [bx, bz] = along((i + 1) / 14), len = Math.hypot(bx - ax, bz - az);
    const seg = new THREE.Mesh(new THREE.BoxGeometry(len + 0.06, 0.03, 0.22 + (i / 14) * 0.1), water);
    seg.position.set((ax + bx) / 2, GROUND + 0.005, (az + bz) / 2); seg.rotation.y = -Math.atan2(bz - az, bx - ax); seg.receiveShadow = true; isle.add(seg);
    taken.push([ax, az, 0.32]);
  }
  const spring = mesh(paint(new THREE.DodecahedronGeometry(0.2, 0), (m, n) => vary(C(0xa59a8e), n.y * 0.5 + 0.5, 0.2))); spring.position.set(S0[0] - 0.12, GROUND + 0.06, S0[1] - 0.1); isle.add(spring);
  // the waterfall: drops falling from the edge, and a little mist where they thin out
  const FALL = 420, fall = new Float32Array(FALL * 3), fallV = new Float32Array(FALL);
  const dropAt = (i, top) => { const sp = 0.34; fall[i * 3] = SE[0] * 1.04 + (Math.random() - 0.5) * sp; fall[i * 3 + 1] = top ? GROUND - Math.random() * 0.2 : GROUND - Math.random() * 5; fall[i * 3 + 2] = SE[1] * 1.03 + (Math.random() - 0.5) * sp; fallV[i] = 1.6 + Math.random() * 1.4; };
  for (let i = 0; i < FALL; i++) dropAt(i, false);
  const fallGeo = new THREE.BufferGeometry(); fallGeo.setAttribute("position", new THREE.BufferAttribute(fall, 3));
  const fallMat = new THREE.PointsMaterial({ color: 0xa8e4ff, size: 0.11, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending });
  const falls = new THREE.Points(fallGeo, fallMat); isle.add(falls);
  const planted = [];

  // a single leaf: a pointed oval with a fold down its middle, drawn on both sides; each tree's leaves share it
  const leafGeo = new THREE.BufferGeometry();
  {
    const L = 0.26, rim = [[0, 0], [0.05, 0.05], [0.075, 0.11], [0.068, 0.17], [0.04, 0.22], [0, L]], v = [];
    // the midrib sits slightly forward of the edges, so the two halves fold like a real leaf
    for (const side of [1, -1]) for (let i = 0; i < rim.length - 1; i++) {
      const [x0, y0] = rim[i], [x1, y1] = rim[i + 1];
      v.push(0, y0, 0.018, side * x0, y0, 0, side * x1, y1, 0, 0, y0, 0.018, side * x1, y1, 0, 0, y1, 0.018);
    }
    leafGeo.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
  }
  leafGeo.computeVertexNormals();
  const leafMat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, flatShading: true, roughness: 0.5, metalness: 0, emissive: 0x000000 });
  const LEAF = [C(0x52d63c), C(0xffb703), C(0xff4d3d)];   // a lesson, a flashcard session, a quiz
  const m4 = new THREE.Matrix4(), tc = new THREE.Color();

  // one tree per site
  const order = [...sites].sort((a, b) => b.k - a.k);
  order.forEach((q, idx) => {
    // the lead tree (your most active site) stands in the middle and towers over the island; the rest stay small around it
    const lead = idx === 0;
    const p = lead ? (taken.push([0.2, -0.2, 0.9]), [0.2, -0.2]) : spot(0.55 + q.k * 0.25);
    if (!p) return;
    const s = (0.7 + q.k * 0.72) * (lead ? 2.6 : 1), leaf = C(0x3f8a3a).lerp(C(`#${q.c}`), 0.08), tree = new THREE.Group();
    const crowns = [];   // [x, y, z, radius] of each leafy part, where this tree's leaves grow
    tree.position.set(p[0], GROUND, p[1]); tree.rotation.y = rand() * 6;
    if (lead || q.k >= 0.45) {
      // a broad tree: a trunk that forks, with clumps of leaves
      const trunk = paint(new THREE.CylinderGeometry(0.09 * s, 0.17 * s, 1.5 * s, 6), () => bark);
      const t = mesh(trunk); t.position.y = 0.75 * s; tree.add(t);
      for (const [bx, by, bz, br] of [[0, 1.75, 0, 0.75], [-0.55, 1.45, 0.1, 0.55], [0.55, 1.5, -0.1, 0.58], [0.1, 1.35, 0.5, 0.5], [-0.1, 2.1, -0.25, 0.48]]) {
        const core = q.leaves ? 0.88 : 1;   // with leaves to show, the crown is a little smaller, so they sit on its surface
        const g = jitter(new THREE.IcosahedronGeometry(br * s * core, 0), (x, y, z) => [x * (1 + jit(x, y, z, 11) * 0.12), y * 0.82, z * (1 + jit(x, y, z, 12) * 0.12)]);
        const c = mesh(paint(g, (m, n, f) => vary(leaf, n.y * 0.5 + 0.5, 0.18))); c.position.set(bx * s, by * s, bz * s); tree.add(c);
        crowns.push([bx * s, by * s, bz * s, br * s]);
      }
    } else {
      // a young pine: a thin trunk and stacked cones
      const t = mesh(paint(new THREE.CylinderGeometry(0.06 * s, 0.1 * s, 0.6 * s, 5), () => bark)); t.position.y = 0.3 * s; tree.add(t);
      const pine = leaf.clone().lerp(C(0x2f7d4a), 0.35);
      [[0.62, 0.75, 0.55], [0.5, 0.65, 1.0], [0.36, 0.55, 1.4]].forEach(([r, h, y]) => {
        const c = mesh(paint(new THREE.ConeGeometry(r * s, h * s, 7), (m, n, f) => vary(pine, n.y * 0.5 + 0.5, 0.16))); c.position.y = y * s; tree.add(c);
        crowns.push([0, (y - h * 0.15) * s, 0, r * s * 0.78]);
      });
    }
    // credentials hang as gold fruit
    q.creds.forEach((_, f) => {
      const g = mesh(new THREE.IcosahedronGeometry(0.12, 0), fruitMat);
      const a = f * 2.1 + 0.6; g.position.set(Math.cos(a) * 0.55 * s, (lead || q.k >= 0.45 ? 1.35 : 0.8) * s, Math.sin(a) * 0.55 * s); tree.add(g);
    });
    // one leaf for every lesson, flashcard session and quiz completed on this site in the last 30 days, on the
    // crowns' surface, each facing outwards at its own angle: green, gold and coral (a few at most per crown at small sizes)
    const L = q.leaves || {}, kinds = [...Array(L.lesson || 0).fill(0), ...Array(L.flashcard || 0).fill(1), ...Array(L.quiz || 0).fill(2)].slice(0, 400);
    if (kinds.length && crowns.length) {
      const leaves = new THREE.InstancedMesh(leafGeo, leafMat, kinds.length), weights = crowns.map((c) => c[3] * c[3]), wsum = weights.reduce((a, b) => a + b, 0);
      const dir = new THREE.Vector3(), q4 = new THREE.Quaternion(), spinQ = new THREE.Quaternion(), Z = new THREE.Vector3(0, 0, 1), pos = new THREE.Vector3(), sc = new THREE.Vector3();
      kinds.forEach((kind, i) => {
        let pick = rand() * wsum, ci = 0; while (pick > weights[ci] && ci < crowns.length - 1) pick -= weights[ci++];
        const [cx, cy, cz, cr] = crowns[ci];
        dir.set(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).normalize(); if (dir.y < -0.35) dir.y = -dir.y * 0.5; dir.normalize();
        const out = 0.98 + rand() * 0.14;
        pos.set(cx + dir.x * cr * out, cy + dir.y * cr * out * 0.85, cz + dir.z * cr * out);
        q4.setFromUnitVectors(Z, dir).multiply(spinQ.setFromAxisAngle(Z, rand() * Math.PI * 2));
        const k = (0.9 + rand() * 0.35) * (0.6 + cr * 1.15); sc.set(k, k, k);
        m4.compose(pos, q4, sc); leaves.setMatrixAt(i, m4);
        leaves.setColorAt(i, tc.copy(LEAF[kind]).offsetHSL((rand() - 0.5) * 0.03, 0, (rand() - 0.5) * 0.12));
      });
      leaves.castShadow = true; tree.add(leaves);
    }
    isle.add(tree);
    planted.push({ tree, q, top: (lead ? 2.2 : q.k >= 0.45 ? 2.75 : 1.85) * s, phase: rand() * 6 });
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

  // tufts of grass all over the top
  const tuft = new THREE.ConeGeometry(0.05, 0.16, 3), tufts = new THREE.InstancedMesh(tuft, new THREE.MeshStandardMaterial({ color: 0x5f9f3e, flatShading: true, roughness: 1 }), 90);
  let nt = 0;
  for (let k = 0; k < 400 && nt < 90; k++) {
    const a = rand() * Math.PI * 2, d = Math.sqrt(rand()) * (TOP - 0.35), x = Math.cos(a) * d, z = Math.sin(a) * d;
    if (!taken.every(([tx, tz, tr]) => Math.hypot(x - tx, z - tz) > tr * 0.8)) continue;
    m4.compose(new THREE.Vector3(x, GROUND + 0.07, z), new THREE.Quaternion().setFromEuler(new THREE.Euler((rand() - 0.5) * 0.4, rand() * 6, (rand() - 0.5) * 0.4)), new THREE.Vector3(1, 0.7 + rand() * 0.8, 1));
    tufts.setMatrixAt(nt, m4); tufts.setColorAt(nt, tc.set(0x5f9f3e).offsetHSL(0, 0, (rand() - 0.5) * 0.12)); nt++;
  }
  tufts.count = nt; tufts.castShadow = false; tufts.receiveShadow = true; isle.add(tufts);

  // low-poly clouds drifting round the island at different heights and depths
  const cloudMat = new THREE.MeshStandardMaterial({ color: 0xfff4fb, emissive: 0xffc9e6, emissiveIntensity: 0.35, flatShading: true, roughness: 1, transparent: true, opacity: 0.88 });
  const sky = new THREE.Group(); scene.add(sky);
  [[7.4, -2.8, 0.2, 1.1], [8.2, 1.6, 2.2, 0.9], [7.0, -1.2, 3.9, 0.75], [9.0, 3.4, 5.3, 1.2], [6.6, -3.6, 4.6, 0.8]].forEach(([r, y, a, k]) => {
    const c = new THREE.Group();
    // a puffy cloud: a big middle and smaller puffs either side, flat underneath
    [[0, 0.1, 0.78], [-0.7, -0.05, 0.55], [0.72, -0.02, 0.6], [-0.3, 0.32, 0.5], [0.35, 0.3, 0.46], [1.25, -0.12, 0.38], [-1.2, -0.12, 0.36]].forEach(([x, y, r]) => {
      const b = mesh(new THREE.IcosahedronGeometry(r * k, 1), cloudMat, false, false); b.position.set(x * k, y * k, (rand() - 0.5) * 0.3 * k); b.scale.y = 0.78; c.add(b);
    });
    c.position.set(Math.cos(a) * r, y, Math.sin(a) * r); c.lookAt(0, y, 0); sky.add(c);
  });
  // fireflies round the trees: soft gold points that drift and glow
  const FLY = 46, fly = new Float32Array(FLY * 3), flyBase = [];
  for (let i = 0; i < FLY; i++) { const a = rand() * Math.PI * 2, d = 0.6 + rand() * (TOP - 0.6); flyBase.push([Math.cos(a) * d, GROUND + 0.4 + rand() * 3.2, Math.sin(a) * d, rand() * 6]); }
  const flyGeo = new THREE.BufferGeometry(); flyGeo.setAttribute("position", new THREE.BufferAttribute(fly, 3));
  const flyMat = new THREE.PointsMaterial({ color: 0xffe58a, size: 0.09, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending });
  isle.add(new THREE.Points(flyGeo, flyMat));

  // a name tag over each site's tree, following it as the island turns
  const tags = document.createElement("div"); tags.className = "isle-tags"; box.append(tags);
  planted.forEach((p) => {
    // the busiest site's tree carries its name; the others a dot in their colour that names itself on hover or tap
    const t = document.createElement("span"); t.className = `isle-tag${p === planted[0] ? " lead" : ""}`; t.style.setProperty("--c", `#${p.q.c}`);
    t.tabIndex = 0; t.setAttribute("role", "note"); t.setAttribute("aria-label", `${p.q.n}: ${p.q.act ?? 0} activities in the last 30 days`);
    t.innerHTML = `<i></i>${esc(p.q.n)}<b>${esc(p.q.act)}</b>`; tags.append(t); p.tag = t;
  });
  let lit = null;
  tags.addEventListener("pointerover", (e) => { const t = e.target.closest(".isle-tag"); if (t) el.__highlight(planted.find((p) => p.tag === t)?.q.n); });
  tags.addEventListener("pointerout", (e) => { if (e.target.closest(".isle-tag")) el.__highlight(null); });
  tags.addEventListener("focusin", (e) => { const t = e.target.closest(".isle-tag"); if (t) el.__highlight(planted.find((p) => p.tag === t)?.q.n); });
  tags.addEventListener("focusout", () => el.__highlight(null));
  el.__highlight = (name) => { lit = name || null; planted.forEach((p) => p.tag.classList.toggle("on", p.q.n === lit)); tags.classList.toggle("focus", Boolean(lit)); kick(); };
  const wp = new THREE.Vector3();

  // size, turning, bobbing; paused while off screen
  let W = 0, H = 0, visible = true, raf = 0, drag = null, spin = -0.35, vel = 0;
  const t0 = performance.now();
  const fit = () => {
    const w = Math.max(200, box.clientWidth), h = Math.round(Math.min(560, w / (w < 520 ? 0.92 : 1.18)));
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
    const dt = Math.min(0.05, (now - (frame.last || now)) / 1000); frame.last = now;
    if (!reduce) {
      for (const p of planted) {
        p.tree.rotation.z = Math.sin(t * 1.1 + p.phase) * 0.025; p.tree.rotation.x = Math.cos(t * 0.9 + p.phase) * 0.018;
        const want = p.q.n === lit ? 1.12 : 1; p.tree.scale.setScalar(p.tree.scale.x + (want - p.tree.scale.x) * 0.15);
      }
      for (let i = 0; i < FALL; i++) { fall[i * 3 + 1] -= fallV[i] * dt; fallV[i] += 3 * dt; if (fall[i * 3 + 1] < -4.8) dropAt(i, true); }
      fallGeo.attributes.position.needsUpdate = true;
      flyBase.forEach(([x, y, z, ph], i) => { fly[i * 3] = x + Math.sin(t * 0.6 + ph) * 0.35; fly[i * 3 + 1] = y + Math.sin(t * 0.9 + ph * 2) * 0.25; fly[i * 3 + 2] = z + Math.cos(t * 0.5 + ph) * 0.35; });
      flyGeo.attributes.position.needsUpdate = true; flyMat.opacity = 0.65 + Math.sin(t * 2.4) * 0.25;
      sky.rotation.y = t * 0.03;
    } else for (const p of planted) p.tree.scale.setScalar(p.q.n === lit ? 1.12 : 1);
    // tags: each tree's top on screen, front trees first; a tag that would overlap one already placed moves up a row,
    // and every tag stays inside the frame. Those on the far side of the island fade back.
    const placed = [];
    planted.map((p) => { p.tree.getWorldPosition(wp); const z = wp.z; wp.y += p.top * p.tree.scale.y; wp.project(camera); return { p, z, x: (wp.x + 1) / 2 * W, y: (1 - wp.y) / 2 * H }; })
      .sort((a, b) => b.z - a.z)
      .forEach(({ p, z, x, y }) => {
        const full = p.tag.classList.contains("lead") || p.q.n === lit, w = full ? p.tag.offsetWidth || 90 : 14, h = full ? 24 : 14;
        let ty = Math.max(h + 6, y - 8);
        for (let k = 0; k < 6 && full && placed.some((r) => Math.abs(r.x - x) < (r.w + w) / 2 + 4 && Math.abs(r.y - ty) < h); k++) ty -= h + 2;
        const tx = Math.min(W - w / 2 - 6, Math.max(w / 2 + 6, x)); ty = Math.max(h + 4, ty);
        placed.push({ x: tx, y: ty, w });
        p.tag.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) translate(-50%, -100%)`;
        p.tag.style.opacity = p.q.n === lit ? 1 : lit ? 0.25 : z < -0.6 ? 0.45 : 1; p.tag.style.zIndex = String(Math.round(z * 10) + 50);
      });
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
    mat.dispose(); crystal.dispose(); water.dispose(); leafGeo.dispose(); leafMat.dispose(); fruitMat.dispose(); cloudMat.dispose(); fallMat.dispose(); flyMat.dispose(); fallGeo.dispose(); flyGeo.dispose(); tuft.dispose();
    renderer.dispose(); renderer.forceContextLoss?.(); delete el.__highlight;
  });
  return true;
}
