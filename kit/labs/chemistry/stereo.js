// Stereochemistry: the chirality explorer (ctx.mode "chirality": a molecule beside its mirror image, which you
// can turn to test whether they superimpose), the R/S exercise (ctx.mode "rs": rank the groups by CIP priority
// and assign the configuration) and the E/Z exercise (ctx.mode "ez"). Answers come from the CIP routines in
// mol.js, which handle textbook cases (first point of difference by atomic number, duplicated atoms for
// multiple bonds) but not every subtle rule.
import { shell, seg, button, panel, challenges, esc, canvas, clear, text, C } from "../lab.js";
import { stage3d, THREE } from "../three.js";
import { molecule, cipRank, chirality, stereocentres, parseSmiles, addHydrogens } from "./mol.js";
import { drawMolecule, frame } from "./molview.js";

const CHIRAL = [["Bromochlorofluoromethane", "F[C@H](Cl)Br"], ["Butan-2-ol", "CC[C@@H](C)O"], ["L-Alanine", "C[C@@H](C(=O)O)N"], ["Lactic acid", "C[C@H](O)C(=O)O"], ["Propan-2-ol", "CC(C)O"], ["Glycine", "NCC(=O)O"], ["Dichlorofluoromethane", "FC(Cl)Cl"], ["2-Chlorobutane", "CC[C@H](C)Cl"]];
const RS = [["F[C@H](Cl)Br"], ["F[C@@H](Cl)Br"], ["CC[C@@H](C)O"], ["CC[C@H](C)O"], ["C[C@@H](C(=O)O)N"], ["C[C@H](C(=O)O)N"], ["C[C@H](O)C(=O)O"], ["CC[C@H](C)Cl"], ["OC[C@@H](O)C=O"], ["OC[C@H](O)C=O"], ["C[C@H](Br)C=C"], ["CC[C@@H](Br)C(C)C"]];
// E/Z cases: [up-left, down-left, up-right, down-right] substituents as SMILES fragments, with display labels
const EZ = [
  [["C", "[H]", "C", "[H]"], ["CH₃", "H", "CH₃", "H"]], [["C", "[H]", "[H]", "C"], ["CH₃", "H", "H", "CH₃"]],
  [["Br", "C", "Cl", "[H]"], ["Br", "CH₃", "Cl", "H"]], [["CC", "C", "C", "Cl"], ["C₂H₅", "CH₃", "CH₃", "Cl"]],
  [["CO", "C", "[H]", "C"], ["CH₂OH", "CH₃", "H", "CH₃"]], [["C(=O)O", "CC", "Br", "F"], ["COOH", "C₂H₅", "Br", "F"]],
  [["C(C)C", "CCC", "[H]", "C=C"], ["CH(CH₃)₂", "CH₂CH₂CH₃", "H", "CH=CH₂"]], [["I", "Cl", "C", "CC"], ["I", "Cl", "CH₃", "C₂H₅"]],
];
const heavy = (frag) => parseSmiles(frag).atoms.length;
export function ezAnswer([ul, dl, ur, dr]) {
  const smi = `C(${ul})(${dl})=C(${ur})${dr}`, m = addHydrogens(parseSmiles(smi));
  const iUL = 1, iDL = 1 + heavy(ul), iR = iDL + heavy(dl), iUR = iR + 1, iDR = iUR + heavy(ur);
  const L = cipRank(m, 0, [iUL, iDL]), R = cipRank(m, iR, [iUR, iDR]);
  if (L.tie || R.tie) return null;
  return (L.order[0] === iUL) === (R.order[0] === iUR) ? "Z" : "E";
}

export function mount(el, ctx = {}) {
  const mode = ctx.mode || "chirality";
  return mode === "ez" ? ezLab(el, ctx) : mode === "rs" ? rsLab(el, ctx) : chiralLab(el, ctx);
}

