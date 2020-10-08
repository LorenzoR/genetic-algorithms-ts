export class Matrix<T> {
  private rows: number;

  private cols: number;

  private elements: T[][];

  public constructor(rows: number, cols: number) {
      this.rows = rows;
      this.cols = cols;
      this.elements = new Array<T[]>(this.rows);
  }

  public getSize(): { rows: number; cols: number } {
    return {
        rows: this.rows,
        cols: this.cols,
    };
  }

  public insert(element: T, row: number, col: number): void {
      if (row >= this.rows || row < 0) {
          throw new Error('Invalid row');
      }

      if (col >= this.cols || col < 0) {
          throw new Error('Invalid column');
      }

      if (!this.elements[row]) {
          this.elements[row] = new Array<T>(this.cols);
      }

      this.elements[row][col] = element;
  }

  public get(row: number, col: number): T {
      if (row >= this.rows || row < 0) {
          throw new Error('Invalid row');
      }

      if (col >= this.cols || col < 0) {
          throw new Error('Invalid column');
      }

      return this.elements[row][col];
  }
}
