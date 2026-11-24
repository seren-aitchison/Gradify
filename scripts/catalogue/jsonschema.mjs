// A small JSON Schema checker for the catalogue schema (data/catalogue/schema/catalogue.schema.json). It supports the
// keywords that schema uses, and nothing more: type, const, enum, pattern, minLength, maxLength, minimum, maximum,
// required, properties, additionalProperties, items, minItems, anyOf and local $ref ("#/$defs/…"). An unsupported
// keyword is an error, so the schema can't quietly ask for a check this file doesn't make.
const SUPPORTED = new Set(["$schema", "$id", "title", "description", "$defs", "type", "const", "enum", "pattern", "minLength", "maxLength", "minimum", "maximum", "required", "properties", "additionalProperties", "items", "minItems", "anyOf", "$ref"]);

const typeOf = (v) => (v === null ? "null" : Array.isArray(v) ? "array" : Number.isInteger(v) ? "integer" : typeof v);
const isType = (v, t) => t === "number" ? typeof v === "number" && Number.isFinite(v) : t === "integer" ? Number.isInteger(v) : typeOf(v) === t;

/** Errors for `value` against `schema` (an array of { path, message }); empty when valid. */
export function check(value, schema, root = schema, path = "$") {
  const errors = [];
  const err = (message) => errors.push({ path, message });
  for (const k of Object.keys(schema)) if (!SUPPORTED.has(k)) throw new Error(`Unsupported schema keyword "${k}" at ${path}`);
  if (schema.$ref) {
    const m = schema.$ref.match(/^#\/\$defs\/(.+)$/);
    if (!m || !root.$defs?.[m[1]]) throw new Error(`Unresolvable $ref ${schema.$ref}`);
    return check(value, root.$defs[m[1]], root, path);
  }
  if (schema.anyOf) {
    if (!schema.anyOf.some((s) => !check(value, s, root, path).length)) err("matches none of the allowed forms");
    return errors;
  }
  if (schema.type) {
    const types = [].concat(schema.type);
    if (!types.some((t) => isType(value, t))) { err(`expected ${types.join(" or ")}, got ${typeOf(value)}`); return errors; }
  }
  if ("const" in schema && value !== schema.const) err(`must be ${JSON.stringify(schema.const)}`);
  if (schema.enum && !schema.enum.includes(value)) err(`must be one of ${schema.enum.join(", ")}`);
  if (typeof value === "string") {
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) err(`doesn't match ${schema.pattern}`);
    if (schema.minLength != null && value.length < schema.minLength) err(`shorter than ${schema.minLength}`);
    if (schema.maxLength != null && value.length > schema.maxLength) err(`longer than ${schema.maxLength}`);
  }
  if (typeof value === "number") {
    if (schema.minimum != null && value < schema.minimum) err(`less than ${schema.minimum}`);
    if (schema.maximum != null && value > schema.maximum) err(`more than ${schema.maximum}`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems != null && value.length < schema.minItems) err(`fewer than ${schema.minItems} items`);
    if (schema.items) value.forEach((v, i) => errors.push(...check(v, schema.items, root, `${path}[${i}]`)));
  }
  if (typeOf(value) === "object") {
    for (const r of schema.required || []) if (!(r in value)) err(`missing "${r}"`);
    for (const [k, v] of Object.entries(value)) {
      if (schema.properties?.[k]) errors.push(...check(v, schema.properties[k], root, `${path}.${k}`));
      else if (schema.additionalProperties === false) errors.push({ path: `${path}.${k}`, message: "not allowed" });
      else if (typeof schema.additionalProperties === "object") errors.push(...check(v, schema.additionalProperties, root, `${path}.${k}`));
    }
  }
  return errors;
}
