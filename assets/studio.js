// Notes Studio: turn a PDF (or pasted text) of messy notes into a study pack for every way
// of learning: clean notes, flashcards, a spidermap, a cheat-sheet poster, a narrated video,
// a chant with a beat, and an audio quiz. This preview runs entirely in the browser with
// simple rules, the browser's own voices and Web Audio. The full version runs on Gradify AI
// (see docs/AI-PIPELINE.md in the repo).
import { icon } from "./icons.js";

const $ = (s, el = document) => el.querySelector(s);
let ctx, pack = null, tab = "notes", stopPlayback = () => {};
const learnt = new Set();

export const SAMPLE = `CARDIAC CYCLE - lecture 4 notes
cardiac cycle = sequence of events in 1 heartbeat!!
- systole is the phase when ventricles contract + eject blood
-diastole is the phase when the ventricles relax and fill w/ blood
- isovolumetric contraction - all 4 valves closed, pressure rises fast
S1 (first heart sound) is caused by closure of the mitral + tricuspid valves
S2 (second heart sound) is caused by closure of aortic + pulmonary valves
stroke volume (SV) is the amount of blood ejected by each ventricle per beat
cardiac output (CO) equals stroke volume multiplied by heart rate (HR)
ECG: P wave = atrial depolarisation, QRS complex = ventricular depolarisation, T wave = ventricular repolarisation
preload = how much the ventricles stretch before they contract
afterload is the pressure the ventricle has to pump against
quiz on Friday!! lab report due 3 November`;

const STOP = new Set(("a an the and or of to in on at by for with from into is are was were be been being this that these those it its as per when which who what how all each so than then there their they them has have had not no but if about over under one two four first second also more most very can will may into".split(" ")));
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const PALETTE = ["4641ff", "ff5a4d", "1fae8c", "f055dd", "ffc002", "3c78d8", "e69138"];

// Symbols for the cheat sheet: first keyword that matches wins
const SYMBOLS = [
  [/heart|cardiac|cardio/, "❤️"], [/valve/, "🚪"], [/blood|haem|hem/, "🩸"], [/pressure|load/, "🎚️"], [/contract|pump|muscle/, "💪"],
  [/relax|fill|rest/, "🫧"], [/sound|s1|s2/, "🔊"], [/rate|time|fast|speed/, "⏱️"], [/volume|amount/, "🧪"], [/output|eject/, "📤"],
  [/wave|ecg|electr|depolari|repolari|qrs/, "⚡"], [/stretch/, "↔️"], [/drug|pharma|dose/, "💊"], [/cell/, "🦠"], [/dna|gene|inherit/, "🧬"],
  [/brain|neur|mind/, "🧠"], [/lung|breath|resp/, "🫁"], [/bone|skelet/, "🦴"], [/cycle|sequence|phase/, "🔄"], [/money|cost|price|finance/, "💷"],
  [/law|legal|court/, "⚖️"], [/code|program|software|algorithm/, "💻"], [/data|statistic|graph/, "📊"], [/energy|power/, "🔋"],
  [/plant|leaf|eco/, "🌿"], [/water/, "💧"], [/light|sun/, "☀️"], [/language|word|verb/, "🗣️"], [/equation|equal|formula/, "🟰"],
];
const symbolFor = (s) => (SYMBOLS.find(([re]) => re.test(s.toLowerCase())) || [null, "✳️"])[1];

const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
// shouted headings become sentence case; short acronyms like ATP or ECG stay as they are
const sentenceCase = (s) => (s === s.toUpperCase() && /[A-Z]{3}/.test(s) && (s.includes(" ") || s.length > 5) ? cap(s.toLowerCase()) : cap(s));
const strip = (s) => s.replace(/\s+/g, " ").trim().replace(/^[,;:.\-–\s]+|[,;:.!?\s]+$/g, "");
const words = (s) => (s.toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => w.length > 2 && !STOP.has(w)).map((w) => w.replace(/(ies)$/, "y").replace(/(s|ing|ed)$/, ""));

// ---------- 1. Clean up ----------
function normalise(raw) {
  return raw.replace(/\r/g, "")
    .replace(/-\n(?=[a-z])/g, "")
    .replace(/[•▪◦●·]\s*/g, "\n- ")
    .replace(/\bw\/o\b/gi, "without").replace(/\bw\/\s*/gi, "with ").replace(/\bb\/c\b/gi, "because")
    .replace(/\s\+\s/g, " and ").replace(/\s&\s/g, " and ").replace(/\be\.g\.?/gi, "for example").replace(/\bi\.e\.?/gi, "that is")
    .replace(/\bin 1\b/g, "in one").replace(/\ball 4\b/g, "all four").replace(/\bvs\.?\b/gi, "versus")
    .replace(/([!?])\1+/g, "$1").replace(/[ \t]+/g, " ")
    .split("\n").map((l) => l.replace(/^\s*[-*–>]+\s*/, "").trim()).filter(Boolean);
}

// ---------- 2. Dates ----------
function findDate(text) {
  const re = new RegExp(`\\b(?:on |by |due |this )?(?:(\\d{1,2})(?:st|nd|rd|th)? (${MONTHS.join("|")})|(${WEEKDAYS.join("|")}))\\b`, "i");
  const m = text.match(re);
  if (!m) return null;
  let when;
  if (m[1]) {
    when = new Date(ctx.today.getFullYear(), MONTHS.indexOf(m[2].toLowerCase()), +m[1]);
    if (when < ctx.today) when.setFullYear(when.getFullYear() + 1);
  } else {
    const diff = (WEEKDAYS.indexOf(m[3].toLowerCase()) - ctx.today.getDay() + 7) % 7 || 7;
    when = new Date(+ctx.today + diff * ctx.DAY);
  }
  const what = strip(text.replace(m[0], "").replace(/^(reminder|note|todo)\s*:?\s*/i, "")) + (/\bdue\b/i.test(m[0]) ? " due" : "");
  return { what: cap(strip(what)) || "Untitled", when, in: Math.round((when - ctx.today) / ctx.DAY) };
}

