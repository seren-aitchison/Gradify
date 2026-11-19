// EduGradify's 3D model: how learning works, for teachers. The memory model (information from the world
// through attention into a small working memory, encoded into a vast long-term memory of connected schemas, and
// retrieved back), forgetting curves with and without spaced retrieval (slide the number of reviews), and a
// classroom where those ideas become teaching: a worked example, a clear explanation, and mini whiteboards.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  memory: { name: "The memory model", c: "#5ec8ff" },
  retrieval: { name: "Forgetting and retrieval", c: "#f2b84b" },
  classroom: { name: "In the classroom", c: "#7be08a" },
};

const STRUCTURES = {
  attention: s("memory", "Attention", "The funnel: of everything around us, only what we attend to gets into working memory. Pupils learn what they think about.",
    ["**Daniel Willingham**: \"memory is the residue of thought\"; we remember what we think hard about.", "Attention is limited: divided attention (multitasking, phones) reduces learning.", "Cognitive load theory's **split-attention** and **redundancy** effects: don't make learners juggle separated sources, or read text you're also saying."],
    [["What does Willingham mean by 'memory is the residue of thought'?", "We remember what we actively think about, so tasks should make pupils think about the content to be learned."], ["What is the split-attention effect?", "Learning suffers when learners must mentally combine separated sources (e.g. a diagram and its labels far apart)."], ["What is the redundancy effect?", "Presenting the same information twice (e.g. reading out text on a slide) adds load and can reduce learning."]],
    ["attention", "willingham", "split attention", "redundancy", "multitasking"]),
  working: s("memory", "Working memory", "The small glass box: where we think. It holds only a few items at once, for seconds unless rehearsed, so new material must come in manageable steps.",
    ["Its capacity is about **four chunks** for most adults (**Cowan**, 2001), smaller than Miller's famous \"seven, plus or minus two\" (1956).", "**Baddeley and Hitch** (1974) split it into a central executive, a phonological loop and a visuospatial sketchpad; Baddeley added an episodic buffer in 2000.", "**Cognitive load theory** (John **Sweller**, 1988): instruction should avoid overloading working memory."],
    [["Roughly how many chunks can working memory hold?", "About four (Cowan, 2001)."], ["Name the parts of Baddeley and Hitch's working memory model.", "Central executive, phonological loop, visuospatial sketchpad (plus the episodic buffer, added in 2000)."], ["What is cognitive load theory?", "Sweller's theory that learning is limited by working memory, so instruction should manage the load it creates."]],
    ["working memory", "cognitive load", "sweller", "baddeley", "cowan", "chunking", "short-term memory"]),
  ltm: s("memory", "Long-term memory", "The large store: effectively unlimited, and lasting. Learning is a change in long-term memory; if nothing has changed there, nothing has been learned.",
    ["**Atkinson and Shiffrin** (1968) described the multi-store model: sensory memory → short-term memory → long-term memory.", "**Encoding** moves information in; **retrieval** brings it back into working memory to use.", "Knowledge in long-term memory doesn't add to working memory load, which is why knowing more makes thinking easier."],
    [["What is the multi-store model?", "Atkinson and Shiffrin (1968): information passes from sensory memory to short-term memory to long-term memory."], ["What is the difference between encoding and retrieval?", "Encoding is getting information into long-term memory; retrieval is getting it back out."], ["Why does prior knowledge make new learning easier?", "Knowledge in long-term memory can be used without filling up working memory."]],
    ["long-term memory", "atkinson and shiffrin", "multi-store model", "encoding", "retrieval", "learning"]),
  schema: s("memory", "Schemas", "The glowing network: knowledge is stored connected, in schemas. New ideas stick when they hook onto what's already there.",
    ["Experts **chunk**: **Chase and Simon** (1973) showed chess masters recall real board positions far better than novices, but not random ones.", "A rich schema lets a learner treat a whole idea as one chunk in working memory.", "Asking pupils to explain, compare and connect ideas strengthens their schemas."],
    [["What is a schema?", "An organised structure of connected knowledge in long-term memory."], ["What did Chase and Simon find about chess experts?", "They recalled real game positions much better than novices, but not random positions: their advantage came from chunked knowledge."], ["How do schemas reduce cognitive load?", "A whole schema can be handled as one chunk in working memory."]],
    ["schema", "schemas", "chunking", "experts", "chase and simon", "prior knowledge"]),
  forgetting: s("retrieval", "Forgetting curve", "The red curve: memory of something learned once, never revisited, falls away fast, then more slowly.",
    ["**Hermann Ebbinghaus** (1885) measured his own forgetting of nonsense syllables and found most was lost soon after learning.", "Forgetting isn't failure: the effort of recalling something half-forgotten strengthens it more.", "The curves here are illustrative; real rates depend on the material and the learner."],
    [["Who first described the forgetting curve?", "Hermann Ebbinghaus (1885)."], ["What shape is the forgetting curve?", "Steep at first, then flattening: most forgetting happens soon after learning."], ["Why can some forgetting be useful?", "Retrieving something partly forgotten takes effort, which strengthens the memory more (desirable difficulty)."]],
    ["forgetting curve", "ebbinghaus", "forgetting", "memory decay"]),
  spacing: s("retrieval", "Spaced retrieval", "The blue curve: each review brings the memory back, and it then fades more slowly. Spaced out over increasing gaps, a few reviews keep it for good. Slide the number of reviews.",
    ["**Distributed (spaced) practice** beats massed practice (cramming) for long-term retention (Cepeda and colleagues' 2006 review of hundreds of studies).", "**Dunlosky and colleagues** (2013) rated practice testing and distributed practice as the two **high-utility** techniques; highlighting and rereading were low.", "Robert Bjork's **desirable difficulties**: spacing, interleaving and testing feel harder but work better."],
    [["What is spaced practice?", "Spreading study of the same material over time, with gaps between sessions."], ["Which two techniques did Dunlosky et al. (2013) rate as high utility?", "Practice testing and distributed practice."], ["What are desirable difficulties?", "Bjork's term for conditions (spacing, interleaving, testing) that make learning feel harder but improve long-term retention."]],
    ["spacing", "spaced practice", "spaced repetition", "distributed practice", "dunlosky", "bjork", "desirable difficulties", "interleaving"]),
  flashcards: s("retrieval", "Retrieval practice", "A stack of question cards: recalling an answer from memory strengthens it far more than reading it again.",
    ["**Roediger and Karpicke** (2006): students who took practice tests remembered more a week later than those who restudied, though restudying felt more effective.", "Low-stakes quizzes, flashcards, brain dumps and \"write all you know\" all count.", "Feedback afterwards corrects errors before they stick."],
    [["What is retrieval practice?", "Recalling information from memory (e.g. quizzes, flashcards) to strengthen it."], ["What did Roediger and Karpicke (2006) find?", "Practice testing led to better long-term retention than restudying, even though restudying felt better."], ["Why should retrieval practice be low stakes?", "To reduce anxiety and keep the focus on learning rather than grading."]],
    ["retrieval practice", "testing effect", "flashcards", "quiz", "roediger", "karpicke", "low stakes"]),
  board: s("classroom", "Worked example", "On the board: a problem solved step by step, so novices can see how an expert does it before trying it themselves.",
    ["The **worked example effect** (Sweller and Cooper, 1985): novices learn more from studying worked examples than from solving equivalent problems.", "**Fade** the support: full example, then partly completed, then independent practice.", "As expertise grows, worked examples help less (**expertise reversal effect**)."],
    [["What is the worked example effect?", "Novices learn more from studying worked examples than from solving the same problems unaided."], ["What is fading?", "Gradually removing steps from worked examples until learners solve problems independently."], ["What is the expertise reversal effect?", "Techniques that help novices (like worked examples) can become less effective, or even harmful, for experts."]],
    ["worked example", "worked examples", "modelling", "fading", "expertise reversal", "i do we do you do"]),
  teacher: s("classroom", "Explanation", "The teacher explains in small steps, with words and a diagram together, checking as they go.",
    ["**Rosenshine's Principles of Instruction** (2012) include: daily review, small steps, many questions, models, guided practice, checking understanding, a high success rate, scaffolds, independent practice, and weekly and monthly review.", "**Dual coding** (Allan Paivio, 1971): words with a relevant visual are remembered better than words alone.", "Aim for a high success rate in practice: Rosenshine suggests around 80%."],
    [["Name three of Rosenshine's principles of instruction.", "Any three of: daily review, small steps, ask questions, provide models, guide practice, check understanding, high success rate, scaffolds, independent practice, weekly and monthly review."], ["What is dual coding?", "Combining words with visuals so information is encoded in two ways (Paivio)."], ["What success rate did Rosenshine suggest for practice?", "Around 80%."]],
    ["explanation", "rosenshine", "dual coding", "paivio", "small steps", "direct instruction"]),
  whiteboards: s("classroom", "Mini whiteboards", "Every pupil answers at once and holds up their board: the teacher sees the whole class's thinking in seconds.",
    ["Whole-class responses beat hands-up, where the same few answer and the rest can hide.", "**Dylan Wiliam**'s **hinge questions** check understanding at a key point, with wrong answers that reveal specific misconceptions.", "**Cold calling** and **think-pair-share** also involve everyone."],
    [["Why are mini whiteboards better than hands up?", "Every pupil answers, so the teacher sees everyone's understanding, not just volunteers'."], ["What is a hinge question?", "A quick diagnostic question at a key point in a lesson, whose wrong answers reveal particular misconceptions (Wiliam)."], ["What is assessment for learning?", "Using evidence of pupils' understanding during teaching to adapt what happens next."]],
    ["mini whiteboards", "checking for understanding", "assessment for learning", "afl", "hinge question", "wiliam", "cold calling", "formative assessment"]),
};

