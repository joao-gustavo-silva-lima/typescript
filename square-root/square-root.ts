const applyHeronFormula = (nearNumber: number, radicand: number): number =>
  (nearNumber + radicand/nearNumber) / 2

export function squareRoot(radicand: number): number {
  let nearNumber = 0;
  while(++nearNumber ** 2 < radicand) {}

  let result: number = nearNumber;
  
  while(true) {
    const heronResult = applyHeronFormula(nearNumber, radicand);
    if(nearNumber === heronResult) break;
    result = heronResult;
  }

  return result;
}
