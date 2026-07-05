export function nucleotideCounts(DNA: string): Record<string, number> {
  const count: Record<string, number> = {
    A: 0,
    C: 0,
    G: 0,
    T: 0
  };

  for(const nucleotide of DNA) {
    if(!/[ACGT]/.test(nucleotide)) throw "Invalid nucleotide in strand";
    count[nucleotide]++;
  }

  return count;
}