// Which plan a learner is on, and what it lets them do, for every screen. One answer, from the server where possible
// (public.my_plan(), the same rule the database and Edge Functions enforce), so the app never offers what the server
// would refuse. Used by the app (kit/app/main.js), the course pages (kit/course/course.js) and the Plan and
// Intelligence screens.
//
//   Free   Learn with Gradify: flashcards, mind maps, basic revision and spaced repetition, standard quizzes and practice,
//          basic progress, manual planning, on one active study device (data kept and readable on every device).
//   Plus   Gradify organises, optimises and manages your learning: the features in PLUS_FEATURES, on every device.
//   Pro    Everything in Plus, and Gradify AI.
//
// Until Plus goes on sale (PLUS_ON_SALE in kit/data/billing.js, with the server's switches), nothing is locked:
// every learner keeps every feature they have today.
import { PLUS_ON_SALE, PLAN_PRICES, includes, money, planOf } from "./billing.js";

export const PLUS_FEATURES = {
  intelligence: { name: "Gradify Intelligence", line: "Smart Plan autopilot, readiness forecasts, cards ordered by what matters most, adaptive card suggestions and revision recommendations." },
  calendar: { name: "Calendar sync and reminders", line: "Plan around your Google, Apple or Outlook calendar and your timetable, export your plan, and get reminders even when Gradify is closed." },
  exams: { name: "Exam preparation", line: "Timed exams over each part of a course and the whole course, and the complete question bank." },
  sync: { name: "Study on every device", line: "Notes, flashcards, mind maps and progress, up to date on every device you use." },
};

// £10, or £10.50: no ".00" in running text
export const pounds = (pence) => (pence % 100 ? money(pence) : `£${pence / 100}`);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
let cached = null;

/**
 * The learner's access. { plan, enforced, has(feature) }. With no account, or before Plus is on sale, everything is open.
 * @param {object} store a LocalStore or CloudStore
 */
export async function access(store, { fresh = false } = {}) {
  if (!PLUS_ON_SALE) return { plan: "free", enforced: false, has: () => true };
  if (cached && !fresh && cached.store === store) return cached.value;
  let plan = "free";
  if (store?.mode === "cloud" && store.db) {
    // a Supabase query is thenable but has no .catch of its own, so it is wrapped in a real promise first
    const r = await Promise.resolve(store.db.rpc("my_plan")).catch(() => null);
    if (r?.data?.plan) plan = r.data.plan;
    else {
      // before the plans migration is applied: the learner's own subscription row, read the same way
      const { data } = await Promise.resolve(store.db.from("subscriptions").select("*").maybeSingle()).catch(() => ({ data: null }));
      plan = planOf(data);
    }
  }
  const value = { plan, enforced: true, has: (feature) => !PLUS_FEATURES[feature] || includes(plan, "plus") };
  cached = { store, value };
  return value;
}
export const forgetAccess = () => { cached = null; };

/** This browser's study-device id (Free studies on one active device). Random; kept in this browser only. */
export function deviceId() {
  try {
    let id = localStorage.getItem("gradify.device");
    if (!id) { id = `d-${crypto.randomUUID()}`; localStorage.setItem("gradify.device", id); }
    return id;
  } catch { return null; }
}

/** The panel shown in place of a Plus feature. */
export function plusPanelHtml(feature, { pricing = "/pricing.html", compact = false } = {}) {
  const f = PLUS_FEATURES[feature] || { name: "This", line: "" };
  return `<article class="panel glass plus-lock${compact ? " compact" : ""}" data-plus-lock="${esc(feature)}">
    <span class="plus-badge">Plus</span>
    <h3>${esc(f.name)}</h3>
    <p class="sub">${esc(f.line)}</p>
    <p class="sub">Part of Gradify Plus, ${pounds(PLAN_PRICES.plus.month)} a month: Gradify organises, optimises and manages your learning.</p>
    <a class="btn btn-light lg btn-sm" href="${esc(pricing)}"><span>See Gradify Plus</span></a>
  </article>`;
}

