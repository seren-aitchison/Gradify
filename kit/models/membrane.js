// PharmaGradify's 3D model: a patch of cell membrane with the four receptor superfamilies, a
// transporter, a pump and an enzyme in it, and drug molecules arriving to bind. Ions flow through
// the open channel and the pump. Notes cover receptors, drug–receptor theory, enzymes and ADME.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  receptors: { name: "Receptors", c: "#5ef0ff" },
  transport: { name: "Channels & transporters", c: "#6bffb8" },
  enzymes: { name: "Enzymes", c: "#ffb36b" },
  drugs: { name: "Drugs & membrane", c: "#f055dd" },
};

const STRUCTURES = {
  gpcr: s("receptors", "G protein-coupled receptor", "Seven transmembrane helices. Agonist binding changes shape, activating a heterotrimeric G protein (α, β, γ) inside the cell. Seconds.",
    ["**Gs** → adenylyl cyclase → ↑cAMP (β-adrenoceptors). **Gi** → ↓cAMP (μ-opioid, α2). **Gq** → phospholipase C → IP3 and DAG → ↑Ca²⁺ (α1, M3, H1).", "About a third of all marketed drugs act on GPCRs.", "Prolonged agonism causes desensitisation: phosphorylation by GRKs, β-arrestin binding, internalisation."],
    [["Which G protein do β1 and β2 adrenoceptors couple to?", "Gs (raises cAMP)."], ["What second messengers does Gq produce?", "IP3 and DAG (via phospholipase C), raising intracellular calcium."], ["How do GPCRs desensitise?", "GRK phosphorylation, β-arrestin binding and internalisation."]],
    ["gpcr", "g protein", "adrenoceptor", "muscarinic", "opioid receptor", "camp", "beta blocker", "second messenger"]),
  gProtein: s("receptors", "G protein (α, β, γ)", "The heterotrimer under the receptor. Activation swaps GDP for GTP on α, which separates from βγ; both then signal until α hydrolyses its GTP.",
    ["**Cholera toxin** locks Gs on (ADP-ribosylation) → ↑cAMP → secretory diarrhoea.", "**Pertussis toxin** stops Gi from being activated.", "The α subunit's intrinsic GTPase is the 'off switch'."],
    [["How does cholera toxin cause diarrhoea?", "It ADP-ribosylates Gsα, keeping it active, so cAMP rises and gut cells secrete chloride and water."], ["What turns off a G protein?", "The α subunit hydrolyses its bound GTP to GDP."], ["Which G protein does pertussis toxin block?", "Gi (and Go)."]],
    ["g protein", "gtp", "cholera", "pertussis"]),
  ionChannel: s("receptors", "Ligand-gated ion channel", "Five subunits around a central pore. Agonist binding opens the pore in milliseconds, letting ions through: the fastest receptor type.",
    ["Nicotinic ACh receptor (Na⁺/K⁺, muscle and ganglia); **GABA-A** (Cl⁻, enhanced by benzodiazepines and barbiturates); 5-HT3 (ondansetron blocks it).", "Benzodiazepines increase the **frequency** of GABA-A opening; barbiturates the **duration**.", "Neuromuscular blockers: rocuronium (non-depolarising, competitive); suxamethonium (depolarising)."],
    [["How do benzodiazepines act?", "Positive allosteric modulators of GABA-A: they increase the frequency of chloride channel opening."], ["What receptor does ondansetron block?", "The 5-HT3 receptor, a ligand-gated ion channel."], ["What kind of drug is suxamethonium?", "A depolarising neuromuscular blocker (nicotinic agonist that causes persistent depolarisation)."]],
    ["ion channel", "gaba", "nicotinic", "benzodiazepine", "5-ht3", "neuromuscular", "ligand-gated"]),
  rtk: s("receptors", "Kinase-linked receptor", "Single transmembrane helices that dimerise when the ligand binds, activating intracellular tyrosine kinase domains. Minutes to hours.",
    ["Examples: **insulin receptor**, EGFR, VEGFR; cytokine receptors use the associated JAK kinases.", "Kinase inhibitors ('-tinibs'): imatinib (BCR-ABL in CML), erlotinib (EGFR); 'JAK-inibs' (tofacitinib) in rheumatoid arthritis.", "Monoclonal antibodies ('-mabs') can block the ligand or receptor (trastuzumab: HER2)."],
    [["What type of receptor is the insulin receptor?", "A receptor tyrosine kinase."], ["What does imatinib target?", "The BCR-ABL tyrosine kinase (chronic myeloid leukaemia)."], ["What happens when a receptor tyrosine kinase binds its ligand?", "It dimerises and autophosphorylates its tyrosines, recruiting signalling proteins."]],
    ["tyrosine kinase", "insulin receptor", "egfr", "jak", "kinase inhibitor", "imatinib", "monoclonal"]),
  nuclear: s("receptors", "Nuclear receptor", "Inside the cell: lipid-soluble ligands cross the membrane and bind receptors that act as transcription factors. Hours to days.",
    ["Ligands include **steroids** (glucocorticoids, oestrogen), thyroid hormone, vitamin D and retinoids.", "Glucocorticoid side effects follow from gene effects: hyperglycaemia, osteoporosis, immunosuppression, Cushingoid features.", "Tamoxifen is a selective oestrogen receptor modulator (antagonist in breast, partial agonist in endometrium and bone)."],
    [["Why do steroid hormones act slowly?", "They act through nuclear receptors that change gene transcription and protein synthesis."], ["Name three ligands of nuclear receptors.", "Steroids (e.g. cortisol, oestrogen), thyroid hormone, vitamin D (also retinoids)."], ["How does tamoxifen act in breast tissue?", "As an oestrogen receptor antagonist."]],
    ["nuclear receptor", "steroid", "glucocorticoid", "oestrogen", "tamoxifen", "thyroid hormone"]),
  transporter: s("transport", "Transporter", "Carrier proteins that move substances across the membrane, often against a gradient using another ion's gradient.",
    ["SSRIs block **SERT** (serotonin reuptake); cocaine blocks DAT, NET and SERT.", "SGLT2 inhibitors (dapagliflozin) block glucose reabsorption in the proximal tubule.", "Loop diuretics block **NKCC2** (thick ascending limb); thiazides block NCC (distal tubule)."],
    [["What do SSRIs inhibit?", "The serotonin transporter (SERT), blocking reuptake."], ["Which transporter do loop diuretics block?", "NKCC2 (Na⁺/K⁺/2Cl⁻ cotransporter) in the thick ascending limb."], ["Where do SGLT2 inhibitors act?", "The proximal convoluted tubule, blocking glucose reabsorption."]],
    ["transporter", "ssri", "reuptake", "sglt2", "diuretic", "p-glycoprotein"]),
  pump: s("transport", "Na⁺/K⁺-ATPase", "A primary active pump: 3 Na⁺ out and 2 K⁺ in for each ATP, keeping the membrane potential and driving secondary transport.",
    ["**Digoxin** inhibits it: intracellular Na⁺ rises, so the Na⁺/Ca²⁺ exchanger removes less Ca²⁺, increasing contractility.", "Digoxin toxicity is worse with **hypokalaemia** (K⁺ competes with digoxin at the pump).", "Proton pump inhibitors (omeprazole) block the gastric H⁺/K⁺-ATPase."],
    [["How does digoxin increase cardiac contractility?", "It inhibits Na⁺/K⁺-ATPase, raising intracellular Na⁺, which reduces Ca²⁺ removal by the Na⁺/Ca²⁺ exchanger."], ["Which electrolyte disturbance worsens digoxin toxicity?", "Hypokalaemia."], ["What is the stoichiometry of the Na⁺/K⁺ pump?", "3 Na⁺ out, 2 K⁺ in per ATP."]],
    ["atpase", "digoxin", "sodium pump", "proton pump", "ppi"]),
  enzyme: s("enzymes", "Enzyme", "Many drugs inhibit enzymes: reversibly (competitive, non-competitive) or irreversibly.",
    ["**Aspirin** irreversibly acetylates COX-1 and COX-2; platelets can't make new COX, so the effect lasts their lifetime (7–10 days).", "Competitive inhibitors raise apparent Km; non-competitive lower Vmax.", "ACE inhibitors, statins (HMG-CoA reductase), allopurinol (xanthine oxidase), MAOIs and acetylcholinesterase inhibitors are all enzyme inhibitors."],
    [["Why does aspirin's antiplatelet effect last 7–10 days?", "It irreversibly inhibits COX-1, and platelets have no nucleus to make more."], ["How does a competitive inhibitor change enzyme kinetics?", "It increases the apparent Km; Vmax is unchanged."], ["Which enzyme do statins inhibit?", "HMG-CoA reductase."]],
    ["enzyme", "inhibitor", "cox", "aspirin", "nsaid", "statin", "ace inhibitor", "kinetics"]),
  cyp: s("enzymes", "Cytochrome P450", "Liver enzymes (in the smooth ER) that oxidise drugs in phase I metabolism. CYP3A4 handles about half of all drugs.",
    ["**Inducers** (rifampicin, carbamazepine, phenytoin, St John's wort) speed metabolism, so other drugs fail (e.g. the pill, warfarin).", "**Inhibitors** (clarithromycin, fluconazole, grapefruit juice, ritonavir) slow it, raising levels and toxicity.", "Polymorphisms: CYP2D6 poor metabolisers get little effect from codeine; ultra-rapid ones risk morphine toxicity."],
    [["Name three CYP450 inducers.", "Rifampicin, carbamazepine, phenytoin (also St John's wort, chronic alcohol)."], ["What happens to warfarin if clarithromycin is started?", "Its metabolism is inhibited, INR rises and bleeding risk increases."], ["Why is codeine risky in CYP2D6 ultra-rapid metabolisers?", "They convert it to morphine quickly, risking morphine toxicity."]],
    ["cyp", "cytochrome", "p450", "metabolism", "inducer", "interaction"]),
  agonist: s("drugs", "Agonist", "A drug that binds a receptor and activates it. Its effect depends on **affinity** (how well it binds) and **efficacy** (how well it activates).",
    ["Full agonists reach maximal response; **partial agonists** (buprenorphine, varenicline) have lower efficacy and can antagonise full agonists.", "Potency is set by EC50: the concentration for half-maximal effect.", "Inverse agonists reduce constitutive receptor activity."],
    [["What is the difference between affinity and efficacy?", "Affinity is how strongly a drug binds; efficacy is its ability to activate the receptor once bound."], ["Why can buprenorphine precipitate withdrawal in someone on heroin?", "As a high-affinity partial agonist it displaces the full agonist but activates the receptor less."], ["What does EC50 measure?", "Potency: the concentration giving 50% of the maximal response."]],
    ["agonist", "affinity", "efficacy", "potency", "ec50", "dose-response", "partial agonist"]),
  antagonist: s("drugs", "Antagonist", "A drug that binds without activating, blocking the agonist. It has affinity but no efficacy.",
    ["**Competitive** antagonists shift the dose–response curve to the right (surmountable): e.g. naloxone, atenolol.", "**Irreversible/non-competitive** antagonists reduce the maximum response: e.g. phenoxybenzamine.", "Naloxone has a shorter half-life than most opioids, so re-sedation can occur: watch and redose."],
    [["How does a competitive antagonist change the dose–response curve?", "Parallel shift to the right; maximum unchanged."], ["Why must patients be observed after naloxone?", "Its effect wears off before many opioids', so respiratory depression can return."], ["Give an example of an irreversible antagonist.", "Phenoxybenzamine (α-adrenoceptors)."]],
    ["antagonist", "blocker", "naloxone", "competitive", "dose-response"]),
  bilayer: s("drugs", "Lipid bilayer", "Phospholipids with hydrophilic heads outward and hydrophobic tails inward. Small lipid-soluble, un-ionised drugs cross by passive diffusion.",
    ["Weak acids are un-ionised in acid, weak bases in alkali (**Henderson–Hasselbalch**), so aspirin is absorbed from the stomach and urine alkalinisation traps salicylate.", "Ion trapping: weak bases concentrate in acidic compartments (breast milk, stomach).", "Lipid-soluble drugs cross the blood–brain barrier; quaternary amines (glycopyrronium) don't."],
    [["How does alkalinising the urine help in aspirin overdose?", "Salicylate (a weak acid) becomes ionised in alkaline urine, so it's trapped and excreted (ion trapping)."], ["What drug properties favour passive diffusion across membranes?", "Small size, lipid solubility and being un-ionised."], ["Why doesn't glycopyrronium cause central effects?", "As a quaternary amine it's permanently charged and can't cross the blood–brain barrier."]],
    ["membrane", "lipid", "absorption", "ionis", "henderson", "blood-brain barrier", "diffusion", "pharmacokinetic"]),
};

