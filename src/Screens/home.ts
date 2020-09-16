import type p5 from "p5";
import { PlainBackground } from "../ui/Backgrounds/plain";
import { Button } from "../ui/Components/button";
import { IScreen } from "./IScreen";
import eventbus from "../util/eventbus";
import { ScreenFactory, SCREEN_TYPE } from "./ScreenFactory";

export class HomeScreen extends IScreen {
  constructor(sketch: p5) {
    super(sketch);
    this.background = new PlainBackground(sketch, "#f25112");

    this.uiElements.push(
      new Button(
        sketch.windowWidth / 2,
        sketch.windowHeight / 2,
        400,
        50,
        "Play Game",
        () => {
          eventbus.emit(
            "screenChange",
            ScreenFactory.getScreenFor(SCREEN_TYPE.PLAY)
          );
        }
      )
    );
  }

  draw(sketch: p5) {
    this.background.draw(sketch);
    this.uiElements.forEach((el: { draw: (arg0: any) => any }) =>
      el.draw(sketch)
    );
  }
}
