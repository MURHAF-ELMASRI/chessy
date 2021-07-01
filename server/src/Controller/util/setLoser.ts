import { ExtendedSocket } from "../../@types/ExtendedSocket";
import { app } from "../../config/firebaseApp";
import admin from "firebase-admin";
import isObject from "../../util/isObject";

export function setLoser(socket: ExtendedSocket) {
  if (isObject(socket.opponent)) {
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

    socket.opponent.send(JSON.stringify({ msg: "win" }));
    socket.opponent.opponent = "";
  }
}
