// School 20, Mathematical Modelling and Applied Mathematics: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u20.mjs
import { mk } from "./spec.mjs";

const must = (c, m) => { if (!c) throw new Error(m); };
const n3 = (x) => +x.toPrecision(4);
const ax = ["x", "y"];

// ---------- u20-02 cooling tea: T = 20 + 70 e^(-kt), 60 C at 10 minutes ----------
{
  const k = Math.log(70 / 40) / 10; must(Math.abs(k - 0.056) < 5e-4 && Math.abs(20 + 70 * Math.exp(-k * 10) - 60) < 1e-9, "tea");
  mk("u20-02", "maths-u20-cooling-tea", "graph", "A cooling cup of tea",
    "Newton's law of cooling gives T = 20 + 70e^(−kt): the tea starts at 90 °C and falls toward the 20 °C room. The reading 60 °C at 10 minutes fixes k = ln(70/40)/10 ≈ 0.056 per minute.",
    "A decaying curve starting at 90 degrees Celsius at time 0, passing through 60 degrees at 10 minutes and levelling off towards the dashed room-temperature line at 20 degrees.",
    ["The temperature starts at 90 °C and the room is at 20 °C.", "The curve T = 20 + 70e^(−kt) falls fast at first, then more slowly.", "The measurement 60 °C at 10 minutes gives k = ln(70/40)/10 ≈ 0.056 per minute.", "The curve levels off at the room temperature, 20 °C."],
    { range: { x: [0, 60], y: [0, 100] }, ticks: [[10, 20, 30, 40, 50, 60], [20, 40, 60, 80, 100]], grid: [10, 20], height: [330, 300], axisLabels: ["t (minutes)", "T (°C)"],
      marks: [{ y: 20, label: "room 20 °C" }],
      curves: [{ expr: `20+70*exp(-${k}*x)`, colour: "a1" }],
      points: [{ x: 0, y: 90, label: "90 °C", colour: "a2", dx: 10, dy: -8 }, { x: 10, y: 60, label: "60 °C at 10 min", colour: "a2", dx: 10, dy: -10 }],
      checks: [{ type: "point", expr: `20+70*exp(-${k}*x)`, x: 0, y: 90, name: "T(0) = 20 + 70 = 90 °C" }, { type: "point", expr: `20+70*exp(-${k}*x)`, x: 10, y: 60, name: "T(10) = 60 °C fixes k = ln(70/40)/10" }, { type: "point", expr: `20+70*exp(-${k}*x)`, x: 60, y: 20 + 70 * Math.exp(-k * 60), name: "T(60) is close to the 20 °C room temperature" }],
      fromLesson: ["T(t) = 20 + 70e^{−kt}"] });
}

// ---------- u20-07 perturbation: x^2 + eps x - 1 = 0 ----------
{
  const exact = (e) => (-e + Math.sqrt(e * e + 4)) / 2; must(Math.abs(exact(0.1) - 0.9512) < 1e-4, "perturb");
  mk("u20-07", "maths-u20-perturbation-root", "graph", "The first-order root against the exact root",
    "The positive root of x² + εx − 1 = 0 is x ≈ 1 − ε/2 for small ε. At ε = 0.1 the approximation gives 0.95 and the exact root is 0.9512; the two curves part company only as ε grows.",
    "Two curves of the root against epsilon from 0 to 0.6: the exact root and the straight line 1 minus epsilon over 2, almost touching near epsilon 0 and separating slowly.",
    ["For ε = 0 the root is 1.", "The first-order approximation 1 − ε/2 is a straight line.", "The exact root (−ε + √(ε² + 4))/2 is a curve that leaves the line only slowly.", "At ε = 0.1 the approximation is 0.95 and the exact root is 0.9512."],
    { range: { x: [0, 0.6], y: [0.6, 1.1] }, ticks: [[0.1, 0.2, 0.3, 0.4, 0.5, 0.6], [0.7, 0.8, 0.9, 1]], grid: [0.1, 0.1], height: [330, 300], axisLabels: ["ε", "x"],
      curves: [{ expr: "(-x+sqrt(x^2+4))/2", colour: "a1", label: "exact", labelAt: [0.42, 0.83], anchor: "start" }, { expr: "1-x/2", colour: "a2", dash: "6 4", label: "1 − ε/2", labelAt: [0.42, 0.75], anchor: "start" }],
      points: [{ x: 0.1, y: exact(0.1), label: "exact 0.9512", colour: "a1", dx: 10, dy: -14 }, { x: 0.1, y: 0.95, label: "0.95", colour: "a2", dx: 10, dy: 22 }],
      checks: [{ type: "point", expr: "(-x+sqrt(x^2+4))/2", x: 0.1, y: 0.9512, name: "exact root at ε = 0.1 is 0.9512" }, { type: "point", expr: "1-x/2", x: 0.1, y: 0.95, name: "first-order root at ε = 0.1 is 0.95" }, { type: "point", expr: "x^2+0.1*x-1", x: exact(0.1), y: 0, name: "the exact root satisfies x² + 0.1x − 1 = 0" }],
      fromLesson: ["x ≈ 1 − ε/2"] });
}

