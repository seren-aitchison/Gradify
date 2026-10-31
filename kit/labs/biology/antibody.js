// Antibody–antigen binding: specificity (each antibody's binding site fits one epitope shape) and affinity
// (the dissociation constant Kd). Fraction of antibody bound = [Ag] / (Kd + [Ag]), the simple one-site
// binding model (ligand in excess). Includes affinity maturation, where the Kd of the best antibodies falls
// over successive rounds of selection in germinal centres. Shapes are schematic, not real structures.
import { shell, canvas, slider, button, axes, line, clear, circle, text, challenges, panel, C } from "../lab.js";

export const bound = (Ag, Kd) => Ag / (Kd + Ag);
const SHAPES = ["triangle", "square", "circle", "notch"];
function drawShape(g, kind, x, y, r, col, inset = false) {
  g.fillStyle = col; g.strokeStyle = col; g.beginPath();
  if (kind === "triangle") { g.moveTo(x, y - r); g.lineTo(x + r, y + r * 0.8); g.lineTo(x - r, y + r * 0.8); g.closePath(); }
  else if (kind === "square") g.rect(x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.6);
  else if (kind === "circle") g.arc(x, y, r, 0, Math.PI * 2);
  else { g.moveTo(x - r, y - r); g.lineTo(x + r, y - r); g.lineTo(x + r, y + r); g.lineTo(x + r * 0.3, y + r); g.lineTo(x + r * 0.3, y); g.lineTo(x - r * 0.3, y); g.lineTo(x - r * 0.3, y + r); g.lineTo(x - r, y + r); g.closePath(); }
  inset ? g.stroke() : g.fill();
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.42, max: 240 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.5, max: 280 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let epitope = SHAPES[Math.floor(Math.random() * 4)], pick = null, Kd = 100, Ag = 50, round = 0;
  const st = { match: false, kd: false, mature: false };
  const ch = challenges(ctrl, ctx, [
    { id: "match", text: "Pick the antibody whose binding site matches the antigen's epitope", test: (x) => x.match },
    { id: "kd", text: "Find the antigen concentration where half the antibody is bound", test: (x) => x.kd },
    { id: "mat", text: "Run affinity maturation until Kd is below 1 nM", test: (x) => x.mature },
  ]);
  const chips = document.createElement("div"); chips.className = "lab-chips"; ctrl.append(chips);
  chips.innerHTML = `<span class="lab-msg">Choose an antibody:</span>${SHAPES.map((s) => `<button type="button" data-s="${s}">${s}</button>`).join("")}`;
  chips.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; pick = b.dataset.s; chips.querySelectorAll("button").forEach((x) => x.classList.remove("ok", "no")); b.classList.add(pick === epitope ? "ok" : "no"); if (pick === epitope) st.match = true; ch.check(st); draw(); });
  slider(ctrl, { label: "[antigen]", min: 0.1, max: 1000, step: 0.1, value: Ag, unit: "nM", fmt: (v) => v.toFixed(1), onInput: (v) => { Ag = v; draw(); } });
  button(ctrl, "Next round of affinity maturation", () => { round++; Kd = Math.max(0.05, Kd * (0.25 + Math.random() * 0.3)); if (Kd < 1) st.mature = true; ch.check(st); draw(); });
  button(ctrl, "New antigen", () => { epitope = SHAPES[Math.floor(Math.random() * 4)]; pick = null; Kd = 100; round = 0; chips.querySelectorAll("button").forEach((x) => x.classList.remove("ok", "no")); draw(); });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    // antigen with epitopes on the left; antibody (Y) on the right
    circle(g, W * 0.22, H * 0.5, H * 0.3, "rgba(255,107,107,.18)", C.red); text(g, "antigen", W * 0.22, H * 0.92, { align: "center", size: 11, color: C.mute });
    drawShape(g, epitope, W * 0.22 + H * 0.3, H * 0.5, 9, C.red);
    const ax = W * 0.66, ay = H * 0.55;
    g.strokeStyle = C.blue; g.lineWidth = 8; g.lineCap = "round"; g.beginPath(); g.moveTo(ax + 60, ay); g.lineTo(ax, ay); g.moveTo(ax, ay); g.lineTo(ax - 34, ay - 30); g.moveTo(ax, ay); g.lineTo(ax - 34, ay + 30); g.stroke();
    if (pick) { drawShape(g, pick, ax - 44, ay - 34, 9, "#ffffff", true); drawShape(g, pick, ax - 44, ay + 34, 9, "#ffffff", true); }
    text(g, "antibody: two identical antigen-binding sites (variable regions)", W * 0.66, H * 0.94, { align: "center", size: 11, color: C.mute });
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const A = axes(g2, { l: 52, t: 12, w: W2 - 66, h: H2 - 46 }, { x0: 0, x1: 1000, y0: 0, y1: 1, xl: "[antigen] (nM)", yl: "fraction bound", xt: 5, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(2) });
    const match = pick === epitope, kd = match ? Kd : 1e5;
    line(g2, Array.from({ length: 300 }, (_, i) => { const a = (i / 299) * 1000; return [A.X(a), A.Y(bound(a, kd))]; }), match ? C.green : C.mute, 2.2);
    if (match) { line(g2, [[A.X(Kd), A.Y(0)], [A.X(Kd), A.Y(0.5)], [A.X(0), A.Y(0.5)]], "rgba(255,255,255,.3)", 1, [4, 3]); circle(g2, A.X(Ag), A.Y(bound(Ag, Kd)), 5, C.white); }
    if (match && Math.abs(bound(Ag, Kd) - 0.5) < 0.03) st.kd = true; ch.check(st);
    out(`<div class="lab-read"><div><small>Epitope</small><b>${epitope}</b></div><div><small>K<sub>d</sub></small><b>${match ? `${Kd < 1 ? Kd.toFixed(2) : Kd.toFixed(0)} nM` : "no binding"}</b></div><div><small>Bound at this [Ag]</small><b>${match ? `${(bound(Ag, Kd) * 100).toFixed(0)}%` : "0%"}</b></div><div><small>Maturation rounds</small><b>${round}</b></div></div>
      <p class="lab-msg">${match ? "Kd is the antigen concentration that fills half the binding sites: the lower the Kd, the higher the affinity. Repeated rounds of mutation in B cells and selection for the best binders (affinity maturation) lower the Kd of antibodies made later in an immune response." : "The binding site doesn't complement this epitope, so there's no specific binding: each B cell clone makes antibody to one epitope."}</p>`);
  }
  draw();
}
