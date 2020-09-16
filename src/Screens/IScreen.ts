import type p5 from "p5";
import { IBackground } from "../ui/Backgrounds/IBackground";
import { IUiElement } from "../ui/Components/IUiElement";

export abstract class IScreen {
  protected background: IBackground;
  protected uiElements: IUiElement[] = [];

  constructor(sketch: p5) {}

  abstract draw(sketch: p5): void;
}
