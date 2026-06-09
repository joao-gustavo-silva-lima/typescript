const COMMON_NUCLEOTIDES = [ "A", "C", "G" ] as const;

const DNA_NUCLEOTIDES = [...COMMON_NUCLEOTIDES, "T"] as const;
type DnaNucleotide = typeof DNA_NUCLEOTIDES[number];

const RNA_NUCLEOTIDES = [...COMMON_NUCLEOTIDES, "U"] as const;
type RnaNucleotide = typeof RNA_NUCLEOTIDES[number];

function tryGettingDnaComplementNucleotide(nucleotide : string) : RnaNucleotide {
  if(!(DNA_NUCLEOTIDES as readonly string[]).includes(nucleotide)) {
    throw new Error("Invalid input DNA.");
  }

  return getComplementDnaNucleotide(nucleotide as DnaNucleotide);
}

function getComplementDnaNucleotide(nucleotide : DnaNucleotide) : RnaNucleotide {
  switch(nucleotide) {
    case "A": return "U";
    case "C": return "G";
    case "G": return "C";
    case "T": return "A";
    default: return nucleotide as never;
  }
}

export function toRna(dna : string) : string {
  return dna
    .split("")
    .map(nucleotide => tryGettingDnaComplementNucleotide(nucleotide))
    .join("");
}
