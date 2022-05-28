export default function isObject(variable: unknown): variable is object {
  return !!variable && typeof variable === "object";
}
