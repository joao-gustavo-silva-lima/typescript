export class Matrix {
  public readonly rows : number[][];
  public readonly columns : number[][];

  constructor(matrix : string) {
    this.rows = matrix
      .split('\n')
      .map(row => row.split(' ').map(Number));

    this.columns = Array.from(
      { length : this.rows[0].length }, 
      (_, columnIndex) => this.rows.map(row => row[columnIndex]));
  }
}
