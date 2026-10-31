// LawGradify legal reasoning case file: contract formation, worked through issue by issue with IRAC.
// Fictional client and facts; law of England and Wales as at 2026. Built on kit/interactive/scenario.js.
// Authorities: Fisher v Bell [1961] 1 QB 394; Partridge v Crittenden [1968] 1 WLR 1204; Hyde v Wrench
// (1840) 3 Beav 334; Stevenson v McLean (1880) 5 QBD 346; Adams v Lindsell (1818) 1 B & Ald 681;
// Byrne v Van Tienhoven (1880) 5 CPD 344; Holwell Securities v Hughes [1974] 1 WLR 155.
import { mountScenario } from "../../../interactive/scenario.js";
import { esc, inline } from "../../../core/text.js";

const DOCS = [
  ["1 March", "Listing on Harbour Cameras' website: \"Leica M3, excellent condition, £1,800\"."],
  ["2 March, 09:10", "Email from Dr Amara Okoye: \"I'll buy the Leica M3 for £1,800.\""],
  ["2 March, 16:00", "Email from Harbour Cameras: \"Happy to sell at £1,800, but insured courier delivery is £45 on top. Reply by post if that's acceptable, as we need your signature on the form.\""],
  ["3 March", "Dr Okoye posts the signed form and a letter: \"Agreed, £1,845 including delivery.\" It arrives on 6 March."],
  ["5 March", "Harbour Cameras sells the camera to another customer for £2,100 and emails Dr Okoye: \"Sorry, the camera has gone.\""],
];

const panel = (s) => `<h4>Case file: Okoye v Harbour Cameras</h4><ol class="sx-docs">${DOCS.map(([d, t]) => `<li><b>${esc(d)}</b> ${esc(t)}</li>`).join("")}</ol>
  <h4>Your analysis so far</h4>${s.irac.length ? `<ol class="sx-irac">${s.irac.map(([k, t]) => `<li><span>${esc(k)}</span>${inline(t)}</li>`).join("")}</ol>` : "<p class=\"tx-note\">Your issues, rules and conclusions appear here as you work.</p>"}`;
const add = (k, t) => (s) => ({ irac: [...s.irac, [k, t]] });

// choices update the analysis panel through `set` (computed from the current state when chosen)
const steps = {
  issues: { title: "Identify the issues", text: "Dr Okoye wants to know whether she had a contract for the camera. Before answering, identify the legal issues the facts raise.",
    multi: { next: "listing", options: [
      { label: "Was the website listing an offer or an invitation to treat?", correct: true, why: "Everything else depends on who made the offer." },
      { label: "Did Harbour Cameras' reply accept Dr Okoye's offer or make a counter-offer?", correct: true, why: "The reply added a new term (the £45 delivery charge)." },
      { label: "When, if ever, was there a valid acceptance, and was it before the camera was sold?", correct: true, why: "The timing of the posted acceptance and the sale decides the outcome." },
      { label: "Was there consideration for the promise to sell?", correct: false, why: "A sale for a price is plainly supported by consideration; it isn't a live issue on these facts." },
      { label: "Was the contract frustrated by the sale to another customer?", correct: false, why: "Frustration requires a supervening event without fault; a seller choosing to sell elsewhere is (at most) a breach." },
    ] } },
  listing: { title: "Issue 1: the website listing", text: "What is the best analysis of the listing on 1 March?",
    choices: [
      { label: "An invitation to treat, like goods displayed for sale (Fisher v Bell; Partridge v Crittenden), so Dr Okoye's email of 2 March is the offer", next: "reply", score: 1, feedback: "Right. Advertisements and displays are generally invitations to treat, so the seller isn't bound to sell to everyone who replies. Dr Okoye's email was the offer.", set: "I1" },
      { label: "A unilateral offer to the world, accepted by Dr Okoye's email (Carlill v Carbolic Smoke Ball Co)", next: "reply", score: 0, feedback: "Carlill involved a promise to pay anyone who performed a condition, backed by a deposit to show seriousness. An ordinary sale listing of one item is an invitation to treat; otherwise the seller could be bound to many buyers.", set: "I1x" },
      { label: "An offer, because the price was stated precisely", next: "reply", score: 0, feedback: "A precise price doesn't turn a listing into an offer (compare Partridge v Crittenden, where a priced advert was an invitation to treat).", set: "I1x" },
    ] },
  reply: { title: "Issue 2: the seller's reply", text: "Harbour Cameras replied that it was \"happy to sell at £1,800, but insured courier delivery is £45 on top\". What is the legal effect of that reply?",
    choices: [
      { label: "A counter-offer: it introduced a new term, so it rejected Dr Okoye's offer and became a new offer (Hyde v Wrench)", next: "method", score: 1, feedback: "Right. Acceptance must mirror the offer. Adding a delivery charge changes the terms, so there was no contract yet; the seller's reply was a new offer.", set: "I2" },
      { label: "An acceptance, so a contract was made on 2 March at £1,800", next: "method", score: 0, feedback: "An acceptance must be unqualified. The new delivery charge makes the reply a counter-offer, not an acceptance.", set: "I2x" },
      { label: "A request for information that left Dr Okoye's offer open (Stevenson v McLean)", next: "method", score: 0.3, feedback: "Stevenson v McLean concerned a genuine enquiry about terms. Here the seller stated a new term it required, so the better view is a counter-offer.", set: "I2x" },
    ] },
  method: { title: "Issue 3: acceptance by post", text: "Dr Okoye posted her acceptance on 3 March; it arrived on 6 March. The seller sold the camera on 5 March. When did her acceptance take effect?",
    choices: [
      { label: "On posting, 3 March, under the postal rule (Adams v Lindsell), because the seller asked for a reply by post", next: "revocation", score: 1, feedback: "Right. Where post is the requested or a reasonable method, acceptance takes effect when properly posted. The seller expressly asked for a postal reply, so the rule applies and nothing in the offer excluded it (contrast Holwell Securities v Hughes).", set: "I3" },
      { label: "On arrival, 6 March, because acceptance must always be received", next: "revocation", score: 0, feedback: "Receipt is the general rule, but the postal rule is an exception where post is a reasonable or requested method, as here.", set: "I3x" },
      { label: "Never: email was the earlier method, so a posted acceptance is invalid", next: "revocation", score: 0, feedback: "The seller itself asked for a reply by post, so posting was not just valid but the prescribed method.", set: "I3x" },
    ] },
  revocation: { title: "Issue 4: the sale and the email of 5 March", text: "Could the seller's sale on 5 March, or its email that day, prevent a contract?",
    choices: [
      { label: "No: a contract was concluded on 3 March when the acceptance was posted, before any revocation was communicated; the later sale is a breach", next: "advice", score: 1, feedback: "Right. Revocation must be communicated before acceptance takes effect (Byrne v Van Tienhoven). Here acceptance was complete on posting on 3 March, so the 5 March email came too late.", set: "I4" },
      { label: "Yes: selling the camera revoked the offer automatically", next: "advice", score: 0, feedback: "Revocation must be communicated, and in any case it came after the acceptance had taken effect on posting.", set: "I4x" },
      { label: "Yes: the email revoked the offer because emails are instantaneous", next: "advice", score: 0, feedback: "The email was sent on 5 March, after the contract was formed on 3 March. Its speed doesn't matter.", set: "I4x" },
    ] },
  advice: { title: "Advise the client", text: "Which is the best advice to Dr Okoye?",
    choices: [
      { label: "You had a binding contract at £1,845 from 3 March; the seller is in breach. You can claim damages, probably measured by the difference between the contract price and the market price of a comparable camera (here up to about £255 if £2,100 reflects the market), and you should take reasonable steps to mitigate", next: "end", score: 1, feedback: "Clear, client-focused advice: the conclusion, the remedy and its likely measure, and the duty to mitigate. Specific performance is unlikely unless the camera is unique.", set: "C" },
      { label: "You can force the seller to recover the camera from the other buyer and hand it over", next: "end", score: 0, feedback: "The other buyer has good title, and specific performance of a contract for an ordinary, replaceable item is unlikely; damages are the normal remedy.", set: "Cx" },
      { label: "You have no claim because the seller sold to someone else first", next: "end", score: 0, feedback: "The contract was already formed when the acceptance was posted on 3 March; the later sale is a breach, not a defence.", set: "Cx" },
    ] },
  end: { title: "Debrief", end: true, summary: "Working issue by issue (IRAC) turns a confusing exchange of messages into a short chain of questions: who offered, did the reply accept or counter-offer, when did acceptance take effect, and was any revocation in time?" },
};

