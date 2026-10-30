// UnderGradify's 3D model: what happens to what you learn over a semester. Each lane is a way of
// studying (cramming, re-reading, spaced retrieval) drawn as a ribbon of memory strength across
// twelve weeks, with the review sessions, the exam and the retention target marked.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  forgetting: { name: "Forgetting", c: "#ff5a4d" },
  spacing: { name: "Spaced retrieval", c: "#6bffb8" },
  exam: { name: "Exams & planning", c: "#ffe066" },
};

const STRUCTURES = {
  curve: s("forgetting", "The forgetting curve", "Learn something once and leave it: memory drops steeply in the first days, then levels off low.",
    ["Ebbinghaus found much of new material lost within a day or two without review.", "The curve flattens each time you successfully retrieve the memory.", "Meaningful, well-connected material is forgotten more slowly than isolated facts."],
    [["What does the forgetting curve show?", "Memory for new material falls steeply soon after learning, then levels off, unless it's reviewed."], ["What flattens the forgetting curve?", "Successful retrieval at spaced intervals (and understanding and connecting the material)."], ["Who discovered the forgetting curve?", "Hermann Ebbinghaus."]],
    ["forgetting curve", "ebbinghaus", "memory", "retention", "forget"]),
  cramming: s("forgetting", "Cramming", "Massed study just before the exam: a high, brief peak that collapses soon after.",
    ["Massed practice can get you through tomorrow's test but is poor for anything later: your next module, finals, your job.", "All-nighters harm memory: sleep is when memories are consolidated.", "The 'fluency illusion': re-reading makes material feel familiar, which we mistake for knowing it."],
    [["Why is cramming a poor strategy for degree-level study?", "It produces short-lived retention, while later modules and finals build on earlier knowledge."], ["What is the fluency illusion?", "Mistaking familiarity (from re-reading) for the ability to recall and use the material."], ["Why do all-nighters hurt memory?", "Sleep consolidates memories; missing it impairs retention."]],
    ["cram", "massed practice", "all-nighter", "fluency illusion", "re-reading"]),
  reread: s("forgetting", "Re-reading and highlighting", "The most popular study methods, and among the least effective (Dunlosky et al., 2013 rated them low utility).",
    ["They feel productive because the material becomes familiar.", "Highlighting can even hurt by focusing on isolated facts.", "Convert notes into questions instead, then answer them without looking."],
    [["How did Dunlosky et al. rate re-reading and highlighting?", "Low utility."], ["Why do students like re-reading?", "It feels easy and makes material familiar, which feels like learning."], ["What should you do with notes instead of re-reading?", "Turn them into questions and practise answering them from memory."]],
    ["re-read", "highlight", "passive", "dunlosky", "study method"]),
  spaced: s("spacing", "Spaced retrieval", "Testing yourself after increasing gaps: each review is a little harder and lifts memory higher and longer.",
    ["Optimal gap ≈ 10–20% of the time until you need it (Cepeda et al., 2008).", "Spaced repetition algorithms (like Gradify's) schedule each card for just before you'd forget it.", "Successful effortful retrieval is the point: re-reading at spaced intervals helps far less."],
    [["Roughly how should review gaps relate to the retention interval?", "About 10–20% of the time until you need to remember it."], ["What does a spaced repetition algorithm do?", "Schedules each item for review just before you're likely to forget it, lengthening gaps as it's learned."], ["Why must spaced reviews involve retrieval?", "Effortful recall strengthens memory much more than passively re-reading."]],
    ["spaced repetition", "spacing", "retrieval practice", "flashcard", "review schedule"]),
  reviews: s("spacing", "Review sessions", "The moments you test yourself: day 1, day 3, week 1, week 3, week 8. Each one resets the curve higher.",
    ["Short, frequent sessions (20–30 minutes) beat rare long ones.", "Mix topics within a session (interleaving).", "Mark what you got wrong and come back to it sooner."],
    [["Give an example of an expanding review schedule.", "Day 1, day 3, week 1, week 3, week 8."], ["Short frequent sessions or long rare ones?", "Short and frequent."], ["What should happen to items you get wrong?", "They should be reviewed again sooner."]],
    ["review", "study session", "revision", "schedule"]),
  sleep: s("spacing", "Sleep", "Sleep consolidates memories: slow-wave sleep replays the day's learning and strengthens it.",
    ["Studying then sleeping beats studying then staying awake for the same time (Jenkins and Dallenbach, 1924).", "Most adults need 7–9 hours; regular timing matters.", "Sleep deprivation cuts attention and the ability to form new memories the next day."],
    [["How does sleep help memory?", "It consolidates newly learned material, especially during slow-wave sleep."], ["How much sleep do most adults need?", "7–9 hours."], ["What did Jenkins and Dallenbach find?", "Less forgetting after sleep than after the same time awake."]],
    ["sleep", "consolidation", "rest", "night"]),
  examDay: s("exam", "The exam", "The day you need it all. What matters is what you can retrieve then, not what you once understood.",
    ["Practise under exam conditions: timed, closed-book, past papers.", "Plan answers to the command words: describe, explain, evaluate, discuss.", "Read the marking criteria: they tell you exactly what earns marks."],
    [["Why use past papers under timed conditions?", "They practise retrieval and the exam skills (timing, structure, command words) at once."], ["What does 'evaluate' require?", "Weighing strengths and weaknesses and reaching a justified judgement."], ["Where do you find what earns marks?", "In the marking criteria and examiners' reports."]],
    ["exam", "past paper", "command word", "marking criteria", "assessment"]),
  target: s("exam", "Retention target", "The level you want to keep everything above: for most courses, recalling about 90% of what you've studied.",
    ["Gradify aims to keep each topic above its target and tells you what's fading.", "Higher targets need more frequent reviews; there's a trade-off with time.", "Prioritise: core concepts others build on deserve the highest targets."],
    [["What's the trade-off in setting a retention target?", "Higher targets need more frequent reviews, costing more time."], ["Which topics deserve the highest retention targets?", "Core concepts that later topics build on."], ["What does it mean if a topic is 'fading'?", "Its predicted recall is dropping towards or below the target, so it's due for review."]],
    ["retention", "target", "mastery", "fading"]),
  plan: s("exam", "Planning the semester", "Backwards planning from deadlines and exams, with study blocks for every module each week.",
    ["Block out fixed commitments, then schedule study sessions for each module, then coursework milestones.", "The planning fallacy: we underestimate how long tasks take, so add buffer time.", "Start coursework early with a rough draft: feedback-driven revision beats a last-minute polish."],
    [["What is the planning fallacy?", "The tendency to underestimate how long tasks will take."], ["How should you plan a semester?", "Work backwards from deadlines and exams, schedule regular study for each module, and add buffer time."], ["Why start coursework early?", "To have time for feedback and revision, and reduce last-minute pressure."]],
    ["plan", "timetable", "deadline", "coursework", "time management", "procrastination"]),
};

