// PostGradify's 3D model: a research project. The research cycle as a ring of stages around a
// citation network (seminal papers, reviews, recent work, and the gap your thesis fills), with the
// thesis itself as a stack of chapters and the viva at the top. Notes cover literature, methods,
// writing and the viva.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  literature: { name: "The literature", c: "#5ef0ff" },
  cycle: { name: "Research cycle", c: "#ffb36b" },
  thesis: { name: "Thesis & viva", c: "#c79bff" },
};

const STRUCTURES = {
  seminal: s("literature", "Seminal papers", "The foundational works everyone in your field cites. Large nodes with many incoming links.",
    ["Find them through citation counts, review articles and your supervisor.", "Read them properly, not just their abstracts: examiners will expect you to know them.", "Trace forward (who cites them) as well as backward (whom they cite)."],
    [["How can you identify seminal papers?", "High citation counts, frequent mentions in review articles, and supervisor advice."], ["What is forward citation tracing?", "Following later papers that cite a key work."], ["Why read seminal papers in full?", "You'll need to engage with their arguments and methods accurately, not secondhand."]],
    ["seminal", "citation", "key paper", "foundational"]),
  reviews: s("literature", "Review articles", "Papers that summarise a field: narrative reviews, systematic reviews and meta-analyses.",
    ["**Systematic reviews** use a pre-registered protocol, explicit search and inclusion criteria (PRISMA).", "Meta-analyses combine effect sizes statistically across studies.", "A good literature review is critical and synthesised, organised by themes, not a list of summaries."],
    [["What makes a review 'systematic'?", "A pre-specified protocol with explicit search, inclusion and appraisal methods, reported transparently (e.g. PRISMA)."], ["What is a meta-analysis?", "A statistical combination of results from multiple studies."], ["How should a literature review be organised?", "By themes or debates, synthesising and critiquing, not paper by paper."]],
    ["literature review", "systematic review", "meta-analysis", "prisma", "review"]),
  gap: s("literature", "The research gap", "The question the literature hasn't answered: where your thesis makes its original contribution.",
    ["Gaps can be empirical (not studied), theoretical (not explained), methodological (studied badly) or contextual (not in this setting).", "State it explicitly: 'However, little is known about…'.", "Originality is a core criterion for a doctorate."],
    [["Name four kinds of research gap.", "Empirical, theoretical, methodological and contextual."], ["Why is the gap central to a thesis?", "It justifies the research and defines its original contribution."], ["How might you signal a gap in writing?", "'However, little is known about…' / 'No study has yet…'."]],
    ["research gap", "originality", "contribution", "novelty"]),
  question: s("cycle", "Research question", "A focused, answerable question that the whole project is designed around.",
    ["FINER criteria: Feasible, Interesting, Novel, Ethical, Relevant.", "Hypotheses (deductive) vs exploratory questions (inductive).", "Narrow it until you can answer it in the time and word count."],
    [["What are the FINER criteria?", "Feasible, Interesting, Novel, Ethical, Relevant."], ["Distinguish deductive and inductive research.", "Deductive tests hypotheses from theory; inductive builds theory from data."], ["Why narrow a research question?", "So it can be answered properly within the project's time and resources."]],
    ["research question", "hypothesis", "aim", "objective"]),
  methodology: s("cycle", "Methodology", "The logic of how you'll answer the question: philosophy, design, sampling, data collection and analysis.",
    ["Ontology (what exists) and epistemology (how we know) shape positivist, interpretivist and pragmatist designs.", "Validity, reliability (quantitative) and trustworthiness: credibility, transferability, dependability, confirmability (qualitative).", "Ethics approval before data collection; data management plans."],
    [["What is the difference between ontology and epistemology?", "Ontology is about the nature of reality; epistemology about how we can know it."], ["Name Lincoln and Guba's four trustworthiness criteria.", "Credibility, transferability, dependability, confirmability."], ["What must be in place before collecting data with people?", "Ethical approval (and a data management plan)."]],
    ["methodology", "methods", "epistemology", "ontology", "design", "ethics", "sampling"]),
  analysis: s("cycle", "Data and analysis", "Collecting the data and analysing it: statistical models, thematic analysis, grounded theory, discourse analysis...",
    ["Plan the analysis before collecting data (pre-registration helps for confirmatory studies).", "Report effect sizes and confidence intervals, not just p-values.", "Thematic analysis (Braun and Clarke): familiarise, code, generate themes, review, define, write up."],
    [["Why report effect sizes as well as p-values?", "p-values show whether an effect is likely non-zero; effect sizes show how large and meaningful it is."], ["List Braun and Clarke's thematic analysis phases.", "Familiarisation, coding, generating themes, reviewing themes, defining and naming themes, writing up."], ["What is pre-registration?", "Publicly recording hypotheses and analysis plans before seeing the data."]],
    ["analysis", "statistics", "thematic analysis", "regression", "qualitative", "quantitative", "data"]),
  publish: s("cycle", "Writing and publishing", "Turning findings into papers and chapters, peer review, and conference talks.",
    ["IMRaD structure: Introduction, Methods, Results and Discussion.", "Peer review: expect revisions; respond point by point and politely.", "Many theses now include published papers (thesis by publication)."],
    [["What does IMRaD stand for?", "Introduction, Methods, Results and Discussion."], ["How should you respond to peer reviewers?", "Point by point, politely, explaining changes made or why not."], ["What is a thesis by publication?", "A thesis built around published (or publishable) papers with linking chapters."]],
    ["publish", "journal", "peer review", "paper", "conference", "imrad"]),
  chapters: s("thesis", "Thesis chapters", "Introduction, literature review, methodology, findings, discussion, conclusion: one argument across 80,000–100,000 words (PhD).",
    ["The introduction states the problem, gap, questions and contribution; the conclusion answers them.", "Signpost constantly: tell the reader where the argument is going.", "Write early and often: 'writing is thinking'; aim for a rough full draft before polishing."],
    [["What are the typical chapters of a thesis?", "Introduction, literature review, methodology, results/findings, discussion, conclusion."], ["What should a thesis introduction contain?", "The problem, the gap, the research questions, the approach and the contribution."], ["Why write from early on?", "Writing clarifies thinking and reveals gaps in the argument."]],
    ["thesis", "dissertation", "chapter", "writing", "argument"]),
  viva: s("thesis", "The viva", "The oral examination: usually an internal and an external examiner discuss the thesis with you for two to three hours.",
    ["Outcomes: pass, minor corrections (most common), major corrections, resubmission, a lower award, or fail.", "Prepare a summary of each chapter, your contribution, limitations and what you'd do differently.", "Mock vivas with your supervisor reduce anxiety and expose weak points."],
    [["What is the most common viva outcome?", "Pass with minor corrections."], ["Who usually examines a PhD viva?", "An internal and an external examiner."], ["Name three ways to prepare for a viva.", "Reread the thesis, summarise each chapter and your contribution, prepare for limitations questions, do a mock viva."]],
    ["viva", "defence", "examiner", "oral exam", "corrections"]),
};

