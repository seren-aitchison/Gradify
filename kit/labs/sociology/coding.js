// Qualitative coding: code excerpts from invented interviews with gig-economy delivery riders, then group codes into
// themes, as in thematic analysis (Braun and Clarke, 2006). One defensible coding is given as feedback; real coding is
// interpretive, and two careful researchers can disagree.
import { shell, seg } from "../lab.js";
import { caveat, sorter } from "../social/ui.js";

export const EXCERPTS = [
  { t: "“The app decides everything. If my rating drops, I just get fewer orders, and nobody tells me why.”", cat: "Algorithmic control" },
  { t: "“Some weeks I make decent money, other weeks barely anything. I can't plan rent.”", cat: "Income insecurity" },
  { t: "“I like that I can log off when I want. Nobody's standing over me.”", cat: "Flexibility and autonomy" },
  { t: "“If I get injured there's no sick pay. You just don't work.”", cat: "Income insecurity" },
  { t: "“They call us partners, but we can't negotiate anything.”", cat: "Algorithmic control" },
  { t: "“We have a group chat where riders warn each other about bad restaurants.”", cat: "Solidarity and support" },
  { t: "“It fits round my studies, which a normal job wouldn't.”", cat: "Flexibility and autonomy" },
  { t: "“When the app changed the pay formula, a lot of us joined the strike.”", cat: "Solidarity and support" },
];
export const CODES = [
  { t: "Pay varies week to week", cat: "Precarity" }, { t: "No sick pay or holiday pay", cat: "Precarity" }, { t: "Opaque rating and allocation system", cat: "Control" },
  { t: "No negotiation with the platform", cat: "Control" }, { t: "Choosing when to work", cat: "Freedom" }, { t: "Informal mutual help", cat: "Collective responses" }, { t: "Collective action over pay", cat: "Collective responses" },
];
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row sx-mode"></div><div class="sx-panel"></div><div class="lab-ctrl"></div>`);
  const host = $(".sx-panel");
  caveat($(".lab-ctrl"), "The riders and quotations are invented for practice. In real research, coding stays close to the data, codes are defined in a codebook, and decisions are recorded so others can follow them (an audit trail).");
  const step1 = () => { host.innerHTML = ""; sorter(host, ctx, { id: "codes", prompt: "Step 1: give each excerpt the best-fitting code.", cats: ["Algorithmic control", "Income insecurity", "Flexibility and autonomy", "Solidarity and support"], items: EXCERPTS, why: "Notice that the data contain both constraint (control, insecurity) and agency (flexibility, solidarity): a good analysis keeps both." }); };
  const step2 = () => { host.innerHTML = ""; sorter(host, ctx, { id: "themes", prompt: "Step 2: group these more detailed codes into themes.", cats: ["Precarity", "Control", "Freedom", "Collective responses"], items: CODES, why: "Themes are broader patterns of meaning built from codes. A strong report would then link them to theory: for example precarity (Standing, 2011) and algorithmic management." }); };
  seg($(".lab-row.sx-mode"), [["1", "Step 1: coding"], ["2", "Step 2: themes"]], "1", (v) => (v === "2" ? step2() : step1()));
  step1();
}
