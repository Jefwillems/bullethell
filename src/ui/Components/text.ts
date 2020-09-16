import { IUiElement } from "./IUiElement";

import type p5 from "p5";

export class Text implements IUiElement {
  text: string;
  x: number;
  y: number;

  constructor(text: string, x: number, y: number) {
    this.text = text;
    this.x = x;
    this.y = y;
  }

  draw(sketch: p5): void {
    sketch.push();
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.text(this.text, this.x, this.y);
    sketch.pop();
  }
}
