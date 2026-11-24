// Conversion experiments: show some visitors a different version of one thing (a call to action's words, what a page
// lets you try first) and measure which leads to more students actually learning.
//
// Privacy: only visitors who accepted analytics (kit/core/consent.js) take part. Everyone else always sees the normal
// page and nothing is stored. A participant's assignment is kept in this browser only (localStorage "gradify.exp":
// { experimentId: variantId }); exposure goes to Google Analytics as experiment_exposure, and the same browser's
// cta_click and first_learning_action events carry `exp` ("id:variant"), so results compare like with like.
//
// Rules (tests/experiments.test.mjs checks them):
//   - status "draft" never runs. "running" needs `approvedBy`, `start`, the primary metric, the planned sample per
//     variant (sampleSize() below) and a minimum of 14 days, decided BEFORE starting. No stopping early on a good day.
//   - one experiment per page at a time; every variant must keep the page honest and accessible
//   - the result is read with analyse() once the plan is met, and written into `result` with the decision
//
// Analysis helpers are pure, so Node uses them (scripts and tests) as well as the browser.

export const EXPERIMENTS = [
  {
    id: "feature-cta-try",
    hypothesis: "On feature pages, \"Try <feature> free\" gets more visitors to open the feature than \"Open <feature>\", because it says it's free and low-effort.",
    where: /^\/features\/[^/]+\/$/,
    metric: "cta_click",   // then first_learning_action, to check clicks became learning
    variants: [
      { id: "control" },
      { id: "try", apply: (doc) => { const a = doc.querySelector('a[data-cta="feature"] span'); if (a) a.textContent = a.textContent.replace(/^Open /, "Try ") + " free"; } },
    ],
    status: "draft", approvedBy: null, start: null, minDays: 14, plannedPerVariant: null,
  },
];

const KEY = "gradify.exp";
const read = (env) => { try { return JSON.parse(env.localStorage.getItem(KEY) || "{}"); } catch { return {}; } };
const write = (env, v) => { try { env.localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* storage blocked: no experiment */ } };

/** which variant a browser gets: random once, then remembered */
export function assign(exp, env = globalThis, random = Math.random) {
  const all = read(env); if (all[exp.id] && exp.variants.some((v) => v.id === all[exp.id])) return all[exp.id];
  const v = exp.variants[Math.floor(random() * exp.variants.length)].id; all[exp.id] = v; write(env, all); return v;
}
/** "id:variant,id:variant" for this browser's experiments, to add to events (empty when none) */
export const tags = (env = globalThis) => Object.entries(read(env)).map(([k, v]) => `${k}:${v}`).join(",").slice(0, 100);

/** run the experiments that apply to this page, for consenting visitors only */
export function runExperiments(env = globalThis, list = EXPERIMENTS) {
  const consent = env.gradifyConsent;
  if (!consent || typeof consent.allowed !== "function" || !consent.allowed()) return [];
  const path = env.location?.pathname || "/", ran = [];
  for (const exp of list.filter((e) => e.status === "running" && e.where.test(path))) {
    const v = assign(exp, env), variant = exp.variants.find((x) => x.id === v);
    try { variant.apply?.(env.document); } catch { /* a variant must never break the page */ }
    consent.event?.("experiment_exposure", { experiment: exp.id, variant: v });
    ran.push([exp.id, v]);
    break;   // one experiment per page
  }
  return ran;
}

// ---------- analysis ----------
const erf = (x) => { const t = 1 / (1 + 0.3275911 * Math.abs(x)), y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x >= 0 ? y : -y; };
const cdf = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
const Z = { 0.9: 1.2816, 0.8: 0.8416, 0.95: 1.6449, 0.975: 1.96, 0.995: 2.5758 };

/** visitors needed in EACH variant to detect a relative lift `mde` on a base rate (two-sided α, power) */
export function sampleSize(base, mde, { alpha = 0.05, power = 0.8 } = {}) {
  const p1 = base, p2 = base * (1 + mde), za = Z[1 - alpha / 2], zb = Z[power], pbar = (p1 + p2) / 2;
  return Math.ceil(((za * Math.sqrt(2 * pbar * (1 - pbar)) + zb * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2) / (p2 - p1) ** 2);
}
/** compare a variant with control: rates, relative lift, 95% interval of the difference, two-sided p-value */
export function analyse(control, variant) {
  const p1 = control.conv / control.n, p2 = variant.conv / variant.n, diff = p2 - p1;
  const pool = (control.conv + variant.conv) / (control.n + variant.n), sePool = Math.sqrt(pool * (1 - pool) * (1 / control.n + 1 / variant.n));
  const se = Math.sqrt((p1 * (1 - p1)) / control.n + (p2 * (1 - p2)) / variant.n), z = sePool ? diff / sePool : 0;
  return { control: p1, variant: p2, lift: p1 ? diff / p1 : null, ci95: [diff - 1.96 * se, diff + 1.96 * se], p: 2 * (1 - cdf(Math.abs(z))) };
}
/** may a result be read yet? only when the plan is met: the planned sample in every variant and the minimum days */
export function ready(exp, counts, today = new Date()) {
  const days = exp.start ? (new Date(today) - new Date(`${exp.start}T00:00:00Z`)) / 864e5 : 0;
  return Boolean(exp.plannedPerVariant) && days >= exp.minDays && exp.variants.every((v) => (counts[v.id]?.n || 0) >= exp.plannedPerVariant);
}
