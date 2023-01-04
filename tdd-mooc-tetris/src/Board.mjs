const EMPTY = '.';
const LINE_BREAK = '\n';
const TOP_ROW = 0;

export class Board {
  width;
  height;
  fallingBlock;
  fallingBlockRow;
  fallingBlockColumn;
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
          string += this.getBlockAt(row, col)
      }
      string += LINE_BREAK;
    }
    return string;
  }

  getBlockAt(row, col) {
    if (this.hasFallingBlockAt(row, col)) {
      return this.fallingBlock.blockAt(row - this.fallingBlockRow, col - this.fallingBlockColumn);
    } else {
      return this.stationary[row][col];
    }
  }

  hasFallingBlockAt(row, col) {
    if (this.hasFalling() && row >= this.fallingBlockRow && row < this.fallingBlockRow + this.fallingBlock.height() && 
    col >= this.fallingBlockColumn && col < this.fallingBlockColumn + this.fallingBlock.width()) {
      return this.fallingBlock.blockAt(row - this.fallingBlockRow, col - this.fallingBlockColumn) !== EMPTY;
    }
  }

  hasFalling() {
    return this.fallingBlock != null;
  }

  drop(block) {
    if (this.hasFalling()) {
      throw "already falling"
    }
    // start falling
    this.fallingBlock = block;
    this.fallingBlockRow = TOP_ROW;
    this.fallingBlockColumn = Math.floor((this.width - block.width()) / 2);
  }

  tick() {
    if (!this.hasFalling()) return;
    if (this.fallingHitsFloor() || this.fallingHitsStationary()) {
      this.stopFalling();
    } else {
      // fall one row
      this.fallingBlockRow++;
    }
  }

  fallingHitsFloor() {
    return this.fallingBlockRow + this.fallingBlock.height() === this.height;
  }

  fallingHitsStationary() {
    return this.stationary[this.fallingBlockRow + this.fallingBlock.height()].some(it => it !== EMPTY);
  }

  stopFalling() {
    const stationary = []
    for (let row = 0; row < this.height; row++) {
      const newRow = [];
      for (let col = 0; col < this.width; col++) {
          newRow.push(this.getBlockAt(row, col));
      }
      stationary.push(newRow);
    }
    this.stationary = stationary;
    this.fallingBlock = null;
  }

  moveLeft() {
    if (!this.hasFalling()) return;
    this.fallingBlockColumn -= 1;
  }

}
