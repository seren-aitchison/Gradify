// InvestorGradify's 3D model: risk and return as a landscape. Asset classes float at their long-run
// risk and return, the efficient frontier curves above them, diversification shrinks risk as
// holdings are added, and compounding towers rise over 30 years with and without fees.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  assets: { name: "Asset classes", c: "#5ef0ff" },
  portfolio: { name: "Building a portfolio", c: "#f055dd" },
  time: { name: "Time & costs", c: "#ffe066" },
};

const STRUCTURES = {
  cash: s("assets", "Cash", "Savings accounts and money market funds: very low risk of losing money, but low returns that can trail inflation.",
    ["Real return = nominal return − inflation (approximately).", "UK savings are protected up to £85,000 per person per bank by the FSCS.", "An emergency fund of 3–6 months' spending, in cash, comes before investing."],
    [["What is a real return?", "The return after inflation (roughly nominal return minus inflation)."], ["How much does the FSCS protect per person per bank?", "£85,000."], ["Why keep an emergency fund in cash before investing?", "So you aren't forced to sell investments at a bad time to cover an unexpected cost."]],
    ["cash", "savings", "inflation", "emergency fund", "fscs", "interest rate"]),
  bonds: s("assets", "Bonds", "Loans to governments (gilts) or companies that pay interest (coupons) and return the principal at maturity.",
    ["Bond prices move **opposite to interest rates**: when rates rise, existing bonds fall in value.", "Duration measures sensitivity to rates: a duration of 7 means about a 7% fall for a 1% rise in yields.", "Credit risk: lower-rated (high-yield) bonds pay more because default is more likely."],
    [["What happens to bond prices when interest rates rise?", "They fall."], ["What does a bond's duration tell you?", "Roughly the % price change for a 1 percentage point change in yields."], ["Why do high-yield bonds pay more?", "To compensate for a higher risk of default."]],
    ["bond", "gilt", "yield", "coupon", "duration", "fixed income"]),
  property: s("assets", "Property", "Commercial and residential real estate, held directly or through REITs and property funds.",
    ["Returns come from rent (income) and changes in value (capital growth).", "Direct property is illiquid and concentrated; REITs trade like shares.", "Leverage (a mortgage) magnifies both gains and losses."],
    [["What are the two sources of property returns?", "Rental income and capital growth."], ["What is a REIT?", "A real estate investment trust: a listed company that owns property and pays out most of its rental income."], ["Why is leverage risky?", "It magnifies losses as well as gains."]],
    ["property", "real estate", "reit", "rent", "housing"]),
  equities: s("assets", "Shares (equities)", "Part-ownership of companies. Historically the highest long-run returns of the main asset classes, with the biggest swings.",
    ["UK and global shares have returned roughly 5% a year above inflation over the long run, with falls of 30–50% along the way.", "Total return = dividends + capital growth; reinvesting dividends makes a big difference over time.", "Valuation measures: P/E ratio, dividend yield, price-to-book."],
    [["What makes up the total return on shares?", "Dividends plus capital growth (price change)."], ["Roughly what real return have shares delivered over the long run?", "About 5% a year above inflation, with large falls along the way."], ["What is a P/E ratio?", "Share price ÷ earnings per share: how much investors pay for each £1 of profit."]],
    ["share", "equity", "equities", "stock", "dividend", "stock market"]),
  emerging: s("assets", "Emerging markets", "Shares in faster-growing economies (China, India, Brazil...). Higher potential growth with higher volatility, currency and political risk.",
    ["Economic growth doesn't guarantee stock market returns: valuations and governance matter.", "Currency moves can add to or cut returns for a UK investor.", "Usually held as a small part of a global portfolio."],
    [["Name three extra risks of emerging markets.", "Currency risk, political/regulatory risk and higher volatility (also liquidity and governance)."], ["Does faster GDP growth mean higher share returns?", "Not necessarily: prices may already reflect it, and companies may not capture the growth."], ["How can currency affect a UK investor's return?", "If the foreign currency falls against the pound, returns in pounds fall."]],
    ["emerging market", "currency", "volatility", "international"]),
  frontier: s("portfolio", "Efficient frontier", "The curve of portfolios with the highest expected return for each level of risk (Markowitz, 1952). Anything below it is inefficient.",
    ["Combining assets that don't move together gives a better risk–return trade-off than either alone.", "The **Sharpe ratio** = (return − risk-free rate) ÷ volatility: return per unit of risk.", "The capital market line joins the risk-free rate to the tangency portfolio."],
    [["What is the efficient frontier?", "The set of portfolios giving the highest expected return for each level of risk."], ["Define the Sharpe ratio.", "(Portfolio return − risk-free rate) ÷ standard deviation of returns."], ["Who developed modern portfolio theory?", "Harry Markowitz (1952)."]],
    ["efficient frontier", "markowitz", "portfolio theory", "sharpe", "asset allocation", "risk return"]),
  diversification: s("portfolio", "Diversification", "Spreading money across many investments so no single failure sinks you. Risk falls fast as holdings are added, then levels off.",
    ["**Specific (diversifiable) risk** disappears with diversification; **market (systematic) risk** doesn't.", "Around 20–30 stocks remove most specific risk; a global index fund holds thousands.", "Correlation drives the benefit: assets with low or negative correlation help most."],
    [["What kind of risk can diversification remove?", "Specific (unsystematic) risk; not market (systematic) risk."], ["Why does correlation matter for diversification?", "The lower the correlation between assets, the more risk is reduced when combining them."], ["What does beta measure?", "A share's sensitivity to market movements (its systematic risk)."]],
    ["diversif", "correlation", "systematic risk", "beta", "index fund", "spread"]),
  compounding: s("time", "Compounding", "Returns earning returns. £10,000 at 7% a year becomes about £76,000 in 30 years; at 4%, about £32,000.",
    ["FV = PV × (1 + r)ⁿ.", "The **rule of 72**: money doubles in about 72 ÷ r years (7% → about 10 years).", "Time in the market matters more than timing it: missing the best few days slashes long-run returns."],
    [["State the rule of 72.", "Money roughly doubles in 72 ÷ (annual % return) years."], ["What will £10,000 become at 7% a year for 30 years?", "About £76,000."], ["Why is starting early so powerful?", "Compounding has longer to work, so early contributions grow the most."]],
    ["compound", "compounding", "rule of 72", "long term", "growth"]),
  fees: s("time", "Fees and costs", "Charges come out every year, so they compound too. A 1% higher fee can take a quarter of a 30-year pot.",
    ["Ongoing charges figure (OCF) for funds; platform fees; trading costs.", "Index funds and ETFs typically charge 0.05–0.25%; active funds 0.5–1% or more.", "Most active funds underperform their index after costs over long periods (SPIVA)."],
    [["Why do small fee differences matter so much?", "Fees compound every year, reducing the base that future returns grow on."], ["What is an OCF?", "The ongoing charges figure: a fund's annual running costs as a % of assets."], ["What does SPIVA research show?", "Most active funds underperform their benchmark after fees over long periods."]],
    ["fee", "cost", "charges", "ocf", "etf", "index fund", "active fund"]),
};

