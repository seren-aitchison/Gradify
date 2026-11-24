// Landing pages and hubs: YouTube to flashcards, notes to a study chant, the exam boards and qualifications hub (only
// the claims kit/curriculum/coverage.js can back), the changelog, the "Send to Gradify" bookmarklet and the page it
// opens (send.html), CreateGradify design briefs, InvestorGradify's compound-interest tool, the RSS feed and
// .well-known/security.txt.
import { faq, related, esc, ORIGIN, longDate } from "./shell.mjs";
import { LANDINGS } from "./tools.mjs";
import { QUALIFICATIONS, COURSES, STATUS, SYSTEMS } from "../../kit/curriculum/coverage.js";
import { readFileSync } from "node:fs";

const U = "2026-11-23";
const stats = JSON.parse(readFileSync(new URL("../../kit/api/v1/stats.json", import.meta.url), "utf8"));
const catalogue = JSON.parse(readFileSync(new URL("../../kit/api/v1/catalogue.json", import.meta.url), "utf8")).courses;

// ---------- two more "notes → study material" landing pages ----------
LANDINGS.push(
  { slug: "youtube-to-flashcards", name: "YouTube to flashcards", line: "A lecture video or transcript into flashcards and notes.",
    title: "YouTube Video to Flashcards and Notes (Free) · Gradify", description: "Turn a YouTube lecture or Panopto recording into notes in chapters, flashcards and a mind map. Paste the link or the transcript; free to try.",
    h1: "Turn a YouTube lecture into flashcards", cta: ["/app.html#/tools/youtube", "Open YouTube to notes"],
    answer: "Paste a YouTube link into Gradify's YouTube to notes tool and get notes in chapters, flashcards and a mind map of the video. If a link can't be read, paste the transcript instead (YouTube: ⋯ → Show transcript; Panopto and most lecture-capture tools have a transcript or captions download), and the same pack is made from that.",
    steps: [["Copy the link or transcript", "From YouTube, Panopto or your university's lecture-capture system. On YouTube: ⋯ under the video → Show transcript, then copy it."], ["Paste it into Gradify", "In YouTube to notes, or as text in Notes Studio."], ["Get notes, flashcards and a mind map", "In chapters that follow the video, each card from what was said."], ["Revise with spaced repetition", "Rate each card and Gradify schedules the next review."]],
    why: "Recorded lectures are easy to 'watch' and hard to remember. Turning a recording into questions you answer from memory is <a href=\"/glossary/active-recall/\">active recall</a>, which beats rewatching.",
    faq: [["Can I make flashcards from a YouTube video?", "Yes: paste the link into Gradify's YouTube to notes tool, or paste the video's transcript as text. Reading captions directly from links uses Gradify's AI service, which comes with an account; pasting a transcript works without one."], ["Does it work with Panopto lecture recordings?", "Yes, through the transcript: download or copy the captions from Panopto and paste them in."]] },
  { slug: "notes-to-study-chant", name: "Notes to study chant", line: "Your notes as a chant with a beat, to memorise.",
    title: "Turn Notes into a Song or Chant to Memorise (Free) · Gradify", description: "Turn your revision notes into a study chant with a beat: each key fact on the beat, plus flashcards, a cheat-sheet poster and a narrated video. Free, in your browser.",
    h1: "Turn your notes into a study chant", cta: ["/undergradify/lifeos.html", "Open Notes Studio"],
    answer: "Paste your notes into Notes Studio (in Gradify's LifeOS: choose Notes Studio in the sidebar) and one of the outputs is a chant: your key facts set to a 96 BPM beat with drums, bass and a hook, each line on the beat, plus the lyrics to download. The same notes also become flashcards, a spider map, a cheat-sheet poster and a narrated video.",
    steps: [["Open Notes Studio", "In LifeOS, choose Notes Studio in the sidebar."], ["Paste or upload your notes", "A PDF or text works."], ["Play the chant", "Each key fact lands on the beat; download the lyrics to practise."], ["Test yourself", "Use the flashcards from the same notes to check you can recall each line without the music."]],
    why: "Rhythm and repetition make lists easier to hold in memory, which is why mnemonic songs work for sequences and lists. They help you remember the words; check you understand them with flashcards and questions.",
    faq: [["Do songs help you memorise for exams?", "For lists and sequences, rhythm and repetition can help recall. Combine them with self-testing so you understand, not just remember, the words."]] },
);

