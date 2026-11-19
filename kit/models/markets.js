// InvestorGradify's 3D model: risk, return and time. Six asset classes stand on a risk/return chart; a curve
// shows how mixing shares and bonds lowers risk (diversification); a portfolio marker and a mix ring follow
// the slider; and two rows of bars show £1,000 compounding at 5% a year against inflation eating 3% a year.
// The figures are illustrative long-run assumptions for teaching, not forecasts. Education, not advice.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  assets: { name: "Asset classes", c: "#5ec8ff" },
  portfolio: { name: "Building a portfolio", c: "#c58cff" },
  growth: { name: "Time and growth", c: "#f2b84b" },
};

// illustrative long-run annual figures: [risk (volatility, %), expected return (%)]
const PTS = { cash: [1, 2.5], gilts: [6, 3.5], corporate: [8, 4.5], property: [13, 6], shares: [16, 7], emerging: [22, 8] };

const STRUCTURES = {
  cash: s("assets", "Cash", "Money in a bank or building society account. Very low risk of losing money, but low returns, which inflation can overtake.",
    ["In the UK the **FSCS** protects deposits up to **£120,000** per person per authorised bank (raised from £85,000 in December 2025).", "If inflation is higher than the interest rate, cash loses **real value** (buying power) every year.", "Cash is for an **emergency fund** and money needed in the next few years, not for long-term growth."],
    [["What does the FSCS protect?", "Deposits up to £120,000 per person per authorised bank or building society, if it fails."], ["What is the main risk of holding cash for the long term?", "Inflation: its real value (buying power) falls if interest is lower than inflation."], ["What is cash best used for?", "An emergency fund and short-term needs."]],
    ["cash", "savings", "fscs", "deposit", "emergency fund"]),
  gilts: s("assets", "Government bonds (gilts)", "Loans to the government, which pays a fixed interest (the **coupon**) and repays the loan at the end. UK government bonds are called gilts.",
    ["Bond prices move **opposite to interest rates**: when rates rise, existing bonds with lower coupons fall in price.", "The **yield** is the return you get at today's price; longer bonds are more sensitive to rate changes (higher **duration**).", "The UK government has never failed to pay its gilts, so they're seen as low **credit risk**."],
    [["What is a bond's coupon?", "The fixed interest payment the issuer makes to the bondholder."], ["What happens to bond prices when interest rates rise?", "They fall."], ["What is a gilt?", "A bond issued by the UK government."]],
    ["gilts", "government bonds", "bonds", "coupon", "yield", "duration", "interest rates"]),
  corporate: s("assets", "Corporate bonds", "Loans to companies. They pay more than gilts because there's more chance the company can't pay: **credit risk**.",
    ["Credit rating agencies grade issuers; **BBB−** (S&P, Fitch) or **Baa3** (Moody's) and above is **investment grade**.", "Lower-rated bonds (**high yield** or junk) pay more interest to compensate for a higher risk of default.", "In a company's failure, bondholders are paid before shareholders."],
    [["What is credit risk?", "The risk the borrower can't pay the interest or repay the loan (default)."], ["What rating is the lowest investment grade at S&P?", "BBB−."], ["Who is paid first if a company fails: bondholders or shareholders?", "Bondholders."]],
    ["corporate bonds", "credit risk", "credit rating", "investment grade", "high yield", "default"]),
  property: s("assets", "Property", "Commercial and residential buildings, which earn rent and can rise in value. Most investors hold it through funds or **REITs**.",
    ["UK **REITs** must pay out at least **90%** of their property rental profits as dividends.", "Buildings are **illiquid**: they take months to sell, so property funds can suspend withdrawals in a crisis.", "Rents often rise with inflation, so property can partly protect against it."],
    [["What is a REIT?", "A real estate investment trust: a listed company that owns property and pays out most of its rental profits."], ["Why is direct property described as illiquid?", "It can't be sold quickly without a big price cut."], ["Why might property protect against inflation?", "Rents and property values often rise with prices."]],
    ["property", "reit", "real estate", "illiquid", "rent"]),
  shares: s("assets", "Shares (equities)", "Part-ownership of companies. Shareholders get a share of profits (dividends) and of growth in the company's value, but prices can fall sharply.",
    ["Returns come from **dividends** plus **capital growth** (a rising share price).", "Over long periods shares have usually beaten cash and bonds, but they can fall **30% or more** in a crash and take years to recover.", "An **index fund** (such as a FTSE 100 or global tracker) buys every company in an index, cheaply."],
    [["What are the two sources of return from shares?", "Dividends and capital growth."], ["Why are shares described as higher risk?", "Their prices are more volatile and can fall sharply, for long periods."], ["What is an index fund?", "A fund that tracks a market index by holding all (or a sample of) the shares in it."]],
    ["shares", "equities", "stocks", "dividends", "capital growth", "index fund", "tracker", "ftse"]),
  emerging: s("assets", "Emerging market shares", "Shares in companies in faster-growing economies such as India, China and Brazil: more growth potential, and more risk.",
    ["Extra risks: **currency** swings, **political** change, and weaker investor protection.", "Higher volatility means a bumpier ride, even when long-run returns are higher.", "A global fund holds a little of each region, so no single country dominates."],
    [["Name two extra risks of emerging market investing.", "Any two of: currency risk, political risk, weaker regulation and investor protection, lower liquidity."], ["Why might emerging markets offer higher returns?", "Their economies and companies may grow faster."], ["What is currency risk?", "The risk that exchange rate changes reduce the value of an overseas investment in pounds."]],
    ["emerging markets", "currency risk", "political risk", "volatility"]),
  frontier: s("portfolio", "Diversification curve", "Every mix of shares and bonds, from 0% to 100% shares. It bends to the left of the straight line between them: mixing two assets that don't move together gives **less risk than the average** of the two.",
    ["**Harry Markowitz** (1952) showed how to build portfolios with the highest expected return for each level of risk: the **efficient frontier**. He shared the 1990 Nobel prize in economics.", "The benefit depends on **correlation**: the less two assets move together, the more the curve bends.", "Diversification reduces risk specific to one company or sector; it can't remove **market risk**, which hits everything."],
    [["What is diversification?", "Spreading money across investments that don't all move together, to reduce risk."], ["What is the efficient frontier?", "The set of portfolios with the highest expected return for each level of risk (Markowitz)."], ["Can diversification remove all risk?", "No: it reduces specific risk, but market (systematic) risk remains."]],
    ["diversification", "efficient frontier", "markowitz", "correlation", "portfolio theory"]),
  mix: s("portfolio", "Your portfolio", "The glowing marker and the ring show the portfolio chosen with the slider: the share of shares against bonds, and where that puts it on the curve.",
    ["**Asset allocation** (how much in shares, bonds, cash) drives most of a portfolio's risk and return.", "**Rebalancing** sells what has grown and buys what has fallen, back to your target mix.", "Your mix should fit your **time horizon** and **capacity for loss**, not just how you feel about risk."],
    [["What is asset allocation?", "How a portfolio is divided between asset classes such as shares, bonds and cash."], ["What is rebalancing?", "Selling some of what has grown and buying what has fallen, to restore the target mix."], ["Why might someone investing for 30 years hold more shares than someone investing for 3?", "They have time to recover from falls, so can take more short-term risk for higher expected returns."]],
    ["asset allocation", "rebalancing", "time horizon", "risk tolerance", "capacity for loss", "portfolio"]),
  compound: s("growth", "Compound growth", "£1,000 growing at 5% a year, with the growth reinvested. Each year's return earns returns of its own, so the bars curve upwards. Slide the years.",
    ["After 40 years at 5%, £1,000 becomes about **£7,040**; at simple interest it would be £3,000.", "The **rule of 72**: money doubles in roughly 72 ÷ the rate years (about 14 years at 5%).", "Fees compound too: 1% a year in charges takes a large bite out of long-run returns."],
    [["What is compound growth?", "Growth on the original sum and on the growth already earned."], ["Using the rule of 72, how long to double money at 6%?", "About 12 years."], ["Roughly what does £1,000 become after 40 years at 5% a year, compounded?", "About £7,040."]],
    ["compound interest", "compound growth", "compounding", "rule of 72", "reinvest"]),
  inflation: s("growth", "Inflation", "The buying power of £1,000 kept as notes while prices rise 3% a year: after 40 years it buys what about £307 buys today.",
    ["The Bank of England's target is **2%** CPI inflation a year.", "**Real return** ≈ nominal return − inflation: 5% growth with 3% inflation is about 2% real.", "Inflation is why 'safe' cash can lose money over the long term."],
    [["What is a real return?", "The return after inflation: roughly the nominal return minus the inflation rate."], ["What is the Bank of England's inflation target?", "2% a year (CPI)."], ["What happens to £1,000 of cash's buying power over 40 years of 3% inflation?", "It falls to about £307 in today's money."]],
    ["inflation", "real return", "purchasing power", "cpi", "bank of england"]),
};

