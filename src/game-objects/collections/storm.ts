import type p5 from "p5";
import { Trajectory } from "../../util/trajectory";
import { Bullet } from "../bullet";
import { IEnemy } from "../IEnemy";
import { IGameObject } from "../IGameObject";
import { IEnemyCollection } from "./IEnemyCollection";

export class BulletStorm implements IEnemyCollection {
  enemies: Bullet[];

  constructor(sketch: p5) {
    this.enemies = [];

    for (let i = 0; i < 2; i++) {
      const x = i * sketch.width;
      const desX = i === 0 ? sketch.width : 0;
      for (let j = 0; j < 10; j++) {
        const y = (sketch.height / 10) * j;
        const source = { x, y };
        const destination = { x: desX, y: Math.random() * sketch.height };
        const speed = Math.random() * 2 + 5;
        this.enemies.push(
          new Bullet(25, speed, new Trajectory(source, destination))
        );
      }
    }
  }
  intersects(sketch: p5, obj: IGameObject): boolean {
    return this.enemies.findIndex((e) => e.intersects(sketch, obj)) >= 1;
  }

  get isEnded(): boolean {
    const stillRunning =
      this.enemies.findIndex((e: Bullet) => !e.trajectory.ended) >= 0;
    return !stillRunning;
  }

  update(sketch: p5): void {
    throw new Error("Method not implemented.");
  }
  draw(sketch: p5): void {
    this.enemies.forEach((e: Bullet) => {
      if (!e.trajectory.ended) {
        sketch.line(
          e.x,
          e.y,
          e.trajectory.destination.x,
          e.trajectory.destination.y
        );
      }
    });
    this.enemies.forEach((e) => {
      e.draw(sketch);
    });
  }
}
