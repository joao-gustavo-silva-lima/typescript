export function compute(sourceDNA: string, replicatedDNA: string): number {
  if(replicatedDNA.length !== sourceDNA.length) {
    throw "DNA strands must be of equal length.";
  }
  
  let hammingDistance = 0;

  for(let i = 0 ; i < sourceDNA.length ; i++) {
    if(replicatedDNA[i] !== sourceDNA[i]) hammingDistance++;
  }

  return hammingDistance;
}