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
    const reversed = [...this.shape].reverse();
    const rotated = reversed[0].map((_, idx) =>(reversed.map(row => row[idx])));
    const parsed = rotated.map(it => it.join('')).join('\n');
    return new RotatingShape(parsed);
  }

  rotateLeft() {
    const rotated =  this.shape[0].map((_, idx) =>(this.shape.map(row => row[idx])));
    const reversed = rotated.reverse();
    const parsed = reversed.map(it => it.join('')).join('\n');
    return new RotatingShape(parsed);
  }

}