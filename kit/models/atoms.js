// YouthGradify's 3D model: the building blocks of GCSE and A level science. A carbon atom with its
// nucleus and electron shells, water and methane molecules and a sodium chloride lattice, and a
// turning DNA double helix. Notes cover atomic structure, bonding and genetics.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  atom: { name: "The atom", c: "#5ef0ff" },
  bonding: { name: "Bonding", c: "#f055dd" },
  dna: { name: "DNA", c: "#6bffb8" },
};

const STRUCTURES = {
  nucleus: s("atom", "Nucleus", "The tiny, dense centre of an atom, holding protons (positive) and neutrons (no charge). Almost all the atom's mass is here.",
    ["Carbon-12 has **6 protons and 6 neutrons**. The atomic number is the number of protons.", "Mass number = protons + neutrons. Isotopes have the same protons but different neutrons (carbon-14 has 8).", "Rutherford's gold foil experiment (1909) showed the nucleus is tiny and positive: most alpha particles passed straight through."],
    [["What is the atomic number?", "The number of protons in an atom."], ["What are isotopes?", "Atoms of the same element with different numbers of neutrons."], ["What did Rutherford's gold foil experiment show?", "Atoms are mostly empty space with a small, dense, positive nucleus."]],
    ["nucleus", "proton", "neutron", "atomic number", "mass number", "isotope", "rutherford"]),
  shells: s("atom", "Electron shells", "Electrons (negative, almost no mass) orbit the nucleus in shells. Carbon's six electrons are arranged 2, 4.",
    ["Shell capacities (GCSE): **2, 8, 8**. The outer shell decides how an element reacts.", "Group number = number of outer electrons; period = number of shells.", "Bohr proposed electrons in fixed shells (1913), explaining emission spectra."],
    [["What is the electron arrangement of carbon?", "2, 4."], ["How many electrons fit in the first three shells (GCSE model)?", "2, 8, 8."], ["What does an element's group number tell you?", "The number of electrons in its outer shell."]],
    ["electron", "shell", "electronic configuration", "bohr", "periodic table", "group"]),
  covalent: s("bonding", "Covalent bonds: water and methane", "Non-metal atoms share pairs of electrons. Water (H₂O) is bent; methane (CH₄) is a tetrahedron.",
    ["Simple molecules have **low melting and boiling points**: the forces *between* molecules are weak, though the bonds inside are strong.", "Water's bent shape and polar bonds make it a great solvent and give it hydrogen bonding.", "Diamond and graphite are giant covalent structures with very high melting points."],
    [["What is a covalent bond?", "A shared pair of electrons between two non-metal atoms."], ["Why do simple molecular substances have low boiling points?", "Only weak intermolecular forces need to be overcome, not the covalent bonds."], ["What shape is a methane molecule?", "Tetrahedral (bond angle 109.5°)."]],
    ["covalent", "molecule", "water", "methane", "shared pair", "intermolecular"]),
  ionic: s("bonding", "Ionic lattice: sodium chloride", "Metals give electrons to non-metals, forming ions held in a giant lattice by strong electrostatic attraction.",
    ["Na → Na⁺ + e⁻; Cl + e⁻ → Cl⁻. Opposite charges attract in every direction.", "High melting points; conduct electricity when **molten or dissolved** (ions free to move), not as a solid.", "Dot-and-cross diagrams show the electron transfer."],
    [["How does an ionic bond form?", "A metal transfers electrons to a non-metal, forming oppositely charged ions that attract."], ["When does sodium chloride conduct electricity?", "When molten or dissolved in water, because the ions can move."], ["Why does sodium chloride have a high melting point?", "Many strong electrostatic forces between ions in a giant lattice must be overcome."]],
    ["ionic", "ion", "lattice", "sodium chloride", "salt", "electrostatic"]),
  metallic: s("bonding", "Metallic bonding", "Metal atoms in a regular lattice, sharing a 'sea' of delocalised electrons.",
    ["Delocalised electrons carry charge and heat: metals **conduct**.", "Layers of ions can slide, so metals are malleable and ductile.", "Alloys contain different-sized atoms that disrupt the layers, making them harder."],
    [["Why do metals conduct electricity?", "Delocalised electrons can move through the structure."], ["Why are metals malleable?", "Layers of ions can slide over each other."], ["Why are alloys harder than pure metals?", "Different-sized atoms distort the layers, so they can't slide as easily."]],
    ["metallic", "delocalised", "alloy", "metal", "conductor"]),
  helix: s("dna", "Double helix", "DNA is two strands twisted into a double helix (Watson and Crick, 1953, using Rosalind Franklin's X-ray images).",
    ["DNA is a **polymer** of nucleotides: a sugar, a phosphate and a base.", "The strands run in opposite directions and are held together by hydrogen bonds between bases.", "It's found in the nucleus, in chromosomes; a gene is a section coding for a protein."],
    [["Who discovered the double helix structure?", "Watson and Crick (1953), using Rosalind Franklin's X-ray diffraction data."], ["What is a nucleotide made of?", "A sugar, a phosphate group and a base."], ["What is a gene?", "A section of DNA that codes for a particular protein."]],
    ["dna", "double helix", "nucleotide", "watson", "crick", "franklin", "gene", "chromosome"]),
  bases: s("dna", "Base pairs", "Four bases pair up: **A with T** and **C with G**. Their order is the genetic code.",
    ["Complementary base pairing makes copying (replication) accurate.", "Three bases (a triplet) code for one amino acid.", "A mutation changes the base sequence and may change the protein."],
    [["Which bases pair together in DNA?", "Adenine with thymine, cytosine with guanine."], ["How many bases code for one amino acid?", "Three (a triplet)."], ["What is a mutation?", "A change in the DNA base sequence."]],
    ["base pair", "adenine", "thymine", "guanine", "cytosine", "genetic code", "mutation"]),
  backbone: s("dna", "Sugar-phosphate backbone", "The outside rails of the ladder: alternating sugar (deoxyribose) and phosphate groups, joined by strong covalent bonds.",
    ["The bases point inwards from the backbone.", "Extracting DNA from strawberries: detergent breaks membranes, salt clumps DNA, cold ethanol makes it precipitate.", "RNA uses ribose and the base uracil instead of thymine."],
    [["What makes up the DNA backbone?", "Alternating deoxyribose sugars and phosphate groups."], ["How is DNA different from RNA?", "DNA has deoxyribose and thymine, and is double-stranded; RNA has ribose and uracil, and is single-stranded."], ["Why add detergent when extracting DNA?", "To break down cell and nuclear membranes."]],
    ["backbone", "sugar", "phosphate", "deoxyribose", "rna"]),
};

