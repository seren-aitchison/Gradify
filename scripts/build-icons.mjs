// Builds Gradify's subject icon sets (kit/icons3d/<slug>.js): about 50 symbols per Gradify site, chosen from Lucide
// (ISC licence, kit/icons3d/LICENSE) by each subject's keywords, ranked by how well their names and tags match.
// The glass 3D look, rainbow edges and floating are drawn at runtime by kit/core/glass-icons.js.
// Run when Lucide or the keywords change:
//   npm pack lucide-static@0.460.0 && tar xzf lucide-static-0.460.0.tgz && node scripts/build-icons.mjs package
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";

const src = process.argv[2] || "package";
const tags = JSON.parse(await readFile(join(src, "tags.json"), "utf8"));
const names = (await readdir(join(src, "icons"))).filter((f) => f.endsWith(".svg")).map((f) => f.slice(0, -4));
const inner = async (n) => (await readFile(join(src, "icons", `${n}.svg`), "utf8")).replace(/<!--.*?-->/gs, "").replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/\s+/g, " ").replace(/ \/>/g, "/>").trim();

// a shared base of study symbols that every subject can draw on once its own run out
const STUDY = ["book-open", "notebook", "graduation-cap", "lightbulb", "brain", "target", "trophy", "calendar-days", "clock", "layers", "sparkles", "flame", "circle-check", "puzzle", "rocket", "star", "bookmark", "pencil", "library", "school", "glasses", "presentation", "award", "medal", "hourglass", "timer", "compass", "map", "milestone", "gem", "zap", "heart", "smile", "sun", "mountain", "flag", "key", "lamp", "palette", "shapes"];
const SETS = {
  gradify: ["home", "sparkles", "calendar-days", "list-checks", "brain", "trending-up", "globe", "route", "lightbulb", "book-open", "layers", "upload", "users", "settings", "bell", "trophy", "flame", "target", "rocket", "clock", "chart-pie", "chart-column", "gauge", "compass", "map", "milestone", "puzzle", "shield-check", "zap", "heart", "star", "award", "graduation-cap", "notebook-pen", "file-text", "search", "message-circle", "inbox", "calendar-clock", "hourglass", "timer", "repeat", "refresh-cw", "wand-sparkles", "sun", "moon", "leaf", "infinity", "atom", "orbit"],
  undergradify: ["lecture", "university", "degree", "essay", "dissertation", "seminar", "library", "notes", "exam", "laptop", "coffee", "backpack", "calendar", "deadline", "presentation", "research", "study"],
  postgradify: ["research", "thesis", "dissertation", "microscope", "flask", "data", "chart", "journal", "citation", "library", "conference", "lab", "analysis", "publication", "telescope", "archive"],
  progradify: ["briefcase", "career", "certificate", "office", "meeting", "presentation", "growth", "network", "skills", "badge", "handshake", "laptop", "goal", "promotion", "calendar"],
  edugradify: ["teacher", "classroom", "blackboard", "lesson", "school", "apple", "pencil", "ruler", "group", "presentation", "assessment", "planner", "book", "students"],
  youthgradify: ["school", "skills", "sport", "music", "gaming", "career", "travel", "friends", "phone", "idea", "creative", "path", "goal", "volunteer"],
  juniorgradify: ["abc", "toy", "puzzle", "animal", "paint", "number", "shape", "star", "sun", "balloon", "rocket", "dinosaur", "fish", "smile", "rainbow", "blocks"],
  lawgradify: ["law", "scale", "justice", "gavel", "court", "contract", "document", "signature", "landmark", "shield", "police", "handcuffs", "evidence", "property", "rights", "book", "stamp", "certificate"],
  businessgradify: ["business", "briefcase", "chart", "growth", "strategy", "marketing", "store", "shop", "handshake", "factory", "target", "presentation", "team", "money", "trend", "megaphone", "package", "truck"],
  financegradify: ["finance", "money", "coins", "bank", "calculator", "chart", "receipt", "wallet", "invoice", "percent", "trend", "accounting", "currency", "piggy", "credit", "tax", "balance"],
  investorgradify: ["stock", "market", "chart", "candlestick", "trend", "portfolio", "coins", "bitcoin", "pie", "growth", "risk", "bank", "gem", "gold", "scale", "dollar"],
  medgradify: ["heart", "pulse", "stethoscope", "hospital", "pill", "syringe", "brain", "bone", "dna", "microscope", "ambulance", "medical", "thermometer", "bandage", "blood", "lungs", "eye", "ear", "cross", "clipboard", "vaccine", "virus", "tablets", "scan", "skull"],
  dentalgradify: ["tooth", "dental", "smile", "brush", "mouth", "drill", "syringe", "x-ray", "scan", "clinic", "mirror", "pill", "shield", "sparkle", "medical"],
  vetgradify: ["dog", "cat", "paw", "horse", "bird", "rabbit", "animal", "fish", "cow", "rat", "bone", "stethoscope", "syringe", "pill", "heart", "turtle", "squirrel"],
  nursegradify: ["nurse", "hospital", "bed", "heart", "pulse", "stethoscope", "syringe", "pill", "thermometer", "bandage", "clipboard", "ambulance", "medical", "hand", "care", "clock", "baby"],
  pharmagradify: ["pill", "tablets", "medicine", "flask", "beaker", "molecule", "atom", "syringe", "chemistry", "test-tube", "lab", "prescription", "capsule", "bottle", "drop", "scale"],
  healthgradify: ["health", "heart", "apple", "salad", "sleep", "water", "exercise", "bike", "smile", "brain", "wellness", "leaf", "sun", "lungs", "carrot", "dumbbell"],
  psychgradify: ["brain", "mind", "psychology", "thought", "emotion", "smile", "eye", "users", "chart", "experiment", "memory", "dream", "message", "puzzle", "behaviour"],
  internshipgradify: ["briefcase", "office", "career", "badge", "interview", "resume", "handshake", "laptop", "calendar", "building", "network", "id", "graduation"],
  engineergradify: ["engineering", "gear", "cog", "wrench", "hammer", "bridge", "circuit", "bolt", "ruler", "drafting", "construction", "factory", "robot", "plane", "car", "cpu", "satellite"],
  mathgradify: ["math", "calculator", "sigma", "pi", "function", "graph", "chart", "infinity", "divide", "percent", "ruler", "triangle", "shape", "square", "plus", "variable", "equal"],
  scigradify: ["science", "atom", "flask", "beaker", "microscope", "dna", "telescope", "magnet", "test-tube", "planet", "rocket", "lightning", "molecule", "radiation", "leaf", "orbit"],
  ecogradify: ["leaf", "tree", "plant", "earth", "globe", "recycle", "water", "sun", "wind", "mountain", "fish", "bird", "flower", "sprout", "forest", "cloud", "rain", "bug"],
  socgradify: ["users", "community", "people", "group", "city", "home", "vote", "chart", "network", "speech", "family", "handshake", "globe", "landmark"],
  historygradify: ["history", "castle", "landmark", "scroll", "crown", "sword", "shield", "map", "ship", "hourglass", "museum", "flag", "column", "book", "compass", "archive"],
  litgradify: ["book", "library", "pen", "feather", "quote", "text", "notebook", "scroll", "theater", "drama", "letter", "poetry", "write", "type", "bookmark"],
  languagegradify: ["language", "languages", "translate", "speech", "message", "mic", "ear", "globe", "flag", "text", "book", "audio", "headphones", "letter", "abc"],
  artgradify: ["art", "palette", "brush", "paint", "pen", "image", "frame", "camera", "shapes", "color", "sculpture", "drawing", "design", "pencil", "scissors"],
  musicgradify: ["music", "note", "guitar", "piano", "drum", "headphones", "mic", "radio", "speaker", "audio", "volume", "disc", "album", "wave", "record"],
  sportgradify: ["sport", "dumbbell", "ball", "trophy", "medal", "bike", "run", "heart", "timer", "swim", "football", "tennis", "target", "flame", "activity", "goal"],
  creategradify: ["idea", "lightbulb", "pen", "brush", "design", "wand", "sparkles", "shapes", "puzzle", "rocket", "palette", "pencil", "layout", "magic", "lamp"],
  techgradify: ["code", "terminal", "laptop", "cpu", "database", "server", "cloud", "bot", "network", "git", "bug", "braces", "binary", "wifi", "chip", "monitor"],
};

