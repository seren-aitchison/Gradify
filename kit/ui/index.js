// The Gradify UX system: shared interface components for every Gradify page (each course, each subject site, the
// Gradify homepage), so behaviour, styling, accessibility and responsive rules are the same everywhere and are
// tested once. docs/DESIGN-SYSTEM.md describes each component, when to use it, and the rules they follow.
//
//   import { toast, openModal, emptyState, … } from "/kit/ui/index.js";
//
// The modules can also be imported one by one (a page that only needs toasts loads only feedback.js).
export { ICONS, uiIcon } from "./icons.js";
export { pref, setPref, prefSet } from "./prefs.js";
export { arrive, scrolled, backTarget, addRecent, togglePin, restoreAt, move, arriveHere, rememberScroll, backPlace, recent, visit, pins, pinned, pin, setPins, onPlacesChange } from "./places.js";
export { toast, recentNotices, saveLabel, mountSaveState } from "./feedback.js";
export { openModal, openDrawer, overlayOpen } from "./overlay.js";
export { shortcuts, showShortcuts, kbdHtml, kbdParts, withKey, matches, parseCombo } from "./keys.js";
export { tabsHtml, wireTabs, wireAccordion, segmentedHtml, wireSegmented } from "./disclosure.js";
export { emptyState, wireEmpty, skeleton } from "./states.js";
export { transition, jumpTo, mountToTop, copyLink, reduced } from "./motion.js";
export { createCommandPalette, mark } from "./palette.js";
export { resourceSwitcher, wireActions, courseCard } from "./resources.js";
export { offerBack, hideBack, restoreScroll } from "./wayfinding.js";
