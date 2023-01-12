import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from '../src/Tetromino.mjs';

describe('Scoring system', () => {
  it('score is 0 at the beginning of game', () => {
    const board = new Board(10, 6);
    expect(board.getScore()).to.equal(0);
  });

  it('clearing one line gives 40 points', () => {
    const board = new Board(null, null,
      `..........
       ..........
       ..........
       ..........
       ..........
       ZZZZ.ZZZZZ`
    );

    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.tick();
    }

    expect(board.getScore()).to.equal(40);
  });

  it('clearing two lines gives 100 points', () => {
    const board = new Board(null, null,
      `..........
       ..........
       ..........
       ..........
       ..........
       ZZZZ.ZZZZZ
       Z.ZZ.ZZ.ZZ
       ZZZZ.ZZZZZ`
    );

    board.drop(Tetromino.I_SHAPE);
    board.rotateClockwise();
    board.moveLeft();
    for (let i = 0; i < 10; i++) {
      board.tick();
    }

    expect(board.getScore()).to.equal(100);
  });


});
