// The page shell for Gradify's search pages (scripts/build-seo.mjs): the hub header and footer, a canonical URL, Open
// Graph and Twitter cards for link previews in group chats, visible breadcrumbs with matching BreadcrumbList structured
// data, any other JSON-LD the page needs, a "Last updated" date, and the "Share with your study group" button.
// Everything is static HTML, so search engines and AI crawlers read the whole page without running JavaScript.
import { hubHeader, hubFooter } from "../sync-headers.mjs";

export const ORIGIN = "https://getgradify.com";
export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
export const url = (path) => `${ORIGIN}/${String(path).replace(/^\//, "").replace(/(^|\/)index\.html$/, "$1")}`;
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

export const ORG = {
  "@type": "EducationalOrganization", "@id": `${ORIGIN}/#org`, name: "Gradify", alternateName: ["GetGradify", "Gradify study"],
  url: `${ORIGIN}/`, logo: `${ORIGIN}/assets/icons/icon-512.png`, email: "hello@getgradify.com",
  description: "Gradify turns your notes into flashcards and mind maps checked against what you wrote, and schedules revision with spaced repetition. Free courses across 30+ subjects.",
};

/** "12 November 2026" from "2026-11-12" */
export const longDate = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * A whole page. `path` is where it's published ("tools/degree-calculator/index.html"); `crumbs` are [name, path] pairs
 * after Home, the last being this page; `schema` is a list of extra JSON-LD objects; `updated` an ISO date.
 */
/** a title that fits a search result (≤ 60 characters): drop "· Free", brackets, then "· Gradify", then cut at a colon or a word */
export function fitTitle(t, max = 60) {
  const steps = [(x) => x.replace(/ · Free(?= ·)/g, ""), (x) => x.replace(/ \([^)]*\)/g, ""), (x) => x.replace(/ · Gradify$/, ""), (x) => x.replace(/ \| Gradify$/, "")];
  let x = String(t).trim();
  for (const f of steps) { if (x.length <= max) return x; x = f(x).trim(); }
  if (x.length <= max) return x;
  const colon = x.indexOf(":"); if (colon >= 20 && colon <= max) return x.slice(0, colon);
  return x.slice(0, max + 1).replace(/[\s,;:·–-]+\S*$/, "");
}
/** a meta description that isn't truncated (≤ 155 characters): whole sentences if possible, else whole words */
export function fitDesc(d, max = 155) {
  const x = String(d).replace(/\s+/g, " ").trim(); if (x.length <= max) return x;
  const cut = x.slice(0, max), end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (end >= 80) return cut.slice(0, end + 1);
  return `${cut.slice(0, max - 1).replace(/[\s,;:·–-]+\S*$/, "")}…`;
}

// a link-preview image per section, so a shared tool, topic or guide doesn't look like every other page
const OG_SECTIONS = ["tools", "topics", "guides", "checklists", "compare", "vs", "terms", "questions", "study-plan"];
export const ogFor = (path) => { const s = String(path).split("/")[0]; const k = s === "vs" ? "compare" : s === "exam-traps" ? "questions" : s; return OG_SECTIONS.includes(k) ? `${ORIGIN}/assets/og/${k}.png` : `${ORIGIN}/assets/og.png`; };
export function page({ path, title: rawTitle, description: rawDesc, crumbs = [], body, schema = [], updated = null, ogType = "article", noindex = false, head = "", share = true, cta = true }) {
  const title = fitTitle(rawTitle), description = fitDesc(rawDesc);
  const canonical = url(path);
  const trail = [["Home", ""], ...crumbs];
  const breadcrumbs = crumbs.length ? `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.map(([n, p], i) => i === trail.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="/${esc(p)}">${esc(n)}</a></li>`).join("")}</ol></nav>` : "";
  const crumbLd = crumbs.length ? { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: trail.map(([n, p], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: url(p) })) } : null;
  // Speakable: on guides, topics, comparisons and key terms, the heading and the answer-first summary are the parts a
  // voice assistant should read out
  const speak = /class="answer"/.test(body) && /^(guides|topics|vs|terms)\/./.test(path) ? { "@context": "https://schema.org", "@type": "WebPage", url: canonical, name: title, speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".answer"] } } : null;
  const graph = [crumbLd, speak, ...schema.map((s) => ({ "@context": "https://schema.org", ...s }))].filter(Boolean);
  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  ${noindex ? '<meta name="robots" content="noindex, follow">' : ""}
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="en-GB" href="${canonical}">
  <link rel="alternate" hreflang="x-default" href="${canonical}">
  <link rel="alternate" type="application/rss+xml" title="Gradify: new study guides and tools" href="${ORIGIN}/feed.xml">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="Gradify">
  <meta property="og:locale" content="en_GB">
  <meta property="og:image" content="${ogFor(path)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Gradify: turn your notes into flashcards checked against what you wrote.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${ogFor(path)}">
  ${updated ? `<meta property="article:modified_time" content="${updated}">` : ""}
  <meta name="theme-color" content="#000000">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"></noscript>
  <link rel="stylesheet" href="/kit/styles/base.css">
  <script src="/kit/core/theme-boot.js"></script>
  <link rel="stylesheet" href="/assets/seo.css">
  <script type="module" src="/assets/seo.js"></script>
  ${graph.map(ld).join("\n  ")}
  ${head}
</head>
<body>
  <div class="wrap hub-top">
    ${hubHeader("", "main")}
  </div>
  <main id="main" class="seo">
    ${breadcrumbs}
    ${updated ? `<p class="updated">Last updated <time datetime="${updated}">${longDate(updated)}</time></p>` : ""}
    ${body}
    ${share ? `<p class="share-row"><button type="button" class="share-btn" data-share>Share with your study group</button><span class="share-msg" role="status" aria-live="polite"></span></p>` : ""}
    ${cta ? CTA : ""}
  </main>
  <div class="wrap hub-bottom">
    ${hubFooter()}
  </div>
</body>
</html>
`.replace(/\n\s*\n/g, "\n");
}

