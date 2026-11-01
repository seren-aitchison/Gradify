// A developmental timeline: Piaget's stages, Erikson's psychosocial stages, Schaffer and Emerson's phases of attachment
// and typical language milestones on one lifespan axis. Ages are typical ranges; stage theories are contested, and
// children vary widely (see the notes on each theory).
import { shell, seg, challenges } from "../lab.js";
import { caveat, esc } from "../social/ui.js";

export const STRANDS = {
  piaget: { name: "Piaget: cognitive stages", src: "Piaget (1952, 1954); critiques e.g. Donaldson (1978), Baillargeon (1987)", items: [
    [0, 2, "Sensorimotor", "Learning through senses and actions; object permanence develops (Piaget put it at about 8 months; Baillargeon's looking-time studies suggest earlier)."],
    [2, 7, "Pre-operational", "Symbols and language, but egocentrism (the three mountains task) and failure to conserve. Donaldson's “naughty teddy” version found many children could conserve when the task made sense to them (McGarrigle and Donaldson, 1974)."],
    [7, 11, "Concrete operational", "Logical operations on concrete objects: conservation, classification, seriation."],
    [11, 18, "Formal operational", "Abstract and hypothetical reasoning. Not all adults use it consistently, and it depends on education and culture."]] },
  erikson: { name: "Erikson: psychosocial stages", src: "Erikson (1950, 1968)", items: [
    [0, 1.5, "Trust vs mistrust", "Reliable care builds a sense that the world is safe."], [1.5, 3, "Autonomy vs shame and doubt", "Doing things for oneself."], [3, 5, "Initiative vs guilt", "Planning and play."], [5, 12, "Industry vs inferiority", "Competence at school and skills."],
    [12, 18, "Identity vs role confusion", "Exploring and committing to an identity; Marcia (1966) later described four identity statuses."], [18, 40, "Intimacy vs isolation", "Close relationships."], [40, 65, "Generativity vs stagnation", "Contributing to the next generation."], [65, 90, "Integrity vs despair", "Looking back on life."]] },
  attach: { name: "Schaffer and Emerson: attachment phases", src: "Schaffer and Emerson (1964): 60 Glasgow infants, studied at home over 18 months", items: [
    [0, 0.12, "Asocial", "Similar responses to people and objects, with a preference for faces."], [0.12, 0.6, "Indiscriminate attachment", "Prefers people to objects; accepts comfort from anyone."], [0.6, 1, "Specific attachment", "From about 7 months: separation anxiety and stranger anxiety; a primary attachment figure, not always the main caregiver."], [1, 2, "Multiple attachments", "Attachments to several people; by 18 months most infants in the study had more than one."]] },
  language: { name: "Language milestones (typical)", src: "NHS and developmental reviews; ages vary widely between children", items: [
    [0.15, 0.5, "Cooing", "Vowel-like sounds from about 2 months."], [0.5, 1, "Babbling", "Repeated consonant–vowel syllables (“bababa”) from about 6 months."], [1, 1.5, "First words", "Usually around 12 months."], [1.5, 2.5, "Two-word speech", "Telegraphic speech (“more juice”) from about 18–24 months; a vocabulary spurt."], [2.5, 5, "Grammar", "Overregularisation errors (“I goed”) show children learning rules, not just copying."]] },
};
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row sx-mode"></div><div class="sx-panel"><div class="sx-time sx-btns"></div><div class="sx-card" aria-live="polite"></div></div><div class="lab-ctrl"></div>`);
  const tl = $(".sx-time"), card = $(".sx-card"), ctrl = $(".lab-ctrl"), seen = new Set();
  caveat(ctrl, "Typical ages from the theories' authors. Stage theories describe broad patterns and are contested: many children reach these points earlier or later, and development is more continuous than discrete stages suggest.");
  const ch = challenges(ctrl, ctx, [{ id: "all", text: "Explore all four strands", test: () => Object.keys(STRANDS).every((k) => [...seen].some((x) => x.startsWith(k))) }, { id: "cmp", text: "Compare what Piaget and Erikson say about adolescence", test: () => seen.has("piaget3") && seen.has("erikson4") }]);
  let s = "piaget";
  const fa = (a) => (a < 1 ? `${Math.round(a * 12)} mo` : `${a % 1 ? a.toFixed(1) : a} y`);
  const paint = (k = 0) => { const S = STRANDS[s]; tl.innerHTML = S.items.map(([a, b, n], i) => `<button type="button" data-i="${i}" aria-pressed="${i === k}"><b>${fa(a)}–${fa(b)}</b><span>${esc(n)}</span></button>`).join(""); seen.add(`${s}${k}`); ch.check({}); const [a, b, n, d] = S.items[k]; card.innerHTML = `<h5>${esc(n)} (${fa(a)} to ${fa(b)})</h5><p>${esc(d)}</p><p><small>${esc(S.src)}</small></p>`; };
  seg($(".lab-row.sx-mode"), Object.entries(STRANDS).map(([k, v]) => [k, v.name.split(":")[0]]), s, (v) => { s = v; paint(); });
  tl.addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) paint(Number(b.dataset.i)); });
  paint();
}
