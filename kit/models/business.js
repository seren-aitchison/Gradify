// BusinessGradify's 3D model: a supply chain, from a supplier's yard to the customer. Lorries carry raw
// materials to a factory with a flow-production line (a robot arm and a quality check), finished goods go to
// a warehouse (slide the stock level against the buffer and re-order levels), then to a high-street shop and,
// by van, to an online customer's door, while money flows back up the chain. For GCSE Business: operations,
// stock control, quality, production methods, the marketing mix and customer service.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  supply: { name: "Supply chain", c: "#f2b84b" },
  production: { name: "Production", c: "#5ec8ff" },
  sales: { name: "Selling", c: "#ef7aa8" },
};

const STRUCTURES = {
  supplier: s("supply", "Supplier", "A business that provides the raw materials and components another business needs: here, steel coil and timber for the factory. Choosing good suppliers is a key operations decision.",
    ["Businesses choose suppliers on **price, quality, reliability** (delivering on time), **flexibility** and **payment terms** (such as 30 days' trade credit).", "A good relationship can bring discounts, priority when supplies are short, and help developing new products.", "**Procurement** is the process of finding, choosing and buying from suppliers. Many firms also check that suppliers treat workers and the environment ethically."],
    [["Give four things a business considers when choosing a supplier.", "Any four of: price, quality, reliability of delivery, flexibility, payment terms (trade credit), ethics."], ["Why does a reliable supplier matter?", "Late or faulty supplies can stop production, so orders are late and customers are lost."], ["What is procurement?", "Finding, choosing and buying goods and services from suppliers."]],
    ["supplier", "suppliers", "raw materials", "procurement", "trade credit", "components"]),
  logistics: s("supply", "Logistics (lorries)", "Logistics is getting goods to the right place, at the right time, in the right condition, at the lowest cost. The lorries carry materials in and finished goods out.",
    ["Most goods moved within Britain travel by **road**; rail, sea and air are used for bulk, long-distance or urgent goods.", "**Lead time** is the time between ordering supplies and receiving them.", "Good logistics cuts costs and keeps customers happy; poor logistics means late deliveries and lost sales."],
    [["What is logistics?", "Getting goods and materials to the right place, at the right time, in the right condition, as cheaply as possible."], ["What is lead time?", "The time between placing an order with a supplier and the goods arriving."], ["Give one benefit of efficient logistics.", "Lower costs, faster delivery, or more satisfied customers."]],
    ["logistics", "lorry", "lorries", "transport", "distribution", "lead time", "delivery"]),
  warehouse: s("supply", "Warehouse (stock)", "Finished goods wait here until they are sold. The stock gauge shows the stock level against the maximum, the re-order level and the buffer stock. Use the slider to run it down.",
    ["**Buffer stock** is the minimum kept in case of a delay or a sudden rise in demand.", "When stock falls to the **re-order level**, a new order is placed, early enough to arrive (after the lead time) before stock falls below the buffer.", "Holding stock costs money (space, insurance, damage, theft, going out of date), so **just in time (JIT)** firms keep almost none and receive supplies only as they're needed."],
    [["What is buffer stock?", "The minimum amount of stock kept in case of delays or a rise in demand."], ["What is the re-order level?", "The stock level at which a new order is placed."], ["Give one advantage and one disadvantage of just in time.", "Advantage: low stock-holding costs (less space, less waste). Disadvantage: production stops if a delivery is late."], ["What does a business risk if it runs out of stock?", "Lost sales and unhappy customers, who may go to a competitor."]],
    ["warehouse", "stock", "inventory", "buffer stock", "re-order level", "reorder", "jit", "just in time", "just in case", "stock control"]),
  line: s("production", "Production line", "Flow production: identical products move continuously along a line, with each stage adding to them. Raw materials go in at one end and finished, boxed goods come out at the other.",
    ["There are three methods: **job** (one-off, made to order, like a wedding dress), **batch** (a group of identical items, like a tray of loaves) and **flow** (continuous mass production, like cars or cans).", "Flow production gives **economies of scale**: the cost of each unit falls as output rises.", "**Productivity** is output per worker (or per machine) in a period of time: a key measure of efficiency."],
    [["Name the three methods of production.", "Job, batch and flow production."], ["Give one advantage and one disadvantage of flow production.", "Advantage: low unit costs (economies of scale). Disadvantage: high set-up cost and little variety; repetitive work."], ["How is labour productivity calculated?", "Output ÷ number of workers (in a given time)."]],
    ["production line", "flow production", "batch production", "job production", "mass production", "productivity", "economies of scale", "assembly line", "factory"]),
  quality: s("production", "Quality check", "An inspector checks products at the end of the line; faulty ones are taken off. Quality means meeting customers' expectations, every time.",
    ["**Quality control** inspects finished products and removes faulty ones; it finds problems but after the cost of making them.", "**Quality assurance** builds quality into every stage, with workers checking their own work, so fewer faults happen at all.", "Poor quality means waste, returns, refunds and product recalls, and damages the brand's reputation."],
    [["What is the difference between quality control and quality assurance?", "Quality control inspects finished products; quality assurance checks quality at every stage of production to prevent faults."], ["Give two costs of poor quality.", "Any two of: waste, returns and refunds, recalls, a damaged reputation, lost customers."], ["Why can quality assurance motivate workers?", "Workers are responsible for the quality of their own work."]],
    ["quality", "quality control", "quality assurance", "inspection", "tqm", "defect", "recall"]),
  automation: s("production", "Automation (robot)", "A robot arm places and seals each product. Technology such as robots, CAD and CAM can make production faster, cheaper per unit and more consistent.",
    ["Robots work 24 hours a day, with **consistent quality** and higher productivity.", "But they need a high **initial investment**, maintenance, and staff trained to run them.", "Automation can replace some jobs and create others (programming, maintenance), so it affects staff motivation and training needs."],
    [["Give two advantages of automating production.", "Any two of: higher productivity, consistent quality, lower unit costs in the long run, can work continuously."], ["Give two disadvantages of automation.", "Any two of: high initial cost, maintenance costs, breakdowns stop production, job losses, retraining needed."], ["What are CAD and CAM?", "Computer-aided design and computer-aided manufacture."]],
    ["automation", "robot", "technology", "cad", "cam", "machinery"]),
  shop: s("sales", "Shop (retailer)", "A high-street shop is one way to get products to customers: the place in the marketing mix. Retailers buy from manufacturers or wholesalers and sell to the public at a mark-up.",
    ["The **marketing mix** is the 4 Ps: **product, price, promotion and place**.", "A **retailer** sells to the public; a **wholesaler** buys in bulk and sells in smaller quantities to retailers.", "Shops offer a chance to see and try products and get advice, but have higher costs (rent, staff) than selling online."],
    [["What are the 4 Ps of the marketing mix?", "Product, price, promotion and place."], ["What is the difference between a wholesaler and a retailer?", "A wholesaler buys in bulk and sells to retailers; a retailer sells to the final consumer."], ["Give one advantage of selling through shops.", "Customers can see, touch and try products, and get advice."]],
    ["shop", "retailer", "retail", "high street", "marketing mix", "4ps", "place", "wholesaler"]),
  online: s("sales", "Online sales and delivery", "Orders placed online are picked at the warehouse and delivered to the customer's door by van: e-commerce. Around a quarter of UK retail sales are now made online.",
    ["Selling online reaches customers anywhere, **24 hours a day**, without the cost of shop premises.", "It brings delivery costs, returns, and the need for a good website and secure payments.", "Many businesses are **multichannel**: they sell both in shops and online."],
    [["Give two advantages to a business of selling online.", "Any two of: a wider (even global) market, open 24/7, no shop rent, lower staff costs, customer data."], ["Give two challenges of e-commerce.", "Any two of: delivery costs, returns, website costs, competition, security and payment fraud."], ["What is e-commerce?", "Buying and selling goods and services over the internet."]],
    ["online", "e-commerce", "ecommerce", "website", "delivery", "multichannel", "van"]),
  customers: s("sales", "Customers", "Everything in the chain exists to meet customers' needs: the right product, at the right price, of good quality, conveniently. Satisfied customers come back and tell others.",
    ["Customer needs: **price, quality, choice, convenience, efficiency and design**.", "**Market research** finds out what customers want: primary (surveys, interviews, focus groups) or secondary (existing data).", "Good **customer service** builds loyalty and repeat purchases; bad service spreads quickly through online reviews."],
    [["Name four customer needs.", "Any four of: price, quality, choice, convenience, efficiency, design."], ["What is the difference between primary and secondary market research?", "Primary is new research the business carries out itself; secondary uses data that already exists."], ["Why does good customer service matter?", "It brings loyalty, repeat custom and good reviews, which attract new customers."]],
    ["customer", "customers", "customer service", "market research", "customer needs", "loyalty"]),
};

