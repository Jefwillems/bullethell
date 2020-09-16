import p5 from "p5";
import Game from "./game";
import eventbus from "./util/eventbus";
/**
 *
 *
 * @param {Game} game
 */
const s = (game: Game) => (sketch: p5) => {
  sketch.setup = () => {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    game.initialize(sketch);
  };
  sketch.draw = () => {
    game.draw(sketch);
  };
  sketch.windowResized = () => {
    eventbus.emit("windowResized", sketch);
  };
  sketch.mouseClicked = () => (eventbus.emit("mouseClicked", sketch), false);

  sketch.touchStarted = () => (eventbus.emit("touchStarted", sketch), false);

  sketch.touchMoved = () => (eventbus.emit("touchMoved", sketch), false);

  sketch.touchEnded = () => (eventbus.emit("touchEnded", sketch), false);
};

const instance = new p5(s(new Game()), document.getElementById("p5sketch"));
