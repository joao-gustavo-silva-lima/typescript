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
  output += convertNumeralComponentToRoman(hundreds, "C", "D", "CM");
  output += convertNumeralComponentToRoman(tens, "X", "L", "XC");
  output += convertNumeralComponentToRoman(unit, "I", "V", "IX");

  return output;
};

function convertNumeralComponentToRoman(
  component: number,
  romamIncrementComponent: string,
  romanMiddleContainer: string,
  romanEdgeCaseComponent: string
) {
  if (component <= 3) {
    return romamIncrementComponent.repeat(component);
  }
  if (component <= 5) {
    return romamIncrementComponent.repeat(5 - component) + romanMiddleContainer;
  }
  if (component <= 8) {
    return romanMiddleContainer + romamIncrementComponent.repeat(component - 5);
  }

  return romanEdgeCaseComponent;
}
