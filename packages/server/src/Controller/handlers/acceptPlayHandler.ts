import { color } from "../../constant/color";
import { Color } from "src/@types/Color";
import ExtendedSocket from "src/@types/ExtendedSocket";
import isObject from "../../util/isObject";

interface params {
  socket: ExtendedSocket;
}

export default function ({ socket }: params) {
  if (!isObject(socket.opponent)) throw new Error("Wrong request");

  if (socket.opponent.opponent !== socket.uid)
    throw new Error("Opponent has disconnected session");
  socket.send(
    JSON.stringify({
      msg: "set-play",
      color:
        socket.opponent.playerColor === color.white ? color.black : color.white,
    })
  );
  socket.opponent.opponent = socket;
  socket.opponent.send(
    JSON.stringify({
      msg: "set-play",
      color:
        socket.opponent.playerColor 
    })
  );
}
