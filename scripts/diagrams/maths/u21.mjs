// School 21, Financial Mathematics and Economics: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u21.mjs
import { mk } from "./spec.mjs";

const must = (c, m) => { if (!c) throw new Error(m); };
const close = (a, b, t = 0.01) => Math.abs(a - b) <= t;
const r2 = (x) => +x.toFixed(2);
const gbp = (x) => `£${x.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const g0 = (x) => `£${Math.round(x).toLocaleString("en-GB")}`;
const T = (a, b) => [[...a], [...b]];
const G = (range, ticks, body) => ({ range, ticks, grid: [ticks[0].length > 1 ? Math.abs(ticks[0][1] - ticks[0][0]) : 1, ticks[1].length > 1 ? Math.abs(ticks[1][1] - ticks[1][0]) : 1], height: [380, 340], ...body });
const pt = (expr, x, y, name) => ({ type: "point", expr, x, y, name });
const sl = (expr, x, value, name) => ({ type: "slope", expr, x, value, name });
const P = (x) => +x.toPrecision(12);
const E = Math.E;

// ---------- u21-02 Simple interest ----------
{
  const A = (t) => 5000 * (1 + 0.06 * t), f = "5000*(1+0.06*x)";
  must(close(A(0.75), 5225), "simple");
  mk("u21-02", "maths-u21-simple-interest-line", "graph", "Simple interest grows in a straight line",
    "£5,000 at 6% simple interest earns the same £300 every year, so the total is a straight line. After 9 months (0.75 years) the interest is £225 and £5,225 is repaid.",
    "A straight line from £5,000 at time 0 rising by £300 a year, with the point (0.75, £5,225) marked.",
    ["Interest is 5000 × 0.06 = £300 for every full year.", "After t years the amount is 5000 + 300t, a straight line.", "At t = 0.75 years (9 months) the amount is £5,225, of which £225 is interest."],
    G({ x: [0, 1], y: [4900, 5400] }, T([0.25, 0.5, 0.75, 1], [5000, 5100, 5200, 5300, 5400]), { axisLabels: ["years", "amount £"], curves: [{ expr: f, colour: "a1" }], marks: [{ x: 0.75, to: 5225 }, { y: 5000, label: "£5,000" }],
      points: [{ x: 0.75, y: 5225, label: "£5,225", colour: "a2", dx: -12, dy: -14, anchor: "end" }], checks: [pt(f, 0.75, 5225, "after 0.75 years the total is £5,225"), sl(f, 0.5, 300, "the line rises £300 a year"), pt(f, 0.75, 5000 + 225, "the interest 5000 × 0.06 × 0.75 is £225")], fromLesson: ["£5225"] }));
}

// ---------- u21-03 Compound interest ----------
{
  const f = "1000*1.05^x", A10 = 1000 * 1.05 ** 10, dbl = Math.log(2) / Math.log(1.05);
  must(close(A10, 1628.89) && close(dbl, 14.2, 0.05), "compound");
  mk("u21-03", "maths-u21-compound-doubling", "graph", "£1,000 at 5% compounded annually",
    `The balance reaches ${gbp(A10)} after 10 years. It doubles to £2,000 at ln 2/ln 1.05 ≈ ${dbl.toFixed(1)} years; the rule of 72 says 72/5 = 14.4 years, close but a little high.`,
    "An upward-curving exponential from £1,000, with points at 10 years (£1,628.89) and where it reaches £2,000 near 14.2 years.",
    ["Each year multiplies the balance by 1.05, so after t years it is 1000 × 1.05^t.", "At t = 10 the balance is about £1,628.89.", "The balance hits £2,000 at ln 2/ln 1.05 ≈ 14.2 years; the rule of 72 estimates 14.4."],
    G({ x: [0, 20], y: [0, 2800] }, T([5, 10, 15, 20], [500, 1000, 1500, 2000, 2500]), { axisLabels: ["years", "balance £"], curves: [{ expr: f, colour: "a1" }], marks: [{ x: 14.4, label: "rule of 72: 14.4", dx: 52 }, { y: 2000 }],
      points: [{ x: 10, y: A10, label: "£1,628.89", colour: "a2", dx: 10, dy: 22 }, { x: dbl, y: 2000, label: "doubles: 14.2 y", colour: "a4", dx: -14, dy: -12, anchor: "end" }],
      checks: [pt(f, 10, A10, "after 10 years the balance is £1,628.89"), pt(f, dbl, 2000, "the balance reaches £2,000 at ln 2/ln 1.05 ≈ 14.2 years"), pt("72/5", 0, 14.4, "the rule of 72 gives 72/5 = 14.4 years")], fromLesson: ["1628.89"] }));
}

// ---------- u21-04 Time value of money ----------
{
  const a = 1000 * 1.05, b = 2000 / 1.05, tot = a + b;
  must(close(tot, 2954.76), "tvm");
  mk("u21-04", "maths-u21-single-payment", "bar-model", "Two debts replaced by one payment at year 1",
    "At time 1, £1,000 due now has grown to £1,050, and £2,000 due at time 2 is worth £1,904.76 one year earlier. Moving every amount to the same date lets them be added: £2,954.76.",
    "One bar split into £1,050 (the debt due now, accumulated) and £1,904.76 (the debt due at year 2, discounted), with a bracket over both for £2,954.76.",
    ["Choose time 1 as the comparison date.", "The £1,000 due now accumulates one year: 1000 × 1.05 = £1,050.", "The £2,000 due at year 2 is discounted one year: 2000/1.05 = £1,904.76.", "Add the two values at the same date: £2,954.76."],
    { prefix: "£", bars: [{ label: "value at year 1", parts: [{ value: r2(a), text: "£1,050 (now)" }, { value: r2(b), text: "£1,904.76 (year 2)" }] }], braces: [{ bar: 0, from: 0, to: 1, value: r2(tot), text: "£2,954.76" }],
      checks: [{ type: "percent", of: 1000, percent: 105, value: 1050, name: "£1,000 grown at 5% for one year is £1,050" }, { type: "percent", of: "2000/1.05", percent: 105, value: 2000, name: "£1,904.76 grown a year is the £2,000 due at year 2" }], fromLesson: ["2954.76"] });
}

// ---------- u21-05 Present value: perpetuities ----------
{
  const L = "100*(1-1.05^(0-x))/0.05", Gw = "100/0.03*(1-(1.02/1.05)^x)";
  must(close(100 / 0.05, 2000) && close(100 / 0.03, 3333.33), "pv");
  mk("u21-05", "maths-u21-perpetuity-pv", "graph", "Adding up the present values of ever more payments",
    "Each payment is worth a little less than the one before, so the running total of present values levels off. Level £100 a year at 5% approaches £2,000; payments growing at 2% approach £3,333.33.",
    "Two rising curves over 100 years, each flattening: the level payments towards £2,000 and the growing payments towards £3,333.33.",
    ["The present value of n payments of £100 at 5% is 100 × (1 − 1.05^−n)/0.05.", "As n grows this approaches 100/0.05 = £2,000.", "With 2% growth the limit is 100/(0.05 − 0.02) = £3,333.33."],
    G({ x: [0, 100], y: [0, 3800] }, T([20, 40, 60, 80, 100], [1000, 2000, 3000]), { axisLabels: ["payments n", "present value £"], curves: [{ expr: L, colour: "a1", label: "level", labelAt: [55, 1620] }, { expr: Gw, colour: "a2", label: "growing 2%", labelAt: [55, 3000] }], marks: [{ y: 2000 }, { y: 3333.33 }],
      points: [{ x: 100, y: 2000 * (1 - 1.05 ** -100), label: "→ £2,000", colour: "a1", dx: -8, dy: 18, anchor: "end" }, { x: 100, y: 100 / 0.03 * (1 - (1.02 / 1.05) ** 100), label: "→ £3,333.33", colour: "a2", dx: -8, dy: -12, anchor: "end" }],
      checks: [pt(L, 2000, 2000, "level perpetuity: the running total tends to 100/0.05 = £2,000"), pt(Gw, 2000, 100 / 0.03, "growing perpetuity: the total tends to 100/(0.05 − 0.02) = £3,333.33"), pt(L, 1, 100 / 1.05, "the first payment is worth 100/1.05")], fromLesson: ["3333.33"] }));
}

// ---------- u21-06 Future value ----------
{
  const f = "200*(1.005^x-1)/0.005", FV = 200 * (1.005 ** 60 - 1) / 0.005;
  must(close(FV, 13954, 1), "fv");
  mk("u21-06", "maths-u21-savings-fv", "graph", "Saving £200 a month for 5 years",
    `The pot grows faster as interest earns interest: after 60 monthly deposits at 0.5% a month it holds about ${g0(FV)}, of which £12,000 is deposits.`,
    `A curve rising from zero over 60 months, steepening, to about ${g0(FV)}.`,
    ["Each month's £200 earns 0.5% a month from the date it is paid.", "After n months the pot is 200 × (1.005^n − 1)/0.005.", "At n = 60 it is about £13,954; the other £1,954 is interest."],
    G({ x: [0, 60], y: [0, 15000] }, T([12, 24, 36, 48, 60], [3000, 6000, 9000, 12000, 15000]), { axisLabels: ["months", "pot £"], curves: [{ expr: f, colour: "a1" }, { expr: "200*x", colour: "a3", dash: "6 4", label: "deposits only", labelAt: [34, 5400] }],
      points: [{ x: 60, y: FV, label: g0(FV), colour: "a2", dx: -8, dy: -12, anchor: "end" }], checks: [pt(f, 60, FV, "after 60 months the pot is about £13,954"), pt("200*x", 60, 12000, "deposits alone total £12,000")], fromLesson: ["13,954"] }));
}

// ---------- u21-07 Annuities ----------
{
  const pv = Array.from({ length: 10 }, (_, i) => 1000 * 1.05 ** -(i + 1)), tot = pv.reduce((a, b) => a + b, 0);
  must(close(tot, 7722, 1) && close(tot, 1000 * (1 - 1.05 ** -10) / 0.05, 1e-6), "annuity");
  mk("u21-07", "maths-u21-annuity-bars", "barchart", "The present value of ten £1,000 payments",
    `Each payment is worth 1000 × 1.05^−t today, so later payments count for less: £952 for the first down to £614 for the tenth. The ten bars add up to about £7,722.`,
    "Ten bars falling from about 952 to 614, one for the present value of each year-end payment.",
    ["The payment at the end of year t is worth 1000 × 1.05^−t now.", "These fall from £952 in year 1 to £614 in year 10.", "Adding all ten gives 1000 × a₁₀ ≈ £7,722."],
    { categories: pv.map((_, i) => i + 1), values: pv, range: { y: [0, 1000] }, ticks: [200, 400, 600, 800, 1000], grid: [1, 200], axisLabels: ["year paid", "present value £"], highlight: [0, 9],
      checks: [{ type: "total", value: tot, name: "the ten present values add to 1000 × a₁₀ ≈ £7,722" }], fromLesson: ["7,722"] });
}

// ---------- u21-08 Loan amortisation ----------
{
  const i = 0.01, Pm = 10000 * i / (1 - 1.01 ** -12), B = (k) => 10000 * 1.01 ** k - Pm * (1.01 ** k - 1) / i;
  must(close(Pm, 888.49) && close(B(1), 9211.51), "loan");
  const f = `10000*1.01^x-${P(Pm)}*(1.01^x-1)/0.01`;
  mk("u21-08", "maths-u21-loan-balance", "graph", "A £10,000 loan repaid by twelve payments",
    "Each month 1% interest is added and £888.49 is paid. In month 1 the interest is £100, so £788.49 reduces the debt to £9,211.51; the interest share falls and the balance reaches exactly zero at month 12.",
    "The loan balance falling from £10,000 at month 0 to £9,211.51 at month 1 and £0 at month 12, steepening as interest shrinks.",
    ["Payment P = 10,000 × 0.01/(1 − 1.01^−12) ≈ £888.49.", "Month 1: interest £100, so £788.49 of the payment repays capital.", "The balance after k months is 10,000 × 1.01^k minus the accumulated payments.", "After 12 payments it is zero."],
    G({ x: [0, 12], y: [0, 11000] }, T([2, 4, 6, 8, 10, 12], [2000, 4000, 6000, 8000, 10000]), { xLabelBelow: true, axisLabels: ["months", "balance £"], curves: [{ expr: f, colour: "a1" }],
      points: [{ x: 0, y: 10000, label: "£10,000", colour: "a2", dx: 14, dy: -14 }, { x: 1, y: B(1), label: "£9,211.51", colour: "a2", dx: 16, dy: 34 }, { x: 12, y: 0, label: "£0", colour: "a4", dx: -10, dy: -12, anchor: "end" }],
      checks: [pt(f, 1, B(1), "after month 1 the balance is £9,211.51"), pt(f, 12, 0, "after 12 payments the balance is zero"), pt(`10000*0.01/(1-1.01^(0-12))`, 0, Pm, "the payment is £888.49")], fromLesson: ["£888.49"] }));
}

// ---------- u21-09 Mortgage ----------
{
  const j = 0.005, Pm = 150000 * j / (1 - 1.005 ** -300), B = (y) => 150000 * 1.005 ** (12 * y) - Pm * (1.005 ** (12 * y) - 1) / j;
  must(close(Pm, 966.45), "mortgage");
  const f = `150000*1.005^(12*x)-${P(Pm)}*(1.005^(12*x)-1)/0.005`;
  mk("u21-09", "maths-u21-mortgage-balance", "graph", "A £150,000 mortgage over 25 years",
    `The payment is ${gbp(Pm)} a month. Early on most goes to interest, so the balance falls slowly at first and fastest at the end; at year 12.5 more than half is still owed (${g0(B(12.5))}).`,
    "The mortgage balance curving down from £150,000 to zero over 25 years, flat at the start and steep at the end.",
    ["The monthly rate is j = 6%/12 = 0.5%, with 12 × 25 = 300 payments.", "P = 150,000 × 0.005/(1 − 1.005^−300) ≈ £966.45.", "Interest takes most of early payments, so the balance falls slowly then faster.", "The balance reaches zero at year 25."],
    G({ x: [0, 25], y: [0, 160000] }, T([5, 10, 15, 20, 25], [50000, 100000, 150000]), { xLabelBelow: true, axisLabels: ["years", "balance £"], curves: [{ expr: f, colour: "a1" }],
      points: [{ x: 0, y: 150000, label: "£150,000", colour: "a2", dx: 10, dy: 18 }, { x: 12.5, y: B(12.5), label: `year 12.5: ${g0(B(12.5))}`, colour: "a2", dx: 12, dy: -8 }, { x: 25, y: 0, label: "£0", colour: "a4", dx: -12, dy: -14, anchor: "end" }],
      checks: [pt(f, 25, 0, "after 300 payments the balance is zero"), pt(f, 12.5, B(12.5), "after 12.5 years more than half is still owed"), pt("150000*0.005/(1-1.005^(0-300))", 0, Pm, "the payment is £966.45 a month")], fromLesson: ["966.45"] }));
}

// ---------- u21-10 DCF ----------
{
  const f = "10/(0.09-0.03)*(1-(1.03/1.09)^x)", V = 10 / 0.06;
  must(close(V, 166.67), "dcf");
  mk("u21-10", "maths-u21-dcf-running-value", "graph", "Cash flows growing 3% discounted at 9%",
    "Adding the present value of each year's cash flow, starting with £10m/1.09 in year 1, the total climbs towards C₁/(r − g) = 10/0.06 = £166.7m: later years add less and less.",
    "A rising curve over 100 years that levels off just below £166.7m.",
    ["Year t's cash flow is 10 × 1.03^(t−1), discounted by 1.09^t.", "The running total after n years is 10/(0.09 − 0.03) × (1 − (1.03/1.09)^n).", "As n grows it settles at £166.7m, the value of the firm."],
    G({ x: [0, 100], y: [0, 190] }, T([20, 40, 60, 80, 100], [50, 100, 150]), { axisLabels: ["years", "value £m"], curves: [{ expr: f, colour: "a1" }], marks: [{ y: V, label: "£166.7m" }],
      points: [{ x: 1, y: 10 / 1.09, label: "year 1: £9.2m", colour: "a2", dx: 10, dy: -12 }], checks: [pt(f, 1, 10 / 1.09, "year 1 adds 10/1.09 = £9.17m"), pt(f, 2000, V, "the running total tends to 10/(0.09 − 0.03) = £166.7m")], fromLesson: ["166.7"] }));
}

// ---------- u21-11 NPV ----------
{
  const f = "-1000+600/(1+x)+600/(1+x)^2", npv = (r) => -1000 + 600 / (1 + r) + 600 / (1 + r) ** 2, u = (-600 + Math.sqrt(600 ** 2 + 4 * 600 * 1000)) / 1200, irr = 1 / u - 1;
  must(close(npv(0.1), 41.32) && close(npv(irr), 0, 1e-6), "npv");
  mk("u21-11", "maths-u21-npv-curve", "graph", "NPV against the discount rate",
    `The project's NPV falls as the discount rate rises. At 10% it is £41.32, so accept; it crosses zero at about ${(irr * 100).toFixed(1)}%, the project's IRR.`,
    "A falling curve of NPV against discount rate, passing through (10%, £41.32) and crossing the axis near 13.1%.",
    ["NPV(r) = −1000 + 600/(1 + r) + 600/(1 + r)².", "At r = 10% it is 1041.32 − 1000 = £41.32 > 0.", "Higher rates discount the inflows more, so NPV falls.", `NPV is zero at about ${(irr * 100).toFixed(1)}%.`],
    G({ x: [0, 0.3], y: [-250, 650] }, T([0.05, 0.1, 0.15, 0.2, 0.25, 0.3], [-200, 0, 200, 400, 600]), { grid: [0.05, 200], axisLabels: ["discount rate", "NPV £"], curves: [{ expr: f, colour: "a1" }],
      points: [{ x: 0.1, y: npv(0.1), label: "10%: £41.32", colour: "a2", dx: 12, dy: -12 }, { x: irr, y: 0, label: `IRR ${(irr * 100).toFixed(1)}%`, colour: "a4", dx: 12, dy: 24 }], checks: [pt(f, 0.1, npv(0.1), "at 10% the NPV is £41.32"), pt(f, irr, 0, "the NPV is zero at the IRR")], fromLesson: ["41.32"] }));
}

// ---------- u21-12 IRR ----------
{
  const f = "-1000+1100/(1+x)";
  mk("u21-12", "maths-u21-irr-root", "graph", "The IRR is where NPV crosses zero",
    "−1000 + 1100/(1 + r) falls as r rises and is zero at 1 + r = 1.1: the IRR is 10%. At lower rates the project has positive NPV, at higher rates negative.",
    "A falling NPV curve crossing the horizontal axis at a rate of 10%.",
    ["NPV(r) = −1000 + 1100/(1 + r).", "Set it to zero: 1100/(1 + r) = 1000, so 1 + r = 1.1.", "The curve crosses zero at r = 10%, the IRR."],
    G({ x: [0, 0.3], y: [-200, 150] }, T([0.05, 0.1, 0.15, 0.2, 0.25, 0.3], [-100, 100]), { grid: [0.05, 100], axisLabels: ["discount rate", "NPV £"], curves: [{ expr: f, colour: "a1" }],
      points: [{ x: 0.1, y: 0, label: "IRR 10%", colour: "a2", dx: 10, dy: -14 }, { x: 0, y: 100, label: "£100", colour: "a4", dx: 12, dy: -12 }], checks: [pt(f, 0.1, 0, "NPV(10%) = 0, so the IRR is 10%"), pt(f, 0, 100, "at a zero rate the NPV is 1100 − 1000 = £100")], fromLesson: ["IRR = 10%"] }));
}

// ---------- u21-13 Bond pricing ----------
{
  const f = "5/(1+x)+5/(1+x)^2+105/(1+x)^3", pr = (y) => 5 / (1 + y) + 5 / (1 + y) ** 2 + 105 / (1 + y) ** 3;
  must(close(pr(0.06), 97.33) && close(pr(0.05), 100), "bond");
  mk("u21-13", "maths-u21-bond-price-yield", "graph", "Price falls as the yield rises",
    "The 3-year 5% coupon bond is worth £100 (par) when the yield equals the coupon, 5%. At a 6% yield it is £97.33, below par; a lower yield would put it above par.",
    "A downward-sloping curve of price against yield, passing through £100 at 5% and £97.33 at 6%.",
    ["Price = 5/(1 + y) + 5/(1 + y)² + 105/(1 + y)³.", "At y = 5% (the coupon) the price is exactly £100.", "At y = 6% it is 4.717 + 4.450 + 88.160 = £97.33.", "Higher yields discount the cash flows more, so the price falls."],
    G({ x: [0.02, 0.1], y: [88, 112] }, T([0.02, 0.04, 0.06, 0.08, 0.1], [90, 95, 100, 105, 110]), { grid: [0.02, 5], axisLabels: ["yield", "price £"], curves: [{ expr: f, colour: "a1" }], marks: [{ y: 100, label: "par £100" }],
      points: [{ x: 0.05, y: 100, label: "5%: £100", colour: "a4", dx: 10, dy: -14 }, { x: 0.06, y: pr(0.06), label: "6%: £97.33", colour: "a2", dx: -12, dy: 26, anchor: "end" }], checks: [pt(f, 0.06, pr(0.06), "at a 6% yield the price is £97.33"), pt(f, 0.05, 100, "at a 5% yield (the coupon) the price is par")], fromLesson: ["97.33"] }));
}

// ---------- u21-14 Equity valuation ----------
{
  const f = "2/(x-0.04)";
  mk("u21-14", "maths-u21-gordon-value", "graph", "Share value against required return",
    "With a £2 dividend growing 4%, the value is 2/(r − 0.04): £40 at r = 9%. A small rise in the required return cuts the value sharply, and as r approaches the growth rate the value explodes.",
    "A steeply falling curve of share value against required return, passing through (9%, £40).",
    ["P₀ = D₁/(r − g) with D₁ = £2 and g = 4%.", "At r = 9% the value is 2/0.05 = £40.", "The curve falls steeply as r rises towards the right and rises sharply as r nears 4%."],
    G({ x: [0.05, 0.15], y: [0, 130] }, T([0.06, 0.08, 0.1, 0.12, 0.14], [20, 40, 60, 80, 100, 120]), { grid: [0.02, 20], axisLabels: ["required return r", "value £"], curves: [{ expr: f, colour: "a1", domain: [0.0516, 0.15] }],
      points: [{ x: 0.09, y: 40, label: "9%: £40", colour: "a2", dx: 12, dy: -12 }], marks: [{ x: 0.09, to: 40 }], checks: [pt(f, 0.09, 40, "at 9% the share is worth 2/0.05 = £40"), pt(f, 0.06, 100, "at 6% it would be worth £100")], fromLesson: ["£40"] }));
}

// ---------- u21-15 Portfolio theory ----------
{
  const f = "20*sqrt(x^2-x+1)", sd = (w) => 20 * Math.sqrt(w * w + (1 - w) ** 2 + w * (1 - w)); // ρ = 0.5, σ = 20
  must(close(sd(0.5), 17.32, 0.01) && close(sd(0.5), Math.sqrt(0.03) * 100, 1e-9), "port");
  mk("u21-15", "maths-u21-two-asset-risk", "graph", "Risk of a two-asset portfolio",
    "With two assets of 20% risk and correlation 0.5, mixing them lowers the risk: a 50/50 split has σ = √0.03 ≈ 17.3%, the minimum on this curve. Holding all of either gives 20%.",
    "A shallow U-shaped curve of portfolio risk against the weight in the first asset, from 20% at 0 and 1 down to 17.3% at 0.5.",
    ["With weights w and 1 − w: σp² = 0.04(w² + (1 − w)² + w(1 − w)).", "At w = 0.5 this is 0.01 + 0.01 + 0.01 = 0.03.", "So σp = √0.03 ≈ 17.3%, below the 20% of either asset."],
    G({ x: [0, 1], y: [15, 22] }, T([0.25, 0.5, 0.75, 1], [16, 18, 20, 22]), { grid: [0.25, 2], axisLabels: ["weight in asset 1", "risk σp (%)"], curves: [{ expr: f, colour: "a1" }],
      points: [{ x: 0.5, y: sd(0.5), label: "17.3%", colour: "a2", dx: 10, dy: 22 }, { x: 0, y: 20, label: "20%", colour: "a4", dx: 10, dy: -10 }, { x: 1, y: 20, label: "20%", colour: "a4", dx: -10, dy: -10, anchor: "end" }],
      checks: [pt(f, 0.5, sd(0.5), "the 50/50 portfolio has σ = √0.03 ≈ 17.3%"), { type: "min", expr: f, domain: [0, 1], x: 0.5, y: sd(0.5), name: "the minimum risk is at the 50/50 split" }, pt(f, 1, 20, "all in one asset has risk 20%")], fromLesson: ["17.3%"] }));
}

// ---------- u21-16 Sharpe ratios ----------
{
  const sA = (10 - 2) / 15, sB = (8 - 2) / 8, fa = `2+${P(sA)}*x`, fb = `2+${P(sB)}*x`;
  must(close(sA, 0.53, 0.005) && close(sB, 0.75), "sharpe");
  mk("u21-16", "maths-u21-sharpe-lines", "graph", "Sharpe ratio as the slope from the risk-free rate",
    "Each fund lies on a line from the 2% risk-free rate; its slope is the Sharpe ratio. B's line (0.75) is steeper than A's (0.53), so B earns more excess return per unit of risk.",
    "Two lines from (0, 2%): a shallower one through fund A at (15, 10) and a steeper one through fund B at (8, 8).",
    ["Excess return is return minus the 2% risk-free rate.", "A: (10 − 2)/15 = 0.53 per unit of risk.", "B: (8 − 2)/8 = 0.75, the steeper line.", "A steeper line from the risk-free rate means a better risk-adjusted return."],
    G({ x: [0, 20], y: [0, 14] }, T([5, 10, 15, 20], [2, 4, 6, 8, 10, 12]), { grid: [5, 2], axisLabels: ["risk σ (%)", "return (%)"], curves: [{ expr: fa, colour: "a1", domain: [0, 20] }, { expr: fb, colour: "a2", domain: [0, 20] }], marks: [{ y: 2, label: "risk-free 2%", }],
      points: [{ x: 15, y: 10, label: "A", colour: "a1", dx: 10, dy: 18 }, { x: 8, y: 8, label: "B", colour: "a2", dx: -14, dy: -10, anchor: "end" }],
      checks: [pt(fa, 15, 10, "fund A lies on its line from the risk-free rate"), pt(fb, 8, 8, "fund B lies on its line"), sl(fa, 5, sA, "A's slope (its Sharpe ratio) is 0.53"), sl(fb, 5, sB, "B's slope (its Sharpe ratio) is 0.75")], fromLesson: ["0.75"] }));
}

// ---------- u21-17 CAPM ----------
{
  mk("u21-17", "maths-u21-security-market-line", "graph", "The security market line",
    "Required return rises with beta by the market risk premium, 5% per unit: 3 + 5β. At β = 1.2 the share must return 9%; the market itself (β = 1) returns 8%.",
    "A straight line from 3% at β = 0 rising 5% per unit of beta, with marked points (1, 8%) for the market and (1.2, 9%) for the share.",
    ["The line starts at the risk-free rate 3%.", "Its slope is the market risk premium 8 − 3 = 5%.", "At β = 1.2 the required return is 3 + 1.2 × 5 = 9%."],
    G({ x: [0, 2], y: [0, 14] }, T([0.5, 1, 1.5, 2], [3, 6, 9, 12]), { grid: [0.5, 3], axisLabels: ["beta β", "required return (%)"], curves: [{ expr: "3+5*x", colour: "a1" }],
      points: [{ x: 1, y: 8, label: "market 8%", colour: "a4", dx: 10, dy: 20 }, { x: 1.2, y: 9, label: "share 9%", colour: "a2", dx: -12, dy: -12, anchor: "end" }, { x: 0, y: 3, label: "3%", colour: "a4", dx: 10, dy: -10 }],
      checks: [pt("3+5*x", 1.2, 9, "at β = 1.2 the required return is 9%"), pt("3+5*x", 1, 8, "the market (β = 1) returns 8%"), sl("3+5*x", 1, 5, "the slope is the 5% market premium")], fromLesson: ["9%"] }));
}

// ---------- u21-18 APT ----------
mk("u21-18", "maths-u21-apt-build-up", "bar-model", "Building the expected return from factor premiums",
  "The expected return is a stack: 3% risk-free, plus 1.0 × 4% for growth, plus 0.5 × 2% for inflation: 3 + 4 + 1 = 8%.",
  "One bar made of three parts, 3 (risk-free), 4 (growth) and 1 (inflation), with a bracket for the 8% total.",
  ["Start from the risk-free rate, 3%.", "Add the growth exposure: 1.0 × 4% = 4%.", "Add the inflation exposure: 0.5 × 2% = 1%.", "The total expected return is 8%."],
  { suffix: "%", bars: [{ label: "expected return", parts: [{ value: 3, text: "3 risk-free" }, { value: 4, text: "4 growth" }, { value: 1, text: "1" }] }], braces: [{ bar: 0, from: 0, to: 2, value: 8, text: "8%" }],
    checks: [{ type: "percent", of: 1.0, percent: 4, value: 0.04, name: "growth part: 1.0 × 4% = 4%" }, { type: "percent", of: 0.5, percent: 2, value: 0.01, name: "inflation part: 0.5 × 2% = 1%" }], fromLesson: ["= 8%"] });

// ---------- u21-20 Risk-neutral probability ----------
{
  const q = (100 - 90) / (120 - 90);
  must(close(q, 1 / 3, 1e-12) && close(q * 120 + (1 - q) * 90, 100, 1e-9), "rn");
  mk("u21-20", "maths-u21-one-period-tree", "prob-tree", "A one-period market and its risk-neutral probability",
    "The stock goes from £100 to £120 or £90. Weighting the two prices with q = 1/3 and 2/3 gives back £100, the only probability for which the stock is a fair price when r = 0.",
    "A tree from £100 with an up branch to £120 of probability 1/3 and a down branch to £90 of probability 2/3.",
    ["The martingale condition is 100 = q × 120 + (1 − q) × 90.", "This gives 100 = 90 + 30q, so q = 1/3.", "The unique q means every payoff can be priced: the market is complete."],
    { tree: { children: [{ label: "Up £120", p: "1/3" }, { label: "Down £90", p: "2/3" }] }, outcomes: true, checks: [{ type: "outcome", path: ["Up £120"], p: "1/3", name: "q = 1/3 satisfies 100 = q × 120 + (1 − q) × 90" }, { type: "outcome", path: ["Down £90"], p: "2/3" }], fromLesson: ["q = 1/3"] });
}

// ---------- u21-21 Break-even ----------
{
  const rev = "20*x", cost = "50+12*x", be = 50 / 8;
  must(be === 6.25 && 10 * 8 - 50 === 30, "be");
  mk("u21-21", "maths-u21-break-even", "graph", "Revenue and cost: the break-even volume",
    "Revenue 20 per unit overtakes total cost 50,000 + 12 per unit once each unit contributes £8 towards the fixed costs: at 6,250 units. At 10,000 units the gap is the £30,000 profit.",
    "Two rising lines, revenue steeper than cost, crossing at 6,250 units and £125,000.",
    ["Contribution per unit is 20 − 12 = £8.", "Fixed costs £50,000 are covered at 50,000/8 = 6,250 units.", "At 10,000 units revenue £200,000 exceeds cost £170,000 by £30,000."],
    G({ x: [0, 12], y: [0, 240] }, T([2, 4, 6, 8, 10, 12], [50, 100, 150, 200]), { grid: [2, 50], axisLabels: ["units (thousands)", "£ thousands"], curves: [{ expr: rev, colour: "a1", label: "revenue", labelAt: [8.9, 214] }, { expr: cost, colour: "a2", label: "cost", labelAt: [8.6, 136] }],
      points: [{ x: be, y: 125, label: "break-even 6,250", colour: "a4", dx: 12, dy: 22 }], marks: [{ x: 10, to: 200 }],
      checks: [{ type: "intersect", a: rev, b: cost, x: be, y: 125, name: "revenue equals cost at 6,250 units (£125,000)" }, pt(rev, 10, 200, "10,000 units earn £200,000"), pt(cost, 10, 170, "10,000 units cost £170,000, a profit of £30,000")], fromLesson: ["6,250"] }));
}

// ---------- u21-23 GBM ----------
{
  const mean = (t) => 100 * Math.exp(0.08 * t), med = (t) => 100 * Math.exp(0.06 * t);
  must(close(mean(1), 108.33) && close(med(1), 106.18), "gbm");
  mk("u21-23", "maths-u21-gbm-mean-median", "graph", "Mean and median of a geometric Brownian motion",
    "With μ = 8% and σ = 20%, the expected price grows as 100e^{0.08t} but the median as 100e^{0.06t}, because the volatility drag σ²/2 = 2% pulls the typical path below the mean. After one year: £108.33 against £106.18.",
    "Two exponential curves from £100: the mean rising faster than the median, 108.33 and 106.18 at one year.",
    ["E[S_t] = 100e^{0.08t}.", "The median is 100e^{(μ − σ²/2)t} = 100e^{0.06t}.", "At t = 1: mean £108.33, median £106.18.", "The gap widens with time because the distribution is skewed."],
    G({ x: [0, 5], y: [90, 160] }, T([1, 2, 3, 4, 5], [100, 120, 140, 160]), { grid: [1, 20], axisLabels: ["years", "price £"], curves: [{ expr: "100*exp(0.08*x)", colour: "a1", label: "mean", labelAt: [3.9, 146] }, { expr: "100*exp(0.06*x)", colour: "a2", label: "median", labelAt: [3.9, 124] }],
      points: [{ x: 1, y: mean(1), label: "£108.33", colour: "a1", dx: -8, dy: -12, anchor: "end" }, { x: 1, y: med(1), label: "£106.18", colour: "a2", dx: 12, dy: 18 }],
      checks: [pt("100*exp(0.08*x)", 1, mean(1), "the mean after a year is £108.33"), pt("100*exp(0.06*x)", 1, med(1), "the median after a year is £106.18")], fromLesson: ["108.33"] }));
}

// ---------- u21-24 Forward price ----------
{
  const F = 50 * Math.exp(0.04);
  must(close(F, 52.04), "fwd");
  mk("u21-24", "maths-u21-forward-price", "graph", "The forward price against delivery time",
    "With no dividends the forward price is the spot price grown at the interest rate: 50e^{0.04T}. For T = 1 it is £52.04; longer contracts cost more.",
    "A gently rising exponential curve from £50, passing through (1, £52.04).",
    ["Buying forward is the same as buying the stock now and paying interest.", "F = S₀e^{rT} = 50e^{0.04T}.", "At T = 1, F ≈ £52.04."],
    G({ x: [0, 3], y: [48, 58] }, T([1, 2, 3], [50, 52, 54, 56, 58]), { grid: [1, 2], axisLabels: ["T (years)", "forward price £"], curves: [{ expr: "50*exp(0.04*x)", colour: "a1" }],
      points: [{ x: 1, y: F, label: "£52.04", colour: "a2", dx: -12, dy: -14, anchor: "end" }, { x: 0, y: 50, label: "£50 spot", colour: "a4", dx: 12, dy: 22 }], checks: [pt("50*exp(0.04*x)", 1, F, "the one-year forward price is £52.04")], fromLesson: ["52.04"] }));
}

// ---------- u21-25 Intrinsic and time value ----------
{
  const pay = "(abs(x-50)+(x-50))/2";
  mk("u21-25", "maths-u21-call-value-split", "graph", "Intrinsic value and time value of a call",
    "At expiry the call pays max(S − 50, 0). With the stock at £53 that is £3 intrinsic value, but the option costs £6: the extra £3 is time value, for the chance of further gains.",
    "The hockey-stick payoff of a call with strike 50, with a marked gap at S = 53 between the payoff £3 and the price £6.",
    ["Intrinsic value = max(53 − 50, 0) = £3.", "The option price is £6.", "Time value = 6 − 3 = £3: what the market pays for the chance of a higher price before expiry."],
    G({ x: [44, 60], y: [0, 11] }, T([44, 48, 52, 56, 60], [2, 4, 6, 8, 10]), { grid: [4, 2], axisLabels: ["stock price £", "£"], curves: [{ expr: pay, colour: "a1", label: "payoff", labelAt: [55.5, 7.4] }], marks: [{ x: 50, label: "K = 50" }],
      arrows: [{ from: [53, 3.15], to: [53, 5.85], colour: "a2", label: "time value £3", labelAt: [52.7, 4.6], anchor: "end" }], points: [{ x: 53, y: 3, label: "intrinsic £3", colour: "a1", dx: 12, dy: 20 }, { x: 53, y: 6, label: "price £6", colour: "a2", dx: -12, dy: -10, anchor: "end" }],
      checks: [pt(pay, 53, 3, "the intrinsic value at S = 53 is £3"), pt(pay, 50, 0, "the call is worth nothing at S = K"), pt("6-(abs(x-50)+(x-50))/2", 53, 3, "time value = 6 − 3 = £3")], fromLesson: ["time value"] }));
}

// ---------- u21-26 Binomial pricing ----------
{
  const q = (1 - 0.8) / (1.2 - 0.8), V = q * 20 + (1 - q) * 0;
  must(q === 0.5 && V === 10 && 100 * 1.2 === 120 && 100 * 0.8 === 80, "binom");
  mk("u21-26", "maths-u21-binomial-call", "prob-tree", "A one-step binomial call",
    "From £100 the stock moves to £120 (call pays £20) or £80 (pays £0). With r = 0 the risk-neutral probability is q = 0.5, so the call is worth 0.5 × 20 + 0.5 × 0 = £10.",
    "A tree from £100 with an up branch to £120 and a down branch to £80, each of probability ½, and the call payoffs 20 and 0.",
    ["q = (1 − d)/(u − d) = 0.2/0.4 = 0.5.", "Up: stock £120, call pays £20. Down: stock £80, call pays £0.", "Call value = 0.5 × 20 + 0.5 × 0 = £10."],
    { tree: { children: [{ label: "Up £120", p: "1/2" }, { label: "Down £80", p: "1/2" }] }, outcomes: true, checks: [{ type: "outcome", path: ["Up £120"], p: "1/2", name: "q = (1 − 0.8)/(1.2 − 0.8) = ½" }], fromLesson: ["£10"] });
}

// ---------- u21-27 Black–Scholes ----------
{
  const erf = (x) => { const t = 1 / (1 + 0.3275911 * Math.abs(x)), y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x >= 0 ? y : -y; };
  const N = (x) => 0.5 * (1 + erf(x / Math.SQRT2)), d1 = (0 + 0.5 * 0.04) / 0.2, d2 = d1 - 0.2, C = 100 * N(d1) - 100 * N(d2);
  must(close(d1, 0.1, 1e-12) && close(C, 7.97, 0.01), "bs");
  mk("u21-27", "maths-u21-bs-normal-area", "distribution", "N(d₁) as an area under the standard normal curve",
    "With S = K = 100, r = 0, σ = 20% and T = 1: d₁ = 0.1 and d₂ = −0.1. N(0.1) = 0.5398 is the shaded area to the left of d₁; N(−0.1) = 0.4602. The call is worth 100 × 0.5398 − 100 × 0.4602 ≈ £7.97.",
    "A standard normal bell curve with the area to the left of 0.1 shaded, 0.5398, and a mark at −0.1.",
    ["d₁ = (ln(S/K) + (r + σ²/2)T)/(σ√T) = 0.02/0.2 = 0.1; d₂ = d₁ − σ√T = −0.1.", "N(0.1) ≈ 0.5398 and N(−0.1) ≈ 0.4602.", "C = 100 × 0.5398 − 100 × 0.4602 ≈ £7.97."],
    { dist: { dist: "normal", mu: 0, sigma: 1 }, range: { x: [-3.5, 3.5], y: [0, 0.5] }, ticks: [[-3, -2, -1, 0, 1, 2, 3], [0.1, 0.2, 0.3, 0.4]], axisLabels: ["z", "density"], shade: [null, 0.1], p: 0.5398, marks: [{ x: 0.1, label: "d₁ = 0.1" }, { x: -0.1 }],
      checks: [{ type: "prob", from: -9, to: 0.1, p: 0.5398, name: "N(d₁) = N(0.1) = 0.5398" }, { type: "prob", from: -9, to: -0.1, p: 0.4602, name: "N(d₂) = N(−0.1) = 0.4602" }], fromLesson: ["7.97"] });
}

// ---------- u21-28 Vasicek ----------
{
  const f = "0.04-0.02*exp(0-0.5*x)";
  mk("u21-28", "maths-u21-vasicek-mean", "graph", "The expected short rate in the Vasicek model",
    "Starting at 2% with speed a = 0.5 and long-run level b = 4%, the expected rate rises at first by a(b − r) = 1% a year and then flattens towards 4%.",
    "A curve rising from 2% and flattening towards the dashed 4% level.",
    ["The drift is a(b − r) = 0.5 × (0.04 − 0.02) = 0.01 per year.", "So the expected rate climbs at 1% a year at first.", "As r nears b the pull weakens: E[r] → 4%."],
    G({ x: [0, 10], y: [0.015, 0.045] }, T([2, 4, 6, 8, 10], [0.02, 0.03, 0.04]), { grid: [2, 0.01], axisLabels: ["years", "expected rate"], curves: [{ expr: f, colour: "a1" }], marks: [{ y: 0.04, label: "b = 4%" }],
      points: [{ x: 0, y: 0.02, label: "2%", colour: "a2", dx: 10, dy: 16 }], checks: [sl(f, 0, 0.01, "the initial slope is a(b − r) = 0.01 a year"), pt(f, 60, 0.04, "in the long run E[r] → 4%"), pt(f, 0, 0.02, "the rate starts at 2%")], fromLesson: ["1%"] }));
}

// ---------- u21-29 Ruin probability ----------
{
  const f = "0.8*exp(0-x/5000)", psi = 0.8 * Math.exp(-1);
  must(close(psi, 0.294, 0.001) && close(0.25 * 5000 / (1.25 * 1000), 1, 1e-12), "ruin");
  mk("u21-29", "maths-u21-ruin-probability", "graph", "Ruin probability against initial capital",
    "For exponential claims with mean £1,000 and loading 0.25, ψ(u) = 0.8e^{−u/5000}. With £5,000 of capital the exponent is −1 and the ruin probability is 0.8/e ≈ 0.294; more capital cuts it rapidly.",
    "A decaying curve starting at 0.8 for no capital and falling to 0.294 at £5,000.",
    ["ψ(u) = (1/(1 + θ)) e^{−θu/((1 + θ)μ)} with θ = 0.25 and μ = £1,000.", "The exponent is −0.25u/1250 = −u/5000, and 1/1.25 = 0.8.", "At u = £5,000: 0.8e^{−1} ≈ 0.294."],
    G({ x: [0, 20000], y: [0, 0.9] }, T([5000, 10000, 15000, 20000], [0.2, 0.4, 0.6, 0.8]), { grid: [5000, 0.2], axisLabels: ["capital u (£)", "ruin probability"], curves: [{ expr: f, colour: "a1" }], marks: [{ x: 5000, to: psi }],
      points: [{ x: 5000, y: psi, label: "0.294", colour: "a2", dx: 12, dy: -12 }, { x: 0, y: 0.8, label: "0.8", colour: "a4", dx: 10, dy: -10 }], checks: [pt(f, 5000, psi, "with £5,000 the ruin probability is 0.8e^{−1} ≈ 0.294"), pt(f, 0, 0.8, "with no capital it is 1/(1 + θ) = 0.8")], fromLesson: ["0.294"] }));
}

// ---------- u21-30 EWMA ----------
{
  const a = 0.94 * 0.0001, b = 0.06 * 0.02 ** 2, v = a + b;
  must(close(v, 0.000118, 1e-12) && close(Math.sqrt(v), 0.0109, 0.0001), "ewma");
  mk("u21-30", "maths-u21-ewma-update", "bar-model", "Updating the variance with EWMA",
    "The new variance is a blend: 94% weight on yesterday's variance and 6% on today's squared return. In units of 10⁻⁶ that is 94 + 24 = 118, a daily volatility of about 1.09%.",
    "One bar made of two parts, 94 (from yesterday's variance) and 24 (from today's return), bracketed as 118.",
    ["0.94 × 0.0001 = 0.000094, the part from yesterday's variance.", "0.06 × 0.02² = 0.000024, the part from today's squared return.", "Their sum is 0.000118, and its square root is about 1.09%."],
    { bars: [{ label: "variance (×10⁻⁶)", parts: [{ value: 94, text: "94: old" }, { value: 24, text: "24" }] }], braces: [{ bar: 0, from: 0, to: 1, value: 118, text: "118" }],
      checks: [{ type: "percent", of: 0.0001, percent: 94, value: 0.000094, name: "0.94 × 0.0001 = 0.000094" }, { type: "percent", of: 0.0004, percent: 6, value: 0.000024, name: "0.06 × 0.02² = 0.000024" }], fromLesson: ["0.000118"] });
}

// ---------- u21-31 Credit risk ----------
mk("u21-31", "maths-u21-loss-given-default", "bar-model", "A £1m loan: what is lost on default",
  "If the borrower defaults, 40% is recovered and 60% (LGD) is lost: £600,000 of the £1,000,000. With a 2% chance of default the expected loss is 0.02 × £600,000 = £12,000.",
  "One bar for the £1,000,000 loan split into £600,000 lost and £400,000 recovered.",
  ["Recovery rate 40%, so LGD = 1 − 0.4 = 0.6.", "On default £600,000 is lost and £400,000 recovered.", "Expected loss = PD × LGD × exposure = 0.02 × 0.6 × £1,000,000 = £12,000."],
  { prefix: "£", bars: [{ label: "£1m loan (£000)", parts: [{ value: 600, text: "600 lost" }, { value: 400, text: "400 recovered" }] }], braces: [{ bar: 0, from: 0, to: 1, value: 1000, text: "1,000" }],
    checks: [{ type: "ratio", bar: 0, ratio: [3, 2], total: 1000, name: "LGD 60% and recovery 40% of £1,000k are 600 and 400" }, { type: "percent", of: 600000, percent: 2, value: 12000, name: "2% of the £600,000 loss given default is £12,000" }], fromLesson: ["£12,000"] });

// ---------- u21-32 VaR ----------
{
  const z = 2.326, sigma = 100;
  mk("u21-32", "maths-u21-var-tail", "distribution", "The 99% one-day VaR as a tail",
    "Daily losses on the £10m portfolio are normal with standard deviation £100,000. The 1% worst outcomes lie beyond 2.326 standard deviations, £232,600, which is the 99% VaR.",
    "A bell curve of daily loss in £ thousands, with the 1% tail beyond £232.6k shaded.",
    ["σV = 1% × £10m = £100,000.", "The 99th percentile of a normal is z = 2.326.", "VaR = 2.326 × £100,000 ≈ £232,600: only 1% of days should lose more."],
    { dist: { dist: "normal", mu: 0, sigma }, range: { x: [-350, 350], y: [0, 0.0045] }, ticks: [[-300, -200, -100, 0, 100, 200, 300], [0.001, 0.002, 0.003, 0.004]], axisLabels: ["loss (£ thousand)", "density"], shade: [z * sigma, null], p: 0.01, marks: [{ x: z * sigma, label: "VaR 232.6" }],
      checks: [{ type: "prob", from: z * sigma, to: 900, p: 0.01, name: "only 1% of losses exceed 2.326σ" }], fromLesson: ["232,600"] });
}

// ---------- u21-33 Expected shortfall ----------
{
  const L = [1, 2, 3, 4, 5, 6, 7, 8, 20, 50], worst = L.slice(-2), es = (worst[0] + worst[1]) / 2, tot = L.reduce((a, b) => a + b, 0);
  must(es === 35 && tot === 106, "es");
  mk("u21-33", "maths-u21-expected-shortfall", "barchart", "Ten losses: VaR and expected shortfall",
    "The two worst of ten equally likely losses, 20 and 50, are the 20% tail. The 80% VaR is only 8, the threshold, but the expected shortfall averages the tail: (20 + 50)/2 = 35.",
    "Ten bars of losses 1 to 8, 20 and 50, with the two largest highlighted.",
    ["Sort the ten losses: 1, 2, …, 8, 20, 50.", "The worst 20% are 20 and 50.", "ES = (20 + 50)/2 = 35, far above the VaR of 8."],
    { categories: L.map((_, i) => String(i + 1)), values: L, range: { y: [0, 55] }, ticks: [10, 20, 30, 40, 50], grid: [1, 10], axisLabels: ["outcome (ranked)", "loss"], highlight: [8, 9], checks: [{ type: "total", value: tot, name: "the ten losses add to 106" }], fromLesson: ["= 35"] });
}

// ---------- u21-34 Term insurance ----------
{
  const epv = 10000 * 0.01 / 1.05;
  must(close(epv, 95.24), "epv");
  mk("u21-34", "maths-u21-term-policy-tree", "prob-tree", "A one-year term policy",
    "The policyholder dies within the year with probability 0.01, when £10,000 is paid at year end. The expected present value of the benefit is 10,000 × 0.01/1.05 ≈ £95.24: the single premium.",
    "A tree with a death branch of probability 1/100 and a survival branch of 99/100.",
    ["Dying within the year has probability q₆₀ = 0.01; surviving 0.99.", "Only the death branch pays £10,000, at the end of the year.", "EPV = 10,000 × 0.01/1.05 ≈ £95.24."],
    { tree: { children: [{ label: "Dies", p: "1/100" }, { label: "Survives", p: "99/100" }] }, outcomes: true, checks: [{ type: "outcome", path: ["Dies"], p: "1/100", name: "q₆₀ = 0.01" }, { type: "event", paths: [["Dies"], ["Survives"]], p: "1" }], fromLesson: ["95.24"] });
}

// ---------- u21-36 Kaplan–Meier ----------
{
  const s1 = 1 - 2 / 10, s3 = s1 * (1 - 1 / 7);
  must(close(s3, 0.686, 0.001), "km");
  mk("u21-36", "maths-u21-kaplan-meier", "graph", "The Kaplan–Meier curve",
    "The estimate drops by 20% at month 1 (2 of 10 die), stays level at month 2 when one patient is censored (leaving 7 at risk), and drops by 1/7 at month 3 to S(3) = 0.8 × 6/7 ≈ 0.686.",
    "A step curve falling from 1 to 0.8 at month 1 and to 0.686 at month 3, with the censoring at month 2 marked.",
    ["Month 1: 2 of 10 die, so S = 1 − 2/10 = 0.8.", "Month 2: one patient is censored, leaving 7 at risk; the curve does not drop.", "Month 3: 1 of 7 dies, factor 6/7, S = 0.8 × 6/7 ≈ 0.686."],
    G({ x: [0, 4], y: [0, 1.1] }, T([1, 2, 3, 4], [0.2, 0.4, 0.6, 0.8, 1]), { grid: [1, 0.2], axisLabels: ["months", "survival S(t)"], series: [{ points: [[0, 1], [1, 1], [1, s1], [3, s1], [3, s3], [4, s3]], colour: "a1", width: 3 }],
      points: [{ x: 2, y: s1, label: "censored", colour: "a4", dx: 8, dy: -14 }, { x: 4, y: s3, label: "0.686", colour: "a2", dx: -10, dy: -12, anchor: "end" }],
      checks: [pt("1-2/10", 0, s1, "after month 1: 1 − 2/10 = 0.8"), pt("(1-2/10)*(1-1/7)", 0, s3, "S(3) = 0.8 × (1 − 1/7) ≈ 0.686")], fromLesson: ["0.686"] }));
}

// ---------- u21-37 DB pension ----------
mk("u21-37", "maths-u21-pension-accrual", "bar-model", "Thirty sixtieths of final salary",
  "Each year of service earns 1/60 of final salary. After 30 years the accrual is 30/60 = ½, so the pension is half of £45,000: £22,500 a year.",
  "A bar of 60 equal cells with 30 shaded, showing one half.",
  ["Each year of service earns one sixtieth.", "Thirty years give 30 of the 60 sixtieths: ½.", "The pension is ½ × £45,000 = £22,500 a year."],
  { bars: [{ label: "30 of 60 sixtieths", cells: 60, shaded: 30 }], checks: [{ type: "fraction", bar: 0, value: "1/2", name: "30/60 = ½" }, { type: "percent", of: 45000, percent: 50, value: 22500, name: "half of £45,000 is £22,500" }], fromLesson: ["£22,500"] });

// ---------- u21-38 Consumer optimum ----------
{
  const bud = "20-0.4*x", ind = "250/x";
  must(2 * 25 + 5 * 10 === 100 && 25 * 10 === 250, "cd");
  mk("u21-38", "maths-u21-consumer-optimum", "graph", "The consumer's best bundle",
    "The budget line 2x + 5y = 100 is tangent to the indifference curve xy = 250 at (25, 10): half of income, £50, goes on each good.",
    "A downward budget line touching a curved indifference curve at the point (25, 10).",
    ["Budget: 2x + 5y = 100, so y = 20 − 0.4x.", "Cobb–Douglas spends half of income on each good: x = 50/2 = 25, y = 50/5 = 10.", "The utility level there is 25 × 10 = 250.", "The line touches the curve xy = 250 at that point (equal slopes)."],
    G({ x: [0, 50], y: [0, 25] }, T([10, 20, 30, 40, 50], [5, 10, 15, 20, 25]), { grid: [10, 5], axisLabels: ["good x", "good y"], curves: [{ expr: bud, colour: "a1", label: "budget", labelAt: [38, 3.4] }, { expr: ind, colour: "a2", domain: [10.5, 50], label: "xy = 250", labelAt: [37, 8.6] }],
      points: [{ x: 25, y: 10, label: "(25, 10)", colour: "a4", dx: 12, dy: -12 }], checks: [{ type: "intersect", a: bud, b: ind, x: 25, y: 10, name: "the budget line and indifference curve meet at (25, 10)" }, sl(ind, 25, -0.4, "the indifference curve has the budget line's slope −0.4 there")], fromLesson: ["y = 50/5"] }));
}

// ---------- u21-40 Supply and demand ----------
{
  const dem = "(100-x)/2", sup = "x/3", cs = (60 * (50 - 20)) / 2;
  must(cs === 900 && (100 - 2 * 20) === 60 && 3 * 20 === 60, "sd");
  mk("u21-40", "maths-u21-supply-demand", "graph", "Equilibrium and consumer surplus",
    "Demand Q = 100 − 2P and supply Q = 3P meet at P = £20, Q = 60. The demand curve reaches the price axis at £50, so consumer surplus is the triangle ½ × 60 × (50 − 20) = 900.",
    "A falling demand line and a rising supply line crossing at quantity 60, price £20; the triangle above the price down to demand is the consumer surplus.",
    ["Demand: P = (100 − Q)/2. Supply: P = Q/3.", "Equal prices when 100 − 2P = 3P: P = 20, Q = 60.", "Demand hits P = 50 when Q = 0.", "Consumer surplus = ½ × 60 × 30 = 900."],
    G({ x: [0, 100], y: [0, 55] }, T([20, 40, 60, 80, 100], [10, 20, 30, 40, 50]), { grid: [20, 10], axisLabels: ["quantity Q", "price £"], curves: [{ expr: dem, colour: "a1", label: "demand", labelAt: [14, 49] }, { expr: sup, colour: "a2", label: "supply", labelAt: [76, 32] }], marks: [{ y: 20, to: 60 }, { x: 60, to: 20 }],
      points: [{ x: 60, y: 20, label: "(60, £20)", colour: "a4", dx: 14, dy: -12 }, { x: 0, y: 50, label: "£50", colour: "a1", dx: 10, dy: -8 }],
      checks: [{ type: "intersect", a: dem, b: sup, x: 60, y: 20, name: "demand and supply meet at Q = 60, P = £20" }, { type: "area", expr: "(100-x)/2-20", from: 0, to: 60, value: cs, name: "the consumer surplus triangle has area 900" }], fromLesson: ["= 900"] }));
}

// ---------- u21-41 Taylor rule ----------
mk("u21-41", "maths-u21-taylor-rule", "bar-model", "Building the Taylor-rule rate",
  "The rule adds up: 2% neutral real rate, 4% inflation, 1% for inflation 2 points above target (0.5 × 2) and 0.5% for the 1% output gap (0.5 × 1): 7.5%.",
  "One bar of four parts, 2, 4, 1 and 0.5, bracketed as 7.5%.",
  ["Start with r* + π = 2 + 4 = 6.", "Add 0.5 × (4 − 2) = 1 for the inflation gap.", "Add 0.5 × 1 = 0.5 for the output gap.", "The recommended rate is 7.5%."],
  { suffix: "%", bars: [{ label: "policy rate", parts: [{ value: 2, text: "2 r*" }, { value: 4, text: "4 π" }, { value: 1, text: "1" }, { value: 0.5, text: "½" }] }], braces: [{ bar: 0, from: 0, to: 3, value: 7.5, text: "7.5%" }],
    checks: [{ type: "percent", of: 2, percent: 50, value: 1, name: "inflation gap: 0.5 × (4 − 2) = 1" }, { type: "percent", of: 1, percent: 50, value: 0.5, name: "output gap: 0.5 × 1 = 0.5" }], fromLesson: ["7.5%"] });

// ---------- u21-42 Cournot ----------
{
  mk("u21-42", "maths-u21-cournot-reaction", "graph", "Best-response lines meeting at the Cournot equilibrium",
    "Each firm's best response is half of what the market leaves: q₁ = (120 − q₂)/2 and q₂ = (120 − q₁)/2. They cross at (40, 40): total output 80 and price 120 − 80 = 40.",
    "Two straight lines, firm 1's and firm 2's best responses, crossing at (40, 40).",
    ["Firm 1 maximises q₁(120 − q₁ − q₂), giving q₁ = (120 − q₂)/2.", "By symmetry q = (120 − q)/2, so q = 40.", "Total output 80 and price 40, against a monopoly's Q = 60, P = 60."],
    G({ x: [0, 120], y: [0, 120] }, T([20, 40, 60, 80, 100, 120], [20, 40, 60, 80, 100, 120]), { xLabelBelow: true, grid: [20, 20], axisLabels: ["firm 1 output q₁", "firm 2 output q₂"], curves: [{ expr: "120-2*x", colour: "a1", label: "firm 1's response", labelAt: [4, 108] }, { expr: "(120-x)/2", colour: "a2", label: "firm 2's response", labelAt: [70, 28] }],
      points: [{ x: 40, y: 40, label: "(40, 40)", colour: "a4", dx: 12, dy: -12 }], checks: [{ type: "intersect", a: "120-2*x", b: "(120-x)/2", x: 40, y: 40, name: "the best responses cross at (40, 40)" }, pt("120-40-40", 0, 40, "the price at Q = 80 is 120 − 80 = 40")], fromLesson: ["q = 40"] }));
}

// ---------- u21-43 Cost-benefit ----------
{
  const f = "1.2*(1-1.035^(0-x))/0.035", pvb = 1.2 * (1 - 1.035 ** -15) / 0.035, pb = Math.log(1 / (1 - 10 * 0.035 / 1.2)) / Math.log(1.035);
  must(close(pvb, 13.82) && close(pvb / 10, 1.38, 0.005), "bcr");
  mk("u21-43", "maths-u21-bcr-pv-benefits", "graph", "Discounted benefits against the £10m cost",
    `The running present value of the £1.2m benefits passes the £10m cost after about ${pb.toFixed(1)} years and reaches £13.82m by year 15, so the benefit–cost ratio is 13.82/10 ≈ 1.38.`,
    "A rising, flattening curve of cumulative discounted benefits that crosses the £10m cost line near year 10 and ends at £13.82m at year 15.",
    ["The annuity factor at 3.5% for 15 years is (1 − 1.035^−15)/0.035 ≈ 11.517.", "PV of benefits = 1.2 × 11.517 ≈ £13.82m.", "BCR = 13.82/10 ≈ 1.38, so benefits exceed costs."],
    G({ x: [0, 15], y: [0, 15] }, T([3, 6, 9, 12, 15], [5, 10, 15]), { grid: [3, 5], axisLabels: ["years", "£ million"], curves: [{ expr: f, colour: "a1" }], marks: [{ y: 10, label: "cost £10m" }],
      points: [{ x: 15, y: pvb, label: "£13.82m", colour: "a2", dx: -8, dy: -12, anchor: "end" }, { x: pb, y: 10, label: `${pb.toFixed(1)} years`, colour: "a4", dx: 10, dy: 22 }], checks: [pt(f, 15, pvb, "after 15 years the benefits are worth £13.82m"), pt(f, pb, 10, "discounted benefits equal the £10m cost"), pt("13.82/10", 0, 1.382, "BCR = 13.82/10 ≈ 1.38")], fromLesson: ["1.38"] }));
}

// ---------- u21-44 Exponential smoothing forecast ----------
mk("u21-44", "maths-u21-smoothing-forecast", "bar-model", "A smoothed forecast is a weighted mix",
  "With α = 0.3 the new forecast takes 30% of the latest actual (110) and 70% of the last forecast (100): 33 + 70 = 103.",
  "One bar of two parts, 33 from the actual value and 70 from the old forecast, bracketed as 103.",
  ["0.3 × 110 = 33 comes from the new observation.", "0.7 × 100 = 70 comes from the last forecast.", "The next forecast is 33 + 70 = 103."],
  { bars: [{ label: "next forecast", parts: [{ value: 33, text: "33 actual" }, { value: 70, text: "70 old forecast" }] }], braces: [{ bar: 0, from: 0, to: 1, value: 103, text: "103" }],
    checks: [{ type: "percent", of: 110, percent: 30, value: 33, name: "0.3 × 110 = 33" }, { type: "percent", of: 100, percent: 70, value: 70, name: "0.7 × 100 = 70" }], fromLesson: ["= 103"] });
