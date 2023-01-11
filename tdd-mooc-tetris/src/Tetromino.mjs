import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {

  static T_SHAPE = new RotatingShape(
    `.T.
     TTT
     ...`,
    4
  );

  static I_SHAPE = new RotatingShape(
    `.....
     .....
     IIII.
     .....
     .....`,
    2
  );

  static O_SHAPE = new RotatingShape(
    `OO
     OO`,
    1
  );

  static L_SHAPE = new RotatingShape(
    `LLL
     L..
     ...`,
    4
  );

  static J_SHAPE = new RotatingShape(
    `JJJ
     ..J
     ...`,
    4
  );

  static Z_SHAPE = new RotatingShape(
    `...
     ZZ.
     .ZZ`,
    2
  );

  static S_SHAPE = new RotatingShape(
    `...
     .SS
     SS.`,
    2
  );
}