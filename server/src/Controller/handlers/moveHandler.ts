import { Move } from "src/@types/Move";
import { encodeMessage } from "src/util/encodeMessage";
import ExtendedSocket from "../../@types/ExtendedSocket";
import isObject from "../../util/isObject";

export default function moveHandler({
  socket,
  move,
}: {
  socket: ExtendedSocket;
  move: Move;
}) {
  if (isObject(socket.opponent))
    socket.opponent.send(encodeMessage({ msg: "move", move }));
}
