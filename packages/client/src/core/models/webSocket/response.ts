import { ServerEventPayloadMap } from "@chessy/common/types/ServerEvent";
import { Socket } from "socket.io-client";

export default function response<E extends keyof ServerEventPayloadMap>(
  socket: Socket,
  msg: E,
  handler: (...payload: ServerEventPayloadMap[E]) => void
) {
  socket.emit(msg, handler);
}