const NOTES = {
  forgetting: { title: "Why we forget, and why cramming fails", lead: "Forgetting is normal and fast. The goal isn't to never forget but to study in a way that makes memories last long enough to build on.",
    sections: [
      ["The forgetting curve", "- Retention drops roughly exponentially after learning; the rate depends on how meaningful and well-learned the material is.", "- Every successful retrieval makes the next drop slower.", "> At university, everything builds: what you forget in first year, you'll relearn for finals."],
      ["The illusions of learning", "- Fluency: familiar-feeling material is mistaken for known material.", "- Foresight bias: answers look obvious when you can see them.", "- Test yourself before checking: if you can't produce it, you don't know it yet."],
      ["Low-utility methods", "- Re-reading, highlighting, summarising without testing, keyword mnemonics for complex material.", "- These aren't useless, but their time is better spent on retrieval."],
    ] },
  spacing: { title: "Spaced retrieval: the method that works", lead: "Two techniques have the strongest evidence for long-term learning: practice testing and distributed practice (Dunlosky et al., 2013). Combined, they're spaced retrieval.",
    sections: [
      ["How to do it", "1. After each lecture, turn the key ideas into questions (or let Gradify make checked flashcards).", "2. Answer them the next day without notes; check and correct.", "3. Review again after a few days, then a week, then a few weeks.", "4. Mix modules and question types in each session."],
      ["Beyond flashcards", "- Explain concepts in your own words (the Feynman technique).", "- Practise applying ideas to new problems: past questions, case studies, problem sheets.", "- Elaborative interrogation: ask why and how for each claim."],
      ["Sleep, exercise and wellbeing", "- Sleep after learning consolidates it; protect it, especially before exams.", "- Exercise improves mood and some aspects of memory.", "! If stress, mood or sleep problems are affecting your study, talk to your university's student support or wellbeing service early."],
    ] },
  exam: { title: "Exams, deadlines and planning", lead: "Good learning habits are the foundation; good planning makes them happen; exam technique turns knowledge into marks.",
    sections: [
      ["Planning", "- Weekly plan: lectures and seminars, then fixed study blocks per module, then coursework.", "- Break big tasks into small next actions; procrastination is often about tasks feeling vague or overwhelming.", "- Use the Pomodoro technique (25 minutes focused, 5 minutes break) to get started."],
      ["Coursework", "- Read the brief and marking criteria first.", "- Research → outline → rough draft → feedback → revision.", "- Reference as you go (Harvard, APA etc.); academic integrity rules apply to AI tools too."],
      ["Exam technique", "- Read the whole paper, allocate time by marks, answer the question set.", "- Plan essay answers briefly: a clear argument, evidence, evaluation, conclusion.", "- For calculations, show working: method marks are available even if the answer is wrong."],
    ] },
};

