// LawGradify's 3D model: a Crown Court in session, beside a tower of the court hierarchy. Every
// participant in a criminal trial is in their place. Notes cover the courts and precedent, the
// adversarial trial, juries and evidence, and the defendant's rights and sentencing.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  bench: { name: "Judges & courts", c: "#ff5a4d" },
  advocates: { name: "Advocates", c: "#7ee0ff" },
  jury: { name: "Jury & witnesses", c: "#ffe066" },
  defendant: { name: "Defendant & public", c: "#c79bff" },
};

const STRUCTURES = {
  judge: s("bench", "The judge", "In the Crown Court, a circuit judge (or High Court judge for the most serious cases) decides questions of law, controls the trial, sums up to the jury and passes sentence.",
    ["The judge decides **law**; the jury decides **facts**.", "The judge can direct an acquittal if there's no case to answer (R v Galbraith), but can never direct a jury to convict.", "Judicial independence: security of tenure (removable only by both Houses for senior judges), salaries protected, immunity from suit."],
    [["In a Crown Court trial, who decides questions of law and who decides the facts?", "The judge decides law; the jury decides facts."], ["What is the test in R v Galbraith?", "The judge may stop the case if there's no evidence, or the evidence is so weak no properly directed jury could convict."], ["Name two guarantees of judicial independence.", "Security of tenure and protected salaries (also immunity from suit, appointment by the independent JAC)."]],
    ["judge", "judiciary", "judicial independence", "summing up", "crown court"]),
  hierarchy: s("bench", "Court hierarchy", "Supreme Court → Court of Appeal → High Court → Crown Court and County Court → Magistrates' Court. Precedent flows down the hierarchy.",
    ["**Stare decisis**: courts must follow the decisions of courts above them.", "The Supreme Court can depart from its own decisions when it appears right to do so (1966 Practice Statement).", "The Court of Appeal is bound by its own past decisions except in the Young v Bristol Aeroplane exceptions."],
    [["What does stare decisis mean?", "'Stand by what has been decided': lower courts follow the precedents of higher courts."], ["What did the 1966 Practice Statement allow?", "The House of Lords (now Supreme Court) to depart from its own previous decisions when it appears right to do so."], ["Name the three exceptions in Young v Bristol Aeroplane.", "Conflicting Court of Appeal decisions; a decision inconsistent with a later House of Lords/Supreme Court decision; a decision made per incuriam."]],
    ["precedent", "stare decisis", "hierarchy", "supreme court", "court of appeal", "ratio", "obiter"]),
  clerk: s("bench", "Court clerk", "Sits below the judge: swears in the jury and witnesses, reads the indictment, takes the plea and the verdict, and keeps the court record.",
    ["The defendant is **arraigned**: the indictment is read and they plead guilty or not guilty.", "In magistrates' courts, the legal adviser (justices' clerk) advises lay magistrates on law and procedure.", "Lay magistrates are unpaid, untrained in law, and sit in benches of two or three."],
    [["What happens at arraignment?", "The indictment is read to the defendant, who enters a plea."], ["Who advises lay magistrates on the law?", "The legal adviser (justices' clerk)."], ["How many lay magistrates usually sit together?", "Two or three."]],
    ["clerk", "arraignment", "indictment", "plea", "magistrate", "legal adviser"]),
  prosecution: s("advocates", "Prosecution counsel", "Presents the case against the defendant for the Crown (usually instructed by the Crown Prosecution Service).",
    ["The prosecution bears the **burden of proof**, to the criminal standard: **beyond reasonable doubt** (so the jury are sure) — Woolmington v DPP (1935).", "The CPS applies the Full Code Test: is there enough evidence for a realistic prospect of conviction, and is prosecution in the public interest?", "The prosecution must disclose unused material that might undermine its case or help the defence."],
    [["Which case established that the prosecution must prove guilt?", "Woolmington v DPP (1935): the 'golden thread'."], ["What are the two stages of the CPS Full Code Test?", "The evidential stage (realistic prospect of conviction) and the public interest stage."], ["What is the criminal standard of proof?", "Beyond reasonable doubt: the jury must be sure of guilt."]],
    ["prosecution", "cps", "burden of proof", "beyond reasonable doubt", "woolmington", "crown prosecution"]),
  defence: s("advocates", "Defence counsel", "Represents the defendant: tests the prosecution's evidence, presents the defence case and argues mitigation if there's a conviction.",
    ["In the adversarial system, each side presents its case and a neutral judge and jury decide; inquisitorial systems have the judge investigate.", "Barristers' 'cab-rank rule': they must accept any case in their field if available, whatever their views.", "A submission of no case to answer is made at the close of the prosecution case."],
    [["What is the cab-rank rule?", "A barrister must accept instructions in their area of practice if available, regardless of the client or case."], ["How does the adversarial system differ from the inquisitorial?", "Adversarial: two sides present cases to a neutral judge. Inquisitorial: the judge leads the investigation."], ["When is a submission of no case to answer made?", "At the end of the prosecution case."]],
    ["defence", "barrister", "solicitor", "adversarial", "cab-rank", "mitigation", "legal aid"]),
  jury: s("jury", "The jury", "Twelve people aged 18–75, chosen at random from the electoral register, who decide guilt in Crown Court trials of indictable offences.",
    ["Verdicts should be unanimous; after at least 2 hours 10 minutes the judge can accept a **majority of 11–1 or 10–2** (Juries Act 1974).", "Jury deliberations are secret (Contempt of Court Act 1981 s.8; Criminal Justice and Courts Act 2015).", "R v Young (1995): a conviction was quashed because jurors used a Ouija board."],
    [["What majority verdicts can a jury reach?", "11–1 or 10–2 (or 10–1, 9–1 if numbers fall), after at least 2 hours 10 minutes."], ["Who is eligible for jury service?", "18–75, on the electoral register, UK resident for 5 years since age 13, not disqualified or mentally disordered."], ["What happened in R v Young (1995)?", "Jurors used a Ouija board in a hotel; the conviction was quashed and a retrial ordered."]],
    ["jury", "juror", "verdict", "majority verdict", "juries act", "deliberation"]),
  witness: s("jury", "Witness box", "Where witnesses give evidence on oath or affirmation: examination-in-chief by the side that called them, then cross-examination, then re-examination.",
    ["Leading questions (suggesting the answer) are not allowed in examination-in-chief but are in cross-examination.", "Special measures for vulnerable witnesses: screens, live link, video-recorded evidence (Youth Justice and Criminal Evidence Act 1999).", "Hearsay is generally inadmissible unless an exception applies (Criminal Justice Act 2003)."],
    [["In which part of a witness's evidence are leading questions allowed?", "Cross-examination."], ["Name two special measures for vulnerable witnesses.", "Screens, live TV link, video-recorded evidence-in-chief, removal of wigs and gowns, intermediaries."], ["What is hearsay?", "A statement made out of court, offered as evidence of the truth of what it says."]],
    ["witness", "evidence", "cross-examination", "hearsay", "oath", "special measures"]),
  dock: s("defendant", "The dock", "Where the defendant sits during the trial, usually behind glass with a dock officer.",
    ["The **presumption of innocence** (Article 6 ECHR): the defendant is innocent until proven guilty.", "The right to silence, with possible adverse inferences (Criminal Justice and Public Order Act 1994 ss.34–37).", "Bail Act 1976: a general right to bail, unless there are substantial grounds to believe they'd abscond, offend or interfere with witnesses."],
    [["What does Article 6 ECHR protect?", "The right to a fair trial, including the presumption of innocence."], ["When can a court refuse bail?", "If there are substantial grounds to believe the defendant would fail to surrender, commit further offences or interfere with witnesses."], ["Can a jury draw inferences from a defendant's silence?", "Yes, in some circumstances, under ss.34–37 Criminal Justice and Public Order Act 1994."]],
    ["defendant", "dock", "accused", "bail", "presumption of innocence", "right to silence", "article 6"]),
  gallery: s("defendant", "Public gallery", "Justice is administered in public: anyone can watch most trials. The press report them, within reporting restrictions.",
    ["**Open justice**: 'Justice should not only be done, but should manifestly and undoubtedly be seen to be done' (R v Sussex Justices, ex p McCarthy, 1924).", "Sentencing aims (Sentencing Act 2020 s.57): punishment, crime reduction, reform and rehabilitation, public protection, reparation.", "Sentences follow Sentencing Council guidelines: offence category by culpability and harm, then aggravating and mitigating factors, then credit for a guilty plea (up to one-third)."],
    [["Which case gave the principle that justice must be seen to be done?", "R v Sussex Justices, ex parte McCarthy (1924)."], ["List the five statutory aims of sentencing for adults.", "Punishment, reduction of crime, reform and rehabilitation, protection of the public, reparation."], ["What is the maximum reduction for an early guilty plea?", "One-third."]],
    ["open justice", "public", "sentencing", "sentence", "aims of sentencing", "guilty plea"]),
};

