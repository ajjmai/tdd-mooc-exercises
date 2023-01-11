
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { RotatingShape } from "../src/RotatingShape.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

const PLUS_SHAPE = new RotatingShape(
  `.....
   ..X..
   .XXX.
   ..X..
   .....`
);

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

  it("start from the top middle when there are empty rows above the shape", () => {
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

describe("Moving tetrominoes", () => {
  const PLUS_SHAPE = new RotatingShape(
    `.....
     ..X..
     .XXX.
     ..X..
     .....`
  );

  describe("On an empty board", () => {
    let board;
    beforeEach(() => {
      board = new Board(10, 6);
      board.drop(PLUS_SHAPE);
    });

    it("can be moved left", () => {
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
      for (let i = 0; i < 10; i++) {
        board.moveLeft();
      }

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
      for (let i = 0; i < 10; i++) {
        board.moveRight();
      }

      expect(board.toString()).to.equalShape(
        `........X.
         .......XXX
         ........X.
         ..........
         ..........
         ..........`
      );

    });

    it("cannot be moved down beyond the board", () => {
      for (let i = 0; i < 10; i++) {
        board.moveDown();
      }

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....X.....
         ...XXX....
         ....X.....`
      );
      expect(board.fallingShape).to.be.null;
    });
  })
  describe("On a non-empty board", () => {
    let board;
    beforeEach(() => {
      board = new Board(null, null,
        `Z........Z
         Z........Z
         Z........Z
         Z........Z
         Z........Z
         Z.ZZZZZZZZ`
      );
      board.drop(PLUS_SHAPE);
    });

    it("cannot be moved left through other blocks", () => {
      for (let i = 0; i < 10; i++) {
        board.moveLeft();
      }

      expect(board.toString()).to.equalShape(
        `Z.X......Z
         ZXXX.....Z
         Z.X......Z
         Z........Z
         Z........Z
         Z.ZZZZZZZZ`
      );
    });

    it("cannot be moved right through other blocks", () => {
      for (let i = 0; i < 10; i++) {
        board.moveRight();
      }

      expect(board.toString()).to.equalShape(
        `Z......X.Z
         Z.....XXXZ
         Z......X.Z
         Z........Z
         Z........Z
         Z.ZZZZZZZZ`
      );
    });

    it("cannot be moved down through other blocks", () => {
      for (let i = 0; i < 10; i++) {
        board.moveDown();
      }

      expect(board.toString()).to.equalShape(
        `Z........Z
         Z........Z
         Z...X....Z
         Z..XXX...Z
         Z...X....Z
         Z.ZZZZZZZZ`
      );
    });
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

  it("cannot be rotated when there is no room to rotate close to right wall", () => {
    const board = new Board(null, null,
      `..........
       ..........
       ..........
       ZZZZZZZZ..
       ZZZZZZZZ..
       ZZZZZZZZ..`
    );
    board.drop(I_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveRight();
    }
    board.moveDown();
    board.moveDown();
    board.rotateCounterClockwise();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .........X
       ZZZZZZZZ.X
       ZZZZZZZZ.X
       ZZZZZZZZ..`
    );
  });

});

// TODO: cannot be rotated when there is no room to rotate
// TODO: [wall kick] when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible

