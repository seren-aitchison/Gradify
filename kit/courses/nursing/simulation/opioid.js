// NurseGradify simulation: opioid-induced respiratory depression. Fictional patient. EDUCATION ONLY: a
// simplified teaching model with illustrative numbers. Naloxone is given only as prescribed or under an
// authorised local protocol, and local emergency and escalation policies always apply.
// Guidance reflected: RCP NEWS2 (2017); Resuscitation Council UK ABCDE approach.
const T = (s, id) => s.did[id]?.[0] ?? null;
const naloxActive = (s) => s.f.naloxAt != null && s.t < s.f.naloxAt + (s.f.repeatAt != null ? 75 : 35);
export default {
  id: "opioid-toxicity", title: "Mrs Hartley, difficult to rouse at 02:00", clock: "02:00", limit: 110,
  banner: "Simulation for education only. Simplified physiology and illustrative numbers. Medicines are given only as prescribed or under an authorised protocol; follow your local emergency and escalation policies.",
  patient: { name: "Joan Hartley", age: 82, where: "Orthopaedic ward, side room 3",
    summary: "Day 1 after a hip fracture fixation. On your 02:00 round she's very hard to wake and snoring.",
    background: ["Fixation of a fractured neck of femur yesterday", "Chronic kidney disease (eGFR 38)", "Hypertension", "Lives alone; usually independent", "NEWS2 at 22:00: 1"] },
  handover: "At the 22:00 handover she was in pain but alert. On your 02:00 round she's lying flat and snoring, and doesn't open her eyes when you say her name.",
  vitals: { rr: 8, spo2: 89, o2: false, sbp: 118, hr: 62, temp: 36.4, avpu: "V" },
  flags: {},
  processes: [
    { when: (s) => !naloxActive(s) && !s.f.recovered, rate: { rr: -0.05, spo2: -0.09 } },
    { when: (s) => s.f.airway && !naloxActive(s), toward: { spo2: [91, 0.2] } },
    { when: (s) => s.v.o2, toward: { spo2: [95, 0.6] } },
    { when: (s) => naloxActive(s), toward: { rr: [15, 1.5], spo2: [96, 0.8], hr: [84, 1.5], sbp: [138, 1] } },
    { when: (s) => s.f.recovered, toward: { rr: [14, 0.5], spo2: [96, 0.5], hr: [78, 0.5], sbp: [130, 0.5] } },
  ],
  minute(s) {
    if (naloxActive(s) && s.t >= s.f.naloxAt + 2) s.v.avpu = "A";
    else if (!s.f.recovered) s.v.avpu = s.v.rr <= 6 ? "P" : s.v.rr < 10 ? "V" : "A";
    // naloxone wears off before the modified-release morphine: unless the plan (held opioids, repeat
    // doses) is in place, she becomes sedated again. With the plan and a repeat dose, she recovers.
    if (s.f.plan && s.f.hold && s.f.repeatAt != null && s.t >= s.f.repeatAt + 20) s.f.recovered = true;
    if (s.f.naloxAt != null && !naloxActive(s) && s.v.rr > 11 && !s.f.recovered) s.v.rr -= 0.3;
  },
  collapse: (s) => (s.v.spo2 < 80 || s.v.rr <= 4 ? "Mrs Hartley stops breathing effectively. The emergency team arrive and take over her airway and breathing." : null),
  firstOk: ["stim", "airway", "help"],
  find: {
    airway: (s) => (s.v.avpu === "A" ? "She's talking: her airway is clear." : "Snoring respirations: her airway is partly obstructed while she lies flat."),
    breathing: (s) => `Breathing ${Math.round(s.v.rr)} breaths a minute, slow and shallow. SpO2 ${Math.round(s.v.spo2)}% ${s.v.o2 ? "on oxygen" : "on air"}. Chest sounds clear.`,
    circulation: (s) => `Pulse ${Math.round(s.v.hr)}, regular. BP ${Math.round(s.v.sbp)}/${Math.round(s.v.sbp * 0.6)}. Capillary refill 2 seconds.`,
    disability: (s) => (s.v.avpu === "A" ? "She's awake and talking, but says her hip hurts. Pupils normal size. Capillary glucose 6.4 mmol/L." : `${s.v.avpu === "P" ? "She responds only to pain." : "She opens her eyes briefly to a loud voice, then drifts off."} Pupils pinpoint and equal. Capillary glucose 6.4 mmol/L.`),
    exposure: (s) => `Temperature ${Math.round(s.v.temp * 10) / 10}°C. Hip dressing clean and dry. No bleeding.`,
    chart: () => "Obs chart: at 22:00 RR 14, SpO2 95% on air, alert (NEWS2 1). Nothing recorded since. Urine output low overnight.",
    drugs: (s) => { s.f.chart = true; return "Oral morphine solution PRN: given at 22:15 and again at 00:40. Modified-release morphine twice daily, started yesterday, last given 22:00. Regular paracetamol. Naloxone PRN for opioid-induced respiratory depression is prescribed on the post-operative protocol. eGFR 38."; },
    ask: (s) => (s.v.avpu === "A" ? "\"What happened? My hip's really sore.\"" : "She mumbles something you can't make out and drifts off again."),
  },
  waitText: (s) => (s.v.avpu === "A" ? "She's awake and talking to you." : "You stay with her. Her breathing is slow and noisy."),
  actions: [
    { id: "stim", group: "Act", label: "Call her name loudly and gently shake her shoulder", mins: 1, run: (s) => (s.v.avpu === "A" ? "She's awake already." : "She opens her eyes for a moment, then drifts off.") },
    { id: "airway", group: "Act", label: "Open her airway (head tilt–chin lift or jaw thrust) and sit her up", mins: 1, once: true, run: (s) => { s.f.airway = true; return "The snoring stops and air moves more freely."; } },
    { id: "help", group: "Act", label: "Pull the emergency buzzer to get help to the bedside", mins: 1, once: true, run: (s) => { s.f.help = true; return "Your colleague arrives at once and stays to help. You still need to escalate to the right team."; } },
    { id: "o2", group: "Act", label: "Give oxygen, titrated to target, as prescribed or under the emergency protocol", mins: 1, once: true, run: (s) => { s.v.o2 = true; return "You start oxygen. Remember that good saturation on oxygen can hide rising carbon dioxide if she isn't breathing enough."; } },
    { id: "monitor", group: "Act", label: "Start continuous SpO2 monitoring and stay with her", mins: 1, once: true, run: (s) => { s.f.monitor = true; return "Continuous monitoring is on, and you're staying at the bedside."; } },
    { id: "hold", group: "Medicines", label: "Withhold all opioids and flag the drug chart", mins: 1, once: true, run: (s) => { s.f.hold = true; return "You withhold her opioids and mark the chart so no further doses are given until she's reviewed."; } },
    { id: "nalox", group: "Medicines", label: "Give naloxone as prescribed on the PRN protocol", mins: 2, once: true, when: (s) => s.f.chart || s.f.plan,
      run: (s) => { s.f.naloxAt = s.t; return "You give naloxone as prescribed. Watch closely: it can wear off before the morphine does."; } },
    { id: "repeat", group: "Medicines", label: "Give a repeat dose of naloxone as prescribed", mins: 2, once: true, when: (s) => s.f.naloxAt != null && s.t > s.f.naloxAt + 10,
      partial: (s) => (s.v.rr >= 10 && s.v.avpu === "A" ? "She was breathing adequately and awake: repeat doses are for recurring sedation or a low respiratory rate." : null),
      run: (s) => { s.f.repeatAt = s.t; s.f.naloxAt = s.t; return "You give the repeat dose as prescribed."; } },
    { id: "morphine", group: "Medicines", label: "Give her PRN morphine, as she may be in pain", mins: 2, once: true, unsafe: () => "She has signs of opioid toxicity: more opioid could stop her breathing.", run: (s) => { s.v.rr -= 3; return "You give oral morphine."; } },
    { id: "sleep", group: "Act", label: "Let her sleep and recheck her in an hour", mins: 1, once: true, unsafe: () => "A respiratory rate of 8 with reduced consciousness and pinpoint pupils is an emergency, not sleep.", run: () => "You leave her to sleep." },
    { id: "leave", group: "Act", label: "Leave the bedside to phone the doctor from the nurses' station", mins: 4, once: true, when: (s) => s.v.avpu !== "A" && !s.f.help, unsafe: () => "Don't leave a patient with a compromised airway alone: summon help to the bedside with the emergency buzzer.", run: () => "You go to the station to phone." },
  ],
  needLevel: (n) => (n.total >= 7 ? 3 : 2),
  arrive(s, call) {
    if (call.who === "nic") return { text: "The nurse in charge says: \"Put out an emergency call or bleep outreach now, and get the naloxone.\"" };
    if (s.f.reviewed) return { text: "They check the plan is under way." };
    s.f.plan = s.f.reviewed = true; s.f.reviewAt = s.t;
    const gave = s.f.naloxAt == null; if (gave) s.f.naloxAt = s.t;
    return { text: `The team assess her: opioid-induced respiratory depression, probably from morphine accumulating with reduced kidney function.${gave ? " They give naloxone straight away." : ""} Plan: withhold opioids and stop the modified-release morphine; repeat naloxone as prescribed if her breathing rate falls below 10 or she becomes hard to rouse again, because naloxone wears off before morphine; observations and sedation scores at least every 30 minutes for the next 6 hours; analgesia review in the morning with non-opioid options; blood gas.` };
  },
  complete: (s) => s.f.recovered && s.obs.some((o) => o.t > (s.f.repeatAt ?? 0) + 10),
  completeText: "Mrs Hartley is awake and breathing well, with the plan in place and close monitoring for the rest of the night.",
  timeUp: "The night coordinator takes over. Mrs Hartley's sedation hasn't been fully managed.",
  window: 5,
  checks: [
    { dim: "priorities", label: "Got help to the bedside within the first 3 minutes", why: "With a respiratory rate of 8 and reduced consciousness, summon help immediately rather than working alone.", test: (s) => { const t = Math.min(T(s, "help") ?? 999, s.calls[0]?.at ?? 999); return t <= 3 ? 1 : t <= 8 ? 0.5 : 0; } },
    { dim: "priorities", label: "Opened her airway early", why: "Airway first: a partially obstructed airway makes everything else worse.", test: (s) => { const t = T(s, "airway"); return t == null ? 0 : t <= 5 ? 1 : 0.5; } },
    { dim: "assessment", label: "Checked the drug chart and identified the opioid cause", why: "Pinpoint pupils, slow breathing and sedation after morphine point to opioid toxicity: the drug chart confirms it.", test: (s) => (s.f.chart ? 1 : 0) },
    { dim: "priorities", label: "Gave naloxone yourself within 10 minutes", why: "Naloxone is prescribed on her protocol: once you'd confirmed it, it was the key treatment.", test: (s) => { const t = T(s, "nalox"); return t == null ? 0 : t <= 10 ? 1 : 0.5; } },
    { dim: "priorities", label: "Withheld further opioids", why: "More opioid while she's sedated could stop her breathing.", test: (s) => (s.f.hold ? 1 : 0) },
    { dim: "recognition", label: "Noticed the sedation coming back as the naloxone wore off", why: "Naloxone is shorter-acting than morphine: repeat observations 30 to 60 minutes later catch re-sedation.", test: (s) => (s.f.naloxAt == null ? null : s.f.repeatAt != null ? 1 : s.obs.some((o) => o.t >= 25) ? 0.5 : 0) },
  ],
  sbar: {
    s: [["resp", "breath", "rr", "sedat", "drowsy", "rous", "opioid", "naloxone"]],
    b: [["hip", "fracture", "surgery", "post-op", "post op", "operation", "nof"], ["morphine", "opioid"]],
    a: [["{news}"], ["resp", "rr", "breath"], ["sat", "spo2", "oxygen"], ["pinpoint", "pupil", "voice", "avpu", "rousable", "drowsy", "sedat"]],
    r: [["now", "immediately", "emergency", "urgent"], ["review", "come", "attend", "assess"]],
  },
  sbarModel: "S: I'm calling about Joan Hartley in side room 3: she's hard to rouse with a respiratory rate of 8. NEWS2 9. I think it's opioid toxicity. B: 82, day 1 after hip fracture fixation, CKD with eGFR 38; she had two PRN morphine doses last night plus modified-release morphine. A: Snoring airway, now opened; RR 8, SpO2 89% on air (now on oxygen); BP 118/71; HR 62; responds to voice only; pinpoint pupils. I've given naloxone as prescribed and withheld opioids. R: Please come now. I'll stay with her and keep monitoring.",
  note: [
    { text: "Timed entry", cues: [["{time}"]] },
    { text: "What you found: slow breathing, sedation and pinpoint pupils, with the NEWS2", cues: [["{news}"], ["resp", "rr", "breath", "sedat", "pupil", "rous"]] },
    { text: "What you did: airway, oxygen and naloxone", cues: [["naloxone"]] },
    { text: "Opioids withheld", cues: [["withh", "held", "stop", "omit"], ["opioid", "morphine"]] },
    { text: "Who you escalated to, and when", cues: [["escalat", "emergency", "2222", "outreach", "doctor", "dr ", "team", "informed", "called"]] },
    { text: "The monitoring plan, including watching for re-sedation", cues: [["monitor", "30 min", "hourly", "sedation score", "re-sedat", "resedat", "repeat", "observ"]] },
  ],
  rubric: [
    "Recognises opioid-induced respiratory depression from the slow breathing, sedation, pinpoint pupils and drug chart",
    "Prioritises airway, help at the bedside and escalation at emergency level",
    "SBAR is concise and gives the NEWS2, key findings and actions taken",
    "Identifies the need to withhold opioids and monitor for re-sedation after naloxone",
    "Record entry is timed and includes findings, naloxone, escalation and the monitoring plan",
  ],
  model: `This is an emergency. Get help to the bedside with the emergency buzzer and stay with her. Airway first: sit her up and open her airway; then breathing: a rate of 8 with saturation of 89% needs oxygen titrated to target and emergency escalation (NEWS2 9, with three parameters scoring 3).
Pinpoint pupils and sedation after two PRN morphine doses on top of modified-release morphine, with reduced kidney function, point to opioid toxicity. Check the drug chart: naloxone is prescribed on her post-operative protocol, so give it as prescribed, withhold further opioids and flag the chart.
Escalate at emergency level (the emergency team or critical care outreach, per local policy) with a short SBAR. Stay, monitor continuously and repeat observations: naloxone wears off before morphine, so expect her to become sedated again. Give repeat doses as prescribed if her breathing rate falls or she becomes hard to rouse.
Document a timed entry: findings, NEWS2, naloxone given, opioids withheld, who was called and when, and the monitoring plan, including sedation scores. Her pain will return: make sure analgesia is reviewed.`,
  lessons: ["u03-27", "u03-28", "u07-25", "u03-30"],
  review: { verified: null, note: "Physiology, timings and the naloxone pathway need checking by a nurse educator against current guidance and typical local protocols." },
};
