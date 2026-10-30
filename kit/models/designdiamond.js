// CreateGradify's 3D model: the Double Diamond design process (Design Council, 2005). Ideas spread
// out (diverge) and focus in (converge) twice: discover then define the problem, develop then
// deliver the solution. Sparks of ideas flow through it; prototypes and feedback loops surround it.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  problem: { name: "Problem space", c: "#5ef0ff" },
  solution: { name: "Solution space", c: "#f055dd" },
  practice: { name: "Creative practice", c: "#ffe066" },
};

const STRUCTURES = {
  discover: s("problem", "Discover", "Diverge: go wide to understand the problem and the people who have it, without assuming you already know.",
    ["Methods: interviews, observation, empathy maps, diaries, desk research.", "**Empathise** is the first stage of design thinking (Stanford d.school): understand people's needs, not just their requests.", "Look for surprises: they're where insight hides."],
    [["What happens in the Discover phase?", "Diverging to explore and understand the problem and the people involved."], ["Name three Discover methods.", "User interviews, observation, empathy maps (also diaries, desk research)."], ["Why delay solutions in Discover?", "Early solutions anchor thinking and can solve the wrong problem."]],
    ["discover", "research", "empathy", "empathise", "user research", "observation"]),
  define: s("problem", "Define", "Converge: make sense of what you found and frame the real problem to solve.",
    ["A **'How might we…?'** question turns a problem into an opportunity.", "Synthesis tools: affinity mapping, personas, journey maps, problem statements.", "Einstein (attributed): 'If I had an hour to solve a problem, I'd spend 55 minutes thinking about the problem.'"],
    [["What is a 'How might we…?' question?", "A problem reframed as an open opportunity for ideas."], ["What is affinity mapping?", "Clustering research findings into themes to find patterns."], ["What is a persona?", "A research-based profile of a typical user, used to keep their needs in view."]],
    ["define", "problem statement", "how might we", "persona", "affinity", "framing"]),
  develop: s("solution", "Develop", "Diverge again: generate many possible solutions, build on each other's ideas, and prototype.",
    ["Brainstorming rules (IDEO): defer judgement, go for quantity, build on others' ideas, encourage wild ideas.", "Techniques: SCAMPER, crazy 8s, mind maps, analogies, 'worst possible idea'.", "Linus Pauling: 'The best way to have a good idea is to have lots of ideas.'"],
    [["What are the rules of brainstorming?", "Defer judgement, go for quantity, build on others' ideas, encourage wild ideas (and stay focused, one conversation at a time)."], ["What does SCAMPER stand for?", "Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse."], ["What is 'crazy 8s'?", "Sketching eight ideas in eight minutes."]],
    ["develop", "ideation", "brainstorm", "scamper", "ideas", "divergent thinking"]),
  deliver: s("solution", "Deliver", "Converge: test, refine and launch the solution that works, then learn from it.",
    ["Test with real users; iterate based on what you learn.", "MVP (minimum viable product): the smallest version that tests the core idea.", "Delivery isn't the end: measure and loop back."],
    [["What is an MVP?", "A minimum viable product: the simplest version that lets you test the core idea with real users."], ["What happens in Deliver?", "Testing, refining and launching the solution, then evaluating it."], ["Why loop back after delivery?", "Real use reveals new problems and opportunities to improve."]],
    ["deliver", "launch", "mvp", "test", "iterate"]),
  prototype: s("practice", "Prototypes", "Quick, rough versions you can test: sketches, paper models, role-play, clickable mock-ups.",
    ["Fidelity rises as confidence rises: low-fi first, high-fi later.", "'Fail fast, fail cheap': a paper prototype costs minutes.", "Prototype to answer a specific question."],
    [["Why start with low-fidelity prototypes?", "They're fast and cheap, so you can test and change ideas before investing much."], ["What does 'fail fast' mean?", "Find out early and cheaply which ideas don't work."], ["What should a prototype be designed to do?", "Answer a specific question about the idea."]],
    ["prototype", "mock-up", "fidelity", "fail fast", "model"]),
  feedback: s("practice", "Feedback loops", "Critique and testing that feed back into earlier stages. Creative processes are cycles, not straight lines.",
    ["Good critique is specific, kind and helpful: 'I like… I wish… What if…'.", "Separate the work from the person.", "Ask testers to think aloud; watch what they do, not just what they say."],
    [["What is the 'I like, I wish, What if' format?", "A structure for giving balanced, constructive feedback."], ["Why ask testers to think aloud?", "To understand their reasoning and confusion as they use the prototype."], ["Why is the design process described as iterative?", "Feedback sends you back to earlier stages to improve the idea."]],
    ["feedback", "critique", "iteration", "testing", "user testing"]),
  creativity: s("practice", "Creative habits", "Creativity can be practised: incubation, constraints, curiosity and making regularly.",
    ["Wallas (1926): **preparation, incubation, illumination, verification**.", "Constraints often boost creativity (Dr. Seuss's 50-word Green Eggs and Ham).", "Divergent thinking tests (Guilford's Alternative Uses Task) measure fluency, flexibility, originality and elaboration."],
    [["Name Wallas's four stages of creativity.", "Preparation, incubation, illumination, verification."], ["What is incubation?", "Stepping away from a problem, letting unconscious processing work."], ["What does the Alternative Uses Task measure?", "Divergent thinking: fluency, flexibility, originality and elaboration."]],
    ["creativity", "creative", "incubation", "wallas", "divergent", "habit"]),
};

