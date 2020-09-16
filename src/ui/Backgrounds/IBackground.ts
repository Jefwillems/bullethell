import type p5 from "p5";

export interface IBackground {
  draw(sketch: p5): void;
}
