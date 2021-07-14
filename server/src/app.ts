import webSocket, { MessageEvent } from "ws";
import http from "http";
import { verifyClient } from "./util/app/verifyClient";
import { setUsersOffline } from "./util/app/setUsersOffline";
import { controller } from "./Controller/controller";
import { ExtendedRequest, ExtendedSocket } from "src/@types";
import decodeMessage from "./util/decodeMessage";
import { closeHandler } from "./Controller/handlers";
import setUserOnline from "./util/app/setUserOnline";

const server = http.createServer();
const ws = new webSocket.Server({
  server,
  verifyClient,
});

//set all users offline when server start
setUsersOffline();

function logConnection(req: ExtendedRequest) {
  console.log("-------------------------");
  console.log("connecting from ", req.socket.remoteAddress);
  console.log(req.displayName, req.uid);
  console.log("-------------------------");
}

ws.on("connection", (socket: ExtendedSocket, req: ExtendedRequest) => {
  console.log("connect ");

  logConnection(req);
  setUserOnline(req.uid!);

  socket.uid = req.uid;
  socket.displayName = req.displayName;

  socket.onmessage = async (messageEvent: MessageEvent) => {
    //TODO: handle error parser msg
    const msg = decodeMessage(messageEvent.data as string);

    console.log("from ", req.socket.remoteAddress, msg.msg);

    try {
      controller(msg, socket, ws.clients);
    } catch (e) {
      console.error("error ", e.message);
      socket.send(
        JSON.stringify({
          msg: "error",
          content: e.message,
        })
      );
    }
  };

  socket.onclose = () => {
    console.log("close the connection");
    try {
      closeHandler({ socket });
    } catch (e) {
      console.log(e.message);
    }
  };
});

server.listen(process.env.PORT || 8080, () =>
  console.log(`Server has started.`)
);
