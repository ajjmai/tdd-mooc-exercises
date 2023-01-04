export class Block {
  color;

  constructor(color) {
    this.color = color;
  }

  rows() {
    return 1;
  }

  columns() {
    return 1;
  }

  blockAt(_row, _col) {
    return this.color;
  }
}
