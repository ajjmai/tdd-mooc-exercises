import { Shape, RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {

  constructor(shapes) {
    const orientations = [];
    for (const shape of shapes) {
      orientations.push(new Shape(shape));
    }
    return new RotatingShape(null, null, 0, orientations);
  }

  static T_SHAPE = new Tetromino(
    [`.... 
      TTT.
      .T..`,

      `.T..
      TT..
      .T..`,

      `....
      .T..
      TTT.`,

      `.T..
      .TT.
      .T..`
    ]
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