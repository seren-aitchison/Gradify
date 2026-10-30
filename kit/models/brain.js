// PsychGradify's 3D model: the real brain from scan data (BodyParts3D via open-anatomy-3d, CC BY 4.0)
// split into the four cortical lobes, with the limbic system, the deep structures and the hindbrain.
// Fade the cortex to see inside. Signals travel along the main pathways (the corpus callosum, the
// circuit of Papez, the dopamine pathways).
import { loadAnatomy, take, ATTRIBUTION } from "./anatomy-glb.js";

const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  cortex: { name: "Cortex", c: "#f2b4c4" },
  limbic: { name: "Limbic system", c: "#ff8f6b" },
  deep: { name: "Deep structures", c: "#7ee0ff" },
  hindbrain: { name: "Hindbrain", c: "#c79bff" },
};

const STRUCTURES = {
  frontal: s("cortex", "Frontal lobe", "The largest lobe: movement (motor cortex), planning, decision-making, working memory, personality and, usually on the left, speech production (Broca's area).",
    ["The **prefrontal cortex** supports executive functions: planning, inhibition, flexibility. It matures last, into the mid-20s.", "**Phineas Gage** (1848): an iron rod through his left frontal lobe changed his personality, the classic case for frontal localisation.", "Damage causes perseveration (tested by the Wisconsin Card Sorting Test) and disinhibition."],
    [["Which brain region supports executive function?", "The prefrontal cortex of the frontal lobe."], ["What did the case of Phineas Gage suggest?", "That the frontal lobes are involved in personality, social behaviour and self-control."], ["Which test is sensitive to frontal lobe damage?", "The Wisconsin Card Sorting Test (perseverative errors)."]],
    ["frontal", "prefrontal", "executive", "broca", "personality", "phineas gage", "motor cortex"]),
  parietal: s("cortex", "Parietal lobe", "Touch and body sense (somatosensory cortex), spatial attention and integrating the senses.",
    ["The **somatosensory homunculus**: body parts get cortex in proportion to their sensitivity (hands and lips are huge).", "Right parietal damage causes **unilateral neglect**: ignoring the left side of space.", "The dorsal 'where/how' visual stream runs from the occipital to the parietal lobe."],
    [["What is unilateral spatial neglect, and where is the damage usually?", "Ignoring one side of space (usually the left), after right parietal damage."], ["What does the sensory homunculus show?", "Cortical area is proportional to the sensitivity of each body part, not its size."], ["Which visual stream runs to the parietal lobe?", "The dorsal 'where/how' stream."]],
    ["parietal", "somatosensory", "neglect", "spatial", "homunculus"]),
  temporal: s("cortex", "Temporal lobe", "Hearing (auditory cortex), language comprehension (Wernicke's area), object and face recognition, and, on its inner surface, memory.",
    ["**Wernicke's aphasia**: fluent but meaningless speech with poor comprehension.", "The fusiform face area: damage causes **prosopagnosia** (face blindness).", "The ventral 'what' visual stream runs from the occipital to the temporal lobe."],
    [["What is prosopagnosia?", "Inability to recognise faces, linked to damage of the fusiform gyrus."], ["What are the features of Wernicke's aphasia?", "Fluent speech with little meaning, and impaired comprehension."], ["Which visual stream runs to the temporal lobe?", "The ventral 'what' stream (object recognition)."]],
    ["temporal", "wernicke", "auditory", "prosopagnosia", "language"]),
  occipital: s("cortex", "Occipital lobe", "Vision. The primary visual cortex (V1) maps the visual field; higher areas process colour (V4) and motion (V5/MT).",
    ["Each hemisphere sees the **opposite visual field**.", "Hubel and Wiesel found neurons tuned to lines of particular orientation (Nobel Prize 1981).", "Damage to V5 causes akinetopsia (motion blindness); V1 damage can leave 'blindsight'."],
    [["Which visual field does the left occipital lobe process?", "The right visual field."], ["What did Hubel and Wiesel discover?", "Neurons in visual cortex respond selectively to edges of particular orientations."], ["What is blindsight?", "Responding to visual stimuli in a 'blind' field after V1 damage, without conscious awareness."]],
    ["occipital", "visual cortex", "vision", "v1", "blindsight"]),
  hippocampus: s("limbic", "Hippocampus", "A seahorse-shaped structure in each medial temporal lobe that turns new experiences into lasting memories and maps space.",
    ["**Patient HM** (Henry Molaison) lost both hippocampi in 1953 surgery: severe anterograde amnesia, but he could still learn motor skills (procedural memory intact).", "London taxi drivers have larger posterior hippocampi (Maguire, 2000).", "Place cells (O'Keefe) and grid cells (the Mosers) map space: Nobel Prize 2014."],
    [["What did patient HM show about memory?", "The hippocampus is needed to form new declarative memories; procedural memory is separate."], ["What did Maguire's taxi driver study find?", "Larger posterior hippocampi in experienced London taxi drivers, suggesting neuroplasticity."], ["What are place cells?", "Hippocampal neurons that fire when an animal is in a particular location."]],
    ["hippocamp", "memory", "amnesia", "hm", "consolidation", "place cell"]),
  amygdala: s("limbic", "Amygdala", "Almond-shaped nuclei in front of the hippocampus that detect threat, drive fear responses and tag memories with emotion.",
    ["Fear conditioning depends on the amygdala; LeDoux described a fast 'low road' (thalamus → amygdala) and slow 'high road' (via cortex).", "Over-activity is linked to anxiety and PTSD.", "Bilateral damage (patient SM) removes the experience of fear."],
    [["What are LeDoux's two routes to the amygdala?", "A fast 'low road' from the thalamus and a slower 'high road' via the sensory cortex."], ["What happened to patient SM, who had bilateral amygdala damage?", "She didn't experience fear."], ["Which disorders are linked to an overactive amygdala?", "Anxiety disorders and PTSD."]],
    ["amygdala", "fear", "emotion", "anxiety", "ptsd", "threat"]),
  hypothalamus: s("limbic", "Hypothalamus", "Below the thalamus: it keeps the body in balance (temperature, hunger, thirst, sleep), controls the pituitary and starts the stress response.",
    ["The **HPA axis**: hypothalamus (CRH) → pituitary (ACTH) → adrenal cortex (cortisol).", "The suprachiasmatic nucleus is the body's master clock (circadian rhythms).", "Lesions of the ventromedial hypothalamus cause overeating in rats; lateral lesions, undereating."],
    [["Describe the HPA axis.", "Hypothalamus releases CRH → pituitary releases ACTH → adrenal cortex releases cortisol."], ["What does the suprachiasmatic nucleus do?", "It's the master circadian clock, set by light from the retina."], ["Which hypothalamic area, when lesioned, causes overeating?", "The ventromedial hypothalamus."]],
    ["hypothalamus", "hpa", "stress", "cortisol", "circadian", "homeostasis"]),
  cingulate: s("limbic", "Cingulate cortex", "The cortex wrapped around the corpus callosum. The anterior part monitors conflict and errors and feels the unpleasantness of pain.",
    ["The anterior cingulate is active in the **Stroop task** (conflict between word and colour).", "Social rejection activates the same anterior cingulate areas as physical pain (Eisenberger, 2003).", "Part of the circuit of Papez for emotion and memory."],
    [["Which brain area monitors response conflict, e.g. in the Stroop task?", "The anterior cingulate cortex."], ["What did Eisenberger's Cyberball study show?", "Social exclusion activated the anterior cingulate, like physical pain."], ["What is the circuit of Papez?", "A loop (hippocampus → fornix → mammillary bodies → thalamus → cingulate → hippocampus) once proposed for emotion, now linked to memory."]],
    ["cingulate", "stroop", "conflict", "papez"]),
  thalamus: s("deep", "Thalamus", "The relay station: almost every sense (except smell) passes through it on the way to the cortex. It also regulates sleep and alertness.",
    ["Lateral geniculate nucleus (vision), medial geniculate (hearing).", "Thalamocortical rhythms generate sleep spindles in stage N2 sleep.", "Damage can cause thalamic pain syndrome or disorders of consciousness."],
    [["Which sense doesn't relay through the thalamus?", "Smell (olfaction)."], ["Which thalamic nucleus relays vision?", "The lateral geniculate nucleus."], ["Which sleep feature comes from thalamocortical circuits?", "Sleep spindles (stage N2)."]],
    ["thalamus", "relay", "sleep spindle", "sensory"]),
  basalGanglia: s("deep", "Basal ganglia", "The caudate, putamen and globus pallidus (with the substantia nigra): they select and start movements and are involved in habits and reward.",
    ["**Parkinson's disease**: loss of dopamine neurons in the substantia nigra → tremor, rigidity, slowness. Treated with L-dopa.", "**Huntington's disease**: degeneration of the caudate → chorea, cognitive decline; autosomal dominant (CAG repeats).", "The ventral striatum (nucleus accumbens) is the hub of the reward system and addiction."],
    [["What causes the symptoms of Parkinson's disease?", "Loss of dopaminergic neurons in the substantia nigra projecting to the striatum."], ["Which structure degenerates first in Huntington's disease?", "The caudate nucleus."], ["Which structure is central to reward and addiction?", "The nucleus accumbens (ventral striatum), via the mesolimbic dopamine pathway."]],
    ["basal ganglia", "striatum", "caudate", "putamen", "parkinson", "huntington", "dopamine", "reward", "nucleus accumbens"]),
  corpusCallosum: s("deep", "Corpus callosum", "About 200 million axons joining the two hemispheres, letting them share information.",
    ["**Split-brain** studies (Sperry and Gazzaniga): after the callosum was cut to treat epilepsy, a word shown only to the right hemisphere couldn't be named (language is usually left).", "Lateralisation: language is left-dominant in about 95% of right-handers.", "The left hemisphere's 'interpreter' makes up explanations for behaviour started by the right."],
    [["What did split-brain studies show?", "Each hemisphere can process information independently; the left usually controls speech."], ["Why can't a split-brain patient name an object seen only in the left visual field?", "It's processed by the right hemisphere, which can't pass it to the language areas on the left."], ["In what proportion of right-handers is language left-lateralised?", "About 95%."]],
    ["corpus callosum", "split brain", "lateralisation", "hemisphere", "sperry"]),
  cerebellum: s("hindbrain", "Cerebellum", "Coordinates movement, balance and timing, and learns motor skills. It holds more than half the brain's neurons.",
    ["Damage causes ataxia, intention tremor and slurred speech, on the **same side**.", "It's involved in procedural learning (e.g. eye-blink conditioning).", "Alcohol affects it early: hence the roadside walk-the-line test."],
    [["What kind of learning depends on the cerebellum?", "Motor/procedural learning, such as eye-blink conditioning."], ["Do cerebellar lesions affect the same or opposite side?", "The same side (ipsilateral)."], ["Roughly what share of the brain's neurons are in the cerebellum?", "More than half (about 80%)."]],
    ["cerebell", "coordination", "balance", "procedural", "motor learning"]),
  brainstem: s("hindbrain", "Brainstem", "Midbrain, pons and medulla: breathing, heart rate, sleep–wake cycles and arousal, and the pathways between brain and body.",
    ["The **reticular activating system** controls arousal; damage causes coma.", "The pons generates REM sleep and its muscle paralysis (atonia).", "The raphe nuclei make serotonin; the locus coeruleus makes noradrenaline; the substantia nigra and VTA make dopamine."],
    [["What does the reticular activating system do?", "It controls arousal and wakefulness."], ["Where is most of the brain's serotonin made?", "The raphe nuclei of the brainstem."], ["Which part of the brainstem generates REM sleep?", "The pons."]],
    ["brainstem", "medulla", "pons", "reticular", "arousal", "rem sleep", "serotonin", "noradrenaline"]),
};

