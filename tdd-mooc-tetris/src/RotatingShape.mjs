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

  toShapeString(array) {
    return array.map(it => it.join('')).join('\n');
  }

  rotateRight() {
    const reversed = [...this.shape].reverse();
    const rotated = reversed[0].map((_, idx) =>(reversed.map(row => row[idx])));
    return new RotatingShape(this.toShapeString(rotated));
  }

  rotateLeft() {
    const rotated =  this.shape[0].map((_, idx) =>(this.shape.map(row => row[idx])));
    const reversed = rotated.reverse();
    return new RotatingShape(this.toShapeString(reversed));
  }

}