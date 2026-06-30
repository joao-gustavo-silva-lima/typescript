const [ALPHABET_TO_INDEX, INDEX_TO_ALPHABET] = (() => {
  const alphabet        = "abcdefghijklmnopqrstuvwxyz";
  const alphabetToIndex =    new Map<string, number>();
  const indexToAlphabet =    new Map<number, string>();

  for(let i = 0 ; i < alphabet.length ; i++) {
    alphabetToIndex.set(alphabet[i], i);
    indexToAlphabet.set(i, alphabet[i]);
  }

  return [alphabetToIndex, indexToAlphabet];
})();

export class SimpleCipher {
  private _key: string;

  public get key() { return this._key; }

  constructor(key?: string) {
    this._key = key || SimpleCipher.getRandomKey();
  }

  public encode(plainText: string): string {
    return this.executeCodec(plainText,   1);
  }

  public decode(cipherText: string): string {
    return this.executeCodec(cipherText, -1);
  }

  private executeCodec(source: string, codecFlow: number): string {
    let output = "";

    for(let i = 0 ; i < source.length ; i++) {
      const keyCharacter =                this._key[i % this._key.length];
      const keyIndex     =           ALPHABET_TO_INDEX.get(keyCharacter)!;  
      const sourceIndex  =           ALPHABET_TO_INDEX.get(  source[i] )!;
      const codecIndex   = (sourceIndex + codecFlow * keyIndex + 26) % 26;

      output += INDEX_TO_ALPHABET.get(codecIndex)!;
    }

    return output
  }

  private static getRandomKey(): string {
    let key = "";

    for(let i = 0 ; i < 100 ; i++) {
      const randomIndex  =     Math.floor(Math.random() * 26);
      key               += INDEX_TO_ALPHABET.get(randomIndex);
    }

    return key;
  }
}
