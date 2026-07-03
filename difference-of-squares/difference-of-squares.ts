export class Squares {
  public sumOfSquares: number;
  public  squareOfSum: number;
  public   difference: number;

  constructor(count: number) {
    this.sumOfSquares = Squares.calculateSumOfSquares(count);
    this.squareOfSum  =  Squares.calculateSquareOfSum(count);
    this.difference   = this.squareOfSum - this.sumOfSquares;
  }

  private static calculateSumOfSquares(count: number): number {
    let result = 0;
    for(let i = 1 ; i <= count ; i++) {
      result += i ** 2;
    }
    return result; 
  }

  private static calculateSquareOfSum(count: number): number {
    let result = 0;
    for(let i = 1 ; i <= count ; i++) {
      result += i;
    }
    return result ** 2;
  }
}
