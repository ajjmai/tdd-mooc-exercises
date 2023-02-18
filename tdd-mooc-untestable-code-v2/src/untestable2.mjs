// When testing randomness, one cannot assert exact values.
// Also random values may randomly be in a predictable order, so test asserting the order to not to be something will fail occasionally.
// I don't know how this function could be refactored to be more easily testable since
// seed cannot be provided to Math.random(), but this can be tested ok.

function diceRoll() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function diceHandValue() {
  const die1 = diceRoll();
  const die2 = diceRoll();
  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}
