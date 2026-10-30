// SocGradify's 3D model: a society as a social network. People are nodes in communities, tied by
// strong and weak links; bridges join the clusters; a hub sits at the centre of influence; and
// layers of institutions (family, education, work, state) sit beneath. Notes cover theory,
// inequality, institutions and methods.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  network: { name: "Networks", c: "#5ef0ff" },
  structure: { name: "Social structure", c: "#f055dd" },
  methods: { name: "Theory & methods", c: "#ffe066" },
};

const STRUCTURES = {
  communities: s("network", "Communities (clusters)", "Dense groups of people tied closely to each other: families, friendship groups, neighbourhoods.",
    ["**Homophily**: people tend to connect with others like them (class, ethnicity, age, views).", "Tönnies: Gemeinschaft (close community) vs Gesellschaft (impersonal society).", "Dense clusters give support and social control, but can be closed to outsiders."],
    [["What is homophily?", "The tendency to form ties with people similar to ourselves."], ["Distinguish Gemeinschaft and Gesellschaft.", "Gemeinschaft: close-knit community based on personal ties. Gesellschaft: impersonal, contractual society."], ["Give one benefit and one cost of a dense network.", "Benefit: support and trust. Cost: conformity pressure and closedness to new information."]],
    ["community", "cluster", "homophily", "tönnies", "group"]),
  weakTies: s("network", "Weak ties and bridges", "Acquaintances who link different clusters. They carry new information between groups.",
    ["**Granovetter (1973), 'The Strength of Weak Ties'**: most people found jobs through acquaintances, not close friends.", "Burt's structural holes: people who bridge gaps gain information and opportunity.", "Bridging social capital (across groups) vs bonding (within a group) (Putnam)."],
    [["What did Granovetter's 'strength of weak ties' show?", "Acquaintances bring new information, such as job leads, more than close friends do."], ["What is bridging social capital?", "Connections across different social groups."], ["What is a structural hole?", "A gap between groups that a person can bridge to gain advantage."]],
    ["weak ties", "granovetter", "bridge", "social capital", "putnam", "acquaintance"]),
  hub: s("network", "Hubs and influence", "A few people have many more connections than most. Influence, information and contagion flow through them.",
    ["Many real networks are **scale-free**: a few hubs, many people with few links.", "Small world: most people are linked by a short chain (Milgram's 'six degrees', 1967).", "Bourdieu: social capital (who you know) converts into economic and cultural capital."],
    [["What did Milgram's small-world experiment suggest?", "People are connected by short chains, about six steps on average."], ["What is a scale-free network?", "One with a few highly connected hubs and many nodes with few connections."], ["What is social capital (Bourdieu)?", "Resources from your network of relationships, which can be converted into other forms of capital."]],
    ["hub", "influence", "small world", "six degrees", "milgram", "bourdieu", "social capital"]),
  institutions: s("structure", "Institutions", "The family, education, work, religion, media and the state: patterned ways of organising social life that shape individuals.",
    ["**Functionalists** (Durkheim, Parsons) see institutions meeting society's needs and creating consensus.", "**Marxists** see them reproducing class inequality (Althusser's ideological state apparatus).", "**Feminists** highlight patriarchy within them (e.g. the domestic division of labour)."],
    [["How do functionalists view social institutions?", "As parts of a system that meet society's needs and maintain consensus and order."], ["What is Althusser's ideological state apparatus?", "Institutions like education and media that spread ruling-class ideology."], ["Give a feminist criticism of the family.", "It maintains patriarchy, e.g. women's unpaid domestic labour and the dual burden."]],
    ["institution", "family", "education", "functionalism", "marxism", "feminism", "durkheim", "parsons"]),
  inequality: s("structure", "Stratification and inequality", "Society is layered by class, gender, ethnicity, age and more. Life chances differ by layer.",
    ["Weber: class, status and party are separate dimensions of inequality.", "**Intersectionality** (Crenshaw, 1989): inequalities overlap and combine.", "Social mobility measures movement between classes; the UK's is relatively low."],
    [["What are Weber's three dimensions of stratification?", "Class, status and party (power)."], ["What is intersectionality?", "How different inequalities (class, gender, ethnicity...) interact and compound each other."], ["What is social mobility?", "Movement of individuals or groups between positions in the social hierarchy."]],
    ["inequality", "class", "stratification", "intersectionality", "weber", "mobility", "gender", "ethnicity"]),
  globalisation: s("structure", "Globalisation", "Growing interconnection of societies through trade, migration, media and technology.",
    ["Giddens: time–space distanciation: relationships stretched across the globe.", "Hyperglobalists, sceptics and transformationalists disagree about how new or total it is.", "Glocalisation: global products adapted to local cultures."],
    [["What is globalisation?", "The increasing interconnectedness of societies worldwide."], ["What is glocalisation?", "Adapting global products or ideas to local cultures."], ["Name the three positions in the globalisation debate.", "Hyperglobalist, sceptic and transformationalist."]],
    ["globalisation", "giddens", "global", "migration", "glocalisation"]),
  theory: s("methods", "Structure and agency", "The core debate: do social structures shape us (structure), or do we shape society through our actions (agency)?",
    ["Structural theories: functionalism, Marxism. Action theories: interactionism (Mead, Goffman), Weber's social action.", "Giddens' **structuration**: structure and agency produce each other.", "Positivism (scientific, quantitative) vs interpretivism (meanings, qualitative)."],
    [["What is the structure–agency debate?", "Whether social structures determine behaviour or individuals actively shape society."], ["What is Giddens' structuration theory?", "Structure and agency are a duality: our actions reproduce structures, which in turn shape our actions."], ["Distinguish positivism and interpretivism.", "Positivism seeks objective, measurable laws (quantitative); interpretivism seeks to understand meanings (qualitative)."]],
    ["structure", "agency", "structuration", "interactionism", "positivism", "interpretivism", "theory"]),
  methods: s("methods", "Research methods", "How sociologists study society: surveys, interviews, observation, official statistics, documents.",
    ["Judge methods by **PET**: practical, ethical and theoretical issues.", "Reliability (repeatable) vs validity (true picture); representativeness and generalisability.", "Network analysis maps ties directly: who is connected to whom."],
    [["What does PET stand for in evaluating methods?", "Practical, ethical and theoretical factors."], ["Distinguish reliability and validity.", "Reliability: consistent, repeatable results. Validity: a true picture of what's studied."], ["Give one strength of unstructured interviews.", "High validity: rich, detailed data in the participant's own words."]],
    ["research methods", "survey", "interview", "observation", "reliability", "validity", "ethics", "sampling"]),
};

