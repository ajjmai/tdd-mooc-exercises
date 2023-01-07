import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  const allPossibleValues = [2, 3, 4, 5, 6, 101, 102, 103, 104, 105, 106]
  it("yields one of the possible values on one roll", () => {
    expect(diceHandValue()).to.be.oneOf(allPossibleValues);
  });

  it("yields all possible single die values on 100 rolls", () => {
    const results = []
    for (let i = 0; i < 100; i++) {
      results.push(diceHandValue())
    }

    expect(results).not.to.include(1);
    expect(results).to.include(2);
    expect(results).to.include(3);
    expect(results).to.include(4);
    expect(results).to.include(5);
    expect(results).to.include(6);

  });

  it("yields at least some of pair values on 100 rolls", () => {
    const pairValues = [101, 102, 103, 104, 105, 106]
    const results = []
    for (let i = 0; i < 100; i++) {
      results.push(diceHandValue())
    }
    expect(results).to.contain.oneOf(pairValues);
  });

});