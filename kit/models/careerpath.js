// InternshipGradify's 3D model: the path to an internship. A skill tree grows from the roots of
// what you've studied (proven on Gradify) through the skills employers look for, into branches for
// each industry, with the steps of the application process as a path up to the offer.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  skills: { name: "Your skills", c: "#6bffb8" },
  applying: { name: "Applying", c: "#5ef0ff" },
  industries: { name: "Industries", c: "#ffb36b" },
};

const STRUCTURES = {
  knowledge: s("skills", "What you know", "The roots: subjects you've studied and can prove you've mastered. On Gradify, every mastered topic is evidence.",
    ["Employers care less about grades alone than about evidence you can **apply** knowledge.", "Translate coursework into outcomes: 'analysed 3 years of sales data in Excel for a group project'.", "Keep a running list of projects, results and feedback as you go."],
    [["Why isn't a grade enough on its own?", "Employers want evidence you can apply knowledge in practice."], ["How can you turn coursework into CV evidence?", "Describe what you did, the tools and the result, with numbers where possible."], ["Why keep a running record of achievements?", "So you have specific examples ready for applications and interviews."]],
    ["knowledge", "degree", "coursework", "evidence", "mastery"]),
  transferable: s("skills", "Transferable skills", "The trunk: communication, teamwork, problem solving, organisation, digital and commercial awareness.",
    ["The most-requested graduate skills consistently include communication, teamwork and problem solving.", "Commercial awareness: knowing how the business makes money, its competitors and current issues.", "Show, don't claim: every skill needs a concrete example."],
    [["Name four transferable skills employers seek.", "Communication, teamwork, problem solving, organisation (also digital skills, commercial awareness, resilience)."], ["What is commercial awareness?", "Understanding how an organisation makes money, its market, competitors and the issues affecting it."], ["How should you show a skill on an application?", "With a specific example and its result, not just a claim."]],
    ["transferable", "skills", "teamwork", "communication", "commercial awareness", "problem solving"]),
  cv: s("applying", "CV and cover letter", "A one- to two-page CV tailored to the role, and a letter answering 'why this firm, why this role, why me'.",
    ["Recruiters often skim a CV in seconds: lead with your strongest, most relevant evidence.", "Use action verbs and numbers: 'Led', 'Built', 'Increased sign-ups by 30%'.", "Many large employers use applicant tracking systems: mirror key terms from the job description honestly."],
    [["What three questions should a cover letter answer?", "Why this organisation, why this role, why you."], ["How should achievements be written on a CV?", "Action verb + what you did + measurable result."], ["What is an applicant tracking system?", "Software that screens and ranks applications, often by matching keywords."]],
    ["cv", "resume", "cover letter", "application", "ats"]),
  tests: s("applying", "Online tests", "Situational judgement tests, numerical and verbal reasoning, and game-based assessments that filter early.",
    ["Practise under timed conditions: familiarity raises scores.", "Situational judgement tests reflect the firm's values: read them first.", "Take tests when you're fresh and undisturbed."],
    [["What does a situational judgement test assess?", "How you'd respond to workplace scenarios, judged against the employer's values."], ["How can you improve reasoning test scores?", "Timed practice to build familiarity and speed."], ["Why research company values before an SJT?", "The 'best' answers reflect what the organisation values."]],
    ["psychometric", "reasoning test", "situational judgement", "online test", "numerical"]),
  interview: s("applying", "Interviews", "Competency questions ('Tell me about a time…'), strengths questions, motivation and technical questions.",
    ["Use **STAR**: Situation, Task, Action, Result. Spend most time on your Action and Result.", "Prepare 6–8 stories that can flex to different questions.", "Ask thoughtful questions at the end: about the team, the work and how success is measured."],
    [["What does STAR stand for?", "Situation, Task, Action, Result."], ["Which part of a STAR answer deserves the most time?", "Action (what you did) and Result."], ["How many stories should you prepare?", "About 6–8 flexible examples covering the key competencies."]],
    ["interview", "star", "competency", "strengths", "question"]),
  centre: s("applying", "Assessment centre", "The final stage: group exercises, case studies, presentations, in-trays and interviews, observed by assessors.",
    ["In group tasks, assessors watch how you work with others, not who talks most: involve quieter people, keep time, summarise.", "Case studies: structure your thinking, state assumptions, use the numbers, make a recommendation.", "You're assessed on each exercise separately: a bad one doesn't sink you."],
    [["What do assessors look for in group exercises?", "Collaboration, contribution, listening, structure and keeping the group on task, not dominance."], ["How should you approach a case study?", "Structure the problem, state assumptions, analyse the data, and make a clear recommendation."], ["Does one weak exercise mean failure?", "No, candidates are scored across all exercises."]],
    ["assessment centre", "group exercise", "case study", "presentation", "in-tray"]),
  offer: s("applying", "The offer", "The top of the path: an internship or placement offer, often leading to a graduate job.",
    ["Many large employers fill a large share of graduate roles from their interns.", "Ask about pay, dates, location and what conversion to a graduate role involves.", "If rejected, ask for feedback and apply the lessons."],
    [["Why are internships valuable for graduate jobs?", "Many employers recruit graduates directly from their intern pool."], ["What should you check in an offer?", "Pay, dates, location, the role and the route to a graduate offer."], ["What should you do after a rejection?", "Ask for feedback, reflect, and apply the lessons to the next application."]],
    ["offer", "internship", "placement", "graduate scheme", "conversion"]),
  finance: s("industries", "Finance and consulting", "Investment banking, accounting, consulting: early deadlines, structured schemes, strong emphasis on numeracy and commercial awareness.",
    ["Applications often open in summer and close early in the autumn for the following year: rolling recruitment rewards applying early.", "Spring weeks for first-years lead into summer internships.", "Expect case interviews in consulting and technical questions in finance."],
    [["When do finance internship applications usually open?", "Summer to early autumn, often on a rolling basis."], ["What is a spring week?", "A short insight programme for first-years, often leading to internships."], ["What kind of interview is common in consulting?", "Case interviews."]],
    ["finance", "banking", "consulting", "accounting", "spring week"]),
  tech: s("industries", "Tech and engineering", "Software, data, product and engineering roles: coding tests, technical interviews and portfolios.",
    ["A portfolio (GitHub, projects) is strong evidence.", "Technical interviews test problem solving out loud as much as correct answers.", "Product and data roles value analytical skills from any degree."],
    [["What's strong evidence for a tech internship?", "A portfolio of real projects (e.g. on GitHub)."], ["What do technical interviewers look for?", "Clear problem-solving and communication, not just the right answer."], ["Can non-computing graduates get data or product roles?", "Yes, analytical and communication skills from any degree are valued."]],
    ["tech", "software", "engineering", "data", "product", "coding", "portfolio"]),
  public: s("industries", "Public sector, charities and creative", "Civil service, NHS, charities, media and the arts: values-led recruitment and varied routes in.",
    ["The Civil Service uses **Success Profiles**: behaviours, strengths, ability, experience and technical skills.", "Charities and creative industries often value volunteering and portfolios.", "Smaller employers recruit closer to the start date."],
    [["What framework does the UK Civil Service use?", "Success Profiles."], ["What strengthens a creative or charity application?", "A portfolio and relevant volunteering or projects."], ["When do smaller employers usually recruit?", "Closer to the start date than large schemes."]],
    ["public sector", "civil service", "charity", "nhs", "creative industries", "media"]),
};

