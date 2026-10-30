// SportGradify's 3D model: the muscles of the body from real scan data (BodyParts3D via
// open-anatomy-3d, CC BY 4.0), shown as a muscle figure like a sports science atlas, with the
// joints that act as levers and the heart and lungs that power them. Notes cover muscle physiology,
// training principles, biomechanics and energy systems.
import { loadAnatomy, take, ATTRIBUTION } from "./anatomy-glb.js";

const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  upper: { name: "Upper body", c: "#ff6b5e" },
  core: { name: "Core", c: "#ffb36b" },
  lower: { name: "Lower body", c: "#f055dd" },
  joints: { name: "Joints & levers", c: "#e9e3d3" },
  engine: { name: "Heart & lungs", c: "#5ef0ff" },
};

const STRUCTURES = {
  deltoid: s("upper", "Deltoid", "Caps the shoulder. Anterior fibres flex, middle fibres abduct and posterior fibres extend the arm.",
    ["Prime mover in the overhead press and the lateral raise.", "In sprinting, the arm drive (shoulder flexion and extension) balances the rotation of the legs.", "Shoulder impingement often comes from weak rotator cuff and scapular control, not the deltoid itself."],
    [["What movement do the middle deltoid fibres produce?", "Abduction of the arm at the shoulder."], ["Which deltoid fibres are the agonist in a front raise?", "The anterior fibres (shoulder flexion)."], ["Why does arm drive matter in sprinting?", "It counterbalances the rotation from the legs, keeping the trunk stable."]],
    ["deltoid", "shoulder", "press", "abduction"]),
  pectoralis: s("upper", "Pectoralis major", "The chest muscle: horizontal flexion (adduction) and medial rotation of the shoulder.",
    ["Agonist in the bench press and press-up (upward phase: concentric).", "In a press-up's downward phase, the pectorals work **eccentrically** to control the descent.", "Antagonist pair: pectoralis major and trapezius/rhomboids in horizontal flexion and extension."],
    [["What type of contraction do the pectorals perform lowering into a press-up?", "Eccentric (lengthening under tension)."], ["What is pectoralis major's main action?", "Horizontal flexion (adduction) and medial rotation of the shoulder."], ["Which sports skill uses it powerfully?", "Throwing, the bench press, a forehand drive (any horizontal flexion)."]],
    ["pectoral", "chest", "bench press", "press-up", "push"]),
  biceps: s("upper", "Biceps and triceps", "The antagonist pair at the elbow: biceps brachii flexes it, triceps brachii extends it.",
    ["In a bicep curl: biceps is the agonist, triceps the antagonist; in the lowering phase biceps works eccentrically.", "The elbow is a **third-class lever**: effort (biceps insertion) between fulcrum (elbow) and load (hand). Big range and speed, low mechanical advantage.", "Triceps is the prime mover in a chest pass, dips and the throwing release."],
    [["In the upward phase of a bicep curl, what are the agonist and antagonist?", "Agonist: biceps brachii. Antagonist: triceps brachii."], ["What class of lever operates at the elbow in flexion?", "A third-class lever."], ["What is the advantage of a third-class lever?", "A large range of movement and speed (but low mechanical advantage)."]],
    ["biceps", "triceps", "elbow", "curl", "antagonist", "agonist"]),
  lats: s("upper", "Latissimus dorsi and trapezius", "The broad back muscles: lats adduct and extend the arm (pull-ups, swimming); trapezius moves and stabilises the scapula.",
    ["The lats are the main propulsion muscle in front crawl's pull phase.", "Trapezius elevates (shrug), retracts and rotates the scapula: essential for overhead movement.", "Poor scapular control is linked to shoulder injury in throwers and swimmers."],
    [["What actions does latissimus dorsi produce?", "Adduction, extension and medial rotation of the shoulder."], ["Which phase of front crawl relies on the lats?", "The pull (propulsive) phase."], ["What does the trapezius do to the scapula?", "Elevates, retracts, depresses and rotates it, and stabilises it."]],
    ["latissimus", "lats", "trapezius", "pull-up", "row", "back"]),
  abdominals: s("core", "Abdominals", "Rectus abdominis flexes the trunk; the obliques rotate and side-bend; transversus abdominis braces the core.",
    ["Bracing raises intra-abdominal pressure, stiffening the spine for heavy lifts.", "The obliques transfer force from the legs to the arms in throwing and striking (the kinetic chain).", "Rectus abdominis is the agonist in a sit-up (trunk flexion); erector spinae the antagonist."],
    [["Which muscle rotates the trunk in a golf swing?", "The obliques (internal and external)."], ["Why brace the core during a squat?", "To raise intra-abdominal pressure and stabilise the spine."], ["What is the kinetic chain?", "Sequential transfer of force from large to small body segments, legs → trunk → arms."]],
    ["abdominal", "core", "oblique", "rectus abdominis", "trunk", "kinetic chain"]),
  erector: s("core", "Erector spinae", "Columns of muscle along the spine that extend and stabilise it.",
    ["Agonist in the upward phase of a deadlift (with the glutes and hamstrings).", "Weak or fatigued erectors are linked to low back pain.", "Works isometrically to hold an upright posture."],
    [["What type of contraction does erector spinae perform to hold posture?", "Isometric."], ["Which muscles extend the hip and spine in a deadlift?", "Gluteus maximus, hamstrings and erector spinae."], ["What is erector spinae's main action?", "Extension of the spine."]],
    ["erector spinae", "lower back", "deadlift", "posture"]),
  glutes: s("lower", "Gluteals", "Gluteus maximus extends the hip (running, jumping, squatting); medius and minimus abduct it and keep the pelvis level.",
    ["Gluteus maximus is the largest muscle in the body.", "Weak gluteus medius lets the knee fall inward (valgus) when landing, a risk for ACL injury.", "Hip extension drives the drive phase of sprinting and the upward phase of a squat."],
    [["Which muscle is the main hip extensor?", "Gluteus maximus."], ["What does gluteus medius do in running?", "Abducts and stabilises the hip, keeping the pelvis level on one leg."], ["Why is glute strength linked to ACL injuries?", "Weak glutes allow knee valgus (collapsing inward) on landing."]],
    ["glute", "gluteus", "hip extension", "squat", "sprint"]),
  quadriceps: s("lower", "Quadriceps", "Four muscles at the front of the thigh that extend the knee; rectus femoris also flexes the hip.",
    ["Agonist in the upward phase of a squat (concentric) and controlling the descent (eccentric).", "Kicking a ball: quadriceps extend the knee; hamstrings are the antagonist.", "The patellar tendon transmits quad force: patellar tendinopathy (jumper's knee) is common in jumping sports."],
    [["Which muscle group is the agonist in knee extension?", "The quadriceps."], ["What type of contraction do the quads perform lowering into a squat?", "Eccentric."], ["What is jumper's knee?", "Patellar tendinopathy from repeated loading of the patellar tendon."]],
    ["quadriceps", "quad", "knee extension", "squat", "kick", "thigh"]),
  hamstrings: s("lower", "Hamstrings", "Three muscles at the back of the thigh that flex the knee and extend the hip.",
    ["**Hamstring strains** are the commonest injury in sprinting sports, usually late swing when they work eccentrically to slow the leg.", "Nordic curls (eccentric training) cut hamstring injuries by around half.", "Antagonist to the quadriceps at the knee."],
    [["When are hamstring strains most likely in sprinting?", "Late swing phase, when the hamstrings contract eccentrically to decelerate the lower leg."], ["Which exercise reduces hamstring injury risk?", "The Nordic hamstring curl (eccentric strengthening)."], ["What actions do the hamstrings perform?", "Knee flexion and hip extension."]],
    ["hamstring", "knee flexion", "strain", "nordic"]),
  calves: s("lower", "Gastrocnemius and soleus", "The calf muscles, joined by the Achilles tendon, plantarflex the ankle: the final push in running and jumping.",
    ["The ankle in plantarflexion is a **second-class lever**: load between fulcrum (ball of foot) and effort (Achilles insertion). High mechanical advantage.", "Soleus is mostly slow-twitch fibres; gastrocnemius has more fast-twitch.", "The Achilles stores and returns elastic energy in running (the stretch-shortening cycle)."],
    [["What class of lever works at the ankle in plantarflexion (going onto the toes)?", "Second-class lever."], ["Which calf muscle has more slow-twitch fibres?", "Soleus."], ["What is the stretch-shortening cycle?", "A rapid eccentric stretch followed by a concentric contraction, using stored elastic energy (plyometrics)."]],
    ["calf", "gastrocnemius", "soleus", "achilles", "plantarflex", "plyometric"]),
  shoulderJoint: s("joints", "Shoulder joint", "A ball-and-socket synovial joint: the most mobile joint, allowing flexion, extension, abduction, adduction, rotation and circumduction.",
    ["Stability comes from the rotator cuff muscles and the labrum, not the bones: it dislocates more than any other joint.", "Synovial joint features: articular cartilage, synovial membrane and fluid, joint capsule, ligaments.", "Warm-ups increase synovial fluid production and its viscosity falls, improving range."],
    [["What type of joint is the shoulder?", "A ball-and-socket synovial joint."], ["Name four features of a synovial joint.", "Articular cartilage, synovial membrane, synovial fluid, joint capsule (and ligaments, bursae)."], ["Why does warming up help the joints?", "More synovial fluid is released and it becomes less viscous, so movement is smoother."]],
    ["shoulder", "ball and socket", "synovial", "joint", "rotator cuff"]),
  knee: s("joints", "Knee joint", "A hinge synovial joint (flexion and extension) with menisci and cruciate ligaments for stability.",
    ["The **ACL** prevents the tibia sliding forward; it tears in cutting and landing, often without contact.", "Menisci absorb shock and deepen the joint surface.", "Knee extension in standing up from a squat is a third-class lever (as most joints)."],
    [["What does the anterior cruciate ligament do?", "Stops the tibia moving forward on the femur and limits rotation."], ["What is the role of the menisci?", "Shock absorption and improving the fit between femur and tibia."], ["What type of synovial joint is the knee?", "A hinge joint."]],
    ["knee", "hinge", "acl", "menisc", "ligament"]),
  hip: s("joints", "Hip joint", "A deep ball-and-socket joint that carries body weight and allows movement in all planes.",
    ["More stable than the shoulder because the acetabulum is deep.", "Planes and axes: flexion/extension in the sagittal plane about the transverse axis; abduction/adduction in the frontal plane about the sagittal axis; rotation in the transverse plane about the longitudinal axis.", "Hip flexors (iliopsoas) drive the knee forward in the recovery phase of sprinting."],
    [["Which plane and axis does a squat happen in?", "Sagittal plane, about the transverse (frontal) axis."], ["Which plane is a star jump in?", "The frontal plane, about the sagittal axis."], ["Why is the hip more stable than the shoulder?", "The acetabulum is a deep socket that encloses more of the femoral head."]],
    ["hip", "plane", "axis", "sagittal", "frontal", "transverse"]),
  heart: s("engine", "Heart", "Pumps blood to the working muscles. Cardiac output = stroke volume × heart rate, rising from about 5 L/min at rest to 20–40 L/min in exercise.",
    ["Endurance training causes **cardiac hypertrophy** (athlete's heart): bigger stroke volume, so a lower resting heart rate (bradycardia).", "Max heart rate ≈ 220 − age; training zones are percentages of it (Karvonen uses heart rate reserve).", "Starling's law: more venous return → more stretch → stronger contraction → bigger stroke volume."],
    [["Why do endurance athletes have a low resting heart rate?", "Cardiac hypertrophy increases stroke volume, so fewer beats are needed for the same cardiac output."], ["How is maximum heart rate estimated?", "220 minus age."], ["State Starling's law.", "Increased venous return stretches the ventricle more, producing a stronger contraction and larger stroke volume."]],
    ["heart", "cardiac output", "stroke volume", "heart rate", "bradycardia", "starling"]),
  lungs: s("engine", "Lungs", "Supply oxygen and remove CO₂. Minute ventilation = tidal volume × breathing rate, rising from about 6 to over 150 L/min.",
    ["**VO₂ max**: the maximum rate of oxygen uptake and use, the best single measure of aerobic fitness (ml/kg/min).", "Gas exchange happens by diffusion at the alveoli, down partial pressure gradients.", "Altitude training raises EPO and red cell mass, but benefits are small and individual."],
    [["What is VO₂ max?", "The maximum volume of oxygen the body can take in and use per minute, usually per kg of body mass."], ["What is minute ventilation?", "Tidal volume × breathing frequency."], ["How does oxygen move from alveoli to blood?", "By diffusion, down a partial pressure gradient."]],
    ["lung", "vo2", "ventilation", "tidal volume", "aerobic", "oxygen", "altitude"]),
};

