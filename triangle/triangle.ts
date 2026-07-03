type TriangleSides = [number, number, number];

export class Triangle {
  public readonly isEquilateral: boolean = false;
  public readonly isDegenerate : boolean = false; 
  public readonly isIsosceles  : boolean = false;
  public readonly isScalene    : boolean = false;

  public constructor(...sides: TriangleSides) {
    if(!Triangle.isValid(sides)) return;

    const [a, b, c] = sides.sort((x, y) => x - y)

    this.isDegenerate  = a + b === c       ;
    this.isEquilateral = a === c           ; 
    this.isIsosceles   = a === b || b === c;
    this.isScalene     = a !== b && b !== c;
  }

  public static isValid([a, b ,c]: TriangleSides): boolean {
    return a > 0 
    &&     b > 0 
    &&     c > 0
    &&     a + b >= c
    &&     a + c >= b
    &&     b + c >= a;
  }
}
