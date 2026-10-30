// BusinessGradify's 3D model: Porter's value chain as a working factory floor. Goods flow through
// the five primary activities; the four support activities span above them; the margin glows at
// the end. A five-forces ring sits around it. Notes cover strategy, operations, marketing and people.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  primary: { name: "Primary activities", c: "#5ef0ff" },
  support: { name: "Support activities", c: "#c79bff" },
  strategy: { name: "Strategy", c: "#ffb36b" },
};

const STRUCTURES = {
  inbound: s("primary", "Inbound logistics", "Receiving, storing and distributing inputs: goods in, warehousing, stock control, supplier relationships.",
    ["**Just-in-time** (Toyota): minimal stock, deliveries as needed; cuts storage costs but is vulnerable to supply shocks.", "Economic order quantity balances ordering and holding costs.", "Buffer stock protects against demand and supply variation."],
    [["What is just-in-time stock control?", "Inputs arrive only as needed for production, minimising stock."], ["Give one risk of JIT.", "Vulnerability to supply disruption (e.g. a delayed delivery stops production)."], ["What is buffer stock?", "The minimum stock held to protect against unexpected demand or supply delays."]],
    ["inbound", "logistics", "stock", "inventory", "just-in-time", "supplier"]),
  operations: s("primary", "Operations", "Turning inputs into outputs: production, assembly, quality, capacity.",
    ["Production methods: job, batch, flow (and cell).", "**Capacity utilisation** = actual output ÷ maximum output × 100.", "Lean production: kaizen (continuous improvement), cell production, TQM; quality control vs quality assurance."],
    [["How do you calculate capacity utilisation?", "Actual output ÷ maximum possible output × 100."], ["What is kaizen?", "Continuous small improvements, suggested by all employees."], ["Distinguish quality control from quality assurance.", "Control inspects output to find defects; assurance builds quality into every stage to prevent them."]],
    ["operations", "production", "capacity", "quality", "lean", "kaizen", "efficiency"]),
  outbound: s("primary", "Outbound logistics", "Getting finished products to customers: warehousing, order fulfilment, distribution channels.",
    ["Channels: direct (producer → consumer), one-level (via retailer), two-level (via wholesaler and retailer).", "E-commerce has shifted outbound logistics to parcel networks and fulfilment centres.", "Delivery speed and reliability are a source of competitive advantage (Amazon Prime)."],
    [["Name three distribution channels.", "Direct to consumer; via a retailer; via a wholesaler and retailer."], ["Why might a firm use a wholesaler?", "To reach many small retailers and break bulk, reducing the firm's distribution costs."], ["How can outbound logistics create competitive advantage?", "Faster, more reliable or cheaper delivery than rivals."]],
    ["outbound", "distribution", "channel", "fulfilment", "delivery"]),
  marketing: s("primary", "Marketing and sales", "Finding out what customers want and persuading them to buy: research, segmentation, the marketing mix.",
    ["The **4Ps**: product, price, place, promotion (7Ps adds people, process, physical evidence for services).", "Price elasticity of demand = %Δ quantity ÷ %Δ price; elastic (>1) products lose revenue when price rises.", "Boston Matrix: stars, cash cows, question marks, dogs (market growth vs relative share)."],
    [["What are the 4Ps?", "Product, price, place and promotion."], ["If PED is −2 and price rises 5%, what happens to quantity demanded?", "It falls about 10%."], ["What is a cash cow in the Boston Matrix?", "A product with high market share in a low-growth market, generating cash."]],
    ["marketing", "4ps", "marketing mix", "segmentation", "price elasticity", "boston matrix", "promotion"]),
  service: s("primary", "Service", "Supporting customers after the sale: installation, repairs, returns, customer service.",
    ["Keeping a customer is typically far cheaper than winning a new one.", "Net Promoter Score measures loyalty: % promoters − % detractors.", "After-sales service can be a profit centre (extended warranties, spare parts)."],
    [["What is Net Promoter Score?", "The % of customers who'd recommend you (promoters) minus the % who wouldn't (detractors)."], ["Why invest in after-sales service?", "It builds loyalty and repeat purchases, which cost less than acquiring new customers."], ["Give an example of service as a source of revenue.", "Extended warranties, maintenance contracts, spare parts."]],
    ["service", "customer service", "after-sales", "loyalty", "nps", "retention"]),
  infrastructure: s("support", "Firm infrastructure", "Management, planning, finance, legal and quality systems that support the whole chain.",
    ["Organisational structure: tall (narrow span of control) vs flat (wide span).", "Centralised vs decentralised decision-making.", "Corporate governance and stakeholder management sit here."],
    [["What is the span of control?", "The number of subordinates directly managed by one person."], ["What is a flat structure?", "Few layers of hierarchy with wide spans of control."], ["Name one advantage of decentralisation.", "Faster decisions closer to customers; motivates local managers."]],
    ["infrastructure", "structure", "management", "governance", "centralis", "span of control"]),
  hrm: s("support", "Human resource management", "Recruiting, training, rewarding and keeping people.",
    ["Motivation theories: **Maslow** (hierarchy of needs), **Herzberg** (hygiene factors vs motivators), Taylor (financial incentives), Mayo (social needs).", "Labour productivity = output ÷ number of workers; labour turnover = leavers ÷ average staff × 100.", "Workforce planning matches staff to future needs."],
    [["What are Herzberg's two factors?", "Hygiene factors (prevent dissatisfaction, e.g. pay, conditions) and motivators (create satisfaction, e.g. recognition, responsibility)."], ["How is labour turnover calculated?", "Number of staff leaving ÷ average number of staff × 100."], ["List Maslow's needs from the bottom.", "Physiological, safety, love/belonging, esteem, self-actualisation."]],
    ["human resource", "hrm", "motivation", "maslow", "herzberg", "recruitment", "training", "labour turnover"]),
  technology: s("support", "Technology development", "R&D, product and process design, IT systems and automation.",
    ["R&D is costly and uncertain but creates patents and first-mover advantage.", "Automation raises productivity but needs investment and may cut jobs.", "Data and digital platforms are now core technology assets."],
    [["Why do firms invest in R&D?", "To develop new products and processes, gaining a competitive advantage and patents."], ["What is first-mover advantage?", "The benefits of being first to a market: brand recognition, customer loyalty, economies of scale."], ["Give one disadvantage of automation.", "High initial cost (and possible redundancies or loss of flexibility)."]],
    ["technology", "r&d", "research and development", "innovation", "automation", "digital"]),
  procurement: s("support", "Procurement", "Buying the inputs the whole firm needs, at the right price, quality and ethics.",
    ["Supplier choice: price, quality, reliability, flexibility, payment terms, ethics.", "Supply chain ethics: modern slavery reporting, sustainability standards.", "Bargaining power of suppliers is one of Porter's five forces."],
    [["Name four criteria for choosing a supplier.", "Price, quality, reliability, flexibility (also payment terms and ethics)."], ["Why does supply chain ethics matter?", "Reputation, legal duties (e.g. Modern Slavery Act) and consumer expectations."], ["When do suppliers have strong bargaining power?", "When there are few suppliers, inputs are unique, or switching costs are high."]],
    ["procurement", "purchasing", "supplier", "supply chain", "sourcing"]),
  margin: s("strategy", "Margin", "The difference between the value customers pay for and the cost of all the activities. Every activity either adds to it or erodes it.",
    ["Gross profit margin = gross profit ÷ revenue × 100; operating margin = operating profit ÷ revenue × 100.", "**Porter's generic strategies**: cost leadership, differentiation, focus (cost or differentiation in a niche).", "'Stuck in the middle': no clear strategy, no competitive advantage."],
    [["What are Porter's generic strategies?", "Cost leadership, differentiation and focus."], ["How do you calculate gross profit margin?", "Gross profit ÷ revenue × 100."], ["What does 'stuck in the middle' mean?", "A firm with neither the lowest costs nor a clear differentiation, so no competitive advantage."]],
    ["margin", "profit margin", "competitive advantage", "generic strategies", "cost leadership", "differentiation", "value chain"]),
  forces: s("strategy", "Porter's five forces", "The ring of forces that shape an industry's profitability: rivalry, threat of new entrants, threat of substitutes, buyer power, supplier power.",
    ["High barriers to entry (economies of scale, brand, patents, capital) protect profits.", "Strong buyers (few, large, low switching costs) push prices down.", "Use it to judge an industry's attractiveness, then choose a strategy."],
    [["Name Porter's five forces.", "Competitive rivalry, threat of new entrants, threat of substitutes, bargaining power of buyers, bargaining power of suppliers."], ["Give three barriers to entry.", "Economies of scale, brand loyalty, patents, high capital requirements, access to distribution."], ["When are buyers powerful?", "When they are few and large, products are undifferentiated, or switching costs are low."]],
    ["five forces", "porter", "industry", "barriers to entry", "rivalry", "substitutes"]),
};

