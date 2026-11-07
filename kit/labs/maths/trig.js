// The unit circle and the trigonometric graphs: a point P at angle θ on the unit circle has coordinates (cos θ, sin θ);
// as θ turns, its height traces the sine graph and its horizontal position the cosine graph. Also y = A sin(B(x − C)) + D
// for transformations. Exact values; angles in degrees or radians.
import { shell, canvas, slider, seg, challenges, panel, describe, handles, C, fmt } from "../lab.js";
import { plane, curve, dot } from "./plot.js";

const EXACT = { 0: ["0", "1", "0"], 30: ["1/2", "√3/2", "1/√3"], 45: ["√2/2", "√2/2", "1"], 60: ["√3/2", "1/2", "√3"], 90: ["1", "0", "undefined"], 120: ["√3/2", "−1/2", "−√3"], 135: ["√2/2", "−√2/2", "−1"], 150: ["1/2", "−√3/2", "−1/√3"], 180: ["0", "−1", "0"], 210: ["−1/2", "−√3/2", "1/√3"], 225: ["−√2/2", "−√2/2", "1"], 240: ["−√3/2", "−1/2", "√3"], 270: ["−1", "0", "undefined"], 300: ["−√3/2", "1/2", "−√3"], 315: ["−√2/2", "√2/2", "−1"], 330: ["−1/2", "√3/2", "−1/√3"] };
export const exactValues = (deg) => EXACT[((deg % 360) + 360) % 360] || null;
export const toRad = (d) => (d * Math.PI) / 180;

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-stage"></div><div class="lab-cols"><div class="lab-stage2"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.42, max: 300 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.5, max: 280 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), say = describe(cv, "The unit circle beside the sine and cosine graphs"), say2 = describe(cv2, "A transformed sine graph");
  let unit = "deg";
  const s = { th: 30, A: 1, B: 1, Cs: 0, D: 0 }, st = { quad2: false, neg: false, period: false, match: false }, visited = new Set();
  let touched = false;
  const ch = challenges(ctrl, ctx, [
    { id: "neg", text: "Find an angle between 90° and 180° whose cosine is −1/2", test: (x) => x.neg },
    { id: "quad", text: "Visit all four quadrants and see where sine and cosine are positive or negative", test: (x) => x.quad2 },
    { id: "period", text: "Transform y = sin x so its period is 180° (π radians)", test: (x) => x.period },
    { id: "match", text: "Make y = 3 sin(2x) + 1: amplitude 3, period 180°, centre line y = 1", test: (x) => x.match },
  ]);
  seg($(".top"), [["deg", "Degrees"], ["rad", "Radians"]], unit, (v) => { unit = v; draw(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  const thS = slider(sl, { label: "Angle θ", min: 0, max: 360, step: 1, value: s.th, unit: "°", fmt: (v) => v.toFixed(0), onInput: (v) => { s.th = v; touched = true; draw(); } });
  slider(sl, { label: "Amplitude A", min: 0.5, max: 3, step: 0.5, value: s.A, fmt: (v) => v.toFixed(1), onInput: (v) => { s.A = v; touched = true; draw(); } });
  slider(sl, { label: "Frequency B", min: 0.5, max: 3, step: 0.5, value: s.B, fmt: (v) => v.toFixed(1), onInput: (v) => { s.B = v; touched = true; draw(); } });
  slider(sl, { label: "Phase shift C", min: -180, max: 180, step: 15, value: s.Cs, unit: "°", fmt: (v) => v.toFixed(0), onInput: (v) => { s.Cs = v; touched = true; draw(); } });
  slider(sl, { label: "Vertical shift D", min: -2, max: 2, step: 0.5, value: s.D, fmt: (v) => v.toFixed(1), onInput: (v) => { s.D = v; touched = true; draw(); } });
  // P on the circle can be dragged, or moved 1° (15° with Shift) a key press
  const geo = () => { const W = cv.W, H = cv.H, r = Math.min(H * 0.4, W * 0.17); return { cx: r + 24, cy: H / 2, r }; };
  const Ph = { id: "P", name: "Point P on the unit circle", x: Math.cos(toRad(s.th)), y: Math.sin(toRad(s.th)) };
  const hd = handles(cv, [Ph], {
    toPx: (x, y) => { const q = geo(); return [q.cx + x * q.r, q.cy - y * q.r]; }, toWorld: (px, py) => { const q = geo(); return [(px - q.cx) / q.r, (q.cy - py) / q.r]; },
    step: 1, nudge: (pt, dx, dy, k) => { const a = s.th + k * (dx || dy); return [Math.cos(toRad(a)), Math.sin(toRad(a))]; },
    onMove: (pt) => { let a = (Math.atan2(pt.y, pt.x) * 180) / Math.PI; if (a < 0) a += 360; s.th = Math.round(a) % 360; thS.value = s.th; touched = true; draw(); },
  });
  const fmtA = (d) => (unit === "deg" ? `${fmt(d, 0)}°` : `${fmt(toRad(d) / Math.PI, 3)}π`);
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; g.fillStyle = C.bg; g.fillRect(0, 0, W, H);
    const { cx, cy, r } = geo(), t = toRad(s.th), px = cx + r * Math.cos(t), py = cy - r * Math.sin(t);
    Object.assign(Ph, { x: Math.cos(t), y: Math.sin(t) });
    g.strokeStyle = "rgba(255,255,255,.25)"; g.lineWidth = 1; g.beginPath(); g.moveTo(cx - r - 8, cy); g.lineTo(cx + r + 8, cy); g.moveTo(cx, cy - r - 8); g.lineTo(cx, cy + r + 8); g.stroke();
    g.strokeStyle = "rgba(255,255,255,.6)"; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, r, 0, 2 * Math.PI); g.stroke();
    g.strokeStyle = C.amber; g.beginPath(); g.arc(cx, cy, r * 0.25, 0, -t, true); g.stroke();
    g.lineWidth = 3; g.strokeStyle = C.blue; g.beginPath(); g.moveTo(px, cy); g.lineTo(px, py); g.stroke();   // sin
    g.strokeStyle = C.green; g.beginPath(); g.moveTo(cx, cy); g.lineTo(px, cy); g.stroke();                  // cos
    g.lineWidth = 1.5; g.strokeStyle = "rgba(255,255,255,.7)"; g.beginPath(); g.moveTo(cx, cy); g.lineTo(px, py); g.stroke(); dot(g, px, py, C.white, 6);
    // the graphs, 0° to 360°, beside the circle
    const gx0 = cx + r + 40, gw = W - gx0 - 14, X = (d) => gx0 + (d / 360) * gw, Y = (v) => cy - v * r;
    g.strokeStyle = "rgba(255,255,255,.2)"; g.lineWidth = 1; g.beginPath(); g.moveTo(gx0, cy); g.lineTo(gx0 + gw, cy); g.stroke();
    for (const [f, col] of [[Math.sin, C.blue], [Math.cos, C.green]]) { g.strokeStyle = col; g.lineWidth = 2; g.beginPath(); for (let d = 0; d <= 360; d += 2) { const yy = Y(f(toRad(d))); d ? g.lineTo(X(d), yy) : g.moveTo(X(d), yy); } g.stroke(); }
    g.setLineDash([3, 3]); g.strokeStyle = "rgba(255,255,255,.4)"; g.beginPath(); g.moveTo(px, py); g.lineTo(X(s.th), py); g.stroke(); g.setLineDash([]);
    dot(g, X(s.th), Y(Math.sin(t)), C.blue, 5); dot(g, X(s.th), Y(Math.cos(t)), C.green, 5);
    g.fillStyle = C.mute; g.font = "11px Geist, system-ui"; for (const d of [90, 180, 270, 360]) g.fillText(fmtA(d), X(d) - 10, cy + r + 16);
    g.fillStyle = C.blue; g.fillText("sin θ", gx0 + 4, cy - r - 4); g.fillStyle = C.green; g.fillText("cos θ", gx0 + 50, cy - r - 4);
    hd.place();
    // the transformed graph
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; g2.fillStyle = C.bg; g2.fillRect(0, 0, W2, H2);
    const P2 = plane(g2, W2, H2, { x0: -2 * Math.PI, x1: 2 * Math.PI, y0: -4.5, y1: 4.5 }); P2.draw();
    curve(g2, P2, Math.sin, "rgba(255,255,255,.3)", 1.5, [4, 4]);
    curve(g2, P2, (x) => s.A * Math.sin(s.B * (x - toRad(s.Cs))) + s.D, C.violet, 2.6);
    const quad = s.th % 90 === 0 ? null : Math.floor(s.th / 90) + 1; if (touched && quad) visited.add(quad);
    if (touched && s.th > 90 && s.th < 180 && Math.abs(Math.cos(t) + 0.5) < 1e-9) st.neg = true;
    if (visited.size === 4) st.quad2 = true;
    if (touched && Math.abs(360 / s.B - 180) < 1e-9) st.period = true;
    if (touched && s.A === 3 && s.B === 2 && s.D === 1 && s.Cs === 0) st.match = true;
    ch.check(st);
    const ex = exactValues(s.th), sn = fmt(Math.sin(t), 4), cs = fmt(Math.cos(t), 4), tn = Math.abs(Math.cos(t)) < 1e-12 ? "undefined" : fmt(Math.tan(t), 4);
    const text = `θ = ${fmtA(s.th)}: P = (cos θ, sin θ) = (${cs}, ${sn})${quad ? `, quadrant ${quad}` : ", on an axis"}.`;
    say(text); say2(`y = ${s.A} sin(${s.B}(x − ${s.Cs}°)) + ${s.D}: amplitude ${s.A}, period ${fmt(360 / s.B, 0)}°, centre line y = ${s.D}.`);
    ctx.report?.(`${text} Transformed graph y = ${s.A} sin(${s.B}(x − ${s.Cs}°)) + ${s.D}.`);
    out(`<div class="lab-read"><div><small>sin θ</small><b>${ex ? `${ex[0]} = ` : ""}${sn}</b></div><div><small>cos θ</small><b>${ex ? `${ex[1]} = ` : ""}${cs}</b></div><div><small>tan θ</small><b>${ex && ex[2] !== "undefined" ? `${ex[2]} = ` : ""}${tn}</b></div><div><small>Visited quadrants</small><b>${[...visited].sort().join(", ") || "–"}</b></div><div><small>Period of the purple graph</small><b>${fmtA(360 / s.B)}</b></div></div>
      <p class="lab-msg">On the unit circle, cos θ is P's horizontal position and sin θ its height, so sin²θ + cos²θ = 1 is Pythagoras. In y = A sin(B(x − C)) + D, A stretches vertically (amplitude), B squashes horizontally (period 360°/B), C shifts right and D shifts up. Drag P, or select it and use the arrow keys.</p>`);
  }
  cv.onresize = draw; cv2.onresize = draw;
  draw();
}
