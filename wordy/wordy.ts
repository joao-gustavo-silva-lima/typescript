const OPERATOR_EXPRESSIONS = new Map([
  ["plus"         , '+'],
  ["minus"        , '-'],
  ["divided"   , '/'],
  ["multiplied", '*'],
]);

const VALID_MATH_QUESTION_REGEX = /^What is(?:[+-]?\d+|plus|minus|multiplied by|divided by|\s+)*[?]$/;

export const answer = (question: string): number => {
  if(!VALID_MATH_QUESTION_REGEX.test(question)) {
    throw new Error('Unknown operation');
  }

  const cleanQuestion    =      question
    .replace(/What is|\?|by/g, '')
    .trim();
  const operationalTerms = cleanQuestion
    .split(/\s+/);

  if(!operationalTerms.length) {
    throw new Error("Syntax error");
  }

  let operationString = "";

  for(const term of operationalTerms) {
    operationString = OPERATOR_EXPRESSIONS.has(term)
      ? operationString + OPERATOR_EXPRESSIONS.get(term)! 
      : `(${operationString}(${term}))`;
  }

  try   { return eval(operationString) as number; }
  catch {    throw new Error("Syntax error");     }
}
