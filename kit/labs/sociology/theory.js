// Theory lab (ctx.mode):
//   timeline  sociologists on one timeline, with a key work and idea for each (dates of birth, death and first publication)
//   compare   Marx, Durkheim and Weber side by side on eight questions, then sort paraphrased ideas to their author
// Ideas are paraphrased in our own words, not quoted.
import { shell, seg, challenges, canvas, clear, line, text, circle, C } from "../lab.js";
import { caveat, sorter, table, esc } from "../social/ui.js";

export const THEORISTS = [
  ["Auguste Comte", 1798, 1857, "Course in Positive Philosophy (1830–42)", "Named sociology and argued society could be studied scientifically (positivism), through a law of three stages of thought.", "classical"],
  ["Harriet Martineau", 1802, 1876, "How to Observe Morals and Manners (1838)", "Wrote one of the first books on social research method; translated Comte; analysed slavery, marriage and women's position.", "classical"],
  ["Karl Marx", 1818, 1883, "Capital, volume 1 (1867)", "History is driven by class conflict over the means of production; capitalism exploits and alienates workers.", "classical"],
  ["Friedrich Engels", 1820, 1895, "The Condition of the Working Class in England (1845)", "Documented industrial poverty in Manchester; co-wrote the Communist Manifesto (1848) and linked the family to private property (1884).", "classical"],
  ["Émile Durkheim", 1858, 1917, "Suicide (1897)", "Social facts are external to individuals and constrain them; social solidarity and integration explain even suicide rates.", "classical"],
  ["Georg Simmel", 1858, 1918, "The Metropolis and Mental Life (1903)", "Studied the forms of social interaction, money and the blasé attitude of city life.", "classical"],
  ["Max Weber", 1864, 1920, "The Protestant Ethic and the Spirit of Capitalism (1904–05)", "Social action must be understood (Verstehen); ideas such as religion can shape economic change; modernity brings rationalisation and bureaucracy.", "classical"],
  ["W. E. B. Du Bois", 1868, 1963, "The Souls of Black Folk (1903)", "Pioneered empirical urban sociology (The Philadelphia Negro, 1899) and described double consciousness under racism.", "classical"],
  ["George Herbert Mead", 1863, 1931, "Mind, Self and Society (1934, from lectures)", "The self develops through social interaction and taking the role of the other (the I and the me).", "interpretive"],
  ["Antonio Gramsci", 1891, 1937, "Prison Notebooks (written 1929–35)", "Ruling classes govern through hegemony, winning consent through culture, not only force.", "conflict"],
  ["Alfred Schutz", 1899, 1959, "The Phenomenology of the Social World (1932)", "Brought phenomenology to sociology: everyday life rests on taken-for-granted, shared stocks of knowledge.", "interpretive"],
  ["Talcott Parsons", 1902, 1979, "The Social System (1951)", "Structural functionalism: society as a system whose parts meet functional needs and maintain equilibrium.", "consensus"],
  ["Theodor Adorno", 1903, 1969, "Dialectic of Enlightenment (with Horkheimer, 1944)", "Frankfurt School critical theory: the culture industry produces standardised culture that encourages conformity.", "conflict"],
  ["Herbert Blumer", 1900, 1987, "Symbolic Interactionism (1969)", "Coined “symbolic interactionism”: people act on the meanings things have for them, which arise in interaction.", "interpretive"],
  ["Robert K. Merton", 1910, 2003, "Social Theory and Social Structure (1949)", "Manifest and latent functions, dysfunctions, middle-range theory and strain theory of deviance (1938).", "consensus"],
  ["C. Wright Mills", 1916, 1962, "The Sociological Imagination (1959)", "Connect personal troubles to public issues of social structure and history.", "conflict"],
  ["Harold Garfinkel", 1917, 2011, "Studies in Ethnomethodology (1967)", "Ethnomethodology: how people produce social order in everyday interaction, revealed by breaching experiments.", "interpretive"],
  ["Erving Goffman", 1922, 1982, "The Presentation of Self in Everyday Life (1956)", "Dramaturgy: social life as performance, with front and back stage; also stigma and total institutions.", "interpretive"],
  ["Zygmunt Bauman", 1925, 2017, "Liquid Modernity (2000)", "In liquid modernity, identities, relationships and institutions are fluid and uncertain.", "late"],
  ["Michel Foucault", 1926, 1984, "Discipline and Punish (1975)", "Power works through knowledge and surveillance, producing self-disciplining subjects.", "late"],
  ["Peter Berger", 1929, 2017, "The Social Construction of Reality (with Luckmann, 1966)", "Reality is socially constructed: externalised, objectified and internalised through socialisation.", "interpretive"],
  ["Pierre Bourdieu", 1930, 2002, "Distinction (1979)", "Habitus, field and economic, cultural and social capital explain how class is reproduced through taste and education.", "late"],
  ["Stuart Hall", 1932, 2014, "Policing the Crisis (with others, 1978)", "Cultural studies: media, race and identity; how moral panics serve hegemony.", "conflict"],
  ["Anthony Giddens", 1938, null, "The Constitution of Society (1984)", "Structuration: structure and agency produce each other through routine social practice.", "late"],
  ["Ann Oakley", 1944, null, "The Sociology of Housework (1974)", "Housework is work; challenged the conventional gendered division of labour.", "feminist"],
  ["Ulrich Beck", 1944, 2015, "Risk Society (1986)", "Late modern societies are organised around manufactured risks they themselves create.", "late"],
  ["Raewyn Connell", 1944, null, "Masculinities (1995)", "Hegemonic masculinity: a dominant form of masculinity that legitimates gender inequality.", "feminist"],
  ["Patricia Hill Collins", 1948, null, "Black Feminist Thought (1990)", "Black women's standpoint and the matrix of domination.", "feminist"],
  ["Judith Butler", 1956, null, "Gender Trouble (1990)", "Gender is performative: produced through repeated acts rather than expressing an inner essence.", "feminist"],
  ["Kimberlé Crenshaw", 1959, null, "“Demarginalizing the Intersection of Race and Sex” (1989)", "Intersectionality: race and gender combine to produce distinct forms of discrimination.", "feminist"],
];
const GROUPS = { classical: ["Classical founders", "#fbbf24"], consensus: ["Functionalism", "#34d399"], conflict: ["Conflict and critical theory", "#ef4444"], interpretive: ["Interpretive sociology", "#5aa0ff"], feminist: ["Feminisms and intersectionality", "#ec4899"], late: ["Late modern theory", "#a78bfa"] };

