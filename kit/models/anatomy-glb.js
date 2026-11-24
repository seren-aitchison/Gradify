// The real anatomy model behind the body, the athlete, the mouth and the brain: BodyParts3D (DBCLS),
// as prepared by open-anatomy-3d (CC BY 4.0, see kit/vendor/anatomy/ATTRIBUTION.md). 128 named
// meshes in metres, Y up, facing +z, feet at the origin. loadAnatomy() loads it once, gives every
// mesh its own pivot (so a heart can beat in place) and texture coordinates (so tissue textures
// can be drawn on it), and returns the meshes by catalog key.
import * as THREE from "../vendor/three/three.module.min.js";
import { GLTFLoader } from "../vendor/three/addons/GLTFLoader.js";
import { MeshoptDecoder } from "../vendor/three/addons/meshopt_decoder.module.js";

export const ATTRIBUTION = "Anatomy: BodyParts3D © The Database Center for Life Science (CC BY 4.0), modified by open-anatomy-3d (CC BY 4.0) and Gradify. HD skull and teeth: Z-Anatomy (CC BY-SA 4.0).";
const base = new URL("../vendor/anatomy/", import.meta.url);
let loading = null, hdLoading = null;
const live = {}, centres = {};   // the copies take() handed out, by key, and where each key's geometry was centred

// The HD layer (anatomy-hd.glb, built in Blender by scripts/build-anatomy-hd.sh from the full-resolution
// BodyParts3D 4.3 meshes): the skull, mandible and teeth subdivided ~15x. It loads after the model is up and
// swaps in place, so the page never waits for it. Skipped on slow or data-saving connections and small
// devices; ?hd=1 or ?hd=0 forces it either way.
export function wantsHD() {
  try { const q = new URLSearchParams(location.search).get("hd"); if (q === "1") return true; if (q === "0") return false; } catch { /* no location */ }
  const c = navigator.connection;
  if (c?.saveData || /(^|-)2g|3g/.test(c?.effectiveType || "")) return false;
  return !(navigator.deviceMemory && navigator.deviceMemory < 4);
}

export function loadAnatomy() {
  loading ||= (async () => {
    const [gltf, catalog] = await Promise.all([
      new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(new URL("anatomy-male.glb", base).href),
      fetch(new URL("catalog.json", base)).then((r) => r.json()),
    ]);
    const keys = new Set(catalog.map((c) => c.key)), byKey = {};
    gltf.scene.updateMatrixWorld(true);
    const meshes = []; gltf.scene.traverse((o) => { if (o.isMesh) meshes.push(o); });
    // about a million vertices: read straight from the file's arrays in one pass per mesh (not value by value), and
    // hand the page back every few milliseconds so it stays responsive while the model is built
    let slice = performance.now();
    for (const m of meshes) {
      const key = keys.has(m.name) ? m.name : m.name.replace(/_\d+$/, "");
      const g = new THREE.BufferGeometry(); g.setIndex(m.geometry.index);
      const at = m.geometry.attributes, c = new THREE.Vector3();
      if (at.position && at.normal) {
        const { pos, nor } = toWorld(at.position, at.normal, m.matrixWorld, c);
        g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); g.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
        g.setAttribute("uv", new THREE.BufferAttribute(boxUVArrays(pos, nor), 2));
        g.boundingBox = null;
      } else {
        // (no normals in the file: the general route)
        for (const name of ["position", "normal"]) { const a = at[name]; if (a) g.setAttribute(name, new THREE.BufferAttribute(floats(a), 3)); }
        g.applyMatrix4(m.matrixWorld); if (!g.attributes.normal) g.computeVertexNormals();
        g.computeBoundingBox(); g.boundingBox.getCenter(c); g.translate(-c.x, -c.y, -c.z);
        g.setAttribute("uv", new THREE.BufferAttribute(boxUVArrays(g.attributes.position.array, g.attributes.normal.array), 2));
      }
      const mesh = new THREE.Mesh(g); mesh.position.copy(c); mesh.name = key;
      (byKey[key] ||= []).push(mesh); centres[key] ||= c;   // the HD layer (upgradeHD) uses the same frame
      if (performance.now() - slice > 8) { await new Promise((r) => setTimeout(r, 0)); slice = performance.now(); }
    }
    const anchors = Object.fromEntries(catalog.filter((c) => c.anchor).map((c) => [c.key, new THREE.Vector3(...c.anchor)]));
    if (wantsHD()) (window.requestIdleCallback || setTimeout)(() => upgradeHD(), { timeout: 1500 });
    return { byKey, anchors, catalog };
  })();
  return loading;
}

