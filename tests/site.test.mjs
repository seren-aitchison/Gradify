import { test } from "node:test";
import assert from "node:assert/strict";
import { SITES, slugOf, pathOf, currentSite } from "../kit/core/site.js";

test("each sub-site has its own folder on getgradify.com", () => {
  assert.equal(pathOf("MedGradify"), "/medgradify/");
  assert.equal(slugOf("TechGradify · ForgeLab"), "techgradify");
  const slugs = SITES.map(slugOf);
  assert.equal(new Set(slugs).size, slugs.length, "no two sites share a folder");
  assert.ok(slugs.every((s) => /^[a-z0-9]+$/.test(s)));
});

test("outside a browser, a page belongs to no single site unless the config says so", () => {
  assert.equal(currentSite(), null);
});

test("a site's first word is drawn in its accent colour", async () => {
  const { nameHtml, accentOf } = await import("../kit/core/site.js");
  const med = SITES.find((s) => s.n === "MedGradify");
  assert.match(nameHtml(med), /<span class="site-accent" style="color:[^"]+">Med<\/span>Gradify<\/span>$/);
  assert.match(nameHtml(SITES.find((s) => s.n === "TechGradify · ForgeLab")), />Tech<\/span>Gradify · ForgeLab/);
  // bright colours are used as they are; dark ones are lifted so they read on black
  assert.equal(accentOf({ c: "a0ff74" }), "#a0ff74");
  assert.notEqual(accentOf({ c: "2e5e18" }), "#2e5e18");
});

test("every site with a page has a headline, three ticks and four checks", async () => {
  const { SITE_PAGES } = await import("../kit/core/site-pages.js");
  for (const [name, p] of Object.entries(SITE_PAGES)) {
    assert.ok(SITES.some((s) => s.n === name), `${name} is a real site`);
    assert.equal(p.h.length, 2); assert.equal(p.ticks.length, 3); assert.equal(p.card.checks.length, 4);
  }
});

test("every built site has homepage content for a known audience, with six topics", async () => {
  const { KINDS, SITES_CONTENT } = await import("../kit/core/site-content.js");
  const { SITE_PAGES } = await import("../kit/core/site-pages.js");
  for (const name of Object.keys(SITE_PAGES)) {
    const c = SITES_CONTENT[name];
    assert.ok(c, `${name} has content`);
    assert.ok(KINDS[c.kind], `${name}'s audience exists`);
    assert.equal(c.topics.length, 6, `${name} has six topics`);
  }
});

test("every built site's learning map has three subtopics for each of its six topics", async () => {
  const { SITE_MAPS } = await import("../kit/core/site-maps.js");
  const { SITES_CONTENT } = await import("../kit/core/site-content.js");
  for (const name of Object.keys(SITES_CONTENT)) {
    assert.equal(SITE_MAPS[name]?.length, 6, `${name} has six areas`);
    assert.ok(SITE_MAPS[name].every((a) => a.length === 3 && a.every(Boolean)), `${name} has three subtopics each`);
  }
});

test("your own topics are sorted into the subject's areas, following their deck when unsure", async () => {
  const { matchTopics } = await import("../kit/learning/topic-match.js");
  const areas = [{ name: "Anatomy", subs: ["Thorax", "Abdomen", "Neuroanatomy"] }, { name: "Physiology", desc: "How each system works", subs: ["Cardiac cycle", "Renal function", "Respiration"] }];
  const { placed, unplaced } = matchTopics(areas, [
    { key: "a", doc: "d1", topic: "Cardiac cycle and output", text: "systole diastole" },
    { key: "b", doc: "d1", topic: "Heart sounds", text: "valves close" },
    { key: "c", doc: "d2", topic: "Medieval poetry", text: "Chaucer" },
  ]);
  assert.equal(placed.find((p) => p.topic.key === "a").area, 1);
  assert.equal(placed.find((p) => p.topic.key === "a").slot, 0, "takes the Cardiac cycle pin's place");
  assert.equal(placed.find((p) => p.topic.key === "b").area, 1, "follows its deck");
  assert.deepEqual(unplaced.map((t) => t.key), ["c"]);
});

test("every sub-site's 3D model teaches what it shows: each part has facts and cards, each section has notes", async () => {
  const { MODELS } = await import("../kit/models/index.js");
  const { existsSync } = await import("node:fs");
  for (const [name, m] of Object.entries(MODELS)) {
    assert.ok(SITES.some((s) => s.n === name), `${name} is a real site`);
    assert.ok(existsSync(`kit/models/${m.file}`), `${name}'s model file exists`);
    assert.ok(existsSync(`${slugOf(name)}/3d.html`), `${name} has its 3D page (npm run add-3d)`);
    const model = (await import(`../kit/models/${m.file}`)).default;
    assert.equal(typeof model.build, "function");
    for (const [id, st] of Object.entries(model.structures)) {
      assert.ok(model.groups[st.group], `${m.file}: ${id} is in a known group`);
      assert.ok(st.facts.length >= 3 && st.cards.length >= 3, `${m.file}: ${id} has three facts and three cards`);
    }
    for (const g of Object.keys(model.groups)) {
      assert.ok(model.notes[g]?.sections.length >= 3, `${m.file}: ${g} has a page of notes`);
      assert.ok(Object.values(model.structures).some((st) => st.group === g), `${m.file}: ${g} has something in the model`);
    }
  }
});
