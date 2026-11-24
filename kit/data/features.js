// Every Gradify feature: the one list the homepage showcase (assets/features.js) and the feature pages
// (getgradify.com/features/<slug>/, scripts/seo/features.mjs) are both made from. Add a feature here, and its
// public page in scripts/seo/features.mjs (FEATURE_PAGES): tests/seo-registry.test.mjs fails until both exist.
// No DOM here, so Node can read it.
// where: web, app or both. href: where it works now (the app, a course), which "Open it" goes to.
// try: a LifeOS view or element the preview also shows (the preview is hidden on the homepage for now).
// c: the category's colour; c2: the second colour of its glass tile's gradient
export const CATS = {
  learn: { name: "Learn", c: "4641ff", c2: "8b3dff" },
  create: { name: "Notes and creation", c: "f055dd", c2: "ff6aa8" },
  practise: { name: "Practise", c: "ff5a4d", c2: "ff5600" },
  progress: { name: "Progress and rewards", c: "ffc002", c2: "ff8a00" },
  people: { name: "People", c: "1fae8c", c2: "3c78d8" },
};
export const FEATURES = [
  // learn
  { n: "Online courses", cat: "learn", i: "cap", where: "both", d: "Full courses on every Gradify site, with interim quizzes along the way and a verified credential at the end.", size: 3, live: true, href: "#find" },
  { n: "Explainer videos", cat: "learn", i: "sparkles", where: "both", d: "Short, high-quality explainers for every topic, edited to keep attention.", try: "capture", size: 2, live: true, href: "app.html#/tools/explain" },
  { n: "Tutorials and simulations", cat: "learn", i: "atom", where: "web", d: "Interactive tutorials and digital simulations, from a beating heart to a trading floor.", size: 2, live: true, href: "scigradify/physics/#/practice" },
  { n: "Chant podcasts", cat: "learn", i: "music", where: "both", d: "Repetition and chant episodes that make key facts stick on a walk or a commute.", try: "capture", size: 2, live: true, href: "app.html#/tools/podcast" },
  { n: "Audio questions", cat: "learn", i: "bell", where: "app", d: "Questions read aloud, a pause to answer, then the answer. Hands-free revision.", try: "capture", size: 1, live: true, href: "app.html#/tools/audio" },
  { n: "Story posters", cat: "learn", i: "palette", where: "both", d: "Posters that tell a topic as a picture story, made in Figma and Procreate. Interactive versions hide key words as clozes.", try: "capture", size: 2, live: true, href: "app.html#/tools/poster" },
  { n: "Dictionaries and thesauruses", cat: "learn", i: "book", where: "web", d: "Subject dictionaries for every site, with a thesaurus for writing.", size: 1, live: true, href: "app.html#/tools/dictionary" },
  { n: "Key-terms sheets", cat: "learn", i: "checklist", where: "both", d: "A key-terms sheet for every mini topic, ready to print.", try: "capture", size: 1, live: true, href: "app.html#/tools/sheets" },
  { n: "Bonus facts and boosting", cat: "learn", i: "star", where: "app", d: "Bonus facts pop up as you learn, and key facts get boosted so you see them more.", try: "study", size: 1, live: true, href: "app.html#/tools/feed" },
  // notes and creation
  { n: "Notes Studio", cat: "create", i: "upload", where: "both", d: "Turn a PDF of your notes into clean notes, flashcards, a spidermap, a cheat sheet, a video and a song.", try: "capture", size: 3, live: true, href: "app.html#/new" },
  { n: "Notebook", cat: "create", i: "feather", where: "both", d: "A personal notebook like RemNote or Notion: linked notes, customisable pages, and any line can become a flashcard.", size: 2, live: true, href: "app.html#/tools/notebook" },
  { n: "Handwriting to text", cat: "create", i: "pencil", where: "app", d: "Write by hand on a tablet or phone and get searchable text.", size: 1, live: true, href: "app.html#/tools/handwriting" },
  { n: "Notes to songs", cat: "create", i: "music", where: "app", d: "Any notes become a catchy song or chant.", try: "capture", size: 2, live: true, href: "app.html#/tools/convert" },
  { n: "YouTube to notes", cat: "create", i: "share", where: "web", d: "Paste a YouTube link or its transcript and get notes in chapters, flashcards, a mind map and a chat about the video.", size: 2, live: true, href: "app.html#/tools/youtube" },
  { n: "Spidermaps", cat: "create", i: "route", where: "both", d: "Every fact you learn joins your spidermap, with acronyms linking the terms.", try: "capture", size: 2, live: true, href: "app.html#/tools/map/new" },
  { n: "Downloadable resources", cat: "create", i: "upload", where: "web", d: "Notes, posters and sheets to download and print.", try: "capture", size: 1, live: true, href: "app.html#/tools/downloads" },
  // practise
  { n: "Flashcard feed", cat: "practise", i: "layers", where: "both", d: "A constant-scroll feed of flashcards, mixed with study hacks and inspiring reminders. Zoom out to see your cards as a Pinterest-style board.", try: "study", size: 3, live: true, href: "app.html#/tools/feed" },
  { n: "Confidence ratings", cat: "practise", i: "heartbeat", where: "app", d: "Rate how well you knew every card, get feedback on each, and it comes back at the right time.", try: "study", size: 2, live: true, href: "app.html#/study" },
  { n: "Adaptive difficulty", plan: "plus", cat: "practise", i: "sparkles", where: "both", d: "Questions get harder or easier as you go: two right in a row and they step up, one wrong and they step down.", size: 1, live: true, href: "app.html#/tools/quiz/adaptive" },
  { n: "Timed quiz mode", plan: "plus", cat: "practise", i: "flame", where: "app", d: "Practise against the clock, like the real exam.", try: "study", size: 1, live: true, href: "app.html#/tools/quiz/timed" },
  { n: "Question bank", plan: "plus", cat: "practise", i: "board", where: "web", d: "A bank of practice questions with marked feedback on every answer.", size: 2, live: true, href: "app.html#/tools/quiz/bank" },
  { n: "Key-term games", cat: "practise", i: "trophy", where: "both", d: "Quick games for learning the key terms of any topic.", size: 1, live: true, href: "app.html#/tools/games" },
  { n: "Interim quizzes", cat: "practise", i: "checklist", where: "web", d: "Short quizzes through every course, so you know where you stand.", size: 1, live: true, href: "scigradify/biology/#/learn" },
  // progress and rewards
  { n: "Gradify Tree", cat: "progress", i: "leaf", where: "app", d: "A tree that grows with your learning, with a branch for every subject.", try: "tree", size: 3, live: true, href: "app.html#/progress" },
  { n: "Heatmap", cat: "progress", i: "calendar", where: "both", d: "Every day of learning across every Gradify site, in one heatmap.", try: "life-heat", size: 2, live: true, href: "app.html#/progress" },
  { n: "XP and levels", cat: "progress", i: "star", where: "both", d: "Earn XP for everything you learn and level up.", try: "command", size: 2, live: true, href: "app.html#/progress" },
  { n: "Streaks", cat: "progress", i: "flame", where: "both", d: "Daily streaks, and streaks of correct answers.", try: "life-heat", size: 1, live: true, href: "app.html#/progress" },
  { n: "Challenges", cat: "progress", i: "trophy", where: "app", d: "Daily and weekly challenges across your Gradify sites.", try: "view-community", size: 1, live: true, href: "app.html#/progress" },
  { n: "Reward scheme", cat: "progress", i: "award", where: "both", d: "Rewards for milestones like 1,000 questions answered or a 100-day streak.", size: 2, live: true, href: "app.html#/progress" },
  { n: "Projects for XP", cat: "progress", i: "briefcase", where: "web", d: "Real projects to complete for XP and your portfolio.", size: 1, live: true, href: "app.html#/tools/projects" },
  { n: "Smart reminders", plan: "plus", cat: "progress", i: "bell", where: "app", d: "Reminders that know your deadlines and your streak.", try: "view-settings", size: 1, live: true, href: "app.html#/account" },
  { n: "Time blocking", cat: "progress", i: "calendar", where: "both", d: "Plan your week in blocks, and let Gradify auto-plan your revision.", try: "plan-cal", size: 3, live: true, href: "app.html#/plan" },
  // people
  { n: "Gradify AI", plan: "pro", cat: "people", i: "sparkles", where: "both", d: "An AI chat in the corner of every page, that knows your progress on every site.", try: "ai", size: 3, live: true, href: "app.html#/ai" },
  { n: "Tutors", cat: "people", i: "people", where: "web", d: "Book a tutor for any subject.", size: 2, live: true, href: "app.html#/community/tutors" },
  { n: "Student mentors", cat: "people", i: "people", where: "web", d: "Get advice from students a year or two ahead of you.", size: 1, live: true, href: "app.html#/community/mentors" },
  { n: "Study groups", cat: "people", i: "people", where: "both", d: "Virtual study groups with shared sessions and quizzes.", try: "view-community", size: 2, live: true, href: "app.html#/community/groups" },
  { n: "Friends and school leaderboards", cat: "people", i: "trophy", where: "app", d: "Follow friends and see your school's leaderboard. Always optional.", try: "view-community", size: 2, live: true, href: "app.html#/community/friends" },
  { n: "Community chats", cat: "people", i: "share", where: "web", d: "Chats for every subject and site.", size: 1, live: true, href: "app.html#/community/chats" },
  { n: "InternshipGradify", cat: "people", i: "badge", where: "web", d: "Internships and work experience, matched to what you've learned.", size: 2, live: true, href: "app.html#/community/internships" },
];

/** a feature's page address: "Notes Studio" → "notes-studio" */
export const featureSlug = (f) => (typeof f === "string" ? f : f.n).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
