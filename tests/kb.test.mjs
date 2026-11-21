import { test } from "node:test";
import assert from "node:assert/strict";
import * as M from "../kit/notes/kb/model.js";
import { examPlan, examQueue, newExam, studyDays, readiness } from "../kit/notes/kb/exam.js";
import * as IO from "../kit/notes/kb/io.js";

const doc = (kb, text = "Doc") => M.create(kb, { text, doc: true });
const bullet = (kb, parent, text, extra = {}) => M.create(kb, { parent, text, ...extra });

test("outline: indent, outdent, move and the tree stay consistent", () => {
  const kb = M.emptyKb(), d = doc(kb);
  const a = bullet(kb, d.id, "a"), b = bullet(kb, d.id, "b"), c = bullet(kb, d.id, "c");
  assert.ok(M.indent(kb, b.id));
  assert.deepEqual(kb.rems[a.id].kids, [b.id]);
  assert.equal(kb.rems[b.id].parent, a.id);
  assert.equal(M.indent(kb, a.id), false, "the first bullet can't indent");
  assert.ok(M.outdent(kb, b.id));
  assert.deepEqual(kb.rems[d.id].kids, [a.id, b.id, c.id], "back where it was, after its old parent");
  assert.equal(M.outdent(kb, a.id), false, "a document's top bullets stay in it");
  assert.ok(M.moveBy(kb, c.id, -1));
  assert.deepEqual(kb.rems[d.id].kids, [a.id, c.id, b.id]);
  assert.equal(M.move(kb, a.id, a.id), false, "not into itself");
  bullet(kb, a.id, "child");
  assert.equal(M.move(kb, a.id, kb.rems[a.id].kids[0]), false, "not into its own child");
  assert.deepEqual(M.visible(kb, d.id).length, 4);
  M.update(kb, a.id, { collapsed: true });
  assert.deepEqual(M.visible(kb, d.id), [a.id, c.id, b.id], "collapsed branches are skipped");
});

test("undo and redo put back exactly what changed", () => {
  const kb = M.emptyKb(), d = doc(kb), a = bullet(kb, d.id, "first");
  M.begin(kb); M.update(kb, a.id, { text: "changed" }); const b = bullet(kb, d.id, "new"); const step = M.commit(kb);
  assert.equal(kb.rems[a.id].text, "changed");
  const redo = M.undo(kb, step);
  assert.equal(kb.rems[a.id].text, "first");
  assert.equal(kb.rems[b.id], undefined);
  assert.deepEqual(kb.rems[d.id].kids, [a.id]);
  M.undo(kb, redo);
  assert.equal(kb.rems[a.id].text, "changed");
  assert.deepEqual(kb.rems[d.id].kids, [a.id, b.id]);
  M.begin(kb); M.remove(kb, d.id); const del = M.commit(kb);
  assert.equal(Object.keys(kb.rems).length, 0);
  M.undo(kb, del);
  assert.equal(Object.keys(kb.rems).length, 3, "a deleted document comes back with its bullets");
  assert.deepEqual(kb.roots, [d.id]);
});

test("references are stored by id, so renaming keeps links; new names make documents; dates are daily documents", () => {
  const kb = M.emptyKb(), cell = doc(kb, "Mitochondria"), d = doc(kb, "Respiration");
  const r = M.fromEdit(kb, "Happens in [[mitochondria]] and needs [[Oxygen]] on [[2026-11-18]]");
  assert.match(r.text, new RegExp(`\\[\\[${cell.id}\\]\\]`));
  assert.equal(r.made.length, 1, "Oxygen is new");
  assert.equal(kb.rems[r.made[0]].doc, true);
  const daily = Object.values(kb.rems).find((x) => x.daily === "2026-11-18");
  assert.ok(daily && r.text.includes(daily.id));
  const b = bullet(kb, d.id, r.text);
  M.update(kb, cell.id, { text: "The mitochondrion" });
  assert.match(M.toEdit(kb, b.text), /\[\[The mitochondrion\]\]/);
  assert.match(M.plain(kb, b.text), /The mitochondrion/);
  // editing the shown name back keeps the same target
  const again = M.fromEdit(kb, M.toEdit(kb, b.text), { before: b.text });
  assert.equal(again.made.length, 0);
  assert.deepEqual(M.backlinks(kb, cell.id).map((x) => x.id), [b.id]);
});

