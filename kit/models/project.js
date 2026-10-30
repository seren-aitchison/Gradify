// ProGradify's 3D model: a project in 3D. Tasks are nodes on a network laid out along time, the
// critical path glows, the Gantt chart sits beneath it with float shown, milestones mark the way,
// and a stakeholder grid stands beside it. Notes cover planning, scheduling, people and delivery.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  network: { name: "Network & critical path", c: "#ff5a4d" },
  schedule: { name: "Schedule", c: "#5ef0ff" },
  people: { name: "People", c: "#ffb36b" },
};

const STRUCTURES = {
  tasks: s("network", "Tasks and dependencies", "Activities drawn as nodes, linked by arrows showing what must finish before what can start (an activity-on-node network).",
    ["Dependencies: finish-to-start (most common), start-to-start, finish-to-finish, start-to-finish.", "A **work breakdown structure** (WBS) breaks the project into deliverables and work packages before scheduling.", "Lags and leads adjust the gap between linked tasks."],
    [["What is a finish-to-start dependency?", "The successor can't start until the predecessor finishes."], ["What is a work breakdown structure?", "A hierarchical breakdown of the project's scope into deliverables and work packages."], ["What is an activity-on-node diagram?", "A network where tasks are nodes and arrows show dependencies."]],
    ["task", "dependency", "network diagram", "wbs", "work breakdown", "activity"]),
  criticalPath: s("network", "Critical path", "The longest path through the network: it sets the shortest possible project duration. Any delay on it delays the project.",
    ["Forward pass gives earliest start/finish; backward pass gives latest start/finish.", "Critical tasks have **zero float**.", "Crashing (adding resources) or fast-tracking (overlapping tasks) shortens the critical path, at a cost or a risk."],
    [["What is the critical path?", "The longest sequence of dependent tasks; it determines the minimum project duration."], ["How much float do critical tasks have?", "Zero."], ["Distinguish crashing from fast-tracking.", "Crashing adds resources to shorten tasks (more cost); fast-tracking runs tasks in parallel (more risk)."]],
    ["critical path", "cpm", "forward pass", "backward pass", "crashing", "fast-tracking"]),
  float: s("network", "Float (slack)", "How long a task can slip without delaying the project (total float) or the next task (free float).",
    ["Total float = latest start − earliest start (or latest finish − earliest finish).", "Float is shared along a path: using it up on one task removes it from the others.", "Near-critical paths with little float are risks too."],
    [["How is total float calculated?", "Latest start − earliest start (or LF − EF)."], ["What is free float?", "How long a task can be delayed without delaying the earliest start of any successor."], ["Why watch near-critical paths?", "They have little float and can easily become critical."]],
    ["float", "slack", "total float", "free float"]),
  gantt: s("schedule", "Gantt chart", "Bars on a timeline showing when each task runs, with dependencies, progress and the baseline.",
    ["Henry Gantt popularised it around 1910; it's the most common schedule view.", "A **baseline** freezes the approved plan so progress can be compared against it.", "Earned value: SPI = EV ÷ PV, CPI = EV ÷ AC; below 1 means behind schedule or over budget."],
    [["What is a schedule baseline?", "The approved version of the schedule, used to measure progress and variance."], ["What does an SPI of 0.8 mean?", "The project has done 80% of the work planned by now: behind schedule."], ["How is the cost performance index calculated?", "Earned value ÷ actual cost."]],
    ["gantt", "schedule", "baseline", "earned value", "spi", "cpi", "timeline"]),
  milestones: s("schedule", "Milestones", "Zero-duration points marking significant events: sign-off, delivery, go-live. Often the dates stakeholders care about.",
    ["Milestones make progress visible and are natural points for stage gates and reviews.", "PRINCE2 manages by stages, with an End Stage Assessment at each boundary.", "Missed milestones are early warnings: escalate before the tolerance is breached."],
    [["What is a milestone?", "A zero-duration marker of a significant point in the project."], ["How does PRINCE2 use stages?", "The project is managed stage by stage, with the board approving each next stage at a stage boundary."], ["Why are milestones useful for reporting?", "They give clear, binary checkpoints of progress that stakeholders understand."]],
    ["milestone", "stage gate", "prince2", "deadline", "go-live"]),
  sprint: s("schedule", "Sprints", "In agile delivery, work is done in short fixed iterations (sprints, often two weeks) that each produce a usable increment.",
    ["Scrum roles: product owner, scrum master, developers. Events: sprint planning, daily scrum, review, retrospective.", "The backlog is prioritised by value; velocity measures work completed per sprint.", "Waterfall suits fixed, well-understood scope; agile suits uncertain or changing requirements."],
    [["Name the three Scrum roles.", "Product owner, scrum master and developers."], ["What is velocity?", "The amount of work (e.g. story points) a team completes in a sprint."], ["When is agile better than waterfall?", "When requirements are uncertain or likely to change and early feedback is valuable."]],
    ["agile", "scrum", "sprint", "backlog", "kanban", "waterfall", "velocity"]),
  stakeholders: s("people", "Stakeholder map", "Everyone affected by or able to affect the project, plotted by power and interest (Mendelow's grid).",
    ["High power, high interest: **manage closely**. High power, low interest: keep satisfied. Low power, high interest: keep informed. Low both: monitor.", "Stakeholder engagement plans set who gets what information, how and when.", "The sponsor owns the business case and champions the project."],
    [["What are the four quadrants of Mendelow's grid?", "Manage closely (high power/high interest), keep satisfied (high/low), keep informed (low/high), monitor (low/low)."], ["Who owns the business case?", "The project sponsor (executive)."], ["Why map stakeholders?", "To plan engagement and spot those who could block or support the project."]],
    ["stakeholder", "mendelow", "sponsor", "engagement", "communication plan"]),
  team: s("people", "The team", "The people who do the work. Teams develop over time and need clear roles.",
    ["**Tuckman**: forming, storming, norming, performing (and adjourning).", "A **RACI** matrix sets who is Responsible, Accountable, Consulted and Informed for each task; one Accountable per task.", "Belbin team roles: e.g. plant, shaper, completer-finisher, coordinator."],
    [["List Tuckman's stages of team development.", "Forming, storming, norming, performing (and adjourning)."], ["What does RACI stand for?", "Responsible, Accountable, Consulted, Informed."], ["How many people should be Accountable for a task in a RACI?", "Exactly one."]],
    ["team", "tuckman", "raci", "belbin", "leadership", "roles"]),
  risk: s("people", "Risk register", "A list of uncertain events that could affect objectives, with probability, impact, owner and response.",
    ["Risk score = probability × impact (a heat map).", "Responses to threats: avoid, transfer, mitigate, accept. To opportunities: exploit, share, enhance, accept.", "An issue is a risk that has happened."],
    [["How are risks usually scored?", "Probability × impact."], ["Name four responses to a threat.", "Avoid, transfer, mitigate (reduce), accept."], ["What is the difference between a risk and an issue?", "A risk might happen; an issue already has."]],
    ["risk", "risk register", "mitigation", "issue", "contingency"]),
};

