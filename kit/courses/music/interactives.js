// MusicGradify interactives. Each entry: { id, title, sub, kind, note, schools, lessons: L("Lesson title", …), load }.
// kind: Experiment, Simulation, Illustrative model, Exercise, Explorer or Tool. Existing Gradify labs can be reused
// (load: () => import("../../labs/<area>/<file>.js")); lessons are named by title and resolved to permanent ids.
import { IDS } from "./ids.js";
const byTitle = new Map(Object.entries(IDS).map(([id, t]) => [t.toLowerCase(), id]));
export const L = (...titles) => titles.map((t) => { const id = byTitle.get(t.toLowerCase()); if (!id) throw new Error(`interactives: no lesson "${t}"`); return id; });
const PHYS = (f) => () => import(`../../labs/physics/${f}`);
// SciGradify Physics' waves lab, reused where it teaches the acoustics of School 8: standing waves on a string give the
// harmonic series that strings sound, and two close frequencies give the beats musicians tune by.
export const INTERACTIVES = [
  { id: "harmonics", file: "../physics/waves.js", mode: "standing", kind: "Simulation", title: "Harmonics on a string", sub: "Standing waves on a string fixed at both ends: step through the harmonics, count nodes and antinodes, and change tension and mass to retune every harmonic at once.", note: "SciGradify Physics' simulation of an ideal, lossless string (f = nv/2L); a real string's harmonics are slightly sharp because of its stiffness.", schools: [8], lessons: L("Standing waves in strings and pipes", "The harmonic series and timbre", "The string family"), load: PHYS("waves.js") },
  { id: "beats", file: "../physics/waves.js", mode: "beats", kind: "Simulation", title: "Beats and tuning", sub: "Two pure tones a few hertz apart: see the beats, and tune the second note until the beating matches a target rate or stops.", note: "SciGradify Physics' simulation of two sine waves of equal amplitude; real instruments also beat between their upper harmonics.", schools: [8], lessons: L("Beats, tuning and temperament", "Sound waves: frequency, amplitude and pitch"), load: PHYS("waves.js") },
];