test("every flashcard type, with stable ids", () => {
  const kb = M.emptyKb(), d = doc(kb, "Biology");
  const parent = bullet(kb, d.id, "Mitochondria");
  const cases = {
    basic: bullet(kb, d.id, "ATP >> the cell's energy currency"),
    reverse: bullet(kb, d.id, "the powerhouse << Mitochondria"),
    both: bullet(kb, d.id, "Ribosome <> makes proteins"),
    concept: bullet(kb, d.id, "Osmosis :: water moving across a membrane"),
    descriptor: bullet(kb, parent.id, "Function ;; aerobic respiration"),
    cloze: bullet(kb, d.id, "The {{left ventricle}} pumps blood to the {{aorta}}"),
    group: bullet(kb, d.id, "{{c1::Na}} and {{c1::K}} pumps use {{ATP}}"),
    multi: bullet(kb, d.id, "Reasons for >>>"),
    list: bullet(kb, d.id, "Mitosis stages >>1."),
    mcq: bullet(kb, d.id, "Gas taken in? >>A)"),
  };
  bullet(kb, cases.multi.id, "one"); bullet(kb, cases.multi.id, "two");
  for (const s of ["Prophase", "Metaphase", "Anaphase", "Telophase"]) bullet(kb, cases.list.id, s);
  for (const s of ["Carbon dioxide", "Oxygen", "Nitrogen"]) bullet(kb, cases.mcq.id, s);
  const of = (k) => M.cardsOf(kb, cases[k].id);
  assert.deepEqual(of("basic").map((c) => [c.type, c.front, c.back]), [["basic", "ATP", "the cell's energy currency"]]);
  assert.deepEqual(of("reverse").map((c) => [c.front, c.back]), [["Mitochondria", "the powerhouse"]]);
  assert.equal(of("both").length, 2);
  assert.equal(of("concept").length, 2);
  M.update(kb, cases.concept.id, { dir: "fwd" });
  assert.equal(of("concept").length, 1, "one direction when asked");
  assert.equal(of("descriptor")[0].front, "Mitochondria › Function", "asked with its parent");
  assert.equal(of("cloze").length, 2);
  assert.equal(of("cloze")[0].front, "The […] pumps blood to the aorta");
  assert.equal(of("group").length, 2, "c1 gaps are one card");
  assert.equal(of("group")[0].answer, "Na, K");
  assert.equal(of("multi")[0].back, "one\ntwo");
  assert.equal(of("list")[0].back, "1. Prophase\n2. Metaphase\n3. Anaphase\n4. Telophase");
  const mcq = of("mcq")[0];
  assert.equal(mcq.options.length, 3);
  assert.equal(mcq.options[mcq.answer], "Carbon dioxide");
  assert.match(mcq.front, /A\) .*\nB\) .*\nC\) /);
  // the id survives a change of wording
  const id = of("basic")[0].id;
  M.update(kb, cases.basic.id, { text: "ATP >> adenosine triphosphate" });
  assert.equal(of("basic")[0].id, id);
  M.update(kb, cases.basic.id, { cards: "off" });
  assert.equal(of("basic").length, 0, "cards can be switched off");
  // image occlusion: a card per group
  const img = bullet(kb, d.id, "Heart", { image: { id: "i1", w: 100, h: 100, occl: [{ x: 0, y: 0, w: 1, h: 1, label: "Aorta" }, { x: 2, y: 2, w: 1, h: 1, label: "Atrium", g: "a" }, { x: 4, y: 4, w: 1, h: 1, label: "Atrium 2", g: "a" }] } });
  const oc = M.cardsOf(kb, img.id);
  assert.equal(oc.length, 2);
  assert.equal(oc[1].back, "Atrium, Atrium 2");
  assert.equal(oc[0].kind, "occlusion");
});

test("tags are a lightweight database: properties, a table, and cards from it", () => {
  const kb = M.emptyKb(), d = doc(kb, "Authors");
  M.defineTag(kb, "Author", { schema: ["Born", "Nationality"], cards: true });
  const a = bullet(kb, d.id, "Jane Austen #Author", { props: { Born: "1775", Nationality: "English" } });
  bullet(kb, d.id, "Leo Tolstoy #author", { props: { Born: "1828" } });
  assert.deepEqual(M.tagsIn(kb.rems[a.id].text), ["author"]);
  const t = M.tagTable(kb, "author");
  assert.deepEqual(t.cols, ["Born", "Nationality"]);
  assert.equal(t.rows.length, 2);
  const cards = M.cardsOf(kb, a.id);
  assert.deepEqual(cards.map((c) => c.front), ["Jane Austen › Born", "Jane Austen › Nationality"]);
  assert.equal(M.allTags(kb)[0].count, 2);
});

