// Unit 29, Plasma Physics. Every number in a caption or claim is computed here once, from the lesson's own worked
// example. Run: node scripts/diagrams/physics/u29.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));

// u29-03 Debye shielding: the potential of a test charge, bare and screened (distance in Debye lengths)
{ const bare = "1/x", shielded = "exp(-x)/x";
  mk("u29-03", "phys-u29-debye-shielding", "graph", {
    title: "Debye shielding",
    caption: `Mobile electrons and ions crowd round any charge in a plasma and cancel its field beyond a few Debye lengths: φ ∝ e^(−r/λ_D)/r instead of 1/r. At one Debye length the potential is already down to 1/e (${r(Math.exp(-1), 2)}) of the bare Coulomb value; at three, to ${r(Math.exp(-3), 3)}.`,
    alt: "Potential against distance in Debye lengths: the bare Coulomb 1 over r curve and a shielded curve that falls much faster and is nearly zero beyond 3 Debye lengths.",
    description: ["Distance r in units of the Debye length λ_D; potential in units of q/(4πε₀λ_D).", "Bare charge: φ = 1/r.", `Shielded: φ = e^(−r)/r, ${r(Math.exp(-1), 3)} of the bare value at r = λ_D and ${r(Math.exp(-3), 3)} at 3λ_D.`, "So a plasma looks neutral on scales much larger than λ_D: that is one of the conditions for calling a gas a plasma."],
    range: { x: [0, 4], y: [0, 2] }, ticks: [[1, 2, 3, 4], [0.5, 1, 1.5, 2]], height: [320, 300], xLabelBelow: true, axisLabels: ["r / λ_{D}", "potential (relative)"],
    curves: [{ expr: bare, domain: [0.33, 4], colour: "a3", dash: "6 5", label: "bare charge: 1/r", labelAt: [1.6, 0.85] }, { expr: shielded, domain: [0.2, 4], colour: "a1", label: "shielded: e^{−r}/r", labelAt: [1.45, 0.29] }],
    marks: [{ x: 1, to: 1 }],
    checks: [{ type: "point", expr: `(${shielded})/(${bare})`, x: 1, y: r(Math.exp(-1), 8), name: "down to 1/e of the bare value at one Debye length" }, { type: "order", a: bare, b: shielded, x: 2, rel: ">", name: "the shielded potential is always smaller" }],
  }); }
