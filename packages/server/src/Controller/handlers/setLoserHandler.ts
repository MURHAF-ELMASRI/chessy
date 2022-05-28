import { ExtendedSocket } from "src/@types";
import { app } from "../../config/firebaseApp";
import { setLoser } from "../util/setLoser";
import isObject from "../../util/isObject";

export default function setLoserHandler({
  socket,
}: {
  socket: ExtendedSocket;
}) {
  if (!isObject(socket.opponent) || !isObject(socket.opponent.opponent)) 
   throw new Error("error in server");
  let uid = socket.uid;
  setLoser(socket);
  
}
