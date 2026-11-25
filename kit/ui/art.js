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

// colour: the page's accent (--art-a, the site's colour) leads, with the Gradify pink, orange, amber and teal
// (--art-p, --art-o, --art-c, --art-t; kit/styles/base.css) as clear, saturated tints under firm ink lines.
const C = { i: "var(--art-a, #4641ff)", p: "var(--art-p, #ec3f8c)", o: "var(--art-o, #ff7a1a)", a: "var(--art-c, #f5b400)", t: "var(--art-t, #12b5a5)" };
// a tint (flat fill), an ink line, a filled dot
const tint = (c, o = 0.22) => `fill="${c}" fill-opacity="${Math.min(0.85, 0.3 + o * 1.2).toFixed(2)}"`;
const ink = 'fill="none" stroke="var(--art-ink, currentColor)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
// the gleam: a short glint of light that runs along the ink lines (CSS .g-glint in kit/styles/base.css; still when
// motion is reduced). Each ink line gets a copy drawn as one short dash that travels its length.
const GLINT = 'fill="none" stroke="var(--art-glint, #fff)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
function glinted(d) {
  let n = 0;
  const copies = [];
  d.replace(/<(path|rect|circle|ellipse)\b([^>]*?)fill="none" stroke="var\(--art-ink, currentColor\)" stroke-width="[\d.]+" stroke-linecap="round" stroke-linejoin="round"([^>]*)\/>/g, (m, tag, a, b) => {
    if (n < 6) copies.push(`<${tag}${a}${GLINT}${b} class="g-glint" pathLength="100" style="--gd:${(n++ * 0.7).toFixed(1)}s"/>`);
    return m;
  });
  return d + copies.join("");
}
const line = (c) => `fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"`;
const ground = '<ellipse cx="60" cy="88" rx="38" ry="4.5" fill="var(--art-ink, currentColor)" fill-opacity=".08"/>';
const spark = () => "";   // no confetti or sparkles: the drawings stay calm

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

  // ---- subjects (the hero drawings pick one of these for each Gradify site) ----
  maths: `${ground}<path d="M18 78h86M24 84V18" ${ink}/><path d="M24 70c14-2 20-40 40-40s24 30 40 34" ${line(C.i)}/><circle cx="64" cy="30" r="3.2" fill="${C.p}"/>
    <path d="M40 78V52M56 78V36M72 78V40M88 78V58" fill="none" stroke="var(--art-ink, currentColor)" stroke-opacity=".25" stroke-width="2" stroke-dasharray="3 4"/>
    <rect x="74" y="12" width="30" height="22" rx="6" ${tint(C.a, 0.5)}/><rect x="74" y="12" width="30" height="22" rx="6" ${ink}/><text x="83" y="29" font-family="Geist, system-ui, sans-serif" font-size="15" font-weight="700" fill="var(--art-ink, currentColor)">π</text>`,
  flask: `${ground}<path d="M50 14h20M53 14v22L32 74a6 6 0 0 0 5 9h46a6 6 0 0 0 5-9L67 36V14" ${tint(C.t, 0.16)}/><path d="M40 60h40l8 14a6 6 0 0 1-5 9H37a6 6 0 0 1-5-9z" ${tint(C.t, 0.5)}/>
    <path d="M50 14h20M53 14v22L32 74a6 6 0 0 0 5 9h46a6 6 0 0 0 5-9L67 36V14" ${ink}/><circle cx="52" cy="70" r="3" fill="${C.p}"/><circle cx="64" cy="64" r="2" fill="#fff"/><circle cx="70" cy="74" r="2.6" fill="${C.a}"/>
    <circle cx="86" cy="26" r="5" ${tint(C.p, 0.4)}/><circle cx="96" cy="14" r="3" ${tint(C.i, 0.5)}/>`,
  dna: `${ground}<path d="M42 10c0 20 36 24 36 38S42 66 42 86M78 10c0 20-36 24-36 38s36 18 36 38" ${ink}/>
    <path d="M48 22h24M54 32h12M48 64h24M54 74h12" ${line(C.p)}/><path d="M46 42h28M46 54h28" ${line(C.t)}/><circle cx="92" cy="30" r="9" ${tint(C.a, 0.35)}/><circle cx="92" cy="30" r="9" ${ink}/><circle cx="92" cy="30" r="3" fill="${C.o}"/>`,
  atom: `${ground}<ellipse cx="60" cy="48" rx="40" ry="14" ${ink}/><ellipse cx="60" cy="48" rx="40" ry="14" transform="rotate(60 60 48)" ${ink}/><ellipse cx="60" cy="48" rx="40" ry="14" transform="rotate(-60 60 48)" ${ink}/>
    <circle cx="60" cy="48" r="8" fill="${C.p}"/><circle cx="100" cy="48" r="4" fill="${C.i}"/><circle cx="40" cy="14" r="4" fill="${C.o}"/><circle cx="40" cy="82" r="4" fill="${C.t}"/>`,
  history: `${ground}<path d="M30 30h44v6H30zM34 36v38M44 36v38M60 36v38M70 36v38M26 74h52v8H26z" ${tint(C.a, 0.3)}/><path d="M52 12 26 30h52z" ${tint(C.o, 0.3)}/>
    <path d="M52 12 26 30h52zM30 30h44v6H30zM34 36v38M44 36v38M60 36v38M70 36v38M26 74h52v8H26z" ${ink}/>
    <path d="M84 40h18v34a4 4 0 0 1-4 4H84z" ${tint(C.i, 0.2)}/><path d="M84 40h18v34a4 4 0 0 1-4 4H84zM84 40a4 4 0 0 0-4 4v4h4M88 50h10M88 58h10M88 66h6" ${ink}/>`,
  law: `${ground}<path d="M60 16v62M40 82h40M28 30h64" ${ink}/><circle cx="60" cy="16" r="4" fill="${C.a}"/>
    <path d="M28 30 16 56h24z" ${tint(C.i, 0.2)}/><path d="M16 56a12 6 0 0 0 24 0" ${tint(C.i, 0.45)}/><path d="M28 30 16 56h24zM16 56a12 6 0 0 0 24 0" ${ink}/>
    <path d="M92 30 80 56h24z" ${tint(C.p, 0.2)}/><path d="M80 56a12 6 0 0 0 24 0" ${tint(C.p, 0.45)}/><path d="M92 30 80 56h24zM80 56a12 6 0 0 0 24 0" ${ink}/>`,
  medicine: `${ground}<path d="M60 80S20 58 20 34a18 18 0 0 1 40-6 18 18 0 0 1 40 6c0 24-40 46-40 46z" ${tint(C.p, 0.28)}/><path d="M60 80S20 58 20 34a18 18 0 0 1 40-6 18 18 0 0 1 40 6c0 24-40 46-40 46z" ${ink}/>
    <path d="M28 46h16l6-12 8 24 6-12h28" ${line(C.o)}/><rect x="84" y="10" width="20" height="20" rx="5" fill="${C.t}"/><path d="M94 14v12M88 20h12" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`,
  language: `${ground}<path d="M14 18h50a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6H36L24 64V54H14a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6z" ${tint(C.i, 0.18)}/><path d="M14 18h50a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6H36L24 64V54H14a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6z" ${ink}/>
    <text x="20" y="44" font-family="Geist, system-ui, sans-serif" font-size="20" font-weight="700" fill="${C.i}">Aa</text>
    <path d="M58 38h48a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H98v10L86 72H58a6 6 0 0 1-6-6V44a6 6 0 0 1 6-6z" fill="var(--art-bg, #fff)"/><path d="M58 38h48a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H98v10L86 72H58a6 6 0 0 1-6-6V44a6 6 0 0 1 6-6z" ${tint(C.p, 0.22)}/><path d="M58 38h48a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H98v10L86 72H58a6 6 0 0 1-6-6V44a6 6 0 0 1 6-6z" ${ink}/>
    <text x="64" y="62" font-family="Geist, system-ui, sans-serif" font-size="17" font-weight="700" fill="${C.p}">¿Sí?</text>`,
  book: `${ground}<path d="M60 26c-10-8-26-8-40-4v54c14-4 30-4 40 4 10-8 26-8 40-4V22c-14-4-30-4-40 4z" ${tint(C.o, 0.16)}/><path d="M60 26c-10-8-26-8-40-4v54c14-4 30-4 40 4 10-8 26-8 40-4V22c-14-4-30-4-40 4zM60 26v54" ${ink}/>
    <path d="M28 38h22M28 46h18M28 54h22M70 38h22M70 46h16" ${ink}/><path d="M96 8 76 50l-3 9 7-6 20-42z" ${tint(C.i, 0.4)}/><path d="M96 8 76 50l-3 9 7-6 20-42z" ${ink}/>`,
  art: `${ground}<path d="M58 14C32 14 14 32 14 52s16 30 30 30c8 0 8-8 4-12s-2-10 6-10h12c16 0 28-8 28-22S82 14 58 14z" ${tint(C.a, 0.22)}/><path d="M58 14C32 14 14 32 14 52s16 30 30 30c8 0 8-8 4-12s-2-10 6-10h12c16 0 28-8 28-22S82 14 58 14z" ${ink}/>
    <circle cx="34" cy="44" r="6" fill="${C.p}"/><circle cx="48" cy="28" r="6" fill="${C.i}"/><circle cx="68" cy="26" r="6" fill="${C.t}"/><circle cx="82" cy="38" r="6" fill="${C.o}"/>
    <path d="m108 20-30 40" ${ink}/><path d="m78 60-6 10 10-6z" fill="${C.p}"/>`,
  music: `${ground}<path d="M44 66V22l46-10v44" ${ink}/><path d="M44 30 90 20" ${line(C.i)}/><ellipse cx="36" cy="68" rx="10" ry="7" ${tint(C.p, 0.6)}/><ellipse cx="36" cy="68" rx="10" ry="7" ${ink}/>
    <ellipse cx="82" cy="58" rx="10" ry="7" ${tint(C.o, 0.6)}/><ellipse cx="82" cy="58" rx="10" ry="7" ${ink}/>${spark(104, 30, C.a)}${spark(20, 30, C.t, 0.8)}`,
  business: `${ground}<rect x="20" y="34" width="60" height="44" rx="7" ${tint(C.i, 0.2)}/><rect x="20" y="34" width="60" height="44" rx="7" ${ink}/><path d="M38 34v-8a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v8M20 52h60" ${ink}/>
    <rect x="44" y="48" width="12" height="8" rx="2" fill="${C.a}"/><path d="M82 70l10-12 8 6 10-16" ${line(C.p)}/><path d="m104 48 6 0 0 6" ${line(C.p)}/>`,
  finance: `${ground}<ellipse cx="44" cy="74" rx="20" ry="6" ${tint(C.a, 0.5)}/><path d="M24 74v-8c0 3 9 6 20 6s20-3 20-6v8" ${ink}/><ellipse cx="44" cy="74" rx="20" ry="6" ${ink}/>
    <ellipse cx="44" cy="58" rx="20" ry="6" ${tint(C.a, 0.5)}/><ellipse cx="44" cy="58" rx="20" ry="6" ${ink}/><path d="M24 58v8M64 58v8" ${ink}/>
    <path d="M70 70 82 52l10 8 16-28" ${line(C.t)}/><path d="m100 30 8 0 0 8" ${line(C.t)}/><text x="38" y="62" font-family="Geist, system-ui, sans-serif" font-size="10" font-weight="700" fill="var(--art-ink, currentColor)">£</text>`,
  computing: `${ground}<rect x="22" y="18" width="76" height="48" rx="6" ${tint(C.i, 0.16)}/><rect x="22" y="18" width="76" height="48" rx="6" ${ink}/><path d="M12 76h96l-6 8H18z" ${tint(C.i, 0.3)}/><path d="M12 76h96l-6 8H18zM22 66l-10 10M98 66l10 10" ${ink}/>
    <path d="m46 34-10 8 10 8M74 34l10 8-10 8" ${line(C.p)}/><path d="m64 30-8 24" ${line(C.o)}/>`,
  engineering: `${ground}<circle cx="48" cy="50" r="20" ${tint(C.o, 0.25)}/><path d="M48 22v8M48 70v8M20 50h8M68 50h8M28 30l6 6M62 64l6 6M28 70l6-6M62 36l6-6" fill="none" stroke="var(--art-ink, currentColor)" stroke-width="5" stroke-linecap="round"/>
    <circle cx="48" cy="50" r="20" ${ink}/><circle cx="48" cy="50" r="7" ${ink}/><path d="m80 78 22-22a8 8 0 1 1 4-12l-6 6 4 4 6-6a8 8 0 0 1-12 4L76 74z" ${tint(C.i, 0.4)}/><path d="m80 78 22-22a8 8 0 1 1 4-12l-6 6 4 4 6-6a8 8 0 0 1-12 4L76 74z" ${ink}/>`,
  brain: `${ground}<path d="M58 18c-6-6-20-4-22 6-10 0-16 10-12 18-8 6-6 20 4 22 0 10 12 16 22 10 4 6 8 6 8 6V18z" ${tint(C.p, 0.25)}/><path d="M62 18c6-6 20-4 22 6 10 0 16 10 12 18 8 6 6 20-4 22 0 10-12 16-22 10-4 6-8 6-8 6V18z" ${tint(C.i, 0.22)}/>
    <path d="M58 18c-6-6-20-4-22 6-10 0-16 10-12 18-8 6-6 20 4 22 0 10 12 16 22 10 4 6 8 6 8 6V18zM62 18c6-6 20-4 22 6 10 0 16 10 12 18 8 6 6 20-4 22 0 10-12 16-22 10-4 6-8 6-8 6V18z" ${ink}/>
    <path d="M36 40c6 0 8 6 14 4M34 58c6-4 12 0 16-4M84 40c-6 0-8 6-14 4M86 58c-6-4-12 0-16-4" ${ink}/>${spark(100, 14, C.a)}`,
  ecology: `${ground}<path d="M30 76C26 44 48 20 94 18c2 44-22 66-56 60z" ${tint(C.t, 0.35)}/><path d="M30 76C26 44 48 20 94 18c2 44-22 66-56 60z" ${ink}/><path d="M24 84c16-20 34-38 58-52M52 56l-2-14M64 46l10-2M42 66l-12-2" ${ink}/>
    <circle cx="96" cy="66" r="10" ${tint(C.a, 0.5)}/><circle cx="96" cy="66" r="10" ${ink}/>`,
  sport: `${ground}<path d="M40 16h40v18a20 20 0 0 1-40 0z" ${tint(C.a, 0.4)}/><path d="M40 16h40v18a20 20 0 0 1-40 0zM40 22H28a10 10 0 0 0 12 14M80 22h12a10 10 0 0 1-12 14M60 54v12M46 78h28l-4-12H50z" ${ink}/>
    <path d="m60 22 3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="${C.o}"/>${spark(100, 54, C.p)}${spark(20, 54, C.t, 0.8)}`,
  teaching: `${ground}<rect x="14" y="16" width="70" height="46" rx="5" ${tint(C.t, 0.2)}/><rect x="14" y="16" width="70" height="46" rx="5" ${ink}/><path d="M30 62 22 80M68 62l8 18M24 30h30M24 40h20" ${ink}/><path d="m58 34 6 6 10-12" ${line(C.p)}/>
    <path d="M98 50c-6-8-18-2-14 10 3 9 9 14 14 14s11-5 14-14c4-12-8-18-14-10z" ${tint(C.p, 0.55)}/><path d="M98 50c-6-8-18-2-14 10 3 9 9 14 14 14s11-5 14-14c4-12-8-18-14-10zM98 50c0-6 2-9 6-10" ${ink}/>`,
};
export const ART = Object.keys(DRAW);

