// Procedural visuals: diagrams computed from the physics and mathematics themselves, so they're right by
// construction (the equations are shown with each one, and Node tests the numbers: tests/visuals.test.mjs).
// Each one is a canvas you can change, with a question worked out from whatever you set.
//   field-lines   electric field lines of point charges you place: E = Σ kq r̂ / r², traced with fourth-order Runge–Kutta
//   waves         superposition of two waves y = A sin(kx − ωt + φ): interference, standing waves and beats
//   projectile    launch speed and angle; the path, the velocity components, range, height and time of flight
//   vectors       adding two vectors by components; the resultant's size and direction
//   unit-circle   sin and cos as the coordinates of a point on the unit circle, traced as graphs
export const PROCEDURAL = [
  { id: "field-lines", title: "Electric field lines", sub: "Place positive and negative charges and see the field they make. E = Σ kq r̂ / r².", keys: ["electric field", "field lines", "charge", "coulomb", "dipole", "electrostatics", "physics"] },
  { id: "waves", title: "Wave superposition", sub: "Add two waves: interference, standing waves, nodes and antinodes, and beats.", keys: ["wave", "superposition", "interference", "standing wave", "node", "antinode", "beats", "frequency", "amplitude", "phase", "sound", "physics"] },
  { id: "projectile", title: "Projectile motion", sub: "Launch speed and angle; the path, velocity components, range, maximum height and time of flight.", keys: ["projectile", "trajectory", "kinematics", "suvat", "velocity", "components", "gravity", "range", "physics", "mechanics"] },
  { id: "vectors", title: "Adding vectors", sub: "Two vectors added by components, and the resultant's magnitude and direction.", keys: ["vector", "resultant", "components", "addition", "magnitude", "direction", "force", "maths", "physics"] },
  { id: "unit-circle", title: "Sine and cosine on the unit circle", sub: "A point turning round the unit circle; its coordinates are cos θ and sin θ, traced as graphs.", keys: ["sine", "cosine", "unit circle", "trigonometry", "radian", "graph", "maths", "periodic"] },
];