const NOTES = {
  cortex: { title: "The cerebral cortex", lead: "Two hemispheres, four lobes, 16 billion neurons. Localisation of function has been studied through case studies of damage, then with brain imaging: but complex behaviour always involves networks, not single areas.",
    sections: [
      ["Localisation and its limits", "- Broca (1861): 'Tan' lost speech production after left frontal damage. Wernicke (1874): comprehension and the temporal lobe.", "- Lashley's rats (1950): equipotentiality, maze learning depended on how much cortex was removed, not where.", "- Neuroplasticity: after damage, other areas can take over (axonal sprouting, recruitment of homologous areas), more so in children.", "> Evaluate localisation with case studies (unique, can't be replicated), imaging (correlational) and plasticity research."],
      ["Ways of studying the brain", "- **fMRI**: blood oxygenation (BOLD); good spatial (1–2 mm), poor temporal resolution (seconds).", "- **EEG/ERPs**: electrical activity at the scalp; excellent temporal (milliseconds), poor spatial resolution.", "- **Post-mortem** examinations: link behaviour to brain structure after death (HM, Broca's Tan).", "- **TMS** temporarily disrupts an area, allowing causal conclusions."],
      ["Hemispheric lateralisation", "- Left: language, analytical and sequential processing (in most people).", "- Right: spatial processing, face recognition, emotional prosody, global attention.", "- Split-brain research supports lateralisation, but the samples were small and epileptic, and the hemispheres normally work together."],
      ["The visual system", "Retina → optic nerve → optic chiasm (nasal fibres cross) → lateral geniculate nucleus → V1 → dorsal ('where/how', parietal) and ventral ('what', temporal) streams.", "- Milner and Goodale's patient DF (visual form agnosia) could post a card through a slot she couldn't describe: evidence for two streams."],
    ] },
  limbic: { title: "The limbic system: emotion, memory and stress", lead: "A ring of structures on the inner edge of each hemisphere that link emotion, motivation and memory with the body.",
    sections: [
      ["Memory systems", "- Multi-store model (Atkinson and Shiffrin): sensory → short-term → long-term memory; HM supports separate STM and LTM.", "- Long-term memory types (Tulving): episodic and semantic (declarative, hippocampus-dependent) vs procedural (cerebellum, basal ganglia).", "- Consolidation: memories move from hippocampus-dependent to cortical storage, strengthened during sleep.", "> Anterograde amnesia = can't form new memories. Retrograde = can't recall old ones."],
      ["Emotion and fear", "- James–Lange: we feel emotion because of bodily changes. Cannon–Bard: both happen together. Schachter–Singer: arousal plus a cognitive label.", "- Amygdala: fear conditioning (Little Albert, behaviourally), threat detection, emotional memory enhancement.", "- PTSD: overactive amygdala, underactive prefrontal cortex, smaller hippocampus."],
      ["Stress", "- Acute: sympathomedullary pathway (hypothalamus → sympathetic nervous system → adrenal medulla → adrenaline). Fight or flight.", "- Chronic: HPA axis (CRH → ACTH → cortisol). Negative feedback normally switches it off.", "- Selye's General Adaptation Syndrome: alarm, resistance, exhaustion.", "- Kiecolt-Glaser (1984): exam stress reduced natural killer cell activity in students."],
      ["Biological rhythms", "- Circadian (~24 h): sleep–wake, set by the SCN, light via the retinohypothalamic tract, melatonin from the pineal gland.", "- Siffre's cave studies: free-running rhythm slightly longer than 24 hours.", "- Ultradian (<24 h): the ~90-minute sleep cycle. Infradian (>24 h): the menstrual cycle."],
    ] },
  deep: { title: "Deep structures and neurotransmitters", lead: "Beneath the cortex: the thalamus relays, the basal ganglia select actions, and the corpus callosum connects. Neurotransmitter pathways from here explain much of psychopharmacology and mental illness.",
    sections: [
      ["Synaptic transmission", "Action potential → Ca²⁺ influx at the terminal → vesicles release neurotransmitter → binds postsynaptic receptors → excitatory (EPSP) or inhibitory (IPSP) → summation decides whether the next neuron fires.", "- Removal by reuptake (SSRIs block it) or enzymes (MAO, acetylcholinesterase).", "> Excitatory: glutamate (main). Inhibitory: GABA (main). Modulators: dopamine, serotonin, noradrenaline, acetylcholine."],
      ["Dopamine pathways", "- Nigrostriatal: movement (Parkinson's).", "- Mesolimbic (VTA → nucleus accumbens): reward and addiction; excess linked to positive symptoms of schizophrenia.", "- Mesocortical (VTA → prefrontal): too little linked to negative and cognitive symptoms.", "- Tuberoinfundibular: inhibits prolactin (antipsychotics raise prolactin).", "! Typical antipsychotics block D2 receptors everywhere: extrapyramidal side effects (nigrostriatal) and raised prolactin."],
      ["Serotonin and mood", "- The monoamine hypothesis: depression from low serotonin/noradrenaline. SSRIs raise levels within hours but help after weeks, suggesting downstream changes (receptor adaptation, neurogenesis).", "- Twin studies of depression: heritability about 37%; diathesis–stress models combine vulnerability with life events."],
    ] },
  hindbrain: { title: "The hindbrain: sleep, arousal and movement", lead: "The brainstem keeps us alive and awake and controls the sleep cycle; the cerebellum fine-tunes every movement and learns skills.",
    sections: [
      ["Sleep", "- Stages: N1 (light), N2 (sleep spindles, K-complexes), N3 (slow-wave, deep), REM (dreaming, atonia, rapid eye movements).", "- About 90-minute cycles; more N3 early in the night, more REM towards morning.", "- Theories: restoration (Oswald), evolutionary (hibernation/predator avoidance), memory consolidation.", "> REM behaviour disorder (acting out dreams) is an early sign of Parkinson's disease."],
      ["Arousal and consciousness", "- The ascending reticular activating system projects through the thalamus to the cortex.", "- Noradrenaline (locus coeruleus), serotonin (raphe), histamine (hypothalamus) and orexin promote wakefulness; narcolepsy follows loss of orexin neurons."],
      ["Motor learning", "- Fitts and Posner stages: cognitive → associative → autonomous.", "- The cerebellum compares intended and actual movement (error correction); practice shifts control from cortex to cerebellum and basal ganglia."],
    ] },
};

