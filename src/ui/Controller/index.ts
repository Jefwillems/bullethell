import { IGameObject } from "../../game-objects/IGameObject";
import type p5 from "p5";
import eventbus from "../../util/eventbus";

interface Pointer {
  x: number;
  y: number;
  size: number;
}

interface ControllerPosition {
  x: number;
  y: number;
  featherDiameter: number;
  pointer: Pointer;
}

export class Controller {
  private position: ControllerPosition;
  private valueToSend: { dX: number; dY: number };
  private updateHandler: (
    sketch: p5,
    deltas: { dX: number; dY: number }
  ) => void;

  constructor(
    onUpdate: (sketch: p5, deltas: { dX: number; dY: number }) => void
  ) {
    this.position = {
      x: 0,
      y: 0,
      featherDiameter: 150,
      pointer: {
        x: 0,
        y: 0,
        size: 25,
      },
    };
    this.updateHandler = onUpdate;

    eventbus.addEventListener("touchStarted", (sketch: p5) => {
      this.position.x = sketch.mouseX;
      this.position.y = sketch.mouseY;
      this.position.pointer.x = sketch.mouseX;
      this.position.pointer.y = sketch.mouseY;
    });
    eventbus.addEventListener("touchMoved", (sketch: p5) => {
      //? x^2 + y^2 – r^2 <= 0 === 'inside'

      //? distance on axis
      const dX = sketch.mouseX - this.position.x;
      const dY = sketch.mouseY - this.position.y;

      //? x^2 + y^2 - r^2 < 0 === (x,y) is inside circle
      const inside =
        sketch.sq(dX) +
        sketch.sq(dY) -
        sketch.sq(this.position.featherDiameter / 2);

      if (inside <= 0) {
        this.position.pointer.x = sketch.mouseX;
        this.position.pointer.y = sketch.mouseY;
      } else {
        //? calculate angle between 2 points and a horizontal line
        const angle = sketch.atan2(dX, dY);
        //? position the pointer on the edge of the controller position
        this.position.pointer.x =
          (this.position.featherDiameter / 2) * sketch.sin(angle) +
          this.position.x;
        this.position.pointer.y =
          (this.position.featherDiameter / 2) * sketch.cos(angle) +
          this.position.y;
      }

      const normalizedDx = this.position.pointer.x - this.position.x;
      const normalizedDy = this.position.pointer.y - this.position.y;

      this.valueToSend = {
        dX: normalizedDx / (this.position.featherDiameter / 2),
        dY: normalizedDy / (this.position.featherDiameter / 2),
      };
    });
    eventbus.addEventListener("touchEnded", (sketch: p5) => {
      this.position.x = 0;
      this.position.y = 0;
      this.valueToSend = null;
    });
  }

  update(sketch: p5): void {
    if (this.valueToSend) {
      this.updateHandler(sketch, this.valueToSend);
    }
  }
  draw(sketch: p5): void {
    if (sketch.mouseIsPressed) {
      this.update(sketch);
      sketch.push();
      sketch.stroke("#000044");
      sketch.fill("#0000EE");
      sketch.ellipseMode(sketch.CENTER);
      sketch.ellipse(
        this.position.pointer.x,
        this.position.pointer.y,
        this.position.pointer.size
      );
      sketch.noFill();
      sketch.ellipse(
        this.position.x,
        this.position.y,
        this.position.featherDiameter
      );
      sketch.pop();
    }
  }
}
