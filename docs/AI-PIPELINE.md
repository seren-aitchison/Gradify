# Gradify AI: the Notes Studio pipeline

How the full version of Notes Studio turns a PDF of messy notes into a study pack for every way of learning: clean notes, flashcards, a spidermap, a cheat-sheet poster, a narrated video and a catchy song.

The version on getgradify.com today is a **browser-only preview**: simple rules plus pdf.js, the browser's voices and Web Audio (`kit/notes/studio.js`). It shows the shape of the product. This document is the plan for the real thing, built on the Claude API. Nothing here is built yet.

---

## The core idea: understand once, render many times

Every output comes from one **knowledge pack**: a structured, checked summary of what the notes contain. The expensive, careful step (reading messy notes and working out the facts) happens once. Each output is a cheap transform of that pack.

```
PDF / photo / handwriting / YouTube transcript
        │
        ▼
1. Ingest ─────── PDF text + page images, OCR for scans and handwriting
        │
        ▼
2. Understand ─── Claude reads the whole document → knowledge pack (JSON, schema-checked)
        │
        ▼
3. Verify ─────── every fact traced back to the source page; unsupported facts flagged
        │
        ▼
4. Render ─────── clean notes · flashcards · spidermap · cheat sheet · video script · song lyrics · audio quiz
        │
        ▼
5. Media ──────── text-to-speech · music · image and video assembly
        │
        ▼
6. Learn ──────── cards into spaced repetition, facts onto the spidermap and Gradify Earth, dates into Plan
```

This mirrors what the preview already does, so the UI doesn't need to change when the real engine arrives: the Studio just receives a better pack.

---

## 1. Ingest

