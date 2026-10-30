// SciGradify's 3D model: an animal cell cut open, with the nucleus, the endomembrane system,
// mitochondria, ribosomes, lysosomes, the cytoskeleton and centrioles. Vesicles bud from the Golgi
// and travel to the membrane. Notes cover cell structure, energy, protein synthesis and transport.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  control: { name: "Nucleus", c: "#c79bff" },
  energy: { name: "Energy", c: "#ff8f6b" },
  synthesis: { name: "Making proteins", c: "#5ef0ff" },
  boundary: { name: "Membrane & support", c: "#6bffb8" },
};

const STRUCTURES = {
  nucleus: s("control", "Nucleus", "Holds the cell's DNA as chromatin, inside a double membrane (the nuclear envelope) with pores.",
    ["Nuclear pores let mRNA out and proteins (e.g. polymerases) in.", "DNA is wrapped around **histones** into nucleosomes; tightly packed heterochromatin is less transcribed.", "Transcription (DNA → mRNA) happens in the nucleus; translation in the cytoplasm."],
    [["What passes through nuclear pores?", "mRNA and ribosome subunits out; proteins such as polymerases and histones in."], ["Where does transcription happen in a eukaryotic cell?", "In the nucleus."], ["What are histones?", "Proteins that DNA wraps around to form nucleosomes, packaging it as chromatin."]],
    ["nucleus", "nuclear", "chromatin", "histone", "dna", "transcription"]),
  nucleolus: s("control", "Nucleolus", "A dense region inside the nucleus where ribosomal RNA is made and ribosome subunits are assembled.",
    ["It isn't membrane-bound.", "Cells making lots of protein have large nucleoli.", "It disappears during prophase of mitosis and reforms in telophase."],
    [["What is made in the nucleolus?", "Ribosomal RNA, and ribosome subunits are assembled there."], ["Is the nucleolus membrane-bound?", "No."], ["When does the nucleolus disappear in mitosis?", "Prophase (it reforms in telophase)."]],
    ["nucleolus", "rrna", "ribosome"]),
  mitochondria: s("energy", "Mitochondria", "Double-membraned organelles where aerobic respiration makes most of the cell's ATP. The inner membrane folds into cristae.",
    ["Link reaction and **Krebs cycle** in the matrix; **oxidative phosphorylation** on the inner membrane (cristae increase its area).", "They have their own circular DNA and 70S ribosomes: evidence for **endosymbiosis** (once free-living bacteria).", "Mitochondrial DNA is inherited from the mother."],
    [["Where in the mitochondrion does the Krebs cycle happen?", "The matrix."], ["Why are the cristae folded?", "To increase the surface area for the electron transport chain and ATP synthase."], ["Give two pieces of evidence for endosymbiosis.", "Mitochondria have their own circular DNA, 70S ribosomes and a double membrane, and divide by binary fission."]],
    ["mitochondri", "respiration", "atp", "krebs", "cristae", "endosymbio"]),
  ribosomes: s("synthesis", "Ribosomes", "The protein factories: rRNA and protein in two subunits (80S in eukaryotes). Free in the cytoplasm or bound to the rough ER.",
    ["They read mRNA codons and join amino acids brought by tRNA (**translation**).", "Free ribosomes make proteins used in the cytoplasm; bound ones make proteins for export or membranes.", "Prokaryotes have smaller 70S ribosomes: why some antibiotics (e.g. tetracyclines) can target bacteria."],
    [["What happens at a ribosome?", "Translation: mRNA is read and amino acids are joined into a polypeptide."], ["What size are eukaryotic cytoplasmic ribosomes?", "80S."], ["Why can some antibiotics target bacterial ribosomes without harming ours?", "Bacteria have 70S ribosomes, which differ from our 80S ones."]],
    ["ribosome", "translation", "protein synthesis", "trna", "codon"]),
  roughER: s("synthesis", "Rough endoplasmic reticulum", "Flattened membrane sacs (cisternae) studded with ribosomes, continuous with the nuclear envelope.",
    ["Proteins made here enter the lumen to be folded and modified (e.g. glycosylation).", "Abundant in cells that secrete proteins: pancreatic acinar cells, plasma cells.", "Proteins leave in vesicles for the Golgi."],
    [["What is the function of the rough ER?", "Synthesis, folding and modification of proteins (for secretion or membranes), transported in vesicles."], ["Which cells have lots of rough ER?", "Cells that secrete proteins, such as pancreatic cells and plasma cells."], ["What makes the rough ER 'rough'?", "Ribosomes bound to its surface."]],
    ["rough er", "endoplasmic reticulum", "rer", "cisternae"]),
  smoothER: s("synthesis", "Smooth endoplasmic reticulum", "Tubular membranes without ribosomes. Makes lipids and steroids, stores calcium and detoxifies.",
    ["Abundant in liver cells (detoxification) and steroid-making cells (adrenal cortex, gonads).", "In muscle it's the **sarcoplasmic reticulum**, storing Ca²⁺ for contraction.", "It makes phospholipids for new membranes."],
    [["Name three functions of the smooth ER.", "Lipid and steroid synthesis, detoxification, calcium storage."], ["What is the smooth ER called in muscle cells?", "The sarcoplasmic reticulum."], ["Why do liver cells have lots of smooth ER?", "For detoxifying drugs and toxins."]],
    ["smooth er", "lipid", "steroid", "sarcoplasmic", "detox"]),
  golgi: s("synthesis", "Golgi apparatus", "A stack of flattened sacs that receives proteins from the ER, modifies them, sorts them and packages them in vesicles.",
    ["Cis face receives vesicles from the ER; trans face sends vesicles out.", "Adds carbohydrates (glycoproteins) and forms **lysosomes**.", "Secretory vesicles fuse with the membrane to release their contents (**exocytosis**)."],
    [["What does the Golgi apparatus do?", "Modifies, sorts and packages proteins and lipids into vesicles; makes lysosomes."], ["Describe the path of a secreted protein.", "Ribosome on RER → RER lumen → vesicle → Golgi → secretory vesicle → exocytosis at the membrane."], ["Which face of the Golgi receives ER vesicles?", "The cis face."]],
    ["golgi", "vesicle", "secretion", "exocytosis", "glycoprotein"]),
  vesicles: s("synthesis", "Vesicles", "Small membrane bubbles that carry substances between organelles and to the cell membrane.",
    ["Move along microtubules, pulled by motor proteins (kinesin and dynein) using ATP.", "**Exocytosis**: vesicles fuse with the membrane to release contents (hormones, enzymes, neurotransmitters).", "**Endocytosis**: the membrane folds in to take things in (phagocytosis, pinocytosis)."],
    [["How do vesicles move through the cell?", "Along microtubules, carried by motor proteins using ATP."], ["What is exocytosis?", "Release of substances when a vesicle fuses with the cell membrane."], ["Name two types of endocytosis.", "Phagocytosis (solids) and pinocytosis (liquids)."]],
    ["vesicle", "exocytosis", "endocytosis", "transport"]),
  lysosomes: s("boundary", "Lysosomes", "Vesicles of hydrolytic enzymes (lysozymes) that digest worn-out organelles, invading bacteria and engulfed material.",
    ["Their enzymes work best at acid pH (~5), protecting the cell if one leaks.", "Phagocytes fuse lysosomes with phagosomes to destroy pathogens.", "Autophagy recycles old organelles; failure causes lysosomal storage diseases (Tay–Sachs)."],
    [["What do lysosomes contain?", "Hydrolytic (digestive) enzymes."], ["How does a phagocyte destroy a bacterium?", "It engulfs it into a phagosome, which fuses with a lysosome whose enzymes digest it."], ["What is autophagy?", "Digestion and recycling of the cell's own worn-out organelles by lysosomes."]],
    ["lysosome", "hydrolytic", "phagocyt", "autophagy"]),
  membrane: s("boundary", "Cell membrane", "A phospholipid bilayer with proteins, cholesterol and glycoproteins: the **fluid mosaic model** (Singer and Nicolson, 1972).",
    ["Transport: diffusion, facilitated diffusion (channels, carriers), osmosis, active transport (ATP), bulk transport.", "Cholesterol regulates fluidity; glycoproteins act as receptors and recognition markers.", "Partially permeable: small non-polar molecules cross easily, ions need proteins."],
    [["Describe the fluid mosaic model.", "A phospholipid bilayer in which proteins float (fluid) and are scattered like a mosaic, with cholesterol and glycoproteins."], ["What is active transport?", "Movement against a concentration gradient using carrier proteins and ATP."], ["What does cholesterol do in membranes?", "Regulates fluidity, making the membrane more stable."]],
    ["membrane", "fluid mosaic", "diffusion", "osmosis", "active transport", "phospholipid"]),
  cytoskeleton: s("boundary", "Cytoskeleton", "A network of protein fibres: microfilaments (actin), intermediate filaments and microtubules (tubulin).",
    ["Gives shape and support, moves organelles and vesicles, and forms the spindle in cell division.", "Microtubules form cilia and flagella (9 + 2 arrangement).", "Actin filaments drive muscle contraction (with myosin) and cell movement."],
    [["Name the three types of cytoskeleton fibre.", "Microfilaments (actin), intermediate filaments and microtubules (tubulin)."], ["What forms the spindle in mitosis?", "Microtubules."], ["What is the arrangement of microtubules in a cilium?", "9 + 2 (nine pairs around two central microtubules)."]],
    ["cytoskeleton", "microtubule", "actin", "spindle", "cilia"]),
  centrioles: s("boundary", "Centrioles", "A pair of cylinders of microtubules (9 triplets) at right angles, in the centrosome near the nucleus. Absent in most plant cells.",
    ["They organise the **spindle fibres** that separate chromosomes in mitosis and meiosis.", "Basal bodies (the same structure) anchor cilia and flagella.", "They duplicate before cell division."],
    [["What do centrioles do in cell division?", "Organise the microtubules of the spindle."], ["Which cells usually lack centrioles?", "Most plant cells."], ["What is the arrangement of microtubules in a centriole?", "Nine triplets in a cylinder."]],
    ["centriole", "centrosome", "spindle", "mitosis"]),
};