const NOTES = {
  primary: { title: "Primary activities: making and selling", lead: "The five primary activities move a product from raw materials to a satisfied customer. Each can add value, or cost, so each is a place to find competitive advantage.",
    sections: [
      ["Operations management", "- Productivity, efficiency and capacity; unit costs fall as utilisation rises (fixed costs spread).", "- Economies of scale: purchasing, technical, managerial, financial, marketing. Diseconomies: communication and coordination problems.", "- Break-even: fixed costs ÷ contribution per unit; margin of safety = actual output − break-even output."],
      ["Supply and logistics", "- Supply chain management connects suppliers, operations and distribution.", "- Inventory: JIT vs just-in-case; bar gate stock charts (reorder level, lead time, buffer).", "- Outsourcing and offshoring: lower cost and focus, but loss of control and quality risks."],
      ["Marketing", "- Market research: primary (surveys, focus groups) vs secondary; quantitative vs qualitative.", "- Segmentation (demographic, geographic, psychographic, behavioural), targeting, positioning (perceptual maps).", "- Product life cycle: development, introduction, growth, maturity, decline; extension strategies.", "> Price strategies: penetration, skimming, cost-plus, competitive, psychological, dynamic."],
      ["Customer service", "- Measures: response times, complaint rates, NPS, repeat purchase rate.", "- Service recovery: a well-handled complaint can increase loyalty."],
    ] },
  support: { title: "Support activities: the organisation", lead: "Support activities don't touch the product directly, but they make every primary activity possible: the people, the systems, the technology and the buying.",
    sections: [
      ["People", "- Recruitment and selection: internal vs external; job descriptions and person specifications.", "- Training: induction, on-the-job, off-the-job.", "- Motivation in practice: financial (piece rate, commission, bonus, profit share) and non-financial (job enrichment, empowerment, teamwork).", "- Leadership styles: autocratic, democratic, laissez-faire; Tannenbaum–Schmidt continuum."],
      ["Organisation", "- Structures: functional, product-based, regional, matrix.", "- Delayering cuts costs and speeds communication but raises workloads.", "- Change management: Lewin's unfreeze–change–refreeze; Kotter's eight steps; resistance and how to reduce it."],
      ["Finance as infrastructure", "- Budgets and variance analysis (favourable/adverse).", "- Cash flow forecasts; sources of finance (retained profit, loans, share capital, venture capital).", "- Investment appraisal: payback, average rate of return, net present value."],
      ["Technology and data", "- Digital transformation, e-commerce, big data analytics, AI in operations and marketing.", "- Cybersecurity and data protection (GDPR) as business risks."],
    ] },
  strategy: { title: "Strategy and competitive advantage", lead: "Strategy is choosing where to compete and how to win. The value chain shows where advantage is created; the five forces show how much profit an industry allows.",
    sections: [
      ["Analysing the environment", "- PESTLE: political, economic, social, technological, legal, environmental.", "- SWOT: internal strengths and weaknesses, external opportunities and threats.", "- Five forces for industry attractiveness."],
      ["Choosing a strategy", "- Porter's generic strategies: cost leadership (Ryanair), differentiation (Apple), focus (Rolls-Royce).", "- Ansoff matrix: market penetration, market development, product development, diversification (rising risk).", "- Blue ocean strategy: create uncontested market space instead of competing head-on."],
      ["Growth", "- Organic vs inorganic (mergers and takeovers).", "- Integration: horizontal, vertical (backward or forward), conglomerate.", "- Why mergers fail: culture clash, overpaying, failing to achieve synergies."],
      ["Measuring performance", "- Profitability ratios (gross, operating margin, ROCE = operating profit ÷ capital employed × 100).", "- Balanced scorecard: financial, customer, internal process, learning and growth.", "- Stakeholders: shareholders vs wider stakeholder view; corporate social responsibility."],
    ] },
};

