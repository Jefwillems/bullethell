import { IScreen } from "./IScreen";
import type p5 from "p5";
import { Player } from "../game-objects/player";
import { IEnemyCollection } from "../game-objects/collections/IEnemyCollection";
import { BulletStorm } from "../game-objects/collections/storm";

export class PlayScreen extends IScreen {
  private player: Player;
  private enemyCollection: IEnemyCollection;

  constructor(sketch: p5) {
    super(sketch);

    this.enemyCollection = new BulletStorm(sketch);
    this.player = new Player(sketch);
  }

  draw(sketch: p5): void {
    sketch.push();

    this.enemyCollection.draw(sketch);
    if (this.enemyCollection.isEnded) {
      this.enemyCollection = new BulletStorm(sketch);
    }
    this.player.draw(sketch);
    this.uiElements.forEach((el) => el.draw(sketch));

    sketch.pop();
  }
}
