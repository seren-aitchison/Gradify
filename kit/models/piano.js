// MusicGradify's 3D model: a two-octave keyboard you can play, with the major scale as a staircase,
// chords lit above the keys, a stave and the circle of fifths. Click a key to hear it (Web Audio);
// click a chord or the scale to hear that. Notes cover theory, harmony and notation.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  keyboard: { name: "Keyboard", c: "#f4f1e8" },
  harmony: { name: "Scales & chords", c: "#f055dd" },
  notation: { name: "Notation", c: "#5ef0ff" },
};

const STRUCTURES = {
  naturals: s("keyboard", "White keys (naturals)", "The seven note names A–G repeat up the keyboard. White keys are the natural notes.",
    ["From C, the white keys give the **C major scale**.", "Between E–F and B–C there is no black key: they're a semitone apart.", "An octave spans 12 semitones (8 white-key letter names, counting both ends)."],
    [["Which pairs of white keys have no black key between them?", "E–F and B–C."], ["How many semitones in an octave?", "12."], ["Which scale do the white keys from C to C make?", "C major."]],
    ["white key", "natural", "note names", "octave", "semitone"]),
  accidentals: s("keyboard", "Black keys (sharps and flats)", "Each black key is a semitone above the white key to its left (sharp ♯) and below the one to its right (flat ♭).",
    ["C♯ and D♭ are the same key: **enharmonic equivalents**.", "Black keys come in groups of two and three, which is how you find your place.", "The five black keys alone make a pentatonic scale."],
    [["What are enharmonic equivalents?", "Two names for the same pitch, e.g. C♯ and D♭."], ["What does a sharp do?", "Raises a note by a semitone."], ["What scale do the black keys alone make?", "A pentatonic scale."]],
    ["sharp", "flat", "black key", "accidental", "enharmonic"]),
  middleC: s("keyboard", "Middle C", "The C near the middle of the piano (C4, about 261.6 Hz): the meeting point of treble and bass clefs.",
    ["It sits on a ledger line below the treble stave and above the bass stave.", "The A above it (A4) is the tuning note: **440 Hz**.", "Each octave doubles the frequency: C5 ≈ 523 Hz."],
    [["Where is middle C written on the treble stave?", "On a ledger line just below the stave."], ["What frequency is the standard tuning A?", "440 Hz (A4)."], ["What happens to frequency an octave higher?", "It doubles."]],
    ["middle c", "c4", "frequency", "440", "pitch"]),
  scale: s("harmony", "Major scale", "Seven notes in the pattern **tone, tone, semitone, tone, tone, tone, semitone** (T T S T T T S).",
    ["Any major scale follows the same pattern from its starting note: G major needs F♯.", "Degrees: tonic, supertonic, mediant, subdominant, dominant, submediant, leading note.", "The natural minor pattern is T S T T S T T; harmonic minor raises the 7th."],
    [["What is the pattern of tones and semitones in a major scale?", "T T S T T T S."], ["Which sharp does G major have?", "F♯."], ["Name the 5th degree of a scale.", "The dominant."]],
    ["major scale", "scale", "tone", "semitone", "degree", "key", "minor scale"]),
  majorChord: s("harmony", "Major chord (C–E–G)", "A triad of root, major third (4 semitones) and perfect fifth (7 semitones): bright and stable.",
    ["Primary chords in a major key: **I, IV, V** (C, F, G in C major).", "Chord inversions: root position, first inversion (3rd in the bass), second inversion.", "Perfect cadence V–I sounds finished; plagal IV–I is the 'Amen'."],
    [["What intervals make a major triad?", "A major third and a perfect fifth above the root."], ["What are the primary chords in C major?", "C (I), F (IV) and G (V)."], ["What is a perfect cadence?", "Chord V to chord I, sounding finished."]],
    ["major chord", "triad", "chord", "cadence", "inversion", "primary chords"]),
  minorChord: s("harmony", "Minor chord (A–C–E)", "Root, minor third (3 semitones) and perfect fifth: darker in colour.",
    ["A minor is the **relative minor** of C major: same key signature.", "In a major key, chords ii, iii and vi are minor.", "The chord progression I–V–vi–IV underlies countless pop songs."],
    [["What is the relative minor of C major?", "A minor."], ["What intervals make a minor triad?", "A minor third and a perfect fifth."], ["Which chords are minor in a major key?", "ii, iii and vi."]],
    ["minor chord", "relative minor", "minor", "chord progression"]),
  seventh: s("harmony", "Dominant seventh (G7)", "Chord V with an added minor seventh (G–B–D–F). Its tension pulls strongly back to the tonic.",
    ["The B (leading note) rises to C; the F falls to E.", "The tritone between B and F creates the tension.", "Imperfect cadence: any chord to V, sounding unfinished; interrupted: V to vi."],
    [["What notes are in G7?", "G, B, D and F."], ["Which interval creates the dominant seventh's tension?", "The tritone (here B–F)."], ["What is an interrupted cadence?", "V to vi: a surprise ending."]],
    ["seventh", "dominant", "g7", "tritone", "imperfect cadence", "interrupted"]),
  stave: s("notation", "The stave", "Five lines and four spaces. The treble clef curls round G; the bass clef's dots surround F.",
    ["Treble lines: **E G B D F** (Every Good Boy Deserves Football); spaces F A C E.", "Bass lines: **G B D F A** (Good Boys Deserve Football Always); spaces A C E G.", "Note lengths: semibreve 4 beats, minim 2, crotchet 1, quaver ½."],
    [["Name the treble clef lines from the bottom.", "E, G, B, D, F."], ["Name the bass clef spaces from the bottom.", "A, C, E, G."], ["How many beats is a minim in 4/4?", "Two."]],
    ["stave", "staff", "treble clef", "bass clef", "notation", "note value", "rhythm"]),
  circle: s("notation", "Circle of fifths", "The twelve keys arranged in fifths. Clockwise from C adds a sharp each step; anticlockwise adds a flat.",
    ["Order of sharps: **F C G D A E B**; flats are the reverse: B E A D G C F.", "Neighbouring keys share six of seven notes: modulation between them sounds smooth.", "Relative minors sit inside the circle (Am with C, Em with G...)."],
    [["What is the order of sharps?", "F, C, G, D, A, E, B."], ["How many sharps does D major have?", "Two (F♯, C♯)."], ["Why do neighbouring keys on the circle modulate smoothly?", "They share six of their seven notes."]],
    ["circle of fifths", "key signature", "modulation", "sharps", "flats"]),
};

