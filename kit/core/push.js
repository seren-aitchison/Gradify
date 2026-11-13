// Notifications in the browser. Two levels, both following kit/intel/nudges.js:
//  - Push (when Gradify accounts and a VAPID key are set up, gradify.config.js PUSH_PUBLIC_KEY): the push-send
//    function reaches the learner's phone, iPad or Mac even when Gradify is closed. On iPhone and iPad this needs
//    Gradify on the Home Screen (iOS 16.4+), so the settings say so instead of failing.
//  - Reminders while Gradify is open (any browser that allows notifications): the app checks every few minutes and
//    shows the same nudges itself, so notifications work before the server parts are deployed.
// The learner's choices live in learner.intel.notify, and on each device's push_subscriptions row for the server.
import { PUSH_PUBLIC_KEY } from "../../gradify.config.js";
import { decideNudges, prefsOf } from "../intel/nudges.js";

const SENT = "gradify.nudges.sent";
export const supported = () => typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator;
export const pushSupported = () => supported() && "PushManager" in window && Boolean(PUSH_PUBLIC_KEY);
const ios = () => /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const standalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
export const tz = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/London"; } catch { return "Europe/London"; } };

/** What this device can do, in words the settings can show. */
export function status() {
  if (ios() && !standalone()) return { ok: false, why: "On iPhone and iPad, notifications work once Gradify is on your Home Screen: tap Share, then Add to Home Screen, and open Gradify from there." };
  if (!supported()) return { ok: false, why: "This browser doesn't support notifications." };
  if (Notification.permission === "denied") return { ok: false, why: "Notifications are blocked for Gradify. Allow them in your browser or device settings, then try again." };
  return { ok: true, push: pushSupported(), granted: Notification.permission === "granted" };
}

const b64 = (s) => { const p = "=".repeat((4 - (s.length % 4)) % 4); const raw = atob((s + p).replace(/-/g, "+").replace(/_/g, "/")); return Uint8Array.from(raw, (c) => c.charCodeAt(0)); };

/** Ask for permission and, where possible, subscribe this device for push. */
export async function enable(store, prefs) {
  const st = status();
  if (!st.ok) throw new Error(st.why);
  if ((await Notification.requestPermission()) !== "granted") throw new Error("Notifications weren't allowed. You can allow them in your browser settings later.");
  if (!pushSupported() || store?.mode !== "cloud" || !store.db) return { push: false };
  const reg = await navigator.serviceWorker.ready;
  const sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64(PUSH_PUBLIC_KEY) }));
  const j = sub.toJSON();
  const row = { endpoint: j.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth, tz: tz(), prefs: prefsOf({ ...prefs, on: true }), device: (navigator.userAgentData?.platform || navigator.platform || "").slice(0, 60) };
  const { error } = await store.db.from("push_subscriptions").upsert(row, { onConflict: "endpoint" });
  if (error) throw new Error(/push_subscriptions|does not exist/i.test(error.message) ? "Push isn't set up on the server yet. Reminders work while Gradify is open." : error.message);
  return { push: true };
}
export async function disable(store) {
  try { const reg = await navigator.serviceWorker.ready; const sub = await reg.pushManager?.getSubscription(); if (sub) { if (store?.db) await store.db.from("push_subscriptions").delete().eq("endpoint", sub.endpoint); await sub.unsubscribe(); } } catch { /* nothing to undo */ }
}
export async function savePrefs(store, prefs) {
  if (store?.mode !== "cloud" || !store.db) return;
  try { const reg = await navigator.serviceWorker.ready; const sub = await reg.pushManager?.getSubscription(); if (sub) await store.db.from("push_subscriptions").update({ prefs: prefsOf(prefs), tz: tz(), updated_at: new Date().toISOString() }).eq("endpoint", sub.endpoint); } catch { /* the server copy updates next time */ }
}

// ---------- reminders while Gradify is open ----------
let timer = null;
const readSent = () => { try { return JSON.parse(localStorage.getItem(SENT) || "null"); } catch { return null; } };
const writeSent = (v) => { try { localStorage.setItem(SENT, JSON.stringify(v)); } catch { /* storage blocked */ } };
/** Checks every five minutes; `summary()` returns the same shape the server builds (kit/intel/nudges.js). */
export function startLocalReminders(summary, prefs) {
  clearInterval(timer);
  const p = prefsOf(prefs);
  if (!p.on || !supported() || Notification.permission !== "granted") return;
  const tick = async () => {
    try {
      const sent = readSent(), s = await summary();
      const due = decideNudges(s, { now: Date.now(), tz: tz(), prefs: p, sent });
      if (!due.length) return;
      const reg = await navigator.serviceWorker.ready;
      for (const n of due) await reg.showNotification(n.title, { body: n.body, tag: n.tag, icon: "/assets/icons/icon-192.png", data: { url: `/${n.url}` } });
      const { day } = (await import("../intel/nudges.js")).localClock(Date.now(), tz());
      writeSent({ day, kinds: [...(sent?.day === day ? sent.kinds : []), ...due.map((n) => n.kind)] });
    } catch { /* a reminder is never worth an error */ }
  };
  tick();
  timer = setInterval(tick, 5 * 60 * 1000);
}
