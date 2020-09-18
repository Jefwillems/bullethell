import { IGameObject } from "./IGameObject";

import type p5 from "p5";

export interface IEnemy extends IGameObject {
  intersects(sketch: p5, obj: IGameObject): boolean;
}
