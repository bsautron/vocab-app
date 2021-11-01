import escapeStringRegexp from "escape-string-regexp";

export function normalize(str = "") {
  return (
    escapeStringRegexp(
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    ) || ""
  );
}
