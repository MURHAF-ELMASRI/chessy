import {
  ACCEPT_PLAY,
  CANCEL,
  CLOSE,
  MOVE,
  REJECT_PLAY,
  REQUEST_PLAY,
} from "@constant/controller";

type ControllerParams =
  | REQUEST_PLAY
  | CANCEL
  | REJECT_PLAY
  | MOVE
  | CLOSE
  | ACCEPT_PLAY;