export default {
  title: "Your semester in 3D", kicker: "3D study science",
  intro: { title: "Explore a semester of memory", text: "Three ways of studying, drawn as ribbons of memory strength across twelve weeks: cramming, re-reading and spaced retrieval. Watch what each leaves you with on exam day. Click anything for the evidence and how to use it, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Tip",
  quiz: "find it on the chart",
  motion: "Weeks passing",
  camera: { pos: [1.3, 1.2, 2.7], target: [0, 0.2, 0], min: 0.05, max: 5 },
  views: { Semester: [[1.3, 1.2, 2.7], [0, 0.2, 0]], Side: [[2.1, 0.5, 0.1], [0, 0.25, 0]], "Exam day": [[1.0, 0.5, 0.8], [0.65, 0.3, 0]], Above: [[0.05, 2.0, 0.6], [0, 0.1, 0]] },
  platform: { r: 1.1, y: -0.005 },
  labelMax: 3,
  explode: true,
  bg: ["#1a2440", "#060a14"],
  build(k) {
    const { THREE, V, mat, glow, limb, box, text, line, add, decor } = k;
    const W = 1.4, X = (week) => -0.7 + (week / 12) * W, H = 0.5;   // 12 weeks across, memory 0–100% up
    // a ribbon: memory strength over time for one lane
    const ribbon = (f, z, c) => {
      const n = 240, pos = [], idx = [];
      for (let i = 0; i <= n; i++) { const w = (i / n) * 12, y = Math.max(0.005, f(w)) * H; pos.push(X(w), y, z - 0.05, X(w), y, z + 0.05, X(w), 0, z - 0.05, X(w), 0, z + 0.05); }
      for (let i = 0; i < n; i++) { const a = i * 4; idx.push(a, a + 1, a + 4, a + 1, a + 5, a + 4, a, a + 4, a + 2, a + 4, a + 6, a + 2, a + 1, a + 3, a + 5, a + 3, a + 7, a + 5); }
      const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
      return new THREE.Mesh(g, mat(c, { detail: "none", roughness: 0.2, clearcoat: 1, transparent: true, opacity: 0.85, side: THREE.DoubleSide, emissive: new THREE.Color(c).multiplyScalar(0.05) }));
    };
    const decay = (w, w0, s0) => (w < w0 ? 0 : Math.exp(-(w - w0) / s0));
    // lane 1: learned in week 1, never reviewed
    add("curve", ribbon((w) => decay(w, 1, 1.2) * 0.95, 0.34, "#ff5a4d"));
    // lane 2: re-read twice, crammed in week 11
    add("reread", ribbon((w) => Math.max(decay(w, 1, 1.2) * 0.95, decay(w, 5, 1.3) * 0.7, decay(w, 8, 1.4) * 0.72), 0.11, "#ff9f40"));
    add("cramming", ribbon((w) => Math.max(decay(w, 1, 1.2) * 0.9, decay(w, 11, 0.5) * 0.98), -0.12, "#ffb36b"));
    // lane 4: spaced retrieval: each review lifts memory and slows the next decline
    const reviewsAt = [1, 1.3, 2, 3.5, 6, 9.5];
    const spacedF = (w) => { let best = 0; reviewsAt.forEach((r, i) => { best = Math.max(best, decay(w, r, 0.8 * 2 ** i) * (0.95 - i * 0.005)); }); return best; };
    add("spaced", ribbon(spacedF, -0.35, "#6bffb8"));
    const rv = new THREE.Group();
    reviewsAt.forEach((r) => { const y = spacedF(r) * H; const n = new THREE.Mesh(new THREE.OctahedronGeometry(0.022), mat("#ffffff", { detail: "none", emissive: new THREE.Color("#2a6a50"), clearcoat: 1 })); n.position.set(X(r), y + 0.03, -0.35); rv.add(n); rv.add(limb(V(X(r), 0, -0.43), V(X(r), y + 0.02, -0.43), 0.0018, glow("#6bffb8", 0.6), false)); });
    add("reviews", rv);
    // sleep: moons over the spaced lane, one per night of the first week
    const moons = new THREE.Group();
    for (let d = 1; d <= 6; d++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 12), glow("#c8d8ff", 0.9)); m.position.set(X(1 + d / 7), H + 0.05, -0.35); moons.add(m); }
    const ml = text("Sleep consolidates", { size: 0.022, colour: "#c8d8ff" }); ml.position.set(X(1.5), H + 0.1, -0.35); moons.add(ml);
    add("sleep", moons);
    // the retention target band and the exam day
    const band = new THREE.Mesh(new THREE.PlaneGeometry(W, 0.012), glow("#ffe066", 0.5)); band.position.set(0, 0.9 * H, -0.5); add("target", band);
    const bl = text("90% target", { size: 0.025, colour: "#ffe066" }); bl.position.set(X(12) + 0.08, 0.9 * H, -0.5); decor(bl, "exam");
    const exam = new THREE.Mesh(new THREE.PlaneGeometry(0.9, H * 1.15), glow("#ffe066", 0.12)); exam.rotation.y = Math.PI / 2; exam.position.set(X(12), H * 0.57, 0); exam.material.side = THREE.DoubleSide; add("examDay", exam);
    const el = text("Exam", { size: 0.04, colour: "#ffe066", bg: "rgba(0,0,0,0.55)" }); el.position.set(X(12), H * 1.2, 0); decor(el, "exam");
    // the plan: a 12-week calendar on the floor in front
    const cal = new THREE.Group(); cal.position.set(0, 0, 0.62);
    for (let w = 0; w < 12; w++) for (let d = 0; d < 5; d++) { const c = box(0.09, 0.006 + ((w * 5 + d) % 3 === 0 ? 0.02 : 0), 0.025, mat((w * 5 + d) % 3 === 0 ? "#6bffb8" : "#2a3a4a", { detail: "none", roughness: 0.4 }), 0.004); c.position.set(X(w + 0.5), 0.005, -0.06 + d * 0.03); cal.add(c); }
    const cl = text("Study blocks planned each week", { size: 0.024, bg: "rgba(0,0,0,0.55)" }); cl.position.set(0, 0.08, 0.04); cal.add(cl);
    add("plan", cal);
    // labels and axes
    for (const [z, lab, c] of [[0.34, "Learned once", "#ff5a4d"], [0.11, "Re-read", "#ff9f40"], [-0.12, "Crammed", "#ffb36b"], [-0.35, "Spaced retrieval", "#6bffb8"]]) { const l = text(lab, { size: 0.028, colour: c, bg: "rgba(0,0,0,0.5)" }); l.position.set(X(0) - 0.14, 0.05, z); decor(l, z < -0.3 ? "spacing" : "forgetting"); }
    for (let w = 0; w <= 12; w += 2) { const l = text(`Week ${w}`, { size: 0.02, colour: "#9fbfd0" }); l.position.set(X(w), -0.0, 0.5); decor(l); decor(line([V(X(w), 0.001, -0.45), V(X(w), 0.001, 0.45)], "#1d5a6b", 0.4)); }
    const now = limb(V(X(0), 0.002, -0.45), V(X(0), 0.002, 0.45), 0.003, glow("#ffffff", 0.7), false); decor(now);   // today, sweeping through the semester
    k.tick((t, dt, motion) => { if (!motion) return; now.position.x = X((t * 0.8) % 12); });
  },
};