const NOTES = {
  skills: { title: "Building and proving your skills", lead: "Employers hire evidence. The aim is to turn what you've learned into specific, believable examples of what you can do.",
    sections: [
      ["Audit what you have", "- List modules, projects, jobs, volunteering, societies, sports and caring responsibilities.", "- For each, note the skills used and a result.", "- Gradify's progress shows mastered topics: use them as evidence of knowledge."],
      ["Fill the gaps", "- Societies, part-time work and volunteering build teamwork and leadership.", "- Online courses and personal projects build technical skills.", "- Insight days and virtual work experience programmes build commercial awareness."],
      ["Commercial awareness", "- Follow your industry's news (a newsletter, a podcast).", "- For each employer: what they sell, to whom, how they make money, competitors, recent news and challenges.", "> In interviews, link a current issue to the firm's business: that's commercial awareness in action."],
    ] },
  applying: { title: "The application process", lead: "Most large internships follow the same funnel: application → online tests → video or phone interview → assessment centre → offer.",
    sections: [
      ["Applications", "- Tailor each one; quality beats quantity.", "- Keep a tracker of deadlines, stages and contacts.", "- Get your CV checked by your careers service."],
      ["Interviews", "- STAR answers with specific, recent examples.", "- Motivation questions: why this sector, firm, role; research beyond the website.", "- Practise out loud, record yourself, and do mock interviews."],
      ["Assessment centres", "- Group exercise: contribute, include others, keep to time, summarise.", "- Case study: structure, assumptions, analysis, recommendation, risks.", "- Presentation: clear structure, signposting, one key message per slide."],
      ["Resilience", "- Rejections are normal: many successful applicants applied to dozens of programmes.", "- Ask for feedback and iterate, like any other skill.", "! Look after yourself: application season overlaps with exams. Plan your time and use your careers service."],
    ] },
  industries: { title: "Choosing where to apply", lead: "Different sectors recruit at different times and test different things. Match your applications to the sector's rhythm.",
    sections: [
      ["Timelines", "- Large finance, law and consulting schemes: open in summer, close by autumn or winter.", "- Tech and engineering: autumn to spring.", "- Public sector, charities, SMEs and creative: throughout the year, often nearer the start date."],
      ["What each sector values", "- Finance/consulting: numeracy, commercial awareness, structured thinking.", "- Tech: problem solving, a portfolio, learning speed.", "- Public sector/charities: values, impact, communication.", "- Creative: a portfolio and a distinct voice."],
      ["Finding opportunities", "- University careers service and job boards; company sites; LinkedIn.", "- Networking: alumni, careers fairs, informational interviews.", "- Speculative applications to smaller organisations can create roles that aren't advertised."],
    ] },
};