| Input | How |
|---|---|
| PDF with selectable text | Send the PDF straight to Claude as a `document` content block. Claude reads both the text and the page images, so diagrams, arrows and margin scribbles count. Limits: 32 MB per request, up to 600 pages. |
| Scanned PDF, photo of notes, handwriting | Send the pages as images. Claude's vision reads handwriting directly; a dedicated handwriting engine is only worth adding if quality tests show it's needed. |
| Long courses, many files | Upload once with the **Files API** (`client.files.upload`) and refer to the `file_id` in every later request, so the same file isn't re-uploaded for each output. |
| YouTube | Fetch the transcript server-side (with the video's captions), then treat it as text. Keep the timestamps so flashcards can link back to the moment in the video. |
| Voice notes | Speech-to-text first, then treat as text. |

## 2. Understand: the knowledge pack

One request to **Claude Opus 5.5** (`claude-opus-5-5`), with the document attached and **structured outputs**, so the response is guaranteed to match the schema. No regex parsing of model text.

The knowledge pack schema (simplified):

```ts
const KnowledgePack = z.object({
  title: z.string(),
  level: z.enum(["school", "undergraduate", "postgraduate", "professional"]),
  topics: z.array(z.object({                    // become spidermap branches and notes sections
    name: z.string(),
    theme: z.string(),                          // one word for the branch bubble
    mnemonic: z.string().nullable(),            // acronym or memory hook, if one genuinely helps
    facts: z.array(z.object({
      id: z.string(),
      term: z.string().nullable(),
      abbreviation: z.string().nullable(),
      statement: z.string(),                    // the fact, rewritten clearly
      kind: z.enum(["definition", "cause", "process", "equation", "example", "list"]),
      symbol: z.string(),                       // emoji or icon name for the cheat sheet
      importance: z.enum(["core", "supporting", "bonus"]),
      sourcePages: z.array(z.number()),
      prerequisites: z.array(z.string()),       // fact ids → roads on Gradify Earth
    })),
  })),
  equations: z.array(z.object({ symbolic: z.string(), spoken: z.string(), variables: z.record(z.string()) })),
  dates: z.array(z.object({ what: z.string(), date: z.string(), kind: z.enum(["exam", "deadline", "class", "other"]) })),
  unclear: z.array(z.string()),                 // things in the notes Claude couldn't make sense of; shown to the learner
});
```

Rules written into the system prompt:

- **Only what's in the notes.** Rewrite for clarity, but don't add facts the notes don't contain. Anything extra (a bonus fact, a fuller explanation) is marked `importance: "bonus"`, so the UI can label it "from Gradify AI, not your notes".
- **Fix, don't silently change.** If the notes look wrong (a reversed definition, a wrong unit), keep the learner's version and add it to `unclear` with a suggested correction.
- **Pitch at the learner's level.** Use the site it came from (MedGradify, YouthGradify…) and the learner's level from LifeOS.

Sketch, TypeScript (`@anthropic-ai/sdk`), the way a Next.js route would call it:

```ts
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

const client = new Anthropic();

const file = await client.files.upload({ file: pdf });   // once per upload

const pack = await client.messages.parse({
  model: "claude-opus-5-5",
  max_tokens: 16000,
  output_config: { effort: "high", format: zodOutputFormat(KnowledgePack) },
  system: [{ type: "text", text: STUDIO_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
  messages: [{
    role: "user",
    content: [
      { type: "document", source: { type: "file", file_id: file.id }, title: fileName },
      { type: "text", text: `Learner: ${learnerProfile}. Build the knowledge pack.` },
    ],
  }],
});

if (pack.stop_reason === "refusal" || !pack.parsed_output) { /* show a friendly error, offer retry */ }
```

**Notes on the API choices:**

- **Effort:** Opus 5.5 defaults to `medium`. Set `high` explicitly for this step, because getting the facts right is the whole product. The render steps can run lower.
- **Refusal fallback:** turn on the server-side fallback in production (`betas: ["server-side-fallback-2026-07-01"]`, `fallbacks: "default"` on the beta endpoint), so a rare false-positive safety decline on, say, pharmacology notes reruns on another model instead of failing. Always check `stop_reason` before reading the output.
- **Prompt caching:** the system prompt and the document are the same for every output a learner asks for, so cache them. Regenerating "just the song" then costs a fraction of the first run.

## 3. Verify

Structured outputs and citations can't be used in the same request, so verification is its own step: a second request with the same (cached) document and `citations: { enabled: true }` on the document block. It asks Claude to quote the source for each core fact. Facts without a supporting quote get flagged in the UI ("Check this one: we couldn't find it in your notes").

This step is what makes the courses credible enough to count as qualifications later: every card can show where it came from.

## 4. Render

Each output is a small request (or plain code) that takes the knowledge pack as input. Most don't need the document again.

| Output | How | Model work |
|---|---|---|
| **Clean notes** | Pack → Markdown/HTML. Headings per topic, key terms bold, equations boxed, dates at the end. Downloadable as `.md`, `.pdf`, `.docx`. | None. Templates only. |
| **Flashcards** | Definition, cloze and "why/how" cards per fact, plus reversed cards for key terms. Each card stores `factId`, so ratings feed back into the fact's strength. | One request with structured output (`cards[]`). |
| **Spidermap** | Topics → branches, facts → leaves, `prerequisites` → links between branches, mnemonics as pills. Laid out with a force-directed graph in the browser. | None. Graph from the pack. |
| **Cheat sheet poster** | One tile per core fact with its symbol, plus the equations strip and memory hooks. SVG → PNG/PDF. For an illustrated "story poster", generate one image per topic with an image model, using a prompt written by Claude from the pack. | Optional image prompts. |
| **Narrated video** | Claude writes a scene list: for each scene, voiceover text, on-screen text, a visual (symbol, diagram from the pack, or generated image) and its length. Rendered server-side (for example Remotion or FFmpeg) with a TTS voice. 60–120 seconds per topic. | One request (`scenes[]`). |
| **Song / chant** | Claude writes lyrics with a strict structure: syllable counts per line, a chorus built from the equation or mnemonic, verses one fact per line, and rhymes that don't bend the facts. Then either a music-generation service sings it, or (cheaper) a beat track plus TTS rapping on the beat, as the preview does. Learner picks the style: chant, pop, rap, lullaby. | One request (`lyrics`, `bpm`, `style`). |
| **Audio quiz** | Cards → spoken questions with pauses and answers. Pure TTS. Good for commutes, walks and podcasts. | None. |
| **Key-terms sheet and dictionary** | Every term with its definition, abbreviation and the sentence it came from. | None. |
| **Practice questions** | Exam-style questions with marked feedback, harder than flashcards, written against the facts. | One request; marking uses a rubric per question. |

**Bulk jobs:** when a teacher or university uploads a whole course, run the render requests through the **Message Batches API** at half price. Results come back in any order, so key them by `custom_id`.

## 5. Media services (not Claude)

Claude writes every script, lyric and image prompt. The audio and video themselves need other services:

- **Text-to-speech** for voiceovers, the audio quiz and the chant vocals. Choose for natural UK and US voices, speed control and price per character.
- **Music generation** for full songs, if wanted. Check the licence allows commercial use of what it generates.
- **Image generation** for illustrated posters and video visuals. Keep a consistent Gradify style prompt.
- **Video assembly** on the server: Remotion (React) fits the existing front end; FFmpeg is the cheap fallback.

## 6. Feeding back into LifeOS

- Cards go into the learner's spaced-repetition queue (the Study feed).
- Each fact becomes a node in **Gradify Earth** and the spidermap, and lights up as the learner proves it (recall, explain, apply, retain, connect).
- Dates become **Plan** events, and Auto-plan schedules revision blocks before them.
- Usage counts as XP and appears on the life heatmap.

## Safety and trust

- Every AI-made output says so, and links back to the source page where possible.
- `unclear` items and unverified facts are shown, never hidden.
- Medical, legal and financial notes get a line making clear the pack is a study aid, not advice.
- Learners own their uploads. Delete means delete: the file in the Files API, the pack and the media.
- Track tokens and cost per pack from `usage` on each response, so pricing (£1–£3 a month ideas) can be checked against real costs before launch.

## Build order

1. Upload → knowledge pack → clean notes and flashcards (the core loop; measure fact accuracy on 50 real sets of notes before going further).
2. Verification with citations.
3. Spidermap and cheat sheet (no extra model cost).
4. Audio quiz and chant with TTS.
5. Narrated video.
6. Full songs, illustrated story posters, YouTube and handwriting.