const NOTES = {
  supply: { title: "The supply chain and stock control", lead: "A **supply chain** is every business involved in getting a product to the customer: suppliers of raw materials, manufacturers, distributors and retailers. Managing it well cuts costs and keeps customers supplied.",
    sections: [
      ["Managing suppliers", "- Choose on **price, quality, reliability, flexibility and payment terms**.", "- Good relationships bring discounts, priority and joint product development.", "- **Procurement** and **logistics** are the buying and moving parts of the chain.", "> Exam tip: link supplier choice to the business in the case study. A luxury brand may pay more for quality; a discount retailer cares most about price."],
      ["Stock control", "- **Maximum stock**: the most the business wants to hold.", "- **Re-order level**: when stock reaches this, order more.", "- **Lead time**: how long the order takes to arrive.", "- **Buffer stock**: the minimum kept for emergencies.", "- **Re-order quantity**: how much is ordered each time (maximum minus buffer).", "On a stock graph, stock falls as it's used, then jumps up when a delivery arrives."],
      ["Just in time and just in case", "- **Just in time (JIT)**: very little stock; supplies arrive exactly when needed. Saves space and waste, but needs very reliable suppliers.", "- **Just in case**: holding large buffer stocks so the business never runs out. Safe, but expensive to store.", "Toyota made JIT famous; supply shocks (such as during the Covid pandemic) led some firms to hold more stock again."],
    ] },
  production: { title: "Production and quality", lead: "**Operations** turns inputs (materials, labour, machinery) into goods and services. Businesses aim to produce efficiently, at the right quality, adding as much value as they can.",
    sections: [
      ["Methods of production", "- **Job**: one-off products made to the customer's order. High quality and price, slow.", "- **Batch**: a set number of identical items, then switch to another batch.", "- **Flow**: continuous mass production of identical products. Lowest unit costs.", "**Added value** = selling price − cost of bought-in materials and components."],
      ["Efficiency and technology", "- **Productivity** = output ÷ workers (per period).", "- **Economies of scale**: unit costs fall as a business grows (bulk buying, specialist machinery).", "- **Automation and robots**: consistent, fast and tireless, but expensive to buy and maintain.", "- Lean production cuts waste: JIT, and continuous improvement (**kaizen**)."],
      ["Quality", "- **Quality control**: inspect at the end; reject faulty products.", "- **Quality assurance**: check at every stage; everyone is responsible.", "- **Total quality management (TQM)**: quality becomes part of the culture.", "> Exam tip: quality lets a business charge a higher price and builds a reputation; poor quality costs money twice, once in making the fault and again in fixing it."],
    ] },
  sales: { title: "Selling and customer service", lead: "At the end of the chain is the customer. The **marketing mix** (product, price, promotion, place) decides how a product reaches them, and customer service decides whether they come back.",
    sections: [
      ["Place: channels of distribution", "- Manufacturer → wholesaler → retailer → consumer.", "- Manufacturer → retailer → consumer.", "- Manufacturer → consumer (direct, often online).", "Every step in between takes a share of the price (a mark-up), but also does work: storing, distributing, selling."],
      ["Shops and online", "- **Shops**: see and try products, advice, instant purchase; high fixed costs.", "- **E-commerce**: wide reach, open 24/7, lower costs; delivery and returns to manage.", "- **Multichannel** retailers combine both (click and collect)."],
      ["Customer service", "- Product knowledge, speed and efficiency, after-sales service, and a good online experience.", "- Benefits: loyalty, repeat purchases, word of mouth and good reviews.", "- **Market research** keeps a business in touch with what customers want."],
    ] },
};

