// Reaction mode of the Organic Chemistry Lab: choose a starting material (your Structure-mode drawing or a common
// compound) and a reagent with its conditions; the predictor (predictor.js) works out the products by rule templates
// and explains the reasoning, or says why there is no reaction. "Predict first" hides the answer until the learner
// chooses; "Use as the next starting material" chains reactions into a synthesis route.
import { toggle, button, challenges, esc } from "../../lab.js";
import * as K from "../skeletal.js";
import { REAGENTS, STARTERS, predict, starter } from "./predictor.js";
import { REACTIONS } from "./library.js";

const sub = (f) => esc(f).replace(/(\d+)/g, "<sub>$1</sub>");
const nameOf = (m) => { const A = K.analyse(m); return A.name?.name || A.formula; };
const shuffle = (a, seed) => { const r = [...a]; let x = seed || 1; for (let i = r.length - 1; i > 0; i--) { x = (x * 9301 + 49297) % 233280; const j = Math.floor((x / 233280) * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

export function mountReaction(host, { ctx = {}, palette = () => "dark", getDrawing = () => null, onMechanism = null, onEdit = null } = {}) {
  host.innerHTML = `
    <div class="lab-row mx-top rx-top">
      <label class="lab-sel"><span>Start</span><select class="rx-src"></select></label>
      <label class="lab-sel"><span>Reagent</span><select class="rx-reag"></select></label>
      <span class="mx-opts rx-opts"></span>
    </div>
    <div class="rx-route" aria-live="polite"></div>
    <div class="lab-cols osk-cols">
      <div class="rx-scheme" aria-live="polite"></div>
      <div class="lab-ctrl"><div class="lab-info rx-info" aria-live="polite"></div><div class="lab-row rx-btns"></div><div class="lab-info rx-about"></div></div>
    </div>`;
  const q = (s) => host.querySelector(s);
  let start = null, srcKey = "mine", reagent = REAGENTS[0].id, guess = null, predictFirst = false, seed = 1, route = [], stats = { right: 0 };
  const ch = challenges(q(".rx-about"), ctx, [
    { id: "rx-predict", text: "Predict five products correctly, with “Predict first” on", test: (s) => s.right >= 5 },
    { id: "rx-markovnikov", text: "Predict the major product when HBr or steam adds to an unsymmetrical alkene", test: (s) => s.ok && ["hbr", "steam"].includes(s.reagent) && s.minor },
    { id: "rx-zaitsev", text: "Predict the major alkene from an elimination that can give two", test: (s) => s.ok && ["koh-eth", "h3po4"].includes(s.reagent) && s.minor },
    { id: "rx-directing", text: "Predict where a substituted benzene ring is nitrated", test: (s) => s.ok && s.reagent === "nitration" && s.substituted },
    { id: "rx-two-step", text: "Carry out a two-step synthesis: react a product again", test: (s) => s.routeSteps >= 2 },
  ]);

  const src = q(".rx-src");
  src.innerHTML = `<option value="mine">My drawing (from Structure mode)</option><optgroup label="Common compounds">${STARTERS.map(([n]) => `<option value="${esc(n)}">${esc(n)}</option>`).join("")}</optgroup>`;
  src.addEventListener("change", () => { srcKey = src.value; route = []; load(); });
  const rg = q(".rx-reag"), groups = [...new Set(REAGENTS.map((r) => r.type.split(" (")[0]))];
  rg.innerHTML = groups.map((g) => `<optgroup label="${esc(g)}">${REAGENTS.filter((r) => r.type.split(" (")[0] === g).map((r) => `<option value="${r.id}">${esc(r.label)}, ${esc(r.cond)}</option>`).join("")}</optgroup>`).join("");
  rg.addEventListener("change", () => { reagent = rg.value; guess = null; seed++; paint(); });
  toggle(q(".rx-opts"), "Predict first", predictFirst, (v) => { predictFirst = v; guess = null; paint(); });

  function load() {
    guess = null;
    if (srcKey === "route") { /* start already set by "use as next" */ }
    else if (srcKey === "mine") { const m = getDrawing(); start = m && m.atoms.length ? m : null; }
    else start = starter(srcKey);
    paint();
  }
  const pal = () => palette();
  const mol = (m, w = 240, h = 150) => { const A = K.analyse(m); return K.render(m, A, K.fit(m, [w, h], { max: 30, pad: 0.8 }), [w, h], { palette: pal(), title: A.name?.name || A.formula }); };
  const card = (m, role, note) => { const A = K.analyse(m); return `<figure class="rx-mol ${role === "minor" ? "minor" : ""}">${mol(m)}<figcaption>${role !== "product" ? `<em class="rx-role ${role}">${role}</em> ` : ""}<b>${esc(A.name?.name || "")}</b> <span>${sub(A.formula)}</span>${note ? `<small>${esc(note)}</small>` : ""}</figcaption></figure>`; };

  function options(res) {
    // the answer plus distractors that are themselves real outcomes: minor products, other reagents' products, no reaction
    const right = res.reacts ? res.products.filter((p) => p.role !== "minor").map((p) => nameOf(p.m)) : ["No reaction"];
    const pool = new Set(right);
    if (res.reacts) res.products.filter((p) => p.role === "minor").forEach((p) => pool.add(nameOf(p.m)));
    for (const r of shuffle(REAGENTS, seed)) { if (pool.size >= 4) break; if (r.id === reagent) continue; const o = predict(start, r.id); if (o.reacts) { const n = nameOf(o.products[0].m); if (!right.includes(n)) pool.add(n); } }
    if (pool.size < 4) pool.add(right.includes("No reaction") ? nameOf(start) : "No reaction");
    return { right, list: shuffle([...pool].slice(0, 4), seed + 7) };
  }

  function paint() {
    const box = q(".rx-scheme"), info = q(".rx-info"), btns = q(".rx-btns"); btns.innerHTML = "";
    rg.value = reagent;
    q(".rx-route").innerHTML = route.length ? `<span class="osk-aka">Route so far</span> ${route.map((r) => `<span class="rx-chip">${esc(r.from)}</span><i>→<small>${esc(r.reagent)}</small></i>`).join("")}<span class="rx-chip now">${esc(nameOf(start))}</span>` : "";
    if (!start) { box.innerHTML = `<div class="rx-empty"><p>Draw a starting material in <b>Structure</b> mode, or choose a common compound above.</p></div>`; info.innerHTML = ""; return; }
    const res = predict(start, reagent), r = res.reagent;
    const arrow = `<div class="mx-arrow rx-arrow"><small>${esc(r.label)}</small><b>⟶</b><small>${esc(r.cond)}</small></div>`;
    const opts = predictFirst ? options(res) : null, hidden = predictFirst && guess == null;
    const prods = !res.reacts ? `<div class="rx-none">${hidden ? "?" : "No reaction"}</div>` : hidden ? `<div class="rx-none">?</div>` : res.products.map((p) => card(p.m, p.role, p.note)).join(`<span class="rx-plus">or</span>`);
    const by = res.reacts && !hidden && res.byproducts.length ? `<span class="rx-by">+ ${res.byproducts.map(sub).join(" + ")}</span>` : "";
    box.innerHTML = `<div class="rx-row">${card(start, "product")}${arrow}<div class="rx-prods">${prods}${by}</div></div>`;
    if (hidden) {
      info.innerHTML = `<h4>Predict the product</h4><p>What forms when <b>${esc(nameOf(start))}</b> reacts with ${esc(r.label)} (${esc(r.cond)})?${res.reacts && res.products.length > 1 ? " Choose the major product (or either main product)." : ""}</p><div class="rx-choices">${opts.list.map((o, i) => `<button type="button" class="lab-btn" data-g="${i}">${esc(o)}</button>`).join("")}</div>`;
      info.querySelectorAll("[data-g]").forEach((b) => b.addEventListener("click", () => {
        guess = opts.list[Number(b.dataset.g)]; const ok = opts.right.includes(guess);
        if (ok) stats.right++; else ctx.fail?.("rx-predict", `${nameOf(start)} + ${r.label}`);
        ch.check({ right: stats.right, ok, reagent, minor: res.reacts && res.products.some((p) => p.role === "minor"), substituted: reagent === "nitration" && res.reacts && K.analyse(start).formula !== "C6H6", routeSteps: route.length });
        paint();
      }));
      return;
    }
    const verdict = guess == null ? "" : opts.right.includes(guess) ? `<p class="lab-msg ok">✓ Right: ${esc(guess)}.</p>` : `<p class="lab-msg">✗ You chose ${esc(guess)}. ${res.reacts ? `The ${res.products.length > 1 ? "main product is" : "product is"} ${esc(opts.right.join(" or "))}.` : "There's no reaction."}</p>`;
    info.innerHTML = `${verdict}<h4 class="${res.reacts ? "ok" : "no"}">${res.reacts ? esc(res.type) : "No reaction"}</h4><ul class="mx-list">${res.why.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>${res.reacts ? `<p class="osk-aka">Predicted by rule templates (${esc(r.type.toLowerCase())}). Real reactions can also give side products the rules don't list.</p>` : ""}`;
    if (res.reacts && res.mechanism && onMechanism && REACTIONS.some((x) => x.id === res.mechanism)) button(btns, "See the mechanism", () => onMechanism(res.mechanism), "pri");
    if (res.reacts) res.products.forEach((p, i) => button(btns, res.products.length > 1 ? `Use ${p.role === "product" ? `product ${i + 1}` : `the ${p.role} product`} next` : "Use as the next starting material", () => {
      route.push({ from: nameOf(start), reagent: r.label }); start = K.clone(p.m); srcKey = "route"; guess = null; seed++;
      ch.check({ routeSteps: route.length }); paint();
    }));
    if (onEdit) button(btns, "Edit in Structure mode", () => onEdit(K.clone(res.reacts ? res.products[0].m : start)));
    if (route.length) button(btns, "Start the route again", () => { route = []; srcKey = src.value; load(); });
  }
  load();
  return { refresh: () => { if (srcKey === "mine") load(); else paint(); }, stop: () => {} };
}
