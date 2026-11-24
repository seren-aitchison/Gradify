// Calendar files in the browser: an .ics file the learner chooses is read and parsed on this device, then only busy
// time (and the exams and deadlines the learner confirms) is kept for the planner. The file itself is never uploaded
// or stored. Gradify no longer takes calendar links: a feed link works like a password, so links saved before
// November 2026 are removed (retiredIntel) and their already-imported events are kept.
import { parseICS, toBlocks, candidates, IMPORTED } from "./ical.js";
import { dayKey, DAY } from "./memory.js";

export const MAX_ICS_BYTES = 2_000_000;
const RANGE_DAYS = 56;

/** The text of a chosen .ics file, or an Error with a plain message. */
export async function readIcsFile(file) {
  if (!file) throw new Error("Choose a calendar file.");
  if (file.size > MAX_ICS_BYTES) throw new Error("That calendar file is too big (over 2 MB). Export a shorter date range.");
  const text = await file.text();
  if (!/BEGIN:VCALENDAR/i.test(text)) throw new Error("That file isn't a calendar. Choose the .ics file your calendar exported.");
  return text;
}

/** What's in a file, before anything is kept: the events in the planning window and the possible exams/deadlines. */
export function previewIcs(text, { now = Date.now() } = {}) {
  const events = parseICS(text, { from: new Date(now - DAY), to: new Date(now + RANGE_DAYS * DAY) });
  return { events, candidates: candidates(events) };
}

const sig = (b) => `${b.day}|${b.start_min}|${b.end_min}|${b.cal}`;
/**
 * Add a file's events to the plan as busy time. `confirmed` (Map of occurrence id → kind) holds the exams and
 * deadlines the learner ticked; only those keep their titles. Blocks already in the plan aren't added twice, so
 * importing an updated file is safe. The learner's own blocks are never touched.
 */
export async function importIcsText(store, text, { now = Date.now(), confirmed = new Map() } = {}) {
  const { events } = previewIcs(text, { now });
  const blocks = toBlocks(events, { confirmed });
  const from = dayKey(new Date(now - DAY)), to = dayKey(new Date(now + RANGE_DAYS * DAY));
  const have = new Set((await store.listBlocks(from, to)).map(sig));
  let added = 0;
  for (const b of blocks) { const k = sig(b); if (have.has(k)) continue; have.add(k); await store.saveBlock(b); added++; }
  return { added, total: blocks.length };
}

/**
 * Smart Plan settings without saved calendar links. Returns null when there's nothing to remove; otherwise the
 * settings with `calendars` gone and `calendars_retired` recording when and how many (never the links themselves),
 * so the app can tell the learner once. Events already imported from those links stay in the plan.
 */
export function retiredIntel(intel, now = Date.now()) {
  const feeds = Array.isArray(intel?.calendars) ? intel.calendars : null;
  if (!intel || !("calendars" in intel)) return null;
  const { calendars: _gone, ...rest } = intel;
  if (!feeds?.length) return rest;   // an empty list: nothing to tell the learner (keep any earlier notice as it is)
  return { ...rest, calendars_retired: { at: new Date(now).toISOString(), count: feeds.length, seen: false } };
}

/** Remove every event imported from a calendar (a year either side of today). Gradify's own blocks stay. */
export async function removeImported(store, { now = Date.now() } = {}) {
  const old = (await store.listBlocks(dayKey(new Date(now - 365 * DAY)), dayKey(new Date(now + 365 * DAY)))).filter((b) => IMPORTED.includes(b.cal));
  for (const b of old) await store.deleteBlock(b.id);
  return old.length;
}
