// VetGradify's 3D model: a dog, with its skeleton, thoracic and abdominal organs and nervous system
// inside a holographic body. The heart beats and the lungs breathe. Notes compare the dog with the
// cat, horse and cow, as veterinary courses do.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  skeletal: { name: "Skeleton", c: "#e9e3d3" },
  thorax: { name: "Thorax", c: "#ff4d6d" },
  abdomen: { name: "Abdomen", c: "#ffb36b" },
  urogenital: { name: "Urinary", c: "#c79bff" },
  nervous: { name: "Nervous", c: "#ffe066" },
};

const STRUCTURES = {
  skull: s("skeletal", "Skull", "Skull shape varies more in dogs than any other species: dolichocephalic (greyhound), mesaticephalic (labrador) and brachycephalic (bulldog).",
    ["**Brachycephalic obstructive airway syndrome (BOAS)**: stenotic nares, elongated soft palate, everted laryngeal saccules, hypoplastic trachea.", "Dental formula of the adult dog: **2 × (I 3/3, C 1/1, P 4/4, M 2/3) = 42**. Cat: 30.", "The carnassial teeth (upper P4, lower M1) shear meat; upper P4 root abscesses swell below the eye."],
    [["What is the adult dog's dental formula?", "2 × (I 3/3, C 1/1, P 4/4, M 2/3) = 42 teeth."], ["Name the components of BOAS.", "Stenotic nares, elongated soft palate, everted laryngeal saccules, tracheal hypoplasia (plus others)."], ["Which teeth are the dog's carnassials?", "Upper fourth premolar and lower first molar."]],
    ["skull", "brachycephalic", "boas", "dental formula", "carnassial"]),
  spine: s("skeletal", "Vertebral column", "Dog: C7, T13, L7, S3 (fused), Cd ~20. Cat: C7, T13, L7, S3, Cd ~20. Horse: C7, T18, L6, S5. Cow: C7, T13, L6, S5.",
    ["**Intervertebral disc disease** is common in chondrodystrophic breeds (dachshund): Hansen type I extrusion, often at T12–L2.", "Dogs have no intervertebral disc between C1 and C2.", "Wobbler syndrome (cervical spondylomyelopathy) affects Dobermanns and Great Danes."],
    [["What is the vertebral formula of the dog?", "C7, T13, L7, S3, Cd about 20."], ["Which breeds get Hansen type I disc disease?", "Chondrodystrophic breeds, such as dachshunds, French bulldogs and beagles."], ["Where do thoracolumbar disc extrusions usually occur?", "T12–L2."]],
    ["vertebra", "spine", "disc", "ivdd", "wobbler", "spinal"]),
  ribs: s("skeletal", "Ribs and sternum", "Thirteen pairs of ribs in the dog (18 in the horse); the last is floating. The sternum has eight sternebrae.",
    ["The costal arch (ribs 10–12) is the caudal border of the thorax: important for abdominal palpation.", "Thoracocentesis in the dog: 7th–9th intercostal space, at the costochondral junction, cranial to the rib.", "Flail chest after dog-bite or road traffic trauma moves paradoxically."],
    [["How many pairs of ribs does a dog have?", "Thirteen."], ["Where is thoracocentesis performed in a dog?", "7th–9th intercostal space, near the costochondral junction, at the cranial border of the rib."], ["How many ribs does a horse have?", "18 pairs."]],
    ["rib", "sternum", "thorax", "thoracocentesis"]),
  forelimb: s("skeletal", "Thoracic limb", "Scapula, humerus, radius and ulna, carpus, metacarpals and phalanges. There's no clavicle in the dog (just a vestigial one): the forelimb is held on by muscle.",
    ["**Elbow dysplasia** (fragmented medial coronoid process, ununited anconeal process, OCD) affects large breeds.", "The dog walks on its digits (**digitigrade**); the horse on one hoof (unguligrade).", "The dewclaw is digit I."],
    [["What attaches the dog's forelimb to the trunk?", "Muscles (a synsarcosis), as there is no functional clavicle."], ["Name the components of elbow dysplasia.", "Fragmented medial coronoid process, ununited anconeal process, OCD of the humeral condyle, incongruity."], ["What stance does a dog have?", "Digitigrade (walks on its digits)."]],
    ["forelimb", "thoracic limb", "scapula", "humerus", "radius", "ulna", "elbow", "carpus"]),
  pelvis: s("skeletal", "Pelvis", "Ilium, ischium and pubis fused at the acetabulum, joined to the sacrum at the sacroiliac joint.",
    ["**Hip dysplasia**: joint laxity → subluxation → osteoarthritis. Screened by BVA/KC hip scoring (0–106).", "Pelvic fractures commonly come in threes (the pelvis is a box).", "Narrowed pelvic canal after fracture healing can cause constipation (obstipation), especially in cats."],
    [["How is canine hip dysplasia screened in the UK?", "BVA/KC hip scoring of radiographs (0–106, lower is better)."], ["Why can a healed pelvic fracture cause constipation in cats?", "Malunion narrows the pelvic canal, obstructing faecal passage."], ["Which three bones form the os coxae?", "Ilium, ischium and pubis."]],
    ["pelvis", "hip", "dysplasia", "acetabul", "ilium"]),
  hindlimb: s("skeletal", "Pelvic limb", "Femur, patella, tibia and fibula, tarsus (hock), metatarsals and phalanges.",
    ["**Cranial cruciate ligament rupture** is the commonest orthopaedic problem in dogs: cranial drawer and tibial thrust tests. Treated by TPLO or TTA.", "Medial patellar luxation is common in toy breeds.", "The calcanean tendon (Achilles) inserts on the calcaneus at the point of the hock."],
    [["What is the commonest cause of hind limb lameness in large dogs?", "Cranial cruciate ligament rupture."], ["Which tests detect cranial cruciate rupture?", "Cranial drawer and tibial thrust (compression) tests."], ["Which way does the patella usually luxate in toy breeds?", "Medially."]],
    ["hindlimb", "pelvic limb", "femur", "stifle", "cruciate", "tplo", "patella", "hock", "tibia"]),
  heart: s("thorax", "Heart", "Lies between the 3rd and 6th ribs. Normal resting heart rate: dog 60–140 bpm (smaller dogs faster), cat 140–220.",
    ["**Myxomatous mitral valve disease** is the commonest acquired heart disease in dogs (Cavalier King Charles spaniels).", "**Dilated cardiomyopathy** in large breeds (Dobermann); **hypertrophic cardiomyopathy** is the commonest in cats.", "Vertebral heart score (VHS) on lateral X-ray: normal ≤10.5 vertebrae in most dogs."],
    [["What is the commonest acquired heart disease in dogs?", "Myxomatous mitral valve disease (degenerative mitral valve disease)."], ["What is the commonest cardiomyopathy in cats?", "Hypertrophic cardiomyopathy."], ["What is a normal vertebral heart score in most dogs?", "Up to about 10.5."]],
    ["heart", "cardiac", "mitral", "cardiomyopathy", "murmur", "vhs"]),
  lungs: s("thorax", "Lungs", "Deeply lobed: right lung cranial, middle, caudal and accessory lobes; left lung cranial (two parts) and caudal lobes.",
    ["Normal respiratory rate at rest: dog 10–30, cat 20–30 breaths per minute. A **sleeping respiratory rate** over 30 suggests heart failure.", "The mediastinum is thin and often fenestrated in dogs, so a pneumothorax is often bilateral.", "Lung lobe torsion most often affects the right middle lobe in large deep-chested dogs."],
    [["What sleeping respiratory rate suggests congestive heart failure?", "Over 30 breaths per minute."], ["Why is a pneumothorax often bilateral in dogs?", "The mediastinum is thin and fenestrated."], ["Name the lobes of the dog's right lung.", "Cranial, middle, caudal and accessory."]],
    ["lung", "pulmonary", "respiratory", "pneumothorax", "breathing"]),
  trachea: s("thorax", "Trachea", "C-shaped cartilage rings with the trachealis muscle dorsally, running from the larynx to the carina at about the 5th intercostal space.",
    ["**Tracheal collapse** in toy breeds causes a 'goose honk' cough.", "Kennel cough (infectious tracheobronchitis): Bordetella bronchiseptica and canine parainfluenza virus.", "Endotracheal tube cuffs are inflated carefully in cats to avoid tracheal rupture."],
    [["What causes a 'goose honk' cough in a Yorkshire terrier?", "Tracheal collapse."], ["Name two agents of kennel cough.", "Bordetella bronchiseptica and canine parainfluenza virus."], ["Why is ET cuff inflation a concern in cats?", "Over-inflation can rupture the trachea."]],
    ["trachea", "tracheal", "cough", "bordetella"]),
  stomach: s("abdomen", "Stomach", "A simple stomach on the left of the cranial abdomen (compare the ruminant's four compartments: rumen, reticulum, omasum, abomasum).",
    ["**Gastric dilatation–volvulus (GDV)** in deep-chested dogs: unproductive retching, distension, shock. A surgical emergency: decompress, then gastropexy.", "The horse can't vomit (strong cardiac sphincter); rats can't either.", "Foreign bodies often lodge at the pylorus or in the small intestine."],
    [["Which dogs are at risk of GDV and how does it present?", "Large, deep-chested breeds; non-productive retching, abdominal distension, hypersalivation and shock."], ["What are the four compartments of the ruminant stomach?", "Rumen, reticulum, omasum and abomasum (the true stomach)."], ["Why can't horses vomit?", "Their cardiac sphincter is very strong and the oesophagus enters at an angle."]],
    ["stomach", "gastric", "gdv", "bloat", "rumen", "abomasum", "vomit"]),
  liver: s("abdomen", "Liver", "Six lobes in the dog, lying against the diaphragm. It makes bile (stored in the gallbladder; horses and rats have none).",
    ["**Portosystemic shunts** (congenital: intrahepatic in large breeds, extrahepatic in small breeds) cause hepatic encephalopathy and stunting.", "Bile acid stimulation test assesses hepatic function.", "Paracetamol is toxic to cats (deficient glucuronidation), causing methaemoglobinaemia."],
    [["Which species lack a gallbladder?", "Horses (and rats, deer)."], ["Where are congenital portosystemic shunts in small vs large dogs?", "Small breeds: extrahepatic. Large breeds: intrahepatic."], ["Why is paracetamol toxic to cats?", "Cats lack enough glucuronyl transferase, so toxic metabolites build up, causing methaemoglobinaemia and liver damage."]],
    ["liver", "hepat", "shunt", "bile", "jaundice", "icterus"]),
  intestines: s("abdomen", "Intestines", "Duodenum, jejunum and ileum; then caecum, colon, rectum. Dogs have a short gut (omnivore/carnivore), horses a huge hindgut fermenter.",
    ["Intussusception is common in puppies, often at the ileocolic junction.", "**Parvovirus** destroys crypt cells: haemorrhagic diarrhoea and neutropenia in unvaccinated puppies.", "The horse's large colon is the site of most colics (displacement, impaction, torsion)."],
    [["Which virus causes haemorrhagic diarrhoea and neutropenia in puppies?", "Canine parvovirus."], ["Where does intussusception usually happen in young dogs?", "At the ileocolic junction."], ["What kind of digestive system does a horse have?", "A hindgut fermenter (large caecum and colon)."]],
    ["intestin", "bowel", "colon", "parvo", "diarrhoea", "colic", "duoden"]),
  spleen: s("abdomen", "Spleen", "A long, tongue-shaped organ along the greater curvature of the stomach, storing red cells and filtering blood.",
    ["**Splenic haemangiosarcoma** in older large-breed dogs (German shepherds) can rupture: collapse with haemoabdomen.", "The 'double two-thirds rule': about ⅔ of splenic masses are malignant, ⅔ of those haemangiosarcoma.", "It contracts under stress or exercise, releasing red cells (very marked in horses)."],
    [["What tumour often causes a ruptured spleen in older German shepherds?", "Haemangiosarcoma."], ["What is the double two-thirds rule?", "About two-thirds of canine splenic masses are malignant, and two-thirds of those are haemangiosarcoma."], ["Why can PCV rise after exercise in horses?", "Splenic contraction releases stored red cells."]],
    ["spleen", "splen", "haemangiosarcoma", "haemoabdomen"]),
  kidneys: s("urogenital", "Kidneys", "Bean-shaped, retroperitoneal; the right is more cranial. Cattle kidneys are lobulated; the horse's right kidney is heart-shaped.",
    ["**Chronic kidney disease** is very common in older cats: IRIS staging by creatinine or SDMA.", "Lily ingestion causes acute kidney injury in cats; grapes and raisins in dogs.", "Ethylene glycol (antifreeze) causes AKI with calcium oxalate crystals."],
    [["How is CKD staged in cats and dogs?", "IRIS staging, by blood creatinine (or SDMA), then substaged by proteinuria and blood pressure."], ["Which plant causes AKI in cats?", "Lilies (Lilium and Hemerocallis species)."], ["Which crystals suggest ethylene glycol poisoning?", "Calcium oxalate monohydrate crystals."]],
    ["kidney", "renal", "ckd", "aki", "sdma", "creatinine"]),
  bladder: s("urogenital", "Bladder", "Lies in the caudal abdomen when full. Urine is sampled by cystocentesis.",
    ["**Feline lower urinary tract disease (FLUTD)**: idiopathic cystitis, urolithiasis, urethral plugs. A blocked male cat is an emergency (hyperkalaemia).", "Struvite and calcium oxalate are the commonest uroliths in dogs and cats; Dalmatians form urate stones.", "Cystocentesis gives the best sample for culture."],
    [["Why is a blocked male cat an emergency?", "Post-renal AKI causes life-threatening hyperkalaemia and bradycardia."], ["Which breed is prone to urate stones?", "Dalmatians (a defect in uric acid metabolism)."], ["Which urine sampling method is best for culture?", "Cystocentesis."]],
    ["bladder", "urolith", "cystitis", "flutd", "urine", "cystocentesis"]),
  brain: s("nervous", "Brain", "Cerebrum, cerebellum and brainstem, smaller relative to body size than ours. The olfactory bulbs are very large.",
    ["**Idiopathic epilepsy** typically starts at 6 months–6 years; treated with phenobarbital, imepitoin or levetiracetam.", "Signs localise: forebrain (seizures, circling towards the lesion, behaviour change), vestibular (head tilt, nystagmus), cerebellar (ataxia, intention tremor).", "Cerebellar hypoplasia in kittens follows in-utero feline panleukopenia infection."],
    [["At what age does idiopathic epilepsy usually start in dogs?", "Between 6 months and 6 years."], ["Which way does a dog with a forebrain lesion circle?", "Towards the side of the lesion."], ["What causes cerebellar hypoplasia in kittens?", "Feline panleukopenia (parvovirus) infection in utero or neonatally."]],
    ["brain", "epilepsy", "seizure", "cerebell", "vestibular", "neurolog"]),
  spinalCord: s("nervous", "Spinal cord", "Runs in the vertebral canal, ending at about L6–L7 in dogs and further caudally (to the sacrum) in cats.",
    ["Neurolocalisation divides the cord into **C1–C5, C6–T2, T3–L3 and L4–S3** segments.", "T3–L3 lesions: UMN signs in the hind limbs (normal or increased reflexes); L4–S3: LMN signs.", "Deep pain perception in the hind limbs is the key prognostic sign after a disc extrusion."],
    [["Name the four spinal cord neurolocalisation segments.", "C1–C5, C6–T2, T3–L3, L4–S3."], ["A dog has hind limb paralysis with normal reflexes. Where is the lesion?", "T3–L3 (upper motor neuron signs in the hind limbs)."], ["What is the key prognostic sign after a disc extrusion?", "Presence of deep pain perception."]],
    ["spinal cord", "paraly", "paresis", "deep pain", "neurolocal"]),
};

