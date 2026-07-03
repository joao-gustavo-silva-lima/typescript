type TriangleSides = [number, number, number];

export class Triangle {
  private _isEquilateral = false;
  private _isDegenerate  = false; 
  private _isIsosceles   = false;
  private _isScalene     = false;

  public get isEquilateral() { return this._isEquilateral; }
  public get isDegenerate()  { return this._isDegenerate ; }
  public get isIsosceles()   { return this._isIsosceles  ; }
  public get isScalene()     { return this._isScalene    ; }

  public constructor(...sides: TriangleSides) {
    if(!Triangle.validateMeasures(sides)) return;

    this._isEquilateral = Triangle.checkEquilateral(sides);
    this._isDegenerate  = Triangle.checkDegenerate(sides) ;
    this._isIsosceles   = Triangle.checkIsosceles(sides)  ;
    this._isScalene     = Triangle.checkScalene(sides)    ;
  }

  public static checkEquilateral(sides: TriangleSides): boolean {
    return sides[0] === sides[1] 
    &&     sides[0] === sides[2]
    &&     sides[1] === sides[2];
  }

  public static checkIsosceles(sides: TriangleSides): boolean {
    return sides[0] === sides[1] 
    ||     sides[0] === sides[2]
    ||     sides[1] === sides[2]; 
  }

  public static checkScalene(sides: TriangleSides): boolean {
    return sides[0] !== sides[1] 
    &&     sides[0] !== sides[2]
    &&     sides[1] !== sides[2];
  }

  public static checkDegenerate(sides: TriangleSides): boolean {
    return sides[0] + sides[1] === sides[2]
    &&     sides[0] + sides[2] === sides[1]
    &&     sides[1] + sides[2] === sides[0];
  }

  public static validateMeasures(sides: TriangleSides): boolean {
    if(sides.some((side) => side <= 0)) return false;
    if(sides[0] + sides[1] < sides[2] ) return false;
    if(sides[0] + sides[2] < sides[1] ) return false;
    if(sides[1] + sides[2] < sides[0] ) return false;
    return true;
  }
}