const IRAC = {
  I1: ["Issue 1", "Listing = invitation to treat (Fisher v Bell; Partridge v Crittenden). Dr Okoye's email = offer."],
  I1x: ["Issue 1", "Listing treated as an offer: check this against Fisher v Bell and Partridge v Crittenden."],
  I2: ["Issue 2", "Seller's reply added a term = counter-offer (Hyde v Wrench); new offer at £1,845, reply by post requested."],
  I2x: ["Issue 2", "Reply not treated as a counter-offer: revisit the mirror image rule (Hyde v Wrench)."],
  I3: ["Issue 3", "Posted acceptance effective on posting, 3 March (Adams v Lindsell), post being the requested method."],
  I3x: ["Issue 3", "Acceptance timing: revisit the postal rule and when it applies."],
  I4: ["Issue 4", "Revocation on 5 March too late (Byrne v Van Tienhoven); sale = breach."],
  I4x: ["Issue 4", "Revocation: must be communicated before acceptance takes effect."],
  C: ["Conclusion", "Contract formed 3 March; breach; damages (market difference), subject to mitigation."],
  Cx: ["Conclusion", "Revisit the remedy: damages are the normal remedy for ordinary goods."],
};
for (const st of Object.values(steps)) for (const c of st.choices || []) if (typeof c.set === "string") c.set = add(...IRAC[c.set]);

export const scenario = {
  kind: "Legal reasoning", title: "Okoye v Harbour Cameras: was there a contract?",
  banner: "A fictional case file for study. It explains the law of England and Wales as at 2026 and isn't legal advice.",
  intro: "Your supervising solicitor asks you to analyse the case file in the panel and advise the client, Dr Amara Okoye, who wanted to buy a vintage camera that the seller sold to someone else.",
  state: { irac: [] }, panel, start: "issues", steps,
  debrief: () => `<h4>Authorities used</h4><ul><li>Fisher v Bell [1961] 1 QB 394; Partridge v Crittenden [1968] 1 WLR 1204: displays and adverts as invitations to treat</li><li>Hyde v Wrench (1840) 3 Beav 334: counter-offers</li><li>Adams v Lindsell (1818) 1 B & Ald 681: the postal rule; Holwell Securities v Hughes [1974] 1 WLR 155: excluding it</li><li>Byrne v Van Tienhoven (1880) 5 CPD 344: revocation must be communicated</li></ul><p class="tx-note">All are binding authorities of the higher courts on these points. Online sales to consumers also engage consumer legislation (for example, cancellation rights), which this exercise leaves aside.</p>`,
};

export function mount(el, opts) { mountScenario(el, scenario, opts); }