// never in a subject set: brand logos, "off"/"crossed out" variants and plain interface controls
const BRANDS = /^(facebook|github|gitlab|twitter|instagram|linkedin|youtube|twitch|figma|framer|dribbble|chrome|codepen|codesandbox|slack|trello|pocket|rss|apple|chromium|dribbble)$/;
const UI = /(-off|-slash|-x|-minus|-plus|-check|-dashed|-pen|-code|-code-2|-qr-code|-search|-input|-output|-up|-down|-left|-right|-2|-3|-4)$|^(search|text-search|expand|shrink|scaling|columns|fence|land-plot|ticket|swatch|album|sticky-note|circle-fading-plus|files|file|folder|clipboard|scan-qr|scan-text|text$)/;
const NOISE = /^(redo|undo|mouse|tv|bluetooth|git|message|messages|bot|map-pin|locate|crosshair|radar|view|barcode|scan-barcode|antenna|rotate|club|table|notepad|square-activity|square-library|pin|package|life-buoy|goal|key-square|ham|diff|gallery|chart-column-decreasing|archive-restore|book-a|book-audio|star-half|badge-percent|diamond-percent|circle-percent|brackets|parentheses|equal-not|map-pin-plus|ticket|receipt|scan-eye|square-stack|shield-question|thermometer-snowflake|thermometer-sun|eye-closed|calendar-heart|book-heart|message-circle-heart)/;
const ODD = /^(cannabis|utensils-crossed|pilcrow|spade|pizza|loader|slash|split|container|kanban|between|arrows-up-from-line|fire-extinguisher|earth-lock|globe-lock|bug-play|list-tree|origami|cup-soda|milk|egg|dam|scan-line|scan-face|shield-ellipsis|audio-lines|blocks|book-copy|grid-)/;
const TECH_ONLY = /^(router|server|network|cpu|database|binary|terminal|code|braces)/;
const usable = (n, slug = "") => !BRANDS.test(n) && !UI.test(n) && !NOISE.test(n) && !ODD.test(n) && (slug === "techgradify" || !TECH_ONLY.test(n));
const score = (name, kw) => {
  const t = tags[name] || [], n = name.toLowerCase();
  let s = 0;
  for (const k of kw) {
    // partial matches only for keywords of four letters or more ("pi" mustn't match "piano")
    if (n === k) s += 6; else if (n.split("-").includes(k)) s += 4; else if (k.length >= 4 && n.includes(k)) s += 2;
    if (t.includes(k)) s += 3; else if (k.length >= 4 && t.some((x) => x.includes(k))) s += 1;
  }
  return s;
};
await mkdir("kit/icons3d", { recursive: true });
const index = {};
for (const [slug, kw] of Object.entries(SETS)) {
  let picked;
  if (slug === "gradify") picked = kw.filter((n) => names.includes(n));
  else {
    const ranked = names.filter((n) => usable(n, slug)).map((n) => ({ n, s: score(n, kw) })).filter((x) => x.s >= 3).sort((a, b) => b.s - a.s || a.n.localeCompare(b.n)).map((x) => x.n);
    // avoid near-duplicates ("heart", "heart-pulse", "heart-crack", …): at most three of one family
    const fam = new Map(); picked = [];
    for (const n of ranked) { const f = n.split("-")[0]; if ((fam.get(f) || 0) >= 3) continue; fam.set(f, (fam.get(f) || 0) + 1); picked.push(n); if (picked.length >= 50) break; }
    const weaker = names.filter((n) => usable(n, slug)).map((n) => ({ n, s: score(n, kw) })).filter((x) => x.s > 0 && x.s < 3).sort((a, b) => b.s - a.s).map((x) => x.n);
    // strong subject matches first; then (only if a subject has very few) its best weaker ones; then general study symbols
    for (const n of [...(picked.length < 20 ? weaker.slice(0, 20 - picked.length) : []), ...STUDY]) if (picked.length < 50 && !picked.includes(n) && names.includes(n)) picked.push(n);
  }
  picked = picked.slice(0, 50);
  const entries = await Promise.all(picked.map(async (n) => [n, { t: (tags[n] || []).slice(0, 8), d: await inner(n) }]));
  await writeFile(`kit/icons3d/${slug}.js`, `// Gradify ${slug} icon set: ${picked.length} symbols from Lucide (ISC, see LICENSE here), built by scripts/build-icons.mjs.\nexport default ${JSON.stringify(Object.fromEntries(entries))};\n`);
  index[slug] = picked.length;
}
await writeFile("kit/icons3d/LICENSE", (await readFile(join(src, "LICENSE"), "utf8")));
console.log(Object.entries(index).map(([k, v]) => `${k}:${v}`).join(" "));