const NOTES = {
  receptors: { title: "Receptors and signalling", lead: "Four receptor superfamilies, ranked by speed: ligand-gated ion channels (milliseconds), G protein-coupled receptors (seconds), kinase-linked receptors (minutes to hours) and nuclear receptors (hours to days).",
    sections: [
      ["Ligand-gated ion channels", "Pentamers (nicotinic, GABA-A, glycine, 5-HT3) or tetramers (glutamate: NMDA, AMPA) around a pore.", "- NMDA receptors need glutamate plus glycine, and depolarisation to expel Mg²⁺: ketamine and memantine block them.", "- GABA-A: Cl⁻ influx hyperpolarises; benzodiazepines, Z-drugs, barbiturates, propofol and alcohol all enhance it.", "! Benzodiazepine overdose: supportive care; flumazenil only in specific cases because it can precipitate seizures."],
      ["G protein-coupled receptors", "- Gs: β1, β2, D1, H2, V2 → ↑cAMP → PKA.", "- Gi: α2, M2, D2, μ/κ/δ opioid, GABA-B → ↓cAMP, open K⁺ channels.", "- Gq: α1, M1, M3, H1, V1, AT1 → PLC → IP3 (Ca²⁺) + DAG (PKC).", "> Mnemonic for Gq: 'HAVe 1 M&M' (H1, α1, V1, M1, M3)."],
      ["Kinase-linked receptors", "- Receptor tyrosine kinases: insulin, IGF-1, EGF, VEGF, PDGF.", "- Cytokine receptors: no intrinsic kinase; use JAK–STAT (interferons, interleukins, erythropoietin, growth hormone).", "- Receptor serine/threonine kinases: TGF-β.", "> Targeted cancer therapy blocks these: small-molecule '-tinibs' inside the cell, monoclonal '-mabs' outside."],
      ["Nuclear receptors", "Ligand + receptor → binds hormone response elements on DNA → changes transcription.", "- Class I (steroid receptors) sit in the cytoplasm with heat-shock proteins, then move to the nucleus.", "- Class II (thyroid, vitamin D, retinoid, PPAR) are already in the nucleus.", "- PPARγ agonists (pioglitazone) increase insulin sensitivity; PPARα (fibrates) lower triglycerides."],
    ] },
  transport: { title: "Channels, transporters and pumps", lead: "Membrane proteins that move ions and molecules are some of the most important drug targets: diuretics, antidepressants, antiarrhythmics, local anaesthetics and PPIs all act here.",
    sections: [
      ["Voltage-gated ion channels", "- Na⁺ channels: local anaesthetics, class I antiarrhythmics, carbamazepine, phenytoin, lamotrigine.", "- Ca²⁺ channels (L-type): dihydropyridines (amlodipine, vascular) and rate-limiting verapamil and diltiazem (heart).", "- K⁺ channels: class III antiarrhythmics (amiodarone, sotalol) prolong repolarisation; sulfonylureas close K-ATP channels in β cells to release insulin.", "! Never combine verapamil with a beta-blocker IV: risk of asystole and severe bradycardia."],
      ["Transporters", "- Monoamine reuptake: SSRIs (SERT), SNRIs, tricyclics; cocaine and amphetamines.", "- Renal: loop (NKCC2), thiazide (NCC), potassium-sparing (ENaC: amiloride; aldosterone receptor: spironolactone), SGLT2 inhibitors.", "- Efflux pumps: P-glycoprotein pumps drugs out of gut cells and the brain; inhibitors (verapamil, clarithromycin) raise digoxin levels."],
      ["ATPase pumps", "- Na⁺/K⁺-ATPase: digoxin. Narrow therapeutic index; toxicity causes nausea, yellow vision, bradycardia and arrhythmias.", "- H⁺/K⁺-ATPase: PPIs, irreversible, need acid activation (take before food).", "> Hyperkalaemia treatment uses pumps: insulin and salbutamol stimulate Na⁺/K⁺-ATPase to shift K⁺ into cells."],
    ] },
  enzymes: { title: "Enzymes as drug targets and drug metabolisers", lead: "Drugs inhibit enzymes to block a pathway, and enzymes metabolise drugs. Both explain a large share of pharmacology and of drug interactions.",
    sections: [
      ["Enzyme inhibition", "- Competitive, reversible: raises Km (e.g. methotrexate on dihydrofolate reductase).", "- Non-competitive: lowers Vmax.", "- Irreversible: aspirin (COX), PPIs, organophosphates (acetylcholinesterase), MAO-B inhibitors such as selegiline.", "! Organophosphate poisoning (SLUDGE + bradycardia, miosis): atropine for muscarinic effects, pralidoxime early."],
      ["Drug metabolism", "- **Phase I** (functionalisation): oxidation (CYP450), reduction, hydrolysis.", "- **Phase II** (conjugation): glucuronidation, sulfation, acetylation, glutathione: more water-soluble.", "- Slow acetylators are more prone to isoniazid neuropathy and hydralazine-induced lupus.", "> Paracetamol overdose: phase II pathways saturate, more goes via CYP2E1 to NAPQI, which depletes glutathione. Acetylcysteine restores it."],
      ["Interactions", "- Enzyme inducers take days to weeks to work (new enzyme synthesis); inhibitors act within days.", "- Narrow therapeutic index drugs to watch: warfarin, digoxin, lithium, theophylline, phenytoin, ciclosporin.", "- Mnemonics: inducers 'CRAP GPS' (carbamazepine, rifampicin, alcohol (chronic), phenytoin, griseofulvin, phenobarbital, sulfonylureas)."],
    ] },
  drugs: { title: "How drugs act and move", lead: "Pharmacodynamics is what the drug does to the body (binding, activation, response); pharmacokinetics is what the body does to the drug (absorption, distribution, metabolism, excretion).",
    sections: [
      ["Dose–response", "- Graded dose–response curves are sigmoid on a log scale: EC50 (potency) and Emax (efficacy).", "- Quantal curves give ED50 and TD50; therapeutic index = TD50/ED50.", "- Spare receptors: a full response can occur with only a fraction of receptors occupied."],
      ["Absorption and bioavailability", "- Oral bioavailability is reduced by poor absorption and first-pass metabolism (gut wall and liver).", "- Drugs with high first pass: GTN, morphine, propranolol, lidocaine. GTN is given sublingually to avoid it.", "- Zero-order (saturable) kinetics: phenytoin, alcohol, high-dose aspirin: small dose increases cause big level rises."],
      ["Distribution", "- Volume of distribution Vd = dose / plasma concentration. High Vd (amiodarone, digoxin) means tissue binding; low Vd (warfarin, highly protein-bound).", "- Loading dose = target concentration × Vd."],
      ["Elimination", "- Clearance = rate of elimination / plasma concentration.", "- Half-life t½ = 0.693 × Vd / CL. Steady state takes about 4–5 half-lives; so does elimination.", "- Renal excretion: glomerular filtration, tubular secretion, reabsorption (pH-dependent).", "! Reduce doses of renally cleared drugs in CKD (gentamicin, vancomycin, lithium, DOACs, metformin) and monitor levels where possible."],
    ] },
};

