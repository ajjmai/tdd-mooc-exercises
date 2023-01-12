import { Board } from "../src/Board.mjs";

export const presetBoard = (level, board) => new Board(null, null, board, level);

export const fallToBottom = (board) => {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}