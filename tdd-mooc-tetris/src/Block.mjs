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

  rowAt(_row) {
    return [this.blockAt(0, 0)];
  }

  rowOffset() {
    return 0;
  }

  colOffset() {
    return 0;
  }
}
