// Tests only: import this (statically, first) to have the evidence module talk to the recorded GitHub. It must load
// before anything imports scripts/content/evidence.mjs.
import { register } from "node:module";
register("./recorded-github-hooks.mjs", import.meta.url);
export { TRUST, useRecorded } from "./recorded-github.mjs";
