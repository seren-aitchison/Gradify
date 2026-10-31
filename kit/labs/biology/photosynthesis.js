// Photosynthesis and limiting factors: the rate of photosynthesis against light intensity, CO₂
// concentration and temperature, with the factor in shortest supply limiting the rate (Blackman's idea),
// plus a pondweed counting oxygen bubbles. The light response is a non-rectangular hyperbola, the CO₂
// response saturates, and temperature acts through enzyme activity. Respiration is subtracted for the net
// rate, giving the light compensation point. Illustrative numbers for a typical C3 leaf.
import { shell, canvas, slider, seg, axes, line, clear, circle, text, challenges, panel, loop, C } from "../lab.js";

const tempF = (T) => Math.max(0, Math.exp(-((T - 27) ** 2) / (2 * 8 ** 2)) * (T < 45 ? 1 : Math.max(0, 1 - (T - 45) / 5)));
export function rates({ light, co2, T }) {
  const Pmax = 30 * tempF(T) * (co2 / (co2 + 300)) * 1.6; // µmol CO₂ m⁻² s⁻¹, CO₂ in ppm
  const a = 0.06, th = 0.8, I = light;
  const gross = (a * I + Pmax - Math.sqrt((a * I + Pmax) ** 2 - 4 * th * a * I * Pmax)) / (2 * th);
  const resp = 1.5 * Math.exp(0.069 * (T - 25)); // respiration roughly doubles every 10 °C
  const lightLimited = a * I, co2Limited = Pmax;
  return { gross, net: gross - resp, resp, limit: lightLimited < co2Limited * 0.8 ? "light" : tempF(T) < 0.6 ? "temperature" : "CO₂" };
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.55, max: 320 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.4, max: 220 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { light: 400, co2: 400, T: 25 }; let xv = "light";
  const st = { comp: false, co2lim: false, hot: false };
  const ch = challenges(ctrl, ctx, [
    { id: "comp", text: "Find the light compensation point (net rate zero)", test: (x) => x.comp },
    { id: "co2", text: "At bright light, show that CO₂ has become the limiting factor", test: (x) => x.co2lim },
    { id: "hot", text: "Raise the temperature past the optimum and watch the rate fall", test: (x) => x.hot },
  ]);
  seg($(".top"), [["light", "Rate against light"], ["co2", "Rate against CO₂"], ["T", "Rate against temperature"]], xv, (v) => { xv = v; draw(); });
  slider(ctrl, { label: "Light intensity", min: 0, max: 2000, step: 10, value: s.light, unit: "µmol m⁻² s⁻¹", fmt: (v) => v, onInput: (v) => { s.light = v; draw(); } });
  slider(ctrl, { label: "CO₂", min: 50, max: 1500, step: 10, value: s.co2, unit: "ppm", fmt: (v) => v, onInput: (v) => { s.co2 = v; draw(); } });
  slider(ctrl, { label: "Temperature", min: 0, max: 50, step: 1, value: s.T, unit: "°C", fmt: (v) => v, onInput: (v) => { s.T = v; draw(); } });
  let R = rates(s), bubbles = [], acc = 0;
  function draw() {
    R = rates(s);
    if (Math.abs(R.net) < 0.3 && s.light < 200) st.comp = true; if (s.light > 1000 && R.limit === "CO₂") st.co2lim = true; if (s.T > 35 && rates({ ...s, T: 27 }).gross > R.gross * 1.4) st.hot = true; ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const range = { light: [0, 2000, "light (µmol m⁻² s⁻¹)"], co2: [0, 1500, "CO₂ (ppm)"], T: [0, 50, "temperature (°C)"] }[xv];
    const A = axes(g, { l: 52, t: 12, w: W - 66, h: H - 48 }, { x0: range[0], x1: range[1], y0: -5, y1: 40, xl: range[2], yl: "net rate (µmol CO₂ m⁻² s⁻¹)", xt: 5, yt: 3, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    line(g, [[A.X(range[0]), A.Y(0)], [A.X(range[1]), A.Y(0)]], "rgba(255,255,255,.3)", 1);
    for (const [k, col, dash] of [[s, C.green, null], [{ ...s, co2: 1200 }, C.teal, [5, 3]]]) line(g, Array.from({ length: 200 }, (_, i) => { const x = range[0] + ((range[1] - range[0]) * i) / 199; return [A.X(x), A.Y(rates({ ...k, [xv]: x }).net)]; }), col, 2.2, dash);
    circle(g, A.X(s[xv]), A.Y(R.net), 5, C.white);
    if (xv !== "co2") text(g, "dashed: same at 1,200 ppm CO₂", A.X(range[1]) - 4, 26, { align: "right", size: 11, color: C.teal });
    out(`<div class="lab-read"><div><small>Gross rate</small><b>${R.gross.toFixed(1)}</b></div><div><small>Respiration</small><b>${R.resp.toFixed(1)}</b></div><div><small>Net rate</small><b>${R.net.toFixed(1)}</b></div><div><small>Limiting factor</small><b>${R.limit}</b></div></div>
      <p class="lab-msg">Light drives the light-dependent reactions (ATP and NADPH); CO₂ is fixed by rubisco in the Calvin cycle; temperature affects the enzymes. Increasing a factor only helps while it is the one in shortest supply. Below the compensation point the leaf respires more CO₂ than it fixes.</p>`);
  }
  // pondweed: bubbles of oxygen at a rate proportional to net photosynthesis
  const stop = loop(el, (dt) => {
    const g = cv2.g, W = cv2.W, H = cv2.H; clear(g, W, H, "#06121a");
    acc += dt * Math.max(0, R.net) * 0.25; while (acc > 1) { acc -= 1; bubbles.push({ x: W * 0.3 + Math.random() * 10, y: H - 40, r: 2 + Math.random() * 3 }); }
    for (const b of bubbles) b.y -= dt * 60; bubbles = bubbles.filter((b) => b.y > 8);
    g.strokeStyle = "#2f9e44"; g.lineWidth = 4; g.beginPath(); g.moveTo(W * 0.3, H - 10); g.quadraticCurveTo(W * 0.27, H * 0.7, W * 0.31, H - 40); g.stroke();
    for (let i = 0; i < 6; i++) { g.strokeStyle = "#40c057"; g.lineWidth = 3; g.beginPath(); g.moveTo(W * 0.3, H - 14 - i * 5); g.lineTo(W * 0.3 + (i % 2 ? 18 : -18), H - 24 - i * 5); g.stroke(); }
    for (const b of bubbles) circle(g, b.x, b.y, b.r, null, "rgba(200,240,255,.8)");
    const lamp = Math.min(1, s.light / 2000); circle(g, W * 0.85, H * 0.35, 18, `rgba(255,230,120,${0.2 + 0.8 * lamp})`);
    text(g, `${(Math.max(0, R.net) * 0.25 * 60).toFixed(0)} bubbles per minute`, W * 0.45, H * 0.5, { size: 13, weight: 600 });
    text(g, "oxygen bubbles from pondweed (illustrative)", W * 0.45, H * 0.5 + 18, { size: 11, color: C.mute });
  });
  draw();
  return stop;
}
