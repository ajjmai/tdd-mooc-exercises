import { EMPTY } from './constants.mjs'
export class MovableShape {
  shape;
  rowOffset;
  columnOffset;
  width;
  height;

  constructor(shape, row, column) {
    this.shape = shape;
    this.rowOffset = row;
    this.columnOffset = column;
    this.width = this.shape.width();
    this.height = this.shape.height();
    Object.freeze(this);
  }

  // relative to shape dimensions
  hasBlockAtCell(row, col) {
    return this.shape.blockAt(row, col) !== EMPTY;
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

  rotateClockwise() {
    return new MovableShape(this.shape.rotateClockwise(), this.rowOffset, this.columnOffset);
  }

  rotateCounterClockwise() {
    return new MovableShape(this.shape.rotateCounterClockwise(), this.rowOffset, this.columnOffset);
  }

  // relative to board dimensions
  getBlockAtBoard(row, col) {
    const blockRow = row - this.rowOffset;
    const blockCol = col - this.columnOffset;

    if (blockRow >= 0 && blockRow < this.height &&
      blockCol >= 0 && blockCol < this.width) {
      return this.shape.blockAt(blockRow, blockCol);
    }
    return EMPTY;
  }

  collidesWith(board) {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.hasBlockAtCell(row, col)) {
          const boardRow = this.rowOffset + row;
          const boardCol = this.columnOffset + col;
          if (boardRow < 0 || board[boardRow][boardCol] !== EMPTY) {
            return true;
          }
        }
      }
    }
    return false;
  }

  isOutside(board) {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
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