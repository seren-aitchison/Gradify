// NEWS2 (National Early Warning Score 2), Royal College of Physicians, 2017: parameter scoring and the
// recommended clinical response, for teaching. Organisations may adapt charts and responses: in
// practice, always use your local chart and escalation policy. Not for use in patient care.
// Source: Royal College of Physicians. National Early Warning Score (NEWS) 2. London: RCP, 2017.
export const NEWS2_SOURCE = { cite: "Royal College of Physicians, National Early Warning Score (NEWS) 2 (2017)", kind: "guidance", date: "2017-12", verified: null };

const band = (v, rows) => { for (const [test, s] of rows) if (test(v)) return s; return 0; };

export function scoreParams({ rr, spo2, scale = 1, oxygen = false, sbp, hr, avpu = "A", temp }) {
  const s = {};
  s.rr = band(rr, [[(v) => v <= 8, 3], [(v) => v <= 11, 1], [(v) => v <= 20, 0], [(v) => v <= 24, 2], [() => true, 3]]);
  if (scale === 2) {
    // SpO2 scale 2: only for patients with confirmed hypercapnic respiratory failure, as documented by a clinician
    s.spo2 = spo2 <= 83 ? 3 : spo2 <= 85 ? 2 : spo2 <= 87 ? 1 : spo2 <= 92 ? 0 : !oxygen ? 0 : spo2 <= 94 ? 1 : spo2 <= 96 ? 2 : 3;
  } else s.spo2 = band(spo2, [[(v) => v <= 91, 3], [(v) => v <= 93, 2], [(v) => v <= 95, 1], [() => true, 0]]);
  s.air = oxygen ? 2 : 0;
  s.sbp = band(sbp, [[(v) => v <= 90, 3], [(v) => v <= 100, 2], [(v) => v <= 110, 1], [(v) => v <= 219, 0], [() => true, 3]]);
  s.hr = band(hr, [[(v) => v <= 40, 3], [(v) => v <= 50, 1], [(v) => v <= 90, 0], [(v) => v <= 110, 1], [(v) => v <= 130, 2], [() => true, 3]]);
  s.avpu = avpu === "A" ? 0 : 3; // new confusion (C), voice, pain or unresponsive all score 3
  s.temp = band(temp, [[(v) => v <= 35.0, 3], [(v) => v <= 36.0, 1], [(v) => v <= 38.0, 0], [(v) => v <= 39.0, 1], [() => true, 2]]);
  return s;
}

export function news2(obs) {
  const parts = scoreParams(obs), total = Object.values(parts).reduce((a, b) => a + b, 0), red = Object.values(parts).some((v) => v === 3);
  return { parts, total, red, response: response(total, red) };
}

export function response(total, red) {
  if (total >= 7) return { level: "high", label: "Emergency response", text: "Total 7 or more: emergency assessment by a team with critical care competencies, usually including transfer to a higher level of care; continuous monitoring of vital signs." };
  if (total >= 5) return { level: "medium", label: "Urgent response", text: "Total 5 or 6: the registered nurse informs the medical team immediately for urgent assessment by a clinician with competencies in assessing acutely ill patients; monitoring at least every hour." };
  if (red) return { level: "low-medium", label: "Urgent ward-based response", text: "A score of 3 in any single parameter: the registered nurse informs the medical team, who review and decide whether to escalate care; monitoring at least every hour." };
  if (total >= 1) return { level: "low", label: "Ward-based response", text: "Total 1 to 4: assessment by a registered nurse, who decides whether to increase monitoring or escalate; monitoring at least every 4 to 6 hours." };
  return { level: "none", label: "Routine monitoring", text: "Total 0: continue routine monitoring, at least every 12 hours." };
}

export const PARAM_LABELS = { rr: "Respiration rate", spo2: "SpO2", air: "Air or oxygen", sbp: "Systolic BP", hr: "Pulse", avpu: "Consciousness", temp: "Temperature" };
