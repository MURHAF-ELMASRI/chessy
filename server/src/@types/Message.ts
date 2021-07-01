import { Color } from "@constant/color";
import {
  ACCEPT_PLAY,
  CANCEL,
  CLOSE,
  MOVE,
  REJECT_PLAY,
  REQUEST_PLAY,
} from "@constant/controller";
import { Move } from "./Move";
import { ControllerParams } from "./params/ControllerParams";

type RequestPlayMessage = {
  msg: typeof REQUEST_PLAY;
  opponentUID: "string";
  color: boolean;
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
  color: boolean;
};

type Message =
  | RequestPlayMessage
  | CancelMessage
  | CloseMessage
  | AcceptPlayMessage
  | CancelMessage
  | MoveMessage
  | RejectPlayMessage;

export default Message;
