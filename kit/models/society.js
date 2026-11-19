// SocGradify's 3D model: a town in cross-section, as a sociologist sees it. The institutions that socialise
// us (a family home, a school, a place of worship, the media, a park where friends meet), the agencies of
// formal social control (a police station, a magistrates' court, CCTV), and the inequality written into the
// town itself (a leafy suburb, a high-rise estate, an office tower and a food bank). For GCSE Sociology:
// families, education, crime and deviance, and social stratification.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  socialisation: { name: "Socialisation", c: "#7be08a" },
  control: { name: "Social control", c: "#5ec8ff" },
  inequality: { name: "Inequality", c: "#f2b84b" },
};

const STRUCTURES = {
  family: s("socialisation", "Family home", "The family is the main agent of **primary socialisation**: where children first learn the norms, values and language of their culture. The roof is off so you can see in.",
    ["Family types include **nuclear**, **extended**, **lone-parent**, **reconstituted** (step-families) and **same-sex** families.", "Functionalist **Parsons** argued the family has two basic functions: primary socialisation of children and stabilising adult personalities.", "Feminists such as **Ann Oakley** (1974) showed women still did most housework and childcare; Young and Willmott (1973) argued roles were becoming more equal, in the **symmetrical family**."],
    [["What is primary socialisation?", "The first learning of norms and values, mainly in the family, in early childhood."], ["What were Parsons' two functions of the family?", "Primary socialisation of children, and the stabilisation of adult personalities."], ["What is a reconstituted family?", "A step-family: one or both partners have children from a previous relationship."], ["What did Young and Willmott mean by the symmetrical family?", "A family where husband and wife share roles more equally, at home and at work."]],
    ["family", "home", "primary socialisation", "nuclear family", "parsons", "oakley", "symmetrical family", "reconstituted"]),
  school: s("socialisation", "School", "School is an agent of **secondary socialisation**: it teaches subjects, but also the rules, routines and values of wider society, through the formal and the **hidden curriculum**.",
    ["Functionalists: **Durkheim** said school builds social solidarity and teaches specialist skills; **Parsons** saw it as a bridge from family to society, rewarding merit (**meritocracy**).", "Marxists **Bowles and Gintis** (1976) argued school prepares working-class pupils to obey at work: the **correspondence principle**.", "Interactionists study **labelling** in the classroom: teachers' expectations can become a **self-fulfilling prophecy**."],
    [["What is the hidden curriculum?", "The norms and values taught informally by the way school is organised (punctuality, obedience, hierarchy)."], ["What is the correspondence principle?", "Bowles and Gintis: the relationships and rules of school mirror those of the workplace."], ["What is a self-fulfilling prophecy?", "A pupil labelled (e.g. as bright or as a troublemaker) comes to act in line with the label."]],
    ["school", "education", "hidden curriculum", "meritocracy", "bowles and gintis", "correspondence principle", "labelling", "self-fulfilling prophecy", "secondary socialisation"]),
  religion: s("socialisation", "Place of worship", "Religion teaches shared beliefs and moral rules, and brings people together. How much it still does so is the debate about **secularisation**.",
    ["**Durkheim** saw religion as creating a **collective conscience**: shared values that hold society together.", "**Marx** called religion \"the opium of the people\": it eases the pain of exploitation but hides its causes.", "In the 2021 Census for England and Wales, **46.2%** described themselves as Christian and **37.2%** said they had no religion: evidence used in the secularisation debate."],
    [["What did Durkheim say religion does for society?", "Creates a collective conscience: shared values that bind people together."], ["What did Marx mean by calling religion 'the opium of the people'?", "It dulls the pain of exploitation and makes inequality seem acceptable, so people don't challenge it."], ["What is secularisation?", "The process by which religion loses its influence in society."]],
    ["religion", "church", "mosque", "worship", "secularisation", "durkheim", "marx", "collective conscience"]),
  media: s("socialisation", "Media", "Television, news sites and social media are powerful agents of secondary socialisation: they shape what we know, what we think matters, and how groups are seen.",
    ["**Agenda setting**: the media decide which issues we think about; **gatekeeping**: editors decide what's left out.", "**Stanley Cohen** (1972) showed how press coverage of mods and rockers created a **moral panic**, turning them into **folk devils**.", "The media can reinforce **stereotypes** of gender, ethnicity and age, through how often and how groups are shown."],
    [["What is a moral panic?", "Exaggerated media and public reaction to a group seen as a threat to society's values (Cohen: mods and rockers)."], ["What is agenda setting?", "The media's power to decide which issues the public thinks about."], ["What is gatekeeping?", "Editors and journalists deciding which stories are reported and which are left out."]],
    ["media", "television", "social media", "news", "moral panic", "cohen", "folk devils", "agenda setting", "gatekeeping", "stereotypes"]),
  peers: s("socialisation", "Park (peer group)", "Friends of a similar age socialise each other, especially in the teenage years, through approval, teasing and **peer pressure**: a form of **informal social control**.",
    ["Peer groups can form **subcultures** with their own norms, values, dress and language.", "**Paul Willis** (1977) studied 'the lads', working-class boys whose **counter-school culture** rejected school, and led them into manual jobs.", "Informal control (from friends, family, neighbours) uses **informal sanctions**: praise, gossip, exclusion."],
    [["What is a peer group?", "A group of people of similar age and status who influence each other."], ["What did Paul Willis find about 'the lads'?", "Their anti-school subculture rejected school values and prepared them for working-class manual jobs."], ["Give an example of an informal sanction.", "Praise, teasing, gossip, being ignored or excluded by friends."]],
    ["peer group", "peers", "friends", "peer pressure", "subculture", "willis", "informal social control", "park"]),
  police: s("control", "Police station", "The police are an agency of **formal social control**: they enforce the law, using formal sanctions such as arrest and caution.",
    ["**Police recorded crime** only counts crimes reported to and recorded by the police; the **Crime Survey for England and Wales** asks people directly about crimes they've experienced.", "Crime that's never reported or recorded is the **dark figure of crime**.", "Statistics show some groups are stopped and searched far more than others (for example, Black people several times as often as White people), which interactionists link to **labelling** and policing practices."],
    [["What is formal social control?", "Control through written rules and laws, enforced by agencies such as the police and courts."], ["What is the dark figure of crime?", "Crime that is never reported to or recorded by the police."], ["How does the Crime Survey for England and Wales differ from police recorded crime?", "It is a victim survey: it asks people about crimes they've experienced, including ones never reported."]],
    ["police", "formal social control", "crime statistics", "dark figure", "crime survey", "stop and search"]),
  court: s("control", "Magistrates' court", "Courts decide whether laws have been broken and give formal sanctions: fines, community sentences or prison. Sociologists ask why some people break rules, and who gets labelled.",
    ["**Deviance** is breaking social norms; **crime** is breaking the law. Not all deviance is criminal.", "**Merton** (1938): crime comes from **strain**, when people can't reach society's goals (like wealth) by legitimate means.", "**Becker** (1963): deviance is behaviour that people **label** so; once labelled, a person may take on a deviant **master status**."],
    [["What is the difference between crime and deviance?", "Crime breaks the law; deviance breaks social norms (and may not be illegal)."], ["What is Merton's strain theory?", "Crime happens when people can't achieve society's goals (wealth) through legitimate means, so they turn to illegitimate ones."], ["What is a master status?", "A label (such as 'criminal') that overrides everything else about a person."]],
    ["court", "magistrates", "crime", "deviance", "sanction", "merton", "strain", "becker", "labelling", "master status"]),
  cctv: s("control", "CCTV cameras", "Cameras watching the high street are a form of **surveillance**. People who know they may be watched tend to police their own behaviour.",
    ["**Foucault** (1975) used the **panopticon**, a prison where inmates can always be watched but can't see if they are, to explain modern **self-surveillance**.", "Supporters say CCTV deters crime and helps solve it; critics say it mainly **displaces** crime and threatens privacy.", "Right realists favour **situational crime prevention**: making crime harder (cameras, lighting, locks) rather than tackling its causes."],
    [["What was Foucault's panopticon?", "A prison design where inmates could always be watched without knowing it, so they controlled their own behaviour."], ["What is displacement of crime?", "Crime moving to another place or time, instead of being prevented, when security is tightened."], ["What is situational crime prevention?", "Reducing opportunities for crime by changing the environment, e.g. CCTV, lighting, locks."]],
    ["cctv", "surveillance", "foucault", "panopticon", "situational crime prevention", "displacement", "camera"]),
  suburb: s("inequality", "Suburb", "Detached houses with gardens and cars on the drive. Where you live reflects, and shapes, your **life chances**: health, education, income and even how long you live.",
    ["**Life chances** (Weber): the chances of getting the good things in life, such as good health, education and a long life.", "Wealth is far more unequal than income: in Great Britain, the richest 10% of households held about **43%** of all wealth, and the poorest half about 9% (ONS, 2018 to 2020).", "**Weber** saw stratification in terms of **class, status and party** (power), not class alone."],
    [["What are life chances?", "The chances of achieving good things in life, such as health, education, a good job and long life."], ["What is the difference between wealth and income?", "Income is money received over time (wages, benefits); wealth is the value of what someone owns (property, savings, shares)."], ["What three dimensions of stratification did Weber identify?", "Class, status and party (power)."]],
    ["suburb", "wealth", "life chances", "weber", "stratification", "class", "middle class"]),
  estate: s("inequality", "Housing estate", "A tower block and terraced streets. Sociologists study how poverty and deprivation cluster in some areas, and why they're passed between generations.",
    ["**Marx** saw society divided into two classes: the **bourgeoisie**, who own the means of production, and the **proletariat**, who sell their labour.", "**Material deprivation** (lacking money for books, space, trips) is linked to lower achievement at school.", "Some (such as **Charles Murray**) blame poverty on an **underclass** culture; others blame structural causes: low pay, unemployment and the benefits system."],
    [["Who are the bourgeoisie and the proletariat?", "Marx's two classes: the owners of the means of production, and the workers who sell their labour."], ["What is material deprivation?", "Lacking the money and resources (books, space, a computer) that others take for granted."], ["What is the underclass debate?", "Whether poverty is caused by the culture of a group at the bottom (Murray) or by structural factors such as unemployment and low wages."]],
    ["estate", "council estate", "tower block", "deprivation", "working class", "underclass", "murray", "proletariat", "bourgeoisie", "material deprivation"]),
  office: s("inequality", "Office tower", "Work is a key part of class. The office tower holds managers and professionals at the top, and cleaners and clerical staff at the bottom, with different pay, security and status.",
    ["Official statistics classify class by **occupation** (the ONS **NS-SEC** scale, from higher managerial and professional to routine jobs).", "The **gender pay gap** among full-time employees was about **7%** in 2024 (ONS); it's larger across all employees, partly because more women work part-time.", "The **glass ceiling** is the invisible barrier that keeps women (and some minority groups) out of the top jobs."],
    [["How do official statistics measure social class?", "By occupation, using the ONS NS-SEC scale."], ["What is the glass ceiling?", "An invisible barrier that stops women and minority groups being promoted to the top jobs."], ["Give one reason for the gender pay gap.", "Any one of: more women work part-time; occupational segregation; discrimination; career breaks for childcare."]],
    ["office", "work", "occupation", "ns-sec", "gender pay gap", "glass ceiling", "employment"]),
  foodbank: s("inequality", "Food bank", "A community hall handing out emergency food parcels. The Trussell Trust's network alone gave out over 3 million in 2023 to 2024.",
    ["**Absolute poverty**: lacking the basics for survival (food, shelter, warmth).", "**Relative poverty**: income well below what's normal in a society; in the UK, below **60% of median household income**.", "**Peter Townsend** (1979) defined poverty as **relative deprivation**: being unable to take part in the activities and living conditions that are customary in society."],
    [["What is the difference between absolute and relative poverty?", "Absolute: lacking the basic needs for survival. Relative: having much less than the normal standard in that society."], ["How is relative poverty measured in the UK?", "Household income below 60% of the median."], ["What did Townsend mean by relative deprivation?", "Lacking the resources to take part in the normal activities and living conditions of society."]],
    ["food bank", "poverty", "absolute poverty", "relative poverty", "townsend", "relative deprivation"]),
};

