"""Curly-arrow mechanisms for units 9, 13 and 14 (scripts/diagrams/chem.py checks the electron bookkeeping), and the
radical and bond-fission sequences drawn as checked step flows."""
from spec import mk

def M(lesson, id, title, caption, alt, desc, stages, steps, **k):
    return mk(lesson, id, "mechanism", title, caption, alt, desc, stages=stages, steps=steps, **k)

M("u09-04", "chem-lewis-acid-bf3", "A Lewis acid–base reaction",
  "Ammonia's lone pair is donated to boron trifluoride, whose boron has only six outer electrons and an empty orbital. NH₃ is the Lewis base (electron-pair donor) and BF₃ the Lewis acid (acceptor); the product has a coordinate bond.",
  "Ammonia approaching boron trifluoride with a curly arrow from nitrogen's lone pair to boron, then the adduct H₃N⁺–B⁻F₃.",
  ["NH₃ on the left with a lone pair on nitrogen; planar BF₃ on the right.", "A curly arrow from the nitrogen lone pair to the boron.", "Product: H₃N–BF₃, nitrogen +1 and boron −1 formally, joined by a coordinate bond."],
  [{"smiles": "[NH3:1].[B:2]([F:3])([F:4])[F:5]", "xy": {"1": [-2.4, 0], "2": [0, 0], "3": [-0.6, 1.05], "4": [-0.6, -1.05], "5": [1.2, 0]}, "label": "NH₃ + BF₃",
    "arrows": [{"from": {"lp": 1}, "to": {"bond": [1, 2]}, "toward": 2, "lpAngle": 0, "lpDist": 18, "bend": -0.3}]},
   {"smiles": "[NH3+:1][B-:2]([F:3])([F:4])[F:5]", "xy": {"1": [-1.3, 0], "2": [0, 0], "3": [0.45, 1.05], "4": [0.45, -1.05], "5": [1.25, 0]}, "label": "H₃N–BF₃ adduct"}],
  [{}])

M("u13-12", "chem-e1-mechanism", "The E1 mechanism",
  "In a polar solvent, 2-bromo-2-methylpropane first ionises (slow) to a tertiary carbocation and bromide. A water molecule then removes a proton from a carbon next to C⁺ (fast), and those electrons form the C=C of 2-methylpropene. Only the halogenoalkane is in the rate equation.",
  "Three stages: the C–Br bond breaking to give a carbocation; water removing a neighbouring hydrogen while the C–H electrons form a double bond; 2-methylpropene and H₃O⁺.",
  ["Stage 1: a curly arrow from the C–Br bond onto bromine.", "Stage 2: the planar tertiary carbocation; a curly arrow from a lone pair on water to a hydrogen on the neighbouring carbon, and another from that C–H bond to the C–C bond.",
   "Stage 3: 2-methylpropene, H₃O⁺ and Br⁻."],
  [{"smiles": "[CH3:1][C:2]([CH3:3])([CH2:4][H:6])[Br:5].[OH2:7]", "xy": {"1": [-1.1, -0.55], "2": [0, 0], "3": [0, -1.3], "4": [1.15, -0.5], "6": [1.6, -1.6], "5": [0, 1.35], "7": [3.0, -1.6]},
    "hide": [7], "label": "2-bromo-2-methylpropane", "arrows": [{"from": {"bond": [2, 5]}, "to": {"atom": 5}, "bend": -1}]},
   {"smiles": "[CH3:1][C+:2]([CH3:3])[CH2:4][H:6].[Br-:5].[OH2:7]", "xy": {"1": [-1.1, 0.6], "2": [0, 0], "3": [-0.05, -1.3], "4": [1.15, 0.6], "6": [1.65, 1.7], "5": [-2.4, 1.6], "7": [3.4, 2.5]},
    "label": "tertiary carbocation", "arrows": [{"from": {"lp": 7}, "to": {"bond": [7, 6]}, "toward": 6, "lpAngle": 200, "lpDist": 18, "bend": 0.4}, {"from": {"bond": [4, 6]}, "to": {"bond": [4, 2]}, "bend": 0.9}]},
   {"smiles": "[CH3:1][C:2]([CH3:3])=[CH2:4].[H:6][OH2+:7].[Br-:5]", "xy": {"1": [-1.1, 0.6], "2": [0, 0], "3": [-0.05, -1.3], "4": [1.15, 0.6], "6": [2.2, 1.6], "7": [3.0, 1.0], "5": [-2.4, 1.6]}, "label": "2-methylpropene + H₃O⁺ + Br⁻"}],
  [{"label": "slow"}, {"label": "fast"}], perRow=2)

