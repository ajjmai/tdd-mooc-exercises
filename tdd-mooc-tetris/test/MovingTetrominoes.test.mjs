import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

const PLUS_SHAPE = new Tetromino(
  `.....
   ..X..
   .XXX.
   ..X..
   .....`,
  1, 0, []);

describe("Falling and moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  
  it("starts from the top middle when there are empty rows above the shape", () => {
    board.drop(PLUS_SHAPE);

    expect(board.toString()).to.equalShape(
      `....X.....
       ...XXX....
       ....X.....
       ..........
       ..........
       ..........`
    );
  });

  xit("can be moved left", () => {
    board.drop(PLUS_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `...X......
       ..XXX.....
       ...X......
       ..........
       ..........
       ..........`
    );
  });

xit("can be moved rigth", () => {
  board.drop(Tetromino.T_SHAPE);
  board.moveRight();

  expect(board.toString()).to.equalShape(
    `.....T....
     ....TTT...
     ..........
     ..........
     ..........
     ..........`
  );
});

it("can be moved down", () => {
  board.drop(Tetromino.T_SHAPE);
  board.moveDown();

  expect(board.toString()).to.equalShape(
    `..........
     ..........
     ..........
     ..........
     ....T.....
     ...TTT....`
  );
});

// it cannot be moved left beyond the board
// it cannot be moved right beyond the board
// it cannot be moved down beyond the board (will stop falling)
// it cannot be moved left through other blocks
// it cannot be moved right through other blocks
// it cannot be moved down through other blocks (will stop falling)
})