// ---------- 3. Facts ----------
function readFact(p, abbr) {
  p = strip(p);
  if (p.split(" ").length < 2) return null;
  let m, term, def, kind = "def";
  if ((m = p.match(/^(.{2,60}?) (?:is|are) caused by (.+)$/i))) { term = m[1]; def = `caused by ${m[2]}`; kind = "cause"; }
  else if ((m = p.match(/^(.{2,60}?) (?:equals?) (.+)$/i))) { term = m[1]; def = m[2]; kind = "eq"; }
  else if ((m = p.match(/^(.{1,50}?)\s*(?:=|:|\s[-–]\s)\s*(.+)$/))) { term = m[1]; def = m[2]; }
  else if ((m = p.match(/^(.{2,60}?) (?:is|are|means|refers to) (?:the |a |an )?(.+)$/i))) { term = m[1]; def = m[2]; }
  if (!term) return { text: cap(p) + "." };
  // pull abbreviations out of the term: "stroke volume (SV)" and "S1 (first heart sound)"
  let ab;
  term = term.replace(/^(the|a|an)\s+/i, "");
  if ((m = term.match(/^(.+?)\s*\(([A-Z][A-Za-z0-9]{0,5})\)$/))) { term = m[1]; ab = m[2]; }
  else if ((m = term.match(/^([A-Z][A-Z0-9]{0,5})\s*\((.+)\)$/))) { ab = m[1]; term = `${m[2]}`; }
  term = sentenceCase(strip(term));
  if (ab) abbr[term.toLowerCase()] = ab;
  // "heart rate (HR)" inside a definition: remember the abbreviation, keep the words
  def = strip(def.replace(/([A-Za-z][A-Za-z ]{1,40}?)\s*\(([A-Z][A-Za-z0-9]{0,5})\)/g, (_, t, a) => { abbr[strip(t).toLowerCase().split(/\b(?:by|of|and|the|with)\b/).pop().trim()] = a; return t; }));
  def = /^[A-Z]{2}/.test(def) ? def : def[0].toLowerCase() + def.slice(1);
  const text = kind === "cause" ? `${term}${ab ? ` (${ab})` : ""} is ${def}.` : kind === "eq" ? `${term} equals ${def}.` : `${term}${ab ? ` (${ab})` : ""}: ${def}.`;
  return { term, ab, def, kind, text };
}

