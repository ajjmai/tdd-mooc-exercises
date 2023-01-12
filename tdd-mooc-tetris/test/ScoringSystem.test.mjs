import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from '../src/Tetromino.mjs';

describe('Scoring system', () => {
  it('score is 0 at the beginning of game', () => {
    const board = new Board(10, 6);
    expect(board.getScore()).to.equal(0);
  })
});
