// The learn library: a crawlable page for each lesson that is worth a search result on its own.
//   learn/                          every subject in the library
//   learn/<course>/                 that subject's lessons, by unit
//   learn/<course>/<lesson>/        one lesson: the answer first, the full notes (the same renderer as the live lesson,
//                                   kit/course/notes.js lessonHtml), its diagram, a worked example, common mistakes,
//                                   practice questions with explanations, key terms, sources, and a way into the
//                                   interactive lesson
// The lessons themselves live in the course apps behind hash URLs (/scigradify/biology/#/lesson/u04-03), which search
// engines don't index as separate pages. These pages put the same, already-written content where search can find it.
//
// Quality floor (standalone value, never thin pages made to catch keywords): a lesson gets a page only if it has
//   - at least MIN_EXPLAIN words of explanation (lead, paragraphs, lists, key point)
//   - at least MIN_PAGE words a reader sees (with the worked example, mistakes, diagram captions and practice)
//   - a worked example or a diagram, a common mistake, and at least MIN_QUESTIONS practice questions with explanations
// Lessons below the floor go on the enrichment backlog (docs/growth/CONTENT-BACKLOG.md) with what each one is missing.
//
// Pages are released in waves, so a new section is indexed at a pace that can be watched in Search Console:
// WAVES lists the courses in each wave; RELEASED says which waves are built.
import { readFileSync } from "node:fs";
import { parseNotes, lessonHtml, inline } from "../../kit/course/notes.js";
import { esc, related, ORIGIN, fitDesc } from "./shell.mjs";
import { actionCard } from "../../kit/core/action-card.js";

const root = new URL("../../", import.meta.url);
const json = (p) => JSON.parse(readFileSync(new URL(p, root), "utf8"));
const DIAGRAMS = json("kit/diagrams/manifest.json");

export const WAVES = {
  1: ["biology", "chemistry", "physics", "maths", "psychology"],
  2: ["medicine", "sociology", "history", "literature", "ecology"],
  3: ["business", "finance", "engineering", "sport", "music", "art", "health", "veterinary", "dentistry"],
};
export const RELEASED = [1];
export const MIN_EXPLAIN = 150, MIN_PAGE = 300, MIN_QUESTIONS = 3;

