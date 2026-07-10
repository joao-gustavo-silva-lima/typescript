export function parse(phrase: string): string {
  return phrase
    .replace(/\b\p{L}/gu, (match) => match.toUpperCase())
    .replace(/[^\p{Lu}]/gu, " ")
    .split(/\s+/g)
    .map((word) => word[0])
    .join("");
}
