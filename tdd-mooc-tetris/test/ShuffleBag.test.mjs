import { expect } from "chai";
import { RotatingShape } from "../src/RotatingShape.mjs";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

describe('Shuffling tetrominoes', () => {
  it('returns a random tetromino', () => {
    const bag = new ShuffleBag();
    expect(bag.next()).to.be.instanceOf(RotatingShape);
  });

  it('returns seven different tetrominoes', () => {
    const bag = new ShuffleBag();
    const tetrominoes = new Set();

    for (let i = 0; i < bag.size(); i++) {
      tetrominoes.add(bag.next());
    }

    expect(tetrominoes.size).to.equal(7);
  })
});
