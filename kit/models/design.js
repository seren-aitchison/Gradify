// CreateGradify's 3D model: the design process as a place you can walk through. The Double Diamond lies on
// the floor (discover, define, develop, deliver), with ideas fanning out and narrowing as you go, and in each
// phase the methods designers use: interviews, an affinity wall, a persona, the "How might we" question at the
// waist, a brainstorm wall, Crazy 8s sketches, a cardboard prototype and a user test.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  diamond: { name: "The Double Diamond", c: "#5ec8ff" },
  research: { name: "Understanding people", c: "#7be08a" },
  making: { name: "Ideas and prototypes", c: "#f2b84b" },
};

const STRUCTURES = {
  discover: s("diamond", "Discover", "The first half of the first diamond: **diverge**. Go wide to understand the problem from the people who have it, before deciding what the problem really is.",
    ["The Double Diamond was published by the UK's **Design Council** in **2005**; its 2019 Framework for Innovation adds principles such as *put people first* and *iterate*.", "**Divergent thinking** generates many possibilities; **convergent thinking** narrows them down (J. P. Guilford's terms).", "Discovery methods: interviews, observation, diary studies, desk research."],
    [["What are the four phases of the Double Diamond?", "Discover, define, develop, deliver."], ["Who published the Double Diamond, and when?", "The UK Design Council, in 2005."], ["What is divergent thinking?", "Generating many different possibilities, without judging them yet."]],
    ["discover", "double diamond", "divergent thinking", "design council", "research"]),
  define: s("diamond", "Define", "The second half of the first diamond: **converge**. Make sense of what you found and agree the real problem to solve, as a clear brief.",
    ["Synthesis turns many observations into a few **insights**: what people need, and why.", "The **five whys** (from Toyota) keeps asking why to reach a root cause rather than a symptom.", "A good problem statement is about people's needs, not a solution in disguise."],
    [["What happens in the define phase?", "Findings are synthesised into insights and a clear statement of the problem to solve."], ["What are the five whys?", "Asking 'why?' repeatedly (about five times) to get from a symptom to a root cause."], ["Why shouldn't a problem statement name a solution?", "It closes off other, possibly better, ideas before they're explored."]],
    ["define", "synthesis", "insight", "problem statement", "five whys", "convergent thinking"]),
  develop: s("diamond", "Develop", "The first half of the second diamond: **diverge** again. Generate many possible solutions, then build quick versions of the most promising.",
    ["Quantity first: the more ideas, the more likely a good one.", "Co-design brings the people you're designing for into the process.", "Combine and build on ideas rather than defending your own."],
    [["What happens in the develop phase?", "Many possible solutions are generated, explored and roughly prototyped."], ["Why aim for a large number of ideas early on?", "Quantity breeds quality: more options make strong ideas more likely, and early ideas are often obvious ones."], ["What is co-design?", "Designing with the people who'll use the solution, not just for them."]],
    ["develop", "ideation", "ideate", "co-design", "solutions"]),
  deliver: s("diamond", "Deliver", "The second half of the second diamond: **converge**. Test, reject what doesn't work, improve what does, and launch the solution.",
    ["**Iterate**: build, test, learn, repeat. Each loop is cheaper than one big failure at launch.", "Testing with real users beats asking people what they'd like.", "Delivery isn't the end: feedback after launch starts the next round."],
    [["What happens in the deliver phase?", "Solutions are tested, refined and narrowed down to one that is launched."], ["What does it mean to iterate?", "To repeat cycles of making, testing and improving."], ["Why test with users instead of just asking their opinion?", "What people do with a design often differs from what they say they want."]],
    ["deliver", "iterate", "iteration", "launch", "test"]),
  interviews: s("research", "User interviews", "A designer talks one-to-one with someone who has the problem, asking open questions about what they actually do and feel.",
    ["Ask about **past behaviour** (\"tell me about the last time…\"), not hypothetical futures (\"would you use…?\").", "Use **open questions** and follow-ups; listen more than you talk.", "**Observation** shows what people do, which can differ from what they say."],
    [["Why ask about past behaviour rather than future intentions?", "People are poor at predicting what they'd do; real past events are more reliable."], ["Give an example of an open question.", "\"Tell me about the last time you…\" or \"How do you…?\" (anything that can't be answered yes or no)."], ["Why combine interviews with observation?", "What people say they do can differ from what they actually do."]],
    ["interview", "user research", "empathy", "open questions", "observation"]),
  affinity: s("research", "Affinity wall", "Every finding on a sticky note, then grouped by theme until patterns appear. The clusters become insights.",
    ["Also called the **KJ method**, after the Japanese anthropologist **Jiro Kawakita**, who developed it in the 1960s.", "Group bottom-up: let themes emerge from the notes rather than sorting into categories decided in advance.", "Name each cluster with an insight sentence, not a single word."],
    [["What is an affinity diagram?", "A way of grouping many findings (often on sticky notes) by theme so patterns emerge."], ["Who developed the affinity (KJ) method?", "Jiro Kawakita."], ["Why sort findings bottom-up?", "So that themes emerge from the data rather than from your assumptions."]],
    ["affinity diagram", "affinity map", "kj method", "kawakita", "sticky notes", "synthesis"]),
  persona: s("research", "Persona", "A portrait of a typical user, built from research: their goals, frustrations and context, so the team designs for someone specific.",
    ["**Alan Cooper** popularised personas in *The Inmates Are Running the Asylum* (1999).", "A persona must come from research; one made up in a meeting just reflects the team's assumptions.", "An **empathy map** records what a user says, thinks, does and feels."],
    [["What is a persona?", "A research-based profile of a typical user, with their goals, needs and frustrations."], ["Who popularised personas in design?", "Alan Cooper (The Inmates Are Running the Asylum, 1999)."], ["What four areas does an empathy map cover?", "What the user says, thinks, does and feels."]],
    ["persona", "personas", "empathy map", "alan cooper", "user"]),
  hmw: s("research", "How might we…?", "At the waist between the diamonds: the problem reframed as a question that invites ideas. 'How' assumes there's an answer, 'might' allows for many, 'we' makes it shared.",
    ["The phrase came from **Min Basadur** at Procter & Gamble in the 1970s, and was spread by IDEO.", "Too broad (\"How might we fix transport?\") gives no focus; too narrow names the solution.", "A good one: *How might we help first-year students find a study group in their first week?*"],
    [["What is a 'How might we' question?", "A problem statement reframed as an open question that invites many solutions."], ["What's wrong with a 'How might we' that names a solution?", "It's too narrow: it shuts out other ideas."], ["Where does the 'How might we' sit in the Double Diamond?", "At the waist between the two diamonds, ending define and starting develop."]],
    ["how might we", "hmw", "brief", "problem statement", "reframe"]),
  brainstorm: s("making", "Brainstorm wall", "A wall of ideas from a brainstorm: many of them, some wild, built on each other's.",
    ["**Alex Osborn** set out brainstorming's rules in *Applied Imagination* (1953): no criticism, wild ideas welcome, go for quantity, combine and improve.", "Silent writing first (**brainwriting**) stops the loudest voices dominating.", "**Dot voting** lets a team pick the strongest ideas quickly."],
    [["Give Osborn's four rules of brainstorming.", "No criticism (defer judgement), wild ideas welcome, go for quantity, combine and improve ideas."], ["What is brainwriting?", "Writing ideas silently and individually before sharing, so everyone contributes."], ["What is dot voting?", "Each person places a few dots on their favourite ideas to prioritise them."]],
    ["brainstorm", "brainstorming", "osborn", "ideas", "brainwriting", "dot voting"]),
  sketches: s("making", "Crazy 8s", "A sheet folded into eight panels: eight rough sketches of ideas in eight minutes. Speed pushes past the first, obvious idea.",
    ["Crazy 8s is part of the **Design Sprint** from Google Ventures, described in Jake Knapp's *Sprint* (2016).", "Sketching is thinking: rough drawing beats polished drawing at this stage.", "**SCAMPER** prompts new ideas: substitute, combine, adapt, modify, put to another use, eliminate, reverse."],
    [["What is Crazy 8s?", "Sketching eight different ideas in eight minutes, one per panel."], ["Why sketch quickly and roughly?", "It gets ideas out fast, past obvious first ideas, without wasting effort on polish."], ["What does SCAMPER stand for?", "Substitute, combine, adapt, modify, put to another use, eliminate, reverse."]],
    ["crazy 8s", "sketching", "design sprint", "scamper", "sketch"]),
  prototype: s("making", "Prototype", "A cardboard and paper model of the idea: rough, cheap and quick, made to learn from, not to last.",
    ["**Low fidelity** (paper, cardboard) is fast and invites honest feedback; **high fidelity** looks and works like the real thing.", "Prototype to answer a question: will people understand it? does it fit? will they use it?", "\"Fail early, fail cheap\": finding a flaw in cardboard costs far less than in production."],
    [["What is a low-fidelity prototype?", "A rough, quick version of an idea (paper, cardboard) used to test it early."], ["Why prototype before building the real thing?", "To learn and find problems cheaply and early."], ["What's the difference between low- and high-fidelity prototypes?", "Low fidelity is rough and quick; high fidelity looks and works close to the final product."]],
    ["prototype", "prototyping", "low fidelity", "high fidelity", "mock-up", "model"]),
  usertest: s("making", "User test", "Someone tries the prototype for real while the designer watches, staying quiet, noting where they hesitate or get stuck.",
    ["Ask users to **think aloud** as they go.", "**Jakob Nielsen** (2000) argued that testing with about **five users** finds most usability problems; test small and often.", "Don't help or explain: if they need help, the design does."],
    [["What is a think-aloud test?", "Users say what they're thinking as they use a design, so you hear their reasoning."], ["About how many users did Nielsen say find most usability problems?", "Five."], ["Why shouldn't the designer explain the prototype during a test?", "Real users won't have the designer there; confusion reveals what needs fixing."]],
    ["user testing", "usability", "think aloud", "nielsen", "feedback"]),
};

