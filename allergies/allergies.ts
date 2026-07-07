type AllergenItem = (typeof ALLERGEN_ITEMS)[number];
const ALLERGEN_ITEMS = [
  "cats",
  "pollen",
  "chocolate",
  "tomatoes",
  "strawberries",
  "shellfish",
  "peanuts",
  "eggs",
] as const;
const ALLERGEN_ITEMS_SCORES = new Map<AllergenItem, number>([
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
  private readonly allergies: AllergenItem[] = [];

  constructor(allergenIndex: number) {
    let allergenScore = allergenIndex % 256;

    for (const [allergenItem, itemScore] of ALLERGEN_ITEMS_SCORES.entries()) {
      if (allergenScore < 1) break;
      if (allergenScore < itemScore) continue;

      this.allergies.push(allergenItem);
      allergenScore -= itemScore;
    }

    this.allergies.reverse();
  }

  public list(): string[] {
    return this.allergies;
  }

  public allergicTo(allergenItem: AllergenItem): boolean {
    return this.allergies.includes(allergenItem);
  }
}
