// Gradify notifications: which nudges are worth sending, and when. One set of rules for the browser (reminders while
// Gradify is open, and the settings preview) and the push-send Edge Function (push to the phone, Mac or iPad), so
// they always agree. `npm run sync` copies this file to supabase/functions/_shared/nudges.js; it imports nothing.
//
// Principles: few and useful. At most `cap` a day (2 by default), never in quiet hours, never the same kind twice in
// a day, and only when there's something to do. Every nudge opens the exact screen it's about.
export const KINDS = {
  digest: { label: "Daily plan", what: "Each morning: what's planned today and the one thing that matters most." },
  fading: { label: "About to forget", what: "When a topic you'd learned is about to slip below 70% recall." },
  deadline: { label: "Deadlines", what: "The day before an exam or deadline." },
  session: { label: "Session starting", what: "A few minutes before a planned study session (while Gradify is open, or installed)." },
  streak: { label: "Streak at risk", what: "In the evening, if you haven't studied today and have a streak going." },
};
export const DEFAULT_PREFS = { on: false, digestHour: 8, quietFrom: 21 * 60 + 30, quietTo: 8 * 60, cap: 2, kinds: { digest: true, fading: true, deadline: true, session: true, streak: true } };
export const prefsOf = (p) => ({ ...DEFAULT_PREFS, ...(p || {}), kinds: { ...DEFAULT_PREFS.kinds, ...(p?.kinds || {}) } });

// minutes since midnight in the learner's own time zone (the server runs in UTC)
export function localClock(now, tz) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: tz || "Europe/London", hour: "2-digit", minute: "2-digit", year: "numeric", month: "2-digit", day: "2-digit", hourCycle: "h23" }).formatToParts(new Date(now));
    const g = (t) => parts.find((p) => p.type === t)?.value;
    return { minute: Number(g("hour")) * 60 + Number(g("minute")), day: `${g("year")}-${g("month")}-${g("day")}` };
  } catch { const d = new Date(now); return { minute: d.getHours() * 60 + d.getMinutes(), day: d.toISOString().slice(0, 10) }; }
}
export const inQuiet = (minute, p) => (p.quietFrom > p.quietTo ? minute >= p.quietFrom || minute < p.quietTo : minute >= p.quietFrom && minute < p.quietTo);

/**
 * @param {{ dueCards: number, top?: {title, mins, href}|null, todayBlocks?: {title, start_min}[], fading?: {name, key}[],
 *           deadlinesTomorrow?: {title}[], studiedToday?: boolean, streak?: number, nextSession?: {title, start_min}|null }} s
 * @param {{ now: number, tz: string, prefs: object, sent?: {day: string, kinds: string[]} }} o
 * @returns {{ kind, title, body, url, tag }[]} at most what the cap still allows, best first
 */
export function decideNudges(s, { now = Date.now(), tz = "Europe/London", prefs, sent = null } = {}) {
  const p = prefsOf(prefs);
  if (!p.on) return [];
  const { minute, day } = localClock(now, tz);
  if (inQuiet(minute, p)) return [];
  const already = sent && sent.day === day ? sent.kinds : [];
  const left = Math.max(0, p.cap - already.length);
  if (!left) return [];
  const out = [];
  const want = (k) => p.kinds[k] && !already.includes(k);
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

  if (want("session") && s.nextSession && s.nextSession.start_min - minute >= 0 && s.nextSession.start_min - minute <= 10)
    out.push({ kind: "session", title: `${s.nextSession.title} at ${hhmm(s.nextSession.start_min)}`, body: "Your planned session starts soon. Tap to start it.", url: "app.html#/today?n=session", tag: "session" });
  if (want("deadline") && s.deadlinesTomorrow?.length && minute >= 9 * 60)
    out.push({ kind: "deadline", title: `Tomorrow: ${s.deadlinesTomorrow[0].title}`, body: s.deadlinesTomorrow.length > 1 ? `And ${s.deadlinesTomorrow.length - 1} more. Your plan has time set aside.` : "Your plan has time set aside today. Tap to see it.", url: "app.html#/plan?n=deadline", tag: "deadline" });
  if (want("digest") && minute >= p.digestHour * 60 && minute < p.digestHour * 60 + 120 && (s.dueCards || s.todayBlocks?.length || s.top)) {
    const n = s.todayBlocks?.length || 0;
    out.push({ kind: "digest", title: s.top ? `Today: ${s.top.title}` : `${s.dueCards} cards due today`, body: [n ? `${n} planned ${n === 1 ? "session" : "sessions"}` : null, s.dueCards ? `${s.dueCards} cards due` : null, s.top?.mins ? `start with ${s.top.mins} min` : null].filter(Boolean).join(" · "), url: "app.html#/today?n=digest", tag: "digest" });
  }
  if (want("fading") && s.fading?.length && minute >= 12 * 60)
    out.push({ kind: "fading", title: `${s.fading[0].name} is slipping`, body: `${s.fading.length > 1 ? `And ${s.fading.length - 1} more topics. ` : ""}A 3-minute review now saves relearning it later.`, url: `app.html#/study/t:${encodeURIComponent(s.fading[0].key || "")}?n=fading`, tag: "fading" });
  if (want("streak") && !s.studiedToday && (s.streak || 0) >= 2 && minute >= 19 * 60)
    out.push({ kind: "streak", title: `Keep your ${s.streak}-day streak`, body: s.dueCards ? `${Math.min(s.dueCards, 10)} quick cards are enough.` : "Any lesson or review counts.", url: "app.html#/study?n=streak", tag: "streak" });
  return out.slice(0, left);
}

/** The summary decideNudges needs, from plain database rows (used by the push-send function). */
export function summaryFromRows({ cards = [], blocks = [], activity = [], now = Date.now(), tz = "Europe/London" } = {}) {
  const { day, minute } = localClock(now, tz);
  const tomorrow = localClock(now + 864e5, tz).day;
  const live = cards.filter((c) => !c.suspended);
  const dueCards = live.filter((c) => Date.parse(c.due_at) <= now).length;
  // learned cards (two good answers or more) that fall due within a day: the topics about to slip
  const slipping = new Map();
  for (const c of live) if (c.reps >= 2 && ["good", "easy"].includes(c.last_rating) && Date.parse(c.due_at) <= now + 864e5) { const k = `${c.document_id}|${c.topic || "Cards"}`; slipping.set(k, { key: k, name: c.topic || "Cards", n: (slipping.get(k)?.n || 0) + 1 }); }
  const todayBlocks = blocks.filter((b) => b.day === day && !b.done && (b.cal || "study") === "study");
  const next = todayBlocks.filter((b) => b.start_min >= minute).sort((a, b) => a.start_min - b.start_min)[0] || null;
  const days = new Set(activity.map((a) => localClock(Date.parse(a.at), tz).day));
  let streak = 0; for (let k = 1; k < 400; k++) { if (days.has(localClock(now - k * 864e5, tz).day)) streak++; else break; }
  return { dueCards, todayBlocks, nextSession: next, fading: [...slipping.values()].sort((a, b) => b.n - a.n), studiedToday: days.has(day), streak: streak + (days.has(day) ? 1 : 0),
    deadlinesTomorrow: blocks.filter((b) => b.day === tomorrow && ["exam", "deadline", "ext-exam", "ext-deadline"].includes(b.cal)), top: null };
}
