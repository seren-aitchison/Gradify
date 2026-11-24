// What scripts/build-seo.mjs owns: these folders are rewritten whole, and these root files are written by it.
// Shared with scripts/build-sitemap.mjs; scripts/build-site.mjs publishes the same list (tests/seo.test.mjs checks).
export const SEO_FOLDERS = ["tools", "guides", "compare", "glossary", "templates", "topics", "study-plan", "pdf-to-flashcards", "lecture-notes-to-mind-map", "notes-to-cheat-sheet",
  "checklists", "vs", "questions", "exam-traps", "exam-boards", "changelog", "youtube-to-flashcards", "notes-to-study-chant", ".well-known", "terms", "research", "lessons", "features"];
export const SEO_FILES = ["about.html", "ambassadors.html", "site-map.html", "llms.txt", "llms-full.txt", "feed.xml", "send.html"];
// pages it writes inside sub-site folders (published with the sub-site; listed in the sitemap here)
export const SEO_SUBSITE_FILES = ["investorgradify/tools/index.html", "creategradify/briefs/index.html"];
export const INDEXNOW_KEY = "e0ae881afb2339548688d1f7ff91a66c";
