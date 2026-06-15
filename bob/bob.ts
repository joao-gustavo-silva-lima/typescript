const ALPHABET = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const isYelling = (message : string) : boolean => 
  message === message.toUpperCase() && ALPHABET.some(l => message.includes(l));

const isSilent  = (message : string) : boolean => 
  message.trim().length === 0;

const isQuestioning  = (message : string) : boolean => 
  message.trim().endsWith('?');

export function hey(message: string): string {

  if(isQuestioning(message) && isYelling(message)) 
    return "Calm down, I know what I'm doing!";

  if(isQuestioning(message)) 
    return "Sure.";

  if(isYelling(message)) 
    return "Whoa, chill out!";
  
  if(isSilent(message)) 
    return "Fine. Be that way!";
  
  return "Whatever.";
}