test("cards are gathered through the hierarchy and through portals, once each", () => {
  const kb = M.emptyKb(), shared = doc(kb, "DNA replication"), gcse = doc(kb, "GCSE Biology");
  bullet(kb, shared.id, "Helicase >> unzips DNA");
  bullet(kb, gcse.id, "", { portal: shared.id });
  bullet(kb, gcse.id, "", { portal: shared.id });
  bullet(kb, gcse.id, "Gene >> a section of DNA");
  assert.equal(M.cardsUnder(kb, gcse.id).length, 2);
  assert.equal(M.cardsUnder(kb, gcse.id, { portals: false }).length, 1);
  assert.equal(M.backlinks(kb, shared.id).filter((b) => b.kind === "portal").length, 2);
});

test("search ranks names, documents and what's used often", () => {
  const kb = M.emptyKb(), a = doc(kb, "Cell biology"), b = doc(kb, "Chemistry");
  const deep = bullet(kb, b.id, "The cell membrane controls what enters");
  bullet(kb, a.id, "Organelles", { image: { id: "x", label: "Animal cell diagram", occl: [] } });
  const r = M.search(kb, "cell");
  assert.equal(r[0].id, a.id, "a document named for it first");
  assert.ok(r.some((x) => x.id === deep.id));
  assert.ok(M.search(kb, "diagram").length, "image labels are searchable");
  assert.equal(M.search(kb, "cell", { docs: true }).every((x) => x.doc), true);
  assert.deepEqual(M.search(kb, "membrane", { within: a.id }), []);
  for (let i = 0; i < 20; i++) M.visit(kb, deep.id);
  assert.equal(kb.recent[0], deep.id);
  assert.deepEqual(M.unlinkedMentions(kb, a.id), []);
  const mention = bullet(kb, b.id, "Revise cell biology before Friday");
  assert.deepEqual(M.unlinkedMentions(kb, a.id).map((x) => x.id), [mention.id]);
});

test("daily documents, to-dos and templates", () => {
  const kb = M.emptyKb();
  const t = M.dailyDoc(kb, "2026-11-18"), y = M.dailyDoc(kb, "2026-11-17"), z = M.dailyDoc(kb, "2026-11-19");
  assert.equal(M.dailyDoc(kb, "2026-11-18").id, t.id, "one per day");
  assert.deepEqual(M.dailyRoot(kb).kids, [z.id, t.id, y.id], "newest first");
  bullet(kb, t.id, "Hand in essay", { todo: "open" });
  bullet(kb, y.id, "Read chapter 3 @2026-11-20", { todo: "open" });
  bullet(kb, y.id, "Done thing", { todo: "done" });
  const list = M.tasks(kb);
  assert.deepEqual(list.map((x) => x.due), ["2026-11-18", "2026-11-20"]);
  assert.equal(M.tasks(kb, { done: true }).length, 3);
  const d = doc(kb, "Lecture 1");
  M.applyTemplate(kb, d.id, "lecture");
  assert.ok(kb.rems[d.id].kids.length >= 5);
  const saved = doc(kb, "My template"); M.update(kb, saved.id, { template: true }); bullet(kb, saved.id, "Q >> A");
  assert.equal(M.cardsUnder(kb, saved.id).length, 0, "a template's cards aren't studied");
  const e = doc(kb, "From template"); M.applyTemplate(kb, e.id, saved.id);
  assert.equal(M.cardsUnder(kb, e.id).length, 1);
});

test("formatting renders safely", () => {
  const kb = M.emptyKb(), d = doc(kb, "Target");
  const html = M.inlineHtml(kb, `**b** *i* __u__ ~~s~~ =={green}h== \`x<y\` $E=mc^2$ [[${d.id}]] #Exam <script>alert(1)</script> https://example.com/a Q >> A {{gap}}`);
  for (const bit of ["<b>b</b>", "<i>i</i>", "<u>u</u>", "<s>s</s>", 'class="hl-green"', "<code>x&lt;y</code>", "kb-math", 'data-ref="', 'data-tag="exam"', "&lt;script&gt;", 'href="https://example.com/a"', "kb-arrow", "kb-cloze"]) assert.ok(html.includes(bit), bit);
  assert.ok(!html.includes("<script>"));
});

