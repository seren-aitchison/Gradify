// Tests only: a module resolve hook that loads the recorded GitHub in place of the live one.
const LIVE = new URL("../../scripts/content/github-review.mjs", import.meta.url).href;
const RECORDED = new URL("./recorded-github.mjs", import.meta.url).href;
export async function resolve(specifier, context, next) {
  const r = await next(specifier, context);
  return r.url === LIVE ? { ...r, url: RECORDED, shortCircuit: true } : r;
}