export default {
  title: "Drug targets in 3D", kicker: "3D pharmacology",
  intro: { title: "Explore a cell membrane", text: "The four receptor superfamilies, a transporter, a pump and the enzymes that drugs target, in a patch of membrane. Drug molecules arrive and bind; ions flow through the open channel. Click anything to learn it, and read the full notes for each section below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES, calloutName: "Clinical",
  quiz: "find the target",
  motion: "Ions and drug molecules moving",
  camera: { pos: [0.35, 0.55, 1.35], target: [0, 0.02, 0], min: 0.03, max: 3.5 },
  views: { Outside: [[0.2, 0.9, 0.9], [0, 0.05, 0]], Side: [[1.3, 0.05, 0.2], [0, 0, 0]], Inside: [[0.2, -0.85, 0.9], [0, -0.05, 0]], GPCR: [[-0.2, 0.1, 0.45], [-0.32, 0, 0.0]], Channel: [[0.15, 0.1, 0.4], [0.05, 0, -0.05]] },
  platform: false,
  explode: false,
  bg: ["#1c2a4a", "#081020"],
  build(k) {
    const { THREE, V, mat, glow, limb, tube, blob, box, add, decor } = k;
    // the bilayer: instanced heads and tails, with gaps where proteins sit
    const holes = [[-0.32, 0.0, 0.085], [0.05, -0.05, 0.08], [0.33, 0.12, 0.07], [-0.05, 0.3, 0.075], [0.3, -0.28, 0.08]];
    const lipids = [];
    for (let x = -0.6; x <= 0.6; x += 0.026) for (let z = -0.6; z <= 0.6; z += 0.026) {
      const jx = x + Math.sin(z * 90) * 0.004, jz = z + Math.cos(x * 80) * 0.004;
      if (Math.hypot(jx, jz) > 0.6 || holes.some(([hx, hz, r]) => Math.hypot(jx - hx, jz - hz) < r)) continue;
      lipids.push([jx, jz]);
    }
    const headMat = mat("#f2a0d8", { detail: "none", roughness: 0.35, clearcoat: 0.8 }), tailMat = mat("#ffe7a8", { detail: "none", roughness: 0.6 });
    const heads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.011, 12, 10), headMat, lipids.length * 2);
    const tails = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.0022, 0.0022, 0.03, 6), tailMat, lipids.length * 4);
    const m4 = new THREE.Matrix4();
    lipids.forEach(([x, z], i) => {
      for (const [side, y] of [[0, 0.042], [1, -0.042]]) {
        heads.setMatrixAt(i * 2 + side, m4.makeTranslation(x, y, z));
        for (const t of [-1, 1]) tails.setMatrixAt(i * 4 + side * 2 + (t + 1) / 2, m4.makeTranslation(x + t * 0.004, y + (side ? 0.019 : -0.019), z));
      }
    });
    add("bilayer", heads); add("bilayer", tails);
    // GPCR: seven helices in a ring, and the G protein underneath
    const helix = mat("#5ef0ff", { detail: "none", roughness: 0.3, clearcoat: 1, emissive: new THREE.Color("#0a3040") });
    const gp = new THREE.Group(); gp.position.set(-0.32, 0, 0.0);
    for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2, h = limb(V(Math.cos(a) * 0.04, -0.07, Math.sin(a) * 0.04), V(Math.cos(a + 0.4) * 0.04, 0.07, Math.sin(a + 0.4) * 0.04), 0.012, helix); gp.add(h); }
    gp.add(tube([V(0.04, 0.07, 0), V(0.0, 0.1, 0.03), V(-0.04, 0.075, 0.0)], 0.006, helix, 16));
    add("gpcr", gp);
    const gProt = new THREE.Group(); gProt.position.set(-0.32, -0.13, 0.0);
    for (const [x, z, r, c] of [[0.0, 0.0, 0.03, "#7ee0ff"], [0.045, 0.02, 0.025, "#a0b8ff"], [0.035, -0.035, 0.016, "#c79bff"]]) { const g = new THREE.Mesh(blob(r, 1, 0.85, 1, (v) => v.multiplyScalar(1 + Math.sin(v.x * 300) * Math.sin(v.y * 280) * 0.05)), mat(c, { detail: "none", roughness: 0.35, clearcoat: 1 })); g.position.set(x, 0, z); gProt.add(g); }
    add("gProtein", gProt);
    // ligand-gated ion channel: five subunits round a pore
    const ch = new THREE.Group(); ch.position.set(0.05, 0, -0.05);
    for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2, u = new THREE.Mesh(blob(0.024, 1, 4.2, 1, (v) => { if (v.y > 0.05) v.multiplyScalar(1.2); }), mat("#4fe0a6", { detail: "none", roughness: 0.3, clearcoat: 1 })); u.position.set(Math.cos(a) * 0.04, 0.02, Math.sin(a) * 0.04); ch.add(u); }
    add("ionChannel", ch);
    // kinase-linked receptor: a dimer with kinase domains inside
    const rt = new THREE.Group(); rt.position.set(0.33, 0, 0.12);
    for (const sd of [-1, 1]) {
      const m = mat("#ffd36b", { detail: "none", roughness: 0.3, clearcoat: 1 });
      rt.add(limb(V(sd * 0.022, -0.06, 0), V(sd * 0.022, 0.06, 0), 0.008, m));
      const out = new THREE.Mesh(blob(0.03, 0.9, 1.3, 0.9), m); out.position.set(sd * 0.03, 0.11, 0); rt.add(out);
      const kin = new THREE.Mesh(blob(0.028, 1, 1, 0.9), mat("#ff9f40", { detail: "none", roughness: 0.3, clearcoat: 1 })); kin.position.set(sd * 0.03, -0.1, 0); rt.add(kin);
    }
    add("rtk", rt);
    // nuclear receptor: below the membrane, on a patch of DNA
    const nr = new THREE.Group(); nr.position.set(-0.05, -0.32, 0.25);
    const dna = []; for (let i = 0; i <= 40; i++) { const t = i / 40; dna.push(V(-0.12 + t * 0.24, Math.sin(t * 18) * 0.015, Math.cos(t * 18) * 0.015)); }
    nr.add(tube(dna, 0.004, mat("#7ee0ff", { detail: "none" }), 120)); nr.add(tube(dna.map((p) => V(p.x, -p.y, -p.z)), 0.004, mat("#f055dd", { detail: "none" }), 120));
    for (const sd of [-1, 1]) { const u = new THREE.Mesh(blob(0.03, 1, 0.9, 0.9), mat("#c79bff", { detail: "none", roughness: 0.3, clearcoat: 1 })); u.position.set(sd * 0.03, 0.035, 0); nr.add(u); }
    add("nuclear", nr);
    // transporter and pump
    const tr = new THREE.Group(); tr.position.set(-0.05, 0, 0.3);
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; tr.add(limb(V(Math.cos(a) * 0.045, -0.065, Math.sin(a) * 0.045), V(Math.cos(a - 0.3) * 0.04, 0.065, Math.sin(a - 0.3) * 0.04), 0.009, mat("#6bffb8", { detail: "none", roughness: 0.3, clearcoat: 1 }))); }
    add("transporter", tr);
    const pu = new THREE.Group(); pu.position.set(0.3, 0, -0.28);
    const pm = mat("#38d6a0", { detail: "none", roughness: 0.3, clearcoat: 1 });
    pu.add(new THREE.Mesh(blob(0.06, 1, 1.4, 0.9), pm));
    const atp = new THREE.Mesh(blob(0.04, 1, 0.8, 1), mat("#20a87a", { detail: "none", clearcoat: 1 })); atp.position.set(0.02, -0.11, 0); pu.add(atp);
    add("pump", pu);
    // enzymes: a COX-like enzyme on the inner leaflet and CYP450 on a patch of ER
    const enz = new THREE.Mesh(blob(0.045, 1.2, 0.9, 1, (v) => { v.multiplyScalar(1 + Math.sin(v.x * 200) * Math.sin(v.z * 220) * 0.06); if (v.y > 0.02 && Math.abs(v.x) < 0.015) v.y -= 0.02; }), mat("#ffb36b", { detail: "none", roughness: 0.3, clearcoat: 1 }));
    enz.position.set(-0.32, -0.14, 0.33); add("enzyme", enz);
    const er = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.018, 16, 48, Math.PI), mat("#ffd9b0", { detail: "tissue", repeat: 3 })); er.position.set(0.3, -0.3, 0.25); er.rotation.x = Math.PI / 2; decor(er, "enzymes");
    const cyp = new THREE.Mesh(blob(0.035, 1, 0.9, 1, (v) => v.multiplyScalar(1 + Math.sin(v.y * 250) * 0.05)), mat("#ff7a3d", { detail: "none", roughness: 0.3, clearcoat: 1 }));
    cyp.position.set(0.3, -0.27, 0.16); add("cyp", cyp);
    const heme = new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.003, 8, 24), glow("#ff3030", 0.9)); heme.position.set(0.3, -0.25, 0.19); decor(heme, "enzymes");
    // drug molecules: ball-and-stick, an agonist docking on the GPCR and an antagonist on the RTK
    function molecule(colour) {
      const g = new THREE.Group(), atoms = [[0, 0, 0], [0.018, 0.01, 0], [0.03, -0.006, 0.008], [-0.016, 0.012, -0.006], [0.006, -0.018, -0.01], [0.044, 0.004, 0.016]];
      const a = mat(colour, { detail: "none", roughness: 0.2, clearcoat: 1, emissive: new THREE.Color(colour).multiplyScalar(0.25) });
      atoms.forEach(([x, y, z], i) => { const m = new THREE.Mesh(new THREE.SphereGeometry(i % 2 ? 0.0065 : 0.0085, 16, 16), i === 2 ? mat("#ff4d4d", { detail: "none", clearcoat: 1 }) : a); m.position.set(x, y, z); g.add(m); if (i) g.add(limb(V(...atoms[i > 2 ? 0 : i - 1]), V(x, y, z), 0.0022, mat("#d0d8e0", { detail: "none" }), false)); });
      return g;
    }
    const ag = molecule("#f055dd"), an = molecule("#ff9f40");
    add("agonist", ag); add("antagonist", an);
    const extras = [];
    for (let i = 0; i < 6; i++) { const m = molecule(i % 2 ? "#f055dd" : "#c79bff"); m.position.set(Math.cos(i) * 0.45, 0.25 + (i % 3) * 0.06, Math.sin(i * 1.7) * 0.4); m.scale.setScalar(0.8); decor(m, "drugs"); extras.push(m); }
    // ions: Na⁺ through the channel, Na⁺ out and K⁺ in through the pump
    k.flow([[V(0.05, 0.25, -0.05), V(0.05, 0.05, -0.05), V(0.05, -0.05, -0.05), V(0.06, -0.25, -0.02)]], "#ffe066", 26, 0.35, "transport", 0.012);
    k.flow([[V(0.3, -0.2, -0.28), V(0.3, 0, -0.28), V(0.32, 0.2, -0.25)]], "#ffe066", 12, 0.25, "transport", 0.012);
    k.flow([[V(0.28, 0.2, -0.3), V(0.29, 0, -0.29), V(0.27, -0.2, -0.32)]], "#c79bff", 8, 0.25, "transport", 0.012);
    k.tick((t, dt, motion) => {
      if (!motion) return;
      // the agonist drifts down and docks in the GPCR's pocket, then leaves; the G protein jiggles when it's bound
      const c = (t * 0.18) % 1, dock = c < 0.4 ? c / 0.4 : c < 0.7 ? 1 : 1 - (c - 0.7) / 0.3, e = dock * dock * (3 - 2 * dock);
      ag.position.set(-0.32 + (1 - e) * 0.12, 0.09 + (1 - e) * 0.25, 0.0 + (1 - e) * 0.05); ag.rotation.y = t * (1 - e);
      gProt.position.y = -0.13 - (dock === 1 ? Math.abs(Math.sin(t * 9)) * 0.008 : 0);
      an.position.set(0.33 + Math.sin(t * 0.7) * 0.01, 0.17 + Math.sin(t * 1.3) * 0.006, 0.12); an.rotation.y = t * 0.3;
      extras.forEach((m, i) => { m.position.y = 0.25 + (i % 3) * 0.06 + Math.sin(t * 0.8 + i) * 0.03; m.rotation.set(t * 0.3 + i, t * 0.5, 0); });
    });
    ag.position.set(-0.32, 0.25, 0.05); an.position.set(0.33, 0.17, 0.12);
  },
};
