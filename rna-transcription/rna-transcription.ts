const COMMOM_NUCLEOTIDES : string[] = [ "A", "C", "G" ] as const;

const DNA_NUCLEOTIDES : string[] = COMMOM_NUCLEOTIDES.concat("T");
type DnaNucleotide = typeof DNA_NUCLEOTIDES[number];

type RnaNucleotide = typeof COMMOM_NUCLEOTIDES[number] | "U" ;

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
  const dnaNucleotides : string[] = dna.split("");

  let rna : RnaNucleotide[] = []; 

  for( let i : number = 0 ; i < dnaNucleotides.length ; i++ ) {
    if(!DNA_NUCLEOTIDES.includes(dnaNucleotides[i])) throw "Invalid input DNA.";

    rna.push(getComplementDnaNucleotide(dnaNucleotides[i]));
  }

  return rna.join('');
}