const NOTES = {
  control: { title: "The nucleus and the genetic code", lead: "The nucleus stores the instructions; the cell turns them into proteins. Know the structure, then the path from gene to protein.",
    sections: [
      ["Eukaryotic vs prokaryotic cells", "- Eukaryotic (animal, plant, fungal): nucleus, membrane-bound organelles, 80S ribosomes, linear DNA with histones.", "- Prokaryotic (bacteria): no nucleus (DNA in a nucleoid), circular DNA, plasmids, 70S ribosomes, cell wall of peptidoglycan.", "- Plant cells add a cellulose cell wall, chloroplasts and a large permanent vacuole.", "> Size: prokaryotes ~1–5 µm; eukaryotic cells ~10–100 µm."],
      ["DNA, genes and the code", "- DNA: double helix of nucleotides (deoxyribose, phosphate, base); A–T and C–G by hydrogen bonds; antiparallel strands.", "- The genetic code is triplet, degenerate (several codons per amino acid), non-overlapping and universal.", "- Replication is semi-conservative (Meselson and Stahl): DNA helicase unzips, DNA polymerase builds new strands."],
      ["From gene to protein", "- **Transcription** (nucleus): RNA polymerase makes pre-mRNA; introns spliced out → mRNA.", "- **Translation** (ribosome): tRNA anticodons pair with mRNA codons; peptide bonds join amino acids.", "- Mutations: substitution (may be silent), insertion or deletion (frameshift)."],
      ["Cell division", "- Interphase (G1, S: DNA replication, G2) → mitosis (prophase, metaphase, anaphase, telophase) → cytokinesis.", "- Mitosis gives two genetically identical diploid cells (growth, repair); meiosis gives four haploid gametes (variation by crossing over and independent assortment).", "! Cancer is uncontrolled mitosis from mutations in genes that control the cell cycle (proto-oncogenes and tumour suppressors)."],
    ] },
  energy: { title: "Mitochondria and respiration", lead: "Every living cell needs ATP. Aerobic respiration in mitochondria makes far more of it than anaerobic respiration in the cytoplasm.",
    sections: [
      ["Respiration equations", "- Aerobic: glucose + oxygen → carbon dioxide + water (+ ATP). C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O.", "- Anaerobic in animals: glucose → lactate. In yeast: glucose → ethanol + carbon dioxide (fermentation).", "> Respiration is a chemical reaction in cells, not breathing."],
      ["Stages of aerobic respiration", "- **Glycolysis** (cytoplasm): glucose → 2 pyruvate, net 2 ATP, 2 NADH.", "- **Link reaction** (matrix): pyruvate → acetyl CoA + CO₂.", "- **Krebs cycle** (matrix): CO₂, ATP, NADH and FADH₂.", "- **Oxidative phosphorylation** (inner membrane): electron transport chain pumps H⁺; ATP synthase uses the gradient (chemiosmosis). Oxygen is the final electron acceptor.", "- Total: around 30–32 ATP per glucose."],
      ["ATP", "- Adenosine triphosphate: ribose, adenine and three phosphates. Hydrolysis to ADP + Pi releases energy in small, usable amounts.", "- Used for active transport, muscle contraction, protein synthesis, cell division."],
      ["Mitochondria and evolution", "- Endosymbiotic theory (Margulis): mitochondria and chloroplasts were once free-living prokaryotes.", "- Evidence: double membrane, own circular DNA, 70S ribosomes, binary fission."],
    ] },
  synthesis: { title: "Making, packaging and moving proteins", lead: "The endomembrane system is a production line: ribosomes build proteins, the rough ER folds them, the Golgi finishes and sorts them, and vesicles deliver them.",
    sections: [
      ["The secretory pathway", "1. mRNA leaves the nucleus through a pore. 2. Ribosomes on the rough ER translate it; the protein enters the ER lumen. 3. Vesicles carry it to the Golgi (cis face). 4. The Golgi modifies it (e.g. adds carbohydrate) and packages it. 5. Secretory vesicles fuse with the membrane: exocytosis.", "> Exam favourite: insulin from β cells and digestive enzymes from pancreatic cells follow this path."],
      ["Protein structure", "- Primary: the amino acid sequence. Secondary: α-helices and β-pleated sheets (hydrogen bonds).", "- Tertiary: the 3D fold (hydrogen, ionic, disulfide bonds, hydrophobic interactions). Quaternary: more than one chain (haemoglobin).", "- Enzymes: active sites complementary to substrates (induced fit); denatured by high temperature and extreme pH."],
      ["Microscopy", "- Light microscope: up to ~×1500, resolution ~200 nm; living cells, colour.", "- Electron microscopes: TEM (2D sections, ~0.1 nm) and SEM (3D surfaces); dead specimens in a vacuum.", "- Magnification = image size ÷ actual size. 1 mm = 1000 µm = 1,000,000 nm."],
    ] },
  boundary: { title: "The membrane, transport and support", lead: "The membrane controls what enters and leaves; the cytoskeleton holds the cell's shape and moves things around inside it.",
    sections: [
      ["Transport across membranes", "- **Diffusion**: net movement down a concentration gradient, passive. Rate depends on gradient, surface area, distance and temperature (Fick's law).", "- **Facilitated diffusion**: through channel or carrier proteins, still passive.", "- **Osmosis**: water moves from a higher to a lower water potential across a partially permeable membrane.", "- **Active transport**: carrier proteins and ATP move substances against the gradient (root hair cells, gut).", "- **Bulk transport**: endocytosis and exocytosis."],
      ["Osmosis in cells", "- Animal cells in pure water swell and burst (lysis); in concentrated solution they shrink (crenation).", "- Plant cells become turgid in water (the wall stops bursting) and plasmolysed in concentrated solution.", "> Required practical: potato cylinders in sucrose solutions; plot % change in mass to find where it crosses zero."],
      ["Cell recognition and the immune system", "- Glycoproteins and glycolipids are antigens: the immune system recognises 'self' and 'non-self'.", "- Phagocytes engulf pathogens and digest them with lysosomes; lymphocytes make antibodies."],
      ["The cytoskeleton and movement", "- Microtubules: tracks for vesicles, spindle fibres, cilia (moving mucus in the airways) and flagella (sperm).", "- Microfilaments: muscle contraction, cytokinesis, cell crawling (white blood cells)."],
    ] },
};

