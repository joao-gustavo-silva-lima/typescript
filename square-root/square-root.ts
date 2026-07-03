export function squareRoot(radicand: number): number {
  if(radicand === 0) return 0;

  let approximateRoot = 0;

  while(approximateRoot ** 2 < radicand) { 
    approximateRoot++; 
  }
  
  while(true) {
    const heronResult = (approximateRoot + radicand / approximateRoot) / 2;

    if(Math.abs(approximateRoot - heronResult) < 1e-15) {
      return approximateRoot;
    }

    approximateRoot = heronResult;
  }
}
