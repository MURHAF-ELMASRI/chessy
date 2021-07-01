import ExtendedSocket from "../../@types/ExtendedSocket";
import { app } from "../../config/firebaseApp";
import { setLoser } from "../util/setLoser";

export default function closeHandler({ socket }: { socket: ExtendedSocket }) {
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