export default {
  title: "The cell in 3D", kicker: "3D cell biology",
  intro: { title: "Explore an animal cell", text: "The cell is cut open so you can see inside: the nucleus, the endomembrane system, mitochondria, lysosomes and the cytoskeleton. Vesicles bud from the Golgi and travel to the membrane. Click anything for its structure and function, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Key point",
  quiz: "find the organelle",
  motion: "Vesicles moving",
  camera: { pos: [0.9, 0.8, 1.5], target: [0, 0.05, 0], min: 0.03, max: 4 },
  views: { Outside: [[1.3, 1.0, 1.3], [0, 0, 0]], "Cut face": [[0.05, 0.25, 1.6], [0, 0, 0]], Nucleus: [[0.25, 0.3, 0.6], [-0.05, 0.03, 0]], Golgi: [[0.55, 0.3, 0.55], [0.25, 0.0, 0.1]], Mitochondrion: [[-0.15, 0.1, 0.65], [-0.35, -0.15, 0.2]] },
  platform: { r: 0.62, y: -0.62 },
  explode: true,
  build(k) {
    const { THREE, V, mat, holo, glow, limb, tube, blob, add, decor } = k;
    const rnd = (() => { let x = 7; return () => (x = (x * 16807) % 2147483647) / 2147483647; })();
    // the membrane: a sphere with a wedge cut away (the front quarter), lined with a holographic edge
    const memMat = mat("#9fffd8", { detail: "tissue", repeat: 6, roughness: 0.3, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide, emissive: new THREE.Color("#0a3a28") });
    add("membrane", new THREE.Mesh(new THREE.SphereGeometry(0.6, 96, 64, Math.PI, Math.PI * 1.5), memMat));
    const rim = new THREE.Mesh(new THREE.SphereGeometry(0.605, 96, 64, Math.PI, Math.PI * 1.5), holo("#6bffb8", "#073a2a", 0.4)); decor(rim, "boundary");
    // cytoplasm: faint glow particles
    const cyto = new THREE.BufferGeometry(), cp = [];
    for (let i = 0; i < 1500; i++) { const v = V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize().multiplyScalar(Math.cbrt(rnd()) * 0.57); cp.push(v.x, v.y, v.z); }
    cyto.setAttribute("position", new THREE.Float32BufferAttribute(cp, 3));
    decor(new THREE.Points(cyto, new THREE.PointsMaterial({ color: "#5ef0ff", size: 0.004, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })), "boundary");
    // nucleus with pores, cut open too, and the nucleolus
    const nMat = mat("#a77bff", { detail: "tissue", repeat: 4, side: THREE.DoubleSide, clearcoat: 0.8, roughness: 0.3 });
    const nuc = new THREE.Group(); nuc.position.set(-0.05, 0.03, 0);
    nuc.add(new THREE.Mesh(new THREE.SphereGeometry(0.2, 64, 48, Math.PI, Math.PI * 1.5), nMat));
    for (let i = 0; i < 60; i++) { const v = V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize(); if (v.x > 0 && v.z > 0) continue; /* none on the cut-away quarter */ const p = new THREE.Mesh(new THREE.TorusGeometry(0.008, 0.003, 8, 16), mat("#e0c8ff", { detail: "none" })); p.position.copy(v.multiplyScalar(0.2)); p.lookAt(V(0, 0, 0)); nuc.add(p); }
    const chrom = []; for (let i = 0; i < 260; i++) chrom.push(V(Math.sin(i * 0.37) * 0.12 * Math.sin(i * 0.05), Math.cos(i * 0.29) * 0.12 * Math.sin(i * 0.031 + 1), Math.sin(i * 0.41 + 2) * 0.12 * Math.cos(i * 0.04)));
    nuc.add(tube(chrom, 0.0035, mat("#d6b8ff", { detail: "none", emissive: new THREE.Color("#301850") }), 1200));
    add("nucleus", nuc);
    const nl = new THREE.Mesh(blob(0.055, 1, 0.9, 1, (v) => v.multiplyScalar(1 + Math.sin(v.x * 150) * Math.sin(v.y * 140) * 0.06)), mat("#5a2fbf", { detail: "tissue", repeat: 6 })); nl.position.set(-0.03, 0.05, 0.04); add("nucleolus", nl);
    // rough ER: stacked curved sheets wrapping the nucleus, with ribosomes on them
    const rerMat = mat("#5ef0ff", { detail: "fold", repeat: 4, bump: 1, side: THREE.DoubleSide, roughness: 0.35, clearcoat: 0.6 });
    const ribosomeAt = [];
    for (let j = 0; j < 4; j++) {
      const r = 0.25 + j * 0.035, sheet = new THREE.Mesh(new THREE.SphereGeometry(r, 64, 24, Math.PI * 1.05, Math.PI * 0.75, Math.PI * 0.25, Math.PI * 0.45), rerMat);
      const pos = sheet.geometry.attributes.position, v = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i); v.multiplyScalar(1 + Math.sin(Math.atan2(v.x, v.z) * 14 + j) * 0.03); pos.setXYZ(i, v.x, v.y, v.z); if (i % 23 === 0) ribosomeAt.push(v.clone().multiplyScalar(1.012).add(V(-0.05, 0.03, 0))); }
      sheet.geometry.computeVertexNormals(); sheet.position.set(-0.05, 0.03, 0); add("roughER", sheet);
    }
    // smooth ER: branching tubes
    const serMat = mat("#7ee0ff", { detail: "none", roughness: 0.3, clearcoat: 0.8 });
    for (let j = 0; j < 7; j++) { const pts = [], c = V(0.15 + rnd() * 0.15, -0.25 + rnd() * 0.1, -0.25 + rnd() * 0.15); for (let i = 0; i < 6; i++) pts.push(c.clone().add(V(Math.sin(i + j) * 0.07, Math.cos(i * 1.3 + j) * 0.05, i * 0.03))); add("smoothER", tube(pts, 0.012, serMat, 48)); }
    // ribosomes: free and bound
    for (let i = 0; i < 140; i++) ribosomeAt.push(V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize().multiplyScalar(0.28 + rnd() * 0.26));
    const ribo = new THREE.InstancedMesh(new THREE.SphereGeometry(0.007, 10, 8), mat("#d8faff", { detail: "none", emissive: new THREE.Color("#1a4a5a") }), ribosomeAt.length);
    const m4 = new THREE.Matrix4(); ribosomeAt.forEach((p, i) => ribo.setMatrixAt(i, m4.makeTranslation(p.x, p.y, p.z))); add("ribosomes", ribo);
    // Golgi: a stack of curved cisternae
    const golgi = new THREE.Group(); golgi.position.set(0.27, 0.0, 0.12); golgi.rotation.set(0.3, -0.6, 0.2);
    for (let j = 0; j < 6; j++) { const c = new THREE.Mesh(blob(0.1 - Math.abs(j - 2.5) * 0.008, 1, 0.12, 0.55, (v) => { v.y += (v.x * v.x) * 2.5; }), mat("#5ab4ff", { detail: "none", roughness: 0.3, clearcoat: 1 })); c.position.y = j * 0.022; golgi.add(c); }
    add("golgi", golgi);
    // vesicles budding from the Golgi to the membrane
    const vesPaths = [];
    for (let i = 0; i < 5; i++) { const end = V(0.3 + i * 0.04, 0.2 - i * 0.09, 0.35 + rnd() * 0.1).normalize().multiplyScalar(0.58); vesPaths.push([V(0.27, 0.07, 0.12), V(0.33, 0.1 - i * 0.04, 0.22), end]); }
    const vMat = mat("#5ef0ff", { detail: "none", transmission: 0.4, thickness: 0.02, roughness: 0.2, clearcoat: 1 });
    const vesicles = [];
    for (let i = 0; i < 8; i++) { const v = new THREE.Mesh(new THREE.SphereGeometry(0.016, 24, 16), vMat); v.userData.moves = true; add("vesicles", v); vesicles.push({ v, path: new THREE.CatmullRomCurve3(vesPaths[i % vesPaths.length]), o: i / 8 }); }
    // mitochondria with cristae
    const mitoMat = mat("#ff8f6b", { detail: "tissue", repeat: 3, roughness: 0.35, clearcoat: 0.7, transparent: true, opacity: 0.8 });
    for (const [x, y, z, ry, rz] of [[-0.35, -0.15, 0.2, 0.3, 0.6], [0.05, -0.35, 0.18, 1.2, 0.2], [-0.3, 0.3, -0.15, 0.6, 1.2], [0.2, 0.3, -0.25, 1.9, 0.4], [-0.38, -0.1, -0.25, 0.1, 1.5]]) {
      const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.set(0, ry, rz);
      g.add(new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.1, 12, 24), mitoMat));
      for (let c = -2; c <= 2; c++) { const cr = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.004, 20), mat("#ffc2a8", { detail: "none" })); cr.position.y = c * 0.025; cr.rotation.z = 0.2 * c; g.add(cr); }
      add("mitochondria", g);
    }
    // lysosomes
    for (const [x, y, z] of [[0.35, -0.2, 0.0], [0.1, 0.4, 0.1], [-0.2, -0.35, -0.2], [0.42, 0.15, -0.15]]) { const l = new THREE.Mesh(new THREE.SphereGeometry(0.03, 24, 16), mat("#6bffb8", { detail: "tissue", repeat: 2, emissive: new THREE.Color("#0d4a33"), clearcoat: 1 })); l.position.set(x, y, z); add("lysosomes", l); }
    // cytoskeleton: microtubules radiating from the centrosome
    const cent = V(0.12, 0.2, 0.0), cyMat = mat("#9fffd8", { detail: "none", emissive: new THREE.Color("#0a3a28"), transparent: true, opacity: 0.6 });
    for (let i = 0; i < 26; i++) { const end = V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize().multiplyScalar(0.57); const mid = cent.clone().lerp(end, 0.5).add(V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(0.08)); add("cytoskeleton", tube([cent, mid, end], 0.0025, cyMat, 24, false, 6)); }
    const cg = new THREE.Group(); cg.position.copy(cent);
    for (const rot of [0, Math.PI / 2]) { const c = new THREE.Group(); c.rotation.x = rot; for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; c.add(limb(V(Math.cos(a) * 0.012, -0.02, Math.sin(a) * 0.012), V(Math.cos(a) * 0.012, 0.02, Math.sin(a) * 0.012), 0.003, mat("#c8fff0", { detail: "none" }), false)); } cg.add(c); }
    add("centrioles", cg);
    const tmp = new THREE.Vector3();
    k.tick((t, dt, motion) => {
      if (!motion) return;
      for (const { v, path, o } of vesicles) { const u = (t * 0.12 + o) % 1; path.getPointAt(u, tmp); v.position.copy(tmp); v.scale.setScalar(u > 0.92 ? (1 - u) / 0.08 : Math.min(1, u * 8)); }
    });
  },
};
