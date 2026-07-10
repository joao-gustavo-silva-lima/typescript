export const toRoman = (inputNumber: number): string => {
  if (inputNumber > 3999) {
    throw new Error("Choose a number in the following interval: [1, 3999]");
  }

  let output = "";

  const thousands = Math.floor(inputNumber / 1000) % 10;
  const hundreds = Math.floor(inputNumber / 100) % 10;
  const tens = Math.floor(inputNumber / 10) % 10;
  const unit = inputNumber % 10;

  output += "M".repeat(thousands);
  output += placeValueToRoman(hundreds, "C", "D", "CM");
  output += placeValueToRoman(tens, "X", "L", "XC");
  output += placeValueToRoman(unit, "I", "V", "IX");

  return output;
};

function placeValueToRoman(
  digit: number,
  oneSymbol: string,
  fiveSymbol: string,
  nineSymbol: string
) {
  if (digit <= 3) {
    return oneSymbol.repeat(digit);
  }
  if (digit <= 5) {
    return oneSymbol.repeat(5 - digit) + fiveSymbol;
  }
  if (digit <= 8) {
    return fiveSymbol + oneSymbol.repeat(digit - 5);
  }

  return nineSymbol;
}
