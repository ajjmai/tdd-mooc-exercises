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
    for (let col = 0; col < this.width(); col++) {
      for (let row = 0; row < this.height(); row++) {
        if (this.shape.blockAt(row, col) !== EMPTY) {
          return -col;
        }
      }
    }
    return 0;
  }

  colOffsetFromRight() {
    for (let col = this.width() - 1; col >= 0; col--) {
      for (let row = 0; row < this.height(); row++) {
        if (this.shape.blockAt(row, col) !== EMPTY) {
          return this.width() - 1 - col;
        }
      }
    }
    return 0;
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