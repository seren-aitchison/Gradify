// The molecule viewer: a Blender-made model from Gradify's visual pipeline (scripts/visuals/build.py), in the browser.
// Turn and zoom it, label the atoms, tap an atom for its bonds and angles, hear it described, read it as a table
// (for screen readers), and answer questions worked out from the checked structure itself. Every number shown comes
// from the structure the pipeline checked; nothing is typed in by hand.
import { esc } from "../core/text.js";

const here = new URL(".", import.meta.url);
let indexP = null;
export const molecules = () => (indexP ||= fetch(new URL("molecules/index.json", here)).then((r) => { if (!r.ok) throw new Error("The molecule library didn't load."); return r.json(); }).then((d) => d.molecules));

// standard atomic weights (IUPAC, abridged), for molar mass
export const WEIGHT = { H: 1.008, C: 12.011, N: 14.007, O: 15.999, S: 32.06, Cl: 35.45, P: 30.974, F: 18.998 };
export const NAME = { H: "hydrogen", C: "carbon", N: "nitrogen", O: "oxygen", S: "sulfur", Cl: "chlorine", P: "phosphorus", F: "fluorine" };
export const COLOUR_NAME = { H: "white", C: "dark grey", N: "blue", O: "red", S: "yellow", Cl: "green", P: "orange", F: "light green" };
export const molarMass = (m) => Object.entries(m.counts).reduce((a, [el, n]) => a + (WEIGHT[el] || 0) * n, 0);
const BOND = { 1: "single", 1.5: "aromatic", 2: "double", 3: "triple" };

/** A description of a molecule in words, from its structure (for narration and the text alternative). Pure. */
export function describe(m) {
  const parts = Object.entries(m.counts).map(([el, n]) => `${n} ${NAME[el] || el} ${n === 1 ? "atom" : "atoms"}`);
  const by = (o) => m.bonds.filter((b) => b.order === o).length;
  const bonds = [[1, "single"], [2, "double"], [3, "triple"], [1.5, "aromatic"]].filter(([o]) => by(o)).map(([o, t]) => `${by(o)} ${t}`).join(", ");
  const heavy = m.atoms.map((a, i) => ({ ...a, i })).filter((a) => a.el !== "H");
  const centre = heavy.length === 1 ? heavy[0] : null;
  const ang = centre && m.angles.filter((a) => a.centre === centre.i);
  return `${m.name}, ${m.formula}. ${parts.join(", ")}, joined by ${bonds} ${m.bonds.length === 1 ? "bond" : "bonds"}.${ang?.length ? ` The bond angle around the ${NAME[centre.el]} atom is about ${Math.round(ang.reduce((a, x) => a + x.deg, 0) / ang.length)}° in this model.` : ""}${m.stereocentres?.length ? ` It has ${m.stereocentres.length} ${m.stereocentres.length === 1 ? "stereocentre" : "stereocentres"}.` : ""} Molar mass ${molarMass(m).toFixed(2)} g/mol.`;
}

/** Questions worked out from the structure: formula, atom counts, bond types, the central bond angle. Pure. */
export function questionsFor(m, rand = Math.random) {
  const qs = [];
  const shuffle = (a) => a.map((x) => [rand(), x]).sort((p, q) => p[0] - q[0]).map((x) => x[1]);
  const uniq = (right, wrong) => [...new Set([right, ...wrong])].filter((x) => x !== undefined).slice(0, 4);
  const h = m.counts.H || 0;
  const alt = (dh) => m.formula.replace(/H(\d*)/, (_, n) => { const v = (n ? +n : 1) + dh; return v <= 0 ? "" : v === 1 ? "H" : `H${v}`; });
  if (h > 1) qs.push({ q: `What is the molecular formula of ${m.name.replace(/\s*\(.*\)$/, "")}?`, right: m.formula, options: uniq(m.formula, [alt(2), alt(-2), alt(1)]), why: `Count the atoms of each element: ${Object.entries(m.counts).map(([e, n]) => `${n} ${e}`).join(", ")}.` });
  const els = Object.keys(m.counts).filter((e) => e !== "H");
  if (els.length) { const e = els[Math.floor(rand() * els.length)], n = m.counts[e]; qs.push({ q: `How many ${NAME[e]} atoms are in one molecule?`, right: String(n), options: uniq(String(n), [String(n + 1), String(Math.max(1, n - 1)), String(n + 2)]), why: `The ${COLOUR_NAME[e]} spheres are ${NAME[e]}: there are ${n}.` }); }
  const d = m.bonds.filter((b) => b.order === 2).length;
  qs.push({ q: "How many double bonds does this model show (not counting aromatic ring bonds)?", right: String(d), options: uniq(String(d), [String(d + 1), String(Math.max(0, d - 1)), String(d + 2)]), why: `Double bonds are drawn as two sticks side by side: there ${d === 1 ? "is 1" : `are ${d}`}.` });
  const heavy = m.atoms.map((a, i) => ({ ...a, i })).filter((a) => a.el !== "H");
  if (heavy.length === 1 && m.angles.some((a) => a.centre === heavy[0].i)) {
    const ang = Math.round(m.angles.filter((a) => a.centre === heavy[0].i).reduce((a, x) => a + x.deg, 0) / m.angles.filter((a) => a.centre === heavy[0].i).length);
    qs.push({ q: `About what is the bond angle around the ${NAME[heavy[0].el]} atom?`, right: `${ang}°`, options: uniq(`${ang}°`, [`${ang === 180 ? 120 : 180}°`, `${ang === 120 ? 109 : 120}°`, `${ang === 90 ? 104 : 90}°`]), why: `Measured from this model: ${ang}°. Lone pairs push bonding pairs closer together, so angles shrink from the 109.5° of a perfect tetrahedron.` });
  }
  return qs.map((x) => ({ ...x, options: shuffle(x.options) }));
}