// ---------- u20-09 logistic growth rate, r = 0.5, K = 1e9 ----------
{
  mk("u20-09", "maths-u20-logistic-rate", "graph", "Logistic growth rate against population",
    "With r = 0.5 per hour and K = 10⁹, dN/dt = rN(1 − N/K) is a parabola in N. At N = 5 × 10⁸ the rate is 1.25 × 10⁸ cells per hour, its maximum, half-way to K.",
    "A downward parabola of growth rate against population, zero at N = 0 and N = 10 to the 9, with its peak 1.25 at N = 5 (in units of 10 to the 8).",
    ["Measure N in units of 10⁸ cells, so K = 10 and the rate is in units of 10⁸ cells per hour.", "The rate 0.5N(1 − N/10) is zero at N = 0 and N = 10.", "Its maximum is at N = 5, where the rate is 1.25 (× 10⁸ cells per hour)."],
    { range: { x: [0, 10], y: [0, 1.6] }, ticks: [[2, 4, 6, 8, 10], [0.5, 1, 1.5]], grid: [2, 0.5], height: [330, 300], axisLabels: ["N (× 10⁸ cells)", "dN/dt (× 10⁸ per hour)"],
      curves: [{ expr: "0.5*x*(1-x/10)", colour: "a1" }], points: [{ x: 5, y: 1.25, label: "1.25 × 10⁸ per hour", colour: "a2", dx: -8, dy: -12, anchor: "middle" }],
      checks: [{ type: "point", expr: "0.5*x*(1-x/10)", x: 5, y: 1.25, name: "0.5 × 5 × (1 − 0.5) = 1.25" }, { type: "max", expr: "0.5*x*(1-x/10)", domain: [0, 10], x: 5, y: 1.25, name: "the maximum rate is at N = K/2" }],
      fromLesson: ["1.25 × 10^{8} cells per hour"] });
}

// ---------- u20-13 Levins model ----------
{
  mk("u20-13", "maths-u20-levins", "graph", "The Levins metapopulation model",
    "dp/dt = 0.4p(1 − p) − 0.1p is positive for small p and negative beyond p* = 1 − e/c = 0.75, so the occupied fraction settles at three-quarters of the patches.",
    "A downward parabola of the rate of change of the occupied fraction p against p, crossing zero at p = 0 and at the stable equilibrium p = 0.75.",
    ["Set c = 0.4 and e = 0.1.", "The rate of change is positive for 0 < p < 0.75 and negative for p > 0.75.", "It is zero at p* = 1 − e/c = 0.75: three-quarters of the patches are occupied."],
    { range: { x: [0, 1], y: [-0.06, 0.08] }, ticks: [[0.25, 0.5, 0.75, 1], [-0.05, 0.05]], grid: [0.25, 0.05], height: [330, 300], axisLabels: ["p", "dp/dt"],
      curves: [{ expr: "0.4*x*(1-x)-0.1*x", colour: "a1" }], points: [{ x: 0.75, y: 0, label: "p* = 0.75", colour: "a2", dx: -10, dy: -14, anchor: "end" }],
      checks: [{ type: "point", expr: "0.4*x*(1-x)-0.1*x", x: 0.75, y: 0, name: "dp/dt = 0 at p = 0.75" }, { type: "max", expr: "0.4*x*(1-x)-0.1*x", domain: [0, 1], x: 0.375, y: 0.05625, name: "the rate peaks half-way between 0 and p*" }],
      fromLesson: ["p* = 0.75"] });
}

