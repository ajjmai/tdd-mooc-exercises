
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { RotatingShape } from "../src/RotatingShape.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Dropping tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("start from the top middle", () => {
    board.drop(Tetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("stop when they hit the bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  it("stop when they land on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });
});

describe("Falling tetrominoes", () => {
  const L_SHAPE = new RotatingShape(
    `X..
     XXX
     ...`
  );

  it("can be rotated clockwise", () => {
    const board = new Board(10, 6);
    board.drop(L_SHAPE);
    board.rotateClockwise();

    expect(board.toString()).to.equalShape(
      `....XX....
       ....X.....
       ....X.....
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated counter-clockwise", () => {
    const board = new Board(10, 6);
    board.drop(L_SHAPE);

    board.rotateCounterClockwise();

    expect(board.toString()).to.equalShape(
      `....X.....
       ....X.....
       ...XX.....
       ..........
       ..........
       ..........`
    );
  });

  const I_SHAPE = new RotatingShape(
    `.X.
     .X.
     .X.`
  );

  it("cannot be rotated when there is no room to rotate close to left wall", () => {
    const board = new Board(null, null,
      `..........
       ..........
       ..........
       ..ZZZZZZZZ
       ..ZZZZZZZZ
       ..ZZZZZZZZ`
    );
    board.drop(I_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveLeft();
    }
    board.moveDown();
    board.moveDown();
    board.rotateClockwise();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       X.........
       X.ZZZZZZZZ
       X.ZZZZZZZZ
       ..ZZZZZZZZ`
    );
  });

});

// TODO: cannot be rotated when there is no room to rotate
// TODO: [wall kick] when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible

