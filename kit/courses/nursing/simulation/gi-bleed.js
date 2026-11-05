// NurseGradify simulation: acute upper gastrointestinal bleeding on an anticoagulant. Fictional patient.
// EDUCATION ONLY: a simplified teaching model with illustrative numbers. Local major haemorrhage, transfusion
// and anticoagulant reversal policies always apply.
// Guidance reflected: NICE CG141 Acute upper gastrointestinal bleeding in over 16s (resuscitation, risk
// scoring, endoscopy, no PPI before endoscopy); NICE NG24 Blood transfusion; RCP NEWS2 (2017).
const T = (s, id) => s.did[id]?.[0] ?? null;
export default {
  id: "gi-bleed", title: "Mr Hollis, vomiting blood after breakfast", clock: "09:10", limit: 100,
  banner: "Simulation for education only. Simplified physiology and illustrative numbers. Follow your local major haemorrhage, transfusion and anticoagulation policies.",
  patient: { name: "Frank Hollis", age: 72, where: "Care of older people ward, bay 4, bed 1",
    summary: "Admitted 3 days ago after a fall. He's just vomited a large amount of blood and says he feels faint.",
    background: ["Admitted after a fall at home; no fracture", "Atrial fibrillation: on apixaban", "Osteoarthritis: has been taking naproxen bought over the counter", "Previous indigestion"] },
  handover: "The HCA calls you urgently: Mr Hollis has vomited about 300 ml of bright red blood into a bowl and has had a black, tarry stool this morning.",
  vitals: { rr: 22, spo2: 96, o2: false, sbp: 98, hr: 116, temp: 36.8, avpu: "A" },
  processes: [
    { when: (s) => !s.f.endoscopy, rate: { sbp: -0.5, hr: 0.4, rr: 0.05 } },
    { when: (s) => s.f.fluidsAt != null && s.t < s.f.fluidsAt + 20, toward: { sbp: [104, 0.8], hr: [110, 0.4] } },
    { when: (s) => s.f.bloodAt != null, toward: { sbp: [116, 0.6], hr: [96, 0.6], rr: [18, 0.1] } },
    { when: (s) => s.v.o2, toward: { spo2: [97, 0.5] } },
  ],
  minute(s) {
    if (s.v.sbp < 85 && s.v.avpu === "A") s.v.avpu = "C";
    if (s.v.sbp >= 92 && s.v.avpu === "C") s.v.avpu = "A";
    if (s.f.walked && !s.f.walkedDone) { s.f.walkedDone = true; s.v.sbp -= 15; }
    if (s.f.crossmatchAt != null && s.f.bloodReady == null && s.t >= s.f.crossmatchAt + 25) s.f.bloodReady = s.t;
    if (s.f.bloodAt != null && s.t >= s.f.bloodAt + 25) s.f.endoscopy = true;
  },
  collapse: (s) => (s.v.sbp < 70 ? "Mr Hollis collapses with an unrecordable blood pressure. A major haemorrhage call is made and the emergency team take over." : null),
  find: {
    airway: () => "Airway clear; there's blood around his mouth. He's talking.",
    breathing: (s) => `Breathing ${Math.round(s.v.rr)} a minute. SpO2 ${Math.round(s.v.spo2)}% ${s.v.o2 ? "on oxygen" : "on air"}. Chest clear.`,
    circulation: (s) => `Pulse ${Math.round(s.v.hr)}, irregularly irregular (his AF). BP ${Math.round(s.v.sbp)}/${Math.round(s.v.sbp * 0.6)}. Cool, clammy peripheries; capillary refill 4 seconds. One small cannula in his left hand.`,
    disability: (s) => `${s.v.avpu === "A" ? "Alert, frightened and pale." : "He's newly confused and restless."} Capillary glucose 7.4 mmol/L.`,
    exposure: () => "Temperature 36.8°C. Black, tarry, foul-smelling stool in the commode (melaena). Abdomen soft, mildly tender in the upper abdomen.",
    chart: () => "Obs at 06:00: NEWS2 1 (HR 88, BP 132/78). Haemoglobin on admission 128 g/L. Stool chart: one black stool at 07:30, not reported.",
    drugs: () => "Apixaban twice daily (last dose 08:00). Bisoprolol. Paracetamol. His daughter brought in naproxen, which he's been taking for his knees: it isn't on the chart.",
    ask: () => "\"I feel dizzy, nurse, and I've been sick again in my mouth.\"",
  },
  actions: [
    { id: "flat", group: "Act", label: "Lie him flat (on his side if he's vomiting) and keep him in bed", mins: 1, once: true, run: (s) => { s.f.flat = true; return "You lie him down on his side with a vomit bowl and the call bell in reach."; } },
    { id: "nbm", group: "Act", label: "Keep him nil by mouth", mins: 1, once: true, run: (s) => { s.f.nbm = true; return "You put a nil-by-mouth sign up and explain why: he's likely to need an endoscopy."; } },
    { id: "bloods", group: "Act", label: "Take bloods (if you're trained): full blood count, U&Es, clotting, group and crossmatch", mins: 6, once: true, run: (s) => { s.f.bloods = true; s.f.crossmatchAt = s.t; return "You take the bloods, including a crossmatch sample, label them at the bedside and send them urgently."; } },
    { id: "hold", group: "Medicines", label: "Withhold his apixaban and naproxen and flag the drug chart", mins: 1, once: true, run: (s) => { s.f.hold = true; return "You withhold both, remove the naproxen from his locker and flag the chart for the doctor."; } },
    { id: "monitor", group: "Act", label: "Start a fluid balance chart and record any further vomiting or stools", mins: 2, once: true, run: (s) => { s.f.fluidChart = true; return "You start a fluid balance chart and keep the vomit bowl for the team to see."; } },
    { id: "o2", group: "Act", label: "Give oxygen", mins: 1, once: true, partial: (s) => (s.v.spo2 >= 94 ? "His saturation is in the normal range: oxygen isn't indicated unless it falls below 94%." : null), run: (s) => { s.v.o2 = true; return "You start oxygen."; } },
    { id: "walk", group: "Act", label: "Help him walk to the toilet to clean up", mins: 3, once: true, unsafe: () => "He's actively bleeding and hypotensive: standing risks collapse. Keep him in bed and use a commode or bedpan if needed.", run: (s) => { s.f.walked = true; return "He gets halfway, sways and has to be helped back to bed."; } },
    { id: "apixaban", group: "Medicines", label: "Give his next apixaban dose on time, as AF needs anticoagulation", mins: 1, once: true, unsafe: () => "Giving an anticoagulant during active bleeding is dangerous: withhold it and discuss with the doctor.", run: () => "You give apixaban." },
    { id: "tea", group: "Act", label: "Give him a cup of tea to settle him", mins: 2, once: true, unsafe: () => "He should be nil by mouth: he'll probably need an urgent endoscopy.", run: () => "He sips some tea." },
    { id: "fluids", group: "Medicines", label: "Give the prescribed IV fluid bolus", mins: 10, once: true, when: (s) => s.f.plan, run: (s) => { s.f.fluidsAt = s.t; return "You give the prescribed crystalloid bolus while the blood is prepared."; } },
    { id: "blood", group: "Medicines", label: "Start the prescribed red cell transfusion (two-person bedside check)", mins: 10, once: true, when: (s) => s.f.plan && s.f.bloodReady != null, run: (s) => { s.f.bloodAt = s.t; return "You and a colleague check the blood against his wristband and prescription at the bedside, take baseline observations, start the transfusion and watch him closely for the first 15 minutes."; } },
  ],
  arrive(s, call) {
    if (call.who === "nic") return { text: "The nurse in charge says: \"He needs the medical team urgently. Bleep them, and get a crossmatch sent.\"" };
    if (s.f.reviewed) return { text: "They check the plan is under way." };
    s.f.plan = s.f.reviewed = true; s.f.reviewAt = s.t;
    if (!s.f.crossmatchAt) { s.f.crossmatchAt = s.t; s.f.bloods = true; }
    return { text: "Dr Shah (medical registrar) assesses him: suspected upper GI bleed, probably peptic ulcer disease with naproxen and apixaban. Plan: second large-bore cannula, an IV crystalloid bolus now, 2 units of red cells as soon as they're ready, withhold apixaban and naproxen, discuss anticoagulant reversal with haematology, nil by mouth, urgent endoscopy after resuscitation, observations every 15 minutes, and a major haemorrhage call if he deteriorates. No PPI before endoscopy. Prescriptions are written." };
  },
  complete: (s) => s.f.reviewed && s.f.bloodAt != null && s.f.endoscopy && s.obs.some((o) => o.t > s.f.bloodAt),
  completeText: "He's been resuscitated with fluid and blood, his anticoagulant is held, and the endoscopy team take him for an urgent endoscopy.",
  timeUp: "The endoscopy team arrive, but he's still not adequately resuscitated.",
  window: 15,
  checks: [
    { dim: "priorities", label: "Kept him lying in bed and nil by mouth", why: "Lying down reduces the risk of collapse, and he'll need an endoscopy.", test: (s) => (s.f.walked || s.did.tea ? 0 : (s.f.flat ? 0.5 : 0) + (s.f.nbm ? 0.5 : 0)) },
    { dim: "priorities", label: "Withheld his anticoagulant and NSAID", why: "Apixaban and naproxen worsen bleeding: withhold them and tell the doctor.", test: (s) => (s.did.apixaban ? 0 : s.f.hold ? 1 : 0) },
    { dim: "priorities", label: "Sent a crossmatch sample early", why: "Blood takes time to prepare: sending the sample early means it's ready when he needs it.", test: (s) => { const t = T(s, "bloods"); return t == null ? 0 : t <= 15 ? 1 : 0.5; } },
    { dim: "assessment", label: "Looked at the stool chart and drug chart", why: "The unreported black stool and the naproxen and apixaban explain the bleed.", test: (s) => ((T(s, "chart") != null ? 0.5 : 0) + (T(s, "drugs") != null ? 0.5 : 0)) },
    { dim: "recognition", label: "Repeated observations during the transfusion", why: "Observations at the start and during the transfusion pick up both reactions and continued bleeding.", test: (s) => (s.f.bloodAt == null ? null : s.obs.some((o) => o.t > s.f.bloodAt) ? 1 : 0) },
  ],
  sbar: {
    s: [["bleed", "haematemesis", "vomit", "blood"]],
    b: [["apixaban", "anticoag"], ["naproxen", "nsaid", "af", "atrial", "fall"]],
    a: [["{news}"], ["bp", "blood pressure", "hypotens", "98"], ["heart rate", "pulse", "hr ", "tachy", "116"], ["melaena", "black", "tarry", "stool", "300"]],
    r: [["review", "come", "attend", "see him"], ["now", "urgent", "immediately", "minutes"]],
  },
  sbarModel: "S: I'm calling about Frank Hollis, bay 4: he's vomited about 300 ml of fresh blood and had melaena. NEWS2 6. B: 72, admitted after a fall; AF on apixaban (last dose 08:00), and he's been taking over-the-counter naproxen. A: RR 22, SpO2 96%, BP 98/59, HR 116 irregular, cool and clammy, alert. I've laid him flat, kept him nil by mouth, withheld apixaban and sent bloods with a crossmatch. R: Please come and see him now: he needs fluids and probably blood, and a plan for his anticoagulation.",
  note: [
    { text: "Timed entry", cues: [["{time}"]] },
    { text: "What you found: haematemesis and melaena, with an estimate of volume", cues: [["blood", "haematemesis", "vomit"], ["melaena", "black", "stool", "300", "ml"]] },
    { text: "Observations and NEWS2", cues: [["{news}"]] },
    { text: "Apixaban and naproxen withheld", cues: [["apixaban", "naproxen", "anticoag"], ["withh", "held", "omit", "stop"]] },
    { text: "Who you escalated to, and when", cues: [["escalat", "dr ", "doctor", "registrar", "informed", "bleep", "called", "reviewed"]] },
    { text: "Treatment and plan: fluids, transfusion, nil by mouth, endoscopy, observation frequency", cues: [["fluid", "transfus", "blood"], ["endoscop", "nil by mouth", "nbm", "15 min", "observ"]] },
  ],
  rubric: [
    "Recognises an upper GI bleed with signs of hypovolaemia and states the NEWS2 accurately",
    "Prioritises safety: lying down, nil by mouth, withholding the anticoagulant and NSAID",
    "Escalates urgently to the medical team with a concise SBAR including the anticoagulant",
    "Supports resuscitation: early crossmatch, fluids and safe transfusion checks",
    "Record entry is timed and includes the bleed, observations, medicines withheld, escalation and plan",
  ],
  model: `Fresh haematemesis and melaena with a rising heart rate and falling blood pressure in a man on apixaban and naproxen is a significant upper GI bleed. NEWS2 is 6: an urgent response, and he's likely to get worse.
Keep him safe first: lie him down (on his side while he's vomiting), keep him in bed and nil by mouth, and keep the vomit and stool for the team to see. Assess ABCDE and repeat observations frequently. Withhold apixaban and naproxen and flag the drug chart; the naproxen was bought over the counter and isn't on the chart, so ask about it.
Escalate urgently to the medical team with an SBAR that includes the anticoagulant. If you're trained, take bloods with an early crossmatch sample: blood takes time to prepare. Oxygen isn't needed while his saturation is normal.
When the plan comes, give the prescribed fluid bolus, then start the red cell transfusion with a two-person bedside check, taking observations before, at 15 minutes and during it. NICE CG141 advises against giving a PPI before endoscopy. If he deteriorates further, follow the major haemorrhage protocol.
Document the volume and nature of the bleeding, observations, medicines withheld, who you called and when, and the plan.`,
  lessons: ["u09-07", "u09-14", "u05-23", "u09-03"],
  review: { verified: null, note: "Physiology, timings and the bleeding pathway need checking by a nurse educator against NICE CG141 and typical local policies." },
};
