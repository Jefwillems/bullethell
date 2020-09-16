import type p5 from "p5";

export interface IGameObject {
  update(sketch: p5): void;
  draw(sketch: p5): void;
}