/** Mount the viewer for molecule `id` in `el`. */
export async function mountMolecule(el, id, { speak } = {}) {
  const list = await molecules(), m = list.find((x) => x.id === id);
  if (!m) { el.innerHTML = `<p class="sub">That molecule isn't in the library yet.</p>`; return; }
  const checks = Object.entries(m.checks).filter(([, v]) => v.ok).map(([k]) => ({ formula: "formula", stereo: "stereochemistry", stereo3d: "3D stereochemistry", bonds: "bond lengths", clashes: "no clashes", sanitise: "valence" }[k] || k));
  el.innerHTML = `<div class="mv3"><div class="mv3-stage"><canvas aria-label="3D model of ${esc(m.name)}. ${esc(describe(m))}" role="img" tabindex="0"></canvas><div class="mv3-labels" aria-hidden="true"></div>
      <img class="mv3-still" src="${new URL(`molecules/${m.files.still}`, here)}" alt="${esc(m.name)}, rendered" hidden></div>
    <div class="mv3-side"><span class="tl-k">Molecule · ${esc(m.formula)} · ${molarMass(m).toFixed(2)} g/mol</span><h2>${esc(m.name)}</h2><p class="mv3-desc">${esc(describe(m))}</p>
      <div class="tl-bar"><button type="button" class="tl-mini" data-labels aria-pressed="false">Label atoms</button><button type="button" class="tl-mini" data-spin aria-pressed="true">Turn</button><button type="button" class="tl-mini" data-say>🔊 Describe it</button><a class="tl-mini" href="${new URL(`molecules/${m.files.still}`, here)}" download="${esc(m.id)}.webp">Download picture</a></div>
      <div class="mv3-atom" aria-live="polite"><p class="sub">Tap an atom to see its bonds and angles.</p></div>
      <div class="mv3-key">${Object.keys(m.counts).map((e) => `<span><i style="background:${{ H: "#fff", C: "#333", N: "#3050f8", O: "#ff0d0d", S: "#ffd833", Cl: "#1ff01f" }[e] || "#c8c"}"></i>${NAME[e] || e}</span>`).join("")}</div>
      <p class="mv3-qa"><b>How this was made.</b> ${esc(m.method)} (RDKit ${esc(m.rdkit)}), rendered in Blender. Automated checks passed: ${checks.join(", ")}. ${m.review.status === "pending" ? "Not yet reviewed by a chemist." : `Reviewed by ${esc(m.review.by)} on ${esc(m.review.on)}.`} Atoms are drawn at 30% of their van der Waals size so the bonds show; distances and angles are to scale.</p>
      <details><summary>The structure as a table</summary><table class="mv3-table"><thead><tr><th>Bond</th><th>Type</th><th>Length</th></tr></thead><tbody>${m.bonds.map((b) => `<tr><td>${m.atoms[b.a].el}${b.a + 1}–${m.atoms[b.b].el}${b.b + 1}</td><td>${BOND[b.order] || b.order}</td><td>${b.length.toFixed(3)} Å</td></tr>`).join("")}</tbody></table></details></div>
    <div class="mv3-qs"></div></div>`;
  // questions
  const qbox = el.querySelector(".mv3-qs");
  qbox.innerHTML = `<h3>Check yourself</h3>${questionsFor(m).map((q, i) => `<div class="qz" data-i="${i}"><p>${esc(q.q)}</p><div class="pv-opts">${q.options.map((o) => `<button type="button" class="qz-opt" data-right="${o === q.right}">${esc(o)}</button>`).join("")}</div><p class="sub pv-why" hidden>${esc(q.why)}</p></div>`).join("")}`;
  qbox.addEventListener("click", (e) => { const b = e.target.closest(".qz-opt"), box = b?.closest(".qz"); if (!b || box.querySelector("[disabled]")) return; box.querySelectorAll(".qz-opt").forEach((x) => { x.disabled = true; if (x.dataset.right === "true") x.classList.add("right"); }); if (b.dataset.right !== "true") b.classList.add("wrong"); box.querySelector(".pv-why").hidden = false; });
  el.querySelector("[data-say]").addEventListener("click", () => speak ? speak(describe(m)) : window.speechSynthesis?.speak(new SpeechSynthesisUtterance(describe(m))));

  // the 3D model (three.js); if WebGL isn't available, the Blender still instead
  const canvasEl = el.querySelector("canvas"), labelsEl = el.querySelector(".mv3-labels");
  let THREE, GLTFLoader, OrbitControls, RoomEnvironment;
  try {
    THREE = await import("../vendor/three/three.module.min.js");
    ({ GLTFLoader } = await import("../vendor/three/addons/GLTFLoader.js"));
    ({ OrbitControls } = await import("../vendor/three/OrbitControls.js"));
    ({ RoomEnvironment } = await import("../vendor/three/addons/RoomEnvironment.js"));
  } catch { canvasEl.hidden = true; el.querySelector(".mv3-still").hidden = false; return; }
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true }); }
  catch { canvasEl.hidden = true; el.querySelector(".mv3-still").hidden = false; return; }
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  const scene = new THREE.Scene(), pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const cam = new THREE.PerspectiveCamera(40, 1, 0.01, 200);
  const controls = new OrbitControls(cam, canvasEl); controls.enableDamping = true;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.aMotion === "reduce";
  controls.autoRotate = !reduce; controls.autoRotateSpeed = 1.2;
  el.querySelector("[data-spin]").setAttribute("aria-pressed", String(!reduce));
  const gltf = await new GLTFLoader().loadAsync(new URL(`molecules/${m.files.glb}`, here).href);
  scene.add(gltf.scene);
  const box = new THREE.Box3().setFromObject(gltf.scene), r = box.getSize(new THREE.Vector3()).length() / 2 || 1;
  cam.position.set(0, 0, r * 2.6); controls.target.set(0, 0, 0); controls.minDistance = r * 0.8; controls.maxDistance = r * 6;
  const atoms = []; gltf.scene.traverse((o) => { const mm = o.name?.match(/^([A-Z][a-z]?)(\d+)$/); if (mm && o.isMesh) atoms.push({ o, el: mm[1], i: +mm[2] }); });
  const size = () => { const w = canvasEl.clientWidth, h = canvasEl.clientHeight; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); };
  new ResizeObserver(size).observe(canvasEl); size();
  let labels = false, raf = 0, picked = null;
  const v = new THREE.Vector3();
  const drawLabels = () => {
    if (!labels) { labelsEl.innerHTML = ""; return; }
    const w = canvasEl.clientWidth, h = canvasEl.clientHeight;
    labelsEl.innerHTML = atoms.filter((a) => a.el !== "H" || atoms.length < 12).map((a) => { a.o.getWorldPosition(v); v.project(cam); return `<span style="left:${((v.x + 1) / 2) * w}px;top:${((1 - v.y) / 2) * h}px">${a.el}${a.i + 1}</span>`; }).join("");
  };
  const loop = () => { if (!canvasEl.isConnected) { cancelAnimationFrame(raf); renderer.dispose(); return; } controls.update(); renderer.render(scene, cam); drawLabels(); raf = requestAnimationFrame(loop); };
  loop();
  el.querySelector("[data-labels]").addEventListener("click", (e) => { labels = !labels; e.currentTarget.setAttribute("aria-pressed", String(labels)); });
  el.querySelector("[data-spin]").addEventListener("click", (e) => { controls.autoRotate = !controls.autoRotate; e.currentTarget.setAttribute("aria-pressed", String(controls.autoRotate)); });
  // tap an atom: its bonds and the angles around it
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  canvasEl.addEventListener("click", (e) => {
    const rc = canvasEl.getBoundingClientRect(); ptr.set(((e.clientX - rc.left) / rc.width) * 2 - 1, -((e.clientY - rc.top) / rc.height) * 2 + 1);
    ray.setFromCamera(ptr, cam);
    const hit = ray.intersectObjects(atoms.map((a) => a.o))[0]; if (!hit) return;
    const a = atoms.find((x) => x.o === hit.object);
    if (picked) picked.o.scale.setScalar(1); picked = a; a.o.scale.setScalar(1.25);
    const bonds = m.bonds.filter((b) => b.a === a.i || b.b === a.i), angs = m.angles.filter((x) => x.centre === a.i);
    el.querySelector(".mv3-atom").innerHTML = `<b>${NAME[a.el] || a.el} ${a.i + 1}</b><ul>${bonds.map((b) => { const o = b.a === a.i ? b.b : b.a; return `<li>${BOND[b.order]} bond to ${m.atoms[o].el}${o + 1}: ${b.length.toFixed(3)} Å</li>`; }).join("")}</ul>${angs.length ? `<p class="sub">Angles here: ${angs.slice(0, 6).map((x) => `${m.atoms[x.a].el}${x.a + 1}–${a.el}${a.i + 1}–${m.atoms[x.b].el}${x.b + 1} ${x.deg}°`).join(" · ")}</p>` : ""}`;
  });
}
