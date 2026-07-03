export function reverse(entryString: string) {
  let reversedString = "";
  for(let i = entryString.length - 1 ; i >= 0 ; i--) {
    reversedString += entryString[i];
  }
  return reversedString;
}
