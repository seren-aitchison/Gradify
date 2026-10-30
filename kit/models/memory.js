// EduGradify's 3D model: how learning works, for teachers. The multi-store model with Baddeley's
// working memory inside it, long-term memory as a web of schemas, and the classroom strategies
// that move knowledge between them. Information flows in, gets encoded and is retrieved.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  stores: { name: "Memory stores", c: "#5ef0ff" },
  working: { name: "Working memory", c: "#f055dd" },
  ltm: { name: "Long-term memory", c: "#c79bff" },
  strategies: { name: "Teaching strategies", c: "#6bffb8" },
};

const STRUCTURES = {
  sensory: s("stores", "Sensory memory", "Holds a brief copy of everything we see and hear: under a second for vision (iconic), a few seconds for sound (echoic). Only what we attend to moves on.",
    ["Sperling (1960): people saw a whole grid briefly but could report only one cued row.", "**Attention** is the gate into working memory.", "Implication: reduce distractions; make the key thing salient."],
    [["How long does iconic memory last?", "Under a second."], ["What moves information from sensory memory into working memory?", "Attention."], ["What did Sperling's partial report experiment show?", "Sensory memory briefly holds more than we can report before it fades."]],
    ["sensory memory", "attention", "iconic", "echoic", "sperling"]),
  forgetting: s("stores", "Forgetting", "Information is lost through decay, interference and failure to retrieve. Most forgetting happens soon after learning.",
    ["Ebbinghaus (1885): a steep early drop, then a slower decline.", "Proactive interference (old learning disrupts new) and retroactive interference (new disrupts old).", "Retrieval failure: the memory is there but the cue is missing (context-dependent memory: Godden and Baddeley's divers)."],
    [["Who first plotted the forgetting curve?", "Hermann Ebbinghaus (1885)."], ["What is retroactive interference?", "New learning disrupts recall of older learning."], ["What did Godden and Baddeley's diver study show?", "Recall was better when the learning and recall contexts matched (land/underwater)."]],
    ["forgetting", "ebbinghaus", "interference", "decay", "retrieval failure"]),
  centralExecutive: s("working", "Central executive", "The supervisor of working memory: directs attention, switches tasks and coordinates the slave systems. Very limited capacity.",
    ["Working memory holds about **4 ± 1 items** (Cowan), not the 7 ± 2 once thought (Miller).", "Executive function develops into the twenties; younger pupils need more scaffolding.", "Dual-task studies show the slave systems can work in parallel if they don't compete."],
    [["Roughly how many chunks can working memory hold?", "About 4 (Cowan), older estimate 7 ± 2 (Miller)."], ["What does the central executive do?", "Directs attention and coordinates the phonological loop and visuospatial sketchpad."], ["Why do novices find complex tasks overwhelming?", "Working memory is small and they lack schemas to chunk information."]],
    ["central executive", "working memory", "attention", "capacity", "baddeley"]),
  phonological: s("working", "Phonological loop", "Holds and rehearses speech-based information: the inner voice and inner ear.",
    ["Word length effect: we remember fewer long words than short ones.", "Articulatory suppression (saying 'the the the') blocks rehearsal.", "Reading text aloud while it's also on a slide overloads the loop (the redundancy effect)."],
    [["What is the word length effect?", "People recall fewer long words than short ones, because rehearsal takes longer."], ["Why avoid reading out text that's on the slide?", "It's redundant: the same verbal information competes in the phonological loop."], ["What is articulatory suppression?", "Repeating an irrelevant sound to block subvocal rehearsal."]],
    ["phonological loop", "verbal", "rehearsal", "redundancy"]),
  sketchpad: s("working", "Visuospatial sketchpad", "Holds visual and spatial information: images, layouts, diagrams.",
    ["Separate from the phonological loop, so words and pictures together can share the load: **dual coding** (Paivio).", "Mayer's multimedia principle: words plus pictures beat words alone.", "Split attention: placing labels on the diagram, not in a separate key, reduces load."],
    [["What is dual coding?", "Presenting information in both verbal and visual form, using two channels of working memory."], ["What is the split-attention effect?", "Learning suffers when learners must integrate separated sources (e.g. a diagram and a distant key)."], ["What does the visuospatial sketchpad hold?", "Visual and spatial information."]],
    ["visuospatial", "sketchpad", "dual coding", "diagram", "visual"]),
  episodicBuffer: s("working", "Episodic buffer", "Added by Baddeley in 2000: a temporary store that binds information from the loop, sketchpad and long-term memory into single episodes.",
    ["Explains how we hold chunks bigger than the slave systems alone allow.", "Links working memory to long-term memory.", "Prior knowledge pulled into the buffer is why experts can hold far more."],
    [["Why was the episodic buffer added to the model?", "To explain how information from different systems and LTM is integrated into episodes."], ["When was the episodic buffer added?", "2000."], ["How does prior knowledge help working memory?", "It lets learners chunk new information, effectively expanding capacity."]],
    ["episodic buffer", "chunking", "baddeley"]),
  schemas: s("ltm", "Schemas", "Long-term memory stores knowledge as connected networks (schemas). Its capacity seems unlimited.",
    ["New learning sticks when it connects to what's already known: **activate prior knowledge**.", "Experts have rich, organised schemas, so they see deep structure; novices see surface features (Chi, 1981).", "Misconceptions are schemas too: they must be confronted, not just overwritten."],
    [["What is a schema?", "An organised network of knowledge in long-term memory."], ["Why does prior knowledge matter so much?", "New information is understood and stored by connecting it to existing schemas."], ["How do experts and novices differ (Chi)?", "Experts categorise problems by deep principles; novices by surface features."]],
    ["schema", "long-term memory", "prior knowledge", "expert", "novice", "misconception"]),
  declarative: s("ltm", "Facts and procedures", "Declarative knowledge (facts and concepts: knowing that) and procedural knowledge (skills: knowing how) are stored differently.",
    ["Procedures become automatic with practice, freeing working memory for higher-order thinking.", "Fluency in basics (times tables, phonics) is the foundation for problem solving.", "Rosenshine: provide models, guide practice, check for understanding, aim for a high success rate (~80%)."],
    [["What is the difference between declarative and procedural knowledge?", "Declarative is knowing that (facts, concepts); procedural is knowing how (skills)."], ["Why does automaticity matter?", "Automatic skills use little working memory, freeing capacity for complex thinking."], ["What success rate does Rosenshine recommend in guided practice?", "About 80%."]],
    ["declarative", "procedural", "automaticity", "fluency", "rosenshine"]),
  retrieval: s("strategies", "Retrieval practice", "Pulling knowledge out of memory (quizzes, flashcards, brain dumps) strengthens it far more than re-reading.",
    ["The **testing effect** (Roediger and Karpicke, 2006): practice tests beat restudying on a delayed test.", "Low-stakes, frequent, with feedback.", "Effortful retrieval works best: a desirable difficulty (Bjork)."],
    [["What is the testing effect?", "Retrieving information strengthens memory more than restudying it."], ["Who showed the testing effect in 2006?", "Roediger and Karpicke."], ["What makes retrieval practice most effective?", "Low stakes, frequent, effortful, with feedback, spread over time."]],
    ["retrieval practice", "testing effect", "quiz", "low stakes", "recall"]),
  spacing: s("strategies", "Spacing and interleaving", "Spreading practice out over time beats massing it; mixing topics beats blocking them.",
    ["The **spacing effect**: the same study time spread out gives much better long-term retention (Cepeda et al., 2006).", "Interleaving helps learners choose the right method, not just apply it.", "Both feel harder and look worse during learning, but are better for the test weeks later."],
    [["What is the spacing effect?", "Distributed practice leads to better long-term retention than massed practice."], ["Why does interleaving help?", "Learners must discriminate between problem types and select the right strategy."], ["Why might students resist spacing and interleaving?", "They feel harder and performance during practice looks worse, though long-term learning is better."]],
    ["spacing", "interleaving", "distributed practice", "desirable difficulty"]),
  load: s("strategies", "Cognitive load", "Sweller's cognitive load theory: learning fails when working memory is overloaded.",
    ["Intrinsic load (the material's complexity), extraneous load (poor design), germane load (building schemas).", "Worked examples help novices; the **expertise reversal effect** means they hinder experts.", "Fade guidance gradually: model, then we-do, then you-do."],
    [["Name the three types of cognitive load.", "Intrinsic, extraneous and germane."], ["What is the expertise reversal effect?", "Methods that help novices (e.g. worked examples) can hinder more expert learners."], ["How can teachers reduce extraneous load?", "Clear presentation, removing irrelevant information, integrating text with diagrams, avoiding redundancy."]],
    ["cognitive load", "sweller", "worked example", "scaffold", "expertise reversal"]),
};

