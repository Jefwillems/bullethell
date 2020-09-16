import type p5 from "p5";
import { Controller } from "./controller";
import { IGameObject } from "./IGameObject";

export class Player implements IGameObject {
  private x: number;
  private y: number;
  private size: number;
  private speed: number;
  private controller: Controller;

  constructor(sketch: p5) {
    this.x = sketch.windowWidth / 2;
    this.y = sketch.windowHeight / 2;
    this.size = 25;
    this.speed = 6;

    this.controller = new Controller(this.move.bind(this));
  }

  move(sketch: p5, { dX, dY }: { dX: number; dY: number }) {
    this.x += dX * this.speed;
    this.y += dY * this.speed;
    //? don't go out of bounds
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > sketch.width) {
      this.x = sketch.width;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > sketch.height) {
      this.y = sketch.height;
    }
  }

  update(sketch: p5): void {}

  draw(sketch: p5): void {
    this.update(sketch);
    sketch.push();
    sketch.stroke("#000");
    sketch.fill("#12F491");
    sketch.ellipseMode(sketch.CENTER);
    sketch.ellipse(this.x, this.y, this.size, this.size);
    sketch.pop();
    this.controller.draw(sketch);
  }
}