/** One illustration as inline SVG. `size` is its width in CSS pixels (height follows, 120 × 96). */
export function art(name, { size, cls = "", gleam = false } = {}) {
  const d = gleam ? glinted(DRAW[name] || DRAW.lesson) : DRAW[name] || DRAW.lesson;
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

// which subject drawing belongs to a Gradify site (by its name) or a course (by its title)
const SUBJECTS = [
  ["maths", /math|statistic|calculus|algebra/i], ["medicine", /med|nurs|dental|dentist|vet|pharma|health|anatom|clinic/i],
  ["brain", /psych|neuro|mind|soc/i], ["law", /law|legal/i], ["history", /histor/i], ["book", /lit|english|poetry|novel/i],
  ["language", /language|spanish|french|japanese|german|linguist/i], ["art", /art\b|artgradify|design|create/i], ["music", /music/i],
  ["finance", /financ|invest|account|econom/i], ["business", /business|intern|career|manag|pro\b|progradify/i],
  ["computing", /tech|comput|code|forge|software|data/i], ["engineering", /engineer/i], ["ecology", /eco|environment|geograph|climate/i],
  ["sport", /sport|athlet|fitness/i], ["teaching", /edu|teach|junior|youth|primary|school/i], ["flask", /chem/i], ["dna", /bio|genet/i],
  ["atom", /physic|sci/i], ["course", /under|post|degree|universit/i],
];
/** The subject drawing for a site or course name (falls back to the course drawing). */
export function subjectOf(name) {
  const s = String(name || "");
  for (const [k, re] of SUBJECTS) if (re.test(s)) return k;
  return "course";
}

/**
 * A larger illustration for a page's hero: the subject's drawing, big, on a soft blob of colour, with three smaller
 * drawings floating round it (flashcards, a lesson, a spark of progress). `subject` is a drawing name or any words
 * (a site or course name); viewBox 240 × 200.
 */
export function heroArt(subject, { cls = "", accent = C.i } = {}) {
  const k = DRAW[subject] ? subject : subjectOf(subject);
  const sat = (name, x, y, sc) => `<g transform="translate(${x} ${y}) scale(${sc})">${DRAW[name].replace(ground, "")}</g>`;
  const sats = { cards: ["cards", "lesson"], lesson: ["cards", "target"] }[k] || ["cards", "lesson"];
  return `<svg class="g-art g-hero-art${cls ? ` ${cls}` : ""}" viewBox="0 0 240 200" aria-hidden="true" focusable="false">
    <ellipse cx="122" cy="166" rx="76" ry="6.5" fill="var(--art-ink, currentColor)" fill-opacity=".1"/>
    <g transform="translate(42 30) scale(1.32)">${glinted(DRAW[k].replace(ground, ""))}</g>
  </svg>`;
}
