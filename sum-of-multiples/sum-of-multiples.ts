export function sum(magicalItemValues: number[], playerLevel: number): number {
  let energyPoint = 0;

  const alreadyTakenMultiples = new Set<number>();

  for (const value of magicalItemValues) {
    if (value <= 0) continue;

    for (let multiple = value; multiple < playerLevel; multiple += value) {
      if (alreadyTakenMultiples.has(multiple)) {
        continue;
      }
      alreadyTakenMultiples.add(multiple);
      energyPoint += multiple;
    }
  }

  return energyPoint;
}
