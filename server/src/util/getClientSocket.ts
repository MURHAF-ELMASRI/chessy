import { ExtendedSocket } from "../@types/ExtendedSocket";

export function getClientSocket(
  clients: Set<ExtendedSocket>,
  socket: ExtendedSocket
) {
  for (const item of clients.values()) {
    if (item.opponent === socket.uid) return socket;
  }
}
