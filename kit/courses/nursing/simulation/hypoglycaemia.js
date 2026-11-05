// NurseGradify simulation: hypoglycaemia. Fictional patient. EDUCATION ONLY: a simplified teaching model
// with illustrative numbers. Follow your local hypoglycaemia protocol: amounts and products vary.
// Guidance reflected: Joint British Diabetes Societies for Inpatient Care, The hospital management of
// hypoglycaemia in adults with diabetes mellitus (hypoglycaemia below 4.0 mmol/L; 15 to 20 g of quick-acting
// carbohydrate, recheck after 10 to 15 minutes, then longer-acting carbohydrate); RCP NEWS2 (2017).
const T = (s, id) => s.did[id]?.[0] ?? null;
const bgNow = (s) => Math.round(s.v.bg * 10) / 10;
export default {
  id: "hypoglycaemia", title: "Mr Owusu, sweaty and muddled before lunch", clock: "12:20", limit: 90,
  banner: "Simulation for education only. Simplified physiology and illustrative numbers. Follow your local hypoglycaemia protocol and escalation policy.",
  patient: { name: "Samuel Owusu", age: 59, where: "Medical ward, bay 5, bed 2",
    summary: "Admitted yesterday with cellulitis of the left leg. His daughter calls you over: he's sweaty and isn't making sense.",
    background: ["Type 2 diabetes on insulin (mealtime rapid-acting and bedtime long-acting)", "Cellulitis of the left leg, on IV antibiotics", "Hypertension", "Able to swallow normally"] },
  handover: "His daughter says he \"isn't himself\": he's sweaty, irritable and muddled. Lunch hasn't arrived yet.",
  vitals: { rr: 18, spo2: 97, o2: false, sbp: 138, hr: 104, temp: 37.2, avpu: "C", bg: 2.6 },
  flags: {},
  processes: [
    { when: (s) => s.f.carbAt == null && s.f.glucagonAt == null, rate: { bg: -0.02 } },
    { when: (s) => s.f.carbAt != null && s.t < s.f.carbAt + 15, toward: { bg: [5.4, 0.2] } },
    { when: (s) => s.f.glucagonAt != null && s.t < s.f.glucagonAt + 20, toward: { bg: [5.8, 0.25] } },
    // without longer-acting carbohydrate, the insulin still acting pulls glucose down again
    { when: (s) => !s.f.longCarb && ((s.f.carbAt != null && s.t >= s.f.carbAt + 25) || (s.f.glucagonAt != null && s.t >= s.f.glucagonAt + 30)), rate: { bg: -0.035 } },
    { when: (s) => s.f.longCarb, toward: { bg: [6.8, 0.05] } },
    { when: (s) => s.v.bg >= 4, toward: { hr: [84, 1] } },
    { when: (s) => s.v.bg < 4, toward: { hr: [106, 0.5] } },
  ],
  minute(s) { s.v.avpu = s.v.bg < 2.2 ? "V" : s.v.bg < 4 ? "C" : "A"; },
  collapse: (s) => (s.v.bg < 1.5 ? "Mr Owusu has a seizure from severe hypoglycaemia. The emergency team are called and give IV glucose." : null),
  firstOk: ["bg"],
  find: {
    airway: () => "He's talking, though muddled. Airway clear.",
    breathing: (s) => `Breathing ${Math.round(s.v.rr)} a minute, unlaboured. SpO2 ${Math.round(s.v.spo2)}% on air.`,
    circulation: (s) => `Pulse ${Math.round(s.v.hr)}. BP ${Math.round(s.v.sbp)}/${Math.round(s.v.sbp * 0.6)}. ${s.v.bg < 4 ? "He's pale, sweaty and clammy." : "His skin is warm and dry now."}`,
    disability: (s) => (s.v.avpu === "A" ? "Alert and oriented. Pupils equal and reactive." : s.v.avpu === "V" ? "He's drowsy and responds only to your voice. He can't safely swallow." : "He's confused and irritable: \"Leave me alone, I'm fine.\" Pupils equal and reactive. (Check his glucose: it's the D in ABCDE.)"),
    exposure: (s) => `Temperature ${Math.round(s.v.temp * 10) / 10}°C. Left lower leg red and swollen within the marked borders; not spreading.`,
    chart: () => "Food chart: breakfast tray returned untouched at 09:00. Obs at 08:00: NEWS2 1, alert. Glucose at 07:30: 7.2 mmol/L.",
    drugs: () => "Rapid-acting insulin with meals: given at 08:00 with breakfast. Long-acting insulin at 22:00. IV flucloxacillin. The hypoglycaemia treatment protocol is on the chart.",
    ask: (s) => (s.v.avpu === "A" ? "\"I feel much better. I didn't fancy breakfast this morning.\"" : "He's irritable and muddled, and pushes your hand away."),
  },
  actions: [
    { id: "bg", group: "Observe", label: "Check his capillary blood glucose", mins: 2, run: (s) => { s.f.bgChecked = true; const v = bgNow(s); (s.f.bgs ||= []).push({ t: s.t, v }); return `Capillary blood glucose: <b>${v} mmol/L</b>.${v < 4 ? " That's hypoglycaemia (below 4.0 mmol/L)." : ""}`; } },
    { id: "swallow", group: "Assess", label: "Check he's conscious, cooperative and able to swallow safely", mins: 1, run: (s) => { s.f.swallowChecked = s.t; return s.v.avpu === "V" ? "He's too drowsy to swallow safely: don't give anything by mouth." : "He can swallow safely, though he's grumpy about it."; } },
    { id: "carb", group: "Act", label: "Give 15–20 g of quick-acting carbohydrate per the protocol (such as fruit juice or glucose tablets)", mins: 3,
      unsafe: (s) => (s.v.avpu === "V" ? "He's too drowsy to swallow safely: oral treatment risks aspiration. Follow the protocol for people who can't swallow and escalate." : null),
      partial: (s) => (!s.f.bgChecked ? "You treated before confirming his glucose: check it first if you can do so without delay." : null),
      run: (s) => { if (s.v.avpu !== "V") s.f.carbAt = s.t; return s.v.avpu === "V" ? "He coughs and splutters." : "He drinks the juice with some persuasion."; } },
    { id: "glucagon", group: "Medicines", label: "Give IM glucagon under the hypoglycaemia protocol", mins: 3, once: true,
      partial: (s) => (s.v.avpu !== "V" ? "He could swallow: oral quick-acting carbohydrate comes first under the protocol." : null),
      run: (s) => { s.f.glucagonAt = s.t; return "You give IM glucagon under the protocol and stay with him."; } },
    { id: "longCarb", group: "Act", label: "Give a longer-acting carbohydrate (a sandwich, or his lunch if it's here)", mins: 5, once: true,
      partial: (s) => (s.v.bg < 4 ? "His glucose is still below 4.0: treat with quick-acting carbohydrate first, then give longer-acting carbohydrate once it's above 4." : null),
      run: (s) => { s.f.longCarb = s.v.bg >= 4 || s.f.longCarb; return s.v.bg >= 4 ? "He eats a sandwich." : "He nibbles it, but his glucose is still low."; } },
    { id: "insulin", group: "Medicines", label: "Give his lunchtime insulin now so it isn't missed", mins: 2, once: true, unsafe: (s) => (s.v.bg < 4 || !s.f.longCarb ? "Giving rapid-acting insulin while he's hypoglycaemic, or before he's eating, will drive his glucose lower." : null), run: (s) => { if (s.v.bg < 6) s.v.bg -= 1; return "You give his mealtime insulin."; } },
    { id: "omit", group: "Medicines", label: "Omit all his insulin for the rest of the day, including tonight's long-acting dose", mins: 1, once: true, partial: () => "Don't stop all insulin on your own: the long-acting dose usually continues, and the doses need reviewing by the medical or diabetes team.", run: () => "You note on the chart to omit all insulin." },
  ],
  needLevel: () => 2,
  arrive(s, call) {
    if (call.who === "nic") return { text: "The nurse in charge says: \"Keep following the hypo protocol, and let the doctor know so his insulin is reviewed.\"" };
    if (s.f.reviewed) return { text: "They check the plan is under way." };
    s.f.plan = s.f.reviewed = true; s.f.reviewAt = s.t;
    return { text: "Dr Evans reviews him: hypoglycaemia after mealtime insulin with no breakfast. Plan: continue the hypoglycaemia protocol; glucose checks before meals and at bedtime, and hourly until stable; give mealtime insulin only with meals he eats; don't omit his long-acting insulin; refer to the inpatient diabetes team to review his doses." };
  },
  complete: (s) => s.f.longCarb && s.f.reviewed && (s.f.bgs || []).some((b) => b.v >= 4 && b.t > (s.f.carbAt ?? s.f.glucagonAt ?? 0)),
  completeText: "His glucose is back above 4, he's eaten, and the doctor has reviewed his insulin.",
  window: 30,
  checks: [
    { dim: "assessment", label: "Checked his capillary glucose within 5 minutes", why: "Sweating, confusion and irritability in someone on insulin is hypoglycaemia until proven otherwise: check glucose at once.", test: (s) => { const t = T(s, "bg"); return t == null ? 0 : t <= 5 ? 1 : 0.5; } },
    { dim: "priorities", label: "Treated within 5 minutes of the low reading", why: "Hypoglycaemia is treated straight away, before escalation.", test: (s) => { const b = (s.f.bgs || []).find((x) => x.v < 4)?.t; if (b == null) return null; const t = Math.min(s.f.carbAt ?? 999, s.f.glucagonAt ?? 999); return t - b <= 5 ? 1 : t < 999 ? 0.5 : 0; } },
    { dim: "priorities", label: "Checked he could swallow before giving oral treatment", why: "Oral treatment is only safe if he's conscious, cooperative and can swallow.", test: (s) => (s.f.carbAt == null ? null : s.f.swallowChecked != null && s.f.swallowChecked <= s.f.carbAt ? 1 : 0.5) },
    { dim: "recognition", label: "Rechecked his glucose 10 to 15 minutes after treatment", why: "The protocol repeats treatment if glucose is still below 4.0 at the recheck.", test: (s) => { const t = s.f.carbAt ?? s.f.glucagonAt; if (t == null) return null; return (s.f.bgs || []).some((b) => b.t >= t + 8 && b.t <= t + 20) ? 1 : (s.f.bgs || []).some((b) => b.t > t) ? 0.5 : 0; } },
    { dim: "priorities", label: "Gave longer-acting carbohydrate once his glucose was above 4", why: "Without it, the insulin still acting can drop his glucose again.", test: (s) => (s.f.longCarb ? 1 : 0) },
  ],
  sbar: {
    s: [["hypo", "low blood sugar", "low glucose", "glucose", "bm", "sugar"]],
    b: [["diabet", "insulin"], ["breakfast", "didn't eat", "not eaten", "missed", "cellulitis"]],
    a: [["2.", "glucose", "bm", "mmol"], ["confus", "muddled", "drowsy", "sweat"], ["juice", "treated", "carbohydrate", "glucagon", "protocol", "{news}"]],
    r: [["review", "come", "see"], ["insulin", "dose", "prescription", "regimen", "plan"]],
  },
  sbarModel: "S: I'm calling about Samuel Owusu, bay 5: he had a hypo of 2.6 mmol/L with confusion and sweating. B: Type 2 diabetes on mealtime and long-acting insulin, admitted with cellulitis; he had his breakfast insulin but didn't eat. A: I treated him under the hypo protocol with 15–20 g of quick-acting carbohydrate; recheck at 15 minutes was 4.8 and he's now alert and eating a sandwich. NEWS2 now 0. R: Please review him this afternoon and his insulin doses; can you refer him to the diabetes team?",
  note: [
    { text: "Timed entry", cues: [["{time}"]] },
    { text: "Glucose readings, before and after treatment", cues: [["mmol", "glucose", "bm"]] },
    { text: "Symptoms: confusion, sweating, irritability", cues: [["confus", "sweat", "muddled", "irritab", "clammy"]] },
    { text: "Treatment given under the protocol", cues: [["juice", "glucose tablet", "carbohydrate", "glucagon", "protocol"]] },
    { text: "Who you informed, and when", cues: [["informed", "escalat", "doctor", "dr ", "reviewed", "called", "bleep"]] },
    { text: "The plan: glucose monitoring and insulin review", cues: [["monitor", "hourly", "recheck", "check"], ["insulin", "diabetes team", "review"]] },
  ],
  rubric: [
    "Recognises hypoglycaemia promptly by checking capillary glucose",
    "Follows the hypoglycaemia protocol: swallow check, quick-acting carbohydrate, recheck, longer-acting carbohydrate",
    "Escalates to a doctor for review of insulin, at appropriate urgency",
    "SBAR gives the glucose readings, cause and treatment concisely",
    "Record entry is timed and includes readings, treatment, escalation and the plan",
  ],
  model: `Sweating, confusion and irritability in someone on insulin who hasn't eaten is hypoglycaemia until proved otherwise. A quick ABCDE: airway and breathing are fine, he's tachycardic and clammy, and for D, check his capillary glucose straight away: 2.6 mmol/L.
He's confused but conscious, cooperative and able to swallow, so treat at once under the hypoglycaemia protocol with 15 to 20 g of quick-acting carbohydrate, then recheck after 10 to 15 minutes, repeating if it's still below 4.0. Once it's above 4, give longer-acting carbohydrate (a sandwich or his meal), because the insulin given at breakfast is still working. If he becomes too drowsy to swallow, nothing goes by mouth: use the protocol for people who can't swallow (such as IM glucagon) and escalate urgently.
Don't give his lunchtime insulin until he's eating, and don't stop all his insulin yourself. Inform the doctor so the insulin is reviewed, and suggest a referral to the inpatient diabetes team.
Document a timed entry: symptoms, readings before and after, treatment given, who you told, and the monitoring plan.`,
  lessons: ["u05-17", "u10-10", "u03-27", "u03-30"],
  review: { verified: null, note: "Physiology, timings and protocol steps need checking by a nurse educator against the current JBDS guidance and typical local protocols." },
};
