import {
  ACCEPT_PLAY,
  CANCEL,
  CLOSE,
  MOVE,
  REJECT_PLAY,
  REQUEST_PLAY,
} from "../constant/controller";

import {
  requestPlayHandler,
  cancelHandler,
  rejectPlayHandler,
  moveHandler,
  closeHandler,
  acceptPlayHandler,
} from "./handlers";

export const controller = (control: string) => {
  switch (control) {
    case REQUEST_PLAY:
      return requestPlayHandler;

    case CANCEL:
      return cancelHandler;

    case REJECT_PLAY:
      return rejectPlayHandler;

    case MOVE:
      return moveHandler;

    case CLOSE:
      return closeHandler;
    case ACCEPT_PLAY:
      return acceptPlayHandler;
  }
};
