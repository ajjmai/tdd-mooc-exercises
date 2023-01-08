export class MovableShape {
  shape;
  row;
  column;

  constructor(shape, row, column) {
    this.shape = shape;
    this.row = row;
    this.column = column;
  }

  height() {
    this.shape.length;
  }

  width() {
    this.shape[0].length;
  }

  blockAt(row, col) {
    return this.shape[row][col];
  }

}