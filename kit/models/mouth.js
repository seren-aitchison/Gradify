// DentalGradify's 3D model: the real skull, jaw and all the teeth from scan data (BodyParts3D via
// open-anatomy-3d, CC BY 4.0), each tooth labelled by type, with the gums and the inferior alveolar
// nerve placed on them, and a molar cut in half beside them to show enamel, dentine, pulp and the periodontium.
import { loadAnatomy, take, ATTRIBUTION } from "./anatomy-glb.js";

const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  teeth: { name: "Teeth", c: "#f4f1e8" },
  tooth: { name: "Tooth in section", c: "#7ee0ff" },
  perio: { name: "Periodontium", c: "#ff8fa3" },
  jaws: { name: "Jaws and nerves", c: "#ffe066" },
};

const STRUCTURES = {
  incisors: s("teeth", "Incisors", "Eight incisors (central and lateral, upper and lower) with a thin incisal edge for cutting. Usually single-rooted.",
    ["FDI notation: upper right central incisor is **11**, upper left 21, lower left 31, lower right 41.", "Upper central incisors erupt at 7–8 years; lower centrals first, at 6–7.", "Lower incisors sometimes have two root canals (labial and lingual), easily missed in endodontics."],
    [["What is the FDI number of the upper left central incisor?", "21."], ["Which permanent incisors erupt first?", "The lower central incisors, at 6–7 years."], ["Why can lower incisor root canal treatment fail?", "A second (lingual) canal is often present and missed."]],
    ["incisor", "fdi", "eruption"]),
  canines: s("teeth", "Canines", "The longest teeth in the mouth, with a single pointed cusp and the longest root. They guide the jaw in side-to-side movement.",
    ["The upper canine root is the longest in the dentition, giving the 'canine eminence'.", "**Canine guidance**: in lateral excursion, the canines alone touch, separating the back teeth.", "Upper canines are the teeth most often impacted after third molars, usually palatally."],
    [["Which tooth has the longest root?", "The upper (maxillary) canine."], ["What is canine guidance?", "In lateral excursion only the canines contact, disoccluding the posterior teeth."], ["Where are impacted upper canines usually found?", "Palatally."]],
    ["canine", "cuspid", "guidance"]),
  premolars: s("teeth", "Premolars", "Eight premolars with two cusps (buccal and palatal/lingual). They replace the deciduous molars.",
    ["The upper first premolar usually has **two roots** (buccal and palatal); the others usually one.", "The lower second premolar is the tooth most often congenitally missing after third molars.", "The mental foramen lies near the apex of the lower second premolar: care with local anaesthetic and surgery."],
    [["How many roots does the upper first premolar usually have?", "Two: buccal and palatal."], ["Which nerve exits near the lower second premolar apex?", "The mental nerve, through the mental foramen."], ["Which teeth do the premolars replace?", "The deciduous (primary) molars."]],
    ["premolar", "bicuspid", "mental foramen"]),
  molars: s("teeth", "Molars", "Broad grinding teeth: upper molars have three roots (two buccal, one palatal), lower molars two (mesial and distal).",
    ["The first permanent molar erupts at about **6 years**, behind the primary teeth, without replacing one.", "Upper molar roots can project into the **maxillary sinus**: extraction can cause an oro-antral communication.", "Upper first molars often have a second mesiobuccal canal (MB2)."],
    [["When does the first permanent molar erupt?", "Around 6 years old."], ["What complication can follow extraction of an upper molar?", "An oro-antral communication into the maxillary sinus."], ["How many roots do lower molars usually have?", "Two: mesial and distal."]],
    ["molar", "mb2", "maxillary sinus", "furcation"]),
  thirdMolars: s("teeth", "Third molars", "The 'wisdom teeth', erupting from 17–25 years if there's room. Often impacted, especially in the mandible.",
    ["Classified by angulation (mesioangular is commonest, distoangular hardest) and depth (Pell and Gregory).", "Removal risks the **inferior alveolar nerve** (lower lip numbness) and the lingual nerve (tongue).", "NICE: don't remove asymptomatic disease-free wisdom teeth; remove for recurrent pericoronitis, caries, cysts or resorption."],
    [["Which impaction is commonest for lower third molars?", "Mesioangular."], ["Which two nerves are at risk when removing a lower third molar?", "The inferior alveolar nerve and the lingual nerve."], ["When does NICE recommend removing wisdom teeth?", "For pathology: recurrent or severe pericoronitis, unrestorable caries, cysts, resorption of adjacent teeth; not prophylactically."]],
    ["wisdom", "third molar", "impact", "pericoronitis"]),
  enamel: s("tooth", "Enamel", "The hardest tissue in the body: 96% hydroxyapatite. Made by ameloblasts, which are lost on eruption, so enamel can't regrow.",
    ["Built of enamel prisms (rods) running from the dentine to the surface.", "Demineralises below **pH 5.5** (the critical pH); fluoride forms fluorapatite, resistant down to about pH 4.5.", "Hypoplasia and fluorosis are developmental defects; erosion and attrition are wear."],
    [["What is the critical pH for enamel?", "About 5.5."], ["Why can't enamel repair itself?", "Ameloblasts are lost when the tooth erupts."], ["How does fluoride protect enamel?", "It forms fluorapatite (more acid-resistant), promotes remineralisation and inhibits bacterial metabolism."]],
    ["enamel", "ameloblast", "hydroxyapatite", "fluoride", "erosion", "caries"]),
  dentine: s("tooth", "Dentine", "The bulk of the tooth, 70% mineral, made by odontoblasts that line the pulp and keep laying it down throughout life.",
    ["Tubules run from pulp to the enamel–dentine junction; fluid movement in them explains **sensitivity** (hydrodynamic theory).", "Primary, secondary (slowly through life) and tertiary (reactionary or reparative, in response to injury) dentine.", "Caries spreads sideways along the enamel–dentine junction, so the cavity is bigger than it looks."],
    [["What explains dentine hypersensitivity?", "The hydrodynamic theory: fluid movement in exposed tubules stimulates pulpal nerves."], ["What is tertiary dentine?", "Dentine laid down in response to a stimulus (caries, wear): reactionary or reparative."], ["Which cells form dentine?", "Odontoblasts."]],
    ["dentine", "dentin", "odontoblast", "sensitivity", "tubule"]),
  pulp: s("tooth", "Pulp", "Soft connective tissue in the pulp chamber and root canals: nerves, blood vessels and odontoblasts, entering at the apical foramen.",
    ["**Reversible pulpitis**: sharp pain to cold that stops when the stimulus is removed. **Irreversible**: lingering, spontaneous or night pain.", "The pulp can't swell (rigid walls), so inflammation can strangle its own blood supply → necrosis.", "Pulp necrosis leads to apical periodontitis, seen as a periapical radiolucency."],
    [["How do reversible and irreversible pulpitis differ?", "Reversible: short sharp pain only with a stimulus. Irreversible: lingering or spontaneous pain, often at night."], ["What is the treatment for irreversible pulpitis?", "Pulp extirpation and root canal treatment (or extraction)."], ["Why does pulpitis often lead to necrosis?", "The pulp is enclosed in rigid dentine, so swelling compresses its blood supply."]],
    ["pulp", "pulpitis", "root canal", "endodont", "necrosis", "apical"]),
  cementum: s("tooth", "Cementum", "A thin, bone-like layer over the root, made by cementoblasts. The periodontal ligament fibres anchor into it.",
    ["Acellular cementum covers the coronal root; cellular cementum the apical third.", "It meets enamel at the cemento-enamel junction (CEJ): overlap (60%), edge to edge (30%) or a gap (10%).", "Hypercementosis can make extraction difficult."],
    [["What attaches to cementum?", "Sharpey's fibres of the periodontal ligament."], ["How does enamel usually meet cementum at the CEJ?", "Cementum overlaps enamel (about 60%)."], ["Which cells make cementum?", "Cementoblasts."]],
    ["cementum", "cej", "cementoblast"]),
  gingiva: s("perio", "Gingiva", "The gum: keratinised mucosa around the necks of the teeth, attached to bone and tooth, with a 1–3 mm sulcus.",
    ["Healthy gingiva is pink, firm and stippled; a sulcus depth up to **3 mm** is normal.", "**Gingivitis** is reversible inflammation from plaque; it bleeds on probing.", "Drug-induced overgrowth: phenytoin, ciclosporin and calcium-channel blockers (nifedipine)."],
    [["What probing depth is normal?", "Up to 3 mm."], ["Name three drugs that cause gingival overgrowth.", "Phenytoin, ciclosporin and calcium-channel blockers such as nifedipine."], ["Is gingivitis reversible?", "Yes: with plaque removal it resolves; there's no attachment loss."]],
    ["gingiva", "gum", "gingivitis", "sulcus", "bleeding"]),
  pdl: s("perio", "Periodontal ligament", "Collagen fibres (0.2 mm wide) holding the tooth in its socket, cushioning bite forces and sensing pressure.",
    ["Principal fibre groups: alveolar crest, horizontal, **oblique** (the largest group, resisting biting forces), apical and interradicular.", "Its proprioceptors control bite force; implants lack it.", "Widening on an X-ray suggests occlusal trauma or infection."],
    [["Which periodontal fibre group resists vertical biting forces?", "The oblique fibres."], ["What does an implant lack compared with a tooth?", "A periodontal ligament (so no cushioning or proprioception)."], ["About how wide is the periodontal ligament?", "About 0.2 mm."]],
    ["periodontal ligament", "pdl", "sharpey"]),
  alveolarBone: s("perio", "Alveolar bone", "The bone of the jaws that forms the tooth sockets. It exists because of the teeth, and resorbs after extraction.",
    ["The socket lining (lamina dura) shows as a white line on radiographs; loss suggests periapical disease.", "**Periodontitis** destroys attachment and bone: staged I–IV and graded A–C (2017 classification).", "Smoking and diabetes are the main modifiable risk factors for periodontitis."],
    [["What is the lamina dura?", "The radiopaque cortical bone lining the tooth socket."], ["How is periodontitis classified (2017)?", "Stage (I–IV, severity and complexity) and grade (A–C, rate of progression)."], ["Name two major risk factors for periodontitis.", "Smoking and diabetes."]],
    ["alveolar bone", "periodontitis", "bone loss", "lamina dura"]),
  maxilla: s("jaws", "Maxilla", "The upper jaw: it carries the upper teeth, forms the hard palate, the floor of the orbit and the walls of the maxillary sinus.",
    ["Upper teeth are anaesthetised by **infiltration**: the maxilla's thin, porous cortical bone lets anaesthetic through.", "Nerve supply: anterior, middle and posterior superior alveolar nerves (V2); palate by the greater palatine and nasopalatine.", "Le Fort I, II and III fractures separate the maxilla at increasing levels."],
    [["Why can upper teeth usually be numbed by infiltration?", "The maxilla's outer bone is thin and porous, so anaesthetic diffuses to the apices."], ["Which nerve supplies the anterior hard palate?", "The nasopalatine nerve."], ["What separates in a Le Fort I fracture?", "The tooth-bearing maxilla, horizontally above the palate."]],
    ["maxilla", "palate", "infiltration", "le fort"]),
  mandible: s("jaws", "Mandible", "The lower jaw: body, ramus and the condylar and coronoid processes. It moves at the temporomandibular joints.",
    ["Its thick cortical bone means lower molars usually need an **inferior alveolar nerve block**.", "Muscles of mastication (masseter, temporalis, medial and lateral pterygoids) are supplied by V3.", "The lateral pterygoid is the only one that opens the mouth (with gravity and the suprahyoids)."],
    [["Why do lower molars need a nerve block?", "The mandible's thick cortical bone stops infiltrated anaesthetic reaching the apices."], ["Which muscle of mastication opens the mouth?", "The lateral pterygoid."], ["What supplies the muscles of mastication?", "The mandibular division of the trigeminal nerve (V3)."]],
    ["mandible", "mastication", "masseter", "pterygoid", "temporalis"]),
  ian: s("jaws", "Inferior alveolar nerve", "A branch of V3 that enters the mandibular foramen, runs in the mandibular canal under the teeth, and leaves as the mental nerve.",
    ["IANB: needle at the pterygomandibular space, above the lingula; the lingual nerve is usually anaesthetised too.", "Injury (third molar surgery, implants) causes numbness of the **lower lip and chin**.", "Intravascular injection is avoided by aspirating first."],
    [["What does damage to the inferior alveolar nerve cause?", "Numbness of the lower lip and chin on that side."], ["What is the terminal branch of the inferior alveolar nerve?", "The mental nerve."], ["Why do you aspirate before an IANB?", "To avoid injecting into the inferior alveolar artery or vein."]],
    ["inferior alveolar", "nerve block", "ianb", "mental nerve", "lingual nerve"]),
  tmj: s("jaws", "Temporomandibular joint", "The jaw joint: the mandibular condyle in the glenoid fossa of the temporal bone, divided by an articular disc into upper (gliding) and lower (hinge) compartments.",
    ["Opening: rotation first (about 25 mm), then translation as the condyle glides forward.", "TMD presents with pain, clicking (disc displacement with reduction) or locking (without reduction).", "Dislocation is anterior; reduce by pressing down and back on the lower molars."],
    [["What happens in the lower and upper compartments of the TMJ?", "Lower: hinge rotation. Upper: gliding translation."], ["What does a TMJ click usually indicate?", "Anterior disc displacement with reduction."], ["Which way does the TMJ dislocate?", "Anteriorly, in front of the articular eminence."]],
    ["temporomandibular", "tmj", "tmd", "condyle", "articular disc"]),
};