// an attribute as plain floats (the file stores positions and normals as quantised integers, often interleaved)
const SCALE = { Int8Array: 127, Uint8Array: 255, Int16Array: 32767, Uint16Array: 65535 };
function floats(a) {
  const arr = a.isInterleavedBufferAttribute ? a.data.array : a.array, stride = a.isInterleavedBufferAttribute ? a.data.stride : a.itemSize, off = a.offset || 0;
  const k = a.normalized ? 1 / (SCALE[arr.constructor.name] || 1) : 1, signed = a.normalized && /^Int/.test(arr.constructor.name), out = new Float32Array(a.count * 3);
  for (let i = 0, j = off; i < a.count; i++, j += stride) for (let d = 0; d < 3; d++) { const v = arr[j + d] * k; out[i * 3 + d] = signed && v < -1 ? -1 : v; }
  return out;
}
// positions and normals into world space, the positions centred on their box (centre written to c)
function toWorld(pa, na, matrix, c) {
  const pos = floats(pa), nor = floats(na), e = matrix.elements, n = new THREE.Matrix3().getNormalMatrix(matrix).elements;
  let x0 = Infinity, y0 = Infinity, z0 = Infinity, x1 = -Infinity, y1 = -Infinity, z1 = -Infinity;
  for (let i = 0; i < pos.length; i += 3) {
    const x = pos[i], y = pos[i + 1], z = pos[i + 2], w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    const X = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w, Y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w, Z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
    pos[i] = X; pos[i + 1] = Y; pos[i + 2] = Z;
    if (X < x0) x0 = X; if (X > x1) x1 = X; if (Y < y0) y0 = Y; if (Y > y1) y1 = Y; if (Z < z0) z0 = Z; if (Z > z1) z1 = Z;
    const a = nor[i], b = nor[i + 1], d = nor[i + 2];
    let p = n[0] * a + n[3] * b + n[6] * d, q = n[1] * a + n[4] * b + n[7] * d, r = n[2] * a + n[5] * b + n[8] * d;
    const l = Math.hypot(p, q, r) || 1; nor[i] = p / l; nor[i + 1] = q / l; nor[i + 2] = r / l;
  }
  c.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  for (let i = 0; i < pos.length; i += 3) { pos[i] -= c.x; pos[i + 1] -= c.y; pos[i + 2] -= c.z; }
  return { pos, nor };
}

// fetch the HD layer and put its geometry into every copy that still shows the standard mesh
export function upgradeHD() {
  hdLoading ||= (async () => {
    const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(new URL("anatomy-hd.glb", base).href);
    gltf.scene.updateMatrixWorld(true);
    const done = [];
    gltf.scene.traverse((m) => {
      const key = centres[m.name] ? m.name : m.parent?.name, c = centres[key];   // gltfpack puts the name on a parent node
      if (!m.isMesh || !c) return;
      const g = toFloat(m.geometry); g.applyMatrix4(m.matrixWorld); g.translate(-c.x, -c.y, -c.z);   // same local frame as the standard mesh: a drop-in swap
      boxUV(g); g.computeBoundingBox(); g.computeBoundingSphere();
      for (const { mesh, from } of live[key] || []) if (mesh.geometry === from) mesh.geometry = g;
      done.push(key);
    });
    window.dispatchEvent(new CustomEvent("gradify:anatomy-hd", { detail: done }));
    return done;
  })().catch((e) => { console.warn("HD anatomy didn't load", e); return []; });
  return hdLoading;
}

function toFloat(src) {
  const g = new THREE.BufferGeometry(); g.setIndex(src.index);
  for (const name of ["position", "normal"]) { const at = src.attributes[name]; if (!at) continue; const f = new Float32Array(at.count * 3); for (let i = 0; i < at.count; i++) { f[i * 3] = at.getX(i); f[i * 3 + 1] = at.getY(i); f[i * 3 + 2] = at.getZ(i); } g.setAttribute(name, new THREE.BufferAttribute(f, 3)); }
  if (!g.attributes.normal) g.computeVertexNormals();
  return g;
}

// box-projected texture coordinates on a geometry (the HD layer's copy of what the standard build does inline)
function boxUV(g) { g.setAttribute("uv", new THREE.BufferAttribute(boxUVArrays(g.attributes.position.array, g.attributes.normal.array), 2)); }

// texture coordinates by box projection: each vertex uses the two axes its normal points away from,
// in metres × 12, so a texture repeats about every 8 cm whatever the mesh
function boxUVArrays(p, n) {
  const uv = new Float32Array((p.length / 3) * 2);
  for (let i = 0, j = 0; i < p.length; i += 3, j += 2) {
    const ax = Math.abs(n[i]), ay = Math.abs(n[i + 1]), az = Math.abs(n[i + 2]);
    if (ax >= ay && ax >= az) { uv[j] = p[i + 2] * 12; uv[j + 1] = p[i + 1] * 12; }
    else if (ay >= az) { uv[j] = p[i] * 12; uv[j + 1] = p[i + 2] * 12; }
    else { uv[j] = p[i] * 12; uv[j + 1] = p[i + 1] * 12; }
  }
  return uv;
}

// a copy of meshes for one model (the shared geometry isn't duplicated)
export const take = (byKey, key) => (byKey[key] || []).map((m) => { const c = new THREE.Mesh(m.geometry); c.position.copy(m.position); c.name = key; (live[key] ||= []).push({ mesh: c, from: m.geometry }); return c; });

// the scan's skin sits a few millimetres inside parts of its muscle layer (the neck, around the eyes):
// push it out along its normals so everything is covered
export function inflate(mesh, by = 0.004) {
  const g = mesh.geometry.clone(), p = g.attributes.position, n = g.attributes.normal;
  for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) + n.getX(i) * by, p.getY(i) + n.getY(i) * by, p.getZ(i) + n.getZ(i) * by);
  g.computeBoundingSphere(); mesh.geometry = g; return mesh;
}