const NOTES = {
  assets: { title: "Asset classes", lead: "Every portfolio is built from a few building blocks. Each has its own job, its own return and its own way of losing you money.",
    sections: [
      ["Risk and return", "- Higher expected return comes with higher risk; there's no free lunch.", "- Risk is volatility (how much returns swing), but also permanent loss, inflation, liquidity and currency risk.", "> Your time horizon matters most: money needed within 5 years generally shouldn't be in shares."],
      ["What each asset is for", "- Cash: safety and spending money. Bonds: income and ballast when shares fall (usually).", "- Shares: long-term growth. Property: income and diversification.", "- Commodities and gold: sometimes a hedge, no income."],
      ["Wrappers (UK)", "- ISA: £20,000 a year, tax-free growth and withdrawals.", "- Pension (SIPP/workplace): tax relief on contributions, employer contributions; access from 55 (57 from 2028).", "- Lifetime ISA: 25% bonus, for a first home or retirement."],
    ] },
  portfolio: { title: "Building a portfolio", lead: "Asset allocation (the mix of asset classes) explains most of a portfolio's long-run behaviour. Diversification is the closest thing to a free lunch in investing.",
    sections: [
      ["Modern portfolio theory", "- Portfolio return is the weighted average of returns; portfolio risk is less than the weighted average when correlations are below 1.", "- The efficient frontier and the tangency portfolio; mixing with cash moves along the capital market line.", "- CAPM: expected return = risk-free rate + β × market risk premium."],
      ["Practical allocation", "- A common starting point: a global equity index fund plus bonds, in a mix matched to risk tolerance and horizon (e.g. 80/20, 60/40).", "- Rebalance once or twice a year back to target weights: it sells high and buys low automatically.", "- Lifestyling: moving towards bonds and cash as a goal approaches."],
      ["Behaviour", "- Loss aversion: losses hurt about twice as much as equal gains feel good.", "- Recency bias, herding, overconfidence, the disposition effect (selling winners, holding losers).", "! The biggest risk to most investors is panic selling in a crash. Decide your plan in advance and automate it."],
    ] },
  time: { title: "Time, compounding and costs", lead: "Time is the investor's biggest ally and costs the biggest controllable enemy. Both compound.",
    sections: [
      ["Compounding", "- FV = PV(1 + r)ⁿ; regular saving FV = PMT × ((1 + r)ⁿ − 1)/r.", "- Pound-cost averaging: investing a fixed amount regularly buys more units when prices are low.", "- Reinvested dividends have made up a large share of long-run equity returns."],
      ["Drawdowns", "- Big falls happen: 2000–03 (dot-com), 2008–09 (financial crisis), 2020 (COVID).", "- A 50% fall needs a 100% gain to recover.", "- Diversification and a long horizon make drawdowns survivable."],
      ["Costs", "- Total cost = fund charges + platform fee + transaction costs.", "- Compare with a low-cost index alternative; ask what you get for the extra.", "> £100,000 over 30 years at 6% vs 5% after fees: about £574,000 vs £432,000."],
    ] },
};

