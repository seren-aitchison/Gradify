// MedGradify's 3D body: real anatomy from BodyParts3D (DBCLS, CC BY 4.0, via open-anatomy-3d), the
// dataset built from MRI scans and refined by anatomists that anatomy apps use. 128 named meshes
// (skin, skeleton, 40-odd muscle groups, organs, vessels, brain and cord) shown like an anatomy
// atlas: natural tissue colours and textures, studio light and shadow. Each mesh is mapped onto
// a structure that teaches it (body-data.js); a few small structures the scan doesn't include
// (thyroid, lymph nodes, the brachial plexus and sciatic nerve) are drawn in place from landmarks.
// The heart beats and the lungs breathe.
import { GROUPS, STRUCTURES as BASE, NOTES } from "./body-data.js";
import { loadAnatomy, take, inflate, ATTRIBUTION } from "./anatomy-glb.js";

// structures the scan models as one piece are taught as one: merge their content
const STRUCTURES = { ...BASE };
const merge = (into, from, name) => { const a = STRUCTURES[into], b = STRUCTURES[from]; STRUCTURES[into] = { ...a, name: name || a.name, desc: `${a.desc} ${b.desc}`, facts: [...a.facts, ...b.facts], cards: [...a.cards, ...b.cards], keys: [...a.keys, ...b.keys] }; delete STRUCTURES[from]; };
merge("rectus", "obliques", "Abdominal wall muscles");
merge("biceps", "triceps", "Upper arm muscles (biceps, triceps)");
merge("venaeCavae", "jugular", "Venae cavae and great veins");
STRUCTURES.scm = { ...STRUCTURES.scm, name: "Neck muscles (sternocleidomastoid)" };
STRUCTURES.latissimus = { ...STRUCTURES.latissimus, name: "Back muscles (latissimus dorsi)" };
STRUCTURES.gastrocnemius = { ...STRUCTURES.gastrocnemius, name: "Calf muscles (gastrocnemius, soleus)" };
STRUCTURES.tibialisAnterior = { ...STRUCTURES.tibialisAnterior, name: "Shin and foot muscles" };
STRUCTURES.vagus = { ...STRUCTURES.vagus, name: "Cranial nerves (incl. the vagus)" };
STRUCTURES.limbArteries = { ...STRUCTURES.limbArteries, name: "Arteries of the limbs and pelvis" };