M("u13-18", "chem-snar", "Nucleophilic aromatic substitution",
  "An electron-withdrawing nitro group para to the chlorine lets hydroxide add to the ring. The negative charge of the addition intermediate (the Meisenheimer complex) is spread onto the nitro group; chloride then leaves and the ring is restored, giving 4-nitrophenol (as its anion in excess alkali).",
  "Three stages: hydroxide adding to the carbon bearing chlorine of 4-chloronitrobenzene; the Meisenheimer complex with a carbanion; loss of chloride to give 4-nitrophenol.",
  ["Stage 1: a curly arrow from hydroxide to the carbon bearing Cl, and another from the C=C onto the neighbouring carbon.",
   "Stage 2: the Meisenheimer complex: that carbon is sp³ with OH and Cl; the ring carries a negative charge.", "A curly arrow from the carbanion back to re-form the C=C, and another from the C–Cl bond onto chlorine.",
   "Stage 3: 4-nitrophenol and Cl⁻."],
  [{"smiles": "[C:1]1([Cl:7])=[CH:2][CH:3]=[C:4]([N+:8](=[O:9])[O-:10])[CH:5]=[CH:6]1.[OH-:11]",
    "xy": {"1": [0, 1], "2": [0.87, 0.5], "3": [0.87, -0.5], "4": [0, -1], "5": [-0.87, -0.5], "6": [-0.87, 0.5], "7": [0, 2.25], "8": [0, -2.2], "9": [0.95, -2.75], "10": [-0.95, -2.75], "11": [2.3, 1.8]},
    "label": "4-chloronitrobenzene + OH⁻", "arrows": [{"from": {"lp": 11}, "to": {"bond": [11, 1]}, "toward": 1, "lpAngle": 180, "lpDist": 16, "bend": 0.4}, {"from": {"bond": [1, 2]}, "to": {"atom": 2}, "bend": -1}]},
   {"smiles": "[C:1]1([Cl:7])([OH:11])[CH-:2][CH:3]=[C:4]([N+:8](=[O:9])[O-:10])[CH:5]=[CH:6]1",
    "xy": {"1": [0, 1], "2": [0.87, 0.5], "3": [0.87, -0.5], "4": [0, -1], "5": [-0.87, -0.5], "6": [-0.87, 0.5], "7": [-0.75, 2.0], "11": [0.75, 2.0], "8": [0, -2.2], "9": [0.95, -2.75], "10": [-0.95, -2.75]},
    "label": "Meisenheimer complex", "arrows": [{"from": {"lp": 2}, "to": {"bond": [2, 1]}, "toward": 1, "lpAngle": 20, "lpDist": 16, "bend": -0.5}, {"from": {"bond": [1, 7]}, "to": {"atom": 7}, "bend": 1}]},
   {"smiles": "[C:1]1([OH:11])=[CH:2][CH:3]=[C:4]([N+:8](=[O:9])[O-:10])[CH:5]=[CH:6]1.[Cl-:7]",
    "xy": {"1": [0, 1], "2": [0.87, 0.5], "3": [0.87, -0.5], "4": [0, -1], "5": [-0.87, -0.5], "6": [-0.87, 0.5], "11": [0, 2.25], "8": [0, -2.2], "9": [0.95, -2.75], "10": [-0.95, -2.75], "7": [2.2, 1.5]},
    "label": "4-nitrophenol + Cl⁻"}],
  [{"label": "addition"}, {"label": "elimination"}], perRow=2)

