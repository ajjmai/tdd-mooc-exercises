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

  moveLeft() {
    return new MovableShape(this.shape, this.row, this.column - 1);
  }

  moveRight() {
    return new MovableShape(this.shape, this.row, this.column + 1);
  }

  getFallingBlockAt(row, col) {
    const blockRow = row - this.row;
    const blockCol = col - this.column;

    if (blockRow >= 0 && blockRow < this.height() &&
      blockCol >= 0 && blockCol < this.width()) {
      return this.blockAt(blockRow, blockCol);
    }
    return EMPTY;
  }

}