const NOTES = {
  socialisation: { title: "Socialisation", lead: "We learn to be members of society through **socialisation**: learning the **norms** (rules of behaviour) and **values** (beliefs about what's important) of our culture.",
    sections: [
      ["Primary and secondary socialisation", "- **Primary**: in the family, in early childhood: language, basic norms, gender roles.", "- **Secondary**: later and outside the family: school, peer group, religion, media, workplace.", "> Exam tip: name the agent, say what it teaches, and say how (rewards, punishments, imitation, role models)."],
      ["Perspectives", "- **Functionalists** (Durkheim, Parsons): socialisation creates shared values (**value consensus**) that keep society stable.", "- **Marxists**: it passes on ruling-class ideas, so the working class accept inequality (**false class consciousness**).", "- **Feminists**: it reproduces patriarchy, e.g. through gender role socialisation (Oakley: canalisation and manipulation).", "- **Interactionists**: people actively make sense of the world through everyday interaction."],
      ["Nature and nurture", "Sociologists stress **nurture**: behaviour is learned, not inherited. Cases of children raised in isolation (feral children) show how much depends on socialisation, and cross-cultural studies show that norms differ between societies."],
    ] },
  control: { title: "Social control, crime and deviance", lead: "**Social control** is how society makes people keep to its norms: through rewards (**positive sanctions**) and punishments (**negative sanctions**).",
    sections: [
      ["Formal and informal control", "- **Formal**: written laws and rules, enforced by agencies such as the police, courts and prisons.", "- **Informal**: unwritten, through family, friends and neighbours: approval, gossip, exclusion.", "- **Surveillance** (CCTV, monitoring online) is a growing form of control (Foucault)."],
      ["Explaining crime", "- **Functionalist**: Durkheim (some crime is normal and even useful); Merton (strain).", "- **Marxist**: laws protect the ruling class; white-collar and corporate crime is under-punished.", "- **Interactionist**: Becker (labelling), Cohen (moral panics).", "- **Feminist**: why women commit less crime; Heidensohn (1985): women are more tightly controlled at home and in public."],
      ["Measuring crime", "- **Police recorded crime**: misses unreported and unrecorded crime.", "- **Victim surveys** (Crime Survey for England and Wales): catch unreported crime, but miss crimes without an obvious victim.", "- **Self-report studies**: ask people what crimes they have committed.", "> Exam tip: always say what each source misses; the dark figure of crime is the key idea."],
    ] },
  inequality: { title: "Social stratification", lead: "**Stratification** is the way society is divided into layers of unequal wealth, power and status. In Britain the main divisions studied are **class, gender, ethnicity and age**.",
    sections: [
      ["Theories of stratification", "- **Marx**: two classes, defined by ownership of the means of production; inequality comes from exploitation.", "- **Weber**: class, **status** and **party** (power); class depends on market position (skills and qualifications) as well as ownership.", "- **Functionalists** (Davis and Moore, 1945): inequality is necessary; the most important jobs must be rewarded most to attract the most talented."],
      ["Wealth, income and poverty", "- **Income** is a flow (wages, benefits); **wealth** is a stock (property, savings, pensions, shares).", "- **Absolute** vs **relative** poverty; Townsend's **relative deprivation**.", "- Explanations: individual or cultural (Murray's underclass) vs structural (low pay, unemployment, cuts to benefits)."],
      ["Life chances", "Class affects health, life expectancy, educational achievement and the chance of being a victim of crime. Social **mobility** is moving between classes; sociologists debate whether Britain is a **meritocracy** or whether advantages are passed down through families."],
    ] },
};

