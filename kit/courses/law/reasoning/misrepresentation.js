// LawGradify reasoning case: misrepresentation (England and Wales, as at 2026). Fictional facts.
// Authorities: Bisset v Wilkinson [1927] AC 177; Smith v Land and House Property Corp (1884) 28 Ch D 7;
// With v O'Flanagan [1936] Ch 575; Redgrave v Hurd (1881) 20 Ch D 1; Misrepresentation Act 1967, s 2;
// Royscot Trust Ltd v Rogerson [1991] 2 QB 297.
export default {
  id: "cafe-sale", title: "Owen's café: a turnover figure that was no longer true", area: "Contract: misrepresentation", jurisdiction: "England and Wales",
  brief: "Owen Davies bought a café business and is losing money. He wants to know whether he can get out of the purchase or recover his losses from the seller. Advise him.",
  facts: [
    [["In January 2026, Owen viewed the Harbour Café, which Mrs Gwen Hale was selling as a going concern.", null],
      ["Mrs Hale told him: \"It's a little gold mine. You'll love it here.\"", "Vague praise: a mere puff or opinion, not an actionable statement of fact."],
      ["She also said: \"It takes about £2,000 a week, every week.\"", "A specific statement of fact about turnover, which a seller is well placed to know."],
      ["That was true in 2025, but since a road closure in November 2025 takings had fallen to about £1,200 a week, and Mrs Hale knew this.", "The statement became false before the contract and she knew it: a change of circumstances she should have disclosed (With v O'Flanagan), and possibly fraud."]],
    [["Owen's accountant offered to check the till records, but Owen declined, saying he trusted Mrs Hale.", "Raises whether he relied on the statement: failing to check isn't a defence (Redgrave v Hurd)."],
      ["Owen said the turnover figure was the main reason he agreed to pay £60,000.", "Evidence of inducement."],
      ["The contract was signed on 1 February 2026; it says nothing about turnover.", "The statement wasn't made a term, so misrepresentation is the claim."]],
    [["Owen discovered the true takings on 20 April 2026 and complained to Mrs Hale the next day.", "Prompt complaint after discovery: important for the bars to rescission (affirmation, delay)."],
      ["He has repainted the café, but the business and equipment are otherwise as he bought them.", "Restitution is still substantially possible, so rescission isn't barred on that ground."],
      ["Mrs Hale has retired to Spain."]],
  ],
  issues: [
    { id: "statement", correct: true, label: "Did Mrs Hale make an actionable misrepresentation?", why: "Owen must show a false statement of existing fact (or law) that induced the contract; the two statements need to be told apart.",
      lessons: ["u03-13"], core: ["Bisset v Wilkinson", "With v O'Flanagan"], support: ["Smith v Land and House Property Corp", "Derry v Peek"],
      rule: "A misrepresentation is an unambiguous false statement of existing fact or law that induces the contract. Mere puffs and genuine opinions aren't statements of fact (Bisset v Wilkinson), but an opinion from someone who knows the facts can imply that facts exist to justify it (Smith v Land and House). A statement true when made but which becomes false before the contract must be corrected; failing to do so is a misrepresentation (With v O'Flanagan).",
      points: [
        { text: "\"A little gold mine\" is a mere puff or opinion, not an actionable statement of fact (Bisset v Wilkinson).", cues: [["gold mine", "puff", "opinion"]] },
        { text: "\"About £2,000 a week\" is a specific statement of existing fact about turnover.", cues: [["2,000", "2000", "turnover", "takings"], ["fact"]] },
        { text: "It was true when first made, but had become false before the contract, and she knew.", cues: [["became false", "no longer true", "changed", "change", "fell", "1,200", "1200", "road closure"]] },
        { text: "Failing to correct it after the change is a misrepresentation (With v O'Flanagan).", cues: [["o'flanagan", "correct", "disclose", "update", "continuing"]] },
      ],
      conclusion: { q: "What's your conclusion on the statements?", options: [
        { t: "The turnover figure was an actionable misrepresentation by the time of the contract; \"gold mine\" was a mere puff.", correct: true, why: "A specific turnover statement is fact; once it became false she had to correct it (With v O'Flanagan)." },
        { t: "Neither statement is actionable because they were both opinions.", why: "\"About £2,000 a week\" is a statement of fact about the business, within her knowledge." },
        { t: "The turnover statement isn't actionable because it was true when she first made it.", why: "With v O'Flanagan: a representation that becomes false before the contract must be corrected." },
        { t: "\"Gold mine\" is the actionable statement because it was the more emphatic.", why: "Emphasis doesn't make vague praise a statement of fact." },
      ] } },
    { id: "reliance", correct: true, label: "Did the misrepresentation induce Owen to enter the contract, given that he declined to check the accounts?", why: "The misrepresentation must have induced the contract; the seller will argue Owen could have discovered the truth.",
      lessons: ["u03-13"], core: ["Redgrave v Hurd"], support: [],
      rule: "The misrepresentation must have induced the contract: it needn't be the only reason, but it must have been relied on. It's no answer that the claimant could have discovered the truth by checking (Redgrave v Hurd), unlike where the claimant relied on their own investigation instead (Attwood v Small).",
      points: [
        { text: "Owen relied on the turnover figure: it was the main reason he agreed the price.", cues: [["rel", "induc"], ["main reason", "price", "60,000", "60000", "agreed"]] },
        { text: "Declining his accountant's offer to check doesn't defeat his claim (Redgrave v Hurd).", cues: [["redgrave", "accountant", "could have checked", "could have discovered", "declin", "chance to check"]] },
        { text: "He didn't rely on his own investigation instead, so Attwood v Small doesn't apply.", cues: [["attwood", "own investigation", "own checks", "didn't check", "did not check", "no investigation"]] },
      ],
      conclusion: { q: "What's your conclusion on inducement?", options: [
        { t: "The turnover statement induced the contract; his decision not to check the records doesn't matter.", correct: true, why: "Redgrave v Hurd: the opportunity to discover the truth is no defence." },
        { t: "There's no inducement because he could have checked the till records.", why: "That argument was rejected in Redgrave v Hurd." },
        { t: "There's no inducement because the turnover statement wasn't his only reason.", why: "It needn't be the only reason, only a reason he relied on; here it was the main one." },
        { t: "Inducement depends on whether the contract mentions turnover.", why: "The contract's silence means the claim is in misrepresentation; it doesn't affect inducement." },
      ] } },
    { id: "remedies", correct: true, label: "What remedies are available to Owen, and are any barred?", why: "Owen's practical question: can he unwind the purchase, and can he recover his losses?",
      lessons: ["u03-15", "u03-14"], core: ["Misrepresentation Act 1967, s 2(1)", "Royscot Trust Ltd v Rogerson"], support: ["Misrepresentation Act 1967, s 2(2)", "Derry v Peek"],
      rule: "A misrepresentation makes the contract voidable: the claimant can rescind unless barred by affirmation, lapse of time, impossibility of restitution or third-party rights. Damages are available for fraud (Derry v Peek) or under s 2(1) of the Misrepresentation Act 1967, where the representor is liable unless they prove they had reasonable grounds to believe, and did believe, the statement was true; s 2(1) damages are assessed on the fraud measure (Royscot Trust v Rogerson). The court may award damages instead of rescission for non-fraudulent misrepresentation (s 2(2)).",
      points: [
        { text: "The contract is voidable, so Owen can seek rescission.", cues: [["rescission", "rescind", "voidable", "set aside", "unwind"]] },
        { text: "Rescission isn't barred: he complained the day after discovery (no affirmation or delay) and the business can be substantially restored.", cues: [["affirm", "delay", "lapse", "promptly", "next day", "complained"], ["restor", "restitution", "repaint", "returned", "substantially"]] },
        { text: "He can claim damages under s 2(1); Mrs Hale must prove reasonable grounds for believing it true, which she can't, as she knew.", cues: [["2(1)", "section 2", "s 2"], ["reasonable grounds", "burden", "prove", "knew"]] },
        { text: "Section 2(1) damages are on the fraud measure, covering all direct losses (Royscot).", cues: [["royscot", "fraud measure", "all losses", "direct loss", "tort of deceit"]] },
        { text: "As she knew the statement was false, it may also be fraudulent (Derry v Peek), but s 2(1) is easier to prove.", cues: [["fraud", "derry", "deceit"]] },
      ],
      conclusion: { q: "What's your conclusion on remedies?", options: [
        { t: "Owen can seek rescission, which isn't barred, and damages under s 2(1) on the fraud measure.", correct: true, why: "He acted promptly and restitution is possible; s 2(1) puts the burden on Mrs Hale and gives the fraud measure." },
        { t: "Owen can only claim damages, because he has repainted the café.", why: "Restitution needs to be substantially possible, not perfect: the business is essentially as sold." },
        { t: "Owen has no remedy because the contract says nothing about turnover.", why: "Misrepresentation is a pre-contractual statement inducing the contract; it needn't be a term." },
        { t: "Owen must prove fraud to get any damages.", why: "Section 2(1) gives damages unless the representor proves reasonable belief in the truth." },
      ] } },
    { id: "mistake", correct: false, label: "Is the contract void for common mistake?", why: "Both parties weren't mistaken: Mrs Hale knew the true takings. And a mistake about quality or value rarely makes a contract void (Bell v Lever Bros)." },
    { id: "consideration", correct: false, label: "Did Owen provide consideration for the purchase?", why: "He paid £60,000: consideration isn't in doubt and isn't a live issue." },
    { id: "frustration", correct: false, label: "Was the contract frustrated by the road closure?", why: "The road closure happened before the contract, and frustration concerns events after formation that make performance radically different." },
  ],
  bank: [
    { name: "Bisset v Wilkinson", cite: "[1927] AC 177", gist: "A statement of opinion honestly held, where neither party had special knowledge, isn't a statement of fact." },
    { name: "Smith v Land and House Property Corp", cite: "(1884) 28 Ch D 7", gist: "An opinion given by someone who knows the facts may imply that facts exist to justify it." },
    { name: "With v O'Flanagan", cite: "[1936] Ch 575", gist: "A statement that was true when made but becomes false before the contract must be corrected." },
    { name: "Redgrave v Hurd", cite: "(1881) 20 Ch D 1", gist: "A claimant who relied on a misrepresentation isn't barred because they could have discovered the truth." },
    { name: "Attwood v Small", cite: "(1838) 6 Cl & F 232", gist: "No inducement where the buyer relied on their own investigation rather than the statement." },
    { name: "Derry v Peek", cite: "(1889) 14 App Cas 337", gist: "Fraud: a false statement made knowingly, without belief in its truth, or recklessly." },
    { name: "Misrepresentation Act 1967, s 2(1)", cite: "1967 c 7", gist: "Damages for misrepresentation unless the representor proves reasonable grounds to believe, and belief, that the statement was true." },
    { name: "Misrepresentation Act 1967, s 2(2)", cite: "1967 c 7", gist: "The court may declare the contract subsisting and award damages instead of rescission (non-fraudulent misrepresentation)." },
    { name: "Royscot Trust Ltd v Rogerson", cite: "[1991] 2 QB 297", gist: "Damages under s 2(1) are assessed as if the misrepresentation were fraudulent." },
    { name: "Bell v Lever Bros Ltd", cite: "[1932] AC 161", gist: "A shared mistake about quality makes a contract void only if it makes the subject matter essentially different." },
    { name: "Hadley v Baxendale", cite: "(1854) 9 Exch 341", gist: "Remoteness of damage for breach of contract." },
  ],
  advice: { q: "What should you advise Owen?", options: [
    { t: "Mrs Hale's turnover figure was a misrepresentation that induced the contract. He can seek rescission (acting promptly) and damages under s 2(1) on the fraud measure, though recovering from her abroad may be a practical issue.", correct: true, why: "This deals with each element and his practical position; enforcing against someone who has moved to Spain needs advice on cross-border enforcement." },
    { t: "He has no claim because he chose not to check the accounts.", why: "Redgrave v Hurd: failing to check doesn't defeat a misrepresentation claim." },
    { t: "He can recover only for the \"gold mine\" statement.", why: "That was a mere puff; the turnover figure is the actionable statement." },
    { t: "He should sue for breach of contract on the turnover warranty.", why: "The contract says nothing about turnover, so there's no term to breach: misrepresentation is the route." },
  ] },
  rubric: [
    "Distinguishes the turnover figure (a statement of fact) from the \"gold mine\" puff (Bisset v Wilkinson)",
    "Applies With v O'Flanagan to the statement that became false before the contract",
    "Shows the statement induced the contract and applies Redgrave v Hurd to Owen's decision not to check",
    "Explains rescission and why the bars don't apply on these facts",
    "Explains damages under s 2(1) of the Misrepresentation Act 1967, the burden on the representor and the fraud measure (Royscot)",
    "Notes the possibility of fraud and the court's discretion under s 2(2) where relevant",
    "Gives clear, practical advice to Owen",
  ],
  model: `A misrepresentation is a false statement of existing fact or law that induces the contract.
The statements: \"It's a little gold mine\" is vague commendation: a mere puff or opinion, not a statement of fact (Bisset v Wilkinson). But \"It takes about £2,000 a week\" is a specific statement of existing fact about the business, within Mrs Hale's knowledge (compare Smith v Land and House Property Corp). It was true when first made in 2025 but had become false after the road closure in November 2025, and Mrs Hale knew. A representation that becomes false before the contract must be corrected: failing to do so is a misrepresentation (With v O'Flanagan).
Inducement: Owen says the turnover figure was the main reason he agreed to pay £60,000, so it induced the contract. It's no defence that he declined his accountant's offer to check the till records: in Redgrave v Hurd a buyer who could have discovered the truth from the papers could still rescind. This isn't a case like Attwood v Small, where the buyer relied on his own investigation instead.
Remedies: the contract is voidable, so Owen can seek rescission. He complained the day after discovering the truth, so he hasn't affirmed the contract or delayed, and repainting doesn't make restitution impossible: the business and equipment can be substantially returned. He can also claim damages under s 2(1) of the Misrepresentation Act 1967. Mrs Hale is liable unless she proves she had reasonable grounds to believe, and did believe, the statement was true up to the contract; as she knew the true takings, she can't. Section 2(1) damages are assessed on the fraud measure, covering all losses flowing directly from the contract (Royscot Trust v Rogerson). Because she knew the figure was untrue, the misrepresentation may also be fraudulent (Derry v Peek), but s 2(1) avoids the need to prove fraud. For a non-fraudulent misrepresentation the court could award damages instead of rescission (s 2(2)), but that discretion doesn't apply to fraud.
Advice: Owen has a strong claim. He should act quickly to rescind and claim damages under s 2(1). As Mrs Hale now lives in Spain, he'll need advice on bringing and enforcing a claim against someone abroad.`,
  review: { verified: null, note: "Check the authorities and the remedies analysis against current sources before relying on it." },
};