const plain = (s) => String(s ?? "").replace(/\*\*|`|\^\{|_\{|\{|\}/g, "").replace(/\s+/g, " ").trim();
const words = (s) => plain(s).split(" ").filter(Boolean).length;
const deep = (o) => (typeof o === "string" ? words(o) : Array.isArray(o) ? o.reduce((m, x) => m + deep(x), 0) : o && typeof o === "object" ? Object.entries(o).reduce((m, [k, v]) => m + (k === "t" || k === "id" ? 0 : deep(v)), 0) : 0);
export const slugify = (s) => plain(s).toLowerCase().replace(/&/g, "and").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);
const SMALL = new Set(["a", "an", "and", "as", "at", "by", "for", "in", "of", "on", "or", "the", "to", "vs", "with", "from", "into"]);
/** "DNA replication and the cell cycle" → "DNA Replication and the Cell Cycle" (acronyms and symbols kept) */
export const titleCase = (s) => plain(s).split(" ").map((w, i) => (i && SMALL.has(w.toLowerCase()) ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1))).join(" ");
const firstSentence = (s) => (plain(s).match(/^.{20,240}?[.!?](\s|$)/)?.[0] || plain(s).slice(0, 200)).trim();
// a stable shuffle, so pages don't change between builds
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** the floor, measured on what a reader of the page sees; returns what's missing ([] = passes) */
export function measure(L) {
  const t = new Set(L.blocks.map((b) => b.t)), qs = L.mcq.filter((q) => q.why);
  const explain = words(L.lead) + deep(L.blocks.filter((b) => ["p", "ul", "key", "h", "eq"].includes(b.t)));
  const page = explain + deep(L.blocks.filter((b) => ["ex", "pit"].includes(b.t))) + L.blocks.filter((b) => b.t === "dg").reduce((m, b) => m + words(DIAGRAMS[b.id]?.caption), 0) + qs.reduce((m, q) => m + words(q.q) + words(q.right) + words(q.why), 0);
  const missing = [];
  if (explain < MIN_EXPLAIN) missing.push(`${MIN_EXPLAIN - explain} more words of explanation`);
  if (page < MIN_PAGE) missing.push(`${MIN_PAGE - page} more words in all`);
  if (!t.has("ex") && !t.has("dg")) missing.push("a worked example or a diagram");
  if (!t.has("pit")) missing.push("a common mistake");
  if (qs.length < MIN_QUESTIONS) missing.push(`${MIN_QUESTIONS - qs.length} more practice question(s) with an explanation`);
  return { explain, page, missing };
}

/** every lesson of the courses in `slugs`, parsed, with its unit and course */
export async function lessonsOf(slugs) {
  const cat = json("kit/api/v1/catalogue.json"), out = [];
  for (const c of cat.courses.filter((x) => slugs.includes(x.slug) && ["live", "beta"].includes(x.status))) {
    const api = json(`kit/api/v1/courses/${c.slug}.json`);
    for (const u of api.units.filter((x) => x.written)) {
      let parsed; try { parsed = parseNotes((await import(new URL(`kit/courses/${c.slug}/notes/${u.id}.js`, root))).default); } catch { continue; }
      u.lessons.forEach((meta, i) => { const L = parsed.find((p) => p.title === meta.title) || parsed[i]; if (L) out.push({ c: { slug: c.slug, name: api.name, page: c.page }, u: { id: u.id, title: u.title }, id: meta.id, L }); });
    }
  }
  return out;
}

// a diagram as a static figure: the wide drawing, the narrow one on phones, its own alt text and caption
function figure(id) {
  const d = DIAGRAMS[id]; if (!d) return "";
  const size = (v) => { try { const m = readFileSync(new URL(`kit/diagrams/svg/${id}.${v}.svg`, root), "utf8").match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/); return m ? [Math.round(+m[1]), Math.round(+m[2])] : null; } catch { return null; } };
  const w = size("wide"), n = size("narrow"); if (!w) return "";
  return `<figure class="lr-fig">${n ? `<picture><source media="(max-width: 640px)" srcset="/kit/diagrams/svg/${id}.narrow.svg" width="${n[0]}" height="${n[1]}">` : ""}<img src="/kit/diagrams/svg/${id}.wide.svg" alt="${esc(d.alt || d.title)}" width="${w[0]}" height="${w[1]}" loading="lazy" decoding="async">${n ? "</picture>" : ""}<figcaption><b>${esc(d.title)}.</b> ${esc(d.caption || "")}</figcaption></figure>`;
}

function practice(L, id) {
  const qs = L.mcq.filter((q) => q.why);
  return `<section id="practice"><h2>Practice questions</h2><p>Answer each one in your head before you open it: recalling beats rereading.</p><ol class="lr-qs">${qs.map((q, i) => {
    const opts = [...q.wrong]; opts.splice(hash(`${id}${i}`) % (opts.length + 1), 0, q.right);
    return `<li><details class="self-test"><summary>${inline(q.q)}<ul class="lr-opts">${opts.map((o) => `<li>${inline(o)}</li>`).join("")}</ul><span class="reveal">Show the answer</span></summary><p><b>Answer: ${inline(q.right)}.</b> ${inline(q.why)}</p></details></li>`;
  }).join("")}</ol></section>`;
}

/** the library: pages for released waves, and the backlog of lessons below the floor */
export async function learnLibrary() {
  const slugs = RELEASED.flatMap((w) => WAVES[w]);
  const all = await lessonsOf(slugs), pages = [], backlog = [], byCourse = new Map(), titleCount = new Map();
  const inCourse = new Map();
  for (const x of all) { const m = measure(x.L); x.m = m; if (m.missing.length) backlog.push(x); else { const k = titleCase(x.L.title).toLowerCase(), kc = `${x.c.slug}:${k}`; titleCount.set(k, (titleCount.get(k) || 0) + 1); inCourse.set(kc, (inCourse.get(kc) || 0) + 1); } }
  const live = all.filter((x) => !x.m.missing.length), used = new Map();
  // the same lesson title twice in one course (taught again in a later unit, from another angle): each names its unit
  for (const x of live) x.repeat = inCourse.get(`${x.c.slug}:${titleCase(x.L.title).toLowerCase()}`) > 1;
  for (const x of live) {
    let s = slugify(x.repeat ? `${x.L.title} ${x.u.title}` : x.L.title) || x.id; if (used.has(`${x.c.slug}/${s}`)) s = `${s}-${x.id}`; used.set(`${x.c.slug}/${s}`, true);
    x.path = `learn/${x.c.slug}/${s}/index.html`; x.href = `/learn/${x.c.slug}/${s}/`;
    if (!byCourse.has(x.c.slug)) byCourse.set(x.c.slug, []); byCourse.get(x.c.slug).push(x);
  }
  const lessonByTitle = new Map(live.map((x) => [`${x.c.slug}:${x.L.title.toLowerCase()}`, x]));
  for (const x of live) {
    const { L, c, u } = x, T = titleCase(L.title), dg = L.blocks.filter((b) => b.t === "dg").map((b) => b.id).filter((id) => DIAGRAMS[id]);
    const name = x.repeat ? `${T} in ${titleCase(u.title)}` : titleCount.get(T.toLowerCase()) > 1 ? `${T} (${c.name})` : T;
    const title = [`${name} Explained: Notes, Diagram & Practice | Gradify`, `${name} Explained: Notes, Examples & Practice | Gradify`, `${name} Explained, with Practice Questions | Gradify`, `${name} Explained | Gradify`, `${name} | Gradify`].filter((t) => dg.length || !/Diagram/.test(t)).find((t) => t.length <= 60) || `${name} | Gradify`;
    const key = L.blocks.find((b) => b.t === "key")?.x, answer = key || L.lead;
    const qn = L.mcq.filter((q) => q.why).length;
    // the lesson's own opening, then what the page holds; the subject (and unit, for a repeated title) keeps it unique
    const description = fitDesc(`${firstSentence(L.lead)} A free ${c.name.toLowerCase()} lesson${x.repeat ? ` on ${u.title.toLowerCase()}` : ""} with ${dg.length ? "a diagram, " : ""}a worked example, common mistakes and ${qn} practice questions.`);
    const checked = L.sources.map((s) => s.date).filter((d) => /^\d{4}-\d{2}(-\d{2})?$/.test(d) && d <= new Date().toISOString().slice(0, 10)).sort().at(-1);
    const mins = Math.max(2, Math.round(x.m.page / 200));
    // the notes, as in the live lesson, with sections at h2, the key point moved to the top, diagrams drawn statically
    // and interactive slots (which need the app) pointing to it instead
    let notes = lessonHtml({ ...L, blocks: L.blocks.filter((b) => !(key && b.t === "key" && b.x === key)) })
      .replace(/<h3>/g, "<h2>").replace(/<\/h3>/g, "</h2>")
      .replace(/<figure class="vx" data-dg="([^"]+)" hidden><\/figure>/g, (_, id) => figure(id))
      .replace(/<div class="co-ixslot" data-ix="[^"]*"><\/div>/g, "");
    const siblings = byCourse.get(c.slug).filter((y) => y.u.id === u.id), i = siblings.indexOf(x), prev = siblings[i - 1], next = siblings[i + 1];
    const pre = L.prereq.map((t) => lessonByTitle.get(`${c.slug}:${t.toLowerCase()}`)).filter(Boolean).slice(0, 4);
    const lessonApp = `${c.page}#/lesson/${x.id}`;
    const body = `<h1>${esc(T)}</h1>
    <p class="answer">${inline(answer)}</p>
    <p class="lr-meta">${esc(c.name)} · ${esc(u.title)} · about ${mins} minutes${checked ? ` · sources checked ${esc(checked)}` : ""}</p>
    ${L.objectives?.length ? `<section class="lr-obj"><h2>What you'll be able to do</h2><ul>${L.objectives.map((o) => `<li>${inline(o)}</li>`).join("")}</ul></section>` : ""}
    <div class="lr-notes">${notes}</div>
    ${L.summary?.length ? `<p class="core-rule"><b>In ${L.summary.length} lines:</b> ${L.summary.map((s) => inline(s)).join(" ")}</p>` : ""}
    ${practice(L, x.id)}
    ${L.terms.length ? `<section id="key-terms"><h2>Key terms</h2><dl class="lr-terms">${L.terms.map(([t, d]) => `<dt>${inline(t)}</dt><dd>${inline(d)}</dd>`).join("")}</dl></section>` : ""}
    ${actionCard({ tag: "aside", heading: "h2", cls: "cta-box", kicker: "Your next step", title: "Keep it, don't just read it",
      why: "Open the interactive lesson to answer check questions at three levels, add its flashcards to your revision and have them come back just before you'd forget. Free, no card.",
      actions: [{ label: "Open the interactive lesson", icon: "cap", href: lessonApp, attrs: 'data-cta="learn"' }, { label: "Make flashcards from your own notes", icon: "upload", href: "/features/notes-studio/", attrs: 'data-cta="learn"', soft: true }] })}
    ${L.sources.length ? `<section id="sources"><h2>Sources</h2><ul class="lr-src">${L.sources.map((s) => `<li>${esc(plain(s.cite))}</li>`).join("")}</ul><p class="lr-note">Written and checked by Gradify against these sources. Independent study material: not affiliated with or endorsed by any exam board.</p></section>` : ""}
    <nav class="unit-nav" aria-label="Next and previous lessons">${prev ? `<a href="${prev.href}">← ${esc(titleCase(prev.L.title))}</a>` : "<span></span>"}${next ? `<a href="${next.href}">${esc(titleCase(next.L.title))} →</a>` : "<span></span>"}</nav>
    ${related("Keep going", [...pre.map((y) => [y.href.slice(1), `Before this: ${titleCase(y.L.title)}`]), [`topics/${c.slug}/${u.id}/`, `${u.title}: the whole topic`, "every lesson, a quick quiz and a mind map"], [`learn/${c.slug}/`, `Every ${c.name.toLowerCase()} lesson explained`]])}`;
    pages.push({
      // used instead when the description matches another page's (scripts/build-seo.mjs checks across the whole site)
      altDescription: fitDesc(`${name}: a free ${c.name.toLowerCase()} lesson on ${u.title.toLowerCase()}, with ${dg.length ? "a diagram, " : ""}a worked example, common mistakes and ${qn} practice questions with answers.`),
      path: x.path, title, description, crumbs: [["Learn", "learn/"], [c.name, `learn/${c.slug}/`], [T, x.path.replace(/index\.html$/, "")]], ogType: "article", cta: false,
      ...(checked ? { updated: checked, updatedLabel: "Sources last checked" } : {}), body,
      schema: [{ "@type": "LearningResource", name: T, description, url: `${ORIGIN}${x.href}`, learningResourceType: "Lesson", inLanguage: "en-GB", isAccessibleForFree: true,
        teaches: plain(answer),
        isPartOf: { "@type": "Course", name: c.name, url: `${ORIGIN}${c.page}` }, publisher: { "@id": `${ORIGIN}/#org` }, author: { "@id": `${ORIGIN}/#org` },
        ...(dg.length ? { image: dg.map((id) => `${ORIGIN}/kit/diagrams/svg/${id}.wide.svg`) } : {}),
        ...(L.sources.length ? { citation: L.sources.map((s) => plain(s.cite)) } : {}), ...(checked ? { dateModified: checked } : {}) }],
    });
  }
  // a hub per course, and the library hub
  for (const [slug, list] of byCourse) {
    const c = list[0].c, units = [...new Set(list.map((x) => x.u.title))];
    pages.push({
      path: `learn/${slug}/index.html`, title: `${c.name} Explained: ${list.length} Free Lessons with Practice | Gradify`,
      description: `${list.length} ${c.name.toLowerCase()} lessons explained, each with a worked example or diagram, common mistakes and practice questions with answers. Free.`,
      crumbs: [["Learn", "learn/"], [c.name, `learn/${slug}/`]], ogType: "website",
      body: `<h1>${esc(c.name)} explained</h1><p class="answer">${list.length} ${esc(c.name.toLowerCase())} lessons you can read here in full, each with a worked example or a diagram, the mistakes students make and practice questions with explanations. To track progress and revise with flashcards, open <a href="${esc(c.page)}">the free ${esc(c.name.toLowerCase())} course</a>.</p>
      ${units.map((t) => `<h2>${esc(t)}</h2><ul class="hub-list">${list.filter((x) => x.u.title === t).map((x) => `<li><a href="${x.href}">${esc(titleCase(x.L.title))}</a> <span>${esc(firstSentence(x.L.lead))}</span></li>`).join("")}</ul>`).join("")}`,
      schema: [{ "@type": "CollectionPage", name: `${c.name} explained`, url: `${ORIGIN}/learn/${slug}/` }],
    });
  }
  pages.push({
    path: "learn/index.html", title: "Learn: Free Lessons Explained, with Practice | Gradify",
    description: `${live.length.toLocaleString("en-GB")} free lessons explained in full, with diagrams, worked examples, common mistakes and practice questions, in ${byCourse.size} subjects.`,
    crumbs: [["Learn", "learn/"]], ogType: "website",
    body: `<h1>Learn</h1><p class="answer">Free lessons you can read in full: each explains one idea, shows it worked through or drawn, lists the mistakes students make, and ends with practice questions and explanations.</p>
    <ul class="hub-list">${[...byCourse].map(([slug, list]) => `<li><a href="/learn/${slug}/">${esc(list[0].c.name)}</a> <span>${list.length} lessons</span></li>`).join("")}</ul>
    ${related("More ways to revise", [["topics/", "Revision topics"], ["questions/", "Practice questions"], ["features/", "Every Gradify feature"]])}`,
    schema: [{ "@type": "CollectionPage", name: "Learn", url: `${ORIGIN}/learn/` }],
  });
  return { pages, live, backlog, all };
}

