import type p5 from "p5";

export class Bullet {
  x: number;
  y: number;
  speed: number;

  constructor(sketch: p5) {
    this.x = Math.random() * sketch.width;
    this.y = Math.random() * sketch.height;
    this.speed = 3;
  }

  update(sketch: p5) {
    this.y -= this.speed;
    if (this.y < 0) this.y = sketch.height;
  }

  draw(sketch: p5) {
    sketch.push();
    sketch.ellipseMode(sketch.CENTER);
    sketch.stroke(51);
    sketch.ellipse(this.x, this.y, 25, 25);
    sketch.pop();
  }
}
