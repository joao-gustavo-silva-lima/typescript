export function valid(digitString: string): boolean {
  const cleanString = digitString.replace(/\s+/g, "");

  if (!/^[\d]{2,}$/.test(cleanString)) {
    return false;
  }

  let sumForValidation = 0;
  let index = 1;

  while (cleanString.length - index >= 0) {
    let digit = Number(cleanString[cleanString.length - index]);

    if (index % 2 === 0) {
      digit = digit * 2 - (digit * 2 > 9 ? 9 : 0);
    }

    sumForValidation += digit;
    index++;
  }

  if (sumForValidation % 10 !== 0) {
    return false;
  }

  return true;
}