const NOTES = {
  bench: { title: "Judges, the courts and precedent", lead: "The English legal system is built on a hierarchy of courts and the doctrine of judicial precedent. Knowing which court binds which, and how judges avoid precedents, is essential for every area of law.",
    sections: [
      ["The criminal courts", "- Offences are summary (magistrates only), either way (magistrates or Crown Court) or indictable only (Crown Court).", "- Either-way: plea before venue, then allocation; the defendant can elect jury trial.", "- Appeals: from magistrates to the Crown Court (rehearing) or by case stated to the High Court; from the Crown Court to the Court of Appeal (Criminal Division) if the conviction is 'unsafe'."],
      ["The civil courts", "- County Court: small claims (up to £10,000), fast track (to £25,000), intermediate and multi-track.", "- High Court: King's Bench, Chancery and Family Divisions.", "- Civil standard of proof: on the balance of probabilities."],
      ["Judicial precedent", "- The **ratio decidendi** binds; **obiter dicta** are persuasive.", "- Avoiding precedent: distinguishing (material facts differ), overruling (a higher court in a later case), reversing (the same case on appeal), Practice Statement.", "- Persuasive precedent: Privy Council (e.g. the Wagon Mound), other jurisdictions, dissenting judgments, obiter.", "> Example: R v R (1991) removed the marital rape exemption, showing how judges develop the law."],
      ["Statutory interpretation", "- Literal rule (Whiteley v Chappell), golden rule (Adler v George), mischief rule (Smith v Hughes), purposive approach (Pepper v Hart allows Hansard).", "- Aids: intrinsic (long title, definitions) and extrinsic (dictionaries, Hansard, Law Commission reports)."],
    ] },
  advocates: { title: "The adversarial trial", lead: "Two sides, each represented, test each other's evidence before a neutral tribunal. The prosecution must prove its case; the defendant need prove nothing.",
    sections: [
      ["Order of a Crown Court trial", "1. Arraignment and plea. 2. Jury sworn. 3. Prosecution opening speech. 4. Prosecution witnesses (chief, cross, re-examination). 5. Possible submission of no case to answer. 6. Defence case. 7. Closing speeches (prosecution then defence). 8. Judge's summing-up. 9. Verdict. 10. Sentence."],
      ["Legal professions", "- Solicitors: client contact, litigation, can gain higher rights of audience. Qualify via the SQE (SQE1, SQE2, two years' qualifying work experience).", "- Barristers: advocacy and specialist advice; Bar course, pupillage. King's Counsel for senior barristers.", "- Regulators: SRA (solicitors), BSB (barristers)."],
      ["Criminal liability basics", "- Actus reus (the guilty act, including omissions where there's a duty: R v Pittwood, R v Stone and Dobinson) and mens rea (intention: R v Woollin; recklessness: R v Cunningham, R v G).", "- Causation: factual (but for: R v White) and legal (operating and substantial cause; novus actus interveniens).", "- Strict liability offences need no mens rea for at least one element (Callow v Tillstone)."],
      ["Funding", "- Criminal legal aid: interests of justice test and means test.", "- Duty solicitor schemes at police stations (free advice, PACE s.58)."],
    ] },
  jury: { title: "Juries and the law of evidence", lead: "Lay people deciding guilt is one of the oldest features of English law. The rules of evidence control what they may hear.",
    sections: [
      ["Jury selection", "- Summoned at random from the electoral register; disqualified if on bail or with certain convictions; may be deferred or excused.", "- Challenges: for cause; the prosecution can ask jurors to 'stand by'.", "- Vetting: police checks in some cases; authorised checks in national security cases."],
      ["Advantages and criticisms", "- For: public confidence, random and representative, jury equity (Ponting, 1985), secrecy protects from pressure.", "- Against: no reasons given, perverse verdicts, media and internet influence (R v Karakaya, Attorney General v Dallas), cost, difficulty with complex fraud.", "- Juries Act 1974 s.20A now makes juror research and disclosure offences."],
      ["Evidence", "- Relevance and admissibility; the judge can exclude unfair evidence (PACE s.78) and confessions obtained by oppression (PACE s.76).", "- Bad character evidence: admissible through the gateways in Criminal Justice Act 2003 s.101.", "- Identification evidence: Turnbull warning about mistaken identification."],
    ] },
  defendant: { title: "The defendant's rights and sentencing", lead: "Due process protects the accused from arrest to verdict; sentencing then balances punishment, protection and rehabilitation.",
    sections: [
      ["Police powers (PACE 1984)", "- Stop and search (s.1) on reasonable suspicion; Code A.", "- Arrest (s.24): reasonable grounds to suspect an offence, and necessity (e.g. to prevent harm, ascertain name).", "- Detention: normally up to 24 hours, extendable to 36 by a superintendent and 96 by magistrates (indictable offences).", "- Rights: to have someone informed (s.56), to free legal advice (s.58); interviews recorded."],
      ["Bail and remand", "- Police bail and court bail; conditions (residence, reporting, curfew, sureties).", "- Custody time limits before trial.", "> The presumption of bail reflects the presumption of innocence."],
      ["Sentencing", "- Adult sentences: custodial (immediate or suspended), community orders, fines, discharges.", "- Youth: referral orders, youth rehabilitation orders, detention and training orders.", "- Minimum terms for murder (Schedule 21), mandatory minimums for some repeat offences."],
      ["Miscarriages of justice", "- The Criminal Cases Review Commission (since 1997) refers possibly unsafe convictions back to the Court of Appeal.", "- Examples: the Birmingham Six, the Guildford Four, Sally Clark (expert statistical evidence), the Post Office Horizon cases."],
    ] },
};

