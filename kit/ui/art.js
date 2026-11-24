// Gradify spot illustrations: small line drawings in the style of the lesson diagrams (kit/diagrams/visual.js): ink
// lines with round ends, flat tints of the Gradify colours (indigo, pink, orange, amber, teal) and a soft ground
// shadow. The ink follows the theme (--art-ink: near-black on white, near-white on black), so one drawing works in both.
// Every drawing is decorative (aria-hidden): the words beside it carry the meaning.
//
//   import { art, artFor } from "kit/ui/art.js";
//   art("plan")                        → <svg class="g-art">…</svg>
//   artFor("Plan my revision")         → the drawing that fits those words (or the default)
//
// Styles: .g-art in kit/styles/base.css. Docs: docs/DESIGN-SYSTEM.md, "Spot illustrations".

const C = { i: "#4641ff", p: "#f055dd", o: "#ff6a00", a: "#ffc400", t: "#22c4ad" };
// a tint (flat fill), an ink line, a filled dot
const tint = (c, o = 0.22) => `fill="${c}" fill-opacity="${o}"`;
const ink = 'fill="none" stroke="var(--art-ink, currentColor)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
const line = (c) => `fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"`;
const ground = '<ellipse cx="60" cy="88" rx="38" ry="4.5" fill="var(--art-ink, currentColor)" fill-opacity=".08"/>';
const spark = (x, y, c, s = 1) => `<path d="M${x} ${y - 5 * s}l${1.4 * s} ${3.6 * s} ${3.6 * s} ${1.4 * s}-${3.6 * s} ${1.4 * s}-${1.4 * s} ${3.6 * s}-${1.4 * s}-${3.6 * s}-${3.6 * s}-${1.4 * s} ${3.6 * s}-${1.4 * s}z" fill="${c}"/>`;

