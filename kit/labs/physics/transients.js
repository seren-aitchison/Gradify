// Capacitor charging and discharging through a resistor (RC), and current growth in an inductor (RL), with the
// switch under your control. Exact exponential solutions; ideal components and an ideal battery.
import { shell, canvas, slider, seg, axes, line, clear, text, circle, challenges, panel, loop, C } from "../lab.js";

export const tauRC = (R, Cap) => R * Cap;
export const tauRL = (R, L) => L / R;
// capacitor voltage t seconds after the switch moves, starting from v0, heading to target
export const approach = (v0, target, t, tau) => target + (v0 - target) * Math.exp(-t / tau);

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.34, max: 210 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.46, max: 280 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let mode = ctx.mode === "rl" ? "rl" : "rc";
  const P = { E: 10, R: 10, Cap: 100, L: 2 };   // R in kΩ, C in µF (RC); R in Ω, L in H (RL)
  let on = false, tSw = 0, start = 0, x = 0, hist = [], marks = [], st = { tau: false, half: false, dis: false, rl: false };
  const ch = challenges(ctrl, ctx, [
    { id: "tau", text: "Charge the capacitor and stop the clock at one time constant (63%)", test: (s) => s.tau },
    { id: "half", text: "Find the half-life of the discharge: it's τ ln 2 = 0.69τ", test: (s) => s.half },
    { id: "dis", text: "Double R and see the charging take twice as long", test: (s) => s.dis },
    { id: "rl", text: "Inductor: watch the current rise to E/R while the inductor's voltage dies away", test: (s) => s.rl },
  ]);
  seg($(".top"), [["rc", "Capacitor (RC)"], ["rl", "Inductor (RL)"]], mode, (v) => { mode = v; controls(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  const tauNow = () => (mode === "rc" ? tauRC(P.R * 1e3, P.Cap * 1e-6) : tauRL(P.R, P.L));
  let R0 = P.R, tau0 = null;
  function controls() {
    sl.innerHTML = "";
    slider(sl, { label: "Battery", min: 1, max: 20, step: 0.5, value: P.E, unit: "V", fmt: (v) => v.toFixed(1), onInput: (v) => { P.E = v; reset(); } });
    if (mode === "rc") {
      slider(sl, { label: "Resistance R", min: 1, max: 50, step: 1, value: P.R, unit: "kΩ", fmt: (v) => v.toFixed(0), onInput: (v) => { P.R = v; reset(); } });
      slider(sl, { label: "Capacitance C", min: 10, max: 500, step: 10, value: P.Cap, unit: "µF", fmt: (v) => v.toFixed(0), onInput: (v) => { P.Cap = v; reset(); } });
    } else {
      slider(sl, { label: "Resistance R", min: 1, max: 50, step: 1, value: P.R, unit: "Ω", fmt: (v) => v.toFixed(0), onInput: (v) => { P.R = v; reset(); } });
      slider(sl, { label: "Inductance L", min: 0.5, max: 20, step: 0.5, value: P.L, unit: "H", fmt: (v) => v.toFixed(1), onInput: (v) => { P.L = v; reset(); } });
    }
    const row = document.createElement("div"); row.className = "lab-row"; sl.append(row);
    const b = (label, fn) => { const x0 = document.createElement("button"); x0.type = "button"; x0.className = "lab-btn"; x0.textContent = label; x0.addEventListener("click", fn); row.append(x0); return x0; };
    swBtn = b("Close the switch", flip); b("Mark this moment", mark);
    reset();
  }
  let swBtn;
  function reset() { on = false; x = 0; tSw = 0; start = performance.now() / 1000; hist = []; marks = []; if (swBtn) swBtn.textContent = "Close the switch"; report(); }
  function flip() {
    if (!on && tau0 && Math.abs(P.R / R0 - 2) < 0.05 && mode === "rc") st.dis = true;
    if (!on && mode === "rc") { R0 = P.R; tau0 = tauNow(); }
    on = !on; tSw = 0; marks = []; swBtn.textContent = mode === "rc" ? (on ? "Discharge" : "Charge") : on ? "Open the switch" : "Close the switch";
    if (mode === "rl" && on) setTimeout(() => { st.rl = true; ch.check(st); }, tauNow() * 4000 / speed());
    ch.check(st);
  }
  const speed = () => Math.max(0.2, Math.min(4, 3 / tauNow()));   // seconds of sim per real second, so τ shows at a watchable pace
  function mark() {
    const tau = tauNow(), frac = mode === "rc" ? x / P.E : x / (P.E / P.R);
    marks.push(tSw);
    if (mode === "rc" && on && Math.abs(tSw / tau - 1) < 0.08) st.tau = true;
    if (mode === "rc" && !on && Math.abs(tSw / (tau * Math.LN2) - 1) < 0.08 && hist.length) st.half = true;
    ch.check(st); report(frac);
  }
  loop(el, (dt) => {
    const tau = tauNow(), h = dt * speed();
    tSw += h;
    const target = mode === "rc" ? (on ? P.E : 0) : on ? P.E / P.R : 0;
    x = approach(x, target, h, tau);
    hist.push([tSw, x, on]); if (hist.length > 600) hist.shift();
    draw();
  });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const tau = tauNow(), k = Math.min(W / 520, H / 200), P0 = (px, py) => [(W - 520 * k) / 2 + px * k, py * k + 6];
    const wire = (pts) => line(g, pts.map(([a, b]) => P0(a, b)), "rgba(255,255,255,.55)", 2);
    wire([[60, 40], [180, 40]]); wire([[300, 40], [440, 40], [440, 70]]); wire([[440, 120], [440, 170], [60, 170], [60, 120]]); wire([[60, 80], [60, 40]]);
    // battery, switch, resistor and capacitor or inductor
    const [bx, by] = P0(60, 100); g.fillStyle = C.white; g.fillRect(bx - 14, by - 12, 28, 3); g.fillRect(bx - 8, by + 4, 16, 5); text(g, `${P.E} V`, bx - 20, by + 2, { align: "right", size: 12 });
    const [s1x, s1y] = P0(180, 40), [s2x, s2y] = P0(215, on ? 40 : 18); line(g, [[s1x, s1y], [s2x, s2y]], on ? C.green : C.red, 3); circle(g, s1x, s1y, 3, C.white); circle(g, ...P0(220, 40), 3, C.white); wire([[220, 40], [235, 40]]);
    const [r1x, r1y] = P0(235, 40), [r2x] = P0(300, 40); g.strokeStyle = C.teal; g.lineWidth = 2; g.beginPath(); g.moveTo(r1x, r1y); for (let i = 1; i <= 8; i++) g.lineTo(r1x + ((r2x - r1x) * i) / 8, r1y + (i === 8 ? 0 : i % 2 ? 6 : -6)); g.stroke();
    text(g, `R = ${P.R} ${mode === "rc" ? "kΩ" : "Ω"}`, (r1x + r2x) / 2, r1y - 12, { align: "center", size: 11, color: C.teal });
    const [cx, cy] = P0(440, 95);
    if (mode === "rc") {
      g.fillStyle = C.violet; g.fillRect(cx - 18, cy - 12, 36, 3); g.fillRect(cx - 18, cy + 9, 36, 3);
      const q = x / P.E; for (let i = 0; i < Math.round(q * 8); i++) { text(g, "+", cx - 15 + i * 4.3, cy - 16, { size: 10, color: C.red }); text(g, "−", cx - 15 + i * 4.3, cy + 24, { size: 10, color: C.blue }); }
      text(g, `C = ${P.Cap} µF`, cx + 26, cy + 4, { size: 11, color: C.violet });
    } else {
      g.strokeStyle = C.violet; g.lineWidth = 2; for (let i = 0; i < 4; i++) { g.beginPath(); g.arc(cx, cy - 18 + i * 12 + 6, 6, -Math.PI / 2, Math.PI / 2); g.stroke(); }
      text(g, `L = ${P.L} H`, cx + 16, cy + 4, { size: 11, color: C.violet });
    }
    // graphs: capacitor voltage and current (RC) or current and inductor voltage (RL)
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const T = 5 * tau, ymax = mode === "rc" ? P.E : P.E / P.R;
    const A = axes(g2, { l: 56, t: 12, w: W2 - 70, h: H2 - 46 }, { x0: 0, x1: T, y0: 0, y1: ymax * 1.1, xl: `time since the switch moved (s); τ = ${tau.toFixed(2)} s`, yl: mode === "rc" ? "capacitor voltage (V)" : "current (A)", xf: (v) => v.toFixed(1), yf: (v) => v.toFixed(mode === "rc" ? 0 : 2) });
    for (let n = 1; n <= 4; n++) { line(g2, [[A.X(n * tau), A.Y(0)], [A.X(n * tau), A.Y(ymax * 1.1)]], "rgba(255,255,255,.12)", 1, [3, 3]); text(g2, `${n}τ`, A.X(n * tau) + 3, 24, { size: 10, color: C.mute }); }
    const seg0 = hist.filter((p) => p[2] === on && p[0] <= T && p[0] <= tSw);
    line(g2, seg0.map(([tt, v]) => [A.X(tt), A.Y(v)]), C.teal, 2.4);
    const theory = Array.from({ length: 100 }, (_, i) => { const tt = (i / 99) * T; return [A.X(tt), A.Y(on ? ymax * (1 - Math.exp(-tt / tau)) : (seg0[0]?.[1] ?? 0) * Math.exp(-tt / tau))]; });
    line(g2, theory, "rgba(255,255,255,.25)", 1, [4, 3]);
    for (const m of marks) line(g2, [[A.X(m), A.Y(0)], [A.X(m), A.Y(ymax * 1.1)]], C.gold, 1.5);
    if (seg0.length) circle(g2, A.X(Math.min(T, seg0.at(-1)[0])), A.Y(seg0.at(-1)[1]), 4, C.white);
  }
  function report(frac) {
    const tau = tauNow();
    out(`<div class="lab-read"><div><small>Time constant τ = ${mode === "rc" ? "RC" : "L/R"}</small><b>${tau.toFixed(2)} s</b></div><div><small>Half-life τ ln 2</small><b>${(tau * Math.LN2).toFixed(2)} s</b></div><div><small>${mode === "rc" ? "Final voltage" : "Final current E/R"}</small><b>${mode === "rc" ? `${P.E.toFixed(1)} V` : `${(P.E / P.R).toFixed(2)} A`}</b></div>${frac != null ? `<div><small>Reached at your mark</small><b>${(frac * 100).toFixed(0)}%</b></div>` : ""}</div>
      <p class="lab-msg">${mode === "rc" ? "As the capacitor charges, its voltage opposes the battery's, so the current (and the rate of charging) falls: V = E(1 − e^(−t/RC)). After one time constant it has 63% of its final charge, after five it is effectively full. Discharging follows e^(−t/RC), falling by half every 0.69RC, like radioactive decay." : "An inductor opposes changes in current by inducing an emf (Lenz's law), so the current can't jump: it rises as I = (E/R)(1 − e^(−Rt/L)) while the voltage across the inductor dies away. Open the switch and the current decays with the same time constant L/R."} The clock runs at a watchable pace; the graph is to scale.</p>`);
  }
  controls();
}