const NOTES = {
  skeletal: { title: "The skeleton across species", lead: "Comparative osteology: the same plan of bones, adapted for running (horse), digging and chasing (dog), and bulk (cow). Breed and species differences explain much of orthopaedic disease.",
    sections: [
      ["Vertebral formulae", "- Dog and cat: C7, T13, L7, S3, Cd 20–23.", "- Horse: C7, T18, L6, S5, Cd 15–21.", "- Cow: C7, T13, L6, S5, Cd 18–20. Pig: C7, T14–15, L6–7, S4.", "> Every mammal (bar sloths and manatees) has seven cervical vertebrae, even the giraffe."],
      ["The forelimb", "- No functional clavicle in dogs, horses or cattle (cats have a small one), allowing a long stride.", "- Stance: plantigrade (humans, bears), digitigrade (dogs, cats), unguligrade (horses, cattle).", "- The horse stands on digit III; cattle on III and IV.", "! Large-breed puppies: avoid excess calcium and rapid growth, which worsen elbow and hip dysplasia and OCD."],
      ["The hindlimb", "- Stifle = knee; hock = tarsus. The equine stay apparatus lets horses sleep standing.", "- Cranial cruciate disease is degenerative in most dogs; overweight and neutered large breeds at higher risk.", "- Surgical options: TPLO (changes the tibial plateau angle), TTA, lateral suture for small dogs."],
      ["Skull and teeth", "- Dog 42 permanent teeth, cat 30, horse 36–44, cattle 32 (no upper incisors: a dental pad).", "- Horses' teeth erupt continuously (hypsodont), so they need rasping for sharp enamel points.", "- Rabbits' teeth grow throughout life (aradicular hypsodont): malocclusion is common."],
    ] },
  thorax: { title: "The thorax: heart and lungs", lead: "Clinical exam of the chest is listening and counting: heart rate and rhythm, murmurs, respiratory rate and effort. Species and breed shape the normal values and the common diseases.",
    sections: [
      ["Normal values", "- Heart rate: dog 60–140, cat 140–220, horse 28–44, cow 48–84 bpm.", "- Respiratory rate: dog 10–30, cat 20–30, horse 8–16, cow 15–35 breaths/min.", "- Temperature: dog 38.3–39.2 °C, cat 38.1–39.2, horse 37.5–38.5, cow 38.0–39.3."],
      ["Heart disease", "- Dogs: myxomatous mitral valve disease (small breeds, CKCS), DCM (Dobermann, Great Dane), congenital PDA, pulmonic and subaortic stenosis.", "- Cats: HCM; often silent until heart failure or aortic thromboembolism (painful, cold hind limbs).", "- Treatment of MMVD stage B2: pimobendan delays the onset of heart failure (EPIC trial).", "! Congestive heart failure: furosemide, oxygen, pimobendan; monitor the sleeping respiratory rate at home."],
      ["Respiratory disease", "- Upper airway (stertor, stridor): BOAS, laryngeal paralysis (old labradors).", "- Lower airway (cough, wheeze): feline asthma, chronic bronchitis, kennel cough.", "- Pleural space (rapid shallow breathing, muffled sounds): effusion, pneumothorax; tap first, image later if unstable."],
      ["Comparative anatomy", "- Horses have no lung lobation visible externally; cattle and pigs have a tracheal bronchus to the right cranial lobe.", "- Cattle have a well-developed lobular pattern and little collateral ventilation: bovine respiratory disease spreads poorly between lobules but consolidates them."],
    ] },
  abdomen: { title: "The abdomen and digestion", lead: "Simple-stomached carnivores, hindgut-fermenting horses and foregut-fermenting ruminants digest food very differently, and get very different diseases.",
    sections: [
      ["Species strategies", "- Dog and cat: short gut, simple stomach. Cats are obligate carnivores: they need taurine, arachidonic acid and preformed vitamin A.", "- Horse: hindgut fermenter (caecum and large colon), small stomach, no gallbladder.", "- Ruminant: foregut fermenter; microbes in the rumen make volatile fatty acids (the cow's main energy source)."],
      ["Emergencies", "- GDV (dog): stabilise with fluids, decompress, then surgery and gastropexy.", "- Colic (horse): pain, heart rate >60, gut sounds, rectal exam, nasogastric reflux; surgical vs medical.", "- Bloat (cattle): frothy (legumes) or free gas; pass a stomach tube, antifoaming agents.", "! Foreign bodies in cats are often linear (string, tinsel): never pull string from the mouth or anus."],
      ["Liver and pancreas", "- Feline hepatic lipidosis after anorexia in overweight cats: feed via a tube.", "- Pancreatitis in dogs after fatty meals; diagnose with canine pancreatic lipase immunoreactivity (cPLI).", "- Exocrine pancreatic insufficiency in German shepherds: weight loss with a good appetite, fatty faeces; low TLI."],
      ["Spleen", "- Splenomegaly can be diffuse (sedation, congestion, infection, lymphoma) or focal (haematoma, haemangiosarcoma).", "- Splenectomy is well tolerated in dogs; send the spleen for histopathology."],
    ] },
  urogenital: { title: "The urinary system", lead: "Kidney disease is one of the commonest problems of older cats and dogs, and urinary obstruction one of the commonest emergencies in male cats.",
    sections: [
      ["Kidney function and disease", "- Markers: creatinine, SDMA (rises earlier), urine specific gravity (dogs >1.030, cats >1.035 = concentrating).", "- IRIS staging guides diet (renal diets with low phosphate), blood pressure control (amlodipine in cats) and proteinuria treatment (benazepril, telmisartan).", "- Toxins: NSAIDs, ethylene glycol, lilies (cats), grapes and raisins (dogs)."],
      ["The blocked cat", "- Stranguria, vocalising, a hard painful bladder.", "- Bloods: hyperkalaemia, azotaemia. ECG: bradycardia, tall T waves.", "! Stabilise first (IV fluids, calcium gluconate if severe hyperkalaemia, analgesia), then unblock under sedation."],
      ["Uroliths", "- Struvite: alkaline urine, often dissolvable with diet (dogs: usually with a urease-positive infection).", "- Calcium oxalate: acidic urine, must be removed surgically.", "- Urate: Dalmatians, portosystemic shunts. Cystine: some male dogs (genetic)."],
    ] },
  nervous: { title: "The nervous system", lead: "Neurology in animals is localisation first: where is the lesion, then what is it. The neurological exam (mentation, gait, postural reactions, cranial nerves, spinal reflexes, pain) builds the answer.",
    sections: [
      ["Localisation", "- Forebrain: seizures, altered behaviour, circling, contralateral postural deficits with a normal gait.", "- Brainstem: altered consciousness, multiple cranial nerve deficits, ipsilateral paresis.", "- Vestibular: head tilt, nystagmus, falling; central vs peripheral (central has postural deficits and vertical nystagmus).", "- Cerebellum: ataxia, hypermetria, intention tremor, normal strength."],
      ["Spinal cord", "- C1–C5: UMN to all four limbs. C6–T2: LMN forelimbs, UMN hind limbs.", "- T3–L3: normal forelimbs, UMN hind limbs; Schiff–Sherrington posture (forelimb extensor rigidity) with acute severe lesions.", "- L4–S3: LMN hind limbs, tail and bladder.", "! Loss of deep pain perception after an acute disc extrusion: surgery within hours gives the best chance."],
      ["Seizures", "- Causes: extracranial (hypoglycaemia, hepatic encephalopathy, toxins), intracranial structural, idiopathic.", "- Status epilepticus (>5 minutes): diazepam or midazolam IV or intranasal, then a maintenance drug."],
    ] },
};

