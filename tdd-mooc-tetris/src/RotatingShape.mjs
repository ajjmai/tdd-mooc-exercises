const EMPTY = '.';
class Shape {
  shape;

  constructor(shape) {
    this.shape = shape.split('\n').map(it => it.trim().split(''));
    Object.freeze(this);
  }

  toString() {
    let string = "";
    for (let row = 0; row < this.shape.length; row++) {
      string += this.shape[row].join('');
      string += '\n';
    }
    return string;
  }

  rotateRight() {
    const reversed = [...this.shape].reverse();
    const rotated = reversed[0].map((_, idx) => (reversed.map(row => row[idx])))
    return new Shape(rotated.map(it => it.join('')).join('\n'));
  }

  height() {
    return this.shape.length;
  }

  width() {
    return this.shape[0].length;
  }

  blockAt(row, col) {
    return this.shape[row][col];
  }

  rowAt(row) {
    return this.shape[row];
  }

  colOffset() {
    for (let col = 0; col < this.width(); col++) {
      for (let row = 0; row < this.height(); row++) {
        if (this.shape[row][col] !== EMPTY) {
          return -col;
        }
      }
    }
    return 0;
  }

  colOffsetFromRight() {
    for (let col = this.width() - 1; col >= 0; col--) {
      for (let row = 0; row < this.height(); row++) {
        if (this.shape[row][col] !== EMPTY) {
          return this.width() - 1 - col;
        }
      }
    }
    return 0;
  }

}

export class RotatingShape {
  orientations = [];
  currentOrientation;

  constructor(shape, orientationsCount = 4, currentOrientation = 0, orientations = []) {
    this.orientations = orientations;

    if (!shape) {
      this.currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    } else {
      let s = new Shape(shape);
      for (let i = 0; i < orientationsCount; i++) {
        this.orientations.push(s);
        s = s.rotateRight();
      }
      this.currentOrientation = currentOrientation;
    }

    Object.freeze(this);
  }

  getCurrentOrientation() {
    return this.orientations[this.currentOrientation];
  }

  toString() {
    return this.getCurrentOrientation().toString()
  }

  height() {
    return this.getCurrentOrientation().height();
  }

  width() {
    return this.getCurrentOrientation().width();
  }

  rotateRight() {
    return new RotatingShape(null, null, this.currentOrientation + 1, this.orientations);
  }

  rotateLeft() {
    return new RotatingShape(null, null, this.currentOrientation - 1, this.orientations);
  }

  blockAt(row, col) {
    return this.getCurrentOrientation().blockAt(row, col);
  }

  rowAt(row) {
    return this.getCurrentOrientation().rowAt(row);
  }

  colOffset() {
    return this.getCurrentOrientation().colOffset();
  }

  colOffsetFromRight() {
    return this.getCurrentOrientation().colOffsetFromRight();
  }
}