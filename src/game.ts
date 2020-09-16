import eventbus from "./util/eventbus";
import { HomeScreen } from "./Screens/home";
import type p5 from "p5";
import { IScreen } from "./Screens/IScreen";

export default class Game {
  private currentScreen: IScreen;
  /**
   *
   * populate class variables with drawables, uses sketch for positioning
   * @param {p5} sketch
   * @memberof Game
   */
  initialize(sketch: p5) {
    this.currentScreen = new HomeScreen(sketch);
    eventbus.addEventListener(
      "screenChange",
      <T extends new (sketch: p5) => IScreen>(Screen: T) => {
        this.currentScreen = new Screen(sketch);
      }
    );
  }

  draw(sketch: p5) {
    sketch.clear();
    this.currentScreen.draw(sketch);
  }
}
