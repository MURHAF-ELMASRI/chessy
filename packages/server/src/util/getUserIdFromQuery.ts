import { Socket } from "socket.io/dist/socket";
export function getValueFromQuey(socket: Socket) {
  const query = socket.handshake.query;

  if (!query.userId) {
    return undefined;
  }
  if (Array.isArray(query.userId)) {
    return query.userId[0];
  }
  return query.userId;
}
