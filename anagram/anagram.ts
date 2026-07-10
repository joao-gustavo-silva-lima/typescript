function mapEntriesAreEqual<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
  if (map1.size !== map2.size) {
    return false;
  }
  for (const [key, value] of map1) {
    if (!map2.has(key) || map2.get(key) !== value) {
      return false;
    }
  }
  return true;
}

export class Anagram {
  private keyword: string;
  private keywordCharactersCount: Map<string, number>;

  constructor(input: string) {
    this.keyword = input.toUpperCase();
    this.keywordCharactersCount = Anagram.countWordCharacters(input);
  }

  public matches(...potentials: string[]): string[] {
    return potentials.filter((anagram) => {
      if (anagram.toUpperCase() === this.keyword) {
        return false;
      }

      const potentialCharactersCount = Anagram.countWordCharacters(anagram);

      return mapEntriesAreEqual(
        this.keywordCharactersCount,
        potentialCharactersCount
      );
    });
  }

  public static countWordCharacters(word: string): Map<string, number> {
    const output = new Map<string, number>();

    for (const character of word.toUpperCase()) {
      const characterCount = output.get(character) ?? 0;
      output.set(character, characterCount + 1);
    }

    return output;
  }
}
