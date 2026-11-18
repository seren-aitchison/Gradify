// Teach me / Revision notes: the revision sheet is built only from what the lesson states, so it can't disagree with it
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseNotes, revisionHtml } from "../kit/course/notes.js";

const L = parseNotes(`
## Ohm's law
S: The current through an ohmic conductor is proportional to the potential difference across it, at constant temperature.
H: The law
E: V = IR :: potential difference = current × resistance
K: Resistance is constant only for an ohmic conductor at constant temperature.
!: A filament lamp is not ohmic: its resistance rises as it heats.
X: 2.0 A flows through a 6.0 Ω resistor. Find V.
> V = IR = 2.0 × 6.0 = 12 V
T: Resistance | Potential difference per unit current, in ohms
SUM: V = IR, with R constant for ohmic conductors.
Q: What is the unit of resistance? | The ohm (Ω), one volt per ampere.
`)[0];

test("the revision sheet holds the key points, formulas, terms, mistakes, examples and flashcards", () => {
  const h = revisionHtml(L);
  for (const s of ["Must know", "Resistance is constant only", "V = IR, with R constant", "Formulas and rules", "V = IR", "Key terms", "Potential difference per unit current", "Don't fall for", "filament lamp", "Practise with", "Test yourself", "The ohm"]) assert.ok(h.includes(s), s);
});
test("a lesson with nothing to condense gives an empty sheet, not empty headings", () => {
  const h = revisionHtml(parseNotes("## Bare\nS: A lead long enough to count as a lead for this lesson, and nothing else at all.\nP: Text.")[0]);
  assert.ok(!h.includes("<h3>"));
});
