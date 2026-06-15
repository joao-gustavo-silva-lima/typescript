export class Matrix {
  constructor(private matrix : string) {}

  get rows() : number[][] {
    return this.matrix
      .split('\n')
      .map(row => row.split(' ').map(unit => Number(unit)));
  }

  get columns() : number[][] {
    const columns : number[][] = [];

    for(let i = 0 ; i < this.rows[0].length ; i++ ) {
      const column : number[] = [];

      this.rows.forEach(r => column.push(r[i]));

      columns.push(column);
    }

    return columns;
  }
}
