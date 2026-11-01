// The Big Five (five-factor model): what each trait describes, at each end, and what research associates with it. Set the
// sliders to describe a fictional character and read the profile. An educational demonstration, not a personality test.
import { shell, slider, panel, challenges } from "../lab.js";
import { caveat, esc } from "../social/ui.js";

export const TRAITS = [
  ["Openness to experience", "curious, imaginative, enjoys new ideas and art", "conventional, practical, prefers the familiar", "Linked to creativity and to some political attitudes; the trait most related to fluid intelligence, though modestly."],
  ["Conscientiousness", "organised, dependable, self-disciplined", "spontaneous, flexible, less organised", "The most consistent personality predictor of job performance across occupations (Barrick and Mount, 1991) and of longevity (Friedman et al., 1993)."],
  ["Extraversion", "sociable, energetic, seeks stimulation", "reserved, quiet, prefers calm", "Associated with positive emotion. Eysenck (1967) proposed that introverts have higher baseline cortical arousal; the evidence for that is mixed."],
  ["Agreeableness", "warm, cooperative, trusting", "competitive, sceptical, blunt", "Related to helping and to fewer interpersonal conflicts; it predicts teamwork better than individual task performance."],
  ["Neuroticism", "prone to worry and negative emotion", "emotionally stable, calm under stress", "A risk factor for anxiety and depression (Kotov et al., 2010, meta-analysis). Often reported reversed as emotional stability."],
];
const level = (v) => (v >= 70 ? "high" : v <= 30 ? "low" : "moderate");
export function profile(scores) { return TRAITS.map(([n, hi, lo], i) => ({ n, level: level(scores[i]), text: scores[i] >= 70 ? hi : scores[i] <= 30 ? lo : `between “${hi.split(",")[0]}” and “${lo.split(",")[0]}”` })); }
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div class="sx-panel"><div class="sx-sliders"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), sc = [50, 50, 50, 50, 50], st = { moved: new Set() };
  caveat(ctrl, "<b>Not a personality test.</b> Describe a fictional character to learn what the traits mean. Real measures (such as the NEO-PI-R or the BFI) use many validated items and norms, and are interpreted by trained users; scores describe tendencies, not types.");
  const ch = challenges(ctrl, ctx, [{ id: "all", text: "Explore both ends of all five traits", test: (x) => x.moved.size >= 10 }]);
  TRAITS.forEach(([n], i) => slider($(".sx-sliders"), { label: esc(n), min: 0, max: 100, step: 5, value: 50, fmt: (v) => `${v} (${level(v)})`, onInput: (v) => { sc[i] = v; if (v >= 80) st.moved.add(`${i}h`); if (v <= 20) st.moved.add(`${i}l`); run(); } }));
  function run() {
    ch.check(st);
    out(`<p><b>A character who is…</b></p><ul>${profile(sc).map((p, i) => `<li><b>${esc(p.n)} (${p.level}):</b> ${esc(p.text)}. <span style="color:var(--mute)">${esc(TRAITS[i][3])}</span></li>`).join("")}</ul>
      <p class="sx-fb">The five factors emerged from factor analyses of personality words in many languages (the lexical hypothesis; Goldberg, 1990; McCrae and Costa, 1987). Twin studies put their heritability at roughly 40–50% (Bouchard and McGue, 2003). Traits are fairly stable in adulthood but change gradually, typically towards higher conscientiousness and agreeableness and lower neuroticism with age (Roberts, Walton and Viechtbauer, 2006).</p>`);
  }
  run();
}
