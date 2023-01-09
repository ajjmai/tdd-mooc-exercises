import { MovableShape } from "../src/MovableShape.mjs";

const EMPTY = '.';
const LINE_BREAK = '\n';

export class Board {
  width;
  height;
  fallingShape;
  stationary;


  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.stationary = Array(height).fill(Array(width).fill(EMPTY));
  }

  toString() {
    let string = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        string += this.getBoardCellAt(row, col)
      }
      string += LINE_BREAK;
    }
    return string;
  }

  getBoardCellAt(row, col) {
    if (this.hasFalling()) {
      const block = this.fallingShape.getBlockAtBoard(row, col)
      if (block !== EMPTY) {
        return block;
      }
    }
    return this.stationary[row][col];
  }

  hasFalling() {
    return this.fallingShape != null;
  }

  drop(shape) {
    if (this.hasFalling()) {
      throw "already falling"
    }
    // start falling
    this.fallingShape = new MovableShape(shape, this.startingRowOffset(shape), Math.floor((this.width - shape.width()) / 2));
  }

  startingRowOffset(shape) {
    for (let row = 0; row < shape.height(); row++) {
      if (shape.rowAt(row).some(it => it !== EMPTY)) {
        return -row;
      }
    }
    return 0;
  }

  tick() {
    if (!this.hasFalling()) return;
    this.moveDown();
  }

  stopFalling() {
    const stationary = []
    for (let row = 0; row < this.height; row++) {
      const newRow = [];
      for (let col = 0; col < this.width; col++) {
        newRow.push(this.getBoardCellAt(row, col));
      }
      stationary.push(newRow);
    }
    this.stationary = stationary;
    this.fallingShape = null;
  }

  moveLeft() {
    const test = this.fallingShape.moveLeft();
    if (!test.isOutside(this)) {
      this.fallingShape = test;
    }
  }

  moveRight() {
    if (this.hasFalling() && this.fallingShape.column() + this.fallingShape.width() - this.fallingShape.colOffsetFromRight() !== this.width) {
      this.fallingShape = this.fallingShape.moveRight();
    }
  }

  moveDown() {
    const test = this.fallingShape.moveDown();
    if (test.isOutside(this) || test.collidesWith(this.stationary)) {
      this.stopFalling();
    } else {
      this.fallingShape = test;
    }
  }

}