export const CTA = `<aside class="cta-box">
      <h2>Turn your own notes into checked flashcards</h2>
      <p>Drop in a PDF or paste your lecture notes. Gradify makes flashcards and a mind map in about a minute, matches every card to the line it came from, and schedules your revision. Free, and no account needed to try it.</p>
      <p><a class="btn btn-primary lg" href="/app.html#/new"><span>Try it with your notes</span> <span aria-hidden="true">→</span></a></p>
    </aside>`;

/** an FAQ block as HTML, and its FAQPage structured data */
export function faq(items, heading = "Questions") {
  return {
    html: `<section class="faq-block" aria-labelledby="faq-h"><h2 id="faq-h">${esc(heading)}</h2>${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join("")}</section>`,
    schema: { "@type": "FAQPage", mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })) },
  };
}

/** a list of related links */
export const related = (title, links) => `<section class="related" aria-label="${esc(title)}"><h2>${esc(title)}</h2><ul>${links.map(([href, label, line]) => `<li><a href="/${href}">${esc(label)}</a>${line ? `<span>${esc(line)}</span>` : ""}</li>`).join("")}</ul></section>`;

/** the newsletter opt-in: a free study plan and a weekly tip by email (kit/data/waitlist.js, list "Study tips") */
export const optIn = (offer = "Get our free 7-day active recall exam plan, and one short study tip a week") => `<form class="optin" data-optin>
      <h2>${esc(offer)}</h2>
      <p>One email a week, written by the Gradify team. Unsubscribe any time by replying "stop". The plan is also <a href="/templates/7-day-exam-plan/">here, free, with no email</a>.</p>
      <div class="optin-row"><label class="sr-only" for="optin-email">Email address</label><input id="optin-email" type="email" name="email" autocomplete="email" required placeholder="you@uni.ac.uk"><button type="submit" class="btn btn-primary lg"><span>Send it</span></button></div>
      <p class="optin-msg" role="status" aria-live="polite"></p>
    </form>`;

/** "Jump to" pills for a long page: [[id, label]] */
export const toc = (items) => items.length < 4 ? "" : `<nav class="toc no-print" aria-label="On this page"><span>Jump to:</span> ${items.map(([id, l]) => `<a href="#${id}">${esc(l)}</a>`).join("")}</nav>`;
/** a section's key takeaway, with a copy button */
export const takeaway = (text) => `<p class="takeaway"><b>Key takeaway:</b> <span>${text}</span> <button type="button" class="mini no-print" data-copy="${esc(text.replace(/<[^>]+>/g, ""))}">Copy</button></p>`;
/** a "test yourself" prompt: the question, and the answer behind a reveal */
export const selfTest = (q, a) => `<details class="self-test"><summary><b>Test yourself:</b> ${q} <span class="reveal">Reveal</span></summary><p>${a}</p></details>`;
/** an id from a heading */
export const slugId = (s) => String(s).toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
