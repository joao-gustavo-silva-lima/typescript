const OPERATOR_EXPRESSIONS = new Map([
  ["plus"      , '+'],
  ["minus"     , '-'],
  ["divided"   , '/'],
  ["multiplied", '*'],
]);

const VALID_MATH_QUESTION_REGEX = 
  /^What is(?:[+-]?\d+|plus|minus|multiplied|divided|by|\s+)*[?]$/;

export const answer = (question: string): number => {
  if(!VALID_MATH_QUESTION_REGEX.test(question)) {
    throw new Error('Unknown operation');
  }

  const cleanQuestion = question
    .replace(/^What is|\?|\bby\b/g, '')
    .trim();

  if(cleanQuestion === "") {
    throw new Error("Syntax error");
  }

  const operationalTerms = cleanQuestion.split(/\s+/);

  let operationString = "";

  for(const term of operationalTerms) {
    operationString = OPERATOR_EXPRESSIONS.has(term)
      ? operationString + OPERATOR_EXPRESSIONS.get(term) 
      : `(${operationString}(${term}))`;
  }

  try   { return eval(operationString) as number; }
  catch {    throw new Error("Syntax error");     }
}
