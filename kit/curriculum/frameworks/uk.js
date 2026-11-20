// Layer 2, United Kingdom: the four nations' school systems and their stages, placed on the neutral level bands
// (kit/curriculum/schema.js BANDS). System ids are those of kit/curriculum/coverage.js SYSTEMS, so a course's coverage
// claims and the knowledge engine name systems the same way. Qualification keys are coverage.js QUALIFICATIONS.
//
// The four nations are separate education systems. Their year names, ages, stages and qualifications differ, and
// nothing here treats one as another. Ages are the usual ages during the school year; check a learner's own school.
// Status: written from the published structures as known up to 2025–26; not yet checked by a reviewer in each nation.

const years = (from, to, f) => Array.from({ length: to - from + 1 }, (_, i) => f(from + i));

export const SYSTEMS = [
  {
    id: "uk-eng", country: "United Kingdom", name: "England", authority: "Department for Education",
    curriculum: "National curriculum in England (2014), with the Early Years Foundation Stage before Year 1",
    stages: [
      { id: "reception", name: "Reception", group: "Early Years Foundation Stage", band: "early", ages: [4, 5] },
      ...years(1, 2, (n) => ({ id: `y${n}`, name: `Year ${n}`, group: "Key Stage 1", band: "primary", ages: [n + 4, n + 5] })),
      ...years(3, 6, (n) => ({ id: `y${n}`, name: `Year ${n}`, group: "Key Stage 2", band: "primary", ages: [n + 4, n + 5] })),
      ...years(7, 9, (n) => ({ id: `y${n}`, name: `Year ${n}`, group: "Key Stage 3", band: "lower-secondary", ages: [n + 4, n + 5] })),
      ...years(10, 11, (n) => ({ id: `y${n}`, name: `Year ${n}`, group: "Key Stage 4", band: "upper-secondary", ages: [n + 4, n + 5], qualifications: n === 11 ? ["gcse"] : [] })),
      ...years(12, 13, (n) => ({ id: `y${n}`, name: `Year ${n}`, group: "16 to 19 (sixth form or college)", band: "post-16", ages: [n + 4, n + 5], qualifications: n === 13 ? ["a-level"] : [] })),
    ],
  },
  {
    id: "uk-wal", country: "United Kingdom", name: "Wales", authority: "Welsh Government",
    curriculum: "Curriculum for Wales (from 2022), described by progression steps rather than key stages",
    note: "Progression steps 1 to 5 relate broadly to ages 5, 8, 11, 14 and 16; they are reference points, not year groups. GCSEs in Wales are WJEC's, regulated by Qualifications Wales, and differ from England's.",
    stages: [
      { id: "reception", name: "Reception", group: "Primary", band: "early", ages: [4, 5] },
      ...years(1, 6, (n) => ({ id: `y${n}`, name: `Year ${n}`, group: "Primary", band: "primary", ages: [n + 4, n + 5] })),
      ...years(7, 9, (n) => ({ id: `y${n}`, name: `Year ${n}`, group: "Secondary", band: "lower-secondary", ages: [n + 4, n + 5] })),
      ...years(10, 11, (n) => ({ id: `y${n}`, name: `Year ${n}`, group: "Secondary", band: "upper-secondary", ages: [n + 4, n + 5], qualifications: n === 11 ? ["gcse"] : [] })),
      ...years(12, 13, (n) => ({ id: `y${n}`, name: `Year ${n}`, group: "Sixth form or college", band: "post-16", ages: [n + 4, n + 5], qualifications: n === 13 ? ["a-level"] : [] })),
    ],
  },
  {
    id: "uk-sco", country: "United Kingdom", name: "Scotland", authority: "Scottish Government (Education Scotland; SQA for qualifications)",
    curriculum: "Curriculum for Excellence: Early, First, Second, Third and Fourth levels, then the senior phase",
    note: "Children usually start P1 between about 4½ and 5½, so ages run slightly younger than the same-numbered year elsewhere. CfE levels are reached at different times by different learners.",
    stages: [
      ...years(1, 7, (n) => ({ id: `p${n}`, name: `Primary ${n} (P${n})`, group: n === 1 ? "Early level" : n <= 4 ? "First level" : "Second level", band: "primary", ages: [n + 4, n + 5] })),
      ...years(1, 3, (n) => ({ id: `s${n}`, name: `Secondary ${n} (S${n})`, group: "Third and fourth levels (broad general education)", band: "lower-secondary", ages: [n + 11, n + 12] })),
      { id: "s4", name: "Secondary 4 (S4)", group: "Senior phase", band: "upper-secondary", ages: [15, 16], qualifications: ["nat5"] },
      { id: "s5", name: "Secondary 5 (S5)", group: "Senior phase", band: "post-16", ages: [16, 17], qualifications: ["higher"] },
      { id: "s6", name: "Secondary 6 (S6)", group: "Senior phase", band: "post-16", ages: [17, 18], qualifications: ["higher"] },
    ],
  },
  {
    id: "uk-ni", country: "United Kingdom", name: "Northern Ireland", authority: "Department of Education (Northern Ireland); CCEA",
    curriculum: "The Northern Ireland Curriculum: Foundation Stage, Key Stages 1 to 4",
    note: "Primary years are P1 to P7 and post-primary years are Year 8 to Year 14, so the numbering differs from England's. Schools may enter GCSEs and A levels from CCEA or from boards based in England.",
    stages: [
      ...years(1, 7, (n) => ({ id: `p${n}`, name: `Primary ${n} (P${n})`, group: n <= 2 ? "Foundation Stage" : n <= 4 ? "Key Stage 1" : "Key Stage 2", band: n === 1 ? "early" : "primary", ages: [n + 3, n + 4] })),
      ...years(8, 10, (n) => ({ id: `y${n}`, name: `Year ${n}`, group: "Key Stage 3", band: "lower-secondary", ages: [n + 3, n + 4] })),
      ...years(11, 12, (n) => ({ id: `y${n}`, name: `Year ${n}`, group: "Key Stage 4", band: "upper-secondary", ages: [n + 3, n + 4], qualifications: n === 12 ? ["gcse"] : [] })),
      ...years(13, 14, (n) => ({ id: `y${n}`, name: `Year ${n}`, group: "Post-16", band: "post-16", ages: [n + 3, n + 4], qualifications: n === 14 ? ["a-level"] : [] })),
    ],
  },
];
