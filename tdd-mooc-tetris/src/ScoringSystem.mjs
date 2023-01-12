export class ScoringSystem {
  score;
  level;

  constructor(level = 0) {
    this.score = 0;
    this.level = level;
  }

  getScore() {
    return this.score;
  }

  add(rowsCleared) {
    switch (rowsCleared) {
      case 1:
        this.score += 40 * (this.level + 1);
        break;
      case 2:
        this.score += 100 * (this.level + 1);
        break;
      case 3:
        this.score += 300 * (this.level + 1);
        break;
      case 4:
        this.score += 1200 * (this.level + 1);
        break;
    }
  }
}