// The molecule viewer: a Blender-made model from Gradify's visual pipeline (scripts/visuals/build.py), in the browser.
//   Views        ball and stick · space-filling (atoms at their van der Waals size) · polarity (Gasteiger partial
//                charges, δ+ blue to δ− red) · functional groups (each group highlighted in turn)
//   Chirality    each stereocentre labelled R or S; "Mirror image" shows the other enantiomer, and the labels swap
//   Inspect      tap an atom, or choose it from the atom list, for its bonds, angles, charge and configuration
//   Evidence     how the structure was made and every check it passed: identity against the reference InChIKey, R/S
//                configuration, the model's bond lengths and angles against experiment, and the expert review status
//   Access       arrow keys turn it, + and − zoom, a spoken description, the structure as a table, and the Blender
//                still where WebGL isn't available
//   Review       #/tools/visualise/molecule/<id>/review: a chemist's checklist that produces the reviews.json entry
// Every number shown comes from the structure the pipeline checked; nothing is typed in by hand.
import { esc } from "../core/text.js";
import { qualityTier, maxPixelRatio, adaptiveResolution } from "../core/render-quality.js";

const here = new URL(".", import.meta.url);
let indexP = null;
export const molecules = () => (indexP ||= fetch(new URL("molecules/index.json", here)).then((r) => { if (!r.ok) throw new Error("The molecule library didn't load."); return r.json(); }).then((d) => d.molecules));

// standard atomic weights (IUPAC, abridged), for molar mass
export const WEIGHT = { H: 1.008, C: 12.011, N: 14.007, O: 15.999, S: 32.06, Cl: 35.45, P: 30.974, F: 18.998 };
export const NAME = { H: "hydrogen", C: "carbon", N: "nitrogen", O: "oxygen", S: "sulfur", Cl: "chlorine", P: "phosphorus", F: "fluorine" };
export const COLOUR_NAME = { H: "white", C: "dark grey", N: "blue", O: "red", S: "yellow", Cl: "green", P: "orange", F: "light green" };
const SWATCH = { H: "#fff", C: "#333", N: "#3050f8", O: "#ff0d0d", S: "#ffd833", Cl: "#1ff01f", P: "#ff8000", F: "#90e050" };
export const molarMass = (m) => Object.entries(m.counts).reduce((a, [el, n]) => a + (WEIGHT[el] || 0) * n, 0);
const BOND = { 1: "single", 1.5: "aromatic", 2: "double", 3: "triple" };
const atomName = (m, i) => `${m.atoms[i].el}${i + 1}`;

/** A description of a molecule in words, from its structure (for narration and the text alternative). Pure. */
export function describe(m) {
  const parts = Object.entries(m.counts).map(([el, n]) => `${n} ${NAME[el] || el} ${n === 1 ? "atom" : "atoms"}`);
  const by = (o) => m.bonds.filter((b) => b.order === o).length;
  const bonds = [[1, "single"], [2, "double"], [3, "triple"], [1.5, "aromatic"]].filter(([o]) => by(o)).map(([o, t]) => `${by(o)} ${t}`).join(", ");
  const heavy = m.atoms.map((a, i) => ({ ...a, i })).filter((a) => a.el !== "H");
  const centre = heavy.length === 1 ? heavy[0] : null;
  const ang = centre && m.angles.filter((a) => a.centre === centre.i);
  const groups = [...new Set((m.groups || []).map((g) => g.name))];
  return `${m.name}, ${m.formula}. ${parts.join(", ")}, joined by ${bonds} ${m.bonds.length === 1 ? "bond" : "bonds"}.${ang?.length ? ` The bond angle around the ${NAME[centre.el]} atom is about ${Math.round(ang.reduce((a, x) => a + x.deg, 0) / ang.length)}° in this model.` : ""}${groups.length ? ` Functional groups: ${groups.join(", ")}.` : ""}${m.stereocentres?.length ? ` It has ${m.stereocentres.length} ${m.stereocentres.length === 1 ? "stereocentre" : "stereocentres"}${m.stereocentres.length <= 3 ? ` (${m.stereocentres.map((s) => `${atomName(m, s.atom)} is ${s.label}`).join(", ")})` : ""}.` : ""}${m.racemic ? " It's used as a racemic mixture of both mirror forms; this model shows one." : ""} Molar mass ${molarMass(m).toFixed(2)} g/mol.`;
}

