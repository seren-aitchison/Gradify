// The homepage's Gradify Ultra showcase and Free / Ultra comparison. Every price, allowance and the on-sale status come from
// kit/data/billing.js, the same source as pricing.html and the server's allowances (tests compare them), so the
// homepage can't promise something the product doesn't do.
import { PLAN_PRICES, PLUS_ON_SALE, PRO_ON_SALE, AI_ALLOWANCES, uses } from "../kit/data/billing.js";
import { pounds } from "../kit/data/plan.js";
import { ICONS } from "../kit/core/icons.js";
import { glassSymbol } from "../kit/core/glass-icons.js";
import { joinWaitlist, PRO_LIST } from "../kit/data/waitlist.js";

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const yes = `<span class="ck" aria-label="Included">✓</span>`, no = `<span class="no" aria-label="Not included">–</span>`;

// each feature's symbol as a glass icon, its tile stepping along the Ultra gradient (--pro in assets/styles.css)
const PRO_TILES = [["#8c27ca", "#f055dd"], ["#f055dd", "#ff5600"], ["#ff5600", "#ffc002"], ["#f055dd", "#8c27ca"]];
document.querySelectorAll(".pro [data-icon]").forEach((el, i) => {
  el.innerHTML = glassSymbol(ICONS[el.dataset.icon], { size: 52, seed: `${el.dataset.icon}${i}`, colours: PRO_TILES[i % PRO_TILES.length] });
});
for (const el of document.querySelectorAll(".pro [data-price]")) el.textContent = pounds(PLAN_PRICES[el.dataset.price].month);
for (const el of document.querySelectorAll(".pro-n[data-allow]")) {
  const a = AI_ALLOWANCES.find((x) => x.feature === el.dataset.allow);
  if (a) el.textContent = `${uses(a, a.pro)} a month on Ultra · ${a.free} on Free and Pro`;
}

const rows = [
  ["Every course, lesson, lab and worked example on every Gradify site", yes, yes, yes],
  ["Flashcards and mind maps from your own notes, with spaced revision", yes, yes, yes],
  ["Unit quizzes, practice questions and basic progress", yes, yes, yes],
  ["Manual study planning", yes, yes, yes],
  ["Study devices", "One at a time", "Every device", "Every device"],
  ["Gradify Intelligence: Smart Plan autopilot, readiness forecasts, card ordering, suggestions", no, yes, yes],
  ["Timed exams and the complete question bank", no, yes, yes],
  ["Calendar sync, automatic scheduling and reminders when Gradify is closed", no, yes, yes],
  ...AI_ALLOWANCES.map((a) => [`Gradify AI · ${a.label}, a month`, String(a.free), String(a.free), `<b>${a.pro}</b>`]),
];
$("#compare-rows").innerHTML = rows.map(([what, free, plus, pro]) => `<tr><th scope="row">${esc(what)}</th><td>${free}</td><td class="pro-col">${plus}</td><td>${pro}</td></tr>`).join("");

$("#compare-price").innerHTML = `<b>Gradify Pro ${pounds(PLAN_PRICES.plus.month)} a month · Gradify Ultra ${pounds(PLAN_PRICES.pro.month)} a month.</b> Prices include VAT. Gradify AI has a monthly fair-use limit.`;
$("#pro-status").innerHTML = PLUS_ON_SALE
  ? `<span class="tag on">Pro on sale</span> ${PRO_ON_SALE ? "Gradify Ultra is on sale too." : "Gradify Ultra opens when Gradify AI launches."} Cancel any time from your Account page.`
  : `<span class="tag soon">Opening soon</span> Gradify Pro opens soon; until then, everything on Gradify is free. Gradify Ultra opens when Gradify AI launches.`;

// "Notify me": one row in the launch list (kit/data/waitlist.js); no account, no payment
const form = $("#notify-pro");
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = $("#notify-msg"), input = form.querySelector("input"), btn = form.querySelector("button");
  btn.disabled = true;
  try {
    msg.textContent = await joinWaitlist(input.value, PRO_LIST);
    form.querySelector(".notify-row").hidden = true; form.classList.add("done");
  } catch (err) {
    msg.textContent = err.invalid ? err.message : "Sorry, that didn't work. Please try again in a moment.";
    input.focus();
  } finally { btn.disabled = false; }
});
