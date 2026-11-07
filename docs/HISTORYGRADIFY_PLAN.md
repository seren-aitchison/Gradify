# HistoryGradify: plan and status

HistoryGradify (getgradify.com/historygradify/) is Gradify's history site: British, European and world history for GCSE, A level and independent study. It was produced by duplication, with no new infrastructure:

1. Registered in `kit/core/sites.js` (with a new `landmark` icon in `kit/core/icons.js`), with homepage copy in `kit/core/site-pages.js`, `site-content.js` and `site-maps.js`.
2. `npm run new-site -- HistoryGradify` made `historygradify/` from `kit/templates/subsite/` (homepage, study app, learning map, LifeOS).
3. `node scripts/new-course.mjs scaffold history --site HistoryGradify --folder historygradify …` duplicated the content-standard-2 course structure (the pattern every recent course, MathGradify included, follows) into `kit/courses/history/` and wrote `historygradify/course/index.html`.
4. The course is defined with the history subject adapter (`kit/subjects/history.js`: wording, levels, the history QA rule and reviewer flags) and registered in `kit/learning/learner-data.js`; the tutor has a history rules line (`kit/assess/tutor.js`, live once `course-tutor` is redeployed).
5. `node scripts/new-course.mjs lock history` fixes the 301 lesson ids and every question id.

It was checked before starting: HistoryGradify wasn't in the production tracker (docs/SITE-PRODUCTION.md), had no folder and wasn't in `sites.js`. It is not one of the 23 sites assigned to the subject builders, and this work doesn't touch their tracker.

## Curriculum

18 schools, 301 lessons, in six stages, with five paths: the whole course, a GCSE pathway, an A level pathway, Britain 1066 to today, and the modern world. Pathways follow topics most GCSE and A level specifications study; the course says plainly that it is not any one exam board's specification.

## Status

| School | Lessons | Written | Questions |
|---|---|---|---|
| 1. Historical Thinking and Methods | 16 | ✅ standard 2 | 82 |
| 2. Medieval Britain | 18 | ✅ standard 2 | 90 |
| 7. The First World War | 21 | ✅ standard 2 | 105 |
| 3–6, 8–18 | 246 | not yet ("notes still being written" on the path) | |

Every written lesson has objectives, sections, a worked example of historical analysis, evidence-status lines (established or contested), key terms, a summary, two real sources, two flashcards and at least five questions across Foundation, Application and Evaluation, including a rubric-marked extended answer.

**Tested:** `tests/new-courses.test.mjs` (structure, ids, lesson standard, registration), the cross-site suite, and `npm run qa` content checks. Checked in a browser at desktop and phone width.
**Awaiting expert review:** every school (a history teacher or university historian). Dates, names and figures need checking against the cited sources.

## Interactives

| Lab | What it teaches | Placed in |
|---|---|---|
| Source investigation (`kit/labs/history/sources.js`) | Six real sources (the Bayeux Tapestry, Domesday Book, a 1915 recruitment poster, two Peterloo accounts, the Sadler Committee, the Anglo-Saxon Chronicle): judge what each can and can't show | Source provenance; linked from five more School 1 lessons |
| Chronology challenge (`kit/labs/history/chronology.js`) | Order dated events in four rounds, from Hastings to 1991, with keyboard controls | Chronology and periodisation; linked from Continuity and change |

Each challenge counts as mastery evidence for its lesson (`evidence.js`). The Journey page's daily challenge also builds a history chronology round from dated evidence lines in the notes (docs/GAMIFICATION.md).

## Next

1. Schools 7, 9 and 10 (the rest of the GCSE core), then the rest in pathway order.
2. More labs, in priority order: an interactive timeline, cause-and-consequence mapping, interpretation comparison, and maps of changing borders and campaigns.
