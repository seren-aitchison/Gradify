// "Your learning map": the top of the LifeOS tour's Earth view on a subject site. It is the site's real learning map
// (map.html, kit/earth/subject-map.js): the course's stages as regions and its chapters as places, lit by the
// learner's own answers, so Earth shows their progress rather than an example. Alex's degree stays below it, labelled
// as the example it is, because the rest of the tour (Today, the assistant, the plan) reviews Alex's topics there.
// Only on a built site with a map; elsewhere (the homepage's LifeOS window) the tour is unchanged. The map loads when
// the Earth view first opens, so the tour doesn't start two globes at once. Styles: .life-mymap in components.css.
import { esc } from "../core/text.js";
import { SITES } from "../core/site.js";
/** Adds the learner's real learning map to the Earth view; returns the section, or null where there's no map. */
export function mountMyMap({ doc = document } = {}) {
  const name = doc.querySelector('meta[name="gradify-site"]')?.content, site = SITES.find((s) => s.n === name);
  const view = doc.querySelector("#view-earth"), example = view?.querySelector("#earth");
  if (!site?.built || !view || !example) return null;
  const sec = doc.createElement("section");
  sec.className = "panel glass life-mymap"; sec.setAttribute("aria-labelledby", "mymap-title");
  sec.innerHTML = `<div class="panel-head"><div><span class="kicker">Your ${esc(site.n)}</span><h3 id="mymap-title">Your learning map</h3>
    <p class="sub">${esc(site.n)}'s course as a world, from your own answers: each stage is a region and each chapter a place that lights up as you show you know it. <a href="map.html">Open it full size</a></p></div></div>
    <div class="life-mymap-frame" data-src="map.html"></div>`;
  view.insertBefore(sec, example);
  // the tour's globe is Alex's: say so where it starts
  const h = example.querySelector(".panel-head h3");
  if (h) h.textContent = "Example: Alex's degree";
  const load = () => {
    const box = sec.querySelector(".life-mymap-frame");
    if (box.firstChild) return;
    box.innerHTML = `<iframe src="${esc(box.dataset.src)}" title="${esc(site.n)} learning map" loading="lazy"></iframe>`;
  };
  if (!view.hidden) load();
  doc.addEventListener("lifeos:view", (e) => { if (e.detail === "earth") load(); });
  return sec;
}
