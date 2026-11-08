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
| 3. Tudor England | 14 | ✅ standard 2 | 70 |
| 4. Stuart Britain and the Civil War | 18 | ✅ standard 2 | 90 |
| 5. The Industrial Revolution | 18 | ✅ standard 2 | 90 |
| 6. Nineteenth-Century Britain | 15 | ✅ standard 2 | 75 |
| 7. The First World War | 21 | ✅ standard 2 | 105 |
| 8. The Russian Revolution and the Soviet Union | 20 | ✅ standard 2 | 100 |
| 9. The Rise of Fascism and Nazism | 20 | ✅ standard 2 | 100 |
| 10. The Second World War | 19 | ✅ standard 2 | 95 |
| 11. The Cold War | 19 | ✅ standard 2 | 95 |
| 12. Britain since 1945 | 17 | ✅ standard 2 | 85 |
| 13–18 | 86 | not yet ("notes still being written" on the path) | |

Every written lesson has objectives, sections, a worked example of historical analysis, evidence-status lines (established or contested), key terms, a summary, two real sources, two flashcards and at least five questions across Foundation, Application and Evaluation, including a rubric-marked extended answer.

**Live verified (8 November 2026):** on getgradify.com, in a real browser: the homepage lists HistoryGradify; its homepage and course load; a School 10 lesson renders with its questions; after Schools 11 and 12 were deployed, the first School 11 lesson and the first, Brexit and last School 12 lessons rendered with 5 questions each; after Schools 3, 4 and 8 were deployed, the first and last lessons of Schools 3 and 8 and two School 4 lessons did the same; after Schools 5 and 6 were deployed, three lessons from each, including the first and last, did the same; the timeline lab mounts in its lesson; answering a question records progress; the sidebar links to the Journey, which shows History progress; no console errors; no horizontal overflow at phone width. Accounts can't be tested live: production has no database connected (docs/BACKEND-STATUS.md).

**Academic review:** none yet. The review pack for a history teacher or historian is `docs/qa/history-review-pack.md` (`node scripts/review-pack.mjs history`).

**Tested:** `tests/new-courses.test.mjs` (structure, ids, lesson standard, registration), the cross-site suite, and `npm run qa` content checks. Checked in a browser at desktop and phone width.
**Awaiting expert review:** every school (a history teacher or university historian). Dates, names and figures need checking against the cited sources.

## Interactives

| Lab | What it teaches | Placed in |
|---|---|---|
| Source investigation (`kit/labs/history/sources.js`) | Six real sources (the Bayeux Tapestry, Domesday Book, a 1915 recruitment poster, two Peterloo accounts, the Sadler Committee, the Anglo-Saxon Chronicle): judge what each can and can't show | Source provenance; linked from five more School 1 lessons |
| Timeline, 1066–1991 (`kit/labs/history/timeline.js`) | Reigns, wars and events on one scale; challenges on duration, overlap and gaps | Continuity and change; linked from Chronology and periodisation, The Wars of the Roses, The rise of the Tudor dynasty |
| Cause and consequence (`kit/labs/history/causes.js`) | Sort the factors behind 1914, 1381 and 1933 into long-term causes, short-term causes and triggers | Cause and consequence; linked from The Peasants' Revolt, The July Crisis, The outbreak of war, Hitler's rise to power |
| Chronology challenge (`kit/labs/history/chronology.js`) | Order dated events in four rounds, from Hastings to 1991, with keyboard controls | Chronology and periodisation; linked from Continuity and change |

Each challenge counts as mastery evidence for its lesson (`evidence.js`). The Journey page's daily challenge also builds a history chronology round from dated evidence lines in the notes (docs/GAMIFICATION.md).

## Next

1. Schools 1 to 12, the British and European history from the medieval period to the present, are written and QA verified: 215 lessons. None is academically verified yet. Next: Schools 13 to 18.
2. More labs, in priority order: an interactive timeline, cause-and-consequence mapping, interpretation comparison, and maps of changing borders and campaigns.
