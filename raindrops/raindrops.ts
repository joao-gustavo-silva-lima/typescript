export function convert(entryNumber: number): string {
  return [
    entryNumber % 3 === 0 ? "Pling" : '',
    entryNumber % 5 === 0 ? "Plang" : '',
    entryNumber % 7 === 0 ? "Plong" : ''
  ].join('') || entryNumber.toString();
}
