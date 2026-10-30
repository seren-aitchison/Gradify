// DentalGradify's 3D model: both dental arches on their jaws, with a molar cut in half beside them
// to show enamel, dentine, pulp and the periodontium, and the inferior alveolar nerve in the mandible.
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
  intro: { title: "Explore the mouth", text: "Both arches on their jaws, a molar cut in half beside them, and the nerve that runs under the lower teeth. Click anything to learn it, zoom in on any tooth, and read the full notes for each section below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES, calloutName: "Clinical",
  quiz: "find the structure",
  camera: { pos: [0.3, 0.32, 1.3], target: [0.2, 0.06, 0], min: 0.03, max: 3 },
  views: { Front: [[0, 0.1, 1.1], [0.05, 0.08, 0]], Side: [[1.0, 0.15, 0.2], [0.05, 0.08, 0]], Above: [[0.05, 0.9, 0.35], [0.05, 0.08, 0]], "Upper arch": [[0, -0.6, 0.45], [0, 0.11, 0.05]], "Lower arch": [[0, 0.7, 0.45], [0, 0.03, 0.05]], "Tooth section": [[0.48, 0.06, 0.38], [0.46, 0.03, 0]] },
  platform: { r: 0.42, y: -0.17 },
  labelMax: 0.3,
  build(k) {
    const { THREE, V, mat, bone, tube, blob, lathe, box, add, decor } = k;
    const enamel = mat("#f6f2e6", { detail: "none", roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.08, transmission: 0.08, thickness: 0.01, sheen: 0.2 });
    const b = bone("#e6dcc4"), gum = mat("#e47b8c", { detail: "tissue", repeat: 6, roughness: 0.35, clearcoat: 0.8 });
    const at = (i, upper) => {   // position on the arch: i from -7.5 to 7.5 (centre between the central incisors)
      const a = (i / 7.6) * 1.32, R = 0.2;
      return { p: V(Math.sin(a) * R * 1.05, upper ? 0.11 : 0.04, Math.cos(a) * R * 0.95 - 0.08), a };
    };
    const kinds = ["incisors", "incisors", "canines", "premolars", "premolars", "molars", "molars", "thirdMolars"];
    function tooth(kind, upper) {
      const g = new THREE.Group(), dir = upper ? -1 : 1;   // crowns point down on the upper arch
      let crown;
      if (kind === "incisors") crown = new THREE.Mesh(blob(0.011, 0.9, 1.5, 0.45, (v) => { v.z *= 1 - Math.max(0, v.y * dir) * 40; }), enamel);
      else if (kind === "canines") crown = new THREE.Mesh(blob(0.011, 0.85, 1.6, 0.75, (v) => { if (v.y * dir > 0) { v.x *= 1 - v.y * dir * 45; } }), enamel);
      else {
        const w = kind === "premolars" ? 0.009 : 0.0125, cusps = kind === "premolars" ? [[0, 0.5], [0, -0.5]] : [[0.5, 0.5], [-0.5, 0.5], [0.5, -0.5], [-0.5, -0.5]];
        crown = new THREE.Mesh(blob(w, 1.05, 0.95, 1, (v) => { if (v.y * dir > w * 0.2) { let h = 0; for (const [cx, cz] of cusps) h = Math.max(h, 1 - Math.hypot(v.x / w - cx * 0.7, v.z / w - cz * 0.7) * 1.2); v.y = dir * (w * 0.2 + (v.y * dir - w * 0.2) * (0.4 + 0.6 * h)); } }), enamel);
      }
      crown.position.y = dir * 0.012; g.add(crown);
      const roots = kind === "molars" || kind === "thirdMolars" ? (upper ? 3 : 2) : 1, rl = kind === "canines" ? 0.03 : 0.022;
      for (let r = 0; r < roots; r++) {
        const off = roots === 1 ? V(0, 0, 0) : V(Math.cos((r / roots) * Math.PI * 2) * 0.005, 0, Math.sin((r / roots) * Math.PI * 2) * 0.005);
        const root = new THREE.Mesh(new THREE.ConeGeometry(roots === 1 ? 0.0065 : 0.0045, rl, 16), mat("#efe2c4", { detail: "none", roughness: 0.4 }));
        root.position.copy(off).add(V(0, -dir * rl * 0.4, 0)); root.rotation.x = dir > 0 ? Math.PI : 0;   // roots point away from the crown
        g.add(root);
      }
      return g;
    }
    for (const upper of [true, false]) for (let q = -1; q <= 1; q += 2) for (let n = 0; n < 8; n++) {
      const i = q * (n + 0.5), { p, a } = at(i, upper), t = tooth(kinds[n], upper);
      t.position.copy(p); t.rotation.y = a; t.scale.setScalar(1.45); if (kinds[n] === "incisors" || kinds[n] === "canines") t.rotation.x = upper ? -0.12 : 0.1;
      add(kinds[n], t);
    }
    // gums along each arch
    for (const upper of [true, false]) {
      const pts = []; for (let i = -7.6; i <= 7.6; i += 0.4) { const { p } = at(i, upper); pts.push(p.clone().add(V(0, upper ? 0.008 : -0.008, -0.002))); }
      const g = tube(pts, 0.0125, gum, 160, false, 20); add("gingiva", g);
    }
    // the jaws
    const maxPts = []; for (let i = -8; i <= 8; i += 0.5) { const { p } = at(i, true); maxPts.push(p.clone().add(V(0, 0.04, -0.006))); }
    add("maxilla", tube(maxPts, 0.017, b, 160, false, 20));
    const palate = new THREE.Mesh(new THREE.SphereGeometry(0.15, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.3), b); palate.material = b.clone(); palate.material.side = THREE.DoubleSide;
    palate.scale.set(1.15, 0.35, 1.15); palate.position.set(0, 0.125, -0.06); palate.rotation.x = Math.PI; add("maxilla", palate);
    const manPts = []; for (let i = -8.6; i <= 8.6; i += 0.5) { const { p } = at(i, false); manPts.push(p.clone().add(V(0, -0.042, -0.004))); }
    const body = tube(manPts, 0.019, b, 160, false, 20); body.scale.set(1, 1.3, 1); add("mandible", body);
    for (const sd of [-1, 1]) {
      const ramus = box(0.018, 0.13, 0.05, b, 0.008); ramus.position.set(sd * 0.2, 0.05, -0.24); ramus.rotation.set(-0.2, 0, sd * 0.04); add("mandible", ramus);
      const cor = new THREE.Mesh(new THREE.ConeGeometry(0.01, 0.04, 12), b); cor.position.set(sd * 0.2, 0.125, -0.215); add("mandible", cor);
      const cond = new THREE.Mesh(blob(0.012, 1.6, 1, 1), b); cond.position.set(sd * 0.2, 0.125, -0.27); add("tmj", cond);
      const disc = new THREE.Mesh(new THREE.TorusGeometry(0.011, 0.003, 10, 24), mat("#7ee0ff", { detail: "none", transmission: 0.3 })); disc.rotation.x = Math.PI / 2; disc.position.set(sd * 0.2, 0.138, -0.27); add("tmj", disc);
      const fossa = new THREE.Mesh(new THREE.SphereGeometry(0.02, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.45), b); fossa.material = b.clone(); fossa.material.side = THREE.DoubleSide; fossa.position.set(sd * 0.2, 0.135, -0.27); add("tmj", fossa);
      // the inferior alveolar nerve: into the mandibular foramen, under the teeth, out at the mental foramen
      const nerve = []; nerve.push(V(sd * 0.2, 0.09, -0.235)); for (let i = 7.4; i >= 3.4; i -= 0.5) { const { p } = at(sd * i, false); nerve.push(p.clone().add(V(0, -0.038, 0))); }
      const { p: mf } = at(sd * 3.2, false); nerve.push(mf.clone().add(V(sd * 0.012, -0.03, 0.02)));
      add("ian", tube(nerve, 0.0032, mat("#ffe066", { detail: "none", emissive: new THREE.Color("#4a3c00") }), 64));
    }
    // a molar cut in half, enlarged, beside the arches
    const S = 0.8, O = V(0.46, 0.0, 0);
    const prof = {
      bone: [[0, -0.13], [0.07, -0.13], [0.075, -0.05], [0.072, 0.02], [0.05, 0.03], [0.042, 0.028], [0.03, -0.1], [0, -0.115]],
      pdl: [[0, -0.115], [0.03, -0.105], [0.044, 0.028], [0.0, 0.028]],
      cementum: [[0, -0.112], [0.028, -0.102], [0.041, 0.03], [0.0, 0.03]],
      dentine: [[0, -0.108], [0.025, -0.1], [0.038, 0.035], [0.047, 0.075], [0.04, 0.1], [0, 0.104]],
      enamel: [[0, 0.03], [0.042, 0.033], [0.052, 0.075], [0.046, 0.108], [0.02, 0.118], [0, 0.112]],
      pulp: [[0, -0.1], [0.006, -0.095], [0.012, 0.0], [0.02, 0.06], [0.014, 0.075], [0, 0.072]],
      gingiva: [[0.042, 0.02], [0.08, 0.02], [0.082, 0.05], [0.05, 0.05], [0.044, 0.04]],
    };
    const colours = { bone: "#e3d6b8", pdl: "#ff8fa3", cementum: "#d9c38f", dentine: "#f1dca8", enamel: "#fbfaf4", pulp: "#d23b4b", gingiva: "#e47b8c" };
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
    k.flow(vessels, "#ff8fa3", 30, 0.25, "tooth", 0.008);
  },
};
