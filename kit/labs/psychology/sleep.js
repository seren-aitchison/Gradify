// The two-process model of sleep regulation (Borbély, 1982; Daan, Beersma and Borbély, 1984). Process S, sleep
// pressure, builds up exponentially while awake and dissipates while asleep; process C, the circadian rhythm from the
// suprachiasmatic nucleus, rises and falls over about 24 hours. Sleepiness is greatest where S is high and C is low. Shift
// the schedule to model a late night, shift work or jet lag (the clock takes days to re-entrain, so C stays put here).
import { shell, canvas, slider, panel, challenges, clear, axes, line, text, C } from "../lab.js";
import { caveat } from "../social/ui.js";

// S rises towards 1 with time constant tw while awake and falls towards 0 with ts while asleep (hours; Daan et al., 1984)
export function simulate({ bed = 23, wake = 7, days = 3, shift = 0, tw = 18.2, ts = 4.2, dt = 0.1 } = {}) {
  let S = 0.25; const out = [];
  for (let t = 0; t < days * 24; t += dt) {
    const h = (((t - shift) % 24) + 24) % 24, asleep = bed > wake ? h >= bed || h < wake : h >= bed && h < wake;
    S = asleep ? S * Math.exp(-dt / ts) : 1 - (1 - S) * Math.exp(-dt / tw);
    const Cc = 0.5 + 0.12 * Math.sin((2 * Math.PI * (t - 10)) / 24); // circadian alerting signal, low in the early morning
    out.push({ t, S, C: Cc, asleep, pressure: S - Cc + 0.5 });
  }
  return out;
}
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.5, max: 320 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { bed: 23, wake: 7, shift: 0 }, st = {};
  const ch = challenges(ctrl, ctx, [{ id: "late", text: "Stay up until 3 a.m. and see sleep pressure peak above normal", test: (x) => x.peak > 0.85 }, { id: "nap", text: "Shorten sleep to 4 hours and see S fail to recover overnight", test: (x) => x.short }, { id: "lag", text: "Shift the schedule by 8 hours (flying east) and see sleep fall at the wrong circadian time", test: (x) => Math.abs(x.shift) >= 8 }]);
  slider(ctrl, { label: "Bedtime", min: 18, max: 27, step: 0.5, value: s.bed, fmt: (v) => `${String(Math.floor(v % 24)).padStart(2, "0")}:${v % 1 ? "30" : "00"}`, onInput: (v) => { s.bed = v; run(); } });
  slider(ctrl, { label: "Wake time", min: 4, max: 12, step: 0.5, value: s.wake, fmt: (v) => `${String(Math.floor(v)).padStart(2, "0")}:${v % 1 ? "30" : "00"}`, onInput: (v) => { s.wake = v; run(); } });
  slider(ctrl, { label: "Schedule shift (hours; jet lag or shift work)", min: -12, max: 12, step: 1, value: 0, fmt: (v) => (v > 0 ? `+${v}` : v), onInput: (v) => { s.shift = v; run(); } });
  caveat(ctrl, "A simplified version of a published model: time constants from Daan, Beersma and Borbély (1984), the circadian curve idealised as a sine wave, and no adaptation of the clock to the new schedule.");
  function run() {
    const bed = s.bed % 24, R = simulate({ bed, wake: s.wake, shift: s.shift }), dur = ((s.wake - s.bed) % 24 + 24) % 24;
    st.peak = Math.max(...R.filter((p) => p.t > 24).map((p) => p.S)); st.short = dur <= 4.5 && R.at(-1).S > 0.3; st.shift = s.shift; ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const A = axes(g, { l: 44, t: 12, w: W - 58, h: H - 46 }, { x0: 0, x1: 72, y0: 0, y1: 1, xl: "hours from midnight on day 1", yl: "level", xt: 6, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
    g.save(); g.fillStyle = "rgba(90,160,255,.12)"; let i0 = null; R.forEach((p, i) => { if (p.asleep && i0 === null) i0 = i; if ((!p.asleep || i === R.length - 1) && i0 !== null) { g.fillRect(A.X(R[i0].t), A.Y(1), A.X(p.t) - A.X(R[i0].t), A.Y(0) - A.Y(1)); i0 = null; } }); g.restore();
    line(g, R.map((p) => [A.X(p.t), A.Y(p.S)]), C.violet, 2.5); line(g, R.map((p) => [A.X(p.t), A.Y(p.C)]), C.amber, 2, [5, 4]);
    text(g, "— process S (sleep pressure)", 52, 26, { color: C.violet, size: 11 }); text(g, "- - process C (circadian alerting)", 230, 26, { color: C.amber, size: 11 }); text(g, "▮ asleep", W - 70, 26, { color: "#5aa0ff", size: 11 });
    out(`<p><b>${dur.toFixed(1)} hours in bed.</b> ${dur < 6 ? "Sleep pressure doesn't fall far enough overnight, so you start each day already partly sleep-deprived: the debt accumulates." : "Sleep pressure dissipates overnight and rebuilds through the day."} ${Math.abs(s.shift) >= 6 ? "With the schedule shifted, you're trying to sleep when the circadian signal is promoting wakefulness and stay awake through its low point: the mismatch behind jet lag and shift-work sleep problems." : "The circadian alerting signal is lowest in the early hours, when S is also highest: the time people find it hardest to stay awake."}</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
