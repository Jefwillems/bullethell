import type p5 from "p5";
import { Trajectory } from "../util/trajectory";
import { IEnemy } from "./IEnemy";
import { IGameObject } from "./IGameObject";

export class Bullet implements IEnemy {
  size: number;
  speed: number;
  trajectory: Trajectory;

  constructor(size: number, speed: number, trajectory: Trajectory) {
    this.size = size;
    this.speed = speed;
    this.trajectory = trajectory;
  }

  get x() {
    return this.trajectory.position.x;
  }

  get y() {
    return this.trajectory.position.y;
  }

  intersects(sketch: p5, obj: IGameObject): boolean {
    const dx = obj.x - this.x;
    const dy = obj.y - this.y;
    return (
      sketch.sqrt(sketch.sq(dx) + sketch.sq(dy)) < this.size / 2 + obj.size / 2
    );
  }

  update(sketch: p5): void {
    this.trajectory.step(this.speed);
  }
  draw(sketch: p5): void {
    this.update(sketch);
    sketch.push();

    sketch.fill("#126F99");
    sketch.stroke("#333");
    sketch.ellipseMode(sketch.CENTER);
    sketch.ellipse(this.x, this.y, this.size);

    sketch.pop();
  }
}