// ---------- exam boards and qualifications: only what coverage.js can back ----------
function examBoards() {
  const live = new Set(catalogue.filter((c) => ["live", "beta"].includes(c.status)).map((c) => c.slug));
  const byQ = {};
  for (const [slug, c] of Object.entries(COURSES)) for (const s of c.serves) if (s.q && live.has(slug)) (byQ[s.q] ||= []).push({ slug, ...s });
  const name = (slug) => catalogue.find((c) => c.slug === slug)?.name || slug;
  return {
    path: "exam-boards/index.html", title: "Exam Boards and Qualifications Gradify Covers · Gradify", ogType: "website", updated: U,
    description: "Which qualifications Gradify's free courses are written for (GCSE, A level, degree, SQE, NMC, GPhC, MLA), how strong each claim is, and the exam boards to check against.",
    crumbs: [["Exam boards", "exam-boards/"]],
    body: `<h1>Exam boards and qualifications</h1><p class="answer">Gradify's courses say honestly how closely they match each qualification: <b>verified</b> (checked outcome by outcome against the official specification), <b>mapped</b>, <b>aligned</b> (written with it in mind) or Gradify's own curriculum. None is yet verified against an exam board's specification, so always check your own board's spec, for example with the <a href="/tools/syllabus-checker/">syllabus coverage checker</a>.</p>
    <h2>The exam boards and regulators</h2><div class="scroll"><table><thead><tr><th>Where</th><th>Boards and regulators</th></tr></thead><tbody>${SYSTEMS.map((s) => `<tr><th scope="row">${esc(s.system)}</th><td>${esc(s.bodies.join(", "))}</td></tr>`).join("")}</tbody></table></div>
    ${Object.entries(byQ).map(([q, list]) => `<h2>${esc(QUALIFICATIONS[q]?.name || q)}</h2><p class="small">${esc(QUALIFICATIONS[q]?.level || "")}${QUALIFICATIONS[q]?.body ? ` · ${esc(QUALIFICATIONS[q].body)}` : ""}</p><ul>${list.map((x) => `<li><a href="/topics/${x.slug}/">${esc(name(x.slug))}</a>: ${esc(STATUS[x.status].name)}${x.note ? `. <small>${esc(x.note)}</small>` : ""}</li>`).join("")}</ul>`).join("")}
    <h2>What do the levels mean?</h2><ul>${Object.values(STATUS).map((s) => `<li><b>${esc(s.name)}</b>: ${esc(s.line)}</li>`).join("")}</ul>
    <p>More on how lessons are checked: <a href="/quality.html">quality and coverage</a>.</p>
    ${related("Revise by qualification", [["study-plan/", "Study plans by level", "GCSE, A level, university, professional"], ["questions/", "Practice questions", ""], ["guides/command-words/", "Exam command words", ""]])}`,
  };
}

