const EMPTY = '.';
export class MovableShape {
  shape;
  row;
  column;

  constructor(shape, column) {
    this.shape = shape;
    this.row = this.startingRowOffset(shape);
    this.column = column;
  }

  startingRowOffset(shape) {
    for (let row = 0; row < shape.height(); row++) {
      if (shape.rowAt(row).some(it => it !== EMPTY)) {
        return -row;
      }
    }
    return 0;
  }

  height() {
    this.shape.height();
  }

  width() {
    this.shape.width();
  }

  blockAt(row, col) {
    return this.shape.blockAt(row, col);
  }

}