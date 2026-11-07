// Circle theorems: drag points round a circle (or move them with the arrow keys) and watch the angles. Each theorem
// is checked live, so the learner sees it holding for every position, not one diagram. Exact geometry on a circle of
// radius 3 centred at the origin.
import { shell, canvas, seg, challenges, panel, describe, handles, C, fmt } from "../lab.js";
import { plane, dot } from "./plot.js";

const R = 3;
export const onCircle = (a) => ({ x: R * Math.cos(a), y: R * Math.sin(a) });
export const angleOf = (p) => Math.atan2(p.y, p.x);
// the angle (degrees) at vertex V between rays to P and Q
export function angleAt(V, P, Q) {
  const a = [P.x - V.x, P.y - V.y], b = [Q.x - V.x, Q.y - V.y];
  return (Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))))) * 180) / Math.PI;
}
// whether X lies on the arc from A to B that doesn't contain C (the "other" arc)
export function sameSide(A, B, X, Y) {
  const s = (P) => Math.sign((B.x - A.x) * (P.y - A.y) - (B.y - A.y) * (P.x - A.x));
  return s(X) === s(Y);
}
const MODES = { centre: "Angle at the centre", segment: "Same segment", semi: "Angle in a semicircle", cyclic: "Cyclic quadrilateral" };

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.82, max: 460 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const say = describe(cv, "A circle with points on it and the angles between them");
  let mode = ["segment", "semi", "cyclic"].includes(ctx.mode) ? ctx.mode : "centre";
  const deg = (d) => (d * Math.PI) / 180;
  const pts = { A: { id: "A", name: "Point A", ...onCircle(deg(200)) }, B: { id: "B", name: "Point B", ...onCircle(deg(-20)) }, C: { id: "C", name: "Point C", ...onCircle(deg(100)) }, D: { id: "D", name: "Point D", ...onCircle(deg(118)) } };
  const seenC = new Set();   // positions C has visited in the semicircle (to the nearest 20°)
  const st = { c40: false, segment: false, semi: false, cyc110: false };
  const ch = challenges(ctrl, ctx, [
    { id: "c40", text: "Angle at the centre: move C until the angle at C is 40°, and check the angle at the centre is 80°", test: (s) => s.c40 },
    { id: "seg", text: "Same segment: move D far along the same arc and see ∠ADB stay equal to ∠ACB", test: (s) => s.segment },
    { id: "semi", text: "Semicircle: move C to three different places: the angle stays 90°", test: (s) => s.semi },
    { id: "cyc", text: "Cyclic quadrilateral: make the angle at A 110°; what is the opposite angle?", test: (s) => s.cyc110 },
  ]);
  seg($(".top"), Object.entries(MODES), mode, (v) => { mode = v; layout(); draw(); });
  const P = () => plane(cv.g, cv.W, cv.H, { x0: -4.6, x1: 4.6, y0: -4.6 * (cv.H / cv.W), y1: 4.6 * (cv.H / cv.W) });
  // points stay on the circle; the arrow keys move them round it (1° a press, 5° with Shift), so exact angles are reachable
  const H = handles(cv, Object.values(pts), {
    toPx: (x, y) => { const p = P(); return [p.X(x), p.Y(y)]; }, toWorld: (px, py) => { const p = P(); return [p.ix(px), p.iy(py)]; },
    step: 1, nudge: (pt, dx, dy, s) => { const a = angleOf(pt) + deg(s) * (dx || dy); const q = onCircle(a); return [q.x, q.y]; },
    onMove: (pt) => { Object.assign(pt, onCircle(angleOf(pt))); if (mode === "semi" && pt.id === "B") Object.assign(pts.A, onCircle(angleOf(pt) + Math.PI)); if (mode === "semi" && pt.id === "A") Object.assign(pts.B, onCircle(angleOf(pt) + Math.PI)); moved = true; draw(); },
  });
  let moved = false;
  function layout() {
    if (mode === "semi") { Object.assign(pts.A, onCircle(Math.PI)); Object.assign(pts.B, onCircle(0)); }
    H.buttons.forEach((b) => { b.hidden = b.dataset.handle === "D" ? !["segment", "cyclic"].includes(mode) : false; });
  }
  function draw() {
    const g = cv.g, W = cv.W, Ht = cv.H, p = P(); g.clearRect(0, 0, W, Ht); g.fillStyle = C.bg; g.fillRect(0, 0, W, Ht);
    const X = (q) => p.X(q.x), Y = (q) => p.Y(q.y), O = { x: 0, y: 0 }, { A, B, C: Cp, D } = pts;
    g.strokeStyle = "rgba(255,255,255,.55)"; g.lineWidth = 2; g.beginPath(); g.arc(p.X(0), p.Y(0), p.X(R) - p.X(0), 0, 2 * Math.PI); g.stroke();
    const line = (a, b, c = "rgba(255,255,255,.7)", w = 1.8) => { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(X(a), Y(a)); g.lineTo(X(b), Y(b)); g.stroke(); };
    // labels sit just outside the circle, kept inside the drawing
    const lab = (q, t, c) => { g.fillStyle = c; g.font = "600 14px Geist, system-ui, sans-serif"; const k = 1.13, lx = Math.min(W - 14, Math.max(4, p.X(q.x * k) - 5)), ly = Math.min(Ht - 6, Math.max(16, p.Y(q.y * k) + 5)); g.fillText(t, lx, ly); };
    let text = "", report = "";
    if (mode === "centre") {
      line(A, Cp, C.teal); line(B, Cp, C.teal); line(A, O, C.amber); line(B, O, C.amber); line(A, B, "rgba(255,255,255,.3)", 1);
      const atC = angleAt(Cp, A, B), atO = sameSide(A, B, Cp, { x: 0, y: 0 }) || Math.abs(atC - 90) < 1e-6 ? angleAt(O, A, B) : 360 - angleAt(O, A, B);
      if (moved && Math.abs(atC - 40) < 1) st.c40 = true;
      text = `∠ACB = ${fmt(atC, 1)}°, ∠AOB = ${fmt(atO, 1)}° (${fmt(atO / atC, 3)} × ∠ACB)`;
      report = `Angle at the circumference ACB is ${fmt(atC, 1)} degrees and the angle at the centre AOB (on the same arc) is ${fmt(atO, 1)} degrees.`;
      dot(g, p.X(0), p.Y(0), C.amber, 4); g.fillStyle = C.amber; g.fillText("O", p.X(0) + 8, p.Y(0) + 16);
    } else if (mode === "segment") {
      line(A, Cp, C.teal); line(B, Cp, C.teal); line(A, D, C.pink); line(B, D, C.pink); line(A, B, "rgba(255,255,255,.4)", 1.2);
      const c = angleAt(Cp, A, B), d = angleAt(D, A, B), same = sameSide(A, B, Cp, D), apart = Math.abs(angleOf(Cp) - angleOf(D)) > deg(45);
      if (moved && same && apart && Math.abs(c - d) < 0.5) st.segment = true;
      text = `∠ACB = ${fmt(c, 1)}°, ∠ADB = ${fmt(d, 1)}° ${same ? "(same segment: equal)" : "(opposite segments: they add to 180°)"}`;
      report = `C and D are ${same ? "in the same segment" : "in opposite segments"}; angle ACB is ${fmt(c, 1)} and angle ADB is ${fmt(d, 1)} degrees.`;
    } else if (mode === "semi") {
      line(A, B, C.amber, 2.2); line(A, Cp, C.teal); line(B, Cp, C.teal);
      const c = angleAt(Cp, A, B); seenC.add(Math.round(angleOf(Cp) / deg(20)));
      if (moved && seenC.size >= 4) st.semi = true;   // the start position plus three more
      text = `AB is a diameter. ∠ACB = ${fmt(c, 2)}° wherever C is.`; report = `AB is a diameter; angle ACB is ${fmt(c, 1)} degrees.`;
      dot(g, p.X(0), p.Y(0), C.amber, 4); lab(O, "O", C.amber);
    } else {
      const order = [A, B, Cp, D].sort((u, v) => angleOf(u) - angleOf(v)); g.strokeStyle = C.teal; g.lineWidth = 2; g.beginPath(); order.forEach((q, i) => (i ? g.lineTo(X(q), Y(q)) : g.moveTo(X(q), Y(q)))); g.closePath(); g.stroke();
      const i = order.indexOf(A), at = (k) => angleAt(order[k % 4], order[(k + 3) % 4], order[(k + 1) % 4]);
      const a = at(i), opp = at(i + 2), b = at(i + 1), d = at(i + 3);
      if (moved && Math.abs(a - 110) < 1) st.cyc110 = true;
      text = `angle at A ${fmt(a, 1)}° + opposite angle ${fmt(opp, 1)}° = ${fmt(a + opp, 1)}°; the other pair: ${fmt(b + d, 1)}°`;
      report = `Cyclic quadrilateral: the angle at A is ${fmt(a, 1)} degrees and the opposite angle is ${fmt(opp, 1)}; each pair of opposite angles adds to 180.`;
    }
    for (const [k, q] of Object.entries(pts)) { if (k === "D" && !["segment", "cyclic"].includes(mode)) continue; dot(g, X(q), Y(q), k === "C" ? C.teal : k === "D" ? C.pink : C.white, 6); lab(q, k, "#fff"); }
    H.place(); ch.check(st); say(text); ctx.report?.(report);
    const why = { centre: "The angle at the centre is twice the angle at the circumference standing on the same arc. Draw the radius OC: it splits the figure into two isosceles triangles, and the exterior angle of each is twice its base angle.", segment: "Angles in the same segment are equal, because each is half of the same angle at the centre. Angles in opposite segments add to 180°.", semi: "A diameter makes a straight angle (180°) at the centre, so the angle at the circumference is half of it: 90°. This is Thales' theorem.", cyclic: "Opposite angles of a quadrilateral inscribed in a circle add to 180°: they stand on the two arcs that together make the whole circle, so their centre angles add to 360°." }[mode];
    out(`<p class="lab-msg"><b>${text}</b></p><p class="lab-msg">${why} Drag the points, or select one and use the arrow keys: 1° a press, 5° with Shift.</p>`);
  }
  cv.onresize = draw;
  layout(); draw();
}