M("u13-20", "chem-nabh4-reduction", "Reducing propanone with NaBH₄",
  "NaBH₄ supplies hydride, H⁻, which attacks the δ+ carbonyl carbon as a nucleophile while the C=O π electrons move onto oxygen. The alkoxide is then protonated by water, giving propan-2-ol: a secondary alcohol from a ketone.",
  "Three stages: hydride attacking the carbonyl carbon of propanone; the alkoxide taking a proton from water; propan-2-ol and hydroxide.",
  ["Stage 1: a curly arrow from the hydride's lone pair to the carbonyl carbon, and one from the C=O onto oxygen.", "Stage 2: the alkoxide; a curly arrow from O⁻ to a hydrogen of water, and one from the O–H bond onto water's oxygen.",
   "Stage 3: propan-2-ol and OH⁻."],
  [{"smiles": "[H-:2].[CH3:3][C:4](=[O:5])[CH3:6].[H:8][OH:7]", "xy": {"2": [0, -2.0], "3": [-1.05, -0.6], "4": [0, 0], "5": [0, 1.3], "6": [1.05, -0.6], "8": [1.5, 2.0], "7": [2.5, 2.0]}, "hide": [7, 8], "charges": {"4": "δ+", "5": "δ−"}, "chargeOffset": {"4": [-16, -6], "5": [-18, -6]},
    "label": "propanone + H⁻ (from NaBH₄)", "arrows": [{"from": {"lp": 2}, "to": {"bond": [2, 4]}, "toward": 4, "lpAngle": -90, "lpDist": 14, "bend": 0.3}, {"from": {"bond": [4, 5]}, "to": {"atom": 5}, "bend": -1}]},
   {"smiles": "[CH3:3][C:4]([H:2])([O-:5])[CH3:6].[H:8][OH:7]", "xy": {"3": [-1.05, -0.6], "4": [0, 0], "2": [0, -1.3], "5": [0, 1.3], "6": [1.05, -0.6], "8": [1.5, 2.0], "7": [2.5, 2.0]},
    "label": "alkoxide + H₂O", "arrows": [{"from": {"lp": 5}, "to": {"bond": [5, 8]}, "toward": 8, "lpAngle": 10, "lpDist": 20, "bend": -0.4}, {"from": {"bond": [7, 8]}, "to": {"atom": 7}, "bend": -1}]},
   {"smiles": "[CH3:3][C:4]([H:2])([O:5][H:8])[CH3:6].[OH-:7]", "xy": {"3": [-1.05, -0.6], "4": [0, 0], "2": [0, -1.3], "5": [0, 1.3], "8": [0.9, 1.8], "6": [1.05, -0.6], "7": [2.6, 1.3]}, "label": "propan-2-ol + OH⁻"}],
  [{}, {}])

