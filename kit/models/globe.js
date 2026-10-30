// LitGradify's 3D model: Shakespeare's Globe, as rebuilt on Bankside. The thrust stage under the
// painted heavens, the yard where groundlings stood, three tiers of galleries, the tiring house and
// the thatched roof, with a flag flying. Notes cover drama, Shakespeare, close reading and context.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  stage: { name: "The stage", c: "#ffb36b" },
  audience: { name: "The audience", c: "#5ef0ff" },
  building: { name: "The playhouse", c: "#e9e3d3" },
};

const STRUCTURES = {
  thrustStage: s("stage", "Thrust stage", "A raised platform jutting into the yard, with the audience on three sides. Actors were close enough to touch.",
    ["**Soliloquies and asides** work because the actor can speak directly to people inches away.", "Plays ran in daylight (about 2 pm) with almost no scenery: the words set the scene ('This castle hath a pleasant seat', Macbeth).", "All parts, including women's, were played by men and boys until 1660."],
    [["Why are soliloquies effective on a thrust stage?", "The actor is surrounded by and close to the audience, so they can confide in them directly."], ["How did Shakespeare's audiences know where and when a scene was set?", "From the language: characters describe the time and place."], ["Who played female roles in Shakespeare's time?", "Boy actors."]],
    ["stage", "soliloquy", "aside", "staging", "performance"]),
  heavens: s("stage", "The heavens", "The painted canopy over the stage, held up by two great pillars. A trapdoor in it let gods and spirits descend.",
    ["The underside was painted with the sun, moon and stars: the cosmos above the action.", "Machinery in the 'hut' above could lower actors.", "The pillars could stand in for trees, as in As You Like It's Forest of Arden."],
    [["What were 'the heavens' at the Globe?", "The painted canopy above the stage, showing the sky."], ["How could a god appear from above?", "Lowered through a trapdoor in the heavens by machinery in the hut."], ["What does the heavens/hell layout of the stage suggest?", "The stage mirrored the Elizabethan cosmos: heaven above, hell below, humanity in between."]],
    ["heavens", "canopy", "pillars"]),
  trapdoor: s("stage", "The trapdoor ('hell')", "A trapdoor in the stage floor led to the space beneath, called 'hell'. Ghosts, witches and the dead came and went through it.",
    ["The Ghost in Hamlet cries 'Swear!' from 'the cellarage' beneath the stage.", "Ophelia's grave in Act 5 of Hamlet uses the trap.", "The witches' cauldron in Macbeth may have risen through it."],
    [["Which character speaks from under the stage in Hamlet?", "The Ghost ('Swear!')."], ["What was the space under the stage called?", "Hell (the cellarage)."], ["Which Hamlet scene probably used the trapdoor as a grave?", "The graveyard scene, Act 5 Scene 1 (Ophelia's burial)."]],
    ["trapdoor", "ghost", "supernatural", "hamlet", "macbeth witches"]),
  tiringHouse: s("stage", "Tiring house", "The building at the back of the stage where actors changed ('attired'). Its doors were the entrances; its balcony became walls and windows.",
    ["The balcony is Juliet's window in Romeo and Juliet's Act 2 Scene 2.", "Musicians often played from the gallery above.", "A curtained 'discovery space' between the doors could reveal a scene (Ferdinand and Miranda at chess in The Tempest)."],
    [["What was the tiring house?", "The backstage building where actors dressed, with doors and a balcony onto the stage."], ["Which famous scene used the balcony?", "The balcony scene in Romeo and Juliet."], ["What was the discovery space?", "A curtained recess at the back of the stage that could be revealed."]],
    ["tiring house", "balcony", "backstage", "entrance"]),
  yard: s("audience", "The yard (groundlings)", "The open pit around the stage where the poorest audience members stood for a penny, exposed to the weather.",
    ["Groundlings paid **1d** (a penny), about the price of a loaf.", "Hamlet mocks them as 'capable of nothing but inexplicable dumb-shows and noise'.", "Shakespeare wrote for them too: puns, bawdy jokes, fights and clowns."],
    [["How much did it cost to stand in the yard?", "One penny."], ["What were the people standing in the yard called?", "Groundlings."], ["Why did Shakespeare include comic and bawdy scenes?", "To entertain the whole audience, including the groundlings."]],
    ["groundling", "yard", "audience", "penny"]),
  galleries: s("audience", "The galleries", "Three tiers of covered seating around the yard, for wealthier playgoers. Up to 3,000 people could attend.",
    ["Another penny got you into the galleries; more for a cushion; the lords' rooms beside the stage cost the most.", "Being seen was part of the point: the wealthy sat where others could see them.", "The audience mixed every class of London society."],
    [["How many people could the Globe hold?", "Up to about 3,000."], ["Who sat in the galleries?", "Wealthier playgoers, paying more for a seat and shelter."], ["Why does the mixed audience matter for reading Shakespeare?", "He wrote for every class at once: verse and philosophy alongside clowning and spectacle."]],
    ["gallery", "audience", "seating", "class"]),
  frame: s("building", "The wooden 'O'", "A twenty-sided timber-framed building, nearly circular: the 'wooden O' of Henry V's prologue. Built in 1599 from the timbers of The Theatre.",
    ["'Can this cockpit hold / The vasty fields of France? Or may we cram / Within this wooden O...' (Henry V, Prologue).", "The first Globe burned down in 1613 when a cannon set the thatch alight during Henry VIII.", "The modern reconstruction (1997), led by Sam Wanamaker, is about 230 m from the original site."],
    [["What does 'this wooden O' refer to?", "The Globe Theatre, in the Prologue to Henry V."], ["How was the first Globe destroyed?", "A cannon fired during Henry VIII set the thatched roof alight in 1613."], ["When was the Globe built, and from what?", "1599, from the timbers of The Theatre in Shoreditch."]],
    ["globe", "wooden o", "theatre", "playhouse", "henry v", "1599"]),
  roof: s("building", "Thatched roof and flag", "Thatch covered the galleries; the yard was open to the sky. A flag flew on performance days: black for a tragedy, white for a comedy, red for a history.",
    ["The open roof provided the light: plays were performed in daylight.", "The reconstruction has the first thatched roof allowed in London since the Great Fire of 1666.", "Plays were advertised by flags and playbills; performances started about 2 pm."],
    [["What did a black flag over the Globe signal?", "A tragedy that day."], ["Why was the centre of the Globe open to the sky?", "For daylight: there was no stage lighting."], ["What was unusual about the reconstruction's roof?", "It was the first thatched roof permitted in London since the Great Fire of 1666."]],
    ["roof", "thatch", "flag", "daylight"]),
};