// ---------- u20-15 final size relation ----------
{
  let z = 0.8; for (let i = 0; i < 200; i++) z = 1 - Math.exp(-2 * z); must(Math.abs(z - 0.797) < 5e-4, "final size");
  mk("u20-15", "maths-u20-final-size", "graph", "The final size relation for R₀ = 2",
    "The final fraction infected z solves z = 1 − e^(−R₀z). For R₀ = 2 the curve 1 − e^(−2z) meets the line y = z at z ≈ 0.797: about 80% are infected.",
    "The curve y = 1 − e to the minus 2z and the straight line y = z crossing at z about 0.797.",
    ["Plot y = z (the line) and y = 1 − e^(−2z) (the curve).", "Both are zero at z = 0; the non-zero crossing is the epidemic's final size.", "It is at z ≈ 0.797: 1 − e^(−1.6) = 0.798 is close to 0.8."],
    { range: { x: [0, 1], y: [0, 1] }, ticks: [[0.25, 0.5, 0.75, 1], [0.25, 0.5, 0.75, 1]], grid: [0.25, 0.25], height: [330, 320], axisLabels: ["z", "y"],
      curves: [{ expr: "1-exp(-2*x)", colour: "a1", label: "1 − e^(−2z)", labelAt: [0.1, 0.9], anchor: "start" }, { expr: "x", colour: "a2", dash: "6 4", label: "y = z", labelAt: [0.62, 0.5], anchor: "start" }],
      points: [{ x: z, y: z, label: "z ≈ 0.797", colour: "a4", dx: 8, dy: 22 }],
      checks: [{ type: "intersect", a: "1-exp(-2*x)", b: "x", x: z, y: z, name: "the curve and the line meet at z ≈ 0.797" }, { type: "point", expr: "1-exp(-2*x)", x: 0.8, y: 0.798, name: "1 − e^(−1.6) = 0.798, close to 0.8" }],
      fromLesson: ["z ≈ 0.797"] });
}

// ---------- u20-18 pharmacokinetics ----------
{
  const k = Math.log(2) / 4; must(Math.abs(k - 0.173) < 1e-3 && Math.abs(k * 50 - 8.7) < 0.05, "pk");
  mk("u20-18", "maths-u20-iv-decay", "graph", "Concentration after an IV dose",
    "A 500 mg dose in V = 50 L gives C₀ = 10 mg/L, and the half-life of 4 hours means k = 0.693/4 ≈ 0.173 per hour: the concentration is 5 mg/L at 4 hours and 2.5 mg/L at 8.",
    "A decaying curve of concentration starting at 10 milligrams per litre, passing 5 at 4 hours and 2.5 at 8 hours.",
    ["The dose of 500 mg in V = 50 L gives C₀ = 10 mg/L.", "Each 4 hours the concentration halves: 5 mg/L at 4 h, 2.5 mg/L at 8 h, 1.25 mg/L at 12 h.", "The decay rate is k = 0.693/4 ≈ 0.173 per hour and the clearance is CL = kV ≈ 8.7 L/hour."],
    { range: { x: [0, 16], y: [0, 11] }, ticks: [[4, 8, 12, 16], [2.5, 5, 7.5, 10]], grid: [4, 2.5], height: [330, 300], axisLabels: ["t (hours)", "C (mg/L)"],
      curves: [{ expr: `10*exp(-${k}*x)`, colour: "a1" }],
      points: [{ x: 0, y: 10, label: "10", colour: "a2", dx: 10, dy: -8 }, { x: 4, y: 5, label: "5 (half-life)", colour: "a2", dx: 10, dy: -10 }, { x: 8, y: 2.5, label: "2.5", colour: "a2", dx: 10, dy: -10 }],
      checks: [{ type: "point", expr: `10*exp(-${k}*x)`, x: 0, y: 10, name: "C(0) = 500/50 = 10 mg/L" }, { type: "point", expr: `10*exp(-${k}*x)`, x: 4, y: 5, name: "one half-life of 4 hours halves the concentration" }, { type: "point", expr: `10*exp(-${k}*x)`, x: 8, y: 2.5, name: "two half-lives give a quarter" }],
      fromLesson: ["k = 0.693/4 ≈ 0.173 per hour"] });
}