/** Questions worked out from the structure: formula, atom counts, bonds, groups, stereocentres, the central angle. Pure. */
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
  const groups = [...new Set((m.groups || []).map((g) => g.name))];
  const ALL = ["carboxylic acid", "ester", "amide", "ketone", "hydroxyl (alcohol)", "amine", "alkene", "benzene ring", "thiol", "phosphate", "aldehyde"];
  if (groups.length) { const g = groups[Math.floor(rand() * groups.length)]; qs.push({ q: `Which of these functional groups does ${m.name.replace(/\s*\(.*\)$/, "")} contain?`, right: g, options: uniq(g, shuffle(ALL.filter((x) => !groups.includes(x))).slice(0, 3)), why: `Switch to the Functional groups view to see it highlighted: ${groups.join(", ")}.` }); }
  const sc = (m.stereocentres || []).length;
  if (sc) qs.push({ q: "How many stereocentres (chiral centres) does it have?", right: String(sc), options: uniq(String(sc), [String(sc + 1), String(Math.max(0, sc - 1)), String(sc + 2)]), why: `A stereocentre is an atom with four different groups attached. The viewer labels each one R or S: there ${sc === 1 ? "is 1" : `are ${sc}`}.` });
  const heavy = m.atoms.map((a, i) => ({ ...a, i })).filter((a) => a.el !== "H");
  if (heavy.length === 1 && m.angles.some((a) => a.centre === heavy[0].i)) {
    const list = m.angles.filter((a) => a.centre === heavy[0].i), ang = Math.round(list.reduce((a, x) => a + x.deg, 0) / list.length);
    qs.push({ q: `About what is the bond angle around the ${NAME[heavy[0].el]} atom?`, right: `${ang}°`, options: uniq(`${ang}°`, [`${ang === 180 ? 120 : 180}°`, `${ang === 120 ? 109 : 120}°`, `${ang === 90 ? 104 : 90}°`]), why: `Measured from this model: ${ang}°. Lone pairs push bonding pairs closer together, so angles shrink from the 109.5° of a perfect tetrahedron.` });
  }
  return qs.map((x) => ({ ...x, options: shuffle(x.options) }));
}

/** The evidence for a molecule, as plain lines: method, checks, reference comparison, review. Pure. */
export function evidence(m) {
  const C = m.checks, out = [];
  out.push(`Made by: ${m.method}${m.tools ? ` (RDKit ${m.tools.rdkit}, ${m.tools.blender})` : ""}.`);
  if (C.identity) out.push(`Identity: its InChIKey ${C.identity.found} matches the reference compound's${/-[A-Z]{8}SA-N$/.test(C.identity.found) && !/UHFFFAOYSA/.test(C.identity.found) ? ", stereochemistry included" : ""}.`);
  if (C.configuration) out.push(`Configuration: ${C.configuration.found.R} R and ${C.configuration.found.S} S stereocentres, as expected.`);
  if (C.formula) out.push(`Formula: ${C.formula.found}, matching the independently written ${C.formula.expected}.`);
  out.push(`Structure checks passed: ${[C.bonds && "bond lengths", C.clashes && "no clashes", C.sanitise && "valence", C.stereo3d && "stereochemistry kept in 3D"].filter(Boolean).join(", ")}.`);
  return out;
}

/** The Blender still, in every size and format the pipeline published (AVIF first, WebP for older browsers). */
export function stillHtml(m, { hidden = true, alt = `${m.name}, rendered in Blender` } = {}) {
  const sizes = m.files.sizes || [], src = (w, x) => new URL(`molecules/${m.id}-${w}.${x}`, here).href;
  const set = (x) => sizes.map((w) => `${src(w, x)} ${w}w`).join(", ");
  return `<picture class="mv3-still" ${hidden ? "hidden" : ""}>${sizes.length ? `<source type="image/avif" srcset="${set("avif")}" sizes="(max-width: 860px) 100vw, 60vw">` : ""}<img src="${new URL(`molecules/${m.files.still}`, here).href}" ${sizes.length ? `srcset="${set("webp")}" sizes="(max-width: 860px) 100vw, 60vw"` : ""} alt="${esc(alt)}" loading="lazy" decoding="async"></picture>`;
}

