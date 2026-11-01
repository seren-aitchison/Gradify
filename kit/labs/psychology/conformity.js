// A line-judgement task in the style of Asch (1951, 1956). Six simulated group members answer before you; on the 12
// critical trials of 18 they all give the same wrong answer. You know they're simulated, so this demonstrates the
// procedure and how conformity is scored rather than reproducing the pressure of a real group, which is the point of
// the ethics discussion that follows.
import { shell, canvas, panel, challenges, clear, line, text, C } from "../lab.js";
import { caveat, table } from "../social/ui.js";

const NAMES = ["Priya", "Tom", "Aisha", "Callum", "Mei", "Daniel"];
// 18 trials: [standard length, [A, B, C] lengths, critical?]; on critical trials the group picks a wrong line
export const TRIALS = [
  [10, [8.5, 10, 12], false], [6, [6, 7.5, 4.5], true], [15, [12, 15, 17.5], true], [5, [5, 6.5, 3.5], true], [12, [14, 12, 10], true],
  [8, [6, 10, 8], false], [11, [11, 13, 8.5], true], [4, [5.5, 4, 3], true], [14, [14, 11.5, 16.5], true], [7, [9, 5.5, 7], false],
  [13, [10.5, 13, 15.5], true], [9, [9, 11, 7], true], [16, [13.5, 18.5, 16], false], [6.5, [6.5, 8, 5], true], [12.5, [10, 12.5, 15], true], [10.5, [12.5, 8.5, 10.5], true], [5.5, [7, 5.5, 4], false], [8.5, [8.5, 7, 10.5], false],
].map(([s, cmp, crit]) => { const right = cmp.indexOf(s); return { s, cmp, crit, right, group: crit ? (right === 0 ? 2 : right === 1 ? 0 : 1) : right }; });
export function score(answers) { const crit = TRIALS.map((t, i) => [t, answers[i]]).filter(([t, a]) => t.crit && a != null); const conf = crit.filter(([t, a]) => a === t.group).length; return { critical: crit.length, conformed: conf, rate: crit.length ? conf / crit.length : 0 }; }

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="sx-panel"><div class="lab-stage"></div><div class="sx-group sx-fb" aria-live="polite"></div><div class="sx-btns sx-list" role="group" aria-label="Your answer"></div><div class="sx-res"></div></div><div class="lab-ctrl"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.42, max: 260 }), grp = $(".sx-group"), btns = $(".sx-btns"), res = panel($(".sx-res")), ctrl = $(".lab-ctrl");
  caveat(ctrl, "In Asch's studies the other group members were confederates of the experimenter: participants were deceived about the study's purpose and debriefed afterwards. Here they are simulated and you know it.");
  const ch = challenges(ctrl, ctx, [{ id: "done", text: "Complete all 18 trials", test: (x) => x.done }, { id: "read", text: "Compare your result with Asch's", test: (x) => x.done }]);
  let i = 0, timer = 0; const answers = [];
  function draw() {
    const t = TRIALS[i], g = cv.g, W = cv.W, H = cv.H, u = (H - 60) / 19; clear(g, W, H);
    const bar = (x, len, lab) => { line(g, [[x, H - 30], [x, H - 30 - len * u]], C.white, 6); text(g, lab, x, H - 10, { align: "center", size: 13, weight: 600 }); };
    bar(W * 0.18, t.s, "Standard"); t.cmp.forEach((c, j) => bar(W * (0.5 + j * 0.16), c, "ABC"[j]));
    text(g, `Trial ${i + 1} of 18`, 10, 18, { size: 12, color: C.mute });
  }
  function trial() {
    if (i >= TRIALS.length) return finish(); draw(); btns.innerHTML = ""; const t = TRIALS[i]; let k = 0; grp.innerHTML = "";
    const say = () => { if (k < NAMES.length) { grp.innerHTML += `${k ? " · " : ""}${NAMES[k]}: <b>${"ABC"[t.group]}</b>`; k++; timer = setTimeout(say, 450); } else { grp.innerHTML += " · <b>Your turn:</b> which line matches the standard?"; btns.innerHTML = [0, 1, 2].map((j) => `<button type="button" data-j="${j}">Line ${"ABC"[j]}</button>`).join(""); btns.querySelector("button").focus(); } };
    timer = setTimeout(say, 400);
  }
  function finish() {
    const s = score(answers); ch.check({ done: true }); grp.textContent = "";
    res(`${table(["", "You", "Asch (1956)"], [["Critical trials answered with the group", `${s.conformed} of ${s.critical} (${Math.round(s.rate * 100)}%)`, "about 37% of critical answers"], ["Conformed at least once", s.conformed ? "yes" : "no", "about three-quarters of participants"], ["Never conformed", s.conformed ? "no" : "yes", "about a quarter of participants"]])}
      <p>Asch's control participants, judging alone, made errors on fewer than 1% of trials, so the lines were not hard to judge. Later variations found conformity rose as the unanimous majority grew to about three people, then levelled off, and fell sharply when one other person gave the right answer.</p>
      <p class="sx-fb"><b>Evaluate:</b> the task was trivial and the group were strangers, so the findings may not generalise to decisions that matter among people who matter. Replications vary by era and culture: Perrin and Spencer (1980) found much less conformity among British students, while a meta-analysis of 133 studies (Bond and Smith, 1996) found conformity declined in the US over time and was higher in collectivist cultures.</p>`);
    btns.innerHTML = `<button type="button" data-again>Run it again</button>`;
  }
  btns.addEventListener("click", (e) => {
    if (e.target.closest("[data-again]")) { i = 0; answers.length = 0; res(""); trial(); return; }
    const b = e.target.closest("button[data-j]"); if (!b) return; answers[i] = Number(b.dataset.j); i++; trial();
  });
  trial(); cv.onresize = () => i < TRIALS.length && draw();
  return () => { clearTimeout(timer); cv.stop(); };
}
