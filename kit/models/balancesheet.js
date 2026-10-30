// FinanceGradify's 3D model: the accounting equation as two towers that always balance (assets on
// one side, liabilities and equity on the other) with the income statement as a waterfall whose
// profit flows into retained earnings, and cash moving between them. Notes cover reporting,
// analysis, valuation and the cash flow statement.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  assets: { name: "Assets", c: "#5ef0ff" },
  claims: { name: "Liabilities & equity", c: "#f055dd" },
  income: { name: "Income statement", c: "#6bffb8" },
  cash: { name: "Cash & valuation", c: "#ffe066" },
};

const STRUCTURES = {
  ppe: s("assets", "Property, plant and equipment", "Non-current tangible assets used over more than a year: land, buildings, machinery, vehicles (IAS 16).",
    ["Carried at cost less accumulated **depreciation** (or revalued); land isn't depreciated.", "Straight-line depreciation = (cost − residual value) ÷ useful life; reducing balance applies a % to the carrying amount.", "Impairment (IAS 36): write down if the carrying amount exceeds the recoverable amount."],
    [["How is straight-line depreciation calculated?", "(Cost − residual value) ÷ useful life."], ["Which non-current asset is usually not depreciated?", "Land."], ["When is an asset impaired?", "When its carrying amount exceeds its recoverable amount (higher of fair value less costs to sell and value in use)."]],
    ["property plant", "ppe", "non-current asset", "fixed asset", "depreciation", "impairment", "ias 16"]),
  intangibles: s("assets", "Intangible assets and goodwill", "Non-physical assets: patents, brands, software, and goodwill from acquisitions.",
    ["**Goodwill** = consideration paid − fair value of net assets acquired; tested annually for impairment, not amortised (IFRS 3).", "Internally generated brands can't be capitalised; development costs can, if IAS 38 criteria are met.", "Research costs are always expensed."],
    [["How is goodwill calculated on acquisition?", "Consideration transferred (plus NCI) minus the fair value of identifiable net assets acquired."], ["Can research costs be capitalised?", "No: research is expensed; development can be capitalised if the IAS 38 criteria are met."], ["Is goodwill amortised under IFRS?", "No, it's tested annually for impairment."]],
    ["intangible", "goodwill", "brand", "patent", "ias 38", "ifrs 3", "amortis"]),
  inventory: s("assets", "Inventory", "Goods held for sale or in production. A current asset valued at the lower of cost and net realisable value (IAS 2).",
    ["Cost formulas: FIFO or weighted average (LIFO isn't allowed under IFRS).", "Inventory days = inventory ÷ cost of sales × 365.", "Closing inventory reduces cost of sales: overstating it overstates profit."],
    [["How is inventory valued under IAS 2?", "At the lower of cost and net realisable value."], ["Is LIFO allowed under IFRS?", "No."], ["How do you calculate inventory days?", "Inventory ÷ cost of sales × 365."]],
    ["inventory", "stock", "ias 2", "fifo", "net realisable value", "inventory days"]),
  receivables: s("assets", "Trade receivables", "Money owed by customers who bought on credit.",
    ["Receivables days = trade receivables ÷ revenue × 365.", "Expected credit loss allowance (IFRS 9) reduces receivables for amounts unlikely to be collected.", "Factoring sells receivables for cash now, at a discount."],
    [["How do you calculate receivables days?", "Trade receivables ÷ credit sales (revenue) × 365."], ["What is factoring?", "Selling receivables to a third party for immediate cash, at a discount."], ["Under which standard are expected credit losses recognised?", "IFRS 9."]],
    ["receivable", "debtor", "credit", "receivable days", "bad debt", "ifrs 9"]),
  cashAsset: s("assets", "Cash and equivalents", "Cash in hand and at bank, and short-term highly liquid investments (typically maturing within three months).",
    ["Profit isn't cash: a profitable business can fail if it runs out of cash.", "Current ratio = current assets ÷ current liabilities; quick (acid-test) ratio excludes inventory.", "The cash flow statement explains the movement in this line."],
    [["Why can a profitable business fail?", "It can run out of cash, e.g. through overtrading, slow-paying customers or large investments."], ["What is the quick ratio?", "(Current assets − inventory) ÷ current liabilities."], ["What counts as a cash equivalent?", "Short-term, highly liquid investments readily convertible to known cash with insignificant risk of value change (usually <3 months)."]],
    ["cash", "liquidity", "current ratio", "quick ratio", "acid test", "working capital"]),
  payables: s("claims", "Current liabilities", "Obligations due within a year: trade payables, short-term borrowings, accruals, tax payable.",
    ["Payables days = trade payables ÷ cost of sales × 365.", "Working capital cycle = inventory days + receivables days − payables days.", "Accruals: expenses incurred but not yet paid (the accruals/matching concept)."],
    [["How is the working capital (cash operating) cycle calculated?", "Inventory days + receivables days − payables days."], ["What is an accrual?", "An expense incurred in the period but not yet paid, recognised as a liability."], ["How do you calculate payables days?", "Trade payables ÷ cost of sales (or purchases) × 365."]],
    ["current liabilit", "payable", "creditor", "accrual", "working capital cycle"]),
  borrowings: s("claims", "Non-current liabilities", "Obligations due after more than a year: long-term loans, bonds, lease liabilities, provisions.",
    ["Gearing = debt ÷ (debt + equity); high gearing raises financial risk and returns to shareholders in good years.", "IFRS 16: most leases go on the balance sheet as a right-of-use asset and a lease liability.", "Provisions (IAS 37): a present obligation, probable outflow and reliable estimate."],
    [["What is gearing?", "The proportion of capital funded by debt: debt ÷ (debt + equity)."], ["How does IFRS 16 treat a lessee's leases?", "A right-of-use asset and a lease liability on the balance sheet (except short-term and low-value leases)."], ["When is a provision recognised?", "Present obligation from a past event, probable outflow, and a reliable estimate (IAS 37)."]],
    ["non-current liabilit", "loan", "debt", "gearing", "leverage", "bond", "ifrs 16", "provision"]),
  shareCapital: s("claims", "Share capital", "Money raised from shareholders by issuing shares: nominal value plus share premium.",
    ["Equity = assets − liabilities: the owners' residual interest.", "Issuing shares at a premium credits share capital (nominal) and share premium.", "Dividends are paid from retained earnings, not share capital."],
    [["What is equity?", "The residual interest in the assets after deducting liabilities."], ["What is the journal for issuing 1,000 £1 shares at £3?", "Dr Cash £3,000; Cr Share capital £1,000; Cr Share premium £2,000."], ["Can dividends be paid from share capital?", "No: from distributable reserves (retained earnings)."]],
    ["share capital", "equity", "share premium", "shareholder", "issue"]),
  retained: s("claims", "Retained earnings", "Accumulated profits kept in the business rather than paid as dividends. Each year's profit flows in here.",
    ["Closing retained earnings = opening + profit for the year − dividends.", "This is how the income statement links to the balance sheet.", "ROE = profit after tax ÷ equity × 100."],
    [["How do retained earnings change in a year?", "Opening balance + profit for the year − dividends paid."], ["How does the income statement connect to the balance sheet?", "Profit for the year is added to retained earnings in equity."], ["Define return on equity.", "Profit after tax ÷ shareholders' equity × 100."]],
    ["retained earnings", "reserves", "dividend", "return on equity", "roe"]),
  revenue: s("income", "Revenue", "Income from ordinary activities, recognised when control of goods or services passes to the customer (IFRS 15).",
    ["IFRS 15 five steps: identify the contract, identify performance obligations, determine the price, allocate it, recognise as obligations are satisfied.", "Revenue growth is the top line every analysis starts with.", "Recognising revenue early is a classic manipulation."],
    [["List the five steps of IFRS 15.", "Identify the contract; identify performance obligations; determine the transaction price; allocate it to obligations; recognise revenue as each is satisfied."], ["When is revenue recognised?", "When (or as) control of the goods or services transfers to the customer."], ["Why is revenue recognition a fraud risk?", "Bringing revenue forward inflates profit and growth."]],
    ["revenue", "sales", "turnover", "ifrs 15", "top line"]),
  costs: s("income", "Costs and expenses", "Cost of sales gives gross profit; operating expenses (distribution, admin) give operating profit; then finance costs and tax.",
    ["Gross margin = gross profit ÷ revenue; operating margin = operating profit ÷ revenue.", "Interest cover = operating profit ÷ finance costs.", "The matching (accruals) concept: expenses recognised in the period of the revenue they help earn."],
    [["How is interest cover calculated?", "Operating profit (PBIT) ÷ finance costs."], ["What is the matching concept?", "Expenses are recognised in the same period as the revenues they help generate."], ["What sits between gross profit and operating profit?", "Operating expenses: distribution costs and administrative expenses."]],
    ["cost of sales", "expense", "gross profit", "operating profit", "interest cover", "margin"]),
  profit: s("income", "Profit for the year", "What's left after all costs, interest and tax: the bottom line, flowing into retained earnings.",
    ["EPS = profit attributable to ordinary shareholders ÷ weighted average number of shares.", "P/E ratio = share price ÷ EPS.", "EBITDA adds back depreciation and amortisation: a rough proxy for operating cash flow."],
    [["How is earnings per share calculated?", "Profit attributable to ordinary shareholders ÷ weighted average number of ordinary shares."], ["What is the P/E ratio?", "Share price ÷ earnings per share."], ["What is EBITDA?", "Earnings before interest, tax, depreciation and amortisation."]],
    ["profit", "net income", "earnings", "eps", "p/e", "ebitda", "bottom line"]),
  cashflow: s("cash", "Cash flow statement", "Explains the change in cash: operating, investing and financing activities (IAS 7).",
    ["Indirect method: start with profit before tax, add back non-cash items (depreciation), adjust for working capital, deduct tax and interest paid.", "Free cash flow ≈ operating cash flow − capital expenditure.", "Investing: buying and selling non-current assets. Financing: shares, loans, dividends (or operating, by choice)."],
    [["Name the three sections of a cash flow statement.", "Operating, investing and financing activities."], ["Why is depreciation added back in the indirect method?", "It's a non-cash expense that reduced profit."], ["What is free cash flow?", "Operating cash flow minus capital expenditure (and often interest and tax)."]],
    ["cash flow", "ias 7", "free cash flow", "operating cash", "capex"]),
  dcf: s("cash", "Valuation (DCF)", "A business is worth the present value of the cash it will generate: future cash flows discounted at the cost of capital.",
    ["PV = CF ÷ (1 + r)ⁿ; NPV = Σ PV − initial investment. Accept if NPV > 0.", "WACC = (E/V)Ke + (D/V)Kd(1 − t); Ke from CAPM: Rf + β(Rm − Rf).", "Terminal value (Gordon growth): CFₙ₊₁ ÷ (r − g)."],
    [["What is the present value of £1,000 in 2 years at 10%?", "1,000 ÷ 1.1² ≈ £826."], ["State the CAPM formula.", "Ke = Rf + β(Rm − Rf)."], ["How is terminal value calculated with the Gordon growth model?", "Next year's cash flow ÷ (discount rate − growth rate)."]],
    ["dcf", "discounted cash flow", "npv", "present value", "wacc", "capm", "valuation", "terminal value"]),
};

const NOTES = {
  assets: { title: "Assets", lead: "Resources the entity controls as a result of past events, expected to bring future economic benefits. Non-current assets are used over years; current assets turn into cash within the operating cycle.",
    sections: [
      ["The accounting equation", "- **Assets = Liabilities + Equity.** Every transaction keeps it in balance (double entry).", "- Debits increase assets and expenses; credits increase liabilities, equity and income (DEAD CLIC).", "> The towers in the model always stay level: that's the equation."],
      ["Non-current assets", "- Recognised at cost (purchase price + directly attributable costs).", "- Depreciation: straight line, reducing balance, units of production. Change in estimate applied prospectively.", "- Revaluation model: gains to the revaluation surplus (OCI); losses to profit or loss unless reversing a surplus.", "- Disposal: profit/loss = proceeds − carrying amount."],
      ["Current assets and working capital", "- Inventory (IAS 2), receivables (IFRS 9 expected credit losses), cash.", "- Working capital = current assets − current liabilities.", "- Overtrading: rapid growth without enough working capital finance."],
      ["Ratios", "- Asset turnover = revenue ÷ capital employed.", "- ROCE = operating profit ÷ (equity + non-current liabilities) × 100 = margin × asset turnover.", "- Liquidity: current ratio (~1.5–2 typical), quick ratio (~1)."],
    ] },
  claims: { title: "Liabilities and equity", lead: "Everything the business owns is financed by someone: lenders and suppliers (liabilities) or owners (equity). The mix decides risk and return.",
    sections: [
      ["Liabilities", "- A present obligation from a past event, expected to result in an outflow.", "- Current (due within 12 months) and non-current.", "- Contingent liabilities are disclosed, not recognised, unless probable and measurable."],
      ["Capital structure", "- Debt is cheaper (interest is tax-deductible, lenders take less risk) but adds financial risk.", "- Modigliani–Miller: without tax, capital structure doesn't affect value; with tax, debt adds value via the tax shield, offset by distress costs (trade-off theory).", "- Pecking order: internal funds, then debt, then equity."],
      ["Equity", "- Share capital, share premium, retained earnings, revaluation surplus, other reserves.", "- Statement of changes in equity reconciles opening and closing balances.", "- Bonus issues capitalise reserves; rights issues raise new cash at a discount."],
      ["Group accounts", "- Consolidate subsidiaries (control): add 100% of assets and liabilities, show non-controlling interest.", "- Eliminate intra-group balances and unrealised profit.", "- Associates (significant influence, 20–50%): equity method."],
    ] },
  income: { title: "The income statement", lead: "Performance over a period: revenue earned, costs incurred, and the profit that results. It's built on accruals, not cash.",
    sections: [
      ["Format", "Revenue − cost of sales = **gross profit** − distribution and admin costs = **operating profit** − finance costs + finance income = **profit before tax** − tax = **profit for the year**.", "- Other comprehensive income: revaluation gains, some foreign exchange and pension remeasurements."],
      ["Accounting concepts", "- Accruals, going concern, consistency, prudence, materiality, substance over form.", "- Qualitative characteristics (Conceptual Framework): relevance and faithful representation; enhanced by comparability, verifiability, timeliness, understandability."],
      ["Profitability analysis", "- Gross margin shows pricing and production cost; operating margin shows overhead control.", "- Compare with prior years, competitors and the industry; explain why ratios moved.", "> Always link ratios: a falling gross margin with rising revenue may mean price cuts to win volume."],
      ["Earnings quality", "- One-off items, aggressive revenue recognition, capitalising costs, changing depreciation estimates.", "- Compare profit with operating cash flow: persistent gaps are a warning sign."],
    ] },
  cash: { title: "Cash flow and valuation", lead: "Cash is what pays the bills, the lenders and the owners. Valuation turns forecasts of future cash into a value today.",
    sections: [
      ["The cash flow statement", "- Operating (indirect): PBT + depreciation ± working capital changes − interest − tax paid.", "- Investing: purchase and sale of PPE and investments, interest and dividends received.", "- Financing: share issues, loans raised or repaid, dividends paid, lease payments."],
      ["Time value of money", "- FV = PV(1 + r)ⁿ; PV = FV/(1 + r)ⁿ.", "- Annuity factor (1 − (1 + r)⁻ⁿ)/r; perpetuity PV = C/r; growing perpetuity C/(r − g).", "- IRR: the discount rate that makes NPV zero."],
      ["Valuing a business", "- DCF of free cash flows at WACC, plus terminal value.", "- Relative valuation: P/E, EV/EBITDA, compared with peers.", "- Asset-based: net assets (book or fair value); useful for property and break-up values.", "! A small change in the growth or discount rate can move a DCF value a lot: always test sensitivity."],
    ] },
};

