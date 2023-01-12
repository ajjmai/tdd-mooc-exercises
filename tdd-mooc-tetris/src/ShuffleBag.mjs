import { Tetromino } from "./Tetromino.mjs";

export class ShuffleBag {
  contents;
  currentItem;
  currentPosition;

  constructor() {
    this.contents = [Tetromino.I_SHAPE, Tetromino.J_SHAPE, Tetromino.L_SHAPE, Tetromino.O_SHAPE, Tetromino.S_SHAPE, Tetromino.T_SHAPE, Tetromino.Z_SHAPE];
    this.currentPosition = this.size() - 1;
  }

  next() {
    if (this.currentPosition < 1) {
      this.currentPosition = this.size() - 1;
      this.currentItem = this.contents[0];
      return this.currentItem;
    }
    const position = Math.floor(Math.random() * this.currentPosition);
    this.currentItem = this.contents[position];
    this.contents[position] = this.contents[this.currentPosition];
    this.contents[this.currentPosition] = this.currentItem;
    this.currentPosition -= 1;

    return this.currentItem;
  }

  size() {
    return this.contents.length;
  }
}
