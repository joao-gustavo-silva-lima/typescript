const COMMANDS = ["wink", "double blink", "close your eyes", "jump"] as const;

type Command = typeof COMMANDS[number];

export function commands(entryNumber : number) : Command[] {
  if(entryNumber < 1 || entryNumber > 31) return [];

  const binary : string = entryNumber.toString(2).padStart(5, '0');
  const output : Command[] = [];
  
  if(binary[4] === '1') output.push("wink"           );
  if(binary[3] === '1') output.push("double blink"   );
  if(binary[2] === '1') output.push("close your eyes");
  if(binary[1] === '1') output.push("jump"           );
  if(binary[0] === '1') output.reverse();

  return output;
}