const DRAW = {
  // a mortarboard on two books: a course, a degree, MyGradify
  course: `${ground}<rect x="26" y="62" width="62" height="12" rx="3" ${tint(C.i)}/><rect x="26" y="62" width="62" height="12" rx="3" ${ink}/>
    <rect x="32" y="50" width="54" height="12" rx="3" ${tint(C.o)}/><rect x="32" y="50" width="54" height="12" rx="3" ${ink}/><path d="M40 50v12M80 62v12" ${ink}/>
    <path d="M60 18 92 31 60 44 28 31z" ${tint(C.p, 0.3)}/><path d="M60 18 92 31 60 44 28 31z" ${ink}/><path d="M42 37v8c0 3 8 6 18 6s18-3 18-6v-8" ${ink}/>
    <path d="M90 32v12" ${line(C.a)}/><circle cx="90" cy="46" r="2.6" fill="${C.a}"/>${spark(100, 18, C.t)}`,
  // three module tiles, one ticked
  modules: `${ground}<rect x="18" y="30" width="30" height="40" rx="6" ${tint(C.i)}/><rect x="18" y="30" width="30" height="40" rx="6" ${ink}/>
    <rect x="45" y="24" width="30" height="46" rx="6" ${tint(C.p)}/><rect x="45" y="24" width="30" height="46" rx="6" ${ink}/>
    <rect x="72" y="34" width="30" height="36" rx="6" ${tint(C.t)}/><rect x="72" y="34" width="30" height="36" rx="6" ${ink}/>
    <path d="M24 40h18M24 46h12M51 34h18M51 40h12M78 44h18M78 50h10" ${ink}/><circle cx="60" cy="58" r="6" fill="${C.p}"/><path d="m57 58 2 2 4-4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  // notes going into a study pack
  upload: `${ground}<path d="M30 16h28l12 12v50H30z" ${tint(C.i, 0.16)}/><path d="M30 16h28l12 12v50H30z" ${ink}/><path d="M58 16v12h12" ${ink}/>
    <path d="M38 38h22M38 46h24M38 54h16" ${ink}/><rect x="66" y="48" width="34" height="26" rx="6" ${tint(C.o, 0.3)}/><rect x="66" y="48" width="34" height="26" rx="6" ${ink}/>
    <path d="M83 66V56m-5 5 5-5 5 5" ${line(C.o)}/>${spark(96, 30, C.p)}${spark(22, 30, C.a, 0.8)}`,
  // a calendar with a tick and a clock: a plan
  plan: `${ground}<rect x="24" y="22" width="56" height="54" rx="8" ${tint(C.i, 0.14)}/><rect x="24" y="22" width="56" height="54" rx="8" ${ink}/><path d="M24 36h56M38 16v12M66 16v12" ${ink}/>
    <rect x="32" y="44" width="10" height="9" rx="2" ${tint(C.p, 0.5)}/><rect x="47" y="44" width="10" height="9" rx="2" ${tint(C.a, 0.6)}/><rect x="62" y="44" width="10" height="9" rx="2" ${tint(C.t, 0.5)}/>
    <rect x="32" y="58" width="10" height="9" rx="2" ${tint(C.i, 0.4)}/><path d="m48 62 3 3 6-6" ${line(C.i)}/>
    <circle cx="84" cy="62" r="15" fill="var(--art-bg, #fff)"/><circle cx="84" cy="62" r="15" ${tint(C.o, 0.25)}/><circle cx="84" cy="62" r="15" ${ink}/><path d="M84 54v8l6 4" ${ink}/>`,
  // a winding road to a flag: a path, a journey
  path: `${ground}<path d="M18 84c10-14 34-6 40-20s-16-18-6-30 30-6 36-14" fill="none" stroke="${C.i}" stroke-opacity=".22" stroke-width="12" stroke-linecap="round"/>
    <path d="M18 84c10-14 34-6 40-20s-16-18-6-30 30-6 36-14" fill="none" stroke="var(--art-ink, currentColor)" stroke-width="2" stroke-dasharray="4 6" stroke-linecap="round"/>
    <circle cx="58" cy="64" r="4" fill="${C.p}"/><circle cx="52" cy="34" r="4" fill="${C.a}"/><path d="M88 20V4" ${ink}/><path d="M88 5h14l-4 5 4 5H88" ${tint(C.o, 0.6)}/><path d="M88 5h14l-4 5 4 5H88" ${ink}/>`,
  // two flashcards, one turned to its answer
  cards: `${ground}<rect x="22" y="26" width="46" height="34" rx="6" transform="rotate(-8 45 43)" ${tint(C.p, 0.25)}/><rect x="22" y="26" width="46" height="34" rx="6" transform="rotate(-8 45 43)" ${ink}/>
    <rect x="46" y="34" width="50" height="38" rx="6" fill="var(--art-bg, #fff)"/><rect x="46" y="34" width="50" height="38" rx="6" ${tint(C.i, 0.16)}/><rect x="46" y="34" width="50" height="38" rx="6" ${ink}/>
    <path d="M56 46h30M56 54h22M56 62h26" ${ink}/><text x="33" y="50" font-family="Geist, system-ui, sans-serif" font-size="16" font-weight="700" fill="${C.p}" transform="rotate(-8 45 43)">?</text>${spark(100, 26, C.a)}`,
  // bars and a line that rises: progress
  progress: `${ground}<path d="M20 80h80" ${ink}/><rect x="28" y="56" width="12" height="24" rx="3" ${tint(C.i, 0.35)}/><rect x="46" y="46" width="12" height="34" rx="3" ${tint(C.p, 0.35)}/>
    <rect x="64" y="38" width="12" height="42" rx="3" ${tint(C.o, 0.35)}/><rect x="82" y="26" width="12" height="54" rx="3" ${tint(C.t, 0.35)}/>
    <path d="M28 56h12v24M46 46h12v34M64 38h12v42M82 26h12v54" ${ink}/><path d="M30 44 50 34l18 4 24-22" ${line(C.o)}/><path d="m86 16 6 0 0 6" ${line(C.o)}/>`,
  // a magnifier over a page: search, nothing found yet
  search: `${ground}<path d="M26 18h36l10 10v48H26z" ${tint(C.i, 0.12)}/><path d="M26 18h36l10 10v48H26z" ${ink}/><path d="M34 34h24M34 42h28M34 50h18" ${ink}/>
    <circle cx="72" cy="56" r="14" fill="var(--art-bg, #fff)"/><circle cx="72" cy="56" r="14" ${tint(C.a, 0.3)}/><circle cx="72" cy="56" r="14" ${ink}/><path d="m82 66 12 12" ${line(C.p)}/>`,
  // a target with an arrow in it: a quiz, a check, a test
  target: `${ground}<circle cx="54" cy="50" r="30" ${tint(C.p, 0.16)}/><circle cx="54" cy="50" r="30" ${ink}/><circle cx="54" cy="50" r="19" ${tint(C.o, 0.25)}/><circle cx="54" cy="50" r="19" ${ink}/>
    <circle cx="54" cy="50" r="8" fill="${C.p}"/><path d="M56 48 92 18" ${ink}/><path d="m86 14 8 2-2 8M92 18l6-2" ${line(C.i)}/>`,
  // a flame: a streak, keeping going
  streak: `${ground}<path d="M60 14c4 14 22 20 22 42a22 22 0 0 1-44 0c0-10 6-16 10-22 2 8 6 10 8 10-2-10 0-20 4-30z" ${tint(C.o, 0.3)}/>
    <path d="M60 14c4 14 22 20 22 42a22 22 0 0 1-44 0c0-10 6-16 10-22 2 8 6 10 8 10-2-10 0-20 4-30z" ${ink}/><path d="M60 46c3 7 10 9 10 17a10 10 0 0 1-20 0c0-6 6-10 10-17z" fill="${C.a}"/>${spark(92, 26, C.p)}${spark(28, 34, C.t, 0.8)}`,
  // a big tick with confetti: done, celebrated
  done: `${ground}<circle cx="60" cy="48" r="28" ${tint(C.t, 0.28)}/><circle cx="60" cy="48" r="28" ${ink}/><path d="m47 48 9 9 18-18" ${line(C.t)}/>
    <path d="M24 26l4 3M96 24l-4 4M98 60l-5-1M22 62l5-2" ${line(C.p)}/>${spark(30, 14, C.a)}${spark(92, 76, C.o, 0.8)}${spark(100, 40, C.i, 0.7)}`,
  // a speech bubble with a spark: ask the tutor, Gradify AI
  tutor: `${ground}<path d="M22 22h60a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H50l-14 12V64H22a8 8 0 0 1-8-8V30a8 8 0 0 1 8-8z" ${tint(C.i, 0.16)}/>
    <path d="M22 22h60a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H50l-14 12V64H22a8 8 0 0 1-8-8V30a8 8 0 0 1 8-8z" ${ink}/><path d="M28 36h40M28 46h28" ${ink}/>${spark(98, 22, C.p, 1.4)}${spark(104, 46, C.a, 0.8)}`,
  // an open book with a diagram on its page: a lesson
  lesson: `${ground}<path d="M60 28c-10-8-26-8-40-4v52c14-4 30-4 40 4 10-8 26-8 40-4V24c-14-4-30-4-40 4z" ${tint(C.i, 0.12)}/>
    <path d="M60 28c-10-8-26-8-40-4v52c14-4 30-4 40 4 10-8 26-8 40-4V24c-14-4-30-4-40 4zM60 28v52" ${ink}/>
    <path d="m70 62 10-22 10 22z" ${tint(C.p, 0.35)}/><path d="m70 62 10-22 10 22z" ${ink}/><path d="M66 40h28" fill="none" stroke="${C.p}" stroke-width="2" stroke-dasharray="3 3"/>
    <path d="M28 40h22M28 48h18M28 56h22" ${ink}/>`,
  // books on a shelf: a library
  library: `${ground}<path d="M18 78h84" ${ink}/><rect x="24" y="30" width="12" height="48" rx="2" ${tint(C.i, 0.35)}/><rect x="38" y="22" width="12" height="56" rx="2" ${tint(C.p, 0.35)}/>
    <rect x="52" y="34" width="12" height="44" rx="2" ${tint(C.a, 0.5)}/><rect x="70" y="26" width="12" height="52" rx="2" transform="rotate(10 76 52)" ${tint(C.t, 0.4)}/>
    <path d="M24 30h12v48H24zM38 22h12v56H38zM52 34h12v44H52z" ${ink}/><rect x="70" y="26" width="12" height="52" rx="2" transform="rotate(10 76 52)" ${ink}/><path d="M86 78V50h12v28" ${ink}/>`,
};
export const ART = Object.keys(DRAW);

/** One illustration as inline SVG. `size` is its width in CSS pixels (height follows, 120 × 96). */
export function art(name, { size, cls = "" } = {}) {
  const d = DRAW[name] || DRAW.lesson;
  const wh = size ? ` width="${size}" height="${Math.round(size * 0.8)}"` : "";
  return `<svg class="g-art${cls ? ` ${cls}` : ""}" viewBox="0 0 120 96"${wh} aria-hidden="true" focusable="false">${d}</svg>`;
}

// which drawing fits some words: the first rule whose words appear wins
const RULES = [
  ["plan", /\b(plan|week|schedul|calendar|deadline|exam date|timetable|smart plan)/i],
  ["modules", /\bmodule/i],
  ["course", /\b(course|degree|universit|college|school|mygradify|academic)/i],
  ["upload", /\b(notes?|upload|import|handbook|pdf|study pack|paste)/i],
  ["cards", /\b(flashcard|cards?|recall|revis|review)/i],
  ["target", /\b(quiz|question|test|check|exam|practi[sc]e)/i],
  ["progress", /\b(progress|strength|weak|mastery|stats?|score)/i],
  ["streak", /\b(streak|goal|mission|quest|habit|xp)/i],
  ["path", /\b(path|journey|road|next lesson|continue)/i],
  ["tutor", /\b(ask|tutor|ai|explain|chat)/i],
  ["search", /\b(search|find|nothing|no results|empty)/i],
  ["library", /\b(library|bookmark|saved|reading)/i],
  ["done", /\b(done|complete|finished|well done|celebrat)/i],
];
/** The illustration that fits the given words, or `fallback`. */
export function artFor(text, fallback = "lesson") {
  const s = String(text || "");
  for (const [name, re] of RULES) if (re.test(s)) return name;
  return fallback;
}