test("two devices' copies merge: later edits win, deletions stick, the tree stays valid", () => {
  const base = M.emptyKb(), d = doc(base, "Doc"), a = bullet(base, d.id, "a"), b = bullet(base, d.id, "b");
  const one = structuredClone(base), two = structuredClone(base);
  one.rems[a.id].text = "a from one"; one.rems[a.id].u += 10;
  two.rems[a.id].text = "a from two"; two.rems[a.id].u += 20;
  M.remove(one, b.id);
  const c = bullet(two, d.id, "c from two");
  const m = M.merge(one, two);
  assert.equal(m.rems[a.id].text, "a from two");
  assert.equal(m.rems[b.id], undefined, "deleted on one device");
  assert.ok(m.rems[c.id]);
  assert.deepEqual(m.rems[d.id].kids, [a.id, c.id]);
  // a loop made by two moves is broken
  const x = structuredClone(m); x.rems[a.id].parent = c.id; x.rems[c.id].parent = a.id;
  const fixed = M.merge(x, M.emptyKb());
  assert.ok(!fixed.rems[a.id].parent || !fixed.rems[c.id].parent);
});

test("exam plans: periods, daily load, catch-up and readiness", () => {
  const today = new Date("2026-11-18T09:00:00");
  const exam = newExam({ name: "Biology paper 1", date: "2026-12-16", days: [1, 2, 3, 4, 5], reps: 3, finalDays: 3, maxPerDay: 60 });
  assert.equal(studyDays(exam, today).length, 20);
  const cards = Array.from({ length: 100 }, (_, i) => ({ id: `c${i}`, reps: 0, due_at: today.toISOString() }));
  const p = examPlan(exam, cards, { today });
  assert.equal(p.days.reduce((a, d) => a + d.learn, 0), 100, "every card is introduced");
  assert.deepEqual(p.phases.map((x) => x.phase), ["learning", "review", "final"]);
  assert.equal(p.days.filter((d) => d.phase === "final").length, 3);
  assert.ok(p.newPerDay >= 5 && p.newPerDay <= 10);
  assert.deepEqual(p.warnings, []);
  assert.equal(examQueue(exam, cards, { today, plan: p }).length, p.days[0].learn);
  // set up a week ago and nothing started: behind, with a catch-up
  const late = { ...exam, created: "2026-11-11T09:00:00", startCount: 100 };
  const q = examPlan(late, cards, { today });
  assert.ok(q.behind > 0);
  assert.ok(q.days.some((d) => d.phase === "catch-up"));
  assert.ok(q.warnings.some((w) => /behind/.test(w)));
  // too much for the limit
  assert.ok(examPlan({ ...exam, maxPerDay: 5 }, cards, { today }).warnings.some((w) => /limit/.test(w)));
  assert.equal(examPlan({ ...exam, date: "2026-11-01" }, cards, { today }).warnings[0], "This exam has passed.");
  const strong = cards.map((c) => ({ ...c, reps: 4, ease: 13, interval_days: 200, updated_at: today.toISOString(), due_at: new Date(+today + 200 * 864e5).toISOString() }));
  assert.ok(readiness(exam, strong, +today) > 0.9);
  assert.equal(readiness(exam, cards, +today), 0);
});