// ---------- the mathematics (pure, tested) ----------
export const K = 8.9875517923e9;
/** The electric field (N/C) at (x, y) from point charges [{ x, y, q }] (metres, coulombs). */
export function field(charges, x, y) {
  let ex = 0, ey = 0;
  for (const c of charges) { const dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy; if (r2 < 1e-12) continue; const r = Math.sqrt(r2), s = (K * c.q) / (r2 * r); ex += s * dx; ey += s * dy; }
  return [ex, ey];
}
/** A field line from (x, y), following the field's direction (sign +1) or against it (-1), by RK4 on the unit direction. */
export function fieldLine(charges, x, y, { sign = 1, step = 0.004, max = 1400, stop = () => false } = {}) {
  const pts = [[x, y]];
  const dir = (px, py) => { const [ex, ey] = field(charges, px, py), m = Math.hypot(ex, ey) || 1; return [sign * ex / m, sign * ey / m]; };
  for (let i = 0; i < max; i++) {
    const [k1x, k1y] = dir(x, y), [k2x, k2y] = dir(x + step / 2 * k1x, y + step / 2 * k1y), [k3x, k3y] = dir(x + step / 2 * k2x, y + step / 2 * k2y), [k4x, k4y] = dir(x + step * k3x, y + step * k3y);
    x += (step / 6) * (k1x + 2 * k2x + 2 * k3x + k4x); y += (step / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
    pts.push([x, y]);
    if (stop(x, y)) break;
  }
  return pts;
}
export const wave = (x, t, { A = 1, k = 2 * Math.PI, w = 2 * Math.PI, phi = 0, dir = 1 } = {}) => A * Math.sin(k * x - dir * w * t + phi);
/** Projectile from ground level: speed v (m/s), angle θ (degrees), g (m/s²). */
export function projectile(v, deg, g = 9.81) {
  const th = (deg * Math.PI) / 180, vx = v * Math.cos(th), vy = v * Math.sin(th);
  const T = (2 * vy) / g;
  return { vx, vy, time: T, range: vx * T, height: (vy * vy) / (2 * g), at: (t) => ({ x: vx * t, y: vy * t - 0.5 * g * t * t, vy: vy - g * t }) };
}
/** The resultant of vectors given as [magnitude, angle in degrees]. */
export function resultant(vs) {
  let x = 0, y = 0; for (const [m, d] of vs) { x += m * Math.cos((d * Math.PI) / 180); y += m * Math.sin((d * Math.PI) / 180); }
  return { x, y, magnitude: Math.hypot(x, y), angle: ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360 };
}

// ---------- drawing ----------
const css = (v, d) => (typeof getComputedStyle === "function" ? getComputedStyle(document.documentElement).getPropertyValue(v).trim() || d : d);
const reduced = () => typeof matchMedia === "function" && (matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.aMotion === "reduce");
function canvas(el, h = 420) {
  el.innerHTML = `<canvas class="pv-cv" role="img"></canvas><div class="pv-ctl"></div><div class="pv-out" aria-live="polite"></div><div class="pv-q"></div>`;
  const cv = el.querySelector("canvas"), g = cv.getContext("2d");
  const fit = () => { const w = cv.clientWidth, d = devicePixelRatio || 1; cv.width = w * d; cv.height = h * d; cv.style.height = `${h}px`; g.setTransform(d, 0, 0, d, 0, 0); };
  fit();
  return { cv, g, W: () => cv.clientWidth, H: h, ctl: el.querySelector(".pv-ctl"), out: el.querySelector(".pv-out"), q: el.querySelector(".pv-q"), fit };
}
const slider = (label, k, min, max, val, step = 1, unit = "") => `<label class="pv-s"><span>${label} <b data-v="${k}">${val}${unit}</b></span><input type="range" data-k="${k}" min="${min}" max="${max}" step="${step}" value="${val}" aria-label="${label}"></label>`;
function ask(box, q, options, right, why) {
  const opts = [...options].sort(() => Math.random() - 0.5);
  box.innerHTML = `<p><b>Check yourself:</b> ${q}</p><div class="pv-opts">${opts.map((o) => `<button type="button" class="qz-opt">${o}</button>`).join("")}</div><p class="sub pv-why" hidden>${why}</p>`;
  box.querySelector(".pv-opts").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b || box.querySelector("[disabled]")) return; box.querySelectorAll("button").forEach((x) => { x.disabled = true; if (x.textContent === right) x.classList.add("right"); }); if (b.textContent !== right) b.classList.add("wrong"); box.querySelector(".pv-why").hidden = false; });
}
const fmt = (n, d = 1) => Number(n).toFixed(d);