export default {
  title: "The value chain in 3D", kicker: "3D business",
  intro: { title: "Explore a business", text: "Porter's value chain as a working business: goods flow through the five primary activities, the support activities span above, and the margin glows at the end, surrounded by the five forces. Click anything for the theory and the numbers behind it, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Key idea",
  quiz: "find the activity",
  motion: "Goods and value flowing",
  camera: { pos: [0.9, 1.1, 1.9], target: [0, 0.2, 0], min: 0.05, max: 5 },
  views: { Chain: [[0.2, 0.7, 1.7], [0, 0.2, 0]], Above: [[0.1, 2.2, 0.4], [0, 0, 0]], Primary: [[0.4, 0.4, 1.0], [-0.2, 0.08, 0.15]], Support: [[0.3, 0.8, 1.0], [0, 0.35, -0.1]], Forces: [[1.8, 1.0, 1.4], [0, 0.1, 0]] },
  platform: { r: 1.15, y: -0.005 },
  labelMax: 3,
  explode: true,
  bg: ["#1a2a40", "#070b12"],
  build(k) {
    const { THREE, V, mat, glow, limb, blob, box, text, add, decor } = k;
    const glassy = (c) => mat(c, { detail: "none", roughness: 0.15, clearcoat: 1, transmission: 0.35, thickness: 0.1, transparent: true, opacity: 0.9, emissive: new THREE.Color(c).multiplyScalar(0.12) });
    // primary activities: five chevron blocks in a row, each with a small scene inside
    const prim = [["inbound", "Inbound logistics", "#5ef0ff"], ["operations", "Operations", "#4fd0ff"], ["outbound", "Outbound logistics", "#5ab4ff"], ["marketing", "Marketing & sales", "#7e9bff"], ["service", "Service", "#a08bff"]];
    const chevron = new THREE.Shape(); chevron.moveTo(-0.12, -0.14); chevron.lineTo(0.09, -0.14); chevron.lineTo(0.14, 0); chevron.lineTo(0.09, 0.14); chevron.lineTo(-0.12, 0.14); chevron.lineTo(-0.07, 0); chevron.closePath();
    const chevGeo = new THREE.ExtrudeGeometry(chevron, { depth: 0.06, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.008, bevelSegments: 3 }); chevGeo.rotateX(-Math.PI / 2);
    prim.forEach(([id, name, c], i) => {
      const g = new THREE.Group(); g.position.set(-0.68 + i * 0.27, 0, 0.2);
      g.add(new THREE.Mesh(chevGeo, glassy(c)));
      const lab = text(name, { size: 0.03, bg: "rgba(0,0,0,0.5)" }); lab.position.set(0, 0.16, 0.16); g.add(lab);
      // a little scene for each
      if (id === "inbound") for (let j = 0; j < 6; j++) { const b = box(0.035, 0.035, 0.035, mat("#c8a070", { detail: "fibre", repeat: 1 }), 0.004); b.position.set(-0.05 + (j % 3) * 0.04, 0.09 + Math.floor(j / 3) * 0.037, 0); g.add(b); }
      if (id === "operations") { const m = box(0.09, 0.06, 0.07, mat("#9aa6b8", { detail: "none", metalness: 0.7, roughness: 0.3 }), 0.008); m.position.y = 0.1; g.add(m); const gear = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.008, 8, 12), mat("#ffb36b", { detail: "none", metalness: 0.8 })); gear.position.set(0, 0.11, 0.04); g.add(gear); g.userData.gear = gear; }
      if (id === "outbound") { const truck = new THREE.Group(); truck.add(box(0.09, 0.045, 0.05, mat("#e8eef8", { detail: "none" }), 0.006)); const cab = box(0.035, 0.035, 0.05, mat("#5ab4ff", { detail: "none" }), 0.006); cab.position.set(0.065, -0.005, 0); truck.add(cab); for (const x of [-0.03, 0.05]) for (const z of [-0.026, 0.026]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.01, 16), mat("#20242c", { detail: "none" })); w.rotation.x = Math.PI / 2; w.position.set(x, -0.025, z); truck.add(w); } truck.position.y = 0.1; g.add(truck); }
      if (id === "marketing") { const mega = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.08, 24, 1, true), mat("#ff5a9a", { detail: "none", side: THREE.DoubleSide })); mega.rotation.z = -Math.PI / 2; mega.position.set(0, 0.1, 0); g.add(mega); }
      if (id === "service") { const h = new THREE.Mesh(blob(0.03, 1, 0.9, 0.5, (v) => { if (v.y > 0) v.x *= 1 + Math.abs(v.x) * 10; }), mat("#ff4d6d", { detail: "none", clearcoat: 1 })); h.position.set(0, 0.1, 0); h.rotation.z = Math.PI; g.add(h); }
      add(id, g);
    });
    // support activities: four slabs spanning the chain above
    const sup = [["infrastructure", "Firm infrastructure", "#c79bff"], ["hrm", "Human resource management", "#b38bff"], ["technology", "Technology development", "#9f7bff"], ["procurement", "Procurement", "#8b6bff"]];
    sup.forEach(([id, name, c], i) => {
      const g = new THREE.Group(); g.position.set(-0.02, 0.06 + i * 0.075, -0.08 - i * 0.05);
      g.add(box(1.36, 0.05, 0.1, glassy(c), 0.012));
      const lab = text(name, { size: 0.032, bg: "rgba(0,0,0,0.5)" }); lab.position.set(-0.4, 0, 0.07); g.add(lab);
      add(id, g);
    });
    // the margin: a glowing arrowhead at the end of the chain
    const mShape = new THREE.Shape(); mShape.moveTo(0, -0.17); mShape.lineTo(0.2, 0); mShape.lineTo(0, 0.17); mShape.closePath();
    const mGeo = new THREE.ExtrudeGeometry(mShape, { depth: 0.5, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01 }); mGeo.translate(0, 0, -0.25);   // an arrowhead across the whole chain, pointing onward
    const margin = new THREE.Mesh(mGeo, mat("#ffb36b", { detail: "none", roughness: 0.15, clearcoat: 1, emissive: new THREE.Color("#5a3000"), transmission: 0.3, thickness: 0.1 }));
    margin.position.set(0.68, 0.17, -0.02); add("margin", margin);
    const ml = text("Margin", { size: 0.04, colour: "#ffd9a0", bg: "rgba(0,0,0,0.5)" }); ml.position.set(0.82, 0.38, 0.0); decor(ml, "strategy");
    // five forces around it: glowing orbs on a ring, pressing inward
    const forces = ["Rivalry", "New entrants", "Substitutes", "Buyer power", "Supplier power"];
    const fg = new THREE.Group();
    forces.forEach((f, i) => { const a = (i / 5) * Math.PI * 2 + 0.3, p = V(Math.cos(a) * 1.0, 0.15, Math.sin(a) * 0.85); const orb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 32, 24), mat("#ff9f40", { detail: "none", emissive: new THREE.Color("#7a3000"), clearcoat: 1 })); orb.position.copy(p); fg.add(orb); const l = text(f, { size: 0.03, bg: "rgba(0,0,0,0.5)" }); l.position.copy(p).add(V(0, 0.08, 0)); fg.add(l); fg.add(limb(p, p.clone().multiplyScalar(0.7), 0.004, glow("#ffb36b", 0.6), false)); });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1, 0.004, 8, 128), glow("#ffb36b", 0.5)); ring.rotation.x = Math.PI / 2; ring.scale.set(1, 0.85, 1); ring.position.y = 0.15; fg.add(ring);
    add("forces", fg);
    // goods flowing through the primary activities, value rising up into the margin
    k.flow([[V(-0.85, 0.08, 0.32), V(-0.4, 0.09, 0.32), V(0.0, 0.09, 0.32), V(0.4, 0.09, 0.32), V(0.65, 0.12, 0.2), V(0.78, 0.17, -0.1)]], "#5ef0ff", 40, 0.12, "primary", 0.016);
    k.flow([[V(-0.6, 0.35, -0.2), V(0.2, 0.32, -0.2), V(0.75, 0.2, -0.18)], [V(-0.6, 0.2, -0.13), V(0.2, 0.18, -0.13), V(0.75, 0.17, -0.15)]], "#c79bff", 30, 0.12, "support", 0.012);
    const gears = []; k.groups.primary.traverse((o) => { if (o.userData.gear) gears.push(o.userData.gear); });
    k.tick((t, dt, motion) => { if (!motion) return; gears.forEach((g) => { g.rotation.z = t * 2; }); ring.rotation.z = t * 0.1; });
  },
};