M("u13-22", "chem-ester-hydrolysis", "Alkaline hydrolysis of an ester",
  "Hydroxide adds to the ester's carbonyl carbon to give a tetrahedral intermediate; the C=O re-forms and ethoxide leaves; ethoxide then takes the acid's proton. That last step is essentially irreversible, which is why alkaline hydrolysis goes to completion: ethanoate and ethanol.",
  "Four stages: hydroxide adding to ethyl ethanoate; the tetrahedral intermediate expelling ethoxide; ethoxide deprotonating ethanoic acid; ethanoate and ethanol.",
  ["Stage 1: curly arrows from hydroxide to the carbonyl carbon and from C=O onto oxygen.", "Stage 2: the tetrahedral intermediate; arrows re-forming C=O and breaking the C–O bond to the ethoxy group.",
   "Stage 3: ethanoic acid and ethoxide; arrows from ethoxide to the acid's hydrogen and from that O–H bond onto oxygen.", "Stage 4: ethanoate and ethanol."],
  [{"smiles": "[CH3:1][C:2](=[O:3])[O:4][CH2:5][CH3:6].[O-:7][H:8]", "xy": {"1": [-1.05, -0.6], "2": [0, 0], "3": [0, 1.3], "4": [1.1, -0.6], "5": [2.2, 0], "6": [3.3, -0.6], "7": [0, -2.0], "8": [-0.9, -2.6]},
    "label": "ethyl ethanoate + OH⁻", "arrows": [{"from": {"lp": 7}, "to": {"bond": [7, 2]}, "toward": 2, "lpAngle": 0, "lpDist": 16, "bend": -0.4}, {"from": {"bond": [2, 3]}, "to": {"atom": 3}, "bend": -1}]},
   {"smiles": "[CH3:1][C:2]([O-:3])([O:7][H:8])[O:4][CH2:5][CH3:6]", "xy": {"1": [-1.05, -0.6], "2": [0, 0], "3": [0, 1.3], "7": [0, -1.3], "8": [-0.9, -1.9], "4": [1.1, -0.1], "5": [2.2, -0.7], "6": [3.3, -0.1]},
    "label": "tetrahedral intermediate", "arrows": [{"from": {"lp": 3}, "to": {"bond": [3, 2]}, "toward": 2, "lpAngle": 180, "lpDist": 16, "bend": 0.6}, {"from": {"bond": [2, 4]}, "to": {"atom": 4}, "bend": -1}]},
   {"smiles": "[CH3:1][C:2](=[O:3])[O:7][H:8].[O-:4][CH2:5][CH3:6]", "xy": {"1": [-1.05, -0.6], "2": [0, 0], "3": [0, 1.3], "7": [1.05, -0.6], "8": [2.0, -0.1], "4": [3.1, -0.6], "5": [4.1, 0], "6": [5.1, -0.6]},
    "label": "ethanoic acid + ethoxide", "arrows": [{"from": {"lp": 4}, "to": {"bond": [4, 8]}, "toward": 8, "lpAngle": 120, "lpDist": 16, "bend": -0.5}, {"from": {"bond": [7, 8]}, "to": {"atom": 7}, "bend": 1}]},
   {"smiles": "[CH3:1][C:2](=[O:3])[O-:7].[H:8][O:4][CH2:5][CH3:6]", "xy": {"1": [-1.05, -0.6], "2": [0, 0], "3": [0, 1.3], "7": [1.05, -0.6], "8": [2.4, 0.2], "4": [3.1, -0.6], "5": [4.1, 0], "6": [5.1, -0.6]}, "label": "ethanoate + ethanol"}],
  [{}, {}, {}], perRow=2)

M("u13-23", "chem-hydride-shift", "A 1,2-hydride shift",
  "A secondary carbocation next to a carbon bearing a hydrogen and two methyl groups rearranges: the C–H bonding pair moves, with the hydrogen, to the C⁺. The positive charge moves to the neighbouring carbon, which is now tertiary and more stable.",
  "Two stages: the 3-methylbutan-2-yl cation with a curly arrow from the neighbouring C–H bond to the positive carbon; the tertiary 2-methylbutan-2-yl cation.",
  ["Stage 1: secondary cation; a curly arrow from the C–H bond on the next carbon towards C⁺.", "Stage 2: the hydrogen has moved; the positive charge is on the carbon bearing two methyl groups, a tertiary cation."],
  [{"smiles": "[CH3:1][CH+:2][C:3]([H:6])([CH3:4])[CH3:5]", "xy": {"1": [-1.1, -0.6], "2": [0, 0], "3": [1.15, -0.6], "6": [1.15, -1.9], "4": [2.3, 0], "5": [1.15, 0.9]}, "label": "secondary carbocation",
    "arrows": [{"from": {"bond": [3, 6]}, "to": {"bond": [6, 2]}, "bend": -0.9}]},
   {"smiles": "[CH3:1][CH:2]([H:6])[C+:3]([CH3:4])[CH3:5]", "xy": {"1": [-1.1, -0.6], "2": [0, 0], "6": [-0.3, -1.25], "3": [1.15, -0.6], "4": [2.3, 0], "5": [1.15, -1.9]}, "label": "tertiary carbocation (more stable)"}],
  [{}])

