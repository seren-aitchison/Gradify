// LanguageGradify's 3D model: the vocal tract in cross-section, the machine every language is
// spoken with. Lips, tongue and soft palate move as if speaking, the vocal folds vibrate, and air
// flows out through the mouth or the nose. Notes cover places and manners of articulation, voicing,
// vowels, and the sounds learners of each language find hard.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  articulators: { name: "Articulators", c: "#ff8f6b" },
  places: { name: "Places of articulation", c: "#5ef0ff" },
  voice: { name: "Voice & resonance", c: "#c79bff" },
};

const STRUCTURES = {
  lips: s("articulators", "Lips", "Close for bilabial sounds [p b m], round for vowels like [u] and [y], and meet the teeth for labiodentals [f v].",
    ["Bilabial: both lips (**p, b, m**, and English w). Labiodental: lower lip on upper teeth (**f, v**).", "Lip rounding distinguishes French *si* [i] from *su* [y]: same tongue, rounded lips.", "Spanish b/v between vowels is a soft bilabial [β], with the lips not quite closing."],
    [["What is a bilabial sound? Give two examples.", "A sound made with both lips, e.g. [p], [b], [m]."], ["How do you make the French vowel in 'tu' [y]?", "Tongue position for [i] (as in 'see') with tightly rounded lips."], ["What are labiodental sounds?", "Sounds made with the lower lip against the upper teeth: [f], [v]."]],
    ["lips", "bilabial", "labiodental", "rounding", "rounded vowel"]),
  tongue: s("articulators", "Tongue", "The most important articulator: its tip, blade, front, back and root shape almost every consonant and all vowels.",
    ["Vowels are described by tongue **height** (close–open) and **backness** (front–back), plus lip rounding.", "The tongue tip trills against the alveolar ridge for Spanish *perro* [r].", "Retroflex sounds (Hindi ट [ʈ]) curl the tip back behind the ridge."],
    [["What two tongue dimensions describe vowels?", "Height (close to open) and backness (front to back)."], ["How is the Spanish trilled r made?", "The tongue tip vibrates rapidly against the alveolar ridge."], ["What are retroflex consonants?", "Sounds made with the tongue tip curled back behind the alveolar ridge."]],
    ["tongue", "vowel", "trill", "retroflex", "front vowel", "back vowel"]),
  velum: s("articulators", "Soft palate (velum)", "A muscular flap at the back of the roof of the mouth. Raised, air goes through the mouth; lowered, air goes through the nose too.",
    ["Lowered velum + closed mouth = **nasal consonants** [m n ŋ]. Lowered velum + open mouth = nasal vowels (French *bon*, Portuguese *pão*).", "Velar consonants touch the back of the tongue to it: [k g ŋ] and German *ach* [x].", "A cold blocks the nose, so 'morning' sounds like 'bording'."],
    [["What does lowering the velum do?", "Lets air flow through the nose, making nasal sounds."], ["How are French nasal vowels made?", "With the velum lowered so air flows through both mouth and nose."], ["Give two velar consonants.", "[k] and [g] (also [ŋ], [x])."]],
    ["velum", "soft palate", "velar", "nasal", "nasal vowel"]),
  teeth: s("places", "Teeth", "The place for dental sounds: English *th* [θ ð] puts the tongue between or against them.",
    ["English 'th' is rare worldwide: many learners substitute [s], [t], [f] or [d].", "Spanish and French t and d are **dental** (tongue on the teeth), English ones alveolar.", "Spanish (Spain) *z* and *ce/ci* are [θ]: *zapato* [θaˈpato]."],
    [["What kind of sound is English 'th'?", "A dental fricative: [θ] (thin) or [ð] (this)."], ["How do Spanish t and d differ from English ones?", "Spanish t/d are dental (tongue on teeth); English are alveolar (on the ridge)."], ["Where is [θ] used in Spanish?", "In Spain, for z and c before e or i."]],
    ["teeth", "dental", "interdental", "th sound"]),
  alveolar: s("places", "Alveolar ridge", "The bony ridge just behind the upper teeth: the place for [t d n s z l r] in English.",
    ["The most common place of articulation across languages.", "Postalveolar sounds (just behind it): English *sh* [ʃ], *ch* [tʃ], French *j* [ʒ].", "English r is usually an approximant [ɹ]: the tongue comes close but doesn't touch."],
    [["Name four alveolar consonants in English.", "[t], [d], [n], [s] (also [z], [l])."], ["What is a postalveolar sound? Give an example.", "Made just behind the alveolar ridge, e.g. 'sh' [ʃ]."], ["How is English r usually made?", "As an approximant: the tongue approaches the ridge without touching."]],
    ["alveolar", "ridge", "postalveolar", "sh"]),
  palate: s("places", "Hard palate", "The bony roof of the mouth: the place for palatal sounds like [j] (yes), German *ich* [ç] and Spanish *ñ* [ɲ].",
    ["Spanish *ñ* and Italian *gn* are a palatal nasal [ɲ]: the middle of the tongue on the palate.", "German *ich-Laut* [ç] after front vowels, *ach-Laut* [x] after back vowels.", "English 'y' in *yes* is a palatal approximant [j]."],
    [["What is the sound of Spanish ñ?", "A palatal nasal [ɲ]."], ["What's the difference between German ich and ach sounds?", "Ich [ç] is palatal (after front vowels); ach [x] is velar (after back vowels)."], ["What kind of sound is 'y' in 'yes'?", "A palatal approximant [j]."]],
    ["palate", "palatal", "ñ", "ich", "hard palate"]),
  uvula: s("places", "Uvula", "The small hanging tip of the soft palate: the place for French and German r [ʁ] and Arabic ق [q].",
    ["French *rouge* and German *rot* use a **uvular** fricative or approximant [ʁ].", "Arabic and Inuktitut have a uvular stop [q].", "Learners often practise French r by gargling gently."],
    [["Where is French r made?", "At the uvula: a uvular fricative [ʁ]."], ["What is [q]?", "A voiceless uvular stop (e.g. Arabic ق)."], ["Which sound is made with the back of the tongue against the uvula?", "Uvular sounds such as [q], [ʁ], [χ]."]],
    ["uvula", "uvular", "french r", "german r"]),
  folds: s("voice", "Vocal folds", "Two folds of tissue in the larynx. Vibrating, they make voiced sounds; apart, voiceless ones.",
    ["Voiced vs voiceless pairs: [b/p], [d/t], [g/k], [v/f], [z/s]. Feel the buzz on your throat.", "**Aspiration**: English p, t, k at the start of a word have a puff of air; French and Spanish ones don't.", "Tone languages (Mandarin, Vietnamese, Yoruba) use pitch, set by fold tension, to change meaning: *mā, má, mǎ, mà*."],
    [["What is the difference between [s] and [z]?", "[z] is voiced (vocal folds vibrate); [s] is voiceless."], ["Why might English speakers sound 'foreign' saying Spanish 'pan'?", "They aspirate the p (a puff of air), which Spanish doesn't."], ["How does a tone language use the vocal folds?", "Pitch (from fold tension) changes the meaning of words."]],
    ["vocal folds", "vocal cords", "voiced", "voiceless", "voicing", "aspiration", "tone", "pitch"]),
  pharynx: s("voice", "Pharynx", "The throat tube above the larynx. Its shape changes vowel quality; Arabic has consonants made here.",
    ["Arabic ح [ħ] and ع [ʕ] are **pharyngeal** fricatives: the tongue root pulls back.", "Advanced tongue root distinguishes vowels in many West African languages.", "The pharynx, mouth and nose together are the resonating tube that shapes speech."],
    [["Which Arabic letters are pharyngeal?", "ح [ħ] and ع [ʕ]."], ["What is the pharynx?", "The throat cavity between the larynx and the mouth and nose."], ["How does the pharynx affect speech?", "Its shape and size change resonance, and so vowel quality."]],
    ["pharynx", "pharyngeal", "throat", "arabic"]),
  nasal: s("voice", "Nasal cavity", "The chamber above the roof of the mouth. With the velum down, it resonates for nasal sounds.",
    ["Every language has nasal consonants; about a fifth have nasal vowels.", "English *-ng* [ŋ] is a velar nasal: one sound, not n + g.", "Portuguese *não* and French *vin* need nasal vowels without a following [n]."],
    [["What is [ŋ]?", "A velar nasal, the 'ng' in 'sing'."], ["How are nasal vowels different from vowel + n?", "Air goes through the nose during the vowel itself; no tongue contact for an n."], ["When is the nasal cavity part of the sound?", "When the velum is lowered."]],
    ["nasal cavity", "nose", "nasal", "resonance"]),
};

