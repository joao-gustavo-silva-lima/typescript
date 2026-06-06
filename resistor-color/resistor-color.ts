type Color = 'black' |
  'brown' |
  'red' |
  'orange' |
  'yellow' |
  'green' |
  'blue' |
  'violet' |
  'grey' |
  'white'
  
export const COLORS = [
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
]

export const colorCode = (entryColor : Color) : number => {
  return COLORS.findIndex(color => color == entryColor)
}