test("import: Markdown with wikilinks, OPML, CSV tables, Anki", () => {
  const kb = M.emptyKb(), d = doc(kb, "Imports");
  const md = IO.fromMarkdown("# Cells\n- Nucleus >> holds DNA\n  - see [[Genetics]]\n- [x] read chapter\n## Organelles\n- Ribosome");
  IO.insertOutline(kb, d.id, md);
  assert.ok(M.findByName(kb, "Genetics"), "a wikilink makes its document");
  assert.equal(M.cardsUnder(kb, d.id).length, 1);
  assert.equal(M.tasks(kb, { done: true })[0].done, true);
  const op = IO.fromOPML('<opml><body><outline text="Top"><outline text="Child &amp; more" _complete="true"/></outline></body></opml>');
  assert.deepEqual(op, [{ text: "Top", kids: [{ text: "Child & more", kids: [], todo: "done" }] }]);
  assert.deepEqual(IO.fromCSV("front,back\n\"a, b\",c").map((x) => x.text), ["front >> back", "a, b >> c"]);
  const wide = IO.fromCSV("Name,Born,Country\nAusten,1775,England\nTolstoy,1828,Russia");
  assert.equal(wide[0].table.rows.length, 3);
  assert.deepEqual(wide[1].props, { Born: "1775", Country: "England" });
  const anki = IO.fromAnki("#separator:tab\n#html:true\n#tags column:3\nWhat is <b>ATP</b>?\tEnergy&nbsp;currency\tbio cells\n{{c1::Na}} pump\t\t");
  assert.equal(anki[0].text, "What is **ATP**? >> Energy currency #bio #cells");
  assert.equal(anki[1].text, "{{Na}} pump");
});

