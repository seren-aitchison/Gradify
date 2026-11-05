// LawGradify reasoning case: part payment, consideration and promissory estoppel (England and Wales, as at
// 2026). Fictional facts. Authorities: Foakes v Beer (1884) 9 App Cas 605; Re Selectmove Ltd [1995] 1 WLR 474;
// Williams v Roffey Bros [1991] 1 QB 1; Central London Property Trust v High Trees House [1947] KB 130;
// Hughes v Metropolitan Railway (1877) 2 App Cas 439; D & C Builders v Rees [1966] 2 QB 617.
export default {
  id: "rent-reduction", title: "Rosa's rent reduction during the roadworks", area: "Contract: consideration and promissory estoppel", jurisdiction: "England and Wales",
  brief: "Rosa Lima runs a café in premises leased from Mr Kent. He agreed to reduce her rent during some roadworks, and now wants the difference back. Rosa asks whether she has to pay. Advise her.",
  facts: [
    [["Rosa's lease requires her to pay rent of £2,000 a month on the first of each month.", "The original contractual obligation that Kent is trying to enforce."],
      ["In January 2026 the council began roadworks that closed the street to traffic, and Rosa's takings fell sharply.", "The circumstances that led to the promise, and that limit how long it was meant to last."],
      ["Kent emailed her: \"I know it's hard with the roadworks. Pay £1,200 a month until the roadworks finish and we'll call it square.\"", "A clear and unequivocal promise not to insist on full rent, limited to the period of the roadworks."],
      ["Rosa replied \"Thank you, that's a lifesaver\", but gave nothing in return.", "No consideration from Rosa: she only paid less of what she already owed."]],
    [["She paid £1,200 a month from February to July, and kept the café open by cutting her own wages.", "Reliance on the promise: she acted on it in arranging her affairs."],
      ["The roadworks finished at the end of June.", "The promise was limited to the roadworks: from July, the reason for it had ended."],
      ["Kent didn't contact her again until August.", null],
      ["In August, Kent's solicitor wrote demanding £4,800 in \"arrears\" (£800 for each month from February to July), and full rent from September.", "The claim to go back on the promise, both for the past and for the future."]],
    [["Kent's wife says he only agreed because he was worried Rosa would leave and the premises would sit empty.", "Possible practical benefit, which the courts haven't accepted as consideration for paying less (Re Selectmove)."],
      ["There's no clause in the lease about how it can be varied.", "So there's no no-oral-modification clause to deal with (contrast MWB v Rock Advertising)."]],
  ],
  issues: [
    { id: "consideration", correct: true, label: "Was Kent's promise to accept less rent binding as a contractual variation?", why: "A variation needs consideration, and paying part of a debt already owed traditionally isn't consideration.",
      lessons: ["u03-05"], core: ["Foakes v Beer", "Re Selectmove Ltd"], support: ["Williams v Roffey Bros & Nicholls (Contractors) Ltd"],
      rule: "A promise to accept part payment of a debt in full satisfaction isn't binding without fresh consideration (Foakes v Beer). Williams v Roffey's \"practical benefit\" can support a promise to pay more, but the Court of Appeal in Re Selectmove refused to extend it to a promise to accept less, because that would leave Foakes v Beer without effect.",
      points: [
        { text: "Paying less of what she already owed isn't consideration (Foakes v Beer).", cues: [["foakes", "part payment", "already owed", "existing", "pre-existing"]] },
        { text: "Rosa gave nothing new in return: no extra payment, earlier payment or other benefit.", cues: [["nothing", "no consideration", "new", "in return", "fresh"]] },
        { text: "Kent's practical benefit (keeping a tenant) doesn't help: Williams v Roffey doesn't apply to promises to accept less (Re Selectmove).", cues: [["roffey", "practical benefit", "selectmove"]] },
        { text: "So the promise isn't binding as a contractual variation.", cues: [["not binding", "isn't binding", "no variation", "not a variation", "unenforceable", "no contract", "not contractually"]] },
      ],
      conclusion: { q: "What's your conclusion on consideration?", options: [
        { t: "The promise isn't contractually binding: Rosa gave no consideration, and practical benefit doesn't apply to accepting less.", correct: true, why: "Foakes v Beer, as maintained by Re Selectmove." },
        { t: "The promise is binding because Kent got the practical benefit of keeping his tenant.", why: "Re Selectmove refused to extend Williams v Roffey to promises to accept less." },
        { t: "The promise is binding because Rosa said thank you.", why: "Gratitude isn't consideration." },
        { t: "The promise is binding because it was made in writing by email.", why: "Writing doesn't replace consideration for a simple contract." },
      ] } },
    { id: "estoppel", correct: true, label: "Is Kent prevented by promissory estoppel from going back on his promise for the past months?", why: "Where consideration fails, equity may still stop a promisor going back on a clear promise relied on by the other party.",
      lessons: ["u03-05"], core: ["Central London Property Trust Ltd v High Trees House Ltd", "Hughes v Metropolitan Railway Co"], support: ["D & C Builders Ltd v Rees"],
      rule: "Where one party to an existing legal relationship makes a clear and unequivocal promise not to insist on its strict legal rights, intending it to be acted on, and the other party relies on it, the promisor can't go back on it where that would be inequitable (Hughes v Metropolitan Railway; Central London Property Trust v High Trees House). It's a shield, not a sword, and isn't available to a promisee who extracted the promise by improper pressure (D & C Builders v Rees).",
      points: [
        { text: "There was an existing legal relationship (the lease) and a clear and unequivocal promise to accept £1,200.", cues: [["clear", "unequivocal"], ["promise", "email"]] },
        { text: "Rosa relied on it, paying the reduced rent and arranging her finances around it.", cues: [["rel", "acted on"]] },
        { text: "It would be inequitable for Kent to go back on it for those months; Rosa put no pressure on him, unlike D & C Builders v Rees.", cues: [["inequitable", "unfair", "unjust"]] },
        { text: "Estoppel is used here as a shield against Kent's claim, which is its proper role.", cues: [["shield", "defence", "defend"]] },
        { text: "This mirrors High Trees: a reduced rent agreed because of temporary conditions.", cues: [["high trees"]] },
      ],
      conclusion: { q: "What's your conclusion on February to June?", options: [
        { t: "Promissory estoppel prevents Kent claiming the shortfall for February to June.", correct: true, why: "A clear promise relied on by Rosa; going back on it for those months would be inequitable (High Trees)." },
        { t: "Kent can recover the full shortfall, because the promise wasn't supported by consideration.", why: "Promissory estoppel exists precisely for promises without consideration." },
        { t: "Estoppel fails because Rosa must show she suffered a detriment beyond paying less.", why: "Reliance in arranging her affairs on the faith of the promise is enough; a separate detriment isn't strictly required." },
        { t: "Estoppel fails because it can only be used as a sword.", why: "It's the other way round: it's a shield, and Rosa uses it defensively." },
      ] } },
    { id: "effect", correct: true, label: "Does the estoppel cover July and the future, or can Kent resume full rent?", why: "Promissory estoppel is generally suspensory, and this promise was expressly limited to the roadworks.",
      lessons: ["u03-05"], core: ["Central London Property Trust Ltd v High Trees House Ltd"], support: ["Hughes v Metropolitan Railway Co"],
      rule: "The effect of promissory estoppel depends on the promise. Where a reduction was meant to last only while particular conditions continued, the promisor can insist on full rights once those conditions end (High Trees: full rent was recoverable once the flats were fully let), and in general can resume strict rights for the future on giving reasonable notice.",
      points: [
        { text: "The promise was limited to \"until the roadworks finish\".", cues: [["until the roadworks", "roadworks finish", "limited", "temporary"]] },
        { text: "The roadworks ended in June, so from July the estoppel no longer protects Rosa: the July shortfall of £800 is probably recoverable.", cues: [["july"], ["800", "recoverable", "owe", "due", "full rent"]] },
        { text: "Promissory estoppel is generally suspensory, not extinctive: Kent can insist on full rent for the future.", cues: [["suspen", "suspend", "resume", "future", "september"]] },
      ],
      conclusion: { q: "What's your conclusion on July and the future?", options: [
        { t: "Kent can probably recover £800 for July, once the roadworks had ended, and insist on full rent from September.", correct: true, why: "The promise was limited to the roadworks: once they ended, the full rent revived, as in High Trees." },
        { t: "Rosa never has to pay more than £1,200 again.", why: "Promissory estoppel is generally suspensory, and this promise was expressly temporary." },
        { t: "Kent can recover the whole £4,800, because the roadworks have now finished.", why: "The end of the roadworks revives full rent only from then on: it doesn't undo the estoppel for the months it covered." },
        { t: "Kent can't recover anything for July because he didn't contact Rosa until August.", why: "The promise ended by its own terms when the roadworks finished; no notice was needed for that." },
      ] } },
    { id: "frustration", correct: false, label: "Was the lease frustrated by the roadworks?", why: "Temporary roadworks don't make performance of a lease radically different; frustration of leases is very rare (National Carriers v Panalpina)." },
    { id: "duress", correct: false, label: "Can Kent avoid his promise for economic duress?", why: "Rosa applied no illegitimate pressure: Kent offered the reduction himself." },
    { id: "postal", correct: false, label: "Did the postal rule apply to Rosa's acceptance of Kent's email?", why: "The postal rule concerns posted acceptances of offers forming a contract; it has nothing to do with whether Kent can go back on his promise." },
  ],
  bank: [
    { name: "Foakes v Beer", cite: "(1884) 9 App Cas 605", gist: "Part payment of a debt isn't good consideration for a promise to forgo the balance." },
    { name: "Re Selectmove Ltd", cite: "[1995] 1 WLR 474", gist: "Williams v Roffey's practical benefit can't be extended to a promise to accept less than what's owed." },
    { name: "Williams v Roffey Bros & Nicholls (Contractors) Ltd", cite: "[1991] 1 QB 1", gist: "A practical benefit can be consideration for a promise to pay more for the same work." },
    { name: "Central London Property Trust Ltd v High Trees House Ltd", cite: "[1947] KB 130", gist: "A landlord who promised a reduced rent during wartime couldn't go back on it for that period, but could claim full rent once the flats were fully let." },
    { name: "Hughes v Metropolitan Railway Co", cite: "(1877) 2 App Cas 439", gist: "A party who leads another to believe strict rights won't be enforced can't enforce them where that would be inequitable." },
    { name: "D & C Builders Ltd v Rees", cite: "[1966] 2 QB 617", gist: "A promisee who extracted the promise by improper pressure can't rely on promissory estoppel." },
    { name: "MWB Business Exchange Centres Ltd v Rock Advertising Ltd", cite: "[2018] UKSC 24", gist: "A no-oral-modification clause is effective; the court left open the consideration point." },
    { name: "Adams v Lindsell", cite: "(1818) 1 B & Ald 681", gist: "The postal rule: a posted acceptance takes effect when posted." },
    { name: "National Carriers Ltd v Panalpina (Northern) Ltd", cite: "[1981] AC 675", gist: "A lease can in principle be frustrated, but only in very rare cases." },
    { name: "Stilk v Myrick", cite: "(1809) 2 Camp 317", gist: "Performing an existing contractual duty isn't consideration for a promise of extra pay." },
  ],
  advice: { q: "What should you advise Rosa?", options: [
    { t: "Kent's promise wasn't a binding variation, but promissory estoppel prevents him recovering the shortfall for February to June. He can probably recover £800 for July, after the roadworks ended, and full rent from September.", correct: true, why: "This applies Foakes v Beer, then High Trees, including the limit of the promise." },
    { t: "She owes the full £4,800, because she gave no consideration.", why: "Promissory estoppel protects her for the period the promise covered." },
    { t: "She owes nothing, and can pay £1,200 a month indefinitely.", why: "The promise was limited to the roadworks, and estoppel is generally suspensory." },
    { t: "She can sue Kent for breaking his promise.", why: "Promissory estoppel is a shield, not a sword: it can't found a claim." },
  ] },
  rubric: [
    "Explains why the promise isn't a binding variation (Foakes v Beer) and why practical benefit doesn't apply (Re Selectmove)",
    "Identifies the elements of promissory estoppel and applies them to the email and Rosa's reliance",
    "Explains inequitability and that estoppel is a shield, not a sword",
    "Applies High Trees to the time limit of the promise, distinguishing February to June from July",
    "Explains the suspensory effect for future rent",
    "Dismisses frustration or duress briefly and correctly if raised",
    "Gives clear advice with the likely sums",
  ],
  model: `Consideration: a promise to accept part payment of a debt in full satisfaction isn't binding without fresh consideration (Foakes v Beer). Rosa gave nothing new: she simply paid less of rent she already owed. Kent may have gained a practical benefit (keeping a tenant rather than having empty premises), but in Re Selectmove the Court of Appeal refused to extend Williams v Roffey's practical benefit to promises to accept less, as that would leave Foakes v Beer with no effect. So Kent's promise isn't binding as a contractual variation.
Promissory estoppel: equity may still stop Kent going back on his promise. There was an existing legal relationship (the lease) and a clear and unequivocal promise (\"Pay £1,200 a month until the roadworks finish and we'll call it square\"), intended to be acted on. Rosa relied on it, paying the reduced rent and arranging her finances around it, including cutting her own wages. Kent offered the reduction himself, so there was no improper pressure of the kind that barred the defence in D & C Builders v Rees. It would be inequitable for him to claim the shortfall for the months the promise covered. Rosa uses estoppel as a shield against his claim, which is its proper role (Hughes v Metropolitan Railway; Central London Property Trust v High Trees House).
Its effect: in High Trees, the landlord couldn't recover the reduced rent for the war years, but could claim full rent once the flats were fully let again, because the promise was meant to last only while those conditions continued. Kent's promise was expressly limited to the roadworks, which finished at the end of June. From July, the reason for the promise had gone, so Kent can probably recover the £800 shortfall for July. Promissory estoppel is generally suspensory, and he can insist on the full £2,000 for the future.
Advice: Rosa doesn't owe the £4,000 shortfall for February to June, but probably owes £800 for July and must pay full rent from September. The lease has no clause restricting variations, so MWB v Rock Advertising isn't relevant, and temporary roadworks plainly don't frustrate the lease.`,
  review: { verified: null, note: "Check the authorities and the analysis of the July rent against current sources before relying on it." },
};