const NOTES = {
  diamond: { title: "The Double Diamond", lead: "A map of the design process from the **Design Council** (2005): two diamonds, each opening out (**diverge**) then narrowing (**converge**). The first diamond is about the **right problem**; the second about the **right solution**.",
    sections: [
      ["The four phases", "1. **Discover**: understand the problem through research with people.", "2. **Define**: synthesise findings into a clear problem to solve.", "3. **Develop**: generate and explore many possible solutions.", "4. **Deliver**: test, refine and launch the one that works.", "> Key point: it isn't a straight line. Teams loop back whenever testing reveals they misunderstood something."],
      ["Diverge, then converge", "- **Diverge**: suspend judgement, go for range and quantity.", "- **Converge**: evaluate, choose and focus.", "Mixing the two at once (judging ideas as they appear) kills ideas too early."],
      ["Other models", "- Stanford **d.school**: empathise, define, ideate, prototype, test.", "- **Design sprint**: map, sketch, decide, prototype, test, in five days.", "All share the same core: understand people, frame the problem, make and test."],
    ] },
  research: { title: "Understanding people", lead: "Design starts with the people you're designing for. Research replaces assumptions with evidence, then synthesis turns evidence into a problem worth solving.",
    sections: [
      ["Research methods", "- **Interviews**: open questions about real past experiences.", "- **Observation** and **contextual inquiry**: watch people where the problem happens.", "- **Diary studies**: people record experiences over days or weeks.", "- **Desk research**: existing data, reports and competitors."],
      ["Making sense of it", "- **Affinity diagrams**: cluster findings into themes.", "- **Personas** and **empathy maps**: keep real users in view.", "- **Journey maps**: every step of an experience, with its highs and lows.", "- **Five whys**: dig from symptoms to root causes."],
      ["Framing the problem", "End the first diamond with a **How might we…?** question: specific enough to focus, open enough for many answers.", "> Key point: a well-framed problem is half solved. Time spent here saves time building the wrong thing."],
    ] },
  making: { title: "Ideas, prototypes and testing", lead: "In the second diamond, teams make many ideas, build quick versions of the best, and let real users show what works.",
    sections: [
      ["Generating ideas", "- **Brainstorming** (Osborn's rules): no criticism, wild ideas, quantity, build on others.", "- **Brainwriting**: write silently first.", "- **Crazy 8s**: eight sketches in eight minutes.", "- **SCAMPER** and **analogies**: borrow from other fields."],
      ["Prototyping", "Build the cheapest thing that answers your question: paper screens, cardboard models, role-play, a fake front door.", "Increase **fidelity** only as confidence grows."],
      ["Testing and iterating", "- Watch, don't explain; ask users to think aloud.", "- Test with a few users, fix, test again.", "- Record what you learn, and decide: **persevere, pivot or stop**.", "> Key point: a failed test is a success if it saves you from launching the wrong thing."],
    ] },
};

