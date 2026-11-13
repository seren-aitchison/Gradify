// School 3: Biochemistry, Cell Biology and Genetics. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md):
// objectives, key terms, summaries, typed and dated sources, evidence status (EV:) and questions at three levels
// (Foundation, Application, Evaluation) in every lesson. Explanations are original; sources are those used and cited
// for checking, pending review by a veterinary surgeon (qa.js records the review stages). Level: first and second year
// of a UK veterinary degree. Reference values are approximate; worked numbers are illustrative. Education, not
// veterinary advice: nothing here is guidance for a real animal, and no dose is given.
export default `
## The animal cell and its organelles
LV: Preclinical · Foundation
S: Every tissue in the body is built from cells that share the same basic parts. This lesson covers the plasma membrane and transport across it, the organelles and their functions, and the inherited and acquired diseases of animals that follow when one organelle fails.
O: Describe the structure of the plasma membrane and the main ways substances cross it
O: Describe the structure and function of the nucleus, endoplasmic reticulum, Golgi apparatus, mitochondria, lysosomes, peroxisomes and cytoskeleton
O: Relate organelle function to animal diseases such as lysosomal storage diseases and primary ciliary dyskinesia
H: The membrane
P: The **plasma membrane** is a phospholipid bilayer with embedded proteins, cholesterol and, on its outer face, carbohydrate chains (the glycocalyx) that act as recognition markers, including blood group antigens. It is selectively permeable.
- **Simple diffusion**: small, lipid-soluble molecules (O₂, CO₂, many anaesthetic agents) cross directly, down their concentration gradient.
- **Facilitated diffusion**: channels and carriers let ions and polar molecules (glucose via GLUT transporters) cross down their gradient.
- **Active transport**: pumps use ATP to move substances against their gradient (the Na⁺/K⁺-ATPase); **secondary active transport** uses the sodium gradient to move glucose and amino acids into gut and kidney cells.
- **Endocytosis and exocytosis**: bulk transport in vesicles, including phagocytosis of bacteria by neutrophils and secretion of hormones and enzymes.
H: The organelles
- **Nucleus**: holds the DNA as chromatin within a double nuclear envelope; the nucleolus makes ribosomal RNA.
- **Rough endoplasmic reticulum** (RER): studded with ribosomes, makes proteins for secretion and membranes; abundant in plasma cells and pancreatic acinar cells.
- **Smooth endoplasmic reticulum** (SER): makes lipids and steroid hormones and, in hepatocytes, metabolises drugs; it proliferates after repeated exposure to inducing drugs such as phenobarbital.
- **Golgi apparatus**: modifies, sorts and packages proteins into vesicles.
- **Mitochondria**: aerobic respiration and ATP production; they carry their own small genome inherited through the mother.
- **Lysosomes**: membrane-bound sacs of acid hydrolases that break down worn-out organelles and engulfed material.
- **Peroxisomes**: oxidise very long-chain fatty acids and break down hydrogen peroxide.
- **Cytoskeleton**: microfilaments (actin), intermediate filaments and microtubules give shape and movement; **cilia** (microtubule-based) clear mucus from airways.
K: Each organelle has one main job: the nucleus stores the code, the RER and Golgi make and package proteins, the SER makes lipids and metabolises drugs, mitochondria make ATP, lysosomes digest, and cilia move fluid.
H: When an organelle fails
X: A young Border Collie develops progressive blindness, behavioural change and incoordination. Why is a lysosomal storage disease suspected?
> Lysosomal storage diseases are inherited deficiencies of a single lysosomal enzyme or protein.
> Undigested material accumulates inside lysosomes, especially in long-lived cells such as neurones, which slowly fail.
> Neuronal ceroid lipofuscinosis in Border Collies is one such autosomal recessive disease, with a DNA test; others include α-mannosidosis in Angus cattle and fucosidosis in English Springer Spaniels. Signs begin in young animals and progress.
P: **Primary ciliary dyskinesia**, an inherited defect of cilia in several dog breeds, causes recurrent respiratory infection because mucus is not cleared, and can cause infertility (sperm tails share the structure) and situs inversus. Acquired damage matters too: hepatocytes swell and accumulate fat when their energy supply fails (see School 5).
!: Assuming every cell has every organelle in the same amount. Mammalian red cells lose their nucleus and mitochondria, plasma cells are packed with RER, and hepatocytes with SER and mitochondria; structure follows function.
EV: established | Lysosomal storage diseases in domestic animals are caused by inherited deficiencies of specific lysosomal enzymes or proteins, several with DNA tests available.
EV: contested | How mitochondrial dysfunction contributes to common acquired diseases of animals, such as ageing changes and some myopathies, is an area of active research with few firm conclusions.
T: Active transport | Movement of a substance across a membrane against its concentration gradient, using energy
T: Lysosome | A membrane-bound organelle containing acid hydrolases that digest cellular and engulfed material
T: Smooth endoplasmic reticulum | Membranes without ribosomes, where lipids and steroids are made and drugs are metabolised
SUM: The plasma membrane controls traffic by diffusion, facilitated diffusion, active transport and vesicles.
SUM: Organelles divide the cell's work; inherited defects of lysosomes or cilia, and drug induction of the SER, show how organelle function shapes disease and therapy.
SRC: Alberts B. et al., Molecular Biology of the Cell, 7th edn, W. W. Norton | secondary | 2022
SRC: Online Mendelian Inheritance in Animals (OMIA), University of Sydney | data | 2026-11 | https://omia.org/
Q: What is secondary active transport? | Transport of a substance against its gradient driven by the sodium gradient made by the Na⁺/K⁺-ATPase, as in glucose uptake in the gut.
Q: Why do lysosomal storage diseases often affect the nervous system? | Neurones are long-lived and cannot dilute stored material by dividing, so undigested material accumulates and they fail.
M1#veterinary-u03-01-q1@2: Which organelle makes ATP by aerobic respiration? | The mitochondrion | The Golgi apparatus | The lysosome | The rough endoplasmic reticulum | Mitochondria carry out the Krebs cycle and oxidative phosphorylation; the others package, digest and make proteins.
M2#veterinary-u03-01-q2@1: Glucose is absorbed from the gut lumen into enterocytes against its concentration gradient. Which mechanism is used? | Secondary active transport coupled to sodium | Simple diffusion through the lipid bilayer | Phagocytosis | Facilitated diffusion down its gradient | The sodium–glucose cotransporter uses the sodium gradient made by the Na⁺/K⁺-ATPase, which is why oral rehydration solutions contain both sodium and glucose.
TF2#veterinary-u03-01-q3@2: Repeated dosing with phenobarbital can increase the amount of smooth endoplasmic reticulum in hepatocytes. | true | Enzyme induction increases SER and its drug-metabolising enzymes, which can change the metabolism of other drugs.
M3#veterinary-u03-01-q4@3: A Springer Spaniel puppy from a line with a known inherited disease develops progressive neurological signs, and neurones on biopsy contain swollen vacuoles. Which mechanism best explains this? | Deficiency of a lysosomal enzyme, so undigested substrate accumulates in lysosomes | Failure of ribosomes to make proteins in the neurone cytoplasm | Excessive mitochondrial ATP production | Loss of the nuclear envelope | Vacuolated, swollen neurones in a young dog of a predisposed breed suggest a lysosomal storage disease such as fucosidosis.
SA3#veterinary-u03-01-q5@2,3: Explain how primary ciliary dyskinesia can cause both recurrent pneumonia and infertility in a dog. | Cilia are microtubule-based projections whose coordinated beating moves mucus up the airways (the mucociliary escalator). In primary ciliary dyskinesia an inherited defect in ciliary structure (for example the dynein arms) stops normal beating, so mucus and bacteria are not cleared and the dog has recurrent rhinitis, bronchitis and pneumonia. Sperm tails share the same microtubule structure, so sperm are immotile and males are infertile; defective embryonic cilia can also cause situs inversus. | Role of cilia in mucus clearance ; Inherited structural defect ; Recurrent respiratory infection ; Sperm tails share structure, infertility ; Situs inversus or other link

## Proteins and enzymes
LV: Preclinical · Application
S: Proteins do most of the work of the body, and enzymes are the proteins that speed its chemical reactions. This lesson covers protein structure, how enzymes work and are inhibited, Michaelis–Menten kinetics, and the clinical enzymology vets use to detect liver and muscle damage in different species.
O: Describe the levels of protein structure and how denaturation affects function
O: Explain enzyme action, Km and Vmax, and competitive and non-competitive inhibition
O: Apply enzyme biochemistry to clinical enzymology and to antidotes that compete for an enzyme
PRE: The animal cell and its organelles
H: Protein structure
- **Primary**: the sequence of amino acids, set by the gene.
- **Secondary**: local folding into α-helices and β-sheets held by hydrogen bonds.
- **Tertiary**: the overall three-dimensional shape, held by interactions between side chains, including disulfide bridges.
- **Quaternary**: assembly of several subunits, as in haemoglobin's four chains.
P: Shape determines function. Heat, extremes of pH and some chemicals **denature** proteins, unfolding them; this is why very high body temperatures in heatstroke damage tissues, and why fever above a certain point is dangerous.
H: How enzymes work
P: Enzymes lower the **activation energy** of a reaction without being used up. The substrate binds the **active site**; many enzymes need cofactors (metal ions) or coenzymes (often derived from B vitamins). Reaction rate rises with substrate concentration until the enzyme is saturated.
E: v = Vmax [S] / (Km + [S]) :: the Michaelis–Menten equation; Km is the substrate concentration at half-maximal rate, so a low Km means high affinity
- **Competitive inhibitors** resemble the substrate and bind the active site; they raise the apparent Km and can be overcome by more substrate.
- **Non-competitive inhibitors** bind elsewhere and lower Vmax; more substrate does not overcome them.
- **Irreversible inhibitors** bind permanently: organophosphates phosphorylate acetylcholinesterase.
IX: enzyme
X: Why can ethanol or fomepizole be used as antidotes to ethylene glycol (antifreeze) poisoning in dogs and cats?
> Ethylene glycol itself is not very toxic; alcohol dehydrogenase converts it into glycolate and oxalate, which cause acidosis and kidney failure.
> Ethanol and fomepizole compete for alcohol dehydrogenase (fomepizole is a potent competitive inhibitor), so less toxic metabolite is made while the unchanged ethylene glycol is excreted in urine.
> The window is short, because once metabolites form the antidote cannot reverse the damage: suspected antifreeze ingestion is an emergency for a vet.
K: Enzymes lower activation energy at a specific active site; competitive inhibition raises Km and can be overcome by substrate, non-competitive inhibition lowers Vmax and cannot.
H: Clinical enzymology
P: Damaged cells leak enzymes into the blood, and which enzyme rises tells the vet which tissue is injured, but tissue distribution differs between species.
- **ALT** (alanine aminotransferase) is liver-specific in dogs and cats, but large animals have little hepatic ALT, so it is of little use in horses and cattle; **SDH** or **GLDH** are used instead.
- **AST** (aspartate aminotransferase) rises with liver or muscle damage; interpret with **CK** (creatine kinase), which is specific to muscle and rises and falls fast.
- **ALP** (alkaline phosphatase) rises with cholestasis and bone growth; in dogs, corticosteroids induce a specific ALP isoenzyme, so it rises in hyperadrenocorticism and with steroid treatment.
- **GGT** rises with cholestasis and is useful in horses and ruminants; colostrum is rich in GGT, so it is high in calves that have suckled.
!: Reading a liver enzyme rise as liver failure. Enzymes measure cell damage or induction, not function; a dog with high ALT may have normal liver function, and an end-stage liver may have normal enzymes. Function is tested with bile acids, albumin, glucose, urea and clotting.
EV: established | ALT is a liver-specific marker in dogs and cats but not in horses and ruminants, in which hepatic ALT activity is low.
EV: contested | How reliably the newer markers and bile acid tests detect early liver disease in horses compared with GGT and GLDH is still debated.
T: Activation energy | The energy barrier a reaction must overcome; enzymes lower it
T: Km | The substrate concentration at which an enzyme works at half its maximum rate; a measure of affinity
T: Competitive inhibition | Inhibition by a molecule that competes with the substrate for the active site
SUM: Protein function depends on its folded shape, which heat and pH can destroy; enzymes speed reactions by lowering activation energy.
SUM: Competitive and non-competitive inhibitors change Km or Vmax; clinical enzymes reveal tissue damage, with species differences such as ALT in large animals and steroid-induced ALP in dogs.
SRC: Kaneko J. J., Harvey J. W. & Bruss M. L. (eds), Clinical Biochemistry of Domestic Animals, 6th edn, Academic Press | secondary | 2008
SRC: Berg J. M., Tymoczko J. L., Gatto G. J. & Stryer L., Biochemistry, 9th edn, W. H. Freeman | secondary | 2019
Q: What does a low Km mean? | The enzyme has a high affinity for its substrate, reaching half its maximum rate at a low substrate concentration.
Q: Why is ALT of little use in assessing liver damage in a horse? | Horses have little ALT in their hepatocytes, so SDH or GLDH and GGT are used instead.
M1#veterinary-u03-02-q1@1: Which level of protein structure is the sequence of amino acids? | Primary | Secondary | Tertiary | Quaternary | The primary structure is the amino acid sequence encoded by the gene; folding gives the higher levels.
M2#veterinary-u03-02-q2@2: In an enzyme assay, a drug raises the apparent Km but Vmax is unchanged. What kind of inhibitor is it? | Competitive | Non-competitive | Irreversible | Uncompetitive | A competitive inhibitor competes for the active site, so more substrate is needed for half-maximal rate, but at saturating substrate the full Vmax is still reached.
M2#veterinary-u03-02-q3@3: A dog on long-term prednisolone has a markedly raised ALP but normal bile acids. What is the most likely explanation? | Corticosteroid induction of the canine steroid-induced ALP isoenzyme | Acute liver failure with loss of hepatocytes | Bone fracture in an adult dog | Muscle damage | Dogs uniquely produce a steroid-induced isoenzyme of ALP; with normal bile acids, liver function is preserved.
TF2#veterinary-u03-02-q4@1: Creatine kinase is a muscle enzyme that rises and falls faster in blood than AST. | true | CK has a short half-life and is muscle-specific; AST rises more slowly and persists longer, and also comes from the liver.
SA3#veterinary-u03-02-q5@2,3: Explain how fomepizole works in ethylene glycol poisoning and why it must be given early. | Ethylene glycol is metabolised by alcohol dehydrogenase to glycoaldehyde, glycolate and oxalate, which cause metabolic acidosis and calcium oxalate deposition in the kidneys, leading to acute kidney injury. Fomepizole (or ethanol) is a competitive inhibitor of alcohol dehydrogenase: it occupies the enzyme so ethylene glycol is not converted to toxic metabolites and is instead excreted unchanged in urine. Once metabolites have formed, inhibiting the enzyme cannot remove them or reverse the damage, so treatment works only within hours of ingestion. | Parent compound less toxic than metabolites ; Alcohol dehydrogenase converts it ; Competitive inhibition by fomepizole or ethanol ; Unchanged ethylene glycol excreted ; Early treatment because damage is irreversible

## Carbohydrate metabolism
LV: Preclinical · Application
S: Glucose is the fuel every cell can use, and many cannot do without it. This lesson follows glucose through glycolysis, the Krebs cycle and oxidative phosphorylation, then covers glycogen, gluconeogenesis and the pentose phosphate pathway, and the animal diseases that follow when these pathways fail or are poisoned.
O: Describe glycolysis, the link reaction, the Krebs cycle and oxidative phosphorylation, and the ATP each produces
O: Explain glycogen storage and breakdown, gluconeogenesis and the pentose phosphate pathway
O: Apply carbohydrate metabolism to hypoglycaemia in puppies, xylitol toxicity, equine polysaccharide storage myopathy and Heinz body anaemia in cats
PRE: Proteins and enzymes
H: Making ATP from glucose
- **Glycolysis** (cytoplasm): glucose → 2 pyruvate, with a net gain of 2 ATP and 2 NADH. It needs no oxygen.
- Without oxygen, pyruvate becomes **lactate**, regenerating NAD⁺ so glycolysis can continue: the source of lactic acidosis in shock and hard exercise.
- **Link reaction** (mitochondria): pyruvate → acetyl-CoA, needing thiamine (vitamin B1) as a coenzyme.
- **Krebs (citric acid) cycle**: acetyl-CoA is oxidised to CO₂, producing NADH and FADH₂.
- **Oxidative phosphorylation**: the electron transport chain passes electrons from NADH and FADH₂ to oxygen, pumping protons; ATP synthase makes ATP. Cyanide blocks the chain, so cells cannot use oxygen.
E: Total yield ≈ 30–32 ATP per glucose aerobically, against 2 anaerobically :: older textbooks give 36–38, using older P/O ratios
H: Storing and making glucose
P: **Glycogen**, a branched glucose polymer, is stored in liver (to supply the blood) and muscle (for its own use). **Gluconeogenesis**, mainly in the liver and kidney, makes glucose from lactate, glycerol, propionate and most amino acids; it is essential in ruminants and in fasting carnivores. **Insulin** promotes glycogen synthesis and glucose uptake; **glucagon**, **adrenaline** and **cortisol** promote glycogen breakdown and gluconeogenesis. The **pentose phosphate pathway** makes **NADPH**, which red cells need to keep glutathione reduced and protect haemoglobin from oxidation.
X: A toy-breed puppy that has not eaten for a day becomes weak, trembles and has a seizure. Why are such puppies prone to hypoglycaemia?
> Puppies have small glycogen stores and a high metabolic rate per kilogram, with a relatively large brain that relies on glucose.
> Their capacity for gluconeogenesis is still immature, so a short fast exhausts liver glycogen.
> Hypoglycaemia deprives the brain of fuel, causing weakness, tremors and seizures: an emergency needing a vet. The same physiology explains why a stressed, fasting toy puppy can deteriorate quickly.
K: Glycolysis gives 2 ATP without oxygen and aerobic respiration about 30–32; the liver keeps blood glucose up by glycogen breakdown and gluconeogenesis; the pentose phosphate pathway protects red cells.
H: Clinical examples
- **Xylitol** (a sweetener in sugar-free products) stimulates massive insulin release in dogs, but not in people, causing profound hypoglycaemia and sometimes liver failure.
- **Polysaccharide storage myopathy type 1** (PSSM1) in Quarter Horses, draught breeds and others: a dominant mutation in glycogen synthase (GYS1) causes abnormal glycogen to accumulate in muscle, with exertional rhabdomyolysis ("tying up").
- **Heinz body anaemia**: oxidants such as onions, garlic and paracetamol overwhelm the red cell's NADPH–glutathione defence, denaturing haemoglobin into Heinz bodies; cat haemoglobin is especially susceptible.
- **Thiamine deficiency** blocks the link reaction and parts of the Krebs cycle; the brain, dependent on glucose, is damaged first (see Minerals, trace elements and vitamins).
!: Assuming sugar-free means safe for pets. Xylitol is highly toxic to dogs even in small amounts; any ingestion needs prompt veterinary advice.
EV: established | PSSM1 is caused by a dominant gain-of-function mutation in the GYS1 gene, for which a DNA test is available.
EV: contested | How much diet and exercise management, rather than genotype, determines the severity of signs in horses with PSSM1, and the cause of PSSM type 2, are still being studied.
T: Glycolysis | The cytoplasmic breakdown of glucose to pyruvate, yielding 2 ATP without oxygen
T: Gluconeogenesis | The synthesis of glucose from non-carbohydrate precursors such as lactate, glycerol, propionate and amino acids
T: Pentose phosphate pathway | A pathway that produces NADPH and five-carbon sugars, protecting red cells from oxidative damage
SUM: Glucose yields 2 ATP by glycolysis and about 30–32 by full aerobic respiration; lactate forms when oxygen is short.
SUM: Glycogen and gluconeogenesis maintain blood glucose; failure or poisoning of these pathways explains neonatal hypoglycaemia, xylitol toxicity, PSSM1 and Heinz body anaemia.
SRC: McCue M. E., Valberg S. J. et al., "Glycogen synthase (GYS1) mutation causes a novel skeletal muscle glycogenosis", Genomics 91(5):458–466 | primary | 2008
SRC: Berg J. M., Tymoczko J. L., Gatto G. J. & Stryer L., Biochemistry, 9th edn, W. H. Freeman | secondary | 2019
Q: What is the net ATP yield of glycolysis per glucose? | 2 ATP (with 2 NADH).
Q: Why is xylitol dangerous to dogs? | It triggers a large insulin release in dogs, causing severe hypoglycaemia, and can cause liver failure.
M1#veterinary-u03-03-q1@1: Where does glycolysis take place? | In the cytoplasm | In the mitochondrial matrix | On the inner mitochondrial membrane | In the nucleus | Glycolysis is cytoplasmic and needs no oxygen; the Krebs cycle is in the matrix and the electron transport chain on the inner membrane.
M2#veterinary-u03-03-q2@3: A cat given a human painkiller tablet by its owner develops brown mucous membranes and anaemia with Heinz bodies. Which pathway's protective role has been overwhelmed? | The NADPH–glutathione system supplied by the pentose phosphate pathway | Gluconeogenesis in the liver and kidney | The urea cycle | Fatty acid β-oxidation | Paracetamol metabolites oxidise haemoglobin (methaemoglobin, Heinz bodies); cats have limited glucuronidation and vulnerable haemoglobin. It is an emergency.
SEQ1#veterinary-u03-03-q3@1: Put the stages of aerobic glucose metabolism in order. | Glycolysis ; Link reaction to acetyl-CoA ; Krebs cycle ; Electron transport chain and ATP synthase | Glucose is split in the cytoplasm, then oxidised in the mitochondria, and most ATP comes from oxidative phosphorylation.
M3#veterinary-u03-03-q4@2,3: A Quarter Horse repeatedly develops stiffness, sweating and dark urine soon after starting exercise, with raised CK. Which explanation is best supported? | Polysaccharide storage myopathy from a GYS1 mutation causing abnormal muscle glycogen accumulation | A deficiency of glycolysis enzymes preventing any muscle glycogen use | Thiamine deficiency causing cardiomyopathy | Xylitol poisoning | Recurrent exertional rhabdomyolysis in a Quarter Horse suggests PSSM1, confirmed by a DNA test; management centres on diet low in starch and regular exercise, planned with a vet.
SA3#veterinary-u03-03-q5@1,3: Explain why a lack of oxygen in shock leads to lactic acidosis. | Aerobic respiration needs oxygen as the final electron acceptor of the electron transport chain. When tissue perfusion fails in shock, oxygen delivery falls; oxidative phosphorylation stops and NADH accumulates. Cells rely on glycolysis for ATP, which needs NAD⁺; pyruvate is reduced to lactate to regenerate NAD⁺, so glycolysis continues, yielding only 2 ATP per glucose. Lactate and hydrogen ions accumulate faster than the liver can clear them, causing lactic acidosis, which is used as a marker of poor perfusion. | Oxygen as final electron acceptor ; Oxidative phosphorylation fails ; Glycolysis continues for ATP ; Pyruvate to lactate regenerates NAD⁺ ; Accumulation exceeds clearance

## Lipid metabolism and ketogenesis
LV: Preclinical · Application
S: Fat is the body's largest energy store, and how it is mobilised and burnt underlies several of the most important metabolic diseases in practice. This lesson covers fat digestion and transport, lipolysis and β-oxidation, ketone body formation, and ketosis, pregnancy toxaemia, feline hepatic lipidosis and equine hyperlipaemia.
O: Describe how fat is absorbed, transported in lipoproteins, stored and mobilised
O: Explain β-oxidation and why ketone bodies are produced when oxaloacetate is scarce
O: Apply lipid metabolism to bovine ketosis, ovine pregnancy toxaemia, feline hepatic lipidosis and equine hyperlipaemia
PRE: Carbohydrate metabolism
H: Absorption, transport and storage
P: Dietary triglycerides are emulsified by bile salts, digested by pancreatic lipase and absorbed as fatty acids and monoglycerides, which are reassembled in enterocytes and exported in **chylomicrons** through the lymph. The liver packages triglyceride into **very-low-density lipoproteins** (VLDL) for export. Excess energy is stored as triglyceride in adipose tissue.
P: When energy is short, **hormone-sensitive lipase** in adipose tissue releases **non-esterified fatty acids** (NEFA) and glycerol into the blood; insulin inhibits it, while glucagon, adrenaline and cortisol stimulate it. Glycerol can be used for gluconeogenesis.
H: β-oxidation and ketone bodies
P: Fatty acids are carried into mitochondria by **carnitine** and broken down two carbons at a time by **β-oxidation** into acetyl-CoA, which normally enters the Krebs cycle by joining **oxaloacetate**. When fatty acid oxidation is high and oxaloacetate is scarce (diverted to gluconeogenesis because glucose is in demand), acetyl-CoA is converted in the liver into **ketone bodies**: acetoacetate, **β-hydroxybutyrate** (BHB) and acetone. Ketones are good fuels for muscle, heart and, in time, brain, but in excess they are acids.
X: Why does a high-yielding dairy cow develop ketosis a few weeks after calving?
> Milk yield rises faster than feed intake after calving, so she is in **negative energy balance** and needs large amounts of glucose for lactose synthesis.
> Glucose comes from hepatic gluconeogenesis; oxaloacetate is drawn into it, while fat mobilisation floods the liver with NEFA.
> The liver oxidises NEFA to acetyl-CoA that cannot enter the Krebs cycle, so ketone bodies rise; excess NEFA is also re-esterified and stored in the liver as fat (fatty liver). Blood BHB above a herd-specific cut-off (often about 1.2 mmol/L) is used to detect subclinical ketosis.
K: Ketone bodies form when fat is broken down fast and oxaloacetate is scarce because glucose is in demand: early lactation in cows, late pregnancy in ewes, and insulin deficiency in diabetic animals.
H: Other fatty-liver diseases
- **Pregnancy toxaemia** (twin lamb disease) in ewes carrying twins or triplets in late pregnancy, when fetal glucose demand outstrips supply: ketosis, hypoglycaemia, blindness, recumbency and death.
- **Feline hepatic lipidosis**: an overweight cat that stops eating mobilises fat faster than its liver can export it, and the liver fills with fat; cats are especially vulnerable, so prolonged anorexia in a cat is never ignored.
- **Equine hyperlipaemia**: ponies, donkeys and miniature horses, especially if fat, pregnant, lactating or ill, mobilise fat massively when they stop eating; milky plasma and organ failure follow, with high mortality.
- **Diabetic ketoacidosis**: without insulin, lipolysis is unchecked and gluconeogenesis maximal, causing severe ketoacidosis.
!: Assuming a fat animal can safely go without food. Obese cats, ponies and donkeys are the most at risk of fatal lipid mobilisation disorders when they stop eating; inappetence in these animals needs a vet promptly.
EV: established | Negative energy balance and fat mobilisation in early lactation underlie ketosis and fatty liver in dairy cows, and BHB is the standard marker of hyperketonaemia.
EV: contested | The best BHB cut-off for defining subclinical ketosis, and how strongly it predicts later disease, varies between studies and populations.
T: β-oxidation | The mitochondrial breakdown of fatty acids two carbons at a time into acetyl-CoA
T: Ketone bodies | Acetoacetate, β-hydroxybutyrate and acetone, made by the liver from acetyl-CoA when fat oxidation is high
T: Negative energy balance | A state in which energy output exceeds energy intake, so body reserves are mobilised
SUM: Fat is absorbed in chylomicrons, exported from the liver in VLDL and mobilised as NEFA by hormone-sensitive lipase when energy is short.
SUM: β-oxidation produces acetyl-CoA; when oxaloacetate is diverted to gluconeogenesis, ketones accumulate, causing bovine ketosis, pregnancy toxaemia and diabetic ketoacidosis; fat overload of the liver causes hepatic lipidosis and hyperlipaemia.
SRC: Drackley J. K., "Biology of dairy cows during the transition period: the final frontier?", Journal of Dairy Science 82(11):2259–2273 | secondary | 1999
SRC: Constable P. D., Hinchcliff K. W., Done S. H. & Grünberg W., Veterinary Medicine, 11th edn, Elsevier | secondary | 2017
Q: Name the three ketone bodies. | Acetoacetate, β-hydroxybutyrate and acetone.
Q: Which animals are most at risk of hyperlipaemia? | Ponies, donkeys and miniature horses, especially when fat, pregnant, lactating or ill and not eating.
M1#veterinary-u03-04-q1@1: Which molecule carries fatty acids into the mitochondria for β-oxidation? | Carnitine | Albumin | Insulin | Chylomicrons | Carnitine shuttles long-chain fatty acids across the inner mitochondrial membrane; albumin carries NEFA in plasma.
M2#veterinary-u03-04-q2@3: A ewe carrying triplets is dull, blind and recumbent a week before lambing, with ketones in her urine. Which condition is most likely? | Pregnancy toxaemia | Milk fever | Grass staggers | Swayback | Fetal glucose demand in late multiple pregnancy outstrips supply, causing ketosis and hypoglycaemia. It is an emergency for a vet.
TF2#veterinary-u03-04-q3@2: Insulin inhibits hormone-sensitive lipase in adipose tissue. | true | Insulin promotes fat storage; low insulin (fasting, diabetes) releases the brake on lipolysis.
M3#veterinary-u03-04-q4@1,3: An obese cat has eaten nothing for ten days and is now jaundiced. Which explanation is most likely? | Hepatic lipidosis from fat mobilised faster than the liver can oxidise or export it | Excess dietary fat absorbed in chylomicrons | Ketone bodies blocking bile flow | Insulin overproduction causing fat storage in the liver | Prolonged anorexia in an obese cat floods the liver with NEFA; fat accumulates in hepatocytes and causes cholestasis and jaundice.
SA3#veterinary-u03-04-q5@2,3: Explain why ketosis is common in high-yielding dairy cows in early lactation. | After calving, milk yield and the glucose needed for lactose rise faster than dry matter intake, causing negative energy balance. Low insulin and high glucagon and catecholamines stimulate lipolysis, releasing NEFA. The liver must make large amounts of glucose by gluconeogenesis, mainly from propionate, which uses oxaloacetate. NEFA are β-oxidised to acetyl-CoA, which cannot all enter the Krebs cycle because oxaloacetate is scarce, so it is converted to ketone bodies; excess NEFA is re-esterified and stored as hepatic fat. | Milk yield outpaces intake ; Negative energy balance and lipolysis ; Glucose demand and gluconeogenesis use oxaloacetate ; Acetyl-CoA diverted to ketones ; Fatty liver as consequence

## Protein and nitrogen metabolism
LV: Preclinical · Application
S: Animals must dispose of the nitrogen from the protein they break down. This lesson covers amino acids and protein quality, transamination and deamination, the urea cycle and the different nitrogen waste products of mammals and birds, and the diseases of nitrogen metabolism seen in dogs, cats and birds.
O: Distinguish essential from non-essential amino acids and explain protein quality and nitrogen balance
O: Describe transamination, deamination and the urea cycle, and compare ammonia, urea and uric acid excretion
O: Apply nitrogen metabolism to hepatic encephalopathy, urate stones in Dalmatians, arginine deficiency in cats and gout in birds and reptiles
PRE: Carbohydrate metabolism
H: Amino acids and protein quality
P: Twenty amino acids build proteins. **Essential** amino acids cannot be made by the body in sufficient amounts and must be eaten; the list varies by species: cats need **taurine** (an amino sulfonic acid) and have a high requirement for **arginine**; pigs and poultry diets are formulated around **lysine** and methionine, the first limiting amino acids in cereal-based feeds. **Protein quality** is how well a protein supplies essential amino acids. In ruminants, microbes make much of the amino acid supply (see Rumen fermentation and volatile fatty acids).
P: **Nitrogen balance** compares nitrogen eaten with nitrogen excreted: growing, pregnant and lactating animals are in positive balance; starving or catabolic animals lose body protein and are in negative balance.
H: Disposing of nitrogen
- **Transamination**: an amino group is moved to α-ketoglutarate to form glutamate, by aminotransferases such as ALT and AST, which need vitamin B6.
- **Deamination**: glutamate releases **ammonia**, which is toxic, especially to the brain.
- **Urea cycle** (liver): ammonia and CO₂ are combined into **urea**, using aspartate and **arginine** as intermediates; urea is excreted by the kidney.
P: Animals differ in their nitrogen waste. Most fish excrete ammonia (**ammonotelic**); mammals excrete urea (**ureotelic**); birds and most reptiles excrete **uric acid** (**uricotelic**), which is insoluble and needs little water, suiting an egg-bound embryo and flight.
X: A young Yorkshire Terrier is small, behaves strangely and seems blind or circles after meals. Why is a portosystemic shunt suspected?
> In a portosystemic shunt an abnormal vessel carries portal blood from the gut past the liver into the systemic circulation.
> Ammonia and other toxins absorbed from the gut, especially after a protein meal, are not removed by the liver's urea cycle.
> They reach the brain and cause **hepatic encephalopathy**, worse after meals. Small breeds tend to have extrahepatic shunts and large breeds such as Irish Wolfhounds intrahepatic ones.
K: The liver detoxifies ammonia by making urea; when the liver is bypassed or fails, ammonia reaches the brain and causes hepatic encephalopathy.
H: Species diseases
- **Cats** use arginine in the urea cycle and cannot make enough of it; a single meal lacking arginine can cause hyperammonaemia within hours.
- **Dalmatians** almost all carry a homozygous mutation in the urate transporter gene **SLC2A9**, so they excrete uric acid rather than converting it to allantoin, and are prone to **urate stones**; a backcross programme has introduced the normal gene into some Dalmatian lines.
- **Birds and reptiles** with dehydration or kidney disease cannot excrete uric acid; it precipitates in joints and on viscera as **gout**.
- **Urea poisoning** in ruminants releases ammonia faster than the liver can handle it (see the rumen lesson).
!: Thinking a high blood urea always means kidney disease. Urea also rises with a high-protein meal, gastrointestinal bleeding, dehydration and catabolism, and is low in liver failure because the urea cycle is impaired.
EV: established | Hyperuricosuria in Dalmatians is caused by a mutation in SLC2A9, for which a DNA test is available, and the low-uric-acid backcross programme introduces the normal allele.
EV: contested | How much dietary protein restriction should be used in dogs with liver disease is debated; current opinion favours adequate high-quality protein rather than severe restriction.
T: Transamination | Transfer of an amino group from an amino acid to a keto acid by an aminotransferase
T: Urea cycle | The liver pathway that converts ammonia into urea for excretion
T: Uricotelic | Excreting nitrogen mainly as uric acid, as birds and most reptiles do
SUM: Essential amino acids differ between species (cats need taurine and much arginine; pigs and poultry are formulated on lysine); nitrogen balance reflects growth or catabolism.
SUM: Amino groups pass by transamination to glutamate and ammonia; the liver's urea cycle detoxifies ammonia; birds excrete uric acid. Shunts, Dalmatian urates, feline arginine deficiency and avian gout follow from these pathways.
SRC: Bannasch D. et al., "Mutations in the SLC2A9 gene cause hyperuricosuria and hyperuricemia in the dog", PLoS Genetics 4(11):e1000246 | primary | 2008 | https://doi.org/10.1371/journal.pgen.1000246
SRC: National Research Council, Nutrient Requirements of Dogs and Cats, National Academies Press | standard | 2006
Q: In which organ is urea made? | The liver, by the urea cycle.
Q: Why are Dalmatians prone to urate stones? | Most are homozygous for an SLC2A9 mutation that impairs urate transport, so they excrete uric acid instead of allantoin.
M1#veterinary-u03-05-q1@1: Which nitrogenous waste do birds mainly excrete? | Uric acid | Urea | Ammonia | Creatinine | Birds are uricotelic; uric acid is insoluble and conserves water. Mammals excrete urea.
M2#veterinary-u03-05-q2@2: Why can a single arginine-free meal make a cat ill within hours? | Arginine is needed in the urea cycle, so without it ammonia accumulates | Arginine is needed to make insulin | Cats use arginine as their main energy source | Arginine is the precursor of taurine | Cats cannot make enough ornithine and arginine, so the urea cycle stalls and hyperammonaemia develops quickly.
TF1#veterinary-u03-05-q3@3: Blood urea is often low, not high, in severe liver failure. | true | The failing liver makes less urea from ammonia, so urea falls while ammonia rises.
M3#veterinary-u03-05-q4@3: A small-breed puppy is stunted and shows head pressing and apparent blindness after meals. Which mechanism best explains the signs? | Portal blood bypasses the liver, so ammonia from the gut reaches the brain | The kidneys cannot excrete urea, so it builds up in the brain | Uric acid crystals deposit in the brain | The puppy lacks dietary taurine | These are signs of hepatic encephalopathy from a portosystemic shunt; protein meals increase ammonia production in the gut.
SA3#veterinary-u03-05-q5@1,2: Explain how nitrogen from dietary protein is converted to urea and why the cat is vulnerable to arginine deficiency. | Amino acids not used for protein synthesis are transaminated, their amino groups passing to α-ketoglutarate to form glutamate (by aminotransferases needing vitamin B6). Glutamate is deaminated, releasing ammonia, which in the liver enters the urea cycle with CO₂ to form carbamoyl phosphate, then citrulline, argininosuccinate and arginine; arginase splits arginine into urea and ornithine. The cat cannot synthesise enough ornithine or arginine, and its liver keeps amino acid catabolism high, so without dietary arginine the cycle cannot run and ammonia accumulates within hours. | Transamination to glutamate ; Deamination releases ammonia ; Urea cycle in liver with arginine as intermediate ; Cat cannot synthesise enough arginine or ornithine ; Rapid hyperammonaemia

## Energy metabolism in the ruminant
LV: Preclinical · Application
S: A cow lives on volatile fatty acids rather than glucose, yet her udder needs huge amounts of glucose for milk. This lesson explains how the ruminant uses acetate, propionate and butyrate, why it depends on gluconeogenesis, how energy is described in feeding systems, and how the transition period around calving tests the whole system.
O: Explain how acetate, propionate and butyrate are used by the ruminant's tissues and why gluconeogenesis is essential
O: Describe gross, digestible, metabolisable and net energy and the use of metabolisable energy in rationing
O: Apply ruminant energy metabolism to negative energy balance in the transition cow and its monitoring
PRE: Rumen fermentation and volatile fatty acids
H: Using the volatile fatty acids
- **Acetate** escapes the liver largely unchanged and is used by muscle and adipose tissue for energy and fat synthesis, and by the mammary gland for milk fat.
- **Propionate** is almost entirely taken up by the liver and converted to **glucose**; it is the main glucose precursor, with amino acids, lactate and glycerol also contributing.
- **Butyrate** is converted to β-hydroxybutyrate in the rumen wall and used as a fuel by many tissues.
P: Very little glucose is absorbed from the ruminant gut, because microbes ferment most starch first, so blood glucose is lower than in monogastric animals and the liver makes glucose almost continuously. A dairy cow at peak lactation may need several kilograms of glucose a day, mostly for lactose, which draws water into milk and so sets milk volume.
H: Describing energy
E: Gross energy (GE) − faecal energy = digestible energy (DE) :: energy lost in faeces is the largest loss on fibrous diets
E: DE − urine and methane energy = metabolisable energy (ME) :: ME is the basis of the UK feeding system for ruminants, in MJ per kg of dry matter
E: ME − heat increment = net energy (NE) :: energy actually available for maintenance and production
P: Rations are balanced so that ME supplied matches the ME needed for maintenance, growth, pregnancy and milk. Forage quality is described by its ME (MJ/kg DM), fibre (NDF) and digestibility.
X: Illustrative ration check (numbers invented for practice, not a ration for any real cow).
> A cow needs about 200 MJ ME a day and eats 18 kg dry matter of a ration averaging 11.5 MJ ME/kg DM.
> Supply = 18 × 11.5 = 207 MJ ME, slightly above requirement.
> If intake falls to 15 kg DM after calving, supply is 172.5 MJ, a deficit of about 27 MJ a day, made up by mobilising body fat: negative energy balance. Real rationing uses validated systems and is done with a nutritionist or vet.
K: Ruminants absorb VFAs, not glucose: acetate fuels tissues and milk fat, propionate makes glucose in the liver, butyrate becomes BHB. Rations are balanced on metabolisable energy.
H: The transition cow
P: In the three weeks before and after calving, intake falls while demand for glucose, protein and calcium rises sharply. Every cow enters negative energy balance after calving; the question is how deep and how long. Cows that were overconditioned at calving eat less and mobilise more fat, so they are at higher risk of fatty liver, ketosis, displaced abomasum, retained fetal membranes, metritis and poor fertility. Herds monitor transition success with body condition scores, blood NEFA before calving and BHB after calving in a sample of cows, alongside disease records.
!: Treating ketosis, displaced abomasum, milk fever and metritis as separate problems. They share causes in the transition period and often occur in the same cows; prevention addresses the whole transition, planned with the herd's vet and nutritionist.
EV: established | Glucose supply in ruminants depends on hepatic gluconeogenesis, principally from propionate.
EV: contested | How tightly body condition at calving should be controlled, and the relative importance of dry-period length, dietary energy density and grouping in preventing transition disease, is debated.
T: Metabolisable energy | The energy in a feed available to the animal after losses in faeces, urine and methane
T: Transition period | The three weeks before to three weeks after calving, when metabolic demands change most rapidly
T: Non-esterified fatty acids (NEFA) | Fatty acids released from adipose tissue into the blood during fat mobilisation
SUM: Ruminants rely on VFAs: acetate for energy and milk fat, propionate for glucose by gluconeogenesis, butyrate as BHB.
SUM: Feed energy is described as gross, digestible, metabolisable and net; the transition cow's negative energy balance links ketosis, fatty liver and other periparturient diseases.
SRC: Bergman E. N., "Energy contributions of volatile fatty acids from the gastrointestinal tract in various species", Physiological Reviews 70(2):567–590 | primary | 1990 | https://doi.org/10.1152/physrev.1990.70.2.567
SRC: Drackley J. K., "Biology of dairy cows during the transition period: the final frontier?", Journal of Dairy Science 82(11):2259–2273 | secondary | 1999
Q: Which volatile fatty acid is used by the mammary gland to make milk fat? | Acetate (with β-hydroxybutyrate).
Q: What is metabolisable energy? | Gross energy minus the energy lost in faeces, urine and methane.
M1#veterinary-u03-06-q1@2: Which fraction of feed energy is the basis of the UK rationing system for ruminants? | Metabolisable energy | Gross energy | Faecal energy | Net energy for maintenance only | UK ruminant rationing uses ME (MJ/kg DM); gross energy ignores losses.
M2#veterinary-u03-06-q2@2: Illustratively, a cow eats 20 kg dry matter of a ration with 11 MJ ME/kg DM. How much ME does she receive? | 220 MJ | 31 MJ | 200 MJ | 2.2 MJ | Supply = intake × energy density = 20 × 11 = 220 MJ ME per day.
TF2#veterinary-u03-06-q3@1: Propionate is the main precursor of glucose in the ruminant liver. | true | Propionate is taken up by the liver and converted to glucose; acetate is not glucogenic.
M3#veterinary-u03-06-q4@3: A dairy herd has many cows with ketosis and displaced abomasum after calving, and many were fat at drying off. Which is the best interpretation? | Overconditioned cows eat less after calving, mobilise more fat and suffer more transition disease | The cows are absorbing too much glucose from the rumen | Fat cows have a surplus of oxaloacetate, which blocks gluconeogenesis | Displaced abomasum is unrelated to energy balance | Overconditioning at calving depresses intake and increases lipolysis, linking fatty liver, ketosis and abomasal displacement.
SA3#veterinary-u03-06-q5@2,3: Explain why the dairy cow depends on gluconeogenesis and how this links negative energy balance to ketosis in early lactation. | Rumen microbes ferment most dietary starch, so little glucose is absorbed; the cow's glucose comes from hepatic gluconeogenesis, mainly from propionate, plus amino acids, lactate and glycerol. The udder needs large amounts of glucose to make lactose, which sets milk volume. After calving, milk yield rises faster than intake, so the cow is in negative energy balance and mobilises fat as NEFA. The liver oxidises NEFA while oxaloacetate is drawn into gluconeogenesis, so acetyl-CoA is diverted to ketone bodies and excess NEFA is stored as fat. | Little glucose absorbed from the gut ; Propionate as main precursor ; Lactose synthesis and glucose demand ; Negative energy balance and NEFA ; Oxaloacetate scarcity and ketogenesis

## Minerals, trace elements and vitamins
LV: Preclinical · Application
S: Small amounts of minerals and vitamins keep enzymes, bones, blood and nerves working, and deficiencies and toxicities are common causes of disease in farm and companion animals. This lesson covers the major minerals, the key trace elements and the vitamins, with the classic veterinary deficiency and toxicity diseases each one explains.
O: Describe the functions of the major minerals (calcium, phosphorus, magnesium) and the key trace elements (copper, selenium, cobalt, iodine, iron, zinc)
O: Describe the functions of the fat-soluble and water-soluble vitamins and which species need which in the diet
O: Apply this knowledge to recognise classic deficiency and toxicity diseases, including grass staggers, swayback, copper poisoning in sheep, white muscle disease, piglet anaemia and polioencephalomalacia
PRE: Proteins and enzymes
H: Major minerals
- **Calcium and phosphorus**: bone, muscle contraction, nerve function, blood clotting. A diet of meat alone (high phosphorus, low calcium) causes **nutritional secondary hyperparathyroidism** with weak, folding bones in puppies, kittens and reptiles; hypocalcaemia around calving causes milk fever (see School 2).
- **Magnesium**: enzyme cofactor and nerve stability; there is no large store, so supply must be continuous. Lush, fast-growing spring grass, low in magnesium and high in potassium, causes **hypomagnesaemic tetany** ("grass staggers") in grazing cows and ewes: excitability, convulsions and sudden death.
H: Trace elements
- **Copper**: enzymes for pigment, connective tissue and myelin. Deficiency (often induced by molybdenum and sulfur in the diet) causes **swayback** (enzootic ataxia) in lambs, poor growth and faded fleece. **Sheep are very susceptible to copper toxicity**: they accumulate copper in the liver until a stress triggers its release and a haemolytic crisis with jaundice and haemoglobinuria. Never feed sheep cattle or pig feeds or minerals with added copper. Bedlington Terriers have an inherited copper storage hepatopathy.
- **Selenium** (with vitamin E): antioxidant defence through glutathione peroxidase. Deficiency causes **nutritional myopathy** ("white muscle disease") in lambs and calves, with stiffness or sudden cardiac death, and **mulberry heart disease** in pigs.
- **Cobalt**: rumen microbes use it to make vitamin B12; deficiency causes "pine" (ill thrift) in lambs on cobalt-poor land.
- **Iodine**: thyroid hormones; deficiency causes goitre and weak or stillborn lambs and kids.
- **Iron**: haemoglobin. **Piglets** are born with small iron stores, sow's milk is low in iron, and indoor piglets grow fast, so they become anaemic within weeks unless given iron, routinely in the first days of life.
- **Zinc**: skin and immune function; zinc-responsive dermatosis occurs in some dog breeds such as Siberian Huskies.
H: Vitamins
P: Fat-soluble vitamins are A, D, E and K; water-soluble vitamins are the B group and C. Requirements differ by species: cats need preformed **vitamin A** and niacin; **guinea pigs** (and primates) cannot make **vitamin C** and develop scurvy without it; ruminant microbes make B vitamins and vitamin K, so adult ruminants rarely need them in the diet. **Vitamin D** is made in skin exposed to UVB in most species, but cats and dogs make little and rely on their diet, and indoor reptiles need UVB lighting.
X: A group of weaned lambs on a cereal-based ration develop blindness, head pressing and recumbency. Why is thiamine deficiency suspected?
> Thiamine (vitamin B1) is a coenzyme for the link reaction and the Krebs cycle; the brain depends on glucose oxidation and is damaged first.
> Ruminant microbes normally make thiamine, but high-concentrate diets can favour bacteria producing **thiaminase**, and high sulfur intake causes similar lesions.
> The result is **polioencephalomalacia** (cerebrocortical necrosis). Cats fed raw fish with thiaminase, and horses eating bracken, develop thiamine deficiency by the same route. Affected animals need a vet urgently, because early treatment can reverse signs.
K: Many deficiency diseases are regional or diet-induced: magnesium on spring grass, copper and cobalt on certain soils, selenium in deficient areas, iron in housed piglets. Sheep tolerate copper poorly, so a supplement safe for cattle can kill them.
!: Supplementing "to be safe". Excess is as harmful as deficiency: copper kills sheep, vitamin A and D excess cause bone and soft-tissue disease, and over-supplementing calcium in growing large-breed puppies harms skeletal development. Supplementation follows diagnosis and advice from a vet or nutritionist.
EV: established | Sheep are more susceptible to chronic copper poisoning than cattle, and selenium and vitamin E deficiency causes nutritional myopathy in young ruminants.
EV: contested | How useful routine trace element supplementation is in herds without demonstrated deficiency is debated; testing blood, liver or forage before supplementing is widely recommended but not always done.
T: Hypomagnesaemic tetany | Low blood magnesium causing nervous excitability, convulsions and death in grazing ruminants ("grass staggers")
T: Swayback | Copper-deficiency ataxia of newborn or young lambs from defective myelination
T: Nutritional myopathy | Muscle degeneration from selenium and vitamin E deficiency ("white muscle disease")
SUM: Calcium, phosphorus and magnesium support bone and nerve; trace elements are enzyme cofactors whose deficiencies (copper, selenium, cobalt, iodine, iron) and toxicities (copper in sheep) are classic farm diseases.
SUM: Vitamin needs vary by species: cats need preformed vitamin A, guinea pigs vitamin C; thiaminase or bracken causes thiamine deficiency and brain damage.
SRC: Suttle N. F., Mineral Nutrition of Livestock, 4th edn, CABI | secondary | 2010
SRC: Constable P. D., Hinchcliff K. W., Done S. H. & Grünberg W., Veterinary Medicine, 11th edn, Elsevier | secondary | 2017
Q: Why do housed piglets need iron soon after birth? | They are born with small iron stores, sow's milk contains little iron and they grow quickly, so they become anaemic without supplementation.
Q: What causes grass staggers? | Low blood magnesium in grazing ruminants, typically on lush spring grass low in magnesium and high in potassium.
M1#veterinary-u03-07-q1@1: Which species must obtain vitamin C from its diet? | Guinea pig | Dog | Cow | Horse, which needs it as a forage supplement | Guinea pigs, like primates, lack the enzyme to make vitamin C; dogs, cattle and horses synthesise it.
M2#veterinary-u03-07-q2@3: A flock of sheep is fed a mineral supplement formulated for dairy cattle. Several ewes later become jaundiced with red urine after handling. What is the most likely cause? | Chronic copper accumulation followed by a haemolytic crisis | Selenium deficiency causing muscle damage | Cobalt deficiency | Vitamin C deficiency | Cattle minerals often contain copper levels that accumulate to toxic amounts in sheep livers; stress then releases it, causing haemolysis.
MATCH2#veterinary-u03-07-q3@2: Match each deficiency with its classic disease. | Copper = swayback in lambs ; Selenium and vitamin E = white muscle disease ; Cobalt = pine in lambs ; Iodine = goitre in newborns | Each disease follows from the element's role: myelin, antioxidant defence, vitamin B12 and thyroid hormone.
M3#veterinary-u03-07-q4@1,3: A lamb on a farm with a history of selenium deficiency dies suddenly while being chased, and pale streaks are found in its heart muscle. Which explanation fits best? | Nutritional myopathy affecting the myocardium from selenium and vitamin E deficiency | Grass staggers from low magnesium | Copper poisoning from feed causing a haemolytic crisis | Polioencephalomalacia from thiaminase | Selenium and vitamin E protect muscle from oxidative damage; the cardiac form of white muscle disease can cause sudden death on exertion.
SA3#veterinary-u03-07-q5@2,3: Explain why hypomagnesaemic tetany occurs in cattle turned out onto lush spring pasture. | Magnesium is needed for nerve and muscle stability and the body has no readily mobilised store, so the animal relies on a continuous daily intake. Fast-growing spring grass is low in magnesium and high in potassium (often after potash or nitrogen fertiliser), and potassium reduces magnesium absorption from the rumen. Lactating cows have a high demand, and cold, wet weather or reduced intake worsens the shortfall. Blood magnesium falls, causing excitability, staggering, convulsions and death. Prevention is by supplementing magnesium during risk periods. | No mobilisable magnesium store ; Lush grass low in magnesium ; Potassium impairs absorption ; Lactation and reduced intake increase deficit ; Clinical signs or prevention

## DNA, genes and gene expression
LV: Preclinical · Foundation
S: Every inherited trait and inherited disease starts in DNA. This lesson covers the structure and replication of DNA, how genes are transcribed and translated into proteins, how expression is controlled, the kinds of mutation, and the genomes of the domestic species.
O: Describe the structure of DNA and how it is replicated, transcribed and translated
O: Explain how gene expression is regulated and the main types of mutation and their effects
O: Apply this knowledge to explain how specific mutations produce traits and diseases in domestic animals
PRE: The animal cell and its organelles
H: From DNA to protein
P: **DNA** is a double helix of two antiparallel strands of nucleotides, each with a sugar, a phosphate and one of four bases: adenine pairs with thymine and guanine with cytosine. Replication is **semi-conservative**: each strand is a template for a new one. A **gene** is a stretch of DNA that codes for a functional product, usually a protein.
- **Transcription**: RNA polymerase copies a gene into messenger RNA (mRNA) in the nucleus; **introns** are spliced out and **exons** joined.
- **Translation**: ribosomes read the mRNA in three-base **codons**; transfer RNAs bring the matching amino acids. The genetic code is nearly universal, which is why a bacterium can make a protein from a mammalian gene.
H: Regulation and mutation
P: Every cell has the same genome, but each expresses a different set of genes. Expression is controlled by **promoters** and **enhancers**, transcription factors and hormones (steroid hormones act on nuclear receptors that bind DNA), and by **epigenetic** marks such as DNA methylation, which can be stable through cell divisions. **X-inactivation** in female mammals silences one X chromosome in each cell.
- **Point mutations**: a single base change; **missense** (one amino acid changed), **nonsense** (a premature stop codon) or **silent**.
- **Insertions and deletions**: if not a multiple of three, they cause a **frameshift** that scrambles the protein downstream.
- **Insertions of mobile elements**: in dogs, a SINE insertion in the **PMEL** gene produces the **merle** coat pattern, and an inserted copy of **FGF4** (a retrogene) causes chondrodystrophy.
- **Copy number** and chromosomal changes (aneuploidy, translocations).
X: Why does a single amino acid change in the ryanodine receptor cause porcine stress syndrome?
> A point mutation (a missense change, Arg615Cys) alters one amino acid in the RYR1 calcium-release channel.
> The change makes the channel open too readily, so calcium floods the cytoplasm under stress or halothane.
> One base change in one gene therefore produces a whole syndrome: rigidity, hyperthermia, acidosis and PSE meat (see School 2).
K: DNA is transcribed to mRNA and translated to protein; which genes are expressed depends on regulation, not on the genes present. Mutations from single bases to inserted elements change proteins or their expression.
H: The domestic genomes
- Chromosome numbers (diploid): dog 78, chicken 78, horse 64, cattle 60, sheep 54, pig 38, cat 38.
- The dog genome was published in 2005, followed by those of the horse, cow, pig, cat, sheep and chicken. Because breeds were formed from small founder groups, dogs have long stretches of shared DNA within breeds, which makes mapping single-gene diseases efficient.
!: Thinking "a gene for" a trait means one gene always causes it. Many traits involve many genes and the environment, and even single-gene variants may show incomplete penetrance or variable expression.
EV: established | The merle pattern in dogs is caused by a SINE insertion in PMEL, and chondrodystrophy in many breeds by an FGF4 retrogene insertion.
EV: hypothetical | Epigenetic changes induced by a dam's nutrition or stress in pregnancy may influence her offspring's later health and productivity; evidence in livestock is growing but mechanisms and sizes of effect are not established.
T: Transcription | Copying of a gene's DNA sequence into messenger RNA
T: Frameshift mutation | An insertion or deletion not divisible by three, which changes every codon after it
T: Epigenetics | Heritable changes in gene expression that do not alter the DNA sequence, such as DNA methylation
SUM: DNA is replicated semi-conservatively, transcribed to mRNA (with splicing) and translated in codons into protein.
SUM: Expression is regulated by promoters, transcription factors, hormones and epigenetic marks; point mutations, frameshifts and inserted elements underlie many animal traits and diseases.
SRC: Lindblad-Toh K. et al., "Genome sequence, comparative analysis and haplotype structure of the domestic dog", Nature 438(7069):803–819 | primary | 2005 | https://doi.org/10.1038/nature04338
SRC: Clark L. A. et al., "Retrotransposon insertion in SILV is responsible for merling and is associated with audiological and ophthalmological defects in domestic dogs", PNAS 103(5):1376–1381 | primary | 2006 | https://doi.org/10.1073/pnas.0506940103
Q: Which bases pair in DNA? | Adenine with thymine, and guanine with cytosine.
Q: What causes the merle coat pattern in dogs? | A SINE insertion in the PMEL (SILV) gene.
M1#veterinary-u03-08-q1@1: What reads messenger RNA in three-base codons to build a protein? | The ribosome | RNA polymerase | DNA polymerase | The Golgi apparatus | Ribosomes translate mRNA; RNA polymerase transcribes DNA to RNA, and DNA polymerase replicates DNA.
M2#veterinary-u03-08-q2@2: A single-base deletion occurs near the start of a gene's coding sequence. What is the most likely effect? | A frameshift that changes most of the protein downstream, often with a premature stop | A single amino acid change only, leaving the rest of the protein intact | No effect, because the genetic code is redundant | Duplication of the whole gene | Deleting one base shifts the reading frame, so every following codon is misread.
TF1#veterinary-u03-08-q3@2: The domestic cat and the pig both have 38 chromosomes. | true | Both have 19 pairs; the dog and chicken have 78, the horse 64 and cattle 60.
M3#veterinary-u03-08-q4@2,3: Two dogs with the same gene variant for a disease differ markedly in severity. Which is the best explanation? | Variable expressivity or incomplete penetrance from other genes and the environment | The variant must have mutated differently in each dog | DNA tests cannot detect disease variants | Severity depends only on the dog's age | Single-gene variants often act with modifier genes and environment; this is why test results are interpreted with breed data and clinical findings.
SA3#veterinary-u03-08-q5@1,2: Explain how a gene's DNA sequence becomes a functioning protein, and how a nonsense mutation would affect it. | In the nucleus RNA polymerase transcribes the gene into pre-mRNA from its promoter; introns are spliced out and exons joined, and the mRNA is exported. Ribosomes read the mRNA in codons, transfer RNAs bring the matching amino acids and a polypeptide is built, which then folds (and may be modified) into a functional protein. A nonsense mutation changes a codon to a stop codon, so translation ends early and a truncated, usually non-functional protein results (or the mRNA is degraded), typically causing loss of function. | Transcription by RNA polymerase ; Splicing of introns ; Translation at ribosomes with tRNA ; Folding into functional protein ; Premature stop codon causes truncation or loss of function

## Mendelian inheritance in domestic animals
LV: Preclinical · Application
S: Many traits and diseases of domestic animals are controlled by single genes and follow Mendel's laws. This lesson covers dominance, segregation and independent assortment, Punnett squares, test crosses and the variations on simple dominance, with coat colours, polled cattle and recessive diseases as examples.
O: Use the terms gene, allele, genotype, phenotype, homozygous, heterozygous, dominant and recessive correctly
O: Predict the offspring of monohybrid and dihybrid crosses with Punnett squares and use a test cross
O: Apply incomplete dominance, codominance, epistasis and lethal alleles to coat colour and disease inheritance in domestic species
PRE: DNA, genes and gene expression
H: Mendel's laws
P: Each animal carries two copies (**alleles**) of each autosomal gene, one from each parent. The **genotype** is the alleles present; the **phenotype** is the observed trait. A **dominant** allele shows its effect in a heterozygote; a **recessive** allele only when homozygous.
- **Segregation**: the two alleles separate at meiosis, so each gamete carries one.
- **Independent assortment**: alleles of genes on different chromosomes are inherited independently (genes close together on one chromosome are **linked** and tend to travel together).
X: In cattle the polled (hornless) allele P is dominant to horned p. A heterozygous polled bull is mated to horned cows. What do you expect?
> Bull Pp produces P and p gametes in equal numbers; cows pp produce only p.
> Offspring: half Pp (polled) and half pp (horned).
> This is a **test cross**: mating to the homozygous recessive reveals whether a dominant-phenotype animal is carrying the recessive allele. A homozygous PP bull would give all polled calves, which is why homozygous polled sires are valued (avoiding disbudding).
IX: punnett
H: Beyond simple dominance
- **Incomplete dominance**: the heterozygote is intermediate; the cream dilution gene in horses gives palomino or buckskin with one copy and cremello or perlino with two.
- **Codominance**: both alleles are expressed; the AB blood type in cats shows both antigens. Roan Shorthorn cattle, with red and white hairs intermixed, are often given as an example.
- **Epistasis**: one gene masks another. In Labradors, the B locus gives black (B_) or chocolate (bb) pigment, but dogs homozygous ee at the E locus are yellow whatever their B genotype, giving a 9 black : 3 chocolate : 4 yellow ratio from a cross of two BbEe dogs.
- **Lethal alleles**: the Manx tailless allele is dominant, but homozygous embryos die, so Manx × Manx matings give about two tailless to one tailed kitten among survivors. Merle × merle matings produce double merles, often deaf or blind.
E: Monohybrid cross Aa × Aa: genotypes 1 AA : 2 Aa : 1 aa; phenotypes 3 dominant : 1 recessive :: if A is completely dominant
E: Dihybrid cross AaBb × AaBb: 9 : 3 : 3 : 1 :: unlinked genes, complete dominance; epistasis modifies it (9 : 3 : 4 in Labradors)
K: A recessive disease appears only in animals with two copies; two healthy carriers have a one in four chance of each offspring being affected and a two in three chance that any healthy offspring is a carrier.
!: Using the 3 : 1 ratio as a promise for a small litter. Ratios are probabilities for each offspring independently; a litter of four from two carriers can have no affected puppies, or several.
EV: established | Polled is inherited as a dominant trait in cattle, and coat colour in Labradors follows the B and E loci with epistasis.
EV: contested | Whether the polled locus in different cattle breeds involves the same mutation is not fully resolved; at least two different variants at the same locus have been described.
T: Allele | One of the alternative forms of a gene at a given locus
T: Test cross | Mating an animal of dominant phenotype with a homozygous recessive to reveal its genotype
T: Epistasis | Masking of the effect of one gene by another gene
SUM: Alleles segregate at meiosis and genes on different chromosomes assort independently, giving 3 : 1 and 9 : 3 : 3 : 1 ratios with complete dominance.
SUM: Incomplete dominance, codominance, epistasis and lethal alleles explain coat colours, polled cattle, Manx and merle; test crosses reveal carriers.
SRC: Nicholas F. W., Introduction to Veterinary Genetics, 3rd edn, Wiley-Blackwell | secondary | 2010
SRC: Online Mendelian Inheritance in Animals (OMIA), University of Sydney | data | 2026-11 | https://omia.org/
Q: What is the expected ratio of phenotypes from mating two heterozygotes for a completely dominant trait? | 3 dominant : 1 recessive.
Q: Why are yellow Labradors yellow whatever their B genotype? | They are homozygous ee at the E locus, which prevents dark pigment in the coat (epistasis).
M1#veterinary-u03-09-q1@1: What is the phenotype? | The observable characteristics of an animal | The pair of alleles it carries | The DNA sequence of one gene | The chromosome on which a gene lies | Phenotype is what is observed; genotype is the alleles carried.
M2#veterinary-u03-09-q2@2: Two healthy dogs are both carriers of an autosomal recessive eye disease. What proportion of their puppies are expected to be affected? | One quarter | One half | Three quarters | None, because both parents are healthy | Aa × Aa gives 1 AA : 2 Aa : 1 aa, so one in four puppies is expected to be affected.
M2#veterinary-u03-09-q3@3: Two Manx cats are mated. Among the kittens born alive, what ratio of tailless to tailed is expected? | About 2 tailless : 1 tailed | 3 tailless : 1 tailed | 1 tailless : 1 tailed | All tailless | Homozygous Manx (MM) embryos die, leaving Mm and mm in a 2 : 1 ratio among survivors.
TF2#veterinary-u03-09-q4@2: A test cross mates an animal of dominant phenotype with a homozygous recessive animal. | true | Any recessive offspring show that the tested animal is heterozygous.
SA3#veterinary-u03-09-q5@2,3: Two black Labradors, each BbEe, are mated. Predict the coat colours of their puppies and explain the ratio. | The B locus controls pigment colour (B black, bb chocolate) and the E locus whether pigment is deposited in the coat (E_ allows it, ee gives yellow). The dihybrid cross gives 9 B_E_ (black) : 3 bbE_ (chocolate) : 3 B_ee + 1 bbee (yellow), so 9 black : 3 chocolate : 4 yellow, because ee masks the B locus (recessive epistasis). Each puppy's colour is an independent probability, so a litter may not match the ratio. | Roles of B and E loci ; Dihybrid 9:3:3:1 basis ; Epistasis of ee ; Final ratio 9:3:4 ; Probabilities per puppy

## Sex-linked and polygenic traits
LV: Preclinical · Application
S: Some traits follow the sex chromosomes and many important ones are controlled by many genes. This lesson covers sex determination in mammals and birds, X-linked inheritance including haemophilia and tortoiseshell cats, sex-limited and sex-influenced traits, and quantitative traits and heritability, the basis of selection for production and against conditions such as hip dysplasia.
O: Explain sex determination in mammals and birds and predict the inheritance of X-linked traits
O: Distinguish sex-linked, sex-limited and sex-influenced traits with examples
O: Explain polygenic and threshold traits and interpret heritability estimates
PRE: Mendelian inheritance in domestic animals
H: Sex chromosomes
P: In mammals females are **XX** and males **XY**; the **SRY** gene on the Y chromosome triggers testis development. In birds the system is reversed: males are **ZZ** and females **ZW**, so the hen is the sex that passes different sex chromosomes to her offspring.
P: **X-linked recessive** traits appear mostly in males, who have only one X: an affected male inherits the allele from his carrier mother and passes it to all his daughters (who become carriers) but none of his sons. **Haemophilia A** (factor VIII) and **haemophilia B** (factor IX) in dogs are X-linked recessive.
X: Why are almost all tortoiseshell and calico cats female?
> The orange gene (O) lies on the X chromosome; one allele gives orange, the other non-orange (black or brown) pigment.
> A female with one of each (X^O X^o) shows both colours, because one X is randomly inactivated in each cell early in development, giving patches.
> A male usually has one X and so is orange or non-orange; the rare male tortoiseshell usually has two X chromosomes (XXY, Klinefelter-like) and is generally sterile.
IX: punnett
H: Sex-limited and sex-influenced traits
- **Sex-limited**: genes carried by both sexes but expressed in one, such as milk yield (bulls carry and pass on genes for milk) and cryptorchidism (expressed only in males).
- **Sex-influenced**: the same genotype is expressed differently in the two sexes; in some sheep breeds the horned allele is dominant in rams and recessive in ewes.
- **Autosexing** in poultry uses Z-linked genes such as barring or feathering rate, so day-old chicks can be sexed by appearance.
H: Polygenic traits and heritability
P: Growth rate, milk yield, fertility, temperament and hip conformation are **quantitative traits**, controlled by many genes of small effect plus environment, and vary continuously. Some diseases are **threshold traits**: an underlying continuous liability from many genes and environment, with disease appearing above a threshold (hip and elbow dysplasia).
E: Phenotypic variance = genetic variance + environmental variance :: VP = VG + VE
E: Heritability (narrow sense) h² = VA / VP :: the proportion of phenotypic variation due to additive genetic effects, which selection can act on
P: Typical heritabilities: fertility traits are low (often under 0.1), growth and milk yield moderate (about 0.2–0.4), and carcass and conformation traits moderate to high. Hip dysplasia scores in dogs are moderately heritable, which is why selecting on parents' scores, and better still on estimated breeding values, makes progress.
K: X-linked recessive traits show mostly in males and pass from carrier mothers; birds are ZW females. Polygenic traits respond to selection in proportion to their heritability.
!: Thinking low heritability means genes do not matter. It means the trait varies mostly for non-additive or environmental reasons in that population; selection still works, more slowly, and management makes the bigger difference.
EV: established | Tortoiseshell coat colour results from X-inactivation in heterozygous females, and male tortoiseshells are usually XXY.
EV: contested | Heritability estimates are specific to the population and environment in which they were measured, so values for hip dysplasia or fertility differ between studies and breeds.
T: X-linked recessive | Inheritance of a recessive allele on the X chromosome, expressed mainly in males
T: Sex-limited trait | A trait expressed in only one sex, though its genes are carried by both
T: Heritability | The proportion of variation in a trait in a population due to additive genetic differences
SUM: Mammals are XX/XY and birds ZZ/ZW; X-linked recessive diseases such as canine haemophilia appear in males; tortoiseshell cats show X-inactivation.
SUM: Sex-limited and sex-influenced traits differ between sexes; quantitative and threshold traits respond to selection according to their heritability.
SRC: Nicholas F. W., Introduction to Veterinary Genetics, 3rd edn, Wiley-Blackwell | secondary | 2010
SRC: Falconer D. S. & Mackay T. F. C., Introduction to Quantitative Genetics, 4th edn, Longman | secondary | 1996
Q: Which sex is heterogametic in birds? | The female (ZW); males are ZZ.
Q: What is narrow-sense heritability? | The proportion of phenotypic variance due to additive genetic variance (h² = VA/VP).
M1#veterinary-u03-10-q1@1: In a male mammal, which chromosome carries the SRY gene that triggers testis development? | The Y chromosome | The X chromosome | An autosome | The Z chromosome | SRY on the Y chromosome initiates testis formation; birds use the ZW system instead.
M2#veterinary-u03-10-q2@2: A carrier bitch for haemophilia A is mated to a normal dog. What is expected among the male puppies? | Half affected and half normal | All affected | None affected | One quarter affected | Sons receive their only X from the mother, who passes the affected X to half of them; daughters receive the father's normal X and half become carriers.
MS2#veterinary-u03-10-q3@2: Which are sex-limited traits? | Milk yield ; Cryptorchidism | Tortoiseshell coat colour ; Haemophilia A | Milk yield and cryptorchidism are expressed in only one sex though both sexes carry the genes; tortoiseshell and haemophilia are X-linked.
M3#veterinary-u03-10-q4@3: A breed society wants to reduce hip dysplasia, a threshold trait with moderate heritability. Which strategy will make most progress? | Select breeding animals on estimated breeding values that combine their own and relatives' hip scores | Breed only from dogs that never show lameness | Wait for a single-gene DNA test before acting | Ignore hips, because a polygenic trait cannot respond to selection | For moderately heritable polygenic traits, EBVs using relatives' data predict genetic merit better than an animal's own score alone; lameness is a poor guide, and no single-gene test exists.
SA3#veterinary-u03-10-q5@1,2: Explain why almost all tortoiseshell cats are female, and why a male tortoiseshell is usually sterile. | The orange (O) gene is X-linked: one allele gives orange pigment, the other non-orange. Females have two X chromosomes and can be heterozygous; early in development one X is randomly inactivated in each cell (X-inactivation), and descendants keep the same active X, producing patches of orange and non-orange: tortoiseshell. Males have one X, so they are orange or non-orange. A male tortoiseshell must carry two X chromosomes with different alleles, usually as XXY; this chromosomal abnormality usually impairs spermatogenesis, so he is sterile. | Orange gene X-linked ; Females heterozygous ; Random X-inactivation gives patches ; Males have one X ; XXY males usually sterile

## Inherited diseases and breed health schemes
LV: Preclinical · Application
S: Selective breeding has concentrated inherited diseases in many breeds of dogs, cats, horses and cattle, and screening schemes aim to reduce them. This lesson describes major inherited diseases by species, the BVA/KC screening schemes and the Kennel Club's estimated breeding values, and the welfare problems linked to extreme conformation.
O: Describe important inherited diseases of dogs, cats, horses and cattle and their modes of inheritance
O: Explain how the BVA/KC hip, elbow and eye schemes and estimated breeding values work
O: Evaluate the welfare implications of breed-related disease and extreme conformation and how they can be reduced
PRE: Sex-linked and polygenic traits
H: Inherited disease by species
- **Dogs**: progressive retinal atrophy (several forms, mostly autosomal recessive), collie eye anomaly, hip and elbow dysplasia (polygenic), myxomatous mitral valve disease and Chiari-like malformation with syringomyelia in Cavalier King Charles Spaniels, brachycephalic obstructive airway syndrome (BOAS), degenerative myelopathy.
- **Cats**: polycystic kidney disease in Persians and related breeds (autosomal dominant, PKD1), hypertrophic cardiomyopathy in Maine Coons and Ragdolls (MYBPC3 variants), osteochondrodysplasia in Scottish Folds (the gene for folded ears causes painful cartilage and bone disease).
- **Horses**: hyperkalaemic periodic paralysis (HYPP) in Quarter Horses descended from the stallion Impressive (dominant), severe combined immunodeficiency (SCID) in Arabians (recessive), overo lethal white foal syndrome in Paints (recessive lethal), warmblood fragile foal syndrome.
- **Cattle**: bovine leucocyte adhesion deficiency (BLAD) and complex vertebral malformation (CVM) in Holsteins, both recessive and spread by popular AI sires; now controlled by testing.
H: Screening schemes in the UK
- **BVA/KC Hip Dysplasia Scheme**: a radiograph of the hips is scored by a panel on nine features per hip, 0–53 per hip and 0–106 in total; lower is better. Breeders are advised to use dogs with scores well below the **breed median**.
- **BVA/KC Elbow Dysplasia Scheme**: elbows are graded 0–3, and the dog's grade is its worse elbow; grade 0 dogs are preferred for breeding.
- **BVA/KC/ISDS Eye Scheme**: clinical examination by an ophthalmology panellist for listed inherited eye diseases, including gonioscopy for glaucoma risk in some breeds.
- **Chiari malformation/syringomyelia scheme** (MRI) and **BOAS Respiratory Function Grading Scheme** (an exercise test grading airway noise and effort) for brachycephalic breeds.
- The Kennel Club publishes **estimated breeding values** (EBVs) for hips and elbows in several breeds, combining a dog's own results with its relatives', and DNA test results for single-gene diseases.
X: A breeder of Labradors asks how to use the hip scheme. What principles apply?
> The hip score measures radiographic hip conformation; the trait is polygenic with moderate heritability.
> Using dogs with scores well below the breed median, and preferably high-ranking EBVs, moves the breed's genetic merit in the right direction faster than using one's own dog's score alone.
> Hip score is one criterion among several, including elbows, eyes, DNA tests, temperament and inbreeding; advice for a specific dog comes from the breeder's vet.
K: Single-gene diseases are controlled by DNA testing; polygenic ones by screening and EBVs. Many breed problems come from selection for appearance, so reducing them may mean changing breed standards and breeding goals.
H: Conformation and welfare
P: Some breed-defining features cause disease directly: very short muzzles cause BOAS, eye problems and dental crowding; folded ears in cats come from a cartilage defect; excessive skin folds cause skin infections; large heads in some breeds cause birth difficulty and caesarean sections. The Animal Welfare Act 2006 and the Animal Welfare (Licensing of Activities Involving Animals) (England) Regulations 2018 apply to breeders, and the veterinary profession, through the BVA, has campaigned to reduce extremes.
!: Assuming a health-tested parent means a healthy puppy. Screening reduces risk but does not remove it, especially for polygenic diseases, and tests cover only listed conditions.
EV: established | Brachycephalic dogs are at increased risk of BOAS and several other disorders, and risk rises as the muzzle becomes shorter.
EV: contested | How fast breed health schemes have reduced disease in practice is debated; voluntary participation is low in some breeds, and progress for hips in some breeds has been slow.
T: Hip score | The BVA/KC radiographic score of hip conformation, 0–53 per hip and 0–106 in total, lower being better
T: Estimated breeding value | A prediction of an animal's genetic merit for a trait, combining its own and its relatives' records
T: BOAS | Brachycephalic obstructive airway syndrome: airway obstruction from the soft tissues of a shortened skull
SUM: Inherited diseases range from single-gene disorders (PRA, PKD, HYPP, BLAD) to polygenic ones (hip and elbow dysplasia); popular sires spread recessive alleles quickly.
SUM: UK screening uses the BVA/KC hip, elbow and eye schemes, CM/SM and BOAS grading, and Kennel Club EBVs; extreme conformation is itself a welfare problem.
SRC: British Veterinary Association, Canine Health Schemes (hip, elbow and eye schemes) | guidance | 2026-11 | https://www.bva.co.uk/canine-health-schemes/
SRC: Packer R. M. A., Hendricks A., Tivers M. S. & Burn C. C., "Impact of facial conformation on canine health: brachycephalic obstructive airway syndrome", PLoS ONE 10(10):e0137496 | primary | 2015 | https://doi.org/10.1371/journal.pone.0137496
Q: What is the range of a total BVA/KC hip score? | 0 to 106 (0–53 per hip); lower is better.
Q: How is polycystic kidney disease in Persian cats inherited? | As an autosomal dominant trait (PKD1), so one copy causes disease.
M1#veterinary-u03-11-q1@1: In the BVA/KC Elbow Dysplasia Scheme, which grade is best for breeding? | Grade 0 | Grade 3 | Grade 1 | A score of 106 | Elbows are graded 0–3 and grade 0 is normal; 106 is the maximum hip score.
M2#veterinary-u03-11-q2@2: Why did BLAD spread widely through the Holstein breed before testing? | A popular AI sire carried the recessive allele, and carriers are healthy so were used widely | It is a dominant disease, so every calf of an affected bull showed it | It is caused by a virus spread by AI | It is X-linked, so cows never carry it | Recessive alleles spread silently through carriers; intensive use of one AI bull multiplied the allele until testing controlled it.
TF2#veterinary-u03-11-q3@3: Scottish Fold cats' folded ears are linked to a gene that also causes painful disease of cartilage and bone. | true | The fold mutation causes osteochondrodysplasia, which is why many veterinary bodies oppose breeding these cats.
M3#veterinary-u03-11-q4@1,3: A breed has many dogs with BOAS. Which approach is most likely to reduce the problem over generations? | Breed for longer muzzles and open nostrils, using functional grading such as the BOAS scheme to select parents | Treat each affected dog surgically and continue breeding from it | Rely on a single-gene DNA test for BOAS to identify carriers | Breed only from dogs that are quiet at rest | BOAS is caused by conformation; changing selection towards less extreme skulls, guided by functional grading, addresses the cause. Surgery treats the individual but not the genetics.
SA3#veterinary-u03-11-q5@2,3: Evaluate how far health screening schemes can solve inherited disease in pedigree dogs. | Strengths: DNA tests allow carriers to be identified and bred to clear dogs, eliminating affected puppies for single-gene diseases; hip and elbow schemes and EBVs allow selection against polygenic diseases, and EBVs improve accuracy. Limitations: participation is voluntary and often low; polygenic progress is slow; tests cover only known diseases and may not apply across breeds; heavy selection against one disease can reduce genetic diversity and raise inbreeding; schemes do not address disease caused by the breed standard itself, such as brachycephaly, which needs changes to breeding goals. A balanced judgement is that schemes help but must be combined with control of inbreeding and reform of extreme conformation. | DNA tests control single-gene disease ; Screening and EBVs for polygenic disease ; Limited participation and slow progress ; Diversity and inbreeding trade-off ; Conformation needs breed standard change, balanced judgement

## Genetic testing in animals
LV: Preclinical · Application
S: DNA tests now let owners, breeders and farmers know an animal's genotype for many diseases and traits, verify parentage and predict genetic merit. This lesson explains how genetic tests work, how to interpret clear, carrier and affected results, the limits of tests, and genomic selection in livestock.
O: Describe how DNA tests are carried out and the difference between direct mutation tests, linked-marker tests, parentage profiles and genomic panels
O: Interpret clear, carrier and affected results and plan matings that avoid producing affected offspring
O: Evaluate the limitations of genetic tests, including penetrance, breed specificity and direct-to-consumer panels, and explain genomic selection
PRE: Mendelian inheritance in domestic animals
H: How tests work
P: DNA is extracted from a cheek swab, blood or hair roots and the relevant region is amplified by the **polymerase chain reaction** (PCR) or read on a genotyping array. A **direct mutation test** detects the disease-causing variant itself and is the most reliable. A **linked-marker test** detects a nearby variant usually inherited with the mutation; recombination can make it wrong. **Parentage** is verified with panels of microsatellites or single nucleotide polymorphisms (SNPs), used by breed registries and in cattle recording. **Genomic panels** of tens of thousands of SNPs estimate breeding values.
H: Interpreting results
- **Clear** (normal/normal): two normal copies; will not pass the variant on.
- **Carrier** (normal/mutant) for a recessive disease: healthy, passes the variant to about half its offspring.
- **Affected** or at risk (mutant/mutant): expected to develop the disease if penetrance is complete.
X: A breeder wants to use a carrier bitch for an autosomal recessive eye disease. How can affected puppies be avoided?
> Mate the carrier only to a clear dog: offspring are half clear and half carriers, and none is affected.
> Test the puppies, or at least those kept for breeding, so carriers can again be mated to clears.
> Excluding all carriers at once can shrink a small breed's gene pool and raise inbreeding; using carriers carefully preserves other good genes while the variant's frequency falls over generations.
K: Carriers of recessive diseases can be bred safely to clear animals; the aim is to avoid producing affected animals while keeping genetic diversity, then reduce the variant's frequency over generations.
H: Limitations
- **Penetrance**: not all animals with an at-risk genotype develop disease. Many dogs homozygous for the SOD1 variant associated with **degenerative myelopathy** never show signs, so a result describes risk, not certainty.
- **Breed specificity**: a variant proven to cause disease in one breed may not in another, or the breed may have a different cause.
- **Panels sold directly to owners** test many variants at once; results for breeds in which a variant has not been validated can mislead, and should be discussed with a vet.
- Tests cover only known variants; a clear result for one test says nothing about other diseases.
H: Genomic selection
P: In dairy cattle, genomic evaluations predict a young bull's or heifer's breeding value from SNP genotypes, using a reference population of animals with both genotypes and performance records. Accuracy is high enough to select young animals before they have offspring, roughly halving the generation interval and greatly speeding genetic progress. The same approach is used in beef cattle, sheep, pigs and poultry, and is being explored for dog health traits.
!: Treating every positive DNA result as a diagnosis. A genotype estimates risk; disease is diagnosed clinically, and the test's validation in that breed and its penetrance must be considered.
EV: established | Genomic selection in dairy cattle has substantially increased the rate of genetic gain since its adoption in the late 2000s, chiefly by shortening the generation interval.
EV: contested | The value of broad direct-to-consumer DNA panels for dogs and cats is debated, because many variants are reported in breeds where they have not been validated.
T: Direct mutation test | A DNA test that detects the disease-causing variant itself
T: Penetrance | The proportion of animals with a disease genotype that show the disease
T: Genomic selection | Selection using breeding values predicted from many genome-wide DNA markers
SUM: DNA tests use PCR or arrays on swabs or blood; direct tests detect the causal variant, linked tests a nearby marker, and SNP panels verify parentage and predict merit.
SUM: Carriers are bred to clear animals to avoid affected offspring; incomplete penetrance, breed specificity and unvalidated panels limit interpretation; genomic selection shortens the generation interval.
SRC: Awano T. et al., "Genome-wide association analysis reveals a SOD1 mutation in canine degenerative myelopathy that resembles amyotrophic lateral sclerosis", PNAS 106(8):2794–2799 | primary | 2009 | https://doi.org/10.1073/pnas.0812297106
SRC: Meuwissen T. H. E., Hayes B. J. & Goddard M. E., "Prediction of total genetic value using genome-wide dense marker maps", Genetics 157(4):1819–1829 | primary | 2001
Q: What is the safest mating for a carrier of an autosomal recessive disease? | Mating to a clear (normal/normal) animal, so no offspring are affected.
Q: Why might a dog homozygous for the SOD1 variant never develop degenerative myelopathy? | Penetrance is incomplete: other genes and factors influence whether the disease develops.
M1#veterinary-u03-12-q1@1: Which technique amplifies a specific DNA region for testing? | The polymerase chain reaction (PCR) | Gel electrophoresis alone | Immunohistochemistry | Radiography | PCR copies a target region many times so the variant can be detected; electrophoresis separates the products.
M2#veterinary-u03-12-q2@2: A carrier is mated to a carrier for an autosomal recessive disease. What proportion of the healthy offspring are expected to be carriers? | Two thirds | One half | One quarter | All of them | Among offspring, 1 clear : 2 carrier : 1 affected; excluding the affected, two of every three healthy offspring are carriers.
TF2#veterinary-u03-12-q3@3: Genomic selection speeds genetic progress in dairy cattle mainly by allowing young animals to be selected before they have offspring. | true | Shortening the generation interval is the main source of faster gain.
M3#veterinary-u03-12-q4@3: An owner's direct-to-consumer DNA panel reports a variant linked to a disease in another breed. What is the best response? | Interpret it cautiously, because the variant may not be validated as causing disease in this breed, and discuss it with a vet | Assume the dog will certainly develop the disease and begin planning its treatment | Ignore it, because DNA tests are never useful | Retest until the result changes | Variants validated in one breed may have different or no effects in another; results are risk information to be interpreted with a vet.
SA3#veterinary-u03-12-q5@2,3: A small breed has a high frequency of a recessive disease variant. Explain how DNA testing can be used to reduce affected animals without damaging the breed's genetic diversity. | Test breeding animals and classify them as clear, carrier or affected. Mate carriers (and, if necessary, affected animals) only to clear animals, so no affected offspring are produced. Do not exclude all carriers immediately, because in a small breed this removes much of the gene pool and raises inbreeding, with risk of other diseases. Test offspring kept for breeding and gradually prefer clear animals over generations, so the variant's frequency falls while diversity is maintained; monitor inbreeding coefficients alongside. | Classify animals by testing ; Carrier × clear avoids affected offspring ; Do not exclude all carriers at once ; Diversity and inbreeding concern ; Gradual reduction in allele frequency

## Population genetics and inbreeding
LV: Preclinical · Application
S: Breeds and herds are populations, and their health depends on how genes are shared within them. This lesson covers allele and genotype frequencies and the Hardy–Weinberg principle, inbreeding and its measurement, effective population size and the popular-sire effect, and why closed breeds face rising inbreeding.
O: Calculate allele, genotype and carrier frequencies using the Hardy–Weinberg principle
O: Explain the coefficient of inbreeding, inbreeding depression and effective population size
O: Evaluate how breeding practices such as popular sires and closed stud books affect the genetic health of breeds
PRE: Mendelian inheritance in domestic animals
H: Hardy–Weinberg
P: In a large, randomly mating population with no selection, mutation or migration, allele frequencies stay constant and genotype frequencies follow a simple rule.
E: p + q = 1 :: p and q are the frequencies of the two alleles
E: p² + 2pq + q² = 1 :: frequencies of the two homozygotes and the heterozygote
X: Illustrative calculation: 1 in 400 puppies of a breed is affected by an autosomal recessive disease. How common are carriers?
> Affected frequency q² = 1/400, so q = 1/20 = 0.05 and p = 0.95.
> Carrier frequency 2pq = 2 × 0.95 × 0.05 ≈ 0.095, roughly 1 in 10.5 dogs.
> So although the disease looks rare, about one dog in ten carries the variant: most copies of a rare recessive allele are hidden in healthy carriers, which is why selecting only against affected animals is slow.
K: For a rare recessive disease, carriers far outnumber affected animals (2pq is much larger than q²), so DNA testing of carriers is far more effective than removing affected animals.
H: Inbreeding
P: **Inbreeding** is mating of related animals. The **coefficient of inbreeding** (F, Wright, 1922) is the probability that the two alleles at a locus are identical by descent from a common ancestor: offspring of a full-sibling or parent–offspring mating have F = 0.25, of half-siblings 0.125, of first cousins 0.0625. Inbreeding increases homozygosity, exposing recessive diseases, and causes **inbreeding depression**: reduced fertility, litter size, survival, growth and immune competence.
P: **Effective population size** (Ne) is the size of an idealised population that would lose genetic diversity at the same rate as the real one. It is reduced when few males sire many offspring. Many pedigree dog breeds have an Ne below 100 despite tens of thousands of registered dogs; a widely accepted aim for conservation is to keep the rate of inbreeding below about 1% per generation.
- **Popular-sire effect**: one male (a show champion or AI bull) siring very many offspring spreads his alleles, including hidden recessives, through a breed in a few generations.
- **Closed stud books**: no new genes can enter a breed, so inbreeding rises steadily even without close matings.
- The Kennel Club's **Mate Select** tool calculates the expected inbreeding coefficient of a proposed mating.
!: Thinking avoiding close relatives is enough. In a closed breed with a small Ne all animals become related, so inbreeding rises even with unrelated-looking pedigrees; limiting sire use and considering outcrossing are also needed.
EV: established | Inbreeding increases homozygosity and is associated with reduced fertility, survival and litter size in domestic animals (inbreeding depression).
EV: contested | Whether, and how, to open closed stud books or cross breeds to restore diversity is debated among breed societies, breeders and vets.
T: Hardy–Weinberg principle | In an idealised population, allele frequencies p and q give genotype frequencies p², 2pq and q², stable across generations
T: Coefficient of inbreeding | The probability that two alleles at a locus are identical by descent
T: Effective population size | The size of an ideal population losing diversity at the same rate as the real one
SUM: Hardy–Weinberg relates allele and genotype frequencies; for rare recessive diseases most copies are in healthy carriers.
SUM: Inbreeding raises homozygosity and causes inbreeding depression; popular sires and closed stud books reduce effective population size, so breeds need managed sire use and inbreeding control.
SRC: Wright S., "Coefficients of inbreeding and relationship", The American Naturalist 56(645):330–338 | primary | 1922
SRC: Calboli F. C. F., Sampson J., Fretwell N. & Balding D. J., "Population structure and inbreeding from pedigree analysis of purebred dogs", Genetics 179(1):593–601 | primary | 2008
Q: What is the coefficient of inbreeding of offspring from a full-sibling mating? | 0.25.
Q: Why does a popular sire threaten a breed's genetic health? | He contributes a large share of the next generation's genes, spreading any hidden recessive alleles and reducing effective population size.
M1#veterinary-u03-13-q1@1: In the Hardy–Weinberg equation, what does 2pq represent? | The frequency of heterozygotes | The frequency of the recessive allele | The frequency of affected animals | The rate of inbreeding | 2pq is the heterozygote (carrier) frequency; q² is the frequency of affected homozygotes.
M2#veterinary-u03-13-q2@3: Illustratively, a recessive disease affects 1 in 100 animals of a breed. Approximately what proportion are carriers? | About 18% | About 1% | About 10% | About 50% | q = √0.01 = 0.1, p = 0.9, so 2pq = 2 × 0.9 × 0.1 = 0.18.
TF2#veterinary-u03-13-q3@2: A breed with tens of thousands of registered dogs can still have a small effective population size. | true | If relatively few sires produce most litters, Ne can be under 100 whatever the census size.
M3#veterinary-u03-13-q4@2,3: A breed club bans every carrier of a recessive disease from breeding in one generation. Which is the most likely unintended consequence? | Loss of genetic diversity and a rise in inbreeding, exposing other recessive diseases | Immediate rise in the frequency of the disease variant | No effect at all, because carriers are healthy | The disease becomes dominant | Removing many animals shrinks the gene pool; managed use of carriers bred to clear animals lowers the variant's frequency while preserving diversity.
SA3#veterinary-u03-13-q5@2,3: Explain why inbreeding rises in a closed pedigree breed even when breeders avoid mating close relatives. | In a closed stud book no new alleles enter, and every animal descends from a limited founder group. Each generation, the population's shared ancestry deepens, so all animals become increasingly related and the average coefficient of inbreeding rises. This happens faster when the effective population size is small, especially when a few popular sires produce many offspring. Avoiding close matings slows but cannot stop the rise; managing sire use, maximising the number of breeding animals and, where appropriate, outcrossing are needed. | Closed stud book, no new alleles ; Limited founders and common ancestry ; Average relatedness rises ; Small Ne and popular sires accelerate it ; Measures beyond avoiding close matings

## Animal breeding and selection
LV: Preclinical · Application
S: Breeding programmes change populations deliberately, for production, health and temperament, and sometimes create welfare problems by selecting too narrowly. This lesson covers the response to selection, the factors that control genetic gain, breeding values and indices, reproductive technologies, crossbreeding and heterosis, and balanced breeding goals.
O: Calculate and interpret the response to selection and explain the factors that control the rate of genetic gain
O: Describe estimated breeding values, selection indices, reproductive technologies and crossbreeding with heterosis
O: Evaluate the welfare consequences of selection for production or appearance and the case for balanced breeding goals
PRE: Population genetics and inbreeding
H: Response to selection
E: R = h² × S :: the breeder's equation: response per generation R equals heritability times the selection differential S (how far selected parents are from the population mean)
E: Genetic gain per year = (i × r × σA) / L :: selection intensity i, accuracy r, additive genetic standard deviation σA and generation interval L
X: Illustrative calculation (invented numbers).
> A pig herd's mean daily gain is 800 g; the parents chosen average 900 g, so S = 100 g.
> If heritability is 0.3, R = 0.3 × 100 = 30 g: the offspring are expected to average about 830 g, in the same environment.
> To go faster, breeders select more intensely, measure more accurately (using relatives and genomics), or shorten the generation interval.
H: Tools
- **Estimated breeding values** (EBVs) and, in dairy cattle, predicted transmitting abilities combine an animal's records with those of relatives; **selection indices** weight several traits by their economic or welfare value (in the UK the AHDB's **Profitable Lifetime Index** for dairy cattle includes fertility, health and longevity as well as yield).
- **Artificial insemination** multiplies the use of the best males; **embryo transfer** and in vitro embryo production do the same for females; **sexed semen** shifts the sex ratio towards heifers in dairy herds.
- **Crossbreeding** produces **heterosis** (hybrid vigour): crossbred offspring outperform the parental average, especially for low-heritability traits such as fertility and survival. Commercial pigs, poultry, beef cattle and lambs are mostly crossbreds.
K: Genetic gain depends on intensity, accuracy, genetic variation and generation interval; indices that include health, fertility and longevity prevent selection for one trait from harming others.
H: Selection and welfare
P: Narrow selection has produced impressive gains and serious welfare costs. Fast-growing broiler chickens reach slaughter weight in a few weeks but are prone to leg disorders and heart failure; very high-yielding dairy cows suffered declining fertility until fertility was added to indices; selection for appearance has produced brachycephalic dogs and cats with airway disease. Correcting these requires balanced goals: in livestock, broader indices and slower-growing breeds for some markets; in companion animals, breed standards that prioritise health and function.
!: Assuming genetic progress is always progress. A trait improved in isolation can carry unfavourable correlated responses (yield against fertility, growth against leg health); the goal must be defined with welfare in mind.
EV: established | Selection for high milk yield alone was associated with declining fertility in Holstein cattle, and including fertility in breeding indices has since helped reverse the decline.
EV: contested | Whether slower-growing broiler breeds should replace conventional fast-growing ones, given welfare benefits against higher feed use and cost, is debated between welfare organisations and industry.
T: Selection differential | The difference between the mean of selected parents and the population mean for a trait
T: Heterosis | Superiority of crossbred offspring over the average of their parental breeds
T: Generation interval | The average age of parents when their offspring are born
SUM: Response to selection is heritability times the selection differential; gain per year depends on intensity, accuracy, genetic variation and generation interval.
SUM: EBVs, indices, AI, embryo transfer, sexed semen and crossbreeding drive progress; balanced goals are needed to avoid welfare costs such as broiler leg disorders, dairy infertility and brachycephaly.
SRC: Falconer D. S. & Mackay T. F. C., Introduction to Quantitative Genetics, 4th edn, Longman | secondary | 1996
SRC: AHDB, Profitable Lifetime Index (£PLI) | guidance | 2026-11 | https://ahdb.org.uk/
Q: What is the breeder's equation? | R = h² × S: the response to selection equals heritability times the selection differential.
Q: What is heterosis? | Hybrid vigour: crossbred offspring perform better than the average of their parental breeds.
M1#veterinary-u03-14-q1@1: Which reproductive technology most increases the number of offspring from a single bull? | Artificial insemination | Embryo transfer | Crossbreeding | Natural service | AI lets one bull's semen be used in thousands of cows; embryo transfer multiplies the offspring of females.
M2#veterinary-u03-14-q2@2: Illustratively, heritability of a trait is 0.4 and selected parents exceed the population mean by 20 units. What is the expected response in one generation? | 8 units | 20 units | 50 units | 0.4 units | R = h² × S = 0.4 × 20 = 8 units of improvement in the offspring.
TF2#veterinary-u03-14-q3@2: Heterosis tends to be greatest for traits with low heritability, such as fertility and survival. | true | Crossbreeding most improves fitness traits, which respond little to selection within a breed.
M3#veterinary-u03-14-q4@3: A dairy breeding programme selected only on milk yield for decades. Which problem is most likely to have followed? | Declining fertility from an unfavourable genetic correlation with yield | Falling milk yield as the selected genes were lost | Increased heterosis | Shortened generation interval only | Selection on yield alone carried an unfavourable correlated response in fertility, which led to fertility being added to breeding indices.
SA3#veterinary-u03-14-q5@2,3: Explain how genomic selection, AI and a balanced selection index together change the rate and direction of genetic progress in dairy cattle. | Genetic gain per year depends on selection intensity, accuracy, additive genetic variation and generation interval. AI allows the very best bulls to be used across the population, raising intensity. Genomic selection predicts breeding values of young animals accurately from DNA, so they can be selected before they have offspring, shortening the generation interval. Together these greatly raise gain per year. A balanced index such as the Profitable Lifetime Index directs that gain: weighting fertility, health and longevity as well as yield prevents unfavourable correlated responses and improves welfare. | Determinants of gain ; AI increases intensity ; Genomics shortens generation interval and improves accuracy ; Index sets direction ; Inclusion of health and fertility avoids correlated harm

## Embryology and organogenesis
LV: Preclinical · Application
S: Every organ, and many birth defects, can be traced to events in the first weeks of development. This lesson follows the embryo from fertilisation through cleavage, the blastocyst, gastrulation and neurulation to the formation of the extraembryonic membranes and the main organ systems, and the sexual differentiation of the gonads.
O: Describe fertilisation, cleavage, blastocyst formation and gastrulation and the derivatives of the three germ layers
O: Describe neurulation, the extraembryonic membranes and the development of the heart and gonads
O: Apply embryology to explain critical periods for teratogens and species differences in early development
PRE: DNA, genes and gene expression
H: The first days
- **Fertilisation** in the uterine tube restores the diploid number and determines genetic sex.
- **Cleavage** divides the zygote into smaller cells, forming a **morula**, then a **blastocyst** with an outer **trophoblast** (which forms placental tissue) and an **inner cell mass** (which forms the embryo).
- The blastocyst **hatches** from the zona pellucida (in cattle around days 9–11) and, in ungulates, elongates greatly before attaching; the equine embryo instead stays spherical inside a glycoprotein capsule and moves around the uterus until about day 16.
- In the mare, only fertilised embryos pass through the oviduct into the uterus (around day 6), because the embryo itself secretes prostaglandin E2 to relax the oviduct; unfertilised ova stay behind.
H: Germ layers and organs
P: In **gastrulation** the inner cell mass forms three germ layers:
- **Ectoderm**: epidermis, hair, hooves, the nervous system and the neural crest.
- **Mesoderm**: muscle, bone, cartilage, heart and blood vessels, blood, kidneys, gonads and connective tissue.
- **Endoderm**: the lining of the gut and respiratory tract, the liver, pancreas, thyroid and bladder epithelium.
P: In **neurulation** the ectoderm over the notochord folds into the **neural tube** (brain and spinal cord); **neural crest** cells migrate widely to form peripheral nerves, melanocytes, the adrenal medulla and parts of the face and heart. Failure of the neural tube to close causes spina bifida and related defects. **Somites** beside the neural tube form vertebrae, skeletal muscle and dermis.
- **Extraembryonic membranes**: the **amnion** encloses the embryo in fluid; the **chorion** forms the outer layer of the placenta; the **allantois** collects waste and fuses with the chorion to form the chorioallantoic placenta; the **yolk sac** is important early, especially in the horse, dog and cat.
- **Heart**: a tube that loops and divides into four chambers, with fetal shunts (foramen ovale, ductus arteriosus) bypassing the lungs; failure of these steps causes congenital heart defects.
- **Gonads**: indifferent at first; **SRY** on the Y chromosome turns them into testes, whose anti-Müllerian hormone makes the female ducts regress and whose testosterone builds the male tract. Testes later descend, guided by the **gubernaculum**.
X: Why does a calf infected with bovine viral diarrhoea virus at a particular stage of pregnancy become persistently infected for life?
> Before the fetal immune system matures (roughly before days 110–125 of gestation), the fetus cannot recognise the virus as foreign.
> Infection then induces immune tolerance: the calf is born carrying and shedding virus for life without producing antibody against it.
> Infection at other stages causes abortion, congenital defects (such as cerebellar hypoplasia, mainly in mid-gestation) or a normal immune response, showing how timing in development decides the outcome.
K: The stage of development at exposure decides the outcome: organs are most vulnerable to teratogens while they are forming (organogenesis), and immune tolerance arises if a pathogen meets the fetus before its immune system matures.
!: Thinking the placenta protects the fetus from every insult. Many viruses, drugs, toxins and nutritional deficiencies cross it or act through the dam, and the embryo is most vulnerable in early organogenesis, often before pregnancy is known.
EV: established | The three germ layers give rise to characteristic tissues, and SRY on the Y chromosome initiates testis development in mammals.
EV: contested | Exactly how the equine conceptus signals maternal recognition of pregnancy during its migration around the uterus has not been identified.
T: Gastrulation | The formation of the three germ layers (ectoderm, mesoderm, endoderm) from the inner cell mass
T: Neural crest | Cells from the edge of the neural folds that migrate to form peripheral nerves, melanocytes, the adrenal medulla and facial structures
T: Allantois | An extraembryonic sac that collects fetal urine and fuses with the chorion to form the placenta
SUM: Fertilisation, cleavage and the blastocyst lead to gastrulation; ectoderm, mesoderm and endoderm each form characteristic tissues, and neurulation forms the neural tube and neural crest.
SUM: Extraembryonic membranes form the placenta; heart and gonad development have critical steps; timing of exposure decides whether teratogens or infections cause defects, death or tolerance.
SRC: McGeady T. A., Quinn P. J., FitzPatrick E. S., Ryan M. T., Kilroy D. & Lonergan P., Veterinary Embryology, 2nd edn, Wiley-Blackwell | secondary | 2017
SRC: Hyttel P., Sinowatz F. & Vejlsted M., Essentials of Domestic Animal Embryology, Saunders Elsevier | secondary | 2010
Q: Which germ layer forms the nervous system? | The ectoderm (neural tube and neural crest).
Q: What does the trophoblast become? | The outer layer of the placenta (with the chorion).
M1#veterinary-u03-15-q1@1: Which germ layer gives rise to the lining of the gut? | Endoderm | Ectoderm | Mesoderm | Neural crest | The endoderm forms the epithelial lining of the gut and respiratory tract and glands such as the liver and pancreas.
M2#veterinary-u03-15-q2@3: A calf is born weak and is later found to carry BVD virus without antibodies against it. When was it most likely infected? | Early in gestation, before its immune system could recognise the virus | In the last week of gestation | After birth, from virus in its dam's colostrum | At conception, from the bull only | Fetal infection before immune competence induces tolerance and persistent infection; later infection usually produces antibody.
TF2#veterinary-u03-15-q3@1: Neural crest cells contribute to melanocytes and the adrenal medulla. | true | They migrate widely from the neural folds and form many tissues, which is why some pigment disorders accompany other defects.
M3#veterinary-u03-15-q4@2,3: A drug known to disrupt organ formation is given to a pregnant animal. When would it be expected to cause the most serious structural defects? | During organogenesis in early pregnancy | In the last days before birth only | Before ovulation | During lactation | Structural malformations arise while organs are forming; later exposure more often affects growth or function.
SA3#veterinary-u03-15-q5@2,3: Explain how the male reproductive tract develops in a mammalian embryo, and how failure of one step could cause cryptorchidism. | The gonads are initially indifferent. In an XY embryo, SRY on the Y chromosome triggers testis development. Sertoli cells secrete anti-Müllerian hormone, causing the Müllerian (paramesonephric) ducts to regress; Leydig cells secrete testosterone, which develops the Wolffian (mesonephric) ducts into the epididymis and ductus deferens, and dihydrotestosterone masculinises the external genitalia. The testes then descend into the scrotum, guided by the gubernaculum and hormones. Failure of gubernacular development or hormonal signals leaves a testis in the abdomen or inguinal canal (cryptorchidism), a heritable defect in several species. | SRY initiates testis ; AMH causes Müllerian regression ; Testosterone develops Wolffian ducts ; Descent guided by gubernaculum ; Failure of descent and heritability

## Congenital abnormalities
LV: Preclinical · Application
S: Congenital abnormalities are defects present at birth, caused by genes, infections, toxins, drugs or nutrition acting on the developing embryo. This lesson classifies their causes, describes the common defects seen in practice, and explains the freemartin and the viral teratogens, such as Schmallenberg and BVD viruses, that cause outbreaks in farm animals.
O: Classify the causes of congenital abnormalities as genetic, infectious, toxic, nutritional or physical
O: Describe common congenital defects in domestic animals and the freemartin condition in cattle
O: Apply knowledge of teratogens to investigate an outbreak of congenital defects in a herd or flock
PRE: Embryology and organogenesis
H: Causes
- **Genetic**: single-gene defects (such as complex vertebral malformation in Holsteins), chromosomal abnormalities and polygenic defects (cleft palate, umbilical hernia).
- **Infectious**: bovine viral diarrhoea virus (cerebellar hypoplasia, eye defects), **Schmallenberg virus** and **bluetongue virus** (arthrogryposis and brain defects in lambs and calves), feline panleucopenia virus (cerebellar hypoplasia in kittens infected in late pregnancy or soon after birth).
- **Toxic and drug**: certain plants (in North America *Veratrum californicum* causes cyclopia in lambs whose ewes eat it early in pregnancy); drugs such as griseofulvin in pregnant queens.
- **Nutritional**: iodine deficiency (goitre), copper deficiency (swayback), vitamin A deficiency.
- **Physical**: high body temperature in early pregnancy and uterine crowding.
H: Common defects
P: In practice the most common are **cleft palate** (milk from the nose of a suckling puppy or kitten), **umbilical and inguinal hernias**, **cryptorchidism**, **atresia ani** (no anal opening) in calves and piglets, **congenital heart defects** (patent ductus arteriosus, pulmonic and subaortic stenosis in dogs, ventricular septal defects in calves and foals), **portosystemic shunts**, **hydrocephalus** in toy breeds and **angular limb deformities** in foals.
H: The freemartin
X: A heifer born twin to a bull calf fails to come into season. Why?
> In cattle, the placentas of twins usually fuse and their blood vessels connect (anastomose) early in pregnancy.
> Hormones (anti-Müllerian hormone and testosterone) and cells from the male twin reach the female, suppressing the development of her ovaries and female tract; she is also a blood chimera with both XX and XY cells.
> Most (around nine in ten) heifers born twin to a bull are **freemartins** and infertile. The diagnosis can be confirmed by detecting Y-chromosome DNA in her blood, or by examining the length of the vagina.
K: Freemartinism follows placental vascular fusion between twin calves: male hormones and cells reach the female, who is usually infertile and is a blood chimera.
H: Investigating an outbreak
P: When several newborns in a herd or flock have similar defects, the vet considers timing (which stage of pregnancy coincided with exposure), the species and defects (arthrogryposis and hydranencephaly suggest a viral teratogen such as Schmallenberg), new animals, feeds or plants, drugs given, and pedigrees (a common sire suggests a genetic cause). Samples from affected newborns and dams, and serology, help confirm the cause. Schmallenberg virus emerged in Europe in 2011, spread by biting midges, and caused outbreaks of deformed lambs and calves in the UK from 2012; bluetongue is notifiable in the UK.
!: Assuming defects in many lambs mean a genetic problem. A cluster of similar defects in one lambing season, especially across different sires, more often points to an infectious or toxic cause acting at a shared stage of pregnancy.
EV: established | Schmallenberg virus, an orthobunyavirus transmitted by Culicoides midges, causes arthrogryposis and brain malformations when ruminant fetuses are infected in early to mid-pregnancy.
EV: contested | How often the causes of sporadic congenital defects in individual animals can be identified is limited; many remain unexplained, and the relative contributions of genes and environment are uncertain.
T: Teratogen | An agent that causes structural abnormalities in a developing embryo or fetus
T: Freemartin | A sterile heifer born twin to a bull, masculinised by shared placental circulation
T: Arthrogryposis | Congenital joint contractures, fixing limbs in abnormal positions
SUM: Congenital defects have genetic, infectious, toxic, nutritional and physical causes; common ones include cleft palate, hernias, cryptorchidism, heart defects and shunts.
SUM: Freemartins arise from placental vascular fusion in cattle twins; outbreaks such as Schmallenberg are investigated by timing, pattern, exposure and pedigree.
SRC: Hoffmann B. et al., "Novel orthobunyavirus in cattle, Europe, 2011", Emerging Infectious Diseases 18(3):469–472 | primary | 2012 | https://doi.org/10.3201/eid1803.111905
SRC: McGeady T. A. et al., Veterinary Embryology, 2nd edn, Wiley-Blackwell | secondary | 2017
Q: What is a freemartin? | An infertile heifer born twin to a bull, whose reproductive development was suppressed by hormones and cells from her twin through shared placental vessels.
Q: Name two viruses that cause congenital defects in lambs or calves. | Schmallenberg virus and bluetongue virus (also BVD virus in calves).
M1#veterinary-u03-16-q1@1: What is a teratogen? | An agent that causes structural defects in the developing embryo or fetus | Any infection of a newborn animal | A hormone that maintains pregnancy by acting on the uterus | A gene that causes disease in adults only | Teratogens act during development; examples include some viruses, drugs, plants and deficiencies.
M2#veterinary-u03-16-q2@2: A puppy has milk coming from its nose when it suckles and is not gaining weight. Which congenital defect is most likely? | Cleft palate | Atresia ani | Umbilical hernia | Cryptorchidism | A cleft palate connects the mouth and nasal cavity, so milk enters the nose and the puppy cannot suckle effectively.
TF2#veterinary-u03-16-q3@1: Most heifers born twin to a bull calf are infertile freemartins. | true | Placental vascular fusion occurs in most bovine twin pregnancies, and around nine in ten such heifers are freemartins.
M3#veterinary-u03-16-q4@3: A sheep farm has many lambs born with fixed, bent limbs and abnormal brains, from ewes served by several different rams, the season after a midge-borne virus was reported in the area. Which cause is most likely? | Infection of the fetuses with a teratogenic virus such as Schmallenberg virus in early to mid-pregnancy | An inherited defect from one ram | Copper deficiency in the ewes causing swayback in their lambs | Overfeeding of ewes in late pregnancy | Arthrogryposis with brain malformation across several sires, after midge activity, fits a viral teratogen; a single-ram genetic cause would cluster by sire.
SA3#veterinary-u03-16-q5@2,3: Describe how a vet would investigate a cluster of congenital defects in calves on one farm. | Define the defects and how many animals are affected, and when they were born, then work back to the stage of pregnancy when the insult must have acted. Consider genetic causes (check pedigrees and sires; a single sire suggests inheritance), infectious causes (BVD, Schmallenberg, bluetongue; vaccination history, vector season, serology of dams and precolostral samples from calves), toxic and drug causes (plants, feeds, treatments given in pregnancy) and nutritional causes (iodine, copper, vitamin A). Examine and post-mortem affected calves, and take samples. Report notifiable disease suspicions such as bluetongue to APHA. | Case definition and timing back to gestation stage ; Genetic investigation of sires ; Infectious causes and sampling ; Toxic, drug and nutritional causes ; Post-mortem and notifiable disease reporting
`;
