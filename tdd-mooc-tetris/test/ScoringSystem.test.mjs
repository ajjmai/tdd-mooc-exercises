import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from '../src/Tetromino.mjs';
import { presetBoard, fallToBottom } from './testUtils.mjs';

describe('Scoring system', () => {
  it('score is 0 at the beginning of game', () => {
    const board = new Board(10, 6);
    expect(board.getScore()).to.equal(0);
  });

  describe('Level 0', () => {
    it('clearing one line gives 40 points', () => {
      const board = presetBoard(null,
        `..........
       ..........
       ..........
       ..........
       ..........
       ZZZZ.ZZZZZ`
      );

      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board);

      expect(board.getScore()).to.equal(40);
    });

    it('clearing two lines gives 100 points', () => {
      const board = presetBoard(null,
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
      fallToBottom(board);

      expect(board.getScore()).to.equal(100);
    });

    it('clearing three lines gives 300 points', () => {
      const board = presetBoard(null,
        `..........
       ..........
       ..........
       ..........
       ZZZZ.ZZZZZ
       ZZZZ.ZZZZZ
       Z.ZZ.ZZ.ZZ
       ZZZZ.ZZZZZ`
      );

      board.drop(Tetromino.I_SHAPE);
      board.rotateClockwise();
      board.moveLeft();
      fallToBottom(board);

      expect(board.getScore()).to.equal(300);
    });

    it('clearing four lines gives 1200 points', () => {
      const board = presetBoard(null,
        `..........
       ..........
       ..........
       ..........
       ZZZZ.ZZZZZ
       ZZZZ.ZZZZZ
       ZZZZ.ZZZZZ
       ZZZZ.ZZZZZ`
      );

      board.drop(Tetromino.I_SHAPE);
      board.rotateClockwise();
      board.moveLeft();
      fallToBottom(board);

      expect(board.getScore()).to.equal(1200);
    });
  });

  describe('other levels', () => {
    it('clearing one line on level 1 gives 80 points', () => {
      const board = presetBoard(1,
        `..........
       ..........
       ..........
       ..........
       ..........
       ZZZZ.ZZZZZ`
      );

      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board);

      expect(board.getScore()).to.equal(80);
    });

    it('clearing two lines on level 2 gives 300 points', () => {
      const board = presetBoard(2,
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
      fallToBottom(board);

      expect(board.getScore()).to.equal(300);
    });

    it('clearing three lines on level 5 gives 1800 points', () => {
      const board = presetBoard(5,
        `..........
       ..........
       ..........
       ..........
       ZZZZ.ZZZZZ
       ZZZZ.ZZZZZ
       Z.ZZ.ZZ.ZZ
       ZZZZ.ZZZZZ`
      );

      board.drop(Tetromino.I_SHAPE);
      board.rotateClockwise();
      board.moveLeft();
      fallToBottom(board);

      expect(board.getScore()).to.equal(1800);
    });

    it('clearing four lines on level 9 gives 12000 points', () => {
      const board = presetBoard(9,
        `..........
       ..........
       ..........
       ..........
       ZZZZ.ZZZZZ
       ZZZZ.ZZZZZ
       ZZZZ.ZZZZZ
       ZZZZ.ZZZZZ`
      );

      board.drop(Tetromino.I_SHAPE);
      board.rotateClockwise();
      board.moveLeft();
      fallToBottom(board);

      expect(board.getScore()).to.equal(12000);
    });
  });
});
