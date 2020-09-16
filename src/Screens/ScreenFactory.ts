import { HomeScreen } from "./home";
import { IScreen } from "./IScreen";
import { PlayScreen } from "./play";

export enum SCREEN_TYPE {
  HOME,
  PLAY,
}
export class ScreenFactory {
  static getScreenFor(screenType: SCREEN_TYPE): typeof IScreen {
    switch (screenType) {
      case SCREEN_TYPE.HOME:
        return HomeScreen;
      case SCREEN_TYPE.PLAY:
        return PlayScreen;
    }
  }
}
