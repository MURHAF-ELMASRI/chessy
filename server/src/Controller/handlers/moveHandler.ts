import ExtendedSocket from "../../@types/ExtendedSocket";
import isObject from "../../util/isObject";

export default function moveHandler({
  socket,
  move,
}: {
  socket: ExtendedSocket;
  move: string;
}) {
  if (isObject(socket.opponent))
    socket.opponent.send(JSON.stringify({ msg: "move", move: move }));
}