const NOTES = {
  articulators: { title: "The articulators and how sounds are made", lead: "Every consonant can be described by three things: **voicing** (are the vocal folds vibrating?), **place** (where is the closest contact?) and **manner** (how is the air let through?). Learn these and you can work out any sound in any language.",
    sections: [
      ["Manners of articulation", "- Plosive (stop): full closure then release [p t k b d g].", "- Fricative: a narrow gap making friction [f s ʃ x].", "- Affricate: plosive then fricative [tʃ dʒ].", "- Nasal: mouth closed, velum down [m n ŋ].", "- Approximant: articulators close but no friction [w j ɹ]; lateral [l] lets air round the sides.", "- Trill and tap: rapid vibration [r], one quick tap [ɾ] (Spanish *pero*)."],
      ["Using the IPA", "- The International Phonetic Alphabet gives one symbol per sound, for every language.", "- Dictionaries show it: learn the symbols for your target language's tricky sounds.", "> /slashes/ show phonemes (sounds that change meaning); [brackets] show actual pronunciation."],
      ["Vowels", "- Described by height, backness and rounding; plotted on the vowel trapezium.", "- English has about 20 vowel sounds (with diphthongs) for 5 letters; Spanish and Japanese have 5 pure vowels.", "- Long vs short vowels change meaning in many languages (German *Staat/Stadt*, Japanese *obasan/obaasan*)."],
    ] },
  places: { title: "Places of articulation", lead: "From the lips to the throat: bilabial, labiodental, dental, alveolar, postalveolar, retroflex, palatal, velar, uvular, pharyngeal, glottal.",
    sections: [
      ["Front of the mouth", "- Bilabial [p b m], labiodental [f v], dental [θ ð], alveolar [t d s z n l].", "- English learners of Spanish/French/Italian: move t and d forward onto the teeth."],
      ["Middle and back", "- Postalveolar [ʃ ʒ], palatal [j ç ɲ], velar [k g x ŋ], uvular [q χ ʁ].", "- German ch, Dutch g, Spanish j are fricatives further back than any English sound: practise by holding a [k] position and letting air hiss through."],
      ["Learner tips by language", "- **French**: uvular r, front rounded vowels [y ø œ], nasal vowels, unaspirated p t k.", "- **Spanish**: tap vs trill (pero/perro), dental t and d, soft b d g between vowels.", "- **German**: ich/ach, umlauts, final devoicing (*Hund* ends in [t]).", "- **Mandarin**: four tones plus neutral tone, retroflex zh ch sh r, aspiration contrasts (b/p).", "- **Japanese**: pitch accent, mora timing, a tap r between r and l."],
    ] },
  voice: { title: "Voice, resonance and the sound of a language", lead: "The larynx makes the buzz; the pharynx, mouth and nose shape it. Rhythm, stress and intonation then give each language its music.",
    sections: [
      ["Voicing", "- Feel it: hand on throat, say 'sssszzzz'. The buzz is the vocal folds.", "- Voice onset time: when voicing starts after a plosive; English 'voiceless' stops are aspirated, French and Spanish ones aren't.", "- Glottal stop [ʔ]: the folds close completely (the break in 'uh-oh', Cockney 'bu'er')."],
      ["Prosody", "- Stress-timed (English, German) vs syllable-timed (Spanish, French) vs mora-timed (Japanese) rhythm.", "- Word stress changes meaning in English (*REcord* vs *reCORD*) and Spanish (*papa* vs *papá*).", "- Intonation shows questions, emphasis and attitude."],
      ["How to practise pronunciation", "- Listen first: minimal pairs (ship/sheep, *vin/vent*) train your ear.", "- Shadowing: repeat a native speaker a split second behind them.", "- Record yourself and compare; work on one sound at a time.", "! Accent isn't the goal; being understood is. Focus on the sounds that change meaning."],
    ] },
};

