import { ExtendedSocket } from "src/@types";
import { app } from "../../config/firebaseApp";
import { setLoser } from "../util/setLoser";
import isObject from "../../util/isObject";

export default function closeHandler({ socket }: { socket: ExtendedSocket }) {
  if (!isObject(socket.opponent) || !isObject(socket.opponent.opponent)) return;
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
}
