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
    for (const m of meshes) {
      const key = keys.has(m.name) ? m.name : m.name.replace(/_\d+$/, "");
      const g = new THREE.BufferGeometry(); g.setIndex(m.geometry.index);
      // the file stores positions and normals as quantised integers: read them out as floats first
      for (const name of ["position", "normal"]) { const at = m.geometry.attributes[name]; if (!at) continue; const f = new Float32Array(at.count * 3); for (let i = 0; i < at.count; i++) { f[i * 3] = at.getX(i); f[i * 3 + 1] = at.getY(i); f[i * 3 + 2] = at.getZ(i); } g.setAttribute(name, new THREE.BufferAttribute(f, 3)); }
      g.applyMatrix4(m.matrixWorld); if (g.attributes.normal) g.attributes.normal.needsUpdate = true; else g.computeVertexNormals();
      g.computeBoundingBox(); const c = g.boundingBox.getCenter(new THREE.Vector3()); g.translate(-c.x, -c.y, -c.z);
      boxUV(g);
      const mesh = new THREE.Mesh(g); mesh.position.copy(c); mesh.name = key;
      (byKey[key] ||= []).push(mesh); centres[key] ||= c;
    }
    const anchors = Object.fromEntries(catalog.filter((c) => c.anchor).map((c) => [c.key, new THREE.Vector3(...c.anchor)]));
    if (wantsHD()) (window.requestIdleCallback || setTimeout)(() => upgradeHD(), { timeout: 1500 });
    return { byKey, anchors, catalog };
  })();
  return loading;
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

// texture coordinates by box projection: each vertex uses the two axes its normal points away from,
// in metres × 12, so a texture repeats about every 8 cm whatever the mesh
function boxUV(g) {
  const p = g.attributes.position, n = g.attributes.normal, uv = new Float32Array(p.count * 2);
  for (let i = 0; i < p.count; i++) {
    const ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i)), az = Math.abs(n.getZ(i));
    const [u, v] = ax >= ay && ax >= az ? [p.getZ(i), p.getY(i)] : ay >= az ? [p.getX(i), p.getZ(i)] : [p.getX(i), p.getY(i)];
    uv[i * 2] = u * 12; uv[i * 2 + 1] = v * 12;
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
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
