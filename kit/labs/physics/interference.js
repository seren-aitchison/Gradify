// Young's double slit, single-slit diffraction and the diffraction grating, in the far-field (Fraunhofer)
// approximation: I(θ) = I₀ · sinc²(πa sinθ/λ) · [sin(Nπd sinθ/λ) / (N sin(πd sinθ/λ))]². Monochromatic light,
// slits much longer than they are wide.
import { shell, canvas, slider, seg, axes, line, clear, text, challenges, panel, loop, C } from "../lab.js";

export function intensity(theta, { lambda, a, d, N }) {
  const b = (Math.PI * a * Math.sin(theta)) / lambda, single = b === 0 ? 1 : (Math.sin(b) / b) ** 2;
  if (N <= 1) return single;
  const g = (Math.PI * d * Math.sin(theta)) / lambda, s = Math.sin(g);
  const multi = Math.abs(s) < 1e-9 ? 1 : (Math.sin(N * g) / (N * s)) ** 2;
  return single * multi;
}
export const fringeSpacing = (lambda, L, d) => (lambda * L) / d;
// a visible wavelength (nm) as a CSS colour
export function wavelengthColour(nm) {
  let r = 0, g = 0, b = 0;
  if (nm < 440) [r, b] = [(440 - nm) / 60, 1]; else if (nm < 490) [g, b] = [(nm - 440) / 50, 1]; else if (nm < 510) [g, b] = [1, (510 - nm) / 20];
  else if (nm < 580) [r, g] = [(nm - 510) / 70, 1]; else if (nm < 645) [r, g] = [1, (645 - nm) / 65]; else r = 1;
  const f = nm < 420 ? 0.3 + (0.7 * (nm - 380)) / 40 : nm > 700 ? 0.3 + (0.7 * (780 - nm)) / 80 : 1;
  return [r, g, b].map((v) => Math.round(255 * Math.max(0, v) * f));
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.36, max: 230 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.4, max: 250 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let mode = ["single", "grating"].includes(ctx.mode) ? ctx.mode : "double";
  const P = { nm: 600, a: 20, d: 100, N: 2, L: 2, lines: 300 };
  let t = 0, st = { spacing: false, missing: false, wider: false, grating: false };
  const ch = challenges(ctrl, ctx, [
    { id: "spacing", text: "Double slit: halve the slit separation and see the fringes spread twice as far apart", test: (s) => s.spacing },
    { id: "miss", text: "Make a bright fringe vanish where it meets a diffraction minimum (a missing order: d = 3a)", test: (s) => s.missing },
    { id: "wide", text: "Single slit: narrow the slit and see the central maximum get wider", test: (s) => s.wider },
    { id: "grat", text: "Grating: with 600 lines per mm, find how many orders red light (700 nm) can show", test: (s) => s.grating },
  ]);
  seg($(".top"), [["double", "Double slit"], ["single", "Single slit"], ["grating", "Diffraction grating"]], mode, (v) => { mode = v; controls(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  let d0 = P.d, a0 = P.a;
  function controls() {
    sl.innerHTML = "";
    const S = (o) => slider(sl, { ...o, onInput: (v) => { P[o.key] = v; check(); } });
    S({ key: "nm", label: "Wavelength", min: 380, max: 750, step: 5, value: P.nm, unit: "nm", fmt: (v) => v.toFixed(0) });
    if (mode !== "grating") S({ key: "a", label: "Slit width a", min: 5, max: 60, step: 1, value: P.a, unit: "µm", fmt: (v) => v.toFixed(0) });
    if (mode === "double") S({ key: "d", label: "Slit separation d", min: 20, max: 300, step: 5, value: P.d, unit: "µm", fmt: (v) => v.toFixed(0) });
    if (mode === "grating") S({ key: "lines", label: "Lines per mm", min: 50, max: 1200, step: 50, value: P.lines, fmt: (v) => v.toFixed(0) });
    S({ key: "L", label: "Distance to screen", min: 0.5, max: 4, step: 0.1, value: P.L, unit: "m", fmt: (v) => v.toFixed(1) });
    d0 = P.d; a0 = P.a; check();
  }
  const opt = () => mode === "double" ? { lambda: P.nm * 1e-9, a: P.a * 1e-6, d: P.d * 1e-6, N: 2 } : mode === "single" ? { lambda: P.nm * 1e-9, a: P.a * 1e-6, d: 0, N: 1 } : { lambda: P.nm * 1e-9, a: 0.25e-3 / P.lines, d: 1e-3 / P.lines, N: 12 };
  function check() {
    if (mode === "double" && Math.abs(P.d - d0 / 2) < 3) st.spacing = true;
    if (mode === "double" && Math.abs(P.d / P.a - 3) < 0.05) st.missing = true;
    if (mode === "single" && P.a <= a0 / 2) st.wider = true;
    if (mode === "grating" && P.lines === 600 && Math.abs(P.nm - 700) <= 5) st.grating = true;
    ch.check(st); report();
  }
  loop(el, (dt) => { t += dt; draw(); });
  function draw() {
    const o = opt(), [r, g0, b] = wavelengthColour(P.nm);
    // top: a ripple-tank view of the waves leaving the slits
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const wx = W * 0.18, img = g.createImageData(Math.ceil(W - wx), H), lamPx = 16;
    const nSl = mode === "grating" ? 6 : mode === "double" ? 2 : 1, gap = mode === "single" ? 0 : Math.min(H / (nSl + 1), (mode === "double" ? P.d / 4 : 18));
    const srcs = Array.from({ length: nSl }, (_, i) => H / 2 + (i - (nSl - 1) / 2) * gap);
    for (let y = 0; y < H; y += 2) for (let x = 0; x < img.width; x += 2) {
      let s = 0; for (const sy of srcs) { const rr = Math.hypot(x, y - sy); s += Math.sin((2 * Math.PI * rr) / lamPx - t * 6) / Math.sqrt(1 + rr / 30); }
      const v = Math.max(0, s / nSl); const i0 = (y * img.width + x) * 4;
      for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) { const k = i0 + (dy * img.width + dx) * 4; if (k + 3 < img.data.length) { img.data[k] = r * v; img.data[k + 1] = g0 * v; img.data[k + 2] = b * v; img.data[k + 3] = 255; } }
    }
    g.putImageData(img, wx, 0);
    for (let y = 0; y < H; y++) { const pass = srcs.some((sy) => Math.abs(y - sy) < (mode === "single" ? Math.max(3, P.a / 3) : 3)); if (!pass) { g.fillStyle = "#3a3d44"; g.fillRect(wx - 6, y, 6, 1); } }
    for (let x = 0; x < wx - 8; x += lamPx) { g.fillStyle = `rgba(${r},${g0},${b},${0.35 + 0.35 * Math.sin(-t * 6 + (x / lamPx) * 2 * Math.PI)})`; g.fillRect(x, 0, 3, H); }
    text(g, "drawn wavelength not to scale", W - 8, H - 8, { align: "right", color: "rgba(255,255,255,.6)", size: 10 });
    // bottom: the pattern on the screen and the intensity curve
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const ymax = mode === "grating" ? 0.9 * P.L : Math.max(0.01, 4 * (P.nm * 1e-9 * P.L) / (P.a * 1e-6)) * 0.6;
    const A = axes(g2, { l: 48, t: 40, w: W2 - 62, h: H2 - 74 }, { x0: -ymax * 100, x1: ymax * 100, y0: 0, y1: 1.05, xl: "position on the screen (cm)", yl: "intensity", xf: (v) => v.toFixed(mode === "grating" ? 0 : 1), yf: (v) => v.toFixed(1), yt: 2 });
    const pts = [];
    for (let i = 0; i <= 900; i++) { const y = -ymax + (2 * ymax * i) / 900, th = Math.atan2(y, P.L), I = intensity(th, o); pts.push([y, I]); const x = A.X(y * 100); g2.fillStyle = `rgba(${r},${g0},${b},${Math.min(1, I * 1.4)})`; g2.fillRect(x, 6, Math.max(1, (A.X(ymax * 100) - A.X(-ymax * 100)) / 900 + 0.5), 24); }
    line(g2, pts.map(([y, I]) => [A.X(y * 100), A.Y(I)]), C.white, 1.6);
    if (mode === "double") line(g2, pts.map(([y]) => [A.X(y * 100), A.Y(intensity(Math.atan2(y, P.L), { ...o, N: 1 }))]), "rgba(255,255,255,.35)", 1, [4, 3]);
  }
  function report() {
    const lam = P.nm * 1e-9;
    if (mode === "double") out(`<div class="lab-read"><div><small>Fringe spacing λL/d</small><b>${(fringeSpacing(lam, P.L, P.d * 1e-6) * 1000).toFixed(2)} mm</b></div><div><small>Central maximum width 2λL/a</small><b>${((2 * lam * P.L) / (P.a * 1e-6) * 100).toFixed(1)} cm</b></div><div><small>d / a</small><b>${(P.d / P.a).toFixed(2)}</b></div></div><p class="lab-msg">Light from the two slits travels different distances to each point on the screen. Where the path difference is a whole number of wavelengths (d sinθ = nλ) the waves arrive in step and add up to a bright fringe; half a wavelength out and they cancel. The fringes sit inside the single-slit diffraction envelope (dashed): where a bright fringe lands on an envelope zero, that order goes missing.</p>`);
    else if (mode === "single") out(`<div class="lab-read"><div><small>First minimum at sinθ = λ/a</small><b>${((lam / (P.a * 1e-6)) * 1000).toFixed(1)} mrad</b></div><div><small>Central maximum on screen</small><b>${((2 * lam * P.L) / (P.a * 1e-6) * 100).toFixed(1)} cm wide</b></div></div><p class="lab-msg">Each part of the slit acts as a source (Huygens). At angles where the slit splits into pairs of strips half a wavelength apart, everything cancels: a sinθ = nλ gives the dark bands. The narrower the slit, the more the light spreads, which is why diffraction limits how sharp a telescope or microscope can be.</p>`);
    else { const d = 1e-3 / P.lines, nmax = Math.floor(d / lam), angles = Array.from({ length: nmax }, (_, i) => ((Math.asin(((i + 1) * lam) / d) * 180) / Math.PI).toFixed(1)); out(`<div class="lab-read"><div><small>Line spacing d</small><b>${(d * 1e6).toFixed(2)} µm</b></div><div><small>Highest order (d/λ)</small><b>${nmax}</b></div><div><small>Order angles</small><b>${angles.join("°, ")}°</b></div></div><p class="lab-msg">A grating's many slits make the bright orders very sharp: they appear only where d sinθ = nλ. Because the angle depends on wavelength, a grating spreads white light into spectra, which is how spectrometers measure the light from stars and lamps. Only orders with sinθ ≤ 1 exist, so n can't exceed d/λ.</p>`); }
  }
  controls();
}
