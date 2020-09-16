import type p5 from "p5";

export interface IUiElement {
  draw(sketch: p5): void;
}
