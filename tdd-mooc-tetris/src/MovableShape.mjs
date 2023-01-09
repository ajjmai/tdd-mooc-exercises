const EMPTY = '.';
export class MovableShape {
  shape;
  rowOffset;
  columnOffset;

  constructor(shape, row, column) {
    this.shape = shape;
    this.rowOffset = row;
    this.columnOffset = column;
  }

  row() {
    return this.rowOffset;
  }

  column() {
    return this.columnOffset;
  }

  height() {
    return this.shape.height();
  }

  width() {
    return this.shape.width();
  }

  // relative to shape dimensions
  hasBlockAtCell(row, col) {
    return this.shape.blockAt(row, col) !== EMPTY;
  }

  // relative to shape dimensions
  hasBlockAtRow(row) {
    return this.shape.rowAt(row).some(it => it !== EMPTY);
  }

  moveDown() {
    return new MovableShape(this.shape, this.rowOffset + 1, this.columnOffset);
  }

  moveLeft() {
    return new MovableShape(this.shape, this.rowOffset, this.columnOffset - 1);
  }

  moveRight() {
    return new MovableShape(this.shape, this.rowOffset, this.columnOffset + 1);
  }

  // relative to board dimensions
  getBlockAtBoard(row, col) {
    const blockRow = row - this.rowOffset;
    const blockCol = col - this.columnOffset;

    if (blockRow >= 0 && blockRow < this.height() &&
      blockCol >= 0 && blockCol < this.width()) {
      return this.shape.blockAt(blockRow, blockCol);
    }
    return EMPTY;
  }

  collidesWith(board) {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        if (this.hasBlockAtCell(row, col)) {
          const boardRow = this.rowOffset + row;
          const boardCol = this.columnOffset + col;
          if (board[boardRow][boardCol] !== EMPTY) {
            return true;
          }
        }
      }
    }
    return false;
  }

  isOutside(board) {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        if (this.hasBlockAtCell(row, col)) {
          if (this.rowOffset + row >= board.height || this.columnOffset + col < 0 || this.columnOffset + col >= board.width) {
            return true;
          }
        }
      }
    }
    return false;
  }
}