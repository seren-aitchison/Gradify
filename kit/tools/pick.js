// The "what to use" picker shared by the Tools that read, play, print or quiz: a Gradify lesson, a whole unit, one of
// the learner's own flashcard decks, or notes pasted in. Remembers the last choice in this browser.
import { catalogue, lessonMaterial, unitMaterial, fromDeck, fromNotes } from "./material.js";
import { decks } from "./store.js";
import { esc } from "./tools.js";

const LAST = "gradify.tools.lastpick";
const read = () => { try { return JSON.parse(localStorage.getItem(LAST)) || {}; } catch { return {}; } };
const save = (v) => { try { localStorage.setItem(LAST, JSON.stringify(v)); } catch { /* fine */ } };

/**
 * Mount the picker in `el`. Calls onPick(material) whenever a choice is made (and once, for the last choice).
 * @param {{ onPick(m): void, kinds?: string[], label?: string, auto?: boolean }} o
 */
export async function mountPicker(el, o) {
  const kinds = o.kinds || ["lesson", "unit", "deck", "notes"];
  const names = { lesson: "A lesson", unit: "A whole unit", deck: "My flashcards", notes: "Paste notes" };
  const last = read();
  let kind = kinds.includes(last.kind) ? last.kind : kinds[0];
  el.innerHTML = `<div class="tp panel glass"><div class="seg-chips tp-kinds" role="group" aria-label="Use">${kinds.map((k) => `<button type="button" class="chip" data-k="${k}" aria-pressed="${k === kind}">${names[k]}</button>`).join("")}</div><div class="tp-body"></div><p class="tp-msg sub" aria-live="polite"></p></div>`;
  const body = el.querySelector(".tp-body"), msg = el.querySelector(".tp-msg");
  let cat = [];
  try { cat = await catalogue(); } catch (e) { msg.textContent = e.message; }
  const go = async (fn, remember) => {
    msg.textContent = "Loading…";
    try { const m = await fn(); if (!m.sections.length && !m.cards.length && !m.terms.length) throw new Error("There's nothing to use in that yet. Try another."); msg.textContent = ""; save({ ...remember, kind }); o.onPick(m); }
    catch (e) { msg.textContent = e.message; }
  };
  const opts = (list, sel) => list.map(([v, t]) => `<option value="${esc(v)}" ${v === sel ? "selected" : ""}>${esc(t)}</option>`).join("");
  const paint = () => {
    el.querySelectorAll(".tp-kinds .chip").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.k === kind)));
    if (kind === "lesson" || kind === "unit") {
      const c = cat.find((x) => x.slug === last.slug) || cat[0];
      body.innerHTML = `<div class="tp-row"><label><span class="sub">Subject</span><select data-s>${opts(cat.map((x) => [x.slug, x.name]), c?.slug)}</select></label>
        <label><span class="sub">Unit</span><select data-u></select></label>${kind === "lesson" ? `<label><span class="sub">Lesson</span><select data-l></select></label>` : ""}
        <button type="button" class="btn btn-primary lg btn-sm" data-go><span>${esc(o.label || "Use this")}</span></button></div>`;
      const s = body.querySelector("[data-s]"), u = body.querySelector("[data-u]"), l = body.querySelector("[data-l]");
      const fillU = () => { const cc = cat.find((x) => x.slug === s.value); u.innerHTML = opts(cc.units.map((x) => [x.id, x.title]), last.unit); fillL(); };
      const fillL = () => { if (!l) return; const uu = cat.find((x) => x.slug === s.value).units.find((x) => x.id === u.value); l.innerHTML = opts((uu?.lessons || []).map((x) => [x.id, x.title]), last.lesson); };
      s.addEventListener("change", fillU); u.addEventListener("change", fillL);
      if (c) fillU();
      body.querySelector("[data-go]").addEventListener("click", () => {
        Object.assign(last, { slug: s.value, unit: u.value, lesson: l?.value });
        go(() => (kind === "lesson" ? lessonMaterial(s.value, u.value, l.value) : unitMaterial(s.value, u.value)), { slug: s.value, unit: u.value, lesson: l?.value });
      });
    } else if (kind === "deck") {
      const ds = decks();
      body.innerHTML = ds.length ? `<div class="tp-row"><label><span class="sub">Deck</span><select data-d>${opts(ds.map((d) => [d.id, d.title || "Untitled deck"]), last.deck)}</select></label><button type="button" class="btn btn-primary lg btn-sm" data-go><span>${esc(o.label || "Use this")}</span></button></div>`
        : `<p class="sub">You haven't made a deck yet. <a href="#/tools/cards/new">Make one in the flashcard creator</a>, or pick a lesson.</p>`;
      body.querySelector("[data-go]")?.addEventListener("click", () => { const d = ds.find((x) => x.id === body.querySelector("[data-d]").value); go(async () => fromDeck(d.title, d.text), { deck: d.id }); });
    } else {
      body.innerHTML = `<textarea class="tp-notes" rows="7" placeholder="Paste your notes: lines like “Osmosis: the movement of water…” work best.">${esc(last.notes || "")}</textarea><div class="tp-row"><input class="tp-title" placeholder="Title" value="${esc(last.title || "")}"><button type="button" class="btn btn-primary lg btn-sm" data-go><span>${esc(o.label || "Use this")}</span></button></div>`;
      body.querySelector("[data-go]").addEventListener("click", () => {
        const text = body.querySelector("textarea").value, title = body.querySelector(".tp-title").value.trim() || "My notes";
        if (text.trim().length < 20) { msg.textContent = "Paste a few lines of notes first."; return; }
        go(async () => fromNotes(text, title), { notes: text.slice(0, 20000), title });
      });
    }
  };
  el.querySelector(".tp-kinds").addEventListener("click", (e) => { const b = e.target.closest("[data-k]"); if (!b) return; kind = b.dataset.k; paint(); });
  paint();
  if (o.auto !== false && last.kind === kind && (last.lesson || last.unit || last.deck)) body.querySelector("[data-go]")?.click();
}
