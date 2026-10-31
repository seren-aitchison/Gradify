// Browser regression check for Body Intelligence's anatomical layers (sportgradify/body.html).
// Toggles every combination of Muscles, Skeleton, Skin, Heart & lungs and Head through the real
// checkboxes and checks, for every mesh in the figure, that its visibility matches its own layer and
// that no toggle changed another layer's materials; then checks X-ray only changes muscle and bone,
// and that a selected muscle survives unrelated toggles. Needs Playwright with Chromium.
//   npm run serve          (in one terminal)
//   node scripts/check-body-layers.cjs      (BASE=http://localhost:8080 by default)
const { chromium } = require('playwright');
const log = (...a) => console.log(...a);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  const errs = [];
  p.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  p.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
  await p.goto(`${process.env.BASE || 'http://localhost:8080'}/sportgradify/body.html`);
  await p.waitForFunction(() => !document.querySelector('.bi-loading'), null, { timeout: 180000 });
  // seed data (same as the earlier runs) so modes have colours
  await p.evaluate(async () => {
    localStorage.clear();
    const { openBodyStore } = await import('/kit/sport/body-store.js');
    const { store } = await openBodyStore();
    const d = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
    const S = (exercise, n, reps, load_kg, rpe, side) => Array.from({ length: n }, () => ({ exercise, reps, load_kg, rpe, ...(side ? { side } : {}) }));
    for (let wk = 11; wk >= 0; wk--) {
      const g = 1 + (11 - wk) * 0.012;
      await store.saveWorkout({ date: d(wk * 7 + 4), sets: [...S('back_squat', 4, 5, Math.round(100 * g), 8), ...S('romanian_deadlift', 3, 8, 80, 8), ...S('lunge', 3, 10, 16, 8, 'l')] });
      await store.saveWorkout({ date: d(wk * 7 + 2), sets: [...S('bench_press', 4, 6, Math.round(70 * g), 8), ...S('lateral_raise', 3, 12, 8, 8), ...S('pull_up', 2, 8, 0, 8)] });
    }
    await store.saveWorkout({ date: d(0), sets: S('back_squat', 5, 5, 115, 9) });
    await store.saveCheckin({ soreness: { hamstrings: 2 } });
    await store.saveTest({ test: 'run_5k', value: 29.5, date: d(70) }); await store.saveTest({ test: 'run_5k', value: 27.2, date: d(3) });
  });
  await p.reload();
  await p.waitForFunction(() => !document.querySelector('.bi-loading'), null, { timeout: 180000 });

  // ---------- 1. programmatic: every layer combination through the real checkboxes ----------
  const res = await p.evaluate(async () => {
    const v = document.getElementById('body-app').bodyView, { registry } = v._debug;
    const L = ['muscles', 'skeleton', 'skin', 'organs', 'head'];
    const box = (l) => document.querySelector(`[data-layer="${l}"]`);
    const set = (l, on) => { const el = box(l); if (el.checked !== on) el.click(); };
    const mats = () => { const seen = new Map(); for (const m of registry) if (!seen.has(m.material)) seen.set(m.material, `${m.userData.layer}|${m.material.transparent}|${m.material.opacity}|${m.material.color.getHexString()}|${m.material.depthWrite}`); return [...seen.values()].sort().join('\n'); };
    const counts = {}; for (const m of registry) counts[m.userData.layer] = (counts[m.userData.layer] || 0) + 1;
    const failures = [];
    const baseline = mats();
    for (let mask = 0; mask < 32; mask++) {
      const want = Object.fromEntries(L.map((l, i) => [l, Boolean(mask & (1 << i))]));
      for (const l of L) set(l, want[l]);
      for (const m of registry) if (m.visible !== want[m.userData.layer]) { failures.push(`combo ${JSON.stringify(want)}: ${m.userData.key} (${m.userData.layer}) visible=${m.visible}`); break; }
      if (mats() !== baseline) failures.push(`combo ${mask}: materials changed by layer toggles`);
      // the checkbox state and the view's own state agree
      const st = v.layers(); for (const l of L) if (st[l] !== want[l]) failures.push(`combo ${mask}: ${l} state ${st[l]}`);
    }
    for (const l of L) set(l, ['muscles', 'skeleton', 'head'].includes(l));
    // x-ray changes only muscle and bone opacity
    const before = new Map(registry.map((m) => [m, `${m.material.opacity}|${m.material.transparent}`]));
    box('xray').click();
    for (const m of registry) {
      const changed = before.get(m) !== `${m.material.opacity}|${m.material.transparent}`;
      if (changed && !['muscles', 'skeleton'].includes(m.userData.layer)) failures.push(`x-ray changed ${m.userData.key} (${m.userData.layer})`);
      if (!changed && m.userData.layer === 'muscles' && m.userData.muscle) { failures.push(`x-ray didn't change muscle ${m.userData.key}`); break; }
      if (m.visible !== (m.userData.layer !== 'skin' && m.userData.layer !== 'organs')) { failures.push(`x-ray changed visibility of ${m.userData.key}`); break; }
    }
    box('xray').click();
    if (mats() !== baseline) failures.push('materials not restored after x-ray off');
    // selection survives unrelated toggles; hiding muscles clears it
    v.detail(true); v.select('quadriceps', { part: 'rectus_femoris' });
    for (const l of ['skeleton', 'skin', 'organs', 'head']) { box(l).click(); if (v._debug.state.selected !== 'quadriceps' || v._debug.state.selPart !== 'rectus_femoris') failures.push(`toggling ${l} lost the selection`); box(l).click(); }
    box('muscles').click(); if (v._debug.state.selected) failures.push('hidden muscles still selected'); box('muscles').click();
    v.select(null); v.detail(false);
    return { counts, failures, combos: 32 };
  });
  log('layer counts:', JSON.stringify(res.counts));
  log(`combinations tested: ${res.combos}; failures: ${res.failures.length}`); for (const f of res.failures.slice(0, 20)) log('  FAIL', f);

  if (res.failures.length) process.exitCode = 1;
  log(errs.join('\n') || 'no errors');
  await b.close();
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
