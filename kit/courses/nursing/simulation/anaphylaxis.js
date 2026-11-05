// NurseGradify simulation: anaphylaxis during a first dose of an IV antibiotic. Fictional patient.
// EDUCATION ONLY: a simplified teaching model with illustrative numbers. Doses aren't given: follow the
// Resuscitation Council UK algorithm and your local anaphylaxis protocol.
// Guidance reflected: Resuscitation Council UK, Emergency treatment of anaphylaxis (2021): remove the trigger,
// call for help, position, IM adrenaline (repeat after 5 minutes if no improvement), oxygen, fluids;
// antihistamines and steroids aren't first-line treatment. Adrenaline for anaphylaxis can be given in an
// emergency without a prescription (Human Medicines Regulations 2012, Schedule 19).
const T = (s, id) => s.did[id]?.[0] ?? null;
const adr = (s) => (s.did.adrenaline || []).length;
export default {
  id: "anaphylaxis", title: "Mrs Begum, five minutes into her first antibiotic dose", clock: "16:05", limit: 60, emergency: true,
  banner: "Simulation for education only. Simplified physiology and illustrative numbers. Follow the Resuscitation Council UK algorithm and your local anaphylaxis protocol for doses and procedures.",
  patient: { name: "Aisha Begum", age: 46, where: "Medical admissions unit, bay 1, bed 3",
    summary: "Admitted with a chest infection. Her first dose of IV co-amoxiclav started 5 minutes ago. She presses her call bell: \"I feel really strange.\"",
    background: ["Community-acquired pneumonia", "Asthma (salbutamol inhaler)", "No known drug allergies recorded; she hasn't had penicillin before", "Weight 72 kg"] },
  handover: "You started her first dose of IV co-amoxiclav at 16:00. Now she's calling you: her face is flushed, her lips look swollen, and she's scratching her arms.",
  vitals: { rr: 28, spo2: 90, o2: false, sbp: 84, hr: 132, temp: 36.9, avpu: "A" },
  processes: [
    { when: (s) => !s.f.stopped, rate: { rr: 0.15, spo2: -0.35, sbp: -1.1, hr: 0.8 } },
    { when: (s) => s.f.stopped && adr(s) === 0, rate: { rr: 0.08, spo2: -0.2, sbp: -0.6, hr: 0.4 } },
    { when: (s) => adr(s) === 1, toward: { sbp: [94, 3], spo2: [93, 1], rr: [24, 1], hr: [118, 2] } },
    { when: (s) => adr(s) >= 2, toward: { sbp: [112, 2], spo2: [95, 0.8], rr: [20, 0.8], hr: [104, 1.5] } },
    { when: (s) => s.v.o2, toward: { spo2: [97, 0.6] } },
    { when: (s) => s.f.flat, rate: { sbp: 0.15 } },
    { when: (s) => s.f.fluids, toward: { sbp: [118, 0.8] } },
  ],
  minute(s) {
    if (s.v.sbp < 75 && s.v.avpu === "A") s.v.avpu = "C";
    if (s.v.sbp >= 85 && s.v.avpu === "C") s.v.avpu = "A";
    if (s.f.stood && !s.f.stoodDone) { s.f.stoodDone = true; s.v.sbp -= 25; }
  },
  collapse: (s) => (s.v.sbp < 60 || s.v.spo2 < 80 ? "Mrs Begum loses consciousness and her pulse becomes impalpable. The resuscitation team start CPR." : null),
  firstOk: ["stop", "help"],
  find: {
    airway: (s) => (adr(s) >= 2 ? "Her lips are less swollen; her voice is normal." : "Her lips and tongue are swollen and her voice is hoarse. No stridor yet."),
    breathing: (s) => `Breathing ${Math.round(s.v.rr)} a minute with a widespread wheeze. SpO2 ${Math.round(s.v.spo2)}% ${s.v.o2 ? "on oxygen" : "on air"}.`,
    circulation: (s) => `Pulse ${Math.round(s.v.hr)}, weak. BP ${Math.round(s.v.sbp)}/${Math.round(s.v.sbp * 0.55)}. Capillary refill 4 seconds. ${s.f.stopped ? "The infusion is stopped." : "The co-amoxiclav infusion is still running."}`,
    disability: (s) => `${s.v.avpu === "A" ? "Alert, anxious: \"I feel like something terrible is happening.\"" : "She's drowsy and confused."} Capillary glucose 6.8 mmol/L.`,
    exposure: () => "A raised, itchy, blotchy rash (urticaria) over her chest, arms and face. Temperature 36.9°C.",
    chart: () => "Obs at 15:30, before the antibiotic: NEWS2 3 (RR 22, SpO2 95% on air, temperature 37.9). Allergy status: no known drug allergies.",
    drugs: () => "IV co-amoxiclav, first dose started at 16:00. Salbutamol inhaler PRN. The ward's anaphylaxis box (with adrenaline for IM use) is on the emergency trolley.",
    ask: (s) => (adr(s) >= 2 ? "\"I can breathe better now. What happened?\"" : "\"My throat feels tight... I feel faint.\""),
  },
  actions: [
    { id: "stop", group: "Act", label: "Stop the co-amoxiclav infusion immediately", mins: 1, once: true, run: (s) => { s.f.stopped = true; return "You stop the infusion and keep the line in place. Keep the bag for the team."; } },
    { id: "help", group: "Act", label: "Pull the emergency buzzer to get help to the bedside", mins: 1, once: true, run: (s) => { s.f.help = true; return "A colleague comes at once and brings the emergency trolley. You still need to put out the emergency call."; } },
    { id: "flat", group: "Act", label: "Lie her flat with her legs raised (sitting up only if breathing is very difficult)", mins: 1, once: true, run: (s) => { s.f.flat = true; return "You lie her flat and raise her legs. She says it's a little easier to breathe than she expected."; } },
    { id: "stand", group: "Act", label: "Help her stand and walk to the bathroom, as she feels sick", mins: 2, once: true, unsafe: () => "Standing someone with anaphylaxis can cause sudden cardiovascular collapse: keep her lying down.", run: (s) => { s.f.stood = true; return "She stands, goes grey and nearly collapses; you get her back onto the bed."; } },
    { id: "adrenaline", group: "Medicines", label: "Give IM adrenaline (anterolateral thigh) at the dose in the anaphylaxis algorithm", mins: 2,
      partial: (s) => (adr(s) >= 1 && s.t - s.did.adrenaline.at(-1) < 5 ? "Repeat doses are given 5 minutes apart if she isn't improving." : null),
      run: (s) => (adr(s) === 0 ? "You give IM adrenaline into her outer thigh and note the time. Reassess in 5 minutes: repeat it if she isn't improving." : "You give a further dose of IM adrenaline and note the time.") },
    { id: "o2", group: "Act", label: "Give high-flow oxygen", mins: 1, once: true, run: (s) => { s.v.o2 = true; return "You give high-flow oxygen via a non-rebreathe mask."; } },
    { id: "antihist", group: "Medicines", label: "Give an antihistamine first, then decide about adrenaline", mins: 3, once: true, partial: () => "Antihistamines don't treat the airway, breathing or circulation problems of anaphylaxis: IM adrenaline comes first, and antihistamines are at most an option for skin symptoms afterwards.", run: () => "You look for an antihistamine." },
    { id: "salbutamol", group: "Medicines", label: "Give her salbutamol inhaler for the wheeze instead", mins: 3, once: true, partial: () => "Bronchodilators can help wheeze after adrenaline, but they don't replace it: the emergency is anaphylaxis.", run: () => "She struggles to use the inhaler." },
    { id: "fluids", group: "Medicines", label: "Give the IV fluid bolus the team has prescribed", mins: 5, once: true, when: (s) => s.f.plan, run: (s) => { s.f.fluids = true; return "You run the prescribed fluid bolus through the existing cannula."; } },
    { id: "record", group: "Act", label: "Record the reaction as an allergy and keep the drug and packaging", mins: 2, once: true, when: (s) => adr(s) >= 1, run: (s) => { s.f.allergy = true; return "You update her allergy record (penicillin: anaphylaxis), put an allergy band on her, and keep the bag and packaging."; } },
  ],
  needLevel: () => 3,
  arrive(s, call) {
    if (call.who === "nic") return { text: "The nurse in charge says: \"This is anaphylaxis: put out an emergency call now, and give IM adrenaline.\"" };
    if (s.f.reviewed) return { text: "They check the treatment is under way." };
    s.f.plan = s.f.reviewed = true; s.f.reviewAt = s.t;
    const gave = adr(s) === 0; if (gave) (s.did.adrenaline ||= []).push(s.t);
    return { text: `The emergency team arrive.${gave ? " They give IM adrenaline at once." : ""} Plan: repeat IM adrenaline every 5 minutes if needed; an IV fluid bolus (prescribed); high-flow oxygen; mast cell tryptase samples; if there's no improvement after two doses of adrenaline, call critical care for an adrenaline infusion. She'll need observing for at least 6 to 12 hours, a referral to an allergy clinic and an allergy alert in her records. Her antibiotic will be changed.` };
  },
  complete: (s) => s.f.reviewed && adr(s) >= 2 && s.v.sbp >= 95 && s.v.spo2 >= 94 && s.f.stopped,
  completeText: "Her blood pressure and breathing have improved after a second dose of adrenaline and fluids. The team will observe her closely, and critical care are aware.",
  window: 3,
  checks: [
    { dim: "priorities", label: "Stopped the infusion within the first 2 minutes", why: "Removing the trigger is the first step: every minute the infusion runs, she gets more of the allergen.", test: (s) => { const t = T(s, "stop"); return t == null ? 0 : t <= 2 ? 1 : t <= 5 ? 0.5 : 0.2; } },
    { dim: "priorities", label: "Gave IM adrenaline yourself within 5 minutes", why: "IM adrenaline is the first-line treatment: don't wait for the team, and don't give antihistamines first.", test: (s) => { const t = T(s, "adrenaline"); return t == null ? 0 : t <= 5 ? 1 : t <= 10 ? 0.5 : 0.2; } },
    { dim: "recognition", label: "Repeated adrenaline after 5 minutes when she wasn't improving", why: "The algorithm repeats IM adrenaline after 5 minutes if there's no improvement.", test: (s) => { const d = s.did.adrenaline || []; if (!d.length) return 0; return d.length >= 2 && d[1] - d[0] >= 4 && d[1] - d[0] <= 10 ? 1 : d.length >= 2 ? 0.6 : 0; } },
    { dim: "priorities", label: "Positioned her lying down and kept her there", why: "Lying flat (legs raised) supports blood pressure; standing can cause collapse.", test: (s) => (s.f.stood ? 0 : s.f.flat ? 1 : 0.3) },
    { dim: "assessment", label: "Recorded the allergy and kept the drug for investigation", why: "The reaction must be recorded so penicillins are never given again, and reported (Yellow Card).", test: (s) => (s.f.allergy ? 1 : 0) },
  ],
  sbar: {
    s: [["anaphyla", "allergic reaction", "allergy"]],
    b: [["co-amoxiclav", "antibiotic", "penicillin", "infusion"], ["first dose", "minutes", "started"]],
    a: [["lip", "swell", "tongue", "voice", "airway"], ["wheez", "sat", "spo2", "breath"], ["bp", "blood pressure", "hypotens", "84"], ["{news}", "rash", "urticaria"]],
    r: [["now", "emergency", "immediately", "2222"], ["adrenaline", "come", "attend", "help"]],
  },
  sbarModel: "S: Medical emergency, bay 1 bed 3: Aisha Begum is having anaphylaxis. B: 46, pneumonia; first dose of IV co-amoxiclav started at 16:00. A: Swollen lips and tongue, hoarse voice, wheeze, RR 28, SpO2 90%, BP 84/46, HR 132, urticaria. NEWS2 12. I've stopped the infusion, laid her flat and given IM adrenaline at 16:07. R: I need the emergency team now.",
  note: [
    { text: "Timed entry, including the time of each adrenaline dose", cues: [["{time}"], ["adrenaline"]] },
    { text: "Suspected trigger: co-amoxiclav, first dose, infusion stopped", cues: [["co-amoxiclav", "antibiotic", "penicillin"], ["stop", "stopped"]] },
    { text: "Signs: airway swelling, wheeze, low blood pressure, rash, with observations or NEWS2", cues: [["swell", "lip", "wheez", "rash", "urticaria", "bp", "blood pressure", "{news}"]] },
    { text: "Who was called, and when", cues: [["2222", "emergency", "team", "doctor", "called", "escalat"]] },
    { text: "Allergy recorded and reported (Yellow Card or incident report)", cues: [["allergy"], ["record", "band", "yellow card", "report", "datix", "documented", "updated"]] },
    { text: "Ongoing plan: observation and allergy referral", cues: [["observ", "monitor", "clinic", "referral", "tryptase", "6 hours", "12 hours"]] },
  ],
  rubric: [
    "Recognises anaphylaxis from the sudden airway, breathing and circulation problems with skin changes after a new drug",
    "Stops the infusion, calls for help and escalates at emergency level",
    "Gives IM adrenaline promptly and repeats it at 5 minutes if there's no improvement, rather than giving antihistamines first",
    "SBAR is concise and gives the trigger, key signs and treatment given",
    "Record entry is timed and includes the trigger, signs, adrenaline times, escalation and the allergy record",
  ],
  model: `Sudden airway swelling, wheeze, low blood pressure and urticaria minutes after a first dose of a penicillin is anaphylaxis. Act immediately: stop the infusion (keep the line), get help to the bedside with the emergency buzzer and put out an emergency call.
Lie her flat with her legs raised (let her sit up only if breathing is very difficult, and never stand her up). Give IM adrenaline into the anterolateral thigh at the dose in the Resuscitation Council UK algorithm: any trained person can give adrenaline for anaphylaxis in an emergency. Give high-flow oxygen. Reassess after 5 minutes and give a second dose if she isn't improving. Antihistamines and inhalers don't replace adrenaline.
When the team arrive, give the prescribed fluid bolus and help with tryptase samples; if she doesn't respond to two doses of adrenaline, critical care will start an adrenaline infusion. She needs observing for at least 6 to 12 hours, as reactions can recur.
Record the allergy (penicillin: anaphylaxis), give her an allergy band, keep the bag, report it (Yellow Card and local incident system), and make sure she's referred to an allergy clinic. Document the times of everything, especially each adrenaline dose.`,
  lessons: ["u04-11", "u09-16", "u09-07", "u09-03"],
  review: { verified: null, note: "Physiology, timings and the anaphylaxis pathway need checking by a nurse educator against the current Resuscitation Council UK guideline." },
};
