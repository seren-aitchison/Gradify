// LawGradify reasoning case: occupiers' liability to a child trespasser (England and Wales, as at 2026).
// Fictional facts. Authorities: Occupiers' Liability Act 1984, s 1; Occupiers' Liability Act 1957;
// Wheat v E Lacon & Co Ltd [1966] AC 552; Keown v Coventry Healthcare NHS Trust [2006] EWCA Civ 39;
// Tomlinson v Congleton BC [2003] UKHL 47; British Railways Board v Herrington [1972] AC 877.
export default {
  id: "boathouse", title: "Mia and the derelict boathouse roof", area: "Tort: occupiers' liability", jurisdiction: "England and Wales",
  brief: "Mia Clarke, aged 11, was injured when she fell through the roof of a derelict boathouse owned by Riverside Council. Her mother asks whether Mia has a claim against the council. Advise her.",
  facts: [
    [["Riverside Council owns a derelict boathouse beside the river, which it closed in 2023 and has not used since.", "Ownership and control of the premises point to the council as occupier."],
      ["The council's parks team inspects the site once a month.", "Inspections show the council knows the state of the premises: relevant to s 1(3)(a)."],
      ["A chain-link fence surrounds it, but there has been a gap in the fence for over a year.", "The council had reasonable grounds to know people could get in, and failed to repair the means of keeping them out."],
      ["A sign on the fence says \"Danger. Keep out\".", "A warning, but whether it discharges the duty (s 1(5)) depends on whether it's enough for children."]],
    [["Local residents emailed the council three times in 2025 to say that children were getting in through the gap and playing there.", "The council knew, or had reasonable grounds to believe, that trespassers (children) came into the danger's vicinity: s 1(3)(b)."],
      ["The council's own inspection report in January 2026 recorded that the boathouse roof was \"rotten and unsafe\".", "Knowledge of the danger: s 1(3)(a)."],
      ["Mia's family recently moved to the area, and she enjoys climbing.", null]],
    [["In March 2026, Mia went through the gap with friends and climbed onto the flat roof, which gave way beneath her.", "She was a trespasser, and the injury came from the state of the premises (a rotten roof giving way), not just from the activity of climbing."],
      ["She fell about three metres and broke her arm and her pelvis.", "Personal injury: the only kind of loss recoverable under the 1984 Act."],
      ["Mia says she knew she wasn't allowed in, but thought the roof would be safe to stand on.", "She knew she was trespassing, but didn't appreciate the hidden danger of the rotten roof."]],
  ],
  issues: [
    { id: "occupier", correct: true, label: "Is Riverside Council the occupier of the boathouse?", why: "Liability under both Occupiers' Liability Acts rests on the occupier, so this must be established first.",
      lessons: ["u04-15"], core: ["Wheat v E Lacon & Co Ltd"], support: [],
      rule: "An occupier is a person with a sufficient degree of control over the premises to put them under a duty of care towards those who come there (Wheat v E Lacon & Co Ltd). The 1984 Act uses the same meaning of occupier as the 1957 Act.",
      points: [
        { text: "The occupier is whoever has sufficient control over the premises (Wheat v Lacon).", cues: [["control"]] },
        { text: "The council owns the boathouse, fenced it and inspects it monthly: it has control.", cues: [["council"], ["own", "inspect", "fence", "control"]] },
        { text: "So the council is the occupier, even though the building is out of use.", cues: [["occupier"]] },
      ],
      conclusion: { q: "What's your conclusion on who the occupier is?", options: [
        { t: "Riverside Council is the occupier.", correct: true, why: "It owns, controls, fences and inspects the boathouse." },
        { t: "No one is the occupier because the building is derelict and unused.", why: "Disuse doesn't remove control: the council still controls access and maintenance." },
        { t: "Mia's parents are the occupiers while she's on the premises.", why: "Occupation depends on control of the premises, not responsibility for the visitor." },
        { t: "Whoever was last using the boathouse in 2023 remains the occupier.", why: "Control now lies with the council." },
      ] } },
    { id: "status", correct: true, label: "Was Mia a visitor or a trespasser, and which Act applies?", why: "The 1957 Act protects visitors; the 1984 Act protects non-visitors such as trespassers, with a narrower duty.",
      lessons: ["u04-15"], core: ["Occupiers' Liability Act 1984, s 1"], support: ["Occupiers' Liability Act 1957", "British Railways Board v Herrington"],
      rule: "Visitors are owed the common duty of care under the Occupiers' Liability Act 1957. Persons other than visitors, including trespassers, are owed the more limited duty in s 1 of the Occupiers' Liability Act 1984, which replaced the common-law duty of common humanity (British Railways Board v Herrington).",
      points: [
        { text: "Mia entered without permission through a gap in a fence, past a \"Keep out\" sign: she was a trespasser.", cues: [["trespass"]] },
        { text: "Repeated trespass doesn't by itself give implied permission, especially when the council fenced and signed the site.", cues: [["implied", "permission", "licence", "sign", "keep out"]] },
        { text: "So the 1984 Act governs, not the 1957 Act.", cues: [["1984"]] },
      ],
      conclusion: { q: "What's your conclusion on Mia's status?", options: [
        { t: "Mia was a trespasser, so the Occupiers' Liability Act 1984 applies.", correct: true, why: "She had no permission to enter and knew she wasn't allowed in." },
        { t: "Mia was a visitor because children often played there.", why: "Toleration of trespass isn't the same as permission, and the council fenced and signed the site." },
        { t: "Mia was a visitor because she's a child.", why: "Age doesn't make someone a visitor; it's relevant to the content of the duty." },
        { t: "Neither Act applies to children.", why: "Both Acts protect children; the 1957 Act expressly says occupiers must be prepared for children to be less careful." },
      ] } },
    { id: "duty", correct: true, label: "Did the council owe Mia a duty under s 1 of the 1984 Act, and did it breach it?", why: "The heart of the claim: whether the s 1(3) conditions are met, and whether the council took reasonable care or gave an adequate warning.",
      lessons: ["u04-15"], core: ["Occupiers' Liability Act 1984, s 1", "Keown v Coventry Healthcare NHS Trust"], support: ["Tomlinson v Congleton Borough Council"],
      rule: "A duty arises if the occupier (a) is aware of the danger or has reasonable grounds to believe it exists, (b) knows or has reasonable grounds to believe the non-visitor is in, or may come into, its vicinity, and (c) the risk is one against which, in all the circumstances, it may reasonably be expected to offer some protection (s 1(3)). The duty is to take reasonable care to see the non-visitor isn't injured by the danger (s 1(4)), and may be discharged by reasonable warnings or discouragement (s 1(5)). The danger must be due to the state of the premises, not simply a risky activity the claimant chose (Keown); there's no duty to protect against obvious risks freely accepted (Tomlinson).",
      points: [
        { text: "The council knew of the danger: its own report said the roof was rotten and unsafe (s 1(3)(a)).", cues: [["rotten", "report", "inspection", "aware"], ["roof", "danger"]] },
        { text: "It had reasonable grounds to believe children came onto the site, from the residents' emails and the gap in the fence (s 1(3)(b)).", cues: [["email", "residents", "complain", "gap"], ["child", "trespasser", "came", "playing"]] },
        { text: "A hidden danger to children is a risk the council could reasonably be expected to protect against (s 1(3)(c)).", cues: [["s 1(3)(c)", "1(3)(c)", "reasonably be expected", "protection", "protect"]] },
        { text: "Unlike Keown, the danger came from the state of the premises (a rotten roof), not just from climbing.", cues: [["keown"], ["state of the premises", "rotten", "roof gave way", "gave way", "premises"]] },
        { text: "A sign isn't enough for children, and the risk wasn't obvious to Mia (contrast Tomlinson); repairing the fence or the roof was cheap and practicable, so the council breached s 1(4).", cues: [["sign", "warning", "1(5)"], ["fence", "repair", "obvious", "tomlinson", "child"]] },
      ],
      conclusion: { q: "What's your conclusion on duty and breach?", options: [
        { t: "The council owed Mia a duty under s 1 and breached it by not repairing the fence or making the roof safe; the sign wasn't enough for children.", correct: true, why: "All three s 1(3) conditions are met; the danger was hidden and arose from the premises; protection was cheap." },
        { t: "There's no duty because Mia chose to climb, as in Keown.", why: "In Keown the danger was the activity; here the roof itself was rotten and gave way." },
        { t: "There's no breach because the sign discharged the duty under s 1(5).", why: "A sign may be adequate for adults but not for children who'd be expected to ignore it, especially with a known gap in the fence." },
        { t: "There's no duty because the risk was obvious, as in Tomlinson.", why: "A rotten roof that looks safe to stand on isn't an obvious danger, least of all to a child." },
      ] } },
    { id: "nuisance", correct: false, label: "Can Mia sue the council in private nuisance?", why: "Private nuisance protects interests in land; Mia has no interest in the boathouse land, and the claim is for personal injury." },
    { id: "vicarious", correct: false, label: "Is the council vicariously liable for the parks team's inspections?", why: "The council is liable directly as occupier; vicarious liability adds nothing here." },
    { id: "dpa", correct: false, label: "Is the council liable as a landlord under s 4 of the Defective Premises Act 1972?", why: "Section 4 imposes duties on landlords with repairing obligations to people affected by defects in let premises; the boathouse isn't let to anyone." },
  ],
  bank: [
    { name: "Occupiers' Liability Act 1957", cite: "5 & 6 Eliz 2 c 31", gist: "The common duty of care owed by occupiers to visitors." },
    { name: "Occupiers' Liability Act 1984, s 1", cite: "1984 c 3", gist: "The duty to persons other than visitors (including trespassers): when it arises (s 1(3)), its content (s 1(4)), warnings (s 1(5)) and personal injury only (s 1(8))." },
    { name: "Wheat v E Lacon & Co Ltd", cite: "[1966] AC 552", gist: "An occupier is anyone with sufficient control over the premises; there can be more than one." },
    { name: "Keown v Coventry Healthcare NHS Trust", cite: "[2006] EWCA Civ 39", gist: "An 11-year-old who fell climbing a fire escape couldn't claim: the danger arose from what he chose to do, not the state of the premises." },
    { name: "Tomlinson v Congleton Borough Council", cite: "[2003] UKHL 47", gist: "No duty to protect people against obvious risks they choose to run, such as diving into shallow water." },
    { name: "British Railways Board v Herrington", cite: "[1972] AC 877", gist: "The common-law duty of common humanity to child trespassers, later replaced by the 1984 Act." },
    { name: "Donoghue v Stevenson", cite: "[1932] AC 562", gist: "The neighbour principle in negligence." },
    { name: "Hunter v Canary Wharf Ltd", cite: "[1997] AC 655", gist: "Only those with an interest in the land affected can sue in private nuisance." },
    { name: "Caparo Industries plc v Dickman", cite: "[1990] 2 AC 605", gist: "The approach to duty of care in novel situations." },
    { name: "Defective Premises Act 1972, s 4", cite: "1972 c 35", gist: "A landlord's duty of care in respect of defects in let premises it is obliged or entitled to repair." },
  ],
  advice: { q: "What should you advise Mia's mother?", options: [
    { t: "Mia has a good claim against the council under the Occupiers' Liability Act 1984 for her injuries: it knew of the rotten roof and the children getting in, and a sign wasn't enough. Damages might be reduced for her own fault, but an 11-year-old's share is judged by what a child of her age would appreciate.", correct: true, why: "The s 1(3) conditions are met and the duty was breached; contributory negligence is possible but limited for a child who didn't see the hidden danger." },
    { t: "Mia has no claim because she was trespassing.", why: "Trespassers are owed a duty under the 1984 Act where s 1(3) is satisfied." },
    { t: "Mia can claim under the 1957 Act, which gives her the full common duty of care.", why: "She was a trespasser, so the 1984 Act applies." },
    { t: "Mia has no claim because the council put up a warning sign.", why: "A sign may not discharge the duty to children, especially with a known gap in the fence." },
  ] },
  rubric: [
    "Identifies the council as occupier, applying Wheat v Lacon",
    "Identifies Mia as a trespasser and the 1984 Act as the governing statute",
    "Applies each condition in s 1(3) to the facts (knowledge of the danger, of trespassers, and reasonable expectation of protection)",
    "Distinguishes Keown (activity versus state of the premises) and Tomlinson (obvious risks)",
    "Considers whether the sign discharged the duty under s 1(5), taking account of Mia's age",
    "Notes that only personal injury is recoverable and considers contributory negligence",
    "Gives clear advice to Mia's mother",
  ],
  model: `Occupier: an occupier is a person with sufficient control over premises (Wheat v E Lacon). Riverside Council owns the boathouse, fenced it and inspects it monthly: it is the occupier, even though the building is disused.
Status: Mia went through a gap in the fence past a \"Danger. Keep out\" sign, knowing she wasn't allowed in. She was a trespasser. Toleration of children getting in isn't permission, particularly where the council fenced and signed the site. So the Occupiers' Liability Act 1984 applies, not the 1957 Act; the 1984 Act replaced the common-law duty of common humanity from British Railways Board v Herrington.
Duty: under s 1(3) a duty arises if the occupier (a) is aware of the danger or has reasonable grounds to believe it exists: the council's own January 2026 report described the roof as \"rotten and unsafe\"; (b) knows or has reasonable grounds to believe a trespasser may come into its vicinity: residents emailed three times about children getting in through a gap that had been there for over a year; and (c) the risk is one against which it may reasonably be expected to offer some protection: a hidden structural danger that would attract children plainly is. Unlike Keown v Coventry Healthcare, where the 11-year-old was hurt by the activity of climbing a fire escape, the danger here was the state of the premises itself: a roof that looked safe gave way. Nor was the risk obvious, so Tomlinson v Congleton doesn't help the council.
Breach: the duty is to take reasonable care to see that Mia wasn't injured by the danger (s 1(4)). A warning can discharge it (s 1(5)), but a sign is unlikely to be enough for children, who the council knew were ignoring it; repairing the fence, or securing or demolishing the roof, was practicable and proportionate. The council was in breach.
Damage and defences: Mia's broken arm and pelvis are personal injury, which is recoverable (property damage isn't, s 1(8)). She knew she was trespassing but didn't appreciate the hidden danger; any reduction for contributory negligence would be judged by the standard of a reasonable 11-year-old and is likely to be modest.
Advice: Mia has a good claim against the council under the 1984 Act for her injuries.`,
  review: { verified: null, note: "Check the authorities and the application of s 1(3) to these facts against current sources before relying on it." },
};
