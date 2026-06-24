const COMMANDS = ["jump", "close your eyes", "double blink", "wink"] as const;

type Command = typeof COMMANDS[number];

export function commands(entryNumber : number) : Command[] {
  if(entryNumber < 1 || entryNumber > 31) return [];

  const binnaryDigits = [...entryNumber.toString(2).padStart(5, '0')];
  const hasReverseCommand = binnaryDigits.shift() === '1';
  const output : Command[] = [];
  
  for(let i = 0 ; i < binnaryDigits.length ; i++) {
    if(binnaryDigits[i] === '0') continue;

    const command = COMMANDS[i];

    if(hasReverseCommand) {
      output.push(command);
    }
    else {
      output.unshift(command);
    }
  }

  return output;
}
