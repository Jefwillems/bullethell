import { IBackground } from "./IBackground";
import type p5 from "p5";

export class PlainBackground implements IBackground {
  private color: string;
  constructor(sketch: p5, color: string) {
    this.color = color;
  }

  draw(sketch: p5) {
    sketch.push();
    sketch.background(this.color);
    sketch.pop();
  }
}
