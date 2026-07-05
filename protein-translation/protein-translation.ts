function getRelativeAminoacid(codon: string): string {
  if(/^AUG$/       .test(codon)) return "Methionine"   ;
  if(/^UGG$/       .test(codon)) return "Tryptophan"   ;
  if(/^UU[AG]$/    .test(codon)) return "Leucine"      ;
  if(/^UU[UC]$/    .test(codon)) return "Phenylalanine";
  if(/^UA[UC]$/    .test(codon)) return "Tyrosine"     ;
  if(/^UG[UC]$/    .test(codon)) return "Cysteine"     ;
  if(/^UC[UCAG]$/  .test(codon)) return "Serine"       ;
  if(/^UA[AG]|UGA$/.test(codon)) return "STOP"         ;

  throw "Invalid codon";
}

export function translate(RNA: string): string[] {
  const codons = RNA.match(/.{1,3}/g);

  if(!codons) return [];
  
  const translation: string[] = [];
  
  for(const codon of codons) {
    const relativeAminoacid = getRelativeAminoacid(codon);
    if(relativeAminoacid === "STOP") break;
    translation.push(relativeAminoacid);
  }

  return translation;
}