export default {
  title: "The brain in 3D", kicker: "3D neuroscience",
  intro: { title: "Explore the brain", text: "The four lobes, the limbic system, the deep structures and the hindbrain. Fade the cortex to see inside, click any region for its functions and the key studies, and read the full notes for each section below." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Key point",
  quiz: "find the region",
  motion: "Signals travelling",
  camera: { pos: [0.85, 0.45, 0.95], target: [0, 0.32, 0], min: 0.04, max: 3 },
  views: { Left: [[-1.25, 0.35, 0.05], [0, 0.32, 0]], Right: [[1.25, 0.35, 0.05], [0, 0.32, 0]], Top: [[0.05, 1.4, 0.1], [0, 0.32, 0]], Front: [[0.05, 0.38, 1.25], [0, 0.32, 0]], Back: [[0.05, 0.4, -1.25], [0, 0.32, 0]], Inside: [[0.55, 0.3, 0.25], [0, 0.28, 0]] },
  sliders: [{ key: "cortex", label: "Cortex", value: 100 }],
  platform: { r: 0.42, y: 0.02 },
  credit: ATTRIBUTION,
  async build(k) {
    const { THREE, V, mat, tube, taper, blob, cut, add } = k;
    const L = [-1, 1];
    // the real brain from the scan (BodyParts3D), enlarged so it fills the stage, split into its
    // hemispheres and then into lobes along the central, lateral and parieto-occipital sulci
    const { byKey } = await loadAnatomy();
    const S = 2.35, real = byKey.brain[0], centre = V(0, 0.34, 0);
    const src = real.geometry.clone(); src.scale(S, S, S);
    const hemi = (sd) => cut(src, V(0, 0, 0), V(-sd, 0, 0));   // keep the triangles on this side of the midline
    const placeReal = (key) => { const m = take(byKey, key)[0]; m.geometry = m.geometry.clone(); m.geometry.scale(S, S, S); m.position.sub(real.position).multiplyScalar(S).add(centre); return m; };
    const central = [V(0, 0, 0.0), V(0, -0.25, 0.97).normalize()], lateral = [V(0, -0.04, 0), V(0, 1, 0.5).normalize()], po = [V(0, 0, -0.13), V(0, -0.35, 1).normalize()];
    const neg = ([p, n]) => [p, n.clone().negate()];
    const lobes = {
      frontal: { planes: [central, lateral], c: "#d9a294" },
      parietal: { planes: [neg(central), po, lateral], c: "#d8b08e" },
      temporal: { planes: [neg(lateral), [V(0, 0, -0.12), V(0, 0, 1)]], c: "#c49aa8" },
      occipital: { planes: [neg(po)], c: "#b5aab4" },
    };
    const cortexMats = [];
    for (const sd of L) {
      const g = hemi(sd);
      for (const [id, { planes, c }] of Object.entries(lobes)) {
        const m = mat(c, { detail: "fold", repeat: 1, bump: 1.4, roughness: 0.5, clearcoat: 0.5, transparent: true, side: THREE.DoubleSide });
        cortexMats.push(m);
        const mesh = new THREE.Mesh(planes.reduce((geo, [pt, n]) => cut(geo, pt, n.clone().negate()), g), m);   // keep the surface on the lobe's side of each sulcus
        mesh.position.set(sd * 0.006, centre.y, centre.z); add(id, mesh);
      }
    }
    k.slider("cortex", (v) => { for (const m of cortexMats) { m.opacity = 0.08 + v * 0.92; m.depthWrite = v > 0.9; } });
    // limbic structures
    for (const sd of L) {
      const hip = []; for (let i = 0; i <= 20; i++) { const t = i / 20; hip.push(V(sd * (0.07 + Math.sin(t * Math.PI) * 0.015), 0.27 - Math.sin(t * Math.PI * 0.9) * 0.02 + t * 0.06, 0.03 - t * 0.12)); }
      add("hippocampus", taper(hip, 0.016, 0.009, mat("#c98a6a", { detail: "fold", repeat: 2, bump: 1 }), 48));
      const am = new THREE.Mesh(blob(0.017, 1, 0.9, 1.1), mat("#b8574a", { detail: "tissue" })); am.position.set(sd * 0.075, 0.265, 0.05); add("amygdala", am);
      const cg = []; for (let i = 0; i <= 30; i++) { const a = Math.PI * 0.05 + (i / 30) * Math.PI * 1.15; cg.push(V(sd * 0.018, 0.34 + Math.sin(a) * 0.1, Math.cos(a) * 0.15 + 0.01)); }
      add("cingulate", tube(cg, 0.012, mat("#d4a070", { detail: "fold", repeat: 2 }), 64));
      const th = new THREE.Mesh(blob(0.028, 0.8, 0.8, 1.3), mat("#8fa3b8", { detail: "tissue" })); th.position.set(sd * 0.02, 0.32, -0.01); add("thalamus", th);
      const cd = []; for (let i = 0; i <= 20; i++) { const t = i / 20; cd.push(V(sd * (0.05 + t * 0.02), 0.36 + Math.sin(t * Math.PI) * 0.02 - t * 0.06, 0.08 - t * 0.17)); }
      add("basalGanglia", taper(cd, 0.022, 0.006, mat("#9a8a9e", { detail: "tissue" }), 48));
      const put = new THREE.Mesh(blob(0.03, 0.6, 1, 1.3), mat("#8a7a90", { detail: "tissue" })); put.position.set(sd * 0.075, 0.32, 0.03); add("basalGanglia", put);
    }
    const hyp = new THREE.Mesh(blob(0.018, 1.2, 0.8, 1), mat("#d4b06a", { detail: "tissue" })); hyp.position.set(0, 0.28, 0.035); add("hypothalamus", hyp);
    const cc = []; for (let i = 0; i <= 30; i++) { const a = Math.PI * 0.12 + (i / 30) * Math.PI * 0.95; cc.push(V(0, 0.33 + Math.sin(a) * 0.07, Math.cos(a) * 0.12)); }
    const callosum = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cc), 64, 0.012, 12), mat("#efe8dc", { detail: "fibre", repeat: 2, bump: 0.6 })); callosum.scale.set(5, 1, 1); add("corpusCallosum", callosum);
    // hindbrain
    const cb = placeReal("cerebellum"); cb.material = mat("#c99a8e", { detail: "fold", repeat: 1, bump: 2, roughness: 0.5, side: THREE.DoubleSide }); add("cerebellum", cb);
    const bs = placeReal("brainstem"); bs.material = mat("#d6b39c", { detail: "fibre", repeat: 1, bump: 0.6, side: THREE.DoubleSide }); add("brainstem", bs);
    // signals: across the callosum, round the circuit of Papez, along the dopamine pathways
    const across = []; for (let i = 0; i < 6; i++) { const z = -0.08 + i * 0.035; across.push([V(-0.13, 0.4, z), V(0, 0.38 + Math.sin(i) * 0.01, z), V(0.13, 0.4, z)]); }
    k.flow(across, "#f4ead8", 40, 0.35, "deep", 0.01);
    k.flow([[V(0.07, 0.27, 0.03), V(0.03, 0.3, -0.08), V(0.02, 0.32, -0.01), V(0.02, 0.42, 0.05), V(0.02, 0.38, -0.12), V(0.07, 0.29, -0.06)]], "#e0a070", 18, 0.25, "limbic", 0.01);
    k.flow([[V(0, 0.25, -0.04), V(0.04, 0.3, 0.02), V(0.075, 0.33, 0.04)], [V(0, 0.25, -0.04), V(0.0, 0.3, 0.1), V(0.0, 0.36, 0.17)]], "#8fd0a0", 20, 0.3, "deep", 0.009);
  },
};