M("u14-07", "chem-acyl-chloride-water", "Addition–elimination: ethanoyl chloride and water",
  "Water's lone pair attacks the very δ+ carbonyl carbon (addition); the C=O re-forms and chloride leaves (elimination); chloride then removes a proton from the oxygen. The products are ethanoic acid and steamy fumes of HCl.",
  "Four stages: water attacking ethanoyl chloride; the tetrahedral intermediate losing chloride; chloride removing a proton; ethanoic acid and HCl.",
  ["Stage 1: arrows from water's lone pair to the carbonyl carbon and from C=O onto oxygen.", "Stage 2: the intermediate with O⁻ and an O⁺H₂; arrows re-forming C=O and from C–Cl onto chlorine.",
   "Stage 3: protonated ethanoic acid and Cl⁻; arrows from Cl⁻ to an O–H hydrogen and from that O–H bond onto oxygen.", "Stage 4: ethanoic acid and hydrogen chloride."],
  [{"smiles": "[CH3:1][C:2](=[O:3])[Cl:4].[OH:5][H:6]", "xy": {"1": [-1.05, -0.6], "2": [0, 0], "3": [0, 1.3], "4": [1.15, -0.6], "5": [-0.6, -2.1], "6": [-1.5, -2.6]}, "charges": {"2": "δ+"}, "chargeOffset": {"2": [-16, -6]},
    "label": "ethanoyl chloride + water", "arrows": [{"from": {"lp": 5}, "to": {"bond": [5, 2]}, "toward": 2, "lpAngle": 40, "lpDist": 16, "bend": -0.3}, {"from": {"bond": [2, 3]}, "to": {"atom": 3}, "bend": -1}]},
   {"smiles": "[CH3:1][C:2]([O-:3])([Cl:4])[OH+:5][H:6]", "xy": {"1": [-1.1, -0.2], "2": [0, 0], "3": [0, 1.3], "4": [1.25, -0.4], "5": [-0.2, -1.3], "6": [-1.1, -1.9]},
    "label": "tetrahedral intermediate", "arrows": [{"from": {"lp": 3}, "to": {"bond": [3, 2]}, "toward": 2, "lpAngle": 180, "lpDist": 16, "bend": 0.6}, {"from": {"bond": [2, 4]}, "to": {"atom": 4}, "bend": -1}]},
   {"smiles": "[CH3:1][C:2](=[O:3])[OH+:5][H:6].[Cl-:4]", "xy": {"1": [-1.05, -0.6], "2": [0, 0], "3": [0, 1.3], "5": [1.1, -0.6], "6": [2.0, -0.1], "4": [3.3, -0.4]},
    "label": "protonated acid + Cl⁻", "arrows": [{"from": {"lp": 4}, "to": {"bond": [4, 6]}, "toward": 6, "lpAngle": 160, "lpDist": 18, "bend": -0.4}, {"from": {"bond": [5, 6]}, "to": {"atom": 5}, "bend": 1}]},
   {"smiles": "[CH3:1][C:2](=[O:3])[OH:5].[H:6][Cl:4]", "xy": {"1": [-1.05, -0.6], "2": [0, 0], "3": [0, 1.3], "5": [1.1, -0.6], "6": [2.6, -0.4], "4": [3.6, -0.4]}, "label": "ethanoic acid + HCl"}],
  [{}, {}, {}], perRow=2)

