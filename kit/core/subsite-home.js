// Draws the rest of a sub-site's homepage, below its opening section, from site-content.js.
//   import { renderHome } from "../kit/core/subsite-home.js"; renderHome(el, "MedGradify");
import { SITES, nameHtml, accentOf } from "./site.js";
import { KINDS, SITES_CONTENT } from "./site-content.js";
import { icon } from "./icons.js";
import { ink } from "./colour.js";
import { modelOf } from "../models/index.js";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const DIMS = {
  default: ["Recall", "Explanation", "Application", "Confidence", "Retention"],
  kids: ["Remembers it", "Can explain it", "Can use it", "Feels sure", "Still knows it"],
};
const LEVELS = [["mastered", "Mastered"], ["strong", "Strong"], ["fading", "Fading"], ["learning", "Learning"]];

export function renderHome(el, siteName) {
  const site = SITES.find((s) => s.n === siteName), c = SITES_CONTENT[siteName];
  if (!site || !c) return;
  const k = KINDS[c.kind], model = modelOf(siteName);
  const who = (site.who || "learners").replace(/^./, (x) => x.toLowerCase());
  const fill = (t) => esc(t).replaceAll("{site}", site.n).replaceAll("{who}", esc(who)).replaceAll("{exams}", esc(c.exams || "your exams")).replaceAll("{topic}", esc(c.topics[0][0]));
  const fillName = (t) => fill(t).replaceAll(esc(site.n), nameHtml(site));
  const accent = accentOf(site);
  const dims = DIMS[c.kind === "kids" ? "kids" : "default"], values = [88, 72, 61, 80, 54];
  const section = (id, title, sub, body) => `<section class="sm-sec" id="${id}"><div class="sm-head"><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ""}</div>${body}</section>`;
  document.body.classList.add(`kind-${c.kind}`);

  el.innerHTML = [
    section("how", fill(k.stepsTitle), "", `<ol class="sm-steps">${k.steps.map(([t, d], i) => `<li class="glass"><em>${i + 1}</em><b>${fill(t)}</b><p>${fill(d)}</p></li>`).join("")}</ol>`),

    // sites with a 3D model get a section for it
    model ? `<section class="sm-sec sm-3d glass"><div><span class="sm-kicker">New · 3D model</span><h2>${esc(model.title)}</h2><p>${esc(model.blurb)}</p><div class="sub-ctas"><a class="btn btn-light lg" href="3d.html"><span>Open ${esc(model.nav)}</span> <span aria-hidden="true">→</span></a></div></div><a class="sm-3d-art" href="3d.html" aria-label="Open the 3D model" style="background-image:url(../kit/models/previews/${model.file.replace(".js", ".webp")})"><span></span></a></section>` : "",

    section("topics", fill(k.topicsTitle), fill(k.topicsSub), `<div class="sm-topics">${c.topics.map(([t, d]) => `<a class="sm-topic glass" href="app.html"><i></i><b>${esc(t)}</b><span>${esc(d)}</span><span class="go" aria-hidden="true">→</span></a>`).join("")}</div>`),

    section("features", fillName(k.featuresTitle), "", `<div class="sm-features">${k.features.map(([i, t, d]) => `<article class="sm-feature glass"><span class="sm-ico">${icon(i)}</span><b>${fill(t)}</b><p>${fill(d)}</p></article>`).join("")}</div>`),

    section("progress", fill(k.progressTitle), fill(k.progressSub), `<div class="sm-progress">
      <article class="sm-profile glass">
        <div class="sm-p-top"><div><span class="sm-kicker">Example topic</span><b>${esc(c.topics[0][0])}</b></div><span class="sm-ring" style="--p:${71}"><b>71%</b></span></div>
        <ul>${dims.map((d, i) => `<li><span>${d}</span><em>${values[i]}%</em><i><b style="width:${values[i]}%"></b></i></li>`).join("")}</ul>
        <p class="sm-next"><b>Next:</b> ${c.kind === "kids" ? "one more go tomorrow to make it stick." : "review before you forget. Retention is slipping."}</p>
      </article>
      <ul class="sm-levels">${c.topics.slice(1, 5).map(([t], i) => `<li class="glass"><b>${esc(t)}</b><span class="sm-pill ${LEVELS[i][0]}">${c.kind === "kids" ? ["Secure", "Nearly there", "Needs another go", "Just started"][i] : LEVELS[i][1]}</span></li>`).join("")}</ul>
    </div>`),

    section("day", fillName(k.dayTitle), "", `<ol class="sm-day">${k.day.map(([t, h, d]) => `<li><time>${esc(t)}</time><b>${esc(h)}</b><p>${esc(d)}</p></li>`).join("")}</ol>`),

    section("faq", "Questions", "", `<div class="sm-faq">${k.faq.map(([q, a], i) => `<details class="glass"${i === 0 ? " open" : ""}><summary>${fill(q)}</summary><p>${fill(a)}</p></details>`).join("")}</div>`),

    `<section class="sm-cta glass"><h2>${fill(k.ctaTitle)}</h2><p>${fill(k.ctaSub)}</p><div class="sub-ctas"><a class="btn btn-light lg" href="app.html"><span>Start free</span> <span aria-hidden="true">→</span></a><a class="btn btn-ghost lg" href="/"><span>Explore Gradify</span></a></div></section>`,
  ].join("");
  el.style.setProperty("--accent", accent);
  el.style.setProperty("--accent-ink", ink(site.c));
}