const NOTES = {
  teeth: { title: "The dentition", lead: "Adults have 32 permanent teeth: in each quadrant, two incisors, one canine, two premolars and three molars. Children have 20 primary teeth. Learn the notation, the eruption dates and the root anatomy: they drive diagnosis and treatment.",
    sections: [
      ["Notation", "- **FDI** (two digits): quadrant (1 upper right, 2 upper left, 3 lower left, 4 lower right; 5–8 for primary teeth) then tooth (1 central incisor → 8 third molar).", "- **Palmer**: a grid symbol with 1–8 (permanent) or A–E (primary).", "- **Universal** (USA): 1–32, starting at the upper right third molar.", "> Example: the lower right first molar is 46 (FDI), 30 (Universal)."],
      ["Eruption", "- Primary: lower central incisors at about 6 months; complete by about 2½ years.", "- Permanent: first molars and lower incisors 6–7; upper incisors 7–8; canines and premolars 10–12; second molars 12; third molars 17–25.", "! Delayed eruption: consider local causes (supernumeraries, crowding, cysts) before systemic ones (hypothyroidism, cleidocranial dysplasia)."],
      ["Tooth morphology", "- Incisors: cutting edge, cingulum on the palatal surface, mamelons when newly erupted.", "- Canines: single cusp, longest root; corner of the arch.", "- Premolars: buccal and lingual cusps; the lower first premolar's lingual cusp is tiny.", "- Molars: upper with an oblique ridge and Carabelli cusp (first molar); lower first molar has five cusps, lower second four.", "> Root canals: upper first molar MB, MB2, DB, P; lower first molar MB, ML, D (sometimes DL)."],
      ["Occlusion", "- Angle's classification by the first molars: Class I (normal), Class II (lower molar distal), Class III (lower molar mesial).", "- Incisor classification (BSI): Class I, II div 1 (increased overjet), II div 2 (retroclined upper centrals), III.", "- Overjet normal 2–4 mm; overbite covers a third to a half of the lower incisors."],
    ] },
  tooth: { title: "Anatomy of a tooth", lead: "Each tooth is a crown of enamel over dentine, with a pulp in the middle and a root covered by cementum. Knowing how each tissue forms and responds to injury explains caries, sensitivity and pulpitis.",
    sections: [
      ["Tooth development", "Bud → cap → bell stages. Inner enamel epithelium becomes ameloblasts; dental papilla becomes odontoblasts and pulp; dental follicle becomes cementum, PDL and alveolar bone.", "- Hertwig's epithelial root sheath maps out the root; its remnants are the rests of Malassez (the source of radicular cysts)."],
      ["Enamel and dentine", "- Enamel: 96% mineral, prismatic, acellular; can remineralise but not regenerate.", "- Dentine: 70% mineral, tubular, vital; keeps forming throughout life (secondary dentine narrows the pulp with age).", "- Enamel–dentine junction: scalloped, resisting cracks; caries spreads along it.", "> Caries is a diet-dependent, biofilm-mediated disease: sugars → acid (Streptococcus mutans, Lactobacilli) → demineralisation when pH < 5.5."],
      ["The pulp", "Odontoblast layer, cell-free zone, cell-rich zone, then the core of vessels and nerves (A-delta fibres for sharp pain, C fibres for dull, lingering pain).", "- Pulp tests: cold (ethyl chloride), electric pulp testing; they test nerve response, not blood supply.", "! Diagnose before you drill: reversible pulpitis → remove caries and restore; irreversible → extirpate; necrotic with apical periodontitis → root canal treatment or extraction."],
      ["Cementum and the root", "- Covers the root; thickest at the apex, where it is added to compensate for wear.", "- Resorption: external (trauma, orthodontics, impacted teeth) and internal (pulpal inflammation, 'pink spot')."],
    ] },
  perio: { title: "The periodontium", lead: "The tissues that support the teeth: gingiva, periodontal ligament, cementum and alveolar bone. Periodontal disease is the main cause of tooth loss in adults.",
    sections: [
      ["Healthy periodontium", "- Gingival sulcus 0.5–3 mm; junctional epithelium attaches to the tooth at its base.", "- Biological width (supracrestal tissue attachment): about 2 mm of junctional epithelium and connective tissue above the bone. Invading it with a restoration causes inflammation."],
      ["Gingivitis and periodontitis", "Plaque biofilm → gingivitis (reversible) → in susceptible people, periodontitis: loss of attachment and bone, pocketing, mobility.", "- Key bacteria: Porphyromonas gingivalis, Tannerella forsythia, Treponema denticola (the red complex).", "- Basic Periodontal Examination (BPE): codes 0–4 (and *) per sextant. Code 3 = pocket 3.5–5.5 mm; 4 = over 5.5 mm.", "! Necrotising periodontal diseases (punched-out papillae, pain, bad breath) suggest immunosuppression, stress or smoking."],
      ["Treatment", "- Step 1: oral hygiene, risk factor control (smoking cessation, diabetes).", "- Step 2: subgingival instrumentation (root surface debridement).", "- Step 3: further non-surgical or surgical therapy for persistent pockets.", "- Step 4: supportive periodontal care for life.", "> Periodontitis is linked to diabetes in both directions: treating it can lower HbA1c."],
    ] },
  jaws: { title: "The jaws and their nerves", lead: "The maxilla and mandible carry the teeth, the TMJ moves the jaw, and the trigeminal nerve supplies it all. Local anaesthesia depends on knowing exactly where the nerves run.",
    sections: [
      ["Trigeminal nerve", "- V2 (maxillary): superior alveolar nerves (upper teeth), greater palatine and nasopalatine (palate), infraorbital (skin).", "- V3 (mandibular): inferior alveolar (lower teeth), lingual (anterior ⅔ of tongue), buccal (cheek mucosa), and the motor supply to the muscles of mastication.", "> The chorda tympani (VII) joins the lingual nerve, carrying taste from the anterior ⅔ of the tongue."],
      ["Local anaesthesia", "- Lidocaine 2% with 1:80,000 adrenaline: maximum 4.4 mg/kg (about seven 2.2 ml cartridges for a 70 kg adult).", "- Articaine 4%: better bone penetration; avoid for IANBs in some guidance because of paraesthesia reports.", "- IANB failure: accessory supply (mylohyoid nerve), bifid canals, infection (low pH).", "! Facial palsy after an IANB means anaesthetic in the parotid gland (needle too far back): it wears off, but protect the eye."],
      ["The temporomandibular joint", "- Synovial, with a fibrocartilage-covered surface and an articular disc.", "- Movements: opening (rotation then translation), protrusion, lateral excursion.", "- TMD management: reassurance, soft diet, analgesia, splints; refer if locking or failing."],
      ["Fractures and infection", "- Mandible fractures are commonest at the condyle, angle and parasymphysis; check for occlusal derangement and lip numbness.", "- Odontogenic infections spread along fascial planes: Ludwig's angina (bilateral submandibular, sublingual, submental) threatens the airway.", "! Swelling with trismus, dysphagia or a raised floor of mouth needs urgent referral: airway first."],
    ] },
};

