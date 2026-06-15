const getRatiusDistance = (x : number, y : number) : number =>
  Math.sqrt(x**2 + y**2);

export function score(x: number, y: number): number {
  const ratiusDistance = getRatiusDistance(x, y);

  if(ratiusDistance <= 1 ) return 10;
  if(ratiusDistance <= 5 ) return  5;
  if(ratiusDistance <= 10) return  1;
  return 0;
}
