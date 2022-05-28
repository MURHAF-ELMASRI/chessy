import { getClientSocket } from "../../util/getClientSocket";
import RequestPlayParams from "src/@types/params/RequestPlayParams";
import isObject from "../../util/isObject";
export default function requestPlayHandler({
  socket,
  clients,
  opponentUID,
  playerColor,
}: RequestPlayParams) {
  if (isObject(socket.opponent))
    throw new Error(`${socket.opponent.displayName} is busy`);

  const oppSocket = getClientSocket(clients, opponentUID);

  if (!oppSocket) {
    throw new Error(`${opponentUID} is not connected`);
  }

  oppSocket.opponent = socket;
  socket.opponent = oppSocket.uid;
  socket.playerColor = playerColor;
  
  oppSocket.send(
    JSON.stringify({
      msg: "request-play",
      displayName: socket.displayName,
      playerColor,
    })
  );
}