// ---------- changelog (newest first) ----------
export const CHANGES = [
  ["2026-11-23", "Faster and easier to cite", ["Pages load their font from Gradify itself, with no third-party request", "Cite this page on guides, comparisons, key terms and research (HTML, APA and Harvard)", "Smaller link-preview images"]],
  ["2026-11-23", "Every page leads somewhere useful", ["Guides and comparisons show the tools for each step, common pitfalls and a rule of thumb", "Tools explain how to read the result, which tool to use when, and the traps to watch", "Series (exam season, coursework, science practicals) with previous and next", "Tools, guides and checklists grouped by where you are: weeks to go, exam next week, coursework due, results"]],
  ["2026-11-23", "Key terms, research and better links", ["Key terms A to Z: plain-English definitions and how meanings change between subjects", "Research: common-mistake warnings counted across every subject", "Topic pages link to the same ideas in other subjects, and answer the questions students ask", "Study-technique words link to their glossary entries wherever they appear"]],
  ["2026-11-23", "Free tools, checklists and topic quizzes", ["30 free tools, including a cram planner, deadline planner, study timer, shared focus room, citation helper and mark-scheme checker", "Every topic page now has a quick quiz, a 60-second recall drill, Listen, printable cheat sheets, blurting sheets and index cards, and a full Anki/Quizlet CSV export", "Nine printable checklists, from lab reports to exam day", "Practice questions and exam traps for every subject", "25 new study guides and 10 concept comparisons"]],
  ["2026-11-20", "Free study pages", ["Free degree, GPA and final-grade calculators", "Topic pages for every unit of every live course, and week-by-week study plans", "Study guides, comparisons, a glossary and printable templates"]],
  ["2026-11-01", "Five sections in the app", ["The app's navigation went from 15 destinations to five sections"]],
];
function changelog() {
  return {
    path: "changelog/index.html", title: "What's New on Gradify: Changelog · Gradify", description: "What's changed on Gradify, newest first: new free tools, course content, study pages and app features, with dates.", crumbs: [["What's new", "changelog/"]], ogType: "website", updated: CHANGES[0][0],
    body: `<h1>What's new</h1><p class="answer">Gradify is updated every week. Here's what changed, newest first. Follow along with the <a href="/feed.xml">RSS feed</a>.</p>${CHANGES.map(([d, h, items]) => `<h2><time datetime="${d}">${longDate(d)}</time>: ${esc(h)}</h2><ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`).join("")}`,
  };
}