function analyse(raw) {
  const lines = normalise(raw);
  let title = "My notes";
  if (lines.length && lines[0].split(" ").length <= 8 && !/[=:]| is | are /.test(lines[0])) {
    title = strip(lines.shift().split(/\s[-–]\s|:/)[0].replace(/\b(lecture|lec|week|wk)\s*\d+\b|\bnotes?\b/gi, ""))
      .replace(/\b[A-Z]{3,}\b/g, (w) => w[0] + w.slice(1).toLowerCase());
    title = cap(title.split(" ").map((w, i) => (i && /^[A-Z][a-z]+$/.test(w) ? w.toLowerCase() : w)).join(" ")) || "My notes";
  }
  const facts = [], dates = [], abbr = {};
  for (const line of lines) {
    for (let clause of line.split(/(?<=[.!?])\s+|!\s*/)) {
      clause = strip(clause);
      if (!clause) continue;
      const d = findDate(clause);
      if (d) {
        // "quiz on Friday lab report due 3 November": split into two dates if both kinds appear
        const rest = clause.replace(new RegExp(`.*?\\b(on |this )?(${WEEKDAYS.join("|")})\\b`, "i"), "").trim();
        if (rest && rest !== clause && findDate(rest)) { dates.push(findDate(clause.slice(0, clause.length - rest.length))); dates.push(findDate(rest)); }
        else dates.push(d);
        continue;
      }
      // a heading like "ECG:" followed by several "x = y" pairs
      const head = clause.match(/^([A-Za-z ]{2,20}):\s*(.+=.+,.+=.+)$/);
      const pieces = head ? head[2].split(/,\s*/) : (clause.match(/=/g) || []).length > 1 ? clause.split(/,\s*/) : [clause];
      for (const p of pieces) { const f = readFact(p, abbr); if (f) { f.src = strip(p); facts.push(f); } }
    }
  }
  // equations in symbols: "cardiac output equals stroke volume multiplied by heart rate" → CO = SV × HR
  const sym = (t) => abbr[t.toLowerCase()] || t.split(/\s+/).map((w) => w[0].toUpperCase()).join("");
  const equations = facts.filter((f) => f.kind === "eq" && /multiplied by|times|divided by|plus|minus/.test(f.def)).map((f) => {
    const parts = f.def.split(/\s+(multiplied by|times|divided by|plus|minus)\s+/);
    const op = { "multiplied by": "×", times: "×", "divided by": "÷", plus: "+", minus: "−" };
    return `${sym(f.term)} = ${parts.map((x, i) => (i % 2 ? op[x] : sym(strip(x)))).join(" ")}`;
  });
  // group facts that share meaningful words. Words used all over the notes count for
  // little; rarer shared words, and words in the terms themselves, count for more.
  const termed = facts.filter((f) => f.term);
  const df = {};
  termed.forEach((f) => new Set(words(`${f.term} ${f.def}`)).forEach((w) => { df[w] = (df[w] || 0) + 1; }));
  const idf = (w) => (df[w] / termed.length > 0.34 ? 0 : Math.log(1 + termed.length / df[w]));
  const groups = [];
  for (const f of termed) {
    const tw = new Set(words(f.term)), bag = new Set(words(`${f.term} ${f.def}`));
    let best = null, score = 0;
    for (const g of groups) {
      const s = [...bag].reduce((a, w) => a + (g.bag.has(w) ? idf(w) * (tw.has(w) && g.terms.has(w) ? 3 : 1) : 0), 0);
      if (s > score) { score = s; best = g; }
    }
    if (best && score >= 1.6 && best.facts.length < 5) { best.facts.push(f); bag.forEach((w) => best.bag.add(w)); tw.forEach((w) => best.terms.add(w)); }
    else groups.push({ facts: [f], bag, terms: tw });
  }
  // fold singletons into their closest group when there are too many groups
  while (groups.length > 5) {
    const i = groups.findIndex((g) => g.facts.length === 1);
    if (i < 0) break;
    const [single] = groups.splice(i, 1);
    const fit = (g) => [...single.bag].reduce((a, w) => a + (g.bag.has(w) ? idf(w) + 0.1 : 0), 0) - g.facts.length * 0.05;
    const target = groups.reduce((a, g) => (fit(g) > fit(a) ? g : a), groups[0]);
    target.facts.push(...single.facts);
  }
  // lots of unrelated one-fact groups read better as a single "Key terms" group
  const singles = groups.filter((g) => g.facts.length === 1);
  if (singles.length >= 3) {
    const merged = { facts: singles.flatMap((g) => g.facts), bag: new Set(), terms: new Set(), name: "Key terms" };
    groups.splice(0, groups.length, ...groups.filter((g) => g.facts.length > 1), merged);
  }
  groups.forEach((g, i) => {
    const t = g.facts.map((f) => f.term);
    g.label = g.name || (t.length === 1 ? t[0] : t.length === 2 ? `${t[0]} and ${t[1]}` : `${t.slice(0, -1).slice(0, 2).join(", ")} and ${t.length > 3 ? "more" : t[t.length - 1]}`);
    g.acronym = t.map((x) => (/^[A-Z0-9]{2,}/.test(x) ? x[0] : x[0].toUpperCase())).join("");
    // a one-word theme for the spidermap: the word this group's facts share most
    const tally = {};
    g.facts.forEach((f) => new Set(words(`${f.term} ${f.def}`)).forEach((w) => { tally[w] = (tally[w] || 0) + 1; }));
    const raw = `${g.facts.map((f) => `${f.term} ${f.def}`).join(" ")}`.toLowerCase();
    const best = Object.entries(tally).filter(([w, n]) => n > 1 && w.length > 3).sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)[0];
    const full = best && (raw.match(new RegExp(`\\b${best[0]}[a-z]*`)) || [best[0]])[0];
    g.theme = g.name || (g.facts.length > 1 && full ? cap(full) : g.facts[0].term);
    g.c = PALETTE[i % PALETTE.length];
  });
  // flashcards
  const cards = facts.map((f) => {
    if (f.term) {
      // keep capitals for acronyms and labels like "P wave"; add "the" before ordinary multi-word terms
      const keep = /^[A-Z0-9]{2,}|^[A-Z]\s/.test(f.term);
      const t = keep ? f.term : f.term[0].toLowerCase() + f.term.slice(1);
      const the = !keep && f.term.includes(" ") ? "the " : "";
      const ab = f.ab ? ` (${f.ab})` : "";
      const q = f.kind === "cause" ? `What causes ${the}${t}${ab}?` : f.kind === "eq" ? `What does ${t}${ab} equal?` : `What is ${the}${t}${ab}?`;
      return { type: "Definition", q, a: cap(f.def) + "." };
    }
    const key = (f.text.match(/[A-Za-z][A-Za-z-]{5,}/g) || []).filter((w) => !STOP.has(w.toLowerCase())).sort((a, b) => b.length - a.length)[0];
    return key ? { type: "Cloze", q: f.text.replace(key, "_____"), a: key } : null;
  }).filter(Boolean);
  return { title, facts, groups, cards, dates: dates.filter(Boolean), equations, abbr };
}

// ---------- 4. Outputs ----------
const short = (s, n = 8) => { const w = s.split(" "); return w.length > n ? w.slice(0, n).join(" ") + "…" : s; };
const bold = (f) => `<b>${ctx.esc(f.term)}</b>${f.ab ? ` <em class="ab">${ctx.esc(f.ab)}</em>` : ""} ${f.kind === "cause" ? "is " : f.kind === "eq" ? "= " : "— "}${ctx.esc(f.def)}`;

