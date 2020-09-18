interface Vector {
  x: number;
  y: number;
}

const substract = (a: Vector, b: Vector): Vector => {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
};

const add = (a: Vector, b: Vector): Vector => {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
};

const length = (a: Vector): number => {
  return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
};

const normalize = (a: Vector): Vector => {
  return {
    x: a.x / length(a),
    y: a.y / length(a),
  };
};

const distance = (a: Vector, b: Vector): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};

const multiply = (a: Vector, mult: number): Vector => {
  return {
    x: a.x * mult,
    y: a.y * mult,
  };
};

export class Trajectory {
  ended: boolean;
  position: Vector;
  distanceToDest: number;

  constructor(private source: Vector, private destination: Vector) {
    this.ended = false;
    this.position = source;
    this.distanceToDest = distance(this.source, this.destination);
  }

  step(speed: number) {
    const direction = normalize(substract(this.destination, this.source));

    if (!this.ended) {
      // object.Position += direction * speed * elapsed;
      this.position = add(this.position, multiply(direction, speed));
      if (distance(this.source, this.position) >= this.distanceToDest) {
        this.position = this.destination;
        this.ended = true;
      }
    }
  }
}
