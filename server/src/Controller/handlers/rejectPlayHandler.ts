import { ExtendedSocket } from "../../@types/ExtendedSocket";
import isObject from "../../util/isObject";

export default function rejectPlayHandler({
  socket,
}: {
  socket: ExtendedSocket;
}) {
  if (isObject(socket.opponent) && isObject(socket.opponent.opponent)) {
    socket.opponent.send(
      JSON.stringify({ msg: "reject-play", name: socket.name })
    );
    socket.opponent.opponent = "";
  }
  socket.opponent = "";
}
