export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape.split('\n').map(it => it.trim().split(''));
  }

  toString() {
    let string = "";
    for (let row = 0; row < this.shape.length; row++) {
      string += this.shape[row].join('');
      string += '\n';
    }
    return string;
  }

  rotateRight() {
    const reversed = this.shape.reverse();
    this.shape = reversed[0].map((col, idx) =>(reversed.map(row => row[idx])));
    return this;
  }

}