export default {
  title: "The balance sheet in 3D", kicker: "3D finance",
  intro: { title: "Explore a set of accounts", text: "Assets on one side, liabilities and equity on the other, always in balance. The income statement falls like a waterfall into retained earnings, and cash moves between them. Click any block for the standards, ratios and formulas behind it, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Exam tip",
  quiz: "find the line item",
  motion: "Cash and profit flowing",
  camera: { pos: [1.2, 1.1, 2.5], target: [0.05, 0.25, 0], min: 0.05, max: 5 },
  views: { Accounts: [[1.2, 1.1, 2.5], [0.05, 0.25, 0]], "Balance sheet": [[-0.2, 0.5, 1.3], [-0.3, 0.35, 0]], "Income statement": [[0.9, 0.5, 1.1], [0.6, 0.3, 0]], Above: [[0.1, 2.0, 0.6], [0, 0.2, 0]] },
  platform: { r: 1.05, y: -0.005 },
  labelMax: 3,
  explode: true,
  bg: ["#1c1c3a", "#08080f"],
  build(k) {
    const { THREE, V, mat, box, text, add, decor } = k;
    const block = (w, h, c) => box(w, h, 0.28, mat(c, { detail: "none", roughness: 0.15, clearcoat: 1, transmission: 0.3, thickness: 0.2, transparent: true, opacity: 0.92, emissive: new THREE.Color(c).multiplyScalar(0.12) }), 0.01);
    const label = (g, str, y) => { const l = text(str, { size: 0.03, bg: "rgba(0,0,0,0.55)" }); l.position.set(0, y, 0.16); g.add(l); };
    // two towers of equal height: £ figures are illustrative (in £m)
    const A = [["ppe", "PPE £420m", 0.28, "#3fb6d8"], ["intangibles", "Intangibles £150m", 0.1, "#4fd0ff"], ["inventory", "Inventory £90m", 0.06, "#5ef0ff"], ["receivables", "Receivables £120m", 0.08, "#8ff6ff"], ["cashAsset", "Cash £70m", 0.048, "#c8fbff"]];
    const C = [["shareCapital", "Share capital £200m", 0.133, "#9a3fc0"], ["retained", "Retained earnings £300m", 0.2, "#c055dd"], ["borrowings", "Long-term debt £250m", 0.167, "#f055dd"], ["payables", "Current liabilities £100m", 0.068, "#ff8fe8"]];
    const stack = (items, x) => { let y = 0; for (const [id, name, h, c] of items) { const g = new THREE.Group(); g.position.set(x, y + h / 2 + 0.005, 0); g.add(block(0.3, h, c)); label(g, name, 0); add(id, g); y += h + 0.006; } return y; };
    const ha = stack(A, -0.55), hc = stack(C, -0.15);
    const eq = text("=", { size: 0.1, colour: "#ffffff" }); eq.position.set(-0.35, ha / 2, 0.05); decor(eq, "assets");
    const ta = text("Assets £850m", { size: 0.04, colour: "#5ef0ff" }); ta.position.set(-0.55, ha + 0.06, 0); decor(ta, "assets");
    const tc = text("Liabilities + equity £850m", { size: 0.04, colour: "#f055dd" }); tc.position.set(-0.15, hc + 0.06, 0); decor(tc, "claims");
    // the income statement as a waterfall: revenue down to profit
    const wf = [["revenue", "Revenue £600m", 0, 0.4, "#6bffb8"], ["costs", "Cost of sales −£330m", 0.18, 0.22, "#ff8f6b"], ["costs", "Operating costs −£150m", 0.08, 0.1, "#ff9f40"], ["costs", "Interest & tax −£60m", 0.04, 0.04, "#ffb36b"], ["profit", "Profit £60m", 0, 0.04, "#4fe0a6"]];
    wf.forEach(([id, name, base, h, c], i) => { const g = new THREE.Group(); g.position.set(0.3 + i * 0.13, base + h / 2 + 0.005, 0.1); g.add(box(0.1, h, 0.16, mat(c, { detail: "none", roughness: 0.15, clearcoat: 1, transmission: 0.25, thickness: 0.15, emissive: new THREE.Color(c).multiplyScalar(0.15) }), 0.008)); const l = text(name, { size: 0.024, bg: "rgba(0,0,0,0.55)" }); l.position.set(0, h / 2 + 0.03, 0.09); g.add(l); add(id, g); });
    // cash flow ring and DCF timeline
    const cf = new THREE.Group(); cf.position.set(0.55, 0.0, -0.45);
    for (const [i, name, c] of [[0, "Operating +£95m", "#ffe066"], [1, "Investing −£60m", "#ffb36b"], [2, "Financing −£25m", "#ff9f40"]]) { const b = box(0.1, 0.03 + Math.abs([95, 60, 25][i]) / 600, 0.1, mat(c, { detail: "none", clearcoat: 1, roughness: 0.2 }), 0.006); b.position.set(-0.13 + i * 0.13, (0.03 + [95, 60, 25][i] / 600) / 2, 0); cf.add(b); const l = text(name, { size: 0.022, bg: "rgba(0,0,0,0.55)" }); l.position.set(-0.13 + i * 0.13, 0.24, 0.06); cf.add(l); }
    add("cashflow", cf);
    const dcf = new THREE.Group(); dcf.position.set(-0.45, 0.0, -0.5);
    for (let i = 0; i < 6; i++) { const pv = 100 / 1.1 ** (i + 1), h = pv / 500; const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, h, 32), mat("#ffd34d", { detail: "none", metalness: 0.85, roughness: 0.25 })); coin.position.set(i * 0.1, h / 2, 0); dcf.add(coin); }
    const dl = text("Year 1 → 6: £100m a year, worth less each year at 10%", { size: 0.022, bg: "rgba(0,0,0,0.55)" }); dl.position.set(0.25, 0.28, 0.05); dcf.add(dl);
    add("dcf", dcf);
    // flows: profit into retained earnings; cash moving between the towers
    const profitTop = V(0.82, 0.06, 0.1), re = V(-0.15, 0.14 + 0.1, 0.15);
    k.flow([[profitTop, V(0.5, 0.55, 0.3), V(0.1, 0.45, 0.3), re]], "#6bffb8", 26, 0.18, "income", 0.016);
    k.flow([[V(0.55, 0.15, -0.45), V(0.0, 0.3, -0.3), V(-0.55, ha - 0.03, 0.15)]], "#ffe066", 24, 0.2, "cash", 0.014);
  },
};
