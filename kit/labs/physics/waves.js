// Waves on a string: two travelling waves and their sum (superposition), standing waves on a string fixed at both
// ends, and beats between two close frequencies. Ideal, lossless string; sinusoidal waves.
import { shell, canvas, slider, seg, axes, line, clear, text, circle, challenges, panel, loop, C } from "../lab.js";

// the frequency of harmonic n on a string of length L (m), tension T (N) and linear density mu (kg/m)
export const harmonic = (n, L, T, mu) => (n / (2 * L)) * Math.sqrt(T / mu);
export const waveSpeed = (T, mu) => Math.sqrt(T / mu);
export const beat = (f1, f2) => Math.abs(f1 - f2);

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.62, max: 400 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let mode = ["standing", "beats"].includes(ctx.mode) ? ctx.mode : "super";
  const P = { a1: 1, a2: 0.6, f1: 1, f2: 1, dir2: 1, phase: 0, n: 1, T: 80, mu: 0.01, L: 1, fb1: 440, fb2: 444 };   // starts meeting no challenge
  let t = 0, st = { cancel: false, standing: false, h3: false, beats: false };
  const ch = challenges(ctrl, ctx, [
    { id: "cancel", text: "Superposition: make two waves cancel completely (destructive interference)", test: (s) => s.cancel },
    { id: "stand", text: "Send two equal waves in opposite directions and get a standing wave", test: (s) => s.standing },
    { id: "h3", text: "Standing waves: show the third harmonic and count its nodes", test: (s) => s.h3 },
    { id: "beats", text: "Beats: tune two notes until you hear (and see) 2 beats per second", test: (s) => s.beats },
  ]);
  seg($(".top"), [["super", "Superposition"], ["standing", "Standing waves"], ["beats", "Beats"]], mode, (v) => { mode = v; controls(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  function controls() {
    sl.innerHTML = "";
    const S = (o) => slider(sl, { ...o, onInput: (v) => { P[o.key] = v; check(); } });
    if (mode === "super") {
      S({ key: "a1", label: "Wave 1 amplitude", min: 0, max: 1.5, step: 0.05, value: P.a1, fmt: (v) => v.toFixed(2) });
      S({ key: "a2", label: "Wave 2 amplitude", min: 0, max: 1.5, step: 0.05, value: P.a2, fmt: (v) => v.toFixed(2) });
      S({ key: "f2", label: "Wave 2 frequency (× wave 1)", min: 0.5, max: 3, step: 0.05, value: P.f2, fmt: (v) => v.toFixed(2) });
      S({ key: "phase", label: "Phase difference", min: 0, max: 360, step: 5, value: P.phase, unit: "°", fmt: (v) => v.toFixed(0) });
      const d = document.createElement("label"); d.className = "lab-tog"; d.innerHTML = `<input type="checkbox" ${P.dir2 < 0 ? "checked" : ""}><span>Wave 2 travels the other way</span>`; sl.append(d);
      d.querySelector("input").addEventListener("change", (e) => { P.dir2 = e.target.checked ? -1 : 1; check(); });
    } else if (mode === "standing") {
      S({ key: "n", label: "Harmonic n", min: 1, max: 8, step: 1, value: P.n, fmt: (v) => v.toFixed(0) });
      S({ key: "T", label: "Tension", min: 10, max: 200, step: 1, value: P.T, unit: "N", fmt: (v) => v.toFixed(0) });
      S({ key: "mu", label: "Mass per metre", min: 0.002, max: 0.05, step: 0.001, value: P.mu, unit: "kg/m", fmt: (v) => v.toFixed(3) });
      S({ key: "L", label: "String length", min: 0.3, max: 2, step: 0.05, value: P.L, unit: "m", fmt: (v) => v.toFixed(2) });
    } else {
      S({ key: "fb1", label: "Note 1", min: 430, max: 450, step: 0.5, value: P.fb1, unit: "Hz", fmt: (v) => v.toFixed(1) });
      S({ key: "fb2", label: "Note 2", min: 430, max: 450, step: 0.5, value: P.fb2, unit: "Hz", fmt: (v) => v.toFixed(1) });
      const b = document.createElement("button"); b.type = "button"; b.className = "lab-btn"; b.textContent = "Play both notes (2 s)"; sl.append(b);
      b.addEventListener("click", play);
    }
    check();
  }
  function play() {
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)(), gain = ac.createGain(); gain.gain.value = 0.08; gain.connect(ac.destination);
      for (const f of [P.fb1, P.fb2]) { const o = ac.createOscillator(); o.frequency.value = f; o.connect(gain); o.start(); o.stop(ac.currentTime + 2); }
      gain.gain.setTargetAtTime(0, ac.currentTime + 1.8, 0.05); setTimeout(() => ac.close(), 2300);
    } catch { /* no audio available: the picture still shows the beats */ }
  }
  function check() {
    if (mode === "super" && Math.abs(P.a1 - P.a2) < 0.01 && P.a1 > 0.2 && Math.abs(P.f2 - 1) < 0.01 && P.dir2 > 0 && Math.abs(P.phase - 180) < 3) st.cancel = true;
    if (mode === "super" && Math.abs(P.a1 - P.a2) < 0.01 && P.a1 > 0.2 && Math.abs(P.f2 - 1) < 0.01 && P.dir2 < 0) st.standing = true;
    if (mode === "standing" && P.n === 3) st.h3 = true;
    if (mode === "beats" && Math.abs(beat(P.fb1, P.fb2) - 2) < 0.01) st.beats = true;
    ch.check(st); report();
  }
  loop(el, (dt) => { t += dt; draw(); });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const N = 300;
    if (mode === "super") {
      const k = 2 * Math.PI / 1, w = 2 * Math.PI * 0.5, ph = (P.phase * Math.PI) / 180;
      const y1 = (x) => P.a1 * Math.sin(k * x - w * t), y2 = (x) => P.a2 * Math.sin(P.f2 * k * x - P.dir2 * P.f2 * w * t + ph);
      const rows = [[y1, C.blue, "wave 1"], [y2, C.orange, "wave 2"], [(x) => y1(x) + y2(x), C.teal, "sum"]];
      rows.forEach(([f, col, lab], i) => {
        const top = 8 + i * (H / 3), h = H / 3 - 14, mid = top + h / 2, sy = h / 2 / 3.1;
        line(g, [[40, mid], [W - 10, mid]], "rgba(255,255,255,.12)", 1);
        line(g, Array.from({ length: N }, (_, j) => { const x = (j / (N - 1)) * 3; return [40 + (x / 3) * (W - 50), mid - f(x) * sy * (i === 2 ? 1 : 1.6)]; }), col, i === 2 ? 2.6 : 2);
        text(g, lab, 6, mid + 4, { color: col, size: 11 });
      });
    } else if (mode === "standing") {
      const mid = H * 0.45, x0 = 40, x1 = W - 40, A = H * 0.22;
      for (const s of [1, -1]) line(g, Array.from({ length: N }, (_, j) => { const u = j / (N - 1); return [x0 + u * (x1 - x0), mid - s * A * Math.sin(P.n * Math.PI * u)]; }), "rgba(255,255,255,.18)", 1, [4, 4]);
      const f = harmonic(P.n, P.L, P.T, P.mu), wv = Math.cos(2 * Math.PI * Math.min(f, 3) * 0.5 * t);
      line(g, Array.from({ length: N }, (_, j) => { const u = j / (N - 1); return [x0 + u * (x1 - x0), mid - A * Math.sin(P.n * Math.PI * u) * wv]; }), C.teal, 2.6);
      for (let i = 0; i <= P.n; i++) circle(g, x0 + (i / P.n) * (x1 - x0), mid, 5, C.white);
      for (let i = 0; i < P.n; i++) text(g, "A", x0 + ((i + 0.5) / P.n) * (x1 - x0), mid - A - 10, { align: "center", color: C.mute, size: 11 });
      g.fillStyle = "rgba(255,255,255,.3)"; g.fillRect(x0 - 8, mid - 30, 6, 60); g.fillRect(x1 + 2, mid - 30, 6, 60);
      // the harmonic ladder
      const B = axes(g, { l: 60, t: H * 0.72, w: W - 90, h: H * 0.2 }, { x0: 0, x1: 9, y0: 0, y1: harmonic(8, P.L, P.T, P.mu) * 1.1, xl: "harmonic n", yl: "f (Hz)", xt: 9, yt: 2, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
      for (let n = 1; n <= 8; n++) { const fn = harmonic(n, P.L, P.T, P.mu); g.fillStyle = n === P.n ? C.teal : "rgba(255,255,255,.25)"; g.fillRect(B.X(n) - 6, B.Y(fn), 12, B.Y(0) - B.Y(fn)); }
      text(g, "nodes ●   antinodes A", W - 12, 20, { align: "right", color: C.mute, size: 11 });
    } else {
      // sin a + sin b = 2 cos((a−b)/2) sin((a+b)/2): the envelope is exact; the tone inside it is drawn at 40 Hz, not ~440 Hz, so it shows
      const span = 1.2, f1 = P.fb1, f2 = P.fb2, fc = 40;
      const A = axes(g, { l: 46, t: 14, w: W - 60, h: H - 50 }, { x0: 0, x1: span, y0: -2.2, y1: 2.2, xl: "time (s)", yl: "pressure", xf: (v) => v.toFixed(1), yf: (v) => v.toFixed(0) });
      line(g, Array.from({ length: 1200 }, (_, j) => { const tt = (j / 1199) * span; return [A.X(tt), A.Y(2 * Math.cos(Math.PI * (f2 - f1) * tt) * Math.sin(2 * Math.PI * fc * tt))]; }), "rgba(20,212,196,.6)", 1);
      for (const s of [1, -1]) line(g, Array.from({ length: 300 }, (_, j) => { const tt = (j / 299) * span; return [A.X(tt), A.Y(s * 2 * Math.abs(Math.cos(Math.PI * (f2 - f1) * tt)))]; }), C.gold, 2);
      text(g, "loudness envelope", W - 14, 26, { align: "right", color: C.gold, size: 11 });
    }
  }
  function report() {
    if (mode === "super") out(`<p class="lab-msg">Where two waves overlap, the displacement is the sum of the two (superposition). In phase they reinforce; 180° out of phase with equal amplitudes they cancel. Two equal waves travelling in opposite directions add up to a <b>standing wave</b>: points that never move (nodes) alternate with points of largest motion (antinodes). Different frequencies give a wave that changes shape as it moves.</p>`);
    else if (mode === "standing") { const f = harmonic(P.n, P.L, P.T, P.mu); out(`<div class="lab-read"><div><small>Wave speed √(T/μ)</small><b>${waveSpeed(P.T, P.mu).toFixed(1)} m/s</b></div><div><small>Wavelength 2L/n</small><b>${((2 * P.L) / P.n).toFixed(3)} m</b></div><div><small>Frequency f<sub>${P.n}</sub></small><b>${f.toFixed(1)} Hz</b></div><div><small>Nodes</small><b>${P.n + 1}</b></div></div><p class="lab-msg">Both ends are fixed, so they must be nodes, which allows only whole numbers of half-wavelengths on the string: λ = 2L/n and f<sub>n</sub> = n·v/2L. Tighten the string or make it lighter and every harmonic rises; that is how a guitar is tuned. The animation is slowed so you can see the motion.</p>`); }
    else out(`<div class="lab-read"><div><small>Beat frequency |f₁ − f₂|</small><b>${beat(P.fb1, P.fb2).toFixed(1)} Hz</b></div><div><small>Heard pitch (f₁ + f₂)/2</small><b>${((P.fb1 + P.fb2) / 2).toFixed(1)} Hz</b></div></div><p class="lab-msg">Two notes a few hertz apart drift in and out of step, so the loudness swells and fades |f₁ − f₂| times a second. Musicians tune by turning a string until the beats against a reference slow to zero. The loudness envelope is drawn to scale; the tone inside it is drawn at 40 Hz instead of about 440 Hz so the oscillation shows.</p>`);
  }
  controls();
}