const NOTES = {
  problem: { title: "The problem space: discover and define", lead: "The first diamond is about finding the right problem. Most failed projects solved the wrong one well.",
    sections: [
      ["Discover", "- Talk to people; watch what they do; collect stories and pain points.", "- Use the 5 Whys to get past symptoms to causes.", "- Stay curious: suspend your assumptions and note surprises."],
      ["Define", "- Synthesise: cluster findings, spot patterns, name insights.", "- Write a problem statement: [user] needs [need] because [insight].", "- Turn it into 'How might we…?' questions: not too broad, not too narrow."],
      ["Common traps", "- Jumping to solutions (the first idea is rarely the best).", "- Designing for yourself instead of the user.", "> Diverge then converge: separate generating options from choosing between them."],
    ] },
  solution: { title: "The solution space: develop and deliver", lead: "The second diamond is about finding the right solution: generate many, test the promising ones, and deliver the one that works.",
    sections: [
      ["Generating ideas", "- Quantity first: aim for dozens of ideas before judging.", "- Change perspective: analogies from other fields, extreme users, reverse the problem.", "- Combine ideas: many innovations are new combinations of existing things."],
      ["Choosing and testing", "- Dot voting, impact/effort matrices, criteria from the problem statement.", "- Prototype the riskiest assumption first.", "- Test with the people you designed for."],
      ["Delivering", "- Refine, plan the launch, measure the outcome.", "- Tell the story: why this solution, for whom, with what evidence.", "- Reflect: what would you do differently next time?"],
    ] },
  practice: { title: "Creative practice", lead: "Processes help, but creativity is also a set of habits: noticing, making, sharing and iterating.",
    sections: [
      ["Habits", "- Keep a sketchbook or idea log; capture ideas when they come.", "- Make something small every day; volume builds skill and taste.", "- Seek varied inputs: reading, galleries, walks, conversations."],
      ["Working with others", "- Psychological safety lets people share half-formed ideas.", "- 'Yes, and…' (from improv) builds on ideas instead of blocking them.", "- Critique the work, not the person."],
      ["Getting unstuck", "- Incubate: take a walk, sleep on it.", "- Add a constraint: limit time, materials or colours.", "- Make the worst possible version, then flip it.", "! Perfectionism stops more creative work than lack of talent: ship rough drafts and improve them."],
    ] },
};

