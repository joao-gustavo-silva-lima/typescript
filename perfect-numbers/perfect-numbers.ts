type Classification = "perfect" | "abundant" | "deficient";

export function classify(inputNumber: number): Classification {
  if (inputNumber <= 0 || !Number.isInteger(inputNumber)) {
    throw "Classification is only possible for natural numbers.";
  }

  let aliquotSum = 0;

  for (let n = 1; n < inputNumber; n++) {
    if (inputNumber % n !== 0) continue;

    aliquotSum += n;
  }

  if (aliquotSum > inputNumber) return "abundant";
  if (aliquotSum < inputNumber) return "deficient";
  return "perfect";
}