function chiralLab(el, ctx) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-row tools"></div>`);
  const S = stage3d($(".lab-stage"), { distance: 12, aspect: 0.62 }); S.spin = 0;
  const ctrl = $(".lab-ctrl"), info = panel(ctrl);
  let k = 0, mirror = null; const judged = new Map();
  const st = { right: 0 };
  const ch = challenges(ctrl, ctx, [{ id: "judge", text: "Decide correctly whether six molecules are chiral", test: (x) => x.right >= 6 }]);
  seg($(".top"), CHIRAL.map(([n], i) => [i, n]), k, (v) => { k = Number(v); build(); });
  const rot = (ax, d) => { if (mirror) mirror.rotateOnWorldAxis(new THREE.Vector3(...ax), d); };
  button($(".tools"), "Turn mirror image ⟲ y", () => rot([0, 1, 0], Math.PI / 6)); button($(".tools"), "⟲ x", () => rot([1, 0, 0], Math.PI / 6)); button($(".tools"), "⟲ z", () => rot([0, 0, 1], Math.PI / 6));
  function build() {
    S.clear(); const [name, smi] = CHIRAL[k], m = molecule(smi), sc = stereocentres(m);
    const left = drawMolecule(S, m, { offset: [-3.2, 0, 0], highlight: new Set(sc) });
    const mm = { ...m, pos: m.pos.map(([x, y, z]) => [-x, y, z]) }; mirror = drawMolecule(S, mm, { highlight: new Set(sc) }); mirror.position.x = 3.2;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 6), new THREE.MeshBasicMaterial({ color: 0x88aaff, transparent: true, opacity: 0.4 })); S.root.add(plane);
    S.camera.position.set(0, 1, 13); void left;
    const chiral = sc.length > 0, verdict = judged.get(k);
    info(`<h4>${esc(name)}</h4><p>Left: the molecule. Right: its mirror image. Turn the mirror image: can you make it match?</p>
      <div class="lab-chips"><button type="button" data-a="1" class="${verdict === true ? (chiral ? "ok" : "no") : ""}">Chiral</button><button type="button" data-a="0" class="${verdict === false ? (!chiral ? "ok" : "no") : ""}">Achiral</button></div>
      <p class="lab-msg">${verdict == null ? "Glowing atoms are stereocentres, if any." : chiral ? "Chiral: a carbon with four different groups (a stereocentre) makes the molecule non-superimposable on its mirror image. The two mirror forms are enantiomers." : "Achiral: two groups on the central carbon are the same, so the mirror image can be turned to match exactly."}</p>`);
    $.all("[data-a]").forEach((b) => b.addEventListener("click", () => { if (!judged.has(k)) { judged.set(k, b.dataset.a === "1"); if ((b.dataset.a === "1") === chiral) st.right++; ch.check(st); } build(); }));
  }
  build();
  return () => S.stop();
}