const NOTES = {
  atom: { title: "Atomic structure", lead: "Everything is made of atoms. Understanding what's inside them explains the periodic table and how elements react.",
    sections: [
      ["Particles in the atom", "- Proton: relative mass 1, charge +1, in the nucleus.", "- Neutron: relative mass 1, charge 0, in the nucleus.", "- Electron: relative mass about 1/1840, charge −1, in shells.", "> Atoms have no overall charge: protons = electrons."],
      ["History of the atom", "- Dalton (solid spheres) → Thomson (plum pudding, discovered electrons) → Rutherford (nuclear model) → Bohr (shells) → Chadwick (neutrons, 1932).", "- Each model changed because of new evidence: that's how science works."],
      ["The periodic table", "- Ordered by atomic number. Groups (columns) have the same number of outer electrons; periods (rows) the same number of shells.", "- Group 1 (alkali metals) get more reactive down the group; group 7 (halogens) less reactive down the group.", "- Group 0 (noble gases) have full outer shells and are unreactive."],
      ["Relative atomic mass and moles", "- Relative atomic mass: the weighted average mass of an element's isotopes.", "- Moles = mass ÷ Mr; one mole contains 6.02 × 10²³ particles (Avogadro's constant)."],
    ] },
  bonding: { title: "Bonding and structure", lead: "Atoms bond to get full outer shells. The type of bond decides the structure, and the structure decides the properties.",
    sections: [
      ["Three types of bonding", "- Ionic: metal + non-metal, electrons transferred.", "- Covalent: non-metal + non-metal, electrons shared.", "- Metallic: metal atoms in a sea of delocalised electrons."],
      ["Structures and properties", "- Giant ionic: high melting points, conduct when molten or dissolved.", "- Simple molecular: low melting points, don't conduct.", "- Giant covalent (diamond, graphite, silicon dioxide): very high melting points; graphite conducts (delocalised electrons between layers).", "- Metallic: conduct, malleable, high melting points (mostly)."],
      ["Shapes of molecules (A level)", "- Electron pairs repel to get as far apart as possible (VSEPR).", "- CH₄ tetrahedral 109.5°; NH₃ pyramidal 107°; H₂O bent 104.5°: lone pairs repel more than bonding pairs.", "- Intermolecular forces: London forces < dipole–dipole < hydrogen bonds."],
    ] },
  dna: { title: "DNA and genetics", lead: "DNA is the molecule of inheritance: it carries the instructions for making proteins, passed from parents to children.",
    sections: [
      ["Structure", "- Double helix of two strands; sugar-phosphate backbones; bases joined by hydrogen bonds.", "- A–T, C–G complementary pairing.", "- Genome: all the DNA of an organism. Human Genome Project completed 2003."],
      ["From DNA to protein", "- Transcription: DNA → mRNA in the nucleus.", "- Translation: ribosomes read mRNA triplets; tRNA brings amino acids; a protein chain forms.", "- The protein's shape decides its job (enzyme, hormone, structural)."],
      ["Inheritance", "- Alleles: different versions of a gene. Dominant (shown with one copy) and recessive (needs two).", "- Genotype (the alleles) vs phenotype (the characteristic).", "- Punnett squares predict offspring ratios: Aa × Aa gives 3 : 1 dominant : recessive.", "> Cystic fibrosis is caused by a recessive allele; polydactyly by a dominant one."],
    ] },
};

