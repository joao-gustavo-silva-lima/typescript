const isSuppletiveOrdinal = (position : string, ending : string) : boolean => 
  position.endsWith(ending) && !position.endsWith('1' + ending);

function getOrdinalSuffix(position : string) : string {
  if(isSuppletiveOrdinal(position, '1')) return "st";
  if(isSuppletiveOrdinal(position, '2')) return "nd";
  if(isSuppletiveOrdinal(position, '3')) return "rd";
  return "th";
}

export function format(name: string, number: number): string {
  const position : string = number.toString();
  
  const formattedPosition = position + getOrdinalSuffix(position);

  return `${name}, you are the ${formattedPosition} customer we serve today. Thank you!`;
}