const NOTES = {
  keyboard: { title: "Notes, pitch and the keyboard", lead: "The keyboard makes music theory visible: every pattern of tones and semitones can be seen and played.",
    sections: [
      ["Pitch", "- Pitch is how high or low a note is; it depends on frequency (Hz).", "- Equal temperament divides the octave into 12 equal semitones (each × 2^(1/12)).", "- Concert pitch: A4 = 440 Hz."],
      ["Intervals", "- Count semitones: minor 2nd (1), major 2nd (2), minor 3rd (3), major 3rd (4), perfect 4th (5), tritone (6), perfect 5th (7), minor 6th (8), major 6th (9), minor 7th (10), major 7th (11), octave (12).", "> Song cues help ear training: perfect 4th 'Here Comes the Bride', perfect 5th 'Twinkle Twinkle' (first leap)."],
      ["Finding your way", "- C is just left of each group of two black keys; F is left of each group of three.", "- Practise naming notes quickly in both clefs (flashcards help)."],
    ] },
  harmony: { title: "Scales, chords and harmony", lead: "Scales give a piece its key; chords built from the scale give it harmony; progressions and cadences give it shape.",
    sections: [
      ["Scales and keys", "- Major: T T S T T T S. Natural minor: T S T T S T T. Harmonic minor raises the 7th; melodic minor raises 6th and 7th going up.", "- Pentatonic (5 notes), blues, chromatic (all 12), whole-tone, modes (Dorian, Mixolydian...)."],
      ["Chords", "- Triads: major, minor, diminished, augmented.", "- In a major key: I, ii, iii, IV, V, vi, vii°.", "- Sevenths add colour: major 7th, dominant 7th, minor 7th."],
      ["Cadences", "- Perfect (V–I), plagal (IV–I), imperfect (–V), interrupted (V–vi).", "- Identify them by ear: does it sound finished, unfinished or surprising?", "> Exam technique: describe harmony with precise terms, and say where in the bar or phrase it happens."],
    ] },
  notation: { title: "Reading and writing music", lead: "Notation records pitch, rhythm, dynamics and expression so anyone can play it.",
    sections: [
      ["Rhythm", "- Semibreve 4, minim 2, crotchet 1, quaver ½, semiquaver ¼ beats; a dot adds half the value.", "- Time signatures: top number = beats per bar, bottom = the beat's note value (4 = crotchet, 8 = quaver).", "- Simple time (2/4, 3/4, 4/4) vs compound time (6/8, 9/8, 12/8)."],
      ["Key signatures", "- Sharps or flats at the start of each line apply throughout.", "- Find a major key from sharps: one semitone above the last sharp. From flats: the second-last flat.", "- Relative minors share the key signature; look for a raised 7th to spot the minor."],
      ["Expression", "- Dynamics: pp, p, mp, mf, f, ff; crescendo and diminuendo.", "- Tempo: largo, adagio, andante, moderato, allegro, presto.", "- Articulation: staccato, legato, accent; ornaments: trill, mordent, turn."],
    ] },
};