const NOTES = {
  upper: { title: "Muscles of the upper body", lead: "For every movement, name the joint, the movement, the agonist, the antagonist and the type of contraction. That analysis is the core of applied anatomy in sport.",
    sections: [
      ["Muscle contraction types", "- **Isotonic concentric**: the muscle shortens under tension (lifting the bar).", "- **Isotonic eccentric**: it lengthens under tension (lowering the bar under control). Causes more muscle damage and DOMS.", "- **Isometric**: tension with no change in length (a plank, a rugby scrum).", "> The agonist produces the movement, the antagonist relaxes to allow it, fixators stabilise the origin."],
      ["Movement analysis examples", "- Bench press up: shoulder horizontal flexion (pectoralis major, anterior deltoid), elbow extension (triceps).", "- Pull-up: shoulder adduction/extension (latissimus dorsi), elbow flexion (biceps).", "- Overhead throw: shoulder medial rotation and extension, elbow extension, trunk rotation."],
      ["Muscle fibre types", "- **Type I** (slow oxidative): many mitochondria, myoglobin and capillaries; fatigue-resistant; endurance.", "- **Type IIa** (fast oxidative glycolytic): trainable for speed and endurance (800 m).", "- **Type IIx** (fast glycolytic): highest force, fastest fatigue; sprinting and lifting.", "> Fibre type proportions are largely genetic, but training can shift IIx towards IIa."],
    ] },
  core: { title: "The core and the kinetic chain", lead: "The trunk transfers force between the legs and arms and protects the spine. Strength is useless if it leaks through a weak core.",
    sections: [
      ["Core muscles", "- Rectus abdominis: trunk flexion. Obliques: rotation and lateral flexion. Transversus abdominis: bracing.", "- Erector spinae and multifidus: extension and segmental stability.", "- The diaphragm and pelvic floor complete the 'box' that raises intra-abdominal pressure."],
      ["Force transfer", "- The kinetic chain: legs → hips → trunk → shoulder → arm → hand → implement.", "- Summation of forces: each segment accelerates as the previous one slows, adding velocity (javelin, tennis serve, golf).", "- Ground reaction force: Newton's third law; pushing harder into the ground drives you faster."],
      ["Training the core", "- Anti-extension (planks, rollouts), anti-rotation (Pallof press), anti-lateral flexion (suitcase carries).", "- Sport-specific: rotational medicine-ball throws for racket and throwing sports.", "! Low back pain in athletes: check for spondylolysis (stress fracture) in young athletes in extension sports (gymnastics, fast bowling)."],
    ] },
  lower: { title: "Muscles of the lower body", lead: "The legs produce the force for running, jumping, kicking and changing direction. Most sports injuries happen here, and most can be reduced by targeted strength work.",
    sections: [
      ["Running gait", "- Stance: braking, then propulsion (glutes, quads, calves; ankle plantarflexion).", "- Swing: hip flexion (iliopsoas), knee flexion then extension; hamstrings decelerate the leg late in swing.", "- Elastic energy in the Achilles and arch returns up to half the energy of each stride."],
      ["Jumping and plyometrics", "- Countermovement jump: eccentric loading then rapid concentric extension at hip, knee and ankle (triple extension).", "- Plyometrics train the stretch-shortening cycle; short ground contact times, full recovery between sets.", "> Power = force × velocity. Train both ends: heavy strength and fast, light movements."],
      ["Injury prevention", "- Hamstrings: Nordic curls (FIFA 11+). ACL: landing technique, glute and hamstring strength, neuromuscular training.", "- Load management: acute:chronic workload ratio; spikes above about 1.5 raise injury risk.", "! RICE/PRICE for acute soft tissue injuries in the first 48–72 hours, then progressive loading (POLICE: optimal loading)."],
    ] },
  joints: { title: "Joints, levers, planes and axes", lead: "Biomechanics describes movement: what the joints allow, how the levers trade force for speed, and the planes and axes every movement happens in.",
    sections: [
      ["Synovial joints", "- Ball and socket (shoulder, hip), hinge (elbow, knee, ankle), pivot (atlantoaxial, radioulnar), condyloid (wrist), saddle (thumb), gliding (carpals).", "- Movements: flexion/extension, abduction/adduction, rotation, circumduction, plantarflexion/dorsiflexion, horizontal flexion/extension."],
      ["Levers", "- First class: fulcrum in the middle (neck extension heading a ball, triceps at the elbow).", "- Second class: load in the middle (calf raise, ankle plantarflexion). High mechanical advantage.", "- Third class: effort in the middle (most joints, e.g. biceps curl, knee extension). Range and speed.", "> Mechanical advantage = effort arm ÷ load arm. Above 1: second-class levers."],
      ["Planes and axes", "- Sagittal plane, transverse (frontal) axis: flexion and extension (running, squats, somersaults).", "- Frontal plane, sagittal axis: abduction and adduction (star jump, cartwheel).", "- Transverse plane, longitudinal axis: rotation (discus spin, full twist).", "> Mnemonic: sagittal plane goes with the transverse axis; transverse plane with the longitudinal axis; frontal plane with the sagittal axis."],
      ["Newton's laws and momentum", "- First (inertia), second (F = ma), third (equal and opposite reaction).", "- Impulse = force × time = change in momentum; 'giving' when catching extends time and reduces force."],
    ] },
  engine: { title: "Energy systems and the cardiorespiratory system", lead: "Every movement is powered by ATP. Which system resynthesises it depends on intensity and duration; how well the heart and lungs deliver oxygen decides how long you can keep going.",
    sections: [
      ["The three energy systems", "- **ATP-PC** (phosphocreatine): 0–10 s, maximal intensity, no oxygen, no fatigue by-products; recovers 50% in 30 s, ~100% in 3 min.", "- **Anaerobic glycolysis**: 10 s–3 min, high intensity; glucose → pyruvate → lactate (with H⁺ causing fatigue).", "- **Aerobic**: beyond 3 min; glycolysis, Krebs cycle, electron transport chain; 36–38 ATP per glucose; also uses fat.", "> All three work together all the time; the energy continuum describes which dominates."],
      ["Thresholds and recovery", "- Lactate threshold: the intensity where lactate starts to accumulate (about 50–60% VO₂ max untrained, up to 85–90% trained).", "- OBLA: onset of blood lactate accumulation at 4 mmol/L.", "- EPOC: excess post-exercise oxygen consumption, restoring PC, removing lactate, reoxygenating myoglobin, lowering temperature."],
      ["Cardiovascular responses", "- Anticipatory rise (adrenaline), then rapid rise in exercise, plateau in steady state, fall in recovery.", "- Vascular shunt: vasodilation to muscles, vasoconstriction to the gut and kidneys.", "- Training adaptations: bigger stroke volume, lower resting heart rate, more capillaries and mitochondria, higher VO₂ max."],
      ["Training principles", "- **SPORT**: specificity, progression, overload, reversibility, tedium.", "- **FITT**: frequency, intensity, time, type.", "- Periodisation: macrocycle (season), mesocycles (blocks), microcycles (weeks); taper before competition.", "! Overtraining syndrome: persistent fatigue, falling performance, raised resting heart rate, mood change, frequent illness. Treat with rest."],
    ] },
};

