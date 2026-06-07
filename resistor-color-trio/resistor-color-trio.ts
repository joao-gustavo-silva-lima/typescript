const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white'
] as const;

type Color = typeof COLORS[number];

const decodeColor = (color : Color) : number => {
  return COLORS.indexOf(color);
};

const setValueUnit = (value : number, baseUnit : string = 'ohms') : string => {
  if(value >= 10**9) return `${value / 10**9} giga${baseUnit}`;
  if(value >= 10**6) return `${value / 10**6} mega${baseUnit}`;
  if(value >= 10**3) return `${value / 10**3} kilo${baseUnit}`;
  return `${value} ${baseUnit}`;
};

export function decodedResistorValue(
  [
    color1,
    color2,
    color3
  ] :
  [
    Color,
    Color,
    Color,
    ...Color[]
  ]
) : string {
  const digit1 : number = decodeColor(color1);
  const digit2 : number = decodeColor(color2);
  const digit3 : number = decodeColor(color3);
  
  let resistorValue : number = digit1 * 10 + digit2
  resistorValue *= 10**digit3

  return setValueUnit(resistorValue);
}

