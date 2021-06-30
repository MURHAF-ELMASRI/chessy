import { app } from "./config/firebaseApp";
import admin from "firebase-admin";
import isObject from "./util/isObject";
import { UserSocket } from "./typing";
import { color } from "./constant/color";
import WebSocket from "ws";

function setLoser(socket: any) {
  console.log(isObject(socket.opponent));
  if (isObject(socket.opponent)) {
    socket.opponent.send(JSON.stringify({ msg: "win" }));
    if (socket.uid)
      app
        .database()
        .ref("users")
        .child(socket.uid)
        .update({
          lose: admin.database.ServerValue.increment(1),
        });
    if (socket.opponent.uid)
      app
        .database()
        .ref("users")
        .child(socket.opponent.uid)
        .update({
          win: admin.database.ServerValue.increment(1),
        });
    socket.opponent.opponent = "";
  }
}
interface requestPlayProps {
  socket: UserSocket;
  server: WebSocket.Server;
  opponentUID: string;
  color: typeof color;
}

export const contorler = {
  "request-play": ({
    socket,
    server,
    opponentUID,
    color,
  }: requestPlayProps) => {
    if (!socket.opponent) {
      let oppSocket;
      server.clients.forEach((e: UserSocket) => {
        if (e.uid === opponentUID) {
          oppSocket = e;
          console.log("found one", e.name);
        }
      });

      if (oppSocket) {
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
    } else {
      console.log("bad request");
      socket.send(
        JSON.stringify({
          msg: "error",
          content: "you can't start new game",
        })
      );
    }
  },
  cancel: ({ socket }) => {
    //TODO: check losing
    socket.opponent = "";
    console.log("cancel request ", socket.name);
  },
  "reject-play": ({ socket }) => {
    if (isObject(socket.opponent) && socket.opponent.opponent) {
      socket.opponent.send(
        JSON.stringify({ msg: "reject-play", name: socket.name })
      );
      socket.opponent.opponent = "";
    }
    socket.opponent = "";
  },
  lose: ({ socket }) => {
    setLoser(socket);
  },
  move: ({ socket, move }) => {
    if (isObject(socket.opponent))
      socket.opponent.send(JSON.stringify({ msg: "move", move: move }));
  },
  close: ({ socket }) => {
    let uid = socket.uid;
    setLoser(socket);
    if (uid)
      app
        .database()
        .ref("users")
        .child(uid)
        .update(
          {
            state: "offline",
          },
          function (err) {
            if (err) console.log(err);
            else console.log(uid + " disconnected");
          }
        );
  },
  "accept-play": ({ socket, color }) => {
    if (socket.opponent.opponent) {
      socket.opponent.opponent = socket;
      socket.opponent.send(JSON.stringify({ msg: "accept-play", color }));
    } else {
      socket.send(
        JSON.stringify({
          msg: "error",
          content: "Game has been rejected",
        })
      );
      socket.opponent = "";
    }
  },
};
