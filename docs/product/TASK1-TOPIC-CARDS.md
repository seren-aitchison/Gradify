# Task 1: topic cards open their topic

Product Excellence Sprint, 23 November 2026. Fixes problem 2 of the Week 1 ecosystem audit (186 topic cards on every subject site opened the generic app).

## The problem, precisely

Every subject site's homepage has six topic cards. All of them linked to `app.html`, the generic notes-upload page:
**186 cards on 31 sites** (30 sites in the audit's crawl, plus TechGradify). The audit reported 193 because its rule
("any substantial link to `app.html` in the page body") also caught some general calls to action. The exact figures:

- 186 topic cards, all fixed here.
- 45 other links to the bare app on site homepages: "Start free →" on every site, plus some "Start revising" /
  "Start your first module" style buttons. They aren't topic cards and are outside this task. A few of them promise a
  course and might better open it; that's a candidate for a later task.

## What changed

- `kit/core/site-content.js`: each topic now has a third field, its destination, chosen by hand against the course's
  units and lessons. `null` means no real destination exists yet.
- `kit/core/subsite-home.js`: a card with a destination links to it; a card without one is shown as a plain card (no
  link, no arrow, no hover lift). Nothing falls back to the generic app.
- `kit/styles/subsite.css`: only linked cards lift on hover.
- Existing URLs and course routing are unchanged: every destination is an existing course page, `#/learn/<unit>`,
  `#/lesson/<id>`, `#/write`, or an existing app route.

## Checks

- `tests/topic-cards.test.mjs` (in CI): resolves every destination against the real data (the course page exists, the
  unit is in its syllabus, the lesson is in the search index, the app route and tool exist) and fails on the bare app.
  Shown failing when a card was pointed back at `app.html`.
- `scripts/product/topic-cards.cjs`: clicked every linked card in Chromium. **190 of 190 landed correctly**: 172 on
  desktop (every site) and 18 on a phone (LawGradify, NurseGradify, SciGradify). Each landing shows that unit's lessons,
  that lesson's notes, the tool or the course, with no page errors.
- `npm test`: 1,132 / 1,132. `build-site --check` and `theme-tokens --check` pass.

## Known limitation (Task 2)

Seven tool cards (Progress on four sites; Mind maps, Audio and Convert on EduGradify) go to app screens that a
**first-time** visitor currently sees only after the goal question ("What do you want to achieve?"). They land
correctly for anyone who has answered or skipped it. Stopping onboarding from interrupting navigation is Task 2.

## Every card

| Now opens | Cards |
|---|---|
| A unit of that site's course | 145 |
| A single lesson that matches exactly | 6 |
| The course home (the topic is taught across the course) | 6 |
| The course's written practice (LawGradify problem questions) | 1 |
| A specific app tool (Add notes, Progress, Mind maps, Audio, Convert) | 9 |
| A real course on another Gradify site | 5 |
| **Not linked: no real destination yet** | **14** |

The 14 unlinked cards, and what's missing:
- ProGradify: Certifications, Industry knowledge
- BusinessGradify: Case studies
- DentalGradify: Oral medicine
- InternshipGradify: Matching
- SocGradify: Social policy
- MusicGradify: Your instrument, Graded exams
- LanguageGradify: all six (the cards name skills, but the site has two languages)

The full reasons are in the table. Each needs either content or a new card, which is a decision for later.


| Site | Card | Now opens | Kind | Why |
|---|---|---|---|---|
| UnderGradify | Lecture notes | `app.html#/new` | tool | Add notes: notes into checked flashcards |
| UnderGradify | Coursework | `course/#/learn/u05` | unit | Academic Writing |
| UnderGradify | Exam prep | `course/#/learn/u10` | unit | Exams and Revision |
| UnderGradify | Reading | `course/#/learn/u04` | unit | Reading Academic Texts and Critical Thinking |
| UnderGradify | Statistics | `course/#/learn/u08` | unit | Numeracy and Data Skills |
| UnderGradify | Degree progress | `app.html#/progress` | tool | Progress |
| PostGradify | Literature reviews | `course/#/learn/u02` | unit | Research Questions and the Literature Review |
| PostGradify | Research methods | `course/#/learn/u04` | unit | Research Design |
| PostGradify | Dissertation planning | `course/#/learn/u10` | unit | Academic Writing and the Thesis |
| PostGradify | Statistics | `course/#/learn/u05` | unit | Quantitative Methods and Statistics |
| PostGradify | Teaching | `course/#/lesson/u12-11` | lesson | Teaching in higher education |
| PostGradify | Your viva | `course/#/learn/u12` | unit | The Viva and Beyond |
| ProGradify | Certifications | — (not linked) | none | No certification preparation (PMP, PRINCE2, CIPD) in the course; one PRINCE2 lesson only |
| ProGradify | Leadership | `course/#/learn/u03` | unit | Management and Organisational Behaviour |
| ProGradify | Communication | `course/#/learn/u01` | unit | Professional Communication |
| ProGradify | Data skills | `course/#/learn/u07` | unit | Data and Digital Skills at Work |
| ProGradify | Industry knowledge | — (not linked) | none | No field-specific regulation content |
| ProGradify | CPD | `app.html#/progress` | tool | Progress |
| EduGradify | Retrieval quizzes | `app.html#/new` | tool | Add notes: slides into a study pack |
| EduGradify | Knowledge organisers | `app.html#/tools/convert` | tool | Convert: notes into a cheat sheet |
| EduGradify | Mind maps | `app.html#/tools/map/new` | tool | Mind map maker |
| EduGradify | Hinge questions | `course/#/learn/u04` | unit | Assessment and Feedback |
| EduGradify | Audio quizzes | `app.html#/tools/audio` | tool | Audio |
| EduGradify | Your CPD | `app.html#/progress` | tool | Progress |
| YouthGradify | Maths | `/mathgradify/course/#/learn/u28` | other site | MathGradify: School and Examination Mathematics |
| YouthGradify | English | `course/#/learn/u02` | unit | Foundations of Literary Study |
| YouthGradify | Science | `course/#/learn/u04` | unit | The Human Body (science is units 4 to 6) |
| YouthGradify | History | `/historygradify/course/` | other site | HistoryGradify course |
| YouthGradify | Languages | `/languagegradify/` | other site | LanguageGradify: Spanish and Japanese |
| YouthGradify | What's next | `/internshipgradify/course/#/learn/u08` | other site | InternshipGradify: Graduate Schemes, Apprenticeships and Other Routes |
| JuniorGradify | Times tables | `course/#/learn/u02` | unit | The Four Operations and Times Tables |
| JuniorGradify | Spelling | `course/#/learn/u05` | unit | Phonics and Spelling |
| JuniorGradify | Reading | `course/#/learn/u06` | unit | Reading and Comprehension |
| JuniorGradify | Number | `course/#/learn/u01` | unit | Number and Place Value |
| JuniorGradify | Science | `course/#/learn/u08` | unit | Plants, Animals and Habitats (science is units 8 to 10) |
| JuniorGradify | The world | `course/#/learn/u12` | unit | Geography |
| LawGradify | Contract | `course/#/learn/u03` | unit | Contract Law |
| LawGradify | Tort | `course/#/learn/u04` | unit | Tort Law |
| LawGradify | Criminal law | `course/#/learn/u05` | unit | Criminal Law |
| LawGradify | Public law | `course/#/learn/u02` | unit | Constitutional and Administrative Law |
| LawGradify | Land law | `course/#/learn/u07` | unit | Land Law |
| LawGradify | Problem questions | `course/#/write` | course practice | Problem questions, SQE2 writing and client interviews |
| BusinessGradify | Strategy | `course/#/learn/u03` | unit | Strategy |
| BusinessGradify | Marketing | `course/#/learn/u04` | unit | Marketing |
| BusinessGradify | Finance | `course/#/learn/u07` | unit | Finance for Managers |
| BusinessGradify | Operations | `course/#/learn/u05` | unit | Operations and Supply Chain Management |
| BusinessGradify | Organisations | `course/#/learn/u02` | unit | Management and Organisational Behaviour |
| BusinessGradify | Case studies | — (not linked) | none | No case-study unit; one lesson on corporate failures |
| FinanceGradify | Financial reporting | `course/#/learn/u03` | unit | Financial Reporting for Companies |
| FinanceGradify | Valuation | `course/#/learn/u07` | unit | Financial Management (investment appraisal, valuation) |
| FinanceGradify | Management accounting | `course/#/learn/u05` | unit | Management Accounting: Costing |
| FinanceGradify | Corporate finance | `course/#/learn/u07` | unit | Financial Management (financing and the cost of capital) |
| FinanceGradify | Audit and tax | `course/#/learn/u08` | unit | Audit, Assurance and Ethics (tax is unit 9) |
| FinanceGradify | Ethics | `course/#/learn/u08` | unit | Audit, Assurance and Ethics |
| InvestorGradify | How markets work | `course/#/learn/u02` | unit | How Financial Markets Work |
| InvestorGradify | Diversification | `course/#/learn/u05` | unit | Diversification and Portfolio Theory |
| InvestorGradify | Valuation basics | `course/#/learn/u06` | unit | Valuation |
| InvestorGradify | Risk | `course/#/learn/u04` | unit | Risk and Return |
| InvestorGradify | Funds and ETFs | `course/#/learn/u08` | unit | Funds, Index Investing and Costs |
| InvestorGradify | Behaviour | `course/#/learn/u09` | unit | Behavioural Finance |
| MedGradify | Anatomy | `course/` | course | Taught system by system across the course |
| MedGradify | Physiology | `course/` | course | Taught system by system across the course |
| MedGradify | Pharmacology | `course/#/learn/u01` | unit | Foundations of Medical Science (Principles of pharmacology) |
| MedGradify | Pathology | `course/#/learn/u01` | unit | Foundations of Medical Science (Pathological processes) |
| MedGradify | Clinical cases | `course/#/learn/u02` | unit | Clinical Method and Reasoning |
| MedGradify | Data interpretation | `course/#/learn/u02` | unit | Clinical Method and Reasoning (FBC, blood gases, ECG, chest X-ray) |
| DentalGradify | Oral anatomy | `course/#/learn/u01` | unit | Oral and Head and Neck Anatomy |
| DentalGradify | Dental materials | `course/#/learn/u07` | unit | Dental Materials |
| DentalGradify | Periodontology | `course/#/learn/u05` | unit | Periodontology |
| DentalGradify | Restorative dentistry | `course/#/learn/u09` | unit | Restorative Dentistry |
| DentalGradify | Oral medicine | — (not linked) | none | No oral medicine (mucosal disease) unit |
| DentalGradify | Clinical cases | `course/#/learn/u06` | unit | Clinical Method and Reasoning |
| VetGradify | Comparative anatomy | `course/#/learn/u01` | unit | Comparative Anatomy |
| VetGradify | Physiology | `course/#/learn/u02` | unit | Veterinary Physiology |
| VetGradify | Pathology | `course/#/learn/u05` | unit | Veterinary Pathology |
| VetGradify | Pharmacology | `course/#/learn/u07` | unit | Veterinary Pharmacology and Therapeutics |
| VetGradify | Animal husbandry | `course/#/learn/u04` | unit | Animal Husbandry, Nutrition and Welfare |
| VetGradify | Clinical cases | `course/#/learn/u08` | unit | Clinical Method and Reasoning |
| NurseGradify | Clinical skills | `course/#/learn/u06` | unit | Core Nursing Procedures and Clinical Skills |
| NurseGradify | Pharmacology | `course/#/learn/u04` | unit | Pharmacology and Medicines Management |
| NurseGradify | Drug calculations | `/pharmagradify/course/#/learn/u06` | other site | PharmaGradify: Pharmaceutical Calculations (NurseGradify has no calculations unit) |
| NurseGradify | Anatomy and physiology | `course/#/learn/u02` | unit | Human Anatomy and Physiology |
| NurseGradify | Patient safety | `course/` | course | Escalation (units 3, 6, 9), infection control (8) and safeguarding (17) |
| NurseGradify | Placements | `course/#/lesson/u10-27` | lesson | Preparing for an adult nursing placement |
| PharmaGradify | Pharmacology | `course/#/learn/u02` | unit | Pharmacology: How Drugs Act |
| PharmaGradify | Medicinal chemistry | `course/#/learn/u04` | unit | Medicinal and Pharmaceutical Chemistry |
| PharmaGradify | Therapeutics | `course/#/learn/u17` | unit | Clinical Pharmacy and Medicines Optimisation |
| PharmaGradify | Pharmaceutics | `course/#/learn/u05` | unit | Pharmaceutics: Formulation and Dosage Forms |
| PharmaGradify | Law and ethics | `course/#/learn/u16` | unit | Pharmacy Law, Ethics and Governance |
| PharmaGradify | Calculations | `course/#/learn/u06` | unit | Pharmaceutical Calculations |
| HealthGradify | Your body | `course/#/learn/u02` | unit | The Human Body |
| HealthGradify | Sleep | `course/#/learn/u05` | unit | Sleep, Stress and Rest |
| HealthGradify | Nutrition | `course/#/learn/u03` | unit | Nutrition |
| HealthGradify | Movement | `course/#/learn/u04` | unit | Physical Activity |
| HealthGradify | Mental health | `course/#/learn/u06` | unit | Mental Health and Wellbeing |
| HealthGradify | Reading the evidence | `course/#/learn/u09` | unit | Public Health and Epidemiology |
| PsychGradify | Cognitive psychology | `course/#/learn/u03` | unit | Cognitive Psychology |
| PsychGradify | Social psychology | `course/#/learn/u06` | unit | Social Psychology |
| PsychGradify | Developmental | `course/#/learn/u05` | unit | Developmental Psychology |
| PsychGradify | Biological | `course/#/learn/u02` | unit | Biological Psychology and Neuroscience |
| PsychGradify | Research methods | `course/#/learn/u10` | unit | Research Methods |
| PsychGradify | Statistics | `course/#/learn/u11` | unit | Statistics |
| InternshipGradify | Your skills | `app.html#/progress` | tool | Progress |
| InternshipGradify | Applications | `course/#/learn/u05` | unit | CVs and Cover Letters |
| InternshipGradify | Interviews | `course/#/learn/u07` | unit | Interviews and Assessment Centres |
| InternshipGradify | Assessment centres | `course/#/learn/u07` | unit | Interviews and Assessment Centres |
| InternshipGradify | Industries | `course/#/learn/u02` | unit | Exploring Sectors and Roles |
| InternshipGradify | Matching | — (not linked) | none | Internship matching isn't built (the card says coming soon) |
| EngineerGradify | Mechanics | `course/#/learn/u02` | unit | Statics (dynamics and stress are units 3 and 4) |
| EngineerGradify | Materials | `course/#/learn/u05` | unit | Materials Science |
| EngineerGradify | Thermodynamics | `course/#/learn/u06` | unit | Thermodynamics |
| EngineerGradify | Electrical | `course/#/learn/u08` | unit | Electrical Circuits and Electronics |
| EngineerGradify | Maths | `course/#/learn/u01` | unit | Engineering Mathematics |
| EngineerGradify | Design | `course/#/learn/u10` | unit | Design and Manufacturing |
| MathGradify | Algebra | `course/#/learn/u03` | unit | Algebra |
| MathGradify | Calculus | `course/#/learn/u07` | unit | Calculus |
| MathGradify | Statistics | `course/#/learn/u13` | unit | Statistics |
| MathGradify | Probability | `course/#/learn/u12` | unit | Probability |
| MathGradify | Geometry | `course/#/learn/u05` | unit | Geometry |
| MathGradify | Problem solving | `course/#/learn/u26` | unit | Mathematical Reasoning and Research Methods |
| TechGradify · ForgeLab | Programming | `course/#/learn/u02` | unit | Python Programming Fundamentals |
| TechGradify · ForgeLab | Algorithms | `course/#/learn/u04` | unit | Algorithms |
| TechGradify · ForgeLab | Data structures | `course/#/learn/u05` | unit | Data Structures |
| TechGradify · ForgeLab | Computer systems | `course/#/learn/u06` | unit | Data Representation (architecture and operating systems are units 7 and 8) |
| TechGradify · ForgeLab | Networks and data | `course/#/learn/u09` | unit | Networks and the Internet |
| TechGradify · ForgeLab | Software and society | `course/#/learn/u12` | unit | Security, AI and Society |
| SciGradify | Biology | `biology/` | course | Biology course |
| SciGradify | Chemistry | `chemistry/` | course | Chemistry course |
| SciGradify | Physics | `physics/` | course | Physics course |
| SciGradify | The scientific method | `biology/#/learn/u14` | unit | Biology: Experimental Biology and Research Methods |
| SciGradify | Practical skills | `chemistry/#/learn/u19` | unit | Chemistry: Synthetic Chemistry and Laboratory Methods |
| SciGradify | Data | `physics/#/learn/u03` | unit | Physics: Measurement, Experimental Physics and Uncertainty |
| EcoGradify | Ecology | `course/#/learn/u01` | unit | Foundations of Ecology |
| EcoGradify | Biodiversity | `course/#/learn/u06` | unit | Biodiversity and Evolution |
| EcoGradify | Climate | `course/#/learn/u08` | unit | Climate Change |
| EcoGradify | Sustainability | `course/#/learn/u11` | unit | Sustainability and Environmental Policy |
| EcoGradify | Conservation | `course/#/learn/u07` | unit | Conservation Biology |
| EcoGradify | Fieldwork | `course/#/learn/u09` | unit | Field Methods and Statistics |
| SocGradify | Social theory | `course/#/learn/u02` | unit | Classical Sociological Theory |
| SocGradify | Inequality | `course/#/learn/u05` | unit | Social Stratification and Inequality |
| SocGradify | Institutions | `course/#/learn/u08` | unit | Family and Relationships (education and work are units 9 and 13) |
| SocGradify | Research methods | `course/#/learn/u17` | unit | Research Methods |
| SocGradify | Social policy | — (not linked) | none | No social policy unit; policy lessons are spread across other units |
| SocGradify | Globalisation | `course/#/learn/u14` | unit | Globalisation and Social Change |
| HistoryGradify | Historical thinking | `course/#/learn/u01` | unit | Historical Thinking and Methods |
| HistoryGradify | Medieval to Stuart Britain | `course/#/learn/u02` | unit | Medieval Britain (Tudor and Stuart are units 3 and 4) |
| HistoryGradify | Industry and empire | `course/#/learn/u05` | unit | The Industrial Revolution |
| HistoryGradify | Twentieth-century conflict | `course/#/learn/u07` | unit | The First World War |
| HistoryGradify | Britain and the world since 1945 | `course/#/learn/u12` | unit | Britain since 1945 |
| HistoryGradify | Exam technique | `course/#/learn/u18` | unit | Historical Examination and Revision |
| LitGradify | Close reading | `course/#/learn/u01` | unit | Foundations of Literary Study (Close reading) |
| LitGradify | Quotations | `course/#/lesson/u01-17` | lesson | Using quotations as evidence |
| LitGradify | Context | `course/#/lesson/u01-04` | lesson | Text and context |
| LitGradify | Criticism | `course/#/learn/u07` | unit | Literary Theory and Criticism |
| LitGradify | Essay writing | `course/#/learn/u10` | unit | Unseen, Comparative and Essay Writing |
| LitGradify | Literary history | `course/#/learn/u05` | unit | Medieval to Eighteenth-Century Literature |
| LanguageGradify | Vocabulary | — (not linked) | none | The card names a skill, but the site has two languages (Spanish, Japanese); there's no single destination |
| LanguageGradify | Grammar | — (not linked) | none | The card names a skill, but the site has two languages (Spanish, Japanese); there's no single destination |
| LanguageGradify | Listening | — (not linked) | none | The card names a skill, but the site has two languages (Spanish, Japanese); there's no single destination |
| LanguageGradify | Speaking | — (not linked) | none | The card names a skill, but the site has two languages (Spanish, Japanese); there's no single destination |
| LanguageGradify | Writing | — (not linked) | none | The card names a skill, but the site has two languages (Spanish, Japanese); there's no single destination |
| LanguageGradify | Culture | — (not linked) | none | The card names a skill, but the site has two languages (Spanish, Japanese); there's no single destination |
| ArtGradify | Drawing | `course/#/learn/u02` | unit | Drawing |
| ArtGradify | Colour | `course/#/learn/u03` | unit | Colour Theory |
| ArtGradify | Composition | `course/#/learn/u01` | unit | The Visual Language of Art and Design |
| ArtGradify | Art history | `course/#/learn/u08` | unit | Art History: The Ancient World to the Renaissance |
| ArtGradify | Materials | `course/#/learn/u04` | unit | Painting Media and Techniques |
| ArtGradify | Your portfolio | `course/#/lesson/u12-10` | lesson | Building a portfolio |
| MusicGradify | Theory | `course/#/learn/u02` | unit | Scales, Keys and Intervals |
| MusicGradify | Ear training | `course/#/learn/u06` | unit | Ear Training and Musicianship |
| MusicGradify | Your instrument | — (not linked) | none | No instrument technique or practice content |
| MusicGradify | Composition | `course/#/learn/u12` | unit | Composition and Analysis |
| MusicGradify | Music history | `course/#/learn/u09` | unit | Music History: Medieval to Classical |
| MusicGradify | Graded exams | — (not linked) | none | No graded-exam preparation; one lesson on aural tests |
| SportGradify | Physiology | `course/#/learn/u04` | unit | Exercise Physiology: Environment, Adaptation and Populations |
| SportGradify | Training principles | `course/#/learn/u06` | unit | Training Principles and Programme Design |
| SportGradify | Biomechanics | `course/#/learn/u05` | unit | Biomechanics |
| SportGradify | Nutrition | `course/#/learn/u08` | unit | Sport and Exercise Nutrition |
| SportGradify | Psychology | `course/#/learn/u09` | unit | Motivation, Emotion and Wellbeing |
| SportGradify | Coaching | `course/#/learn/u10` | unit | Skill Acquisition and Coaching |
| CreateGradify | Ideation | `course/#/learn/u03` | unit | Ideation Methods |
| CreateGradify | Design thinking | `course/#/learn/u01` | unit | Foundations of Design Thinking |
| CreateGradify | Problem framing | `course/#/learn/u05` | unit | Defining Problems |
| CreateGradify | Prototyping | `course/#/learn/u06` | unit | Prototyping, Testing and Iteration |
| CreateGradify | Feedback | `course/#/lesson/u12-03` | lesson | Giving and receiving critique |
| CreateGradify | Creative habits | `course/#/learn/u02` | unit | The Psychology of Creativity |
