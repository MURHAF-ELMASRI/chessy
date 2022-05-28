import http, { createServer } from "http";
import { Server } from "socket.io";
import { Color } from "./@types/Color";
import "./config/configuration";
import { controller } from "./Controller/controller";
import { closeHandler } from "./Controller/handlers";
import verifyUser from "./Controller/verifyUser";
import decodeMessage from "./util/decodeMessage";
import encodeMessage from "./util/encodeMessage";

const httpServer = createServer();

const CONNECTED_USERS = new Map<string, any>();
const BUSY_USERS = new Map<string, any>();
const REQUEST_PLAY = new Map<string, any>();
const UNSIGNED_USER = new Map<string, any>();

export const io = new Server(httpServer, {
  /* options */
});


io.on("connection", (socket) => {
  console.log("connect ");

  const userId = verifyUser(socket);

  if (userId) {
    socket.write("fuck you");
    return;
  }

  if (userId && !CONNECTED_USERS.has(userId)) {
    CONNECTED_USERS.set(userId, socket);
  }

  socket.on("request-play", (msg: { oppUid: string; color: Color }) => {
    const opp = CONNECTED_USERS.get(msg.oppUid);
    if (!opp) {
      socket.send(encodeMessage({ msg: "user not found", type: "error" }));
      return;
    }
    REQUEST_PLAY.set(msg.oppUid, {
      user1: socket.id,
      requestedColor: msg.color,
    });
    console.log(
      `send request to player ${opp.displayName}, to play in color ${msg.color}`
    );
  });

  async (messageEvent: MessageEvent) => {
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

  socket.on("upgrade", function (request) {});
});

server.listen(process.env.PORT || 8080, () =>
  console.log(`Server has started.`)
);
