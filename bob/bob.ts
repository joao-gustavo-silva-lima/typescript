const isYelling = (str : string) : boolean => 
  str === str.toUpperCase() && /[A-Z]/.test(str);

const isSilent  = (str : string) : boolean => 
  str.trim().length === 0;

const isQuestioning  = (str : string) : boolean => 
  str.trim().endsWith('?');

export function hey(message: string): string {
  const questioning = isQuestioning(message);
  const yelling     = isYelling(message);
  const silent      = isSilent(message);

  if(questioning && yelling) return "Calm down, I know what I'm doing!";
  if(questioning)            return "Sure.";
  if(yelling)                return "Whoa, chill out!";
  if(silent)                 return "Fine. Be that way!";

  return "Whatever.";
}
