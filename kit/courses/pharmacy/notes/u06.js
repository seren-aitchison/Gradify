// School 6: Pharmaceutical Calculations. UK, as at 2026.
// Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// EDUCATION ONLY. Every dose, product and number here is illustrative, and "Medicine A/B/X" are invented.
// Real doses come from the prescription, the current BNF or BNFC and the SPC, and are independently checked.
export default `
## Units and conversions
S: Almost every pharmaceutical calculation starts with units. Most serious calculation errors are unit errors, especially between milligrams and micrograms, where a slip gives a thousandfold mistake.
O: Convert accurately between units of mass and volume used in pharmacy
O: Explain why some units must be written in full
T: Microgram | One thousandth of a milligram; written in full on prescriptions and labels, never abbreviated
T: Nanogram | One thousandth of a microgram
H: The units you'll use
- Mass: 1 kilogram (kg) = 1,000 grams (g); 1 g = 1,000 milligrams (mg); 1 mg = 1,000 micrograms; 1 microgram = 1,000 nanograms.
- Volume: 1 litre (L) = 1,000 millilitres (mL).
- Each step down the mass ladder multiplies by 1,000; each step up divides by 1,000. Moving two steps (for example grams to micrograms) means a factor of 1,000,000.
X: Convert 0.075 mg to micrograms.
> One step down the ladder: multiply by 1,000.
> 0.075 × 1,000 = 75 micrograms.
H: Writing units safely
- Write "micrograms", "nanograms" and "units" in full. Abbreviations such as µg, mcg, ng and IU are easily misread (µg as mg; U as 0).
- Use a leading zero for values below 1 (0.5 mg, never .5 mg) and never a trailing zero (5 mg, never 5.0 mg), which can be misread as 50.
- Change to the smaller unit to avoid decimals where it helps: 500 micrograms is safer than 0.5 mg in many settings.
K: Check every answer's unit as well as its number. A thousandfold error usually comes from moving between milligrams and micrograms.
!: Abbreviating micrograms as "mcg" or "µg" on a label or record: the convention in UK practice is to write it in full.
Q: How many micrograms are in 1 mg? | 1,000
Q: Why is a trailing zero (5.0 mg) unsafe? | The decimal point can be missed and the dose read as 50 mg.
SUM: Mass units step by factors of 1,000: kg, g, mg, micrograms, nanograms.
SUM: Write micrograms, nanograms and units in full; leading zeros yes, trailing zeros no.
SRC: Rees JA, Smith I, Watson J, Introduction to Pharmaceutical Calculations, 4th edition, Pharmaceutical Press | secondary | 2015
SRC: Joint Formulary Committee, British National Formulary: guidance on prescribing | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u06-01-q1@1: How many micrograms are in 2.5 mg? | 2,500 micrograms | 250 micrograms | 25,000 micrograms | 25 micrograms | 0.0025 micrograms | 1 mg is 1,000 micrograms, so 2.5 mg is 2.5 × 1,000 = 2,500 micrograms.
M1#pharmacy-u06-01-q2@1: How many milligrams are in 0.04 g? | 40 mg | 4 mg | 400 mg | 0.4 mg | 0.00004 mg | 1 g is 1,000 mg, so 0.04 g is 0.04 × 1,000 = 40 mg.
M2#pharmacy-u06-01-q3@2: Which way of writing a dose is safest? | 0.5 mg | .5 mg | 0.50 mg | 500 mcg | 1/2 mg | A leading zero prevents ".5" being read as 5; trailing zeros and abbreviations such as mcg cause misreading.
NUM1#pharmacy-u06-01-q4@1: Convert 0.125 mg to micrograms. | 125 | 0 | micrograms | Multiply by 1,000: 0.125 × 1,000 = 125 micrograms.

## Significant figures and rounding
S: Rounding decides whether a calculated dose can actually be measured and given. Round too early and errors build up; round carelessly and a dose becomes inaccurate or impossible to measure.
O: Round answers correctly to the required decimal places or significant figures
O: Explain when and how to round in pharmaceutical calculations
T: Significant figures | The digits in a number that carry meaning about its precision, starting from the first non-zero digit
T: Measurable volume | A volume that can actually be measured with the device used, such as an oral syringe graduated in 0.1 mL
H: Rules for rounding
- Keep full precision through the working and round only the final answer. Rounding at each step compounds the error.
- To round to one decimal place, look at the second decimal place: 5 or more rounds up (12.35 becomes 12.4), less than 5 rounds down (12.34 becomes 12.3).
- Significant figures count from the first non-zero digit: 0.004567 to two significant figures is 0.0046.
- Follow the instruction in the question exactly: "to one decimal place" and "to the nearest whole number" give different answers.
X: A calculation gives 3.4762 mL. Round to the nearest 0.1 mL.
> Look at the second decimal place: 7, which is 5 or more.
> Round the first decimal place up: 3.5 mL.
H: Rounding in practice
- Round to something the person can measure: an oral syringe may be graduated in 0.1 mL or 0.2 mL; a 5 mL spoon can't measure 3.8 mL.
- Dose banding (for example in chemotherapy) deliberately rounds to standard doses within an agreed tolerance, under local protocols.
- Never round in a way that takes a dose above a maximum.
K: Carry full precision through the working; round once, at the end, to what's asked and to what can be measured.
!: Rounding an intermediate step (for example a concentration) and then using the rounded figure in the next step.
Q: When should you round in a multi-step calculation? | Only at the end, keeping full precision in the working.
Q: Round 0.04567 to two significant figures. | 0.046
SUM: Round only the final answer, to the precision asked for.
SUM: In practice, round to a volume the device can measure and never above a maximum dose.
SRC: Rees JA, Smith I, Watson J, Introduction to Pharmaceutical Calculations, 4th edition, Pharmaceutical Press | secondary | 2015
M1#pharmacy-u06-02-q1@1: What is 12.348 rounded to one decimal place? | 12.3 | 12.4 | 12.35 | 12.0 | 12 | The second decimal place is 4, which is less than 5, so the first decimal place stays 3.
M2#pharmacy-u06-02-q2@2: In a two-step calculation, when is it best to round? | At the end only | After each step | At the start | Never at all | Before converting units | Rounding intermediate values carries errors into later steps; round the final answer.
M2#pharmacy-u06-02-q3@1: What is 0.006285 to two significant figures? | 0.0063 | 0.006 | 0.0062 | 0.01 | 0.00628 | Count from the first non-zero digit (6): the next digit is 2, then 8 rounds it up to 3, giving 0.0063.
NUM1#pharmacy-u06-02-q4@1: Round 7.865 mL to the nearest 0.1 mL. | 7.9 | 0 | mL | The second decimal place is 6, so round 7.8 up to 7.9.

## Ratio and proportion
S: Most dose and volume calculations are proportions: if a known amount of drug is in a known volume, how much volume holds the dose you need? Setting the proportion out clearly prevents upside-down answers.
O: Solve dose and volume problems using ratio and proportion
O: Check an answer for reasonableness
T: Proportion | Two equal ratios, such as 250 mg : 5 mL = 400 mg : x mL
T: Formula method | Volume = (dose needed ÷ amount in stock) × stock volume
H: Setting up a proportion
- Write what you have and what you want with the same units in the same positions: 250 mg in 5 mL; 400 mg in x mL.
- Cross-multiply: x = 400 × 5 ÷ 250 = 8 mL.
- The same thing as a formula: volume = (what you want ÷ what you've got) × what it's in.
X: A suspension contains 125 mg in 5 mL. What volume contains 300 mg?
> Volume = 300 ÷ 125 × 5.
> = 2.4 × 5 = 12 mL.
H: Checking the answer
- Estimate first: 300 mg is a bit more than twice 125 mg, so expect a bit more than 10 mL.
- If the answer is far from the estimate, recheck which figure goes on top.
- Check units match before dividing (mg with mg, mL with mL).
H: A second example: an injection
- An injection contains 40 mg in 2 mL and the dose is 30 mg.
- Estimate: 30 mg is three-quarters of 40 mg, so expect three-quarters of 2 mL.
- Calculate: 30 ÷ 40 × 2 = 1.5 mL, which matches the estimate.
- The same method works for any "amount in a volume" product: tablets per dose, inhaler doses, or grams of cream.
K: Estimate before calculating. If the dose you want is more than the stock strength, the volume must be more than the stock volume, and vice versa.
!: Inverting the ratio (dividing the stock by the dose), which gives an answer that is wrong by a large factor.
Q: State the formula method for a liquid dose. | Volume = (dose needed ÷ stock strength) × stock volume.
Q: What should you do before calculating? | Estimate the expected answer so you can spot an error.
SUM: Set up proportions with matching units; cross-multiply or use the formula method.
SUM: Estimate first and check the answer is plausible.
SRC: Rees JA, Smith I, Watson J, Introduction to Pharmaceutical Calculations, 4th edition, Pharmaceutical Press | secondary | 2015
M1#pharmacy-u06-03-q1@1: A suspension contains 250 mg in 5 mL. What volume contains 375 mg? | 7.5 mL | 6.25 mL | 3.3 mL | 5 mL | 15 mL | Volume = dose ÷ strength × volume: 375 ÷ 250 × 5 = 7.5 mL, a bit more than 5 mL as expected.
M2#pharmacy-u06-03-q2@2: A colleague calculates that 40 mg from a 10 mg in 5 mL liquid needs 1.25 mL. What's wrong? | The ratio is inverted | Nothing; it's correct | The units differ | It should be 2.5 mL | It should be 80 mL | 40 mg is four times the 10 mg in 5 mL, so 20 mL is needed; 1.25 mL comes from dividing 10 by 40 and multiplying by 5.
M2#pharmacy-u06-03-q3@1: Injection: 40 mg in 2 mL. Dose: 30 mg. Volume? | 1.5 mL | 2.67 mL | 1.33 mL | 0.75 mL | 3 mL | Volume = 30 ÷ 40 × 2 = 1.5 mL; the dose is less than the 40 mg in 2 mL, so the volume is less than 2 mL.
NUM1#pharmacy-u06-03-q4@1: An oral liquid of Medicine A contains 125 mg in 5 mL. What volume contains 300 mg? | 12 | 0.01 | mL | 300 ÷ 125 × 5 = 12 mL.

## Percentage concentrations
S: Percentage strengths describe how much drug is in a product. The units hidden in the percentage (grams per 100 mL or per 100 g) matter, and w/v, w/w and v/v aren't interchangeable.
O: Interpret w/v, w/w and v/v percentage concentrations
O: Convert percentage strengths to mg/mL and calculate amounts of drug
T: % w/v | Grams of solute in 100 mL of the final solution
T: % w/w | Grams of ingredient in 100 g of the final product (for example creams and ointments)
H: The three kinds of percentage
- **w/v** (weight in volume): grams per 100 mL. 1% w/v = 1 g in 100 mL = 10 mg/mL. Used for solutions and injections.
- **w/w** (weight in weight): grams per 100 g. Used for creams, ointments and powders.
- **v/v** (volume in volume): millilitres per 100 mL. Used for liquids mixed with liquids, such as ethanol.
- A quick rule for w/v: multiply the percentage by 10 to get mg/mL. 2% w/v = 20 mg/mL; 0.9% w/v = 9 mg/mL.
X: How many milligrams of lidocaine hydrochloride are in 5 mL of a 2% w/v solution?
> 2% w/v = 2 g in 100 mL = 20 mg/mL.
> 20 mg/mL × 5 mL = 100 mg.
H: Products you'll meet
- Glucose 5% w/v contains 50 g per litre; glucose 10% contains 100 g per litre.
- Sodium chloride 0.9% w/v contains 9 g per litre.
- Hydrocortisone 1% w/w cream contains 1 g in 100 g, so 30 g contains 0.3 g (300 mg).
P: **Investigate with the lab.** Practise percentage strength calculations, converting between % w/v and mg per mL.
IX: pharmcalc
K: For w/v, percentage × 10 = mg/mL. Always check whether a percentage is w/v, w/w or v/v before using it.
!: Treating a w/w cream strength as if it were w/v, or forgetting that the percentage refers to the final product, not the solvent.
Q: What is 1% w/v in mg/mL? | 10 mg/mL
Q: How much glucose is in 1 litre of glucose 5% w/v? | 50 g
SUM: w/v is g per 100 mL; w/w is g per 100 g; v/v is mL per 100 mL.
SUM: For w/v solutions, percentage × 10 gives mg/mL.
SRC: Rees JA, Smith I, Watson J, Introduction to Pharmaceutical Calculations, 4th edition, Pharmaceutical Press | secondary | 2015
SRC: British Pharmacopoeia Commission, British Pharmacopoeia: general notices on expressing concentrations | standard | 2026 | https://www.pharmacopoeia.com/
M1#pharmacy-u06-04-q1@2: What is the concentration of a 0.1% w/v solution? | 1 mg/mL | 0.1 mg/mL | 10 mg/mL | 0.01 mg/mL | 100 mg/mL | 0.1 g in 100 mL = 100 mg in 100 mL = 1 mg/mL.
M2#pharmacy-u06-04-q2@2: How much hydrocortisone is in 30 g of a 1% w/w cream? | 300 mg | 30 mg | 3 g | 3 mg | 1 g | 1 g per 100 g, so 30 g contains 0.3 g, which is 300 mg.
M2#pharmacy-u06-04-q3@1: Which concentration describes grams of ingredient per 100 g? | % w/w | % w/v | % v/v | mg/mL | mmol/L | w/w (weight in weight) is used for creams, ointments and powders.
NUM1#pharmacy-u06-04-q4@2: How many milligrams of Medicine B are in 5 mL of a 2% w/v solution? | 100 | 0 | mg | 2% w/v = 20 mg/mL; 20 × 5 = 100 mg.
M2#pharmacy-u06-04-q5@1: How many milligrams of drug are in 1 mL of a 1% w/v solution? | 10 mg | 1 mg | 100 mg | 0.1 mg | 1% w/v means 1 g per 100 mL, which is 10 mg per mL.

## Ratio strengths and parts per million
S: Some products describe very dilute concentrations as ratios (1 in 1,000) or parts per million. They are easy to misread, which is why adrenaline is now labelled in mg/mL in the UK, but they still appear in exams and older texts.
O: Convert ratio strengths and parts per million into mg/mL and percentages
O: Explain why mg/mL labelling is safer than ratio strengths
T: Ratio strength | A concentration written as 1 part in a number of parts, such as 1 in 1,000 w/v (1 g in 1,000 mL)
T: Parts per million (ppm) | 1 part in 1,000,000; for water, 1 ppm ≈ 1 mg per litre
H: Ratio strengths
- For w/v, 1 in 1,000 means 1 g in 1,000 mL, which is 1 mg/mL. 1 in 10,000 is 0.1 mg/mL (100 micrograms/mL).
- To convert a ratio to a percentage: 1 in 1,000 = 1 g per 1,000 mL = 0.1 g per 100 mL = 0.1%.
- Adrenaline injection is now labelled 1 mg/mL (1 in 1,000) and 100 micrograms/mL (1 in 10,000); mixing them up has caused serious harm.
X: How many micrograms of adrenaline are in 10 mL of a 1 in 10,000 solution?
> 1 in 10,000 = 1 g in 10,000 mL = 0.1 mg/mL = 100 micrograms/mL.
> 100 × 10 = 1,000 micrograms (1 mg).
H: Parts per million
- 1 ppm = 1 mg per kg, or for dilute aqueous solutions 1 mg per litre.
- Fluoride in water and trace impurities are often given in ppm.
H: Converting between the forms
- Ratio to mg/mL (w/v): divide 1,000 by the ratio number. 1 in 1,000 gives 1 mg/mL; 1 in 5,000 gives 0.2 mg/mL.
- Ratio to percentage: divide 100 by the ratio number. 1 in 5,000 gives 0.02%.
- ppm to percentage: divide by 10,000. 10 ppm is 0.001%.
- Write the conversion out each time: these small numbers are where decimal-point errors happen.
P: **Investigate with the lab.** Convert ratio strengths such as 1 in 1,000 into mg per mL and percentages.
IX: pharmcalc
K: For w/v ratios, 1 in 1,000 is 1 mg/mL. Each extra zero in the ratio divides the concentration by 10.
!: Confusing 1 in 1,000 with 1 in 10,000 adrenaline: a tenfold error. Read the mg/mL strength on the label.
Q: What is 1 in 1,000 w/v in mg/mL? | 1 mg/mL
Q: What is 1 ppm of fluoride in water, in mg per litre? | About 1 mg per litre.
SUM: 1 in 1,000 w/v = 1 mg/mL = 0.1%; 1 in 10,000 = 100 micrograms/mL.
SUM: 1 ppm ≈ 1 mg per litre of water.
SRC: Rees JA, Smith I, Watson J, Introduction to Pharmaceutical Calculations, 4th edition, Pharmaceutical Press | secondary | 2015
SRC: Resuscitation Council UK, Emergency treatment of anaphylaxis: guidelines for healthcare providers | guidance | 2021 | https://www.resus.org.uk/
M2#pharmacy-u06-05-q1@1: How many micrograms per mL are in a 1 in 10,000 w/v solution? | 100 micrograms | 10 micrograms | 1,000 micrograms | 1 microgram | 0.1 micrograms | 1 g in 10,000 mL = 0.1 mg/mL = 100 micrograms/mL.
M2#pharmacy-u06-05-q2@1: What is 1 in 5,000 w/v as a percentage? | 0.02% | 0.2% | 0.002% | 2% | 0.5% | 1 g in 5,000 mL is 0.02 g in 100 mL, so 0.02%.
M2#pharmacy-u06-05-q3@2: Why is adrenaline injection labelled in mg/mL in the UK? | Ratio strengths caused tenfold errors | Ratio strengths are illegal now | mg/mL products are more stable | It makes the injection cheaper | Ratios only apply to oral liquids | 1 in 1,000 and 1 in 10,000 were confused; mg/mL labelling reduces this.
NUM1#pharmacy-u06-05-q4@1: How many milligrams of fluoride are in 2 litres of water containing 1 ppm fluoride? | 2 | 0 | mg | 1 ppm ≈ 1 mg per litre, so 2 litres contain 2 mg.
M2#pharmacy-u06-05-q5@1: What is adrenaline 1 in 1,000 expressed in mg per mL? | 1 mg per mL | 0.1 mg per mL | 10 mg per mL | 1,000 mg per mL | 1 in 1,000 means 1 g in 1,000 mL, which is 1 mg per mL.

## Molarity, millimoles and milliequivalents
S: Electrolytes and many infusions are prescribed in millimoles, not milligrams. Converting between mass and millimoles needs the molecular mass, and the valency when milliequivalents are used.
O: Convert between milligrams and millimoles using molecular mass
O: Calculate millimoles and milliequivalents in electrolyte products
T: Millimole (mmol) | One thousandth of a mole; mmol = mass in mg ÷ relative molecular mass
T: Milliequivalent (mEq) | mmol multiplied by the valency of the ion
H: Moles and millimoles
- mmol = mg ÷ Mr. One mmol of a substance weighs its Mr in milligrams.
- Each formula unit of NaCl gives one sodium ion, so mmol of NaCl = mmol of sodium. For calcium chloride (CaCl₂), each unit gives two chloride ions.
- Molar concentration: mol/L. A 1 mmol/mL solution is 1 molar (1 M).
X: How many mmol of sodium are in 1 litre of sodium chloride 0.9% (Mr NaCl 58.5)?
> 0.9% w/v = 9 g/L = 9,000 mg/L.
> 9,000 ÷ 58.5 = 153.8, about 154 mmol/L of sodium (and of chloride).
H: Milliequivalents
- mEq = mmol × valency. Sodium and potassium are monovalent (1 mmol = 1 mEq); calcium and magnesium are divalent (1 mmol = 2 mEq).
- UK products are labelled in mmol; mEq appears in older and international sources.
- Concentrated potassium solutions are high-risk medicines: they are restricted, and infusions use ready-made products where possible under local policy.
P: **Investigate with the lab.** Work through millimole calculations, converting between mass and millimoles using molecular weight.
IX: pharmcalc
K: mmol = mg ÷ Mr. Know which ions each formula unit releases, and multiply by the valency for mEq.
!: Forgetting that one unit of calcium chloride releases two chloride ions, or treating mEq and mmol as the same for divalent ions.
Q: How do you convert mg to mmol? | Divide by the relative molecular mass (Mr).
Q: How many mEq are in 1 mmol of calcium? | 2 mEq
SUM: mmol = mg ÷ Mr; mEq = mmol × valency.
SUM: Sodium chloride 0.9% contains about 154 mmol/L of sodium.
SRC: Rees JA, Smith I, Watson J, Introduction to Pharmaceutical Calculations, 4th edition, Pharmaceutical Press | secondary | 2015
SRC: NICE NG29 and CG174, Intravenous fluid therapy in children and in adults in hospital | guidance | 2020 | https://www.nice.org.uk/guidance/cg174
M2#pharmacy-u06-06-q1@2: About how many mmol/L of sodium are in sodium chloride 0.9% (Mr 58.5)? | 154 mmol/L | 9 mmol/L | 58.5 mmol/L | 308 mmol/L | 15.4 mmol/L | 0.9% w/v is 9 g (9,000 mg) per litre; mmol = mg ÷ Mr = 9,000 ÷ 58.5, about 154 mmol/L.
M3#pharmacy-u06-06-q2@2: How many mEq of calcium are in 2 mmol of calcium ions? | 4 mEq | 2 mEq | 1 mEq | 8 mEq | 0.5 mEq | Calcium is divalent: mEq = mmol × 2 = 4 mEq.
M2#pharmacy-u06-06-q3@1: Potassium chloride has an Mr of 74.5. How many mmol of potassium are in 1 g? | About 13.4 mmol | About 74.5 mmol | About 1.34 mmol | About 7.45 mmol | About 134 mmol | 1,000 mg ÷ 74.5 = 13.4 mmol, and each unit gives one potassium ion.
NUM2#pharmacy-u06-06-q4@2: How many millimoles of potassium are in 1.5 g of potassium chloride (Mr 74.5)? Give your answer to one decimal place. | 20.1 | 0.05 | mmol | 1,500 mg ÷ 74.5 = 20.13, so 20.1 mmol.
M2#pharmacy-u06-06-q5@1: How many millimoles are in 5.85 g of sodium chloride (Mr 58.5)? | 100 mmol | 10 mmol | 1,000 mmol | 58.5 mmol | 5.85 g ÷ 58.5 g/mol = 0.1 mol = 100 mmol.

## Dilutions
S: Diluting a stock solution is routine in pharmacy, from making up preparations to preparing injections. The rule is simple: the amount of drug stays the same while the volume changes.
O: Use C1V1 = C2V2 to calculate dilutions
O: Work with dilution factors and serial dilutions
T: C1V1 = C2V2 | Concentration × volume before dilution equals concentration × volume after, because the amount of drug doesn't change
T: Dilution factor | Final volume ÷ initial volume; the concentration falls by this factor
H: The dilution equation
- C1 × V1 = C2 × V2: the amount of drug before equals the amount after.
- To find the volume of stock needed: V1 = C2 × V2 ÷ C1.
- Use the same concentration units on both sides.
X: What volume of a 10% w/v stock is needed to make 500 mL of a 2% w/v solution?
> V1 = 2 × 500 ÷ 10 = 100 mL.
> Take 100 mL of stock and make up to 500 mL with diluent.
H: Ratio dilutions
- Diluting "1 in 10" means 1 part stock made up to 10 parts in total, a tenfold dilution.
- Successive dilutions multiply: a 1 in 50 stock diluted 1 in 10 gives 1 in 500.
- Make up "to" a final volume, not "with" a volume of diluent: adding 400 mL to 100 mL may not give exactly 500 mL for some liquids.
H: In practice
- Measure the stock with a suitably sized measure, then make up to volume in a calibrated container.
- Check the diluent is compatible (for injections, the SPC or the Injectable Medicines Guide says which diluents are suitable).
- Label the diluted product with its final strength, not the stock strength.
- Example: 25 mL of a 4% solution made up to 200 mL is 4 × 25 ÷ 200 = 0.5%.
P: **Investigate with the lab.** Practise dilution calculations with C₁V₁ = C₂V₂ and check each against the worked method.
IX: pharmcalc
K: The amount of drug is constant in a dilution; only the volume changes. C1V1 = C2V2.
!: Adding the diluent volume to the stock instead of making up to the final volume, or mixing percentage and mg/mL units in one equation.
Q: What does C1V1 = C2V2 express? | The amount of drug is the same before and after dilution.
Q: A 1 in 20 solution is diluted 1 in 5. What is the final strength? | 1 in 100
SUM: Use V1 = C2V2 ÷ C1 to find the stock volume, then make up to the final volume.
SUM: Serial dilutions multiply.
SRC: Rees JA, Smith I, Watson J, Introduction to Pharmaceutical Calculations, 4th edition, Pharmaceutical Press | secondary | 2015
M1#pharmacy-u06-07-q1@1: You dilute 20 mL of a 5% w/v solution to 100 mL. What is the new concentration? | 1% w/v | 0.5% w/v | 2% w/v | 4% w/v | 0.1% w/v | The drug in 20 mL stays the same in 100 mL: C2 = C1V1 ÷ V2 = 5 × 20 ÷ 100 = 1%.
M3#pharmacy-u06-07-q2@2: A 1 in 50 stock is diluted 1 in 10. What is the final strength? | 1 in 500 | 1 in 60 | 1 in 5 | 1 in 40 | 1 in 5,000 | Serial dilutions multiply: 50 × 10 = 500.
M2#pharmacy-u06-07-q3@1: How much 20% w/v stock do you need for 250 mL of a 4% w/v solution? | 50 mL | 25 mL | 80 mL | 62.5 mL | 125 mL | V1 = C2 × V2 ÷ C1 = 4 × 250 ÷ 20 = 50 mL of stock, made up to 250 mL.
NUM1#pharmacy-u06-07-q4@1: What volume of a 10% w/v stock solution is needed to make 500 mL of a 2% w/v solution? | 100 | 0 | mL | V1 = C2 × V2 ÷ C1 = 2 × 500 ÷ 10 = 100 mL.
M2#pharmacy-u06-07-q5@1: What volume of 10% solution is diluted to make 500 mL of 2%? | 100 mL | 50 mL | 250 mL | 10 mL | C₁V₁ = C₂V₂: 10 × V₁ = 2 × 500, so V₁ = 100 mL.

## Concentrating and mixing
S: Sometimes you need a strength between two that you have, or you mix products of different strengths. Working out the drug content of each part, or using alligation, gives the answer reliably.
O: Calculate the strength of a mixture of two preparations
O: Use alligation to find the proportions needed for a target strength
T: Alligation | A method for finding the parts of a stronger and a weaker preparation needed to make an intermediate strength
T: Diluent or base | The drug-free vehicle, which counts as 0% in mixing calculations
H: Working out a mixture's strength
- Find the amount of drug in each part, add them, and divide by the total quantity.
- Example: 100 g of 4% ointment mixed with 300 g of plain base (0%) contains 4 g in 400 g, which is 1%.
H: Alligation
- To make 5% from 10% and 2%: parts of 10% = 5 − 2 = 3; parts of 2% = 10 − 5 = 5; total 8 parts.
- For 400 g: 10% component = 3/8 × 400 = 150 g; 2% component = 5/8 × 400 = 250 g.
- Check: (150 × 10% + 250 × 2%) = 15 + 5 = 20 g in 400 g = 5%.
X: How much 1% and 0% (base) do you mix to make 60 g of 0.25%?
> Parts of 1% = 0.25 − 0 = 0.25; parts of 0% = 1 − 0.25 = 0.75; total 1 part.
> 1%: 0.25 × 60 = 15 g; base: 45 g. Check: 0.15 g in 60 g = 0.25%.
H: Raising a strength
- Adding more drug (or a stronger product) raises the strength; work out the drug needed for the final quantity and subtract what's already there.
- Example: to make 100 g of 2% from 1% cream plus pure drug, add x g of drug to (100 − x) g of cream. Drug content: 0.01 × (100 − x) + x = 2, so 0.99x = 1 and x = 1.01 g of drug with 98.99 g of cream. Check: 0.99 g + 1.01 g = 2 g in 100 g.
- Whenever an exact answer matters, check by recalculating the final strength from the quantities you chose.
K: Check every mixing answer by adding up the drug content and dividing by the total quantity.
!: Diluting a licensed cream or ointment without checking it's suitable: dilution can affect stability and preservatives, so check the SPC or a specialist source.
Q: What strength is 100 g of 4% mixed with 300 g of base? | 1%
Q: In alligation, what are the parts of the stronger preparation? | Target strength minus the weaker strength.
SUM: Mixture strength = total drug ÷ total quantity.
SUM: Alligation gives the parts of each component; always check the result.
SRC: Rees JA, Smith I, Watson J, Introduction to Pharmaceutical Calculations, 4th edition, Pharmaceutical Press | secondary | 2015
M1#pharmacy-u06-08-q1@1: You mix 100 g of 4% w/w ointment with 300 g of plain base. What is the strength? | 1% | 2% | 4% | 1.33% | 0.75% | The drug content is 4 g (4% of 100 g) in 400 g in total, which is 1% w/w.
M2#pharmacy-u06-08-q2@2: How much 10% product do you need to make 400 g of 5% using 10% and 2% products? | 150 g | 250 g | 200 g | 100 g | 320 g | Alligation gives 3 parts of 10% and 5 parts of 2%; 3/8 × 400 = 150 g.
M2#pharmacy-u06-08-q3@1: Mixing 50 mL of 10% w/v with 150 mL of 2% w/v gives what strength? | 4% w/v | 6% w/v | 3% w/v | 5% w/v | 12% w/v | Drug content: 5 g (10% of 50 mL) plus 3 g (2% of 150 mL) = 8 g in 200 mL, which is 4% w/v.
NUM2#pharmacy-u06-08-q4@2: How many grams of a 10% ointment are needed to make 400 g of a 5% ointment, mixing it with a 2% ointment? | 150 | 0 | g | Alligation: 3 parts of 10% to 5 parts of 2%; 3/8 × 400 = 150 g.

## Dose calculations
S: A dose calculation turns a prescription into what's measured and given, and what's supplied. Keeping dose, frequency and daily total clearly separate prevents the commonest errors.
O: Calculate numbers of tablets, volumes and daily totals from a prescription
O: Check a calculated dose against the maximum
T: Total daily dose | The dose per administration multiplied by the number of times a day
T: Maximum dose | The largest single or daily dose recommended in the BNF or SPC for that indication and patient
H: From prescription to dose
- Number of tablets per dose = dose prescribed ÷ tablet strength.
- Total daily dose = dose × frequency: 250 mg four times a day is 1 g a day.
- Read carefully whether a dose is per dose or per day, and whether a "divided" daily dose is to be split.
X: The prescription is Medicine C 15 mg once daily for 28 days; tablets are 5 mg. How many tablets?
> Per dose: 15 ÷ 5 = 3 tablets.
> For 28 days: 3 × 28 = 84 tablets.
H: Checks
- Compare with the usual and maximum doses in the current BNF for the indication, age and kidney function.
- Is the number of tablets sensible? More than four tablets per dose or an unusual fraction prompts a recheck.
- Can the dose be measured with the product available?
H: Liquids and injections
- Volume = dose ÷ concentration. 300 mg from a 250 mg in 5 mL suspension is 300 ÷ 250 × 5 = 6 mL.
- For injections, also check the number of ampoules or vials needed: 150 mg from 100 mg in 2 mL ampoules needs 3 mL, which is two ampoules (with some left over to discard).
- Record the dose, the volume and the product strength together so another person can check them.
K: Separate the dose per administration, the frequency and the daily total, and check the result against the BNF.
!: Confusing a daily dose with a per-dose amount ("in four divided doses"), giving four times the intended dose.
Q: Total daily dose of 250 mg four times a day? | 1 g (1,000 mg)
Q: What prompts a recheck of a tablet calculation? | An unusually large number of tablets or an awkward fraction.
SUM: Tablets per dose = dose ÷ strength; daily dose = dose × frequency.
SUM: Check every calculated dose against the current BNF.
SRC: Joint Formulary Committee, British National Formulary | guidance | 2026 | https://bnf.nice.org.uk/
SRC: Rees JA, Smith I, Watson J, Introduction to Pharmaceutical Calculations, 4th edition, Pharmaceutical Press | secondary | 2015
M1#pharmacy-u06-09-q1@1: What is the total daily dose of 250 mg four times a day? | 1 g | 250 mg | 500 mg | 750 mg | 2 g | The daily total is the dose times the frequency: 250 mg × 4 = 1,000 mg, which is 1 g.
M2#pharmacy-u06-09-q2@1: A dose of 37.5 mg is prescribed; tablets are 25 mg and scored. How many tablets per dose? | One and a half | Two | One | Three | Half | 37.5 ÷ 25 = 1.5 tablets (check the tablet can be halved).
M2#pharmacy-u06-09-q3@2: Prescribed 30 mg/kg/day "in three divided doses" for a 20 kg child. What's each dose? | 200 mg | 600 mg | 10 mg | 1,800 mg | 60 mg | 30 × 20 = 600 mg a day, divided into three doses of 200 mg (illustrative; check the BNFC).
NUM1#pharmacy-u06-09-q4@1: Medicine C 15 mg once daily for 28 days is prescribed; tablets are 5 mg. How many tablets are needed? | 84 | 0 | tablets | 15 ÷ 5 = 3 tablets a day; 3 × 28 = 84.

## Weight-based dosing
S: Many medicines are dosed per kilogram of body weight, especially in children, in critical care and for drugs with narrow therapeutic ranges. Which weight to use, and whether the dose is per dose or per day, matters as much as the arithmetic.
O: Calculate weight-based doses and the resulting volumes
O: Explain when ideal or adjusted body weight is used instead of actual weight
T: Ideal body weight (IBW) | An estimate of lean weight from height and sex, used for some drugs in people with obesity
T: Dose cap | A maximum dose that a weight-based calculation must not exceed
H: Calculating the dose
- Dose = mg/kg × weight in kg. Then volume = dose ÷ concentration.
- Check the result against any maximum (adult) dose: a weight-based dose for a heavy patient can exceed it.
- Use a recent, measured weight: an estimated weight is a common source of error.
X: A 70 kg adult is prescribed Medicine D 5 mg/kg. The injection contains 40 mg/mL. What volume?
> Dose = 5 × 70 = 350 mg.
> Volume = 350 ÷ 40 = 8.75 mL.
H: Which weight?
- Some drugs (for example certain aminoglycosides and some anaesthetic and antimicrobial drugs) are dosed on ideal or adjusted body weight in obesity: follow the BNF, SPC or local guideline for each drug.
- The Devine formula estimates IBW: men 50 kg, women 45.5 kg, plus 2.3 kg for each inch over 5 feet.
P: **Investigate with the lab.** Calculate weight-based doses, checking each against any maximum dose given.
IX: pharmcalc
K: Dose = mg/kg × the right weight, then check against the maximum. Confirm which weight the drug's guidance uses.
!: Using an estimated or out-of-date weight, or forgetting a maximum dose for a heavy patient.
Q: What's the Devine IBW for a man? | 50 kg plus 2.3 kg for each inch over 5 feet.
Q: After calculating a mg/kg dose, what must you check? | That it doesn't exceed the maximum dose.
SUM: Dose = mg/kg × weight; check the maximum dose.
SUM: Some drugs use ideal or adjusted weight in obesity; follow the BNF, SPC or local guideline.
SRC: Joint Formulary Committee, British National Formulary | guidance | 2026 | https://bnf.nice.org.uk/
SRC: Devine BJ, Gentamicin therapy, Drug Intelligence and Clinical Pharmacy 8: 650–655 | primary | 1974
M2#pharmacy-u06-10-q1@1: Medicine D 5 mg/kg for a 70 kg adult; the injection is 40 mg/mL. What volume? | 8.75 mL | 5.7 mL | 14 mL | 2.8 mL | 87.5 mL | Dose = 5 mg/kg × 70 kg = 350 mg; volume = 350 ÷ 40 mg/mL = 8.75 mL.
M3#pharmacy-u06-10-q2@2: Using the Devine formula, what is the ideal body weight of a man who is 5 ft 10 in? | 73 kg | 70 kg | 61.5 kg | 66 kg | 75.5 kg | He is 10 inches over 5 feet, so IBW = 50 + (2.3 × 10) = 73 kg.
M2#pharmacy-u06-10-q3@2: Why might a calculated mg/kg dose need capping in a heavy adult? | It can exceed the maximum dose | Heavy patients absorb less | The weight is always estimated | mg/kg doses are only for children | Body weight doesn't matter | A weight-based calculation can exceed the maximum recommended dose, which then applies.
NUM2#pharmacy-u06-10-q4@2: Estimate the ideal body weight of a woman who is 5 ft 6 in, using the Devine formula. | 59.3 | 0.05 | kg | 45.5 + (2.3 × 6) = 59.3 kg.
M2#pharmacy-u06-10-q5@1: A child of 20 kg needs 15 mg/kg. What is the dose? | 300 mg | 35 mg | 150 mg | 1.3 mg | Dose = weight × dose per kg = 20 × 15 = 300 mg.

## Body surface area dosing
S: Cytotoxic chemotherapy and a few other medicines are dosed by body surface area (BSA), which tracks metabolic rate more closely than weight. BSA is calculated from height and weight, usually with the Mosteller formula.
O: Calculate body surface area using the Mosteller formula
O: Calculate a dose from a dose per square metre
T: Body surface area (BSA) | The calculated surface area of the body in square metres (m²)
T: Mosteller formula | BSA (m²) = √(height in cm × weight in kg ÷ 3,600)
H: Calculating BSA
- Mosteller: BSA = √(height (cm) × weight (kg) ÷ 3,600).
- An average adult BSA is about 1.7 to 1.9 m².
- Use a current, measured height and weight; local protocols say how often to recalculate.
X: Calculate the BSA of a person 170 cm tall weighing 70 kg.
> 170 × 70 = 11,900; ÷ 3,600 = 3.306.
> √3.306 = 1.82 m².
H: Dose from BSA
- Dose = dose per m² × BSA. For 75 mg/m² and a BSA of 1.6 m², the dose is 120 mg.
- Chemotherapy doses are often banded or capped (for example a BSA cap) and are checked independently under local protocols. These are specialist calculations.
H: Why BSA, and its limits
- BSA tracks blood volume, metabolic rate and kidney function better than weight alone, so it's used for drugs with narrow therapeutic ranges such as cytotoxics.
- Other formulas exist (Du Bois, Haycock for children); results differ slightly, so a unit should use one formula consistently.
- In very obese patients, some protocols cap the BSA (for example at 2.0 m²) or use adjusted weight. Follow the local protocol and the oncology pharmacist's advice.
P: **Investigate with the lab.** Calculate doses from body surface area and compare them with weight-based doses.
IX: pharmcalc
K: BSA = √(height × weight ÷ 3,600); dose = mg/m² × BSA, then apply protocol rules on banding and capping.
!: Using height in metres or inches in the Mosteller formula, which gives a wrong BSA.
Q: State the Mosteller formula. | BSA = √(height in cm × weight in kg ÷ 3,600)
Q: What's the dose for 75 mg/m² and a BSA of 1.6 m²? | 120 mg
SUM: Mosteller: BSA = √(cm × kg ÷ 3,600).
SUM: Dose = mg/m² × BSA, subject to local banding and capping protocols.
SRC: Mosteller RD, Simplified calculation of body-surface area, New England Journal of Medicine 317: 1098 | primary | 1987
SRC: Joint Formulary Committee, British National Formulary: body surface area in children and adults | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u06-11-q1@2: Medicine E is 75 mg/m²; the BSA is 1.6 m². What dose is that? | 120 mg | 75 mg | 46.9 mg | 160 mg | 12 mg | Dose = dose per square metre × BSA = 75 × 1.6 = 120 mg (before any local banding).
M2#pharmacy-u06-11-q2@1: In the Mosteller formula, which units are used? | Centimetres and kilograms | Metres and kilograms | Inches and pounds | Centimetres and grams | Metres and pounds | BSA = √(height in cm × weight in kg ÷ 3,600).
M3#pharmacy-u06-11-q3@1: What is the BSA of a person 160 cm tall weighing 90 kg? | 2.0 m² | 1.6 m² | 1.8 m² | 2.4 m² | 4.0 m² | 160 × 90 = 14,400; ÷ 3,600 = 4; √4 = 2.0 m².
NUM2#pharmacy-u06-11-q4@1: Calculate the body surface area of a person 170 cm tall weighing 70 kg, using the Mosteller formula. Give your answer to two decimal places. | 1.82 | 0.01 | m² | √(170 × 70 ÷ 3,600) = √3.306 = 1.82 m².
M2#pharmacy-u06-11-q5@1: A drug's dose is 100 mg/m²; the patient's BSA is 1.8 m². What is the dose? | 180 mg | 55.6 mg | 100 mg | 1.8 mg | Dose = BSA × dose per m² = 1.8 × 100 = 180 mg.

## Doses in children
S: Children's doses come from the BNF for Children (BNFC), by age band, weight or BSA. Old rules that scale adult doses by age are unsafe, and the product and the measuring device matter as much as the number.
O: Find and calculate children's doses using the BNFC approach
O: Identify the safety checks for children's doses
T: BNFC | The BNF for Children, the UK reference for children's doses by age, weight or BSA
T: Oral syringe | A purple or clearly marked syringe for measuring oral liquids, which doesn't fit injection devices
H: How children's doses are worked out
- Use the BNFC dose for the child's age band and the indication, by weight (mg/kg) or BSA where stated, and a current measured weight.
- Don't scale adult doses by age (Young's rule or Clark's rule): they ignore developmental differences in drug handling.
- Check that a weight-based dose doesn't exceed the adult dose, and that the dose is measurable with the product's strength.
X: A 16 kg child is prescribed Medicine F 15 mg/kg; the liquid is 120 mg in 5 mL. What volume?
> Dose = 15 × 16 = 240 mg.
> Volume = 240 ÷ 120 × 5 = 10 mL.
H: Safety checks
- Use an oral syringe for oral liquids, and choose a strength that gives a sensible volume.
- Check for excipients unsuitable in young children (for example some alcohol-containing or high-sugar products), using the BNFC and SPC.
- Count tenfold errors as a known risk in children: double-check decimals.
K: Use the BNFC by age and weight, check against the adult maximum, and make sure the volume is measurable with an oral syringe.
!: Scaling an adult dose by age, or giving a dose that is 10 times too high because of a misplaced decimal point.
Q: Which reference is used for children's doses in the UK? | The BNF for Children (BNFC).
Q: Why use an oral syringe? | It measures oral liquids accurately and can't be connected to injection devices.
SUM: Use BNFC doses by age, weight or BSA with a current weight.
SUM: Check against the adult maximum, and use a measurable volume and an oral syringe.
SRC: Paediatric Formulary Committee, BNF for Children | guidance | 2026 | https://bnfc.nice.org.uk/
SRC: National Patient Safety Agency, Patient Safety Alert 19: promoting safer measurement and administration of liquid medicines via oral and other enteral routes | guidance | 2007
M2#pharmacy-u06-12-q1@1: A 16 kg child needs 15 mg/kg; the liquid is 120 mg in 5 mL. What volume? | 10 mL | 2 mL | 12.5 mL | 5 mL | 16 mL | Dose = 15 × 16 = 240 mg; volume = 240 ÷ 120 × 5 = 10 mL, measured with an oral syringe.
M2#pharmacy-u06-12-q2@2: What's the best way to decide a child's dose? | The BNFC dose for age and weight | Young's rule from the adult dose | Half the adult dose | Clark's rule from the adult dose | The parent's usual dose | Age-scaling rules ignore how children handle drugs differently; use the BNFC.
M3#pharmacy-u06-12-q3@2: A weight-based dose for a large 13-year-old exceeds the adult dose. What should happen? | Cap it at the adult maximum and check | Give the full calculated dose | Halve the calculated dose | Use the child's age band only | Ignore it as children clear drugs faster | A calculated children's dose shouldn't exceed the adult maximum; check with the BNFC and prescriber.
NUM1#pharmacy-u06-12-q4@1: A child weighing 16 kg is prescribed Medicine F 15 mg/kg. The oral liquid contains 120 mg in 5 mL. What volume should be given? | 10 | 0.01 | mL | 15 × 16 = 240 mg; 240 ÷ 120 × 5 = 10 mL.

## Quantities to supply
S: Working out how much to supply is everyday pharmacy arithmetic: tablets for a course, millilitres of a liquid, doses in an inhaler, or grams of a cream. Original-pack dispensing and sensible pack sizes come into it too.
O: Calculate quantities to supply for tablets, liquids, inhalers and topical products
O: Apply original pack dispensing and pack-size considerations
T: Original pack dispensing | Supplying medicines in the manufacturer's pack, with its patient information leaflet, where possible
T: Fingertip unit (FTU) | The amount of cream squeezed from a standard tube along an adult fingertip, about 0.5 g
H: Calculating quantities
- Solid doses: tablets per dose × doses per day × days.
- Liquids: volume per dose × doses per day × days. 5 mL four times a day for 7 days is 140 mL.
- Inhalers: doses per inhaler ÷ puffs per day gives the days each lasts. A 200-dose inhaler used 2 puffs twice a day lasts 50 days.
- Topicals: fingertip units guide quantities; one FTU (about 0.5 g) covers an area of about two adult palms.
X: How many days does a 120-dose inhaler last at two puffs twice daily?
> Puffs a day: 2 × 2 = 4.
> 120 ÷ 4 = 30 days.
H: Practical points
- Round to complete packs where appropriate and permitted, and record any difference from the prescribed quantity.
- For controlled drugs, the quantity must be stated in words and figures on the prescription (School 16).
H: Courses that change
- For a reducing course, add each stage: 4 tablets daily for 3 days, then 3 daily for 3 days, then 2, then 1, totals (4 + 3 + 2 + 1) × 3 = 30 tablets.
- For "when required" medicines, supply a sensible quantity and state the maximum daily dose on the label.
- For liquids, round up to a whole bottle where appropriate, and check the product's in-use shelf life after opening.
P: **Investigate with the lab.** Work out quantities to supply for courses of treatment, rounding to whole packs where needed.
IX: pharmcalc
K: Quantity = dose × frequency × duration; for inhalers, divide the doses in the device by the doses used each day.
!: Forgetting that "two puffs twice a day" is four doses a day.
Q: How long does a 200-dose inhaler last at 2 puffs twice a day? | 50 days
Q: About how much is one fingertip unit? | About 0.5 g.
SUM: Quantity = dose × frequency × days.
SUM: Inhaler duration = doses in the device ÷ doses used each day.
SRC: Joint Formulary Committee, British National Formulary: prescription writing and quantities | guidance | 2026 | https://bnf.nice.org.uk/
SRC: Long CC, Finlay AY, The finger-tip unit: a new practical measure, Clinical and Experimental Dermatology 16: 444–447 | primary | 1991
M1#pharmacy-u06-13-q1@1: How much liquid for 5 mL four times a day for 7 days? | 140 mL | 35 mL | 28 mL | 70 mL | 120 mL | Volume = 5 mL per dose × 4 doses a day × 7 days = 140 mL.
M2#pharmacy-u06-13-q2@1: A 200-dose inhaler is used as two puffs twice a day. How long does it last? | 50 days | 100 days | 25 days | 200 days | 40 days | Two puffs twice a day is 4 puffs a day; 200 ÷ 4 = 50 days.
M2#pharmacy-u06-13-q3@2: Why is original pack dispensing encouraged? | People get the leaflet and an intact pack | It always costs the NHS less | It's required for every medicine | It removes the need to label | It avoids the clinical check | The manufacturer's pack keeps the leaflet and batch details together.
NUM1#pharmacy-u06-13-q4@1: How many days will a 120-dose inhaler last if the dose is two puffs twice a day? | 30 | 0 | days | 2 × 2 = 4 puffs a day; 120 ÷ 4 = 30 days.
M2#pharmacy-u06-13-q5@1: One tablet twice daily for 14 days. How many tablets are supplied? | 28 | 14 | 42 | 7 | One tablet, twice a day, for 14 days is 1 × 2 × 14 = 28 tablets.

## Infusion rates
S: Intravenous fluids and many medicines are given by infusion. You need to convert a volume and a time into a pump rate in mL per hour, or for gravity sets into drops per minute.
O: Calculate infusion rates in mL per hour
O: Calculate drip rates for gravity giving sets
T: Volumetric pump | A pump that delivers a set volume per hour
T: Drop factor | The number of drops per mL a giving set delivers (usually 20 for crystalloids and 15 for blood sets)
H: mL per hour
- Rate (mL/hour) = volume (mL) ÷ time (hours). 1 litre over 8 hours is 125 mL/hour.
- Convert minutes to hours where needed: 100 mL over 30 minutes is 200 mL/hour.
H: Drops per minute
- Drops/minute = volume (mL) × drop factor ÷ time (minutes).
- 1,000 mL over 8 hours with a 20 drops/mL set: 1,000 × 20 ÷ 480 = 41.7, about 42 drops a minute.
X: 500 mL is to run over 4 hours by pump. What rate?
> 500 ÷ 4 = 125 mL/hour.
H: Practical checks
- Check the total time with the rate: at 125 mL/hour, 1 litre takes 8 hours.
- Pumps are preferred for medicines and for anyone at risk from fluid overload (children, older people, heart failure); gravity sets are less accurate.
- Fluid prescriptions follow NICE guidance on assessment, the 5 Rs (resuscitation, routine maintenance, replacement, redistribution, reassessment) and monitoring of fluid balance and electrolytes.
- Example: 250 mL over 2 hours is 125 mL/hour, the same rate as 1 litre over 8 hours.
K: mL/hour = volume ÷ hours; drops/minute = volume × drop factor ÷ minutes. Check the drop factor on the giving set.
!: Using hours instead of minutes in the drops-per-minute formula.
Q: What is the rate for 1 litre over 8 hours? | 125 mL/hour
Q: What is the usual drop factor for a crystalloid giving set? | 20 drops/mL
SUM: mL/hour = volume ÷ time in hours.
SUM: Drops/minute = volume × drop factor ÷ time in minutes.
SRC: Rees JA, Smith I, Watson J, Introduction to Pharmaceutical Calculations, 4th edition, Pharmaceutical Press | secondary | 2015
SRC: NICE CG174, Intravenous fluid therapy in adults in hospital | guidance | 2017 | https://www.nice.org.uk/guidance/cg174
M1#pharmacy-u06-14-q1@1: What pump rate gives 100 mL over 30 minutes? | 200 mL/hour | 100 mL/hour | 50 mL/hour | 3.3 mL/hour | 30 mL/hour | 30 minutes is 0.5 hours; 100 ÷ 0.5 = 200 mL/hour.
M2#pharmacy-u06-14-q2@2: 1 L over 8 hours with a 20 drops/mL set: how many drops per minute? | 42 | 125 | 21 | 83 | 2.6 | 1,000 × 20 ÷ 480 = 41.7, about 42 drops/minute.
M2#pharmacy-u06-14-q3@2: Which figure must you check before calculating a gravity drip rate? | The set's drop factor | The patient's height | The bag's expiry time | The pump's battery | The fluid's pH | Giving sets deliver different numbers of drops per mL.
NUM1#pharmacy-u06-14-q4@1: 500 mL of fluid is to be given over 4 hours by volumetric pump. What rate should be set? | 125 | 0 | mL/hour | 500 ÷ 4 = 125 mL/hour.

## Drug infusions in mg per hour
S: Medicine infusions are prescribed as a dose rate (mg per hour, or micrograms per kg per minute). You need to move between the dose rate, the infusion's concentration and the pump rate in mL per hour.
O: Calculate dose rates from an infusion's concentration and pump rate
O: Convert micrograms/kg/minute prescriptions to mL per hour
T: Dose rate | The amount of drug given per unit time, such as mg/hour
T: Concentration of an infusion | Total drug ÷ total volume, for example 50 mg in 50 mL = 1 mg/mL
H: From pump rate to dose rate
- Dose rate = concentration × pump rate. 50 mg in 50 mL (1 mg/mL) at 4 mL/hour gives 4 mg/hour.
- Pump rate = dose rate ÷ concentration.
H: Micrograms per kg per minute
- Micrograms per hour = micrograms/kg/minute × weight × 60.
- Then mL/hour = micrograms per hour ÷ concentration in micrograms/mL.
X: Medicine X is prescribed at 5 micrograms/kg/minute for a 70 kg patient. The infusion is 400 mg in 250 mL. What rate?
> Concentration: 400 mg ÷ 250 mL = 1.6 mg/mL = 1,600 micrograms/mL.
> Dose: 5 × 70 × 60 = 21,000 micrograms/hour.
> Rate: 21,000 ÷ 1,600 = 13.1 mL/hour.
H: Checking an infusion
- Work backwards: from the pump rate and concentration, calculate the dose actually being given and compare it with the prescription.
- Example: 13.1 mL/hour × 1,600 micrograms/mL = 20,960 micrograms/hour; ÷ 60 ÷ 70 = 4.99 micrograms/kg/minute, which matches 5.
- Standard concentrations (agreed locally) reduce calculation errors; use them where they exist, and the Injectable Medicines Guide for preparation and compatibility.
P: **Investigate with the lab.** Convert doses in mg per hour into pump rates in mL per hour, then back again.
IX: pharmcalc
K: Convert everything to the same units (usually micrograms and hours) before dividing.
!: Forgetting to multiply by 60 when converting a per-minute dose to per hour, a sixtyfold error.
Q: What's the dose rate of 50 mg in 50 mL at 4 mL/hour? | 4 mg/hour
Q: How do you convert micrograms/kg/minute to micrograms/hour? | Multiply by weight and by 60.
SUM: Dose rate = concentration × pump rate.
SUM: For per-kg-per-minute doses, multiply by weight and 60, then divide by concentration.
SRC: Rees JA, Smith I, Watson J, Introduction to Pharmaceutical Calculations, 4th edition, Pharmaceutical Press | secondary | 2015
SRC: Medusa NHS Injectable Medicines Guide | guidance | 2026 | https://www.medusaimg.nhs.uk/
M1#pharmacy-u06-15-q1@1: 50 mg in 50 mL runs at 4 mL/hour. What dose per hour? | 4 mg/hour | 1 mg/hour | 0.08 mg/hour | 12.5 mg/hour | 200 mg/hour | The infusion is 1 mg/mL, so dose rate = 1 mg/mL × 4 mL/hour = 4 mg/hour.
M3#pharmacy-u06-15-q2@2: 5 micrograms/kg/minute for 70 kg; infusion 400 mg in 250 mL. What rate? | 13.1 mL/hour | 0.22 mL/hour | 21 mL/hour | 787.5 mL/hour | 1.6 mL/hour | 21,000 micrograms/hour ÷ 1,600 micrograms/mL = 13.1 mL/hour.
M2#pharmacy-u06-15-q3@1: 250 mg in 500 mL runs at 20 mL/hour. What dose per hour? | 10 mg/hour | 5 mg/hour | 20 mg/hour | 40 mg/hour | 2.5 mg/hour | Concentration = 250 ÷ 500 = 0.5 mg/mL; dose rate = 0.5 × 20 = 10 mg/hour.
NUM2#pharmacy-u06-15-q4@2: Medicine X is prescribed at 5 micrograms/kg/minute for a 70 kg patient. The infusion contains 400 mg in 250 mL. What rate is needed, in mL per hour, to one decimal place? | 13.1 | 0.05 | mL/hour | 5 × 70 × 60 = 21,000 micrograms/hour; 400 mg in 250 mL = 1,600 micrograms/mL; 21,000 ÷ 1,600 = 13.1 mL/hour.
M2#pharmacy-u06-15-q5@1: An infusion of 50 mg in 50 mL runs at 5 mg/hour. What is the pump rate? | 5 mL/hour | 10 mL/hour | 1 mL/hour | 50 mL/hour | The concentration is 1 mg/mL, so 5 mg/hour is 5 mL/hour.

## Displacement values
S: When a powder is dissolved or a drug is incorporated into a suppository base, the drug itself takes up space. Displacement values let you account for it, so the final concentration or suppository weight is right.
O: Calculate the diluent volume for a powder injection using its displacement value
O: Calculate the base needed for medicated suppositories using a displacement value
T: Displacement value (injections) | The volume the powder occupies once dissolved, stated in the product information
T: Displacement value (suppositories) | The number of grams of drug that displaces 1 g of base
H: Powder injections
- Final volume = amount of drug ÷ concentration wanted.
- Diluent to add = final volume − displacement volume.
- Example: a 1 g vial with a displacement of 0.8 mL, to give 100 mg/mL: final volume 10 mL; add 9.2 mL.
H: Suppositories
- Base needed = (number of suppositories × mould capacity) − (total drug ÷ displacement value).
- Example: 10 suppositories in a 1 g mould, each with 200 mg of a drug with displacement value 1.5: total drug 2 g displaces 2 ÷ 1.5 = 1.33 g of base, so 10 − 1.33 = 8.67 g of base.
- In practice, calculate for a few extra suppositories to allow for losses.
X: A 500 mg vial has a displacement value of 0.4 mL. What diluent gives 250 mg/mL?
> Final volume: 500 ÷ 250 = 2 mL.
> Diluent: 2 − 0.4 = 1.6 mL.
H: Where the values come from
- Injection displacement volumes are in the SPC or the product's reconstitution table, and differ between brands of the same drug: always use the value for the product in your hand.
- Some products give a table of diluent volumes for common concentrations instead of a displacement value.
- For suppositories, displacement values are published for common drugs in specific bases (such as hard fat), and the calculation assumes a mould calibrated with that base.
P: **Investigate with the lab.** Use displacement values to work out how much diluent to add for a required concentration.
IX: pharmcalc
K: Account for the volume the drug occupies: diluent = final volume − displacement.
!: Adding the whole final volume as diluent, which makes the solution weaker than intended.
Q: How do you find the diluent volume for a powder injection? | Final volume (drug ÷ concentration) minus the displacement volume.
Q: What does a suppository displacement value of 1.5 mean? | 1.5 g of the drug displaces 1 g of base.
SUM: Diluent = final volume − displacement volume.
SUM: Suppository base = total mould capacity − total drug ÷ displacement value.
SRC: Rees JA, Smith I, Watson J, Introduction to Pharmaceutical Calculations, 4th edition, Pharmaceutical Press | secondary | 2015
SRC: Aulton ME, Taylor KMG (editors), Aulton's Pharmaceutics, 6th edition, Elsevier | secondary | 2021
M2#pharmacy-u06-16-q1@1: A 1 g vial displaces 0.8 mL. What diluent gives 100 mg/mL? | 9.2 mL | 10 mL | 10.8 mL | 8 mL | 9.6 mL | Final volume 1,000 ÷ 100 = 10 mL; 10 − 0.8 = 9.2 mL.
M3#pharmacy-u06-16-q2@2: Ten 1 g suppositories each contain 200 mg of drug (displacement value 1.5). How much base? | 8.67 g | 10 g | 8 g | 7 g | 11.33 g | 2 g of drug displaces 2 ÷ 1.5 = 1.33 g of base; 10 − 1.33 = 8.67 g.
M2#pharmacy-u06-16-q3@2: What happens if displacement is ignored when reconstituting? | The concentration is lower than intended | The concentration is higher than intended | The volume is smaller | Nothing changes | The powder won't dissolve | The drug adds volume, so total volume is larger and the solution weaker.
NUM2#pharmacy-u06-16-q4@1: A vial of Medicine Y contains 1 g of powder with a displacement value of 0.8 mL. What volume of diluent must be added to give 100 mg/mL? | 9.2 | 0.01 | mL | Final volume = 1,000 ÷ 100 = 10 mL; 10 − 0.8 = 9.2 mL.
M2#pharmacy-u06-16-q5@1: Why do displacement values matter when reconstituting powders? | The powder takes up volume, changing the final concentration | They show how fast the powder dissolves | They give the drug's expiry date | They measure the powder's weight in grams | Without allowing for displacement, the solution would be weaker than intended.

## Estimating renal function
S: Many drugs are cleared by the kidneys, so doses depend on renal function. Labs report eGFR, but drug dosing information often uses creatinine clearance from the Cockcroft-Gault equation, and the two can differ markedly.
O: Calculate creatinine clearance using the Cockcroft-Gault equation
O: Decide when creatinine clearance should be used instead of eGFR
T: Creatinine clearance (CrCl) | An estimate of renal function, in mL/minute, from age, weight, sex and serum creatinine
T: eGFR | Estimated glomerular filtration rate, reported by labs and normalised to 1.73 m² of body surface area
H: Cockcroft-Gault
- CrCl (mL/min) = (140 − age) × weight (kg) × constant ÷ serum creatinine (micromol/L).
- The constant is 1.23 for men and 1.04 for women.
- Which weight to use (actual, ideal or adjusted) depends on the drug and the patient; follow the BNF and local guidance.
X: A woman aged 80, weighing 60 kg, has a serum creatinine of 100 micromol/L. Estimate her CrCl.
> (140 − 80) × 60 × 1.04 = 3,744.
> 3,744 ÷ 100 = 37.4, about 37 mL/minute.
H: eGFR or CrCl?
- The MHRA advises using CrCl (Cockcroft-Gault) for direct oral anticoagulants, and for older people, people at extremes of body weight and drugs with a narrow therapeutic index that are mainly renally cleared.
- eGFR is normalised to 1.73 m², which can overestimate function in small, older people.
- Check the drug's SPC: dosing thresholds are usually given as CrCl.
P: **Investigate with the lab.** Estimate creatinine clearance with the Cockcroft–Gault equation and see how age and weight change it.
IX: pharmcalc
K: Use Cockcroft-Gault CrCl for DOACs and for narrow-margin renally cleared drugs, especially in older people and at extremes of weight.
!: Using eGFR for a DOAC dose in a frail older person, which may overestimate renal function and lead to overdose.
Q: State the Cockcroft-Gault equation. | CrCl = (140 − age) × weight × constant (1.23 men, 1.04 women) ÷ serum creatinine (micromol/L).
Q: For which drugs does the MHRA advise using CrCl? | DOACs, and narrow-therapeutic-index renally cleared drugs, especially in older people and at extremes of weight.
SUM: Cockcroft-Gault estimates CrCl in mL/minute.
SUM: Use CrCl, not eGFR, where the MHRA and the SPC say so.
SRC: Cockcroft DW, Gault MH, Prediction of creatinine clearance from serum creatinine, Nephron 16: 31–41 | primary | 1976
SRC: MHRA, Drug Safety Update: prescribing medicines in renal impairment, using the appropriate estimate of renal function | guidance | 2019-10 | https://www.gov.uk/drug-safety-update
M2#pharmacy-u06-17-q1@1: What is the CrCl of a woman aged 80, 60 kg, creatinine 100 micromol/L? | About 37 mL/min | About 44 mL/min | About 60 mL/min | About 30 mL/min | About 52 mL/min | (140 − 80) × 60 × 1.04 ÷ 100 = 37.4 mL/min, using the constant 1.04 for women.
M2#pharmacy-u06-17-q2@2: For a DOAC dose in a frail 85-year-old, which estimate should you use? | Creatinine clearance (Cockcroft-Gault) | The lab's eGFR | Serum creatinine alone | Urine output | The patient's age alone | The MHRA advises CrCl for DOACs; eGFR can overestimate renal function in older, smaller people.
M3#pharmacy-u06-17-q3@1: A man aged 70, 80 kg, creatinine 140 micromol/L. What is his CrCl? | About 49 mL/min | About 40 mL/min | About 57 mL/min | About 70 mL/min | About 35 mL/min | (140 − 70) × 80 × 1.23 ÷ 140 = 6,888 ÷ 140 = 49.2 mL/min.
NUM2#pharmacy-u06-17-q4@1: Estimate the creatinine clearance of a woman aged 80, weighing 60 kg, with a serum creatinine of 100 micromol/L, using Cockcroft-Gault. Give your answer to the nearest whole number. | 37 | 1 | mL/min | (140 − 80) × 60 × 1.04 ÷ 100 = 37.4, so 37 mL/min.
M2#pharmacy-u06-17-q5@1: How does age affect estimated creatinine clearance in Cockcroft–Gault? | Clearance falls as age rises | Clearance rises with age | Age has no effect | Clearance is fixed after 40 | The equation uses (140 − age), so older patients have lower estimates.

## Dose adjustment in renal impairment
S: When kidney function falls, drugs cleared by the kidneys accumulate. Doses are adjusted by lowering each dose, lengthening the interval, or both, following the drug's specific guidance.
O: Explain how and why doses of renally cleared drugs are adjusted
O: Calculate a proportional dose adjustment and identify its limits
T: Dose reduction | Keeping the interval and giving a smaller dose
T: Interval extension | Keeping the dose and giving it less often
H: Principles
- Loading doses usually stay the same: they depend on volume of distribution, not clearance.
- Maintenance doses fall in proportion to clearance for drugs mainly excreted unchanged by the kidney.
- Dose reduction keeps levels steadier; interval extension keeps peaks higher (useful for some drugs, such as aminoglycosides, where peaks matter).
- Avoid nephrotoxic drugs where possible, and watch for combinations (an ACE inhibitor, a diuretic and an NSAID together raise the risk of acute kidney injury).
X: Illustrative only: a drug entirely cleared by the kidneys is given at 500 mg 12-hourly. If clearance is 40% of normal and the interval is kept, what dose gives similar exposure?
> Maintenance dose scales with clearance: 500 × 0.4 = 200 mg 12-hourly.
> In practice, use the dose in the BNF or SPC for that level of renal function, not a proportional estimate.
H: Where to look
- The BNF's renal impairment advice and the SPC give specific thresholds and doses.
- Specialist references (such as the Renal Drug Database) and renal pharmacists help in complex cases.
- Recheck renal function if the patient's condition changes.
K: Loading doses rarely change; maintenance doses or intervals do. Always use the drug-specific BNF or SPC advice.
!: Reducing a loading dose in renal impairment and leaving the patient sub-therapeutic for longer.
Q: Which dose usually stays the same in renal impairment? | The loading dose.
Q: Name the two ways to adjust a maintenance regimen. | Reduce the dose or extend the interval (or both).
SUM: Renally cleared drugs need maintenance dose reduction or longer intervals as clearance falls.
SUM: Use drug-specific guidance from the BNF, SPC or renal pharmacist.
SRC: Joint Formulary Committee, British National Formulary: prescribing in renal impairment | guidance | 2026 | https://bnf.nice.org.uk/
SRC: Ashley C, Dunleavy A (editors), The Renal Drug Handbook, 5th edition, CRC Press | secondary | 2018
M2#pharmacy-u06-18-q1@1: For a renally cleared drug, which usually stays the same in renal impairment? | The loading dose | The maintenance dose | The dosing interval | The daily total | The infusion rate | Loading doses depend on volume of distribution, which kidney disease doesn't usually change.
M3#pharmacy-u06-18-q2@2: Illustrative: a fully renally cleared drug at 500 mg 12-hourly; clearance is 40% of normal. Same interval: what dose? | 200 mg | 300 mg | 500 mg | 125 mg | 1,250 mg | Maintenance dose scales with clearance: 500 × 0.4 = 200 mg (use the BNF or SPC in practice).
M2#pharmacy-u06-18-q3@2: Which combination particularly raises the risk of acute kidney injury? | ACE inhibitor, diuretic and NSAID | Paracetamol, laxative and antacid | Statin, aspirin and PPI | Insulin, metformin and statin | Antihistamine, saline and vitamin D | The "triple whammy" reduces renal perfusion in several ways at once.
NUM1#pharmacy-u06-18-q4@2: Illustrative only: a drug entirely cleared by the kidneys is given at 500 mg every 12 hours. Renal clearance falls to 40% of normal. Keeping the interval, what dose gives similar exposure? | 200 | 0 | mg | 500 × 0.4 = 200 mg. In practice, use the BNF or SPC dose for that renal function.

## Pharmacokinetic calculations
S: A few simple pharmacokinetic equations explain loading doses, steady state and dosing intervals, and they appear in exams and in therapeutic drug monitoring. Each one links clearance, volume of distribution and half-life.
O: Use half-life, the elimination rate constant, clearance and volume of distribution in calculations
O: Calculate loading and maintenance doses
T: Elimination rate constant (k) | The fraction of drug eliminated per unit time; k = 0.693 ÷ half-life
T: Volume of distribution (Vd) | The apparent volume a drug distributes into; amount in body ÷ plasma concentration
H: The key equations
- k = 0.693 ÷ t½, and t½ = 0.693 ÷ k.
- Clearance (CL) = k × Vd.
- Loading dose = target concentration × Vd ÷ F (bioavailability).
- Maintenance dose rate = CL × target steady-state concentration ÷ F.
- Steady state is reached after about 4 to 5 half-lives.
X: A drug has a Vd of 50 L. What loading dose gives a plasma concentration of 10 mg/L (F = 1)?
> Loading dose = 10 mg/L × 50 L = 500 mg.
H: Exponential decline
- After one half-life, 50% remains; after two, 25%; after three, 12.5%.
- C = C₀ × e^(−kt) gives the concentration at any time.
H: Putting it to use
- A drug with a long half-life (days) takes a long time to reach steady state, which is why some are started with a loading dose.
- If a drug is stopped, it takes about 4 to 5 half-lives to be largely eliminated: relevant to switching medicines and to washout periods.
- Therapeutic drug monitoring compares a measured level with the target, then adjusts the dose; for drugs with linear kinetics, a level changes in proportion to the dose.
- Example: if a steady-state level is 5 mg/L on 200 mg daily and the target is 7.5 mg/L, the new dose for a linear drug is 200 × 7.5 ÷ 5 = 300 mg daily (in practice, follow the drug's TDM guidance).
K: Half-life gives k and the time to steady state; Vd gives the loading dose; clearance gives the maintenance dose.
!: Expecting steady state after one half-life: it takes about 4 to 5.
Q: How is k calculated from half-life? | k = 0.693 ÷ t½
Q: How long until steady state? | About 4 to 5 half-lives.
SUM: Loading dose = Cp × Vd ÷ F; maintenance rate = CL × Css ÷ F.
SUM: CL = k × Vd; t½ = 0.693 ÷ k.
SRC: Rowland M, Tozer TN, Clinical Pharmacokinetics and Pharmacodynamics, 5th edition, Wolters Kluwer | secondary | 2019
M2#pharmacy-u06-19-q1@1: A drug has a half-life of 6 hours. What is k, approximately? | 0.12 per hour | 0.69 per hour | 4.2 per hour | 6 per hour | 0.06 per hour | k = 0.693 ÷ half-life = 0.693 ÷ 6 = 0.116, about 0.12 per hour.
M3#pharmacy-u06-19-q2@1: A drug's half-life is 8 hours. About how long to reach steady state? | 32 to 40 hours | 8 hours | 16 hours | 4 to 5 days | 80 hours | Steady state takes about 4 to 5 half-lives: 4 × 8 = 32 to 5 × 8 = 40 hours.
M2#pharmacy-u06-19-q3@2: What fraction of a dose remains after three half-lives? | 12.5% | 33% | 25% | 6.25% | 3% | Each half-life halves what remains: 100% → 50% → 25% → 12.5% after three.
NUM2#pharmacy-u06-19-q4@2: A drug has a volume of distribution of 50 L and complete bioavailability. What loading dose gives a plasma concentration of 10 mg/L? | 500 | 0 | mg | Loading dose = 10 mg/L × 50 L = 500 mg.

## Calculations in the registration assessment
S: The GPhC registration assessment has a calculations paper, and calculation errors are a common reason candidates struggle. A systematic method, estimation and careful reading matter more than speed.
O: Describe the calculations component of the registration assessment
O: Apply a systematic method to avoid common errors under exam conditions
T: Registration assessment | The GPhC's assessment that trainees must pass to register as pharmacists
T: Systematic method | Read, identify units, estimate, calculate, check, then answer in the requested format
H: The paper
- The assessment has a calculations paper (Part 1) and a paper of single best answer and extended matching questions (Part 2). The GPhC sets the number of questions, timings, resources provided and calculator arrangements: check its current information before you sit.
- Answers are numerical, so the units and the number of decimal places asked for matter.
H: A method that works
- Read the whole question twice: per dose or per day? mg or micrograms? which weight?
- Write the units at every step and convert first.
- Estimate the answer's size before calculating, then check the result against your estimate.
- Give the answer in the unit and precision asked for.
X: "Medicine Z 2 mg/kg/day in four divided doses for a 20 kg child. What is each dose?"
> Daily: 2 × 20 = 40 mg.
> Each dose: 40 ÷ 4 = 10 mg.
> Check: a small child, a small dose: plausible.
K: Read, convert, estimate, calculate, check, answer as asked. Most marks lost are in the reading, not the arithmetic.
!: Answering the daily dose when the question asks for each dose, or giving an answer in the wrong unit.
Q: What two things should you confirm on first reading? | Whether the dose is per dose or per day, and the units.
Q: Why estimate first? | To spot answers that are wrong by a large factor.
SUM: Use the same systematic method for every calculation.
SUM: Check the GPhC's current information on the format and resources.
SRC: General Pharmaceutical Council, Registration assessment: framework and information for candidates | guidance | 2026 | https://www.pharmacyregulation.org/education/registration-assessment
M1#pharmacy-u06-20-q1@2: 2 mg/kg/day in four divided doses for a 20 kg child. What's each dose? | 10 mg | 40 mg | 2 mg | 80 mg | 5 mg | 2 × 20 = 40 mg a day; divided by 4 = 10 mg per dose.
M2#pharmacy-u06-20-q2@2: What's the best first step with a calculation question? | Read it and check the units | Start dividing at once | Look at the answer format only | Use the largest number given | Skip to the next question | Most errors come from misreading per dose, per day or units.
M2#pharmacy-u06-20-q3@1: Which statement about the registration assessment is right? | It includes a calculations paper | It has no numerical questions | It is a practical skills test | Calculations are optional | It's set by each university | The GPhC's assessment includes a calculations part; check its current format and arrangements.
NUM1#pharmacy-u06-20-q4@2: Medicine Z is prescribed at 2 mg/kg/day in four divided doses for a child weighing 20 kg. What is each dose? | 10 | 0 | mg | 2 × 20 = 40 mg a day; 40 ÷ 4 = 10 mg each dose.
`;
