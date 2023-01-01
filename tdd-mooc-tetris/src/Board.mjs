export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const row = ".".repeat(this.width)+"\n"
    return row.repeat(this.height);
  }
}