const NOTES = {
  memory: { title: "How memory works", lead: "Learning means a lasting change in **long-term memory**. Everything has to pass through **working memory** first, which is tiny. Teaching is the craft of getting the right things through.",
    sections: [
      ["The model", "1. The **environment** offers far more than we can take in.", "2. **Attention** decides what enters working memory.", "3. **Working memory** holds about four chunks, briefly: it's where we think.", "4. Thinking hard about material **encodes** it into long-term memory.", "5. **Retrieval** brings it back to working memory to use, and strengthens it.", "> Classroom link: if pupils aren't thinking about the content, they aren't learning it."],
      ["Managing cognitive load", "- Break new material into **small steps**.", "- Remove distractions and **redundant** information.", "- Put labels **on** diagrams, not in a separate key (split attention).", "- Use **worked examples** for novices; fade them as expertise grows."],
      ["Building schemas", "- Activate prior knowledge before new content.", "- Make connections explicit: compare, contrast, explain why.", "- Revisit and extend ideas across a curriculum, so schemas grow richer over time."],
    ] },
  retrieval: { title: "Forgetting, spacing and retrieval", lead: "Forgetting is normal and fast. What makes learning last is coming back to it: **spaced** over time, through **retrieval** rather than rereading.",
    sections: [
      ["The evidence", "- **Ebbinghaus** (1885): the forgetting curve.", "- **Roediger and Karpicke** (2006): the testing effect.", "- **Cepeda et al.** (2006): the spacing effect across hundreds of studies.", "- **Dunlosky et al.** (2013): practice testing and distributed practice are high utility; highlighting and rereading are low."],
      ["Retrieval practice in lessons", "- Starter quizzes on last lesson, last week, last term.", "- Flashcards with self-testing, not just reading.", "- Brain dumps: write everything you remember about a topic.", "- Make it **low stakes**, and give feedback."],
      ["Spacing and interleaving", "- Spread practice of a topic over weeks, with growing gaps.", "- **Interleave**: mix problem types, so pupils must choose the method, not just repeat it.", "> Classroom link: what feels like fluent learning in a lesson (massed practice) often fades; what feels effortful (spaced retrieval) lasts."],
    ] },
  classroom: { title: "From evidence to teaching", lead: "The science of learning becomes practice through clear explanations, modelled examples, frequent checking and plenty of successful practice.",
    sections: [
      ["Rosenshine's principles (2012)", "1. Daily review. 2. Present new material in small steps. 3. Ask lots of questions. 4. Provide models. 5. Guide student practice. 6. Check for understanding. 7. Obtain a high success rate. 8. Provide scaffolds for difficult tasks. 9. Independent practice. 10. Weekly and monthly review."],
      ["I do, we do, you do", "- **I do**: the teacher models with a worked example, thinking aloud.", "- **We do**: guided practice together, with prompts.", "- **You do**: independent practice, once success is high.", "Fade support as competence grows."],
      ["Checking for understanding", "- **Mini whiteboards**: every pupil answers.", "- **Hinge questions**: one diagnostic question before moving on.", "- **Cold calling**: anyone may be asked, so everyone thinks.", "> Classroom link: the question is not \"any questions?\" but \"show me\"."],
    ] },
};