// ---------- u20-19 Emax model ----------
{
  mk("u20-19", "maths-u20-emax", "graph", "A dose–response curve",
    "E = 100C/(2 + C) rises steeply and then saturates at E_max = 100%. At C = EC₅₀ = 2 mg/L the effect is 50%, and at C = 6 mg/L it is 75%.",
    "A saturating curve of effect against concentration, passing 50 percent at 2 milligrams per litre and 75 percent at 6, levelling towards 100 percent.",
    ["With E_max = 100% and EC₅₀ = 2 mg/L the effect is E = 100C/(2 + C).", "At C = 2 mg/L the effect is half of E_max: 50%.", "At C = 6 mg/L: E = 100 × 6/8 = 75%.", "The curve approaches 100% but never reaches it."],
    { range: { x: [0, 20], y: [0, 105] }, ticks: [[5, 10, 15, 20], [25, 50, 75, 100]], grid: [5, 25], height: [330, 300], axisLabels: ["C (mg/L)", "E (%)"],
      marks: [{ y: 100, label: "E_max" }],
      curves: [{ expr: "100*x/(2+x)", colour: "a1" }],
      points: [{ x: 2, y: 50, label: "EC₅₀: 50%", colour: "a2", dx: 10, dy: 20 }, { x: 6, y: 75, label: "75%", colour: "a2", dx: 10, dy: 20 }],
      checks: [{ type: "point", expr: "100*x/(2+x)", x: 2, y: 50, name: "at C = EC₅₀ the effect is E_max/2" }, { type: "point", expr: "100*x/(2+x)", x: 6, y: 75, name: "100 × 6/8 = 75%" }],
      fromLesson: ["= 100 × 0.75"] });
}

// ---------- u20-20 protein production and degradation ----------
{
  const th = Math.log(2) / 0.1; must(Math.abs(th - 6.9) < 0.05, "systems");
  mk("u20-20", "maths-u20-protein-steady-state", "graph", "A protein approaching its steady state",
    "With production β = 10 nM/min and degradation α = 0.1 per minute, x(t) = 100(1 − e^(−0.1t)) climbs to x* = β/α = 100 nM, reaching half of it after ln 2/α ≈ 6.9 minutes.",
    "A rising curve of protein concentration from 0, passing 50 nanomolar at 6.9 minutes and levelling off at 100 nanomolar.",
    ["Production β = 10 nM/min and degradation α = 0.1 per minute balance at x* = β/α = 100 nM.", "Starting from zero the protein follows x = 100(1 − e^(−0.1t)).", "It is half-way (50 nM) at t = ln 2/α ≈ 6.9 minutes, a time set by the degradation rate."],
    { range: { x: [0, 40], y: [0, 110] }, ticks: [[10, 20, 30, 40], [25, 50, 75, 100]], grid: [10, 25], height: [330, 300], axisLabels: ["t (minutes)", "x (nM)"],
      marks: [{ y: 100, label: "x* = 100 nM" }],
      curves: [{ expr: "100*(1-exp(-0.1*x))", colour: "a1" }],
      points: [{ x: th, y: 50, label: "50 nM at 6.9 min", colour: "a2", dx: 10, dy: 22 }],
      checks: [{ type: "point", expr: "100*(1-exp(-0.1*x))", x: th, y: 50, name: "half of x* is reached at ln 2/α = 6.93 minutes" }, { type: "slope", expr: "100*(1-exp(-0.1*x))", x: 0, value: 10, name: "the initial rate is the production rate β = 10 nM/min" }],
      fromLesson: ["≈ 6.9 minutes"] });
}

