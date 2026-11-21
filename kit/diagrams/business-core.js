// Business mathematics shared by the business diagram renderers (kit/diagrams/business-renderers.js) and tested in
// tests/business-core.test.mjs: investment appraisal, break-even, elasticity, the critical path of a project network,
// and a small safe evaluator for the relations a diagram claims ("gross_profit = revenue - cost_of_sales").

/** Present value of a cash flow `t` years ahead. */
export const pv = (cash, rate, t) => cash / (1 + rate) ** t;
/** Net present value: flows[0] is at time 0 (usually the negative outlay), flows[t] at the end of year t. */
export const npv = (rate, flows) => flows.reduce((a, c, t) => a + pv(c, rate, t), 0);
/** Payback in years from flows[0] (the outlay) with cash arriving evenly within each year; null if never repaid. */
export function payback(flows) {
  let bal = flows[0];
  for (let t = 1; t < flows.length; t++) {
    if (bal + flows[t] >= 0) return t - 1 + -bal / flows[t];
    bal += flows[t];
  }
  return null;
}
/** Accounting rate of return as the lessons define it: average annual profit (cash less depreciation) over average
 * investment, (initial cost + residual value) ÷ 2. flows[0] is the outlay. */
export const arr = (flows, residual = 0) => {
  const outlay = -flows[0], years = flows.length - 1, total = flows.slice(1).reduce((a, b) => a + b, 0);
  return (total - (outlay - residual)) / years / ((outlay + residual) / 2);
};
/** Break-even output = fixed costs ÷ contribution per unit. */
export const breakEven = (fixed, price, variable) => fixed / (price - variable);
/** Price elasticity of demand by the arc-free percentage method (negative for a normal good). */
export const elasticity = (q0, q1, p0, p1) => ((q1 - q0) / q0) / ((p1 - p0) / p0);
/** Revenue change with an elasticity: > -1 inelastic (revenue rises with price), < -1 elastic. */
export const revenueRises = (e) => e > -1;

/**
 * Critical path analysis of an activity-on-node network. activities: [{id, dur, after: [ids]}].
 * Returns { duration, order, ES, EF, LS, LF, float, critical: [ids on the longest path, in order] }.
 */
export function criticalPath(activities) {
  const by = new Map(activities.map((a) => [a.id, a]));
  const order = [], seen = new Set(), stack = new Set();
  const visit = (id) => {
    if (seen.has(id)) return;
    if (stack.has(id)) throw new Error(`the network has a cycle at ${id}`);
    stack.add(id);
    const a = by.get(id);
    if (!a) throw new Error(`unknown activity ${id}`);
    for (const p of a.after || []) visit(p);
    stack.delete(id); seen.add(id); order.push(id);
  };
  for (const a of activities) visit(a.id);
  const ES = {}, EF = {}, LS = {}, LF = {}, float = {};
  for (const id of order) { const a = by.get(id); ES[id] = Math.max(0, ...(a.after || []).map((p) => EF[p])); EF[id] = ES[id] + a.dur; }
  const duration = Math.max(...Object.values(EF));
  const succ = (id) => activities.filter((x) => (x.after || []).includes(id)).map((x) => x.id);
  for (const id of [...order].reverse()) { const s = succ(id); LF[id] = s.length ? Math.min(...s.map((x) => LS[x])) : duration; LS[id] = LF[id] - by.get(id).dur; float[id] = LS[id] - ES[id]; }
  // the critical activities have no float; walk them from the start
  const crit = order.filter((id) => float[id] === 0);
  const path = [];
  let cur = crit.find((id) => !(by.get(id).after || []).some((p) => float[p] === 0 && EF[p] === ES[id]));
  while (cur) { path.push(cur); cur = crit.find((id) => (by.get(id).after || []).includes(cur) && ES[id] === EF[cur]); }
  return { duration, order, ES, EF, LS, LF, float, critical: path };
}

/** Words → numbers for the evaluator: only names in `vars`, numbers, + - * / ^ and brackets. */
export function evalExpr(expr, vars) {
  const src = String(expr).replace(/\s+/g, "");
  const tokens = src.match(/[A-Za-z_][A-Za-z0-9_]*|\d*\.?\d+|[-+*/()^]/g) || [];
  if (tokens.join("") !== src) throw new Error(`unsupported characters in ${expr}`);
  const js = tokens.map((t, i) => {
    if (/^[A-Za-z_]/.test(t)) { if (!(t in vars)) throw new Error(`unknown name ${t} in ${expr}`); return `(${Number(vars[t])})`; }
    if (t === "^") return "**";
    if (t === "-" && (i === 0 || /^[-+*/^(]$/.test(tokens[i - 1]))) return "-1*";
    return t;
  }).join("");
  return new Function(`return (${js});`)(); // eslint-disable-line no-new-func
}

/** Quadrant of a value: how many cut points it has reached (cuts ascending). */
export const band = (v, cuts) => cuts.filter((c) => v >= c).length;
