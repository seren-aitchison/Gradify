// Body Intelligence: the muscle groups shown on the anatomy model and the exercises that train them.
//
// MUSCLES are keyed by the anatomy model's mesh names without the side suffix (quadriceps → the
// meshes quadriceps_l and quadriceps_r in kit/vendor/anatomy/catalog.json), so the heat map paints
// real meshes. EXERCISES give each exercise's muscle weights: 1 for the prime movers, about 0.5 for
// strong synergists and 0.25–0.3 for stabilisers. These follow standard exercise-science
// descriptions of each lift (EMG studies and anatomy texts). They are an educational model of which
// muscles a lift loads, not a measurement of any one person's muscle activation.

export const MUSCLES = {
  chest_muscles: { name: "Chest", detail: "Pectoralis major and minor", region: "upper", sided: true,
    about: "Pushes the arm forward and across the body (horizontal flexion) and rotates it inwards." },
  deltoid: { name: "Shoulders (deltoids)", detail: "Anterior, lateral and posterior deltoid", region: "upper", sided: true,
    about: "Caps the shoulder. The front fibres raise the arm forward, the middle fibres out to the side, the rear fibres back." },
  rotator_cuff: { name: "Rotator cuff", detail: "Supraspinatus, infraspinatus, teres minor, subscapularis", region: "upper", sided: true,
    about: "Four small muscles that keep the ball of the shoulder centred in its socket. Weakness here is a common cause of shoulder pain." },
  shoulder_muscles: { name: "Shoulder girdle", detail: "Rhomboids, serratus anterior, levator scapulae, teres major", region: "upper", sided: true,
    about: "Moves and steadies the shoulder blades, the base every pushing and pulling movement works from." },
  trapezius: { name: "Trapezius", detail: "Upper, middle and lower trapezius", region: "upper", sided: true,
    about: "Lifts, squeezes back and rotates the shoulder blades; the upper fibres shrug." },
  back_muscles: { name: "Back", detail: "Latissimus dorsi and erector spinae", region: "upper", sided: true,
    about: "The lats pull the arms down and back (pull-ups, rows); the erector spinae extend and protect the spine (deadlifts)." },
  upper_arm_muscles: { name: "Upper arms", detail: "Biceps brachii, brachialis and triceps brachii", region: "upper", sided: true,
    about: "Biceps and brachialis bend the elbow; triceps straightens it and finishes every press." },
  forearm_muscles: { name: "Forearms", detail: "Wrist flexors and extensors, brachioradialis", region: "upper", sided: true,
    about: "Grip and wrist control. Heavy pulling and carrying train them hard." },
  neck_muscles: { name: "Neck", detail: "Sternocleidomastoid, scalenes, splenius", region: "upper", sided: true,
    about: "Holds and turns the head. Contact sports train it directly." },
  abdominal_muscles: { name: "Core (abdominals)", detail: "Rectus abdominis, obliques, transversus abdominis", region: "core", sided: false,
    about: "Flexes and rotates the trunk and braces the spine under load." },
  iliopsoas: { name: "Hip flexors", detail: "Iliacus and psoas major", region: "lower", sided: true,
    about: "Lifts the thigh: the knee drive in sprinting and the top of a leg raise." },
  gluteal: { name: "Glutes", detail: "Gluteus maximus, medius and minimus", region: "lower", sided: true,
    about: "Extends and stabilises the hip: the main engine of squats, deadlifts, jumping and sprinting." },
  quadriceps: { name: "Quadriceps", detail: "Rectus femoris, vastus lateralis, vastus medialis, vastus intermedius", region: "lower", sided: true,
    about: "Straightens the knee. Squats, lunges, cycling and jumping all depend on them." },
  hamstrings: { name: "Hamstrings", detail: "Biceps femoris, semitendinosus, semimembranosus", region: "lower", sided: true,
    about: "Bends the knee and extends the hip. Often injured in sprinting; eccentric work (Nordics) protects them." },
  adductors: { name: "Adductors (inner thigh)", detail: "Adductor magnus, longus, brevis; gracilis", region: "lower", sided: true,
    about: "Pulls the legs together and helps extend the hip, especially in deep squats." },
  calf: { name: "Calves", detail: "Gastrocnemius and soleus", region: "lower", sided: true,
    about: "Points the foot: every step, jump and sprint pushes off through the calves and Achilles tendon." },
  shin_muscles: { name: "Shins", detail: "Tibialis anterior and peroneals", region: "lower", sided: true,
    about: "Lifts the foot and steadies the ankle. Shin splints often involve these muscles." },
};

// heart and lungs: coloured in Fitness mode by cardiovascular tests, never by lifting logs
export const ORGANS = { heart: { name: "Heart" }, lung: { name: "Lungs", sided: true } };

const e = (name, category, muscles, opts = {}) => ({ name, category, muscles, unilateral: false, bodyweight: false, ...opts });

export const EXERCISES = {
  back_squat: e("Back squat", "Legs", { quadriceps: 1, gluteal: 0.8, adductors: 0.5, hamstrings: 0.25, back_muscles: 0.3, abdominal_muscles: 0.3, calf: 0.15 }),
  front_squat: e("Front squat", "Legs", { quadriceps: 1, gluteal: 0.6, adductors: 0.4, back_muscles: 0.35, abdominal_muscles: 0.4 }),
  goblet_squat: e("Goblet squat", "Legs", { quadriceps: 1, gluteal: 0.6, adductors: 0.4, abdominal_muscles: 0.3 }),
  leg_press: e("Leg press", "Legs", { quadriceps: 1, gluteal: 0.6, adductors: 0.4, hamstrings: 0.2 }),
  lunge: e("Walking lunge", "Legs", { quadriceps: 1, gluteal: 0.8, adductors: 0.4, hamstrings: 0.3, calf: 0.2 }, { unilateral: true }),
  split_squat: e("Bulgarian split squat", "Legs", { quadriceps: 1, gluteal: 0.8, adductors: 0.4, hamstrings: 0.25 }, { unilateral: true }),
  deadlift: e("Deadlift", "Legs", { gluteal: 1, hamstrings: 0.8, back_muscles: 0.8, quadriceps: 0.5, trapezius: 0.5, forearm_muscles: 0.5, adductors: 0.4, abdominal_muscles: 0.3 }),
  romanian_deadlift: e("Romanian deadlift", "Legs", { hamstrings: 1, gluteal: 0.9, back_muscles: 0.6, forearm_muscles: 0.4, adductors: 0.3 }),
  hip_thrust: e("Hip thrust", "Legs", { gluteal: 1, hamstrings: 0.4, quadriceps: 0.3, adductors: 0.3 }),
  leg_extension: e("Leg extension", "Legs", { quadriceps: 1 }),
  leg_curl: e("Leg curl", "Legs", { hamstrings: 1, calf: 0.2 }),
  nordic_curl: e("Nordic hamstring curl", "Legs", { hamstrings: 1, gluteal: 0.2 }, { bodyweight: true }),
  calf_raise: e("Standing calf raise", "Legs", { calf: 1 }),
  step_up: e("Step-up", "Legs", { quadriceps: 1, gluteal: 0.8, calf: 0.2 }, { unilateral: true }),
  bench_press: e("Bench press", "Push", { chest_muscles: 1, deltoid: 0.5, upper_arm_muscles: 0.6, rotator_cuff: 0.2 }),
  incline_bench: e("Incline bench press", "Push", { chest_muscles: 1, deltoid: 0.7, upper_arm_muscles: 0.5 }),
  dumbbell_press: e("Dumbbell bench press", "Push", { chest_muscles: 1, deltoid: 0.5, upper_arm_muscles: 0.5, rotator_cuff: 0.3 }),
  push_up: e("Push-up", "Push", { chest_muscles: 1, deltoid: 0.5, upper_arm_muscles: 0.6, abdominal_muscles: 0.3, shoulder_muscles: 0.3 }, { bodyweight: true }),
  dip: e("Dip", "Push", { chest_muscles: 0.8, upper_arm_muscles: 1, deltoid: 0.5 }, { bodyweight: true }),
  overhead_press: e("Overhead press", "Push", { deltoid: 1, upper_arm_muscles: 0.6, trapezius: 0.4, shoulder_muscles: 0.4, abdominal_muscles: 0.3, chest_muscles: 0.25 }),
  lateral_raise: e("Lateral raise", "Push", { deltoid: 1, trapezius: 0.3, rotator_cuff: 0.2 }),
  triceps_pushdown: e("Triceps pushdown", "Push", { upper_arm_muscles: 1, forearm_muscles: 0.2 }),
  pull_up: e("Pull-up", "Pull", { back_muscles: 1, upper_arm_muscles: 0.6, shoulder_muscles: 0.5, forearm_muscles: 0.5, trapezius: 0.3, rotator_cuff: 0.2 }, { bodyweight: true }),
  lat_pulldown: e("Lat pulldown", "Pull", { back_muscles: 1, upper_arm_muscles: 0.5, shoulder_muscles: 0.4, forearm_muscles: 0.3 }),
  barbell_row: e("Barbell row", "Pull", { back_muscles: 1, trapezius: 0.7, shoulder_muscles: 0.6, deltoid: 0.4, upper_arm_muscles: 0.5, forearm_muscles: 0.4 }),
  cable_row: e("Seated cable row", "Pull", { back_muscles: 1, trapezius: 0.6, shoulder_muscles: 0.6, upper_arm_muscles: 0.5, deltoid: 0.3 }),
  face_pull: e("Face pull", "Pull", { deltoid: 1, rotator_cuff: 0.8, trapezius: 0.7, shoulder_muscles: 0.6 }),
  shrug: e("Shrug", "Pull", { trapezius: 1, forearm_muscles: 0.4, neck_muscles: 0.2 }),
  biceps_curl: e("Biceps curl", "Pull", { upper_arm_muscles: 1, forearm_muscles: 0.4 }),
  hammer_curl: e("Hammer curl", "Pull", { upper_arm_muscles: 1, forearm_muscles: 0.7 }),
  farmers_carry: e("Farmer's carry", "Carry", { forearm_muscles: 1, trapezius: 0.8, abdominal_muscles: 0.5, gluteal: 0.3, calf: 0.2 }),
  plank: e("Plank (counted as sets)", "Core", { abdominal_muscles: 1, shoulder_muscles: 0.3, gluteal: 0.2 }, { bodyweight: true }),
  hanging_leg_raise: e("Hanging leg raise", "Core", { abdominal_muscles: 1, iliopsoas: 0.8, quadriceps: 0.4, forearm_muscles: 0.4 }, { bodyweight: true }),
  crunch: e("Cable crunch", "Core", { abdominal_muscles: 1 }),
  pallof_press: e("Pallof press", "Core", { abdominal_muscles: 1, shoulder_muscles: 0.2 }),
  back_extension: e("Back extension", "Core", { back_muscles: 1, gluteal: 0.7, hamstrings: 0.5 }),
  neck_curl: e("Neck flexion/extension", "Neck", { neck_muscles: 1, trapezius: 0.3 }),
  tibialis_raise: e("Tibialis raise", "Legs", { shin_muscles: 1 }),
  copenhagen: e("Copenhagen plank", "Legs", { adductors: 1, abdominal_muscles: 0.5 }, { bodyweight: true, unilateral: true }),
  external_rotation: e("Cable external rotation", "Pull", { rotator_cuff: 1, deltoid: 0.3 }),
};