// which meshes of the scan make each structure, and how they look: [mesh keys, colour, texture]
// (no colour = muscle)
const B = "#e6d9bd", ART = "#c0282c", VEIN = "#34519c";
const MAP = {
  skull: [["skull"], B, "bone"], mandible: [["mandible", "teeth"], B, "bone"], spine: [["spine_cervical", "spine_thoracic", "spine_lumbar"], B, "bone"],
  ribs: [["ribs_l", "ribs_r"], B, "bone"], sternum: [["sternum"], B, "bone"], shoulderGirdle: [["clavicle_l", "clavicle_r", "scapula_l", "scapula_r"], B, "bone"],
  pelvis: [["pelvis"], B, "bone"], humerus: [["humerus_l", "humerus_r"], B, "bone"], forearm: [["forearm_l", "forearm_r", "hand_l", "hand_r"], B, "bone"],
  femur: [["femur_l", "femur_r"], B, "bone"], patella: [["patella_l", "patella_r"], B, "bone"], leg: [["lower_leg_l", "lower_leg_r", "foot_l", "foot_r"], B, "bone"],
  scm: [["neck_muscles_l", "neck_muscles_r"]], deltoid: [["deltoid_l", "deltoid_r"]], pectoralis: [["chest_muscles_l", "chest_muscles_r"]],
  biceps: [["upper_arm_muscles_l", "upper_arm_muscles_r"]], rectus: [["abdominal_muscles"]], quadriceps: [["quadriceps_l", "quadriceps_r"]],
  gastrocnemius: [["calf_l", "calf_r"]], trapezius: [["trapezius_l", "trapezius_r"]], latissimus: [["back_muscles_l", "back_muscles_r"]],
  gluteus: [["gluteal_l", "gluteal_r"]], forearmMuscles: [["forearm_muscles_l", "forearm_muscles_r", "hand_muscles_l", "hand_muscles_r"]],
  hamstrings: [["hamstrings_l", "hamstrings_r"]], tibialisAnterior: [["shin_muscles_l", "shin_muscles_r", "foot_muscles_l", "foot_muscles_r"]],
  rotatorCuff: [["rotator_cuff_l", "rotator_cuff_r", "shoulder_muscles_l", "shoulder_muscles_r"]], iliopsoas: [["iliopsoas_l", "iliopsoas_r"]],
  adductors: [["adductors_l", "adductors_r"]], intercostals: [["intercostals_l", "intercostals_r"]], pelvicFloor: [["pelvic_floor"]],
  cerebrum: [["brain"], "#e2b6a8", "fold"], cerebellum: [["cerebellum"], "#d4a092", "fold"], brainstem: [["brainstem"], "#dcb39c", "tissue"],
  spinalCord: [["spinal_cord"], "#eedc94", "fibre"], vagus: [["cranial_nerves"], "#eedc94", "fibre"],
  heart: [["heart"], "#8f2a26", "fibre"], coronaries: [["coronary_arteries"], ART, "none"], aorta: [["aorta", "arteries_thorax", "arteries_abdomen"], ART, "none"],
  carotids: [["carotid_l", "carotid_r", "arteries_head"], ART, "none"], limbArteries: [["arteries_arm_l", "arteries_arm_r", "arteries_leg_l", "arteries_leg_r", "arteries_pelvis"], ART, "none"],
  venaeCavae: [["vena_cava_superior", "vena_cava_inferior", "veins_thorax", "veins_abdomen", "veins_pelvis", "veins_arm_l", "veins_arm_r", "veins_leg_l", "veins_leg_r"], VEIN, "none"],
  pulmonaryTrunk: [["pulmonary_vessels"], "#3c5aa6", "none"],
  larynx: [["larynx", "pharynx"], "#dcc9b0", "tissue"], trachea: [["trachea", "bronchi"], "#e2d6c2", "tissue"], rightLung: [["lung_r"], "#d68e88", "tissue"],
  leftLung: [["lung_l"], "#d18882", "tissue"], diaphragm: [["diaphragm"], "#9e3a30", "fibre"],
  oesophagus: [["esophagus", "tongue", "salivary_glands"], "#c47566", "tissue"], stomach: [["stomach"], "#d58a76", "fold"], liver: [["liver"], "#6a2720", "tissue"],
  gallbladder: [["gallbladder"], "#4a7034", "none"], pancreas: [["pancreas"], "#e2bf8a", "fold"], smallIntestine: [["small_intestine"], "#e09e8c", "tissue"],
  colon: [["colon"], "#cf8a72", "fold"], appendix: [["appendix"], "#cf8a72", "tissue"],
  kidneys: [["kidney_l", "kidney_r"], "#7a3022", "tissue"], ureters: [["ureter_l", "ureter_r"], "#e0c8a6", "none"], bladder: [["bladder", "prostate"], "#dcb39a", "tissue"],
  pituitary: [["pituitary"], "#a9473c", "tissue"], adrenals: [["adrenal_l", "adrenal_r"], "#d9a256", "fold"],
  spleen: [["spleen"], "#5c2633", "tissue"], thymus: [["thymus"], "#e6c4a2", "tissue"],
};