const NOTES = {
  stores: { title: "The multi-store model and forgetting", lead: "Atkinson and Shiffrin (1968): information passes from sensory memory to short-term (working) memory to long-term memory. Attention and rehearsal move it along; forgetting can happen at every stage.",
    sections: [
      ["The model", "- Sensory register: large capacity, very brief, modality-specific.", "- Short-term memory: limited capacity and duration (~18–30 s without rehearsal: Peterson and Peterson).", "- Long-term memory: unlimited capacity, potentially lifelong.", "> Criticisms: STM isn't a single store (hence working memory); rehearsal isn't the only route into LTM (elaboration, meaning, emotion)."],
      ["Forgetting in the classroom", "- Pupils forget most of a lesson within days unless it's revisited.", "- 'Learning' is a change in long-term memory; 'performance' in the lesson can mislead (Soderstrom and Bjork).", "- Plan returns to content: starters, homework, interleaved quizzes."],
      ["Attention", "- Attention is limited and selective; novelty, relevance and emotion capture it.", "- Multitasking is task-switching, with costs.", "- Routines reduce the load of classroom logistics, leaving more for content."],
    ] },
  working: { title: "Working memory", lead: "Baddeley and Hitch (1974): short-term memory is a working system with several parts, not one store. It's where thinking happens, and it's small.",
    sections: [
      ["The components", "- Central executive: attention control. Phonological loop: words and sounds. Visuospatial sketchpad: images and space. Episodic buffer: integration and link to LTM.", "- Evidence: dual-task studies; patient KF (impaired verbal STM, intact visual)."],
      ["Implications for teaching", "- Present new material in small steps (Rosenshine).", "- Use dual coding; avoid redundant narration of on-screen text.", "- Make thinking visible with worked examples and modelling.", "> Working memory capacity varies between pupils and is linked to attainment; it can't easily be trained, but load can be managed."],
      ["Checking for understanding", "- Hinge questions: a quick multiple-choice question whose wrong answers reveal specific misconceptions.", "- Mini whiteboards and cold calling get responses from everyone.", "- Don't ask 'Any questions?': ask questions that show you who has understood."],
    ] },
  ltm: { title: "Long-term memory and schemas", lead: "What pupils already know is the biggest influence on what they learn next (Ausubel). Teaching is building well-organised schemas in long-term memory.",
    sections: [
      ["Types of long-term memory", "- Episodic (experiences), semantic (facts and concepts), procedural (skills) (Tulving; Cohen and Squire).", "- Semantic knowledge is what most curricula aim to build; episodic memories of lessons can help or distract."],
      ["Building schemas", "- Sequence the curriculum so foundations come first.", "- Elaboration: ask how and why, connect ideas, use concrete examples.", "- Knowledge organisers summarise the core of a unit for retrieval."],
      ["Novices and experts", "- Novices benefit from explicit instruction; discovery learning overloads them (Kirschner, Sweller and Clark, 2006).", "- As expertise grows, move towards independent practice and problem solving.", "- Deliberate practice (Ericsson) builds expertise through targeted, feedback-rich practice."],
    ] },
  strategies: { title: "Strategies that work", lead: "The strongest evidence from cognitive science points to a handful of strategies (Dunlosky et al., 2013; EEF guidance): retrieval practice, spacing, interleaving, dual coding, worked examples and elaboration.",
    sections: [
      ["Retrieval practice", "- Quizzes at the start of lessons covering last lesson, last week and last term.", "- Free recall (brain dumps), flashcards, self-quizzing, practice questions.", "- Feedback makes retrieval stronger, especially after errors."],
      ["Spacing and interleaving", "- Revisit topics after increasing gaps; schedule spaced homework.", "- Interleave problem types once each has been learned.", "- Make the case to pupils: effortful learning feels worse but works better."],
      ["Managing cognitive load", "- Worked examples, then completion problems, then independent problems (fading).", "- Remove decorative clutter from slides; integrate labels.", "- Pre-teach vocabulary before complex tasks."],
      ["Metacognition", "- EEF: teach pupils to plan, monitor and evaluate their learning.", "- Pupils often prefer re-reading and highlighting, which are low-utility; show them better ways.", "! Learning styles (visual, auditory, kinaesthetic) have no evidence base: match the mode to the content, not the pupil."],
    ] },
};

