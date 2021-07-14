import { Move } from "src/types/Move";

export interface MoveMessage {
  msg: "move";
  move: Move;
}
