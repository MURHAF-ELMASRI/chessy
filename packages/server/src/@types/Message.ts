import {
  ACCEPT_PLAY,
  CANCEL,
  CLOSE,
  LOSE,
  MOVE,
  REJECT_PLAY,
  REQUEST_PLAY,
} from "@constant/controller";
import { Color } from "./Color";

type RequestPlayMessage = {
  msg: typeof REQUEST_PLAY;
  opponentUID: "string";
  playerColor: Color;
};

type CancelMessage = {
  msg: typeof CANCEL;
};

type RejectPlayMessage = {
  msg: typeof REJECT_PLAY;
};

type MoveMessage = {
  msg: typeof MOVE;
  move: {
    src: {
      i: number;
      j: number;
    };
    dest: {
      i: number;
      j: number;
    };
  };
};

type CloseMessage = {
  msg: typeof CLOSE;
};

type AcceptPlayMessage = {
  msg: typeof ACCEPT_PLAY;
};
type LoseMessage = {
  msg: typeof LOSE;
};

type Message =
  | RequestPlayMessage
  | CancelMessage
  | CloseMessage
  | AcceptPlayMessage
  | CancelMessage
  | MoveMessage
  | RejectPlayMessage
  | LoseMessage;

export default Message;