M("u14-14", "chem-halogenoalkane-ammonia", "Ammonia and bromoethane",
  "Ammonia's lone pair attacks the δ+ carbon and bromide leaves (nucleophilic substitution), giving the ethylammonium ion. A second ammonia molecule removes a proton, giving ethylamine. Excess ammonia is used because ethylamine can itself react on.",
  "Three stages: ammonia attacking bromoethane; a second ammonia removing a proton from the ethylammonium ion; ethylamine and the ammonium ion.",
  ["Stage 1: arrows from ammonia's lone pair to the δ+ carbon and from the C–Br bond onto bromine.", "Stage 2: ethylammonium and Br⁻; arrows from a second ammonia to an N–H hydrogen and from that N–H bond onto nitrogen.",
   "Stage 3: ethylamine, NH₄⁺ and Br⁻."],
  [{"smiles": "[NH2:1][H:7].[CH3:2][CH2:3][Br:4].[NH3:5]", "xy": {"1": [-2.2, 0], "7": [-2.7, 1.0], "3": [0, 0], "2": [0.6, 1.1], "4": [1.3, -0.4], "5": [-2.4, -2.2]}, "charges": {"3": "δ+", "4": "δ−"}, "chargeOffset": {"3": [-4, -18], "4": [14, -14]},
    "hide": [5], "label": "NH₃ + bromoethane", "arrows": [{"from": {"lp": 1}, "to": {"bond": [1, 3]}, "toward": 3, "lpAngle": 0, "lpDist": 18, "bend": -0.3}, {"from": {"bond": [3, 4]}, "to": {"atom": 4}, "bend": 1}]},
   {"smiles": "[CH3:2][CH2:3][NH2+:1][H:7].[Br-:4].[NH3:5]", "xy": {"2": [-1.1, 0.6], "3": [0, 0], "1": [1.15, 0.6], "7": [1.6, 1.7], "4": [-1.6, -1.4], "5": [3.0, 1.7]},
    "label": "ethylammonium + NH₃", "arrows": [{"from": {"lp": 5}, "to": {"bond": [5, 7]}, "toward": 7, "lpAngle": 180, "lpDist": 16, "bend": 0.4}, {"from": {"bond": [1, 7]}, "to": {"atom": 1}, "bend": 1}]},
   {"smiles": "[CH3:2][CH2:3][NH2:1].[H:7][NH3+:5].[Br-:4]", "xy": {"2": [-1.1, 0.6], "3": [0, 0], "1": [1.15, 0.6], "7": [2.2, 1.6], "5": [3.0, 1.0], "4": [-1.6, -1.4]}, "hide": [7], "labels": {"5": "NH<sub>4</sub>"}, "label": "ethylamine + NH₄⁺ + Br⁻"}],
  [{}, {}], perRow=2)

M("u14-15", "chem-friedel-crafts", "Friedel–Crafts acylation of benzene",
  "AlCl₃ generates the acylium ion CH₃CO⁺ from ethanoyl chloride. The delocalised π electrons attack it, breaking aromaticity in the arenium ion; AlCl₄⁻ removes the proton from the sp³ carbon, restoring the ring and regenerating AlCl₃. The product is phenylethanone.",
  "Three stages: benzene's ring attacking the acylium ion; AlCl₄⁻ removing a proton from the arenium ion; phenylethanone, HCl and AlCl₃.",
  ["Stage 1: a curly arrow from the ring's π electrons to the positive carbon of the acylium ion, CH₃C⁺=O.", "Stage 2: the arenium ion with a horseshoe; a curly arrow from an Al–Cl bond of AlCl₄⁻ to the ring hydrogen, and one from the C–H bond back into the ring.",
   "Stage 3: phenylethanone, HCl and AlCl₃ (the catalyst is regenerated)."],
  [{"smiles": "[C:1]1([H:10])=[CH:2][CH:3]=[CH:4][CH:5]=[CH:6]1.[CH3:20][C+:21]=[O:22].[Cl:30][Al-:31]([Cl:32])([Cl:33])[Cl:34]",
    "xy": {"1": [0, 1], "2": [0.87, 0.5], "3": [0.87, -0.5], "4": [0, -1], "5": [-0.87, -0.5], "6": [-0.87, 0.5], "10": [-0.6, 1.85], "21": [1.6, 2.4], "20": [2.7, 2.4], "22": [1.0, 3.4],
           "30": [-2.4, 2.2], "31": [-3.4, 2.2], "32": [-3.4, 3.3], "33": [-3.4, 1.1], "34": [-4.5, 2.2]},
    "label": "benzene + CH₃CO⁺", "arrows": [{"from": {"bond": [1, 2]}, "to": {"bond": [1, 21]}, "toward": 21, "bend": -0.7}], "ring": {"atoms": [1, 2, 3, 4, 5, 6], "style": "circle"}},
   {"smiles": "[C:1]1([H:10])([C:21](=[O:22])[CH3:20])[CH+:2][CH:3]=[CH:4][CH:5]=[CH:6]1.[Cl:30][Al-:31]([Cl:32])([Cl:33])[Cl:34]",
    "xy": {"1": [0, 1], "2": [0.87, 0.5], "3": [0.87, -0.5], "4": [0, -1], "5": [-0.87, -0.5], "6": [-0.87, 0.5], "10": [-0.95, 1.8], "21": [0.6, 2.0], "22": [0.1, 3.0], "20": [1.75, 2.3],
           "30": [-2.4, 2.2], "31": [-3.4, 2.2], "32": [-3.4, 3.3], "33": [-3.4, 1.1], "34": [-4.5, 2.2]},
    "label": "arenium ion", "arrows": [{"from": {"bond": [31, 30]}, "to": {"bond": [30, 10]}, "toward": 10, "bend": -0.5}, {"from": {"bond": [1, 10]}, "to": {"bond": [1, 2]}, "bend": -0.8}],
    "ring": {"atoms": [1, 2, 3, 4, 5, 6], "style": "horseshoe", "open": 1}},
   {"smiles": "[C:1]1([C:21](=[O:22])[CH3:20])=[CH:2][CH:3]=[CH:4][CH:5]=[CH:6]1.[H:10][Cl:30].[Al:31]([Cl:32])([Cl:33])[Cl:34]",
    "xy": {"1": [0, 1], "2": [0.87, 0.5], "3": [0.87, -0.5], "4": [0, -1], "5": [-0.87, -0.5], "6": [-0.87, 0.5], "21": [0, 2.1], "22": [-0.95, 2.65], "20": [0.95, 2.65],
           "10": [-2.8, 0.8], "30": [-2.8, 1.8], "31": [-4.0, 1.0], "32": [-4.0, 2.1], "33": [-5.1, 1.0], "34": [-4.0, -0.1]},
    "label": "phenylethanone + HCl + AlCl₃", "ring": {"atoms": [1, 2, 3, 4, 5, 6], "style": "circle"}}],
  [{"label": "slow"}, {"label": "fast"}], perRow=2)

