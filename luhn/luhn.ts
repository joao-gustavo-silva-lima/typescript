export function valid(inputString: string): boolean {
  const digitString = inputString.replace(/\s+/g, "");

  if (!/^[\d]{2,}$/.test(digitString)) {
    return false;
  }

  let sumForValidation = 0;
  let shouldDoubleDigit = false;

  for (let i = digitString.length - 1; i >= 0; i--) {
    let digit = Number(digitString[i]);

    if (shouldDoubleDigit) {
      digit *= 2;
      digit -= digit > 9 ? 9 : 0;
    }

    sumForValidation += digit;
    shouldDoubleDigit = !shouldDoubleDigit;
  }

  return sumForValidation % 10 === 0;
}
