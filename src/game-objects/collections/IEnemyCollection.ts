import type p5 from "p5";
import { IEnemy } from "../IEnemy";

export interface IEnemyCollection {
  enemies: IEnemy[];
  isEnded: boolean;

  update(sketch: p5): void;
  draw(sketch: p5): void;
}
