const EMPTY = '.';
const LINE_BREAK = "\n";

export class Board {
  width;
  height;
  falling;

  
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let string = "";
    for (let col = 0; col < this.height; col++) {
      for (let row = 0; row < this.width; row++) {
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
    return this.falling && col == 0 && row == 1;
  }

  drop(block) {
    this.falling = block;
  }
}