const NOTES = {
  network: { title: "Social networks and social capital", lead: "Society isn't just individuals or institutions: it's the web of relationships between people. Network thinking shows how opportunity, information and norms move.",
    sections: [
      ["Key ideas", "- Nodes (people) and ties (relationships); density, centrality, clustering.", "- Strong ties (close, frequent, emotionally intense) vs weak ties (acquaintances).", "- Bonding, bridging and linking social capital (Putnam, Bowling Alone, 2000: declining civic participation in the US)."],
      ["Networks and inequality", "- Who you know shapes jobs, education and health: networks reproduce advantage.", "- Elite networks: private schools and Oxbridge (Bourdieu's cultural and social capital).", "- Online networks can widen or narrow horizons (echo chambers, filter bubbles)."],
      ["Contagion and influence", "- Ideas, behaviours and even health habits spread through networks (Christakis and Fowler).", "- Moral panics and folk devils (Cohen, 1972) amplify through media networks.", "> Evaluate: correlation in networks doesn't prove contagion: similar people also choose each other (homophily)."],
    ] },
  structure: { title: "Social structure, institutions and inequality", lead: "Beneath everyday interaction lie the structures of society: institutions and inequalities that shape life chances.",
    sections: [
      ["The family", "- Functionalist: primary socialisation and stabilisation of adult personalities (Parsons).", "- Marxist: reproduces capitalism, unit of consumption (Zaretsky).", "- Feminist: patriarchal; the dual burden and triple shift (Duncombe and Marsden).", "- Postmodern: family diversity and choice."],
      ["Education", "- Functionalist: meritocracy and role allocation (Davis and Moore).", "- Marxist: correspondence principle and hidden curriculum (Bowles and Gintis).", "- Interactionist: labelling and the self-fulfilling prophecy (Rosenthal and Jacobson; Becker)."],
      ["Class, gender, ethnicity", "- Class gaps in attainment: material deprivation, cultural capital, school factors.", "- Gender: girls outperform boys at GCSE; subject choice remains gendered.", "- Ethnicity: differences in attainment, exclusions and labour-market outcomes; institutional racism (Macpherson Report, 1999)."],
    ] },
  methods: { title: "Theory and methods", lead: "Every sociological claim rests on a theory of society and a method of finding out. Evaluate both.",
    sections: [
      ["Major perspectives", "- Functionalism: consensus, value consensus, institutions meet needs (Durkheim, Parsons).", "- Marxism: conflict between classes; ideology; neo-Marxism (Gramsci's hegemony).", "- Feminism: liberal, radical, Marxist, intersectional.", "- Interactionism: meanings, labelling, the self (Mead, Goffman's dramaturgy).", "- Postmodernism: fragmentation, identity choice, media-saturated society (Baudrillard)."],
      ["Methods", "- Quantitative: questionnaires, structured interviews, official statistics (reliable, generalisable, may lack validity).", "- Qualitative: unstructured interviews, participant observation, documents (valid, detailed, less reliable).", "- Mixed methods and triangulation."],
      ["Ethics and practicalities", "- Informed consent, confidentiality, harm, deception (covert observation: Humphreys, 'Tearoom Trade').", "- Access, time, cost, the researcher's characteristics.", "! In essays, apply methods to a specific context (e.g. studying pupils, gangs, families): generic points score less."],
    ] },
};

