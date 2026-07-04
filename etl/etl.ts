type NumberStringPair = { [key: number]: string[] };
type LetterNumberPair = { [key: string]: number };

export function transform(old: NumberStringPair): LetterNumberPair {
  const output: LetterNumberPair = {};

  for(const [point, letters] of Object.entries(old)) {
    letters.forEach((letter) => output[letter.toLowerCase()] = Number(point));
  }

  return output;
}
