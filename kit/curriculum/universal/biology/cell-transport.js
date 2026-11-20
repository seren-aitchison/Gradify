// Layer 1, Biology, cell transport: the canonical knowledge records for membranes, diffusion, osmosis and active
// transport. One record per concept, used by every course and pathway that teaches it (kit/curriculum/mappings/).
//
// A record holds the knowledge (definition, explanation, misconceptions, sources) and, per level band, what a learner
// is expected to do, which terms belong at that band, and what lies beyond it. It is not a lesson: lessons stay in
// kit/courses/<slug>/notes/ and are written for their own learners. Changing a record means raising its version and
// adding a changelog line; the engine then flags every lesson bound to it for review (it never rewrites them).
//
// Drawn on 2026-11-19 from the Gradify lessons that teach these ideas (Biology u02-17 to u02-23, Chemistry u05-17,
// Physics u34-05) and the sources below. Sources are cited, not yet checked claim by claim: review.status says so.

const SRC = {
  membranes: { cite: "OpenStax, Biology 2e, section 5.1 \"Components and Structure\"", kind: "secondary", date: "2018", url: "https://openstax.org/books/biology-2e/pages/5-1-components-and-structure", checked: null },
  passive: { cite: "OpenStax, Biology 2e, section 5.2 \"Passive Transport\"", kind: "secondary", date: "2018", url: "https://openstax.org/books/biology-2e/pages/5-2-passive-transport", checked: null },
  active: { cite: "OpenStax, Biology 2e, section 5.3 \"Active Transport\"", kind: "secondary", date: "2018", url: "https://openstax.org/books/biology-2e/pages/5-3-active-transport", checked: null },
  aquaporin: { cite: "Preston G.M., Carroll T.P., Guggino W.B. and Agre P., \"Appearance of water channels in Xenopus oocytes expressing red cell CHIP28 protein\", Science 256:385–387", kind: "primary", date: "1992", url: "https://doi.org/10.1126/science.256.5055.385", checked: null },
  colligative: { cite: "OpenStax, Chemistry 2e, section 11.4 \"Colligative Properties\"", kind: "secondary", date: "2019", url: "https://openstax.org/books/chemistry-2e/pages/11-4-colligative-properties", checked: null },
};
const FIRST = [{ version: 1, date: "2026-11-19", change: "First record, drawn from the Gradify lessons that teach it and the sources listed." }];
const PENDING = { status: "needs_review", by: null, on: null };
// "partially permeable" is the term AQA, OCR and Pearson Edexcel biology specifications use; other terms are correct
// but are flagged in exam-facing lessons so learners meet the wording they will be marked against
const PERMEABLE = [
  { term: "semipermeable", prefer: "partially permeable", bands: ["upper-secondary", "post-16"], note: "Common in chemistry and physics and not wrong, but UK biology specifications say \"partially permeable\"." },
  { term: "selectively permeable", prefer: "partially permeable", bands: ["upper-secondary", "post-16"], note: "Used by many textbooks (OpenStax among them); UK biology specifications say \"partially permeable\"." },
];

