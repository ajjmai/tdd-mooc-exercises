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

  rotate(shape) {
    return shape[0].map((_, idx) =>(shape.map(row => row[idx])))
  }

  rotateRight() {
    const reversed = [...this.shape].reverse();
    const rotated = this.rotate(reversed);
    return new RotatingShape(this.toShapeString(rotated));
  }

  rotateLeft() {
    const rotated =  this.rotate(this.shape);
    const reversed = rotated.reverse();
    return new RotatingShape(this.toShapeString(reversed));
  }

}