const NOTES = {
  network: { title: "Planning: scope, networks and the critical path", lead: "Before you can schedule, you need to know what the work is (scope) and in what order it must happen (dependencies). The critical path then tells you how long it will take at best.",
    sections: [
      ["Scope", "- Project charter or PID: objectives, scope, constraints, assumptions, business case.", "- WBS: deliverables → work packages; the 100% rule (the WBS covers all of the scope and nothing more).", "- Scope creep: uncontrolled additions; control it with change control."],
      ["Critical path method", "- Forward pass: ES of a task = the largest EF of its predecessors; EF = ES + duration.", "- Backward pass: LF = the smallest LS of successors; LS = LF − duration.", "- Float = LS − ES. Critical path = tasks with zero float.", "> Worked example: A (3 days) → B (4) and A → C (2) → D (3); both paths into E: path ABE vs ACDE. The longer one is critical."],
      ["Estimating", "- Analogous, parametric, bottom-up, three-point (PERT: (O + 4M + P)/6).", "- Contingency reserves for known risks; management reserves for unknowns.", "- Optimism bias: projects routinely underestimate time and cost (planning fallacy)."],
    ] },
  schedule: { title: "Scheduling and tracking delivery", lead: "A schedule turns the plan into dates. Tracking compares reality with the baseline so problems are seen early.",
    sections: [
      ["Gantt charts and baselines", "- Bars for tasks, diamonds for milestones, arrows for dependencies, a 'today' line.", "- Resource levelling smooths demand for people, sometimes extending the schedule."],
      ["Earned value management", "- PV (planned value), EV (earned value), AC (actual cost).", "- SV = EV − PV; CV = EV − AC; SPI = EV/PV; CPI = EV/AC.", "- Estimate at completion: EAC = BAC/CPI (if current performance continues)."],
      ["Methodologies", "- Waterfall/predictive: sequential phases, fixed scope, change control. PRINCE2 (seven principles, themes and processes).", "- Agile: Scrum, Kanban (visualise work, limit work in progress). Hybrid approaches are common.", "- PMI's PMBOK and the PMP; APM Body of Knowledge in the UK."],
    ] },
  people: { title: "People, stakeholders and risk", lead: "Projects fail more often over people than over plans: unclear roles, unmanaged stakeholders, unspoken risks.",
    sections: [
      ["Stakeholders and communication", "- Identify, analyse (power/interest, influence/impact), plan engagement, monitor.", "- Communication plan: audience, message, channel, frequency, owner.", "- Governance: project board (executive, senior user, senior supplier in PRINCE2)."],
      ["Leading the team", "- Situational leadership: direct, coach, support, delegate depending on competence and commitment.", "- Conflict modes (Thomas–Kilmann): competing, collaborating, compromising, avoiding, accommodating.", "- Psychological safety (Edmondson) predicts team learning and performance."],
      ["Risk management", "- Identify (workshops, checklists, assumptions analysis), assess (probability × impact), plan responses, monitor.", "- Risk appetite and tolerances set what the board will accept.", "! Review the register regularly: a risk register written once and filed is just paperwork."],
      ["Closing", "- Handover, acceptance, benefits realisation plan, lessons learned, release of resources.", "- Benefits are often realised after the project closes: someone must own tracking them."],
    ] },
};

