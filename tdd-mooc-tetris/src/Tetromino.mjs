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


  static I_SHAPE = new Tetromino(
    [`....
      IIII
      ....
      ....`,

      `..I.
       ..I.
       ..I.
       ..I.`
    ]
  );

  static O_SHAPE = new Tetromino(
    [`.OO.
      .OO.`]
  );

  static L_SHAPE = new Tetromino(
    [`....
      LLL.
      L...`,

      `.L..
       .L..
       .LL.`,

      `....
       ..L.
       LLL.`,

      `LL..
       .L..
       .L..`]
  );


  static J_SHAPE = new Tetromino(
    [`JJJ.
      ..J.
      ....`,

      `.J..
       .J..
       JJ..`,

      `...
       J...
       JJJ.`,

      `.JJ.
       .J..
       .J..`
    ]
  );

  static Z_SHAPE = new Tetromino(
    [`....
      ZZ..
      .ZZ.`,

      `..Z.
       .ZZ.
       .Z..`]
  );

  static S_SHAPE = new Tetromino(
    [`....
      .SS.
      SS..`,

      `S...
       SS..
       .S..`,]
  );
}