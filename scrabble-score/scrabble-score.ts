const LETTER_VALUES = new Map([
  [new Set(["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"]), 1],
  [new Set(["D", "G"]), 2],
  [new Set(["B", "C", "M", "P"]), 3],
  [new Set(["F", "H", "V", "W", "Y"]), 4],
  [new Set(["K"]), 5],
  [new Set(["J", "X"]), 8],
  [new Set(["Q", "Z"]), 10],
]);

export function score(letterTiles?: string): number {
  if (!letterTiles) return 0;

  let scoreValue = 0;

  for (const letter of letterTiles.toUpperCase()) {
    scoreValue += getLetterValue(letter);
  }

  function getLetterValue(letter: string): number {
    for (const [letterSet, letterValue] of LETTER_VALUES.entries()) {
      if (letterSet.has(letter)) {
        return letterValue;
      }
    }
    return 0;
  }

  return scoreValue;
}
