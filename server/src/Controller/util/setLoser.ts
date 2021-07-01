import { ExtendedSocket } from "../../@types/ExtendedSocket";
import { app } from "../../config/firebaseApp";
import isObject from "../isObject";
import admin from "firebase-admin";

export function setLoser(socket: ExtendedSocket) {
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
