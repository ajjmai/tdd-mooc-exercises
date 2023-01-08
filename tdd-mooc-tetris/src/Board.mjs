const EMPTY = '.';
const LINE_BREAK = '\n';

export class Board {
  width;
  height;
  fallingShape;
  fallingShapeRow;
  fallingShapeColumn;
  stationary;


  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.stationary = Array(height).fill(Array(width).fill(EMPTY));
  }

  toString() {
    let string = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        string += this.getBoardCellAt(row, col)
      }
      string += LINE_BREAK;
    }
    return string;
  }

  getBoardCellAt(row, col) {
    const block = this.getFallingBlockAt(row, col)
    if (block !== EMPTY) {
      return block;
    }
    return this.stationary[row][col];
  }

  getFallingBlockAt(row, col) {
    const blockRow = row - this.fallingShapeRow;
    const blockCol = col - this.fallingShapeColumn;
    if (this.hasFalling() &&
      blockRow >= 0 && blockRow < this.fallingShape.height() &&
      blockCol >= 0 && blockCol < this.fallingShape.width()) {
      return this.fallingShape.blockAt(blockRow, blockCol);
    }
    return EMPTY;
  }

  hasFalling() {
    return this.fallingShape != null;
  }

  drop(shape) {
    if (this.hasFalling()) {
      throw "already falling"
    }
    // start falling
    this.fallingShape = shape;
    this.fallingShapeRow = this.fallingShape.rowOffset();
    this.fallingShapeColumn = Math.floor((this.width - shape.width()) / 2);
  }

  tick() {
    if (!this.hasFalling()) return;
    if (!this.canStillFall()) {
      this.stopFalling();
    } else {
      this.fallOneRow();
    }
  }

  canStillFall() {
    return !this.fallingHitsFloor() && !this.fallingHitsStationary()
  }

  fallOneRow() {
    this.fallingShapeRow++;
  }

  fallingHitsFloor() {
    for (let row = 0; row < this.fallingShape.height(); row++) {
      if (this.fallingShape.rowAt(row).some(it => it !== EMPTY) &&
        this.fallingShapeRow + row >= this.height - 1) {
        return true;
      }
    }
    return false;
  }

  fallingHitsStationary() {
    for (let row = 0; row < this.fallingShape.height(); row++) {
      for (let col = 0; col < this.fallingShape.width(); col++) {
        const block = this.fallingShape.blockAt(row, col);
        if (block !== EMPTY) {
          const boardRow = this.fallingShapeRow + row;
          const boardCol = this.fallingShapeColumn + col;
          if (this.stationary[boardRow + 1][boardCol] !== EMPTY) {
            return true;
          }
        }
      }
    }
    return this.stationary[this.fallingShapeRow + 1][this.fallingShapeColumn] !== EMPTY;
  }

  stopFalling() {
    const stationary = []
    for (let row = 0; row < this.height; row++) {
      const newRow = [];
      for (let col = 0; col < this.width; col++) {
        newRow.push(this.getBoardCellAt(row, col));
      }
      stationary.push(newRow);
    }
    this.stationary = stationary;
    this.fallingShape = null;
  }

  moveLeft() {
    if (this.hasFalling() && this.fallingShapeColumn - this.fallingShape.colOffset() !== 0) {
      this.fallingShapeColumn -= 1;
    }
  }

  moveRight() {
    if (this.hasFalling() && this.fallingShapeColumn + this.fallingShape.width() - this.fallingShape.colOffsetFromRight() !== this.width) {
      this.fallingShapeColumn += 1;
    }
  }

  moveDown() {
    this.tick();
  }

}