export default {
  title: "How learning works, in 3D", kicker: "3D learning science",
  intro: { title: "Explore memory and learning", text: "Information flows from the senses into working memory, gets encoded into long-term memory, and is retrieved again. Click any store or strategy for the research and what it means for your lessons, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Research note",
  quiz: "find the part of the model",
  motion: "Information flowing",
  camera: { pos: [0.5, 1.2, 3.0], target: [0, 0.3, 0], min: 0.05, max: 5 },
  views: { Model: [[0.5, 1.2, 3.0], [0, 0.3, 0]], "Working memory": [[0.2, 0.6, 1.0], [0, 0.4, 0]], "Long-term": [[0.9, 0.7, 1.0], [0.7, 0.35, 0]], Strategies: [[0.1, 0.5, 1.6], [0, 0.1, 0.6]] },
  platform: { r: 1.15, y: -0.005 },
  labelMax: 3,
  explode: true,
  bg: ["#1c1a3a", "#07060f"],
  build(k) {
    const { THREE, V, mat, glow, holo, limb, tube, blob, box, text, add, decor } = k;
    const label = (g, str, y, c = "#ffffff") => { const l = text(str, { size: 0.035, colour: c, bg: "rgba(0,0,0,0.55)" }); l.position.set(0, y, 0); g.add(l); };
    // sensory memory: a fan of fading inputs on the left
    const sen = new THREE.Group(); sen.position.set(-0.85, 0.4, 0);
    sen.add(new THREE.Mesh(new THREE.SphereGeometry(0.11, 48, 32), holo("#bfdcea", "#0d3b52", 0.8)));
    for (const [i, c] of [[0, "#ffe066"], [1, "#5ef0ff"], [2, "#f055dd"], [3, "#6bffb8"]]) { const ic = new THREE.Mesh(i % 2 ? new THREE.TorusGeometry(0.025, 0.008, 12, 32) : new THREE.OctahedronGeometry(0.025), mat(c, { detail: "none", emissive: new THREE.Color(c).multiplyScalar(0.3) })); ic.position.set(-0.22, -0.12 + i * 0.08, 0); sen.add(ic); }
    label(sen, "Sensory memory", 0.17); add("sensory", sen);
    // working memory: the central executive and its three slaves, inside a glass dome
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.3, 64, 48), mat("#f055dd", { detail: "none", transmission: 0.85, thickness: 0.05, roughness: 0.05, transparent: true, opacity: 0.18, depthWrite: false })); dome.position.set(-0.15, 0.38, 0); decor(dome, "working");
    const ce = new THREE.Mesh(new THREE.IcosahedronGeometry(0.075, 2), mat("#f055dd", { detail: "none", clearcoat: 1, roughness: 0.2, emissive: new THREE.Color("#4a0a40") })); ce.position.set(-0.15, 0.5, 0); add("centralExecutive", ce);
    const ceL = text("Central executive", { size: 0.03, bg: "rgba(0,0,0,0.55)" }); ceL.position.set(-0.15, 0.61, 0); decor(ceL, "working");
    const pl = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.016, 16, 48), mat("#ff8fe8", { detail: "none", clearcoat: 1 })); pl.position.set(-0.3, 0.28, 0.05); pl.rotation.x = 0.6; add("phonological", pl);
    const plL = text("Phonological loop", { size: 0.026, bg: "rgba(0,0,0,0.55)" }); plL.position.set(-0.32, 0.19, 0.05); decor(plL, "working");
    const sk = box(0.1, 0.075, 0.01, mat("#ffb3f0", { detail: "none", clearcoat: 1, emissive: new THREE.Color("#3a1030") }), 0.008); sk.position.set(0.0, 0.28, 0.05); add("sketchpad", sk);
    for (let i = 0; i < 3; i++) { const sh = new THREE.Mesh(i === 0 ? new THREE.CircleGeometry(0.012, 24) : i === 1 ? new THREE.PlaneGeometry(0.02, 0.02) : new THREE.CircleGeometry(0.013, 3), glow("#ffffff", 0.9)); sh.position.set(-0.025 + i * 0.025, 0.28, 0.057); decor(sh, "working"); }
    const skL = text("Visuospatial sketchpad", { size: 0.026, bg: "rgba(0,0,0,0.55)" }); skL.position.set(0.02, 0.19, 0.05); decor(skL, "working");
    const eb = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.12, 8, 24), mat("#c070ff", { detail: "none", clearcoat: 1, transmission: 0.3, thickness: 0.05 })); eb.rotation.z = Math.PI / 2; eb.position.set(-0.15, 0.37, 0.08); add("episodicBuffer", eb);
    const ebL = text("Episodic buffer", { size: 0.024, bg: "rgba(0,0,0,0.55)" }); ebL.position.set(-0.15, 0.42, 0.12); decor(ebL, "working");
    // long-term memory: a glowing web of schemas
    const ltm = new THREE.Group(); ltm.position.set(0.7, 0.38, 0);
    const rnd = (() => { let x = 5; return () => (x = (x * 16807) % 2147483647) / 2147483647; })();
    const pts = []; for (let i = 0; i < 46; i++) pts.push(V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize().multiplyScalar(0.08 + rnd() * 0.2));
    const nodeMat = mat("#c79bff", { detail: "none", clearcoat: 1, emissive: new THREE.Color("#2a1050") });
    const nodes = new THREE.InstancedMesh(new THREE.SphereGeometry(0.014, 16, 12), nodeMat, pts.length); const m4 = new THREE.Matrix4(); pts.forEach((p, i) => nodes.setMatrixAt(i, m4.makeTranslation(p.x, p.y, p.z))); ltm.add(nodes);
    const edges = []; pts.forEach((p, i) => pts.forEach((q, j) => { if (j > i && p.distanceTo(q) < 0.13) edges.push(p, q); }));
    const eg = new THREE.BufferGeometry().setFromPoints(edges); ltm.add(new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: "#d6b8ff", transparent: true, opacity: 0.55 })));
    label(ltm, "Long-term memory: schemas", 0.32); add("schemas", ltm);
    const proc = new THREE.Group(); proc.position.set(0.7, 0.0, 0.35);
    for (let i = 0; i < 5; i++) { const st = box(0.06, 0.02 + i * 0.02, 0.06, mat("#a07bff", { detail: "none", clearcoat: 1 }), 0.006); st.position.set(-0.12 + i * 0.06, (0.02 + i * 0.02) / 2, 0); proc.add(st); }
    label(proc, "Facts and skills", 0.18); add("declarative", proc);
    // forgetting: a fading trail falling away from working memory
    const fg = new THREE.Group(); fg.position.set(-0.45, 0.0, -0.35);
    const fc = []; for (let i = 0; i <= 40; i++) { const t = i / 40; fc.push(V(t * 0.5, 0.25 * Math.exp(-t * 3.5) + 0.02, 0)); }
    fg.add(tube(fc, 0.008, mat("#5ef0ff", { detail: "none", transparent: true, opacity: 0.8, emissive: new THREE.Color("#0a3040") }), 64));
    label(fg, "Forgetting", 0.33); add("forgetting", fg);
    // strategies: three tools in front
    const strat = (id, x, build, name) => { const g = new THREE.Group(); g.position.set(x, 0.07, 0.6); build(g); label(g, name, 0.15); add(id, g); };
    strat("retrieval", -0.45, (g) => { for (let i = 0; i < 4; i++) { const c = box(0.09, 0.006, 0.06, mat(i === 3 ? "#6bffb8" : "#e8fff5", { detail: "none", clearcoat: 1 }), 0.004); c.position.set(0, i * 0.012, 0); c.rotation.y = i * 0.15; g.add(c); } }, "Retrieval practice");
    strat("spacing", 0.0, (g) => { for (let i = 0; i < 5; i++) { const d = box(0.03, 0.03, 0.03, mat(i % 2 ? "#2a4a3a" : "#6bffb8", { detail: "none", clearcoat: 1 }), 0.004); d.position.set(-0.08 + i * 0.04, 0, 0); g.add(d); } }, "Spacing & interleaving");
    strat("load", 0.45, (g) => { const arc = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.008, 12, 48, Math.PI), mat("#6bffb8", { detail: "none" })); g.add(arc); const needle = limb(V(0, 0, 0), V(0.04, 0.045, 0), 0.004, mat("#ff5a4d", { detail: "none" }), false); g.add(needle); g.userData.needle = needle; }, "Cognitive load");
    // flows: senses → working memory → long-term memory (encoding), and back (retrieval)
    k.flow([[V(-1.05, 0.4, 0), V(-0.75, 0.42, 0), V(-0.4, 0.42, 0), V(-0.18, 0.45, 0)]], "#5ef0ff", 24, 0.25, "stores", 0.014);
    k.flow([[V(-0.05, 0.42, 0.05), V(0.2, 0.5, 0.08), V(0.5, 0.45, 0.05)]], "#f0a0ff", 24, 0.22, "working", 0.014);
    k.flow([[V(0.5, 0.32, -0.05), V(0.2, 0.25, -0.1), V(-0.05, 0.33, -0.05)]], "#6bffb8", 20, 0.22, "strategies", 0.014);
    k.tick((t, dt, motion) => { if (!motion) return; ce.rotation.y = t * 0.6; pl.rotation.z = t * 1.5; ltm.rotation.y = t * 0.12; });
  },
};
