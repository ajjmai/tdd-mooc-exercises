const EMPTY = '.';
const LINE_BREAK = '\n';

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
    const block = this.fallingBlockAt(row, col)
    if (block !== EMPTY) {
      return block;
    }
      return this.stationary[row][col];
    }

  fallingBlockAt(row, col) {
    const blockRow = row - this.fallingBlockRow;
    const blockCol = col - this.fallingBlockColumn;
    if (this.hasFalling() &&
      blockRow >= 0 && blockRow < this.fallingBlock.height() && 
      blockCol >= 0 && blockCol < this.fallingBlock.width()) {
      return this.fallingBlock.blockAt(blockRow, blockCol);
    }
    return EMPTY;
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
    this.fallingBlockRow = this.startingRowOffset(block);
    this.fallingBlockColumn = Math.floor((this.width - block.width()) / 2);
  }

  startingRowOffset(block) {
    for (let row = 0; row < block.height(); row++) {
      if (block.rowAt(row).some(it => it !== EMPTY)) {
        return -row;
      }
    }
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
    this.fallingBlockRow++;
  }

  fallingHitsFloor() {
    for (let row = 0; row < this.fallingBlock.height(); row++) {
      if (this.fallingBlock.rowAt(row).some(it => it !== EMPTY) &&
       this.fallingBlockRow + row >= this.height - 1) {
        return true;
      }
    }
    return false;
  }

  fallingHitsStationary() {
    for (let row = 0; row < this.fallingBlock.height(); row++) {
      for (let col = 0; col < this.fallingBlock.width(); col++) {
        const block = this.fallingBlock.blockAt(row, col);
        if (block !== EMPTY) {
          const boardRow = this.fallingBlockRow + row;
          const boardCol = this.fallingBlockColumn + col;
          console.log(boardRow, boardCol);
          if (this.stationary[boardRow + 1][boardCol] !== EMPTY) {
            return true;
          }
        }
      }
    }
    return this.stationary[this.fallingBlockRow + 1][this.fallingBlockColumn] !== EMPTY;
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

  moveRight() {
    if (!this.hasFalling()) return;
    this.fallingBlockColumn += 1;
  }

  moveDown() {
    if (!this.hasFalling()) return;
    while (this.canStillFall()) {
      this.fallOneRow()
    }
  }

}