export default {
  title: "A supply chain in 3D", kicker: "3D business",
  intro: { title: "Follow a product to the customer", text: "From the supplier's yard to the factory line, the warehouse, the shop and the customer's door. Lorries carry goods along the chain while money flows back. Run the stock down with the slider and watch the re-order level." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Exam tip",
  quiz: "find the stage",
  motion: "Running",
  trueColour: true,
  sliders: [{ key: "stock", label: "Stock in the warehouse", value: 80 }],
  camera: { pos: [0.35, 2.15, 2.75], target: [0.12, 0.0, 0.22], min: 0.3, max: 5 },
  views: { Overview: [[0.35, 2.15, 2.75], [0.12, 0.0, 0.22]], "From above": [[0, 2.8, 0.15], [0, 0, 0]], "Production line": [[-0.35, 0.55, 0.65], [-0.3, 0.08, -0.12]], "Stock gauge": [[0.55, 0.45, 0.6], [0.4, 0.15, -0.1]] },
  platform: { r: 0.55 },
  shadow: { left: -1.6, right: 1.6, top: 1.4, bottom: -1.4, near: 0.5, far: 9 },
  explode: false,
  build(k) {
    const { THREE, V, mat, text, add, decor, box, tube } = k;
    const at = (o, x, y, z, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; return o; };
    const paint = (c, r = 0.6) => mat(c, { detail: "none", roughness: r, clearcoat: 0.1 });
    const metal = (c, r = 0.35) => mat(c, { detail: "none", metalness: 0.85, roughness: r, clearcoat: 0 });
    const brick = mat("#a4553c", { detail: "fibre", repeat: 4, bump: 0.3, roughness: 0.85, clearcoat: 0 });
    const concrete = paint("#b8b5ad", 0.9), cladding = paint("#7d8a96", 0.5), asphalt = paint("#3a3c40", 0.95), grass = mat("#5f8a46", { detail: "tissue", repeat: 10, bump: 0.3, roughness: 1, clearcoat: 0 });
    const card = paint("#c49a62", 0.8), glass = mat("#cfe6ee", { detail: "none", transparent: true, opacity: 0.3, roughness: 0.05, clearcoat: 1, depthWrite: false });
    const skins = ["#e8c3a0", "#c99a74", "#8d5a3b", "#f0d0b4", "#b07850", "#5c3a24"];
    let si = 0;
    const person = (c) => {
      const g = new THREE.Group();
      g.add(at(new THREE.Mesh(new THREE.CapsuleGeometry(0.016, 0.05, 6, 14), paint(c, 0.85)), 0, 0.045, 0));
      g.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.013, 20, 14), paint(skins[si++ % skins.length], 0.6)), 0, 0.096, 0));
      return g;
    };
    const tree = (x, z, h = 0.12) => { const g = new THREE.Group(); g.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.009, h * 0.5, 8), paint("#6b4a2e")), 0, h * 0.25, 0)); g.add(at(new THREE.Mesh(new THREE.IcosahedronGeometry(h * 0.33, 1), paint("#3f7a3a", 0.9)), 0, h * 0.62, 0)); return decor(at(g, x, 0, z)); };
    const label = (t, x, y, z, grp) => { const l = text(t, { size: 0.035, bg: "rgba(0,0,0,0.55)" }); l.position.set(x, y, z); decor(l, grp); return l; };

    // the ground and the road that links every stage, along the front
    decor(at(box(2.5, 0.02, 1.7, grass), 0, -0.01, 0));
    const ROADZ = 0.5;
    decor(at(box(2.4, 0.004, 0.16, asphalt), 0, 0.002, ROADZ));
    for (let x = -1.1; x < 1.15; x += 0.12) decor(at(box(0.06, 0.002, 0.008, paint("#f0eee6")), x, 0.005, ROADZ));
    for (const x of [-0.85, -0.3, 0.38, 0.92]) decor(at(box(0.1, 0.003, 0.3, asphalt), x, 0.0025, ROADZ - 0.2));   // drives up to each site
    [[-1.15, -0.7], [-1.1, 0.75], [-0.55, 0.78], [1.15, -0.65], [0.05, -0.72], [0.6, 0.78]].forEach(([x, z]) => tree(x, z));

    // ---------- supplier: a yard of steel coil and timber, with a shed ----------
    const supplier = new THREE.Group(), SX = -0.88;
    supplier.add(at(box(0.42, 0.006, 0.5, concrete), SX, 0.003, 0.0));
    supplier.add(at(box(0.2, 0.12, 0.16, metal("#7f8f9c", 0.5)), SX - 0.08, 0.06, -0.15));
    const roof = box(0.22, 0.008, 0.18, metal("#5d6a74", 0.45)); roof.rotation.z = 0.08; supplier.add(at(roof, SX - 0.08, 0.125, -0.15));
    const coil = new THREE.TorusGeometry(0.028, 0.016, 12, 28);
    for (let i = 0; i < 5; i++) { const c = new THREE.Mesh(coil, metal("#9aa3ad", 0.3)); c.rotation.y = Math.PI / 2; supplier.add(at(c, SX + 0.08, 0.044, -0.2 + i * 0.07)); }
    const log = new THREE.CylinderGeometry(0.014, 0.014, 0.2, 12);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 4 - r; i++) { const l = new THREE.Mesh(log, mat("#9b6b40", { detail: "fibre", repeat: 1, roughness: 0.8, clearcoat: 0 })); l.rotation.z = Math.PI / 2; supplier.add(at(l, SX - 0.06, 0.015 + r * 0.025, 0.06 + (i + r / 2) * 0.029)); }
    add("supplier", supplier);
    label("Supplier", SX, 0.26, -0.1, "supply");

    // ---------- factory: a cut-away shed with the line running through it ----------
    const FX = -0.3, FZ = -0.12, FW = 0.62, FD = 0.42, FH = 0.2;
    const shell = new THREE.Group();
    shell.add(at(box(FW, 0.006, FD, concrete), FX, 0.003, FZ));
    shell.add(at(box(FW, FH, 0.012, brick), FX, FH / 2, FZ - FD / 2));   // back wall
    shell.add(at(box(0.012, FH, FD, brick), FX - FW / 2, FH / 2, FZ)); shell.add(at(box(0.012, FH, FD, brick), FX + FW / 2, FH / 2, FZ));
    shell.add(at(box(FW, 0.05, 0.012, brick), FX, 0.025, FZ + FD / 2));   // a low front wall, so you can see in
    for (let i = 0; i < 4; i++) { const r = box(FW / 4 - 0.01, 0.008, FD * 0.55, cladding); r.rotation.x = -0.35; shell.add(at(r, FX - FW * 3 / 8 + i * FW / 4, FH + 0.04, FZ - FD * 0.24)); }   // saw-tooth roof, back half only
    shell.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.36, 16), brick), FX - FW / 2 + 0.06, 0.18, FZ - FD / 2 + 0.06));   // chimney
    decor(shell, "production");
    label("Factory", FX, FH + 0.18, FZ - 0.1, "production");

    // the line: a belt on rollers, with products moving along it
    const line = new THREE.Group(), LY = 0.07, LX0 = FX - FW / 2 + 0.05, LX1 = FX + FW / 2 - 0.03, LZ = FZ + 0.03;
    line.add(at(box(LX1 - LX0, 0.01, 0.07, paint("#25272b", 0.8)), (LX0 + LX1) / 2, LY, LZ));
    for (let x = LX0; x <= LX1; x += 0.04) { const r = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.075, 10), metal("#a6adb5")); r.rotation.x = Math.PI / 2; line.add(at(r, x, LY - 0.009, LZ)); }
    for (const x of [LX0 + 0.02, (LX0 + LX1) / 2, LX1 - 0.02]) for (const z of [-0.03, 0.03]) line.add(at(box(0.008, LY, 0.008, metal("#5a5f66")), x, LY / 2, LZ + z));
    line.add(at(box(0.07, 0.05, 0.1, metal("#8e98a2", 0.4)), LX0 + 0.04, LY + 0.03, LZ));   // the press that forms each part
    const workers = [person("#2f6db3"), person("#2f6db3")]; at(workers[0], LX0 + 0.13, 0, LZ + 0.08); at(workers[1], LX0 + 0.24, 0, LZ + 0.08);
    workers.forEach((w) => line.add(w));
    const raw = paint("#9aa3ad", 0.4), done = card, items = [];
    for (let i = 0; i < 9; i++) { const it = box(0.032, 0.026, 0.032, raw); it.position.set(LX0, LY + 0.018, LZ); line.add(it); items.push(it); }
    add("line", line);

    // automation: a robot arm partway along, that seals each box
    const robot = new THREE.Group(), RX = (LX0 + LX1) / 2 + 0.02, RZ = LZ - 0.1, orange = paint("#e5862e", 0.4);
    robot.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.03, 24), paint("#2b2d31")), RX, 0.015, RZ));
    const turn = new THREE.Group(); turn.position.set(RX, 0.03, RZ); robot.add(turn);
    turn.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.026, 0.03, 20), orange), 0, 0.015, 0));
    const upper = new THREE.Group(); upper.position.y = 0.035; turn.add(upper);
    upper.add(at(box(0.022, 0.12, 0.022, orange, 0.006), 0, 0.06, 0));
    const fore = new THREE.Group(); fore.position.y = 0.12; upper.add(fore);
    fore.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 12), paint("#2b2d31")), 0, 0, 0));
    fore.add(at(box(0.016, 0.016, 0.1, orange, 0.005), 0, 0, 0.05));
    fore.add(at(box(0.03, 0.02, 0.02, metal("#a6adb5")), 0, -0.01, 0.1));
    upper.rotation.x = 0.35; fore.rotation.x = 0.7;
    add("automation", robot);

    // quality: an inspection station at the end, a light and a reject bin
    const quality = new THREE.Group(), QX = LX1 - 0.07;
    quality.add(at(box(0.012, 0.12, 0.012, metal("#5a5f66")), QX, 0.06 + LY / 2, LZ - 0.045));
    const qlamp = new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 12), new THREE.MeshStandardMaterial({ color: "#3fd06a", emissive: "#3fd06a", emissiveIntensity: 0.8 }));
    quality.add(at(qlamp, QX, LY + 0.13, LZ - 0.045));
    const inspector = person("#f2f2ee"); quality.add(at(inspector, QX, 0, LZ - 0.1));
    inspector.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.014, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), paint("#f2d23a", 0.4)), 0, 0.1, 0));   // hard hat
    quality.add(at(box(0.05, 0.04, 0.05, paint("#b8322e", 0.6)), QX + 0.02, 0.02, LZ + 0.075));
    add("quality", quality);

    // ---------- warehouse: racks of pallets, and a stock gauge ----------
    const WX = 0.38, WZ = -0.12, WW = 0.5, WD = 0.42, WH = 0.22;
    const whShell = new THREE.Group();
    whShell.add(at(box(WW, 0.006, WD, concrete), WX, 0.003, WZ));
    whShell.add(at(box(WW, WH, 0.012, cladding), WX, WH / 2, WZ - WD / 2));
    whShell.add(at(box(0.012, WH, WD, cladding), WX + WW / 2, WH / 2, WZ));
    whShell.add(at(box(0.012, WH, WD * 0.4, cladding), WX - WW / 2, WH / 2, WZ - WD * 0.3));
    for (let i = 0; i < 3; i++) whShell.add(at(box(0.09, 0.08, 0.004, paint("#d6a63a", 0.5)), WX - 0.15 + i * 0.13, 0.04, WZ + WD / 2 + 0.002));   // loading-bay doors
    decor(whShell, "supply");
    const warehouse = new THREE.Group(), pallets = [];
    for (let r = 0; r < 3; r++) {
      const rz = WZ - 0.13 + r * 0.11;
      for (const x of [-0.2, 0.2]) warehouse.add(at(box(0.008, 0.19, 0.06, paint("#2f63b8", 0.5)), WX - 0.04 + x, 0.095, rz));
      for (let lv = 0; lv < 3; lv++) {
        warehouse.add(at(box(0.41, 0.006, 0.06, paint("#e27d2b", 0.5)), WX - 0.04, 0.005 + lv * 0.062, rz));
        for (let b = 0; b < 4; b++) {
          const p = new THREE.Group(); p.add(at(box(0.08, 0.008, 0.05, mat("#b98b58", { detail: "fibre", repeat: 1, roughness: 0.8, clearcoat: 0 })), 0, 0.004, 0));
          p.add(at(box(0.075, 0.04, 0.045, card), 0, 0.028, 0)); p.add(at(box(0.075, 0.004, 0.012, paint("#d8c69a", 0.8)), 0, 0.049, 0));
          warehouse.add(at(p, WX - 0.04 - 0.15 + b * 0.1, 0.008 + lv * 0.062, rz)); pallets.push(p);
        }
      }
    }
    // the stock gauge: maximum, re-order level and buffer stock, filled to the current level
    const GX = WX + WW / 2 + 0.07, GZ = WZ + 0.12, GH = 0.32;
    warehouse.add(at(box(0.05, GH, 0.03, paint("#2b2d31", 0.6)), GX, GH / 2, GZ));
    const fill = box(0.036, 1, 0.034, paint("#3fb46a", 0.5)); warehouse.add(at(fill, GX, 0, GZ));
    const mark = (frac, c, t) => { warehouse.add(at(box(0.07, 0.005, 0.038, paint(c, 0.4)), GX, frac * GH, GZ)); const l = text(t, { size: 0.02, colour: c, bg: "rgba(0,0,0,0.55)" }); l.position.set(GX + 0.1, frac * GH, GZ); decor(l, "supply"); };
    const REORDER = 0.42, BUFFER = 0.17;
    mark(1, "#dfe4ea", "Maximum"); mark(REORDER, "#f2b84b", "Re-order level"); mark(BUFFER, "#e2574c", "Buffer stock");
    const reorderNow = text("Re-order now!", { size: 0.026, colour: "#f2b84b", bg: "rgba(0,0,0,0.65)" }); reorderNow.position.set(GX, GH + 0.05, GZ); decor(reorderNow, "supply"); reorderNow.visible = false;
    add("warehouse", warehouse);
    label("Warehouse", WX, WH + 0.1, WZ - 0.1, "supply");
    k.slider("stock", (v) => {
      const n = Math.round(v * pallets.length); pallets.forEach((p, i) => { p.visible = i < n; });
      fill.scale.y = Math.max(0.001, v * GH); fill.position.y = (v * GH) / 2;
      fill.material.color.set(v <= BUFFER ? "#e2574c" : v <= REORDER ? "#f2b84b" : "#3fb46a");
      reorderNow.visible = v <= REORDER;
    });

    // ---------- the shop, with customers ----------
    const shop = new THREE.Group(), HX = 0.95, HZ = -0.05;
    shop.add(at(box(0.28, 0.18, 0.2, brick), HX, 0.09, HZ - 0.03));
    shop.add(at(box(0.3, 0.012, 0.22, paint("#3b3f46")), HX, 0.186, HZ - 0.03));
    shop.add(at(box(0.22, 0.09, 0.004, glass), HX, 0.06, HZ + 0.072));
    shop.add(at(box(0.05, 0.1, 0.004, paint("#203a5c", 0.4)), HX + 0.105, 0.05, HZ + 0.073));
    for (let i = 0; i < 6; i++) { const a = box(0.05, 0.004, 0.07, paint(i % 2 ? "#f4f1ea" : "#c8384a", 0.6)); a.rotation.x = 0.45; shop.add(at(a, HX - 0.125 + i * 0.05, 0.125, HZ + 0.1)); }
    const fascia = box(0.28, 0.035, 0.006, paint("#203a5c", 0.4)); shop.add(at(fascia, HX, 0.155, HZ + 0.072));
    for (let i = 0; i < 3; i++) shop.add(at(box(0.05, 0.03, 0.03, card), HX - 0.07 + i * 0.07, 0.035, HZ + 0.03));
    add("shop", shop);
    label("Shop", HX, 0.3, HZ, "sales");

    // ---------- online: a van between the warehouse and a customer's house ----------
    const online = new THREE.Group(), OX = 0.95, OZ = 0.88;
    const house = new THREE.Group();
    house.add(at(box(0.14, 0.1, 0.11, brick), 0, 0.05, 0));
    const r1 = box(0.155, 0.006, 0.075, paint("#5b4036", 0.7)); r1.rotation.x = 0.7; house.add(at(r1, 0, 0.125, -0.025));
    const r2 = box(0.155, 0.006, 0.075, paint("#5b4036", 0.7)); r2.rotation.x = -0.7; house.add(at(r2, 0, 0.125, 0.025));
    house.add(at(box(0.03, 0.055, 0.004, paint("#2d6b4a", 0.4)), 0.02, 0.028, -0.056));
    house.add(at(box(0.028, 0.02, 0.022, card), 0.02, 0.01, -0.075));   // a parcel on the step
    online.add(at(house, OX, 0, OZ, Math.PI));
    const van = new THREE.Group();
    van.add(at(box(0.09, 0.05, 0.045, paint("#f4f4f2", 0.4), 0.008), 0, 0.037, 0));
    van.add(at(box(0.03, 0.03, 0.043, glass), 0.044, 0.045, 0));
    for (const [x, z] of [[-0.028, -0.024], [0.028, -0.024], [-0.028, 0.024], [0.028, 0.024]]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.008, 14), paint("#1d1e21", 0.9)); w.rotation.x = Math.PI / 2; van.add(at(w, x, 0.011, z)); }
    online.add(van);
    add("online", online);
    const vanPath = new THREE.CatmullRomCurve3([V(0.38, 0, 0.1), V(0.38, 0, ROADZ + 0.04), V(0.75, 0, ROADZ + 0.04), V(0.86, 0, ROADZ + 0.2), V(0.9, 0, OZ - 0.13)]);

    // customers outside the shop and at home
    const customers = new THREE.Group(), shoppers = [];
    [["#8a3f6b", HX - 0.08, HZ + 0.17], ["#3f7a6b", HX + 0.02, HZ + 0.2], ["#c9a23a", HX + 0.13, HZ + 0.15], ["#4a5ea8", OX - 0.06, OZ - 0.13]].forEach(([c, x, z]) => { const p = person(c); customers.add(at(p, x, 0, z)); shoppers.push(p); });
    add("customers", customers);

    // ---------- logistics: lorries running up the chain ----------
    const lorry = (c) => {
      const g = new THREE.Group();
      g.add(at(box(0.05, 0.055, 0.05, paint(c, 0.4), 0.006), 0.075, 0.042, 0));
      g.add(at(box(0.004, 0.022, 0.044, glass), 0.1, 0.055, 0));
      g.add(at(box(0.15, 0.065, 0.054, paint("#e9e7e1", 0.5)), -0.035, 0.05, 0));
      for (const x of [0.075, -0.02, -0.08]) for (const z of [-0.027, 0.027]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.009, 14), paint("#1d1e21", 0.9)); w.rotation.x = Math.PI / 2; g.add(at(w, x, 0.012, z)); }
      return g;
    };
    const logistics = new THREE.Group(), lorries = [lorry("#c8384a"), lorry("#2f63b8")];
    lorries.forEach((l) => logistics.add(l));
    add("logistics", logistics);
    const roadPath = new THREE.CatmullRomCurve3([V(-1.1, 0, ROADZ - 0.04), V(-0.3, 0, ROADZ - 0.04), V(0.4, 0, ROADZ - 0.04), V(1.1, 0, ROADZ - 0.04)]);

    // goods flow down the chain; money flows back up it
    const G = (x, z, y = 0.035) => V(x, y, z);
    k.flow([[G(-1.1, ROADZ + 0.1, 0.2), G(-0.3, ROADZ + 0.1, 0.24), G(0.4, ROADZ + 0.1, 0.24), G(1.1, ROADZ + 0.1, 0.2)].reverse()], "#f2d23a", 18, 0.12, "sales", 0.02);
    label("Goods →", -0.55, 0.12, ROADZ + 0.12, "supply"); label("← Money", 0.65, 0.3, ROADZ + 0.1, "sales");

    const lerp = (a, b, t) => a + (b - a) * Math.max(0, Math.min(1, t));
    k.tick((t, dt, motion) => {
      if (!motion) return;
      // products along the line: raw metal in, boxed after the robot
      items.forEach((it, i) => { const u = ((t * 0.07 + i / items.length) % 1), x = lerp(LX0 + 0.04, LX1, u); it.position.x = x; it.material = x > RX ? done : raw; it.visible = u > 0.02 && u < 0.98; });
      const ph = (t * 1.4) % (Math.PI * 2); upper.rotation.x = 0.35 + Math.sin(ph) * 0.12; fore.rotation.x = 0.7 + Math.sin(ph) * 0.2; turn.rotation.y = Math.sin(ph * 0.5) * 0.25;
      qlamp.material.color.set(Math.floor(t * 0.7) % 7 === 3 ? "#e2574c" : "#3fd06a"); qlamp.material.emissive.copy(qlamp.material.color);
      lorries.forEach((l, i) => { const u = (t * 0.045 + i * 0.5) % 1; roadPath.getPointAt(u, l.position); const ahead = roadPath.getPointAt(Math.min(0.999, u + 0.001)); l.rotation.y = -Math.atan2(ahead.z - l.position.z, ahead.x - l.position.x); });
      const vu = (Math.sin(t * 0.35) + 1) / 2; vanPath.getPointAt(vu, van.position); const va = vanPath.getTangentAt(vu); van.rotation.y = -Math.atan2(va.z, va.x);
      shoppers.slice(0, 3).forEach((p, i) => { p.position.x = HX - 0.08 + i * 0.1 + Math.sin(t * 0.6 + i * 2) * 0.03; });
    });
  },
};
