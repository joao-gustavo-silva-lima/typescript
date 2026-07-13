export function clean(entryNumber: string): string {
  let clearNumber = entryNumber.replace(/[-.\s\+\(\)]/g, "");

  if (/[\p{L}]/giu.test(clearNumber)) {
    throw new Error("Letters not permitted");
  }
  if (/[^\d]/g.test(clearNumber)) {
    throw new Error("Punctuations not permitted");
  }
  if (clearNumber.length < 10) {
    throw new Error("Must not be fewer than 10 digits");
  }
  if (clearNumber.length > 11) {
    throw new Error("Must not be greater than 11 digits");
  }
  if (clearNumber.length === 11) {
    if (clearNumber[0] !== "1") {
      throw new Error("11 digits must start with 1");
    }
    clearNumber = clearNumber.slice(1);
  }

  const areaCode = clearNumber.slice(0, 3);

  if (areaCode[0] === "0") {
    throw new Error("Area code cannot start with zero");
  }
  if (areaCode[0] === "1") {
    throw new Error("Area code cannot start with one");
  }

  const exchangeCode = clearNumber.slice(3, 6);

  if (exchangeCode[0] === "0") {
    throw new Error("Exchange code cannot start with zero");
  }
  if (exchangeCode[0] === "1") {
    throw new Error("Exchange code cannot start with one");
  }

  return clearNumber;
}