M("u14-19", "chem-enolate-formation", "Forming an enolate",
  "A hydrogen on the carbon next to C=O (the α-carbon) is weakly acidic (pKa about 19 to 20 for propanone) because removing it gives an anion whose charge is shared with oxygen. A strong base removes it: the C–H electrons form a C=C and the C=O π electrons move onto oxygen.",
  "Two stages: hydroxide removing an α-hydrogen of propanone with three curly arrows; the enolate ion with the charge on oxygen, and water.",
  ["Stage 1: arrows from hydroxide to an α-hydrogen, from that C–H bond to the C–C bond, and from C=O onto oxygen.", "Stage 2: the enolate, C=C with O⁻, and water."],
  [{"smiles": "[CH3:1][C:2](=[O:3])[CH2:4][H:5].[OH-:6]", "xy": {"1": [-1.05, -0.6], "2": [0, 0], "3": [0, 1.3], "4": [1.15, -0.6], "5": [1.55, -1.75], "6": [2.9, -2.1]},
    "label": "propanone + OH⁻", "arrows": [{"from": {"lp": 6}, "to": {"bond": [6, 5]}, "toward": 5, "lpAngle": 180, "lpDist": 16, "bend": 0.4}, {"from": {"bond": [4, 5]}, "to": {"bond": [4, 2]}, "bend": 0.9}, {"from": {"bond": [2, 3]}, "to": {"atom": 3}, "bend": -1}]},
   {"smiles": "[CH3:1][C:2]([O-:3])=[CH2:4].[H:5][OH:6]", "xy": {"1": [-1.05, -0.6], "2": [0, 0], "3": [0, 1.3], "4": [1.15, -0.6], "5": [2.2, -1.5], "6": [2.9, -2.1]}, "hide": [5], "labels": {"6": "H<sub>2</sub>O"}, "label": "enolate + water"}],
  [{}])