const NOTES = {
  literature: { title: "Working with the literature", lead: "A literature review isn't a summary of everything you've read: it's an argument that shows where knowledge stands and why your question matters.",
    sections: [
      ["Searching", "- Databases for your field (Web of Science, Scopus, PubMed, JSTOR, PsycINFO), Google Scholar for breadth.", "- Boolean operators, truncation, controlled vocabulary (MeSH).", "- Snowballing: backward and forward citation chasing from key papers.", "- Reference manager from day one (Zotero, EndNote, Mendeley)."],
      ["Reading critically", "- For each source: the claim, the evidence, the method, the limitations, how it relates to others.", "- Evaluate quality: design, sample, bias, replication.", "- Keep a synthesis matrix: sources as rows, themes or questions as columns."],
      ["Writing the review", "- Organise by themes, debates or chronology, not by author.", "- Compare and contrast: 'While X found…, Y argues…'.", "- End by stating the gap that your research addresses.", "> Your voice should run through it: you're the one evaluating the field."],
    ] },
  cycle: { title: "The research cycle", lead: "Question → literature → methodology → data → analysis → writing → new questions. Most projects loop round it more than once.",
    sections: [
      ["Designing the study", "- Quantitative: experiments, surveys, secondary data; power analysis for sample size.", "- Qualitative: interviews, focus groups, ethnography; sampling to saturation.", "- Mixed methods: convergent, explanatory sequential, exploratory sequential designs."],
      ["Research integrity", "- Ethics: informed consent, confidentiality, minimising harm, right to withdraw.", "- Avoid questionable research practices: p-hacking, HARKing, selective reporting.", "- Open science: pre-registration, open data and code, preprints."],
      ["Managing the project", "- Plan backwards from submission; build in time for ethics, recruitment and writing.", "- Regular supervision with agendas and written follow-ups.", "! The PhD is long: protect your wellbeing, keep regular hours, and talk to your supervisor or doctoral school early if things go wrong."],
    ] },
  thesis: { title: "The thesis and the viva", lead: "The thesis is a single, coherent argument for an original contribution. The viva is a conversation in which you defend it.",
    sections: [
      ["Structuring the argument", "- Each chapter should answer a question that moves the argument forward.", "- Link chapters explicitly; the discussion should return to the literature from chapter 2.", "- Be honest about limitations; frame them as directions for future research."],
      ["Writing well", "- Clear topic sentences; one idea per paragraph; active verbs.", "- Reverse outline drafts to check structure.", "- Proofread separately for argument, clarity and typos."],
      ["The viva", "- Typical questions: summarise your thesis; what's your contribution? Why this method? What are the limitations? What would you do differently? What next?", "- Bring an annotated copy; it's fine to pause and think.", "- After: corrections are normal; agree a clear list and deadline."],
    ] },
};

