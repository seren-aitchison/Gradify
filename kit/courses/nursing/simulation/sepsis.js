// NurseGradify simulation: post-operative sepsis. Fictional patient. EDUCATION ONLY: a simplified teaching
// model with illustrative numbers; local NEWS2, sepsis and escalation policies always apply.
// Guidance reflected: RCP NEWS2 (2017); NICE NG253 Suspected sepsis in over 16s (2024); BTS oxygen
// guideline (target 94 to 98% for most adults).
const T = (s, id) => s.did[id]?.[0] ?? null;
export default {
  id: "post-op-sepsis", title: "Mr Reid, day 2 after bowel surgery", clock: "14:00", limit: 100,
  banner: "Simulation for education only. Simplified physiology and illustrative numbers. Always follow your local NEWS2 chart, sepsis and escalation policies, and work within your competence and supervision.",
  patient: { name: "David Reid", age: 68, where: "Surgical ward, bay 2, bed 4",
    summary: "Day 2 after a laparotomy and bowel resection. The healthcare assistant says he \"doesn't look right\".",
    background: ["Laparotomy and right hemicolectomy 2 days ago", "Type 2 diabetes (diet-controlled)", "Urinary catheter in place", "No known allergies", "Last NEWS2 at 10:00: 2"] },
  handover: "The HCA has just taken his observations at 13:55 and is worried: Mr Reid says he feels hot and shivery and his abdomen hurts more than this morning. You're his nurse this afternoon.",
  vitals: { rr: 22, spo2: 94, o2: false, sbp: 104, hr: 108, temp: 38.3, avpu: "A" },
  processes: [
    { when: (s) => !s.f.abx, rate: { rr: 0.08, hr: 0.25, sbp: -0.35, spo2: -0.04, temp: 0.008 } },
    { when: (s) => s.f.fluids, toward: { sbp: [114, 0.6], hr: [100, 0.3] } },
    { when: (s) => s.f.abx && s.f.fluids, toward: { rr: [18, 0.1], hr: [92, 0.3], temp: [37.8, 0.01] } },
    { when: (s) => s.v.o2, toward: { spo2: [96, 0.5] } },
    { when: (s) => s.f.sitUp && !s.v.o2, toward: { spo2: [95, 0.05] } },
  ],
  minute(s) {
    if (s.v.sbp < 90 && s.v.avpu === "A") s.v.avpu = "C";
    if (s.v.sbp >= 95 && s.v.avpu === "C") s.v.avpu = "A";
  },
  collapse: (s) => (s.v.sbp < 75 ? "Mr Reid becomes unresponsive with a systolic blood pressure below 75. A colleague puts out an emergency call and the emergency team take over." : null),
  find: {
    airway: () => "He's talking to you in sentences. His airway is clear, with no added noises.",
    breathing: (s) => `Breathing ${Math.round(s.v.rr)} breaths a minute, shallow; it hurts him to breathe deeply. SpO2 ${Math.round(s.v.spo2)}% ${s.v.o2 ? "on oxygen" : "on air"}. Reduced air entry at the right base.`,
    circulation: (s) => `Pulse ${Math.round(s.v.hr)}, regular. BP ${Math.round(s.v.sbp)}/${Math.round(s.v.sbp * 0.6)}. Capillary refill 3 seconds; hands warm. Catheter bag: about 120 ml of dark urine since 08:00.`,
    disability: (s) => `${s.v.avpu === "A" ? "Alert and oriented." : "He's newly confused and doesn't know where he is."} Pupils equal and reactive. Capillary glucose 8.1 mmol/L. Abdominal pain 6 out of 10.`,
    exposure: (s) => `Temperature ${Math.round(s.v.temp * 10) / 10}°C. Abdomen distended and tender around the wound; the dressing is dry. Calves soft and non-tender. Cannula site clean.`,
    chart: () => "Obs chart: NEWS2 1 at 06:00, 2 at 10:00 (heart rate creeping up). Fluid balance: urine output has fallen from about 60 ml an hour yesterday to under 20 ml an hour today.",
    drugs: () => "Regular paracetamol (next due 16:00), enoxaparin, omeprazole. PRN oxycodone (last given 11:30). Oxygen prescribed: target saturation 94 to 98%. No antibiotics prescribed.",
    ask: () => "\"I feel awful, nurse. Hot then cold, and my belly's worse than this morning.\"",
  },
  actions: [
    { id: "sitUp", group: "Act", label: "Sit him upright", mins: 1, once: true, run: (s) => { s.f.sitUp = true; return "He's more comfortable sitting up and his breathing eases slightly."; } },
    { id: "o2", group: "Act", label: "Start oxygen as prescribed, titrating to 94–98%", mins: 2, once: true, run: (s) => { s.v.o2 = true; return "You start oxygen via nasal cannulae and set it to keep his saturation in the target range."; } },
    { id: "uo", group: "Act", label: "Start hourly urine output monitoring", mins: 2, once: true, run: (s) => { s.f.uo = true; return "You empty the catheter bag, record the volume and start an hourly urine output chart."; } },
    { id: "freq", group: "Act", label: "Increase his observations to at least every 30 minutes", mins: 1, once: true, run: (s) => { s.f.freq = true; return "You change his observation frequency on the chart and tell the HCA."; } },
    { id: "plan4h", group: "Act", label: "Recheck his observations in 4 hours", mins: 1, once: true, unsafe: () => "A NEWS2 of 5 or more needs an urgent clinical review, not routine 4-hourly observations.", run: () => "You plan a 4-hourly recheck." },
    { id: "paracetamol", group: "Medicines", label: "Give a dose of paracetamol now for the fever", mins: 2, once: true, unsafe: () => "His regular paracetamol isn't due until 16:00: giving it early risks exceeding the maximum daily dose. Treat the cause by escalating.", run: () => "You give paracetamol." },
    { id: "stockAbx", group: "Medicines", label: "Give IV antibiotics from ward stock before a prescription", mins: 5, once: true, when: (s) => !s.f.plan, unsafe: () => "Giving a prescription-only medicine without a prescription (or a PGD you're authorised to use) is outside your scope and unlawful.", run: (s) => { s.f.abx = true; s.f.abxAt = s.t; return "You give an IV antibiotic from stock."; } },
    { id: "cultures", group: "Act", label: "Take blood cultures (if you're trained) before the antibiotics", mins: 8, once: true, when: (s) => s.f.plan, run: (s) => { s.f.cultures = true; return "You take blood cultures aseptically and send them with the lactate sample."; } },
    { id: "abx", group: "Medicines", label: "Give the prescribed IV antibiotics", mins: 8, once: true, when: (s) => s.f.plan && !s.f.abx, run: (s) => { s.f.abx = true; s.f.abxAt = s.t; return "You check the prescription and his allergy status, then give the first dose of IV antibiotics."; } },
    { id: "fluids", group: "Medicines", label: "Give the prescribed IV fluid bolus", mins: 10, once: true, when: (s) => s.f.plan, run: (s) => { s.f.fluids = true; return "You start the prescribed fluid bolus and watch for breathlessness."; } },
  ],
  arrive(s, call) {
    if (call.who === "nic") return { text: "Sister Okafor looks at him and the chart: \"He needs a doctor now. Bleep the surgical team as urgent, or call outreach.\"" };
    if (s.f.reviewed) return { text: "They check the plan is under way." };
    s.f.plan = s.f.reviewed = true; s.f.reviewAt = s.t;
    return { text: "Dr Patel (surgical registrar) reviews him: suspected sepsis, possibly an anastomotic leak or a chest source. Plan: blood cultures, venous gas with lactate, IV antibiotics as per the sepsis policy within the hour, an IV fluid bolus, hourly urine output, observations at least every 30 minutes, urgent CT abdomen, and escalate to outreach if he doesn't improve. Prescriptions are written." };
  },
  complete: (s) => s.f.reviewed && s.f.abx && s.f.fluids && s.obs.some((o) => o.t > s.f.reviewAt + 5),
  completeText: "Antibiotics and fluids are in, he's been reviewed, and his observations are being repeated. The surgical team take him for a CT scan.",
  window: 15,
  checks: [
    { dim: "priorities", label: "Gave oxygen promptly when his saturation fell below target", why: "SpO2 below 94% on air needs oxygen titrated to the prescribed target.", test: (s) => { const low = s.track.find((p) => p.spo2 < 94)?.t; if (low == null) return null; const o = T(s, "o2"); return o == null ? 0 : o <= low + 15 ? 1 : 0.4; } },
    { dim: "priorities", label: "Took blood cultures before the antibiotics", why: "Cultures taken after antibiotics are less likely to identify the organism; don't delay antibiotics for them, though.", test: (s) => (!s.f.abx || !s.f.plan ? null : T(s, "cultures") != null && T(s, "cultures") <= T(s, "abx") ? 1 : 0.5) },
    { dim: "priorities", label: "Antibiotics given within an hour of him meeting sepsis criteria", why: "NICE: high-risk suspected sepsis needs antibiotics within 1 hour.", test: (s) => (s.f.abxAt == null ? 0 : s.f.abxAt <= 60 ? 1 : s.f.abxAt <= 90 ? 0.5 : 0.2) },
    { dim: "assessment", label: "Looked at the fluid balance or urine output", why: "Falling urine output is a sign of sepsis-related organ dysfunction.", test: (s) => (T(s, "chart") != null || T(s, "circulation") != null || T(s, "uo") != null ? 1 : 0) },
    { dim: "recognition", label: "Repeated his observations after the plan was started", why: "Reassessment shows whether treatment is working.", test: (s) => (s.f.reviewAt == null ? null : s.obs.some((o) => o.t > s.f.reviewAt) ? 1 : 0) },
  ],
  sbar: {
    s: [["sepsis", "concern", "worried", "deteriorat", "unwell", "news"]],
    b: [["laparotomy", "bowel", "surgery", "hemicolectomy", "resection", "post-op", "post op", "operation"], ["day 2", "day two", "2 days", "two days"]],
    a: [["{news}"], ["temp", "fever", "pyrexi", "38"], ["pulse", "heart rate", "hr ", "tachycard"], ["bp", "blood pressure", "systolic", "hypotens"], ["urine", "output", "oligur"]],
    r: [["review", "come", "see him", "attend", "assess"], ["now", "minutes", "mins", "urgent", "immediately", "asap"]],
  },
  sbarModel: "S: I'm calling about David Reid in bay 2; I'm worried he has sepsis: NEWS2 6 and rising. B: Day 2 after a laparotomy and right hemicolectomy; type 2 diabetes. A: RR 22, SpO2 94% on air, BP 104/62, HR 108, temperature 38.3, alert; abdomen more painful and distended; urine under 20 ml an hour. R: Please come and review him within 30 minutes. Can you prescribe antibiotics and fluids per the sepsis policy? I'll start oxygen and repeat his observations.",
  note: [
    { text: "Timed entry", cues: [["{time}"]] },
    { text: "Observations and the NEWS2 score", cues: [["{news}"]] },
    { text: "Key findings: fever, tachycardia, low blood pressure or reduced urine output", cues: [["temp", "fever", "pyrexi", "tachy", "urine", "output", "bp", "blood pressure"]] },
    { text: "Who you escalated to, and when", cues: [["escalat", "informed", "bleep", "called", "reviewed by", "dr ", "doctor", "registrar", "outreach"]] },
    { text: "Treatment given: oxygen, cultures, antibiotics, fluids", cues: [["oxygen", "antibiotic", "culture", "fluid"]] },
    { text: "The plan, including how often to reassess", cues: [["plan", "reassess", "hourly", "30 min", "monitor", "repeat"]] },
  ],
  rubric: [
    "Recognises possible sepsis and states the NEWS2 score accurately",
    "Escalates to an appropriate clinician with appropriate urgency for the score",
    "SBAR gives relevant background (surgery, day 2) concisely",
    "SBAR assessment includes key abnormal observations and urine output",
    "SBAR recommendation states clearly what is needed and how quickly",
    "Record entry is timed and includes observations, actions, escalation and the plan",
  ],
  model: `On arrival, assess ABCDE quickly: he's talking (A), but breathing fast with a saturation at the bottom of his target range (B); he's tachycardic, borderline hypotensive, and his urine output has fallen (C); he's alert for now (D); and he's febrile with a more tender abdomen (E).
A full set of observations gives a NEWS2 of 6: an urgent response threshold. With fever, a rising heart rate, falling blood pressure and reduced urine output after bowel surgery, think sepsis.
Sit him up and start oxygen titrated to 94 to 98% as prescribed, increase observations, and start hourly urine output monitoring. Escalate urgently to the surgical doctor (or outreach, per local policy) with a clear SBAR; don't wait for 4-hourly observations or treat the fever on its own.
When the plan comes, take cultures if trained (without delaying antibiotics), give the prescribed antibiotics within the hour and the fluid bolus, and reassess. If he deteriorates further (NEWS2 7 or more, new confusion, falling blood pressure), escalate to critical care outreach or the emergency team.
Document a timed entry: findings, NEWS2, who you escalated to and when, what was given, and the plan for reassessment.`,
  lessons: ["u03-27", "u03-28", "u05-33", "u03-30"],
  review: { verified: null, note: "Physiology, timings and the expected actions need checking by a nurse educator against current NEWS2 and sepsis guidance." },
};
