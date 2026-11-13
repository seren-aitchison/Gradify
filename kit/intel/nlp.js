// "Tell Gradify": plain English into planning actions, worked out by rules (so it's predictable and works offline),
// always shown to the learner to confirm before anything changes.
//   "I have a biology exam on 10 December, a chemistry assignment due on the 4th and I'm away this weekend."
//   → exam "Biology exam" 10 Dec · deadline "Chemistry assignment" 4th · away Sat + Sun
// It also reads a pasted email or announcement for changes ("…assessment has been moved forward to 2 December"),
// matching them to deadlines already in the calendar: the academic inbox.
// Pure, so Node can test it (tests/nlp.test.mjs).
const DAY = 864e5;
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const MON = "(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)";
const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const WD = "(mon(?:day)?|tue(?:s(?:day)?)?|wed(?:nesday)?|thu(?:rs(?:day)?)?|fri(?:day)?|sat(?:urday)?|sun(?:day)?)";
const EXAM = /\b(exam|examination|test|assessment|quiz|mid-?term|final|osce|viva|mock|presentation)s?\b/i;
const DUE = /\b(assignment|essay|coursework|report|dissertation|project|lab report|submission|portfolio|deadline|homework|problem sheet|reflection)s?\b/i;
const key = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const startOf = (t) => { const d = new Date(t); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };
const monthIndex = (m) => MONTHS.findIndex((x) => x.startsWith(m.toLowerCase().slice(0, 3)));
const wdIndex = (w) => WEEKDAYS.findIndex((x) => x.startsWith(w.toLowerCase().slice(0, 3)));
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/** The first date in a piece of text, as YYYY-MM-DD (dates already past this year roll to next year). */
export function findDate(text, now = Date.now()) {
  const s = String(text).toLowerCase(), today = startOf(now);
  const future = (d) => (d < today ? new Date(d.getFullYear() + 1, d.getMonth(), d.getDate()) : d);
  let m;
  if ((m = s.match(new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?(?:\\s+of)?\\s+${MON}\\b(?:\\s+(\\d{4}))?`)))) return key(m[3] ? new Date(+m[3], monthIndex(m[2]), +m[1]) : future(new Date(today.getFullYear(), monthIndex(m[2]), +m[1])));
  if ((m = s.match(new RegExp(`\\b${MON}\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b(?:,?\\s+(\\d{4}))?`)))) return key(m[3] ? new Date(+m[3], monthIndex(m[1]), +m[2]) : future(new Date(today.getFullYear(), monthIndex(m[1]), +m[2])));
  if ((m = s.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/))) { const y = m[3] ? (m[3].length === 2 ? 2000 + +m[3] : +m[3]) : null; return key(y ? new Date(y, +m[2] - 1, +m[1]) : future(new Date(today.getFullYear(), +m[2] - 1, +m[1]))); }
  if (/\btoday\b|\btonight\b/.test(s)) return key(today);
  if (/\btomorrow\b/.test(s)) return key(new Date(+today + DAY));
  if ((m = s.match(new RegExp(`\\b(next\\s+|this\\s+|on\\s+)?${WD}\\b`)))) {
    const want = wdIndex(m[2]); let add = (want - today.getDay() + 7) % 7;
    if (add === 0) add = 7;
    if (/next/.test(m[1] || "") && add < 7) add += 0;   // "next Friday": the coming one, as most people mean it
    return key(new Date(+today + add * DAY));
  }
  if ((m = s.match(/\bthe\s+(\d{1,2})(?:st|nd|rd|th)\b/))) { let d = new Date(today.getFullYear(), today.getMonth(), +m[1]); if (d < today) d = new Date(today.getFullYear(), today.getMonth() + 1, +m[1]); return key(d); }
  if ((m = s.match(/\bin\s+(\d{1,2})\s+days?\b/))) return key(new Date(+today + +m[1] * DAY));
  if ((m = s.match(/\bin\s+(\d)\s+weeks?\b/))) return key(new Date(+today + +m[1] * 7 * DAY));
  return null;
}

// the days a phrase like "this weekend", "next week" or "from 20 to 23 December" covers
function awayDays(s, now) {
  const today = startOf(now);
  if (/\b(this|the)\s+weekend\b/.test(s) || /\bweekend\b/.test(s)) { const sat = new Date(+today + ((6 - today.getDay() + 7) % 7) * DAY); return [key(sat), key(new Date(+sat + DAY))]; }
  if (/\bnext\s+week\b/.test(s)) { const mon = new Date(+today + (((8 - today.getDay()) % 7) || 7) * DAY); return Array.from({ length: 7 }, (_, i) => key(new Date(+mon + i * DAY))); }
  const r = s.match(new RegExp(`\\b(?:from\\s+)?(\\d{1,2})(?:st|nd|rd|th)?\\s*(?:${MON}\\s*)?(?:-|–|to|until|till)\\s*(\\d{1,2})(?:st|nd|rd|th)?\\s+${MON}`));
  if (r) {
    const end = findDate(`${r[3]} ${r[4]}`, now), startMonth = r[2] || r[4];
    const start = findDate(`${r[1]} ${startMonth}`, now);
    const out = []; for (let t = Date.parse(`${start}T12:00:00`); t <= Date.parse(`${end}T12:00:00`) && out.length < 31; t += DAY) out.push(key(new Date(t)));
    return out;
  }
  const one = findDate(s, now);
  return one ? [one] : [];
}

// the name of an exam or deadline: the words just before the keyword ("a chemistry assignment" → "Chemistry assignment")
function nameOf(clause, re) {
  const m = clause.match(new RegExp(`((?:[a-z0-9&'’-]+\\s+){0,3})(${re.source.replace(/^\\b\(|\)s\?\\b$/g, "")})s?\\b`, "i"));
  if (!m) return null;
  const lead = m[1].trim().split(/\s+/).filter((w) => !/^(a|an|the|my|our|your|i|have|has|got|is|and|then|also|on|for|with|of|due|big|next|final)$/i.test(w));
  return cap(`${lead.join(" ")} ${m[2]}`.trim());
}

/** Planning actions in a sentence or a few: [{ type: "exam"|"deadline"|"away"|"busy"|"hours", ...}] */
export function parseTell(text, now = Date.now()) {
  const out = [];
  const clauses = String(text).replace(/\s+/g, " ").split(/(?:[.;!?\n]|,(?!\s*\d{4})|\band\b(?=\s+(?:a|an|my|the|i|i'm|im|i am|then|also)\b))/i).map((c) => c.trim()).filter(Boolean);
  for (const c of clauses) {
    const lc = c.toLowerCase();
    if (/\b(away|on holiday|travelling|traveling|off|busy all day|out|visiting|abroad|at a wedding)\b/.test(lc) && !EXAM.test(lc) && !DUE.test(lc)) {
      const days = awayDays(lc, now);
      if (days.length) { out.push({ type: "away", days, title: "Away", why: `No study planned on ${days.length === 1 ? "that day" : `those ${days.length} days`}.` }); continue; }
    }
    const work = lc.match(/\b(?:work(?:ing)?|shift|job|lectures?|classes?|training|practice|placement)\b.*?\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*(?:-|–|to|until)\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
    if (work) {
      const day = findDate(lc, now);
      const to24 = (h, mm, ap, other) => { let x = +h; const p = ap || other; if (p === "pm" && x < 12) x += 12; if (p === "am" && x === 12) x = 0; return x * 60 + (+mm || 0); };
      const from = to24(work[1], work[2], work[3], work[6]), to = to24(work[4], work[5], work[6], work[3]);
      if (day && to > from) { out.push({ type: "busy", day, start_min: from, end_min: to, title: cap(lc.match(/\b(work|shift|job|lectures?|classes?|training|practice|placement)\b/)[1]), why: "Busy: Gradify plans around it." }); continue; }
    }
    const hrs = lc.match(/\b(\d+(?:\.\d+)?)\s*(hours?|hrs?|h|minutes?|mins?)\b.*\b(a|per|each|every)\s+day\b/);
    if (hrs) { const mins = /min/.test(hrs[2]) ? Math.round(+hrs[1]) : Math.round(+hrs[1] * 60); if (mins >= 5 && mins <= 600) { out.push({ type: "hours", minutes: mins, why: `Plan ${mins} minutes of study a day.` }); continue; } }
    const kind = EXAM.test(lc) ? "exam" : DUE.test(lc) ? "deadline" : null;
    const day = findDate(lc, now);
    if (kind && day) out.push({ type: kind, day, title: nameOf(c, kind === "exam" ? EXAM : DUE) || (kind === "exam" ? "Exam" : "Deadline"), why: kind === "exam" ? "Revision is paced towards it." : "Protected time before it's due." });
  }
  return out;
}

/**
 * An email or announcement: changes to deadlines already in the calendar ("moved to", "postponed until", "now due"),
 * new deadlines, and the lectures or topics it says to have covered.
 */
export function parseInbox(text, { deadlines = [], now = Date.now() } = {}) {
  const s = String(text).replace(/\s+/g, " ");
  const changes = [], found = [];
  const sentences = s.split(/(?<=[.!?])\s+/);
  for (const sent of sentences) {
    const lc = sent.toLowerCase();
    const moved = /\b(moved|changed|rescheduled|brought forward|postponed|pushed back|deferred|now (?:due|on|be held)|will now|new date)\b/.test(lc);
    const day = findDate(lc, now);
    if (!day) continue;
    const kind = EXAM.test(lc) ? "exam" : DUE.test(lc) ? "deadline" : null;
    if (!kind) continue;
    const title = nameOf(sent, kind === "exam" ? EXAM : DUE) || (kind === "exam" ? "Assessment" : "Deadline");
    // match an existing deadline by shared words in its title
    const w = (x) => new Set(String(x).toLowerCase().match(/[a-z]{4,}/g) || []);
    const tw = w(title);
    const match = deadlines.map((d) => ({ d, n: [...w(d.title)].filter((x) => tw.has(x)).length })).filter((x) => x.n).sort((a, b) => b.n - a.n)[0]?.d || null;
    if (moved && match && match.day !== day) changes.push({ type: "move", title: match.title, from: match.day, day, block: match, why: `Moved from ${match.day} to ${day}. Revision is re-paced to the new date.` });
    else if (!match) found.push({ type: kind, day, title, why: moved ? "A changed date for something not in your calendar yet." : "A new date from the message." });
  }
  const cover = (s.match(/\blectures?\s+(\d{1,2})\s*(?:-|–|to|and)\s*(\d{1,2})/i) || []);
  const prep = cover.length ? { lectures: [+cover[1], +cover[2]], line: `It asks for lectures ${cover[1]}–${cover[2]} to be covered: Gradify will check your mastery of their topics once their notes are in.` } : null;
  return { changes, found, prep };
}
