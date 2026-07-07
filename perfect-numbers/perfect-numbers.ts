type Classification = "perfect" | "abundant" | "deficient";

export function classify(inputNumber: number): Classification {
  if (inputNumber <= 0 || !Number.isInteger(inputNumber)) {
    throw "Classification is only possible for natural numbers.";
  }
  if (inputNumber === 1) return "deficient";

  let aliquotSum = 1;
  const GreatestDivisor = Math.sqrt(inputNumber);

  for (let n = 2; n < GreatestDivisor; n++) {
    if (inputNumber % n === 0) {
      aliquotSum += n;
      aliquotSum += inputNumber / n;
    }
  }

  if (inputNumber % GreatestDivisor === 0 && GreatestDivisor > 1) {
    aliquotSum += GreatestDivisor;
  }

  if (aliquotSum > inputNumber) return "abundant";
  if (aliquotSum < inputNumber) return "deficient";
  return "perfect";
}
