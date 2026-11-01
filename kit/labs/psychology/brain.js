// Brain anatomy explorer: a schematic left-hemisphere lateral view and a midline (medial) view. Select any region, by
// pointer or keyboard, to read what it does and the classic evidence for it; "identify" mode asks you to find regions.
// Schematic, not to scale: real boundaries are irregular and vary between people. PsychGradify's 3D brain is in 3d.html.
import { shell, panel, seg, challenges } from "../lab.js";
import { caveat, esc } from "../social/ui.js";

export const PARTS = {
  frontal: { view: "lateral", name: "Frontal lobe", fn: "Planning, decision-making, working memory, inhibiting impulses and voluntary movement (the motor cortex at its back edge). The prefrontal cortex is the last region to mature, into the mid-20s.", ev: "Phineas Gage (1848): after an iron rod passed through his frontal lobes he survived but, as his physician Harlow (1868) reported, became impulsive and unreliable. Accounts of how much he changed, and for how long, have since been questioned (Macmillan, 2000)." },
  parietal: { view: "lateral", name: "Parietal lobe", fn: "Integrates touch and body position (the somatosensory cortex at its front edge), spatial attention and number.", ev: "Damage to the right parietal lobe can cause hemispatial neglect: ignoring the left side of space, even of one's own body." },
  temporal: { view: "lateral", name: "Temporal lobe", fn: "Hearing (the primary auditory cortex), language comprehension on the left, memory (with the hippocampus on its inner surface) and recognising objects and faces.", ev: "Penfield's stimulation of the temporal lobe during epilepsy surgery sometimes evoked vivid experiences; damage to the fusiform face area can cause prosopagnosia (face blindness)." },
  occipital: { view: "lateral", name: "Occipital lobe", fn: "Vision: the primary visual cortex (V1) and areas specialised for colour, motion and form.", ev: "Hubel and Wiesel (1959, 1962) found V1 neurones tuned to edges at particular orientations (Nobel Prize, 1981). Damage causes blindness in part of the visual field." },
  motor: { view: "lateral", name: "Primary motor cortex", fn: "A strip in front of the central sulcus that sends commands for voluntary movement to the opposite side of the body, laid out as a map (the motor homunculus).", ev: "Penfield and colleagues mapped it by electrical stimulation during surgery (Penfield and Boldrey, 1937)." },
  somato: { view: "lateral", name: "Somatosensory cortex", fn: "A strip behind the central sulcus that receives touch, temperature and pain from the opposite side of the body; sensitive areas such as the lips and fingertips have the largest share.", ev: "Mapped by Penfield's stimulation studies; the map can reorganise after amputation (phantom limb research, Ramachandran)." },
  broca: { view: "lateral", name: "Broca's area", fn: "In the left frontal lobe: speech production and aspects of grammar.", ev: "Broca (1861) described a patient, Leborgne (\"Tan\"), who understood speech but could say only one syllable; post-mortem showed damage here. Modern studies show language depends on wider networks than two areas." },
  wernicke: { view: "lateral", name: "Wernicke's area", fn: "In the left temporal lobe: understanding language.", ev: "Wernicke (1874) described patients with fluent but meaningless speech and poor comprehension after damage here (Wernicke's aphasia)." },
  cerebellum: { view: "both", name: "Cerebellum", fn: "Coordinates movement, balance and timing, and contributes to motor learning and some cognitive functions.", ev: "Damage causes ataxia: clumsy, uncoordinated movement and difficulty with balance." },
  brainstem: { view: "both", name: "Brainstem", fn: "Midbrain, pons and medulla: breathing, heart rate, sleep–wake regulation and the pathways between brain and spinal cord.", ev: "Damage to the medulla can be fatal because it controls breathing and heart rate." },
  corpus: { view: "medial", name: "Corpus callosum", fn: "About 200 million axons connecting the left and right hemispheres.", ev: "Cutting it to treat severe epilepsy produced the split-brain patients studied by Sperry and Gazzaniga (Nobel Prize to Sperry, 1981)." },
  thalamus: { view: "medial", name: "Thalamus", fn: "A relay and filter for sensory information (all senses except smell) on its way to the cortex, and part of the circuits for attention and consciousness.", ev: "Thalamic strokes can cause loss of sensation on the opposite side of the body." },
  hypothalamus: { view: "medial", name: "Hypothalamus", fn: "Homeostasis: temperature, hunger, thirst and the stress response. It controls the pituitary gland, linking the brain to the endocrine system, and contains the body's master clock (the suprachiasmatic nucleus).", ev: "Lesions of the ventromedial hypothalamus made rats overeat; lateral lesions made them stop eating (classic studies from the 1940s and 1950s)." },
  pituitary: { view: "medial", name: "Pituitary gland", fn: "The \"master gland\": releases hormones (such as ACTH, growth hormone and oxytocin) that control other endocrine glands, under the hypothalamus's direction.", ev: "Part of the HPA axis in the stress response: hypothalamus → pituitary (ACTH) → adrenal cortex (cortisol)." },
  hippocampus: { view: "medial", name: "Hippocampus", fn: "Forming new episodic and spatial memories and consolidating them into long-term storage.", ev: "After both hippocampi were removed, HM could no longer form new declarative memories (Scoville and Milner, 1957), yet could learn new motor skills. London taxi drivers have larger posterior hippocampi (Maguire et al., 2000)." },
  amygdala: { view: "medial", name: "Amygdala", fn: "Detecting threat, fear conditioning and the emotional colouring of memories.", ev: "Patient SM, with bilateral amygdala damage, showed very little fear (Feinstein et al., 2011). The amygdala is drawn here on the midline view, though it lies deep in the temporal lobe." },
  basal: { view: "medial", name: "Basal ganglia", fn: "Deep nuclei (including the striatum) that select and initiate movements and are involved in habit and reward learning.", ev: "Loss of dopamine neurones projecting to the striatum causes the movement problems of Parkinson's disease. Deep structure: shown dashed because it lies to the side of the midline." },
};
const LAT = `<svg class="sx-svg" viewBox="0 0 600 400" role="group" aria-label="Brain, left side view; front is on the left">
<defs><clipPath id="sxb"><path d="M86,210 C80,118 176,52 300,48 C430,44 532,104 540,196 C546,250 520,282 478,292 L430,288 C404,322 356,330 318,320 L236,312 C184,320 132,300 108,268 C94,250 88,232 86,210Z"/></clipPath></defs>
<g clip-path="url(#sxb)">
<path data-part="frontal" d="M60,20 L262,20 L272,226 L60,230Z" fill="#7c5cff"/><path data-part="parietal" d="M262,20 L460,20 L440,206 L272,226Z" fill="#22a6b3"/>
<path data-part="occipital" d="M460,20 L600,20 L600,320 L452,300 L440,206Z" fill="#e1709a"/><path data-part="temporal" d="M60,230 L272,226 L440,206 L452,300 L320,350 L60,360Z" fill="#e8a33d"/></g>
<path data-part="motor" d="M246,52 C254,110 260,170 262,226 L248,228 C246,170 240,110 232,54Z" fill="#a78bfa"/><path data-part="somato" d="M266,50 C274,110 280,170 280,224 L268,226 C266,170 262,110 254,52Z" fill="#5eead4"/>
<ellipse data-part="broca" cx="196" cy="222" rx="30" ry="20" fill="#c4b5fd"/><ellipse data-part="wernicke" cx="398" cy="236" rx="32" ry="20" fill="#fde68a"/>
<ellipse data-part="cerebellum" cx="452" cy="318" rx="62" ry="34" fill="#94a3b8"/><path data-part="brainstem" d="M356,300 L392,300 L398,392 L366,392Z" fill="#64748b"/>
<g font-size="13" fill="#0b0c0e" font-weight="600" pointer-events="none"><text x="150" y="140">Frontal</text><text x="320" y="120">Parietal</text><text x="476" y="190">Occipital</text><text x="300" y="282">Temporal</text></g></svg>`;
const MED = `<svg class="sx-svg" viewBox="0 0 600 400" role="group" aria-label="Brain, midline view from the inside of the right hemisphere; front is on the left">
<path d="M86,210 C80,118 176,52 300,48 C430,44 532,104 540,196 C546,250 520,282 478,292 L430,288 C404,322 356,330 318,320 L236,312 C184,320 132,300 108,268 C94,250 88,232 86,210Z" fill="#2a2f3a" stroke="#475569"/>
<path data-part="corpus" d="M178,170 C220,112 380,104 432,160 C436,172 424,176 416,168 C372,126 228,132 196,178 C190,186 172,180 178,170Z" fill="#e2e8f0"/>
<path data-part="basal" d="M232,178 C250,156 300,150 322,170 C312,196 252,204 232,178Z" fill="none" stroke="#f472b6" stroke-width="3" stroke-dasharray="6 4"/>
<ellipse data-part="thalamus" cx="320" cy="196" rx="40" ry="24" fill="#60a5fa"/><ellipse data-part="hypothalamus" cx="268" cy="232" rx="22" ry="14" fill="#34d399"/>
<circle data-part="pituitary" cx="256" cy="268" r="10" fill="#a3e635"/><path data-part="hippocampus" d="M300,250 C330,262 370,262 392,246 C398,252 396,262 388,266 C362,282 324,280 296,262Z" fill="#fbbf24"/>
<circle data-part="amygdala" cx="290" cy="258" r="12" fill="#ef4444"/><ellipse data-part="cerebellum" cx="452" cy="300" rx="58" ry="32" fill="#94a3b8"/><path data-part="brainstem" d="M342,240 L384,246 L398,392 L362,392Z" fill="#64748b"/></svg>`;

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-row sx-mode"></div><div class="sx-view"></div><div class="sx-btns sx-list" role="group" aria-label="Regions"></div></div><div class="lab-ctrl"><div class="sx-card" aria-live="polite"></div></div></div>`);
  const view = $(".sx-view"), btns = $(".sx-btns"), card = $(".sx-card"), ctrl = $(".lab-ctrl");
  caveat(ctrl, "Schematic and not to scale. Functions are spread across networks: a region “for” something is necessary or especially involved, not the only place it happens.");
  const seen = new Set(); let side = "lateral", identify = ctx.mode === "identify", target = null, streak = 0;
  const ch = challenges(ctrl, ctx, identify ? [{ id: "five", text: "Identify five regions in a row", test: (x) => x.streak >= 5 }, { id: "medial", text: "Identify the hippocampus, amygdala and hypothalamus", test: (x) => ["hippocampus", "amygdala", "hypothalamus"].every((k) => x.found.has(k)) }]
    : [{ id: "lobes", text: "Explore all four lobes", test: () => ["frontal", "parietal", "temporal", "occipital"].every((k) => seen.has(k)) }, { id: "limbic", text: "Explore the limbic structures: hippocampus, amygdala, hypothalamus and thalamus", test: () => ["hippocampus", "amygdala", "hypothalamus", "thalamus"].every((k) => seen.has(k)) }, { id: "all", text: "Explore every region", test: () => Object.keys(PARTS).every((k) => seen.has(k)) }]);
  const found = new Set();
  seg($(".lab-row.sx-mode"), [["lateral", "Side view"], ["medial", "Midline view"]], side, (v) => { side = v; draw(); if (identify) ask(); });
  const list = () => Object.entries(PARTS).filter(([, p]) => p.view === side || p.view === "both");
  function draw() {
    view.innerHTML = side === "lateral" ? LAT : MED;
    view.querySelectorAll("[data-part]").forEach((p) => { p.setAttribute("tabindex", "0"); p.setAttribute("role", "button"); p.setAttribute("aria-label", PARTS[p.dataset.part].name); });
    btns.innerHTML = identify ? "" : list().map(([k, p]) => `<button type="button" data-k="${k}">${esc(p.name)}</button>`).join("");
  }
  function show(k) {
    view.querySelectorAll("[data-part]").forEach((p) => p.classList.toggle("on", p.dataset.part === k));
    if (identify) {
      const ok = k === target; streak = ok ? streak + 1 : 0; if (ok) found.add(k); ch.check({ streak, found });
      card.innerHTML = `<h5>${ok ? "✓ Correct" : `✗ That's the ${esc(PARTS[k].name)}`}</h5><p>${ok ? esc(PARTS[k].fn) : "Try again."}</p><p><small>Streak: ${streak}</small></p>`;
      if (ok) setTimeout(ask, 1100); return;
    }
    seen.add(k); ch.check({}); const p = PARTS[k];
    card.innerHTML = `<h5>${esc(p.name)}</h5><p>${esc(p.fn)}</p><p><b>Evidence:</b> ${esc(p.ev)}</p>`;
    btns.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === k));
  }
  function ask() { const L = list(); target = L[Math.floor(Math.random() * L.length)][0]; card.innerHTML = `<h5>Find the ${esc(PARTS[target].name)}</h5><p>Select it on the diagram (Tab to move between regions, Enter to choose).</p>`; }
  view.addEventListener("click", (e) => { const p = e.target.closest("[data-part]"); if (p) show(p.dataset.part); });
  view.addEventListener("keydown", (e) => { const p = e.target.closest("[data-part]"); if (p && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); show(p.dataset.part); } });
  btns.addEventListener("click", (e) => { const b = e.target.closest("button[data-k]"); if (b) show(b.dataset.k); });
  draw(); if (identify) ask(); else show("frontal");
}
