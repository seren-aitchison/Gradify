# Gradify model shorthand

Every message one model or script sends another uses these formats. Tags and IDs only: no greetings, no explanation, no restating the task. Shorthand never appears in anything a student reads; lessons are full, clear English.

One record per line. Fields are separated by ` | `. `#` starts a comment the engine ignores. Unknown tags are an error.

## IDs

- Framework: the registry id, e.g. `aqa-gcse-biology`
- Requirement: `<framework>:<ref>`, e.g. `aqa-gcse-biology:4.1.1.1.b`
- Topic: `<subject>/<topic-slug>`, e.g. `biology/osmosis`
- Lesson: `<course>/<unit>#<n>`, e.g. `biology/u03#4` (the 4th `##` lesson in `kit/courses/biology/notes/u03.js`); a new lesson is `new#<n>` until filed
- Line: `L<n>`, counted from the lesson's `## Title` line as L1

## Work packet (engine → Writer)

```
PKT <packet-id> | subj=<subject> | lvl=<LV value> | ctry=<country> | fw=<framework-id>
REQ <requirement-id> | <what it asks> | status=<statutory|official|attainment|developmental|recommended|supplementary> | type=<fact|concept|method|mech|prac|data>
REUSE <lesson-id> | <title>          # existing lessons on this topic: extend, don't duplicate
DIAG <diagram-id> | <what it shows>   # library diagrams the lesson may use with D:
RND <renderer-id> | <spec schema>     # renderers a new diagram may use with DIA:
BRIEF <topic-id>
<the brief's lines>
END
```

`<what it asks>` may be the official wording. It is input only: never copy it into a lesson.

## Research brief (Researcher → engine, stored at `content/research/<subject>/<topic>.txt`)

```
TOPIC <topic-id> | levels=<comma list> | checked=<YYYY-MM-DD>
F: fact | src ids | conf=high|med|low
DEF: term | definition | levels
MIS: misconception | correct idea
EXAM: what examiners reward or penalise | src
VAR: board, country or level difference
NUM: values, units or worked data | src
CONFLICT: where sources disagree | src ids
SRC: id | title | url | publisher | licence=adapt|noncommercial|facts|unknown | checked
```

## Review verdict (Reviewer → engine)

```
REV <lesson-id> OK
REV <lesson-id> FAIL <code> <line> <note of 12 words or fewer>; <code> <line> <note>
```

Codes: `FACT` not supported by the brief, or wrong · `COV` a REQ not taught to the depth asked · `LVL` wrong level for its LV · `Q` question flawed (wrong key, two right answers, answer given away) · `CLR` unclear · `SAFE` a needed safety line is missing · `COPY` wording copied from a specification or source · `CONF` relies on a CONFLICT item · `REQ` a REQ line that the lesson doesn't actually teach.

## Fix list (engine → Writer)

```
FIX <lesson-id>
L<n> <code>: <what is wrong, 12 words or fewer>
END
```

## Repair (Writer → engine): changed lines only

```
REPAIR <lesson-id>
L<n>> <replacement line>
+L<n>> <new line inserted after L<n>>
-L<n>
END
```

## Registry row (Discovery → engine): one JSON object per line

See `prompts/discovery.md` for the fields.
