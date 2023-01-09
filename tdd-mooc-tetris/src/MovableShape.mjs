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
  blockAt(row, col) {
    return this.shape.blockAt(row, col);
  }

  // relative to shape dimensions
  rowAt(row) {
    return this.shape.rowAt(row);
  }

  // relative to shape dimensions
  hasBlockAtCell(row, col) {
    return this.blockAt(row, col) !== EMPTY;
  }

  hasBlockAtRow(row) {
    return this.rowAt(row).some(it => it !== EMPTY);
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
      return this.blockAt(blockRow, blockCol);
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
      if (this.hasBlockAtRow(row) &&
        this.rowOffset + row >= board.height) {
        return true;
      }
    }
    return false;
  }

}