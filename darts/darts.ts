export function score(x: number, y: number): number {
  const ratiusDistance = Math.sqrt(x**2 + y**2);

  if(ratiusDistance <=  1) return 10;
  if(ratiusDistance <=  5) return  5;
  if(ratiusDistance <= 10) return  1;
  return 0;
}
