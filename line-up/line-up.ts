export function format(
  name: string, 
  number: number | string
): string {
  number = number.toString();

  if(number.endsWith('1') && !number.endsWith("11"))
    number += "st";
  else if(number.endsWith('2') && !number.endsWith("12"))
    number += "nd";
  else if(number.endsWith('3') && !number.endsWith("13"))
    number += "rd";
  else
    number += "th";

  return `${name}, you are the ${number} customer we serve today. Thank you!`;
}
