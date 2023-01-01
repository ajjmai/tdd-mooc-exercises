const EMPTY = '.';
const LINE_BREAK = '\n';

export class Board {
  width;
  height;
  falling = null;
  fallingBlockRow = 0;
  fallingBlockColumn = 1;
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
        if (this.hasFallingAt(row, col)) {
          string += this.falling.color;
        } else {
          string += this.stationary[row][col];
        }
      }
      string += LINE_BREAK;
    }
    return string;
  }

  hasFallingAt(row, col) {
    return this.hasFalling() && row === this.fallingBlockRow && col === this.fallingBlockColumn;
  }

  hasFalling() {
    return this.falling != null;
  }

  drop(block) {
    if (this.hasFalling()) {
      throw "already falling"
    }

    this.falling = block;
    this.fallingBlockRow = 0;
    this.fallingBlockColumn = 1;
  }

  tick() {
    if (this.fallingBlockRow === this.height - 1) {
      const row = this.stationary[this.fallingBlockRow]
        .slice(0, this.fallingBlockColumn)
        .concat(this.falling.color)
        .concat(this.stationary[this.fallingBlockRow].slice(this.fallingBlockColumn + 1));
      this.stationary = this.stationary.slice(0, this.fallingBlockRow).concat([row]).concat(this.stationary.slice(this.fallingBlockRow + 1));
      this.falling = null;
    } else {
      this.fallingBlockRow++;
    }
  }
}
