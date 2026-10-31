// Individual muscles inside the anatomy model's muscle-group meshes.
//
// The BodyParts3D model (via open-anatomy-3d) ships each muscle group as one mesh, but most group
// meshes are made of separate, unconnected surfaces: one per original BodyParts3D muscle or muscle
// part. docs/ANATOMY-AUDIT.md lists every mesh and how many surfaces it contains. This module names
// those surfaces where the geometry identifies them unambiguously, using rules on each surface's
// position (lateral/medial, high/low, front/back, length) rather than fixed indices, so the same
// rules work on the left and right sides. Each identification was checked by rendering the
// surfaces in distinct colours (front and back views).
//
// Rules only fire when the expected number of large surfaces is present; otherwise the group stays
// whole. Surfaces that can't be told apart from the geometry are kept together and named as a
// group (e.g. "semitendinosus & semimembranosus"), never guessed.
//
// Coordinates: metres, Y up, the figure faces +z; the subject's left is +x (so |x| = lateral).

export const PARTS = {
  quadriceps: {
    rectus_femoris: { name: "Rectus femoris", about: "The only quadriceps head that crosses the hip as well as the knee: it flexes the hip and extends the knee. Less active than the vasti in squats; leg extensions and sprinting load it more." },
    vastus_lateralis: { name: "Vastus lateralis", about: "The largest quadriceps head, on the outside of the thigh. Extends the knee." },
    vastus_medialis: { name: "Vastus medialis", about: "The teardrop above the inner knee. Extends the knee and helps track the kneecap." },
    vastus_intermedius: { name: "Vastus intermedius", about: "Lies deep, under rectus femoris, on the front of the femur. Extends the knee." },
    sartorius: { name: "Sartorius", about: "The longest muscle in the body, crossing the thigh from the outer hip to the inner knee. Included in the model's quadriceps mesh but not a quadriceps head: it flexes, abducts and laterally rotates the hip and flexes the knee." },
  },
  hamstrings: {
    biceps_femoris_long: { name: "Biceps femoris (long head)", about: "The outer hamstring. Crosses the hip and knee: extends the hip and flexes the knee. The most commonly strained hamstring in sprinting." },
    biceps_femoris_short: { name: "Biceps femoris (short head)", about: "Deep, outer, lower thigh. Crosses only the knee, so hip-hinge exercises (Romanian deadlifts) barely train it; knee-flexion exercises (leg curls, Nordics) do." },
    medial_hamstrings: { name: "Semitendinosus & semimembranosus", about: "The two inner hamstrings. They extend the hip, flex the knee and rotate the shin inwards. They're separate surfaces in the model, but their geometry doesn't reliably tell which is which, so they're shown together." },
  },
  adductors: {
    adductor_magnus: { name: "Adductor magnus", about: "The largest adductor. Its rear (hamstring) part is a strong hip extender, so it works hard in deep squats." },
    gracilis: { name: "Gracilis", about: "A long, thin strap down the inner thigh, crossing the knee. Adducts the hip and flexes the knee." },
    adductors_short: { name: "Adductor longus, brevis & pectineus", about: "The shorter inner-thigh muscles near the groin. Adduct and flex the hip; common site of groin strains in football." },
  },
  gluteal: {
    gluteus_maximus: { name: "Gluteus maximus", about: "The largest muscle in the body. Extends and externally rotates the hip: the main driver of squats, deadlifts, hip thrusts, jumping and sprinting." },
    gluteus_medius: { name: "Gluteus medius", about: "On the side of the hip. Abducts the hip and keeps the pelvis level on one leg: weak medius shows up as the knee caving in or the hip dropping." },
    gluteus_minimus: { name: "Gluteus minimus", about: "Deep to gluteus medius. Abducts and medially rotates the hip and stabilises it in single-leg stance." },
    tfl: { name: "Tensor fasciae latae & iliotibial band", about: "On the outer hip, continuing down the thigh as the iliotibial band. Flexes, abducts and medially rotates the hip; stabilises the knee." },
    deep_hip: { name: "Deep hip muscles", about: "The small deep muscles behind the hip joint (the model's remaining gluteal-region surfaces). Rotate and stabilise the hip. Not individually identified here." },
  },
  upper_arm_muscles: {
    biceps: { name: "Biceps brachii", about: "Two heads on the front of the arm. Flexes the elbow and turns the palm up (supination); also helps flex the shoulder." },
    brachialis: { name: "Brachialis", about: "Under the biceps, low on the front of the arm. The strongest pure elbow flexor; hammer curls emphasise it." },
    coracobrachialis: { name: "Coracobrachialis", about: "Small, high on the inner arm. Flexes and adducts the shoulder." },
    triceps_long: { name: "Triceps (long head)", about: "The inner rear head. The only triceps head that crosses the shoulder, so overhead extensions stretch and load it most." },
    triceps_other: { name: "Triceps (lateral & medial heads)", about: "The outer and deep rear heads. Extend the elbow: the lockout of every press." },
    anconeus: { name: "Anconeus", about: "A small muscle behind the elbow that assists extension and steadies the joint." },
  },
  deltoid: {
    anterior: { name: "Anterior deltoid", about: "The front of the shoulder (clavicular part). Raises the arm forward; heavily used in pressing." },
    lateral: { name: "Lateral deltoid", about: "The outer shoulder (acromial part). Raises the arm out to the side; lateral raises target it." },
    posterior: { name: "Posterior deltoid", about: "The rear shoulder (spinal part). Takes the arm back; rows, face pulls and reverse flyes train it." },
  },
  chest_muscles: {
    clavicular: { name: "Pectoralis major (clavicular head)", about: "The upper chest, from the collarbone. Flexes the shoulder as well as bringing the arm across; incline pressing emphasises it." },
    sternal: { name: "Pectoralis major (sternocostal head) & pectoralis minor", about: "The main body of the chest, plus the deep pectoralis minor (included here because the model's thin deep surfaces can't be separated reliably)." },
  },
  rotator_cuff: {
    subscapularis: { name: "Subscapularis", about: "On the front of the shoulder blade: the largest cuff muscle. Rotates the arm inwards and holds the joint from the front." },
    supraspinatus: { name: "Supraspinatus", about: "Above the spine of the shoulder blade. Starts raising the arm to the side; the most commonly injured cuff tendon." },
    infraspinatus: { name: "Infraspinatus", about: "Below the spine of the shoulder blade. Rotates the arm outwards." },
    teres_minor: { name: "Teres minor", about: "Small, along the outer edge of the shoulder blade. Rotates the arm outwards with infraspinatus." },
  },
  trapezius: {
    upper: { name: "Upper trapezius", about: "The descending fibres in the neck and over the shoulder. Lifts (shrugs) and upwardly rotates the shoulder blade." },
    middle: { name: "Middle trapezius", about: "The transverse fibres across the shoulders. Squeezes the shoulder blades together." },
    lower: { name: "Lower trapezius", about: "The ascending fibres down to the mid-back. Depresses and upwardly rotates the shoulder blade; key for overhead shoulder health." },
  },
  iliopsoas: {
    psoas: { name: "Psoas major", about: "From the lumbar spine to the thigh. Flexes the hip; tight or weak psoas affects posture and sprinting knee drive." },
    iliacus: { name: "Iliacus", about: "Lines the inside of the pelvis and joins psoas. Flexes the hip." },
  },
  abdominal_muscles: {
    left: { name: "Abdominal wall (left side)", about: "Rectus abdominis and the obliques on the left. The model merges them, so the left and right halves are the finest split available." },
    right: { name: "Abdominal wall (right side)", about: "Rectus abdominis and the obliques on the right. The model merges them, so the left and right halves are the finest split available." },
  },
};

