// NurseGradify simulation: an in-hospital stroke. Fictional patient. EDUCATION ONLY: a simplified teaching model
// with illustrative numbers; follow your local stroke pathway.
// Guidance reflected: NICE NG128 Stroke and TIA in over 16s (rapid recognition, exclude hypoglycaemia,
// immediate brain imaging, thrombolysis and thrombectomy time windows, swallow screening before oral intake,
// no aspirin until haemorrhage is excluded). The teaching point: NEWS2 can be 0 in a stroke, and clinical
// concern alone justifies an emergency call.
const T = (s, id) => s.did[id]?.[0] ?? null;
const called = (s) => s.calls.find((x) => x.level >= 3)?.at ?? null;
export default {
  id: "stroke", title: "Mrs Adeyemi, a weak arm and slurred speech", clock: "10:15", limit: 80, emergency: true,
  banner: "Simulation for education only. Simplified physiology and illustrative numbers. Follow your local stroke pathway and escalation policy.",
  patient: { name: "Grace Adeyemi", age: 64, where: "Surgical ward, bay 6, bed 2",
    summary: "Day 3 after a laparoscopic gallbladder removal, due home tomorrow. Her husband calls you over: \"She's talking funny, and she can't lift her cup.\"",
    background: ["Laparoscopic cholecystectomy 3 days ago", "Atrial fibrillation: her apixaban has been paused around surgery and not yet restarted", "Hypertension", "Last seen well by the HCA at 09:50, chatting normally"] },
  handover: "Her husband says she was fine when he arrived at 10:00, but in the last few minutes her speech has become slurred and her right hand keeps dropping her cup.",
  vitals: { rr: 18, spo2: 96, o2: false, sbp: 186, hr: 92, temp: 36.8, avpu: "A", bg: 6.2 },
  responders: { stroke: { label: "Stroke team (in-hospital stroke alert)", level: 4, delay: { emergency: 5, urgent: 5, routine: 5 } } },
  processes: [
    { when: (s) => s.v.o2, toward: { spo2: [97, 0.5] } },
  ],
  minute(s) {
    // the stroke progresses without treatment; the time to the stroke team matters more than the observations
    const t = called(s) ?? s.t;
    if (!s.f.reviewed && t >= 35 && s.v.avpu === "A") { s.v.avpu = "C"; s.f.worse = s.t; }
    if (!s.f.reviewed && t >= 65) s.v.avpu = "V";
    if (s.f.drink && !s.f.aspirated) { s.f.aspirated = s.t; s.v.rr += 6; s.v.spo2 -= 5; }
  },
  collapse: (s) => (s.v.avpu === "V" && !s.f.reviewed ? "Mrs Adeyemi becomes drowsy and responds only to voice. The emergency team are called and take over." : null),
  firstOk: ["fast"],
  find: {
    airway: () => "She's talking, though slurred. Airway clear; she's handling her saliva.",
    breathing: (s) => `Breathing ${Math.round(s.v.rr)} a minute. SpO2 ${Math.round(s.v.spo2)}% ${s.v.o2 ? "on oxygen" : "on air"}.${s.f.aspirated ? " New crackles at the right base and she's coughing." : " Chest clear."}`,
    circulation: (s) => `Pulse ${Math.round(s.v.hr)}, irregularly irregular. BP ${Math.round(s.v.sbp)}/${Math.round(s.v.sbp * 0.55)}. Capillary refill under 2 seconds.`,
    disability: (s) => `${s.v.avpu === "A" ? "Alert but frustrated: her speech is slurred and she struggles to find words." : s.v.avpu === "C" ? "She's become muddled and doesn't follow instructions well." : "She's drowsy."} Right-sided facial droop. Pupils equal and reactive.`,
    exposure: () => "Temperature 36.8°C. Laparoscopic wounds clean and dry. Calves soft.",
    chart: () => "Obs at 08:00: NEWS2 1. BP usually 140s/80s. Her husband says he last saw her normal at 10:00; the HCA saw her chatting normally at 09:50.",
    drugs: () => "Apixaban: withheld since surgery, restart date not yet decided. Amlodipine, ramipril. Aspirin isn't prescribed. Paracetamol.",
    ask: (s) => (s.v.avpu === "A" ? "She tries to answer, but the words come out jumbled and she starts to cry." : "She doesn't answer clearly."),
  },
  actions: [
    { id: "fast", group: "Assess", label: "Assess with FAST (face, arms, speech) and note the time she was last known well", mins: 2, once: true, run: (s) => { s.f.fast = true; return "Face: right-sided droop. Arms: her right arm drifts down. Speech: slurred, with word-finding problems. Last known well: 09:50 (HCA). Time matters: this could be a stroke."; } },
    { id: "bg", group: "Observe", label: "Check her capillary blood glucose", mins: 2, once: true, run: (s) => { s.f.bg = true; return "Capillary glucose 6.2 mmol/L: hypoglycaemia, which can mimic a stroke, is ruled out."; } },
    { id: "neuro", group: "Observe", label: "Do neurological observations (GCS, pupils, limb power)", mins: 3, run: (s) => { s.f.neuro = (s.f.neuro || 0) + 1; return s.v.avpu === "A" ? "GCS 14 (confused speech). Pupils equal and reactive. Right arm power 2 out of 5, right leg 4 out of 5." : "GCS 12: she opens her eyes to voice and her speech is confused. Right arm power 1 out of 5."; } },
    { id: "nbm", group: "Act", label: "Keep her nil by mouth until her swallow has been screened", mins: 1, once: true, run: (s) => { s.f.nbm = true; return "You remove her drink, put up a nil-by-mouth sign and explain to her husband why."; } },
    { id: "position", group: "Act", label: "Sit her up, supporting her weak side, and keep the bed rails and call bell safe", mins: 1, once: true, run: (s) => { s.f.position = true; return "You sit her up with her right arm supported on a pillow."; } },
    { id: "drink", group: "Act", label: "Let her finish her cup of tea, as she's thirsty", mins: 2, once: true, unsafe: () => "Swallowing may be affected: nothing by mouth until a swallow screen has been done.", run: (s) => { s.f.drink = true; return "She sips the tea and starts coughing."; } },
    { id: "aspirin", group: "Medicines", label: "Give aspirin from the ward stock, as this looks like a stroke", mins: 2, once: true, unsafe: () => "Aspirin mustn't be given until a brain scan has excluded haemorrhage, and only when prescribed.", run: () => "You give aspirin." },
    { id: "bp", group: "Medicines", label: "Give her amlodipine early to bring her blood pressure down", mins: 2, once: true, unsafe: () => "Blood pressure in acute stroke is managed by the stroke team, depending on the type of stroke and thrombolysis: don't lower it yourself.", run: () => "You give amlodipine." },
    { id: "ct", group: "Act", label: "Escort her to CT with the stroke team", mins: 10, once: true, when: (s) => s.f.plan, run: (s) => { s.f.ct = s.t; return "You go with her to CT, taking her notes, the drug chart and her husband's account of the timings."; } },
  ],
  needLevel: () => 3,
  arrive(s, call) {
    if (call.who === "nic") return { text: "The nurse in charge says: \"That's a stroke until proved otherwise. Put out a stroke alert now.\"" };
    if (call.level < 3) return { text: "The doctor says: \"This sounds like a stroke: put out a stroke alert straight away. I'm on my way.\"" };
    if (s.f.reviewed) return { text: "They check the plan is under way." };
    s.f.plan = s.f.reviewed = true; s.f.reviewAt = s.t;
    return { text: `The stroke team assess her: NIHSS 9, a likely left middle cerebral artery stroke, onset 09:50.${s.f.aspirated ? " They note she may have aspirated." : ""} Plan: urgent CT head and CT angiogram now; thrombolysis or thrombectomy depending on the scan, as she's within the time window; nil by mouth until a swallow screen; neurological observations every 15 minutes; blood pressure managed by the stroke team; no antiplatelets until the scan. Escort her to CT now.` };
  },
  complete: (s) => s.f.ct != null,
  completeText: "She's scanned within the time window and the stroke team take over her care.",
  timeUp: "The stroke time window is slipping away.",
  window: 5,
  checks: [
    { dim: "assessment", label: "Used FAST and recorded the time she was last known well", why: "The time last known well decides whether thrombolysis or thrombectomy is possible.", test: (s) => (s.f.fast ? 1 : 0) },
    { dim: "assessment", label: "Checked her glucose", why: "Hypoglycaemia can mimic a stroke and must be excluded.", test: (s) => (s.f.bg ? 1 : 0) },
    { dim: "recognition", label: "Didn't wait for the observations to look abnormal", why: "Her NEWS2 was 0 or 1, but FAST was positive: clinical concern alone justifies an emergency call.", test: (s) => { const c = called(s); return c == null ? 0 : c <= 8 ? 1 : c <= 20 ? 0.5 : 0.2; } },
    { dim: "priorities", label: "Kept her nil by mouth until a swallow screen", why: "Dysphagia is common after stroke, and aspiration causes pneumonia.", test: (s) => (s.f.drink ? 0 : s.f.nbm ? 1 : 0.3) },
    { dim: "recognition", label: "Repeated neurological observations", why: "Neurological observations pick up deterioration that NEWS2 can miss.", test: (s) => ((s.f.neuro || 0) >= 1 ? 1 : 0) },
  ],
  sbar: {
    s: [["stroke"], ["fast", "facial", "face", "arm", "speech", "slurred"]],
    b: [["af", "atrial", "apixaban", "anticoag"], ["surgery", "cholecyst", "gallbladder", "post-op", "post op", "day 3"]],
    a: [["09:50", "9:50", "last known well", "last seen well", "onset"], ["glucose", "bm", "6.2"], ["bp", "blood pressure", "186"]],
    r: [["now", "immediately", "emergency", "urgent"], ["review", "assess", "attend", "come", "scan", "ct"]],
  },
  sbarModel: "S: Stroke alert for Grace Adeyemi, bay 6 bed 2: new right facial droop, right arm weakness and slurred speech. Last known well at 09:50. B: 64, day 3 after a laparoscopic cholecystectomy; AF with apixaban paused since surgery; hypertension. A: FAST positive; alert; BP 186/102, HR 92 irregular, glucose 6.2; NEWS2 1. I've kept her nil by mouth. R: Please come now for assessment and imaging.",
  note: [
    { text: "Timed entry, including the time last known well", cues: [["{time}"], ["last known well", "last seen well", "onset", "09:50", "9:50"]] },
    { text: "FAST findings: face, arm, speech", cues: [["face", "facial", "droop"], ["arm", "weak", "speech", "slurred"]] },
    { text: "Glucose checked", cues: [["glucose", "bm", "6.2"]] },
    { text: "Nil by mouth pending a swallow screen", cues: [["nil by mouth", "nbm", "swallow"]] },
    { text: "Who you called, and when (stroke alert)", cues: [["stroke team", "stroke alert", "stroke call", "escalat", "called", "2222"]] },
    { text: "The plan: CT, neurological observations", cues: [["ct", "scan"], ["neuro", "15 min", "observ"]] },
  ],
  rubric: [
    "Recognises a probable stroke using FAST, despite a low NEWS2",
    "Records the time last known well and excludes hypoglycaemia",
    "Escalates immediately as an emergency (stroke alert)",
    "Keeps the patient safe: nil by mouth, no aspirin or antihypertensives before the scan",
    "Record entry is timed and includes FAST findings, time last known well, escalation and the plan",
  ],
  model: `A sudden facial droop, arm weakness and slurred speech is a stroke until proved otherwise, even though her NEWS2 is only 1. Clinical concern alone justifies an emergency call: don't wait for the observations to change.
Assess with FAST and establish the time she was last known well (09:50, from the HCA): that time decides whether she can have thrombolysis or thrombectomy. Check her glucose to exclude hypoglycaemia, and put out a stroke alert (or emergency call, per local policy) straight away.
While you wait, keep her nil by mouth until her swallow is screened, sit her up with her weak side supported, and do neurological observations. Don't give aspirin or lower her blood pressure yourself: both depend on the scan and the stroke team's decision.
When the stroke team arrive, give them the timings, her AF and anticoagulation history, and escort her to CT. Document a timed entry with the FAST findings, time last known well, glucose, who you called and when, and the plan.`,
  lessons: ["u09-12", "u05-11", "u03-14", "u09-10"],
  review: { verified: null, note: "Timings and the in-hospital stroke pathway need checking by a nurse educator against NICE NG128 and typical local stroke alert processes." },
};
