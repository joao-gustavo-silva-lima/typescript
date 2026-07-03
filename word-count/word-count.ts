export function count(sentence: string) {
  const counterMap = new Map<string, number>();
  const words = sentence.toLowerCase().match(/[a-z\d]+(?:'[a-z\d]+)*/gi);

  if(!words) return counterMap;

  for(const word of words) {
    counterMap.set(word, (counterMap.get(word) || 0) + 1);
  }

  return counterMap;
}
