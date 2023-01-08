const EMPTY = '.';
export class MovableShape {
  shape;
  row;
  column;

  constructor(shape, row, column) {
    this.shape = shape;
    this.row = row;
    this.column = column;
  }

  getRow() {
    return this.row;
  }

  getColumn() {
    return this.column;
  }

  setRow(row) {
    this.row = row;
  }

  setColumn(col) {
    this.col = col;
  }

  height() {
    return this.shape.height();
  }

  width() {
    return this.shape.width();
  }

  blockAt(row, col) {
    return this.shape.blockAt(row, col);
  }

  rowAt(row) {
    return this.shape.rowAt(row);
  }

  colOffset() {
    return this.shape.colOffset();
  }

  colOffsetFromRight() {
    return this.shape.colOffsetFromRight();
  }

  moveDown() {
    return new MovableShape(this.shape, this.row + 1, this.column);
  }

}