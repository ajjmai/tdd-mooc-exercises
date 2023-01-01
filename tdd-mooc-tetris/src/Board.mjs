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
        if (this.falling && col == 0 && row == 1) {
          string += this.falling.color
        } else {
          string += "."
        }
      }
      string += "\n"
    }
    return string;
  }

  drop(block) {
    this.falling = block;
  }
}
