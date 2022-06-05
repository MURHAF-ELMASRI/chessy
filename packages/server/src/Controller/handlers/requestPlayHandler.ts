import {
  ClientEvents,
  RequestPlayPayload,
} from "packages/common/types/message";
import { ServerEvents } from "packages/common/types/ServerEvent";
import { Socket } from "socket.io";
import { CONNECTED_USERS } from "../../config/configuration";
import send from "../../send";

export default function requestPlayHandler(payload: RequestPlayPayload) {
  // @ts-ignore
  const socket: Socket<ClientEvents, ServerEvents> = this;
  const oppUser = CONNECTED_USERS.get(payload.oppId);
  if (!oppUser) {
    send(socket, { type: "disconnected", payload: { oppId: payload.oppId } });
    return;
  }

  send(oppUser.socket, {
    type: "requestPlay",
    payload: { _id: socket.id, color: payload.color },
  });
}