let audio = null;
function play(freqs, dur = 1.2) {
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    const now = audio.currentTime, out = audio.createGain(); out.gain.value = 0.18; out.connect(audio.destination);
    freqs.forEach((f, i) => {
      for (const [mult, amp] of [[1, 1], [2, 0.35], [3, 0.15], [4, 0.08]]) {   // a few harmonics for a piano-ish tone
        const o = audio.createOscillator(), g = audio.createGain(); o.type = "sine"; o.frequency.value = f * mult;
        const t0 = now + i * 0.02; g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(amp, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
        o.connect(g); g.connect(out); o.start(t0); o.stop(t0 + dur + 0.05);
      }
    });
  } catch { /* no audio */ }
}
const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);

export default {
  title: "Music theory in 3D", kicker: "3D music",
  intro: { title: "Play the keyboard", text: "Click any key to hear it, and click a chord or the scale to hear that too. Find middle C, see the major scale's pattern of steps, read the stave and turn the circle of fifths. The full notes are below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Listen for",
  quiz: "find it",
  motion: "Circle turning",
  camera: { pos: [0.2, 0.9, 1.4], target: [0, 0.1, 0], min: 0.04, max: 4 },
  views: { Keyboard: [[0.05, 0.6, 0.9], [0, 0.05, 0.05]], Chords: [[0.1, 0.5, 0.75], [0, 0.18, -0.05]], Stave: [[-0.2, 0.45, 0.6], [-0.2, 0.32, -0.35]], Circle: [[0.95, 0.45, 0.2], [0.8, 0.25, -0.1]] },
  platform: { r: 0.95, y: -0.06 },
  labelMax: 3,
  explode: false,
  bg: ["#24182e", "#08050c"],
  onPick(obj, id) {
    if (obj.userData.midi) { play([hz(obj.userData.midi)]); obj.position.y -= 0.006; setTimeout(() => { obj.position.y += 0.006; }, 180); }
    else if (id === "majorChord") play([60, 64, 67].map(hz));
    else if (id === "minorChord") play([57, 60, 64].map(hz));
    else if (id === "seventh") play([55, 59, 62, 65].map(hz));
    else if (id === "scale") [60, 62, 64, 65, 67, 69, 71, 72].forEach((m, i) => setTimeout(() => play([hz(m)], 0.5), i * 260));
  },
  build(k) {
    const { THREE, V, mat, glow, limb, box, text, add, decor } = k;
    const ivory = mat("#f6f2e8", { detail: "none", roughness: 0.25, clearcoat: 1 }), ebony = mat("#16161c", { detail: "none", roughness: 0.2, clearcoat: 1 });
    const W = 0.042, start = 48;   // C3 to B4: 14 white keys
    const whiteNotes = [0, 2, 4, 5, 7, 9, 11], x0 = -7 * W;
    const case_ = box(15 * W, 0.04, 0.24, mat("#2a1a14", { detail: "fibre", repeat: 2, roughness: 0.3, clearcoat: 1 }), 0.01); case_.position.set(0, -0.025, 0.02); decor(case_, "keyboard");
    const keyX = {};
    for (let o = 0; o < 2; o++) whiteNotes.forEach((n, i) => {
      const midi = start + o * 12 + n, x = x0 + (o * 7 + i + 0.5) * W;
      const key = box(W * 0.94, 0.02, 0.2, midi === 60 ? mat("#fff6d8", { detail: "none", roughness: 0.25, clearcoat: 1, emissive: new THREE.Color("#3a3000") }) : ivory, 0.004);
      key.position.set(x, 0.01, 0.06); key.userData.midi = midi; keyX[midi] = x;
      add(midi === 60 ? "middleC" : "naturals", key);
      if ([0, 2, 5, 7, 9].includes(n)) {
        const bm = midi + 1, bk = box(W * 0.55, 0.026, 0.12, ebony, 0.004); bk.position.set(x + W / 2, 0.028, 0.02); bk.userData.midi = bm; keyX[bm] = x + W / 2; add("accidentals", bk);
      }
    });
    const mc = text("Middle C", { size: 0.022, colour: "#ffe8a0", bg: "rgba(0,0,0,0.55)" }); mc.position.set(keyX[60], 0.04, 0.2); decor(mc, "keyboard");
    // the major scale as a staircase over the keys, with T/S labels
    const steps = new THREE.Group(), sc = [60, 62, 64, 65, 67, 69, 71, 72];
    sc.forEach((m, i) => { const h = 0.02 + i * 0.018, st = box(W * 0.8, h, 0.03, mat("#f055dd", { detail: "none", clearcoat: 1, transparent: true, opacity: 0.85, emissive: new THREE.Color("#3a0a30") }), 0.004); st.position.set(keyX[m], 0.03 + h / 2, -0.12); steps.add(st); if (i) { const l = text(m - sc[i - 1] === 2 ? "T" : "S", { size: 0.022, colour: m - sc[i - 1] === 2 ? "#ffd0f6" : "#ffe066" }); l.position.set((keyX[m] + keyX[sc[i - 1]]) / 2, 0.06 + h, -0.12); steps.add(l); } });
    add("scale", steps);
    // chords: glowing rings above their keys
    const chord = (id, notes, c, y, name) => { const g = new THREE.Group(); notes.forEach((m) => { const r = new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.004, 12, 32), mat(c, { detail: "none", emissive: new THREE.Color(c).multiplyScalar(0.4) })); r.rotation.x = Math.PI / 2; r.position.set(keyX[m], y, 0.03); g.add(r); g.add(limb(V(keyX[m], 0.03, 0.03), V(keyX[m], y, 0.03), 0.0015, glow(c, 0.5), false)); }); for (let i = 1; i < notes.length; i++) g.add(limb(V(keyX[notes[i - 1]], y, 0.03), V(keyX[notes[i]], y, 0.03), 0.003, glow(c, 0.7), false)); const l = text(name, { size: 0.02, bg: "rgba(0,0,0,0.55)" }); l.position.set(keyX[notes[0]] - 0.03, y + 0.025, 0.03); g.add(l); add(id, g); };
    chord("majorChord", [60, 64, 67], "#6bffb8", 0.14, "C major: C–E–G");
    chord("minorChord", [57, 60, 64], "#7e9bff", 0.2, "A minor: A–C–E");
    chord("seventh", [55, 59, 62, 65], "#ff9f40", 0.26, "G7: G–B–D–F");
    // a grand stave behind
    const stave = new THREE.Group(); stave.position.set(-0.2, 0.25, -0.35);
    for (const base of [0.06, -0.08]) for (let i = 0; i < 5; i++) stave.add(box(0.5, 0.002, 0.002, glow("#bfefff", 0.8)).translateY(base + i * 0.018));
    const tc = text("𝄞", { size: 0.11, colour: "#5ef0ff" }); tc.position.set(-0.22, 0.1, 0.01); stave.add(tc);
    const bc = text("𝄢", { size: 0.07, colour: "#5ef0ff" }); bc.position.set(-0.22, -0.05, 0.01); stave.add(bc);
    [[-0.12, 0.06], [-0.06, 0.069], [0.0, 0.078], [0.06, 0.087], [0.12, 0.096]].forEach(([x, y]) => { const n = new THREE.Mesh(new THREE.SphereGeometry(0.008, 16, 12), mat("#eaffff", { detail: "none" })); n.scale.set(1.3, 1, 0.5); n.position.set(x, y, 0.005); stave.add(n); stave.add(limb(V(x + 0.009, y, 0.005), V(x + 0.009, y + 0.05, 0.005), 0.0012, mat("#eaffff", { detail: "none" }), false)); });
    add("stave", stave);
    // the circle of fifths
    const circle = new THREE.Group(); circle.position.set(0.82, 0.25, -0.12); circle.rotation.y = -0.5;
    const keys = ["C", "G", "D", "A", "E", "B", "F♯", "D♭", "A♭", "E♭", "B♭", "F"], minors = ["Am", "Em", "Bm", "F♯m", "C♯m", "G♯m", "D♯m", "B♭m", "Fm", "Cm", "Gm", "Dm"];
    const ringM = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.004, 8, 96), glow("#5ef0ff", 0.6)); circle.add(ringM);
    keys.forEach((kk, i) => { const a = Math.PI / 2 - (i / 12) * Math.PI * 2; const l = text(kk, { size: 0.035, colour: i === 0 ? "#ffe066" : "#eaffff" }); l.position.set(Math.cos(a) * 0.19, Math.sin(a) * 0.19, 0); circle.add(l); const m = text(minors[i], { size: 0.02, colour: "#9fdcff" }); m.position.set(Math.cos(a) * 0.115, Math.sin(a) * 0.115, 0); circle.add(m); });
    const disc = new THREE.Mesh(new THREE.CircleGeometry(0.21, 64), mat("#0d3b52", { detail: "none", transparent: true, opacity: 0.6, side: THREE.DoubleSide })); disc.position.z = -0.005; circle.add(disc);
    add("circle", circle);
    k.tick((t, dt, motion) => { if (motion) ringM.rotation.z = t * 0.2; });
  },
};
