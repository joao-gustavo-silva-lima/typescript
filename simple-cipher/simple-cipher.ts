const ALPHABET          = "abcdefghijklmnopqrstuvwxyz";
const [ALPHABET_TO_INDEX, INDEX_TO_ALPHABET] = (function() {
  const alphabetToIndex =    new Map<string, number>();
  const indexToAlphabet =    new Map<number, string>();

  for(let i = 0 ; i < ALPHABET.length ; i++) {
    alphabetToIndex.set(ALPHABET[i], i);
    indexToAlphabet.set(i, ALPHABET[i]);
  }

  return [alphabetToIndex, indexToAlphabet];
})();

export class SimpleCipher {
  private _key: string;

  public get key() { return this._key; }

  constructor(key?: string) {
    this._key = key || SimpleCipher.getRandomKey();
  }

  encode(plainText: string): string {
    let output = "";

    for(let i = 0 ; i < plainText.length ; i++) {
      const plainChar = plainText[i];
      const keyChar = this._key[i % this._key.length];

      const plainIndex = ALPHABET_TO_INDEX.get(plainChar)!;
      const keyIndex = ALPHABET_TO_INDEX.get(keyChar)!;
      const cipherIndex = (plainIndex + keyIndex) % 26;

      output += INDEX_TO_ALPHABET.get(cipherIndex)!;
    }

    return output
  }

  decode(cipherText: string): string {
    let output = "";

    for(let i = 0 ; i < cipherText.length ; i++) {
      const cipherChar = cipherText[i];
      const keyChar = this._key[i % this._key.length];

      const cipherIndex = ALPHABET_TO_INDEX.get(cipherChar)!;
      const keyIndex = ALPHABET_TO_INDEX.get(keyChar)!;
      const plainIndex = (cipherIndex - keyIndex + 26) % 26;

      output += INDEX_TO_ALPHABET.get(plainIndex)!;
    }

    return output
  }

  private static getRandomKey(): string {
    let key = "";

    for(let i = 0 ; i < 100 ; i++) {
      key += ALPHABET[Math.floor(Math.random() * 26)];
    }

    return key;
  }
}
