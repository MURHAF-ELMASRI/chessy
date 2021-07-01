import { ExtendedClient, ExtendedSocket } from "src/@types";
import ExtendedClients from "src/@types/ExtendedClient";
import Message from "src/@types/Message";
import { ControllerParams } from "src/@types/params/ControllerParams";
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
        color: msg.color,
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
      return acceptPlayHandler({ socket, color: msg.color });
  }
};