export default {
  title: "The voice in 3D", kicker: "3D phonetics",
  intro: { title: "Explore the vocal tract", text: "Every language is spoken with the same machine. Watch the lips, tongue and soft palate move, the vocal folds vibrate, and air flow through the mouth or nose. Click any part for the sounds it makes and the tricky sounds of each language, and read the full notes below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Practise",
  quiz: "find the part",
  motion: "Speaking",
  camera: { pos: [0.45, 0.25, 0.95], target: [0.13, 0.12, 0], min: 0.03, max: 3 },
  views: { Side: [[0.15, 0.12, 0.9], [0.15, 0.12, 0]], Mouth: [[0.3, 0.17, 0.35], [0.22, 0.16, 0]], Throat: [[0.12, 0.0, 0.45], [0.02, 0.02, 0]], Nose: [[0.25, 0.32, 0.35], [0.18, 0.27, 0]] },
  platform: { r: 0.4, y: -0.2 },
  labelMax: 2,
  explode: false,
  bg: ["#2a1a30", "#08050c"],
  build(k) {
    const { THREE, V, mat, glow, holo, text, add, decor } = k;
    // shapes drawn in the mid-sagittal plane (x forward, y up), given thickness in z
    const slab = (pts, depth, m, smooth = true) => {
      const shape = new THREE.Shape(); const curve = new THREE.SplineCurve(pts.map(([x, y]) => new THREE.Vector2(x, y)).concat([new THREE.Vector2(...pts[0])]));
      const ps = smooth ? curve.getPoints(80) : pts.map(([x, y]) => new THREE.Vector2(x, y)); shape.setFromPoints(ps);
      const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: 0.004, bevelThickness: 0.004, bevelSegments: 3, curveSegments: 24 }); g.translate(0, 0, -depth / 2); return new THREE.Mesh(g, m);
    };
    const flesh = (c) => mat(c, { detail: "tissue", repeat: 6, bump: 0.6, roughness: 0.4, clearcoat: 0.7 });
    // the head as a hologram, cut in half
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 64, 48, 0, Math.PI), holo("#5ef0ff", "#0d3b52", 0.35)); head.scale.set(1.05, 1.2, 0.9); head.position.set(0.12, 0.22, 0); head.rotation.y = Math.PI; decor(head);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.3, 48, 1, true, Math.PI, Math.PI), holo("#5ef0ff", "#0d3b52", 0.3)); neck.position.set(0.04, -0.05, 0); decor(neck);
    // places: palate, alveolar ridge, teeth, uvula
    add("palate", slab([[0.08, 0.235], [0.16, 0.25], [0.23, 0.235], [0.23, 0.22], [0.16, 0.232], [0.08, 0.222]], 0.07, mat("#efe6d2", { detail: "bone", repeat: 3, bump: 0.6 })));
    add("alveolar", slab([[0.23, 0.235], [0.255, 0.225], [0.262, 0.205], [0.25, 0.2], [0.235, 0.215]], 0.07, mat("#ff9fb2", { detail: "tissue", repeat: 4 })));
    const enamel = mat("#f6f2e6", { detail: "none", roughness: 0.15, clearcoat: 1 });
    add("teeth", slab([[0.255, 0.215], [0.275, 0.21], [0.282, 0.175], [0.272, 0.172], [0.258, 0.2]], 0.06, enamel));
    add("teeth", slab([[0.252, 0.1], [0.268, 0.105], [0.275, 0.142], [0.266, 0.144], [0.255, 0.12]], 0.06, enamel));
    // the soft palate and uvula move together
    const velumPivot = new THREE.Group(); velumPivot.position.set(0.08, 0.225, 0); decor(velumPivot);
    const velum = slab([[0, 0.005], [-0.03, -0.005], [-0.055, -0.035], [-0.06, -0.05], [-0.05, -0.05], [-0.025, -0.02], [0, -0.008]], 0.05, flesh("#e56a7e")); velumPivot.add(velum); add("velum", velum);
    const uvula = new THREE.Mesh(new THREE.SphereGeometry(0.009, 24, 16), flesh("#d85a70")); uvula.scale.set(0.8, 1.4, 0.8); uvula.position.set(-0.056, -0.058, 0); velumPivot.add(uvula); add("uvula", uvula);
    // the tongue: a muscular body that reshapes as it moves
    const tonguePts = [[0.04, 0.03], [0.06, 0.12], [0.1, 0.18], [0.16, 0.19], [0.22, 0.17], [0.25, 0.15], [0.24, 0.135], [0.2, 0.125], [0.14, 0.1], [0.09, 0.05], [0.06, 0.02]];
    const tongue = slab(tonguePts, 0.06, flesh("#e07a8a")); add("tongue", tongue);
    const tp = tongue.geometry.attributes.position, tBase = tp.array.slice();
    // lips
    const lipU = slab([[0.27, 0.215], [0.31, 0.2], [0.315, 0.178], [0.3, 0.172], [0.28, 0.18]], 0.07, flesh("#d84a5e")); add("lips", lipU);
    const lipL = slab([[0.27, 0.098], [0.3, 0.1], [0.315, 0.125], [0.302, 0.14], [0.278, 0.135]], 0.07, flesh("#d84a5e")); add("lips", lipL);
    // nasal cavity, pharynx, larynx with vocal folds
    const nasal = slab([[0.06, 0.25], [0.15, 0.3], [0.27, 0.29], [0.3, 0.255], [0.24, 0.25], [0.12, 0.255], [0.07, 0.235]], 0.05, mat("#c79bff", { detail: "none", transparent: true, opacity: 0.35, roughness: 0.2, emissive: new THREE.Color("#2a1050") }));
    add("nasal", nasal);
    const phar = slab([[0.0, 0.22], [0.025, 0.22], [0.035, 0.1], [0.04, -0.03], [0.015, -0.03], [0.005, 0.1]], 0.055, mat("#c79bff", { detail: "none", transparent: true, opacity: 0.3, roughness: 0.2, emissive: new THREE.Color("#2a1050") }));
    add("pharynx", phar);
    const folds = new THREE.Group(); folds.position.set(0.03, -0.06, 0);
    const lar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.025, 0.05, 32, 1, true), mat("#cfe3ea", { detail: "none", transmission: 0.4, thickness: 0.02, side: THREE.DoubleSide, roughness: 0.3 })); folds.add(lar);
    const fL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.006, 0.02), flesh("#f0b8c8")), fR = fL.clone(); fL.position.z = -0.012; fR.position.z = 0.012; folds.add(fL, fR);
    add("folds", folds);
    for (const [str, p, g] of [["Nasal cavity", V(0.17, 0.33, 0.04), "voice"], ["Tongue", V(0.13, 0.13, 0.05), "articulators"], ["Vocal folds", V(0.09, -0.06, 0.04), "voice"]]) { const l = text(str, { size: 0.016, bg: "rgba(0,0,0,0.5)" }); l.position.copy(p); decor(l, g); }
    // air from the lungs: out through the mouth, and through the nose when the velum is down
    const oral = k.flow([[V(0.03, -0.2, 0), V(0.03, -0.06, 0), V(0.02, 0.1, 0), V(0.05, 0.19, 0), V(0.15, 0.205, 0), V(0.3, 0.16, 0), V(0.4, 0.16, 0)]], "#9fe8ff", 40, 0.45, "voice", 0.008);
    const nose = k.flow([[V(0.03, -0.2, 0), V(0.03, -0.06, 0), V(0.02, 0.15, 0), V(0.05, 0.25, 0), V(0.18, 0.28, 0), V(0.32, 0.26, 0)]], "#e0c8ff", 25, 0.45, "voice", 0.008);
    k.tick((t, dt, motion) => {
      if (!motion) return;
      // a cycle of syllables: 'ma', 'ta', 'ka', 'a'
      const ph = (t * 1.2) % 4, step = Math.floor(ph), u = ph - step, on = Math.sin(Math.min(1, u * 2.5) * Math.PI);
      const nasalSound = step === 0;
      velumPivot.rotation.z = nasalSound ? -0.35 * on : 0.05;
      nose.visible = nasalSound && on > 0.2; oral.visible = !(step === 0 && u < 0.3) && !(step !== 3 && u < 0.25);
      lipL.position.y = step === 0 ? 0.035 * on : -0.015 * (1 - on);   // the lips close for m
      for (let i = 0; i < tp.count; i++) {
        const x = tBase[i * 3], y = tBase[i * 3 + 1];
        let dy = 0;
        if (step === 1) dy = Math.max(0, (x - 0.19) * 1.1) * on;      // t: the tip rises to the alveolar ridge
        if (step === 2) dy = Math.max(0, 0.05 - Math.abs(x - 0.11)) * 0.9 * on;   // k: the back rises to the velum
        if (step === 3) dy = -Math.max(0, x - 0.08) * 0.18 * on;      // a: the tongue lowers
        tp.setY(i, y + dy);
      }
      tp.needsUpdate = true; tongue.geometry.computeVertexNormals();
      const buzz = Math.sin(t * 90) * 0.003; fL.position.z = -0.012 - buzz; fR.position.z = 0.012 + buzz;
    });
  },
};