/** map from a lesson's app URL to its learn page, so topic pages can link to the readable version */
export const learnLinks = (live) => new Map(live.map((x) => [`${x.c.page}#/lesson/${x.id}`, x.href]));

/** the enrichment backlog, as Markdown: what each lesson in the released and next waves needs to earn a page */
export function backlogMd(backlog) {
  const by = new Map(); for (const x of backlog) { if (!by.has(x.c.name)) by.set(x.c.name, []); by.get(x.c.name).push(x); }
  const freq = new Map(); for (const x of backlog) for (const m of x.m.missing) { const k = m.replace(/^\d+ /, "N ").replace(/\d+ more/, "N more"); freq.set(k, (freq.get(k) || 0) + 1); }
  return `# Content backlog: lessons that need more before they get a search page

Generated by \`node scripts/build-seo.mjs\`. A lesson gets a page in the learn library (\`/learn/\`) only when it clears the quality floor in \`scripts/seo/learn.mjs\`: ${MIN_EXPLAIN}+ words of explanation, ${MIN_PAGE}+ words in all, a worked example or diagram, a common mistake and ${MIN_QUESTIONS}+ practice questions with explanations. These lessons are useful inside the course; they just don't yet stand on their own as a search result.

Released waves: ${RELEASED.join(", ")} (${RELEASED.flatMap((w) => WAVES[w]).join(", ")}). ${backlog.length} lessons below the floor.

## What's most often missing

${[...freq].sort((a, b) => b[1] - a[1]).map(([k, n]) => `- ${n} × ${k}`).join("\n")}

${[...by].map(([name, list]) => `## ${name} (${list.length})

| Lesson | Unit | Missing |
|---|---|---|
${list.map((x) => `| ${x.L.title} | ${x.u.title} | ${x.m.missing.join("; ")} |`).join("\n")}`).join("\n\n")}
`;
}
