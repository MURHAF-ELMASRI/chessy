import ExtendedSocket from "../../@types/ExtendedSocket";
import isObject from "../../util/isObject";

interface params {
  socket: ExtendedSocket;
  color: boolean;
}

export default function ({ socket, color }: params) {
  if (isObject(socket.opponent)) {
    if (typeof socket.opponent.opponent !== socket.uid)
      throw new Error("Opponent has disconnected session");
    socket.send({ msg: "set-play", color });
    socket.opponent.opponent = socket;
    socket.opponent.send(JSON.stringify({ msg: "accept-play", color }));
  }
}
