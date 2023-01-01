const EMPTY = '.';
const LINE_BREAK = '\n';

export class Board {
  width;
  height;
  falling;
  fallingBlockRow = 0;

  
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let string = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.hasFallingAt(row, col)) {
          string += this.falling.color;
        } else {
          string += EMPTY;
        }
      }
      string += LINE_BREAK;
    }
    return string;
  }

  hasFallingAt(row, col) {
    return this.falling && row == this.fallingBlockRow && col == 1;
  }

  isFalling() {
    return this.falling ? true : false;
  }

  drop(block) {
    if (this.isFalling()) {
      throw "already falling"
    }

    this.falling = block;
    this.fallingBlockRow = 0;
  }

  tick() {
    this.fallingBlockRow++;
  }
}
