import { AcceptPlayMessage } from "./AcceptPlayMessage";
import { MoveMessage } from "./MoveMessage";
import { RejectMessage } from "./RejectMessage";
import { RequestPlay } from "./RequestPlay";

export type Message =
  | AcceptPlayMessage
  | MoveMessage
  | RejectMessage
  | RequestPlay;
