import { getClientSocket } from "../../util/getClientSocket";
import { requestPlayParams } from "../util/requestPlayParams";

export default function requestPlayHandler({
  socket,
  clients,
  opponentUID,
  color,
}: requestPlayParams) {
  const oppSocket = getClientSocket(clients, socket);

  if (!oppSocket) {
    throw new Error("")
  }

  if (!oppSocket.opponent) {
    oppSocket.opponent = socket;
    socket.opponent = oppSocket.uid;
    console.log("sending request");
    oppSocket.send(
      JSON.stringify({
        msg: "request-play",
        name: socket.name,
        color,
      })
    );
  } else
    socket.send(
      JSON.stringify({
        msg: "error",
        content: `${oppSocket.name} is busy`,
      })
    );
  } else
    socket.send(
      JSON.stringify({
        msg: "error",
        content: `${opponentUID} is not connected`,
      })
    );
}
