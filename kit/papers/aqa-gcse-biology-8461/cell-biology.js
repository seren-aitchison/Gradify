// Past Papers: AQA GCSE Biology (8461), 4.1 Cell biology. Gradify's own exam-style questions (source "gradify"):
// none of the wording is taken from AQA papers, mark schemes or the specification. Format: kit/papers/model.js.
// Lessons are SciGradify Biology lesson ids, the ones the specification map gives each point.
import { mcq, tf, num, order, match, written } from "../model.js";

// the points of 4.1 with Gradify's own short titles. They mirror kit/specs/aqa-gcse-biology-8461.js on the
// Specification Mastery branch; tests/papers.test.mjs checks the two agree whenever that file is present.
export const TOPIC = {
  id: "4.1", title: "Cell biology", groups: [
    { id: "4.1.1", title: "Cell structure", points: [
      { id: "4.1.1.1", title: "Eukaryotes and prokaryotes", lessons: ["u02-02", "u02-03", "u02-07"] },
      { id: "4.1.1.2", title: "Animal and plant cells", lessons: ["u02-04", "u02-05", "u02-08", "u02-09", "u02-10", "u02-11", "u02-12"] },
      { id: "4.1.1.3", title: "Cell specialisation", lessons: ["u02-25"] },
      { id: "4.1.1.4", title: "Cell differentiation", lessons: ["u02-27"] },
      { id: "4.1.1.5", title: "Microscopy", lessons: ["u09-26", "u01-14"] },
      { id: "4.1.1.6", title: "Culturing microorganisms", lessons: ["u09-25", "u09-04"], sep: true },
    ] },
    { id: "4.1.2", title: "Cell division", points: [
      { id: "4.1.2.1", title: "Chromosomes", lessons: ["u04-05"] },
      { id: "4.1.2.2", title: "Mitosis and the cell cycle", lessons: ["u05-01", "u05-02", "u05-03"] },
      { id: "4.1.2.3", title: "Stem cells", lessons: ["u02-26", "u05-14"] },
    ] },
    { id: "4.1.3", title: "Transport in cells", points: [
      { id: "4.1.3.1", title: "Diffusion", lessons: ["u02-20"] },
      { id: "4.1.3.2", title: "Osmosis", lessons: ["u02-21"] },
      { id: "4.1.3.3", title: "Active transport", lessons: ["u02-23"] },
    ] },
  ],
};

const S = (text, marks = 1) => ({ text, marks });

