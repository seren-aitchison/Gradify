// Spidermap config: every kind of node, the icons, the layouts and the defaults, in one place.
// To change how the map looks or behaves, start here: the other files read from these tables.
//   NODE_TYPES   what each kind of node is called, its icon and its rough size (layouts use the size to avoid overlaps)
//   TOPIC_ICONS  first keyword match picks a topic's icon
//   GLYPHS       extra line icons the map uses on top of kit/core/icons.js (24×24, stroke = currentColor)
//   DEFAULTS     starting view and behaviour

export const NODE_TYPES = {
  root:  { label: "Your notes", icon: "brain",   w: 220, h: 220 },
  topic: { label: "Topic",      icon: "layers",  w: 190, h: 96 },
  term:  { label: "Key term",   icon: "dot",     w: 210, h: 78 },
  eq:    { label: "Formula",    icon: "sigma",   w: 200, h: 64 },
  note:  { label: "Your note",  icon: "pencil",  w: 190, h: 60 },
};

// first match wins; the fallback is "layers"
export const TOPIC_ICONS = [
  [/ventric|atri|systol|diastol|heart|cardiac|cardio|pulse|beat/, "heartbeat"], [/valve|sound|s1|s2/, "wave"], [/blood|haem|hem|cell/, "drop"],
  [/pressure|load|stretch|force/, "gauge"], [/ecg|electr|depolari|repolari|wave|signal|nerve|neur/, "bolt"],
  [/volume|output|rate|equation|formula|calculat/, "sigma"], [/cycle|phase|sequence|stage|process/, "cycle"],
  [/brain|mind|memory|psych/, "brain"], [/drug|pharma|dose|medic/, "pill"], [/gene|dna|inherit/, "atom"],
  [/plant|leaf|eco|photosynth/, "leaf"], [/law|legal|court|contract/, "scales"], [/money|cost|price|finance|market/, "coins"],
  [/code|program|software|algorithm|data/, "cog"], [/language|word|verb|grammar/, "languages"], [/history|war|empire|century/, "landmark"],
  [/key terms|other/, "book"],
];

export const GLYPHS = {
  dot: '<circle cx="12" cy="12" r="4"/>',
  wave: '<path d="M2 12h3l2-6 4 12 3-9 2 3h6"/>',
  drop: '<path d="M12 2.7 6.3 9.4a7 7 0 1 0 11.4 0Z"/>',
  gauge: '<path d="M12 14 16 9"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7Z"/>',
  cycle: '<path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  fit: '<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/>',
  spider: '<circle cx="12" cy="12" r="3"/><circle cx="4" cy="5" r="2"/><circle cx="20" cy="5" r="2"/><circle cx="4" cy="19" r="2"/><circle cx="20" cy="19" r="2"/><path d="m6 6.5 3.7 3.5M18 6.5l-3.7 3.5M6 17.5l3.7-3.5M18 17.5l-3.7-3.5"/>',
  flow: '<rect x="2" y="9" width="5" height="6" rx="1.5"/><rect x="10" y="3" width="5" height="5" rx="1.5"/><rect x="10" y="16" width="5" height="5" rx="1.5"/><rect x="18" y="9.5" width="4" height="5" rx="1.5"/><path d="M7 12h1.5c1 0 1.5-.5 1.5-1.5v-4M10 17.5v-4c0-1-.5-1.5-1.5-1.5M15 5.5h1c1 0 1.5.5 1.5 1.5v5"/>',
  tree: '<rect x="9" y="2" width="6" height="5" rx="1.5"/><rect x="2" y="17" width="6" height="5" rx="1.5"/><rect x="16" y="17" width="6" height="5" rx="1.5"/><path d="M12 7v5M5 17v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff: '<path d="M9.9 4.2A10.4 10.4 0 0 1 12 4c6.4 0 10 8 10 8a17 17 0 0 1-2.2 3.2M6.6 6.6A17.6 17.6 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="m2 2 20 20"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  collapse: '<path d="m7 15 5-5 5 5"/>',
  expand: '<path d="m7 9 5 5 5-5"/>',
  quote: '<path d="M3 21c3 0 7-1 7-8V5H3v7h4c0 4-2 6-4 6Z"/><path d="M14 21c3 0 7-1 7-8V5h-7v7h4c0 4-2 6-4 6Z"/>',
  grip: '<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  edit: '<path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5"/>',
};

export const LAYOUTS = [
  { id: "spider", name: "Spider", icon: "spider" },
  { id: "flow", name: "Flow", icon: "flow" },
  { id: "tree", name: "Tree", icon: "tree" },
];

export const DEFAULTS = {
  layout: "spider",
  crossLinks: true,      // show Gradify Intelligence's links between terms in different topics
  recall: false,         // hide definitions until tapped
  minZoom: 0.15, maxZoom: 2.5,
  storageKey: "gradify:spidermap:",
};
