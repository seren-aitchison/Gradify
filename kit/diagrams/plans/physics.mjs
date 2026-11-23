// The physics diagram plan (SciGradify Physics, kit/courses/physics): one row or more per written lesson, kept in one
// file per unit (kit/diagrams/plans/physics/uNN.mjs) so unit builders never edit a shared file. Row formats are in
// kit/diagrams/BUILDERS.md; `node scripts/diagrams/coverage.mjs physics` reports the plan against what is built.
const units = await Promise.all(Array.from({ length: 54 }, (_, i) => import(`./physics/u${String(i + 1).padStart(2, "0")}.mjs`)));
export const NAME = "SciGradify Physics";
export const PLAN = units.flatMap((m) => m.default);