const NOTES = {
  assets: { title: "Asset classes", lead: "The main things you can invest in, each with its own mix of **risk** and expected **return**. Higher expected returns come with a bumpier ride: there's no reward without risk.",
    sections: [
      ["Risk and return", "- **Risk** here is **volatility**: how much returns swing around (the standard deviation of returns).", "- From lowest to highest: cash → government bonds → corporate bonds → property → shares → emerging markets.", "> The chart's figures are illustrative long-run assumptions, not forecasts. Real returns vary a lot from year to year."],
      ["Lending and owning", "- **Lending** (cash, bonds): you're paid interest and get your money back, if the borrower can pay.", "- **Owning** (shares, property): you share in profits and growth, and in losses.", "Lenders are paid before owners, which is why owning is riskier, and why it's expected to pay more over time."],
      ["Wrappers in the UK", "- **ISAs**: up to £20,000 a year across all ISAs, with no tax on the growth or income.", "- **Pensions**: tax relief on contributions; usually locked until your late 50s.", "- **General investment accounts**: no limits, but gains and income may be taxed."],
    ] },
  portfolio: { title: "Building a portfolio", lead: "A portfolio combines assets so that, together, they fit your goal and time horizon. The trick is **diversification**: owning things that don't all fall at once.",
    sections: [
      ["Why mixing works", "If shares fall when bonds hold steady, a mix of the two swings less than shares alone. The curve on the chart shows this: a 60/40 mix has less risk than the average of the two assets' risks.", "Diversify **across** asset classes, and **within** them: many companies, sectors and countries."],
      ["Choosing a mix", "- **Goal**: what the money is for.", "- **Time horizon**: when you need it.", "- **Capacity for loss**: how big a fall you could live with without changing your plans.", "- **Costs**: low-cost index funds keep more of the return."],
      ["Staying the course", "- **Rebalance** periodically to your target mix.", "- **Pound-cost averaging**: investing a fixed amount regularly buys more when prices are low.", "- Selling in a crash turns a temporary fall into a permanent loss.", "> This is education, not financial advice. For personal advice, use an FCA-authorised adviser."],
    ] },
  growth: { title: "Time, compounding and inflation", lead: "Time is the investor's biggest advantage: compounding makes growth accelerate, while inflation quietly shrinks money that isn't growing.",
    sections: [
      ["Compounding", "Value after n years = starting sum × (1 + r)ⁿ.", "- £1,000 at 5%: about £1,629 after 10 years, £2,653 after 20, £7,040 after 40.", "- The **rule of 72** gives the doubling time: 72 ÷ r."],
      ["Inflation", "Prices rise over time, so each pound buys less.", "- At 3% inflation, buying power halves in about 24 years.", "- **Real return** = nominal return − inflation (approximately).", "Investing aims to grow money **faster than inflation**."],
      ["Costs and time", "A 1% annual fee on a 5% return leaves 4%: after 40 years, £1,000 grows to about £4,800 instead of £7,040. Small percentages compound into large amounts, in both directions."],
    ] },
};

export default {
  title: "Risk and return in 3D", kicker: "3D investing",
  intro: { title: "Risk, return and time", text: "Six asset classes on a risk/return chart, a curve that shows why diversification works, and £1,000 compounding against inflation. Move the sliders to change your mix and the years invested. Figures are illustrative; this is education, not financial advice." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Key point",
  quiz: "find the asset",
  motion: "Markets moving",
  trueColour: true,
  sliders: [{ key: "mix", label: "Shares in the portfolio", value: 60 }, { key: "years", label: "Years invested", value: 100 }],
  camera: { pos: [0.1, 1.15, 2.6], target: [0.05, 0.25, 0.0], min: 0.3, max: 5 },
  views: { Overview: [[0.1, 1.15, 2.6], [0.05, 0.25, 0.0]], "Risk and return": [[-0.45, 0.45, 1.35], [-0.5, 0.25, -0.2]], Compounding: [[0.62, 0.55, 1.35], [0.6, 0.2, 0.15]] },
  platform: { r: 0.55 },
  shadow: { left: -1.5, right: 1.5, top: 1.3, bottom: -1.3, near: 0.5, far: 9 },
  explode: false,
  build(k) {
    const { THREE, V, mat, text, add, decor, box, tube } = k;
    const at = (o, x, y, z, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; return o; };
    const paint = (c, r = 0.4) => mat(c, { detail: "none", roughness: r, clearcoat: 0.5 });
    const glass = mat("#d6ecf4", { detail: "none", transparent: true, opacity: 0.14, roughness: 0.05, clearcoat: 1, depthWrite: false });
    const live = (grp, size = 0.022, colour = "#eaffff") => {
      let sp = null, last = "";
      return { set(t, x, y, z) { if (t !== last) { if (sp) { sp.parent?.remove(sp); sp.material.map?.dispose(); sp.material.dispose(); } sp = text(t, { size, colour, bg: "rgba(0,0,0,0.6)" }); decor(sp, grp); last = t; } sp.position.set(x, y, z); } };
    };
    const lab = (t, x, y, z, grp, size = 0.024, colour) => { const l = text(t, { size, colour, bg: "rgba(0,0,0,0.6)" }); l.position.set(x, y, z); decor(l, grp); return l; };

    decor(at(box(2.5, 0.02, 1.4, mat("#23262c", { detail: "fibre", repeat: 4, bump: 0.12, roughness: 0.75, clearcoat: 0.3 })), 0, -0.01, 0));

    // ---------- the risk/return chart: a back panel with axes, risk across, return up ----------
    const CX0 = -1.08, CZ = -0.25, SX = 0.042, SY = 0.055, CY0 = 0.03;   // 1% risk = SX m, 1% return = SY m
    const P = (risk, ret, z = CZ) => V(CX0 + risk * SX, CY0 + ret * SY, z);
    const chart = new THREE.Group();
    chart.add(at(box(1.08, 0.52, 0.01, glass), CX0 + 0.52, CY0 + 0.25, CZ - 0.04));
    chart.add(tube([P(0, 0, CZ - 0.03), P(25, 0, CZ - 0.03)], 0.004, paint("#d8dde4"), 2, false, 8));
    chart.add(tube([P(0, 0, CZ - 0.03), P(0, 9, CZ - 0.03)], 0.004, paint("#d8dde4"), 2, false, 8));
    for (let r = 5; r <= 25; r += 5) chart.add(at(box(0.002, 0.5, 0.002, paint("#5a616c")), CX0 + r * SX, CY0 + 0.25, CZ - 0.034));
    for (let y = 2; y <= 8; y += 2) chart.add(at(box(1.06, 0.002, 0.002, paint("#5a616c")), CX0 + 0.53, CY0 + y * SY, CZ - 0.034));
    decor(chart, "assets");
    lab("Risk (volatility) →", CX0 + 0.85, CY0 - 0.04, CZ, "assets", 0.022);
    lab("↑ Expected return", CX0 - 0.02, CY0 + 0.53, CZ, "assets", 0.022);
    for (let r = 0; r <= 25; r += 5) lab(`${r}%`, CX0 + r * SX, CY0 - 0.012, CZ + 0.02, "assets", 0.016);
    for (let y = 2; y <= 8; y += 2) lab(`${y}%`, CX0 - 0.04, CY0 + y * SY, CZ + 0.02, "assets", 0.016);

    const COL = { cash: "#9fd6a5", gilts: "#7ab6e8", corporate: "#5a8fd6", property: "#d6a463", shares: "#c56bd6", emerging: "#e2574c" };
    const NAME = { cash: "Cash", gilts: "Gilts", corporate: "Corporate bonds", property: "Property", shares: "Shares", emerging: "Emerging markets" };
    const orbs = {};
    for (const [id, [risk, ret]] of Object.entries(PTS)) {
      const g = new THREE.Group(), p = P(risk, ret);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.03, 32, 24), paint(COL[id], 0.25)); g.add(at(orb, p.x, p.y, p.z));
      g.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, p.y - 0.005, 8), paint(COL[id], 0.5)), p.x, p.y / 2, p.z));   // a stalk down to the floor
      g.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.004, 24), paint(COL[id], 0.5)), p.x, 0.002, p.z));
      add(id, g); orbs[id] = orb;
      lab(NAME[id], p.x, p.y + 0.055, p.z + 0.01, "assets", 0.02);
    }

    // ---------- diversification: every mix of gilts and shares, against the straight line ----------
    const [rb, eb] = PTS.gilts, [rs, es] = PTS.shares, RHO = 0.2;
    const risk = (w) => Math.sqrt(w * w * rs * rs + (1 - w) * (1 - w) * rb * rb + 2 * w * (1 - w) * RHO * rs * rb), ret = (w) => eb + (es - eb) * w;
    const curvePts = []; for (let i = 0; i <= 40; i++) { const w = i / 40; curvePts.push(P(risk(w), ret(w), CZ + 0.01)); }
    const frontier = new THREE.Group();
    frontier.add(tube(curvePts, 0.006, paint("#c58cff", 0.3), 120, false, 10));
    for (let i = 0; i < 12; i++) { const a = P(rb + (rs - rb) * (i / 12), eb + (es - eb) * (i / 12), CZ + 0.01), b = P(rb + (rs - rb) * ((i + 0.5) / 12), eb + (es - eb) * ((i + 0.5) / 12), CZ + 0.01); frontier.add(tube([a, b], 0.0025, paint("#8a8f99", 0.5), 2, false, 6)); }   // the dashed no-benefit line
    add("frontier", frontier);
    lab("Mixes of gilts and shares", P(9, 6.4).x, P(9, 6.4).y, CZ + 0.02, "portfolio", 0.019, "#e0c8ff");

    // the chosen portfolio: a glowing marker on the curve, and a ring showing the mix, in front of the chart
    const mixG = new THREE.Group();
    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.024, 32, 24), new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#c58cff", emissiveIntensity: 0.9, roughness: 0.2 }));
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.004, 8, 40), new THREE.MeshStandardMaterial({ color: "#c58cff", emissive: "#c58cff", emissiveIntensity: 0.6 }));
    mixG.add(marker, halo);
    const RX = -0.42, RZ = 0.32, RIN = 0.08, ROUT = 0.15;
    const ring = new THREE.Group(); ring.position.set(RX, 0.05, RZ); mixG.add(ring);
    mixG.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.18, 0.03, 48), paint("#2b2f36", 0.6)), RX, 0.015, RZ));
    add("mix", mixG);
    lab("Your mix", RX, 0.26, RZ, "portfolio", 0.024);
    const mixL = live("portfolio", 0.02), sharesM = paint(COL.shares, 0.3), bondsM = paint(COL.gilts, 0.3);
    const sector = (a0, a1, m) => { const sh = new THREE.Shape(); sh.absarc(0, 0, ROUT, a0, a1, false); sh.absarc(0, 0, RIN, a1, a0, true); const g = new THREE.ExtrudeGeometry(sh, { depth: 0.05, bevelEnabled: true, bevelSize: 0.003, bevelThickness: 0.003, bevelSegments: 2, curveSegments: 48 }); const me = new THREE.Mesh(g, m); me.rotation.x = -Math.PI / 2; return me; };
    function setMix(w) {
      const p = P(risk(w), ret(w), CZ + 0.012); marker.position.copy(p); halo.position.copy(p);
      ring.children.forEach((c) => { c.geometry.dispose(); }); ring.clear();
      const gap = 0.04, A = w * Math.PI * 2;
      if (w > 0.01) ring.add(sector(Math.PI / 2 + gap / 2, Math.PI / 2 + Math.max(gap, A) - gap / 2, sharesM));
      if (w < 0.99) ring.add(sector(Math.PI / 2 + A + gap / 2, Math.PI / 2 + Math.PI * 2 - gap / 2, bondsM));
      ring.children.forEach((c) => { c.userData.id = "mix"; c.castShadow = true; });
      mixL.set(`${Math.round(w * 100)}% shares · ${Math.round((1 - w) * 100)}% gilts → return ${ret(w).toFixed(1)}%, risk ${risk(w).toFixed(1)}%`, RX, 0.21, RZ + 0.02);
    }

    // ---------- compounding and inflation: two rows of bars, one per 2 years ----------
    const GX0 = 0.12, GSTEP = 0.044, GZ1 = 0.05, GZ2 = 0.32, HS = 0.00007;   // metres per £
    const compound = new THREE.Group(), inflation = new THREE.Group(), cb = [], ib = [];
    const gold = paint("#e2b23a", 0.3), red = paint("#d6735e", 0.4);
    for (let i = 0; i <= 20; i++) {
      const yrs = i * 2, v1 = 1000 * Math.pow(1.05, yrs), v2 = 1000 / Math.pow(1.03, yrs);
      const b1 = box(0.03, v1 * HS, 0.05, gold, 0.004); b1.position.set(GX0 + i * GSTEP, (v1 * HS) / 2, GZ1); compound.add(b1); cb.push(b1);
      const b2 = box(0.03, v2 * HS, 0.05, red, 0.004); b2.position.set(GX0 + i * GSTEP, (v2 * HS) / 2, GZ2); inflation.add(b2); ib.push(b2);
    }
    compound.add(at(box(21 * GSTEP + 0.02, 0.006, 0.08, paint("#2b2f36", 0.6)), GX0 + 10 * GSTEP, 0.003, GZ1));
    inflation.add(at(box(21 * GSTEP + 0.02, 0.006, 0.08, paint("#2b2f36", 0.6)), GX0 + 10 * GSTEP, 0.003, GZ2));
    const simple = []; for (let i = 0; i <= 20; i++) simple.push(V(GX0 + i * GSTEP, (1000 + 50 * i * 2) * HS, GZ1 - 0.035));
    compound.add(tube(simple, 0.003, paint("#9aa0a8", 0.5), 60, false, 6));   // simple interest, for comparison
    add("compound", compound); add("inflation", inflation);
    lab("£1,000 growing at 5% a year", GX0 + 0.45, 0.6, GZ1 - 0.04, "growth", 0.022);
    lab("Grey line: simple interest", GX0 + 0.1, 0.18, GZ1 - 0.05, "growth", 0.016, "#c8ccd2");
    lab("£1,000 of cash, 3% inflation", GX0 + 0.45, 0.13, GZ2 + 0.03, "growth", 0.022);
    const cL = live("growth", 0.021, "#ffe08a"), iL = live("growth", 0.021, "#ffc2b4"), yL = live("growth", 0.024);
    function setYears(v) {
      const n = Math.round(v * 20);
      cb.forEach((b, i) => { b.visible = i <= n; }); ib.forEach((b, i) => { b.visible = i <= n; });
      const yrs = n * 2, c1 = 1000 * Math.pow(1.05, yrs), c2 = 1000 / Math.pow(1.03, yrs);
      cL.set(`£${Math.round(c1).toLocaleString("en-GB")}`, GX0 + n * GSTEP, c1 * HS + 0.035, GZ1);
      iL.set(`£${Math.round(c2).toLocaleString("en-GB")}`, GX0 + n * GSTEP, c2 * HS + 0.035, GZ2);
      yL.set(`${yrs} years`, GX0 + n * GSTEP, 0.012, GZ2 + 0.09);
    }
    k.slider("mix", setMix); k.slider("years", setYears);
    setMix(0.6); setYears(1);

    // markets move: the asset orbs bob by their volatility; the marker pulses
    k.tick((t, dt, motion) => {
      if (!motion) return;
      for (const [id, o] of Object.entries(orbs)) { const [r, e] = PTS[id]; o.position.y = CY0 + e * SY + Math.sin(t * (0.8 + r * 0.05) + r) * r * 0.0011; }
      const sc = 1 + Math.sin(t * 2.4) * 0.12; halo.scale.setScalar(sc); halo.rotation.y = t * 0.8;
    });
  },
};
