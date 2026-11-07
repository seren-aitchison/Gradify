// Electric fields and potential from point charges (Coulomb's law, superposed): field lines traced through the
// field, equipotential colouring and a test charge you can place. Charges in a plane, in a vacuum; field lines are
// traced numerically and their density is only roughly proportional to field strength.
import { shell, canvas, seg, clear, text, circle, arrow, challenges, panel, C } from "../lab.js";

export const k = 8.9875e9;
// field (N/C) and potential (V) at (x, y) metres from charges [{ x, y, q (C) }]
export function field(charges, x, y) {
  let Ex = 0, Ey = 0, V = 0;
  for (const c of charges) { const dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy + 1e-12, r = Math.sqrt(r2); Ex += (k * c.q * dx) / (r2 * r); Ey += (k * c.q * dy) / (r2 * r); V += (k * c.q) / r; }
  return { Ex, Ey, E: Math.hypot(Ex, Ey), V };
}

const PRESETS = {
  single: [{ x: 0, y: 0, q: 1 }],
  dipole: [{ x: -0.25, y: 0, q: 1 }, { x: 0.25, y: 0, q: -1 }],
  like: [{ x: -0.25, y: 0, q: 1 }, { x: 0.25, y: 0, q: 1 }],
  plates: [...Array.from({ length: 9 }, (_, i) => ({ x: -0.6 + i * 0.15, y: 0.22, q: 0.4 })), ...Array.from({ length: 9 }, (_, i) => ({ x: -0.6 + i * 0.15, y: -0.22, q: -0.4 }))],
  quad: [{ x: -0.25, y: -0.25, q: 1 }, { x: 0.25, y: 0.25, q: 1 }, { x: -0.25, y: 0.25, q: -1 }, { x: 0.25, y: -0.25, q: -1 }],
};
const NANO = 1e-9;   // charges are in nanocoulombs

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.78, max: 470 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let preset = "dipole", Q = PRESETS.dipole.map((c) => ({ ...c })), probe = { x: 0, y: 0.35 }, drag = null, tool = "move";
  const st = { dipole: false, nul: false, plates: false, added: false };
  const ch = challenges(ctrl, ctx, [
    { id: "dip", text: "Dipole: put the test charge on the line between the charges and see the field point from + to −", test: (s) => s.dipole },
    { id: "nul", text: "Two like charges: find the null point where the field is zero", test: (s) => s.nul },
    { id: "plates", text: "Parallel plates: check the field between them is nearly uniform", test: (s) => s.plates },
    { id: "add", text: "Add your own charges (tap with + or −) and make a pattern of your own", test: (s) => s.added },
  ]);
  seg($(".top"), [["single", "One charge"], ["dipole", "Dipole"], ["like", "Like charges"], ["plates", "Parallel plates"], ["quad", "Quadrupole"]], preset, (v) => { preset = v; Q = PRESETS[v].map((c) => ({ ...c })); probe = { x: 0, y: v === "plates" ? 0 : 0.35 }; draw(); });
  const tools = document.createElement("div"); tools.className = "lab-ctrl"; ctrl.prepend(tools);
  tools.insertAdjacentHTML("beforeend", `<p class="lab-msg">Drag charges or the small test charge. Choose + or − and tap empty space to add a charge; choose Remove and tap a charge to take it away.</p>`);
  seg(tools, [["move", "Move"], ["plus", "+ charge"], ["minus", "− charge"], ["remove", "Remove"]], tool, (v) => { tool = v; });
  const span = 0.8;   // half-width of the view in metres
  const toPx = (x, y) => [cv.W / 2 + (x / span) * (cv.W / 2), cv.H / 2 - (y / span) * (cv.W / 2)];
  const toM = (px, py) => [((px - cv.W / 2) / (cv.W / 2)) * span, (-(py - cv.H / 2) / (cv.W / 2)) * span];
  const F = (x, y) => field(Q.map((c) => ({ ...c, q: c.q * NANO })), x, y);
  cv.cv.style.touchAction = "none";
  cv.cv.addEventListener("pointerdown", (e) => {
    const [px, py] = cv.pos(e), [mx, my] = toM(px, py), near = (o) => Math.hypot(...toPx(o.x, o.y).map((v, i) => v - [px, py][i])) < 14;
    const hit = Q.find(near);
    if (tool === "remove" && hit) { Q.splice(Q.indexOf(hit), 1); draw(); return; }
    if ((tool === "plus" || tool === "minus") && !hit) { Q.push({ x: mx, y: my, q: tool === "plus" ? 1 : -1 }); st.added = Q.length >= 3 || preset === "single"; draw(); return; }
    drag = near(probe) ? probe : hit || null; if (drag) cv.cv.setPointerCapture(e.pointerId);
  });
  cv.cv.addEventListener("pointermove", (e) => { if (!drag) return; const [mx, my] = toM(...cv.pos(e)); drag.x = Math.max(-span, Math.min(span, mx)); drag.y = Math.max(-span, Math.min(span, my)); draw(); });
  cv.cv.addEventListener("pointerup", () => { drag = null; });
  cv.onresize = draw;

  function trace(x, y, dir) {
    const pts = [toPx(x, y)], h = 0.006;
    for (let i = 0; i < 700; i++) {
      const f = F(x, y); if (f.E === 0) break;
      x += dir * h * (f.Ex / f.E); y += dir * h * (f.Ey / f.E);
      if (Math.abs(x) > span * 1.3 || Math.abs(y) > span * 1.3) break;
      if (Q.some((c) => Math.hypot(x - c.x, y - c.y) < 0.02)) { pts.push(toPx(x, y)); break; }
      pts.push(toPx(x, y));
    }
    return pts;
  }
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    // potential as colour: red positive, blue negative
    const img = g.createImageData(Math.ceil(W / 4), Math.ceil(H / 4));
    for (let j = 0; j < img.height; j++) for (let i = 0; i < img.width; i++) {
      // equipotentials spaced on a log scale, so they stay thin where the potential changes slowly
      const [mx, my] = toM(i * 4 + 2, j * 4 + 2), V = F(mx, my).V, s = Math.tanh(V / 150), lv = Math.sign(V) * Math.log1p(Math.abs(V) / 2) * 3, band = Math.abs(lv - Math.round(lv)) < 0.06 && Math.abs(V) > 0.5 ? 0.35 : 0;
      const p = (j * img.width + i) * 4; img.data[p] = 255 * Math.max(0, s) * 0.55 + band * 120; img.data[p + 1] = band * 120 + 12; img.data[p + 2] = 255 * Math.max(0, -s) * 0.6 + band * 120; img.data[p + 3] = 255;
    }
    const off = document.createElement("canvas"); off.width = img.width; off.height = img.height; off.getContext("2d").putImageData(img, 0, 0);
    g.imageSmoothingEnabled = true; g.drawImage(off, 0, 0, W, H);
    // field lines start round each positive charge (or each negative one if there are none)
    const pos = Q.filter((c) => c.q > 0), src = pos.length ? pos : Q.filter((c) => c.q < 0), dir = pos.length ? 1 : -1;
    g.strokeStyle = "rgba(255,255,255,.55)"; g.lineWidth = 1.1;
    for (const c of src) { const n = Math.round(12 * Math.min(2, Math.abs(c.q))); for (let i = 0; i < n; i++) { const a = (i / n) * 2 * Math.PI; const pts = trace(c.x + 0.025 * Math.cos(a), c.y + 0.025 * Math.sin(a), dir); g.beginPath(); pts.forEach(([x, y], j) => (j ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); if (pts.length > 40) { const m = Math.floor(pts.length / 2), [x1, y1] = pts[m], [x2, y2] = pts[m + 1]; arrow(g, x1, y1, x1 + (x2 - x1) * 3 * dir, y1 + (y2 - y1) * 3 * dir, "rgba(255,255,255,.8)", 1, 6); } } }
    for (const c of Q) { const [x, y] = toPx(c.x, c.y); circle(g, x, y, 11, c.q > 0 ? C.red : C.blue, C.white); text(g, c.q > 0 ? "+" : "−", x, y + 5, { align: "center", weight: 700, size: 15 }); }
    // the test charge and the force on it
    const f = F(probe.x, probe.y), [px, py] = toPx(probe.x, probe.y), len = Math.min(70, 12 * Math.log10(1 + f.E / 10));
    if (f.E > 0) arrow(g, px, py, px + (f.Ex / f.E) * len, py - (f.Ey / f.E) * len, C.gold, 2.4, 9);
    circle(g, px, py, 6, C.gold, C.white);
    text(g, "red: positive potential   blue: negative   pale bands: equipotentials", 10, H - 10, { size: 10.5, color: "rgba(255,255,255,.7)" });
    // challenges
    if (preset === "dipole" && Q.length === 2 && Math.abs(probe.y) < 0.03 && Math.abs(probe.x) < 0.22 && f.Ex > 0) st.dipole = true;
    if (preset === "like" && Q.length === 2 && f.E < 25) st.nul = true;
    if (preset === "plates" && Math.abs(probe.y) < 0.15 && Math.abs(probe.x) < 0.3) st.plates = true;
    ch.check(st);
    out(`<div class="lab-read"><div><small>Field at the test charge</small><b>${f.E >= 1e4 ? (f.E / 1000).toFixed(1) + " kN/C" : f.E.toFixed(0) + " N/C"}</b></div><div><small>Direction</small><b>${((Math.atan2(f.Ey, f.Ex) * 180) / Math.PI).toFixed(0)}°</b></div><div><small>Potential</small><b>${f.V.toFixed(0)} V</b></div><div><small>Charges</small><b>${Q.length} × 1 nC</b></div></div>
      <p class="lab-msg">The field is the force per coulomb a small positive test charge would feel: E = kq/r² from each charge, added as vectors. Field lines leave positive charges and end on negative ones, are crowded where the field is strong, and always cross equipotentials at right angles. Between parallel plates the lines are straight and evenly spaced: a uniform field, E = V/d.</p>`);
  }
  draw();
}
