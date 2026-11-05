// LawGradify reasoning case: negligence and contributory negligence (England and Wales, as at 2026).
// Fictional facts. Authorities: Donoghue v Stevenson [1932] AC 562; Robinson v Chief Constable of West
// Yorkshire Police [2018] UKSC 4; Nettleship v Weston [1971] 2 QB 691; Barnett v Chelsea and Kensington
// HMC [1969] 1 QB 428; Froom v Butcher [1976] QB 286; Law Reform (Contributory Negligence) Act 1945, s 1.
export default {
  id: "learner-driver", title: "Leo's crash: a learner driver and a passenger without a seatbelt", area: "Tort: negligence", jurisdiction: "England and Wales",
  brief: "You're a trainee solicitor. Leo Marsh has been injured in a car crash and wants to know whether he can claim against the driver, his friend Priya Shah, and how much he might recover. Work through the problem and advise him.",
  facts: [
    [["Priya Shah, 18, holds a provisional licence and was driving her own insured car, supervised by her uncle, who holds a full licence.", "Her status as a learner raises the question of what standard of care applies."],
      ["Her friend Leo Marsh was a passenger in the back seat."],
      ["Leo knew Priya was a learner, and joked that he was \"taking his life in his hands\".", "Looks like consent to risk, but volenti isn't available against a passenger in a motor vehicle (Road Traffic Act 1988, s 149), and knowledge of inexperience doesn't lower the standard."],
      ["Leo didn't put on his seatbelt.", "Failing to wear a seatbelt is the classic example of contributory negligence."]],
    [["It was raining, and Priya took a sharp bend on a 30 mph road at about 45 mph.", "Speed well over the limit on a wet bend is the evidence of breach."],
      ["The car left the road and hit a tree.", "The crash is the mechanism of harm for causation."],
      ["Priya had passed her theory test the week before."],
      ["Leo broke his leg and suffered head injuries when he was thrown against the front seat.", "These are the injuries he claims for: personal injury, a plainly foreseeable kind of harm."]],
    [["A medical report says that a seatbelt would have made his head injuries considerably less severe, but wouldn't have prevented them; his broken leg would have happened anyway.", "This fixes the likely reduction for contributory negligence (Froom v Butcher)."],
      ["Leo has been off work for four months."]],
  ],
  issues: [
    { id: "duty", correct: true, label: "Did Priya owe Leo a duty of care?", why: "Every claim in negligence starts with duty. Driver to passenger is an established duty, so it's short, but it must be dealt with.",
      lessons: ["u04-03"], core: ["Robinson v Chief Constable of West Yorkshire Police"], support: ["Donoghue v Stevenson", "Nettleship v Weston"],
      rule: "A duty of care exists in established categories by precedent: drivers owe a duty to other road users and their passengers. The Caparo three-stage approach is needed only in novel situations (Robinson v Chief Constable of West Yorkshire Police).",
      points: [
        { text: "Drivers owe a duty of care to their passengers: an established category.", cues: [["passenger", "road user"], ["duty"]] },
        { text: "Because the category is established, there's no need for the Caparo test (Robinson).", cues: [["established", "precedent", "robinson", "settled", "well-known", "recognised"]] },
        { text: "Physical injury from careless driving is a foreseeable harm to someone in the car.", cues: [["foreseeab"], ["injur", "harm"]] },
      ],
      conclusion: { q: "What's your conclusion on duty?", options: [
        { t: "Priya owed Leo a duty of care as his driver.", correct: true, why: "Driver to passenger is a settled duty: it can be dealt with briefly." },
        { t: "There's no duty because Leo knew she was a learner.", why: "Knowledge of inexperience goes (at most) to defences, and the courts reject it even there for passengers." },
        { t: "A duty exists only if all three Caparo stages are satisfied afresh.", why: "Robinson confirms Caparo is for novel cases, not established categories." },
        { t: "Only her supervising uncle owed Leo a duty.", why: "The driver owes the duty; any duty of the supervisor is separate and doesn't displace hers." },
      ] } },
    { id: "breach", correct: true, label: "Did Priya breach that duty?", why: "The central issue: whether a learner is judged by a lower standard, and whether her driving fell below it.",
      lessons: ["u04-06"], core: ["Nettleship v Weston"], support: ["Bolton v Stone"],
      rule: "The standard is objective: that of the reasonably competent and experienced driver. A learner's inexperience doesn't lower it (Nettleship v Weston), even towards someone who knows they're a learner.",
      points: [
        { text: "The standard is the objective one of a reasonably competent driver.", cues: [["reasonabl"], ["driver"], ["standard", "objective"]] },
        { text: "Priya's inexperience as a learner doesn't lower that standard (Nettleship v Weston).", cues: [["learner", "inexperien", "provisional"], ["nettleship", "no defence", "doesn't lower", "does not lower", "not lowered", "same standard", "irrelevant", "not reduced", "no lower"]] },
        { text: "Taking a wet bend at about 45 mph in a 30 mph limit falls below that standard.", cues: [["45", "speed", "too fast", "mph"], ["bend", "wet", "rain", "limit"]] },
        { text: "Leo's knowledge that she was a learner doesn't change the standard owed to him.", cues: [["knew", "knowledge", "aware"], ["learner", "inexperien"]] },
      ],
      conclusion: { q: "What's your conclusion on breach?", options: [
        { t: "Priya fell below the standard of a reasonably competent driver; her inexperience is no answer.", correct: true, why: "Nettleship v Weston: one objective standard for all drivers." },
        { t: "There's no breach because she did as well as a reasonable learner could.", why: "That's the lower, subjective standard the Court of Appeal rejected in Nettleship." },
        { t: "There's no breach because the road was wet.", why: "Wet roads call for more care, not less: they make the speed more obviously careless." },
        { t: "Breach depends on whether she'd passed her theory test.", why: "The theory test is irrelevant to the objective standard of driving." },
      ] } },
    { id: "causation", correct: true, label: "Did the breach cause Leo's injuries, and is the harm too remote?", why: "Leo must show the careless driving caused his injuries, and that the kind of harm was foreseeable.",
      lessons: ["u04-08", "u04-10"], core: ["Barnett v Chelsea and Kensington Hospital Management Committee"], support: ["The Wagon Mound (No 1)"],
      rule: "Factual causation uses the but-for test (Barnett v Chelsea and Kensington HMC): would the harm have happened but for the breach? The kind of harm must also be reasonably foreseeable, not too remote (The Wagon Mound (No 1)).",
      points: [
        { text: "But for the excessive speed, the car wouldn't have left the road.", cues: [["but for", "but-for"]] },
        { text: "So the breach caused the crash and Leo's injuries.", cues: [["caus"], ["injur", "crash", "collision"]] },
        { text: "Personal injury in a crash is a foreseeable kind of harm, so it isn't too remote.", cues: [["remote", "foreseeab", "wagon mound"]] },
      ],
      conclusion: { q: "What's your conclusion on causation?", options: [
        { t: "Priya's breach caused Leo's injuries, and they aren't too remote.", correct: true, why: "But-for causation is clear, and personal injury is the obvious foreseeable harm." },
        { t: "Leo's failure to wear a seatbelt breaks the chain of causation entirely.", why: "It contributed to his head injuries, which reduces damages; it doesn't break the chain (the crash still caused the harm)." },
        { t: "The rain caused the crash, not Priya.", why: "Rain was a condition; driving too fast for it was the cause." },
        { t: "Causation fails because the leg would have broken anyway.", why: "The leg would have broken anyway even with a seatbelt, but not without the crash: the crash is what caused it." },
      ] } },
    { id: "contrib", correct: true, label: "Should Leo's damages be reduced for contributory negligence?", why: "Not wearing a seatbelt is a failure to take care for his own safety, and the medical report allows the reduction to be estimated.",
      lessons: ["u04-28"], core: ["Law Reform (Contributory Negligence) Act 1945, s 1", "Froom v Butcher"], support: [],
      rule: "Where the claimant's own fault contributes to the damage, damages are reduced to the extent the court thinks just and equitable (Law Reform (Contributory Negligence) Act 1945, s 1). For seatbelts, Froom v Butcher suggests 25% if a belt would have prevented the injury altogether, 15% if it would have made it less severe, and nothing if it would have made no difference.",
      points: [
        { text: "Not wearing a seatbelt is a failure to take reasonable care for his own safety.", cues: [["seatbelt", "seat belt"], ["own safety", "reasonable care", "contribut", "fault", "careless"]] },
        { text: "Damages are reduced as is just and equitable under s 1 of the 1945 Act.", cues: [["1945", "just and equitable", "reduc"]] },
        { text: "Froom v Butcher: 15% where a belt would have made the injuries less severe (25% if it would have prevented them).", cues: [["15"], ["froom", "less severe"]] },
        { text: "The reduction applies to the head injuries; the broken leg would have happened anyway, so it isn't reduced.", cues: [["leg"], ["anyway", "no difference", "not reduce", "wouldn't", "would not", "unaffected", "regardless"]] },
      ],
      conclusion: { q: "What's the most likely outcome on contributory negligence?", options: [
        { t: "A reduction of around 15% for the head injuries, with no reduction for the broken leg.", correct: true, why: "Froom v Butcher's guide for injuries a belt would have made less severe; the leg injury was unaffected by the belt." },
        { t: "A 25% reduction of all his damages.", why: "25% is for injuries a belt would have prevented altogether, and the leg would have broken anyway." },
        { t: "His claim fails completely because he didn't wear a seatbelt.", why: "Contributory negligence reduces damages; it isn't a complete defence." },
        { t: "No reduction, because Priya was the one at fault.", why: "Both can be at fault: the Act apportions responsibility for the damage." },
      ] } },
    { id: "volenti", correct: false, label: "Did Leo consent to the risk of injury (volenti non fit injuria)?", why: "Volenti can't be relied on against a passenger in a motor vehicle where insurance is compulsory (Road Traffic Act 1988, s 149), and a joke about the risk isn't real consent anyway." },
    { id: "occupier", correct: false, label: "Is Priya liable as occupier of the car under the Occupiers' Liability Act 1957?", why: "The claim is about how the car was driven, not the state of premises: it's ordinary negligence." },
    { id: "vicarious", correct: false, label: "Is the uncle vicariously liable for Priya's driving?", why: "Vicarious liability needs a relationship like employment; supervising a learner isn't one. Any claim against the uncle would be for his own negligence, and isn't what Leo asked about." },
  ],
  bank: [
    { name: "Donoghue v Stevenson", cite: "[1932] AC 562", gist: "The neighbour principle: a duty to take reasonable care to avoid acts or omissions that could foreseeably injure your neighbour." },
    { name: "Robinson v Chief Constable of West Yorkshire Police", cite: "[2018] UKSC 4", gist: "Caparo isn't a test for every case: in established categories (like physical injury caused by positive acts) the duty follows precedent." },
    { name: "Caparo Industries plc v Dickman", cite: "[1990] 2 AC 605", gist: "Foreseeability, proximity, and whether a duty would be fair, just and reasonable: for novel situations." },
    { name: "Nettleship v Weston", cite: "[1971] 2 QB 691", gist: "A learner driver owes the same objective standard as a reasonably competent driver, even to an instructor who knows of the inexperience." },
    { name: "Bolam v Friern Hospital Management Committee", cite: "[1957] 1 WLR 582", gist: "The standard for professionals exercising special skills: a responsible body of professional opinion." },
    { name: "Mullin v Richards", cite: "[1998] 1 WLR 1304", gist: "A child is judged by the standard of a reasonable child of the same age." },
    { name: "Bolton v Stone", cite: "[1951] AC 850", gist: "The probability of harm is relevant to whether reasonable care was taken." },
    { name: "Barnett v Chelsea and Kensington Hospital Management Committee", cite: "[1969] 1 QB 428", gist: "The but-for test: a breach that made no difference to the outcome didn't cause the harm." },
    { name: "The Wagon Mound (No 1)", cite: "[1961] AC 388", gist: "Damage is recoverable only if its kind was reasonably foreseeable." },
    { name: "Froom v Butcher", cite: "[1976] QB 286", gist: "Not wearing a seatbelt: reduce damages by 25% if a belt would have prevented the injury, 15% if it would have made it less severe." },
    { name: "Law Reform (Contributory Negligence) Act 1945, s 1", cite: "8 & 9 Geo 6 c 28", gist: "Damages are reduced as the court thinks just and equitable, having regard to the claimant's share in the responsibility for the damage." },
    { name: "Occupiers' Liability Act 1957", cite: "5 & 6 Eliz 2 c 31", gist: "The duty of an occupier to visitors for the state of premises." },
  ],
  advice: { q: "What should you advise Leo?", options: [
    { t: "He has a strong claim against Priya in negligence, but his damages for the head injuries are likely to be reduced by around 15% because he wasn't wearing a seatbelt.", correct: true, why: "Duty, breach and causation are all established; contributory negligence reduces, but doesn't defeat, the claim. (Priya's insurer would usually deal with the claim.)" },
    { t: "He has no claim because he accepted the risk of travelling with a learner.", why: "Volenti isn't available against a passenger in a motor vehicle (Road Traffic Act 1988, s 149), and Nettleship rejects a lower standard for learners." },
    { t: "He can recover full damages because Priya was entirely to blame.", why: "Failing to wear a seatbelt contributed to his head injuries, so a reduction is very likely." },
    { t: "He should claim against her uncle instead, because a learner can't be liable.", why: "Learners are liable at the ordinary standard; the uncle's position is a separate question." },
  ] },
  rubric: [
    "Identifies that Priya owed Leo a duty of care as an established category, without needing the Caparo test (Robinson)",
    "States the objective standard of the reasonably competent driver and applies Nettleship v Weston to Priya's inexperience",
    "Applies the standard to the facts (speed, wet bend, limit) to find breach",
    "Applies the but-for test to show the breach caused the injuries, and deals with remoteness briefly",
    "Identifies contributory negligence for the seatbelt and applies the 1945 Act and Froom v Butcher to the medical evidence (15%, head injuries only)",
    "Dismisses volenti correctly (Road Traffic Act 1988, s 149) if raised",
    "Reaches clear conclusions on each issue and gives practical advice to Leo",
  ],
  model: `Duty: Priya, as driver, owed Leo, her passenger, a duty to take reasonable care. Driver to passenger is an established category, so (as the Supreme Court explained in Robinson v Chief Constable of West Yorkshire Police) there's no need to apply the Caparo test afresh: physical injury caused by careless driving is the paradigm case of foreseeable harm.
Breach: the standard is objective: that of a reasonably competent driver. In Nettleship v Weston the Court of Appeal held that a learner is judged by that same standard, even by someone who knows of the inexperience. Leo's knowledge that Priya was a learner therefore doesn't lower the standard. Taking a sharp bend at about 45 mph in a 30 mph limit, in the rain, falls well below what a reasonably competent driver would do, so Priya was in breach.
Causation and remoteness: but for Priya's excessive speed, the car wouldn't have left the road and hit the tree (Barnett v Chelsea and Kensington HMC), so her breach caused Leo's injuries. Personal injury in a crash is plainly a foreseeable kind of harm, so it isn't too remote (The Wagon Mound (No 1)).
Defences: volenti doesn't apply. Section 149 of the Road Traffic Act 1988 prevents a driver relying on a passenger's consent to the risk, and a joke isn't a real agreement to waive a claim anyway. But Leo didn't wear a seatbelt, which is a failure to take reasonable care for his own safety. Under s 1 of the Law Reform (Contributory Negligence) Act 1945, damages are reduced to the extent the court thinks just and equitable. Froom v Butcher suggests 25% where a belt would have prevented the injury and 15% where it would have made it less severe. The medical evidence is that a belt would have made the head injuries considerably less severe but wouldn't have prevented them, so a reduction of around 15% for the head injuries is likely; the broken leg would have happened anyway, so damages for it shouldn't be reduced.
Advice: Leo has a strong claim against Priya in negligence (in practice, against her motor insurer) for his injuries and lost earnings, but should expect his damages for the head injuries to be reduced by around 15%.`,
  review: { verified: null, note: "Check the authorities and the Froom v Butcher figures against current sources before relying on it." },
};
