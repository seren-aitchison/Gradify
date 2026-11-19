// LawGradify's 3D model: a Crown Court courtroom in England and Wales, cut away so you can see in. Who
// sits where, what each person does, and how a criminal trial runs, from the plea to the verdict.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  court: { name: "The judge and the court", c: "#9b7fd4" },
  case: { name: "Prosecution and defence", c: "#e0a24f" },
  people: { name: "Jury, witnesses and the public", c: "#5fb7a6" },
};

const STRUCTURES = {
  judge: s("court", "The judge", "Sits on the raised bench, runs the trial and decides questions of law: what evidence the jury may hear, and what the law is. The judge sums up the case for the jury and, if the defendant is convicted, passes sentence.",
    ["In the Crown Court the judge decides the **law** and the jury decides the **facts**.", "Most trials are heard by a circuit judge (\"Your Honour\"); the most serious, such as murder, may be heard by a High Court judge (\"My Lord\" or \"My Lady\").", "Circuit judges in criminal trials wear a violet robe; High Court judges wear red."],
    [["Who decides questions of law in a Crown Court trial?", "The judge."], ["How do you address a circuit judge?", "\"Your Honour.\""], ["What does the judge do after the evidence and the closing speeches?", "Sums up: directs the jury on the law and reviews the evidence."], ["Who passes sentence?", "The judge."]],
    ["judge", "bench", "circuit judge", "sentence", "summing up"]),
  arms: s("court", "Royal coat of arms", "The royal arms above the judge show that the court sits in the name of the Crown. Criminal cases are brought by the Crown, so they are named R v (the defendant).",
    ["**R** stands for Rex (the King) or Regina (the Queen): R v Smith is \"the Crown against Smith\".", "The arms are quartered: England's three lions (twice), Scotland's lion and Ireland's harp.", "The motto on the royal arms, *Dieu et mon droit*, means \"God and my right\"."],
    [["What does the R in R v Smith stand for?", "Rex or Regina: the Crown, which brings the prosecution."], ["Why is the royal coat of arms above the judge?", "The court sits in the name of the Crown."], ["What is the motto on the royal coat of arms?", "Dieu et mon droit: \"God and my right\"."]],
    ["coat of arms", "crown", "rex", "regina"]),
  clerk: s("court", "Court clerk", "Sits below the judge and keeps the court running: reads the charges (the indictment) to the defendant and takes the plea, swears in the jury, keeps the record and asks the jury for its verdict.",
    ["Reading the indictment and taking the plea is called the **arraignment**.", "The clerk asks the jury's foreman (the spokesperson) for the verdict on each count.", "An usher calls witnesses, administers the oath and looks after the jury."],
    [["What is the arraignment?", "Reading the charges to the defendant and asking for a plea."], ["Who asks the jury for its verdict?", "The court clerk."], ["Who swears in the jury?", "The court clerk."]],
    ["clerk", "arraignment", "indictment", "plea", "usher"]),
  prosecution: s("case", "Prosecution counsel", "The barrister (or CPS advocate) who presents the case against the defendant. The prosecution must prove guilt: the defendant doesn't have to prove anything.",
    ["Most prosecutions are brought by the **Crown Prosecution Service** (CPS), set up by the Prosecution of Offences Act 1985.", "The **burden of proof** is on the prosecution: the \"golden thread\" of *Woolmington v DPP* [1935].", "The **standard of proof** is that the jury must be **sure** of guilt (beyond reasonable doubt)."],
    [["Who has the burden of proof in a criminal trial?", "The prosecution."], ["What is the criminal standard of proof?", "The jury must be sure of guilt: beyond reasonable doubt."], ["Which case is the \"golden thread\" of the burden of proof?", "Woolmington v DPP [1935]."], ["Who brings most prosecutions in England and Wales?", "The Crown Prosecution Service."]],
    ["prosecution", "cps", "burden of proof", "standard of proof", "woolmington"]),
  defence: s("case", "Defence counsel", "The barrister (or solicitor-advocate) who represents the defendant: tests the prosecution evidence by cross-examination, calls defence evidence and makes the closing speech last.",
    ["A barrister is instructed by the defendant's solicitor, often paid by **legal aid**.", "After the prosecution case the defence can submit there is **no case to answer** (*R v Galbraith* [1981]).", "The defendant doesn't have to give evidence, but the jury may draw an inference from silence (Criminal Justice and Public Order Act 1994, s35)."],
    [["What is a submission of no case to answer?", "An argument at the end of the prosecution case that the evidence couldn't properly lead to a conviction (R v Galbraith)."], ["Does the defendant have to give evidence?", "No, but the jury may be allowed to draw an inference from silence."], ["Who makes the last closing speech?", "The defence."]],
    ["defence", "barrister", "galbraith", "no case to answer", "legal aid"]),
  dock: s("case", "The dock", "Where the defendant sits during the trial, usually behind glass with a dock officer. The defendant is presumed innocent until proven guilty.",
    ["The defendant enters a plea of guilty or not guilty to each count at the arraignment.", "A defendant who pleads guilty isn't tried: the judge moves to sentence, with credit for the early plea.", "Being in the dock doesn't mean being guilty: the **presumption of innocence** applies until the verdict."],
    [["Where does the defendant sit?", "In the dock."], ["What happens if the defendant pleads guilty?", "There's no trial: the judge sentences, with a reduction for the guilty plea."], ["What is the presumption of innocence?", "A defendant is treated as innocent unless and until the prosecution proves guilt."]],
    ["dock", "defendant", "accused", "presumption of innocence"]),
  jury: s("people", "The jury", "Twelve members of the public who decide the facts and reach the verdict: guilty or not guilty. They hear all the evidence and then deliberate in private.",
    ["Jurors are chosen at random from the electoral register, aged **18 to 75** (Juries Act 1974).", "The judge first asks for a **unanimous** verdict; after at least two hours the judge can accept a **majority** of 11–1 or 10–2.", "It is a criminal offence to reveal what was said in the jury room (Juries Act 1974, s20D)."],
    [["How many jurors are there in a Crown Court trial?", "Twelve."], ["What majority verdicts can a judge accept?", "11–1 or 10–2, after at least two hours of deliberation."], ["Who decides the facts and the verdict?", "The jury."], ["How old must a juror be?", "18 to 75."]],
    ["jury", "juror", "verdict", "majority verdict", "deliberation"]),
  witness: s("people", "Witness box", "Where witnesses give evidence on oath or affirmation. Each witness is questioned by the side that called them, then cross-examined by the other side.",
    ["**Examination-in-chief** (by the side that called the witness) uses open questions; **cross-examination** can use leading questions; **re-examination** clears up points.", "Vulnerable witnesses can have **special measures**: screens, a live video link, recorded evidence, or wigs and gowns removed (Youth Justice and Criminal Evidence Act 1999).", "Witnesses swear an oath on a holy book or make a non-religious **affirmation**."],
    [["What is cross-examination?", "Questioning of a witness by the opposing side, to test their evidence."], ["Name two special measures for vulnerable witnesses.", "Screens, a live link, video-recorded evidence, removing wigs and gowns."], ["What can a witness do instead of swearing a religious oath?", "Make an affirmation."]],
    ["witness", "oath", "affirmation", "cross-examination", "special measures"]),
  press: s("people", "Press bench", "Seats for reporters. Open reporting lets the public see that justice is done, but courts can restrict what is published to protect a fair trial or vulnerable people.",
    ["Complainants of sexual offences have **lifelong anonymity** (Sexual Offences (Amendment) Act 1992).", "A judge can postpone reporting to avoid prejudicing a trial (Contempt of Court Act 1981, s4(2)).", "Taking photographs in court is a criminal offence."],
    [["Why can journalists report on trials?", "Open justice: the public must be able to see that justice is done."], ["Who has automatic lifelong anonymity in reports?", "Complainants of sexual offences."], ["Why might a judge postpone reporting of part of a trial?", "To avoid a substantial risk of prejudice to the trial (Contempt of Court Act 1981, s4(2))."]],
    ["press", "reporting", "contempt of court", "anonymity"]),
  gallery: s("people", "Public gallery", "Anyone can usually come and watch: justice must be seen to be done. The gallery is separated from the court so the public can't interfere.",
    ["**Open justice** is a basic principle of English law (*Scott v Scott* [1913]).", "A court can sit in private only in rare cases, such as to protect national security.", "Members of the public must not photograph or record the trial, and can be removed if they disrupt it."],
    [["Which principle lets the public watch trials?", "Open justice (Scott v Scott [1913])."], ["Can the public be excluded from a criminal trial?", "Only rarely, for example to protect national security."], ["Why is the public gallery kept separate from the court?", "So people can watch without interfering with the trial."]],
    ["public gallery", "open justice", "scott v scott"]),
};