export default {
  title: "Design thinking in 3D", kicker: "3D design thinking",
  intro: { title: "Walk through the Double Diamond", text: "The design process laid out on the floor: discover and define the right problem, then develop and deliver the right solution. Ideas fan out and narrow as they travel. Click a phase or any method to learn how designers use it." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Key point",
  quiz: "find the method",
  motion: "Ideas flowing",
  trueColour: true,
  camera: { pos: [0.1, 1.55, 2.35], target: [0.0, 0.1, 0.05], min: 0.3, max: 5 },
  views: { Overview: [[0.1, 1.55, 2.35], [0.0, 0.1, 0.05]], "From above": [[0, 2.7, 0.1], [0, 0, 0]], "The problem": [[-0.55, 0.6, 1.0], [-0.5, 0.1, 0]], "The solution": [[0.55, 0.6, 1.0], [0.5, 0.1, 0]] },
  platform: { r: 0.55 },
  shadow: { left: -1.5, right: 1.5, top: 1.2, bottom: -1.2, near: 0.5, far: 9 },
  explode: false,
  build(k) {
    const { THREE, V, mat, text, add, decor, box, tube } = k;
    const at = (o, x, y, z, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; return o; };
    const paint = (c, r = 0.55) => mat(c, { detail: "none", roughness: r, clearcoat: 0.2 });
    const wood = mat("#b98b58", { detail: "fibre", repeat: 2, bump: 0.2, roughness: 0.6, clearcoat: 0.2 });
    const card = mat("#c49a62", { detail: "fibre", repeat: 2, bump: 0.25, roughness: 0.85, clearcoat: 0 });
    const NOTE = ["#ffe066", "#ff9ec7", "#8fe3ff", "#a6f0a0", "#ffb46b"];
    const skins = ["#e8c3a0", "#c99a74", "#8d5a3b", "#f0d0b4", "#b07850", "#5c3a24"];
    let si = 0;
    const person = (c, seated = false) => { const g = new THREE.Group(), y0 = seated ? 0.035 : 0; g.add(at(new THREE.Mesh(new THREE.CapsuleGeometry(0.016, 0.05, 6, 14), paint(c, 0.85)), 0, y0 + 0.045, 0)); g.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.013, 20, 14), paint(skins[si++ % skins.length], 0.6)), 0, y0 + 0.096, 0)); return g; };
    const stool = () => { const g = new THREE.Group(); g.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.006, 16), wood), 0, 0.035, 0)); g.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.035, 6), paint("#333")), 0, 0.0175, 0)); return g; };
    const lab = (t, x, y, z, grp, size = 0.03) => { const l = text(t, { size, bg: "rgba(0,0,0,0.55)" }); l.position.set(x, y, z); decor(l, grp); return l; };
    const notes = (g, w, h, n, seed, x0, y0, z0) => { let r = seed; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647; for (let i = 0; i < n; i++) { const m = box(0.028, 0.028, 0.002, paint(NOTE[Math.floor(rnd() * NOTE.length)], 0.8)); m.position.set(x0 + (rnd() - 0.5) * w, y0 + (rnd() - 0.5) * h, z0); m.rotation.z = (rnd() - 0.5) * 0.2; g.add(m); } };

    decor(at(box(2.5, 0.02, 1.35, mat("#e9e6df", { detail: "none", roughness: 0.9, clearcoat: 0 })), 0, -0.01, 0));

    // ---------- the Double Diamond on the floor: four triangles, raised a little ----------
    const HW = 0.5, HD = 0.36, DX = [-0.5, 0.5];   // half-width of each diamond, half-depth, centres
    const tri = (pts, c) => { const sh = new THREE.Shape(pts.map(([x, z]) => new THREE.Vector2(x, -z))); const g = new THREE.ExtrudeGeometry(sh, { depth: 0.012, bevelEnabled: false }); const m = new THREE.Mesh(g, mat(c, { detail: "none", roughness: 0.35, clearcoat: 0.8, transparent: true, opacity: 0.88 })); m.rotation.x = -Math.PI / 2; return m; };
    const phases = [["discover", DX[0], -1, "#4fb8c9"], ["define", DX[0], 1, "#3f78c4"], ["develop", DX[1], -1, "#e2a23a"], ["deliver", DX[1], 1, "#d65f8a"]];
    for (const [id, cx, side, c] of phases) {
      const g = new THREE.Group(), tip = cx + side * HW;
      g.add(tri([[cx, -HD], [tip, 0], [cx, HD]], c));
      g.add(tube([V(cx, 0.013, -HD), V(tip, 0.013, 0), V(cx, 0.013, HD)], 0.004, paint("#ffffff", 0.3), 30, false, 8));
      add(id, g);
      lab(id[0].toUpperCase() + id.slice(1), cx + side * HW * 0.42, 0.03, HD * 0.62 + 0.06, "diamond", 0.034);
    }
    lab("The right problem", DX[0], 0.035, -HD - 0.07, "diamond", 0.028); lab("The right solution", DX[1], 0.035, -HD - 0.07, "diamond", 0.028);

    // ideas fan out and narrow: paths from each diamond's left point, out across it, back to its right point
    const fan = (cx) => { const out = []; for (let i = -3; i <= 3; i++) out.push([V(cx - HW + 0.02, 0.03, 0), V(cx - HW * 0.45, 0.04, i * HD * 0.18), V(cx, 0.05, i * HD * 0.27), V(cx + HW * 0.45, 0.04, i * HD * 0.18), V(cx + HW - 0.02, 0.03, 0)]); return out; };
    k.flow([...fan(DX[0]), ...fan(DX[1])], "#ffffff", 60, 0.12, "diamond", 0.014);

    // ---------- discover: an interview at a small table ----------
    const interviews = new THREE.Group(), IX = -0.82, IZ = -0.06;
    interviews.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.005, 24), wood), IX, 0.06, IZ));
    interviews.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.006, 0.06, 8), paint("#333")), IX, 0.03, IZ));
    const p1 = person("#3f7a6b", true), p2 = person("#8a3f6b", true);
    interviews.add(at(stool(), IX - 0.07, 0, IZ), at(p1, IX - 0.07, 0, IZ), at(stool(), IX + 0.07, 0, IZ), at(p2, IX + 0.07, 0, IZ));
    interviews.add(at(box(0.03, 0.002, 0.04, paint("#f5f2ea", 0.9)), IX - 0.015, 0.064, IZ + 0.005));   // the interviewer's notes
    add("interviews", interviews);

    // ---------- define: an affinity wall, a persona and the How-might-we at the waist ----------
    const affinity = new THREE.Group(), AX = -0.28, AZ = -0.2;
    affinity.add(at(box(0.32, 0.2, 0.012, paint("#f4f2ec", 0.8)), AX, 0.17, AZ));
    for (const x of [-0.14, 0.14]) affinity.add(at(box(0.01, 0.17, 0.01, paint("#4a4f57", 0.5)), AX + x, 0.035, AZ + 0.01));
    [[-0.09, 0.05, 1], [0.0, -0.02, 2], [0.09, 0.04, 3]].forEach(([x, y, sd]) => notes(affinity, 0.06, 0.06, 6, sd * 977, AX + x, 0.17 + y, AZ + 0.008));
    add("affinity", affinity);
    const persona = new THREE.Group(), PX = -0.16, PZ = 0.2;
    const pc = document.createElement("canvas"); pc.width = 256; pc.height = 320; const g = pc.getContext("2d");
    g.fillStyle = "#fffdf7"; g.fillRect(0, 0, 256, 320); g.fillStyle = "#3f78c4"; g.beginPath(); g.arc(64, 70, 40, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#1d2a3a"; g.font = "700 26px Geist, system-ui, sans-serif"; g.fillText("Priya, 19", 116, 66); g.font = "500 17px Geist, system-ui, sans-serif"; g.fillText("First-year student", 116, 92);
    g.fillStyle = "#3f78c4"; g.font = "700 16px Geist, system-ui, sans-serif"; g.fillText("GOALS", 20, 150); g.fillText("FRUSTRATIONS", 20, 236);
    g.fillStyle = "#56606e"; for (let i = 0; i < 3; i++) { g.fillRect(20, 162 + i * 18, 190 - i * 30, 7); g.fillRect(20, 248 + i * 18, 200 - i * 40, 7); }
    const ptex = new THREE.CanvasTexture(pc); ptex.colorSpace = THREE.SRGBColorSpace;
    const easel = new THREE.Group(); easel.add(at(new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.15), new THREE.MeshStandardMaterial({ map: ptex, roughness: 0.9 })), 0, 0.14, 0.006)); easel.add(at(box(0.13, 0.16, 0.008, wood), 0, 0.14, 0));
    for (const x of [-0.05, 0.05]) { const l = box(0.008, 0.16, 0.008, wood); l.rotation.x = 0.2; easel.add(at(l, x, 0.07, 0.01)); }
    persona.add(at(easel, PX, 0, PZ, -0.4));
    add("persona", persona);
    const hmw = new THREE.Group();
    const hc = document.createElement("canvas"); hc.width = 512; hc.height = 192; const h = hc.getContext("2d");
    h.fillStyle = "#1d2a3a"; h.fillRect(0, 0, 512, 192); h.fillStyle = "#ffe066"; h.font = "700 52px Geist, system-ui, sans-serif"; h.textAlign = "center"; h.fillText("How might we…?", 256, 112);
    const htex = new THREE.CanvasTexture(hc); htex.colorSpace = THREE.SRGBColorSpace;
    hmw.add(at(box(0.27, 0.105, 0.014, paint("#1d2a3a", 0.4), 0.004), 0, 0.2, 0));
    hmw.add(at(new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.094), new THREE.MeshBasicMaterial({ map: htex, toneMapped: false })), 0, 0.2, 0.0075));
    hmw.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.15, 10), paint("#4a4f57", 0.4)), 0, 0.075, 0));
    hmw.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.012, 24), paint("#4a4f57", 0.4)), 0, 0.006, 0));
    add("hmw", hmw);

    // ---------- develop: the brainstorm wall and a Crazy 8s table ----------
    const brainstorm = new THREE.Group(), BX = 0.32, BZ = -0.22;
    brainstorm.add(at(box(0.42, 0.26, 0.012, paint("#f4f2ec", 0.8)), BX, 0.2, BZ));
    for (const x of [-0.19, 0.19]) brainstorm.add(at(box(0.01, 0.2, 0.01, paint("#4a4f57", 0.5)), BX + x, 0.035, BZ + 0.01));
    notes(brainstorm, 0.38, 0.22, 34, 4242, BX, 0.2, BZ + 0.008);
    for (let i = 0; i < 5; i++) { const d = new THREE.Mesh(new THREE.CircleGeometry(0.006, 12), paint("#e2574c", 0.5)); d.position.set(BX - 0.12 + i * 0.06, 0.22 + (i % 2) * 0.04, BZ + 0.0105); brainstorm.add(d); }   // dot votes
    const bp = person("#3f5f7a"); brainstorm.add(at(bp, BX - 0.1, 0, BZ + 0.08));
    add("brainstorm", brainstorm);
    const sketches = new THREE.Group(), KX = 0.36, KZ = 0.14;
    sketches.add(at(box(0.18, 0.006, 0.12, wood), KX, 0.07, KZ));
    for (const [x, z] of [[-0.08, -0.05], [0.08, -0.05], [-0.08, 0.05], [0.08, 0.05]]) sketches.add(at(box(0.006, 0.07, 0.006, paint("#333")), KX + x, 0.035, KZ + z));
    const sc = document.createElement("canvas"); sc.width = 256; sc.height = 128; const q = sc.getContext("2d"); q.fillStyle = "#ffffff"; q.fillRect(0, 0, 256, 128); q.strokeStyle = "#9aa0a8"; q.lineWidth = 2;
    for (let i = 1; i < 4; i++) { q.beginPath(); q.moveTo(i * 64, 0); q.lineTo(i * 64, 128); q.stroke(); } q.beginPath(); q.moveTo(0, 64); q.lineTo(256, 64); q.stroke();
    q.strokeStyle = "#1d2a3a"; q.lineWidth = 3; for (let i = 0; i < 8; i++) { const cx = (i % 4) * 64 + 32, cy = Math.floor(i / 4) * 64 + 32; q.beginPath(); if (i % 3 === 0) q.arc(cx, cy, 16, 0, Math.PI * 2); else if (i % 3 === 1) q.rect(cx - 16, cy - 12, 32, 24); else { q.moveTo(cx - 18, cy + 12); q.lineTo(cx, cy - 14); q.lineTo(cx + 18, cy + 12); } q.stroke(); }
    const stex = new THREE.CanvasTexture(sc); stex.colorSpace = THREE.SRGBColorSpace;
    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.07), new THREE.MeshStandardMaterial({ map: stex, roughness: 0.9 })); sheet.rotation.x = -Math.PI / 2; sketches.add(at(sheet, KX, 0.0735, KZ));
    const sp1 = person("#c9a23a", true), sp2 = person("#5a7fa8", true); sketches.add(at(stool(), KX - 0.12, 0, KZ), at(sp1, KX - 0.12, 0, KZ), at(stool(), KX + 0.12, 0, KZ), at(sp2, KX + 0.12, 0, KZ));
    add("sketches", sketches);

    // ---------- deliver: a cardboard prototype on a bench, and a user test ----------
    const prototype = new THREE.Group(), RX = 0.7, RZ = -0.05;
    prototype.add(at(box(0.2, 0.006, 0.1, wood), RX, 0.08, RZ));
    for (const [x, z] of [[-0.09, -0.04], [0.09, -0.04], [-0.09, 0.04], [0.09, 0.04]]) prototype.add(at(box(0.006, 0.08, 0.006, paint("#333")), RX + x, 0.04, RZ + z));
    prototype.add(at(box(0.07, 0.05, 0.05, card, 0.003), RX - 0.03, 0.108, RZ));
    prototype.add(at(box(0.04, 0.02, 0.03, card, 0.003), RX - 0.03, 0.143, RZ));
    prototype.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.03, 16), card), RX + 0.05, 0.098, RZ + 0.01));
    prototype.add(at(box(0.03, 0.002, 0.03, paint("#ffe066", 0.8)), RX + 0.06, 0.084, RZ - 0.025));
    add("prototype", prototype);
    const usertest = new THREE.Group(), UX = 0.8, UZ = 0.2;
    const user = person("#7a4a3a"), observer = person("#2b2d33");
    usertest.add(at(user, UX, 0, UZ), at(observer, UX + 0.08, 0, UZ - 0.04, -0.8));
    usertest.add(at(box(0.018, 0.03, 0.003, paint("#1d1e21", 0.3)), UX + 0.006, 0.075, UZ + 0.018));   // the paper phone they're testing
    usertest.add(at(box(0.025, 0.002, 0.03, paint("#f5f2ea", 0.9)), UX + 0.075, 0.07, UZ - 0.015));   // the observer's notes
    add("usertest", usertest);

    k.tick((t, dt, motion) => {
      if (!motion) return;
      p1.rotation.y = Math.sin(t * 0.9) * 0.2 + Math.PI / 2; p2.rotation.y = -Math.PI / 2 + Math.sin(t * 0.7 + 1) * 0.2;
      hmw.rotation.y = Math.sin(t * 0.5) * 0.25;
      user.rotation.y = Math.sin(t * 0.6) * 0.3;
    });
  },
};