export default {
  title: "Society as a network, in 3D", kicker: "3D sociology",
  intro: { title: "Explore a society", text: "People as nodes in communities, joined by strong ties and weak-tie bridges, with hubs of influence and the institutions that shape them underneath. Watch information spread. Click anything for the theory and research, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Evaluate",
  quiz: "find it in the network",
  motion: "Information spreading",
  camera: { pos: [0.5, 1.5, 3.0], target: [0, 0.35, 0], min: 0.05, max: 5 },
  views: { Society: [[0.5, 1.5, 3.0], [0, 0.35, 0]], Above: [[0.05, 2.4, 0.3], [0, 0.3, 0]], Institutions: [[0.6, 0.3, 1.4], [0, 0.05, 0]], Hub: [[0.3, 0.7, 0.8], [0, 0.45, 0]] },
  platform: { r: 1.1, y: -0.005 },
  labelMax: 3,
  explode: true,
  bg: ["#141e3a", "#05070f"],
  build(k) {
    const { THREE, V, mat, glow, limb, box, text, add, decor } = k;
    const rnd = (() => { let x = 21; return () => (x = (x * 16807) % 2147483647) / 2147483647; })();
    const centres = [V(-0.55, 0.45, -0.1), V(0.5, 0.5, -0.25), V(0.0, 0.42, 0.45), V(-0.15, 0.6, -0.6), V(0.55, 0.38, 0.4)];
    const colours = ["#5ef0ff", "#f055dd", "#ffe066", "#6bffb8", "#ff8f6b"];
    const people = [];
    centres.forEach((c, ci) => { for (let i = 0; i < 14; i++) people.push({ p: c.clone().add(V(rnd() - 0.5, (rnd() - 0.5) * 0.6, rnd() - 0.5).multiplyScalar(0.28)), ci }); });
    const hubP = V(0.0, 0.5, -0.05);
    // communities: nodes and dense strong ties inside each cluster
    const comm = new THREE.Group(), strong = [];
    centres.forEach((c, ci) => {
      const mine = people.filter((q) => q.ci === ci);
      const inst = new THREE.InstancedMesh(new THREE.SphereGeometry(0.018, 20, 14), mat(colours[ci], { detail: "none", clearcoat: 1, emissive: new THREE.Color(colours[ci]).multiplyScalar(0.25) }), mine.length);
      const m4 = new THREE.Matrix4(); mine.forEach((q, i) => inst.setMatrixAt(i, m4.makeTranslation(q.p.x, q.p.y, q.p.z))); comm.add(inst);
      mine.forEach((a, i) => mine.forEach((b, j) => { if (j > i && a.p.distanceTo(b.p) < 0.17) strong.push(a.p, b.p); }));
    });
    comm.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(strong), new THREE.LineBasicMaterial({ color: "#bfefff", transparent: true, opacity: 0.55 })));
    add("communities", comm);
    // weak ties bridging clusters
    const weak = new THREE.Group(), bridgePaths = [];
    for (let i = 0; i < 9; i++) { const a = people[Math.floor(rnd() * people.length)], b = people.find((q) => q.ci === (a.ci + 1 + (i % 4)) % 5 && rnd() > 0.6) || people[(i * 13) % people.length]; if (a.ci === b.ci) continue; const mid = a.p.clone().lerp(b.p, 0.5).add(V(0, 0.15, 0)); const curve = new THREE.QuadraticBezierCurve3(a.p, mid, b.p); weak.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.002, 6), glow("#ffe066", 0.6))); bridgePaths.push(curve); }
    add("weakTies", weak);
    // a hub linked across the society
    const hub = new THREE.Group(); hub.position.copy(hubP);
    hub.add(new THREE.Mesh(new THREE.SphereGeometry(0.04, 32, 24), mat("#ffffff", { detail: "none", clearcoat: 1, emissive: new THREE.Color("#5a5a7a") })));
    hub.add(new THREE.Mesh(new THREE.SphereGeometry(0.075, 32, 24), glow("#c8d8ff", 0.15)));
    for (let i = 0; i < 16; i++) { const q = people[(i * 5) % people.length]; hub.add(limb(V(0, 0, 0), q.p.clone().sub(hubP), 0.0018, glow("#ffffff", 0.35), false)); }
    const hl = text("Hub", { size: 0.03, bg: "rgba(0,0,0,0.55)" }); hl.position.set(0, 0.08, 0); hub.add(hl);
    add("hub", hub);
    // institutions: stacked layers beneath the network
    const inst = new THREE.Group();
    [["Family", "#ff8fa3"], ["Education", "#ffb36b"], ["Work & economy", "#ffe066"], ["Media & religion", "#9fdcff"], ["The state & law", "#c79bff"]].forEach(([name, c], i) => { const slab = box(1.3 - i * 0.12, 0.018, 1.0 - i * 0.1, mat(c, { detail: "none", roughness: 0.2, clearcoat: 1, transparent: true, opacity: 0.55, emissive: new THREE.Color(c).multiplyScalar(0.1) }), 0.01); slab.position.y = 0.02 + i * 0.035; inst.add(slab); const l = text(name, { size: 0.025, bg: "rgba(0,0,0,0.5)" }); l.position.set(-0.7 + i * 0.06, 0.03 + i * 0.035, 0.45 - i * 0.05); inst.add(l); });
    add("institutions", inst);
    // inequality: a stepped pyramid of class to one side
    const pyr = new THREE.Group(); pyr.position.set(-0.95, 0, 0.45);
    [[0.3, "#7a5aa0"], [0.24, "#9a7ac0"], [0.17, "#ba9ae0"], [0.1, "#dabaff"], [0.04, "#ffffff"]].forEach(([w, c], i) => { const b = box(w, 0.05, w, mat(c, { detail: "none", clearcoat: 1, roughness: 0.25 }), 0.006); b.position.y = 0.025 + i * 0.052; pyr.add(b); });
    const pl = text("Stratification", { size: 0.025, bg: "rgba(0,0,0,0.55)" }); pl.position.set(0, 0.32, 0); pyr.add(pl);
    add("inequality", pyr);
    // globalisation: a small globe with arcs to the clusters
    const glob = new THREE.Group(); glob.position.set(0.95, 0.3, -0.5);
    glob.add(new THREE.Mesh(new THREE.SphereGeometry(0.08, 32, 24), mat("#2a6fd6", { detail: "tissue", repeat: 3, clearcoat: 0.8 })));
    glob.add(new THREE.Mesh(new THREE.SphereGeometry(0.082, 24, 16), new THREE.MeshBasicMaterial({ color: "#5ef0ff", wireframe: true, transparent: true, opacity: 0.3 })));
    const gl = text("Globalisation", { size: 0.025, bg: "rgba(0,0,0,0.55)" }); gl.position.set(0, 0.13, 0); glob.add(gl);
    add("globalisation", glob);
    // theory and methods: a lens over the network, and a clipboard of methods
    const lens = new THREE.Group(); lens.position.set(-0.95, 0.55, -0.4);
    lens.add(new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.008, 16, 64), mat("#ffe066", { detail: "none", metalness: 0.7, roughness: 0.3 })));
    lens.add(new THREE.Mesh(new THREE.CircleGeometry(0.078, 48), mat("#bfefff", { detail: "none", transmission: 0.9, thickness: 0.02, roughness: 0.05, transparent: true, opacity: 0.3, side: THREE.DoubleSide })));
    lens.add(limb(V(0.055, -0.055, 0), V(0.14, -0.14, 0), 0.008, mat("#3a2a1a", { detail: "fibre" }), false));
    const tl = text("Structure ⇄ agency", { size: 0.025, bg: "rgba(0,0,0,0.55)" }); tl.position.set(0, 0.13, 0); lens.add(tl);
    add("theory", lens);
    const clip = new THREE.Group(); clip.position.set(0.95, 0.1, 0.5);
    clip.add(box(0.14, 0.18, 0.01, mat("#8a6a48", { detail: "fibre" }), 0.006)); for (let i = 0; i < 5; i++) { const ln = box(0.09, 0.006, 0.002, mat("#efe6d2", { detail: "none" })); ln.position.set(0.01, 0.05 - i * 0.025, 0.007); clip.add(ln); const tick = box(0.012, 0.012, 0.002, mat(i % 2 ? "#6bffb8" : "#efe6d2", { detail: "none" })); tick.position.set(-0.05, 0.05 - i * 0.025, 0.007); clip.add(tick); }
    clip.rotation.x = -0.4; const ml = text("Methods", { size: 0.025, bg: "rgba(0,0,0,0.55)" }); ml.position.set(0, 0.14, 0); clip.add(ml);
    add("methods", clip);
    // information spreading along weak ties and from the hub
    if (bridgePaths.length) k.flow(bridgePaths, "#fff3a0", 40, 0.3, "network", 0.014);
    k.flow(people.filter((q, i) => i % 4 === 0).map((q) => [hubP.clone(), q.p.clone()]), "#ffffff", 40, 0.35, "network", 0.01);
    k.tick((t, dt, motion) => { if (!motion) return; glob.rotation.y = t * 0.4; hub.children[1].scale.setScalar(1 + Math.sin(t * 2) * 0.15); });
  },
};