export const COMPARE = [
  ["What holds society together, or pulls it apart?", "Class conflict: society is divided between those who own the means of production and those who sell their labour.", "Shared values and solidarity: mechanical (likeness) in simple societies, organic (interdependence) in complex ones.", "Several sources: class, status and party (power) all structure inequality and conflict."],
  ["What drives social change?", "Contradictions in the economy (historical materialism): conflict between classes.", "Growing population density and the division of labour.", "Ideas and values as well as material interests, e.g. the Protestant ethic; the long-term process of rationalisation."],
  ["What is the problem with modern society?", "Exploitation and alienation under capitalism.", "Anomie: normlessness when change outpaces regulation.", "The iron cage of rationality and bureaucracy: efficient but disenchanting."],
  ["Religion", "Ideology: “the opium of the people”, easing suffering and legitimating inequality.", "Integrates society: worshipping the sacred is worshipping society itself.", "Can drive social change: Calvinism helped produce the spirit of capitalism."],
  ["How should sociology study society?", "Historical analysis of material conditions, linked to political action.", "Treat social facts as things: measure them, like a natural scientist (Suicide's statistics).", "Interpretive understanding (Verstehen) of the meanings behind social action, with ideal types."],
  ["Structure or agency?", "Structure dominates (people make history, but not in conditions they choose).", "Structure: social facts constrain individuals.", "Gives more room to agency and meaning, within structures."],
  ["Main criticism", "Economic reductionism; predicted revolutions didn't happen in advanced capitalist societies.", "Overstates consensus; official suicide statistics are themselves social constructions (Atkinson, 1978).", "Ideal types can be hard to test; the causal claim about Protestantism is disputed by historians."],
  ["Legacy", "Conflict theory, neo-Marxism, critical theory, Marxist feminism.", "Functionalism, the study of social integration and quantitative sociology.", "Interpretive sociology, organisational and political sociology, the study of modernity."],
];
export const IDEAS = [
  { t: "Workers become estranged from what they make and from their own human nature", cat: "Marx" }, { t: "Rising suicide rates reflect too little or too much integration and regulation", cat: "Durkheim" },
  { t: "Bureaucracy is the most technically efficient form of organisation", cat: "Weber" }, { t: "The ruling ideas of every age are the ideas of its ruling class", cat: "Marx" },
  { t: "Crime is normal and can strengthen shared values by marking moral boundaries", cat: "Durkheim" }, { t: "Charisma is one of three ways rule becomes legitimate", cat: "Weber" },
  { t: "The division of labour creates organic solidarity through interdependence", cat: "Durkheim" }, { t: "Status groups based on prestige and lifestyle are distinct from classes", cat: "Weber" },
];
export function mount(el, ctx = {}) { return (ctx.mode === "compare" ? compare : timeline)(el, ctx); }
function timeline(el, ctx) {
  const $ = shell(el, `<div class="lab-stage"></div><div class="lab-cols"><div><div class="sx-btns sx-list" role="group" aria-label="Theorists"></div></div><div class="lab-ctrl"><div class="sx-card" aria-live="polite"></div></div></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.42, max: 300 }), btns = $(".sx-btns"), card = $(".sx-card"), ctrl = $(".lab-ctrl"), seen = new Set();
  const ch = challenges(ctrl, ctx, [{ id: "founders", text: "Read about Marx, Durkheim and Weber", test: () => ["Karl Marx", "Émile Durkheim", "Max Weber"].every((n) => seen.has(n)) }, { id: "groups", text: "Read about someone from every tradition", test: () => Object.keys(GROUPS).every((g) => THEORISTS.some((x) => x[5] === g && seen.has(x[0]))) }]);
  btns.innerHTML = THEORISTS.map((x, i) => `<button type="button" data-i="${i}" style="border-color:${GROUPS[x[5]][1]}55">${esc(x[0])}</button>`).join("");
  let sel = 6;
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); const X = (y) => 30 + ((y - 1790) / (2026 - 1790)) * (W - 60);
    for (let y = 1800; y <= 2020; y += 20) { line(g, [[X(y), 20], [X(y), H - 20]], "rgba(255,255,255,.06)", 1); text(g, String(y), X(y), H - 6, { align: "center", size: 10, color: C.mute }); }
    THEORISTS.forEach((x, i) => { const y = 24 + (i % 15) * ((H - 50) / 15), col = GROUPS[x[5]][1]; line(g, [[X(x[1]), y], [X(x[2] ?? 2026), y]], i === sel ? "#fff" : col, i === sel ? 4 : 2.5); const m = x[3].match(/\((\d{4})/); if (m) circle(g, X(+m[1]), y, 3.5, "#fff"); });
    let lx = 30; Object.values(GROUPS).forEach(([n, c]) => { text(g, `● ${n}`, lx, 12, { size: 10, color: c }); lx += n.length * 5.6 + 22; });
  }
  function show(i) { sel = i; seen.add(THEORISTS[i][0]); ch.check({}); const [n, b, d, w, idea, grp] = THEORISTS[i]; card.innerHTML = `<h5>${esc(n)} (${b}–${d ?? ""})</h5><p><b>${esc(GROUPS[grp][0])}.</b> ${esc(idea)}</p><p><small>Key work: ${esc(w)}</small></p>`; btns.querySelectorAll("button").forEach((b2) => b2.setAttribute("aria-pressed", Number(b2.dataset.i) === i)); draw(); }
  btns.addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) show(Number(b.dataset.i)); });
  caveat(ctrl, "Lines run from birth to death; a white dot marks the key work's date. Traditions are rough groupings: many theorists fit more than one.");
  show(6); cv.onresize = draw;
  return () => cv.stop();
}
function compare(el, ctx) {
  const $ = shell(el, `<div class="lab-row sx-mode"></div><div class="sx-panel"></div><div class="lab-ctrl"></div>`);
  const host = $(".sx-panel"), ctrl = $(".lab-ctrl"), seen = new Set();
  caveat(ctrl, "Summaries in our own words. Each thinker's views developed over a lifetime and are interpreted differently by different scholars.");
  const ch = challenges(ctrl, ctx, [{ id: "all", text: "Compare the three on every question", test: () => seen.size >= COMPARE.length }]);
  function grid() {
    host.innerHTML = `<div class="sx-btns sx-list" role="group" aria-label="Questions">${COMPARE.map((r, i) => `<button type="button" data-i="${i}">${esc(r[0])}</button>`).join("")}</div><div class="sx-out"></div>`;
    const show = (i) => { seen.add(i); ch.check({}); host.querySelectorAll("[data-i]").forEach((b) => b.setAttribute("aria-pressed", Number(b.dataset.i) === i)); host.querySelector(".sx-out").innerHTML = `<h4>${esc(COMPARE[i][0])}</h4><div class="sx-grid3">${["Marx", "Durkheim", "Weber"].map((n, k) => `<div class="sx-card"><h5>${n}</h5><p>${esc(COMPARE[i][k + 1])}</p></div>`).join("")}</div>`; };
    host.addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) show(Number(b.dataset.i)); }); show(0);
  }
  function sort() { host.innerHTML = ""; sorter(host, ctx, { id: "who", prompt: "Whose idea is it? (Paraphrased, not quoted.)", cats: ["Marx", "Durkheim", "Weber"], items: IDEAS, why: "Recognising each theorist's characteristic concerns (class and alienation; solidarity and social facts; meaning, rationalisation and legitimacy) is the first step to comparing them." }); }
  seg($(".lab-row.sx-mode"), [["grid", "Compare"], ["sort", "Whose idea?"]], "grid", (v) => (v === "sort" ? sort() : grid()));
  grid();
}