/**
 * The instant "get Gradify Plus" prompt: a dialog shown the moment a Free learner opens a Plus screen (the screen behind
 * it shows plusPanelHtml, so closing the dialog never leaves them stuck). Does nothing while Plus isn't on sale.
 * @returns {boolean} whether it was shown
 */
export function promptPlus(feature, { pricing = "/pricing.html", signedIn = false } = {}) {
  if (!PLUS_ON_SALE || typeof document === "undefined") return false;
  const f = PLUS_FEATURES[feature] || { name: "This", line: "" };
  document.querySelector("dialog.plus-prompt")?.remove();
  const d = document.createElement("dialog");
  d.className = "plus-prompt";
  d.setAttribute("aria-labelledby", "plus-prompt-title");
  const href = `${pricing}${pricing.includes("?") ? "&" : "?"}plan=plus&from=${encodeURIComponent(feature)}`;
  d.innerHTML = `<form method="dialog" class="plus-prompt-card">
    <span class="plus-badge">Plus</span>
    <h2 id="plus-prompt-title">${esc(f.name)} is part of Gradify Plus</h2>
    <p class="sub">${esc(f.line)}</p>
    <ul class="plus-prompt-list">${Object.values(PLUS_FEATURES).map((x) => `<li>${esc(x.name)}</li>`).join("")}</ul>
    <p class="plus-prompt-price"><b>${pounds(PLAN_PRICES.plus.month)}</b> a month. Cancel any time.</p>
    <div class="plus-prompt-actions">
      <a class="btn btn-primary lg" href="${esc(href)}" data-plus-go><span>${signedIn ? "Get Gradify Plus" : "Sign up for Gradify Plus"}</span></a>
      <button class="btn btn-ghost lg" value="later"><span>Not now</span></button>
    </div>
  </form>`;
  document.body.append(d);
  d.addEventListener("close", () => d.remove());
  d.addEventListener("click", (e) => { if (e.target === d) d.close(); });   // a click on the backdrop closes it
  try { d.showModal(); } catch { d.setAttribute("open", ""); }
  return true;
}

/**
 * Free on a device that isn't the active one: everything stays readable here; changes go to the active device.
 * Returns { active, canSwitchAt } (active is true for Plus and Pro, before Plus is on sale, and without an account).
 */
export async function deviceStatus(store) {
  if (!PLUS_ON_SALE || store?.mode !== "cloud" || !store.db) return { active: true };
  const id = deviceId();
  if (!id) return { active: true };
  const r = await Promise.resolve(store.db.rpc("use_device", { p_device: id })).catch(() => null);
  if (!r || r.error || !r.data || r.data.reason) return { active: true };   // before the migration: nothing is limited
  return { active: Boolean(r.data.active), canSwitchAt: r.data.canSwitchAt || null };
}
export async function switchDevice(store) {
  const r = await store.db.rpc("switch_device", { p_device: deviceId() });
  if (r.error) throw new Error("Couldn't move your studying to this device. Please try again.");
  if (r.data?.reason === "too_soon") throw Object.assign(new Error("too_soon"), { canSwitchAt: r.data.canSwitchAt });
  return r.data;
}

/** A store that reads normally and refuses changes with a clear message (Free, on a device that isn't the active one).
 *  Activity and event logging is skipped quietly rather than failing a screen. */
export function readOnly(store, message) {
  return new Proxy(store, {
    get(target, prop, recv) {
      const v = Reflect.get(target, prop, recv);
      if (typeof v !== "function" || typeof prop !== "string") return v;
      if (/^(log|record)/.test(prop)) return async () => null;
      // settings (the profile) aren't study data: they save from any device, as the database allows
      if (prop !== "saveProfile" && /^(add|update|delete|save|wipe|import|link|set|upsert|remove|suspend|edit|move)/.test(prop)) return async () => { throw new Error(message); };
      return v.bind(target);
    },
  });
}