export default {
  title: "The dog in 3D", kicker: "3D veterinary anatomy",
  intro: { title: "Explore the dog", text: "Skeleton, thorax, abdomen, urinary and nervous systems, with the heart beating and the lungs breathing. Click anything for its comparative anatomy and common diseases, and read the full notes for each system below." },
  trueColour: true,   // anatomy keeps its own tissue colours
  groups: GROUPS, structures: STRUCTURES, notes: NOTES, calloutName: "Clinical",
  quiz: "find the structure",
  motion: "Heartbeat and breathing",
  camera: { pos: [1.5, 0.75, 1.2], target: [0, 0.4, 0], min: 0.05, max: 4 },
  views: { Side: [[1.8, 0.5, 0], [0, 0.4, 0]], Front: [[0.2, 0.6, 1.6], [0, 0.45, 0.2]], Above: [[0.3, 1.8, 0.1], [0, 0.4, 0]], Head: [[0.45, 0.78, 0.85], [0, 0.7, 0.55]], Chest: [[0.75, 0.5, 0.35], [0, 0.42, 0.2]], Abdomen: [[0.75, 0.45, -0.1], [0, 0.42, -0.05]] },
  sliders: [{ key: "skin", label: "Coat", value: 40 }],
  platform: { r: 0.62 },
  labelMax: 0.4,
  build(k) {
    const { THREE, V, holo, mat, bone, limb, tube, taper, blob, add, decor } = k;
    const L = [-1, 1], b = bone();
    // the holographic body (head towards +z)
    const skinMat = holo("#a87d58", "#3a2818", 0.4), skin = new THREE.Group();   // the coat, see-through
    const torso = new THREE.Mesh(blob(0.15, 0.95, 1.05, 2.6, (v) => { if (v.z < -0.1) { const q = 1 + (v.z + 0.1) * 1.6; v.x *= q; v.y = v.y * q + (1 - q) * 0.03; } if (v.y < -0.05 && v.z > -0.1 && v.z < 0.15) v.y -= 0.03; }, 96), skinMat); torso.position.set(0, 0.47, 0); skin.add(torso);
    skin.add(limb(V(0, 0.52, 0.3), V(0, 0.66, 0.47), 0.075, skinMat));
    const head = new THREE.Mesh(blob(0.085, 0.9, 0.9, 1.1), skinMat); head.position.set(0, 0.71, 0.55); skin.add(head);
    skin.add(limb(V(0, 0.68, 0.6), V(0, 0.65, 0.76), 0.042, skinMat));
    for (const sd of L) { const ear = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.08, 16), skinMat); ear.position.set(sd * 0.05, 0.8, 0.51); ear.rotation.z = sd * -0.4; skin.add(ear); }
    for (const sd of L) for (const z of [0.27, -0.3]) {
      skin.add(limb(V(sd * 0.08, 0.45, z), V(sd * 0.085, 0.24, z + (z > 0 ? 0 : -0.04)), 0.04, skinMat));
      skin.add(limb(V(sd * 0.085, 0.24, z + (z > 0 ? 0 : -0.04)), V(sd * 0.085, 0.03, z + (z > 0 ? 0.02 : 0.0)), 0.026, skinMat));
    }
    skin.add(taper([V(0, 0.5, -0.38), V(0, 0.56, -0.5), V(0, 0.62, -0.62)], 0.025, 0.01, skinMat, 24));
    decor(skin);
    k.slider("skin", (v) => { skinMat.uniforms.uOpacity.value = v; skin.visible = v > 0; });

    // skeleton
    const skull = new THREE.Mesh(blob(0.062, 0.85, 0.8, 1.15), b); skull.position.set(0, 0.72, 0.53); add("skull", skull);
    add("skull", taper([V(0, 0.71, 0.58), V(0, 0.685, 0.68), V(0, 0.665, 0.78)], 0.035, 0.018, b, 24));
    add("skull", tube([V(-0.035, 0.66, 0.5), V(-0.025, 0.64, 0.62), V(0, 0.635, 0.77), V(0.025, 0.64, 0.62), V(0.035, 0.66, 0.5)], 0.008, b, 48));
    const spinePts = [V(0, 0.66, 0.46), V(0, 0.6, 0.38), V(0, 0.56, 0.28), V(0, 0.57, 0.1), V(0, 0.57, -0.1), V(0, 0.55, -0.26), V(0, 0.52, -0.36), V(0, 0.56, -0.5), V(0, 0.62, -0.62)];
    const curve = new THREE.CatmullRomCurve3(spinePts);
    for (let i = 0; i < 46; i++) { const t = i / 45, p = curve.getPointAt(t), tan = curve.getTangentAt(t), r = t > 0.82 ? 0.012 - (t - 0.82) * 0.04 : 0.016; const v = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.016, 16), b); v.position.copy(p); v.quaternion.setFromUnitVectors(V(0, 1, 0), tan); add("spine", v); }
    for (let i = 0; i < 13; i++) {
      const z = 0.3 - i * 0.026, h = 0.12 + Math.sin((i / 12) * Math.PI) * 0.05, w = 0.1 + Math.sin((i / 12) * Math.PI * 0.8) * 0.04;
      for (const sd of L) { const pts = []; for (let j = 0; j <= 12; j++) { const a = (j / 12) * Math.PI * (i < 9 ? 0.98 : 0.8); pts.push(V(sd * Math.sin(a) * w, 0.565 - (1 - Math.cos(a)) * h * 0.95, z - j * 0.004)); } add("ribs", tube(pts, 0.005, b, 24)); }
    }
    add("ribs", tube([V(0, 0.36, 0.3), V(0, 0.33, 0.2), V(0, 0.34, 0.05)], 0.008, b, 24));
    for (const sd of L) {
      const sc = new THREE.Mesh(blob(0.052, 0.22, 1, 0.65), b); sc.position.set(sd * 0.095, 0.5, 0.3); sc.rotation.x = -0.35; add("forelimb", sc);
      add("forelimb", limb(V(sd * 0.095, 0.44, 0.33), V(sd * 0.085, 0.3, 0.26), 0.012, b));
      add("forelimb", limb(V(sd * 0.085, 0.3, 0.26), V(sd * 0.085, 0.07, 0.28), 0.009, b));
      add("forelimb", limb(V(sd * 0.085, 0.07, 0.28), V(sd * 0.085, 0.015, 0.31), 0.008, b));
      const pel = new THREE.Mesh(blob(0.045, 0.3, 0.6, 1.4), b); pel.position.set(sd * 0.06, 0.52, -0.31); pel.rotation.x = 0.3; add("pelvis", pel);
      add("hindlimb", limb(V(sd * 0.075, 0.47, -0.32), V(sd * 0.085, 0.3, -0.24), 0.012, b));
      add("hindlimb", limb(V(sd * 0.085, 0.3, -0.24), V(sd * 0.085, 0.15, -0.36), 0.01, b));
      add("hindlimb", limb(V(sd * 0.085, 0.15, -0.36), V(sd * 0.085, 0.02, -0.32), 0.008, b));
      const pat = new THREE.Mesh(new THREE.SphereGeometry(0.01, 16, 16), b); pat.position.set(sd * 0.085, 0.31, -0.225); add("hindlimb", pat);
    }

    // thorax
    const heart = new THREE.Mesh(blob(0.045, 1, 1.15, 0.9, (v) => { if (v.y < 0) { const q = 1 + v.y * 10; v.x *= q; v.z *= q; } }), mat("#b3202f", { detail: "fibre", repeat: 2 })); heart.position.set(0.01, 0.42, 0.21); heart.rotation.x = 0.6; add("heart", heart);
    const lungMat = mat("#f39aac", { repeat: 6, roughness: 0.6, sheen: 0.6 }), lungs = [];
    for (const sd of L) { const lu = new THREE.Mesh(blob(0.07, 1, 1.4, 1.9, (v) => { if (v.x * sd < 0) v.x *= 0.4; }), lungMat); lu.position.set(sd * 0.055, 0.47, 0.17); add("lungs", lu); lungs.push(lu); }
    add("trachea", tube([V(0, 0.64, 0.5), V(0, 0.56, 0.4), V(0, 0.5, 0.3), V(0, 0.49, 0.24)], 0.011, mat("#9fd8ff", { detail: "none" }), 48));
    // abdomen
    const st = new THREE.Mesh(blob(0.06, 1.2, 0.9, 1, (v) => { if (v.x < 0) v.y *= 0.7; }), mat("#f2a07b", { detail: "fold", repeat: 3 })); st.position.set(0.04, 0.46, 0.04); add("stomach", st);
    const liver = new THREE.Mesh(blob(0.09, 1.2, 0.85, 0.45), mat("#7d2626", { roughness: 0.3, clearcoat: 0.9 })); liver.position.set(-0.01, 0.46, 0.1); add("liver", liver);
    const spl = new THREE.Mesh(blob(0.06, 0.25, 0.25, 1.4), mat("#6b2a4a", { clearcoat: 0.9 })); spl.position.set(0.1, 0.4, 0.0); spl.rotation.y = 0.3; add("spleen", spl);
    const coils = []; for (let i = 0; i <= 160; i++) { const t = i / 160; coils.push(V(Math.sin(t * 30) * 0.07, 0.38 + Math.sin(t * 21) * 0.03, -0.02 - t * 0.2 + Math.cos(t * 30) * 0.03)); }
    add("intestines", tube(coils, 0.011, mat("#f2b0a0", { repeat: 8 }), 700));
    for (const sd of L) { const kd = new THREE.Mesh(blob(0.025, 0.8, 0.75, 1.6), mat("#9a4a36", { clearcoat: 0.9 })); kd.position.set(sd * 0.05, 0.52, sd < 0 ? -0.04 : -0.07); add("kidneys", kd); }
    const bl = new THREE.Mesh(blob(0.035, 1, 1, 1.3), mat("#d9b8ff", { transmission: 0.25, thickness: 0.03 })); bl.position.set(0, 0.4, -0.27); add("bladder", bl);
    // nervous
    const brain = new THREE.Mesh(blob(0.05, 0.9, 0.75, 1.2, (v) => { v.multiplyScalar(1 + Math.sin(v.x * 180) * Math.sin(v.z * 160) * 0.03); }), mat("#f2b4c4", { detail: "fold", repeat: 3, bump: 2 })); brain.position.set(0, 0.73, 0.52); add("brain", brain);
    const cord = spinePts.slice(0, 7).map((p) => p.clone().add(V(0, 0.002, 0)));
    add("spinalCord", tube(cord, 0.006, mat("#ffe066", { detail: "none", emissive: new THREE.Color("#4a3c00") }), 96));
    k.flow([cord], "#fff3a0", 20, 0.4, "nervous", 0.01);
    k.tick((t, dt, motion) => {
      if (!motion) return;
      heart.scale.setScalar(1 + Math.max(0, Math.sin(t * 8)) ** 8 * 0.09);
      const br = Math.sin(t * 1.6) * 0.04; lungs.forEach((l) => l.scale.set(1 + br * 0.6, 1 + br, 1 + br * 0.5));
    });
  },
};
