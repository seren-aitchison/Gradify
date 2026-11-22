"""Biology diagrams for the lessons that needed new renderers (docs/visual-learning/BIOLOGY-REMAINING-RENDERERS.md).
Run: python3 scripts/diagrams/biology/gaps.py"""
from spec import mk

# ---------------------------------------------------------------- the fluid mosaic membrane
mk("u02-18", "bio-fluid-mosaic", "bilayer", "The fluid mosaic membrane",
   "Phospholipids form a bilayer with their hydrophilic heads towards the water on both sides and their hydrophobic tails inside, a core about 3.5 nm thick in a membrane about 5 nm thick here. Proteins float in it like tiles in a mosaic: integral proteins span it, peripheral proteins sit on one surface. Cholesterol sits between the phospholipids of animal membranes, and short carbohydrate chains on the outer surface form the glycocalyx. Drawn to scale.",
   "A cross-section of a membrane: two layers of phospholipids with heads outwards and tails inwards, a channel protein, a carrier protein and a receptor protein spanning it, cholesterol between the lipids, a peripheral protein on the cytosol side and carbohydrate chains on the outer surface only.",
   ["Phospholipids: heads (hydrophilic) face the water on both sides, tails (hydrophobic) face inwards.", "The hydrophobic core is about 3.5 nm thick in a membrane about 5 nm thick, drawn to scale.",
    "Integral proteins span the bilayer: a channel, a carrier and a receptor.", "A peripheral protein sits on one surface.", "Cholesterol sits between the phospholipids in animal membranes, restraining their movement.",
    "Carbohydrate chains on proteins and lipids are on the outer surface only: the glycocalyx, used in recognition and adhesion."],
   cell="animal", scale=14,
   proteins=[{"kind": "channel", "at": 0.2}, {"kind": "carrier", "at": 0.48}, {"kind": "receptor", "at": 0.78, "carb": True}],
   cholesterol=[0.1, 0.35, 0.64, 0.92], glycolipids=[0.29, 0.62], peripheral=[{"at": 0.35, "side": "inner"}],
   claims=[{"type": "count", "kind": "channel", "value": 1}, {"type": "count", "kind": "carrier", "value": 1}, {"type": "count", "kind": "receptor", "value": 1}])

# ---------------------------------------------------------------- lock and key against induced fit
mk("u03-24", "bio-induced-fit", "inducedfit", "Lock and key, and induced fit",
   "In the lock-and-key model the active site already has exactly the substrate's shape. In the induced-fit model, now preferred, the active site is not a perfect fit until the substrate binds, and then it changes shape to close round it, straining the substrate towards the transition state. After the reaction the products leave and the enzyme returns to its original shape, ready to be used again. Schematic, not to scale.",
   "Two rows of three pictures. Lock and key: a substrate fits an active site of the same width, which never changes. Induced fit: the active site is wider than the substrate, narrows round it when it binds, and widens again when the two products leave.",
   ["Lock and key: the active site has the substrate's shape before, during and after.", "Induced fit: the active site is wider than the substrate at first.", "When the substrate binds, the active site changes shape and closes round it.",
    "The substrate is split into two products, whose sizes add up to the substrate's.", "The products leave and the enzyme returns to its original shape."],
   substrate={"w": 40, "h": 46}, products=[{"w": 22}, {"w": 18}],
   models=[{"name": "lock and key", "before": 40, "after": 40}, {"name": "induced fit", "before": 58, "after": 40}])

# ---------------------------------------------------------------- water and hydrogen bonds
mk("u03-03", "bio-water-hbond", "hbond", "Water molecules and hydrogen bonds",
   "Oxygen pulls the shared electrons harder than hydrogen, so each water molecule is polar: δ− on the oxygen, δ+ on each hydrogen, with the hydrogens 104.5° apart. A δ+ hydrogen is attracted to the oxygen of a neighbouring molecule: a hydrogen bond, longer (0.177 nm) than the covalent O–H bond (0.096 nm) and much weaker (5–30 kJ per mole, against about 350 for C–C). A molecule can donate two and accept two, so up to four.",
   "Five water molecules: a central one donating two hydrogen bonds from its two hydrogens and accepting two from neighbours' hydrogens, drawn as dashed lines in line with the O–H bonds, with the 104.5 degree angle and the bond lengths given.",
   ["A water molecule is bent: H–O–H 104.5°.", "Oxygen is δ− and the hydrogens are δ+: the molecule is polar.", "A hydrogen bond links a δ+ hydrogen to the oxygen of another molecule, in line with the O–H bond.",
    "O–H covalent bond 0.096 nm; hydrogen bond 0.177 nm.", "The central molecule donates two hydrogen bonds and accepts two: four in all.", "Each is weak (5–30 kJ per mole) but together they give water its cohesion, high boiling point and solvent properties."],
   also=("u03-02",), scale=450, energies={"hbond": [5, 30], "cc": 350})
