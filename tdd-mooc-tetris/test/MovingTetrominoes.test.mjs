import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { RotatingShape } from "../src/RotatingShape.mjs";

const PLUS_SHAPE = new RotatingShape(
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

  it("can be moved left", () => {
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

  it("can be moved right", () => {
    board.drop(PLUS_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.....X....
     ....XXX...
     .....X....
     ..........
     ..........
     ..........`
    );
  });

  it("can be moved down", () => {
    board.drop(PLUS_SHAPE);
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
     ....X.....
     ...XXX....
       ....X.....
       ..........
       ..........`
    );
  });

  it("cannot be moved left beyond the board", () => {
    board.drop(PLUS_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `.X........
       XXX.......
       .X........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved right beyond the board", () => {
    board.drop(PLUS_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `........X.
       .......XXX
       ........X.
       ..........
       ..........
       ..........`
    );

  });

  it("it cannot be moved down beyond the board", () => {
    board.drop(PLUS_SHAPE);
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....X.....
       ...XXX....
       ....X.....`
    );
  });

  // it cannot be moved down beyond the board (will stop falling)
  // it cannot be moved left through other blocks
  // it cannot be moved right through other blocks
  // it cannot be moved down through other blocks (will stop falling)
});