export default {
  title: "Your research in 3D", kicker: "3D research",
  intro: { title: "Explore a research project", text: "The research cycle around a citation network: seminal papers, reviews and the gap your thesis fills, with the thesis rising as a stack of chapters towards the viva. Click anything for the methods and advice, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Supervisor's note",
  quiz: "find it",
  motion: "Ideas flowing",
  camera: { pos: [0.7, 1.4, 2.9], target: [0, 0.35, 0], min: 0.05, max: 5 },
  views: { Project: [[0.7, 1.4, 2.9], [0, 0.35, 0]], Literature: [[0.15, 0.6, 1.0], [0, 0.45, 0]], Cycle: [[0.1, 1.9, 0.6], [0, 0.2, 0]], Thesis: [[1.3, 0.6, 0.5], [0.85, 0.35, -0.2]] },
  platform: { r: 1.15, y: -0.005 },
  labelMax: 3,
  explode: true,
  bg: ["#16223a", "#05080f"],
  build(k) {
    const { THREE, V, mat, glow, limb, box, text, add, decor } = k;
    const rnd = (() => { let x = 33; return () => (x = (x * 16807) % 2147483647) / 2147483647; })();
    // the citation network: older papers lower, newer higher; size by citations
    const nodes = []; for (let i = 0; i < 70; i++) { const year = rnd(), a = rnd() * Math.PI * 2, r = 0.1 + rnd() * 0.32; nodes.push({ p: V(Math.cos(a) * r, 0.2 + year * 0.5, Math.sin(a) * r), year, cites: 0 }); }
    const links = []; nodes.forEach((n, i) => { for (let j = 0; j < 3; j++) { const t = nodes[Math.floor(rnd() * nodes.length)]; if (t.year < n.year) { links.push(n.p, t.p); t.cites++; } } });
    const sem = new THREE.Group(), rest = new THREE.Group();
    nodes.forEach((n) => { const big = n.cites >= 5, m = new THREE.Mesh(new THREE.SphereGeometry(0.008 + n.cites * 0.0035, 20, 14), mat(big ? "#5ef0ff" : "#7a9ab8", { detail: "none", clearcoat: 1, emissive: new THREE.Color(big ? "#0a4050" : "#101820") })); m.position.copy(n.p); (big ? sem : rest).add(m); });
    rest.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(links), new THREE.LineBasicMaterial({ color: "#9fdcff", transparent: true, opacity: 0.3 })));
    const sl = text("Seminal papers", { size: 0.025, bg: "rgba(0,0,0,0.55)" }); sl.position.set(0, 0.22, 0.42); sem.add(sl);
    add("seminal", sem);
    const revs = new THREE.Group(); nodes.filter((n) => n.year > 0.6).slice(0, 4).forEach((n) => { const r = new THREE.Mesh(new THREE.OctahedronGeometry(0.022), mat("#9fe8ff", { detail: "none", clearcoat: 1, emissive: new THREE.Color("#0a3040") })); r.position.copy(n.p).add(V(0, 0.02, 0)); revs.add(r); }); add("reviews", revs);
    add("reviews", rest);
    // the gap: a glowing empty space at the frontier, with your thesis node
    const gap = new THREE.Group(); gap.position.set(0.05, 0.78, 0.05);
    gap.add(new THREE.Mesh(new THREE.SphereGeometry(0.06, 32, 24), glow("#ffe066", 0.18)));
    gap.add(new THREE.Mesh(new THREE.SphereGeometry(0.018, 24, 16), mat("#ffe066", { detail: "none", emissive: new THREE.Color("#7a6000") })));
    nodes.filter((n) => n.year > 0.8).slice(0, 5).forEach((n) => gap.add(limb(V(0, 0, 0), n.p.clone().sub(gap.position), 0.0018, glow("#ffe066", 0.5), false)));
    const gl = text("The gap: your contribution", { size: 0.026, colour: "#ffe066", bg: "rgba(0,0,0,0.55)" }); gl.position.set(0, 0.1, 0); gap.add(gl);
    add("gap", gap);
    // the research cycle: a ring of stations on the floor
    const stages = [["question", "Question", "#ffb36b"], ["methodology", "Methodology", "#ff9f40"], ["analysis", "Data & analysis", "#ff8f6b"], ["publish", "Write & publish", "#ffd36b"]];
    const ringR = 0.7, ringPts = [];
    for (let i = 0; i <= 96; i++) { const a = (i / 96) * Math.PI * 2; ringPts.push(V(Math.cos(a) * ringR, 0.02, Math.sin(a) * ringR)); }
    decor(new THREE.Mesh(new THREE.TorusGeometry(ringR, 0.005, 8, 160), glow("#ffb36b", 0.5)), "cycle").rotation.x = Math.PI / 2;
    stages.forEach(([id, name, c], i) => { const a = (i / 4) * Math.PI * 2 + Math.PI / 4, g = new THREE.Group(); g.position.set(Math.cos(a) * ringR, 0, Math.sin(a) * ringR); const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.03, 32), mat(c, { detail: "none", clearcoat: 1, emissive: new THREE.Color(c).multiplyScalar(0.15) })); pad.position.y = 0.015; g.add(pad); const l = text(name, { size: 0.03, bg: "rgba(0,0,0,0.55)" }); l.position.y = 0.09; g.add(l); add(id, g); });
    k.flow([new THREE.CatmullRomCurve3(ringPts, true)], "#ffd9a0", 30, 0.06, "cycle", 0.014);
    // the thesis: a stack of chapters, the viva table on top
    const th = new THREE.Group(); th.position.set(0.95, 0, -0.25);
    ["Introduction", "Literature review", "Methodology", "Findings", "Discussion", "Conclusion"].forEach((ch, i) => { const b = box(0.2, 0.035, 0.15, mat(["#c79bff", "#b38bff", "#9f7bff", "#8b6bff", "#a07bff", "#c79bff"][i], { detail: "fibre", repeat: 1, bump: 0.2, clearcoat: 0.6 }), 0.006); b.position.y = 0.02 + i * 0.038; b.rotation.y = (i % 2 ? 0.06 : -0.04); th.add(b); const l = text(ch, { size: 0.018, colour: "#ffffff" }); l.position.set(0, 0.02 + i * 0.038, 0.09); th.add(l); });
    add("chapters", th);
    const viva = new THREE.Group(); viva.position.set(0.95, 0.27, -0.25);
    viva.add(box(0.16, 0.008, 0.1, mat("#5a3a2a", { detail: "fibre" }), 0.003));
    for (const [x, c] of [[-0.05, "#ffb36b"], [0.05, "#5ef0ff"], [0, "#c79bff"]]) { const p = new THREE.Mesh(new THREE.CapsuleGeometry(0.01, 0.02, 4, 8), mat(c, { detail: "none" })); p.position.set(x, 0.025, x === 0 ? 0.06 : -0.05); viva.add(p); }
    const vl = text("The viva", { size: 0.024, bg: "rgba(0,0,0,0.55)" }); vl.position.set(0, 0.08, 0); viva.add(vl);
    add("viva", viva);
    k.tick((t, dt, motion) => { if (!motion) return; gap.children[0].scale.setScalar(1 + Math.sin(t * 2) * 0.12); sem.rotation.y = rest.rotation.y = revs.rotation.y = t * 0.05; });
  },
};
