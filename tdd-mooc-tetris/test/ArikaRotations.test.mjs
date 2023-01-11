import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from '../src/Tetromino.mjs';

describe("Arika rotations", () => {

  let board;
  beforeEach(() => {
    board = new Board(10, 4);
  });

  describe('The T shape', () => {
    it("starts with first shape", () => {
      board.drop(Tetromino.T_SHAPE);

      expect(board.toString()).to.equalShape(
        `...TTT....
         ....T.....
         ..........
         ..........`
      );

    });

    it("can be rotated clockwise", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateClockwise();

      expect(board.toString()).to.equalShape(
        `....T.....
         ...TT.....
         ....T.....
         ..........`
      );

    });

    it("can be rotated counter-clockwise", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateCounterClockwise();

      expect(board.toString()).to.equalShape(
        `....T.....
         ....TT....
         ....T.....
         ..........`
      );
    });

    it("loops around clockwise", () => {
      board.drop(Tetromino.T_SHAPE);
      for (let i = 0; i < 4; i++) {
        board.rotateClockwise();
      }

      expect(board.toString()).to.equalShape(
        `..........
         ...TTT....
         ....T.....
         ..........`
      );
    });

    it("loops around counter-clockwise", () => {
      board.drop(Tetromino.T_SHAPE);
      for (let i = 0; i < 4; i++) {
        board.rotateCounterClockwise();
      }

      expect(board.toString()).to.equalShape(
        `..........
         ...TTT....
         ....T.....
         ..........`
      );
    });

  })

  describe('The I shape', () => {
    it("starts with first shape", () => {
      board.drop(Tetromino.I_SHAPE);

      expect(board.toString()).to.equalShape(
        `...IIII...
         ..........
         ..........
         ..........`
      );

    });

    it("can be rotated clockwise", () => {
      board.drop(Tetromino.I_SHAPE);
      board.rotateClockwise();

      expect(board.toString()).to.equalShape(
        `.....I....
         .....I....
         .....I....
         .....I....`
      );

    });

    it("can be rotated counter-clockwise", () => {
      board.drop(Tetromino.I_SHAPE);
      board.rotateCounterClockwise();

      expect(board.toString()).to.equalShape(
        `.....I....
         .....I....
         .....I....
         .....I....`
      );
    });

    it("loops around clockwise", () => {
      board.drop(Tetromino.I_SHAPE);
      for (let i = 0; i < 4; i++) {
        board.rotateClockwise();
      }

      expect(board.toString()).to.equalShape(
        `..........
         ...IIII...
         ..........
         ..........`
      );
    });

    it("loops around counter-clockwise", () => {
      board.drop(Tetromino.I_SHAPE);
      for (let i = 0; i < 4; i++) {
        board.rotateCounterClockwise();
      }

      expect(board.toString()).to.equalShape(
        `..........
         ...IIII...
         ..........
         ..........`
      );
    });

  })

})