/** Mount the viewer for molecule `id` in `el`. o.review: show the reviewer's checklist. */
export async function mountMolecule(el, id, { speak, review = false } = {}) {
  const list = await molecules(), m = list.find((x) => x.id === id);
  if (!m) { el.innerHTML = `<p class="sub">That molecule isn't in the library yet.</p>`; return; }
  const geo = m.reference?.geometry || [];
  const groups = [...new Map((m.groups || []).map((g) => [g.name, g])).keys()];
  el.innerHTML = `<div class="mv3"><div class="mv3-stage"><canvas aria-label="3D model of ${esc(m.name)}. Arrow keys turn it, plus and minus zoom. ${esc(describe(m))}" role="img" tabindex="0"></canvas><div class="mv3-labels" aria-hidden="true"></div>
      ${stillHtml(m)}<p class="mv3-mode-note" aria-live="polite"></p></div>
    <div class="mv3-side"><span class="tl-k">Molecule · ${esc(m.formula)} · ${molarMass(m).toFixed(2)} g/mol</span><h2>${esc(m.name)}</h2><p class="mv3-desc">${esc(describe(m))}</p>
      <div class="seg-chips mv3-modes" role="radiogroup" aria-label="View">${[["ball", "Ball and stick"], ["space", "Space-filling"], ["polar", "Polarity"], ...(groups.length ? [["groups", "Functional groups"]] : [])].map(([k, t], i) => `<button type="button" class="chip" role="radio" data-mode="${k}" aria-checked="${i === 0}">${t}</button>`).join("")}</div>
      <div class="mv3-groups" hidden>${groups.map((g, i) => `<button type="button" class="tl-mini" data-group="${esc(g)}" aria-pressed="${i === 0}">${esc(g)}</button>`).join("")}</div>
      <div class="tl-bar"><button type="button" class="tl-mini" data-labels aria-pressed="false">Label atoms</button><button type="button" class="tl-mini" data-spin aria-pressed="true">Turn</button>${m.stereocentres?.length ? `<button type="button" class="tl-mini" data-mirror aria-pressed="false">Mirror image</button>` : ""}<button type="button" class="tl-mini" data-say>🔊 Describe it</button><a class="tl-mini" href="${new URL(`molecules/${m.files.still}`, here)}" download="${esc(m.id)}.webp">Download picture</a></div>
      <label class="mv3-pick"><span class="sub">Inspect an atom</span><select data-atom><option value="">Choose an atom…</option>${m.atoms.map((a, i) => `<option value="${i}">${atomName(m, i)} · ${NAME[a.el] || a.el}${a.cip ? ` · ${a.cip}` : ""}</option>`).join("")}</select></label>
      <div class="mv3-atom" aria-live="polite"><p class="sub">Tap an atom, or choose one above, to see its bonds, angles and charge.</p></div>
      <div class="mv3-key">${Object.keys(m.counts).map((e) => `<span><i style="background:${SWATCH[e] || "#c8c"}"></i>${NAME[e] || e}</span>`).join("")}</div>
      <details class="mv3-ev" open><summary><b>How we know it's right</b></summary><ul>${evidence(m).map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
        ${geo.length ? `<table class="mv3-table"><caption>This model against experiment (${esc(m.checks.geometry?.source || "NIST CCCBDB")})</caption><thead><tr><th>Measure</th><th>Model</th><th>Experiment</th></tr></thead><tbody>${geo.map((g) => `<tr><td>${esc(g.what)}</td><td>${g.model}${g.unit}</td><td>${g.experiment}${g.unit}</td></tr>`).join("")}</tbody></table>` : `<p class="sub">No experimental geometry is on file for this molecule, so its shape is the force field's (typically within a few hundredths of an ångström and a few degrees).</p>`}
        <p class="mv3-qa">${m.review.status === "reviewed" ? `<b>Reviewed</b> by ${esc(m.review.by)} on ${esc(m.review.on)}.` : "<b>Not yet reviewed by a chemist.</b> The automated checks above all passed."} Atoms are drawn at 30% of their van der Waals size in ball and stick, and full size in space-filling; distances and angles are to scale.</p></details>
      <details><summary>The structure as a table</summary><table class="mv3-table"><thead><tr><th>Bond</th><th>Type</th><th>Length</th></tr></thead><tbody>${m.bonds.map((b) => `<tr><td>${atomName(m, b.a)}–${atomName(m, b.b)}</td><td>${BOND[b.order] || b.order}</td><td>${b.length.toFixed(3)} Å</td></tr>`).join("")}</tbody></table></details></div>
    <div class="mv3-qs"></div>${review ? `<div class="mv3-review panel glass"></div>` : ""}</div>`;
  const qbox = el.querySelector(".mv3-qs");
  qbox.innerHTML = `<h3>Check yourself</h3>${questionsFor(m).map((q, i) => `<div class="qz" data-i="${i}"><p>${esc(q.q)}</p><div class="pv-opts">${q.options.map((o) => `<button type="button" class="qz-opt" data-right="${o === q.right}">${esc(o)}</button>`).join("")}</div><p class="sub pv-why" hidden>${esc(q.why)}</p></div>`).join("")}`;
  qbox.addEventListener("click", (e) => { const b = e.target.closest(".qz-opt"), box = b?.closest(".qz"); if (!b || box.querySelector("[disabled]")) return; box.querySelectorAll(".qz-opt").forEach((x) => { x.disabled = true; if (x.dataset.right === "true") x.classList.add("right"); }); if (b.dataset.right !== "true") b.classList.add("wrong"); box.querySelector(".pv-why").hidden = false; });
  el.querySelector("[data-say]").addEventListener("click", () => (speak ? speak(describe(m)) : window.speechSynthesis?.speak(new SpeechSynthesisUtterance(describe(m)))));
  if (review) reviewForm(el.querySelector(".mv3-review"), m);

  // ---------- the 3D model ----------
  const canvasEl = el.querySelector("canvas"), labelsEl = el.querySelector(".mv3-labels"), note = el.querySelector(".mv3-mode-note");
  const still = () => { canvasEl.hidden = true; el.querySelector(".mv3-still").hidden = false; el.querySelector(".mv3-modes").hidden = true; el.querySelector(".mv3-still img").loading = "eager"; };
  let THREE, GLTFLoader, OrbitControls, RoomEnvironment, renderer;
  try {
    THREE = await import("../vendor/three/three.module.min.js");
    ({ GLTFLoader } = await import("../vendor/three/addons/GLTFLoader.js"));
    ({ OrbitControls } = await import("../vendor/three/OrbitControls.js"));
    ({ RoomEnvironment } = await import("../vendor/three/addons/RoomEnvironment.js"));
    renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true });
  } catch { still(); return; }
  // the same render quality as every other 3D view on Gradify (kit/core/render-quality.js): up to 4K on capable
  // devices, and the resolution follows the frame rate so a slow GPU drops pixels, not frames
  const tier = qualityTier();
  const res = adaptiveResolution((pr) => { renderer.setPixelRatio(pr); renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight, false); });
  const scene = new THREE.Scene(), pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const cam = new THREE.PerspectiveCamera(40, 1, 0.01, 200);
  const controls = new OrbitControls(cam, canvasEl); controls.enableDamping = true;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.aMotion === "reduce";
  controls.autoRotate = !reduce; controls.autoRotateSpeed = 1.2;
  el.querySelector("[data-spin]").setAttribute("aria-pressed", String(!reduce));
  let gltf; try { gltf = await new GLTFLoader().loadAsync(new URL(`molecules/${m.files.glb}`, here).href); } catch { still(); return; }
  const model = gltf.scene; scene.add(model);
  // fit the whole molecule (its bounding sphere, plus the atoms' own size) in whichever way the view is narrower
  const sphere = new THREE.Box3().setFromObject(model).getBoundingSphere(new THREE.Sphere()), r = (sphere.radius || 1) + 0.4;
  model.position.sub(sphere.center);
  // space-filling atoms reach about 1.4 Å further out than ball-and-stick ones
  const fitDistance = () => { const v = THREE.MathUtils.degToRad(cam.fov) / 2, h = Math.atan(Math.tan(v) * cam.aspect); return ((r + (mode === "space" ? 1.4 : 0)) / Math.sin(Math.min(v, h))) * 1.08; };
  controls.target.set(0, 0, 0); controls.minDistance = r * 0.6; controls.maxDistance = r * 8;
  const atoms = [], bondsM = [];
  model.traverse((o) => { if (!o.isMesh) return; const mm = o.name?.match(/^([A-Z][a-z]?)(\d+)$/); if (mm) atoms.push({ o, el: mm[1], i: +mm[2], mat: o.material }); else if (/^bond/.test(o.name)) bondsM.push(o); });
  let fitted = false, labels = false, raf = 0, picked = null, mode = "ball", mirrored = false, group = groups[0];
  const size = () => {
    const w = canvasEl.clientWidth, h = canvasEl.clientHeight; if (!w || !h) return;
    res.ceiling = maxPixelRatio(tier, w, h); renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
    // keep the learner's zoom once they've moved it; until then, keep the molecule fitted to the view
    if (!fitted) { cam.position.set(0, 0, fitDistance()); }
  };
  controls.addEventListener("start", () => { fitted = true; });
  new ResizeObserver(size).observe(canvasEl); size();


  const v = new THREE.Vector3();
  const cipOf = (i) => { const c = m.atoms[i].cip; return c ? (mirrored ? (c === "R" ? "S" : "R") : c) : null; };
  const drawLabels = () => {
    const w = canvasEl.clientWidth, h = canvasEl.clientHeight, show = [];
    for (const a of atoms) {
      const q = m.atoms[a.i].q || 0, cip = cipOf(a.i);
      let t = null;
      if (cip) t = `${cip}`;
      if (mode === "polar" && Math.abs(q) >= 0.15) t = q > 0 ? "δ+" : "δ−";
      if (labels && (a.el !== "H" || atoms.length < 14)) t = `${a.el}${a.i + 1}${cip ? ` (${cip})` : ""}`;
      if (!t) continue;
      a.o.getWorldPosition(v); v.project(cam); show.push(`<span class="${cip && !labels ? "cip" : ""}" style="left:${((v.x + 1) / 2) * w}px;top:${((1 - v.y) / 2) * h}px">${t}</span>`);
    }
    labelsEl.innerHTML = show.join("");
  };
  let last = 0;
  const loop = (now = 0) => { if (!canvasEl.isConnected) { cancelAnimationFrame(raf); renderer.dispose(); return; } if (last && document.visibilityState === "visible") res.frame(now - last); last = now; controls.update(); renderer.render(scene, cam); drawLabels(); raf = requestAnimationFrame(loop); };
  loop();

  // views
  // δ− red, neutral white, δ+ blue (the usual electrostatic colouring), at full strength from ±0.3
  const RED = new THREE.Color(0xe8202a), BLUE = new THREE.Color(0x2a5cff), WHITE = new THREE.Color(0xf2f2f2);
  const polarColour = (q) => { const t = Math.max(-1, Math.min(1, q / 0.3)); return WHITE.clone().lerp(t < 0 ? RED : BLUE, Math.abs(t)); };
  const bondOf = (o) => { const k = o.name.match(/^bond(\d+)/); return k ? m.bonds[+k[1]] : null; };
  const DIM = new THREE.MeshStandardMaterial({ color: 0x8a8a9a, transparent: true, opacity: 0.12, depthWrite: false });
  const inGroup = (i) => (m.groups || []).some((g) => g.name === group && g.atoms.includes(i));
  const glows = new Map();
  const glow = (mat) => { if (!glows.has(mat)) { const g = mat.clone(); g.emissive = new THREE.Color(0xffc002); g.emissiveIntensity = 0.35; glows.set(mat, g); } return glows.get(mat); };
  const applyMode = () => {
    for (const a of atoms) {
      a.o.scale.setScalar(mode === "space" ? 1 / 0.3 : 1);
      if (mode === "polar") a.o.material = new THREE.MeshStandardMaterial({ color: polarColour(m.atoms[a.i].q || 0), roughness: 0.4 });
      else if (mode === "groups") { const on = inGroup(a.i); a.o.material = on ? glow(a.mat) : DIM; }
      else a.o.material = a.mat;
    }
    for (const b of bondsM) {
      b.visible = mode !== "space";
      if (!b.userData.mat) b.userData.mat = b.material;
      const bd = bondOf(b);
      b.material = mode === "groups" && !(bd && inGroup(bd.a) && inGroup(bd.b)) ? DIM : b.userData.mat;
    }
    if (!fitted) cam.position.setLength(fitDistance());
    if (picked) picked.o.scale.multiplyScalar(1.25);
    el.querySelector(".mv3-groups").hidden = mode !== "groups";
    note.textContent = mode === "space" ? "Space-filling: each atom at its van der Waals size, so you see the molecule's real outline and how much room it takes up." : mode === "polar" ? "Polarity: Gasteiger partial charges, an estimate. Red atoms carry a partial negative charge (δ−), blue a partial positive (δ+)." : mode === "groups" ? `Highlighted: ${group}.` : "";
  };
  el.querySelector(".mv3-modes").addEventListener("click", (e) => { const b = e.target.closest("[data-mode]"); if (!b) return; mode = b.dataset.mode; el.querySelectorAll("[data-mode]").forEach((x) => x.setAttribute("aria-checked", String(x === b))); applyMode(); });
  el.querySelector(".mv3-groups").addEventListener("click", (e) => { const b = e.target.closest("[data-group]"); if (!b) return; group = b.dataset.group; el.querySelectorAll("[data-group]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); applyMode(); });
  el.querySelector("[data-labels]").addEventListener("click", (e) => { labels = !labels; e.currentTarget.setAttribute("aria-pressed", String(labels)); });
  el.querySelector("[data-spin]").addEventListener("click", (e) => { controls.autoRotate = !controls.autoRotate; e.currentTarget.setAttribute("aria-pressed", String(controls.autoRotate)); });
  el.querySelector("[data-mirror]")?.addEventListener("click", (e) => {
    mirrored = !mirrored; model.scale.x = mirrored ? -1 : 1; e.currentTarget.setAttribute("aria-pressed", String(mirrored));
    note.textContent = mirrored ? `Mirror image: the other enantiomer. Every stereocentre's label swaps (R ↔ S). It can't be turned to fit on the original, which is what makes the molecule chiral.${m.id === "alanine" ? " This is D-alanine." : ""}` : "";
    if (picked) inspect(picked);
  });
  // keyboard: arrows turn, + and − zoom
  canvasEl.addEventListener("keydown", (e) => {
    const off = cam.position.clone().sub(controls.target), s = new THREE.Spherical().setFromVector3(off), step = 0.12;
    if (e.key === "ArrowLeft") s.theta -= step; else if (e.key === "ArrowRight") s.theta += step;
    else if (e.key === "ArrowUp") s.phi = Math.max(0.1, s.phi - step); else if (e.key === "ArrowDown") s.phi = Math.min(Math.PI - 0.1, s.phi + step);
    else if (e.key === "+" || e.key === "=") s.radius = Math.max(controls.minDistance, s.radius * 0.88); else if (e.key === "-") s.radius = Math.min(controls.maxDistance, s.radius * 1.12);
    else return;
    e.preventDefault(); controls.autoRotate = false; el.querySelector("[data-spin]").setAttribute("aria-pressed", "false");
    cam.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(s));
  });
  // inspecting an atom: tap it, or choose it from the list
  function inspect(a) {
    if (picked) picked.o.scale.setScalar(mode === "space" ? 1 / 0.3 : 1);
    picked = a; a.o.scale.setScalar((mode === "space" ? 1 / 0.3 : 1) * 1.25);
    const i = a.i, bonds = m.bonds.filter((b) => b.a === i || b.b === i), angs = m.angles.filter((x) => x.centre === i), q = m.atoms[i].q, cip = cipOf(i);
    el.querySelector("[data-atom]").value = String(i);
    el.querySelector(".mv3-atom").innerHTML = `<b>${NAME[a.el] || a.el} ${i + 1}</b>${cip ? ` <span class="pill-dark">${cip} stereocentre</span>` : ""}<ul>${bonds.map((b) => { const o = b.a === i ? b.b : b.a; return `<li>${BOND[b.order]} bond to ${atomName(m, o)}: ${b.length.toFixed(3)} Å</li>`; }).join("")}</ul>${angs.length ? `<p class="sub">Angles here: ${angs.slice(0, 6).map((x) => `${atomName(m, x.a)}–${atomName(m, i)}–${atomName(m, x.b)} ${x.deg}°`).join(" · ")}</p>` : ""}${q != null ? `<p class="sub">Partial charge (Gasteiger estimate): ${q > 0 ? "+" : ""}${q.toFixed(2)}</p>` : ""}`;
  }
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  canvasEl.addEventListener("click", (e) => {
    const rc = canvasEl.getBoundingClientRect(); ptr.set(((e.clientX - rc.left) / rc.width) * 2 - 1, -((e.clientY - rc.top) / rc.height) * 2 + 1);
    ray.setFromCamera(ptr, cam);
    const hit = ray.intersectObjects(atoms.map((a) => a.o))[0]; if (hit) inspect(atoms.find((x) => x.o === hit.object));
  });
  el.querySelector("[data-atom]").addEventListener("change", (e) => { const a = atoms.find((x) => x.i === +e.target.value); if (a) inspect(a); });
}

// ---------- the expert review checklist ----------
export const REVIEW_CHECKS = [
  ["structure", "The atoms and how they're connected are right for this compound"],
  ["stereo", "Stereochemistry (R/S, cis/trans) is right, or there is none"],
  ["geometry", "The shape is right: bond lengths, angles and conformation are reasonable for teaching"],
  ["description", "The description, functional groups and charges shown are right"],
  ["questions", "Every question and its explanation is right"],
];
function reviewForm(box, m) {
  box.innerHTML = `<h3>Chemist's review</h3><p class="sub">Check each point against your own knowledge or a reference. When everything is right, copy the entry into <code>scripts/visuals/reviews.json</code> (or send it to hello@getgradify.com) and the viewer will show the review.</p>
    <form class="mv3-rf">${REVIEW_CHECKS.map(([k, t]) => `<label class="tl-fact"><input type="checkbox" class="tl-switch" name="${k}"><span>${esc(t)}</span></label>`).join("")}
      <label><span class="sub">Your name and qualification</span><input name="by" required maxlength="120" placeholder="e.g. Dr A. Chemist, MRSC"></label><label><span class="sub">Notes (anything to fix)</span><textarea name="notes" rows="2"></textarea></label>
      <button class="btn btn-primary lg btn-sm"><span>Make the review entry</span></button></form><pre class="mv3-entry" hidden></pre>`;
  box.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault(); const f = new FormData(e.target), all = REVIEW_CHECKS.every(([k]) => f.has(k));
    const entry = { [m.id]: { status: all ? "reviewed" : "changes-needed", by: f.get("by").trim(), on: new Date().toISOString().slice(0, 10), content: m.content, checks: Object.fromEntries(REVIEW_CHECKS.map(([k]) => [k, f.has(k)])), notes: f.get("notes").trim() } };
    const pre = box.querySelector(".mv3-entry"); pre.hidden = false; pre.textContent = JSON.stringify(entry, null, 2);
    navigator.clipboard?.writeText(pre.textContent).catch(() => {});
  });
}
