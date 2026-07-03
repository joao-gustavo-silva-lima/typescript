export class Squares {
  private _sumOfSquares: number;
  private _squareOfSum : number;
  private _difference  : number;

  public get sumOfSquares() { return this._sumOfSquares; }
  public get squareOfSum()  { return this._squareOfSum ; }
  public get difference()   { return this._difference  ; }

  constructor(count: number) {
    this._sumOfSquares = Squares.calculateSumOfSquares(count)  ;
    this._squareOfSum  = Squares.calculateSquareOfSum(count)   ;
    this._difference   = this._squareOfSum - this._sumOfSquares;
  }

  private static calculateSumOfSquares(count: number): number {
    return (count * (count + 1) * (2 * count + 1)) / 6;
  }

  private static calculateSquareOfSum(count: number): number {
    return (count * (count + 1) / 2) ** 2;
  }
}