function notesView(p) {
  const loose = p.facts.filter((f) => !f.term);
  return `<article class="clean-notes">
    <h2>${ctx.esc(p.title)}</h2>
    <p class="nt-summary"><b>In short:</b> ${p.groups.length} big ideas: ${p.groups.map((g) => ctx.esc(g.theme.toLowerCase())).join(", ")}. ${p.facts.filter((f) => f.term).length} key terms${p.equations.length ? `, ${p.equations.length} equation` : ""}${p.dates.length ? ` and ${p.dates.length} ${p.dates.length === 1 ? "date" : "dates"} for your calendar` : ""}.</p>
    ${p.equations.length ? `<div class="nt-eq">${p.equations.map((e) => `<code>${ctx.esc(e)}</code>`).join("")}</div>` : ""}
    ${p.groups.map((g) => `<section style="--c:#${g.c}"><h3>${ctx.esc(g.label)} ${g.facts.length > 1 ? `<span class="acr" title="Memory hook">${g.acronym}</span>` : ""}</h3><ul>${g.facts.map((f) => `<li>${bold(f)}</li>`).join("")}</ul></section>`).join("")}
    ${loose.length ? `<section><h3>Other points</h3><ul>${loose.map((f) => `<li>${ctx.esc(f.text)}</li>`).join("")}</ul></section>` : ""}
    ${p.dates.length ? `<section class="nt-dates"><h3>Dates</h3>${p.dates.map((d, i) => `<div class="event"><span class="date"><b>${d.when.getDate()}</b>${ctx.fmt(d.when, { month: "short" })}</span><span class="ev-txt"><b>${ctx.esc(d.what)}</b><span>${ctx.fmt(d.when, { weekday: "long" })} · in ${d.in} ${d.in === 1 ? "day" : "days"}</span></span><button type="button" class="go add-date" data-i="${i}" aria-label="Add ${ctx.esc(d.what)} to calendar">+</button></div>`).join("")}</section>` : ""}
  </article>
  <div class="out-actions"><button type="button" class="btn btn-ghost lg btn-sm" data-dl="md"><span>Download notes (.md)</span></button></div>`;
}

function cardsView(p) {
  return `<div class="cap-cards">${p.cards.map((c) => `<button type="button" class="flash" aria-pressed="false"><em class="tag">${c.type}</em><span class="q">${ctx.esc(c.q)}</span><span class="a">${ctx.esc(c.a)}</span></button>`).join("")}</div>
  <div class="out-actions"><button type="button" class="btn btn-light lg btn-sm" id="add-cards"><span>Add ${p.cards.length} cards to my flashcard feed</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-dl="csv"><span>Download for Anki (.csv)</span></button></div>`;
}

function mapView(p) {
  const W = 820, H = 560, CX = W / 2, CY = H / 2;
  let links = "", nodes = "";
  p.groups.forEach((g, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / p.groups.length;
    const gx = CX + Math.cos(a) * 190, gy = CY + Math.sin(a) * 150;
    links += `<path d="M${CX} ${CY} Q${(CX + gx) / 2 + Math.sin(a) * 20} ${(CY + gy) / 2 - Math.cos(a) * 20} ${gx} ${gy}" class="sp-link" stroke="#${g.c}"/>`;
    if (g.facts.length > 1) links += `<g class="sp-acr" transform="translate(${(CX + gx) / 2} ${(CY + gy) / 2})"><rect x="-${g.acronym.length * 5 + 8}" y="-11" width="${g.acronym.length * 10 + 16}" height="22" rx="11" fill="#${g.c}"/><text y="4">${g.acronym}</text></g>`;
    g.facts.forEach((f, j) => {
      const spread = Math.min(2.4, 0.75 * (g.facts.length - 1));
      const b = a + (g.facts.length === 1 ? 0 : -spread / 2 + (spread * j) / (g.facts.length - 1));
      const fx = gx + Math.cos(b) * 108, fy = gy + Math.sin(b) * 78;
      const on = learnt.has(f.term.toLowerCase());
      const cs = Math.cos(b), sn = Math.sin(b);
      const anchor = cs > 0.35 ? "start" : cs < -0.35 ? "end" : "middle";
      const tx = anchor === "start" ? 13 : anchor === "end" ? -13 : 0, ty = anchor === "middle" ? (sn > 0 ? 24 : -15) : 4;
      links += `<line x1="${gx}" y1="${gy}" x2="${fx}" y2="${fy}" class="sp-leaf-link" stroke="#${g.c}"/>`;
      nodes += `<g class="sp-leaf ${on ? "learnt" : ""}" transform="translate(${fx.toFixed(1)} ${fy.toFixed(1)})" style="--c:#${g.c}"><circle r="${on ? 9 : 7}"/><text x="${tx}" y="${ty}" text-anchor="${anchor}">${ctx.esc(short(f.term, 3))}</text><title>${ctx.esc(f.text)}</title></g>`;
    });
    nodes += `<g class="sp-group" transform="translate(${gx.toFixed(1)} ${gy.toFixed(1)})" style="--c:#${g.c}"><circle r="34"/><text y="4">${ctx.esc(short(g.theme, 2))}</text></g>`;
  });
  nodes += `<g class="sp-centre" transform="translate(${CX} ${CY})"><circle r="52"/><text y="5">${ctx.esc(short(p.title, 3))}</text></g>`;
  return `<div class="spidermap"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Spidermap of ${ctx.esc(p.title)}">${links}${nodes}</svg></div>
    <p class="sub">Coloured pills are memory hooks: the first letters of the terms in that branch. Facts glow once you've rated them Good or Easy in the flashcard feed.</p>`;
}

