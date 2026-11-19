// FinanceGradify's 3D model: a company's accounts, as three connected machines. A balance scale for the
// statement of financial position (assets = liabilities + equity), a waterfall for the income statement
// (revenue down to profit), and a cash tank fed and drained by the three kinds of cash flow. The sliders show
// how they connect: more sales feed profit into retained earnings and cash; a machine bought with a loan adds
// equally to both sides of the balance sheet, so it stays level. Figures are an illustrative company, in £m.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  position: { name: "Balance sheet", c: "#5ec8ff" },
  performance: { name: "Income statement", c: "#7be08a" },
  cash: { name: "Cash flow", c: "#f2b84b" },
};

const STRUCTURES = {
  equation: s("position", "The accounting equation", "The scale always balances: **assets = liabilities + equity**. Every transaction changes at least two things by the same amount (double entry), so the equation never breaks.",
    ["Each transaction is recorded as **equal debits and credits**: debits increase assets and expenses; credits increase liabilities, equity and income.", "A memory aid: **DEAD CLIC**: Debits for Expenses, Assets and Drawings; Credits for Liabilities, Income and Capital.", "The statement of financial position (balance sheet) is a snapshot **at one date**; the income and cash flow statements cover a **period**."],
    [["What is the accounting equation?", "Assets = liabilities + equity."], ["Why does the balance sheet always balance?", "Double entry: every transaction is recorded with equal debits and credits, changing two items by the same amount."], ["Buying a machine with a bank loan: what happens to the equation?", "Assets (machinery) and liabilities (loan) both rise by the same amount, so it still balances."], ["Is a debit an increase or a decrease in an asset?", "An increase."]],
    ["accounting equation", "double entry", "debit", "credit", "balance sheet", "statement of financial position", "dead clic"]),
  assets: s("position", "Assets", "What the company controls that should bring it economic benefits: machinery and buildings, inventory, money customers owe it, and cash.",
    ["The IFRS Conceptual Framework (2018) defines an asset as **a present economic resource controlled by the entity as a result of past events**.", "**Non-current** assets (property, plant and equipment) are used for more than a year, and their cost is spread over their useful life by **depreciation**.", "**Current** assets (inventory, trade receivables, cash) are expected to be used or turned into cash within a year."],
    [["Define an asset (IFRS Conceptual Framework).", "A present economic resource controlled by the entity as a result of past events."], ["What is depreciation?", "Spreading the cost of a non-current asset over its useful life as an expense."], ["Give three examples of current assets.", "Inventory, trade receivables, cash (and prepayments)."]],
    ["assets", "non-current assets", "current assets", "ppe", "property plant and equipment", "depreciation", "inventory", "receivables"]),
  liabilities: s("position", "Liabilities", "What the company owes: money due to suppliers (trade payables) and loans from the bank.",
    ["A liability is **a present obligation of the entity to transfer an economic resource as a result of past events** (Conceptual Framework, 2018).", "**Current liabilities** are due within a year (trade payables, overdrafts, tax); **non-current** are due later (long-term loans).", "Ratios such as the **current ratio** (current assets ÷ current liabilities) and **gearing** (debt relative to equity) use these figures."],
    [["Define a liability.", "A present obligation to transfer an economic resource as a result of past events."], ["What is the current ratio?", "Current assets ÷ current liabilities: a measure of short-term liquidity."], ["What is gearing?", "The proportion of a company's long-term finance that comes from debt rather than equity."]],
    ["liabilities", "payables", "loan", "debt", "current liabilities", "gearing", "current ratio"]),
  equity: s("position", "Equity", "What belongs to the owners: the money shareholders put in (share capital) plus profits kept in the business (**retained earnings**). It's what's left of the assets after the liabilities.",
    ["Equity = assets − liabilities: the owners' **residual interest**.", "Profit for the year is added to **retained earnings**; dividends paid to shareholders are taken out of it.", "Equity is not cash: retained earnings may have been spent on machines or stock long ago."],
    [["How is equity calculated?", "Assets − liabilities."], ["What happens to retained earnings when the company makes a profit?", "They increase by the profit (less any dividends paid)."], ["Is equity the same as the cash the company has?", "No. It's the owners' claim on the net assets, which can be held in any form."]],
    ["equity", "share capital", "retained earnings", "dividends", "shareholders"]),
  revenue: s("performance", "Revenue", "Income from selling goods and services in the ordinary course of business. Move the sales slider: revenue changes, and so does everything below it.",
    ["Under IFRS 15, revenue is recognised **when (or as) control of the goods or services passes to the customer**.", "The **accruals** concept: revenue is recorded when it's earned, not when the cash arrives.", "Revenue is the **top line**; profit is the bottom line."],
    [["When is revenue recognised under IFRS 15?", "When (or as) the entity satisfies a performance obligation by transferring control of goods or services to the customer."], ["What is the accruals concept?", "Income and expenses are recorded in the period they're earned or incurred, not when cash moves."], ["A sale on credit in December, paid in January: when is the revenue recorded?", "In December, when the sale is made."]],
    ["revenue", "sales", "turnover", "ifrs 15", "accruals", "top line"]),
  costs: s("performance", "Costs and expenses", "The red steps down: cost of sales (the direct cost of what was sold), operating expenses (rent, salaries, depreciation), then interest and tax.",
    ["**Cost of sales** varies with sales; many **operating expenses** are fixed in the short run.", "Because fixed costs don't fall with sales, a small drop in revenue can cause a large drop in profit: **operating leverage**. Try the slider.", "Depreciation is an expense that uses no cash this year: one reason profit and cash differ."],
    [["What is cost of sales?", "The direct cost of the goods or services sold in the period (opening inventory + purchases − closing inventory, for a trader)."], ["What is operating leverage?", "How sensitive profit is to sales; high fixed costs mean profit swings more as sales change."], ["Why is depreciation called a non-cash expense?", "It reduces profit, but no cash leaves the business when it's charged."]],
    ["costs", "cost of sales", "cogs", "expenses", "operating expenses", "fixed costs", "variable costs", "operating leverage"]),
  profit: s("performance", "Profit", "The blue bars: gross profit, operating profit and net profit (profit for the year), the bottom line. Net profit flows into retained earnings on the balance sheet.",
    ["**Gross profit** = revenue − cost of sales; **operating profit** = gross profit − operating expenses; **net profit** = after interest and tax.", "Margins compare profit to revenue: **gross margin** and **net margin** (profit ÷ revenue × 100).", "Profit is not cash: a profitable company can still fail if customers pay too slowly (**overtrading**)."],
    [["How is gross profit calculated?", "Revenue − cost of sales."], ["How is net profit margin calculated?", "Net profit ÷ revenue × 100."], ["How can a profitable company run out of cash?", "Profit is recorded when earned, but cash may not have arrived (receivables), or has been spent on stock or assets; it can overtrade."]],
    ["profit", "gross profit", "operating profit", "net profit", "margin", "bottom line", "overtrading"]),
  operating: s("cash", "Operating cash flow", "Cash from the business's day-to-day trading: receipts from customers less payments to suppliers and staff. Usually the most important source of cash.",
    ["The **indirect method** starts from profit, adds back non-cash expenses (depreciation) and adjusts for changes in working capital.", "A rise in **receivables** or **inventory** uses cash; a rise in payables keeps cash in the business for longer.", "Healthy companies generate more cash from operations than they report as profit, over time."],
    [["How does the indirect method calculate operating cash flow?", "Profit + non-cash expenses (depreciation) ± changes in working capital (inventory, receivables, payables)."], ["Why does an increase in receivables reduce operating cash flow?", "Sales have been recorded as profit, but the cash hasn't been collected yet."], ["Name the three sections of a cash flow statement.", "Operating, investing and financing activities."]],
    ["operating cash flow", "operating activities", "indirect method", "working capital", "cash flow statement"]),
  investing: s("cash", "Investing cash flow", "Cash spent on, or received from, long-term assets: buying the new machine drains the tank here.",
    ["Buying property, plant and equipment is a cash **outflow**; selling it is an inflow.", "Spending on non-current assets is **capital expenditure (capex)**; it appears on the balance sheet, not as an expense in profit.", "Steady investment is a sign a company is maintaining or growing its capacity."],
    [["Give an example of an investing cash outflow.", "Buying property, plant and equipment (or investments in other companies)."], ["What is capital expenditure?", "Spending on non-current assets, such as machinery and buildings."], ["Why doesn't buying a machine reduce profit straight away?", "It's capitalised as an asset; its cost reaches profit gradually through depreciation."]],
    ["investing cash flow", "investing activities", "capex", "capital expenditure"]),
  financing: s("cash", "Financing cash flow", "Cash from, and returned to, the people who fund the business: new loans and shares in; loan repayments and dividends out.",
    ["Taking out a **loan** or issuing **shares** brings cash in; repaying loans and paying **dividends** sends it out.", "Under IAS 7, dividends paid may be shown under financing or operating activities; financing is common.", "Borrowing to buy the machine is a financing inflow matched by an investing outflow: the tank level doesn't change."],
    [["Give two financing inflows.", "New bank loans, and issuing shares."], ["Give two financing outflows.", "Repaying loans, and paying dividends."], ["A company borrows £30m and spends it on a machine. What's the effect on cash?", "None overall: a £30m financing inflow and a £30m investing outflow."]],
    ["financing cash flow", "financing activities", "loans", "share issue", "dividends paid", "ias 7"]),
  cashtank: s("cash", "Cash balance", "Opening cash plus the net cash flow for the year gives closing cash, which is the cash figure on the balance sheet. Watch it rise and fall with profit.",
    ["Closing cash = opening cash + operating + investing + financing cash flows.", "**Liquidity** is the ability to pay debts as they fall due; cash is the most liquid asset.", "**Cash flow forecasts** predict future inflows and outflows, so shortfalls can be spotted and an overdraft arranged in time."],
    [["How is closing cash calculated?", "Opening cash + net cash flow (operating + investing + financing)."], ["What is liquidity?", "A business's ability to pay its debts as they fall due."], ["Why do businesses prepare cash flow forecasts?", "To spot future cash shortfalls in time to arrange finance or change plans."]],
    ["cash", "cash balance", "liquidity", "cash flow forecast", "closing cash"]),
};