const NOTES = {
  stage: { title: "Staging Shakespeare", lead: "Understanding the stage he wrote for changes how you read Shakespeare. With no lighting and little scenery, everything depended on language, actors and the audience's imagination.",
    sections: [
      ["Language does the work", "- Settings, time and weather are described in the verse (spoken décor).", "- Night scenes in daylight: 'How sweet the moonlight sleeps upon this bank!' (The Merchant of Venice).", "> In an essay, comment on how language creates atmosphere because the original stage couldn't."],
      ["Verse and prose", "- Blank verse: unrhymed iambic pentameter, usually for noble characters and serious moments.", "- Prose: usually for comic, lower-status or mad characters (Hamlet's 'antic disposition', Lady Macbeth sleepwalking).", "- Rhyming couplets end scenes and mark spells or prophecy (the witches' trochaic tetrameter).", "- Shifts between verse and prose signal changes in status, emotion or sanity."],
      ["Dramatic devices", "- Soliloquy: a character alone, revealing thoughts. Aside: a brief comment to the audience.", "- Dramatic irony: the audience knows what characters don't (Duncan's 'There's no art / To find the mind's construction in the face').", "- Foreshadowing, pathos, catharsis, the hamartia of the tragic hero."],
      ["The supernatural", "- Ghosts, witches and spirits used the trap and the heavens.", "- Jacobean audiences took witchcraft seriously: James I wrote Daemonologie (1597).", "- Ask what the supernatural does in the play: temptation, guilt, the disturbance of order."],
    ] },
  audience: { title: "Shakespeare's audience and context", lead: "Context means what an audience of the time would have known, believed and feared. Use it to deepen your reading of the text, not as a history lesson.",
    sections: [
      ["Who came", "- Apprentices, craftsmen, merchants, gentry, students, even nobility: all classes together.", "- Women attended too, though moralists disapproved.", "- The Puritan City authorities disliked the playhouses, which is why they were on Bankside, outside the City's control."],
      ["Beliefs and ideas", "- The Great Chain of Being: a divine order from God to king to peasant to beast; regicide disrupts nature itself (Macbeth).", "- The Divine Right of Kings; the Gunpowder Plot (1605) and anxiety about treason.", "- Gender roles: patriarchy, obedience, marriage as alliance (Juliet, Lady Macbeth challenging expectations)."],
      ["Using context in essays", "- Link context to a specific moment in the text and its effect on the audience.", "- 'A Jacobean audience would have…' then 'whereas a modern audience might…'.", "! Don't bolt on a paragraph of history: weave context into your analysis of language and structure."],
    ] },
  building: { title: "The playhouse and literary history", lead: "The Globe stood at the heart of an extraordinary theatre industry. Knowing where it came from helps place Shakespeare in his literary moment.",
    sections: [
      ["Elizabethan and Jacobean theatre", "- The first purpose-built playhouse: The Theatre (1576). Rivals: The Rose, The Swan, The Fortune.", "- Shakespeare's company: the Lord Chamberlain's Men, from 1603 the King's Men.", "- Indoor theatres (the Blackfriars) used candlelight and suited quieter, more intimate plays (The Tempest)."],
      ["Shakespeare's works", "- Comedies (A Midsummer Night's Dream, Much Ado), histories (Henry V, Richard III), tragedies (Hamlet, Macbeth, Othello, King Lear), romances (The Tempest, The Winter's Tale).", "- Sources: Holinshed's Chronicles (histories, Macbeth), Plutarch (Roman plays), Italian novellas.", "- The First Folio (1623), compiled by Heminges and Condell, preserved 36 plays."],
      ["Close reading toolkit", "- Language: imagery, metaphor, simile, personification, semantic fields, repetition.", "- Form: verse, prose, sonnet, soliloquy, genre conventions.", "- Structure: acts and scenes, juxtaposition, turning points, the five-act arc (exposition, rising action, climax, falling action, resolution).", "> Use short, embedded quotations and zoom in on single words."],
    ] },
};

