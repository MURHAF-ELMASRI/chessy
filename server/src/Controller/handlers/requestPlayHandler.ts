import { getClientSocket } from "../../util/getClientSocket";
import RequestPlayParams from "../../@types/params/RequestPlayParams";

export default function requestPlayHandler({
  socket,
  clients,
  opponentUID,
  color,
}: RequestPlayParams) {
  const oppSocket = getClientSocket(clients, socket);

  if (!oppSocket) {
    throw new Error(`${opponentUID} is not connected`);
  }

  if (oppSocket.opponent) {
    throw new Error(`${oppSocket.name} is busy`);
  }
  oppSocket.opponent = socket;
  socket.opponent = oppSocket.uid;
  oppSocket.send(
    JSON.stringify({
      msg: "request-play",
      name: socket.name,
      color,
    })
  );
}
