import { MovableShape } from "./MovableShape.mjs";
import { EMPTY, LINE_BREAK } from './constants.mjs'
import { ScoringSystem } from "./ScoringSystem.mjs";

export class Board {
  width;
  height;
  fallingShape;
  stationary;
  score;

  constructor(width, height, presetBoard = null, level = null) {
    if (presetBoard) {
      this.stationary = presetBoard.split('\n').map(it => it.trim().split(''));
      this.width = this.stationary[0].length;
      this.height = this.stationary.length;
    } else {
      this.stationary = Array(height).fill(Array(width).fill(EMPTY));
      this.width = width;
      this.height = height;
    }
    this.score = new ScoringSystem(level);
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
      if (shape.hasBlockAtRow(row)) {
        return -row;
      }
    }
    return 0;
  }

  tick() {
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
    if (this.shouldClearRows()) {
      this.clearRows();
    }
  }

  moveLeft() {
    const test = this.fallingShape.moveLeft();
    this.tryMove(test);
  }

  moveRight() {
    const test = this.fallingShape.moveRight();
    this.tryMove(test);
  }

  tryMove(shape) {
    if (this.isAllowedToMove(shape)) {
      this.fallingShape = shape;
    }
  }

  moveDown() {
    if (!this.hasFalling()) return;

    const test = this.fallingShape.moveDown();
    if (this.isAllowedToMove(test)) {
      this.fallingShape = test;
    } else {
      this.stopFalling();
    }
  }

  rotateClockwise() {
    const test = this.fallingShape.rotateClockwise();
    this.tryRotate(test);
  }

  rotateCounterClockwise() {
    const test = this.fallingShape.rotateCounterClockwise();
    this.tryRotate(test);
  }

  tryRotate(shape) {
    const candidateMoves = [
      shape,
      shape.moveLeft(),
      shape.moveRight(),
      shape.moveLeft().moveLeft(),
      shape.moveRight().moveRight(),
      shape.moveDown(),
    ];
    for (const candidate of candidateMoves) {
      if (this.isAllowedToMove(candidate)) {
        this.fallingShape = candidate;
        return;
      }
    }
  }

  isAllowedToMove(shape) {
    return !shape.isOutside(this) && !shape.collidesWith(this.stationary);
  }

  shouldClearRows() {
    return !this.stationary.every(row => row.some(col => col === EMPTY));
  }

  clearRows() {
    const stationary = []
    for (let row = 0; row < this.height; row++) {
      if (this.stationary[row].some(col => col === EMPTY)) {
        stationary.push(this.stationary[row])
      }
    }
    if (stationary.length < this.height) {
      const rowsCleared = this.height - stationary.length;
      const emptyRows = Array(rowsCleared).fill(Array(this.width).fill(EMPTY));
      this.stationary = emptyRows.concat(stationary);
      this.score.add(rowsCleared);
    }
  }

  getScore() {
    return this.score.getScore();
  }

}
