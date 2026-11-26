// How Gradify feels: one vocabulary of feedback moments, each with a haptic (kit/core/haptics.js: Android's
// vibration, iPhone's system tick) and an optional short sound. Richer feedback is kept for the moments that matter.
//
//   feel("correct")   feel("wrong")   feel("complete")   feel("levelup")   feel("achievement")   feel("select")
//
// Learners choose in the "Aa" panel (kit/core/access-panel.js): Sounds (off unless turned on) and Haptics (on unless
// turned off). Both stay silent for reduced motion. The native apps use the same moments with UIKit's feedback
// generators (selection, notification success / warning / error, impact) so a moment means the same everywhere.
import { haptic } from "../core/haptics.js";

/** each moment: the haptic pattern, and the sound (notes in Hz; a second element of true marks a soft, low sound) */
export const MOMENTS = {
  select: { haptic: "select", notes: null },
  correct: { haptic: "success", notes: [659, 880] },
  wrong: { haptic: null, notes: [330, 262], soft: true },   // never a buzz for a wrong answer: the feedback teaches, it doesn't punish
  complete: { haptic: "complete", notes: [523, 659, 784] },
  levelup: { haptic: "complete", notes: [523, 659, 784, 1047] },
  achievement: { haptic: "success", notes: [784, 1175] },
  xp: { haptic: "tap", notes: null },
};

const access = () => { try { return globalThis.gradifyAccess?.get?.() || {}; } catch { return {}; } };
export const soundOn = () => access().sound === "on";
export const hapticsWanted = () => access().haptics !== "off";
const reduced = () => globalThis.document?.documentElement.dataset.motion === "reduce" || Boolean(globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

let ctx = null;
function chime(notes, soft) {
  try {
    ctx ||= new (globalThis.AudioContext || globalThis.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    const t0 = ctx.currentTime + 0.01;
    notes.forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), t = t0 + i * 0.085;
      o.type = soft ? "triangle" : "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(soft ? 0.035 : 0.06, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.25);
    });
  } catch { /* no audio here */ }
}

/** play one feedback moment; quiet by default where the learner hasn't asked for it */
export function feel(kind) {
  const m = MOMENTS[kind]; if (!m) return;
  if (m.haptic && hapticsWanted()) haptic(m.haptic);
  if (m.notes && soundOn() && !reduced()) chime(m.notes, m.soft);
}
