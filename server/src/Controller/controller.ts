import { ExtendedSocket, ExtendedClients } from "src/@types";
import Message from "src/@types/Message";
import { ControllerParams } from "src/@types/params/ControllerParams";
import {
  ACCEPT_PLAY,
  CANCEL,
  CLOSE,
  MOVE,
  REJECT_PLAY,
  REQUEST_PLAY,
  LOSE,
} from "../constant/controller";

import {
  requestPlayHandler,
  cancelHandler,
  rejectPlayHandler,
  moveHandler,
  closeHandler,
  acceptPlayHandler,
  setLoserHandler,
} from "./handlers";

export const controller = (
  msg: Message,
  socket: ExtendedSocket,
  clients: ExtendedClients
) => {
  switch (msg.msg) {
    case REQUEST_PLAY:
      return requestPlayHandler({
        clients,
        socket,
        opponentUID: msg.opponentUID,
        playerColor: msg.playerColor,
      });
    case CANCEL:
      return cancelHandler({ socket });

    case REJECT_PLAY:
      return rejectPlayHandler({ socket });

    case MOVE:
      return moveHandler({ socket, move: msg.move });

    case CLOSE:
      return closeHandler({ socket });
    case ACCEPT_PLAY:
      return acceptPlayHandler({ socket });
    case LOSE:
      return setLoserHandler({ socket });
  }
};
