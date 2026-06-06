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
]

export function decodedValue(colors : string[]): number {
  let _decodedValue : string = ''
  for( let i : number = 0 ; i < 2 ; i++ ) {
    _decodedValue += COLORS.indexOf(colors[i])
  }

  return Number(_decodedValue)
}