export default {
  title: "A project in 3D", kicker: "3D project management",
  intro: { title: "Explore a project", text: "A project's tasks as a network in time, with the critical path glowing, the Gantt chart beneath it, milestones along the way, and the people and risks around it. Click anything for the method behind it, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "In practice",
  quiz: "find it in the plan",
  motion: "Progress moving",
  camera: { pos: [0.8, 1.3, 2.5], target: [0.05, 0.25, 0], min: 0.05, max: 5 },
  views: { Plan: [[0.8, 1.3, 2.5], [0.05, 0.25, 0]], Above: [[0.05, 2.0, 0.3], [0.05, 0, 0]], Network: [[0.1, 0.6, 1.1], [0.05, 0.38, 0]], Gantt: [[0.2, 0.35, 1.1], [0.05, 0.08, 0.15]], People: [[1.5, 0.6, 0.6], [0.95, 0.2, -0.3]] },
  platform: { r: 1.1, y: -0.005 },
  labelMax: 3,
  explode: true,
  bg: ["#2a1a18", "#0a0606"],
  build(k) {
    const { THREE, V, mat, glow, limb, tube, box, text, line, add, decor } = k;
    // tasks: [name, start, duration, row, critical]
    const T = [["Brief", 0, 2, 0, 1], ["Research", 2, 3, -1, 0], ["Design", 2, 4, 0, 1], ["Budget", 2, 2, 1, 0], ["Build", 6, 5, 0, 1], ["Content", 6, 3, -1, 0], ["Test", 11, 2, 0, 1], ["Train", 9, 2, 1, 0], ["Launch", 13, 1, 0, 1]];
    const links = [[0, 1], [0, 2], [0, 3], [2, 4], [1, 5], [3, 7], [4, 6], [5, 6], [7, 8], [6, 8]];
    const X = (d) => -0.7 + d * 0.1, nodeAt = (i) => V(X(T[i][1] + T[i][2] / 2), 0.4 + T[i][3] * 0.02, T[i][3] * -0.18);
    const nodes = new THREE.Group(), crit = new THREE.Group(), slack = new THREE.Group();
    T.forEach(([name, , , , c], i) => { const n = new THREE.Mesh(new THREE.SphereGeometry(0.04, 32, 24), mat(c ? "#ff5a4d" : "#9fb4c8", { detail: "none", clearcoat: 1, roughness: 0.2, emissive: new THREE.Color(c ? "#5a1010" : "#101820") })); n.position.copy(nodeAt(i)); nodes.add(n); const l = text(name, { size: 0.028, bg: "rgba(0,0,0,0.55)" }); l.position.copy(nodeAt(i)).add(V(0, 0.07, 0)); nodes.add(l); });
    const arrow = (a, b, m, r) => { const g = new THREE.Group(), pa = nodeAt(a), pb = nodeAt(b), dir = pb.clone().sub(pa).normalize(); g.add(limb(pa.clone().add(dir.clone().multiplyScalar(0.045)), pb.clone().sub(dir.clone().multiplyScalar(0.07)), r, m, false)); const tip = new THREE.Mesh(new THREE.ConeGeometry(r * 3, 0.03, 12), m); tip.position.copy(pb.clone().sub(dir.clone().multiplyScalar(0.055))); tip.quaternion.setFromUnitVectors(V(0, 1, 0), dir); g.add(tip); return g; };
    const critPath = [];
    links.forEach(([a, b]) => { const isCrit = T[a][4] && T[b][4]; (isCrit ? crit : nodes).add(arrow(a, b, isCrit ? mat("#ff5a4d", { detail: "none", emissive: new THREE.Color("#7a1010") }) : mat("#7f95a8", { detail: "none" }), isCrit ? 0.006 : 0.0035)); if (isCrit) critPath.push(nodeAt(a), nodeAt(b)); });
    add("tasks", nodes); add("criticalPath", crit);
    k.flow([[nodeAt(0), nodeAt(2), nodeAt(4), nodeAt(6), nodeAt(8)]], "#ffb3a8", 20, 0.12, "network", 0.016);
    // float shown as ghost extensions on non-critical tasks
    for (const [i, fl] of [[1, 1], [3, 2], [5, 2], [7, 2]]) { const p = nodeAt(i), b = box(fl * 0.1, 0.02, 0.02, glow("#9fdcff", 0.35)); b.position.set(X(T[i][1] + T[i][2]) + fl * 0.05, p.y - 0.06, p.z); slack.add(b); const l = text(`${fl} ${fl === 1 ? "day" : "days"} of float`, { size: 0.02, colour: "#bfefff" }); l.position.set(b.position.x, b.position.y - 0.03, b.position.z); slack.add(l); }
    add("float", slack);
    // Gantt chart on the floor in front
    const gantt = new THREE.Group(); gantt.position.set(0, 0, 0.35);
    T.forEach(([name, st, d, , c], i) => { const bar = box(d * 0.1 - 0.008, 0.025, 0.04, mat(c ? "#ff7a6b" : "#5ef0ff", { detail: "none", clearcoat: 1, roughness: 0.2, emissive: new THREE.Color(c ? "#3a0a08" : "#0a3040") }), 0.006); bar.position.set(X(st + d / 2), 0.02, -0.05 + i * 0.05); gantt.add(bar); const l = text(name, { size: 0.02, colour: "#d8ecf2" }); l.position.set(X(st) - 0.06, 0.03, -0.05 + i * 0.05); gantt.add(l); });
    for (let d = 0; d <= 14; d++) gantt.add(line([V(X(d), 0.002, -0.08), V(X(d), 0.002, 0.42)], "#1d5a6b", 0.4));
    const today = limb(V(X(7.5), 0, -0.1), V(X(7.5), 0.12, -0.1), 0.003, glow("#ffe066", 0.9), false); gantt.add(today); gantt.userData.today = today;
    add("gantt", gantt);
    // milestones: diamonds above the network
    const ms = new THREE.Group();
    for (const [d, name] of [[2, "Brief signed off"], [11, "Build complete"], [14, "Go-live"]]) { const dm = new THREE.Mesh(new THREE.OctahedronGeometry(0.035), mat("#5ef0ff", { detail: "none", emissive: new THREE.Color("#0a4050"), clearcoat: 1 })); dm.position.set(X(d), 0.62, 0); dm.scale.y = 1.4; ms.add(dm); ms.add(limb(V(X(d), 0.0, 0), V(X(d), 0.58, 0), 0.0015, glow("#5ef0ff", 0.4), false)); const l = text(name, { size: 0.025, bg: "rgba(0,0,0,0.55)" }); l.position.set(X(d), 0.7, 0); ms.add(l); }
    add("milestones", ms);
    // sprints: a loop of arrows on the right
    const sp = new THREE.Group(); sp.position.set(0.95, 0.12, 0.35);
    const loop = []; for (let i = 0; i <= 64; i++) { const a = (i / 64) * Math.PI * 1.85; loop.push(V(Math.cos(a) * 0.12, 0, Math.sin(a) * 0.12)); }
    sp.add(tube(loop, 0.01, mat("#5ef0ff", { detail: "none", emissive: new THREE.Color("#0a3040") }), 96)); const tip = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.05, 16), mat("#5ef0ff", { detail: "none" })); tip.position.copy(loop[64]); tip.rotation.z = Math.PI / 2; tip.rotation.y = -0.4; sp.add(tip);
    const spl = text("Sprint: plan → build → review → retro", { size: 0.022, bg: "rgba(0,0,0,0.55)" }); spl.position.set(0, 0.1, 0); sp.add(spl);
    add("sprint", sp); sp.userData.spin = true;
    // stakeholder grid: power × interest, with people as orbs
    const sg = new THREE.Group(); sg.position.set(0.95, 0, -0.35);
    const quads = [["Keep satisfied", -0.1, 0.1], ["Manage closely", 0.1, 0.1], ["Monitor", -0.1, -0.1], ["Keep informed", 0.1, -0.1]];
    for (const [q, x, z] of quads) { const tile = box(0.19, 0.01, 0.19, mat(q === "Manage closely" ? "#ff8f6b" : "#5a4a3a", { detail: "none", roughness: 0.4, transparent: true, opacity: 0.85 }), 0.01); tile.position.set(x, 0.005, z); sg.add(tile); const l = text(q, { size: 0.02, colour: "#ffe9d6" }); l.position.set(x, 0.03, z + 0.07); sg.add(l); }
    for (const [x, z, h] of [[0.15, 0.15, 0.08], [0.08, 0.04, 0.06], [-0.14, 0.12, 0.07], [0.12, -0.12, 0.05], [-0.1, -0.15, 0.04], [0.05, 0.16, 0.05]]) { const p = new THREE.Mesh(new THREE.CapsuleGeometry(0.014, h * 0.5, 6, 12), mat("#ffb36b", { detail: "none", clearcoat: 1 })); p.position.set(x, h * 0.5, z); sg.add(p); const hd = new THREE.Mesh(new THREE.SphereGeometry(0.014, 16, 12), mat("#ffd9b0", { detail: "none" })); hd.position.set(x, h + 0.02, z); sg.add(hd); }
    add("stakeholders", sg);
    // the team: a ring of people (Tuckman's stages around them)
    const tm = new THREE.Group(); tm.position.set(-0.95, 0, -0.35);
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2, p = new THREE.Mesh(new THREE.CapsuleGeometry(0.018, 0.05, 6, 12), mat(["#ff8f6b", "#ffb36b", "#ffd36b", "#6bffb8", "#5ef0ff", "#c79bff"][i], { detail: "none", clearcoat: 1 })); p.position.set(Math.cos(a) * 0.1, 0.045, Math.sin(a) * 0.1); tm.add(p); const hd = new THREE.Mesh(new THREE.SphereGeometry(0.017, 16, 12), mat("#f0c8a8", { detail: "none" })); hd.position.set(Math.cos(a) * 0.1, 0.1, Math.sin(a) * 0.1); tm.add(hd); }
    ["Forming", "Storming", "Norming", "Performing"].forEach((st, i) => { const l = text(st, { size: 0.02, colour: "#ffe9d6", bg: "rgba(0,0,0,0.5)" }); const a = (i / 4) * Math.PI * 2 + 0.4; l.position.set(Math.cos(a) * 0.2, 0.14, Math.sin(a) * 0.2); tm.add(l); });
    add("team", tm);
    // risk register: a heat map
    const rk = new THREE.Group(); rk.position.set(-0.95, 0, 0.3);
    for (let p = 0; p < 4; p++) for (let im = 0; im < 4; im++) { const sc = (p + 1) * (im + 1), c = sc >= 9 ? "#ff5a4d" : sc >= 4 ? "#ffb36b" : "#6bffb8", h = 0.01 + sc * 0.006; const cell = box(0.05, h, 0.05, mat(c, { detail: "none", clearcoat: 1, roughness: 0.3, emissive: new THREE.Color(c).multiplyScalar(0.15) }), 0.005); cell.position.set(im * 0.056 - 0.08, h / 2, -p * 0.056 + 0.08); rk.add(cell); }
    const rl = text("Probability × impact", { size: 0.022, bg: "rgba(0,0,0,0.55)" }); rl.position.set(0, 0.16, 0); rk.add(rl);
    add("risk", rk);
    k.tick((t, dt, motion) => {
      if (!motion) return;
      gantt.userData.today.position.x = X(((t * 0.6) % 14));
      sp.rotation.y = t * 0.5;
      tm.rotation.y = t * 0.15;
    });
  },
};