// ---------- u20-37 deep-water waves ----------
{
  mk("u20-37", "maths-u20-deep-water-velocities", "graph", "Phase and group velocity of deep-water waves",
    "For ω = √(gk) the phase velocity is √(g/k) and the group velocity is half of it, whatever the wavenumber: the crests overtake the group.",
    "Two falling curves of speed against wavenumber k, the phase velocity above and the group velocity exactly half as high.",
    ["The phase velocity v_p = ω/k = √(g/k) falls as k grows.", "The group velocity v_g = dω/dk = ½√(g/k) is half of it at every k.", "At k = 1 rad/m with g = 9.81 m/s² the phase velocity is 3.13 m/s and the group velocity 1.57 m/s."],
    { range: { x: [0.2, 4], y: [0, 7] }, ticks: [[1, 2, 3, 4], [2, 4, 6]], grid: [1, 2], height: [330, 300], axisLabels: ["k (rad/m)", "v (m/s)"],
      curves: [{ expr: "sqrt(9.81/x)", colour: "a1", label: "v_p", labelAt: [0.5, 4.8], anchor: "start" }, { expr: "0.5*sqrt(9.81/x)", colour: "a2", label: "v_g", labelAt: [0.5, 2.5], anchor: "start" }],
      checks: [{ type: "order", a: "sqrt(9.81/x)", b: "0.5*sqrt(9.81/x)", x: 1, rel: ">", name: "the phase velocity exceeds the group velocity" }, { type: "point", expr: "sqrt(9.81/x)", x: 1, y: 3.132, name: "v_p(1) = √9.81 = 3.13 m/s" }, { type: "slope", expr: "sqrt(9.81*x)", x: 1, value: 9.81 ** 0.5 / 2, name: "dω/dk = ½√(g/k) at k = 1" }],
      fromLesson: ["v_{g} = v_{p}/2"] });
}

// ---------- u20-47 stable spiral ----------
{
  const w = Math.sqrt(3) / 2, X = `exp(-0.5*x)*(cos(${w}*x)+sin(${w}*x)/${Math.sqrt(3)})`;
  mk("u20-47", "maths-u20-stable-spiral", "graph", "Eigenvalues (−1 ± i√3)/2: a decaying oscillation",
    "The Jacobian has trace −1 and determinant 1, so the eigenvalues are (−1 ± i√3)/2: the imaginary part makes x(t) oscillate and the negative real part makes the oscillation die away as e^(−t/2).",
    "The position x against time for the system starting at x = 1: a wave that crosses zero repeatedly and shrinks inside the dashed decay envelope e to the minus t over 2.",
    ["The Jacobian [[0, 1], [−1, −1]] has trace −1 and determinant 1.", "Its eigenvalues (−1 ± i√3)/2 have real part −½ and imaginary part ±√3/2.", "A solution from x(0) = 1, y(0) = 0 is x = e^(−t/2)(cos(√3t/2) + sin(√3t/2)/√3).", "It oscillates (imaginary part) and decays (negative real part): a stable spiral."],
    { range: { x: [0, 12], y: [-1.1, 1.2] }, ticks: [[2, 4, 6, 8, 10, 12], [-1, -0.5, 0.5, 1]], grid: [2, 0.5], height: [330, 300], axisLabels: ["t", "x"],
      curves: [{ expr: "exp(-0.5*x)", colour: "a4", dash: "6 4" }, { expr: "-exp(-0.5*x)", colour: "a4", dash: "6 4" }, { expr: X, colour: "a1" }],
      points: [{ x: 0, y: 1, label: "x(0) = 1", colour: "a2", dx: 14, dy: -12 }],
      checks: [{ type: "point", expr: X, x: 0, y: 1, name: "x(0) = 1" }, { type: "slope", expr: X, x: 0, value: 0, name: "x′(0) = y(0) = 0" }, { type: "point", expr: "exp(-0.5*x)", x: 2, y: Math.exp(-1), name: "the envelope decays at the real part −½: e^(−1) at t = 2" }],
      fromLesson: ["Eigenvalues (−1 ± i√3)/2"] });
}

