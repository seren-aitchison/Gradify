// Social movements timeline: selected movements and turning points from the 1830s to the 2010s, with the sociological
// concepts each illustrates. Dates are the conventional reference dates for each event.
import { shell, seg, challenges } from "../lab.js";
import { caveat, esc } from "../social/ui.js";

export const EVENTS = [
  [1838, "Chartism (UK)", "The People's Charter demanded votes for all men and secret ballots; mass petitions were presented to Parliament in 1839, 1842 and 1848.", "An early working-class movement using petitions and mass meetings: resource mobilisation without the vote.", "old"],
  [1903, "Women's Social and Political Union (UK)", "Founded by Emmeline Pankhurst; militant suffrage campaigning. Some women gained the vote in 1918 and equal franchise came in 1928.", "Repertoires of contention: from petitions to direct action; debates about violence and legitimacy.", "old"],
  [1955, "Montgomery bus boycott (US)", "After Rosa Parks's arrest, a 381-day boycott; the Civil Rights Act followed in 1964 and the Voting Rights Act in 1965.", "Political opportunity structures and the role of churches and networks as mobilising structures (McAdam, 1982).", "new"],
  [1958, "Campaign for Nuclear Disarmament (UK)", "Founded in 1958; Aldermaston marches.", "Middle-class, issue-based mobilisation of the kind later called new social movements.", "new"],
  [1969, "Stonewall uprising (US)", "Protests after a police raid on a New York gay bar; the first Pride marches followed in 1970.", "Collective identity and the politics of recognition (new social movements, Melucci).", "new"],
  [1981, "Greenham Common women's peace camp (UK)", "A women-only camp against cruise missiles, from 1981 to 2000.", "Feminist and peace movement tactics; prefigurative politics.", "new"],
  [1984, "Miners' strike (UK)", "A year-long strike against pit closures (1984–85).", "Class-based labour movement in decline; state and media framing.", "old"],
  [1999, "Seattle WTO protests", "Mass protests against the World Trade Organization's meeting.", "Global justice movement: transnational networks and global civil society.", "global"],
  [2011, "Arab Spring and Occupy", "Uprisings across North Africa and the Middle East from late 2010; Occupy Wall Street from September 2011.", "Networked movements and social media (Castells, 2012); debates about how much technology causes mobilisation.", "global"],
  [2013, "Black Lives Matter", "Began as a hashtag in 2013 and grew into mass protests, especially in 2014 and 2020.", "Hashtag activism, decentralised organisation and the framing of racial injustice.", "global"],
  [2017, "#MeToo", "A hashtag campaign (the phrase was first used by Tarana Burke in 2006) that spread worldwide in 2017.", "Digital consciousness-raising; online and offline effects on norms and institutions.", "global"],
  [2018, "School strikes for climate", "Started by Greta Thunberg in Sweden in August 2018; global strikes in 2019.", "Youth-led global environmental movement; frame alignment around intergenerational justice.", "global"],
];
const TYPES = { old: "Labour and citizenship", new: "New social movements", global: "Global and networked movements" };
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row sx-mode"></div><div class="sx-panel"><div class="sx-time sx-btns"></div><div class="sx-card" aria-live="polite"></div></div><div class="lab-ctrl"></div>`);
  const tl = $(".sx-time"), card = $(".sx-card"), ctrl = $(".lab-ctrl"), seen = new Set();
  caveat(ctrl, "A small selection to illustrate concepts, not a complete history. “Old” and “new” social movements is itself a contested distinction (Calhoun, 1993).");
  const ch = challenges(ctrl, ctx, [{ id: "all", text: "Explore every movement", test: () => seen.size >= EVENTS.length }, { id: "types", text: "Compare an old, a new and a networked movement", test: () => ["old", "new", "global"].every((t) => EVENTS.some((e, i) => e[4] === t && seen.has(i))) }]);
  let f = "all";
  const paint = () => { tl.innerHTML = EVENTS.map((e, i) => [e, i]).filter(([e]) => f === "all" || e[4] === f).map(([e, i]) => `<button type="button" data-i="${i}"><b>${e[0]}</b><span>${esc(e[1])}</span></button>`).join(""); };
  seg($(".lab-row.sx-mode"), [["all", "All"], ...Object.entries(TYPES)], f, (v) => { f = v; paint(); });
  tl.addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (!b) return; const i = Number(b.dataset.i), E = EVENTS[i]; seen.add(i); ch.check({}); tl.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b)); card.innerHTML = `<h5>${E[0]}: ${esc(E[1])}</h5><p>${esc(E[2])}</p><p><b>Sociological lens:</b> ${esc(E[3])}</p><p><small>${esc(TYPES[E[4]])}</small></p>`; });
  paint(); tl.querySelector("button").click();
}
