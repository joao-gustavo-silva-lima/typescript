export function steps(entryNumber: number): number {
  if(!Number.isInteger(entryNumber) || entryNumber <= 0) {
    throw "Only positive integers are allowed";
  }

  let reducedNumber = entryNumber;
  let stepCount = 0;

  while(reducedNumber !== 1) {
    reducedNumber = reducedNumber % 2 === 0 
      ? reducedNumber / 2
      : reducedNumber * 3 + 1;
    stepCount++;
  }

  return stepCount;
}
