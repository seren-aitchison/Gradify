// Special relativity: a light clock on a moving train ticks slowly (time dilation), the train is shorter
// (length contraction), and a spacetime diagram shows the moving frame's axes tilting towards the light line,
// which makes simultaneity relative. Exact Lorentz transformations; uniform motion only.
import { shell, canvas, slider, axes, line, clear, text, circle, rrect, arrow, challenges, panel, loop, C } from "../lab.js";

export const gamma = (b) => 1 / Math.sqrt(1 - b * b);
// coordinates (ct', x') of an event (ct, x) in a frame moving at speed βc along x
export const lorentz = (ct, x, b) => { const g = gamma(b); return [g * (ct - b * x), g * (x - b * ct)]; };
export const addVelocities = (u, v) => (u + v) / (1 + u * v);   // in units of c

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.42, max: 250 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.62, max: 360 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const P = { b: 0.2, u: 0.5 };
  const zig = [];   // the moving clock's light, as seen from the platform
  let t = 0, st = { g2: false, contract: false, simul: false, add: false };
  const ch = challenges(ctrl, ctx, [
    { id: "g2", text: "Find the speed at which moving clocks run at half rate (γ = 2)", test: (s) => s.g2 },
    { id: "len", text: "At 0.6c, check a 1 m rod measures 0.8 m", test: (s) => s.contract },
    { id: "sim", text: "Above 0.5c, see on the spacetime diagram that the two flashes aren't simultaneous for the train", test: (s) => s.simul },
    { id: "add", text: "Add 0.9c to 0.9c: the result is still below c", test: (s) => s.add },
  ]);
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  slider(sl, { label: "Train speed", min: 0, max: 0.99, step: 0.005, value: P.b, unit: "c", fmt: (v) => v.toFixed(3), onInput: (v) => { P.b = v; update(); } });
  slider(sl, { label: "Ball thrown forward on the train at", min: 0, max: 0.99, step: 0.01, value: P.u, unit: "c", fmt: (v) => v.toFixed(2), onInput: (v) => { P.u = v; update(); } });
  function update() {
    const g = gamma(P.b);
    if (Math.abs(g - 2) < 0.02) st.g2 = true;
    if (Math.abs(P.b - 0.6) < 0.003) st.contract = true;
    if (P.b >= 0.5) st.simul = true;
    if (Math.abs(P.b - 0.9) < 0.006 && Math.abs(P.u - 0.9) < 0.006) st.add = true;
    ch.check(st); report();
  }
  loop(el, (dt) => { t += dt; draw(); });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const G = gamma(P.b), L = 70;   // clock height in px
    // left: a clock at rest on the platform; right: the same clock on the train, ticking slower
    const period = 1.2, phase0 = (t / period) % 1, phase1 = (t / (period * G)) % 1;
    const clock = (x0, ph, label, moving) => {
      const y0 = 30, y1 = y0 + L, w = moving ? 60 / G : 60;
      rrect(g, x0 - w / 2, y0 - 6, w, 4, 2, C.mute); rrect(g, x0 - w / 2, y1 + 2, w, 4, 2, C.mute);
      const up = ph < 0.5, f = up ? ph * 2 : 2 - ph * 2, py = y1 - f * L;
      circle(g, x0, py, 4, C.gold);
      text(g, label, x0, y1 + 24, { align: "center", size: 11, color: C.mute });
    };
    clock(W * 0.2, phase0, "clock at rest", false);
    // the train: its photon path is a zigzag seen from the platform
    const tx = W * 0.45 + ((t * P.b * 90) % (W * 0.5)), w = 160 / G;
    rrect(g, tx - w / 2, 24, w, L + 14, 10, "rgba(90,160,255,.12)", "rgba(90,160,255,.6)");
    clock(tx, phase1, "", true);
    // the photon's path seen from the platform: a zigzag, longer than the clock's height, at the same speed c
    const up = phase1 < 0.5, f = up ? phase1 * 2 : 2 - phase1 * 2, py = 30 + L - f * L;
    if (zig.length && tx < zig.at(-1)[0]) zig.length = 0;
    zig.push([tx, py]); if (zig.length > 260) zig.shift();
    line(g, zig, "rgba(251,191,36,.55)", 1.4);
    text(g, `train: ${w.toFixed(0)} px long (rest length 160 px)`, tx, L + 62, { align: "center", size: 11, color: C.blue });
    arrow(g, tx + w / 2 + 6, 60, tx + w / 2 + 6 + 30 * P.b + 4, 60, C.blue, 2, 7);
    text(g, `γ = ${G.toFixed(3)}: the moving clock takes ${G.toFixed(2)}× as long per tick`, 10, H - 8, { size: 11 });
    // spacetime diagram
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const A = axes(g2, { l: 46, t: 10, w: W2 - 60, h: H2 - 42 }, { x0: -3, x1: 3, y0: 0, y1: 4, xl: "x (light-seconds), platform frame", yl: "ct (light-seconds)", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0), yt: 4 });
    line(g2, [[A.X(0), A.Y(0)], [A.X(3), A.Y(3)]], "rgba(251,191,36,.6)", 1.4, [5, 4]); line(g2, [[A.X(0), A.Y(0)], [A.X(-3), A.Y(3)]], "rgba(251,191,36,.6)", 1.4, [5, 4]);
    text(g2, "light", A.X(2.6), A.Y(2.75), { size: 10.5, color: C.gold });
    // the train's axes: ct' is its worldline (x = βct); x' is its line of simultaneity (ct = βx)
    line(g2, [[A.X(0), A.Y(0)], [A.X(Math.min(3, 4 * P.b)), A.Y(Math.min(4, 3 / Math.max(P.b, 1e-6)))]], C.blue, 2);
    line(g2, [[A.X(-3), A.Y(Math.max(0, -3 * P.b) + 1.5 - 1.5)], [A.X(3), A.Y(3 * P.b)]].map(([x, y], i) => i === 0 ? [A.X(0), A.Y(0)] : [x, y]), C.blue, 2);
    text(g2, "train's time axis ct′", A.X(Math.min(2.9, 4 * P.b)) - 4, 22, { align: "right", size: 10.5, color: C.blue });
    // two events simultaneous on the platform: lightning at x = ±2 at ct = 2
    const ev = [[2, -2], [2, 2]];
    for (const [ct, x] of ev) circle(g2, A.X(x), A.Y(ct), 6, C.red);
    line(g2, [[A.X(-2), A.Y(2)], [A.X(2), A.Y(2)]], "rgba(255,77,109,.5)", 1, [3, 3]);
    // the train's line of simultaneity through the first event
    const [c1] = lorentz(2, -2, P.b), [c2] = lorentz(2, 2, P.b);
    line(g2, [[A.X(-3), A.Y(2 + P.b * (-3 + 2))], [A.X(3), A.Y(2 + P.b * (3 + 2))]], "rgba(90,160,255,.6)", 1, [3, 3]);
    text(g2, `on the train the right-hand flash comes ${(c1 - c2).toFixed(2)} s earlier`, W2 - 14, H2 - 34, { align: "right", size: 11, color: C.blue });
  }
  function report() {
    const G = gamma(P.b), sum = addVelocities(P.u, P.b);
    out(`<div class="lab-read"><div><small>Lorentz factor γ</small><b>${G.toFixed(4)}</b></div><div><small>1 s on the train lasts</small><b>${G.toFixed(3)} s on the platform</b></div><div><small>A 1 m rod on the train measures</small><b>${(1 / G).toFixed(3)} m</b></div><div><small>Ball's speed seen from the platform</small><b>${sum.toFixed(4)}c (not ${(P.u + P.b).toFixed(2)}c)</b></div></div>
      <p class="lab-msg">Everyone measures the same speed of light. On the train, the clock's light goes straight up and down; from the platform it travels a longer zigzag at the same speed, so each tick takes longer: moving clocks run slow by γ = 1/√(1 − v²/c²). Lengths along the motion shrink by the same factor, and velocities combine as (u + v)/(1 + uv/c²), which never exceeds c. On the spacetime diagram the train's axes tilt towards the light line, so events on one horizontal line (simultaneous for the platform) happen at different times for the train.</p>`);
  }
  update();
}