function rsLab(el, ctx) {
  const $ = shell(el, `<div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-row tools"></div>`);
  const S = stage3d($(".lab-stage"), { distance: 9, aspect: 0.8 }); S.spin = 0;
  const ctrl = $(".lab-ctrl"), info = panel(ctrl);
  let m, c, picks = [], answer, score = 0, tried = 0, idx = 0;
  const st = { score: 0 };
  const ch = challenges(ctrl, ctx, [{ id: "five", text: "Assign R or S correctly five times", test: (x) => x.score >= 5 }]);
  button($(".tools"), "Next molecule", () => { idx = (idx + 1 + Math.floor(Math.random() * 3)) % RS.length; build(); }, "pri");
  button($(".tools"), "Clear my ranking", () => { picks = []; build(true); });
  function build(keep = false) {
    if (!keep) { m = molecule(RS[idx][0]); c = stereocentres(m)[0]; answer = chirality(m, c); picks = []; }
    S.clear();
    const subs = m.atoms[c].nb, labels = {}; subs.forEach((s) => { const p = picks.indexOf(s); labels[s] = p >= 0 ? `${p + 1}` : "?"; });
    const g = drawMolecule(S, m, { highlight: new Set([c]), labels }); frame(S, m, 0.8);
    g.children.forEach((mesh) => { if (subs.includes(mesh.userData?.atom)) mesh.userData.pick = mesh.userData.atom; });
    const correct = cipRank(m, c).order;
    info(`<p>The glowing carbon is a stereocentre. <b>1.</b> Tap its four neighbours in order of CIP priority, highest first (higher atomic number wins; if tied, look one atom further out). <b>2.</b> Turn the model so the lowest-priority group points away from you, then choose R (1→2→3 clockwise) or S.</p>
      <p>Your ranking: ${picks.length ? picks.map((p, i) => `${i + 1}: ${m.atoms[p].el}`).join(" · ") : "–"} ${picks.length === 4 ? (picks.every((p, i) => p === correct[i]) ? "<b style='color:#40d4b1'>✓ correct priorities</b>" : "<b style='color:#ff8aa5'>not quite: compare the atoms attached, one sphere at a time</b>") : ""}</p>
      <div class="lab-chips"><button type="button" data-rs="R">R</button><button type="button" data-rs="S">S</button></div><p class="lab-msg">Score ${score} / ${tried}</p>`);
    $.all("[data-rs]").forEach((b) => b.addEventListener("click", () => { tried++; const ok = b.dataset.rs === answer; if (ok) { score++; st.score = score; ch.check(st); } b.classList.add(ok ? "ok" : "no"); $.root.querySelector(".lab-msg").innerHTML = `${ok ? "Correct" : `It's ${answer}`}. Score ${score} / ${tried}`; }));
  }
  // tap atoms in the 3D view to rank them
  const ray = new THREE.Raycaster(), v = new THREE.Vector2(); let down = null;
  S.renderer.domElement.addEventListener("pointerdown", (e) => { down = [e.clientX, e.clientY]; });
  S.renderer.domElement.addEventListener("pointerup", (e) => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
    const r = S.renderer.domElement.getBoundingClientRect(); v.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(v, S.camera);
    const hit = ray.intersectObjects(S.root.children.flatMap((g) => g.children), false).find((h) => h.object.userData?.pick != null);
    if (hit && !picks.includes(hit.object.userData.pick) && picks.length < 4) { picks.push(hit.object.userData.pick); build(true); }
  });
  build();
  return () => S.stop();
}

function ezLab(el, ctx) {
  const $ = shell(el, `<div class="lab-stage"></div><div class="lab-row tools"></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.42, max: 260 }), out = panel($(".lab-out"));
  let k = 0, score = 0, tried = 0; const st = { score: 0 };
  const ch = challenges($(".lab-out"), ctx, [{ id: "six", text: "Assign E or Z correctly six times", test: (x) => x.score >= 6 }]);
  const tools = $(".tools");
  const pick = (v) => { const ans = ezAnswer(EZ[k][0]); tried++; const ok = v === ans; if (ok) { score++; st.score = score; ch.check(st); } msg = `${ok ? "Correct" : `It's ${ans}`}: on each carbon the higher-priority groups are ${ans === "Z" ? "on the same side (zusammen)" : "on opposite sides (entgegen)"}. Score ${score} / ${tried}.`; paint(); };
  let msg = "";
  button(tools, "E", () => pick("E")); button(tools, "Z", () => pick("Z")); button(tools, "Next", () => { k = (k + 1) % EZ.length; msg = ""; paint(); }, "pri");
  function paint() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const cx = W / 2, cy = H / 2, d = 40, [ul, dl, ur, dr] = EZ[k][1];
    g.strokeStyle = "#e9ecef"; g.lineWidth = 3; g.beginPath(); g.moveTo(cx - d, cy - 4); g.lineTo(cx + d, cy - 4); g.moveTo(cx - d, cy + 4); g.lineTo(cx + d, cy + 4); g.stroke();
    const arm = (x0, y0, ang, lab) => { const x1 = x0 + Math.cos(ang) * 50, y1 = y0 + Math.sin(ang) * 50; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); text(g, lab, x1 + Math.cos(ang) * 8, y1 + Math.sin(ang) * 8 + 5, { align: ang > Math.PI / 2 || ang < -Math.PI / 2 ? "right" : "left", size: 16, weight: 600 }); };
    g.lineWidth = 2.5; arm(cx - d, cy, -2.3, ul); arm(cx - d, cy, 2.3, dl); arm(cx + d, cy, -0.84, ur); arm(cx + d, cy, 0.84, dr);
    out(`<p>Rank the two groups on each carbon by CIP priority (higher atomic number at the first point of difference). Same side: <b>Z</b>; opposite sides: <b>E</b>.</p><p class="lab-msg">${msg || `Molecule ${k + 1} of ${EZ.length}.`}</p>`);
  }
  paint();
}