function sheetSvg(p) {
  const facts = p.facts.filter((f) => f.term);
  const cols = 3, tw = 290, th = 112, pad = 20, top = 150 + (p.equations.length ? 56 : 0);
  const rows = Math.ceil(facts.length / cols);
  const H = top + rows * (th + 14) + 70;
  const colourOf = (f) => (p.groups.find((g) => g.facts.includes(f)) || { c: "888888" }).c;
  const wrap = (s, n) => { const out = []; let line = ""; for (const w of s.split(" ")) { if ((line + " " + w).trim().length > n) { out.push(line.trim()); line = w; } else line += " " + w; } out.push(line.trim()); return out.slice(0, 3); };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${pad * 2 + cols * tw + (cols - 1) * 14} ${H}" font-family="Geist, Inter, system-ui, sans-serif">
    <rect width="100%" height="100%" rx="24" fill="#0b0b0b"/>
    <text x="${pad + 4}" y="60" font-size="34" font-weight="700" fill="#fff">${ctx.esc(p.title)}</text>
    <text x="${pad + 4}" y="92" font-size="15" fill="#9a9a9a">Cheat sheet · ${facts.length} key terms · made with Gradify</text>
    <rect x="${pad + 4}" y="110" width="160" height="5" rx="2.5" fill="url(#spec)"/>
    <defs><linearGradient id="spec"><stop offset="0" stop-color="#4641ff"/><stop offset=".35" stop-color="#f055dd"/><stop offset=".7" stop-color="#ff5600"/><stop offset="1" stop-color="#ffc002"/></linearGradient></defs>
    ${p.equations.map((e, i) => `<rect x="${pad + i * 230}" y="138" width="216" height="42" rx="12" fill="#1a1a1a" stroke="#333"/><text x="${pad + i * 230 + 108}" y="166" font-size="20" font-weight="700" fill="#fff" text-anchor="middle">${ctx.esc(e)}</text>`).join("")}
    ${facts.map((f, i) => {
      const x = pad + (i % cols) * (tw + 14), y = top + Math.floor(i / cols) * (th + 14), c = colourOf(f);
      return `<g transform="translate(${x} ${y})"><rect width="${tw}" height="${th}" rx="16" fill="#151515" stroke="#${c}" stroke-opacity=".7"/>
        <circle cx="34" cy="34" r="20" fill="#${c}" fill-opacity=".25"/><text x="34" y="42" font-size="20" text-anchor="middle">${symbolFor(f.term + " " + f.def)}</text>
        <text x="64" y="32" font-size="16" font-weight="700" fill="#fff">${ctx.esc(short(f.term, 4))}${f.ab ? ` (${ctx.esc(f.ab)})` : ""}</text>
        ${wrap(f.def, 38).map((l, k) => `<text x="20" y="${70 + k * 17}" font-size="13" fill="#bdbdbd">${ctx.esc(l)}</text>`).join("")}</g>`;
    }).join("")}
    <text x="${pad + 4}" y="${H - 28}" font-size="13" fill="#8a8a8a">Memory hooks: ${p.groups.filter((g) => g.facts.length > 1).map((g) => `${g.acronym} = ${g.facts.map((f) => f.term).join(", ")}`).map(ctx.esc).join("  ·  ")}</text>
  </svg>`;
}
function sheetView(p) {
  return `<div class="sheet">${sheetSvg(p)}</div><div class="out-actions"><button type="button" class="btn btn-light lg btn-sm" data-dl="png"><span>Download poster (.png)</span></button></div>`;
}

// Video: slides with a voiceover from the browser's speech engine
function slidesOf(p) {
  const s = [{ h: p.title, sub: `${p.facts.length} key ideas in under two minutes`, say: `${p.title}. Let's go through the key ideas.`, sym: symbolFor(p.title), c: "4641ff" }];
  for (const g of p.groups) s.push({ h: g.label, pts: g.facts.map((f) => `${f.term}: ${short(f.def, 9)}`), say: g.facts.map((f) => f.kind === "cause" ? `${f.term} is ${f.def}.` : f.kind === "eq" ? `${f.term} equals ${f.def}.` : `${f.term} is ${f.def}.`).join(" "), sym: symbolFor(g.label + " " + g.facts.map((f) => f.def).join(" ")), c: g.c });
  if (p.equations.length) s.push({ h: "The equation to remember", big: p.equations[0], say: `Remember: ${p.equations[0].replace("=", "equals").replace("×", "times")}.`, sym: "🟰", c: "ffc002" });
  s.push({ h: "Now test yourself", sub: "Your flashcards are ready in the Study feed.", say: "Now test yourself with your flashcards. Recall beats re-reading.", sym: "🧠", c: "1fae8c" });
  return s;
}
function videoView(p) {
  const slides = slidesOf(p);
  return `<div class="video" id="video" data-i="0">
    ${slides.map((s, i) => `<div class="slide ${i === 0 ? "on" : ""}" style="--c:#${s.c}"><span class="sl-sym">${s.sym}</span><h4>${ctx.esc(s.h)}</h4>${s.sub ? `<p>${ctx.esc(s.sub)}</p>` : ""}${s.big ? `<p class="sl-big">${ctx.esc(s.big)}</p>` : ""}${s.pts ? `<ul>${s.pts.map((x) => `<li>${ctx.esc(x)}</li>`).join("")}</ul>` : ""}</div>`).join("")}
    <div class="caption" id="caption"></div>
    <div class="v-bar"><i id="v-prog"></i></div>
  </div>
  <div class="out-actions"><button type="button" class="btn btn-light lg btn-sm" id="v-play"><span>▶ Play with voiceover</span></button><button type="button" class="btn btn-ghost lg btn-sm" id="v-stop"><span>Stop</span></button><span class="sub">${slides.length} slides · uses your device's voice</span></div>`;
}

