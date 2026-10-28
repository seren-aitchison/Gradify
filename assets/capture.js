// Capture: turn pasted notes into flashcards and calendar dates. This runs for real in the
// browser with simple rules (definitions become Q&A cards, other facts become cloze cards).
// The full version will use Gradify AI and accept PDFs, photos, voice and handwriting.
const $ = (s, el = document) => el.querySelector(s);
let ctx, cards = [], dates = [];

const SAMPLE = `The cardiac cycle is the sequence of events in one heartbeat. Systole is the phase when the ventricles contract and eject blood. Diastole is the phase when the ventricles relax and fill with blood. The first heart sound (S1) is caused by the closure of the mitral and tricuspid valves. The second heart sound (S2) is caused by the closure of the aortic and pulmonary valves. Stroke volume is the amount of blood ejected by each ventricle per beat. Cardiac output equals stroke volume multiplied by heart rate. During isovolumetric contraction all four valves are closed, so ventricular pressure rises quickly.

Reminder: physiology quiz on Friday. Lab report due 3 November.`;

const STOP = new Set("about above after again against because before being below between during further having other should their there these those through under until where which while would with without from into than that this then when what your blood".split(" "));
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const lowerFirst = (s) => (/^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s);
const tidy = (s) => s.replace(/\s+/g, " ").trim().replace(/[.;:]$/, "");

function makeCards(text) {
  const out = [];
  const sentences = text.replace(/([^.!?\s])\s*\n+/g, "$1. ").replace(/\s*\n+/g, " ").split(/(?<=[.!?])\s+/).map(tidy).filter((s) => s.split(" ").length >= 5);
  for (const s of sentences) {
    if (/^(reminder|note|todo)\b/i.test(s) || findDates(s).length) continue;
    let m;
    if ((m = s.match(/^(.+?) is caused by (.+)$/i))) out.push({ type: "Definition", q: `What causes ${lowerFirst(m[1])}?`, a: `${m[2][0].toUpperCase()}${m[2].slice(1)}.` });
    else if ((m = s.match(/^(.+?) equals (.+)$/i))) out.push({ type: "Definition", q: `What does ${lowerFirst(m[1])} equal?`, a: `${m[2][0].toUpperCase()}${m[2].slice(1)}.` });
    else if ((m = s.match(/^(.{3,60}?) (is|are) (the|a|an) (.+)$/i))) out.push({ type: "Definition", q: `What ${m[2]} ${lowerFirst(m[1])}?`, a: `${m[3][0].toUpperCase()}${m[3].slice(1)} ${m[4]}.` });
    else {
      // cloze: blank out the most specific-looking word
      const words = s.match(/[A-Za-z][A-Za-z-]{5,}/g) || [];
      const key = words.filter((w) => !STOP.has(w.toLowerCase())).sort((a, b) => b.length - a.length)[0];
      if (key) out.push({ type: "Cloze", q: `${s.replace(key, "_____")}.`, a: key });
    }
    if (out.length >= 8) break;
  }
  return out;
}

function findDates(text) {
  const found = [];
  const today = ctx.today;
  const re = new RegExp(`(.{0,60}?)\\b(?:on |by |due |this )?(?:(\\d{1,2})(?:st|nd|rd|th)? (${MONTHS.join("|")})|(${DAYS.join("|")}))\\b`, "gi");
  for (const sentence of text.split(/(?<=[.!?\n])\s*/)) {
    re.lastIndex = 0;
    const m = re.exec(sentence);
    if (!m) continue;
    let when;
    if (m[2]) {
      when = new Date(today.getFullYear(), MONTHS.indexOf(m[3].toLowerCase()), +m[2]);
      if (when < today) when.setFullYear(when.getFullYear() + 1);
    } else {
      const target = DAYS.indexOf(m[4].toLowerCase());
      const diff = (target - today.getDay() + 7) % 7 || 7;
      when = new Date(+today + diff * ctx.DAY);
    }
    const what = tidy(sentence.replace(/^(reminder|note|todo)\s*:\s*/i, "").replace(m[0].slice(m[1].length), "")).replace(/\b(on|by|due|this)$/i, "").trim();
    const title = (what || "Untitled") + (/\bdue\b/i.test(m[0]) && !/due$/i.test(what) ? " due" : "");
    found.push({ what: title[0].toUpperCase() + title.slice(1), when, in: Math.round((when - today) / ctx.DAY) });
  }
  return found;
}

function render() {
  const out = $("#capture-out");
  if (!cards.length && !dates.length) {
    out.innerHTML = '<p class="empty-note">No flashcards found. Try notes with full sentences, like “Systole is the phase when the ventricles contract.”</p>';
    return;
  }
  out.innerHTML = `
    ${cards.length ? `<div class="out-head"><b>${cards.length} flashcards</b><span>Tap a card to flip it</span></div>
    <div class="cap-cards">${cards.map((c) => `<button type="button" class="flash" aria-pressed="false"><em class="tag">${c.type}</em><span class="q">${ctx.esc(c.q)}</span><span class="a">${ctx.esc(c.a)}</span></button>`).join("")}</div>
    <button type="button" class="btn btn-light lg btn-sm" id="add-cards"><span>Add to my spaced-repetition reviews</span></button>` : ""}
    ${dates.length ? `<div class="out-head"><b>${dates.length} ${dates.length === 1 ? "date" : "dates"} found</b><span>Add them to your calendar</span></div>
    <div class="cap-dates">${dates.map((d, i) => `<div class="event"><span class="date"><b>${d.when.getDate()}</b>${ctx.fmt(d.when, { month: "short" })}</span>
      <span class="ev-txt"><b>${ctx.esc(d.what)}</b><span>${ctx.fmt(d.when, { weekday: "long" })} · in ${d.in} ${d.in === 1 ? "day" : "days"}</span></span>
      <button type="button" class="go add-date" data-i="${i}" aria-label="Add ${ctx.esc(d.what)} to calendar">+</button></div>`).join("")}</div>` : ""}`;
}

export function initCapture(context) {
  ctx = context;
  $("#sample-notes").addEventListener("click", () => { $("#notes").value = SAMPLE; $("#notes").focus(); });
  $("#make-cards").addEventListener("click", () => {
    const text = $("#notes").value.trim();
    if (!text) { $("#notes").value = SAMPLE; }
    cards = makeCards($("#notes").value);
    dates = findDates($("#notes").value);
    render();
  });
  $("#capture-out").addEventListener("click", (e) => {
    const f = e.target.closest(".flash");
    if (f) { f.setAttribute("aria-pressed", String(f.getAttribute("aria-pressed") !== "true")); return; }
    const add = e.target.closest("#add-cards");
    if (add) {
      ctx.logActivity("MedGradify", `Made ${cards.length} flashcards from notes`, "capture", Math.min(40, cards.length * 5));
      ctx.addEvent({ in: 1, what: `Review ${cards.length} new flashcards`, site: "MedGradify", planned: true });
      document.dispatchEvent(new CustomEvent("lifeos:cards", { detail: cards }));
      add.disabled = true;
      add.querySelector("span").textContent = "Added ✓ They're in your flashcard feed";
      return;
    }
    const d = e.target.closest(".add-date");
    if (d) {
      const x = dates[+d.dataset.i];
      ctx.addEvent({ in: x.in, what: x.what, site: "UnderGradify" });
      d.disabled = true;
      d.textContent = "✓";
      ctx.toast(`Added “${ctx.esc(x.what)}” to your calendar. <a href="#command">See Coming up</a>`, true);
    }
  });
}