export default {
  title: "How learning works in 3D", kicker: "3D teaching",
  intro: { title: "The science of learning", text: "The memory model, with information flowing through attention and working memory into long-term memory; forgetting curves with and without spaced retrieval; and a classroom where the evidence becomes teaching. Slide the number of reviews to see spacing at work." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Classroom link",
  quiz: "find the idea",
  motion: "Thinking",
  trueColour: true,
  sliders: [{ key: "reviews", label: "Spaced reviews", value: 75 }],
  camera: { pos: [0.05, 1.3, 2.6], target: [0.0, 0.18, 0.0], min: 0.3, max: 5 },
  views: { Overview: [[0.05, 1.3, 2.6], [0.0, 0.18, 0.0]], "Memory model": [[-0.6, 0.55, 1.2], [-0.6, 0.2, -0.05]], "Forgetting curves": [[0.42, 0.5, 1.0], [0.42, 0.22, -0.3]], Classroom: [[0.75, 0.6, 1.25], [0.6, 0.1, 0.35]] },
  platform: { r: 0.55 },
  shadow: { left: -1.5, right: 1.5, top: 1.3, bottom: -1.3, near: 0.5, far: 9 },
  explode: false,
  build(k) {
    const { THREE, V, mat, text, add, decor, box, tube } = k;
    const at = (o, x, y, z, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; return o; };
    const paint = (c, r = 0.5) => mat(c, { detail: "none", roughness: r, clearcoat: 0.3 });
    const glass = (c = "#cfe9f2", o = 0.18) => mat(c, { detail: "none", transparent: true, opacity: o, roughness: 0.05, clearcoat: 1, depthWrite: false });
    const glowM = (c, i = 0.8) => new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: i, roughness: 0.3 });
    const wood = mat("#b98b58", { detail: "fibre", repeat: 2, bump: 0.2, roughness: 0.6, clearcoat: 0.2 });
    const lab = (t, x, y, z, grp, size = 0.028, colour) => { const l = text(t, { size, colour, bg: "rgba(0,0,0,0.55)" }); l.position.set(x, y, z); decor(l, grp); return l; };
    const skins = ["#e8c3a0", "#c99a74", "#8d5a3b", "#f0d0b4", "#b07850", "#5c3a24"];
    let si = 0;
    const person = (c, f = 1, seated = false) => { const g = new THREE.Group(), y0 = seated ? 0.03 * f : 0; g.add(at(new THREE.Mesh(new THREE.CapsuleGeometry(0.016 * f, 0.05 * f, 6, 14), paint(c, 0.85)), 0, y0 + 0.045 * f, 0)); g.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.013 * f, 20, 14), paint(skins[si++ % skins.length], 0.6)), 0, y0 + 0.096 * f, 0)); return g; };

    decor(at(box(2.5, 0.02, 1.4, mat("#2a2d34", { detail: "fibre", repeat: 4, bump: 0.12, roughness: 0.75, clearcoat: 0.3 })), 0, -0.01, 0));

    // ---------- the memory model ----------
    const MY = 0.22;
    // attention: an open glass funnel, wide end facing the world
    const attention = new THREE.Group(), FX = -1.0;
    const funnel = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.13, 0.2, 40, 1, true), glass("#bfe6ff", 0.32)); funnel.rotation.z = Math.PI / 2; attention.add(at(funnel, FX, MY, 0));
    attention.add(at(new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.004, 8, 48), paint("#bfe6ff", 0.3)).rotateY(Math.PI / 2), FX - 0.1, MY, 0));
    attention.add(at(box(0.01, MY - 0.03, 0.01, paint("#4a4f57", 0.5)), FX, (MY - 0.03) / 2, 0));
    add("attention", attention);
    lab("Attention", FX, MY + 0.19, 0, "memory");

    // working memory: a small glass box with four slots, one of them busy
    const working = new THREE.Group(), WX = -0.72;
    working.add(at(box(0.16, 0.16, 0.16, glass("#9fdcff", 0.25), 0.01), WX, MY, 0));
    working.add(at(box(0.012, MY - 0.08, 0.012, paint("#4a4f57", 0.5)), WX, (MY - 0.08) / 2, 0));
    const slots = [];
    for (const [x, y] of [[-0.035, 0.035], [0.035, 0.035], [-0.035, -0.035], [0.035, -0.035]]) { const t = new THREE.Mesh(new THREE.SphereGeometry(0.022, 24, 16), glowM("#5ec8ff", 0.7)); working.add(at(t, WX + x, MY + y, 0)); slots.push(t); }
    add("working", working);
    lab("Working memory (about 4 chunks)", WX, MY + 0.15, 0, "memory", 0.024);

    // long-term memory: a broad translucent dome holding a network of knowledge
    const ltm = new THREE.Group(), LX = -0.3, LR = 0.26;
    ltm.add(at(new THREE.Mesh(new THREE.SphereGeometry(LR, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), glass("#d6c8ff", 0.16)), LX, 0.02, -0.05));
    ltm.add(at(new THREE.Mesh(new THREE.CylinderGeometry(LR + 0.02, LR + 0.03, 0.02, 64), paint("#3a3550", 0.5)), LX, 0.01, -0.05));
    add("ltm", ltm);
    lab("Long-term memory", LX, LR + 0.08, -0.05, "memory");
    const schema = new THREE.Group(), nodes = [];
    let r = 99; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 34; i++) { const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * (LR - 0.06), y = 0.05 + rnd() * (LR - 0.08) * Math.sqrt(1 - (d / LR) ** 2); nodes.push(V(LX + Math.cos(a) * d, y, -0.05 + Math.sin(a) * d)); }
    const nodeM = glowM("#c58cff", 0.6), edgeM = paint("#b7a2ff", 0.4);
    nodes.forEach((p, i) => { schema.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.009 + (i % 5 === 0 ? 0.006 : 0), 14, 10), nodeM), p.x, p.y, p.z)); });
    nodes.forEach((p, i) => { const near = nodes.map((q, j) => [q.distanceTo(p), j]).filter(([d, j]) => j > i && d < 0.11).slice(0, 3); for (const [, j] of near) schema.add(tube([p, nodes[j]], 0.0018, edgeM, 2, false, 5)); });
    add("schema", schema);

    // the flows: the world → attention (many), attention → working memory (few), encode down and retrieve back
    const world = []; for (let i = 0; i < 7; i++) world.push([V(-1.25, MY + (i - 3) * 0.06, (i % 3 - 1) * 0.12), V(FX - 0.1, MY + (i - 3) * 0.02, (i % 3 - 1) * 0.04), V(FX + 0.1, MY, 0)]);
    k.flow(world, "#e9f6ff", 40, 0.35, "memory", 0.012);
    k.flow([[V(FX + 0.1, MY, 0), V(WX - 0.08, MY, 0)]], "#5ec8ff", 6, 0.4, "memory", 0.016);
    k.flow([[V(WX + 0.08, MY + 0.03, 0.02), V(LX - 0.12, MY + 0.06, 0.02), V(LX, 0.12, -0.03)]], "#c58cff", 8, 0.3, "memory", 0.016);
    k.flow([[V(LX - 0.02, 0.1, -0.08), V(LX - 0.14, MY - 0.06, -0.04), V(WX + 0.08, MY - 0.03, -0.02)]], "#7be08a", 8, 0.3, "memory", 0.016);
    lab("Encoding →", (WX + LX) / 2 + 0.02, MY + 0.1, 0.02, "memory", 0.019); lab("← Retrieval", (WX + LX) / 2, MY - 0.1, -0.03, "memory", 0.019);

    // ---------- forgetting curves: memory against days, with and without spaced reviews ----------
    const GX0 = 0.08, GZ = -0.36, GW = 0.75, GH = 0.36, DAYS = 30;
    const gx = (d) => GX0 + (d / DAYS) * GW, gy = (m) => 0.04 + m * GH;
    const chart = new THREE.Group();
    chart.add(at(box(GW + 0.08, GH + 0.1, 0.01, glass("#e8f2f6", 0.1)), GX0 + GW / 2, 0.04 + GH / 2 + 0.01, GZ - 0.02));
    chart.add(tube([V(GX0, 0.04, GZ - 0.01), V(GX0 + GW, 0.04, GZ - 0.01)], 0.003, paint("#d8dde4"), 2, false, 8));
    chart.add(tube([V(GX0, 0.04, GZ - 0.01), V(GX0, 0.04 + GH, GZ - 0.01)], 0.003, paint("#d8dde4"), 2, false, 8));
    decor(chart, "retrieval");
    lab("Days after first learning →", GX0 + GW * 0.7, 0.012, GZ + 0.02, "retrieval", 0.019); lab("↑ Remembered", GX0 - 0.01, 0.04 + GH + 0.04, GZ, "retrieval", 0.019);
    for (const d of [0, 10, 20, 30]) lab(String(d), gx(d), 0.025, GZ + 0.01, "retrieval", 0.015);
    const curve = (fn, z) => { const pts = []; for (let i = 0; i <= 300; i++) { const d = (i / 300) * DAYS; pts.push(V(gx(d), gy(fn(d)), z)); } return pts; };
    const S0 = 1.5, decay = (d) => Math.exp(-d / S0);
    const forgetting = new THREE.Group(); forgetting.add(tube(curve(decay, GZ), 0.005, paint("#e2574c", 0.4), 300, false, 8)); add("forgetting", forgetting);
    // spaced reviews: one curve for each number of reviews (0-4), built up front so every one can be clicked; the slider shows one
    const REV = [1, 3, 8, 18], spaceM = paint("#4f9fe6", 0.3), dotM = glowM("#4f9fe6", 0.6), variants = [], keeps = [];
    const spacing = new THREE.Group();
    for (let n = 0; n <= 4; n++) {
      const rev = REV.slice(0, n), v = new THREE.Group();
      const fn = (d) => { let last = 0, S = S0; for (const t of rev) if (d >= t) { last = t; S *= 3; } return Math.exp(-(d - last) / S); };
      const pts = []; let prev = null;
      for (let i = 0; i <= 600; i++) { const d = (i / 600) * DAYS, p = V(gx(d), gy(fn(d)), GZ + 0.012); if (prev && p.y - prev.y > 0.05) v.add(tube(pts.splice(0), 0.005, spaceM, 120, false, 8)); pts.push(p); prev = p; }
      if (pts.length > 1) v.add(tube(pts, 0.005, spaceM, 120, false, 8));
      for (const t of rev) v.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.011, 16, 12), dotM), gx(t), gy(1), GZ + 0.012));
      spacing.add(v); variants.push(v); keeps.push(Math.round(fn(DAYS) * 100));
    }
    add("spacing", spacing);
    const sLabs = keeps.map((keep, n) => { const l = text(n ? `${n} spaced ${n === 1 ? "review" : "reviews"}: about ${keep}% remembered at day 30` : "No reviews: almost all forgotten by day 30", { size: 0.02, colour: "#bfe0ff", bg: "rgba(0,0,0,0.6)" }); l.position.set(GX0 + GW * 0.55, 0.04 + GH + 0.04, GZ + 0.02); decor(l, "retrieval"); return l; });
    function setReviews(v) { const n = Math.round(v * 4); variants.forEach((g, i) => { g.visible = i === n && n > 0; }); sLabs.forEach((l, i) => { l.visible = i === n; }); }
    k.slider("reviews", setReviews);
    lab("Never reviewed", gx(2.6), gy(0.3), GZ + 0.03, "retrieval", 0.017, "#ffc2b4");

    // retrieval practice: a stack of flashcards in front of the chart, the top one flipping
    const flashcards = new THREE.Group(), CX = 0.2, CZ = -0.05;
    for (let i = 0; i < 6; i++) flashcards.add(at(box(0.12, 0.004, 0.08, paint(i % 2 ? "#f5f2ea" : "#efe9dc", 0.9)), CX + (i % 2) * 0.003, 0.002 + i * 0.0045, CZ, (i - 3) * 0.04));
    const qc = document.createElement("canvas"); qc.width = 256; qc.height = 170; const q = qc.getContext("2d"); q.fillStyle = "#ffffff"; q.fillRect(0, 0, 256, 170); q.fillStyle = "#1d2a3a"; q.font = "700 22px Geist, system-ui, sans-serif"; q.textAlign = "center"; q.fillText("What is working", 128, 70); q.fillText("memory's capacity?", 128, 100);
    const qt = new THREE.CanvasTexture(qc); qt.colorSpace = THREE.SRGBColorSpace;
    const top = new THREE.Group(); top.add(at(box(0.12, 0.004, 0.08, paint("#ffffff", 0.9)), 0, 0, 0)); const face = new THREE.Mesh(new THREE.PlaneGeometry(0.115, 0.075), new THREE.MeshStandardMaterial({ map: qt, roughness: 0.9 })); face.rotation.x = -Math.PI / 2; top.add(at(face, 0, 0.0025, 0));
    flashcards.add(at(top, CX, 0.032, CZ));
    add("flashcards", flashcards);

    // ---------- a classroom corner ----------
    const RX = 0.62, RZ = 0.32;
    decor(at(box(0.85, 0.006, 0.5, wood), RX, 0.003, RZ + 0.02), "classroom");
    const board = new THREE.Group();
    const bc = document.createElement("canvas"); bc.width = 512; bc.height = 256; const b = bc.getContext("2d");
    b.fillStyle = "#fbfbf8"; b.fillRect(0, 0, 512, 256); b.fillStyle = "#1d2a3a"; b.font = "600 30px Geist, system-ui, sans-serif";
    b.fillText("3x + 5 = 20", 30, 60); b.fillStyle = "#2f6db3"; b.fillText("3x = 15", 30, 120); b.fillText("x = 5", 30, 180); b.fillStyle = "#c8384a"; b.font = "500 22px Geist, system-ui, sans-serif"; b.fillText("− 5 from both sides", 230, 120); b.fillText("÷ 3", 230, 180);
    b.strokeStyle = "#2f6db3"; b.lineWidth = 3; b.beginPath(); b.moveTo(30, 200); b.lineTo(140, 200); b.stroke();
    const bt = new THREE.CanvasTexture(bc); bt.colorSpace = THREE.SRGBColorSpace;
    board.add(at(box(0.36, 0.19, 0.012, paint("#d8dde4", 0.4)), RX - 0.05, 0.22, RZ - 0.24));
    board.add(at(new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.17), new THREE.MeshBasicMaterial({ map: bt, toneMapped: false })), RX - 0.05, 0.22, RZ - 0.2335));
    for (const x of [-0.16, 0.16]) board.add(at(box(0.01, 0.13, 0.01, paint("#4a4f57", 0.5)), RX - 0.05 + x, 0.065, RZ - 0.24));
    add("board", board);
    const teacher = new THREE.Group(), tp = person("#2f4f7a"); teacher.add(at(tp, RX + 0.2, 0, RZ - 0.17, -0.5)); add("teacher", teacher);
    const whiteboards = new THREE.Group(), held = [];
    for (let row = 0; row < 2; row++) for (let i = 0; i < 3; i++) {
      const x = RX - 0.22 + i * 0.17, z = RZ + 0.0 + row * 0.15;
      whiteboards.add(at(box(0.1, 0.006, 0.055, wood), x, 0.06, z)); for (const dx of [-0.045, 0.045]) whiteboards.add(at(box(0.005, 0.06, 0.005, paint("#4a4f57", 0.5)), x + dx, 0.03, z));
      const p = person(["#7a2f3a", "#1f3d7a", "#3f7a3a"][(i + row) % 3], 0.85, true); whiteboards.add(at(p, x, 0, z + 0.05, Math.PI));
      const wb = new THREE.Group(); wb.add(at(box(0.05, 0.035, 0.003, paint("#ffffff", 0.3)), 0, 0, 0)); wb.add(at(box(0.02, 0.006, 0.001, paint("#2f6db3", 0.5)), 0, 0, -0.002));
      whiteboards.add(at(wb, x, 0.09, z + 0.02)); held.push(wb);
    }
    add("whiteboards", whiteboards);
    lab("Show me!", RX - 0.05, 0.36, RZ + 0.05, "classroom", 0.022);

    setReviews(0.75);
    k.tick((t, dt, motion) => {
      if (!motion) return;
      slots.forEach((sl, i) => { sl.material.emissiveIntensity = 0.4 + 0.4 * Math.max(0, Math.sin(t * 2 + i * 1.6)); });
      nodes.length && schema.children.forEach((c, i) => { if (c.geometry?.type === "SphereGeometry") c.scale.setScalar(1 + 0.25 * Math.max(0, Math.sin(t * 1.5 + i))); });
      top.rotation.z = Math.max(0, Math.sin(t * 0.8)) * Math.PI * 0.9; top.position.y = 0.032 + Math.max(0, Math.sin(t * 0.8)) * 0.04;
      const up = Math.sin(t * 0.7) > 0; held.forEach((wb, i) => { wb.position.y = up ? 0.15 + Math.sin(t * 3 + i) * 0.004 : 0.068; wb.rotation.x = up ? 0 : -Math.PI / 2; });
      tp.rotation.y = -0.5 + Math.sin(t * 0.5) * 0.4;
    });
  },
};
