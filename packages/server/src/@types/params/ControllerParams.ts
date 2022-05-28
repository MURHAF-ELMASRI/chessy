import {
  ACCEPT_PLAY,
  CANCEL,
  CLOSE,
  MOVE,
  REJECT_PLAY,
  REQUEST_PLAY,
} from "@constant/controller";

export type ControllerParams =
  | typeof REQUEST_PLAY
  | typeof CANCEL
  | typeof REJECT_PLAY
  | typeof MOVE
  | typeof CLOSE
  | typeof ACCEPT_PLAY;
