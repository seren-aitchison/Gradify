// Human organ-system explorer on the BodyParts3D anatomy model (the same model as SportGradify's body):
// switch body systems on and off, tap an organ for what it does and which systems it belongs to.
// The model is an adult male; some organs (female reproductive organs, lymph nodes, most glands' detail)
// aren't in it, and organs that serve two systems (the pancreas) are listed under both.
import { shell, panel, challenges, esc } from "../lab.js";
import { stage3d, THREE } from "../three.js";
import { loadAnatomy, take, ATTRIBUTION } from "../../models/anatomy-glb.js";

export const SYSTEMS = {
  circulatory: { name: "Circulatory", col: 0xe03131, keys: ["heart", "aorta", "coronary_arteries", "pulmonary_vessels", "vena_cava_inferior", "vena_cava_superior", "carotid_l", "carotid_r", "arteries_abdomen", "arteries_thorax", "arteries_head", "arteries_arm_l", "arteries_arm_r", "arteries_leg_l", "arteries_leg_r", "arteries_pelvis", "veins_abdomen", "veins_thorax", "veins_arm_l", "veins_arm_r", "veins_leg_l", "veins_leg_r", "veins_pelvis"], about: "Pumps blood through vessels to deliver oxygen and nutrients and remove carbon dioxide and wastes. Two circuits: pulmonary (to the lungs) and systemic (to the body)." },
  respiratory: { name: "Respiratory", col: 0xf783ac, keys: ["larynx", "trachea", "bronchi", "lung_l", "lung_r", "diaphragm"], about: "Ventilation moves air in and out; gas exchange in the alveoli loads oxygen into the blood and unloads carbon dioxide." },
  digestive: { name: "Digestive", col: 0xf59f00, keys: ["tongue", "salivary_glands", "pharynx", "esophagus", "stomach", "liver", "gallbladder", "pancreas", "small_intestine", "colon", "appendix"], about: "Breaks food down mechanically and chemically, absorbs nutrients (mostly in the small intestine) and water (in the colon), and eliminates waste." },
  nervous: { name: "Nervous", col: 0xfcc419, keys: ["brain", "cerebellum", "brainstem", "spinal_cord", "cranial_nerves", "eye_l", "eye_r"], about: "Detects stimuli, integrates information and coordinates fast responses through electrical impulses in neurones." },
  endocrine: { name: "Endocrine", col: 0x9775fa, keys: ["pituitary", "thymus", "adrenal_l", "adrenal_r", "pancreas"], about: "Glands release hormones into the blood to coordinate slower, longer-lasting responses: growth, metabolism, stress and reproduction." },
  urinary: { name: "Urinary", col: 0x22b8cf, keys: ["kidney_l", "kidney_r", "ureter_l", "ureter_r", "bladder"], about: "The kidneys filter the blood, regulate water, salts and pH, and excrete urea in urine." },
  lymphatic: { name: "Lymphatic and immune", col: 0x51cf66, keys: ["spleen", "thymus"], about: "Returns tissue fluid to the blood and houses immune cells; the thymus matures T cells and the spleen filters blood." },
  reproductive: { name: "Reproductive", col: 0xff8787, keys: ["prostate", "reproductive", "ovary_l", "ovary_r", "uterus", "fallopian_tubes"], about: "Produces gametes and sex hormones. (This model is male, so the female organs aren't shown.)" },
  skeletal: { name: "Skeletal", col: 0xe9ecef, keys: ["skull", "mandible", "teeth", "spine_cervical", "spine_thoracic", "spine_lumbar", "ribs_l", "ribs_r", "sternum", "clavicle_l", "clavicle_r", "scapula_l", "scapula_r", "humerus_l", "humerus_r", "forearm_l", "forearm_r", "hand_l", "hand_r", "pelvis", "femur_l", "femur_r", "patella_l", "patella_r", "lower_leg_l", "lower_leg_r", "foot_l", "foot_r"], about: "Supports and protects the body, provides levers for movement, stores calcium and makes blood cells in red bone marrow." },
  muscular: { name: "Muscular", col: 0xc0392b, keys: null, about: "Skeletal muscles contract to move bones at joints, maintain posture and generate heat." },
  integumentary: { name: "Skin", col: 0xf1c7a8, keys: ["skin"], about: "A barrier against pathogens and water loss, with roles in temperature regulation, sensation and vitamin D synthesis." },
};
const ROLE = {
  heart: "Pumps about 5 L of blood a minute at rest: the right side to the lungs, the left side to the body.", lung_l: "Gas exchange across about 70 m² of alveolar surface.", lung_r: "Gas exchange across about 70 m² of alveolar surface.",
  liver: "Makes bile and plasma proteins, stores glycogen, detoxifies drugs and converts ammonia to urea.", stomach: "Stores food and begins protein digestion with acid and pepsin.", small_intestine: "Completes digestion and absorbs most nutrients across villi and microvilli.",
  colon: "Absorbs water and salts and houses the gut microbiota.", pancreas: "Exocrine: digestive enzymes and bicarbonate; endocrine: insulin and glucagon from the islets.", kidney_l: "About a million nephrons filter the blood and form urine.", kidney_r: "About a million nephrons filter the blood and form urine.",
  brain: "The cerebrum: thought, memory, voluntary movement and the senses.", cerebellum: "Coordinates movement, balance and posture.", brainstem: "Controls breathing, heart rate and other vital reflexes.", spinal_cord: "Carries signals between the brain and body and coordinates spinal reflexes.",
  pituitary: "The 'master gland': releases hormones such as ADH, growth hormone and TSH under control of the hypothalamus.", adrenal_l: "Release adrenaline (medulla) and cortisol and aldosterone (cortex).", adrenal_r: "Release adrenaline (medulla) and cortisol and aldosterone (cortex).",
  thymus: "Where T lymphocytes mature; largest in childhood.", spleen: "Filters the blood, removes old red cells and mounts immune responses to blood-borne antigens.", bladder: "Stores urine until it is released.", diaphragm: "The main breathing muscle: contracting, it flattens and draws air in.",
  aorta: "The largest artery, carrying oxygenated blood from the left ventricle.", trachea: "The windpipe, held open by C-shaped rings of cartilage.", esophagus: "Moves food to the stomach by peristalsis.", gallbladder: "Stores and concentrates bile.",
};

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row sys"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><p class="lab-msg">${esc(ATTRIBUTION)}</p>`);
  const S = stage3d($(".lab-stage"), { distance: 3.2, aspect: 1.05, max: 560 });
  S.controls.target.set(0, 0.95, 0); S.camera.position.set(0, 1.1, 3.0);
  const ctrl = $(".lab-ctrl"), info = panel(ctrl);
  const on = { circulatory: true, respiratory: true, digestive: true, nervous: false, endocrine: false, urinary: true, lymphatic: false, reproductive: false, skeletal: true, muscular: false, integumentary: false };
  const st = { all: new Set(), organs: new Set() };
  const ch = challenges(ctrl, ctx, [
    { id: "sys", text: "Show each of 6 different body systems", test: (x) => x.all.size >= 6 },
    { id: "org", text: "Tap 8 different organs to learn what they do", test: (x) => x.organs.size >= 8 },
    { id: "pan", text: "Find the organ that belongs to two systems (digestive and endocrine)", test: (x) => x.organs.has("pancreas") },
  ]);
  const groups = {}; const meshes = [];
  info(`<p>Loading the anatomy model…</p>`);
  function paintToggles() {
    $(".sys").innerHTML = `<div class="lab-chips">${Object.entries(SYSTEMS).map(([k, s]) => `<button type="button" data-s="${k}" class="${on[k] ? "on" : ""}" style="${on[k] ? `background:#${s.col.toString(16).padStart(6, "0")};color:#000` : ""}">${s.name}</button>`).join("")}</div>`;
    $.all(".sys [data-s]").forEach((b) => b.addEventListener("click", () => { const k = b.dataset.s; on[k] = !on[k]; if (on[k]) { st.all.add(k); ch.check(st); info(`<h4>${SYSTEMS[k].name} system</h4><p>${SYSTEMS[k].about}</p>`); } apply(); paintToggles(); }));
  }
  // a mesh shows when any system it belongs to is switched on
  function apply() { for (const m of meshes) m.visible = m.userData.systems.some((s) => on[s]); }
  loadAnatomy().then(({ byKey, catalog }) => {
    const labelOf = Object.fromEntries(catalog.map((c) => [c.key, c.label]));
    const muscleKeys = catalog.filter((c) => c.system === "muscles").map((c) => c.key).filter((k) => k !== "diaphragm");
    const made = new Map();
    for (const [sys, s] of Object.entries(SYSTEMS)) {
      groups[sys] = [];
      for (const key of s.keys || muscleKeys) {
        if (!byKey[key]) continue;
        let list = made.get(key);
        if (!list) {
          list = take(byKey, key).map((m) => { m.material = new THREE.MeshStandardMaterial({ color: s.col, roughness: 0.5, metalness: 0.02, transparent: sys === "integumentary" || sys === "muscular", opacity: sys === "integumentary" ? 0.25 : sys === "muscular" ? 0.75 : 1, depthWrite: sys !== "integumentary" }); m.userData = { key, label: labelOf[key] || key, systems: [] }; S.root.add(m); meshes.push(m); return m; });
          made.set(key, list);
        }
        for (const m of list) { m.userData.systems.push(sys); groups[sys].push(m); }
      }
    }
    apply(); paintToggles();
    info(`<p>Turn systems on and off above, drag to turn the body, and tap an organ.</p>`);
  }).catch((e) => info(`<p>The anatomy model couldn't load (${esc(e.message)}).</p>`));
  // tap to select
  const ray = new THREE.Raycaster(), v = new THREE.Vector2(); let down = null, sel = null;
  S.renderer.domElement.addEventListener("pointerdown", (e) => { down = [e.clientX, e.clientY]; });
  S.renderer.domElement.addEventListener("pointerup", (e) => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
    const r = S.renderer.domElement.getBoundingClientRect(); v.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(v, S.camera); const hit = ray.intersectObjects(meshes.filter((m) => m.visible && !m.userData.systems.includes("integumentary")), false)[0];
    if (sel) sel.material.emissive?.setHex(0); sel = hit?.object || null;
    if (!sel) return; sel.material.emissive.setHex(0x333333);
    const d = sel.userData; st.organs.add(d.key); ch.check(st);
    info(`<h4>${esc(d.label)}</h4>${ROLE[d.key] ? `<p>${ROLE[d.key]}</p>` : ""}<p><small>System${d.systems.length > 1 ? "s" : ""}: ${d.systems.map((s) => SYSTEMS[s].name).join(", ")}</small></p>`);
  });
  return () => S.stop();
}
