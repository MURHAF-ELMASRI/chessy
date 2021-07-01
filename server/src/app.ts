import webSocket from "ws";
import http from "http";
import controller from "./Controller/controller";
import { verifyClient } from "./util/app/verifyClient";

import { setUsersOffline } from "./util/app/setUsersOffline";

import { ExtendedRequest } from "./@types/ExtendedRequest";
import { ExtendedObject } from "./@types/ExtendedObject";
import { ExtendedSocket } from "./@types/ExtendedSocket";

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
  console.log(req.name, req.uid);
  console.log("-------------------------");
}

ws.on("connection", (socket: ExtendedSocket, req: ExtendedRequest) => {
  
  logConnection(req);

  socket.uid = req.uid;
  socket.name = req.name;

  socket.onmessage = async (messageEvent: MessageEvent) => {
    //TODO: handle error parser msg
    const msg = JSON.parse(messageEvent.data).msg;
    console.log("from ", req.socket.remoteAddress, msg.mgs);
    if (controller[msg.msg])
      controller[msg.msg]({ socket, clients: ws.clients, ...msg });
    else {
      console.log("bad request");
      socket.send(
        JSON.stringify({
          msg: "error",
          content: "you can't start new game",
        })
      );
    }
  };

  socket.onclose = () => {
    console.log("close the connection");
    controller.close({ socket });
  };
});

server.listen(process.env.PORT || 8080, () =>
  console.log(`Server has started.`)
);
