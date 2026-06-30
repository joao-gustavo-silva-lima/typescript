const [ENCODER_ALPHABET, DECODER_ALPHABET] = (function() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const encoderAlphabet = new Map<string, string>();
  const decoderAlphabet = new Map<string, string>();

  for(let i = 0, j = alphabet.length - 1 ; i < alphabet.length ; i++, j--) {
    encoderAlphabet.set(alphabet[i], alphabet[j]);
    decoderAlphabet.set(alphabet[j], alphabet[i]);
  }

  return [encoderAlphabet, decoderAlphabet];
})();

const codifier = (codifierMap : Map<string, string>) => 
  function(source: string): string {
    var output = "";

    for(let i = 0 ; i < source.length ; i++) {
      output += codifierMap.get(source[i].toLowerCase()) || 
        (/\d/.test(source[i]) ? source[i] : '');
    }

    return output;
  }

export function encode(plainText: string): string {
  return codifier(ENCODER_ALPHABET)(plainText)
    .match(/.{1,5}/g)
    ?.join(' ') || "";
}

export function decode(cipherText: string): string {
  return codifier(DECODER_ALPHABET)(cipherText);
}