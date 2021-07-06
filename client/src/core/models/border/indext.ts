import { Color } from "@type/Color";
import initializeBord from "./initializeBord";
enum squareState {
  outOfRange,
  empty,
  friend,
  opponent,
}

class bord {
  readonly board;

  constructor() {
    this.board = initializeBord();
  }
}

export default bord;