export default {
  title: "The mouth in 3D", kicker: "3D dental anatomy",
  intro: { title: "Explore the mouth", text: "The real skull, jaw and every tooth from anatomy scan data, enlarged, with the gums and the nerve under the lower teeth, and a molar cut in half beside them. Click any tooth to learn it, zoom right in, and read the full notes for each section below." },
  trueColour: true,   // anatomy keeps its own tissue colours
  groups: GROUPS, structures: STRUCTURES, notes: NOTES, calloutName: "Clinical",
  quiz: "find the structure",
  credit: ATTRIBUTION,
  camera: { pos: [0.6, 0.45, 1.9], target: [0.15, 0.2, 0], min: 0.03, max: 3 },
  views: { Skull: [[0.6, 0.45, 1.9], [0.15, 0.2, 0]], Front: [[0, 0.1, 1.0], [0, 0.08, 0]], Side: [[1.0, 0.15, 0.1], [0, 0.08, 0]], Above: [[0.02, 0.9, 0.3], [0, 0.06, 0]], "Upper arch": [[0, -0.55, 0.4], [0, 0.1, 0.02]], "Lower arch": [[0, 0.65, 0.4], [0, 0.04, 0.02]], "Tooth section": [[0.64, 0.06, 0.48], [0.62, 0.03, 0.1]] },
  platform: { r: 0.5, y: -0.24 },
  labelMax: 0.3,
  async build(k) {
    const { THREE, V, mat, bone, tube, blob, add } = k;
    const { mergeVertices } = await import("../vendor/three/addons/BufferGeometryUtils.js");
    const { byKey } = await loadAnatomy();
    // everything is enlarged about the teeth so the dentition fills the stage
    const SC = 5, teethMesh = byKey.teeth[0], origin = teethMesh.position.clone(), at = V(0, 0.08, 0);
    const place = (g, pos) => { g = g.clone(); g.scale(SC, SC, SC); const m = new THREE.Mesh(g); m.position.copy(pos).sub(origin).multiplyScalar(SC).add(at); return m; };
    const enamel = mat("#f3eee0", { detail: "none", roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.1, side: THREE.DoubleSide });
    const boneMat = Object.assign(bone("#e6d9bd"), { side: THREE.DoubleSide });
    const gum = mat("#cf7480", { detail: "tissue", repeat: 2, bump: 0.5, roughness: 0.3, clearcoat: 0.9, side: THREE.DoubleSide });

    // the whole skull and the mandible, with their shared corners re-joined so they shade smoothly
    const smooth = (geo) => { const m = mergeVertices(geo.clone().deleteAttribute("normal").deleteAttribute("uv"), 1e-5); m.computeVertexNormals(); return m; };
    const sk = byKey.skull[0], maxilla = place(smooth(sk.geometry), sk.position); maxilla.material = boneMat; add("maxilla", maxilla);
    const man = take(byKey, "mandible")[0], mandible = place(smooth(man.geometry), man.position); mandible.material = boneMat; add("mandible", mandible);

    // the teeth: split the scan's dentition into its separate teeth and name each by its place in the arch
    const g = mergeVertices(teethMesh.geometry.clone().deleteAttribute("uv"), 1e-5), idx = g.index.array, pos = g.attributes.position, n = pos.count;
    const par = Int32Array.from({ length: n }, (_, i) => i), find = (x) => { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; };
    for (let i = 0; i < idx.length; i += 3) { const a = find(idx[i]), b = find(idx[i + 1]), c = find(idx[i + 2]); par[b] = a; par[find(c)] = a; }
    const comps = new Map();
    for (let i = 0; i < idx.length; i += 3) { const r = find(idx[i]); if (!comps.has(r)) comps.set(r, []); comps.get(r).push(idx[i], idx[i + 1], idx[i + 2]); }
    const teeth = [];
    for (const tris of comps.values()) {
      if (tris.length < 90) continue;   // specks
      const used = [...new Set(tris)], remap = new Map(used.map((v, j) => [v, j])), p = new Float32Array(used.length * 3);
      used.forEach((v, j) => { p[j * 3] = pos.getX(v); p[j * 3 + 1] = pos.getY(v); p[j * 3 + 2] = pos.getZ(v); });
      const tg = new THREE.BufferGeometry(); tg.setAttribute("position", new THREE.BufferAttribute(p, 3)); tg.setIndex(tris.map((v) => remap.get(v))); tg.computeVertexNormals(); tg.computeBoundingBox();
      const size = tg.boundingBox.getSize(new THREE.Vector3());
      if (Math.max(size.x, size.z) > 0.02) { const m = place(tg, origin); m.material = gum; add("gingiva", m); continue; }   // the tooth sockets, not a tooth: covered by the gums
      teeth.push({ g: tg, c: tg.boundingBox.getCenter(new THREE.Vector3()), box: tg.boundingBox.clone() });
    }
    const archY = teeth.reduce((a, t) => a + t.c.y, 0) / teeth.length, archZ = Math.min(...teeth.map((t) => t.c.z));
    const KIND = ["incisors", "incisors", "canines", "premolars", "premolars", "molars", "molars", "thirdMolars"];
    const lowerRoots = { "-1": [], "1": [] };
    for (const upper of [true, false]) for (const sd of [-1, 1]) {
      const row = teeth.filter((t) => (t.c.y > archY) === upper && Math.sign(t.c.x || 1e-6) === sd);
      row.sort((a, b) => Math.atan2(Math.abs(a.c.x), a.c.z - archZ) - Math.atan2(Math.abs(b.c.x), b.c.z - archZ));   // from the midline backwards
      row.forEach((t, i) => {
        const m = place(t.g, origin); m.material = enamel; add(KIND[Math.min(i, 7)], m);
        if (!upper && i >= 3) lowerRoots[sd].push(V(t.c.x, t.box.min.y, t.c.z));
      });
    }
    const toStage = (p) => p.clone().sub(origin).multiplyScalar(SC).add(at);
    // the inferior alveolar nerve: from the mandibular foramen, under the lower roots, out at the mental foramen
    const nerveMat = mat("#eedc94", { detail: "fibre", repeat: 1, bump: 0.3, roughness: 0.4 });
    for (const sd of [-1, 1]) {
      const roots = lowerRoots[sd].sort((a, b) => Math.abs(b.x) - Math.abs(a.x)); if (roots.length < 2) continue;
      const back = roots[0], front = roots[roots.length - 1];
      const path = [back.clone().add(V(sd * 0.004, 0.012, -0.022)), ...roots.map((r) => r.clone().add(V(0, -0.004, 0))), front.clone().add(V(sd * 0.008, -0.002, 0.008))].map(toStage);
      add("ian", tube(path, 0.007, nerveMat, 96));
      // the temporomandibular joint: an articular disc over the top of the condyle
      const mp = man.geometry.attributes.position; let top = null;
      for (let i = 0; i < mp.count; i++) { const x = mp.getX(i) + man.position.x; if (x * sd <= 0.02) continue; const y = mp.getY(i) + man.position.y; if (!top || y > top.y) top = V(x, y, mp.getZ(i) + man.position.z); }
      if (top) { const disc = new THREE.Mesh(blob(0.006 * SC, 1.4, 0.4, 1.1), mat("#c8d6d8", { detail: "none", roughness: 0.3, clearcoat: 0.8 })); disc.position.copy(toStage(top)).add(V(0, 0.012, 0)); add("tmj", disc); }
    }

    // a molar cut in half, enlarged, beside the arches
    const S = 0.8, O = V(0.62, 0.0, 0.1);
    const prof = {
      bone: [[0, -0.13], [0.07, -0.13], [0.075, -0.05], [0.072, 0.02], [0.05, 0.03], [0.042, 0.028], [0.03, -0.1], [0, -0.115]],
      pdl: [[0, -0.115], [0.03, -0.105], [0.044, 0.028], [0.0, 0.028]],
      cementum: [[0, -0.112], [0.028, -0.102], [0.041, 0.03], [0.0, 0.03]],
      dentine: [[0, -0.108], [0.025, -0.1], [0.038, 0.035], [0.047, 0.075], [0.04, 0.1], [0, 0.104]],
      enamel: [[0, 0.03], [0.042, 0.033], [0.052, 0.075], [0.046, 0.108], [0.02, 0.118], [0, 0.112]],
      pulp: [[0, -0.1], [0.006, -0.095], [0.012, 0.0], [0.02, 0.06], [0.014, 0.075], [0, 0.072]],
      gingiva: [[0.042, 0.02], [0.08, 0.02], [0.082, 0.05], [0.05, 0.05], [0.044, 0.04]],
    };
    const colours = { bone: "#e3d6b8", pdl: "#d88c8c", cementum: "#d9c38f", dentine: "#f1dca8", enamel: "#fbfaf4", pulp: "#b8333e", gingiva: "#d4737e" };
    const ids = { bone: "alveolarBone", pdl: "pdl", cementum: "cementum", dentine: "dentine", enamel: "enamel", pulp: "pulp", gingiva: "gingiva" };
    const order = ["bone", "gingiva", "pdl", "cementum", "dentine", "enamel", "pulp"];
    order.forEach((key, depth) => {
      const pr = prof[key].map(([r, y]) => [r * S, y * S]);
      const m = mat(colours[key], { detail: key === "bone" ? "bone" : key === "pulp" ? "tissue" : "none", roughness: key === "enamel" ? 0.15 : 0.45, clearcoat: key === "enamel" ? 1 : 0.4, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -depth, polygonOffsetUnits: -depth * 4 });
      const half = new THREE.Group(); half.position.copy(O);
      half.add(new THREE.Mesh(new THREE.LatheGeometry(pr.map(([r, y]) => new THREE.Vector2(r, y)), 64, Math.PI / 2, Math.PI), m));   // the back half, open towards the viewer
      const shape = new THREE.Shape(); pr.forEach(([r, y], i) => (i ? shape.lineTo(r, y) : shape.moveTo(r, y)));
      for (const sd of [-1, 1]) { const cap = new THREE.Mesh(new THREE.ShapeGeometry(shape), m); cap.scale.x = sd; cap.position.z = 0.0004 * depth; half.add(cap); }   // the cut face
      add(ids[key], half);
    });
    const vessels = []; for (const x of [-0.004, 0.004]) vessels.push([V(O.x + x, O.y - 0.12, 0.002), V(O.x + x * 2, O.y - 0.03, 0.002), V(O.x + x * 4, O.y + 0.06, 0.002)]);
    k.flow(vessels, "#c0282c", 30, 0.25, "tooth", 0.008);
  },
};
