import { ExtendedSocket } from "../../@types/ExtendedSocket";
import isObject from "../../util/isObject";

export default function ({
  socket,
  color,
}: {
  socket: ExtendedSocket;
  color: boolean;
}) {
  if (
    isObject(socket.opponent) &&
    typeof socket.opponent.opponent === "string"
  ) {
    socket.opponent.opponent = socket;
    socket.opponent.send(JSON.stringify({ msg: "accept-play", color }));
  }
}