// Fitness tests: measured results, compared only with the user's own earlier results. "better"
// says which direction is an improvement. "muscles" (and "organs") say what the test reflects on
// the body in Fitness mode.
export const TESTS = {
  run_5k: { name: "5 km run", unit: "min", better: "lower", organs: ["heart", "lung"], muscles: ["quadriceps", "hamstrings", "calf", "gluteal"], area: "Cardiovascular" },
  resting_hr: { name: "Resting heart rate", unit: "bpm", better: "lower", organs: ["heart"], muscles: [], area: "Cardiovascular" },
  vo2max: { name: "VO₂max (watch or lab estimate)", unit: "ml/kg/min", better: "higher", organs: ["heart", "lung"], muscles: [], area: "Cardiovascular" },
  pushups_max: { name: "Max push-ups", unit: "reps", better: "higher", muscles: ["chest_muscles", "upper_arm_muscles", "deltoid"], area: "Muscular endurance" },
  pullups_max: { name: "Max pull-ups", unit: "reps", better: "higher", muscles: ["back_muscles", "upper_arm_muscles", "forearm_muscles"], area: "Muscular endurance" },
  plank_hold: { name: "Plank hold", unit: "s", better: "higher", muscles: ["abdominal_muscles"], area: "Muscular endurance" },
  sit_reach: { name: "Sit-and-reach", unit: "cm", better: "higher", muscles: ["hamstrings", "back_muscles"], area: "Mobility" },
  single_leg_balance: { name: "Single-leg balance, eyes closed", unit: "s", better: "higher", muscles: ["calf", "shin_muscles", "gluteal"], area: "Balance" },
  vertical_jump: { name: "Vertical jump", unit: "cm", better: "higher", muscles: ["quadriceps", "gluteal", "calf"], area: "Power" },
  grip_strength: { name: "Grip strength (dynamometer)", unit: "kg", better: "higher", muscles: ["forearm_muscles"], area: "Strength" },
};