export default {
  title: "Society in 3D", kicker: "3D sociology",
  intro: { title: "A town, as a sociologist sees it", text: "The places that socialise us, the agencies that control us, and the inequality built into where people live and work. Click any building for its theories, key studies and evidence." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Exam tip",
  quiz: "find the place",
  motion: "Town life",
  trueColour: true,
  camera: { pos: [0.25, 2.75, 2.75], target: [-0.02, 0.05, 0.02], min: 0.3, max: 5.5 },
  views: { Overview: [[0.25, 2.75, 2.75], [-0.02, 0.05, 0.02]], "From above": [[0, 3.0, 0.15], [0, 0, 0]], "Suburb and estate": [[0.2, 0.9, 1.4], [0.1, 0.1, 0.25]], "Town centre": [[-0.4, 0.8, 0.6], [-0.45, 0.15, -0.4]] },
  platform: { r: 0.55 },
  shadow: { left: -1.7, right: 1.7, top: 1.5, bottom: -1.5, near: 0.5, far: 10 },
  explode: false,
  build(k) {
    const { THREE, V, mat, text, add, decor, box } = k;
    const at = (o, x, y, z, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; return o; };
    const paint = (c, r = 0.65) => mat(c, { detail: "none", roughness: r, clearcoat: 0.1 });
    const metal = (c, r = 0.35) => mat(c, { detail: "none", metalness: 0.85, roughness: r, clearcoat: 0 });
    const brick = mat("#a4553c", { detail: "fibre", repeat: 4, bump: 0.3, roughness: 0.85, clearcoat: 0 });
    const stone = mat("#cfc6b4", { detail: "fibre", repeat: 3, bump: 0.25, roughness: 0.8, clearcoat: 0 });
    const concrete = paint("#a9a7a1", 0.9), asphalt = paint("#3a3c40", 0.95), pave = paint("#c9c5bb", 0.9);
    const grass = mat("#5f8a46", { detail: "tissue", repeat: 10, bump: 0.3, roughness: 1, clearcoat: 0 });
    const glass = mat("#9ec4d6", { detail: "none", metalness: 0.3, roughness: 0.12, clearcoat: 1 });
    const win = paint("#2b3a48", 0.25);
    const skins = ["#e8c3a0", "#c99a74", "#8d5a3b", "#f0d0b4", "#b07850", "#5c3a24"];
    let si = 0;
    const person = (c, small = false) => {
      const g = new THREE.Group(), f = small ? 0.7 : 1;
      g.add(at(new THREE.Mesh(new THREE.CapsuleGeometry(0.014 * f, 0.045 * f, 6, 14), paint(c, 0.85)), 0, 0.04 * f, 0));
      g.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.012 * f, 20, 14), paint(skins[si++ % skins.length], 0.6)), 0, 0.087 * f, 0));
      return g;
    };
    const tree = (x, z, h = 0.12, grp) => { const g = new THREE.Group(); g.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.009, h * 0.5, 8), paint("#6b4a2e")), 0, h * 0.25, 0)); g.add(at(new THREE.Mesh(new THREE.IcosahedronGeometry(h * 0.33, 1), paint("#3f7a3a", 0.9)), 0, h * 0.62, 0)); at(g, x, 0, z); return grp ? grp.add(g) : decor(g); };
    const car = (c) => { const g = new THREE.Group(); g.add(at(box(0.07, 0.022, 0.034, paint(c, 0.3), 0.006), 0, 0.019, 0)); g.add(at(box(0.038, 0.018, 0.03, win, 0.005), -0.004, 0.036, 0)); for (const [x, z] of [[-0.022, -0.017], [0.022, -0.017], [-0.022, 0.017], [0.022, 0.017]]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.006, 12), paint("#1d1e21", 0.9)); w.rotation.x = Math.PI / 2; g.add(at(w, x, 0.008, z)); } return g; };
    // a pitched-roof house, w wide, facing +z
    const house = (w, d, h, wall, roofC = "#5b4036") => {
      const g = new THREE.Group(); g.add(at(box(w, h, d, wall), 0, h / 2, 0));
      const a = Math.atan2(h * 0.5, d / 2), sl = Math.hypot(h * 0.5, d / 2) + 0.006;
      for (const sgn of [-1, 1]) { const r = box(w + 0.012, 0.006, sl, paint(roofC, 0.7)); r.rotation.x = sgn * a; g.add(at(r, 0, h + h * 0.25, sgn * d / 4)); }
      const gable = new THREE.Shape([new THREE.Vector2(-d / 2, 0), new THREE.Vector2(d / 2, 0), new THREE.Vector2(0, h * 0.5)]);
      for (const x of [-w / 2, w / 2]) { const m = new THREE.Mesh(new THREE.ShapeGeometry(gable), wall); m.rotation.y = x < 0 ? -Math.PI / 2 : Math.PI / 2; g.add(at(m, x, h, 0, x < 0 ? -Math.PI / 2 : Math.PI / 2)); }
      g.add(at(box(0.022, 0.045, 0.004, paint("#2d4f6b", 0.4)), 0, 0.0225, d / 2 + 0.002));
      for (const x of [-w / 4, w / 4]) g.add(at(box(0.026, 0.024, 0.004, win), x, h * 0.62, d / 2 + 0.002));
      return g;
    };
    const label = (t, x, y, z, grp) => { const l = text(t, { size: 0.034, bg: "rgba(0,0,0,0.55)" }); l.position.set(x, y, z); decor(l, grp); return l; };

    // the ground: grass, with two roads crossing in the middle of town
    decor(at(box(2.6, 0.02, 2.0, grass), 0, -0.01, 0));
    decor(at(box(2.6, 0.004, 0.14, asphalt), 0, 0.002, 0.05));
    decor(at(box(0.14, 0.004, 2.0, asphalt), 0.05, 0.0025, 0));
    for (let x = -1.25; x < 1.3; x += 0.12) if (Math.abs(x - 0.05) > 0.1) decor(at(box(0.06, 0.002, 0.006, paint("#f0eee6")), x, 0.005, 0.05));
    for (let z = -0.95; z < 1.0; z += 0.12) if (Math.abs(z - 0.05) > 0.1) decor(at(box(0.006, 0.002, 0.06, paint("#f0eee6")), 0.05, 0.0055, z));
    for (const [x, z, w, d] of [[-0.62, -0.05, 1.2, 0.04], [0.72, -0.05, 1.2, 0.04], [-0.62, 0.15, 1.2, 0.04], [0.72, 0.15, 1.2, 0.04]]) decor(at(box(w, 0.008, d, pave), x, 0.004, z));

    // ---------- town centre (back left): office tower, court, police, CCTV ----------
    const office = new THREE.Group(), OX = -0.82, OZ = -0.62;
    office.add(at(box(0.22, 0.62, 0.2, glass), OX, 0.31, OZ));
    for (let i = 1; i < 12; i++) office.add(at(box(0.226, 0.008, 0.206, paint("#d9dde2", 0.4)), OX, i * 0.052, OZ));
    for (const [x, z] of [[-0.11, -0.1], [0.11, -0.1], [-0.11, 0.1], [0.11, 0.1]]) office.add(at(box(0.012, 0.62, 0.012, paint("#d9dde2", 0.4)), OX + x, 0.31, OZ + z));
    office.add(at(box(0.16, 0.03, 0.14, paint("#5a5f66", 0.5)), OX, 0.635, OZ));
    const workers = [person("#2b2d33"), person("#7c3f5e"), person("#2b2d33")]; workers.forEach((p, i) => office.add(at(p, OX - 0.06 + i * 0.06, 0, OZ + 0.15)));
    add("office", office);
    label("Office tower", OX, 0.74, OZ, "inequality");

    const court = new THREE.Group(), CX = -0.4, CZ = -0.6;
    court.add(at(box(0.3, 0.025, 0.2, stone), CX, 0.0125, CZ));
    court.add(at(box(0.26, 0.15, 0.14, stone), CX, 0.1, CZ - 0.02));
    for (let i = 0; i < 6; i++) court.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.15, 14), stone), CX - 0.11 + i * 0.044, 0.1, CZ + 0.075));
    court.add(at(box(0.28, 0.02, 0.18, stone), CX, 0.185, CZ));
    const ped = new THREE.Shape([new THREE.Vector2(-0.14, 0), new THREE.Vector2(0.14, 0), new THREE.Vector2(0, 0.05)]);
    court.add(at(new THREE.Mesh(new THREE.ExtrudeGeometry(ped, { depth: 0.012, bevelEnabled: false }), stone), CX, 0.195, CZ + 0.072));
    for (let i = 0; i < 3; i++) court.add(at(box(0.28 - i * 0.02, 0.008, 0.02, stone), CX, 0.004 + i * 0.008, CZ + 0.11 - i * 0.012));
    add("court", court);
    label("Magistrates' court", CX, 0.33, CZ, "control");

    const police = new THREE.Group(), PX = -0.85, PZ = -0.22;
    police.add(at(box(0.22, 0.14, 0.15, brick), PX, 0.07, PZ));
    police.add(at(box(0.23, 0.012, 0.16, paint("#3b3f46")), PX, 0.146, PZ));
    police.add(at(box(0.16, 0.022, 0.004, paint("#1f3d7a", 0.4)), PX, 0.118, PZ + 0.077));
    for (const x of [-0.07, 0.07]) police.add(at(box(0.04, 0.04, 0.004, win), PX + x, 0.075, PZ + 0.077));
    police.add(at(box(0.035, 0.06, 0.004, paint("#1f3d7a", 0.4)), PX, 0.03, PZ + 0.077));
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.022, 0.018), new THREE.MeshStandardMaterial({ color: "#3b78e0", emissive: "#3b78e0", emissiveIntensity: 0.6 })); police.add(at(lamp, PX, 0.085, PZ + 0.09));
    const pcar = car("#f4f4f2"); pcar.add(at(box(0.07, 0.005, 0.035, paint("#1f3d7a", 0.4)), 0, 0.02, 0)); police.add(at(pcar, PX + 0.18, 0, PZ + 0.05, Math.PI / 2));
    add("police", police);
    label("Police", PX, 0.24, PZ, "control");

    const cctv = new THREE.Group(), cams = [];
    for (const [x, z, ry] of [[-0.12, -0.06, 0.6], [-0.55, -0.08, -0.4], [0.2, -0.07, 2.4], [-0.12, 0.17, -0.8]]) {
      cctv.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.005, 0.2, 8), metal("#5a5f66")), x, 0.1, z));
      const head = new THREE.Group(); head.add(at(box(0.034, 0.016, 0.016, paint("#e8e8e4", 0.4)), 0.014, 0, 0)); head.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.004, 12), win), 0.032, 0, 0).rotateZ(Math.PI / 2));
      head.userData.base = ry; cctv.add(at(head, x, 0.2, z, ry)); cams.push(head);
    }
    add("cctv", cctv);

    // ---------- the suburb (back right): detached houses, gardens, cars on drives ----------
    const suburb = new THREE.Group();
    [[0.35, -0.55], [0.7, -0.55], [1.05, -0.55], [0.35, -0.85], [0.7, -0.85], [1.05, -0.85]].forEach(([x, z], i) => {
      suburb.add(at(box(0.3, 0.004, 0.26, mat("#6f9a52", { detail: "tissue", repeat: 3, roughness: 1, clearcoat: 0 })), x, 0.003, z));
      const h = house(0.16, 0.12, 0.1, i % 2 ? mat("#e6dccb", { detail: "none", roughness: 0.9, clearcoat: 0 }) : brick); suburb.add(at(h, x - 0.03, 0, z - 0.03));
      suburb.add(at(box(0.05, 0.004, 0.12, pave), x + 0.095, 0.005, z + 0.07));
      suburb.add(at(car(["#3b4f8a", "#a8a9ad", "#7a1f2a", "#e9e7e1", "#2b2d33", "#4f6b3a"][i]), x + 0.095, 0, z + 0.06, Math.PI / 2));
      tree(x - 0.11, z + 0.09, 0.1, suburb);
    });
    add("suburb", suburb);
    label("Suburb", 0.7, 0.32, -0.7, "inequality");

    // ---------- the estate (front left): a tower block, terraces, and the food bank ----------
    const estate = new THREE.Group(), EX = -0.9, EZ = 0.55;
    estate.add(at(box(0.18, 0.5, 0.16, concrete), EX, 0.25, EZ));
    for (let f = 0; f < 10; f++) for (let w = 0; w < 4; w++) estate.add(at(box(0.026, 0.022, 0.004, win), EX - 0.06 + w * 0.04, 0.04 + f * 0.047, EZ + 0.081));
    for (let f = 0; f < 10; f++) estate.add(at(box(0.184, 0.004, 0.02, concrete), EX, 0.025 + f * 0.047, EZ + 0.088));
    const terrace = new THREE.Group(); for (let i = 0; i < 5; i++) terrace.add(at(house(0.07, 0.1, 0.085, brick, "#3e3a3a"), i * 0.071, 0, 0));
    estate.add(at(terrace, -0.68, 0, 0.42)); estate.add(at(terrace.clone(), -0.68, 0, 0.78, Math.PI));
    add("estate", estate);
    label("Housing estate", EX, 0.6, EZ, "inequality");

    const foodbank = new THREE.Group(), FX = -0.24, FZ = 0.6;
    foodbank.add(at(box(0.2, 0.09, 0.14, mat("#d9cfb8", { detail: "none", roughness: 0.9, clearcoat: 0 })), FX, 0.045, FZ));
    const fr = box(0.21, 0.006, 0.15, paint("#566573", 0.6)); fr.rotation.x = 0.05; foodbank.add(at(fr, FX, 0.094, FZ));
    foodbank.add(at(box(0.15, 0.02, 0.004, paint("#2f7a4a", 0.4)), FX, 0.075, FZ - 0.072));
    foodbank.add(at(box(0.03, 0.05, 0.004, paint("#2f7a4a", 0.4)), FX + 0.05, 0.025, FZ - 0.072));
    foodbank.add(at(box(0.08, 0.035, 0.04, paint("#8a6a3e", 0.6)), FX - 0.04, 0.0175, FZ - 0.095));   // a table of parcels
    for (let i = 0; i < 3; i++) foodbank.add(at(box(0.02, 0.018, 0.02, paint("#c49a62", 0.8)), FX - 0.065 + i * 0.025, 0.044, FZ - 0.095));
    const queue = []; for (let i = 0; i < 4; i++) { const p = person(["#5a6070", "#7a4a3a", "#3f5f7a", "#6b6b3a"][i]); foodbank.add(at(p, FX + 0.02 + i * 0.045, 0, FZ - 0.14)); queue.push(p); }
    add("foodbank", foodbank);
    label("Food bank", FX, 0.2, FZ, "inequality");

    // ---------- family home (middle front right): a house with its roof off, a family inside ----------
    const family = new THREE.Group(), HX = 0.35, HZ = 0.42, hw = 0.24, hd = 0.18, hh = 0.1;
    family.add(at(box(hw, 0.006, hd, mat("#b98b58", { detail: "fibre", repeat: 2, roughness: 0.7, clearcoat: 0 })), HX, 0.003, HZ));
    family.add(at(box(hw, hh, 0.01, brick), HX, hh / 2, HZ - hd / 2)); family.add(at(box(0.01, hh, hd, brick), HX - hw / 2, hh / 2, HZ)); family.add(at(box(0.01, hh, hd, brick), HX + hw / 2, hh / 2, HZ));
    family.add(at(box(hw, 0.04, 0.01, brick), HX, 0.02, HZ + hd / 2));
    family.add(at(box(0.01, hh * 0.8, hd * 0.6, paint("#e9e2d2", 0.9)), HX + 0.02, hh * 0.4, HZ - hd * 0.2));   // an inside wall
    family.add(at(box(0.08, 0.025, 0.05, paint("#6b7f9e", 0.8)), HX - 0.06, 0.02, HZ - 0.05));   // sofa
    family.add(at(box(0.07, 0.006, 0.05, paint("#8a6038", 0.6)), HX + 0.07, 0.04, HZ + 0.02));   // the kitchen table
    for (const x of [-0.025, 0.025]) family.add(at(box(0.004, 0.04, 0.004, paint("#8a6038", 0.6)), HX + 0.07 + x, 0.02, HZ + 0.02));
    [["#3f5f7a", -0.08, -0.02, false], ["#8a3f6b", -0.03, 0.03, false], ["#e2a23a", 0.06, 0.06, true], ["#3fa06a", 0.09, -0.02, true]].forEach(([c, x, z, kid]) => family.add(at(person(c, kid), HX + x, 0.006, HZ + z)));
    add("family", family);
    label("Family", HX, 0.22, HZ, "socialisation");

    // ---------- school (front right), with a playing field ----------
    const school = new THREE.Group(), SX = 0.85, SZ = 0.42;
    school.add(at(box(0.32, 0.11, 0.14, brick), SX, 0.055, SZ - 0.05));
    school.add(at(box(0.33, 0.01, 0.15, paint("#3b3f46")), SX, 0.115, SZ - 0.05));
    for (let i = 0; i < 6; i++) school.add(at(box(0.034, 0.04, 0.004, win), SX - 0.13 + i * 0.052, 0.07, SZ + 0.022));
    school.add(at(box(0.04, 0.05, 0.004, paint("#7a2f3a", 0.4)), SX, 0.025, SZ + 0.022));
    school.add(at(box(0.36, 0.004, 0.24, mat("#4f8f3c", { detail: "tissue", repeat: 4, roughness: 1, clearcoat: 0 })), SX, 0.004, SZ + 0.2));
    for (const x of [-0.15, 0.15]) { const goal = new THREE.Group(); goal.add(at(box(0.004, 0.035, 0.004, paint("#f4f4f2")), 0, 0.0175, -0.03)); goal.add(at(box(0.004, 0.035, 0.004, paint("#f4f4f2")), 0, 0.0175, 0.03)); goal.add(at(box(0.004, 0.004, 0.064, paint("#f4f4f2")), 0, 0.035, 0)); school.add(at(goal, SX + x, 0, SZ + 0.2)); }
    const pupils = []; for (let i = 0; i < 6; i++) { const p = person(i % 2 ? "#1f3d7a" : "#7a2f3a", true); school.add(at(p, SX - 0.1 + i * 0.04, 0.004, SZ + 0.15 + (i % 3) * 0.04)); pupils.push(p); }
    add("school", school);
    label("School", SX, 0.24, SZ - 0.05, "socialisation");

    // ---------- place of worship (middle left of the cross) ----------
    const religion = new THREE.Group(), RX = -0.32, RZ = -0.24;
    religion.add(at(house(0.13, 0.2, 0.11, stone, "#4a4f57"), RX, 0, RZ, Math.PI / 2));
    religion.add(at(box(0.06, 0.2, 0.06, stone), RX + 0.09, 0.1, RZ));
    const spire = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.12, 4), paint("#4a4f57", 0.6)); spire.rotation.y = Math.PI / 4; religion.add(at(spire, RX + 0.09, 0.26, RZ));
    for (const z of [-0.035, 0.035]) religion.add(at(box(0.004, 0.05, 0.02, paint("#7a5ab0", 0.3)), RX - 0.066, 0.06, RZ + z));
    add("religion", religion);
    label("Place of worship", RX, 0.38, RZ, "socialisation");

    // ---------- media: a broadcast mast and a big screen ----------
    const media = new THREE.Group(), MX = 0.22, MZ = -0.24;
    const mastH = 0.42;
    for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2; const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, mastH, 6), metal("#c23a3a", 0.5)); leg.position.set(MX + Math.cos(a) * 0.012, mastH / 2, MZ + Math.sin(a) * 0.012); media.add(leg); }
    for (let y = 0.05; y < mastH; y += 0.06) media.add(at(new THREE.Mesh(new THREE.TorusGeometry(0.013, 0.002, 4, 12), metal("#e8e8e4", 0.5)).rotateX(Math.PI / 2), MX, y, MZ));
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.008, 12, 8), new THREE.MeshStandardMaterial({ color: "#ff4a3a", emissive: "#ff4a3a", emissiveIntensity: 0.8 })); media.add(at(beacon, MX, mastH + 0.01, MZ));
    const sc = document.createElement("canvas"); sc.width = 256; sc.height = 144; const g = sc.getContext("2d");
    g.fillStyle = "#14233a"; g.fillRect(0, 0, 256, 144); g.fillStyle = "#c8384a"; g.fillRect(0, 104, 256, 40);
    g.fillStyle = "#ffffff"; g.font = "700 22px Geist, system-ui, sans-serif"; g.fillText("BREAKING NEWS", 14, 132);
    g.fillStyle = "#e9c46a"; g.beginPath(); g.arc(70, 52, 26, 0, Math.PI * 2); g.fill(); g.fillStyle = "#8aa0b8"; g.fillRect(118, 30, 120, 10); g.fillRect(118, 52, 96, 10); g.fillRect(118, 74, 110, 10);
    const stex = new THREE.CanvasTexture(sc); stex.colorSpace = THREE.SRGBColorSpace;
    media.add(at(box(0.2, 0.12, 0.014, paint("#1d1e21", 0.4)), MX + 0.14, 0.17, MZ + 0.02));
    media.add(at(new THREE.Mesh(new THREE.PlaneGeometry(0.184, 0.104), new THREE.MeshBasicMaterial({ map: stex, toneMapped: false })), MX + 0.14, 0.17, MZ + 0.0275));
    media.add(at(box(0.01, 0.11, 0.01, metal("#5a5f66")), MX + 0.14, 0.055, MZ + 0.02));
    add("media", media);
    label("Media", MX + 0.14, 0.3, MZ, "socialisation");

    // ---------- the park (front middle), where a peer group hangs out ----------
    const peers = new THREE.Group(), KX = -0.02, KZ = 0.75;
    peers.add(at(box(0.36, 0.004, 0.32, mat("#6f9a52", { detail: "tissue", repeat: 3, roughness: 1, clearcoat: 0 })), KX, 0.004, KZ));
    peers.add(at(box(0.09, 0.006, 0.025, paint("#8a6038", 0.6)), KX + 0.06, 0.03, KZ - 0.04)); for (const x of [-0.035, 0.035]) peers.add(at(box(0.006, 0.03, 0.02, metal("#3a3c40")), KX + 0.06 + x, 0.015, KZ - 0.04));
    const teens = []; for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2, p = person(["#2b2d33", "#5a7fa8", "#8a3f6b", "#3f7a3a", "#c9a23a"][i]); peers.add(at(p, KX - 0.05 + Math.cos(a) * 0.05, 0.004, KZ + 0.04 + Math.sin(a) * 0.05)); teens.push(p); }
    tree(KX - 0.14, KZ - 0.1, 0.13, peers); tree(KX + 0.14, KZ + 0.11, 0.12, peers);
    add("peers", peers);
    label("Park", KX, 0.2, KZ, "socialisation");

    // traffic on the main road, and the town's motion
    const traffic = [car("#c8384a"), car("#2f63b8"), car("#e9e7e1"), car("#3f7a3a")];
    traffic.forEach((c) => decor(c));
    k.tick((t, dt, motion) => {
      if (!motion) return;
      traffic.forEach((c, i) => {
        if (i < 2) { const u = ((t * 0.06 + i * 0.5) % 1) * 2.4 - 1.2; c.position.set(i ? -u : u, 0, 0.05 + (i ? -0.035 : 0.035)); c.rotation.y = i ? Math.PI : 0; }
        else { const u = ((t * 0.05 + i * 0.5) % 1) * 1.8 - 0.9; c.position.set(0.05 + (i === 2 ? 0.035 : -0.035), 0, i === 2 ? u : -u); c.rotation.y = i === 2 ? -Math.PI / 2 : Math.PI / 2; }
      });
      cams.forEach((c, i) => { c.rotation.y = c.userData.base + Math.sin(t * 0.5 + i) * 0.6; });
      beacon.visible = Math.floor(t * 1.5) % 2 === 0;
      lamp.material.emissiveIntensity = 0.4 + 0.4 * Math.sin(t * 3);
      teens.forEach((p, i) => { p.position.y = 0.004 + Math.max(0, Math.sin(t * 3 + i * 1.7)) * 0.006; });
      pupils.forEach((p, i) => { p.position.x = SX - 0.1 + i * 0.04 + Math.sin(t * 1.2 + i) * 0.02; });
      queue.forEach((p, i) => { p.rotation.y = Math.sin(t * 0.4 + i) * 0.3; });
    });
  },
};
