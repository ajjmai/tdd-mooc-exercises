
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { RotatingShape } from "../src/RotatingShape.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
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

  const TEST_SHAPE = new RotatingShape(
    `X..
     XXX
     ...`);

  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(TEST_SHAPE);
  });

  it("can be rotated clockwise", () => {
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
});

// TODO: can be rotated counter-clockwise
// TODO: cannot be rotated when there is no room to rotate
// TODO: [wall kick] when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible

