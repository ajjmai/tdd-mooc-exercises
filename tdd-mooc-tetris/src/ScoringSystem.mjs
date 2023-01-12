export class ScoringSystem {
  score;

  constructor() {
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  add(rowsCleared) {
    switch (rowsCleared) {
      case 1:
        this.score += 40;
        break;

      default:
        break;
    }
  }

}