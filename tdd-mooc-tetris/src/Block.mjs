export class Block {
  color;

  constructor(color) {
    this.color = color;
  }

  height() {
    return 1;
  }

  width() {
    return 1;
  }

  blockAt(_row, _col) {
    return this.color;
  }

  hasBlockAtRow(_row) {
    return true;
  }
}
