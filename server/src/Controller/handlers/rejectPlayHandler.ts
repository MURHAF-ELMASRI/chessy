import ExtendedSocket from "src/@types/ExtendedSocket";
import isObject from "../../util/isObject";

export default function rejectPlayHandler({
  socket,
}: {
  socket: ExtendedSocket;
}) {
  if (isObject(socket.opponent)) {
    socket.opponent.send(
      JSON.stringify({ msg: "reject-play", displayName: socket.displayName })
    );
    socket.opponent.opponent = undefined;
  }
  socket.opponent = undefined;
}
