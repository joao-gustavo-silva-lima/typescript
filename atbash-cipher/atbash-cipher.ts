const [ENCODER_ALPHABET, DECODER_ALPHABET] = (function() {
  const alphabet        = "abcdefghijklmnopqrstuvwxyz";
  const encoderAlphabet =    new Map<string, string>();
  const decoderAlphabet =    new Map<string, string>();

  for(let i = 0, j = alphabet.length - 1 ; i < alphabet.length ; i++, j--) {
    encoderAlphabet.set(alphabet[i], alphabet[j]);
    decoderAlphabet.set(alphabet[j], alphabet[i]);
  }

  return [encoderAlphabet, decoderAlphabet];
})();

function executeCodec(codecMap: Map<string, string>, source: string): string {
  var output = "";

  for(let i = 0 ; i < source.length ; i++) {
    output += codecMap.get(source[i].toLowerCase()) 
    ||        (/\d/.test(source[i]) ? source[i] : '');
  }

  return output;
}

export function encode(plainText: string): string {
  return executeCodec(ENCODER_ALPHABET, plainText)
    .match(/.{1,5}/g)
    ?.join(' ') || "";
}

export function decode(cipherText: string): string {
  return executeCodec(DECODER_ALPHABET, cipherText);
}