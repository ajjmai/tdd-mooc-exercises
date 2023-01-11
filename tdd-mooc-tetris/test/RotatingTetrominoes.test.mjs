
import { expect } from "chai";
import { RotatingShape } from "../src/RotatingShape.mjs";

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateClockwise();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateCounterClockwise();
  }
  return distinct;
}

describe("The T shape", () => {
  const shape = new RotatingShape(
    `.T.
     TTT
     ...`
  );

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.T.
       TTT
       ...`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateClockwise().toString()).to.equalShape(
      `.T.
       .TT
       .T.`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateCounterClockwise().toString()).to.equalShape(
      `.T.
       TT.
       .T.`
    );
  });

  it("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});

describe("The I shape", () => {
  const shape = new RotatingShape(
    `.....
     .....
     IIII.
     .....
     .....`, 2
  );

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.....
       .....
       IIII.
       .....
       .....`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateClockwise().toString()).to.equalShape(
      `..I..
       ..I..
       ..I..
       ..I..
       .....`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateCounterClockwise().toString()).to.equalShape(
      `..I..
       ..I..
       ..I..
       ..I..
       .....`
    );
  });

  it("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});



describe("The O shape", () => {
  const shape = new RotatingShape(
    `.OO
     .OO
     ...`, 1
  );

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("cannot be rotated right/clockwise", () => {
    expect(shape.rotateClockwise().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateCounterClockwise().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});
