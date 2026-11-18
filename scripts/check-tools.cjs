// Tools and the Free allowances in a real browser: the hub, lesson search, picking facts into a mind map, the
// flashcard creator (suggestions, an image, card and inline review), the notes converter's four outputs, the glass
// diagrams on a lesson, and the limits (with ?limits=preview): 10 lessons per course, 5 mind maps, then the banner.
//   python3 -m http.server 8080 &   then   node scripts/check-tools.cjs [http://localhost:8080]
const { chromium, devices } = require("playwright");
const fs = require("fs"), os = require("os"), path = require("path");
const base = process.argv.find((a) => a.startsWith("http")) || "http://localhost:8080";
let failed = 0;
const check = (ok, what) => { console.log(`${ok ? "ok  " : "FAIL"} ${what}`); if (!ok) failed++; };
// a small real PNG, for adding an image to a card
function png() {
  const zlib = require("zlib"), w = 32, h = 32, rows = [];
  for (let y = 0; y < h; y++) { rows.push(Buffer.from([0])); for (let x = 0; x < w; x++) rows.push(Buffer.from([x * 8, y * 8, 200])); }
  const crc = (b) => { let c, t = []; for (let n = 0; n < 256; n++) { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } c = 0xffffffff; for (const x of b) c = t[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  const file = path.join(os.tmpdir(), `gradify-check-${process.pid}.png`);
  fs.writeFileSync(file, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(Buffer.concat(rows))), chunk("IEND", Buffer.alloc(0))]));
  return file;
}

async function app(b, opts = { viewport: { width: 1440, height: 950 } }) {
  const ctx = await b.newContext(opts), pg = await ctx.newPage(), errs = [];
  pg.on("pageerror", (e) => errs.push(e.message));
  await pg.goto(`${base}/app.html#/start`, { waitUntil: "networkidle" }); await pg.waitForTimeout(600);
  if (await pg.locator("#skip").count()) { await pg.locator("#skip").click(); await pg.waitForTimeout(600); }
  return { ctx, pg, errs };
}

