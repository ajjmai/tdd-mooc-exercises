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
    `.OO
     .OO
     ...`,
    1
  );

}