export const partName = (group, part) => PARTS[group]?.[part]?.name || part;

// features of one surface: { tris, c: [x,y,z], min: [x,y,z], max: [x,y,z] }
const lat = (s) => Math.abs(s.c[0]);
const yr = (s) => s.max[1] - s.min[1];
const xr = (s) => s.max[0] - s.min[0];
const take = (list, f) => { const i = list.indexOf(f(list)); return list.splice(i, 1)[0]; };
const maxBy = (k) => (l) => l.reduce((a, b) => (k(b) > k(a) ? b : a));
const minBy = (k) => (l) => l.reduce((a, b) => (k(b) < k(a) ? b : a));

// rules: given a group's large surfaces, return [surface, partId] pairs, or null if the geometry
// isn't what the rule expects
const RULES = {
  hamstrings(big) {
    if (big.length !== 4) return null;
    const s = [...big].sort((a, b) => lat(b) - lat(a)), bf = [s[0], s[1]].sort((a, b) => yr(b) - yr(a));
    return [[bf[0], "biceps_femoris_long"], [bf[1], "biceps_femoris_short"], [s[2], "medial_hamstrings"], [s[3], "medial_hamstrings"]];
  },
  quadriceps(big) {
    if (big.length !== 5) return null;
    const l = [...big], sart = take(l, maxBy(xr)), vl = take(l, maxBy(lat)), vm = take(l, minBy(lat));
    const [rf, vi] = l.sort((a, b) => b.max[1] - a.max[1]);
    return [[sart, "sartorius"], [vl, "vastus_lateralis"], [vm, "vastus_medialis"], [rf, "rectus_femoris"], [vi, "vastus_intermedius"]];
  },
  adductors(big) {
    if (big.length < 4) return null;
    const l = [...big], mag = take(l, maxBy((s) => s.tris)), gr = take(l, maxBy(yr));
    return [[mag, "adductor_magnus"], [gr, "gracilis"], ...l.map((s) => [s, "adductors_short"])];
  },
  gluteal(big) {
    if (big.length < 5) return null;
    const l = [...big], back = l.filter((s) => s.min[2] < -0.09); if (!back.length) return null;
    const gmax = take(l, () => maxBy((s) => s.tris)(back)), tfl = take(l, maxBy(yr)), gmed = take(l, maxBy((s) => s.max[1]));
    const highs = l.filter((s) => s.max[1] > 0.98); const gmin = highs.length ? take(l, () => maxBy((s) => s.tris)(highs)) : null;
    return [[gmax, "gluteus_maximus"], [tfl, "tfl"], [gmed, "gluteus_medius"], ...(gmin ? [[gmin, "gluteus_minimus"]] : []), ...l.map((s) => [s, "deep_hip"])];
  },
  upper_arm_muscles(big) {
    if (big.length !== 8) return null;
    const l = [...big], anc = take(l, minBy((s) => s.min[1])), cb = take(l, maxBy((s) => s.min[1]));
    const post = l.filter((s) => s.max[2] < -0.02), ant = l.filter((s) => s.max[2] >= -0.02);
    if (post.length !== 3 || ant.length !== 3) return null;
    const tl = minBy(lat)(post), br = minBy((s) => s.max[2])(ant);
    return [[anc, "anconeus"], [cb, "coracobrachialis"], [tl, "triceps_long"], ...post.filter((s) => s !== tl).map((s) => [s, "triceps_other"]), [br, "brachialis"], ...ant.filter((s) => s !== br).map((s) => [s, "biceps"])];
  },
  deltoid(big) {
    if (big.length !== 3) return null;
    const l = [...big], post = take(l, minBy((s) => s.c[2])), latd = take(l, maxBy(lat));
    return [[post, "posterior"], [latd, "lateral"], [l[0], "anterior"]];
  },
  chest_muscles(big) {
    if (big.length < 3) return null;
    const l = [...big], clav = take(l, maxBy((s) => s.max[1]));
    return [[clav, "clavicular"], ...l.map((s) => [s, "sternal"])];
  },
  rotator_cuff(big) {
    if (big.length !== 4) return null;
    const l = [...big], sub = take(l, maxBy((s) => s.tris)), sup = take(l, maxBy((s) => s.min[1])), tm = take(l, minBy((s) => s.tris));
    return [[sub, "subscapularis"], [sup, "supraspinatus"], [tm, "teres_minor"], [l[0], "infraspinatus"]];
  },
  trapezius(big) {
    if (big.length !== 3) return null;
    const s = [...big].sort((a, b) => b.min[1] - a.min[1]);
    return [[s[0], "upper"], [s[1], "middle"], [s[2], "lower"]];
  },
  iliopsoas(big) {
    if (big.length !== 2) return null;
    const s = [...big].sort((a, b) => b.max[1] - a.max[1]);
    return [[s[0], "psoas"], [s[1], "iliacus"]];
  },
  abdominal_muscles(big) {
    if (big.length !== 2) return null;
    return big.map((s) => [s, s.c[0] > 0 ? "left" : "right"]);
  },
};

// identify the large surfaces (those with ≥ 2% of the mesh's triangles) of one group mesh
export function identify(group, big) {
  const rule = RULES[group]; if (!rule) return null;
  try { const r = rule(big); return r && r.every(([s]) => s) ? r : null; } catch { return null; }
}
export const SPLIT_GROUPS = Object.keys(RULES);