export default {
  title: "The courtroom in 3D", kicker: "3D law",
  intro: { title: "Explore a Crown Court", text: "A criminal trial in session, with every participant in their place, beside a tower of the court hierarchy. Click anyone for their role and the law behind it, and read the full notes for each part below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Key case",
  quiz: "find the person or place",
  motion: "People moving",
  camera: { pos: [1.3, 1.25, 1.75], target: [0, 0.15, 0], min: 0.05, max: 5 },
  views: { Court: [[1.3, 1.25, 1.75], [0, 0.15, 0]], "From the bench": [[0, 0.55, -0.55], [0, 0.15, 0.4]], "From the dock": [[0, 0.45, 0.8], [0, 0.2, -0.3]], Jury: [[0.4, 0.45, 0.25], [-0.6, 0.15, -0.05]], Hierarchy: [[1.6, 0.6, -0.2], [1.05, 0.35, -0.4]] },
  platform: { r: 1.2, y: -0.005 },
  labelMax: 2,
  explode: false,
  bg: ["#2a1e14", "#0c0806"],
  build(k) {
    const { THREE, V, mat, glow, limb, blob, box, text, add, decor } = k;
    const wood = mat("#6b4428", { detail: "fibre", repeat: 2, bump: 0.5, roughness: 0.45, clearcoat: 0.6 });
    const darkWood = mat("#4a2c18", { detail: "fibre", repeat: 2, bump: 0.5, roughness: 0.45, clearcoat: 0.6 });
    const green = mat("#2f5a3a", { detail: "tissue", repeat: 6, roughness: 0.9, clearcoat: 0 });
    const people = [];
    const person = (robe, opts = {}) => {
      const g = new THREE.Group(), skin = mat(opts.skin || "#e0b090", { detail: "none", roughness: 0.6 });
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 0.07, 8, 16), mat(robe, { detail: "fibre", repeat: 1, bump: 0.3, roughness: 0.7 })); body.position.y = opts.sit ? 0.07 : 0.09; g.add(body);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.026, 24, 16), skin); head.position.y = opts.sit ? 0.15 : 0.17; g.add(head);
      if (opts.wig) { const w = new THREE.Mesh(new THREE.SphereGeometry(0.029, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), mat("#efe9dc", { detail: "fold", repeat: 4, bump: 1.5, roughness: 0.9 })); w.position.copy(head.position).add(V(0, 0.003, -0.002)); g.add(w); if (opts.wig === "long") { const lap = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.04, 6, 12), w.material); lap.position.copy(head.position).add(V(0, -0.035, -0.008)); g.add(lap); } }
      if (opts.bands) { const bnd = box(0.012, 0.02, 0.004, mat("#ffffff", { detail: "none" })); bnd.position.set(0, (opts.sit ? 0.12 : 0.14), 0.034); g.add(bnd); }
      people.push(g); return g;
    };
    // the room
    const floor = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.02, 1.5), mat("#3a2616", { detail: "fibre", repeat: 6, bump: 0.4, roughness: 0.5, clearcoat: 0.5 })); floor.position.y = -0.01; decor(floor);
    const wall = box(1.6, 0.5, 0.03, darkWood); wall.position.set(0, 0.25, -0.75); decor(wall);
    for (const sd of [-1, 1]) { const sw = box(0.03, 0.3, 1.5, darkWood); sw.position.set(sd * 0.8, 0.15, 0); decor(sw); }
    // the bench: a raised dais with the judge, the royal arms behind
    const bench = new THREE.Group(); bench.position.set(0, 0, -0.58);
    const dais = box(0.9, 0.14, 0.25, wood, 0.01); dais.position.y = 0.07; bench.add(dais);
    const desk = box(0.9, 0.08, 0.04, darkWood, 0.008); desk.position.set(0, 0.18, 0.11); bench.add(desk);
    const chair = box(0.08, 0.16, 0.06, mat("#7a1b1b", { detail: "fibre", repeat: 2, bump: 0.5 }), 0.01); chair.position.set(0, 0.22, -0.06); bench.add(chair);
    const judge = person("#a31f2c", { wig: "long", bands: true, sit: true }); judge.position.set(0, 0.14, 0.0); bench.add(judge);
    const ermine = box(0.07, 0.015, 0.03, mat("#f2efe6", { detail: "tissue", repeat: 6 }), 0.006); ermine.position.set(0, 0.255, 0.01); bench.add(ermine);
    add("judge", bench);
    const arms = new THREE.Group(); arms.position.set(0, 0.42, -0.73);
    arms.add(new THREE.Mesh(new THREE.CircleGeometry(0.08, 48), mat("#c9a227", { detail: "fold", repeat: 2, bump: 1, metalness: 0.8, roughness: 0.3 })));
    arms.add(new THREE.Mesh(new THREE.RingGeometry(0.08, 0.09, 48), glow("#ffd34d", 0.8)));
    decor(arms, "bench");
    // the clerk below the bench
    const clerkG = new THREE.Group(); clerkG.position.set(0, 0, -0.36);
    const cdesk = box(0.4, 0.09, 0.08, wood, 0.008); cdesk.position.y = 0.045; clerkG.add(cdesk);
    const clerk = person("#1c1c22", { sit: true }); clerk.position.set(0.05, 0, -0.07); clerkG.add(clerk);
    add("clerk", clerkG);
    // counsel's row: prosecution and defence
    for (const [id, x] of [["prosecution", -0.25], ["defence", 0.25]]) {
      const g = new THREE.Group(); g.position.set(x, 0, -0.08);
      const t = box(0.38, 0.09, 0.09, wood, 0.008); t.position.y = 0.045; g.add(t);
      const p = person("#18181c", { wig: "short", bands: true }); p.position.set(0, 0, 0.1); g.add(p);
      const p2 = person("#2a2a34", { sit: true }); p2.position.set(x < 0 ? -0.12 : 0.12, 0, 0.12); g.add(p2);
      for (let i = 0; i < 3; i++) { const book = box(0.04, 0.012, 0.03, mat(["#7a1b1b", "#1b3a7a", "#2f5a3a"][i], { detail: "none" })); book.position.set(-0.1 + i * 0.05, 0.096, 0); g.add(book); }
      add(id, g);
    }
    // the jury box on the left: two rows of six
    const juryG = new THREE.Group(); juryG.position.set(-0.6, 0, -0.1);
    for (let r = 0; r < 2; r++) { const step = box(0.18, 0.05 + r * 0.05, 0.62, wood, 0.006); step.position.set(-r * 0.09, (0.05 + r * 0.05) / 2, 0); juryG.add(step); for (let i = 0; i < 6; i++) { const j = person(["#3a5a8a", "#8a5a3a", "#5a8a5a", "#8a3a5a", "#6a6a6a", "#3a7a7a"][(i + r * 2) % 6], { sit: true, skin: ["#e0b090", "#8a5a3a", "#f0c8a8", "#5a3a28", "#d8a878", "#c89070"][(i + r) % 6] }); j.position.set(-r * 0.09, 0.05 + r * 0.05, -0.25 + i * 0.1); j.rotation.y = Math.PI / 2; juryG.add(j); } }
    const jfront = box(0.02, 0.12, 0.64, darkWood); jfront.position.set(0.09, 0.06, 0); juryG.add(jfront);
    add("jury", juryG);
    // the witness box on the right
    const wit = new THREE.Group(); wit.position.set(0.55, 0, -0.32);
    const wb = box(0.16, 0.14, 0.16, wood, 0.01); wb.position.y = 0.07; wit.add(wb);
    const w = person("#4a6a8a"); w.position.set(0, 0.06, 0); w.rotation.y = -Math.PI / 2; wit.add(w);
    add("witness", wit);
    // the dock at the back, glassed in
    const dockG = new THREE.Group(); dockG.position.set(0, 0, 0.45);
    const db = box(0.42, 0.1, 0.2, darkWood, 0.008); db.position.y = 0.05; dockG.add(db);
    const glass = box(0.42, 0.16, 0.2, mat("#bfe9ff", { detail: "none", transmission: 0.9, thickness: 0.01, roughness: 0.05, transparent: true, opacity: 0.25 })); glass.position.y = 0.18; dockG.add(glass);
    const def = person("#5a5a62", { sit: false }); def.position.set(0, 0.1, 0); def.rotation.y = Math.PI; dockG.add(def);
    const officer = person("#1a2440"); officer.position.set(0.14, 0.1, 0.04); officer.rotation.y = Math.PI; dockG.add(officer);
    add("dock", dockG);
    // the public gallery behind
    const gal = new THREE.Group(); gal.position.set(0, 0, 0.66);
    for (let r = 0; r < 2; r++) { const row = box(1.1, 0.06 + r * 0.06, 0.1, green, 0.008); row.position.set(0, (0.06 + r * 0.06) / 2, r * 0.1); gal.add(row); for (let i = 0; i < 5; i++) if ((i + r) % 2 === 0) { const p = person(["#7a4a8a", "#3a6a8a", "#8a7a3a"][i % 3], { sit: true }); p.position.set(-0.4 + i * 0.2, 0.06 + r * 0.06, r * 0.1); p.rotation.y = Math.PI; gal.add(p); } }
    add("gallery", gal);
    // the court hierarchy as a stepped tower beside the court
    const tower = new THREE.Group(); tower.position.set(1.15, 0, -0.4);
    const tiers = [["Supreme Court", "#ff5a4d"], ["Court of Appeal", "#ff8f6b"], ["High Court", "#ffb36b"], ["Crown & County Courts", "#ffe066"], ["Magistrates' Court", "#e9e3d3"]];
    tiers.slice().reverse().forEach(([name, c], i) => {
      const tier = box(0.34 - i * 0.05, 0.1, 0.3 - i * 0.04, mat(c, { detail: "none", roughness: 0.25, clearcoat: 1, transmission: 0.3, thickness: 0.1, emissive: new THREE.Color(c).multiplyScalar(0.15) }), 0.012);
      tier.position.y = 0.05 + i * 0.105; tower.add(tier);
      const lab = text(name, { size: 0.035, colour: "#ffffff", bg: "rgba(0,0,0,0.55)" }); lab.position.set(0, 0.05 + i * 0.105, 0.2 - i * 0.02); tower.add(lab);
    });
    add("hierarchy", tower);
    k.tick((t, dt, motion) => {
      if (!motion) return;
      people.forEach((p, i) => { p.children[1].rotation.y = Math.sin(t * 0.6 + i * 1.7) * 0.25; });   // heads turn to whoever is speaking
    });
  },
};
