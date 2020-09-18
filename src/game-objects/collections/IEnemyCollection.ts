import type p5 from "p5";
import { IEnemy } from "../IEnemy";
import { IGameObject } from "../IGameObject";

export interface IEnemyCollection {
  enemies: IEnemy[];
  isEnded: boolean;

  intersects(sketch: p5, obj: IGameObject): boolean;
  update(sketch: p5): void;
  draw(sketch: p5): void;
}
