export function isIsogram(word: string): unknown {
  const characters = new Set<string>();

  for (const character of word.toLowerCase()) {
    if (/[\s-]/.test(character)) {
      continue;
    }
    if (characters.has(character)) {
      return false;
    }
    characters.add(character);
  }

  return true;
}
