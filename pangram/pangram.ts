const ALPHABET = [..."abcdefghijklmnopqrstuvwxyz"];

export const isPangram = (sentence : string) : boolean =>
  ALPHABET.every(letter => sentence.toLowerCase().includes(letter));