export default {
  title: "Atoms and DNA in 3D", kicker: "3D science",
  intro: { title: "Explore the building blocks", text: "A carbon atom with its nucleus and shells, the three types of chemical bonding, and a turning DNA double helix. Click anything for the key facts for your exams, make flashcards, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Exam tip",
  quiz: "find it",
  motion: "Electrons and DNA moving",
  camera: { pos: [0.3, 1.0, 3.1], target: [0, 0.35, 0], min: 0.05, max: 5 },
  views: { All: [[0.3, 1.0, 3.1], [0, 0.35, 0]], Atom: [[-0.75, 0.5, 0.9], [-0.75, 0.4, 0]], Bonding: [[0.1, 0.5, 1.0], [0.05, 0.3, 0]], DNA: [[0.85, 0.5, 0.95], [0.8, 0.4, 0]] },
  platform: { r: 1.15, y: -0.005 },
  labelMax: 3,
  explode: false,
  bg: ["#16244a", "#050812"],
  build(k) {
    const { THREE, V, mat, glow, limb, tube, text, add, decor } = k;
    const ball = (r, c) => new THREE.Mesh(new THREE.SphereGeometry(r, 32, 24), mat(c, { detail: "none", roughness: 0.2, clearcoat: 1, emissive: new THREE.Color(c).multiplyScalar(0.12) }));
    const lab = (str, p, grp) => { const l = text(str, { size: 0.035, bg: "rgba(0,0,0,0.55)" }); l.position.copy(p); decor(l, grp); };
    // carbon atom: a nucleus of 6 protons and 6 neutrons, electrons on two shells
    const A = V(-0.75, 0.4, 0);
    const nuc = new THREE.Group(); nuc.position.copy(A);
    for (let i = 0; i < 12; i++) { const v = V(Math.sin(i * 2.4) * Math.cos(i * 1.3), Math.cos(i * 2.4), Math.sin(i * 2.4) * Math.sin(i * 1.3)).multiplyScalar(0.03); const p = ball(0.024, i % 2 ? "#ff5a4d" : "#9fb4c8"); p.position.copy(v); nuc.add(p); }
    add("nucleus", nuc);
    const shells = new THREE.Group(); shells.position.copy(A); const electrons = [];
    for (const [r, n, tilt] of [[0.14, 2, 0.3], [0.26, 4, -0.5]]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.003, 8, 128), glow("#5ef0ff", 0.6)); ring.rotation.x = Math.PI / 2 + tilt; shells.add(ring);
      for (let i = 0; i < n; i++) { const e = ball(0.016, "#5ef0ff"); e.userData = { r, a: (i / n) * Math.PI * 2, tilt, speed: 1.6 / r }; shells.add(e); electrons.push(e); }
    }
    add("shells", shells);
    lab("Carbon atom: 6p, 6n, 6e⁻ (2, 4)", A.clone().add(V(0, 0.36, 0)), "atom");
    // water and methane (covalent)
    const cov = new THREE.Group(); cov.position.set(-0.05, 0.55, 0.1);
    const water = new THREE.Group(); water.add(ball(0.05, "#ff4d4d")); for (const sd of [-1, 1]) { const h = ball(0.032, "#f2f4f8"); const d = V(sd * Math.sin(0.91), -Math.cos(0.91), 0).multiplyScalar(0.085); h.position.copy(d); water.add(h); water.add(limb(V(0, 0, 0), d, 0.008, mat("#d0d8e0", { detail: "none" }), false)); }
    water.position.set(-0.13, 0, 0); cov.add(water);
    const methane = new THREE.Group(); methane.add(ball(0.05, "#3a3f4a")); for (const d of [V(1, 1, 1), V(-1, -1, 1), V(-1, 1, -1), V(1, -1, -1)]) { const p = d.normalize().multiplyScalar(0.09); const h = ball(0.03, "#f2f4f8"); h.position.copy(p); methane.add(h); methane.add(limb(V(0, 0, 0), p, 0.008, mat("#d0d8e0", { detail: "none" }), false)); }
    methane.position.set(0.15, 0, 0); cov.add(methane);
    add("covalent", cov);
    lab("H₂O and CH₄: covalent", V(0, 0.75, 0.1), "bonding");
    // sodium chloride lattice (ionic)
    const ion = new THREE.Group(); ion.position.set(-0.05, 0.12, 0.05);
    for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) for (let z = 0; z < 3; z++) { const na = (x + y + z) % 2 === 0, b = ball(na ? 0.022 : 0.034, na ? "#a07bff" : "#6bffb8"); b.position.set((x - 1) * 0.075, (y - 1) * 0.075, (z - 1) * 0.075); ion.add(b); }
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (const ax of [0, 1, 2]) { const a = [(i - 1) * 0.075, (j - 1) * 0.075]; const p1 = ax === 0 ? V(-0.075, a[0], a[1]) : ax === 1 ? V(a[0], -0.075, a[1]) : V(a[0], a[1], -0.075); const p2 = p1.clone(); p2.setComponent(ax, 0.075); ion.add(limb(p1, p2, 0.002, glow("#ffffff", 0.3), false)); }
    add("ionic", ion);
    lab("NaCl: ionic lattice", V(-0.05, 0.3, 0.05), "bonding");
    // metallic: ions in a sea of electrons
    const met = new THREE.Group(); met.position.set(0.3, 0.1, -0.35);
    for (let x = 0; x < 4; x++) for (let z = 0; z < 3; z++) { const b = ball(0.03, "#c0c8d8"); b.material.metalness = 0.9; b.position.set(x * 0.07 - 0.1, 0, z * 0.07 - 0.07); met.add(b); }
    add("metallic", met);
    const seaPaths = []; for (let i = 0; i < 4; i++) seaPaths.push([V(0.15, 0.13 + i * 0.01, -0.45 + i * 0.05), V(0.3, 0.16, -0.35), V(0.45, 0.12, -0.3 + i * 0.02)]);
    k.flow(seaPaths, "#7ee0ff", 40, 0.4, "bonding", 0.012);
    lab("Metallic: sea of electrons", V(0.3, 0.25, -0.35), "bonding");
    // DNA double helix
    const D = V(0.8, 0, 0), turns = 2.5, Hh = 0.8, R = 0.09, n = 60;
    const s1 = [], s2 = [];
    for (let i = 0; i <= 200; i++) { const t = i / 200, a = t * turns * Math.PI * 2; s1.push(V(D.x + Math.cos(a) * R, 0.05 + t * Hh, Math.sin(a) * R)); s2.push(V(D.x + Math.cos(a + Math.PI) * R, 0.05 + t * Hh, Math.sin(a + Math.PI) * R)); }
    const helix = new THREE.Group();
    const bb = new THREE.Group(); bb.add(tube(s1, 0.011, mat("#5ef0ff", { detail: "none", clearcoat: 1, emissive: new THREE.Color("#0a3040") }), 300)); bb.add(tube(s2, 0.011, mat("#f055dd", { detail: "none", clearcoat: 1, emissive: new THREE.Color("#3a0a30") }), 300));
    const pairs = new THREE.Group(), cols = { A: "#ff5a4d", T: "#ffe066", C: "#6bffb8", G: "#7e9bff" };
    for (let i = 0; i < n; i++) { const t = (i + 0.5) / n, a = t * turns * Math.PI * 2, y = 0.05 + t * Hh, p1 = V(D.x + Math.cos(a) * R, y, Math.sin(a) * R), p2 = V(D.x + Math.cos(a + Math.PI) * R, y, Math.sin(a + Math.PI) * R), mid = p1.clone().lerp(p2, 0.5); const pair = ["AT", "TA", "CG", "GC"][(i * 7) % 4]; pairs.add(limb(p1, mid, 0.0055, mat(cols[pair[0]], { detail: "none", clearcoat: 1 }), false)); pairs.add(limb(mid, p2, 0.0055, mat(cols[pair[1]], { detail: "none", clearcoat: 1 }), false)); }
    helix.add(bb); helix.add(pairs);
    const pivot = new THREE.Group(); pivot.position.set(D.x, 0, 0); decor(pivot, "dna");
    for (const [id, g] of [["backbone", bb], ["bases", pairs]]) { g.position.x = -D.x; pivot.add(g); add(id, g); }
    const outline = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.6, R * 1.6, Hh + 0.08, 48, 1, true), glow("#6bffb8", 0.05)); outline.position.set(0, 0.05 + Hh / 2, 0); pivot.add(outline); add("helix", outline);
    lab("DNA: A–T, C–G", V(0.8, Hh + 0.16, 0), "dna");
    const tmp = new THREE.Vector3();
    k.tick((t, dt, motion) => {
      if (!motion) return;
      electrons.forEach((e) => { const { r, a, tilt, speed } = e.userData, an = a + t * speed; tmp.set(Math.cos(an) * r, 0, Math.sin(an) * r); tmp.applyAxisAngle(V(1, 0, 0), tilt); e.position.copy(tmp); });
      pivot.rotation.y = t * 0.4; water.rotation.y = t * 0.5; methane.rotation.set(t * 0.3, t * 0.5, 0); ion.rotation.y = t * 0.2;
    });
    electrons.forEach((e) => { const { r, a, tilt } = e.userData; e.position.set(Math.cos(a) * r, 0, Math.sin(a) * r).applyAxisAngle(V(1, 0, 0), tilt); });
  },
};
