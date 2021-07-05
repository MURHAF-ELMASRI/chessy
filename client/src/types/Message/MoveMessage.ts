import { Move } from "@type/Move";

export interface MoveMessage {
  msg: "move";
  move: Move;
}