export default {
  title: "Risk and return in 3D", kicker: "3D investing",
  intro: { title: "Explore risk and return", text: "Asset classes at their long-run risk and return, the efficient frontier above them, diversification cutting risk as holdings are added, and compounding towers growing over 30 years. Click anything for what it means for your money, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Watch out",
  quiz: "find it on the chart",
  motion: "Growth animating",
  camera: { pos: [1.1, 1.0, 2.2], target: [0.1, 0.35, 0], min: 0.05, max: 5 },
  views: { Chart: [[0.2, 0.55, 2.0], [0.1, 0.35, 0]], Side: [[2.0, 0.6, 0.3], [0.1, 0.35, 0]], Compounding: [[0.6, 0.7, 1.2], [0.75, 0.35, -0.5]], Diversification: [[-0.4, 0.6, 0.6], [-0.65, 0.25, -0.8]] },
  platform: { r: 1.1, y: -0.005 },
  labelMax: 3,
  explode: false,
  bg: ["#13304a", "#050b12"],
  build(k) {
    const { THREE, V, mat, glow, limb, tube, text, line, add, decor } = k;
    // axes: risk across, return up
    const O = V(-0.55, 0, 0.3);
    const ax = new THREE.Group();
    for (const [d, lab, c] of [[V(1.1, 0, 0), "Risk (volatility) →", "#9fdcff"], [V(0, 0.75, 0), "Expected return ↑", "#9fdcff"]]) { ax.add(limb(O, O.clone().add(d), 0.004, mat(c, { detail: "none", emissive: new THREE.Color("#1a4a5a") }), false)); const l = text(lab, { size: 0.035, colour: c }); l.position.copy(O.clone().add(d).add(d.clone().normalize().multiplyScalar(0.08))); ax.add(l); }
    for (let i = 1; i <= 5; i++) { ax.add(line([O.clone().add(V(i * 0.2, 0, 0)), O.clone().add(V(i * 0.2, 0.7, 0))], "#1d5a6b", 0.35)); ax.add(line([O.clone().add(V(0, i * 0.13, 0)), O.clone().add(V(1.05, i * 0.13, 0))], "#1d5a6b", 0.35)); }
    decor(ax, "assets");
    const at = (risk, ret) => O.clone().add(V(risk * 0.05, ret * 0.075, 0));   // risk and return in % a year
    const orbs = [];
    for (const [id, risk, ret, c, name] of [["cash", 0.5, 1, "#c8fbff", "Cash"], ["bonds", 6, 3, "#7ee0ff", "Bonds"], ["property", 12, 5.5, "#5ab4ff", "Property"], ["equities", 16, 7, "#5ef0ff", "Global shares"], ["emerging", 21, 8, "#4fd0ff", "Emerging markets"]]) {
      const g = new THREE.Group(); g.position.copy(at(risk, ret));
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.03 + risk * 0.0012, 32, 24), mat(c, { detail: "none", roughness: 0.15, clearcoat: 1, emissive: new THREE.Color(c).multiplyScalar(0.25) })); g.add(orb);
      const halo = new THREE.Mesh(new THREE.SphereGeometry(0.03 + risk * 0.004, 32, 24), glow(c, 0.12)); g.add(halo);   // the halo's size shows the spread of outcomes
      const l = text(name, { size: 0.03, bg: "rgba(0,0,0,0.5)" }); l.position.set(0, 0.07, 0); g.add(l);
      add(id, g); orbs.push(halo);
    }
    // the efficient frontier and capital market line
    const fr = []; for (let i = 0; i <= 40; i++) { const t = i / 40, risk = 3 + t * 19, ret = 1.2 + 7.6 * Math.sqrt(t) - 0.4 * t; fr.push(at(risk, ret).add(V(0, 0, 0.001))); }
    const frontier = new THREE.Group(); frontier.add(tube(fr, 0.007, mat("#f055dd", { detail: "none", emissive: new THREE.Color("#5a1050") }), 120));
    frontier.add(limb(at(0, 1), at(20, 9.4), 0.003, glow("#ffb3f0", 0.7), false));
    const fl = text("Efficient frontier", { size: 0.032, colour: "#ffb3f0", bg: "rgba(0,0,0,0.5)" }); fl.position.copy(at(9, 7.2)); frontier.add(fl);
    add("frontier", frontier);
    k.flow([fr], "#ffd0f6", 18, 0.15, "portfolio", 0.014);
    // diversification: risk falling as holdings are added (a curve of bars)
    const dv = new THREE.Group(); dv.position.set(-0.95, 0, -0.8);
    for (let n = 1; n <= 30; n++) { const risk = 0.12 + 0.3 / Math.sqrt(n), bar = new THREE.Mesh(new THREE.BoxGeometry(0.016, risk, 0.05), mat(n < 6 ? "#ff5a9a" : "#f055dd", { detail: "none", clearcoat: 1, roughness: 0.2, emissive: new THREE.Color("#3a0a30") })); bar.position.set(n * 0.02, risk / 2, 0); dv.add(bar); }
    const floor = limb(V(0.01, 0.12, 0.03), V(0.62, 0.12, 0.03), 0.002, glow("#ffffff", 0.6), false); dv.add(floor);
    const dl = text("Risk falls as you add holdings; market risk remains", { size: 0.024, bg: "rgba(0,0,0,0.55)" }); dl.position.set(0.32, 0.5, 0.05); dv.add(dl);
    add("diversification", dv);
    // compounding towers: £10,000 over 30 years at 4% and 7%, and at 7% with 1% fees
    const towers = [];
    const cg = new THREE.Group(); cg.position.set(0.45, 0, -0.6);
    const fg = new THREE.Group(); fg.position.set(0.45, 0, -0.85);
    for (const [grp, r, c, lab, id] of [[cg, 0.07, "#ffe066", "7% a year", "compounding"], [cg, 0.04, "#ffb36b", "4% a year", "compounding"], [fg, 0.06, "#ff9f40", "7% minus 1% fees", "fees"]]) {
      const row = new THREE.Group(); row.position.z = r === 0.04 ? 0.12 : 0; grp.add(row);
      for (let y = 0; y <= 30; y += 3) { const v = (1 + r) ** y, h = v * 0.06, coin = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, h, 24), mat(c, { detail: "none", metalness: 0.8, roughness: 0.25 })); coin.position.set(y * 0.022, h / 2, 0); coin.userData.h = h; coin.scale.y = 1; row.add(coin); towers.push(coin); }
      const l = text(lab, { size: 0.026, bg: "rgba(0,0,0,0.55)" }); l.position.set(0.33, 0.55, 0.0); row.add(l);
      if (!grp.userData.added) { add(id, grp); grp.userData.added = true; }
    }
    k.tick((t, dt, motion) => {
      if (!motion) return;
      const g = (Math.sin(t * 0.5) + 1) / 2 * 0.6 + 0.4;   // towers rise and settle, like years passing
      towers.forEach((c, i) => { const f = Math.min(1, g * 1.4 - (i % 11) * 0.03); c.scale.y = Math.max(0.05, f); c.position.y = c.userData.h * c.scale.y / 2; });
      orbs.forEach((o, i) => o.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.08));
    });
  },
};
