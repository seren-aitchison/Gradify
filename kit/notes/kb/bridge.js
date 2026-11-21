// Notes' flashcards in the app's own card table. Each document with cards is a deck (a row in documents, file_name
// "kb:<rem id>"), and each card written in a bullet is a card in it, so it appears in Today, the global review queue,
// Revise, Progress and the Mastery Engine, scheduled by FSRS like every other card (kit/learning/srs.js).
//   - a card keeps its schedule when its bullet's wording changes (cards have stable ids: kit/notes/kb/model.js)
//   - a card whose bullet is deleted, or switched off, is suspended, not deleted, so writing it again brings back its
//     history
//   - kb.cardMap remembers which app card each notes card is; it syncs with the notes, so every device agrees
import { allCards, docOf, nameOf, plain, kidsOf } from "./model.js";

const cut = (s, n) => (String(s).length > n ? `${String(s).slice(0, n - 1)}…` : String(s));
let running = null;

/** The text of a document, for the deck's record (cards are checked against it, as with uploaded notes). */
export function docText(kb, id, limit = 60_000) {
  const out = [];
  const walk = (x, d) => { for (const k of kidsOf(kb, x)) { if (out.join("\n").length > limit) return; out.push(`${"  ".repeat(d)}${plain(kb, k.text)}`); walk(k.id, d + 1); } };
  walk(id, 0);
  return out.join("\n").slice(0, limit);
}

/** Brings the app's cards in line with the notes. Returns { added, updated, suspended }. One run at a time. */
export function syncCards(appStore, kb, { site = "Gradify" } = {}) {
  if (running) return running.then(() => syncCards(appStore, kb, { site }));
  running = (async () => {
    const res = { added: 0, updated: 0, suspended: 0 };
    const cards = allCards(kb);
    const byDoc = new Map();
    for (const c of cards) { const d = docOf(kb, c.rem); if (!byDoc.has(d)) byDoc.set(d, []); byDoc.get(d).push(c); }
    const docs = await appStore.listDocuments();
    const docById = new Map(docs.map((d) => [d.id, d]));
    const docByRem = new Map(docs.filter((d) => /^kb:/.test(d.file_name || "")).map((d) => [d.file_name.slice(3), d]));
    const existing = await appStore.listCards();
    const cardById = new Map(existing.map((c) => [c.id, c]));
    for (const [rem, list] of byDoc) {
      let d = docById.get(kb.docMap[rem]) || docByRem.get(rem);
      if (!d) d = await appStore.addDocument({ title: cut(nameOf(kb, rem), 200), site, file_name: `kb:${rem}`, pages: null, text: docText(kb, rem) });
      kb.docMap[rem] = d.id;
      const topic = cut(nameOf(kb, rem), 120);
      const add = [];
      for (const c of list) {
        const want = { front: cut(c.front, 2000), back: cut(c.back || "—", 4000), topic, kind: c.kind, document_id: d.id };
        let sid = kb.cardMap[c.id], have = sid && cardById.get(sid);
        // another device made it before this one heard: adopt it rather than make a second
        if (!have) { have = existing.find((x) => x.document_id === d.id && x.front === want.front && x.back === want.back && !Object.values(kb.cardMap).includes(x.id)); if (have) kb.cardMap[c.id] = sid = have.id; }
        if (have) {
          if (have.front !== want.front || have.back !== want.back || have.topic !== topic || have.kind !== want.kind || have.suspended || have.document_id !== d.id) { await appStore.updateCard(sid, { ...want, suspended: false }); res.updated++; }
        } else add.push([c.id, { ...want, grounded: "yes", source_quote: null, source_page: null }]);
      }
      if (add.length) {
        const rows = await appStore.addCards(add.map(([, row]) => row));
        rows.forEach((r, i) => { if (add[i]) kb.cardMap[add[i][0]] = r.id; });
        res.added += rows.length;
      }
    }
    // cards whose bullets are gone or switched off: suspended, so their history isn't lost
    const live = new Set(cards.map((c) => c.id));
    for (const [kid, sid] of Object.entries(kb.cardMap)) {
      if (live.has(kid)) continue;
      const have = cardById.get(sid);
      if (!have) { delete kb.cardMap[kid]; continue; }
      if (!have.suspended) { await appStore.updateCard(sid, { suspended: true }); res.suspended++; }
    }
    return res;
  })().finally(() => { running = null; });
  return running;
}

/** The app's card rows for a set of notes cards (only those already synced). */
export function storeCardsFor(kb, kbCards, appCards) {
  const by = new Map(appCards.map((c) => [c.id, c]));
  return kbCards.map((c) => ({ kb: c, app: by.get(kb.cardMap[c.id]) || null })).filter((x) => x.app);
}
/** The notes card behind an app card, if it came from the notes. */
export function kbCardOf(kb, appCardId) {
  const kid = Object.entries(kb.cardMap).find(([, s]) => s === appCardId)?.[0];
  return kid ? allCards(kb).find((c) => c.id === kid) || null : null;
}