const NOTES = {
  court: { title: "The Crown Court", lead: "The Crown Court hears the most serious criminal cases in England and Wales: **indictable-only** offences like murder, rape and robbery, and **either-way** offences sent up from the magistrates' court. A judge sits with a jury of twelve.",
    sections: [
      ["Judge and jury", "- The **judge** decides the law: whether evidence is admissible, how the law applies, and the sentence.", "- The **jury** decides the facts: whether the prosecution has proved guilt.", "> Exam tip: in essays on juries, use this split to explain the jury's role, then weigh its advantages (public participation, independence) against its disadvantages (no reasons given, possible bias, complex cases)."],
      ["Who's who", "- **Judge**: circuit judge (\"Your Honour\") or High Court judge (\"My Lord/My Lady\").", "- **Clerk**: arraigns the defendant, swears the jury, takes the verdict.", "- **Usher**: calls witnesses, gives the oath, looks after the jury.", "- **Counsel**: barristers or solicitor-advocates for each side."],
      ["How a trial runs", "1. **Arraignment**: the indictment is read and the defendant pleads.", "2. The jury is sworn in.", "3. **Prosecution** opening speech and witnesses (examination-in-chief, cross-examination, re-examination).", "4. Possible submission of **no case to answer**.", "5. **Defence** case: the defendant and defence witnesses.", "6. Closing speeches: prosecution, then defence.", "7. The judge's **summing-up**.", "8. The jury deliberates and gives its **verdict**; if guilty, the judge **sentences**."],
    ] },
  case: { title: "Prosecution and defence", lead: "English criminal trials are **adversarial**: two sides present their cases and test each other's evidence, and the judge acts as a referee rather than investigating.",
    sections: [
      ["Burden and standard of proof", "- The prosecution must prove guilt: *Woolmington v DPP* [1935], the \"golden thread\".", "- The jury must be **sure** of guilt (beyond reasonable doubt). Anything less means not guilty."],
      ["The defendant's rights", "- Presumed innocent until proven guilty.", "- The right to legal representation, often through legal aid.", "- The right not to give evidence, though the jury may draw an inference from silence (CJPOA 1994, s35).", "- The right to a fair trial: Article 6, European Convention on Human Rights (Human Rights Act 1998)."],
      ["Pleas and sentencing", "- A **guilty** plea means no trial; earlier pleas earn a bigger reduction in sentence.", "- After conviction the judge sentences using the **Sentencing Council** guidelines, looking at culpability and harm, then aggravating and mitigating factors."],
    ] },
  people: { title: "Jury, witnesses and the public", lead: "Ordinary people are part of every Crown Court trial: twelve jurors decide the verdict, witnesses give evidence, and the public and press watch.",
    sections: [
      ["The jury", "- Twelve people, randomly chosen from the electoral register, aged 18–75 (Juries Act 1974).", "- Some people are disqualified, for example because of certain criminal convictions.", "- Verdicts should be unanimous; after at least two hours a **majority** of 11–1 or 10–2 can be accepted.", "- Deliberations are secret (Juries Act 1974, s20D)."],
      ["Witnesses", "- Give evidence on oath or affirmation; lying is perjury.", "- **Special measures** help vulnerable and intimidated witnesses (Youth Justice and Criminal Evidence Act 1999)."],
      ["Open justice", "- Trials are public (*Scott v Scott* [1913]) and can be reported.", "- Reporting restrictions protect fair trials and vulnerable people."],
    ] },
};

