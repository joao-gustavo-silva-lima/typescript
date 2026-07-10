export function degreesOfSeparation(
  familyTree: { [key: string]: string[] },
  personA: string,
  personB: string
): number {
  const neighborhood = new Map<string, Set<string>>();

  for (const [person, children] of Object.entries(familyTree)) {
    const personNeighbors = neighborhood.get(person) ?? new Set();

    neighborhood.set(person, personNeighbors);

    for (const child of children) {
      personNeighbors.add(child);

      const childNeighbors = neighborhood.get(child) ?? new Set();

      neighborhood.set(child, childNeighbors);
      childNeighbors.add(person);

      for (const sibling of children) {
        if (sibling !== child) {
          childNeighbors.add(sibling);
        }
      }
    }
  }

  if (!neighborhood.has(personA) || !neighborhood.has(personB)) {
    return -1;
  }

  const parsingQueue: [string, number][] = [[personA, 0]];
  const alreadyParsed = new Set([personA]);

  while (parsingQueue.length > 0) {
    const [person, degree] = parsingQueue.shift()!;

    if (person === personB) {
      return degree;
    }

    for (const neighbor of neighborhood.get(person)!) {
      if (!alreadyParsed.has(neighbor)) {
        alreadyParsed.add(neighbor);
        parsingQueue.push([neighbor, degree + 1]);
      }
    }
  }

  return -1;
}
