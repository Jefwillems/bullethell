import eventbus from "../../util/eventbus";
import { IUiElement } from "./IUiElement";
import type p5 from "p5";
import { Text } from "./text";

export class Button implements IUiElement {
  x: number;
  y: number;
  width: number;
  height: number;
  text: Text;
  callback: Function;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    callback: Function
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = new Text(text, this.x, this.y);

    this.callback = callback;

    eventbus.addEventListener("windowResized", (sketch: p5) => {
      this.x = sketch.windowWidth / 2;
      this.y = sketch.windowHeight / 2;
      this.text.x = this.x;
      this.text.y = this.y;
    });
    eventbus.addEventListener("mouseClicked", ({ mouseX, mouseY }) =>
      this.checkClick(mouseX, mouseY)
    );
  }

  get topEdge() {
    return this.y - this.height / 2;
  }

  get bottomEdge() {
    return this.y + this.height / 2;
  }

  get rightEdge() {
    return this.x + this.width / 2;
  }

  get leftEdge() {
    return this.x - this.width / 2;
  }

  checkClick(xPos: number, yPos: number) {
    if (
      xPos < this.rightEdge &&
      xPos > this.leftEdge &&
      yPos > this.topEdge &&
      yPos < this.bottomEdge
    ) {
      this.callback();
    }
  }

  draw(sketch: p5) {
    sketch.push();
    sketch.rectMode(sketch.CENTER);
    sketch.rect(this.x, this.y, this.width, this.height);
    this.text.draw(sketch);
    sketch.pop();
  }
}