/** Mount a procedural visual by id in `el`. Returns a function that stops it. */
export function mountProcedural(el, id) {
  const fg = css("--fg", "#fff"), mute = css("--mute", "#999"), line = css("--line-strong", "rgba(255,255,255,.2)");
  if (id === "field-lines") {
    const C = canvas(el); let charges = [{ x: -0.25, y: 0, q: 1e-9 }, { x: 0.25, y: 0, q: -1e-9 }], drag = null;
    C.cv.setAttribute("aria-label", "Electric field lines between point charges");
    C.ctl.innerHTML = `<button type="button" class="tl-mini" data-add="1">+ Positive charge</button><button type="button" class="tl-mini" data-add="-1">+ Negative charge</button><button type="button" class="tl-mini" data-preset="dipole">Dipole</button><button type="button" class="tl-mini" data-preset="like">Two like charges</button><button type="button" class="tl-mini" data-clear>Clear</button><span class="sub">Drag a charge to move it. 1 m across.</span>`;
    const S = () => C.W(), toPx = (x, y) => [S() / 2 + x * S(), C.H / 2 - y * S()], toM = (px, py) => [(px - S() / 2) / S(), (C.H / 2 - py) / S()];
    const draw = () => {
      const g = C.g; g.clearRect(0, 0, S(), C.H);
      const near = (x, y) => charges.some((c) => Math.hypot(x - c.x, y - c.y) < 0.012) || Math.abs(x) > 0.75 || Math.abs(y) > 0.6;
      g.lineWidth = 1.3; g.strokeStyle = "#8b9bff";
      const pos = charges.filter((c) => c.q > 0), src = pos.length ? pos : charges.filter((c) => c.q < 0), sign = pos.length ? 1 : -1;
      for (const c of src) { const n = Math.round(12 * Math.abs(c.q) / 1e-9); for (let i = 0; i < n; i++) {
        const a = (2 * Math.PI * i) / n, pts = fieldLine(charges, c.x + 0.015 * Math.cos(a), c.y + 0.015 * Math.sin(a), { sign, stop: near });
        g.beginPath(); pts.forEach(([x, y], j) => { const [px, py] = toPx(x, y); j ? g.lineTo(px, py) : g.moveTo(px, py); }); g.stroke();
        const m = pts[Math.floor(pts.length / 3)], m2 = pts[Math.floor(pts.length / 3) + 1]; if (m2) { const [ax, ay] = toPx(...m), [bx, by] = toPx(...m2), t = Math.atan2(by - ay, bx - ax) + (sign < 0 ? Math.PI : 0); g.save(); g.translate(ax, ay); g.rotate(t); g.beginPath(); g.moveTo(5, 0); g.lineTo(-4, -4); g.lineTo(-4, 4); g.closePath(); g.fillStyle = "#8b9bff"; g.fill(); g.restore(); }
      } }
      for (const c of charges) { const [px, py] = toPx(c.x, c.y); g.beginPath(); g.arc(px, py, 13, 0, 7); g.fillStyle = c.q > 0 ? "#ff5a4d" : "#3c78d8"; g.fill(); g.fillStyle = "#fff"; g.font = "700 16px system-ui"; g.textAlign = "center"; g.fillText(c.q > 0 ? "+" : "−", px, py + 5.5); }
      const [ex, ey] = field(charges, 0, 0);
      C.out.textContent = `${charges.length} ${charges.length === 1 ? "charge" : "charges"} of 1 nC. Field at the centre: ${(Math.hypot(ex, ey)).toExponential(2)} N/C. Lines start on positive charges and end on negative ones; where they crowd, the field is stronger.`;
    };
    C.ctl.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.add) charges.push({ x: (Math.random() - 0.5) * 0.6, y: (Math.random() - 0.5) * 0.5, q: +b.dataset.add * 1e-9 });
      if (b.dataset.preset === "dipole") charges = [{ x: -0.25, y: 0, q: 1e-9 }, { x: 0.25, y: 0, q: -1e-9 }];
      if (b.dataset.preset === "like") charges = [{ x: -0.25, y: 0, q: 1e-9 }, { x: 0.25, y: 0, q: 1e-9 }];
      if ("clear" in b.dataset) charges = [{ x: 0, y: 0, q: 1e-9 }];
      draw(); });
    C.cv.addEventListener("pointerdown", (e) => { const r = C.cv.getBoundingClientRect(), [mx, my] = toM(e.clientX - r.left, e.clientY - r.top); drag = charges.find((c) => Math.hypot(c.x - mx, c.y - my) < 0.04); if (drag) C.cv.setPointerCapture(e.pointerId); });
    C.cv.addEventListener("pointermove", (e) => { if (!drag) return; const r = C.cv.getBoundingClientRect(); [drag.x, drag.y] = toM(e.clientX - r.left, e.clientY - r.top); draw(); });
    C.cv.addEventListener("pointerup", () => { drag = null; });
    C.cv.style.touchAction = "none";
    draw();
    ask(C.q, "Two charges of +1 nC are 0.5 m apart. What is the field exactly halfway between them?", ["0 N/C", "72 N/C", "144 N/C", "36 N/C"], "0 N/C", `The fields from the two equal charges are equal in size and point in opposite directions there, so they cancel: kq/r² = ${fmt(K * 1e-9 / 0.0625, 0)} N/C from each, in opposite directions.`);
    return () => {};
  }
  if (id === "waves") {
    const C = canvas(el, 360); let t = 0, raf = 0;
    C.cv.setAttribute("aria-label", "Two waves and their sum");
    C.ctl.innerHTML = `${slider("Wave 2 frequency", "f2", 0.5, 3, 1, 0.05, " ×")}${slider("Wave 2 phase", "p2", 0, 360, 0, 15, "°")}${slider("Wave 2 amplitude", "a2", 0, 1, 1, 0.05)}<label class="pv-s"><span>Wave 2 travels</span><select data-k="dir"><option value="1">the same way</option><option value="-1">the opposite way (standing wave)</option></select></label>`;
    const P = () => Object.fromEntries([...C.ctl.querySelectorAll("[data-k]")].map((i) => [i.dataset.k, +i.value]));
    const draw = () => {
      const g = C.g, W = C.W(), H = C.H, p = P(), rows = [[H * 0.18, "#8b9bff", (x) => wave(x, t)], [H * 0.45, "#f055dd", (x) => wave(x, t, { A: p.a2, k: 2 * Math.PI * p.f2, w: 2 * Math.PI * p.f2, phi: (p.p2 * Math.PI) / 180, dir: p.dir })], [H * 0.78, "#1fae8c", null]];
      rows[2][2] = (x) => rows[0][2](x) + rows[1][2](x);
      g.clearRect(0, 0, W, H);
      for (const [y0, col, f] of rows) { g.strokeStyle = line; g.lineWidth = 1; g.beginPath(); g.moveTo(0, y0); g.lineTo(W, y0); g.stroke(); g.strokeStyle = col; g.lineWidth = 2.4; g.beginPath(); for (let px = 0; px <= W; px += 2) { const y = y0 - f((px / W) * 3) * H * 0.08; px ? g.lineTo(px, y) : g.moveTo(px, y); } g.stroke(); }
      g.fillStyle = mute; g.font = "12px system-ui"; g.fillText("Wave 1", 6, rows[0][0] - H * 0.1); g.fillText("Wave 2", 6, rows[1][0] - H * 0.1); g.fillText("Sum (superposition)", 6, rows[2][0] - H * 0.17);
      C.out.textContent = p.dir < 0 && p.f2 === 1 ? "Opposite directions, same frequency: a standing wave. The nodes stay still; the antinodes swing twice as far as either wave." : p.f2 !== 1 && p.dir > 0 ? `Different frequencies: the sum swells and fades. Beat frequency = |f₁ − f₂| = ${fmt(Math.abs(1 - p.f2), 2)} × f₁.` : p.p2 === 180 && p.a2 === 1 ? "Exactly out of phase and equal: destructive interference, the waves cancel everywhere." : p.p2 === 0 && p.a2 === 1 ? "In phase: constructive interference, twice the amplitude." : "The sum is the two waves added point by point.";
      C.ctl.querySelectorAll("[data-v]").forEach((b) => { const k = b.dataset.v; b.textContent = `${C.ctl.querySelector(`[data-k=${k}]`).value}${k === "p2" ? "°" : k === "f2" ? " ×" : ""}`; });
    };
    const loop = () => { t += 1 / 120; draw(); raf = requestAnimationFrame(loop); };
    C.ctl.addEventListener("input", draw);
    if (reduced()) draw(); else loop();
    ask(C.q, "Two identical waves meet exactly 180° out of phase. What is the amplitude of their sum?", ["0", "Twice the amplitude", "The same amplitude", "Half the amplitude"], "0", "Out of phase by half a cycle, every crest meets a trough of the same size: destructive interference.");
    return () => cancelAnimationFrame(raf);
  }
  if (id === "projectile") {
    const C = canvas(el, 380);
    C.cv.setAttribute("aria-label", "A projectile's path");
    C.ctl.innerHTML = `${slider("Launch speed", "v", 5, 40, 20, 1, " m/s")}${slider("Launch angle", "a", 5, 85, 45, 1, "°")}${slider("Gravity", "g", 1.6, 24.8, 9.81, 0.01, " m/s²")}<span class="sub">Earth 9.81 · Moon 1.62 · Jupiter 24.79</span>`;
    const draw = () => {
      const v = +C.ctl.querySelector("[data-k=v]").value, a = +C.ctl.querySelector("[data-k=a]").value, gr = +C.ctl.querySelector("[data-k=g]").value, p = projectile(v, a, gr);
      C.ctl.querySelectorAll("[data-v]").forEach((b) => { const k = b.dataset.v; b.textContent = `${C.ctl.querySelector(`[data-k=${k}]`).value}${{ v: " m/s", a: "°", g: " m/s²" }[k]}`; });
      const g = C.g, W = C.W(), H = C.H, maxX = Math.max(p.range, 10) * 1.1, maxY = Math.max(p.height, 5) * 1.25, sx = (W - 40) / maxX, sy = (H - 40) / maxY, s = Math.min(sx, sy), X = (x) => 20 + x * s, Y = (y) => H - 20 - y * s;
      g.clearRect(0, 0, W, H); g.strokeStyle = line; g.beginPath(); g.moveTo(0, Y(0)); g.lineTo(W, Y(0)); g.stroke();
      g.strokeStyle = "#ffc002"; g.lineWidth = 2.5; g.beginPath(); for (let i = 0; i <= 100; i++) { const q = p.at((p.time * i) / 100); i ? g.lineTo(X(q.x), Y(q.y)) : g.moveTo(X(q.x), Y(q.y)); } g.stroke();
      for (const f of [0.15, 0.5, 0.85]) { const q = p.at(p.time * f), k = 0.25; const arrow = (dx, dy, col) => { g.strokeStyle = col; g.lineWidth = 2; g.beginPath(); g.moveTo(X(q.x), Y(q.y)); g.lineTo(X(q.x) + dx * k * s / 2, Y(q.y) - dy * k * s / 2); g.stroke(); }; arrow(p.vx, 0, "#1fae8c"); arrow(0, q.vy, "#f055dd"); }
      g.fillStyle = mute; g.font = "12px system-ui"; g.fillText("green: horizontal velocity (constant)   pink: vertical velocity (changes by g every second)", 8, 16);
      C.out.innerHTML = `Range <b>${fmt(p.range)} m</b> (v² sin 2θ / g) · maximum height <b>${fmt(p.height)} m</b> (v² sin² θ / 2g) · time of flight <b>${fmt(p.time, 2)} s</b> (2v sin θ / g). No air resistance.`;
      ask(C.q, `At ${v} m/s and ${a}°, with g = ${gr} m/s², what's the range?`, [`${fmt(p.range)} m`, `${fmt(p.range * 2)} m`, `${fmt(p.range / 2)} m`, `${fmt(p.height)} m`].filter((x, i, A) => A.indexOf(x) === i), `${fmt(p.range)} m`, `Range = v² sin 2θ / g = ${v}² × sin ${2 * a}° / ${gr} = ${fmt(p.range)} m.`);
    };
    C.ctl.addEventListener("input", draw); draw();
    return () => {};
  }
  if (id === "vectors") {
    const C = canvas(el, 380);
    C.cv.setAttribute("aria-label", "Two vectors and their resultant");
    C.ctl.innerHTML = `${slider("A: size", "am", 0, 10, 6, 0.5)}${slider("A: angle", "ad", 0, 360, 30, 5, "°")}${slider("B: size", "bm", 0, 10, 4, 0.5)}${slider("B: angle", "bd", 0, 360, 120, 5, "°")}`;
    const draw = () => {
      const val = (k) => +C.ctl.querySelector(`[data-k=${k}]`).value, A = [val("am"), val("ad")], B = [val("bm"), val("bd")], R = resultant([A, B]);
      C.ctl.querySelectorAll("[data-v]").forEach((b) => { const k = b.dataset.v; b.textContent = `${val(k)}${k.endsWith("d") ? "°" : ""}`; });
      const g = C.g, W = C.W(), H = C.H, s = Math.min(W, H) / 26, ox = W / 2, oy = H / 2;
      const arrow = (x0, y0, x1, y1, col, label) => { g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 3; g.beginPath(); g.moveTo(ox + x0 * s, oy - y0 * s); g.lineTo(ox + x1 * s, oy - y1 * s); g.stroke(); const t = Math.atan2(-(y1 - y0), x1 - x0); g.save(); g.translate(ox + x1 * s, oy - y1 * s); g.rotate(t); g.beginPath(); g.moveTo(0, 0); g.lineTo(-11, -5); g.lineTo(-11, 5); g.fill(); g.restore(); g.font = "600 13px system-ui"; g.fillText(label, ox + (x0 + x1) / 2 * s + 6, oy - (y0 + y1) / 2 * s - 6); };
      g.clearRect(0, 0, W, H); g.strokeStyle = line; g.lineWidth = 1; g.beginPath(); g.moveTo(0, oy); g.lineTo(W, oy); g.moveTo(ox, 0); g.lineTo(ox, H); g.stroke();
      const a = resultant([A]); arrow(0, 0, a.x, a.y, "#8b9bff", "A"); arrow(a.x, a.y, R.x, R.y, "#f055dd", "B"); arrow(0, 0, R.x, R.y, "#1fae8c", "A + B");
      C.out.innerHTML = `A + B = (${fmt(R.x, 2)}, ${fmt(R.y, 2)}): size <b>${fmt(R.magnitude, 2)}</b> at <b>${fmt(R.angle)}°</b>. Add the x components, add the y components, then |R| = √(x² + y²) and θ = tan⁻¹(y / x).`;
    };
    C.ctl.addEventListener("input", draw); draw();
    const r = resultant([[3, 0], [4, 90]]);
    ask(C.q, "A 3 N force east and a 4 N force north act together. What is the resultant's size?", ["5 N", "7 N", "1 N", "12 N"], `${fmt(r.magnitude, 0)} N`, "√(3² + 4²) = √25 = 5 N: the forces are at right angles, so Pythagoras gives the size.");
    return () => {};
  }
  if (id === "unit-circle") {
    const C = canvas(el, 340); let th = 0, raf = 0;
    C.cv.setAttribute("aria-label", "A point on the unit circle, with sine and cosine graphs");
    C.ctl.innerHTML = slider("Angle θ", "th", 0, 360, 30, 1, "°");
    const draw = () => {
      const deg = +C.ctl.querySelector("[data-k=th]").value; th = (deg * Math.PI) / 180;
      C.ctl.querySelector("[data-v=th]").textContent = `${deg}°`;
      const g = C.g, W = C.W(), H = C.H, R = Math.min(110, H / 3), cx = R + 30, cy = H / 2, gx = cx + R + 40, gw = W - gx - 10;
      g.clearRect(0, 0, W, H); g.strokeStyle = line; g.lineWidth = 1; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.moveTo(cx - R - 10, cy); g.lineTo(cx + R + 10, cy); g.moveTo(cx, cy - R - 10); g.lineTo(cx, cy + R + 10); g.moveTo(gx, cy); g.lineTo(gx + gw, cy); g.stroke();
      const px = cx + R * Math.cos(th), py = cy - R * Math.sin(th);
      g.strokeStyle = fg; g.lineWidth = 2; g.beginPath(); g.moveTo(cx, cy); g.lineTo(px, py); g.stroke();
      g.strokeStyle = "#1fae8c"; g.beginPath(); g.moveTo(cx, cy); g.lineTo(px, cy); g.stroke(); g.strokeStyle = "#f055dd"; g.beginPath(); g.moveTo(px, cy); g.lineTo(px, py); g.stroke();
      const plot = (f, col) => { g.strokeStyle = col; g.lineWidth = 2; g.beginPath(); for (let i = 0; i <= gw; i += 2) { const a = (i / gw) * 2 * Math.PI, y = cy - f(a) * R; i ? g.lineTo(gx + i, y) : g.moveTo(gx + i, y); } g.stroke(); };
      plot(Math.sin, "#f055dd"); plot(Math.cos, "#1fae8c");
      const mx = gx + (th / (2 * Math.PI)) * gw; g.fillStyle = "#f055dd"; g.beginPath(); g.arc(mx, cy - Math.sin(th) * R, 5, 0, 7); g.fill(); g.fillStyle = "#1fae8c"; g.beginPath(); g.arc(mx, cy - Math.cos(th) * R, 5, 0, 7); g.fill();
      C.out.innerHTML = `θ = ${deg}° = ${fmt(th, 3)} rad · <span style="color:#1fae8c">cos θ = ${fmt(Math.cos(th), 3)}</span> · <span style="color:#f055dd">sin θ = ${fmt(Math.sin(th), 3)}</span> · cos²θ + sin²θ = 1`;
    };
    C.ctl.addEventListener("input", draw); draw();
    ask(C.q, "What is sin 90°?", ["1", "0", "−1", "0.5"], "1", "At 90° the point is at the top of the circle, (0, 1): its y coordinate, sin θ, is 1.");
    return () => cancelAnimationFrame(raf);
  }
  el.innerHTML = `<p class="sub">That visual isn't available.</p>`;
  return () => {};
}
