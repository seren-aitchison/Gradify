// Schedules of reinforcement as cumulative records: the total number of responses over time, with a tick at each
// reinforcer. The response rules are an illustrative model built to show the characteristic patterns described by
// Ferster and Skinner (1957): ratio schedules give high rates (with a pause after each reinforcer on fixed ratio),
// fixed interval gives a "scallop", variable schedules give steady responding. Switching to extinction shows that
// behaviour learned under intermittent reinforcement persists for longer (the partial reinforcement extinction effect).
import { shell, canvas, seg, slider, toggle, panel, challenges, clear, axes, line, text, C, seeded } from "../lab.js";
import { caveat } from "../social/ui.js";

// simulate T seconds of responding on a schedule; returns { resp: [t…], rf: [t…] }
export function simulate({ kind = "FR", value = 10, T = 600, extinctAt = Infinity, seed = 3 } = {}) {
  const r = seeded(seed), resp = [], rf = []; let count = 0, lastRf = 0, need = kind === "VR" ? 1 + Math.floor(r() * 2 * value) : value, wait = kind === "VI" ? -Math.log(1 - r()) * value : value, armed = false, sinceRf = 0, noRf = 0;
  const dt = 0.1;
  for (let t = 0; t < T; t += dt) {
    const since = t - lastRf, ext = t >= extinctAt;
    // response probability per step: high on ratio schedules (pause after reinforcement on FR), rising with time on FI
    let rate = kind === "FR" ? (since < value * 0.25 ? 0.02 : 0.32) : kind === "VR" ? 0.3 : kind === "FI" ? Math.min(0.3, 0.01 + 0.3 * (since / value) ** 2) : 0.14;
    if (ext) { const persist = { FR: 25, VR: 70, FI: 35, VI: 80, CRF: 10 }[kind] ?? 20; rate *= Math.exp(-noRf / persist); }
    if (r() < rate) {
      resp.push(t); count++; if (ext) noRf++;
      if (!ext) {
        if (kind === "CRF") { rf.push(t); lastRf = t; }
        else if (kind === "FR" || kind === "VR") { if (count >= need) { rf.push(t); lastRf = t; count = 0; need = kind === "VR" ? 1 + Math.floor(r() * 2 * value) : value; } }
        else if (armed) { rf.push(t); lastRf = t; armed = false; wait = kind === "VI" ? -Math.log(1 - r()) * value : value; }
      }
    }
    if ((kind === "FI" || kind === "VI") && !armed && t - lastRf >= wait) armed = true;
  }
  return { resp, rf };
}
const INFO = {
  CRF: "Continuous reinforcement: every response is reinforced. Learning is fastest, but extinction is fastest too.",
  FR: "Fixed ratio: a reinforcer after every n responses (piecework pay). High rates with a pause after each reinforcer.",
  VR: "Variable ratio: a reinforcer after a varying number of responses averaging n (gambling machines). High, steady rates and the most resistance to extinction.",
  FI: "Fixed interval: the first response after a fixed time is reinforced. Responding slows after each reinforcer and speeds up as the time approaches: the scallop.",
  VI: "Variable interval: the first response after a varying time is reinforced (checking for messages). Moderate, very steady rates.",
};
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-row sx-mode"></div><div class="lab-stage"></div><div class="lab-out"></div></div><div class="lab-ctrl"></div></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.55, max: 340 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { kind: "FR", value: 10, ext: false }, st = { seen: new Set(), ext: new Set() };
  const ch = challenges(ctrl, ctx, [
    { id: "all", text: "View the cumulative record for all five schedules", test: (x) => x.seen.size >= 5 },
    { id: "scallop", text: "Find the fixed-interval scallop", test: (x) => x.seen.has("FI") },
    { id: "pree", text: "Switch to extinction under CRF and under VR, and compare how long responding lasts", test: (x) => x.ext.has("CRF") && x.ext.has("VR") },
  ]);
  seg($(".lab-row.sx-mode"), ["CRF", "FR", "VR", "FI", "VI"], s.kind, (v) => { s.kind = v; run(); });
  slider(ctrl, { label: "Ratio (responses) or interval (seconds)", min: 2, max: 40, step: 1, value: s.value, fmt: (v) => v, onInput: (v) => { s.value = v; run(); } });
  toggle(ctrl, "Extinction from 5 minutes (no more reinforcers)", false, (v) => { s.ext = v; run(); });
  caveat(ctrl, "An illustrative model, not data from a real animal: response rules were chosen to reproduce the typical patterns, so use it to learn to read cumulative records.");
  function run() {
    const R = simulate({ kind: s.kind, value: s.value, extinctAt: s.ext ? 300 : Infinity });
    st.seen.add(s.kind); if (s.ext) st.ext.add(s.kind); ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); const top = Math.max(50, R.resp.length * 1.05);
    const A = axes(g, { l: 52, t: 14, w: W - 68, h: H - 50 }, { x0: 0, x1: 600, y0: 0, y1: top, xl: "time (s)", yl: "cumulative responses", xt: 6, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    const pts = [[A.X(0), A.Y(0)]]; R.resp.forEach((t, i) => pts.push([A.X(t), A.Y(i + 1)])); pts.push([A.X(600), A.Y(R.resp.length)]);
    line(g, pts, C.violet, 2);
    R.rf.forEach((t) => { const k = R.resp.findIndex((x) => x >= t); const y = A.Y(k + 1); line(g, [[A.X(t), y], [A.X(t) + 5, y + 5]], C.gold, 2); });
    if (s.ext) { line(g, [[A.X(300), A.Y(0)], [A.X(300), A.Y(top)]], "rgba(255,255,255,.3)", 1, [4, 4]); text(g, "extinction", A.X(300) + 4, A.Y(top) + 14, { size: 11, color: C.mute }); }
    const after = R.resp.filter((t) => t >= 300).length;
    out(`<p><b>${s.kind}.</b> ${INFO[s.kind]}</p><p>${R.resp.length} responses and ${R.rf.length} reinforcers (gold ticks) in 10 minutes${s.ext ? `; ${after} responses during extinction` : ""}.</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