// ---------- u20-48 sensitive dependence ----------
{
  const t = 2 * Math.log(1000); must(Math.abs(t - 13.8) < 0.05, "chaos");
  mk("u20-48", "maths-u20-error-growth", "graph", "A small error grows to O(1)",
    "With λ = 0.5 per day the difference 0.001e^(0.5t) grows by a factor e every 2 days and reaches 1 at t = 2 ln 1000 ≈ 13.8 days: an error of one part in a thousand ruins a forecast in two weeks.",
    "An exponential curve of the difference between two weather states, starting at 0.001 and climbing through 1 at 13.8 days.",
    ["The separation starts at 0.001 and grows as 0.001e^(0.5t).", "It is still tiny for the first week, then climbs sharply.", "It reaches 1 when e^(0.5t) = 1000, at t = 2 ln 1000 ≈ 13.8 days."],
    { range: { x: [0, 16], y: [0, 2.5] }, ticks: [[4, 8, 12, 16], [0.5, 1, 1.5, 2, 2.5]], grid: [4, 0.5], height: [330, 300], axisLabels: ["t (days)", "difference"],
      curves: [{ expr: "0.001*exp(0.5*x)", colour: "a1" }], marks: [{ y: 1, label: "difference 1" }],
      points: [{ x: t, y: 1, label: "13.8 days", colour: "a2", dx: -10, dy: 22, anchor: "end" }],
      checks: [{ type: "point", expr: "0.001*exp(0.5*x)", x: t, y: 1, name: "0.001e^(0.5 × 13.8) = 1" }, { type: "point", expr: "0.001*exp(0.5*x)", x: 0, y: 0.001, name: "the starting difference is 0.001" }],
      fromLesson: ["t = 2 ln 1000 ≈ 13.8 days"] });
}

// ---------- u20-51 stock and flow ----------
{
  mk("u20-51", "maths-u20-bath-stock", "graph", "A stock rising at the net flow",
    "The net flow is 10 − 6 = 4 L/min, so the stock rises along a straight line of gradient 4: from 100 L to 140 L in 10 minutes.",
    "A straight rising line of bath volume against time, from 100 litres at 0 minutes to 140 litres at 10 minutes.",
    ["The inflow is 10 L/min and the outflow 6 L/min, so the net flow is 4 L/min.", "dS/dt = 4 is constant, so S is a straight line with gradient 4.", "After 10 minutes the bath holds 100 + 4 × 10 = 140 L."],
    { range: { x: [0, 12], y: [90, 150] }, ticks: [[2, 4, 6, 8, 10, 12], [100, 120, 140]], grid: [2, 20], height: [330, 300], axisLabels: ["t (minutes)", "S (litres)"],
      curves: [{ expr: "100+4*x", colour: "a1" }], points: [{ x: 0, y: 100, label: "100 L", colour: "a2", dx: 10, dy: -8 }, { x: 10, y: 140, label: "140 L", colour: "a2", dx: -10, dy: -10, anchor: "end" }],
      checks: [{ type: "slope", expr: "100+4*x", x: 5, value: 4, name: "the gradient is the net flow 10 − 6 = 4 L/min" }, { type: "point", expr: "100+4*x", x: 10, y: 140, name: "after 10 minutes the bath holds 140 L" }],
      fromLesson: ["after 10 minutes the bath holds 140 L"] });
}

