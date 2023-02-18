import { expect } from "chai";
import { daysUntilChristmasRefactored } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  it("is 0 days from 25.12.", () => {
    const fromDate = new Date(Date.UTC(2023, 11, 25));
    expect(daysUntilChristmasRefactored(fromDate)).to.equal(0);
  });

  it("is 1 day from 24.12.", () => {
    const fromDate = new Date(Date.UTC(2023, 11, 24));
    expect(daysUntilChristmasRefactored(fromDate)).to.equal(1);
  });

  it("is 358 days from 1.1.", () => {
    const fromDate = new Date(Date.UTC(2023, 0, 1));
    expect(daysUntilChristmasRefactored(fromDate)).to.equal(358);
  });

  it("is 364 days from 26.12.", () => {
    const fromDate = new Date(Date.UTC(2022, 11, 26));
    expect(daysUntilChristmasRefactored(fromDate)).to.equal(364);
  });
});
