export const square = (squareNumber: number): BigInt => {
  if (
    !Number.isInteger(squareNumber) ||
    squareNumber < 1 ||
    squareNumber > 64
  ) {
    throw Error("Input a valid square number.");
  }

  return BigInt(2 ** --squareNumber);
};

export const total = (): BigInt => {
  return 2n ** 64n - 1n;
};