// Chant: lyrics on a beat, made with Web Audio
// trim a phrase to about n words without ending on a dangling little word
function lyric(s, n = 7) {
  let w = s.split(" ");
  if (w.length > n) w = w.slice(0, n);
  while (w.length > 2 && /^(and|or|of|the|a|an|to|by|with|for|in|on|before|when|has|is)$/i.test(w[w.length - 1])) w.pop();
  return w.join(" ");
}
function lyricsOf(p) {
  const big = [...p.groups].sort((a, b) => b.facts.length - a.facts.length)[0];
  const say = (e) => e.replace("=", "equals").replace("×", "times").replace("÷", "over");
  const chorus = [
    big ? big.facts.map((f) => f.term).slice(0, 4).join(", ") : p.title,
    `${p.title}, lock it in`,
    p.equations[0] ? say(p.equations[0]) : (p.groups[1] || big).facts.map((f) => f.term).slice(0, 3).join(", "),
    "Say it back and say it again",
  ];
  const verses = p.groups.map((g) => g.facts.slice(0, 4).map((f) => `${f.term}: ${lyric(f.def)}`));
  const song = [{ part: "Chorus", lines: chorus }];
  verses.forEach((v, i) => { song.push({ part: `Verse ${i + 1}`, lines: v }); if (i % 2 === 1 || i === verses.length - 1) song.push({ part: "Chorus", lines: chorus }); });
  return song;
}
function songView(p) {
  const song = lyricsOf(p);
  let n = 0;
  return `<div class="song">
    <div class="lyrics" id="lyrics">${song.map((s) => `<div class="part"><span class="kicker">${s.part}</span>${s.lines.map((l) => `<p data-n="${n++}">${ctx.esc(l)}</p>`).join("")}</div>`).join("")}</div>
    <div class="song-side">
      <div class="eq" aria-hidden="true">${"<i></i>".repeat(16)}</div>
      <p class="sub">A chant at 96 BPM: drums, bass and a hook, with each line on the beat. Repetition makes it stick.</p>
      <button type="button" class="btn btn-light lg btn-sm" id="s-play"><span>▶ Play the chant</span></button>
      <button type="button" class="btn btn-ghost lg btn-sm" id="s-stop"><span>Stop</span></button>
      <label class="switch"><input type="checkbox" id="s-voice" role="switch" checked><span class="sw-track lg" aria-hidden="true"><span class="sw-knob"></span></span><span>Voice</span></label>
      <button type="button" class="btn btn-ghost lg btn-sm" data-dl="txt"><span>Download lyrics</span></button>
    </div>
  </div>`;
}

function audioView(p) {
  return `<div class="aq">
    <div class="aq-card" id="aq-card"><span class="kicker">Audio quiz</span><p id="aq-q">Press play: each question is read out, you get a few seconds to answer out loud, then you hear the answer.</p><p id="aq-a" class="aq-a"></p><div class="v-bar"><i id="aq-timer"></i></div></div>
    <div class="out-actions"><button type="button" class="btn btn-light lg btn-sm" id="aq-play"><span>▶ Start audio quiz</span></button><button type="button" class="btn btn-ghost lg btn-sm" id="aq-stop"><span>Stop</span></button><span class="sub">${p.cards.length} questions · great for walks and commutes</span></div>
  </div>`;
}

// ---------- 5. Playback ----------
const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
function voice() {
  const vs = synth?.getVoices() || [];
  return vs.find((v) => /en-GB/i.test(v.lang) && /female|libby|sonia|serena|kate/i.test(v.name)) || vs.find((v) => /en-GB/i.test(v.lang)) || vs.find((v) => /^en/i.test(v.lang));
}
function say(text, opts = {}) {
  return new Promise((done) => {
    if (!synth) { setTimeout(done, Math.max(1500, text.split(" ").length * 380)); return; }
    const u = new SpeechSynthesisUtterance(text);
    const v = voice();
    if (v) u.voice = v;
    u.rate = opts.rate || 1;
    u.pitch = opts.pitch || 1;
    u.onend = u.onerror = () => done();
    synth.speak(u);
  });
}
const wait = (ms, token) => new Promise((r) => { const t = setTimeout(r, ms); token.timers.push(t); });

async function playVideo() {
  stopPlayback();
  const token = { stop: false, timers: [] };
  stopPlayback = () => { token.stop = true; token.timers.forEach(clearTimeout); synth?.cancel(); };
  const slides = slidesOf(pack);
  const els = [...document.querySelectorAll("#video .slide")];
  for (let i = 0; i < slides.length && !token.stop; i++) {
    els.forEach((e, j) => e.classList.toggle("on", j === i));
    $("#v-prog").style.width = `${((i + 1) / slides.length) * 100}%`;
    $("#caption").textContent = slides[i].say;
    await say(slides[i].say, { rate: 1.02 });
    if (!token.stop) await wait(500, token);
  }
  if (!token.stop) $("#caption").textContent = "";
}

async function playQuiz() {
  stopPlayback();
  const token = { stop: false, timers: [] };
  stopPlayback = () => { token.stop = true; token.timers.forEach(clearTimeout); synth?.cancel(); };
  for (let i = 0; i < pack.cards.length && !token.stop; i++) {
    const c = pack.cards[i];
    const q = c.type === "Cloze" ? c.q.replace("_____", "blank") : c.q;
    $("#aq-q").textContent = `${i + 1}. ${c.q}`;
    $("#aq-a").textContent = "";
    $("#aq-timer").style.transition = "none";
    $("#aq-timer").style.width = "100%";
    await say(`Question ${i + 1}. ${q}`);
    if (token.stop) break;
    requestAnimationFrame(() => { $("#aq-timer").style.transition = "width 4s linear"; $("#aq-timer").style.width = "0%"; });
    await wait(4000, token);
    if (token.stop) break;
    $("#aq-a").textContent = c.a;
    await say(c.a);
    await wait(900, token);
  }
}