// muscle → exercises that train it, strongest first
export function exercisesFor(muscle) {
  return Object.entries(EXERCISES).filter(([, x]) => (x.muscles[muscle] || 0) > 0)
    .sort((a, b) => b[1].muscles[muscle] - a[1].muscles[muscle]).map(([id, x]) => ({ id, name: x.name, weight: x.muscles[muscle] }));
}

// How strongly an exercise loads each individual muscle inside a group (kit/sport/anatomy-parts.js),
// relative to the group weight above. Only listed where the biomechanics clearly differ between the
// parts: two-joint vs one-joint muscles (rectus femoris in squats, the biceps femoris short head in
// hip hinges, the triceps long head overhead), the deltoid heads by direction of movement, the
// trapezius fibres by scapular action. Unlisted parts count fully (factor 1). An educational
// estimate from standard biomechanics and EMG findings, not a measurement.
const squatQuads = { quadriceps: { rectus_femoris: 0.6, sartorius: 0.3 } };
const hinge = { hamstrings: { biceps_femoris_short: 0.15 } };
const pressDelts = { deltoid: { anterior: 1, lateral: 0.3, posterior: 0.1 } };
const rowDelts = { deltoid: { posterior: 1, lateral: 0.35, anterior: 0.1 }, trapezius: { middle: 1, lower: 0.7, upper: 0.4 } };
const glutesBilateral = { gluteal: { gluteus_maximus: 1, gluteus_medius: 0.4, gluteus_minimus: 0.3, tfl: 0.2, deep_hip: 0.4 } };
const glutesSingle = { gluteal: { gluteus_maximus: 1, gluteus_medius: 0.8, gluteus_minimus: 0.6, tfl: 0.5, deep_hip: 0.6 } };
export const PART_FACTORS = {
  back_squat: { ...squatQuads, ...glutesBilateral, adductors: { adductor_magnus: 1, adductors_short: 0.5, gracilis: 0.3 } },
  front_squat: { ...squatQuads, ...glutesBilateral, adductors: { adductor_magnus: 1, adductors_short: 0.5, gracilis: 0.3 } },
  goblet_squat: { ...squatQuads, ...glutesBilateral },
  leg_press: { ...squatQuads, ...glutesBilateral },
  lunge: { ...squatQuads, ...glutesSingle },
  split_squat: { ...squatQuads, ...glutesSingle },
  step_up: { ...squatQuads, ...glutesSingle },
  leg_extension: { quadriceps: { sartorius: 0.15 } },
  deadlift: { ...hinge, ...squatQuads, ...glutesBilateral, trapezius: { upper: 1, middle: 0.7, lower: 0.5 } },
  romanian_deadlift: { ...hinge, ...glutesBilateral },
  hip_thrust: { ...hinge, gluteal: { gluteus_maximus: 1, gluteus_medius: 0.5, gluteus_minimus: 0.4, tfl: 0.3, deep_hip: 0.4 } },
  back_extension: { ...hinge },
  leg_curl: { hamstrings: { biceps_femoris_short: 1 } },
  nordic_curl: { hamstrings: { biceps_femoris_short: 1 } },
  bench_press: { ...pressDelts, chest_muscles: { sternal: 1, clavicular: 0.7 }, rotator_cuff: { subscapularis: 0.6, supraspinatus: 0.3, infraspinatus: 0.3, teres_minor: 0.3 } },
  dumbbell_press: { ...pressDelts, chest_muscles: { sternal: 1, clavicular: 0.7 }, rotator_cuff: { subscapularis: 0.6, supraspinatus: 0.4, infraspinatus: 0.4, teres_minor: 0.4 } },
  incline_bench: { ...pressDelts, chest_muscles: { clavicular: 1, sternal: 0.7 } },
  push_up: { ...pressDelts, chest_muscles: { sternal: 1, clavicular: 0.7 } },
  dip: { ...pressDelts, chest_muscles: { sternal: 1, clavicular: 0.4 }, upper_arm_muscles: { biceps: 0.1, brachialis: 0.1, coracobrachialis: 0.3 } },
  overhead_press: { deltoid: { anterior: 1, lateral: 0.7, posterior: 0.2 }, trapezius: { upper: 0.8, lower: 0.6, middle: 0.4 }, upper_arm_muscles: { biceps: 0.1, brachialis: 0.1, coracobrachialis: 0.2 } },
  lateral_raise: { deltoid: { lateral: 1, anterior: 0.4, posterior: 0.3 }, rotator_cuff: { supraspinatus: 1, infraspinatus: 0.2, teres_minor: 0.2, subscapularis: 0.1 } },
  triceps_pushdown: { upper_arm_muscles: { biceps: 0, brachialis: 0, coracobrachialis: 0, triceps_long: 0.8 } },
  pull_up: { ...rowDelts, upper_arm_muscles: { triceps_long: 0.3, triceps_other: 0, anconeus: 0, coracobrachialis: 0.2 } },
  lat_pulldown: { ...rowDelts, upper_arm_muscles: { triceps_long: 0.3, triceps_other: 0, anconeus: 0, coracobrachialis: 0.2 } },
  barbell_row: { ...rowDelts, upper_arm_muscles: { triceps_long: 0.2, triceps_other: 0, anconeus: 0, coracobrachialis: 0.1 } },
  cable_row: { ...rowDelts, upper_arm_muscles: { triceps_long: 0.2, triceps_other: 0, anconeus: 0, coracobrachialis: 0.1 } },
  face_pull: { deltoid: { posterior: 1, lateral: 0.5, anterior: 0.05 }, trapezius: { middle: 1, lower: 0.8, upper: 0.5 }, rotator_cuff: { infraspinatus: 1, teres_minor: 0.9, supraspinatus: 0.4, subscapularis: 0.2 } },
  shrug: { trapezius: { upper: 1, middle: 0.4, lower: 0.2 } },
  farmers_carry: { trapezius: { upper: 1, middle: 0.5, lower: 0.3 }, gluteal: { gluteus_medius: 1, gluteus_minimus: 0.8, gluteus_maximus: 0.4, tfl: 0.6 } },
  biceps_curl: { upper_arm_muscles: { biceps: 1, brachialis: 0.8, coracobrachialis: 0.2, triceps_long: 0, triceps_other: 0, anconeus: 0 } },
  hammer_curl: { upper_arm_muscles: { brachialis: 1, biceps: 0.7, coracobrachialis: 0.1, triceps_long: 0, triceps_other: 0, anconeus: 0 } },
  external_rotation: { rotator_cuff: { infraspinatus: 1, teres_minor: 1, supraspinatus: 0.4, subscapularis: 0.2 }, deltoid: { posterior: 1, lateral: 0.3, anterior: 0 } },
  hanging_leg_raise: { quadriceps: { rectus_femoris: 1, sartorius: 0.6, vastus_lateralis: 0, vastus_medialis: 0, vastus_intermedius: 0 } },
  copenhagen: { adductors: { adductors_short: 1, adductor_magnus: 0.8, gracilis: 1 } },
};
export const partFactor = (exercise, group, part) => PART_FACTORS[exercise]?.[group]?.[part] ?? 1;
