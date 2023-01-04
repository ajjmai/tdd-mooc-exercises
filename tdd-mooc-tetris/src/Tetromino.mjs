import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {
  orientations = [];
  currentOrientation;

  static T_SHAPE = new Tetromino(
    `.T.
     TTT
     ...`,
    4, 0, []);

  static I_SHAPE  = new Tetromino(
    `.....
     .....
     IIII.
     .....
     .....`,
    2, 0, []
  );

  static O_SHAPE = new Tetromino(
    `.OO
     .OO
     ...`,
    1, 0, []
  )

  constructor(shape, orientationsCount, currentOrientation, orientations) {
    this.orientations = orientations;
    
    if (!shape) {
      this.currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    } else {
      let s = new RotatingShape(shape);
      for (let i = 0; i < orientationsCount; i++) {
        this.orientations.push(s);
        s = s.rotateRight();
      }
      this.currentOrientation = currentOrientation;
    }

    Object.freeze(this);
  }

  toString() {
    return this.getCurrentOrientation().toString()
  }

  getCurrentOrientation() {
    return this.orientations[this.currentOrientation];
  }

  rotateRight() {
    return new Tetromino(null, null, this.currentOrientation + 1, this.orientations);
  }

  rotateLeft() {
    return new Tetromino(null, null, this.currentOrientation - 1, this.orientations);
  }

  height() {
    return this.getCurrentOrientation().height();
  }

  width() {
    return this.getCurrentOrientation().width();
  }

  blockAt(row, col) {
    return this.getCurrentOrientation().blockAt(row, col);
  }


}
