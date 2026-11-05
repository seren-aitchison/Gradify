import { test } from "node:test";
import assert from "node:assert/strict";
import { parseNotes, lessonFrame } from "../kit/course/notes.js";

test("case and statute cards: parsed, turned into flashcards and shown in the lesson", () => {
  const [L] = parseNotes(`## A lesson
S: lead
CASE: Carlill v Carbolic Smoke Ball Co [1893] 1 QB 256 | An advert promised £100. | A unilateral offer, accepted by performance. | Adverts can be offers.
LAW: Theft Act 1968, s 1 | Dishonest appropriation of property belonging to another with intent to permanently deprive.
CASE: Incomplete v Card | only two parts`);
  assert.equal(L.authorities.length, 2, "an incomplete card line is ignored (QA reports it)");
  assert.equal(L.cards.length, 3, "two flashcards per case, one per statute");
  assert.match(L.cards[1][0], /Adverts can be offers/);
  assert.equal(L.cards[1][1], "Carlill v Carbolic Smoke Ball Co [1893] 1 QB 256");
  assert.match(lessonFrame(L).end, /Case and statute cards/);
});

test("law notes: every case card names a citation", async () => {
  const { readdir, readFile } = await import("node:fs/promises");
  const dir = new URL("../kit/courses/law/notes/", import.meta.url);
  for (const f of (await readdir(dir)).filter((x) => /^u\d\d\.js$/.test(x))) {
    for (const line of (await readFile(new URL(f, dir), "utf8")).split("\n").filter((x) => x.startsWith("CASE: "))) {
      assert.match(line.split(" | ")[0], /\[\d{4}\]|\(\d{4}\)|Case \d+|Application no/, `${f}: ${line.slice(0, 60)}`);
    }
  }
});
