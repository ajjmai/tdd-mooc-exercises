import { EMPTY } from './constants.mjs'

export class Shape {
  shape;
  width;
  height;

  constructor(shape) {
    this.shape = shape.split('\n').map(it => it.trim().split(''));
    this.width = this.shape[0].length;
    this.height = this.shape.length;
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

  rotateClockwise() {
    const reversed = [...this.shape].reverse();
    const rotated = reversed[0].map((_, idx) => (reversed.map(row => row[idx])))
    return new Shape(rotated.map(it => it.join('')).join('\n'));
  }

  blockAt(row, col) {
    return this.shape[row][col];
  }

  rowAt(row) {
    return this.shape[row];
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
        s = s.rotateClockwise();
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
    return this.getCurrentOrientation().height;
  }

  width() {
    return this.getCurrentOrientation().width;
  }

  rotateClockwise() {
    return new RotatingShape(null, null, this.currentOrientation + 1, this.orientations);
  }

  rotateCounterClockwise() {
    return new RotatingShape(null, null, this.currentOrientation - 1, this.orientations);
  }

  blockAt(row, col) {
    return this.getCurrentOrientation().blockAt(row, col);
  }

  hasBlockAtRow(row) {
    return this.getCurrentOrientation().rowAt(row).some(it => it !== EMPTY);
  }
}