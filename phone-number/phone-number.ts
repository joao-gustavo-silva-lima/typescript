export function clean(entryNumber: string): string {
  let cleanNumber = entryNumber.replace(/[-.\s\+\(\)]/g, "");

  if (/[\p{L}]/giu.test(cleanNumber)) {
    throw new Error("Letters not permitted");
  }
  if (/[^\d]/g.test(cleanNumber)) {
    throw new Error("Punctuations not permitted");
  }
  if (cleanNumber.length < 10) {
    throw new Error("Must not be fewer than 10 digits");
  }
  if (cleanNumber.length > 11) {
    throw new Error("Must not be greater than 11 digits");
  }
  if (cleanNumber.length === 11) {
    if (cleanNumber[0] !== "1") {
      throw new Error("11 digits must start with 1");
    }

    cleanNumber = cleanNumber.slice(1);
  }

  const areaCodeN = cleanNumber[0];

  if (/[0-1]/.test(areaCodeN)) {
    throw new Error(
      `Area code cannot start with ${areaCodeN === "0" ? "zero" : "one"}`
    );
  }

  const exchangeCodeN = cleanNumber[3];

  if (/[0-1]/.test(exchangeCodeN)) {
    throw new Error(
      `Exchange code cannot start with ${exchangeCodeN === "0" ? "zero" : "one"}`
    );
  }

  return cleanNumber;
}