const NOTES = {
  position: { title: "The statement of financial position", lead: "A snapshot of what a company **owns** and **owes** at one date, and the **owners' share** of the difference. It always balances, because of double entry.",
    sections: [
      ["Layout", "- **Non-current assets**: property, plant and equipment; intangible assets.", "- **Current assets**: inventory, trade receivables, cash.", "- **Current liabilities**: trade payables, overdraft, tax due.", "- **Non-current liabilities**: long-term loans.", "- **Equity**: share capital, retained earnings, other reserves.", "> Exam tip: net assets (assets − liabilities) always equals total equity. Check your answer with it."],
      ["Double entry", "Every transaction has two sides:", "- Buy a machine for cash: machinery up, cash down (assets swap).", "- Buy a machine with a loan: machinery up, loan up (both sides rise).", "- Make a profit: net assets up, retained earnings up.", "- Pay a dividend: cash down, retained earnings down."],
      ["Reading it", "- **Current ratio** = current assets ÷ current liabilities (liquidity).", "- **Acid test** = (current assets − inventory) ÷ current liabilities.", "- **Gearing** = long-term debt ÷ (debt + equity) × 100: how much of the long-term funding is borrowed."],
    ] },
  performance: { title: "The income statement", lead: "How much the company **earned** and **spent** over a period, and the **profit** left over. It follows the accruals concept: income and costs belong to the period they relate to, whenever cash moves.",
    sections: [
      ["From revenue to profit", "1. **Revenue**", "2. − Cost of sales = **gross profit**", "3. − Operating expenses (distribution, administration, depreciation) = **operating profit**", "4. − Finance costs (interest) = profit before tax", "5. − Tax = **profit for the year** (net profit)"],
      ["Margins", "- **Gross margin** = gross profit ÷ revenue × 100.", "- **Operating margin** = operating profit ÷ revenue × 100.", "- **Net margin** = net profit ÷ revenue × 100.", "Compare them over time and against competitors, never in isolation."],
      ["Fixed costs and leverage", "When most costs are **fixed**, profit rises fast as sales grow, and falls fast when they shrink. Move the sales slider: revenue changes by a little, net profit by a lot, and below a point the company makes a **loss**.", "> Exam tip: the **break-even** point is where revenue just covers all costs: fixed costs ÷ contribution per unit."],
    ] },
  cash: { title: "The statement of cash flows", lead: "Where cash actually **came from** and **went to** during the period. Profit is an opinion, cash is a fact: this statement shows whether profit is turning into money.",
    sections: [
      ["Three sections", "- **Operating**: cash from trading.", "- **Investing**: buying and selling long-term assets.", "- **Financing**: loans, shares, dividends.", "Their total is the change in cash; added to opening cash it gives closing cash, which matches the balance sheet."],
      ["Why profit and cash differ", "- **Depreciation** reduces profit but not cash.", "- **Credit sales** count as revenue before the cash arrives.", "- **Inventory** bought ties up cash before it's sold.", "- **Capital spending** uses cash but isn't an expense.", "- **Loans** bring cash but aren't income."],
      ["Managing cash", "- Chase receivables; negotiate longer payment terms with suppliers.", "- Hold less inventory (just in time).", "- Arrange an **overdraft** before it's needed; lease rather than buy.", "> Exam tip: a business with rising profit and falling cash may be overtrading: growing faster than its cash can support."],
    ] },
};