test("export: Markdown, OPML, Anki, CSV and the native format round trip", () => {
  const kb = M.emptyKb(), d = doc(kb, "Heart"), other = doc(kb, "Lungs");
  const a = bullet(kb, d.id, `Systole >> ventricles contract, see [[${other.id}]]`);
  bullet(kb, a.id, "detail", { todo: "open" });
  bullet(kb, d.id, "", { table: { rows: [["A", "B"], ["1", "2"]] } });
  const md = IO.toMarkdown(kb, d.id);
  assert.match(md, /^# Heart/);
  assert.match(md, /- Systole >> ventricles contract, see \[\[Lungs\]\]/);
  assert.match(md, /  - \[ \] detail/);
  assert.match(md, /\| A \| B \|/);
  assert.match(IO.toOPML(kb, d.id), /<outline text="Systole &gt;&gt; ventricles contract, see \[\[Lungs\]\]">/);
  assert.match(IO.toAnki(kb, d.id), /^#separator:tab\n#html:true\n#tags column:3\nSystole\tventricles contract, see Lungs\tGradify Heart/);
  assert.match(IO.toCSV(kb, d.id), /"Systole","ventricles contract, see Lungs","basic"/);
  assert.match(IO.toHTML(kb, d.id), /<h1>Heart<\/h1>/);
  const back = M.emptyKb(); back.rems[other.id] = structuredClone(kb.rems[other.id]); back.roots.push(other.id);
  const [copy] = IO.fromNative(back, IO.toNative(kb, d.id));
  assert.notEqual(copy, d.id, "new ids");
  assert.equal(M.cardsUnder(back, copy).length, 1);
  assert.match(M.plain(back, back.rems[back.rems[copy].kids[0]].text), /see Lungs/, "a link to a rem this base has is kept");
  assert.throws(() => IO.fromNative(back, { nope: 1 }));
});

test("ask your notes: finds the passage that answers, and quotes it", async () => {
  const A = await import("../kit/notes/kb/ask.js");
  const kb = M.emptyKb(), bio = doc(kb, "Biology"), chem = doc(kb, "Chemistry");
  const m = bullet(kb, bio.id, "Mitochondria");
  bullet(kb, m.id, "Mitochondria release energy through aerobic respiration.");
  bullet(kb, m.id, "They have their own DNA.");
  bullet(kb, chem.id, "Le Chatelier's principle: a system at equilibrium shifts to oppose a change.");
  const found = A.rank(A.passages(kb), "Where is energy released in the cell by respiration?");
  assert.match(found[0].text, /aerobic respiration/);
  assert.deepEqual(found[0].path.slice(0, 2), ["Biology", "Mitochondria"]);
  assert.ok(found.every((p) => p.doc === bio.id), "the chemistry note doesn't answer it");
  const ans = A.answer(found, "Where is energy released by respiration?");
  assert.match(ans[0].s, /aerobic respiration/);
  assert.deepEqual(A.rank(A.passages(kb), "the of and"), [], "only stop words: nothing");
  const pdf = A.rank(A.passages(kb, [{ id: "p", doc: "p", path: ["Lecture.pdf", "page 3"], text: "Equilibrium constants depend on temperature." }]), "equilibrium temperature");
  assert.equal(pdf[0].id, "p");
});

// ---------- merge: linear time, the same result as before ----------
const BEFORE = await import("./fixtures/kb-model-before-linear-merge.mjs");
let seed = 7;
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
/** Two device copies of one base, diverged: edits, moves (some making loops between the copies), deletions, new rems. */
function diverged(n) {
  const base = M.emptyKb();
  const docs = Array.from({ length: Math.max(2, Math.round(n / 100)) }, (_, i) => M.create(base, { text: `Doc ${i}`, doc: true }));
  const ids = [];
  for (let i = 0; i < n; i++) { const p = ids.length && rand() < 0.6 ? ids[Math.floor(rand() * ids.length)] : docs[Math.floor(rand() * docs.length)].id; ids.push(M.create(base, { parent: p, text: `r${i}` }).id); }
  for (const r of Object.values(base.rems)) r.c = Math.floor(rand() * 50);   // ties in creation time, on purpose
  const a = structuredClone(base), b = structuredClone(base);
  for (const [k, side] of [[0, a], [1, b]]) {
    for (let i = 0; i < n / 20; i++) {
      const x = ids[Math.floor(rand() * ids.length)], r = side.rems[x]; if (!r) continue;
      const roll = rand();
      if (roll < 0.4) { r.text += ` (${k})`; r.u += 1 + Math.floor(rand() * 20); }
      else if (roll < 0.7) { const to = ids[Math.floor(rand() * ids.length)]; if (to !== x && side.rems[to]) { r.parent = to; side.rems[to].kids.push(x); r.u += 1 + Math.floor(rand() * 20); } }
      else if (roll < 0.8) M.remove(side, x);
      else M.create(side, { parent: x, text: `new ${k}${i}` });
    }
    side.u += k + 1;
  }
  // a deliberate loop across the two copies, and a duplicate in a child list
  const [p, q] = [ids[1], ids[2]];
  if (a.rems[p] && a.rems[q] && b.rems[p] && b.rems[q]) { a.rems[p].parent = q; a.rems[p].u += 99; b.rems[q].parent = p; b.rems[q].u += 99; }
  const d = docs[0].id; a.rems[d].kids.push(a.rems[d].kids[0]);
  return [a, b];
}
const shape = (kb) => ({ roots: kb.roots, tree: Object.fromEntries(Object.values(kb.rems).map((r) => [r.id, [r.parent, r.kids, r.text]])), gone: Object.keys(kb.gone).sort() });

test("merge gives exactly the same result as before the speed-up, on 20 randomised pairs of copies", () => {
  for (let k = 0; k < 20; k++) {
    const [a, b] = diverged(300 + k * 40);
    const now = shape(M.merge(structuredClone(a), structuredClone(b))), then = shape(BEFORE.merge(structuredClone(a), structuredClone(b)));
    assert.deepEqual(now, then, `pair ${k}`);
    // and both ways round
    assert.deepEqual(shape(M.merge(structuredClone(b), structuredClone(a))), shape(BEFORE.merge(structuredClone(b), structuredClone(a))), `pair ${k}, reversed`);
  }
});

test("merge always leaves a valid tree: no loops, every rem listed once by its parent", () => {
  for (let k = 0; k < 10; k++) {
    const m = M.merge(...diverged(500));
    const listed = new Map();
    for (const id of m.roots) listed.set(id, null);
    for (const r of Object.values(m.rems)) for (const c of r.kids) { assert.ok(!listed.has(c), "listed once"); listed.set(c, r.id); }
    for (const r of Object.values(m.rems)) {
      assert.equal(listed.get(r.id), r.parent, "listed by the parent it names");
      const seen = new Set(); let p = r.parent; while (p) { assert.ok(!seen.has(p), "no loops"); seen.add(p); p = m.rems[p].parent; }
    }
  }
});

test("merge takes linear time: 1,000 to 10,000 bullets (it took 29 s at 10,000 before)", () => {
  const times = {};
  for (const n of [1000, 2000, 4000, 8000, 10000]) {
    const [a, b] = diverged(n);
    const t = performance.now(); M.merge(a, b); times[n] = performance.now() - t;
  }
  // generous for slow machines: quadratic growth would be ~100× from 1,000 to 10,000, linear ~10×
  assert.ok(times[10000] < 3000, `10,000 bullets merged in ${Math.round(times[10000])} ms`);
  assert.ok(times[10000] / Math.max(times[1000], 5) < 40, `growth ${JSON.stringify(Object.fromEntries(Object.entries(times).map(([k, v]) => [k, Math.round(v)])))}`);
});
