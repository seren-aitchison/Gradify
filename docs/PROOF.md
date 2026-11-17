# Proof on the homepage

The homepage's "What's inside" section (`index.html`, `assets/proof.js`) shows only things that are true and checkable.

## The numbers

Read from `kit/api/v1/stats.json`, which `node scripts/build-api.mjs` counts from the courses: subjects, written
lessons, mind maps (five per lesson), the flashcards and the practice questions in the lessons. CI checks the API is up
to date, so the numbers can't drift. The page also carries them as text, so it reads correctly without its script.
They count what's on Gradify, never learners: Gradify doesn't publish how many people use it until those numbers
are worth showing and have been checked.

## The example mind map

`assets/example-map.svg` is the SVG export of a real lesson's first map (chemistry, "Matter and its classification"),
made by the viewer's own Export menu. It links to the live, interactive map. To refresh it after the engine changes,
export that map again (Export, Vector) and replace the file.

## Learner quotes

`assets/quotes.json` holds learners' words, shown only when a learner has agreed:

```json
[{ "quote": "…exactly what they wrote…", "name": "Amira K.", "studying": "A-level chemistry", "consent": true,
   "consentRecorded": "email, 2026-11-20" }]
```

- Use their words exactly. Don't edit for meaning, combine quotes or write one for them.
- Ask in writing whether they agree to their words appearing on the website, and how they'd like to be named
  (first name and initial is the usual choice). Keep that reply. `consent` must be `true`, and `consentRecorded` says
  where the agreement is kept.
- Remove a quote straight away if they ask.
- Never invent a quote, a name or a number, including as a placeholder. Until there are real ones the block stays
  hidden.
