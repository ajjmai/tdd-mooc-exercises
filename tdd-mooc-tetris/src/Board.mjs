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
    return this.hasFalling() && row >= this.fallingBlockRow && row < this.fallingBlockRow + this.fallingBlock.rows() && 
    col >= this.fallingBlockColumn && col < this.fallingBlockColumn + this.fallingBlock.columns();
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
    this.fallingBlockColumn = Math.floor((this.width - block.rows()) / 2);
  }

  tick() {
    if (this.fallingHitsFloor() || this.fallingHitsStationary()) {
      this.stopFalling();
    } else {
      // fall one row
      this.fallingBlockRow++;
    }
  }

  fallingHitsFloor() {
    return this.fallingBlockRow === this.height - 1;
  }

  fallingHitsStationary() {
    return this.stationary[this.fallingBlockRow + 1][this.fallingBlockColumn] !== EMPTY;
  }

  stopFalling() {
    const newRow = this.stationary[this.fallingBlockRow].slice(0, this.fallingBlockColumn)
      .concat(this.fallingBlock.color).concat(this.stationary[this.fallingBlockRow].slice(this.fallingBlockColumn + 1));
    this.stationary = this.stationary.slice(0, this.fallingBlockRow).concat([newRow])
      .concat(this.stationary.slice(this.fallingBlockRow + 1));

      this.fallingBlock = null;
  }
}