# ---- reuse of mechanisms already drawn, placed in the lessons that teach the same idea
REUSE = {"chem-sn2-mechanism": ["chemistry:u13-08"], "chem-e2-mechanism": ["chemistry:u13-11"], "chem-hbr-propene": ["chemistry:u13-14"], "chem-nucleophilic-addition": ["chemistry:u13-01"]}

# ---- radical chains and bond fission as step flows (checked: each step balances, the chain adds up, the radical is regenerated)
mk("u13-06", "chem-radical-chlorination", "flow", "Free-radical chlorination of methane",
   "UV light splits Cl₂ into two chlorine radicals (initiation). Each Cl• takes an H from methane, and the methyl radical takes a Cl from Cl₂, regenerating Cl• (propagation): the two steps add up to CH₄ + Cl₂ → CH₃Cl + HCl and repeat thousands of times. Any two radicals meeting end a chain (termination).",
   "A cycle: Cl• reacts with CH₄ to give CH₃• and HCl; CH₃• reacts with Cl₂ to give CH₃Cl and Cl•, which returns to the start. Initiation and termination are shown beside it.",
   ["Initiation: Cl₂ → 2Cl• in UV light.", "Propagation 1: Cl• + CH₄ → CH₃• + HCl.", "Propagation 2: CH₃• + Cl₂ → CH₃Cl + Cl•.", "Termination: for example Cl• + CH₃• → CH₃Cl, or 2Cl• → Cl₂."],
   layout="cycle", radius=110,
   nodes=[{"id": "cl", "label": "Cl•", "tone": "a2", "sub": "from Cl₂ → 2Cl• (UV)"}, {"id": "me", "label": "CH₃•", "tone": "a5", "sub": "methyl radical"}],
   edges=[{"from": "cl", "to": "me", "label": "+ CH₄ → CH₃• + HCl", "eq": "Cl• + CH4 → CH3• + HCl"}, {"from": "me", "to": "cl", "label": "+ Cl₂ → CH₃Cl + Cl•", "eq": "CH3• + Cl2 → CH3Cl + Cl•"}],
   centre="propagation", notes=["Termination: Cl• + CH₃• → CH₃Cl; 2Cl• → Cl₂; 2CH₃• → C₂H₆"],
   claims=[{"type": "net", "steps": ["Cl• + CH4 → CH3• + HCl", "CH3• + Cl2 → CH3Cl + Cl•"], "net": "CH4 + Cl2 → CH3Cl + HCl"}, {"type": "regenerated", "species": "Cl•", "steps": ["Cl• + CH4 → CH3• + HCl", "CH3• + Cl2 → CH3Cl + Cl•"]},
           {"type": "equation", "eq": "Cl2 → 2Cl•"}, {"type": "equation", "eq": "Cl• + CH3• → CH3Cl"}, {"type": "equation", "eq": "2CH3• → C2H6"}])

mk("u13-03", "chem-homo-heterolytic", "flow", "Two ways a bond can break",
   "In homolytic fission each atom keeps one electron of the bonding pair, giving two radicals (half-headed arrows). In heterolytic fission the more electronegative atom takes both electrons, giving a cation and an anion (a full curly arrow).",
   "Two rows: C–Br breaking homolytically into CH₃• and Br•, and heterolytically into CH₃⁺ and Br⁻.",
   ["Homolytic: CH₃–Br → CH₃• + Br•, one electron each.", "Heterolytic: CH₃–Br → CH₃⁺ + Br⁻, bromine takes both."],
   layout="grid", rowHeight=96, boxWidth=130,
   nodes=[{"id": "a", "label": "CH₃–Br", "col": 0, "row": 0}, {"id": "b", "label": "CH₃• + Br•", "col": 1, "row": 0, "tone": "a5", "sub": "two radicals"},
          {"id": "c", "label": "CH₃–Br", "col": 0, "row": 1}, {"id": "d", "label": "CH₃⁺ + Br⁻", "col": 1, "row": 1, "tone": "a3", "sub": "two ions"}],
   edges=[{"from": "a", "to": "b", "label": "homolytic", "eq": "CH3Br → CH3• + Br•"}, {"from": "c", "to": "d", "label": "heterolytic", "eq": "CH3Br → CH3+ + Br-"}])