// ---------- u20-45 hydrogen n = 2 to n = 1 ----------
{
  const E = (n) => -13.6 / (n * n); must(Math.abs(E(2) - E(1) - 10.2) < 1e-9, "hydrogen");
  mk("u20-45", "maths-u20-hydrogen-levels", "graph", "The hydrogen transition n = 2 → n = 1",
    "E_n = −13.6/n² eV gives E₁ = −13.6 eV and E₂ = −3.4 eV. The photon carries the difference, −3.4 − (−13.6) = 10.2 eV.",
    "Two horizontal energy levels, n = 1 at minus 13.6 electron volts and n = 2 at minus 3.4, joined by a downward arrow marked 10.2 electron volts.",
    ["E_n = −13.6/n² eV: E₁ = −13.6 eV and E₂ = −13.6/4 = −3.4 eV.", "The electron falls from n = 2 to n = 1.", "The photon takes the difference: ΔE = −3.4 − (−13.6) = 10.2 eV."],
    { range: { x: [0, 4], y: [-16, 2] }, ticks: [[], [-12, -8, -4, 0]], grid: [1, 4], height: [330, 300], axisLabels: ["", "E (eV)"],
      series: [{ points: [[0.6, -13.6], [3.4, -13.6]], colour: "a1", label: "n = 1: −13.6 eV", labelAt: [0.6, -14.8], anchor: "start" }, { points: [[0.6, -3.4], [3.4, -3.4]], colour: "a1", label: "n = 2: −3.4 eV", labelAt: [0.6, -2.2], anchor: "start" }],
      arrows: [{ from: [2.4, -3.4], to: [2.4, -13.6], colour: "a2", label: "10.2 eV photon", labelAt: [2.55, -8.5], anchor: "start" }],
      checks: [{ type: "point", expr: "-13.6/1", x: 0, y: -13.6, name: "E₁ = −13.6 eV" }, { type: "point", expr: "-13.6/4", x: 0, y: -3.4, name: "E₂ = −13.6/4 = −3.4 eV" }, { type: "point", expr: "-13.6/4+13.6", x: 0, y: 10.2, name: "ΔE = 10.2 eV" }],
      fromLesson: ["ΔE = −3.4 − (−13.6) = 10.2 eV"] });
}

// ---------- u20-14 herd immunity threshold ----------
{
  const th = 1 - 1 / 15, cov = th / 0.97; must(Math.abs(th - 0.933) < 5e-4 && Math.abs(cov - 0.962) < 5e-4, "herd");
  mk("u20-14", "maths-u20-herd-threshold", "number-line", "Measles: the threshold and the coverage needed",
    "With R₀ = 15 the immune fraction must reach 1 − 1/15 ≈ 0.933. A vaccine that is 97% effective needs coverage 0.933/0.97 ≈ 0.962 to get there.",
    "A number line from 0.9 to 1 with two marked points: 0.933, the herd immunity threshold, and 0.962, the vaccine coverage needed.",
    ["R₀ = 15, so the herd immunity threshold is 1 − 1/15 ≈ 0.933.", "A 97%-effective vaccine protects 0.97 of those covered.", "Coverage 0.933/0.97 ≈ 0.962 is needed: higher than the threshold itself."],
    { range: [0.9, 1], ticks: { step: 0.02 }, points: [{ value: th, expr: "14/15", label: "threshold 0.933" }, { value: cov, expr: "(14/15)/0.97", label: "coverage 0.962", below: true }],
      checks: [{ type: "value", expr: "1-1/15", value: th, name: "threshold 1 − 1/15 = 0.933" }, { type: "value", expr: "(14/15)/0.97", value: cov, name: "coverage 0.933/0.97 = 0.962" }],
      fromLesson: ["Threshold = 1 − 1/15 ≈ 0.933"] });
}
