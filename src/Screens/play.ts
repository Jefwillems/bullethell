import { IScreen } from "./IScreen";
import type p5 from "p5";
import { Button } from "../ui/Components/button";
import { Player } from "../game-objects/player";

export class PlayScreen extends IScreen {
  private player: Player;

  constructor(sketch: p5) {
    super(sketch);

    this.player = new Player(sketch);
  }

  draw(sketch: p5): void {
    sketch.push();

    this.player.draw(sketch);
    this.uiElements.forEach((el) => el.draw(sketch));

    sketch.pop();
  }
}