export default {
  title: "The body in 3D",
  kicker: "3D anatomy",
  intro: { title: "Explore the body", text: "Real human anatomy from the BodyParts3D scan data, in nine systems. Click any structure for its key relations and clinical points, make flashcards from it, or find it in your notes. Hide systems, fade in the skin, pull the organs apart, or zoom right in: the full notes for each system are below the model." },
  trueColour: true,   // anatomy keeps its own tissue colours
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Clinical",
  quiz: "find the structure",
  motion: "Heartbeat and breathing",
  credit: ATTRIBUTION,
  camera: { pos: [0.8, 1.0, 3.6], target: [0, 0.9, 0], min: 0.05, max: 5.5 },
  views: { Front: [[0, 1.0, 3.6], [0, 0.9, 0]], Side: [[3.6, 1.0, 0], [0, 0.9, 0]], Back: [[0, 1.0, -3.6], [0, 0.9, 0]], Head: [[0.25, 1.68, 0.6], [0, 1.62, 0]], Neck: [[0.15, 1.5, 0.45], [0, 1.48, 0]], Chest: [[0.3, 1.32, 1.0], [0, 1.28, 0]], Abdomen: [[0.3, 1.05, 1.0], [0, 1.02, 0]], Pelvis: [[0.2, 0.92, 0.85], [0, 0.92, 0]], Arm: [[0.9, 1.1, 0.9], [0.22, 1.08, 0]], Leg: [[0.8, 0.45, 1.1], [0.1, 0.45, 0]] },
  sliders: [{ key: "skin", label: "Skin", value: 0 }],
  labelMax: 0.45,
  centre: [0, 1.1, 0],

  async build(k) {
    const { THREE, V, limb, tube, blob, add, decor } = k;
    const { byKey, anchors } = await loadAnatomy();
    const mat = (c, o = {}) => k.mat(c, { sheen: 0.35, ...o, emissive: new THREE.Color("#000000") });
    const muscle = mat("#a3322b", { detail: "fibre", repeat: 1, bump: 1.4, roughness: 0.5, clearcoat: 0.4, side: THREE.DoubleSide });   // some scan surfaces are open sheets
    const mats = {};
    const matFor = (colour, detail) => (mats[colour + detail] ||= colour === B ? Object.assign(k.bone(B), { side: THREE.DoubleSide }) : mat(colour, { detail, repeat: 1, bump: detail === "fold" ? 1.6 : 0.7, roughness: 0.4, clearcoat: 0.6, side: THREE.DoubleSide }));
    const parts = {};
    for (const [id, [keys, colour, detail]] of Object.entries(MAP)) {
      const m = colour ? matFor(colour, detail) : muscle;
      for (const key of keys) for (const mesh of take(byKey, key)) { mesh.material = m; add(id, mesh); (parts[id] ||= []).push(mesh); }
    }
    // the eyes and reproductive organs are shown but not taught here
    for (const key of ["eye_l", "eye_r", "reproductive"]) for (const mesh of take(byKey, key)) { const eye = key.startsWith("eye"); mesh.material = eye ? mat("#f2efe8", { detail: "none", clearcoat: 1, roughness: 0.15 }) : mat("#c98a7a"); decor(mesh, eye ? "nervous" : "urinary"); }

    // ---------- skin: real skin, faded in with the slider, drawn as one front surface ----------
    const skinMat = new THREE.MeshPhysicalMaterial({ color: "#d4a184", roughness: 0.55, sheen: 0.7, sheenColor: new THREE.Color("#ffd6c2"), sheenRoughness: 0.6, clearcoat: 0.08, transparent: true, opacity: 0.3, depthWrite: false, depthFunc: THREE.LessEqualDepth });
    const depthOnly = new THREE.MeshBasicMaterial({ colorWrite: false }), skin = new THREE.Group();
    for (const mesh of take(byKey, "skin").map((m) => inflate(m))) { mesh.material = skinMat; mesh.renderOrder = 2; skin.add(mesh); const pre = new THREE.Mesh(mesh.geometry, depthOnly); pre.position.copy(mesh.position); pre.renderOrder = 1; skin.add(pre); }
    decor(skin);
    k.slider("skin", (v) => { skinMat.opacity = v; skin.visible = v > 0; });

    // ---------- small structures the scan doesn't include, placed from its landmarks ----------
    const box = (id) => { const b = new THREE.Box3(); (parts[id] || []).forEach((m) => b.expandByObject(m)); return b; };
    // the neck, located from the top of the sternum (the jugular notch): the thyroid sits just above it,
    // in front of the trachea (the scan's larynx mesh includes the pharynx, so it can't place this)
    // the thyroid wraps the front of the trachea just below the larynx: find that surface in the scan
    const tr = parts.trachea?.[0], top = { y: -Infinity, z: -Infinity, x: 0, n: 0 };
    if (tr) { const p = tr.geometry.attributes.position; let maxY = -Infinity; for (let i = 0; i < p.count; i++) maxY = Math.max(maxY, p.getY(i) + tr.position.y);
      for (let i = 0; i < p.count; i++) { const y = p.getY(i) + tr.position.y; if (y > maxY - 0.04 && y < maxY - 0.015) { top.z = Math.max(top.z, p.getZ(i) + tr.position.z); top.x += p.getX(i) + tr.position.x; top.n++; } } top.y = maxY; }
    const neckX = top.n ? top.x / top.n : 0, neckY = top.n ? top.y - 0.03 : box("sternum").max.y + 0.035, neckZ = top.n ? top.z + 0.004 : box("sternum").max.z - 0.03;
    const lar = { min: V(neckX, neckY, 0), max: V(0, 0, neckZ + 0.012) };
    const endo = mat("#a9473c", { detail: "tissue", repeat: 3, clearcoat: 0.6 });
    for (const s of [-1, 1]) { const lobe = new THREE.Mesh(blob(0.011, 0.8, 1.9, 0.75), endo); lobe.position.set(lar.min.x + s * 0.017, lar.min.y - 0.012, lar.max.z - 0.018); lobe.rotation.z = s * -0.2; add("thyroid", lobe); }
    add("thyroid", limb(V(lar.min.x - 0.011, lar.min.y - 0.02, lar.max.z - 0.01), V(lar.min.x + 0.011, lar.min.y - 0.02, lar.max.z - 0.01), 0.0045, endo));
    const node = mat("#d4bf86", { detail: "tissue", repeat: 3, roughness: 0.35, clearcoat: 0.5 }), nodes = [];
    for (const s of [-1, 1]) {
      const sh = anchors[s > 0 ? "shoulder_l" : "shoulder_r"], hp = anchors[s > 0 ? "hip_l" : "hip_r"];
      nodes.push(V(s * 0.04, lar.min.y + 0.01, lar.max.z - 0.03), V(s * 0.045, lar.min.y - 0.02, lar.max.z - 0.035), V(s * 0.05, lar.min.y - 0.045, lar.max.z - 0.04));
      for (let i = 0; i < 3; i++) nodes.push(sh.clone().add(V(-s * (0.03 + i * 0.01), -0.07 - i * 0.015, 0.01 - i * 0.012)));
      for (let i = 0; i < 3; i++) nodes.push(hp.clone().add(V(-s * (0.01 + i * 0.012), -0.02 - i * 0.012, 0.07)));
    }
    const si = box("smallIntestine").getCenter(new THREE.Vector3());
    for (let i = 0; i < 4; i++) nodes.push(si.clone().add(V(Math.sin(i * 2) * 0.03, Math.cos(i * 2) * 0.03, -0.03)));
    for (const p of nodes) { const n = new THREE.Mesh(blob(0.0055, 1, 0.7, 0.8), node); n.position.copy(p); add("lymphNodes", n); }
    const nerve = mat("#eedc94", { detail: "fibre", repeat: 1, bump: 0.3, roughness: 0.4 }), cord = box("spinalCord");
    for (const s of [-1, 1]) {
      const a = (n) => anchors[`${n}_${s > 0 ? "l" : "r"}`];
      const sh = a("shoulder"), el = a("elbow"), wr = a("wrist"), hp = a("hip"), kn = a("knee"), an = a("ankle");
      const root = V(0, lar.min.y - 0.03, cord.max.z - 0.01), axilla = sh.clone().add(V(-s * 0.03, -0.05, 0.02));
      add("brachialPlexus", tube([root, V(s * 0.06, root.y - 0.02, root.z + 0.02), axilla, sh.clone().lerp(el, 0.5).add(V(-s * 0.012, 0, 0.018)), el.clone().add(V(-s * 0.01, 0, 0.022)), el.clone().lerp(wr, 0.6).add(V(0, 0, 0.015)), wr.clone().add(V(0, -0.01, 0.012))], 0.0032, nerve, 96));   // median
      add("brachialPlexus", tube([axilla, sh.clone().lerp(el, 0.5).add(V(-s * 0.02, 0, -0.01)), el.clone().add(V(-s * 0.025, 0, -0.015)), el.clone().lerp(wr, 0.6).add(V(-s * 0.012, 0, 0)), wr.clone().add(V(-s * 0.015, -0.01, 0.005))], 0.0028, nerve, 64));   // ulnar
      add("sciatic", tube([V(s * 0.04, hp.y + 0.04, hp.z - 0.08), V(s * 0.085, hp.y - 0.03, hp.z - 0.075), hp.clone().lerp(kn, 0.5).add(V(0, 0, -0.06)), kn.clone().add(V(0, 0.03, -0.055)), kn.clone().lerp(an, 0.5).add(V(0, 0, -0.035)), an.clone().add(V(-s * 0.012, 0.02, -0.025))], 0.0048, nerve, 96));
    }

    // ---------- motion: the heart beats and the lungs breathe ----------
    const beating = [...(parts.heart || []), ...(parts.coronaries || [])], lungs = [...(parts.rightLung || []), ...(parts.leftLung || [])];
    k.tick((t, dt, motion) => {
      if (!motion) return;
      const beat = 1 + Math.max(0, Math.sin(t * 7.5)) ** 8 * 0.06 + Math.max(0, Math.sin(t * 7.5 - 1.2)) ** 8 * 0.035;
      for (const m of beating) m.scale.setScalar(beat);
      const br = Math.sin(t * 1.3) * 0.025;
      for (const m of lungs) m.scale.set(1 + br * 0.6, 1 + br, 1 + br * 0.8);
    });
  },
};