export const CONCEPTS = [
  {
    id: "BIO-CELL-MEMBRANE-001", version: 1, title: "Cell membranes", subject: "biology", domain: "cell biology", type: "structure",
    definition: "The cell membrane is the thin boundary of a cell, made of a phospholipid bilayer with proteins in it, that controls which substances enter and leave.",
    explanation: "Every cell is bounded by a membrane about 7 to 10 nanometres thick. Its basis is a bilayer of phospholipids: their hydrophilic phosphate heads face the watery cytoplasm and surroundings, and their hydrophobic fatty-acid tails face each other in the middle. Small non-polar molecules such as oxygen and carbon dioxide pass through the bilayer easily; ions and most polar molecules cannot, and cross only through proteins in the membrane. Because some substances pass and others do not, the membrane is partially permeable. The fluid mosaic model describes it: the lipids and many proteins move sideways within the layer, and the proteins are scattered through it like tiles in a mosaic.",
    prerequisites: [], related: ["BIO-CELL-DIFFUSION-001", "BIO-CELL-OSMOSIS-001", "BIO-CELL-ACTIVE-TRANSPORT-001"],
    terms: { preferred: ["cell membrane", "partially permeable membrane", "phospholipid bilayer"], variants: PERMEABLE },
    levels: {
      "lower-secondary": { expects: ["State that the cell membrane controls what enters and leaves the cell", "Identify the membrane in diagrams of animal and plant cells and distinguish it from the cell wall"], terms: ["cell membrane"], beyond: ["phospholipid", "fluid mosaic"] },
      "upper-secondary": { expects: ["Describe the membrane as partially permeable", "Explain why the membrane is needed for diffusion, osmosis and active transport to be controlled"], terms: ["cell membrane", "partially permeable membrane"], beyond: ["fluid mosaic", "glycoprotein"] },
      "post-16": { expects: ["Describe the fluid mosaic model, including phospholipids, proteins, cholesterol, glycoproteins and glycolipids", "Explain how the structure of the bilayer determines which substances cross it unaided"], terms: ["phospholipid bilayer", "fluid mosaic model", "channel protein", "carrier protein"] },
      undergraduate: { expects: ["Relate membrane composition, asymmetry and fluidity to permeability and protein function", "Explain how membrane potential arises from selective permeability and ion pumps"] },
    },
    misconceptions: [
      "The cell membrane and the cell wall are the same thing: plant cells have both, and the wall is fully permeable to water and small solutes.",
      "The membrane is a solid sheet: its lipids and many of its proteins move sideways within it.",
    ],
    sources: [SRC.membranes], review: PENDING, changelog: FIRST,
  },
  {
    id: "BIO-CELL-DIFFUSION-001", version: 1, title: "Diffusion", subject: "biology", domain: "cell biology", type: "process",
    definition: "Diffusion is the net movement of particles from a region where they are at a higher concentration to a region where they are at a lower concentration, as a result of their random motion.",
    explanation: "Particles in a liquid or gas move at random. Where there are more of them, more move away than arrive, so over time there is a net movement down the concentration gradient until the concentrations are even; particles still move after that, but with no net change. Diffusion is passive: the energy comes from the particles' own kinetic energy, not from the cell. Its rate increases with a steeper concentration gradient, a larger surface area, a shorter distance and a higher temperature, which is why exchange surfaces such as alveoli, villi and gill filaments are large, thin and well supplied with blood or water flow. Fick's law states this quantitatively. Substances that cannot cross the lipid bilayer can diffuse through channel or carrier proteins, called facilitated diffusion.",
    prerequisites: [], related: ["BIO-CELL-OSMOSIS-001", "BIO-CELL-MEMBRANE-001"],
    terms: { preferred: ["diffusion", "concentration gradient"], variants: [] },
    levels: {
      "lower-secondary": { expects: ["Describe diffusion as the spreading out of particles from where they are more concentrated to where they are less concentrated", "Give examples of diffusion into and out of cells, such as oxygen and carbon dioxide"], terms: ["diffusion", "concentration"], beyond: ["Fick's law", "facilitated diffusion"] },
      "upper-secondary": { expects: ["Define diffusion in terms of net movement down a concentration gradient", "Explain how concentration gradient, temperature and surface area affect the rate of diffusion", "Explain how surface area to volume ratio and the features of exchange surfaces increase the rate of exchange"], terms: ["diffusion", "concentration gradient", "surface area to volume ratio"], beyond: ["Fick's law"] },
      "post-16": { expects: ["Explain simple and facilitated diffusion, including the roles of channel and carrier proteins", "Use Fick's law qualitatively to explain the adaptations of exchange surfaces"], terms: ["facilitated diffusion", "channel protein", "carrier protein", "Fick's law"] },
      undergraduate: { expects: ["Apply Fick's first law with a diffusion coefficient and permeability to calculate flux across a membrane", "Explain why diffusion is fast over micrometres and impractically slow over millimetres"] },
    },
    misconceptions: [
      "Diffusion stops when concentrations are equal: particles keep moving; only the net movement stops.",
      "Diffusion needs energy from the cell: it is passive.",
    ],
    sources: [SRC.passive], review: PENDING, changelog: FIRST,
  },
  {
    id: "BIO-CELL-OSMOSIS-001", version: 1, title: "Osmosis", subject: "biology", domain: "cell biology", type: "process",
    definition: "Osmosis is the net movement of water across a partially permeable membrane, from a more dilute solution (higher water potential) to a more concentrated one (lower water potential).",
    explanation: "Water molecules cross a partially permeable membrane in both directions. Where the solution on one side contains more dissolved solute that cannot cross the membrane, water molecules there are less free to move, so more water crosses towards that side than away from it: this net flow is osmosis. It is passive, driven by the random motion of molecules rather than by energy from the cell. Biologists describe it with water potential (ψ): pure water has ψ = 0, solutes lower it (the solute potential), and pressure, such as a plant cell wall pushing back, raises it (the pressure potential), so ψ = ψs + ψp and water moves from higher to lower water potential. An animal cell in a more dilute solution gains water and may burst; in a more concentrated one it shrinks. A plant cell in a dilute solution becomes turgid, its wall preventing it from bursting; in a concentrated one it loses water and its membrane pulls away from the wall (plasmolysis). Water crosses a bare lipid bilayer slowly; most crosses faster through channel proteins called aquaporins.",
    prerequisites: ["BIO-CELL-DIFFUSION-001", "BIO-CELL-MEMBRANE-001"], related: ["BIO-CELL-ACTIVE-TRANSPORT-001"],
    terms: { preferred: ["osmosis", "partially permeable membrane", "water potential"], variants: PERMEABLE },
    levels: {
      "upper-secondary": {
        expects: [
          "Define osmosis as the diffusion of water from a dilute solution to a concentrated solution through a partially permeable membrane",
          "Describe and explain the effects of osmosis on animal and plant cells, including turgid, flaccid and plasmolysed plant cells",
          "Calculate percentage change in mass of plant tissue in a range of solutions, and use a graph to estimate the concentration with no net change",
        ],
        terms: ["osmosis", "partially permeable membrane", "dilute", "concentrated", "turgid", "flaccid", "plasmolysis"],
        beyond: ["water potential", "solute potential", "pressure potential", "ψ"],
      },
      "post-16": {
        expects: [
          "Define osmosis in terms of water potential and explain why pure water has the highest water potential, zero",
          "Calculate water potential using ψ = ψs + ψp and predict the direction of water movement between cells and solutions",
          "Use a dilution series and a calibration curve to estimate the water potential of plant tissue",
        ],
        terms: ["water potential", "solute potential", "pressure potential", "isotonic", "hypotonic", "hypertonic", "plasmolysis"],
        beyond: ["chemical potential"],
      },
      undergraduate: {
        expects: [
          "Relate water potential to the chemical potential of water and osmotic pressure to the van 't Hoff relation for dilute solutions",
          "Explain the role of aquaporins in membrane water permeability and how cells regulate their volume",
        ],
      },
    },
    misconceptions: [
      "Solutes move by osmosis: osmosis is the movement of water; solutes move by diffusion or transport.",
      "Water moves towards the side with more water: net movement is towards the more concentrated solution, which has less free water.",
      "In a solution of equal water potential no water moves: water still crosses both ways, with no net movement.",
      "Osmosis uses energy from the cell: it is passive.",
    ],
    perspectives: {
      chemistry: "A colligative property: the osmotic pressure of a dilute solution is Π = iMRT, the pressure needed to stop osmosis, and reverse osmosis applies more than this to push solvent the other way.",
      physics: "A transport process across a membrane driven by a difference in the free energy of water, comparable with diffusion and flow driven by pressure.",
    },
    sources: [SRC.passive, SRC.aquaporin, SRC.colligative], review: PENDING, changelog: FIRST,
  },
  {
    id: "BIO-CELL-ACTIVE-TRANSPORT-001", version: 1, title: "Active transport", subject: "biology", domain: "cell biology", type: "process",
    definition: "Active transport is the movement of a substance across a membrane against its concentration gradient, through carrier proteins, using energy from the cell.",
    explanation: "Cells often need to take in substances that are scarcer outside than inside, or to remove substances that are already more concentrated outside. Diffusion cannot do this. Carrier proteins in the membrane bind the substance on one side and, using energy, change shape to release it on the other. The energy comes from respiration, through ATP. Root hair cells take up mineral ions from dilute soil water this way, and the small intestine absorbs glucose when its concentration in the gut is low. The sodium–potassium pump uses one ATP to move three sodium ions out of a cell and two potassium ions in, keeping the gradients that nerve impulses and much other transport depend on. In co-transport, a carrier moves one substance against its gradient by letting another, usually sodium ions, move down theirs.",
    prerequisites: ["BIO-CELL-DIFFUSION-001", "BIO-CELL-MEMBRANE-001"], related: ["BIO-CELL-OSMOSIS-001"],
    terms: { preferred: ["active transport", "carrier protein", "concentration gradient"], variants: [] },
    levels: {
      "upper-secondary": { expects: ["Describe active transport as movement against a concentration gradient that needs energy from respiration", "Explain how active transport lets root hair cells absorb mineral ions and the gut absorb sugar", "Compare diffusion, osmosis and active transport"], terms: ["active transport", "concentration gradient", "respiration"], beyond: ["co-transport", "sodium–potassium pump"] },
      "post-16": { expects: ["Explain how carrier proteins use the hydrolysis of ATP to move substances against a gradient", "Explain co-transport, including the absorption of glucose with sodium ions in the ileum"], terms: ["carrier protein", "ATP", "co-transport"] },
      undergraduate: { expects: ["Distinguish primary and secondary active transport and give the stoichiometry of the sodium–potassium ATPase", "Explain how electrochemical gradients store energy that secondary transporters use"] },
    },
    misconceptions: [
      "Active transport is any transport that happens in a living cell: it is specifically movement against a gradient using energy.",
      "Channel proteins carry out active transport: active transport uses carrier proteins (pumps); channels allow only passive movement.",
    ],
    sources: [SRC.active], review: PENDING, changelog: FIRST,
  },
];
