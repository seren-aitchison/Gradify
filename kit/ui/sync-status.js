// The learner's record, saved where? One quiet indicator (kit/data/learner-state.js syncStatus, worded by
// kit/ui/feedback.js saveLabel): "Saved on this device", "Saving…", "Saved", "Offline: saved here, syncs when you're
// back", or "Couldn't sync: will try again", with the number of changes waiting. Nothing is lost in any state: the
// device copy is always written first.
//
//   mountSyncStatus(el)
import { esc, ensureStyles } from "./store.js";
import { uiIcon } from "./icons.js";
import { onSyncStatus, syncNow } from "../data/learner-state.js";
import { saveLabel } from "./feedback.js";

export function syncLabel(s) {
  const l = saveLabel(s.state === "failed" ? "error" : s.state, { at: s.at, waiting: s.waiting });
  return { ...l, title: s.note ? `${l.title} ${s.note}` : l.title };
}
export function mountSyncStatus(host, { where = "beforeend" } = {}) {
  if (!host) return null;
  ensureStyles();
  const el = document.createElement("button");
  el.type = "button"; el.className = "gx-sync";
  host.insertAdjacentElement(where, el);
  el.addEventListener("click", () => syncNow());
  return onSyncStatus((s) => {
    const l = syncLabel(s);
    el.dataset.tone = l.tone || ""; el.title = `Your workspace (pins, tabs, history, links, collections): ${l.title}`;
    el.setAttribute("aria-label", `Your workspace: ${l.text}`);
    el.innerHTML = `${uiIcon(l.icon || "cloud")}<span>${esc(l.text)}</span>`;
  });
}