(async () => {
  const b = await chromium.launch();
  {
    const { ctx, pg, errs } = await app(b);
    await pg.goto(`${base}/app.html#/tools`); await pg.waitForTimeout(900);
    check(await pg.locator(".tl-tile").count() === 4, "Tools: four tools, with glass icons");
    check(await pg.locator(".lo-side a[data-route=tools]").count() === 1, "Tools is in the app's navigation");
    // search and pick
    await pg.goto(`${base}/app.html#/tools/search`); await pg.waitForTimeout(700);
    await pg.locator(".tl-search input").fill("osmosis"); await pg.waitForTimeout(800);
    check(await pg.locator(".tl-hit").count() >= 3, "lesson search finds lessons in several subjects");
    await pg.locator(".tl-open").first().click(); await pg.waitForTimeout(800);
    const sw = pg.locator(".tl-switch");
    check(await sw.count() >= 5, "an opened lesson lists its facts with switches");
    await sw.nth(0).check(); await sw.nth(2).check(); await sw.nth(3).check();
    await pg.locator('[data-send="map"]').click(); await pg.waitForTimeout(1800);
    check(/#\/tools\/map\/m/.test(pg.url()), "picked facts open in a new mind map");
    check(await pg.locator(".tl-map .me-main > .me-wrapper").count() === 1 && await pg.locator(".tl-map .me-tpc").count() >= 5, "one branch for the lesson, with its sections and facts");
    // toggle more facts in the creator
    await pg.locator(".tl-side .tl-search input").fill("mitosis"); await pg.waitForTimeout(800);
    await pg.locator(".tl-side .tl-open").first().click(); await pg.waitForTimeout(800);
    const before = await pg.locator(".tl-map .me-tpc").count();
    await pg.locator(".tl-side .tl-switch").first().check(); await pg.waitForTimeout(300);
    check(await pg.locator(".tl-map .me-tpc").count() > before && await pg.locator(".tl-map .me-main > .me-wrapper").count() === 2, "toggling a fact on adds it under its own lesson");
    await pg.locator(".tl-side .tl-switch").first().uncheck(); await pg.waitForTimeout(300);
    check(await pg.locator(".tl-map .me-main > .me-wrapper").count() === 1, "toggling it off removes it, and the emptied lesson");
    const [dl] = await Promise.all([pg.waitForEvent("download", { timeout: 30000 }), pg.locator('[data-act="png"]').click()]);
    const buf = fs.readFileSync(await dl.path());
    check(buf.readUInt32BE(16) === 3840 && buf.readUInt32BE(20) === 2160, "a made map exports at 3840 × 2160");
    // flashcards
    await pg.goto(`${base}/app.html#/tools/cards/new`); await pg.waitForTimeout(1200);
    await pg.locator(".tl-text").fill("Mitochondria >> Make ATP\nThe {{nucleus}} holds the {{DNA}}.\nOsmosis :: Water across a membrane\nDiffusion: the net movement of particles from high to low concentration.\nStages >>>\n  Prophase\n  Metaphase");
    await pg.waitForTimeout(500);
    check((await pg.locator(".tl-count").textContent()).startsWith("6 cards"), "the editor turns >>, cloze, :: and >>> lines into cards");
    await pg.locator('[data-act="suggest"]').click(); await pg.waitForTimeout(600);
    check(await pg.locator(".tl-sugg li").count() >= 1, "Gradify suggests cards for plain notes");
    await pg.locator("[data-addall]").click(); await pg.waitForTimeout(500);
    await pg.locator(".tl-text").press("Control+End"); await pg.locator(".tl-text").type("\nLabel this >> ");
    await pg.locator("[data-img]").setInputFiles(png()); await pg.waitForTimeout(900);
    check(await pg.locator(".tl-pv .tc-img").count() === 1, "an image added to a card shows on the card");
    await pg.locator('a:has-text("Review")').click(); await pg.waitForTimeout(700);
    await pg.locator(".tl-card").click(); await pg.waitForTimeout(200);
    check(await pg.locator(".tl-rate [data-rate]").count() === 4, "card review: flip, then four ratings with their intervals");
    await pg.locator('[data-rate="good"]').click(); await pg.waitForTimeout(300);
    check(/^2 \//.test(await pg.locator(".sess-top .sub").textContent()), "rating moves to the next card");
    await pg.goto(pg.url().replace(/\/review$/, "")); await pg.waitForTimeout(700);
    await pg.locator('[data-style="inline"]').click(); await pg.locator('a:has-text("Review")').click(); await pg.waitForTimeout(700);
    await pg.locator("[data-show]").first().click(); await pg.locator(".tl-inline [data-rate=easy]").first().click(); await pg.waitForTimeout(300);
    check(await pg.locator(".tl-inline li.rated").count() === 1, "inline review: reveal in place and rate");
    // converter
    await pg.goto(`${base}/app.html#/tools/convert`); await pg.waitForTimeout(800);
    await pg.locator(".tl-text").fill(await pg.evaluate(async () => (await import("/kit/notes/studio.js")).SAMPLE));
    for (const v of ["chant", "sheet"]) await pg.locator(`.tl-outs input[value=${v}]`).check({ force: true });
    await pg.locator('[data-act="go"]').click(); await pg.waitForTimeout(2500);
    check(await pg.locator('[data-out="map"] .me-tpc').count() >= 10, "converter: a mind map");
    check(await pg.locator('[data-out="cards"] .tl-pv').count() >= 5, "converter: flashcards");
    check(await pg.locator(".tl-chant li").count() >= 10 && await pg.locator('[data-out="chant"] [data-play]').count() === 1, "converter: a chant with a voice player");
    check(await pg.locator(".tl-stile").count() >= 3 && await pg.locator(".tl-stile .gd").count() >= 1, "converter: a cheatsheet of glass tiles, with diagrams");
    check(!errs.length, `Tools: no page errors ${errs.join("; ")}`);
    await ctx.close();
  }
  {
    const { ctx, pg, errs } = await app(b, devices["iPhone 13"]);
    for (const r of ["tools", "tools/search", "tools/cards/new", "tools/convert"]) {
      await pg.goto(`${base}/app.html#/${r}`); await pg.waitForTimeout(900);
      check(await pg.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `phone: #/${r} has no sideways scrolling`);
    }
    check(!errs.length, `phone: no page errors ${errs.join("; ")}`);
    await ctx.close();
  }
  {
    // Tools in the account: two devices (separate browsers) sharing a stand-in for the account's tables
    // (public.tool_items, public.tool_images), with the database's own timestamps
    const tables = { tool_items: [], tool_images: [] }; let tick = 0;
    const handle = (raw) => {
      const op = JSON.parse(raw), t = tables[op.table];
      if (op.op === "select") return JSON.stringify({ data: op.in ? t.filter((r) => op.in[1].includes(r[op.in[0]])) : t, error: null });
      const i = t.findIndex((r) => r.id === op.row.id);
      if (op.ignore && i >= 0) return JSON.stringify({ data: null, error: null });
      const row = { ...(i >= 0 ? t[i] : {}), ...op.row, updated_at: new Date(Date.UTC(2026, 10, 18) + ++tick * 1000).toISOString() };
      if (i >= 0) t[i] = row; else t.push(row);
      return JSON.stringify({ data: op.single ? { updated_at: row.updated_at } : null, error: null });
    };
    const device = async () => {
      const ctx = await b.newContext(), pg = await ctx.newPage(), errs = []; pg.on("pageerror", (e) => errs.push(e.message));
      await pg.exposeFunction("fakeDb", handle);
      await pg.goto(`${base}/app.html#/start`, { waitUntil: "networkidle" });
      await pg.evaluate(async () => {
        const call = (op) => window.fakeDb(JSON.stringify(op)).then(JSON.parse);
        const db = { from: (table) => ({
          select: () => ({ in: (col, vals) => call({ table, op: "select", in: [col, vals] }), then: (a, b) => call({ table, op: "select" }).then(a, b) }),
          upsert: (row, o = {}) => ({ select: () => ({ single: () => call({ table, op: "upsert", row, single: true }) }), then: (a, b) => call({ table, op: "upsert", row, ignore: o.ignoreDuplicates }).then(a, b) }),
        }) };
        window.T = await import("/kit/tools/store.js");
        await window.T.connect({ mode: "cloud", db });
      });
      return { ctx, pg, errs };
    };
    const A = await device(), B = await device();
    await A.pg.evaluate(async () => {
      const c = document.createElement("canvas"); c.width = c.height = 40; c.getContext("2d").fillRect(0, 0, 20, 20);
      const img = await window.T.addImage(new File([await new Promise((ok) => c.toBlob(ok, "image/png"))], "a.png", { type: "image/png" }));
      const d = window.T.saveDeck({ id: "dsync1", title: "Cells", text: `Mitochondria >> Make ATP\n![a](img:${img}) Label >> Nucleus` });
      window.T.saveSchedule(d.id, "card1", { reps: 1, due_at: "2026-12-01T00:00:00Z" });
      window.T.saveMap({ id: "msync1", title: "Map", data: { nodeData: { id: "root", topic: "Map", children: [] } } });
      await window.T.sync();
    });
    await B.pg.evaluate(() => window.T.sync());
    const b1 = await B.pg.evaluate(async () => { const d = window.T.deck("dsync1"), id = d.text.match(/img:([a-z0-9-]+)/)[1]; return { title: d.title, srs: window.T.schedules("dsync1").card1?.reps, map: window.T.map("msync1")?.title, img: Boolean((await window.T.imageUrls([id]))(id)) }; });
    check(b1.title === "Cells" && b1.srs === 1 && b1.map === "Map" && b1.img, `account: a deck (with its schedule and image) and a map made on one device arrive on another ${JSON.stringify(b1)}`);
    await B.pg.evaluate(async () => { window.T.saveDeck({ ...window.T.deck("dsync1"), title: "Cells, edited on B" }); await window.T.sync(); });
    await A.pg.evaluate(() => window.T.sync());
    check(await A.pg.evaluate(() => window.T.deck("dsync1").title) === "Cells, edited on B", "account: an edit on one device reaches the other");
    await A.pg.evaluate(async () => { window.T.deleteMap("msync1"); await window.T.sync(); });
    await B.pg.evaluate(() => window.T.sync());
    check(await B.pg.evaluate(() => window.T.map("msync1")) === null, "account: a deletion reaches the other device, and isn't brought back");
    check(!A.errs.length && !B.errs.length, `account: no page errors ${[...A.errs, ...B.errs].join("; ")}`);
    await A.ctx.close(); await B.ctx.close();
  }
  {
    // a lesson's glass diagrams
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }), pg = await ctx.newPage();
    await pg.goto(`${base}/medgradify/course/#/lesson/u01-02`, { waitUntil: "networkidle" }); await pg.waitForTimeout(800);
    check(await pg.locator(".mv-cols .gd").count() >= 2, "a lesson shows glass diagrams beside its parts");
    check(await pg.locator(".co-licon .g3d").count() === 1 && await pg.locator(".mm-card .g3d").count() === 5, "the lesson and its five maps have glass icons");
    await ctx.close();
  }
  {
    // the Free allowances, previewed
    const ctx = await b.newContext({ viewport: { width: 1280, height: 860 } }), pg = await ctx.newPage(), errs = [];
    pg.on("pageerror", (e) => errs.push(e.message));
    await pg.goto(`${base}/scigradify/chemistry/?limits=preview#/learn`, { waitUntil: "networkidle" }); await pg.waitForTimeout(700);
    const ids = await pg.evaluate(async () => (await fetch("/kit/api/v1/courses/chemistry.json").then((r) => r.json())).units.flatMap((u) => u.lessons.map((l) => l.id)).slice(0, 11));
    let open = 0;
    for (const id of ids) { await pg.evaluate((x) => { location.hash = `#/lesson/${x}`; }, id); await pg.waitForTimeout(500); if (!(await pg.locator(".lim-lock").count())) open++; }
    check(open === 10, `Free: 10 lessons open in a course (${open})`);
    check(await pg.locator(".lim-banner.locked").count() === 1 && await pg.locator(".lim-banner .lim-cta").getAttribute("href") === "/pricing.html", "the 11th shows the Liquid Glass Plus banner");
    await pg.evaluate((x) => { location.hash = `#/lesson/${x}`; }, ids[0]); await pg.waitForTimeout(600);
    check(!(await pg.locator(".lim-lock").count()), "a lesson already opened stays open");
    await pg.locator(".mm-card").first().click(); await pg.waitForTimeout(800);
    for (let i = 1; i < 5; i++) { await pg.locator(`.mm-select [data-map="${i}"]`).click(); await pg.waitForTimeout(500); }
    await pg.locator('[data-act="close"]').click();
    await pg.evaluate((x) => { location.hash = `#/lesson/${x}`; }, ids[1]); await pg.waitForTimeout(700);
    await pg.locator(".mm-card").first().click(); await pg.waitForTimeout(800);
    check(await pg.locator(".mm-viewer").count() === 0 && await pg.locator(".lim-banner.locked").count() === 1, "Free: the 6th mind map shows the banner instead");
    await pg.goto(`${base}/scigradify/chemistry/?limits=off#/learn`); await pg.waitForTimeout(400);
    check(!errs.length, `limits: no page errors ${errs.join("; ")}`);
    await ctx.close();
  }
  await b.close();
  console.log(failed ? `\n${failed} check(s) failed.` : "\nEvery check passed.");
  process.exitCode = failed ? 1 : 0;
})();