// ---------- the "Send to Gradify" bookmarklet and the page it opens ----------
const BOOKMARKLET = `javascript:(()=>{const t=String(getSelection()).trim()||document.title;window.open('${ORIGIN}/send.html#'+encodeURIComponent(JSON.stringify({text:t.slice(0,6000),title:document.title.slice(0,80),from:location.href})),'_blank')})()`;
function bookmarklet() {
  return {
    path: "tools/bookmarklet/index.html", title: "Send to Gradify Bookmarklet: Any Webpage to Flashcards · Gradify", updated: U,
    description: "Drag the Send to Gradify button to your bookmarks bar. Highlight text on any page (Wikipedia, PubMed, BBC Bitesize) and turn it into checked flashcards.",
    crumbs: [["Free study tools", "tools/"], ["Send to Gradify bookmarklet", "tools/bookmarklet/"]],
    schema: [{ "@type": "WebApplication", name: "Send to Gradify bookmarklet", applicationCategory: "EducationalApplication", operatingSystem: "Web", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" } }],
    body: `<h1>The Send to Gradify bookmarklet</h1><p class="answer">Drag the button below to your browser's bookmarks bar. On any page, highlight some text and click it: Gradify opens with that text ready to turn into flashcards checked against it. No extension to install.</p>
    <p class="bookmarklet"><a class="btn btn-primary lg" href="${esc(BOOKMARKLET)}" onclick="event.preventDefault();alert('Drag this button to your bookmarks bar, then click it on any page.')"><span>Send to Gradify</span></a> <small>← drag me to your bookmarks bar</small></p>
    <h2>How do I install it?</h2><ol><li>Show your bookmarks bar (Ctrl+Shift+B on Windows, ⌘+Shift+B on a Mac).</li><li>Drag the button onto it.</li><li>On any page, highlight text and click <b>Send to Gradify</b>.</li></ol>
    <h2>Does it work on phones?</h2><p>Bookmarklets are fiddly on mobile. On a phone, copy the text and paste it into <a href="/app.html#/new">Notes Studio</a>.</p>
    <h2>What does it send?</h2><p>Only the text you highlighted (or the page title if nothing is selected) and the page address, straight to the Gradify tab it opens in your browser. Nothing is sent to a server until you choose to make a pack.</p>
    ${related("Related", [["pdf-to-flashcards/", "PDF to flashcards", ""], ["youtube-to-flashcards/", "YouTube to flashcards", ""]])}`,
  };
}
const SEND = `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Sending to Gradify…</title><link rel="canonical" href="${ORIGIN}/tools/bookmarklet/">
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;background:#0b0b0b;color:#fff}a{color:#fff}</style></head>
<body><p>Opening Gradify with your text… <a href="/app.html#/new">Continue</a></p>
<script>(function(){try{var d=JSON.parse(decodeURIComponent(location.hash.slice(1)));var text=String(d.text||"").slice(0,6000);if(d.from)text+="\\n\\nSource: "+String(d.from).slice(0,300);sessionStorage.setItem("gradify.jot.pack",JSON.stringify({text:text,title:String(d.title||"From the web").slice(0,80)}));}catch(e){}location.replace("/app.html#/new");})();</script></body></html>
`;

// ---------- CreateGradify: free design briefs ----------
const BRIEFS = [
  ["A bus stop for a rainy town", "Redesign a bus stop for a town where it rains 200 days a year. Who waits there, for how long, and what do they need?", "Empathy interviews, rapid sketching"],
  ["A medicine reminder for a grandparent", "Design a reminder for someone who takes five medicines a day and doesn't own a smartphone.", "User research, low-tech prototyping"],
  ["The first five minutes of a library visit", "Map the journey of a first-year student entering the library for the first time. Fix the worst moment.", "Journey mapping"],
  ["A packaging-free lunch", "Design a way for a school canteen to serve lunch with no single-use packaging.", "Systems thinking, constraints"],
  ["A sign nobody ignores", "A sign asks people not to cycle on a busy path; everyone ignores it. Design a better intervention.", "Behaviour design"],
  ["An app for a busy carer", "A young carer has 10 minutes a day for homework. Design something that helps.", "Problem framing, How Might We"],
  ["A kitchen tool for one hand", "Design a kitchen tool for someone who can only use one hand.", "Inclusive design, prototyping"],
  ["A calmer exam waiting room", "Students wait 20 minutes outside the exam hall. Make that time calmer.", "Environment design"],
  ["A repair café flyer that works", "Design the flyer (or something better) that gets people to bring broken things to a repair café.", "Communication design"],
  ["A playground for all ages", "Design a small public space that a toddler, a teenager and a grandparent all want to use.", "Co-design, ideation"],
];
function briefs() {
  return {
    path: "creategradify/briefs/index.html", title: "10 Free Design Thinking Briefs to Practise On · Gradify", updated: U,
    description: "Ten free design briefs for design and technology, product design and UX students: real problems to practise empathy, ideation and prototyping on. No sign-up.",
    crumbs: [["CreateGradify", "creategradify/"], ["Design briefs", "creategradify/briefs/"]],
    body: `<h1>Ten free design briefs to practise on</h1><p class="answer">Real, small problems to practise the design process on: understand who it's for, define the problem, generate ideas, prototype and test. Pick one, give yourself a weekend, and use CreateGradify's free lessons on design thinking and prototyping as you go.</p>
    <ol class="briefs">${BRIEFS.map(([t, b, s]) => `<li><h2>${esc(t)}</h2><p>${esc(b)}</p><p class="small"><b>Practises:</b> ${esc(s)}</p></li>`).join("")}</ol>
    <h2>How to work through a brief</h2><ol><li><b>Empathise:</b> talk to two people the brief affects.</li><li><b>Define:</b> write one "How might we…?" question.</li><li><b>Ideate:</b> sketch ten ideas in ten minutes.</li><li><b>Prototype:</b> make the roughest version you can test.</li><li><b>Test:</b> watch someone use it; note what confuses them.</li></ol>
    ${related("Learn the method", [["creategradify/", "CreateGradify free lessons", "design thinking, prototyping, ideation"], ["topics/design/", "Design topics and flashcards", ""], ["tools/presentation-prep-helper/", "Present your design", ""]])}`,
  };
}

// ---------- InvestorGradify: compound interest and fund fees ----------
function investorTools() {
  return {
    path: "investorgradify/tools/index.html", title: "Compound Interest and Fund Fee Calculator · Free · Gradify", updated: U,
    description: "See how monthly investing grows with compound interest, and how much a 0.5% or 1% yearly fund fee costs over 10, 20 or 30 years. Free, educational, no sign-up.",
    crumbs: [["InvestorGradify", "investorgradify/"], ["Compound interest calculator", "investorgradify/tools/"]],
    schema: [{ "@type": "WebApplication", name: "Compound interest and fund fee calculator", applicationCategory: "FinanceApplication", operatingSystem: "Web", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" } }],
    body: `<h1>Compound interest and fund fee calculator</h1><p class="answer">Enter a starting amount, a monthly amount, the years and an assumed yearly return. You'll see what it could grow to, how much you paid in, and how much a yearly fund fee takes over that time. Fees compound too, so a 1% fee can cost far more than 1% of the total. This is for learning, not financial advice: real returns vary and can be negative.</p>
    <div class="tool" data-tool="growth" data-mod="tools-plan" data-example='{"f":{"start":"1000","monthly":"100","years":"25","rate":"5","fee":"1"}}'>
      <div class="grid"><div><label for="start">Starting amount (£)</label><input id="start" name="start" type="number" min="0" value="1000"></div><div><label for="monthly">Each month (£)</label><input id="monthly" name="monthly" type="number" min="0" value="100"></div><div><label for="years">Years</label><input id="years" name="years" type="number" min="1" max="60" value="20"></div><div><label for="rate">Yearly return %</label><input id="rate" name="rate" type="number" step="0.1" value="5"></div><div><label for="fee">Yearly fee %</label><input id="fee" name="fee" type="number" step="0.05" min="0" value="0.5"></div></div>
      <div class="result" role="status" aria-live="polite"></div>
    </div>
    <h2>Worked example</h2><p>£1,000 to start and £100 a month for 20 years at an assumed 5% a year grows to about £43,800 from £25,000 paid in. A 1% yearly fee cuts that to about £38,900: nearly £4,900 gone, because the fee is taken every year from a growing pot.</p>
    <h2>Learn what's behind the numbers</h2><p>InvestorGradify's free lessons cover diversification, funds and ETFs, fees and valuation basics: <a href="/investorgradify/">start learning</a>, or see the <a href="/topics/investing/">investing topics and flashcards</a>.</p>
    ${faq([["What is compound interest?", "Earning returns on your previous returns as well as on what you put in, so growth speeds up over time."], ["How much do fund fees cost?", "More than they look: a yearly percentage fee is taken from a growing pot every year, so over decades a 1% fee can cost a large share of the gains. Compare the ongoing charge (OCF) when choosing funds."]]).html}`,
  };
}

// ---------- RSS feed and security.txt ----------
const rssEsc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
export function feedXml(items) {
  const date = (d) => new Date(`${d}T09:00:00Z`).toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Gradify: new study guides and tools</title>
  <link>${ORIGIN}/</link>
  <description>New free study guides, tools, checklists and features from Gradify.</description>
  <language>en-gb</language>
  <atom:link href="${ORIGIN}/feed.xml" rel="self" type="application/rss+xml"/>
  <atom:link href="https://pubsubhubbub.appspot.com/" rel="hub"/>
  <lastBuildDate>${date(items[0]?.date || U)}</lastBuildDate>
${items.map((x) => `  <item><title>${rssEsc(x.title)}</title><link>${ORIGIN}/${x.path}</link><guid isPermaLink="true">${ORIGIN}/${x.path}</guid><pubDate>${date(x.date)}</pubDate><description>${rssEsc(x.description)}</description></item>`).join("\n")}
</channel>
</rss>
`;
}
const SECURITY = `Contact: mailto:hello@getgradify.com
Expires: 2027-11-23T00:00:00.000Z
Preferred-Languages: en
Canonical: ${ORIGIN}/.well-known/security.txt
Policy: ${ORIGIN}/privacy.html
`;

export function hubPages() {
  return [examBoards(), changelog(), bookmarklet(), briefs(), investorTools(),
    { raw: true, path: "send.html", html: SEND },
    { raw: true, path: ".well-known/security.txt", html: SECURITY }];
}
export { stats };
