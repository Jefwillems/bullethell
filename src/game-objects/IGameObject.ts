import type p5 from "p5";

export interface IGameObject {
  x: number;
  y: number;
  size: number;
  update(sketch: p5): void;
  draw(sketch: p5): void;
}
