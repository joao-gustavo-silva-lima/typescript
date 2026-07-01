const OPERATOR_EXPRESSIONS = new Map([
  ["plus"         , '+'],
  ["minus"        , '-'],
  ["divided by"   , '/'],
  ["multiplied by", '*'],
]);

const MATH_EXPRESSIONS_REGEX = /(?:-?\d+|plus|minus|divided by|multiplied by)/g;

export const answer = (question: string): number => {
  const operationalTerms = question.match(MATH_EXPRESSIONS_REGEX);
  const isMathQuestion = /^What is/.test(question);

  if(!operationalTerms) {
    throw new Error(isMathQuestion ? "Syntax error" : "Unknown operation");
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
