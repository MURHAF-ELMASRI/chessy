import { Color } from "src/types/Color";
import { Move } from "src/types/Move";

export interface RequestPlay {
  msg: "request-play";
  opponentUID: string;
  playerColor: Color;
}