export default {
  title: "A company's accounts in 3D", kicker: "3D accounting",
  intro: { title: "Three statements, one company", text: "A balance scale for the balance sheet, a waterfall for the income statement and a tank for cash. Move the sliders: more sales flow through to profit, retained earnings and cash; a machine bought with a loan adds equally to both sides of the scale. Figures in £m, for an illustrative company." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Exam tip",
  quiz: "find the item",
  motion: "Cash flowing",
  trueColour: true,
  sliders: [{ key: "sales", label: "Sales this year", value: 60 }, { key: "machine", label: "Buy a machine with a loan", value: 0 }],
  camera: { pos: [0.05, 1.95, 2.95], target: [0.02, 0.1, 0.0], min: 0.3, max: 5 },
  views: { Overview: [[0.05, 1.95, 2.95], [0.02, 0.1, 0.0]], "Balance sheet": [[-0.7, 0.62, 1.05], [-0.78, 0.28, -0.25]], "Income statement": [[0.0, 0.5, 1.35], [0.0, 0.2, 0.3]], "Cash tank": [[0.95, 0.6, 0.85], [0.85, 0.22, -0.25]] },
  platform: { r: 0.55 },
  shadow: { left: -1.6, right: 1.6, top: 1.3, bottom: -1.3, near: 0.5, far: 9 },
  explode: false,
  build(k) {
    const { THREE, V, mat, text, add, decor, box, tube } = k;
    const at = (o, x, y, z, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; return o; };
    const paint = (c, r = 0.5) => mat(c, { detail: "none", roughness: r, clearcoat: 0.3 });
    const metal = (c, r = 0.3) => mat(c, { detail: "none", metalness: 0.9, roughness: r, clearcoat: 0 });
    const brass = metal("#c9a24a", 0.28), steel = metal("#a9b0b8", 0.3), dark = paint("#24262b", 0.6);
    const glass = mat("#cfe9f2", { detail: "none", transparent: true, opacity: 0.22, roughness: 0.05, clearcoat: 1, depthWrite: false });
    const U = 0.0026;   // metres per £m

    // labels that change with the sliders: a text sprite remade when its text changes
    const live = (x, y, z, grp, size = 0.024, colour = "#eaffff") => {
      let sp = null, last = "";
      return { set(t, nx = x, ny = y, nz = z) { if (t !== last) { if (sp) { sp.parent?.remove(sp); sp.material.map?.dispose(); sp.material.dispose(); } sp = text(t, { size, colour, bg: "rgba(0,0,0,0.6)" }); decor(sp, grp); last = t; } sp.position.set(nx, ny, nz); } };
    };
    const title = (t, x, y, z, grp) => { const l = text(t, { size: 0.036, bg: "rgba(0,0,0,0.6)" }); l.position.set(x, y, z); decor(l, grp); };

    // the floor: a dark desk-like slab
    decor(at(box(2.4, 0.02, 1.4, mat("#2b2f36", { detail: "fibre", repeat: 4, bump: 0.15, roughness: 0.7, clearcoat: 0.4 })), 0, -0.01, 0));

    // ---------- the balance scale: assets on the left pan, liabilities and equity on the right ----------
    const BX = -0.74, BZ = -0.42, PZ = -0.2, PIV = 0.62, ARM = 0.27, PANY = 0.04;   // the column stands behind the pans
    const scale = new THREE.Group();
    scale.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.025, 40), dark), BX, 0.0125, BZ));
    scale.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.016, PIV, 20), brass), BX, PIV / 2, BZ));
    const beam = new THREE.Group(); beam.position.set(BX, PIV, BZ); scale.add(beam);
    beam.add(at(box(ARM * 2 + 0.04, 0.018, 0.022, brass, 0.006), 0, 0, 0));
    beam.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.022, 20, 14), brass), 0, 0.005, 0));
    const pointer = new THREE.Mesh(new THREE.ConeGeometry(0.008, 0.1, 12), brass); pointer.rotation.x = Math.PI; beam.add(at(pointer, 0, -0.06, 0.015));
    for (const sx of [-1, 1]) {
      // each pan hangs from the beam's end by three rods, out in front of the column
      const px = BX + sx * ARM;
      scale.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.12, 0.012, 48), brass), px, PANY, PZ));
      for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2 + 0.5; scale.add(tube([V(px + Math.cos(a) * 0.12, PANY + 0.006, PZ + Math.sin(a) * 0.12), V(px, PIV - 0.01, BZ + 0.01)], 0.0018, steel, 2, false, 6)); }
    }
    add("equation", scale);
    title("Balance sheet", BX, PIV + 0.12, BZ, "position");
    const balanced = live(BX, PIV + 0.06, BZ, "position", 0.022, "#9ff0b8");

    // stacks of blocks on the pans; each block's height is its value
    const W = 0.15, D = 0.12;
    const stackBlock = (c) => { const m = box(W, 1, D, paint(c, 0.45), 0); m.userData.c = c; return m; };
    const assets = new THREE.Group(), liabilities = new THREE.Group(), equity = new THREE.Group();
    const A = { ppe: stackBlock("#3f78c4"), inv: stackBlock("#5a93d6"), rec: stackBlock("#7aaee6"), cash: stackBlock("#9cc9f2") };
    const L = { pay: stackBlock("#c45a4a"), loan: stackBlock("#a43f35") };
    const E = { cap: stackBlock("#3fa06a"), ret: stackBlock("#6cc48c") };
    Object.values(A).forEach((m) => assets.add(m)); Object.values(L).forEach((m) => liabilities.add(m)); Object.values(E).forEach((m) => equity.add(m));
    add("assets", assets); add("liabilities", liabilities); add("equity", equity);
    const aL = Object.fromEntries(Object.keys(A).map((kk) => [kk, live(0, 0, 0, "position", 0.019)]));
    const lL = Object.fromEntries([...Object.keys(L), ...Object.keys(E)].map((kk) => [kk, live(0, 0, 0, "position", 0.019)]));
    const stack = (items, x, labels) => { let y = PANY + 0.006; for (const [kk, m, v, name] of items) { const h = Math.max(0.002, v * U); m.scale.y = h; m.position.set(x, y + h / 2, PZ); labels[kk].set(`${name} £${Math.round(v)}m`, x, y + h / 2, PZ + D / 2 + 0.02); y += h; } return y; };

    // ---------- the income statement waterfall ----------
    const WX0 = -0.29, WSTEP = 0.12, WZ = 0.3, Y0 = 0.05;
    const plinth = new THREE.Group(); plinth.add(at(box(0.9, 0.004, 0.2, glass), WX0 + 3 * WSTEP, Y0, WZ)); plinth.add(at(box(0.9, 0.04, 0.2, dark), WX0 + 3 * WSTEP, 0.02, WZ - 0.002));
    decor(plinth, "performance");
    title("Income statement", WX0 + 3 * WSTEP, 0.6, WZ, "performance");
    const bar = (c, i) => { const m = box(0.075, 1, 0.075, paint(c, 0.35), 0); m.position.x = WX0 + i * WSTEP; return m; };
    const revenue = new THREE.Group(), costs = new THREE.Group(), profit = new THREE.Group();
    const bars = { rev: bar("#3fa06a", 0), cos: bar("#c45a4a", 1), gp: bar("#4f8fd6", 2), opx: bar("#c45a4a", 3), op: bar("#4f8fd6", 4), it: bar("#c45a4a", 5), np: bar("#2f6db3", 6) };
    revenue.add(bars.rev); [bars.cos, bars.opx, bars.it].forEach((b) => costs.add(b)); [bars.gp, bars.op, bars.np].forEach((b) => profit.add(b));
    add("revenue", revenue); add("costs", costs); add("profit", profit);
    const barL = Object.fromEntries(Object.keys(bars).map((kk) => [kk, live(0, 0, 0, "performance", 0.019)]));
    const span = (b, lo, hi) => { const a = Math.min(lo, hi), z = Math.max(lo, hi), h = Math.max(0.002, (z - a) * U); b.scale.y = h; b.position.y = Y0 + a * U + h / 2; b.position.z = WZ; };

    // ---------- the cash tank, with its three pipes ----------
    const TX = 0.82, TZ = -0.32, TR = 0.12, TH = 0.42;
    const cashtank = new THREE.Group();
    cashtank.add(at(new THREE.Mesh(new THREE.CylinderGeometry(TR, TR, TH, 48, 1, true), glass), TX, TH / 2 + 0.03, TZ));
    cashtank.add(at(new THREE.Mesh(new THREE.CylinderGeometry(TR + 0.012, TR + 0.012, 0.03, 48), steel), TX, 0.015, TZ));
    cashtank.add(at(new THREE.Mesh(new THREE.TorusGeometry(TR, 0.006, 8, 48), steel).rotateX(Math.PI / 2), TX, TH + 0.03, TZ));
    const water = new THREE.Mesh(new THREE.CylinderGeometry(TR - 0.006, TR - 0.006, 1, 48), mat("#e2b23a", { detail: "none", roughness: 0.15, metalness: 0.3, clearcoat: 1, transparent: true, opacity: 0.85 }));
    cashtank.add(at(water, TX, 0, TZ));
    add("cashtank", cashtank);
    title("Cash", TX, TH + 0.14, TZ, "cash");
    const cashL = live(TX, 0, TZ + TR + 0.04, "cash", 0.02);
    const pipeM = steel;
    const opPath = [V(WX0 + 6 * WSTEP + 0.06, 0.08, WZ), V(0.55, 0.09, WZ - 0.05), V(0.66, 0.12, TZ + 0.12), V(TX - TR + 0.01, 0.14, TZ + 0.02)];
    const finPath = [V(TX + 0.31, 0.36, TZ - 0.25), V(TX + 0.2, 0.36, TZ - 0.17), V(TX + 0.07, 0.36, TZ - TR + 0.02)];
    const invPath = [V(TX + TR - 0.01, 0.06, TZ + 0.04), V(TX + 0.2, 0.06, TZ + 0.2), V(TX + 0.22, 0.06, TZ + 0.42)];
    const operating = new THREE.Group(); operating.add(tube(opPath, 0.014, pipeM, 48, false, 12)); add("operating", operating);
    const financing = new THREE.Group(); financing.add(tube(finPath, 0.014, pipeM, 32, false, 12));
    const bank = new THREE.Group(); bank.add(at(box(0.16, 0.012, 0.1, paint("#e6e1d4", 0.8)), 0, 0.006, 0)); for (let i = 0; i < 4; i++) bank.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.09, 12), paint("#e6e1d4", 0.8)), -0.054 + i * 0.036, 0.057, 0.03)); bank.add(at(box(0.15, 0.1, 0.06, paint("#e6e1d4", 0.8)), 0, 0.06, -0.015)); const pd = new THREE.Shape([new THREE.Vector2(-0.085, 0), new THREE.Vector2(0.085, 0), new THREE.Vector2(0, 0.04)]); bank.add(at(new THREE.Mesh(new THREE.ExtrudeGeometry(pd, { depth: 0.1, bevelEnabled: false }), paint("#e6e1d4", 0.8)), 0, 0.11, -0.05));
    financing.add(at(bank, TX + 0.36, 0.24, TZ - 0.28, -0.6));
    const bankStand = box(0.03, 0.24, 0.03, dark); financing.add(at(bankStand, TX + 0.36, 0.12, TZ - 0.28));
    add("financing", financing);
    const investing = new THREE.Group(); investing.add(tube(invPath, 0.014, pipeM, 32, false, 12));
    const machine = new THREE.Group(); machine.add(at(box(0.14, 0.08, 0.1, paint("#e5862e", 0.4), 0.008), 0, 0.04, 0)); machine.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.11, 24), steel).rotateX(Math.PI / 2), 0.03, 0.09, 0)); machine.add(at(box(0.04, 0.03, 0.02, dark), -0.04, 0.095, 0.03));
    investing.add(at(machine, TX + 0.24, 0, TZ + 0.52));
    add("investing", investing);
    const flowL = { op: live(0.6, 0.22, WZ - 0.12, "cash", 0.019), fin: live(TX + 0.24, 0.47, TZ - 0.2, "cash", 0.019), inv: live(TX + 0.3, 0.17, TZ + 0.3, "cash", 0.019) };

    // cash moving along the pipes
    const opFlow = k.flow([opPath], "#ffd36b", 14, 0.25, "cash", 0.016);
    const finFlow = k.flow([finPath], "#ffd36b", 8, 0.3, "cash", 0.016);
    const invFlow = k.flow([invPath], "#ffd36b", 8, 0.3, "cash", 0.016);

    // ---------- the numbers ----------
    let sales = 0.6, mach = 0;
    function update() {
      const R = 40 + 80 * sales, COS = 0.55 * R, GP = R - COS, OPX = 25, OP = GP - OPX, INT = 3 + 0.08 * 30 * mach, PBT = OP - INT, TAX = Math.max(0, PBT * 0.25), NP = PBT - TAX;
      const LOAN = 30 * mach, DEP = 6, OCF = NP + DEP - R * 0.05;   // operating cash: profit, plus depreciation (in expenses, no cash), less cash tied up in receivables
      // the balance sheet at the year end (opening figures, plus this year's profit and the machine)
      const a = { ppe: 60 + LOAN, inv: 15, rec: 10 + R * 0.05, cash: 12 + OCF }, l = { pay: 12, loan: 25 + LOAN }, e = { cap: 30, ret: 36 + NP };   // the loan comes in and goes straight out on the machine, so cash = opening cash + operating cash
      const lt = stack([["ppe", A.ppe, a.ppe, "Machinery & property"], ["inv", A.inv, a.inv, "Inventory"], ["rec", A.rec, a.rec, "Receivables"], ["cash", A.cash, a.cash, "Cash"]], BX - ARM, aL);
      const rt = stack([["pay", L.pay, l.pay, "Payables"], ["loan", L.loan, l.loan, "Loans"], ["cap", E.cap, e.cap, "Share capital"], ["ret", E.ret, e.ret, "Retained earnings"]], BX + ARM, lL);
      const ta = a.ppe + a.inv + a.rec + a.cash, tle = l.pay + l.loan + e.cap + e.ret;
      balanced.set(`Assets £${Math.round(ta)}m = liabilities + equity £${Math.round(tle)}m ✓`);
      // the waterfall
      span(bars.rev, 0, R); span(bars.cos, GP, R); span(bars.gp, 0, GP); span(bars.opx, OP, GP); span(bars.op, 0, OP); span(bars.it, NP, OP); span(bars.np, 0, NP);
      const lab = (kk, i, t, top) => barL[kk].set(t, WX0 + i * WSTEP, Y0 + Math.max(0, top) * U + 0.03, WZ + 0.06);
      lab("rev", 0, `Revenue £${Math.round(R)}m`, R); lab("cos", 1, `Cost of sales −£${Math.round(COS)}m`, R + 12); lab("gp", 2, `Gross profit £${Math.round(GP)}m`, GP);
      lab("opx", 3, `Expenses −£${OPX}m`, GP + 12); lab("op", 4, `Operating profit £${Math.round(OP)}m`, OP); lab("it", 5, `Interest & tax −£${Math.round(INT + TAX)}m`, OP + 12);
      lab("np", 6, NP >= 0 ? `Net profit £${Math.round(NP)}m` : `Net loss −£${Math.round(-NP)}m`, Math.max(NP, 0));
      water.scale.y = Math.max(0.004, Math.min(TH - 0.01, a.cash * U * 1.6)); water.position.y = 0.03 + water.scale.y / 2;
      cashL.set(`Cash £${Math.round(a.cash)}m`, TX, 0.03 + water.scale.y + 0.03, TZ + TR + 0.04);
      flowL.op.set(`Operating ${OCF >= 0 ? "+" : "−"}£${Math.round(Math.abs(OCF))}m`);
      flowL.fin.set(`Financing +£${Math.round(LOAN)}m`); flowL.inv.set(`Investing −£${Math.round(LOAN)}m`);
      machine.visible = mach > 0.02; machine.scale.setScalar(0.6 + mach * 0.6);
      finFlow.visible = invFlow.visible = mach > 0.02; opFlow.material.color.set(OCF >= 0 ? "#ffd36b" : "#e2574c");
      void lt; void rt;
    }
    k.slider("sales", (v) => { sales = v; update(); });
    k.slider("machine", (v) => { mach = v; update(); });
    update();
    k.tick((t, dt, motion) => { if (!motion) return; beam.rotation.z = Math.sin(t * 1.3) * 0.004; water.material.opacity = 0.82 + Math.sin(t * 2) * 0.03; });
  },
};