export default {
  id: "aqa-gcse-biology-8461/cell-biology",
  spec: "aqa-gcse-biology-8461", topic: "4.1", title: "Cell biology", source: "gradify",
  official: { label: "AQA GCSE Biology past papers and mark schemes", url: "https://www.aqa.org.uk/find-past-papers-and-mark-schemes" },
  questions: [
    // ---------- 4.1.1.1 Eukaryotes and prokaryotes ----------
    { id: "cb-01", points: ["4.1.1.1"], tier: "both",
      context: "Bacteria are prokaryotic cells. Animal cells are eukaryotic cells.",
      parts: [
        { id: "a", marks: 1, lessons: ["u02-02", "u02-07"],
          Q: mcq("Which structure is found in a bacterial cell but not in an animal cell?", "Plasmid", [["Nucleus", "Animal cells have a nucleus; bacteria don't."], ["Mitochondrion", "Animal cells have mitochondria; bacteria don't."], ["Cell membrane", "Both kinds of cell have a cell membrane."]]),
          scheme: [S("Plasmid")], model: "Plasmid.",
          examiner: "One mark for plasmid. Ribosomes, cell membranes and cytoplasm are in both kinds of cell, so they can't be the answer.",
          mistakes: ["Choosing the cell membrane or ribosomes: every cell has them.", "Thinking bacteria have a nucleus because they have DNA: their DNA is free in the cytoplasm."] },
        { id: "b", marks: 2, lessons: ["u02-02", "u02-03"],
          Q: written("Describe two ways the genetic material of a bacterial cell is different from the genetic material of an animal cell.", "A bacterial cell has no nucleus, so its DNA is free in the cytoplasm. Its main DNA is a single loop, and it may also have small rings of DNA called plasmids.", [
            S("It isn't enclosed in a nucleus (it's free in the cytoplasm)"), S("The main DNA is a single loop (one circular chromosome)"), S("There may be plasmids (small rings of DNA)")]),
          scheme: [S("It isn't enclosed in a nucleus (it's free in the cytoplasm)"), S("The main DNA is a single loop (one circular chromosome)"), S("There may be plasmids (small rings of DNA)")],
          model: "A bacterial cell has no nucleus, so its DNA is free in the cytoplasm. Its main DNA is a single loop, and it may also have small rings of DNA called plasmids.",
          examiner: "One mark for each of two differences, from three. Each must describe the bacterial genetic material, not the cell in general.",
          mistakes: ["Writing 'bacteria have no DNA': they do, it just isn't in a nucleus.", "Describing a difference that isn't about genetic material, such as the cell wall, which earns nothing here."] },
        { id: "c", marks: 1, lessons: ["u02-03"],
          Q: num("A typical animal cell is 0.02 mm across. A typical bacterial cell is 2 µm long. How many times larger is the animal cell?", 10, { why: "0.02 mm = 20 µm, and 20 ÷ 2 = 10: one order of magnitude." }),
          check: () => (0.02 * 1000) / 2,
          scheme: [S("10 (convert to the same unit first: 0.02 mm = 20 µm)")], model: "0.02 mm = 20 µm, so 20 ÷ 2 = 10 times larger.",
          examiner: "The mark is for 10. Both sizes must be in the same unit before dividing: 1 mm = 1000 µm.",
          mistakes: ["Dividing 2 by 0.02 without converting, which gives 100.", "Converting the wrong way (0.02 mm = 0.00002 µm)."] },
      ] },

    // ---------- 4.1.1.2 Animal and plant cells ----------
    { id: "cb-02", points: ["4.1.1.2"], tier: "both",
      parts: [
        { id: "a", marks: 2, lessons: ["u02-04", "u02-05", "u02-08", "u02-09"],
          Q: match("Match each part of a cell to its function.", [["Mitochondrion", "Where aerobic respiration happens"], ["Ribosome", "Where proteins are made"], ["Chloroplast", "Absorbs light for photosynthesis"], ["Cell wall", "Strengthens and supports the cell"]]),
          scheme: [S("All four correct: 2 marks"), S("Two or three correct: 1 mark")],
          model: "Mitochondrion: aerobic respiration. Ribosome: protein synthesis. Chloroplast: absorbs light for photosynthesis. Cell wall: strengthens and supports the cell.",
          examiner: "Two marks for four correct matches; one mark for two or three.",
          mistakes: ["Saying mitochondria 'make energy': energy can't be made. Respiration releases energy.", "Mixing up the cell wall (support) and the cell membrane (controls what enters and leaves)."] },
        { id: "b", marks: 2, lessons: ["u02-05", "u02-11"],
          Q: written("A student says that the root hair cells of a plant contain many chloroplasts. Explain why the student is wrong.", "Chloroplasts absorb light for photosynthesis. Root hair cells are underground, where there is no light, so they have no chloroplasts.", [
            S("Chloroplasts absorb light for photosynthesis"), S("Root hair cells are underground / get no light, so chloroplasts would be no use")]),
          scheme: [S("Chloroplasts absorb light for photosynthesis"), S("Root hair cells are underground / get no light, so chloroplasts would be no use")],
          model: "Chloroplasts absorb light for photosynthesis. Root hair cells are underground, where there is no light, so they have no chloroplasts.",
          examiner: "One mark for what chloroplasts do and one for linking it to where root hair cells are. 'Not all plant cells have chloroplasts' alone doesn't explain why.",
          mistakes: ["Saying 'plant cells don't have chloroplasts': many do; the point is that these ones are in the dark.", "Describing the root hair's shape, which doesn't answer the question."] },
      ] },

    // ---------- 4.1.1.3 Cell specialisation ----------
    { id: "cb-03", points: ["4.1.1.3"], tier: "both",
      parts: [
        { id: "a", marks: 3, lessons: ["u02-25"],
          Q: written("Explain how a sperm cell is adapted to its function.", "A sperm cell has a tail so it can swim to the egg. It contains many mitochondria, which release the energy the tail needs. The acrosome at its head contains enzymes that digest a way into the egg.", [
            S("A tail to swim to the egg"), S("Many mitochondria to release energy for swimming / moving the tail"), S("An acrosome with enzymes to digest (break down) the egg's outer layer"), S("A nucleus with half the genetic material (one set of chromosomes) to combine with the egg's")]),
          scheme: [S("A tail to swim to the egg"), S("Many mitochondria to release energy for swimming / moving the tail"), S("An acrosome with enzymes to digest (break down) the egg's outer layer"), S("A nucleus with half the genetic material (one set of chromosomes) to combine with the egg's")],
          model: "A sperm cell has a tail so it can swim to the egg. It contains many mitochondria, which release the energy the tail needs. The acrosome at its head contains enzymes that digest a way into the egg.",
          examiner: "Any three, one mark each. Each mark needs the feature and what it does: 'it has a tail' alone is a description, not an explanation.",
          mistakes: ["Listing features without saying what each one is for.", "Writing that mitochondria 'make energy' or 'give energy': respiration in the mitochondria releases energy."] },
      ] },

    // ---------- 4.1.1.4 Cell differentiation ----------
    { id: "cb-04", points: ["4.1.1.4"], tier: "both",
      parts: [
        { id: "a", marks: 2, lessons: ["u02-27"],
          Q: written("What is meant by cell differentiation?", "Differentiation is the process by which a cell becomes specialised: it develops the sub-cellular structures it needs to carry out a particular function.", [
            S("A cell becomes specialised (for a particular job)"), S("It develops different sub-cellular structures / changes its structure to carry out that function")]),
          scheme: [S("A cell becomes specialised (for a particular job)"), S("It develops different sub-cellular structures / changes its structure to carry out that function")],
          model: "Differentiation is the process by which a cell becomes specialised: it develops the sub-cellular structures it needs to carry out a particular function.",
          examiner: "One mark for becoming specialised and one for how: by gaining the structures suited to its function.",
          mistakes: ["Confusing differentiation with cell division: dividing makes more cells; differentiating makes them different.", "Writing 'a cell changes' without saying it becomes specialised."] },
        { id: "b", marks: 1, lessons: ["u02-27"],
          Q: tf("Most animal cells differentiate at an early stage of development, but many plant cells keep the ability to differentiate throughout the plant's life.", true, "In mature animals, cell division is mainly for repair and replacement; plants keep growing from meristems all their lives."),
          scheme: [S("True")], model: "True.",
          examiner: "One mark for True.",
          mistakes: ["Thinking adult animals can't make any new cells: they can, mainly for repair and replacement."] },
      ] },

    // ---------- 4.1.1.5 Microscopy ----------
    { id: "cb-05", points: ["4.1.1.5"], tier: "both",
      context: "A student draws a cheek cell seen through a light microscope. The cell in the drawing is 30 mm long, and the magnification is ×1500.",
      parts: [
        { id: "a", marks: 2, lessons: ["u01-14", "u09-26"],
          Q: num("Calculate the real length of the cell in micrometres (µm).", 20, { unit: "µm", why: "Real size = image size ÷ magnification = 30 mm ÷ 1500 = 0.02 mm, and 0.02 mm × 1000 = 20 µm." }),
          check: () => (30 / 1500) * 1000,
          scheme: [S("Real size = image size ÷ magnification: 30 ÷ 1500 = 0.02 mm"), S("Converted to micrometres: 20 µm")],
          model: "Real size = image size ÷ magnification = 30 ÷ 1500 = 0.02 mm. 0.02 mm × 1000 = 20 µm.",
          examiner: "Two marks for 20 µm. In an exam a wrong final answer can still earn one mark for correct working (30 ÷ 1500), so always show it. Here only the final answer is checked.",
          mistakes: ["Multiplying by the magnification instead of dividing.", "Leaving the answer in millimetres when micrometres were asked for.", "Multiplying by 100 instead of 1000 to convert mm to µm."] },
        { id: "b", marks: 2, lessons: ["u09-26"],
          Q: written("Ribosomes can be seen with an electron microscope but not with a light microscope. Explain why.", "An electron microscope has a much higher resolution than a light microscope. Ribosomes are so small that a light microscope can't resolve them, so they can only be seen clearly with an electron microscope.", [
            S("An electron microscope has a higher resolution (resolving power)"), S("Ribosomes are too small to be resolved (distinguished) with a light microscope")]),
          scheme: [S("An electron microscope has a higher resolution (resolving power)"), S("Ribosomes are too small to be resolved (distinguished) with a light microscope")],
          model: "An electron microscope has a much higher resolution than a light microscope. Ribosomes are so small that a light microscope can't resolve them, so they can only be seen clearly with an electron microscope.",
          examiner: "The key word is resolution. 'Higher magnification' alone gets no credit: magnifying an image doesn't show more detail unless the resolution is high enough.",
          mistakes: ["Writing only 'it magnifies more'.", "Saying ribosomes are 'invisible' or 'transparent', rather than too small to resolve."] },
      ] },

    // ---------- 4.1.1.6 Culturing microorganisms (Biology only) ----------
    { id: "cb-06", points: ["4.1.1.6"], tier: "both", sep: true,
      parts: [
        { id: "a", marks: 2, lessons: ["u09-25"],
          Q: num("A bacterium divides once every 20 minutes. Starting with one bacterium, how many bacteria will there be after 3 hours, if every cell keeps dividing?", 512, { why: "3 hours = 180 minutes = 9 divisions, so 2⁹ = 512." }),
          check: () => 2 ** ((3 * 60) / 20),
          scheme: [S("Number of divisions: 180 ÷ 20 = 9"), S("2⁹ = 512 bacteria")],
          model: "3 hours = 180 minutes. 180 ÷ 20 = 9 divisions. The number doubles each time: 2⁹ = 512.",
          examiner: "One mark for finding 9 divisions and one for 512. The number doubles at each division; it doesn't go up by two.",
          mistakes: ["Multiplying 9 × 2 = 18 instead of doubling nine times.", "Using 3 ÷ 20 without converting hours to minutes."] },
        { id: "b", marks: 2, lessons: ["u09-25", "u09-04"],
          Q: written("Give two precautions a student should take when preparing a culture of bacteria on an agar plate, to avoid contaminating it.", "Pass the inoculating loop through a flame before using it, to kill any microorganisms on it, and keep the lid on the Petri dish, lifting it only slightly and taping it shut, so microorganisms from the air can't get in.", [
            S("Sterilise the inoculating loop by passing it through a flame"), S("Sterilise the Petri dish and agar before use"), S("Lift the lid only slightly / work near a Bunsen flame"), S("Secure the lid with tape (but don't seal it all the way round)")]),
          scheme: [S("Sterilise the inoculating loop by passing it through a flame"), S("Sterilise the Petri dish and agar before use"), S("Lift the lid only slightly / work near a Bunsen flame"), S("Secure the lid with tape (but don't seal it all the way round)")],
          model: "Pass the inoculating loop through a flame before using it, to kill any microorganisms on it, and keep the lid on the Petri dish, lifting it only slightly and taping it shut, so microorganisms from the air can't get in.",
          examiner: "Any two, one mark each. Precautions to protect the student (such as washing hands) aren't what's asked: this question is about keeping the culture pure.",
          mistakes: ["Sealing the lid all the way round: that stops oxygen getting in, which can encourage harmful anaerobic bacteria.", "Giving 'wear gloves' or 'wash hands', which protect the person rather than the culture."] },
        { id: "c", marks: 1, lessons: ["u09-25"],
          Q: mcq("Why are cultures in school laboratories incubated at no higher than 25 °C?", "To reduce the chance of growing bacteria that are harmful to humans", [["Because bacteria are killed above 25 °C", "Many bacteria grow well above 25 °C, including those that live in the human body at 37 °C."], ["To make the bacteria grow as fast as possible", "Bacteria often grow faster at higher temperatures; 25 °C is chosen for safety."], ["Because agar melts above 25 °C", "Agar stays solid well above 25 °C."]]),
          scheme: [S("To reduce the chance of growing pathogens (harmful to humans)")], model: "To reduce the chance of growing bacteria that are harmful to humans.",
          examiner: "One mark. Human pathogens grow best near body temperature, 37 °C.",
          mistakes: ["Thinking bacteria die above 25 °C."] },
      ] },

    // ---------- 4.1.2.1 Chromosomes ----------
    { id: "cb-07", points: ["4.1.2.1"], tier: "both",
      parts: [
        { id: "a", marks: 1, lessons: ["u04-05"],
          Q: mcq("How many chromosomes are there in the nucleus of a human body cell?", "46", [["23", "23 is the number in a sperm or egg cell, or the number of pairs in a body cell."], ["92", "Too many: 92 would be twice the normal number."], ["44", "44 is the number of non-sex chromosomes; there are two sex chromosomes as well."]]),
          scheme: [S("46")], model: "46 (23 pairs).",
          examiner: "One mark for 46.",
          mistakes: ["Giving 23, the number of pairs, or the number in a gamete."] },
        { id: "b", marks: 1, lessons: ["u04-05"],
          Q: tf("In body cells, chromosomes are normally found in pairs.", true, "One chromosome of each pair comes from each parent."),
          scheme: [S("True")], model: "True.",
          examiner: "One mark for True.",
          mistakes: ["Mixing up body cells (pairs) with gametes (one of each pair)."] },
      ] },

    // ---------- 4.1.2.2 Mitosis and the cell cycle ----------
    { id: "cb-08", points: ["4.1.2.2"], tier: "both",
      parts: [
        { id: "a", marks: 2, lessons: ["u05-01", "u05-02"],
          Q: order("Put these events of the cell cycle in order, starting with the first.", ["The cell grows and its DNA is copied", "One set of chromosomes is pulled to each end of the cell", "The nucleus divides", "The cytoplasm and cell membrane divide to form two identical cells"]),
          scheme: [S("All four in the right order: 2 marks"), S("Two or three in the right place: 1 mark")],
          model: "1. The cell grows and its DNA is copied. 2. One set of chromosomes is pulled to each end of the cell. 3. The nucleus divides. 4. The cytoplasm and cell membrane divide to form two identical cells.",
          examiner: "Two marks for the full order; one for two or three events in the right place.",
          mistakes: ["Putting cell division before the DNA is copied: the DNA must be copied first, so each new cell gets a full set."] },
        { id: "b", marks: 2, lessons: ["u05-03"],
          Q: written("Give two reasons why cells in a multicellular organism divide by mitosis.", "For growth, so the organism gets bigger, and for repair, replacing damaged or worn-out cells.", [
            S("Growth"), S("Repair / replacing damaged or worn-out cells"), S("Asexual reproduction")]),
          scheme: [S("Growth"), S("Repair / replacing damaged or worn-out cells"), S("Asexual reproduction")],
          model: "For growth, so the organism gets bigger, and for repair, replacing damaged or worn-out cells.",
          examiner: "Any two, one mark each.",
          mistakes: ["Giving 'to make gametes': that's meiosis, not mitosis.", "Writing 'growth and development' as two separate reasons: they count as one."] },
        { id: "c", marks: 2, lessons: ["u05-02"],
          Q: num("A student counts 200 cells in a slide of an onion root tip. 30 of them are in mitosis. The whole cell cycle takes 16 hours. Estimate how long a cell spends in mitosis, in minutes.", 144, { unit: "minutes", why: "30 ÷ 200 = 0.15 of the cycle; 0.15 × 16 hours = 2.4 hours = 144 minutes." }),
          check: () => (30 / 200) * 16 * 60,
          scheme: [S("Fraction in mitosis: 30 ÷ 200 = 0.15, so 0.15 × 16 = 2.4 hours"), S("2.4 × 60 = 144 minutes")],
          model: "30 ÷ 200 = 0.15 of the cells are in mitosis, so about 0.15 of the cycle is mitosis. 0.15 × 16 hours = 2.4 hours = 144 minutes.",
          examiner: "One mark for the fraction or 2.4 hours, one for 144 minutes. The idea: the share of cells in a stage estimates the share of time spent in it.",
          mistakes: ["Converting 2.4 hours to 2 hours 40 minutes: 0.4 of an hour is 24 minutes.", "Dividing 200 by 30 instead of 30 by 200."] },
      ] },

    // ---------- 4.1.2.3 Stem cells ----------
    { id: "cb-09", points: ["4.1.2.3"], tier: "both",
      parts: [
        { id: "a", marks: 1, lessons: ["u02-26"],
          Q: mcq("Where are stem cells found in a plant?", "In meristems", [["In xylem", "Xylem cells are specialised and dead when mature."], ["In root hair cells", "Root hair cells are specialised for absorbing water and minerals."], ["In guard cells", "Guard cells are specialised to open and close stomata."]]),
          scheme: [S("Meristems")], model: "In meristems (at the tips of roots and shoots).",
          examiner: "One mark for meristems.",
          mistakes: ["Choosing a specialised cell: stem cells are the ones that aren't yet specialised."] },
        { id: "b", marks: 4, lessons: ["u02-26", "u05-14"],
          Q: written("Doctors could use stem cells from human embryos to treat conditions such as type 1 diabetes. Evaluate this use of embryonic stem cells.", "Embryonic stem cells can differentiate into any type of cell, so they could replace the insulin-producing cells a patient has lost. With therapeutic cloning, the cells would have the patient's own genes, so they wouldn't be rejected. However, the embryo is destroyed, which many people object to on ethical or religious grounds, and stem cells grown in a lab could carry a viral infection to the patient. Overall it could cure the condition rather than just control it, but only if it's shown to be safe and the ethical concerns are addressed.", [
            S("For: embryonic stem cells can differentiate into any type of cell"), S("For: they could replace faulty or lost cells (such as insulin-producing cells), curing rather than just treating"), S("For: with therapeutic cloning the cells match the patient, so they aren't rejected"),
            S("Against: an embryo is destroyed / ethical or religious objections"), S("Against: risk of transferring a viral infection (or of the cells dividing uncontrollably)"), S("A conclusion that weighs the two sides")]),
          scheme: [S("For: embryonic stem cells can differentiate into any type of cell"), S("For: they could replace faulty or lost cells (such as insulin-producing cells), curing rather than just treating"), S("For: with therapeutic cloning the cells match the patient, so they aren't rejected"),
            S("Against: an embryo is destroyed / ethical or religious objections"), S("Against: risk of transferring a viral infection (or of the cells dividing uncontrollably)"), S("A conclusion that weighs the two sides")],
          model: "Embryonic stem cells can differentiate into any type of cell, so they could replace the insulin-producing cells a patient has lost. With therapeutic cloning, the cells would have the patient's own genes, so they wouldn't be rejected. However, the embryo is destroyed, which many people object to on ethical or religious grounds, and stem cells grown in a lab could carry a viral infection to the patient. Overall it could cure the condition rather than just control it, but only if it's shown to be safe and the ethical concerns are addressed.",
          examiner: "Up to four marks. 'Evaluate' needs both sides: an answer with only advantages, or only disadvantages, can't reach full marks however many points it makes, and the best answers end with a judgement. When you tick, be honest about whether you gave both sides.",
          mistakes: ["Giving only advantages (or only disadvantages).", "Ending without a conclusion.", "Saying stem cells 'can cure any disease': they can replace cells, which only helps some conditions."] },
      ] },

    // ---------- 4.1.3.1 Diffusion ----------
    { id: "cb-10", points: ["4.1.3.1"], tier: "both",
      parts: [
        { id: "a", marks: 1, lessons: ["u02-20"],
          Q: mcq("Which is the best description of diffusion?", "The net movement of particles from an area of higher concentration to an area of lower concentration", [["The net movement of particles from an area of lower concentration to an area of higher concentration", "That's against the gradient, which needs active transport."], ["The movement of particles across a membrane using energy from respiration", "Diffusion is passive: it needs no energy from respiration."], ["The movement of water only, across a partially permeable membrane", "That describes osmosis, a special case of diffusion."]]),
          scheme: [S("Net movement from higher to lower concentration")], model: "The net movement of particles from an area of higher concentration to an area of lower concentration.",
          examiner: "One mark. The word 'net' matters: particles move both ways, but more move down the gradient.",
          mistakes: ["Reversing the direction.", "Thinking diffusion needs energy."] },
        { id: "b", marks: 2, lessons: ["u02-20"],
          Q: num("A cube has sides 2 cm long. Calculate its surface area to volume ratio. Give your answer as a number, n, for the ratio n : 1.", 3, { why: "Surface area = 6 × 2 × 2 = 24 cm². Volume = 2 × 2 × 2 = 8 cm³. 24 ÷ 8 = 3, so 3 : 1." }),
          check: () => (6 * 2 * 2) / (2 * 2 * 2),
          scheme: [S("Surface area = 24 cm² and volume = 8 cm³"), S("Ratio 3 : 1")],
          model: "Surface area = 6 faces × (2 × 2) = 24 cm². Volume = 2 × 2 × 2 = 8 cm³. 24 ÷ 8 = 3, so the ratio is 3 : 1.",
          examiner: "One mark for both the surface area and the volume, one for 3 : 1.",
          mistakes: ["Using only one face for the surface area (4 cm²).", "Writing the ratio upside down (volume to surface area)."] },
        { id: "c", marks: 3, lessons: ["u02-20"],
          Q: written("Explain how the alveoli in the lungs are adapted for the efficient exchange of gases by diffusion.", "There are millions of alveoli, giving a very large surface area. Their walls are only one cell thick, and so are the capillary walls, so the diffusion distance is short. A good blood supply carries oxygen away and brings carbon dioxide, and breathing refreshes the air, so a steep concentration gradient is kept up.", [
            S("A large surface area (millions of alveoli)"), S("Thin walls, one cell thick, so a short diffusion distance"), S("A good blood supply keeps a steep concentration gradient"), S("Ventilation (breathing) keeps a steep concentration gradient")]),
          scheme: [S("A large surface area (millions of alveoli)"), S("Thin walls, one cell thick, so a short diffusion distance"), S("A good blood supply keeps a steep concentration gradient"), S("Ventilation (breathing) keeps a steep concentration gradient")],
          model: "There are millions of alveoli, giving a very large surface area. Their walls are only one cell thick, and so are the capillary walls, so the diffusion distance is short. A good blood supply carries oxygen away and brings carbon dioxide, and breathing refreshes the air, so a steep concentration gradient is kept up.",
          examiner: "Any three, one mark each. 'Explain' needs the effect: 'thin walls' earns the mark only with 'short diffusion distance' or 'gases diffuse quickly'.",
          mistakes: ["Writing 'thin cell walls': animal cells don't have cell walls. Say 'thin walls' or 'walls one cell thick'.", "Listing features without saying how each speeds up diffusion."] },
      ] },

    // ---------- 4.1.3.2 Osmosis ----------
    { id: "cb-11", points: ["4.1.3.2"], tier: "both",
      context: "A student puts a piece of potato with a mass of 2.50 g into a concentrated sugar solution. After an hour its mass is 2.20 g.",
      parts: [
        { id: "a", marks: 2, lessons: ["u02-21"],
          Q: num("Calculate the percentage change in the mass of the potato.", -12, { tol: 0.05, unit: "%", why: "Change = 2.20 − 2.50 = −0.30 g. −0.30 ÷ 2.50 × 100 = −12%." }),
          check: () => ((2.2 - 2.5) / 2.5) * 100,
          scheme: [S("Change in mass ÷ starting mass: −0.30 ÷ 2.50"), S("× 100 = −12 %")],
          model: "Change = 2.20 − 2.50 = −0.30 g. Percentage change = −0.30 ÷ 2.50 × 100 = −12%.",
          examiner: "One mark for dividing the change by the starting mass, one for −12%. The question asks for the change, so the minus sign, which shows a loss, is part of the answer.",
          mistakes: ["Dividing by the final mass (2.20) instead of the starting mass.", "Leaving out the minus sign for a decrease."] },
        { id: "b", marks: 3, lessons: ["u02-21"],
          Q: written("Explain why the potato lost mass.", "The sugar solution had a lower concentration of water than the potato cells (it was more concentrated). Water moved out of the cells by osmosis, from the dilute solution inside them to the concentrated solution outside, across their partially permeable membranes.", [
            S("The solution outside was more concentrated than the potato cells (lower water concentration)"), S("Water moved out of the cells by osmosis"), S("Across a partially permeable membrane"), S("From a dilute solution to a more concentrated solution")]),
          scheme: [S("The solution outside was more concentrated than the potato cells (lower water concentration)"), S("Water moved out of the cells by osmosis"), S("Across a partially permeable membrane"), S("From a dilute solution to a more concentrated solution")],
          model: "The sugar solution had a lower concentration of water than the potato cells (it was more concentrated). Water moved out of the cells by osmosis, from the dilute solution inside them to the concentrated solution outside, across their partially permeable membranes.",
          examiner: "Any three, one mark each. The answer must be about water moving: osmosis is the movement of water.",
          mistakes: ["Saying sugar moved into or out of the potato: it's water that moves.", "Writing 'water moved from a high concentration to a low concentration' without making clear it's the water concentration, not the sugar concentration."] },
        { id: "c", marks: 1, lessons: ["u02-21"],
          Q: mcq("What happens to a red blood cell placed in pure water?", "It swells and may burst", [["It shrinks", "That happens in a solution more concentrated than the cell."], ["It becomes flaccid", "Flaccid describes plant cells that have lost water."], ["It stays the same", "Water moves into the cell by osmosis, so it changes."]]),
          scheme: [S("It swells and may burst")], model: "It swells and may burst: water enters by osmosis, and an animal cell has no cell wall to stop it.",
          examiner: "One mark.",
          mistakes: ["Thinking animal cells become turgid like plant cells: without a cell wall they can burst."] },
      ] },

    // ---------- 4.1.3.3 Active transport ----------
    { id: "cb-12", points: ["4.1.3.3"], tier: "both",
      parts: [
        { id: "a", marks: 2, lessons: ["u02-23"],
          Q: written("Root hair cells take in mineral ions from the soil by active transport. Explain why active transport is needed.", "The concentration of mineral ions in the soil is usually lower than inside the root hair cells, so the ions must be moved against the concentration gradient. That needs energy, which comes from respiration.", [
            S("Mineral ions are more dilute in the soil than in the root hair cells (moved against the concentration gradient)"), S("This needs energy from respiration")]),
          scheme: [S("Mineral ions are more dilute in the soil than in the root hair cells (moved against the concentration gradient)"), S("This needs energy from respiration")],
          model: "The concentration of mineral ions in the soil is usually lower than inside the root hair cells, so the ions must be moved against the concentration gradient. That needs energy, which comes from respiration.",
          examiner: "One mark for the direction (against the gradient, from more dilute to more concentrated), one for energy from respiration.",
          mistakes: ["Saying the energy is 'made' by respiration: it's released.", "Describing diffusion of ions into the root, which can't happen against the gradient."] },
        { id: "b", marks: 1, lessons: ["u02-23"],
          Q: written("Give one difference between active transport and diffusion.", "Active transport needs energy from respiration and diffusion doesn't.", [
            S("Active transport needs energy (from respiration); diffusion doesn't"), S("Active transport moves substances against a concentration gradient; diffusion moves them down it")]),
          scheme: [S("Active transport needs energy (from respiration); diffusion doesn't"), S("Active transport moves substances against a concentration gradient; diffusion moves them down it")],
          model: "Active transport needs energy from respiration and diffusion doesn't.",
          examiner: "One mark for either difference. The answer must say something about both processes, or make a clear comparison.",
          mistakes: ["Describing only one process, for example 'active transport uses energy', without saying how diffusion differs: a comparison makes the difference clear."] },
      ] },
  ],
};
