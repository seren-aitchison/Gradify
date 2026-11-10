// The homepage's Gradify Pro showcase and Free / Pro comparison. Every price, allowance and the on-sale status come from
// kit/data/billing.js, the same source as pricing.html and the server's allowances (tests compare them), so the
// homepage can't promise something the product doesn't do.
import { PRO_PRICES, PRO_ON_SALE, AI_ALLOWANCES, uses, money, annualSaving } from "../kit/data/billing.js";
import { icon } from "../kit/core/icons.js";
import { joinWaitlist, PRO_LIST } from "../kit/data/waitlist.js";

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const yes = `<span class="ck" aria-label="Included">✓</span>`;
const save = annualSaving();

for (const el of document.querySelectorAll(".pro [data-icon]")) el.innerHTML = icon(el.dataset.icon);
for (const el of document.querySelectorAll(".pro-n[data-allow]")) {
  const a = AI_ALLOWANCES.find((x) => x.feature === el.dataset.allow);
  if (a) el.textContent = `${uses(a, a.pro)} a month on Pro · ${a.free} on Free`;
}

const rows = [
  ["Every course, lesson, quiz and exam practice on every Gradify site", yes, yes],
  ["Interactive labs and worked examples inside lessons", yes, yes],
  ["Flashcards from your own notes, with spaced revision", yes, yes],
  ["LifeOS: plan, levels, streaks, achievements and heatmap", yes, yes],
  ["Progress saved to your account on every device", yes, yes],
  ...AI_ALLOWANCES.map((a) => [`Gradify AI · ${a.label}, a month`, String(a.free), `<b>${a.pro}</b>`]),
];
$("#compare-rows").innerHTML = rows.map(([what, free, pro]) => `<tr><th scope="row">${esc(what)}</th><td>${free}</td><td class="pro-col">${pro}</td></tr>`).join("");

$("#compare-price").innerHTML = `<b>Planned launch price: ${money(PRO_PRICES.month)} a month</b>, or ${money(PRO_PRICES.year)} a year (${money(save.perMonth)} a month, save ${save.percent}%). Prices include VAT. Gradify AI has a monthly fair-use limit.`;
$("#pro-status").innerHTML = PRO_ON_SALE
  ? `<span class="tag on">On sale</span> Cancel any time from your Account page.`
  : `<span class="tag soon">Coming soon</span> Not on sale yet: Gradify Pro opens when Gradify AI launches. Prices below are the planned launch prices.`;

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
