// Calendar sync in the browser: the learner's calendar links (saved with their Gradify profile, so every site and
// device syncs the same ones) and .ics files, turned into busy time the planner works around. A link is fetched
// directly when its server allows it, otherwise through the calendar-sync function (signed-in learners).
import { parseICS, toBlocks, IMPORTED, normaliseFeed, isFeedUrl } from "./ical.js";
import { callFunction } from "../data/functions.js";
import { dayKey, DAY } from "./memory.js";

const RANGE_DAYS = 56;
async function fetchIcs(store, url) {
  try { const r = await fetch(normaliseFeed(url), { headers: { Accept: "text/calendar" } }); if (r.ok) { const t = await r.text(); if (/BEGIN:VCALENDAR/i.test(t)) return t; } } catch { /* the server doesn't allow browsers: use the function */ }
  const body = await callFunction(store, "calendar-sync", { url: normaliseFeed(url) }, { fallback: "That calendar couldn't be synced just now.", timeout: 30000 });
  return body.ics;
}

/** Re-sync every saved link: their old events are replaced; the learner's own blocks are never touched. */
export async function syncCalendars(store, feeds = [], { now = Date.now() } = {}) {
  const from = new Date(now - DAY), to = new Date(now + RANGE_DAYS * DAY);
  const results = [], blocks = [];
  for (const f of feeds) {
    try { const ev = parseICS(await fetchIcs(store, f.url), { from, to }); const b = toBlocks(ev); blocks.push(...b); results.push({ ...f, ok: true, events: ev.length, at: new Date(now).toISOString() }); }
    catch (e) { results.push({ ...f, ok: false, error: e.message, at: f.at || null }); }
  }
  // only replace a calendar's events if at least one link synced, so a network blip doesn't empty the plan
  if (results.some((r) => r.ok)) await replaceImported(store, blocks, { from: dayKey(from), to: dayKey(to) });
  return results;
}
async function replaceImported(store, blocks, { from, to }) {
  const old = (await store.listBlocks(from, to)).filter((b) => IMPORTED.includes(b.cal));
  for (const b of old) await store.deleteBlock(b.id);
  for (const b of blocks) await store.saveBlock(b);
}

/** An .ics file: its events are added (repeats of ones already imported are skipped). */
export async function importIcsText(store, text, { now = Date.now() } = {}) {
  const from = new Date(now - DAY), to = new Date(now + RANGE_DAYS * DAY);
  const blocks = toBlocks(parseICS(text, { from, to }));
  const have = new Set((await store.listBlocks(dayKey(from), dayKey(to))).map((b) => `${b.day}|${b.start_min}|${b.title}`));
  let added = 0;
  for (const b of blocks) if (!have.has(`${b.day}|${b.start_min}|${b.title}`)) { await store.saveBlock(b); added++; }
  return { added, total: blocks.length };
}
export { isFeedUrl };