// a tiny drum machine and synth for the chant
async function playSong() {
  stopPlayback();
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { ctx.toast("This browser can't play audio from the page."); return; }
  const ac = new AC();
  const master = ac.createGain();
  master.gain.value = 0.5;
  master.connect(ac.destination);
  const bpm = 96, beat = 60 / bpm, bar = beat * 4;
  const lines = [...document.querySelectorAll("#lyrics p")];
  const t0 = ac.currentTime + 0.15;
  const prog = [[48, 52, 55], [43, 47, 50], [45, 48, 52], [41, 45, 48]]; // C, G, Am, F
  const hz = (m) => 440 * 2 ** ((m - 69) / 12);
  const noise = ac.createBuffer(1, ac.sampleRate * 0.3, ac.sampleRate);
  noise.getChannelData(0).forEach((_, i, d) => { d[i] = Math.random() * 2 - 1; });
  const env = (node, t, a, d, peak) => { node.gain.setValueAtTime(0.0001, t); node.gain.exponentialRampToValueAtTime(peak, t + a); node.gain.exponentialRampToValueAtTime(0.0001, t + a + d); };
  const kick = (t) => { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.15); env(g, t, 0.005, 0.25, 0.9); o.connect(g).connect(master); o.start(t); o.stop(t + 0.3); };
  const hit = (t, hp, len, vol) => { const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain(); s.buffer = noise; f.type = "highpass"; f.frequency.value = hp; env(g, t, 0.002, len, vol); s.connect(f).connect(g).connect(master); s.start(t); s.stop(t + len + 0.05); };
  const tone = (t, m, len, type, vol) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = hz(m); env(g, t, 0.01, len, vol); o.connect(g).connect(master); o.start(t); o.stop(t + len + 0.05); };
  lines.forEach((_, i) => {
    const t = t0 + i * bar, ch = prog[i % 4];
    for (let b = 0; b < 4; b++) {
      const tb = t + b * beat;
      if (b % 2 === 0) kick(tb);
      else hit(tb, 1800, 0.18, 0.5);
      hit(tb, 7000, 0.04, 0.18); hit(tb + beat / 2, 7000, 0.04, 0.12);
      tone(tb, ch[0] - 12, beat * 0.9, "triangle", 0.35);
      tone(tb + beat / 2, ch[(b + 1) % 3] + 12, beat * 0.4, "square", 0.05);
    }
  });
  const token = { stop: false, timers: [] };
  const useVoice = $("#s-voice").checked;
  stopPlayback = () => { token.stop = true; token.timers.forEach(clearTimeout); synth?.cancel(); ac.close(); lines.forEach((l) => l.classList.remove("on")); $(".song")?.classList.remove("playing"); };
  $(".song").classList.add("playing");
  lines.forEach((l, i) => {
    token.timers.push(setTimeout(() => {
      lines.forEach((x) => x.classList.toggle("on", x === l));
      l.scrollIntoView({ block: "nearest", behavior: "smooth" });
      if (useVoice) { synth?.cancel(); say(l.textContent, { rate: 1.15, pitch: 1.25 }); }
    }, (t0 - ac.currentTime + i * bar) * 1000));
  });
  token.timers.push(setTimeout(() => stopPlayback(), (lines.length * bar + 0.5) * 1000));
}

