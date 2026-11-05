// LawGradify reasoning case: unlawful wounding and mistaken self-defence (England and Wales, as at 2026).
// Fictional facts. Authorities: Offences Against the Person Act 1861, ss 18, 20, 47; JCC v Eisenhower [1984]
// QB 331; R v Savage, DPP v Parmenter [1992] 1 AC 699; R v Mowatt [1968] 1 QB 421; Criminal Justice and
// Immigration Act 2008, s 76; R v Gladstone Williams (1984) 78 Cr App R 276; Palmer v R [1971] AC 814.
export default {
  id: "bar-push", title: "Ella, a raised arm and a cut head", area: "Criminal law: non-fatal offences and self-defence", jurisdiction: "England and Wales",
  brief: "You're advising Ella Brookes, who has been charged with unlawful wounding under s 20 of the Offences Against the Person Act 1861. Analyse whether the offence is made out and whether she has a defence.",
  facts: [
    [["Ella, 24, was in a crowded bar on a Saturday night, and had drunk one small glass of wine.", "She was essentially sober, so intoxication doesn't affect her belief (s 76(5) of the 2008 Act)."],
      ["Ten minutes earlier, a man had shouted at her for bumping into him and said \"You'll regret that\".", "Explains why she might genuinely believe she was about to be attacked."],
      ["Kai, a stranger who looked similar to that man, came up behind her and suddenly raised his arm.", "The circumstances as Ella believed them: a sudden movement by someone she took to be the man who'd threatened her."],
      ["In fact Kai was waving to a friend at the bar behind Ella.", "Her belief that she was about to be attacked was mistaken: the Gladstone Williams question."]],
    [["Ella turned and pushed Kai hard in the chest with both hands.", "The force used: a single push, the core of whether it was reasonable (s 76(6) and (7))."],
      ["Kai stumbled backwards, fell and hit his head on the edge of a table.", "The chain of events from the push to the injury."],
      ["He had a 3 cm cut to his scalp, which needed five stitches.", "A break in the whole skin is a wound (JCC v Eisenhower)."],
      ["Ella told the police: \"I thought he was going to hit me. I just wanted to get him away from me. I never meant him to get hurt.\"", "Evidence of her belief (for self-defence) and of what she foresaw (for the mens rea of s 20)."]],
    [["CCTV shows that about two seconds passed between Kai raising his arm and Ella's push.", "The \"agony of the moment\": she couldn't weigh the exact force needed (s 76(7))."],
      ["Ella has no previous convictions.", null]],
  ],
  issues: [
    { id: "ar", correct: true, label: "Is the actus reus of unlawful wounding under s 20 made out?", why: "The prosecution must prove a wound or grievous bodily harm, inflicted by Ella.",
      lessons: ["u05-19"], core: ["Offences Against the Person Act 1861, s 20", "JCC v Eisenhower"], support: [],
      rule: "Section 20 makes it an offence unlawfully and maliciously to wound or inflict grievous bodily harm on another. A wound is a break in the continuity of the whole skin (JCC v Eisenhower).",
      points: [
        { text: "A wound is a break in the whole skin (JCC v Eisenhower).", cues: [["eisenhower", "whole skin", "both layers", "break in"]] },
        { text: "Kai's 3 cm cut needing stitches is a wound.", cues: [["cut", "3 cm", "stitch"], ["wound"]] },
        { text: "Ella's push caused him to fall and hit the table, so she inflicted it.", cues: [["push"], ["caus", "inflict", "fell", "table"]] },
      ],
      conclusion: { q: "What's your conclusion on the actus reus?", options: [
        { t: "The actus reus of s 20 is made out: Ella's push caused a wound.", correct: true, why: "The cut breaks the whole skin, and it resulted from her push." },
        { t: "There's no wound because the injury was caused by the table, not Ella.", why: "Her push caused the fall that led to the injury: the table was part of the chain, not a break in it." },
        { t: "There's no wound unless the injury amounts to grievous bodily harm.", why: "Section 20 covers a wound or GBH: a wound needn't be serious." },
        { t: "There's no actus reus because it was an accident.", why: "Accident goes to mens rea and defences; the conduct and result are still there." },
      ] } },
    { id: "mr", correct: true, label: "Did Ella have the mens rea for s 20 (\"maliciously\")?", why: "Ella says she never meant to hurt him: the question is what s 20 actually requires.",
      lessons: ["u05-19"], core: ["R v Savage, DPP v Parmenter", "R v Mowatt"], support: ["Offences Against the Person Act 1861, s 20"],
      rule: "\"Maliciously\" in s 20 requires that the defendant intended, or foresaw, that her act might cause some physical harm to some person, albeit of a minor character; she needn't foresee a wound or serious harm (R v Mowatt; R v Savage, DPP v Parmenter).",
      points: [
        { text: "Section 20 needs intention or foresight of some harm, not of a wound or serious harm (Mowatt; Savage and Parmenter).", cues: [["some harm", "some physical harm", "minor", "mowatt", "parmenter", "savage"]] },
        { text: "Pushing someone hard in the chest in a crowded bar: she probably foresaw some harm might result.", cues: [["foresaw", "foresee", "foresight", "aware", "realised"]] },
        { text: "\"I never meant him to get hurt\" isn't enough, because foresight of some harm is enough even without intention.", cues: [["never meant", "didn't mean", "did not mean", "intend"]] },
      ],
      conclusion: { q: "What's your conclusion on mens rea?", options: [
        { t: "The prosecution can probably prove mens rea: Ella likely foresaw that a hard push might cause some harm.", correct: true, why: "Foresight of some harm, even minor, is enough for s 20." },
        { t: "There's no mens rea because she didn't foresee a wound.", why: "Foresight of a wound or serious harm isn't required (Savage and Parmenter)." },
        { t: "There's no mens rea because she didn't intend any harm.", why: "Foresight of the risk of some harm (recklessness) is enough." },
        { t: "Mens rea is irrelevant because s 20 is a strict liability offence.", why: "\"Maliciously\" requires intention or recklessness as to some harm." },
      ] } },
    { id: "sd", correct: true, label: "Can Ella rely on self-defence, given that she was mistaken about the threat?", why: "The decisive issue: a genuine mistaken belief in an attack, and whether a single push was reasonable force.",
      lessons: ["u05-30"], core: ["Criminal Justice and Immigration Act 2008, s 76", "R v Gladstone Williams"], support: ["Palmer v R", "Beckford v R"],
      rule: "Force in self-defence is lawful if the defendant genuinely believed it was necessary (even if mistaken, and even if the belief was unreasonable) and the force was reasonable in the circumstances as she believed them to be (R v Gladstone Williams; Criminal Justice and Immigration Act 2008, s 76(3)–(4)). Reasonableness of the belief is evidence of whether it was genuinely held (s 76(4)). A person acting in the heat of the moment can't be expected to weigh the exact force needed, and doing what she honestly and instinctively thought necessary is strong evidence that the force was reasonable (s 76(7); Palmer v R). A mistaken belief caused by voluntary intoxication can't be relied on (s 76(5)). Once raised, the prosecution must disprove self-defence.",
      points: [
        { text: "Her belief that Kai was about to hit her is judged as she genuinely held it, even though it was mistaken (Gladstone Williams; s 76(3)–(4)).", cues: [["genuine", "honest", "honestly"], ["belie", "mistak", "thought"]] },
        { text: "The earlier threat and Kai's resemblance to that man make the belief plausible, supporting its genuineness.", cues: [["threat", "regret", "earlier", "looked similar", "resembl", "similar"]] },
        { text: "Force is judged on the circumstances as she believed them: a single push to get him away is proportionate to an expected punch.", cues: [["reasonable", "proportionate"], ["push", "force"]] },
        { text: "With about two seconds to react, she couldn't weigh the exact force needed (s 76(7); Palmer).", cues: [["two seconds", "2 seconds", "heat of the moment", "agony", "nicety", "palmer", "76(7)", "instinct"]] },
        { text: "She'd had only one small glass of wine, so intoxication doesn't undermine the defence (s 76(5)); the prosecution must disprove self-defence.", cues: [["wine", "intoxicat", "drunk", "sober", "76(5)", "prosecution", "disprove", "burden"]] },
      ],
      conclusion: { q: "What's your conclusion on self-defence?", options: [
        { t: "Self-defence is likely to succeed: Ella genuinely believed she was about to be attacked, and a single push was reasonable force in the circumstances as she believed them.", correct: true, why: "Gladstone Williams and s 76 judge her on the facts as she believed them; s 76(7) allows for the heat of the moment." },
        { t: "Self-defence fails because Kai wasn't actually attacking her.", why: "A genuine mistaken belief is enough: the force is judged on the circumstances as she believed them." },
        { t: "Self-defence fails because her belief had to be reasonable.", why: "Since Gladstone Williams the belief need only be genuine; reasonableness is just evidence of genuineness." },
        { t: "Self-defence fails because Kai was injured.", why: "Injury doesn't make the force unreasonable: the question is whether the push itself was reasonable as she saw things." },
      ] } },
    { id: "s18", correct: false, label: "Should Ella be charged with wounding with intent under s 18?", why: "Section 18 requires an intention to cause grievous bodily harm (or to resist arrest); there's no evidence Ella intended serious harm." },
    { id: "intox", correct: false, label: "Does Ella's intoxication prevent her relying on her mistaken belief?", why: "One small glass of wine didn't cause her mistake; s 76(5) only bars mistakes attributable to voluntary intoxication." },
    { id: "provocation", correct: false, label: "Can Ella rely on loss of control?", why: "Loss of control is a partial defence only to murder (Coroners and Justice Act 2009, s 54); it has no application to s 20." },
  ],
  bank: [
    { name: "Offences Against the Person Act 1861, s 20", cite: "24 & 25 Vict c 100", gist: "Unlawfully and maliciously wounding or inflicting grievous bodily harm." },
    { name: "Offences Against the Person Act 1861, s 18", cite: "24 & 25 Vict c 100", gist: "Wounding or causing grievous bodily harm with intent to do grievous bodily harm." },
    { name: "Offences Against the Person Act 1861, s 47", cite: "24 & 25 Vict c 100", gist: "Assault occasioning actual bodily harm." },
    { name: "JCC v Eisenhower", cite: "[1984] QB 331", gist: "A wound requires a break in the continuity of the whole skin." },
    { name: "R v Mowatt", cite: "[1968] 1 QB 421", gist: "For s 20, the defendant need only foresee that some physical harm, albeit minor, might result." },
    { name: "R v Savage, DPP v Parmenter", cite: "[1992] 1 AC 699", gist: "Confirmed Mowatt: s 20 requires intention or foresight of some harm, not of a wound or serious harm." },
    { name: "Criminal Justice and Immigration Act 2008, s 76", cite: "2008 c 4", gist: "Reasonable force in self-defence, judged on the circumstances as the defendant believed them; heat of the moment (s 76(7)); no reliance on intoxicated mistakes (s 76(5))." },
    { name: "R v Gladstone Williams", cite: "(1984) 78 Cr App R 276", gist: "A defendant acting under a genuine mistaken belief is judged on the facts as she believed them, whether or not the belief was reasonable." },
    { name: "Palmer v R", cite: "[1971] AC 814", gist: "A person defending herself can't weigh to a nicety the exact measure of necessary defensive action." },
    { name: "Beckford v R", cite: "[1988] AC 130", gist: "The Privy Council approved the Gladstone Williams approach to mistaken self-defence." },
    { name: "Coroners and Justice Act 2009, s 54", cite: "2009 c 25", gist: "Loss of control: a partial defence to murder." },
    { name: "R v Ireland, R v Burstow", cite: "[1998] AC 147", gist: "Psychiatric injury can be bodily harm; silent calls can be an assault." },
  ],
  advice: { q: "What should you advise Ella?", options: [
    { t: "The prosecution can probably prove the elements of s 20, but she has a strong defence of self-defence: she genuinely believed she was about to be attacked, and a single push was reasonable force as she saw things. The prosecution must disprove it.", correct: true, why: "This deals with each element and the decisive defence, including the burden of proof." },
    { t: "She should plead guilty, because Kai wasn't actually going to hit her.", why: "Mistaken self-defence is judged on her genuine belief." },
    { t: "She isn't guilty because she didn't intend to wound him.", why: "Section 20 needs only foresight of some harm; her defence lies in self-defence, not lack of mens rea." },
    { t: "She has no defence because she'd been drinking.", why: "One small glass of wine didn't cause her mistake; s 76(5) doesn't apply." },
  ] },
  rubric: [
    "Identifies the actus reus of s 20 and applies JCC v Eisenhower to the cut",
    "States the mens rea of s 20 correctly (foresight of some harm: Mowatt, Savage and Parmenter) and applies it",
    "Applies Gladstone Williams and s 76(3)–(4) to Ella's mistaken belief",
    "Assesses whether the force was reasonable in the circumstances as she believed them, using s 76(7) and the two seconds she had",
    "Deals with intoxication (s 76(5)) and the burden of proof",
    "Dismisses s 18 or loss of control briefly and correctly if raised",
    "Gives clear advice on the likely outcome",
  ],
  model: `Actus reus: s 20 of the Offences Against the Person Act 1861 requires a wound or grievous bodily harm. A wound is a break in the continuity of the whole skin (JCC v Eisenhower), so Kai's 3 cm scalp cut needing five stitches is a wound. Ella's push caused him to fall and hit the table: she inflicted it.
Mens rea: \"maliciously\" requires that Ella intended, or foresaw, that her act might cause some physical harm, however minor; she needn't foresee a wound (R v Mowatt, confirmed in R v Savage, DPP v Parmenter). A hard two-handed push in a crowded bar is likely to cause someone to stumble or fall, and a jury would probably find she foresaw some harm. Her statement that she never meant him to get hurt doesn't negate that.
Self-defence: this is Ella's real answer. Force is lawful if she genuinely believed it was necessary and it was reasonable in the circumstances as she believed them to be (Criminal Justice and Immigration Act 2008, s 76(3)–(4); R v Gladstone Williams). Her belief was mistaken (Kai was waving), but the question is whether it was genuine, not whether it was correct or even reasonable; its reasonableness is just evidence of genuineness. The earlier threat, Kai's resemblance to the man who made it, and his sudden raised arm behind her all support a genuine belief. She was effectively sober, so s 76(5) doesn't apply.
On the facts as she believed them (an imminent punch from a man who had threatened her), a single push to get him away is proportionate. She had about two seconds: a person acting in the heat of the moment can't weigh the exact force needed, and doing what she honestly and instinctively thought necessary is strong evidence that it was reasonable (s 76(7); Palmer v R). The injury came from an unlucky fall, not excessive force.
Advice: the prosecution can probably prove the elements of s 20, but once self-defence is raised it must disprove it beyond reasonable doubt, and it's unlikely to do so. Ella has a strong defence. There's no basis for a s 18 charge (no intent to cause serious harm), and loss of control is irrelevant outside murder.`,
  review: { verified: null, note: "Check the statement of s 76 and the s 20 mens rea against current sources before relying on it." },
};
