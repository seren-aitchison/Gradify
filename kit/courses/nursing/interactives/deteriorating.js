// NurseGradify clinical reasoning scenario: a deteriorating post-operative patient, assessed with ABCDE,
// scored with NEWS2 and escalated with SBAR. Fictional patient. Built on kit/interactive/scenario.js.
// Clinical sources: RCP NEWS2 (2017); Resuscitation Council UK ABCDE approach; NICE NG51 (sepsis).
// Educational simulation only.
import { mountScenario } from "../../../interactive/scenario.js";
import { news2, PARAM_LABELS } from "../../../interactive/news2.js";
import { esc } from "../../../core/text.js";

const vitals = (s) => {
  const o = { rr: s.rr, spo2: s.spo2, oxygen: s.oxygen, scale: 1, sbp: s.sbp, hr: s.hr, avpu: s.avpu, temp: s.temp }, r = news2(o);
  const row = (k, v) => `<tr class="${r.parts[k] === 3 ? "red" : r.parts[k] ? "amber" : ""}"><td>${PARAM_LABELS[k]}</td><td>${esc(v)}</td><td>${r.parts[k]}</td></tr>`;
  return `<h4>Observations · ${esc(s.time)}</h4><table class="tx-table sx-vitals"><thead><tr><th>Parameter</th><th>Value</th><th>Score</th></tr></thead><tbody>
    ${row("rr", `${s.rr}/min`)}${row("spo2", `${s.spo2}%`)}${row("air", s.oxygen ? "Oxygen" : "Air")}${row("sbp", `${s.sbp} mmHg`)}${row("hr", `${s.hr} bpm`)}${row("avpu", { A: "Alert", C: "New confusion" }[s.avpu])}${row("temp", `${s.temp.toFixed(1)}°C`)}</tbody></table>
    <p class="sx-news ${r.response.level}"><b>NEWS2 ${r.total}</b> · ${esc(r.response.label)}</p>${s.notes ? `<ul class="sx-notes">${s.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}`;
};

export const scenario = {
  kind: "Clinical reasoning", title: "The quiet patient in bay 3",
  banner: "Educational simulation with a fictional patient. It doesn't assess or authorise clinical competence: in practice, follow your local NEWS2 chart, escalation policy and sepsis pathway, and work within your scope and supervision.",
  intro: "Mr Tomas Reid, 72, is on day 2 after a planned bowel resection. At handover he was \"a bit quiet but fine\". It is 14:00 and you're doing his observations.",
  state: { time: "14:00", rr: 22, spo2: 94, oxygen: false, sbp: 106, hr: 108, avpu: "A", temp: 38.3, notes: ["Last obs 08:00: NEWS2 1", "Urine output 08:00–14:00: 90 mL"] },
  panel: vitals,
  start: "first",
  steps: {
    first: { title: "Interpret the first set", text: "Look at the observations. What is your first action?",
      choices: [
        { label: "Recognise NEWS2 of 6 as an urgent trigger: start an ABCDE assessment now and tell the nurse in charge", next: "airway", score: 1, feedback: "A total of 5–6 is the key threshold for an urgent response. Assessing with ABCDE gives you the information to escalate well, and the nurse in charge needs to know straight away." },
        { label: "Give the prescribed paracetamol for the temperature and recheck in four hours", next: "delay", score: 0, critical: true, feedback: "Treating the temperature doesn't treat the cause, and a four-hour wait ignores an urgent trigger. A NEWS2 of 5–6 needs urgent clinical review and at least hourly observations." },
        { label: "Repeat the observations in an hour to see if they settle", next: "delay", score: 0, critical: true, feedback: "Waiting delays an urgent response. Repeat measurements are fine to confirm a value, but don't delay escalation of a NEWS2 of 5 or more." },
      ] },
    delay: { title: "An hour later", text: "At 15:00 Mr Reid is harder to rouse and his observations have worsened.", set: { time: "15:00", rr: 26, spo2: 92, sbp: 94, hr: 122, avpu: "C", temp: 38.6, notes: ["Newly confused about where he is", "No urine since 13:00"] },
      choices: [{ label: "Call for help now: emergency escalation, and start an ABCDE assessment", next: "airway", score: 0.5, feedback: "Correct action now, but the delay matters: in sepsis, every hour without treatment increases the risk of death. The earlier trigger should have prompted this." }] },
    airway: { title: "A: Airway", text: "Mr Reid answers your questions in short sentences. There are no noisy breath sounds.",
      choices: [
        { label: "Airway patent: move on to Breathing", next: "breathing", score: 1, feedback: "Talking means the airway is patent for now. Reassess if his consciousness falls." },
        { label: "Insert an oropharyngeal airway to be safe", next: "breathing", score: 0, critical: true, feedback: "A conscious patient who is talking doesn't need an airway adjunct, and an oropharyngeal airway would make him gag or vomit. Use adjuncts only when indicated and trained." },
      ] },
    breathing: { title: "B: Breathing", text: "His breathing is fast and shallow (see the observations panel). Chest moves equally; he says it hurts to breathe deeply.",
      multi: { next: "circulation", options: [
        { label: "Sit him up to help his breathing", correct: true, why: "Upright positioning improves ventilation." },
        { label: "Give oxygen to the prescribed or policy target range (94–98% unless at risk of hypercapnia)", correct: true, why: "Saturation is below target; oxygen is a medicine given to a target." },
        { label: "Encourage deep breathing and coughing with wound support, and check his analgesia", correct: true, why: "Pain limits breathing after abdominal surgery and raises the risk of chest infection." },
        { label: "Give 15 L/min oxygen through a non-rebreathe mask and leave it at that", correct: false, why: "High-flow oxygen may be needed in an emergency, but here oxygen should be titrated to a target range and monitored." },
        { label: "Lie him flat to rest", correct: false, why: "Lying flat worsens ventilation." },
      ] } },
    circulation: { title: "C: Circulation", text: "Pulse fast and regular; blood pressure in the panel. Capillary refill 3 seconds; hands cool. Urine output about 15 mL an hour since 08:00.",
      set: { oxygen: true, spo2: 96, notes: ["Oxygen started to target 94–98%", "Urine 15 mL/hour (about 0.2 mL/kg/hour)"] },
      choices: [
        { label: "Recognise signs of poor perfusion and possible sepsis; note the low urine output for the escalation; check fluid balance and the cannula", next: "disability", score: 1, feedback: "Tachycardia, borderline blood pressure, slow capillary refill and low urine output with a fever after surgery point to possible sepsis. Fluids are given as prescribed after review; your job now is to gather and escalate." },
        { label: "Start a litre of IV fluid over 30 minutes from the stock cupboard", next: "disability", score: 0, critical: true, feedback: "IV fluids need a prescription (or a protocol you're authorised and trained to use). Gather the findings and escalate so the right treatment is prescribed quickly." },
        { label: "The blood pressure is above 100, so circulation is fine", next: "disability", score: 0, feedback: "Blood pressure falls late. Heart rate, capillary refill, skin temperature and urine output show that perfusion is already compromised." },
      ] },
    disability: { title: "D: Disability", text: "He knows his name but thinks he's at home. His daughter says this is new. Capillary blood glucose 7.2 mmol/L. Pupils equal and reactive.",
      set: { avpu: "C", notes: ["New confusion (C on ACVPU)", "Blood glucose 7.2 mmol/L"] },
      choices: [
        { label: "Record new confusion: it scores 3 in NEWS2 and takes the total into the emergency range (7 or more)", next: "exposure", score: 1, feedback: "New confusion scores 3. With supplemental oxygen now adding 2, the total is in the emergency range and needs an emergency response; confusion is also a red flag for sepsis." },
        { label: "He's 72, so some confusion is expected", next: "exposure", score: 0, critical: true, feedback: "New confusion is never \"just age\". It is a sign of acute illness, often delirium or sepsis, and changes the NEWS2 score significantly." },
      ] },
    exposure: { title: "E: Exposure", text: "His abdomen is distended and tender; the wound is red at one end with a little cloudy discharge. Calves soft and non-tender.",
      choices: [
        { label: "Note a possible source of infection (wound or abdomen) for the escalation, maintain dignity and keep him warm", next: "escalate", score: 1, feedback: "Identifying a likely source helps the team target investigations and treatment. Cover him again to keep him warm and maintain dignity." },
        { label: "Swab the wound and wait for the result before escalating", next: "escalate", score: 0, critical: true, feedback: "A swab may be useful, but never wait for results before escalating suspected sepsis." },
      ] },
    escalate: { title: "Escalate with SBAR", text: "You call for an emergency review, following your trust's escalation route for a NEWS2 of 7 or more. Which handover is best?",
      choices: [
        { label: "\"I'm calling about Tomas Reid, 72, bay 3, day 2 after bowel resection. His NEWS2 was 1 this morning and is now in the emergency range: fast breathing, low saturations now needing oxygen, tachycardia, a temperature over 38 and new confusion. Urine 15 mL an hour. Abdomen tender, wound discharging. I think he may have sepsis. I need you to see him now, within 15 minutes. Is there anything you'd like me to do before you arrive?\"", next: "after", score: 1, feedback: "Clear SBAR: who, what's changed, the findings, your assessment and a specific request with a timescale. Asking what to do meanwhile gets you prescriptions such as fluids, cultures and antibiotics started." },
        { label: "\"Hi, could someone have a look at bay 3 when they get a chance? He's a bit off.\"", next: "after", score: 0, critical: true, feedback: "Vague requests get delayed responses. State the NEWS2, your concern (possible sepsis) and exactly what you need, and by when." },
        { label: "\"Bay 3 has a temperature of 38.3. Can you prescribe some paracetamol?\"", next: "after", score: 0, feedback: "This hides the real problem. The issue is a NEWS2 of 9 with possible sepsis, not a temperature." },
      ] },
    after: { title: "While you wait", text: "The doctor is on the way and asks you to follow the sepsis pathway. Which of these should you do?",
      multi: { next: "end", options: [
        { label: "Stay with the patient (or make sure someone does) and repeat observations at least every 30 minutes, or continuously as directed", correct: true, why: "He is at high risk of further deterioration." },
        { label: "Prepare for blood cultures, lactate and other bloods as directed, and the prescribed IV antibiotics and fluids", correct: true, why: "Prompt cultures, lactate, antibiotics and fluids are core to early sepsis care, given within the timescales your pathway sets." },
        { label: "Measure urine output hourly (a catheter may be considered by the team)", correct: true, why: "Urine output is a key marker of perfusion and response to treatment." },
        { label: "Tell his daughter what's happening, with his agreement, and record everything with times", correct: true, why: "Communication and contemporaneous records matter for care and accountability." },
        { label: "Go on your break: the doctor is coming", correct: false, why: "A patient triggering an emergency response must not be left without a registered nurse responsible for monitoring." },
      ] } },
    end: { title: "Debrief", end: true, summary: "Possible sepsis after surgery shows how early warning scores, a structured ABCDE assessment and clear SBAR escalation work together. In the real case, the team would assess for an anastomotic leak or wound infection." },
  },
  debrief: () => `<h4>Key learning</h4><ul><li>A NEWS2 of 5 or more is an urgent trigger; 7 or more is an emergency trigger. A single parameter scoring 3 also needs urgent review.</li><li>New confusion scores 3 and is a red flag for sepsis.</li><li>Blood pressure falls late: act on respiratory rate, heart rate, capillary refill and urine output.</li><li>Escalate with SBAR, a clear assessment and a specific request with a timescale.</li><li>Never give treatments you aren't prescribed or authorised to give.</li></ul><p class="tx-note">Sources: RCP NEWS2 (2017); Resuscitation Council UK ABCDE approach; NICE NG51 sepsis (current version). Check your local policies.</p>`,
};

export function mount(el, opts) { mountScenario(el, scenario, opts); }
