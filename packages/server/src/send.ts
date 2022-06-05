import { ServerEventPayloadMap } from "@chessy/common/types/ServerEvent";
import { Socket } from "socket.io";

export default function send<E extends keyof ServerEventPayloadMap>(
  socket: Socket,
  message: E,
  ...payload: ServerEventPayloadMap[E]
) {
  //@ts-ignore
  socket.emit(message, payload);
}
