// Every subject adapter, by id (the `adapter` field defineCourse writes into a course config). Scripts such as
// scripts/qa-courses.mjs look a course's adapter up here; courses import their own adapter directly.
import maths from "./maths.js";
import science from "./science.js";
import programming from "./programming.js";
import law from "./law.js";
import nursing from "./nursing.js";
import pharmacy from "./pharmacy.js";
import { psychology, sociology } from "./social.js";
import history from "./history.js";
export const ADAPTERS = { maths, science, programming, law, nursing, pharmacy, psychology, sociology, history };