export default {
  title: "The Globe in 3D", kicker: "3D literature",
  intro: { title: "Explore Shakespeare's Globe", text: "The thrust stage, the heavens and the trapdoor, the yard of groundlings, the galleries and the wooden O itself. Click any part to see how it shaped the plays, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Essay tip",
  quiz: "find it in the Globe",
  motion: "Flag flying",
  camera: { pos: [1.3, 1.3, 1.7], target: [0, 0.2, 0], min: 0.05, max: 5 },
  views: { Playhouse: [[1.3, 1.3, 1.7], [0, 0.2, 0]], "From the yard": [[0.05, 0.12, 0.45], [0, 0.22, -0.3]], "From the gallery": [[0.55, 0.45, 0.4], [0, 0.18, -0.25]], Above: [[0.05, 2.1, 0.2], [0, 0, 0]] },
  platform: { r: 1.0, y: -0.005 },
  labelMax: 2,
  explode: true,
  bg: ["#2a2030", "#09060a"],
  build(k) {
    const { THREE, V, mat, glow, limb, box, text, add, decor } = k;
    const oak = mat("#8a6a48", { detail: "fibre", repeat: 2, bump: 0.6, roughness: 0.6 }), plaster = mat("#efe6d2", { detail: "tissue", repeat: 3, bump: 0.3, roughness: 0.8 });
    const N = 20, R1 = 0.62, R2 = 0.8, tierH = 0.14;
    // the wooden O: twenty sides of timber-framed galleries, open at the stage end
    const frame = new THREE.Group(), galleries = new THREE.Group(), roof = new THREE.Group();
    for (let i = 0; i < N; i++) {
      const a0 = (i / N) * Math.PI * 2, a1 = ((i + 1) / N) * Math.PI * 2, am = (a0 + a1) / 2;
      const behindStage = Math.abs(((am + Math.PI / 2) % (Math.PI * 2)) - Math.PI) > Math.PI * 0.78;   // sides behind the stage hold the tiring house
      const p = (a, r, y) => V(Math.cos(a) * r, y, Math.sin(a) * r);
      const w = p(a0, R2, 0).distanceTo(p(a1, R2, 0));
      for (let t = 0; t < 3; t++) {
        const outer = box(w, tierH, 0.012, plaster); outer.position.copy(p(am, R2 * Math.cos(Math.PI / N), t * tierH + tierH / 2)); outer.rotation.y = -am + Math.PI / 2; frame.add(outer);
        for (const a of [a0]) frame.add(limb(p(a, R2, t * tierH), p(a, R2, (t + 1) * tierH), 0.006, oak, false));
        const beam = box(w, 0.01, 0.014, oak); beam.position.copy(p(am, R2 * Math.cos(Math.PI / N) + 0.002, t * tierH + 0.005)); beam.rotation.y = -am + Math.PI / 2; frame.add(beam);
        if (!behindStage) {
          const floor = box(w * 0.82, 0.008, R2 - R1, oak); floor.position.copy(p(am, (R1 + R2) / 2, t * tierH + 0.004)); floor.rotation.y = -am + Math.PI / 2; galleries.add(floor);
          const rail = box(w * 0.75, 0.035, 0.008, oak); rail.position.copy(p(am, R1 * Math.cos(Math.PI / N), t * tierH + 0.03)); rail.rotation.y = -am + Math.PI / 2; galleries.add(rail);
          galleries.add(limb(p(a0, R1, t * tierH), p(a0, R1, (t + 1) * tierH), 0.005, oak, false));
          for (let s2 = 0; s2 < 3; s2++) { const seat = new THREE.Mesh(new THREE.CapsuleGeometry(0.008, 0.012, 4, 8), mat(["#7a3a3a", "#3a5a7a", "#6a6a3a"][(i + t + s2) % 3], { detail: "none" })); seat.position.copy(p(a0 + (a1 - a0) * (0.25 + s2 * 0.25), R1 + 0.06 + (s2 % 2) * 0.04, t * tierH + 0.03)); galleries.add(seat); }
        }
      }
      const thatch = box(w * 1.05, 0.012, R2 - R1 + 0.08, mat("#b8955a", { detail: "fibre", repeat: 4, bump: 1.4, roughness: 0.95 })); thatch.position.copy(p(am, (R1 + R2) / 2, 3 * tierH + 0.04)); thatch.rotation.set(0, -am + Math.PI / 2, 0); thatch.rotateX(-0.35); roof.add(thatch);
    }
    add("frame", frame); add("galleries", galleries);
    // the yard: packed earth with groundlings
    const yard = new THREE.Group();
    const earth = new THREE.Mesh(new THREE.CircleGeometry(R1, 64), mat("#5a4632", { detail: "tissue", repeat: 8, bump: 0.8, roughness: 0.95 })); earth.rotation.x = -Math.PI / 2; earth.position.y = 0.002; yard.add(earth);
    const rnd = (() => { let x = 9; return () => (x = (x * 16807) % 2147483647) / 2147483647; })();
    for (let i = 0; i < 60; i++) { const a = rnd() * Math.PI * 2, r = 0.2 + rnd() * 0.38, x = Math.cos(a) * r, z = Math.sin(a) * r; if (z < -0.05 && Math.abs(x) < 0.3) continue; const g = new THREE.Group(); g.add(new THREE.Mesh(new THREE.CapsuleGeometry(0.012, 0.03, 4, 8), mat(["#6a4a3a", "#3a4a5a", "#5a5a3a", "#7a5a4a"][i % 4], { detail: "none" }))); const h = new THREE.Mesh(new THREE.SphereGeometry(0.01, 12, 8), mat("#e0b090", { detail: "none" })); h.position.y = 0.032; g.add(h); g.position.set(x, 0.03, z); yard.add(g); }
    add("yard", yard);
    // the stage, heavens, pillars, trapdoor and tiring house
    const stage = box(0.48, 0.07, 0.34, oak, 0.006); stage.position.set(0, 0.035, -0.32); add("thrustStage", stage);
    const trap = box(0.08, 0.004, 0.06, mat("#3a2818", { detail: "fibre" })); trap.position.set(0, 0.072, -0.3); add("trapdoor", trap);
    const hellGlow = new THREE.PointLight("#ff5a2a", 0.6, 0.3); hellGlow.position.set(0, 0.02, -0.3); decor(hellGlow);
    const heavens = new THREE.Group();
    for (const sd of [-1, 1]) heavens.add(limb(V(sd * 0.17, 0.07, -0.2), V(sd * 0.17, 0.33, -0.2), 0.016, mat("#c9a27a", { detail: "fibre", bump: 0.3, roughness: 0.3, clearcoat: 0.6 }), false));
    const canopy = box(0.52, 0.02, 0.3, mat("#1a2a6a", { detail: "none", roughness: 0.5 }), 0.004); canopy.position.set(0, 0.34, -0.36); heavens.add(canopy);
    for (let i = 0; i < 24; i++) { const st = new THREE.Mesh(new THREE.SphereGeometry(0.004, 8, 6), glow("#ffd34d", 1)); st.position.set(-0.23 + rnd() * 0.46, 0.328, -0.5 + rnd() * 0.28); heavens.add(st); }
    const hut = box(0.2, 0.08, 0.12, plaster, 0.006); hut.position.set(0, 0.4, -0.48); heavens.add(hut);
    add("heavens", heavens);
    const tiring = new THREE.Group();
    const facade = box(0.6, 0.42, 0.02, mat("#5a3a2a", { detail: "fibre", repeat: 2, bump: 0.4 }), 0.004); facade.position.set(0, 0.21, -0.52); tiring.add(facade);
    for (const x of [-0.18, 0.18]) { const door = box(0.06, 0.1, 0.01, mat("#2a1810", { detail: "fibre" }), 0.003); door.position.set(x, 0.12, -0.508); tiring.add(door); }
    const curtain = box(0.12, 0.1, 0.006, mat("#7a1b1b", { detail: "fold", repeat: 3, bump: 1 }), 0.002); curtain.position.set(0, 0.12, -0.507); tiring.add(curtain);
    const balc = box(0.5, 0.012, 0.05, oak); balc.position.set(0, 0.21, -0.49); tiring.add(balc); const bRail = box(0.5, 0.03, 0.006, oak); bRail.position.set(0, 0.23, -0.466); tiring.add(bRail);
    add("tiringHouse", tiring);
    // thatch and the flag on the hut
    const pole = limb(V(0, 0.44, -0.48), V(0, 0.62, -0.48), 0.003, oak, false); roof.add(pole);
    const flagGeo = new THREE.PlaneGeometry(0.1, 0.06, 12, 4); flagGeo.translate(0.05, 0, 0);
    const flag = new THREE.Mesh(flagGeo, mat("#14141a", { detail: "fibre", side: THREE.DoubleSide, roughness: 0.7 })); flag.position.set(0, 0.59, -0.48); roof.add(flag);
    add("roof", roof);
    const fl = text("A black flag: a tragedy today", { size: 0.025, bg: "rgba(0,0,0,0.55)" }); fl.position.set(0, 0.69, -0.48); decor(fl, "building");
    const fp = flagGeo.attributes.position, base = fp.array.slice();
    k.tick((t, dt, motion) => {
      if (!motion) return;
      for (let i = 0; i < fp.count; i++) { const x = base[i * 3]; fp.setZ(i, Math.sin(x * 60 - t * 6) * 0.008 * x * 10); }
      fp.needsUpdate = true; flag.geometry.computeVertexNormals();
    });
  },
};