export default {
  title: "The athlete in 3D", kicker: "3D sport science",
  intro: { title: "Explore the athlete", text: "Every major muscle group from real anatomy scan data, the joints that act as levers, and the heart and lungs that power it all. Click any muscle for its role in movement and training, show the skeleton to see the joints, and read the full notes below." },
  trueColour: true,   // anatomy keeps its own tissue colours
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "In practice",
  quiz: "find the muscle or joint",
  motion: "Heartbeat and breathing",
  credit: ATTRIBUTION,
  camera: { pos: [1.0, 1.1, 3.2], target: [0, 0.92, 0], min: 0.05, max: 6 },
  views: { Front: [[0, 1.0, 3.4], [0, 0.92, 0]], Side: [[3.4, 1.0, 0], [0, 0.92, 0]], Back: [[0, 1.0, -3.4], [0, 0.92, 0]], Arms: [[0.9, 1.25, 1.1], [0.15, 1.2, 0]], Core: [[0.3, 1.1, 1.1], [0, 1.08, 0]], Legs: [[0.9, 0.5, 1.4], [0.05, 0.5, 0]] },
  sliders: [{ key: "skin", label: "Skin", value: 0 }],
  labelMax: 0.6,
  async build(k) {
    const { THREE, add, decor } = k;
    const { byKey } = await loadAnatomy();
    const mat = (c, o = {}) => k.mat(c, { sheen: 0.35, ...o, emissive: new THREE.Color("#000000"), side: THREE.DoubleSide });
    const muscle = mat("#b03a30", { detail: "fibre", repeat: 1, bump: 1.5, roughness: 0.5, clearcoat: 0.45 });
    const bone = Object.assign(k.bone("#e6d9bd"), { side: THREE.DoubleSide });
    const both = (n) => [`${n}_l`, `${n}_r`];
    const MAP = {
      deltoid: [both("deltoid"), muscle], pectoralis: [both("chest_muscles"), muscle], biceps: [[...both("upper_arm_muscles"), ...both("forearm_muscles"), ...both("hand_muscles")], muscle],
      lats: [[...both("trapezius"), ...both("back_muscles"), ...both("shoulder_muscles"), ...both("rotator_cuff")], muscle], abdominals: [["abdominal_muscles", ...both("intercostals")], muscle],
      erector: [[...both("neck_muscles"), "diaphragm"], muscle], glutes: [[...both("gluteal"), ...both("iliopsoas"), "pelvic_floor"], muscle],
      quadriceps: [[...both("quadriceps"), ...both("adductors")], muscle], hamstrings: [both("hamstrings"), muscle], calves: [[...both("calf"), ...both("shin_muscles"), ...both("foot_muscles")], muscle],
      shoulderJoint: [[...both("scapula"), ...both("clavicle"), ...both("humerus")], bone], hip: [["pelvis", ...both("femur")], bone], knee: [[...both("patella"), ...both("lower_leg")], bone],
      heart: [["heart"], mat("#8f2a26", { detail: "fibre", repeat: 1, bump: 0.7, clearcoat: 0.6 })], lungs: [both("lung"), mat("#d18882", { repeat: 1, bump: 0.7, roughness: 0.5 })],
    };
    const parts = {};
    for (const [id, [keys, m]] of Object.entries(MAP)) for (const key of keys) for (const mesh of take(byKey, key)) { mesh.material = m; add(id, mesh); (parts[id] ||= []).push(mesh); }
    // the rest of the skeleton, the head and the vessels, shown but not taught here
    for (const key of ["skull", "mandible", "teeth", "spine_cervical", "spine_thoracic", "spine_lumbar", "ribs_l", "ribs_r", "sternum", ...both("forearm"), ...both("hand"), ...both("foot")]) for (const mesh of take(byKey, key)) { mesh.material = bone; decor(mesh, "joints"); }
    const vessel = (c) => mat(c, { detail: "none", roughness: 0.35, clearcoat: 0.6 });
    for (const key of Object.keys(byKey).filter((x) => /^(arteries|aorta|carotid)/.test(x))) for (const mesh of take(byKey, key)) { mesh.material = vessel("#c0282c"); decor(mesh, "engine"); }
    for (const key of Object.keys(byKey).filter((x) => /^(veins|vena)/.test(x))) for (const mesh of take(byKey, key)) { mesh.material = vessel("#34519c"); decor(mesh, "engine"); }
    const skinMat = new THREE.MeshPhysicalMaterial({ color: "#d4a184", roughness: 0.55, sheen: 0.7, sheenColor: new THREE.Color("#ffd6c2"), transparent: true, opacity: 0.3, depthWrite: false, depthFunc: THREE.LessEqualDepth });
    const skin = new THREE.Group(), depthOnly = new THREE.MeshBasicMaterial({ colorWrite: false });
    for (const mesh of take(byKey, "skin")) { mesh.material = skinMat; mesh.renderOrder = 2; skin.add(mesh); const pre = new THREE.Mesh(mesh.geometry, depthOnly); pre.position.copy(mesh.position); pre.renderOrder = 1; skin.add(pre); }
    decor(skin);
    k.slider("skin", (v) => { skinMat.opacity = v; skin.visible = v > 0; });
    const heart = parts.heart || [], lungs = parts.lungs || [];
    k.tick((t, dt, motion) => {
      if (!motion) return;
      const beat = 1 + Math.max(0, Math.sin(t * 12)) ** 8 * 0.07;   // a training heart rate
      heart.forEach((m) => m.scale.setScalar(beat));
      const br = Math.sin(t * 2.6) * 0.03; lungs.forEach((m) => m.scale.set(1 + br * 0.6, 1 + br, 1 + br * 0.8));
    });
  },
};