export default {
  title: "The Double Diamond in 3D", kicker: "3D design thinking",
  intro: { title: "Explore the creative process", text: "Ideas spread out and focus in twice: discover and define the problem, then develop and deliver the solution, with prototypes and feedback loops around them. Click any stage for its methods, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Try this",
  quiz: "find the stage",
  motion: "Ideas flowing",
  camera: { pos: [0.4, 1.1, 3.0], target: [0, 0.3, 0], min: 0.05, max: 5 },
  views: { Process: [[0.4, 1.1, 3.0], [0, 0.3, 0]], Above: [[0.05, 2.2, 0.3], [0, 0.2, 0]], Problem: [[-0.45, 0.5, 1.0], [-0.45, 0.3, 0]], Solution: [[0.45, 0.5, 1.0], [0.45, 0.3, 0]] },
  platform: { r: 1.15, y: -0.005 },
  labelMax: 3,
  explode: true,
  bg: ["#1e1a36", "#07060f"],
  build(k) {
    const { THREE, V, mat, glow, limb, box, text, add, decor } = k;
    // each half-diamond is a wedge: a pyramid-like shape widening or narrowing along x
    const half = (x0, x1, widening, c, name, id) => {
      const g = new THREE.Group(), h = 0.32, w = 0.42;
      const shape = new THREE.Shape(); if (widening) { shape.moveTo(0, 0); shape.lineTo(x1 - x0, h / 2); shape.lineTo(x1 - x0, -h / 2); } else { shape.moveTo(0, h / 2); shape.lineTo(x1 - x0, 0); shape.lineTo(0, -h / 2); } shape.closePath();
      const geo = new THREE.ExtrudeGeometry(shape, { depth: w, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.008, bevelSegments: 3 }); geo.translate(0, 0, -w / 2);
      const m = new THREE.Mesh(geo, mat(c, { detail: "none", roughness: 0.1, clearcoat: 1, transmission: 0.55, thickness: 0.2, transparent: true, opacity: 0.85, emissive: new THREE.Color(c).multiplyScalar(0.1) }));
      g.add(m); g.position.set(x0, 0.3, 0);
      const l = text(name, { size: 0.04, bg: "rgba(0,0,0,0.55)" }); l.position.set((x1 - x0) / 2, 0.24, 0); g.add(l);
      add(id, g); return g;
    };
    half(-0.9, -0.45, true, "#5ef0ff", "Discover", "discover");
    half(-0.45, 0.0, false, "#4fb8ff", "Define", "define");
    half(0.0, 0.45, true, "#f055dd", "Develop", "develop");
    half(0.45, 0.9, false, "#c055dd", "Deliver", "deliver");
    for (const [x, lab] of [[-0.9, "Challenge"], [0.0, "Problem defined"], [0.9, "Solution"]]) { const n = new THREE.Mesh(new THREE.OctahedronGeometry(0.025), glow("#ffffff", 1)); n.position.set(x, 0.3, 0); decor(n); const l = text(lab, { size: 0.026, colour: "#eaffff" }); l.position.set(x, 0.38, 0.22); decor(l); }
    // sparks of ideas: diverging and converging through each diamond
    const sparks = [];
    for (let i = 0; i < 8; i++) { const off = (i / 7 - 0.5) * 0.28, z = ((i * 3) % 7 / 6 - 0.5) * 0.3; sparks.push([V(-0.9, 0.3, 0), V(-0.45, 0.3 + off, z), V(0, 0.3, 0)]); sparks.push([V(0, 0.3, 0), V(0.45, 0.3 + off * 0.9, -z), V(0.9, 0.3, 0)]); }
    k.flow(sparks, "#fff3a0", 70, 0.25, "practice", 0.012);
    // prototypes: little models on the floor below Develop
    const proto = new THREE.Group(); proto.position.set(0.2, 0, 0.45);
    [["#ffe066", 0.04], ["#ff8f6b", 0.06], ["#6bffb8", 0.05], ["#9fdcff", 0.07]].forEach(([c, sz], i) => { const p = i % 2 ? box(sz, sz, sz, mat(c, { detail: "fold", repeat: 2, roughness: 0.8 }), 0.006) : new THREE.Mesh(new THREE.ConeGeometry(sz * 0.6, sz, 5), mat(c, { detail: "fold", repeat: 2, roughness: 0.8 })); p.position.set(i * 0.1, sz / 2, (i % 2) * 0.05); proto.add(p); });
    const pl = text("Prototypes: rough, fast, testable", { size: 0.022, bg: "rgba(0,0,0,0.55)" }); pl.position.set(0.15, 0.13, 0); proto.add(pl);
    add("prototype", proto);
    // feedback loops: arcs from Deliver back to Discover and Define
    const fb = new THREE.Group();
    for (const [from, to, hgt] of [[0.75, -0.7, 0.75], [0.65, -0.25, 0.62]]) { const c = new THREE.QuadraticBezierCurve3(V(from, 0.45, -0.15), V((from + to) / 2, hgt, -0.25), V(to, 0.45, -0.15)); fb.add(new THREE.Mesh(new THREE.TubeGeometry(c, 64, 0.006, 8), glow("#ffe066", 0.7))); const tip = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.04, 12), glow("#ffe066", 0.9)); tip.position.copy(c.getPoint(1)); tip.lookAt(c.getPoint(0.95)); tip.rotateX(-Math.PI / 2); fb.add(tip); }
    const fl = text("Feedback loops back", { size: 0.024, colour: "#ffe066" }); fl.position.set(0.05, 0.8, -0.25); fb.add(fl);
    add("feedback", fb);
    k.flow([new THREE.QuadraticBezierCurve3(V(0.75, 0.45, -0.15), V(0.025, 0.75, -0.25), V(-0.7, 0.45, -0.15))], "#ffe066", 16, 0.2, "practice", 0.014);
    // creative habits: a lightbulb on a sketchbook
    const habit = new THREE.Group(); habit.position.set(-0.6, 0, 0.5);
    habit.add(box(0.18, 0.012, 0.13, mat("#efe6d2", { detail: "fibre", repeat: 2 }), 0.004));
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 32, 24), mat("#fff6c8", { detail: "none", transmission: 0.6, thickness: 0.02, emissive: new THREE.Color("#7a6a20"), roughness: 0.05 })); bulb.position.set(0, 0.11, 0); habit.add(bulb);
    habit.add(limb(V(0, 0.035, 0), V(0, 0.07, 0), 0.02, mat("#9aa6b8", { detail: "none", metalness: 0.8 }), false));
    const hl = text("Creative habits", { size: 0.024, bg: "rgba(0,0,0,0.55)" }); hl.position.set(0, 0.2, 0); habit.add(hl);
    add("creativity", habit);
    k.tick((t, dt, motion) => { if (!motion) return; bulb.material.emissiveIntensity = 1 + Math.sin(t * 2) * 0.6; proto.rotation.y = Math.sin(t * 0.4) * 0.3; });
  },
};
