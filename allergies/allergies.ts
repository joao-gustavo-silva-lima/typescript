const ALLERGEN_ITEMS_SCORE = new Map<string, number>([
  ["cats", 128],
  ["pollen", 64],
  ["chocolate", 32],
  ["tomatoes", 16],
  ["strawberries", 8],
  ["shellfish", 4],
  ["peanuts", 2],
  ["eggs", 1],
]);

export class Allergies {
  private allergenScore: number;
  private readonly _list = new Set<string>();

  constructor(allergenIndex: number) {
    this.allergenScore =
      allergenIndex > 256
        ? ((Math.abs(allergenIndex) - 1) % 256) + 1
        : allergenIndex % 257;

    for (const [allergenItem, itemScore] of ALLERGEN_ITEMS_SCORE.entries()) {
      if (this.allergenScore < 1) break;
      if (this.allergenScore < itemScore) continue;

      this._list.add(allergenItem);
      this.allergenScore -= itemScore;
    }
  }

  public list(): string[] {
    return [...this._list].reverse();
  }

  public allergicTo(allergenItem: string): boolean {
    return this._list.has(allergenItem);
  }
}