// ---------- 6. Downloads ----------
function download(name, data, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(data instanceof Blob ? data : new Blob([data], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
const fileBase = () => pack.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "notes";
function downloadAs(kind) {
  if (kind === "md") {
    const md = [`# ${pack.title}`, "", ...pack.equations.map((e) => `> ${e}`), "",
      ...pack.groups.flatMap((g) => [`## ${g.label}${g.facts.length > 1 ? ` (${g.acronym})` : ""}`, ...g.facts.map((f) => `- **${f.term}**${f.ab ? ` (${f.ab})` : ""}: ${f.def}`), ""]),
      ...(pack.dates.length ? ["## Dates", ...pack.dates.map((d) => `- ${d.what}: ${ctx.fmt(d.when, { weekday: "long", day: "numeric", month: "long" })}`)] : [])].join("\n");
    download(`${fileBase()}.md`, md, "text/markdown");
  } else if (kind === "csv") {
    const q = (s) => `"${s.replace(/"/g, '""')}"`;
    download(`${fileBase()}-flashcards.csv`, pack.cards.map((c) => `${q(c.q)},${q(c.a)}`).join("\n"), "text/csv");
  } else if (kind === "txt") {
    download(`${fileBase()}-chant.txt`, lyricsOf(pack).map((s) => `[${s.part}]\n${s.lines.join("\n")}`).join("\n\n"), "text/plain");
  } else if (kind === "png") {
    const svg = $(".sheet svg");
    const vb = svg.viewBox.baseVal;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = vb.width * 2; c.height = vb.height * 2;
      const g = c.getContext("2d");
      g.scale(2, 2);
      g.drawImage(img, 0, 0, vb.width, vb.height);
      c.toBlob((b) => download(`${fileBase()}-cheat-sheet.png`, b));
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
  }
}

// ---------- 7. PDF reading (pdf.js, bundled with the site) ----------
let pdfReady;
function loadPdfJs() {
  pdfReady ||= new Promise((ok, fail) => {
    const s = document.createElement("script");
    s.src = "assets/vendor/pdfjs/pdf.min.js";
    s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = "assets/vendor/pdfjs/pdf.worker.min.js"; ok(window.pdfjsLib); };
    s.onerror = fail;
    document.head.appendChild(s);
  });
  return pdfReady;
}
export async function readFile(file) {
  if (/\.pdf$/i.test(file.name) || file.type === "application/pdf") {
    const lib = await loadPdfJs();
    const doc = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
    let text = "";
    for (let i = 1; i <= Math.min(doc.numPages, 40); i++) {
      const page = await doc.getPage(i);
      const tc = await page.getTextContent();
      text += tc.items.map((it) => it.str + (it.hasEOL ? "\n" : "")).join("") + "\n";
    }
    return text;
  }
  return file.text();
}

// ---------- 8. UI ----------
const TABS = [
  { id: "notes", name: "Clean notes", i: "book", type: "Read and write" },
  { id: "cards", name: "Flashcards", i: "layers", type: "Active recall" },
  { id: "map", name: "Spidermap", i: "route", type: "Visual" },
  { id: "sheet", name: "Cheat sheet", i: "palette", type: "Visual" },
  { id: "video", name: "Video", i: "sparkles", type: "Watch and listen" },
  { id: "song", name: "Chant", i: "music", type: "Listen and repeat" },
  { id: "audio", name: "Audio quiz", i: "bell", type: "Listen and answer" },
];
function render() {
  stopPlayback();
  $("#studio-tabs").innerHTML = TABS.map((t) => `<button type="button" class="st-tab" role="tab" data-tab="${t.id}" aria-selected="${t.id === tab}" ${pack ? "" : "disabled"}>${icon(t.i)}<span><b>${t.name}</b><em>${t.type}</em></span></button>`).join("");
  const out = $("#studio-out");
  if (!pack) { out.innerHTML = '<p class="empty-note">Your study pack appears here: clean notes, flashcards, a spidermap, a cheat sheet, a narrated video, a chant and an audio quiz.</p>'; return; }
  if (!pack.facts.length) { out.innerHTML = '<p class="empty-note">No facts found. Try notes with lines like “systole is the phase when the ventricles contract” or “stroke volume = blood pumped per beat”.</p>'; return; }
  out.innerHTML = { notes: notesView, cards: cardsView, map: mapView, sheet: sheetView, video: videoView, song: songView, audio: audioView }[tab](pack);
}

async function make() {
  const status = $("#studio-status");
  let text = $("#notes").value.trim();
  if (/youtu\.?be/.test(text) && text.split(/\s+/).length < 4) {
    status.textContent = "YouTube links need the Gradify AI service, which comes with accounts. For now, paste the video's transcript instead.";
    return;
  }
  if (!text) { $("#notes").value = SAMPLE; text = SAMPLE; }
  pack = analyse(text);
  status.textContent = `Found ${pack.facts.length} facts in ${pack.groups.length} ${pack.groups.length === 1 ? "group" : "groups"}, ${pack.cards.length} flashcards${pack.dates.length ? ` and ${pack.dates.length} ${pack.dates.length === 1 ? "date" : "dates"}` : ""}.`;
  tab = "notes";
  render();
}

// The notes after tidying (bullets, shorthand), as the extractor saw them
export const normaliseNotes = (raw) => normalise(raw).join("\n");

// The browser extractor on its own, for the Gradify app and the eval script
export function analyseNotes(raw, today = new Date()) {
  const prev = ctx;
  const t = new Date(today); t.setHours(0, 0, 0, 0);
  ctx = { ...(prev || {}), today: t, DAY: 864e5 };
  try { return analyse(raw); } finally { ctx = prev; }
}

export function initStudio(context) {
  ctx = context;
  const root = $("#capture");
  $("#sample-notes").addEventListener("click", () => { $("#notes").value = SAMPLE; make(); });
  $("#make-cards").addEventListener("click", make);
  const file = $("#notes-file");
  const drop = $("#dropzone");
  const take = async (f) => {
    if (!f) return;
    $("#studio-status").textContent = `Reading ${f.name}…`;
    try { $("#notes").value = (await readFile(f)).trim(); make(); }
    catch { $("#studio-status").textContent = "Couldn't read that file. Try a PDF with selectable text, or a .txt file. (Scanned handwriting needs the full version.)"; }
  };
  file.addEventListener("change", () => take(file.files[0]));
  drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("over"); });
  drop.addEventListener("dragleave", () => drop.classList.remove("over"));
  drop.addEventListener("drop", (e) => { e.preventDefault(); drop.classList.remove("over"); take(e.dataTransfer.files[0]); });
  root.addEventListener("click", (e) => {
    const t = e.target.closest("[data-tab]");
    if (t) { tab = t.dataset.tab; render(); return; }
    const f = e.target.closest(".flash");
    if (f) { f.setAttribute("aria-pressed", String(f.getAttribute("aria-pressed") !== "true")); return; }
    const dl = e.target.closest("[data-dl]");
    if (dl) { downloadAs(dl.dataset.dl); return; }
    if (e.target.closest("#add-cards")) {
      const btn = e.target.closest("#add-cards");
      document.dispatchEvent(new CustomEvent("lifeos:cards", { detail: pack.cards }));
      ctx.logActivity("MedGradify", `Made ${pack.cards.length} flashcards from notes`, "capture", Math.min(40, pack.cards.length * 5));
      btn.disabled = true;
      btn.querySelector("span").textContent = "Added ✓ They're in your flashcard feed";
      return;
    }
    const d = e.target.closest(".add-date");
    if (d) {
      const x = pack.dates[+d.dataset.i];
      ctx.addEvent({ in: x.in, what: x.what, site: "UnderGradify" });
      d.disabled = true; d.textContent = "✓";
      ctx.toast(`Added “${ctx.esc(x.what)}” to your calendar.`);
      return;
    }
    if (e.target.closest("#v-play")) playVideo();
    if (e.target.closest("#s-play")) playSong();
    if (e.target.closest("#aq-play")) playQuiz();
    if (e.target.closest("#v-stop, #s-stop, #aq-stop")) stopPlayback();
  });
  // facts rated Good or Easy in the flashcard feed light up on the spidermap
  document.addEventListener("lifeos:learnt", (e) => {
    if (!pack) return;
    const text = e.detail.toLowerCase();
    for (const f of pack.facts) if (f.term && text.includes(f.term.toLowerCase())) learnt.add(f.term.toLowerCase());
    if (tab === "map") render();
  });
  document.addEventListener("lifeos:view", (e) => { if (e.detail !== "capture") stopPlayback(); });
  render();
}
