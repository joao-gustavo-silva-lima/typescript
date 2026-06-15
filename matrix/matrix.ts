export class Matrix {
  constructor(private matrix : string) {}

  get rows() : number[][] {
    return this.matrix
      .split('\n')
      .map(row => row.split(' ').map(unit => Number(unit)));
  }

  get columns() : number[][] {
    return Array.from(
      { length : this.rows[0].length }, 
      (v, k) => this.rows.map(r => r[k]));
  }
}