export default {
  title: "A Crown Court in 3D", kicker: "3D law",
  intro: { title: "Step inside a Crown Court", text: "A courtroom in England and Wales during a criminal trial. Click the judge, the jury, the dock or the witness box to learn who does what, and read how a trial runs from the plea to the verdict." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Exam tip",
  quiz: "find the person",
  motion: "Trial in progress",
  trueColour: true,
  camera: { pos: [1.45, 1.55, 2.25], target: [0, 0.05, -0.05], min: 0.3, max: 4.5 },
  views: { "From the back": [[1.45, 1.55, 2.25], [0, 0.05, -0.05]], "Judge's view": [[0, 0.42, -0.62], [0, 0.1, 0.4]], "From the jury": [[-0.75, 0.3, 0.15], [0.2, 0.1, -0.2]], "From above": [[0.02, 2.5, 0.1], [0, 0, 0]] },
  platform: { r: 0.55 },
  shadow: { left: -1.5, right: 1.5, top: 1.4, bottom: -1.4, near: 0.5, far: 9 },
  explode: false,
  build(k) {
    const { THREE, V, mat, add, decor, box } = k;
    const at = (o, x, y, z, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; return o; };
    const oak = mat("#8a6038", { detail: "fibre", repeat: 2, bump: 0.35, roughness: 0.55, clearcoat: 0.35 });
    const lightOak = mat("#b88a58", { detail: "fibre", repeat: 2, bump: 0.35, roughness: 0.55, clearcoat: 0.35 });
    const carpet = mat("#3c4a63", { detail: "tissue", repeat: 8, bump: 0.25, roughness: 1, clearcoat: 0 });
    const wall = mat("#e7e1d4", { detail: "none", roughness: 0.9, clearcoat: 0 });
    const leather = (c) => mat(c, { detail: "tissue", repeat: 2, bump: 0.2, roughness: 0.5, clearcoat: 0.3 });
    const cloth = (c) => mat(c, { detail: "fibre", repeat: 3, bump: 0.2, roughness: 0.9, clearcoat: 0 });
    const glass = mat("#d9eef2", { detail: "none", transparent: true, opacity: 0.22, roughness: 0.05, clearcoat: 1, depthWrite: false });
    const skins = ["#e8c3a0", "#c99a74", "#8d5a3b", "#f0d0b4", "#b07850", "#5c3a24"];
    const paper = mat("#f5f2ea", { detail: "none", roughness: 0.9, clearcoat: 0 });

    // a person: seated or standing, in a colour of clothes, optionally with a barrister's or judge's wig
    let si = 0;
    const person = (c, { seated = true, wig = false, skin = skins[si++ % skins.length], robe = false } = {}) => {
      const g = new THREE.Group(), h = seated ? 0.07 : 0.11;
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(robe ? 0.026 : 0.022, h - 0.03, 6, 16), cloth(c)); g.add(at(body, 0, (seated ? 0.05 : 0.0) + h / 2 + 0.01, 0));
      if (robe) { const bands = box(0.012, 0.016, 0.004, paper); g.add(at(bands, 0, (seated ? 0.05 : 0) + h - 0.004, 0.026)); }
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.017, 24, 16), mat(skin, { detail: "none", roughness: 0.6, clearcoat: 0.1 })); head.name = "head"; g.add(at(head, 0, (seated ? 0.05 : 0) + h + 0.03, 0));
      if (wig) { const w = new THREE.Mesh(new THREE.SphereGeometry(0.019, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), mat("#d8d4c8", { detail: "fibre", repeat: 1, bump: 0.6, roughness: 1, clearcoat: 0 })); head.add(at(w, 0, 0.003, -0.002)); }
      g.userData.head = head;
      return g;
    };
    const chair = (c, high = false) => { const g = new THREE.Group(); g.add(at(box(0.05, 0.008, 0.05, leather(c)), 0, 0.045, 0)); g.add(at(box(0.05, high ? 0.12 : 0.06, 0.008, leather(c)), 0, high ? 0.105 : 0.075, -0.024)); for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) g.add(at(box(0.005, 0.045, 0.005, oak), x * 0.02, 0.0225, z * 0.02)); return g; };
    // a desk whose front panel faces -z (towards the judge); turn it to face elsewhere
    const desk = (w, d, h = 0.075, m = oak) => { const g = new THREE.Group(); g.add(at(box(w, 0.008, d, m), 0, h, 0)); g.add(at(box(w, h, 0.008, m), 0, h / 2, -d / 2 + 0.004)); return g; };

    // the room: carpet, panelled back wall, low side walls so you can see in
    decor(at(box(2.0, 0.02, 1.7, carpet), 0, -0.01, 0));
    decor(at(box(2.0, 0.7, 0.03, wall), 0, 0.35, -0.865));
    decor(at(box(2.0, 0.3, 0.035, oak), 0, 0.15, -0.85));
    for (const x of [-0.95, -0.55, -0.15, 0.15, 0.55, 0.95]) decor(at(box(0.02, 0.3, 0.04, lightOak), x, 0.15, -0.845));
    decor(at(box(0.03, 0.22, 1.7, oak), -1.0, 0.11, 0)); decor(at(box(0.03, 0.22, 1.7, oak), 1.0, 0.11, 0));

    // the judge's bench, raised at the back
    const judge = new THREE.Group();
    judge.add(at(box(0.95, 0.13, 0.3, oak), 0, 0.065, -0.7));
    const front = desk(0.95, 0.06, 0.09, lightOak); judge.add(at(front, 0, 0.13, -0.6, Math.PI));   // faces the room
    const jc = chair("#2c5a3a", true); judge.add(at(jc, 0, 0.13, -0.72));
    const j = person("#5d3f8f", { wig: true, robe: true, skin: skins[0] }); judge.add(at(j, 0, 0.13, -0.71));
    const sash = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.004, 6, 20, Math.PI), cloth("#b3262b")); sash.rotation.set(0, 0, Math.PI); judge.add(at(sash, 0, 0.27, -0.69));
    judge.add(at(box(0.08, 0.004, 0.05, paper), 0.12, 0.225, -0.6));
    add("judge", judge);

    // the royal arms on a canvas: England (1st and 4th), Scotland (2nd), Ireland (3rd)
    const cv = document.createElement("canvas"); cv.width = cv.height = 256; const g2 = cv.getContext("2d");
    g2.fillStyle = "#c8a24a"; g2.beginPath(); g2.arc(128, 128, 126, 0, Math.PI * 2); g2.fill();
    g2.save(); g2.beginPath(); g2.moveTo(48, 40); g2.lineTo(208, 40); g2.lineTo(208, 140); g2.quadraticCurveTo(208, 210, 128, 236); g2.quadraticCurveTo(48, 210, 48, 140); g2.closePath(); g2.clip();
    const q = [["#b3262b", 48, 40], ["#e7c34a", 128, 40], ["#1f4fa0", 48, 138], ["#b3262b", 128, 138]];
    for (const [c, x, y] of q) { g2.fillStyle = c; g2.fillRect(x, y, 80, 98); }
    g2.fillStyle = "#e7c34a"; for (const [x, y] of [[88, 89], [168, 187]]) for (let i = -1; i <= 1; i++) { g2.beginPath(); g2.ellipse(x, y + i * 26, 22, 7, 0, 0, Math.PI * 2); g2.fill(); }
    g2.fillStyle = "#b3262b"; g2.beginPath(); g2.ellipse(168, 89, 16, 26, 0, 0, Math.PI * 2); g2.fill();
    g2.strokeStyle = "#e7c34a"; g2.lineWidth = 6; g2.beginPath(); g2.arc(88, 187, 22, Math.PI * 0.9, Math.PI * 2.1); g2.stroke(); for (let i = 0; i < 4; i++) { g2.beginPath(); g2.moveTo(72 + i * 10, 182); g2.lineTo(72 + i * 10, 205); g2.stroke(); }
    g2.restore();
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    const arms = new THREE.Mesh(new THREE.CircleGeometry(0.11, 48), mat("#ffffff", { detail: "none", map: tex, roughness: 0.45, clearcoat: 0.6, metalness: 0.1 }));
    add("arms", at(arms, 0, 0.5, -0.848));

    // the clerk's desk, below the bench and facing the room
    const clerk = new THREE.Group();
    clerk.add(at(desk(0.42, 0.12), 0, 0, -0.42, Math.PI));
    clerk.add(at(chair("#2c5a3a"), 0, 0, -0.5)); clerk.add(at(person("#1d1d22", { robe: true }), 0, 0, -0.49));
    clerk.add(at(box(0.1, 0.03, 0.07, oak), 0.13, 0.093, -0.42));
    add("clerk", clerk);

    // counsel's row: a long desk facing the judge, prosecution on the left, defence on the right
    const row = new THREE.Group(); row.add(at(desk(1.0, 0.12), 0, 0, 0.0)); decor(row, "case");
    for (const x of [-0.42, -0.05, 0.05, 0.42]) decor(at(box(0.07, 0.004, 0.05, paper), x, 0.08, -0.02), "case");
    const pros = new THREE.Group(), def = new THREE.Group();
    pros.add(at(chair("#3b3b40"), -0.28, 0, 0.1, Math.PI)); pros.add(at(person("#141418", { wig: true, robe: true }), -0.28, 0, 0.09, Math.PI));
    pros.add(at(box(0.05, 0.03, 0.035, mat("#7a1f2a", { detail: "none", roughness: 0.6, clearcoat: 0.2 })), -0.36, 0.095, -0.02));
    def.add(at(chair("#3b3b40"), 0.28, 0, 0.1, Math.PI)); def.add(at(person("#141418", { wig: true, robe: true }), 0.28, 0, 0.09, Math.PI));
    def.add(at(box(0.05, 0.03, 0.035, mat("#1f3a7a", { detail: "none", roughness: 0.6, clearcoat: 0.2 })), 0.36, 0.095, -0.02));
    add("prosecution", pros); add("defence", def);
    // solicitors behind counsel
    const sol = new THREE.Group(); sol.add(at(desk(0.9, 0.1, 0.07), 0, 0, 0.24));
    for (const [x, c] of [[-0.3, "#2f3a4f"], [0.3, "#4a3a30"]]) { sol.add(at(chair("#3b3b40"), x, 0, 0.34, Math.PI)); sol.add(at(person(c), x, 0, 0.33, Math.PI)); }
    decor(sol, "case");

    // the dock at the back, glass-walled, facing the judge
    const dock = new THREE.Group(), DX = 0.15, DZ = 0.62;
    dock.add(at(box(0.5, 0.06, 0.22, oak), DX, 0.03, DZ));
    for (const [w, d, x, z] of [[0.5, 0.004, 0, -0.11], [0.004, 0.22, -0.25, 0], [0.004, 0.22, 0.25, 0]]) dock.add(at(box(w, 0.2, d, glass), DX + x, 0.16, DZ + z));
    dock.add(at(box(0.5, 0.008, 0.008, oak), DX, 0.26, DZ - 0.11));
    dock.add(at(chair("#3b3b40"), DX - 0.06, 0.06, DZ + 0.02, Math.PI)); const defendant = person("#6b7a8a"); dock.add(at(defendant, DX - 0.06, 0.06, DZ + 0.01, Math.PI));
    dock.add(at(chair("#3b3b40"), DX + 0.12, 0.06, DZ + 0.03, Math.PI)); dock.add(at(person("#f2f2ee"), DX + 0.12, 0.06, DZ + 0.02, Math.PI));   // the dock officer
    add("dock", dock);

    // the witness box, raised, to the judge's right as you face the bench
    const wit = new THREE.Group(), WX = -0.62, WZ = -0.48;
    wit.add(at(box(0.16, 0.05, 0.16, oak), WX, 0.025, WZ));
    for (const [w, d, x, z] of [[0.16, 0.01, 0, 0.075], [0.01, 0.16, -0.075, 0], [0.01, 0.16, 0.075, 0]]) wit.add(at(box(w, 0.08, d, lightOak), WX + x, 0.09, WZ + z));
    const witness = person("#7a3b5a", { seated: false }); wit.add(at(witness, WX, 0.05, WZ - 0.01, 0.6));
    add("witness", wit);

    // the jury box along the left wall: two tiers of six, facing across the court
    const jury = new THREE.Group(), jurors = [];
    const clothes = ["#3a5a8a", "#8a3a3a", "#3a7a5a", "#7a6a3a", "#5a3a7a", "#2a2a2a", "#9a6a4a", "#4a6a7a", "#6a2a4a", "#3a4a3a", "#8a8a8a", "#2a4a6a"];
    for (let tier = 0; tier < 2; tier++) {
      const x = -0.86 + tier * 0.11, y = tier ? 0 : 0.05;
      jury.add(at(box(0.11, 0.05 + y, 0.66, oak), x, (0.05 + y) / 2, 0.08));
      jury.add(at(box(0.01, 0.06, 0.66, lightOak), x + 0.055, 0.05 + y + 0.03, 0.08));
      for (let i = 0; i < 6; i++) {
        const z = -0.17 + i * 0.1, c = clothes[tier * 6 + i];
        jury.add(at(chair("#2c5a3a"), x - 0.01, 0.05 + y, z, Math.PI / 2)); const p = person(c); jury.add(at(p, x - 0.01, 0.05 + y, z, Math.PI / 2)); jurors.push(p);
      }
    }
    add("jury", jury);

    // the press bench, on the right
    const press = new THREE.Group(); press.add(at(desk(0.12, 0.42), 0.78, 0, -0.25, Math.PI / 2));
    for (const z of [-0.37, -0.25, -0.13]) { press.add(at(chair("#3b3b40"), 0.86, 0, z, -Math.PI / 2)); press.add(at(person(clothes[(z * 100 + 40) & 7]), 0.86, 0, z, -Math.PI / 2)); press.add(at(box(0.04, 0.003, 0.05, paper), 0.76, 0.08, z)); }
    add("press", press);

    // the public gallery: raised seating at the back right, behind a glass screen
    const gal = new THREE.Group();
    for (let r = 0; r < 3; r++) {
      const z = 0.5 + r * 0.11, y = 0.06 + r * 0.05;
      gal.add(at(box(0.5, y, 0.11, oak), 0.7, y / 2, z));
      for (let i = 0; i < 4; i++) if ((i + r) % 3 !== 1) { const x = 0.52 + i * 0.12; gal.add(at(person(clothes[(r * 4 + i) % 12]), x, y - 0.05, z, Math.PI)); }
    }
    gal.add(at(box(0.5, 0.18, 0.004, glass), 0.7, 0.15, 0.44));
    add("gallery", gal);

    // trial in progress: the jury looks from the witness to counsel and back; the witness turns to answer
    const look = new THREE.Vector3(), tmp = new THREE.Vector3();
    k.tick((t, dt, motion) => {
      if (!motion) return;
      const toWitness = Math.sin(t * 0.5) > -0.2;
      look.set(toWitness ? WX : -0.28, 0.15, toWitness ? WZ : 0.1);
      for (const p of jurors) { p.getWorldPosition(tmp); const a = Math.atan2(look.x - tmp.x, look.z - tmp.z) - p.rotation.y - (p.parent?.rotation.y || 0); const h = p.userData.head; h.rotation.y += (Math.max(-1.1, Math.min(1.1, a)) - h.rotation.y) * Math.min(1, dt * 2); }
      witness.rotation.y = 0.6 + Math.sin(t * 0.5) * 0.25;
      j.userData.head.rotation.x = 0.15 + Math.sin(t * 0.7) * 0.05;   // the judge glances down at the notes
    });
  },
};