export default {
  title: "Your path in 3D", kicker: "3D careers",
  intro: { title: "Explore the path to an internship", text: "Your skill tree grows from what you've studied, through the skills employers want, into branches for each industry, with the application path climbing to the offer. Click anything for practical advice, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Pro tip",
  quiz: "find it",
  motion: "Progress moving",
  camera: { pos: [0.6, 1.2, 2.9], target: [0, 0.4, 0], min: 0.05, max: 5 },
  views: { Path: [[0.6, 1.2, 2.9], [0, 0.4, 0]], Tree: [[-0.2, 0.6, 1.2], [-0.35, 0.45, 0]], Steps: [[1.2, 0.8, 0.9], [0.5, 0.4, 0]], Above: [[0.05, 2.2, 0.4], [0, 0.2, 0]] },
  platform: { r: 1.1, y: -0.005 },
  labelMax: 3,
  explode: true,
  bg: ["#16302a", "#050c0a"],
  build(k) {
    const { THREE, V, mat, glow, limb, taper, box, text, add } = k;
    const bark = mat("#6bffb8", { detail: "fibre", repeat: 2, clearcoat: 0.6, emissive: new THREE.Color("#0a3a28") });
    const T = V(-0.35, 0, 0);
    // roots: what you know
    const roots = new THREE.Group();
    for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2; roots.add(taper([T.clone().add(V(0, 0.06, 0)), T.clone().add(V(Math.cos(a) * 0.12, 0.01, Math.sin(a) * 0.12)), T.clone().add(V(Math.cos(a + 0.3) * 0.28, 0.0, Math.sin(a + 0.3) * 0.28))], 0.02, 0.004, bark, 32)); }
    const rl = text("What you know", { size: 0.026, bg: "rgba(0,0,0,0.55)" }); rl.position.copy(T).add(V(0, 0.04, 0.33)); roots.add(rl);
    add("knowledge", roots);
    // trunk: transferable skills, with labelled rings
    const trunk = new THREE.Group();
    trunk.add(taper([T.clone().add(V(0, 0.05, 0)), T.clone().add(V(0.01, 0.3, 0)), T.clone().add(V(0, 0.55, 0))], 0.05, 0.03, bark, 48));
    ["Communication", "Teamwork", "Problem solving", "Organisation"].forEach((sk, i) => { const r = new THREE.Mesh(new THREE.TorusGeometry(0.052 - i * 0.004, 0.006, 10, 40), glow("#b8ffe0", 0.8)); r.rotation.x = Math.PI / 2; r.position.copy(T).add(V(0, 0.12 + i * 0.1, 0)); trunk.add(r); const l = text(sk, { size: 0.02, colour: "#d8fff0" }); l.position.copy(T).add(V(-0.13, 0.12 + i * 0.1, 0.04)); trunk.add(l); });
    add("transferable", trunk);
    // branches: industries, each ending in a canopy of glowing leaves
    const branch = (id, dir, c, name) => {
      const g = new THREE.Group(), base = T.clone().add(V(0, 0.5, 0)), end = base.clone().add(dir);
      g.add(taper([base, base.clone().lerp(end, 0.5).add(V(0, 0.06, 0)), end], 0.025, 0.012, bark, 32));
      for (let i = 0; i < 26; i++) { const lf = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 8), mat(c, { detail: "none", emissive: new THREE.Color(c).multiplyScalar(0.25), clearcoat: 1 })); lf.position.copy(end).add(V(Math.sin(i * 2.1) * 0.08, Math.cos(i * 1.7) * 0.06 + 0.03, Math.sin(i * 1.3) * 0.08)); g.add(lf); }
      const l = text(name, { size: 0.024, bg: "rgba(0,0,0,0.55)" }); l.position.copy(end).add(V(0, 0.15, 0)); g.add(l);
      add(id, g);
    };
    branch("finance", V(-0.28, 0.2, 0.05), "#ffb36b", "Finance & consulting");
    branch("tech", V(0.05, 0.32, -0.05), "#5ef0ff", "Tech & engineering");
    branch("public", V(0.25, 0.22, 0.08), "#f055dd", "Public, charity & creative");
    // the application path: stepping stones rising to the offer
    const steps = [["cv", "CV & letter"], ["tests", "Online tests"], ["interview", "Interviews"], ["centre", "Assessment centre"], ["offer", "Offer"]];
    const pathPts = [];
    steps.forEach(([id, name], i) => {
      const g = new THREE.Group(), p = V(0.05 + i * 0.17, 0.04 + i * 0.09, 0.35 - i * 0.12); g.position.copy(p); pathPts.push(p.clone().add(V(0, 0.04, 0)));
      const last = id === "offer";
      g.add(box(0.13, 0.03, 0.1, mat(last ? "#ffe066" : "#5ef0ff", { detail: "none", clearcoat: 1, roughness: 0.2, emissive: new THREE.Color(last ? "#5a4a00" : "#0a3040") }), 0.01));
      if (last) { const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.035), glow("#ffe066", 1)); star.position.y = 0.08; g.add(star); g.userData.star = star; }
      const l = text(name, { size: 0.024, bg: "rgba(0,0,0,0.55)" }); l.position.set(0, 0.05, 0.06); g.add(l);
      g.add(limb(V(0, -p.y, 0), V(0, -0.015, 0), 0.006, glow("#5ef0ff", 0.4), false));   // a pillar down to the floor
      add(id, g);
    });
    k.flow([pathPts], "#ffffff", 18, 0.18, "applying", 0.016);
    const stars = []; k.groups.applying.traverse((o) => { if (o.userData.star) stars.push(o.userData.star); });
    k.tick((t, dt, motion) => { if (motion) stars.forEach((st) => { st.rotation.y = t * 1.5; }); });
  },
};
